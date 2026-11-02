import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import Quiz from '../components/Quiz';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ProgressService } from '../services/progressService';
import { SupportedLanguageId } from '../data/languages/types';
import { renderSettled, settle } from './testUtils';

window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = vi.fn();
window.scrollTo = vi.fn() as any;

const setPair = (target: SupportedLanguageId, base: SupportedLanguageId, mode = 'writing') => {
  localStorage.clear();
  localStorage.setItem('basic_language_target_lang', target);
  localStorage.setItem('basic_language_base_lang', base);
  localStorage.setItem('basic_quiz_mode', mode);
  localStorage.setItem(`basic_quiz_mode_${target}`, mode);
};

const renderWithLang = (data: any) =>
  renderSettled(
    <LanguageProvider>
      <Quiz data={data} />
    </LanguageProvider>
  );

const getInput = () => screen.getByRole('textbox') as HTMLInputElement;

const check = async (text: string) => {
  fireEvent.change(getInput(), { target: { value: text } });
  fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
  await settle();
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(ProgressService, 'recordQuizSession').mockResolvedValue({
    id: 's1',
    userId: 'guest',
    category: 'mixed',
    score: 0,
    totalQuestions: 0,
    percentage: 0,
    completedAt: new Date().toISOString(),
  } as any);
});

afterEach(() => {
  vi.restoreAllMocks();
});

const singleLetter = { alphabet: [{ character: 'А', pronunciation: 'ah' }] };

describe('Quiz - changing the session goal mid-quiz', () => {
  it('finishes the session right away when you already answered at least the new goal', async () => {
    setPair('ru', 'en');
    await renderSettled(<Quiz data={singleLetter} />);

    // Default goal is 10. Answer 5 questions, then shrink the goal to 5.
    for (let i = 1; i <= 5; i++) {
      await check('ah');
      if (i < 5) {
        fireEvent.click(screen.getByRole('button', { name: new RegExp(`Next Question \\(${i + 1}/10\\)`, 'i') }));
        await settle();
      }
    }

    fireEvent.click(screen.getByRole('button', { name: '5 Qs' }));
    await settle();

    expect(await screen.findByText('Quiz Session Complete!')).toBeInTheDocument();
    expect(ProgressService.recordQuizSession).toHaveBeenCalledTimes(1);
    expect(ProgressService.recordQuizSession).toHaveBeenCalledWith(
      expect.objectContaining({ category: 'mixed', score: 5, totalQuestions: 5 })
    );
  });

  it('does nothing when the same goal is chosen again', async () => {
    setPair('ru', 'en');
    await renderSettled(<Quiz data={singleLetter} />);
    await check('ah');
    fireEvent.click(screen.getByRole('button', { name: '10 Qs' }));
    await settle();
    expect(screen.queryByText('Quiz Session Complete!')).not.toBeInTheDocument();
    expect(ProgressService.recordQuizSession).not.toHaveBeenCalled();
  });

  it('keeps the quiz going when the new goal is still ahead of your progress', async () => {
    setPair('ru', 'en');
    await renderSettled(<Quiz data={singleLetter} />);
    await check('ah');
    fireEvent.click(screen.getByRole('button', { name: '20 Qs' }));
    await settle();
    expect(screen.queryByText('Quiz Session Complete!')).not.toBeInTheDocument();
    expect(ProgressService.recordQuizSession).not.toHaveBeenCalled();
  });
});

