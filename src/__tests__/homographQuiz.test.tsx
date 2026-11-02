import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderSettled } from './testUtils';
import Quiz from '../components/Quiz';

window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = vi.fn();

// Two rows share the target text "月" but mean different things.
const homographData = {
  basicPhrases: [
    { phrase: '月', translation: 'Moon', pronunciation: 'tsuki' },
    { phrase: '月', translation: 'Month', pronunciation: 'getsu' },
  ],
};

const answer = (text: string) => {
  fireEvent.change(screen.getByRole('textbox'), { target: { value: text } });
  fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
};

describe('Quiz - ambiguous words accept every meaning', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    // 0.1 → first question in the pool, target → meaning
    vi.spyOn(Math, 'random').mockReturnValue(0.1);
  });
  afterEach(() => vi.restoreAllMocks());

  it('accepts the first meaning and tells the learner the word has several', async () => {
    await renderSettled(<Quiz data={homographData} />);
    await screen.findByRole('textbox');
    answer('Moon');
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
    const note = document.querySelector('.multi-meaning-note');
    expect(note?.textContent).toContain('Moon');
    expect(note?.textContent).toContain('Month');
  });

  it('accepts the other meaning as a correct answer too', async () => {
    await renderSettled(<Quiz data={homographData} />);
    await screen.findByRole('textbox');
    answer('Month');
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
    expect(screen.queryByText('Not quite')).not.toBeInTheDocument();
    expect(document.querySelector('.multi-meaning-note')).not.toBeNull();
  });

  it('still rejects an unrelated answer and still explains the ambiguity', async () => {
    await renderSettled(<Quiz data={homographData} />);
    await screen.findByRole('textbox');
    answer('Banana');
    expect(screen.getByText('Not quite')).toBeInTheDocument();
    expect(document.querySelector('.multi-meaning-note')?.textContent).toContain('Moon');
  });

  it('does not show the note for an unambiguous word', async () => {
    await renderSettled(<Quiz data={{ basicPhrases: [{ phrase: '犬', translation: 'Dog', pronunciation: 'inu' }] }} />);
    await screen.findByRole('textbox');
    answer('Dog');
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
    expect(document.querySelector('.multi-meaning-note')).toBeNull();
  });

  it('merges near-synonyms (Fruit / Fruits) silently without a note', async () => {
    await renderSettled(
      <Quiz
        data={{
          basicPhrases: [
            { phrase: '果物', translation: 'Fruits', pronunciation: 'kudamono' },
            { phrase: '果物', translation: 'Fruit', pronunciation: 'kudamono' },
          ],
        }}
      />
    );
    await screen.findByRole('textbox');
    answer('Fruit');
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
    expect(document.querySelector('.multi-meaning-note')).toBeNull();
  });
});

