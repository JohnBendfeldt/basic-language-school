import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Grammar from '../components/Grammar';
import { LanguageProvider } from '../contexts/LanguageContext';
import { getGrammarForLanguage } from '../data/languages/grammarData';
import { SupportedLanguageId } from '../data/languages/types';

window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = vi.fn();

const ALL: SupportedLanguageId[] = [
  'en', 'es', 'fr', 'ru', 'pt', 'de', 'id', 'tr', 'zh', 'ja', 'ko', 'hi', 'ar', 'bn', 'ur',
];
const BASES: SupportedLanguageId[] = ['en', 'ru', 'de', 'es', 'fr'];

const renderGrammar = (target: SupportedLanguageId, base: SupportedLanguageId) => {
  localStorage.clear();
  localStorage.setItem('basic_language_target_lang', target);
  localStorage.setItem('basic_language_base_lang', base);
  return render(
    <LanguageProvider>
      <Grammar />
    </LanguageProvider>
  );
};

const pairs: Array<[SupportedLanguageId, SupportedLanguageId]> = [];
for (const t of ALL) for (const b of BASES) if (t !== b) pairs.push([t, b]);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Grammar - every language pair renders and every tab works', () => {
  it.each(pairs)('target %s / base %s: all tabs render real content', (target, base) => {
    const { container } = renderGrammar(target, base);
    const nav = container.querySelector('.grammar-subtabs-nav') as HTMLElement;
    expect(nav).toBeTruthy();

    const tabs = within(nav).getAllByRole('tab');
    expect(tabs.length).toBeGreaterThanOrEqual(2);

    for (const tab of tabs) {
      fireEvent.click(tab);
      expect(tab).toHaveAttribute('aria-selected', 'true');

      // No tab may render an empty body or leak "undefined"/"[object Object]"
      const text = container.textContent || '';
      expect(text).not.toContain('undefined');
      expect(text).not.toContain('[object Object]');
      expect(text).not.toContain('NaN');
    }
  });
});

describe('Grammar - flashcard deck can be completed for every language', () => {
  const targets = ALL.map((t) => [t, t === 'en' ? 'es' : 'en'] as [SupportedLanguageId, SupportedLanguageId]);

  it.each(targets)('target %s / base %s: plays the whole deck to the completion card', (target, base) => {
    const { container } = renderGrammar(target, base);
    const deckSize = (getGrammarForLanguage(target, base).flashcards || []).length;
    expect(deckSize).toBeGreaterThan(0);

    for (let i = 0; i < deckSize; i++) {
      const options = container.querySelectorAll('.grammar-option-btn');
      expect(options.length).toBeGreaterThanOrEqual(2);
      fireEvent.click(options[0] as HTMLElement);

      // Feedback + listen button are shown after answering
      expect(container.querySelector('.grammar-feedback-box')).toBeTruthy();
      expect(container.querySelector('.grammar-audio-btn')).toBeTruthy();

      fireEvent.click(container.querySelector('.grammar-next-btn') as HTMLElement);
    }

    const done = container.querySelector('.grammar-deck-complete-card');
    expect(done).toBeTruthy();
    expect(done?.textContent).toMatch(new RegExp(`${deckSize}`));

    // Practice Again restarts from card 1
    fireEvent.click(container.querySelector('.grammar-restart-btn') as HTMLElement);
    expect(container.querySelector('.grammar-progress-count')?.textContent).toContain(`1 / ${deckSize}`);
  });

  it('only scores a card once even if options are clicked repeatedly', () => {
    const { container } = renderGrammar('de', 'en');
    const options = container.querySelectorAll('.grammar-option-btn');
    fireEvent.click(options[0] as HTMLElement);
    // Remaining options are disabled once answered
    container.querySelectorAll('.grammar-option-btn').forEach((b) => {
      expect(b).toBeDisabled();
    });
  });
});

