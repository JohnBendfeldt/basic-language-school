import App from '../App';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import PronunciationButton from '../components/PronunciationButton';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../data/languages';

const TestConsumerComponent: React.FC = () => {
  const { currentLanguage, currentMeta, setLanguage, availableLanguages } = useLanguage();
  return (
    <div>
      <span data-testid="current-lang">{currentLanguage}</span>
      <span data-testid="current-name">{currentMeta.name}</span>
      <span data-testid="current-voice">{currentMeta.ttsVoice}</span>
      <button data-testid="switch-en" onClick={() => setLanguage('en')}>Switch English</button>
      <button data-testid="switch-ru" onClick={() => setLanguage('ru')}>Switch Russian</button>
      <span data-testid="available-count">{availableLanguages.length}</span>
    </div>
  );
};

describe('Multi-Language Core Architecture', () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.pushState({}, '', '/');
  });

  it('provides default Russian language context when no preference is stored', () => {
    render(
      <LanguageProvider>
        <TestConsumerComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('current-lang').textContent).toBe(DEFAULT_LANGUAGE);
    expect(screen.getByTestId('current-name').textContent).toBe('Russian');
    expect(screen.getByTestId('current-voice').textContent).toBe('ru-RU-SvetlanaNeural');
  });

  it('allows seamless switching to English and updates meta and voice', () => {
    render(
      <LanguageProvider>
        <TestConsumerComponent />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByTestId('switch-en'));
    expect(screen.getByTestId('current-lang').textContent).toBe('en');
    expect(screen.getByTestId('current-name').textContent).toBe('English');
    expect(screen.getByTestId('current-voice').textContent).toBe('en-US-JennyNeural');
    expect(localStorage.getItem('basic_language_active_lang')).toBe('en');
  });

  it('renders LanguageSwitcher with active courses and upcoming courses (Spanish, French)', () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    );

    // Open dropdown
    const trigger = screen.getByRole('button', { name: /switch/i });
    expect(trigger).toBeInTheDocument();
    fireEvent.click(trigger);

    // Should display active options (Russian, English, Spanish, French)
    expect(screen.getByRole('menuitem', { name: /english/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /russian/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /spanish/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /french/i })).toBeInTheDocument();

    // Should display upcoming badges for roadmap languages (German, Italian)
    expect(screen.getByText('German')).toBeInTheDocument();
    expect(screen.getByText('Italian')).toBeInTheDocument();
    expect(screen.getAllByText('Soon').length).toBeGreaterThanOrEqual(2);
  });

  it('resolves English audio paths in PronunciationButton', () => {
    render(
      <LanguageProvider>
        <PronunciationButton text="Apple" lang="en-US" audioCategory="alphabet" />
      </LanguageProvider>
    );

    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
  });

  it("renders correct language titles when switching across Russian, English, Spanish, French", async () => {
    // Test that Common Words and Phrases reflect the active language in App
    window.history.pushState({}, "", "/learn/es/words");
    const { unmount } = render(<App />);

    // Title MUST say Spanish, never English
    await waitFor(() => {
      expect(screen.getByText("Common Spanish Words & Vocabulary")).toBeInTheDocument();
      expect(screen.queryByText("High-Frequency English Vocabulary")).not.toBeInTheDocument();
    });

    // Test French phrases at /learn/fr/phrases
    window.history.pushState({}, "", "/learn/fr/phrases");
    fireEvent(window, new PopStateEvent("popstate"));

    await waitFor(() => {
      expect(screen.getByText("French Essential Phrases")).toBeInTheDocument();
      expect(screen.queryByText("Basic Russian Phrases")).not.toBeInTheDocument();
    });

    unmount();
  });

  it('allows swapping the language pair with the quick swap button', async () => {
    window.history.pushState({}, '', '/learn/es');
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    );

    // Initial pair: English -> Spanish
    expect(screen.getByText('Spanish')).toBeInTheDocument();

    // Click the quick swap button
    const swapBtn = screen.getByLabelText('Swap language pair');
    fireEvent.click(swapBtn);

    // Now learning English
    await waitFor(() => {
      expect(screen.getByText('English')).toBeInTheDocument();
    });
  });

  it('selects quick pair like EN -> FR from dropdown', async () => {
    window.history.pushState({}, '', '/learn/ru');
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    );

    // Open dropdown
    const trigger = screen.getByRole('button', { name: /Current language pair/i });
    fireEvent.click(trigger);

    // Click EN -> FR quick pair chip
    const enFrChip = screen.getByText('🇬🇧 EN → 🇫🇷 FR');
    fireEvent.click(enFrChip);

    // Now target is French
    await waitFor(() => {
      expect(screen.getByText('French')).toBeInTheDocument();
    });
  });

  it('renders LanguageSwitcher as a centered modal with backdrop and close button', () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    );

    // Click trigger to open
    const trigger = screen.getByRole('button', { name: /Current language pair/i });
    fireEvent.click(trigger);

    // Check modal dialog and backdrop
    const dialog = screen.getByRole('dialog', { name: /Language selection modal/i });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveClass('language-modal-container');

    // Close button should be present
    const closeBtn = screen.getByRole('button', { name: 'Close modal' });
    expect(closeBtn).toBeInTheDocument();

    // Clicking close button should close modal
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes LanguageSwitcher modal when pressing Escape or clicking backdrop', () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    );

    // Open
    fireEvent.click(screen.getByRole('button', { name: /Current language pair/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Press Escape
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Open again
    fireEvent.click(screen.getByRole('button', { name: /Current language pair/i }));
    const backdrop = document.querySelector('.language-modal-backdrop');
    expect(backdrop).toBeInTheDocument();

    // Click backdrop
    fireEvent.click(backdrop!);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
