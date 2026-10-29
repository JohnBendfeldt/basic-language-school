#!/usr/bin/env python3
"""
Batch 4 Vocabulary Expansion: Foundational Verbs, Questions, City, Travel, Adjectives & 8-Language Parity
Expands all 8 supported language courses with high-yield foundational items:
  - en: English
  - es: Spanish
  - fr: French
  - ru: Russian
  - pt: Portuguese
  - de: German
  - id: Indonesian
  - tr: Turkish
"""

import sys
import os
import re
import json
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent

LANG_FILES = {
    "ru": PROJECT_ROOT / "src" / "data" / "languages" / "ru" / "russianData.ts",
    "en": PROJECT_ROOT / "src" / "data" / "languages" / "en" / "englishData.ts",
    "es": PROJECT_ROOT / "src" / "data" / "languages" / "es" / "spanishData.ts",
    "fr": PROJECT_ROOT / "src" / "data" / "languages" / "fr" / "frenchData.ts",
    "pt": PROJECT_ROOT / "src" / "data" / "languages" / "pt" / "portugueseData.ts",
    "de": PROJECT_ROOT / "src" / "data" / "languages" / "de" / "germanData.ts",
    "id": PROJECT_ROOT / "src" / "data" / "languages" / "id" / "indonesianData.ts",
    "tr": PROJECT_ROOT / "src" / "data" / "languages" / "tr" / "turkishData.ts",
}

