#!/usr/bin/env python3
"""
Master Multi-Language Audio Generator for Basic Language School (basiclanguage.school)
Uses Microsoft Edge Neural TTS to generate studio-grade native MP3 audio files:
  - Russian (ru-RU-SvetlanaNeural) -> public/audio/ru/
  - English (en-US-JennyNeural)    -> public/audio/en/
  - Spanish (es-ES-AlvaroNeural)   -> public/audio/es/
  - French  (fr-FR-DeniseNeural)   -> public/audio/fr/

Usage:
  python3 scripts/generate-all-audio.py --lang es
  python3 scripts/generate-all-audio.py --lang fr
  python3 scripts/generate-all-audio.py --lang en
  python3 scripts/generate-all-audio.py --all
  python3 scripts/generate-all-audio.py --force
"""

import os
import re
import sys
import json
import asyncio
import unicodedata
from datetime import datetime
from pathlib import Path

try:
    import edge_tts
except ImportError:
    print("Error: edge-tts is not installed. Run: pip3 install edge-tts")
    sys.exit(1)

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
PUBLIC_AUDIO = PROJECT_ROOT / "public" / "audio"

CONFIGS = {
    "ru": {
        "voice": "ru-RU-SvetlanaNeural",
        "data_file": PROJECT_ROOT / "src" / "data" / "languages" / "ru" / "russianData.ts",
        "output_dir": PUBLIC_AUDIO / "ru",
        "manifest": PUBLIC_AUDIO / "ru" / "index.json"
    },
    "en": {
        "voice": "en-US-JennyNeural",
        "data_file": PROJECT_ROOT / "src" / "data" / "languages" / "en" / "englishData.ts",
        "output_dir": PUBLIC_AUDIO / "en",
        "manifest": PUBLIC_AUDIO / "en" / "index.json"
    },
    "es": {
        "voice": "es-MX-JorgeNeural",
        "data_file": PROJECT_ROOT / "src" / "data" / "languages" / "es" / "spanishData.ts",
        "output_dir": PUBLIC_AUDIO / "es",
        "manifest": PUBLIC_AUDIO / "es" / "index.json"
    },
    "fr": {
        "voice": "fr-FR-HenriNeural",
        "data_file": PROJECT_ROOT / "src" / "data" / "languages" / "fr" / "frenchData.ts",
        "output_dir": PUBLIC_AUDIO / "fr",
        "manifest": PUBLIC_AUDIO / "fr" / "index.json"
    }
}


def normalize_text(text: str) -> str:
    return unicodedata.normalize("NFC", text.strip())


def get_audio_filename(text: str) -> str:
    # Remove punctuation, notes in parentheses, slashes
    clean = text.split('/')[0]
    clean = re.sub(r"\s*\([^)]*\)\s*", "", clean)
    clean = re.sub(r"[?.,!¡¿'’\"«»:]", "", clean).strip().lower()
    clean = unicodedata.normalize("NFC", clean)
    return re.sub(r"\s+", "_", clean) + ".mp3"


def extract_ts_strings(field_name: str, block: str):
    pattern = rf"{field_name}:\s*'((?:\\'|[^'])+)'|{field_name}:\s*\"((?:\\\"|[^\"])+)\""
    results = []
    for m in re.finditer(pattern, block):
        raw = m.group(1) if m.group(1) is not None else m.group(2)
        unescaped = raw.replace("\\'", "'").replace('\\"', '"')
        results.append(normalize_text(unescaped))
    return results


def parse_extended_dictionary(lang_id: str):
    resolver_file = PROJECT_ROOT / "src" / "utils" / "translationResolver.ts"
    if not resolver_file.exists():
        return []
    content = resolver_file.read_text(encoding="utf-8")
    dict_match = re.search(r"export const EXTENDED_DICTIONARY[\s\S]*?=\s*\{([\s\S]*?)\n\};", content)
    if not dict_match:
        return []
    block = dict_match.group(1)
    entries = extract_ts_strings(lang_id, block)
    seen = set()
    items = []
    for raw_val in entries:
        # Take primary variant before '/' and strip parentheticals for spoken audio
        primary = raw_val.split('/')[0]
        spoken = re.sub(r"\s*\([^)]*\)\s*", " ", primary).strip()
        if not spoken:
            continue
        fname = get_audio_filename(raw_val)
        if fname not in seen and fname != ".mp3":
            seen.add(fname)
            items.append({"text": raw_val, "spoken": spoken, "filename": fname})
    return items


