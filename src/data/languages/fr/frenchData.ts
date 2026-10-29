import { AlphabetItem, PhraseItem, AppData } from '../../../types/index';

// French alphabet (26 standard letters with French pronunciation & phonetic examples)
const alphabet: AlphabetItem[] = [
  { letter: 'A', pronunciation: '/ɑ/', example: 'comme dans Ami', word: 'Ami', meaning: 'Friend', icon: '🧑‍🤝‍🧑' },
  { letter: 'B', pronunciation: '/be/', example: 'comme dans Bonjour', word: 'Bonjour', meaning: 'Hello / Good morning', icon: '👋' },
  { letter: 'C', pronunciation: '/se/', example: 'comme dans Café', word: 'Café', meaning: 'Coffee', icon: '☕' },
  { letter: 'D', pronunciation: '/de/', example: 'comme dans Demain', word: 'Demain', meaning: 'Tomorrow', icon: '🌅' },
  { letter: 'E', pronunciation: '/ə/', example: 'comme dans Eau', word: 'Eau', meaning: 'Water', icon: '💧' },
  { letter: 'F', pronunciation: '/ɛf/', example: 'comme dans Famille', word: 'Famille', meaning: 'Family', icon: '👨‍👩‍👧' },
  { letter: 'G', pronunciation: '/ʒe/', example: 'comme dans Gare', word: 'Gare', meaning: 'Train Station', icon: '🚉' },
  { letter: 'H', pronunciation: '/aʃ/ (muet)', example: 'comme dans Hôtel (silent)', word: 'Hôtel', meaning: 'Hotel', icon: '🏨' },
  { letter: 'I', pronunciation: '/i/', example: 'comme dans Idée', word: 'Idée', meaning: 'Idea', icon: '💡' },
  { letter: 'J', pronunciation: '/ʒi/', example: 'comme dans Jour', word: 'Jour', meaning: 'Day', icon: '☀️' },
  { letter: 'K', pronunciation: '/ka/', example: 'comme dans Kilo', word: 'Kilo', meaning: 'Kilogram', icon: '⚖️' },
  { letter: 'L', pronunciation: '/ɛl/', example: 'comme dans Livre', word: 'Livre', meaning: 'Book', icon: '📖' },
  { letter: 'M', pronunciation: '/ɛm/', example: 'comme dans Maison', word: 'Maison', meaning: 'House', icon: '🏠' },
  { letter: 'N', pronunciation: '/ɛn/', example: 'comme dans Nuit', word: 'Nuit', meaning: 'Night', icon: '🌙' },
  { letter: 'O', pronunciation: '/o/', example: 'comme dans Oui', word: 'Oui', meaning: 'Yes', icon: '✅' },
  { letter: 'P', pronunciation: '/pe/', example: 'comme dans Pain', word: 'Pain', meaning: 'Bread', icon: '🥖' },
  { letter: 'Q', pronunciation: '/ky/', example: 'comme dans Question', word: 'Question', meaning: 'Question', icon: '❓' },
  { letter: 'R', pronunciation: '/ɛʁ/ (guttural)', example: 'comme dans Rue', word: 'Rue', meaning: 'Street', icon: '🛣️' },
  { letter: 'S', pronunciation: '/ɛs/', example: 'comme dans Soleil', word: 'Soleil', meaning: 'Sun', icon: '☀️' },
  { letter: 'T', pronunciation: '/te/', example: 'comme dans Travail', word: 'Travail', meaning: 'Work', icon: '💼' },
  { letter: 'U', pronunciation: '/y/', example: 'comme dans Un', word: 'Un', meaning: 'One', icon: '1️⃣' },
  { letter: 'V', pronunciation: '/ve/', example: 'comme dans Ville', word: 'Ville', meaning: 'City', icon: '🏙️' },
  { letter: 'W', pronunciation: '/dubləve/', example: 'comme dans Wagon', word: 'Wagon', meaning: 'Wagon / Car', icon: '🚃' },
  { letter: 'X', pronunciation: '/iks/', example: 'comme dans Exemple', word: 'Exemple', meaning: 'Example', icon: '📝' },
  { letter: 'Y', pronunciation: '/iɡʁɛk/', example: 'comme dans Yeux', word: 'Yeux', meaning: 'Eyes', icon: '👀' },
  { letter: 'Z', pronunciation: '/zɛd/', example: 'comme dans Zéro', word: 'Zéro', meaning: 'Zero', icon: '0️⃣' },
];

