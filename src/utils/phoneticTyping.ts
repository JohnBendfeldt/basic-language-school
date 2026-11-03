import { SupportedLanguageId } from '../data/languages/types';
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
      { latin: 'yo', script: 'ё' }, { latin: 'zh', script: 'ж' },
      { latin: 'sh', script: 'ш' }, { latin: 'ch', script: 'ч' },
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
      { latin: 'ni3 hao3', script: 'nǐ hǎo' }, { latin: 'nv3 / u:', script: 'nǚ / ü' },
      { latin: 'Hanzi', script: '你好' }, { latin: 'Pinyin', script: 'nǐ hǎo' }
    ],
    note: 'Type Chinese characters (汉字) or Pinyin (e.g. ni3 hao3 → nǐ hǎo).'
  }
};
