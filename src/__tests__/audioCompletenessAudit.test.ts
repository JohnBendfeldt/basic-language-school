import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { getCandidateAudioPathsForText } from '../components/PronunciationButton';
import { resolveTranslation } from '../utils/translationResolver';
import { koreanData } from '../data/languages/ko/koreanData';
import { japaneseData } from '../data/languages/ja/japaneseData';
import russianData from '../data/languages/ru/russianData';
import englishData from '../data/languages/en/englishData';
import spanishData from '../data/languages/es/spanishData';
import frenchData from '../data/languages/fr/frenchData';
import germanData from '../data/languages/de/germanData';
import portugueseData from '../data/languages/pt/portugueseData';
import indonesianData from '../data/languages/id/indonesianData';
import turkishData from '../data/languages/tr/turkishData';
import { chineseData } from '../data/languages/zh/chineseData';
import { hindiData } from '../data/languages/hi/hindiData';
import { arabicData } from '../data/languages/ar/arabicData';
import { bengaliData } from '../data/languages/bn/bengaliData';
import { urduData } from '../data/languages/ur/urduData';
import { SupportedLanguageId } from '../data/languages/types';


const diskFileExists = (candidatePaths: string[]): boolean => {
  return candidatePaths.some(p => {
    const decoded = decodeURIComponent(p);
    const rel = decoded.replace(/^\//, '');
    const full = path.resolve(__dirname, '../../public', rel);
    return fs.existsSync(full);
  });
};

describe('Comprehensive Audio Coverage & Translation Audit', () => {
  it('correctly resolves Rice cake (not Rice) for Korean 떡 and has studio audio on disk', () => {
    // 1. Translation accuracy
    const ttItem = koreanData.alphabet.find(a => a.letter === 'ㄸ');
    expect(ttItem).toBeDefined();
    expect(ttItem?.word).toBe('떡');
    expect(ttItem?.meaning).toBe('Rice cake');

    const englishMeaning = resolveTranslation(ttItem!, 'ko', 'en');
    expect(englishMeaning).toBe('Rice cake');

    // 2. Korean audio exists on disk
    const koPaths = getCandidateAudioPathsForText(ttItem!.word!, 'ko', 'examples');
    expect(diskFileExists(koPaths)).toBe(true);

    // 3. English translation audio exists on disk
    const enPaths = getCandidateAudioPathsForText(englishMeaning, 'en', 'words');
    expect(diskFileExists(enPaths)).toBe(true);
  });

  it('guarantees physical studio audio for Bridge (다리) and Banana (바나나)', () => {
    // Bridge
    const bridgeItem = koreanData.alphabet.find(a => a.word === '다리');
    expect(bridgeItem).toBeDefined();
    const bridgeMeaning = resolveTranslation(bridgeItem!, 'ko', 'en');
    expect(bridgeMeaning).toBe('Bridge');

    const bridgeKoPaths = getCandidateAudioPathsForText('다리', 'ko', 'examples');
    expect(diskFileExists(bridgeKoPaths)).toBe(true);

    const bridgeEnPaths = getCandidateAudioPathsForText('Bridge', 'en', 'words');
    expect(diskFileExists(bridgeEnPaths)).toBe(true);

    // Banana
    const bananaItem = koreanData.alphabet.find(a => a.word === '바나나');
    expect(bananaItem).toBeDefined();
    const bananaMeaning = resolveTranslation(bananaItem!, 'ko', 'en');
    expect(bananaMeaning).toBe('Banana');

    const bananaKoPaths = getCandidateAudioPathsForText('바나나', 'ko', 'examples');
    expect(diskFileExists(bananaKoPaths)).toBe(true);

    const bananaEnPaths = getCandidateAudioPathsForText('Banana', 'en', 'words');
    expect(diskFileExists(bananaEnPaths)).toBe(true);
  });

  it('verifies all 15 languages have 100% physical audio on disk for alphabet letters and example words', () => {
    const courses: { id: SupportedLanguageId; data: any }[] = [
      { id: 'ru', data: russianData },
      { id: 'en', data: englishData },
      { id: 'es', data: spanishData },
      { id: 'fr', data: frenchData },
      { id: 'de', data: germanData },
      { id: 'pt', data: portugueseData },
      { id: 'id', data: indonesianData },
      { id: 'tr', data: turkishData },
      { id: 'ja', data: japaneseData },
      { id: 'ko', data: koreanData },
      { id: 'zh', data: chineseData },
      { id: 'hi', data: hindiData },
      { id: 'ar', data: arabicData },
      { id: 'bn', data: bengaliData },
      { id: 'ur', data: urduData },
    ];

    const missingLetters: string[] = [];
    const missingExamples: string[] = [];

    for (const { id, data } of courses) {
      if (!data || !data.alphabet) continue;

      for (const item of data.alphabet) {
        // Check letter audio
        const lowerLetter = id === 'tr'
          ? item.letter.replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase()
          : item.letter.toLowerCase();
        const letterPaths = getCandidateAudioPathsForText(lowerLetter, id, 'alphabet');
        if (!diskFileExists(letterPaths)) {
          missingLetters.push(`[${id}] letter: ${item.letter} (${letterPaths[0]})`);
        }

        // Check example word audio
        const exWord = item.russianWord || item.word;
        if (exWord) {
          const exPaths = getCandidateAudioPathsForText(exWord, id, 'examples');
          if (!diskFileExists(exPaths)) {
            missingExamples.push(`[${id}] word: ${exWord} (${exPaths[0]})`);
          }
        }
      }
    }

    expect(missingLetters).toEqual([]);
    expect(missingExamples).toEqual([]);
  });

  it('verifies all basic phrases across all 15 languages have studio audio files on disk', () => {
    const courses: { id: SupportedLanguageId; data: any }[] = [
      { id: 'ru', data: russianData },
      { id: 'en', data: englishData },
      { id: 'es', data: spanishData },
      { id: 'fr', data: frenchData },
      { id: 'de', data: germanData },
      { id: 'pt', data: portugueseData },
      { id: 'id', data: indonesianData },
      { id: 'tr', data: turkishData },
      { id: 'ja', data: japaneseData },
      { id: 'ko', data: koreanData },
      { id: 'zh', data: chineseData },
      { id: 'hi', data: hindiData },
      { id: 'ar', data: arabicData },
      { id: 'bn', data: bengaliData },
      { id: 'ur', data: urduData },
    ];

    const missingPhrases: string[] = [];

    for (const { id, data } of courses) {
      if (!data || !data.basicPhrases) continue;

      for (const item of data.basicPhrases) {
        const text = item.russian || item.phrase;
        if (text) {
          const paths = getCandidateAudioPathsForText(text, id, 'phrases');
          if (!diskFileExists(paths)) {
            missingPhrases.push(`[${id}] phrase: ${text} (${paths[0]})`);
          }
        }
      }
    }

    expect(missingPhrases).toEqual([]);
  });
});
