#!/usr/bin/env python3
"""
Trim basicPhrases in es, fr, and ru back to the canonical 40 items.
"""

from pathlib import Path
import re

DATA_DIR = Path('/Users/johnbendfeldt/Documents/basic-language-school/src/data/languages')

# 1. Spanish
es_path = DATA_DIR / 'es' / 'spanishData.ts'
es_txt = es_path.read_text(encoding='utf-8')
# Find "Es demasiado caro" item and trim basicPhrases to end there
m_es = re.search(r"(\{\s*phrase:\s*'Es demasiado caro'[\s\S]*?\})(\s*,[\s\S]*?)(\n\s*//\s*Spanish numbers|\nconst numbers)", es_txt)
if m_es:
    es_txt = es_txt[:m_es.end(1)] + "\n];\n\n// Spanish numbers" + es_txt[m_es.end(3):]
    es_path.write_text(es_txt, encoding='utf-8')
    print("Cleaned basicPhrases in spanishData.ts")

# 2. French
fr_path = DATA_DIR / 'fr' / 'frenchData.ts'
fr_txt = fr_path.read_text(encoding='utf-8')
m_fr = re.search(r"(\{\s*phrase:\s*'C\'est trop cher'[\s\S]*?\})(\s*,[\s\S]*?)(\n\s*//\s*French numbers|\nconst numbers)", fr_txt)
if m_fr:
    fr_txt = fr_txt[:m_fr.end(1)] + "\n];\n\n// French numbers" + fr_txt[m_fr.end(3):]
    fr_path.write_text(fr_txt, encoding='utf-8')
    print("Cleaned basicPhrases in frenchData.ts")

# 3. Russian
ru_path = DATA_DIR / 'ru' / 'russianData.ts'
ru_txt = ru_path.read_text(encoding='utf-8')
m_ru = re.search(r"(\{\s*russian:\s*'Это слишком дорого'[\s\S]*?\})(\s*,[\s\S]*?)(\n\s*//\s*Numbers in Russian|\nconst numbers)", ru_txt)
if m_ru:
    ru_txt = ru_txt[:m_ru.end(1)] + "\n];\n\n// Numbers in Russian" + ru_txt[m_ru.end(3):]
    ru_path.write_text(ru_txt, encoding='utf-8')
    print("Cleaned basicPhrases in russianData.ts")
