#!/usr/bin/env python3
"""
Full generator for Hindi curriculum in Basic Language School.
Produces src/data/languages/hi/hindiData.ts with all 525 common words,
Devanagari alphabet, basic phrases, numbers, time, and grammar integration.
"""

import os
import re
import sys
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / 'src' / 'data' / 'languages'
HI_DIR = DATA_DIR / 'hi'
HI_DIR.mkdir(parents=True, exist_ok=True)

# 42 Devanagari Alphabet Items (Vowels & Consonants)
ALPHABET_DATA = [
    # Vowels (स्वर)
    ("अ", "/ə/ (a)", "as in अनार (Pomegranate)", "अनार", "Pomegranate", "🍎"),
    ("आ", "/aː/ (aa)", "as in आम (Mango)", "आम", "Mango", "🥭"),
    ("इ", "/ɪ/ (i)", "as in इमली (Tamarind)", "इमली", "Tamarind", "🫘"),
    ("ई", "/iː/ (ee)", "as in ईख (Sugarcane)", "ईख", "Sugarcane", "🎋"),
    ("उ", "/ʊ/ (u)", "as in उल्लू (Owl)", "उल्लू", "Owl", "🦉"),
    ("ऊ", "/uː/ (oo)", "as in ऊन (Wool)", "ऊन", "Wool", "🧶"),
    ("ऋ", "/rɪ/ (ri)", "as in ऋषि (Sage)", "ऋषि", "Sage", "🧘"),
    ("ए", "/eː/ (e)", "as in एक (One)", "एक", "One", "1️⃣"),
    ("ऐ", "/ɛː/ (ai)", "as in ऐनक (Spectacles)", "ऐनक", "Spectacles", "👓"),
    ("ओ", "/oː/ (o)", "as in ओखली (Mortar)", "ओखली", "Mortar", "🥣"),
    ("औ", "/ɔː/ (au)", "as in औरत (Woman)", "औरत", "Woman", "👩"),
    ("अं", "/əŋ/ (ang)", "as in अंगूर (Grapes)", "अंगूर", "Grapes", "🍇"),

    # Consonants (व्यंजन)
    ("क", "/kə/ (ka)", "as in कमल (Lotus)", "कमल", "Lotus", "🪷"),
    ("ख", "/kʰə/ (kha)", "as in खरगोश (Rabbit)", "खरगोश", "Rabbit", "🐇"),
    ("ग", "/ɡə/ (ga)", "as in गमला (Flowerpot)", "गमला", "Flowerpot", "🪴"),
    ("घ", "/ɡʱə/ (gha)", "as in घर (House)", "घर", "House", "🏠"),
    ("च", "/tʃə/ (cha)", "as in चम्मच (Spoon)", "चम्मच", "Spoon", "🥄"),
    ("छ", "/tʃʰə/ (chha)", "as in छतरी (Umbrella)", "छतरी", "Umbrella", "☂️"),
    ("ज", "/dʒə/ (ja)", "as in जहाज़ (Ship)", "जहाज़", "Ship", "🚢"),
    ("झ", "/dʒʱə/ (jha)", "as in झंडा (Flag)", "झंडा", "Flag", "🇮🇳"),
    ("ट", "/ʈə/ (ta)", "as in टमाटर (Tomato)", "टमाटर", "Tomato", "🍅"),
    ("ठ", "/ʈʰə/ (tha)", "as in ठप्पा (Stamp)", "ठप्पा", "Stamp", "🏷️"),
    ("ड", "/ɖə/ (da)", "as in डमरू (Drum)", "डमरू", "Drum", "🥁"),
    ("ढ", "/ɖʱə/ (dha)", "as in ढक्कन (Lid)", "ढक्कन", "Lid", "📦"),
    ("त", "/t̪ə/ (ta)", "as in तरबूज़ (Watermelon)", "तरबूज़", "Watermelon", "🍉"),
    ("थ", "/t̪ʰə/ (tha)", "as in थाली (Plate)", "थाली", "Plate", "🍽️"),
    ("द", "/d̪ə/ (da)", "as in दवात (Inkpot)", "दवात", "Inkpot", "🖋️"),
    ("ध", "/d̪ʱə/ (dha)", "as in धनुष (Bow)", "धनुष", "Bow", "🏹"),
    ("न", "/nə/ (na)", "as in नल (Tap)", "नल", "Tap", "🚰"),
    ("प", "/pə/ (pa)", "as in पतंग (Kite)", "पतंग", "Kite", "🪁"),
    ("फ", "/pʰə/ (pha)", "as in फल (Fruit)", "फल", "Fruit", "🍎"),
    ("ब", "/bə/ (ba)", "as in बत्तख़ (Duck)", "बत्तख़", "Duck", "🦆"),
    ("भ", "/bʱə/ (bha)", "as in भालू (Bear)", "भालू", "Bear", "🐻"),
    ("म", "/mə/ (ma)", "as in मछली (Fish)", "मछली", "Fish", "🐟"),
    ("य", "/jə/ (ya)", "as in यज्ञ (Sacred Fire)", "यज्ञ", "Sacred Fire", "🔥"),
    ("र", "/rə/ (ra)", "as in रथ (Chariot)", "रथ", "Chariot", "🏛️"),
    ("ल", "/lə/ (la)", "as in लट्टू (Spinning Top)", "लट्टू", "Spinning Top", "🪀"),
    ("व", "/ʋə/ (va)", "as in वक (Crane)", "वक", "Crane", "🦢"),
    ("श", "/ʃə/ (sha)", "as in शलगम (Turnip)", "शलगम", "Turnip", "🧅"),
    ("ष", "/ʂə/ (sha)", "as in षट्कोण (Hexagon)", "षट्कोण", "Hexagon", "⬡"),
    ("स", "/sə/ (sa)", "as in सेब (Apple)", "सेब", "Apple", "🍎"),
    ("ह", "/ɦə/ (ha)", "as in हाथी (Elephant)", "हाथी", "Elephant", "🐘"),
]

