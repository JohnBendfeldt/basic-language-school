import fs from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '../contexts/LanguageContext';
import NumbersAndTime from '../components/NumbersAndTime';
import { getCandidateAudioPathsForText } from '../components/PronunciationButton';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { SupportedLanguageId } from '../data/languages/types';
import { NUMBER_TABLE, extractDigit, resolveTranslation } from '../utils/translationResolver';

const PUBLIC_DIR = path.resolve(__dirname, '../../public');
const ALL = Object.keys(SUPPORTED_LANGUAGES) as SupportedLanguageId[];
const NATIVE_NUMBER_LANGS: SupportedLanguageId[] = ['ja', 'ko', 'bn', 'ur'];

const hasAudio = (text: string, lang: SupportedLanguageId, category?: 'numbers') =>
  getCandidateAudioPathsForText(text, lang, category).some((p) =>
    fs.existsSync(path.join(PUBLIC_DIR, decodeURIComponent(p).replace(/^\//, '')))
  );

const targetOf = (p: { phrase?: string; russian?: string; target?: string }) => (p.phrase ?? p.russian ?? p.target ?? '').toString();

// A few languages keep time expressions ("Two o'clock") at the end of their numbers list. Those are
// checked by their own test below; the number checks only cover rows that are actual numbers.
const realNumbers = (lang: SupportedLanguageId) =>
  SUPPORTED_LANGUAGES[lang].data.numbers.filter((p) => (p as { category?: string }).category !== 'Time');

describe('Numbers page: every number can be heard in every language', () => {
  it.each(ALL)('%s: each number in the curriculum has a studio recording', (lang) => {
    const missing = realNumbers(lang)
      .map(targetOf)
      .filter((word) => !hasAudio(word, lang, 'numbers'));
    expect(missing).toEqual([]);
  });

  it.each(ALL)('%s: the revealed translation resolves for every other base language', (target) => {
    const problems: string[] = [];
    for (const item of realNumbers(target)) {
      for (const base of ALL) {
        if (base === target) continue;
        const meaning = resolveTranslation(item, target, base);
        if (!meaning.trim()) problems.push(`${base}<-${target}: "${targetOf(item)}" has no meaning`);
        const digit = extractDigit(meaning);
        if (digit === null) problems.push(`${base}<-${target}: "${targetOf(item)}" -> "${meaning}" lost its digit`);
      }
    }
    expect(problems.slice(0, 15)).toEqual([]);
  });

  it.each(ALL)('%s as the learner language: the number meaning can be heard (or falls back to browser speech cleanly)', (base) => {
    const missing: string[] = [];
    for (const target of ALL) {
      if (target === base) continue;
      for (const item of realNumbers(target)) {
        const meaning = resolveTranslation(item, target, base);
        if (!hasAudio(meaning, base)) missing.push(`${target}->${base}: ${meaning}`);
      }
    }
    // Report how many revealed translations would use browser speech instead of a studio recording
    expect(missing, `${missing.length} translated numbers without a recording, e.g. ${missing.slice(0, 5).join(' | ')}`).toEqual([]);
  });
});

describe('Numbers page: time expressions that live in a numbers list', () => {
  const timeRows = SUPPORTED_LANGUAGES.en.data.numbers.filter((p) => (p as { category?: string }).category === 'Time');

  it('English keeps its time rows tagged as Time so the Time tab can pick them up', () => {
    expect(timeRows.length).toBeGreaterThan(0);
  });

  it.each(ALL.filter((l) => l !== 'en'))('%s speakers get every English time phrase in their own language', (base) => {
    const untranslated = timeRows
      .filter((row) => {
        const meaning = resolveTranslation(row, 'en', base);
        const english = String(row.meaning ?? row.translation ?? '');
        return !meaning.trim() || meaning === english || meaning === targetOf(row);
      })
      .map(targetOf);
    expect(untranslated).toEqual([]);
  });

  it('never translates "Two o\'clock" as the object "clock"', () => {
    const row = timeRows.find((r) => targetOf(r).startsWith('Two o'))!;
    for (const base of ['ko', 'ja', 'zh'] as const) {
      expect(resolveTranslation(row, 'en', base)).toContain('2');
    }
  });
});

describe('Numbers page: Japanese, Korean, Bengali and Urdu', () => {
  const renderPage = (target: SupportedLanguageId, base: SupportedLanguageId) => {
    localStorage.setItem('basic_language_base_lang', base);
    localStorage.setItem('basic_language_target_lang', target);
    render(
      <LanguageProvider>
        <NumbersAndTime numbersData={SUPPORTED_LANGUAGES[target].data.numbers} activeTab="numbers" onTabChange={() => {}} />
      </LanguageProvider>
    );
  };

  it.each(NATIVE_NUMBER_LANGS)('%s: shows one card per number with its own digit badge', (lang) => {
    renderPage(lang, 'en');
    const cards = document.querySelectorAll('.phrase-card-number');
    expect(cards).toHaveLength(SUPPORTED_LANGUAGES[lang].data.numbers.length);
    expect(document.querySelectorAll('.phrase-number-pill').length).toBeGreaterThanOrEqual(realNumbers(lang).length);
  });

  it.each(NATIVE_NUMBER_LANGS)('%s: each card pronounces the native number word', (lang) => {
    renderPage(lang, 'en');
    const words = SUPPORTED_LANGUAGES[lang].data.numbers.map(targetOf);
    for (const word of words) {
      expect(screen.getByLabelText(`Pronounce number ${word}`), word).toBeInTheDocument();
    }
  });

  it.each(NATIVE_NUMBER_LANGS)('%s: revealing a card shows "digit (word)" in the learner language', (lang) => {
    renderPage(lang, 'en');
    const first = SUPPORTED_LANGUAGES[lang].data.numbers.find((p) => extractDigit(String(p.translation)) === 7)!;
    fireEvent.click(screen.getByLabelText(`Reveal translation for ${targetOf(first)}`));
    expect(screen.getByText(`7 (${NUMBER_TABLE[7].en})`)).toBeInTheDocument();
  });

  it.each(NATIVE_NUMBER_LANGS)('%s speakers see the numbers page in their own language when learning Spanish', (base) => {
    renderPage('es', base);
    const first = SUPPORTED_LANGUAGES.es.data.numbers.find((p) => extractDigit(String(p.translation)) === 15)!;
    fireEvent.click(screen.getByLabelText(`Reveal translation for ${targetOf(first)}`));
    expect(screen.getByText(`15 (${NUMBER_TABLE[15][base]})`)).toBeInTheDocument();
  });
});

