import { LanguageMeta, SupportedLanguageId } from './types';
import russianData from './ru/russianData';
import englishData from './en/englishData';
import spanishData from './es/spanishData';
import frenchData from './fr/frenchData';
import portugueseData from './pt/portugueseData';
import germanData from './de/germanData';
import indonesianData from './id/indonesianData';
import turkishData from './tr/turkishData';
import koreanData from './ko/koreanData';
import japaneseData from './ja/japaneseData';

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
  es: {
    id: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    code: 'es-ES',
    ttsVoice: 'es-MX-JorgeNeural',
    hasKeyboard: false,
    hasAlphabet: true,
    hasTimeGuide: true,
    appName: 'Basic Spanish',
    domain: 'basicspanish.school',
    seo: {
      alphabet: {
        title: 'Spanish Alphabet | Basic Spanish',
        description: 'Learn the letters of the Spanish alphabet including ñ with native pronunciation.',
      },
      phrases: {
        title: 'Essential Spanish Phrases | Basic Spanish',
        description: 'Learn practical Spanish phrases for conversation and travel.',
      },
      numbers: {
        title: 'Spanish Numbers | Basic Spanish',
        description: 'Master numbers in Spanish from 0 to 1,000.',
      },
      time: {
        title: 'Telling Time in Spanish | Basic Spanish',
        description: 'Learn how to ask and tell time in Spanish.',
      },
      words: {
        title: 'Core Spanish Vocabulary | Basic Spanish',
        description: 'Essential high-frequency Spanish words.',
      },
      quiz: {
        title: 'Spanish Practice Quiz | Basic Spanish',
        description: 'Test your Spanish knowledge with interactive quizzes.',
      },
    },
    data: spanishData,
  },
  fr: {
    id: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    code: 'fr-FR',
    ttsVoice: 'fr-FR-HenriNeural',
    hasKeyboard: false,
    hasAlphabet: true,
    hasTimeGuide: true,
    appName: 'Basic French',
    domain: 'basicfrench.school',
    seo: {
      alphabet: {
        title: 'French Alphabet | Basic French',
        description: 'Master the French alphabet with native audio guides and examples.',
      },
      phrases: {
        title: 'Essential French Phrases | Basic French',
        description: 'Learn practical French phrases for daily conversation and travel.',
      },
      numbers: {
        title: 'French Numbers | Basic French',
        description: 'Master numbers in French from 0 to 1,000.',
      },
      time: {
        title: 'Telling Time in French | Basic French',
        description: 'Learn how to ask and tell time in French.',
      },
      words: {
        title: 'Core French Vocabulary | Basic French',
        description: 'Essential high-frequency French words.',
      },
      quiz: {
        title: 'French Practice Quiz | Basic French',
        description: 'Test your French knowledge with interactive quizzes.',
      },
    },
    data: frenchData,
  },
  pt: {
    id: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇧🇷',
    code: 'pt-BR',
    ttsVoice: 'pt-BR-AntonioNeural',
    hasKeyboard: false,
    hasAlphabet: true,
    hasTimeGuide: true,
    appName: 'Basic Portuguese',
    domain: 'basicportuguese.school',
    seo: {
      alphabet: {
        title: 'Portuguese Alphabet & Pronunciation | Basic Portuguese',
        description: 'Master the Portuguese alphabet including Ç with native Brazilian Portuguese studio audio.',
      },
      phrases: {
        title: 'Essential Portuguese Phrases | Basic Portuguese',
        description: 'Learn practical Brazilian Portuguese phrases for conversation, business, and travel.',
      },
      numbers: {
        title: 'Portuguese Numbers | Basic Portuguese',
        description: 'Master numbers in Portuguese from 0 to 1,000 with native audio.',
      },
      time: {
        title: 'Telling Time in Portuguese | Basic Portuguese',
        description: 'Learn how to ask and tell time in Portuguese.',
      },
      words: {
        title: 'Core Portuguese Vocabulary | Basic Portuguese',
        description: 'Essential high-frequency Brazilian Portuguese words across everyday topics and industries.',
      },
      quiz: {
        title: 'Portuguese Practice Quiz | Basic Portuguese',
        description: 'Test your Portuguese knowledge with interactive quizzes.',
      },
    },
    data: portugueseData,
  },
  de: {
    id: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    code: 'de-DE',
    ttsVoice: 'de-DE-ConradNeural',
    hasKeyboard: false,
    hasAlphabet: true,
    hasTimeGuide: true,
    appName: 'Basic German',
    domain: 'basicgerman.school',
    seo: {
      alphabet: {
        title: 'German Alphabet (inkl. Ä, Ö, Ü, ß) | Basic German',
        description: 'Master the 30 letters of the German alphabet including Umlaute and Eszett with native studio audio.',
      },
      phrases: {
        title: 'Essential German Phrases | Basic German',
        description: 'Learn practical German phrases for conversation, business, and travel.',
      },
      numbers: {
        title: 'German Numbers | Basic German',
        description: 'Master numbers in German from 0 to 1,000 with native audio.',
      },
      time: {
        title: 'Telling Time in German | Basic German',
        description: 'Learn how to ask and tell time in German.',
      },
      words: {
        title: 'Core German Vocabulary | Basic German',
        description: 'Essential high-frequency German words across everyday topics and industries.',
      },
      quiz: {
        title: 'German Practice Quiz | Basic German',
        description: 'Test your German knowledge with interactive quizzes.',
      },
    },
    data: germanData,
  },
  id: {
    id: 'id',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    flag: '🇮🇩',
    code: 'id-ID',
    ttsVoice: 'id-ID-ArdiNeural',
    hasKeyboard: false,
    hasAlphabet: true,
    hasTimeGuide: true,
    appName: 'Basic Indonesian',
    domain: 'basicindonesian.school',
    seo: {
      alphabet: {
        title: 'Indonesian Alphabet & Pronunciation | Basic Indonesian',
        description: 'Master the 26 letters of the Indonesian alphabet with native studio audio.',
      },
      phrases: {
        title: 'Essential Indonesian Phrases | Basic Indonesian',
        description: 'Learn practical Bahasa Indonesia phrases for conversation, business, and travel.',
      },
      numbers: {
        title: 'Indonesian Numbers | Basic Indonesian',
        description: 'Master numbers in Indonesian from 0 to 1,000 with native audio.',
      },
      time: {
        title: 'Telling Time in Indonesian | Basic Indonesian',
        description: 'Learn how to ask and tell time in Bahasa Indonesia.',
      },
      words: {
        title: 'Core Indonesian Vocabulary | Basic Indonesian',
        description: 'Essential high-frequency Indonesian words across everyday topics and industries.',
      },
      quiz: {
        title: 'Indonesian Practice Quiz | Basic Indonesian',
        description: 'Test your Bahasa Indonesia knowledge with interactive quizzes.',
      },
    },
    data: indonesianData,
  },
  tr: {
    id: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    flag: '🇹🇷',
    code: 'tr-TR',
    ttsVoice: 'tr-TR-AhmetNeural',
    hasKeyboard: false,
    hasAlphabet: true,
    hasTimeGuide: true,
    appName: 'Basic Turkish',
    domain: 'basicturkish.school',
    seo: {
      alphabet: {
        title: 'Turkish Alphabet (29 Letters inkl. Ç, Ğ, I/ı, İ/i, Ö, Ş, Ü) | Basic Turkish',
        description: 'Master the 29 letters of the Turkish alphabet with native studio audio.',
      },
      phrases: {
        title: 'Essential Turkish Phrases | Basic Turkish',
        description: 'Learn practical Turkish phrases for conversation, business, and travel.',
      },
      numbers: {
        title: 'Turkish Numbers | Basic Turkish',
        description: 'Master numbers in Turkish from 0 to 1,000 with native audio.',
      },
      time: {
        title: 'Telling Time in Turkish | Basic Turkish',
        description: 'Learn how to ask and tell time in Turkish.',
      },
      words: {
        title: 'Core Turkish Vocabulary | Basic Turkish',
        description: 'Essential high-frequency Turkish words across everyday topics and industries.',
      },
      quiz: {
        title: 'Turkish Practice Quiz | Basic Turkish',
        description: 'Test your Turkish knowledge with interactive quizzes.',
      },
    },
    data: turkishData,
  },
  ko: {
    id: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    code: 'ko-KR',
    ttsVoice: 'ko-KR-InJoonNeural',
    hasKeyboard: false,
    hasAlphabet: true,
    hasTimeGuide: true,
    appName: 'Basic Korean',
    domain: 'basickorean.school',
    seo: {
      alphabet: {
        title: 'Korean Alphabet (Hangul) | Basic Korean',
        description: 'Learn the Korean Hangul alphabet with consonants, vowels, pronunciation guides, and studio audio.',
      },
      phrases: {
        title: 'Basic Korean Phrases | Basic Korean',
        description: 'Learn essential everyday Korean phrases and greetings with authentic native audio.',
      },
      numbers: {
        title: 'Korean Numbers & Time | Basic Korean',
        description: 'Master Sino-Korean and Native Korean numbers and time expressions.',
      },
      time: {
        title: 'Telling Time in Korean | Basic Korean',
        description: 'Learn how to ask and tell time in Korean.',
      },
      words: {
        title: 'Core Korean Vocabulary | Basic Korean',
        description: 'Essential high-frequency Korean vocabulary for beginners and travelers.',
      },
      quiz: {
        title: 'Korean Practice Quiz | Basic Korean',
        description: 'Test your Korean Hangul, vocabulary, and grammar with interactive quizzes.',
      },
    },
    data: koreanData,
  },
  ja: {
    id: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    code: 'ja-JP',
    ttsVoice: 'ja-JP-KeitaNeural',
    hasKeyboard: false,
    hasAlphabet: true,
    hasTimeGuide: true,
    appName: 'Basic Japanese',
    domain: 'basicjapanese.school',
    seo: {
      alphabet: {
        title: 'Japanese Hiragana Alphabet | Basic Japanese',
        description: 'Learn all 46 Japanese Hiragana characters with pronunciation guides, example vocabulary, and audio.',
      },
      phrases: {
        title: 'Basic Japanese Phrases | Basic Japanese',
        description: 'Essential Japanese conversation, polite greetings, and travel phrases.',
      },
      numbers: {
        title: 'Japanese Numbers & Time | Basic Japanese',
        description: 'Learn numbers 0 to 1,000 and time expressions in Japanese.',
      },
      time: {
        title: 'Telling Time in Japanese | Basic Japanese',
        description: 'Learn how to ask and tell time in Japanese with authentic pronunciation.',
      },
      words: {
        title: 'Common Japanese Words | Basic Japanese',
        description: 'Master high-frequency Japanese vocabulary across daily life and dining.',
      },
      quiz: {
        title: 'Japanese Practice Quiz | Basic Japanese',
        description: 'Interactive quizzes for Japanese kana, vocabulary, and sentence structures.',
      },
    },
    data: japaneseData,
  },
};

export const DEFAULT_LANGUAGE: SupportedLanguageId = 'ru';

export const getLanguageMeta = (langId?: string | null): LanguageMeta => {
  if (langId && langId in SUPPORTED_LANGUAGES) {
    return SUPPORTED_LANGUAGES[langId as SupportedLanguageId];
  }
  return SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE];
};
