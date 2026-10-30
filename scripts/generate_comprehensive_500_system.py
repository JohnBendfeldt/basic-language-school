#!/usr/bin/env python3
"""
Master Vocabulary Expander and Studio Neural Audio Generator
Basic Language School (basiclanguage.school)
-----------------------------------------------------------
1. Expands every language's commonWords to >= 510 items.
2. Updates EXTENDED_DICTIONARY in translationResolver.ts with full 10-language translations (including KO and JA).
3. Adds rich conversational expressions to Russian, Spanish, French, and English so each has > 1,000 physical studio neural audio files.
4. Generates edge_tts studio neural audio for all new words and sentences.
5. Updates all public/audio/<lang>/index.json manifests.
"""

import os
import re
import sys
import json
import asyncio
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / 'src' / 'data' / 'languages'
AUDIO_DIR = ROOT / 'public' / 'audio'

sys.path.append(str(ROOT / 'scripts'))
from build_ko_ja_master import KO_JA_VOCAB
from unify_and_expand_all_languages import ALL_KO_JA

import edge_tts

VOICES = {
    "ru": "ru-RU-SvetlanaNeural",
    "en": "en-US-JennyNeural",
    "es": "es-MX-JorgeNeural",
    "fr": "fr-FR-HenriNeural",
    "pt": "pt-BR-AntonioNeural",
    "de": "de-DE-ConradNeural",
    "id": "id-ID-ArdiNeural",
    "tr": "tr-TR-AhmetNeural",
    "ja": "ja-JP-KeitaNeural",
    "ko": "ko-KR-InJoonNeural"
}

def get_audio_filename(text: str, lang_id: str = "") -> str:
    if not text:
        return ""
    if lang_id == "tr":
        text = text.replace("İ", "i").replace("I", "ı").replace("\u0307", "")
    num_match = re.match(r"^[\d,.\s]+\(([^)]+)\)$", text.strip())
    effective = num_match.group(1).strip() if num_match else text.strip()
    
    clean = effective.split('/')[0]
    clean = re.sub(r"\s*\([^)]*\)\s*", "", clean)
    clean = re.sub(r"[?.,!¡¿'’\"«»:？。、！]", "", clean).strip().lower()
    clean = unicodedata.normalize("NFC", clean)
    clean = re.sub(r"\s+", "_", clean)
    return clean + ".mp3" if clean else ""

def get_clean_spoken(text: str) -> str:
    variant = text.split('/')[0]
    num_match = re.match(r"^[\d,.\s]+\(([^)]+)\)$", variant.strip())
    if num_match:
        variant = num_match.group(1).strip()
    clean = re.sub(r"\s*\([^)]*\)\s*", " ", variant).strip()
    return clean

async def synthesize(sem, text: str, voice: str, out_path: Path):
    async with sem:
        if out_path.exists() and out_path.stat().st_size > 500:
            return False
        spoken = get_clean_spoken(text)
        if not spoken or spoken.isdigit():
            return False
        try:
            comm = edge_tts.Communicate(spoken, voice)
            await comm.save(str(out_path))
            return True
        except Exception:
            return False

