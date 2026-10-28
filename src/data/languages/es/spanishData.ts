import { AlphabetItem, PhraseItem, AppData } from '../../../types/index';

// Spanish alphabet (27 letters including Ñ) with pronunciation and examples
const alphabet: AlphabetItem[] = [
  { letter: 'A', pronunciation: '/a/', example: 'as in Amor', word: 'Amor', meaning: 'Love', icon: '❤️' },
  { letter: 'B', pronunciation: '/be/', example: 'as in Barco', word: 'Barco', meaning: 'Boat', icon: '⛵' },
  { letter: 'C', pronunciation: '/se/ or /k/', example: 'as in Casa', word: 'Casa', meaning: 'House', icon: '🏠' },
  { letter: 'D', pronunciation: '/de/', example: 'as in Día', word: 'Día', meaning: 'Day', icon: '☀️' },
  { letter: 'E', pronunciation: '/e/', example: 'as in Estrella', word: 'Estrella', meaning: 'Star', icon: '⭐' },
  { letter: 'F', pronunciation: '/efe/', example: 'as in Familia', word: 'Familia', meaning: 'Family', icon: '👨‍👩‍👧' },
  { letter: 'G', pronunciation: '/xe/ or /g/', example: 'as in Gato', word: 'Gato', meaning: 'Cat', icon: '🐱' },
  { letter: 'H', pronunciation: 'silent /atʃe/', example: 'as in Hola (silent)', word: 'Hola', meaning: 'Hello', icon: '👋' },
  { letter: 'I', pronunciation: '/i/', example: 'as in Isla', word: 'Isla', meaning: 'Island', icon: '🏝️' },
  { letter: 'J', pronunciation: '/xota/ (like English H)', example: 'as in Jugo', word: 'Jugo', meaning: 'Juice', icon: '🧃' },
  { letter: 'K', pronunciation: '/ka/', example: 'as in Kilo', word: 'Kilo', meaning: 'Kilogram', icon: '⚖️' },
  { letter: 'L', pronunciation: '/ele/', example: 'as in Libro', word: 'Libro', meaning: 'Book', icon: '📖' },
  { letter: 'M', pronunciation: '/eme/', example: 'as in Manzana', word: 'Manzana', meaning: 'Apple', icon: '🍎' },
  { letter: 'N', pronunciation: '/ene/', example: 'as in Noche', word: 'Noche', meaning: 'Night', icon: '🌙' },
  { letter: 'Ñ', pronunciation: '/eɲe/ (ny sound)', example: 'as in Niño', word: 'Niño', meaning: 'Boy / Child', icon: '🧒' },
  { letter: 'O', pronunciation: '/o/', example: 'as in Ojo', word: 'Ojo', meaning: 'Eye', icon: '👁️' },
  { letter: 'P', pronunciation: '/pe/', example: 'as in Perro', word: 'Perro', meaning: 'Dog', icon: '🐶' },
  { letter: 'Q', pronunciation: '/ku/', example: 'as in Queso', word: 'Queso', meaning: 'Cheese', icon: '🧀' },
  { letter: 'R', pronunciation: '/eɾe/ (trilled)', example: 'as in Reloj', word: 'Reloj', meaning: 'Clock / Watch', icon: '⏰' },
  { letter: 'S', pronunciation: '/ese/', example: 'as in Sol', word: 'Sol', meaning: 'Sun', icon: '☀️' },
  { letter: 'T', pronunciation: '/te/', example: 'as in Trabajo', word: 'Trabajo', meaning: 'Work / Job', icon: '💼' },
  { letter: 'U', pronunciation: '/u/', example: 'as in Uva', word: 'Uva', meaning: 'Grape', icon: '🍇' },
  { letter: 'V', pronunciation: '/ube/', example: 'as in Vaso', word: 'Vaso', meaning: 'Glass (cup)', icon: '🥛' },
  { letter: 'W', pronunciation: '/doble u/', example: 'as in Web', word: 'Web', meaning: 'Web', icon: '🌐' },
  { letter: 'X', pronunciation: '/ekis/', example: 'as in Éxito', word: 'Éxito', meaning: 'Success', icon: '🎯' },
  { letter: 'Y', pronunciation: '/i griega/', example: 'as in Yema', word: 'Yema', meaning: 'Yolk', icon: '🍳' },
  { letter: 'Z', pronunciation: '/theta/ or /se/', example: 'as in Zapato', word: 'Zapato', meaning: 'Shoe', icon: '👞' },
];

