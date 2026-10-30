import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

type Speech = typeof import('../utils/browserSpeech');

// browserSpeech keeps module-level caches, so every test loads a fresh copy.
const load = async (): Promise<Speech> => {
  vi.resetModules();
  return import('../utils/browserSpeech');
};

const voice = (name: string, lang: string) => ({ name, lang }) as SpeechSynthesisVoice;

class FakeUtterance {
  text: string;
  lang = '';
  rate = 1;
  voice: SpeechSynthesisVoice | null = null;
  onend: null | (() => void) = null;
  onerror: null | ((e: { error: string }) => void) = null;
  constructor(text: string) {
    this.text = text;
  }
}

let spoken: FakeUtterance[];
let listeners: Record<string, Array<() => void>>;

const installSynth = (voices: SpeechSynthesisVoice[]) => {
  spoken = [];
  listeners = {};
  Object.defineProperty(window, 'speechSynthesis', {
    configurable: true,
    value: {
      getVoices: () => voices,
      speak: (u: FakeUtterance) => spoken.push(u),
      cancel: vi.fn(),
      addEventListener: (event: string, fn: () => void) => (listeners[event] ??= []).push(fn),
      removeEventListener: (event: string, fn: () => void) => {
        listeners[event] = (listeners[event] ?? []).filter((f) => f !== fn);
      },
    },
  });
};

const removeSynth = () => {
  delete (window as unknown as Record<string, unknown>).speechSynthesis;
};

const mockIndex = (files: Record<string, string[]> | null) => {
  const fetchMock = vi.fn(() =>
    files
      ? Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ files: Object.fromEntries(Object.entries(files).map(([k, names]) => [k, names.map((n) => ({ filename: `${n}.mp3`, path: `/audio/${k}/${n}.mp3` }))])) }),
        })
      : Promise.reject(new Error('no index'))
  );
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

let audioInstances: Array<{ src: string; onended: null | (() => void); onerror: null | (() => void); play: ReturnType<typeof vi.fn> }>;
let playResult: () => Promise<void>;

beforeEach(() => {
  vi.stubGlobal('SpeechSynthesisUtterance', FakeUtterance);
  audioInstances = [];
  playResult = () => Promise.resolve();
  class FakeAudio {
    src: string;
    onended: null | (() => void) = null;
    onerror: null | (() => void) = null;
    play = vi.fn(() => playResult());
    constructor(src: string) {
      this.src = src;
      audioInstances.push(this as never);
    }
  }
  vi.stubGlobal('Audio', FakeAudio);
  mockIndex(null);
  vi.spyOn(console, 'error').mockImplementation(() => {});
  installSynth([]);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
  removeSynth();
});

describe('Russian voice selection', () => {
  it('finds Russian voices by language code or by name', async () => {
    installSynth([voice('Alex', 'en-US'), voice('Some Voice', 'ru-RU'), voice('Russian Female', 'xx')]);
    const speech = await load();
    expect(speech.getRussianVoices().map((v) => v.name)).toEqual(['Some Voice', 'Russian Female']);
  });

  it('returns no voices when speech synthesis is unavailable', async () => {
    removeSynth();
    const speech = await load();
    expect(speech.getRussianVoices()).toEqual([]);
  });

  it('prefers a known female voice, otherwise the first Russian voice', async () => {
    installSynth([voice('Generic', 'ru-RU'), voice('Milena', 'ru-RU')]);
    expect((await load()).getBestRussianVoice()?.name).toBe('Milena');

    installSynth([voice('Generic', 'ru-RU'), voice('Other', 'ru-RU')]);
    expect((await load()).getBestRussianVoice()?.name).toBe('Generic');
  });

  it('reports whether a Russian voice exists', async () => {
    installSynth([voice('Alex', 'en-US')]);
    expect((await load()).isRussianVoiceAvailable()).toBe(false);
    installSynth([voice('Milena', 'ru-RU')]);
    expect((await load()).isRussianVoiceAvailable()).toBe(true);
  });

  it('caches the voice lookup so installing a voice later is not seen immediately', async () => {
    installSynth([]);
    const speech = await load();
    expect(speech.getBestRussianVoice()).toBeNull();
    installSynth([voice('Milena', 'ru-RU')]);
    expect(speech.getBestRussianVoice()).toBeNull();
  });
});

