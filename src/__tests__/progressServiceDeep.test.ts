import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ProgressService } from '../services/progressService';
import { MASTERY_THRESHOLD, WordProgress, QuizSession } from '../types/progress';

// --- Supabase test double -------------------------------------------------------------------
// `sb.client` is null for guest-mode tests and a fake client for signed-in tests.
const sb = vi.hoisted(() => ({ client: null as null | Record<string, unknown> }));
vi.mock('../services/supabaseClient', () => ({
  get supabase() {
    return sb.client;
  },
}));

type Result = { data?: unknown; error?: unknown };
const chain = (result: Result) => {
  const c: Record<string, unknown> = {};
  for (const m of ['select', 'eq', 'gte', 'order', 'limit']) c[m] = vi.fn(() => c);
  c.upsert = vi.fn(() => c);
  c.insert = vi.fn(() => c);
  c.single = vi.fn(() => Promise.resolve(result));
  c.maybeSingle = vi.fn(() => Promise.resolve(result));
  // `await query` on a chain resolves to the result
  c.then = (res: (v: Result) => unknown, rej: (e: unknown) => unknown) => Promise.resolve(result).then(res, rej);
  return c;
};

const signedIn = (tables: Record<string, Result | Result[]>, user: { id: string } | null = { id: 'user-1' }) => {
  const chains: Record<string, ReturnType<typeof chain>[]> = {};
  const from = vi.fn((table: string) => {
    const cfg = tables[table] ?? { data: null };
    const results = Array.isArray(cfg) ? cfg : [cfg];
    const created = chain(results[Math.min((chains[table] ?? []).length, results.length - 1)]);
    (chains[table] ??= []).push(created);
    return created;
  });
  sb.client = { auth: { getUser: vi.fn(() => Promise.resolve({ data: { user } })) }, from };
  return { from, chains };
};

const attempt = (over: Partial<Parameters<typeof ProgressService.recordWordAttempt>[0]> = {}) =>
  ProgressService.recordWordAttempt({ category: 'words', wordId: 'w1', prompt: 'casa', answer: 'house', isCorrect: true, languageId: 'es', ...over });

beforeEach(() => {
  sb.client = null;
});

describe('ProgressService guest mode - word mastery', () => {
  it('never lets mastery drop below zero', async () => {
    const result = await attempt({ isCorrect: false });
    expect(result.masteryLevel).toBe(0);
    expect(result.timesIncorrect).toBe(1);
  });

  it('caps mastery at the mastery threshold however many answers are correct', async () => {
    let last!: WordProgress;
    for (let i = 0; i < MASTERY_THRESHOLD + 4; i++) last = await attempt();
    expect(last.masteryLevel).toBe(MASTERY_THRESHOLD);
    expect(last.timesCorrect).toBe(MASTERY_THRESHOLD + 4);
  });

  it('keeps the target/meaning words once recorded and updates the prompt', async () => {
    await attempt({ targetWord: 'casa', meaningWord: 'house' });
    const second = await attempt({ prompt: 'house', answer: 'casa' });
    expect(second.targetWord).toBe('casa');
    expect(second.meaningWord).toBe('house');
    expect(second.prompt).toBe('house');
  });

  it('keeps each language\'s progress separate', async () => {
    await attempt({ languageId: 'es' });
    await attempt({ languageId: 'fr', wordId: 'w1' });
    expect((await ProgressService.getUserStats('es')).wordsLearningCount).toBe(1);
    expect((await ProgressService.getUserStats('fr')).wordsLearningCount).toBe(1);
    expect((await ProgressService.getUserStats('de')).wordsLearningCount).toBe(0);
  });

  it('uses the historical storage key for Russian and a prefixed key for other languages', async () => {
    await attempt({ languageId: 'ru' });
    await attempt({ languageId: 'es' });
    expect(localStorage.getItem('russian_word_progress')).not.toBeNull();
    expect(localStorage.getItem('es_word_progress')).not.toBeNull();
  });

  it('lists mastered words only for the requested language', async () => {
    for (let i = 0; i < MASTERY_THRESHOLD; i++) await attempt({ languageId: 'es', wordId: 'casa' });
    for (let i = 0; i < MASTERY_THRESHOLD; i++) await attempt({ languageId: 'fr', wordId: 'maison' });
    expect([...(await ProgressService.getMasteredWordIds('es'))]).toEqual(['casa']);
    expect([...(await ProgressService.getMasteredWordIds('fr'))]).toEqual(['maison']);
  });

  it('survives corrupted data in localStorage', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    localStorage.setItem('es_word_progress', '{not json');
    localStorage.setItem('es_quiz_sessions', 'nope');
    const stats = await ProgressService.getUserStats('es');
    expect(stats.totalQuizzesTaken).toBe(0);
    expect(stats.wordsMasteredCount).toBe(0);
    expect(warn).toHaveBeenCalled();
    // and recovers on the next write
    expect((await attempt()).timesCorrect).toBe(1);
  });
});

