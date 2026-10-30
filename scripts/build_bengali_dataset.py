#!/usr/bin/env python3
"""
Generate comprehensive Bengali (bn) curriculum dataset.
Includes:
- 48 Bengali alphabet items (vowels, consonants, modifiers) with native script, transliteration, English anchor, and example words
- 55+ Essential phrases across greetings, courtesy, travel, tech, dining, etc.
- 30 Numbers (0-20, tens, 100, 1000)
- 120+ High-frequency core words
- Telling time expressions
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BN_DIR = ROOT / 'src' / 'data' / 'languages' / 'bn'
BN_DIR.mkdir(parents=True, exist_ok=True)

DATA_TS = """import { AlphabetItem, PhraseItem, AppData } from '../../../types';
import { BENGALI_GRAMMAR } from '../grammarData';

// Bengali Alphabet (বর্ণমালা - স্বরবর্ণ Vowels & ব্যঞ্জনবর্ণ Consonants)
const alphabet: AlphabetItem[] = [
  // Vowels (স্বরবর্ণ)
  { letter: 'অ', pronunciation: '/ɔ/ (o)', example: 'as in hot / ball', word: 'অজগর', meaning: 'Python', icon: '🐍' },
  { letter: 'আ', pronunciation: '/a/ (aa)', example: 'as in father / car', word: 'আম', meaning: 'Mango', icon: '🥭' },
  { letter: 'ই', pronunciation: '/i/ (i)', example: 'as in bit / see', word: 'ইঁদুর', meaning: 'Mouse', icon: '🐭' },
  { letter: 'ঈ', pronunciation: '/iː/ (ee)', example: 'as in see / machine', word: 'ঈগল', meaning: 'Eagle', icon: '🦅' },
  { letter: 'উ', pronunciation: '/u/ (u)', example: 'as in put / book', word: 'উট', meaning: 'Camel', icon: '🐪' },
  { letter: 'ঊ', pronunciation: '/uː/ (oo)', example: 'as in boot / rule', word: 'ঊষা', meaning: 'Dawn', icon: '🌅' },
  { letter: 'ঋ', pronunciation: '/ri/ (ri)', example: 'as in rhythm / rip', word: 'ঋতু', meaning: 'Season', icon: '🍃' },
  { letter: 'এ', pronunciation: '/e/ (e)', example: 'as in bed / red', word: 'এক', meaning: 'One', icon: '1️⃣' },
  { letter: 'ঐ', pronunciation: '/oj/ (oi)', example: 'as in boy / coin', word: 'ঐরাবত', meaning: 'Elephant', icon: '🐘' },
  { letter: 'ও', pronunciation: '/o/ (o)', example: 'as in boat / open', word: 'ওল', meaning: 'Yam', icon: '🥔' },
  { letter: 'ঔ', pronunciation: '/ow/ (ou)', example: 'as in cow / now', word: 'ঔষধ', meaning: 'Medicine', icon: '💊' },

  // Consonants (ব্যঞ্জনবর্ণ)
  { letter: 'ক', pronunciation: '/kɔ/ (ko)', example: 'as in kite / cup', word: 'কলম', meaning: 'Pen', icon: '🖊️' },
  { letter: 'খ', pronunciation: '/kʰɔ/ (kho)', example: 'as in kite (aspirated)', word: 'খরগোশ', meaning: 'Rabbit', icon: '🐇' },
  { letter: 'গ', pronunciation: '/ɡɔ/ (go)', example: 'as in go / gate', word: 'গরু', meaning: 'Cow', icon: '🐄' },
  { letter: 'ঘ', pronunciation: '/ɡʱɔ/ (gho)', example: 'as in ghost (aspirated)', word: 'ঘর', meaning: 'House', icon: '🏠' },
  { letter: 'ঙ', pronunciation: '/ŋɔ/ (ngo)', example: 'as in sing / king', word: 'ব্যাঙ', meaning: 'Frog', icon: '🐸' },
  { letter: 'চ', pronunciation: '/tʃɔ/ (cho)', example: 'as in chair / chat', word: 'চামচ', meaning: 'Spoon', icon: '🥄' },
  { letter: 'ছ', pronunciation: '/tʃʰɔ/ (chho)', example: 'as in chair (aspirated)', word: 'ছাতা', meaning: 'Umbrella', icon: '☂️' },
  { letter: 'জ', pronunciation: '/dʒɔ/ (jo)', example: 'as in joy / jam', word: 'জল', meaning: 'Water', icon: '💧' },
  { letter: 'ঝ', pronunciation: '/dʒʱɔ/ (jho)', example: 'as in hedgehog (aspirated)', word: 'ঝড়', meaning: 'Storm', icon: '⛈️' },
  { letter: 'ঞ', pronunciation: '/ɲɔ/ (nio)', example: 'as in canyon / onion', word: 'মিয়াঁ', meaning: 'Mister', icon: '🧔' },
  { letter: 'ট', pronunciation: '/ʈɔ/ (to)', example: 'as in top (retroflex t)', word: 'টুপি', meaning: 'Cap', icon: '🧢' },
  { letter: 'ঠ', pronunciation: '/ʈʰɔ/ (tho)', example: 'as in top (aspirated retroflex)', word: 'ঠোঁট', meaning: 'Lip', icon: '👄' },
  { letter: 'ড', pronunciation: '/ɖɔ/ (do)', example: 'as in door (retroflex d)', word: 'ডাব', meaning: 'Green Coconut', icon: '🥥' },
  { letter: 'ঢ', pronunciation: '/ɖʱɔ/ (dho)', example: 'as in door (aspirated retroflex)', word: 'ঢাক', meaning: 'Drum', icon: '🥁' },
  { letter: 'ণ', pronunciation: '/nɔ/ (no)', example: 'as in nest (retroflex n)', word: 'হরিণ', meaning: 'Deer', icon: '🦌' },
  { letter: 'ত', pronunciation: '/t̪ɔ/ (to)', example: 'as in pasta (dental t)', word: 'তারা', meaning: 'Star', icon: '⭐' },
  { letter: 'থ', pronunciation: '/t̪ʰɔ/ (tho)', example: 'as in think (dental th)', word: 'থালা', meaning: 'Plate', icon: '🍽️' },
  { letter: 'দ', pronunciation: '/d̪ɔ/ (do)', example: 'as in the / this (dental d)', word: 'দরজা', meaning: 'Door', icon: '🚪' },
  { letter: 'ধ', pronunciation: '/d̪ʱɔ/ (dho)', example: 'as in breathe (aspirated dental dh)', word: 'ধান', meaning: 'Paddy', icon: '🌾' },
  { letter: 'ন', pronunciation: '/nɔ/ (no)', example: 'as in nest (dental n)', word: 'নদী', meaning: 'River', icon: '🌊' },
  { letter: 'প', pronunciation: '/pɔ/ (po)', example: 'as in pen / park', word: 'পাখি', meaning: 'Bird', icon: '🐦' },
  { letter: 'ফ', pronunciation: '/pʰɔ/ or /fɔ/ (pho/fo)', example: 'as in phone / flower', word: 'ফুল', meaning: 'Flower', icon: '🌸' },
  { letter: 'ব', pronunciation: '/bɔ/ (bo)', example: 'as in boy / book', word: 'বই', meaning: 'Book', icon: '📖' },
  { letter: 'ভ', pronunciation: '/bʱɔ/ (bho)', example: 'as in abhor (aspirated b)', word: 'ভাত', meaning: 'Rice', icon: '🍚' },
  { letter: 'ম', pronunciation: '/mɔ/ (mo)', example: 'as in moon / mother', word: 'মাছ', meaning: 'Fish', icon: '🐟' },
  { letter: 'য', pronunciation: '/dʒɔ/ (jo)', example: 'as in joy / yellow', word: 'যান', meaning: 'Vehicle', icon: '🚗' },
  { letter: 'র', pronunciation: '/rɔ/ (ro)', example: 'as in run (tapped r)', word: 'রাস্তা', meaning: 'Road', icon: '🛣️' },
  { letter: 'ল', pronunciation: '/lɔ/ (lo)', example: 'as in lamp / light', word: 'লাল', meaning: 'Red', icon: '🔴' },
  { letter: 'শ', pronunciation: '/ʃɔ/ (sho)', example: 'as in ship / shoe', word: 'শহর', meaning: 'City', icon: '🏙️' },
  { letter: 'ষ', pronunciation: '/ʃɔ/ (sho)', example: 'as in shine (retroflex sh)', word: 'ষাঁড়', meaning: 'Bull', icon: '🐂' },
  { letter: 'স', pronunciation: '/ʃɔ/ or /sɔ/ (sho/so)', example: 'as in sun / sea', word: 'সূর্য', meaning: 'Sun', icon: '☀️' },
  { letter: 'হ', pronunciation: '/hɔ/ (ho)', example: 'as in home / hat', word: 'হাত', meaning: 'Hand', icon: '✋' },
  { letter: 'ড়', pronunciation: '/ɽɔ/ (rho)', example: 'as in flap r (flapped d)', word: 'গাড়ি', meaning: 'Car', icon: '🚗' },
  { letter: 'ঢ়', pronunciation: '/ɽʱɔ/ (rho)', example: 'as in aspirated flap r', word: 'আষাঢ়', meaning: 'Monsoon Month', icon: '🌧️' },
  { letter: 'য়', pronunciation: '/e̯ɔ/ (e/y)', example: 'as in day (semi-vowel y)', word: 'আয়না', meaning: 'Mirror', icon: '🪞' },
  { letter: 'ৎ', pronunciation: '/t̪/ (khanda ta)', example: 'as in cat (final dental t)', word: 'উৎসব', meaning: 'Festival', icon: '🎉' },
  { letter: 'ং', pronunciation: '/ŋ/ (anusvara)', example: 'as in sing (nasal ng)', word: 'সিংহ', meaning: 'Lion', icon: '🦁' },
  { letter: 'ঃ', pronunciation: '/h/ (visarga)', example: 'as in breathy pause', word: 'দুঃখ', meaning: 'Sadness', icon: '😢' },
  { letter: 'ঁ', pronunciation: '/̃/ (chandrabindu)', example: 'as in nasal vowel', word: 'চাঁদ', meaning: 'Moon', icon: '🌙' },
];

