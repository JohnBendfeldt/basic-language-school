import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Alphabet from '../components/Alphabet';
import NumbersAndTime from '../components/NumbersAndTime';
import Quiz from '../components/Quiz';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { getPageContent, getAlphabetLabels, getTimeTabs, getEnglishTimeGuide } from '../utils/pageDictionary';
import { resolveTranslation, getAlphabetQuizHint } from '../utils/translationResolver';
import { englishData } from '../data/languages/en/englishData';
import russianData from '../data/languages/ru/russianData';

// Mock speech audio APIs
window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = vi.fn();

// Helper component to force a specific language pair inside tests
const TestLanguagePairWrapper: React.FC<{
  targetLang: 'en' | 'es' | 'fr' | 'ru';
  baseLang: 'en' | 'es' | 'fr' | 'ru';
  children: React.ReactNode;
}> = ({ targetLang, baseLang, children }) => {
  return (
    <LanguageProvider>
      <LanguagePairSetter targetLang={targetLang} baseLang={baseLang}>
        {children}
      </LanguagePairSetter>
    </LanguageProvider>
  );
};

const LanguagePairSetter: React.FC<{
  targetLang: 'en' | 'es' | 'fr' | 'ru';
  baseLang: 'en' | 'es' | 'fr' | 'ru';
  children: React.ReactNode;
}> = ({ targetLang, baseLang, children }) => {
  const { setTargetLanguage, setBaseLanguage, currentLanguage, baseLanguage } = useLanguage();

  React.useEffect(() => {
    setTargetLanguage(targetLang);
    setBaseLanguage(baseLang);
  }, [targetLang, baseLang, setTargetLanguage, setBaseLanguage]);

  if (currentLanguage !== targetLang || baseLanguage !== baseLang) {
    return null;
  }

  return <>{children}</>;
};

describe('Page Dictionary & Multilingual Alphabet Localization', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders localized headings, phonetics, and translated word meanings for Russian speaker learning English (ru -> en)', () => {
    render(
      <TestLanguagePairWrapper targetLang="en" baseLang="ru">
        <Alphabet data={englishData.alphabet} />
      </TestLanguagePairWrapper>
    );

    // Header and subtitle should be in Russian
    expect(screen.getByText('Английский алфавит')).toBeInTheDocument();
    expect(screen.getByText(/26 букв с правилами произношения/i)).toBeInTheDocument();

    // In-card labels should be in Russian
    const soundLabels = screen.getAllByText('Звук:');
    expect(soundLabels.length).toBeGreaterThan(0);

    const exampleLabels = screen.getAllByText('Пример:');
    expect(exampleLabels.length).toBeGreaterThan(0);

    // Phonetic guide should localize "as in" to "как в"
    expect(screen.getByText(/\/eɪ\/ & \/æ\/ как в Apple, Ant/i)).toBeInTheDocument();

    // Card meanings should translate English words to Russian (e.g. Apple -> Яблоко, Book -> Книга)
    expect(screen.getByText('(Яблоко)')).toBeInTheDocument();
    expect(screen.getByText('(Книга)')).toBeInTheDocument();
    expect(screen.getByText('(Кот / Кошка)')).toBeInTheDocument();
  });

  it('renders localized headings and Spanish word translations for Spanish speaker learning Russian (es -> ru)', () => {
    render(
      <TestLanguagePairWrapper targetLang="ru" baseLang="es">
        <Alphabet data={russianData.alphabet} />
      </TestLanguagePairWrapper>
    );

    // Header should be in Spanish
    expect(screen.getByText('Alfabeto ruso (cirílico)')).toBeInTheDocument();
    expect(screen.getByText(/33 letras con guías de pronunciación/i)).toBeInTheDocument();

    // Labels in Spanish
    expect(screen.getAllByText('Sonido:').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Ejemplo:').length).toBeGreaterThan(0);

    // Example meanings in Spanish (e.g. автобус -> autobús, брат -> hermano)
    expect(screen.getByText('(Autobús)')).toBeInTheDocument();
    expect(screen.getByText('(Hermano)')).toBeInTheDocument();
  });

  it('localizes Numbers and Telling Time tabs and English grammar rules into Russian (ru -> en)', () => {
    render(
      <TestLanguagePairWrapper targetLang="en" baseLang="ru">
        <NumbersAndTime 
          numbersData={englishData.numbers}
          timeData={englishData.time}
          activeTab="time"
          onTabChange={vi.fn()}
        />
      </TestLanguagePairWrapper>
    );

    // Localized tabs in Russian
    expect(screen.getByRole('tab', { name: /Числа/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Время/i })).toBeInTheDocument();

    // Grammar guide header and rules in Russian
    expect(screen.getByText('Правила времени в английском языке')).toBeInTheDocument();
    expect(screen.getByText(/O'clock и точные часы/i)).toBeInTheDocument();
    expect(screen.getByText(/Past и To \(части часа\)/i)).toBeInTheDocument();
    expect(screen.getByText(/AM и PM \(12-часовой формат\)/i)).toBeInTheDocument();
  });

  it('localizes quiz hints and accepts simple digits or words without requiring verbose definitions', () => {
    // Test getAlphabetQuizHint
    expect(getAlphabetQuizHint('А', 'ru', 'es', 'Russian')).toBe('¿Qué sonido hace la letra cirílica «А»?');
    expect(getAlphabetQuizHint('A', 'en', 'ru', 'English')).toBe('Введите букву «A» или послушайте её звучание:');

    // Test resolveTranslation direct word lookups
    expect(resolveTranslation({ word: 'Apple', meaning: 'Noun: A fruit' }, 'en', 'ru')).toBe('Яблоко');
    expect(resolveTranslation({ word: 'Apple', meaning: 'Noun: A fruit' }, 'en', 'es')).toBe('Manzana');
    expect(resolveTranslation({ word: 'Apple', meaning: 'Noun: A fruit' }, 'en', 'fr')).toBe('Pomme');
    expect(resolveTranslation({ word: 'Book', meaning: 'Noun: Reading material' }, 'en', 'ru')).toBe('Книга');
  });
});
