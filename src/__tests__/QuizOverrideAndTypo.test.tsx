import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Quiz from '../components/Quiz';

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
    render(
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

    // Should be accepted with an encouraging "Almost right! (Accepted)" note!
    expect(screen.getByText(/Almost right! \(Accepted\)/i)).toBeInTheDocument();
    expect(screen.getByText(/wer/i)).toBeInTheDocument();
    // Verify score is awarded in session score badge
    const scoreBadge = document.querySelector('.session-score-badge');
    expect(scoreBadge?.textContent).toContain('1 / 1');
  });

  it('provides an "I was right" override button when an answer is marked incorrect', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1);
    render(
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

    // Initially marked incorrect
    expect(screen.getByText('Not quite')).toBeInTheDocument();

    // The "I was right" override button should be visible!
    const overrideBtn = screen.getByRole('button', { name: /I was right/i });
    expect(overrideBtn).toBeInTheDocument();

    // User clicks "I was right"
    fireEvent.click(overrideBtn);

    // Answer is converted to correct, score is awarded, and streak preserved!
    expect(screen.getByText(/Richtig!|Correct! \(Overridden\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Answer accepted as correct/i)).toBeInTheDocument();
    const scoreBadge = document.querySelector('.session-score-badge');
    expect(scoreBadge?.textContent).toContain('1 / 1');
  });
});