// Essential Spanish phrases
const basicPhrases: PhraseItem[] = [
  { phrase: '¡Hola!', translation: 'Hello! / Hi!', pronunciation: 'OH-lah', category: 'Greetings', icon: '👋' },
  { phrase: 'Buenos días', translation: 'Good morning', pronunciation: 'BWEH-nohs DEE-ahs', category: 'Greetings', icon: '🌅' },
  { phrase: 'Buenas tardes', translation: 'Good afternoon', pronunciation: 'BWEH-nahs TAHR-dehs', category: 'Greetings', icon: '☀️' },
  { phrase: 'Buenas noches', translation: 'Good evening / Good night', pronunciation: 'BWEH-nahs NOH-chehs', category: 'Greetings', icon: '🌙' },
  { phrase: '¿Cómo estás?', translation: 'How are you? (informal)', pronunciation: 'KOH-moh ehs-TAHS', category: 'Conversation', icon: '❓' },
  { phrase: '¿Cómo está usted?', translation: 'How are you? (formal)', pronunciation: 'KOH-moh ehs-TAH oos-TEHD', category: 'Conversation', icon: '👔' },
  { phrase: 'Muy bien, gracias', translation: 'Very well, thank you', pronunciation: 'mwee byehn, GRAH-syahs', category: 'Conversation', icon: '😊' },
  { phrase: '¿Y tú?', translation: 'And you?', pronunciation: 'ee too', category: 'Conversation', icon: '👉' },
  { phrase: 'Por favor', translation: 'Please', pronunciation: 'pohr fah-BVOHR', category: 'Politeness', icon: '🙏' },
  { phrase: 'Muchas gracias', translation: 'Thank you very much', pronunciation: 'MOO-chahs GRAH-syahs', category: 'Politeness', icon: '✨' },
  { phrase: 'De nada', translation: 'You are welcome', pronunciation: 'deh NAH-dah', category: 'Politeness', icon: '👍' },
  { phrase: 'Disculpe / Con permiso', translation: 'Excuse me', pronunciation: 'dees-KOOL-peh / kohn pehr-MEE-soh', category: 'Politeness', icon: '🙇' },
  { phrase: 'Lo siento / Perdón', translation: 'I am sorry', pronunciation: 'loh SYEHN-toh / pehr-DOHN', category: 'Politeness', icon: '😔' },
  { phrase: '¿Cómo te llamas?', translation: 'What is your name?', pronunciation: 'KOH-moh teh YAH-mahs', category: 'Introductions', icon: '🏷️' },
  { phrase: 'Me llamo...', translation: 'My name is...', pronunciation: 'meh YAH-moh...', category: 'Introductions', icon: '🙋' },
  { phrase: 'Mucho gusto / Encantado', translation: 'Nice to meet you', pronunciation: 'MOO-choh GOOS-toh', category: 'Introductions', icon: '🤝' },
  { phrase: '¿Dónde está el baño?', translation: 'Where is the restroom?', pronunciation: 'DOHN-deh ehs-TAH ehl BAH-nyoh', category: 'Travel', icon: '🚻' },
  { phrase: '¿Cuánto cuesta?', translation: 'How much does it cost?', pronunciation: 'KWAHN-toh KWEHS-tah', category: 'Shopping', icon: '💰' },
  { phrase: 'La cuenta, por favor', translation: 'The bill / check, please', pronunciation: 'lah KWEHN-tah pohr fah-BVOHR', category: 'Dining', icon: '🧾' },
  { phrase: '¿Habla inglés?', translation: 'Do you speak English?', pronunciation: 'AH-blah een-GLEHS', category: 'Conversation', icon: '🗣️' },
  { phrase: 'No entiendo', translation: 'I do not understand', pronunciation: 'noh ehn-TYEHN-doh', category: 'Conversation', icon: '🤔' },
  { phrase: '¿Puede repetir, por favor?', translation: 'Can you repeat, please?', pronunciation: 'PWEH-deh reh-peh-TEER pohr fah-BVOHR', category: 'Conversation', icon: '🔄' },
  { phrase: 'Hasta luego', translation: 'See you later', pronunciation: 'AHS-tah LWEH-goh', category: 'Farewells', icon: '👋' },
  { phrase: 'Adiós', translation: 'Goodbye', pronunciation: 'ah-DYOHS', category: 'Farewells', icon: '🚪' },
];