describe('speakText with a Russian voice installed', () => {
  beforeEach(() => installSynth([voice('Milena', 'ru-RU'), voice('Samantha', 'en-US')]));

  it('speaks through the browser with the requested language, rate and a matching voice', async () => {
    const speech = await load();
    await speech.speakText('привет', 'ru-RU', undefined, undefined, 0.75);
    expect(spoken).toHaveLength(1);
    expect(spoken[0]).toMatchObject({ text: 'привет', lang: 'ru-RU', rate: 0.75 });
    expect(spoken[0].voice?.name).toBe('Milena');
  });

  it('uses a native voice for other languages too', async () => {
    const speech = await load();
    await speech.speakText('hello', 'en-US');
    expect(spoken[0].voice?.name).toBe('Samantha');
  });

  it('reports the end of speech', async () => {
    const speech = await load();
    const onEnd = vi.fn();
    await speech.speakText('привет', 'ru-RU', onEnd);
    spoken[0].onend!();
    expect(onEnd).toHaveBeenCalledTimes(1);
  });

  it('turns a synthesis error into an Error for the caller', async () => {
    const speech = await load();
    const onError = vi.fn();
    await speech.speakText('привет', 'ru-RU', undefined, onError);
    spoken[0].onerror!({ error: 'synthesis-failed' });
    expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: 'Speech synthesis error: synthesis-failed' }));
  });

  it('never reads the audio index when a voice is available', async () => {
    const fetchMock = mockIndex({ words: ['привет'] });
    const speech = await load();
    await speech.speakText('привет', 'ru-RU');
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('speakText without a Russian voice', () => {
  it('plays a matching studio recording from the audio index', async () => {
    mockIndex({ words: ['привет'], alphabet: ['а'] });
    const speech = await load();
    const onEnd = vi.fn();
    await speech.speakText('Привет', 'ru-RU', onEnd);
    expect(audioInstances.at(-1)?.src).toBe('/audio/words/привет.mp3');
    audioInstances.at(-1)!.onended!();
    expect(onEnd).toHaveBeenCalled();
    expect(spoken).toHaveLength(0);
  });

  it('loads the audio index only once', async () => {
    const fetchMock = mockIndex({ words: ['привет'] });
    const speech = await load();
    await speech.speakText('привет', 'ru-RU');
    await speech.speakText('привет', 'ru-RU');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('maps underscores in recording names back to spaces', async () => {
    mockIndex({ phrases: ['добрый_день'] });
    const speech = await load();
    await speech.speakText('добрый день', 'ru-RU');
    expect(audioInstances.at(-1)?.src).toBe('/audio/phrases/добрый_день.mp3');
  });

  it('falls back to browser speech when nothing matches', async () => {
    mockIndex({ words: ['привет'] });
    const speech = await load();
    await speech.speakText('zzz', 'en-US');
    expect(spoken[0]?.text).toBe('zzz');
  });

  it('falls back to browser speech when the audio index cannot be loaded', async () => {
    mockIndex(null);
    const speech = await load();
    await speech.speakText('привет', 'ru-RU');
    expect(spoken[0]?.text).toBe('привет');
  });

  it('falls back to browser speech if the recording fails to play', async () => {
    mockIndex({ words: ['привет'] });
    const speech = await load();
    await speech.speakText('привет', 'ru-RU');
    audioInstances.at(-1)!.onerror!();
    expect(spoken.map((u) => u.text)).toContain('привет');
  });

  it('reports an error when the recording cannot start', async () => {
    mockIndex({ words: ['привет'] });
    playResult = () => Promise.reject(new Error('autoplay blocked'));
    const speech = await load();
    const onError = vi.fn();
    await speech.speakText('привет', 'ru-RU', undefined, onError);
    expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: 'autoplay blocked' }));
  });

  it('wraps a non-Error failure so callers always get an Error', async () => {
    mockIndex({ words: ['привет'] });
    playResult = () => Promise.reject('boom');
    const speech = await load();
    const onError = vi.fn();
    await speech.speakText('привет', 'ru-RU', undefined, onError);
    expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: 'Unknown speech error' }));
  });

  it('tells the caller when the browser cannot speak at all', async () => {
    removeSynth();
    mockIndex(null);
    const speech = await load();
    const onError = vi.fn();
    await speech.speakText('hello', 'en-US', undefined, onError);
    expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: expect.stringContaining('not supported') }));
  });
});

