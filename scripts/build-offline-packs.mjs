import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PACK_LANGUAGES = [
  'en', 'es', 'fr', 'de', 'pt', 'ru', 'id', 'tr',
  'zh', 'ja', 'ko', 'hi', 'ar', 'bn', 'ur'
];

/**
 * Builds a deterministic concatenated binary buffer of all MP3s listed in
 * `<audioRoot>/<lang>/manifest.json`, resolving NFC/NFD filesystem differences
 * identically across macOS (APFS) and Linux (Netlify ext4).
 */
export function buildLanguagePackBuffer(audioRoot, lang) {
  const langDir = path.join(audioRoot, lang);
  const manifestPath = path.join(langDir, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Missing manifest.json at ${manifestPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const diskLookup = new Map();

  for (const sub of fs.readdirSync(langDir)) {
    const subPath = path.join(langDir, sub);
    if (!fs.statSync(subPath).isDirectory()) continue;
    for (const entry of fs.readdirSync(subPath)) {
      if (!entry.toLowerCase().endsWith('.mp3')) continue;
      diskLookup.set(`${sub}/${entry.normalize('NFC')}`, path.join(subPath, entry));
    }
  }

  const chunks = [];
  let actualTotalBytes = 0;

  const resolvedLangDir = path.resolve(langDir);
  for (let i = 0; i < manifest.files.length; i++) {
    const relPath = manifest.files[i];
    let diskPath = diskLookup.get(relPath.normalize('NFC'));
    if (!diskPath) {
      const candidate = path.resolve(resolvedLangDir, relPath);
      if (!candidate.startsWith(resolvedLangDir + path.sep)) {
        throw new Error(`Unsafe offline pack entry path for ${lang}: ${relPath}`);
      }
      diskPath = candidate;
    }
    const buf = fs.readFileSync(diskPath);
    if (Array.isArray(manifest.sizes) && manifest.sizes[i] !== buf.length) {
      throw new Error(
        `Size mismatch for ${lang}/${relPath}: manifest expected ${manifest.sizes[i]}, got ${buf.length}`
      );
    }
    chunks.push(buf);
    actualTotalBytes += buf.length;
  }

  if (typeof manifest.totalBytes === 'number' && actualTotalBytes !== manifest.totalBytes) {
    throw new Error(
      `Total byte mismatch for ${lang}: manifest expected ${manifest.totalBytes}, got ${actualTotalBytes}`
    );
  }

  return Buffer.concat(chunks, actualTotalBytes);
}

export function buildAllDistOfflinePacks(distAudioRoot = path.resolve(__dirname, '../dist/audio')) {
  if (!fs.existsSync(distAudioRoot)) {
    throw new Error(`dist/audio directory not found at ${distAudioRoot}. Run vite build first.`);
  }

  const t0 = Date.now();
  let builtCount = 0;
  let totalBytes = 0;

  for (const lang of PACK_LANGUAGES) {
    const langDir = path.join(distAudioRoot, lang);
    if (!fs.existsSync(langDir)) continue;

    const packBuf = buildLanguagePackBuffer(distAudioRoot, lang);
    const outFile = path.join(langDir, 'offline-pack.bin');
    fs.writeFileSync(outFile, packBuf);
    builtCount += 1;
    totalBytes += packBuf.length;
  }

  const elapsedMs = Date.now() - t0;
  console.log(
    `[offline-packs] Packed ${builtCount} language bundles (${(totalBytes / (1024 * 1024)).toFixed(
      1
    )} MB) into dist/audio/*/offline-pack.bin in ${elapsedMs}ms.`
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  buildAllDistOfflinePacks();
}

