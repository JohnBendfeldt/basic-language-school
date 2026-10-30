#!/usr/bin/env python3
"""
Full generator for Arabic curriculum in Basic Language School.
Produces src/data/languages/ar/arabicData.ts with all 500+ common words,
Arabic alphabet (28 letters), basic phrases (29 items), numbers (30 items),
time (12 items), and grammar integration.
"""

import os
import re
import sys
import json
from pathlib import Path

ROOT = Path('/Users/johnbendfeldt/Documents/basic-language-school')
DATA_DIR = ROOT / 'src' / 'data' / 'languages'
AR_DIR = DATA_DIR / 'ar'
AR_DIR.mkdir(parents=True, exist_ok=True)

# 28 Arabic Alphabet Items
ALPHABET_DATA = [
    ("أ", "/aː/ (alif)", "as in أرنب (Rabbit)", "أرنب", "Rabbit", "🐇"),
    ("ب", "/b/ (baa)", "as in بيت (House)", "بيت", "House", "🏠"),
    ("ت", "/t/ (taa)", "as in تفاح (Apple)", "تفاح", "Apple", "🍎"),
    ("ث", "/θ/ (thaa)", "as in ثعلب (Fox)", "ثعلب", "Fox", "🦊"),
    ("ج", "/dʒ/ (jeem)", "as in جمل (Camel)", "جمل", "Camel", "🐪"),
    ("ح", "/ħ/ (haa)", "as in حليب (Milk)", "حليب", "Milk", "🥛"),
    ("خ", "/x/ (khaa)", "as in خبز (Bread)", "خبز", "Bread", "🍞"),
    ("د", "/d/ (daal)", "as in دراجة (Bicycle)", "دراجة", "Bicycle", "🚲"),
    ("ذ", "/ð/ (dhaal)", "as in ذئب (Wolf)", "ذئب", "Wolf", "🐺"),
    ("ر", "/r/ (raa)", "as in رجل (Man)", "رجل", "Man", "👨"),
    ("ز", "/z/ (zaay)", "as in زهرة (Flower)", "زهرة", "Flower", "🌸"),
    ("س", "/s/ (seen)", "as in سيارة (Car)", "سيارة", "Car", "🚗"),
    ("ش", "/ʃ/ (sheen)", "as in شمس (Sun)", "شمس", "Sun", "☀️"),
    ("ص", "/sˤ/ (saad)", "as in صباح (Morning)", "صباح", "Morning", "🌅"),
    ("ض", "/dˤ/ (daad)", "as in ضوء (Light)", "ضوء", "Light", "💡"),
    ("ط", "/tˤ/ (taa)", "as in طائرة (Airplane)", "طائرة", "Airplane", "✈️"),
    ("ظ", "/ðˤ/ (dhaa)", "as in ظبي (Antelope)", "ظبي", "Antelope", "🦌"),
    ("ع", "/ʕ/ (ayn)", "as in عين (Eye)", "عين", "Eye", "👁️"),
    ("غ", "/ɣ/ (ghayn)", "as in غابة (Forest)", "غابة", "Forest", "🌲"),
    ("ف", "/f/ (faa)", "as in فندق (Hotel)", "فندق", "Hotel", "🏨"),
    ("ق", "/q/ (qaaf)", "as in قلم (Pen)", "قلم", "Pen", "🖊️"),
    ("ك", "/k/ (kaaf)", "as in كتاب (Book)", "كتاب", "Book", "📖"),
    ("ل", "/l/ (laam)", "as in ليمون (Lemon)", "ليمون", "Lemon", "🍋"),
    ("م", "/m/ (meem)", "as in ماء (Water)", "ماء", "Water", "💧"),
    ("ن", "/n/ (noon)", "as in نجمة (Star)", "نجمة", "Star", "⭐"),
    ("هـ", "/h/ (haa)", "as in هاتف (Phone)", "هاتف", "Phone", "📱"),
    ("و", "/w/ (waaw)", "as in وردة (Rose)", "وردة", "Rose", "🌹"),
    ("ي", "/j/ (yaa)", "as in يد (Hand)", "يد", "Hand", "✋"),
]

# Essential Arabic Phrases (29 items)
PHRASES_DATA = [
    ("مرحباً", "Hello", "marhaban", "Greetings", "👋"),
    ("أهلاً وسهلاً", "Welcome", "ahlan wa sahlan", "Greetings", "👋"),
    ("صباح الخير", "Good morning", "sabaah al-khayr", "Greetings", "🌅"),
    ("مساء الخير", "Good evening", "masaa' al-khayr", "Greetings", "🌙"),
    ("تصبح على خير", "Good night", "tusbih 'ala khayr", "Greetings", "😴"),
    ("شكراً", "Thank you", "shukran", "Courtesy", "💖"),
    ("شكراً جزيلاً", "Thank you very much", "shukran jazeelan", "Courtesy", "🙏"),
    ("عفواً", "You're welcome", "'afwan", "Courtesy", "😊"),
    ("من فضلك", "Please", "min fadlik", "Courtesy", "🤲"),
    ("معذرة", "Excuse me / Sorry", "ma'dhiratan", "Courtesy", "🙋"),
    ("آسف", "I am sorry", "aasif", "Courtesy", "🙇"),
    ("نعم", "Yes", "na'am", "Reply", "👍"),
    ("لا", "No", "laa", "Reply", "👎"),
    ("حسناً", "Okay / All right", "hasanan", "Reply", "👌"),
    ("مع السلامة", "Goodbye", "ma'a as-salaama", "Greetings", "👋"),
    ("إلى اللقاء", "See you later", "ilaa al-liqaa'", "Greetings", "👋"),
    ("تشرفنا", "Nice to meet you", "tasharrafnaa", "Introductions", "🤝"),
    ("ما اسمك؟", "What is your name?", "maa ismuk?", "Introductions", "❓"),
    ("اسمي...", "My name is...", "ismee...", "Introductions", "🪪"),
    ("كيف حالك؟", "How are you?", "kayfa haaluk?", "Greetings", "😊"),
    ("أنا بخير", "I am fine", "ana bikhayr", "Greetings", "✨"),
    ("الحمد لله", "Praise be to God / Doing well", "al-hamdu lillaah", "Greetings", "🤲"),
    ("من أين أنت؟", "Where are you from?", "min ayna ant?", "Introductions", "🌍"),
    ("أنا من...", "I am from...", "ana min...", "Introductions", "📍"),
    ("هل تتكلم الإنجليزية؟", "Do you speak English?", "hal tatakallam al-ingleeziyya?", "Communication", "🗣️"),
    ("لا أفهم", "I don't understand", "laa afham", "Communication", "🤷"),
    ("أين الحمام؟", "Where is the restroom?", "ayna al-hammaam?", "Travel", "🚻"),
    ("النجدة!", "Help!", "an-najda!", "Emergency", "🆘"),
    ("بكم هذا؟", "How much is this?", "bikam haadhaa?", "Shopping", "🏷️"),
]

