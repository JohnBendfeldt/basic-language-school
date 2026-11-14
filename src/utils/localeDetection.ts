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

  for (const rawLoc of locales) {
    if (!rawLoc || typeof rawLoc !== 'string') continue;
    const normalized = rawLoc.toLowerCase().trim().replace(/_/g, '-');
    const primary = normalized.split('-')[0];
    // Map legacy ISO 639-1 'in' (Android/Java) to Indonesian ('id')
    const code = primary === 'in' ? 'id' : primary;
    if (code in SUPPORTED_LANGUAGES) {
      return code as SupportedLanguageId;
    }
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
 * Explicit URL targets take precedence: if the URL target matches the
 * resolved base language, adjust baseLanguage so the requested course opens.
 */
export const detectInitialLanguagePair = (): LanguagePair => {
  const deviceLang = detectDeviceLanguage();

  let targetLanguage: SupportedLanguageId | undefined;
  let hasUrlTarget = false;
  let baseLanguage: SupportedLanguageId = 'en';
  let savedTarget: SupportedLanguageId | undefined;

  // 1. Check URL path for explicit target language (highest precedence)
  if (typeof window !== 'undefined') {
    const pathParts = window.location.pathname.toLowerCase().split('/').filter(Boolean);
    for (const part of pathParts) {
      if (part in SUPPORTED_LANGUAGES) {
        targetLanguage = part as SupportedLanguageId;
        hasUrlTarget = true;
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

      const rawSavedTarget =
        localStorage.getItem('basic_language_target_lang') ||
        localStorage.getItem('basic_language_active_lang');
      if (rawSavedTarget && rawSavedTarget in SUPPORTED_LANGUAGES) {
        savedTarget = rawSavedTarget as SupportedLanguageId;
      }

      if (!targetLanguage && savedTarget) {
        targetLanguage = savedTarget;
      }
    } catch {
      // ignore
    }
  } else {
    baseLanguage = deviceLang;
  }

  // 3. Fallback based on device locale if not set from URL or localStorage
  if (!targetLanguage) {
    targetLanguage = deviceLang === 'en' ? 'ru' : 'en';
  }

  // 4. Ensure target and base are not identical
  if (targetLanguage === baseLanguage) {
    if (hasUrlTarget) {
      baseLanguage =
        savedTarget && savedTarget !== targetLanguage
          ? savedTarget
          : (targetLanguage === 'en' ? 'es' : 'en');
    } else if (baseLanguage === 'en') {
      targetLanguage = 'es';
    } else {
      targetLanguage = 'en';
    }
  }

  return { targetLanguage, baseLanguage };
};