describe('Quiz - Enter key', () => {
  it('Enter on the page moves to the next question after answering', async () => {
    setPair('ru', 'en');
    await renderSettled(<Quiz data={singleLetter} />);
    await check('ah');
    expect(screen.getByRole('button', { name: /Next Question \(2\/10\)/i })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Enter' });
    await settle();

    // Back to an unanswered question with the check button
    expect(screen.getByRole('button', { name: /Check Answer/i })).toBeInTheDocument();
    expect(getInput().value).toBe('');
  });

  it('Enter inside the input checks the answer, then advances', async () => {
    setPair('ru', 'en');
    await renderSettled(<Quiz data={singleLetter} />);
    fireEvent.change(getInput(), { target: { value: 'ah' } });

    fireEvent.keyDown(getInput(), { key: 'Enter' });
    await settle();
    expect(screen.getByRole('button', { name: /Next Question/i })).toBeInTheDocument();

    fireEvent.keyDown(getInput(), { key: 'Enter' });
    await settle();
    expect(screen.getByRole('button', { name: /Check Answer/i })).toBeInTheDocument();
  });

  it('Enter on the last answered question completes the quiz, and Enter again starts a new one', async () => {
    setPair('ru', 'en');
    await renderSettled(<Quiz data={singleLetter} />);
    fireEvent.click(screen.getByRole('button', { name: '5 Qs' }));
    await settle();

    for (let i = 1; i <= 5; i++) {
      await check('ah');
      fireEvent.keyDown(window, { key: 'Enter' });
      await settle();
    }

    expect(await screen.findByText('Quiz Session Complete!')).toBeInTheDocument();
    expect(ProgressService.recordQuizSession).toHaveBeenCalledTimes(1);

    // Enter on the recap starts the next quiz
    fireEvent.keyDown(window, { key: 'Enter' });
    await settle();
    await waitFor(() => expect(screen.queryByText('Quiz Session Complete!')).not.toBeInTheDocument());
    expect(screen.getByRole('button', { name: /Check Answer/i })).toBeInTheDocument();
  });

  it('Enter inside the answered input on the last question also completes the quiz', async () => {
    setPair('ru', 'en');
    await renderSettled(<Quiz data={singleLetter} />);
    fireEvent.click(screen.getByRole('button', { name: '5 Qs' }));
    await settle();

    for (let i = 1; i <= 5; i++) {
      fireEvent.change(getInput(), { target: { value: 'ah' } });
      fireEvent.keyDown(getInput(), { key: 'Enter' }); // check
      await settle();
      fireEvent.keyDown(getInput(), { key: 'Enter' }); // next / complete
      await settle();
    }
    expect(await screen.findByText('Quiz Session Complete!')).toBeInTheDocument();
  });

  it('other keys do nothing', async () => {
    setPair('ru', 'en');
    await renderSettled(<Quiz data={singleLetter} />);
    await check('ah');
    fireEvent.keyDown(window, { key: 'a' });
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByRole('button', { name: /Next Question/i })).toBeInTheDocument();
  });
});

describe('Quiz - Russian typing shortcuts', () => {
  const russian = { commonWords: [{ english: 'Cat', russian: 'Кот', pronunciation: 'kot' }] };

  beforeEach(() => {
    // Listening mode with a Russian target always expects Cyrillic input.
    setPair('ru', 'en', 'listening');
  });

  it("turns an apostrophe or backtick into the soft sign ь", async () => {
    await renderWithLang(russian);
    fireEvent.change(getInput(), { target: { value: "u'" } });
    expect(getInput().value).toBe('uь');

    fireEvent.change(getInput(), { target: { value: 'u`' } });
    expect(getInput().value).toBe('uь');
  });

  it('turns a double quote into the hard sign ъ', async () => {
    await renderWithLang(russian);
    fireEvent.change(getInput(), { target: { value: 'ob"' } });
    expect(getInput().value).toBe('obъ');
  });

  it('converts letter pairs such as "ya" to Cyrillic as you type', async () => {
    await renderWithLang(russian);
    fireEvent.change(getInput(), { target: { value: 'ya' } });
    expect(getInput().value).toBe('я');
  });

  it('transliterates the whole word when you press space or punctuation', async () => {
    await renderWithLang(russian);
    fireEvent.change(getInput(), { target: { value: 'privet ' } });
    expect(getInput().value).toBe('привет ');

    fireEvent.change(getInput(), { target: { value: 'poka!' } });
    expect(getInput().value).toBe('пока!');
  });

  it('leaves plain Latin letters alone until a trigger is typed', async () => {
    await renderWithLang(russian);
    fireEvent.change(getInput(), { target: { value: 'priv' } });
    expect(getInput().value).toBe('priv');
  });

  it('accepts a phonetically typed Russian answer once converted', async () => {
    await renderWithLang(russian);
    // Listening mode: the spoken Russian word is the answer
    fireEvent.change(getInput(), { target: { value: 'kot ' } });
    expect(getInput().value).toBe('кот ');
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
    await settle();
    expect(screen.getByText(/Correct!|Отлично|Верно/i)).toBeInTheDocument();
  });
});

