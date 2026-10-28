import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { SupportedLanguageId, LanguageMeta } from '../data/languages/types';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, getLanguageMeta } from '../data/languages';
import { ProgressService } from '../services/progressService';
import { cancelAllSpeech } from '../utils/speech';

interface LanguageContextType {
  currentLanguage: SupportedLanguageId;
  currentMeta: LanguageMeta;
  supportedLanguages: LanguageMeta[];
  setLanguage: (langId: SupportedLanguageId) => void;
  availableLanguages: { id: string; name: string; nativeName: string; flag: string; available: boolean }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Roadmap of languages for the platform
export const ALL_PLATFORM_LANGUAGES = [
  { id: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', available: true },
  { id: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', available: true },
  { id: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', available: false },
  { id: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', available: false },
];

/**
 * Intelligent language detector:
 * 1. Checks URL path (e.g. /learn/ru/..., /learn/en/..., /ru/..., /en/...)
 * 2. Checks localStorage preference
 * 3. Checks browser primary language (navigator.language)
 * 4. Fallback to default
 */
const detectInitialLanguage = (): SupportedLanguageId => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  // 1. Check pathname
  const pathParts = window.location.pathname.toLowerCase().split('/').filter(Boolean);
  for (const part of pathParts) {
    if (part in SUPPORTED_LANGUAGES) {
      return part as SupportedLanguageId;
    }
  }

  // 2. Check localStorage
  try {
    const saved = localStorage.getItem('basic_language_active_lang');
    if (saved && saved in SUPPORTED_LANGUAGES) {
      return saved as SupportedLanguageId;
    }
  } catch (err) {
    console.warn('Could not read saved language from localStorage:', err);
  }

  // 3. Browser language detection (foundation for native language matching)
  try {
    const browserLang = (navigator.language || (navigator as any).userLanguage || '').toLowerCase();
    if (browserLang.startsWith('ru') && 'ru' in SUPPORTED_LANGUAGES) {
      return 'ru';
    }
    // If user's browser is non-English, they may be coming to learn English
    if (browserLang.startsWith('en') && 'ru' in SUPPORTED_LANGUAGES) {
      // Default to Russian for English speakers learning Russian
      return 'ru';
    }
  } catch {
    // ignore
  }

  return DEFAULT_LANGUAGE;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState<SupportedLanguageId>(detectInitialLanguage);

  const currentMeta = getLanguageMeta(currentLanguage);
  const supportedLanguages = Object.values(SUPPORTED_LANGUAGES);

  const setLanguage = useCallback((langId: SupportedLanguageId) => {
    if (!(langId in SUPPORTED_LANGUAGES)) return;

    // Halt any playing speech/audio
    cancelAllSpeech();
    document.querySelectorAll('audio').forEach(a => {
      try { a.pause(); } catch { /* ignore */ }
    });

    setCurrentLanguageState(langId);

    // Save locally and to backend profile
    ProgressService.setActiveLanguage(langId);

    // Update document language attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = langId;
    }
  }, []);

  // Sync html lang tag on initial mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLanguage;
    }
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        currentMeta,
        supportedLanguages,
        setLanguage,
        availableLanguages: ALL_PLATFORM_LANGUAGES
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
      currentMeta: SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE],
      supportedLanguages: Object.values(SUPPORTED_LANGUAGES),
      setLanguage: () => {},
      availableLanguages: ALL_PLATFORM_LANGUAGES
    };
  }
  return context;
};