# Basic Phrases
PHRASES_DATA = [
    ("नमस्ते", "Hello", "namaste", "Greetings", "👋"),
    ("सुप्रभात", "Good morning", "suprabhāt", "Greetings", "🌅"),
    ("शुभ संध्या", "Good evening", "shubh sandhyā", "Greetings", "🌙"),
    ("शुभ रात्रि", "Good night", "shubh rātri", "Greetings", "😴"),
    ("धन्यवाद", "Thank you", "dhanyavād", "Courtesy", "💖"),
    ("बहुत बहुत धन्यवाद", "Thank you very much", "bahut bahut dhanyavād", "Courtesy", "🙏"),
    ("स्वागत है", "You're welcome", "svāgat hai", "Courtesy", "😊"),
    ("माफ़ कीजिये", "I am sorry", "maaf kījiye", "Courtesy", "🙇"),
    ("क्षमा करें", "Excuse me / Sorry", "kshamā karein", "Courtesy", "🙋"),
    ("कृपया", "Please", "kripayā", "Courtesy", "🤲"),
    ("हाँ", "Yes", "haan", "Reply", "👍"),
    ("नहीं", "No", "nahīn", "Reply", "👎"),
    ("ठीक है", "Okay / All right", "theek hai", "Reply", "👌"),
    ("अलविदा", "Goodbye", "alvidā", "Greetings", "👋"),
    ("आपसे मिलकर खुशी हुई", "Nice to meet you", "aapse milkar khushī huī", "Introductions", "🤝"),
    ("आपका नाम क्या है?", "What is your name?", "aapkā naam kyā hai?", "Introductions", "❓"),
    ("मेरा नाम... है", "My name is...", "merā naam... hai", "Introductions", "🪪"),
    ("आप कैसे हैं?", "How are you?", "aap kaise hain?", "Greetings", "😊"),
    ("मैं ठीक हूँ", "I am fine", "main theek hoon", "Greetings", "✨"),
    ("और आप?", "And you?", "aur aap?", "Greetings", "💬"),
    ("आपका दिन शुभ हो", "Have a nice day", "aapkā din shubh ho", "Greetings", "☀️"),
    ("आप कहाँ से हैं?", "Where are you from?", "aap kahān se hain?", "Questions", "🌍"),
    ("मैं... से हूँ", "I am from...", "main... se hoon", "Questions", "📍"),
    ("मुझे समझ नहीं आया", "I don't understand", "mujhe samajh nahīn aayā", "Communication", "🤔"),
    ("क्या आप अंग्रेज़ी बोलते हैं?", "Do you speak English?", "kyā aap angrezī bolte hain?", "Communication", "🗣️"),
    ("कृपया धीरे बोलें", "Please speak slowly", "kripayā dheere bolein", "Communication", "🐢"),
    ("मदद!", "Help!", "madad!", "Essentials", "🆘"),
    ("शौचालय कहाँ है?", "Where is the restroom?", "shauchālay kahān hai?", "Travel", "🚻"),
    ("यह कितने का है?", "How much is this?", "yeh kitne kā hai?", "Shopping", "🏷️"),
]

