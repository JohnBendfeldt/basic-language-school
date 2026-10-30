#!/usr/bin/env python3
"""
Comprehensive Studio Neural Audio Generator & Full Audit.
Ensures zero browser speech synthesis fallbacks across words and sentences in every language.
"""

import os
import re
import sys
import json
import asyncio
import unicodedata
from pathlib import Path

sys.path.append('/Users/johnbendfeldt/Library/Python/3.8/lib/python/site-packages')
import edge_tts

PROJECT_ROOT = Path('/Users/johnbendfeldt/Documents/basic-language-school')
PUBLIC_AUDIO = PROJECT_ROOT / 'public' / 'audio'

VOICES = {
    "ru": "ru-RU-SvetlanaNeural",
    "en": "en-US-JennyNeural",
    "es": "es-MX-JorgeNeural",
    "fr": "fr-FR-HenriNeural",
    "pt": "pt-BR-AntonioNeural",
    "de": "de-DE-ConradNeural",
    "id": "id-ID-ArdiNeural",
    "tr": "tr-TR-AhmetNeural",
    "ja": "ja-JP-KeitaNeural",
    "ko": "ko-KR-InJoonNeural"
}

def get_audio_filename(text: str, lang_id: str = "") -> str:
    if not text:
        return ""
    if lang_id == "tr":
        text = text.replace("İ", "i").replace("I", "ı").replace("\u0307", "")
    num_match = re.match(r"^[\d,.\s]+\(([^)]+)\)$", text.strip())
    effective = num_match.group(1).strip() if num_match else text.strip()
    
    clean = effective.split('/')[0]
    clean = re.sub(r"\s*\([^)]*\)\s*", "", clean)
    clean = re.sub(r"[?.,!¡¿'’\"«»:？。、！]", "", clean).strip().lower()
    clean = unicodedata.normalize("NFC", clean)
    clean = re.sub(r"\s+", "_", clean)
    return clean + ".mp3" if clean else ""

def get_clean_spoken(text: str) -> str:
    # First variant before slash, remove parentheticals but keep punctuation for natural prosody
    variant = text.split('/')[0]
    num_match = re.match(r"^[\d,.\s]+\(([^)]+)\)$", variant.strip())
    if num_match:
        variant = num_match.group(1).strip()
    clean = re.sub(r"\s*\([^)]*\)\s*", " ", variant).strip()
    return clean

async def synthesize(sem, text: str, voice: str, out_path: Path):
    async with sem:
        if out_path.exists():
            return "skipped"
        out_path.parent.mkdir(parents=True, exist_ok=True)
        temp_path = out_path.with_suffix(".tmp.mp3")
        for attempt in range(4):
            try:
                comm = edge_tts.Communicate(text, voice, volume="+20%")
                await comm.save(str(temp_path))
                temp_path.replace(out_path)
                return "success"
            except Exception as e:
                if temp_path.exists():
                    temp_path.unlink()
                await asyncio.sleep(0.5 * (attempt + 1))
        print(f"❌ Failed to synthesize '{text}' -> {out_path.name}")
        return "error"

