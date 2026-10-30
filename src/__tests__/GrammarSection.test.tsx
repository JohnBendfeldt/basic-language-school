import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Alphabet from '../components/Alphabet';
import Grammar from '../components/Grammar';
import { GERMAN_GRAMMAR, getGrammarForLanguage } from '../data/languages/grammarData';
import { LanguageProvider } from '../contexts/LanguageContext';

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

  it('localizes English grammar explanations, prompts, badges, and translations for Russian native learners', () => {
    localStorage.setItem('basic_language_base_lang', 'ru');
    localStorage.setItem('basic_language_target_lang', 'en');
    window.history.pushState({}, '', '/learn/en/alphabet');

    render(
      <LanguageProvider>
        <Alphabet data={sampleAlphabet} initialSubTab="grammar" />
      </LanguageProvider>
    );

    // Verify badge is in Russian: 🏷️ Артикли (a / an)
    expect(screen.getByText(/🏷️ Артикли \(a \/ an\)/i)).toBeInTheDocument();

    // Verify subtitle translation is in Russian: яблоко
    expect(screen.getByText('яблоко')).toBeInTheDocument();

    // Answer the card with 'an'
    const anButton = screen.getByRole('button', { name: 'an' });
    fireEvent.click(anButton);

    // Explanation MUST be in Russian for Russian native learners!
    expect(screen.getByText(/Слово «apple» начинается с гласного звука \/æ\/, поэтому используется неопределённый артикль «an»/i)).toBeInTheDocument();
    // Next button in Russian
    expect(screen.getByRole('button', { name: /Далее/i })).toBeInTheDocument();
  });

  it('localizes English grammar rules, verbs, adjectives, and flashcards for German native learners', () => {
    localStorage.setItem('basic_language_base_lang', 'de');
    localStorage.setItem('basic_language_target_lang', 'en');
    window.history.pushState({}, '', '/learn/en/alphabet');

    render(
      <LanguageProvider>
        <Alphabet data={sampleAlphabet} initialSubTab="grammar" />
      </LanguageProvider>
    );

    // 1. Descriptions & Adjectives tab: check German explanation and titles
    const descTab = screen.getByRole('tab', { name: /Beschreibungen & Adjektive/i });
    fireEvent.click(descTab);

    expect(screen.getByText('Englische Steigerung von Adjektiven')).toBeInTheDocument();
    expect(screen.getByText(/Kurze Adjektive bilden den Komparativ mit -er/i)).toBeInTheDocument();
    expect(screen.getByText('gut / besser / am besten')).toBeInTheDocument();

    // 2. Gender / Articles tab: check German rules and descriptions
    const genderTab = screen.getByRole('tab', { name: /Artikel & Geschlecht/i });
    fireEvent.click(genderTab);

    expect(screen.getByText('Artikel (A, An, The)')).toBeInTheDocument();
    expect(screen.getByText(/Im Englischen gibt es kein grammatikalisches Geschlecht/i)).toBeInTheDocument();
    expect(screen.getByText('ein Apfel')).toBeInTheDocument();

    // 3. Flashcards tab: check German feedback explanation on card answer
    const flashTab = screen.getByRole('tab', { name: /^Karteikarten$/i });
    fireEvent.click(flashTab);

    const anButton = screen.getByRole('button', { name: 'an' });
    fireEvent.click(anButton);

    expect(screen.getByText(/„Apple“ beginnt mit einem Vokallaut \/æ\/, daher wird der unbestimmte Artikel „an“ verwendet/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Nächste Karte/i })).toBeInTheDocument();
  });

  it('correctly adapts verbs for isolating languages (Mandarin Chinese & Indonesian) with aspect markers and notice banner', () => {
    localStorage.setItem('basic_language_base_lang', 'en');
    localStorage.setItem('basic_language_target_lang', 'zh');
    window.history.pushState({}, '', '/learn/zh/alphabet');

    render(
      <LanguageProvider>
        <Grammar initialTab="verbs" />
      </LanguageProvider>
    );

    // Verify notice banner for Chinese
    expect(screen.getByText(/Mandarin Chinese has NO verb conjugations!/i)).toBeInTheDocument();
    expect(screen.getByText(/Verbs never change by person/i)).toBeInTheDocument();

    // Verify verb form rows have distinct aspect/tense forms rather than repeating the same form
    expect(screen.getByText(/Affirmative \(肯定句\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Negative \(否定句\)/i)).toBeInTheDocument();
  });
});
