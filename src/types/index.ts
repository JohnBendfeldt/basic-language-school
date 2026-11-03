import { SupportedLanguageId } from '../data/languages/types';

/**
 * Shared TypeScript interfaces for Basic Language (basiclanguage.school)
 * Supports multiple languages (Russian, English, and future additions).
 */

// Alphabet item structure
export interface AlphabetItem {
  letter: string;
  pronunciation: string;
  example: string;
  examplesByLang?: Partial<Record<string, string>>;
  // Russian specific properties
  russianWord?: string;
  englishWord?: string;
  // English / general properties
  word?: string;
  meaning?: string;
  wordPronunciation?: string;
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
  pronunciation?: string;
  category?: string;
  icon?: string;
  level?: 1 | 2 | 3;
  // Grammatical properties
  partOfSpeech?: 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrase' | 'pronoun' | 'preposition';
  article?: 'der' | 'die' | 'das' | 'el' | 'la' | 'le' | string;
  gender?: 'masculine' | 'feminine' | 'neuter' | 'plural';
  plural?: string;
  acceptedAlternatives?: string[];
}

// Grammar-related interfaces
export interface GenderNounRule {
  article: string;
  gender: 'masculine' | 'feminine' | 'neuter' | 'plural';
  color: string;
  name: string;
  description: string;
  rules: string[];
  examples: { word: string; article: string; meaning: string; icon?: string }[];
}

export interface VerbConjugation {
  verb: string;
  meaning: string;
  tense: string;
  type?: 'regular' | 'irregular' | 'modal';
  forms: { pronoun: string; form: string }[];
  exampleSentence?: { target: string; translation: string };
}

export interface GrammarDescription {
  title: string;
  explanation: string;
  headers?: [string, string, string, string];
  examples: { positive: string; comparative: string; superlative: string; meaning: string }[];
}

export interface GrammarRuleExplanationMeta {
  kind:
    | 'gender_article'
    | 'gender_exception'
    | 'gender_agreement'
    | 'verb_conjugation'
    | 'ser_estar'
    | 'particle_marker'
    | 'classifier'
    | 'vowel_harmony'
    | 'negation'
    | 'preposition_case'
    | 'comparison'
    | 'sound_article';
  targetWord: string;
  answer: string;
  fullPhrase?: string;
  gender?: 'masculine' | 'feminine' | 'neuter' | 'plural';
  clue?: string;
}

export interface GrammarFlashcard {
  id: string;
  type: 'gender' | 'verb' | 'description' | 'article';
  prompt: string;
  prompts?: Partial<Record<SupportedLanguageId, string>>;
  options: string[];
  correctAnswer: string;
  explanation: string;
  explanations?: Partial<Record<SupportedLanguageId, string>>;
  translation?: string;
  translations?: Partial<Record<SupportedLanguageId, string>>;
  gender?: 'masculine' | 'feminine' | 'neuter' | 'plural';
  article?: string;
  icon?: string;
  audioWord?: string;
  promptAudio?: string;
  optionAudio?: Partial<Record<string, string>>;
  ruleMeta?: GrammarRuleExplanationMeta;
}

export interface GrammarData {
  genderRules?: GenderNounRule[];
  verbs?: VerbConjugation[];
  descriptions?: GrammarDescription[];
  flashcards?: GrammarFlashcard[];
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
  grammar?: GrammarData;
}