import fs from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';
import { SupportedLanguageId } from '../data/languages/types';
import { englishData } from '../data/languages/en/englishData';
import spanishData from '../data/languages/es/spanishData';
import frenchData from '../data/languages/fr/frenchData';
import russianData from '../data/languages/ru/russianData';
import portugueseData from '../data/languages/pt/portugueseData';
import germanData from '../data/languages/de/germanData';
import indonesianData from '../data/languages/id/indonesianData';
import turkishData from '../data/languages/tr/turkishData';
import { resolveTranslation, extractDigit } from '../utils/translationResolver';
import { getCandidateAudioPathsForText } from '../components/PronunciationButton';
import {
  getPageContent,
  getAlphabetLabels,
  getComponentChrome,
  getLocalizedAppName,
} from '../utils/pageDictionary';

const LANGUAGES: SupportedLanguageId[] = ['en', 'es', 'fr', 'ru', 'pt', 'de', 'id', 'tr'];

const DATA_BY_LANG: Record<SupportedLanguageId, typeof englishData> = {
  en: englishData,
  es: spanishData,
  fr: frenchData,
  ru: russianData,
  pt: portugueseData,
  de: germanData,
  id: indonesianData,
  tr: turkishData,
};

const PUBLIC_DIR = path.resolve(__dirname, '../../public');

