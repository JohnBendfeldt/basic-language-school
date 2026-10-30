import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { LanguageProvider } from '../contexts/LanguageContext';
import ProgressModal from '../components/ProgressModal';
import { ProgressService } from '../services/progressService';
import { PROGRESS_MODAL_COPY } from '../utils/progressModalCopy';
import { MASTERY_THRESHOLD, UserStats } from '../types/progress';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { SupportedLanguageId } from '../data/languages/types';

const emptyStats: UserStats = {
  totalQuizzesTaken: 0,
  averageScore: 0,
  wordsMasteredCount: 0,
  wordsLearningCount: 0,
  wordsToReview: [],
  recentSessions: [],
};

const richStats: UserStats = {
  totalQuizzesTaken: 7,
  averageScore: 82,
  wordsMasteredCount: 12,
  wordsLearningCount: 5,
  currentDailyStreak: 4,
  wordsToReview: [
    {
      userId: 'guest',
      category: 'words',
      wordId: 'commonWords-casa-to-meaning',
      prompt: 'casa',
      answer: 'house',
      targetWord: 'casa',
      meaningWord: 'house',
      timesCorrect: 1,
      timesIncorrect: 3,
      lastTestedAt: '2025-01-01T00:00:00Z',
      masteryLevel: 0,
    },
  ],
  recentSessions: [
    { id: 's1', userId: 'guest', category: 'alphabet', score: 9, totalQuestions: 10, percentage: 90, completedAt: '2025-01-02T10:00:00Z' },
    { id: 's2', userId: 'guest', category: 'basicPhrases', score: 6, totalQuestions: 10, percentage: 60, completedAt: '2025-01-03T10:00:00Z' },
    { id: 's3', userId: 'guest', category: 'numbers', score: 2, totalQuestions: 10, percentage: 20, completedAt: '2025-01-04T10:00:00Z' },
  ],
};

const curriculumTotal = (lang: SupportedLanguageId) => {
  const d = SUPPORTED_LANGUAGES[lang].data;
  return d.alphabet.length + d.basicPhrases.length + d.numbers.length + d.commonWords.length + (d.time?.length ?? 0);
};

const open = (props: { baseLang?: string; targetLang?: string; onClose?: () => void; userEmail?: string | null } = {}) => {
  const { baseLang = 'en', targetLang = 'es', onClose = vi.fn(), userEmail } = props;
  localStorage.setItem('basic_language_base_lang', baseLang);
  localStorage.setItem('basic_language_target_lang', targetLang);
  render(
    <LanguageProvider>
      <ProgressModal isOpen onClose={onClose} userEmail={userEmail} languageId={targetLang} />
    </LanguageProvider>
  );
  return onClose;
};

describe('ProgressModal', () => {
  let getUserStats: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    getUserStats = vi.spyOn(ProgressService, 'getUserStats').mockResolvedValue(richStats);
    vi.spyOn(ProgressService, 'getMultiLanguageMastery').mockResolvedValue({});
  });

  it('renders nothing while closed', () => {
    render(
      <LanguageProvider>
        <ProgressModal isOpen={false} onClose={() => {}} />
      </LanguageProvider>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows a loading state, then the learner statistics', async () => {
    open();
    expect(screen.getByText(/Loading your statistics/i)).toBeInTheDocument();
    expect(await screen.findByText('Daily Streak')).toBeInTheDocument();
    expect(screen.queryByText(/Loading your statistics/i)).not.toBeInTheDocument();

    const card = (label: string) => screen.getByText(label).closest('.stat-card')!;
    expect(card('Daily Streak')).toHaveTextContent('4');
    expect(card('Quizzes Completed')).toHaveTextContent('7');
    expect(card('Average Score')).toHaveTextContent('82%');
    expect(card('Words Mastered')).toHaveTextContent('12');
    expect(card('Words Learning')).toHaveTextContent('5');
  });

  it('calculates percent mastered against the whole curriculum, capped at 100', async () => {
    open();
    await screen.findByText('Daily Streak');
    const expected = Math.min(100, Math.round((12 / curriculumTotal('es')) * 100));
    expect(document.querySelector('.mastery-percent-number')?.textContent).toBe(`${expected}%`);
    expect(document.querySelector<HTMLElement>('.mastery-progress-fill')?.style.width).toBe(`${expected}%`);
  });

  it('caps the percentage at 100 when more words are mastered than exist', async () => {
    getUserStats.mockResolvedValue({ ...richStats, wordsMasteredCount: 999999 });
    open();
    await screen.findByText('Daily Streak');
    expect(document.querySelector('.mastery-percent-number')?.textContent).toBe('100%');
  });

  it('states the real mastery threshold used by the quiz', async () => {
    open();
    await screen.findByText('Daily Streak');
    expect(document.body.textContent).toContain(`mastered at Level ${MASTERY_THRESHOLD}+`);
  });

  it('shows the signed-in email or guest mode', async () => {
    open({ userEmail: 'maria@example.com' });
    expect(await screen.findByText('Logged in as maria@example.com')).toBeInTheDocument();
  });

  it('shows guest mode when nobody is signed in', async () => {
    open();
    expect(await screen.findByText(/Guest Mode/i)).toBeInTheDocument();
  });

  it('lists words to review with their correct/incorrect counts', async () => {
    open();
    await screen.findByText('Words & Phrases to Review');
    const card = screen.getByText('casa').closest('.review-word-card')!;
    expect(card).toHaveTextContent('house');
    expect(card).toHaveTextContent('1✓ / 3✗');
    expect(within(card as HTMLElement).getByRole('button', { name: /Pronounce/i })).toBeInTheDocument();
  });

  it('lists recent sessions and colors the score by performance', async () => {
    open();
    await screen.findByText('Recent Quiz Sessions');
    const badges = Array.from(document.querySelectorAll('.score-badge'));
    expect(badges.map((b) => b.textContent)).toEqual(['9/10 (90%)', '6/10 (60%)', '2/10 (20%)']);
    expect(badges.map((b) => b.className)).toEqual([
      expect.stringContaining('high'),
      expect.stringContaining('med'),
      expect.stringContaining('low'),
    ]);
  });

  it('shows the empty state with a switch button when another language is selected', async () => {
    getUserStats.mockResolvedValue(emptyStats);
    open({ targetLang: 'es' });
    expect(await screen.findByText('No Quiz History Yet')).toBeInTheDocument();
    // Selected language equals the active one → no switch CTA
    expect(screen.queryByText(/Switch to Practice/i)).not.toBeInTheDocument();
  });

  it('opens the language dropdown, switches course, and reloads stats for it', async () => {
    open({ targetLang: 'es' });
    await screen.findByText('Daily Streak');
    expect(getUserStats).toHaveBeenLastCalledWith('es');

    fireEvent.click(screen.getByRole('button', { name: /Current course/i }));
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(Object.keys(SUPPORTED_LANGUAGES).length);

    fireEvent.click(screen.getByRole('option', { name: /French/i }));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    await waitFor(() => expect(getUserStats).toHaveBeenLastCalledWith('fr'));
  });

  it('offers to switch the active language when viewing another course, then closes', async () => {
    const onClose = open({ targetLang: 'es' });
    await screen.findByText('Daily Streak');
    fireEvent.click(screen.getByRole('button', { name: /Current course/i }));
    fireEvent.click(screen.getByRole('option', { name: /French/i }));

    const study = await screen.findByRole('button', { name: /Study French/i });
    fireEvent.click(study);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes the language dropdown with Escape and with an outside click', async () => {
    open();
    await screen.findByText('Daily Streak');
    const trigger = screen.getByRole('button', { name: /Current course/i });

    fireEvent.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes from the X button and the backdrop but not from clicks inside', async () => {
    const onClose = open();
    await screen.findByText('Daily Streak');
    fireEvent.click(screen.getByText('Daily Streak'));
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.click(screen.getByLabelText('Close modal'));
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('survives a failed statistics request and stops loading', async () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    getUserStats.mockRejectedValue(new Error('offline'));
    open();
    await waitFor(() => expect(screen.queryByText(/Loading your statistics/i)).not.toBeInTheDocument());
    expect(screen.getByText('No Quiz History Yet')).toBeInTheDocument();
    expect(errSpy).toHaveBeenCalled();
  });
});

