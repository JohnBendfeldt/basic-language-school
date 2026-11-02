import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import Quiz from '../components/Quiz';
import { LanguageProvider } from '../contexts/LanguageContext';
import { SupportedLanguageId } from '../data/languages/types';
import { renderSettled, settle } from './testUtils';

window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = vi.fn();

const setPair = (target: SupportedLanguageId, base: SupportedLanguageId, mode?: string) => {
  localStorage.clear();
  localStorage.setItem('basic_language_target_lang', target);
  localStorage.setItem('basic_language_base_lang', base);
  if (mode) {
    localStorage.setItem(`basic_quiz_mode_${target}`, mode);
    localStorage.setItem('basic_quiz_mode', mode);
  }
};

const wordData = {
  commonWords: [
    { phrase: 'Agua', translation: 'Water', pronunciation: 'AH-gwah' },
    { phrase: 'Casa', translation: 'House', pronunciation: 'KAH-sah' },
  ],
};

const russianWordData = {
  commonWords: [
    { english: 'Cat', russian: 'Кот', pronunciation: 'kot' },
    { english: 'Dog', russian: 'Собака', pronunciation: 'sobaka' },
  ],
};

const renderQuiz = (data: any) =>
  renderSettled(
    <LanguageProvider>
      <Quiz data={data} />
    </LanguageProvider>
  );

const getInput = () => screen.getByRole('textbox') as HTMLInputElement;

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Quiz - listening mode is localized for every base language', () => {
  // Target is Spanish so no Cyrillic keyboard overrides the placeholder.
  // (Base Spanish uses French as target instead.)
  const cases: Array<{ base: SupportedLanguageId; header: string; placeholder: string }> = [
    { base: 'en', header: 'Listen to the audio and type what you hear', placeholder: 'Type what you hear or translation...' },
    { base: 'fr', header: "Écoutez l'audio", placeholder: 'Écrivez ce que vous entendez ou la traduction...' },
    { base: 'de', header: 'Höre das Audio an', placeholder: 'Tippe, was du hörst, oder die Übersetzung...' },
    // Russian speakers answer in Russian, so the Cyrillic-input placeholder takes over.
    { base: 'ru', header: 'Послушайте аудио', placeholder: 'Введите на русском...' },
    { base: 'pt', header: 'Ouça o áudio', placeholder: 'Digite o que você ouve ou a tradução...' },
    { base: 'id', header: 'Dengarkan audio', placeholder: 'Ketik apa yang Anda dengar atau artinya...' },
    { base: 'tr', header: 'Sesi dinleyin', placeholder: 'Duyduğunuzu veya anlamını yazın...' },
    { base: 'ja', header: '音声を聞いて', placeholder: '聞こえた内容または意味を入力...' },
    { base: 'ko', header: '오디오를 듣고', placeholder: '들리는 내용 또는 번역 입력...' },
    { base: 'zh', header: '听音频', placeholder: '输入听到的内容或翻译...' },
    { base: 'hi', header: 'ऑडियो सुनें', placeholder: 'जो सुन रहे हैं या उसका अनुवाद लिखें...' },
    { base: 'ar', header: 'استمع إلى الصوت', placeholder: 'اكتب ما تسمعه أو الترجمة...' },
    { base: 'bn', header: 'অডিও শুনুন', placeholder: 'যা শুনেছেন বা অনুবাদটি লিখুন...' },
    { base: 'ur', header: 'آڈیو سنیں', placeholder: 'جو سنتے ہیں یا ترجمہ لکھیں...' },
  ];

  it.each(cases)('shows the $base header and placeholder in listening mode', async ({ base, header, placeholder }) => {
    setPair('es', base, 'listening');
    await renderQuiz(wordData);

    await waitFor(() => {
      expect(document.body.textContent).toContain(header);
    });
    expect(getInput().placeholder).toBe(placeholder);
  });

  it('localizes the listening header for a Spanish speaker (target French)', async () => {
    setPair('fr', 'es', 'listening');
    await renderQuiz({
      commonWords: [{ phrase: 'Eau', translation: 'Water', pronunciation: 'oh' }],
    });
    await waitFor(() => {
      expect(document.body.textContent).toContain('Escucha el audio');
    });
    expect(getInput().placeholder).toBe('Escribe lo que escuchas o la traducción...');
  });
});