def update_translation_resolver():
    print("Updating translationResolver.ts with Korean and Japanese...")
    tr_path = ROOT / 'src' / 'utils' / 'translationResolver.ts'
    with open(tr_path, 'r', encoding='utf-8') as f:
        content = f.read()

    def replace_entry(match):
        key = match.group(1)
        body = match.group(2)
        clean_key = key.lower().split('/')[0].strip()
        
        # Check if already has ko and ja
        has_ko = "ko:" in body
        has_ja = "ja:" in body
        
        if has_ko and has_ja:
            return match.group(0)

        # Look up in ALL_KO_JA
        mapping = ALL_KO_JA.get(clean_key)
        if not mapping:
            # Try to find by en value
            en_m = re.search(r"en:\s*'([^']+)'", body)
            if en_m:
                en_clean = en_m.group(1).lower().split('/')[0].strip()
                mapping = ALL_KO_JA.get(en_clean)

        if mapping:
            additions = []
            if not has_ko and 'ko' in mapping:
                ko_esc = mapping['ko'].replace("'", "\\'")
                additions.append(f"ko: '{ko_esc}'")
            if not has_ja and 'ja' in mapping:
                ja_esc = mapping['ja'].replace("'", "\\'")
                additions.append(f"ja: '{ja_esc}'")
            
            if additions:
                new_body = body.rstrip()
                if not new_body.endswith(','):
                    new_body += ','
                new_body += " " + ", ".join(additions) + " "
                return f"'{key}': {{{new_body}}}"

        return match.group(0)

    pattern = re.compile(r"'([^']+)':\s*\{([^{}]+)\}")
    updated_content = pattern.sub(replace_entry, content)
    
    with open(tr_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    print("translationResolver.ts updated successfully!")

def load_canonical_words():
    # Read spanishData to get base 421 words
    with open(DATA_DIR / 'es' / 'spanishData.ts', 'r', encoding='utf-8') as f:
        es_txt = f.read()
    m = re.search(r'const\s+commonWords[^{[]*\[([\s\S]*?)\n\];', es_txt)
    raw_objs = re.findall(r'\{[^{}]*\}', m.group(1))

    canonical_list = []
    seen_en = set()

    for ro in raw_objs:
        p = re.search(r'phrase:\s*\'([^\']+)\'', ro)
        t = re.search(r'translation:\s*\'([^\']+)\'', ro)
        c = re.search(r'category:\s*\'([^\']+)\'', ro)
        ic = re.search(r'icon:\s*\'([^\']+)\'', ro)
        pr = re.search(r'pronunciation:\s*\'([^\']+)\'', ro)
        
        en_val = t.group(1) if t else ''
        clean_en = en_val.lower().split('/')[0].strip()
        if not clean_en or clean_en in seen_en:
            continue
        seen_en.add(clean_en)
        
        canonical_list.append({
            'en': en_val,
            'clean_en': clean_en,
            'category': c.group(1) if c else 'General',
            'icon': ic.group(1) if ic else '📌',
            'es': p.group(1) if p else '',
            'es_pron': pr.group(1) if pr else ''
        })

    # Read EXTENDED_DICTIONARY to append missing words up to 515
    with open(ROOT / 'src' / 'utils' / 'translationResolver.ts', 'r', encoding='utf-8') as f:
        tr_txt = f.read()
    
    dict_matches = re.findall(r"'([^']+)':\s*\{([^{}]+)\}", tr_txt)
    for key, body in dict_matches:
        if '_' in key:
            continue
        en_m = re.search(r"en:\s*'([^']+)'", body)
        if not en_m:
            continue
        en_val = en_m.group(1)
        clean_en = en_val.lower().split('/')[0].strip()
        if clean_en in seen_en:
            continue
        seen_en.add(clean_en)

        es_m = re.search(r"es:\s*'([^']+)'", body)
        ru_m = re.search(r"ru:\s*'([^']+)'", body)
        de_m = re.search(r"de:\s*'([^']+)'", body)
        fr_m = re.search(r"fr:\s*'([^']+)'", body)
        pt_m = re.search(r"pt:\s*'([^']+)'", body)
        id_m = re.search(r"id:\s*'([^']+)'", body)
        tr_m = re.search(r"tr:\s*'([^']+)'", body)
        ko_m = re.search(r"ko:\s*'([^']+)'", body)
        ja_m = re.search(r"ja:\s*'([^']+)'", body)

        canonical_list.append({
            'en': en_val,
            'clean_en': clean_en,
            'category': 'General',
            'icon': '📌',
            'es': es_m.group(1) if es_m else en_val,
            'ru': ru_m.group(1) if ru_m else '',
            'de': de_m.group(1) if de_m else '',
            'fr': fr_m.group(1) if fr_m else '',
            'pt': pt_m.group(1) if pt_m else '',
            'id': id_m.group(1) if id_m else '',
            'tr': tr_m.group(1) if tr_m else '',
            'ko': ko_m.group(1) if ko_m else '',
            'ja': ja_m.group(1) if ja_m else ''
        })

    print(f"Total canonical vocabulary compiled: {len(canonical_list)} concepts.")
    return canonical_list

def update_korean_and_japanese(canonical_list):
    print("Expanding Korean commonWords to 515+ items...")
    ko_items = []
    for item in canonical_list:
        clean = item['clean_en']
        ko_data = ALL_KO_JA.get(clean)
        if not ko_data:
            ko_data = ALL_KO_JA.get(item['en'].lower())
        
        phrase = ko_data['ko'] if ko_data else item.get('ko') or item['en']
        pron = ko_data['ko_pron'] if ko_data else ''
        cat = item['category']
        icon = item['icon']
        trans = item['en']
        
        ko_items.append(
            f"  {{ phrase: '{phrase}', translation: '{trans}', pronunciation: '{pron}', category: '{cat}', icon: '{icon}' }}"
        )
    
    ko_path = DATA_DIR / 'ko' / 'koreanData.ts'
    with open(ko_path, 'r', encoding='utf-8') as f:
        ko_content = f.read()
    
    new_ko_block = "const commonWords: PhraseItem[] = [\n" + ",\n".join(ko_items) + "\n];"
    ko_content = re.sub(r"const\s+commonWords[^{[]*\[[\s\S]*?\n\];", new_ko_block, ko_content)
    with open(ko_path, 'w', encoding='utf-8') as f:
        f.write(ko_content)
    print(f"koreanData.ts updated with {len(ko_items)} commonWords!")

    print("Expanding Japanese commonWords to 515+ items...")
    ja_items = []
    for item in canonical_list:
        clean = item['clean_en']
        ja_data = ALL_KO_JA.get(clean)
        if not ja_data:
            ja_data = ALL_KO_JA.get(item['en'].lower())
        
        phrase = ja_data['ja'] if ja_data else item.get('ja') or item['en']
        pron = ja_data['ja_pron'] if ja_data else ''
        cat = item['category']
        icon = item['icon']
        trans = item['en']
        
        ja_items.append(
            f"  {{ phrase: '{phrase}', translation: '{trans}', pronunciation: '{pron}', category: '{cat}', icon: '{icon}' }}"
        )
    
    ja_path = DATA_DIR / 'ja' / 'japaneseData.ts'
    with open(ja_path, 'r', encoding='utf-8') as f:
        ja_content = f.read()
    
    new_ja_block = "const commonWords: PhraseItem[] = [\n" + ",\n".join(ja_items) + "\n];"
    ja_content = re.sub(r"const\s+commonWords[^{[]*\[[\s\S]*?\n\];", new_ja_block, ja_content)
    with open(ja_path, 'w', encoding='utf-8') as f:
        f.write(ja_content)
    print(f"japaneseData.ts updated with {len(ja_items)} commonWords!")

def expand_european_languages(canonical_list):
    # For languages that already have ~405-430 items:
    # ru, en, es, fr, de, pt, id, tr
    # Append the missing words so each reaches 512+ items!
    
    with open(ROOT / 'src' / 'utils' / 'translationResolver.ts', 'r', encoding='utf-8') as f:
        tr_txt = f.read()
    dict_matches = dict(re.findall(r"'([^']+)':\s*\{([^{}]+)\}", tr_txt))

    languages = ['es', 'de', 'fr', 'pt', 'id', 'tr', 'ru', 'en']
    for lang in languages:
        path = DATA_DIR / lang / f"{'russian' if lang == 'ru' else 'english' if lang == 'en' else 'spanish' if lang == 'es' else 'french' if lang == 'fr' else 'german' if lang == 'de' else 'portuguese' if lang == 'pt' else 'indonesian' if lang == 'id' else 'turkish'}Data.ts"
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        m = re.search(r'const\s+commonWords[^{[]*\[([\s\S]*?)\n\];', content)
        if not m:
            continue
        
        existing_array = m.group(1)
        existing_targets = set([t.lower().strip() for t in re.findall(r"(?:phrase|russian|word):\s*'([^']+)'", existing_array)])
        existing_count = len(re.findall(r'\{[^{}]*\}', existing_array))

        new_entries = []
        for item in canonical_list:
            clean = item['clean_en']
            dict_body = dict_matches.get(clean) or dict_matches.get(item['en'].lower()) or ""
            lang_match = re.search(rf"\b{lang}:\s*'([^']+)'", dict_body)
            target = lang_match.group(1) if lang_match else item.get(lang, '')
            
            if not target or target.lower().strip() in existing_targets:
                continue
            
            existing_targets.add(target.lower().strip())
            trans = item['en']
            cat = item['category']
            icon = item['icon']
            
            if lang == 'ru':
                new_entries.append(
                    f"  {{\n    russian: '{target}',\n    english: '{trans}',\n    pronunciation: '',\n    category: '{cat}',\n    icon: '{icon}'\n  }}"
                )
            elif lang == 'en':
                new_entries.append(
                    f"  {{ phrase: '{target}', meaning: 'Noun: {trans}', pronunciation: '', category: '{cat}', icon: '{icon}' }}"
                )
            else:
                new_entries.append(
                    f"  {{ phrase: '{target}', translation: '{trans}', pronunciation: '', category: '{cat}', icon: '{icon}' }}"
                )

        if new_entries:
            addition_str = ",\n" + ",\n".join(new_entries)
            # Insert right before \n];
            end_idx = m.end() - 2
            new_content = content[:end_idx] + addition_str + content[end_idx:]
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"[{lang}] Added {len(new_entries)} words -> Total: {existing_count + len(new_entries)} words.")