def parse_russian(data_file: Path):
    content = data_file.read_text(encoding="utf-8")
    categories = { "alphabet": [], "examples": [], "phrases": [], "numbers": [], "words": [], "time": [] }

    # Alphabet
    alpha_match = re.search(r"const alphabet:\s*AlphabetItem\[\]\s*=\s*\[([\s\S]*?)\];", content)
    if alpha_match:
        letters = [normalize_text(m) for m in re.findall(r"letter:\s*['\"]([^'\"]+)['\"]", alpha_match.group(1))]
        examples = [normalize_text(m) for m in re.findall(r"russianWord:\s*['\"]([^'\"]+)['\"]", alpha_match.group(1))]
        for l in letters:
            lower_l = l.lower()
            spoken = "твёрдый знак" if lower_l == "ъ" else "мягкий знак" if lower_l == "ь" else lower_l
            categories["alphabet"].append({"text": l, "spoken": spoken, "filename": f"{lower_l}.mp3"})
        for ex in examples:
            categories["examples"].append({"text": ex, "spoken": ex, "filename": get_audio_filename(ex)})

    # Phrases
    p_match = re.search(r"const basicPhrases:\s*PhraseItem\[\]\s*=\s*\[([\s\S]*?)\];", content)
    if p_match:
        for p in re.findall(r"russian:\s*['\"]([^'\"]+)['\"]", p_match.group(1)):
            categories["phrases"].append({"text": p, "spoken": p, "filename": get_audio_filename(p)})

    # Numbers
    num_match = re.search(r"const numbers:\s*PhraseItem\[\]\s*=\s*\[([\s\S]*?)\];", content)
    if num_match:
        for n in re.findall(r"russian:\s*['\"]([^'\"]+)['\"]", num_match.group(1)):
            categories["numbers"].append({"text": n, "spoken": n, "filename": get_audio_filename(n)})

    # Words
    w_match = re.search(r"const commonWords:\s*PhraseItem\[\]\s*=\s*\[([\s\S]*?)\];", content)
    if w_match:
        for w in re.findall(r"russian:\s*['\"]([^'\"]+)['\"]", w_match.group(1)):
            categories["words"].append({"text": w, "spoken": w, "filename": get_audio_filename(w)})

    # Time
    t_match = re.search(r"const time:\s*PhraseItem\[\]\s*=\s*\[([\s\S]*?)\];", content)
    if t_match:
        for t in re.findall(r"russian:\s*['\"]([^'\"]+)['\"]", t_match.group(1)):
            categories["time"].append({"text": t, "spoken": t, "filename": get_audio_filename(t)})

    existing_word_files = {item["filename"] for item in categories["words"]}
    for dict_item in parse_extended_dictionary("ru"):
        if dict_item["filename"] not in existing_word_files:
            existing_word_files.add(dict_item["filename"])
            categories["words"].append(dict_item)

    return categories


def parse_standard_lang(data_file: Path, lang_id: str):
    content = data_file.read_text(encoding="utf-8")
    categories = { "alphabet": [], "examples": [], "phrases": [], "numbers": [], "words": [], "time": [] }

    # Alphabet
    alpha_match = re.search(r"const alphabet:\s*AlphabetItem\[\]\s*=\s*\[([\s\S]*?)\];", content)
    if alpha_match:
        letters = extract_ts_strings("letter", alpha_match.group(1))
        words = extract_ts_strings("word", alpha_match.group(1))
        for l in letters:
            categories["alphabet"].append({"text": l, "spoken": l, "filename": f"{l.lower()}.mp3"})
        for w in words:
            categories["examples"].append({"text": w, "spoken": w, "filename": get_audio_filename(w)})

    # Phrases
    p_match = re.search(r"const basicPhrases:\s*PhraseItem\[\]\s*=\s*\[([\s\S]*?)\];", content)
    if p_match:
        for p in extract_ts_strings("phrase", p_match.group(1)):
            spoken = p.split('/')[0].strip()
            categories["phrases"].append({"text": p, "spoken": spoken, "filename": get_audio_filename(p)})

    # Numbers
    num_match = re.search(r"const numbers:\s*PhraseItem\[\]\s*=\s*\[([\s\S]*?)\];", content)
    if num_match:
        for n in extract_ts_strings("phrase", num_match.group(1)):
            spoken = n.split('/')[0].strip()
            categories["numbers"].append({"text": n, "spoken": spoken, "filename": get_audio_filename(n)})

    # Words
    w_match = re.search(r"const commonWords:\s*PhraseItem\[\]\s*=\s*\[([\s\S]*?)\];", content)
    if w_match:
        for w in extract_ts_strings("phrase", w_match.group(1)):
            spoken = w.split('/')[0].strip()
            categories["words"].append({"text": w, "spoken": spoken, "filename": get_audio_filename(w)})

    # Time
    t_match = re.search(r"const time:\s*PhraseItem\[\]\s*=\s*\[([\s\S]*?)\];", content)
    if t_match:
        for t in extract_ts_strings("phrase", t_match.group(1)):
            spoken = t.split('/')[0].strip()
            categories["time"].append({"text": t, "spoken": spoken, "filename": get_audio_filename(t)})

    # Also include EXTENDED_DICTIONARY words/phrases so translated card meanings have native neural audio
    existing_word_files = {item["filename"] for item in categories["words"]}
    for dict_item in parse_extended_dictionary(lang_id):
        if dict_item["filename"] not in existing_word_files:
            existing_word_files.add(dict_item["filename"])
            categories["words"].append(dict_item)

    return categories