describe('Quiz - writing-mode placeholder is never left in English for non-English learners', () => {
  // Regression: when a Russian learner had to type Russian, the placeholder was hard-coded
  // English ("Type in Russian (or phonetically in English)...") for every base language.
  // The question direction is random, so assert both possible directions are localized.
  const bases: SupportedLanguageId[] = ['es', 'fr', 'de', 'pt', 'id', 'tr', 'ja', 'ko', 'zh', 'hi', 'ar', 'bn', 'ur'];

  it.each(bases)('uses a localized placeholder for base language %s', async (base) => {
    for (const roll of [0.01, 0.99]) {
      const spy = vi.spyOn(Math, 'random').mockReturnValue(roll);
      setPair('ru', base, 'writing');
      const { unmount } = await renderQuiz(russianWordData);

      await waitFor(() => expect(screen.getByRole('textbox')).toBeInTheDocument());
      const placeholder = getInput().placeholder;
      expect(placeholder.length).toBeGreaterThan(0);
      expect(placeholder).not.toBe('Type in English...');
      expect(placeholder).not.toMatch(/^Type in Russian/);

      unmount();
      spy.mockRestore();
    }
  });

  it('keeps the English wording for English speakers', async () => {
    setPair('ru', 'en', 'listening');
    await renderQuiz(russianWordData);
    await waitFor(() => expect(screen.getByRole('textbox')).toBeInTheDocument());
    expect(getInput().placeholder).toBe('Type in Russian (or phonetically in English)...');
  });
});

