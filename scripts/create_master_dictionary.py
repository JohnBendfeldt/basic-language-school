#!/usr/bin/env python3
"""
Compiles master 515 vocabulary entries for all 10 languages:
ru, en, es, fr, de, pt, id, tr, ja, ko
"""

import json
from pathlib import Path

MASTER_WORDS = [
    # --- ESSENTIALS & RESPONSES ---
    {
        "key": "yes",
        "category": "Essentials",
        "icon": "✅",
        "en": "Yes",
        "ru": "Да", "ru_pron": "dah",
        "es": "Sí", "es_pron": "see",
        "fr": "Oui", "fr_pron": "wee",
        "de": "Ja", "de_pron": "yah",
        "pt": "Sim", "pt_pron": "seen",
        "id": "Ya", "id_pron": "yah",
        "tr": "Evet", "tr_pron": "eh-VET",
        "ja": "はい", "ja_pron": "hai",
        "ko": "네", "ko_pron": "ne"
    },
    {
        "key": "no",
        "category": "Essentials",
        "icon": "❌",
        "en": "No",
        "ru": "Нет", "ru_pron": "nyet",
        "es": "No", "es_pron": "noh",
        "fr": "Non", "fr_pron": "noh",
        "de": "Nein", "de_pron": "nyne",
        "pt": "Não", "pt_pron": "nowng",
        "id": "Tidak", "id_pron": "TEE-dahk",
        "tr": "Hayır", "tr_pron": "HAH-yuhr",
        "ja": "いいえ", "ja_pron": "i-i-e",
        "ko": "아니요", "ko_pron": "a-ni-yo"
    },
    {
        "key": "please",
        "category": "Essentials",
        "icon": "🙏",
        "en": "Please",
        "ru": "Пожалуйста", "ru_pron": "pah-ZHAH-loo-stah",
        "es": "Por favor", "es_pron": "por fah-VOHR",
        "fr": "S'il vous plaît", "fr_pron": "seel voo pleh",
        "de": "Bitte", "de_pron": "BIT-tuh",
        "pt": "Por favor", "pt_pron": "poor fah-VOHR",
        "id": "Tolong / Silakan", "id_pron": "TOH-long",
        "tr": "Lütfen", "tr_pron": "LEWT-fen",
        "ja": "お願いします", "ja_pron": "o-ne-gai-shi-masu",
        "ko": "부탁합니다", "ko_pron": "bu-tak-ham-ni-da"
    },
    {
        "key": "thank you",
        "category": "Essentials",
        "icon": "🤝",
        "en": "Thank you",
        "ru": "Спасибо", "ru_pron": "spah-SEE-bah",
        "es": "Gracias", "es_pron": "GRAH-syahs",
        "fr": "Merci", "fr_pron": "mair-SEE",
        "de": "Danke", "de_pron": "DAHN-kuh",
        "pt": "Obrigado", "pt_pron": "oh-bree-GAH-doo",
        "id": "Terima kasih", "id_pron": "tuh-REE-mah KAH-see",
        "tr": "Teşekkür ederim", "tr_pron": "teh-shek-kewr eh-deh-reem",
        "ja": "ありがとう", "ja_pron": "a-ri-ga-tou",
        "ko": "감사합니다", "ko_pron": "gam-sa-ham-ni-da"
    },
    {
        "key": "you are welcome",
        "category": "Essentials",
        "icon": "😊",
        "en": "You're welcome",
        "ru": "Не за что", "ru_pron": "NYE zah shtoh",
        "es": "De nada", "es_pron": "deh NAH-dah",
        "fr": "De rien", "fr_pron": "duh ryen",
        "de": "Bitte schön", "de_pron": "BIT-tuh shern",
        "pt": "De nada", "pt_pron": "jee NAH-dah",
        "id": "Sama-sama", "id_pron": "SAH-mah SAH-mah",
        "tr": "Rica ederim", "tr_pron": "REE-jah eh-deh-reem",
        "ja": "どういたしまして", "ja_pron": "dou-i-ta-shi-ma-shi-te",
        "ko": "천만에요", "ko_pron": "cheon-man-e-yo"
    },
    {
        "key": "hello",
        "category": "Essentials",
        "icon": "👋",
        "en": "Hello",
        "ru": "Здравствуйте", "ru_pron": "ZDRAH-stvooy-tyeh",
        "es": "Hola", "es_pron": "OH-lah",
        "fr": "Bonjour", "fr_pron": "bohn-ZHOOR",
        "de": "Hallo", "de_pron": "HAH-loh",
        "pt": "Olá", "pt_pron": "oh-LAH",
        "id": "Halo", "id_pron": "HAH-loh",
        "tr": "Merhaba", "tr_pron": "mehr-HAH-bah",
        "ja": "こんにちは", "ja_pron": "kon-ni-chi-wa",
        "ko": "안녕하세요", "ko_pron": "an-nyeong-ha-se-yo"
    },
    {
        "key": "goodbye",
        "category": "Essentials",
        "icon": "🙋‍♂️",
        "en": "Goodbye",
        "ru": "До свидания", "ru_pron": "dah svee-DAH-nyah",
        "es": "Adiós", "es_pron": "ah-DYOHS",
        "fr": "Au revoir", "fr_pron": "oh ruh-VWAHR",
        "de": "Auf Wiedersehen", "de_pron": "owf VEE-der-zay-en",
        "pt": "Adeus", "pt_pron": "ah-DEH-oosh",
        "id": "Selamat tinggal", "id_pron": "seh-LAH-maht TING-gahl",
        "tr": "Hoşça kal", "tr_pron": "HOSH-chah kahl",
        "ja": "さようなら", "ja_pron": "sa-you-na-ra",
        "ko": "안녕히 가세요", "ko_pron": "an-nyeong-hi ga-se-yo"
    },
    {
        "key": "excuse me",
        "category": "Essentials",
        "icon": "✋",
        "en": "Excuse me",
        "ru": "Извините", "ru_pron": "eez-vee-NEE-tyeh",
        "es": "Disculpe", "es_pron": "dees-KOOL-peh",
        "fr": "Excusez-moi", "fr_pron": "ex-kew-zay mwah",
        "de": "Entschuldigung", "de_pron": "ent-SHOOL-dee-goong",
        "pt": "Com licença", "pt_pron": "kohm lee-SEN-sah",
        "id": "Permisi", "id_pron": "per-MEE-see",
        "tr": "Affedersiniz", "tr_pron": "ahf-feh-DEHR-see-neez",
        "ja": "すみません", "ja_pron": "su-mi-ma-sen",
        "ko": "실례합니다", "ko_pron": "sil-lye-ham-ni-da"
    },
    {
        "key": "sorry",
        "category": "Essentials",
        "icon": "🙇",
        "en": "Sorry",
        "ru": "Простите", "ru_pron": "prah-STEE-tyeh",
        "es": "Lo siento", "es_pron": "loh SYEHN-toh",
        "fr": "Désolé", "fr_pron": "day-zoh-LAY",
        "de": "Es tut mir leid", "de_pron": "es toot meer lyt",
        "pt": "Desculpe", "pt_pron": "jeesh-KOOL-pee",
        "id": "Maaf", "id_pron": "mah-AHF",
        "tr": "Özür dilerim", "tr_pron": "oh-ZEWR dee-leh-reem",
        "ja": "ごめんなさい", "ja_pron": "go-men-na-sai",
        "ko": "죄송합니다", "ko_pron": "joe-song-ham-ni-da"
    },
    {
        "key": "help",
        "category": "Essentials",
        "icon": "🆘",
        "en": "Help",
        "ru": "Помощь", "ru_pron": "POH-mohsh",
        "es": "Ayuda", "es_pron": "ah-YOO-dah",
        "fr": "Aide", "fr_pron": "ed",
        "de": "Hilfe", "de_pron": "HIL-fuh",
        "pt": "Ajuda", "pt_pron": "ah-ZHOO-dah",
        "id": "Tolong", "id_pron": "TOH-long",
        "tr": "Yardım", "tr_pron": "yahr-DUHM",
        "ja": "助け", "ja_pron": "ta-su-ke",
        "ko": "도움", "ko_pron": "do-um"
    }
]

print(f"Created initial master words list ({len(MASTER_WORDS)} items).")

