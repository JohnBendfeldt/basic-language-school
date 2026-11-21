import { SupportedLanguageId } from './languages/types';

export interface ConceptItem {
  id: string;
  category: 'phrases' | 'words' | 'numbers' | 'time';
  icon?: string;
  translations: Partial<Record<SupportedLanguageId, {
    text: string;
    pronunciation?: string;
    audioCategory: 'phrases' | 'words' | 'numbers' | 'time';
  }>> & {
    en: {
      text: string;
      pronunciation?: string;
      audioCategory: 'phrases' | 'words' | 'numbers' | 'time';
    };
  };
}

/**
 * Universal Cross-Language Concept Matrix:
 * Maps each core curriculum item across English, Spanish, French, and Russian.
 * Allows instant lookup of any term from ANY native language to ANY target language.
 */
export const CONCEPT_MATRIX: ConceptItem[] = [
  // --- GREETINGS & ESSENTIAL PHRASES ---
  {
    id: 'phrase-hello',
    category: 'phrases',
    icon: '👋',
    translations: {
      en: { text: 'Hello', pronunciation: 'hel-OH', audioCategory: 'phrases' },
      es: { text: '¡Hola!', pronunciation: 'OH-lah', audioCategory: 'phrases' },
      fr: { text: 'Bonjour', pronunciation: 'bohn-ZHOOR', audioCategory: 'phrases' },
      ru: { text: 'Привет', pronunciation: 'pree-vyet', audioCategory: 'phrases' }
    }
  },
  {
    id: 'phrase-good-morning',
    category: 'phrases',
    icon: '🌅',
    translations: {
      en: { text: 'Good morning', pronunciation: 'good MOR-ning', audioCategory: 'phrases' },
      es: { text: 'Buenos días', pronunciation: 'BWEH-nohs DEE-ahs', audioCategory: 'phrases' },
      fr: { text: 'Bonjour', pronunciation: 'bohn-ZHOOR', audioCategory: 'phrases' },
      ru: { text: 'Доброе утро', pronunciation: 'DOB-raye OO-tra', audioCategory: 'phrases' }
    }
  },
  {
    id: 'phrase-good-evening',
    category: 'phrases',
    icon: '🌆',
    translations: {
      en: { text: 'Good evening', pronunciation: 'good EEV-ning', audioCategory: 'phrases' },
      es: { text: 'Buenas noches', pronunciation: 'BWEH-nahs NOH-chehs', audioCategory: 'phrases' },
      fr: { text: 'Bonsoir', pronunciation: 'bohn-SWAHR', audioCategory: 'phrases' },
      ru: { text: 'Добрый вечер', pronunciation: 'DOB-riy VYE-cher', audioCategory: 'phrases' }
    }
  },
  {
    id: 'phrase-how-are-you',
    category: 'phrases',
    icon: '❓',
    translations: {
      en: { text: 'How are you?', pronunciation: 'how ar yoo', audioCategory: 'phrases' },
      es: { text: '¿Cómo estás?', pronunciation: 'KOH-moh ehs-TAHS', audioCategory: 'phrases' },
      fr: { text: 'Comment allez-vous ?', pronunciation: 'koh-mahn tah-lay VOO', audioCategory: 'phrases' },
      ru: { text: 'Как дела?', pronunciation: 'kak dye-LA', audioCategory: 'phrases' }
    }
  },
  {
    id: 'phrase-im-doing-well',
    category: 'phrases',
    icon: '😊',
    translations: {
      en: { text: 'I am doing well, thank you', pronunciation: 'eye am DOO-ing well', audioCategory: 'phrases' },
      es: { text: 'Muy bien, gracias', pronunciation: 'mwee byehn, GRAH-syahs', audioCategory: 'phrases' },
      fr: { text: 'Ça va bien, merci', pronunciation: 'sah vah BYEHN, mair-SEE', audioCategory: 'phrases' },
      ru: { text: 'Хорошо, спасибо', pronunciation: 'kha-ra-SHO, spa-SEE-ba', audioCategory: 'phrases' }
    }
  },
  {
    id: 'phrase-please',
    category: 'phrases',
    icon: '🙏',
    translations: {
      en: { text: 'Please', pronunciation: 'pleez', audioCategory: 'phrases' },
      es: { text: 'Por favor', pronunciation: 'pohr fah-VOHR', audioCategory: 'phrases' },
      fr: { text: 'S\'il vous plaît', pronunciation: 'seel voo PLEH', audioCategory: 'phrases' },
      ru: { text: 'Пожалуйста', pronunciation: 'pa-ZHAL-oo-sta', audioCategory: 'phrases' }
    }
  },
  {
    id: 'phrase-thank-you',
    category: 'phrases',
    icon: '✨',
    translations: {
      en: { text: 'Thank you very much', pronunciation: 'thank yoo VE-ree much', audioCategory: 'phrases' },
      es: { text: 'Muchas gracias', pronunciation: 'MOO-chahs GRAH-syahs', audioCategory: 'phrases' },
      fr: { text: 'Merci beaucoup', pronunciation: 'mair-SEE boh-KOO', audioCategory: 'phrases' },
      ru: { text: 'Большое спасибо', pronunciation: 'bal-SHOY-e spa-SEE-ba', audioCategory: 'phrases' }
    }
  },
  {
    id: 'phrase-you-are-welcome',
    category: 'phrases',
    icon: '👍',
    translations: {
      en: { text: 'You are welcome', pronunciation: 'yoo ar WEL-kum', audioCategory: 'phrases' },
      es: { text: 'De nada', pronunciation: 'deh NAH-dah', audioCategory: 'phrases' },
      fr: { text: 'De rien', pronunciation: 'duh RYEHN', audioCategory: 'phrases' },
      ru: { text: 'Не за что', pronunciation: 'NYE za shto', audioCategory: 'phrases' }
    }
  },
  {
    id: 'phrase-excuse-me',
    category: 'phrases',
    icon: '🙇',
    translations: {
      en: { text: 'Excuse me', pronunciation: 'ik-SKYOOZ mee', audioCategory: 'phrases' },
      es: { text: 'Disculpe', pronunciation: 'dees-KOOL-peh', audioCategory: 'phrases' },
      fr: { text: 'Excusez-moi', pronunciation: 'ex-kew-zay MWAH', audioCategory: 'phrases' },
      ru: { text: 'Извините', pronunciation: 'eez-vee-NEE-tye', audioCategory: 'phrases' }
    }
  },
  {
    id: 'phrase-sorry',
    category: 'phrases',
    icon: '😔',
    translations: {
      en: { text: 'I am sorry', pronunciation: 'eye am SAH-ree', audioCategory: 'phrases' },
      es: { text: 'Lo siento', pronunciation: 'loh SYEHN-toh', audioCategory: 'phrases' },
      fr: { text: 'Pardon', pronunciation: 'pahr-DOHN', audioCategory: 'phrases' },
      ru: { text: 'Простите', pronunciation: 'pra-STEE-tye', audioCategory: 'phrases' }
    }
  },
  {
    id: 'phrase-what-is-your-name',
    category: 'phrases',
    icon: '🏷️',
    translations: {
      en: { text: 'What is your name?', pronunciation: 'wut iz yoor naym', audioCategory: 'phrases' },
      es: { text: '¿Cómo te llamas?', pronunciation: 'KOH-moh teh YAH-mahs', audioCategory: 'phrases' },
      fr: { text: 'Comment vous appelez-vous ?', pronunciation: 'koh-mahn voo zah-play VOO', audioCategory: 'phrases' },
      ru: { text: 'Как вас зовут?', pronunciation: 'kak vas za-VOOT', audioCategory: 'phrases' }
    }
  },
  {
    id: 'phrase-my-name-is',
    category: 'phrases',
    icon: '🙋',
    translations: {
      en: { text: 'My name is...', pronunciation: 'my naym iz', audioCategory: 'phrases' },
      es: { text: 'Me llamo...', pronunciation: 'meh YAH-moh...', audioCategory: 'phrases' },
      fr: { text: 'Je m\'appelle...', pronunciation: 'zhuh mah-PELL...', audioCategory: 'phrases' },
      ru: { text: 'Меня зовут...', pronunciation: 'mye-NYA za-VOOT...', audioCategory: 'phrases' }
    }
  },
  {
    id: 'phrase-nice-to-meet-you',
    category: 'phrases',
    icon: '🤝',
    translations: {
      en: { text: 'Nice to meet you', pronunciation: 'nys too meet yoo', audioCategory: 'phrases' },
      es: { text: 'Mucho gusto', pronunciation: 'MOO-choh GOOS-toh', audioCategory: 'phrases' },
      fr: { text: 'Enchanté(e)', pronunciation: 'ahn-shahn-TAY', audioCategory: 'phrases' },
      ru: { text: 'Очень приятно', pronunciation: 'O-chyen pree-YAT-na', audioCategory: 'phrases' }
    }
  },
  {
    id: 'phrase-where-is-restroom',
    category: 'phrases',
    icon: '🚻',
    translations: {
      en: { text: 'Where is the restroom?', pronunciation: 'wair iz the REST-room', audioCategory: 'phrases' },
      es: { text: '¿Dónde está el baño?', pronunciation: 'DOHN-deh ehs-TAH ehl BAH-nyoh', audioCategory: 'phrases' },
      fr: { text: 'Où sont les toilettes ?', pronunciation: 'oo sohn lay twah-LETT', audioCategory: 'phrases' },
      ru: { text: 'Где находится туалет?', pronunciation: 'gdye na-KHO-deet-sya too-a-LYET', audioCategory: 'phrases' }
    }
  },
  {
    id: 'phrase-how-much-cost',
    category: 'phrases',
    icon: '💰',
    translations: {
      en: { text: 'How much does this cost?', pronunciation: 'how much duz this kawst', audioCategory: 'phrases' },
      es: { text: '¿Cuánto cuesta?', pronunciation: 'KWAHN-toh KWEHS-tah', audioCategory: 'phrases' },
      fr: { text: 'Combien ça coûte ?', pronunciation: 'kohm-BYEHN sah KOOT', audioCategory: 'phrases' },
      ru: { text: 'Сколько это стоит?', pronunciation: 'SKOL-ko EH-to STO-eet', audioCategory: 'phrases' }
    }
  },
  {
    id: 'phrase-check-please',
    category: 'phrases',
    icon: '🧾',
    translations: {
      en: { text: 'Can I have the check, please?', pronunciation: 'kan eye hav the chek pleez', audioCategory: 'phrases' },
      es: { text: 'La cuenta, por favor', pronunciation: 'lah KWEHN-tah pohr fah-VOHR', audioCategory: 'phrases' },
      fr: { text: 'L\'addition, s\'il vous plaît', pronunciation: 'lah-dee-SYOHN seel voo PLEH', audioCategory: 'phrases' },
      ru: { text: 'Счет, пожалуйста', pronunciation: 'schyot pa-ZHAL-oo-sta', audioCategory: 'phrases' }
    }
  },
  {
    id: 'phrase-do-you-speak-english',
    category: 'phrases',
    icon: '🗣️',
    translations: {
      en: { text: 'Do you speak English?', pronunciation: 'doo yoo speek ING-glish', audioCategory: 'phrases' },
      es: { text: '¿Habla inglés?', pronunciation: 'AH-blah een-GLEHS', audioCategory: 'phrases' },
      fr: { text: 'Parlez-vous anglais ?', pronunciation: 'pahr-lay voo zahn-GLEH', audioCategory: 'phrases' },
      ru: { text: 'Вы говорите по-английски?', pronunciation: 'vy ga-va-REE-tye pa-an-GLEE-skee', audioCategory: 'phrases' }
    }
  },
  {
    id: 'phrase-i-dont-understand',
    category: 'phrases',
    icon: '🤔',
    translations: {
      en: { text: 'I do not understand', pronunciation: 'eye doo not un-der-STAND', audioCategory: 'phrases' },
      es: { text: 'No entiendo', pronunciation: 'noh ehn-TYEHN-doh', audioCategory: 'phrases' },
      fr: { text: 'Je ne comprends pas', pronunciation: 'zhuh nuh kohm-PRAHN pah', audioCategory: 'phrases' },
      ru: { text: 'Я не понимаю', pronunciation: 'ya nye pa-nee-MA-yoo', audioCategory: 'phrases' }
    }
  },
  {
    id: 'phrase-can-you-repeat',
    category: 'phrases',
    icon: '🔄',
    translations: {
      en: { text: 'Could you repeat that, please?', pronunciation: 'kood yoo ree-PEET that pleez', audioCategory: 'phrases' },
      es: { text: '¿Puede repetir, por favor?', pronunciation: 'PWEH-deh reh-peh-TEER pohr fah-VOHR', audioCategory: 'phrases' },
      fr: { text: 'Pouvez-vous répéter ?', pronunciation: 'poo-vay voo ray-pay-TAY', audioCategory: 'phrases' },
      ru: { text: 'Повторите, пожалуйста', pronunciation: 'pav-ta-REE-tye pa-ZHAL-oo-sta', audioCategory: 'phrases' }
    }
  },
  {
    id: 'phrase-see-you-later',
    category: 'phrases',
    icon: '👋',
    translations: {
      en: { text: 'See you later', pronunciation: 'see yoo LAY-ter', audioCategory: 'phrases' },
      es: { text: 'Hasta luego', pronunciation: 'AHS-tah LWEH-goh', audioCategory: 'phrases' },
      fr: { text: 'À bientôt', pronunciation: 'ah byehn-TOH', audioCategory: 'phrases' },
      ru: { text: 'До свидания', pronunciation: 'da svee-DA-nee-ya', audioCategory: 'phrases' }
    }
  },
  {
    id: 'phrase-goodbye',
    category: 'phrases',
    icon: '🚪',
    translations: {
      en: { text: 'Goodbye', pronunciation: 'good-BYE', audioCategory: 'phrases' },
      es: { text: 'Adiós', pronunciation: 'ah-DYOHS', audioCategory: 'phrases' },
      fr: { text: 'Au revoir', pronunciation: 'oh ruh-VWAHR', audioCategory: 'phrases' },
      ru: { text: 'Пока', pronunciation: 'pa-KA', audioCategory: 'phrases' }
    }
  },

  // --- CORE VOCABULARY WORDS ---
  {
    id: 'word-yes',
    category: 'words',
    icon: '✅',
    translations: {
      en: { text: 'Yes', pronunciation: 'yes', audioCategory: 'words' },
      es: { text: 'Sí', pronunciation: 'see', audioCategory: 'words' },
      fr: { text: 'Oui', pronunciation: 'wee', audioCategory: 'words' },
      ru: { text: 'Да', pronunciation: 'da', audioCategory: 'words' }
    }
  },
  {
    id: 'word-no',
    category: 'words',
    icon: '❌',
    translations: {
      en: { text: 'No', pronunciation: 'noh', audioCategory: 'words' },
      es: { text: 'No', pronunciation: 'noh', audioCategory: 'words' },
      fr: { text: 'Non', pronunciation: 'nohn', audioCategory: 'words' },
      ru: { text: 'Нет', pronunciation: 'nyet', audioCategory: 'words' }
    }
  },
  {
    id: 'word-water',
    category: 'words',
    icon: '💧',
    translations: {
      en: { text: 'Water', pronunciation: 'WAH-ter', audioCategory: 'words' },
      es: { text: 'Agua', pronunciation: 'AH-gwah', audioCategory: 'words' },
      fr: { text: 'Eau', pronunciation: 'oh', audioCategory: 'words' },
      ru: { text: 'Вода', pronunciation: 'va-DA', audioCategory: 'words' }
    }
  },
  {
    id: 'word-food',
    category: 'words',
    icon: '🍲',
    translations: {
      en: { text: 'Food', pronunciation: 'food', audioCategory: 'words' },
      es: { text: 'Comida', pronunciation: 'koh-MEE-dah', audioCategory: 'words' },
      fr: { text: 'Nourriture', pronunciation: 'noo-ree-TYOOR', audioCategory: 'words' },
      ru: { text: 'Еда', pronunciation: 'ye-DA', audioCategory: 'words' }
    }
  },
  {
    id: 'word-coffee',
    category: 'words',
    icon: '☕',
    translations: {
      en: { text: 'Coffee', pronunciation: 'KAW-fee', audioCategory: 'words' },
      es: { text: 'Café', pronunciation: 'kah-FEH', audioCategory: 'words' },
      fr: { text: 'Café', pronunciation: 'kah-FAY', audioCategory: 'words' },
      ru: { text: 'Кофе', pronunciation: 'KO-fye', audioCategory: 'words' }
    }
  },
  {
    id: 'word-time',
    category: 'words',
    icon: '⏱️',
    translations: {
      en: { text: 'Time', pronunciation: 'tym', audioCategory: 'words' },
      es: { text: 'Tiempo', pronunciation: 'TYEHM-poh', audioCategory: 'words' },
      fr: { text: 'Temps', pronunciation: 'tahn', audioCategory: 'words' },
      ru: { text: 'Время', pronunciation: 'VRE-mya', audioCategory: 'words' }
    }
  },
  {
    id: 'word-today',
    category: 'words',
    icon: '📅',
    translations: {
      en: { text: 'Today', pronunciation: 'tuh-DAY', audioCategory: 'words' },
      es: { text: 'Hoy', pronunciation: 'oy', audioCategory: 'words' },
      fr: { text: 'Aujourd\'hui', pronunciation: 'oh-zhoor-DWEE', audioCategory: 'words' },
      ru: { text: 'Сегодня', pronunciation: 'sye-VOD-nya', audioCategory: 'words' }
    }
  },
  {
    id: 'word-tomorrow',
    category: 'words',
    icon: '🌅',
    translations: {
      en: { text: 'Tomorrow', pronunciation: 'tuh-MAH-roh', audioCategory: 'words' },
      es: { text: 'Mañana', pronunciation: 'mah-NYAH-nah', audioCategory: 'words' },
      fr: { text: 'Demain', pronunciation: 'duh-MAHN', audioCategory: 'words' },
      ru: { text: 'Завтра', pronunciation: 'ZAV-tra', audioCategory: 'words' }
    }
  },
  {
    id: 'word-yesterday',
    category: 'words',
    icon: '⏮️',
    translations: {
      en: { text: 'Yesterday', pronunciation: 'YES-ter-day', audioCategory: 'words' },
      es: { text: 'Ayer', pronunciation: 'ah-YEHR', audioCategory: 'words' },
      fr: { text: 'Hier', pronunciation: 'yehr', audioCategory: 'words' },
      ru: { text: 'Вчера', pronunciation: 'vche-RA', audioCategory: 'words' }
    }
  },
  {
    id: 'word-work',
    category: 'words',
    icon: '💼',
    translations: {
      en: { text: 'Work', pronunciation: 'wurk', audioCategory: 'words' },
      es: { text: 'Trabajo', pronunciation: 'trah-BAH-khoh', audioCategory: 'words' },
      fr: { text: 'Travail', pronunciation: 'trah-VAHY', audioCategory: 'words' },
      ru: { text: 'Работа', pronunciation: 'ra-BO-ta', audioCategory: 'words' }
    }
  },
  {
    id: 'word-office',
    category: 'words',
    icon: '🏢',
    translations: {
      en: { text: 'Office', pronunciation: 'AW-fis', audioCategory: 'words' },
      es: { text: 'Oficina', pronunciation: 'oh-fee-SEE-nah', audioCategory: 'words' },
      fr: { text: 'Bureau', pronunciation: 'bew-ROH', audioCategory: 'words' },
      ru: { text: 'Офис', pronunciation: 'O-fees', audioCategory: 'words' }
    }
  },
  {
    id: 'word-money',
    category: 'words',
    icon: '💵',
    translations: {
      en: { text: 'Money', pronunciation: 'MUN-ee', audioCategory: 'words' },
      es: { text: 'Dinero', pronunciation: 'dee-NEH-roh', audioCategory: 'words' },
      fr: { text: 'Argent', pronunciation: 'ahr-ZHAHN', audioCategory: 'words' },
      ru: { text: 'Деньги', pronunciation: 'DYEN-gee', audioCategory: 'words' }
    }
  },
  {
    id: 'word-help',
    category: 'words',
    icon: '🆘',
    translations: {
      en: { text: 'Help', pronunciation: 'help', audioCategory: 'words' },
      es: { text: 'Ayuda', pronunciation: 'ah-YOO-dah', audioCategory: 'words' },
      fr: { text: 'Aide', pronunciation: 'ehd', audioCategory: 'words' },
      ru: { text: 'Помощь', pronunciation: 'PO-moshch', audioCategory: 'words' }
    }
  },
  {
    id: 'word-friend',
    category: 'words',
    icon: '🧑‍🤝‍🧑',
    translations: {
      en: { text: 'Friend', pronunciation: 'frend', audioCategory: 'words' },
      es: { text: 'Amigo', pronunciation: 'ah-MEE-goh', audioCategory: 'words' },
      fr: { text: 'Ami', pronunciation: 'ah-MEE', audioCategory: 'words' },
      ru: { text: 'Друг', pronunciation: 'drook', audioCategory: 'words' }
    }
  },
  {
    id: 'word-family',
    category: 'words',
    icon: '👨‍👩‍👧',
    translations: {
      en: { text: 'Family', pronunciation: 'FAM-uh-lee', audioCategory: 'words' },
      es: { text: 'Familia', pronunciation: 'fah-MEE-lyah', audioCategory: 'words' },
      fr: { text: 'Famille', pronunciation: 'fah-MEE-yuh', audioCategory: 'words' },
      ru: { text: 'Семья', pronunciation: 'syem-YA', audioCategory: 'words' }
    }
  },
  {
    id: 'word-house',
    category: 'words',
    icon: '🏠',
    translations: {
      en: { text: 'House', pronunciation: 'hows', audioCategory: 'words' },
      es: { text: 'Casa', pronunciation: 'KAH-sah', audioCategory: 'words' },
      fr: { text: 'Maison', pronunciation: 'meh-ZOHN', audioCategory: 'words' },
      ru: { text: 'Дом', pronunciation: 'dom', audioCategory: 'words' }
    }
  },
  {
    id: 'word-city',
    category: 'words',
    icon: '🏙️',
    translations: {
      en: { text: 'City', pronunciation: 'SIT-ee', audioCategory: 'words' },
      es: { text: 'Ciudad', pronunciation: 'syoo-DAHD', audioCategory: 'words' },
      fr: { text: 'Ville', pronunciation: 'veel', audioCategory: 'words' },
      ru: { text: 'Город', pronunciation: 'GO-rat', audioCategory: 'words' }
    }
  },
  {
    id: 'word-country',
    category: 'words',
    icon: '🗺️',
    translations: {
      en: { text: 'Country', pronunciation: 'KUN-tree', audioCategory: 'words' },
      es: { text: 'País', pronunciation: 'pah-EES', audioCategory: 'words' },
      fr: { text: 'Pays', pronunciation: 'pay-EE', audioCategory: 'words' },
      ru: { text: 'Страна', pronunciation: 'stra-NA', audioCategory: 'words' }
    }
  },
  {
    id: 'word-car',
    category: 'words',
    icon: '🚗',
    translations: {
      en: { text: 'Car', pronunciation: 'kahr', audioCategory: 'words' },
      es: { text: 'Carro / Coche', pronunciation: 'KAH-rroh', audioCategory: 'words' },
      fr: { text: 'Voiture', pronunciation: 'vwah-TYOOR', audioCategory: 'words' },
      ru: { text: 'Машина', pronunciation: 'ma-SHEE-na', audioCategory: 'words' }
    }
  },
  {
    id: 'word-train',
    category: 'words',
    icon: '🚆',
    translations: {
      en: { text: 'Train', pronunciation: 'trayn', audioCategory: 'words' },
      es: { text: 'Tren', pronunciation: 'trehn', audioCategory: 'words' },
      fr: { text: 'Train', pronunciation: 'trahn', audioCategory: 'words' },
      ru: { text: 'Поезд', pronunciation: 'PO-yezd', audioCategory: 'words' }
    }
  },

  // --- CORE NUMBERS (0 - 10) ---
  {
    id: 'number-0',
    category: 'numbers',
    icon: '0️⃣',
    translations: {
      en: { text: 'Zero', pronunciation: 'ZEE-roh', audioCategory: 'numbers' },
      es: { text: 'Cero', pronunciation: 'SEH-roh', audioCategory: 'numbers' },
      fr: { text: 'Zéro', pronunciation: 'zay-ROH', audioCategory: 'numbers' },
      ru: { text: 'Ноль', pronunciation: 'nol', audioCategory: 'numbers' }
    }
  },
  {
    id: 'number-1',
    category: 'numbers',
    icon: '1️⃣',
    translations: {
      en: { text: 'One', pronunciation: 'wun', audioCategory: 'numbers' },
      es: { text: 'Uno', pronunciation: 'OO-noh', audioCategory: 'numbers' },
      fr: { text: 'Un', pronunciation: 'ahn', audioCategory: 'numbers' },
      ru: { text: 'Один', pronunciation: 'ah-DEEN', audioCategory: 'numbers' }
    }
  },
  {
    id: 'number-2',
    category: 'numbers',
    icon: '2️⃣',
    translations: {
      en: { text: 'Two', pronunciation: 'too', audioCategory: 'numbers' },
      es: { text: 'Dos', pronunciation: 'dohs', audioCategory: 'numbers' },
      fr: { text: 'Deux', pronunciation: 'duh', audioCategory: 'numbers' },
      ru: { text: 'Два', pronunciation: 'dva', audioCategory: 'numbers' }
    }
  },
  {
    id: 'number-3',
    category: 'numbers',
    icon: '3️⃣',
    translations: {
      en: { text: 'Three', pronunciation: 'three', audioCategory: 'numbers' },
      es: { text: 'Tres', pronunciation: 'trehs', audioCategory: 'numbers' },
      fr: { text: 'Trois', pronunciation: 'trwah', audioCategory: 'numbers' },
      ru: { text: 'Три', pronunciation: 'tree', audioCategory: 'numbers' }
    }
  },
  {
    id: 'number-4',
    category: 'numbers',
    icon: '4️⃣',
    translations: {
      en: { text: 'Four', pronunciation: 'for', audioCategory: 'numbers' },
      es: { text: 'Cuatro', pronunciation: 'KWAH-troh', audioCategory: 'numbers' },
      fr: { text: 'Quatre', pronunciation: 'katr', audioCategory: 'numbers' },
      ru: { text: 'Четыре', pronunciation: 'chee-TY-rye', audioCategory: 'numbers' }
    }
  },
  {
    id: 'number-5',
    category: 'numbers',
    icon: '5️⃣',
    translations: {
      en: { text: 'Five', pronunciation: 'fyv', audioCategory: 'numbers' },
      es: { text: 'Cinco', pronunciation: 'SEEN-koh', audioCategory: 'numbers' },
      fr: { text: 'Cinq', pronunciation: 'sank', audioCategory: 'numbers' },
      ru: { text: 'Пять', pronunciation: 'pyat', audioCategory: 'numbers' }
    }
  },
  {
    id: 'number-6',
    category: 'numbers',
    icon: '6️⃣',
    translations: {
      en: { text: 'Six', pronunciation: 'siks', audioCategory: 'numbers' },
      es: { text: 'Seis', pronunciation: 'says', audioCategory: 'numbers' },
      fr: { text: 'Six', pronunciation: 'sees', audioCategory: 'numbers' },
      ru: { text: 'Шесть', pronunciation: 'shest', audioCategory: 'numbers' }
    }
  },
  {
    id: 'number-7',
    category: 'numbers',
    icon: '7️⃣',
    translations: {
      en: { text: 'Seven', pronunciation: 'SEV-en', audioCategory: 'numbers' },
      es: { text: 'Siete', pronunciation: 'SYEH-teh', audioCategory: 'numbers' },
      fr: { text: 'Sept', pronunciation: 'set', audioCategory: 'numbers' },
      ru: { text: 'Семь', pronunciation: 'syem', audioCategory: 'numbers' }
    }
  },
  {
    id: 'number-8',
    category: 'numbers',
    icon: '8️⃣',
    translations: {
      en: { text: 'Eight', pronunciation: 'ayt', audioCategory: 'numbers' },
      es: { text: 'Ocho', pronunciation: 'OH-choh', audioCategory: 'numbers' },
      fr: { text: 'Huit', pronunciation: 'weet', audioCategory: 'numbers' },
      ru: { text: 'Восемь', pronunciation: 'VO-syem', audioCategory: 'numbers' }
    }
  },
  {
    id: 'number-9',
    category: 'numbers',
    icon: '9️⃣',
    translations: {
      en: { text: 'Nine', pronunciation: 'nyn', audioCategory: 'numbers' },
      es: { text: 'Nueve', pronunciation: 'NWEH-veh', audioCategory: 'numbers' },
      fr: { text: 'Neuf', pronunciation: 'nuff', audioCategory: 'numbers' },
      ru: { text: 'Девять', pronunciation: 'DYE-vyat', audioCategory: 'numbers' }
    }
  },
  {
    id: 'number-10',
    category: 'numbers',
    icon: '🔟',
    translations: {
      en: { text: 'Ten', pronunciation: 'ten', audioCategory: 'numbers' },
      es: { text: 'Diez', pronunciation: 'dyehs', audioCategory: 'numbers' },
      fr: { text: 'Dix', pronunciation: 'dees', audioCategory: 'numbers' },
      ru: { text: 'Десять', pronunciation: 'DYE-syat', audioCategory: 'numbers' }
    }
  }
];

/**
 * Helper to resolve a localized translation for any item given target and base languages.
 */
export const getLocalizedTranslation = (
  concept: ConceptItem,
  targetLang: SupportedLanguageId,
  baseLang: SupportedLanguageId
) => {
  const target = concept.translations[targetLang] || concept.translations.en;
  const base = concept.translations[baseLang] || concept.translations.en;

  return {
    targetText: target.text,
    targetPronunciation: target.pronunciation,
    baseText: base.text,
    audioCategory: target.audioCategory
  };
};
