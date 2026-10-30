import { AppData } from '../../types';

export type SupportedLanguageId = 'ru' | 'en' | 'es' | 'fr' | 'pt' | 'de' | 'id' | 'tr' | 'ko' | 'ja' | 'zh' | 'hi';

export interface LanguageMeta {
  id: SupportedLanguageId;
  name: string;
  nativeName: string;
  flag: string;
  code: string; // e.g. 'ru-RU', 'en-US'
  ttsVoice: string; // Microsoft Edge Neural voice ID
  hasKeyboard: boolean; // Cyrillic or special virtual keyboard
  hasAlphabet: boolean;
  hasTimeGuide: boolean;
  appName: string; // e.g. 'Basic Russian', 'Basic English'
  domain: string;
  seo: Record<string, { title: string; description: string }>;
  data: AppData;
}