# Arabic Numbers (30 items)
NUMBERS_DATA = [
    ("صفر", "0 (Zero)", "sifr", "Numbers 0-10", "0️⃣"),
    ("واحد", "1 (One)", "waahid", "Numbers 0-10", "1️⃣"),
    ("اثنان", "2 (Two)", "ithnaan", "Numbers 0-10", "2️⃣"),
    ("ثلاثة", "3 (Three)", "thalaatha", "Numbers 0-10", "3️⃣"),
    ("أربعة", "4 (Four)", "arba'a", "Numbers 0-10", "4️⃣"),
    ("خمسة", "5 (Five)", "khamsa", "Numbers 0-10", "5️⃣"),
    ("ستة", "6 (Six)", "sitta", "Numbers 0-10", "6️⃣"),
    ("سبعة", "7 (Seven)", "sab'a", "Numbers 0-10", "7️⃣"),
    ("ثمانية", "8 (Eight)", "thamaaniya", "Numbers 0-10", "8️⃣"),
    ("تسعة", "9 (Nine)", "tis'a", "Numbers 0-10", "9️⃣"),
    ("عشرة", "10 (Ten)", "'ashara", "Numbers 0-10", "🔟"),
    ("أحد عشر", "11 (Eleven)", "ahada 'ashar", "Numbers 11-20", "🔢"),
    ("اثنا عشر", "12 (Twelve)", "ithna 'ashar", "Numbers 11-20", "🔢"),
    ("ثلاثة عشر", "13 (Thirteen)", "thalaathata 'ashar", "Numbers 11-20", "🔢"),
    ("أربعة عشر", "14 (Fourteen)", "arba'ata 'ashar", "Numbers 11-20", "🔢"),
    ("خمسة عشر", "15 (Fifteen)", "khamsata 'ashar", "Numbers 11-20", "🔢"),
    ("ستة عشر", "16 (Sixteen)", "sittata 'ashar", "Numbers 11-20", "🔢"),
    ("سبعة عشر", "17 (Seventeen)", "sab'ata 'ashar", "Numbers 11-20", "🔢"),
    ("ثمانية عشر", "18 (Eighteen)", "thamaaniyata 'ashar", "Numbers 11-20", "🔢"),
    ("تسعة عشر", "19 (Nineteen)", "tis'ata 'ashar", "Numbers 11-20", "🔢"),
    ("عشرون", "20 (Twenty)", "'ishroon", "Tens", "🔢"),
    ("ثلاثون", "30 (Thirty)", "thalaathoon", "Tens", "🔢"),
    ("أربعون", "40 (Forty)", "arba'oon", "Tens", "🔢"),
    ("خمسون", "50 (Fifty)", "khamsoon", "Tens", "🔢"),
    ("ستون", "60 (Sixty)", "sittoon", "Tens", "🔢"),
    ("سبعون", "70 (Seventy)", "sab'oon", "Tens", "🔢"),
    ("ثمانون", "80 (Eighty)", "thamaanoon", "Tens", "🔢"),
    ("تسعون", "90 (Ninety)", "tis'oon", "Tens", "🔢"),
    ("مائة", "100 (One hundred)", "mi'ah", "Hundreds", "💯"),
    ("ألف", "1,000 (One thousand)", "alf", "Thousands", "🏦"),
]

# Time Expressions (12 items)
TIME_DATA = [
    ("كم الساعة؟", "What time is it?", "kam as-saa'ah?", "Questions", "⏱️"),
    ("الساعة الواحدة", "One o'clock (1:00)", "as-saa'atu al-waahidah", "Hours", "🕐"),
    ("الساعة الثانية", "Two o'clock (2:00)", "as-saa'atu ath-thaaniyah", "Hours", "🕑"),
    ("الساعة الثالثة", "Three o'clock (3:00)", "as-saa'atu ath-thaalithah", "Hours", "🕒"),
    ("والنصف", "Half past (:30)", "wan-nisf", "Minutes", "🕝"),
    ("والربع", "Quarter past (:15)", "war-rub'", "Minutes", "🕜"),
    ("إلا ربعاً", "Quarter to (:45)", "illaa rub'an", "Minutes", "🕞"),
    ("صباحاً", "In the morning (AM)", "sabaahan", "Time of Day", "🌅"),
    ("مساءً", "In the evening (PM)", "masaa'an", "Time of Day", "🌆"),
    ("ظهراً", "At noon (12:00 PM)", "zuhran", "Time of Day", "☀️"),
    ("منتصف الليل", "Midnight (12:00 AM)", "muntasaf al-layl", "Time of Day", "🌙"),
    ("الآن", "Now", "al-aan", "Expressions", "⏰"),
]