# 71 High-Yield Everyday Words & Verbs with 100% verified neural audio in all 8 languages
VOCABULARY_ITEMS = [
    # ==========================================
    # 1. QUESTION WORDS (Items 1 - 7)
    # ==========================================
    {
        "id": "who", "category": "Questions", "level": 1, "icon": "❓",
        "translations": {
            "en": {"text": "Who", "meaning": "Who", "pron": "HOO"},
            "es": {"text": "Quién", "meaning": "Who", "pron": "kyehn"},
            "fr": {"text": "Qui", "meaning": "Who", "pron": "KEE"},
            "ru": {"text": "Кто", "meaning": "Who", "pron": "KTOH"},
            "pt": {"text": "Quem", "meaning": "Who", "pron": "KAYNG"},
            "de": {"text": "Wer", "meaning": "Who", "pron": "VEHR"},
            "id": {"text": "Siapa", "meaning": "Who", "pron": "see-AH-pah"},
            "tr": {"text": "Kim", "meaning": "Who", "pron": "KEEM"}
        }
    },
    {
        "id": "what", "category": "Questions", "level": 1, "icon": "❓",
        "translations": {
            "en": {"text": "What", "meaning": "What", "pron": "WAHT"},
            "es": {"text": "Qué", "meaning": "What", "pron": "KEH"},
            "fr": {"text": "Quoi", "meaning": "What", "pron": "KWAH"},
            "ru": {"text": "Что", "meaning": "What", "pron": "SHTOH"},
            "pt": {"text": "O que", "meaning": "What", "pron": "oo-KEH"},
            "de": {"text": "Was", "meaning": "What", "pron": "VAHS"},
            "id": {"text": "Apa", "meaning": "What", "pron": "AH-pah"},
            "tr": {"text": "Ne", "meaning": "What", "pron": "NEH"}
        }
    },
    {
        "id": "where", "category": "Questions", "level": 1, "icon": "📍",
        "translations": {
            "en": {"text": "Where", "meaning": "Where", "pron": "WEHR"},
            "es": {"text": "Dónde", "meaning": "Where", "pron": "DOHN-deh"},
            "fr": {"text": "Où", "meaning": "Where", "pron": "OO"},
            "ru": {"text": "Где", "meaning": "Where", "pron": "GDYEH"},
            "pt": {"text": "Onde", "meaning": "Where", "pron": "OHN-jee"},
            "de": {"text": "Wo", "meaning": "Where", "pron": "VOH"},
            "id": {"text": "Di mana", "meaning": "Where", "pron": "dee MAH-nah"},
            "tr": {"text": "Nerede", "meaning": "Where", "pron": "NEH-reh-deh"}
        }
    },
    {
        "id": "when", "category": "Questions", "level": 1, "icon": "🕒",
        "translations": {
            "en": {"text": "When", "meaning": "When", "pron": "WEN"},
            "es": {"text": "Cuándo", "meaning": "When", "pron": "KWAHN-doh"},
            "fr": {"text": "Quand", "meaning": "When", "pron": "KAHN"},
            "ru": {"text": "Когда", "meaning": "When", "pron": "kahg-DAH"},
            "pt": {"text": "Quando", "meaning": "When", "pron": "KWAHN-doo"},
            "de": {"text": "Wann", "meaning": "When", "pron": "VAHN"},
            "id": {"text": "Kapan", "meaning": "When", "pron": "KAH-pahn"},
            "tr": {"text": "Ne zaman", "meaning": "When", "pron": "neh zah-MAHN"}
        }
    },
    {
        "id": "why", "category": "Questions", "level": 1, "icon": "💡",
        "translations": {
            "en": {"text": "Why", "meaning": "Why", "pron": "WY"},
            "es": {"text": "Por qué", "meaning": "Why", "pron": "pohr KEH"},
            "fr": {"text": "Pourquoi", "meaning": "Why", "pron": "poor-KWAH"},
            "ru": {"text": "Почему", "meaning": "Why", "pron": "pah-cheh-MOO"},
            "pt": {"text": "Por que", "meaning": "Why", "pron": "pohr KEH"},
            "de": {"text": "Warum", "meaning": "Why", "pron": "vah-ROOM"},
            "id": {"text": "Mengapa", "meaning": "Why", "pron": "mehng-AH-pah"},
            "tr": {"text": "Neden", "meaning": "Why", "pron": "neh-DEHN"}
        }
    },
    {
        "id": "how", "category": "Questions", "level": 1, "icon": "⚙️",
        "translations": {
            "en": {"text": "How", "meaning": "How", "pron": "HOW"},
            "es": {"text": "Cómo", "meaning": "How", "pron": "KOH-moh"},
            "fr": {"text": "Comment", "meaning": "How", "pron": "kuh-MAHN"},
            "ru": {"text": "Как", "meaning": "How", "pron": "KAHK"},
            "pt": {"text": "Como", "meaning": "How", "pron": "KOH-moo"},
            "de": {"text": "Wie", "meaning": "How", "pron": "VEE"},
            "id": {"text": "Bagaimana", "meaning": "How", "pron": "bah-guy-MAH-nah"},
            "tr": {"text": "Nasıl", "meaning": "How", "pron": "NAH-suhl"}
        }
    },
    {
        "id": "how_much", "category": "Questions", "level": 1, "icon": "💰",
        "translations": {
            "en": {"text": "How much", "meaning": "How much / How many", "pron": "HOW MUCH"},
            "es": {"text": "Cuánto", "meaning": "How much / How many", "pron": "KWAHN-toh"},
            "fr": {"text": "Combien", "meaning": "How much / How many", "pron": "kohm-BYEHN"},
            "ru": {"text": "Сколько", "meaning": "How much / How many", "pron": "SKOHL-kah"},
            "pt": {"text": "Quanto", "meaning": "How much / How many", "pron": "KWAHN-too"},
            "de": {"text": "Wie viel", "meaning": "How much / How many", "pron": "vee FEEL"},
            "id": {"text": "Berapa", "meaning": "How much / How many", "pron": "beh-RAH-pah"},
            "tr": {"text": "Ne kadar", "meaning": "How much / How many", "pron": "neh kah-DAHR"}
        }
    },

    # ==========================================
    # 2. CITY, PLACES & TRANSIT (Items 8 - 18)
    # ==========================================
    {
        "id": "city", "category": "Places", "level": 1, "icon": "🏙️",
        "translations": {
            "en": {"text": "City", "meaning": "City", "pron": "SIH-tee"},
            "es": {"text": "Ciudad", "meaning": "City", "pron": "syoo-DAHD"},
            "fr": {"text": "Ville", "meaning": "City", "pron": "VEEL"},
            "ru": {"text": "Город", "meaning": "City", "pron": "GOH-raht"},
            "pt": {"text": "Cidade", "meaning": "City", "pron": "see-DAH-jee"},
            "de": {"text": "Stadt", "meaning": "City", "pron": "SHTAHT"},
            "id": {"text": "Kota", "meaning": "City", "pron": "KOH-tah"},
            "tr": {"text": "Şehir", "meaning": "City", "pron": "sheh-HEER"}
        }
    },
    {
        "id": "country", "category": "Places", "level": 1, "icon": "🌍",
        "translations": {
            "en": {"text": "Country", "meaning": "Country", "pron": "KUHN-tree"},
            "es": {"text": "País", "meaning": "Country", "pron": "pah-EES"},
            "fr": {"text": "Pays", "meaning": "Country", "pron": "peh-EE"},
            "ru": {"text": "Страна", "meaning": "Country", "pron": "strah-NAH"},
            "pt": {"text": "País", "meaning": "Country", "pron": "pah-EES"},
            "de": {"text": "Land", "meaning": "Country", "pron": "LAHNT"},
            "id": {"text": "Negara", "meaning": "Country", "pron": "neh-GAH-rah"},
            "tr": {"text": "Ülke", "meaning": "Country", "pron": "ewl-KEH"}
        }
    },
    {
        "id": "house", "category": "Places", "level": 1, "icon": "🏠",
        "translations": {
            "en": {"text": "House", "meaning": "House / Home", "pron": "HOWS"},
            "es": {"text": "Casa", "meaning": "House / Home", "pron": "KAH-sah"},
            "fr": {"text": "Maison", "meaning": "House / Home", "pron": "meh-ZOHN"},
            "ru": {"text": "Дом", "meaning": "House / Home", "pron": "DOHM"},
            "pt": {"text": "Casa", "meaning": "House / Home", "pron": "KAH-zah"},
            "de": {"text": "Haus", "meaning": "House / Home", "pron": "HOWS"},
            "id": {"text": "Rumah", "meaning": "House / Home", "pron": "ROO-mah"},
            "tr": {"text": "Ev", "meaning": "House / Home", "pron": "EV"}
        }
    },
    {
        "id": "car", "category": "Travel", "level": 1, "icon": "🚗",
        "translations": {
            "en": {"text": "Car", "meaning": "Car", "pron": "KAHR"},
            "es": {"text": "Carro", "meaning": "Car", "pron": "KAHR-roh"},
            "fr": {"text": "Voiture", "meaning": "Car", "pron": "vwah-TOOR"},
            "ru": {"text": "Машина", "meaning": "Car", "pron": "mah-SHEE-nah"},
            "pt": {"text": "Carro", "meaning": "Car", "pron": "KAH-hoo"},
            "de": {"text": "Auto", "meaning": "Car", "pron": "OW-toh"},
            "id": {"text": "Mobil", "meaning": "Car", "pron": "MOH-beel"},
            "tr": {"text": "Araba", "meaning": "Car", "pron": "ah-rah-BAH"}
        }
    },
    {
        "id": "train", "category": "Travel", "level": 1, "icon": "🚆",
        "translations": {
            "en": {"text": "Train", "meaning": "Train", "pron": "TRAYN"},
            "es": {"text": "Tren", "meaning": "Train", "pron": "TREHN"},
            "fr": {"text": "Train", "meaning": "Train", "pron": "TRAN"},
            "ru": {"text": "Поезд", "meaning": "Train", "pron": "POH-yeezt"},
            "pt": {"text": "Trem", "meaning": "Train", "pron": "TRAYNG"},
            "de": {"text": "Zug", "meaning": "Train", "pron": "TSOOK"},
            "id": {"text": "Kereta", "meaning": "Train", "pron": "keh-REH-tah"},
            "tr": {"text": "Tren", "meaning": "Train", "pron": "TREHN"}
        }
    },
    {
        "id": "subway", "category": "Travel", "level": 1, "icon": "🚇",
        "translations": {
            "en": {"text": "Subway", "meaning": "Subway / Metro", "pron": "SUHB-way"},
            "es": {"text": "Metro", "meaning": "Subway / Metro", "pron": "MEH-troh"},
            "fr": {"text": "Métro", "meaning": "Subway / Metro", "pron": "meh-TROH"},
            "ru": {"text": "Метро", "meaning": "Subway / Metro", "pron": "myeh-TROH"},
            "pt": {"text": "Metrô", "meaning": "Subway / Metro", "pron": "meh-TROH"},
            "de": {"text": "U-Bahn", "meaning": "Subway / Metro", "pron": "OO-bahn"},
            "id": {"text": "Metro", "meaning": "Subway / Metro", "pron": "MEH-troh"},
            "tr": {"text": "Metro", "meaning": "Subway / Metro", "pron": "MEHT-roh"}
        }
    },
    {
        "id": "square", "category": "Places", "level": 1, "icon": "🏛️",
        "translations": {
            "en": {"text": "Square", "meaning": "Square / Plaza", "pron": "SKWEHR"},
            "es": {"text": "Plaza", "meaning": "Square / Plaza", "pron": "PLAH-sah"},
            "fr": {"text": "Place", "meaning": "Square / Plaza", "pron": "PLAHS"},
            "ru": {"text": "Площадь", "meaning": "Square / Plaza", "pron": "PLOH-shchat"},
            "pt": {"text": "Praça", "meaning": "Square / Plaza", "pron": "PRAH-sah"},
            "de": {"text": "Platz", "meaning": "Square / Plaza", "pron": "PLAHTS"},
            "id": {"text": "Alun-alun", "meaning": "Square / Plaza", "pron": "ah-loon AH-loon"},
            "tr": {"text": "Meydan", "meaning": "Square / Plaza", "pron": "may-DAHN"}
        }
    },
    {
        "id": "post_office", "category": "Places", "level": 1, "icon": "🏤",
        "translations": {
            "en": {"text": "Post office", "meaning": "Post office", "pron": "POHST OFF-iss"},
            "es": {"text": "Oficina de correos", "meaning": "Post office", "pron": "oh-fee-SEE-nah deh kohr-REH-ohs"},
            "fr": {"text": "Bureau de poste", "meaning": "Post office", "pron": "byoo-ROH duh POHST"},
            "ru": {"text": "Почта", "meaning": "Post office", "pron": "POHCH-tah"},
            "pt": {"text": "Correios", "meaning": "Post office", "pron": "koh-HAY-oos"},
            "de": {"text": "Postamt", "meaning": "Post office", "pron": "POHST-ahmt"},
            "id": {"text": "Kantor pos", "meaning": "Post office", "pron": "KAHN-tohr POHS"},
            "tr": {"text": "Postane", "meaning": "Post office", "pron": "pohs-tah-NEH"}
        }
    },
    {
        "id": "police", "category": "Places", "level": 1, "icon": "👮",
        "translations": {
            "en": {"text": "Police", "meaning": "Police", "pron": "puh-LEES"},
            "es": {"text": "Policía", "meaning": "Police", "pron": "poh-lee-SEE-ah"},
            "fr": {"text": "Police", "meaning": "Police", "pron": "poh-LEES"},
            "ru": {"text": "Полиция", "meaning": "Police", "pron": "pah-LEET-see-yah"},
            "pt": {"text": "Polícia", "meaning": "Police", "pron": "poh-LEE-syah"},
            "de": {"text": "Polizei", "meaning": "Police", "pron": "poh-lee-TSY"},
            "id": {"text": "Polisi", "meaning": "Police", "pron": "poh-LEE-see"},
            "tr": {"text": "Polis", "meaning": "Police", "pron": "poh-LEES"}
        }
    },
    {
        "id": "train_station", "category": "Travel", "level": 1, "icon": "🚉",
        "translations": {
            "en": {"text": "Train station", "meaning": "Train station", "pron": "TRAYN STAY-shuhn"},
            "es": {"text": "Estación de tren", "meaning": "Train station", "pron": "ehs-tah-SYOHN deh TREHN"},
            "fr": {"text": "Gare", "meaning": "Train station", "pron": "GAHR"},
            "ru": {"text": "Вокзал", "meaning": "Train station", "pron": "vahk-ZAHL"},
            "pt": {"text": "Estação de trem", "meaning": "Train station", "pron": "ehs-tah-SOWNG jee TRAYNG"},
            "de": {"text": "Bahnhof", "meaning": "Train station", "pron": "BAHN-hohf"},
            "id": {"text": "Stasiun kereta", "meaning": "Train station", "pron": "stah-SYOON keh-REH-tah"},
            "tr": {"text": "Tren istasyonu", "meaning": "Train station", "pron": "TREHN ees-tahs-yoh-NOO"}
        }
    },

    # ==========================================
    # 3. PEOPLE & PRONOUNS (Items 18 - 25)
    # ==========================================
    {
        "id": "we", "category": "People", "level": 1, "icon": "👥",
        "translations": {
            "en": {"text": "We", "meaning": "We", "pron": "WEE"},
            "es": {"text": "Nosotros", "meaning": "We", "pron": "noh-SOH-trohs"},
            "fr": {"text": "Nous", "meaning": "We", "pron": "NOO"},
            "ru": {"text": "Мы", "meaning": "We", "pron": "MY"},
            "pt": {"text": "Nós", "meaning": "We", "pron": "NAWS"},
            "de": {"text": "Wir", "meaning": "We", "pron": "VEER"},
            "id": {"text": "Kami", "meaning": "We", "pron": "KAH-mee"},
            "tr": {"text": "Biz", "meaning": "We", "pron": "BEEZ"}
        }
    },
    {
        "id": "girl", "category": "People", "level": 1, "icon": "👧",
        "translations": {
            "en": {"text": "Girl", "meaning": "Girl", "pron": "GURL"},
            "es": {"text": "Niña", "meaning": "Girl", "pron": "NEE-nyah"},
            "fr": {"text": "Fille", "meaning": "Girl", "pron": "FEEY"},
            "ru": {"text": "Девочка", "meaning": "Girl", "pron": "DYEH-vahch-kah"},
            "pt": {"text": "Menina", "meaning": "Girl", "pron": "meh-NEE-nah"},
            "de": {"text": "Mädchen", "meaning": "Girl", "pron": "MEHT-khen"},
            "id": {"text": "Anak perempuan", "meaning": "Girl", "pron": "AH-nahk peh-rehm-POO-ahn"},
            "tr": {"text": "Kız çocuk", "meaning": "Girl", "pron": "KEEZ choh-DJOOK"}
        }
    },
    {
        "id": "husband", "category": "Family", "level": 1, "icon": "🤵",
        "translations": {
            "en": {"text": "Husband", "meaning": "Husband", "pron": "HUHZ-buhnd"},
            "es": {"text": "Esposo", "meaning": "Husband", "pron": "ehs-POH-soh"},
            "fr": {"text": "Mari", "meaning": "Husband", "pron": "mah-REE"},
            "ru": {"text": "Муж", "meaning": "Husband", "pron": "MOOZH"},
            "pt": {"text": "Marido", "meaning": "Husband", "pron": "mah-REE-doo"},
            "de": {"text": "Ehemann", "meaning": "Husband", "pron": "EH-heh-mahn"},
            "id": {"text": "Suami", "meaning": "Husband", "pron": "soo-AH-mee"},
            "tr": {"text": "Eş", "meaning": "Husband / Spouse", "pron": "ESH"}
        }
    },
    {
        "id": "wife", "category": "Family", "level": 1, "icon": "👰",
        "translations": {
            "en": {"text": "Wife", "meaning": "Wife", "pron": "WYF"},
            "es": {"text": "Esposa", "meaning": "Wife", "pron": "ehs-POH-sah"},
            "fr": {"text": "Femme", "meaning": "Wife", "pron": "FAHM"},
            "ru": {"text": "Жена", "meaning": "Wife", "pron": "zheh-NAH"},
            "pt": {"text": "Esposa", "meaning": "Wife", "pron": "ehs-POH-zah"},
            "de": {"text": "Ehefrau", "meaning": "Wife", "pron": "EH-heh-frow"},
            "id": {"text": "Istri", "meaning": "Wife", "pron": "EES-tree"},
            "tr": {"text": "Eş", "meaning": "Wife / Spouse", "pron": "ESH"}
        }
    },
    {
        "id": "teacher", "category": "People", "level": 1, "icon": "👨‍🏫",
        "translations": {
            "en": {"text": "Teacher", "meaning": "Teacher", "pron": "TEE-cher"},
            "es": {"text": "Profesor", "meaning": "Teacher", "pron": "proh-feh-SOHR"},
            "fr": {"text": "Enseignant", "meaning": "Teacher", "pron": "ahn-sayn-YAHN"},
            "ru": {"text": "Учитель", "meaning": "Teacher", "pron": "oo-CHEE-tyel"},
            "pt": {"text": "Professor", "meaning": "Teacher", "pron": "proh-feh-SOHR"},
            "de": {"text": "Lehrer", "meaning": "Teacher", "pron": "LEH-ruhr"},
            "id": {"text": "Guru", "meaning": "Teacher", "pron": "GOO-roo"},
            "tr": {"text": "Öğretmen", "meaning": "Teacher", "pron": "oy-reht-MEHN"}
        }
    },
    {
        "id": "student", "category": "People", "level": 1, "icon": "👨‍🎓",
        "translations": {
            "en": {"text": "Student", "meaning": "Student", "pron": "STOO-duhnt"},
            "es": {"text": "Estudiante", "meaning": "Student", "pron": "ehs-too-DYAHN-teh"},
            "fr": {"text": "Étudiant", "meaning": "Student", "pron": "ay-too-DYAHN"},
            "ru": {"text": "Студент", "meaning": "Student", "pron": "stoo-DYEHNT"},
            "pt": {"text": "Estudante", "meaning": "Student", "pron": "ehs-too-DAHN-chee"},
            "de": {"text": "Student", "meaning": "Student", "pron": "shtoo-DEHNT"},
            "id": {"text": "Pelajar", "meaning": "Student", "pron": "peh-LAH-jahr"},
            "tr": {"text": "Öğrenci", "meaning": "Student", "pron": "oy-rehn-JEE"}
        }
    },

    # ==========================================
    # 4. ESSENTIALS & EVERYDAY ITEMS (Items 26 - 37)
    # ==========================================
    {
        "id": "visa", "category": "Travel", "level": 1, "icon": "🛂",
        "translations": {
            "en": {"text": "Visa", "meaning": "Visa", "pron": "VEE-zuh"},
            "es": {"text": "Visa", "meaning": "Visa", "pron": "BEE-sah"},
            "fr": {"text": "Visa", "meaning": "Visa", "pron": "vee-ZAH"},
            "ru": {"text": "Виза", "meaning": "Visa", "pron": "VEE-zah"},
            "pt": {"text": "Visto", "meaning": "Visa", "pron": "VEES-too"},
            "de": {"text": "Visum", "meaning": "Visa", "pron": "VEE-zoom"},
            "id": {"text": "Visa", "meaning": "Visa", "pron": "VEE-sah"},
            "tr": {"text": "Vize", "meaning": "Visa", "pron": "vee-ZEH"}
        }
    },
    {
        "id": "ticket", "category": "Travel", "level": 1, "icon": "🎫",
        "translations": {
            "en": {"text": "Ticket", "meaning": "Ticket", "pron": "TIK-it"},
            "es": {"text": "Boleto", "meaning": "Ticket", "pron": "boh-LEH-toh"},
            "fr": {"text": "Billet", "meaning": "Ticket", "pron": "bee-YEH"},
            "ru": {"text": "Билет", "meaning": "Ticket", "pron": "bee-LYEHT"},
            "pt": {"text": "Passagem", "meaning": "Ticket", "pron": "pah-SAH-zheng"},
            "de": {"text": "Ticket", "meaning": "Ticket", "pron": "TIK-uht"},
            "id": {"text": "Tiket", "meaning": "Ticket", "pron": "TEE-keht"},
            "tr": {"text": "Bilet", "meaning": "Ticket", "pron": "bee-LEHT"}
        }
    },
    {
        "id": "telephone", "category": "Tech", "level": 1, "icon": "☎️",
        "translations": {
            "en": {"text": "Telephone", "meaning": "Telephone", "pron": "TEL-uh-fohn"},
            "es": {"text": "Teléfono", "meaning": "Telephone", "pron": "teh-LEH-foh-noh"},
            "fr": {"text": "Téléphone", "meaning": "Telephone", "pron": "tay-lay-FOHN"},
            "ru": {"text": "Телефон", "meaning": "Telephone", "pron": "tyee-lyee-FOHN"},
            "pt": {"text": "Telefone", "meaning": "Telephone", "pron": "teh-leh-FOH-nee"},
            "de": {"text": "Telefon", "meaning": "Telephone", "pron": "teh-leh-FOHN"},
            "id": {"text": "Telepon", "meaning": "Telephone", "pron": "teh-leh-POHN"},
            "tr": {"text": "Telefon", "meaning": "Telephone", "pron": "teh-leh-FOHN"}
        }
    },
    {
        "id": "help", "category": "Essentials", "level": 1, "icon": "🆘",
        "translations": {
            "en": {"text": "Help", "meaning": "Help", "pron": "HELP"},
            "es": {"text": "Ayuda", "meaning": "Help", "pron": "ah-YOO-dah"},
            "fr": {"text": "Aide", "meaning": "Help", "pron": "EHD"},
            "ru": {"text": "Помощь", "meaning": "Help", "pron": "POH-mahshch"},
            "pt": {"text": "Ajuda", "meaning": "Help", "pron": "ah-ZHOO-dah"},
            "de": {"text": "Hilfe", "meaning": "Help", "pron": "HIL-fuh"},
            "id": {"text": "Bantuan", "meaning": "Help", "pron": "bahn-TOO-ahn"},
            "tr": {"text": "Yardım", "meaning": "Help", "pron": "yahr-DUHM"}
        }
    },
    {
        "id": "shoe", "category": "Essentials", "level": 1, "icon": "👞",
        "translations": {
            "en": {"text": "Shoe", "meaning": "Shoe / Shoes", "pron": "SHOO"},
            "es": {"text": "Zapato", "meaning": "Shoe / Shoes", "pron": "sah-PAH-toh"},
            "fr": {"text": "Chaussure", "meaning": "Shoe / Shoes", "pron": "shoh-SYOOR"},
            "ru": {"text": "Обувь", "meaning": "Shoe / Shoes", "pron": "OH-boof"},
            "pt": {"text": "Sapato", "meaning": "Shoe / Shoes", "pron": "sah-PAH-too"},
            "de": {"text": "Schuh", "meaning": "Shoe / Shoes", "pron": "SHOO"},
            "id": {"text": "Sepatu", "meaning": "Shoe / Shoes", "pron": "seh-PAH-too"},
            "tr": {"text": "Ayakkabı", "meaning": "Shoe / Shoes", "pron": "ah-yahk-kah-BUH"}
        }
    },
    {
        "id": "fruit", "category": "Food", "level": 1, "icon": "🍎",
        "translations": {
            "en": {"text": "Fruit", "meaning": "Fruit", "pron": "FROOT"},
            "es": {"text": "Fruta", "meaning": "Fruit", "pron": "FROO-tah"},
            "fr": {"text": "Fruit", "meaning": "Fruit", "pron": "FRWEE"},
            "ru": {"text": "Фрукт", "meaning": "Fruit", "pron": "FROOKT"},
            "pt": {"text": "Fruta", "meaning": "Fruit", "pron": "FROO-tah"},
            "de": {"text": "Frucht", "meaning": "Fruit", "pron": "FROOKHT"},
            "id": {"text": "Buah", "meaning": "Fruit", "pron": "BOO-ah"},
            "tr": {"text": "Meyve", "meaning": "Fruit", "pron": "may-VEH"}
        }
    },
    {
        "id": "clock", "category": "Essentials", "level": 1, "icon": "⏰",
        "translations": {
            "en": {"text": "Clock", "meaning": "Clock / Watch", "pron": "KLOK"},
            "es": {"text": "Reloj", "meaning": "Clock / Watch", "pron": "reh-LOH"},
            "fr": {"text": "Horloge", "meaning": "Clock / Watch", "pron": "ohr-LOHZH"},
            "ru": {"text": "Часы", "meaning": "Clock / Watch", "pron": "chah-SY"},
            "pt": {"text": "Relógio", "meaning": "Clock / Watch", "pron": "heh-LOH-zhyoo"},
            "de": {"text": "Uhr", "meaning": "Clock / Watch", "pron": "OOR"},
            "id": {"text": "Jam", "meaning": "Clock / Watch", "pron": "JAHM"},
            "tr": {"text": "Saat", "meaning": "Clock / Watch", "pron": "sah-AHT"}
        }
    },
    {
        "id": "grape", "category": "Food", "level": 1, "icon": "🍇",
        "translations": {
            "en": {"text": "Grape", "meaning": "Grape", "pron": "GRAYP"},
            "es": {"text": "Uva", "meaning": "Grape", "pron": "OO-bvah"},
            "fr": {"text": "Raisin", "meaning": "Grape", "pron": "reh-ZAN"},
            "ru": {"text": "Виноград", "meaning": "Grape", "pron": "vee-nah-GRAHT"},
            "pt": {"text": "Uva", "meaning": "Grape", "pron": "OO-vah"},
            "de": {"text": "Traube", "meaning": "Grape", "pron": "TROW-buh"},
            "id": {"text": "Anggur", "meaning": "Grape", "pron": "AHNG-goor"},
            "tr": {"text": "Üzüm", "meaning": "Grape", "pron": "ew-ZEWM"}
        }
    },
    {
        "id": "bird", "category": "Nature", "level": 1, "icon": "🐦",
        "translations": {
            "en": {"text": "Bird", "meaning": "Bird", "pron": "BURD"},
            "es": {"text": "Pájaro", "meaning": "Bird", "pron": "PAH-hah-roh"},
            "fr": {"text": "Oiseau", "meaning": "Bird", "pron": "wah-ZOH"},
            "ru": {"text": "Птица", "meaning": "Bird", "pron": "PTEE-tsah"},
            "pt": {"text": "Pássaro", "meaning": "Bird", "pron": "PAH-sah-roo"},
            "de": {"text": "Vogel", "meaning": "Bird", "pron": "FOH-guhl"},
            "id": {"text": "Burung", "meaning": "Bird", "pron": "BOO-roong"},
            "tr": {"text": "Kuş", "meaning": "Bird", "pron": "KOOSH"}
        }
    },
    {
        "id": "beetle", "category": "Nature", "level": 2, "icon": "🪲",
        "translations": {
            "en": {"text": "Beetle", "meaning": "Beetle / Bug", "pron": "BEE-tuhl"},
            "es": {"text": "Escarabajo", "meaning": "Beetle / Bug", "pron": "ehs-kah-rah-BAH-hoh"},
            "fr": {"text": "Scarabée", "meaning": "Beetle / Bug", "pron": "skah-rah-BAY"},
            "ru": {"text": "Жук", "meaning": "Beetle / Bug", "pron": "ZHOOK"},
            "pt": {"text": "Besouro", "meaning": "Beetle / Bug", "pron": "beh-ZOH-roo"},
            "de": {"text": "Käfer", "meaning": "Beetle / Bug", "pron": "KEH-fuhr"},
            "id": {"text": "Kumbang", "meaning": "Beetle / Bug", "pron": "KOOM-bahng"},
            "tr": {"text": "Böcek", "meaning": "Beetle / Bug", "pron": "buh-DJEK"}
        }
    },
    {
        "id": "xray", "category": "Health", "level": 2, "icon": "🩻",
        "translations": {
            "en": {"text": "X-ray", "meaning": "X-ray", "pron": "EKS-ray"},
            "es": {"text": "Rayos X", "meaning": "X-ray", "pron": "RAH-yohs EKS"},
            "fr": {"text": "Rayons X", "meaning": "X-ray", "pron": "reh-YOHN EKS"},
            "ru": {"text": "Рентген", "meaning": "X-ray", "pron": "ryen-TGYEN"},
            "pt": {"text": "Raio X", "meaning": "X-ray", "pron": "RY-oo EKS"},
            "de": {"text": "Röntgenbild", "meaning": "X-ray", "pron": "RUHN-guhn-bilt"},
            "id": {"text": "Sinar-X", "meaning": "X-ray", "pron": "SEE-nahr EKS"},
            "tr": {"text": "Röntgen", "meaning": "X-ray", "pron": "RUHN-t-gehn"}
        }
    },
    {
        "id": "xylophone", "category": "Essentials", "level": 2, "icon": "🎵",
        "translations": {
            "en": {"text": "Xylophone", "meaning": "Xylophone", "pron": "ZY-luh-fohn"},
            "es": {"text": "Xilófono", "meaning": "Xylophone", "pron": "see-LOH-foh-noh"},
            "fr": {"text": "Xylophone", "meaning": "Xylophone", "pron": "ksee-loh-FOHN"},
            "ru": {"text": "Ксилофон", "meaning": "Xylophone", "pron": "ksee-lah-FOHN"},
            "pt": {"text": "Xilofone", "meaning": "Xylophone", "pron": "see-loh-FOH-nee"},
            "de": {"text": "Xylophon", "meaning": "Xylophone", "pron": "ksee-loh-FOHN"},
            "id": {"text": "Xilofon", "meaning": "Xylophone", "pron": "ksee-loh-FOHN"},
            "tr": {"text": "Ksilofon", "meaning": "Xylophone", "pron": "ksee-loh-FOHN"}
        }
    },

    # ==========================================
    # 5. TIME & ROUTINES (Items 38 - 43)
    # ==========================================
    {
        "id": "hour", "category": "Time", "level": 1, "icon": "⏳",
        "translations": {
            "en": {"text": "Hour", "meaning": "Hour", "pron": "OW-er"},
            "es": {"text": "Hora", "meaning": "Hour", "pron": "OH-rah"},
            "fr": {"text": "Heure", "meaning": "Hour", "pron": "UHR"},
            "ru": {"text": "Час", "meaning": "Hour", "pron": "CHAHS"},
            "pt": {"text": "Hora", "meaning": "Hour", "pron": "OH-rah"},
            "de": {"text": "Stunde", "meaning": "Hour", "pron": "SHTOON-duh"},
            "id": {"text": "Jam", "meaning": "Hour", "pron": "JAHM"},
            "tr": {"text": "Saat", "meaning": "Hour", "pron": "sah-AHT"}
        }
    },
    {
        "id": "minute", "category": "Time", "level": 1, "icon": "⏱️",
        "translations": {
            "en": {"text": "Minute", "meaning": "Minute", "pron": "MIN-it"},
            "es": {"text": "Minuto", "meaning": "Minute", "pron": "mee-NOO-toh"},
            "fr": {"text": "Minute", "meaning": "Minute", "pron": "mee-NOOT"},
            "ru": {"text": "Минута", "meaning": "Minute", "pron": "mee-NOO-tah"},
            "pt": {"text": "Minuto", "meaning": "Minute", "pron": "mee-NOO-too"},
            "de": {"text": "Minute", "meaning": "Minute", "pron": "mee-NOO-tuh"},
            "id": {"text": "Menit", "meaning": "Minute", "pron": "MEH-neet"},
            "tr": {"text": "Dakika", "meaning": "Minute", "pron": "dah-kee-KAH"}
        }
    },
    {
        "id": "second", "category": "Time", "level": 1, "icon": "⚡",
        "translations": {
            "en": {"text": "Second", "meaning": "Second", "pron": "SEK-uhnd"},
            "es": {"text": "Segundo", "meaning": "Second", "pron": "seh-GOON-doh"},
            "fr": {"text": "Seconde", "meaning": "Second", "pron": "suh-GOHND"},
            "ru": {"text": "Секунда", "meaning": "Second", "pron": "sye-KOON-dah"},
            "pt": {"text": "Segundo", "meaning": "Second", "pron": "seh-GOON-doo"},
            "de": {"text": "Sekunde", "meaning": "Second", "pron": "zeh-KOON-duh"},
            "id": {"text": "Detik", "meaning": "Second", "pron": "DEH-teek"},
            "tr": {"text": "Saniye", "meaning": "Second", "pron": "sah-nee-YEH"}
        }
    },
    {
        "id": "early", "category": "Time", "level": 1, "icon": "🌅",
        "translations": {
            "en": {"text": "Early", "meaning": "Early", "pron": "UR-lee"},
            "es": {"text": "Temprano", "meaning": "Early", "pron": "tehm-PRAH-noh"},
            "fr": {"text": "Tôt", "meaning": "Early", "pron": "TOH"},
            "ru": {"text": "Рано", "meaning": "Early", "pron": "RAH-nah"},
            "pt": {"text": "Cedo", "meaning": "Early", "pron": "SEH-doo"},
            "de": {"text": "Früh", "meaning": "Early", "pron": "FREW"},
            "id": {"text": "Pagi", "meaning": "Early / Morning", "pron": "PAH-gee"},
            "tr": {"text": "Erken", "meaning": "Early", "pron": "ehr-KEHN"}
        }
    },
    {
        "id": "late", "category": "Time", "level": 1, "icon": "🌙",
        "translations": {
            "en": {"text": "Late", "meaning": "Late", "pron": "LAYT"},
            "es": {"text": "Tarde", "meaning": "Late", "pron": "TAHR-deh"},
            "fr": {"text": "En retard", "meaning": "Late", "pron": "ahn ruh-TAHR"},
            "ru": {"text": "Поздно", "meaning": "Late", "pron": "POHZ-nah"},
            "pt": {"text": "Tarde", "meaning": "Late", "pron": "TAHR-jee"},
            "de": {"text": "Spät", "meaning": "Late", "pron": "SHPEHT"},
            "id": {"text": "Siang", "meaning": "Late / Afternoon", "pron": "SEE-ahng"},
            "tr": {"text": "Geç", "meaning": "Late", "pron": "GECH"}
        }
    },
    {
        "id": "now", "category": "Time", "level": 1, "icon": "⏰",
        "translations": {
            "en": {"text": "Now", "meaning": "Now", "pron": "NOW"},
            "es": {"text": "Ahora", "meaning": "Now", "pron": "ah-OH-rah"},
            "fr": {"text": "Maintenant", "meaning": "Now", "pron": "man-tuh-NAHN"},
            "ru": {"text": "Сейчас", "meaning": "Now", "pron": "see-CHAHS"},
            "pt": {"text": "Agora", "meaning": "Now", "pron": "ah-GOH-rah"},
            "de": {"text": "Jetzt", "meaning": "Now", "pron": "YETST"},
            "id": {"text": "Sekarang", "meaning": "Now", "pron": "seh-KAH-rahng"},
            "tr": {"text": "Şimdi", "meaning": "Now", "pron": "sheem-DEE"}
        }
    },

    # ==========================================
    # 6. DESCRIPTIONS & ADJECTIVES (Items 44 - 52)
    # ==========================================
    {
        "id": "good", "category": "Descriptions", "level": 1, "icon": "👍",
        "translations": {
            "en": {"text": "Good", "meaning": "Good", "pron": "GUHD"},
            "es": {"text": "Bueno", "meaning": "Good", "pron": "BWEH-noh"},
            "fr": {"text": "Bon", "meaning": "Good", "pron": "BOHN"},
            "ru": {"text": "Хороший", "meaning": "Good", "pron": "hah-ROH-sheey"},
            "pt": {"text": "Bom", "meaning": "Good", "pron": "BOHNG"},
            "de": {"text": "Gut", "meaning": "Good", "pron": "GOOT"},
            "id": {"text": "Baik", "meaning": "Good", "pron": "BAH-eek"},
            "tr": {"text": "İyi", "meaning": "Good", "pron": "ee-YEE"}
        }
    },
    {
        "id": "bad", "category": "Descriptions", "level": 1, "icon": "👎",
        "translations": {
            "en": {"text": "Bad", "meaning": "Bad", "pron": "BAD"},
            "es": {"text": "Malo", "meaning": "Bad", "pron": "MAH-loh"},
            "fr": {"text": "Mauvais", "meaning": "Bad", "pron": "moh-VEH"},
            "ru": {"text": "Плохой", "meaning": "Bad", "pron": "plah-KHOY"},
            "pt": {"text": "Ruim", "meaning": "Bad", "pron": "hoo-EENG"},
            "de": {"text": "Schlecht", "meaning": "Bad", "pron": "SHLEHKHT"},
            "id": {"text": "Buruk", "meaning": "Bad", "pron": "BOO-rook"},
            "tr": {"text": "Kötü", "meaning": "Bad", "pron": "kuh-TEW"}
        }
    },
    {
        "id": "old", "category": "Descriptions", "level": 1, "icon": "👴",
        "translations": {
            "en": {"text": "Old", "meaning": "Old", "pron": "OHLD"},
            "es": {"text": "Viejo", "meaning": "Old", "pron": "BYEH-hoh"},
            "fr": {"text": "Vieux", "meaning": "Old", "pron": "VYUH"},
            "ru": {"text": "Старый", "meaning": "Old", "pron": "STAH-ry"},
            "pt": {"text": "Velho", "meaning": "Old", "pron": "VEH-lyoo"},
            "de": {"text": "Alt", "meaning": "Old", "pron": "AHLT"},
            "id": {"text": "Tua", "meaning": "Old", "pron": "TOO-ah"},
            "tr": {"text": "Eski", "meaning": "Old", "pron": "ehs-KEE"}
        }
    },
    {
        "id": "open", "category": "Descriptions", "level": 1, "icon": "🚪",
        "translations": {
            "en": {"text": "Open", "meaning": "Open", "pron": "OH-pen"},
            "es": {"text": "Abierto", "meaning": "Open", "pron": "ah-BYEHR-toh"},
            "fr": {"text": "Ouvert", "meaning": "Open", "pron": "oo-VEHR"},
            "ru": {"text": "Открыто", "meaning": "Open", "pron": "aht-KRY-tah"},
            "pt": {"text": "Aberto", "meaning": "Open", "pron": "ah-BEHR-too"},
            "de": {"text": "Offen", "meaning": "Open", "pron": "AWF-fuhn"},
            "id": {"text": "Buka", "meaning": "Open", "pron": "BOO-kah"},
            "tr": {"text": "Açık", "meaning": "Open", "pron": "ah-CHUK"}
        }
    },
    {
        "id": "closed", "category": "Descriptions", "level": 1, "icon": "🔒",
        "translations": {
            "en": {"text": "Closed", "meaning": "Closed", "pron": "KLOHZD"},
            "es": {"text": "Cerrado", "meaning": "Closed", "pron": "sehr-RAH-doh"},
            "fr": {"text": "Fermé", "meaning": "Closed", "pron": "fehr-MAY"},
            "ru": {"text": "Закрыто", "meaning": "Closed", "pron": "zah-KRY-tah"},
            "pt": {"text": "Fechado", "meaning": "Closed", "pron": "feh-SHAH-doo"},
            "de": {"text": "Geschlossen", "meaning": "Closed", "pron": "geh-SHLAWS-suhn"},
            "id": {"text": "Tutup", "meaning": "Closed", "pron": "TOO-toop"},
            "tr": {"text": "Kapalı", "meaning": "Closed", "pron": "kah-pah-LUH"}
        }
    },
    {
        "id": "fast", "category": "Descriptions", "level": 1, "icon": "🚀",
        "translations": {
            "en": {"text": "Fast", "meaning": "Fast", "pron": "FAST"},
            "es": {"text": "Rápido", "meaning": "Fast", "pron": "RAH-pee-doh"},
            "fr": {"text": "Rapide", "meaning": "Fast", "pron": "rah-PEED"},
            "ru": {"text": "Быстрый", "meaning": "Fast", "pron": "BY-stry"},
            "pt": {"text": "Rápido", "meaning": "Fast", "pron": "HAH-pee-doo"},
            "de": {"text": "Schnell", "meaning": "Fast", "pron": "SHNEHL"},
            "id": {"text": "Cepat", "meaning": "Fast", "pron": "cheh-PAHT"},
            "tr": {"text": "Hızlı", "meaning": "Fast", "pron": "huhz-LUH"}
        }
    },
    {
        "id": "slow", "category": "Descriptions", "level": 1, "icon": "🐢",
        "translations": {
            "en": {"text": "Slow", "meaning": "Slow", "pron": "SLOH"},
            "es": {"text": "Lento", "meaning": "Slow", "pron": "LEHN-toh"},
            "fr": {"text": "Lent", "meaning": "Slow", "pron": "LAHN"},
            "ru": {"text": "Медленный", "meaning": "Slow", "pron": "MYED-lyen-ny"},
            "pt": {"text": "Lento", "meaning": "Slow", "pron": "LEHN-too"},
            "de": {"text": "Langsam", "meaning": "Slow", "pron": "LAHNG-zahm"},
            "id": {"text": "Lambat", "meaning": "Slow", "pron": "LAHM-baht"},
            "tr": {"text": "Yavaş", "meaning": "Slow", "pron": "yah-VAHSH"}
        }
    },
    {
        "id": "happy", "category": "Descriptions", "level": 1, "icon": "😊",
        "translations": {
            "en": {"text": "Happy", "meaning": "Happy", "pron": "HAP-ee"},
            "es": {"text": "Feliz", "meaning": "Happy", "pron": "feh-LEES"},
            "fr": {"text": "Heureux", "meaning": "Happy", "pron": "uh-RUH"},
            "ru": {"text": "Счастливый", "meaning": "Happy", "pron": "schahst-LEE-vy"},
            "pt": {"text": "Feliz", "meaning": "Happy", "pron": "feh-LEEZ"},
            "de": {"text": "Glücklich", "meaning": "Happy", "pron": "GLEWK-likh"},
            "id": {"text": "Senang", "meaning": "Happy", "pron": "seh-NAHNG"},
            "tr": {"text": "Mutlu", "meaning": "Happy", "pron": "moot-LOO"}
        }
    },
    {
        "id": "ready", "category": "Descriptions", "level": 1, "icon": "✅",
        "translations": {
            "en": {"text": "Ready", "meaning": "Ready", "pron": "RED-ee"},
            "es": {"text": "Listo", "meaning": "Ready", "pron": "LEES-toh"},
            "fr": {"text": "Prêt", "meaning": "Ready", "pron": "PREH"},
            "ru": {"text": "Готов", "meaning": "Ready", "pron": "gah-TOHF"},
            "pt": {"text": "Pronto", "meaning": "Ready", "pron": "PROHN-too"},
            "de": {"text": "Bereit", "meaning": "Ready", "pron": "buh-RYT"},
            "id": {"text": "Siap", "meaning": "Ready", "pron": "SEE-ahp"},
            "tr": {"text": "Hazır", "meaning": "Ready", "pron": "hah-ZUHR"}
        }
    },

    # ==========================================
    # 7. COLORS (Items 53 - 55)
    # ==========================================
    {
        "id": "purple", "category": "Colors", "level": 1, "icon": "🟣",
        "translations": {
            "en": {"text": "Purple", "meaning": "Purple", "pron": "PUR-puhl"},
            "es": {"text": "Morado", "meaning": "Purple", "pron": "moh-RAH-doh"},
            "fr": {"text": "Violet", "meaning": "Purple", "pron": "vyoh-LEH"},
            "ru": {"text": "Фиолетовый", "meaning": "Purple", "pron": "fee-ah-LYEH-tah-vy"},
            "pt": {"text": "Roxo", "meaning": "Purple", "pron": "HOH-shoo"},
            "de": {"text": "Lila", "meaning": "Purple", "pron": "LEE-lah"},
            "id": {"text": "Ungu", "meaning": "Purple", "pron": "OON-goo"},
            "tr": {"text": "Mor", "meaning": "Purple", "pron": "MOHR"}
        }
    },
    {
        "id": "pink", "category": "Colors", "level": 1, "icon": "🌸",
        "translations": {
            "en": {"text": "Pink", "meaning": "Pink", "pron": "PINGK"},
            "es": {"text": "Rosa", "meaning": "Pink", "pron": "ROH-sah"},
            "fr": {"text": "Rose", "meaning": "Pink", "pron": "ROHZ"},
            "ru": {"text": "Розовый", "meaning": "Pink", "pron": "ROH-zah-vy"},
            "pt": {"text": "Rosa", "meaning": "Pink", "pron": "HOH-zah"},
            "de": {"text": "Rosa", "meaning": "Pink", "pron": "ROH-zah"},
            "id": {"text": "Merah muda", "meaning": "Pink", "pron": "MEH-rah MOO-dah"},
            "tr": {"text": "Pembe", "meaning": "Pink", "pron": "pehm-BEH"}
        }
    },
    {
        "id": "gray", "category": "Colors", "level": 1, "icon": "🔘",
        "translations": {
            "en": {"text": "Gray", "meaning": "Gray", "pron": "GRAY"},
            "es": {"text": "Gris", "meaning": "Gray", "pron": "GREES"},
            "fr": {"text": "Gris", "meaning": "Gray", "pron": "GREE"},
            "ru": {"text": "Серый", "meaning": "Gray", "pron": "SYEH-ry"},
            "pt": {"text": "Cinza", "meaning": "Gray", "pron": "SEEN-zah"},
            "de": {"text": "Grau", "meaning": "Gray", "pron": "GROW"},
            "id": {"text": "Abu-abu", "meaning": "Gray", "pron": "AH-boo AH-boo"},
            "tr": {"text": "Gri", "meaning": "Gray", "pron": "GREE"}
        }
    },

    # ==========================================
    # 8. TECH & COMMERCE (Items 56 - 59)
    # ==========================================
    {
        "id": "download", "category": "Tech", "level": 1, "icon": "⬇️",
        "translations": {
            "en": {"text": "Download", "meaning": "Download", "pron": "DOWN-lohd"},
            "es": {"text": "Descargar", "meaning": "Download", "pron": "dehs-kahr-GAHR"},
            "fr": {"text": "Télécharger", "meaning": "Download", "pron": "tay-lay-shahr-ZHAY"},
            "ru": {"text": "Скачать", "meaning": "Download", "pron": "skah-CHAHT"},
            "pt": {"text": "Baixar", "meaning": "Download", "pron": "by-SHAHR"},
            "de": {"text": "Herunterladen", "meaning": "Download", "pron": "heh-ROON-tuhr-lah-duhn"},
            "id": {"text": "Mengunduh", "meaning": "Download", "pron": "mehng-OON-dooh"},
            "tr": {"text": "İndirmek", "meaning": "Download", "pron": "een-deer-MEHK"}
        }
    },
    {
        "id": "discount", "category": "Shopping", "level": 1, "icon": "🏷️",
        "translations": {
            "en": {"text": "Discount", "meaning": "Discount", "pron": "DIS-kownt"},
            "es": {"text": "Descuento", "meaning": "Discount", "pron": "dehs-KWEHN-toh"},
            "fr": {"text": "Réduction", "meaning": "Discount", "pron": "ray-dook-SYOHN"},
            "ru": {"text": "Скидка", "meaning": "Discount", "pron": "SKEET-kah"},
            "pt": {"text": "Desconto", "meaning": "Discount", "pron": "dehs-KOHN-too"},
            "de": {"text": "Rabatt", "meaning": "Discount", "pron": "rah-BAHT"},
            "id": {"text": "Diskon", "meaning": "Discount", "pron": "DEES-kohn"},
            "tr": {"text": "İndirim", "meaning": "Discount", "pron": "een-dee-REEM"}
        }
    },
    {
        "id": "signature", "category": "Business", "level": 1, "icon": "✍️",
        "translations": {
            "en": {"text": "Signature", "meaning": "Signature", "pron": "SIG-nuh-cher"},
            "es": {"text": "Firma", "meaning": "Signature", "pron": "FEER-mah"},
            "fr": {"text": "Signature", "meaning": "Signature", "pron": "see-nyah-TOOR"},
            "ru": {"text": "Подпись", "meaning": "Signature", "pron": "POHT-pyees"},
            "pt": {"text": "Assinatura", "meaning": "Signature", "pron": "ah-see-nah-TOO-rah"},
            "de": {"text": "Unterschrift", "meaning": "Signature", "pron": "OON-tuhr-shrift"},
            "id": {"text": "Tanda tangan", "meaning": "Signature", "pron": "TAHN-dah TAHN-gahn"},
            "tr": {"text": "İmza", "meaning": "Signature", "pron": "eem-ZAH"}
        }
    },
    {
        "id": "colleague", "category": "Business", "level": 1, "icon": "🤝",
        "translations": {
            "en": {"text": "Colleague", "meaning": "Colleague", "pron": "KOL-eeg"},
            "es": {"text": "Colega", "meaning": "Colleague", "pron": "koh-LEH-gah"},
            "fr": {"text": "Collègue", "meaning": "Colleague", "pron": "kohl-LEHG"},
            "ru": {"text": "Коллега", "meaning": "Colleague", "pron": "kah-LYEH-gah"},
            "pt": {"text": "Colega", "meaning": "Colleague", "pron": "koh-LEH-gah"},
            "de": {"text": "Kollege", "meaning": "Colleague", "pron": "kawl-LEH-guh"},
            "id": {"text": "Rekan kerja", "meaning": "Colleague", "pron": "REH-kahn KEHR-jah"},
            "tr": {"text": "İş arkadaşı", "meaning": "Colleague", "pron": "EESH ahr-kah-dah-SHUH"}
        }
    },

    # ==========================================
    # 9. FOUNDATIONAL VERBS (Items 60 - 71)
    # ==========================================
    {
        "id": "to_learn", "category": "Verbs", "level": 1, "icon": "📚",
        "translations": {
            "en": {"text": "To learn", "meaning": "To learn", "pron": "too LURN"},
            "es": {"text": "Aprender", "meaning": "To learn", "pron": "ah-prehn-DEHR"},
            "fr": {"text": "Apprendre", "meaning": "To learn", "pron": "ah-PRAHN-druh"},
            "ru": {"text": "Учиться", "meaning": "To learn", "pron": "oo-CHEET-syah"},
            "pt": {"text": "Aprender", "meaning": "To learn", "pron": "ah-prehn-DEHR"},
            "de": {"text": "Lernen", "meaning": "To learn", "pron": "LEHR-nuhn"},
            "id": {"text": "Belajar", "meaning": "To learn", "pron": "beh-LAH-jahr"},
            "tr": {"text": "Öğrenmek", "meaning": "To learn", "pron": "oy-rehn-MEHK"}
        }
    },
    {
        "id": "to_speak", "category": "Verbs", "level": 1, "icon": "🗣️",
        "translations": {
            "en": {"text": "To speak", "meaning": "To speak", "pron": "too SPEEK"},
            "es": {"text": "Hablar", "meaning": "To speak", "pron": "ah-BLAHR"},
            "fr": {"text": "Parler", "meaning": "To speak", "pron": "pahr-LAY"},
            "ru": {"text": "Говорить", "meaning": "To speak", "pron": "gah-vah-REET"},
            "pt": {"text": "Falar", "meaning": "To speak", "pron": "fah-LAHR"},
            "de": {"text": "Sprechen", "meaning": "To speak", "pron": "SHPREH-khuhn"},
            "id": {"text": "Berbicara", "meaning": "To speak", "pron": "behr-bee-CHAH-rah"},
            "tr": {"text": "Konuşmak", "meaning": "To speak", "pron": "koh-noosh-MAHK"}
        }
    },
    {
        "id": "to_eat", "category": "Verbs", "level": 1, "icon": "🍽️",
        "translations": {
            "en": {"text": "To eat", "meaning": "To eat", "pron": "too EET"},
            "es": {"text": "Comer", "meaning": "To eat", "pron": "koh-MEHR"},
            "fr": {"text": "Manger", "meaning": "To eat", "pron": "mahn-ZHAY"},
            "ru": {"text": "Есть", "meaning": "To eat", "pron": "YEST"},
            "pt": {"text": "Comer", "meaning": "To eat", "pron": "koh-MEHR"},
            "de": {"text": "Essen", "meaning": "To eat", "pron": "EHS-suhn"},
            "id": {"text": "Makan", "meaning": "To eat", "pron": "MAH-kahn"},
            "tr": {"text": "Yemek", "meaning": "To eat", "pron": "yeh-MEHK"}
        }
    },
    {
        "id": "to_drink", "category": "Verbs", "level": 1, "icon": "🥤",
        "translations": {
            "en": {"text": "To drink", "meaning": "To drink", "pron": "too DRINGK"},
            "es": {"text": "Beber", "meaning": "To drink", "pron": "beh-BVEHR"},
            "fr": {"text": "Boire", "meaning": "To drink", "pron": "BWAHR"},
            "ru": {"text": "Пить", "meaning": "To drink", "pron": "PEET"},
            "pt": {"text": "Beber", "meaning": "To drink", "pron": "beh-BEHR"},
            "de": {"text": "Trinken", "meaning": "To drink", "pron": "TRING-kuhn"},
            "id": {"text": "Minum", "meaning": "To drink", "pron": "MEE-noom"},
            "tr": {"text": "İçmek", "meaning": "To drink", "pron": "eech-MEHK"}
        }
    },
    {
        "id": "to_go", "category": "Verbs", "level": 1, "icon": "🚶",
        "translations": {
            "en": {"text": "To go", "meaning": "To go", "pron": "too GOH"},
            "es": {"text": "Ir", "meaning": "To go", "pron": "EER"},
            "fr": {"text": "Aller", "meaning": "To go", "pron": "ah-LAY"},
            "ru": {"text": "Идти", "meaning": "To go", "pron": "eet-TEE"},
            "pt": {"text": "Ir", "meaning": "To go", "pron": "EER"},
            "de": {"text": "Gehen", "meaning": "To go", "pron": "GAY-uhn"},
            "id": {"text": "Pergi", "meaning": "To go", "pron": "pehr-GEE"},
            "tr": {"text": "Gitmek", "meaning": "To go", "pron": "geet-MEHK"}
        }
    },
    {
        "id": "to_come", "category": "Verbs", "level": 1, "icon": "🚶‍♂️",
        "translations": {
            "en": {"text": "To come", "meaning": "To come", "pron": "too KUHM"},
            "es": {"text": "Venir", "meaning": "To come", "pron": "beh-NEER"},
            "fr": {"text": "Venir", "meaning": "To come", "pron": "vuh-NEER"},
            "ru": {"text": "Приходить", "meaning": "To come", "pron": "pree-khah-DEET"},
            "pt": {"text": "Vir", "meaning": "To come", "pron": "VEER"},
            "de": {"text": "Kommen", "meaning": "To come", "pron": "KAW-muhn"},
            "id": {"text": "Datang", "meaning": "To come", "pron": "DAH-tahng"},
            "tr": {"text": "Gelmek", "meaning": "To come", "pron": "gehl-MEHK"}
        }
    },
    {
        "id": "to_understand", "category": "Verbs", "level": 1, "icon": "💡",
        "translations": {
            "en": {"text": "To understand", "meaning": "To understand", "pron": "too uhn-der-STAND"},
            "es": {"text": "Entender", "meaning": "To understand", "pron": "ehn-tehn-DEHR"},
            "fr": {"text": "Comprendre", "meaning": "To understand", "pron": "kohm-PRAHN-druh"},
            "ru": {"text": "Понимать", "meaning": "To understand", "pron": "pah-nee-MAHT"},
            "pt": {"text": "Entender", "meaning": "To understand", "pron": "ehn-tehn-DEHR"},
            "de": {"text": "Verstehen", "meaning": "To understand", "pron": "fehr-SHTAY-uhn"},
            "id": {"text": "Mengerti", "meaning": "To understand", "pron": "mehng-EHR-tee"},
            "tr": {"text": "Anlamak", "meaning": "To understand", "pron": "ahn-lah-MAHK"}
        }
    },
    {
        "id": "to_know", "category": "Verbs", "level": 1, "icon": "🧠",
        "translations": {
            "en": {"text": "To know", "meaning": "To know", "pron": "too NOH"},
            "es": {"text": "Saber", "meaning": "To know", "pron": "sah-BVEHR"},
            "fr": {"text": "Savoir", "meaning": "To know", "pron": "sah-VWAHR"},
            "ru": {"text": "Знать", "meaning": "To know", "pron": "ZNAHT"},
            "pt": {"text": "Saber", "meaning": "To know", "pron": "sah-BEHR"},
            "de": {"text": "Wissen", "meaning": "To know", "pron": "VIS-suhn"},
            "id": {"text": "Tahu", "meaning": "To know", "pron": "TAH-hoo"},
            "tr": {"text": "Bilmek", "meaning": "To know", "pron": "beel-MEHK"}
        }
    },
    {
        "id": "to_buy", "category": "Verbs", "level": 1, "icon": "🛍️",
        "translations": {
            "en": {"text": "To buy", "meaning": "To buy", "pron": "too BY"},
            "es": {"text": "Comprar", "meaning": "To buy", "pron": "kohm-PRAHR"},
            "fr": {"text": "Acheter", "meaning": "To buy", "pron": "ahsh-TAY"},
            "ru": {"text": "Покупать", "meaning": "To buy", "pron": "pah-koo-PAHT"},
            "pt": {"text": "Comprar", "meaning": "To buy", "pron": "kohm-PRAHR"},
            "de": {"text": "Kaufen", "meaning": "To buy", "pron": "KOW-fuhn"},
            "id": {"text": "Membeli", "meaning": "To buy", "pron": "mehm-BEH-lee"},
            "tr": {"text": "Satın almak", "meaning": "To buy", "pron": "sah-TUHN ahl-MAHK"}
        }
    },
    {
        "id": "to_help", "category": "Verbs", "level": 1, "icon": "🤝",
        "translations": {
            "en": {"text": "To help", "meaning": "To help", "pron": "too HELP"},
            "es": {"text": "Ayudar", "meaning": "To help", "pron": "ah-yoo-DAHR"},
            "fr": {"text": "Aider", "meaning": "To help", "pron": "ay-DAY"},
            "ru": {"text": "Помогать", "meaning": "To help", "pron": "pah-mah-GAHT"},
            "pt": {"text": "Ajudar", "meaning": "To help", "pron": "ah-zhoo-DAHR"},
            "de": {"text": "Helfen", "meaning": "To help", "pron": "HEHL-fuhn"},
            "id": {"text": "Membantu", "meaning": "To help", "pron": "mehm-BAHN-too"},
            "tr": {"text": "Yardım etmek", "meaning": "To help", "pron": "yahr-DUHM eht-MEHK"}
        }
    },
    {
        "id": "to_work", "category": "Verbs", "level": 1, "icon": "💼",
        "translations": {
            "en": {"text": "To work", "meaning": "To work", "pron": "too WURK"},
            "es": {"text": "Trabajar", "meaning": "To work", "pron": "trah-bah-HAHR"},
            "fr": {"text": "Travailler", "meaning": "To work", "pron": "trah-vah-YAY"},
            "ru": {"text": "Работать", "meaning": "To work", "pron": "rah-BOH-taht"},
            "pt": {"text": "Trabalhar", "meaning": "To work", "pron": "trah-bah-LYAHR"},
            "de": {"text": "Arbeiten", "meaning": "To work", "pron": "AHR-by-tuhn"},
            "id": {"text": "Bekerja", "meaning": "To work", "pron": "beh-KEHR-jah"},
            "tr": {"text": "Çalışmak", "meaning": "To work", "pron": "chah-lush-MAHK"}
        }
    },
    {
        "id": "to_want", "category": "Verbs", "level": 1, "icon": "💭",
        "translations": {
            "en": {"text": "To want", "meaning": "To want", "pron": "too WAHNT"},
            "es": {"text": "Querer", "meaning": "To want", "pron": "keh-REHR"},
            "fr": {"text": "Vouloir", "meaning": "To want", "pron": "voo-LWAHR"},
            "ru": {"text": "Хотеть", "meaning": "To want", "pron": "khah-TYEHT"},
            "pt": {"text": "Querer", "meaning": "To want", "pron": "keh-REHR"},
            "de": {"text": "Wollen", "meaning": "To want", "pron": "VAW-luhn"},
            "id": {"text": "Ingin", "meaning": "To want", "pron": "EENG-een"},
            "tr": {"text": "İstemek", "meaning": "To want", "pron": "ees-teh-MEHK"}
        }
    }
]

