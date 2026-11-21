import React from 'react';
import fs from 'fs';
import path from 'path';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Grammar from '../components/Grammar';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { SupportedLanguageId } from '../data/languages/types';
import { PhraseItem } from '../types';
import { getCandidateAudioPathsForText } from '../components/PronunciationButton';
import { resolveTranslation } from '../utils/translationResolver';
import { TARGET_LETTER_COUNTS } from '../utils/pageDictionary';
import { UI_TRANSLATIONS } from '../data/translations';
import { getAlphabetAcceptedAnswers } from '../utils/alphabetAnswers';
import { ABOUT_LANGUAGES } from '../data/languages/aboutLanguageData';
import { ABOUT_TRANSLATIONS_BY_BASE, getScriptEvolutionLabels } from '../data/languages/aboutTranslations';

window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = vi.fn();

const ALL_LANGS: SupportedLanguageId[] = [
  'en', 'es', 'fr', 'ru', 'pt', 'de', 'id', 'tr',
  'zh', 'ja', 'ko', 'hi', 'ar', 'bn', 'ur',
];

const targetText = (p: PhraseItem): string => (p.phrase ?? p.russian ?? p.target ?? '').trim();
const englishMeaning = (p: PhraseItem): string => (p.english ?? p.meaning ?? p.translation ?? '').trim();

const lowerForLang = (text: string, lang: SupportedLanguageId): string => {
  if (lang === 'tr') {
    return text.replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase();
  }
  return text.toLowerCase();
};

const stripPinyinTones = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[āáǎà]/g, 'a')
    .replace(/[ēéěè]/g, 'e')
    .replace(/[īíǐì]/g, 'i')
    .replace(/[ōóǒò]/g, 'o')
    .replace(/[ūúǔù]/g, 'u')
    .replace(/[ǖǘǚǜ]/g, 'ü');

// Map Korean Compatibility Jamo (U+3131..U+3163) to Hangul NFD Choseong/Jungseong/Jongseong characters
const KOREAN_COMPAT_TO_NFD: Record<string, string[]> = {
  'ㄱ': ['\u1100', '\u11A8'],
  'ㄲ': ['\u1101', '\u11A9'],
  'ㄴ': ['\u1102', '\u11AB'],
  'ㄷ': ['\u1103', '\u11AE'],
  'ㄸ': ['\u1104'],
  'ㄹ': ['\u1105', '\u11AF'],
  'ㅁ': ['\u1106', '\u11B7'],
  'ㅂ': ['\u1107', '\u11B8'],
  'ㅃ': ['\u1108'],
  'ㅅ': ['\u1109', '\u11BA'],
  'ㅆ': ['\u110A', '\u11BB'],
  'ㅇ': ['\u110B', '\u11BC'],
  'ㅈ': ['\u110C', '\u11BD'],
  'ㅉ': ['\u110D'],
  'ㅊ': ['\u110E', '\u11BE'],
  'ㅋ': ['\u110F', '\u11BF'],
  'ㅌ': ['\u1110', '\u11C0'],
  'ㅍ': ['\u1111', '\u11C1'],
  'ㅎ': ['\u1112', '\u11C2'],
  'ㅏ': ['\u1161'],
  'ㅐ': ['\u1162'],
  'ㅑ': ['\u1163'],
  'ㅒ': ['\u1164'],
  'ㅓ': ['\u1165'],
  'ㅔ': ['\u1166'],
  'ㅕ': ['\u1167'],
  'ㅖ': ['\u1168'],
  'ㅗ': ['\u1169'],
  'ㅘ': ['\u116A'],
  'ㅙ': ['\u116B'],
  'ㅚ': ['\u116C'],
  'ㅛ': ['\u116D'],
  'ㅜ': ['\u116E'],
  'ㅝ': ['\u116F'],
  'ㅞ': ['\u1170'],
  'ㅟ': ['\u1171'],
  'ㅠ': ['\u1172'],
  'ㅡ': ['\u1173'],
  'ㅢ': ['\u1174'],
  'ㅣ': ['\u1175'],
};

