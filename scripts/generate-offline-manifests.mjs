import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIO_ROOT = path.resolve(__dirname, '../public/audio');

const LANGUAGES = [
  'en', 'es', 'fr', 'de', 'pt', 'ru', 'id', 'tr',
  'zh', 'ja', 'ko', 'hi', 'ar', 'bn', 'ur'
];

let grandTotalFiles = 0;
let grandTotalBytes = 0;

for (const lang of LANGUAGES) {
  const langDir = path.join(AUDIO_ROOT, lang);
  if (!fs.existsSync(langDir)) {
    console.warn(`Skipping missing audio directory for ${lang}`);
    continue;
  }

  const files = [];
  let totalBytes = 0;

  const subdirs = fs.readdirSync(langDir).sort();
  for (const sub of subdirs) {
    const subPath = path.join(langDir, sub);
    if (!fs.statSync(subPath).isDirectory()) continue;

    const entries = fs.readdirSync(subPath).sort();
    for (const entry of entries) {
      if (!entry.toLowerCase().endsWith('.mp3')) continue;
      const fullPath = path.join(subPath, entry);
      const stat = fs.statSync(fullPath);
      const normalizedEntry = entry.normalize('NFC');
      files.push(`${sub}/${normalizedEntry}`);
      totalBytes += stat.size;
    }
  }

  const manifest = {
    lang,
    fileCount: files.length,
    totalBytes,
    files,
  };

  const outPath = path.join(langDir, 'manifest.json');
  fs.writeFileSync(outPath, JSON.stringify(manifest));
  grandTotalFiles += files.length;
  grandTotalBytes += totalBytes;
  console.log(
    `[${lang}] wrote ${files.length} files (${(totalBytes / (1024 * 1024)).toFixed(1)} MB) -> public/audio/${lang}/manifest.json`
  );
}

console.log(
  `Done: ${grandTotalFiles} MP3s (${(grandTotalBytes / (1024 * 1024)).toFixed(1)} MB) indexed across ${LANGUAGES.length} languages.`
);

