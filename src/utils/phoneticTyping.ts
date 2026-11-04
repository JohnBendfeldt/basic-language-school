import { SupportedLanguageId } from '../data/languages/types';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { transliterate } from './transliteration';

export type PhoneticScriptLang = 'ru' | 'ar' | 'ur' | 'hi' | 'bn' | 'ja' | 'ko' | 'zh';

export const PHONETIC_SCRIPT_LANGUAGES = new Set<SupportedLanguageId>([
  'ru', 'ar', 'ur', 'hi', 'bn', 'ja', 'ko', 'zh'
]);

export const isPhoneticScriptLanguage = (lang: SupportedLanguageId): lang is PhoneticScriptLang =>
  PHONETIC_SCRIPT_LANGUAGES.has(lang);

export const containsTargetScript = (text: string, lang: SupportedLanguageId): boolean => {
  if (!text) return false;
  switch (lang) {
    case 'ru':
      return /[\u0400-\u04FF]/.test(text);
    case 'ar':
    case 'ur':
      return /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
    case 'hi':
      return /[\u0900-\u097F]/.test(text);
    case 'bn':
      return /[\u0980-\u09FF]/.test(text);
    case 'ja':
      return /[\u3040-\u30FF\u4E00-\u9FFF]/.test(text);
    case 'ko':
      return /[\uAC00-\uD7AF\u3130-\u318F\u1100-\u11FF]/.test(text);
    case 'zh':
      return /[\u4E00-\u9FFF]/.test(text);
    default:
      return false;
  }
};

// ============================================================================
// 1. KOREAN HANGUL SYLLABLE BLOCK COMPOSER & ROMAJA CONVERTER
// ============================================================================

const KO_LEADS = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const KO_VOWELS = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const KO_TAILS = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

const KO_COMPOUND_VOWELS: Record<string, string> = {
  'ㅗㅏ': 'ㅘ', 'ㅗㅐ': 'ㅙ', 'ㅗㅣ': 'ㅚ',
  'ㅜㅓ': 'ㅝ', 'ㅜㅔ': 'ㅞ', 'ㅜㅣ': 'ㅟ',
  'ㅡㅣ': 'ㅢ'
};

const KO_COMPOUND_TAILS: Record<string, string> = {
  'ㄱㅅ': 'ㄳ', 'ㄴㅈ': 'ㄵ', 'ㄴㅎ': 'ㄶ',
  'ㄹㄱ': 'ㄺ', 'ㄹㅁ': 'ㄻ', 'ㄹㅂ': 'ㄼ', 'ㄹㅅ': 'ㄽ', 'ㄹㅌ': 'ㄾ', 'ㄹㅍ': 'ㄿ', 'ㄹㅎ': 'ㅀ',
  'ㅂㅅ': 'ㅄ'
};

const KO_SPLIT_TAILS: Record<string, [string, string]> = Object.fromEntries(
  Object.entries(KO_COMPOUND_TAILS).map(([pair, combined]) => [combined, [pair[0], pair[1]]])
);

const composeSyllable = (leadIdx: number, vowelIdx: number, tailIdx = 0): string =>
  String.fromCharCode(0xAC00 + (leadIdx * 21 + vowelIdx) * 28 + tailIdx);

const decomposeSyllable = (ch: string): { leadIdx: number; vowelIdx: number; tailIdx: number } | null => {
  const code = ch.charCodeAt(0) - 0xAC00;
  if (code < 0 || code >= 11172) return null;
  const tailIdx = code % 28;
  const vowelIdx = ((code - tailIdx) / 28) % 21;
  const leadIdx = Math.floor((code - tailIdx) / 28 / 21);
  return { leadIdx, vowelIdx, tailIdx };
};

/**
 * Appends a single Hangul jamo to existing text, composing natural Korean syllable blocks
 * (e.g. 'ㅎ' + 'ㅏ' -> '하', '하' + 'ㄴ' -> '한', '한' + 'ㅏ' -> '하나').
 */
export const appendKoreanJamo = (existingText: string, jamo: string): string => {
  if (!existingText) return jamo;
  const isVowel = KO_VOWELS.includes(jamo);
  const isConsonant = KO_LEADS.includes(jamo);
  if (!isVowel && !isConsonant) return existingText + jamo;

  const lastChar = existingText.slice(-1);
  const prefix = existingText.slice(0, -1);

  // Case A: Previous character is a bare consonant jamo and user enters a vowel -> form CV block
  if (KO_LEADS.includes(lastChar) && isVowel) {
    return prefix + composeSyllable(KO_LEADS.indexOf(lastChar), KO_VOWELS.indexOf(jamo));
  }

  // Case B: Previous character is a bare vowel and user enters a combinable vowel
  if (KO_VOWELS.includes(lastChar) && isVowel && KO_COMPOUND_VOWELS[lastChar + jamo]) {
    return prefix + KO_COMPOUND_VOWELS[lastChar + jamo];
  }

  // Case C: Previous character is a composed Hangul syllable
  const dec = decomposeSyllable(lastChar);
  if (dec) {
    if (isVowel) {
      if (dec.tailIdx === 0) {
        const prevVowel = KO_VOWELS[dec.vowelIdx];
        const combinedVowel = KO_COMPOUND_VOWELS[prevVowel + jamo];
        if (combinedVowel) {
          return prefix + composeSyllable(dec.leadIdx, KO_VOWELS.indexOf(combinedVowel), 0);
        }
      } else {
        const tailChar = KO_TAILS[dec.tailIdx];
        const splitPair = KO_SPLIT_TAILS[tailChar];
        if (splitPair) {
          const remainTailIdx = KO_TAILS.indexOf(splitPair[0]);
          const nextLeadIdx = KO_LEADS.indexOf(splitPair[1]);
          return (
            prefix +
            composeSyllable(dec.leadIdx, dec.vowelIdx, remainTailIdx) +
            composeSyllable(nextLeadIdx, KO_VOWELS.indexOf(jamo), 0)
          );
        }
        const nextLeadIdx = KO_LEADS.indexOf(tailChar);
        if (nextLeadIdx !== -1) {
          return (
            prefix +
            composeSyllable(dec.leadIdx, dec.vowelIdx, 0) +
            composeSyllable(nextLeadIdx, KO_VOWELS.indexOf(jamo), 0)
          );
        }
      }
    } else if (isConsonant) {
      if (dec.tailIdx === 0) {
        const newTailIdx = KO_TAILS.indexOf(jamo);
        if (newTailIdx > 0) {
          return prefix + composeSyllable(dec.leadIdx, dec.vowelIdx, newTailIdx);
        }
      } else {
        const prevTail = KO_TAILS[dec.tailIdx];
        const combinedTail = KO_COMPOUND_TAILS[prevTail + jamo];
        if (combinedTail) {
          return prefix + composeSyllable(dec.leadIdx, dec.vowelIdx, KO_TAILS.indexOf(combinedTail));
        }
      }
    }
  }

  return existingText + jamo;
};

const ROMAJA_VOWEL_TOKENS: Array<[string, string]> = [
  ['yeo', 'ㅕ'], ['yae', 'ㅒ'], ['wae', 'ㅙ'], ['woe', 'ㅙ'], ['wei', 'ㅞ'], ['weo', 'ㅝ'],
  ['ya', 'ㅑ'], ['yo', 'ㅛ'], ['yu', 'ㅠ'], ['ye', 'ㅖ'], ['wa', 'ㅘ'], ['wo', 'ㅝ'],
  ['oe', 'ㅚ'], ['wi', 'ㅟ'], ['ui', 'ㅢ'], ['ae', 'ㅐ'], ['eo', 'ㅓ'], ['eu', 'ㅡ'],
  ['a', 'ㅏ'], ['e', 'ㅔ'], ['i', 'ㅣ'], ['o', 'ㅗ'], ['u', 'ㅜ']
];

