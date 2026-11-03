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
    expect(deckSize).toBeGreaterThanOrEqual(15);

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

describe('Grammar - flashcard option & prompt speaker buttons and full 15-language localization', () => {
  it('plays option audio without selecting the answer and keeps option audio clickable after answering', () => {
    const { container } = renderGrammar('de', 'en');
    const optionButtons = container.querySelectorAll('.grammar-option-btn');
    const optionAudioButtons = container.querySelectorAll('.grammar-option-audio-btn');

    expect(optionButtons.length).toBe(3);
    expect(optionAudioButtons.length).toBe(3);

    // Clicking option speaker button plays audio without submitting the card
    fireEvent.click(optionAudioButtons[0] as HTMLElement);
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
    expect(container.querySelector('.grammar-feedback-box')).toBeNull();
    optionButtons.forEach((btn) => {
      expect(btn).not.toBeDisabled();
    });

    // Prompt speaker button speaks non-spoiler stem ("Tisch") before answering
    const promptAudioBtnBefore = container.querySelector('.grammar-prompt-audio-btn') as HTMLElement;
    expect(promptAudioBtnBefore).toBeTruthy();
    expect(promptAudioBtnBefore.getAttribute('aria-label')).toBe('Pronounce Tisch');

    // Selecting an option disables .grammar-option-btn, switches prompt audio to full phrase, and keeps option audio enabled
    fireEvent.click(optionButtons[0] as HTMLElement);
    expect(container.querySelector('.grammar-feedback-box')).toBeTruthy();
    container.querySelectorAll('.grammar-option-btn').forEach((btn) => {
      expect(btn).toBeDisabled();
    });

    const promptAudioBtnAfter = container.querySelector('.grammar-prompt-audio-btn') as HTMLElement;
    expect(promptAudioBtnAfter.getAttribute('aria-label')).toBe('Pronounce der Tisch');

    const postAnswerOptionAudio = container.querySelectorAll('.grammar-option-audio-btn');
    expect(postAnswerOptionAudio[1]).not.toBeDisabled();
  });

  it('localizes all 226 flashcards across non-English base languages (zh, ur, ar, hi, ja, ko) without English leaks', () => {
    const nonLatinBases: SupportedLanguageId[] = ['zh', 'ur', 'ar', 'hi', 'ja', 'ko'];
    const englishLeakPattern = /\b(Plural of|Past tense of|Comparative degree|Which gender\?|is masculine|is feminine|takes the|correct verb form)\b/i;

    for (const base of nonLatinBases) {
      for (const target of ALL) {
        if (target === base) continue;
        const cards = getGrammarForLanguage(target, base).flashcards || [];
        expect(cards.length).toBeGreaterThanOrEqual(15);
        for (const card of cards) {
          expect(card.prompt).toBeTruthy();
          expect(card.explanation).toBeTruthy();
          expect(card.prompt).not.toContain('undefined');
          expect(card.explanation).not.toContain('undefined');
          expect(card.prompt).not.toMatch(englishLeakPattern);
          expect(card.explanation).not.toMatch(englishLeakPattern);
        }
      }
    }
  });

  it('plays correct.mp3 chime on right answer, incorrect.mp3 chime on wrong answer, and no chime on option speaker click', () => {
    const playedSources: string[] = [];
    const playSpy = vi
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(function (this: HTMLMediaElement) {
        playedSources.push(this.src || '');
        return Promise.resolve();
      });

    try {
      const { container } = renderGrammar('de', 'en');
      const optionButtons = Array.from(container.querySelectorAll('.grammar-option-btn')) as HTMLElement[];
      const optionSpeakers = Array.from(container.querySelectorAll('.grammar-option-audio-btn')) as HTMLElement[];

      // 1. Clicking an option speaker button plays word pronunciation only (no chime)
      fireEvent.click(optionSpeakers[0]);
      expect(playedSources.some((s) => s.includes('/audio/sounds/'))).toBe(false);

      // 2. Clicking correct option ("der" for "___ Tisch") plays /audio/sounds/correct.mp3
      playedSources.length = 0;
      const derBtn = optionButtons.find((b) => b.textContent?.trim() === 'der')!;
      fireEvent.click(derBtn);
      expect(playedSources.some((s) => s.endsWith('/audio/sounds/correct.mp3'))).toBe(true);
      expect(playedSources.some((s) => s.endsWith('/audio/sounds/incorrect.mp3'))).toBe(false);

      // 3. Advance to card 2 ("___ Katze" -> correct is "die") and click wrong option ("der") -> plays /audio/sounds/incorrect.mp3
      fireEvent.click(container.querySelector('.grammar-next-btn') as HTMLElement);
      playedSources.length = 0;
      const card2Options = Array.from(container.querySelectorAll('.grammar-option-btn')) as HTMLElement[];
      const wrongBtn = card2Options.find((b) => b.textContent?.trim() === 'der')!;
      fireEvent.click(wrongBtn);
      expect(playedSources.some((s) => s.endsWith('/audio/sounds/incorrect.mp3'))).toBe(true);
      expect(playedSources.some((s) => s.endsWith('/audio/sounds/correct.mp3'))).toBe(false);
    } finally {
      playSpy.mockRestore();
      window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
    }
  });
});
