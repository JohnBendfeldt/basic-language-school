import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Phrases from '../components/Phrases';
import { LanguageProvider } from '../contexts/LanguageContext';
import { PhraseItem } from '../types/index';

const setViewport = (isMobile: boolean) => {
  window.matchMedia = ((q: string) => ({
    matches: isMobile, media: q, onchange: null,
    addEventListener: () => {}, removeEventListener: () => {},
    addListener: () => {}, removeListener: () => {}, dispatchEvent: () => false,
  })) as never;
};

const packData: PhraseItem[] = [
  { phrase: 'Computadora', translation: 'Computer', category: 'Tech', icon: '💻' },
  { phrase: 'Contraseña', translation: 'Password', category: 'Tech', icon: '🔐' },
  { phrase: 'Rojo', translation: 'Red', category: 'Colors', icon: '🔴' },
  { phrase: 'Lluvia', translation: 'Rain', category: 'Weather', icon: '🌧️' },
];

const renderPhrases = (data: PhraseItem[] = packData, contentType: 'phrases' | 'words' | 'numbers' | 'time' = 'words') => {
  localStorage.setItem('basic_language_base_lang', 'en');
  localStorage.setItem('basic_language_target_lang', 'es');
  return render(
    <LanguageProvider>
      <Phrases data={data} title="Common Words" contentType={contentType} />
    </LanguageProvider>
  );
};

describe('Phrases - mobile topic filter', () => {
  beforeEach(() => setViewport(true));
  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('shows a compact Topics control instead of the desktop pill bar', () => {
    renderPhrases();
    expect(screen.queryByRole('group', { name: /Filter by topic/i })).not.toBeInTheDocument();
    const open = screen.getByRole('button', { name: /Topics/ });
    expect(open).toHaveAttribute('aria-haspopup', 'dialog');
    // shows how many topics exist when nothing is selected
    expect(open).toHaveTextContent('3');
  });

  it('narrows the cards from the quick topic strip and supports several topics at once', () => {
    renderPhrases();
    const strip = screen.getByRole('group', { name: 'Quick topics' });
    fireEvent.click(within(strip).getByRole('button', { name: /Colors/ }));
    expect(screen.getByText('Rojo')).toBeInTheDocument();
    expect(screen.queryByText('Computadora')).not.toBeInTheDocument();

    fireEvent.click(within(strip).getByRole('button', { name: /Weather/ }));
    expect(screen.getByText('Rojo')).toBeInTheDocument();
    expect(screen.getByText('Lluvia')).toBeInTheDocument();
    expect(screen.queryByText('Contraseña')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topics/ })).toHaveTextContent('2');
  });

  it('shows removable chips for the active topics and a Clear link', () => {
    renderPhrases();
    fireEvent.click(within(screen.getByRole('group', { name: 'Quick topics' })).getByRole('button', { name: /Colors/ }));

    fireEvent.click(screen.getByRole('button', { name: /✕$/ }));
    expect(screen.getByText('Computadora')).toBeInTheDocument();

    fireEvent.click(within(screen.getByRole('group', { name: 'Quick topics' })).getByRole('button', { name: /Colors/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.getByText('Lluvia')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /✕$/ })).not.toBeInTheDocument();
  });

  it('opens the topic sheet, locks page scroll, and restores it on close', () => {
    renderPhrases();
    fireEvent.click(screen.getByRole('button', { name: /Topics/ }));
    const sheet = screen.getByRole('dialog', { name: 'Topics' });
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.click(within(sheet).getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('closes the sheet with Escape and from the backdrop, but not from clicks inside', () => {
    renderPhrases();
    fireEvent.click(screen.getByRole('button', { name: /Topics/ }));
    fireEvent.click(screen.getByRole('dialog', { name: 'Topics' }));
    expect(screen.getByRole('dialog', { name: 'Topics' })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Topics/ }));
    fireEvent.click(document.querySelector('.topic-sheet-backdrop')!);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('filters from the sheet, reports the result count on the apply button, and can clear', () => {
    renderPhrases();
    fireEvent.click(screen.getByRole('button', { name: /Topics/ }));
    const sheet = screen.getByRole('dialog', { name: 'Topics' });

    // Nothing selected yet: Clear is disabled and Apply shows every card
    expect(within(sheet).getByRole('button', { name: 'Clear' })).toBeDisabled();
    expect(within(sheet).getByRole('button', { name: 'Show 4' })).toBeInTheDocument();

    fireEvent.click(within(sheet).getByRole('button', { name: /Tech/ }));
    expect(within(sheet).getByRole('button', { name: 'Show 2' })).toBeInTheDocument();
    expect(within(sheet).getByRole('button', { name: 'Clear' })).toBeEnabled();

    fireEvent.click(within(sheet).getByRole('button', { name: 'Show 2' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Rojo')).not.toBeInTheDocument();
    expect(screen.getByText('Computadora')).toBeInTheDocument();
  });

  it('has no topic controls when there is only one category', () => {
    renderPhrases(packData.filter((p) => p.category === 'Tech'));
    expect(screen.queryByRole('button', { name: /Topics/ })).not.toBeInTheDocument();
  });
});

describe('Phrases - cards', () => {
  beforeEach(() => setViewport(false));

  it('shows a digit badge on number cards but not on word cards', () => {
    const numbers: PhraseItem[] = [{ phrase: 'quince', translation: '15 (Fifteen)', category: 'Numbers 11-20' }];
    const { unmount } = renderPhrases(numbers, 'numbers');
    expect(document.querySelectorAll('.phrase-number-pill')).toHaveLength(1);
    unmount();
    renderPhrases(numbers, 'words');
    expect(document.querySelectorAll('.phrase-number-pill')).toHaveLength(0);
  });

  it('resets revealed cards when a topic filter changes', () => {
    renderPhrases();
    fireEvent.click(screen.getByRole('button', { name: /Reveal All/i }));
    expect(screen.getByText('Computer')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Colors/ }));
    expect(screen.queryByText('Red')).not.toBeInTheDocument();
  });

  it('labels the pronunciation button by content type', () => {
    renderPhrases(packData, 'words');
    expect(screen.getByLabelText('Pronounce word Rojo')).toBeInTheDocument();
  });

  it('renders nothing but the header for an empty list', () => {
    renderPhrases([], 'phrases');
    expect(screen.queryAllByRole('button', { name: /Reveal translation/i })).toHaveLength(0);
    expect(screen.getByRole('heading', { name: 'Common Words' })).toBeInTheDocument();
  });
});