// Spanish numbers
const numbers: PhraseItem[] = [
  { phrase: 'Cero', translation: '0 (Zero)', pronunciation: 'SEH-roh', category: 'Numbers 0-10', icon: '0️⃣' },
  { phrase: 'Uno', translation: '1 (One)', pronunciation: 'OO-noh', category: 'Numbers 0-10', icon: '1️⃣' },
  { phrase: 'Dos', translation: '2 (Two)', pronunciation: 'dohs', category: 'Numbers 0-10', icon: '2️⃣' },
  { phrase: 'Tres', translation: '3 (Three)', pronunciation: 'trehs', category: 'Numbers 0-10', icon: '3️⃣' },
  { phrase: 'Cuatro', translation: '4 (Four)', pronunciation: 'KWAH-troh', category: 'Numbers 0-10', icon: '4️⃣' },
  { phrase: 'Cinco', translation: '5 (Five)', pronunciation: 'SEEN-koh', category: 'Numbers 0-10', icon: '5️⃣' },
  { phrase: 'Seis', translation: '6 (Six)', pronunciation: 'seh-ees', category: 'Numbers 0-10', icon: '6️⃣' },
  { phrase: 'Siete', translation: '7 (Seven)', pronunciation: 'SYEH-teh', category: 'Numbers 0-10', icon: '7️⃣' },
  { phrase: 'Ocho', translation: '8 (Eight)', pronunciation: 'OH-choh', category: 'Numbers 0-10', icon: '8️⃣' },
  { phrase: 'Nueve', translation: '9 (Nine)', pronunciation: 'NWEH-bveh', category: 'Numbers 0-10', icon: '9️⃣' },
  { phrase: 'Diez', translation: '10 (Ten)', pronunciation: 'dyehs', category: 'Numbers 0-10', icon: '🔟' },
  { phrase: 'Once', translation: '11 (Eleven)', pronunciation: 'OHN-seh', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'Doce', translation: '12 (Twelve)', pronunciation: 'DOH-seh', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'Trece', translation: '13 (Thirteen)', pronunciation: 'TREH-seh', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'Catorce', translation: '14 (Fourteen)', pronunciation: 'kah-TOHR-seh', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'Quince', translation: '15 (Fifteen)', pronunciation: 'KEEN-seh', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'Dieciséis', translation: '16 (Sixteen)', pronunciation: 'dyehs-ee-SEH-ees', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'Diecisiete', translation: '17 (Seventeen)', pronunciation: 'dyehs-ee-SYEH-teh', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'Dieciocho', translation: '18 (Eighteen)', pronunciation: 'dyehs-ee-OH-choh', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'Diecinueve', translation: '19 (Nineteen)', pronunciation: 'dyehs-ee-NWEH-bveh', category: 'Numbers 11-20', icon: '🔢' },
  { phrase: 'Veinte', translation: '20 (Twenty)', pronunciation: 'BAYN-teh', category: 'Tens', icon: '🔢' },
  { phrase: 'Treinta', translation: '30 (Thirty)', pronunciation: 'TRAYN-tah', category: 'Tens', icon: '🔢' },
  { phrase: 'Cuarenta', translation: '40 (Forty)', pronunciation: 'kwah-REHN-tah', category: 'Tens', icon: '🔢' },
  { phrase: 'Cincuenta', translation: '50 (Fifty)', pronunciation: 'seen-KWEHN-tah', category: 'Tens', icon: '🔢' },
  { phrase: 'Cien', translation: '100 (One Hundred)', pronunciation: 'syehn', category: 'Hundreds', icon: '💯' },
  { phrase: 'Mil', translation: '1,000 (One Thousand)', pronunciation: 'meel', category: 'Thousands', icon: '🏆' },
];