def clean_key(phrase: str) -> str:
    cleaned = re.sub(r"\s*\([^)]*\)\s*", "", phrase)
    cleaned = re.sub(r"[?.,!¡¿\'’\"«»:]", "", cleaned).strip()
    return cleaned.lower()

def clean_stem(w: str, lang: str) -> str:
    raw_lower = w.replace('İ', 'i').replace('I', 'ı').lower() if lang == 'tr' else w.lower()
    raw_clean = re.sub(r'\s*\([^)]*\)\s*', '', raw_lower)
    raw_clean = re.sub(r'[?.,!¡¿\'’\"«»:]', '', raw_clean).strip()
    return re.sub(r'\s+', '_', raw_clean)

def verify_audio_parity():
    """Verify that every single word in VOCABULARY_ITEMS has an mp3 on disk in all 8 languages."""
    print("Verifying 100% audio parity across all 8 languages...")
    audio_map = {l: set(p.stem.lower() for p in Path(f"public/audio/{l}").glob("**/*.mp3")) for l in LANG_FILES}
    
    missing = []
    for item in VOCABULARY_ITEMS:
        for l in LANG_FILES:
            w = item["translations"][l]["text"]
            stem = clean_stem(w, l)
            if stem not in audio_map[l]:
                missing.append((item["id"], l, w, stem))
    
    if missing:
        print(f"CRITICAL ERROR: {len(missing)} audio files missing!")
        for item_id, l, w, stem in missing:
            print(f"  Missing: item={item_id}, lang={l}, text='{w}', stem='{stem}'")
        sys.exit(1)
    
    total_checks = len(VOCABULARY_ITEMS) * len(LANG_FILES)
    print(f"Success: 100% audio parity verified! ({total_checks}/{total_checks} audio files present on disk)")

