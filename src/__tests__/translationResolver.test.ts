import { describe, it, expect } from 'vitest';
import {
  NUMBER_TABLE,
  extractDigit,
  getLocalizedNumber,
  resolveTranslation,
  getAlphabetQuizHint,
  buildQuizQuestionHint,
  LANGUAGE_NAMES_IN_BASE,
} from '../utils/translationResolver';
import { SupportedLanguageId } from '../data/languages/types';

const ALL: SupportedLanguageId[] = ['en', 'es', 'fr', 'ru', 'pt', 'de', 'id', 'tr', 'zh', 'ja', 'ko', 'hi', 'ar', 'bn', 'ur'];
const NON_LATIN: SupportedLanguageId[] = ['ru', 'zh', 'ja', 'ko', 'hi', 'ar', 'bn', 'ur'];

describe('NUMBER_TABLE', () => {
  it('has an entry for every number the curriculum uses, keyed by its own digit', () => {
    for (const [key, entry] of Object.entries(NUMBER_TABLE)) {
      expect(entry.digit).toBe(Number(key));
    }
    for (const n of [...Array(21).keys(), 30, 40, 50, 60, 70, 80, 90, 100, 1000]) {
      expect(NUMBER_TABLE[n], `missing ${n}`).toBeDefined();
    }
  });

  it('lists the digit itself among the accepted words for every number', () => {
    for (const entry of Object.values(NUMBER_TABLE)) {
      expect(entry.allWords, `digit ${entry.digit}`).toContain(String(entry.digit));
    }
  });

  it('accepts the lower-cased word of each of the original eight languages', () => {
    for (const entry of Object.values(NUMBER_TABLE)) {
      for (const lang of ['en', 'es', 'fr', 'ru', 'de', 'id', 'tr'] as const) {
        const word = String(entry[lang]).toLocaleLowerCase(lang === 'tr' ? 'tr' : undefined);
        expect(entry.allWords, `${entry.digit} ${lang} "${word}"`).toContain(word);
      }
    }
  });
});

describe('extractDigit', () => {
  it.each([
    ['15', 15],
    ['15 (Fifteen)', 15],
    ['1,000 (One Thousand)', 1000],
    ['1.000', 1000],
    ['Zero', 0],
    ['One hundred', 100],
    ['Сто', 100],
    ['Тысяча', 1000],
    ['quince', 15],
    ['十', 10],
  ])('reads "%s" as %s', (text, expected) => {
    expect(extractDigit(text)).toBe(expected);
  });

  it.each([
    '2:00 sharp',
    '12:30',
    "Two o'clock",
    'Es la una y media',
    'Il est trois heures',
    'Который час? Два часа',
    'Es ist halb drei',
    'Hello',
    '',
  ])('does not treat "%s" as a number', (text) => {
    expect(extractDigit(text)).toBeNull();
  });
});

describe('getLocalizedNumber', () => {
  it('formats digit plus the word in the requested language', () => {
    expect(getLocalizedNumber('15', 'es')).toBe('15 (Quince)');
    expect(getLocalizedNumber('15', 'ru')).toBe('15 (Пятнадцать)');
    expect(getLocalizedNumber('1,000', 'de')).toBe('1000 (Tausend)');
  });

  it('falls back to the English word when the language has no entry', () => {
    expect(getLocalizedNumber('7', 'ko')).toBe('7 (Seven)');
  });

  it('returns null for text that is not a number', () => {
    expect(getLocalizedNumber('hello', 'es')).toBeNull();
    expect(getLocalizedNumber('3:15', 'es')).toBeNull();
  });
});

