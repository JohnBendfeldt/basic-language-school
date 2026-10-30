import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Quiz from '../components/Quiz';
import { LanguageProvider } from '../contexts/LanguageContext';
import spanishData from '../data/languages/es/spanishData';

// Wrapper with Spanish target language
const renderSpanishQuiz = (customData?: any) => {
  window.history.pushState({}, '', '/learn/es/quiz');
  return render(
    <LanguageProvider>
      <Quiz 
        data={customData || {
          alphabet: spanishData.alphabet.map(item => ({
            character: item.letter,
            pronunciation: item.pronunciation,
            example: item.example,
            russianWord: item.word
          })),
          basicPhrases: spanishData.basicPhrases,
          numbers: spanishData.numbers,
          commonWords: spanishData.commonWords,
          time: spanishData.time || []
        }} 
      />
    </LanguageProvider>
  );
};

describe('Spanish Quiz & Multi-Language Recap', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('accepts typing the letter "r" for Spanish letter R question without penalty', async () => {
    // Single-letter Spanish R quiz
    const rOnlyData = {
      alphabet: [{
        character: 'R',
        pronunciation: '/eɾe/ (trilled)',
        example: 'as in Reloj',
        russianWord: 'Reloj'
      }],
      basicPhrases: [],
      numbers: [],
      commonWords: [],
      time: []
    };

    renderSpanishQuiz(rOnlyData);

    await waitFor(() => {
      expect(screen.getByText('R')).toBeInTheDocument();
    });

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'r' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText('Correct!')).toBeInTheDocument();
    });
  });

  it('accepts typing "h", "ache", or "silent" for Spanish letter H', async () => {
    const hOnlyData = {
      alphabet: [{
        character: 'H',
        pronunciation: 'silent /atʃe/',
        example: 'as in Hola (silent)',
        russianWord: 'Hola'
      }],
      basicPhrases: [],
      numbers: [],
      commonWords: [],
      time: []
    };

    renderSpanishQuiz(hOnlyData);

    await waitFor(() => {
      expect(screen.getByText('H')).toBeInTheDocument();
    });

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'h' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText('Correct!')).toBeInTheDocument();
    });
  });

  it('displays clean non-empty answer feedback like "R (erre)" if an incorrect answer is given', async () => {
    const rOnlyData = {
      alphabet: [{
        character: 'R',
        pronunciation: '/eɾe/ (trilled)',
        example: 'as in Reloj',
        russianWord: 'Reloj'
      }],
      basicPhrases: [],
      numbers: [],
      commonWords: [],
      time: []
    };

    renderSpanishQuiz(rOnlyData);

    await waitFor(() => {
      expect(screen.getByText('R')).toBeInTheDocument();
    });

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'wrong' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText('Not quite')).toBeInTheDocument();
      // Must NOT be empty space; should cleanly display the letter and phonetic name
      const feedbackWord = document.querySelector('.feedback-correct-word');
      expect(feedbackWord?.textContent?.trim()).toBeTruthy();
      expect(feedbackWord?.textContent).toContain('R');
    });
  });

  it('renders Spanish praise (¡Excelente! / ¡Muy bien!) on session completion instead of Russian Khorosho', async () => {
    const singleQuestionData = {
      alphabet: [{
        character: 'A',
        pronunciation: '/a/',
        example: 'as in Amor',
        russianWord: 'Amor'
      }],
      basicPhrases: [],
      numbers: [],
      commonWords: [],
      time: []
    };

    renderSpanishQuiz(singleQuestionData);

    await waitFor(() => {
      expect(screen.getByText('A')).toBeInTheDocument();
    });

    // Answer 5 questions to complete session with goal = 5
    const goalBtn = screen.getByRole('button', { name: '5 Qs' });
    fireEvent.click(goalBtn);

    for (let i = 1; i <= 5; i++) {
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'a' } });
      fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));

      if (i < 5) {
        const nextBtn = await screen.findByRole('button', { name: new RegExp(`Next Question \\(${i + 1}/5\\)`, 'i') });
        fireEvent.click(nextBtn);
      } else {
        const finishBtn = await screen.findByRole('button', { name: /Complete Quiz & View Results/i });
        fireEvent.click(finishBtn);
      }
    }

    // Now on recap screen:
    await waitFor(() => {
      expect(screen.getByText('Quiz Session Complete!')).toBeInTheDocument();
      // MUST show Spanish praise, NEVER Russian "Хорошо!" or "Khorosho!"
      expect(screen.getByText('¡Excelente!')).toBeInTheDocument();
      expect(screen.queryByText('Хорошо!')).not.toBeInTheDocument();
      expect(screen.queryByText('Khorosho!')).not.toBeInTheDocument();
    });
  });
});
