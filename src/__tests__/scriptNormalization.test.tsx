import { describe, it, expect, vi, afterEach } from 'vitest';
import { screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { renderSettled, settle } from './testUtils';
import Quiz, { SPECIAL_CHAR_MAP } from '../components/Quiz';
import { canonicalizeScript } from '../utils/textNormalization';
import { getPraiseHeadline, getPraiseTier } from '../utils/pageDictionary';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { SupportedLanguageId } from '../data/languages/types';
import { LanguageProvider } from '../contexts/LanguageContext';

window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = vi.fn();

const same = (a: string, b: string) => expect(canonicalizeScript(a)).toBe(canonicalizeScript(b));

describe('canonicalizeScript - equivalent ways of typing the same text', () => {
  it('treats Bengali letters with a dot below the same whether precomposed or letter + nukta', () => {
    same('\u09DC', '\u09A1\u09BC'); // ড়
    same('\u09DD', '\u09A2\u09BC'); // ঢ়
    same('\u09DF', '\u09AF\u09BC'); // য়
    same('\u09AC\u09A1\u09BC\u09CB', '\u09AC\u09DC\u09CB');
  });

  it('treats Hindi nukta letters the same in both encodings', () => {
    same('\u095B', '\u091C\u093C'); // ज़
    same('\u095C', '\u0921\u093C'); // ड़
    same('\u0915\u093C\u093E\u0928\u0942\u0928', '\u0958\u093E\u0928\u0942\u0928');
  });

  it('treats Arabic yeh/kaf/heh typed on Arabic, Persian and Urdu keyboards as equal', () => {
    same('\u064A', '\u06CC');
    same('\u0643\u062A\u0627\u0628', '\u06A9\u062A\u0627\u0628'); // كتاب / کتاب
    same('\u0647\u0630\u0627', '\u06C1\u0630\u0627');
  });

  it('ignores Arabic short-vowel marks and the hamza seat on alef', () => {
    same('مَدْرَسَة', 'مدرسة');
    same('أحمد', 'احمد');
    same('إسلام', 'اسلام');
    same('كـتاب', 'كتاب');
  });

  it('keeps letters that really differ apart', () => {
    expect(canonicalizeScript('آپ')).not.toBe(canonicalizeScript('اپ')); // Urdu "aap" vs "ap"
    expect(canonicalizeScript('ھ')).not.toBe(canonicalizeScript('ہ')); // Urdu aspirated he vs plain he
    expect(canonicalizeScript('\u0915')).not.toBe(canonicalizeScript('\u0916'));
  });

  it('ignores Japanese and Chinese full-width punctuation and spaces', () => {
    same('お元気ですか？', 'お元気ですか');
    same('谢谢，再见。', '谢谢再见');
    same('ありがとう！', 'ありがとう');
    same('「こんにちは」', 'こんにちは');
    same('ＡＢＣ１２３', 'ABC123');
  });

  it('keeps the Japanese long-vowel mark and iteration mark', () => {
    expect(canonicalizeScript('コーヒー')).toContain('ー');
    expect(canonicalizeScript('人々')).toContain('々');
  });

  it('ignores the Hindi danda and Urdu/Arabic question marks and commas', () => {
    same('वह अपना काम करती है।', 'वह अपना काम करती है');
    same('کیا حال ہے؟', 'کیا حال ہے');
    same('كيف حالك؟', 'كيف حالك');
    same('نعم، شكرا', 'نعم شكرا');
    same('وہ گیا۔', 'وہ گیا');
  });

  it('ignores Spanish opening marks and guillemets', () => {
    same('¿Cómo estás?', 'Cómo estás?');
    same('¡Hola!', 'Hola!');
    same('« Bonjour »', 'Bonjour');
  });

  it('joins accents typed as base letter + combining mark with the single-character form', () => {
    same('cafe\u0301', 'caf\u00E9');
    same('n\u0303', '\u00F1');
  });

  it('joins decomposed and composed Korean syllables', () => {
    same('\u1112\u1161\u11AB', '한');
  });

  it('is stable when applied twice', () => {
    for (const sample of ['ড়য়', 'क़ज़', 'مَرْحَبًا', 'お元気ですか？', '¿Qué?', 'Привет']) {
      expect(canonicalizeScript(canonicalizeScript(sample))).toBe(canonicalizeScript(sample));
    }
  });

  it('leaves ordinary text alone', () => {
    expect(canonicalizeScript('Hello world')).toBe('Hello world');
    expect(canonicalizeScript('Привет, мир')).toBe('Привет, мир');
  });
});

describe('canonicalizeScript across the real curriculum', () => {
  const ALL = Object.keys(SUPPORTED_LANGUAGES) as SupportedLanguageId[];

  it.each(ALL)('%s: no answer is changed into something empty', (lang) => {
    const d = SUPPORTED_LANGUAGES[lang].data;
    const rows = [...d.basicPhrases, ...d.numbers, ...d.commonWords, ...(d.time ?? [])];
    const empty = rows
      .map((p) => String(p.phrase ?? p.russian ?? p.target ?? ''))
      .filter((t) => t && !canonicalizeScript(t).replace(/\s/g, ''));
    expect(empty).toEqual([]);
  });

  it.each(ALL)('%s: stored text and a learner typing it without optional marks end up identical', (lang) => {
    const d = SUPPORTED_LANGUAGES[lang].data;
    const rows = [...d.basicPhrases, ...d.numbers, ...d.commonWords];
    for (const p of rows) {
      const stored = String(p.phrase ?? p.russian ?? p.target ?? '');
      const typed = stored
        .replace(/[\u064B-\u065F\u0670\u0640]/g, '') // no short vowels
        .replace(/[？！。、，？！।؟،]/g, ''); // no sentence punctuation
      expect(canonicalizeScript(typed), stored).toBe(canonicalizeScript(stored));
    }
  });
});

describe('Quiz accepts equivalent spellings in other scripts', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  const answerListening = async (phrase: string, meaning: string, typed: string, targetLang: SupportedLanguageId) => {
    localStorage.clear();
    localStorage.setItem('basic_quiz_mode', 'listening');
    localStorage.setItem(`basic_quiz_mode_${targetLang}`, 'listening');
    window.history.pushState({}, '', `/learn/${targetLang}/quiz`);
    vi.spyOn(Math, 'random').mockReturnValue(0.1); // listening: the answer is the phrase itself
    await renderSettled(
      <LanguageProvider>
        <Quiz data={{ basicPhrases: [{ phrase, translation: meaning, pronunciation: '' }] }} />
      </LanguageProvider>
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: typed } });
    const checkBtn = screen.getByRole('button', { name: /Check Answer/i });
    fireEvent.click(checkBtn);
    await settle();
  };

  it('Bengali: a letter typed as one character matches the stored letter + nukta', async () => {
    await     answerListening('\u09AC\u09A1\u09BC\u09CB', 'Big', '\u09AC\u09DC\u09CB', 'bn');
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
  });

  it('Hindi: the sentence-ending danda is optional', async () => {
    await     answerListening('वह अपना काम करती है।', 'She does her work', 'वह अपना काम करती है', 'hi');
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
  });

  it('Arabic: short vowels and hamza do not have to be typed', async () => {
    await     answerListening('أَهْلاً وَسَهْلاً', 'Welcome', 'اهلا وسهلا', 'ar');
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
  });

  it('Urdu: a Persian or Arabic keyboard yeh is accepted', async () => {
    await     answerListening('ٹھیک ہے', 'OK', 'ٹھيک ہے', 'ur');
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
  });

  it('Japanese: the question mark is optional', async () => {
    await     answerListening('お元気ですか？', 'How are you?', 'お元気ですか', 'ja');
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
  });

  it('Spanish: the inverted question mark is optional', async () => {
    await     answerListening('¿Cómo estás?', 'How are you?', 'Cómo estás', 'es');
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
  });

  it('still marks a genuinely different Bengali word wrong', async () => {
    await     answerListening('\u09AC\u09A1\u09BC\u09CB', 'Big', '\u099B\u09CB\u099F', 'bn');
    expect(screen.getByText('Not quite')).toBeInTheDocument();
  });
});

