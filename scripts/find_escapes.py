#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path('/Users/johnbendfeldt/Documents/basic-language-school')
DATA_DIR = ROOT / 'src' / 'data' / 'languages'

for lang in ['ja', 'ko']:
    p = next(DATA_DIR.glob(f'{lang}/*Data.ts'))
    lines = p.read_text(encoding='utf-8').splitlines()
    print(f"\n--- {lang} ({len(lines)} lines) ---")
    for i, line in enumerate(lines):
        if "\\" in line:
            print(f"L{i+1}: {line}")
