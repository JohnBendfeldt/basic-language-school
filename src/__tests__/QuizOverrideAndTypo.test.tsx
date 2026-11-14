import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderSettled, settle } from './testUtils';
import Quiz from '../components/Quiz';
import { ProgressService } from '../services/progressService';

// Mock Audio
window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = vi.fn();

describe('Quiz - Smart Fuzzy Matching, Typo Acceptance & "I Was Right" Override', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('accepts single-letter typos in conversational sentences as "Almost right! (Accepted)"', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1); // Forces Target -> Base question
    await renderSettled(
      <Quiz
        data={{
          basicPhrases: [
            {
              phrase: 'Planen wir ein Meeting',
              translation: "Let's schedule a meeting / Let's plan a meeting / Are we planning a meeting",
              pronunciation: 'PLAH-nen veer ayn MEE-ting',
            },
          ],
        }}
      />
    );

    const input = await screen.findByRole('textbox');
    // Learner types with a typo ("wer" instead of "we")
    fireEvent.change(input, { target: { value: 'Are wer planning a meeting' } });
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
    await settle();

    // Should be accepted with an encouraging "Almost right! (Accepted)" note!
    expect(screen.getByText(/Almost right! \(Accepted\)/i)).toBeInTheDocument();
    expect(screen.getByText(/wer/i)).toBeInTheDocument();
    // Verify score is awarded in session score badge
    const scoreBadge = document.querySelector('.session-score-badge');
    expect(scoreBadge?.textContent).toContain('1 / 1');
  });

  it('provides an "I was right" override button when an answer is marked incorrect', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1);
    await renderSettled(
      <Quiz
        data={{
          basicPhrases: [
            {
              phrase: 'Guten Tag',
              translation: 'Good afternoon',
              pronunciation: 'GOO-ten tahk',
            },
          ],
        }}
      />
    );

    const input = await screen.findByRole('textbox');
    // User types an unlisted alternative or creative translation
    fireEvent.change(input, { target: { value: 'Pleasant midday to you' } });
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
    await settle();

    // Initially marked incorrect
    expect(screen.getByText('Not quite')).toBeInTheDocument();

    // The "I was right" override button should be visible!
    const overrideBtn = screen.getByRole('button', { name: /I was right/i });
    expect(overrideBtn).toBeInTheDocument();

    // User clicks "I was right"
    fireEvent.click(overrideBtn);
    await settle();

    // Answer is converted to correct, score is awarded, and streak preserved!
    expect(screen.getByText(/Richtig!|Correct! \(Overridden\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Answer accepted as correct/i)).toBeInTheDocument();
    const scoreBadge = document.querySelector('.session-score-badge');
    expect(scoreBadge?.textContent).toContain('1 / 1');

    // Persisted word progress reflects the override (timesCorrect: 1, timesIncorrect: 0, masteryLevel: 1)
    const stats = await ProgressService.getUserStats('ru');
    expect(stats.wordsLearningCount).toBe(1);
    expect(stats.wordsToReview).toHaveLength(0);

    const wordsKey = Object.keys(localStorage).find(k => k.includes('word'));
    expect(wordsKey).toBeDefined();
    const savedWords = JSON.parse(localStorage.getItem(wordsKey!) || '{}');
    const savedEntry = Object.values(savedWords)[0] as { timesCorrect: number; timesIncorrect: number; masteryLevel: number };
    expect(savedEntry).toBeDefined();
    expect(savedEntry.timesCorrect).toBe(1);
    expect(savedEntry.timesIncorrect).toBe(0);
    expect(savedEntry.masteryLevel).toBe(1);
  });
});
