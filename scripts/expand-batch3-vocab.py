#!/usr/bin/env python3
"""
Batch 3 Vocabulary & Sections Expansion: Calendar, Family, Body, Kitchen & Everyday Life
Expands all 8 supported language courses with core vocabulary across:
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

VOCABULARY_ITEMS = [
    # ==========================================
    # DAYS & CALENDAR (Items 1 - 10)
    # ==========================================
    {
        "id": "monday", "category": "Calendar", "level": 1, "icon": "📅",
        "translations": {
            "en": {"text": "Monday", "meaning": "Monday", "pron": "MUHN-day"},
            "es": {"text": "Lunes", "meaning": "Monday", "pron": "LOO-nehs"},
            "fr": {"text": "Lundi", "meaning": "Monday", "pron": "luhn-DEE"},
            "ru": {"text": "Понедельник", "meaning": "Monday", "pron": "pah-nyee-DYEL-neek"},
            "pt": {"text": "Segunda-feira", "meaning": "Monday", "pron": "seh-GOON-dah FAY-rah"},
            "de": {"text": "Montag", "meaning": "Monday", "pron": "MOHN-tahk"},
            "id": {"text": "Senin", "meaning": "Monday", "pron": "seh-NEEN"},
            "tr": {"text": "Pazartesi", "meaning": "Monday", "pron": "pah-zahr-teh-SEE"}
        }
    },
    {
        "id": "tuesday", "category": "Calendar", "level": 1, "icon": "📅",
        "translations": {
            "en": {"text": "Tuesday", "meaning": "Tuesday", "pron": "TOOZ-day"},
            "es": {"text": "Martes", "meaning": "Tuesday", "pron": "MAHR-tehs"},
            "fr": {"text": "Mardi", "meaning": "Tuesday", "pron": "mahr-DEE"},
            "ru": {"text": "Вторник", "meaning": "Tuesday", "pron": "VTOHR-neek"},
            "pt": {"text": "Terça-feira", "meaning": "Tuesday", "pron": "TEHR-sah FAY-rah"},
            "de": {"text": "Dienstag", "meaning": "Tuesday", "pron": "DEENS-tahk"},
            "id": {"text": "Selasa", "meaning": "Tuesday", "pron": "seh-LAH-sah"},
            "tr": {"text": "Salı", "meaning": "Tuesday", "pron": "sah-LUH"}
        }
    },
    {
        "id": "wednesday", "category": "Calendar", "level": 1, "icon": "📅",
        "translations": {
            "en": {"text": "Wednesday", "meaning": "Wednesday", "pron": "WENZ-day"},
            "es": {"text": "Miércoles", "meaning": "Wednesday", "pron": "MYEHR-koh-lehs"},
            "fr": {"text": "Mercredi", "meaning": "Wednesday", "pron": "mehr-kruh-DEE"},
            "ru": {"text": "Среда", "meaning": "Wednesday", "pron": "sryee-DAH"},
            "pt": {"text": "Quarta-feira", "meaning": "Wednesday", "pron": "KWAHR-tah FAY-rah"},
            "de": {"text": "Mittwoch", "meaning": "Wednesday", "pron": "MIT-vokh"},
            "id": {"text": "Rabu", "meaning": "Wednesday", "pron": "RAH-boo"},
            "tr": {"text": "Çarşamba", "meaning": "Wednesday", "pron": "chahr-shahm-BAH"}
        }
    },
    {
        "id": "thursday", "category": "Calendar", "level": 1, "icon": "📅",
        "translations": {
            "en": {"text": "Thursday", "meaning": "Thursday", "pron": "THURZ-day"},
            "es": {"text": "Jueves", "meaning": "Thursday", "pron": "HWEH-bvehs"},
            "fr": {"text": "Jeudi", "meaning": "Thursday", "pron": "zhuh-DEE"},
            "ru": {"text": "Четверг", "meaning": "Thursday", "pron": "cheet-VYEHRK"},
            "pt": {"text": "Quinta-feira", "meaning": "Thursday", "pron": "KEEN-tah FAY-rah"},
            "de": {"text": "Donnerstag", "meaning": "Thursday", "pron": "DAWN-uhrs-tahk"},
            "id": {"text": "Kamis", "meaning": "Thursday", "pron": "KAH-mees"},
            "tr": {"text": "Perşembe", "meaning": "Thursday", "pron": "pehr-shehm-BEH"}
        }
    },
    {
        "id": "friday", "category": "Calendar", "level": 1, "icon": "📅",
        "translations": {
            "en": {"text": "Friday", "meaning": "Friday", "pron": "FRY-day"},
            "es": {"text": "Viernes", "meaning": "Friday", "pron": "BYEHR-nehs"},
            "fr": {"text": "Vendredi", "meaning": "Friday", "pron": "vahn-druh-DEE"},
            "ru": {"text": "Пятница", "meaning": "Friday", "pron": "PYAHT-nyee-tsah"},
            "pt": {"text": "Sexta-feira", "meaning": "Friday", "pron": "SEHS-tah FAY-rah"},
            "de": {"text": "Freitag", "meaning": "Friday", "pron": "FRY-tahk"},
            "id": {"text": "Jumat", "meaning": "Friday", "pron": "joo-MAHT"},
            "tr": {"text": "Cuma", "meaning": "Friday", "pron": "djoo-MAH"}
        }
    },
    {
        "id": "saturday", "category": "Calendar", "level": 1, "icon": "📅",
        "translations": {
            "en": {"text": "Saturday", "meaning": "Saturday", "pron": "SAT-er-day"},
            "es": {"text": "Sábado", "meaning": "Saturday", "pron": "SAH-bah-doh"},
            "fr": {"text": "Samedi", "meaning": "Saturday", "pron": "sahm-DEE"},
            "ru": {"text": "Суббота", "meaning": "Saturday", "pron": "soo-BOH-tah"},
            "pt": {"text": "Sábado", "meaning": "Saturday", "pron": "SAH-bah-doo"},
            "de": {"text": "Samstag", "meaning": "Saturday", "pron": "ZAHMS-tahk"},
            "id": {"text": "Sabtu", "meaning": "Saturday", "pron": "SAHB-too"},
            "tr": {"text": "Cumartesi", "meaning": "Saturday", "pron": "djoo-mahr-teh-SEE"}
        }
    },
    {
        "id": "sunday", "category": "Calendar", "level": 1, "icon": "📅",
        "translations": {
            "en": {"text": "Sunday", "meaning": "Sunday", "pron": "SUHN-day"},
            "es": {"text": "Domingo", "meaning": "Sunday", "pron": "doh-MEEN-goh"},
            "fr": {"text": "Dimanche", "meaning": "Sunday", "pron": "dee-MAHNSH"},
            "ru": {"text": "Воскресенье", "meaning": "Sunday", "pron": "vahsk-ryee-SYEN-yye"},
            "pt": {"text": "Domingo", "meaning": "Sunday", "pron": "doh-MEEN-goo"},
            "de": {"text": "Sonntag", "meaning": "Sunday", "pron": "ZAWN-tahk"},
            "id": {"text": "Minggu", "meaning": "Sunday", "pron": "MEENG-goo"},
            "tr": {"text": "Pazar", "meaning": "Sunday", "pron": "pah-ZAHR"}
        }
    },
    {
        "id": "week", "category": "Calendar", "level": 1, "icon": "🗓️",
        "translations": {
            "en": {"text": "Week", "meaning": "Week", "pron": "WEEK"},
            "es": {"text": "Semana", "meaning": "Week", "pron": "seh-MAH-nah"},
            "fr": {"text": "Semaine", "meaning": "Week", "pron": "suh-MEHN"},
            "ru": {"text": "Неделя", "meaning": "Week", "pron": "nyee-DYE-lyah"},
            "pt": {"text": "Semana", "meaning": "Week", "pron": "seh-MAH-nah"},
            "de": {"text": "Woche", "meaning": "Week", "pron": "VAW-khuh"},
            "id": {"text": "Minggu", "meaning": "Week", "pron": "MEENG-goo"},
            "tr": {"text": "Hafta", "meaning": "Week", "pron": "hahf-TAH"}
        }
    },
    {
        "id": "month", "category": "Calendar", "level": 1, "icon": "📆",
        "translations": {
            "en": {"text": "Month", "meaning": "Month", "pron": "MUHNTH"},
            "es": {"text": "Mes", "meaning": "Month", "pron": "MEHS"},
            "fr": {"text": "Mois", "meaning": "Month", "pron": "MWAH"},
            "ru": {"text": "Месяц", "meaning": "Month", "pron": "MYE-syets"},
            "pt": {"text": "Mês", "meaning": "Month", "pron": "MAYS"},
            "de": {"text": "Monat", "meaning": "Month", "pron": "MOH-naht"},
            "id": {"text": "Bulan", "meaning": "Month", "pron": "BOO-lahn"},
            "tr": {"text": "Ay", "meaning": "Month", "pron": "EYE"}
        }
    },
    {
        "id": "year", "category": "Calendar", "level": 1, "icon": "🎆",
        "translations": {
            "en": {"text": "Year", "meaning": "Year", "pron": "YEER"},
            "es": {"text": "Año", "meaning": "Year", "pron": "AH-nyoh"},
            "fr": {"text": "An / Année", "meaning": "Year", "pron": "AHN / ah-NAY"},
            "ru": {"text": "Год", "meaning": "Year", "pron": "GOHT"},
            "pt": {"text": "Ano", "meaning": "Year", "pron": "AH-noo"},
            "de": {"text": "Jahr", "meaning": "Year", "pron": "YAHR"},
            "id": {"text": "Tahun", "meaning": "Year", "pron": "TAH-hoon"},
            "tr": {"text": "Yıl", "meaning": "Year", "pron": "YUL"}
        }
    },

    # ==========================================
    # FAMILY & RELATIONS (Items 11 - 12)
    # ==========================================
    {
        "id": "brother", "category": "Family", "level": 1, "icon": "👦",
        "translations": {
            "en": {"text": "Brother", "meaning": "Brother", "pron": "BRUH-dher"},
            "es": {"text": "Hermano", "meaning": "Brother", "pron": "ehr-MAH-noh"},
            "fr": {"text": "Frère", "meaning": "Brother", "pron": "FREHR"},
            "ru": {"text": "Брат", "meaning": "Brother", "pron": "BRAHT"},
            "pt": {"text": "Irmão", "meaning": "Brother", "pron": "eer-MOWN"},
            "de": {"text": "Bruder", "meaning": "Brother", "pron": "BROO-duhr"},
            "id": {"text": "Saudara laki-laki", "meaning": "Brother", "pron": "sow-DAH-rah LAH-kee LAH-kee"},
            "tr": {"text": "Erkek kardeş", "meaning": "Brother", "pron": "ehr-KEK kahr-DESH"}
        }
    },
    {
        "id": "sister", "category": "Family", "level": 1, "icon": "👧",
        "translations": {
            "en": {"text": "Sister", "meaning": "Sister", "pron": "SIS-ter"},
            "es": {"text": "Hermana", "meaning": "Sister", "pron": "ehr-MAH-nah"},
            "fr": {"text": "Sœur", "meaning": "Sister", "pron": "SUHR"},
            "ru": {"text": "Сестра", "meaning": "Sister", "pron": "syees-TRAH"},
            "pt": {"text": "Irmã", "meaning": "Sister", "pron": "eer-MAHN"},
            "de": {"text": "Schwester", "meaning": "Sister", "pron": "SHVES-tuhr"},
            "id": {"text": "Saudara perempuan", "meaning": "Sister", "pron": "sow-DAH-rah peh-rehm-POO-ahn"},
            "tr": {"text": "Kız kardeş", "meaning": "Sister", "pron": "KUZ kahr-DESH"}
        }
    },

    # ==========================================
    # BODY & SENSES (Items 13 - 18)
    # ==========================================
    {
        "id": "eye", "category": "Health", "level": 1, "icon": "👁️",
        "translations": {
            "en": {"text": "Eye", "meaning": "Eye", "pron": "EYE"},
            "es": {"text": "Ojo", "meaning": "Eye", "pron": "OH-hoh"},
            "fr": {"text": "Œil", "meaning": "Eye", "pron": "UHY"},
            "ru": {"text": "Глаз", "meaning": "Eye", "pron": "GLAHS"},
            "pt": {"text": "Olho", "meaning": "Eye", "pron": "OHL-yoo"},
            "de": {"text": "Auge", "meaning": "Eye", "pron": "OW-guh"},
            "id": {"text": "Mata", "meaning": "Eye", "pron": "MAH-tah"},
            "tr": {"text": "Göz", "meaning": "Eye", "pron": "GOHZ"}
        }
    },
    {
        "id": "eyes", "category": "Health", "level": 1, "icon": "👀",
        "translations": {
            "en": {"text": "Eyes", "meaning": "Eyes", "pron": "EYEZ"},
            "es": {"text": "Ojos", "meaning": "Eyes", "pron": "OH-hohs"},
            "fr": {"text": "Yeux", "meaning": "Eyes", "pron": "YUH"},
            "ru": {"text": "Глаза", "meaning": "Eyes", "pron": "glah-ZAH"},
            "pt": {"text": "Olhos", "meaning": "Eyes", "pron": "OHL-yoos"},
            "de": {"text": "Augen", "meaning": "Eyes", "pron": "OW-guhn"},
            "id": {"text": "Mata", "meaning": "Eyes", "pron": "MAH-tah"},
            "tr": {"text": "Gözler", "meaning": "Eyes", "pron": "gohz-LEHR"}
        }
    },
    {
        "id": "nose", "category": "Health", "level": 1, "icon": "👃",
        "translations": {
            "en": {"text": "Nose", "meaning": "Nose", "pron": "NOHZ"},
            "es": {"text": "Nariz", "meaning": "Nose", "pron": "nah-REES"},
            "fr": {"text": "Nez", "meaning": "Nose", "pron": "NAY"},
            "ru": {"text": "Нос", "meaning": "Nose", "pron": "NOHS"},
            "pt": {"text": "Nariz", "meaning": "Nose", "pron": "nah-REES"},
            "de": {"text": "Nase", "meaning": "Nose", "pron": "NAH-zuh"},
            "id": {"text": "Hidung", "meaning": "Nose", "pron": "HEE-doong"},
            "tr": {"text": "Burun", "meaning": "Nose", "pron": "boo-ROON"}
        }
    },
    {
        "id": "cheek", "category": "Health", "level": 1, "icon": "😊",
        "translations": {
            "en": {"text": "Cheek", "meaning": "Cheek", "pron": "CHEEK"},
            "es": {"text": "Mejilla", "meaning": "Cheek", "pron": "meh-HEE-yah"},
            "fr": {"text": "Joue", "meaning": "Cheek", "pron": "ZHOO"},
            "ru": {"text": "Щека", "meaning": "Cheek", "pron": "shchee-KAH"},
            "pt": {"text": "Bochecha", "meaning": "Cheek", "pron": "boh-SHAY-shah"},
            "de": {"text": "Wange", "meaning": "Cheek", "pron": "VAHNG-uh"},
            "id": {"text": "Pipi", "meaning": "Cheek", "pron": "PEE-pee"},
            "tr": {"text": "Yanak", "meaning": "Cheek", "pron": "yah-NAHK"}
        }
    },
    {
        "id": "heart", "category": "Health", "level": 1, "icon": "❤️",
        "translations": {
            "en": {"text": "Heart", "meaning": "Heart", "pron": "HAHRT"},
            "es": {"text": "Corazón", "meaning": "Heart", "pron": "koh-rah-SOHN"},
            "fr": {"text": "Cœur", "meaning": "Heart", "pron": "KUHR"},
            "ru": {"text": "Сердце", "meaning": "Heart", "pron": "SYEHRT-tseh"},
            "pt": {"text": "Coração", "meaning": "Heart", "pron": "koh-rah-SOWN"},
            "de": {"text": "Herz", "meaning": "Heart", "pron": "HEHRTS"},
            "id": {"text": "Hati", "meaning": "Heart", "pron": "HAH-tee"},
            "tr": {"text": "Kalp", "meaning": "Heart", "pron": "KAHLP"}
        }
    },
    {
        "id": "voice", "category": "Health", "level": 1, "icon": "🗣️",
        "translations": {
            "en": {"text": "Voice", "meaning": "Voice", "pron": "VOYS"},
            "es": {"text": "Voz", "meaning": "Voice", "pron": "BOHS"},
            "fr": {"text": "Voix", "meaning": "Voice", "pron": "VWAH"},
            "ru": {"text": "Голос", "meaning": "Voice", "pron": "GOH-lahs"},
            "pt": {"text": "Voz", "meaning": "Voice", "pron": "VOHS"},
            "de": {"text": "Stimme", "meaning": "Voice", "pron": "SHTIM-muh"},
            "id": {"text": "Suara", "meaning": "Voice", "pron": "swah-RAH"},
            "tr": {"text": "Ses", "meaning": "Voice", "pron": "SEHS"}
        }
    },

    # ==========================================
    # KITCHEN & DINING ESSENTIALS (Items 19 - 26)
    # ==========================================
    {
        "id": "cup", "category": "Food", "level": 1, "icon": "☕",
        "translations": {
            "en": {"text": "Cup", "meaning": "Cup", "pron": "KUHP"},
            "es": {"text": "Taza", "meaning": "Cup", "pron": "TAH-sah"},
            "fr": {"text": "Tasse", "meaning": "Cup", "pron": "TAHS"},
            "ru": {"text": "Чашка", "meaning": "Cup", "pron": "CHAHSH-kah"},
            "pt": {"text": "Xícara", "meaning": "Cup", "pron": "SHEE-kah-rah"},
            "de": {"text": "Tasse", "meaning": "Cup", "pron": "TAHS-suh"},
            "id": {"text": "Cangkir", "meaning": "Cup", "pron": "CHAHNG-keer"},
            "tr": {"text": "Fincan", "meaning": "Cup", "pron": "feen-DJAHN"}
        }
    },
    {
        "id": "glass", "category": "Food", "level": 1, "icon": "🥛",
        "translations": {
            "en": {"text": "Glass (cup)", "meaning": "Glass (cup)", "pron": "GLAS"},
            "es": {"text": "Vaso", "meaning": "Glass (cup)", "pron": "BVAY-soh"},
            "fr": {"text": "Verre", "meaning": "Glass (cup)", "pron": "VEHR"},
            "ru": {"text": "Стакан", "meaning": "Glass (cup)", "pron": "stah-KAHN"},
            "pt": {"text": "Copo", "meaning": "Glass (cup)", "pron": "KOH-poo"},
            "de": {"text": "Glas", "meaning": "Glass (cup)", "pron": "GLAHS"},
            "id": {"text": "Gelas", "meaning": "Glass (cup)", "pron": "GEH-lahs"},
            "tr": {"text": "Bardak", "meaning": "Glass (cup)", "pron": "bahr-DAHK"}
        }
    },
    {
        "id": "kettle", "category": "Food", "level": 1, "icon": "🫖",
        "translations": {
            "en": {"text": "Kettle", "meaning": "Kettle", "pron": "KET-uhl"},
            "es": {"text": "Tetera", "meaning": "Kettle", "pron": "teh-TEH-rah"},
            "fr": {"text": "Bouilloire", "meaning": "Kettle", "pron": "boo-YWAHR"},
            "ru": {"text": "Чайник", "meaning": "Kettle", "pron": "CHY-neek"},
            "pt": {"text": "Chaleira", "meaning": "Kettle", "pron": "shah-LAY-rah"},
            "de": {"text": "Wasserkocher", "meaning": "Kettle", "pron": "VAH-suhr-kaw-khuhr"},
            "id": {"text": "Teko", "meaning": "Kettle", "pron": "TEH-koh"},
            "tr": {"text": "Çaydanlık", "meaning": "Kettle", "pron": "chy-dahn-LUK"}
        }
    },
    {
        "id": "oil", "category": "Food", "level": 1, "icon": "🫒",
        "translations": {
            "en": {"text": "Oil", "meaning": "Oil", "pron": "OYL"},
            "es": {"text": "Aceite", "meaning": "Oil", "pron": "ah-SAY-teh"},
            "fr": {"text": "Huile", "meaning": "Oil", "pron": "WEEL"},
            "ru": {"text": "Масло", "meaning": "Oil", "pron": "MAHS-lah"},
            "pt": {"text": "Óleo", "meaning": "Oil", "pron": "OH-lyoo"},
            "de": {"text": "Öl", "meaning": "Oil", "pron": "UHL"},
            "id": {"text": "Minyak", "meaning": "Oil", "pron": "MEEN-yahk"},
            "tr": {"text": "Yağ", "meaning": "Oil", "pron": "YAH"}
        }
    },
    {
        "id": "lemon", "category": "Food", "level": 1, "icon": "🍋",
        "translations": {
            "en": {"text": "Lemon", "meaning": "Lemon", "pron": "LEM-uhn"},
            "es": {"text": "Limón", "meaning": "Lemon", "pron": "lee-MOHN"},
            "fr": {"text": "Citron", "meaning": "Lemon", "pron": "see-TROHN"},
            "ru": {"text": "Лимон", "meaning": "Lemon", "pron": "lee-MOHN"},
            "pt": {"text": "Limão", "meaning": "Lemon", "pron": "lee-MOWN"},
            "de": {"text": "Zitrone", "meaning": "Lemon", "pron": "tsee-TROH-nuh"},
            "id": {"text": "Lemon", "meaning": "Lemon", "pron": "LEH-mahn"},
            "tr": {"text": "Limon", "meaning": "Lemon", "pron": "lee-MOHN"}
        }
    },
    {
        "id": "orange", "category": "Food", "level": 1, "icon": "🍊",
        "translations": {
            "en": {"text": "Orange", "meaning": "Orange", "pron": "OR-inj"},
            "es": {"text": "Naranja", "meaning": "Orange", "pron": "nah-RAHN-hah"},
            "fr": {"text": "Orange", "meaning": "Orange", "pron": "oh-RAHNZH"},
            "ru": {"text": "Апельсин", "meaning": "Orange", "pron": "ah-pyel-SEEN"},
            "pt": {"text": "Laranja", "meaning": "Orange", "pron": "lah-RAHN-zhah"},
            "de": {"text": "Orange", "meaning": "Orange", "pron": "oh-RAHN-zhuh"},
            "id": {"text": "Oranye", "meaning": "Orange", "pron": "oh-RAHN-yeh"},
            "tr": {"text": "Turuncu", "meaning": "Orange", "pron": "too-roon-DJOO"}
        }
    },
    {
        "id": "yogurt", "category": "Food", "level": 1, "icon": "🥣",
        "translations": {
            "en": {"text": "Yogurt", "meaning": "Yogurt", "pron": "YOH-gert"},
            "es": {"text": "Yogur", "meaning": "Yogurt", "pron": "yoh-GOOR"},
            "fr": {"text": "Yaourt", "meaning": "Yogurt", "pron": "yah-OORT"},
            "ru": {"text": "Йогурт", "meaning": "Yogurt", "pron": "YOH-goort"},
            "pt": {"text": "Iogurte", "meaning": "Yogurt", "pron": "ee-oh-GOOR-chee"},
            "de": {"text": "Joghurt", "meaning": "Yogurt", "pron": "YOH-goort"},
            "id": {"text": "Yogurt", "meaning": "Yogurt", "pron": "YOH-goort"},
            "tr": {"text": "Yoğurt", "meaning": "Yogurt", "pron": "yoh-OORT"}
        }
    },
    {
        "id": "ice", "category": "Food", "level": 1, "icon": "🧊",
        "translations": {
            "en": {"text": "Ice", "meaning": "Ice", "pron": "EYES"},
            "es": {"text": "Hielo", "meaning": "Ice", "pron": "YEH-loh"},
            "fr": {"text": "Glace", "meaning": "Ice", "pron": "GLAHS"},
            "ru": {"text": "Лёд", "meaning": "Ice", "pron": "LYOHT"},
            "pt": {"text": "Gelo", "meaning": "Ice", "pron": "ZHEH-loo"},
            "de": {"text": "Eis", "meaning": "Ice", "pron": "EYES"},
            "id": {"text": "Es", "meaning": "Ice", "pron": "EHS"},
            "tr": {"text": "Buz", "meaning": "Ice", "pron": "BOOZ"}
        }
    },

    # ==========================================
    # WEATHER & NATURE (Items 27 - 33)
    # ==========================================
    {
        "id": "sun", "category": "Weather", "level": 1, "icon": "☀️",
        "translations": {
            "en": {"text": "Sun", "meaning": "Sun", "pron": "SUHN"},
            "es": {"text": "Sol", "meaning": "Sun", "pron": "SOHL"},
            "fr": {"text": "Soleil", "meaning": "Sun", "pron": "soh-LAY"},
            "ru": {"text": "Солнце", "meaning": "Sun", "pron": "SOHN-tseh"},
            "pt": {"text": "Sol", "meaning": "Sun", "pron": "SOHL"},
            "de": {"text": "Sonne", "meaning": "Sun", "pron": "ZAWN-nuh"},
            "id": {"text": "Matahari", "meaning": "Sun", "pron": "mah-tah-HAH-ree"},
            "tr": {"text": "Güneş", "meaning": "Sun", "pron": "gew-NESH"}
        }
    },
    {
        "id": "rain", "category": "Weather", "level": 1, "icon": "🌧️",
        "translations": {
            "en": {"text": "Rain", "meaning": "Rain", "pron": "RAYN"},
            "es": {"text": "Lluvia", "meaning": "Rain", "pron": "YOO-bvyah"},
            "fr": {"text": "Pluie", "meaning": "Rain", "pron": "PLWEE"},
            "ru": {"text": "Дождь", "meaning": "Rain", "pron": "DOHZHT"},
            "pt": {"text": "Chuva", "meaning": "Rain", "pron": "SHOO-vah"},
            "de": {"text": "Regen", "meaning": "Rain", "pron": "RAY-guhn"},
            "id": {"text": "Hujan", "meaning": "Rain", "pron": "HOO-jahn"},
            "tr": {"text": "Yağmur", "meaning": "Rain", "pron": "yah-MOOR"}
        }
    },
    {
        "id": "snow", "category": "Weather", "level": 1, "icon": "❄️",
        "translations": {
            "en": {"text": "Snow", "meaning": "Snow", "pron": "SNOH"},
            "es": {"text": "Nieve", "meaning": "Snow", "pron": "NYEH-bveh"},
            "fr": {"text": "Neige", "meaning": "Snow", "pron": "NEHZH"},
            "ru": {"text": "Снег", "meaning": "Snow", "pron": "SNYEK"},
            "pt": {"text": "Neve", "meaning": "Snow", "pron": "NEH-vee"},
            "de": {"text": "Schnee", "meaning": "Snow", "pron": "SHNAY"},
            "id": {"text": "Salju", "meaning": "Snow", "pron": "SAHL-joo"},
            "tr": {"text": "Kar", "meaning": "Snow", "pron": "KAHR"}
        }
    },
    {
        "id": "cold", "category": "Weather", "level": 1, "icon": "🥶",
        "translations": {
            "en": {"text": "Cold", "meaning": "Cold", "pron": "KOHLD"},
            "es": {"text": "Frío", "meaning": "Cold", "pron": "FREE-oh"},
            "fr": {"text": "Froid", "meaning": "Cold", "pron": "FRWAH"},
            "ru": {"text": "Холодно / Холодный", "meaning": "Cold", "pron": "KHOH-lahd-nah / khah-LOHD-ny"},
            "pt": {"text": "Frio", "meaning": "Cold", "pron": "FREE-oo"},
            "de": {"text": "Kalt", "meaning": "Cold", "pron": "KAHLT"},
            "id": {"text": "Dingin", "meaning": "Cold", "pron": "DEENG-een"},
            "tr": {"text": "Soğuk", "meaning": "Cold", "pron": "soh-OOK"}
        }
    },
    {
        "id": "hedgehog", "category": "Weather", "level": 2, "icon": "🦔",
        "translations": {
            "en": {"text": "Hedgehog", "meaning": "Hedgehog", "pron": "HEJ-hog"},
            "es": {"text": "Erizo", "meaning": "Hedgehog", "pron": "eh-REE-soh"},
            "fr": {"text": "Hérisson", "meaning": "Hedgehog", "pron": "ay-ree-SOHN"},
            "ru": {"text": "Ёж", "meaning": "Hedgehog", "pron": "YOHZH"},
            "pt": {"text": "Ouriço", "meaning": "Hedgehog", "pron": "oh-REE-soo"},
            "de": {"text": "Igel", "meaning": "Hedgehog", "pron": "EE-guhl"},
            "id": {"text": "Landak", "meaning": "Hedgehog", "pron": "LAHN-dahk"},
            "tr": {"text": "Kirpi", "meaning": "Hedgehog", "pron": "keer-PEE"}
        }
    },
    {
        "id": "beetle", "category": "Weather", "level": 2, "icon": "🪲",
        "translations": {
            "en": {"text": "Beetle / Bug", "meaning": "Beetle / Bug", "pron": "BEE-tuhl"},
            "es": {"text": "Escarabajo", "meaning": "Beetle / Bug", "pron": "ehs-kah-rah-BAH-hoh"},
            "fr": {"text": "Scarabée", "meaning": "Beetle / Bug", "pron": "skah-rah-BAY"},
            "ru": {"text": "Жук", "meaning": "Beetle / Bug", "pron": "ZHOOK"},
            "pt": {"text": "Besouro", "meaning": "Beetle / Bug", "pron": "beh-ZOH-roo"},
            "de": {"text": "Käfer", "meaning": "Beetle / Bug", "pron": "KAY-fuhr"},
            "id": {"text": "Kumbang", "meaning": "Beetle / Bug", "pron": "KOOM-bahng"},
            "tr": {"text": "Böcek", "meaning": "Beetle / Bug", "pron": "buh-DJEK"}
        }
    },
    {
        "id": "zebra", "category": "Weather", "level": 2, "icon": "🦓",
        "translations": {
            "en": {"text": "Zebra", "meaning": "Zebra", "pron": "ZEE-bruh"},
            "es": {"text": "Cebra", "meaning": "Zebra", "pron": "SEH-bvrah"},
            "fr": {"text": "Zèbre", "meaning": "Zebra", "pron": "ZEH-bruh"},
            "ru": {"text": "Зебра", "meaning": "Zebra", "pron": "ZYE-brah"},
            "pt": {"text": "Zebra", "meaning": "Zebra", "pron": "ZEH-brah"},
            "de": {"text": "Zebra", "meaning": "Zebra", "pron": "TSAY-brah"},
            "id": {"text": "Zebra", "meaning": "Zebra", "pron": "ZEH-brah"},
            "tr": {"text": "Zebra", "meaning": "Zebra", "pron": "ZEB-rah"}
        }
    },

    # ==========================================
    # MIND & EVERYDAY ESSENTIALS (Items 34 - 42)
    # ==========================================
    {
        "id": "idea", "category": "Essentials", "level": 1, "icon": "💡",
        "translations": {
            "en": {"text": "Idea", "meaning": "Idea", "pron": "eye-DEE-uh"},
            "es": {"text": "Idea", "meaning": "Idea", "pron": "ee-DEH-ah"},
            "fr": {"text": "Idée", "meaning": "Idea", "pron": "ee-DAY"},
            "ru": {"text": "Идея", "meaning": "Idea", "pron": "ee-DYE-yah"},
            "pt": {"text": "Ideia", "meaning": "Idea", "pron": "ee-DAY-ah"},
            "de": {"text": "Idee", "meaning": "Idea", "pron": "ee-DAY"},
            "id": {"text": "Ide", "meaning": "Idea", "pron": "EE-deh"},
            "tr": {"text": "Fikir", "meaning": "Idea", "pron": "fee-KEER"}
        }
    },
    {
        "id": "question", "category": "Essentials", "level": 1, "icon": "❓",
        "translations": {
            "en": {"text": "Question", "meaning": "Question", "pron": "KWES-chuhn"},
            "es": {"text": "Pregunta", "meaning": "Question", "pron": "preh-GOON-tah"},
            "fr": {"text": "Question", "meaning": "Question", "pron": "kehs-TYOHN"},
            "ru": {"text": "Вопрос", "meaning": "Question", "pron": "vah-PROHS"},
            "pt": {"text": "Pergunta", "meaning": "Question", "pron": "pehr-GOON-tah"},
            "de": {"text": "Frage", "meaning": "Question", "pron": "FRAH-guh"},
            "id": {"text": "Pertanyaan", "meaning": "Question", "pron": "pehr-tahn-YAH-ahn"},
            "tr": {"text": "Soru", "meaning": "Question", "pron": "soh-ROO"}
        }
    },
    {
        "id": "success", "category": "Essentials", "level": 2, "icon": "🏆",
        "translations": {
            "en": {"text": "Success", "meaning": "Success", "pron": "suhk-SES"},
            "es": {"text": "Éxito", "meaning": "Success", "pron": "EHK-see-toh"},
            "fr": {"text": "Succès", "meaning": "Success", "pron": "sook-SAY"},
            "ru": {"text": "Успех", "meaning": "Success", "pron": "oos-PYEKH"},
            "pt": {"text": "Sucesso", "meaning": "Success", "pron": "soo-SEH-soo"},
            "de": {"text": "Erfolg", "meaning": "Success", "pron": "ehr-FAWLG"},
            "id": {"text": "Sukses", "meaning": "Success", "pron": "SOOK-sehs"},
            "tr": {"text": "Başarı", "meaning": "Success", "pron": "bah-shah-RUH"}
        }
    },
    {
        "id": "love", "category": "Essentials", "level": 1, "icon": "❤️",
        "translations": {
            "en": {"text": "Love", "meaning": "Love", "pron": "LUHV"},
            "es": {"text": "Amor", "meaning": "Love", "pron": "ah-MOHR"},
            "fr": {"text": "Amour", "meaning": "Love", "pron": "ah-MOOR"},
            "ru": {"text": "Любовь", "meaning": "Love", "pron": "lyoo-BOHF"},
            "pt": {"text": "Amor", "meaning": "Love", "pron": "ah-MOHR"},
            "de": {"text": "Liebe", "meaning": "Love", "pron": "LEE-buh"},
            "id": {"text": "Cinta", "meaning": "Love", "pron": "CHEEN-tah"},
            "tr": {"text": "Aşk", "meaning": "Love", "pron": "AHSHK"}
        }
    },
    {
        "id": "name", "category": "Essentials", "level": 1, "icon": "🏷️",
        "translations": {
            "en": {"text": "Name", "meaning": "Name", "pron": "NAYM"},
            "es": {"text": "Nombre", "meaning": "Name", "pron": "NOHM-breh"},
            "fr": {"text": "Nom", "meaning": "Name", "pron": "NOHN"},
            "ru": {"text": "Имя", "meaning": "Name", "pron": "EE-myah"},
            "pt": {"text": "Nome", "meaning": "Name", "pron": "NOH-mee"},
            "de": {"text": "Name", "meaning": "Name", "pron": "NAH-muh"},
            "id": {"text": "Nama", "meaning": "Name", "pron": "NAH-mah"},
            "tr": {"text": "İsim", "meaning": "Name", "pron": "ee-SEEM"}
        }
    },
    {
        "id": "quiet", "category": "Essentials", "level": 1, "icon": "🤫",
        "translations": {
            "en": {"text": "Quiet", "meaning": "Quiet", "pron": "KWY-uht"},
            "es": {"text": "Tranquilo / Silencioso", "meaning": "Quiet", "pron": "trahn-KEE-loh / see-lehn-SYOH-soh"},
            "fr": {"text": "Silencieux / Calme", "meaning": "Quiet", "pron": "see-lahn-SYUH / KAHM"},
            "ru": {"text": "Тихий", "meaning": "Quiet", "pron": "TEE-kheey"},
            "pt": {"text": "Calmo", "meaning": "Quiet", "pron": "KAHL-moo"},
            "de": {"text": "Ruhig", "meaning": "Quiet", "pron": "ROO-ik"},
            "id": {"text": "Tenang", "meaning": "Quiet", "pron": "teh-NAHNG"},
            "tr": {"text": "Sessiz", "meaning": "Quiet", "pron": "ses-SEEZ"}
        }
    },
    {
        "id": "light", "category": "Essentials", "level": 1, "icon": "💡",
        "translations": {
            "en": {"text": "Light", "meaning": "Light", "pron": "LYT"},
            "es": {"text": "Luz", "meaning": "Light", "pron": "LOOS"},
            "fr": {"text": "Lumière", "meaning": "Light", "pron": "loo-MYEHR"},
            "ru": {"text": "Свет", "meaning": "Light", "pron": "SVYET"},
            "pt": {"text": "Luz", "meaning": "Light", "pron": "LOOS"},
            "de": {"text": "Licht", "meaning": "Light", "pron": "LIKHT"},
            "id": {"text": "Cahaya", "meaning": "Light", "pron": "chah-HAH-yah"},
            "tr": {"text": "Işık", "meaning": "Light", "pron": "uh-SHUK"}
        }
    },
    {
        "id": "key", "category": "Essentials", "level": 1, "icon": "🔑",
        "translations": {
            "en": {"text": "Key", "meaning": "Key", "pron": "KEE"},
            "es": {"text": "Llave", "meaning": "Key", "pron": "YAH-bveh"},
            "fr": {"text": "Clé", "meaning": "Key", "pron": "KLAY"},
            "ru": {"text": "Ключ", "meaning": "Key", "pron": "KLYOOCH"},
            "pt": {"text": "Chave", "meaning": "Key", "pron": "SHAH-vee"},
            "de": {"text": "Schlüssel", "meaning": "Key", "pron": "SHLYOOS-suhl"},
            "id": {"text": "Kunci", "meaning": "Key", "pron": "KOON-chee"},
            "tr": {"text": "Anahtar", "meaning": "Key", "pron": "ah-nahh-TAHR"}
        }
    },
    {
        "id": "island", "category": "Travel", "level": 1, "icon": "🏝️",
        "translations": {
            "en": {"text": "Island", "meaning": "Island", "pron": "EYE-luhnd"},
            "es": {"text": "Isla", "meaning": "Island", "pron": "EES-lah"},
            "fr": {"text": "Île", "meaning": "Island", "pron": "EEL"},
            "ru": {"text": "Остров", "meaning": "Island", "pron": "OHS-trahf"},
            "pt": {"text": "Ilha", "meaning": "Island", "pron": "EEL-yah"},
            "de": {"text": "Insel", "meaning": "Island", "pron": "IN-zuhl"},
            "id": {"text": "Pulau", "meaning": "Island", "pron": "POO-low"},
            "tr": {"text": "Ada", "meaning": "Island", "pron": "ah-DAH"}
        }
    },

    # ==========================================
    # DESCRIPTIONS & SIZES (Items 43 - 45)
    # ==========================================
    {
        "id": "big", "category": "Descriptions", "level": 1, "icon": "🐘",
        "translations": {
            "en": {"text": "Big / Large", "meaning": "Big / Large", "pron": "BIG"},
            "es": {"text": "Grande", "meaning": "Big / Large", "pron": "GRAHN-deh"},
            "fr": {"text": "Grand", "meaning": "Big / Large", "pron": "GRAHN"},
            "ru": {"text": "Большой", "meaning": "Big / Large", "pron": "bahl-SHOY"},
            "pt": {"text": "Grande", "meaning": "Big / Large", "pron": "GRAHN-jee"},
            "de": {"text": "Groß", "meaning": "Big / Large", "pron": "GROHS"},
            "id": {"text": "Besar", "meaning": "Big / Large", "pron": "beh-SAHR"},
            "tr": {"text": "Büyük", "meaning": "Big / Large", "pron": "bew-YEWK"}
        }
    },
    {
        "id": "small", "category": "Descriptions", "level": 1, "icon": "🐭",
        "translations": {
            "en": {"text": "Small / Little", "meaning": "Small / Little", "pron": "SMAWL"},
            "es": {"text": "Pequeño", "meaning": "Small / Little", "pron": "peh-KEH-nyoh"},
            "fr": {"text": "Petit", "meaning": "Small / Little", "pron": "puh-TEE"},
            "ru": {"text": "Маленький", "meaning": "Small / Little", "pron": "MAH-lyeen-keey"},
            "pt": {"text": "Pequeno", "meaning": "Small / Little", "pron": "peh-KAY-noo"},
            "de": {"text": "Klein", "meaning": "Small / Little", "pron": "KLYN"},
            "id": {"text": "Kecil", "meaning": "Small / Little", "pron": "keh-CHEEL"},
            "tr": {"text": "Küçük", "meaning": "Small / Little", "pron": "kew-CHEWK"}
        }
    },
    {
        "id": "new", "category": "Descriptions", "level": 1, "icon": "✨",
        "translations": {
            "en": {"text": "New", "meaning": "New", "pron": "NOO"},
            "es": {"text": "Nuevo", "meaning": "New", "pron": "NWEH-bvoh"},
            "fr": {"text": "Nouveau", "meaning": "New", "pron": "noo-VOH"},
            "ru": {"text": "Новый", "meaning": "New", "pron": "NOH-vy"},
            "pt": {"text": "Novo", "meaning": "New", "pron": "NOH-voo"},
            "de": {"text": "Neu", "meaning": "New", "pron": "NOY"},
            "id": {"text": "Baru", "meaning": "New", "pron": "BAH-roo"},
            "tr": {"text": "Yeni", "meaning": "New", "pron": "yeh-NEE"}
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

    # Remove any existing Batch 3 additions first to guarantee clean idempotence
    content = re.sub(r"\n\s*// Batch 3: Calendar, Family, Body, Kitchen & Everyday Life[\s\S]*?(?=\n\];)", "", content)

    # Extract existing phrases from the entire file before Batch 3
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

    addition = "\n  // Batch 3: Calendar, Family, Body, Kitchen & Everyday Life\n" + "\n".join(new_entries)
    new_content = content[:match.start()] + before_header + array_body + addition + after_bracket + content[match.end():]

    file_path.write_text(new_content, encoding="utf-8")
    print(f"[{lang.upper()}] Added {len(new_entries)} new Wave 3 words!")
    return len(new_entries)

def main():
    print("=== Expanding Wave 3 Vocabulary across 8 Languages ===")
    counts = {}
    for lang in LANG_FILES:
        counts[lang] = update_language_file(lang)
    print("=== Summary of Wave 3 Words Added ===")
    for lang, cnt in counts.items():
        print(f"  {lang.upper()}: +{cnt} words (+{cnt * 2} quiz questions)")
    print("=== Wave 3 Vocabulary Expansion Complete! ===")

if __name__ == "__main__":
    main()