describe('getPraiseHeadline & Praise Tiers across all 15 languages', () => {
  const ALL_LANGS = Object.keys(SUPPORTED_LANGUAGES) as SupportedLanguageId[];

  it('maps percentages to the correct praise tiers', () => {
    expect(getPraiseTier(100)).toBe('perfect');
    expect(getPraiseTier(95)).toBe('great');
    expect(getPraiseTier(80)).toBe('great');
    expect(getPraiseTier(79)).toBe('good');
    expect(getPraiseTier(60)).toBe('good');
    expect(getPraiseTier(59)).toBe('practice');
    expect(getPraiseTier(0)).toBe('practice');
  });

  it('returns valid titles and pronunciations for all 15 languages in all 4 tiers', () => {
    for (const lang of ALL_LANGS) {
      for (const pct of [100, 85, 70, 40]) {
        const headline = getPraiseHeadline(lang, pct);
        expect(headline.title).toBeTruthy();
        expect(headline.pronunciation).toBeTruthy();
      }
    }
  });

  it('Bengali praise matches authentic Bengali expressions', () => {
    expect(getPraiseHeadline('bn', 100).title).toBe('চমৎকার!');
    expect(getPraiseHeadline('bn', 100).pronunciation).toBe('Chomotkar!');

    expect(getPraiseHeadline('bn', 80).title).toBe('দারুণ!');
    expect(getPraiseHeadline('bn', 80).pronunciation).toBe('Darun!');

    expect(getPraiseHeadline('bn', 60).title).toBe('ভালো!');
    expect(getPraiseHeadline('bn', 60).pronunciation).toBe('Bhalo!');

    expect(getPraiseHeadline('bn', 40).title).toBe('অভ্যাসেই পারদর্শিতা');
    expect(getPraiseHeadline('bn', 40).pronunciation).toBe('Obhyaashei paardorshita');
  });
});