describe('ProgressService guest mode - quiz sessions', () => {
  it('scores 0% when there were no questions', async () => {
    expect((await ProgressService.recordQuizSession({ category: 'alphabet', score: 0, totalQuestions: 0, languageId: 'es' })).percentage).toBe(0);
  });

  it('rounds percentages', async () => {
    expect((await ProgressService.recordQuizSession({ category: 'alphabet', score: 2, totalQuestions: 3, languageId: 'es' })).percentage).toBe(67);
  });

  it('lists newest sessions first and keeps only the latest 100', async () => {
    for (let i = 0; i < 105; i++) {
      await ProgressService.recordQuizSession({ category: `c${i}`, score: 1, totalQuestions: 1, languageId: 'es' });
    }
    const stored = JSON.parse(localStorage.getItem('es_quiz_sessions')!) as QuizSession[];
    expect(stored).toHaveLength(100);
    expect(stored[0].category).toBe('c104');
    expect((await ProgressService.getUserStats('es')).recentSessions).toHaveLength(10);
  });
});

describe('ProgressService statistics', () => {
  afterEach(() => vi.useRealTimers());

  const seedSessions = (dates: string[], lang = 'es') =>
    localStorage.setItem(
      `${lang}_quiz_sessions`,
      JSON.stringify(dates.map((d, i) => ({ id: `s${i}`, userId: 'g', category: 'x', score: 1, totalQuestions: 1, percentage: 100, completedAt: d })))
    );

  const today = '2025-06-10';
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(`${today}T12:00:00Z`));
  });

  it('counts a streak of consecutive days ending today', async () => {
    seedSessions(['2025-06-10T09:00:00Z', '2025-06-09T09:00:00Z', '2025-06-08T09:00:00Z']);
    const stats = await ProgressService.getUserStats('es');
    expect(stats.currentDailyStreak).toBe(3);
    expect(stats.longestDailyStreak).toBe(3);
  });

  it('keeps the streak alive when the last practice was yesterday', async () => {
    seedSessions(['2025-06-09T09:00:00Z', '2025-06-08T09:00:00Z']);
    expect((await ProgressService.getUserStats('es')).currentDailyStreak).toBe(2);
  });

  it('resets the current streak after a missed day but remembers the longest', async () => {
    seedSessions(['2025-06-07T09:00:00Z', '2025-06-06T09:00:00Z', '2025-06-05T09:00:00Z', '2025-06-04T09:00:00Z']);
    const stats = await ProgressService.getUserStats('es');
    expect(stats.currentDailyStreak).toBe(0);
    expect(stats.longestDailyStreak).toBe(4);
  });

  it('counts several sessions on one day as a single streak day', async () => {
    seedSessions(['2025-06-10T08:00:00Z', '2025-06-10T09:00:00Z', '2025-06-10T10:00:00Z']);
    expect((await ProgressService.getUserStats('es')).currentDailyStreak).toBe(1);
  });

  it('finds the longest run even when the current streak is shorter', async () => {
    seedSessions(['2025-06-10T09:00:00Z', '2025-06-05T09:00:00Z', '2025-06-04T09:00:00Z', '2025-06-03T09:00:00Z']);
    const stats = await ProgressService.getUserStats('es');
    expect(stats.currentDailyStreak).toBe(1);
    expect(stats.longestDailyStreak).toBe(3);
  });

  it('has no streak without sessions', async () => {
    const stats = await ProgressService.getUserStats('es');
    expect(stats.currentDailyStreak).toBe(0);
    expect(stats.longestDailyStreak).toBe(0);
    expect(stats.averageScore).toBe(0);
  });

  it('lists the 10 most-missed words that are not yet known, worst first', async () => {
    const words: Record<string, Partial<WordProgress>> = {};
    for (let i = 0; i < 12; i++) {
      words[`w${i}`] = { wordId: `w${i}`, category: 'words', prompt: 'p', answer: 'a', timesCorrect: 0, timesIncorrect: i + 1, masteryLevel: 0 };
    }
    words.known = { wordId: 'known', category: 'words', prompt: 'p', answer: 'a', timesCorrect: 5, timesIncorrect: 99, masteryLevel: 2 };
    localStorage.setItem('es_word_progress', JSON.stringify(words));
    const review = (await ProgressService.getUserStats('es')).wordsToReview;
    expect(review).toHaveLength(10);
    expect(review[0].wordId).toBe('w11');
    expect(review.map((w) => w.wordId)).not.toContain('known');
  });

  it('summarizes mastery per language with a capped percentage', async () => {
    localStorage.setItem(
      'es_word_progress',
      JSON.stringify({ a: { wordId: 'a', masteryLevel: MASTERY_THRESHOLD }, b: { wordId: 'b', masteryLevel: MASTERY_THRESHOLD } })
    );
    const overview = await ProgressService.getMultiLanguageMastery([
      { id: 'es', totalItems: 4 },
      { id: 'fr', totalItems: 10 },
      { id: 'de', totalItems: 0 },
      { id: 'tr', totalItems: 1 },
    ]);
    expect(overview.es.percentMastered).toBe(50);
    expect(overview.fr.percentMastered).toBe(0);
    expect(overview.de.percentMastered).toBe(0);
    expect(overview.tr.wordsMastered).toBe(0);
  });

  it('caps percent mastered at 100', async () => {
    localStorage.setItem('es_word_progress', JSON.stringify({ a: { wordId: 'a', masteryLevel: MASTERY_THRESHOLD }, b: { wordId: 'b', masteryLevel: MASTERY_THRESHOLD } }));
    expect((await ProgressService.getMultiLanguageMastery([{ id: 'es', totalItems: 1 }])).es.percentMastered).toBe(100);
  });
});