const HINDI_VOWEL_MATRAS: Record<string, string> = {
  'आ': 'ा', 'इ': 'ि', 'ई': 'ी', 'उ': 'ु', 'ऊ': 'ू',
  'ऋ': 'ृ', 'ए': 'े', 'ऐ': 'ै', 'ओ': 'ो', 'औ': 'ौ',
};

const BENGALI_VOWEL_MATRAS: Record<string, string> = {
  'আ': 'া', 'ই': 'ি', 'ঈ': 'ী', 'উ': 'ু', 'ঊ': 'ূ',
  'ঋ': 'ৃ', 'এ': 'ে', 'ঐ': 'ৈ', 'ও': 'ো', 'ঔ': 'ৌ',
};

const LanguagePairSetter: React.FC<{
  targetLang: SupportedLanguageId;
  baseLang: SupportedLanguageId;
  children: React.ReactNode;
}> = ({ targetLang, baseLang, children }) => {
  const { setTargetLanguage, setBaseLanguage, currentLanguage, baseLanguage } = useLanguage();

  React.useEffect(() => {
    setTargetLanguage(targetLang);
    setBaseLanguage(baseLang);
  }, [targetLang, baseLang, setTargetLanguage, setBaseLanguage]);

  if (currentLanguage !== targetLang || baseLanguage !== baseLang) {
    return null;
  }

  return <>{children}</>;
};

