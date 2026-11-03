import { SupportedLanguageId } from '../data/languages/types';

export const OFFLINE_AUDIO_CACHE_NAME = 'bls-offline-audio-v1';
export const OFFLINE_MANIFEST_CACHE_NAME = 'bls-audio-manifests-v1';
export const DOWNLOADED_LANGS_STORAGE_KEY = 'bls_offline_downloaded_langs';

export interface LanguageAudioPackMeta {
  fileCount: number;
  sizeMB: number;
}

export const OFFLINE_AUDIO_PACK_INFO: Record<SupportedLanguageId, LanguageAudioPackMeta> = {
  en: { fileCount: 1103, sizeMB: 13.2 },
  es: { fileCount: 1110, sizeMB: 13.4 },
  fr: { fileCount: 1115, sizeMB: 12.7 },
  de: { fileCount: 884, sizeMB: 9.7 },
  pt: { fileCount: 803, sizeMB: 8.9 },
  ru: { fileCount: 1074, sizeMB: 13.4 },
  id: { fileCount: 814, sizeMB: 9.2 },
  tr: { fileCount: 838, sizeMB: 9.9 },
  zh: { fileCount: 1297, sizeMB: 13.4 },
  ja: { fileCount: 840, sizeMB: 9.1 },
  ko: { fileCount: 797, sizeMB: 10.1 },
  hi: { fileCount: 1275, sizeMB: 14.7 },
  ar: { fileCount: 1243, sizeMB: 14.1 },
  bn: { fileCount: 619, sizeMB: 6.4 },
  ur: { fileCount: 594, sizeMB: 6.5 },
};

export interface LanguageManifestPayload {
  lang: SupportedLanguageId;
  fileCount: number;
  totalBytes: number;
  packFile?: string;
  files: string[];
  sizes?: number[];
}

export interface OfflineDownloadProgress {
  currentLang: SupportedLanguageId;
  completedFiles: number;
  totalFiles: number;
  percent: number;
  failedFiles: number;
}

const MAX_BLOB_LRU = 250;
const blobUrlMap = new Map<string, string>();
const listeners = new Set<() => void>();

const setBlobLru = (path: string, blobUrl: string) => {
  if (blobUrlMap.has(path)) {
    const prev = blobUrlMap.get(path);
    if (prev && prev !== blobUrl && typeof URL.revokeObjectURL === 'function') {
      try {
        URL.revokeObjectURL(prev);
      } catch {
        // ignore revoke errors
      }
    }
    blobUrlMap.delete(path);
  }
  blobUrlMap.set(path, blobUrl);
  if (blobUrlMap.size > MAX_BLOB_LRU) {
    const oldestKey = blobUrlMap.keys().next().value;
    if (oldestKey) {
      const oldestUrl = blobUrlMap.get(oldestKey);
      blobUrlMap.delete(oldestKey);
      if (oldestUrl && typeof URL.revokeObjectURL === 'function') {
        try {
          URL.revokeObjectURL(oldestUrl);
        } catch {
          // ignore revoke errors
        }
      }
    }
  }
};

export const isCacheStorageSupported = (): boolean => {
  return typeof window !== 'undefined' && 'caches' in window && Boolean(window.caches);
};

export const subscribeOfflineAudioChanges = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const notifyOfflineSubscribers = () => {
  listeners.forEach((fn) => {
    try {
      fn();
    } catch {
      // ignore listener errors
    }
  });
};

export const readStoredDownloadedLanguages = (): SupportedLanguageId[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(DOWNLOADED_LANGS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is SupportedLanguageId => typeof id === 'string' && id in OFFLINE_AUDIO_PACK_INFO);
  } catch {
    return [];
  }
};

const writeStoredDownloadedLanguages = (langs: Iterable<SupportedLanguageId>) => {
  if (typeof window === 'undefined') return;
  try {
    const unique = Array.from(new Set(langs));
    localStorage.setItem(DOWNLOADED_LANGS_STORAGE_KEY, JSON.stringify(unique));
  } catch {
    // ignore storage errors
  }
};

/**
 * Converts a relative manifest entry (e.g. "phrases/buenos_días.mp3") into the exact
 * URL-encoded path produced by PronunciationButton.getCandidateAudioPathsForText.
 */
export const manifestEntryToAudioUrl = (lang: SupportedLanguageId, relPath: string): string => {
  const slashIdx = relPath.indexOf('/');
  if (slashIdx === -1) {
    const clean = relPath.replace(/\.mp3$/i, '').normalize('NFC');
    return `/audio/${lang}/${encodeURIComponent(clean)}.mp3`;
  }
  const folder = relPath.slice(0, slashIdx);
  const filePart = relPath.slice(slashIdx + 1).replace(/\.mp3$/i, '').normalize('NFC');
  return `/audio/${lang}/${folder}/${encodeURIComponent(filePart)}.mp3`;
};

