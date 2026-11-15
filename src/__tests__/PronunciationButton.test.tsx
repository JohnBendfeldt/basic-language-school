import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { LanguageProvider } from '../contexts/LanguageContext';

const speechMocks = vi.hoisted(() => ({
  speak: vi.fn(),
  initVoices: vi.fn(() => Promise.resolve()),
}));
vi.mock('../utils/speech', () => ({ ...speechMocks, default: speechMocks }));

import PronunciationButton, { getCandidateAudioPathsForText } from '../components/PronunciationButton';

describe('getCandidateAudioPathsForText', () => {
  it('returns nothing for empty or punctuation-only text', () => {
    expect(getCandidateAudioPathsForText('', 'es')).toEqual([]);
    expect(getCandidateAudioPathsForText('¿?', 'es')).toEqual([]);
  });

  it('puts the inferred category folder first', () => {
    expect(getCandidateAudioPathsForText('a', 'es')[0]).toBe('/audio/es/alphabet/a.mp3');
    expect(getCandidateAudioPathsForText('casa', 'es')[0]).toBe('/audio/es/words/casa.mp3');
    expect(getCandidateAudioPathsForText('buenos días', 'es')[0]).toBe('/audio/es/phrases/buenos_d%C3%ADas.mp3');
    expect(getCandidateAudioPathsForText('15', 'es')[0]).toBe('/audio/es/numbers/15.mp3');
  });

  it('respects an explicit category and maps legacy names', () => {
    expect(getCandidateAudioPathsForText('hola', 'es', 'basicPhrases')[0]).toBe('/audio/es/phrases/hola.mp3');
    expect(getCandidateAudioPathsForText('hola', 'es', 'commonWords')[0]).toBe('/audio/es/words/hola.mp3');
    expect(getCandidateAudioPathsForText('ser', 'es', 'grammar')[0]).toBe('/audio/es/grammar/ser.mp3');
  });

  it('falls back through every other folder so a file in a different folder is still found', () => {
    const paths = getCandidateAudioPathsForText('casa', 'es');
    for (const folder of ['grammar', 'phrases', 'examples', 'numbers', 'time']) {
      expect(paths).toContain(`/audio/es/${folder}/casa.mp3`);
    }
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('strips parentheses, punctuation and slash alternatives from the file name', () => {
    expect(getCandidateAudioPathsForText('Hola! (informal)', 'es')[0]).toContain('/hola.mp3');
    expect(getCandidateAudioPathsForText('tu / usted', 'es')[0]).toContain('/tu.mp3');
  });

  it('reads numbers written as "15 (Quince)" from their spoken word', () => {
    expect(getCandidateAudioPathsForText('15 (Quince)', 'es')[0]).toBe('/audio/es/numbers/quince.mp3');
  });

  it('also tries the word without its article or pronoun', () => {
    const paths = getCandidateAudioPathsForText('siz gidiyorsunuz', 'tr');
    expect(paths).toContain('/audio/tr/phrases/siz_gidiyorsunuz.mp3');
    expect(paths).toContain('/audio/tr/words/gidiyorsunuz.mp3');
    expect(getCandidateAudioPathsForText('der Tisch', 'de')).toContain('/audio/de/words/tisch.mp3');
  });

  it('lowercases Turkish text with the dotted/dotless i rules', () => {
    expect(getCandidateAudioPathsForText('Işık', 'tr')[0]).toContain(encodeURIComponent('ışık'));
    expect(getCandidateAudioPathsForText('İnternet', 'tr')[0]).toContain('internet');
  });

  it('encodes non-Latin names safely for URLs', () => {
    expect(getCandidateAudioPathsForText('猫', 'zh')[0]).toBe(`/audio/zh/alphabet/${encodeURIComponent('猫')}.mp3`);
  });
});

describe('PronunciationButton', () => {
  let instances: Array<{ src: string; onended: null | (() => void); onerror: null | (() => void); play: ReturnType<typeof vi.fn> }>;
  let playBehavior: (src: string) => Promise<void>;

  beforeEach(() => {
    speechMocks.speak.mockReset();
    instances = [];
    playBehavior = () => Promise.resolve();
    class FakeAudio {
      src: string;
      onended: null | (() => void) = null;
      onerror: null | (() => void) = null;
      preload = '';
      playbackRate = 1;
      pause = vi.fn();
      load = vi.fn();
      play = vi.fn(() => playBehavior(this.src));
      constructor(src: string) {
        this.src = src;
        instances.push(this as never);
      }
    }
    vi.stubGlobal('Audio', FakeAudio);
  });

  const renderButton = (props: Partial<React.ComponentProps<typeof PronunciationButton>> = {}) =>
    render(
      <LanguageProvider>
        <PronunciationButton text="casa" lang="es" {...props} />
      </LanguageProvider>
    );

  it('plays the studio recording first, preserves focus via aria-disabled, and shows a playing state until it ends', async () => {
    renderButton();
    const button = screen.getByRole('button', { name: 'Pronounce "casa"' });
    button.focus();
    expect(document.activeElement).toBe(button);
    fireEvent.click(button);

    expect(instances.at(-1)?.src).toBe('/audio/es/words/casa.mp3');
    const playingBtn = screen.getByRole('button', { name: 'Speaking...' });
    expect(playingBtn).toHaveAttribute('aria-disabled', 'true');
    expect(playingBtn).not.toBeDisabled();
    expect(document.activeElement).toBe(button);

    act(() => {
      instances.at(-1)!.onended!();
    });
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Pronounce "casa"' })).toHaveAttribute('aria-disabled', 'false')
    );
    expect(speechMocks.speak).not.toHaveBeenCalled();
  });

  it('moves on to the next candidate file when one is missing', async () => {
    playBehavior = (src) => (src === '/audio/es/words/casa.mp3' ? Promise.reject(new Error('404')) : Promise.resolve());
    renderButton();
    fireEvent.click(screen.getByRole('button', { name: 'Pronounce "casa"' }));
    await waitFor(() => expect(instances.some((i) => i.src === '/audio/es/grammar/casa.mp3')).toBe(true));
    expect(speechMocks.speak).not.toHaveBeenCalled();
  });

  it('falls back to browser speech only after every recording fails', async () => {
    playBehavior = () => Promise.reject(new Error('missing'));
    renderButton({ text: 'zzz nothing', lang: 'es' });
    fireEvent.click(screen.getByRole('button', { name: 'Pronounce "zzz nothing"' }));
    await waitFor(() => expect(speechMocks.speak).toHaveBeenCalledTimes(1));
    expect(speechMocks.speak.mock.calls[0][0]).toBe('zzz nothing');
  });

  it('uses a custom label for the accessible name', () => {
    renderButton({ label: 'Pronounce letter A' });
    expect(screen.getByRole('button', { name: 'Pronounce letter A' })).toBeInTheDocument();
  });

  it('does not start a second playback while one is running', () => {
    renderButton();
    const button = screen.getByRole('button', { name: 'Pronounce "casa"' });
    fireEvent.click(button);
    const before = instances.length;
    fireEvent.click(screen.getByRole('button', { name: 'Speaking...' }));
    expect(instances.length).toBe(before);
  });

  it('refuses to read non-Cyrillic text in Russian mode', () => {
    renderButton({ text: 'hello', lang: 'ru' });
    fireEvent.click(screen.getByRole('button', { name: 'Pronounce "hello"' }));
    expect(instances.length).toBe(0);
    expect(speechMocks.speak).not.toHaveBeenCalled();
  });

  it('ignores empty text', () => {
    renderButton({ text: '   ' });
    fireEvent.click(screen.getByRole('button', { name: 'Pronounce' }));
    expect(instances.length).toBe(0);
  });

  it('pre-buffers the recording when the pointer hovers over the button', () => {
    renderButton();
    fireEvent.pointerEnter(screen.getByRole('button', { name: 'Pronounce "casa"' }));
    expect(instances.at(-1)?.src).toBe('/audio/es/words/casa.mp3');
  });
});
