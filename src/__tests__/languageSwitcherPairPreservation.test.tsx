import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import App from '../App';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { SupportedLanguageId } from '../data/languages/types';

// Helper component that displays active context values for testing assertions
const ContextInspector: React.FC = () => {
  const { currentLanguage, targetLanguage, baseLanguage } = useLanguage();
  return (
    <div data-testid="context-state">
      <span data-testid="target-lang">{targetLanguage}</span>
      <span data-testid="current-lang">{currentLanguage}</span>
      <span data-testid="base-lang">{baseLanguage}</span>
    </div>
  );
};

describe('LanguageSwitcher Language Pair Preservation', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    window.history.pushState({}, '', '/');
  });

  it('preserves Russian target when changing "I speak" from English to Spanish via the first visible Spanish option (User Reported Bug)', () => {
    // Setup: User is studying Russian for English speakers
    localStorage.setItem('basic_language_base_lang', 'en');
    localStorage.setItem('basic_language_target_lang', 'ru');
    localStorage.setItem('basic_language_active_lang', 'ru');
    window.history.pushState({}, '', '/learn/ru/alphabet');

    const handleLanguageChange = vi.fn();

    render(
      <LanguageProvider>
        <LanguageSwitcher onLanguageChange={handleLanguageChange} />
        <ContextInspector />
      </LanguageProvider>
    );

    expect(screen.getByTestId('base-lang').textContent).toBe('en');
    expect(screen.getByTestId('target-lang').textContent).toBe('ru');

    // Open language picker and click "I speak: English"
    fireEvent.click(screen.getByRole('button', { name: /Current language pair/i }));
    const dialog = screen.getByRole('dialog', { name: 'Language selection modal' });
    fireEvent.click(within(dialog).getByRole('button', { name: /I speak/i }));

    // Quick-pair / Suggested target chips MUST be hidden on the "I speak" tab so they cannot hijack selection
    expect(within(dialog).queryByText(/Suggested For You/i)).not.toBeInTheDocument();
    expect(within(dialog).queryByText(/Recent Pairs/i)).not.toBeInTheDocument();

    // Clicking the FIRST visible button labeled Spanish in the dialog (as a real user does)
    // must select Spanish as "I speak" — NOT click a "Suggested For You" chip!
    const spanishChoices = Array.from(dialog.querySelectorAll('button')).filter(
      (btn) => /Spanish/i.test(btn.textContent || '')
    );
    expect(spanishChoices).toHaveLength(1);
    fireEvent.click(spanishChoices[0]);

    // Result MUST be Russian for Spanish speakers (base='es', target='ru'), NOT Spanish for English speakers!
    expect(screen.getByTestId('base-lang').textContent).toBe('es');
    expect(screen.getByTestId('target-lang').textContent).toBe('ru');
    expect(handleLanguageChange).not.toHaveBeenCalled();

    // Modal stays open so learner sees "Hablo: Español" -> "Quiero aprender: Ruso"
    expect(screen.getByRole('dialog', { name: 'Language selection modal' })).toBeInTheDocument();
    expect(localStorage.getItem('basic_language_base_lang')).toBe('es');
    expect(localStorage.getItem('basic_language_target_lang')).toBe('ru');
    expect(document.documentElement.lang).toBe('es');

    // Closing via Done keeps Russian for Spanish speakers
    fireEvent.click(within(dialog).getByRole('button', { name: /Confirm selection and close modal/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByTestId('base-lang').textContent).toBe('es');
    expect(screen.getByTestId('target-lang').textContent).toBe('ru');
  });

  it('switches full App from Russian for English speakers to Russian for Spanish speakers without changing the /learn/ru URL', async () => {
    window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
    window.HTMLMediaElement.prototype.pause = vi.fn();
    window.scrollTo = vi.fn() as any;

    localStorage.setItem('basic_language_base_lang', 'en');
    localStorage.setItem('basic_language_target_lang', 'ru');
    window.history.pushState({}, '', '/learn/ru/alphabet');

    const { container } = render(<App />);
    await waitFor(() => expect(container.querySelector('.loading-section')).toBeNull());

    const appRoot = container.querySelector('.app')!;
    expect(appRoot.getAttribute('data-base-lang')).toBe('en');
    expect(appRoot.getAttribute('data-target-lang')).toBe('ru');

    // Open desktop language switcher
    const trigger = container.querySelector<HTMLButtonElement>('.desktop-header-actions .language-switcher-trigger')!;
    fireEvent.click(trigger);

    const dialog = screen.getByRole('dialog', { name: 'Language selection modal' });
    fireEvent.click(dialog.querySelector('.pair-box.base-box')!);

    // Click the only Spanish button in the dialog
    const spanishButtons = Array.from(dialog.querySelectorAll('button')).filter(
      (btn) => /Spanish/i.test(btn.textContent || '')
    );
    expect(spanishButtons).toHaveLength(1);
    fireEvent.click(spanishButtons[0]);

    // Close via Done
    fireEvent.click(within(dialog).getByRole('button', { name: /Confirm selection and close modal/i }));

    expect(appRoot.getAttribute('data-base-lang')).toBe('es');
    expect(appRoot.getAttribute('data-target-lang')).toBe('ru');
    expect(window.location.pathname).toBe('/learn/ru/alphabet');
    // Navigation UI & app title are now localized in Spanish while lessons remain Russian
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Ruso Básico/i);
    expect(within(container.querySelector('nav.navigation')!).getByRole('button', { name: /Frases Básicas/i })).toBeInTheDocument();
    expect(container.querySelector('.alphabet-section')).not.toBeNull();
  });

  it('switches full App from default root (/) EN->RU to ES->RU and supports two-step base + target customization in one modal session', async () => {
    window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
    window.HTMLMediaElement.prototype.pause = vi.fn();
    window.scrollTo = vi.fn() as any;

    window.history.pushState({}, '', '/');

    const { container } = render(<App />);
    await waitFor(() => expect(container.querySelector('.loading-section')).toBeNull());

    const appRoot = container.querySelector('.app')!;
    expect(appRoot.getAttribute('data-base-lang')).toBe('en');
    expect(appRoot.getAttribute('data-target-lang')).toBe('ru');

    // Open modal -> click "I speak" -> select Spanish -> stays on Russian (es -> ru)
    const trigger = container.querySelector<HTMLButtonElement>('.desktop-header-actions .language-switcher-trigger')!;
    fireEvent.click(trigger);

    const dialog = screen.getByRole('dialog', { name: 'Language selection modal' });
    fireEvent.click(dialog.querySelector('.pair-box.base-box')!);
    expect(within(dialog).queryByText(/Suggested For You/i)).not.toBeInTheDocument();

    const spanishButtons = Array.from(dialog.querySelectorAll('button')).filter(
      (btn) => /Spanish/i.test(btn.textContent || '')
    );
    expect(spanishButtons).toHaveLength(1);
    fireEvent.click(spanishButtons[0]);

    expect(appRoot.getAttribute('data-base-lang')).toBe('es');
    expect(appRoot.getAttribute('data-target-lang')).toBe('ru');
    expect(localStorage.getItem('basic_language_base_lang')).toBe('es');
    expect(localStorage.getItem('basic_language_target_lang')).toBe('ru');
    expect(screen.getByRole('dialog', { name: 'Language selection modal' })).toBeInTheDocument();

    // Now switch to "I want to learn" (Quiero aprender) in the same session and pick German (Alemán)
    fireEvent.click(dialog.querySelector('.pair-box.target-box')!);
    expect(within(dialog).getByText(/Sugeridos para ti/i)).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole('menuitem', { name: /Alemán/i }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(appRoot.getAttribute('data-base-lang')).toBe('es');
    expect(appRoot.getAttribute('data-target-lang')).toBe('de');
    expect(window.location.pathname).toBe('/learn/de/alphabet');
  });

  it('syncs updated recent pairs from localStorage when reopening and filters out unsupported language IDs', () => {
    localStorage.setItem('basic_language_base_lang', 'en');
    localStorage.setItem('basic_language_target_lang', 'ru');

    render(
      <LanguageProvider>
        <LanguageSwitcher />
        <ContextInspector />
      </LanguageProvider>
    );

    // Simulate another switcher instance (e.g. mobile vs desktop) writing recent pairs including invalid entries
    localStorage.setItem(
      'basic_language_recent_pairs',
      JSON.stringify([
        { base: 'xx', target: 'yy' },
        { base: 'es', target: 'ru' },
        { base: 'fr', target: 'fr' },
      ])
    );

    fireEvent.click(screen.getByRole('button', { name: /Current language pair/i }));
    const dialog = screen.getByRole('dialog', { name: 'Language selection modal' });
    expect(within(dialog).getByRole('button', { name: /^Switch to pair ES to RU\b/ })).toBeInTheDocument();
    expect(within(dialog).queryByRole('button', { name: /^Switch to pair XX to YY\b/ })).not.toBeInTheDocument();
    expect(within(dialog).queryByRole('button', { name: /^Switch to pair FR to FR\b/ })).not.toBeInTheDocument();
  });

  it('preserves Russian target across every non-Russian "I speak" language and cleanly swaps when selecting Russian', () => {
    localStorage.setItem('basic_language_base_lang', 'en');
    localStorage.setItem('basic_language_target_lang', 'ru');

    const handleLanguageChange = vi.fn();
    render(
      <LanguageProvider>
        <LanguageSwitcher onLanguageChange={handleLanguageChange} />
        <ContextInspector />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Current language pair/i }));
    const dialog = screen.getByRole('dialog', { name: 'Language selection modal' });
    fireEvent.click(dialog.querySelector('.pair-box.base-box')!);

    const allIds = Object.keys(SUPPORTED_LANGUAGES) as SupportedLanguageId[];
    const nonRussianIds = allIds.filter((id) => id !== 'ru');

    for (const langId of nonRussianIds) {
      const nativeName = SUPPORTED_LANGUAGES[langId].nativeName;
      const item = within(dialog).getByRole('menuitem', { name: new RegExp(nativeName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) });
      fireEvent.click(item);
      expect(screen.getByTestId('base-lang').textContent).toBe(langId);
      expect(screen.getByTestId('target-lang').textContent).toBe('ru');
      expect(screen.getByRole('dialog', { name: 'Language selection modal' })).toBeInTheDocument();
    }
    expect(handleLanguageChange).not.toHaveBeenCalled();

    // Now select Russian ('ru', current target) while base is the last non-Russian language -> must swap cleanly
    const lastBase = screen.getByTestId('base-lang').textContent;
    const russianItem = within(dialog).getByRole('menuitem', { name: /Русский/ });
    fireEvent.click(russianItem);
    expect(screen.getByTestId('base-lang').textContent).toBe('ru');
    expect(screen.getByTestId('target-lang').textContent).toBe(lastBase);
    expect(handleLanguageChange).toHaveBeenCalledWith(lastBase);
  });

  it('resets active tab and region filter when switching tabs or reopening the modal after customizing "I speak"', () => {
    localStorage.setItem('basic_language_base_lang', 'en');
    localStorage.setItem('basic_language_target_lang', 'ru');

    render(
      <LanguageProvider>
        <LanguageSwitcher />
        <ContextInspector />
      </LanguageProvider>
    );

    // Open modal, filter by East Asian on target tab
    fireEvent.click(screen.getByRole('button', { name: /Current language pair/i }));
    let dialog = screen.getByRole('dialog', { name: 'Language selection modal' });
    fireEvent.change(within(dialog).getByLabelText(/Filter languages by family/i), { target: { value: 'east-asian' } });
    expect(within(dialog).queryByRole('menuitem', { name: /Spanish/i })).not.toBeInTheDocument();

    // Switch to "I speak" tab -> region filter resets to 'all' so Spanish is immediately available
    fireEvent.click(dialog.querySelector('.pair-box.base-box')!);
    expect((within(dialog).getByLabelText(/Filter languages by family/i) as HTMLSelectElement).value).toBe('all');
    expect(within(dialog).getByRole('menuitem', { name: /Spanish/i })).toBeInTheDocument();

    // Select Spanish -> now ES -> RU, then filter region and close modal via Done
    fireEvent.click(within(dialog).getByRole('menuitem', { name: /Spanish/i }));
    expect(screen.getByTestId('base-lang').textContent).toBe('es');
    expect(screen.getByTestId('target-lang').textContent).toBe('ru');
    fireEvent.change(within(dialog).getByLabelText(/Filter languages by family/i), { target: { value: 'romance' } });
    fireEvent.click(within(dialog).getByRole('button', { name: /Confirm selection and close modal/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Reopen modal -> starts cleanly on "I want to learn" tab with region 'all' and Spanish-localized suggestions
    fireEvent.click(screen.getByRole('button', { name: /Current language pair/i }));
    dialog = screen.getByRole('dialog', { name: 'Language selection modal' });
    expect(dialog.querySelector('.pair-box.target-box')).toHaveClass('selected-tab');
    expect(dialog.querySelector('.pair-box.base-box')).not.toHaveClass('selected-tab');
    expect((within(dialog).getByLabelText(/Filter languages by family/i) as HTMLSelectElement).value).toBe('all');
    expect(within(dialog).getByText(/Pares recientes/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/Sugeridos para ti/i)).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: /^Switch to pair ES to RU\b/ })).toBeInTheDocument();
    // Spanish must NOT appear as a suggested course for Spanish speakers
    expect(within(dialog).queryByRole('button', { name: /^Learn Spanish/ })).not.toBeInTheDocument();
  });

  it('preserves French target language when changing base language from Russian to Indonesian (User Reported Fluke)', () => {
    // Setup: User was doing French for Russian speakers
    localStorage.setItem('basic_language_base_lang', 'ru');
    localStorage.setItem('basic_language_target_lang', 'fr');
    localStorage.setItem('basic_language_active_lang', 'fr');
    window.history.pushState({}, '', '/learn/fr/alphabet');

    const handleLanguageChange = vi.fn();

    render(
      <LanguageProvider>
        <LanguageSwitcher onLanguageChange={handleLanguageChange} />
        <ContextInspector />
      </LanguageProvider>
    );

    // Initial check: Target is French, Base is Russian
    expect(screen.getByTestId('target-lang').textContent).toBe('fr');
    expect(screen.getByTestId('base-lang').textContent).toBe('ru');

    // Open language pair modal
    const trigger = screen.getByRole('button', { name: /Current language pair/i });
    fireEvent.click(trigger);

    // Switch to "I speak" tab (Мой язык)
    const iSpeakTab = screen.getAllByRole('button', { name: /Мой язык/i })[0];
    fireEvent.click(iSpeakTab);

    // Select Indonesian (Индонезийский) as the new native language
    const indonesianOption = screen.getByRole('menuitem', { name: /Индонезийский/i });
    fireEvent.click(indonesianOption);

    // Target MUST REMAIN French ('fr'), base MUST BE Indonesian ('id')!
    // It must NEVER jump to Spanish ('es') or change target to Indonesian ('id')!
    expect(screen.getByTestId('target-lang').textContent).toBe('fr');
    expect(screen.getByTestId('base-lang').textContent).toBe('id');

    // onLanguageChange should NOT have been called because target language did not change
    expect(handleLanguageChange).not.toHaveBeenCalled();

    // Done button should be present in the modal
    const doneBtn = screen.getByRole('button', { name: /Confirm selection and close modal/i });
    expect(doneBtn).toBeInTheDocument();
    fireEvent.click(doneBtn);

    // Modal should now be closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByTestId('target-lang').textContent).toBe('fr');
    expect(screen.getByTestId('base-lang').textContent).toBe('id');
  });

  it('preserves German target language when changing base language from English to Turkish', () => {
    localStorage.setItem('basic_language_base_lang', 'en');
    localStorage.setItem('basic_language_target_lang', 'de');
    localStorage.setItem('basic_language_active_lang', 'de');
    window.history.pushState({}, '', '/learn/de/alphabet');

    render(
      <LanguageProvider>
        <LanguageSwitcher />
        <ContextInspector />
      </LanguageProvider>
    );

    expect(screen.getByTestId('target-lang').textContent).toBe('de');
    expect(screen.getByTestId('base-lang').textContent).toBe('en');

    fireEvent.click(screen.getByRole('button', { name: /Current language pair/i }));
    const iSpeakTab = screen.getAllByRole('button', { name: /I speak/i })[0];
    fireEvent.click(iSpeakTab);

    // Select Turkish as native language
    const turkishOption = screen.getByRole('menuitem', { name: /Turkish/i });
    fireEvent.click(turkishOption);

    // Target must stay German ('de'), base must become Turkish ('tr')
    expect(screen.getByTestId('target-lang').textContent).toBe('de');
    expect(screen.getByTestId('base-lang').textContent).toBe('tr');
  });

  it('cleanly swaps target to previous base when user selects current target language as their new native language', () => {
    // Learning French ('fr') as Russian speaker ('ru')
    localStorage.setItem('basic_language_base_lang', 'ru');
    localStorage.setItem('basic_language_target_lang', 'fr');
    window.history.pushState({}, '', '/learn/fr/alphabet');

    const handleLanguageChange = vi.fn();

    render(
      <LanguageProvider>
        <LanguageSwitcher onLanguageChange={handleLanguageChange} />
        <ContextInspector />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Current language pair/i }));
    const iSpeakTab = screen.getAllByRole('button', { name: /Мой язык/i })[0];
    fireEvent.click(iSpeakTab);

    // User selects French as their native language (same as current target)
    const frenchOption = screen.getByRole('menuitem', { name: /Французский/i });
    fireEvent.click(frenchOption);

    // Clean swap: target becomes Russian ('ru'), base becomes French ('fr')
    expect(screen.getByTestId('target-lang').textContent).toBe('ru');
    expect(screen.getByTestId('base-lang').textContent).toBe('fr');
    expect(handleLanguageChange).toHaveBeenCalledWith('ru');
  });

  it('renders Recent Pairs and Suggested high-affinity corridors in the switcher', () => {
    localStorage.setItem('basic_language_base_lang', 'en');
    localStorage.setItem('basic_language_target_lang', 'de');
    localStorage.setItem('basic_language_recent_pairs', JSON.stringify([
      { base: 'en', target: 'de' },
      { base: 'es', target: 'ru' }
    ]));

    render(
      <LanguageProvider>
        <LanguageSwitcher />
        <ContextInspector />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Current language pair/i }));

    // Shows Recent Pairs heading
    expect(screen.getByText(/Recent Pairs/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Switch to pair EN to DE/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Switch to pair ES to RU/i })).toBeInTheDocument();

    // Shows Suggested high-affinity corridor
    expect(screen.getByText(/Suggested For You/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Learn Spanish/i })).toBeInTheDocument();

    // Clicking a recent pair switches both languages
    fireEvent.click(screen.getByRole('button', { name: /Switch to pair ES to RU/i }));
    expect(screen.getByTestId('base-lang').textContent).toBe('es');
    expect(screen.getByTestId('target-lang').textContent).toBe('ru');
  });

  it('filters language options by regional / family categories', () => {
    localStorage.setItem('basic_language_base_lang', 'en');
    localStorage.setItem('basic_language_target_lang', 'es');

    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Current language pair/i }));

    // Region filter dropdown is present
    const filterSelect = screen.getByLabelText(/Filter languages by family/i);
    expect(filterSelect).toBeInTheDocument();

    // Select Romance filter
    fireEvent.change(filterSelect, { target: { value: 'romance' } });

    // Spanish, French, Portuguese should be present; German should not
    expect(screen.getByRole('menuitem', { name: /Spanish/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /French/i })).toBeInTheDocument();
    expect(screen.queryByRole('menuitem', { name: /German/i })).not.toBeInTheDocument();

    // Select East Asian filter
    fireEvent.change(filterSelect, { target: { value: 'east-asian' } });
    expect(screen.queryByRole('menuitem', { name: /Spanish/i })).not.toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /Japanese/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /Korean/i })).toBeInTheDocument();
  });
});
