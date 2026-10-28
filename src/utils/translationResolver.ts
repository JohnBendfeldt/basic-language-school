import { SupportedLanguageId } from '../data/languages/types';
import { PhraseItem } from '../types/index';
import { CONCEPT_MATRIX } from '../data/conceptMatrix';

export interface NumberMapping {
  digit: number;
  en: string;
  es: string;
  fr: string;
  ru: string;
  allWords: string[];
}

export const NUMBER_TABLE: Record<number, NumberMapping> = {
  0: { digit: 0, en: 'Zero', es: 'Cero', fr: 'Zéro', ru: 'Ноль', allWords: ['zero', 'cero', 'zéro', 'ноль', 'нуль', '0'] },
  1: { digit: 1, en: 'One', es: 'Uno', fr: 'Un', ru: 'Один', allWords: ['one', 'uno', 'una', 'un', 'une', 'один', 'одна', 'одно', '1'] },
  2: { digit: 2, en: 'Two', es: 'Dos', fr: 'Deux', ru: 'Два', allWords: ['two', 'dos', 'deux', 'два', 'две', '2'] },
  3: { digit: 3, en: 'Three', es: 'Tres', fr: 'Trois', ru: 'Три', allWords: ['three', 'tres', 'trois', 'три', '3'] },
  4: { digit: 4, en: 'Four', es: 'Cuatro', fr: 'Quatre', ru: 'Четыре', allWords: ['four', 'cuatro', 'quatre', 'четыре', '4'] },
  5: { digit: 5, en: 'Five', es: 'Cinco', fr: 'Cinq', ru: 'Пять', allWords: ['five', 'cinco', 'cinq', 'пять', '5'] },
  6: { digit: 6, en: 'Six', es: 'Seis', fr: 'Six', ru: 'Шесть', allWords: ['six', 'seis', 'шесть', '6'] },
  7: { digit: 7, en: 'Seven', es: 'Siete', fr: 'Sept', ru: 'Семь', allWords: ['seven', 'siete', 'sept', 'семь', '7'] },
  8: { digit: 8, en: 'Eight', es: 'Ocho', fr: 'Huit', ru: 'Восемь', allWords: ['eight', 'ocho', 'huit', 'восемь', '8'] },
  9: { digit: 9, en: 'Nine', es: 'Nueve', fr: 'Neuf', ru: 'Девять', allWords: ['nine', 'nueve', 'neuf', 'девять', '9'] },
  10: { digit: 10, en: 'Ten', es: 'Diez', fr: 'Dix', ru: 'Десять', allWords: ['ten', 'diez', 'dix', 'десять', '10'] },
  11: { digit: 11, en: 'Eleven', es: 'Once', fr: 'Onze', ru: 'Одиннадцать', allWords: ['eleven', 'once', 'onze', 'одиннадцать', '11'] },
  12: { digit: 12, en: 'Twelve', es: 'Doce', fr: 'Douze', ru: 'Двенадцать', allWords: ['twelve', 'doce', 'douze', 'двенадцать', '12'] },
  13: { digit: 13, en: 'Thirteen', es: 'Trece', fr: 'Treize', ru: 'Тринадцать', allWords: ['thirteen', 'trece', 'treize', 'тринадцать', '13'] },
  14: { digit: 14, en: 'Fourteen', es: 'Catorce', fr: 'Quatorze', ru: 'Четырнадцать', allWords: ['fourteen', 'catorce', 'quatorze', 'четырнадцать', '14'] },
  15: { digit: 15, en: 'Fifteen', es: 'Quince', fr: 'Quinze', ru: 'Пятнадцать', allWords: ['fifteen', 'quince', 'quinze', 'пятнадцать', '15'] },
  16: { digit: 16, en: 'Sixteen', es: 'Dieciséis', fr: 'Seize', ru: 'Шестнадцать', allWords: ['sixteen', 'dieciséis', 'dieciseis', 'seize', 'шестнадцать', '16'] },
  17: { digit: 17, en: 'Seventeen', es: 'Diecisiete', fr: 'Dix-sept', ru: 'Семнадцать', allWords: ['seventeen', 'diecisiete', 'dix-sept', 'семнадцать', '17'] },
  18: { digit: 18, en: 'Eighteen', es: 'Dieciocho', fr: 'Dix-huit', ru: 'Восемнадцать', allWords: ['eighteen', 'dieciocho', 'dix-huit', 'восемнадцать', '18'] },
  19: { digit: 19, en: 'Nineteen', es: 'Diecinueve', fr: 'Dix-neuf', ru: 'Девятнадцать', allWords: ['nineteen', 'diecinueve', 'dix-neuf', 'девятнадцать', '19'] },
  20: { digit: 20, en: 'Twenty', es: 'Veinte', fr: 'Vingt', ru: 'Двадцать', allWords: ['twenty', 'veinte', 'vingt', 'двадцать', '20'] },
  30: { digit: 30, en: 'Thirty', es: 'Treinta', fr: 'Trente', ru: 'Тридцать', allWords: ['thirty', 'treinta', 'trente', 'тридцать', '30'] },
  40: { digit: 40, en: 'Forty', es: 'Cuarenta', fr: 'Quarante', ru: 'Сорок', allWords: ['forty', 'cuarenta', 'quarante', 'сорок', '40'] },
  50: { digit: 50, en: 'Fifty', es: 'Cincuenta', fr: 'Cinquante', ru: 'Пятьдесят', allWords: ['fifty', 'cincuenta', 'cinquante', 'пятьдесят', '50'] },
  60: { digit: 60, en: 'Sixty', es: 'Sesenta', fr: 'Soixante', ru: 'Шестьдесят', allWords: ['sixty', 'sesenta', 'soixante', 'шестьдесят', '60'] },
  70: { digit: 70, en: 'Seventy', es: 'Setenta', fr: 'Soixante-dix', ru: 'Семьдесят', allWords: ['seventy', 'setenta', 'soixante-dix', 'семьдесят', '70'] },
  80: { digit: 80, en: 'Eighty', es: 'Ochenta', fr: 'Quatre-vingts', ru: 'Восемьдесят', allWords: ['eighty', 'ochenta', 'quatre-vingts', 'quatre-vingt', 'восемьдесят', '80'] },
  90: { digit: 90, en: 'Ninety', es: 'Noventa', fr: 'Quatre-vingt-dix', ru: 'Девяносто', allWords: ['ninety', 'noventa', 'quatre-vingt-dix', 'девяносто', '90'] },
  100: { digit: 100, en: 'One hundred', es: 'Cien', fr: 'Cent', ru: 'Сто', allWords: ['hundred', 'one hundred', 'a hundred', 'cien', 'ciento', 'cent', 'сто', '100'] },
  1000: { digit: 1000, en: 'One thousand', es: 'Mil', fr: 'Mille', ru: 'Тысяча', allWords: ['thousand', 'one thousand', 'a thousand', 'mil', 'mille', 'тысяча', '1000'] }
};

