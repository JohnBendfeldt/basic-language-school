/**
 * Shared TypeScript interfaces for Basic Language (basiclanguage.school)
 * Supports multiple languages (Russian, English, and future additions).
 */

// Alphabet item structure
export interface AlphabetItem {
  letter: string;
  pronunciation: string;
  example: string;
  // Russian specific properties
  russianWord?: string;
  englishWord?: string;
  // English / general properties
  word?: string;
  meaning?: string;
  phonics?: string;
  icon?: string;
}

// Phrase item structure (for phrases, numbers, words, time)
export interface PhraseItem {
  // Target text being learned
  russian?: string;
  phrase?: string;
  target?: string;
  // Meaning / definition / translation in reference language
  english?: string;
  meaning?: string;
  translation?: string;
  // Phonetic guide
  pronunciation: string;
  category?: string;
  icon?: string;
  level?: 1 | 2 | 3;
}

// Quiz-related interfaces
export interface QuizItem {
  prompt: string;
  answer: string;
  hint?: string;
  russian?: string;
  phrase?: string;
  target?: string;
  id?: string;
  type?: string;
}

// App data structure
export interface AppData {
  alphabet: AlphabetItem[];
  basicPhrases: PhraseItem[];
  numbers: PhraseItem[];
  commonWords: PhraseItem[];
  time?: PhraseItem[];
}