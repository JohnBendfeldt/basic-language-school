import { QuizSession, WordProgress, UserStats } from '../types/progress';
import { supabase } from './supabaseClient';

const getGuestUserId = (): string => 'guest_user';

// Helper to get language-scoped localStorage keys
const getSessionsStorageKey = (lang: string = 'ru'): string => {
  return lang === 'ru' ? 'russian_quiz_sessions' : `${lang}_quiz_sessions`;
};

const getWordsStorageKey = (lang: string = 'ru'): string => {
  return lang === 'ru' ? 'russian_word_progress' : `${lang}_word_progress`;
};

const ACTIVE_LANG_STORAGE_KEY = 'basic_language_active_lang';

// ==========================================
// LOCAL STORAGE HELPERS
// ==========================================

const getLocalSessions = (lang: string = 'ru'): QuizSession[] => {
  try {
    const raw = localStorage.getItem(getSessionsStorageKey(lang));
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn(`Failed to parse local quiz sessions for ${lang}:`, err);
    return [];
  }
};

const saveLocalSessions = (sessions: QuizSession[], lang: string = 'ru') => {
  try {
    localStorage.setItem(getSessionsStorageKey(lang), JSON.stringify(sessions));
  } catch (err) {
    console.warn(`Failed to save local quiz sessions for ${lang}:`, err);
  }
};

const getLocalWordProgress = (lang: string = 'ru'): Record<string, WordProgress> => {
  try {
    const raw = localStorage.getItem(getWordsStorageKey(lang));
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.warn(`Failed to parse local word progress for ${lang}:`, err);
    return {};
  }
};

const saveLocalWordProgress = (words: Record<string, WordProgress>, lang: string = 'ru') => {
  try {
    localStorage.setItem(getWordsStorageKey(lang), JSON.stringify(words));
  } catch (err) {
    console.warn(`Failed to save local word progress for ${lang}:`, err);
  }
};

// ==========================================
// PROGRESS SERVICE CORE
// ==========================================

export class ProgressService {
  /**
   * Get the active language (cached in localStorage or default 'ru')
   */
  static getActiveLanguage(): string {
    try {
      return localStorage.getItem(ACTIVE_LANG_STORAGE_KEY) || 'ru';
    } catch {
      return 'ru';
    }
  }

