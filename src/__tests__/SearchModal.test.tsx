import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchModal from '../components/SearchModal';
import germanData from '../data/languages/de/germanData';
import { LanguageProvider } from '../contexts/LanguageContext';

// Mock Audio
window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = vi.fn();

const renderWithLanguageProvider = (ui: React.ReactElement) => {
  return render(
    <LanguageProvider>
      {ui}
    </LanguageProvider>
  );
};

describe('SearchModal - Concept & Word Search', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders modal with search input and quick suggestion chips when open', () => {
    renderWithLanguageProvider(
      <SearchModal
        isOpen={true}
        onClose={vi.fn()}
        onSelectResult={vi.fn()}
        appData={germanData}
      />
    );

    expect(screen.getByRole('dialog', { name: /search words and concepts/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    expect(screen.getByText(/Popular concepts & topics to explore/i)).toBeInTheDocument();
    expect(screen.getByText('Meeting')).toBeInTheDocument();
  });

  it('populates query and surfaces related words, phrases, and grammar when a chip is clicked', () => {
    renderWithLanguageProvider(
      <SearchModal
        isOpen={true}
        onClose={vi.fn()}
        onSelectResult={vi.fn()}
        appData={germanData}
      />
    );

    const meetingChip = screen.getByRole('button', { name: /Meeting/i });
    fireEvent.click(meetingChip);

    // Shows results filter tabs
    expect(screen.getByText(/All \(/i)).toBeInTheDocument();

    // Contains in-context phrase "Planen wir ein Meeting"
    expect(screen.getAllByText(/Planen wir ein Meeting/i).length).toBeGreaterThan(0);

    // Contains verb "planen"
    expect(screen.getByText('planen')).toBeInTheDocument();
  });

  it('filters results by category when filter pills are clicked', () => {
    renderWithLanguageProvider(
      <SearchModal
        isOpen={true}
        onClose={vi.fn()}
        onSelectResult={vi.fn()}
        appData={germanData}
      />
    );

    const input = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(input, { target: { value: 'meeting' } });

    // Click 'Phrases' tab
    const phrasesPill = screen.getByRole('button', { name: /Phrases \(/i });
    fireEvent.click(phrasesPill);

    expect(screen.getByText(/Planen wir ein Meeting/i)).toBeInTheDocument();
    expect(screen.queryByText('planen')).not.toBeInTheDocument();

    // Click 'Grammar' tab
    const grammarPill = screen.getByRole('button', { name: /Grammar \(/i });
    fireEvent.click(grammarPill);

    expect(screen.getByText('planen')).toBeInTheDocument();
    expect(screen.queryByText(/Planen wir ein Meeting/i)).not.toBeInTheDocument();
  });

  it('calls onSelectResult when a search result card is clicked', () => {
    const handleSelect = vi.fn();
    renderWithLanguageProvider(
      <SearchModal
        isOpen={true}
        onClose={vi.fn()}
        onSelectResult={handleSelect}
        appData={germanData}
      />
    );

    const input = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(input, { target: { value: 'meeting' } });

    // Click the phrase card
    const phraseCard = screen.getAllByText(/Planen wir ein Meeting/i)[0].closest('.search-result-card');
    expect(phraseCard).toBeDefined();
    fireEvent.click(phraseCard!);

    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringMatching(/Planen wir ein Meeting/i),
      })
    );
  });

  it('closes when pressing Escape key', () => {
    const handleClose = vi.fn();
    renderWithLanguageProvider(
      <SearchModal
        isOpen={true}
        onClose={handleClose}
        onSelectResult={vi.fn()}
        appData={germanData}
      />
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalled();
  });
});