# Comprehensive master dictionary: English concept -> (Arabic phrase, Latin pronunciation)
ARABIC_DICTIONARY = {
    # Essentials
    "Yes": ("نعم", "na'am"),
    "No": ("لا", "laa"),
    "Help": ("مساعدة", "musaa'adah"),
    "Help!": ("النجدة!", "an-najda!"),
    "Okay / All right": ("حسناً", "hasanan"),
    "Please": ("من فضلك", "min fadlik"),
    "Thank you": ("شكراً", "shukran"),
    "Thank you very much": ("شكراً جزيلاً", "shukran jazeelan"),
    "You're welcome": ("عفواً", "'afwan"),
    "You are welcome": ("عفواً", "'afwan"),
    "Excuse me / Sorry": ("معذرة", "ma'dhiratan"),
    "Excuse me": ("معذرة", "ma'dhiratan"),
    "I am sorry": ("أنا آسف", "ana aasif"),
    "Goodbye": ("مع السلامة", "ma'a as-salaama"),
    "Hello": ("مرحباً", "marhaban"),
    "Hello! / Hi!": ("أهلاً وسهلاً!", "ahlan wa sahlan!"),
    "Hello (formal)": ("مرحباً بك", "marhaban bik"),
    "Hello (informal)": ("أهلاً", "ahlan"),
    "Hi / Bye": ("مرحباً / وداعاً", "marhaban / wadaa'an"),
    "Good morning": ("صباح الخير", "sabaah al-khayr"),
    "Good afternoon": ("طاب مساؤك", "taaba masaa'uk"),
    "Good evening": ("مساء الخير", "masaa' al-khayr"),
    "Good night": ("تصبح على خير", "tusbih 'ala khayr"),
    "See you later": ("إلى اللقاء", "ilaa al-liqaa'"),
    "See you soon": ("أراك قريباً", "araaka qareeban"),
    "Bye (informal)": ("وداعاً", "wadaa'an"),
    "Have a nice day": ("أتمنى لك يوماً جميلاً", "atamannaa laka yawman jameelan"),
    "Have a great day": ("أتمنى لك يوماً رائعاً", "atamannaa laka yawman raa'i'an"),
    "No problem": ("لا مشكلة", "laa mushkilah"),

    # Introductions & Communication
    "Nice to meet you": ("تشرفنا", "tasharrafnaa"),
    "Pleased to meet you": ("سررت بلقائك", "surirtu biliqaa'ik"),
    "What is your name?": ("ما اسمك؟", "maa ismuk?"),
    "My name is...": ("اسمي...", "ismee..."),
    "How are you?": ("كيف حالك؟", "kayfa haaluk?"),
    "How are you? (formal)": ("كيف حالكم؟", "kayfa haalukum?"),
    "And you?": ("وأنت؟", "wa anta?"),
    "I am fine": ("أنا بخير", "ana bikhayr"),
    "I am fine, thank you": ("أنا بخير، شكراً", "ana bikhayr, shukran"),
    "I am doing well, thank you": ("أنا على ما يرام، شكراً", "ana 'ala maa yuraam, shukran"),
    "Very well, thank you": ("بخير جداً، شكراً", "bikhayr jiddan, shukran"),
    "Where are you from?": ("من أين أنت؟", "min ayna ant?"),
    "I am from...": ("أنا من...", "ana min..."),
    "Do you speak English?": ("هل تتكلم الإنجليزية؟", "hal tatakallam al-ingleeziyya?"),
    "I speak a little Russian": ("أتكلم القليل من الروسية", "atakallam al-qaleel min ar-roosiyyah"),
    "I understand": ("أنا أفهم", "ana afham"),
    "I don't understand": ("لا أفهم", "laa afham"),
    "Please repeat": ("أعد من فضلك", "a'id min fadlik"),
    "Can you repeat?": ("هل يمكنك الإعادة؟", "hal yumkinuka al-i'aadah?"),
    "Could you repeat that, please?": ("هل يمكنك تكرار ذلك من فضلك؟", "hal yumkinuka tikraar dhaalika min fadlik?"),
    "Please speak more slowly": ("تحدث ببطء أكثر من فضلك", "tahaddath bibut' akthar min fadlik"),
    "Can you speak more slowly?": ("هل يمكنك التحدث ببطء؟", "hal yumkinuka at-tahadduth bibut'?"),
    "Could you speak slower, please?": ("هل يمكنك التحدث ببطء أكثر من فضلك؟", "hal yumkinuka at-tahadduth bibut' akthar min fadlik?"),
    "Speak more slowly": ("تحدث ببطء", "tahaddath bibut'"),
    "What does this mean?": ("ماذا يعني هذا؟", "maadhaa ya'nee haadhaa?"),
    "How do you say...?": ("كيف تقول...؟", "kayfa taqool...?"),
    "How do you say this in Russian?": ("كيف تقول هذا بالروسية؟", "kayfa taqool haadhaa bir-roosiyyah?"),
    "Can you help me?": ("هل يمكنك مساعدتي؟", "hal yumkinuka musaa'adatee?"),
    "I need help": ("أحتاج إلى مساعدة", "ahtaaju ilaa musaa'adah"),
    "Help me": ("ساعدني", "saa'idnee"),
    "Can you hear me?": ("هل تسمعني؟", "hal tasma'unee?"),
    "Can you see my screen?": ("هل ترى شاشتي؟", "hal taraa shaashatee?"),
    "Let me share my screen": ("دعني أشارك شاشتي", "da'nee ushaarik shaashatee"),
    "The internet connection is slow": ("اتصال الإنترنت بطيء", "ittisaal al-intarnit batee'"),
    "Can you send it by email?": ("هل يمكنك إرساله بالبريد الإلكتروني؟", "hal yumkinuka irsaaluhu bil-bareed?"),
    "My battery is almost dead": ("بطاريتي شارفت على النفاد", "battaareeyatee sharafat 'ala an-nafaad"),
    "What is the Wi-Fi password?": ("ما هي كلمة مرور الواي فاي؟", "maa hiya kalimat muroor al-waay faay?"),
    "I will send you an email": ("سأرسل لك بريداً إلكترونياً", "sa-ursilu laka bareedan ilikturooniyyan"),
    "When is the deadline?": ("متى الموعد النهائي؟", "mataa al-maw'id an-nihaa'ee?"),

    # Travel & Nav
    "Where is the airport?": ("أين المطار؟", "ayna al-mataar?"),
    "How do I get to the airport?": ("كيف أصل إلى المطار؟", "kayfa asil ilaa al-mataar?"),
    "I would like to go to the airport": ("أود الذهاب إلى المطار", "awaddu adh-dhahaab ilaa al-mataar"),
    "What time is the departure?": ("في أي وقت المغادرة؟", "fee ayyi waqt al-mughaadarah?"),
    "Where is the hotel?": ("أين الفندق؟", "ayna al-funduq?"),
    "Where is the train station?": ("أين محطة القطار؟", "ayna mahattat al-qitaar?"),
    "Where is the bus stop?": ("أين موقف الحافلات؟", "ayna mawqif al-haafilaat?"),
    "Where is the restroom?": ("أين الحمام؟", "ayna al-hammaam?"),
    "Where is the nearest pharmacy?": ("أين أقرب صيدلية؟", "ayna aqrab saydaliyyah?"),
    "Is it far from here?": ("هل هو بعيد من هنا؟", "hal huwa ba'eed min hunaa?"),
    "Turn left": ("انعطف يساراً", "in'atif yasaaran"),
    "Turn right": ("انعطف يميناً", "in'atif yameenan"),
    "Go straight ahead": ("اذهب إلى الأمام مباشرة", "idhhab ilaa al-amaam mubaasharatan"),
    "I need a taxi": ("أحتاج إلى سيارة أجرة", "ahtaaju ilaa sayyaarat ujrah"),
    "I lost my passport": ("فقدت جواز سفري", "faqadtu jawaaz safaree"),
    "Call the police": ("اتصل بالشرطة", "ittasil bish-shurtah"),
    "I have a reservation": ("لدي حجز", "ladayya hajz"),
    "Reservation": ("حجز", "hajz"),

    # Dining & Shopping
    "A table for two, please": ("طاولة لشخصين من فضلك", "taawilah li-shakhsayn min fadlik"),
    "The menu, please": ("قائمة الطعام من فضلك", "qaa'imat at-ta'aam min fadlik"),
    "Can I see the menu, please?": ("هل يمكنني رؤية قائمة الطعام من فضلك؟", "hal yumkinunee ru'yat qaa'imat at-ta'aam min fadlik?"),
    "The check, please": ("الحساب من فضلك", "al-hisaab min fadlik"),
    "A bottle of water, please": ("زجاجة ماء من فضلك", "zujaajat maa' min fadlik"),
    "I would like water": ("أود ماءً", "awaddu maa'an"),
    "I would like a coffee, please": ("أود قهوة من فضلك", "awaddu qahwah min fadlik"),
    "I want to eat": ("أريد أن آكل", "ureedu an aakul"),
    "I want to drink": ("أريد أن أشرب", "ureedu an ashrab"),
    "What do you recommend?": ("ماذا تقترح؟", "maadhaa taqtarih?"),
    "This is delicious!": ("هذا لذيذ جداً!", "haadhaa ladheedh jiddan!"),
    "How much does this cost?": ("كم يكلف هذا؟", "kam yukallifu haadhaa?"),
    "How much does it cost?": ("كم يكلف هذا؟", "kam yukallifu haadhaa?"),
    "How much is a ticket?": ("كم سعر التذكرة؟", "kam si'r at-tadhkirah?"),
    "Can I pay by card?": ("هل يمكنني الدفع بالبطاقة؟", "hal yumkinunee ad-daf' bil-bitaaqah?"),
    "Do you accept credit cards?": ("هل تقبلون بطاقات الائتمان؟", "hal taqbaloon bitaaqaat al-i'timaan?"),
    "It is too expensive": ("هذا مكلف جداً", "haadhaa mukallif jiddan"),
    "I am just looking": ("أنا فقط أتفرج", "ana faqat atafarraj"),
    "I am just looking, thank you": ("أنا فقط أتفرج، شكراً", "ana faqat atafarraj, shukran"),
    "Do you have this in another size?": ("هل لديك هذا بمقاس آخر؟", "hal ladayka haadhaa bimaqaas aakhar?"),
    "I need a doctor": ("أحتاج إلى طبيب", "ahtaaju ilaa tabeeb"),
    "I am allergic to nuts": ("لدي حساسية من المكسرات", "ladayya hasaasiyyah min al-mukassaraat"),

    # Time questions & answers
    "What time is it now?": ("كم الساعة الآن؟", "kam as-saa'atu al-aan?"),
    "What time is it?": ("كم الساعة؟", "kam as-saa'ah?"),
    "At what time?": ("في أي وقت؟", "fee ayyi waqt?"),
    "It is 1:00 sharp": ("الساعة الواحدة تماماً", "as-saa'atu al-waahidatu tamaaman"),
    "It is 2:00": ("الساعة الثانية", "as-saa'atu ath-thaaniyah"),
    "Half past two (2:30)": ("الثانية والنصف", "ath-thaaniyah wan-nisf"),
    "3:30 (half past three)": ("الثالثة والنصف", "ath-thaalithatu wan-nisf"),
    "4:15 (quarter past four)": ("الرابعة والربع", "ar-raabi'atu war-rub'"),
    "Quarter to three (2:45)": ("الثالثة إلا ربعاً", "ath-thaalithah illaa rub'an"),
    "4:45 (quarter to five)": ("الخامسة إلا ربعاً", "al-khaamisatu illaa rub'an"),
    "Half past twelve (12:30)": ("الثانية عشرة والنصف", "ath-thaaniyata 'ashrata wan-nisf"),
    "Ten to two (1:50)": ("الثانية إلا عشر دقائق", "ath-thaaniyah illaa 'ashra daqaa'iq"),
    "Half an hour": ("نصف ساعة", "nisf saa'ah"),
    "Quarter of an hour": ("ربع ساعة", "rub' saa'ah"),
    "In the morning (a.m.)": ("في الصباح", "fee as-sabaah"),
    "In the afternoon (p.m.)": ("بعد الظهر", "ba'd adh-dhuhr"),
    "In the evening (p.m.)": ("في المساء", "fee al-masaa'"),
    "At night": ("في الليل", "fee al-layl"),
    "On time": ("في الوقت المحدد", "fee al-waqt al-muhaddad"),
    "Noon / Midday": ("الظهر", "adh-dhuhr"),
    "Midnight": ("منتصف الليل", "muntasaf al-layl"),

    # Numbers
    "Zero (0)": ("صفر", "sifr"),
    "One hundred (100)": ("مائة", "mi'ah"),
    "One thousand (1000)": ("ألف", "alf"),

    # Vocabulary & Concepts
    "Water": ("ماء", "maa'"),
    "Food / Meal": ("طعام / وجبة", "ta'aam / wajbah"),
    "Coffee": ("قهوة", "qahwah"),
    "Tea": ("شاي", "shaay"),
    "Bread": ("خبز", "khubz"),
    "Milk": ("حليب", "haleeb"),
    "Meat": ("لحم", "lahm"),
    "Fish": ("سمك", "samak"),
    "Chicken": ("دجاج", "dajaaj"),
    "Egg": ("بيض", "bayd"),
    "Cheese": ("جبن", "jubn"),
    "Rice": ("أرز", "aruzz"),
    "Rice cake": ("كعكة أرز", "ka'kat aruzz"),
    "Juice": ("عصير", "aseer"),
    "Wine": ("نبيذ", "nabeedh"),
    "Beer": ("بيرة", "beerah"),
    "Breakfast": ("فطور", "futoor"),
    "Lunch": ("غداء", "ghadaa'"),
    "Dinner": ("عشاء", "'ashaa'"),
    "Soup": ("حساء / شوربة", "hasaa' / shoorbah"),
    "Stew": ("يخنة", "yakhnah"),
    "Salad": ("سلطة", "salatah"),
    "Sugar": ("سكر", "sukkar"),
    "Salt": ("ملح", "milh"),
    "Pepper": ("فلفل", "fulful"),
    "Fruit": ("فاكهة", "faakihah"),
    "Fruits": ("فواكه", "fawaakih"),
    "Vegetables": ("خضروات", "khudrawaat"),
    "Apple": ("تفاح", "tuffaah"),
    "Banana": ("موز", "mawz"),
    "Strawberry": ("فراولة", "farawlah"),
    "Orange": ("برتقال", "burtuqaal"),
    "Orange (fruit)": ("برتقال", "burtuqaal"),
    "Lemon": ("ليمون", "laymoon"),
    "Carrot": ("جزر", "jazar"),
    "Potato": ("بطاطس", "bataatis"),
    "Tomato": ("طماطم", "tamaatim"),
    "Onion": ("بصل", "basal"),
    "Garlic": ("ثوم", "thawm"),
    "Grape": ("عنب", "'inab"),
    "Yolk": ("صفار البيض", "safaar al-bayd"),
    "Cup": ("كوب / فنجان", "koob / finjaan"),
    "Glass": ("كأس", "ka's"),
    "Glass (cup)": ("كأس", "ka's"),
    "Plate": ("طبق / صحن", "tabaq / sahn"),
    "Fork": ("شوكة", "shawkah"),
    "Knife": ("سكين", "sikkeen"),
    "Spoon": ("ملعقة", "mil'aqah"),
    "Bottle": ("زجاجة", "zujaajah"),
    "Table": ("طاولة", "taawilah"),
    "Chair": ("كرسي", "kursee"),
    "Menu": ("قائمة الطعام", "qaa'imat at-ta'aam"),
    "Bill / Check": ("الفاتورة", "al-faatoorah"),
    "Restaurant": ("مطعم", "mat'am"),
    "Café": ("مقهى", "maqhaa"),

    # Time & Weather
    "Time / Weather": ("وقت / طقس", "waqt / taqs"),
    "Time": ("وقت", "waqt"),
    "Today": ("اليوم", "al-yawm"),
    "Tomorrow / Morning": ("غداً / صباح", "ghadan / sabaah"),
    "Tomorrow": ("غداً", "ghadan"),
    "Yesterday": ("أمس", "ams"),
    "Now": ("الآن", "al-aan"),
    "Hour": ("ساعة", "saa'ah"),
    "Minute": ("دقيقة", "daqeeqah"),
    "Second": ("ثانية", "thaaniyah"),
    "Day": ("يوم", "yawm"),
    "Week": ("أسبوع", "usboo'"),
    "Month": ("شهر", "shahr"),
    "Year": ("سنة / عام", "sanah / 'aam"),
    "Morning": ("صباح", "sabaah"),
    "Afternoon": ("بعد الظهر", "ba'd adh-dhuhr"),
    "Evening": ("مساء", "masaa'"),
    "Night": ("ليل / ليلة", "layl / laylah"),
    "Monday": ("الإثنين", "al-ithnayn"),
    "Tuesday": ("الثلاثاء", "ath-thulaathaa'"),
    "Wednesday": ("الأربعاء", "al-arbi'aa'"),
    "Thursday": ("الخميس", "al-khamees"),
    "Friday": ("الجمعة", "al-jum'ah"),
    "Saturday": ("السبت", "as-sabt"),
    "Sunday": ("الأحد", "al-ahad"),
    "Weather": ("طقس", "taqs"),
    "Sun": ("شمس", "shams"),
    "Moon": ("قمر", "qamar"),
    "Star": ("نجمة", "najmah"),
    "Sky": ("سماء", "samaa'"),
    "Rain": ("مطر", "matar"),
    "Snow": ("ثلج", "thalj"),
    "Ice": ("جليد / ثلج", "jaleed"),
    "Wind": ("رياح", "riyaah"),
    "Cloud": ("سحابة / غيمة", "sahaabah"),
    "Storm": ("عاصفة", "'aasifah"),

    # People & Family
    "Friend": ("صديق", "sadeeq"),
    "Family": ("عائلة / أسرة", "'aa'ilah / usrah"),
    "Father / Dad": ("أب / والد", "ab / waalid"),
    "Father": ("أب", "ab"),
    "Dad": ("بابا / والدي", "baabaa"),
    "Mother / Mom": ("أم / والدة", "umm / waalidah"),
    "Mother": ("أم", "umm"),
    "Mom": ("ماما / أمي", "maamaa"),
    "Son": ("ابن", "ibn"),
    "Daughter": ("ابنة", "ibnah"),
    "Brother": ("أخ", "akh"),
    "Sister": ("أخت", "ukht"),
    "Husband": ("زوج", "zawj"),
    "Wife": ("زوجة", "zawjah"),
    "Child": ("طفل", "tifl"),
    "Boy": ("ولد", "walad"),
    "Girl": ("بنت / فتاة", "bint / fataah"),
    "Man": ("رجل", "rajul"),
    "Woman": ("امرأة", "imra'ah"),
    "Teacher": ("معلم / أستاذ", "mu'allim / ustaadh"),
    "Student": ("طالب", "taalib"),
    "Doctor": ("طبيب / دكتور", "tabeeb / duktoor"),
    "Nurse": ("ممرض / ممرضة", "mumarrid / mumarridah"),
    "Police officer": ("شرطي", "shurtiyy"),
    "Firefighter": ("رجل إطفاء", "rajul itfaa'"),
    "We": ("نحن", "nahnu"),
    "You": ("أنت", "anta"),
    "He": ("هو", "huwa"),
    "She": ("هي", "hiya"),
    "They": ("هم", "hum"),

    # Places & Travel
    "Home / House": ("بيت / منزل", "bayt / manzil"),
    "House": ("منزل", "manzil"),
    "Home": ("بيت", "bayt"),
    "City": ("مدينة", "madeenah"),
    "Country": ("بلد / دولة", "balad / dawlah"),
    "Street / Road": ("شارع / طريق", "shaari' / tareeq"),
    "Road": ("طريق", "tareeq"),
    "Street": ("شارع", "shaari'"),
    "Bridge": ("جسر", "jisr"),
    "Hotel": ("فندق", "funduq"),
    "Airport": ("مطار", "mataar"),
    "Flight": ("رحلة طيران", "rihlat tayaraan"),
    "Gate": ("بوابة", "bawwaabah"),
    "Station": ("محطة", "mahattah"),
    "Train station": ("محطة قطار", "mahattat qitaar"),
    "Subway / Metro": ("مترو", "mitroo"),
    "Bus stop": ("موقف حافلات", "mawqif haafilaat"),
    "Park": ("حديقة / متنزه", "hadeeqah / mutanazzah"),
    "Hospital": ("مستشفى", "mustashfaa"),
    "Pharmacy": ("صيدلية", "saydaliyyah"),
    "Bank": ("بنك / مصرف", "bank / masrif"),
    "Store / Shop": ("متجر / دكان", "matjar / dukkaan"),
    "Market": ("سوق", "sooq"),
    "Supermarket": ("سوبرماركت", "soobarmaarkit"),
    "School": ("مدرسة", "madrasah"),
    "University": ("جامعة", "jaami'ah"),
    "Library": ("مكتبة", "maktabah"),
    "Museum": ("متحف", "mathaf"),
    "Beach": ("شاطئ", "shaati'"),
    "Sea": ("بحر", "bahr"),
    "Lake": ("بحيرة", "buhayrah"),
    "River": ("نهر", "nahr"),
    "Mountain": ("جبل", "jabal"),
    "Forest": ("غابة", "ghaabah"),
    "Island": ("جزيرة", "jazeerah"),
    "Room": ("غرفة", "ghurfah"),
    "Bedroom": ("غرفة نوم", "ghurfat nawm"),
    "Kitchen": ("مطبخ", "matbakh"),
    "Bathroom / Restroom": ("حمام / دورة مياه", "hammaam / dawrat miyaah"),
    "Door": ("باب", "baab"),
    "Window": ("نافذة / شباك", "naafidhah / shubbaak"),
    "Bed": ("سرير", "sareer"),
    "Desk": ("مكتب / طاولة عمل", "maktab / taawilat 'amal"),
    "Entrance": ("مدخل", "madkhal"),
    "Exit": ("مخرج", "makhraj"),
    "Customs": ("جمارك", "jamaarik"),
    "Square / Plaza": ("ميدان / ساحة", "maydaan / saahah"),
    "Square (plaza)": ("ميدان", "maydaan"),
    "Post office": ("مكتب بريد", "maktab bareed"),
    "Police": ("شرطة", "shurtah"),
    "Visa": ("تأشيرة", "ta'sheerah"),
    "Center": ("مركز", "markaz"),
    "Theater": ("مسرح", "masrah"),
    "Cinema": ("سينما", "seenamaa"),
    "Factory": ("مصنع", "masna'"),

    # Transport
    "Car": ("سيارة", "sayyaarah"),
    "Train": ("قطار", "qitaar"),
    "Bus": ("حافلة / باص", "haafilah / baas"),
    "Airplane / Plane": ("طائرة", "taa'irah"),
    "Airplane": ("طائرة", "taa'irah"),
    "Taxi": ("تاكسي / سيارة أجرة", "taaksee"),
    "Bicycle / Bike": ("دراجة", "darraajah"),
    "Bicycle": ("دراجة", "darraajah"),
    "Boat / Ship": ("سفينة / قارب", "safeenah / qaarib"),
    "Boat": ("قارب", "qaarib"),
    "Ticket": ("تذكرة", "tadhkirah"),
    "Passport": ("جواز سفر", "jawaaz safar"),
    "Suitcase / Bag": ("حقيبة", "haqeebah"),
    "Suitcase": ("حقيبة سفر", "haqeebat safar"),
    "Luggage": ("أمتعة", "amti'ah"),
    "Backpack": ("حقيبة ظهر", "haqeebat dhahr"),
    "Wallet": ("محفظة", "mihfadhah"),
    "Bag": ("حقيبة", "haqeebah"),
    "Map": ("خريطة", "khareetah"),
    "Ambulance": ("سيارة إسعاف", "sayyaarat is'aaf"),

    # Colors
    "Red": ("أحمر", "ahmar"),
    "Blue": ("أزرق", "azraq"),
    "Green": ("أخضر", "akhdar"),
    "Yellow": ("أصفر", "asfar"),
    "White": ("أبيض", "abyad"),
    "Black": ("أسود", "aswad"),
    "Orange (color)": ("برتقالي", "burtuqaalee"),
    "Pink": ("وردي", "wardee"),
    "Brown": ("بني", "bunnee"),
    "Gray": ("رمادي", "ramaadee"),
    "Purple": ("بنفسجي", "banafsajee"),
    "Gold": ("ذهبي", "dhahabee"),
    "Silver": ("فضي", "fiddee"),

    # Work, Business & Tech
    "Work / Job": ("عمل / وظيفة", "'amal / wadheefah"),
    "Job": ("وظيفة", "wadheefah"),
    "Work": ("عمل", "'amal"),
    "Office": ("مكتب", "maktab"),
    "Company": ("شركة", "sharikah"),
    "Meeting": ("اجتماع", "ijtimaa'"),
    "Project": ("مشروع", "mashroo'"),
    "Computer": ("حاسوب / كمبيوتر", "haasoob / kumbyootar"),
    "Laptop": ("حاسوب محمول", "haasoob mahmool"),
    "Tablet": ("جهاز لوحي", "jihaaz lawhiyy"),
    "Charger": ("شاحن", "shaahin"),
    "Cable": ("كابل / سلك", "kaabil / silk"),
    "Wi-Fi": ("واي فاي", "waay faay"),
    "Application / App": ("تطبيق", "tatbeeq"),
    "Folder": ("مجلد", "mujallad"),
    "Camera": ("كاميرا", "kaameeraa"),
    "Microphone": ("ميكروفون", "meekroofoon"),
    "Headphones": ("سماعات", "sammaa'aat"),
    "Printer": ("طابعة", "taabi'ah"),
    "Search / Find": ("بحث / إيجاد", "bahth"),
    "Save": ("حفظ", "hifdh"),
    "Delete": ("حذف", "hadhf"),
    "Send": ("إرسال", "irsaal"),
    "Download": ("تنزيل / تحميل", "tanzeel"),
    "Upload": ("رفع", "raf'"),
    "Online": ("متصل بالإنترنت", "muttasil"),
    "Offline": ("غير متصل", "ghayr muttasil"),
    "Buy": ("شراء", "shiraa'"),
    "Sell": ("بيع", "bay'"),
    "Pay": ("دفع", "daf'"),
    "Support / Help Desk": ("دعم فني", "da'm fannee"),
    "Close": ("إغلاق", "ighlaaq"),
    "Update": ("تحديث", "tahdeeth"),
    "Boss": ("رئيس العمل", "ra'ees al-'amal"),
    "Colleague": ("زميل", "zameel"),
    "Employee": ("موظف", "muwadhdhaf"),
    "Client": ("عميل", "'ameel"),
    "Team": ("فريق", "fareeq"),
    "Manager": ("مدير", "mudeer"),
    "Contract": ("عقد", "'aqd"),
    "Schedule": ("جدول مواعيد", "jadwal mawaa'eed"),
    "Deadline": ("الموعد النهائي", "al-maw'id an-nihaa'ee"),
    "Task": ("مهمة", "muhimmah"),
    "Report": ("تقرير", "taqreer"),
    "Presentation": ("عرض تقديمي", "'ard taqdeemee"),
    "Signature": ("توقيع", "tawqee'"),
    "Vacation": ("عطلة / إجازة", "'utlah / ijaazah"),
    "Resume / CV": ("سيرة ذاتية", "seerah dhaatiyyah"),
    "Interview": ("مقابلة", "muqaabalah"),
    "Goal / Target": ("هدف", "hadaf"),
    "Product": ("منتج", "muntaj"),
    "Service": ("خدمة", "khidmah"),
    "Transfer": ("تحويل", "tahweel"),
    "Refund": ("استرداد", "istirdaad"),
    "Shipping": ("شحن", "shahn"),
    "Package": ("طرد / حزمة", "tard"),
    "Hardware": ("عتاد / أجهزة", "'ataad"),
    "Database": ("قاعدة بيانات", "qaa'idat bayaanaat"),
    "Server": ("خادم / سيرفر", "khaadim"),
    "Cloud storage": ("تخزين سحابي", "takhzeen sahaabee"),
    "Artificial Intelligence (AI)": ("ذكاء اصطناعي", "dhakaa' istinaa'ee"),
    "Artificial intelligence": ("ذكاء اصطناعي", "dhakaa' istinaa'ee"),
    "Algorithm": ("خوارزمية", "khawaarizmiyyah"),
    "Developer": ("مطور", "mutawwir"),
    "Cybersecurity": ("أمن سيبراني", "amn seebaraanee"),
    "Operating system": ("نظام تشغيل", "nidhaam tashgheel"),
    "Budget": ("ميزانية", "meezaniyyah"),
    "Investment": ("استثمار", "istithmaar"),
    "Revenue / Income": ("دخل / إيرادات", "dakhl / eeraadaat"),
    "Startup": ("شركة ناشئة", "sharikah naashi'ah"),
    "Remote work": ("عمل عن بعد", "'amal 'an bu'd"),
    "Phone / Mobile": ("هاتف / جوال", "haatif / jawwaal"),
    "Phone": ("هاتف", "haatif"),
    "Telephone": ("هاتف", "haatif"),
    "Internet": ("إنترنت", "intarnit"),
    "Email": ("بريد إلكتروني", "bareed ilikturoonee"),
    "Website": ("موقع إلكتروني", "mawqih ilikturoonee"),
    "Screen": ("شاشة", "shaashah"),
    "Keyboard": ("لوحة مفاتيح", "lawhat mafaateeh"),
    "Mouse": ("فأرة", "fa'rah"),
    "Software": ("برمجيات", "barmajiyyaat"),
    "File": ("ملف", "milaff"),
    "Data": ("بيانات", "bayaanaat"),
    "Code": ("رمز / كود", "ramz"),
    "Error": ("خطأ", "khata'"),
    "Password": ("كلمة المرور", "kalimat al-muroor"),
    "Link": ("رابط", "raabit"),
    "Battery": ("بطارية", "battaariyyah"),
    "Message": ("رسالة", "risaalah"),
    "Money / Cash": ("نقود / مال", "nuqood / maal"),
    "Money": ("نقود / مال", "nuqood / maal"),
    "Price": ("سعر / ثمن", "si'r / thaman"),
    "Credit card": ("بطاقة ائتمان", "bitaaqat i'timaan"),
    "Cash": ("نقداً / كاش", "naqdan"),
    "Receipt": ("إيصال", "eesaal"),
    "Invoice": ("فاتورة", "faatoorah"),
    "Salary": ("راتب", "raatib"),
    "Discount": ("خصم", "khasm"),

    # Descriptions & Adjectives
    "Big / Large": ("كبير", "kabeer"),
    "Big": ("كبير", "kabeer"),
    "Small / Little": ("صغير", "sagheer"),
    "Small": ("صغير", "sagheer"),
    "Good": ("جيد", "jayyid"),
    "Bad": ("سيئ", "sayyi'"),
    "Hot": ("حار / ساخن", "haar / saakhin"),
    "Cold": ("بارد", "baarid"),
    "New": ("جديد", "jadeed"),
    "Old": ("قديم", "qadeem"),
    "Fast / Quick": ("سريع", "saree'"),
    "Fast": ("سريع", "saree'"),
    "Slow": ("بطيء", "batee'"),
    "Easy": ("سهل", "sahl"),
    "Difficult / Hard": ("صعب", "sa'b"),
    "Beautiful": ("جميل", "jameel"),
    "Clean": ("نظيف", "nadheef"),
    "Dirty": ("متسخ", "muttasikh"),
    "Heavy": ("ثقيل", "thaqeel"),
    "Light": ("خفيف", "khafeef"),
    "Cheap": ("رخيص", "rakhees"),
    "Expensive": ("غالي", "ghaalee"),
    "Open": ("مفتوح", "maftooh"),
    "Closed": ("مغلق", "mughlaq"),
    "Near / Close": ("قريب", "qareeb"),
    "Far": ("بعيد", "ba'eed"),
    "Happy": ("سعيد", "sa'eed"),
    "Sad": ("حزين", "hazeen"),
    "Tired": ("متعب", "mut'ab"),
    "Strong": ("قوي", "qawiyy"),
    "Weak": ("ضعيف", "da'eef"),
    "Right (correct)": ("صحيح", "saheeh"),
    "Wrong": ("خطأ", "khata'"),
    "Early": ("مبكراً", "mubakkiran"),
    "Late": ("متأخراً", "muta'akhkhiran"),
    "Busy": ("مشغول", "mashghool"),
    "Free (available)": ("متاح / متفرغ", "mutaah"),
    "Important": ("مهم", "muhimm"),
    "Ready": ("جاهز", "jaahiz"),
    "Quiet": ("هادئ", "haadi'"),

    # Body & Health
    "Head": ("رأس", "ra's"),
    "Hair": ("شعر", "sha'r"),
    "Face": ("وجه", "wajh"),
    "Eye": ("عين", "ayn"),
    "Eyes": ("عيون", "'uyoon"),
    "Ear": ("أذن", "udhun"),
    "Nose": ("أنف", "anf"),
    "Mouth": ("فم", "fam"),
    "Tooth": ("سن", "sinn"),
    "Cheek": ("خد", "khadd"),
    "Voice": ("صوت", "sawt"),
    "Hand": ("يد", "yad"),
    "Foot": ("قدم", "qadam"),
    "Arm": ("ذراع", "dhiraa'"),
    "Leg": ("ساق", "saaq"),
    "Heart": ("قلب", "qalb"),
    "Health": ("صحة", "sihhah"),
    "Medicine": ("دواء", "dawaa'"),
    "Pain": ("ألم", "alam"),
    "Headache": ("صداع", "sudaa'"),
    "Fever": ("حمى", "hummaa"),
    "Allergy": ("حساسية", "hasaasiyyah"),
    "Emergency": ("طوارئ", "tawaari'"),
    "Prescription": ("وصفة طبية", "wasfah tibbiyyah"),
    "Bandage": ("ضمادة", "dimaadah"),
    "Sick / Ill": ("مريض", "mareed"),

    # Clothing
    "Clothes": ("ملابس", "malaabis"),
    "Shirt": ("قميص", "qamees"),
    "Pants": ("بنطال", "bantaal"),
    "Dress": ("فستان", "fustaan"),
    "Shoe": ("حذاء", "hidhaa'"),
    "Shoes": ("حذاء", "hidhaa'"),
    "Jacket / Coat": ("سترة / معطف", "sutrah / mi'taf"),
    "Hat": ("قبعة", "qubba'ah"),
    "Glasses": ("نظارات", "nadhdhaaraat"),
    "Watch": ("ساعة يد", "saa'at yad"),
    "Clock / Watch": ("ساعة", "saa'ah"),
    "Umbrella": ("مظلة", "midhallah"),

    # Nature & Animals
    "Dog": ("كلب", "kalb"),
    "Cat": ("قطة", "qittah"),
    "Bird": ("طائر", "taair"),
    "Tree": ("شجرة", "shajarah"),
    "Flower": ("زهرة", "zahrah"),
    "Zebra": ("حمار وحشي", "himaar wahshee"),
    "Hedgehog": ("قنفذ", "qunfudh"),
    "Beetle / Bug": ("خنفساء / حشرة", "khunfusaa'"),

    # Household & General
    "Kettle": ("غلاية", "ghallaayah"),
    "Oil": ("زيت", "zayt"),
    "Yogurt": ("زبادي / لبن", "zabaadee"),
    "Book": ("كتاب", "kitaab"),
    "Pen": ("قلم", "qalam"),
    "Paper": ("ورقة", "waraqah"),
    "Question": ("سؤال", "su'aal"),
    "Answer": ("جواب / إجابة", "jawaab / ijaabah"),
    "Problem": ("مشكلة", "mushkilah"),
    "Solution": ("حل", "hall"),
    "Idea": ("فكرة", "fikrah"),
    "Example": ("مثال", "mithaal"),
    "Music": ("موسيقى", "mooseeqaa"),
    "Radio": ("راديو / مذياع", "raadyoo / midhyaa'"),
    "Key": ("مفتاح", "miftaah"),
    "Object": ("شيء / غرض", "shay' / gharad"),
    "Source": ("مصدر", "masdar"),
    "Web": ("شبكة", "shabakah"),
    "Photo": ("صورة", "soorah"),
    "Card": ("بطاقة", "bitaaqah"),
    "Magazine": ("مجلة", "majallah"),
    "Name": ("اسم", "ism"),
    "Love": ("حب", "hubb"),
    "Kilogram": ("كيلوغرام", "keelooghraam"),
    "Success": ("نجاح", "najaah"),
    "X-ray": ("أشعة سينية", "ashi''ah seiniyyah"),
    "Xylophone": ("إكسيليفون", "ikseeloofoon"),
    "Christmas tree": ("شجرة عيد الميلاد", "shajarat 'eed al-meelaad"),
    "Wagon / Car": ("عربة", "'arabah"),
    "Czar / King": ("ملك / قيصر", "malik"),
    "Borscht": ("شوربة البورش", "shoorbat al-boorsht"),
    "South": ("جنوب", "janoob"),
    "Or": ("أو", "aw"),
    "This": ("هذا", "haadhaa"),
    "I eat": ("آكل", "aakul"),
    "Maybe": ("ربما", "rubbamaa"),

    # Pronouns & Questions
    "Who": ("من", "man"),
    "Who?": ("من؟", "man?"),
    "What": ("ماذا", "maadhaa"),
    "What?": ("ماذا؟", "maadhaa?"),
    "Where": ("أين", "ayna"),
    "Where?": ("أين؟", "ayna?"),
    "When": ("متى", "mataa"),
    "When?": ("متى؟", "mataa?"),
    "Why": ("لماذا", "limaadhaa"),
    "Why?": ("لماذا؟", "limaadhaa?"),
    "How": ("كيف", "kayfa"),
    "How?": ("كيف؟", "kayfa?"),
    "How much / How many": ("كم", "kam"),

    # Verbs
    "To learn": ("تعلم", "ta'allama"),
    "To speak": ("تكلم", "takallama"),
    "To eat": ("أكل", "akala"),
    "To drink": ("شرب", "shariba"),
    "To go": ("ذهب", "dhahaba"),
    "To come": ("جاء", "jaa'a"),
    "To understand": ("فهم", "fahima"),
    "To know": ("عرف", "'arafa"),
    "To help": ("ساعد", "saa'ada"),
    "To work": ("عمل", "'amila"),
    "To want": ("أراد", "araada"),
    "To need": ("احتاج", "ihtaaja"),
    "To buy": ("اشترى", "ishtaraa"),
}