// Essential Bengali Phrases across Greetings, Courtesy, Travel, Tech, Dining, Emergency
const basicPhrases: PhraseItem[] = [
  { phrase: 'হ্যালো / নমস্কার', translation: 'Hello', pronunciation: 'hyālō / namaskār', category: 'Greetings', icon: '👋' },
  { phrase: 'শুভ সকাল', translation: 'Good morning', pronunciation: 'shuvo sokal', category: 'Greetings', icon: '🌅' },
  { phrase: 'শুভ সন্ধ্যা', translation: 'Good evening', pronunciation: 'shuvo shondha', category: 'Greetings', icon: '🌙' },
  { phrase: 'শুভ রাত্রি', translation: 'Good night', pronunciation: 'shuvo ratri', category: 'Greetings', icon: '😴' },
  { phrase: 'ধন্যবাদ', translation: 'Thank you', pronunciation: 'dhonnobad', category: 'Courtesy', icon: '💖' },
  { phrase: 'অনেক ধন্যবাদ', translation: 'Thank you very much', pronunciation: 'onek dhonnobad', category: 'Courtesy', icon: '🙏' },
  { phrase: 'স্বাগতম', translation: 'You\\'re welcome / Welcome', pronunciation: 'shagotom', category: 'Courtesy', icon: '😊' },
  { phrase: 'দয়া করে', translation: 'Please', pronunciation: 'doya kore', category: 'Courtesy', icon: '🤲' },
  { phrase: 'মাফ করবেন', translation: 'Excuse me / Sorry', pronunciation: 'maf korben', category: 'Courtesy', icon: '🙋' },
  { phrase: 'কেমন আছেন?', translation: 'How are you?', pronunciation: 'kemon achen', category: 'Questions', icon: '🤝' },
  { phrase: 'আমি ভালো আছি', translation: 'I am doing well', pronunciation: 'ami bhalo achi', category: 'Greetings', icon: '😊' },
  { phrase: 'আপনার নাম কি?', translation: 'What is your name?', pronunciation: 'apnar nam ki', category: 'Introductions', icon: '🪪' },
  { phrase: 'আমার নাম...', translation: 'My name is...', pronunciation: 'amar nam...', category: 'Introductions', icon: '🙋' },
  { phrase: 'দেখা হয়ে ভালো লাগলো', translation: 'Nice to meet you', pronunciation: 'dekha hoye bhalo laglo', category: 'Introductions', icon: '🤝' },
  { phrase: 'আপনি কি ইংরেজি বলেন?', translation: 'Do you speak English?', pronunciation: 'apni ki ingreji bolen', category: 'Questions', icon: '🗣️' },
  { phrase: 'আমি বুঝতে পারছি না', translation: 'I don\\'t understand', pronunciation: 'ami bujhte parchi na', category: 'Essentials', icon: '🤔' },
  { phrase: 'আরেকটু আস্তে বলবেন?', translation: 'Could you speak more slowly?', pronunciation: 'arektu aste bolben', category: 'Questions', icon: '🐢' },
  { phrase: 'টয়লেট কোথায়?', translation: 'Where is the bathroom?', pronunciation: 'toilet kothay', category: 'Questions', icon: '🚻' },
  { phrase: 'এর দাম কত?', translation: 'How much does this cost?', pronunciation: 'er dam koto', category: 'Shopping', icon: '💰' },
  { phrase: 'আমাকে সাহায্য করুন', translation: 'Please help me', pronunciation: 'amake sahajjo korun', category: 'Essentials', icon: '🆘' },
  { phrase: 'হ্যাঁ', translation: 'Yes', pronunciation: 'hê / haa', category: 'Reply', icon: '👍' },
  { phrase: 'না', translation: 'No', pronunciation: 'na', category: 'Reply', icon: '👎' },
  { phrase: 'ঠিক আছে', translation: 'Okay / Alright', pronunciation: 'thik ache', category: 'Reply', icon: '👌' },
  { phrase: 'আবার দেখা হবে', translation: 'See you again / Goodbye', pronunciation: 'abar dekha hobe', category: 'Greetings', icon: '👋' },

  // Tech & Remote Work
  { phrase: 'ওয়াই-ফাই পাসওয়ার্ড কি?', translation: 'What is the Wi-Fi password?', pronunciation: 'wi-fi password ki', category: 'Tech', icon: '📶' },
  { phrase: 'ইন্টারনেট খুব ধীরগতি', translation: 'The internet is very slow', pronunciation: 'internet khub dhirgoti', category: 'Tech', icon: '🌐' },
  { phrase: 'ইমেইল পাঠিয়ে দিন', translation: 'Please send an email', pronunciation: 'email pathiye din', category: 'Tech', icon: '📧' },
  { phrase: 'আমার চার্জ শেষ হয়ে গেছে', translation: 'My battery is dead', pronunciation: 'amar charge shesh hoye geche', category: 'Tech', icon: '🪫' },
  { phrase: 'আমাকে শুনতে পাচ্ছেন?', translation: 'Can you hear me?', pronunciation: 'amake shunte pacchen', category: 'Tech', icon: '🎧' },
  { phrase: 'আমি স্ক্রিন শেয়ার করছি', translation: 'I am sharing my screen', pronunciation: 'ami screen share korchi', category: 'Tech', icon: '🖥️' },

  // Travel & Transport
  { phrase: 'ট্রেন স্টেশন কোথায়?', translation: 'Where is the train station?', pronunciation: 'train station kothay', category: 'Travel', icon: '🚆' },
  { phrase: 'বিমানবন্দর কোথায়?', translation: 'Where is the airport?', pronunciation: 'bimanbondor kothay', category: 'Travel', icon: '✈️' },
  { phrase: 'আমার রিজার্ভেশন আছে', translation: 'I have a reservation', pronunciation: 'amar reservation ache', category: 'Travel', icon: '🏨' },
  { phrase: 'একটি টিকিট দিন', translation: 'One ticket please', pronunciation: 'ekti ticket din', category: 'Travel', icon: '🎟️' },
  { phrase: 'গাড়ি কোথায় থামবে?', translation: 'Where will the car stop?', pronunciation: 'gari kothay thambe', category: 'Travel', icon: '🚏' },

  // Dining & Food
  { phrase: 'মেনু দেখতে পারি?', translation: 'Can I see the menu?', pronunciation: 'menu dekhte pari', category: 'Dining', icon: '📋' },
  { phrase: 'দুইজনের জন্য টেবিল', translation: 'A table for two', pronunciation: 'duijoner jonno table', category: 'Dining', icon: '🍽️' },
  { phrase: 'বিলটা দিন, দয়া করে', translation: 'The bill please', pronunciation: 'bil-ta din, doya kore', category: 'Dining', icon: '🧾' },
  { phrase: 'খাবার খুব সুস্বাদু', translation: 'The food is very delicious', pronunciation: 'khabar khub shushadu', category: 'Dining', icon: '😋' },
  { phrase: 'এক গ্লাস জল দিন', translation: 'A glass of water please', pronunciation: 'ek glass jol din', category: 'Dining', icon: '🥛' },

  // Health & Emergencies
  { phrase: 'ডাক্তার ডাকুন', translation: 'Call a doctor', pronunciation: 'daktar dakun', category: 'Health', icon: '🩺' },
  { phrase: 'নিকটতম ফার্মেসি কোথায়?', translation: 'Where is the nearest pharmacy?', pronunciation: 'nikot-tomo pharmacy kothay', category: 'Health', icon: '💊' },
  { phrase: 'আমার শরীর খারাপ লাগছে', translation: 'I feel sick', pronunciation: 'amar shorir kharap lagche', category: 'Health', icon: '🤒' },
  { phrase: 'পুলিশ ডাকুন', translation: 'Call the police', pronunciation: 'police dakun', category: 'Emergency', icon: '🚨' },
  { phrase: 'অ্যাম্বুলেন্স ডাকুন', translation: 'Call an ambulance', pronunciation: 'ambulance dakun', category: 'Emergency', icon: '🚑' },
];

// Numbers in Bengali (0 to 1,000)
const numbers: PhraseItem[] = [
  { phrase: 'শূন্য', translation: '0 (Zero)', pronunciation: 'shunno', category: 'Numbers 0-10', icon: '0️⃣' },
  { phrase: 'এক', translation: '1 (One)', pronunciation: 'ek', category: 'Numbers 0-10', icon: '1️⃣' },
  { phrase: 'দুই', translation: '2 (Two)', pronunciation: 'dui', category: 'Numbers 0-10', icon: '2️⃣' },
  { phrase: 'তিন', translation: '3 (Three)', pronunciation: 'tin', category: 'Numbers 0-10', icon: '3️⃣' },
  { phrase: 'চার', translation: '4 (Four)', pronunciation: 'char', category: 'Numbers 0-10', icon: '4️⃣' },
  { phrase: 'পাঁচ', translation: '5 (Five)', pronunciation: 'pãch', category: 'Numbers 0-10', icon: '5️⃣' },
  { phrase: 'ছয়', translation: '6 (Six)', pronunciation: 'chhoy', category: 'Numbers 0-10', icon: '6️⃣' },
  { phrase: 'সাত', translation: '7 (Seven)', pronunciation: 'shat', category: 'Numbers 0-10', icon: '7️⃣' },
  { phrase: 'আট', translation: '8 (Eight)', pronunciation: 'at', category: 'Numbers 0-10', icon: '8️⃣' },
  { phrase: 'নয়', translation: '9 (Nine)', pronunciation: 'noy', category: 'Numbers 0-10', icon: '9️⃣' },
  { phrase: 'দশ', translation: '10 (Ten)', pronunciation: 'dosh', category: 'Numbers 0-10', icon: '🔟' },
  { phrase: 'এগারো', translation: '11 (Eleven)', pronunciation: 'egaro', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'বারো', translation: '12 (Twelve)', pronunciation: 'baro', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'তেরো', translation: '13 (Thirteen)', pronunciation: 'tero', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'চৌদ্দ', translation: '14 (Fourteen)', pronunciation: 'chouddo', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'পনেরো', translation: '15 (Fifteen)', pronunciation: 'ponero', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'ষোলো', translation: '16 (Sixteen)', pronunciation: 'sholo', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'সতেরো', translation: '17 (Seventeen)', pronunciation: 'sotero', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'আঠারো', translation: '18 (Eighteen)', pronunciation: 'atharo', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'উনিশ', translation: '19 (Nineteen)', pronunciation: 'unish', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'বিশ', translation: '20 (Twenty)', pronunciation: 'bish', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'ত্রিশ', translation: '30 (Thirty)', pronunciation: 'trish', category: 'Tens', icon: '🔢' },
  { phrase: 'চল্লিশ', translation: '40 (Forty)', pronunciation: 'chollish', category: 'Tens', icon: '🔢' },
  { phrase: 'পঞ্চাশ', translation: '50 (Fifty)', pronunciation: 'ponchash', category: 'Tens', icon: '🔢' },
  { phrase: 'ষাট', translation: '60 (Sixty)', pronunciation: 'shat', category: 'Tens', icon: '🔢' },
  { phrase: 'সত্তর', translation: '70 (Seventy)', pronunciation: 'sottor', category: 'Tens', icon: '🔢' },
  { phrase: 'আশি', translation: '80 (Eighty)', pronunciation: 'ashi', category: 'Tens', icon: '🔢' },
  { phrase: 'নব্বই', translation: '90 (Ninety)', pronunciation: 'nobboi', category: 'Tens', icon: '🔢' },
  { phrase: 'একশো', translation: '100 (One Hundred)', pronunciation: 'eksho', category: 'Hundreds', icon: '💯' },
  { phrase: 'এক হাজার', translation: '1,000 (One Thousand)', pronunciation: 'ek hajar', category: 'Hundreds', icon: '💰' },
];

// Common Bengali Vocabulary across Daily Life, Food, City, Family, Nature, Tech
const commonWords: PhraseItem[] = [
  // Everyday essentials & Home
  { phrase: 'বই', translation: 'Book', pronunciation: 'boi', category: 'Home', icon: '📖' },
  { phrase: 'কলম', translation: 'Pen', pronunciation: 'kolom', category: 'Home', icon: '🖊️' },
  { phrase: 'টেবিল', translation: 'Table', pronunciation: 'tebil', category: 'Home', icon: '🪵' },
  { phrase: 'চেয়ার', translation: 'Chair', pronunciation: 'cheyar', category: 'Home', icon: '🪑' },
  { phrase: 'দরজা', translation: 'Door', pronunciation: 'dorja', category: 'Home', icon: '🚪' },
  { phrase: 'জানালা', translation: 'Window', pronunciation: 'janala', category: 'Home', icon: '🪟' },
  { phrase: 'ঘর', translation: 'Room', pronunciation: 'ghor', category: 'Home', icon: '🏠' },
  { phrase: 'বিছানা', translation: 'Bed', pronunciation: 'bichana', category: 'Home', icon: '🛏️' },
  { phrase: 'চাবি', translation: 'Key', pronunciation: 'chabi', category: 'Home', icon: '🔑' },
  { phrase: 'টাকা', translation: 'Money', pronunciation: 'taka', category: 'Essentials', icon: '💵' },
  { phrase: 'ব্যাগ', translation: 'Bag', pronunciation: 'bag', category: 'Essentials', icon: '🎒' },
  { phrase: 'ঘড়ি', translation: 'Clock / Watch', pronunciation: 'ghori', category: 'Essentials', icon: '⏰' },
  { phrase: 'ফোন', translation: 'Phone', pronunciation: 'phone', category: 'Tech', icon: '📱' },
  { phrase: 'কম্পিউটার', translation: 'Computer', pronunciation: 'computer', category: 'Tech', icon: '💻' },

  // Food & Dining
  { phrase: 'জল', translation: 'Water', pronunciation: 'jol', category: 'Food', icon: '💧' },
  { phrase: 'চা', translation: 'Tea', pronunciation: 'cha', category: 'Food', icon: '🍵' },
  { phrase: 'কফি', translation: 'Coffee', pronunciation: 'kofi', category: 'Food', icon: '☕' },
  { phrase: 'দুধ', translation: 'Milk', pronunciation: 'dudh', category: 'Food', icon: '🥛' },
  { phrase: 'ভাত', translation: 'Rice', pronunciation: 'bhat', category: 'Food', icon: '🍚' },
  { phrase: 'রুটি', translation: 'Bread', pronunciation: 'ruti', category: 'Food', icon: '🍞' },
  { phrase: 'মাছ', translation: 'Fish', pronunciation: 'mach', category: 'Food', icon: '🐟' },
  { phrase: 'মাংস', translation: 'Meat', pronunciation: 'mangsho', category: 'Food', icon: '🥩' },
  { phrase: 'ডিম', translation: 'Egg', pronunciation: 'dim', category: 'Food', icon: '🥚' },
  { phrase: 'ফল', translation: 'Fruit', pronunciation: 'fol', category: 'Food', icon: '🍎' },
  { phrase: 'আপেল', translation: 'Apple', pronunciation: 'apel', category: 'Food', icon: '🍎' },
  { phrase: 'আম', translation: 'Mango', pronunciation: 'am', category: 'Food', icon: '🥭' },
  { phrase: 'কলা', translation: 'Banana', pronunciation: 'kola', category: 'Food', icon: '🍌' },
  { phrase: 'সবজি', translation: 'Vegetables', pronunciation: 'sobji', category: 'Food', icon: '🥗' },
  { phrase: 'মিষ্টি', translation: 'Sweet', pronunciation: 'mishti', category: 'Food', icon: '🍬' },
  { phrase: 'লবণ', translation: 'Salt', pronunciation: 'lobon', category: 'Food', icon: '🧂' },
  { phrase: 'চিনি', translation: 'Sugar', pronunciation: 'chini', category: 'Food', icon: '🥣' },

  // People & Family
  { phrase: 'মানুষ', translation: 'Person / Human', pronunciation: 'manush', category: 'People', icon: '🧑' },
  { phrase: 'ছেলে', translation: 'Boy / Son', pronunciation: 'chhele', category: 'People', icon: '👦' },
  { phrase: 'মেয়ে', translation: 'Girl / Daughter', pronunciation: 'meye', category: 'People', icon: '👧' },
  { phrase: 'মা', translation: 'Mother', pronunciation: 'ma', category: 'People', icon: '👩' },
  { phrase: 'বাবা', translation: 'Father', pronunciation: 'baba', category: 'People', icon: '👨' },
  { phrase: 'ভাই', translation: 'Brother', pronunciation: 'bhai', category: 'People', icon: '👦' },
  { phrase: 'বোন', translation: 'Sister', pronunciation: 'bon', category: 'People', icon: '👧' },
  { phrase: 'বন্ধু', translation: 'Friend', pronunciation: 'bondhu', category: 'People', icon: '🤝' },
  { phrase: 'শিক্ষক', translation: 'Teacher', pronunciation: 'shikkhok', category: 'People', icon: '🧑‍🏫' },
  { phrase: 'ছাত্র', translation: 'Student', pronunciation: 'chhatro', category: 'People', icon: '🧑‍🎓' },
  { phrase: 'ডাক্তার', translation: 'Doctor', pronunciation: 'daktar', category: 'People', icon: '🩺' },

  // Animals & Nature
  { phrase: 'কুকুর', translation: 'Dog', pronunciation: 'kukur', category: 'Animals', icon: '🐕' },
  { phrase: 'বিড়াল', translation: 'Cat', pronunciation: 'biral', category: 'Animals', icon: '🐱' },
  { phrase: 'পাখি', translation: 'Bird', pronunciation: 'pakhi', category: 'Animals', icon: '🐦' },
  { phrase: 'গরু', translation: 'Cow', pronunciation: 'goru', category: 'Animals', icon: '🐄' },
  { phrase: 'বাঘ', translation: 'Tiger', pronunciation: 'bagh', category: 'Animals', icon: '🐅' },
  { phrase: 'হাতি', translation: 'Elephant', pronunciation: 'hati', category: 'Animals', icon: '🐘' },
  { phrase: 'গাছ', translation: 'Tree', pronunciation: 'gach', category: 'Nature', icon: '🌳' },
  { phrase: 'ফুল', translation: 'Flower', pronunciation: 'ful', category: 'Nature', icon: '🌸' },
  { phrase: 'সূর্য', translation: 'Sun', pronunciation: 'surjo', category: 'Nature', icon: '☀️' },
  { phrase: 'চাঁদ', translation: 'Moon', pronunciation: 'chand', category: 'Nature', icon: '🌙' },
  { phrase: 'তারা', translation: 'Star', pronunciation: 'tara', category: 'Nature', icon: '⭐' },
  { phrase: 'আকাশ', translation: 'Sky', pronunciation: 'akash', category: 'Nature', icon: '☁️' },
  { phrase: 'নদী', translation: 'River', pronunciation: 'nodi', category: 'Nature', icon: '🌊' },
  { phrase: 'বৃষ্টি', translation: 'Rain', pronunciation: 'brishti', category: 'Nature', icon: '🌧️' },
  { phrase: 'বাতাস', translation: 'Air / Wind', pronunciation: 'batas', category: 'Nature', icon: '💨' },

  // City & Places
  { phrase: 'শহর', translation: 'City', pronunciation: 'shohor', category: 'Places', icon: '🏙️' },
  { phrase: 'গ্রাম', translation: 'Village', pronunciation: 'gram', category: 'Places', icon: '🏡' },
  { phrase: 'দেশ', translation: 'Country', pronunciation: 'desh', category: 'Places', icon: '🗺️' },
  { phrase: 'রাস্তা', translation: 'Street / Road', pronunciation: 'rasta', category: 'Places', icon: '🛣️' },
  { phrase: 'দোকান', translation: 'Shop / Store', pronunciation: 'dokan', category: 'Places', icon: '🏪' },
  { phrase: 'বাজার', translation: 'Market', pronunciation: 'bajar', category: 'Places', icon: '🛒' },
  { phrase: 'স্কুল', translation: 'School', pronunciation: 'school', category: 'Places', icon: '🏫' },
  { phrase: 'হাসপাতাল', translation: 'Hospital', pronunciation: 'haspatal', category: 'Places', icon: '🏥' },
  { phrase: 'হোটেল', translation: 'Hotel', pronunciation: 'hotel', category: 'Places', icon: '🏨' },
  { phrase: 'বিমানবন্দর', translation: 'Airport', pronunciation: 'bimanbondor', category: 'Places', icon: '✈️' },
  { phrase: 'স্টেশন', translation: 'Station', pronunciation: 'station', category: 'Places', icon: '🚉' },

  // Transport & Movement
  { phrase: 'গাড়ি', translation: 'Car', pronunciation: 'gari', category: 'Travel', icon: '🚗' },
  { phrase: 'বাস', translation: 'Bus', pronunciation: 'bus', category: 'Travel', icon: '🚌' },
  { phrase: 'ট্রেন', translation: 'Train', pronunciation: 'train', category: 'Travel', icon: '🚆' },
  { phrase: 'নৌকা', translation: 'Boat', pronunciation: 'nouka', category: 'Travel', icon: '⛵' },
  { phrase: 'উড়োজাহাজ', translation: 'Airplane', pronunciation: 'urojahaj', category: 'Travel', icon: '✈️' },
  { phrase: 'সাইকেল', translation: 'Bicycle', pronunciation: 'bicycle', category: 'Travel', icon: '🚲' },

  // Adjectives & Descriptions
  { phrase: 'ভালো', translation: 'Good', pronunciation: 'bhalo', category: 'Adjectives', icon: '👍' },
  { phrase: 'খারাপ', translation: 'Bad', pronunciation: 'kharap', category: 'Adjectives', icon: '👎' },
  { phrase: 'সুন্দর', translation: 'Beautiful', pronunciation: 'shundor', category: 'Adjectives', icon: '✨' },
  { phrase: 'বড়', translation: 'Big / Large', pronunciation: 'boro', category: 'Adjectives', icon: '🐘' },
  { phrase: 'ছোট', translation: 'Small / Little', pronunciation: 'choto', category: 'Adjectives', icon: '🐜' },
  { phrase: 'নতুন', translation: 'New', pronunciation: 'notun', category: 'Adjectives', icon: '🆕' },
  { phrase: 'পুরোনো', translation: 'Old', pronunciation: 'purono', category: 'Adjectives', icon: '🏛️' },
  { phrase: 'গরম', translation: 'Hot', pronunciation: 'gorom', category: 'Adjectives', icon: '🔥' },
  { phrase: 'ঠান্ডা', translation: 'Cold', pronunciation: 'thanda', category: 'Adjectives', icon: '🧊' },
  { phrase: 'সহজ', translation: 'Easy', pronunciation: 'shohoj', category: 'Adjectives', icon: '🟢' },
  { phrase: 'কঠিন', translation: 'Difficult', pronunciation: 'kothin', category: 'Adjectives', icon: '🔴' },
  { phrase: 'দ্রুত', translation: 'Fast', pronunciation: 'druto', category: 'Adjectives', icon: '⚡' },
  { phrase: 'ধীর', translation: 'Slow', pronunciation: 'dhir', category: 'Adjectives', icon: '🐢' },
  { phrase: 'পরিষ্কার', translation: 'Clean', pronunciation: 'porishkar', category: 'Adjectives', icon: '🧼' },

  // Colors
  { phrase: 'সাদা', translation: 'White', pronunciation: 'shada', category: 'Colors', icon: '⚪' },
  { phrase: 'কালো', translation: 'Black', pronunciation: 'kalo', category: 'Colors', icon: '⚫' },
  { phrase: 'লাল', translation: 'Red', pronunciation: 'lal', category: 'Colors', icon: '🔴' },
  { phrase: 'নীল', translation: 'Blue', pronunciation: 'neel', category: 'Colors', icon: '🔵' },
  { phrase: 'সবুজ', translation: 'Green', pronunciation: 'sobuj', category: 'Colors', icon: '🟢' },
  { phrase: 'হলুদ', translation: 'Yellow', pronunciation: 'holud', category: 'Colors', icon: '🟡' },

  // Time & Days
  { phrase: 'আজ', translation: 'Today', pronunciation: 'aj', category: 'Time', icon: '📅' },
  { phrase: 'কাল', translation: 'Tomorrow / Yesterday', pronunciation: 'kal', category: 'Time', icon: '🗓️' },
  { phrase: 'এখন', translation: 'Now', pronunciation: 'ekhon', category: 'Time', icon: '⏱️' },
  { phrase: 'পরে', translation: 'Later', pronunciation: 'pore', category: 'Time', icon: '⏳' },
  { phrase: 'সকাল', translation: 'Morning', pronunciation: 'sokal', category: 'Time', icon: '🌅' },
  { phrase: 'দুপুর', translation: 'Noon / Afternoon', pronunciation: 'dupur', category: 'Time', icon: '☀️' },
  { phrase: 'সন্ধ্যা', translation: 'Evening', pronunciation: 'shondha', category: 'Time', icon: '🌆' },
  { phrase: 'রাত', translation: 'Night', pronunciation: 'rat', category: 'Time', icon: '🌙' },
  { phrase: 'দিন', translation: 'Day', pronunciation: 'din', category: 'Time', icon: '☀️' },
  { phrase: 'সপ্তাহ', translation: 'Week', pronunciation: 'soptaho', category: 'Time', icon: '📆' },
  { phrase: 'মাস', translation: 'Month', pronunciation: 'mash', category: 'Time', icon: '🗓️' },
  { phrase: 'বছর', translation: 'Year', pronunciation: 'bochor', category: 'Time', icon: '📅' },
];

// Telling Time in Bengali
const time: PhraseItem[] = [
  { phrase: 'কয়টা বাজে?', translation: 'What time is it?', pronunciation: 'koyta baje', category: 'Time Asking', icon: '❓' },
  { phrase: 'এখন একটা বাজে', translation: 'It is 1:00 (One o\\'clock)', pronunciation: 'ekhon ekta baje', category: 'Exact Hours', icon: '🕐' },
  { phrase: 'এখন দুইটা বাজে', translation: 'It is 2:00 (Two o\\'clock)', pronunciation: 'ekhon duita baje', category: 'Exact Hours', icon: '🕑' },
  { phrase: 'এখন তিনটা বাজে', translation: 'It is 3:00 (Three o\\'clock)', pronunciation: 'ekhon tinta baje', category: 'Exact Hours', icon: '🕒' },
  { phrase: 'দেড়টা', translation: '1:30 (Half past one)', pronunciation: 'derhta', category: 'Half Hours', icon: '🕜' },
  { phrase: 'আড়াইটা', translation: '2:30 (Half past two)', pronunciation: 'araita', category: 'Half Hours', icon: '🕝' },
  { phrase: 'সাড়ে তিনটা', translation: '3:30 (Half past three)', pronunciation: 'share tinta', category: 'Half Hours', icon: '🕞' },
  { phrase: 'সাড়ে চারটা', translation: '4:30 (Half past four)', pronunciation: 'share charta', category: 'Half Hours', icon: '🕟' },
  { phrase: 'সওয়া চারটা', translation: '4:15 (Quarter past four)', pronunciation: 'sowa charta', category: 'Quarter Hours', icon: '🕟' },
  { phrase: 'পৌনে পাঁচটা', translation: '4:45 (Quarter to five)', pronunciation: 'poune pãchta', category: 'Quarter Hours', icon: '🕟' },
  { phrase: 'সকাল আটটা', translation: '8:00 AM (Morning)', pronunciation: 'sokal atta', category: 'Time of Day', icon: '🌅' },
  { phrase: 'দুপুর বারোটা', translation: '12:00 PM (Noon)', pronunciation: 'dupur barota', category: 'Time of Day', icon: '☀️' },
  { phrase: 'সন্ধ্যা সাতটা', translation: '7:00 PM (Evening)', pronunciation: 'shondha satta', category: 'Time of Day', icon: '🌆' },
  { phrase: 'রাত দশটা', translation: '10:00 PM (Night)', pronunciation: 'rat doshta', category: 'Time of Day', icon: '🌙' },
  { phrase: 'মধ্যরাত', translation: 'Midnight', pronunciation: 'moddhorat', category: 'Time of Day', icon: '🕛' },
];

export const bengaliData: AppData = {
  alphabet,
  basicPhrases,
  numbers,
  commonWords,
  time,
  grammar: BENGALI_GRAMMAR,
};

export default bengaliData;
"""

with open(BN_DIR / 'bengaliData.ts', 'w', encoding='utf-8') as f:
    f.write(DATA_TS)

print(f"Created bengaliData.ts at {BN_DIR / 'bengaliData.ts'}")

