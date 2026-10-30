import { PhraseItem } from '../types';
import { levenshteinDistance } from './fuzzyMatcher';

export interface HomographInfo {
  /** Every distinct meaning that should be accepted as a correct answer for the target text. */
  acceptedMeanings: string[];
  /** Meanings that are genuinely different senses (near-synonyms like "Fruit"/"Fruits" are merged). */
  distinctSenses: string[];
}

const targetOf = (p: PhraseItem): string => (p.russian || p.phrase || p.target || '').toString().trim().toLowerCase();

const norm = (s: string): string => s.toLowerCase().replace(/\s+/g, ' ').trim();

/** True when two meanings are the same sense with different wording ("Fruit" / "Fruits", "Internet" / "Web / Internet"). */
export const areSameSense = (a: string, b: string): boolean => {
  const x = norm(a);
  const y = norm(b);
  if (!x || !y) return true;
  if (x === y) return true;
  if (x.includes(y) || y.includes(x)) return true;
  const partsX = x.split('/').map((s) => s.trim());
  const partsY = y.split('/').map((s) => s.trim());
  if (partsX.some((p) => partsY.includes(p))) return true;
  // Tiny edit distance only counts as "same sense" for plural/spelling variants of longer words,
  // never for short distinct words such as Cat / Car
  const distance = levenshteinDistance(x, y);
  const shortest = Math.min(x.length, y.length);
  return (distance <= 1 && shortest >= 5) || (distance <= 2 && shortest >= 8);
};

/**
 * Indexes meanings by target text so that words spelled identically but meaning different things
 * (e.g. 月 = "Moon" and "Month", 눈 = "Snow" and "Eye") accept every meaning as a correct answer.
 *
 * @param items    every phrase/word row of a language (all categories)
 * @param resolve  returns the row's meaning in the learner's base language
 */
export const buildHomographIndex = (
  items: PhraseItem[],
  resolve: (item: PhraseItem) => string
): Map<string, HomographInfo> => {
  const grouped = new Map<string, string[]>();
  for (const item of items) {
    const key = targetOf(item);
    if (!key) continue;
    const meaning = resolve(item)?.toString().trim();
    if (!meaning) continue;
    const list = grouped.get(key) ?? [];
    if (!list.some((m) => norm(m) === norm(meaning))) list.push(meaning);
    grouped.set(key, list);
  }

  const index = new Map<string, HomographInfo>();
  grouped.forEach((meanings, key) => {
    if (meanings.length < 2) return;
    const senses: string[] = [];
    for (const m of meanings) {
      if (!senses.some((s) => areSameSense(s, m))) senses.push(m);
    }
    index.set(key, { acceptedMeanings: meanings, distinctSenses: senses });
  });
  return index;
};

export const lookupHomograph = (
  index: Map<string, HomographInfo>,
  targetText: string
): HomographInfo | undefined => index.get(targetText.toString().trim().toLowerCase());
