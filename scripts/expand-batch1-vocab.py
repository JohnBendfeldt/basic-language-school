#!/usr/bin/env python3
"""
Batch 1 Vocabulary Expansion: Modern Tech, Workplace & Commerce
Expands the 8 supported language courses with high-yield, structured,
level-tagged vocabulary (Level 1, 2, and 3):
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

# 150 High-Yield Tech, Workplace & Commerce Items
# Structured with:
#   id: canonical identifier
#   category: 'Tech' | 'Business' | 'Shopping'
#   level: 1 | 2 | 3
#   icon: relevant emoji
#   translations: { lang: { text, meaning, pron } }
VOCABULARY_ITEMS = [
    # ==========================================
    # LEVEL 1: FOUNDATIONS & DAILY TECH / COMMERCE (Items 1 - 50)
    # ==========================================
    {
        "id": "computer", "category": "Tech", "level": 1, "icon": "💻",
        "translations": {
            "en": {"text": "Computer", "meaning": "Computer", "pron": "kuhm-PYOO-ter"},
            "es": {"text": "Computadora", "meaning": "Computer", "pron": "kohm-poo-tah-DOH-rah"},
            "fr": {"text": "Ordinateur", "meaning": "Computer", "pron": "ohr-dee-nah-TUHR"},
            "ru": {"text": "Компьютер", "meaning": "Computer", "pron": "kahm-PYOO-tyer"},
            "pt": {"text": "Computador", "meaning": "Computer", "pron": "kohm-poo-tah-DOHR"},
            "de": {"text": "Computer", "meaning": "Computer", "pron": "kohm-PYOO-tuhr"},
            "id": {"text": "Komputer", "meaning": "Computer", "pron": "kohm-POO-tehr"},
            "tr": {"text": "Bilgisayar", "meaning": "Computer", "pron": "beel-gee-sah-YAHR"}
        }
    },
    {
        "id": "phone", "category": "Tech", "level": 1, "icon": "📱",
        "translations": {
            "en": {"text": "Phone", "meaning": "Phone", "pron": "fohn"},
            "es": {"text": "Teléfono", "meaning": "Phone", "pron": "teh-LEH-foh-noh"},
            "fr": {"text": "Téléphone", "meaning": "Phone", "pron": "tay-lay-FOHN"},
            "ru": {"text": "Телефон", "meaning": "Phone", "pron": "tyee-lyee-FOHN"},
            "pt": {"text": "Telefone", "meaning": "Phone", "pron": "teh-leh-FOH-nee"},
            "de": {"text": "Telefon", "meaning": "Phone", "pron": "TEH-luh-fohn"},
            "id": {"text": "Telepon", "meaning": "Phone", "pron": "teh-LEH-pohn"},
            "tr": {"text": "Telefon", "meaning": "Phone", "pron": "teh-leh-FOHN"}
        }
    },
    {
        "id": "laptop", "category": "Tech", "level": 1, "icon": "💻",
        "translations": {
            "en": {"text": "Laptop", "meaning": "Laptop", "pron": "LAP-top"},
            "es": {"text": "Portátil", "meaning": "Laptop", "pron": "pohr-TAH-teel"},
            "fr": {"text": "Ordinateur portable", "meaning": "Laptop", "pron": "ohr-dee-nah-TUHR pohr-TAH-bluh"},
            "ru": {"text": "Ноутбук", "meaning": "Laptop", "pron": "noh-oot-BOOK"},
            "pt": {"text": "Portátil", "meaning": "Laptop", "pron": "pohr-TAH-teel"},
            "de": {"text": "Laptop", "meaning": "Laptop", "pron": "LEHP-top"},
            "id": {"text": "Laptop", "meaning": "Laptop", "pron": "LAHP-top"},
            "tr": {"text": "Dizüstü bilgisayar", "meaning": "Laptop", "pron": "deez-yoos-TOO beel-gee-sah-YAHR"}
        }
    },
    {
        "id": "tablet", "category": "Tech", "level": 1, "icon": "📱",
        "translations": {
            "en": {"text": "Tablet", "meaning": "Tablet", "pron": "TAB-lit"},
            "es": {"text": "Tableta", "meaning": "Tablet", "pron": "tah-BLEH-tah"},
            "fr": {"text": "Tablette", "meaning": "Tablet", "pron": "tah-BLEHT"},
            "ru": {"text": "Планшет", "meaning": "Tablet", "pron": "plahn-SHEHT"},
            "pt": {"text": "Tablet", "meaning": "Tablet", "pron": "TAH-bleh-chee"},
            "de": {"text": "Tablet", "meaning": "Tablet", "pron": "TEHB-luht"},
            "id": {"text": "Tablet", "meaning": "Tablet", "pron": "TAHB-leht"},
            "tr": {"text": "Tablet", "meaning": "Tablet", "pron": "tahb-LEHT"}
        }
    },
    {
        "id": "screen", "category": "Tech", "level": 1, "icon": "🖥️",
        "translations": {
            "en": {"text": "Screen", "meaning": "Screen / Display", "pron": "skreen"},
            "es": {"text": "Pantalla", "meaning": "Screen", "pron": "pahn-TAH-yah"},
            "fr": {"text": "Écran", "meaning": "Screen", "pron": "ay-KRAHN"},
            "ru": {"text": "Экран", "meaning": "Screen", "pron": "eh-KRAHN"},
            "pt": {"text": "Tela", "meaning": "Screen", "pron": "TEH-lah"},
            "de": {"text": "Bildschirm", "meaning": "Screen", "pron": "BEELT-sheerm"},
            "id": {"text": "Layar", "meaning": "Screen", "pron": "LAH-yahr"},
            "tr": {"text": "Ekran", "meaning": "Screen", "pron": "ehk-RAHN"}
        }
    },
    {
        "id": "keyboard", "category": "Tech", "level": 1, "icon": "⌨️",
        "translations": {
            "en": {"text": "Keyboard", "meaning": "Keyboard", "pron": "KEE-bord"},
            "es": {"text": "Teclado", "meaning": "Keyboard", "pron": "teh-KLAH-doh"},
            "fr": {"text": "Clavier", "meaning": "Keyboard", "pron": "klah-VYAY"},
            "ru": {"text": "Клавиатура", "meaning": "Keyboard", "pron": "klah-vee-ah-TOO-rah"},
            "pt": {"text": "Teclado", "meaning": "Keyboard", "pron": "teh-KLAH-doo"},
            "de": {"text": "Tastatur", "meaning": "Keyboard", "pron": "tahs-tah-TOOR"},
            "id": {"text": "Papan ketik", "meaning": "Keyboard", "pron": "PAH-pahn KEH-teek"},
            "tr": {"text": "Klavye", "meaning": "Keyboard", "pron": "klahv-YEH"}
        }
    },
    {
        "id": "mouse", "category": "Tech", "level": 1, "icon": "🖱️",
        "translations": {
            "en": {"text": "Mouse", "meaning": "Mouse", "pron": "mows"},
            "es": {"text": "Ratón", "meaning": "Mouse", "pron": "rrah-TOHN"},
            "fr": {"text": "Souris", "meaning": "Mouse", "pron": "soo-REE"},
            "ru": {"text": "Мышь", "meaning": "Mouse", "pron": "mysh"},
            "pt": {"text": "Mouse", "meaning": "Mouse", "pron": "MOW-see"},
            "de": {"text": "Maus", "meaning": "Mouse", "pron": "mows"},
            "id": {"text": "Tetikus", "meaning": "Mouse", "pron": "teh-TEE-koos"},
            "tr": {"text": "Fare", "meaning": "Mouse", "pron": "fah-REH"}
        }
    },
    {
        "id": "charger", "category": "Tech", "level": 1, "icon": "🔌",
        "translations": {
            "en": {"text": "Charger", "meaning": "Charger", "pron": "CHAHR-jer"},
            "es": {"text": "Cargador", "meaning": "Charger", "pron": "kahr-gah-DOHR"},
            "fr": {"text": "Chargeur", "meaning": "Charger", "pron": "shahr-ZHUHR"},
            "ru": {"text": "Зарядка", "meaning": "Charger", "pron": "zah-RYAHD-kah"},
            "pt": {"text": "Carregador", "meaning": "Charger", "pron": "kah-rreh-gah-DOHR"},
            "de": {"text": "Ladegerät", "meaning": "Charger", "pron": "LAH-duh-geh-rayt"},
            "id": {"text": "Pengisi daya", "meaning": "Charger", "pron": "pehng-EE-see DAH-yah"},
            "tr": {"text": "Şarj aleti", "meaning": "Charger", "pron": "shahrzh ah-leh-TEE"}
        }
    },
    {
        "id": "battery", "category": "Tech", "level": 1, "icon": "🔋",
        "translations": {
            "en": {"text": "Battery", "meaning": "Battery", "pron": "BAT-ree"},
            "es": {"text": "Batería", "meaning": "Battery", "pron": "bah-teh-REE-ah"},
            "fr": {"text": "Batterie", "meaning": "Battery", "pron": "bah-TREE"},
            "ru": {"text": "Батарея", "meaning": "Battery", "pron": "bah-tah-RYEH-yah"},
            "pt": {"text": "Bateria", "meaning": "Battery", "pron": "bah-teh-REE-ah"},
            "de": {"text": "Batterie", "meaning": "Battery", "pron": "bah-tuh-REE"},
            "id": {"text": "Baterai", "meaning": "Battery", "pron": "bah-teh-RYE"},
            "tr": {"text": "Pil", "meaning": "Battery", "pron": "peel"}
        }
    },
    {
        "id": "cable", "category": "Tech", "level": 1, "icon": "🔌",
        "translations": {
            "en": {"text": "Cable", "meaning": "Cable / Wire", "pron": "KAY-buhl"},
            "es": {"text": "Cable", "meaning": "Cable", "pron": "KAH-bvleh"},
            "fr": {"text": "Câble", "meaning": "Cable", "pron": "KAH-bluh"},
            "ru": {"text": "Кабель", "meaning": "Cable", "pron": "KAH-byel"},
            "pt": {"text": "Cabo", "meaning": "Cable", "pron": "KAH-boo"},
            "de": {"text": "Kabel", "meaning": "Cable", "pron": "KAH-buhl"},
            "id": {"text": "Kabel", "meaning": "Cable", "pron": "KAH-behl"},
            "tr": {"text": "Kablo", "meaning": "Cable", "pron": "kahb-LOH"}
        }
    },
    {
        "id": "wifi", "category": "Tech", "level": 1, "icon": "📶",
        "translations": {
            "en": {"text": "Wi-Fi", "meaning": "Wi-Fi", "pron": "WAI-fai"},
            "es": {"text": "Wifi", "meaning": "Wi-Fi", "pron": "WEE-fee"},
            "fr": {"text": "Wi-Fi", "meaning": "Wi-Fi", "pron": "wee-FEE"},
            "ru": {"text": "Вайфай", "meaning": "Wi-Fi", "pron": "vay-FAY"},
            "pt": {"text": "Wi-Fi", "meaning": "Wi-Fi", "pron": "wee-FEE"},
            "de": {"text": "WLAN", "meaning": "Wi-Fi / WLAN", "pron": "VAY-lahn"},
            "id": {"text": "Wi-Fi", "meaning": "Wi-Fi", "pron": "WAI-fai"},
            "tr": {"text": "Kablosuz ağ", "meaning": "Wi-Fi", "pron": "kahb-loh-SOOZ ah"}
        }
    },
    {
        "id": "internet", "category": "Tech", "level": 1, "icon": "🌐",
        "translations": {
            "en": {"text": "Internet", "meaning": "Internet", "pron": "IN-ter-net"},
            "es": {"text": "Internet", "meaning": "Internet", "pron": "een-tehr-NEHT"},
            "fr": {"text": "Internet", "meaning": "Internet", "pron": "een-tehr-NEHT"},
            "ru": {"text": "Интернет", "meaning": "Internet", "pron": "een-tyer-NYEHT"},
            "pt": {"text": "Internet", "meaning": "Internet", "pron": "een-tehr-NEHT"},
            "de": {"text": "Internet", "meaning": "Internet", "pron": "EEN-tuhr-neht"},
            "id": {"text": "Internet", "meaning": "Internet", "pron": "een-tehr-NEHT"},
            "tr": {"text": "İnternet", "meaning": "Internet", "pron": "een-tehr-NEHT"}
        }
    },
    {
        "id": "password", "category": "Tech", "level": 1, "icon": "🔐",
        "translations": {
            "en": {"text": "Password", "meaning": "Password", "pron": "PAS-wurd"},
            "es": {"text": "Contraseña", "meaning": "Password", "pron": "kohn-trah-SEH-nyah"},
            "fr": {"text": "Mot de passe", "meaning": "Password", "pron": "moh duh PAHS"},
            "ru": {"text": "Пароль", "meaning": "Password", "pron": "pah-ROHL"},
            "pt": {"text": "Senha", "meaning": "Password", "pron": "SEH-nyah"},
            "de": {"text": "Passwort", "meaning": "Password", "pron": "PAHS-vohrt"},
            "id": {"text": "Kata sandi", "meaning": "Password", "pron": "KAH-tah SAHN-dee"},
            "tr": {"text": "Şifre", "meaning": "Password", "pron": "sheef-REH"}
        }
    },
    {
        "id": "email", "category": "Tech", "level": 1, "icon": "📧",
        "translations": {
            "en": {"text": "Email", "meaning": "Email", "pron": "EE-mayl"},
            "es": {"text": "Correo electrónico", "meaning": "Email", "pron": "koh-RREH-oh eh-lehk-TROH-nee-koh"},
            "fr": {"text": "E-mail", "meaning": "Email", "pron": "ee-MAYL"},
            "ru": {"text": "Электронная почта", "meaning": "Email", "pron": "eh-lyek-TROHN-nah-yah POHCH-tah"},
            "pt": {"text": "E-mail", "meaning": "Email", "pron": "ee-MEH-yoo"},
            "de": {"text": "E-Mail", "meaning": "Email", "pron": "EE-mayl"},
            "id": {"text": "Surel", "meaning": "Email", "pron": "SOO-rehl"},
            "tr": {"text": "E-posta", "meaning": "Email", "pron": "eh-pohs-TAH"}
        }
    },
    {
        "id": "message", "category": "Tech", "level": 1, "icon": "💬",
        "translations": {
            "en": {"text": "Message", "meaning": "Message / Text", "pron": "MES-ij"},
            "es": {"text": "Mensaje", "meaning": "Message", "pron": "mehn-SAH-heh"},
            "fr": {"text": "Message", "meaning": "Message", "pron": "meh-SAHZH"},
            "ru": {"text": "Сообщение", "meaning": "Message", "pron": "suh-uhb-SHCHEH-nee-yeh"},
            "pt": {"text": "Mensagem", "meaning": "Message", "pron": "mehn-SAH-zhehn"},
            "de": {"text": "Nachricht", "meaning": "Message", "pron": "NAHKH-reekht"},
            "id": {"text": "Pesan", "meaning": "Message", "pron": "PEH-sahn"},
            "tr": {"text": "Mesaj", "meaning": "Message", "pron": "meh-SAHZH"}
        }
    },
    {
        "id": "website", "category": "Tech", "level": 1, "icon": "🌐",
        "translations": {
            "en": {"text": "Website", "meaning": "Website", "pron": "WEB-syt"},
            "es": {"text": "Sitio web", "meaning": "Website", "pron": "SEE-tyoh wehb"},
            "fr": {"text": "Site web", "meaning": "Website", "pron": "seet WEHB"},
            "ru": {"text": "Сайт", "meaning": "Website", "pron": "sayt"},
            "pt": {"text": "Site", "meaning": "Website", "pron": "SY-chee"},
            "de": {"text": "Webseite", "meaning": "Website", "pron": "VEHP-zy-tuh"},
            "id": {"text": "Situs web", "meaning": "Website", "pron": "SEE-toos WEHB"},
            "tr": {"text": "Web sitesi", "meaning": "Website", "pron": "wehb see-teh-SEE"}
        }
    },
    {
        "id": "app", "category": "Tech", "level": 1, "icon": "📱",
        "translations": {
            "en": {"text": "Application", "meaning": "Application / App", "pron": "ap-li-KAY-shuhn"},
            "es": {"text": "Aplicación", "meaning": "Application / App", "pron": "ah-plee-kah-SYOHN"},
            "fr": {"text": "Application", "meaning": "Application / App", "pron": "ah-plee-kah-SYOHN"},
            "ru": {"text": "Приложение", "meaning": "App", "pron": "pree-lah-ZHEH-nee-yeh"},
            "pt": {"text": "Aplicativo", "meaning": "App", "pron": "ah-plee-kah-CHEE-voo"},
            "de": {"text": "Anwendung", "meaning": "Application", "pron": "AHN-vehn-doong"},
            "id": {"text": "Aplikasi", "meaning": "Application", "pron": "ah-plee-KAH-see"},
            "tr": {"text": "Uygulama", "meaning": "Application / App", "pron": "ooy-goo-lah-MAH"}
        }
    },
    {
        "id": "file", "category": "Tech", "level": 1, "icon": "📄",
        "translations": {
            "en": {"text": "File", "meaning": "File / Document", "pron": "fyl"},
            "es": {"text": "Archivo", "meaning": "File", "pron": "ahr-CHEE-bvoh"},
            "fr": {"text": "Fichier", "meaning": "File", "pron": "fee-SHYAY"},
            "ru": {"text": "Файл", "meaning": "File", "pron": "fayl"},
            "pt": {"text": "Arquivo", "meaning": "File", "pron": "ahr-KEE-voo"},
            "de": {"text": "Datei", "meaning": "File", "pron": "DAH-ty"},
            "id": {"text": "Berkas", "meaning": "File", "pron": "BEHR-kahs"},
            "tr": {"text": "Dosya", "meaning": "File", "pron": "dohs-YAH"}
        }
    },
    {
        "id": "folder", "category": "Tech", "level": 1, "icon": "📁",
        "translations": {
            "en": {"text": "Folder", "meaning": "Folder", "pron": "FOHL-der"},
            "es": {"text": "Carpeta", "meaning": "Folder", "pron": "kahr-PEH-tah"},
            "fr": {"text": "Dossier", "meaning": "Folder", "pron": "doh-SYAY"},
            "ru": {"text": "Папка", "meaning": "Folder", "pron": "PAHP-kah"},
            "pt": {"text": "Pasta", "meaning": "Folder", "pron": "PAHS-tah"},
            "de": {"text": "Ordner", "meaning": "Folder", "pron": "OHRT-nuhr"},
            "id": {"text": "Folder", "meaning": "Folder", "pron": "FOHL-dehr"},
            "tr": {"text": "Klasör", "meaning": "Folder", "pron": "klah-ZUHR"}
        }
    },
    {
        "id": "camera", "category": "Tech", "level": 1, "icon": "📷",
        "translations": {
            "en": {"text": "Camera", "meaning": "Camera", "pron": "KAM-ruh"},
            "es": {"text": "Cámara", "meaning": "Camera", "pron": "KAH-mah-rah"},
            "fr": {"text": "Caméra", "meaning": "Camera", "pron": "kah-may-RAH"},
            "ru": {"text": "Камера", "meaning": "Camera", "pron": "KAH-mye-rah"},
            "pt": {"text": "Câmera", "meaning": "Camera", "pron": "KAH-meh-rah"},
            "de": {"text": "Kamera", "meaning": "Camera", "pron": "KAH-muh-rah"},
            "id": {"text": "Kamera", "meaning": "Camera", "pron": "KAH-meh-rah"},
            "tr": {"text": "Kamera", "meaning": "Camera", "pron": "kah-meh-RAH"}
        }
    },
    {
        "id": "microphone", "category": "Tech", "level": 1, "icon": "🎙️",
        "translations": {
            "en": {"text": "Microphone", "meaning": "Microphone", "pron": "MY-kruh-fohn"},
            "es": {"text": "Micrófono", "meaning": "Microphone", "pron": "mee-KROH-foh-noh"},
            "fr": {"text": "Microphone", "meaning": "Microphone", "pron": "mee-kroh-FOHN"},
            "ru": {"text": "Микрофон", "meaning": "Microphone", "pron": "mee-kruh-FOHN"},
            "pt": {"text": "Microfone", "meaning": "Microphone", "pron": "mee-kroh-FOH-nee"},
            "de": {"text": "Mikrofon", "meaning": "Microphone", "pron": "mee-kroh-FOHN"},
            "id": {"text": "Mikrofon", "meaning": "Microphone", "pron": "mee-kroh-FOHN"},
            "tr": {"text": "Mikrofon", "meaning": "Microphone", "pron": "meek-roh-FOHN"}
        }
    },
    {
        "id": "headphones", "category": "Tech", "level": 1, "icon": "🎧",
        "translations": {
            "en": {"text": "Headphones", "meaning": "Headphones", "pron": "HED-fohnz"},
            "es": {"text": "Auriculares", "meaning": "Headphones", "pron": "ow-ree-koo-LAH-rehs"},
            "fr": {"text": "Écouteurs", "meaning": "Headphones", "pron": "ay-koo-TUHR"},
            "ru": {"text": "Наушники", "meaning": "Headphones", "pron": "nah-OOSH-nee-kee"},
            "pt": {"text": "Fones de ouvido", "meaning": "Headphones", "pron": "FOH-nees jee oh-VEE-doo"},
            "de": {"text": "Kopfhörer", "meaning": "Headphones", "pron": "KOPF-huhr-uhr"},
            "id": {"text": "Headphone", "meaning": "Headphones", "pron": "HEHD-fohn"},
            "tr": {"text": "Kulaklık", "meaning": "Headphones", "pron": "koo-lahk-LEEK"}
        }
    },
    {
        "id": "printer", "category": "Tech", "level": 1, "icon": "🖨️",
        "translations": {
            "en": {"text": "Printer", "meaning": "Printer", "pron": "PRIN-ter"},
            "es": {"text": "Impresora", "meaning": "Printer", "pron": "eem-preh-SOH-rah"},
            "fr": {"text": "Imprimante", "meaning": "Printer", "pron": "eem-pree-MAHNT"},
            "ru": {"text": "Принтер", "meaning": "Printer", "pron": "PREEN-tyer"},
            "pt": {"text": "Impressora", "meaning": "Printer", "pron": "eem-preh-SOH-rah"},
            "de": {"text": "Drucker", "meaning": "Printer", "pron": "DROO-kuhr"},
            "id": {"text": "Pencetak", "meaning": "Printer", "pron": "pehn-CHEH-tahk"},
            "tr": {"text": "Yazıcı", "meaning": "Printer", "pron": "yah-zee-JEE"}
        }
    },
    {
        "id": "link", "category": "Tech", "level": 1, "icon": "🔗",
        "translations": {
            "en": {"text": "Link", "meaning": "Link", "pron": "lingk"},
            "es": {"text": "Enlace", "meaning": "Link", "pron": "ehn-LAH-seh"},
            "fr": {"text": "Lien", "meaning": "Link", "pron": "lyehn"},
            "ru": {"text": "Ссылка", "meaning": "Link", "pron": "SSYL-kah"},
            "pt": {"text": "Link", "meaning": "Link", "pron": "LING-kee"},
            "de": {"text": "Link", "meaning": "Link", "pron": "leengk"},
            "id": {"text": "Tautan", "meaning": "Link", "pron": "TOW-tahn"},
            "tr": {"text": "Bağlantı", "meaning": "Link", "pron": "bah-lahn-TEE"}
        }
    },
    {
        "id": "search", "category": "Tech", "level": 1, "icon": "🔍",
        "translations": {
            "en": {"text": "Search", "meaning": "Search / Find", "pron": "surch"},
            "es": {"text": "Buscar", "meaning": "Search / Find", "pron": "boos-KAHR"},
            "fr": {"text": "Rechercher", "meaning": "Search", "pron": "ruh-shehr-SHAY"},
            "ru": {"text": "Искать", "meaning": "Search", "pron": "ees-KAHT"},
            "pt": {"text": "Pesquisar", "meaning": "Search", "pron": "pehs-kee-ZAHR"},
            "de": {"text": "Suchen", "meaning": "Search", "pron": "ZOO-khuhn"},
            "id": {"text": "Cari", "meaning": "Search", "pron": "CHAH-ree"},
            "tr": {"text": "Aramak", "meaning": "Search", "pron": "ah-rah-MAHK"}
        }
    },
    {
        "id": "save", "category": "Tech", "level": 1, "icon": "💾",
        "translations": {
            "en": {"text": "Save", "meaning": "Save", "pron": "sayv"},
            "es": {"text": "Guardar", "meaning": "Save", "pron": "gwahr-DAHR"},
            "fr": {"text": "Enregistrer", "meaning": "Save", "pron": "ahn-ruh-zhee-STRAY"},
            "ru": {"text": "Сохранить", "meaning": "Save", "pron": "suh-khrah-NEET"},
            "pt": {"text": "Salvar", "meaning": "Save", "pron": "sahl-VAHR"},
            "de": {"text": "Speichern", "meaning": "Save", "pron": "SHPY-khehrn"},
            "id": {"text": "Simpan", "meaning": "Save", "pron": "SEEM-pahn"},
            "tr": {"text": "Kaydetmek", "meaning": "Save", "pron": "kay-deht-MEHK"}
        }
    },
    {
        "id": "delete", "category": "Tech", "level": 1, "icon": "🗑️",
        "translations": {
            "en": {"text": "Delete", "meaning": "Delete / Remove", "pron": "di-LEET"},
            "es": {"text": "Eliminar", "meaning": "Delete", "pron": "eh-lee-mee-NAHR"},
            "fr": {"text": "Supprimer", "meaning": "Delete", "pron": "soo-pree-MAY"},
            "ru": {"text": "Удалить", "meaning": "Delete", "pron": "oo-dah-LEET"},
            "pt": {"text": "Excluir", "meaning": "Delete", "pron": "ehks-kloo-EER"},
            "de": {"text": "Löschen", "meaning": "Delete", "pron": "LUH-shuhn"},
            "id": {"text": "Hapus", "meaning": "Delete", "pron": "HAH-poos"},
            "tr": {"text": "Silmek", "meaning": "Delete", "pron": "seel-MEHK"}
        }
    },
    {
        "id": "send", "category": "Tech", "level": 1, "icon": "📤",
        "translations": {
            "en": {"text": "Send", "meaning": "Send", "pron": "send"},
            "es": {"text": "Enviar", "meaning": "Send", "pron": "ehn-BYAHR"},
            "fr": {"text": "Envoyer", "meaning": "Send", "pron": "ahn-vwah-YAY"},
            "ru": {"text": "Отправить", "meaning": "Send", "pron": "uht-PRAH-veet"},
            "pt": {"text": "Enviar", "meaning": "Send", "pron": "ehn-vee-AHR"},
            "de": {"text": "Senden", "meaning": "Send", "pron": "ZEHN-duhn"},
            "id": {"text": "Kirim", "meaning": "Send", "pron": "KEE-reem"},
            "tr": {"text": "Göndermek", "meaning": "Send", "pron": "guhn-dehr-MEHK"}
        }
    },
    {
        "id": "download", "category": "Tech", "level": 1, "icon": "📥",
        "translations": {
            "en": {"text": "Download", "meaning": "Download", "pron": "DOWN-lohd"},
            "es": {"text": "Descargar", "meaning": "Download", "pron": "dehs-kahr-GAHR"},
            "fr": {"text": "Télécharger", "meaning": "Download", "pron": "tay-lay-shahr-ZHAY"},
            "ru": {"text": "Скачать", "meaning": "Download", "pron": "skah-CHAHT"},
            "pt": {"text": "Baixar", "meaning": "Download", "pron": "bye-SHAHR"},
            "de": {"text": "Herunterladen", "meaning": "Download", "pron": "heh-ROON-tuhr-lah-duhn"},
            "id": {"text": "Mengunduh", "meaning": "Download", "pron": "mehng-OON-dooh"},
            "tr": {"text": "İndirmek", "meaning": "Download", "pron": "een-deer-MEHK"}
        }
    },
    {
        "id": "upload", "category": "Tech", "level": 1, "icon": "📤",
        "translations": {
            "en": {"text": "Upload", "meaning": "Upload", "pron": "UP-lohd"},
            "es": {"text": "Subir", "meaning": "Upload", "pron": "soo-BEER"},
            "fr": {"text": "Téléverser", "meaning": "Upload", "pron": "tay-lay-vehr-SAY"},
            "ru": {"text": "Загрузить", "meaning": "Upload", "pron": "zah-groo-ZEET"},
            "pt": {"text": "Carregar", "meaning": "Upload", "pron": "kah-rreh-GAHR"},
            "de": {"text": "Hochladen", "meaning": "Upload", "pron": "HOHKH-lah-duhn"},
            "id": {"text": "Mengunggah", "meaning": "Upload", "pron": "mehng-OONG-gah"},
            "tr": {"text": "Yüklemek", "meaning": "Upload", "pron": "yook-leh-MEHK"}
        }
    },
    {
        "id": "online", "category": "Tech", "level": 1, "icon": "🟢",
        "translations": {
            "en": {"text": "Online", "meaning": "Online", "pron": "ON-lyn"},
            "es": {"text": "En línea", "meaning": "Online", "pron": "ehn LEE-neh-ah"},
            "fr": {"text": "En ligne", "meaning": "Online", "pron": "ahn LEEN-yuh"},
            "ru": {"text": "В сети", "meaning": "Online", "pron": "vseh-TEE"},
            "pt": {"text": "Online", "meaning": "Online", "pron": "on-LY-nee"},
            "de": {"text": "Online", "meaning": "Online", "pron": "OHN-lyn"},
            "id": {"text": "Daring", "meaning": "Online", "pron": "DAH-reeng"},
            "tr": {"text": "Çevrim içi", "meaning": "Online", "pron": "chehv-REEM ee-chee"}
        }
    },
    {
        "id": "offline", "category": "Tech", "level": 1, "icon": "⚪",
        "translations": {
            "en": {"text": "Offline", "meaning": "Offline", "pron": "AWF-lyn"},
            "es": {"text": "Desconectado", "meaning": "Offline", "pron": "dehs-koh-nehk-TAH-doh"},
            "fr": {"text": "Hors ligne", "meaning": "Offline", "pron": "ohr LEEN-yuh"},
            "ru": {"text": "Не в сети", "meaning": "Offline", "pron": "nye vseh-TEE"},
            "pt": {"text": "Offline", "meaning": "Offline", "pron": "awf-LY-nee"},
            "de": {"text": "Offline", "meaning": "Offline", "pron": "OFF-lyn"},
            "id": {"text": "Luring", "meaning": "Offline", "pron": "LOO-reeng"},
            "tr": {"text": "Çevrim dışı", "meaning": "Offline", "pron": "chehv-REEM duh-shee"}
        }
    },
    {
        "id": "work", "category": "Business", "level": 1, "icon": "💼",
        "translations": {
            "en": {"text": "Job", "meaning": "Job / Work", "pron": "job"},
            "es": {"text": "Trabajo", "meaning": "Job / Work", "pron": "trah-BAH-hoh"},
            "fr": {"text": "Travail", "meaning": "Job / Work", "pron": "trah-VYE"},
            "ru": {"text": "Работа", "meaning": "Work / Job", "pron": "rah-BOH-tah"},
            "pt": {"text": "Trabalho", "meaning": "Work / Job", "pron": "trah-BAH-lyoo"},
            "de": {"text": "Arbeit", "meaning": "Work / Job", "pron": "AHR-byt"},
            "id": {"text": "Pekerjaan", "meaning": "Job / Work", "pron": "peh-kehr-jah-AHN"},
            "tr": {"text": "İş", "meaning": "Work / Job", "pron": "eesh"}
        }
    },
    {
        "id": "office", "category": "Business", "level": 1, "icon": "🏢",
        "translations": {
            "en": {"text": "Office", "meaning": "Office", "pron": "AW-fis"},
            "es": {"text": "Oficina", "meaning": "Office", "pron": "oh-fee-SEE-nah"},
            "fr": {"text": "Bureau", "meaning": "Office", "pron": "boo-ROH"},
            "ru": {"text": "Офис", "meaning": "Office", "pron": "OH-fees"},
            "pt": {"text": "Escritório", "meaning": "Office", "pron": "ehs-kree-TOH-ryoo"},
            "de": {"text": "Büro", "meaning": "Office", "pron": "byoo-ROH"},
            "id": {"text": "Kantor", "meaning": "Office", "pron": "KAHN-tohr"},
            "tr": {"text": "Ofis", "meaning": "Office", "pron": "oh-FEES"}
        }
    },
    {
        "id": "store", "category": "Shopping", "level": 1, "icon": "🏪",
        "translations": {
            "en": {"text": "Store", "meaning": "Store / Shop", "pron": "stor"},
            "es": {"text": "Tienda", "meaning": "Store / Shop", "pron": "TYEHN-dah"},
            "fr": {"text": "Magasin", "meaning": "Store / Shop", "pron": "mah-gah-ZEHN"},
            "ru": {"text": "Магазин", "meaning": "Store / Shop", "pron": "mah-gah-ZEEN"},
            "pt": {"text": "Loja", "meaning": "Store / Shop", "pron": "LOH-zhah"},
            "de": {"text": "Geschäft", "meaning": "Store / Shop", "pron": "guh-SHEHFT"},
            "id": {"text": "Toko", "meaning": "Store / Shop", "pron": "TOH-koh"},
            "tr": {"text": "Mağaza", "meaning": "Store / Shop", "pron": "mah-AH-zah"}
        }
    },
    {
        "id": "money", "category": "Shopping", "level": 1, "icon": "💵",
        "translations": {
            "en": {"text": "Money", "meaning": "Money", "pron": "MUH-nee"},
            "es": {"text": "Dinero", "meaning": "Money", "pron": "dee-NEH-roh"},
            "fr": {"text": "Argent", "meaning": "Money", "pron": "ahr-ZHAHN"},
            "ru": {"text": "Деньги", "meaning": "Money", "pron": "DYEHN-gee"},
            "pt": {"text": "Dinheiro", "meaning": "Money", "pron": "jee-NYAY-roo"},
            "de": {"text": "Geld", "meaning": "Money", "pron": "gehlt"},
            "id": {"text": "Uang", "meaning": "Money", "pron": "OO-ahng"},
            "tr": {"text": "Para", "meaning": "Money", "pron": "pah-RAH"}
        }
    },
    {
        "id": "price", "category": "Shopping", "level": 1, "icon": "🏷️",
        "translations": {
            "en": {"text": "Price", "meaning": "Price / Cost", "pron": "prys"},
            "es": {"text": "Precio", "meaning": "Price", "pron": "PREH-syoh"},
            "fr": {"text": "Prix", "meaning": "Price", "pron": "pree"},
            "ru": {"text": "Цена", "meaning": "Price", "pron": "tseh-NAH"},
            "pt": {"text": "Preço", "meaning": "Price", "pron": "PREH-soo"},
            "de": {"text": "Preis", "meaning": "Price", "pron": "prys"},
            "id": {"text": "Harga", "meaning": "Price", "pron": "HAHR-gah"},
            "tr": {"text": "Fiyat", "meaning": "Price", "pron": "fee-YAHT"}
        }
    },
    {
        "id": "buy", "category": "Shopping", "level": 1, "icon": "🛍️",
        "translations": {
            "en": {"text": "Buy", "meaning": "Buy / Purchase", "pron": "by"},
            "es": {"text": "Comprar", "meaning": "Buy", "pron": "kohm-PRAHR"},
            "fr": {"text": "Acheter", "meaning": "Buy", "pron": "ahsh-TAY"},
            "ru": {"text": "Купить", "meaning": "Buy", "pron": "koo-PEET"},
            "pt": {"text": "Comprar", "meaning": "Buy", "pron": "kohm-PRAHR"},
            "de": {"text": "Kaufen", "meaning": "Buy", "pron": "KOW-fuhn"},
            "id": {"text": "Beli", "meaning": "Buy", "pron": "BEH-lee"},
            "tr": {"text": "Satın almak", "meaning": "Buy", "pron": "sah-TEEN ahl-mahk"}
        }
    },
    {
        "id": "sell", "category": "Shopping", "level": 1, "icon": "🏷️",
        "translations": {
            "en": {"text": "Sell", "meaning": "Sell", "pron": "sel"},
            "es": {"text": "Vender", "meaning": "Sell", "pron": "behn-DEHR"},
            "fr": {"text": "Vendre", "meaning": "Sell", "pron": "VAHN-druh"},
            "ru": {"text": "Продать", "meaning": "Sell", "pron": "prah-DAHT"},
            "pt": {"text": "Vender", "meaning": "Sell", "pron": "vehn-DEHR"},
            "de": {"text": "Verkaufen", "meaning": "Sell", "pron": "fehr-KOW-fuhn"},
            "id": {"text": "Jual", "meaning": "Sell", "pron": "JOO-ahl"},
            "tr": {"text": "Satmak", "meaning": "Sell", "pron": "saht-MAHK"}
        }
    },
    {
        "id": "pay", "category": "Shopping", "level": 1, "icon": "💳",
        "translations": {
            "en": {"text": "Pay", "meaning": "Pay / Payment", "pron": "pay"},
            "es": {"text": "Pagar", "meaning": "Pay", "pron": "pah-GAHR"},
            "fr": {"text": "Payer", "meaning": "Pay", "pron": "peh-YAY"},
            "ru": {"text": "Платить", "meaning": "Pay", "pron": "plah-TEET"},
            "pt": {"text": "Pagar", "meaning": "Pay", "pron": "pah-GAHR"},
            "de": {"text": "Bezahlen", "meaning": "Pay", "pron": "buh-TSAH-luhn"},
            "id": {"text": "Bayar", "meaning": "Pay", "pron": "BAH-yahr"},
            "tr": {"text": "Ödemek", "meaning": "Pay", "pron": "uh-deh-MEHK"}
        }
    },
    {
        "id": "cash", "category": "Shopping", "level": 1, "icon": "💵",
        "translations": {
            "en": {"text": "Cash", "meaning": "Cash", "pron": "kash"},
            "es": {"text": "Efectivo", "meaning": "Cash", "pron": "eh-fehk-TEE-bvoh"},
            "fr": {"text": "Espèces", "meaning": "Cash", "pron": "ehs-PEHS"},
            "ru": {"text": "Наличные", "meaning": "Cash", "pron": "nah-LEETCH-ny-yeh"},
            "pt": {"text": "Dinheiro em espécie", "meaning": "Cash", "pron": "jee-NYAY-roo ehn ehs-PEH-see"},
            "de": {"text": "Bargeld", "meaning": "Cash", "pron": "BAHR-gehlt"},
            "id": {"text": "Uang tunai", "meaning": "Cash", "pron": "OO-ahng TOO-nigh"},
            "tr": {"text": "Nakit", "meaning": "Cash", "pron": "nah-KEET"}
        }
    },
    {
        "id": "credit_card", "category": "Shopping", "level": 1, "icon": "💳",
        "translations": {
            "en": {"text": "Credit card", "meaning": "Credit card", "pron": "KRED-it kard"},
            "es": {"text": "Tarjeta de crédito", "meaning": "Credit card", "pron": "tahr-HEH-tah deh KREH-dee-toh"},
            "fr": {"text": "Carte de crédit", "meaning": "Credit card", "pron": "kahrt duh kray-DEE"},
            "ru": {"text": "Кредитная карта", "meaning": "Credit card", "pron": "kree-DEET-nah-yah KAHR-tah"},
            "pt": {"text": "Cartão de crédito", "meaning": "Credit card", "pron": "kahr-TOWNG jee KREH-jee-too"},
            "de": {"text": "Kreditkarte", "meaning": "Credit card", "pron": "kreh-DEET-kahr-tuh"},
            "id": {"text": "Kartu kredit", "meaning": "Credit card", "pron": "KAHR-too KREH-deet"},
            "tr": {"text": "Kredi kartı", "meaning": "Credit card", "pron": "kreh-DEE kahr-tee"}
        }
    },
    {
        "id": "cheap", "category": "Shopping", "level": 1, "icon": "🏷️",
        "translations": {
            "en": {"text": "Cheap", "meaning": "Cheap / Inexpensive", "pron": "cheep"},
            "es": {"text": "Barato", "meaning": "Cheap", "pron": "bah-RAH-toh"},
            "fr": {"text": "Bon marché", "meaning": "Cheap", "pron": "bohn mahr-SHAY"},
            "ru": {"text": "Дешёвый", "meaning": "Cheap", "pron": "dye-SHOH-vy"},
            "pt": {"text": "Barato", "meaning": "Cheap", "pron": "bah-RAH-too"},
            "de": {"text": "Billig", "meaning": "Cheap", "pron": "BEEL-leekh"},
            "id": {"text": "Murah", "meaning": "Cheap", "pron": "MOO-rah"},
            "tr": {"text": "Ucuz", "meaning": "Cheap", "pron": "oo-JOOZ"}
        }
    },
    {
        "id": "expensive", "category": "Shopping", "level": 1, "icon": "💎",
        "translations": {
            "en": {"text": "Expensive", "meaning": "Expensive", "pron": "ek-SPEN-siv"},
            "es": {"text": "Caro", "meaning": "Expensive", "pron": "KAH-roh"},
            "fr": {"text": "Cher", "meaning": "Expensive", "pron": "shehr"},
            "ru": {"text": "Дорогой", "meaning": "Expensive", "pron": "duh-rah-GOY"},
            "pt": {"text": "Caro", "meaning": "Expensive", "pron": "KAH-roo"},
            "de": {"text": "Teuer", "meaning": "Expensive", "pron": "TOY-er"},
            "id": {"text": "Mahal", "meaning": "Expensive", "pron": "MAH-hahl"},
            "tr": {"text": "Pahalı", "meaning": "Expensive", "pron": "pah-hah-LEE"}
        }
    },
    {
        "id": "discount", "category": "Shopping", "level": 1, "icon": "🏷️",
        "translations": {
            "en": {"text": "Discount", "meaning": "Discount", "pron": "DIS-kownt"},
            "es": {"text": "Descuento", "meaning": "Discount", "pron": "dehs-KWEHN-toh"},
            "fr": {"text": "Réduction", "meaning": "Discount", "pron": "ray-dook-SYOHN"},
            "ru": {"text": "Скидка", "meaning": "Discount", "pron": "SKEED-kah"},
            "pt": {"text": "Desconto", "meaning": "Discount", "pron": "dehs-KOHN-too"},
            "de": {"text": "Rabatt", "meaning": "Discount", "pron": "rah-BAHT"},
            "id": {"text": "Diskon", "meaning": "Discount", "pron": "DEES-kohn"},
            "tr": {"text": "İndirim", "meaning": "Discount", "pron": "een-dee-REEM"}
        }
    },
    {
        "id": "receipt", "category": "Shopping", "level": 1, "icon": "🧾",
        "translations": {
            "en": {"text": "Receipt", "meaning": "Receipt", "pron": "ri-SEET"},
            "es": {"text": "Recibo", "meaning": "Receipt", "pron": "rreh-SEE-bvoh"},
            "fr": {"text": "Reçu", "meaning": "Receipt", "pron": "ruh-SOO"},
            "ru": {"text": "Чек", "meaning": "Receipt", "pron": "chek"},
            "pt": {"text": "Recibo", "meaning": "Receipt", "pron": "heh-SEE-boo"},
            "de": {"text": "Quittung", "meaning": "Receipt", "pron": "KVEET-toong"},
            "id": {"text": "Struk", "meaning": "Receipt", "pron": "strook"},
            "tr": {"text": "Fiş", "meaning": "Receipt", "pron": "feesh"}
        }
    },
    {
        "id": "help_desk", "category": "Tech", "level": 1, "icon": "💁",
        "translations": {
            "en": {"text": "Support", "meaning": "Customer Support / Help Desk", "pron": "suh-PORT"},
            "es": {"text": "Soporte", "meaning": "Support / Help Desk", "pron": "soh-POHR-teh"},
            "fr": {"text": "Assistance", "meaning": "Support / Help Desk", "pron": "ah-sees-TAHNS"},
            "ru": {"text": "Поддержка", "meaning": "Support", "pron": "puhd-DYEHRZH-kah"},
            "pt": {"text": "Suporte", "meaning": "Support", "pron": "soo-POHR-chee"},
            "de": {"text": "Kundendienst", "meaning": "Support / Service", "pron": "KOON-duhn-deenst"},
            "id": {"text": "Dukungan", "meaning": "Support", "pron": "doo-KOONG-ahn"},
            "tr": {"text": "Destek", "meaning": "Support", "pron": "dehs-TEHK"}
        }
    },
    {
        "id": "open_action", "category": "Tech", "level": 1, "icon": "📂",
        "translations": {
            "en": {"text": "Open", "meaning": "Open", "pron": "OH-puhn"},
            "es": {"text": "Abrir", "meaning": "Open", "pron": "ah-BREER"},
            "fr": {"text": "Ouvrir", "meaning": "Open", "pron": "oo-VREER"},
            "ru": {"text": "Открыть", "meaning": "Open", "pron": "uht-KRYT"},
            "pt": {"text": "Abrir", "meaning": "Open", "pron": "ah-BREER"},
            "de": {"text": "Öffnen", "meaning": "Open", "pron": "UHF-nuhn"},
            "id": {"text": "Buka", "meaning": "Open", "pron": "BOO-kah"},
            "tr": {"text": "Açmak", "meaning": "Open", "pron": "ahch-MAHK"}
        }
    },
    {
        "id": "close_action", "category": "Tech", "level": 1, "icon": "✖️",
        "translations": {
            "en": {"text": "Close", "meaning": "Close", "pron": "klohz"},
            "es": {"text": "Cerrar", "meaning": "Close", "pron": "sehr-RAHR"},
            "fr": {"text": "Fermer", "meaning": "Close", "pron": "fehr-MAY"},
            "ru": {"text": "Закрыть", "meaning": "Close", "pron": "zah-KRYT"},
            "pt": {"text": "Fechar", "meaning": "Close", "pron": "feh-SHAHR"},
            "de": {"text": "Schließen", "meaning": "Close", "pron": "SHLEES-suhn"},
            "id": {"text": "Tutup", "meaning": "Close", "pron": "TOO-toop"},
            "tr": {"text": "Kapatmak", "meaning": "Close", "pron": "kah-paht-MAHK"}
        }
    },
    {
        "id": "update_action", "category": "Tech", "level": 1, "icon": "🔄",
        "translations": {
            "en": {"text": "Update", "meaning": "Update / Refresh", "pron": "up-DAYT"},
            "es": {"text": "Actualizar", "meaning": "Update", "pron": "ahk-twah-lee-SAHR"},
            "fr": {"text": "Mettre à jour", "meaning": "Update", "pron": "MEH-truh ah zhoor"},
            "ru": {"text": "Обновить", "meaning": "Update", "pron": "uhb-nah-VEET"},
            "pt": {"text": "Atualizar", "meaning": "Update", "pron": "ah-twah-lee-ZAHR"},
            "de": {"text": "Aktualisieren", "meaning": "Update", "pron": "ahk-too-ah-lee-ZEE-ruhn"},
            "id": {"text": "Perbarui", "meaning": "Update", "pron": "pehr-BAH-roo-ee"},
            "tr": {"text": "Güncellemek", "meaning": "Update", "pron": "gyoon-jehl-leh-MEHK"}
        }
    },

    # ==========================================
    # LEVEL 2: WORKPLACE & PRACTICAL OPERATIONS (Items 51 - 100)
    # ==========================================
    {
        "id": "boss", "category": "Business", "level": 2, "icon": "👔",
        "translations": {
            "en": {"text": "Boss", "meaning": "Boss / Supervisor", "pron": "baws"},
            "es": {"text": "Jefe", "meaning": "Boss", "pron": "HEH-feh"},
            "fr": {"text": "Patron", "meaning": "Boss", "pron": "pah-TROHN"},
            "ru": {"text": "Начальник", "meaning": "Boss / Supervisor", "pron": "nah-CHAHL-neek"},
            "pt": {"text": "Chefe", "meaning": "Boss", "pron": "SHEH-fee"},
            "de": {"text": "Chef", "meaning": "Boss", "pron": "shehf"},
            "id": {"text": "Bos", "meaning": "Boss", "pron": "bohs"},
            "tr": {"text": "Patron", "meaning": "Boss", "pron": "paht-ROHN"}
        }
    },
    {
        "id": "colleague", "category": "Business", "level": 2, "icon": "👥",
        "translations": {
            "en": {"text": "Colleague", "meaning": "Colleague / Coworker", "pron": "KOL-eeg"},
            "es": {"text": "Colega", "meaning": "Colleague", "pron": "koh-LEH-gah"},
            "fr": {"text": "Collègue", "meaning": "Colleague", "pron": "koh-LEHG"},
            "ru": {"text": "Коллега", "meaning": "Colleague", "pron": "kah-LYEH-gah"},
            "pt": {"text": "Colega", "meaning": "Colleague", "pron": "koh-LEH-gah"},
            "de": {"text": "Kollege", "meaning": "Colleague", "pron": "kohl-LAY-guh"},
            "id": {"text": "Rekan kerja", "meaning": "Colleague", "pron": "REH-kahn KEHR-jah"},
            "tr": {"text": "İş arkadaşı", "meaning": "Colleague", "pron": "eesh ahr-kah-dah-SHEE"}
        }
    },
    {
        "id": "employee", "category": "Business", "level": 2, "icon": "🧑‍💼",
        "translations": {
            "en": {"text": "Employee", "meaning": "Employee / Worker", "pron": "em-ploy-EE"},
            "es": {"text": "Empleado", "meaning": "Employee", "pron": "ehm-pleh-AH-doh"},
            "fr": {"text": "Employé", "meaning": "Employee", "pron": "ahn-plwah-YAY"},
            "ru": {"text": "Сотрудник", "meaning": "Employee", "pron": "sah-TROOD-neek"},
            "pt": {"text": "Funcionário", "meaning": "Employee", "pron": "foon-syoh-NAH-ryoo"},
            "de": {"text": "Mitarbeiter", "meaning": "Employee", "pron": "MEET-ahr-by-tuhr"},
            "id": {"text": "Karyawan", "meaning": "Employee", "pron": "kahr-yah-WAHN"},
            "tr": {"text": "Çalışan", "meaning": "Employee", "pron": "chah-lesh-AHN"}
        }
    },
    {
        "id": "client", "category": "Business", "level": 2, "icon": "🤝",
        "translations": {
            "en": {"text": "Client", "meaning": "Client / Customer", "pron": "KLY-uhnt"},
            "es": {"text": "Cliente", "meaning": "Client", "pron": "klyehn-teh"},
            "fr": {"text": "Client", "meaning": "Client", "pron": "klee-AHN"},
            "ru": {"text": "Клиент", "meaning": "Client", "pron": "klee-YEHNT"},
            "pt": {"text": "Cliente", "meaning": "Client", "pron": "klee-EHN-chee"},
            "de": {"text": "Kunde", "meaning": "Client / Customer", "pron": "KOON-duh"},
            "id": {"text": "Klien", "meaning": "Client", "pron": "KLEE-ehn"},
            "tr": {"text": "Müşteri", "meaning": "Customer / Client", "pron": "myoosh-teh-REE"}
        }
    },
    {
        "id": "meeting", "category": "Business", "level": 2, "icon": "📅",
        "translations": {
            "en": {"text": "Meeting", "meaning": "Meeting", "pron": "MEE-ting"},
            "es": {"text": "Reunión", "meaning": "Meeting", "pron": "reh-oo-NYOHN"},
            "fr": {"text": "Réunion", "meaning": "Meeting", "pron": "ray-oo-NYOHN"},
            "ru": {"text": "Встреча", "meaning": "Meeting", "pron": "VSTREH-chah"},
            "pt": {"text": "Reunião", "meaning": "Meeting", "pron": "heh-oo-nee-OWNG"},
            "de": {"text": "Besprechung", "meaning": "Meeting", "pron": "buh-SHPREH-khoong"},
            "id": {"text": "Rapat", "meaning": "Meeting", "pron": "RAH-paht"},
            "tr": {"text": "Toplantı", "meaning": "Meeting", "pron": "tohp-lahn-TEE"}
        }
    },
    {
        "id": "schedule", "category": "Business", "level": 2, "icon": "🗓️",
        "translations": {
            "en": {"text": "Schedule", "meaning": "Schedule / Calendar", "pron": "SKED-yool"},
            "es": {"text": "Horario", "meaning": "Schedule", "pron": "oh-RAH-ryoh"},
            "fr": {"text": "Emploi du temps", "meaning": "Schedule", "pron": "ahn-PLWAH doo tahn"},
            "ru": {"text": "Расписание", "meaning": "Schedule", "pron": "rahs-pee-SAH-nee-yeh"},
            "pt": {"text": "Horário", "meaning": "Schedule", "pron": "oh-RAH-ryoo"},
            "de": {"text": "Zeitplan", "meaning": "Schedule", "pron": "TSYT-plahn"},
            "id": {"text": "Jadwal", "meaning": "Schedule", "pron": "JAHD-wahl"},
            "tr": {"text": "Program", "meaning": "Schedule", "pron": "prohg-RAHM"}
        }
    },
    {
        "id": "task", "category": "Business", "level": 2, "icon": "✅",
        "translations": {
            "en": {"text": "Task", "meaning": "Task / Assignment", "pron": "task"},
            "es": {"text": "Tarea", "meaning": "Task", "pron": "tah-REH-ah"},
            "fr": {"text": "Tâche", "meaning": "Task", "pron": "tahsh"},
            "ru": {"text": "Задача", "meaning": "Task", "pron": "zah-DAH-chah"},
            "pt": {"text": "Tarefa", "meaning": "Task", "pron": "tah-REH-fah"},
            "de": {"text": "Aufgabe", "meaning": "Task", "pron": "OWF-gah-buh"},
            "id": {"text": "Tugas", "meaning": "Task", "pron": "TOO-gahs"},
            "tr": {"text": "Görev", "meaning": "Task", "pron": "guh-REHV"}
        }
    },
    {
        "id": "project", "category": "Business", "level": 2, "icon": "📊",
        "translations": {
            "en": {"text": "Project", "meaning": "Project", "pron": "PROJ-ekt"},
            "es": {"text": "Proyecto", "meaning": "Project", "pron": "proh-YEHK-toh"},
            "fr": {"text": "Projet", "meaning": "Project", "pron": "proh-ZHAY"},
            "ru": {"text": "Проект", "meaning": "Project", "pron": "prah-YEHKT"},
            "pt": {"text": "Projeto", "meaning": "Project", "pron": "proh-ZHEH-too"},
            "de": {"text": "Projekt", "meaning": "Project", "pron": "proh-YEHKT"},
            "id": {"text": "Proyek", "meaning": "Project", "pron": "PROH-yehk"},
            "tr": {"text": "Proje", "meaning": "Project", "pron": "proh-ZHEH"}
        }
    },
    {
        "id": "report", "category": "Business", "level": 2, "icon": "📑",
        "translations": {
            "en": {"text": "Report", "meaning": "Report / Summary", "pron": "ri-PORT"},
            "es": {"text": "Informe", "meaning": "Report", "pron": "een-FOHR-meh"},
            "fr": {"text": "Rapport", "meaning": "Report", "pron": "rah-POHR"},
            "ru": {"text": "Отчёт", "meaning": "Report", "pron": "aht-CHOHT"},
            "pt": {"text": "Relatório", "meaning": "Report", "pron": "heh-lah-TOH-ryoo"},
            "de": {"text": "Bericht", "meaning": "Report", "pron": "buh-REEKHT"},
            "id": {"text": "Laporan", "meaning": "Report", "pron": "lah-POH-rahn"},
            "tr": {"text": "Rapor", "meaning": "Report", "pron": "rah-POHR"}
        }
    },
    {
        "id": "presentation", "category": "Business", "level": 2, "icon": "📽️",
        "translations": {
            "en": {"text": "Presentation", "meaning": "Presentation", "pron": "prez-en-TAY-shuhn"},
            "es": {"text": "Presentación", "meaning": "Presentation", "pron": "preh-sehn-tah-SYOHN"},
            "fr": {"text": "Présentation", "meaning": "Presentation", "pron": "pray-zahn-tah-SYOHN"},
            "ru": {"text": "Презентация", "meaning": "Presentation", "pron": "prye-zyen-TAH-tsee-yah"},
            "pt": {"text": "Apresentação", "meaning": "Presentation", "pron": "ah-preh-zehn-tah-SOWNG"},
            "de": {"text": "Präsentation", "meaning": "Presentation", "pron": "pray-zehn-tah-TSYOHN"},
            "id": {"text": "Presentasi", "meaning": "Presentation", "pron": "preh-sehn-TAH-see"},
            "tr": {"text": "Sunum", "meaning": "Presentation", "pron": "soo-NOOM"}
        }
    },
    {
        "id": "contract", "category": "Business", "level": 2, "icon": "📝",
        "translations": {
            "en": {"text": "Contract", "meaning": "Contract / Agreement", "pron": "KON-trakt"},
            "es": {"text": "Contrato", "meaning": "Contract", "pron": "kohn-TRAH-toh"},
            "fr": {"text": "Contrat", "meaning": "Contract", "pron": "kohn-TRAH"},
            "ru": {"text": "Договор", "meaning": "Contract", "pron": "dah-gah-VOHR"},
            "pt": {"text": "Contrato", "meaning": "Contract", "pron": "kohn-TRAH-too"},
            "de": {"text": "Vertrag", "meaning": "Contract", "pron": "fehr-TRAHK"},
            "id": {"text": "Kontrak", "meaning": "Contract", "pron": "KOHN-trahk"},
            "tr": {"text": "Sözleşme", "meaning": "Contract", "pron": "sohz-lesh-MEH"}
        }
    },
    {
        "id": "signature", "category": "Business", "level": 2, "icon": "✍️",
        "translations": {
            "en": {"text": "Signature", "meaning": "Signature", "pron": "SIG-nuh-chur"},
            "es": {"text": "Firma", "meaning": "Signature", "pron": "FEER-mah"},
            "fr": {"text": "Signature", "meaning": "Signature", "pron": "see-nyah-TOOR"},
            "ru": {"text": "Подпись", "meaning": "Signature", "pron": "POHT-pees"},
            "pt": {"text": "Assinatura", "meaning": "Signature", "pron": "ah-see-nah-TOO-rah"},
            "de": {"text": "Unterschrift", "meaning": "Signature", "pron": "OON-tuhr-shreeft"},
            "id": {"text": "Tanda tangan", "meaning": "Signature", "pron": "TAHN-dah TAHN-gahn"},
            "tr": {"text": "İmza", "meaning": "Signature", "pron": "eem-ZAH"}
        }
    },
    {
        "id": "company", "category": "Business", "level": 2, "icon": "🏢",
        "translations": {
            "en": {"text": "Company", "meaning": "Company / Business", "pron": "KUM-puh-nee"},
            "es": {"text": "Empresa", "meaning": "Company", "pron": "ehm-PREH-sah"},
            "fr": {"text": "Entreprise", "meaning": "Company", "pron": "ahn-truh-PREEZ"},
            "ru": {"text": "Компания", "meaning": "Company", "pron": "kahm-PAH-nee-yah"},
            "pt": {"text": "Empresa", "meaning": "Company", "pron": "ehm-PREH-sah"},
            "de": {"text": "Unternehmen", "meaning": "Company", "pron": "OON-tuhr-nay-muhn"},
            "id": {"text": "Perusahaan", "meaning": "Company", "pron": "peh-roo-sah-HAH-ahn"},
            "tr": {"text": "Şirket", "meaning": "Company", "pron": "sheer-KEHT"}
        }
    },
    {
        "id": "salary", "category": "Business", "level": 2, "icon": "💵",
        "translations": {
            "en": {"text": "Salary", "meaning": "Salary / Wage", "pron": "SAL-uh-ree"},
            "es": {"text": "Salario", "meaning": "Salary", "pron": "sah-LAH-ryoh"},
            "fr": {"text": "Salaire", "meaning": "Salary", "pron": "sah-LEHR"},
            "ru": {"text": "Зарплата", "meaning": "Salary", "pron": "zahr-PLAH-tah"},
            "pt": {"text": "Salário", "meaning": "Salary", "pron": "sah-LAH-ryoo"},
            "de": {"text": "Gehalt", "meaning": "Salary", "pron": "guh-HAHLT"},
            "id": {"text": "Gaji", "meaning": "Salary", "pron": "GAH-jee"},
            "tr": {"text": "Maaş", "meaning": "Salary", "pron": "mah-AHSH"}
        }
    },
    {
        "id": "vacation", "category": "Business", "level": 2, "icon": "🏖️",
        "translations": {
            "en": {"text": "Vacation", "meaning": "Vacation / Time off", "pron": "vay-KAY-shuhn"},
            "es": {"text": "Vacaciones", "meaning": "Vacation", "pron": "bvah-kah-SYOH-nehs"},
            "fr": {"text": "Congé", "meaning": "Vacation / Leave", "pron": "kohn-ZHAY"},
            "ru": {"text": "Отпуск", "meaning": "Vacation", "pron": "OHT-poosk"},
            "pt": {"text": "Férias", "meaning": "Vacation", "pron": "FEH-ryahs"},
            "de": {"text": "Urlaub", "meaning": "Vacation", "pron": "OOR-lowp"},
            "id": {"text": "Liburan", "meaning": "Vacation", "pron": "lee-BOO-rahn"},
            "tr": {"text": "Tatil", "meaning": "Vacation", "pron": "tah-TEEL"}
        }
    },
    {
        "id": "resume", "category": "Business", "level": 2, "icon": "📄",
        "translations": {
            "en": {"text": "Resume", "meaning": "Resume / CV", "pron": "REZ-oo-may"},
            "es": {"text": "Currículum", "meaning": "Resume / CV", "pron": "koo-RREE-koo-loom"},
            "fr": {"text": "Curriculum vitae", "meaning": "CV / Resume", "pron": "koo-ree-koo-LOOM vee-TAY"},
            "ru": {"text": "Резюме", "meaning": "Resume", "pron": "rye-zyoo-MEH"},
            "pt": {"text": "Currículo", "meaning": "Resume / CV", "pron": "koo-HREE-koo-loo"},
            "de": {"text": "Lebenslauf", "meaning": "CV / Resume", "pron": "LAY-buhns-lowf"},
            "id": {"text": "Riwayat hidup", "meaning": "Resume / CV", "pron": "ree-WAH-yaht HEE-doop"},
            "tr": {"text": "Özgeçmiş", "meaning": "Resume / CV", "pron": "uhz-gech-MEESH"}
        }
    },
    {
        "id": "interview", "category": "Business", "level": 2, "icon": "👔",
        "translations": {
            "en": {"text": "Interview", "meaning": "Job interview", "pron": "IN-ter-vyoo"},
            "es": {"text": "Entrevista", "meaning": "Interview", "pron": "ehn-treh-BVEES-tah"},
            "fr": {"text": "Entretien", "meaning": "Interview", "pron": "ahn-truh-TYEHN"},
            "ru": {"text": "Собеседование", "meaning": "Job interview", "pron": "suh-bye-SYEH-duh-vah-nee-yeh"},
            "pt": {"text": "Entrevista", "meaning": "Interview", "pron": "ehn-treh-VEES-tah"},
            "de": {"text": "Bewerbungsgespräch", "meaning": "Job interview", "pron": "buh-VEHR-boongs-guh-shpraykh"},
            "id": {"text": "Wawancara", "meaning": "Interview", "pron": "wah-wahn-CHAH-rah"},
            "tr": {"text": "Mülakat", "meaning": "Job interview", "pron": "myoo-lah-KAHT"}
        }
    },
    {
        "id": "deadline", "category": "Business", "level": 2, "icon": "⏳",
        "translations": {
            "en": {"text": "Deadline", "meaning": "Deadline / Due date", "pron": "DED-lyn"},
            "es": {"text": "Fecha límite", "meaning": "Deadline", "pron": "FEH-chah LEE-mee-teh"},
            "fr": {"text": "Date limite", "meaning": "Deadline", "pron": "daht lee-MEET"},
            "ru": {"text": "Срок сдачи", "meaning": "Deadline", "pron": "srohk ZDAH-chee"},
            "pt": {"text": "Prazo final", "meaning": "Deadline", "pron": "PRAH-zoo fee-NAHL"},
            "de": {"text": "Frist", "meaning": "Deadline", "pron": "frihst"},
            "id": {"text": "Tenggat waktu", "meaning": "Deadline", "pron": "TEHNG-gaht WAHK-too"},
            "tr": {"text": "Son teslim tarihi", "meaning": "Deadline", "pron": "sohn tehs-LEEM tah-ree-HEE"}
        }
    },
    {
        "id": "goal", "category": "Business", "level": 2, "icon": "🎯",
        "translations": {
            "en": {"text": "Goal", "meaning": "Goal / Target", "pron": "gohl"},
            "es": {"text": "Meta", "meaning": "Goal / Target", "pron": "MEH-tah"},
            "fr": {"text": "Objectif", "meaning": "Goal / Objective", "pron": "ohb-zhehk-TEEF"},
            "ru": {"text": "Цель", "meaning": "Goal", "pron": "tsel"},
            "pt": {"text": "Meta", "meaning": "Goal", "pron": "MEH-tah"},
            "de": {"text": "Ziel", "meaning": "Goal", "pron": "tseel"},
            "id": {"text": "Tujuan", "meaning": "Goal", "pron": "too-JOO-ahn"},
            "tr": {"text": "Hedef", "meaning": "Goal", "pron": "heh-DEHF"}
        }
    },
    {
        "id": "product", "category": "Business", "level": 2, "icon": "📦",
        "translations": {
            "en": {"text": "Product", "meaning": "Product", "pron": "PROD-uhkt"},
            "es": {"text": "Producto", "meaning": "Product", "pron": "proh-DOOK-toh"},
            "fr": {"text": "Produit", "meaning": "Product", "pron": "proh-DWEE"},
            "ru": {"text": "Продукт", "meaning": "Product", "pron": "prah-DOOKT"},
            "pt": {"text": "Produto", "meaning": "Product", "pron": "proh-DOO-too"},
            "de": {"text": "Produkt", "meaning": "Product", "pron": "proh-DOOKT"},
            "id": {"text": "Produk", "meaning": "Product", "pron": "PROH-dook"},
            "tr": {"text": "Ürün", "meaning": "Product", "pron": "oo-ROON"}
        }
    },
    {
        "id": "service", "category": "Business", "level": 2, "icon": "🛠️",
        "translations": {
            "en": {"text": "Service", "meaning": "Service", "pron": "SUR-vis"},
            "es": {"text": "Servicio", "meaning": "Service", "pron": "sehr-BEE-syoh"},
            "fr": {"text": "Service", "meaning": "Service", "pron": "sehr-VEES"},
            "ru": {"text": "Услуга", "meaning": "Service", "pron": "oo-SLOO-gah"},
            "pt": {"text": "Serviço", "meaning": "Service", "pron": "sehr-VEE-soo"},
            "de": {"text": "Dienstleistung", "meaning": "Service", "pron": "DEENST-ly-stoong"},
            "id": {"text": "Layanan", "meaning": "Service", "pron": "LAH-yah-nahn"},
            "tr": {"text": "Hizmet", "meaning": "Service", "pron": "heez-MEHT"}
        }
    },
    {
        "id": "invoice", "category": "Shopping", "level": 2, "icon": "🧾",
        "translations": {
            "en": {"text": "Invoice", "meaning": "Invoice", "pron": "IN-voys"},
            "es": {"text": "Factura", "meaning": "Invoice", "pron": "fahk-TOO-rah"},
            "fr": {"text": "Facture", "meaning": "Invoice", "pron": "fahk-TOOR"},
            "ru": {"text": "Счёт", "meaning": "Invoice / Bill", "pron": "schyot"},
            "pt": {"text": "Fatura", "meaning": "Invoice", "pron": "fah-TOO-rah"},
            "de": {"text": "Rechnung", "meaning": "Invoice / Bill", "pron": "REHKH-noong"},
            "id": {"text": "Faktur", "meaning": "Invoice", "pron": "FAHK-toor"},
            "tr": {"text": "Fatura", "meaning": "Invoice", "pron": "fah-too-RAH"}
        }
    },
    {
        "id": "bank", "category": "Shopping", "level": 2, "icon": "🏦",
        "translations": {
            "en": {"text": "Bank", "meaning": "Bank", "pron": "bangk"},
            "es": {"text": "Banco", "meaning": "Bank", "pron": "BAHN-koh"},
            "fr": {"text": "Banque", "meaning": "Bank", "pron": "bahnk"},
            "ru": {"text": "Банк", "meaning": "Bank", "pron": "bahnk"},
            "pt": {"text": "Banco", "meaning": "Bank", "pron": "BAHN-koo"},
            "de": {"text": "Bank", "meaning": "Bank", "pron": "bahnk"},
            "id": {"text": "Bank", "meaning": "Bank", "pron": "bahnk"},
            "tr": {"text": "Banka", "meaning": "Bank", "pron": "bahn-KAH"}
        }
    },
    {
        "id": "transfer", "category": "Shopping", "level": 2, "icon": "💸",
        "translations": {
            "en": {"text": "Transfer", "meaning": "Bank transfer / Wire", "pron": "TRANS-fur"},
            "es": {"text": "Transferencia", "meaning": "Transfer", "pron": "trahns-feh-REHN-syah"},
            "fr": {"text": "Virement", "meaning": "Bank transfer", "pron": "veer-MAHN"},
            "ru": {"text": "Перевод", "meaning": "Transfer", "pron": "pyee-ryee-VOHD"},
            "pt": {"text": "Transferência", "meaning": "Transfer", "pron": "trahns-feh-REHN-syah"},
            "de": {"text": "Überweisung", "meaning": "Transfer", "pron": "yoo-buhr-VY-zoong"},
            "id": {"text": "Transfer", "meaning": "Transfer", "pron": "TRAHNS-fehr"},
            "tr": {"text": "Havale", "meaning": "Transfer", "pron": "hah-vah-LEH"}
        }
    },
    {
        "id": "refund", "category": "Shopping", "level": 2, "icon": "↩️",
        "translations": {
            "en": {"text": "Refund", "meaning": "Refund / Return", "pron": "REE-fund"},
            "es": {"text": "Reembolso", "meaning": "Refund", "pron": "rreh-ehm-BOHL-soh"},
            "fr": {"text": "Remboursement", "meaning": "Refund", "pron": "rahn-boors-MAHN"},
            "ru": {"text": "Возврат", "meaning": "Refund", "pron": "vahz-VRAHT"},
            "pt": {"text": "Reembolso", "meaning": "Refund", "pron": "heh-ehm-BOHL-soo"},
            "de": {"text": "Rückerstattung", "meaning": "Refund", "pron": "ROOK-ehr-shtah-toong"},
            "id": {"text": "Pengembalian dana", "meaning": "Refund", "pron": "pehng-ehm-BAH-lee-ahn DAH-nah"},
            "tr": {"text": "Para iadesi", "meaning": "Refund", "pron": "pah-RAH ee-ah-deh-SEE"}
        }
    },
    {
        "id": "shipping", "category": "Shopping", "level": 2, "icon": "🚚",
        "translations": {
            "en": {"text": "Shipping", "meaning": "Shipping / Delivery", "pron": "SHIP-ing"},
            "es": {"text": "Envío", "meaning": "Shipping", "pron": "ehn-BEE-oh"},
            "fr": {"text": "Livraison", "meaning": "Shipping / Delivery", "pron": "lee-vreh-ZOHN"},
            "ru": {"text": "Доставка", "meaning": "Delivery / Shipping", "pron": "dah-STAHV-kah"},
            "pt": {"text": "Envio", "meaning": "Shipping", "pron": "ehn-VEE-oo"},
            "de": {"text": "Versand", "meaning": "Shipping", "pron": "fehr-ZAHNT"},
            "id": {"text": "Pengiriman", "meaning": "Shipping", "pron": "pehng-ee-REE-mahn"},
            "tr": {"text": "Kargo", "meaning": "Shipping / Cargo", "pron": "kahr-GOH"}
        }
    },
    {
        "id": "package", "category": "Shopping", "level": 2, "icon": "📦",
        "translations": {
            "en": {"text": "Package", "meaning": "Package / Parcel", "pron": "PAK-ij"},
            "es": {"text": "Paquete", "meaning": "Package", "pron": "pah-KEH-teh"},
            "fr": {"text": "Colis", "meaning": "Package / Parcel", "pron": "koh-LEE"},
            "ru": {"text": "Посылка", "meaning": "Package / Parcel", "pron": "pah-SYL-kah"},
            "pt": {"text": "Pacote", "meaning": "Package", "pron": "pah-KOH-chee"},
            "de": {"text": "Paket", "meaning": "Package", "pron": "pah-KAYT"},
            "id": {"text": "Paket", "meaning": "Package", "pron": "PAH-keht"},
            "tr": {"text": "Paket", "meaning": "Package", "pron": "pah-KEHT"}
        }
    },

    # ==========================================
    # LEVEL 3: TECH INDUSTRY, ENGINEERING & ADVANCED COMMERCE (Items 101 - 150)
    # ==========================================
    {
        "id": "software", "category": "Tech", "level": 3, "icon": "💾",
        "translations": {
            "en": {"text": "Software", "meaning": "Software", "pron": "SAWFT-wair"},
            "es": {"text": "Software", "meaning": "Software", "pron": "SOHFT-wehr"},
            "fr": {"text": "Logiciel", "meaning": "Software", "pron": "loh-zhee-SYEHL"},
            "ru": {"text": "Программное обеспечение", "meaning": "Software", "pron": "prah-GRAHM-noh-yeh ah-bee-spye-CHEH-nee-yeh"},
            "pt": {"text": "Software", "meaning": "Software", "pron": "SOHFT-wehr"},
            "de": {"text": "Software", "meaning": "Software", "pron": "ZOFFT-vehr"},
            "id": {"text": "Perangkat lunak", "meaning": "Software", "pron": "peh-RAHNG-kaht LOO-nahk"},
            "tr": {"text": "Yazılım", "meaning": "Software", "pron": "yah-zee-LEEM"}
        }
    },
    {
        "id": "hardware", "category": "Tech", "level": 3, "icon": "🖥️",
        "translations": {
            "en": {"text": "Hardware", "meaning": "Hardware", "pron": "HAHRD-wair"},
            "es": {"text": "Hardware", "meaning": "Hardware", "pron": "HAHRD-wehr"},
            "fr": {"text": "Matériel informatique", "meaning": "Hardware", "pron": "mah-tay-RYEHL een-fohr-mah-TEEK"},
            "ru": {"text": "Аппаратное обеспечение", "meaning": "Hardware", "pron": "ah-pah-RAHT-noh-yeh ah-bee-spye-CHEH-nee-yeh"},
            "pt": {"text": "Hardware", "meaning": "Hardware", "pron": "HAHRD-wehr"},
            "de": {"text": "Hardware", "meaning": "Hardware", "pron": "HAHRD-vehr"},
            "id": {"text": "Perangkat keras", "meaning": "Hardware", "pron": "peh-RAHNG-kaht KEH-rahs"},
            "tr": {"text": "Donanım", "meaning": "Hardware", "pron": "doh-nah-NEEM"}
        }
    },
    {
        "id": "database", "category": "Tech", "level": 3, "icon": "🗄️",
        "translations": {
            "en": {"text": "Database", "meaning": "Database", "pron": "DAY-tuh-bays"},
            "es": {"text": "Base de datos", "meaning": "Database", "pron": "BAH-seh deh DAH-tohs"},
            "fr": {"text": "Base de données", "meaning": "Database", "pron": "bahz duh doh-NAY"},
            "ru": {"text": "База данных", "meaning": "Database", "pron": "BAH-zah DAHN-nykh"},
            "pt": {"text": "Banco de dados", "meaning": "Database", "pron": "BAHN-koo deh DAH-doos"},
            "de": {"text": "Datenbank", "meaning": "Database", "pron": "DAH-tuhn-bahnk"},
            "id": {"text": "Basis data", "meaning": "Database", "pron": "BAH-sees DAH-tah"},
            "tr": {"text": "Veritabanı", "meaning": "Database", "pron": "veh-ree-tah-bah-NEE"}
        }
    },
    {
        "id": "server", "category": "Tech", "level": 3, "icon": "🖥️",
        "translations": {
            "en": {"text": "Server", "meaning": "Server", "pron": "SUR-ver"},
            "es": {"text": "Servidor", "meaning": "Server", "pron": "sehr-bvee-DOHR"},
            "fr": {"text": "Serveur", "meaning": "Server", "pron": "sehr-VUHR"},
            "ru": {"text": "Сервер", "meaning": "Server", "pron": "SYEHR-vyehr"},
            "pt": {"text": "Servidor", "meaning": "Server", "pron": "sehr-vee-DOHR"},
            "de": {"text": "Server", "meaning": "Server", "pron": "ZEHR-vuhr"},
            "id": {"text": "Peladen", "meaning": "Server", "pron": "peh-LAH-dehn"},
            "tr": {"text": "Sunucu", "meaning": "Server", "pron": "soo-noo-ZHOO"}
        }
    },
    {
        "id": "cloud_storage", "category": "Tech", "level": 3, "icon": "☁️",
        "translations": {
            "en": {"text": "Cloud storage", "meaning": "Cloud storage", "pron": "klowd STOR-ij"},
            "es": {"text": "Almacenamiento en la nube", "meaning": "Cloud storage", "pron": "ahl-mah-seh-nah-MYEHN-toh ehn lah NOO-bveh"},
            "fr": {"text": "Stockage dans le cloud", "meaning": "Cloud storage", "pron": "stoh-KAHZH dahn luh klowd"},
            "ru": {"text": "Облачное хранилище", "meaning": "Cloud storage", "pron": "OH-blahch-noh-yeh khrah-NEE-lee-sheh"},
            "pt": {"text": "Armazenamento em nuvem", "meaning": "Cloud storage", "pron": "ahr-mah-zeh-nah-MEHN-too ehn NOO-vehyn"},
            "de": {"text": "Cloud-Speicher", "meaning": "Cloud storage", "pron": "KLOWD-shpy-kher"},
            "id": {"text": "Penyimpanan awan", "meaning": "Cloud storage", "pron": "peh-nyeem-PAH-nahn AH-wahn"},
            "tr": {"text": "Bulut depolama", "meaning": "Cloud storage", "pron": "boo-LOOT deh-poh-lah-mah"}
        }
    },
    {
        "id": "artificial_intelligence", "category": "Tech", "level": 3, "icon": "🤖",
        "translations": {
            "en": {"text": "Artificial intelligence", "meaning": "Artificial Intelligence (AI)", "pron": "ahr-tuh-FISH-uhl in-TEL-i-juhns"},
            "es": {"text": "Inteligencia artificial", "meaning": "Artificial Intelligence (AI)", "pron": "een-teh-lee-HEHN-syah ahr-tee-fee-SYAHL"},
            "fr": {"text": "Intelligence artificielle", "meaning": "Artificial Intelligence (AI)", "pron": "een-teh-lee-ZHAHNS ahr-tee-fee-SYEHL"},
            "ru": {"text": "Искусственный интеллект", "meaning": "Artificial Intelligence (AI)", "pron": "ees-KOOS-stvyen-ny een-teel-LYEKT"},
            "pt": {"text": "Inteligência artificial", "meaning": "Artificial Intelligence (AI)", "pron": "een-teh-lee-ZHEHN-syah ahr-chee-fee-SYAHL"},
            "de": {"text": "Künstliche Intelligenz", "meaning": "Artificial Intelligence (AI)", "pron": "KOONST-likh-uh een-teh-lee-GEHNTS"},
            "id": {"text": "Kecerdasan buatan", "meaning": "Artificial Intelligence (AI)", "pron": "keh-chehr-DAH-sahn boo-AH-tahn"},
            "tr": {"text": "Yapay zekâ", "meaning": "Artificial Intelligence (AI)", "pron": "yah-PY zeh-KAH"}
        }
    },
    {
        "id": "algorithm", "category": "Tech", "level": 3, "icon": "📐",
        "translations": {
            "en": {"text": "Algorithm", "meaning": "Algorithm", "pron": "AL-guh-rith-uhm"},
            "es": {"text": "Algoritmo", "meaning": "Algorithm", "pron": "ahl-goh-REET-moh"},
            "fr": {"text": "Algorithme", "meaning": "Algorithm", "pron": "ahl-goh-REETM"},
            "ru": {"text": "Алгоритм", "meaning": "Algorithm", "pron": "uhl-gah-REETM"},
            "pt": {"text": "Algoritmo", "meaning": "Algorithm", "pron": "ahl-goh-REET-moo"},
            "de": {"text": "Algorithmus", "meaning": "Algorithm", "pron": "ahl-goh-REET-moos"},
            "id": {"text": "Algoritma", "meaning": "Algorithm", "pron": "ahl-goh-REET-mah"},
            "tr": {"text": "Algoritma", "meaning": "Algorithm", "pron": "ahl-goh-REET-mah"}
        }
    },
    {
        "id": "developer", "category": "Tech", "level": 3, "icon": "🧑‍💻",
        "translations": {
            "en": {"text": "Developer", "meaning": "Developer / Programmer", "pron": "di-VEL-uh-per"},
            "es": {"text": "Desarrollador", "meaning": "Developer", "pron": "deh-sah-rroh-yah-DOHR"},
            "fr": {"text": "Développeur", "meaning": "Developer", "pron": "day-veh-loh-PUHR"},
            "ru": {"text": "Разработчик", "meaning": "Developer", "pron": "rahz-rah-BOHT-cheek"},
            "pt": {"text": "Desenvolvedor", "meaning": "Developer", "pron": "deh-zehn-vohl-veh-DOHR"},
            "de": {"text": "Entwickler", "meaning": "Developer", "pron": "ehnt-VEECK-luhr"},
            "id": {"text": "Pengembang", "meaning": "Developer", "pron": "pehng-ehm-BAHNG"},
            "tr": {"text": "Geliştirici", "meaning": "Developer", "pron": "geh-leesh-tee-ree-JEE"}
        }
    },
    {
        "id": "cybersecurity", "category": "Tech", "level": 3, "icon": "🛡️",
        "translations": {
            "en": {"text": "Cybersecurity", "meaning": "Cybersecurity", "pron": "SY-ber-se-kyoor-i-tee"},
            "es": {"text": "Ciberseguridad", "meaning": "Cybersecurity", "pron": "see-bvehr-seh-goo-ree-DAHD"},
            "fr": {"text": "Cybersécurité", "meaning": "Cybersecurity", "pron": "see-behr-say-koo-ree-TAY"},
            "ru": {"text": "Кибербезопасность", "meaning": "Cybersecurity", "pron": "kee-byehr-bye-zah-PAHS-nahst"},
            "pt": {"text": "Cibersegurança", "meaning": "Cybersecurity", "pron": "see-behr-seh-goo-RAHN-sah"},
            "de": {"text": "Cybersicherheit", "meaning": "Cybersecurity", "pron": "TSY-buhr-zee-kher-hyt"},
            "id": {"text": "Keamanan siber", "meaning": "Cybersecurity", "pron": "keh-ah-MAH-nahn SEE-behr"},
            "tr": {"text": "Siber güvenlik", "meaning": "Cybersecurity", "pron": "see-BEHR gyoo-vehn-LEEK"}
        }
    },
    {
        "id": "operating_system", "category": "Tech", "level": 3, "icon": "⚙️",
        "translations": {
            "en": {"text": "Operating system", "meaning": "Operating system", "pron": "OP-uh-ray-ting SIS-tuhm"},
            "es": {"text": "Sistema operativo", "meaning": "Operating system", "pron": "sees-TEH-mah oh-peh-rah-TEE-bvoh"},
            "fr": {"text": "Système d'exploitation", "meaning": "Operating system", "pron": "sees-TEHM dehk-splwah-tah-SYOHN"},
            "ru": {"text": "Операционная система", "meaning": "Operating system", "pron": "uh-pye-rah-tsee-OHN-nah-yah sees-TYEH-mah"},
            "pt": {"text": "Sistema operacional", "meaning": "Operating system", "pron": "sees-TEH-mah oh-peh-rah-syoh-NAHL"},
            "de": {"text": "Betriebssystem", "meaning": "Operating system", "pron": "buh-TREEPS-zoos-taym"},
            "id": {"text": "Sistem operasi", "meaning": "Operating system", "pron": "SEES-tehm oh-peh-RAH-see"},
            "tr": {"text": "İşletim sistemi", "meaning": "Operating system", "pron": "eesh-leh-TEEM sees-teh-MEE"}
        }
    },
    {
        "id": "budget", "category": "Business", "level": 3, "icon": "💰",
        "translations": {
            "en": {"text": "Budget", "meaning": "Budget / Financial plan", "pron": "BUHJ-it"},
            "es": {"text": "Presupuesto", "meaning": "Budget", "pron": "preh-soo-PWEHS-toh"},
            "fr": {"text": "Budget", "meaning": "Budget", "pron": "bood-ZHAY"},
            "ru": {"text": "Бюджет", "meaning": "Budget", "pron": "byood-ZHEHT"},
            "pt": {"text": "Orçamento", "meaning": "Budget", "pron": "ohr-sah-MEHN-too"},
            "de": {"text": "Budget", "meaning": "Budget", "pron": "bood-ZHAY"},
            "id": {"text": "Anggaran", "meaning": "Budget", "pron": "ahng-GAH-rahn"},
            "tr": {"text": "Bütçe", "meaning": "Budget", "pron": "byoot-CHEH"}
        }
    },
    {
        "id": "investment", "category": "Business", "level": 3, "icon": "📈",
        "translations": {
            "en": {"text": "Investment", "meaning": "Investment / Capital", "pron": "in-VEST-muhnt"},
            "es": {"text": "Inversión", "meaning": "Investment", "pron": "een-bvehr-SYOHN"},
            "fr": {"text": "Investissement", "meaning": "Investment", "pron": "een-vehs-tees-MAHN"},
            "ru": {"text": "Инвестиции", "meaning": "Investment", "pron": "een-vye-STEE-tsee-ee"},
            "pt": {"text": "Investimento", "meaning": "Investment", "pron": "een-vehs-chee-MEHN-too"},
            "de": {"text": "Investition", "meaning": "Investment", "pron": "een-vehs-tee-TSYOHN"},
            "id": {"text": "Investasi", "meaning": "Investment", "pron": "een-vehs-TAH-see"},
            "tr": {"text": "Yatırım", "meaning": "Investment", "pron": "yah-tee-REEM"}
        }
    },
    {
        "id": "revenue", "category": "Business", "level": 3, "icon": "💵",
        "translations": {
            "en": {"text": "Revenue", "meaning": "Revenue / Turnover", "pron": "REV-uh-noo"},
            "es": {"text": "Ingresos", "meaning": "Revenue / Income", "pron": "een-GREH-sohs"},
            "fr": {"text": "Revenus", "meaning": "Revenue / Income", "pron": "ruh-vuh-NOO"},
            "ru": {"text": "Выручка", "meaning": "Revenue", "pron": "VY-rooch-kah"},
            "pt": {"text": "Receita", "meaning": "Revenue", "pron": "heh-SAY-tah"},
            "de": {"text": "Umsatz", "meaning": "Revenue / Turnover", "pron": "OOM-zahts"},
            "id": {"text": "Pendapatan", "meaning": "Revenue", "pron": "pehn-dah-PAH-tahn"},
            "tr": {"text": "Gelir", "meaning": "Revenue / Income", "pron": "geh-LEER"}
        }
    },
    {
        "id": "startup", "category": "Business", "level": 3, "icon": "🚀",
        "translations": {
            "en": {"text": "Startup", "meaning": "Startup company", "pron": "STAHRT-up"},
            "es": {"text": "Empresa emergente", "meaning": "Startup", "pron": "ehm-PREH-sah eh-mehr-HEHN-teh"},
            "fr": {"text": "Jeune pousse", "meaning": "Startup", "pron": "zhuhn poos"},
            "ru": {"text": "Стартап", "meaning": "Startup", "pron": "stahr-TAHP"},
            "pt": {"text": "Startup", "meaning": "Startup", "pron": "STAHR-tup"},
            "de": {"text": "Startup", "meaning": "Startup", "pron": "STAHRT-up"},
            "id": {"text": "Startup", "meaning": "Startup", "pron": "STAHRT-up"},
            "tr": {"text": "Yeni girişim", "meaning": "Startup", "pron": "yeh-NEE gee-ree-SHEEM"}
        }
    },
    {
        "id": "remote_work", "category": "Business", "level": 3, "icon": "🏠",
        "translations": {
            "en": {"text": "Remote work", "meaning": "Remote work / Telecommuting", "pron": "ri-MOHT wurk"},
            "es": {"text": "Teletrabajo", "meaning": "Remote work", "pron": "teh-leh-trah-BAH-hoh"},
            "fr": {"text": "Télétravail", "meaning": "Remote work", "pron": "tay-lay-trah-VYE"},
            "ru": {"text": "Удалённая работа", "meaning": "Remote work", "pron": "oo-dah-LYOHN-nah-yah rah-BOH-tah"},
            "pt": {"text": "Trabalho remoto", "meaning": "Remote work", "pron": "trah-BAH-lyoo heh-MOH-too"},
            "de": {"text": "Fernarbeit", "meaning": "Remote work / Homeoffice", "pron": "FEHRN-ahr-byt"},
            "id": {"text": "Kerja jarak jauh", "meaning": "Remote work", "pron": "KEHR-jah JAH-rahk JAH-ooh"},
            "tr": {"text": "Uzaktan çalışma", "meaning": "Remote work", "pron": "oo-zahk-TAHN chah-lesh-MAH"}
        }
    }
]

# File path mapping
LANG_FILES = {
    "en": PROJECT_ROOT / "src" / "data" / "languages" / "en" / "englishData.ts",
    "es": PROJECT_ROOT / "src" / "data" / "languages" / "es" / "spanishData.ts",
    "fr": PROJECT_ROOT / "src" / "data" / "languages" / "fr" / "frenchData.ts",
    "ru": PROJECT_ROOT / "src" / "data" / "languages" / "ru" / "russianData.ts",
    "pt": PROJECT_ROOT / "src" / "data" / "languages" / "pt" / "portugueseData.ts",
    "de": PROJECT_ROOT / "src" / "data" / "languages" / "de" / "germanData.ts",
    "id": PROJECT_ROOT / "src" / "data" / "languages" / "id" / "indonesianData.ts",
    "tr": PROJECT_ROOT / "src" / "data" / "languages" / "tr" / "turkishData.ts",
}

def clean_key(phrase: str) -> str:
    return phrase.lower().strip()

def update_language_file(lang: str):
    file_path = LANG_FILES[lang]
    if not file_path.exists():
        print(f"Error: {file_path} not found!")
        return

    content = file_path.read_text(encoding="utf-8")

    # In russianData.ts, items use russian: '...', english: '...'
    is_ru = (lang == "ru")

    # Extract existing phrases from commonWords
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
        return

    # Find commonWords array and append before its closing bracket
    match = re.search(r"(const commonWords[^=]*=\s*\[)(.*?)(\n\];)", content, re.DOTALL)
    if not match:
        print(f"[{lang.upper()}] Could not locate commonWords array in {file_path}!")
        return

    before_header = match.group(1)
    array_body = match.group(2).rstrip()
    after_bracket = match.group(3)

    if not array_body.endswith(','):
        array_body += ','

    addition = "\n  // Batch 1: Modern Tech, Workplace & Commerce (Levels 1, 2, 3)\n" + "\n".join(new_entries)
    new_content = content[:match.start()] + before_header + array_body + addition + after_bracket + content[match.end():]

    file_path.write_text(new_content, encoding="utf-8")
    print(f"[{lang.upper()}] Added {len(new_entries)} new level-tagged words!")

def main():
    print("=== Expanding Batch 1 Vocabulary across 8 Languages ===")
    for lang in LANG_FILES:
        update_language_file(lang)
    print("=== Vocabulary Expansion Complete! ===")

if __name__ == "__main__":
    main()
