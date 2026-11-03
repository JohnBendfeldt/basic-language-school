import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { FaCheck, FaKeyboard, FaTrophy, FaRedo, FaCheckCircle, FaTimesCircle, FaStar, FaGraduationCap, FaChevronDown, FaExclamationTriangle } from 'react-icons/fa';
import RussianKeyboard from './RussianKeyboard';
import PhoneticKeyboard from './PhoneticKeyboard';
import PronunciationButton from './PronunciationButton';
import { transliterate, containsCyrillic } from '../utils/transliteration';
import {
  isPhoneticScriptLanguage,
  containsTargetScript,
  transliterateForLanguage,
  transliterateJapanese,
  appendKoreanJamo,
  stripPinyinTones,
  convertSoundOutToken,
  convertLastLatinWordOnSpace,
  previewSoundOutToken,
  getLocalizedPhoneticCheatsheet,
  PHONETIC_CHEATSHEETS,
  PhoneticScriptLang
} from '../utils/phoneticTyping';
import { evaluateSmartAnswer, isPlausiblePhraseTypo } from '../utils/fuzzyMatcher';
import { ProgressService } from '../services/progressService';
import { MASTERY_THRESHOLD } from '../types/progress';
import { useLanguage } from '../contexts/LanguageContext';
import { getAlphabetAcceptedAnswers } from '../utils/alphabetAnswers';
import {
  NUMBER_TABLE,
  extractDigit,
  resolveTranslation,
  buildQuizQuestionHint,
  getAlphabetQuizHint,
  LANGUAGE_NAMES_IN_BASE
} from '../utils/translationResolver';
import { localizeCategoryBadge, localizeLevelBadge, getQuizToolbarLabels, getQuizRecapLabels, getMultiMeaningNote, getPraiseHeadline, getPraiseTier } from '../utils/pageDictionary';
import { buildHomographIndex, lookupHomograph } from '../utils/homographs';
import { canonicalizeScript } from '../utils/textNormalization';
import { UIStrings } from '../data/translations';
import { SupportedLanguageId } from '../data/languages/types';
import { useIsMobile } from '../hooks/useIsMobile';
import { splitFirstSentence } from '../utils/splitFirstSentence';

const TipText: React.FC<{ text: string }> = ({ text }) => {
  const { first, rest } = splitFirstSentence(text);
  return (
    <span className="tip-text">
      <span className="tip-line">{first}</span>
      {rest && <span className="tip-line tip-line-rest">{rest}</span>}
    </span>
  );
};

// Define interfaces for the data structure
interface AlphabetItem {
  character?: string;
  letter?: string;
  pronunciation: string;
  example?: string;
  russianWord?: string;
  word?: string;
  meaning?: string;
}

interface PhraseItem {
  english?: string;
  russian?: string;
  phrase?: string;
  meaning?: string;
  translation?: string;
  target?: string;
  pronunciation?: string;
  category?: string;
  level?: 1 | 2 | 3;
}

export type QuizCategoryFilter =
  | 'all'
  | 'alphabet'
  | 'basicPhrases'
  | 'commonWords'
  | 'numbers'
  | 'time'
  | 'tech'
  | 'business'
  | 'health'
  | 'travel'
  | 'dining'
  | 'shopping'
  | 'colors'
  | 'weather';

export type QuizMode = 'writing' | 'listening' | 'all';

export interface QuizCategoryInfo {
  id: QuizCategoryFilter;
  label: string;
  icon: string;
  description: string;
}

export const CORE_MODULE_CATEGORIES: QuizCategoryInfo[] = [
  { id: 'all', label: 'All Topics', icon: '🎯', description: 'Curated mix of the entire curriculum' },
  { id: 'alphabet', label: 'Alphabet', icon: '🔤', description: 'Letters and pronunciations' },
  { id: 'basicPhrases', label: 'Phrases & Greetings', icon: '💬', description: 'Greetings, politeness, and essential dialogue' },
  { id: 'commonWords', label: 'Common Words', icon: '📖', description: 'Question words, family, and essentials' },
  { id: 'numbers', label: 'Numbers', icon: '🔢', description: 'Counting 0 through 1,000' },
  { id: 'time', label: 'Time & Days', icon: '⏰', description: 'Days of the week and clock phrases' },
];

export const TOPIC_PACK_CATEGORIES: QuizCategoryInfo[] = [
  { id: 'tech', label: 'Tech & IT', icon: '💻', description: 'Computers, internet, passwords, and remote work' },
  { id: 'business', label: 'Business & Work', icon: '💼', description: 'Office, meetings, contracts, and finance' },
  { id: 'health', label: 'Healthcare', icon: '🏥', description: 'Doctors, medicine, pharmacy, and emergency' },
  { id: 'travel', label: 'Travel & Transit', icon: '✈️', description: 'Airports, hotels, transit, and directions' },
  { id: 'dining', label: 'Food & Dining', icon: '🍽️', description: 'Restaurants, menu, drinks, and meals' },
  { id: 'shopping', label: 'Shopping & Money', icon: '🛍️', description: 'Prices, cards, payment, and sizes' },
  { id: 'colors', label: 'Colors', icon: '🎨', description: 'Colors of everyday life' },
  { id: 'weather', label: 'Weather & Nature', icon: '☀️', description: 'Sun, rain, wind, seasons, and temperature' },
];

export const ALL_QUIZ_CATEGORIES: QuizCategoryInfo[] = [
  ...CORE_MODULE_CATEGORIES,
  ...TOPIC_PACK_CATEGORIES
];

export const QUIZ_CATEGORIES = ALL_QUIZ_CATEGORIES;

export const mapToSubCategoryKey = (cat: string | undefined): QuizCategoryFilter | null => {
  if (!cat) return null;
  const lower = cat.toLowerCase();
  if (lower.includes('tech') || lower.includes('it')) return 'tech';
  if (lower.includes('business') || lower.includes('work') || lower.includes('office') || lower.includes('finance')) return 'business';
  if (lower.includes('health') || lower.includes('medical') || lower.includes('doctor') || lower.includes('emergency')) return 'health';
  if (lower.includes('travel') || lower.includes('transit') || lower.includes('transport') || lower.includes('places')) return 'travel';
  if (lower.includes('dining') || lower.includes('food') || lower.includes('drink')) return 'dining';
  if (lower.includes('shop') || lower.includes('money')) return 'shopping';
  if (lower.includes('color')) return 'colors';
  if (lower.includes('weather') || lower.includes('nature')) return 'weather';
  return null;
};

export const getCategoryLabel = (id: QuizCategoryFilter, ui?: UIStrings, baseLang?: SupportedLanguageId): string => {
  if (baseLang && baseLang !== 'en') {
    const localized = localizeCategoryBadge(id, baseLang);
    if (localized) {
      return localized;
    }
  }
  const defaultInfo = ALL_QUIZ_CATEGORIES.find(c => c.id === id);
  if (defaultInfo) return defaultInfo.label;
  if (!ui) return id;
  switch (id) {
    case 'all': return ui.allTopics || 'All Topics';
    case 'alphabet': return ui.alphabet || 'Alphabet';
    case 'basicPhrases': return 'Phrases & Greetings';
    case 'commonWords': return ui.commonWords || 'Common Words';
    case 'numbers': return ui.numbers || 'Numbers';
    case 'time': return ui.time || 'Time & Days';
    case 'tech': return 'Tech & IT';
    case 'business': return 'Business & Work';
    case 'health': return 'Healthcare';
    case 'travel': return 'Travel & Transit';
    case 'dining': return 'Food & Dining';
    case 'shopping': return 'Shopping & Money';
    case 'colors': return 'Colors';
    case 'weather': return 'Weather & Nature';
    default: return id;
  }
};

export type QuizLevelFilter = 'all' | 1 | 2 | 3;

export interface QuizLevelInfo {
  id: QuizLevelFilter;
  label: string;
  badge: string;
  description: string;
}

export const ALL_QUIZ_LEVELS: QuizLevelInfo[] = [
  { id: 'all', label: 'All Levels', badge: '🌟', description: 'Complete vocabulary pool across all levels' },
  { id: 1, label: 'Level 1: Foundations', badge: '🌱', description: 'Core survival & daily tech essentials' },
  { id: 2, label: 'Level 2: Workplace', badge: '💼', description: 'Office, operations & practical commerce' },
  { id: 3, label: 'Level 3: Professional', badge: '🚀', description: 'Advanced business, finance & tech fluency' },
];

interface QuizProps {
  data: {
    alphabet?: AlphabetItem[];
    basicPhrases?: PhraseItem[];
    numbers?: PhraseItem[];
    commonWords?: PhraseItem[];
    time?: PhraseItem[];
    [key: string]: any;
  };
}

interface QuestionDef {
  item: AlphabetItem | PhraseItem;
  isRussianToEnglish: boolean;
  id: string;
  wordId: string;
  category: string;
  subCategoryKey?: QuizCategoryFilter | null;
  level?: 1 | 2 | 3;
}

interface MissedWord {
  prompt: string;
  answer: string;
  userAnswer: string;
  category: string;
  targetAudioWord?: string;
  russian?: string;
}

// Constants for special characters
const SOFT_SIGN_CHARS = ['Ь', 'ь'];
const HARD_SIGN_CHARS = ['Ъ', 'ъ'];

const isSoftSign = (char: string): boolean => SOFT_SIGN_CHARS.includes(char);
const isHardSign = (char: string): boolean => HARD_SIGN_CHARS.includes(char);
const isSoftSignAnswer = (answer: string): boolean =>
  ['soft sign', 'soft'].includes(answer.toLowerCase().trim());
const isHardSignAnswer = (answer: string): boolean =>
  ['hard sign', 'hard'].includes(answer.toLowerCase().trim());

export const SPECIAL_CHAR_MAP: Record<SupportedLanguageId, string[]> = {
  es: ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'],
  fr: ['é', 'è', 'ê', 'ë', 'à', 'â', 'ç', 'î', 'ï', 'ô', 'ù', 'û', 'œ'],
  de: ['ä', 'ö', 'ü', 'ß'],
  pt: ['ã', 'õ', 'á', 'é', 'í', 'ó', 'ú', 'â', 'ê', 'ô', 'ç'],
  tr: ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü', 'İ'],
  ru: ['я', 'ю', 'ё', 'ж', 'ш', 'щ', 'ч', 'ь', 'ъ', 'ы', 'э'],
  en: [],
  id: [],
  ja: ['っ', 'ゃ', 'ゅ', 'ょ', 'ー', 'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'を', 'ん'],
  ko: ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 'ㅏ', 'ㅓ', 'ㅗ', 'ㅜ', 'ㅡ', 'ㅣ', 'ㅐ', 'ㅔ'],
  zh: ['ā', 'á', 'ǎ', 'à', 'ē', 'é', 'ě', 'è', 'ī', 'í', 'ǐ', 'ì', 'ō', 'ó', 'ǒ', 'ò', 'ū', 'ú', 'ǔ', 'ù', 'ǖ', 'ǘ', 'ǚ', 'ǜ'],
  hi: ['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', 'ं', 'ँ', 'ः', '्', '़', 'क्ष', 'त्र', 'ज्ञ'],
  ar: ['أ', 'إ', 'آ', 'ء', 'ة', 'ى', 'ئ', 'ؤ', 'لا', 'ح', 'خ', 'ع', 'غ', 'ص', 'ض', 'ط', 'ظ', 'ث', 'ذ', 'ق'],
  bn: ['া', 'ি', 'ী', 'ু', 'ূ', 'ৃ', 'ে', 'ৈ', 'ো', 'ৌ', 'ং', 'ঃ', 'ঁ', '্', 'ৎ', 'ড়', 'ঢ়', 'য়'],
  ur: ['آ', 'ء', 'ؤ', 'ئ', 'ٹ', 'ڈ', 'ڑ', 'پ', 'چ', 'ژ', 'گ', 'ں', 'ہ', 'ھ', 'ے', 'ح', 'خ', 'ع', 'غ', 'ق', 'ص', 'ض', 'ط', 'ظ']
};

const getAudioCategory = (questionType: string): 'alphabet' | 'phrases' | 'numbers' | 'words' | 'time' | 'examples' => {
  switch (questionType) {
    case 'alphabet':
      return 'alphabet';
    case 'basicPhrases':
      return 'phrases';
    case 'numbers':
      return 'numbers';
    case 'commonWords':
      return 'words';
    case 'time':
      return 'time';
    default:
      return questionType as any;
  }
};

