#!/usr/bin/env python3
"""
Generate complete studio neural audio files for Grammar across all 13 languages.
Uses Microsoft Edge Neural TTS voices matching basicenglish.school architecture.
"""

import os
import re
import sys
import json
import asyncio
import unicodedata
from pathlib import Path

# Add local python path for edge_tts
import edge_tts

ROOT = Path(__file__).resolve().parent.parent
PUBLIC_AUDIO = ROOT / 'public' / 'audio'

VOICES = {
    'ru': 'ru-RU-SvetlanaNeural',
    'en': 'en-US-JennyNeural',
    'es': 'es-MX-JorgeNeural',
    'fr': 'fr-FR-HenriNeural',
    'pt': 'pt-BR-AntonioNeural',
    'de': 'de-DE-ConradNeural',
    'id': 'id-ID-ArdiNeural',
    'tr': 'tr-TR-AhmetNeural',
    'ja': 'ja-JP-KeitaNeural',
    'ko': 'ko-KR-InJoonNeural',
    'zh': 'zh-CN-XiaoxiaoNeural',
    'hi': 'hi-IN-SwaraNeural',
    'ar': 'ar-SA-ZariyahNeural',
}

def clean_speech_text(text: str) -> str:
    # Remove Latin notes in brackets or parens e.g. "लड़का (Boy)" -> "लड़का", "먹다 (meokda)" -> "먹다"
    clean = re.sub(r'\s*\([^)]*\)\s*', ' ', text)
    clean = re.sub(r'\s*\[[^\]]*\]\s*', ' ', clean)
    clean = re.sub(r'[«»"“”„‟`]', '', clean)
    clean = re.sub(r'\s*—\s*.*', '', clean) # remove translation descriptions
    clean = re.sub(r'\s+', ' ', clean).strip()
    return clean

async def synthesize_one(text_to_speak: str, lang: str, out_paths: list, semaphore: asyncio.Semaphore):
    # If all out_paths exist and have valid size (>200 bytes), skip
    if all(p.exists() and p.stat().st_size > 200 for p in out_paths):
        return

    voice = VOICES.get(lang)
    if not voice:
        return

    async with semaphore:
        for attempt in range(3):
            try:
                comm = edge_tts.Communicate(text_to_speak, voice)
                first_path = out_paths[0]
                first_path.parent.mkdir(parents=True, exist_ok=True)
                await comm.save(str(first_path))

                # Copy to secondary paths (e.g. grammar and words/phrases)
                data = first_path.read_bytes()
                for sec_path in out_paths[1:]:
                    sec_path.parent.mkdir(parents=True, exist_ok=True)
                    sec_path.write_bytes(data)

                print(f"[{lang}] Generated: {first_path.name} ({text_to_speak})")
                return
            except Exception as e:
                if attempt == 2:
                    print(f"[{lang}] FAILED after 3 attempts for '{text_to_speak}': {e}")
                else:
                    await asyncio.sleep(0.5)

async def main():
    audit_file = ROOT / 'scripts' / 'grammar_targets.json'
    if not audit_file.exists():
        print("Error: scripts/grammar_targets.json does not exist. Run audit test first.")
        return

    with open(audit_file) as f:
        targets = json.load(f)

    semaphore = asyncio.Semaphore(6)
    tasks = []

    for item in targets:
        lang = item['lang']
        raw_spoken = item['spoken']
        text_spoken = clean_speech_text(raw_spoken)
        fn = item['filename']
        if not text_spoken or not fn:
            continue

        # Save to both grammar/ and words/ or phrases/
        grammar_path = PUBLIC_AUDIO / lang / 'grammar' / f"{fn}.mp3"
        cat = 'phrases' if '_' in fn else 'words'
        cat_path = PUBLIC_AUDIO / lang / cat / f"{fn}.mp3"

        tasks.append(synthesize_one(text_spoken, lang, [grammar_path, cat_path], semaphore))

    print(f"Synthesizing {len(tasks)} grammar audio files across {len(VOICES)} languages...")
    await asyncio.gather(*tasks)
    print("All grammar audio synthesis completed successfully!")

if __name__ == '__main__':
    asyncio.run(main())