// Essential French phrases
const basicPhrases: PhraseItem[] = [
  { phrase: 'Bonjour', translation: 'Hello / Good morning', pronunciation: 'bohn-ZHOOR', category: 'Greetings', icon: '👋' },
  { phrase: 'Bonsoir', translation: 'Good evening', pronunciation: 'bohn-SWAHR', category: 'Greetings', icon: '🌆' },
  { phrase: 'Salut', translation: 'Hi / Bye (informal)', pronunciation: 'sah-LOO', category: 'Greetings', icon: '🤙' },
  { phrase: 'Comment allez-vous ?', translation: 'How are you? (formal)', pronunciation: 'koh-mahn tah-lay VOO', category: 'Conversation', icon: '👔' },
  { phrase: 'Ça va ?', translation: 'How are you? / Doing okay? (informal)', pronunciation: 'sah VAH', category: 'Conversation', icon: '❓' },
  { phrase: 'Ça va bien, merci', translation: 'I am doing well, thank you', pronunciation: 'sah vah BYAHN, mair-SEE', category: 'Conversation', icon: '😊' },
  { phrase: 'Et vous ?', translation: 'And you? (formal)', pronunciation: 'ay VOO', category: 'Conversation', icon: '👉' },
  { phrase: 'S\'il vous plaît', translation: 'Please (formal)', pronunciation: 'seel voo PLEH', category: 'Politeness', icon: '🙏' },
  { phrase: 'Merci beaucoup', translation: 'Thank you very much', pronunciation: 'mair-SEE boh-KOO', category: 'Politeness', icon: '✨' },
  { phrase: 'De rien / Je vous en prie', translation: 'You are welcome', pronunciation: 'duh RYEHN / zhuh voo zahn PREE', category: 'Politeness', icon: '👍' },
  { phrase: 'Excusez-moi / Pardon', translation: 'Excuse me / Sorry', pronunciation: 'ex-kew-zay MWAH / pahr-DOHN', category: 'Politeness', icon: '🙇' },
  { phrase: 'Comment vous appelez-vous ?', translation: 'What is your name? (formal)', pronunciation: 'koh-mahn voo zah-play VOO', category: 'Introductions', icon: '🏷️' },
  { phrase: 'Je m\'appelle...', translation: 'My name is...', pronunciation: 'zhuh mah-PELL...', category: 'Introductions', icon: '🙋' },
  { phrase: 'Enchanté(e)', translation: 'Pleased to meet you', pronunciation: 'ahn-shahn-TAY', category: 'Introductions', icon: '🤝' },
  { phrase: 'Où sont les toilettes ?', translation: 'Where are the restrooms?', pronunciation: 'oo sohn lay twah-LETT', category: 'Travel', icon: '🚻' },
  { phrase: 'Combien ça coûte ?', translation: 'How much does it cost?', pronunciation: 'kohm-BYEHN sah KOOT', category: 'Shopping', icon: '💰' },
  { phrase: 'L\'addition, s\'il vous plaît', translation: 'The bill / check, please', pronunciation: 'lah-dee-SYOHN seel voo PLEH', category: 'Dining', icon: '🧾' },
  { phrase: 'Parlez-vous anglais ?', translation: 'Do you speak English?', pronunciation: 'pahr-lay voo zahn-GLEH', category: 'Conversation', icon: '🗣️' },
  { phrase: 'Je ne comprends pas', translation: 'I do not understand', pronunciation: 'zhuh nuh kohm-PRAHN pah', category: 'Conversation', icon: '🤔' },
  { phrase: 'Pouvez-vous répéter ?', translation: 'Can you repeat?', pronunciation: 'poo-vay voo ray-pay-TAY', category: 'Conversation', icon: '🔄' },
  { phrase: 'À bientôt', translation: 'See you soon', pronunciation: 'ah byehn-TOH', category: 'Farewells', icon: '👋' },
  { phrase: 'Au revoir', translation: 'Goodbye', pronunciation: 'oh ruh-VWAHR', category: 'Farewells', icon: '🚪' },
];