async def main():
    data_dir = PROJECT_ROOT / 'src' / 'data' / 'languages'
    
    # Collect items to synthesize per language
    # category -> [(spoken_text, filename)]
    items_to_gen = {lang: {'words': [], 'phrases': [], 'examples': [], 'numbers': [], 'time': []} for lang in VOICES}

    # 1. Alphabet words and meanings
    name_map = {
        'ru': 'ru/russianData.ts',
        'en': 'en/englishData.ts',
        'es': 'es/spanishData.ts',
        'fr': 'fr/frenchData.ts',
        'pt': 'pt/portugueseData.ts',
        'de': 'de/germanData.ts',
        'id': 'id/indonesianData.ts',
        'tr': 'tr/turkishData.ts',
        'ja': 'ja/japaneseData.ts',
        'ko': 'ko/koreanData.ts',
    }
    
    for lang, rel_path in name_map.items():
        file_path = data_dir / rel_path
        if not file_path.exists():
            continue
        content = file_path.read_text(encoding='utf-8')
        
        # Example words
        for m in re.findall(r"(?:russianWord|word):\s*['\"]([^'\"]+)['\"]", content):
            spoken = get_clean_spoken(m)
            fname = get_audio_filename(m, lang)
            if spoken and fname:
                items_to_gen[lang]['examples'].append((spoken, fname))
                
        # Example meanings (always English)
        for m in re.findall(r"meaning:\s*['\"]([^'\"]+)['\"]", content):
            spoken = get_clean_spoken(m)
            fname = get_audio_filename(m, 'en')
            if spoken and fname:
                items_to_gen['en']['words'].append((spoken, fname))

        # Phrases
        for m in re.findall(r"(?:phrase|russian):\s*['\"]([^'\"]+)['\"]", content):
            spoken = get_clean_spoken(m)
            fname = get_audio_filename(m, lang)
            if spoken and fname:
                cat = 'phrases' if ' ' in spoken else 'words'
                items_to_gen[lang][cat].append((spoken, fname))

    # 2. Grammar example sentences
    grammar_file = data_dir / 'grammarData.ts'
    if grammar_file.exists():
        content = grammar_file.read_text(encoding='utf-8')
        # Extract blocks like GERMAN_GRAMMAR, RUSSIAN_GRAMMAR etc.
        blocks = re.split(r"export const\s+([A-Z_]+)_GRAMMAR", content)
        lang_by_block = {
            'GERMAN': 'de',
            'RUSSIAN': 'ru',
            'SPANISH': 'es',
            'FRENCH': 'fr',
            'PORTUGUESE': 'pt',
            'INDONESIAN': 'id',
            'TURKISH': 'tr',
            'JAPANESE': 'ja',
            'KOREAN': 'ko'
        }
        for i in range(1, len(blocks), 2):
            block_name = blocks[i]
            block_content = blocks[i+1]
            lang = lang_by_block.get(block_name)
            if not lang:
                continue
            
            # target sentences
            for m in re.finditer(r"exampleSentence:\s*\{[^}]*target:\s*['\"]([^'\"]+)['\"][^}]*translation:\s*['\"]([^'\"]+)['\"]", block_content):
                target_sent = m.group(1)
                trans_sent = m.group(2)
                
                target_spoken = get_clean_spoken(target_sent)
                target_fname = get_audio_filename(target_sent, lang)
                if target_spoken and target_fname:
                    items_to_gen[lang]['phrases'].append((target_spoken, target_fname))
                    
                trans_spoken = get_clean_spoken(trans_sent)
                trans_fname = get_audio_filename(trans_sent, 'en')
                if trans_spoken and trans_fname:
                    items_to_gen['en']['phrases'].append((trans_spoken, trans_fname))

    # 3. Translation resolver dictionary entries (EXTENDED_DICTIONARY ONLY)
    resolver_file = PROJECT_ROOT / 'src' / 'utils' / 'translationResolver.ts'
    if resolver_file.exists():
        content = resolver_file.read_text(encoding='utf-8')
        dict_match = re.search(r"export const EXTENDED_DICTIONARY[\s\S]*?=\s*\{([\s\S]*?)\n\};", content)
        if dict_match:
            dict_block = dict_match.group(1)
            for lang in VOICES:
                pattern = rf"{lang}:\s*'((?:\\'|[^'])+)'|{lang}:\s*\"((?:\\\"|[^\"])+)\""
                for m in re.finditer(pattern, dict_block):
                    raw = m.group(1) if m.group(1) is not None else m.group(2)
                    unescaped = raw.replace("\\'", "'").replace('\\"', '"')
                    spoken = get_clean_spoken(unescaped)
                    fname = get_audio_filename(unescaped, lang)
                    if spoken and fname:
                        cat = 'phrases' if ' ' in spoken else 'words'
                        items_to_gen[lang][cat].append((spoken, fname))

    # Process all synthesis tasks
    sem = asyncio.Semaphore(6)
    total_new = 0
    total_skipped = 0

    print("🚀 Starting Comprehensive Studio Neural Audio Generation...")
    for lang, cat_dict in items_to_gen.items():
        voice = VOICES[lang]
        lang_dir = PUBLIC_AUDIO / lang
        tasks = []
        seen_fnames = set()
        
        for cat, list_items in cat_dict.items():
            for spoken, fname in list_items:
                if fname in seen_fnames or not fname:
                    continue
                seen_fnames.add(fname)
                out_path = lang_dir / cat / fname
                tasks.append(synthesize(sem, spoken, voice, out_path))
                
        results = await asyncio.gather(*tasks)
        new_cnt = results.count("success")
        skip_cnt = results.count("skipped")
        err_cnt = results.count("error")
        total_new += new_cnt
        total_skipped += skip_cnt
        print(f"  [{lang.upper()}] Generated: {new_cnt} new, Skipped: {skip_cnt} existing, Errors: {err_cnt}")

    print(f"\n🎉 Finished! Total new audio files generated: {total_new}, Existing preserved: {total_skipped}")

if __name__ == '__main__':
    asyncio.run(main())
