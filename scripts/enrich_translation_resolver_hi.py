#!/usr/bin/env python3
"""
Enrich src/utils/translationResolver.ts with Hindi:
- NumberMapping (hi?: string)
- NUMBER_TABLE
- EXTENDED_DICTIONARY
- LANGUAGE_NAMES_IN_BASE
- getAlphabetQuizHint & buildQuizQuestionHint
"""

import re
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RESOLVER_FILE = ROOT / 'src' / 'utils' / 'translationResolver.ts'
HI_DICT = json.load(open(ROOT / 'scripts' / 'hindi_dictionary.json', encoding='utf-8'))

content = RESOLVER_FILE.read_text('utf-8')

# 1. NumberMapping interface
if 'hi?: string;' not in content:
    content = content.replace(
        '  zh?: string;',
        '  zh?: string;\n  hi?: string;'
    )
    print("Added hi?: string to NumberMapping")

# 2. Hindi numbers mapping for NUMBER_TABLE
HINDI_NUMBERS = {
    0: 'शून्य',
    1: 'एक',
    2: 'दो',
    3: 'तीन',
    4: 'चार',
    5: 'पाँच',
    6: 'छह',
    7: 'सात',
    8: 'आठ',
    9: 'नौ',
    10: 'दस',
    11: 'ग्यारह',
    12: 'बारह',
    13: 'तेरह',
    14: 'चौदह',
    15: 'पंद्रह',
    16: 'सोलह',
    17: 'सत्रह',
    18: 'अठारह',
    19: 'उन्नीस',
    20: 'बीस',
    30: 'तीस',
    40: 'चालीस',
    50: 'पचास',
    60: 'साठ',
    70: 'सत्तर',
    80: 'अस्सी',
    90: 'नब्बे',
    100: 'सौ',
    1000: 'हज़ार'
}

for num, hi_word in HINDI_NUMBERS.items():
    # Example line:
    # 0: { digit: 0, en: 'Zero', es: 'Cero', fr: 'Zéro', ru: 'Ноль', pt: 'Zero', de: 'Null', id: 'Nol', tr: 'Sıfır', zh: '零', allWords: ['zero', 'cero', 'zéro', 'ноль', 'нуль', 'null', 'nol', 'sıfır', '0', '零'] },
    num_prefix_pat = rf"({num}:\s*\{{[^}}]*zh:\s*'[^']+')([^}}]*allWords:\s*\[)([^\]]+)(\][^}}]*\}})"
    match = re.search(num_prefix_pat, content)
    if match:
        prefix1 = match.group(1)
        prefix2 = match.group(2)
        all_words_inner = match.group(3)
        suffix = match.group(4)
        
        hi_field = f", hi: '{hi_word}'" if f"hi: '{hi_word}'" not in prefix1 else ""
        hi_word_in_all = f", '{hi_word}'" if f"'{hi_word}'" not in all_words_inner else ""
        
        new_line = f"{prefix1}{hi_field}{prefix2}{all_words_inner}{hi_word_in_all}{suffix}"
        content = content.replace(match.group(0), new_line)

print("Updated NUMBER_TABLE with Hindi numbers")

# 3. Enrich EXTENDED_DICTIONARY entries with hi
ext_dict_pattern = re.compile(r"(\s*'[^']+'\s*:\s*\{[^\n]+)(\},?)", re.MULTILINE)

def enrich_entry(match):
    prefix = match.group(1)
    suffix = match.group(2)
    if 'hi:' in prefix:
        return match.group(0)

    # Extract en value
    en_match = re.search(r"en:\s*'([^']+)'", prefix)
    if not en_match:
        return match.group(0)

    en_val = en_match.group(1)
    clean_en = en_val.strip().split('/')[0].strip()

    hi_tuple = (
        HI_DICT.get(en_val) or
        HI_DICT.get(clean_en) or
        HI_DICT.get(clean_en.capitalize()) or
        HI_DICT.get(clean_en.title()) or
        HI_DICT.get(clean_en.lower())
    )

    if hi_tuple:
        hi_word = hi_tuple[0].replace("'", "\\'")
        return f"{prefix}, hi: '{hi_word}'{suffix}"
    return match.group(0)

