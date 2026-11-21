import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PinyinGuide from '../components/PinyinGuide';
import Alphabet from '../components/Alphabet';
import chineseData from '../data/languages/zh/chineseData';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { SupportedLanguageId } from '../data/languages/types';

// Mock speech audio APIs
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

describe('PinyinGuide Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders Pinyin & Tones guide header and 5 tone cards by default in English', () => {
    render(<PinyinGuide baseLanguage="en" />);

    expect(screen.getByText(/How Pinyin & Tones Work/i)).toBeInTheDocument();
    expect(screen.getByText(/The bridge from Latin letters to Chinese characters/i)).toBeInTheDocument();

    // Verify 5 tone cards
    expect(screen.getByText(/1st Tone \(High Flat/i)).toBeInTheDocument();
    expect(screen.getByText(/2nd Tone \(Rising/i)).toBeInTheDocument();
    expect(screen.getByText(/3rd Tone \(Falling-Rising Dip/i)).toBeInTheDocument();
    expect(screen.getByText(/4th Tone \(Falling Sharp/i)).toBeInTheDocument();
    expect(screen.getByText(/Neutral Tone \(Light/i)).toBeInTheDocument();

    // Verify characters and meanings
    expect(screen.getByText('妈')).toBeInTheDocument();
    expect(screen.getByText('"Mother"')).toBeInTheDocument();
    expect(screen.getByText('马')).toBeInTheDocument();
    expect(screen.getByText('"Horse"')).toBeInTheDocument();
  });

  it('localizes Pinyin guide into Russian for Russian native speakers', () => {
    render(<PinyinGuide baseLanguage="ru" />);

    expect(screen.getByText(/Как устроены пиньинь и тоны/i)).toBeInTheDocument();
    expect(screen.getByText(/Мост от латинских букв к китайским иероглифам/i)).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /4 тона и нейтральный/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Формула слога/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Как печатать иероглифы/i })).toBeInTheDocument();
  });

  it('allows collapsing and expanding the guide', () => {
    render(<PinyinGuide baseLanguage="en" />);

    const toggleBtn = screen.getByRole('button', { name: /Hide Guide/i });
    expect(screen.getByText(/1st Tone/i)).toBeInTheDocument();

    // Collapse
    fireEvent.click(toggleBtn);
    expect(screen.queryByText(/1st Tone/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Show Pinyin & Tones Guide/i })).toBeInTheDocument();

    // Expand again
    fireEvent.click(screen.getByRole('button', { name: /Show Pinyin & Tones Guide/i }));
    expect(screen.getByText(/1st Tone/i)).toBeInTheDocument();
  });

  it('switches between Tones, Syllable Anatomy, and Typing tabs', () => {
    render(<PinyinGuide baseLanguage="en" />);

    // Switch to Syllable Anatomy
    fireEvent.click(screen.getByRole('tab', { name: /Syllable Anatomy/i }));
    expect(screen.getByText(/Anatomy of a Mandarin Syllable/i)).toBeInTheDocument();
    expect(screen.getByText(/Initial · 声母/i)).toBeInTheDocument();
    expect(screen.getByText(/Final · 韵母/i)).toBeInTheDocument();
    expect(screen.getByText(/1\. The 21 Initials/i)).toBeInTheDocument();

    // Switch to How Latin Letters Become Hanzi (Typing)
    fireEvent.click(screen.getByRole('tab', { name: /How Latin Letters Become Hanzi/i }));
    expect(screen.getByText(/How Latin Letters Become Chinese Characters/i)).toBeInTheDocument();
    expect(screen.getByText(/Type Latin letters without tones/i)).toBeInTheDocument();
    expect(screen.getByText(/Keyboard predicts matching Hanzi/i)).toBeInTheDocument();
    expect(screen.getByText(/Why Characters \(Hanzi\) Still Matter/i)).toBeInTheDocument();
    expect(screen.getAllByText(/To be/i).length).toBeGreaterThan(0);
  });
});

describe('Chinese Alphabet Filter Bar Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders PinyinGuide and filter chips when target language is Chinese', () => {
    render(
      <TestLanguagePairWrapper targetLang="zh" baseLang="en">
        <Alphabet data={chineseData.alphabet} />
      </TestLanguagePairWrapper>
    );

    // Guide is displayed
    expect(screen.getByText(/How Pinyin & Tones Work/i)).toBeInTheDocument();

    // Sound filter buttons are displayed
    expect(screen.getByRole('button', { name: /All Sounds \(29\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Initials · 声母 \(21\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Finals · 韵母 \(8\)/i })).toBeInTheDocument();

    // Initially all 29 are present (e.g. b and a)
    expect(screen.getByText('爸爸')).toBeInTheDocument(); // b
    expect(screen.getByText('阿姨')).toBeInTheDocument(); // a

    // Filter to Initials only: 'b' should remain, but 'a' (final) should be filtered out
    fireEvent.click(screen.getByRole('button', { name: /Initials · 声母 \(21\)/i }));
    expect(screen.getByText('爸爸')).toBeInTheDocument();
    expect(screen.queryByText('阿姨')).not.toBeInTheDocument();

    // Filter to Finals only: 'a' should be visible, 'b' should be filtered out
    fireEvent.click(screen.getByRole('button', { name: /Finals · 韵母 \(8\)/i }));
    expect(screen.getByText('阿姨')).toBeInTheDocument();
    expect(screen.queryByText('爸爸')).not.toBeInTheDocument();
  });
});
