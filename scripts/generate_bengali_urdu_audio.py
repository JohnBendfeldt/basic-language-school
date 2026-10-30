#!/usr/bin/env python3
"""
Generate complete studio neural audio files for Bengali (bn) and Urdu (ur).
Voices:
- Bengali: bn-BD-NabanitaNeural
- Urdu: ur-PK-UzmaNeural

Covers:
- alphabet
- examples
- phrases
- numbers
- words
- time
- grammar (gender examples, verb infinitive, conjugated forms, example sentences, flashcards)
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
PUBLIC_AUDIO = ROOT / 'public' / 'audio'

VOICES = {
    'bn': 'bn-BD-NabanitaNeural',
    'ur': 'ur-PK-UzmaNeural',
}

BN_ALPHABET_SPOKEN = {
    'অ': 'অ',
    'আ': 'আ',
    'ই': 'হ্রস্ব ই',
    'ঈ': 'দীর্ঘ ঈ',
    'উ': 'হ্রস্ব উ',
    'ঊ': 'দীর্ঘ ঊ',
    'ঋ': 'রি',
    'এ': 'এ',
    'ঐ': 'ঐ',
    'ও': 'ও',
    'ঔ': 'ঔ',
    'ক': 'ক',
    'খ': 'খ',
    'গ': 'গ',
    'ঘ': 'ঘ',
    'ঙ': 'ঙ',
    'চ': 'চ',
    'ছ': 'ছ',
    'জ': 'জ',
    'ঝ': 'ঝ',
    'ঞ': 'ঞ',
    'ট': 'ট',
    'ঠ': 'ঠ',
    'ড': 'ড',
    'ঢ': 'ঢ',
    'ণ': 'ণ',
    'ত': 'ত',
    'থ': 'থ',
    'দ': 'দ',
    'ধ': 'ধ',
    'ন': 'ন',
    'প': 'প',
    'ফ': 'ফ',
    'ব': 'ব',
    'ভ': 'ভ',
    'ম': 'ম',
    'য': 'য',
    'র': 'র',
    'ল': 'ল',
    'শ': 'শ',
    'ষ': 'ষ',
    'স': 'স',
    'হ': 'হ',
    'ড়': 'ড়',
    'ঢ়': 'ঢ়',
    'য়': 'য়',
    'ৎ': 'খণ্ড ত',
    'ং': 'অনুস্বার',
    'ঃ': 'বিসর্গ',
    'ঁ': 'চন্দ্রবিন্দু',
}

UR_ALPHABET_SPOKEN = {
    'آ': 'الف مد آ',
    'ا': 'الف',
    'ب': 'بے',
    'پ': 'پے',
    'ت': 'تے',
    'ٹ': 'ٹے',
    'ث': 'سے',
    'ج': 'جیم',
    'چ': 'چے',
    'ح': 'حے',
    'خ': 'خے',
    'د': 'دال',
    'ڈ': 'ڈال',
    'ذ': 'ذال',
    'ر': 'رے',
    'ڑ': 'ڑے',
    'ز': 'زے',
    'ژ': 'ژے',
    'س': 'سین',
    'ش': 'شین',
    'ص': 'صاد',
    'ض': 'ضاد',
    'ط': 'طوئے',
    'ظ': 'ظوئے',
    'ع': 'عین',
    'غ': 'غین',
    'ف': 'فے',
    'ق': 'قاف',
    'ک': 'کاف',
    'گ': 'گاف',
    'ل': 'لام',
    'م': 'میم',
    'ن': 'نون',
    'ں': 'نون غنہ',
    'و': 'واؤ',
    'ہ': 'چھوٹی ہے',
    'ھ': 'دو چشمی ہے',
    'ء': 'ہمزہ',
    'ی': 'چھوٹی یے',
    'ے': 'بڑی یے',
}

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

async def synthesize_item(sem, text: str, voice: str, out_path: Path):
    async with sem:
        if out_path.exists() and out_path.stat().st_size > 500:
            return False
        out_path.parent.mkdir(parents=True, exist_ok=True)
        spoken = clean_spoken(text)
        if not spoken:
            return False
        for attempt in range(4):
            try:
                comm = edge_tts.Communicate(spoken, voice)
                await comm.save(str(out_path))
                if out_path.exists() and out_path.stat().st_size > 500:
                    return True
            except Exception as e:
                if attempt == 3:
                    print(f"Error synthesizing '{spoken}' -> {out_path}: {e}")
                await asyncio.sleep(0.8)
        return False

def parse_items_from_ts(file_path: Path, array_name: str):
    content = file_path.read_text(encoding='utf-8')
    pattern = rf"const\s+{array_name}\s*:\s*(?:AlphabetItem|PhraseItem)\[\]\s*=\s*\[([\s\S]*?)\n\];"
    m = re.search(pattern, content)
    if not m:
        return []
    block = m.group(1)
    items = []
    for item_m in re.finditer(r"\{([\s\S]*?)\}", block):
        raw = item_m.group(1)
        d = {}
        for kv in re.finditer(r"(\w+)\s*:\s*(?:'([^']*)'|\"([^\"]*)\")", raw):
            key = kv.group(1)
            val = kv.group(2) if kv.group(2) is not None else kv.group(3)
            d[key] = val
        if d:
            items.append(d)
    return items

async def main():
    sem = asyncio.Semaphore(8)
    tasks_map = {} # path -> (spoken, voice)

    def queue_target(p: Path, spoken: str, lang: str):
        if p not in tasks_map:
            tasks_map[p] = (spoken, VOICES[lang])

    # 1. BENGALI
    bn_data_file = ROOT / 'src' / 'data' / 'languages' / 'bn' / 'bengaliData.ts'
    bn_alphabet = parse_items_from_ts(bn_data_file, 'alphabet')
    bn_phrases = parse_items_from_ts(bn_data_file, 'basicPhrases')
    bn_numbers = parse_items_from_ts(bn_data_file, 'numbers')
    bn_words = parse_items_from_ts(bn_data_file, 'commonWords')
    bn_time = parse_items_from_ts(bn_data_file, 'time')

    print(f"Bengali items: {len(bn_alphabet)} letters, {len(bn_phrases)} phrases, {len(bn_numbers)} numbers, {len(bn_words)} words, {len(bn_time)} time")

    for item in bn_alphabet:
        letter = item.get('letter')
        if letter:
            fn = clean_filename(letter)
            spoken = BN_ALPHABET_SPOKEN.get(letter, letter)
            queue_target(PUBLIC_AUDIO / 'bn' / 'alphabet' / f"{fn}.mp3", spoken, 'bn')
        word = item.get('word')
        if word:
            fn = clean_filename(word)
            queue_target(PUBLIC_AUDIO / 'bn' / 'examples' / f"{fn}.mp3", word, 'bn')
            queue_target(PUBLIC_AUDIO / 'bn' / 'words' / f"{fn}.mp3", word, 'bn')

    for item in bn_phrases:
        p = item.get('phrase')
        if p:
            fn = clean_filename(p)
            queue_target(PUBLIC_AUDIO / 'bn' / 'phrases' / f"{fn}.mp3", p, 'bn')
            queue_target(PUBLIC_AUDIO / 'bn' / 'words' / f"{fn}.mp3", p, 'bn')

    for item in bn_numbers:
        p = item.get('phrase')
        if p:
            fn = clean_filename(p)
            queue_target(PUBLIC_AUDIO / 'bn' / 'numbers' / f"{fn}.mp3", p, 'bn')
            queue_target(PUBLIC_AUDIO / 'bn' / 'words' / f"{fn}.mp3", p, 'bn')

    for item in bn_words:
        p = item.get('phrase')
        if p:
            fn = clean_filename(p)
            queue_target(PUBLIC_AUDIO / 'bn' / 'words' / f"{fn}.mp3", p, 'bn')
            queue_target(PUBLIC_AUDIO / 'bn' / 'phrases' / f"{fn}.mp3", p, 'bn')

    for item in bn_time:
        p = item.get('phrase')
        if p:
            fn = clean_filename(p)
            queue_target(PUBLIC_AUDIO / 'bn' / 'time' / f"{fn}.mp3", p, 'bn')
            queue_target(PUBLIC_AUDIO / 'bn' / 'phrases' / f"{fn}.mp3", p, 'bn')

    # Bengali Grammar
    bn_gender_examples = ['বইটা', 'কলমটা', 'ফুলটি', 'বাড়িটা', 'গাড়িটা', 'বইগুলো', 'ফুলগুলো', 'ছাত্ররা', 'বন্ধুরা']
    for ex in bn_gender_examples:
        fn = clean_filename(ex)
        queue_target(PUBLIC_AUDIO / 'bn' / 'grammar' / f"{fn}.mp3", ex, 'bn')
        queue_target(PUBLIC_AUDIO / 'bn' / 'words' / f"{fn}.mp3", ex, 'bn')

    bn_verbs = [
        ('হওয়া', [
            ('আমি', 'হই'), ('আমি', 'আছি'),
            ('তুমি', 'হও'), ('তুমি', 'আছ'),
            ('আপনি', 'হন'), ('আপনি', 'আছেন'),
            ('সে', 'হয়'), ('সে', 'আছে'),
            ('তিনি', 'হন'), ('তিনি', 'আছেন'),
            ('আমরা', 'হই'), ('আমরা', 'আছি'),
        ], 'আমরা একসাথে ভাষা শিখছি।'),
        ('করা', [
            ('আমি', 'করি'),
            ('তুমি', 'করো'),
            ('আপনি', 'করেন'),
            ('সে', 'করে'),
            ('তিনি', 'করেন'),
            ('আমরা', 'করি'),
        ], 'সে তার কাজ করে।'),
        ('যাওয়া', [
            ('আমি', 'যাই'),
            ('তুমি', 'যাও'),
            ('আপনি', 'যান'),
            ('সে', 'যায়'),
            ('তিনি', 'যান'),
            ('আমরা', 'যাই'),
        ], 'আমরা ঢাকা যাচ্ছি।'),
    ]

    for v_inf, forms, ex_sent in bn_verbs:
        fn = clean_filename(v_inf)
        queue_target(PUBLIC_AUDIO / 'bn' / 'grammar' / f"{fn}.mp3", v_inf, 'bn')
        for pronoun, form in forms:
            fn_comb = clean_filename(f"{pronoun} {form}")
            queue_target(PUBLIC_AUDIO / 'bn' / 'grammar' / f"{fn_comb}.mp3", f"{pronoun} {form}", 'bn')
            fn_form = clean_filename(form)
            queue_target(PUBLIC_AUDIO / 'bn' / 'grammar' / f"{fn_form}.mp3", form, 'bn')
        fn_sent = clean_filename(ex_sent)
        queue_target(PUBLIC_AUDIO / 'bn' / 'phrases' / f"{fn_sent}.mp3", ex_sent, 'bn')
        queue_target(PUBLIC_AUDIO / 'bn' / 'grammar' / f"{fn_sent}.mp3", ex_sent, 'bn')

    bn_cards = ['বইটা', 'টেবিলে', 'আমি ভালো আছি', 'আপনি কেমন আছেন']
    for card_text in bn_cards:
        fn = clean_filename(card_text)
        queue_target(PUBLIC_AUDIO / 'bn' / 'grammar' / f"{fn}.mp3", card_text, 'bn')
        queue_target(PUBLIC_AUDIO / 'bn' / 'phrases' / f"{fn}.mp3", card_text, 'bn')
        queue_target(PUBLIC_AUDIO / 'bn' / 'words' / f"{fn}.mp3", card_text, 'bn')

    # 2. URDU
    ur_data_file = ROOT / 'src' / 'data' / 'languages' / 'ur' / 'urduData.ts'
    ur_alphabet = parse_items_from_ts(ur_data_file, 'alphabet')
    ur_phrases = parse_items_from_ts(ur_data_file, 'basicPhrases')
    ur_numbers = parse_items_from_ts(ur_data_file, 'numbers')
    ur_words = parse_items_from_ts(ur_data_file, 'commonWords')
    ur_time = parse_items_from_ts(ur_data_file, 'time')

    print(f"Urdu items: {len(ur_alphabet)} letters, {len(ur_phrases)} phrases, {len(ur_numbers)} numbers, {len(ur_words)} words, {len(ur_time)} time")

    for item in ur_alphabet:
        letter = item.get('letter')
        if letter:
            fn = clean_filename(letter)
            spoken = UR_ALPHABET_SPOKEN.get(letter, letter)
            queue_target(PUBLIC_AUDIO / 'ur' / 'alphabet' / f"{fn}.mp3", spoken, 'ur')
        word = item.get('word')
        if word:
            fn = clean_filename(word)
            queue_target(PUBLIC_AUDIO / 'ur' / 'examples' / f"{fn}.mp3", word, 'ur')
            queue_target(PUBLIC_AUDIO / 'ur' / 'words' / f"{fn}.mp3", word, 'ur')

    for item in ur_phrases:
        p = item.get('phrase')
        if p:
            fn = clean_filename(p)
            queue_target(PUBLIC_AUDIO / 'ur' / 'phrases' / f"{fn}.mp3", p, 'ur')
            queue_target(PUBLIC_AUDIO / 'ur' / 'words' / f"{fn}.mp3", p, 'ur')

    for item in ur_numbers:
        p = item.get('phrase')
        if p:
            fn = clean_filename(p)
            queue_target(PUBLIC_AUDIO / 'ur' / 'numbers' / f"{fn}.mp3", p, 'ur')
            queue_target(PUBLIC_AUDIO / 'ur' / 'words' / f"{fn}.mp3", p, 'ur')

    for item in ur_words:
        p = item.get('phrase')
        if p:
            fn = clean_filename(p)
            queue_target(PUBLIC_AUDIO / 'ur' / 'words' / f"{fn}.mp3", p, 'ur')
            queue_target(PUBLIC_AUDIO / 'ur' / 'phrases' / f"{fn}.mp3", p, 'ur')

    for item in ur_time:
        p = item.get('phrase')
        if p:
            fn = clean_filename(p)
            queue_target(PUBLIC_AUDIO / 'ur' / 'time' / f"{fn}.mp3", p, 'ur')
            queue_target(PUBLIC_AUDIO / 'ur' / 'phrases' / f"{fn}.mp3", p, 'ur')

    ur_gender_examples = ['لڑکا', 'کمرہ', 'دروازہ', 'سیب', 'شہر', 'لड़की', 'کتاب', 'گاڑی', 'کھڑکی', 'رات']
    for ex in ur_gender_examples:
        fn = clean_filename(ex)
        queue_target(PUBLIC_AUDIO / 'ur' / 'grammar' / f"{fn}.mp3", ex, 'ur')
        queue_target(PUBLIC_AUDIO / 'ur' / 'words' / f"{fn}.mp3", ex, 'ur')

    ur_verbs = [
        ('ہونا', [
            ('میں', 'ہوں'), ('میں', 'تھا'), ('میں', 'تھی'),
            ('تو', 'ہے'), ('تو', 'تھا'),
            ('تم', 'ہو'), ('تم', 'تھے'),
            ('آپ', 'ہیں'), ('آپ', 'تھے'),
            ('وہ', 'ہے'), ('وہ', 'تھا'),
            ('ہم', 'ہیں'), ('ہم', 'تھے'),
        ], 'ہم ساتھ میں زبانیں سیکھ رہے ہیں۔'),
        ('کرنا', [
            ('میں', 'کرتا ہوں'), ('میں', 'کرتی ہوں'),
            ('تم', 'کرتے ہو'), ('آپ', 'کرتے ہیں'),
            ('وہ', 'کرتا ہے'), ('وہ', 'کرتی ہے'),
            ('ہم', 'کرتے ہیں'), ('ہم', 'کرتی ہیں'),
        ], 'وہ اپنا کام کرتی ہے۔'),
        ('جانا', [
            ('میں', 'جاتا ہوں'), ('میں', 'جاتی ہوں'),
            ('تم', 'جاتے ہو'), ('آپ', 'جاتے ہیں'),
            ('وہ', 'جاتا ہے'), ('وہ', 'جاتی ہے'),
            ('ہم', 'جاتے ہیں'), ('ہم', 'جاتی ہیں'),
        ], 'ہم لاہور جا رہے ہیں۔'),
    ]

    for v_inf, forms, ex_sent in ur_verbs:
        fn = clean_filename(v_inf)
        queue_target(PUBLIC_AUDIO / 'ur' / 'grammar' / f"{fn}.mp3", v_inf, 'ur')
        for pronoun, form in forms:
            fn_comb = clean_filename(f"{pronoun} {form}")
            queue_target(PUBLIC_AUDIO / 'ur' / 'grammar' / f"{fn_comb}.mp3", f"{pronoun} {form}", 'ur')
            fn_form = clean_filename(form)
            queue_target(PUBLIC_AUDIO / 'ur' / 'grammar' / f"{fn_form}.mp3", form, 'ur')
        fn_sent = clean_filename(ex_sent)
        queue_target(PUBLIC_AUDIO / 'ur' / 'phrases' / f"{fn_sent}.mp3", ex_sent, 'ur')
        queue_target(PUBLIC_AUDIO / 'ur' / 'grammar' / f"{fn_sent}.mp3", ex_sent, 'ur')

    ur_cards = ['اچھی لڑکی', 'میز پر', 'میں ٹھیک ہوں', 'آپ کیسے ہیں']
    for card_text in ur_cards:
        fn = clean_filename(card_text)
        queue_target(PUBLIC_AUDIO / 'ur' / 'grammar' / f"{fn}.mp3", card_text, 'ur')
        queue_target(PUBLIC_AUDIO / 'ur' / 'phrases' / f"{fn}.mp3", card_text, 'ur')
        queue_target(PUBLIC_AUDIO / 'ur' / 'words' / f"{fn}.mp3", card_text, 'ur')

    print(f"Total unique audio target files to synthesize: {len(tasks_map)}")
    
    async_tasks = [
        synthesize_item(sem, spoken, voice, out_p)
        for out_p, (spoken, voice) in tasks_map.items()
    ]
    results = await asyncio.gather(*async_tasks)
    created = sum(1 for r in results if r)
    print(f"Synthesis finished! Newly created: {created} files, Total checked: {len(results)}")

if __name__ == '__main__':
    asyncio.run(main())