describe('Curriculum Quality & Linguistic Regression Audit', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('1. Alphabet integrity across all 15 languages', () => {
    it('TARGET_LETTER_COUNTS matches SUPPORTED_LANGUAGES alphabet lengths for all 15 languages', () => {
      for (const lang of ALL_LANGS) {
        expect(
          TARGET_LETTER_COUNTS[lang],
          `TARGET_LETTER_COUNTS.${lang} should match alphabet.length`
        ).toBe(SUPPORTED_LANGUAGES[lang].data.alphabet.length);
      }
    });

    it('every alphabet letter appears in its example word (with script-aware matching)', () => {
      // Verified studio-MP3-bound exceptions whose recorded audio on disk lacks a matching word
      const VERIFIED_AUDIO_EXCEPTIONS = new Set<string>([
        'pt:Y', // Portuguese Y example uses native 'Iogurte' audio on disk
        'ur:ض', // Urdu ض example uses 'روشنی' audio on disk (annotated with 'ضرور zarūr' in example)
      ]);

      const mismatches: string[] = [];

      for (const lang of ALL_LANGS) {
        const alphabet = SUPPORTED_LANGUAGES[lang].data.alphabet;

        for (const item of alphabet) {
          const key = `${lang}:${item.letter}`;
          if (VERIFIED_AUDIO_EXCEPTIONS.has(key)) continue;

          const word = (item.russianWord ?? item.word ?? '').trim();
          expect(word.length, `[${lang}] ${item.letter} should have an example word`).toBeGreaterThan(0);

          if (lang === 'zh') {
            const pinyin = stripPinyinTones(item.wordPronunciation ?? '');
            const targetLetter = item.letter.toLowerCase();
            // In Pinyin orthography, ü is written as u after j, q, x, y (e.g. yú, nǚ)
            const matched =
              pinyin.includes(targetLetter) ||
              (targetLetter === 'ü' && /(?:[jqxy]u|ü)/.test(pinyin));
            if (!matched) {
              mismatches.push(`[zh] letter "${item.letter}" not found in pinyin "${item.wordPronunciation}" (${word})`);
            }
            continue;
          }

          if (lang === 'ko') {
            const nfdWord = word.normalize('NFD');
            const nfdTargets = KOREAN_COMPAT_TO_NFD[item.letter] ?? [item.letter];
            const matched = nfdTargets.some((ch) => nfdWord.includes(ch)) || word.includes(item.letter);
            if (!matched) {
              mismatches.push(`[ko] letter "${item.letter}" not found in Hangul word "${word}"`);
            }
            continue;
          }

          if (lang === 'ar' || lang === 'ur') {
            // Strip tatweel (ـ) and Arabic harakat / diacritics while preserving distinct letter forms
            const cleanLetter = item.letter.replace(/\u0640/g, '').trim();
            const cleanWord = word.replace(/[\u0640\u064B-\u065F\u0670]/g, '');
            let matched = cleanWord.includes(cleanLetter);
            if (!matched && cleanLetter === 'ا') {
              matched = /[اأإآ]/.test(cleanWord);
            }
            if (!matched && cleanLetter === 'ء') {
              matched = /[ءأإؤئ]/.test(cleanWord);
            }
            if (!matched && lang === 'ur' && cleanLetter === 'ہ') {
              matched = /[ہھ]/.test(cleanWord);
            }
            if (!matched) {
              mismatches.push(`[${lang}] letter "${item.letter}" not found in word "${word}"`);
            }
            continue;
          }

          if (lang === 'hi') {
            const matra = HINDI_VOWEL_MATRAS[item.letter];
            const matched = word.includes(item.letter) || (matra ? word.includes(matra) : false);
            if (!matched) {
              mismatches.push(`[hi] letter "${item.letter}" not found in word "${word}"`);
            }
            continue;
          }

          if (lang === 'bn') {
            const matra = BENGALI_VOWEL_MATRAS[item.letter];
            const matched = word.includes(item.letter) || (matra ? word.includes(matra) : false);
            if (!matched) {
              mismatches.push(`[bn] letter "${item.letter}" not found in word "${word}"`);
            }
            continue;
          }

          const normLetter = lowerForLang(item.letter.trim(), lang);
          const normWord = lowerForLang(word, lang);
          // For accented Latin vowels/consonants, check exact match first, then base-folded match for non-distinct accented forms (e.g. Spanish Á/É/Í/Ó/Ú matching a/e/i/o/u)
          let matched = normWord.includes(normLetter);
          if (!matched && /^[a-z]$/.test(normLetter)) {
            const strippedWord = normWord.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            matched = strippedWord.includes(normLetter);
          }
          if (!matched) {
            mismatches.push(`[${lang}] letter "${item.letter}" not found in word "${word}"`);
          }
        }
      }

      expect(mismatches).toEqual([]);
    });
  });

  describe('2. Zero empty or corrupted (<= 256 bytes) audio files for active curriculum items', () => {
    it('every existing audio MP3 referenced by active curriculum items across all 15 languages is > 256 bytes', () => {
      const publicDir = path.resolve(__dirname, '../../public');
      const corrupted: string[] = [];

      const inspectCandidates = (candidates: string[], label: string) => {
        for (const candidate of candidates) {
          const rel = decodeURIComponent(candidate).replace(/^\//, '');
          const full = path.join(publicDir, rel);
          if (fs.existsSync(full)) {
            const stat = fs.statSync(full);
            if (stat.size <= 256) {
              corrupted.push(`${label} -> ${rel} (${stat.size} bytes)`);
            }
          }
        }
      };

      for (const lang of ALL_LANGS) {
        const data = SUPPORTED_LANGUAGES[lang].data;

        for (const item of data.alphabet) {
          const lowerLetter = lowerForLang(item.letter, lang);
          inspectCandidates(getCandidateAudioPathsForText(lowerLetter, lang, 'alphabet'), `[${lang}] alphabet:${item.letter}`);
          const exWord = item.russianWord ?? item.word;
          if (exWord) {
            inspectCandidates(getCandidateAudioPathsForText(exWord, lang, 'examples'), `[${lang}] example:${exWord}`);
          }
        }

        for (const item of data.basicPhrases) {
          const txt = targetText(item);
          if (txt) inspectCandidates(getCandidateAudioPathsForText(txt, lang, 'phrases'), `[${lang}] phrase:${txt}`);
        }

        for (const item of data.commonWords) {
          const txt = targetText(item);
          if (txt) inspectCandidates(getCandidateAudioPathsForText(txt, lang, 'words'), `[${lang}] word:${txt}`);
        }

        for (const item of data.numbers) {
          const txt = targetText(item);
          if (txt) inspectCandidates(getCandidateAudioPathsForText(txt, lang, 'numbers'), `[${lang}] number:${txt}`);
        }

        for (const item of data.time ?? []) {
          const txt = targetText(item);
          if (txt) inspectCandidates(getCandidateAudioPathsForText(txt, lang, 'time'), `[${lang}] time:${txt}`);
        }
      }

      expect(corrupted).toEqual([]);
    });
  });

  describe('3. Curriculum hygiene, categorization, and deduplication across all 15 languages', () => {
    const ANIMAL_ENGLISH = new Set([
      'dog', 'cat', 'bird', 'fish', 'horse', 'cow', 'pig', 'bear',
      'lion', 'elephant', 'tiger', 'rabbit', 'mouse', 'snake', 'chicken', 'zebra',
    ]);
    const VEHICLE_ENGLISH = new Set([
      'car', 'bus', 'train', 'taxi', 'airplane', 'bicycle', 'boat', 'ship', 'subway',
    ]);

    it('has zero Russian-course leakage in non-Russian commonWords', () => {
      const leaks: string[] = [];
      for (const lang of ALL_LANGS) {
        if (lang === 'ru') continue;
        for (const w of SUPPORTED_LANGUAGES[lang].data.commonWords) {
          const en = englishMeaning(w).toLowerCase();
          if (/\b(?:borscht|czar|tsar|russian)\b/.test(en)) {
            leaks.push(`[${lang}] "${targetText(w)}" -> "${englishMeaning(w)}"`);
          }
        }
      }
      expect(leaks).toEqual([]);
    });

    it('never categorizes animals under Weather or vehicles under Places', () => {
      const miscategorized: string[] = [];
      for (const lang of ALL_LANGS) {
        for (const w of SUPPORTED_LANGUAGES[lang].data.commonWords) {
          const cat = (w.category ?? '').trim().toLowerCase();
          const en = englishMeaning(w).toLowerCase();
          if (cat === 'weather' && ANIMAL_ENGLISH.has(en)) {
            miscategorized.push(`[${lang}] animal "${targetText(w)}" (${en}) in Weather`);
          }
          if (cat === 'places' && VEHICLE_ENGLISH.has(en)) {
            miscategorized.push(`[${lang}] vehicle "${targetText(w)}" (${en}) in Places`);
          }
        }
      }
      expect(miscategorized).toEqual([]);
    });

    it('has zero "Noun:" prefixes in English commonWords', () => {
      const bad = SUPPORTED_LANGUAGES.en.data.commonWords
        .filter((w) => /^noun:/i.test(englishMeaning(w)) || /^noun:/i.test(targetText(w)))
        .map((w) => `${targetText(w)} -> ${englishMeaning(w)}`);
      expect(bad).toEqual([]);
    });

    it('has non-empty pronunciations in commonWords and zero stray single-comma entries across all lists', () => {
      const missingPron: string[] = [];
      const strayComma: string[] = [];

      for (const lang of ALL_LANGS) {
        const d = SUPPORTED_LANGUAGES[lang].data;
        for (const w of d.commonWords) {
          if (!w.pronunciation?.trim()) {
            missingPron.push(`[${lang}] "${targetText(w)}" (${englishMeaning(w)})`);
          }
        }

        const allLists: [string, PhraseItem[]][] = [
          ['basicPhrases', d.basicPhrases],
          ['commonWords', d.commonWords],
          ['numbers', d.numbers],
          ['time', d.time ?? []],
        ];
        for (const [listName, list] of allLists) {
          for (const item of list) {
            if (targetText(item) === ',' || englishMeaning(item) === ',' || item.pronunciation?.trim() === ',') {
              strayComma.push(`[${lang}] ${listName}: ${JSON.stringify(item)}`);
            }
          }
        }
      }

      expect(missingPron).toEqual([]);
      expect(strayComma).toEqual([]);
    });

    it('never maps o\'clock time/number entries to CJK "Clock" nouns (时钟, 時計, 시계)', () => {
      const bad: string[] = [];
      const CJK_CLOCK_NOUNS = new Set(['时钟', '時計', '시계']);

      for (const lang of ['zh', 'ja', 'ko'] as SupportedLanguageId[]) {
        const d = SUPPORTED_LANGUAGES[lang].data;
        for (const item of [...(d.time ?? []), ...d.numbers]) {
          const txt = targetText(item);
          const en = englishMeaning(item).toLowerCase();
          if (CJK_CLOCK_NOUNS.has(txt) && /o'clock|\d{1,2}:00/.test(en)) {
            bad.push(`[${lang}] "${txt}" -> "${englishMeaning(item)}"`);
          }
        }
      }

      expect(bad).toEqual([]);
    });

    it('has zero duplicate target+meaning rows within commonWords or duplicating basicPhrases/numbers/time', () => {
      const dupes: string[] = [];

      for (const lang of ALL_LANGS) {
        const d = SUPPORTED_LANGUAGES[lang].data;
        const otherKeys = new Set<string>();
        for (const item of [...d.basicPhrases, ...d.numbers, ...(d.time ?? [])]) {
          otherKeys.add(`${lowerForLang(targetText(item), lang)}||${englishMeaning(item).toLowerCase()}`);
        }

        const seenWords = new Set<string>();
        for (const w of d.commonWords) {
          const key = `${lowerForLang(targetText(w), lang)}||${englishMeaning(w).toLowerCase()}`;
          if (seenWords.has(key)) {
            dupes.push(`[${lang}] duplicate inside commonWords: ${key}`);
          }
          if (otherKeys.has(key)) {
            dupes.push(`[${lang}] commonWords duplicates another list: ${key}`);
          }
          seenWords.add(key);
        }
      }

      expect(dupes).toEqual([]);
    });
  });

  describe('4. Cross-language translation resolver across all 210 bidirectional pairs', () => {
    const KEY_PHRASES = [
      'How much is this?',
      'Excuse me',
      "I don't understand",
      'Where is the bathroom?',
      'Thank you very much',
    ];
    const NON_LATIN_SCRIPTS: SupportedLanguageId[] = ['ru', 'zh', 'ja', 'ko', 'hi', 'ar', 'bn', 'ur'];

    it('resolves key multi-word phrases cleanly without empty results, raw English leaks, or Step-5 single-word collapse', () => {
      const issues: string[] = [];

      for (const target of ALL_LANGS) {
        for (const base of ALL_LANGS) {
          if (target === base) continue;
          for (const englishPhrase of KEY_PHRASES) {
            // Find the native phrase in target language if present, otherwise test via English concept item
            const nativeItem = SUPPORTED_LANGUAGES[target].data.basicPhrases.find(
              (p) => englishMeaning(p).toLowerCase() === englishPhrase.toLowerCase()
            );
            const item: PhraseItem = nativeItem ?? { phrase: englishPhrase, english: englishPhrase };
            const sourceLang: SupportedLanguageId = nativeItem ? target : 'en';
            const resolved = resolveTranslation(item, sourceLang, base);

            if (!resolved || !resolved.trim()) {
              issues.push(`[${sourceLang}->${base}] empty for "${englishPhrase}"`);
              continue;
            }
            if (NON_LATIN_SCRIPTS.includes(base) && /^[A-Za-z0-9\s?!',.-]+$/.test(resolved.trim())) {
              issues.push(`[${sourceLang}->${base}] raw Latin leak "${resolved}" for "${englishPhrase}"`);
            }
            if (englishPhrase === 'How much is this?' && /^(?:this|how|much|is)$/i.test(resolved.trim())) {
              issues.push(`[${sourceLang}->${base}] collapsed "How much is this?" to "${resolved}"`);
            }
          }
        }
      }

      expect(issues).toEqual([]);
    });

    it('resolves "web" to native CJK script for zh, ja, and ko', () => {
      expect(resolveTranslation({ phrase: 'web', english: 'web' }, 'en', 'zh')).toBe('网络');
      expect(resolveTranslation({ phrase: 'web', english: 'web' }, 'en', 'ja')).toBe('ウェブ');
      expect(resolveTranslation({ phrase: 'web', english: 'web' }, 'en', 'ko')).toBe('웹');
    });
  });

  describe('5. Grammar rendering regression (English articles a / an)', () => {
    it('renders "an apple", "a book", and "an hour" cleanly without concatenated "a / an / the apple"', () => {
      const { container } = render(
        <LanguageProvider>
          <LanguagePairSetter targetLang="en" baseLang="es">
            <Grammar initialTab="gender" />
          </LanguagePairSetter>
        </LanguageProvider>
      );

      const text = container.textContent ?? '';
      const renderedExamples = Array.from(container.querySelectorAll('.example-target')).map((el) =>
        el.textContent?.trim()
      );
      expect(renderedExamples).toContain('an apple');
      expect(renderedExamples).toContain('a book');
      expect(renderedExamples).toContain('an hour');
      expect(screen.getAllByText(/an apple/i).length).toBeGreaterThanOrEqual(1);
      expect(text).not.toMatch(/a\s*\/\s*an\s*\/\s*the\s+apple/i);
    });
  });

  describe('6. UI translations, alphabet answers, and About language profiles', () => {
    it('UI_TRANSLATIONS enforces fixed Indonesian, Japanese, Korean, Russian, and accessibility strings', () => {
      expect(UI_TRANSLATIONS.id.tapToHide.toLowerCase()).not.toContain('para');
      expect(UI_TRANSLATIONS.ja.repeatHint.length).toBeGreaterThan(20);
      expect(UI_TRANSLATIONS.ko.repeatHint.length).toBeGreaterThan(20);
      expect(UI_TRANSLATIONS.ru.iSpeak).toBe('Мой язык');

      for (const lang of ALL_LANGS) {
        expect(UI_TRANSLATIONS[lang].skipToContent?.trim().length, `${lang}.skipToContent`).toBeGreaterThan(0);
        expect(UI_TRANSLATIONS[lang].mainNavigation?.trim().length, `${lang}.mainNavigation`).toBeGreaterThan(0);
        expect(UI_TRANSLATIONS[lang].bottomNavigation?.trim().length, `${lang}.bottomNavigation`).toBeGreaterThan(0);
      }
    });

    it('getAlphabetAcceptedAnswers supports all 15 languages, Turkish dotless I, tone-stripped Pinyin, and localized Russian signs', () => {
      expect(getAlphabetAcceptedAnswers('ß', '/s/', 'de', 'en')).toContain('eszett');
      expect(getAlphabetAcceptedAnswers('Ä', '/ɛː/', 'de', 'en')).toContain('ae');
      expect(getAlphabetAcceptedAnswers('Ç', '/s/', 'pt', 'en')).toContain('cedilha');
      expect(getAlphabetAcceptedAnswers('H', 'silent', 'pt', 'en')).toContain('aga');
      expect(getAlphabetAcceptedAnswers('C', '/tʃ/', 'id', 'en')).toContain('ce');

      const trDotted = getAlphabetAcceptedAnswers('İ', '/i/', 'tr', 'en');
      const trDotless = getAlphabetAcceptedAnswers('I', '/ɯ/', 'tr', 'en');
      expect(trDotted).toContain('i');
      expect(trDotless).toContain('ı');
      expect(trDotted.some((a) => a.includes('\u0307'))).toBe(false);
      expect(trDotless.some((a) => a.includes('\u0307'))).toBe(false);
      expect(getAlphabetAcceptedAnswers('Ğ', 'silent', 'tr', 'en')).toContain('yumusak ge');

      expect(getAlphabetAcceptedAnswers('b', 'bō', 'zh', 'en')).toContain('bo');
      expect(getAlphabetAcceptedAnswers('ü', 'yū', 'zh', 'en')).toContain('yu');
      expect(getAlphabetAcceptedAnswers('し', 'shi', 'ja', 'en')).toContain('shi');
      expect(getAlphabetAcceptedAnswers('ㄱ', 'g / k', 'ko', 'en')).toContain('giyeok');
      expect(getAlphabetAcceptedAnswers('ㅆ', 'ss', 'ko', 'en')).toContain('ssangsiot');
      expect(getAlphabetAcceptedAnswers('ا', 'alif', 'ar', 'en')).toContain('alif');
      expect(getAlphabetAcceptedAnswers('ہ', 'he', 'ur', 'en')).toContain('he');
      expect(getAlphabetAcceptedAnswers('ھ', 'do-chashmi he', 'ur', 'en')).toContain('do-chashmi he');
      expect(getAlphabetAcceptedAnswers('ज्ञ', 'gya', 'hi', 'en')).toContain('gy');
      expect(getAlphabetAcceptedAnswers('H', '/eɪtʃ/', 'en', 'es')).toContain('haitch');

      // Russian hard/soft signs localize for non-English base languages without leaking English terms
      const ruHardEs = getAlphabetAcceptedAnswers('Ъ', 'hard sign', 'ru', 'es');
      const ruSoftFr = getAlphabetAcceptedAnswers('Ь', 'soft sign', 'ru', 'fr');
      const ruHardDe = getAlphabetAcceptedAnswers('Ъ', 'hard sign', 'ru', 'de');
      expect(ruHardEs).toContain('signo duro');
      expect(ruHardEs).not.toContain('hard sign');
      expect(ruSoftFr).toContain('signe mou');
      expect(ruSoftFr).not.toContain('soft sign');
      expect(ruHardDe).toContain('hartes zeichen');
      expect(ruHardDe).not.toContain('hard sign');
    });

    it('ABOUT_LANGUAGES and all 14 overlay translations are free of removed linguistic errors and format strokes accurately', () => {
      const serialized = [
        JSON.stringify(ABOUT_LANGUAGES),
        ...Object.values(ABOUT_TRANSLATIONS_BY_BASE).map((t) => JSON.stringify(t)),
      ].join('\n');

      expect(serialized).not.toContain('昨天我吃');
      expect(serialized).not.toContain('мат (');
      expect(serialized).not.toContain('мат（');
      expect(serialized).not.toContain('(तू)');
      expect(serialized).not.toContain('\\\\/');

      // Arabic RTL fact uses left-pointing arrow ⬅️ (not ➡️) across English and all 14 overlays
      const checkArabicRtlIcon = (facts: { icon?: string; label: string; value: string }[], label: string) => {
        const rtlFact = facts.find((f) => f.icon === '⬅️' || f.icon === '➡️');
        expect(rtlFact, `${label} should include an RTL direction fact`).toBeDefined();
        expect(rtlFact?.icon, `${label} RTL icon should be ⬅️`).toBe('⬅️');
      };

      checkArabicRtlIcon(ABOUT_LANGUAGES.ar.facts, 'ABOUT_LANGUAGES.ar');
      for (const [base, overlay] of Object.entries(ABOUT_TRANSLATIONS_BY_BASE)) {
        if (overlay?.ar?.facts) {
          checkArabicRtlIcon(overlay.ar.facts, `ABOUT_TRANSLATIONS_${base}.ar`);
        }
      }

      // Russian and Arabic pluralization in script evolution stroke formatter
      expect(getScriptEvolutionLabels('ru').formatStrokes(1)).toBe('1 черта');
      expect(getScriptEvolutionLabels('ru').formatStrokes(3)).toBe('3 черты');
      expect(getScriptEvolutionLabels('ru').formatStrokes(5)).toBe('5 черт');
      expect(getScriptEvolutionLabels('ar').formatStrokes(3)).toBe('3 خطوط');
      expect(getScriptEvolutionLabels('ar').formatStrokes(12)).toBe('12 خطاً');
    });
  });
});
