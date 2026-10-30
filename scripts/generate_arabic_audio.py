#!/usr/bin/env python3
"""
Generate complete studio neural audio files for Arabic (ar)
Voice: ar-SA-ZariyahNeural (Microsoft Edge Neural TTS)
Target directory: public/audio/ar/{alphabet,examples,phrases,numbers,words,time}/
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
AUDIO_AR = ROOT / 'public' / 'audio' / 'ar'
DATA_FILE = ROOT / 'src' / 'data' / 'languages' / 'ar' / 'arabicData.ts'
RESOLVER_FILE = ROOT / 'src' / 'utils' / 'translationResolver.ts'

VOICE = "ar-SA-ZariyahNeural"

def clean_filename(text: str) -> str:
    if not text:
        return ""
    normalized = text.strip()
    num_match = re.match(r"^[\d,.\s]+\(([^)]+)\)$", normalized)
    effective = num_match.group(1).strip() if num_match else normalized
    clean = effective.split('/')[0]
    clean = re.sub(r"\s*\([^)]*\)\s*", "", clean)
    clean = re.sub(r"[?.,!¡¿'’\"«»:؟،。、！]", "", clean).strip()
    clean = unicodedata.normalize("NFC", clean)
    clean = re.sub(r"\s+", "_", clean)
    return clean

def clean_spoken(text: str) -> str:
    variant = text.split('/')[0]
    num_match = re.match(r"^[\d,.\s]+\(([^)]+)\)$", variant.strip())
    if num_match:
        variant = num_match.group(1).strip()
    clean = re.sub(r"\s*\([^)]*\)\s*", " ", variant)
    clean = re.sub(r"[?.,!¡¿'’\"«»:؟،。、！]", "", clean).strip()
    return clean

# Official names of Arabic alphabet letters for studio pronunciation
ALPHABET_SPOKEN = {
    'أ': 'ألف',
    'ب': 'باء',
    'ت': 'تاء',
    'ث': 'ثاء',
    'ج': 'جيم',
    'ح': 'حاء',
    'خ': 'خاء',
    'د': 'دال',
    'ذ': 'ذال',
    'ر': 'راء',
    'ز': 'زاي',
    'س': 'سين',
    'ش': 'شين',
    'ص': 'صاد',
    'ض': 'ضاد',
    'ط': 'طاء',
    'ظ': 'ظاء',
    'ع': 'عين',
    'غ': 'غين',
    'ف': 'فاء',
    'ق': 'قاف',
    'ك': 'كاف',
    'ل': 'لام',
    'م': 'ميم',
    'ن': 'نون',
    'ه': 'هاء',
    'و': 'واو',
    'ي': 'ياء'
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
    print(f"=== Synthesizing Arabic Audio with {VOICE} ===")
    
    # 1. Parse arabicData.ts
    content = DATA_FILE.read_text('utf-8')

    # Alphabet items
    alphabet_raw = re.findall(
        r"\{\s*letter:\s*'([^']+)',\s*pronunciation:\s*'([^']+)',\s*example:\s*'([^']+)',\s*word:\s*'([^']+)',\s*meaning:\s*'([^']+)'",
        content
    )
    print(f"Loaded {len(alphabet_raw)} alphabet items from arabicData.ts")

    # Phrases, numbers, time, words
    phrases_raw = re.findall(
        r"\{\s*phrase:\s*'([^']+)',\s*translation:\s*'([^']+)'",
        content
    )
    print(f"Loaded {len(phrases_raw)} phrase/number/time items from arabicData.ts")

    # Build queue of (output_path -> spoken_text)
    tasks_map = {}

    # Alphabet
    for letter, pron, example, word, meaning in alphabet_raw:
        spoken_letter = ALPHABET_SPOKEN.get(letter, letter)
        fn_letter = clean_filename(letter)
        if fn_letter:
            p_letter = AUDIO_AR / 'alphabet' / f"{fn_letter}.mp3"
            tasks_map[p_letter] = spoken_letter

        fn_word = clean_filename(word)
        if fn_word:
            p_ex = AUDIO_AR / 'examples' / f"{fn_word}.mp3"
            tasks_map[p_ex] = word
            p_w = AUDIO_AR / 'words' / f"{fn_word}.mp3"
            tasks_map[p_w] = word

    # Phrases, numbers, time, words
    for phrase, transl in phrases_raw:
        fn = clean_filename(phrase)
        if not fn:
            continue
        # Is it a number?
        if any(term in transl.lower() for term in ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'hundred', 'thousand']):
            p_num = AUDIO_AR / 'numbers' / f"{fn}.mp3"
            tasks_map[p_num] = phrase
            p_w = AUDIO_AR / 'words' / f"{fn}.mp3"
            tasks_map[p_w] = phrase
        elif any(time_term in phrase for time_term in ['الساعة', 'صباحاً', 'مساءً', 'ظهراً', 'منتصف الليل', 'الآن', 'دقيقة', 'والنصف', 'والربع']):
            p_time = AUDIO_AR / 'time' / f"{fn}.mp3"
            tasks_map[p_time] = phrase
            p_ph = AUDIO_AR / 'phrases' / f"{fn}.mp3"
            tasks_map[p_ph] = phrase
            p_w = AUDIO_AR / 'words' / f"{fn}.mp3"
            tasks_map[p_w] = phrase
        else:
            p_ph = AUDIO_AR / 'phrases' / f"{fn}.mp3"
            tasks_map[p_ph] = phrase
            p_w = AUDIO_AR / 'words' / f"{fn}.mp3"
            tasks_map[p_w] = phrase

    # Extended dictionary check from translationResolver.ts
    resolver_content = RESOLVER_FILE.read_text('utf-8')
    ar_resolver_words = re.findall(r"ar:\s*'([^']+)'", resolver_content)
    for ar_word in ar_resolver_words:
        fn = clean_filename(ar_word)
        if fn:
            p_w = AUDIO_AR / 'words' / f"{fn}.mp3"
            if p_w not in tasks_map:
                tasks_map[p_w] = ar_word

    print(f"Total unique audio target files to synthesize: {len(tasks_map)}")

    # Concurrency limit
    sem = asyncio.Semaphore(10)
    futures = [
        synthesize_item(sem, spoken, out_path)
        for out_path, spoken in tasks_map.items()
    ]

    results = await asyncio.gather(*futures)
    new_count = sum(1 for r in results if r)
    print(f"Successfully synthesized {new_count} new audio files (Total on disk: {len(tasks_map)})")

    # Generate public/audio/ar/index.json
    manifest = {
        "language": "ar",
        "updated": "2026-10-30T21:00:00.000Z",
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
        cat_dir = AUDIO_AR / cat
        if cat_dir.exists():
            files = sorted([f.name for f in cat_dir.glob("*.mp3") if f.stat().st_size > 500])
            manifest["files"][cat] = files
            total_files += len(files)
        else:
            manifest["files"][cat] = []

    manifest["totalFiles"] = total_files
    index_path = AUDIO_AR / "index.json"
    index_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), 'utf-8')
    print(f"Wrote index manifest to {index_path} with {total_files} verified files.")

if __name__ == '__main__':
    asyncio.run(main())