const ROMAJA_CONSONANT_TOKENS: Array<[string, string]> = [
  ['kk', 'ㄲ'], ['tt', 'ㄸ'], ['pp', 'ㅃ'], ['ss', 'ㅆ'], ['jj', 'ㅉ'],
  ['ng', 'ㅇ'], ['ch', 'ㅊ'], ['kh', 'ㅋ'], ['th', 'ㅌ'], ['ph', 'ㅍ'],
  ['sh', 'ㅅ'],
  ['g', 'ㄱ'], ['k', 'ㅋ'], ['n', 'ㄴ'], ['d', 'ㄷ'], ['t', 'ㅌ'],
  ['r', 'ㄹ'], ['l', 'ㄹ'], ['m', 'ㅁ'], ['b', 'ㅂ'], ['p', 'ㅍ'],
  ['s', 'ㅅ'], ['j', 'ㅈ'], ['h', 'ㅎ']
];

export const transliterateKorean = (input: string): string => {
  return input
    .split(/(\s+)/)
    .map(segment => {
      if (!segment || /^\s+$/.test(segment) || !/[a-zA-Z]/.test(segment)) return segment;
      const lower = segment.toLowerCase();
      let i = 0;
      let result = '';
      while (i < lower.length) {
        let matched = false;
        // Special handling for 'ng' before vowel vs syllable-final 'ng'
        if (lower.startsWith('ng', i)) {
          const afterNg = lower.slice(i + 2);
          const followedByVowel = ROMAJA_VOWEL_TOKENS.some(([v]) => afterNg.startsWith(v));
          if (!followedByVowel) {
            result = appendKoreanJamo(result, 'ㅇ');
            i += 2;
            continue;
          }
        }
        // Check vowel tokens
        for (const [rom, jamo] of ROMAJA_VOWEL_TOKENS) {
          if (lower.startsWith(rom, i)) {
            const last = result.slice(-1);
            const dec = last ? decomposeSyllable(last) : null;
            // If vowel starts a word or follows a completed syllable (or vowel), insert silent initial ㅇ
            const needsSilentIeung =
              !last ||
              KO_VOWELS.includes(last) ||
              (dec !== null && dec.tailIdx === 0 && !KO_COMPOUND_VOWELS[KO_VOWELS[dec.vowelIdx] + jamo]);
            if (needsSilentIeung) {
              result = appendKoreanJamo(result, 'ㅇ');
            }
            result = appendKoreanJamo(result, jamo);
            i += rom.length;
            matched = true;
            break;
          }
        }
        if (matched) continue;

        // Check consonant tokens (treat word-initial k/t/p gently: k->ㄱ only if explicitly g, else standard)
        for (const [rom, jamo] of ROMAJA_CONSONANT_TOKENS) {
          if (lower.startsWith(rom, i)) {
            // Double 'nn' or 'll' in romaja (e.g. annyeong -> 안녕)
            result = appendKoreanJamo(result, jamo);
            i += rom.length;
            matched = true;
            break;
          }
        }
        if (!matched) {
          result += segment[i];
          i += 1;
        }
      }
      return result;
    })
    .join('');
};

// ============================================================================
// 2. JAPANESE ROMAJI -> HIRAGANA CONVERTER
// ============================================================================

const ROMAJI_TO_HIRAGANA: Array<[string, string]> = [
  ['kya', 'きゃ'], ['kyu', 'きゅ'], ['kyo', 'きょ'],
  ['sha', 'しゃ'], ['shu', 'しゅ'], ['sho', 'しょ'], ['sya', 'しゃ'], ['syu', 'しゅ'], ['syo', 'しょ'],
  ['cha', 'ちゃ'], ['chu', 'ちゅ'], ['cho', 'ちょ'], ['tya', 'ちゃ'], ['tyu', 'ちゅ'], ['tyo', 'ちょ'],
  ['nya', 'にゃ'], ['nyu', 'にゅ'], ['nyo', 'にょ'],
  ['hya', 'ひゃ'], ['hyu', 'ひゅ'], ['hyo', 'ひょ'],
  ['mya', 'みゃ'], ['myu', 'みゅ'], ['myo', 'みょ'],
  ['rya', 'りゃ'], ['ryu', 'りゅ'], ['ryo', 'りょ'],
  ['gya', 'ぎゃ'], ['gyu', 'ぎゅ'], ['gyo', 'ぎょ'],
  ['ja', 'じゃ'], ['ju', 'じゅ'], ['jo', 'じょ'], ['jya', 'じゃ'], ['jyu', 'じゅ'], ['jyo', 'じょ'],
  ['bya', 'びゃ'], ['byu', 'びゅ'], ['byo', 'びょ'],
  ['pya', 'ぴゃ'], ['pyu', 'ぴゅ'], ['pyo', 'ぴょ'],
  ['shi', 'し'], ['chi', 'ち'], ['tsu', 'つ'],
  ['ka', 'か'], ['ki', 'き'], ['ku', 'く'], ['ke', 'け'], ['ko', 'こ'],
  ['sa', 'さ'], ['si', 'し'], ['su', 'す'], ['se', 'せ'], ['so', 'そ'],
  ['ta', 'た'], ['ti', 'ち'], ['tu', 'つ'], ['te', 'て'], ['to', 'と'],
  ['na', 'な'], ['ni', 'に'], ['nu', 'ぬ'], ['ne', 'ね'], ['no', 'の'],
  ['ha', 'は'], ['hi', 'ひ'], ['fu', 'ふ'], ['hu', 'ふ'], ['he', 'へ'], ['ho', 'ほ'],
  ['ma', 'ま'], ['mi', 'み'], ['mu', 'む'], ['me', 'め'], ['mo', 'も'],
  ['ya', 'や'], ['yu', 'ゆ'], ['yo', 'よ'],
  ['ra', 'ら'], ['ri', 'り'], ['ru', 'る'], ['re', 'れ'], ['ro', 'ろ'],
  ['wa', 'わ'], ['wo', 'を'],
  ['ga', 'が'], ['gi', 'ぎ'], ['gu', 'ぐ'], ['ge', 'げ'], ['go', 'ご'],
  ['za', 'ざ'], ['ji', 'じ'], ['zi', 'じ'], ['zu', 'ず'], ['ze', 'ぜ'], ['zo', 'ぞ'],
  ['da', 'だ'], ['di', 'ぢ'], ['du', 'づ'], ['de', 'で'], ['do', 'ど'],
  ['ba', 'ば'], ['bi', 'び'], ['bu', 'ぶ'], ['be', 'べ'], ['bo', 'ぼ'],
  ['pa', 'ぱ'], ['pi', 'ぴ'], ['pu', 'ぷ'], ['pe', 'ぺ'], ['po', 'ぽ'],
  ['a', 'あ'], ['i', 'い'], ['u', 'う'], ['e', 'え'], ['o', 'お']
];

