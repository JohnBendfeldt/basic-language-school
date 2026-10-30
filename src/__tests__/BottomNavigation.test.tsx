import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BottomNavigation from '../components/BottomNavigation';
import { LanguageProvider } from '../contexts/LanguageContext';

describe('BottomNavigation - Responsive Tabs & Alphabet & Grammar Label', () => {
  it('renders Alphabet & Grammar as a two-line label in bottom menu', () => {
    const setActiveSection = vi.fn();
    render(
      <LanguageProvider>
        <BottomNavigation activeSection="alphabet" setActiveSection={setActiveSection} />
      </LanguageProvider>
    );

    // Verify button with aria-label exists
    const alphabetBtn = screen.getByRole('button', { name: /Switch to Alphabet & Grammar section/i });
    expect(alphabetBtn).toBeInTheDocument();
    expect(alphabetBtn).toHaveClass('active');

    // Verify label text contains two lines: Alphabet &\nGrammar
    expect(alphabetBtn.textContent).toContain('Alphabet &');
    expect(alphabetBtn.textContent).toContain('Grammar');

    // Click another tab
    const quizBtn = screen.getByRole('button', { name: /Switch to Quiz section/i });
    fireEvent.click(quizBtn);
    expect(setActiveSection).toHaveBeenCalledWith('quiz');
  });

  it('switches to alphabet section when clicked', () => {
    const setActiveSection = vi.fn();
    render(
      <LanguageProvider>
        <BottomNavigation activeSection="quiz" setActiveSection={setActiveSection} />
      </LanguageProvider>
    );

    const alphabetBtn = screen.getByRole('button', { name: /Switch to Alphabet & Grammar section/i });
    expect(alphabetBtn).not.toHaveClass('active');

    fireEvent.click(alphabetBtn);
    expect(setActiveSection).toHaveBeenCalledWith('alphabet');
  });
});
