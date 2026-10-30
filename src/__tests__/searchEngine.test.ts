import { describe, it, expect } from 'vitest';
import { searchLanguageConcepts, normalizeSearchQuery } from '../utils/searchEngine';
import germanData from '../data/languages/de/germanData';
import frenchData from '../data/languages/fr/frenchData';

describe('Smart Concept Search Engine', () => {
  it('normalizes queries removing accents, diacritics, and punctuation', () => {
    expect(normalizeSearchQuery('Café!')).toBe('cafe');
    expect(normalizeSearchQuery('Über-cool')).toBe('uber cool');
    expect(normalizeSearchQuery('  «Planen wir ein Meeting?»  ')).toBe('planen wir ein meeting');
  });

  it('returns empty results for empty queries', () => {
    const results = searchLanguageConcepts('', germanData, 'de', 'en');
    expect(results.totalCount).toBe(0);
    expect(results.words).toHaveLength(0);
    expect(results.phrases).toHaveLength(0);
    expect(results.grammar).toHaveLength(0);
  });

  it('searches German concepts for "meeting" finding both word and related phrase', () => {
    const results = searchLanguageConcepts('meeting', germanData, 'de', 'en');
    expect(results.totalCount).toBeGreaterThan(0);

    // Should find phrase "Planen wir ein Meeting"
    const matchingPhrase = results.phrases.find(p => p.title.toLowerCase().includes('planen wir ein meeting'));
    expect(matchingPhrase).toBeDefined();
    expect(matchingPhrase?.section).toBe('phrases');
    expect(matchingPhrase?.matchReason).toContain('phrase');

    // Should also find verb "planen" in grammar!
    const matchingVerb = results.grammar.find(g => g.title === 'planen');
    expect(matchingVerb).toBeDefined();
    expect(matchingVerb?.section).toBe('alphabet');
    expect(matchingVerb?.grammarTab).toBe('verbs');
  });

  it('searches bilingual meanings in English returning German target words', () => {
    const results = searchLanguageConcepts('coffee', germanData, 'de', 'en');
    const coffeeWord = results.words.find(w => w.title.toLowerCase().includes('kaffee') || w.translation.toLowerCase().includes('coffee'));
    expect(coffeeWord).toBeDefined();
    expect(coffeeWord?.section).toBe('words');
  });

  it('searches French concepts for "merci" finding politeness phrases and meanings', () => {
    const results = searchLanguageConcepts('merci', frenchData, 'fr', 'en');
    expect(results.totalCount).toBeGreaterThan(0);

    const match = results.phrases.find(p => p.title.toLowerCase().includes('merci') || p.translation.toLowerCase().includes('thank you'));
    expect(match).toBeDefined();
    expect(match?.section).toBe('phrases');
  });

  it('searches German grammar articles for "der"', () => {
    const results = searchLanguageConcepts('der', germanData, 'de', 'en');
    const derGender = results.grammar.find(g => g.article === 'der');
    expect(derGender).toBeDefined();
    expect(derGender?.grammarTab).toBe('gender');
  });
});