export const transliterateJapanese = (input: string): string => {
  return input
    .split(/(\s+)/)
    .map(word => {
      if (!word || /^\s+$/.test(word)) return word;
      const cleanLower = word.toLowerCase();
      const exactJa: Record<string, string> = {
        konnichiwa: 'こんにちは',
        konbanwa: 'こんばんは',
        arigatou: 'ありがとう',
        ohayou: 'おはよう',
        sayounara: 'さようなら',
        sumimasen: 'すみません'
      };
      if (exactJa[cleanLower]) return exactJa[cleanLower];

      const lower = cleanLower;
      let i = 0;
      let out = '';
      while (i < lower.length) {
        if (lower.startsWith('nn', i)) {
          const afterNn = lower[i + 2] || '';
          out += 'ん';
          // In words like "kanna" / "onna", first 'n' is ん and second 'n' forms 'na' (な)
          i += /[aiueoy]/.test(afterNn) ? 1 : 2;
          continue;
        }
        if (lower[i] === 'n') {
          const next = lower[i + 1] || '';
          if (!next || !/[aiueoy]/.test(next)) {
            out += 'ん';
            i += 1;
            continue;
          }
        }
        // Geminate consonant (sokuon っ), e.g. kk, tt, pp, ss, tch, cch
        if (lower.startsWith('tch', i)) {
          out += 'っ';
          i += 1;
          continue;
        }
        if (
          i + 1 < lower.length &&
          lower[i] === lower[i + 1] &&
          /[bcdfghjklmpqrstvwxyz]/.test(lower[i]) &&
          lower[i] !== 'n'
        ) {
          out += 'っ';
          i += 1;
          continue;
        }

        let matched = false;
        for (const [rom, kana] of ROMAJI_TO_HIRAGANA) {
          if (lower.startsWith(rom, i)) {
            out += kana;
            i += rom.length;
            matched = true;
            break;
          }
        }
        if (!matched) {
          out += lower[i] === '-' ? 'ー' : word[i];
          i += 1;
        }
      }
      return out;
    })
    .join('');
};

// ============================================================================
// 3. ARABIC & URDU PHONETIC CONVERTERS
// ============================================================================

