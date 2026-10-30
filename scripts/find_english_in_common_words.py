#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path('/Users/johnbendfeldt/Documents/basic-language-school')
DATA_DIR = ROOT / 'src' / 'data' / 'languages'

for lang in ['ja', 'ko']:
    p = next(DATA_DIR.glob(f'{lang}/*Data.ts'))
    txt = p.read_text(encoding='utf-8')
    m = re.search(r'const\s+commonWords[^{[]*\[([\s\S]*?)\n\];', txt)
    if not m:
        m = re.search(r'const\s+commonWords[^{[]*\[([\s\S]*?)\];', txt)
    
    entries = re.findall(r'\{\s*phrase:\s*([\'"].*?[\'"])\s*,\s*translation:\s*([\'"].*?[\'"])', m.group(1))
    print(f"\n--- {lang}: {len(entries)} items ---")
    english_phrase_count = 0
    for ph, tr in entries:
        ph_val = ph[1:-1]
        # check if ph_val is ascii / english
        if all(ord(c) < 128 for c in ph_val) and any(c.isalpha() for c in ph_val):
            english_phrase_count += 1
            print(f"  English phrase: {ph_val[:50]} (tr: {tr[:50]})")
    print(f"Total with English in phrase: {english_phrase_count}")
