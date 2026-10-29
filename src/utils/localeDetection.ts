import { SupportedLanguageId } from '../data/languages/types';
import { SUPPORTED_LANGUAGES } from '../data/languages';

export interface LanguagePair {
  targetLanguage: SupportedLanguageId; // Language the user is learning
  baseLanguage: SupportedLanguageId;   // User's native / UI / reference language
}

/**
 * Detect user's native language from browser / device locale.
 * Checks navigator.languages array, navigator.language, and system preferences.
 */
export const detectDeviceLanguage = (): SupportedLanguageId => {
  if (typeof window === 'undefined') return 'en';

  const locales: string[] = [];
  if (navigator.languages && navigator.languages.length > 0) {
    locales.push(...navigator.languages);
  }
  if (navigator.language) {
    locales.push(navigator.language);
  }
  if ((navigator as any).userLanguage) {
    locales.push((navigator as any).userLanguage);
  }

  for (const loc of locales) {
    const code = loc.toLowerCase().split('-')[0];
    if (code === 'es') return 'es';
    if (code === 'fr') return 'fr';
    if (code === 'ru') return 'ru';
    if (code === 'pt') return 'pt';
    if (code === 'de') return 'de';
    if (code === 'id') return 'id';
    if (code === 'tr') return 'tr';
    if (code === 'en') return 'en';
  }

  return 'en';
};

/**
 * Determine the initial language pair based on:
 * 1. Saved localStorage preferences
 * 2. URL path (e.g. /learn/es, /learn/fr, /ru)
 * 3. Detected device/browser language
 *
 * Rule: Native language and Target language cannot be the same.
 * If user device is Spanish ('es'), target defaults to English ('en').
 * If user device is French ('fr'), target defaults to English ('en').
 * If user device is Russian ('ru'), target defaults to English ('en').
 * If user device is English ('en'), target defaults to Spanish ('es').
 */
export const detectInitialLanguagePair = (): LanguagePair => {
  const deviceLang = detectDeviceLanguage();

  let targetLanguage: SupportedLanguageId | undefined;
  let baseLanguage: SupportedLanguageId = 'en';

  // 1. Check URL path for explicit target language (highest precedence)
  if (typeof window !== 'undefined') {
    const pathParts = window.location.pathname.toLowerCase().split('/').filter(Boolean);
    for (const part of pathParts) {
      if (part in SUPPORTED_LANGUAGES) {
        targetLanguage = part as SupportedLanguageId;
        break;
      }
    }
  }

  // 2. Check localStorage saved preferences
  if (typeof window !== 'undefined') {
    try {
      const savedBase = localStorage.getItem('basic_language_base_lang');
      if (savedBase && savedBase in SUPPORTED_LANGUAGES) {
        baseLanguage = savedBase as SupportedLanguageId;
      } else {
        baseLanguage = deviceLang;
      }

      if (!targetLanguage) {
        const savedTarget = localStorage.getItem('basic_language_target_lang') 
          || localStorage.getItem('basic_language_active_lang');
        if (savedTarget && savedTarget in SUPPORTED_LANGUAGES) {
          targetLanguage = savedTarget as SupportedLanguageId;
        }
      }
    } catch {
      // ignore
    }
  } else {
    baseLanguage = deviceLang;
  }

  // 3. Fallback based on device locale if not set from URL or localStorage
  if (!targetLanguage) {
    if (deviceLang === 'es' || deviceLang === 'fr' || deviceLang === 'ru') {
      targetLanguage = 'en';
    } else {
      targetLanguage = 'ru';
    }
  }

  // Ensure target and base are not identical
  if (targetLanguage === baseLanguage) {
    if (baseLanguage === 'es') targetLanguage = 'en';
    else if (baseLanguage === 'fr') targetLanguage = 'en';
    else if (baseLanguage === 'ru') targetLanguage = 'en';
    else targetLanguage = 'es';
  }

  return { targetLanguage, baseLanguage };
};
