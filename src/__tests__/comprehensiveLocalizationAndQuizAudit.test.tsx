import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { SupportedLanguageId } from '../data/languages/types';
import { ABOUT_LANGUAGES } from '../data/languages/aboutLanguageData';
import { getLocalizedAboutProfile } from '../data/languages/aboutTranslations';
import { resolveTranslation } from '../utils/translationResolver';
import { getAlphabetAcceptedAnswers } from '../utils/alphabetAnswers';
import { getGrammarForLanguage } from '../data/languages/grammarData';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import MobileDrawer from '../components/MobileDrawer';
import Quiz from '../components/Quiz';

const ALL_LANGS: SupportedLanguageId[] = [
  'en', 'es', 'fr', 'de', 'pt', 'ru', 'id', 'tr',
  'zh', 'ja', 'ko', 'hi', 'ar', 'bn', 'ur'
];

const NON_LATIN: SupportedLanguageId[] = ['ru', 'zh', 'ja', 'ko', 'hi', 'ar', 'bn', 'ur'];

// Script-neutral international loanwords/abbreviations acceptable in ASCII across scripts
const ALLOWED_ASCII_TOKENS = /^(OK|Wi-Fi|DNA|TV|ID|ATM|GPS|USB|PDF|VIP|APP|App|Email|E-mail|Internet|Taxi|Hotel|Menu|Bus|Metro|Radio|Video|Pizza|Coffee|Cafe|Café)$/i;