const normalizePathname = (inputUrl: string): string => {
  try {
    const base = typeof window !== 'undefined' ? window.location.origin : 'http://localhost';
    return new URL(inputUrl, base).pathname;
  } catch {
    return inputUrl;
  }
};

const getOfflineReadyMarkerPath = (lang: SupportedLanguageId): string =>
  `/audio/${lang}/__offline_ready__`;

/**
 * Returns verified offline-downloaded language IDs (reconciling localStorage against Cache Storage).
 * Checks lightweight O(1) per-language markers first before falling back to scanning cache.keys().
 */
export const getVerifiedOfflineLanguages = async (): Promise<Set<SupportedLanguageId>> => {
  const stored = new Set<SupportedLanguageId>(readStoredDownloadedLanguages());
  if (!isCacheStorageSupported() || stored.size === 0) {
    return stored;
  }
  try {
    const cache = await window.caches.open(OFFLINE_AUDIO_CACHE_NAME);
    const unverified: SupportedLanguageId[] = [];
    await Promise.all(
      Array.from(stored).map(async (lang) => {
        const marker = await cache.match(getOfflineReadyMarkerPath(lang));
        if (!marker) {
          unverified.push(lang);
        }
      })
    );
    if (unverified.length === 0) {
      return stored;
    }

    const keys = await cache.keys();
    const prefixesFound = new Set<string>();
    for (const req of keys) {
      const pathname = normalizePathname(req.url);
      const match = pathname.match(/^\/audio\/([a-z]{2})\//);
      if (match) {
        prefixesFound.add(match[1]);
      }
    }
    let changed = false;
    for (const lang of unverified) {
      if (!prefixesFound.has(lang)) {
        stored.delete(lang);
        changed = true;
      }
    }
    if (changed) {
      writeStoredDownloadedLanguages(stored);
      notifyOfflineSubscribers();
    }
    return stored;
  } catch {
    return stored;
  }
};

const fetchLanguageManifest = async (
  lang: SupportedLanguageId,
  signal?: AbortSignal
): Promise<LanguageManifestPayload> => {
  const manifestUrl = `/audio/${lang}/manifest.json`;
  if (isCacheStorageSupported()) {
    try {
      const mCache = await window.caches.open(OFFLINE_MANIFEST_CACHE_NAME);
      const resp = await fetch(manifestUrl, { signal });
      if (resp.ok) {
        await mCache.put(manifestUrl, resp.clone()).catch(() => {});
        return (await resp.json()) as LanguageManifestPayload;
      }
      const cached = await mCache.match(manifestUrl);
      if (cached) {
        return (await cached.json()) as LanguageManifestPayload;
      }
    } catch (err) {
      const mCache = await window.caches.open(OFFLINE_MANIFEST_CACHE_NAME);
      const cached = await mCache.match(manifestUrl);
      if (cached) {
        return (await cached.json()) as LanguageManifestPayload;
      }
      throw err;
    }
  }

  const resp = await fetch(manifestUrl, { signal });
  if (!resp.ok) {
    throw new Error(`Failed to fetch audio manifest for ${lang} (${resp.status})`);
  }
  return (await resp.json()) as LanguageManifestPayload;
};

const sleepWithAbort = (ms: number, signal?: AbortSignal): Promise<void> =>
  new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    };
    signal?.addEventListener('abort', onAbort, { once: true });
  });

const fetchWithRetry = async (
  url: string,
  signal?: AbortSignal,
  maxRetries: number = 3
): Promise<Response> => {
  const backoffMs = [250, 750, 1800];
  let lastResp: Response | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    try {
      const resp = await fetch(url, { signal });
      if (resp.status !== 429 && resp.status < 500) {
        return resp;
      }
      lastResp = resp;
      // Drain/cancel body stream on throttled response before retrying
      try {
        await resp.body?.cancel();
      } catch {
        // ignore
      }
    } catch (err: any) {
      if (signal?.aborted || err?.name === 'AbortError') throw err;
      if (attempt === maxRetries) throw err;
    }
    if (attempt < maxRetries) {
      await sleepWithAbort(backoffMs[Math.min(attempt, backoffMs.length - 1)], signal);
    }
  }

  return lastResp || new Response(null, { status: 503 });
};

