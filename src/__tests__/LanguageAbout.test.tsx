import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageAbout from '../components/LanguageAbout';
import Alphabet from '../components/Alphabet';
import chineseData from '../data/languages/zh/chineseData';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { SupportedLanguageId } from '../data/languages/types';
import { ABOUT_LANGUAGES } from '../data/languages/aboutLanguageData';

// Mock audio playback APIs
window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = vi.fn();

const TestLanguagePairWrapper: React.FC<{
  targetLang: SupportedLanguageId;
  baseLang: SupportedLanguageId;
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
  targetLang: SupportedLanguageId;
  baseLang: SupportedLanguageId;
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

describe('LanguageAbout & Origins Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders hero information, quick facts, and history for Mandarin Chinese', () => {
    render(
      <TestLanguagePairWrapper targetLang="zh" baseLang="en">
        <LanguageAbout currentLanguage="zh" baseLanguage="en" />
      </TestLanguagePairWrapper>
    );

    // Hero title & metadata
    expect(screen.getByText('The Story of Mandarin & Simplified Chinese')).toBeInTheDocument();
    expect(screen.getByText('1.1+ Billion Native Speakers')).toBeInTheDocument();
    expect(screen.getByText(/Simplified Chinese Characters \(简体字\) & Hanyu Pinyin/i)).toBeInTheDocument();
    expect(screen.getByText('Sino-Tibetan')).toBeInTheDocument();

    // Timeline milestones
    expect(screen.getByText(/Oracle Bone Script/i)).toBeInTheDocument();
    expect(screen.getByText(/Imperial Script Unification/i)).toBeInTheDocument();
    expect(screen.getByText(/The Literacy Crisis & Simplified Characters/i)).toBeInTheDocument();
    expect(screen.getByText(/Zhou Youguang & The Invention of Pinyin/i)).toBeInTheDocument();

    // Linguistic traits
    expect(screen.getByText(/No Verb Conjugation/i)).toBeInTheDocument();
    expect(screen.getByText(/Measure Words/i)).toBeInTheDocument();
    expect(screen.getByText(/Cultural Reflection:/i)).toBeInTheDocument();
  });

  it('renders Traditional vs. Simplified comparison cards for Chinese with stroke savings and audio', () => {
    render(
      <TestLanguagePairWrapper targetLang="zh" baseLang="en">
        <LanguageAbout currentLanguage="zh" baseLanguage="en" />
      </TestLanguagePairWrapper>
    );

    // Section title
    expect(screen.getByText(/Traditional vs. Simplified Characters/i)).toBeInTheDocument();

    // Specific character comparisons
    expect(screen.getByText('國')).toBeInTheDocument();
    expect(screen.getByText('国')).toBeInTheDocument();
    expect(screen.getAllByText('-3 strokes').length).toBeGreaterThan(0);

    expect(screen.getByText('學')).toBeInTheDocument();
    expect(screen.getByText('学')).toBeInTheDocument();
    expect(screen.getByText('-8 strokes')).toBeInTheDocument();

    expect(screen.getByText('愛')).toBeInTheDocument();
    expect(screen.getByText('爱')).toBeInTheDocument();
    expect(screen.getByText('guó')).toBeInTheDocument();
    expect(screen.getByText('xué')).toBeInTheDocument();
    expect(screen.getByText('ài')).toBeInTheDocument();

    // Click audio button for simplified character
    const audioBtn = screen.getByLabelText(/Listen to 国/i);
    expect(audioBtn).toBeInTheDocument();
    fireEvent.click(audioBtn);
  });

  it('renders all 15 supported languages without errors and has profiles', () => {
    const allLangs: SupportedLanguageId[] = [
      'en', 'es', 'fr', 'de', 'ru', 'pt', 'id', 'tr',
      'zh', 'ja', 'ko', 'hi', 'ar', 'bn', 'ur'
    ];

    allLangs.forEach(lang => {
      const profile = ABOUT_LANGUAGES[lang];
      expect(profile).toBeDefined();
      expect(profile.title).toBeTruthy();
      expect(profile.facts.length).toBeGreaterThan(0);
      expect(profile.historyTimeline.length).toBeGreaterThan(0);
      expect(profile.linguisticTraits.length).toBeGreaterThan(0);
    });
  });

  it('switches between Alphabet, Grammar, and About tabs in Alphabet component', () => {
    render(
      <TestLanguagePairWrapper targetLang="zh" baseLang="en">
        <Alphabet data={chineseData.alphabet} />
      </TestLanguagePairWrapper>
    );

    // Initial state: Alphabet view
    expect(screen.getByRole('tab', { name: /Alphabet & Sounds/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /About & Origins & History/i })).toHaveAttribute('aria-selected', 'false');

    // Teaser banner is visible in Chinese
    const teaser = screen.getByLabelText(/Learn about the history of Chinese writing/i);
    expect(teaser).toBeInTheDocument();

    // Click teaser banner to switch to About view
    fireEvent.click(teaser);
    expect(screen.getByRole('tab', { name: /About & Origins & History/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('The Story of Mandarin & Simplified Chinese')).toBeInTheDocument();

    // Switch back to Alphabet view
    fireEvent.click(screen.getByRole('tab', { name: /Alphabet & Sounds/i }));
    expect(screen.getByRole('tab', { name: /Alphabet & Sounds/i })).toHaveAttribute('aria-selected', 'true');

    // Switch to Grammar tab
    fireEvent.click(screen.getByRole('tab', { name: /Grammar & Flashcards/i }));
    expect(screen.getByRole('tab', { name: /Grammar & Flashcards/i })).toHaveAttribute('aria-selected', 'true');
  });
});
