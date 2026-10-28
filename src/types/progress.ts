/**
 * Types for user authentication, quiz history, and spaced-repetition word progress.
 * Supports multi-language tracking across Russian, English, and more.
 */

export type AuthProviderType = 'google' | 'azure' | 'guest';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  provider: AuthProviderType;
  activeLanguage?: string; // 'ru' | 'en'
  createdAt: string;
}

export interface QuizSession {
  id: string;
  userId: string;
  languageId?: string; // e.g. 'ru' | 'en'
  category: string; // 'alphabet' | 'numbers' | 'basicPhrases' | 'commonWords'
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
}

export interface WordProgress {
  id?: string;
  userId: string;
  languageId?: string; // e.g. 'ru' | 'en'
  category: string;
  wordId: string; // unique identifier e.g. "alphabet-А" or "phrases-Привет"
  prompt: string;
  answer: string;
  timesCorrect: number;
  timesIncorrect: number;
  lastTestedAt: string;
  masteryLevel: number; // 0 (learning) to 5 (mastered)
}

export interface UserStats {
  totalQuizzesTaken: number;
  averageScore: number;
  wordsMasteredCount: number;
  wordsLearningCount: number;
  wordsToReview: WordProgress[];
  recentSessions: QuizSession[];
}