describe('Bengali Quiz Praise Screen & Special Keys toolbar', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('displays Bengali praise and does NOT mention Russian on 80% quiz completion', async () => {
    localStorage.clear();
    localStorage.setItem('basic_quiz_mode', 'writing');
    localStorage.setItem('basic_quiz_mode_bn', 'writing');
    window.history.pushState({}, '', '/learn/bn/quiz');

    // Deterministic question selection (always select index 0)
    vi.spyOn(Math, 'random').mockReturnValue(0.01);

    const testData = {
      alphabet: [{
        character: 'অ',
        pronunciation: 'o',
        example: 'অমর',
        russianWord: 'অমর'
      }],
      basicPhrases: [],
      numbers: [],
      commonWords: [],
      time: []
    };

    await renderSettled(
      <LanguageProvider>
        <Quiz data={testData} />
      </LanguageProvider>
    );

    // Switch goal to 5 questions
    const goalBtn = await screen.findByRole('button', { name: '5 Qs' });
    fireEvent.click(goalBtn);

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    // 5 questions: answer 4 correctly ('o'), 1 incorrectly ('xyz') -> 80%
    const answers = ['o', 'o', 'o', 'o', 'xyz'];

    for (let i = 0; i < 5; i++) {
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: answers[i] } });
      fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
      await settle();

      if (i < 4) {
        const nextBtn = await screen.findByRole('button', { name: new RegExp(`Next Question \\(${i + 2}/5\\)`, 'i') });
        fireEvent.click(nextBtn);
      } else {
        const finishBtn = await screen.findByRole('button', { name: /Complete Quiz & View Results/i });
        fireEvent.click(finishBtn);
      }
    }

    // On recap screen:
    await waitFor(() => {
      expect(screen.getByText('Quiz Session Complete!')).toBeInTheDocument();
      // Must show 80% circle
      expect(screen.getByText('80%')).toBeInTheDocument();
      // Must show Bengali praise for 80% tier: দারুণ! / Darun!
      expect(screen.getByText('দারুণ!')).toBeInTheDocument();
      expect(screen.getByText('Darun!')).toBeInTheDocument();
      // MUST NOT show Russian praise or mention Russian skills
      expect(screen.queryByText('МОЛОДЕЦ!')).not.toBeInTheDocument();
      expect(screen.queryByText('Molodets!')).not.toBeInTheDocument();
      expect(screen.queryByText(/Your Russian skills/i)).not.toBeInTheDocument();
    });
  });

  it('renders Bengali special character buttons and inserts them when clicked', async () => {
    localStorage.clear();
    localStorage.setItem('basic_quiz_mode', 'writing');
    localStorage.setItem('basic_quiz_mode_bn', 'writing');
    window.history.pushState({}, '', '/learn/bn/quiz');

    // Pick question 1 (Base -> Target, so target is Bengali and expectedAnswerLanguage is 'bn')
    vi.spyOn(Math, 'random').mockReturnValue(0.7);

    const testData = {
      basicPhrases: [{
        phrase: 'হ্যালো',
        translation: 'Hello',
        pronunciation: 'hello'
      }]
    };

    await renderSettled(
      <LanguageProvider>
        <Quiz data={testData} />
      </LanguageProvider>
    );

    // Switch goal to 5 questions
    const goalBtn = await screen.findByRole('button', { name: '5 Qs' });
    fireEvent.click(goalBtn);

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    // Check that Bengali special characters from SPECIAL_CHAR_MAP.bn are rendered
    const specialChars = SPECIAL_CHAR_MAP.bn;
    expect(specialChars.length).toBeGreaterThan(0);

    const firstSpecialBtn = screen.getByRole('button', { name: `Insert ${specialChars[0]}` });
    expect(firstSpecialBtn).toBeInTheDocument();

    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'হ' } });
    fireEvent.click(firstSpecialBtn);

    // Character was inserted
    expect(input.value).toBe(`হ${specialChars[0]}`);
  });

  it('provides quick-tap button for the target letter itself during alphabet practice', async () => {
    localStorage.clear();
    localStorage.setItem('basic_quiz_mode', 'writing');
    localStorage.setItem('basic_quiz_mode_bn', 'writing');
    window.history.pushState({}, '', '/learn/bn/quiz');

    const testData = {
      alphabet: [{
        character: 'ঠ',
        pronunciation: '/ʈʰɔ/ (tho)',
        example: 'as in top',
        word: 'ঠোঁট'
      }]
    };

    await renderSettled(
      <LanguageProvider>
        <Quiz data={testData} />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    // The letter 'ঠ' itself should be available as a quick-tap button above the input
    const letterKeyBtn = screen.getByRole('button', { name: 'Insert ঠ' });
    expect(letterKeyBtn).toBeInTheDocument();

    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.click(letterKeyBtn);
    expect(input.value).toBe('ঠ');

    // Submitting the tapped native letter counts as correct
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
    await settle();
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
  });

  it('accepts phonetic Latin spelling for Bengali alphabet letters ঠ, ফ, থ, ৎ', async () => {
    localStorage.clear();
    localStorage.setItem('basic_quiz_mode', 'writing');
    localStorage.setItem('basic_quiz_mode_bn', 'writing');
    window.history.pushState({}, '', '/learn/bn/quiz');

    const testAlphabet = [
      { letter: 'ঠ', pronunciation: '/ʈʰɔ/ (tho)', expectedPhonetics: ['t', 'th', 'tho', 'tha'] },
      { letter: 'ফ', pronunciation: '/pʰɔ/ or /fɔ/ (pho/fo)', expectedPhonetics: ['f', 'ph', 'pho', 'fo', 'ha'] },
      { letter: 'থ', pronunciation: '/t̪ʰɔ/ (tho)', expectedPhonetics: ['t', 'th', 'tho'] },
      { letter: 'ৎ', pronunciation: '/t̪/ (khanda ta)', expectedPhonetics: ['quan do tho', 'khanda ta', 'khandata', 't', 'ta'] }
    ];

    for (const item of testAlphabet) {
      for (const typed of item.expectedPhonetics) {
        cleanup();
        await renderSettled(
          <LanguageProvider>
            <Quiz data={{
              alphabet: [{
                character: item.letter,
                pronunciation: item.pronunciation,
                example: '',
                word: ''
              }]
            }} />
          </LanguageProvider>
        );

        await waitFor(() => {
          expect(screen.getByRole('textbox')).toBeInTheDocument();
        });

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: typed } });
        fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
        await settle();

        expect(screen.getByText(/Correct!/i), `Letter ${item.letter} should accept phonetic spelling "${typed}"`).toBeInTheDocument();
      }
    }
  });

  it('displays the letter and its phonetic pronunciation in the Words to Review recap section', async () => {
    localStorage.clear();
    localStorage.setItem('basic_quiz_mode', 'writing');
    localStorage.setItem('basic_quiz_mode_bn', 'writing');
    window.history.pushState({}, '', '/learn/bn/quiz');

    vi.spyOn(Math, 'random').mockReturnValue(0.01);

    const testData = {
      alphabet: [{
        character: 'ঠ',
        pronunciation: '/ʈʰɔ/ (tho)',
        example: 'as in top',
        word: 'ঠোঁট'
      }]
    };

    await renderSettled(
      <LanguageProvider>
        <Quiz data={testData} />
      </LanguageProvider>
    );

    const goalBtn = await screen.findByRole('button', { name: '5 Qs' });
    fireEvent.click(goalBtn);

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    // Answer 5 questions with wrong answer 'xyz' to see recap review list
    for (let i = 0; i < 5; i++) {
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'xyz' } });
      fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
      await settle();

      if (i < 4) {
        const nextBtn = await screen.findByRole('button', { name: new RegExp(`Next Question \\(${i + 2}/5\\)`, 'i') });
        fireEvent.click(nextBtn);
      } else {
        const finishBtn = await screen.findByRole('button', { name: /Complete Quiz & View Results/i });
        fireEvent.click(finishBtn);
      }
    }

    // On recap screen:
    await waitFor(() => {
      expect(screen.getByText(/Words to Review/i)).toBeInTheDocument();
      const reviewItems = screen.getAllByText(/ঠ\s*\(tho\)/i);
      expect(reviewItems.length).toBeGreaterThan(0);
      expect(reviewItems[0]).toBeInTheDocument();
    });
  });
});