describe('Quiz - spelling tolerance when checking answers', () => {
  const words = {
    basicPhrases: [{ phrase: 'Casa', translation: 'House', pronunciation: 'KAH-sah' }],
  };
  const long = {
    basicPhrases: [{ phrase: 'Hermoso', translation: 'Beautiful', pronunciation: 'er-MOH-so' }],
  };

  beforeEach(() => {
    setPair('es', 'en', 'writing');
    vi.spyOn(Math, 'random').mockReturnValue(0.1); // Spanish → English question
  });

  it('accepts an exact answer', async () => {
    await renderWithLang(words);
    await check('House');
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
  });

  it('is not case sensitive', async () => {
    await renderWithLang(words);
    await check('hOuSe');
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
  });

  it('accepts one typo in a short word and points out the right spelling', async () => {
    await renderWithLang(words);
    await check('Houze');
    expect(screen.getByText(/Correct!|Almost right/i)).toBeInTheDocument();
    expect(screen.queryByText('Not quite')).not.toBeInTheDocument();
  });

  it('accepts up to two typos in a long word', async () => {
    await renderWithLang(long);
    await check('Beutifal'); // two edits away from Beautiful
    expect(screen.queryByText('Not quite')).not.toBeInTheDocument();
  });

  it('accepts an answer that contains the right word with a little extra', async () => {
    await renderWithLang(words);
    await check('Houses');
    expect(screen.queryByText('Not quite')).not.toBeInTheDocument();
  });

  it('rejects an unrelated word', async () => {
    await renderWithLang(words);
    await check('Banana');
    expect(screen.getByText('Not quite')).toBeInTheDocument();
  });

  // Regression: a one-letter change that makes a different real word used to be marked correct.
  it.each([
    ['Casa', 'House', 'Mouse'],
    ['Gato', 'Cat', 'Cut'],
    ['Gato', 'Cat', 'Car'],
    ['Frío', 'Cold', 'Gold'],
    ['Noche', 'Night', 'Light'],
    ['Perro', 'Dog', 'Dig'],
  ])('rejects a different word one letter away: %s (%s) answered "%s"', async (phrase, meaning, typed) => {
    await renderWithLang({ basicPhrases: [{ phrase, translation: meaning, pronunciation: '' }] });
    await check(typed);
    expect(screen.getByText('Not quite')).toBeInTheDocument();
  });

  it('still accepts a keyboard slip on a short word it can only be a typo of', async () => {
    await renderWithLang({ basicPhrases: [{ phrase: 'Agua', translation: 'Water', pronunciation: '' }] });
    await check('Watr');
    expect(screen.queryByText('Not quite')).not.toBeInTheDocument();
  });

  it('rejects a phrase with one wrong word even though most words match', async () => {
    await renderWithLang({
      basicPhrases: [{ phrase: 'Me gusta mi coche', translation: 'I like my car', pronunciation: '' }],
    });
    await check('I like my banana');
    expect(screen.getByText('Not quite')).toBeInTheDocument();
  });

  it('rejects a phrase where one word is swapped for a similar word', async () => {
    await renderWithLang({
      basicPhrases: [{ phrase: 'Me gusta mi gato', translation: 'I like my cat', pronunciation: '' }],
    });
    await check('I like my car');
    expect(screen.getByText('Not quite')).toBeInTheDocument();
  });

  it('still accepts a slip inside a phrase', async () => {
    await renderWithLang({
      basicPhrases: [{ phrase: 'Dónde está el baño', translation: 'Where is the bathroom', pronunciation: '' }],
    });
    await check('where is the bathrom');
    expect(screen.queryByText('Not quite')).not.toBeInTheDocument();
  });

  it('rejects a different short Russian word one letter away', async () => {
    setPair('ru', 'en', 'listening');
    await renderWithLang({ commonWords: [{ english: 'House', russian: 'дом', pronunciation: 'dom' }] });
    await check('дым');
    expect(screen.getByText('Not quite')).toBeInTheDocument();
  });

  it('rejects a too-short or empty-looking answer', async () => {
    await renderWithLang(long);
    await check('Be');
    expect(screen.getByText('Not quite')).toBeInTheDocument();
  });

  it('is strict for single letters in the alphabet quiz', async () => {
    setPair('ru', 'en', 'writing');
    await renderSettled(<Quiz data={singleLetter} />);
    await check('b');
    expect(screen.getByText('Not quite')).toBeInTheDocument();
  });
});

