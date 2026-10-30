#!/usr/bin/env python3
"""
Generate complete studio neural audio files for Hindi (hi)
Voice: hi-IN-SwaraNeural (Microsoft Edge Neural TTS)
Target directory: public/audio/hi/{alphabet,examples,phrases,numbers,words,time}/
"""

import os
import re
import sys
import json
import asyncio
import unicodedata
from pathlib import Path

# Add local user python library path where edge_tts is installed
import edge_tts

ROOT = Path(__file__).resolve().parent.parent
AUDIO_HI = ROOT / 'public' / 'audio' / 'hi'
DATA_FILE = ROOT / 'src' / 'data' / 'languages' / 'hi' / 'hindiData.ts'
RESOLVER_FILE = ROOT / 'src' / 'utils' / 'translationResolver.ts'

VOICE = "hi-IN-SwaraNeural"

def clean_filename(text: str) -> str:
    if not text:
        return ""
    normalized = text.strip()
    num_match = re.match(r"^[\d,.\s]+\(([^)]+)\)$", normalized)
    effective = num_match.group(1).strip() if num_match else normalized
    clean = effective.split('/')[0]
    clean = re.sub(r"\s*\([^)]*\)\s*", "", clean)
    clean = re.sub(r"[?.,!¡¿'’\"«»:？。、！]", "", clean).strip()
    clean = unicodedata.normalize("NFC", clean)
    clean = re.sub(r"\s+", "_", clean)
    return clean

def clean_spoken(text: str) -> str:
    variant = text.split('/')[0]
    num_match = re.match(r"^[\d,.\s]+\(([^)]+)\)$", variant.strip())
    if num_match:
        variant = num_match.group(1).strip()
    clean = re.sub(r"\s*\([^)]*\)\s*", " ", variant)
    clean = re.sub(r"[?.,!¡¿'’\"«»:？。、！]", "", clean).strip()
    return clean

# Special spoken text for alphabet items if needed
ALPHABET_SPOKEN = {
    'अं': 'अंग',
}

async def synthesize_item(sem, text: str, out_path: Path):
    async with sem:
        if out_path.exists() and out_path.stat().st_size > 500:
            return False
        out_path.parent.mkdir(parents=True, exist_ok=True)
        spoken = clean_spoken(text)
        if not spoken:
            return False
        for attempt in range(3):
            try:
                comm = edge_tts.Communicate(spoken, VOICE)
                await comm.save(str(out_path))
                if out_path.exists() and out_path.stat().st_size > 500:
                    return True
            except Exception as e:
                if attempt == 2:
                    print(f"Error synthesizing '{spoken}' -> {out_path.name}: {e}")
                await asyncio.sleep(0.5)
        return False

async def main():
    print(f"=== Synthesizing Hindi Audio with {VOICE} ===")
    
    # 1. Parse hindiData.ts
    content = DATA_FILE.read_text('utf-8')

    # Alphabet items
    alphabet_raw = re.findall(
        r"\{\s*letter:\s*'([^']+)',\s*pronunciation:\s*'([^']+)',\s*example:\s*'([^']+)',\s*word:\s*'([^']+)',\s*meaning:\s*'([^']+)'",
        content
    )
    print(f"Loaded {len(alphabet_raw)} alphabet items from hindiData.ts")

    # Phrases and numbers
    phrases_raw = re.findall(
        r"\{\s*phrase:\s*'([^']+)',\s*translation:\s*'([^']+)'",
        content
    )
    print(f"Loaded {len(phrases_raw)} phrase/number/time items from hindiData.ts")

    # Build queue of (output_path -> spoken_text)
    tasks_map = {}

    # Alphabet
    for letter, pron, example, word, meaning in alphabet_raw:
        spoken_letter = ALPHABET_SPOKEN.get(letter, letter)
        fn_letter = clean_filename(letter)
        if fn_letter:
            p_letter = AUDIO_HI / 'alphabet' / f"{fn_letter}.mp3"
            tasks_map[p_letter] = spoken_letter

        fn_word = clean_filename(word)
        if fn_word:
            p_ex = AUDIO_HI / 'examples' / f"{fn_word}.mp3"
            tasks_map[p_ex] = word
            p_w = AUDIO_HI / 'words' / f"{fn_word}.mp3"
            tasks_map[p_w] = word

    # Phrases, numbers, time, words
    for phrase, transl in phrases_raw:
        fn = clean_filename(phrase)
        if not fn:
            continue
        # Is it a number?
        if any(term in transl.lower() for term in ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'hundred', 'thousand']):
            p_num = AUDIO_HI / 'numbers' / f"{fn}.mp3"
            tasks_map[p_num] = phrase
            p_w = AUDIO_HI / 'words' / f"{fn}.mp3"
            tasks_map[p_w] = phrase
        elif any(time_term in phrase for time_term in ['बजे', 'सुबह', 'दोपहर', 'शाम', 'रात', 'समय', 'घंटा', 'मिनट']):
            p_time = AUDIO_HI / 'time' / f"{fn}.mp3"
            tasks_map[p_time] = phrase
            p_ph = AUDIO_HI / 'phrases' / f"{fn}.mp3"
            tasks_map[p_ph] = phrase
            p_w = AUDIO_HI / 'words' / f"{fn}.mp3"
            tasks_map[p_w] = phrase
        else:
            p_ph = AUDIO_HI / 'phrases' / f"{fn}.mp3"
            tasks_map[p_ph] = phrase
            p_w = AUDIO_HI / 'words' / f"{fn}.mp3"
            tasks_map[p_w] = phrase

    # Extended dictionary check from translationResolver.ts
    resolver_content = RESOLVER_FILE.read_text('utf-8')
    hi_resolver_words = re.findall(r"hi:\s*'([^']+)'", resolver_content)
    for hi_word in hi_resolver_words:
        fn = clean_filename(hi_word)
        if fn:
            p_w = AUDIO_HI / 'words' / f"{fn}.mp3"
            if p_w not in tasks_map:
                tasks_map[p_w] = hi_word

    print(f"Total unique audio target files to synthesize: {len(tasks_map)}")

    sem = asyncio.Semaphore(8)
    futures = [
        synthesize_item(sem, spoken, out_path)
        for out_path, spoken in tasks_map.items()
    ]

    results = await asyncio.gather(*futures)
    new_count = sum(1 for r in results if r)
    print(f"Successfully synthesized {new_count} new audio files (Total on disk: {len(tasks_map)})")

    # Generate public/audio/hi/index.json
    manifest = {
        "language": "hi",
        "updated": "2026-10-30T19:30:00.000Z",
        "totalFiles": 0,
        "files": {
            "alphabet": [],
            "examples": [],
            "phrases": [],
            "numbers": [],
            "words": [],
            "time": []
        }
    }

    total_files = 0
    for cat in ["alphabet", "examples", "phrases", "numbers", "words", "time"]:
        cat_dir = AUDIO_HI / cat
        if cat_dir.exists():
            files = sorted([f.name for f in cat_dir.glob("*.mp3") if f.stat().st_size > 500])
            manifest["files"][cat] = files
            total_files += len(files)
        else:
            manifest["files"][cat] = []

    manifest["totalFiles"] = total_files
    index_path = AUDIO_HI / "index.json"
    index_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), 'utf-8')
    print(f"Wrote index manifest to {index_path} with {total_files} verified files.")

if __name__ == '__main__':
    asyncio.run(main())

