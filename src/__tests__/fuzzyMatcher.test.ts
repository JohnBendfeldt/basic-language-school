import { describe, it, expect } from 'vitest';
import {
  evaluateSmartAnswer,
  normalizeEnglishPhrase,
  levenshteinDistance,
  stripArticles
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