describe('Quiz - placeholder names the language to answer in', () => {
  // Target Spanish: writing questions either ask for the answer in the learner's
  // language (Spanish → base) or in Spanish (base → Spanish). Either way the hint
  // must be written in the learner's own language, never English.
  const bases: Array<{ base: SupportedLanguageId; toBase: string; toTarget: RegExp }> = [
    { base: 'fr', toBase: 'Écrivez en français...', toTarget: /^Écrivez en .+\.\.\.$/ },
    { base: 'de', toBase: 'Tippe auf Deutsch...', toTarget: /^Tippe auf .+\.\.\.$/ },
    { base: 'pt', toBase: 'Digite em português...', toTarget: /^Digite em .+\.\.\.$/ },
    { base: 'id', toBase: 'Ketik dalam bahasa Indonesia...', toTarget: /^Ketik dalam .+\.\.\.$/ },
    { base: 'tr', toBase: 'Türkçe yazın...', toTarget: /dilinde yazın\.\.\.$/ },
    { base: 'ja', toBase: '日本語で入力...', toTarget: /で入力\.\.\.$/ },
    { base: 'ko', toBase: '한국어로 입력...', toTarget: /로 입력\.\.\.$/ },
    { base: 'zh', toBase: '用中文输入...', toTarget: /^用.+输入\.\.\.$/ },
    { base: 'hi', toBase: 'हिन्दी में लिखें...', toTarget: /में लिखें\.\.\.$/ },
    { base: 'ar', toBase: 'اكتب بالعربية...', toTarget: /^اكتب ب.+\.\.\.$/ },
    { base: 'bn', toBase: 'বাংলায় লিখুন...', toTarget: /-এ লিখুন\.\.\.$/ },
    { base: 'ur', toBase: 'اردو میں لکھیں...', toTarget: /میں لکھیں\.\.\.$/ },
  ];
  const data = { basicPhrases: [{ phrase: 'Casa', translation: 'House', pronunciation: 'KAH-sah' }] };

  it.each(bases)('$base: answering in your own language uses the localized hint', async ({ base, toBase }) => {
    setPair('es', base, 'writing');
    vi.spyOn(Math, 'random').mockReturnValue(0.1); // target → base
    await renderWithLang(data);
    await waitFor(() => expect(getInput()).toBeInTheDocument());
    expect(getInput().placeholder).toBe(toBase);
  });

  it.each(bases)('$base: answering in the course language uses the localized hint', async ({ base, toTarget }) => {
    setPair('es', base, 'writing');
    vi.spyOn(Math, 'random').mockReturnValue(0.99); // base → target
    await renderWithLang(data);
    await waitFor(() => expect(getInput()).toBeInTheDocument());
    expect(getInput().placeholder).toMatch(toTarget);
    expect(getInput().placeholder).not.toMatch(/^Type in /);
  });
});

