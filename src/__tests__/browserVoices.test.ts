import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getBestVoiceForLang } from '../utils/browserSpeech';

const voice = (name: string, lang: string) => ({ name, lang }) as SpeechSynthesisVoice;

const setVoices = (voices: SpeechSynthesisVoice[] | null) => {
  Object.defineProperty(window, 'speechSynthesis', {
    configurable: true,
    value: voices === null ? undefined : { getVoices: () => voices, cancel: vi.fn() },
  });
};

describe('getBestVoiceForLang', () => {
  beforeEach(() => setVoices([]));

  it('returns null when speech synthesis is unavailable or has no voices', () => {
    setVoices(null);
    expect(getBestVoiceForLang('fr-FR')).toBeNull();
    setVoices([]);
    expect(getBestVoiceForLang('fr-FR')).toBeNull();
  });

  it('prefers a known high-quality native voice over a generic one', () => {
    setVoices([voice('Generic French', 'fr-FR'), voice('Thomas', 'fr-FR')]);
    expect(getBestVoiceForLang('fr-FR')?.name).toBe('Thomas');
  });

  it('honors the priority order of the preferred names list', () => {
    // For Spanish, Mónica is listed before Jorge
    setVoices([voice('Jorge', 'es-ES'), voice('Mónica', 'es-ES')]);
    expect(getBestVoiceForLang('es-ES')?.name).toBe('Mónica');
  });

  it('never picks a preferred-name voice that belongs to another language', () => {
    // "Thomas" exists as an English voice too; it must not be used for French
    setVoices([voice('Thomas', 'en-GB'), voice('Voix Locale', 'fr-CA')]);
    expect(getBestVoiceForLang('fr-FR')?.name).toBe('Voix Locale');
  });

  it('prefers natural/premium/enhanced voices on an exact locale match', () => {
    setVoices([voice('Plain', 'de-DE'), voice('Microsoft Natural Voice', 'de-DE')]);
    expect(getBestVoiceForLang('de-DE')?.name).toBe('Microsoft Natural Voice');
  });

  it('skips novelty voices such as Whisper and Zarvox', () => {
    setVoices([voice('Whisper', 'ja-JP'), voice('Zarvox', 'ja-JP'), voice('Plain Japanese', 'ja-JP')]);
    expect(getBestVoiceForLang('ja-JP')?.name).toBe('Plain Japanese');
  });

  it('avoids voices that identify as English for non-English locales', () => {
    setVoices([voice('English-accented Portuguese', 'pt-BR'), voice('Voz Brasileira', 'pt-BR')]);
    expect(getBestVoiceForLang('pt-BR')?.name).toBe('Voz Brasileira');
  });

  it('falls back to any voice with the language prefix, even a novelty one, as a last resort', () => {
    setVoices([voice('Whisper', 'ko-KR')]);
    expect(getBestVoiceForLang('ko-KR')?.name).toBe('Whisper');
  });

  it('matches on the language prefix when the exact region is not installed', () => {
    setVoices([voice('Voz', 'es-MX')]);
    expect(getBestVoiceForLang('es-ES')?.name).toBe('Voz');
  });

  it('treats underscore locales (fr_FR) like hyphenated ones', () => {
    setVoices([voice('Amélie', 'fr_FR')]);
    expect(getBestVoiceForLang('fr-FR')?.name).toBe('Amélie');
  });

  it('returns null when nothing matches the requested language', () => {
    setVoices([voice('Samantha', 'en-US')]);
    expect(getBestVoiceForLang('ru-RU')).toBeNull();
  });

  it('defaults to English when no language is given', () => {
    setVoices([voice('Samantha', 'en-US')]);
    expect(getBestVoiceForLang('')?.name).toBe('Samantha');
  });
});