const Quiz: React.FC<QuizProps> = ({ data }) => {
  const { currentLanguage, currentMeta, baseLanguage, ui } = useLanguage();
  const recapLabels = useMemo(() => getQuizRecapLabels(baseLanguage), [baseLanguage]);
  const targetNameInBase = useMemo(() => LANGUAGE_NAMES_IN_BASE[baseLanguage]?.[currentLanguage] || currentMeta.name, [baseLanguage, currentLanguage, currentMeta.name]);

  // Session Goal: 5, 10, or 20 questions (persisted per language)
  const [sessionGoal, setSessionGoal] = useState<number>(() => {
    const saved = localStorage.getItem(`basic_quiz_goal_${currentLanguage}`) || localStorage.getItem('quiz_goal') || localStorage.getItem('russian_quiz_goal');
    if (saved) {
      const num = parseInt(saved, 10);
      if ([5, 10, 20].includes(num)) return num;
    }
    return 10;
  });

  // Active Category Filter: 'all', 'alphabet', 'basicPhrases', 'commonWords', 'numbers', 'time', plus topic packs
  const [activeCategory, setActiveCategory] = useState<QuizCategoryFilter>(() => {
    const saved = localStorage.getItem(`basic_quiz_category_${currentLanguage}`) || localStorage.getItem('quiz_category') || localStorage.getItem('russian_quiz_category');
    if (saved && ALL_QUIZ_CATEGORIES.some(c => c.id === saved)) {
      return saved as QuizCategoryFilter;
    }
    return 'all';
  });

  // Active Vocabulary Level Filter: 'all' | 1 | 2 | 3
  const [activeLevel, setActiveLevel] = useState<QuizLevelFilter>(() => {
    const saved = localStorage.getItem(`basic_quiz_level_${currentLanguage}`);
    if (saved && ['all', '1', '2', '3'].includes(saved)) {
      return saved === 'all' ? 'all' : (parseInt(saved, 10) as 1 | 2 | 3);
    }
    return 'all';
  });

  // In-session combo streak tracking
  const [comboStreak, setComboStreak] = useState<number>(0);
  const [maxComboStreak, setMaxComboStreak] = useState<number>(0);

  // Practice Modality Mode: 'writing' | 'listening' | 'all'
  const [quizMode, setQuizMode] = useState<QuizMode>(() => {
    const saved = localStorage.getItem(`basic_quiz_mode_${currentLanguage}`) || localStorage.getItem('basic_quiz_mode');
    if (saved && ['writing', 'listening', 'all'].includes(saved)) {
      return saved as QuizMode;
    }
    return 'writing';
  });

  const [showListeningHint, setShowListeningHint] = useState<boolean>(false);

  // Mastered words tracking (masteryLevel >= MASTERY_THRESHOLD)
  const [masteredWordIds, setMasteredWordIds] = useState<Set<string>>(new Set());
  const masteredWordIdsRef = useRef<Set<string>>(new Set());
  const [isWordJustMastered, setIsWordJustMastered] = useState(false);

  // Dropdown states for topic and level filter selectors (replaces horizontal scrollers)
  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false);
  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
  const topicDropdownRef = useRef<HTMLDivElement>(null);
  const levelDropdownRef = useRef<HTMLDivElement>(null);
  const isCompletingRef = useRef(false);

  // Current session tracking
  const [sessionIndex, setSessionIndex] = useState(1);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionAnswered, setSessionAnswered] = useState(0);
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  const [missedInSession, setMissedInSession] = useState<MissedWord[]>([]);

  // Current question state
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isTypoAccepted, setIsTypoAccepted] = useState(false);
  const [typoFeedback, setTypoFeedback] = useState<string | null>(null);
  const [isOverridden, setIsOverridden] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [showPhoneticGuide, setShowPhoneticGuide] = useState(false);
  const rawLatinTypedRef = useRef<string>('');
  const correctSoundRef = useRef<HTMLAudioElement | null>(null);
  const incorrectSoundRef = useRef<HTMLAudioElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  // On phones the quiz settings collapse into a one-line summary so the question stays on screen.
  // On desktop they start open and the learner can collapse them; that choice is remembered.
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [desktopSettingsOpen, setDesktopSettingsOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem('basic_quiz_settings_open') !== 'false';
    } catch {
      return true;
    }
  });
  const effectiveSettingsOpen = isMobile ? settingsOpen : desktopSettingsOpen;
  const toggleSettings = () => {
    if (isMobile) {
      setSettingsOpen(prev => !prev);
    } else {
      setDesktopSettingsOpen(prev => {
        const next = !prev;
        try {
          localStorage.setItem('basic_quiz_settings_open', String(next));
        } catch {
          /* ignore storage errors */
        }
        return next;
      });
    }
    setIsTopicDropdownOpen(false);
    setIsLevelDropdownOpen(false);
  };
  const [dismissedKbTips, setDismissedKbTips] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('basic_kb_tips_seen') || '[]');
    } catch {
      return [];
    }
  });
  useEffect(() => {
    if (sessionAnswered > 0) setSettingsOpen(false);
  }, [sessionAnswered]);
  const dismissKbTip = (lang: string) => {
    setDismissedKbTips(prev => {
      const next = prev.includes(lang) ? prev : [...prev, lang];
      try {
        localStorage.setItem('basic_kb_tips_seen', JSON.stringify(next));
      } catch {
        /* ignore storage errors */
      }
      return next;
    });
  };
  const [_lastInput, setLastInput] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [spellingDiff, setSpellingDiff] = useState<Array<{ char: string; isDiff: boolean }> | null>(null);

  // Ref to track questions asked in current rotation
  const askedQuestionsRef = useRef<Set<string>>(new Set());

  // Ref to track session totals for background persistence
  const sessionStatsRef = useRef<{ score: number; total: number; category: string; isSaved: boolean }>({
    score: 0,
    total: 0,
    category: 'mixed',
    isSaved: false
  });

  // Load mastered words on mount and when language changes
  useEffect(() => {
    ProgressService.getMasteredWordIds(currentLanguage)
      .then(ids => {
        masteredWordIdsRef.current = ids;
        setMasteredWordIds(ids);
        setCurrentQuestion((prev: any) => {
          if (prev && ids.has(prev.id) && sessionAnswered === 0) {
            // Re-select an unmastered question immediately
            getRandomQuestion(ids);
          }
          return prev;
        });
      })
      .catch(err => console.warn('Could not load mastered word IDs:', err));
  }, [currentLanguage, sessionAnswered]);

  // Ensure view glides to top when quiz completes so user never misses celebration banner
  useEffect(() => {
    if (isSessionComplete) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isSessionComplete]);

  // Close topic and level dropdown menus on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (topicDropdownRef.current && !topicDropdownRef.current.contains(e.target as Node)) {
        setIsTopicDropdownOpen(false);
      }
      if (levelDropdownRef.current && !levelDropdownRef.current.contains(e.target as Node)) {
        setIsLevelDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsTopicDropdownOpen(false);
        setIsLevelDropdownOpen(false);
      }
    };
    if (isTopicDropdownOpen || isLevelDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTopicDropdownOpen, isLevelDropdownOpen]);

  // Extract a clean, user-friendly display answer (avoids leading slashes or empty strings)
  const getCleanDisplayAnswer = (
    answer: string,
    prompt?: string,
    type?: string,
    isTargetPrompt?: boolean
  ): string => {
    if (!answer) return prompt || '';
    const parts = answer
      .split('/')
      .map(p => p.trim())
      .filter(Boolean);

    if (parts.length === 0) return prompt || answer;

    // For alphabet questions, show the letter and its phonetic name (e.g. "R (erre)", "H (hache)")
    if (type === 'alphabet' && prompt) {
      const name = parts.find(p => p.toLowerCase() !== prompt.toLowerCase() && !p.startsWith('/') && !p.includes('('));
      if (name) {
        return `${prompt} (${name})`;
      }
      return prompt;
    }

    // For numbers, resolve the appropriate language name (base lang if Target -> Base, target lang if Base -> Target)
    const digitPart = parts.find(p => /^\d+$/.test(p));
    const formatOrDigit = (word: string, digit: string): string => {
      switch (baseLanguage) {
        case 'zh': return `${word}（或 ${digit}）`;
        case 'ja': return `${word}（または ${digit}）`;
        case 'ko': return `${word} (또는 ${digit})`;
        case 'ru': return `${word} (или ${digit})`;
        case 'es':
        case 'pt': return `${word} (o ${digit})`;
        case 'fr': return `${word} (ou ${digit})`;
        case 'de': return `${word} (oder ${digit})`;
        case 'id': return `${word} (atau ${digit})`;
        case 'tr': return `${word} (veya ${digit})`;
        case 'hi': return `${word} (या ${digit})`;
        case 'ar': return `${word} (أو ${digit})`;
        case 'bn': return `${word} (অথবা ${digit})`;
        case 'ur': return `${word} (یا ${digit})`;
        default: return `${word} (or ${digit})`;
      }
    };
    if (digitPart) {
      const digitNum = parseInt(digitPart, 10);
      if (NUMBER_TABLE[digitNum]) {
        const numEntry = NUMBER_TABLE[digitNum];
        const numWord = isTargetPrompt
          ? (numEntry[baseLanguage] || numEntry.en)
          : (numEntry[currentLanguage] || numEntry.en);
        return formatOrDigit(numWord, digitPart);
      }
      const wordPart = parts.find(p => !/^\d+$/.test(p) && !p.startsWith('/') && !p.startsWith('('));
      if (wordPart) {
        return formatOrDigit(wordPart, digitPart);
      }
      return digitPart;
    }

    // Filter out parts that start with / or are purely phonetic metadata
    const cleanCandidates = parts.filter(p => !p.startsWith('/') && !p.startsWith('('));
    if (cleanCandidates.length > 0) {
      return cleanCandidates[0];
    }

    return parts[0].replace(/[/()]/g, '').trim();
  };

  const getListeningHeader = (targetLang: SupportedLanguageId, baseLang: SupportedLanguageId, targetName: string) => {
    const tName = LANGUAGE_NAMES_IN_BASE[baseLang]?.[targetLang] || targetName;
    switch (baseLang) {
      case 'es':
        return `Escucha el audio y escribe lo que oyes en ${tName}:`;
      case 'fr':
        return `Écoutez l'audio et écrivez ce que vous entendez en ${tName} :`;
      case 'de':
        return `Höre das Audio an und schreibe, was du auf ${tName} hörst:`;
      case 'ru':
        return `Послушайте аудио и напишите то, что слышите на ${tName}:`;
      case 'pt':
        return `Ouça o áudio e digite o que ouve em ${tName}:`;
      case 'id':
        return `Dengarkan audio dan ketik apa yang Anda dengar dalam ${tName}:`;
      case 'tr':
        return `Sesi dinleyin ve ${tName} dilinde duyduğunuzu yazın:`;
      case 'ja':
        return `音声を聞いて${tName}で聞き取った内容を入力してください:`;
      case 'ko':
        return `오디오를 듣고 ${tName}로 들리는 내용을 입력하세요:`;
      case 'zh':
        return `听音频并输入你听到的${tName}:`;
      case 'hi':
        return `ऑडियो सुनें और जो सुन रहे हैं उसे ${tName} में लिखें:`;
      case 'ar':
        return `استمع إلى الصوت واكتب ما تسمعه ب${tName}:`;
      case 'bn':
        return `অডিও শুনুন এবং যা শুনছেন তা ${tName}-এ লিখুন:`;
      case 'ur':
        return `آڈیو سنیں اور جو سنتے ہیں اسے ${tName} میں لکھیں:`;
      case 'en':
      default:
        return `Listen to the audio and type what you hear in ${tName}:`;
    }
  };

  const normalizeText = (rawText: string): string => {
    // Make equivalent keyboard characters, wide punctuation and optional diacritics comparable
    const text = canonicalizeScript(rawText);
    let mainText = text;
    const outsideParentheses = text.replace(/\s*\([^)]*\)\s*/g, "");
    if (outsideParentheses.trim()) {
      mainText = outsideParentheses;
    }
    let normalized = mainText.toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    normalized = normalized
      .replace(/c(?=[а-яёА-ЯЁ])/g, 'с')
      .replace(/a(?=[а-яёА-ЯЁ])/g, 'а')
      .replace(/e(?=[а-яёА-ЯЁ])/g, 'е')
      .replace(/o(?=[а-яёА-ЯЁ])/g, 'о')
      .replace(/p(?=[а-яёА-ЯЁ])/g, 'р')
      .replace(/x(?=[а-яёА-ЯЁ])/g, 'х')
      .replace(/y(?=[а-яёА-ЯЁ])/g, 'у');
    return normalized;
  };

  const normalizeEnglishPhrase = (text: string): string => {
    let s = text.toLowerCase().trim();

    // Remove text inside parentheses first (e.g. 'Hello (formal)' -> 'Hello')
    s = s.replace(/\s*\([^)]*\)\s*/g, ' ');

    // Normalize contractions
    const contractionMap: [RegExp, string][] = [
      [/\b(where's|wheres)\b/gi, 'where is'],
      [/\b(what's|whats)\b/gi, 'what is'],
      [/\b(who's|whos)\b/gi, 'who is'],
      [/\b(how's|hows)\b/gi, 'how is'],
      [/\b(that's|thats)\b/gi, 'that is'],
      [/\b(it's|its)\b/gi, 'it is'],
      [/\b(there's|theres)\b/gi, 'there is'],
      [/\b(here's|heres)\b/gi, 'here is'],
      [/\b(i'm|im)\b/gi, 'i am'],
      [/\b(you're|youre)\b/gi, 'you are'],
      [/\b(we're|were)\b/gi, 'we are'],
      [/\b(they're|theyre)\b/gi, 'they are'],
      [/\b(don't|dont)\b/gi, 'do not'],
      [/\b(doesn't|doesnt)\b/gi, 'does not'],
      [/\b(didn't|didnt)\b/gi, 'did not'],
      [/\b(can't|cant)\b/gi, 'cannot'],
      [/\b(won't|wont)\b/gi, 'will not'],
      [/\b(i've|ive)\b/gi, 'i have'],
      [/\b(you've|youve)\b/gi, 'you have'],
      [/\b(i'll|ill)\b/gi, 'i will'],
      [/\b(you'll|youll)\b/gi, 'you will'],
      [/\bwanna\b/gi, 'want to'],
      [/\bgonna\b/gi, 'going to']
    ];

    contractionMap.forEach(([pattern, replacement]) => {
      s = s.replace(pattern, replacement);
    });

    // Strip punctuation
    s = s.replace(/[.,/#!$%^&*;:{}=\-_`~()?'"]/g, ' ').replace(/\s+/g, ' ').trim();

    // Normalize common synonyms & alternative phrasing
    const synonymMap: [RegExp, string][] = [
      [/\b(restroom|toilet|washroom|water closet|wc|lavatory)\b/gi, 'bathroom'],
      [/\b(hi|hey|greetings)\b/gi, 'hello'],
      [/\b(bye|bye bye|see you|farewell)\b/gi, 'goodbye'],
      [/\b(thanks|thank u|many thanks)\b/gi, 'thank you'],
      [/\b(welcome|no problem|not at all|my pleasure|dont mention it)\b/gi, 'you are welcome'],
      [/\b(sorry|pardon|pardon me|forgive me)\b/gi, 'excuse me'],
      [/\b(speak slower|talk slower|speak slowly|talk more slowly)\b/gi, 'speak more slowly'],
      [/\b(repeat please|say it again|say that again|can you repeat)\b/gi, 'please repeat'],
      [/\b(how are you doing|how are things|how is it going)\b/gi, 'how are you'],
      [/\b(how much is it|how much is this|whats the price|what is the price)\b/gi, 'how much does it cost'],
      [/\b(im hungry|i am hungry|i want food|i would like to eat)\b/gi, 'i want to eat'],
      [/\b(im thirsty|i am thirsty|i want water|i would like to drink)\b/gi, 'i want to drink'],
      [/\b(i do not understand|i do not get it|i dont get it)\b/gi, 'i dont understand'],
      [/\b(i am called|they call me)\b/gi, 'my name is'],
      [/\b(yeah|yep|yup)\b/gi, 'yes'],
      [/\b(nope|nah)\b/gi, 'no']
    ];

    synonymMap.forEach(([pattern, replacement]) => {
      s = s.replace(pattern, replacement);
    });

    return s.replace(/\s+/g, ' ').trim();
  };

  const checkNumberEquivalence = (userAnswer: string, correctAnswer: string): boolean => {
    // Strip punctuation, accents, and extra spaces
    const cleanUser = userAnswer.toLowerCase().replace(/[,.]/g, '').replace(/\s+/g, ' ').trim();
    const cleanTarget = correctAnswer.toLowerCase().replace(/[,.]/g, '').replace(/\s+/g, ' ').trim();
    if (cleanUser === cleanTarget) return true;

    const userDigit = extractDigit(cleanUser);
    const targetDigit = extractDigit(cleanTarget);

    // 1. Both contain numbers and match (e.g. user typed "1" and target is "1 - single unit" or "1 (One)")
    if (userDigit !== null && targetDigit !== null && userDigit === targetDigit) {
      return true;
    }

    // 2. User typed a digit (e.g. "1" or "15") and target is a word form (e.g. "quince", "one")
    if (userDigit !== null && NUMBER_TABLE[userDigit]) {
      const allowed = NUMBER_TABLE[userDigit].allWords;
      if (allowed.some(w => cleanTarget === w || cleanTarget.includes(w))) {
        return true;
      }
    }

    // 3. Target contains a digit (e.g. "15 (Fifteen)" or "1 - single unit") and user typed a word form
    if (targetDigit !== null && NUMBER_TABLE[targetDigit]) {
      const allowed = NUMBER_TABLE[targetDigit].allWords;
      if (allowed.some(w => cleanUser === w || cleanUser.includes(w))) {
        return true;
      }
    }

    // 4. Word-to-word cross-language number matching (e.g. user typed "quince" and target is "fifteen")
    for (const mapping of Object.values(NUMBER_TABLE)) {
      const userMatches = mapping.allWords.some(w => cleanUser === w || cleanUser.includes(w));
      const targetMatches = mapping.allWords.some(w => cleanTarget === w || cleanTarget.includes(w));
      if (userMatches && targetMatches) {
        return true;
      }
    }

    return false;
  };

  const levenshteinDistance = (a: string, b: string): number => {
    const matrix = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(null));
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
    return matrix[a.length][b.length];
  };

  const getSpellingDifferences = (userInput: string, correctAnswer: string): Array<{ char: string; isDiff: boolean }> => {
    const userNorm = userInput.toLowerCase();
    const correctNorm = correctAnswer.toLowerCase();
    if (userNorm === correctNorm) return [];
    return correctAnswer.split('').map((char, i) => ({
      char,
      isDiff: i >= userNorm.length || userNorm[i] !== char.toLowerCase()
    }));
  };

  // Build the complete list of all curriculum questions across categories
  const getAllQuestions = useCallback((): QuestionDef[] => {
    if (!data) return [];
    const questions: QuestionDef[] = [];

    if (data.alphabet && Array.isArray(data.alphabet)) {
      data.alphabet.forEach(item => {
        const char = item.character || item.letter || '';
        if (char) {
          questions.push({
            item,
            isRussianToEnglish: true,
            id: `alphabet-${char}`,
            wordId: `alphabet-${char}`,
            category: 'alphabet',
            subCategoryKey: null,
            level: 1
          });
        }
      });
    }

    const categories = ['basicPhrases', 'numbers', 'commonWords', 'time'];
    categories.forEach(cat => {
      if (data[cat] && Array.isArray(data[cat])) {
        data[cat].forEach((item: PhraseItem) => {
          const target = item.russian || item.phrase || item.target || '';
          const meaning = item.english || item.meaning || item.translation || '';
          const subCat = mapToSubCategoryKey(item.category);
          const itemLevel = item.level || 1;
          if (target && meaning) {
            const canonicalWordId = `${cat}-${target}`;
            questions.push({
              item,
              isRussianToEnglish: true,
              id: `${cat}-${target}-to-meaning`,
              wordId: canonicalWordId,
              category: cat,
              subCategoryKey: subCat,
              level: itemLevel
            });
            questions.push({
              item,
              isRussianToEnglish: false,
              id: `${cat}-${meaning}-to-target`,
              wordId: canonicalWordId,
              category: cat,
              subCategoryKey: subCat,
              level: itemLevel
            });
          }
        });
      }
    });

    return questions;
  }, [data]);

  // Helper to determine if a question or word is mastered (handles both canonical wordId and legacy question id)
  const isQuestionMastered = useCallback((q: QuestionDef, masteredSet: Set<string>): boolean => {
    return (
      (Boolean(q.wordId) && masteredSet.has(q.wordId)) ||
      masteredSet.has(q.id)
    );
  }, []);

  // All curriculum questions memoized
  const allCurriculumQuestions = useMemo(() => getAllQuestions(), [getAllQuestions]);

  // Words spelled identically but with different meanings (e.g. 月 = Moon / Month) accept every meaning
  const homographIndex = useMemo(() => {
    if (!data) return new Map();
    const rows: PhraseItem[] = [];
    ['basicPhrases', 'numbers', 'commonWords', 'time'].forEach(cat => {
      if (Array.isArray(data[cat])) rows.push(...(data[cat] as PhraseItem[]));
    });
    return buildHomographIndex(rows, item => resolveTranslation(item, currentLanguage, baseLanguage));
  }, [data, currentLanguage, baseLanguage]);

  // Filter questions for the currently selected category & level
  const currentCategoryQuestions = useMemo(() => {
    let pool = allCurriculumQuestions;
    if (activeCategory !== 'all') {
      pool = pool.filter(q => q.category === activeCategory || q.subCategoryKey === activeCategory);
    }
    if (activeLevel !== 'all') {
      const lvlPool = pool.filter(q => (q.level || 1) === activeLevel);
      if (lvlPool.length > 0) pool = lvlPool;
    }
    return pool;
  }, [allCurriculumQuestions, activeCategory, activeLevel]);

  // Total unique curriculum words across all topics
  const totalCurriculumWords = useMemo(() => {
    const set = new Set<string>();
    allCurriculumQuestions.forEach(q => set.add(q.wordId || q.id));
    return set.size;
  }, [allCurriculumQuestions]);

  // Total mastered words count across all curriculum items
  const totalMasteredWordsCount = useMemo(() => {
    let count = 0;
    const evaluatedWords = new Set<string>();
    allCurriculumQuestions.forEach(q => {
      const wId = q.wordId || q.id;
      if (!evaluatedWords.has(wId)) {
        evaluatedWords.add(wId);
        if (isQuestionMastered(q, masteredWordIds)) {
          count++;
        }
      }
    });
    return count;
  }, [allCurriculumQuestions, masteredWordIds, isQuestionMastered]);

  // Unique vocabulary words in active category & level
  const activeWordIds = useMemo(() => {
    const set = new Set<string>();
    currentCategoryQuestions.forEach(q => set.add(q.wordId || q.id));
    return set;
  }, [currentCategoryQuestions]);

  // Active total words for display and mastery calculation (not question permutations)
  const activeTotalQuestions = activeWordIds.size;

  // Mastered words count specifically within the active filter
  const activeMasteredCount = useMemo(() => {
    let count = 0;
    const evaluatedWords = new Set<string>();
    currentCategoryQuestions.forEach(q => {
      const wId = q.wordId || q.id;
      if (!evaluatedWords.has(wId)) {
        evaluatedWords.add(wId);
        if (isQuestionMastered(q, masteredWordIds)) {
          count++;
        }
      }
    });
    return count;
  }, [currentCategoryQuestions, masteredWordIds, isQuestionMastered]);

  const activeRemainingToMaster = Math.max(0, activeTotalQuestions - activeMasteredCount);

  // Per-category counts (total unique words and mastered words) for category filter badges
  const categoryCounts = useMemo(() => {
    const counts: Record<QuizCategoryFilter, { total: number; mastered: number; wordIds: Set<string> }> = {
      all: { total: totalCurriculumWords, mastered: totalMasteredWordsCount, wordIds: new Set() },
      alphabet: { total: 0, mastered: 0, wordIds: new Set() },
      basicPhrases: { total: 0, mastered: 0, wordIds: new Set() },
      commonWords: { total: 0, mastered: 0, wordIds: new Set() },
      numbers: { total: 0, mastered: 0, wordIds: new Set() },
      time: { total: 0, mastered: 0, wordIds: new Set() },
      tech: { total: 0, mastered: 0, wordIds: new Set() },
      business: { total: 0, mastered: 0, wordIds: new Set() },
      health: { total: 0, mastered: 0, wordIds: new Set() },
      travel: { total: 0, mastered: 0, wordIds: new Set() },
      dining: { total: 0, mastered: 0, wordIds: new Set() },
      shopping: { total: 0, mastered: 0, wordIds: new Set() },
      colors: { total: 0, mastered: 0, wordIds: new Set() },
      weather: { total: 0, mastered: 0, wordIds: new Set() }
    };

    allCurriculumQuestions.forEach(q => {
      const wId = q.wordId || q.id;
      const isMastered = isQuestionMastered(q, masteredWordIds);

      const addWord = (key: QuizCategoryFilter) => {
        if (!counts[key].wordIds.has(wId)) {
          counts[key].wordIds.add(wId);
          counts[key].total += 1;
          if (isMastered) {
            counts[key].mastered += 1;
          }
        }
      };

      const cat = q.category as QuizCategoryFilter;
      if (counts[cat]) addWord(cat);
      if (q.subCategoryKey && counts[q.subCategoryKey]) addWord(q.subCategoryKey);
    });

    return counts;
  }, [allCurriculumQuestions, masteredWordIds, totalCurriculumWords, totalMasteredWordsCount, isQuestionMastered]);

  // Per-level counts (total unique words and mastered words) for level badges and test gates
  const levelCounts = useMemo(() => {
    const counts: Record<1 | 2 | 3, { total: number; mastered: number; wordIds: Set<string> }> = {
      1: { total: 0, mastered: 0, wordIds: new Set() },
      2: { total: 0, mastered: 0, wordIds: new Set() },
      3: { total: 0, mastered: 0, wordIds: new Set() }
    };
    allCurriculumQuestions.forEach(q => {
      const wId = q.wordId || q.id;
      const lvl = (q.level || 1) as 1 | 2 | 3;
      if (counts[lvl] && !counts[lvl].wordIds.has(wId)) {
        counts[lvl].wordIds.add(wId);
        counts[lvl].total += 1;
        if (isQuestionMastered(q, masteredWordIds)) {
          counts[lvl].mastered += 1;
        }
      }
    });
    return counts;
  }, [allCurriculumQuestions, masteredWordIds, isQuestionMastered]);

  const getRandomQuestion = useCallback((overrideMastered?: Set<string>, categoryOverride?: QuizCategoryFilter, modeOverride?: QuizMode, levelOverride?: QuizLevelFilter) => {
    setUserAnswer('');
    setIsCorrect(null);
    setIsTypoAccepted(false);
    setTypoFeedback(null);
    setIsOverridden(false);
    setShowNext(false);
    setSpellingDiff(null);
    setIsWordJustMastered(false);
    setShowListeningHint(false);

    if (!data) return;

    try {
      const allQuestions = getAllQuestions();
      const targetCat = categoryOverride !== undefined ? categoryOverride : activeCategory;
      const targetLvl = levelOverride !== undefined ? levelOverride : activeLevel;
      let targetPool = targetCat === 'all'
        ? allQuestions
        : allQuestions.filter(q => q.category === targetCat || q.subCategoryKey === targetCat);

      if (targetLvl !== 'all') {
        const lvlPool = targetPool.filter(q => (q.level || 1) === targetLvl);
        if (lvlPool.length > 0) targetPool = lvlPool;
      }

      if (targetPool.length === 0) {
        setCurrentQuestion({
          type: 'dummy',
          prompt: 'No questions available in this category',
          answer: '',
          hint: 'Please choose another topic or reload',
          russian: ''
        });
        return;
      }

      const activeMastered = overrideMastered || masteredWordIdsRef.current || masteredWordIds;

      // Priority 1: Unmastered (masteryLevel < 5) AND not yet asked in current rotation
      let candidatePool = targetPool.filter(q =>
        !isQuestionMastered(q, activeMastered) && !askedQuestionsRef.current.has(q.id)
      );

      // Priority 2: If all unmastered were asked in this rotation, reset rotation and pick from unmastered
      if (candidatePool.length === 0) {
        askedQuestionsRef.current.clear();
        candidatePool = targetPool.filter(q => !isQuestionMastered(q, activeMastered));
      }

      // Priority 3: If ALL questions in this category are mastered, allow practicing mastered questions
      if (candidatePool.length === 0) {
        candidatePool = targetPool.filter(q => !askedQuestionsRef.current.has(q.id));
        if (candidatePool.length === 0) {
          askedQuestionsRef.current.clear();
          candidatePool = targetPool;
        }
      }

      const selected = candidatePool[Math.floor(Math.random() * candidatePool.length)];
      askedQuestionsRef.current.add(selected.id);

      const effectiveMode = modeOverride || quizMode;
      const isListening = effectiveMode === 'listening' ? true : (effectiveMode === 'writing' ? false : Math.random() < 0.45);

      if (selected.category === 'alphabet') {
        const item = selected.item as AlphabetItem;
        const character = (item.character || item.letter || '').toString();
        const pronunciation = item.pronunciation?.toString() || '';

        const signQuestionHint = (ch: string): string => {
          switch (baseLanguage) {
            case 'ru': return `Какой это знак: «${ch}»?`;
            case 'es': return `¿Qué tipo de signo es «${ch}»?`;
            case 'fr': return `Quel type de signe est « ${ch} » ?`;
            case 'de': return `Welche Art von Zeichen ist „${ch}“?`;
            case 'pt': return `Que tipo de sinal é «${ch}»?`;
            case 'id': return `Tanda apakah "${ch}"?`;
            case 'tr': return `"${ch}" ne tür bir işarettir?`;
            case 'zh': return `“${ch}”是什么符号（软音符号 / 硬音符号）？`;
            case 'ja': return `「${ch}」はどの記号ですか（軟音記号 / 硬音記号）？`;
            case 'ko': return `"${ch}"는 어떤 부호입니까 (연음부호 / 경음부호)?`;
            case 'hi': return `"${ch}" किस प्रकार का चिह्न है?`;
            case 'ar': return `ما نوع العلامة «${ch}»؟`;
            case 'bn': return `"${ch}" কোন ধরনের চিহ্ন?`;
            case 'ur': return `"${ch}" کس قسم کی علامت ہے؟`;
            default: return `What type of sign is "${ch}"?`;
          }
        };

        if (isSoftSign(character)) {
          setCurrentQuestion({
            type: 'alphabet',
            prompt: character,
            answer: 'soft sign/soft/мягкий знак/мягкий/软音符号/軟音記号/연음부호/ь',
            hint: signQuestionHint(character),
            targetAudioWord: character,
            russian: character,
            isTargetPrompt: true,
            isListeningMode: isListening,
            id: selected.id,
            wordId: selected.wordId || selected.id
          });
        } else if (isHardSign(character)) {
          setCurrentQuestion({
            type: 'alphabet',
            prompt: character,
            answer: 'hard sign/hard/твёрдый знак/твердый знак/твёрдый/твердый/硬音符号/硬音記号/경음부호/ъ',
            hint: signQuestionHint(character),
            targetAudioWord: character,
            russian: character,
            isTargetPrompt: true,
            isListeningMode: isListening,
            id: selected.id,
            wordId: selected.wordId || selected.id
          });
        } else {
          const acceptedAnswers = getAlphabetAcceptedAnswers(character, pronunciation, currentLanguage);
          setCurrentQuestion({
            type: 'alphabet',
            prompt: character,
            answer: acceptedAnswers.join('/'),
            hint: getAlphabetQuizHint(character, currentLanguage, baseLanguage, currentMeta.name, isListening),
            pronunciation: pronunciation,
            meaningHint: pronunciation ? `/${pronunciation}/` : character,
            baseMeaning: pronunciation,
            targetAudioWord: character,
            russian: character,
            isTargetPrompt: true,
            isListeningMode: isListening,
            id: selected.id,
            wordId: selected.wordId || selected.id
          });
        }
      } else {
        const item = selected.item as PhraseItem;
        const targetWord = (item.russian || item.phrase || item.target || '').toString();
        const rawMeaning = (item.english || item.meaning || item.translation || '').toString();
        const baseWord = resolveTranslation(item, currentLanguage, baseLanguage);

        // 1. Check if the item is a number
        const digit = extractDigit(targetWord) ?? extractDigit(rawMeaning);
        if (digit !== null && NUMBER_TABLE[digit]) {
          const numItem = NUMBER_TABLE[digit];
          const targetNumWord = numItem[currentLanguage] || numItem.en;
          const baseNumWord = numItem[baseLanguage] || numItem.en;
          const cleanTargetAnswer = `${targetNumWord}/${digit}/${targetWord}`;
          const cleanBaseAnswer = `${baseNumWord}/${digit}/${baseWord}`;
          const combinedAnswer = `${cleanTargetAnswer}/${cleanBaseAnswer}`.toLowerCase();

          if (isListening) {
            setCurrentQuestion({
              type: selected.category,
              prompt: targetWord,
              answer: combinedAnswer,
              hint: getListeningHeader(currentLanguage, baseLanguage, currentMeta.name),
              pronunciation: item.pronunciation,
              meaningHint: baseNumWord,
              baseMeaning: baseNumWord,
              targetAudioWord: targetWord,
              promptAudioWord: targetWord,
              russian: targetWord,
              isTargetPrompt: true,
              isListeningMode: true,
              id: selected.id,
              wordId: selected.wordId || selected.id
            });
          } else if (selected.isRussianToEnglish) {
            // Target -> Base (e.g. Prompt is "quince", User can answer "15", "quince", or base language "пятнадцать")
            const promptText = targetWord;
            setCurrentQuestion({
              type: selected.category,
              prompt: promptText,
              answer: cleanBaseAnswer.toLowerCase(),
              hint: buildQuizQuestionHint(promptText, true, currentLanguage, baseLanguage),
              pronunciation: item.pronunciation,
              targetAudioWord: promptText,
              promptAudioWord: promptText,
              russian: promptText,
              isTargetPrompt: true,
              isListeningMode: false,
              id: selected.id,
              wordId: selected.wordId || selected.id
            });
          } else {
            // Base -> Target (e.g. Prompt is "15 (Пятнадцать)", User answers "quince" or "15")
            const promptText = `${digit} (${baseNumWord})`;
            setCurrentQuestion({
              type: selected.category,
              prompt: promptText,
              answer: cleanTargetAnswer.toLowerCase(),
              hint: buildQuizQuestionHint(promptText, false, currentLanguage, baseLanguage),
              pronunciation: item.pronunciation,
              targetAudioWord: targetWord,
              promptAudioWord: baseNumWord,
              russian: targetWord,
              isTargetPrompt: false,
              isListeningMode: false,
              id: selected.id,
              wordId: selected.wordId || selected.id
            });
          }
        } else {
          // 2. Check if rawMeaning is a descriptive definition (e.g. starts with Noun:, Verb:, or > 25 chars)
          const isVerboseDefinition = /^noun:\s*/i.test(rawMeaning) ||
            /^verb:\s*/i.test(rawMeaning) ||
            rawMeaning.length > 25 ||
            rawMeaning.includes('Asking for') ||
            rawMeaning.includes('Universal friendly');

          if (isListening) {
            // Listening mode: Prompt is target audio.
            // Learner may type either what they heard in targetLanguage, or their native baseLanguage translation.
            const homograph = lookupHomograph(homographIndex, targetWord);
            const acceptedMeanings = homograph ? homograph.acceptedMeanings.join('/') : baseWord;
            const combinedAnswer = `${targetWord}/${acceptedMeanings}`.toLowerCase();
            setCurrentQuestion({
              type: selected.category,
              prompt: targetWord,
              answer: combinedAnswer,
              hint: getListeningHeader(currentLanguage, baseLanguage, currentMeta.name),
              pronunciation: item.pronunciation,
              meaningHint: baseWord,
              baseMeaning: baseWord,
              alternateMeanings: homograph && homograph.distinctSenses.length > 1 ? homograph.distinctSenses : undefined,
              targetAudioWord: targetWord,
              promptAudioWord: targetWord,
              russian: targetWord,
              isTargetPrompt: true,
              isListeningMode: true,
              id: selected.id,
              wordId: selected.wordId || selected.id
            });
          } else if (isVerboseDefinition && baseLanguage === currentLanguage) {
            // Pedagogical Rule for monolingual practice: Complex definition is the prompt, simplest single word is the answer!
            const promptText = rawMeaning.replace(/^(Noun|Verb):\s*/i, '').trim();
            setCurrentQuestion({
              type: selected.category,
              prompt: promptText,
              answer: targetWord.toLowerCase(),
              hint: buildQuizQuestionHint(promptText, false, currentLanguage, baseLanguage),
              pronunciation: item.pronunciation,
              targetAudioWord: targetWord,
              promptAudioWord: promptText,
              russian: targetWord,
              isTargetPrompt: false,
              isListeningMode: false,
              id: selected.id,
              wordId: selected.wordId || selected.id
            });
          } else if (selected.isRussianToEnglish) {
            // Target -> Base: prompt is target word in foreign language, answer must be in learner's base/native language
            const promptText = targetWord;
            const homograph = lookupHomograph(homographIndex, targetWord);
            const cleanAnswer = (homograph ? homograph.acceptedMeanings.join('/') : baseWord).toLowerCase();
            setCurrentQuestion({
              type: selected.category,
              prompt: promptText,
              answer: cleanAnswer,
              alternateMeanings: homograph && homograph.distinctSenses.length > 1 ? homograph.distinctSenses : undefined,
              hint: buildQuizQuestionHint(promptText, true, currentLanguage, baseLanguage),
              pronunciation: item.pronunciation,
              targetAudioWord: promptText,
              promptAudioWord: promptText,
              russian: promptText,
              isTargetPrompt: true,
              isListeningMode: false,
              id: selected.id,
              wordId: selected.wordId || selected.id
            });
          } else {
            // Base -> Target: prompt is base word in learner's native tongue, answer must be in target language
            const promptText = baseWord;
            const cleanAnswer = targetWord.toLowerCase();
            setCurrentQuestion({
              type: selected.category,
              prompt: promptText,
              answer: cleanAnswer,
              hint: buildQuizQuestionHint(promptText, false, currentLanguage, baseLanguage),
              pronunciation: item.pronunciation,
              targetAudioWord: targetWord,
              promptAudioWord: promptText,
              russian: targetWord,
              isTargetPrompt: false,
              isListeningMode: false,
              id: selected.id,
              wordId: selected.wordId || selected.id
            });
          }
        }
      }

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus({ preventScroll: true });
        }
      }, 100);
    } catch (error) {
      console.error("Error generating question:", error);
      setCurrentQuestion({
        type: 'emergency',
        prompt: 'Hello',
        answer: 'привет',
        hint: 'How do you say this in Russian?',
        russian: 'Привет',
        id: 'emergency-hello'
      });
    }
  }, [data, getAllQuestions, activeCategory, quizMode, masteredWordIds, baseLanguage, currentLanguage, currentMeta.name, homographIndex]);

  const handleNextQuestion = useCallback(() => {
    setSessionIndex(prev => prev + 1);
    getRandomQuestion(undefined, activeCategory, quizMode, activeLevel);
  }, [getRandomQuestion, activeCategory, quizMode, activeLevel]);

  const handleCompleteSession = useCallback(async () => {
    // Debounce guard: prevent multi-clicks, Enter key repeats, or duplicate network saves
    if (sessionStatsRef.current.isSaved || isCompletingRef.current) {
      return;
    }
    isCompletingRef.current = true;
    setIsSessionComplete(true);
    sessionStatsRef.current.isSaved = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      await ProgressService.recordQuizSession({
        category: activeCategory === 'all' ? 'mixed' : activeCategory,
        score: sessionScore,
        totalQuestions: sessionGoal,
        ...(currentLanguage && currentLanguage !== 'ru' ? { languageId: currentLanguage } : {})
      });
    } catch (err) {
      console.warn('Could not record completed quiz session:', err);
    } finally {
      setTimeout(() => {
        isCompletingRef.current = false;
      }, 1000);
    }
  }, [sessionScore, sessionGoal, activeCategory, currentLanguage]);

  const startNewQuizSession = useCallback((newGoal?: number, newCategory?: QuizCategoryFilter, newMode?: QuizMode, newLevel?: QuizLevelFilter) => {
    isCompletingRef.current = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const goal = newGoal !== undefined ? newGoal : sessionGoal;
    const cat = newCategory !== undefined ? newCategory : activeCategory;
    const mode = newMode !== undefined ? newMode : quizMode;
    const lvl = newLevel !== undefined ? newLevel : activeLevel;
    if (newGoal !== undefined && newGoal !== sessionGoal) {
      setSessionGoal(goal);
      localStorage.setItem('russian_quiz_goal', goal.toString());
      localStorage.setItem(`basic_quiz_goal_${currentLanguage}`, goal.toString());
    }
    setSessionIndex(1);
    setSessionScore(0);
    setSessionAnswered(0);
    setComboStreak(0);
    setMaxComboStreak(0);
    setMissedInSession([]);
    setIsSessionComplete(false);
    setShowNext(false);
    setUserAnswer('');
    setIsCorrect(null);
    setIsTypoAccepted(false);
    setTypoFeedback(null);
    setIsOverridden(false);
    setSpellingDiff(null);
    setIsWordJustMastered(false);
    setShowListeningHint(false);
    sessionStatsRef.current = {
      score: 0,
      total: 0,
      category: cat === 'all' ? 'mixed' : cat,
      isSaved: false
    };
    getRandomQuestion(undefined, cat, mode, lvl);
  }, [sessionGoal, activeCategory, quizMode, activeLevel, currentLanguage, getRandomQuestion]);

  const handleCategoryChange = (newCategory: QuizCategoryFilter) => {
    if (newCategory === activeCategory) return;
    setActiveCategory(newCategory);
    localStorage.setItem('russian_quiz_category', newCategory);
    localStorage.setItem(`basic_quiz_category_${currentLanguage}`, newCategory);
    askedQuestionsRef.current.clear();
    startNewQuizSession(sessionGoal, newCategory, quizMode, activeLevel);
  };

  const handleLevelChange = (newLevel: QuizLevelFilter) => {
    if (newLevel === activeLevel) return;
    setActiveLevel(newLevel);
    localStorage.setItem(`basic_quiz_level_${currentLanguage}`, String(newLevel));
    askedQuestionsRef.current.clear();
    startNewQuizSession(sessionGoal, activeCategory, quizMode, newLevel);
  };

  const handleModeChange = (newMode: QuizMode) => {
    if (newMode === quizMode) return;
    setQuizMode(newMode);
    localStorage.setItem('basic_quiz_mode', newMode);
    localStorage.setItem(`basic_quiz_mode_${currentLanguage}`, newMode);
    askedQuestionsRef.current.clear();
    startNewQuizSession(sessionGoal, activeCategory, newMode, activeLevel);
  };

  const handleGoalChange = (newGoal: number) => {
    if (newGoal === sessionGoal) return;
    localStorage.setItem('russian_quiz_goal', newGoal.toString());
    setSessionGoal(newGoal);

    // If user already reached or exceeded the new goal, finish session right away (debounced)
    if (sessionAnswered >= newGoal && !sessionStatsRef.current.isSaved && !isCompletingRef.current) {
      isCompletingRef.current = true;
      setIsSessionComplete(true);
      sessionStatsRef.current.isSaved = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      ProgressService.recordQuizSession({
        category: 'mixed',
        score: sessionScore,
        totalQuestions: sessionAnswered,
        ...(currentLanguage && currentLanguage !== 'ru' ? { languageId: currentLanguage } : {})
      }).catch(err => console.warn('Could not save quiz session on goal adjustment:', err))
        .finally(() => {
          setTimeout(() => {
            isCompletingRef.current = false;
          }, 1000);
        });
    }
  };

  // Global event listener for Enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (isSessionComplete) {
          e.preventDefault();
          startNewQuizSession();
        } else if (showNext && !(e.target instanceof HTMLInputElement)) {
          e.preventDefault();
          if (sessionAnswered >= sessionGoal) {
            handleCompleteSession();
          } else {
            handleNextQuestion();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSessionComplete, showNext, sessionAnswered, sessionGoal, handleCompleteSession, handleNextQuestion, startNewQuizSession]);

  // Focus input when new question appears without scrolling/jumping
  useEffect(() => {
    if (currentQuestion && !showNext && !isSessionComplete && inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  }, [currentQuestion, showNext, isSessionComplete]);

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      getRandomQuestion(undefined, activeCategory);

      correctSoundRef.current = new Audio('/audio/sounds/correct.mp3');
      incorrectSoundRef.current = new Audio('/audio/sounds/incorrect.mp3');
    }
  }, [getRandomQuestion, activeCategory]);

  // Cleanup effect: save partial session if unmounting mid-quiz (at least 3 questions answered)
  useEffect(() => {
    return () => {
      const currentStats = sessionStatsRef.current;
      if (currentStats.total >= 3 && !currentStats.isSaved) {
        ProgressService.recordQuizSession({
          category: currentStats.category,
          score: currentStats.score,
          totalQuestions: currentStats.total,
          ...(currentLanguage && currentLanguage !== 'ru' ? { languageId: currentLanguage } : {})
        }).catch(err => console.warn('Could not save unmounted quiz session:', err));
      }

      if (correctSoundRef.current) correctSoundRef.current.pause();
      if (incorrectSoundRef.current) incorrectSoundRef.current.pause();
    };
  }, []);

  useEffect(() => {
    rawLatinTypedRef.current = '';
  }, [currentQuestion]);

  const isNonListeningAlphabet = Boolean(
    currentQuestion?.type?.includes('alphabet') && !currentQuestion?.isListeningMode
  );

  const needsRussianKeyboard = Boolean(
    currentQuestion &&
    !isNonListeningAlphabet &&
    (
      (currentLanguage === 'ru' && (!currentQuestion.isTargetPrompt || currentQuestion.isListeningMode)) ||
      (!currentQuestion.type.includes('alphabet') && baseLanguage === 'ru' && currentQuestion.isTargetPrompt) ||
      currentQuestion.hint.includes('Russian') ||
      currentQuestion.hint.includes('русском')
    )
  );

  const expectedAnswerLanguage: SupportedLanguageId = useMemo(() => {
    if (!currentQuestion) return currentLanguage;
    if (needsRussianKeyboard) return 'ru';
    if (currentQuestion.type.includes('alphabet')) {
      return currentQuestion.isListeningMode ? currentLanguage : baseLanguage;
    }
    if (currentQuestion.isListeningMode) return currentLanguage;
    if (currentQuestion.isTargetPrompt) return baseLanguage;
    return currentLanguage;
  }, [currentQuestion, needsRussianKeyboard, baseLanguage, currentLanguage]);

  const activePhoneticLang: PhoneticScriptLang | null = useMemo(() => {
    if (!currentQuestion || isNonListeningAlphabet) {
      return null;
    }
    if (needsRussianKeyboard) return 'ru';
    if (isPhoneticScriptLanguage(expectedAnswerLanguage)) {
      return expectedAnswerLanguage;
    }
    return null;
  }, [currentQuestion, isNonListeningAlphabet, needsRussianKeyboard, expectedAnswerLanguage]);

  const needsPhoneticKeyboard = activePhoneticLang !== null;

  const soundOutPreview = useMemo(() => {
    if (!activePhoneticLang || showNext || !userAnswer) return null;
    return previewSoundOutToken(userAnswer, activePhoneticLang);
  }, [activePhoneticLang, showNext, userAnswer]);

  const activeSpecialChars = useMemo(() => {
    if (!currentQuestion || showNext) return [];
    if (currentQuestion.type && currentQuestion.type.includes('alphabet')) {
      const chars = new Set<string>();
      if (
        !currentQuestion.isListeningMode &&
        currentQuestion.prompt &&
        currentQuestion.prompt.length <= 4 &&
        !/^[a-zA-Z0-9\s]+$/.test(currentQuestion.prompt)
      ) {
        chars.add(currentQuestion.prompt);
      }
      (SPECIAL_CHAR_MAP[currentLanguage] || []).forEach(c => chars.add(c));
      (SPECIAL_CHAR_MAP[expectedAnswerLanguage] || []).forEach(c => chars.add(c));
      return Array.from(chars);
    }
    return SPECIAL_CHAR_MAP[expectedAnswerLanguage] || [];
  }, [currentQuestion, showNext, expectedAnswerLanguage, currentLanguage]);

  const checkAnswer = () => {
    if (!userAnswer.trim()) return;
    setSpellingDiff(null);

    const rawUserAnswer = userAnswer;
    let processedAnswer = userAnswer;
    if (needsRussianKeyboard && !containsCyrillic(processedAnswer)) {
      const soundOutRu = convertSoundOutToken(processedAnswer, 'ru');
      processedAnswer = soundOutRu || transliterate(processedAnswer);
      setUserAnswer(processedAnswer);
    }

    const userAnswerNormalized = normalizeText(processedAnswer);
    const typedPromptDirectly = Boolean(
      currentQuestion &&
      !currentQuestion.isTargetPrompt &&
      !currentQuestion.isListeningMode &&
      normalizeText(rawUserAnswer) === normalizeText(currentQuestion.prompt)
    );

    const phoneticCandidate =
      activePhoneticLang &&
      activePhoneticLang !== 'ru' &&
      !typedPromptDirectly &&
      !containsTargetScript(rawUserAnswer, activePhoneticLang)
        ? convertSoundOutToken(rawUserAnswer, activePhoneticLang) || transliterateForLanguage(rawUserAnswer, activePhoneticLang)
        : '';
    const phoneticNormalized = phoneticCandidate ? normalizeText(phoneticCandidate) : '';

    let isAnswerCorrect = false;

    if (isSoftSign(currentQuestion.prompt) && isSoftSignAnswer(userAnswerNormalized)) {
      isAnswerCorrect = true;
    } else if (isHardSign(currentQuestion.prompt) && isHardSignAnswer(userAnswerNormalized)) {
      isAnswerCorrect = true;
    } else if (currentQuestion.type === 'alphabet' && userAnswerNormalized === normalizeText(currentQuestion.prompt)) {
      isAnswerCorrect = true;
    } else {
      // Collect all valid target answers (split by '/' if present)
      const rawTargets = currentQuestion.answer.includes('/')
        ? currentQuestion.answer.split('/')
        : [currentQuestion.answer];

      const expandedTargets: string[] = [];
      rawTargets.forEach((target: string) => {
        expandedTargets.push(target);
        // Also add version without parentheses, e.g. "Hello (formal)" -> "Hello"
        const noParens = target.replace(/\s*\([^)]*\)\s*/g, ' ').trim();
        if (noParens && noParens !== target) {
          expandedTargets.push(noParens);
        }
      });

      // An exact hit on ANY accepted answer wins before fuzzy matching runs against an earlier one
      if (!typedPromptDirectly && expandedTargets.some((t: string) => userAnswerNormalized === normalizeText(t))) {
        isAnswerCorrect = true;
      }

      // Phonetic conversion match for non-Latin scripts (ar, ur, hi, bn, ja, ko, zh)
      if (!isAnswerCorrect && phoneticNormalized && expandedTargets.some((t: string) => phoneticNormalized === normalizeText(t))) {
        isAnswerCorrect = true;
        if (!currentQuestion.isListeningMode && activePhoneticLang !== 'zh') {
          processedAnswer = phoneticCandidate;
          setUserAnswer(phoneticCandidate);
        }
      }

      // Japanese Hiragana / Romaji reading match when curriculum answer contains Kanji
      if (!isAnswerCorrect && activePhoneticLang === 'ja' && currentQuestion.pronunciation && !typedPromptDirectly) {
        const expectedJaKana = normalizeText(transliterateJapanese(currentQuestion.pronunciation.replace(/-/g, '')));
        if (expectedJaKana && (userAnswerNormalized === expectedJaKana || phoneticNormalized === expectedJaKana)) {
          isAnswerCorrect = true;
          if (!currentQuestion.isListeningMode && phoneticCandidate && !containsTargetScript(rawUserAnswer, 'ja')) {
            processedAnswer = phoneticCandidate;
            setUserAnswer(phoneticCandidate);
          }
        }
      }

      // Mandarin Pinyin match (tone-marked, numeric e.g. ni3 hao3, or toneless pinyin)
      if (!isAnswerCorrect && activePhoneticLang === 'zh' && currentQuestion.pronunciation && !typedPromptDirectly) {
        const expectedPinyinNorm = normalizeText(currentQuestion.pronunciation);
        const expectedPinyinPlain = stripPinyinTones(currentQuestion.pronunciation).replace(/\s+/g, '');
        const userPinyinPlain = stripPinyinTones(rawUserAnswer).replace(/\s+/g, '');
        if (
          expectedPinyinPlain.length >= 2 &&
          (userAnswerNormalized === expectedPinyinNorm ||
            phoneticNormalized === expectedPinyinNorm ||
            userPinyinPlain === expectedPinyinPlain)
        ) {
          isAnswerCorrect = true;
          if (!currentQuestion.isListeningMode && phoneticCandidate && phoneticCandidate !== rawUserAnswer) {
            processedAnswer = phoneticCandidate;
            setUserAnswer(phoneticCandidate);
          }
        }
      }

      for (const target of expandedTargets) {
        if (isAnswerCorrect) break;

        const targetNormalized = normalizeText(target);

        // 1. Exact match after standard normalization
        if (userAnswerNormalized === targetNormalized) {
          isAnswerCorrect = true;
          break;
        }

        // 2. Number equivalence (e.g. '1' <=> 'one' <=> 'один')
        if (checkNumberEquivalence(userAnswerNormalized, targetNormalized)) {
          isAnswerCorrect = true;
          break;
        }

        // 3. Russian / Cyrillic matching with Levenshtein tolerance
        if (containsCyrillic(userAnswerNormalized) || containsCyrillic(targetNormalized)) {
          const userRu = userAnswerNormalized.replace(/ё/g, 'е');
          const targetRu = targetNormalized.replace(/ё/g, 'е');

          // Exact Russian match (treating ё and е as interchangeable)
          if (userRu === targetRu) {
            isAnswerCorrect = true;
            break;
          }

          // Cyrillic typo tolerance (for words of length >= 3, never digits or alphabet flashcards)
          if (
            !/\d/.test(userAnswerNormalized) &&
            !/\d/.test(targetNormalized) &&
            currentQuestion.type !== 'alphabet' &&
            targetNormalized.length >= 3
          ) {
            const maxErrors = targetNormalized.length >= 7 ? 2 : 1;
            const distance = levenshteinDistance(userRu, targetRu);
            if (distance <= maxErrors && isPlausiblePhraseTypo(userRu, targetRu)) {
              isAnswerCorrect = true;
              if (containsCyrillic(targetNormalized)) {
                setSpellingDiff(getSpellingDifferences(userAnswerNormalized, targetNormalized));
              } else {
                setSpellingDiff(null);
              }
              break;
            }
          }
        } else {
          // 4. Smart fuzzy matching with token-level typo tolerance, synonyms, and contractions
          const smartResult = evaluateSmartAnswer(userAnswer, expandedTargets);
          if (smartResult.isMatch) {
            isAnswerCorrect = true;
            if (smartResult.isTypo) {
              setIsTypoAccepted(true);
              setTypoFeedback(smartResult.feedbackNote || null);
            }
            break;
          }

          // Fallback English phrase matching with contraction expansion, synonyms, and article tolerance
          const userEnglishNorm = normalizeEnglishPhrase(userAnswer);
          const targetEnglishNorm = normalizeEnglishPhrase(target);

          if (userEnglishNorm === targetEnglishNorm) {
            isAnswerCorrect = true;
            break;
          }

          // Article tolerance ("where is restroom" === "where is the bathroom")
          const stripArticles = (s: string) => s.replace(/\b(the|a|an)\b/gi, '').replace(/\s+/g, ' ').trim();
          if (stripArticles(userEnglishNorm) === stripArticles(targetEnglishNorm)) {
            isAnswerCorrect = true;
            break;
          }

          // Substring inclusion with high length overlap (only for multi-word phrases of length >= 4, never digits or alphabet)
          if (
            !/\d/.test(userEnglishNorm) &&
            !/\d/.test(targetEnglishNorm) &&
            currentQuestion.type !== 'alphabet' &&
            (userEnglishNorm.includes(targetEnglishNorm) || targetEnglishNorm.includes(userEnglishNorm))
          ) {
            const minLen = Math.min(userEnglishNorm.length, targetEnglishNorm.length);
            const maxLen = Math.max(userEnglishNorm.length, targetEnglishNorm.length);
            if (minLen >= 4 && minLen / maxLen >= 0.6) {
              isAnswerCorrect = true;
              break;
            }
          }

          // English Levenshtein typo tolerance (for words/phrases of length >= 3, NEVER for alphabet or digits)
          if (
            !/\d/.test(userEnglishNorm) &&
            !/\d/.test(targetEnglishNorm) &&
            currentQuestion.type !== 'alphabet' &&
            targetEnglishNorm.length >= 3
          ) {
            const engMaxErrors = targetEnglishNorm.length >= 7 ? 2 : 1;
            const engDistance = levenshteinDistance(userEnglishNorm, targetEnglishNorm);
            if (engDistance <= engMaxErrors && isPlausiblePhraseTypo(userEnglishNorm, targetEnglishNorm)) {
              isAnswerCorrect = true;
              if (engDistance > 0) {
                setSpellingDiff(getSpellingDifferences(userAnswer.trim(), target));
              }
              break;
            }
          }
        }
      }

      // If in Listening Mode the user typed a base-language translation (e.g. "thank you") whose spaces
      // triggered live phonetic conversion, also validate their raw Latin keystrokes so both work seamlessly!
      const rawLatinCandidate = rawLatinTypedRef.current.trim();
      if (
        !isAnswerCorrect &&
        currentQuestion.isListeningMode &&
        rawLatinCandidate &&
        normalizeText(rawLatinCandidate) !== userAnswerNormalized
      ) {
        const rawNorm = normalizeText(rawLatinCandidate);
        if (expandedTargets.some((t: string) => rawNorm === normalizeText(t))) {
          isAnswerCorrect = true;
          processedAnswer = rawLatinCandidate;
          setUserAnswer(rawLatinCandidate);
        } else {
          const smartRaw = evaluateSmartAnswer(rawLatinCandidate, expandedTargets);
          if (smartRaw.isMatch) {
            isAnswerCorrect = true;
            processedAnswer = rawLatinCandidate;
            setUserAnswer(rawLatinCandidate);
            if (smartRaw.isTypo) {
              setIsTypoAccepted(true);
              setTypoFeedback(smartRaw.feedbackNote || null);
            }
          }
        }
      }
    }

    setIsCorrect(isAnswerCorrect);
    setShowNext(true);
    const newSessionAnswered = sessionAnswered + 1;
    const newSessionScore = isAnswerCorrect ? sessionScore + 1 : sessionScore;
    setSessionAnswered(newSessionAnswered);

    if (isAnswerCorrect) {
      setSessionScore(newSessionScore);
      setComboStreak(prev => {
        const next = prev + 1;
        setMaxComboStreak(m => Math.max(m, next));
        return next;
      });
      playSound(correctSoundRef.current, "correct");
    } else {
      setComboStreak(0);
      playSound(incorrectSoundRef.current, "incorrect");
      setMissedInSession(prev => [
        ...prev,
        {
          prompt: currentQuestion.prompt,
          answer: currentQuestion.answer,
          userAnswer: processedAnswer,
          category: currentQuestion.type,
          targetAudioWord: currentQuestion.targetAudioWord || currentQuestion.russian,
          russian: currentQuestion.russian
        }
      ]);
    }

    sessionStatsRef.current = {
      score: newSessionScore,
      total: newSessionAnswered,
      category: currentQuestion?.type || 'mixed',
      isSaved: false
    };

    // Record word attempt in background and check if it reached mastery (level 5)
    if (currentQuestion) {
      const targetWord = currentQuestion.targetAudioWord || currentQuestion.russian || (currentQuestion.isTargetPrompt ? currentQuestion.prompt : currentQuestion.answer.split('/')[0]);
      const meaningWord = currentQuestion.isTargetPrompt ? currentQuestion.answer.split('/')[0] : currentQuestion.prompt;

      ProgressService.recordWordAttempt({
        category: currentQuestion.type || 'alphabet',
        wordId: currentQuestion.wordId || currentQuestion.id || `${currentQuestion.type}-${currentQuestion.prompt}`,
        prompt: currentQuestion.prompt || '',
        answer: currentQuestion.answer || '',
        targetWord,
        meaningWord,
        isCorrect: isAnswerCorrect,
        languageId: currentLanguage
      }).then(updatedWord => {
        if (updatedWord && updatedWord.masteryLevel >= MASTERY_THRESHOLD) {
          setIsWordJustMastered(true);
          masteredWordIdsRef.current.add(updatedWord.wordId);
          if (currentQuestion.id) {
            masteredWordIdsRef.current.add(currentQuestion.id);
          }
          if (currentQuestion.wordId) {
            masteredWordIdsRef.current.add(currentQuestion.wordId);
          }
          setMasteredWordIds(prev => {
            const next = new Set(prev);
            next.add(updatedWord.wordId);
            if (currentQuestion.id) next.add(currentQuestion.id);
            if (currentQuestion.wordId) next.add(currentQuestion.wordId);
            return next;
          });
        }
      }).catch(err => console.warn('Could not record word attempt:', err));
    }
  };

  const playSound = (audio: HTMLAudioElement | null, type: string) => {
    if (!audio) return;
    try {
      audio.pause();
      audio.currentTime = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.warn(`Could not play ${type} sound`, e);
        });
      }
    } catch (e) {
      console.warn(`Error playing ${type} sound`, e);
    }
  };

  const handleOverrideAnswer = () => {
    if (isCorrect) return;
    setIsCorrect(true);
    setIsOverridden(true);
    setIsTypoAccepted(false);
    setTypoFeedback(null);
    const newSessionScore = sessionScore + 1;
    setSessionScore(newSessionScore);
    setComboStreak(prev => {
      const next = prev + 1;
      setMaxComboStreak(m => Math.max(m, next));
      return next;
    });
    setMissedInSession(prev => prev.filter(m => m.prompt !== currentQuestion?.prompt));
    playSound(correctSoundRef.current, "correct");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!showNext) {
        checkAnswer();
      } else {
        if (sessionAnswered >= sessionGoal) {
          handleCompleteSession();
        } else {
          handleNextQuestion();
        }
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const selectionStart = e.target.selectionStart || 0;

    if (!newValue) {
      rawLatinTypedRef.current = '';
    } else if (newValue.length > userAnswer.length && newValue.startsWith(userAnswer)) {
      rawLatinTypedRef.current += newValue.slice(userAnswer.length);
    } else {
      rawLatinTypedRef.current = newValue;
    }

    if (!needsRussianKeyboard) {
      if (activePhoneticLang && activePhoneticLang !== 'ru' && newValue.endsWith(' ')) {
        const { converted, didConvert } = convertLastLatinWordOnSpace(newValue, activePhoneticLang);
        if (didConvert) {
          setUserAnswer(converted);
          setLastInput(converted);
          return;
        }
      }
      setUserAnswer(newValue);
      setLastInput(newValue);
      return;
    }

    if (["'", "`", '"'].includes(newValue.charAt(selectionStart - 1))) {
      const withSpecials = newValue
        .replace(/'/g, 'ь')
        .replace(/`/g, 'ь')
        .replace(/"/g, 'ъ');
      setUserAnswer(withSpecials);
      setLastInput(withSpecials);
      setCursorPosition(selectionStart);
      return;
    }

    setUserAnswer(newValue);

    const lastCharIndex = selectionStart - 1;
    if (lastCharIndex >= 1 && lastCharIndex < newValue.length) {
      const prevChar = newValue.charAt(lastCharIndex - 1);
      const currChar = newValue.charAt(lastCharIndex);

      if (combinationStarters.includes(prevChar) &&
        combinationFollowers[prevChar as keyof typeof combinationFollowers]?.includes(currChar)) {
        const transliteratedValue = transliterate(newValue);
        setUserAnswer(transliteratedValue);
        setCursorPosition(selectionStart);
        setLastInput(newValue);
        return;
      }
    }

    const hasInputType = 'inputType' in e.nativeEvent;
    const inputType = hasInputType ? (e.nativeEvent as any).inputType : undefined;

    if (newValue.endsWith(' ')) {
      const { converted } = convertLastLatinWordOnSpace(newValue, 'ru');
      const transliteratedValue = converted !== newValue ? converted : transliterate(newValue);
      setUserAnswer(transliteratedValue);
      setCursorPosition(selectionStart);
    } else if (
      /[.,!?;:]/.test(newValue.charAt(selectionStart - 1)) ||
      inputType === 'insertLineBreak' ||
      newValue.includes('\n')
    ) {
      const transliteratedValue = transliterate(newValue);
      setUserAnswer(transliteratedValue);
      setCursorPosition(selectionStart);
    } else {
      setCursorPosition(selectionStart);
    }

    setLastInput(newValue);
  };

  const handleCheckAnswer = () => {
    if (needsRussianKeyboard && userAnswer && !containsCyrillic(userAnswer)) {
      const transliteratedValue = transliterate(userAnswer);
      setUserAnswer(transliteratedValue);
    }
    checkAnswer();
  };

  const handleKeyboardLetterClick = (letter: string, e?: React.MouseEvent) => {
    if (showNext) return;
    if (e) {
      e.preventDefault();
    }

    const input = inputRef.current;
    const start = input && typeof input.selectionStart === 'number'
      ? input.selectionStart
      : userAnswer.length;
    const end = input && typeof input.selectionEnd === 'number'
      ? input.selectionEnd
      : userAnswer.length;

    let newValue = '';
    let newCursorPos = start;

    if (letter === 'backspace') {
      if (start === end && start > 0) {
        newValue = userAnswer.slice(0, start - 1) + userAnswer.slice(start);
        newCursorPos = start - 1;
      } else {
        newValue = userAnswer.slice(0, start) + userAnswer.slice(end);
        newCursorPos = start;
      }
    } else if (letter === 'clear') {
      newValue = '';
      newCursorPos = 0;
    } else if (
      expectedAnswerLanguage === 'ko' &&
      letter !== ' ' &&
      letter.length === 1 &&
      start === end &&
      start === userAnswer.length
    ) {
      newValue = appendKoreanJamo(userAnswer, letter);
      newCursorPos = newValue.length;
    } else {
      const insertion = letter;
      newValue = userAnswer.slice(0, start) + insertion + userAnswer.slice(end);
      newCursorPos = start + insertion.length;

      if (letter === ' ') {
        if (needsRussianKeyboard) {
          const { converted } = convertLastLatinWordOnSpace(newValue, 'ru');
          newValue = converted !== newValue ? converted : transliterate(newValue);
        } else if (activePhoneticLang && activePhoneticLang !== 'ru') {
          const { converted } = convertLastLatinWordOnSpace(newValue, activePhoneticLang);
          newValue = converted;
        }
        newCursorPos = newValue.length;
      }
    }

    rawLatinTypedRef.current = newValue;
    setUserAnswer(newValue);

    // Keep cursor right after inserted character, preventing jumping to start
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
        try {
          inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
        } catch {
          // ignore in environments without selection range
        }
      }
    }, 0);
  };

  const toggleKeyboard = () => {
    setShowKeyboard(prev => !prev);
  };

  const getDynamicPlaceholder = (): string => {
    if (!currentQuestion) return ui.yourAnswerHere;
    if (needsRussianKeyboard) {
      switch (baseLanguage) {
        case 'ru': return 'Введите на русском...';
        case 'es': return 'Escribe en ruso (o fonéticamente con letras latinas)...';
        case 'fr': return 'Écrivez en russe (ou phonétiquement en lettres latines)...';
        case 'de': return 'Tippe auf Russisch (oder phonetisch mit lateinischen Buchstaben)...';
        case 'pt': return 'Digite em russo (ou foneticamente com letras latinas)...';
        case 'id': return 'Ketik dalam bahasa Rusia (atau fonetik dengan huruf Latin)...';
        case 'tr': return 'Rusça yazın (veya Latin harfleriyle fonetik olarak)...';
        case 'ja': return 'ロシア語で入力(またはラテン文字で発音どおりに)...';
        case 'ko': return '러시아어로 입력 (또는 라틴 문자로 발음대로)...';
        case 'zh': return '用俄语输入(或用拉丁字母按发音输入)...';
        case 'hi': return 'रूसी में लिखें (या लैटिन अक्षरों में ध्वन्यात्मक रूप से)...';
        case 'ar': return 'اكتب بالروسية (أو صوتيًا بالأحرف اللاتينية)...';
        case 'bn': return 'রুশ ভাষায় লিখুন (অথবা ল্যাটিন অক্ষরে ধ্বনি অনুযায়ী)...';
        case 'ur': return 'روسی میں لکھیں (یا لاطینی حروف میں صوتی طور پر)...';
        default: return 'Type in Russian (or phonetically in English)...';
      }
    }
    if (currentQuestion.type && currentQuestion.type.includes('alphabet') && !currentQuestion.isListeningMode) {
      switch (baseLanguage) {
        case 'ru': return 'Введите произношение (или нажмите букву)...';
        case 'es': return 'Escribe la pronunciación (o toca la letra)...';
        case 'fr': return 'Tapez la prononciation (ou touchez la lettre)...';
        case 'de': return 'Tippe die Aussprache (oder tippe den Buchstaben)...';
        case 'pt': return 'Digite a pronúncia (ou toque na letra)...';
        case 'id': return 'Ketik pelafalan (atau ketuk huruf)...';
        case 'tr': return 'Okunuşunu yazın (veya harfe dokunun)...';
        case 'zh': return '输入发音（或点击字母）...';
        case 'ja': return '発音を入力（または文字をタップ）...';
        case 'ko': return '발음을 입력하세요 (또는 글자 탭)...';
        case 'hi': return 'उच्चारण लिखें (या अक्षर चुनें)...';
        case 'ar': return 'اكتب النطق (أو اضغط على الحرف)...';
        case 'bn': return 'উচ্চারণ লিখুন (অথবা অক্ষরে ট্যাপ করুন)...';
        case 'ur': return 'تلفظ لکھیں (یا حرف پر ٹیپ کریں)...';
        default: return 'Type pronunciation or tap the letter...';
      }
    }
    if (currentQuestion.isListeningMode) {
      switch (baseLanguage) {
        case 'es': return 'Escribe lo que escuchas o la traducción...';
        case 'fr': return 'Écrivez ce que vous entendez ou la traduction...';
        case 'ru': return 'Введите то, что услышали, или перевод...';
        case 'de': return 'Tippe, was du hörst, oder die Übersetzung...';
        case 'pt': return 'Digite o que você ouve ou a tradução...';
        case 'id': return 'Ketik apa yang Anda dengar atau artinya...';
        case 'tr': return 'Duyduğunuzu veya anlamını yazın...';
        case 'ja': return '聞こえた内容または意味を入力...';
        case 'ko': return '들리는 내용 또는 번역 입력...';
        case 'zh': return '输入听到的内容或翻译...';
        case 'hi': return 'जो सुन रहे हैं या उसका अनुवाद लिखें...';
        case 'ar': return 'اكتب ما تسمعه أو الترجمة...';
        case 'bn': return 'যা শুনেছেন বা অনুবাদটি লিখুন...';
        case 'ur': return 'جو سنتے ہیں یا ترجمہ لکھیں...';
        default: return 'Type what you hear or translation...';
      }
    }
    const targetNameInBase = LANGUAGE_NAMES_IN_BASE[baseLanguage]?.[currentLanguage] || currentMeta.name;
    if (expectedAnswerLanguage === currentLanguage && activePhoneticLang && activePhoneticLang !== 'ru') {
      switch (baseLanguage) {
        case 'es': return `Escribe en ${targetNameInBase} (o fonéticamente + Espacio)...`;
        case 'fr': return `Écrivez en ${targetNameInBase} (ou phonétiquement + Espace)...`;
        case 'ru': return `Введите на ${targetNameInBase} (или латиницей + Пробел)...`;
        case 'de': return `Tippe auf ${targetNameInBase} (oder phonetisch + Leertaste)...`;
        case 'pt': return `Digite em ${targetNameInBase} (ou foneticamente + Espaço)...`;
        case 'id': return `Ketik dalam ${targetNameInBase} (atau fonetik + Spasi)...`;
        case 'tr': return `${targetNameInBase} yazın (veya fonetik + Boşluk)...`;
        case 'ja': return `${targetNameInBase}で入力（または発音＋スペースで変換）...`;
        case 'ko': return `${targetNameInBase}로 입력 (또는 발음대로 쓰고 스페이스)...`;
        case 'zh': return `用${targetNameInBase}输入（或按读音输入+空格转换）...`;
        case 'hi': return `${targetNameInBase} में लिखें (या उच्चारण + स्पेस)...`;
        case 'ar': return `اكتب ب${targetNameInBase} (أو صوتياً + مسافة)...`;
        case 'bn': return `${targetNameInBase}-এ লিখুন (অথবা উচ্চারণ + স্পেস)...`;
        case 'ur': return `${targetNameInBase} میں لکھیں (یا تلفظ + اسپیس)...`;
        default: return `Type in ${targetNameInBase} (or sound it out + Space)...`;
      }
    }
    if (expectedAnswerLanguage === currentLanguage) {
      switch (baseLanguage) {
        case 'es': return `Escribe en ${targetNameInBase}...`;
        case 'fr': return `Écrivez en ${targetNameInBase}...`;
        case 'ru': return `Введите на ${targetNameInBase}...`;
        case 'de': return `Tippe auf ${targetNameInBase}...`;
        case 'pt': return `Digite em ${targetNameInBase}...`;
        case 'id': return `Ketik dalam ${targetNameInBase}...`;
        case 'tr': return `${targetNameInBase} dilinde yazın...`;
        case 'ja': return `${targetNameInBase}で入力...`;
        case 'ko': return `${targetNameInBase}로 입력...`;
        case 'zh': return `用${targetNameInBase}输入...`;
        case 'hi': return `${targetNameInBase} में लिखें...`;
        case 'ar': return `اكتب ب${targetNameInBase}...`;
        case 'bn': return `${targetNameInBase}-এ লিখুন...`;
        case 'ur': return `${targetNameInBase} میں لکھیں...`;
        default: return `Type in ${targetNameInBase}...`;
      }
    }
    switch (baseLanguage) {
      case 'es': return 'Escribe en español...';
      case 'fr': return 'Écrivez en français...';
      case 'ru': return 'Введите на русском...';
      case 'de': return 'Tippe auf Deutsch...';
      case 'pt': return 'Digite em português...';
      case 'id': return 'Ketik dalam bahasa Indonesia...';
      case 'tr': return 'Türkçe yazın...';
      case 'ja': return '日本語で入力...';
      case 'ko': return '한국어로 입력...';
      case 'zh': return '用中文输入...';
      case 'hi': return 'हिन्दी में लिखें...';
      case 'ar': return 'اكتب بالعربية...';
      case 'bn': return 'বাংলায় লিখুন...';
      case 'ur': return 'اردو میں لکھیں...';
      default: return 'Type in English...';
    }
  };

  const combinationStarters = ['y', 'Y', 'z', 'Z', 's', 'S', 'c', 'C', 't', 'T', 'k', 'K'];
  const combinationFollowers = {
    'y': ['a', 'A', 'u', 'U', 'o', 'O', 'e', 'E'],
    'Y': ['a', 'A', 'u', 'U', 'o', 'O', 'e', 'E'],
    'z': ['h', 'H'],
    'Z': ['h', 'H'],
    's': ['h', 'H'],
    'S': ['h', 'H'],
    'c': ['h', 'H'],
    'C': ['h', 'H'],
    't': ['s', 'S'],
    'T': ['s', 'S'],
    'k': ['h', 'H'],
    'K': ['h', 'H']
  };

  useEffect(() => {
    if (inputRef.current && needsRussianKeyboard) {
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
        }
      });
    }
  }, [cursorPosition, userAnswer, needsRussianKeyboard]);

  const formatQuestionCount = (count: number): string => {
    switch (baseLanguage) {
      case 'zh': return `${count} 题`;
      case 'ja': return `${count}問`;
      case 'ko': return `${count}문제`;
      case 'ru': return `${count} вопр.`;
      case 'es':
      case 'pt': return `${count} preg.`;
      case 'fr': return `${count} quest.`;
      case 'de': return `${count} Fr.`;
      case 'id': return `${count} soal`;
      case 'tr': return `${count} soru`;
      case 'hi': return `${count} प्रश्न`;
      case 'ar': return `${count} أسئلة`;
      case 'bn': return `${count}টি প্রশ্ন`;
      case 'ur': return `${count} سوالات`;
      default: return `${count} Qs`;
    }
  };

  // --- RENDER RECAP SCREEN WHEN SESSION IS COMPLETE ---
  if (isSessionComplete) {
    const percentage = sessionGoal > 0 ? Math.round((sessionScore / sessionGoal) * 100) : 0;

    const praiseTier = getPraiseTier(percentage);
    const recapIcon =
      praiseTier === 'perfect' ? <FaTrophy className="recap-icon gold" />
      : praiseTier === 'great' ? <FaTrophy className="recap-icon silver" />
      : praiseTier === 'good' ? <FaStar className="recap-icon bronze" />
      : <FaGraduationCap className="recap-icon practice" />;
    // Praise is in the language being learned; the explanation under it is in the learner's own language
    const { title: headlineTitle, pronunciation: headlinePronunciation } = getPraiseHeadline(currentLanguage, percentage);
    const headlineSubtitle = recapLabels.feedbackSubtitle(percentage, targetNameInBase);

    return (
      <div className="section quiz-section quiz-recap-section">
        <h2 className="quiz-recap-title">{recapLabels.sessionComplete}</h2>

        <div className="quiz-card quiz-recap-card">
          <div className="recap-praise-hero">
            <div className="recap-badge-icon-wrap">
              {recapIcon}
            </div>
            <h3 className="recap-russian-title">{headlineTitle}</h3>
            {headlinePronunciation && (
              <div className="recap-pronunciation-wrap">
                <span className="recap-pronunciation-pill">
                  {headlinePronunciation}
                </span>
              </div>
            )}
            <p className="recap-english-subtitle">
              {headlineSubtitle}
            </p>
          </div>

          <div className="recap-hero-score">
            <div className="recap-ring-wrap">
              <svg className="recap-progress-ring" width="136" height="136" viewBox="0 0 136 136" aria-hidden="true">
                <defs>
                  <linearGradient id="scoreRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={percentage === 100 ? '#f59e0b' : percentage >= 80 ? '#3b82f6' : '#4A5AF4'} />
                    <stop offset="100%" stopColor={percentage === 100 ? '#fbbf24' : percentage >= 80 ? '#6366f1' : '#0039A6'} />
                  </linearGradient>
                </defs>
                <circle
                  className="recap-ring-track"
                  cx="68"
                  cy="68"
                  r={54}
                  strokeWidth="9"
                />
                <circle
                  className="recap-ring-bar"
                  cx="68"
                  cy="68"
                  r={54}
                  strokeWidth="9"
                  strokeDasharray={339.29}
                  strokeDashoffset={339.29 - (percentage / 100) * 339.29}
                  strokeLinecap="round"
                  transform="rotate(-90 68 68)"
                />
              </svg>
              <div className="recap-ring-label">
                <span className="recap-score-percent">{percentage}%</span>
                <span className="recap-score-ratio">{recapLabels.correctRatio(sessionScore, sessionGoal)}</span>
              </div>
            </div>

            <div className="recap-stats-grid" role="group" aria-label="Session summary stats">
              <div className="recap-stat-card">
                <span className="stat-label">🎯 {recapLabels.goal}</span>
                <span className="stat-value">{formatQuestionCount(sessionGoal)}</span>
              </div>
              <div className="recap-stat-card correct">
                <span className="stat-label">✅ {recapLabels.correct}</span>
                <span className="stat-value">{sessionScore}</span>
              </div>
              <div className="recap-stat-card streak-stat">
                <span className="stat-label">🔥 {recapLabels.bestStreak}</span>
                <span className="stat-value">{maxComboStreak}</span>
              </div>
              <div className="recap-stat-card highlight">
                <span className="stat-label">🏆 {recapLabels.mastered}</span>
                <span className="stat-value">{activeMasteredCount} / {activeTotalQuestions}</span>
              </div>
              <div className="recap-stat-card pool-left">
                <span className="stat-label">📚 {recapLabels.remaining}</span>
                <span className="stat-value">{activeRemainingToMaster}</span>
              </div>
            </div>

            {activeLevel !== 'all' && percentage >= 80 && (
              <div className="level-checkpoint-banner" role="status">
                <span className="checkpoint-icon">🎓</span>
                <div className="checkpoint-text">
                  <strong>{recapLabels.levelCheckpoint(activeLevel, percentage).title}</strong>
                  <span>{recapLabels.levelCheckpoint(activeLevel, percentage).desc}</span>
                </div>
              </div>
            )}

            <p className="recap-save-notice">
              <FaCheckCircle className="notice-icon" /> {recapLabels.loggedNotice}
            </p>
          </div>

          <div className="recap-next-session">
            <div className="recap-topic-selector">
              <span className="goal-picker-label">{recapLabels.chooseTopic}</span>
              <div className="recap-topic-pills" role="tablist" aria-label="Choose quiz topic">
                {ALL_QUIZ_CATEGORIES.map(cat => {
                  const isActive = activeCategory === cat.id;
                  const countInfo = categoryCounts[cat.id];
                  const label = getCategoryLabel(cat.id, ui, baseLanguage);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`recap-topic-pill ${isActive ? 'active' : ''}`}
                      onClick={() => handleCategoryChange(cat.id)}
                      title={`Switch to ${label} (${countInfo?.total || 0} questions)`}
                    >
                      <span className="cat-icon">{cat.icon}</span>
                      <span className="cat-label">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="recap-goal-picker">
              <span className="goal-picker-label">{recapLabels.chooseNextLength}</span>
              <div className="goal-picker-buttons" role="group" aria-label="Next quiz length">
                {[5, 10, 20].map(count => (
                  <button
                    key={count}
                    type="button"
                    className={`recap-goal-btn ${sessionGoal === count ? 'active' : ''}`}
                    onClick={() => {
                      setSessionGoal(count);
                      localStorage.setItem('russian_quiz_goal', count.toString());
                    }}
                    title={`Set next quiz to ${count} questions`}
                  >
                    {formatQuestionCount(count)}
                  </button>
                ))}
              </div>
            </div>

            <div className="quiz-buttons recap-quiz-buttons">
              <button
                className="next-button start-new-quiz-button"
                onClick={() => startNewQuizSession(sessionGoal)}
                autoFocus
                title="Start next quiz session"
                aria-label={recapLabels.startNextQuiz(sessionGoal)}
              >
                <span className="btn-main-label">
                  <FaRedo className="btn-icon" /> {recapLabels.startNextQuiz(sessionGoal)}
                </span>
                <span className="btn-hint-badge">
                  {recapLabels.pressEnter}
                </span>
              </button>
            </div>
          </div>

          {missedInSession.length > 0 && (
            <div className="recap-missed-section">
              <div className="missed-header-row">
                <h4>{recapLabels.wordsToReview(missedInSession.length)}</h4>
              </div>
              <p className="missed-hint">{recapLabels.reviewHint}</p>
              <div className="missed-words-list">
                {missedInSession.map((item, idx) => (
                  <div key={idx} className="missed-word-item">
                    <div className="missed-word-details">
                      <div className="missed-word-prompt">{item.prompt}</div>
                      <div className="missed-word-answers">
                        <span className="correct-answer-text">{recapLabels.answerLabel} <strong>{getCleanDisplayAnswer(item.answer, item.prompt, item.category)}</strong></span>
                        {item.userAnswer && (
                          <span className="user-answer-text">{recapLabels.youTypedLabel} <span className="strikethrough">{item.userAnswer}</span></span>
                        )}
                      </div>
                    </div>
                    <PronunciationButton
                      text={item.targetAudioWord || item.russian || item.answer.split('/')[0]}
                      lang={currentLanguage}
                      audioCategory={getAudioCategory(item.category)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- RENDER LOADING STATE ---
  if (!data || !currentQuestion) {
    return (
      <div className="section quiz-section">
        <h2>Test Your Knowledge</h2>
        <div className="quiz-card">
          <h3>Loading quiz questions...</h3>
          <p>Please wait while we prepare your questions.</p>
        </div>
      </div>
    );
  }

  // --- RENDER ACTIVE QUIZ SESSION ---
  const progressPercent = sessionGoal > 0 ? Math.min(100, Math.round((sessionAnswered / sessionGoal) * 100)) : 0;

  const activeCategoryItem = ALL_QUIZ_CATEGORIES.find(c => c.id === activeCategory) || ALL_QUIZ_CATEGORIES[0];
  const activeCategoryLabel = getCategoryLabel(activeCategoryItem.id, ui, baseLanguage);
  const activeCategoryCountInfo = categoryCounts[activeCategoryItem.id];
  const activeCategoryCountDisplay = activeCategoryCountInfo?.mastered
    ? `${activeCategoryCountInfo.mastered}/${activeCategoryCountInfo.total}`
    : (activeCategoryCountInfo?.total ?? totalCurriculumWords);

  const activeLevelItem = ALL_QUIZ_LEVELS.find(l => l.id === activeLevel) || ALL_QUIZ_LEVELS[0];
  const activeLevelCountInfo = activeLevelItem.id === 'all'
    ? { total: totalCurriculumWords, mastered: totalMasteredWordsCount }
    : levelCounts[activeLevelItem.id as 1 | 2 | 3];
  const activeLevelCountDisplay = activeLevelCountInfo?.mastered
    ? `${activeLevelCountInfo.mastered}/${activeLevelCountInfo.total}`
    : (activeLevelCountInfo?.total ?? totalCurriculumWords);

  const toolbarLabels = getQuizToolbarLabels(baseLanguage);
  const localizedActiveLevel = localizeLevelBadge(activeLevel, baseLanguage);

  return (
    <div className={`section quiz-section ${!effectiveSettingsOpen ? 'settings-collapsed' : ''}`}>
      <h2 className="quiz-page-title">{ui.testYourKnowledge}</h2>

      {/* Unified Quiz Controls Toolbar with Dropdowns (Eliminates horizontal scrollers) */}
      <div className="quiz-toolbar-card">
        <button
          type="button"
          className="quiz-settings-summary"
          aria-expanded={effectiveSettingsOpen}
          onClick={toggleSettings}
        >
          <span className="quiz-settings-summary-text">
            <span aria-hidden="true">{activeCategoryItem.icon}</span> {activeCategoryLabel}
            {' · '}{localizedActiveLevel}
            {' · '}{quizMode === 'writing' ? ui.writingMode : quizMode === 'listening' ? ui.listeningMode : ui.allModes}
          </span>
          <span className="quiz-settings-summary-end">
            <span aria-hidden="true">⚙</span> {ui.quizSettings}
            <FaChevronDown className={`quiz-dropdown-chevron ${effectiveSettingsOpen ? 'rotated' : ''}`} aria-hidden="true" />
          </span>
        </button>

        <div className="quiz-toolbar-body">
          {/* Row 1: The two Dropdowns side-by-side */}
          <div className="quiz-toolbar-dropdowns-row">
            {/* Topic & Curriculum Module Dropdown */}
            <div className="quiz-dropdown-group" ref={topicDropdownRef}>
              <label id="topic-dropdown-label" className="quiz-toolbar-label">
                <span className="label-icon">📚</span>
                <span>{toolbarLabels.topic}</span>
              </label>
              <div className="quiz-dropdown-wrapper">
                <button
                  type="button"
                  id="topic-dropdown-trigger"
                  data-testid="topic-dropdown-trigger"
                  className={`quiz-dropdown-trigger ${isTopicDropdownOpen ? 'open' : ''}`}
                  onClick={() => {
                    setIsTopicDropdownOpen(prev => !prev);
                    setIsLevelDropdownOpen(false);
                  }}
                  aria-haspopup="listbox"
                  aria-expanded={isTopicDropdownOpen}
                  aria-labelledby="topic-dropdown-label topic-dropdown-trigger"
                >
                  <div className="quiz-dropdown-trigger-main">
                    <span className="dropdown-trigger-icon" aria-hidden="true">{activeCategoryItem.icon}</span>
                    <span className="dropdown-trigger-title">{activeCategoryLabel}</span>
                  </div>
                  <div className="quiz-dropdown-trigger-end">
                    <span className="dropdown-count-pill">{activeCategoryCountDisplay}</span>
                    <FaChevronDown className={`quiz-dropdown-chevron ${isTopicDropdownOpen ? 'rotated' : ''}`} />
                  </div>
                </button>

                {isTopicDropdownOpen && (
                  <div className="quiz-dropdown-menu" role="listbox" aria-labelledby="topic-dropdown-label">
                    <div className="quiz-dropdown-section-title">{recapLabels.coreCurriculum}</div>
                    {CORE_MODULE_CATEGORIES.map(cat => {
                      const isSelected = activeCategory === cat.id;
                      const countInfo = categoryCounts[cat.id];
                      const label = getCategoryLabel(cat.id, ui, baseLanguage);
                      const isFullyMastered = countInfo && countInfo.total > 0 && countInfo.mastered >= countInfo.total;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          className={`quiz-dropdown-item ${isSelected ? 'selected' : ''}`}
                          onClick={() => {
                            handleCategoryChange(cat.id);
                            setIsTopicDropdownOpen(false);
                          }}
                        >
                          <div className="quiz-dropdown-item-left">
                            <span className="quiz-dropdown-item-icon">{cat.icon}</span>
                            <span className="quiz-dropdown-item-name">{label}</span>
                          </div>
                          <div className="quiz-dropdown-item-right">
                            <span className={`quiz-dropdown-item-badge ${isFullyMastered ? 'mastered' : ''}`}>
                              {countInfo?.mastered ? `${countInfo.mastered}/${countInfo.total}` : (countInfo?.total || 0)}
                            </span>
                            {isSelected ? <FaCheck className="quiz-dropdown-item-check" /> : <span className="quiz-dropdown-item-check-placeholder" />}
                          </div>
                        </button>
                      );
                    })}

                    <div className="quiz-dropdown-section-title">{recapLabels.specializedPacks}</div>
                    {TOPIC_PACK_CATEGORIES.map(cat => {
                      const isSelected = activeCategory === cat.id;
                      const countInfo = categoryCounts[cat.id];
                      const label = getCategoryLabel(cat.id, ui, baseLanguage);
                      const isFullyMastered = countInfo && countInfo.total > 0 && countInfo.mastered >= countInfo.total;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          className={`quiz-dropdown-item ${isSelected ? 'selected' : ''}`}
                          onClick={() => {
                            handleCategoryChange(cat.id);
                            setIsTopicDropdownOpen(false);
                          }}
                        >
                          <div className="quiz-dropdown-item-left">
                            <span className="quiz-dropdown-item-icon">{cat.icon}</span>
                            <span className="quiz-dropdown-item-name">{label}</span>
                          </div>
                          <div className="quiz-dropdown-item-right">
                            <span className={`quiz-dropdown-item-badge ${isFullyMastered ? 'mastered' : ''}`}>
                              {countInfo?.mastered ? `${countInfo.mastered}/${countInfo.total}` : (countInfo?.total || 0)}
                            </span>
                            {isSelected ? <FaCheck className="quiz-dropdown-item-check" /> : <span className="quiz-dropdown-item-check-placeholder" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Proficiency Level Dropdown */}
            <div className="quiz-dropdown-group" ref={levelDropdownRef}>
              <label id="level-dropdown-label" className="quiz-toolbar-label">
                <span className="label-icon">🎯</span>
                <span>{toolbarLabels.level}</span>
              </label>
              <div className="quiz-dropdown-wrapper">
                <button
                  type="button"
                  id="level-dropdown-trigger"
                  data-testid="level-dropdown-trigger"
                  className={`quiz-dropdown-trigger ${isLevelDropdownOpen ? 'open' : ''}`}
                  onClick={() => {
                    setIsLevelDropdownOpen(prev => !prev);
                    setIsTopicDropdownOpen(false);
                  }}
                  aria-haspopup="listbox"
                  aria-expanded={isLevelDropdownOpen}
                  aria-labelledby="level-dropdown-label level-dropdown-trigger"
                >
                  <div className="quiz-dropdown-trigger-main">
                    <span className="dropdown-trigger-icon" aria-hidden="true">{activeLevelItem.badge}</span>
                    <span className="dropdown-trigger-title">{localizedActiveLevel}</span>
                  </div>
                  <div className="quiz-dropdown-trigger-end">
                    <span className="dropdown-count-pill">{activeLevelCountDisplay}</span>
                    <FaChevronDown className={`quiz-dropdown-chevron ${isLevelDropdownOpen ? 'rotated' : ''}`} />
                  </div>
                </button>

                {isLevelDropdownOpen && (
                  <div className="quiz-dropdown-menu" role="listbox" aria-labelledby="level-dropdown-label">
                    {ALL_QUIZ_LEVELS.map(lvl => {
                      const isSelected = activeLevel === lvl.id;
                      const countInfo = lvl.id === 'all'
                        ? { total: totalCurriculumWords, mastered: totalMasteredWordsCount }
                        : levelCounts[lvl.id as 1 | 2 | 3];
                      const localizedLevelName = localizeLevelBadge(lvl.id, baseLanguage);
                      return (
                        <button
                          key={String(lvl.id)}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          className={`quiz-dropdown-item ${isSelected ? 'selected' : ''}`}
                          onClick={() => {
                            handleLevelChange(lvl.id);
                            setIsLevelDropdownOpen(false);
                          }}
                        >
                          <div className="quiz-dropdown-item-left">
                            <span className="quiz-dropdown-item-icon">{lvl.badge}</span>
                            <span className="quiz-dropdown-item-name">{localizedLevelName}</span>
                          </div>
                          <div className="quiz-dropdown-item-right">
                            <span className="quiz-dropdown-item-badge">
                              {countInfo?.mastered ? `${countInfo.mastered}/${countInfo.total}` : (countInfo?.total || 0)}
                            </span>
                            {isSelected ? <FaCheck className="quiz-dropdown-item-check" /> : <span className="quiz-dropdown-item-check-placeholder" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Row 2: Practice Modality Segmented Control (Full Width) */}
          <div className="quiz-toolbar-modality-row">
            <label className="quiz-toolbar-label">
              <span className="label-icon">⚡</span>
              <span>{toolbarLabels.modality}</span>
            </label>
            <div className="quiz-mode-segmented-pills" role="radiogroup" aria-label="Quiz mode">
              <button
                type="button"
                role="radio"
                aria-checked={quizMode === 'writing'}
                className={`mode-segmented-pill ${quizMode === 'writing' ? 'active' : ''}`}
                onClick={() => handleModeChange('writing')}
                title="Writing & Reading Mode (Prompt visible, type translation)"
              >
                <span className="mode-icon">✍️</span>
                <span>{ui.writingMode}</span>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={quizMode === 'listening'}
                className={`mode-segmented-pill ${quizMode === 'listening' ? 'active' : ''}`}
                onClick={() => handleModeChange('listening')}
                title="Listening Ear-Training Mode (Listen to audio, type what you hear)"
              >
                <span className="mode-icon">🎧</span>
                <span>{ui.listeningMode}</span>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={quizMode === 'all'}
                className={`mode-segmented-pill ${quizMode === 'all' ? 'active' : ''}`}
                onClick={() => handleModeChange('all')}
                title="All Modes (Alternates writing and listening questions)"
              >
                <span className="mode-icon">🎯</span>
                <span>{ui.allModes}</span>
              </button>
            </div>
          </div>

          {/* Row 3: Audio repeat & speed hint banner */}
          <div className="quiz-repeat-tip-banner">
            <span className="tip-icon">🗣️</span>
            <TipText text={ui.repeatHint} />
          </div>
        </div>
      </div>

      {/* Modern Compact Quiz Header Panel / Game HUD */}
      <div className="quiz-header-panel">
        <div className="quiz-progress-bar-container" aria-label="Session progress bar">
          <div
            className="quiz-progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="quiz-top-bar">
          <div className="session-progress-counter">
            <span className="counter-label">{ui.questionOf}</span>
            <span className="counter-current">{sessionIndex}</span>
            <span className="counter-total">{({
              en: 'of', ru: 'из', es: 'de', pt: 'de', fr: 'sur', de: 'von', id: 'dari',
              tr: '/', zh: '/', ja: '/', ko: '/', hi: '/', bn: '/', ar: 'من', ur: 'از'
            }[baseLanguage] || 'of')} {sessionGoal}</span>
          </div>

          <div className="session-score-badge">
            <span>{ui.scoreLabel} <strong>{sessionScore}</strong> / {sessionAnswered}</span>
          </div>

          {comboStreak >= 2 && (
            <div className="session-streak-badge" aria-label={`Current streak: ${comboStreak}`}>
              🔥 <strong>{comboStreak}</strong> {({
                en: 'in a row', ru: 'подряд', es: 'seguidas', pt: 'seguidas', fr: 'de suite',
                de: 'in Folge', id: 'berturut-turut', tr: 'üst üste', zh: '连对', ja: '連続正解',
                ko: '연속 정답', hi: 'लगातार सही', ar: 'على التوالي', bn: 'টানা সঠিক', ur: 'لگاتار درست'
              }[baseLanguage] || 'in a row')}
            </div>
          )}

          <div className="quiz-goal-selector" role="group" aria-label="Session question count">
            {[5, 10, 20].map(count => (
              <button
                key={count}
                type="button"
                className={`goal-pill ${sessionGoal === count ? 'active' : ''}`}
                onClick={() => handleGoalChange(count)}
                title={`Set quiz session to ${count} questions`}
              >
                {formatQuestionCount(count)}
              </button>
            ))}
          </div>
        </div>

        <div className="curriculum-pool-badge" title="Mastered words are removed from future questions">
          <span className="pool-icon">🏆</span>
          <span>{ui.masteredLabel} <strong>{activeMasteredCount}</strong> / {activeTotalQuestions}</span>
        </div>
      </div>

      <div className="quiz-card">
        <h3 className="quiz-question-hint">
          {currentQuestion.isListeningMode && !showNext
            ? getListeningHeader(currentLanguage, baseLanguage, currentMeta.name)
            : currentQuestion.isListeningMode && showNext
              ? `${baseLanguage === 'es' ? 'Escuchaste' : baseLanguage === 'ru' ? 'Вы услышали' : baseLanguage === 'fr' ? 'Vous avez entendu' : baseLanguage === 'de' ? 'Du hast gehört' : baseLanguage === 'pt' ? 'Você ouviu' : baseLanguage === 'id' ? 'Anda mendengar' : baseLanguage === 'tr' ? 'Duyduğunuz' : baseLanguage === 'ja' ? 'あなたが聞いた音声' : baseLanguage === 'ko' ? '들은 내용' : baseLanguage === 'zh' ? '听到的内容' : baseLanguage === 'hi' ? 'आपने सुना' : baseLanguage === 'ar' ? 'ما سمعته' : baseLanguage === 'bn' ? 'আপনি শুনেছেন' : baseLanguage === 'ur' ? 'آپ نے سنا' : 'You heard'}: "${currentQuestion.prompt}"`
              : currentQuestion.hint}
        </h3>
        <div className="quiz-prompt">
          {currentQuestion.isListeningMode && !showNext ? (
            <div className="quiz-listening-card">
              <div className="listening-audio-player">
                <PronunciationButton
                  text={currentQuestion.promptAudioWord || currentQuestion.targetAudioWord || currentQuestion.russian || currentQuestion.prompt}
                  lang={currentLanguage}
                  className="quiz-listening-audio-btn"
                  audioCategory={getAudioCategory(currentQuestion.type)}
                />
                <span className="listening-replay-hint">{recapLabels.replayAudio}</span>
              </div>
              {showListeningHint ? (
                <div className="listening-hint-box">
                  {currentQuestion.type === 'alphabet' ? (
                    <><span className="tip-icon-col" aria-hidden="true">💡</span><span className="tip-text">{currentQuestion.pronunciation ? `/${currentQuestion.pronunciation}/` : recapLabels.replayAudio}</span></>
                  ) : (
                    <><span className="tip-icon-col" aria-hidden="true">💡</span><span className="tip-text">{recapLabels.meaningLabel}: {currentQuestion.meaningHint || currentQuestion.baseMeaning || currentQuestion.hint}</span></>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  className="show-listening-hint-btn"
                  onClick={() => setShowListeningHint(true)}
                >
                  {recapLabels.needHint}
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="quiz-prompt-main-row">
                <span className="quiz-prompt-text">{currentQuestion.prompt}</span>
                {/* Audio for prompt: in target language if target prompt, else base language */}
                <PronunciationButton
                  text={currentQuestion.promptAudioWord || currentQuestion.targetAudioWord || currentQuestion.russian || currentQuestion.prompt}
                  lang={currentQuestion.isTargetPrompt ? currentLanguage : baseLanguage}
                  className="quiz-prompt-audio margin-left"
                  audioCategory={getAudioCategory(currentQuestion.type)}
                />
              </div>
              {showNext && (currentQuestion.baseMeaning || currentQuestion.meaningHint) && (
                <div className="quiz-prompt-meaning-badge">
                  <span className="meaning-label">
                    {currentQuestion.type === 'alphabet' ? ui.sound : recapLabels.meaningLabel}:
                  </span>{' '}
                  <strong>{currentQuestion.baseMeaning || currentQuestion.meaningHint}</strong>
                </div>
              )}
            </>
          )}
        </div>
        <div className={`input-container ${expectedAnswerLanguage === 'ar' || expectedAnswerLanguage === 'ur' ? 'rtl-input' : ''}`}>
          <input
            ref={inputRef}
            type="text"
            className="quiz-input"
            lang={expectedAnswerLanguage}
            dir={expectedAnswerLanguage === 'ar' || expectedAnswerLanguage === 'ur' ? 'rtl' : undefined}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            value={userAnswer}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={getDynamicPlaceholder()}
            disabled={showNext}
          />
          {needsPhoneticKeyboard && !showNext && activePhoneticLang && (
            <button
              type="button"
              className={`keyboard-toggle-button ${showKeyboard ? 'active' : ''}`}
              onClick={toggleKeyboard}
              title={activePhoneticLang === 'ru' ? 'Toggle Russian Keyboard' : `Toggle ${PHONETIC_CHEATSHEETS[activePhoneticLang].keyboardTitle}`}
              aria-label={activePhoneticLang === 'ru' ? 'Toggle Russian Keyboard' : `Toggle ${PHONETIC_CHEATSHEETS[activePhoneticLang].keyboardTitle}`}
            >
              <FaKeyboard />
            </button>
          )}
        </div>

        {soundOutPreview && activePhoneticLang && !showNext && (
          <div className="phonetic-live-preview-row">
            <button
              type="button"
              className="phonetic-live-preview-pill"
              onClick={() => {
                const { converted } = convertLastLatinWordOnSpace(`${userAnswer} `, activePhoneticLang);
                setUserAnswer(converted);
                setLastInput(converted);
                inputRef.current?.focus();
              }}
              aria-label={`Convert ${soundOutPreview.rawToken} to ${soundOutPreview.preview}`}
            >
              <span className="preview-sparkle" aria-hidden="true">✨</span>
              <code className="preview-latin">{soundOutPreview.rawToken}</code>
              <span className="preview-arrow" aria-hidden="true">→</span>
              <strong className="preview-native">{soundOutPreview.preview}</strong>
              <kbd className="preview-space-kbd">
                ␣ {({
                  en: 'Space', zh: '空格转换', ja: 'スペース', ko: '스페이스', ru: 'Пробел',
                  es: 'Espacio', pt: 'Espaço', fr: 'Espace', de: 'Leertaste', id: 'Spasi',
                  tr: 'Boşluk', hi: 'स्पेस', ar: 'مسافة', bn: 'স্পেস', ur: 'اسپیس'
                }[baseLanguage] || 'Space')}
              </kbd>
            </button>
          </div>
        )}

        {isMobile && !showNext && expectedAnswerLanguage !== 'en' && !dismissedKbTips.includes(expectedAnswerLanguage) && (
          <div className="keyboard-tip-banner" role="note">
            <span className="tip-icon-col" aria-hidden="true">⌨️</span>
            <TipText
              text={ui.keyboardTip.replace('{lang}', (() => {
                try {
                  return new Intl.DisplayNames([baseLanguage], { type: 'language' }).of(expectedAnswerLanguage) || expectedAnswerLanguage;
                } catch {
                  return expectedAnswerLanguage;
                }
              })())}
            />
            <button
              type="button"
              className="keyboard-tip-dismiss"
              aria-label={ui.closeLabel}
              onClick={() => dismissKbTip(expectedAnswerLanguage)}
            >
              ✕
            </button>
          </div>
        )}

        {activePhoneticLang && !showNext && (
          <div className="special-char-panel cyrillic-helper-panel">
            <div
              className="special-char-bar cyrillic-quick-bar"
              role="toolbar"
              aria-label={activePhoneticLang === 'ru' ? 'Special Russian characters' : `Special characters for ${expectedAnswerLanguage}`}
            >
              <div className="quick-keys-scroll">
                {(activePhoneticLang === 'ru' ? SPECIAL_CHAR_MAP.ru : activeSpecialChars).map(char => (
                  <button
                    key={char}
                    type="button"
                    className="quick-char-btn"
                    onClick={() => handleKeyboardLetterClick(char)}
                    aria-label={`Insert ${char}`}
                  >
                    {char}
                  </button>
                ))}
                <button
                  type="button"
                  className={`quick-char-btn kb-quick-toggle-btn ${showKeyboard ? 'active' : ''}`}
                  onClick={toggleKeyboard}
                  aria-expanded={showKeyboard}
                  aria-label="Open virtual keyboard"
                >
                  ⌨️
                </button>
                <button
                  type="button"
                  className={`quick-char-btn hint-toggle-btn ${showPhoneticGuide ? 'active' : ''}`}
                  onClick={() => setShowPhoneticGuide(prev => !prev)}
                  title="Phonetic typing guide"
                  aria-expanded={showPhoneticGuide}
                  aria-label="Phonetic typing guide"
                >
                  💡
                </button>
              </div>
            </div>

            {showPhoneticGuide && (() => {
              const sheet = getLocalizedPhoneticCheatsheet(activePhoneticLang, baseLanguage);
              return (
                <div className="phonetic-guide-popover" role="region" aria-label="Phonetic typing guide">
                  <div className="popover-header">
                    <span className="popover-title">{sheet.title}</span>
                    <button
                      type="button"
                      className="close-popover-btn"
                      onClick={() => setShowPhoneticGuide(false)}
                      aria-label="Close guide"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="phonetic-rules-grid">
                    {sheet.rules.map((rule, idx) => (
                      <div key={idx}><code>{rule.latin}</code> → <strong>{rule.script}</strong></div>
                    ))}
                  </div>
                  <small className="phonetic-note">{sheet.note}</small>
                </div>
              );
            })()}
          </div>
        )}

        {!activePhoneticLang && activeSpecialChars.length > 0 && !showNext && (
          <div className="special-char-panel">
            <div className="special-char-bar" role="toolbar" aria-label={`Special characters for ${expectedAnswerLanguage}`}>
              <div className="quick-keys-scroll">
                {activeSpecialChars.map(char => (
                  <button
                    key={char}
                    type="button"
                    className="quick-char-btn"
                    onClick={() => handleKeyboardLetterClick(char)}
                    aria-label={`Insert ${char}`}
                  >
                    {char}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}


        {needsPhoneticKeyboard && activePhoneticLang && showKeyboard && !showNext && (
          <div className="virtual-keyboard-container">
            <div className="virtual-keyboard-header">
              <span>{getLocalizedPhoneticCheatsheet(activePhoneticLang, baseLanguage).keyboardTitle}</span>
              <button
                type="button"
                className="close-keyboard-btn"
                onClick={toggleKeyboard}
                aria-label="Close keyboard"
              >
                ✕ {baseLanguage === 'en' ? 'Close' : ui.closeLabel}
              </button>
            </div>
            {activePhoneticLang === 'ru' ? (
              <RussianKeyboard onLetterClick={handleKeyboardLetterClick} />
            ) : (
              <PhoneticKeyboard lang={activePhoneticLang} onLetterClick={handleKeyboardLetterClick} />
            )}
          </div>
        )}

        <div className="quiz-buttons">
          {!showNext && (
            <button className="check-button" onClick={handleCheckAnswer} aria-label={ui.checkAnswer}>
              <span className="btn-main-label">{ui.checkAnswer}</span>
              <span className="btn-hint-badge">
                {ui.pressEnter}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Fluid Duolingo-style Bottom Feedback Sheet */}
      {showNext && isCorrect !== null && (
        <div
          className={`quiz-feedback-drawer ${isCorrect ? (isTypoAccepted ? 'feedback-almost' : 'feedback-correct') : 'feedback-incorrect'}`}
          role="region"
          aria-live="polite"
        >
          <div className="feedback-drawer-inner">
            <div className="feedback-info-area">
              <div className="feedback-header-row">
                {isCorrect ? (
                  isTypoAccepted ? (
                    <FaExclamationTriangle className="feedback-icon almost-icon" />
                  ) : (
                    <FaCheckCircle className="feedback-icon correct-icon" />
                  )
                ) : (
                  <FaTimesCircle className="feedback-icon incorrect-icon" />
                )}
                <div className="feedback-text-content">
                  <span className="feedback-title">
                    {isCorrect
                      ? (isOverridden
                        ? ({
                          en: 'Correct! (Overridden)', de: 'Richtig! (Akzeptiert)', es: '¡Correcto! (Aceptado)',
                          fr: 'Correct ! (Accepté)', ru: 'Верно! (Засчитано)', pt: 'Correto! (Aceito)',
                          id: 'Benar! (Diterima)', tr: 'Doğru! (Kabul edildi)', zh: '答对了！（已更正）',
                          ja: '正解！（自己採点）', ko: '정답! (인정됨)', hi: 'सही! (स्वीकृत)',
                          ar: 'صحيح! (تم القبول)', bn: 'সঠিক! (গৃহীত)', ur: 'درست! (قبول شدہ)'
                        }[baseLanguage] || 'Correct! (Overridden)')
                        : (isTypoAccepted
                          ? ({
                            en: 'Almost right! (Accepted)', de: 'Fast richtig! (Akzeptiert)', es: '¡Casi perfecto! (Aceptado)',
                            fr: 'Presque parfait ! (Accepté)', ru: 'Почти точно! (Засчитано)', pt: 'Quase lá! (Aceito)',
                            id: 'Hampir tepat! (Diterima)', tr: 'Neredeyse tam! (Kabul edildi)', zh: '非常接近！（已算正确）',
                            ja: 'ほぼ正解！（許容）', ko: '거의 정확해요! (인정됨)', hi: 'लगभग सही! (स्वीकृत)',
                            ar: 'قريب جداً! (مقبول)', bn: 'প্রায় সঠিক! (গৃহীত)', ur: 'تقریباً درست! (قبول شدہ)'
                          }[baseLanguage] || 'Almost right! (Accepted)')
                          : ui.correct))
                      : ui.incorrect}
                  </span>
                  {isOverridden && (
                    <div className="feedback-overridden-note">
                      🎉 {({
                        en: 'Answer accepted as correct! Streak preserved.',
                        de: 'Antwort als richtig akzeptiert! Serie gerettet.',
                        es: '¡Respuesta aceptada como correcta! Racha conservada.',
                        fr: 'Réponse acceptée comme correcte ! Série conservée.',
                        ru: 'Ответ засчитан как верный! Серия сохранена.',
                        pt: 'Resposta aceita como correta! Sequência mantida.',
                        id: 'Jawaban diterima sebagai benar! Beruntun terjaga.',
                        tr: 'Yanıt doğru olarak kabul edildi! Seri korundu.',
                        zh: '已标记为正确！连对记录已保留。',
                        ja: '正解として記録しました！連続正解をキープ。',
                        ko: '정답으로 처리되었습니다! 연속 기록 유지.',
                        hi: 'उत्तर सही माना गया! लगातार क्रम सुरक्षित।',
                        ar: 'تم قبول الإجابة كصحيحة! تم الحفاظ على السلسلة.',
                        bn: 'উত্তরটি সঠিক হিসেবে গৃহীত হয়েছে! ধারা বজায় রয়েছে।',
                        ur: 'جواب درست تسلیم کر لیا گیا! تسلسل برقرار ہے۔'
                      }[baseLanguage] || 'Answer accepted as correct! Streak preserved.')}
                    </div>
                  )}
                  {isTypoAccepted && typoFeedback && !isOverridden && (
                    <div className="feedback-typo-note">
                      ✏️ <strong>{typoFeedback}</strong>
                    </div>
                  )}
                  {!isCorrect && (
                    <div className="feedback-answer-line">
                      <span>{ui.correctAnswerIs} </span>
                      <strong className="feedback-correct-word">
                        {getCleanDisplayAnswer(
                          currentQuestion.answer,
                          currentQuestion.prompt,
                          currentQuestion.type,
                          currentQuestion.isTargetPrompt
                        )}
                      </strong>
                      {(currentQuestion.type === 'numbers' ||
                        extractDigit(currentQuestion.prompt) !== null ||
                        extractDigit(currentQuestion.answer) !== null) && (
                          <div className="feedback-number-tip">
                            💡 {({
                              en: 'Tip: You can type either the word or the digit.',
                              es: 'Consejo: Puedes escribir la palabra o el número.',
                              fr: 'Astuce : Vous pouvez taper le mot ou le chiffre.',
                              de: 'Tipp: Du kannst entweder das Wort oder die Zahl tippen.',
                              ru: 'Подсказка: Вы можете ввести слово или цифру.',
                              pt: 'Dica: Você pode digitar a palavra ou o número.',
                              id: 'Tips: Anda dapat mengetik kata atau angkanya.',
                              tr: 'İpucu: Kelimeyi veya rakamı yazabilirsiniz.',
                              zh: '提示：输入数字单词或阿拉伯数字均可。',
                              ja: 'ヒント：単語でも数字（算用数字）でも入力できます。',
                              ko: '팁: 단어나 숫자 중 아무것이나 입력할 수 있습니다.',
                              hi: 'सुझाव: आप शब्द या अंक दोनों में से कोई भी लिख सकते हैं।',
                              ar: 'نصيحة: يمكنك كتابة الكلمة أو الرقم.',
                              bn: 'পরামর্শ: আপনি শব্দ বা সংখ্যা যেকোনোটি লিখতে পারেন।',
                              ur: 'مشورہ: آپ لفظ یا ہندسہ دونوں لکھ سکتے ہیں۔'
                            }[baseLanguage] || 'Tip: You can type either the word or the digit.')}
                          </div>
                        )}
                    </div>
                  )}
                  {isCorrect && spellingDiff && spellingDiff.length > 0 && (
                    <div className="spelling-note">
                      {({
                        en: 'Correct spelling:', es: 'Ortografía exacta:', fr: 'Orthographe exacte :',
                        de: 'Genaue Schreibweise:', ru: 'Точное написание:', pt: 'Grafia exata:',
                        id: 'Ejaan tepat:', tr: 'Doğru yazılışı:', zh: '标准拼写：',
                        ja: '正しい綴り：', ko: '정확한 철자:', hi: 'सही वर्तनी:',
                        ar: 'الإملاء الصحيح:', bn: 'সঠিক বানান:', ur: 'درست املا:'
                      }[baseLanguage] || 'Correct spelling:')}{' '}
                      <span>
                        {spellingDiff.map((item, idx) => (
                          item.isDiff ? (
                            <span key={idx} className="diff-char">{item.char}</span>
                          ) : (
                            <React.Fragment key={idx}>{item.char}</React.Fragment>
                          )
                        ))}
                      </span>
                    </div>
                  )}
                  {isCorrect && isWordJustMastered && (
                    <div className="word-mastered-note">
                      🏆 <strong>{({
                        en: `Word Mastered (${MASTERY_THRESHOLD}/${MASTERY_THRESHOLD})!`,
                        zh: `词汇已掌握 (${MASTERY_THRESHOLD}/${MASTERY_THRESHOLD})！`,
                        ja: `習得完了 (${MASTERY_THRESHOLD}/${MASTERY_THRESHOLD})！`,
                        ko: `단어 마스터 (${MASTERY_THRESHOLD}/${MASTERY_THRESHOLD})!`,
                        ru: `Слово освоено (${MASTERY_THRESHOLD}/${MASTERY_THRESHOLD})!`,
                        es: `¡Palabra dominada (${MASTERY_THRESHOLD}/${MASTERY_THRESHOLD})!`,
                        fr: `Mot maîtrisé (${MASTERY_THRESHOLD}/${MASTERY_THRESHOLD}) !`,
                        de: `Wort gemeistert (${MASTERY_THRESHOLD}/${MASTERY_THRESHOLD})!`,
                        pt: `Palavra dominada (${MASTERY_THRESHOLD}/${MASTERY_THRESHOLD})!`,
                        id: `Kata dikuasai (${MASTERY_THRESHOLD}/${MASTERY_THRESHOLD})!`,
                        tr: `Kelime öğrenildi (${MASTERY_THRESHOLD}/${MASTERY_THRESHOLD})!`,
                        hi: `शब्द में महारत (${MASTERY_THRESHOLD}/${MASTERY_THRESHOLD})!`,
                        ar: `تم إتقان الكلمة (${MASTERY_THRESHOLD}/${MASTERY_THRESHOLD})!`,
                        bn: `শব্দ আয়ত্ত হয়েছে (${MASTERY_THRESHOLD}/${MASTERY_THRESHOLD})!`,
                        ur: `لفظ پر عبور (${MASTERY_THRESHOLD}/${MASTERY_THRESHOLD})!`
                      }[baseLanguage] || `Word Mastered (${MASTERY_THRESHOLD}/${MASTERY_THRESHOLD})!`)}</strong>{' '}
                      {({
                        en: 'Removed from upcoming questions.',
                        zh: '已从后续复习题库中移除。',
                        ja: '今後の出題から除外されます。',
                        ko: '다음 문제 목록에서 제외됩니다.',
                        ru: 'Исключено из следующих вопросов.',
                        es: 'Eliminada de las próximas preguntas.',
                        fr: 'Retiré des prochaines questions.',
                        de: 'Aus kommenden Fragen entfernt.',
                        pt: 'Removida das próximas perguntas.',
                        id: 'Dihapus dari pertanyaan berikutnya.',
                        tr: 'Sonraki sorulardan çıkarıldı.',
                        hi: 'आगामी प्रश्नों से हटा दिया गया।',
                        ar: 'تمت إزالتها من الأسئلة القادمة.',
                        bn: 'পরবর্তী প্রশ্ন থেকে সরানো হয়েছে।',
                        ur: 'اگلے سوالات سے ہٹا دیا گیا۔'
                      }[baseLanguage] || 'Removed from upcoming questions.')}
                    </div>
                  )}
                  {currentQuestion.alternateMeanings?.length > 1 && (
                    <div className="multi-meaning-note">
                      🔀 {getMultiMeaningNote(baseLanguage, currentQuestion.prompt, currentQuestion.alternateMeanings)}
                    </div>
                  )}
                  {(currentQuestion.baseMeaning || currentQuestion.meaningHint) && (
                    <div className="feedback-meaning-line">
                      <span className="feedback-meaning-tag">
                        💡 {currentQuestion.type === 'alphabet' ? ui.sound : ui.meaning.replace(/[:：]\s*$/, '')}:
                      </span>{' '}
                      <strong>{currentQuestion.baseMeaning || currentQuestion.meaningHint}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Audio button in feedback sheet if available (safe here because answer is already submitted) */}
              {(currentQuestion.targetAudioWord || currentQuestion.russian) && (
                <div className="feedback-audio-action">
                  <PronunciationButton
                    text={currentQuestion.targetAudioWord || currentQuestion.russian}
                    lang={currentLanguage}
                    className="feedback-pronounce-btn"
                    audioCategory={getAudioCategory(currentQuestion.type)}
                  />
                </div>
              )}
            </div>

            <div className="feedback-action-area">
              {!isCorrect && (
                <button
                  type="button"
                  className="feedback-override-button"
                  onClick={handleOverrideAnswer}
                  aria-label="I was right"
                  title="Mark your answer as correct if your phrasing was valid"
                >
                  💡 {({
                    en: 'I was right', de: 'Ich hatte recht', es: 'Tenía razón', fr: "J'avais raison",
                    ru: 'Я был прав', pt: 'Eu estava certo', id: 'Jawaban saya benar', tr: 'Doğru bildim',
                    zh: '我答对了', ja: '正解にする', ko: '내 답이 맞았어요', hi: 'मेरा उत्तर सही था',
                    ar: 'إجابتي كانت صحيحة', bn: 'আমার উত্তর সঠিক ছিল', ur: 'میرا جواب درست تھا'
                  }[baseLanguage] || 'I was right')}
                </button>
              )}
              {sessionAnswered < sessionGoal ? (
                <button
                  className={`feedback-continue-button ${isCorrect ? 'btn-next-correct' : 'btn-next-incorrect'}`}
                  onClick={handleNextQuestion}
                  autoFocus
                  aria-label={`${ui.nextQuestion} (${sessionIndex + 1}/${sessionGoal})`}
                >
                  <span className="btn-main-label">{ui.nextQuestion} ({sessionIndex + 1}/{sessionGoal})</span>
                  <span className="btn-hint-badge">
                    {ui.pressEnter}
                  </span>
                </button>
              ) : (
                <button
                  className="feedback-continue-button finish-quiz-button"
                  onClick={handleCompleteSession}
                  autoFocus
                  aria-label={ui.completeQuiz}
                >
                  <span className="btn-main-label">
                    <FaCheckCircle className="btn-icon" /> {ui.completeQuiz} 🎉
                  </span>
                  <span className="btn-hint-badge">
                    {ui.pressEnter}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;