function diskFileExistsForCandidates(candidateUrls: string[]): boolean {
  return candidateUrls.some((url) => {
    const decodedRelPath = decodeURIComponent(url).replace(/^\//, '');
    const fullPath = path.join(PUBLIC_DIR, decodedRelPath);
    return fs.existsSync(fullPath);
  });
}

describe('56-Language-Pair Matrix Audit (Translations, Numbers, UI Chrome & Neural Audio)', () => {
  it('verifies every target-language curriculum item has a physical neural MP3 file on disk', () => {
    const missingTargetAudio: string[] = [];

    for (const lang of LANGUAGES) {
      const data = DATA_BY_LANG[lang];

      // 1. Alphabet letters & example words
      for (const item of data.alphabet) {
        const letterCandidates = getCandidateAudioPathsForText(
          item.letter.toLowerCase(),
          lang,
          'alphabet'
        );
        if (!diskFileExistsForCandidates(letterCandidates)) {
          missingTargetAudio.push(`[${lang}/alphabet] "${item.letter}" -> ${letterCandidates[0]}`);
        }

        const exampleWord = item.russianWord || item.word;
        if (exampleWord) {
          const exCandidates = getCandidateAudioPathsForText(exampleWord, lang, 'examples');
          if (!diskFileExistsForCandidates(exCandidates)) {
            missingTargetAudio.push(`[${lang}/examples] "${exampleWord}" -> ${exCandidates[0]}`);
          }
        }
      }

      // 2. Phrases, Words, Numbers, Time
      const sections: Array<{
        key: 'basicPhrases' | 'commonWords' | 'numbers' | 'time';
        audioCat: 'phrases' | 'words' | 'numbers' | 'time';
      }> = [
        { key: 'basicPhrases', audioCat: 'phrases' },
        { key: 'commonWords', audioCat: 'words' },
        { key: 'numbers', audioCat: 'numbers' },
        { key: 'time', audioCat: 'time' },
      ];

      for (const { key, audioCat } of sections) {
        const items = data[key] || [];
        for (const item of items) {
          const targetText = (item.russian || item.phrase || item.target || '').toString();
          const candidates = getCandidateAudioPathsForText(targetText, lang, audioCat);
          if (!diskFileExistsForCandidates(candidates)) {
            missingTargetAudio.push(`[${lang}/${audioCat}] "${targetText}" -> ${candidates[0]}`);
          }
        }
      }
    }

    expect(missingTargetAudio).toEqual([]);
  });

  it('verifies all 12 (baseLang -> targetLang) pairs resolve valid translations, preserve exact number digits, and have neural MP3s on disk', () => {
    const missingTranslatedAudio: string[] = [];
    const numberMismatches: string[] = [];

    for (const baseLang of LANGUAGES) {
      for (const targetLang of LANGUAGES) {
        if (baseLang === targetLang) continue;

        const data = DATA_BY_LANG[targetLang];

        // Check alphabet example word translations & audio
        for (const item of data.alphabet) {
          const translatedMeaning = resolveTranslation(item, targetLang, baseLang);
          expect(translatedMeaning.trim().length).toBeGreaterThan(0);

          const candidates = getCandidateAudioPathsForText(translatedMeaning, baseLang);
          if (!diskFileExistsForCandidates(candidates)) {
            missingTranslatedAudio.push(
              `[${baseLang}<-${targetLang} alphabet] "${item.word || item.russianWord}" -> "${translatedMeaning}" (${candidates[0]})`
            );
          }
        }

        // Check numbers preserve exact numeric value (0..1000) and have audio
        for (const item of data.numbers) {
          const rawSource = (
            item.english ||
            item.translation ||
            item.phrase ||
            item.russian ||
            ''
          ).toString();
          const expectedDigit = extractDigit(rawSource);
          const translated = resolveTranslation(item, targetLang, baseLang);
          const actualDigit = extractDigit(translated);

          if (expectedDigit !== actualDigit) {
            numberMismatches.push(
              `[${baseLang}<-${targetLang}] "${rawSource}" expected digit ${expectedDigit}, got "${translated}" (${actualDigit})`
            );
          }

          const candidates = getCandidateAudioPathsForText(translated, baseLang);
          if (!diskFileExistsForCandidates(candidates)) {
            missingTranslatedAudio.push(
              `[${baseLang}<-${targetLang} numbers] "${rawSource}" -> "${translated}" (${candidates[0]})`
            );
          }
        }

        // Check basicPhrases, commonWords, and time translations & audio
        for (const sectionKey of ['basicPhrases', 'commonWords', 'time'] as const) {
          const items = data[sectionKey] || [];
          for (const item of items) {
            const translated = resolveTranslation(item, targetLang, baseLang);
            expect(translated.trim().length).toBeGreaterThan(0);

            const candidates = getCandidateAudioPathsForText(translated, baseLang);
            if (!diskFileExistsForCandidates(candidates)) {
              missingTranslatedAudio.push(
                `[${baseLang}<-${targetLang} ${sectionKey}] "${item.phrase || item.russian}" -> "${translated}" (${candidates[0]})`
              );
            }
          }
        }
      }
    }

    expect(numberMismatches).toEqual([]);
    expect(missingTranslatedAudio).toEqual([]);
  });

  it('verifies page headings, alphabet labels, and component chrome exist for every language pair', () => {
    const sections = ['alphabet', 'phrases', 'words', 'numbers', 'time'] as const;

    for (const baseLang of LANGUAGES) {
      const alphaLabels = getAlphabetLabels(baseLang);
      expect(alphaLabels.sound).toBeTruthy();
      expect(alphaLabels.example).toBeTruthy();
      expect(alphaLabels.asIn).toBeTruthy();
      // Ensure no space before colon that could wrap onto a new line
      expect(alphaLabels.sound.endsWith(' :')).toBe(false);
      expect(alphaLabels.example.endsWith(' :')).toBe(false);

      const chrome = getComponentChrome(baseLang);
      expect(chrome.audioSpeedLabel).toBeTruthy();
      expect(chrome.progressModalTitle).toBeTruthy();
      expect(chrome.signIn).toBeTruthy();

      for (const targetLang of LANGUAGES) {
        expect(getLocalizedAppName(targetLang, baseLang, 'Basic Language')).toBeTruthy();
        for (const sec of sections) {
          const content = getPageContent(sec, targetLang, baseLang);
          expect(content.title.trim().length).toBeGreaterThan(0);
          expect(content.subtitle.trim().length).toBeGreaterThan(0);
        }
      }
    }
  });
});
