#!/usr/bin/env python3
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / 'src' / 'data' / 'languages'

for p in DATA_DIR.glob('*/*Data.ts'):
    txt = p.read_text(encoding='utf-8')
    # Replace any double comma with single comma
    # Be careful to preserve formatting
    cleaned = re.sub(r',(\s*\n\s*),', r'\1,', txt)
    cleaned = re.sub(r',\s*,', r',', cleaned)
    if cleaned != txt:
        p.write_text(cleaned, encoding='utf-8')
        print(f"Fixed double commas in {p.name}")
