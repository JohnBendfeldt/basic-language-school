import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Alphabet from '../components/Alphabet';
import Grammar from '../components/Grammar';
import { GERMAN_GRAMMAR, getGrammarForLanguage } from '../data/languages/grammarData';

// Mock Audio
window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = vi.fn();

const sampleAlphabet = [
  { letter: 'A', pronunciation: '/aː/', example: 'as in Apfel', word: 'Apfel', meaning: 'Apple', icon: '🍎' },
  { letter: 'B', pronunciation: '/beː/', example: 'as in Buch', word: 'Buch', meaning: 'Book', icon: '📖' },
];

describe('Alphabet & Grammar Section Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders the segmented control with Alphabet and Grammar tabs', () => {
    render(<Alphabet data={sampleAlphabet} />);

    expect(screen.getByRole('tab', { name: /Alphabet & Sounds|Alphabet/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Grammar & Flashcards/i })).toBeInTheDocument();
    // Default view shows letters
    expect(screen.getByText('Apfel')).toBeInTheDocument();
  });

  it('switches to the Grammar component when Grammar & Flashcards tab is clicked', () => {
    render(<Alphabet data={sampleAlphabet} />);

    const grammarTab = screen.getByRole('tab', { name: /Grammar & Flashcards/i });
    fireEvent.click(grammarTab);

    // Alphabet items are unmounted, Grammar view is shown
    expect(screen.queryByText('Apfel')).not.toBeInTheDocument();
    expect(screen.getByTestId('grammar-component')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /^Flashcards$/i })).toBeInTheDocument();
  });

  it('allows playing grammar flashcards with immediate feedback and score increment', () => {
    render(<Grammar grammarData={GERMAN_GRAMMAR} />);

    // First card: ___ Tisch (table) with options der, die, das
    expect(screen.getByText(/Tisch/i)).toBeInTheDocument();
    // Verify Table SVG is rendered instead of mismatched chair emoji 🪑
    expect(screen.getByLabelText('Table')).toBeInTheDocument();
    expect(screen.queryByText('🪑')).not.toBeInTheDocument();

    const derBtn = screen.getByRole('button', { name: 'der' });
    const dieBtn = screen.getByRole('button', { name: 'die' });

    expect(derBtn).toBeInTheDocument();
    expect(dieBtn).toBeInTheDocument();

    // Click correct answer 'der'
    fireEvent.click(derBtn);

    // Shows explanation and next card button
    expect(screen.getByText(/Tisch \(table\) is masculine/i)).toBeInTheDocument();
    const nextBtn = screen.getByRole('button', { name: /Next Card/i });
    expect(nextBtn).toBeInTheDocument();

    // Click next
    fireEvent.click(nextBtn);

    // Moves to card 2: ___ Katze (cat)
    expect(screen.getByText(/Katze/i)).toBeInTheDocument();
    expect(screen.getByText('2 / 9')).toBeInTheDocument();
  });

  it('renders German gender noun rules with der, die, das cards and audio', () => {
    render(<Grammar grammarData={GERMAN_GRAMMAR} />);

    const genderTab = screen.getByRole('tab', { name: /Noun Genders|Artikel/i });
    fireEvent.click(genderTab);

    expect(screen.getByText('Maskulin (der)')).toBeInTheDocument();
    expect(screen.getByText('Feminin (die)')).toBeInTheDocument();
    expect(screen.getByText('Neutrum (das)')).toBeInTheDocument();
    expect(screen.getAllByText(/Tisch/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Katze/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Auto/i).length).toBeGreaterThan(0);
  });

  it('renders verb conjugation tables including sein, haben, and planen', () => {
    render(<Grammar grammarData={GERMAN_GRAMMAR} />);

    const verbsTab = screen.getByRole('tab', { name: /Verb Tenses|Verben/i });
    fireEvent.click(verbsTab);

    // Should list verbs
    expect(screen.getByRole('button', { name: /sein/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /planen/i })).toBeInTheDocument();

    // Switch to 'planen' (the verb from the user request!)
    const planenBtn = screen.getByRole('button', { name: /planen/i });
    fireEvent.click(planenBtn);

    expect(screen.getAllByText('planen').length).toBeGreaterThan(0);
    expect(screen.getByText('wir')).toBeInTheDocument();
    expect(screen.getByText(/Planen wir ein Meeting/i)).toBeInTheDocument();
  });

  it('supports grammar curriculum across all 8 supported languages', () => {
    const supportedLangs = ['de', 'ru', 'es', 'fr', 'pt', 'en', 'tr', 'id'] as const;
    supportedLangs.forEach(lang => {
      const grammar = getGrammarForLanguage(lang);
      expect(grammar).toBeDefined();
      expect(grammar.flashcards).toBeDefined();
      expect(grammar.flashcards!.length).toBeGreaterThan(0);
      expect(grammar.verbs).toBeDefined();
      expect(grammar.verbs!.length).toBeGreaterThan(0);
    });
  });

  it('correctly adapts tabs for languages without grammatical gender (Turkish & Indonesian)', () => {
    const turkishGrammar = getGrammarForLanguage('tr');
    const { rerender } = render(<Grammar grammarData={turkishGrammar} />);

    // Turkish has no gender tab
    expect(screen.queryByRole('tab', { name: /Noun Genders|Artikel/i })).not.toBeInTheDocument();
    // But has verbs and descriptions
    expect(screen.getByRole('tab', { name: /Verb Tenses|Verben/i })).toBeInTheDocument();

    const indonesianGrammar = getGrammarForLanguage('id');
    rerender(<Grammar grammarData={indonesianGrammar} />);
    expect(screen.queryByRole('tab', { name: /Noun Genders|Artikel/i })).not.toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Verb Tenses|Verben/i })).toBeInTheDocument();
  });

  it('renders Spanish and Russian gender systems correctly', () => {
    const spanishGrammar = getGrammarForLanguage('es');
    const { rerender } = render(<Grammar grammarData={spanishGrammar} />);

    const genderTab = screen.getByRole('tab', { name: /Noun Genders|Artikel/i });
    fireEvent.click(genderTab);

    expect(screen.getByText(/Masculino \(el\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Femenino \(la\)/i)).toBeInTheDocument();

    const russianGrammar = getGrammarForLanguage('ru');
    rerender(<Grammar grammarData={russianGrammar} />);
    const ruGenderTab = screen.getByRole('tab', { name: /Noun Genders|Artikel/i });
    fireEvent.click(ruGenderTab);

    expect(screen.getByText(/Мужской род/i)).toBeInTheDocument();
    expect(screen.getByText(/Женский род/i)).toBeInTheDocument();
  });

  it('renders Table SVG for Russian table flashcard (стол)', () => {
    const russianGrammar = getGrammarForLanguage('ru');
    render(<Grammar grammarData={russianGrammar} />);

    // First card in Russian flashcards is стол (table)
    expect(screen.getByText(/стол/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Table')).toBeInTheDocument();
    expect(screen.queryByText('🪑')).not.toBeInTheDocument();
  });
});