# Numbers
NUMBERS_DATA = [
    ("शून्य", "0 (Zero)", "shūnya", "Numbers 0-10", "0️⃣"),
    ("एक", "1 (One)", "ek", "Numbers 0-10", "1️⃣"),
    ("दो", "2 (Two)", "do", "Numbers 0-10", "2️⃣"),
    ("तीन", "3 (Three)", "teen", "Numbers 0-10", "3️⃣"),
    ("चार", "4 (Four)", "chaar", "Numbers 0-10", "4️⃣"),
    ("पाँच", "5 (Five)", "paanch", "Numbers 0-10", "5️⃣"),
    ("छह", "6 (Six)", "chhah", "Numbers 0-10", "6️⃣"),
    ("सात", "7 (Seven)", "saat", "Numbers 0-10", "7️⃣"),
    ("आठ", "8 (Eight)", "aath", "Numbers 0-10", "8️⃣"),
    ("नौ", "9 (Nine)", "nau", "Numbers 0-10", "9️⃣"),
    ("दस", "10 (Ten)", "das", "Numbers 0-10", "🔟"),
    ("ग्यारह", "11 (Eleven)", "gyārah", "Numbers 11-20", "🔢"),
    ("बारह", "12 (Twelve)", "bārah", "Numbers 11-20", "🔢"),
    ("तेरह", "13 (Thirteen)", "terah", "Numbers 11-20", "🔢"),
    ("चौदह", "14 (Fourteen)", "chaudah", "Numbers 11-20", "🔢"),
    ("पंद्रह", "15 (Fifteen)", "pandrah", "Numbers 11-20", "🔢"),
    ("सोलह", "16 (Sixteen)", "solah", "Numbers 11-20", "🔢"),
    ("सत्रह", "17 (Seventeen)", "satrah", "Numbers 11-20", "🔢"),
    ("अठारह", "18 (Eighteen)", "athārah", "Numbers 11-20", "🔢"),
    ("उन्नीस", "19 (Nineteen)", "unnīs", "Numbers 11-20", "🔢"),
    ("बीस", "20 (Twenty)", "bees", "Tens", "🔢"),
    ("तीस", "30 (Thirty)", "tees", "Tens", "🔢"),
    ("चालीस", "40 (Forty)", "chālīs", "Tens", "🔢"),
    ("पचास", "50 (Fifty)", "pachās", "Tens", "🔢"),
    ("साठ", "60 (Sixty)", "saath", "Tens", "🔢"),
    ("सत्तर", "70 (Seventy)", "sattar", "Tens", "🔢"),
    ("अस्सी", "80 (Eighty)", "assī", "Tens", "🔢"),
    ("नब्बे", "90 (Ninety)", "nabbe", "Tens", "🔢"),
    ("सौ", "100 (One hundred)", "sau", "Hundreds", "💯"),
    ("हज़ार", "1,000 (One thousand)", "hazār", "Thousands", "🏦"),
]

# Time expressions
TIME_DATA = [
    ("अभी कितने बजे हैं?", "What time is it?", "abhi kitne baje hain?", "Time", "🕒"),
    ("एक बजा है", "One o'clock (1:00)", "ek bajā hai", "Hour", "🕐"),
    ("दो बजे हैं", "Two o'clock (2:00)", "do baje hain", "Hour", "🕑"),
    ("तीन बजे हैं", "Three o'clock (3:00)", "teen baje hain", "Hour", "🕒"),
    ("चार बजे हैं", "Four o'clock (4:00)", "chaar baje hain", "Hour", "🕓"),
    ("पाँच बजे हैं", "Five o'clock (5:00)", "paanch baje hain", "Hour", "🕔"),
    ("सुबह", "AM (Morning)", "subah", "Special", "🌅"),
    ("दोपहर", "PM (Afternoon)", "dopahar", "Special", "🌇"),
    ("सुबह के समय", "Morning", "subah ke samay", "Special", "☀️"),
    ("दोपहर (12 बजे)", "Noon", "dopahar", "Special", "☀️"),
    ("रात", "Night / Evening", "raat", "Special", "🌙"),
    ("आधा / साढ़े", "Half past (:30)", "saadhe", "Special", "⏳"),
]