async def synthesize_file(sem, spoken_text: str, voice: str, out_path: Path, force: bool = False):
    async with sem:
        if out_path.exists() and not force:
            return "skipped"

        temp_path = out_path.with_suffix(".tmp.mp3")
        try:
            communicate = edge_tts.Communicate(spoken_text, voice, volume="+20%")
            await communicate.save(str(temp_path))
            temp_path.replace(out_path)
            return "success"
        except Exception as e:
            if temp_path.exists():
                temp_path.unlink()
            print(f"    ❌ Error generating '{spoken_text}' -> {out_path.name}: {e}")
            return "error"


async def process_language(lang_id: str, force: bool = False):
    config = CONFIGS[lang_id]
    voice = config["voice"]
    data_file = config["data_file"]
    out_base = config["output_dir"]
    manifest_file = config["manifest"]

    if not data_file.exists():
        print(f"❌ Missing curriculum data file: {data_file}")
        return

    print("=" * 60)
    print(f"🎙️  BASIC LANGUAGE AUDIO GENERATOR: {lang_id.upper()}")
    print(f"🗣️  Voice: {voice}")
    print(f"📁 Target Dir: {out_base.relative_to(PROJECT_ROOT)}/")
    print("=" * 60)

    categories = parse_russian(data_file) if lang_id == "ru" else parse_standard_lang(data_file, lang_id)
    sem = asyncio.Semaphore(12)

    success = 0
    skipped = 0
    errors = 0

    manifest = {
        "language": lang_id,
        "voice": voice,
        "generated": datetime.utcnow().isoformat() + "Z",
        "files": {}
    }

    for cat_name, items in categories.items():
        if not items:
            continue
        cat_dir = out_base / cat_name
        cat_dir.mkdir(parents=True, exist_ok=True)
        manifest["files"][cat_name] = []
        tasks = []

        print(f"\n📂 [{cat_name.upper()}] ({len(items)} items)")
        for item in items:
            out_path = cat_dir / item["filename"]
            tasks.append((item, out_path, synthesize_file(sem, item["spoken"], voice, out_path, force)))

        for item, out_path, task in tasks:
            res = await task
            if res == "success":
                success += 1
                print(f"  ✅ {out_path.name:<25} '{item['text']}'")
            elif res == "skipped":
                skipped += 1
            else:
                errors += 1

            manifest["files"][cat_name].append({
                "filename": item["filename"],
                "path": f"/audio/{lang_id}/{cat_name}/{item['filename']}",
                "text": item["text"]
            })

    manifest_file.parent.mkdir(parents=True, exist_ok=True)
    manifest_file.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\n✨ [{lang_id.upper()}] Done! New: {success}, Skipped: {skipped}, Errors: {errors}")


async def main():
    force = "--force" in sys.argv
    langs = []
    if "--lang" in sys.argv:
        idx = sys.argv.index("--lang")
        if idx + 1 < len(sys.argv):
            langs = [sys.argv[idx + 1]]
    elif "--all" in sys.argv:
        langs = ["es", "fr", "en", "ru"]
    else:
        langs = ["es", "fr"]

    for l in langs:
        if l in CONFIGS:
            await process_language(l, force)
        else:
            print(f"Unknown language: {l}")


if __name__ == "__main__":
    asyncio.run(main())