describe('ProgressService active language', () => {
  it('defaults to Russian and remembers the choice', async () => {
    expect(ProgressService.getActiveLanguage()).toBe('ru');
    await ProgressService.setActiveLanguage('ja');
    expect(ProgressService.getActiveLanguage()).toBe('ja');
  });

  it('also saves the choice to the signed-in profile', async () => {
    const { from, chains } = signedIn({ profiles: { data: null } });
    await ProgressService.setActiveLanguage('ko');
    expect(from).toHaveBeenCalledWith('profiles');
    expect(chains.profiles[0].upsert).toHaveBeenCalledWith(expect.objectContaining({ id: 'user-1', active_language: 'ko' }));
  });

  it('does not touch the profile for guests', async () => {
    const { from } = signedIn({}, null);
    await ProgressService.setActiveLanguage('ko');
    expect(from).not.toHaveBeenCalled();
  });

  it('still saves locally when the profile table is unavailable', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    sb.client = { auth: { getUser: () => Promise.reject(new Error('offline')) }, from: vi.fn() };
    await ProgressService.setActiveLanguage('de');
    expect(ProgressService.getActiveLanguage()).toBe('de');
    expect(warn).toHaveBeenCalled();
  });
});

describe('ProgressService signed in (Supabase)', () => {
  const row = (over: Record<string, unknown> = {}) => ({
    id: 'r1', user_id: 'user-1', language_id: 'es', category: 'words', word_id: 'w1', prompt: 'casa', answer: 'house',
    times_correct: 4, times_incorrect: 1, last_tested_at: '2025-01-01T00:00:00Z', mastery_level: 2, ...over,
  });

  it('adds to the stored word record and sends a clamped mastery level', async () => {
    const { chains } = signedIn({
      word_progress: [{ data: row({ times_correct: 4, mastery_level: MASTERY_THRESHOLD }) }, { data: row({ times_correct: 5, mastery_level: MASTERY_THRESHOLD }) }],
    });
    const result = await attempt({ targetWord: 'casa' });
    const payload = (chains.word_progress[1].upsert as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(payload).toMatchObject({ user_id: 'user-1', language_id: 'es', word_id: 'w1', times_correct: 5, mastery_level: MASTERY_THRESHOLD });
    expect(result.timesCorrect).toBe(5);
    expect(result.targetWord).toBe('casa');
  });

  it('falls back to this device when the cloud save fails', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    signedIn({ word_progress: { data: null, error: { message: 'rls' } } });
    const result = await attempt();
    expect(result.userId).toBe('guest_user');
    expect(JSON.parse(localStorage.getItem('es_word_progress')!).w1.timesCorrect).toBe(1);
  });

  it('records quiz sessions in the cloud and keeps the stored percentage', async () => {
    const { chains } = signedIn({
      quiz_sessions: { data: { id: 'q1', user_id: 'user-1', language_id: 'es', category: 'alphabet', score: 4, total_questions: 5, percentage: '80', completed_at: '2025-01-01T00:00:00Z' } },
    });
    const session = await ProgressService.recordQuizSession({ category: 'alphabet', score: 4, totalQuestions: 5, languageId: 'es' });
    expect(session).toMatchObject({ id: 'q1', percentage: 80, userId: 'user-1' });
    expect((chains.quiz_sessions[0].insert as ReturnType<typeof vi.fn>).mock.calls[0][0]).toMatchObject({ total_questions: 5, language_id: 'es' });
  });

  it('merges cloud and local mastered words for the requested language only', async () => {
    localStorage.setItem('es_word_progress', JSON.stringify({ local: { wordId: 'local', masteryLevel: MASTERY_THRESHOLD } }));
    signedIn({
      word_progress: {
        data: [
          { word_id: 'cloud-es', language_id: 'es' },
          { word_id: 'cloud-fr', language_id: 'fr' },
          { word_id: 'legacy', language_id: null },
        ],
      },
    });
    const ids = await ProgressService.getMasteredWordIds('es');
    expect([...ids].sort()).toEqual(['cloud-es', 'legacy', 'local']);
  });

  it('builds stats from cloud rows for the active language', async () => {
    signedIn({
      quiz_sessions: { data: [
        { id: 's1', user_id: 'user-1', language_id: 'es', category: 'x', score: 9, total_questions: 10, percentage: 90, completed_at: '2025-01-02T00:00:00Z' },
        { id: 's2', user_id: 'user-1', language_id: 'fr', category: 'x', score: 1, total_questions: 10, percentage: 10, completed_at: '2025-01-02T00:00:00Z' },
      ] },
      word_progress: { data: [row({ mastery_level: MASTERY_THRESHOLD }), row({ id: 'r2', word_id: 'w2', mastery_level: 0, times_incorrect: 3 }), row({ id: 'r3', language_id: 'fr' })] },
    });
    const stats = await ProgressService.getUserStats('es');
    expect(stats.totalQuizzesTaken).toBe(1);
    expect(stats.averageScore).toBe(90);
    expect(stats.wordsMasteredCount).toBe(1);
    expect(stats.wordsLearningCount).toBe(1);
    expect(stats.wordsToReview.map((w) => w.wordId)).toEqual(['w2']);
  });

  it('uses local stats when the cloud request throws', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    sb.client = { auth: { getUser: () => Promise.reject(new Error('offline')) }, from: vi.fn() };
    await ProgressService.recordQuizSession({ category: 'x', score: 1, totalQuestions: 1, languageId: 'es' });
    expect((await ProgressService.getUserStats('es')).totalQuizzesTaken).toBe(1);
  });
});