export const EXTENDED_DICTIONARY: Record<string, Record<SupportedLanguageId, string>> = {
  // People & Family
  'man': { en: 'Man', es: 'Hombre', fr: 'Homme', ru: 'Мужчина' },
  'woman': { en: 'Woman', es: 'Mujer', fr: 'Femme', ru: 'Женщина' },
  'child': { en: 'Child', es: 'Niño / Niña', fr: 'Enfant', ru: 'Ребёнок' },
  'boy': { en: 'Boy', es: 'Niño / Chico', fr: 'Garçon', ru: 'Мальчик' },
  'girl': { en: 'Girl', es: 'Niña / Chica', fr: 'Fille', ru: 'Девочка' },
  'friend': { en: 'Friend', es: 'Amigo', fr: 'Ami', ru: 'Друг' },
  'family': { en: 'Family', es: 'Familia', fr: 'Famille', ru: 'Семья' },
  'father': { en: 'Father', es: 'Padre', fr: 'Père', ru: 'Отец' },
  'mother': { en: 'Mother', es: 'Madre', fr: 'Mère', ru: 'Мать' },
  'teacher': { en: 'Teacher', es: 'Profesor / Maestro', fr: 'Enseignant', ru: 'Учитель' },
  'student': { en: 'Student', es: 'Estudiante / Alumno', fr: 'Étudiant', ru: 'Студент' },

  // Food & Drink
  'water': { en: 'Water', es: 'Agua', fr: 'Eau', ru: 'Вода' },
  'bread': { en: 'Bread', es: 'Pan', fr: 'Pain', ru: 'Хлеб' },
  'food': { en: 'Food / Meal', es: 'Comida', fr: 'Nourriture', ru: 'Еда' },
  'milk': { en: 'Milk', es: 'Leche', fr: 'Lait', ru: 'Молоко' },
  'meat': { en: 'Meat', es: 'Carne', fr: 'Viande', ru: 'Мясо' },
  'fish': { en: 'Fish', es: 'Pescado', fr: 'Poisson', ru: 'Рыба' },
  'vegetables': { en: 'Vegetables', es: 'Verduras', fr: 'Légumes', ru: 'Овощи' },
  'fruits': { en: 'Fruits', es: 'Frutas', fr: 'Fruits', ru: 'Фрукты' },
  'coffee': { en: 'Coffee', es: 'Café', fr: 'Café', ru: 'Кофе' },
  'tea': { en: 'Tea', es: 'Té', fr: 'Thé', ru: 'Чай' },
  'beer': { en: 'Beer', es: 'Cerveza', fr: 'Bière', ru: 'Пиво' },
  'wine': { en: 'Wine', es: 'Vino', fr: 'Vin', ru: 'Вино' },
  'breakfast': { en: 'Breakfast', es: 'Desayuno', fr: 'Petit-déjeuner', ru: 'Завтрак' },
  'lunch': { en: 'Lunch', es: 'Almuerzo', fr: 'Déjeuner', ru: 'Обед' },
  'dinner': { en: 'Dinner', es: 'Cena', fr: 'Dîner', ru: 'Ужин' },

  // Places & Travel
  'store': { en: 'Store / Shop', es: 'Tienda', fr: 'Magasin', ru: 'Магазин' },
  'shop': { en: 'Store / Shop', es: 'Tienda', fr: 'Magasin', ru: 'Магазин' },
  'restaurant': { en: 'Restaurant', es: 'Restaurante', fr: 'Restaurant', ru: 'Ресторан' },
  'hotel': { en: 'Hotel', es: 'Hotel', fr: 'Hôtel', ru: 'Гостиница / Отель' },
  'station': { en: 'Station', es: 'Estación', fr: 'Gare / Station', ru: 'Станция' },
  'airport': { en: 'Airport', es: 'Aeropuerto', fr: 'Aéroport', ru: 'Аэропорт' },
  'street': { en: 'Street', es: 'Calle', fr: 'Rue', ru: 'Улица' },
  'square': { en: 'Square (plaza)', es: 'Plaza', fr: 'Place', ru: 'Площадь' },
  'park': { en: 'Park', es: 'Parque', fr: 'Parc', ru: 'Парк' },
  'hospital': { en: 'Hospital', es: 'Hospital', fr: 'Hôpital', ru: 'Больница' },
  'pharmacy': { en: 'Pharmacy', es: 'Farmacia', fr: 'Pharmacie', ru: 'Аптека' },
  'bank': { en: 'Bank', es: 'Banco', fr: 'Banque', ru: 'Банк' },
  'post office': { en: 'Post office', es: 'Oficina de correos', fr: 'Bureau de poste', ru: 'Почта' },
  'supermarket': { en: 'Supermarket', es: 'Supermercado', fr: 'Supermarché', ru: 'Супермаркет' },
  'city': { en: 'City', es: 'Ciudad', fr: 'Ville', ru: 'Город' },
  'country': { en: 'Country', es: 'País', fr: 'Pays', ru: 'Страна' },
  'house': { en: 'House / Home', es: 'Casa', fr: 'Maison', ru: 'Дом' },
  'home': { en: 'Home / House', es: 'Casa', fr: 'Maison', ru: 'Дом' },
  'car': { en: 'Car', es: 'Carro / Coche', fr: 'Voiture', ru: 'Машина' },
  'train': { en: 'Train', es: 'Tren', fr: 'Train', ru: 'Поезд' },
  'bus': { en: 'Bus', es: 'Autobús', fr: 'Bus', ru: 'Автобус' },

  // Everyday Essentials
  'money': { en: 'Money', es: 'Dinero', fr: 'Argent', ru: 'Деньги' },
  'ticket': { en: 'Ticket', es: 'Boleto / Billete', fr: 'Billet', ru: 'Билет' },
  'passport': { en: 'Passport', es: 'Pasaporte', fr: 'Passeport', ru: 'Паспорт' },
  'phone': { en: 'Phone', es: 'Teléfono', fr: 'Téléphone', ru: 'Телефон' },
  'computer': { en: 'Computer', es: 'Computadora', fr: 'Ordinateur', ru: 'Компьютер' },
  'book': { en: 'Book', es: 'Libro', fr: 'Livre', ru: 'Книга' },
  'help': { en: 'Help', es: 'Ayuda', fr: 'Aide', ru: 'Помощь' },
  'time': { en: 'Time', es: 'Tiempo / Hora', fr: 'Temps / Heure', ru: 'Время' },
  'work': { en: 'Work / Job', es: 'Trabajo', fr: 'Travail', ru: 'Работа' },
  'office': { en: 'Office', es: 'Oficina', fr: 'Bureau', ru: 'Офис' },
  'yes': { en: 'Yes', es: 'Sí', fr: 'Oui', ru: 'Да' },
  'no': { en: 'No', es: 'No', fr: 'Non', ru: 'Нет' },
  'today': { en: 'Today', es: 'Hoy', fr: 'Aujourd\'hui', ru: 'Сегодня' },
  'tomorrow': { en: 'Tomorrow', es: 'Mañana', fr: 'Demain', ru: 'Завтра' },
  'yesterday': { en: 'Yesterday', es: 'Ayer', fr: 'Hier', ru: 'Вчера' },

  // Core Actions
  'to learn': { en: 'To learn', es: 'Aprender', fr: 'Apprendre', ru: 'Учиться' },
  'to speak': { en: 'To speak', es: 'Hablar', fr: 'Parler', ru: 'Говорить' },
  'to eat': { en: 'To eat', es: 'Comer', fr: 'Manger', ru: 'Есть' },
  'to drink': { en: 'To drink', es: 'Beber', fr: 'Boire', ru: 'Пить' },
  'to go': { en: 'To go', es: 'Ir', fr: 'Aller', ru: 'Идти / Ехать' },
  'to understand': { en: 'To understand', es: 'Entender / Comprender', fr: 'Comprendre', ru: 'Понимать' },

  // Essential Phrases
  'hello': { en: 'Hello', es: '¡Hola!', fr: 'Bonjour', ru: 'Привет' },
  'good morning': { en: 'Good morning', es: 'Buenos días', fr: 'Bonjour', ru: 'Доброе утро' },
  'good afternoon': { en: 'Good afternoon', es: 'Buenas tardes', fr: 'Bon après-midi', ru: 'Добрый день' },
  'good evening': { en: 'Good evening', es: 'Buenas noches', fr: 'Bonsoir', ru: 'Добрый вечер' },
  'good night': { en: 'Good night', es: 'Buenas noches', fr: 'Bonne nuit', ru: 'Спокойной ночи' },
  'how are you': { en: 'How are you?', es: '¿Cómo estás?', fr: 'Comment allez-vous ?', ru: 'Как дела?' },
  'how are you?': { en: 'How are you?', es: '¿Cómo estás?', fr: 'Comment allez-vous ?', ru: 'Как дела?' },
  'very well, thank you': { en: 'Very well, thank you', es: 'Muy bien, gracias', fr: 'Très bien, merci', ru: 'Хорошо, спасибо' },
  'and you?': { en: 'And you?', es: '¿Y tú?', fr: 'Et vous ?', ru: 'А вы?' },
  'please': { en: 'Please', es: 'Por favor', fr: 'S\'il vous plaît', ru: 'Пожалуйста' },
  'thank you': { en: 'Thank you', es: 'Gracias', fr: 'Merci', ru: 'Спасибо' },
  'thank you very much': { en: 'Thank you very much', es: 'Muchas gracias', fr: 'Merci beaucoup', ru: 'Большое спасибо' },
  'you are welcome': { en: 'You are welcome', es: 'De nada', fr: 'De rien', ru: 'Пожалуйста / Не за что' },
  'excuse me': { en: 'Excuse me', es: 'Disculpe / Con permiso', fr: 'Excusez-moi', ru: 'Извините' },
  'i am sorry': { en: 'I am sorry', es: 'Lo siento / Perdón', fr: 'Pardon / Désolé', ru: 'Простите / Извините' },
  'what is your name?': { en: 'What is your name?', es: '¿Cómo te llamas?', fr: 'Comment vous appelez-vous ?', ru: 'Как вас зовут?' },
  'my name is...': { en: 'My name is...', es: 'Me llamo...', fr: 'Je m\'appelle...', ru: 'Меня зовут...' },
  'nice to meet you': { en: 'Nice to meet you', es: 'Mucho gusto / Encantado', fr: 'Enchanté(e)', ru: 'Очень приятно' },
  'goodbye': { en: 'Goodbye', es: 'Adiós', fr: 'Au revoir', ru: 'До свидания' },
  'see you later': { en: 'See you later', es: 'Hasta luego', fr: 'À bientôt', ru: 'До свидания / Пока' },
  'have a great day': { en: 'Have a great day', es: 'Que tenga un buen día', fr: 'Bonne journée', ru: 'Хорошего дня' },
  'where is the restroom?': { en: 'Where is the restroom?', es: '¿Dónde está el baño?', fr: 'Où sont les toilettes ?', ru: 'Где находится туалет?' },
  'how much does this cost?': { en: 'How much does this cost?', es: '¿Cuánto cuesta?', fr: 'Combien ça coûte ?', ru: 'Сколько это стоит?' },
  'can i have the check, please?': { en: 'Can I have the check, please?', es: 'La cuenta, por favor', fr: 'L\'addition, s\'il vous plaît', ru: 'Счёт, пожалуйста' },
  'the bill / check, please': { en: 'The check, please', es: 'La cuenta, por favor', fr: 'L\'addition, s\'il vous plaît', ru: 'Счёт, пожалуйста' },
  'do you speak english?': { en: 'Do you speak English?', es: '¿Habla inglés?', fr: 'Parlez-vous anglais ?', ru: 'Вы говорите по-английски?' },
  'i do not understand': { en: 'I do not understand', es: 'No entiendo', fr: 'Je ne comprends pas', ru: 'Я не понимаю' },
  'could you repeat that, please?': { en: 'Could you repeat that, please?', es: '¿Puede repetir, por favor?', fr: 'Pouvez-vous répéter ?', ru: 'Повторите, пожалуйста' },
  'can you repeat, please?': { en: 'Can you repeat, please?', es: '¿Puede repetir, por favor?', fr: 'Pouvez-vous répéter ?', ru: 'Повторите, пожалуйста' },
  'can you help me?': { en: 'Can you help me?', es: '¿Puede ayudarme?', fr: 'Pouvez-vous m\'aider ?', ru: 'Вы можете мне помочь?' },

  // Time expressions
  'what time is it?': { en: 'What time is it?', es: '¿Qué hora es?', fr: 'Quelle heure est-il ?', ru: 'Который час?' },
  'it is one o\'clock on the dot': { en: 'It is 1:00 sharp', es: 'Es la una en punto', fr: 'Il est une heure pile', ru: 'Ровно один час' },
  'it is two o\'clock': { en: 'It is 2:00', es: 'Son las dos', fr: 'Il est deux heures', ru: 'Два часа' },
  'it is 3:30 (half past three)': { en: '3:30 (half past three)', es: 'Son las tres y media', fr: 'Il est trois heures et demie', ru: 'Половина четвёртого (3:30)' },
  'noon / midday': { en: 'Noon / Midday', es: 'Mediodía', fr: 'Midi', ru: 'Полдень' },
  'midnight': { en: 'Midnight', es: 'Medianoche', fr: 'Minuit', ru: 'Полночь' }
};

