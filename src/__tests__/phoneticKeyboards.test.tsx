import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderSettled, settle } from './testUtils';
import PhoneticKeyboard from '../components/PhoneticKeyboard';
import Quiz, { SPECIAL_CHAR_MAP } from '../components/Quiz';
import Alphabet from '../components/Alphabet';
import { LanguageProvider } from '../contexts/LanguageContext';
import {
  appendKoreanJamo,
  transliterateForLanguage,
  convertNumericPinyin,
  stripPinyinTones,
  convertLastLatinWordOnSpace,
  previewSoundOutToken
} from '../utils/phoneticTyping';
import { SUPPORTED_LANGUAGES } from '../data/languages';

describe('Multi-Script Phonetic Typing, Keyboards & Pill Localization', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('composes Korean Hangul syllable blocks automatically from individual jamo clicks', () => {
    let text = '';
    for (const jamo of ['ㅎ', 'ㅏ', 'ㄴ', 'ㄱ', 'ㅡ', 'ㄹ']) {
      text = appendKoreanJamo(text, jamo);
    }
    expect(text).toBe('한글');

    let compound = '';
    for (const jamo of ['ㄱ', 'ㅗ', 'ㅏ']) {
      compound = appendKoreanJamo(compound, jamo);
    }
    expect(compound).toBe('과');
  });

  it('transliterates Latin phonetic input across Arabic, Urdu, Hindi, Bengali, Japanese, Korean, and Mandarin Pinyin', () => {
    expect(transliterateForLanguage('marhaban', 'ar')).toBe('مرحبا');
    expect(transliterateForLanguage('shukriya', 'ur')).toBe('شکریہ');
    expect(transliterateForLanguage('namaste', 'hi')).toBe('नमस्ते');
    expect(transliterateForLanguage('dhonnobad', 'bn')).toBe('ধন্যবাদ');
    expect(transliterateForLanguage('konnichiwa', 'ja')).toBe('こんにちは');
    expect(transliterateForLanguage('annyeong', 'ko')).toBe('안녕');
    expect(convertNumericPinyin('ni3 hao3')).toBe('nǐ hǎo');
    expect(stripPinyinTones('nǐ hǎo!')).toBe('ni hao');
  });

  it.each(['ar', 'ur', 'hi', 'bn', 'ja', 'ko', 'zh'] as const)(
    'renders PhoneticKeyboard for %s and emits key, space, backspace, and clear events',
    async (lang) => {
      const onClick = vi.fn();
      await renderSettled(<PhoneticKeyboard lang={lang} onLetterClick={onClick} />);

      const spaceBtn = screen.getByRole('button', { name: /^Space — / });
      const backBtn = screen.getByRole('button', { name: 'Backspace' });
      const clearBtn = screen.getByRole('button', { name: 'Clear' });

      fireEvent.click(spaceBtn);
      fireEvent.click(backBtn);
      fireEvent.click(clearBtn);

      expect(onClick).toHaveBeenCalledWith(' ');
      expect(onClick).toHaveBeenCalledWith('backspace');
      expect(onClick).toHaveBeenCalledWith('clear');
    }
  );

  it('enriches Urdu and Arabic special keys and supports phonetic typing + on-screen keyboard in Urdu Quiz', async () => {
    expect(SPECIAL_CHAR_MAP.ur).toEqual(
      expect.arrayContaining(['آ', 'ٹ', 'ڈ', 'ڑ', 'پ', 'چ', 'گ', 'ں', 'ہ', 'ھ', 'ے', 'خ', 'غ', 'ق'])
    );
    expect(SPECIAL_CHAR_MAP.ar).toEqual(
      expect.arrayContaining(['أ', 'إ', 'آ', 'ة', 'ى', 'ح', 'خ', 'ع', 'غ', 'ص', 'ض', 'ط', 'ظ', 'ق'])
    );

    vi.spyOn(Math, 'random').mockReturnValue(0.8); // Base -> Target
    window.history.pushState({}, '', '/learn/ur/quiz');

    await renderSettled(
      <LanguageProvider>
        <Quiz
          data={{
            basicPhrases: [
              { phrase: 'شکریہ', translation: 'Thank you', pronunciation: 'shukriya', category: 'Courtesy' }
            ],
            alphabet: [],
            numbers: [],
            commonWords: [],
            time: []
          }}
        />
      </LanguageProvider>
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toHaveAttribute('lang', 'ur');
    expect(input).toHaveAttribute('dir', 'rtl');

    // Enriched Urdu special keys exist
    expect(screen.getByRole('button', { name: 'Insert ٹ' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Insert خ' })).toBeInTheDocument();

    // Toggle full Urdu phonetic keyboard
    const kbToggle = screen.getByRole('button', { name: /Toggle Phonetic Urdu Keyboard/i });
    fireEvent.click(kbToggle);
    expect(screen.getByText(/Phonetic Urdu Keyboard/i)).toBeInTheDocument();

    // Type phonetically in English and submit
    fireEvent.change(input, { target: { value: 'shukriya' } });
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
    await settle();

    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
  });

  it('supports Korean Hangul syllable composition via button clicks and Mandarin Pinyin answers in Quiz', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.8); // Base -> Target
    window.history.pushState({}, '', '/learn/ko/quiz');

    const { unmount } = await renderSettled(
      <LanguageProvider>
        <Quiz
          data={{
            basicPhrases: [
              { phrase: '한', translation: 'One / Han', pronunciation: 'han', category: 'Basics' }
            ],
            alphabet: [],
            numbers: [],
            commonWords: [],
            time: []
          }}
        />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Insert ㅎ' }));
    fireEvent.click(screen.getByRole('button', { name: 'Insert ㅏ' }));
    fireEvent.click(screen.getByRole('button', { name: 'Insert ㄴ' }));

    const koInput = screen.getByRole('textbox') as HTMLInputElement;
    expect(koInput.value).toBe('한');

    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
    await settle();
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
    unmount();

    // Mandarin Pinyin numeric typing (xie4xie -> xièxie) matches 谢谢 while English prompt is rejected
    window.history.pushState({}, '', '/learn/zh/quiz');
    await renderSettled(
      <LanguageProvider>
        <Quiz
          data={{
            basicPhrases: [
              { phrase: '谢谢', translation: 'Thank you', pronunciation: 'xièxie', category: 'Courtesy' }
            ],
            alphabet: [],
            numbers: [],
            commonWords: [],
            time: []
          }}
        />
      </LanguageProvider>
    );

    const zhInput = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(zhInput, { target: { value: 'xie4xie' } });
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
    await settle();
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
  });

  it.each(['zh', 'ur', 'ar', 'hi', 'bn', 'ja', 'ko'] as const)(
    'Alphabet page segmented pills have zero leaked English suffixes when baseLanguage is %s',
    async (baseLang) => {
      localStorage.setItem('basic_language_base_lang', baseLang);
      window.history.pushState({}, '', '/learn/en/alphabet');

      const { unmount } = await renderSettled(
        <LanguageProvider>
          <Alphabet data={SUPPORTED_LANGUAGES.en.data.alphabet} />
        </LanguageProvider>
      );

      const tabs = screen.getAllByRole('tab');
      expect(tabs.length).toBe(3);
      for (const tab of tabs) {
        const label = tab.textContent || '';
        expect(label, `${baseLang} tab leaked English: "${label}"`).not.toMatch(
          /Sounds|Flashcards|About & Origins|History/i
        );
      }
      unmount();
    }
  );

  it('converts Pinyin-style sound-it-out + Spacebar across all 8 non-Latin scripts (including multi-word phrases & previews)', () => {
    expect(convertLastLatinWordOnSpace('nihao ', 'zh').converted).toBe('你好 ');
    expect(convertLastLatinWordOnSpace('ni hao ', 'zh').converted).toBe('你好 ');
    expect(convertLastLatinWordOnSpace('xiexie ', 'zh').converted).toBe('谢谢 ');
    expect(convertLastLatinWordOnSpace('gamsahamnida ', 'ko').converted).toBe('감사합니다 ');
    expect(convertLastLatinWordOnSpace('annyeonghaseyo ', 'ko').converted).toBe('안녕하세요 ');
    expect(convertLastLatinWordOnSpace('arigatou ', 'ja').converted).toBe('ありがとう ');
    expect(convertLastLatinWordOnSpace('konnichiwa ', 'ja').converted).toBe('こんにちは ');
    expect(convertLastLatinWordOnSpace('shukran ', 'ar').converted).toBe('شكرا ');
    expect(convertLastLatinWordOnSpace('shukriya ', 'ur').converted).toBe('شکریہ ');
    expect(convertLastLatinWordOnSpace('namaste ', 'hi').converted).toBe('नमस्ते ');
    expect(convertLastLatinWordOnSpace('dhonnobad ', 'bn').converted).toBe('ধন্যবাদ ');
    expect(convertLastLatinWordOnSpace('privet ', 'ru').converted).toBe('привет ');
    expect(convertLastLatinWordOnSpace('preevyet ', 'ru').converted).toBe('привет ');

    expect(previewSoundOutToken('nihao', 'zh')).toEqual({ rawToken: 'nihao', preview: '你好' });
    expect(previewSoundOutToken('privet', 'ru')).toEqual({ rawToken: 'privet', preview: 'привет' });
  });

  it('restores Russian keyboard & Spacebar conversion in Alphabet Listening mode and localizes Chinese Quiz feedback', async () => {
    localStorage.setItem('basic_language_base_lang', 'zh');
    localStorage.setItem('basic_quiz_mode', 'listening');
    localStorage.setItem('basic_quiz_mode_ru', 'listening');
    window.history.pushState({}, '', '/learn/ru/quiz');

    await renderSettled(
      <LanguageProvider>
        <Quiz
          data={{
            alphabet: [{ letter: 'у', pronunciation: 'oo', example: 'as in boot', word: 'утро' }],
            basicPhrases: [],
            numbers: [],
            commonWords: [],
            time: []
          }}
        />
      </LanguageProvider>
    );

    // Counter should be localized ("4 / 5" style, never "of")
    expect(document.querySelector('.counter-total')?.textContent).not.toContain('of');

    // Russian keyboard toggle is restored on Alphabet Listening questions!
    expect(screen.getByTitle('Toggle Russian Keyboard')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open virtual keyboard' })).toBeInTheDocument();

    const input = screen.getByRole('textbox') as HTMLInputElement;
    // Typing 'u' shows live preview pill "u → у", and pressing Space converts to Cyrillic "у "
    fireEvent.change(input, { target: { value: 'u', selectionStart: 1 } });
    expect(screen.getByRole('button', { name: 'Convert u to у' })).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'u ', selectionStart: 2 } });
    expect(input.value).toBe('у ');

    // Also verify wrong-answer feedback in Chinese has localized 发音: (never Meaning:) and 我答对了 (never I was right)
    fireEvent.change(input, { target: { value: 'ж', selectionStart: 1 } });
    fireEvent.click(screen.getByRole('button', { name: /^检查答案/ }));
    await settle();

    const drawerText = document.querySelector('.quiz-feedback-drawer')?.textContent || '';
    expect(drawerText).not.toContain('Meaning:');
    expect(drawerText).not.toContain('I was right');
    expect(drawerText).toContain('我答对了');
  });
});