export const transliterateArabic = (input: string): string => {
  return input
    .split(/(\s+)/)
    .map(word => {
      if (!word || /^\s+$/.test(word) || !/[a-zA-Z2356789']/.test(word)) return word;
      let w = word;
      // Common Arabic greeting/word shortcuts
      const lower = w.toLowerCase().replace(/[-']/g, '');
      const exactArabicWords: Record<string, string> = {
        marhaban: 'مرحبا', marhaba: 'مرحبا', shukran: 'شكرا', naam: 'نعم', la: 'لا',
        afwan: 'عفوا', minfadlik: 'من فضلك', kayfahaluk: 'كيف حالك', maasalamah: 'مع السلامة',
        sabahalkhayr: 'صباح الخير', masaalkhayr: 'مساء الخير', ahlan: 'أهلا',
        kitab: 'كتاب', maa: 'ماء', bayt: 'بيت', madrasah: 'مدرسة', madrasa: 'مدرسة'
      };
      if (exactArabicWords[lower]) return exactArabicWords[lower];

      let out = '';
      let i = 0;
      while (i < w.length) {
        const rem = w.slice(i);
        const remLower = rem.toLowerCase();
        if (remLower === 'ah' || remLower === 'at') {
          out += 'ة';
          break;
        }
        const multi: Array<[string, string]> = [
          ['al-', 'ال'], ['sh', 'ش'], ['kh', 'خ'], ['gh', 'غ'], ['th', 'ث'], ['dh', 'ذ'],
          ['ch', 'تش'], ['aa', 'ا'], ['ee', 'ي'], ['ii', 'ي'], ['oo', 'و'], ['uu', 'و']
        ];
        let hit = false;
        for (const [k, v] of multi) {
          if (remLower.startsWith(k)) {
            out += v;
            i += k.length;
            hit = true;
            break;
          }
        }
        if (hit) continue;

        const ch = w[i];
        const single: Record<string, string> = {
          '2': 'ء', '3': 'ع', '5': 'خ', '6': 'ط', '7': 'ح', '8': 'غ', '9': 'ص',
          "'": 'ء',
          A: 'أ', I: 'إ', T: 'ط', D: 'ض', S: 'ص', Z: 'ظ', H: 'ح',
          a: i === 0 ? 'ا' : '',
          e: i === 0 ? 'ا' : '',
          i: i === 0 ? 'إ' : '',
          o: 'و', u: i === 0 ? 'أ' : 'و',
          b: 'ب', p: 'ب', t: 'ت', j: 'ج', d: 'د', r: 'ر', z: 'ز', s: 'س',
          f: 'ف', v: 'ف', q: 'ق', k: 'ك', c: 'ك', g: 'غ', l: 'ل', m: 'م',
          n: 'ن', h: 'ه', w: 'و', y: 'ي', x: 'خ'
        };
        out += ch in single ? single[ch] : (ch.toLowerCase() in single ? single[ch.toLowerCase()] : ch);
        i += 1;
      }
      return out || word;
    })
    .join('');
};

export const transliterateUrdu = (input: string): string => {
  return input
    .split(/(\s+)/)
    .map(word => {
      if (!word || /^\s+$/.test(word) || !/[a-zA-Z']/.test(word)) return word;
      const lower = word.toLowerCase().replace(/[-']/g, '');
      const exactUrduWords: Record<string, string> = {
        shukriya: 'شکریہ', assalamualaikum: 'السلام علیکم', salam: 'سلام',
        haan: 'ہاں', ji: 'جی', nahin: 'نہیں', nahi: 'نہیں', paani: 'پانی', pani: 'پانی',
        kitab: 'کتاب', kitaab: 'کتاب', ghar: 'گھر', dost: 'دوست', chai: 'چائے', chaye: 'چائے',
        seb: 'سیب', billi: 'بلی', kutta: 'کتا', acha: 'اچھا', theek: 'ٹھیک'
      };
      if (exactUrduWords[lower]) return exactUrduWords[lower];

      let out = '';
      let i = 0;
      while (i < word.length) {
        const rem = word.slice(i);
        const remLower = rem.toLowerCase();
        if (i > 0 && (remLower === 'ay' || remLower === 'ai' || remLower === 'e')) {
          out += 'ے';
          break;
        }
        if (i === 0 && remLower.startsWith('aa')) {
          out += 'آ';
          i += 2;
          continue;
        }
        const multi: Array<[string, string]> = [
          ['kh', 'خ'], ['gh', 'غ'], ['sh', 'ش'], ['ch', 'چ'], ['zh', 'ژ'],
          ['ph', 'پھ'], ['bh', 'بھ'], ['th', word[i] === 'T' ? 'ٹھ' : 'تھ'],
          ['dh', word[i] === 'D' ? 'ڈھ' : 'دھ'],
          ['aa', 'ا'], ['ee', 'ی'], ['ii', 'ی'], ['oo', 'و'], ['uu', 'و']
        ];
        let hit = false;
        for (const [k, v] of multi) {
          if (remLower.startsWith(k)) {
            out += v;
            i += k.length;
            hit = true;
            break;
          }
        }
        if (hit) continue;

        const ch = word[i];
        const single: Record<string, string> = {
          "'": 'ء',
          T: 'ٹ', D: 'ڈ', R: 'ڑ', N: 'ں', H: 'ھ', S: 'ص', Z: 'ض',
          a: i === 0 ? 'ا' : '',
          i: i === 0 ? 'ا' : 'ی',
          u: i === 0 ? 'ا' : 'و',
          o: 'و',
          b: 'ب', p: 'پ', t: 'ت', j: 'ج', c: 'چ', d: 'د', r: 'ر', z: 'ز',
          s: 'س', x: 'ش', f: 'ف', q: 'ق', k: 'ک', g: 'گ', l: 'ل', m: 'م',
          n: 'ن', w: 'و', v: 'و', h: 'ہ', y: 'ی'
        };
        out += ch in single ? single[ch] : (ch.toLowerCase() in single ? single[ch.toLowerCase()] : ch);
        i += 1;
      }
      return out || word;
    })
    .join('');
};

// ============================================================================
// 4. HINDI (DEVANAGARI) & BENGALI PHONETIC CONVERTERS
// ============================================================================

const HI_CONSONANTS: Array<[string, string]> = [
  ['ksh', 'क्ष'], ['gy', 'ज्ञ'], ['shr', 'श्र'], ['chh', 'छ'],
  ['kh', 'ख'], ['gh', 'घ'], ['ch', 'च'], ['jh', 'झ'],
  ['Th', 'ठ'], ['Dh', 'ढ'], ['th', 'थ'], ['dh', 'ध'],
  ['ph', 'फ'], ['bh', 'भ'], ['sh', 'श'], ['Sh', 'ष'],
  ['T', 'ट'], ['D', 'ड'], ['N', 'ण'], ['R', 'ड़'],
  ['k', 'क'], ['g', 'ग'], ['j', 'ज'], ['t', 'त'], ['d', 'द'],
  ['n', 'न'], ['p', 'प'], ['f', 'फ'], ['b', 'ब'], ['m', 'म'],
  ['y', 'य'], ['r', 'र'], ['l', 'ल'], ['v', 'व'], ['w', 'व'],
  ['s', 'स'], ['h', 'ह'], ['z', 'ज़'], ['q', 'क़']
];

const HI_VOWELS: Array<[string, string, string]> = [
  ['ai', 'ऐ', 'ै'], ['au', 'औ', 'ौ'], ['aa', 'आ', 'ा'],
  ['ee', 'ई', 'ी'], ['ii', 'ई', 'ी'], ['oo', 'ऊ', 'ू'], ['uu', 'ऊ', 'ू'],
  ['ri', 'ऋ', 'ृ'],
  ['a', 'अ', ''], ['i', 'इ', 'ि'], ['u', 'उ', 'ु'],
  ['e', 'ए', 'े'], ['o', 'ओ', 'ो']
];

export const transliterateHindi = (input: string): string => {
  return input
    .split(/(\s+)/)
    .map(word => {
      if (!word || /^\s+$/.test(word) || !/[a-zA-Z]/.test(word)) return word;
      const lower = word.toLowerCase();
      const exactHindi: Record<string, string> = {
        namaste: 'नमस्ते', dhanyavad: 'धन्यवाद', dhanyavaad: 'धन्यवाद', shukriya: 'शुक्रिया',
        haan: 'हाँ', nahin: 'नहीं', nahi: 'नहीं', kripaya: 'कृपया', paani: 'पानी', pani: 'पानी'
      };
      if (exactHindi[lower]) return exactHindi[lower];

      let out = '';
      let i = 0;
      let prevWasConsonant = false;
      while (i < word.length) {
        const rem = word.slice(i);
        const remLower = rem.toLowerCase();

        let vHit = false;
        for (const [rom, indep, matra] of HI_VOWELS) {
          if (remLower.startsWith(rom)) {
            out += prevWasConsonant ? matra : indep;
            prevWasConsonant = false;
            i += rom.length;
            vHit = true;
            break;
          }
        }
        if (vHit) continue;

        let cHit = false;
        for (const [rom, dev] of HI_CONSONANTS) {
          const slice = rem.slice(0, rom.length);
          if (slice === rom || (rom === rom.toLowerCase() && slice.toLowerCase() === rom)) {
            if (prevWasConsonant) {
              out += '्';
            }
            out += dev;
            prevWasConsonant = true;
            i += rom.length;
            cHit = true;
            break;
          }
        }
        if (!cHit) {
          out += word[i];
          prevWasConsonant = false;
          i += 1;
        }
      }
      return out;
    })
    .join('');
};

const BN_CONSONANTS: Array<[string, string]> = [
  ['ksh', 'ক্ষ'], ['chh', 'ছ'], ['ng', 'ং'],
  ['kh', 'খ'], ['gh', 'ঘ'], ['ch', 'চ'], ['jh', 'ঝ'],
  ['Th', 'ঠ'], ['Dh', 'ঢ'], ['th', 'থ'], ['dh', 'ধ'],
  ['ph', 'ফ'], ['bh', 'ভ'], ['sh', 'শ'], ['Sh', 'ষ'],
  ['T', 'ট'], ['D', 'ড'], ['N', 'ণ'], ['R', 'ড়'],
  ['k', 'ক'], ['g', 'গ'], ['j', 'জ'], ['z', 'জ'], ['t', 'ত'], ['d', 'দ'],
  ['n', 'ন'], ['p', 'প'], ['f', 'ফ'], ['b', 'ব'], ['m', 'ম'],
  ['y', 'য়'], ['r', 'র'], ['l', 'ল'], ['v', 'ভ'], ['w', 'ওয়'],
  ['s', 'স'], ['h', 'হ']
];

const BN_VOWELS: Array<[string, string, string]> = [
  ['oi', 'ঐ', 'ৈ'], ['ou', 'ঔ', 'ৌ'], ['aa', 'আ', 'া'],
  ['ee', 'ঈ', 'ী'], ['ii', 'ঈ', 'ী'], ['oo', 'ঊ', 'ূ'], ['uu', 'ঊ', 'ূ'],
  ['ri', 'ঋ', 'ৃ'],
  ['a', 'আ', 'া'], ['o', 'অ', ''], ['O', 'ও', 'ো'],
  ['i', 'ই', 'ি'], ['u', 'উ', 'ু'], ['e', 'এ', 'ে']
];

export const transliterateBengali = (input: string): string => {
  return input
    .split(/(\s+)/)
    .map(word => {
      if (!word || /^\s+$/.test(word) || !/[a-zA-Z]/.test(word)) return word;
      const lower = word.toLowerCase();
      const exactBengali: Record<string, string> = {
        nomoshkar: 'নমস্কার', namaskar: 'নমস্কার', dhonnobad: 'ধন্যবাদ', dhanyabad: 'ধন্যবাদ',
        hya: 'হ্যাঁ', haan: 'হ্যাঁ', na: 'না', bhalo: 'ভালো', jol: 'জল', pani: 'পানি',
        ami: 'আমি', tumi: 'তুমি', boi: 'বই', ghor: 'ঘর'
      };
      if (exactBengali[lower]) return exactBengali[lower];

      let out = '';
      let i = 0;
      let prevWasConsonant = false;
      while (i < word.length) {
        const rem = word.slice(i);
        const remLower = rem.toLowerCase();

        let vHit = false;
        for (const [rom, indep, matra] of BN_VOWELS) {
          const slice = rem.slice(0, rom.length);
          if (slice === rom || (rom === rom.toLowerCase() && remLower.startsWith(rom))) {
            // Word-final 'o' after consonant in Bengali often represents ও-কার (e.g. bhalo -> ভালো)
            if (rom === 'o' && prevWasConsonant && i === word.length - 1) {
              out += 'ো';
            } else {
              out += prevWasConsonant ? matra : indep;
            }
            prevWasConsonant = false;
            i += rom.length;
            vHit = true;
            break;
          }
        }
        if (vHit) continue;

        let cHit = false;
        for (const [rom, ben] of BN_CONSONANTS) {
          const slice = rem.slice(0, rom.length);
          if (slice === rom || (rom === rom.toLowerCase() && slice.toLowerCase() === rom)) {
            if (rom === 'ng') {
              out += ben;
              prevWasConsonant = false;
            } else {
              if (prevWasConsonant) out += '্';
              out += ben;
              prevWasConsonant = true;
            }
            i += rom.length;
            cHit = true;
            break;
          }
        }
        if (!cHit) {
          out += word[i];
          prevWasConsonant = false;
          i += 1;
        }
      }
      return out;
    })
    .join('');
};

// ============================================================================
// 5. MANDARIN NUMERIC PINYIN -> TONE-MARKED PINYIN CONVERTER
// ============================================================================

const PINYIN_TONE_VOWELS: Record<string, [string, string, string, string]> = {
  a: ['ā', 'á', 'ǎ', 'à'],
  e: ['ē', 'é', 'ě', 'è'],
  i: ['ī', 'í', 'ǐ', 'ì'],
  o: ['ō', 'ó', 'ǒ', 'ò'],
  u: ['ū', 'ú', 'ǔ', 'ù'],
  v: ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
  ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ']
};

export const convertNumericPinyin = (input: string): string => {
  const normalizedV = input.replace(/u:/gi, 'ü').replace(/nv/gi, 'nü').replace(/lv/gi, 'lü');
  return normalizedV.replace(/([a-zA-ZüÜ]+)([1-5])/g, (_full, syllable: string, toneStr: string) => {
    const tone = Number(toneStr);
    if (tone === 5) return syllable;
    const lower = syllable.toLowerCase();
    let idx = -1;
    if (lower.includes('a')) idx = lower.indexOf('a');
    else if (lower.includes('e')) idx = lower.indexOf('e');
    else if (lower.includes('ou')) idx = lower.indexOf('o');
    else {
      for (let k = lower.length - 1; k >= 0; k--) {
        if ('aiouvü'.includes(lower[k])) {
          idx = k;
          break;
        }
      }
    }
    if (idx === -1) return syllable;
    const ch = lower[idx];
    const table = PINYIN_TONE_VOWELS[ch];
    if (!table) return syllable;
    const marked = table[tone - 1];
    return syllable.slice(0, idx) + marked + syllable.slice(idx + 1);
  });
};

export const stripPinyinTones = (input: string): string =>
  input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ü/gi, 'v')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Unified phonetic converter from Latin keystrokes to target script.
 */
export const transliterateForLanguage = (text: string, lang: SupportedLanguageId): string => {
  if (!text) return text;
  switch (lang) {
    case 'ru':
      return transliterate(text);
    case 'ja':
      return transliterateJapanese(text);
    case 'ko':
      return transliterateKorean(text);
    case 'ar':
      return transliterateArabic(text);
    case 'ur':
      return transliterateUrdu(text);
    case 'hi':
      return transliterateHindi(text);
    case 'bn':
      return transliterateBengali(text);
    case 'zh':
      return convertNumericPinyin(text);
    default:
      return text;
  }
};

export interface PhoneticCheatsheet {
  title: string;
  keyboardTitle: string;
  rules: Array<{ latin: string; script: string }>;
  note: string;
}

export const PHONETIC_CHEATSHEETS: Record<PhoneticScriptLang, PhoneticCheatsheet> = {
  ru: {
    title: '💡 Phonetic Typing Cheatsheet',
    keyboardTitle: 'Full Russian Keyboard',
    rules: [
      { latin: 'ya', script: 'я' }, { latin: 'yu', script: 'ю' },
      { latin: 'yo', script: 'ё' }, { latin: 'ih', script: 'ы' },
      { latin: 'eh', script: 'э' }, { latin: 'zh', script: 'ж' },
      { latin: 'sh', script: 'ш' }, { latin: 'ch', script: 'ч' },
      { latin: 'shch', script: 'щ' }, { latin: 'ts', script: 'ц' },
      { latin: "'", script: 'ь' }, { latin: '"', script: 'ъ' }
    ],
    note: 'Type phonetically in English, then press Space to convert.'
  },
  ar: {
    title: '💡 Arabic Phonetic Typing Guide',
    keyboardTitle: 'Phonetic Arabic Keyboard (العربية)',
    rules: [
      { latin: 'sh', script: 'ش' }, { latin: 'kh', script: 'خ' },
      { latin: 'gh', script: 'غ' }, { latin: 'th', script: 'ث' },
      { latin: 'dh', script: 'ذ' }, { latin: '3 / a', script: 'ع / ا' },
      { latin: '7 / h', script: 'ح / ه' }, { latin: 'q / k', script: 'ق / ك' }
    ],
    note: 'Tap keys on the phonetic keyboard or type phonetically (e.g. shukran → شكرا).'
  },
  ur: {
    title: '💡 Urdu Phonetic Typing Guide',
    keyboardTitle: 'Phonetic Urdu Keyboard (اردو)',
    rules: [
      { latin: 'aa', script: 'آ' }, { latin: 'p / c', script: 'پ / چ' },
      { latin: 'sh / kh', script: 'ش / خ' }, { latin: 'gh / q', script: 'غ / ق' },
      { latin: 'T / D / R', script: 'ٹ / ڈ / ڑ' }, { latin: 'g / k', script: 'گ / ک' },
      { latin: 'h / H', script: 'ہ / ھ' }, { latin: 'i / ay', script: 'ی / ے' }
    ],
    note: 'Uses standard Phonetic Urdu QWERTY mapping (e.g. shukriya → شکریہ).'
  },
  hi: {
    title: '💡 Hindi Phonetic Typing Guide',
    keyboardTitle: 'Phonetic Hindi Keyboard (हिन्दी)',
    rules: [
      { latin: 'aa / ii', script: 'आ/ा · ई/ी' }, { latin: 'kh / gh', script: 'ख / घ' },
      { latin: 'ch / chh', script: 'च / छ' }, { latin: 'th / dh', script: 'थ / ध' },
      { latin: 'ph / bh', script: 'फ / भ' }, { latin: 'sh', script: 'श' },
      { latin: 'T / D', script: 'ट / ड' }, { latin: 'namaste', script: 'नमस्ते' }
    ],
    note: 'Type Roman Hindi phonetically (e.g. paani → पानी) or tap Devanagari keys.'
  },
  bn: {
    title: '💡 Bengali Phonetic Typing Guide',
    keyboardTitle: 'Phonetic Bengali Keyboard (বাংলা)',
    rules: [
      { latin: 'o / a', script: 'অ · আ/া' }, { latin: 'kh / gh', script: 'খ / ঘ' },
      { latin: 'ch / chh', script: 'চ / ছ' }, { latin: 'th / dh', script: 'থ / ধ' },
      { latin: 'ph / bh', script: 'ফ / ভ' }, { latin: 'sh / ng', script: 'শ / ং' },
      { latin: 'T / D / R', script: 'ট / ড / ড়' }, { latin: 'jol', script: 'জল' }
    ],
    note: 'Type Avro-style phonetic Bengali (e.g. dhonnobad → ধন্যবাদ) or tap letters.'
  },
  ja: {
    title: '💡 Japanese Romaji Typing Guide',
    keyboardTitle: 'Phonetic Hiragana Keyboard (ひらがな)',
    rules: [
      { latin: 'ka ki ku', script: 'か き く' }, { latin: 'shi / chi', script: 'し / ち' },
      { latin: 'tsu / fu', script: 'つ / ふ' }, { latin: 'sha / cha', script: 'しゃ / ちゃ' },
      { latin: 'kk / tt', script: 'っ (small)' }, { latin: 'nn', script: 'ん' },
      { latin: 'wa / wo', script: 'わ / を' }, { latin: 'arigatou', script: 'ありがとう' }
    ],
    note: 'Type standard Romaji (e.g. konnichiwa → こんにちは) or tap Hiragana keys.'
  },
  ko: {
    title: '💡 Korean Phonetic & Hangul Guide',
    keyboardTitle: 'Phonetic Hangul Keyboard (한글)',
    rules: [
      { latin: 'g / n / d', script: 'ㄱ / ㄴ / ㄷ' }, { latin: 'r / m / b', script: 'ㄹ / ㅁ / ㅂ' },
      { latin: 's / j / h', script: 'ㅅ / ㅈ / ㅎ' }, { latin: 'a / eo / o', script: 'ㅏ / ㅓ / ㅗ' },
      { latin: 'u / eu / i', script: 'ㅜ / ㅡ / ㅣ' }, { latin: 'ng', script: 'ㅇ' },
      { latin: 'ㅎ+ㅏ+ㄴ', script: '한 (auto)' }, { latin: 'annyeong', script: '안녕' }
    ],
    note: 'Clicking Hangul keys composes syllable blocks automatically, or type Romaja!'
  },
  zh: {
    title: '💡 Mandarin Pinyin Tone Guide',
    keyboardTitle: 'Mandarin Pinyin & Tone Keyboard (拼音)',
    rules: [
      { latin: 'ma1', script: 'mā (1st)' }, { latin: 'ma2', script: 'má (2nd)' },
      { latin: 'ma3', script: 'mǎ (3rd)' }, { latin: 'ma4', script: 'mà (4th)' },
      { latin: 'nihao + Space', script: '你好' }, { latin: 'nv3 / u:', script: 'nǚ / ü' },
      { latin: 'xiexie + Space', script: '谢谢' }, { latin: 'ni3 hao3', script: 'nǐ hǎo' }
    ],
    note: 'Sound out Pinyin and press Space to convert to Chinese characters (e.g. nihao → 你好), or type numeric tones (ni3 hao3 → nǐ hǎo).'
  }
};

// ============================================================================
// 6. PINYIN-STYLE "SOUND IT OUT + SPACEBAR" LEXICON & CONVERTER (ALL 8 SCRIPTS)
// ============================================================================

const MANDARIN_SYLLABLE_HANZI: Record<string, string> = {
  ma1: '妈', ma2: '麻', ma3: '马', ma4: '骂', ma5: '吗', ma: '吗',
  ni3: '你', ni: '你', nin: '您', wo3: '我', wo: '我', ta1: '他', ta: '他',
  hao3: '好', hao: '好', shi4: '是', shi: '是', bu4: '不', bu: '不',
  xie4: '谢', xie: '谢', zai4: '再', zai: '在', jian4: '见', jian: '见',
  shui3: '水', shui: '水', cha2: '茶', cha: '茶', fan4: '饭', fan: '饭',
  ren2: '人', ren: '人', da4: '大', da: '大', xiao3: '小', xiao: '小',
  zhong1: '中', zhong: '中', guo2: '国', guo: '国', ai4: '爱', ai: '爱',
  chi1: '吃', chi: '吃', he1: '喝', he: '喝', qu4: '去', qu: '去',
  lai2: '来', lai: '来', yao4: '要', yao: '要', you3: '有', you: '有',
  mei2: '没', mei: '没', de: '的', le: '了', men: '们',
  yi1: '一', yi: '一', er4: '二', er: '二', san1: '三', san: '三',
  si4: '四', si: '四', wu3: '五', wu: '五', liu4: '六', liu: '六',
  qi1: '七', qi: '七', ba1: '八', ba: '八', jiu3: '九', jiu: '九',
  shi2: '十', bai3: '百', bai: '百', qian1: '千', qian: '千',
  mao1: '猫', mao: '猫', gou3: '狗', gou: '狗', shu1: '书', shu: '书',
  che1: '车', che: '车', jia1: '家', jia: '家', qian2: '钱',
  ming2: '明', ming: '明', tian1: '天', tian: '天', jin1: '今', jin: '今',
  nian2: '年', nian: '年', yue4: '月', yue: '月', ri4: '日', ri: '日',
};

const soundOutLexiconCache = new Map<PhoneticScriptLang, Map<string, string>>();

const cleanNativeScriptTarget = (raw: string, lang: PhoneticScriptLang): string => {
  let cleaned = raw
    .split('/')[0]
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .replace(/[؟?!.,،।？！。，¡¿«»"“”]/g, '')
    .trim();
  if (lang === 'ar' || lang === 'ur') {
    cleaned = cleaned.replace(/[\u064B-\u065F\u0670]/g, '');
  }
  return cleaned.trim();
};

const toCompactSoundKey = (pron: string): string =>
  pron
    .replace(/\/[^/]*\//g, ' ')
    .replace(/\([^)]*\)/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ü/gi, 'v')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

const toNumericPinyinKey = (pron: string): string => {
  const toneCharMap: Record<string, string> = {
    ā: 'a1', á: 'a2', ǎ: 'a3', à: 'a4',
    ē: 'e1', é: 'e2', ě: 'e3', è: 'e4',
    ī: 'i1', í: 'i2', ǐ: 'i3', ì: 'i4',
    ō: 'o1', ó: 'o2', ǒ: 'o3', ò: 'o4',
    ū: 'u1', ú: 'u2', ǔ: 'u3', ù: 'u4',
    ǖ: 'v1', ǘ: 'v2', ǚ: 'v3', ǜ: 'v4',
  };
  let out = pron.toLowerCase();
  for (const [marked, rep] of Object.entries(toneCharMap)) {
    out = out.split(marked).join(rep);
  }
  return out
    .replace(/([a-zv]+)([1-4])([a-z]*)/g, '$1$3$2')
    .replace(/[^a-z0-9]/g, '');
};

export const getSoundOutLexicon = (lang: PhoneticScriptLang): Map<string, string> => {
  const cached = soundOutLexiconCache.get(lang);
  if (cached) return cached;

  const map = new Map<string, string>();
  const entry = SUPPORTED_LANGUAGES[lang];
  if (entry?.data) {
    const d = entry.data;
    const rows = [
      ...(d.basicPhrases || []),
      ...(d.commonWords || []),
      ...(d.numbers || []),
      ...(d.time || []),
    ];

    for (const item of rows) {
      const rawTarget = (item.phrase || item.russian || item.target || '').toString().trim();
      const rawPron = (item.pronunciation || '').toString().trim();
      if (!rawTarget || !rawPron) continue;

      const target = cleanNativeScriptTarget(rawTarget, lang);
      if (!target || !containsTargetScript(target, lang)) continue;

      const compact = toCompactSoundKey(rawPron);
      if (compact.length >= (lang === 'ru' ? 4 : 2) && !map.has(compact)) {
        map.set(compact, target);
      }
      if (lang === 'zh' && /ü/i.test(rawPron)) {
        const uVariant = compact.replace(/v/g, 'u');
        if (uVariant.length >= 2 && !map.has(uVariant)) {
          map.set(uVariant, target);
        }
      }
      if (lang === 'zh') {
        const numericKey = toNumericPinyinKey(rawPron);
        if (numericKey && numericKey !== compact && !map.has(numericKey)) {
          map.set(numericKey, target);
        }
      }
    }

    for (const a of d.alphabet || []) {
      const exWord = (a.word || a.russianWord || '').toString().trim();
      const exPron = (a.wordPronunciation || '').toString().trim();
      if (exWord && exPron) {
        const cleanWord = cleanNativeScriptTarget(exWord, lang);
        const key = toCompactSoundKey(exPron);
        if (cleanWord && key.length >= (lang === 'ru' ? 4 : 2) && !map.has(key)) {
          map.set(key, cleanWord);
        }
      }
      if (lang !== 'ru' && lang !== 'zh') {
        const letter = cleanNativeScriptTarget(((a as { character?: string }).character || a.letter || '').toString(), lang);
        const parenMatch = (a.pronunciation || '').match(/\(([a-zA-Z]{1,4})\)/);
        const primary = parenMatch ? parenMatch[1].toLowerCase() : toCompactSoundKey((a.pronunciation || '').split(/as in|\/|,/i)[0]);
        if (letter && primary && primary.length >= 1 && primary.length <= 4 && !map.has(primary)) {
          map.set(primary, letter);
        }
      }
    }
  }

  if (lang === 'zh') {
    for (const [k, v] of Object.entries(MANDARIN_SYLLABLE_HANZI)) {
      if (!map.has(k)) {
        map.set(k, v);
      }
    }
  }

  const curatedAliases: Partial<Record<PhoneticScriptLang, Record<string, string>>> = {
    ru: {
      privet: 'привет', preevyet: 'привет', spasibo: 'спасибо', spaseeba: 'спасибо',
      pozhaluysta: 'пожалуйста', pazhalusta: 'пожалуйста', horosho: 'хорошо', kharasho: 'хорошо',
      zdravstvuyte: 'здравствуйте', zdrastvuyte: 'здравствуйте', poka: 'пока',
    },
    ko: {
      annyeong: '안녕', annyeonghaseyo: '안녕하세요', gamsahamnida: '감사합니다',
      kamsahamnida: '감사합니다', gomawo: '고마워', gomawoyo: '고마워요',
      mianhae: '미안해', mianhamnida: '미안합니다', juseyo: '주세요', saranghae: '사랑해',
    },
    ja: {
      konnichiwa: 'こんにちは', konbanwa: 'こんばんは', arigatou: 'ありがとう',
      arigato: 'ありがとう', ohayou: 'おはよう', ohayo: 'おはよう',
      sayounara: 'さようなら', sumimasen: 'すみません', hai: 'はい', iie: 'いいえ',
    },
    ar: {
      marhaban: 'مرحبا', marhaba: 'مرحبا', shukran: 'شكرا', afwan: 'عفوا',
      naam: 'نعم', ahlan: 'أهلا', salam: 'سلام', kitab: 'كتاب', maa: 'ماء',
    },
    ur: {
      shukriya: 'شکریہ', salam: 'سلام', assalamualaikum: 'السلام علیکم',
      paani: 'پانی', pani: 'پانی', haan: 'ہاں', nahin: 'نہیں', dost: 'دوست',
    },
    hi: {
      namaste: 'नमस्ते', dhanyavad: 'धन्यवाद', dhanyavaad: 'धन्यवाद',
      kripaya: 'कृपया', paani: 'पानी', pani: 'पानी', haan: 'हाँ', nahin: 'नहीं',
    },
    bn: {
      nomoshkar: 'নমস্কার', namaskar: 'নমস্কার', dhonnobad: 'ধন্যবাদ',
      dhanyabad: 'ধন্যবাদ', jol: 'জল', bhalo: 'ভালো', ami: 'আমি', tumi: 'তুমি',
    },
    zh: {
      nihao: '你好', ni3hao3: '你好', xiexie: '谢谢', xie4xie: '谢谢', xie4xie4: '谢谢',
      zaijian: '再见', zai4jian4: '再见', duibuqi: '对不起', dui4bu4qi3: '对不起',
      zaoshanghao: '早上好', wanshanghao: '晚上好', bukeqi: '不客气', meiguanxi: '没关系',
    },
  };

  const aliases = curatedAliases[lang];
  if (aliases) {
    for (const [k, v] of Object.entries(aliases)) {
      map.set(k, v);
    }
  }

  soundOutLexiconCache.set(lang, map);
  return map;
};

const segmentMandarinPinyinToHanzi = (compactLower: string, lexicon: Map<string, string>): string | null => {
  if (!compactLower || !/^[a-z1-5]+$/.test(compactLower)) return null;
  if (lexicon.has(compactLower)) return lexicon.get(compactLower)!;

  const n = compactLower.length;
  const dp: Array<string | null> = new Array(n + 1).fill(null);
  dp[n] = '';
  for (let i = n - 1; i >= 0; i--) {
    const maxLen = Math.min(12, n - i);
    for (let len = maxLen; len >= 1; len--) {
      const sub = compactLower.slice(i, i + len);
      const hit = lexicon.get(sub);
      if (hit && dp[i + len] !== null) {
        dp[i] = hit + dp[i + len]!;
        break;
      }
    }
  }
  return dp[0];
};

export const convertSoundOutToken = (token: string, lang: PhoneticScriptLang): string => {
  const trimmed = token.trim();
  if (!trimmed) return token;

  const lexicon = getSoundOutLexicon(lang);
  const compact = trimmed.toLowerCase().replace(/u:/g, 'v').replace(/ü/g, 'v').replace(/[^a-z0-9]/g, '');

  if (compact && lexicon.has(compact)) {
    return lexicon.get(compact)!;
  }

  if (lang === 'zh') {
    const segmented = segmentMandarinPinyinToHanzi(compact, lexicon);
    if (segmented) return segmented;
    const toned = convertNumericPinyin(trimmed);
    if (toned !== trimmed) return toned;
    return token;
  }

  if (lang === 'ru') {
    return transliterate(token);
  }

  return transliterateForLanguage(token, lang);
};

export const convertLastLatinWordOnSpace = (
  inputWithSpace: string,
  lang: PhoneticScriptLang
): { converted: string; didConvert: boolean } => {
  if (!inputWithSpace.endsWith(' ')) {
    return { converted: inputWithSpace, didConvert: false };
  }

  const withoutTrailingSpaces = inputWithSpace.replace(/\s+$/, '');
  const trailingSpaces = inputWithSpace.slice(withoutTrailingSpaces.length);
  if (!withoutTrailingSpaces) {
    return { converted: inputWithSpace, didConvert: false };
  }

  const lexicon = getSoundOutLexicon(lang);

  const multiWordMatch = withoutTrailingSpaces.match(/^(.*?)([a-zA-Z0-9'":`]+(?:\s+[a-zA-Z0-9'":`]+)+)$/);
  if (multiWordMatch) {
    const [, prefix, latinChunk] = multiWordMatch;
    const compactChunk = latinChunk.toLowerCase().replace(/u:/g, 'v').replace(/ü/g, 'v').replace(/[^a-z0-9]/g, '');
    if (compactChunk && lexicon.has(compactChunk)) {
      const phraseScript = lexicon.get(compactChunk)!;
      const mergedPrefix =
        (lang === 'zh' || lang === 'ja') && /[\u3040-\u30FF\u4E00-\u9FFF]\s+$/.test(prefix)
          ? prefix.replace(/\s+$/, '')
          : prefix;
      return { converted: `${mergedPrefix}${phraseScript}${trailingSpaces}`, didConvert: true };
    }
    if (lang === 'zh') {
      const seg = segmentMandarinPinyinToHanzi(compactChunk, lexicon);
      if (seg) {
        const mergedPrefix = /[\u4E00-\u9FFF]\s+$/.test(prefix) ? prefix.replace(/\s+$/, '') : prefix;
        return { converted: `${mergedPrefix}${seg}${trailingSpaces}`, didConvert: true };
      }
    }
  }

  if (lang === 'ru') {
    const mixedRuMatch = withoutTrailingSpaces.match(/^(.*?)([\u0400-\u04FFa-zA-Z0-9'":`-]+)$/);
    if (
      mixedRuMatch &&
      /[\u0400-\u04FF]/.test(mixedRuMatch[2]) &&
      /[a-zA-Z'":`]/.test(mixedRuMatch[2])
    ) {
      const [, mixedPrefix, mixedToken] = mixedRuMatch;
      const convertedMixed = transliterate(mixedToken);
      if (convertedMixed && convertedMixed !== mixedToken) {
        return {
          converted: `${mixedPrefix}${convertedMixed}${trailingSpaces}`,
          didConvert: true,
        };
      }
    }
  }

  const lastWordMatch = withoutTrailingSpaces.match(/^(.*?)([a-zA-Z0-9'":`-]+)$/);
  if (!lastWordMatch) {
    return { converted: inputWithSpace, didConvert: false };
  }
  const [, prefix, rawWord] = lastWordMatch;
  if (/^\d+$/.test(rawWord)) {
    return { converted: inputWithSpace, didConvert: false };
  }

  const convertedWord = convertSoundOutToken(rawWord, lang);
  if (!convertedWord || convertedWord === rawWord) {
    return { converted: inputWithSpace, didConvert: false };
  }

  const cleanPrefix =
    (lang === 'zh' || lang === 'ja') &&
    /[\u3040-\u30FF\u4E00-\u9FFF]\s+$/.test(prefix) &&
    containsTargetScript(convertedWord, lang)
      ? prefix.replace(/\s+$/, '')
      : prefix;

  return {
    converted: `${cleanPrefix}${convertedWord}${trailingSpaces}`,
    didConvert: true,
  };
};

export const previewSoundOutToken = (
  input: string,
  lang: PhoneticScriptLang
): { rawToken: string; preview: string } | null => {
  if (!input || /\s$/.test(input)) return null;

  const lexicon = getSoundOutLexicon(lang);
  const multiMatch = input.match(/([a-zA-Z0-9'":`]+(?:\s+[a-zA-Z0-9'":`]+)+)$/);
  if (multiMatch) {
    const chunk = multiMatch[1];
    const compact = chunk.toLowerCase().replace(/u:/g, 'v').replace(/ü/g, 'v').replace(/[^a-z0-9]/g, '');
    if (compact && lexicon.has(compact)) {
      return { rawToken: chunk, preview: lexicon.get(compact)! };
    }
    if (lang === 'zh') {
      const seg = segmentMandarinPinyinToHanzi(compact, lexicon);
      if (seg) return { rawToken: chunk, preview: seg };
    }
  }

  if (lang === 'ru') {
    const mixedRuSingle = input.match(/([\u0400-\u04FFa-zA-Z0-9'":`-]+)$/);
    if (
      mixedRuSingle &&
      /[\u0400-\u04FF]/.test(mixedRuSingle[1]) &&
      /[a-zA-Z'":`]/.test(mixedRuSingle[1])
    ) {
      const mixedToken = mixedRuSingle[1];
      const convertedMixed = transliterate(mixedToken);
      if (convertedMixed && convertedMixed !== mixedToken) {
        return { rawToken: mixedToken, preview: convertedMixed };
      }
    }
  }

  const singleMatch = input.match(/([a-zA-Z0-9'":`-]+)$/);
  if (!singleMatch) return null;
  const rawToken = singleMatch[1];
  if (/^\d+$/.test(rawToken)) return null;

  const converted = convertSoundOutToken(rawToken, lang);
  if (!converted || converted === rawToken) return null;

  return { rawToken, preview: converted };
};

export const getLocalizedPhoneticCheatsheet = (
  lang: PhoneticScriptLang,
  baseLang: SupportedLanguageId = 'en'
): PhoneticCheatsheet => {
  const base = PHONETIC_CHEATSHEETS[lang];
  if (baseLang === 'en') return base;

  const localizedNotes: Partial<Record<SupportedLanguageId, string>> = {
    zh: '用拉丁字母拼出读音，然后按空格键即可转换为目标文字！',
    ja: 'ラテン文字で発音を入力し、スペースキーを押すと文字に変換されます！',
    ko: '알파벳으로 발음을 입력한 뒤 스페이스바를 누르면 문자로 변환됩니다!',
    ru: 'Введите слово фонетически латиницей и нажмите Пробел для конвертации!',
    es: 'Escribe cómo suena en letras latinas y pulsa Espacio para convertir.',
    fr: 'Écrivez phonétiquement en lettres latines puis appuyez sur Espace pour convertir.',
    de: 'Tippe die Aussprache mit lateinischen Buchstaben und drücke die Leertaste zum Umwandeln.',
    pt: 'Digite foneticamente com letras latinas e pressione Espaço para converter.',
    id: 'Ketik bunyinya dengan huruf Latin lalu tekan Spasi untuk mengubah aksara.',
    tr: 'Latin harfleriyle okunuşunu yazıp dönüştürmek için Boşluk tuşuna basın.',
    hi: 'लैटिन अक्षरों में उच्चारण लिखें और बदलने के लिए स्पेसबार दबाएँ।',
    ar: 'اكتب النطق بالأحرف اللاتينية ثم اضغط مفتاح المسافة للتحويل.',
    bn: 'ল্যাটিন অক্ষরে উচ্চারণ লিখে রূপান্তর করতে স্পেসবার চাপুন।',
    ur: 'لاطینی حروف میں تلفظ لکھیں اور تبدیلی کے لیے اسپیس بار دبائیں۔',
  };

  const localizedTitles: Partial<Record<SupportedLanguageId, { title: string; kb: string }>> = {
    zh: { title: '💡 拼音式拼读输入指南', kb: '音标虚拟键盘' },
    ja: { title: '💡 ローマ字・発音入力ガイド', kb: '音声キーボード' },
    ko: { title: '💡 발음 입력 가이드', kb: '발음 가상 키보드' },
    ru: { title: '💡 Фонетический ввод', kb: 'Виртуальная клавиатура' },
    es: { title: '💡 Guía de escritura fonética', kb: 'Teclado fonético virtual' },
    fr: { title: '💡 Guide de saisie phonétique', kb: 'Clavier phonétique virtuel' },
    de: { title: '💡 Phonetische Tipp-Hilfe', kb: 'Virtuelle phonetische Tastatur' },
    pt: { title: '💡 Guia de digitação fonética', kb: 'Teclado fonético virtual' },
    id: { title: '💡 Panduan Ketik Fonetik', kb: 'Papan Ketik Fonetik' },
    tr: { title: '💡 Fonetik Yazım Rehberi', kb: 'Sanal Fonetik Klavye' },
    hi: { title: '💡 ध्वन्यात्मक टाइपिंग गाइड', kb: 'ध्वन्यात्मक कीबोर्ड' },
    ar: { title: '💡 دليل الكتابة الصوتية', kb: 'لوحة المفاتيح الصوتية' },
    bn: { title: '💡 ধ্বনিভিত্তিক টাইপিং নির্দেশিকা', kb: 'ধ্বনিভিত্তিক কিবোর্ড' },
    ur: { title: '💡 صوتی ٹائپنگ گائیڈ', kb: 'صوتی کی بورڈ' },
  };

  const t = localizedTitles[baseLang];
  return {
    ...base,
    title: t ? t.title : base.title,
    keyboardTitle: t ? t.kb : base.keyboardTitle,
    note: localizedNotes[baseLang] || base.note,
  };
};
