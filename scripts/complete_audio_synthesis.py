#!/usr/bin/env python3
"""
Complete Audio Synthesis and Matrix Verification for Basic Language School.
Finds all missing audio files across all 10 languages and generates them with edge_tts.
"""

import os
import re
import sys
import json
import asyncio
import unicodedata
from pathlib import Path

ROOT = Path('/Users/johnbendfeldt/Documents/basic-language-school')
AUDIO_DIR = ROOT / 'public' / 'audio'
DATA_DIR = ROOT / 'src' / 'data' / 'languages'

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
    clean = unicodedata.normalize("NFC", clean)
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
        out_path.parent.mkdir(parents=True, exist_ok=True)
        spoken = get_clean_spoken(text)
        if not spoken or spoken.isdigit():
            return False
        try:
            comm = edge_tts.Communicate(spoken, voice)
            await comm.save(str(out_path))
            return True
        except Exception as e:
            print(f"Error {voice} -> {out_path.name}: {e}")
            return False

# Specifically target the items identified in test runs
SPECIFIC_ITEMS = [
    # French phrases
    ("fr", "phrases", "J'ai besoin d'un médecin immédiatement"),
    ("fr", "phrases", "C'est à cinq minutes à pied"),
    ("fr", "phrases", "J'ai une réservation au nom de John"),
    ("fr", "phrases", "Je voudrais changer de l'argent"),
    ("fr", "phrases", "Nous sommes d'accord avec cette proposition"),

    # English words
    ("en", "words", "Ambulance"),
    ("en", "words", "Firefighter"),
    ("en", "words", "Beach"),
    ("en", "words", "Mountain"),
    ("en", "words", "River"),
    ("en", "words", "Lake"),
    ("en", "words", "Bedroom"),
    ("en", "words", "Closet"),
    ("en", "words", "Glasses"),
    ("en", "words", "Notebook"),
    ("en", "words", "Pen"),
    ("en", "words", "Pencil"),

    # Spanish words
    ("es", "words", "Medicamento"),
    ("es", "words", "Ambulancia"),
    ("es", "words", "Bombero"),
    ("es", "words", "Playa"),
    ("es", "words", "Montaña"),
    ("es", "words", "Río"),
    ("es", "words", "Lago"),
    ("es", "words", "Dormitorio"),
    ("es", "words", "Armario"),
    ("es", "words", "Gafas"),
    ("es", "words", "Cuaderno"),
    ("es", "words", "Bolígrafo"),
    ("es", "words", "Lápiz"),

    # French words
    ("fr", "words", "Ambulance"),
    ("fr", "words", "Pompier"),
    ("fr", "words", "Plage"),
    ("fr", "words", "Montagne"),
    ("fr", "words", "Rivière"),
    ("fr", "words", "Lac"),
    ("fr", "words", "Chambre"),
    ("fr", "words", "Armoire"),
    ("fr", "words", "Lunettes"),
    ("fr", "words", "Cahier"),
    ("fr", "words", "Stylo"),
    ("fr", "words", "Crayon"),

    # Russian words
    ("ru", "words", "Пожарный"),
    ("ru", "words", "Отель"),
    ("ru", "words", "Пляж"),
    ("ru", "words", "Гора"),
    ("ru", "words", "Река"),
    ("ru", "words", "Озеро"),
    ("ru", "words", "Скорая помощь"),
    ("ru", "words", "Спальня"),
    ("ru", "words", "Шкаф"),
    ("ru", "words", "Очки"),
    ("ru", "words", "Тетрадь"),
    ("ru", "words", "Ручка"),
    ("ru", "words", "Карандаш"),

    # Portuguese words
    ("pt", "words", "Ambulância"),
    ("pt", "words", "Bombeiro"),
    ("pt", "words", "Praia"),
    ("pt", "words", "Montanha"),
    ("pt", "words", "Rio"),
    ("pt", "words", "Lago"),
    ("pt", "words", "Quarto"),
    ("pt", "words", "Armário"),
    ("pt", "words", "Óculos"),
    ("pt", "words", "Caderno"),
    ("pt", "words", "Caneta"),
    ("pt", "words", "Lápis"),

    # German words
    ("de", "words", "Krankenwagen"),
    ("de", "words", "Feuerwehrmann"),
    ("de", "words", "Strand"),
    ("de", "words", "Berg"),
    ("de", "words", "Fluss"),
    ("de", "words", "See"),
    ("de", "words", "Schlafzimmer"),
    ("de", "words", "Kleiderschrank"),
    ("de", "words", "Brille"),
    ("de", "words", "Notizbuch"),
    ("de", "words", "Kugelschreiber"),
    ("de", "words", "Bleistift"),

    # Turkish words & phrases
    ("tr", "words", "Ambulans"),
    ("tr", "words", "İtfaiyeci"),
    ("tr", "words", "Plaj"),
    ("tr", "words", "Dağ"),
    ("tr", "words", "Nehir"),
    ("tr", "words", "Göl"),
    ("tr", "words", "Yatak odası"),
    ("tr", "phrases", "Yatak odası"),
    ("tr", "words", "Gardırop"),
    ("tr", "words", "Gözlük"),
    ("tr", "words", "Defter"),
    ("tr", "words", "Tükenmez kalem"),
    ("tr", "phrases", "Tükenmez kalem"),
    ("tr", "words", "Kurşun kalem"),
    ("tr", "phrases", "Kurşun kalem"),
    ("tr", "phrases", "It is a five-minute walk"),
    ("tr", "phrases", "It's five minutes on foot"),
    ("tr", "phrases", "Do you have free Wi-Fi?"),
    ("tr", "phrases", "Delighted to meet you"),
    ("tr", "phrases", "We agree with the proposal"),

    # Indonesian words
    ("id", "words", "Ambulans"),
    ("id", "words", "Pemadam kebakaran"),
    ("id", "words", "Pantai"),
    ("id", "words", "Gunung"),
    ("id", "words", "Sungai"),
    ("id", "words", "Danau"),

    # Korean words
    ("ko", "words", "구급차"),
    ("ko", "words", "소방관"),
    ("ko", "words", "해변"),
    ("ko", "words", "산"),
    ("ko", "words", "강"),
    ("ko", "words", "호수"),
    ("ko", "words", "침실"),
    ("ko", "words", "옷장"),
    ("ko", "words", "안경"),
    ("ko", "words", "공책"),
    ("ko", "words", "펜"),
    ("ko", "words", "연필"),

    # Japanese words
    ("ja", "words", "救急車"),
    ("ja", "words", "消防士"),
    ("ja", "words", "浜辺"),
    ("ja", "words", "山"),
    ("ja", "words", "川"),
    ("ja", "words", "湖"),
    ("ja", "words", "寝室"),
    ("ja", "words", "クローゼット"),
    ("ja", "words", "眼鏡"),
    ("ja", "words", "ノート"),
    ("ja", "words", "ペン"),
    ("ja", "words", "鉛筆"),
]

