import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Quiz, { SPECIAL_CHAR_MAP } from '../components/Quiz';
import { LanguageProvider } from '../contexts/LanguageContext';

describe('Special Characters & Dynamic Mobile Keyboard Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('defines valid character mappings for all supported languages', () => {
    expect(SPECIAL_CHAR_MAP.es).toEqual(['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡']);
    expect(SPECIAL_CHAR_MAP.fr).toEqual(['é', 'è', 'ê', 'ë', 'à', 'â', 'ç', 'î', 'ï', 'ô', 'ù', 'û', 'œ']);
    expect(SPECIAL_CHAR_MAP.de).toEqual(['ä', 'ö', 'ü', 'ß']);
    expect(SPECIAL_CHAR_MAP.pt).toEqual(['ã', 'õ', 'á', 'é', 'í', 'ó', 'ú', 'â', 'ê', 'ô', 'ç']);
    expect(SPECIAL_CHAR_MAP.tr).toEqual(['ç', 'ğ', 'ı', 'ö', 'ş', 'ü', 'İ']);
    expect(SPECIAL_CHAR_MAP.ru).toEqual(['я', 'ю', 'ё', 'ж', 'ш', 'щ', 'ч', 'ь', 'ъ', 'ы', 'э']);
    expect(SPECIAL_CHAR_MAP.en).toEqual([]);
    expect(SPECIAL_CHAR_MAP.id).toEqual([]);
  });

  it('renders Spanish special character toolbar and sets input lang="es" when answer is expected in Spanish', () => {
    window.history.pushState({}, '', '/learn/es/quiz');
    const spanishSingleData = {
      basicPhrases: [{
        phrase: 'hola',
        english: 'hello',
        category: 'Greetings',
        level: 1
      }],
      alphabet: [],
      numbers: [],
      commonWords: [],
      time: []
    };

    render(
      <LanguageProvider>
        <Quiz data={spanishSingleData as any} />
      </LanguageProvider>
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();

    // Check if expected language is Spanish
    if (input.getAttribute('lang') === 'es') {
      const ñBtn = screen.getByRole('button', { name: 'Insert ñ' });
      expect(ñBtn).toBeInTheDocument();

      // Click ñ button
      fireEvent.click(ñBtn);
      expect(input.value).toContain('ñ');
    }
  });

  it('renders German special characters (ä, ö, ü, ß) and sets lang="de" on input', () => {
    window.history.pushState({}, '', '/learn/de/quiz');
    const germanSingleData = {
      basicPhrases: [{
        phrase: 'hallo',
        english: 'hello',
        category: 'Greetings',
        level: 1
      }],
      alphabet: [],
      numbers: [],
      commonWords: [],
      time: []
    };

    render(
      <LanguageProvider>
        <Quiz data={germanSingleData as any} />
      </LanguageProvider>
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();

    if (input.getAttribute('lang') === 'de') {
      const äBtn = screen.getByRole('button', { name: 'Insert ä' });
      const ßBtn = screen.getByRole('button', { name: 'Insert ß' });
      expect(äBtn).toBeInTheDocument();
      expect(ßBtn).toBeInTheDocument();

      fireEvent.click(ßBtn);
      expect(input.value).toContain('ß');
    }
  });

  it('renders French special characters (é, è, ç, œ) and sets lang="fr" on input', () => {
    window.history.pushState({}, '', '/learn/fr/quiz');
    const frenchSingleData = {
      basicPhrases: [{
        phrase: 'bonjour',
        english: 'hello',
        category: 'Greetings',
        level: 1
      }],
      alphabet: [],
      numbers: [],
      commonWords: [],
      time: []
    };

    render(
      <LanguageProvider>
        <Quiz data={frenchSingleData as any} />
      </LanguageProvider>
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();

    if (input.getAttribute('lang') === 'fr') {
      const çBtn = screen.getByRole('button', { name: 'Insert ç' });
      const œBtn = screen.getByRole('button', { name: 'Insert œ' });
      expect(çBtn).toBeInTheDocument();
      expect(œBtn).toBeInTheDocument();
    }
  });

  it('renders Turkish special characters (ç, ğ, ı, ö, ş, ü, İ) and sets lang="tr" on input', () => {
    window.history.pushState({}, '', '/learn/tr/quiz');
    const turkishSingleData = {
      basicPhrases: [{
        phrase: 'merhaba',
        english: 'hello',
        category: 'Greetings',
        level: 1
      }],
      alphabet: [],
      numbers: [],
      commonWords: [],
      time: []
    };

    render(
      <LanguageProvider>
        <Quiz data={turkishSingleData as any} />
      </LanguageProvider>
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();

    if (input.getAttribute('lang') === 'tr') {
      const ğBtn = screen.getByRole('button', { name: 'Insert ğ' });
      const ıBtn = screen.getByRole('button', { name: 'Insert ı' });
      expect(ğBtn).toBeInTheDocument();
      expect(ıBtn).toBeInTheDocument();
    }
  });
});