/**
 * Extracts numeric digits from strings like "15", "15 (Fifteen)", "1 - single unit".
 */
export const extractDigit = (text: string): number | null => {
  if (!text) return null;
  const match = text.match(/\b\d+\b/);
  if (match) {
    const n = parseInt(match[0], 10);
    if (!isNaN(n)) return n;
  }
  return null;
};

/**
 * Gets a clean, localized number text for display and prompt matching.
 */
export const getLocalizedNumber = (
  rawText: string,
  lang: SupportedLanguageId
): string | null => {
  const digit = extractDigit(rawText);
  if (digit !== null && NUMBER_TABLE[digit]) {
    const item = NUMBER_TABLE[digit];
    const word = item[lang] || item.en;
    return `${digit} (${word})`;
  }
  return null;
};

export interface TranslatableItem {
  english?: string;
  russian?: string;
  phrase?: string;
  meaning?: string;
  translation?: string;
  target?: string;
  pronunciation?: string;
}

/**
 * Resolves translation of a phrase item into the user's base/reference language.
 */
export const resolveTranslation = (
  item: TranslatableItem | PhraseItem,
  targetLang: SupportedLanguageId,
  baseLang: SupportedLanguageId
): string => {
  if (!item) return '';

  // If user speaks the target language, show primary text
  if (baseLang === targetLang) {
    return (item.russian || item.phrase || item.target || '').toString();
  }

  // 1. Check if item is a number
  const rawEnglish = (item.english || item.translation || item.meaning || item.phrase || '').toString();
  const digit = extractDigit(rawEnglish) ?? extractDigit((item.phrase || item.russian || '').toString());
  if (digit !== null && NUMBER_TABLE[digit]) {
    const numEntry = NUMBER_TABLE[digit];
    if (baseLang in numEntry) {
      return `${digit} (${numEntry[baseLang]})`;
    }
  }

  // 2. Clean key for dictionary lookup
  const cleanKey = rawEnglish
    .toLowerCase()
    .replace(/^noun:\s*/i, '')
    .replace(/^verb:\s*/i, '')
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .trim();

  if (EXTENDED_DICTIONARY[cleanKey] && EXTENDED_DICTIONARY[cleanKey][baseLang]) {
    return EXTENDED_DICTIONARY[cleanKey][baseLang];
  }

  // 3. Check for partial matches in dictionary
  for (const [key, mapping] of Object.entries(EXTENDED_DICTIONARY)) {
    if (cleanKey.includes(key) || key.includes(cleanKey)) {
      if (mapping[baseLang]) {
        return mapping[baseLang];
      }
    }
  }

  // 4. Check Universal Concept Matrix
  const matrixMatch = CONCEPT_MATRIX.find(c => {
    return Object.values(c.translations).some(t => {
      const tText = t.text.toLowerCase();
      return tText === cleanKey || cleanKey.includes(tText);
    });
  });

  if (matrixMatch && matrixMatch.translations[baseLang]) {
    return matrixMatch.translations[baseLang].text;
  }

  // 5. Fallback: English translation or primary text
  return item.english || item.translation || item.meaning || item.phrase || item.russian || '';
};