def scan_all_language_data_for_missing():
    missing_tasks = []
    # Loop over all 10 languages and inspect all items in their ts files
    langs = ['ru', 'en', 'es', 'fr', 'de', 'pt', 'id', 'tr', 'ja', 'ko']
    for lang in langs:
        file_path = next(DATA_DIR.glob(f'{lang}/*Data.ts'))
        txt = file_path.read_text(encoding='utf-8')

        for cat, sub in [
            ('basicPhrases', 'phrases'),
            ('commonWords', 'words'),
            ('numbers', 'numbers'),
            ('time', 'time')
        ]:
            m = re.search(rf'const\s+{cat}[^{{[]*\[([\s\S]*?)\n\];', txt)
            if not m:
                m = re.search(rf'const\s+{cat}[^{{[]*\[([\s\S]*?)\];', txt)
            if m:
                # Find all phrase: '...' or russian: '...'
                items = re.findall(r"(?:phrase|russian):\s*['\"]([^'\"]+)['\"]", m.group(1))
                for item in items:
                    fn = get_audio_filename(item, lang)
                    if fn:
                        p = AUDIO_DIR / lang / sub / fn
                        # Also check if it exists in 'words' or 'phrases'
                        p_words = AUDIO_DIR / lang / 'words' / fn
                        p_phrases = AUDIO_DIR / lang / 'phrases' / fn
                        if not p.exists() and not p_words.exists() and not p_phrases.exists():
                            missing_tasks.append((lang, sub, item))

    return missing_tasks

async def main():
    sem = asyncio.Semaphore(15)
    tasks = []

    # 1. Specific items
    for lang, sub, text in SPECIFIC_ITEMS:
        fn = get_audio_filename(text, lang)
        if fn:
            out_p = AUDIO_DIR / lang / sub / fn
            tasks.append(synthesize(sem, text, VOICES[lang], out_p))
            # Also in 'words' if sub is phrases and single word
            if sub == 'phrases' and ' ' not in text:
                out_w = AUDIO_DIR / lang / 'words' / fn
                tasks.append(synthesize(sem, text, VOICES[lang], out_w))

    # 2. Scanned missing items
    scanned = scan_all_language_data_for_missing()
    print(f"Scanned {len(scanned)} missing items across curriculum files.")
    for lang, sub, text in scanned:
        fn = get_audio_filename(text, lang)
        if fn:
            out_p = AUDIO_DIR / lang / sub / fn
            tasks.append(synthesize(sem, text, VOICES[lang], out_p))

    res = await asyncio.gather(*tasks)
    print(f"Successfully synthesized {sum(1 for r in res if r)} new studio neural audio files.")

    # 3. Update manifests
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
            "updated": "2026-10-30T18:15:00.000Z",
            "totalFiles": total,
            "files": files_by_cat
        }
        with open(manifest_path, 'w', encoding='utf-8') as f:
            json.dump(manifest_data, f, indent=2, ensure_ascii=False)
        
        badge = "🏆 >>> OVER 1,000 AUDIO FILES! <<< 🏆" if total >= 1000 else "EXCELLENT"
        print(f"[{lang:2s}] Manifest: {total:4d} files | {badge}")

if __name__ == '__main__':
    asyncio.run(main())
