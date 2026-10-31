/**
 * Script-aware canonicalization used before comparing what a learner typed with the stored answer.
 *
 * Different keyboards produce different but equivalent characters for the same letter, and the stored
 * curriculum text includes punctuation and diacritics a learner will not type. This function removes
 * those differences so only real spelling mistakes count as wrong.
 */

// Devanagari and Bengali letters with a dot below (nukta) exist as one "precomposed" character or as
// letter + nukta. Keyboards differ, so both are reduced to letter + nukta.
const PRECOMPOSED_NUKTA: Record<string, string> = {
  '\u0958': '\u0915\u093C', // क़
  '\u0959': '\u0916\u093C', // ख़
  '\u095A': '\u0917\u093C', // ग़
  '\u095B': '\u091C\u093C', // ज़
  '\u095C': '\u0921\u093C', // ड़
  '\u095D': '\u0922\u093C', // ढ़
  '\u095E': '\u092B\u093C', // फ़
  '\u095F': '\u092F\u093C', // य़
  '\u09DC': '\u09A1\u09BC', // ড়
  '\u09DD': '\u09A2\u09BC', // ঢ়
  '\u09DF': '\u09AF\u09BC', // য়
};

// Letters that Arabic, Persian and Urdu keyboards type with different code points
const ARABIC_SCRIPT_FOLD: Record<string, string> = {
  '\u064A': '\u06CC', // Arabic yeh ي → Persian/Urdu yeh ی
  '\u0643': '\u06A9', // Arabic kaf ك → Persian/Urdu kaf ک
  '\u0647': '\u06C1', // Arabic heh ه → Urdu heh goal ہ
  '\u0623': '\u0627', // أ → ا (hamza is routinely left off when typing)
  '\u0625': '\u0627', // إ → ا
  '\u0671': '\u0627', // ٱ → ا
};

const ARABIC_MARKS = /[\u064B-\u065F\u0670\u0640]/g; // short-vowel marks and tatweel
const WIDE_ASCII = /[\uFF01-\uFF5E]/g;
// Punctuation from non-Latin scripts, CJK, and Spanish that a learner will not necessarily type
const EXTRA_PUNCTUATION = /[\u3001\u3002\u300C-\u300F\u30FB\u061F\u060C\u061B\u06D4\u0964\u0965\u2026\u00BF\u00A1\u00AB\u00BB\u201C\u201D\u2018\u2019\uFF01\uFF1F\uFF0C\uFF0E\uFF1A\uFF1B]/g;

export const canonicalizeScript = (text: string): string => {
  let s = text.normalize('NFC');
  s = s.replace(/\u3000/g, ' ').replace(EXTRA_PUNCTUATION, '');
  s = s.replace(WIDE_ASCII, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
  s = s.replace(/[\u0958-\u095F\u09DC\u09DD\u09DF]/g, (c) => PRECOMPOSED_NUKTA[c] ?? c);
  s = s.replace(ARABIC_MARKS, '').replace(/[\u064A\u0643\u0647\u0623\u0625\u0671]/g, (c) => ARABIC_SCRIPT_FOLD[c] ?? c);
  return s.replace(/\s+/g, ' ').trim();
};