// French numbers
const numbers: PhraseItem[] = [
  { phrase: 'Zéro', translation: '0 (Zero)', pronunciation: 'zay-ROH', category: 'Numbers 0-10', icon: '0️⃣' },
  { phrase: 'Un', translation: '1 (One)', pronunciation: 'ahn', category: 'Numbers 0-10', icon: '1️⃣' },
  { phrase: 'Deux', translation: '2 (Two)', pronunciation: 'duh', category: 'Numbers 0-10', icon: '2️⃣' },
  { phrase: 'Trois', translation: '3 (Three)', pronunciation: 'trwah', category: 'Numbers 0-10', icon: '3️⃣' },
  { phrase: 'Quatre', translation: '4 (Four)', pronunciation: 'KAT-ruh', category: 'Numbers 0-10', icon: '4️⃣' },
  { phrase: 'Cinq', translation: '5 (Five)', pronunciation: 'sank', category: 'Numbers 0-10', icon: '5️⃣' },
  { phrase: 'Six', translation: '6 (Six)', pronunciation: 'sees', category: 'Numbers 0-10', icon: '6️⃣' },
  { phrase: 'Sept', translation: '7 (Seven)', pronunciation: 'set', category: 'Numbers 0-10', icon: '7️⃣' },
  { phrase: 'Huit', translation: '8 (Eight)', pronunciation: 'weet', category: 'Numbers 0-10', icon: '8️⃣' },
  { phrase: 'Neuf', translation: '9 (Nine)', pronunciation: 'nuf', category: 'Numbers 0-10', icon: '9️⃣' },
  { phrase: 'Dix', translation: '10 (Ten)', pronunciation: 'dees', category: 'Numbers 0-10', icon: '🔟' },
  { phrase: 'Onze', translation: '11 (Eleven)', pronunciation: 'ohnz', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'Douze', translation: '12 (Twelve)', pronunciation: 'dooz', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'Treize', translation: '13 (Thirteen)', pronunciation: 'trehz', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'Quatorze', translation: '14 (Fourteen)', pronunciation: 'kah-TOHRZ', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'Quinze', translation: '15 (Fifteen)', pronunciation: 'kanz', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'Seize', translation: '16 (Sixteen)', pronunciation: 'sehz', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'Dix-sept', translation: '17 (Seventeen)', pronunciation: 'dee-SET', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'Dix-huit', translation: '18 (Eighteen)', pronunciation: 'deez-WEET', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'Dix-neuf', translation: '19 (Nineteen)', pronunciation: 'deez-NUF', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'Vingt', translation: '20 (Twenty)', pronunciation: 'vahn', category: 'Tens', icon: '🔢' },
  { phrase: 'Trente', translation: '30 (Thirty)', pronunciation: 'trahnt', category: 'Tens', icon: '🔢' },
  { phrase: 'Quarante', translation: '40 (Forty)', pronunciation: 'kah-RAHNT', category: 'Tens', icon: '🔢' },
  { phrase: 'Cinquante', translation: '50 (Fifty)', pronunciation: 'san-KAHNT', category: 'Tens', icon: '🔢' },
  { phrase: 'Soixante', translation: '60 (Sixty)', pronunciation: 'swah-SAHNT', category: 'Tens', icon: '🔢' },
  { phrase: 'Soixante-dix', translation: '70 (Seventy)', pronunciation: 'swah-sahnt-DEES', category: 'Tens', icon: '🔢' },
  { phrase: 'Quatre-vingts', translation: '80 (Eighty)', pronunciation: 'kat-ruh-VAHN', category: 'Tens', icon: '🔢' },
  { phrase: 'Quatre-vingt-dix', translation: '90 (Ninety)', pronunciation: 'kat-ruh-vahn-DEES', category: 'Tens', icon: '🔢' },
  { phrase: 'Cent', translation: '100 (One Hundred)', pronunciation: 'sahn', category: 'Hundreds', icon: '💯' },
  { phrase: 'Mille', translation: '1,000 (One Thousand)', pronunciation: 'meel', category: 'Thousands', icon: '🏆' },
];

