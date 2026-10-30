import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { SupportedLanguageId, LanguageMeta } from '../data/languages/types';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, getLanguageMeta } from '../data/languages';
import { ProgressService } from '../services/progressService';
import { cancelAllSpeech } from '../utils/speech';
import { detectInitialLanguagePair, detectDeviceLanguage } from '../utils/localeDetection';
import { UI_TRANSLATIONS, UIStrings } from '../data/translations';

export type SpeechSpeed = 0.5 | 0.75 | 0.9 | 1.0 | 1.1 | 1.25;

interface LanguageContextType {
  // Target language (the language the user is actively learning)
  currentLanguage: SupportedLanguageId;
  targetLanguage: SupportedLanguageId;
  currentMeta: LanguageMeta;
  targetMeta: LanguageMeta;
  setLanguage: (langId: SupportedLanguageId) => void;
  setTargetLanguage: (langId: SupportedLanguageId) => void;

  // Base / Native language (user's device/reference language)
  baseLanguage: SupportedLanguageId;
  baseMeta: LanguageMeta;
  setBaseLanguage: (langId: SupportedLanguageId) => void;
  swapLanguages: () => void;

  // Localized UI strings for buttons, titles, actions
  ui: UIStrings;

  // Metadata & Platform options
  supportedLanguages: LanguageMeta[];
  availableLanguages: { id: string; name: string; nativeName: string; flag: string; available: boolean }[];
  speechSpeed: SpeechSpeed;
  setSpeechSpeed: (speed: SpeechSpeed) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export interface RoadmapLanguage {
  id: string;
  name: string;
  nativeName: string;
  speakers: string;
  flag: string;
  rank: number;
}

// Top most-spoken languages targeted for the platform roadmap
export const ROADMAP_MOST_SPOKEN_LANGUAGES: RoadmapLanguage[] = [
  { id: 'pa', rank: 11, name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', speakers: '~150M', flag: '🇮🇳' },
  { id: 'mr', rank: 12, name: 'Marathi', nativeName: 'मराठी', speakers: '~99M', flag: '🇮🇳' },
];

// Active languages available on the platform
export const ALL_PLATFORM_LANGUAGES = [
  { id: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', available: true },
  { id: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', available: true },
  { id: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', available: true },
  { id: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', available: true },
  { id: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', available: true },
  { id: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', available: true },
  { id: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', available: true },
  { id: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', available: true },
  { id: 'zh', name: 'Mandarin Chinese', nativeName: '中文', flag: '🇨🇳', available: true },
  { id: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', available: true },
  { id: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', available: true },
  { id: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', available: true },
  { id: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', available: true },
  { id: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', available: true },
  { id: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', available: true },
];

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [targetLanguage, setTargetLanguageState] = useState<SupportedLanguageId>(() => {
    return detectInitialLanguagePair().targetLanguage;
  });
  const [baseLanguage, setBaseLanguageState] = useState<SupportedLanguageId>(() => {
    return detectInitialLanguagePair().baseLanguage;
  });

  // Listen to popstate in LanguageProvider as well so context stays synced with URL changes
  useEffect(() => {
    const handleUrlSync = () => {
      const pair = detectInitialLanguagePair();
      setTargetLanguageState(prev => prev !== pair.targetLanguage ? pair.targetLanguage : prev);
    };
    window.addEventListener('popstate', handleUrlSync);
    return () => window.removeEventListener('popstate', handleUrlSync);
  }, []);

  const [speechSpeed, setSpeechSpeedState] = useState<SpeechSpeed>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("basic_language_speech_speed");
        if (saved) {
          const parsed = parseFloat(saved);
          if ([0.5, 0.75, 0.9, 1.0, 1.1, 1.25].includes(parsed)) return parsed as SpeechSpeed;
        }
      } catch { /* ignore */ }
    }
    return 1.0;
  });

  const setSpeechSpeed = useCallback((speed: SpeechSpeed) => {
    setSpeechSpeedState(speed);
    try {
      localStorage.setItem("basic_language_speech_speed", speed.toString());
    } catch { /* ignore */ }
  }, []);

  const targetMeta = getLanguageMeta(targetLanguage);
  const baseMeta = getLanguageMeta(baseLanguage);
  const supportedLanguages = Object.values(SUPPORTED_LANGUAGES);
  const ui = UI_TRANSLATIONS[baseLanguage] || UI_TRANSLATIONS.en;

  // Set target language (the language being learned)
  const setTargetLanguage = useCallback((langId: SupportedLanguageId) => {
    if (!(langId in SUPPORTED_LANGUAGES)) return;

    cancelAllSpeech();
    document.querySelectorAll('audio').forEach(a => {
      try { a.pause(); } catch { /* ignore */ }
    });

    setTargetLanguageState(langId);

    // If new target matches base, swap base to previous target (never hardcode Spanish unless identical)
    if (langId === baseLanguage) {
      const fallbackBase: SupportedLanguageId =
        targetLanguage !== langId
          ? targetLanguage
          : (langId === 'en' ? 'es' : 'en');
      setBaseLanguageState(fallbackBase);
      try {
        localStorage.setItem('basic_language_base_lang', fallbackBase);
      } catch { /* ignore */ }
    }

    try {
      localStorage.setItem('basic_language_target_lang', langId);
      localStorage.setItem('basic_language_active_lang', langId);
    } catch { /* ignore */ }

    ProgressService.setActiveLanguage(langId);

    if (typeof document !== 'undefined') {
      document.documentElement.lang = langId;
      document.documentElement.dir = baseLanguage === 'ar' ? 'rtl' : 'ltr';
    }
  }, [baseLanguage, targetLanguage]);

  // Backward compatibility alias for setLanguage
  const setLanguage = setTargetLanguage;

  // Set base language (user's native language)
  const setBaseLanguage = useCallback((langId: SupportedLanguageId) => {
    if (!(langId in SUPPORTED_LANGUAGES)) return;

    setBaseLanguageState(langId);

    // If new base matches target, swap target to previous base (never hardcode Spanish unless identical)
    if (langId === targetLanguage) {
      const fallbackTarget: SupportedLanguageId =
        baseLanguage !== langId
          ? baseLanguage
          : (langId === 'en' ? 'es' : 'en');
      setTargetLanguageState(fallbackTarget);
      try {
        localStorage.setItem('basic_language_target_lang', fallbackTarget);
        localStorage.setItem('basic_language_active_lang', fallbackTarget);
      } catch { /* ignore */ }
      ProgressService.setActiveLanguage(fallbackTarget);
    }

    try {
      localStorage.setItem('basic_language_base_lang', langId);
    } catch { /* ignore */ }

    if (typeof document !== 'undefined') {
      document.documentElement.dir = langId === 'ar' ? 'rtl' : 'ltr';
    }
  }, [targetLanguage, baseLanguage]);

  // Quick swap pair (e.g. Spanish -> English becomes English -> Spanish)
  const swapLanguages = useCallback(() => {
    cancelAllSpeech();
    const oldTarget = targetLanguage;
    const oldBase = baseLanguage;

    setTargetLanguageState(oldBase);
    setBaseLanguageState(oldTarget);

    try {
      localStorage.setItem('basic_language_target_lang', oldBase);
      localStorage.setItem('basic_language_active_lang', oldBase);
      localStorage.setItem('basic_language_base_lang', oldTarget);
    } catch { /* ignore */ }

    ProgressService.setActiveLanguage(oldBase);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = oldBase;
    }
  }, [targetLanguage, baseLanguage]);

  // Sync html lang tag on initial mount & updates
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = targetLanguage;
    }
  }, [targetLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        // Target / active language
        currentLanguage: targetLanguage,
        targetLanguage,
        currentMeta: targetMeta,
        targetMeta,
        setLanguage,
        setTargetLanguage,

        // Native / reference language
        baseLanguage,
        baseMeta,
        setBaseLanguage,
        swapLanguages,

        // Localized UI strings
        ui,

        // Platform metadata
        supportedLanguages,
        availableLanguages: ALL_PLATFORM_LANGUAGES,
        speechSpeed,
        setSpeechSpeed
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      currentLanguage: DEFAULT_LANGUAGE,
      targetLanguage: DEFAULT_LANGUAGE,
      currentMeta: SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE],
      targetMeta: SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE],
      setLanguage: () => {},
      setTargetLanguage: () => {},
      baseLanguage: 'en',
      baseMeta: SUPPORTED_LANGUAGES.en,
      setBaseLanguage: () => {},
      swapLanguages: () => {},
      ui: UI_TRANSLATIONS.en,
      supportedLanguages: Object.values(SUPPORTED_LANGUAGES),
      availableLanguages: ALL_PLATFORM_LANGUAGES,
      speechSpeed: 1.0,
      setSpeechSpeed: () => {}
    };
  }
  return context;
};
