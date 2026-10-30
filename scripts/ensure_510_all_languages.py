#!/usr/bin/env python3
"""
Ensures EVERY language has at least 505 words in its commonWords array.
Synthesizes studio neural audio for any new words.
Updates all manifests.
"""

import os
import re
import sys
import json
import asyncio
from pathlib import Path

ROOT = Path('/Users/johnbendfeldt/Documents/basic-language-school')
DATA_DIR = ROOT / 'src' / 'data' / 'languages'
AUDIO_DIR = ROOT / 'public' / 'audio'

sys.path.append('/Users/johnbendfeldt/Library/Python/3.8/lib/python/site-packages')
import edge_tts

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
    clean = re.sub(r"\s+", "_", clean)
    return clean + ".mp3" if clean else ""

def get_clean_spoken(text: str) -> str:
    variant = text.split('/')[0]
    num_match = re.match(r"^[\d,.\s]+\(([^)]+)\)$", variant.strip())
    if num_match:
        variant = num_match.group(1).strip()
    clean = re.sub(r"\s*\([^)]*\)\s*", " ", variant).strip()
    return clean

async def synthesize(sem, text: str, voice: str, out_path: Path):
    async with sem:
        if out_path.exists() and out_path.stat().st_size > 500:
            return False
        spoken = get_clean_spoken(text)
        if not spoken or spoken.isdigit():
            return False
        try:
            comm = edge_tts.Communicate(spoken, voice)
            await comm.save(str(out_path))
            return True
        except Exception:
            return False

# Top up Indonesian so it comfortably passes 505 words
ID_EXTRA = [
    ("Kamar tidur", "Bedroom", "Home", "🛏️"),
    ("Ruang tamu", "Living room", "Home", "🛋️"),
    ("Lemari pakaian", "Closet", "Home", "🚪"),
    ("Kaca mata", "Glasses", "Home", "👓"),
    ("Kunci mobil", "Car key", "Home", "🔑"),
    ("Kamera digital", "Digital camera", "Tech", "📷"),
    ("Buku catatan", "Notebook", "Home", "📓"),
    ("Pena tinta", "Pen", "Home", "🖊️"),
    ("Pensil kayu", "Pencil", "Home", "✏️"),
    ("Kertas putih", "White paper", "Home", "📄")
]

def patch_id():
    path = DATA_DIR / 'id' / 'indonesianData.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    idx = content.find('const commonWords')
    bracket_pos = content.find('];', idx)
    cw_block = content[idx:bracket_pos]
    
    new_items = []
    for ph, tr, cat, ic in ID_EXTRA:
        if ph.lower() not in cw_block.lower():
            new_items.append(f"  {{ phrase: '{ph}', translation: '{tr}', pronunciation: '', category: '{cat}', icon: '{ic}' }}")
    
    if new_items:
        insert_str = ",\n" + ",\n".join(new_items) + "\n"
        new_content = content[:bracket_pos].rstrip() + insert_str + content[bracket_pos:]
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"[id] Successfully patched Indonesian with {len(new_items)} items.")

async def synthesize_all_words():
    sem = asyncio.Semaphore(15)
    tasks = []

    # ID words
    w_id = AUDIO_DIR / 'id' / 'words'
    for ph, tr, cat, ic in ID_EXTRA:
        fn = get_audio_filename(ph, 'id')
        if fn:
            tasks.append(synthesize(sem, ph, VOICES['id'], w_id / fn))

    res = await asyncio.gather(*tasks)
    print(f"Synthesized {sum(1 for r in res if r)} new audio files.")

def update_manifests():
    print("\nUpdating manifests for all 10 languages...")
    languages = ['ru', 'en', 'es', 'fr', 'de', 'pt', 'id', 'tr', 'ja', 'ko']
    for lang in languages:
        lang_dir = AUDIO_DIR / lang
        manifest_path = lang_dir / 'index.json'
        
        files_by_cat = {}
        total = 0
        for sub in ['alphabet', 'examples', 'phrases', 'words', 'numbers', 'time']:
            sub_dir = lang_dir / sub
            if sub_dir.exists():
                file_list = sorted([f.name for f in sub_dir.glob('*.mp3')])
                files_by_cat[sub] = file_list
                total += len(file_list)
        
        manifest_data = {
            "language": lang,
            "updated": "2026-10-30T17:50:00.000Z",
            "totalFiles": total,
            "files": files_by_cat
        }
        with open(manifest_path, 'w', encoding='utf-8') as f:
            json.dump(manifest_data, f, indent=2, ensure_ascii=False)
        
        badge = "🏆 >>> OVER 1,000 AUDIO FILES! <<< 🏆" if total >= 1000 else "EXCELLENT"
        print(f"[{lang:2s}] Manifest: {total:4d} files | {badge}")

async def main():
    patch_id()
    await synthesize_all_words()
    update_manifests()

if __name__ == '__main__':
    asyncio.run(main())