def get_ar_item(translation: str):
    clean = translation.strip()
    if clean in ARABIC_DICTIONARY:
        return ARABIC_DICTIONARY[clean]
    clean_split = clean.split('/')[0].strip()
    if clean_split in ARABIC_DICTIONARY:
        return ARABIC_DICTIONARY[clean_split]
    clean_paren = re.sub(r"\s*\([^)]*\)\s*", "", clean).strip()
    if clean_paren in ARABIC_DICTIONARY:
        return ARABIC_DICTIONARY[clean_paren]
    
    print(f"Warning: missing Arabic translation for: {translation}")
    return (clean, clean.lower())

# Build dataset content
lines = []
lines.append("import { AlphabetItem, PhraseItem, AppData } from '../../../types';")
lines.append("import { ARABIC_GRAMMAR } from '../grammarData';")
lines.append("")
lines.append("// Modern Standard Arabic Alphabet (28 letters)")
lines.append("const alphabet: AlphabetItem[] = [")
for letter, pron, example, word, meaning, icon in ALPHABET_DATA:
    letter_esc = letter.replace("'", "\\'")
    word_esc = word.replace("'", "\\'")
    pron_esc = pron.replace("'", "\\'")
    meaning_esc = meaning.replace("'", "\\'")
    lines.append(f"  {{ letter: '{letter_esc}', pronunciation: '{pron_esc}', example: '{example}', word: '{word_esc}', meaning: '{meaning_esc}', icon: '{icon}' }},")
