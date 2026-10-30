#!/usr/bin/env python3
"""
Keeps NUMBER_TABLE (src/utils/translationResolver.ts) in sync with each language's own number
list, so the number word the quiz shows or accepts is exactly the word that has an audio file.

Why this exists: the dataset/audio build scripts generate the curriculum and the MP3s, but none of
them touched NUMBER_TABLE, so languages added later (ja, ko, bn, ur) fell back to English number words.

Source of truth: the `const numbers: PhraseItem[] = [ ... ];` block of each language data file.
Each row looks like { phrase: '十五', translation: '15 (Fifteen)', ... } and its MP3 is
public/audio/<lang>/numbers/<phrase with spaces as underscores>.mp3.

Usage:  python3 scripts/sync_number_table.py          # patch the file
        python3 scripts/sync_number_table.py --check  # exit 1 if it is out of date
"""
from __future__ import annotations
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TR_PATH = ROOT / 'src' / 'utils' / 'translationResolver.ts'

DATA_FILES = {
    'ja': ROOT / 'src/data/languages/ja/japaneseData.ts',
    'ko': ROOT / 'src/data/languages/ko/koreanData.ts',
    'bn': ROOT / 'src/data/languages/bn/bengaliData.ts',
    'ur': ROOT / 'src/data/languages/ur/urduData.ts',
}

ROW = re.compile(r"\{\s*phrase:\s*'([^']+)',\s*translation:\s*'(\d[\d,]*) \(")


def read_numbers(path: Path) -> dict[int, str]:
    text = path.read_text(encoding='utf-8')
    start = text.index('const numbers: PhraseItem[] = [')
    end = text.index('\n];', start)
    words: dict[int, str] = {}
    for phrase, digits in ROW.findall(text[start:end]):
        words.setdefault(int(digits.replace(',', '')), phrase)
    return words


def main() -> int:
    check_only = '--check' in sys.argv
    per_lang = {lang: read_numbers(p) for lang, p in DATA_FILES.items()}

    source = TR_PATH.read_text(encoding='utf-8')
    line_re = re.compile(r"^(\s+)(\d+): \{ (digit: \d+,.*?), allWords: \[(.*)\] \}(,?)$", re.M)
    changed = 0

    def patch(match: re.Match) -> str:
        nonlocal changed
        indent, number, head, words, comma = match.groups()
        digit = int(number)
        for lang, table in per_lang.items():
            word = table.get(digit)
            if not word:
                continue
            if re.search(rf"\b{lang}: '", head) is None:
                head += f", {lang}: '{word}'"
                changed += 1
            if f"'{word}'" not in words:
                words += f", '{word}'"
                changed += 1
        return f"{indent}{number}: {{ {head}, allWords: [{words}] }}{comma}"

    patched = line_re.sub(patch, source)

    if check_only:
        print('NUMBER_TABLE is up to date' if changed == 0 else f'{changed} number words missing')
        return 0 if changed == 0 else 1

    if patched != source:
        TR_PATH.write_text(patched, encoding='utf-8')
    print(f'Patched {changed} entries in {TR_PATH.relative_to(ROOT)}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
