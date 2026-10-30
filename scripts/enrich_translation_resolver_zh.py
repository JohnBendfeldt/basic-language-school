#!/usr/bin/env python3
"""
Enriches src/utils/translationResolver.ts with Mandarin Chinese (zh) translations
for NUMBER_TABLE and EXTENDED_DICTIONARY.
"""

import re
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent.parent
sys.path.append(str(ROOT))
from scripts.build_chinese_dataset import ZH_DICTIONARY

RESOLVER_PATH = ROOT / 'src' / 'utils' / 'translationResolver.ts'

ZH_NUMBERS = {
    0: ("零", ["零", "0"]),
    1: ("一", ["一", "1"]),
    2: ("二", ["二", "两", "2"]),
    3: ("三", ["三", "3"]),
    4: ("四", ["四", "4"]),
    5: ("五", ["五", "5"]),
    6: ("六", ["六", "6"]),
    7: ("七", ["七", "7"]),
    8: ("八", ["八", "8"]),
    9: ("九", ["九", "9"]),
    10: ("十", ["十", "10"]),
    11: ("十一", ["十一", "11"]),
    12: ("十二", ["十二", "12"]),
    13: ("十三", ["十三", "13"]),
    14: ("十四", ["十四", "14"]),
    15: ("十五", ["十五", "15"]),
    16: ("十六", ["十六", "16"]),
    17: ("十七", ["十七", "17"]),
    18: ("十八", ["十八", "18"]),
    19: ("十九", ["十九", "19"]),
    20: ("二十", ["二十", "20"]),
    30: ("三十", ["三十", "30"]),
    40: ("四十", ["四十", "40"]),
    50: ("五十", ["五十", "50"]),
    60: ("六十", ["六十", "60"]),
    70: ("七十", ["七十", "70"]),
    80: ("八十", ["八十", "80"]),
    90: ("九十", ["九十", "90"]),
    100: ("一百", ["一百", "100"]),
    1000: ("一千", ["一千", "1000"])
}

def enrich():
    with open(RESOLVER_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update NumberMapping interface
    if 'zh?: string;' not in content:
        content = content.replace("ko?: string;\n", "ko?: string;\n  zh?: string;\n")

    # 2. Update NUMBER_TABLE
    for digit, (zh_word, extra_words) in ZH_NUMBERS.items():
        # Match lines like: 0: { digit: 0, ... allWords: [...] },
        pat = rf"({digit}:\s*\{{[^}}]*?allWords:\s*\[)([^\]]*?)(\]\s*\}})"
        m = re.search(pat, content)
        if m:
            prefix = m.group(1)
            words_str = m.group(2)
            suffix = m.group(3)

            # Insert zh: '...' before allWords if not present
            if f"zh: '{zh_word}'" not in prefix:
                prefix = prefix.replace("allWords:", f"zh: '{zh_word}', allWords:")

            # Add extra words
            current_words = [w.strip().strip("'\"") for w in words_str.split(',') if w.strip()]
            for ew in extra_words:
                if ew not in current_words:
                    current_words.append(ew)

            new_words_str = ", ".join(f"'{w}'" for w in current_words)
            content = content[:m.start()] + f"{prefix}{new_words_str}{suffix}" + content[m.end():]

    # 3. Update EXTENDED_DICTIONARY entries
    # Match lines like: 'man': { en: 'Man', ..., ja: '...' },
    def repl_entry(match):
        key = match.group(1)
        inner = match.group(2)
        if 'zh:' in inner:
            return match.group(0)

        # Lookup in ZH_DICTIONARY
        zh_trans = None
        # Try direct key
        if key in ZH_DICTIONARY:
            zh_trans = ZH_DICTIONARY[key][0]
        elif key.capitalize() in ZH_DICTIONARY:
            zh_trans = ZH_DICTIONARY[key.capitalize()][0]
        elif key.title() in ZH_DICTIONARY:
            zh_trans = ZH_DICTIONARY[key.title()][0]
        else:
            # Try to match from English value inside entry
            en_m = re.search(r"en:\s*'([^']+)'", inner)
            if en_m:
                en_val = en_m.group(1)
                if en_val in ZH_DICTIONARY:
                    zh_trans = ZH_DICTIONARY[en_val][0]
                elif en_val.capitalize() in ZH_DICTIONARY:
                    zh_trans = ZH_DICTIONARY[en_val.capitalize()][0]

        if zh_trans:
            # Append zh: '...' to inner
            new_inner = inner.rstrip()
            if new_inner.endswith(','):
                new_inner = new_inner[:-1].rstrip()
            new_inner += f", zh: '{zh_trans}' "
            return f"'{key}': {{{new_inner}}},"
        return match.group(0)

    content = re.sub(r"'([^']+)':\s*\{([^}]+)\},", repl_entry, content)

    with open(RESOLVER_PATH, 'w', encoding='utf-8') as f:
        f.write(content)

    print("Successfully enriched src/utils/translationResolver.ts with Chinese!")

if __name__ == '__main__':
    enrich()