lines.append("];")
lines.append("")
lines.append("// Essential Arabic Phrases")
lines.append("const basicPhrases: PhraseItem[] = [")
for phrase, transl, pron, cat, icon in PHRASES_DATA:
    p_esc = phrase.replace("'", "\\'")
    t_esc = transl.replace("'", "\\'")
    pron_esc = pron.replace("'", "\\'")
    lines.append(f"  {{ phrase: '{p_esc}', translation: '{t_esc}', pronunciation: '{pron_esc}', category: '{cat}', icon: '{icon}' }},")
lines.append("];")
lines.append("")
lines.append("// Arabic Numbers")
lines.append("const numbers: PhraseItem[] = [")
for num, transl, pron, cat, icon in NUMBERS_DATA:
    n_esc = num.replace("'", "\\'")
    t_esc = transl.replace("'", "\\'")
    pron_esc = pron.replace("'", "\\'")
    lines.append(f"  {{ phrase: '{n_esc}', translation: '{t_esc}', pronunciation: '{pron_esc}', category: '{cat}', icon: '{icon}' }},")
lines.append("];")
lines.append("")
lines.append("// Core Arabic Vocabulary (500 items)")
lines.append("const commonWords: PhraseItem[] = [")

ref_items = json.load(open(ROOT / 'scripts' / 'common_words_reference.json', encoding='utf-8'))
for item in ref_items:
    transl = item['translation']
    cat = item['category']
    icon = item['icon']
    ar_phrase, ar_pron = get_ar_item(transl)
    p_esc = ar_phrase.replace("'", "\\'")
    t_esc = transl.replace("'", "\\'")
    pron_esc = ar_pron.replace("'", "\\'")
    lines.append(f"  {{ phrase: '{p_esc}', translation: '{t_esc}', pronunciation: '{pron_esc}', category: '{cat}', icon: '{icon}' }},")

