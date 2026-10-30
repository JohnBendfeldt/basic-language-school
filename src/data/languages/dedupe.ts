import { AppData, PhraseItem } from '../../types';

const targetOf = (p: PhraseItem): string => (p.phrase ?? p.russian ?? p.target ?? '').trim().toLowerCase();
const meaningOf = (p: PhraseItem): string => (p.translation ?? p.meaning ?? p.english ?? '').trim().toLowerCase();

/**
 * Removes exact duplicate rows (same target text AND same meaning) while keeping the first occurrence.
 * Rows that share a target text but differ in meaning (true homographs such as 月 "moon" / "month")
 * are intentionally preserved.
 */
export const dedupeExactPhrases = (list: PhraseItem[] | undefined): PhraseItem[] => {
  if (!list) return [];
  const seen = new Set<string>();
  return list.filter((p) => {
    const key = `${targetOf(p)}||${meaningOf(p)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const dedupeAppData = (data: AppData): AppData => ({
  ...data,
  basicPhrases: dedupeExactPhrases(data.basicPhrases),
  commonWords: dedupeExactPhrases(data.commonWords),
  numbers: dedupeExactPhrases(data.numbers),
  time: data.time ? dedupeExactPhrases(data.time) : data.time,
});