/**
 * Streams `/audio/<lang>/offline-pack.bin` in a single HTTP request and slices each MP3
 * directly into Cache Storage ('bls-offline-audio-v1') using byte lengths from manifest.json.
 * Returns true if the binary pack succeeded, or false if unavailable so caller can fall back.
 */
const tryDownloadLanguageViaBinaryPack = async (
  lang: SupportedLanguageId,
  manifest: LanguageManifestPayload,
  urls: string[],
  cache: Cache,
  cachedPathSet: Set<string>,
  onVirtualDelta: (deltaCompleted: number, force?: boolean) => void,
  signal?: AbortSignal
): Promise<boolean> => {
  if (
    !Array.isArray(manifest.sizes) ||
    manifest.sizes.length !== urls.length ||
    typeof manifest.totalBytes !== 'number' ||
    manifest.totalBytes <= 0
  ) {
    return false;
  }

  const packUrl = `/audio/${lang}/${manifest.packFile || 'offline-pack.bin'}`;
  let resp: Response;
  try {
    resp = await fetchWithRetry(packUrl, signal, 2);
  } catch (err: any) {
    if (signal?.aborted || err?.name === 'AbortError') throw err;
    return false;
  }

  const contentType = (resp.headers.get('content-type') || '').toLowerCase();
  if (!resp.ok || resp.status !== 200 || contentType.includes('text/html')) {
    try {
      await resp.body?.cancel();
    } catch {
      // ignore
    }
    return false;
  }

  const missingCount = urls.reduce((acc, u) => acc + (cachedPathSet.has(u) ? 0 : 1), 0);
  const expectedBytes = manifest.totalBytes;
  let packBytes: Uint8Array;

  if (resp.body && typeof resp.body.getReader === 'function') {
    const reader = resp.body.getReader();
    packBytes = new Uint8Array(expectedBytes);
    let received = 0;

    try {
      while (true) {
        if (signal?.aborted) {
          await reader.cancel().catch(() => {});
          throw new DOMException('Aborted', 'AbortError');
        }
        const { done, value } = await reader.read();
        if (done) break;
        if (value && value.byteLength > 0) {
          if (received + value.byteLength > expectedBytes) {
            await reader.cancel().catch(() => {});
            return false;
          }
          packBytes.set(value, received);
          received += value.byteLength;
          // Map network download phase smoothly across 0% -> 80% of missing files
          const streamProgressFiles = Math.floor(missingCount * 0.8 * (received / expectedBytes));
          onVirtualDelta(streamProgressFiles, false);
        }
      }
    } catch (err: any) {
      if (signal?.aborted || err?.name === 'AbortError') throw err;
      return false;
    }

    if (received !== expectedBytes) {
      return false;
    }
  } else {
    const ab = await resp.arrayBuffer();
    if (ab.byteLength !== expectedBytes) {
      return false;
    }
    packBytes = new Uint8Array(ab);
    onVirtualDelta(Math.floor(missingCount * 0.8), false);
  }

  // Unpack slices into Cache Storage in batches of 40 so UI stays responsive and GC frees packBytes
  const BATCH_SIZE = 40;
  let batch: Array<{ url: string; response: Response }> = [];
  let offset = 0;
  let unpackedMissing = 0;

  const flushBatch = async () => {
    if (batch.length === 0) return;
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    const currentBatch = batch;
    batch = [];
    await Promise.all(
      currentBatch.map(async ({ url, response }) => {
        await cache.put(url, response);
        cachedPathSet.add(url);
      })
    );
    unpackedMissing += currentBatch.length;
    const unpackProgress = Math.floor(
      missingCount * (0.8 + 0.2 * (unpackedMissing / Math.max(1, missingCount)))
    );
    onVirtualDelta(unpackProgress, false);
  };

  for (let i = 0; i < urls.length; i++) {
    const size = manifest.sizes[i];
    const url = urls[i];
    if (!cachedPathSet.has(url)) {
      const sliceBuffer = packBytes.slice(offset, offset + size);
      const response = new Response(sliceBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': String(size),
        },
      });
      batch.push({ url, response });
      if (batch.length >= BATCH_SIZE) {
        await flushBatch();
      }
    }
    offset += size;
  }

  await flushBatch();
  onVirtualDelta(missingCount, true);
  return true;
};

/**
 * Downloads all studio neural MP3 clips for the selected languages into Cache Storage
 * ('bls-offline-audio-v1') so both Service Worker CacheFirst and direct Blob fallback work in Airplane Mode.
 * Uses a single `/audio/<lang>/offline-pack.bin` stream per language (1 HTTP request/language, immune to CDN
 * rate limits) with automatic fallback to paced, retry-backed individual fetches.
 */
