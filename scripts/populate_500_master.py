#!/usr/bin/env python3
"""
Master Vocabulary & Audio Expander (500+ Words for All 10 Languages).
Ensures:
1. Every language has >= 510 common words in its curriculum.
2. English, Russian, Spanish, and French have > 1,000 recorded studio audio files.
3. German, Portuguese, Indonesian, and Turkish have 800+ recorded audio files.
4. Japanese and Korean have 600+ recorded audio files.
5. All 10 manifests (public/audio/<lang>/index.json) are updated with 100% offline audio.
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

try:
    import edge_tts
except ImportError:
    edge_tts = None

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

print("Base setup loaded.")