describe('resolveTranslation', () => {
  it('returns the original text when base and target language are the same', () => {
    expect(resolveTranslation({ word: 'Hund', english: 'dog' }, 'de', 'de')).toBe('Hund');
    expect(resolveTranslation({ phrase: 'Guten Tag', translation: 'Good day' }, 'de', 'de')).toBe('Guten Tag');
  });

  it('returns an empty string for a missing item', () => {
    expect(resolveTranslation(undefined as never, 'es', 'en')).toBe('');
  });

  it('turns a cardinal number into "digit (word)" in the base language', () => {
    expect(resolveTranslation({ phrase: 'quince', translation: '15' }, 'es', 'ru')).toBe('15 (Пятнадцать)');
    expect(resolveTranslation({ phrase: 'cien', translation: 'One hundred' }, 'es', 'de')).toBe('100 (Hundert)');
  });

  it('never converts clock times into numbers', () => {
    const result = resolveTranslation({ phrase: 'Son las dos', translation: "It is two o'clock", category: 'Time' } as never, 'es', 'ru');
    expect(result).not.toMatch(/^\d+ \(/);
  });

  it('uses the shared dictionary to translate a word into the base language', () => {
    expect(resolveTranslation({ phrase: 'Wasser', translation: 'Water' }, 'de', 'es').toLowerCase()).toBe('agua');
  });

  it('falls back to the English meaning when no translation exists', () => {
    expect(resolveTranslation({ phrase: 'zzzz', translation: 'Quixotic gizmo' }, 'es', 'ru')).toBe('Quixotic gizmo');
  });

  it('falls back to the phrase itself when there is no meaning at all', () => {
    expect(resolveTranslation({ phrase: 'zzzz' }, 'es', 'ru')).toBe('zzzz');
  });

  it('prefers an explicit english field over the translation field when the dictionary has no match', () => {
    expect(resolveTranslation({ phrase: 'zzzz', english: 'Quixotic gizmo', translation: 'Ignored widget' }, 'es', 'ru')).toBe('Quixotic gizmo');
  });
});

describe('getAlphabetQuizHint', () => {
  it.each(ALL)('%s: asks about the letter in every target language', (base) => {
    const hint = getAlphabetQuizHint('Ç', 'fr', base, 'French');
    expect(hint).toContain('Ç');
    expect(hint.trim().length).toBeGreaterThan(8);
  });

  it.each(ALL)('%s: has a dedicated listening prompt', (base) => {
    const listening = getAlphabetQuizHint('A', 'fr', base, 'French', true);
    const reading = getAlphabetQuizHint('A', 'fr', base, 'French', false);
    expect(listening).not.toBe(reading);
    expect(listening).not.toContain('A'.repeat(2));
  });

  it.each(ALL)('%s: uses the Cyrillic wording when learning Russian', (base) => {
    expect(getAlphabetQuizHint('Ж', 'ru', base, 'Russian')).toContain('Ж');
  });

  it('names the target language in the learner\'s own language, never as the English name', () => {
    expect(getAlphabetQuizHint('A', 'fr', 'ru', 'French')).toContain('французском');
    expect(getAlphabetQuizHint('A', 'fr', 'ru', 'French')).not.toContain('French');
    expect(getAlphabetQuizHint('A', 'en', 'es', 'English')).toContain('inglés');
  });

  it('falls back to the provided language name when the pair has no localized name', () => {
    expect(getAlphabetQuizHint('A', 'xx' as SupportedLanguageId, 'en', 'Klingon')).toContain('Klingon');
  });

  it.each(NON_LATIN)('%s: is not left in English', (base) => {
    expect(getAlphabetQuizHint('A', 'fr', base, 'French')).not.toMatch(/What is the pronunciation/);
    expect(getAlphabetQuizHint('A', 'fr', base, 'French', true)).not.toMatch(/Listen to the audio/);
  });
});

describe('buildQuizQuestionHint', () => {
  it.each(ALL)('%s: both directions mention the prompt word', (base) => {
    expect(buildQuizQuestionHint('casa', true, 'es', base)).toContain('casa');
    expect(buildQuizQuestionHint('house', false, 'es', base)).toContain('house');
  });

  it.each(ALL)('%s: the two directions ask different questions', (base) => {
    expect(buildQuizQuestionHint('x', true, 'es', base)).not.toBe(buildQuizQuestionHint('x', false, 'es', base));
  });

  it.each(NON_LATIN)('%s: is localized instead of falling back to English', (base) => {
    expect(buildQuizQuestionHint('casa', true, 'es', base)).not.toBe('What does "casa" mean?');
    expect(buildQuizQuestionHint('house', false, 'es', base)).not.toMatch(/^How do you say/);
  });

  it('names the target language in the base language for "how do you say" questions', () => {
    expect(buildQuizQuestionHint('house', false, 'es', 'ru')).toContain(LANGUAGE_NAMES_IN_BASE.ru.es);
    expect(buildQuizQuestionHint('house', false, 'es', 'fr')).toContain('espagnol');
  });
});