def update_language_file(lang: str):
    file_path = LANG_FILES[lang]
    if not file_path.exists():
        print(f"Error: {file_path} not found!")
        return 0

    content = file_path.read_text(encoding="utf-8")
    is_ru = (lang == "ru")

    # Remove any existing Batch 4 additions first to guarantee clean idempotence
    content = re.sub(r"\n\s*// Batch 4: Foundational Verbs, Questions, City, Travel, Adjectives & Parity[\s\S]*?(?=\n\];)", "", content)

    # Extract existing phrases from the entire file before Batch 4
    existing_phrases = set()
    for m in re.finditer(r"(?:phrase|russian|word):\s*['\"]([^'\"]+)['\"]", content):
        existing_phrases.add(clean_key(m.group(1)))

    new_entries = []
    for item in VOCABULARY_ITEMS:
        trans = item["translations"].get(lang)
        if not trans:
            continue
        text = trans["text"]
        if clean_key(text) in existing_phrases:
            continue

        meaning = trans["meaning"]
        pron = trans["pron"]
        cat = item["category"]
        level = item["level"]
        icon = item["icon"]

        safe_text = text.replace("'", "\\'")
        safe_meaning = meaning.replace("'", "\\'")
        safe_pron = pron.replace("'", "\\'")

        if is_ru:
            entry = f"  {{ russian: '{safe_text}', english: '{safe_meaning}', pronunciation: '{safe_pron}', category: '{cat}', level: {level}, icon: '{icon}' }},"
        else:
            entry = f"  {{ phrase: '{safe_text}', translation: '{safe_meaning}', pronunciation: '{safe_pron}', category: '{cat}', level: {level}, icon: '{icon}' }},"
        new_entries.append(entry)
        existing_phrases.add(clean_key(text))

    if not new_entries:
        print(f"[{lang.upper()}] No new entries to add (already up-to-date).")
        file_path.write_text(content, encoding="utf-8")
        return 0

    # Find commonWords array and append before its closing bracket
    match = re.search(r"(const commonWords[^=]*=\s*\[)(.*?)(\n\];)", content, re.DOTALL)
    if not match:
        print(f"[{lang.upper()}] Could not locate commonWords array in {file_path}!")
        return 0

    before_header = match.group(1)
    array_body = match.group(2).rstrip()
    after_bracket = match.group(3)

    if not array_body.endswith(','):
        array_body += ','

    addition = "\n  // Batch 4: Foundational Verbs, Questions, City, Travel, Adjectives & Parity\n" + "\n".join(new_entries)
    new_content = content[:match.start()] + before_header + array_body + addition + after_bracket + content[match.end():]

    file_path.write_text(new_content, encoding="utf-8")
    print(f"[{lang.upper()}] Added {len(new_entries)} new Wave 4 words!")
    return len(new_entries)

def main():
    print("=== Expanding Wave 4 Vocabulary across 8 Languages ===")
    verify_audio_parity()
    counts = {}
    for lang in LANG_FILES:
        counts[lang] = update_language_file(lang)
    print("=== Summary of Wave 4 Words Added ===")
    for lang, cnt in counts.items():
        print(f"  {lang.upper()}: +{cnt} words (+{cnt * 2} quiz questions)")
    print("=== Wave 4 Vocabulary Expansion Complete! ===")

if __name__ == "__main__":
    main()
