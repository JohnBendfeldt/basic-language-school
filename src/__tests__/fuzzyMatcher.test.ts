import { describe, it, expect } from 'vitest';
import {
  evaluateSmartAnswer,
  normalizeEnglishPhrase,
  isPlausibleTypo,
  keysAreAdjacent
} from '../utils/fuzzyMatcher';

describe('Smart Fuzzy Matcher Engine', () => {
  it('correctly expands contractions including let\'s, we\'ll, i\'m, wheres', () => {
    expect(normalizeEnglishPhrase("let's go")).toBe('let us go');
    expect(normalizeEnglishPhrase("lets plan a meeting")).toBe('let us plan a meeting');
    expect(normalizeEnglishPhrase("we'll meet")).toBe('we will meet');
    expect(normalizeEnglishPhrase("wheres the bathroom")).toBe('where is the bathroom');
  });

  it('normalizes conversational synonyms like schedule meeting <=> plan meeting', () => {
    expect(normalizeEnglishPhrase("schedule a meeting")).toBe('plan a meeting');
    expect(normalizeEnglishPhrase("shall we plan a meeting")).toBe('let us plan a meeting');
  });

  it('accepts user input with typos like "Are wer planning a meeting" for "let\'s schedule a meeting"', () => {
    const result = evaluateSmartAnswer(
      'Are wer planning a meeting',
      ["let's schedule a meeting", "are we planning a meeting", "let's plan a meeting"]
    );
    expect(result.isMatch).toBe(true);
    expect(result.isTypo).toBe(true);
    expect(result.typoWord).toEqual({ user: 'wer', target: 'we' });
    expect(result.feedbackNote).toContain('wer');
  });

  it('accepts "where is restroom" for "Where is the bathroom"', () => {
    const result = evaluateSmartAnswer(
      'where is restroom',
      ['Where is the bathroom']
    );
    expect(result.isMatch).toBe(true);
  });

  it('tolerates single-character typos in longer words like "planing" -> "planning"', () => {
    const result = evaluateSmartAnswer(
      'we are planing a meeting',
      ['we are planning a meeting']
    );
    expect(result.isMatch).toBe(true);
    expect(result.isTypo).toBe(true);
  });

  it('rejects completely incorrect translations', () => {
    const result = evaluateSmartAnswer(
      'I want an apple',
      ['Let\'s schedule a meeting']
    );
    expect(result.isMatch).toBe(false);
  });
});


