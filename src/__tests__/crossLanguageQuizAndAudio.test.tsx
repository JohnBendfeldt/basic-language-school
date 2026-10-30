import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Quiz from '../components/Quiz';
import Phrases from '../components/Phrases';
import { LanguageProvider } from '../contexts/LanguageContext';
import { 
  resolveTranslation, 
  extractDigit, 
  buildQuizQuestionHint 
} from '../utils/translationResolver';

describe('Cross-Language Translations and Quiz Resolution', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('translationResolver utility', () => {
    it('correctly extracts digits from complex number strings', () => {
      expect(extractDigit('1 - Single unit')).toBe(1);
      expect(extractDigit('15 (Fifteen)')).toBe(15);
      expect(extractDigit('100')).toBe(100);
      expect(extractDigit('Not a number')).toBeNull();
    });

    it('resolves Russian "мужчина" to Spanish "Hombre" when base language is Spanish', () => {
      const item = { russian: 'мужчина', english: 'man', pronunciation: 'moosh-chee-na' };
      const translated = resolveTranslation(item, 'ru', 'es');
      expect(translated).toBe('Hombre');
    });

    it('resolves Russian "женщина" to Spanish "Mujer" when base language is Spanish', () => {
      const item = { russian: 'женщина', english: 'woman', pronunciation: 'zhen-shee-na' };
      const translated = resolveTranslation(item, 'ru', 'es');
      expect(translated).toBe('Mujer');
    });

    it('resolves Spanish "Agua" to Russian "Вода" when base language is Russian', () => {
      const item = { phrase: 'Agua', translation: 'Water', pronunciation: 'AH-gwah' };
      const translated = resolveTranslation(item, 'es', 'ru');
      expect(translated).toBe('Вода');
    });

    it('resolves number 15 to Russian "15 (Пятнадцать)" when base language is Russian', () => {
      const item = { phrase: 'Quince', translation: '15 (Fifteen)', pronunciation: 'KEEN-seh' };
      const translated = resolveTranslation(item, 'es', 'ru');
      expect(translated).toBe('15 (Пятнадцать)');
    });

    it('builds localized question hints in the user native tongue', () => {
      // Russian speaker learning Spanish asking how to say 15 in Spanish
      const hintRu = buildQuizQuestionHint('15 (Пятнадцать)', false, 'es', 'ru');
      expect(hintRu).toContain('Как сказать');
      expect(hintRu).toContain('испанском');

      // Spanish speaker learning Russian asking what a Russian word means
      const hintEs = buildQuizQuestionHint('мужчина', true, 'ru', 'es');
      expect(hintEs).toContain('¿Qué significa');
    });
  });

  describe('Phrases Component with Audio and Localized Translation', () => {
    it('renders Spanish translation on revealed card when baseLanguage is Spanish for Russian words', async () => {
      localStorage.setItem('basic_language_base_lang', 'es');
      localStorage.setItem('basic_language_target_lang', 'ru');

      const mockData = [
        { russian: 'мужчина', english: 'man', pronunciation: 'moosh-chee-na' }
      ];

      render(
        <LanguageProvider>
          <Phrases data={mockData} title="Palabras Comunes" contentType="words" />
        </LanguageProvider>
      );

      // Card starts hidden
      expect(screen.getByText('мужчина')).toBeInTheDocument();

      // Click reveal button
      const revealBtn = screen.getByLabelText(/Reveal translation for/i);
      fireEvent.click(revealBtn);

      // Verify translation is in Spanish ("Hombre"), not English ("man")
      await waitFor(() => {
        expect(screen.getByText('Hombre')).toBeInTheDocument();
      });
    });
  });

  describe('Quiz Number Equivalence & Inverted Definition Logic', () => {
    it('accepts typing "1" for English number question "One"', async () => {
      const mockQuizData = {
        alphabet: [],
        basicPhrases: [],
        numbers: [
          { phrase: 'One', meaning: '1 (One)', pronunciation: '/wʌn/', icon: '1️⃣' }
        ],
        commonWords: [],
        time: []
      };

      render(
        <LanguageProvider>
          <Quiz data={mockQuizData} />
        </LanguageProvider>
      );

      const input = await screen.findByRole('textbox');
      expect(input).toBeInTheDocument();

      // Type "1" for the answer
      fireEvent.change(input, { target: { value: '1' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      // Should be marked as correct, NOT rejected
      await waitFor(() => {
        expect(screen.getByText('Correct!')).toBeInTheDocument();
      });
    });

    it('accepts typing "quince" or "15" for Spanish number 15', async () => {
      const mockQuizData = {
        alphabet: [],
        basicPhrases: [],
        numbers: [
          { phrase: 'Quince', translation: '15 (Fifteen)', pronunciation: 'KEEN-seh', icon: '1️⃣5️⃣' }
        ],
        commonWords: [],
        time: []
      };

      render(
        <LanguageProvider>
          <Quiz data={mockQuizData} />
        </LanguageProvider>
      );

      const input = await screen.findByRole('textbox');
      expect(input).toBeInTheDocument();

      // Type "15"
      fireEvent.change(input, { target: { value: '15' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      await waitFor(() => {
        expect(screen.getByText('Correct!')).toBeInTheDocument();
      });
    });
  });
});
