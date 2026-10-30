import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Quiz from '../components/Quiz';

window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = vi.fn();

const sampleData = {
  alphabet: [{ character: 'А', pronunciation: 'ah', example: 'автобус' }],
  basicPhrases: [{ english: 'Hello', russian: 'Привет', pronunciation: 'pree-vyet' }],
  numbers: [{ english: 'One', russian: 'Один', pronunciation: 'ah-deen' }],
  commonWords: [{ english: 'Cat', russian: 'Кот', pronunciation: 'kot' }],
};

describe('Quiz mobile settings summary', () => {
  beforeEach(() => {
    localStorage.clear();
    window.matchMedia = ((q: string) => ({
      matches: true, media: q, onchange: null,
      addEventListener: () => {}, removeEventListener: () => {},
      addListener: () => {}, removeListener: () => {}, dispatchEvent: () => false,
    })) as any;
  });

  it('toggles open and closed when the summary is tapped', () => {
    const { container } = render(<Quiz data={sampleData} />);
    const section = container.querySelector('.quiz-section')!;
    const btn = container.querySelector('.quiz-settings-summary')!;
    expect(section).toHaveClass('settings-collapsed');
    fireEvent.click(btn);
    expect(section).not.toHaveClass('settings-collapsed');
    fireEvent.click(btn);
    expect(section).toHaveClass('settings-collapsed');
  });
});