describe('ProgressService.syncGuestDataToCloud', () => {
  beforeEach(() => vi.spyOn(console, 'info').mockImplementation(() => {}));

  const seedLocal = () => {
    localStorage.setItem('es_word_progress', JSON.stringify({ w1: { wordId: 'w1', category: 'words', prompt: 'casa', answer: 'house', timesCorrect: 2, timesIncorrect: 0, lastTestedAt: 't', masteryLevel: 2 } }));
    const sessions = Array.from({ length: 25 }, (_, i) => ({ id: `s${i}`, category: 'x', score: 1, totalQuestions: 2, percentage: 50, completedAt: `2025-01-${String((i % 28) + 1).padStart(2, '0')}T00:00:00Z` }));
    localStorage.setItem('es_quiz_sessions', JSON.stringify(sessions));
  };

  it('does nothing without a cloud client', async () => {
    seedLocal();
    await expect(ProgressService.syncGuestDataToCloud('es')).resolves.toBeUndefined();
  });

  it('does nothing when nobody is signed in', async () => {
    seedLocal();
    const { from } = signedIn({}, null);
    await ProgressService.syncGuestDataToCloud('es');
    expect(from).not.toHaveBeenCalled();
  });

  it('does nothing when there is nothing to upload', async () => {
    const { from } = signedIn({});
    await ProgressService.syncGuestDataToCloud('es');
    expect(from).not.toHaveBeenCalled();
  });

  it('uploads word progress and the 20 most recent sessions under the signed-in user', async () => {
    seedLocal();
    const { chains } = signedIn({});
    await ProgressService.syncGuestDataToCloud('es');

    const words = (chains.word_progress[0].upsert as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(words[0]).toEqual([expect.objectContaining({ user_id: 'user-1', word_id: 'w1', language_id: 'es', mastery_level: 2 })]);
    expect(words[1]).toEqual({ onConflict: 'user_id,language_id,word_id' });

    const sessions = (chains.quiz_sessions[0].insert as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(sessions).toHaveLength(20);
    expect(sessions[0]).toMatchObject({ user_id: 'user-1', total_questions: 2, language_id: 'es' });
  });

  it('never throws when the upload fails', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    seedLocal();
    sb.client = { auth: { getUser: () => Promise.reject(new Error('offline')) }, from: vi.fn() };
    await expect(ProgressService.syncGuestDataToCloud('es')).resolves.toBeUndefined();
  });
});