// Common Spanish words
const commonWords: PhraseItem[] = [
  { phrase: 'Sí', translation: 'Yes', pronunciation: 'see', category: 'Essentials', icon: '✅' },
  { phrase: 'No', translation: 'No', pronunciation: 'noh', category: 'Essentials', icon: '❌' },
  { phrase: 'Agua', translation: 'Water', pronunciation: 'AH-gwah', category: 'Food & Drink', icon: '💧' },
  { phrase: 'Comida', translation: 'Food / Meal', pronunciation: 'koh-MEE-dah', category: 'Food & Drink', icon: '🍲' },
  { phrase: 'Café', translation: 'Coffee', pronunciation: 'kah-FEH', category: 'Food & Drink', icon: '☕' },
  { phrase: 'Tiempo', translation: 'Time / Weather', pronunciation: 'TYEHM-poh', category: 'Time', icon: '⏱️' },
  { phrase: 'Hoy', translation: 'Today', pronunciation: 'oy', category: 'Time', icon: '📅' },
  { phrase: 'Mañana', translation: 'Tomorrow / Morning', pronunciation: 'mah-NYAH-nah', category: 'Time', icon: '🌅' },
  { phrase: 'Ayer', translation: 'Yesterday', pronunciation: 'ah-YEHR', category: 'Time', icon: '⏮️' },
  { phrase: 'Trabajo', translation: 'Work / Job', pronunciation: 'trah-BAH-hoh', category: 'Work', icon: '💼' },
  { phrase: 'Oficina', translation: 'Office', pronunciation: 'oh-fee-SEE-nah', category: 'Work', icon: '🏢' },
  { phrase: 'Dinero', translation: 'Money', pronunciation: 'dee-NEH-roh', category: 'Finance', icon: '💵' },
  { phrase: 'Ayuda', translation: 'Help', pronunciation: 'ah-YOO-dah', category: 'Essentials', icon: '🆘' },
  { phrase: 'Amigo', translation: 'Friend', pronunciation: 'ah-MEE-goh', category: 'People', icon: '🧑‍🤝‍🧑' },
  { phrase: 'Familia', translation: 'Family', pronunciation: 'fah-MEE-lyah', category: 'People', icon: '👨‍👩‍👧' },
  { phrase: 'Casa', translation: 'Home / House', pronunciation: 'KAH-sah', category: 'Places', icon: '🏠' },
  { phrase: 'Ciudad', translation: 'City', pronunciation: 'syoo-DAHD', category: 'Places', icon: '🏙️' },
  { phrase: 'País', translation: 'Country', pronunciation: 'pah-EES', category: 'Places', icon: '🗺️' },
  { phrase: 'Carro / Coche', translation: 'Car', pronunciation: 'KAH-rroh / KOH-cheh', category: 'Transport', icon: '🚗' },
  { phrase: 'Tren', translation: 'Train', pronunciation: 'trehn', category: 'Transport', icon: '🚆' },
];

// Telling time in Spanish
const time: PhraseItem[] = [
  { phrase: '¿Qué hora es?', translation: 'What time is it?', pronunciation: 'keh OH-rah ehs', category: 'Questions', icon: '⌚' },
  { phrase: 'Es la una en punto', translation: 'It is one o\'clock on the dot', pronunciation: 'ehs lah OO-nah ehn POON-toh', category: 'Hour', icon: '🕐' },
  { phrase: 'Son las dos', translation: 'It is two o\'clock', pronunciation: 'sohn lahs dohs', category: 'Hour', icon: '🕑' },
  { phrase: 'Son las tres y media', translation: 'It is 3:30 (half past three)', pronunciation: 'sohn lahs trehs ee MEH-dyah', category: 'Minutes', icon: '🕞' },
  { phrase: 'Son las cuatro y cuarto', translation: 'It is 4:15 (quarter past four)', pronunciation: 'sohn lahs KWAH-troh ee KWAHR-toh', category: 'Minutes', icon: '🕓' },
  { phrase: 'Son las cinco menos cuarto', translation: 'It is 4:45 (quarter to five)', pronunciation: 'sohn lahs SEEN-koh MEH-nohs KWAHR-toh', category: 'Minutes', icon: '🕟' },
  { phrase: 'Mediodía', translation: 'Noon / Midday', pronunciation: 'meh-dyoh-DEE-ah', category: 'Special', icon: '🕛' },
  { phrase: 'Medianoche', translation: 'Midnight', pronunciation: 'meh-dyah-NOH-cheh', category: 'Special', icon: '🌙' },
];

const spanishData: AppData = {
  alphabet,
  basicPhrases,
  numbers,
  commonWords,
  time,
};

export default spanishData;