export const downloadOfflineLanguages = async (
  langs: SupportedLanguageId[],
  onProgress?: (progress: OfflineDownloadProgress) => void,
  signal?: AbortSignal,
  concurrency: number = 4
): Promise<{ downloaded: SupportedLanguageId[]; failedFiles: number }> => {
  const uniqueLangs = Array.from(new Set(langs));
  if (uniqueLangs.length === 0 || !isCacheStorageSupported()) {
    return { downloaded: [], failedFiles: 0 };
  }

  // Request persistent storage so mobile browsers protect offline packs from eviction
  if (typeof navigator !== 'undefined' && navigator.storage && typeof navigator.storage.persist === 'function') {
    navigator.storage.persist().catch(() => {});
  }

  const cache = await window.caches.open(OFFLINE_AUDIO_CACHE_NAME);
  const existingKeys = await cache.keys();
  const cachedPathSet = new Set<string>(existingKeys.map((r) => normalizePathname(r.url)));

  // Ensure quiz sound effects are cached too (pass resp directly to cache.put without leaking clone streams)
  for (const sfx of ['/audio/sounds/correct.mp3', '/audio/sounds/incorrect.mp3']) {
    if (!cachedPathSet.has(sfx)) {
      try {
        const sfxResp = await fetch(sfx, { signal });
        if (sfxResp.ok) {
          await cache.put(sfx, sfxResp);
          cachedPathSet.add(sfx);
        }
      } catch {
        // non-fatal
      }
    }
  }

  // Load manifests for all requested languages first so total progress bar is 100% accurate
  const manifests: Array<{
    lang: SupportedLanguageId;
    manifest: LanguageManifestPayload;
    urls: string[];
  }> = [];
  let totalFiles = 0;

  for (const lang of uniqueLangs) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    const manifest = await fetchLanguageManifest(lang, signal);
    const urls = manifest.files.map((rel) => manifestEntryToAudioUrl(lang, rel));
    manifests.push({ lang, manifest, urls });
    totalFiles += urls.length;
  }

  let completedFiles = 0;
  let failedFiles = 0;
  let lastProgressEmitMs = 0;
  const PROGRESS_THROTTLE_MS = 100;
  const newlyCompletedLangs: SupportedLanguageId[] = [];
  const storedSet = new Set<SupportedLanguageId>(readStoredDownloadedLanguages());

  const reportWithCount = (
    currentLang: SupportedLanguageId,
    effectiveCompleted: number,
    force: boolean = false
  ) => {
    if (!onProgress) return;
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const isComplete = totalFiles > 0 && effectiveCompleted >= totalFiles;
    if (!force && !isComplete && now - lastProgressEmitMs < PROGRESS_THROTTLE_MS) {
      return;
    }
    lastProgressEmitMs = now;
    const clampedCompleted = Math.min(totalFiles, effectiveCompleted);
    const percent =
      totalFiles > 0 ? Math.min(100, Math.round((clampedCompleted / totalFiles) * 100)) : 100;
    onProgress({
      currentLang,
      completedFiles: clampedCompleted,
      totalFiles,
      percent,
      failedFiles,
    });
  };

  for (const { lang, manifest, urls } of manifests) {
    let langFailures = 0;
    const missingUrls: string[] = [];

    for (const url of urls) {
      if (cachedPathSet.has(url)) {
        completedFiles += 1;
      } else {
        missingUrls.push(url);
      }
    }
    const baseCompletedBeforeMissing = completedFiles;
    reportWithCount(lang, completedFiles, true);

    let unpackedViaBin = false;
    if (missingUrls.length > 0) {
      unpackedViaBin = await tryDownloadLanguageViaBinaryPack(
        lang,
        manifest,
        urls,
        cache,
        cachedPathSet,
        (deltaCompleted, force = false) => {
          reportWithCount(lang, baseCompletedBeforeMissing + deltaCompleted, force);
        },
        signal
      );
      if (unpackedViaBin) {
        completedFiles = baseCompletedBeforeMissing + missingUrls.length;
      }
    }

    if (!unpackedViaBin && missingUrls.length > 0) {
      // Recompute remaining missing URLs in case partial work occurred
      const remainingUrls = missingUrls.filter((u) => {
        if (cachedPathSet.has(u)) {
          completedFiles += 1;
          return false;
        }
        return true;
      });

      let cursor = 0;
      const workerCount = Math.min(Math.max(1, concurrency), 4, remainingUrls.length || 1);

      const runWorker = async () => {
        while (cursor < remainingUrls.length) {
          if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
          const idx = cursor++;
          const url = remainingUrls[idx];
          try {
            const resp = await fetchWithRetry(url, signal, 3);
            if (resp.ok && resp.status === 200) {
              await cache.put(url, resp);
              cachedPathSet.add(url);
            } else {
              failedFiles += 1;
              langFailures += 1;
            }
          } catch (err: any) {
            if (signal?.aborted || err?.name === 'AbortError') {
              throw err;
            }
            failedFiles += 1;
            langFailures += 1;
          } finally {
            completedFiles += 1;
            reportWithCount(lang, completedFiles, false);
          }
        }
      };

      if (remainingUrls.length > 0) {
        await Promise.all(Array.from({ length: workerCount }, () => runWorker()));
      }
    }

    reportWithCount(lang, completedFiles, true);

    // Mark language offline-ready if at least 95% of clips succeeded
    if (urls.length === 0 || langFailures / urls.length <= 0.05) {
      await cache
        .put(
          getOfflineReadyMarkerPath(lang),
          new Response('ready', { status: 200, headers: { 'Content-Type': 'text/plain' } })
        )
        .catch(() => {});
      storedSet.add(lang);
      newlyCompletedLangs.push(lang);
      writeStoredDownloadedLanguages(storedSet);
      notifyOfflineSubscribers();
    }
  }

  return { downloaded: newlyCompletedLangs, failedFiles };
};