describe('Quiz - topic and level dropdowns', () => {
  beforeEach(() => {
    setPair('es', 'en', 'writing');
  });

  it('opens the topic list and closes it on an outside click', async () => {
    await renderQuiz(wordData);
    const trigger = screen.getByTestId('topic-dropdown-trigger');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getAllByRole('listbox').length).toBeGreaterThan(0);

    fireEvent.mouseDown(document.body);
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
  });

  it('keeps the list open when clicking inside it', async () => {
    await renderQuiz(wordData);
    const trigger = screen.getByTestId('topic-dropdown-trigger');
    fireEvent.click(trigger);

    const menu = screen.getAllByRole('listbox')[0];
    fireEvent.mouseDown(menu);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes the topic list when Escape is pressed', async () => {
    await renderQuiz(wordData);
    const trigger = screen.getByTestId('topic-dropdown-trigger');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
  });

  it('ignores keys other than Escape while the list is open', async () => {
    await renderQuiz(wordData);
    const trigger = screen.getByTestId('topic-dropdown-trigger');
    fireEvent.click(trigger);

    fireEvent.keyDown(document, { key: 'a' });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('toggles the topic list closed when the trigger is clicked twice', async () => {
    await renderQuiz(wordData);
    const trigger = screen.getByTestId('topic-dropdown-trigger');
    fireEvent.click(trigger);
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('opening one dropdown closes the other', async () => {
    const { container } = await renderQuiz(wordData);
    const topic = screen.getByTestId('topic-dropdown-trigger');
    const levelTrigger = container.querySelectorAll('.quiz-dropdown-trigger')[1] as HTMLElement;
    expect(levelTrigger).toBeTruthy();

    fireEvent.click(topic);
    expect(topic).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(levelTrigger);
    expect(topic).toHaveAttribute('aria-expanded', 'false');
    expect(levelTrigger).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('Quiz - Russian helper keys, phonetic guide, and on-screen keyboard', () => {
  beforeEach(() => {
    // Listening mode with a Russian target always needs Cyrillic input.
    setPair('ru', 'en', 'listening');
  });

  it('inserts a letter from the quick-key bar into the answer', async () => {
    await renderQuiz(russianWordData);
    await waitFor(() => expect(screen.getByRole('toolbar', { name: /Special Russian characters/i })).toBeInTheDocument());

    fireEvent.click(screen.getByRole('button', { name: 'Insert я' }));
    expect(getInput().value).toBe('я');

    fireEvent.click(screen.getByRole('button', { name: 'Insert ь' }));
    expect(getInput().value).toBe('яь');
  });

  it('opens and closes the phonetic typing guide', async () => {
    await renderQuiz(russianWordData);
    const toggle = await screen.findByRole('button', { name: 'Phonetic typing guide' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);
    expect(screen.getByRole('region', { name: 'Phonetic typing guide' })).toBeInTheDocument();
    expect(screen.getByText(/Phonetic Typing Cheatsheet/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close guide' }));
    expect(screen.queryByRole('region', { name: 'Phonetic typing guide' })).not.toBeInTheDocument();
  });

  it('shows the full Russian keyboard and supports insert, space, backspace and clear', async () => {
    await renderQuiz(russianWordData);
    const kbToggle = await screen.findByTitle('Toggle Russian Keyboard');
    fireEvent.click(kbToggle);
    expect(screen.getByText('Full Russian Keyboard')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Insert letter к' }));
    fireEvent.click(screen.getByRole('button', { name: 'Insert letter о' }));
    fireEvent.click(screen.getByRole('button', { name: 'Insert letter т' }));
    expect(getInput().value).toBe('кот');

    // Backspace removes the last character
    fireEvent.click(screen.getByRole('button', { name: 'Backspace' }));
    expect(getInput().value).toBe('ко');

    // Clear empties the field
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(getInput().value).toBe('');

    // Backspace on an empty field is a safe no-op
    fireEvent.click(screen.getByRole('button', { name: 'Backspace' }));
    expect(getInput().value).toBe('');

    // Uppercase vowel keys insert capitals
    fireEvent.click(screen.getByRole('button', { name: 'Insert uppercase letter А' }));
    expect(getInput().value).toBe('А');

    // Space converts latin phonetics typed earlier via transliteration
    fireEvent.change(getInput(), { target: { value: 'privet' } });
    fireEvent.click(screen.getByRole('button', { name: 'Space' }));
    expect(getInput().value).toContain('привет');
  });

  it('closes the full keyboard with its close button', async () => {
    await renderQuiz(russianWordData);
    fireEvent.click(await screen.findByTitle('Toggle Russian Keyboard'));
    expect(screen.getByText('Full Russian Keyboard')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close keyboard' }));
    expect(screen.queryByText('Full Russian Keyboard')).not.toBeInTheDocument();
  });

  it('does not insert characters after the answer has been checked', async () => {
    await renderQuiz(russianWordData);
    await screen.findByRole('toolbar', { name: /Special Russian characters/i });

    fireEvent.change(getInput(), { target: { value: 'неверно' } });
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
    await settle();

    // After checking, the helper panel and input are locked
    expect(getInput()).toBeDisabled();
    expect(screen.queryByRole('toolbar', { name: /Special Russian characters/i })).not.toBeInTheDocument();
  });
});

describe('Quiz - accented-character helper bar for Latin-script targets', () => {
  it('inserts a Spanish special character into the answer', async () => {
    setPair('es', 'en', 'listening');
    await renderQuiz(wordData);

    const bar = await screen.findByRole('toolbar', { name: /Special characters for es/i });
    expect(bar).toBeInTheDocument();

    const first = bar.querySelector('button.quick-char-btn') as HTMLButtonElement;
    const char = first.textContent as string;
    fireEvent.click(first);
    expect(getInput().value).toBe(char);
  });
});