  /**
   * Set and persist active language locally and in Supabase profile
   */
  static async setActiveLanguage(langId: string): Promise<void> {
    try {
      localStorage.setItem(ACTIVE_LANG_STORAGE_KEY, langId);
    } catch (err) {
      console.warn('Could not save active language locally:', err);
    }

    if (supabase) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from('profiles')
            .upsert({
              id: user.id,
              active_language: langId,
              updated_at: new Date().toISOString()
            });
        }
      } catch (err) {
        // Table may not exist yet in user's Supabase instance
        console.warn('Could not update active language in Supabase profile:', err);
      }
    }
  }

  /**
   * Record an attempt on an individual word during a quiz
   */
  static async recordWordAttempt(params: {
    category: string;
    wordId: string;
    prompt: string;
    answer: string;
    isCorrect: boolean;
    languageId?: string;
    targetWord?: string;
    meaningWord?: string;
  }): Promise<WordProgress> {
    const { category, wordId, prompt, answer, isCorrect, languageId = 'ru', targetWord, meaningWord } = params;
    const now = new Date().toISOString();

    // 1. Try Supabase if authenticated
    if (supabase) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Fetch existing word progress
          const { data: existing } = await supabase
            .from('word_progress')
            .select('*')
            .eq('user_id', user.id)
            .eq('language_id', languageId)
            .eq('word_id', wordId)
            .maybeSingle();

          const timesCorrect = (existing?.times_correct || 0) + (isCorrect ? 1 : 0);
          const timesIncorrect = (existing?.times_incorrect || 0) + (isCorrect ? 0 : 1);
          const currentMastery = existing?.mastery_level || 0;
          const masteryLevel = Math.max(0, Math.min(5, currentMastery + (isCorrect ? 1 : -1)));

          const upsertPayload: any = {
            user_id: user.id,
            category,
            word_id: wordId,
            prompt,
            answer,
            times_correct: timesCorrect,
            times_incorrect: timesIncorrect,
            last_tested_at: now,
            mastery_level: masteryLevel,
            language_id: languageId
          };

          const { data, error } = await supabase
            .from('word_progress')
            .upsert(upsertPayload, { onConflict: 'user_id,language_id,word_id' })
            .select()
            .single();

          if (!error && data) {
            return {
              id: data.id,
              userId: data.user_id,
              languageId: data.language_id || languageId,
              category: data.category,
              wordId: data.word_id,
              prompt: data.prompt,
              answer: data.answer,
              targetWord: targetWord || existing?.targetWord,
              meaningWord: meaningWord || existing?.meaningWord,
              timesCorrect: data.times_correct,
              timesIncorrect: data.times_incorrect,
              lastTestedAt: data.last_tested_at,
              masteryLevel: data.mastery_level
            };
          }
        }
      } catch (err) {
        console.warn('Error saving word progress to Supabase, falling back to local:', err);
      }
    }

    // 2. Fallback to LocalStorage (Guest Mode)
    const localWords = getLocalWordProgress(languageId);
    const existing = localWords[wordId] || {
      userId: getGuestUserId(),
      languageId,
      category,
      wordId,
      prompt,
      answer,
      targetWord,
      meaningWord,
      timesCorrect: 0,
      timesIncorrect: 0,
      lastTestedAt: now,
      masteryLevel: 0
    };

    const timesCorrect = existing.timesCorrect + (isCorrect ? 1 : 0);
    const timesIncorrect = existing.timesIncorrect + (isCorrect ? 0 : 1);
    const masteryLevel = Math.max(0, Math.min(5, existing.masteryLevel + (isCorrect ? 1 : -1)));

    const updated: WordProgress = {
      ...existing,
      languageId,
      prompt,
      answer,
      targetWord: targetWord || existing.targetWord,
      meaningWord: meaningWord || existing.meaningWord,
      timesCorrect,
      timesIncorrect,
      lastTestedAt: now,
      masteryLevel
    };

    localWords[wordId] = updated;
    saveLocalWordProgress(localWords, languageId);
    return updated;
  }

  /**
   * Return all word IDs that have reached full mastery (masteryLevel >= 5)
   */
  static async getMasteredWordIds(languageId: string = 'ru'): Promise<Set<string>> {
    const mastered = new Set<string>();

    const localWords = getLocalWordProgress(languageId);
    for (const [id, word] of Object.entries(localWords)) {
      if (word.masteryLevel >= 5) {
        mastered.add(id);
      }
    }

    if (supabase) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          let query = supabase
            .from('word_progress')
            .select('word_id, language_id')
            .eq('user_id', user.id)
            .gte('mastery_level', 5);

          const { data } = await query;
          if (data) {
            data
              .filter((row: any) => !row.language_id || row.language_id === languageId)
              .forEach((row: any) => mastered.add(row.word_id));
          }
        }
      } catch (err) {
        console.warn('Could not fetch mastered word ids from Supabase:', err);
      }
    }

    return mastered;
  }

  /**
   * Record a completed quiz session
   */
  static async recordQuizSession(params: {
    category: string;
    score: number;
    totalQuestions: number;
    languageId?: string;
  }): Promise<QuizSession> {
    const { category, score, totalQuestions, languageId = 'ru' } = params;
    const now = new Date().toISOString();
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    const id = `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // 1. Try Supabase if authenticated
    if (supabase) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const insertPayload: any = {
            user_id: user.id,
            category,
            score,
            total_questions: totalQuestions,
            completed_at: now,
            language_id: languageId
          };

          const { data, error } = await supabase
            .from('quiz_sessions')
            .insert(insertPayload)
            .select()
            .single();

          if (!error && data) {
            return {
              id: data.id,
              userId: data.user_id,
              languageId: data.language_id || languageId,
              category: data.category,
              score: data.score,
              totalQuestions: data.total_questions,
              percentage: Number(data.percentage || percentage),
              completedAt: data.completed_at
            };
          }
        }
      } catch (err) {
        console.warn('Error saving quiz session to Supabase, falling back to local:', err);
      }
    }

    // 2. Fallback to LocalStorage (Guest Mode)
    const session: QuizSession = {
      id,
      userId: getGuestUserId(),
      languageId,
      category,
      score,
      totalQuestions,
      percentage,
      completedAt: now
    };

    const sessions = getLocalSessions(languageId);
    sessions.unshift(session);
    saveLocalSessions(sessions.slice(0, 100), languageId);
    return session;
  }

  /**
   * Get overall user statistics (accuracy, totals, words to review) for a specific language
   */
  static async getUserStats(languageId: string = 'ru'): Promise<UserStats> {
    // 1. Try Supabase if authenticated
    if (supabase) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const [sessionsRes, wordsRes] = await Promise.all([
            supabase
              .from('quiz_sessions')
              .select('*')
              .eq('user_id', user.id)
              .order('completed_at', { ascending: false })
              .limit(50),
            supabase
              .from('word_progress')
              .select('*')
              .eq('user_id', user.id)
          ]);

          const sessions: QuizSession[] = (sessionsRes.data || [])
            .filter((s: any) => !s.language_id || s.language_id === languageId)
            .map((s: any) => ({
              id: s.id,
              userId: s.user_id,
              languageId: s.language_id || languageId,
              category: s.category,
              score: s.score,
              totalQuestions: s.total_questions,
              percentage: Number(s.percentage || Math.round((s.score / s.total_questions) * 100)),
              completedAt: s.completed_at
            }));

          const words: WordProgress[] = (wordsRes.data || [])
            .filter((w: any) => !w.language_id || w.language_id === languageId)
            .map((w: any) => ({
              id: w.id,
              userId: w.user_id,
              languageId: w.language_id || languageId,
              category: w.category,
              wordId: w.word_id,
              prompt: w.prompt,
              answer: w.answer,
              timesCorrect: w.times_correct,
              timesIncorrect: w.times_incorrect,
              lastTestedAt: w.last_tested_at,
              masteryLevel: w.mastery_level
            }));

          return this.aggregateStats(sessions, words);
        }
      } catch (err) {
        console.warn('Error fetching stats from Supabase, falling back to local:', err);
      }
    }

    // 2. Fallback to LocalStorage (Guest Mode)
    const localSessions = getLocalSessions(languageId);
    const localWords = Object.values(getLocalWordProgress(languageId));
    return this.aggregateStats(localSessions, localWords);
  }

  /**
   * Get mastery overview across all specified languages
   */
  static async getMultiLanguageMastery(
    languages: Array<{ id: string; totalItems: number }>
  ): Promise<Record<string, { wordsMastered: number; totalItems: number; percentMastered: number; quizzesCompleted: number; averageScore: number }>> {
    const results: Record<string, { wordsMastered: number; totalItems: number; percentMastered: number; quizzesCompleted: number; averageScore: number }> = {};

    await Promise.all(
      languages.map(async ({ id, totalItems }) => {
        try {
          const stats = await this.getUserStats(id);
          const percentMastered = totalItems > 0
            ? Math.min(100, Math.round((stats.wordsMasteredCount / totalItems) * 100))
            : 0;

          results[id] = {
            wordsMastered: stats.wordsMasteredCount,
            totalItems,
            percentMastered,
            quizzesCompleted: stats.totalQuizzesTaken,
            averageScore: stats.averageScore
          };
        } catch (err) {
          console.warn(`Could not calculate mastery for ${id}:`, err);
          results[id] = {
            wordsMastered: 0,
            totalItems,
            percentMastered: 0,
            quizzesCompleted: 0,
            averageScore: 0
          };
        }
      })
    );

    return results;
  }

  /**
   * Sync guest progress to Supabase when user logs in
   */
  static async syncGuestDataToCloud(languageId: string = 'ru'): Promise<void> {
    if (!supabase) return;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const localSessions = getLocalSessions(languageId);
      const localWords = Object.values(getLocalWordProgress(languageId));

      if (localSessions.length === 0 && localWords.length === 0) return;

      // Sync word progress
      if (localWords.length > 0) {
        const payload = localWords.map(w => ({
          user_id: user.id,
          category: w.category,
          word_id: w.wordId,
          prompt: w.prompt,
          answer: w.answer,
          times_correct: w.timesCorrect,
          times_incorrect: w.timesIncorrect,
          last_tested_at: w.lastTestedAt,
          mastery_level: w.masteryLevel,
          language_id: languageId
        }));

        await supabase
          .from('word_progress')
          .upsert(payload, { onConflict: 'user_id,language_id,word_id' });
      }

      // Sync quiz sessions
      if (localSessions.length > 0) {
        const sessionPayload = localSessions.slice(0, 20).map(s => ({
          user_id: user.id,
          category: s.category,
          score: s.score,
          total_questions: s.totalQuestions,
          completed_at: s.completedAt,
          language_id: languageId
        }));

        await supabase
          .from('quiz_sessions')
          .insert(sessionPayload);
      }

      console.info(`Successfully synced guest progress for ${languageId} to Supabase account.`);
    } catch (err) {
      console.warn('Could not sync guest progress to cloud:', err);
    }
  }

  private static calculateStreaks(sessions: QuizSession[]): { currentStreak: number; longestStreak: number } {
    if (!sessions || sessions.length === 0) {
      return { currentStreak: 0, longestStreak: 0 };
    }

    // Extract unique ISO dates (YYYY-MM-DD)
    const uniqueDates = Array.from(
      new Set(
        sessions
          .map(s => s.completedAt ? s.completedAt.split('T')[0] : '')
          .filter(Boolean)
      )
    ).sort().reverse();

    if (uniqueDates.length === 0) {
      return { currentStreak: 0, longestStreak: 0 };
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Check if the streak is active (practiced today or yesterday)
    let currentStreak = 0;
    const latestDate = uniqueDates[0];
    const isStreakActive = latestDate === todayStr || latestDate === yesterdayStr;

    if (isStreakActive) {
      let expectedDate = new Date(latestDate);
      for (const dateStr of uniqueDates) {
        const currentDate = new Date(dateStr);
        const diffDays = Math.round((expectedDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
        if (diffDays === 0) {
          currentStreak++;
          expectedDate.setDate(expectedDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    // Calculate longest consecutive streak
    let longestStreak = currentStreak;
    let tempStreak = 1;
    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const d1 = new Date(uniqueDates[i]);
      const d2 = new Date(uniqueDates[i + 1]);
      const diff = Math.round((d1.getTime() - d2.getTime()) / (1000 * 3600 * 24));
      if (diff === 1) {
        tempStreak++;
        if (tempStreak > longestStreak) longestStreak = tempStreak;
      } else {
        tempStreak = 1;
      }
    }

    return { currentStreak, longestStreak };
  }

  private static aggregateStats(sessions: QuizSession[], words: WordProgress[]): UserStats {
    const totalQuizzesTaken = sessions.length;
    const averageScore = totalQuizzesTaken > 0
      ? Math.round(sessions.reduce((acc, s) => acc + s.percentage, 0) / totalQuizzesTaken)
      : 0;

    const wordsMasteredCount = words.filter(w => w.masteryLevel >= 5).length;
    const wordsLearningCount = words.filter(w => w.masteryLevel < 5).length;

    const wordsToReview = words
      .filter(w => w.timesIncorrect > 0 && w.masteryLevel < 2)
      .sort((a, b) => b.timesIncorrect - a.timesIncorrect)
      .slice(0, 10);

    const { currentStreak, longestStreak } = this.calculateStreaks(sessions);

    return {
      totalQuizzesTaken,
      averageScore,
      wordsMasteredCount,
      wordsLearningCount,
      wordsToReview,
      recentSessions: sessions.slice(0, 10),
      currentDailyStreak: currentStreak,
      longestDailyStreak: longestStreak
    };
  }
}