def q(s: str) -> str:
    return s.replace("\\", "\\\\").replace("'", "\\'")

def generate_dataset():
    cw_items = json.load(open(ROOT / 'scripts' / 'clean_cw_525.json'))
    hi_dict = json.load(open(ROOT / 'scripts' / 'hindi_dictionary.json'))
    print(f"Loaded {len(cw_items)} reference common words items.")

    hi_common_words = []
    for ph, tr, pr, cat, ic in cw_items:
        clean_tr = tr.strip().replace("\\'", "'")
        hi_tuple = hi_dict.get(clean_tr) or hi_dict.get(clean_tr.capitalize()) or hi_dict.get(clean_tr.title())
        if not hi_tuple:
            print(f"FATAL: Missing translation for {clean_tr}")
            sys.exit(1)
        hi_phrase, hi_pron = hi_tuple
        hi_common_words.append({
            "phrase": hi_phrase,
            "translation": clean_tr,
            "pronunciation": hi_pron,
            "category": cat,
            "icon": ic
        })

    print(f"Successfully mapped all {len(hi_common_words)} Hindi common words.")

    lines = [
        "import { AlphabetItem, PhraseItem, AppData } from '../../../types';",
        "import { HINDI_GRAMMAR } from '../grammarData';",
        "",
        "// Devanagari Hindi Alphabet (Vowels, Consonants & Core Sounds)",
        "const alphabet: AlphabetItem[] = ["
    ]
    for letter, pron, ex, word, meaning, icon in ALPHABET_DATA:
        lines.append(f"  {{ letter: '{q(letter)}', pronunciation: '{q(pron)}', example: '{q(ex)}', word: '{q(word)}', meaning: '{q(meaning)}', icon: '{q(icon)}' }},")
    lines.append("];")
    lines.append("")

    lines.append("// Essential Hindi Phrases")
    lines.append("const basicPhrases: PhraseItem[] = [")
    for ph, tr, pron, cat, icon in PHRASES_DATA:
        lines.append(f"  {{ phrase: '{q(ph)}', translation: '{q(tr)}', pronunciation: '{q(pron)}', category: '{q(cat)}', icon: '{q(icon)}' }},")
    lines.append("];")
    lines.append("")

    lines.append("// Hindi Numbers")
    lines.append("const numbers: PhraseItem[] = [")
    for ph, tr, pron, cat, icon in NUMBERS_DATA:
        lines.append(f"  {{ phrase: '{q(ph)}', translation: '{q(tr)}', pronunciation: '{q(pron)}', category: '{q(cat)}', icon: '{q(icon)}' }},")
    lines.append("];")
    lines.append("")

    lines.append("// Core Hindi Vocabulary (500+ items across all categories)")
    lines.append("const commonWords: PhraseItem[] = [")
    for item in hi_common_words:
        p_ph = q(item['phrase'])
        p_tr = q(item['translation'])
        p_pr = q(item['pronunciation'])
        p_cat = q(item['category'])
        p_ic = q(item['icon'])
        lines.append(f"  {{ phrase: '{p_ph}', translation: '{p_tr}', pronunciation: '{p_pr}', category: '{p_cat}', icon: '{p_ic}' }},")
    lines.append("];")
    lines.append("")

    lines.append("// Hindi Time expressions")
    lines.append("const time: PhraseItem[] = [")
    for ph, tr, pron, cat, icon in TIME_DATA:
        lines.append(f"  {{ phrase: '{q(ph)}', translation: '{q(tr)}', pronunciation: '{q(pron)}', category: '{q(cat)}', icon: '{q(icon)}' }},")
    lines.append("];")
    lines.append("")

    lines.append("export const hindiData: AppData = {")
    lines.append("  alphabet,")
    lines.append("  basicPhrases,")
    lines.append("  numbers,")
    lines.append("  commonWords,")
    lines.append("  time,")
    lines.append("  grammar: HINDI_GRAMMAR,")
    lines.append("};")
    lines.append("")
    lines.append("export default hindiData;")
    lines.append("")

    out_file = HI_DIR / 'hindiData.ts'
    out_file.write_text("\n".join(lines), 'utf-8')
    print(f"Wrote {len(lines)} lines to {out_file}")

if __name__ == '__main__':
    generate_dataset()