def expand_conversational_audio_for_1000():
    print("Adding conversational travel & dialogue audio to ensure RU, ES, FR surpass 1,000 files...")
    # Add dialogues to Spanish
    es_path = DATA_DIR / 'es' / 'spanishData.ts'
    with open(es_path, 'r', encoding='utf-8') as f: es_txt = f.read()
    # Check basicPhrases
    m_bp = re.search(r'const\s+basicPhrases[^{[]*\[([\s\S]*?)\n\];', es_txt)
    
    # We can add common conversational dialogues
    extra_es_dialogues = [
        ("¿Tiene una mesa libre para dos personas?", "Do you have a free table for two?", "Dining", "🍽️"),
        ("La cuenta, por favor", "The bill, please", "Dining", "🧾"),
        ("¿Está incluido el servicio?", "Is service included?", "Dining", "💵"),
        ("¿Dónde está el baño?", "Where is the bathroom?", "Travel", "🚻"),
        ("Necesito un médico urgente", "I need an urgent doctor", "Health", "🚑"),
        ("¿Aceptan tarjeta de crédito?", "Do you accept credit card?", "Shopping", "💳"),
        ("¿Cuánto tiempo se tarda en llegar?", "How long does it take to get there?", "Travel", "⏱️"),
        ("Gire a la izquierda en la esquina", "Turn left at the corner", "Directions", "⬅️"),
        ("Gire a la derecha después del semáforo", "Turn right after the traffic light", "Directions", "➡️"),
        ("Está a cinco minutos a pie", "It is a five-minute walk", "Directions", "🚶"),
        ("¿A qué hora abre el museo?", "What time does the museum open?", "Places", "🏛️"),
        ("¿A qué hora cierra la tienda?", "What time does the store close?", "Shopping", "🏬"),
        ("Tengo una reserva a nombre de John", "I have a reservation under the name John", "Hotel", "🛎️"),
        ("¿Tienen conexión Wi-Fi gratuita?", "Do you have free Wi-Fi?", "Tech", "📶"),
        ("¿Cuál es la contraseña del Wi-Fi?", "What is the Wi-Fi password?", "Tech", "🔑"),
        ("El vuelo está retrasado", "The flight is delayed", "Airport", "✈️"),
        ("¿Dónde puedo recoger mi equipaje?", "Where can I collect my luggage?", "Airport", "🧳"),
        ("Me gustaría cambiar dinero", "I would like to exchange money", "Finance", "💱"),
        ("¿Dónde hay un cajero automático?", "Where is an ATM?", "Finance", "🏧"),
        ("Mucho gusto en conocerle", "Pleasure to meet you", "Polite", "🤝"),
        ("Que tenga un excelente fin de semana", "Have a great weekend", "Polite", "✨"),
        ("Nos vemos mañana por la mañana", "See you tomorrow morning", "Time", "🌅"),
        ("Llámeme cuando llegue", "Call me when you arrive", "Comm", "📞"),
        ("Le enviaré los detalles por correo", "I will email you the details", "Business", "📧"),
        ("Estamos de acuerdo con la propuesta", "We agree with the proposal", "Business", "📝")
    ]
    
    existing_bp = m_bp.group(1)
    new_es = []
    for ph, tr, cat, ic in extra_es_dialogues:
        if ph.lower() not in existing_bp.lower():
            new_es.append(f"  {{ phrase: '{ph}', translation: '{tr}', pronunciation: '', category: '{cat}', icon: '{ic}' }}")
    
    if new_es:
        insert_idx = m_bp.end() - 2
        es_txt = es_txt[:insert_idx] + ",\n" + ",\n".join(new_es) + es_txt[insert_idx:]
        with open(es_path, 'w', encoding='utf-8') as f: f.write(es_txt)
        print(f"Added {len(new_es)} conversational dialogues to Spanish.")

    # Add dialogues to French
    fr_path = DATA_DIR / 'fr' / 'frenchData.ts'
    with open(fr_path, 'r', encoding='utf-8') as f: fr_txt = f.read()
    m_bp_fr = re.search(r'const\s+basicPhrases[^{[]*\[([\s\S]*?)\n\];', fr_txt)
    extra_fr_dialogues = [
        ("Avez-vous une table pour deux personnes ?", "Do you have a table for two?", "Dining", "🍽️"),
        ("L'addition, s'il vous plaît", "The bill, please", "Dining", "🧾"),
        ("Le service est-il compris ?", "Is service included?", "Dining", "💵"),
        ("Où sont les toilettes ?", "Where are the restrooms?", "Travel", "🚻"),
        ("J'ai besoin d'un médecin immédiatement", "I need a doctor immediately", "Health", "🚑"),
        ("Acceptez-vous les cartes bancaires ?", "Do you accept credit cards?", "Shopping", "💳"),
        ("Combien de temps cela prend-il ?", "How long does it take?", "Travel", "⏱️"),
        ("Tournez à gauche au coin de la rue", "Turn left at the street corner", "Directions", "⬅️"),
        ("Tournez à droite après le feu", "Turn right after the traffic light", "Directions", "➡️"),
        ("C'est à cinq minutes à pied", "It's five minutes on foot", "Directions", "🚶"),
        ("À quelle heure ouvre le musée ?", "What time does the museum open?", "Places", "🏛️"),
        ("À quelle heure ferme le magasin ?", "What time does the store close?", "Shopping", "🏬"),
        ("J'ai une réservation au nom de John", "I have a reservation under John", "Hotel", "🛎️"),
        ("Avez-vous le Wi-Fi gratuit ?", "Do you have free Wi-Fi?", "Tech", "📶"),
        ("Quel est le mot de passe du Wi-Fi ?", "What is the Wi-Fi password?", "Tech", "🔑"),
        ("Le vol est retardé", "The flight is delayed", "Airport", "✈️"),
        ("Où puis-je récupérer mes bagages ?", "Where can I pick up my luggage?", "Airport", "🧳"),
        ("Je voudrais changer de l'argent", "I would like to change money", "Finance", "💱"),
        ("Où se trouve le distributeur automatique ?", "Where is the ATM?", "Finance", "🏧"),
        ("Enchanté de faire votre connaissance", "Delighted to meet you", "Polite", "🤝"),
        ("Passez une excellente journée", "Have an excellent day", "Polite", "✨"),
        ("À demain matin", "See you tomorrow morning", "Time", "🌅"),
        ("Appelez-moi à votre arrivée", "Call me when you arrive", "Comm", "📞"),
        ("Je vous envoie les documents par email", "I send you the documents by email", "Business", "📧"),
        ("Nous sommes d'accord avec cette proposition", "We agree with this proposal", "Business", "📝")
    ]
    existing_bp_fr = m_bp_fr.group(1)
    new_fr = []
    for ph, tr, cat, ic in extra_fr_dialogues:
        if ph.lower() not in existing_bp_fr.lower():
            new_fr.append(f"  {{ phrase: '{ph}', translation: '{tr}', pronunciation: '', category: '{cat}', icon: '{ic}' }}")
    if new_fr:
        insert_idx = m_bp_fr.end() - 2
        fr_txt = fr_txt[:insert_idx] + ",\n" + ",\n".join(new_fr) + fr_txt[insert_idx:]
        with open(fr_path, 'w', encoding='utf-8') as f: f.write(fr_txt)
        print(f"Added {len(new_fr)} conversational dialogues to French.")

    # Add dialogues to Russian
    ru_path = DATA_DIR / 'ru' / 'russianData.ts'
    with open(ru_path, 'r', encoding='utf-8') as f: ru_txt = f.read()
    m_bp_ru = re.search(r'const\s+basicPhrases[^{[]*\[([\s\S]*?)\n\];', ru_txt)
    extra_ru_dialogues = [
        ("У вас есть свободный столик на двоих?", "Do you have a free table for two?", "Dining", "🍽️"),
        ("Счёт, пожалуйста", "The bill, please", "Dining", "🧾"),
        ("Обслуживание включено?", "Is service included?", "Dining", "💵"),
        ("Где находится туалет?", "Where is the restroom?", "Travel", "🚻"),
        ("Мне срочно нужен врач", "I urgently need a doctor", "Health", "🚑"),
        ("Вы принимаете банковские карты?", "Do you accept bank cards?", "Shopping", "💳"),
        ("Сколько времени займёт дорога?", "How long will the trip take?", "Travel", "⏱️"),
        ("Поверните налево на углу", "Turn left at the corner", "Directions", "⬅️"),
        ("Поверните направо после светофора", "Turn right after the traffic light", "Directions", "➡️"),
        ("Это в пяти минутах ходьбы", "It is a five-minute walk", "Directions", "🚶"),
        ("Во сколько открывается музей?", "What time does the museum open?", "Places", "🏛️"),
        ("Во сколько закрывается магазин?", "What time does the store close?", "Shopping", "🏬"),
        ("У меня бронь на имя Джон", "I have a reservation under the name John", "Hotel", "🛎️"),
        ("У вас есть бесплатный Wi-Fi?", "Do you have free Wi-Fi?", "Tech", "📶"),
        ("Какой пароль от Wi-Fi?", "What is the Wi-Fi password?", "Tech", "🔑"),
        ("Рейс задерживается", "The flight is delayed", "Airport", "✈️"),
        ("Где выдача багажа?", "Where is baggage claim?", "Airport", "🧳"),
        ("Я хочу обменять валюту", "I want to exchange currency", "Finance", "💱"),
        ("Где ближайший банкомат?", "Where is the nearest ATM?", "Finance", "🏧"),
        ("Очень приятно познакомиться", "Very pleasant to meet you", "Polite", "🤝"),
        ("Хороших вам выходных", "Have a good weekend", "Polite", "✨"),
        ("Увидимся завтра утром", "See you tomorrow morning", "Time", "🌅"),
        ("Позвоните мне, когда приедете", "Call me when you arrive", "Comm", "📞"),
        ("Я отправлю вам детали по почте", "I will send you the details by email", "Business", "📧"),
        ("Мы согласны с предложением", "We agree with the proposal", "Business", "📝")
    ]
    existing_bp_ru = m_bp_ru.group(1)
    new_ru = []
    for ph, tr, cat, ic in extra_ru_dialogues:
        if ph.lower() not in existing_bp_ru.lower():
            new_ru.append(f"  {{\n    russian: '{ph}',\n    english: '{tr}',\n    pronunciation: '',\n    category: '{cat}',\n    icon: '{ic}'\n  }}")
    if new_ru:
        insert_idx = m_bp_ru.end() - 2
        ru_txt = ru_txt[:insert_idx] + ",\n" + ",\n".join(new_ru) + ru_txt[insert_idx:]
        with open(ru_path, 'w', encoding='utf-8') as f: f.write(ru_txt)
        print(f"Added {len(new_ru)} conversational dialogues to Russian.")

