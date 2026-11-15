import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';

const speechMocks = vi.hoisted(() => ({
  speak: vi.fn(),
  initVoices: vi.fn(() => Promise.resolve()),
  cancelAllSpeech: vi.fn(),
}));
vi.mock('../utils/speech', () => ({ ...speechMocks, default: speechMocks }));

import { LanguageProvider } from '../contexts/LanguageContext';
import PronunciationButton, { getCandidateAudioPathsForText } from '../components/PronunciationButton';
import OfflineAudioModal from '../components/OfflineAudioModal';
import App from '../App';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { SupportedLanguageId } from '../data/languages/types';
import {
  OFFLINE_AUDIO_CACHE_NAME,
  OFFLINE_AUDIO_PACK_INFO,
  clearInMemoryAudioBlobCache,
  downloadOfflineLanguages,
  getVerifiedOfflineLanguages,
  manifestEntryToAudioUrl,
  readStoredDownloadedLanguages,
  removeOfflineLanguage,
} from '../services/offlineAudioService';

interface InMemoryCacheStore {
  entries: Map<string, Response>;
}

const createMockCaches = () => {
  const stores = new Map<string, InMemoryCacheStore>();

  const normalizeKey = (req: RequestInfo | URL): string => {
    const raw = typeof req === 'string' ? req : req instanceof URL ? req.href : req.url;
    try {
      return new URL(raw, 'http://localhost').pathname;
    } catch {
      return raw;
    }
  };

  const open = vi.fn(async (cacheName: string) => {
    let store = stores.get(cacheName);
    if (!store) {
      store = { entries: new Map() };
      stores.set(cacheName, store);
    }
    return {
      put: vi.fn(async (req: RequestInfo | URL, resp: Response) => {
        store!.entries.set(normalizeKey(req), resp.clone());
      }),
      match: vi.fn(async (req: RequestInfo | URL) => {
        const hit = store!.entries.get(normalizeKey(req));
        return hit ? hit.clone() : undefined;
      }),
      delete: vi.fn(async (req: RequestInfo | URL) => {
        return store!.entries.delete(normalizeKey(req));
      }),
      keys: vi.fn(async () => {
        return Array.from(store!.entries.keys()).map(
          (pathname) => ({ url: `http://localhost${pathname}` }) as Request
        );
      }),
    };
  });

  return { open, stores };
};