describe('ProgressModal localization', () => {
  beforeEach(() => {
    vi.spyOn(ProgressService, 'getUserStats').mockResolvedValue(richStats);
    vi.spyOn(ProgressService, 'getMultiLanguageMastery').mockResolvedValue({});
  });

  it.each([
    ['ru', 'Ваш прогресс обучения'],
    ['es', 'Tu Progreso de Aprendizaje'],
    ['fr', "Votre Progression d'Apprentissage"],
    ['de', 'Dein Lernfortschritt'],
    ['ja', '学習の進捗'],
    ['ar', 'تقدمك في التعلم'],
  ])('%s learners see the title in their own language', async (base, title) => {
    open({ baseLang: base, targetLang: base === 'es' ? 'en' : 'es' });
    expect(await screen.findByRole('heading', { name: title })).toBeInTheDocument();
  });

  it.each(['ru', 'es', 'fr', 'de', 'pt', 'id', 'tr', 'ja', 'ko', 'zh', 'hi', 'ar', 'bn', 'ur'])(
    '%s: no English stat labels remain',
    async (base) => {
      open({ baseLang: base, targetLang: base === 'es' ? 'en' : 'es' });
      await waitFor(() => expect(document.querySelectorAll('.stat-card').length).toBe(5));
      expect(document.body.textContent).not.toMatch(/Daily Streak|Quizzes Completed|Average Score|Words Mastered|Words Learning/);
    }
  );
});

describe('PROGRESS_MODAL_COPY', () => {
  const ENGLISH_ONLY: SupportedLanguageId[] = ['de', 'pt', 'id', 'tr'];
  const langs = Object.keys(PROGRESS_MODAL_COPY) as SupportedLanguageId[];

  it('covers every language that is not written inline in the component', () => {
    expect(langs.sort()).toEqual(['ar', 'bn', 'de', 'hi', 'id', 'ja', 'ko', 'pt', 'tr', 'ur', 'zh'].sort());
  });

  it.each(langs)('%s: every string is filled in and interpolates its arguments', (lang) => {
    const c = PROGRESS_MODAL_COPY[lang]!;
    for (const [key, value] of Object.entries(c)) {
      if (typeof value === 'string') expect(value.trim().length, `${lang}.${key}`).toBeGreaterThan(0);
    }
    expect(c.loggedInAs('a@b.c')).toContain('a@b.c');
    expect(c.noHistoryDesc('LANG')).toContain('LANG');
    expect(c.switchToPractice('LANG')).toContain('LANG');
    expect(c.curriculumMastery('LANG')).toContain('LANG');
    expect(c.studyBtn('LANG')).toContain('LANG');
    expect(c.wordsToReviewDesc('LANG')).toContain('LANG');
    const desc = c.masteryCountDesc(3, 99);
    expect(desc).toContain('3');
    expect(desc).toContain('99');
    expect(desc).toContain(String(MASTERY_THRESHOLD));
  });

  it.each(langs.filter((l) => !ENGLISH_ONLY.includes(l)))('%s: is written in its own script, not English', (lang) => {
    expect(PROGRESS_MODAL_COPY[lang]!.dailyStreak).not.toMatch(/^[A-Za-z ]+$/);
  });
});