describe('isSpeechSupported', () => {
  it('is true when the browser has speech synthesis', async () => {
    expect((await load()).isSpeechSupported()).toBe(true);
  });

  it('is false without speech synthesis and before any audio index was loaded', async () => {
    removeSynth();
    expect((await load()).isSpeechSupported()).toBe(false);
  });

  it('is true without speech synthesis once recordings are available', async () => {
    removeSynth();
    mockIndex({ words: ['привет'] });
    const speech = await load();
    await speech.speakText('привет', 'ru-RU');
    expect(speech.isSpeechSupported()).toBe(true);
  });
});

describe('initVoices', () => {
  it('returns immediately without speech synthesis', async () => {
    removeSynth();
    await expect((await load()).initVoices()).resolves.toBeUndefined();
  });

  it('returns immediately when voices are already loaded', async () => {
    installSynth([voice('Alex', 'en-US')]);
    await expect((await load()).initVoices()).resolves.toBeUndefined();
    expect(listeners.voiceschanged ?? []).toHaveLength(0);
  });

  it('waits for the voiceschanged event and then stops listening', async () => {
    installSynth([]);
    const speech = await load();
    let done = false;
    const promise = speech.initVoices().then(() => (done = true));
    await Promise.resolve();
    expect(done).toBe(false);
    expect(listeners.voiceschanged).toHaveLength(1);

    listeners.voiceschanged[0]();
    await promise;
    expect(done).toBe(true);
    expect(listeners.voiceschanged).toHaveLength(0);
  });

  it('gives up after a short timeout if the event never fires', async () => {
    vi.useFakeTimers();
    installSynth([]);
    const speech = await load();
    const promise = speech.initVoices();
    await vi.advanceTimersByTimeAsync(300);
    await expect(promise).resolves.toBeUndefined();
    expect(listeners.voiceschanged).toHaveLength(0);
  });
});

describe('getRussianVoiceInstallInstructions', () => {
  const withAgent = async (ua: string) => {
    Object.defineProperty(navigator, 'userAgent', { configurable: true, value: ua });
    return (await load()).getRussianVoiceInstallInstructions();
  };

  it.each([
    ['Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Windows'],
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 'macOS'],
    ['Mozilla/5.0 (Linux; Android 14; Pixel 8)', 'Android'],
    ['Mozilla/5.0 (X11; Linux x86_64)', 'check your device settings'],
  ])('gives platform specific help for %s', async (ua, expected) => {
    expect(await withAgent(ua)).toContain(expected);
  });

  it.each([
    ['iPhone', 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'],
    ['iPad', 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15'],
  ])('recognises an %s even though its user agent also says "Mac OS X"', async (_name, ua) => {
    const text = await withAgent(ua);
    expect(text).toContain('iOS');
    expect(text).not.toContain('macOS');
  });
});

describe('default export', () => {
  it('exposes the public helpers', async () => {
    const speech = await load();
    expect(Object.keys(speech.default).sort()).toEqual(
      ['getBestRussianVoice', 'getRussianVoiceInstallInstructions', 'getRussianVoices', 'initVoices', 'isRussianVoiceAvailable', 'isSpeechSupported', 'speakText'].sort()
    );
  });
});