/**
 * Localized Language Names in the native speaker's tongue
 */
export const LANGUAGE_NAMES_IN_BASE: Record<SupportedLanguageId, Record<SupportedLanguageId, string>> = {
  en: { en: 'English', es: 'Spanish', fr: 'French', ru: 'Russian' },
  es: { en: 'inglés', es: 'español', fr: 'francés', ru: 'ruso' },
  fr: { en: 'anglais', es: 'espagnol', fr: 'français', ru: 'russe' },
  ru: { en: 'английском', es: 'испанском', fr: 'французском', ru: 'русском' }
};

/**
 * Builds localized quiz hint / question string
 */
export const buildQuizQuestionHint = (
  promptWord: string,
  isTargetPrompt: boolean,
  targetLang: SupportedLanguageId,
  baseLang: SupportedLanguageId
): string => {
  const targetNameInBase = LANGUAGE_NAMES_IN_BASE[baseLang]?.[targetLang] || targetLang;

  if (isTargetPrompt) {
    // Target -> Base ("What does X mean?")
    switch (baseLang) {
      case 'es':
        return `¿Qué significa "${promptWord}"?`;
      case 'fr':
        return `Que signifie "${promptWord}" ?`;
      case 'ru':
        return `Что означает "${promptWord}"?`;
      case 'en':
      default:
        return `What does "${promptWord}" mean?`;
    }
  } else {
    // Base -> Target ("How do you say X in Spanish?")
    switch (baseLang) {
      case 'es':
        return `¿Cómo se dice "${promptWord}" en ${targetNameInBase}?`;
      case 'fr':
        return `Comment dit-on "${promptWord}" en ${targetNameInBase} ?`;
      case 'ru':
        return `Как сказать "${promptWord}" на ${targetNameInBase}?`;
      case 'en':
      default:
        return `How do you say "${promptWord}" in ${targetNameInBase}?`;
    }
  }
};