content = ext_dict_pattern.sub(enrich_entry, content)
print("Enriched EXTENDED_DICTIONARY with Hindi translations")

# 4. LANGUAGE_NAMES_IN_BASE
lang_additions = {
    'en': "hi: 'Hindi'",
    'es': "hi: 'hindi'",
    'fr': "hi: 'hindi'",
    'ru': "hi: 'хинди'",
    'pt': "hi: 'híndi'",
    'de': "hi: 'Hindi'",
    'id': "hi: 'bahasa Hindi'",
    'tr': "hi: 'Hintçe'",
    'ja': "hi: 'ヒンディー語'",
    'ko': "hi: '힌디어'",
    'zh': "hi: '印地语'",
}

for lang, hi_pair in lang_additions.items():
    pat = rf"(\s*{lang}:\s*\{{[^}}]*zh:\s*'[^']+')(\s*\}})"
    match = re.search(pat, content)
    if match and hi_pair not in match.group(0):
        content = content.replace(match.group(0), f"{match.group(1)}, {hi_pair}{match.group(2)}")

HI_ROW = "  hi: { en: 'अंग्रेज़ी', es: 'स्पैनिश', fr: 'फ़्रेंच', ru: 'रूसी', pt: 'पुर्तगाली', de: 'जर्मन', id: 'इंडोनेशियाई', tr: 'तुर्की', ja: 'जापानी', ko: 'कोरियाई', zh: 'चीनी', hi: 'हिन्दी' },"
if "hi: { en: 'अंग्रेज़ी'" not in content:
    content = content.replace(
        "  zh: {",
        f"{HI_ROW}\n  zh: {{"
    )
print("Updated LANGUAGE_NAMES_IN_BASE")

# 5. getAlphabetQuizHint
if "case 'hi':" not in content.split("export const getAlphabetQuizHint")[1].split("export const buildQuizQuestionHint")[0]:
    # Update listening switch
    content = content.replace(
        "      case 'tr':\n        return `Sesi dinleyin ve ${metaName} dilindeki harfi yazın:`;",
        "      case 'tr':\n        return `Sesi dinleyin ve ${metaName} dilindeki harfi yazın:`;\n      case 'hi':\n        return `ऑडियो सुनें और ${metaName} में अक्षर लिखें:`;"
    )
    # Update baseLang switch at bottom of getAlphabetQuizHint
    content = content.replace(
        "    case 'tr':\n      return `${metaName} dilinde \"${character}\" harfinin okunuşu veya adı nedir?`;",
        "    case 'tr':\n      return `${metaName} dilinde \"${character}\" harfinin okunuşu veya adı nedir?`;\n    case 'hi':\n      return `${metaName} में \"${character}\" अक्षर का नाम या उच्चारण क्या है?`;"
    )
    print("Added case 'hi' to getAlphabetQuizHint")

# 6. buildQuizQuestionHint
if "case 'hi':" not in content.split("export const buildQuizQuestionHint")[1]:
    content = content.replace(
        "      case 'zh':\n        return `“${promptWord}”是什么意思？`;",
        "      case 'zh':\n        return `“${promptWord}”是什么意思？`;\n      case 'hi':\n        return `\"${promptWord}\" का क्या अर्थ है?`;"
    )
    content = content.replace(
        "      case 'zh':\n        return `用${targetNameInBase}怎么说“${promptWord}”？`;",
        "      case 'zh':\n        return `用${targetNameInBase}怎么说“${promptWord}”？`;\n      case 'hi':\n        return `${targetNameInBase} में \"${promptWord}\" को क्या कहते हैं?`;"
    )
    print("Added case 'hi' to buildQuizQuestionHint")

RESOLVER_FILE.write_text(content, 'utf-8')
print("Successfully enriched translationResolver.ts with Hindi!")
