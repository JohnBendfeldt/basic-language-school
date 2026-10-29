import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';

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

    // Switch to "I speak" tab (Я говорю)
    const iSpeakTab = screen.getAllByRole('button', { name: /Я говорю/i })[0];
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
    const iSpeakTab = screen.getAllByRole('button', { name: /Я говорю/i })[0];
    fireEvent.click(iSpeakTab);

    // User selects French as their native language (same as current target)
    const frenchOption = screen.getByRole('menuitem', { name: /Французский/i });
    fireEvent.click(frenchOption);

    // Clean swap: target becomes Russian ('ru'), base becomes French ('fr')
    expect(screen.getByTestId('target-lang').textContent).toBe('ru');
    expect(screen.getByTestId('base-lang').textContent).toBe('fr');
    expect(handleLanguageChange).toHaveBeenCalledWith('ru');
  });
});