describe('Comprehensive Non-Anglo-Centric Localization, Pickers, Time Data & Quiz Audit', () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.pushState({}, '', '/');
  });

  it('contains zero raw LaTeX commands (e.g. $\\rightarrow$) across all 15 About profiles, 210 localized About overlays, and Grammar data', () => {
    const latexLeaks: string[] = [];
    const latexRegex = /\$\\|\\rightarrow|\\leftarrow|\\leftrightarrow/;

    for (const target of ALL_LANGS) {
      const rawAbout = JSON.stringify(ABOUT_LANGUAGES[target]);
      if (latexRegex.test(rawAbout)) {
        latexLeaks.push(`ABOUT_LANGUAGES.${target}`);
      }
      for (const base of ALL_LANGS) {
        const locAbout = JSON.stringify(getLocalizedAboutProfile(target, base));
        if (latexRegex.test(locAbout)) {
          latexLeaks.push(`getLocalizedAboutProfile(${target}, ${base})`);
        }
        const gram = JSON.stringify(getGrammarForLanguage(target, base));
        if (latexRegex.test(gram)) {
          latexLeaks.push(`getGrammarForLanguage(${target}, ${base})`);
        }
      }
    }

    expect(latexLeaks).toEqual([]);
  });

  it.each(ALL_LANGS)('%s: Telling Time contains only genuine time/calendar expressions across all 15 languages', (lang) => {
    const timeItems = lang === 'en'
      ? (SUPPORTED_LANGUAGES.en.data.numbers || []).filter(i => i.category === 'Time')
      : (SUPPORTED_LANGUAGES[lang].data.time || []);
    expect(timeItems.length).toBeGreaterThan(0);

    const badItems: string[] = [];
    for (const item of timeItems) {
      const cat = (item.category || '').toString();
      if (/Food|Drink|Dining|Home|Places|Travel|Nature|Health|People|Tech|Business|Shopping|Colors|Family/i.test(cat)) {
        badItems.push(`[${lang}] bad category "${cat}" on "${item.phrase || item.russian || item.english}"`);
      }
    }
    expect(badItems).toEqual([]);
  });

  it('localizes every field of Origins & History (facts values, timeline descriptions, traits, cultural notes) across all 210 non-English pairs', () => {
    const leaks: string[] = [];

    for (const baseLang of ALL_LANGS.filter(l => l !== 'en')) {
      for (const targetLang of ALL_LANGS) {
        const enProf = getLocalizedAboutProfile(targetLang, 'en');
        const locProf = getLocalizedAboutProfile(targetLang, baseLang);
        if (!enProf || !locProf) {
          leaks.push(`Missing profile for ${baseLang}->${targetLang}`);
          continue;
        }

        if (locProf.title === enProf.title) leaks.push(`${baseLang}->${targetLang} title`);
        if (locProf.tagline === enProf.tagline) leaks.push(`${baseLang}->${targetLang} tagline`);
        if (locProf.culturalNote === enProf.culturalNote) leaks.push(`${baseLang}->${targetLang} culturalNote`);

        locProf.historyTimeline.forEach((m, idx) => {
          const enM = enProf.historyTimeline[idx];
          if (enM && m.description === enM.description) {
            leaks.push(`${baseLang}->${targetLang} timeline[${idx}].description`);
          }
        });

        locProf.linguisticTraits.forEach((t, idx) => {
          const enT = enProf.linguisticTraits[idx];
          if (enT && t.description === enT.description) {
            leaks.push(`${baseLang}->${targetLang} trait[${idx}].description`);
          }
        });
      }
    }

    expect(leaks).toEqual([]);
  });

  it.each(NON_LATIN)('%s: resolves all 15 target courses (including Spanish for Mandarin speakers) without English fallbacks', (baseLang) => {
    const leaks: string[] = [];

    for (const targetLang of ALL_LANGS) {
      if (targetLang === baseLang) continue;
      const tData = SUPPORTED_LANGUAGES[targetLang].data;

      for (const section of ['basicPhrases', 'commonWords', 'numbers', 'time'] as const) {
        for (const item of tData[section] || []) {
          const resolved = resolveTranslation(item as any, targetLang, baseLang);
          if (/^[a-zA-Z\s,.'?!/-]+$/.test(resolved) && !ALLOWED_ASCII_TOKENS.test(resolved.trim())) {
            leaks.push(`${targetLang}->${baseLang} [${section}] "${item.phrase || item.russian}" (en: "${item.english || item.translation}") -> "${resolved}"`);
          }
        }
      }
    }

    expect(leaks.slice(0, 40)).toEqual([]);
    expect(leaks.length).toBe(0);
  });

  it('Spanish Quiz for Mandarin speakers (zh -> es) rejects English answers across Phrases, Listening, Numbers, and Alphabet', () => {
    // 1. Alphabet: Spanish J ('jota') must NOT accept English letter name 'jay', W must NOT accept 'double you', H must NOT accept 'silent'/'aitch'
    const esJAnswers = getAlphabetAcceptedAnswers('J', '/xota/', 'es', 'zh');
    expect(esJAnswers).toContain('jota');
    expect(esJAnswers).not.toContain('jay');

    const esWAnswers = getAlphabetAcceptedAnswers('W', 'doble ve', 'es', 'zh');
    expect(esWAnswers).not.toContain('double you');

    const esHAnswers = getAlphabetAcceptedAnswers('H', 'silent /atʃe/', 'es', 'zh');
    expect(esHAnswers).toContain('hache');
    expect(esHAnswers).toContain('muda');
    expect(esHAnswers).toContain('不发音');
    expect(esHAnswers).not.toContain('silent');
    expect(esHAnswers).not.toContain('aitch');

    // 2. Writing Mode (zh -> es): English "Hello" MUST fail, while Mandarin "你好" (Target->Base) or Spanish "Hola" (Base->Target) succeeds!
    localStorage.setItem('basic_language_base_lang', 'zh');
    localStorage.setItem('basic_language_target_lang', 'es');
    localStorage.setItem('basic_quiz_mode', 'writing');
    localStorage.setItem('basic_quiz_mode_es', 'writing');
    window.history.pushState({}, '', '/learn/es/quiz');

    const { unmount } = render(
      <LanguageProvider>
        <Quiz
          data={{
            alphabet: [],
            basicPhrases: [{ phrase: 'Hola', english: 'Hello', pronunciation: 'oh-lah', category: 'Greetings' }],
            numbers: [],
            commonWords: [],
            time: []
          }}
        />
      </LanguageProvider>
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(screen.getByRole('button', { name: '检查答案' }));

    // English "Hello" must NEVER be accepted when Mandarin speaker is quizzed on Spanish "Hola"!
    expect(document.querySelector('.quiz-feedback-drawer.feedback-incorrect')).toBeTruthy();
    expect(document.querySelector('.quiz-feedback-drawer.feedback-correct')).toBeFalsy();
    unmount();

    // Also verify English slang/synonyms ("nope") do NOT match Spanish "No" in zh -> es
    const { unmount: unmountNope } = render(
      <LanguageProvider>
        <Quiz
          data={{
            alphabet: [],
            basicPhrases: [{ phrase: 'No', english: 'No', pronunciation: 'noh', category: 'Greetings' }],
            numbers: [],
            commonWords: [],
            time: []
          }}
        />
      </LanguageProvider>
    );
    const nopeInput = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(nopeInput, { target: { value: 'nope' } });
    fireEvent.click(screen.getByRole('button', { name: '检查答案' }));
    expect(document.querySelector('.quiz-feedback-drawer.feedback-incorrect')).toBeTruthy();
    unmountNope();

    // 3. Numbers Quiz (zh -> es): Spanish "Quince" (15) rejects English "fifteen" and accepts Mandarin "十五"!
    localStorage.setItem('basic_language_base_lang', 'zh');
    localStorage.setItem('basic_language_target_lang', 'es');
    localStorage.setItem('basic_quiz_mode', 'listening');
    localStorage.setItem('basic_quiz_mode_es', 'listening');

    const { unmount: unmountNum } = render(
      <LanguageProvider>
        <Quiz
          data={{
            alphabet: [],
            basicPhrases: [],
            numbers: [{ phrase: 'Quince', english: '15 (Fifteen)', pronunciation: 'keen-seh', category: 'Numbers' }],
            commonWords: [],
            time: []
          }}
        />
      </LanguageProvider>
    );

    const numInput = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(numInput, { target: { value: 'fifteen' } });
    fireEvent.click(screen.getByRole('button', { name: '检查答案' }));

    expect(document.querySelector('.quiz-feedback-drawer.feedback-incorrect')).toBeTruthy();
    expect(document.querySelector('.quiz-feedback-drawer.feedback-correct')).toBeFalsy();
    unmountNum();

    // Now verify "十五" IS accepted in zh -> es listening mode!
    const { unmount: unmountNumValid } = render(
      <LanguageProvider>
        <Quiz
          data={{
            alphabet: [],
            basicPhrases: [],
            numbers: [{ phrase: 'Quince', english: '15 (Fifteen)', pronunciation: 'keen-seh', category: 'Numbers' }],
            commonWords: [],
            time: []
          }}
        />
      </LanguageProvider>
    );
    const validNumInput = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(validNumInput, { target: { value: '十五' } });
    fireEvent.click(screen.getByRole('button', { name: '检查答案' }));
    expect(document.querySelector('.quiz-feedback-drawer.feedback-correct')).toBeTruthy();
    unmountNumValid();
  });

  it('both language pickers ("I speak" & "I want to learn") + Quick Swap + Mobile Drawer switch cleanly', async () => {
    const PairReadout: React.FC = () => {
      const { baseLanguage, targetLanguage, ui } = useLanguage();
      return <div data-testid="pair-state">{`${baseLanguage}->${targetLanguage}:${ui.quiz}`}</div>;
    };

    localStorage.setItem('basic_language_base_lang', 'en');
    localStorage.setItem('basic_language_target_lang', 'es');

    let latestUrlLang = '';
    const t0 = performance.now();
    await act(async () => {
      render(
        <LanguageProvider>
          <LanguageSwitcher onLanguageChange={(l) => { latestUrlLang = l; }} />
          <MobileDrawer
            isOpen={true}
            onClose={() => {}}
            onNavigate={() => {}}
            onLanguageChange={(l) => { latestUrlLang = l; }}
          />
          <PairReadout />
        </LanguageProvider>
      );
    });

    expect(screen.getByTestId('pair-state').textContent).toContain('en->es');

    // 1. Switch "I speak" picker to Mandarin (zh) -> keeps Spanish (es) as target!
    fireEvent.click(screen.getByRole('button', { name: /Current language pair/i }));
    const dialog = screen.getByRole('dialog', { name: 'Language selection modal' });
    fireEvent.click(within(dialog).getByRole('button', { name: /I speak/i }));
    fireEvent.click(within(dialog).getByRole('menuitem', { name: /Mandarin Chinese/i }));
    expect(screen.getByTestId('pair-state').textContent).toBe('zh->es:练习测验');

    // 2. Switch "I want to learn" picker to French (fr) -> closes modal, pair is zh->fr!
    fireEvent.click(within(dialog).getByRole('button', { name: /想学语言/i }));
    fireEvent.click(within(dialog).getByRole('menuitem', { name: /法语/i }));
    expect(screen.getByTestId('pair-state').textContent).toBe('zh->fr:练习测验');
    expect(latestUrlLang).toBe('fr');

    // 3. Header Quick Swap button flips zh->fr to fr->zh
    const headerSwapBtn = document.querySelector('.quick-swap-nav-btn') as HTMLButtonElement;
    expect(headerSwapBtn).toBeTruthy();
    fireEvent.click(headerSwapBtn);
    expect(screen.getByTestId('pair-state').textContent).toContain('fr->zh:');
    expect(latestUrlLang).toBe('zh');

    // 4. MobileDrawer swap button flips fr->zh back to zh->fr and syncs URL callback!
    const drawerDialog = screen.getByRole('dialog', { name: 'Settings and options menu' });
    fireEvent.click(within(drawerDialog).getByRole('button', { name: 'Swap language pair' }));
    expect(screen.getByTestId('pair-state').textContent).toBe('zh->fr:练习测验');
    expect(latestUrlLang).toBe('fr');

    const elapsedMs = performance.now() - t0;
    expect(elapsedMs).toBeLessThan(2500);
  });
});
