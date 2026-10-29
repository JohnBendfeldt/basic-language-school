import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Alphabet from '../components/Alphabet';
import Phrases from '../components/Phrases';
import NumbersAndTime from '../components/NumbersAndTime';
import Quiz from '../components/Quiz';
import VoiceSpeedControl from '../components/VoiceSpeedControl';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { getPageContent, getAlphabetLabels, getTimeTabs, getEnglishTimeGuide, getLocalizedAppName, getLocalizedLanguageName, localizeCategoryBadge } from '../utils/pageDictionary';
import { resolveTranslation, extractDigit, getAlphabetQuizHint } from '../utils/translationResolver';
import { englishData } from '../data/languages/en/englishData';
import spanishData from '../data/languages/es/spanishData';
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

    // Test englishData.basicPhrases, commonWords, and time expressions into Russian
    expect(resolveTranslation({ phrase: 'Hello', meaning: 'Universal friendly greeting (any time of day)' }, 'en', 'ru')).toBe('Привет / Здравствуйте');
    expect(resolveTranslation({ phrase: 'Water', meaning: 'Noun: Essential drink for life' }, 'en', 'ru')).toBe('Вода');
    expect(resolveTranslation({ phrase: "Two o'clock", meaning: '2:00 sharp', category: 'Time' } as any, 'en', 'ru')).toBe('Два часа (2:00)');

    // Test localized app name, language name, and category badges
    expect(getLocalizedAppName('en', 'ru', 'Basic English')).toBe('Базовый Английский');
    expect(getLocalizedAppName('en', 'en', 'Basic English')).toBe('Basic English');
    expect(getLocalizedLanguageName('en', 'ru', 'English')).toBe('Английский');
    expect(localizeCategoryBadge('Greetings', 'ru')).toBe('Приветствия');
    expect(localizeCategoryBadge('Food & Drink', 'ru')).toBe('Еда и напитки');

    // Test Spanish time expression "Son las cinco menos cuarto" for French speakers
    expect(
      resolveTranslation(
        { phrase: 'Son las cinco menos cuarto', translation: 'It is 4:45 (quarter to five)' },
        'es',
        'fr'
      )
    ).toBe('Il est cinq heures moins le quart');
  });

  it('opens VoiceSpeedControl modal with localized speed labels when clicked', () => {
    render(
      <TestLanguagePairWrapper targetLang="en" baseLang="ru">
        <VoiceSpeedControl />
      </TestLanguagePairWrapper>
    );

    const trigger = screen.getByRole('button', { name: /Voice speed/i });
    fireEvent.click(trigger);

    expect(screen.getByRole('dialog', { name: /Audio Playback Speed/i })).toBeInTheDocument();
    expect(screen.getByText('Скорость аудио')).toBeInTheDocument();
    expect(screen.getByText('Учебный темп')).toBeInTheDocument();
  });

  it('keeps LanguageSwitcher open and preserves target language when changing I speak from Russian to French', () => {
    localStorage.setItem('basic_language_base_lang', 'ru');
    localStorage.setItem('basic_language_target_lang', 'en');
    window.history.pushState({}, '', '/learn/en/alphabet');

    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    );

    // Open modal
    const trigger = screen.getByRole('button', { name: /Current language pair/i });
    fireEvent.click(trigger);

    // Switch to "I speak" tab (Я говорю)
    const iSpeakTab = screen.getAllByRole('button', { name: /Я говорю/i })[0];
    fireEvent.click(iSpeakTab);

    // Select French (Французский) as native language
    const frenchOption = screen.getByRole('menuitem', { name: /Французский/i });
    fireEvent.click(frenchOption);

    // Modal should remain open and pair should now be French -> English (Anglais), NOT Spanish!
    expect(screen.getByRole('dialog', { name: /Language selection modal/i })).toBeInTheDocument();
    expect(screen.getAllByText('Anglais').length).toBeGreaterThan(0);
  });

  it('resolves slash-group translations like "Clock / Watch" and "Boy / Child" directly to words/*.mp3 neural audio', () => {
    const audioPaths: string[] = [];
    const OriginalAudio = window.Audio;
    class MockAudio {
      src: string;
      preload = 'auto';
      playbackRate = 1;
      onended: any = null;
      onerror: any = null;
      constructor(src: string) {
        this.src = src;
        audioPaths.push(src);
      }
      play() {
        return Promise.resolve();
      }
      pause() {}
      load() {}
    }
    // @ts-ignore
    window.Audio = MockAudio;

    try {
      render(
        <TestLanguagePairWrapper targetLang="es" baseLang="en">
          <Alphabet data={spanishData.alphabet} />
        </TestLanguagePairWrapper>
      );

      const clockBtn = screen.getByRole('button', { name: /Listen to Clock \/ Watch/i });
      fireEvent.click(clockBtn);
      expect(audioPaths[audioPaths.length - 1]).toBe('/audio/en/words/clock.mp3');

      const boyBtn = screen.getByRole('button', { name: /Listen to Boy \/ Child/i });
      fireEvent.click(boyBtn);
      expect(audioPaths[audioPaths.length - 1]).toBe('/audio/en/words/boy.mp3');

      const houseBtn = screen.getByRole('button', { name: /Listen to House \/ Home/i });
      fireEvent.click(houseBtn);
      expect(audioPaths[audioPaths.length - 1]).toBe('/audio/en/words/house.mp3');
    } finally {
      window.Audio = OriginalAudio;
    }
  });

  it('correctly resolves 100 and 1,000 translations, NumberBadge digits, and neural audio without truncating to 1/One/Uno', () => {
    expect(extractDigit('1,000 (One Thousand)')).toBe(1000);
    expect(extractDigit('One hundred')).toBe(100);
    expect(extractDigit('One thousand')).toBe(1000);

    // Russian 100 & 1000 for Spanish speakers should resolve to 100 (Cien) & 1000 (Mil), NOT Uno!
    expect(resolveTranslation({ russian: 'сто', english: 'One hundred' }, 'ru', 'es')).toBe('100 (Cien)');
    expect(resolveTranslation({ russian: 'тысяча', english: 'One thousand' }, 'ru', 'es')).toBe('1000 (Mil)');

    // Spanish 1,000 for English speakers should resolve to 1000 (One thousand), NOT 1 (One)!
    expect(resolveTranslation({ phrase: 'Mil', translation: '1,000 (One Thousand)' }, 'es', 'en')).toBe('1000 (One thousand)');

    const audioPaths: string[] = [];
    const OriginalAudio = window.Audio;
    class MockAudio {
      src: string;
      preload = 'auto';
      playbackRate = 1;
      onended: any = null;
      onerror: any = null;
      constructor(src: string) {
        this.src = src;
        audioPaths.push(src);
      }
      play() {
        return Promise.resolve();
      }
      pause() {}
      load() {}
    }
    // @ts-ignore
    window.Audio = MockAudio;

    try {
      const { container } = render(
        <TestLanguagePairWrapper targetLang="ru" baseLang="en">
          <Phrases data={russianData.numbers} title="Russian Numbers" contentType="numbers" />
        </TestLanguagePairWrapper>
      );

      // NumberBadge SVG pills should render on Russian numbers including 100 and 1000
      const svgTexts = Array.from(container.querySelectorAll('svg.number-svg-badge text')).map(el => el.textContent);
      expect(svgTexts).toContain('100');
      expect(svgTexts).toContain('1000');

      // Reveal all and click 100 & 1000 translation speaker buttons
      fireEvent.click(screen.getByRole('button', { name: /reveal all/i }));

      const hundredBtn = screen.getByRole('button', { name: /Listen to translation 100 \(One hundred\)/i });
      fireEvent.click(hundredBtn);
      expect(audioPaths[audioPaths.length - 1]).toBe('/audio/en/numbers/one_hundred.mp3');

      const thousandBtn = screen.getByRole('button', { name: /Listen to translation 1000 \(One thousand\)/i });
      fireEvent.click(thousandBtn);
      expect(audioPaths[audioPaths.length - 1]).toBe('/audio/en/numbers/one_thousand.mp3');
    } finally {
      window.Audio = OriginalAudio;
    }
  });
});
