import { LanguageMeta, SupportedLanguageId } from './types';
import russianData from '../russianData';
import englishData from './enData';

export const SUPPORTED_LANGUAGES: Record<SupportedLanguageId, LanguageMeta> = {
  ru: {
    id: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    code: 'ru-RU',
    ttsVoice: 'ru-RU-SvetlanaNeural',
    hasKeyboard: true,
    hasAlphabet: true,
    hasTimeGuide: true,
    appName: 'Basic Russian',
    domain: 'basicrussian.org',
    seo: {
      alphabet: {
        title: 'Russian Alphabet (Cyrillic) | Basic Russian',
        description: 'Learn the 33 letters of the Russian alphabet (Cyrillic) with pronunciation guides, audio examples, and transliteration.',
      },
      phrases: {
        title: 'Basic Russian Phrases | Basic Russian',
        description: 'Learn essential Russian phrases for beginners with authentic audio pronunciation.',
      },
      numbers: {
        title: 'Russian Numbers & Time | Basic Russian',
        description: 'Learn Russian numbers and telling time with authentic native audio.',
      },
      time: {
        title: 'Russian Time & Telling Time | Basic Russian',
        description: 'Learn how to tell time in Russian with authentic native audio pronunciation.',
      },
      words: {
        title: 'Common Russian Words | Basic Russian',
        description: 'Learn the most common Russian words with audio pronunciation and English translations.',
      },
      quiz: {
        title: 'Russian Quiz | Basic Russian',
        description: 'Test your Russian knowledge with interactive quizzes covering the alphabet, phrases, numbers, and vocabulary.',
      },
    },
    data: russianData,
  },
  en: {
    id: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    code: 'en-US',
    ttsVoice: 'en-US-JennyNeural',
    hasKeyboard: false,
    hasAlphabet: true,
    hasTimeGuide: false,
    appName: 'Basic English',
    domain: 'basicenglish.school',
    seo: {
      alphabet: {
        title: 'English Alphabet & Phonics | Basic English',
        description: 'Master the 26 letters of the English alphabet with clear phonics sounds, example words, and authentic audio.',
      },
      phrases: {
        title: 'Essential English Phrases | Basic English',
        description: 'Learn everyday English conversation, greetings, politeness, and common expressions with audio.',
      },
      numbers: {
        title: 'English Numbers & Time | Basic English',
        description: 'Learn English numbers from 0 to 1,000 and time expressions with crystal-clear audio pronunciation.',
      },
      time: {
        title: 'Telling Time in English | Basic English',
        description: 'Learn how to ask and tell time in English with authentic audio pronunciation.',
      },
      words: {
        title: 'High-Frequency English Vocabulary | Basic English',
        description: 'Build your core vocabulary with the Oxford 3000 beginner selection and everyday words.',
      },
      quiz: {
        title: 'English Practice Quiz | Basic English',
        description: 'Test your English vocabulary, phonics, and phrases with interactive spaced-repetition quizzes.',
      },
    },
    data: englishData,
  },
};

export const DEFAULT_LANGUAGE: SupportedLanguageId = 'ru';

export const getLanguageMeta = (langId?: string | null): LanguageMeta => {
  if (langId && langId in SUPPORTED_LANGUAGES) {
    return SUPPORTED_LANGUAGES[langId as SupportedLanguageId];
  }
  return SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE];
};