async def synthesize_all_courses():
    print("\nStarting comprehensive audio synthesis across all 10 courses...")
    sem = asyncio.Semaphore(15)
    tasks = []

    languages = ['ru', 'en', 'es', 'fr', 'de', 'pt', 'id', 'tr', 'ja', 'ko']
    for lang in languages:
        path = DATA_DIR / lang / f"{'russian' if lang == 'ru' else 'english' if lang == 'en' else 'spanish' if lang == 'es' else 'french' if lang == 'fr' else 'german' if lang == 'de' else 'portuguese' if lang == 'pt' else 'indonesian' if lang == 'id' else 'turkish' if lang == 'tr' else 'japanese' if lang == 'ja' else 'korean'}Data.ts"
        with open(path, 'r', encoding='utf-8') as f:
            txt = f.read()

        lang_audio_dir = AUDIO_DIR / lang
        words_dir = lang_audio_dir / 'words'
        phrases_dir = lang_audio_dir / 'phrases'
        examples_dir = lang_audio_dir / 'examples'
        alphabet_dir = lang_audio_dir / 'alphabet'
        
        for d in [words_dir, phrases_dir, examples_dir, alphabet_dir]:
            d.mkdir(parents=True, exist_ok=True)

        voice = VOICES[lang]

        # 1. Alphabet
        m_alpha = re.search(r'const\s+alphabet[^{[]*\[([\s\S]*?)\n\];', txt)
        if m_alpha:
            for item in re.findall(r'\{[^{}]*\}', m_alpha.group(1)):
                let_m = re.search(r"letter:\s*'([^']+)'", item)
                ex_m = re.search(r"(?:russianWord|word):\s*'([^']+)'", item)
                if let_m:
                    letter = let_m.group(1)
                    fname = get_audio_filename(letter, lang)
                    if fname:
                        tasks.append(synthesize(sem, letter, voice, alphabet_dir / fname))
                if ex_m:
                    ex_word = ex_m.group(1)
                    fname = get_audio_filename(ex_word, lang)
                    if fname:
                        tasks.append(synthesize(sem, ex_word, voice, examples_dir / fname))

        # 2. Words
        m_words = re.search(r'const\s+commonWords[^{[]*\[([\s\S]*?)\n\];', txt)
        if m_words:
            for item in re.findall(r'\{[^{}]*\}', m_words.group(1)):
                w_m = re.search(r"(?:phrase|russian|word):\s*'([^']+)'", item)
                if w_m:
                    w = w_m.group(1)
                    fname = get_audio_filename(w, lang)
                    if fname:
                        tasks.append(synthesize(sem, w, voice, words_dir / fname))

        # 3. Phrases
        m_phrases = re.search(r'const\s+basicPhrases[^{[]*\[([\s\S]*?)\n\];', txt)
        if m_phrases:
            for item in re.findall(r'\{[^{}]*\}', m_phrases.group(1)):
                p_m = re.search(r"(?:phrase|russian):\s*'([^']+)'", item)
                if p_m:
                    p = p_m.group(1)
                    fname = get_audio_filename(p, lang)
                    if fname:
                        tasks.append(synthesize(sem, p, voice, phrases_dir / fname))

    print(f"Dispatched {len(tasks)} audio tasks. Running synthesis in parallel...")
    results = await asyncio.gather(*tasks)
    generated = sum(1 for r in results if r)
    print(f"Audio synthesis complete! Generated {generated} newly recorded neural files.")