describe('Typing slips vs different words', () => {
  describe('keysAreAdjacent', () => {
    it('knows neighbouring QWERTY keys', () => {
      expect(keysAreAdjacent('s', 'z')).toBe(true);
      expect(keysAreAdjacent('r', 't')).toBe(true);
      expect(keysAreAdjacent('o', 'i')).toBe(true);
      expect(keysAreAdjacent('q', 'w')).toBe(true);
    });

    it('knows keys that are far apart', () => {
      expect(keysAreAdjacent('h', 'm')).toBe(false);
      expect(keysAreAdjacent('c', 'g')).toBe(false);
      expect(keysAreAdjacent('n', 'l')).toBe(false);
      expect(keysAreAdjacent('a', 'u')).toBe(false);
    });

    it('knows neighbouring Russian keys and never mixes layouts', () => {
      expect(keysAreAdjacent('о', 'л')).toBe(true);
      expect(keysAreAdjacent('к', 'у')).toBe(true);
      expect(keysAreAdjacent('й', 'ъ')).toBe(false);
      expect(keysAreAdjacent('a', 'ф')).toBe(false);
    });

    it('treats the same key and unknown characters as not adjacent', () => {
      expect(keysAreAdjacent('a', 'a')).toBe(false);
      expect(keysAreAdjacent('1', '2')).toBe(false);
    });

    it('is case-insensitive', () => {
      expect(keysAreAdjacent('S', 'z')).toBe(true);
    });
  });

  describe('isPlausibleTypo - whole answers', () => {
    it.each([
      ['house', 'mouse'],
      ['cat', 'cut'],
      ['cat', 'car'],
      ['cold', 'gold'],
      ['night', 'light'],
      ['dog', 'dig'],
      ['dog', 'dogs'],
      ['cat', 'ca'],
      ['pan', 'pen'],
    ])('rejects %s typed as %s (a different word)', (target, typed) => {
      expect(isPlausibleTypo(typed, target)).toBe(false);
    });

    it.each([
      ['house', 'houze'], // s next to z
      ['house', 'hose'], // missing letter
      ['house', 'housee'], // extra letter
      ['house', 'huose'], // swapped neighbours
      ['water', 'watr'], // missing letter
      ['water', 'watwr'], // e next to w
      ['beautiful', 'beutifal'], // two slips in a long word
      ['restaurant', 'restarant'],
    ])('accepts %s typed as %s (a slip)', (target, typed) => {
      expect(isPlausibleTypo(typed, target)).toBe(true);
    });

    it('requires exact text for words of four letters or fewer', () => {
      expect(isPlausibleTypo('wate', 'wate')).toBe(true);
      expect(isPlausibleTypo('hous', 'house')).toBe(true);
      expect(isPlausibleTypo('gat', 'cat')).toBe(false);
      expect(isPlausibleTypo('cta', 'cat')).toBe(false);
    });

    it('accepts an accent slip in a longer word', () => {
      expect(isPlausibleTypo('cafe au lait', 'café au lait')).toBe(true);
      expect(isPlausibleTypo('manana', 'mañana')).toBe(true);
    });

    it('allows two slips in a long word but not three', () => {
      expect(isPlausibleTypo('bautifol', 'beautiful')).toBe(true);
      expect(isPlausibleTypo('xxxutiful', 'beautiful')).toBe(false);
    });

    it('treats an identical string as correct', () => {
      expect(isPlausibleTypo('ok', 'ok')).toBe(true);
    });
  });

  describe('isPlausibleTypo - Russian', () => {
    it('accepts a neighbouring-key slip but rejects a different word', () => {
      expect(isPlausibleTypo('молоко', 'молоко')).toBe(true);
      expect(isPlausibleTypo('привер', 'привет')).toBe(true); // р next to т
      expect(isPlausibleTypo('дом', 'дым')).toBe(false); // short, different word
      expect(isPlausibleTypo('мама', 'папа')).toBe(false);
    });
  });

  describe('evaluateSmartAnswer', () => {
    it.each([
      ['Mouse', 'House'],
      ['Cut', 'Cat'],
      ['Car', 'Cat'],
      ['Gold', 'Cold'],
      ['Light', 'Night'],
      ['Dig', 'Dog'],
    ])('does not accept %s for %s', (typed, expected) => {
      expect(evaluateSmartAnswer(typed, [expected]).isMatch).toBe(false);
    });

    it.each([
      ['Houze', 'House'],
      ['Hose', 'House'],
      ['Watr', 'Water'],
    ])('still accepts the slip %s for %s and flags it as a typo', (typed, expected) => {
      const result = evaluateSmartAnswer(typed, [expected]);
      expect(result.isMatch).toBe(true);
      expect(result.isTypo).toBe(true);
    });

    it('keeps tolerance inside longer phrases', () => {
      const result = evaluateSmartAnswer('where is the bathrom', ['where is the bathroom']);
      expect(result.isMatch).toBe(true);
    });

    it.each([
      ['I like my cat', 'I like my car'],
      ['I want a car', 'I want a cat'],
      ['I like my banana', 'I like my car'],
      ['good night', 'good morning'],
      ['where is the library', 'where is the bathroom'],
    ])('does not accept "%s" for "%s" (a different word inside a phrase)', (typed, expected) => {
      expect(evaluateSmartAnswer(typed, [expected]).isMatch).toBe(false);
    });

    it.each([
      ['we are planing a meeting', 'we are planning a meeting'],
      ['where is the bathrom', 'where is the bathroom'],
      ['i would like a cofee', 'i would like a coffee'],
      ['thank yuo', 'thank you'],
    ])('still accepts slips inside phrases: "%s"', (typed, expected) => {
      const result = evaluateSmartAnswer(typed, [expected]);
      expect(result.isMatch).toBe(true);
      expect(result.isTypo).toBe(true);
    });

    it('still accepts synonyms and dropped small words', () => {
      expect(evaluateSmartAnswer('where is restroom', ['Where is the bathroom']).isMatch).toBe(true);
      expect(evaluateSmartAnswer('plan a meeting', ["let's schedule a meeting"]).isMatch).toBe(true);
    });
  });
});
