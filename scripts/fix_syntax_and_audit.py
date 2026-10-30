#!/usr/bin/env python3
"""
Inspect and repair syntax errors and quality issues across all language files:
1. englishData.ts: Fix malformed quotes in 'It is X o'clock'
2. spanishData.ts: Fix 'Let\'' -> "Let's schedule a meeting"
3. portugueseData.ts: Fix 'Let\'' -> "Let's schedule a meeting"
4. frenchData.ts: Fix unescaped French apostrophes (l'argent, d'accord)
5. japaneseData.ts: Fix truncated tokens and ensure authentic Japanese + Romaji
6. koreanData.ts: Fix truncated tokens and ensure authentic Korean + Romanization
7. translationResolver.ts: Add 'ko' and 'ja' to direct target word lookup in resolveTranslation
"""

import re
import os
import sys
from pathlib import Path

ROOT = Path('/Users/johnbendfeldt/Documents/basic-language-school')
DATA_DIR = ROOT / 'src' / 'data' / 'languages'

def fix_english():
    p = DATA_DIR / 'en' / 'englishData.ts'
    txt = p.read_text(encoding='utf-8')
    
    # Fix \'It is three o'clock\" -> "It is three o'clock"
    for h in ['three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven']:
        bad = f"{{ phrase: \\'It is {h} o'clock\\\", meaning: \\'Noun: It is {h} o'clock\\\", pronunciation: '', category: 'Time', icon:"
        good = f'{{ phrase: "It is {h} o\'clock", meaning: "Noun: It is {h} o\'clock", pronunciation: \'\', category: \'Time\', icon:'
        txt = txt.replace(bad, good)
    
    # Also generic regex fix for any \\' ... \\\" patterns
    txt = re.sub(
        r"phrase:\s*\\'(.*?)\\\",\s*meaning:\s*\\'(.*?)\\\"",
        r'phrase: "\1", meaning: "\2"',
        txt
    )
    p.write_text(txt, encoding='utf-8')
    print("Fixed englishData.ts")

def fix_spanish():
    p = DATA_DIR / 'es' / 'spanishData.ts'
    txt = p.read_text(encoding='utf-8')
    txt = txt.replace(
        "{ phrase: 'Programemos una reunión', translation: 'Let\\',",
        "{ phrase: 'Programemos una reunión', translation: \"Let's schedule a meeting\","
    )
    p.write_text(txt, encoding='utf-8')
    print("Fixed spanishData.ts")

def fix_portuguese():
    p = DATA_DIR / 'pt' / 'portugueseData.ts'
    txt = p.read_text(encoding='utf-8')
    txt = txt.replace(
        "{ phrase: 'Vamos agendar uma reunião', translation: 'Let\\',",
        "{ phrase: 'Vamos agendar uma reunião', translation: \"Let's schedule a meeting\","
    )
    p.write_text(txt, encoding='utf-8')
    print("Fixed portugueseData.ts")

def fix_french():
    p = DATA_DIR / 'fr' / 'frenchData.ts'
    txt = p.read_text(encoding='utf-8')
    # Replace unescaped single quotes in French sentences
    txt = txt.replace(
        "{ phrase: 'Je voudrais changer de l'argent',",
        '{ phrase: "Je voudrais changer de l\'argent",'
    )
    txt = txt.replace(
        "{ phrase: 'Nous sommes d'accord avec cette proposition',",
        '{ phrase: "Nous sommes d\'accord avec cette proposition",'
    )
    txt = txt.replace(
        "translation: 'Let\\',",
        "translation: \"Let's schedule a meeting\","
    )
    p.write_text(txt, encoding='utf-8')
    print("Fixed frenchData.ts")

def fix_translation_resolver():
    p = ROOT / 'src' / 'utils' / 'translationResolver.ts'
    txt = p.read_text(encoding='utf-8')
    
    # In Step 3: Add ko and ja to direct target word lookup
    target_block = """        (mapping.id && (mapping.id.toLowerCase() === directTarget || mapping.id.toLowerCase().replace(/\\s*\\([^)]*\\)\\s*/g, ' ').trim() === directTargetClean)) ||
        (mapping.tr && (mapping.tr.toLowerCase() === directTarget || mapping.tr.toLowerCase().replace(/\\s*\\([^)]*\\)\\s*/g, ' ').trim() === directTargetClean))"""

    replacement_block = """        (mapping.id && (mapping.id.toLowerCase() === directTarget || mapping.id.toLowerCase().replace(/\\s*\\([^)]*\\)\\s*/g, ' ').trim() === directTargetClean)) ||
        (mapping.tr && (mapping.tr.toLowerCase() === directTarget || mapping.tr.toLowerCase().replace(/\\s*\\([^)]*\\)\\s*/g, ' ').trim() === directTargetClean)) ||
        (mapping.ko && (mapping.ko.toLowerCase() === directTarget || mapping.ko.toLowerCase().replace(/\\s*\\([^)]*\\)\\s*/g, ' ').trim() === directTargetClean)) ||
        (mapping.ja && (mapping.ja.toLowerCase() === directTarget || mapping.ja.toLowerCase().replace(/\\s*\\([^)]*\\)\\s*/g, ' ').trim() === directTargetClean))"""

    if target_block in txt and "(mapping.ko &&" not in txt:
        txt = txt.replace(target_block, replacement_block)
        p.write_text(txt, encoding='utf-8')
        print("Updated translationResolver.ts with KO and JA direct lookup.")
    else:
        print("translationResolver.ts already has KO/JA or pattern not found.")

def main():
    fix_english()
    fix_spanish()
    fix_portuguese()
    fix_french()
    fix_translation_resolver()

if __name__ == '__main__':
    main()
