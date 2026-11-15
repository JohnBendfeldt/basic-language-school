import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RussianKeyboard from '../components/RussianKeyboard';

describe('RussianKeyboard', () => {
  it('inserts the clicked phonetic letter', () => {
    const onLetterClick = vi.fn();
    render(<RussianKeyboard onLetterClick={onLetterClick} />);
    fireEvent.click(screen.getByLabelText('Insert letter д — D'));
    expect(onLetterClick).toHaveBeenCalledWith('д');
  });

  it('inserts special Russian letters, soft sign and space', () => {
    const onLetterClick = vi.fn();
    render(<RussianKeyboard onLetterClick={onLetterClick} />);
    fireEvent.click(screen.getByLabelText('Insert letter Ж — ZH'));
    fireEvent.click(screen.getByLabelText('Insert soft sign — Ь'));
    fireEvent.click(screen.getByLabelText('Space — Пробел'));
    expect(onLetterClick.mock.calls.map(c => c[0])).toEqual(['ж', 'ь', ' ']);
  });

  it('inserts uppercase vowels, backspace and clear commands', () => {
    const onLetterClick = vi.fn();
    render(<RussianKeyboard onLetterClick={onLetterClick} />);
    fireEvent.click(screen.getByLabelText('Insert uppercase letter Я'));
    fireEvent.click(screen.getByLabelText('Backspace'));
    fireEvent.click(screen.getByLabelText('Clear'));
    expect(onLetterClick.mock.calls.map(c => c[0])).toEqual(['Я', 'backspace', 'clear']);
  });
});
