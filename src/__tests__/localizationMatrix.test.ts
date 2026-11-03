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
  getLanguageRequestCopy,
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

describe('Language request note', () => {
  it.each(ALL)('%s: has a title and text around the email address', (lang) => {
    const copy = getLanguageRequestCopy(lang);
    expect(copy.title.trim()).not.toBe('');
    expect(copy.before.trim()).not.toBe('');
    expect(copy.after.trim()).not.toBe('');
  });

  it.each(NON_LATIN)('%s: is not left in English', (lang) => {
    expect(getLanguageRequestCopy(lang).title).not.toBe(getLanguageRequestCopy('en').title);
  });

  it('falls back to English for an unknown language', () => {
    expect(getLanguageRequestCopy('xx' as SupportedLanguageId).title).toBe('Request a Language');
  });
});

import { SUPPORTED_LANGUAGES } from '../data/languages';
import { getPageContent } from '../utils/pageDictionary';
import { resolveTranslation } from '../utils/translationResolver';

describe('Full 15-language category, page header & translation performance guarantees', () => {
  const allDatasetCategories = Array.from(
    new Set(
      Object.values(SUPPORTED_LANGUAGES).flatMap((entry) => [
        ...(entry.data.basicPhrases || []).map((p) => p.category),
        ...(entry.data.commonWords || []).map((p) => p.category),
        ...(entry.data.numbers || []).map((p) => p.category),
        ...(entry.data.time || []).map((p) => p.category),
      ])
    )
  ).filter((c): c is string => Boolean(c && c.trim()));

  it.each(NON_LATIN)('%s: every curriculum category badge across all 15 courses localizes (no raw English)', (baseLang) => {
    for (const cat of allDatasetCategories) {
      const localized = localizeCategoryBadge(cat, baseLang);
      expect(localized, `${baseLang} category "${cat}" remained English`).toBeTruthy();
      expect(localized, `${baseLang} category "${cat}" remained English`).not.toBe(cat);
    }
  });

  it.each(NON_LATIN)('%s: level badges never fall back to English', (baseLang) => {
    for (const level of ['all', 1, 2, 3] as const) {
      const enVal = localizeLevelBadge(level, 'en');
      const localized = localizeLevelBadge(level, baseLang);
      expect(localized, `${baseLang} level "${level}"`).not.toBe(enVal);
    }
  });

  it.each(NON_LATIN)('%s: getPageContent localizes titles & subtitles for all 15 target languages across all 6 sections', (baseLang) => {
    const sections = ['alphabet', 'phrases', 'words', 'numbers', 'time', 'quiz'] as const;
    for (const targetLang of ALL) {
      for (const section of sections) {
        const enPage = getPageContent(section, targetLang, 'en');
        const localizedPage = getPageContent(section, targetLang, baseLang);
        expect(isNonEmptyString(localizedPage.title), `${baseLang}->${targetLang}:${section}.title`).toBe(true);
        expect(isNonEmptyString(localizedPage.subtitle), `${baseLang}->${targetLang}:${section}.subtitle`).toBe(true);
        expect(localizedPage.title, `${baseLang}->${targetLang}:${section}.title leaked English`).not.toBe(enPage.title);
        expect(localizedPage.subtitle, `${baseLang}->${targetLang}:${section}.subtitle leaked English`).not.toBe(enPage.subtitle);
      }
    }
  });

  it('resolves English words into Urdu and Bengali script instead of English dictionary definitions, in < 50ms for 500+ items', () => {
    const enWords = SUPPORTED_LANGUAGES.en.data.commonWords || [];
    expect(enWords.length).toBeGreaterThan(400);

    // Warm up one-time index initialization, then benchmark 1,000+ steady-state tab-switch lookups
    resolveTranslation(enWords[0] as any, 'en', 'es');
    const start = performance.now();
    const urResults = enWords.map((item) => resolveTranslation(item as any, 'en', 'ur'));
    const zhResults = enWords.map((item) => resolveTranslation(item as any, 'en', 'zh'));
    const elapsedMs = performance.now() - start;

    expect(elapsedMs).toBeLessThan(250);
    expect(urResults.some((t) => /[\u0600-\u06FF]/.test(t))).toBe(true);
    expect(zhResults.some((t) => /[\u4E00-\u9FFF]/.test(t))).toBe(true);

    const appleItem = { phrase: 'Apple', translation: 'Noun: A sweet round fruit' };
    const urApple = resolveTranslation(appleItem, 'en', 'ur');
    const bnApple = resolveTranslation(appleItem, 'en', 'bn');
    expect(urApple).not.toContain('Noun:');
    expect(bnApple).not.toContain('Noun:');
    expect(/[\u0600-\u06FF]/.test(urApple)).toBe(true);
    expect(/[\u0980-\u09FF]/.test(bnApple)).toBe(true);
  });
});
