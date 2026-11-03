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
  files: string[];
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

/**
 * Returns verified offline-downloaded language IDs (reconciling localStorage against Cache Storage).
 */
export const getVerifiedOfflineLanguages = async (): Promise<Set<SupportedLanguageId>> => {
  const stored = new Set<SupportedLanguageId>(readStoredDownloadedLanguages());
  if (!isCacheStorageSupported() || stored.size === 0) {
    return stored;
  }
  try {
    const cache = await window.caches.open(OFFLINE_AUDIO_CACHE_NAME);
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
    for (const lang of Array.from(stored)) {
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

/**
 * Downloads all studio neural MP3 clips for the selected languages into Cache Storage
 * ('bls-offline-audio-v1') so both Service Worker CacheFirst and direct Blob fallback work in Airplane Mode.
 */
export const downloadOfflineLanguages = async (
  langs: SupportedLanguageId[],
  onProgress?: (progress: OfflineDownloadProgress) => void,
  signal?: AbortSignal,
  concurrency: number = 8
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

  // Ensure quiz sound effects are cached too
  for (const sfx of ['/audio/sounds/correct.mp3', '/audio/sounds/incorrect.mp3']) {
    if (!cachedPathSet.has(sfx)) {
      try {
        const sfxResp = await fetch(sfx, { signal });
        if (sfxResp.ok) {
          await cache.put(sfx, sfxResp.clone());
          cachedPathSet.add(sfx);
        }
      } catch {
        // non-fatal
      }
    }
  }

  // Load manifests for all requested languages first so total progress bar is 100% accurate
  const manifests: Array<{ lang: SupportedLanguageId; urls: string[] }> = [];
  let totalFiles = 0;

  for (const lang of uniqueLangs) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    const manifest = await fetchLanguageManifest(lang, signal);
    const urls = manifest.files.map((rel) => manifestEntryToAudioUrl(lang, rel));
    manifests.push({ lang, urls });
    totalFiles += urls.length;
  }

  let completedFiles = 0;
  let failedFiles = 0;
  const newlyCompletedLangs: SupportedLanguageId[] = [];
  const storedSet = new Set<SupportedLanguageId>(readStoredDownloadedLanguages());

  const report = (currentLang: SupportedLanguageId) => {
    if (!onProgress) return;
    const percent = totalFiles > 0 ? Math.min(100, Math.round((completedFiles / totalFiles) * 100)) : 100;
    onProgress({
      currentLang,
      completedFiles,
      totalFiles,
      percent,
      failedFiles,
    });
  };

  for (const { lang, urls } of manifests) {
    let langFailures = 0;
    const missingUrls: string[] = [];

    for (const url of urls) {
      if (cachedPathSet.has(url)) {
        completedFiles += 1;
      } else {
        missingUrls.push(url);
      }
    }
    report(lang);

    let cursor = 0;
    const workerCount = Math.min(Math.max(1, concurrency), missingUrls.length || 1);

    const runWorker = async () => {
      while (cursor < missingUrls.length) {
        if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
        const idx = cursor++;
        const url = missingUrls[idx];
        try {
          const resp = await fetch(url, { signal });
          if (resp.ok && resp.status === 200) {
            await cache.put(url, resp.clone());
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
          report(lang);
        }
      }
    };

    if (missingUrls.length > 0) {
      await Promise.all(Array.from({ length: workerCount }, () => runWorker()));
    }

    // Mark language offline-ready if at least 95% of clips succeeded
    if (urls.length === 0 || langFailures / urls.length <= 0.05) {
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