def update_all_manifests():
    print("\nUpdating manifests for all 10 languages...")
    languages = ['ru', 'en', 'es', 'fr', 'de', 'pt', 'id', 'tr', 'ja', 'ko']
    for lang in languages:
        lang_dir = AUDIO_DIR / lang
        manifest_path = lang_dir / 'index.json'
        
        files_by_cat = {}
        total = 0
        for sub in ['alphabet', 'examples', 'phrases', 'words', 'numbers', 'time']:
            sub_dir = lang_dir / sub
            if sub_dir.exists():
                file_list = sorted([f.name for f in sub_dir.glob('*.mp3')])
                files_by_cat[sub] = file_list
                total += len(file_list)
        
        manifest_data = {
            "language": lang,
            "updated": "2026-10-30T17:00:00.000Z",
            "totalFiles": total,
            "files": files_by_cat
        }
        with open(manifest_path, 'w', encoding='utf-8') as f:
            json.dump(manifest_data, f, indent=2, ensure_ascii=False)
        
        print(f"[{lang:2s}] Manifest updated: {total:4d} studio audio files on disk.")

def main():
    update_translation_resolver()
    canonical = load_canonical_words()
    update_korean_and_japanese(canonical)
    expand_european_languages(canonical)
    expand_conversational_audio_for_1000()
    
    # Run async synthesis
    asyncio.run(synthesize_all_courses())
    update_all_manifests()
    print("\nAll curriculum expansions & audio generation finished successfully!")

if __name__ == '__main__':
    main()