/**
 * Deletes all cached MP3 clips for a single language to free device storage.
 */
export const removeOfflineLanguage = async (lang: SupportedLanguageId): Promise<void> => {
  const prefix = `/audio/${lang}/`;
  for (const [pathKey, blobUrl] of Array.from(blobUrlMap.entries())) {
    if (pathKey.startsWith(prefix)) {
      blobUrlMap.delete(pathKey);
      if (typeof URL.revokeObjectURL === 'function') {
        try {
          URL.revokeObjectURL(blobUrl);
        } catch {
          // ignore
        }
      }
    }
  }

  if (isCacheStorageSupported()) {
    try {
      const cache = await window.caches.open(OFFLINE_AUDIO_CACHE_NAME);
      const keys = await cache.keys();
      await Promise.all(
        keys
          .filter((req) => normalizePathname(req.url).startsWith(prefix))
          .map((req) => cache.delete(req))
      );
    } catch {
      // ignore cache errors
    }
  }

  const stored = new Set<SupportedLanguageId>(readStoredDownloadedLanguages());
  stored.delete(lang);
  writeStoredDownloadedLanguages(stored);
  notifyOfflineSubscribers();
};

/**
 * Returns an already-materialized in-memory blob: URL if one of candidatePaths was warmed.
 */
export const getSyncCachedBlobUrl = (candidatePaths: string[]): string | null => {
  for (const p of candidatePaths) {
    const hit = blobUrlMap.get(p);
    if (hit) return hit;
  }
  return null;
};

/**
 * Checks Cache Storage ('bls-offline-audio-v1') for the first matching candidate audio path
 * and returns a playable local blob: URL (works in Airplane Mode even without an active SW).
 */
export const resolveCachedAudioBlobUrl = async (candidatePaths: string[]): Promise<string | null> => {
  const syncHit = getSyncCachedBlobUrl(candidatePaths);
  if (syncHit) return syncHit;
  if (!isCacheStorageSupported() || candidatePaths.length === 0) return null;

  try {
    const cache = await window.caches.open(OFFLINE_AUDIO_CACHE_NAME);
    for (const path of candidatePaths) {
      const match = await cache.match(path);
      if (match && match.ok && typeof URL.createObjectURL === 'function') {
        const blob = await match.blob();
        if (blob.size > 0) {
          const blobUrl = URL.createObjectURL(blob);
          setBlobLru(path, blobUrl);
          return blobUrl;
        }
      }
    }
  } catch {
    // ignore cache lookup errors
  }
  return null;
};

/**
 * Pre-warms in-memory blob URL on hover/focus so subsequent click plays synchronously in 0ms.
 */
export const warmCachedBlobUrls = (candidatePaths: string[]): void => {
  if (!isCacheStorageSupported() || candidatePaths.length === 0) return;
  if (getSyncCachedBlobUrl(candidatePaths)) return;
  resolveCachedAudioBlobUrl(candidatePaths).catch(() => {});
};

/**
 * Test/cleanup helper to reset in-memory blob LRU cache.
 */
export const clearInMemoryAudioBlobCache = (): void => {
  for (const blobUrl of blobUrlMap.values()) {
    if (typeof URL.revokeObjectURL === 'function') {
      try {
        URL.revokeObjectURL(blobUrl);
      } catch {
        // ignore
      }
    }
  }
  blobUrlMap.clear();
};

