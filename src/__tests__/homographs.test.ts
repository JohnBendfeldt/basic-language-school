import { describe, it, expect } from 'vitest';
import { areSameSense, buildHomographIndex, lookupHomograph } from '../utils/homographs';
import { getMultiMeaningNote } from '../utils/pageDictionary';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { resolveTranslation } from '../utils/translationResolver';
import { SupportedLanguageId } from '../data/languages/types';
import { PhraseItem } from '../types';

const resolveEn = (p: PhraseItem) => (p.translation ?? p.meaning ?? p.english ?? '').toString();

describe('areSameSense', () => {
  it.each([
    ['Fruit', 'Fruits'],
    ['Internet', 'Web / Internet'],
    ['Artificial Intelligence (AI)', 'Artificial intelligence'],
    ['Home / House', 'House / Home'],
    ['Hello', 'hello'],
  ])('treats "%s" and "%s" as the same sense', (a, b) => {
    expect(areSameSense(a, b)).toBe(true);
  });

  it.each([
    ['Moon', 'Month'],
    ['Snow', 'Eye'],
    ['Slow', 'Late'],
    ['Cat', 'Car'],
  ])('keeps "%s" and "%s" as different senses', (a, b) => {
    expect(areSameSense(a, b)).toBe(false);
  });
});

describe('buildHomographIndex', () => {
  const rows: PhraseItem[] = [
    { phrase: '月', translation: 'Moon' },
    { phrase: '月', translation: 'Month' },
    { phrase: '果物', translation: 'Fruits' },
    { phrase: '果物', translation: 'Fruit' },
    { phrase: '犬', translation: 'Dog' },
  ];

  it('collects every meaning of a repeated target text', () => {
    const index = buildHomographIndex(rows, resolveEn);
    expect(lookupHomograph(index, '月')?.acceptedMeanings).toEqual(['Moon', 'Month']);
    expect(lookupHomograph(index, '月')?.distinctSenses).toEqual(['Moon', 'Month']);
  });

  it('accepts both spellings of a near-synonym but reports a single sense', () => {
    const info = lookupHomograph(buildHomographIndex(rows, resolveEn), '果物');
    expect(info?.acceptedMeanings).toEqual(['Fruits', 'Fruit']);
    expect(info?.distinctSenses).toHaveLength(1);
  });

  it('ignores words that only have one meaning', () => {
    expect(lookupHomograph(buildHomographIndex(rows, resolveEn), '犬')).toBeUndefined();
  });

  it('looks up case-insensitively and ignores surrounding whitespace', () => {
    const index = buildHomographIndex(
      [{ phrase: 'Ticket', translation: 'Ticket' }, { phrase: 'ticket', translation: 'Fine' }],
      resolveEn
    );
    expect(lookupHomograph(index, '  TICKET ')?.acceptedMeanings).toEqual(['Ticket', 'Fine']);
  });

  it('skips rows with no target or no meaning', () => {
    const index = buildHomographIndex(
      [{ phrase: '', translation: 'x' }, { phrase: 'a', translation: '' }, { phrase: 'a', translation: 'A' }],
      resolveEn
    );
    expect(index.size).toBe(0);
  });

  it('supports target text stored as russian/target fields', () => {
    const index = buildHomographIndex(
      [{ russian: 'лук', english: 'Onion' }, { target: 'лук', english: 'Bow' }],
      resolveEn
    );
    expect(lookupHomograph(index, 'лук')?.acceptedMeanings).toEqual(['Onion', 'Bow']);
  });
});

describe('homographs in the real curriculum', () => {
  const index = (lang: SupportedLanguageId, base: SupportedLanguageId) => {
    const d = SUPPORTED_LANGUAGES[lang].data;
    const rows = [...d.basicPhrases, ...d.numbers, ...d.commonWords, ...(d.time ?? [])];
    return buildHomographIndex(rows, (item) => resolveTranslation(item, lang, base));
  };

  it('Japanese 月 accepts both "moon" and "month"', () => {
    const info = lookupHomograph(index('ja', 'en'), '月');
    expect(info).toBeDefined();
    const all = info!.acceptedMeanings.join('|').toLowerCase();
    expect(all).toContain('moon');
    expect(all).toContain('month');
  });

  it('Korean 눈 accepts both "snow" and "eye"', () => {
    const info = lookupHomograph(index('ko', 'en'), '눈');
    expect(info).toBeDefined();
    const all = info!.acceptedMeanings.join('|').toLowerCase();
    expect(all).toContain('snow');
    expect(all).toContain('eye');
  });
});

describe('getMultiMeaningNote', () => {
  const LANGS: SupportedLanguageId[] = ['en', 'es', 'fr', 'ru', 'pt', 'de', 'id', 'tr', 'zh', 'ja', 'ko', 'hi', 'ar', 'bn', 'ur'];

  it.each(LANGS)('%s: mentions the word and every meaning', (lang) => {
    const note = getMultiMeaningNote(lang, '月', ['Moon', 'Month']);
    expect(note).toContain('月');
    expect(note).toContain('Moon');
    expect(note).toContain('Month');
  });

  it('is localized rather than left in English for Russian', () => {
    expect(getMultiMeaningNote('ru', 'лук', ['Onion', 'Bow'])).toContain('значений');
    expect(getMultiMeaningNote('ru', 'лук', ['Onion', 'Bow'])).not.toContain('has more than one meaning');
  });
});