lines.append("];")
lines.append("")
lines.append("// Time Expressions")
lines.append("const time: PhraseItem[] = [")
for phrase, transl, pron, cat, icon in TIME_DATA:
    p_esc = phrase.replace("'", "\\'")
    t_esc = transl.replace("'", "\\'")
    pron_esc = pron.replace("'", "\\'")
    lines.append(f"  {{ phrase: '{p_esc}', translation: '{t_esc}', pronunciation: '{pron_esc}', category: '{cat}', icon: '{icon}' }},")
lines.append("];")
lines.append("")
lines.append("export const arabicData: AppData = {")
lines.append("  alphabet,")
lines.append("  basicPhrases,")
lines.append("  commonWords,")
lines.append("  numbers,")
lines.append("  time,")
lines.append("  grammar: ARABIC_GRAMMAR,")
lines.append("};")
lines.append("")
lines.append("export default arabicData;")

output_file = AR_DIR / 'arabicData.ts'
output_file.write_text('\n'.join(lines), 'utf-8')
print(f"Generated {output_file} successfully!")

# Also generate scripts/arabic_dictionary.json
dict_export = {}
for letter, pron, example, word, meaning, icon in ALPHABET_DATA:
    dict_export[meaning] = [word, pron]
for phrase, transl, pron, cat, icon in PHRASES_DATA:
    dict_export[transl] = [phrase, pron]
for num, transl, pron, cat, icon in NUMBERS_DATA:
    dict_export[transl] = [num, pron]
for phrase, transl, pron, cat, icon in TIME_DATA:
    dict_export[transl] = [phrase, pron]
for item in ref_items:
    transl = item['translation']
    ar_phrase, ar_pron = get_ar_item(transl)
    dict_export[transl] = [ar_phrase, ar_pron]

dict_file = ROOT / 'scripts' / 'arabic_dictionary.json'
dict_file.write_text(json.dumps(dict_export, indent=2, ensure_ascii=False), 'utf-8')
print(f"Wrote {len(dict_export)} items to {dict_file}")
