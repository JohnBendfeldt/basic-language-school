#!/usr/bin/env python3
"""
Generate complete studio neural audio files for Mandarin Chinese (zh)
Voice: zh-CN-XiaoxiaoNeural (Microsoft Edge Neural TTS)
Target directory: public/audio/zh/{alphabet,examples,phrases,numbers,words,time}/
"""

import os
import re
import sys
import json
import asyncio
import unicodedata
from pathlib import Path

# Add local user python library path where edge_tts is installed
sys.path.append('/Users/johnbendfeldt/Library/Python/3.8/lib/python/site-packages')
import edge_tts

ROOT = Path('/Users/johnbendfeldt/Documents/basic-language-school')
AUDIO_ZH = ROOT / 'public' / 'audio' / 'zh'
DATA_FILE = ROOT / 'src' / 'data' / 'languages' / 'zh' / 'chineseData.ts'
RESOLVER_FILE = ROOT / 'src' / 'utils' / 'translationResolver.ts'

VOICE = "zh-CN-XiaoxiaoNeural"

PINYIN_SPOKEN = {
    'b': '玻', 'p': '坡', 'm': '摸', 'f': '佛',
    'd': '得', 't': '特', 'n': '讷', 'l': '勒',
    'g': '哥', 'k': '科', 'h': '喝',
    'j': '鸡', 'q': '七', 'x': '西',
    'zh': '知', 'ch': '吃', 'sh': '诗', 'r': '日',
    'z': '资', 'c': '疵', 's': '思',
    'y': '医', 'w': '乌',
    'a': '啊', 'o': '喔', 'e': '鹅', 'i': '衣', 'u': '乌', 'ü': '迂'
}

def clean_filename(text: str) -> str:
    if not text:
        return ""
    normalized = text.strip().lower()
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
    print(f"=== Synthesizing Mandarin Chinese Audio with {VOICE} ===")
    
    # 1. Parse chineseData.ts
    content = DATA_FILE.read_text('utf-8')

    # Alphabet items
    alphabet_raw = re.findall(
        r"\{\s*letter:\s*'([^']+)',\s*pronunciation:\s*'([^']+)',\s*example:\s*'([^']+)',\s*word:\s*'([^']+)',\s*meaning:\s*'([^']+)'",
        content
    )
    print(f"Loaded {len(alphabet_raw)} alphabet items from chineseData.ts")

    # Phrases
    phrases_raw = re.findall(
        r"\{\s*phrase:\s*'([^']+)',\s*translation:\s*'([^']+)'",
        content
    )
    print(f"Loaded {len(phrases_raw)} phrase/number/time items from chineseData.ts")

    # Common words
    words_raw = re.findall(
        r"\{\s*word:\s*'([^']+)',\s*translation:\s*'([^']+)'",
        content
    )
    print(f"Loaded {len(words_raw)} common words from chineseData.ts")

    # Build queue of (spoken_text, relative_output_path)
    # Using a dictionary to deduplicate by output path
    tasks_map = {}

    # Alphabet
    for letter, pron, example, word, meaning in alphabet_raw:
        spoken_letter = PINYIN_SPOKEN.get(letter.lower(), letter)
        fn_letter = clean_filename(letter)
        if fn_letter:
            p_letter = AUDIO_ZH / 'alphabet' / f"{fn_letter}.mp3"
            tasks_map[p_letter] = spoken_letter

        fn_word = clean_filename(word)
        if fn_word:
            p_ex = AUDIO_ZH / 'examples' / f"{fn_word}.mp3"
            tasks_map[p_ex] = word
            p_w = AUDIO_ZH / 'words' / f"{fn_word}.mp3"
            tasks_map[p_w] = word

    # Phrases, numbers, time
    for phrase, transl in phrases_raw:
        fn = clean_filename(phrase)
        if not fn:
            continue
        # Is it a number?
        if any(term in transl.lower() for term in ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'hundred', 'thousand']):
            p_num = AUDIO_ZH / 'numbers' / f"{fn}.mp3"
            tasks_map[p_num] = phrase
            p_w = AUDIO_ZH / 'words' / f"{fn}.mp3"
            tasks_map[p_w] = phrase
        elif any(time_term in phrase for time_term in ['点', '上午', '下午', '早上', '中午', '晚上', '半', '现在几点']):
            p_time = AUDIO_ZH / 'time' / f"{fn}.mp3"
            tasks_map[p_time] = phrase
            p_ph = AUDIO_ZH / 'phrases' / f"{fn}.mp3"
            tasks_map[p_ph] = phrase
        else:
            p_ph = AUDIO_ZH / 'phrases' / f"{fn}.mp3"
            tasks_map[p_ph] = phrase
            p_w = AUDIO_ZH / 'words' / f"{fn}.mp3"
            tasks_map[p_w] = phrase

    # Common words
    for word, transl in words_raw:
        fn = clean_filename(word)
        if fn:
            p_w = AUDIO_ZH / 'words' / f"{fn}.mp3"
            tasks_map[p_w] = word

    # Extended dictionary check from translationResolver.ts
    resolver_content = RESOLVER_FILE.read_text('utf-8')
    zh_resolver_words = re.findall(r"zh:\s*'([^']+)'", resolver_content)
    for zh_word in zh_resolver_words:
        fn = clean_filename(zh_word)
        if fn and not (AUDIO_ZH / 'words' / f"{fn}.mp3").exists():
            p_w = AUDIO_ZH / 'words' / f"{fn}.mp3"
            if p_w not in tasks_map:
                tasks_map[p_w] = zh_word

    print(f"Total unique audio target files to synthesize: {len(tasks_map)}")

    sem = asyncio.Semaphore(8)
    futures = [
        synthesize_item(sem, spoken, out_path)
        for out_path, spoken in tasks_map.items()
    ]

    results = await asyncio.gather(*futures)
    new_count = sum(1 for r in results if r)
    print(f"Successfully synthesized {new_count} new audio files (Total on disk: {len(tasks_map)})")

    # Generate public/audio/zh/index.json
    manifest = {
        "language": "zh",
        "updated": "2026-10-30T19:00:00.000Z",
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
        cat_dir = AUDIO_ZH / cat
        if cat_dir.exists():
            files = sorted([f.name for f in cat_dir.glob("*.mp3") if f.stat().st_size > 500])
            manifest["files"][cat] = files
            total_files += len(files)
        else:
            manifest["files"][cat] = []

    manifest["totalFiles"] = total_files
    index_path = AUDIO_ZH / "index.json"
    index_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), 'utf-8')
    print(f"Wrote index manifest to {index_path} with {total_files} verified files.")

if __name__ == '__main__':
    asyncio.run(main())