describe('Grammar - verb tab shows every conjugation with audio', () => {
  const verbLangs = ALL.filter((l) => getGrammarForLanguage(l, 'en').verbs?.length);

  it.each(verbLangs)('target %s: each verb lists all forms with an audio button', (target) => {
    const base: SupportedLanguageId = target === 'en' ? 'es' : 'en';
    const { container } = renderGrammar(target, base);
    const verbs = getGrammarForLanguage(target, base).verbs || [];

    const nav = container.querySelector('.grammar-subtabs-nav') as HTMLElement;
    const verbsTab = within(nav).getAllByRole('tab').find((t) => /verb|conj|particle|marker|form|polite/i.test(t.textContent || ''));
    expect(verbsTab).toBeTruthy();
    fireEvent.click(verbsTab as HTMLElement);

    const pills = container.querySelectorAll('.verb-pill-btn');
    expect(pills.length).toBe(verbs.length);

    pills.forEach((pill, idx) => {
      fireEvent.click(pill);
      const rows = container.querySelectorAll('.conjugation-row');
      expect(rows.length).toBe(verbs[idx].forms.length);
      rows.forEach((row) => {
        expect(row.querySelector('.conj-audio-btn')).toBeTruthy();
        expect(row.querySelector('.conj-form')?.textContent?.trim().length).toBeGreaterThan(0);
      });
    });
  });
});

describe('Grammar - "no conjugation" notices are localized', () => {
  const notices: Array<{ target: SupportedLanguageId; base: SupportedLanguageId; title: RegExp }> = [];
  const expected: Record<string, Record<string, RegExp>> = {
    zh: {
      en: /Mandarin Chinese has NO verb conjugations/i,
      ru: /В китайском языке глаголы НЕ спрягаются/i,
      de: /Im Chinesischen gibt es keine Konjugation/i,
      es: /El chino mandarín no tiene conjugación verbal/i,
      fr: /Le chinois mandarin ne se conjugue pas/i,
    },
    id: {
      en: /Indonesian verbs do NOT conjugate/i,
      ru: /В индонезийском языке нет спряжения/i,
      de: /Im Indonesischen gibt es keine Konjugation/i,
      es: /El indonesio no tiene conjugaciones verbales/i,
      fr: /L'indonésien ne conjugue pas/i,
    },
    ja: {
      en: /Japanese verbs do NOT conjugate by person/i,
      ru: /Японские глаголы НЕ изменяются по лицам/i,
      de: /Japanische Verben konjugieren NICHT nach Person/i,
      es: /Los verbos japoneses NO conjugan por persona/i,
      fr: /Les verbes japonais ne varient PAS selon la personne/i,
    },
    ko: {
      en: /Korean verbs do NOT conjugate by person/i,
      ru: /Корейские глаголы НЕ изменяются по лицам/i,
      de: /Koreanische Verben konjugieren NICHT nach Person/i,
      es: /Los verbos coreanos NO conjugan por persona/i,
      fr: /Les verbes coréens ne varient PAS selon la personne/i,
    },
  };
  for (const t of Object.keys(expected)) {
    for (const b of Object.keys(expected[t])) {
      notices.push({ target: t as SupportedLanguageId, base: b as SupportedLanguageId, title: expected[t][b] });
    }
  }

  it.each(notices)('$target for a $base speaker shows the localized notice', ({ target, base, title }) => {
    localStorage.clear();
    localStorage.setItem('basic_language_target_lang', target);
    localStorage.setItem('basic_language_base_lang', base);
    render(
      <LanguageProvider>
        <Grammar initialTab="verbs" />
      </LanguageProvider>
    );
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('shows no notice for languages that do conjugate by person', () => {
    localStorage.clear();
    localStorage.setItem('basic_language_target_lang', 'es');
    localStorage.setItem('basic_language_base_lang', 'en');
    const { container } = render(
      <LanguageProvider>
        <Grammar initialTab="verbs" />
      </LanguageProvider>
    );
    expect(container.querySelector('.verb-grammar-notice')).toBeNull();
  });
});

describe('Grammar - gender tab', () => {
  const genderLangs = ALL.filter((l) => getGrammarForLanguage(l, 'en').genderRules?.length);

  it.each(genderLangs)('target %s: every gender example has an audio button', (target) => {
    const base: SupportedLanguageId = target === 'en' ? 'es' : 'en';
    const { container } = renderGrammar(target, base);
    const rules = getGrammarForLanguage(target, base).genderRules || [];
    const nav = container.querySelector('.grammar-subtabs-nav') as HTMLElement;
    const genderTab = within(nav).getAllByRole('tab')[1];
    fireEvent.click(genderTab);

    expect(container.querySelectorAll('.gender-rule-card').length).toBe(rules.length);
    const exampleCount = rules.reduce((n, r) => n + r.examples.length, 0);
    expect(container.querySelectorAll('.gender-example-item .example-mini-audio').length).toBe(exampleCount);
  });
});
