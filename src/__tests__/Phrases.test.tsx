import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Phrases from '../components/Phrases';
import { PhraseItem } from '../types/index';

// Mock Audio
window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = vi.fn();

const samplePhrases: PhraseItem[] = [
  { russian: 'Привет', english: 'Hello', pronunciation: 'pree-vyet' },
  { russian: 'Спасибо', english: 'Thank you', pronunciation: 'spuh-see-buh' },
];

describe('Phrases Component - Intuitive Reveal & Study Mode', () => {
  it('renders section title, instructional subtitle, and Reveal All toggle', () => {
    render(<Phrases data={samplePhrases} title="Basic Phrases" contentType="phrases" />);

    expect(screen.getByRole('heading', { name: 'Basic Phrases', level: 2 })).toBeInTheDocument();
    expect(
      screen.getByText(/Tap any card to reveal its translation and pronunciation/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reveal all/i })).toBeInTheDocument();
  });

  it('renders cards initially hidden with tactile "Tap to reveal" button and no padlock or eye icons', () => {
    render(<Phrases data={samplePhrases} title="Basic Phrases" contentType="phrases" />);

    const revealButtons = screen.getAllByRole('button', { name: /reveal translation for/i });
    expect(revealButtons).toHaveLength(2);
    expect(revealButtons[0]).toHaveTextContent(/tap to reveal/i);

    // English translation should not be visible initially
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
    expect(screen.queryByText('Thank you')).not.toBeInTheDocument();
  });

  it('reveals translation and pronunciation when tapping "Tap to reveal", and allows hiding it again', () => {
    render(<Phrases data={samplePhrases} title="Basic Phrases" contentType="phrases" />);

    const revealButton = screen.getAllByRole('button', { name: /reveal translation for/i })[0];
    fireEvent.click(revealButton);

    // English translation and pronunciation should now be visible
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText(/Pronunciation:/i)).toBeInTheDocument();
    expect(screen.getByText('Tap to hide')).toBeInTheDocument();

    // Tap to hide
    const hideButton = screen.getByRole('button', { name: /hide translation for Привет/i });
    fireEvent.click(hideButton);

    // Should return to hidden state
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /reveal translation for/i })[0]).toBeInTheDocument();
  });

  it('toggles all cards when clicking Reveal All and Hide All', () => {
    render(<Phrases data={samplePhrases} title="Basic Phrases" contentType="phrases" />);

    const toggleAllBtn = screen.getByRole('button', { name: /reveal all/i });
    fireEvent.click(toggleAllBtn);

    // Both cards should now be revealed
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Thank you')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /hide all/i })).toBeInTheDocument();

    // Click Hide All
    fireEvent.click(screen.getByRole('button', { name: /hide all/i }));
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
    expect(screen.queryByText('Thank you')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reveal all/i })).toBeInTheDocument();
  });

  it('plays translation audio without hiding the revealed card when clicking the mini speaker button', () => {
    const audioPaths: string[] = [];
    const OriginalAudio = window.Audio;
    class MockAudio {
      src: string;
      preload = 'auto';
      playbackRate = 1;
      onended: any = null;
      onerror: any = null;
      constructor(src: string) {
        this.src = src;
        audioPaths.push(src);
      }
      play() {
        return Promise.resolve();
      }
      pause() {}
      load() {}
    }
    // @ts-ignore
    window.Audio = MockAudio;

    try {
      render(<Phrases data={samplePhrases} title="Basic Phrases" contentType="phrases" />);

      // Reveal first card
      const revealButton = screen.getAllByRole('button', { name: /reveal translation for/i })[0];
      fireEvent.click(revealButton);
      expect(screen.getByText('Hello')).toBeInTheDocument();

      // Click the mini translation speaker button inside the revealed area
      const translationAudioBtn = screen.getByRole('button', { name: /Listen to translation Hello/i });
      fireEvent.click(translationAudioBtn);

      // Card must remain revealed and audio must be played
      expect(screen.getByText('Hello')).toBeInTheDocument();
      expect(audioPaths[audioPaths.length - 1]).toBe('/audio/en/words/hello.mp3');
    } finally {
      window.Audio = OriginalAudio;
    }
  });

  it('renders Topic & Industry Pack filter pills and filters cards when a category pill is clicked', () => {
    const packData: PhraseItem[] = [
      { phrase: 'Computadora', translation: 'Computer', pronunciation: 'kohm-poo-tah-DOH-rah', category: 'Tech', icon: '💻' },
      { phrase: 'Contraseña', translation: 'Password', pronunciation: 'kohn-trah-SEH-nyah', category: 'Tech', icon: '🔐' },
      { phrase: 'Rojo', translation: 'Red', pronunciation: 'ROH-hoh', category: 'Colors', icon: '🔴' },
      { phrase: 'Lluvia', translation: 'Rain', pronunciation: 'YOO-bvyah', category: 'Weather', icon: '🌧️' }
    ];

    render(<Phrases data={packData} title="Common Words" contentType="words" />);

    const filterGroup = screen.getByRole('group', { name: /Filter by topic or industry pack/i });
    expect(filterGroup).toBeInTheDocument();

    // Initially All (4) is selected and all 4 cards are shown
    expect(screen.getByText('Computadora')).toBeInTheDocument();
    expect(screen.getByText('Rojo')).toBeInTheDocument();
    expect(screen.getByText('Lluvia')).toBeInTheDocument();

    // Click the Colors pill
    const colorsPill = screen.getByRole('button', { name: /Colors/i });
    fireEvent.click(colorsPill);

    expect(screen.getByText('Rojo')).toBeInTheDocument();
    expect(screen.queryByText('Computadora')).not.toBeInTheDocument();
    expect(screen.queryByText('Lluvia')).not.toBeInTheDocument();

    // Click Tech & IT pill
    const techPill = screen.getByRole('button', { name: /Tech & IT/i });
    fireEvent.click(techPill);

    expect(screen.getByText('Computadora')).toBeInTheDocument();
    expect(screen.getByText('Contraseña')).toBeInTheDocument();
    expect(screen.queryByText('Rojo')).not.toBeInTheDocument();
  });
});
