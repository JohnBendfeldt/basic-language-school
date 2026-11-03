import { SupportedLanguageId } from '../types';
import { LanguageProfile } from '../aboutLanguageData';

export type LocalizedLanguageProfile = Omit<LanguageProfile, 'id' | 'englishName' | 'nativeName'>;

export type AboutLanguageTranslations = Record<SupportedLanguageId, LocalizedLanguageProfile>;