// Common French words
const commonWords: PhraseItem[] = [
  { phrase: 'Oui', translation: 'Yes', pronunciation: 'wee', category: 'Essentials', icon: '✅' },
  { phrase: 'Non', translation: 'No', pronunciation: 'nohn', category: 'Essentials', icon: '❌' },
  { phrase: 'Eau', translation: 'Water', pronunciation: 'oh', category: 'Food & Drink', icon: '💧' },
  { phrase: 'Nourriture', translation: 'Food', pronunciation: 'noo-ree-TYOOR', category: 'Food & Drink', icon: '🍲' },
  { phrase: 'Café', translation: 'Coffee', pronunciation: 'kah-FAY', category: 'Food & Drink', icon: '☕' },
  { phrase: 'Temps', translation: 'Time / Weather', pronunciation: 'tahn', category: 'Time', icon: '⏱️' },
  { phrase: 'Aujourd\'hui', translation: 'Today', pronunciation: 'oh-zhoor-DWEE', category: 'Time', icon: '📅' },
  { phrase: 'Demain', translation: 'Tomorrow', pronunciation: 'duh-MAHN', category: 'Time', icon: '🌅' },
  { phrase: 'Hier', translation: 'Yesterday', pronunciation: 'yehr', category: 'Time', icon: '⏮️' },
  { phrase: 'Travail', translation: 'Work / Job', pronunciation: 'trah-VAHY', category: 'Work', icon: '💼' },
  { phrase: 'Bureau', translation: 'Office / Desk', pronunciation: 'bew-ROH', category: 'Work', icon: '🏢' },
  { phrase: 'Argent', translation: 'Money / Silver', pronunciation: 'ahr-ZHAHN', category: 'Finance', icon: '💵' },
  { phrase: 'Aide', translation: 'Help', pronunciation: 'ehd', category: 'Essentials', icon: '🆘' },
  { phrase: 'Ami', translation: 'Friend', pronunciation: 'ah-MEE', category: 'People', icon: '🧑‍🤝‍🧑' },
  { phrase: 'Famille', translation: 'Family', pronunciation: 'fah-MEE-yuh', category: 'People', icon: '👨‍👩‍👧' },
  { phrase: 'Maison', translation: 'House / Home', pronunciation: 'meh-ZOHN', category: 'Places', icon: '🏠' },
  { phrase: 'Ville', translation: 'City', pronunciation: 'veel', category: 'Places', icon: '🏙️' },
  { phrase: 'Pays', translation: 'Country', pronunciation: 'pay-EE', category: 'Places', icon: '🗺️' },
  { phrase: 'Voiture', translation: 'Car', pronunciation: 'vwah-TYOOR', category: 'Transport', icon: '🚗' },
  { phrase: 'Train', translation: 'Train', pronunciation: 'trahn', category: 'Transport', icon: '🚆' },
];

// Telling time in French
const time: PhraseItem[] = [
  { phrase: 'Quelle heure est-il ?', translation: 'What time is it?', pronunciation: 'kell er eh-teel', category: 'Questions', icon: '⌚' },
  { phrase: 'Il est une heure pile', translation: 'It is one o\'clock on the dot', pronunciation: 'eel eh oon er peel', category: 'Hour', icon: '🕐' },
  { phrase: 'Il est deux heures', translation: 'It is two o\'clock', pronunciation: 'eel eh duh zer', category: 'Hour', icon: '🕑' },
  { phrase: 'Il est trois heures et demie', translation: 'It is 3:30 (half past three)', pronunciation: 'eel eh trwah zer ay duh-MEE', category: 'Minutes', icon: '🕞' },
  { phrase: 'Il est quatre heures et quart', translation: 'It is 4:15 (quarter past four)', pronunciation: 'eel eh kat-rer ay KAR', category: 'Minutes', icon: '🕓' },
  { phrase: 'Il est cinq heures moins le quart', translation: 'It is 4:45 (quarter to five)', pronunciation: 'eel eh san-ker mwan luh KAR', category: 'Minutes', icon: '🕟' },
  { phrase: 'Midi', translation: 'Noon / Midday', pronunciation: 'mee-DEE', category: 'Special', icon: '🕛' },
  { phrase: 'Minuit', translation: 'Midnight', pronunciation: 'mee-NWEE', category: 'Special', icon: '🌙' },
];

const frenchData: AppData = {
  alphabet,
  basicPhrases,
  numbers,
  commonWords,
  time,
};

export default frenchData;

