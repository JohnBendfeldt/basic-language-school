import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef, ReactNode } from 'react';
import { SupportedLanguageId, LanguageMeta } from '../data/languages/types';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, getLanguageMeta, isSupportedLanguageId } from '../data/languages';
import { ProgressService } from '../services/progressService';
import { cancelAllSpeech } from '../utils/speech';
import { detectInitialLanguagePair, LanguagePair } from '../utils/localeDetection';
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
  setLanguagePair: (baseLangId: SupportedLanguageId, targetLangId: SupportedLanguageId) => void;
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

const SUPPORTED_LANGUAGE_LIST = Object.values(SUPPORTED_LANGUAGES);
const isRtlLanguage = (langId: SupportedLanguageId): boolean => langId === 'ar' || langId === 'ur';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [initialPair] = useState<LanguagePair>(() => detectInitialLanguagePair());
  const [targetLanguage, setTargetLanguageState] = useState<SupportedLanguageId>(initialPair.targetLanguage);
  const [baseLanguage, setBaseLanguageState] = useState<SupportedLanguageId>(initialPair.baseLanguage);
  const pairRef = useRef<LanguagePair>({
    baseLanguage: initialPair.baseLanguage,
    targetLanguage: initialPair.targetLanguage,
  });

  // Listen to popstate in LanguageProvider so both base and target stay synced with URL changes
  useEffect(() => {
    const handleUrlSync = () => {
      if (typeof window === 'undefined') return;
      const pathParts = window.location.pathname.toLowerCase().split('/').filter(Boolean);
      const hasUrlLang = pathParts.some(p => isSupportedLanguageId(p));
      if (!hasUrlLang) return;

      const pair = detectInitialLanguagePair();
      const prev = pairRef.current;
      const nextTarget = pair.targetLanguage;
      const nextBase: SupportedLanguageId =
        nextTarget === prev.baseLanguage
          ? (prev.targetLanguage !== nextTarget ? prev.targetLanguage : pair.baseLanguage)
          : prev.baseLanguage;

      if (nextBase !== prev.baseLanguage || nextTarget !== prev.targetLanguage) {
        pairRef.current = { baseLanguage: nextBase, targetLanguage: nextTarget };
        setBaseLanguageState(nextBase);
        setTargetLanguageState(nextTarget);
        try {
          localStorage.setItem('basic_language_base_lang', nextBase);
          localStorage.setItem('basic_language_target_lang', nextTarget);
          localStorage.setItem('basic_language_active_lang', nextTarget);
        } catch { /* ignore */ }
        ProgressService.setActiveLanguage(nextTarget);
      }
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
  const supportedLanguages = SUPPORTED_LANGUAGE_LIST;
  const ui = Object.prototype.hasOwnProperty.call(UI_TRANSLATIONS, baseLanguage)
    ? UI_TRANSLATIONS[baseLanguage]
    : UI_TRANSLATIONS.en;

  // Commit a resolved (baseLanguage, targetLanguage) pair atomically using synchronous ref tracking
  const applyLanguagePair = useCallback((
    requestedBase: SupportedLanguageId,
    requestedTarget: SupportedLanguageId,
    options: { stopSpeech?: boolean } = {}
  ) => {
    if (!isSupportedLanguageId(requestedBase) || !isSupportedLanguageId(requestedTarget)) return;

    const prev = pairRef.current;
    let resolvedBase = requestedBase;
    const resolvedTarget = requestedTarget;

    if (resolvedBase === resolvedTarget) {
      resolvedBase =
        prev.targetLanguage !== resolvedTarget
          ? prev.targetLanguage
          : (resolvedTarget === 'en' ? 'es' : 'en');
    }

    if (options.stopSpeech && resolvedTarget !== prev.targetLanguage) {
      cancelAllSpeech();
      if (typeof document !== 'undefined') {
        document.querySelectorAll('audio').forEach(a => {
          try { a.pause(); } catch { /* ignore */ }
        });
      }
    }

    pairRef.current = { baseLanguage: resolvedBase, targetLanguage: resolvedTarget };
    setBaseLanguageState(resolvedBase);
    setTargetLanguageState(resolvedTarget);

    try {
      localStorage.setItem('basic_language_base_lang', resolvedBase);
      localStorage.setItem('basic_language_target_lang', resolvedTarget);
      localStorage.setItem('basic_language_active_lang', resolvedTarget);
    } catch { /* ignore */ }

    ProgressService.setActiveLanguage(resolvedTarget);

    if (typeof document !== 'undefined') {
      document.documentElement.lang = resolvedTarget;
      document.documentElement.dir = isRtlLanguage(resolvedBase) ? 'rtl' : 'ltr';
    }
  }, []);

  // Set target language (the language being learned)
  const setTargetLanguage = useCallback((langId: SupportedLanguageId) => {
    if (!(langId in SUPPORTED_LANGUAGES)) return;
    const prev = pairRef.current;
    if (prev.targetLanguage === langId && prev.baseLanguage !== langId) return;
    const nextBase: SupportedLanguageId =
      langId === prev.baseLanguage
        ? (prev.targetLanguage !== langId ? prev.targetLanguage : (langId === 'en' ? 'es' : 'en'))
        : prev.baseLanguage;
    applyLanguagePair(nextBase, langId, { stopSpeech: true });
  }, [applyLanguagePair]);

  // Backward compatibility alias for setLanguage
  const setLanguage = setTargetLanguage;

  // Set base language (user's native language)
  const setBaseLanguage = useCallback((langId: SupportedLanguageId) => {
    if (!(langId in SUPPORTED_LANGUAGES)) return;
    const prev = pairRef.current;
    const nextTarget: SupportedLanguageId =
      langId === prev.targetLanguage
        ? (prev.baseLanguage !== langId ? prev.baseLanguage : (langId === 'en' ? 'es' : 'en'))
        : prev.targetLanguage;
    applyLanguagePair(langId, nextTarget, { stopSpeech: nextTarget !== prev.targetLanguage });
  }, [applyLanguagePair]);

  // Atomically set both base and target languages without stale-closure clobbering
  const setLanguagePair = useCallback((baseLangId: SupportedLanguageId, targetLangId: SupportedLanguageId) => {
    applyLanguagePair(baseLangId, targetLangId, { stopSpeech: true });
  }, [applyLanguagePair]);

  // Quick swap pair (e.g. Spanish -> English becomes English -> Spanish)
  const swapLanguages = useCallback(() => {
    const prev = pairRef.current;
    applyLanguagePair(prev.targetLanguage, prev.baseLanguage, { stopSpeech: true });
  }, [applyLanguagePair]);

  // Sync html lang and dir tags on initial mount & updates
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = targetLanguage;
      document.documentElement.dir = isRtlLanguage(baseLanguage) ? 'rtl' : 'ltr';
    }
  }, [targetLanguage, baseLanguage]);

  const contextValue = useMemo<LanguageContextType>(() => ({
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
    setLanguagePair,
    swapLanguages,

    // Localized UI strings
    ui,

    // Platform metadata
    supportedLanguages,
    availableLanguages: ALL_PLATFORM_LANGUAGES,
    speechSpeed,
    setSpeechSpeed
  }), [
    targetLanguage,
    targetMeta,
    setLanguage,
    setTargetLanguage,
    baseLanguage,
    baseMeta,
    setBaseLanguage,
    setLanguagePair,
    swapLanguages,
    ui,
    supportedLanguages,
    speechSpeed,
    setSpeechSpeed
  ]);

  return (
    <LanguageContext.Provider value={contextValue}>
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
      setLanguagePair: () => {},
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
