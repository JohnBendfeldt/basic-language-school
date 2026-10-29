#!/usr/bin/env python3
"""
Batch 2 Vocabulary Expansion: High-Yield Everyday Vocabulary & 8-Language Parity
Expands all 8 supported language courses with core foundational vocabulary
(Food, Places, Travel, People, Home, Nature, Descriptions) across:
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

# 82 High-Yield Everyday Words with 100% verified neural audio in all 8 languages
VOCABULARY_ITEMS = [
    # ==========================================
    # PEOPLE & FAMILY (Items 1 - 12)
    # ==========================================
    {
        "id": "man", "category": "People", "level": 1, "icon": "👨",
        "translations": {
            "en": {"text": "Man", "meaning": "Man", "pron": "MAHN"},
            "es": {"text": "Hombre", "meaning": "Man", "pron": "OHM-breh"},
            "fr": {"text": "Homme", "meaning": "Man", "pron": "UHM"},
            "ru": {"text": "Мужчина", "meaning": "Man", "pron": "moozh-CHEE-nah"},
            "pt": {"text": "Homem", "meaning": "Man", "pron": "OH-men"},
            "de": {"text": "Mann", "meaning": "Man", "pron": "MAHN"},
            "id": {"text": "Pria", "meaning": "Man", "pron": "PREE-ah"},
            "tr": {"text": "Erkek", "meaning": "Man", "pron": "ehr-KEK"}
        }
    },
    {
        "id": "woman", "category": "People", "level": 1, "icon": "👩",
        "translations": {
            "en": {"text": "Woman", "meaning": "Woman", "pron": "WUU-muhn"},
            "es": {"text": "Mujer", "meaning": "Woman", "pron": "moo-HEHR"},
            "fr": {"text": "Femme", "meaning": "Woman", "pron": "FAHM"},
            "ru": {"text": "Женщина", "meaning": "Woman", "pron": "ZHEN-shee-nah"},
            "pt": {"text": "Mulher", "meaning": "Woman", "pron": "mool-YEHR"},
            "de": {"text": "Frau", "meaning": "Woman", "pron": "FROW"},
            "id": {"text": "Wanita", "meaning": "Woman", "pron": "wah-NEE-tah"},
            "tr": {"text": "Kadın", "meaning": "Woman", "pron": "kah-DUHN"}
        }
    },
    {
        "id": "child", "category": "People", "level": 1, "icon": "🧒",
        "translations": {
            "en": {"text": "Child", "meaning": "Child", "pron": "CHYLD"},
            "es": {"text": "Niño / Niña", "meaning": "Child", "pron": "NEE-nyoh / NEE-nyah"},
            "fr": {"text": "Enfant", "meaning": "Child", "pron": "ahn-FAHN"},
            "ru": {"text": "Ребёнок", "meaning": "Child", "pron": "rye-BYOH-nahk"},
            "pt": {"text": "Criança", "meaning": "Child", "pron": "kree-AHN-sah"},
            "de": {"text": "Kind", "meaning": "Child", "pron": "KINT"},
            "id": {"text": "Anak", "meaning": "Child", "pron": "AH-nahk"},
            "tr": {"text": "Çocuk", "meaning": "Child", "pron": "choh-JOOK"}
        }
    },
    {
        "id": "boy", "category": "People", "level": 1, "icon": "👦",
        "translations": {
            "en": {"text": "Boy", "meaning": "Boy", "pron": "BOHY"},
            "es": {"text": "Niño / Chico", "meaning": "Boy", "pron": "NEE-nyoh / CHEE-koh"},
            "fr": {"text": "Garçon", "meaning": "Boy", "pron": "gahr-SOHN"},
            "ru": {"text": "Мальчик", "meaning": "Boy", "pron": "MAHL-cheek"},
            "pt": {"text": "Menino", "meaning": "Boy", "pron": "meh-NEE-noo"},
            "de": {"text": "Junge", "meaning": "Boy", "pron": "YOON-guh"},
            "id": {"text": "Anak laki-laki", "meaning": "Boy", "pron": "AH-nahk LAH-kee LAH-kee"},
            "tr": {"text": "Erkek çocuk", "meaning": "Boy", "pron": "ehr-KEK choh-JOOK"}
        }
    },
    {
        "id": "girl", "category": "People", "level": 1, "icon": "👧",
        "translations": {
            "en": {"text": "Girl", "meaning": "Girl", "pron": "GURL"},
            "es": {"text": "Niña / Chica", "meaning": "Girl", "pron": "NEE-nyah / CHEE-kah"},
            "fr": {"text": "Fille", "meaning": "Girl", "pron": "FEEY"},
            "ru": {"text": "Девочка", "meaning": "Girl", "pron": "DYE-vahch-kah"},
            "pt": {"text": "Menina", "meaning": "Girl", "pron": "meh-NEE-nah"},
            "de": {"text": "Mädchen", "meaning": "Girl", "pron": "MAYT-khen"},
            "id": {"text": "Anak perempuan", "meaning": "Girl", "pron": "AH-nahk peh-rehm-POO-ahn"},
            "tr": {"text": "Kız çocuk", "meaning": "Girl", "pron": "KUZ choh-JOOK"}
        }
    },
    {
        "id": "father", "category": "Family", "level": 1, "icon": "👨",
        "translations": {
            "en": {"text": "Father", "meaning": "Father", "pron": "FAH-dher"},
            "es": {"text": "Padre", "meaning": "Father", "pron": "PAH-dreh"},
            "fr": {"text": "Père", "meaning": "Father", "pron": "PEHR"},
            "ru": {"text": "Отец", "meaning": "Father", "pron": "ah-TYETS"},
            "pt": {"text": "Pai", "meaning": "Father", "pron": "PY"},
            "de": {"text": "Vater", "meaning": "Father", "pron": "FAH-tuhr"},
            "id": {"text": "Ayah", "meaning": "Father", "pron": "AH-yah"},
            "tr": {"text": "Baba", "meaning": "Father", "pron": "bah-BAH"}
        }
    },
    {
        "id": "mother", "category": "Family", "level": 1, "icon": "👩",
        "translations": {
            "en": {"text": "Mother", "meaning": "Mother", "pron": "MUH-dher"},
            "es": {"text": "Madre", "meaning": "Mother", "pron": "MAH-dreh"},
            "fr": {"text": "Mère", "meaning": "Mother", "pron": "MEHR"},
            "ru": {"text": "Мать", "meaning": "Mother", "pron": "MAHT"},
            "pt": {"text": "Mãe", "meaning": "Mother", "pron": "MY"},
            "de": {"text": "Mutter", "meaning": "Mother", "pron": "MOO-tuhr"},
            "id": {"text": "Ibu", "meaning": "Mother", "pron": "EE-boo"},
            "tr": {"text": "Anne", "meaning": "Mother", "pron": "ahn-NEH"}
        }
    },
    {
        "id": "husband", "category": "Family", "level": 2, "icon": "💍",
        "translations": {
            "en": {"text": "Husband", "meaning": "Husband", "pron": "HUZ-buhnd"},
            "es": {"text": "Esposo / Marido", "meaning": "Husband", "pron": "ehs-POH-soh / mah-REE-doh"},
            "fr": {"text": "Mari", "meaning": "Husband", "pron": "mah-REE"},
            "ru": {"text": "Муж", "meaning": "Husband", "pron": "MOOZH"},
            "pt": {"text": "Marido", "meaning": "Husband", "pron": "mah-REE-doo"},
            "de": {"text": "Ehemann", "meaning": "Husband", "pron": "AY-uh-mahn"},
            "id": {"text": "Suami", "meaning": "Husband", "pron": "swah-MEE"},
            "tr": {"text": "Eş / Koca", "meaning": "Husband", "pron": "ESH / koh-JAH"}
        }
    },
    {
        "id": "wife", "category": "Family", "level": 2, "icon": "💍",
        "translations": {
            "en": {"text": "Wife", "meaning": "Wife", "pron": "WYF"},
            "es": {"text": "Esposa / Mujer", "meaning": "Wife", "pron": "ehs-POH-sah / moo-HEHR"},
            "fr": {"text": "Femme / Épouse", "meaning": "Wife", "pron": "FAHM / ay-POOZ"},
            "ru": {"text": "Жена", "meaning": "Wife", "pron": "zheh-NAH"},
            "pt": {"text": "Esposa", "meaning": "Wife", "pron": "ehs-POH-zah"},
            "de": {"text": "Ehefrau", "meaning": "Wife", "pron": "AY-uh-frow"},
            "id": {"text": "Istri", "meaning": "Wife", "pron": "ees-TREE"},
            "tr": {"text": "Eş / Karı", "meaning": "Wife", "pron": "ESH / kah-RUH"}
        }
    },
    {
        "id": "teacher", "category": "People", "level": 2, "icon": "🧑‍🏫",
        "translations": {
            "en": {"text": "Teacher", "meaning": "Teacher", "pron": "TEE-cher"},
            "es": {"text": "Profesor / Maestro", "meaning": "Teacher", "pron": "proh-feh-SOHR / mah-EHS-troh"},
            "fr": {"text": "Enseignant", "meaning": "Teacher", "pron": "ahn-seh-NYAHN"},
            "ru": {"text": "Учитель", "meaning": "Teacher", "pron": "oo-CHEE-tyel"},
            "pt": {"text": "Professor", "meaning": "Teacher", "pron": "proh-feh-SOHR"},
            "de": {"text": "Lehrer", "meaning": "Teacher", "pron": "LAY-ruhr"},
            "id": {"text": "Guru", "meaning": "Teacher", "pron": "GOO-roo"},
            "tr": {"text": "Öğretmen", "meaning": "Teacher", "pron": "uh-ret-MEN"}
        }
    },
    {
        "id": "student", "category": "People", "level": 2, "icon": "🧑‍🎓",
        "translations": {
            "en": {"text": "Student", "meaning": "Student", "pron": "STOO-duhnt"},
            "es": {"text": "Estudiante / Alumno", "meaning": "Student", "pron": "ehs-too-DYAHN-teh / ah-LOOM-noh"},
            "fr": {"text": "Étudiant", "meaning": "Student", "pron": "ay-too-DYAHN"},
            "ru": {"text": "Студент", "meaning": "Student", "pron": "stoo-DYENT"},
            "pt": {"text": "Estudante", "meaning": "Student", "pron": "ehs-too-DAHN-chee"},
            "de": {"text": "Student", "meaning": "Student", "pron": "shtoo-DENT"},
            "id": {"text": "Pelajar", "meaning": "Student", "pron": "peh-LAH-jahr"},
            "tr": {"text": "Öğrenci", "meaning": "Student", "pron": "uh-ren-JEE"}
        }
    },
    {
        "id": "doctor", "category": "People", "level": 2, "icon": "🧑‍⚕️",
        "translations": {
            "en": {"text": "Doctor", "meaning": "Doctor", "pron": "DAHK-ter"},
            "es": {"text": "Médico / Doctor", "meaning": "Doctor", "pron": "MEH-dee-koh / dohk-TOHR"},
            "fr": {"text": "Médecin / Docteur", "meaning": "Doctor", "pron": "mayd-SAHN / dohk-TUHR"},
            "ru": {"text": "Врач / Доктор", "meaning": "Doctor", "pron": "VRAHCH / DOHK-tuhr"},
            "pt": {"text": "Médico", "meaning": "Doctor", "pron": "MEH-dee-koo"},
            "de": {"text": "Arzt", "meaning": "Doctor", "pron": "AHRTS"},
            "id": {"text": "Dokter", "meaning": "Doctor", "pron": "DOHK-tehr"},
            "tr": {"text": "Doktor", "meaning": "Doctor", "pron": "dohk-TOHR"}
        }
    },

    # ==========================================
    # FOOD & DRINK (Items 13 - 30)
    # ==========================================
    {
        "id": "bread", "category": "Food", "level": 1, "icon": "🍞",
        "translations": {
            "en": {"text": "Bread", "meaning": "Bread", "pron": "BRED"},
            "es": {"text": "Pan", "meaning": "Bread", "pron": "PAHN"},
            "fr": {"text": "Pain", "meaning": "Bread", "pron": "PAN"},
            "ru": {"text": "Хлеб", "meaning": "Bread", "pron": "KHLEP"},
            "pt": {"text": "Pão", "meaning": "Bread", "pron": "POHN"},
            "de": {"text": "Brot", "meaning": "Bread", "pron": "BROHT"},
            "id": {"text": "Roti", "meaning": "Bread", "pron": "ROH-tee"},
            "tr": {"text": "Ekmek", "meaning": "Bread", "pron": "ek-MEK"}
        }
    },
    {
        "id": "milk", "category": "Food", "level": 1, "icon": "🥛",
        "translations": {
            "en": {"text": "Milk", "meaning": "Milk", "pron": "MILK"},
            "es": {"text": "Leche", "meaning": "Milk", "pron": "LEH-cheh"},
            "fr": {"text": "Lait", "meaning": "Milk", "pron": "LEH"},
            "ru": {"text": "Молоко", "meaning": "Milk", "pron": "mah-lah-KOH"},
            "pt": {"text": "Leite", "meaning": "Milk", "pron": "LAY-chee"},
            "de": {"text": "Milch", "meaning": "Milk", "pron": "MILKH"},
            "id": {"text": "Susu", "meaning": "Milk", "pron": "SOO-soo"},
            "tr": {"text": "Süt", "meaning": "Milk", "pron": "SEET"}
        }
    },
    {
        "id": "meat", "category": "Food", "level": 1, "icon": "🥩",
        "translations": {
            "en": {"text": "Meat", "meaning": "Meat", "pron": "MEET"},
            "es": {"text": "Carne", "meaning": "Meat", "pron": "KAHR-neh"},
            "fr": {"text": "Viande", "meaning": "Meat", "pron": "vee-AHND"},
            "ru": {"text": "Мясо", "meaning": "Meat", "pron": "MYAH-sah"},
            "pt": {"text": "Carne", "meaning": "Meat", "pron": "KAHR-nee"},
            "de": {"text": "Fleisch", "meaning": "Meat", "pron": "FLYSH"},
            "id": {"text": "Daging", "meaning": "Meat", "pron": "DAH-geeng"},
            "tr": {"text": "Et", "meaning": "Meat", "pron": "ET"}
        }
    },
    {
        "id": "fish", "category": "Food", "level": 1, "icon": "🐟",
        "translations": {
            "en": {"text": "Fish", "meaning": "Fish", "pron": "FISH"},
            "es": {"text": "Pescado", "meaning": "Fish", "pron": "pehs-KAH-doh"},
            "fr": {"text": "Poisson", "meaning": "Fish", "pron": "pwah-SOHN"},
            "ru": {"text": "Рыба", "meaning": "Fish", "pron": "RY-bah"},
            "pt": {"text": "Peixe", "meaning": "Fish", "pron": "PAY-shee"},
            "de": {"text": "Fisch", "meaning": "Fish", "pron": "FISH"},
            "id": {"text": "Ikan", "meaning": "Fish", "pron": "EE-kahn"},
            "tr": {"text": "Balık", "meaning": "Fish", "pron": "bah-LUK"}
        }
    },
    {
        "id": "vegetables", "category": "Food", "level": 1, "icon": "🥦",
        "translations": {
            "en": {"text": "Vegetables", "meaning": "Vegetables", "pron": "VEJ-tuh-buhlz"},
            "es": {"text": "Verduras", "meaning": "Vegetables", "pron": "bvehr-DOO-rahs"},
            "fr": {"text": "Légumes", "meaning": "Vegetables", "pron": "lay-GOOM"},
            "ru": {"text": "Овощи", "meaning": "Vegetables", "pron": "OH-vah-shee"},
            "pt": {"text": "Legumes", "meaning": "Vegetables", "pron": "leh-GOO-mees"},
            "de": {"text": "Gemüse", "meaning": "Vegetables", "pron": "guh-MYOO-zuh"},
            "id": {"text": "Sayuran", "meaning": "Vegetables", "pron": "sah-YOO-rahn"},
            "tr": {"text": "Sebzeler", "meaning": "Vegetables", "pron": "seb-zeh-LEHR"}
        }
    },
    {
        "id": "fruits", "category": "Food", "level": 1, "icon": "🍎",
        "translations": {
            "en": {"text": "Fruits", "meaning": "Fruits", "pron": "FROOTS"},
            "es": {"text": "Frutas", "meaning": "Fruits", "pron": "FROO-tahs"},
            "fr": {"text": "Fruits", "meaning": "Fruits", "pron": "FRWEE"},
            "ru": {"text": "Фрукты", "meaning": "Fruits", "pron": "FROOK-ty"},
            "pt": {"text": "Frutas", "meaning": "Fruits", "pron": "FROO-tahs"},
            "de": {"text": "Obst", "meaning": "Fruits", "pron": "OHPST"},
            "id": {"text": "Buah-buahan", "meaning": "Fruits", "pron": "BWAH-BWAH-ahn"},
            "tr": {"text": "Meyveler", "meaning": "Fruits", "pron": "mey-veh-LEHR"}
        }
    },
    {
        "id": "rice", "category": "Food", "level": 1, "icon": "🍚",
        "translations": {
            "en": {"text": "Rice", "meaning": "Rice", "pron": "RYS"},
            "es": {"text": "Arroz", "meaning": "Rice", "pron": "ah-RROHS"},
            "fr": {"text": "Riz", "meaning": "Rice", "pron": "REE"},
            "ru": {"text": "Рис", "meaning": "Rice", "pron": "REES"},
            "pt": {"text": "Arroz", "meaning": "Rice", "pron": "ah-RROHZ"},
            "de": {"text": "Reis", "meaning": "Rice", "pron": "RYS"},
            "id": {"text": "Nasi", "meaning": "Rice", "pron": "NAH-see"},
            "tr": {"text": "Pirinç", "meaning": "Rice", "pron": "pee-REENCH"}
        }
    },
    {
        "id": "tea", "category": "Food", "level": 1, "icon": "🍵",
        "translations": {
            "en": {"text": "Tea", "meaning": "Tea", "pron": "TEE"},
            "es": {"text": "Té", "meaning": "Tea", "pron": "TEH"},
            "fr": {"text": "Thé", "meaning": "Tea", "pron": "TAY"},
            "ru": {"text": "Чай", "meaning": "Tea", "pron": "CHYE"},
            "pt": {"text": "Chá", "meaning": "Tea", "pron": "SHAH"},
            "de": {"text": "Tee", "meaning": "Tea", "pron": "TAY"},
            "id": {"text": "Teh", "meaning": "Tea", "pron": "TEH"},
            "tr": {"text": "Çay", "meaning": "Tea", "pron": "CHY"}
        }
    },
    {
        "id": "beer", "category": "Food", "level": 1, "icon": "🍺",
        "translations": {
            "en": {"text": "Beer", "meaning": "Beer", "pron": "BEER"},
            "es": {"text": "Cerveza", "meaning": "Beer", "pron": "sehr-BVEH-sah"},
            "fr": {"text": "Bière", "meaning": "Beer", "pron": "BYEHR"},
            "ru": {"text": "Пиво", "meaning": "Beer", "pron": "PEE-vah"},
            "pt": {"text": "Cerveja", "meaning": "Beer", "pron": "sehr-VEH-zhah"},
            "de": {"text": "Bier", "meaning": "Beer", "pron": "BEER"},
            "id": {"text": "Bir", "meaning": "Beer", "pron": "BEER"},
            "tr": {"text": "Bira", "meaning": "Beer", "pron": "bee-RAH"}
        }
    },
    {
        "id": "wine", "category": "Food", "level": 1, "icon": "🍷",
        "translations": {
            "en": {"text": "Wine", "meaning": "Wine", "pron": "WYN"},
            "es": {"text": "Vino", "meaning": "Wine", "pron": "BVEE-noh"},
            "fr": {"text": "Vin", "meaning": "Wine", "pron": "VAN"},
            "ru": {"text": "Вино", "meaning": "Wine", "pron": "vee-NOH"},
            "pt": {"text": "Vinho", "meaning": "Wine", "pron": "VEEN-yoo"},
            "de": {"text": "Wein", "meaning": "Wine", "pron": "VYN"},
            "id": {"text": "Anggur", "meaning": "Wine", "pron": "AHNG-goor"},
            "tr": {"text": "Şarap", "meaning": "Wine", "pron": "shah-RAHP"}
        }
    },
    {
        "id": "salt", "category": "Food", "level": 1, "icon": "🧂",
        "translations": {
            "en": {"text": "Salt", "meaning": "Salt", "pron": "SAWLT"},
            "es": {"text": "Sal", "meaning": "Salt", "pron": "SAHL"},
            "fr": {"text": "Sel", "meaning": "Salt", "pron": "SEHL"},
            "ru": {"text": "Соль", "meaning": "Salt", "pron": "SOHL"},
            "pt": {"text": "Sal", "meaning": "Salt", "pron": "SAHL"},
            "de": {"text": "Salz", "meaning": "Salt", "pron": "ZAHLTS"},
            "id": {"text": "Garam", "meaning": "Salt", "pron": "GAH-rahm"},
            "tr": {"text": "Tuz", "meaning": "Salt", "pron": "TOOZ"}
        }
    },
    {
        "id": "egg", "category": "Food", "level": 1, "icon": "🥚",
        "translations": {
            "en": {"text": "Egg", "meaning": "Egg", "pron": "EG"},
            "es": {"text": "Huevo", "meaning": "Egg", "pron": "WEH-bvoh"},
            "fr": {"text": "Œuf", "meaning": "Egg", "pron": "UHF"},
            "ru": {"text": "Яйцо", "meaning": "Egg", "pron": "yye-TSOH"},
            "pt": {"text": "Ovo", "meaning": "Egg", "pron": "OH-voo"},
            "de": {"text": "Ei", "meaning": "Egg", "pron": "EY"},
            "id": {"text": "Telur", "meaning": "Egg", "pron": "teh-LOOR"},
            "tr": {"text": "Yumurta", "meaning": "Egg", "pron": "yoo-moor-TAH"}
        }
    },
    {
        "id": "juice", "category": "Food", "level": 1, "icon": "🧃",
        "translations": {
            "en": {"text": "Juice", "meaning": "Juice", "pron": "JOOS"},
            "es": {"text": "Jugo", "meaning": "Juice", "pron": "HOO-goh"},
            "fr": {"text": "Jus", "meaning": "Juice", "pron": "ZHOO"},
            "ru": {"text": "Сок", "meaning": "Juice", "pron": "SOHK"},
            "pt": {"text": "Suco", "meaning": "Juice", "pron": "SOO-koo"},
            "de": {"text": "Saft", "meaning": "Juice", "pron": "ZAHFT"},
            "id": {"text": "Jus", "meaning": "Juice", "pron": "JOOS"},
            "tr": {"text": "Meyve suyu", "meaning": "Juice", "pron": "MEY-veh soo-YOO"}
        }
    },
    {
        "id": "cheese", "category": "Food", "level": 1, "icon": "🧀",
        "translations": {
            "en": {"text": "Cheese", "meaning": "Cheese", "pron": "CHEEZ"},
            "es": {"text": "Queso", "meaning": "Cheese", "pron": "KEH-soh"},
            "fr": {"text": "Fromage", "meaning": "Cheese", "pron": "froh-MAHZH"},
            "ru": {"text": "Сыр", "meaning": "Cheese", "pron": "SYR"},
            "pt": {"text": "Queijo", "meaning": "Cheese", "pron": "KAY-zhoo"},
            "de": {"text": "Käse", "meaning": "Cheese", "pron": "KAY-zuh"},
            "id": {"text": "Keju", "meaning": "Cheese", "pron": "KEH-joo"},
            "tr": {"text": "Peynir", "meaning": "Cheese", "pron": "pey-NEER"}
        }
    },
    {
        "id": "apple", "category": "Food", "level": 1, "icon": "🍏",
        "translations": {
            "en": {"text": "Apple", "meaning": "Apple", "pron": "AP-uhl"},
            "es": {"text": "Manzana", "meaning": "Apple", "pron": "mahn-SAH-nah"},
            "fr": {"text": "Pomme", "meaning": "Apple", "pron": "PUHM"},
            "ru": {"text": "Яблоко", "meaning": "Apple", "pron": "YAH-blah-kah"},
            "pt": {"text": "Maçã", "meaning": "Apple", "pron": "mah-SAHN"},
            "de": {"text": "Apfel", "meaning": "Apple", "pron": "AHP-fuhl"},
            "id": {"text": "Apel", "meaning": "Apple", "pron": "AH-pehl"},
            "tr": {"text": "Elma", "meaning": "Apple", "pron": "el-MAH"}
        }
    },
    {
        "id": "breakfast", "category": "Food", "level": 2, "icon": "🍳",
        "translations": {
            "en": {"text": "Breakfast", "meaning": "Breakfast", "pron": "BREK-fuhst"},
            "es": {"text": "Desayuno", "meaning": "Breakfast", "pron": "deh-sah-YOO-noh"},
            "fr": {"text": "Petit-déjeuner", "meaning": "Breakfast", "pron": "puh-tee day-zhuh-NAY"},
            "ru": {"text": "Завтрак", "meaning": "Breakfast", "pron": "ZAHF-trahk"},
            "pt": {"text": "Café da manhã", "meaning": "Breakfast", "pron": "kah-FEH dah mahn-YAHN"},
            "de": {"text": "Frühstück", "meaning": "Breakfast", "pron": "FRYOO-shtyook"},
            "id": {"text": "Sarapan", "meaning": "Breakfast", "pron": "sah-RAH-pahn"},
            "tr": {"text": "Kahvaltı", "meaning": "Breakfast", "pron": "kah-hvahl-TUH"}
        }
    },
    {
        "id": "lunch", "category": "Food", "level": 2, "icon": "🥪",
        "translations": {
            "en": {"text": "Lunch", "meaning": "Lunch", "pron": "LUHNCH"},
            "es": {"text": "Almuerzo", "meaning": "Lunch", "pron": "ahl-MWEHR-soh"},
            "fr": {"text": "Déjeuner", "meaning": "Lunch", "pron": "day-zhuh-NAY"},
            "ru": {"text": "Обед", "meaning": "Lunch", "pron": "ah-BYET"},
            "pt": {"text": "Almoço", "meaning": "Lunch", "pron": "ahl-MOH-soo"},
            "de": {"text": "Mittagessen", "meaning": "Lunch", "pron": "MIT-tahk-es-suhn"},
            "id": {"text": "Makan siang", "meaning": "Lunch", "pron": "MAH-kahn SEE-ahng"},
            "tr": {"text": "Öğle yemeği", "meaning": "Lunch", "pron": "uh-LEH yeh-meh-YEE"}
        }
    },
    {
        "id": "dinner", "category": "Food", "level": 2, "icon": "🍲",
        "translations": {
            "en": {"text": "Dinner", "meaning": "Dinner", "pron": "DIN-er"},
            "es": {"text": "Cena", "meaning": "Dinner", "pron": "SEH-nah"},
            "fr": {"text": "Dîner", "meaning": "Dinner", "pron": "dee-NAY"},
            "ru": {"text": "Ужин", "meaning": "Dinner", "pron": "OO-zheen"},
            "pt": {"text": "Jantar", "meaning": "Dinner", "pron": "zhahn-TAHR"},
            "de": {"text": "Abendessen", "meaning": "Dinner", "pron": "AH-buhnd-es-suhn"},
            "id": {"text": "Makan malam", "meaning": "Dinner", "pron": "MAH-kahn MAH-lahm"},
            "tr": {"text": "Akşam yemeği", "meaning": "Dinner", "pron": "ahk-SHAHM yeh-meh-YEE"}
        }
    },

    # ==========================================
    # PLACES & CITY (Items 31 - 47)
    # ==========================================
    {
        "id": "restaurant", "category": "Places", "level": 1, "icon": "🍽️",
        "translations": {
            "en": {"text": "Restaurant", "meaning": "Restaurant", "pron": "RES-tuh-rahnt"},
            "es": {"text": "Restaurante", "meaning": "Restaurant", "pron": "rehs-tow-RAHN-teh"},
            "fr": {"text": "Restaurant", "meaning": "Restaurant", "pron": "rehs-toh-RAHN"},
            "ru": {"text": "Ресторан", "meaning": "Restaurant", "pron": "ryehs-tah-RAHN"},
            "pt": {"text": "Restaurante", "meaning": "Restaurant", "pron": "rehs-tow-RAHN-chee"},
            "de": {"text": "Restaurant", "meaning": "Restaurant", "pron": "rehs-toh-RAHNG"},
            "id": {"text": "Restoran", "meaning": "Restaurant", "pron": "rehs-toh-RAHN"},
            "tr": {"text": "Restoran", "meaning": "Restaurant", "pron": "rehs-toh-RAHN"}
        }
    },
    {
        "id": "hotel", "category": "Places", "level": 1, "icon": "🏨",
        "translations": {
            "en": {"text": "Hotel", "meaning": "Hotel", "pron": "hoh-TEL"},
            "es": {"text": "Hotel", "meaning": "Hotel", "pron": "oh-TEHL"},
            "fr": {"text": "Hôtel", "meaning": "Hotel", "pron": "oh-TEHL"},
            "ru": {"text": "Гостиница / Отель", "meaning": "Hotel", "pron": "gahs-TEE-nee-tsah / ah-TYEL"},
            "pt": {"text": "Hotel", "meaning": "Hotel", "pron": "oh-TEHL"},
            "de": {"text": "Hotel", "meaning": "Hotel", "pron": "hoh-TEL"},
            "id": {"text": "Hotel", "meaning": "Hotel", "pron": "hoh-TEHL"},
            "tr": {"text": "Otel", "meaning": "Hotel", "pron": "oh-TEHL"}
        }
    },
    {
        "id": "station", "category": "Places", "level": 1, "icon": "🚉",
        "translations": {
            "en": {"text": "Station", "meaning": "Station", "pron": "STAY-shuhn"},
            "es": {"text": "Estación", "meaning": "Station", "pron": "ehs-tah-SYOHN"},
            "fr": {"text": "Gare / Station", "meaning": "Station", "pron": "GAHR / stah-SYOHN"},
            "ru": {"text": "Станция / Вокзал", "meaning": "Station", "pron": "STAHN-tsyee-yah / vahk-ZAHL"},
            "pt": {"text": "Estação", "meaning": "Station", "pron": "ehs-tah-SOWN"},
            "de": {"text": "Bahnhof", "meaning": "Station", "pron": "BAHN-hohf"},
            "id": {"text": "Stasiun", "meaning": "Station", "pron": "stah-SYOON"},
            "tr": {"text": "İstasyon", "meaning": "Station", "pron": "ees-tahs-YOHN"}
        }
    },
    {
        "id": "airport", "category": "Places", "level": 1, "icon": "✈️",
        "translations": {
            "en": {"text": "Airport", "meaning": "Airport", "pron": "AIR-port"},
            "es": {"text": "Aeropuerto", "meaning": "Airport", "pron": "ah-eh-roh-PWEHR-toh"},
            "fr": {"text": "Aéroport", "meaning": "Airport", "pron": "ah-ay-roh-POHR"},
            "ru": {"text": "Аэропорт", "meaning": "Airport", "pron": "ah-eh-rah-POHRT"},
            "pt": {"text": "Aeroporto", "meaning": "Airport", "pron": "ah-eh-roh-POHR-too"},
            "de": {"text": "Flughafen", "meaning": "Airport", "pron": "FLOOK-hah-fuhn"},
            "id": {"text": "Bandara", "meaning": "Airport", "pron": "bahn-DAH-rah"},
            "tr": {"text": "Havalimanı", "meaning": "Airport", "pron": "hah-vah-lee-mah-NUH"}
        }
    },
    {
        "id": "street", "category": "Places", "level": 1, "icon": "🛣️",
        "translations": {
            "en": {"text": "Street", "meaning": "Street", "pron": "STREET"},
            "es": {"text": "Calle", "meaning": "Street", "pron": "KAH-yeh"},
            "fr": {"text": "Rue", "meaning": "Street", "pron": "ROO"},
            "ru": {"text": "Улица", "meaning": "Street", "pron": "OO-lee-tsah"},
            "pt": {"text": "Rua", "meaning": "Street", "pron": "HOO-ah"},
            "de": {"text": "Straße", "meaning": "Street", "pron": "SHTRAH-suh"},
            "id": {"text": "Jalan", "meaning": "Street", "pron": "JAH-lahn"},
            "tr": {"text": "Sokak", "meaning": "Street", "pron": "soh-KAHK"}
        }
    },
    {
        "id": "park", "category": "Places", "level": 1, "icon": "🌳",
        "translations": {
            "en": {"text": "Park", "meaning": "Park", "pron": "PAHRK"},
            "es": {"text": "Parque", "meaning": "Park", "pron": "PAHR-keh"},
            "fr": {"text": "Parc", "meaning": "Park", "pron": "PAHRK"},
            "ru": {"text": "Парк", "meaning": "Park", "pron": "PAHRK"},
            "pt": {"text": "Parque", "meaning": "Park", "pron": "PAHR-kee"},
            "de": {"text": "Park", "meaning": "Park", "pron": "PAHRK"},
            "id": {"text": "Taman", "meaning": "Park", "pron": "TAH-mahn"},
            "tr": {"text": "Park", "meaning": "Park", "pron": "PAHRK"}
        }
    },
    {
        "id": "hospital", "category": "Places", "level": 2, "icon": "🏥",
        "translations": {
            "en": {"text": "Hospital", "meaning": "Hospital", "pron": "HAHS-pi-tuhl"},
            "es": {"text": "Hospital", "meaning": "Hospital", "pron": "ohs-pee-TAHL"},
            "fr": {"text": "Hôpital", "meaning": "Hospital", "pron": "oh-pee-TAHL"},
            "ru": {"text": "Больница", "meaning": "Hospital", "pron": "bahl-NEE-tsah"},
            "pt": {"text": "Hospital", "meaning": "Hospital", "pron": "ohs-pee-TAHL"},
            "de": {"text": "Krankenhaus", "meaning": "Hospital", "pron": "KRAHNG-kuhn-hows"},
            "id": {"text": "Rumah sakit", "meaning": "Hospital", "pron": "ROO-mah SAH-keet"},
            "tr": {"text": "Hastane", "meaning": "Hospital", "pron": "hahs-tah-NEH"}
        }
    },
    {
        "id": "pharmacy", "category": "Places", "level": 2, "icon": "💊",
        "translations": {
            "en": {"text": "Pharmacy", "meaning": "Pharmacy", "pron": "FAHR-muh-see"},
            "es": {"text": "Farmacia", "meaning": "Pharmacy", "pron": "fahr-MAH-syah"},
            "fr": {"text": "Pharmacie", "meaning": "Pharmacy", "pron": "fahr-mah-SEE"},
            "ru": {"text": "Аптека", "meaning": "Pharmacy", "pron": "ahp-TYE-kah"},
            "pt": {"text": "Farmácia", "meaning": "Pharmacy", "pron": "fahr-MAH-syah"},
            "de": {"text": "Apotheke", "meaning": "Pharmacy", "pron": "ah-poh-TAY-kuh"},
            "id": {"text": "Apotek", "meaning": "Pharmacy", "pron": "ah-poh-TEHK"},
            "tr": {"text": "Eczane", "meaning": "Pharmacy", "pron": "edj-zah-NEH"}
        }
    },
    {
        "id": "supermarket", "category": "Places", "level": 2, "icon": "🛒",
        "translations": {
            "en": {"text": "Supermarket", "meaning": "Supermarket", "pron": "SOO-per-mahr-kit"},
            "es": {"text": "Supermercado", "meaning": "Supermarket", "pron": "soo-pehr-mehr-KAH-doh"},
            "fr": {"text": "Supermarché", "meaning": "Supermarket", "pron": "soo-pehr-mahr-SHAY"},
            "ru": {"text": "Супермаркет", "meaning": "Supermarket", "pron": "soo-peer-MAHR-kyet"},
            "pt": {"text": "Supermercado", "meaning": "Supermarket", "pron": "soo-pehr-mehr-KAH-doo"},
            "de": {"text": "Supermarkt", "meaning": "Supermarket", "pron": "ZOO-puhr-mahrkt"},
            "id": {"text": "Supermarket", "meaning": "Supermarket", "pron": "soo-pehr-MAHR-keht"},
            "tr": {"text": "Süpermarket", "meaning": "Supermarket", "pron": "soo-pehr-mahr-KET"}
        }
    },
    {
        "id": "museum", "category": "Places", "level": 2, "icon": "🏛️",
        "translations": {
            "en": {"text": "Museum", "meaning": "Museum", "pron": "myoo-ZEE-uhm"},
            "es": {"text": "Museo", "meaning": "Museum", "pron": "moo-SEH-oh"},
            "fr": {"text": "Musée", "meaning": "Museum", "pron": "moo-ZAY"},
            "ru": {"text": "Музей", "meaning": "Museum", "pron": "moo-ZYEY"},
            "pt": {"text": "Museu", "meaning": "Museum", "pron": "moo-ZEH-oo"},
            "de": {"text": "Museum", "meaning": "Museum", "pron": "moo-ZAY-oom"},
            "id": {"text": "Museum", "meaning": "Museum", "pron": "moo-SEH-oom"},
            "tr": {"text": "Müze", "meaning": "Museum", "pron": "mew-ZEH"}
        }
    },
    {
        "id": "theater", "category": "Places", "level": 2, "icon": "🎭",
        "translations": {
            "en": {"text": "Theater", "meaning": "Theater", "pron": "THEE-uh-ter"},
            "es": {"text": "Teatro", "meaning": "Theater", "pron": "teh-AH-troh"},
            "fr": {"text": "Théâtre", "meaning": "Theater", "pron": "tay-AH-truh"},
            "ru": {"text": "Театр", "meaning": "Theater", "pron": "tyee-AH-tuhr"},
            "pt": {"text": "Teatro", "meaning": "Theater", "pron": "tee-AH-troo"},
            "de": {"text": "Theater", "meaning": "Theater", "pron": "tay-AH-tuhr"},
            "id": {"text": "Teater", "meaning": "Theater", "pron": "teh-AH-tehr"},
            "tr": {"text": "Tiyatro", "meaning": "Theater", "pron": "tee-YAHT-roh"}
        }
    },
    {
        "id": "cinema", "category": "Places", "level": 2, "icon": "🎬",
        "translations": {
            "en": {"text": "Cinema", "meaning": "Cinema", "pron": "SIN-uh-muh"},
            "es": {"text": "Cine", "meaning": "Cinema", "pron": "SEE-neh"},
            "fr": {"text": "Cinéma", "meaning": "Cinema", "pron": "see-nay-MAH"},
            "ru": {"text": "Кино / Кинотеатр", "meaning": "Cinema", "pron": "kee-NOH / kee-nah-tyee-AH-tuhr"},
            "pt": {"text": "Cinema", "meaning": "Cinema", "pron": "see-NEH-mah"},
            "de": {"text": "Kino", "meaning": "Cinema", "pron": "KEE-noh"},
            "id": {"text": "Bioskop", "meaning": "Cinema", "pron": "bee-OHS-kohp"},
            "tr": {"text": "Sinema", "meaning": "Cinema", "pron": "see-neh-MAH"}
        }
    },
    {
        "id": "center", "category": "Places", "level": 2, "icon": "📍",
        "translations": {
            "en": {"text": "Center", "meaning": "Center", "pron": "SEN-ter"},
            "es": {"text": "Centro", "meaning": "Center", "pron": "SEHN-troh"},
            "fr": {"text": "Centre", "meaning": "Center", "pron": "SAHN-truh"},
            "ru": {"text": "Центр", "meaning": "Center", "pron": "TSYEN-tuhr"},
            "pt": {"text": "Centro", "meaning": "Center", "pron": "SEHN-troo"},
            "de": {"text": "Zentrum", "meaning": "Center", "pron": "TSEN-troom"},
            "id": {"text": "Pusat", "meaning": "Center", "pron": "POO-saht"},
            "tr": {"text": "Merkez", "meaning": "Center", "pron": "mehr-KEZ"}
        }
    },
    {
        "id": "school", "category": "Places", "level": 2, "icon": "🏫",
        "translations": {
            "en": {"text": "School", "meaning": "School", "pron": "SKOOL"},
            "es": {"text": "Escuela", "meaning": "School", "pron": "ehs-KWEH-lah"},
            "fr": {"text": "École", "meaning": "School", "pron": "ay-KUHL"},
            "ru": {"text": "Школа", "meaning": "School", "pron": "SHKOH-lah"},
            "pt": {"text": "Escola", "meaning": "School", "pron": "ehs-KOH-lah"},
            "de": {"text": "Schule", "meaning": "School", "pron": "SHOO-luh"},
            "id": {"text": "Sekolah", "meaning": "School", "pron": "seh-KOH-lah"},
            "tr": {"text": "Okul", "meaning": "School", "pron": "oh-KOOL"}
        }
    },
    {
        "id": "factory", "category": "Places", "level": 2, "icon": "🏭",
        "translations": {
            "en": {"text": "Factory", "meaning": "Factory", "pron": "FAK-tuh-ree"},
            "es": {"text": "Fábrica", "meaning": "Factory", "pron": "FAH-bree-kah"},
            "fr": {"text": "Usine", "meaning": "Factory", "pron": "oo-ZEEN"},
            "ru": {"text": "Завод", "meaning": "Factory", "pron": "zah-VAHT"},
            "pt": {"text": "Fábrica", "meaning": "Factory", "pron": "FAH-bree-kah"},
            "de": {"text": "Fabrik", "meaning": "Factory", "pron": "fah-BREEK"},
            "id": {"text": "Pabrik", "meaning": "Factory", "pron": "PAH-breek"},
            "tr": {"text": "Fabrika", "meaning": "Factory", "pron": "fahb-ree-KAH"}
        }
    },
    {
        "id": "sea", "category": "Places", "level": 1, "icon": "🌊",
        "translations": {
            "en": {"text": "Sea", "meaning": "Sea", "pron": "SEE"},
            "es": {"text": "Mar", "meaning": "Sea", "pron": "MAHR"},
            "fr": {"text": "Mer", "meaning": "Sea", "pron": "MEHR"},
            "ru": {"text": "Море", "meaning": "Sea", "pron": "MOH-rye"},
            "pt": {"text": "Mar", "meaning": "Sea", "pron": "MAHR"},
            "de": {"text": "Meer", "meaning": "Sea", "pron": "MAYR"},
            "id": {"text": "Laut", "meaning": "Sea", "pron": "LAH-oot"},
            "tr": {"text": "Deniz", "meaning": "Sea", "pron": "deh-NEEZ"}
        }
    },
    {
        "id": "road", "category": "Places", "level": 1, "icon": "🛤️",
        "translations": {
            "en": {"text": "Road", "meaning": "Road", "pron": "ROHD"},
            "es": {"text": "Camino / Carretera", "meaning": "Road", "pron": "kah-MEE-noh / kah-rreh-TEH-rah"},
            "fr": {"text": "Route / Chemin", "meaning": "Road", "pron": "ROOT / shuh-MAN"},
            "ru": {"text": "Дорога", "meaning": "Road", "pron": "dah-ROH-gah"},
            "pt": {"text": "Estrada", "meaning": "Road", "pron": "ehs-TRAH-dah"},
            "de": {"text": "Straße", "meaning": "Road", "pron": "SHTRAH-suh"},
            "id": {"text": "Jalan", "meaning": "Road", "pron": "JAH-lahn"},
            "tr": {"text": "Yol", "meaning": "Road", "pron": "YOHL"}
        }
    },

    # ==========================================
    # TRANSPORT (Items 48 - 53)
    # ==========================================
    {
        "id": "bus", "category": "Travel", "level": 1, "icon": "🚌",
        "translations": {
            "en": {"text": "Bus", "meaning": "Bus", "pron": "BUHS"},
            "es": {"text": "Autobús", "meaning": "Bus", "pron": "ow-toh-BOOS"},
            "fr": {"text": "Bus", "meaning": "Bus", "pron": "BOOS"},
            "ru": {"text": "Автобус", "meaning": "Bus", "pron": "ahf-TOH-boos"},
            "pt": {"text": "Ônibus", "meaning": "Bus", "pron": "OH-nee-boos"},
            "de": {"text": "Bus", "meaning": "Bus", "pron": "BOOS"},
            "id": {"text": "Bus", "meaning": "Bus", "pron": "BOOS"},
            "tr": {"text": "Otobüs", "meaning": "Bus", "pron": "oh-toh-BEWS"}
        }
    },
    {
        "id": "taxi", "category": "Travel", "level": 1, "icon": "🚕",
        "translations": {
            "en": {"text": "Taxi", "meaning": "Taxi", "pron": "TAK-see"},
            "es": {"text": "Taxi", "meaning": "Taxi", "pron": "TAHK-see"},
            "fr": {"text": "Taxi", "meaning": "Taxi", "pron": "tahk-SEE"},
            "ru": {"text": "Такси", "meaning": "Taxi", "pron": "tahk-SEE"},
            "pt": {"text": "Táxi", "meaning": "Taxi", "pron": "TAHK-see"},
            "de": {"text": "Taxi", "meaning": "Taxi", "pron": "TAHK-see"},
            "id": {"text": "Taksi", "meaning": "Taxi", "pron": "TAHK-see"},
            "tr": {"text": "Taksi", "meaning": "Taxi", "pron": "TAHK-see"}
        }
    },
    {
        "id": "airplane", "category": "Travel", "level": 1, "icon": "✈️",
        "translations": {
            "en": {"text": "Airplane", "meaning": "Airplane", "pron": "AIR-playn"},
            "es": {"text": "Avión", "meaning": "Airplane", "pron": "ah-BVEH-ohn"},
            "fr": {"text": "Avion", "meaning": "Airplane", "pron": "ah-vee-OHN"},
            "ru": {"text": "Самолёт", "meaning": "Airplane", "pron": "sah-mah-LYOHT"},
            "pt": {"text": "Avião", "meaning": "Airplane", "pron": "ah-vee-OWN"},
            "de": {"text": "Flugzeug", "meaning": "Airplane", "pron": "FLOOK-tsoyk"},
            "id": {"text": "Pesawat", "meaning": "Airplane", "pron": "peh-SAH-waht"},
            "tr": {"text": "Uçak", "meaning": "Airplane", "pron": "oo-CHAHK"}
        }
    },
    {
        "id": "ticket", "category": "Travel", "level": 1, "icon": "🎫",
        "translations": {
            "en": {"text": "Ticket", "meaning": "Ticket", "pron": "TIK-it"},
            "es": {"text": "Boleto / Billete", "meaning": "Ticket", "pron": "boh-LEH-toh / bee-YEH-teh"},
            "fr": {"text": "Billet", "meaning": "Ticket", "pron": "bee-YEH"},
            "ru": {"text": "Билет", "meaning": "Ticket", "pron": "bee-LYET"},
            "pt": {"text": "Passagem", "meaning": "Ticket", "pron": "pah-SAH-zhen"},
            "de": {"text": "Ticket", "meaning": "Ticket", "pron": "TIK-uht"},
            "id": {"text": "Tiket", "meaning": "Ticket", "pron": "TEE-keht"},
            "tr": {"text": "Bilet", "meaning": "Ticket", "pron": "bee-LET"}
        }
    },
    {
        "id": "passport", "category": "Travel", "level": 1, "icon": "🛂",
        "translations": {
            "en": {"text": "Passport", "meaning": "Passport", "pron": "PAS-port"},
            "es": {"text": "Pasaporte", "meaning": "Passport", "pron": "pah-sah-POHR-teh"},
            "fr": {"text": "Passeport", "meaning": "Passport", "pron": "pahs-POHR"},
            "ru": {"text": "Паспорт", "meaning": "Passport", "pron": "PAHS-pahrt"},
            "pt": {"text": "Passaporte", "meaning": "Passport", "pron": "pah-sah-POHR-chee"},
            "de": {"text": "Reisepass", "meaning": "Passport", "pron": "RY-zuh-pahs"},
            "id": {"text": "Paspor", "meaning": "Passport", "pron": "PAHS-pohr"},
            "tr": {"text": "Pasaport", "meaning": "Passport", "pron": "pah-sah-POHRT"}
        }
    },
    {
        "id": "boat", "category": "Travel", "level": 1, "icon": "⛵",
        "translations": {
            "en": {"text": "Boat", "meaning": "Boat", "pron": "BOHT"},
            "es": {"text": "Barco", "meaning": "Boat", "pron": "BAHR-koh"},
            "fr": {"text": "Bateau", "meaning": "Boat", "pron": "bah-TOH"},
            "ru": {"text": "Лодка", "meaning": "Boat", "pron": "LOHT-kah"},
            "pt": {"text": "Barco", "meaning": "Boat", "pron": "BAHR-koo"},
            "de": {"text": "Boot", "meaning": "Boat", "pron": "BOHT"},
            "id": {"text": "Perahu", "meaning": "Boat", "pron": "peh-RAH-hoo"},
            "tr": {"text": "Tekne", "meaning": "Boat", "pron": "tek-NEH"}
        }
    },

    # ==========================================
    # HOME & OBJECTS (Items 54 - 65)
    # ==========================================
    {
        "id": "table", "category": "Home", "level": 1, "icon": "🪑",
        "translations": {
            "en": {"text": "Table", "meaning": "Table", "pron": "TAY-buhl"},
            "es": {"text": "Mesa", "meaning": "Table", "pron": "MEH-sah"},
            "fr": {"text": "Table", "meaning": "Table", "pron": "TAH-bluh"},
            "ru": {"text": "Стол", "meaning": "Table", "pron": "STOHL"},
            "pt": {"text": "Mesa", "meaning": "Table", "pron": "MEH-zah"},
            "de": {"text": "Tisch", "meaning": "Table", "pron": "TISH"},
            "id": {"text": "Meja", "meaning": "Table", "pron": "MEH-jah"},
            "tr": {"text": "Masa", "meaning": "Table", "pron": "mah-SAH"}
        }
    },
    {
        "id": "chair", "category": "Home", "level": 1, "icon": "🪑",
        "translations": {
            "en": {"text": "Chair", "meaning": "Chair", "pron": "CHAIR"},
            "es": {"text": "Silla", "meaning": "Chair", "pron": "SEE-yah"},
            "fr": {"text": "Chaise", "meaning": "Chair", "pron": "SHEHZ"},
            "ru": {"text": "Стул", "meaning": "Chair", "pron": "STOOL"},
            "pt": {"text": "Cadeira", "meaning": "Chair", "pron": "kah-DAY-rah"},
            "de": {"text": "Stuhl", "meaning": "Chair", "pron": "SHTOOL"},
            "id": {"text": "Kursi", "meaning": "Chair", "pron": "KOOR-see"},
            "tr": {"text": "Sandalye", "meaning": "Chair", "pron": "sahn-dahl-YEH"}
        }
    },
    {
        "id": "door", "category": "Home", "level": 1, "icon": "🚪",
        "translations": {
            "en": {"text": "Door", "meaning": "Door", "pron": "DOR"},
            "es": {"text": "Puerta", "meaning": "Door", "pron": "PWEHR-tah"},
            "fr": {"text": "Porte", "meaning": "Door", "pron": "POHRT"},
            "ru": {"text": "Дверь", "meaning": "Door", "pron": "DVYAYR"},
            "pt": {"text": "Porta", "meaning": "Door", "pron": "POHR-tah"},
            "de": {"text": "Tür", "meaning": "Door", "pron": "TEER"},
            "id": {"text": "Pintu", "meaning": "Door", "pron": "PEEN-too"},
            "tr": {"text": "Kapı", "meaning": "Door", "pron": "kah-PUH"}
        }
    },
    {
        "id": "window", "category": "Home", "level": 1, "icon": "🪟",
        "translations": {
            "en": {"text": "Window", "meaning": "Window", "pron": "WIN-doh"},
            "es": {"text": "Ventana", "meaning": "Window", "pron": "bvehn-TAH-nah"},
            "fr": {"text": "Fenêtre", "meaning": "Window", "pron": "fuh-NEH-truh"},
            "ru": {"text": "Окно", "meaning": "Window", "pron": "ahk-NOH"},
            "pt": {"text": "Janela", "meaning": "Window", "pron": "zhah-NEH-lah"},
            "de": {"text": "Fenster", "meaning": "Window", "pron": "FEHN-stuhr"},
            "id": {"text": "Jendela", "meaning": "Window", "pron": "jehn-DEH-lah"},
            "tr": {"text": "Pencere", "meaning": "Window", "pron": "pen-djeh-REH"}
        }
    },
    {
        "id": "bag", "category": "Home", "level": 1, "icon": "👜",
        "translations": {
            "en": {"text": "Bag", "meaning": "Bag", "pron": "BAG"},
            "es": {"text": "Bolsa / Maleta", "meaning": "Bag", "pron": "BOHL-sah / mah-LEH-tah"},
            "fr": {"text": "Sac", "meaning": "Bag", "pron": "SAHK"},
            "ru": {"text": "Сумка", "meaning": "Bag", "pron": "SOOM-kah"},
            "pt": {"text": "Bolsa", "meaning": "Bag", "pron": "BOHL-sah"},
            "de": {"text": "Tasche", "meaning": "Bag", "pron": "TAH-shuh"},
            "id": {"text": "Tas", "meaning": "Bag", "pron": "TAHS"},
            "tr": {"text": "Çanta", "meaning": "Bag", "pron": "chahn-TAH"}
        }
    },
    {
        "id": "clothes", "category": "Home", "level": 1, "icon": "👕",
        "translations": {
            "en": {"text": "Clothes", "meaning": "Clothes", "pron": "KLOHZ"},
            "es": {"text": "Ropa", "meaning": "Clothes", "pron": "ROH-pah"},
            "fr": {"text": "Vêtements", "meaning": "Clothes", "pron": "veht-MAHN"},
            "ru": {"text": "Одежда", "meaning": "Clothes", "pron": "ah-DYEZH-dah"},
            "pt": {"text": "Roupas", "meaning": "Clothes", "pron": "HOH-pahs"},
            "de": {"text": "Kleidung", "meaning": "Clothes", "pron": "KLY-doong"},
            "id": {"text": "Pakaian", "meaning": "Clothes", "pron": "pah-KYE-ahn"},
            "tr": {"text": "Giysi", "meaning": "Clothes", "pron": "geey-SEE"}
        }
    },
    {
        "id": "shoes", "category": "Home", "level": 1, "icon": "👟",
        "translations": {
            "en": {"text": "Shoes", "meaning": "Shoes", "pron": "SHOOZ"},
            "es": {"text": "Zapatos", "meaning": "Shoes", "pron": "sah-PAH-tohs"},
            "fr": {"text": "Chaussures", "meaning": "Shoes", "pron": "shoh-SYOOR"},
            "ru": {"text": "Обувь / Туфли", "meaning": "Shoes", "pron": "OH-boof / TOO-flee"},
            "pt": {"text": "Sapatos", "meaning": "Shoes", "pron": "sah-PAH-toos"},
            "de": {"text": "Schuhe", "meaning": "Shoes", "pron": "SHOO-uh"},
            "id": {"text": "Sepatu", "meaning": "Shoes", "pron": "seh-PAH-too"},
            "tr": {"text": "Ayakkabı", "meaning": "Shoes", "pron": "ah-yahk-kah-BUH"}
        }
    },
    {
        "id": "book", "category": "Home", "level": 1, "icon": "📖",
        "translations": {
            "en": {"text": "Book", "meaning": "Book", "pron": "BUUK"},
            "es": {"text": "Libro", "meaning": "Book", "pron": "LEE-broh"},
            "fr": {"text": "Livre", "meaning": "Book", "pron": "LEE-vruh"},
            "ru": {"text": "Книга", "meaning": "Book", "pron": "KNEE-gah"},
            "pt": {"text": "Livro", "meaning": "Book", "pron": "LEE-vroo"},
            "de": {"text": "Buch", "meaning": "Book", "pron": "BOOKH"},
            "id": {"text": "Buku", "meaning": "Book", "pron": "BOO-koo"},
            "tr": {"text": "Kitap", "meaning": "Book", "pron": "kee-TAHP"}
        }
    },
    {
        "id": "magazine", "category": "Home", "level": 2, "icon": "📰",
        "translations": {
            "en": {"text": "Magazine", "meaning": "Magazine", "pron": "mag-uh-ZEEN"},
            "es": {"text": "Revista", "meaning": "Magazine", "pron": "rreh-BVEES-tah"},
            "fr": {"text": "Magazine", "meaning": "Magazine", "pron": "mah-gah-ZEEN"},
            "ru": {"text": "Журнал", "meaning": "Magazine", "pron": "zhoor-NAHL"},
            "pt": {"text": "Revista", "meaning": "Magazine", "pron": "heh-VEES-tah"},
            "de": {"text": "Zeitschrift", "meaning": "Magazine", "pron": "TSYT-shrift"},
            "id": {"text": "Majalah", "meaning": "Magazine", "pron": "mah-JAH-lah"},
            "tr": {"text": "Dergi", "meaning": "Magazine", "pron": "dehr-GEE"}
        }
    },
    {
        "id": "umbrella", "category": "Home", "level": 1, "icon": "☂️",
        "translations": {
            "en": {"text": "Umbrella", "meaning": "Umbrella", "pron": "uhm-BREL-uh"},
            "es": {"text": "Paraguas", "meaning": "Umbrella", "pron": "pah-RAH-gwahs"},
            "fr": {"text": "Parapluie", "meaning": "Umbrella", "pron": "pah-rah-PLWEE"},
            "ru": {"text": "Зонт", "meaning": "Umbrella", "pron": "ZOHNT"},
            "pt": {"text": "Guarda-chuva", "meaning": "Umbrella", "pron": "GWAHR-dah SHOO-vah"},
            "de": {"text": "Regenschirm", "meaning": "Umbrella", "pron": "RAY-guhn-sheerm"},
            "id": {"text": "Payung", "meaning": "Umbrella", "pron": "PAH-yoong"},
            "tr": {"text": "Şemsiye", "meaning": "Umbrella", "pron": "shehm-see-YEH"}
        }
    },
    {
        "id": "photo", "category": "Home", "level": 1, "icon": "📷",
        "translations": {
            "en": {"text": "Photo", "meaning": "Photo", "pron": "FOH-toh"},
            "es": {"text": "Foto", "meaning": "Photo", "pron": "FOH-toh"},
            "fr": {"text": "Photo", "meaning": "Photo", "pron": "foh-TOH"},
            "ru": {"text": "Фото", "meaning": "Photo", "pron": "FOH-tah"},
            "pt": {"text": "Foto", "meaning": "Photo", "pron": "FOH-too"},
            "de": {"text": "Foto", "meaning": "Photo", "pron": "FOH-toh"},
            "id": {"text": "Foto", "meaning": "Photo", "pron": "FOH-toh"},
            "tr": {"text": "Fotoğraf", "meaning": "Photo", "pron": "foh-toh-RAHF"}
        }
    },
    {
        "id": "card", "category": "Shopping", "level": 1, "icon": "💳",
        "translations": {
            "en": {"text": "Card", "meaning": "Card", "pron": "KAHRD"},
            "es": {"text": "Tarjeta", "meaning": "Card", "pron": "tahr-HEH-tah"},
            "fr": {"text": "Carte", "meaning": "Card", "pron": "KAHRT"},
            "ru": {"text": "Карта", "meaning": "Card", "pron": "KAHR-tah"},
            "pt": {"text": "Cartão", "meaning": "Card", "pron": "kahr-TOWN"},
            "de": {"text": "Karte", "meaning": "Card", "pron": "KAHR-tuh"},
            "id": {"text": "Kartu", "meaning": "Card", "pron": "KAHR-too"},
            "tr": {"text": "Kart", "meaning": "Card", "pron": "KAHRT"}
        }
    },

    # ==========================================
    # NATURE & ANIMALS (Items 66 - 72)
    # ==========================================
    {
        "id": "dog", "category": "Nature", "level": 1, "icon": "🐶",
        "translations": {
            "en": {"text": "Dog", "meaning": "Dog", "pron": "DAWG"},
            "es": {"text": "Perro", "meaning": "Dog", "pron": "PEH-rroh"},
            "fr": {"text": "Chien", "meaning": "Dog", "pron": "SHYAN"},
            "ru": {"text": "Собака", "meaning": "Dog", "pron": "sah-BAH-kah"},
            "pt": {"text": "Cachorro", "meaning": "Dog", "pron": "kah-SHOH-hoo"},
            "de": {"text": "Hund", "meaning": "Dog", "pron": "HOONT"},
            "id": {"text": "Anjing", "meaning": "Dog", "pron": "AHN-jeeng"},
            "tr": {"text": "Köpek", "meaning": "Dog", "pron": "kuh-PEK"}
        }
    },
    {
        "id": "cat", "category": "Nature", "level": 1, "icon": "🐱",
        "translations": {
            "en": {"text": "Cat", "meaning": "Cat", "pron": "KAT"},
            "es": {"text": "Gato", "meaning": "Cat", "pron": "GAH-toh"},
            "fr": {"text": "Chat", "meaning": "Cat", "pron": "SHAH"},
            "ru": {"text": "Кот / Кошка", "meaning": "Cat", "pron": "KOHT / KOHSH-kah"},
            "pt": {"text": "Gato", "meaning": "Cat", "pron": "GAH-too"},
            "de": {"text": "Katze", "meaning": "Cat", "pron": "KAHT-suh"},
            "id": {"text": "Kucing", "meaning": "Cat", "pron": "KOO-cheeng"},
            "tr": {"text": "Kedi", "meaning": "Cat", "pron": "keh-DEE"}
        }
    },
    {
        "id": "bird", "category": "Nature", "level": 1, "icon": "🐦",
        "translations": {
            "en": {"text": "Bird", "meaning": "Bird", "pron": "BURD"},
            "es": {"text": "Pájaro / Ave", "meaning": "Bird", "pron": "PAH-hah-roh / AH-bveh"},
            "fr": {"text": "Oiseau", "meaning": "Bird", "pron": "wah-ZOH"},
            "ru": {"text": "Птица", "meaning": "Bird", "pron": "PTEE-tsah"},
            "pt": {"text": "Pássaro / Ave", "meaning": "Bird", "pron": "PAH-sah-roo / AH-vee"},
            "de": {"text": "Vogel", "meaning": "Bird", "pron": "FOH-guhl"},
            "id": {"text": "Burung", "meaning": "Bird", "pron": "BOO-roong"},
            "tr": {"text": "Kuş", "meaning": "Bird", "pron": "KOOSH"}
        }
    },
    {
        "id": "moon", "category": "Nature", "level": 1, "icon": "🌙",
        "translations": {
            "en": {"text": "Moon", "meaning": "Moon", "pron": "MOON"},
            "es": {"text": "Luna", "meaning": "Moon", "pron": "LOO-nah"},
            "fr": {"text": "Lune", "meaning": "Moon", "pron": "LOON"},
            "ru": {"text": "Луна", "meaning": "Moon", "pron": "loo-NAH"},
            "pt": {"text": "Lua", "meaning": "Moon", "pron": "LOO-ah"},
            "de": {"text": "Mond", "meaning": "Moon", "pron": "MOHNT"},
            "id": {"text": "Bulan", "meaning": "Moon", "pron": "BOO-lahn"},
            "tr": {"text": "Ay", "meaning": "Moon", "pron": "EYE"}
        }
    },
    {
        "id": "star", "category": "Nature", "level": 1, "icon": "⭐",
        "translations": {
            "en": {"text": "Star", "meaning": "Star", "pron": "STAHR"},
            "es": {"text": "Estrella", "meaning": "Star", "pron": "ehs-TREH-yah"},
            "fr": {"text": "Étoile", "meaning": "Star", "pron": "ay-TWAHL"},
            "ru": {"text": "Звезда", "meaning": "Star", "pron": "zvyez-DAH"},
            "pt": {"text": "Estrela", "meaning": "Star", "pron": "ehs-TRAY-lah"},
            "de": {"text": "Stern", "meaning": "Star", "pron": "SHTEHRN"},
            "id": {"text": "Bintang", "meaning": "Star", "pron": "BEEN-tahng"},
            "tr": {"text": "Yıldız", "meaning": "Star", "pron": "yuhl-DUHZ"}
        }
    },
    {
        "id": "flower", "category": "Nature", "level": 1, "icon": "🌸",
        "translations": {
            "en": {"text": "Flower", "meaning": "Flower", "pron": "FLOW-er"},
            "es": {"text": "Flor", "meaning": "Flower", "pron": "FLOHR"},
            "fr": {"text": "Fleur", "meaning": "Flower", "pron": "FLUHR"},
            "ru": {"text": "Цветок", "meaning": "Flower", "pron": "tsvee-TOHK"},
            "pt": {"text": "Flor", "meaning": "Flower", "pron": "FLOHR"},
            "de": {"text": "Blume", "meaning": "Flower", "pron": "BLOO-muh"},
            "id": {"text": "Bunga", "meaning": "Flower", "pron": "BOON-gah"},
            "tr": {"text": "Çiçek", "meaning": "Flower", "pron": "chee-CHEK"}
        }
    },
    {
        "id": "tree", "category": "Nature", "level": 1, "icon": "🌲",
        "translations": {
            "en": {"text": "Tree", "meaning": "Tree", "pron": "TREE"},
            "es": {"text": "Árbol", "meaning": "Tree", "pron": "AHR-bohl"},
            "fr": {"text": "Arbre", "meaning": "Tree", "pron": "AHR-bruh"},
            "ru": {"text": "Дерево", "meaning": "Tree", "pron": "DYE-ryee-vah"},
            "pt": {"text": "Árvore", "meaning": "Tree", "pron": "AHR-voh-ree"},
            "de": {"text": "Baum", "meaning": "Tree", "pron": "BOWM"},
            "id": {"text": "Pohon", "meaning": "Tree", "pron": "POH-hohn"},
            "tr": {"text": "Ağaç", "meaning": "Tree", "pron": "ah-AHCH"}
        }
    },

    # ==========================================
    # DESCRIPTIONS (Items 73 - 82)
    # ==========================================
    {
        "id": "good", "category": "Descriptions", "level": 1, "icon": "👍",
        "translations": {
            "en": {"text": "Good", "meaning": "Good", "pron": "GUUD"},
            "es": {"text": "Bueno", "meaning": "Good", "pron": "BWEH-noh"},
            "fr": {"text": "Bon", "meaning": "Good", "pron": "BOHN"},
            "ru": {"text": "Хороший / Хорошо", "meaning": "Good", "pron": "khah-ROH-sheey / khah-rah-SHOH"},
            "pt": {"text": "Bom", "meaning": "Good", "pron": "BOHN"},
            "de": {"text": "Gut", "meaning": "Good", "pron": "GOOT"},
            "id": {"text": "Baik", "meaning": "Good", "pron": "BYE-eek"},
            "tr": {"text": "İyi", "meaning": "Good", "pron": "ee-YEE"}
        }
    },
    {
        "id": "bad", "category": "Descriptions", "level": 1, "icon": "👎",
        "translations": {
            "en": {"text": "Bad", "meaning": "Bad", "pron": "BAD"},
            "es": {"text": "Malo", "meaning": "Bad", "pron": "MAH-loh"},
            "fr": {"text": "Mauvais", "meaning": "Bad", "pron": "moh-VEH"},
            "ru": {"text": "Плохой / Плохо", "meaning": "Bad", "pron": "plah-KHOY / PLOH-khah"},
            "pt": {"text": "Ruim", "meaning": "Bad", "pron": "hoo-EEN"},
            "de": {"text": "Schlecht", "meaning": "Bad", "pron": "SHLEHKHT"},
            "id": {"text": "Buruk", "meaning": "Bad", "pron": "BOO-rook"},
            "tr": {"text": "Kötü", "meaning": "Bad", "pron": "kuh-TEW"}
        }
    },
    {
        "id": "fast", "category": "Descriptions", "level": 1, "icon": "⚡",
        "translations": {
            "en": {"text": "Fast / Quick", "meaning": "Fast / Quick", "pron": "FAST / KWIK"},
            "es": {"text": "Rápido", "meaning": "Fast / Quick", "pron": "RAH-pee-doh"},
            "fr": {"text": "Rapide", "meaning": "Fast / Quick", "pron": "rah-PEED"},
            "ru": {"text": "Быстрый / Быстро", "meaning": "Fast / Quick", "pron": "BYS-try / BYS-trah"},
            "pt": {"text": "Rápido", "meaning": "Fast / Quick", "pron": "HAH-pee-doo"},
            "de": {"text": "Schnell", "meaning": "Fast / Quick", "pron": "SHNELL"},
            "id": {"text": "Cepat", "meaning": "Fast / Quick", "pron": "CHEH-paht"},
            "tr": {"text": "Hızlı", "meaning": "Fast / Quick", "pron": "huz-LUH"}
        }
    },
    {
        "id": "slow", "category": "Descriptions", "level": 1, "icon": "🐢",
        "translations": {
            "en": {"text": "Slow", "meaning": "Slow", "pron": "SLOH"},
            "es": {"text": "Lento", "meaning": "Slow", "pron": "LEHN-toh"},
            "fr": {"text": "Lent", "meaning": "Slow", "pron": "LAHN"},
            "ru": {"text": "Медленный / Медленно", "meaning": "Slow", "pron": "MYED-leen-ny / MYED-leen-nah"},
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
            "ru": {"text": "Счастливый / Рад", "meaning": "Happy", "pron": "schahs-LEE-vy / RAHT"},
            "pt": {"text": "Feliz", "meaning": "Happy", "pron": "feh-LEEZ"},
            "de": {"text": "Glücklich", "meaning": "Happy", "pron": "GLOOK-likh"},
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
            "ru": {"text": "Готов / Готовый", "meaning": "Ready", "pron": "gah-TOHF / gah-TOH-vy"},
            "pt": {"text": "Pronto", "meaning": "Ready", "pron": "PROHN-too"},
            "de": {"text": "Bereit", "meaning": "Ready", "pron": "buh-RYT"},
            "id": {"text": "Siap", "meaning": "Ready", "pron": "SEE-ahp"},
            "tr": {"text": "Hazır", "meaning": "Ready", "pron": "hah-ZUHR"}
        }
    },
    {
        "id": "open", "category": "Descriptions", "level": 1, "icon": "🟢",
        "translations": {
            "en": {"text": "Open", "meaning": "Open", "pron": "OH-puhn"},
            "es": {"text": "Abierto", "meaning": "Open", "pron": "ah-bveye-EHR-toh"},
            "fr": {"text": "Ouvert", "meaning": "Open", "pron": "oo-VEHR"},
            "ru": {"text": "Открыто / Открытый", "meaning": "Open", "pron": "aht-KRY-tah / aht-KRY-ty"},
            "pt": {"text": "Aberto", "meaning": "Open", "pron": "ah-BEHR-too"},
            "de": {"text": "Offen", "meaning": "Open", "pron": "AWF-fuhn"},
            "id": {"text": "Buka", "meaning": "Open", "pron": "BOO-kah"},
            "tr": {"text": "Açık", "meaning": "Open", "pron": "ah-CHUK"}
        }
    },
    {
        "id": "closed", "category": "Descriptions", "level": 1, "icon": "🔴",
        "translations": {
            "en": {"text": "Closed", "meaning": "Closed", "pron": "KLOHZD"},
            "es": {"text": "Cerrado", "meaning": "Closed", "pron": "sehr-RAH-doh"},
            "fr": {"text": "Fermé", "meaning": "Closed", "pron": "fehr-MAY"},
            "ru": {"text": "Закрыто / Закрытый", "meaning": "Closed", "pron": "zah-KRY-tah / zah-KRY-ty"},
            "pt": {"text": "Fechado", "meaning": "Closed", "pron": "feh-SHAH-doo"},
            "de": {"text": "Geschlossen", "meaning": "Closed", "pron": "guh-SHLAWS-suhn"},
            "id": {"text": "Tutup", "meaning": "Closed", "pron": "TOO-toop"},
            "tr": {"text": "Kapalı", "meaning": "Closed", "pron": "kah-pah-LUH"}
        }
    },
    {
        "id": "hot", "category": "Descriptions", "level": 1, "icon": "🔥",
        "translations": {
            "en": {"text": "Hot", "meaning": "Hot", "pron": "HAHT"},
            "es": {"text": "Caliente / Calor", "meaning": "Hot", "pron": "kah-LYEHN-teh / kah-LOHR"},
            "fr": {"text": "Chaud", "meaning": "Hot", "pron": "SHOH"},
            "ru": {"text": "Жарко / Горячий", "meaning": "Hot", "pron": "ZHAR-kah / gah-RYAH-cheey"},
            "pt": {"text": "Quente", "meaning": "Hot", "pron": "KEHN-chee"},
            "de": {"text": "Heiß", "meaning": "Hot", "pron": "HYS"},
            "id": {"text": "Panas", "meaning": "Hot", "pron": "PAH-nahs"},
            "tr": {"text": "Sıcak", "meaning": "Hot", "pron": "suh-JAHK"}
        }
    },
    {
        "id": "old", "category": "Descriptions", "level": 1, "icon": "🕰️",
        "translations": {
            "en": {"text": "Old", "meaning": "Old", "pron": "OHLD"},
            "es": {"text": "Viejo", "meaning": "Old", "pron": "BYEH-hoh"},
            "fr": {"text": "Vieux", "meaning": "Old", "pron": "VYUH"},
            "ru": {"text": "Старый", "meaning": "Old", "pron": "STAH-ry"},
            "pt": {"text": "Velho", "meaning": "Old", "pron": "VEHL-yoo"},
            "de": {"text": "Alt", "meaning": "Old", "pron": "AHLT"},
            "id": {"text": "Tua / Lama", "meaning": "Old", "pron": "TOO-ah / LAH-mah"},
            "tr": {"text": "Eski / Yaşlı", "meaning": "Old", "pron": "es-KEE / yahsh-LUH"}
        }
    }
]

def clean_key(phrase: str) -> str:
    return phrase.lower().strip()

def update_language_file(lang: str):
    file_path = LANG_FILES[lang]
    if not file_path.exists():
        print(f"Error: {file_path} not found!")
        return 0

    content = file_path.read_text(encoding="utf-8")
    is_ru = (lang == "ru")

    # Remove any existing Batch 2 additions first to guarantee clean idempotence
    content = re.sub(r"\n\s*// Batch 2: High-Yield Everyday Vocabulary & Parity \(Levels 1 & 2\)[\s\S]*?(?=\n\];)", "", content)

    # Extract existing phrases from the entire file before Batch 2
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

    addition = "\n  // Batch 2: High-Yield Everyday Vocabulary & Parity (Levels 1 & 2)\n" + "\n".join(new_entries)
    new_content = content[:match.start()] + before_header + array_body + addition + after_bracket + content[match.end():]

    file_path.write_text(new_content, encoding="utf-8")
    print(f"[{lang.upper()}] Added {len(new_entries)} new high-yield words!")
    return len(new_entries)

def main():
    print("=== Expanding Batch 2 Vocabulary across 8 Languages ===")
    counts = {}
    for lang in LANG_FILES:
        counts[lang] = update_language_file(lang)
    print("=== Summary of Words Added ===")
    for lang, cnt in counts.items():
        print(f"  {lang.upper()}: +{cnt} words (+{cnt * 2} quiz questions)")
    print("=== Vocabulary Expansion Complete! ===")

if __name__ == "__main__":
    main()
