import { describe, it, expect } from 'vitest';
import {
  getAlphabetLabels,
  getQuizRecapLabels,
  getComponentChrome,
  getLocalizedRegionName,
  getQuizToolbarLabels,
  localizeCategoryBadge,
  localizeLevelBadge,
  getLocalizedAppName,
  getLocalizedLanguageName,
  getTimeTabs,
  LanguageRegionKey,
} from '../utils/pageDictionary';
import { LANGUAGE_NAMES_IN_BASE } from '../utils/translationResolver';
import { SupportedLanguageId } from '../data/languages/types';

const ALL: SupportedLanguageId[] = ['en', 'es', 'fr', 'ru', 'pt', 'de', 'id', 'tr', 'zh', 'ja', 'ko', 'hi', 'ar', 'bn', 'ur'];
const NON_LATIN: SupportedLanguageId[] = ['ru', 'zh', 'ja', 'ko', 'hi', 'ar', 'bn', 'ur'];
const REGIONS: LanguageRegionKey[] = ['all', 'romance', 'germanic', 'slavic-eurasian', 'east-asian', 'south-asian', 'middle-eastern'];

const isNonEmptyString = (v: unknown) => typeof v === 'string' && v.trim().length > 0;

describe('UI localization matrix across all 15 base languages', () => {
  it.each(ALL)('%s: quiz recap labels are complete', (lang) => {
    const r = getQuizRecapLabels(lang);
    for (const key of ['sessionComplete', 'goal', 'correct', 'bestStreak', 'mastered', 'remaining', 'loggedNotice', 'chooseTopic', 'chooseNextLength', 'pressEnter', 'reviewHint', 'answerLabel', 'youTypedLabel', 'coreCurriculum', 'specializedPacks', 'replayAudio', 'needHint', 'meaningLabel'] as const) {
      expect(isNonEmptyString(r[key]), `${lang}.${key}`).toBe(true);
    }
    expect(r.correctRatio(4, 5)).toContain('4');
    expect(r.correctRatio(4, 5)).toContain('5');
    expect(r.startNextQuiz(10)).toContain('10');
    expect(r.wordsToReview(3)).toContain('3');
    const cp = r.levelCheckpoint(2, 90);
    expect(isNonEmptyString(cp.title)).toBe(true);
    expect(isNonEmptyString(cp.desc)).toBe(true);
    expect(isNonEmptyString(r.feedbackSubtitle(100, 'X'))).toBe(true);
    expect(isNonEmptyString(r.feedbackSubtitle(50, 'X'))).toBe(true);
  });

  it.each(NON_LATIN)('%s: recap labels are not left in English', (lang) => {
    const en = getQuizRecapLabels('en');
    const r = getQuizRecapLabels(lang);
    for (const key of ['goal', 'correct', 'bestStreak', 'mastered', 'remaining', 'loggedNotice', 'coreCurriculum', 'specializedPacks', 'answerLabel', 'youTypedLabel'] as const) {
      expect(r[key], `${lang}.${key}`).not.toBe(en[key]);
    }
  });

  it.each(ALL)('%s: component chrome has search labels and is complete', (lang) => {
    const chrome = getComponentChrome(lang);
    expect(isNonEmptyString(chrome.search)).toBe(true);
    expect(isNonEmptyString(chrome.searchTitle)).toBe(true);
    for (const [key, value] of Object.entries(chrome)) {
      if (typeof value === 'string') expect(value.trim().length, `${lang}.${key}`).toBeGreaterThan(0);
    }
  });

  it.each(NON_LATIN)('%s: search button is localized', (lang) => {
    expect(getComponentChrome(lang).search).not.toBe(getComponentChrome('en').search);
  });

  it.each(ALL)('%s: region names, toolbar, level and alphabet labels exist', (lang) => {
    for (const region of REGIONS) {
      expect(isNonEmptyString(getLocalizedRegionName(region, lang)), `${lang}:${region}`).toBe(true);
    }
    const tb = getQuizToolbarLabels(lang);
    expect(isNonEmptyString(tb.topic) && isNonEmptyString(tb.level) && isNonEmptyString(tb.modality)).toBe(true);
    expect(tb.questionOf(2, 5)).toContain('2');
    for (const level of ['all', 1, 2, 3] as const) {
      expect(isNonEmptyString(localizeLevelBadge(level, lang))).toBe(true);
    }
    const al = getAlphabetLabels(lang);
    expect(isNonEmptyString(al.sound) && isNonEmptyString(al.example) && isNonEmptyString(al.asIn)).toBe(true);
    expect(getTimeTabs(lang)).toBeTruthy();
  });

  it.each(ALL)('%s: core category badges are localized', (lang) => {
    for (const cat of ['Alphabet', 'Phrases & Greetings', 'Common Words', 'All']) {
      expect(isNonEmptyString(localizeCategoryBadge(cat, lang)), `${lang}:${cat}`).toBe(true);
    }
    expect(localizeCategoryBadge(undefined, lang)).toBeUndefined();
    expect(localizeCategoryBadge('Some Unknown Category', lang)).toBeTruthy();
  });

  it.each(NON_LATIN)('%s: Alphabet badge is not English', (lang) => {
    expect(localizeCategoryBadge('Alphabet', lang)).not.toBe('Alphabet');
  });

  it('region names fall back to English for unknown base languages', () => {
    expect(getLocalizedRegionName('romance', 'xx' as SupportedLanguageId)).toBe('Romance');
  });

  it('every base language names every target language', () => {
    for (const base of ALL) {
      for (const target of ALL) {
        if (base === target) continue;
        expect(isNonEmptyString(LANGUAGE_NAMES_IN_BASE[base]?.[target]), `${base}->${target}`).toBe(true);
        expect(isNonEmptyString(getLocalizedLanguageName(target, base, 'Fallback'))).toBe(true);
        expect(isNonEmptyString(getLocalizedAppName(target, base, 'Basic Fallback'))).toBe(true);
      }
    }
  });
});
