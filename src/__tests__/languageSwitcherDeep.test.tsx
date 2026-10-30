import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import LanguageSwitcher, { LANGUAGE_REGION_MAP } from '../components/LanguageSwitcher';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { getLanguagePickerCopy, getLocalizedRegionName } from '../utils/pageDictionary';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { SupportedLanguageId } from '../data/languages/types';

const ALL = Object.keys(SUPPORTED_LANGUAGES) as SupportedLanguageId[];
const RECENT_KEY = 'basic_language_recent_pairs';

const Inspector: React.FC = () => {
  const { targetLanguage, baseLanguage } = useLanguage();
  return <output data-testid="pair">{`${baseLanguage}>${targetLanguage}`}</output>;
};

const setup = (base = 'en', target = 'es', onLanguageChange?: (id: SupportedLanguageId) => void) => {
  localStorage.setItem('basic_language_base_lang', base);
  localStorage.setItem('basic_language_target_lang', target);
  window.history.pushState({}, '', `/learn/${target}`);
  const utils = render(
    <LanguageProvider>
      <LanguageSwitcher onLanguageChange={onLanguageChange} />
      <Inspector />
    </LanguageProvider>
  );
  return { ...utils, pair: () => screen.getByTestId('pair').textContent };
};

const openPicker = () => fireEvent.click(screen.getByRole('button', { name: /Current language pair/i }));
const picker = () => screen.getByRole('dialog', { name: 'Language selection modal' });
const options = () => within(screen.getByRole('menu')).getAllByRole('menuitem');
const optionNames = () => options().map((o) => o.querySelector('.option-name')?.textContent);

