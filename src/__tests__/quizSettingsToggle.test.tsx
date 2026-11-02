import { describe, it, expect, beforeEach } from 'vitest';
import { fireEvent } from '@testing-library/react';
import { renderSettled, settle } from './testUtils';
import Quiz from '../components/Quiz';

const sampleData = {
  alphabet: [{ character: 'А', pronunciation: 'ah', example: 'автобус' }],
  basicPhrases: [{ english: 'Hello', russian: 'Привет', pronunciation: 'pree-vyet' }],
  numbers: [{ english: 'One', russian: 'Один', pronunciation: 'ah-deen' }],
  commonWords: [{ english: 'Cat', russian: 'Кот', pronunciation: 'kot' }],
};

const setViewport = (isMobile: boolean) => {
  window.matchMedia = ((q: string) => ({
    matches: isMobile, media: q, onchange: null,
    addEventListener: () => {}, removeEventListener: () => {},
    addListener: () => {}, removeListener: () => {}, dispatchEvent: () => false,
  })) as any;
};

const renderQuiz = async () => {
  const utils = await renderSettled(<Quiz data={sampleData} />);
  return {
    ...utils,
    section: utils.container.querySelector('.quiz-section')!,
    button: utils.container.querySelector('.quiz-settings-summary')!,
  };
};

describe('Quiz settings panel - mobile', () => {
  beforeEach(() => setViewport(true));

  it('starts collapsed and toggles open and closed when the summary is tapped', async () => {
    const { section, button } = await renderQuiz();
    expect(section).toHaveClass('settings-collapsed');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    expect(section).not.toHaveClass('settings-collapsed');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(button);
    expect(section).toHaveClass('settings-collapsed');
  });

  it('ignores the desktop preference so phones always start collapsed', async () => {
    localStorage.setItem('basic_quiz_settings_open', 'true');
    expect((await renderQuiz()).section).toHaveClass('settings-collapsed');
  });

  it('does not overwrite the saved desktop preference when toggled', async () => {
    const { button } = await renderQuiz();
    fireEvent.click(button);
    expect(localStorage.getItem('basic_quiz_settings_open')).toBeNull();
  });
});

describe('Quiz settings panel - desktop', () => {
  beforeEach(() => setViewport(false));

  it('starts open by default', async () => {
    const { section, button } = await renderQuiz();
    expect(section).not.toHaveClass('settings-collapsed');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(section.querySelector('.quiz-toolbar-body')).not.toBeNull();
  });

  it('lets the learner collapse and re-open it', async () => {
    const { section, button } = await renderQuiz();
    fireEvent.click(button);
    expect(section).toHaveClass('settings-collapsed');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    expect(section).not.toHaveClass('settings-collapsed');
  });

  it('remembers a collapsed panel the next time the quiz is opened', async () => {
    const first = await renderQuiz();
    fireEvent.click(first.button);
    expect(localStorage.getItem('basic_quiz_settings_open')).toBe('false');
    first.unmount();

    expect((await renderQuiz()).section).toHaveClass('settings-collapsed');
  });

  it('remembers an open panel after it was collapsed and re-opened', async () => {
    const first = await renderQuiz();
    fireEvent.click(first.button);
    fireEvent.click(first.button);
    expect(localStorage.getItem('basic_quiz_settings_open')).toBe('true');
    first.unmount();

    expect((await renderQuiz()).section).not.toHaveClass('settings-collapsed');
  });

  it('stays open after answering a question (only phones auto-collapse)', async () => {
    const { section, getByRole } = await renderQuiz();
    fireEvent.change(getByRole('textbox'), { target: { value: 'ah' } });
    fireEvent.click(getByRole('button', { name: /Check Answer/i }));
    await settle();
    expect(section).not.toHaveClass('settings-collapsed');
  });

  it('closes any open dropdown when the panel is collapsed', async () => {
    const { container, button, getByTestId } = await renderQuiz();
    fireEvent.click(getByTestId('topic-dropdown-trigger'));
    expect(getByTestId('topic-dropdown-trigger')).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(button);
    expect(container.querySelector('.quiz-section')).toHaveClass('settings-collapsed');
    fireEvent.click(button);
    expect(getByTestId('topic-dropdown-trigger')).toHaveAttribute('aria-expanded', 'false');
  });
});