describe('Phonetic Alphabet Acceptance Across Hindi, Urdu, Arabic, and Russian', () => {
  it('Hindi: accepts single-character and phonetic Latin transliterations', async () => {
    localStorage.clear();
    localStorage.setItem('basic_quiz_mode', 'writing');
    window.history.pushState({}, '', '/learn/hi/quiz');

    await renderSettled(
      <LanguageProvider>
        <Quiz data={{
          alphabet: [{
            character: 'ठ',
            pronunciation: '/ʈʰə/ (tha)',
            example: 'as in top',
            word: 'ठप्पा'
          }]
        }} />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 't' } });
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
    await settle();
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
  });

  it('Urdu: accepts name and sound transliterations', async () => {
    localStorage.clear();
    localStorage.setItem('basic_quiz_mode', 'writing');
    window.history.pushState({}, '', '/learn/ur/quiz');

    await renderSettled(
      <LanguageProvider>
        <Quiz data={{
          alphabet: [{
            character: 'آ',
            pronunciation: '/aː/ (alif madd)',
            example: 'as in father',
            word: 'آم'
          }]
        }} />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'alif madd' } });
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
    await settle();
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
  });

  it('Arabic: accepts name and sound transliterations', async () => {
    localStorage.clear();
    localStorage.setItem('basic_quiz_mode', 'writing');
    window.history.pushState({}, '', '/learn/ar/quiz');

    await renderSettled(
      <LanguageProvider>
        <Quiz data={{
          alphabet: [{
            character: 'ف',
            pronunciation: '/f/ (faa)',
            example: 'as in fish',
            word: 'فندق'
          }]
        }} />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'f' } });
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
    await settle();
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
  });
});