describe('LanguageSwitcher - opening and closing', () => {
  beforeEach(() => vi.clearAllMocks());

  it('shows the current pair on the trigger and starts closed', () => {
    setup('en', 'es');
    expect(screen.getByRole('button', { name: /Current language pair: .* to .*/i })).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Current language pair/i })).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens the picker and locks page scrolling until it closes', () => {
    setup();
    openPicker();
    expect(picker()).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('closes with Escape and with a click on the backdrop, but not with a click inside', () => {
    setup();
    openPicker();
    fireEvent.click(picker());
    expect(picker()).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    openPicker();
    fireEvent.click(document.querySelector('.language-modal-backdrop')!);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes with the Done button', () => {
    setup();
    openPicker();
    fireEvent.click(screen.getByRole('button', { name: 'Confirm selection and close modal' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('LanguageSwitcher - dialog text is in the learner\'s language', () => {
  it.each(ALL)('%s: shows the translated subtitle and Done button', (base) => {
    setup(base, base === 'es' ? 'en' : 'es');
    openPicker();
    const copy = getLanguagePickerCopy(base);
    expect(within(picker()).getByText(copy.subtitle)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm selection and close modal' })).toHaveTextContent(copy.done);
  });

  it.each(['ja', 'ko', 'zh', 'hi', 'ar', 'bn', 'ur', 'ru'] as const)('%s: is not left in English', (base) => {
    expect(getLanguagePickerCopy(base).subtitle).not.toBe(getLanguagePickerCopy('en').subtitle);
    expect(getLanguagePickerCopy(base).done).not.toBe('Done');
  });

  it('falls back to English for an unknown language', () => {
    expect(getLanguagePickerCopy('xx' as SupportedLanguageId).done).toBe('Done');
  });
});

describe('LanguageSwitcher - choosing the language to learn', () => {
  it('lists every available language', () => {
    setup();
    openPicker();
    expect(options()).toHaveLength(ALL.length);
  });

  it('changes the target, tells the page, and closes', () => {
    const onChange = vi.fn();
    const { pair } = setup('en', 'es', onChange);
    openPicker();
    fireEvent.click(screen.getByRole('menuitem', { name: /Japanese/i }));
    expect(pair()).toBe('en>ja');
    expect(onChange).toHaveBeenCalledWith('ja');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('marks the active target language', () => {
    setup('en', 'es');
    openPicker();
    const active = options().filter((o) => o.className.includes('active'));
    expect(active).toHaveLength(1);
    expect(active[0]).toHaveTextContent(/Spanish/);
  });

  it('shows the request-a-language note while choosing what to learn', () => {
    setup();
    openPicker();
    expect(screen.getByText('Request a Language')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'dev@basiclanguage.school' })).toHaveAttribute('href', expect.stringContaining('mailto:dev@basiclanguage.school'));
  });
});

describe('LanguageSwitcher - choosing the native language', () => {
  const goToBaseTab = () => fireEvent.click(screen.getByRole('button', { name: /I speak/i }));

  it('highlights which side is being customized', () => {
    setup();
    openPicker();
    expect(document.querySelector('.target-box')).toHaveClass('selected-tab');
    goToBaseTab();
    expect(document.querySelector('.base-box')).toHaveClass('selected-tab');
    expect(document.querySelector('.target-box')).not.toHaveClass('selected-tab');
  });

  it('switches tabs from the keyboard', () => {
    setup();
    openPicker();
    const base = document.querySelector('.base-box')!;
    fireEvent.keyDown(base, { key: 'Enter' });
    expect(base).toHaveClass('selected-tab');
    fireEvent.keyDown(document.querySelector('.target-box')!, { key: ' ' });
    expect(document.querySelector('.target-box')).toHaveClass('selected-tab');
  });

  it('keeps the language being learned when the native language changes', () => {
    const { pair } = setup('en', 'es');
    openPicker();
    goToBaseTab();
    fireEvent.click(screen.getByRole('menuitem', { name: /French/i }));
    expect(pair()).toBe('fr>es');
    // The picker stays open so the learner can keep adjusting
    expect(picker()).toBeInTheDocument();
  });

  it('swaps instead of creating a pair where both languages are the same', () => {
    const onChange = vi.fn();
    const { pair } = setup('en', 'es', onChange);
    openPicker();
    goToBaseTab();
    fireEvent.click(screen.getByRole('menuitem', { name: /Spanish/i }));
    expect(pair()).toBe('es>en');
    expect(onChange).toHaveBeenCalledWith('en');
  });

  it('hides the language request note on the native language tab', () => {
    setup();
    openPicker();
    goToBaseTab();
    expect(screen.queryByText('Request a Language')).not.toBeInTheDocument();
  });
});

describe('LanguageSwitcher - swapping and quick pairs', () => {
  it('swaps from the navbar button and tells the page the new target', () => {
    const onChange = vi.fn();
    const { pair } = setup('en', 'es', onChange);
    fireEvent.click(screen.getByLabelText('Swap language pair'));
    expect(pair()).toBe('es>en');
    expect(onChange).toHaveBeenCalled();
  });

  it('swaps from inside the picker without closing it', () => {
    const { pair } = setup('en', 'es');
    openPicker();
    fireEvent.click(screen.getByLabelText('Swap native and learning languages'));
    expect(pair()).toBe('es>en');
    expect(picker()).toBeInTheDocument();
  });

  it('offers default recent pairs and switches to one when clicked', () => {
    const onChange = vi.fn();
    const { pair } = setup('en', 'es', onChange);
    openPicker();
    fireEvent.click(screen.getByRole('button', { name: 'Switch to pair EN to FR' }));
    expect(pair()).toBe('en>fr');
    expect(onChange).toHaveBeenCalledWith('fr');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('remembers new pairs, most recent first, without duplicates and at most four', () => {
    setup('en', 'es');
    for (const name of [/German/, /Japanese/, /Korean/, /Turkish/, /Japanese/]) {
      openPicker();
      fireEvent.click(screen.getByRole('menuitem', { name }));
    }
    const stored = JSON.parse(localStorage.getItem(RECENT_KEY)!);
    expect(stored).toHaveLength(4);
    expect(stored.map((p: { target: string }) => p.target)).toEqual(['ja', 'tr', 'ko', 'de']);
  });

  it('falls back to the default pairs when saved ones are unreadable', () => {
    localStorage.setItem(RECENT_KEY, '{broken');
    setup('en', 'es');
    openPicker();
    expect(screen.getByRole('button', { name: 'Switch to pair EN to RU' })).toBeInTheDocument();
  });

  it('ignores saved pairs where both sides are the same language', () => {
    localStorage.setItem(RECENT_KEY, JSON.stringify([{ base: 'en', target: 'en' }, { base: 'en', target: 'de' }]));
    setup('en', 'es');
    openPicker();
    expect(screen.queryByRole('button', { name: 'Switch to pair EN to EN' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Switch to pair EN to DE' })).toBeInTheDocument();
  });

  it('suggests courses for the native language, never the native language itself', () => {
    setup('ja', 'en');
    openPicker();
    const suggestions = screen.getAllByRole('button', { name: /^Learn / }).map((b) => b.getAttribute('aria-label'));
    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions).not.toContain('Learn Japanese');
    expect(suggestions).toContain('Learn Mandarin Chinese');
  });
});

describe('LanguageSwitcher - language family filter', () => {
  const choose = (value: string) => fireEvent.change(screen.getByLabelText('Filter languages by family'), { target: { value } });

  it('only shows languages of the chosen family', () => {
    setup();
    openPicker();
    choose('east-asian');
    expect(optionNames().sort()).toEqual(['Japanese', 'Korean', 'Mandarin Chinese']);
    choose('middle-eastern');
    expect(optionNames()).toEqual(['Arabic']);
    choose('all');
    expect(options()).toHaveLength(ALL.length);
  });

  it('assigns every available language to exactly one family', () => {
    for (const id of ALL) expect(LANGUAGE_REGION_MAP[id], id).toBeDefined();
    const regions = new Set(Object.values(LANGUAGE_REGION_MAP));
    expect([...regions].sort()).toEqual(['east-asian', 'germanic', 'middle-eastern', 'romance', 'slavic-eurasian', 'south-asian']);
  });

  it('puts the language count in the "all" option and localizes family names', () => {
    setup('ru', 'fr');
    openPicker();
    const select = screen.getByLabelText('Filter languages by family') as HTMLSelectElement;
    expect(select.options[0].textContent).toContain(`(${ALL.length})`);
    expect(select.options[0].textContent).toContain(getLocalizedRegionName('all', 'ru'));
    expect(select.textContent).toContain('Романские');
  });
});