describe('Offline Audio Service, Manifests, Airplane Mode Playback & PWA Install Picker', () => {
  let mockCaches: ReturnType<typeof createMockCaches>;
  let originalOnLineDescriptor: PropertyDescriptor | undefined;
  let audioInstances: Array<{
    src: string;
    onended: null | (() => void);
    onerror: null | (() => void);
    play: ReturnType<typeof vi.fn>;
  }>;

  beforeEach(() => {
    localStorage.clear();
    window.history.pushState({}, '', '/');
    clearInMemoryAudioBlobCache();
    speechMocks.speak.mockReset();

    mockCaches = createMockCaches();
    Object.defineProperty(window, 'caches', {
      configurable: true,
      writable: true,
      value: { open: mockCaches.open },
    });

    originalOnLineDescriptor = Object.getOwnPropertyDescriptor(window.navigator, 'onLine');
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      get: () => true,
    });

    vi.spyOn(URL, 'createObjectURL').mockImplementation(() => 'blob:http://localhost/offline-mp3');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    audioInstances = [];
    class FakeAudio {
      src: string;
      onended: null | (() => void) = null;
      onerror: null | (() => void) = null;
      preload = '';
      playbackRate = 1;
      pause = vi.fn();
      load = vi.fn();
      play = vi.fn(() => Promise.resolve());
      constructor(src: string) {
        this.src = src;
        audioInstances.push(this as never);
      }
    }
    vi.stubGlobal('Audio', FakeAudio);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (originalOnLineDescriptor) {
      Object.defineProperty(window.navigator, 'onLine', originalOnLineDescriptor);
    }
  });

  it('keeps all 15 public/audio/<lang>/manifest.json files and byte-size indices in sync with OFFLINE_AUDIO_PACK_INFO', async () => {
    const allLangs = Object.keys(SUPPORTED_LANGUAGES) as SupportedLanguageId[];
    expect(allLangs).toHaveLength(15);

    for (const lang of allLangs) {
      const manifestPath = path.resolve(process.cwd(), 'public', 'audio', lang, 'manifest.json');
      expect(fs.existsSync(manifestPath)).toBe(true);
      const parsed = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      expect(parsed.lang).toBe(lang);
      expect(parsed.packFile).toBe('offline-pack.bin');
      expect(Array.isArray(parsed.files)).toBe(true);
      expect(Array.isArray(parsed.sizes)).toBe(true);
      expect(parsed.files.length).toBeGreaterThan(500);
      expect(parsed.fileCount).toBe(OFFLINE_AUDIO_PACK_INFO[lang].fileCount);
      expect(parsed.sizes).toHaveLength(parsed.fileCount);
      expect(parsed.files.every((f: string) => f.endsWith('.mp3'))).toBe(true);
      const sumSizes = (parsed.sizes as number[]).reduce((acc, s) => acc + s, 0);
      expect(sumSizes).toBe(parsed.totalBytes);
    }

    // Verify real disk binary pack builder produces exact expected totalBytes
    const { buildLanguagePackBuffer } = await import('../../scripts/build-offline-packs.mjs');
    const urManifest = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), 'public', 'audio', 'ur', 'manifest.json'), 'utf8')
    );
    const urBuffer = buildLanguagePackBuffer(path.resolve(process.cwd(), 'public', 'audio'), 'ur');
    expect(urBuffer.length).toBe(urManifest.totalBytes);
  });

  it('streams a single offline-pack.bin per language and unpacks exact MP3 byte slices without individual MP3 requests', async () => {
    const clipCasa = new Uint8Array([0xff, 0xfb, 0x10, 0x20]);
    const clipDias = new Uint8Array([0x49, 0x44, 0x33, 0x01, 0x02, 0x03]);
    const combinedPack = new Uint8Array(clipCasa.length + clipDias.length);
    combinedPack.set(clipCasa, 0);
    combinedPack.set(clipDias, clipCasa.length);

    const requestedUrls: string[] = [];
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input.toString();
      requestedUrls.push(url);
      if (url === '/audio/pt/manifest.json') {
        return new Response(
          JSON.stringify({
            lang: 'pt',
            fileCount: 2,
            totalBytes: combinedPack.byteLength,
            packFile: 'offline-pack.bin',
            files: ['words/casa.mp3', 'phrases/bom_dia.mp3'],
            sizes: [clipCasa.byteLength, clipDias.byteLength],
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      if (url === '/audio/pt/offline-pack.bin') {
        return new Response(combinedPack, {
          status: 200,
          headers: { 'Content-Type': 'application/octet-stream' },
        });
      }
      if (url.startsWith('/audio/sounds/')) {
        return new Response(new Uint8Array([0xff, 0xfb]), {
          status: 200,
          headers: { 'Content-Type': 'audio/mpeg' },
        });
      }
      throw new Error(`Unexpected individual MP3 network request: ${url}`);
    });
    vi.stubGlobal('fetch', fetchMock);

    const progressUpdates: number[] = [];
    const result = await downloadOfflineLanguages(['pt'], (p) => progressUpdates.push(p.percent));

    expect(result.downloaded).toEqual(['pt']);
    expect(result.failedFiles).toBe(0);
    expect(progressUpdates.at(-1)).toBe(100);

    // Zero individual MP3 fetches — only manifest.json + offline-pack.bin (+ 2 shared SFX)
    expect(requestedUrls).toContain('/audio/pt/manifest.json');
    expect(requestedUrls).toContain('/audio/pt/offline-pack.bin');
    expect(requestedUrls.some((u) => u.startsWith('/audio/pt/words/') || u.startsWith('/audio/pt/phrases/'))).toBe(
      false
    );

    const audioCache = mockCaches.stores.get(OFFLINE_AUDIO_CACHE_NAME)!;
    const cachedCasa = new Uint8Array(await audioCache.entries.get('/audio/pt/words/casa.mp3')!.clone().arrayBuffer());
    const cachedDias = new Uint8Array(
      await audioCache.entries.get('/audio/pt/phrases/bom_dia.mp3')!.clone().arrayBuffer()
    );
    expect(Array.from(cachedCasa)).toEqual(Array.from(clipCasa));
    expect(Array.from(cachedDias)).toEqual(Array.from(clipDias));
  });

  it('falls back cleanly from SPA HTML or missing .bin and retries transient 429 rate limits', async () => {
    let mp3Attempts = 0;
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input.toString();
      if (url === '/audio/it/manifest.json' || url === '/audio/id/manifest.json') {
        return new Response(
          JSON.stringify({
            lang: 'id',
            fileCount: 1,
            totalBytes: 4,
            packFile: 'offline-pack.bin',
            files: ['words/rumah.mp3'],
            sizes: [4],
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      if (url === '/audio/id/offline-pack.bin') {
        // Simulate Netlify SPA fallback returning index.html when .bin is missing
        return new Response('<!doctype html><html></html>', {
          status: 200,
          headers: { 'Content-Type': 'text/html' },
        });
      }
      if (url === '/audio/id/words/rumah.mp3') {
        mp3Attempts += 1;
        if (mp3Attempts === 1) {
          return new Response('Too Many Requests', { status: 429 });
        }
        return new Response(new Uint8Array([0xff, 0xfb, 0x90, 0x64]), {
          status: 200,
          headers: { 'Content-Type': 'audio/mpeg' },
        });
      }
      return new Response(new Uint8Array([0xff, 0xfb]), { status: 200 });
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await downloadOfflineLanguages(['id']);
    expect(result.downloaded).toEqual(['id']);
    expect(result.failedFiles).toBe(0);
    expect(mp3Attempts).toBe(2);
    const audioCache = mockCaches.stores.get(OFFLINE_AUDIO_CACHE_NAME)!;
    expect(audioCache.entries.has('/audio/id/words/rumah.mp3')).toBe(true);
  });

  it('encodes manifest paths identically to PronunciationButton.getCandidateAudioPathsForText across scripts', () => {
    expect(manifestEntryToAudioUrl('es', 'phrases/buenos_días.mp3')).toBe(
      getCandidateAudioPathsForText('buenos días', 'es')[0]
    );
    expect(manifestEntryToAudioUrl('zh', 'alphabet/猫.mp3')).toBe(
      getCandidateAudioPathsForText('猫', 'zh')[0]
    );
    expect(getCandidateAudioPathsForText('Işık', 'tr')).toContain(
      manifestEntryToAudioUrl('tr', 'words/ışık.mp3')
    );
    expect(getCandidateAudioPathsForText('Привет!', 'ru')).toContain(
      manifestEntryToAudioUrl('ru', 'phrases/привет.mp3')
    );
  });

  it('downloads language audio packs into Cache Storage, reports progress, and removes individual courses cleanly', async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input.toString();
      if (url === '/audio/es/manifest.json') {
        return new Response(
          JSON.stringify({
            lang: 'es',
            fileCount: 2,
            totalBytes: 4096,
            files: ['words/casa.mp3', 'phrases/buenos_días.mp3'],
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      if (url === '/audio/en/manifest.json') {
        return new Response(
          JSON.stringify({
            lang: 'en',
            fileCount: 1,
            totalBytes: 2048,
            files: ['words/house.mp3'],
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      return new Response(new Uint8Array([0xff, 0xfb, 0x90, 0x64]), {
        status: 200,
        headers: { 'Content-Type': 'audio/mpeg' },
      });
    });
    vi.stubGlobal('fetch', fetchMock);

    const progressUpdates: number[] = [];
    const result = await downloadOfflineLanguages(['es', 'en'], (p) => {
      progressUpdates.push(p.percent);
    });

    expect(result.downloaded).toEqual(['es', 'en']);
    expect(result.failedFiles).toBe(0);
    expect(progressUpdates.at(-1)).toBe(100);

    const audioCache = mockCaches.stores.get(OFFLINE_AUDIO_CACHE_NAME)!;
    expect(audioCache.entries.has('/audio/es/words/casa.mp3')).toBe(true);
    expect(audioCache.entries.has('/audio/es/phrases/buenos_d%C3%ADas.mp3')).toBe(true);
    expect(audioCache.entries.has('/audio/en/words/house.mp3')).toBe(true);
    expect(audioCache.entries.has('/audio/sounds/correct.mp3')).toBe(true);
    expect(audioCache.entries.has('/audio/sounds/incorrect.mp3')).toBe(true);

    const verified = await getVerifiedOfflineLanguages();
    expect(verified.has('es')).toBe(true);
    expect(verified.has('en')).toBe(true);

    // Removing Spanish frees Spanish MP3s while preserving English + quiz SFX
    await removeOfflineLanguage('es');
    expect(audioCache.entries.has('/audio/es/words/casa.mp3')).toBe(false);
    expect(audioCache.entries.has('/audio/en/words/house.mp3')).toBe(true);
    expect(readStoredDownloadedLanguages()).toEqual(['en']);
  });

  it('supports cancelling an in-flight download via AbortController', async () => {
    const controller = new AbortController();
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input.toString();
      if (url.endsWith('/manifest.json')) {
        return new Response(
          JSON.stringify({
            lang: 'fr',
            fileCount: 3,
            totalBytes: 3000,
            files: ['words/bonjour.mp3', 'words/merci.mp3', 'words/oui.mp3'],
          }),
          { status: 200 }
        );
      }
      controller.abort();
      throw new DOMException('Aborted', 'AbortError');
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(downloadOfflineLanguages(['fr'], undefined, controller.signal, 1)).rejects.toThrow();
    expect(readStoredDownloadedLanguages()).not.toContain('fr');
  });

  it('plays cached neural MP3s seamlessly in Airplane Mode (navigator.onLine === false) without TTS fallback', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: RequestInfo | URL) => {
        const url = typeof input === 'string' ? input : input.toString();
        if (url === '/audio/es/manifest.json') {
          return new Response(
            JSON.stringify({
              lang: 'es',
              fileCount: 1,
              totalBytes: 2048,
              files: ['words/casa.mp3'],
            }),
            { status: 200 }
          );
        }
        return new Response(new Uint8Array([0xff, 0xfb, 0x90, 0x64]), {
          status: 200,
          headers: { 'Content-Type': 'audio/mpeg' },
        });
      })
    );

    await downloadOfflineLanguages(['es']);

    // Switch browser to Airplane Mode!
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      get: () => false,
    });

    render(
      <LanguageProvider>
        <PronunciationButton text="casa" lang="es" />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Pronounce "casa"' }));

    await waitFor(() => {
      expect(audioInstances.some((inst) => inst.src.startsWith('blob:'))).toBe(true);
    });
    expect(speechMocks.speak).not.toHaveBeenCalled();
  });

  it('auto-opens OfflineAudioModal when accepting PWA Install App prompt with active language pair pre-selected', async () => {
    localStorage.setItem('basic_language_base_lang', 'zh');
    localStorage.setItem('basic_language_target_lang', 'es');
    window.history.pushState({}, '', '/learn/es/alphabet');

    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: RequestInfo | URL) => {
        const url = typeof input === 'string' ? input : input.toString();
        if (url.endsWith('/manifest.json')) {
          const langMatch = url.match(/\/audio\/([a-z]{2})\/manifest\.json/);
          const lang = (langMatch?.[1] || 'es') as SupportedLanguageId;
          return new Response(
            JSON.stringify({
              lang,
              fileCount: 1,
              totalBytes: 1024,
              files: ['words/sample.mp3'],
            }),
            { status: 200 }
          );
        }
        return new Response(new Uint8Array([0xff, 0xfb, 0x90, 0x64]), {
          status: 200,
          headers: { 'Content-Type': 'audio/mpeg' },
        });
      })
    );

    render(<App />);

    // Simulate Chromium firing beforeinstallprompt
    const promptSpy = vi.fn();
    const fakeInstallEvent = new Event('beforeinstallprompt', { cancelable: true }) as Event & {
      prompt: () => void;
      userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
    };
    fakeInstallEvent.prompt = promptSpy;
    fakeInstallEvent.userChoice = Promise.resolve({ outcome: 'accepted' });

    act(() => {
      window.dispatchEvent(fakeInstallEvent);
    });

    const installBtn = await screen.findByRole('button', { name: '安装应用' });
    fireEvent.click(installBtn);

    expect(promptSpy).toHaveBeenCalledTimes(1);

    // OfflineAudioModal opens localized in Chinese with active pair (es + zh) pre-checked
    const dialog = await screen.findByRole('dialog', { name: '离线语音课程包' });
    expect(dialog).toBeInTheDocument();
    expect(dialog.textContent).toContain('应用已就绪');

    const esCard = screen.getByTestId('offline-pack-es');
    const zhCard = screen.getByTestId('offline-pack-zh');
    const frCard = screen.getByTestId('offline-pack-fr');

    await waitFor(() => {
      expect(esCard).toHaveAttribute('aria-checked', 'true');
      expect(zhCard).toHaveAttribute('aria-checked', 'true');
      expect(frCard).toHaveAttribute('aria-checked', 'false');
    });

    // Download the pre-selected pair
    const downloadBtn = screen.getByRole('button', { name: /下载所选语音包/ });
    fireEvent.click(downloadBtn);

    await waitFor(() => {
      expect(esCard.textContent).toContain('已离线就绪');
      expect(zhCard.textContent).toContain('已离线就绪');
    });

    // Header offline indicator turns green (.offline-ready)
    expect(screen.getByTestId('header-offline-btn')).toHaveClass('offline-ready');
  });

  it('allows selecting additional courses and toggling back to Active Pair Only in OfflineAudioModal', async () => {
    localStorage.setItem('basic_language_base_lang', 'en');
    localStorage.setItem('basic_language_target_lang', 'fr');
    window.history.pushState({}, '', '/learn/fr/alphabet');

    render(
      <LanguageProvider>
        <OfflineAudioModal isOpen={true} onClose={() => {}} />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('offline-pack-fr')).toHaveAttribute('aria-checked', 'true');
      expect(screen.getByTestId('offline-pack-en')).toHaveAttribute('aria-checked', 'true');
    });

    // Toggle Japanese on as an extra course
    const jaCard = screen.getByTestId('offline-pack-ja');
    expect(jaCard).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(jaCard);
    expect(jaCard).toHaveAttribute('aria-checked', 'true');

    // Click "Active Pair Only" to reset back to French + English
    fireEvent.click(screen.getByRole('button', { name: 'Active Pair Only' }));
    expect(jaCard).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByTestId('offline-pack-fr')).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByTestId('offline-pack-en')).toHaveAttribute('aria-checked', 'true');

    // Bulk "Select All" button is intentionally omitted to protect bandwidth
    expect(screen.queryByRole('button', { name: /Select All/i })).not.toBeInTheDocument();
  });

  it('throttles download progress updates and skips Cache Storage hover lookups when online', async () => {
    const fortyFiles = Array.from({ length: 40 }, (_, i) => `words/item_${i}.mp3`);
    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: RequestInfo | URL) => {
        const url = typeof input === 'string' ? input : input.toString();
        if (url === '/audio/de/manifest.json') {
          return new Response(
            JSON.stringify({ lang: 'de', fileCount: 40, totalBytes: 40000, files: fortyFiles }),
            { status: 200 }
          );
        }
        return new Response(new Uint8Array([0xff, 0xfb, 0x90, 0x64]), { status: 200 });
      })
    );

    const progressEvents: number[] = [];
    await downloadOfflineLanguages(['de'], (p) => progressEvents.push(p.percent));
    expect(progressEvents.at(-1)).toBe(100);
    // Throttled to 100ms: rapid 40-file burst emits far fewer than 40 state updates
    expect(progressEvents.length).toBeLessThan(15);

    // Online pointer hover should NOT query Cache Storage (Service Worker handles online CacheFirst)
    mockCaches.open.mockClear();
    render(
      <LanguageProvider>
        <PronunciationButton text="Haus" lang="de" />
      </LanguageProvider>
    );
    fireEvent.pointerEnter(screen.getByRole('button', { name: 'Pronounce "Haus"' }));
    expect(mockCaches.open).not.toHaveBeenCalled();
  });
});
