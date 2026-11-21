/**
 * Russian language data file
 * Contains all content for the Russian Learning App
 */
import { AlphabetItem, PhraseItem } from '../../../types/index';
import { RUSSIAN_GRAMMAR } from '../grammarData';

// Russian alphabet with pronunciation guides and examples
const alphabet: AlphabetItem[] = [
  {
    letter: 'А',
    pronunciation: 'a',
    example: 'as in father',
    russianWord: 'автобус',
    englishWord: 'bus',
    icon: '🚌'
  },
  {
    letter: 'Б',
    pronunciation: 'b',
    example: 'as in boy',
    russianWord: 'брат',
    englishWord: 'brother',
    icon: '👦'
  },
  {
    letter: 'В',
    pronunciation: 'v',
    example: 'as in very',
    russianWord: 'вода',
    englishWord: 'water',
    icon: '💧'
  },
  {
    letter: 'Г',
    pronunciation: 'g',
    example: 'as in go',
    russianWord: 'город',
    englishWord: 'city',
    icon: '🏙️'
  },
  {
    letter: 'Д',
    pronunciation: 'd',
    example: 'as in dog',
    russianWord: 'дом',
    englishWord: 'house',
    icon: '🏠'
  },
  {
    letter: 'Е',
    pronunciation: 'ye',
    example: 'as in yes',
    russianWord: 'ем',
    englishWord: 'I eat',
    icon: '🍽️'
  },
  {
    letter: 'Ё',
    pronunciation: 'yo',
    example: 'as in yogurt',
    russianWord: 'ёлка',
    englishWord: 'Christmas tree',
    icon: '🎄'
  },
  {
    letter: 'Ж',
    pronunciation: 'zh',
    example: 'as in measure',
    russianWord: 'журнал',
    englishWord: 'magazine',
    icon: '📰'
  },
  {
    letter: 'З',
    pronunciation: 'z',
    example: 'as in zoo',
    russianWord: 'завод',
    englishWord: 'factory',
    icon: '🏭'
  },
  {
    letter: 'И',
    pronunciation: 'ee',
    example: 'as in meet',
    russianWord: 'имя',
    englishWord: 'name',
    icon: '🏷️'
  },
  {
    letter: 'Й',
    pronunciation: 'y',
    example: 'as in boy',
    russianWord: 'большой',
    englishWord: 'big',
    icon: '🐘'
  },
  {
    letter: 'К',
    pronunciation: 'k',
    example: 'as in kite',
    russianWord: 'кошка',
    englishWord: 'cat',
    icon: '🐱'
  },
  {
    letter: 'Л',
    pronunciation: 'l',
    example: 'as in lamp',
    russianWord: 'любовь',
    englishWord: 'love',
    icon: '❤️'
  },
  {
    letter: 'М',
    pronunciation: 'm',
    example: 'as in man',
    russianWord: 'мама',
    englishWord: 'mom',
    icon: '👩'
  },
  {
    letter: 'Н',
    pronunciation: 'n',
    example: 'as in not',
    russianWord: 'нос',
    englishWord: 'nose',
    icon: '👃'
  },
  {
    letter: 'О',
    pronunciation: 'o',
    example: 'as in more (stressed)',
    russianWord: 'облако',
    englishWord: 'cloud',
    icon: '☁️'
  },
  {
    letter: 'П',
    pronunciation: 'p',
    example: 'as in pet',
    russianWord: 'папа',
    englishWord: 'dad',
    icon: '👨'
  },
  {
    letter: 'Р',
    pronunciation: 'r',
    example: 'rolled r',
    russianWord: 'рыба',
    englishWord: 'fish',
    icon: '🐟'
  },
  {
    letter: 'С',
    pronunciation: 's',
    example: 'as in sun',
    russianWord: 'собака',
    englishWord: 'dog',
    icon: '🐕'
  },
  {
    letter: 'Т',
    pronunciation: 't',
    example: 'as in top',
    russianWord: 'телефон',
    englishWord: 'telephone',
    icon: '📞'
  },
  {
    letter: 'У',
    pronunciation: 'oo',
    example: 'as in moon',
    russianWord: 'утро',
    englishWord: 'morning',
    icon: '🌅'
  },
  {
    letter: 'Ф',
    pronunciation: 'f',
    example: 'as in fun',
    russianWord: 'фото',
    englishWord: 'photo',
    icon: '📷'
  },
  {
    letter: 'Х',
    pronunciation: 'kh',
    example: 'as in Bach',
    russianWord: 'хлеб',
    englishWord: 'bread',
    icon: '🍞'
  },
  {
    letter: 'Ц',
    pronunciation: 'ts',
    example: 'as in bits',
    russianWord: 'центр',
    englishWord: 'center',
    icon: '🎯'
  },
  {
    letter: 'Ч',
    pronunciation: 'ch',
    example: 'as in check',
    russianWord: 'чай',
    englishWord: 'tea',
    icon: '🍵'
  },
  {
    letter: 'Ш',
    pronunciation: 'sh',
    example: 'as in shine',
    russianWord: 'школа',
    englishWord: 'school',
    icon: '🏫'
  },
  {
    letter: 'Щ',
    pronunciation: 'shch',
    example: 'long soft sh (as in fresh cheese)',
    russianWord: 'щека',
    englishWord: 'cheek',
    icon: '😊'
  },
  {
    letter: 'Ъ',
    pronunciation: 'hard sign',
    example: 'separates consonant and vowel',
    russianWord: 'объект',
    englishWord: 'object',
    icon: '📦'
  },
  {
    letter: 'Ы',
    pronunciation: 'y',
    example: 'like i in "bit" with tongue pulled back',
    russianWord: 'мы',
    englishWord: 'we',
    icon: '👥'
  },
  {
    letter: 'Ь',
    pronunciation: 'soft sign',
    example: 'softens preceding consonant',
    russianWord: 'мать',
    englishWord: 'mother',
    icon: '👩‍👧'
  },
  {
    letter: 'Э',
    pronunciation: 'e',
    example: 'as in bet',
    russianWord: 'это',
    englishWord: 'this',
    icon: '👉'
  },
  {
    letter: 'Ю',
    pronunciation: 'yu',
    example: 'as in you',
    russianWord: 'юг',
    englishWord: 'south',
    icon: '🧭'
  },
  {
    letter: 'Я',
    pronunciation: 'ya',
    example: 'as in yard',
    russianWord: 'яблоко',
    englishWord: 'apple',
    icon: '🍎'
  }
];

// Basic phrases for everyday communication
const basicPhrases: PhraseItem[] = [
  {
    russian: 'Привет',
    english: 'Hello (informal)',
    pronunciation: 'pree-vyet',
    category: 'Greetings',
    icon: '👋'
  },
  {
    russian: 'Здравствуйте',
    english: 'Hello (formal)',
    pronunciation: 'zdrah-stvooy-tye',
    category: 'Greetings',
    icon: '🤝'
  },
  {
    russian: 'До свидания',
    english: 'Goodbye',
    pronunciation: 'dah svee-DAH-nee-ya',
    category: 'Farewells',
    icon: '🚪'
  },
  {
    russian: 'Спасибо',
    english: 'Thank you',
    pronunciation: 'spah-SEE-bah',
    category: 'Politeness',
    icon: '🙏'
  },
  {
    russian: 'Пожалуйста',
    english: 'Please / You\'re welcome',
    pronunciation: 'pah-ZHAL-sta',
    category: 'Politeness',
    icon: '✨'
  },
  {
    russian: 'Да',
    english: 'Yes',
    pronunciation: 'dah',
    category: 'Responses',
    icon: '✅'
  },
  {
    russian: 'Нет',
    english: 'No',
    pronunciation: 'nyet',
    category: 'Responses',
    icon: '❌'
  },
  {
    russian: 'Извините',
    english: 'Excuse me / Sorry',
    pronunciation: 'eez-vee-NEE-tye',
    category: 'Politeness',
    icon: '🙇'
  },
  {
    russian: 'Как дела?',
    english: 'How are you?',
    pronunciation: 'kahk dee-LAH',
    category: 'Conversation',
    icon: '😊'
  },
  {
    russian: 'Хорошо',
    english: 'Good / Well',
    pronunciation: 'khah-rah-SHOH',
    category: 'Responses',
    icon: '👍'
  },
  {
    russian: 'Плохо',
    english: 'Bad / Poorly',
    pronunciation: 'PLOH-khah',
    category: 'Responses',
    icon: '👎'
  },
  {
    russian: 'Я не понимаю',
    english: 'I don\'t understand',
    pronunciation: 'ya nee pah-nee-MAH-yu',
    category: 'Conversation',
    icon: '🤔'
  },
  {
    russian: 'Говорите медленнее',
    english: 'Speak more slowly',
    pronunciation: 'gah-vah-REE-tye MYED-lyen-nye-ye',
    category: 'Conversation',
    icon: '🐢'
  },
  {
    russian: 'Повторите, пожалуйста',
    english: 'Please repeat',
    pronunciation: 'pahf-tah-REE-tye, pah-ZHAL-sta',
    category: 'Conversation',
    icon: '🔄'
  },
  {
    russian: 'Меня зовут...',
    english: 'My name is...',
    pronunciation: 'mee-NYA zah-VOOT',
    category: 'Introductions',
    icon: '🏷️'
  },
  {
    russian: 'Сколько стоит?',
    english: 'How much does it cost?',
    pronunciation: 'SKOHL-kah STOH-eet',
    category: 'Shopping',
    icon: '💰'
  },
  {
    russian: 'Где туалет?',
    english: 'Where is the bathroom?',
    pronunciation: 'gdye too-ah-LYET',
    category: 'Travel',
    icon: '🚻'
  },
  {
    russian: 'Помогите!',
    english: 'Help me!',
    pronunciation: 'pah-mah-GEE-tye',
    category: 'Emergency',
    icon: '🆘'
  },
  {
    russian: 'Я хочу есть',
    english: 'I want to eat',
    pronunciation: 'ya khah-CHOO yest\'',
    category: 'Dining',
    icon: '🍽️'
  },
  {
    russian: 'Я хочу пить',
    english: 'I want to drink',
    pronunciation: 'ya khah-CHOO peet\'',
    category: 'Dining',
    icon: '💧'
  },
  {
    russian: 'Доброе утро',
    english: 'Good morning',
    pronunciation: 'DOH-bra-ye OO-tra',
    category: 'Greetings',
    icon: '🌅'
  },
  {
    russian: 'Добрый день',
    english: 'Good afternoon',
    pronunciation: 'DOH-briy dyen\'',
    category: 'Greetings',
    icon: '☀️'
  },
  {
    russian: 'Добрый вечер',
    english: 'Good evening',
    pronunciation: 'DOH-briy VYE-cheer',
    category: 'Greetings',
    icon: '🌆'
  },
  {
    russian: 'Спокойной ночи',
    english: 'Good night',
    pronunciation: 'spah-KOY-nay NOH-chee',
    category: 'Farewells',
    icon: '🌙'
  },
  {
    russian: 'Пока',
    english: 'Bye (informal)',
    pronunciation: 'pah-KAH',
    category: 'Farewells',
    icon: '👋'
  },
  {
    russian: 'Очень приятно',
    english: 'Nice to meet you',
    pronunciation: 'OH-cheen\' pree-YAT-na',
    category: 'Introductions',
    icon: '🤝'
  },
  {
    russian: 'Не за что',
    english: 'You\'re welcome / Not at all',
    pronunciation: 'NYE za shto',
    category: 'Politeness',
    icon: '🤗'
  },
  {
    russian: 'Вы говорите по-английски?',
    english: 'Do you speak English?',
    pronunciation: 'vy gah-vah-REE-tye pah ahn-GLEEY-skee',
    category: 'Conversation',
    icon: '🗣️'
  },
  {
    russian: 'Я немного говорю по-русски',
    english: 'I speak a little Russian',
    pronunciation: 'ya nee-MNOH-gah gah-vah-RYOO pah ROOS-kee',
    category: 'Conversation',
    icon: '💬'
  },
  {
    russian: 'Как это по-русски?',
    english: 'How do you say this in Russian?',
    pronunciation: 'kahk EH-ta pah ROOS-kee',
    category: 'Conversation',
    icon: '❓'
  },
  {
    russian: 'Вы меня слышите?',
    english: 'Can you hear me?',
    pronunciation: 'vy mee-NYA SLI-shi-tye',
    category: 'Tech',
    icon: '🎧'
  },
  {
    russian: 'Видно мой экран?',
    english: 'Can you see my screen?',
    pronunciation: 'VEED-na moy eh-KRAHN',
    category: 'Tech',
    icon: '🖥️'
  },
  {
    russian: 'Какой пароль от вайфая?',
    english: 'What is the Wi-Fi password?',
    pronunciation: 'kah-KOY pah-ROHL aht vay-FA-ya',
    category: 'Tech',
    icon: '📶'
  },
  // Business & Office
  {
    russian: 'Давайте назначим встречу',
    english: 'Let\'s schedule a meeting',
    pronunciation: 'dah-VAY-tye nahz-NAH-cheem FSTRYE-choo',
    category: 'Business',
    icon: '📅'
  },
  {
    russian: 'Я отправлю вам письмо',
    english: 'I will send you an email',
    pronunciation: 'ya aht-PRAHV-lyoo vahm pees-MOH',
    category: 'Business',
    icon: '📧'
  },
  {
    russian: 'Какой крайний срок?',
    english: 'When is the deadline?',
    pronunciation: 'kah-KOY KRAY-neey srohk',
    category: 'Business',
    icon: '⏳'
  },
  // Healthcare & Pharmacy
  {
    russian: 'Мне нужен врач',
    english: 'I need a doctor',
    pronunciation: 'mnye NOO-zhen vrahch',
    category: 'Health',
    icon: '🩺'
  },
  {
    russian: 'Где ближайшая аптека?',
    english: 'Where is the nearest pharmacy?',
    pronunciation: 'gdye blee-ZHAY-sha-ya ap-TYE-ka',
    category: 'Health',
    icon: '💊'
  },
  {
    russian: 'У меня аллергия на орехи',
    english: 'I am allergic to nuts',
    pronunciation: 'oo mee-NYA ah-leer-GEE-ya na ah-RYE-khee',
    category: 'Health',
    icon: '⚠️'
  },
  // Hotel, Airport & Travel
  {
    russian: 'У меня есть бронь',
    english: 'I have a reservation',
    pronunciation: 'oo mee-NYA yest\' brohn\'',
    category: 'Travel',
    icon: '🛎️'
  },
  {
    russian: 'Где находится вокзал?',
    english: 'Where is the train station?',
    pronunciation: 'gdye nah-KHOH-deet-sya vahk-ZAHL',
    category: 'Travel',
    icon: '🚉'
  },
  {
    russian: 'Мне нужно такси',
    english: 'I need a taxi',
    pronunciation: 'mnye NOOZH-na tahk-SEE',
    category: 'Travel',
    icon: '🚕'
  },
  // Dining & Shopping
  {
    russian: 'Столик на двоих, пожалуйста',
    english: 'A table for two, please',
    pronunciation: 'STOH-leek na dvah-EEKH, pah-ZHAL-sta',
    category: 'Dining',
    icon: '🍽️'
  },
  {
    russian: 'Меню, пожалуйста',
    english: 'The menu, please',
    pronunciation: 'mee-NYOO, pah-ZHAL-sta',
    category: 'Dining',
    icon: '📖'
  },
  {
    russian: 'Вы принимаете банковские карты?',
    english: 'Do you accept credit cards?',
    pronunciation: 'vy pree-nee-MAH-ye-tye BAHN-kahf-skee-ye KAR-ti',
    category: 'Shopping',
    icon: '💳'
  },
  {
    russian: 'Это слишком дорого',
    english: 'It is too expensive',
    pronunciation: 'EH-ta SLEESH-kam DOH-ra-ga',
    category: 'Shopping',
    icon: '💸'
  }
];

// Numbers in Russian
const numbers: PhraseItem[] = [
  {
    russian: 'ноль',
    english: 'Zero',
    pronunciation: 'nohl\'',
    category: 'Numbers 0-10'
  },
  {
    russian: 'один',
    english: 'One',
    pronunciation: 'ah-DEEN',
    category: 'Numbers 0-10'
  },
  {
    russian: 'два',
    english: 'Two',
    pronunciation: 'dvah',
    category: 'Numbers 0-10'
  },
  {
    russian: 'три',
    english: 'Three',
    pronunciation: 'tree',
    category: 'Numbers 0-10'
  },
  {
    russian: 'четыре',
    english: 'Four',
    pronunciation: 'chee-TY-rye',
    category: 'Numbers 0-10'
  },
  {
    russian: 'пять',
    english: 'Five',
    pronunciation: 'pyat\'',
    category: 'Numbers 0-10'
  },
  {
    russian: 'шесть',
    english: 'Six',
    pronunciation: 'shest\'',
    category: 'Numbers 0-10'
  },
  {
    russian: 'семь',
    english: 'Seven',
    pronunciation: 'syem\'',
    category: 'Numbers 0-10'
  },
  {
    russian: 'восемь',
    english: 'Eight',
    pronunciation: 'VOH-seem\'',
    category: 'Numbers 0-10'
  },
  {
    russian: 'девять',
    english: 'Nine',
    pronunciation: 'DYEH-veet\'',
    category: 'Numbers 0-10'
  },
  {
    russian: 'десять',
    english: 'Ten',
    pronunciation: 'DYEH-seet\'',
    category: 'Numbers 0-10'
  },
  {
    russian: 'одиннадцать',
    english: 'Eleven',
    pronunciation: 'ah-DEE-nat-sat\'',
    category: 'Numbers 11-20'
  },
  {
    russian: 'двенадцать',
    english: 'Twelve',
    pronunciation: 'dvye-NAT-sat\'',
    category: 'Numbers 11-20'
  },
  {
    russian: 'тринадцать',
    english: 'Thirteen',
    pronunciation: 'tree-NAT-sat\'',
    category: 'Numbers 11-20'
  },
  {
    russian: 'четырнадцать',
    english: 'Fourteen',
    pronunciation: 'chee-TYR-nat-sat\'',
    category: 'Numbers 11-20'
  },
  {
    russian: 'пятнадцать',
    english: 'Fifteen',
    pronunciation: 'peet-NAT-sat\'',
    category: 'Numbers 11-20'
  },
  {
    russian: 'шестнадцать',
    english: 'Sixteen',
    pronunciation: 'shees-NAT-sat\'',
    category: 'Numbers 11-20'
  },
  {
    russian: 'семнадцать',
    english: 'Seventeen',
    pronunciation: 'seem-NAT-sat\'',
    category: 'Numbers 11-20'
  },
  {
    russian: 'восемнадцать',
    english: 'Eighteen',
    pronunciation: 'vah-seem-NAT-sat\'',
    category: 'Numbers 11-20'
  },
  {
    russian: 'девятнадцать',
    english: 'Nineteen',
    pronunciation: 'dee-veet-NAT-sat\'',
    category: 'Numbers 11-20'
  },
  {
    russian: 'двадцать',
    english: 'Twenty',
    pronunciation: 'DVAH-tsat\'',
    category: 'Tens'
  },
  {
    russian: 'тридцать',
    english: 'Thirty',
    pronunciation: 'TREE-tsat\'',
    category: 'Tens'
  },
  {
    russian: 'сорок',
    english: 'Forty',
    pronunciation: 'SOH-rak',
    category: 'Tens'
  },
  {
    russian: 'пятьдесят',
    english: 'Fifty',
    pronunciation: 'pyat-dye-SYAT',
    category: 'Tens'
  },
  {
    russian: 'шестьдесят',
    english: 'Sixty',
    pronunciation: 'shyz-dye-SYAT',
    category: 'Tens'
  },
  {
    russian: 'семьдесят',
    english: 'Seventy',
    pronunciation: 'syem-dye-SYAT',
    category: 'Tens'
  },
  {
    russian: 'восемьдесят',
    english: 'Eighty',
    pronunciation: 'voh-syem-dye-SYAT',
    category: 'Tens'
  },
  {
    russian: 'девяносто',
    english: 'Ninety',
    pronunciation: 'dee-vee-NOH-stah',
    category: 'Tens'
  },
  {
    russian: 'сто',
    english: 'One hundred',
    pronunciation: 'stoh',
    category: 'Hundreds'
  },
  {
    russian: 'тысяча',
    english: 'One thousand',
    pronunciation: 'TY-see-cha',
    category: 'Thousands'
  }
];

// Common words for everyday use
const commonWords: PhraseItem[] = [
  { russian: 'мужчина', english: 'man', pronunciation: 'moosh-chee-na', category: 'People', icon: '👨' },
  { russian: 'женщина', english: 'woman', pronunciation: 'zhen-shee-na', category: 'People', icon: '👩' },
  { russian: 'ребёнок', english: 'child', pronunciation: 'ree-byo-nok', category: 'People', level: 1, icon: '🧒' },
  { russian: 'мальчик', english: 'boy', pronunciation: 'mahl-cheek', category: 'People', icon: '👦' },
  { russian: 'девочка', english: 'girl', pronunciation: 'dyeh-vach-ka', category: 'People', icon: '👧' },
  { russian: 'друг', english: 'friend', pronunciation: 'drook', category: 'People', icon: '🤝' },
  { russian: 'еда', english: 'food', pronunciation: 'ye-da', category: 'Food & Drink', icon: '🍲' },
  { russian: 'вода', english: 'water', pronunciation: 'va-da', category: 'Food & Drink', icon: '💧' },
  { russian: 'хлеб', english: 'bread', pronunciation: 'khlyep', category: 'Food & Drink', icon: '🍞' },
  { russian: 'молоко', english: 'milk', pronunciation: 'ma-la-ko', category: 'Food & Drink', icon: '🥛' },
  { russian: 'мясо', english: 'meat', pronunciation: 'mya-sa', category: 'Food & Drink', icon: '🥩' },
  { russian: 'рыба', english: 'fish', pronunciation: 'rih-ba', category: 'Food & Drink', icon: '🐟' },
  { russian: 'овощи', english: 'vegetables', pronunciation: 'o-va-shi', category: 'Food & Drink', icon: '🥦' },
  { russian: 'фрукты', english: 'fruits', pronunciation: 'frook-ti', category: 'Food & Drink', icon: '🍎' },
  { russian: 'кофе', english: 'coffee', pronunciation: 'ko-fe', category: 'Food & Drink', icon: '☕' },
  { russian: 'чай', english: 'tea', pronunciation: 'chai', category: 'Food & Drink', icon: '🍵' },
  { russian: 'пиво', english: 'beer', pronunciation: 'pee-va', category: 'Food & Drink', icon: '🍺' },
  { russian: 'вино', english: 'wine', pronunciation: 'vee-no', category: 'Food & Drink', icon: '🍷' },
  { russian: 'магазин', english: 'store', pronunciation: 'ma-ga-zeen', category: 'Places', icon: '🛒' },
  { russian: 'ресторан', english: 'restaurant', pronunciation: 're-sta-ran', category: 'Places', icon: '🍴' },
  { russian: 'гостиница', english: 'hotel', pronunciation: 'ga-stee-nee-tsa', category: 'Places', icon: '🏨' },
  { russian: 'станция', english: 'station', pronunciation: 'stan-tsee-ya', category: 'Places', icon: '🚉' },
  { russian: 'аэропорт', english: 'airport', pronunciation: 'a-eh-ra-port', category: 'Travel', icon: '✈️' },
  { russian: 'улица', english: 'street', pronunciation: 'oo-lee-tsa', category: 'Places', icon: '🛣️' },
  { russian: 'площадь', english: 'square', pronunciation: 'ploh-shad', category: 'Places', icon: '🏛️' },
  { russian: 'парк', english: 'park', pronunciation: 'park', category: 'Places', icon: '🌳' },
  { russian: 'больница', english: 'hospital', pronunciation: 'bal-nee-tsa', category: 'Health', icon: '🏥' },
  { russian: 'аптека', english: 'pharmacy', pronunciation: 'ap-tye-ka', category: 'Health', icon: '💊' },
  { russian: 'банк', english: 'bank', pronunciation: 'bank', category: 'Finance', icon: '🏦' },
  { russian: 'почта', english: 'post office', pronunciation: 'poch-ta', category: 'Places', icon: '📮' },
  { russian: 'полиция', english: 'police', pronunciation: 'pa-lee-tsee-ya', category: 'Emergency', icon: '🚓' },
  { russian: 'музей', english: 'museum', pronunciation: 'moo-zyey', category: 'Places', icon: '🖼️' },
  { russian: 'театр', english: 'theater', pronunciation: 'tee-atr', category: 'Places', icon: '🎭' },
  { russian: 'кино', english: 'cinema', pronunciation: 'kee-no', category: 'Places', icon: '🎬' },
  { russian: 'билет', english: 'ticket', pronunciation: 'bee-lyet', category: 'Travel', icon: '🎟️' },
  { russian: 'деньги', english: 'money', pronunciation: 'dyen-gee', category: 'Finance', icon: '💵' },
  { russian: 'паспорт', english: 'passport', pronunciation: 'pass-port', category: 'Travel', icon: '🛂' },
  { russian: 'виза', english: 'visa', pronunciation: 'vee-za', category: 'Travel', icon: '📄' },
  { russian: 'кто', english: 'who', pronunciation: 'ktoh', category: 'Questions', icon: '❓' },
  { russian: 'что', english: 'what', pronunciation: 'shtoh', category: 'Questions', icon: '❓' },
  { russian: 'где', english: 'where', pronunciation: 'gdye', category: 'Questions', icon: '📍' },
  { russian: 'когда', english: 'when', pronunciation: 'kahg-dah', category: 'Questions', icon: '🕒' },
  { russian: 'почему', english: 'why', pronunciation: 'pah-chee-moo', category: 'Questions', icon: '🤔' },
  { russian: 'как', english: 'how', pronunciation: 'kahk', category: 'Questions', icon: '💡' },
  { russian: 'семья', english: 'family', pronunciation: 'seem-ya', category: 'Family', icon: '👨‍👩‍👧' },
  { russian: 'сестра', english: 'sister', pronunciation: 'see-strah', category: 'Family', icon: '👧' },
  { russian: 'брат', english: 'brother', pronunciation: 'braht', category: 'Family', icon: '👦' },
  { russian: 'муж', english: 'husband', pronunciation: 'moozh', category: 'Family', icon: '🤵' },
  { russian: 'жена', english: 'wife', pronunciation: 'zhe-nah', category: 'Family', icon: '👰' },
  { russian: 'метро', english: 'subway / metro', pronunciation: 'mee-troh', category: 'Travel', icon: '🚇' },
  { russian: 'поезд', english: 'train', pronunciation: 'poh-yezd', category: 'Travel', icon: '🚆' },
  { russian: 'такси', english: 'taxi', pronunciation: 'tahk-see', category: 'Travel', icon: '🚕' },
  { russian: 'автобус', english: 'bus', pronunciation: 'ahf-toh-boos', category: 'Travel', icon: '🚌' },
  { russian: 'машина', english: 'car', pronunciation: 'mah-shee-na', category: 'Travel', icon: '🚗' },
  { russian: 'самолёт', english: 'airplane', pronunciation: 'sah-mah-lyot', category: 'Travel', icon: '✈️' },
  { russian: 'красный', english: 'red', pronunciation: 'krah-sniy', category: 'Colors', icon: '🔴' },
  { russian: 'синий', english: 'blue', pronunciation: 'see-neey', category: 'Colors', icon: '🔵' },
  { russian: 'зелёный', english: 'green', pronunciation: 'zee-lyo-niy', category: 'Colors', icon: '🟢' },
  { russian: 'жёлтый', english: 'yellow', pronunciation: 'zhol-tiy', category: 'Colors', icon: '🟡' },
  { russian: 'чёрный', english: 'black', pronunciation: 'chor-niy', category: 'Colors', icon: '⚫' },
  { russian: 'белый', english: 'white', pronunciation: 'bye-liy', category: 'Colors', icon: '⚪' },
  { russian: 'большой', english: 'big', pronunciation: 'bal-shoy', category: 'Descriptions', icon: '🐘' },
  { russian: 'маленький', english: 'small', pronunciation: 'mah-leen-keey', category: 'Descriptions', icon: '🐁' },
  { russian: 'новый', english: 'new', pronunciation: 'noh-viy', category: 'Descriptions', icon: '🆕' },
  { russian: 'старый', english: 'old', pronunciation: 'stah-riy', category: 'Descriptions', icon: '🕰️' },
  { russian: 'солнце', english: 'sun', pronunciation: 'sohn-tse', category: 'Nature', icon: '☀️' },
  { russian: 'дождь', english: 'rain', pronunciation: 'dohsht', category: 'Weather', icon: '🌧️' },
  { russian: 'снег', english: 'snow', pronunciation: 'snyek', category: 'Weather', icon: '❄️' },
  { russian: 'ветер', english: 'wind', pronunciation: 'vye-teer', category: 'Weather', icon: '💨' },
  { russian: 'облако', english: 'cloud', pronunciation: 'oh-bla-ka', category: 'Weather', icon: '☁️' },
  { russian: 'гроза', english: 'storm', pronunciation: 'grah-zah', category: 'Weather', icon: '⛈️' },
  { russian: 'жарко', english: 'hot', pronunciation: 'zhar-ka', category: 'Descriptions', icon: '🔥' },
  { russian: 'холодно', english: 'cold', pronunciation: 'khoh-lad-na', category: 'Descriptions', icon: '🥶' },
  { russian: 'компьютер', english: 'computer', pronunciation: 'kam-pyoo-ter', category: 'Tech', icon: '💻' },
  { russian: 'телефон', english: 'phone', pronunciation: 'tee-lee-fohn', category: 'Tech', icon: '📱' },
  { russian: 'интернет', english: 'internet', pronunciation: 'een-ter-nyet', category: 'Tech', icon: '🌐' },
  { russian: 'пароль', english: 'password', pronunciation: 'pah-rohl', category: 'Tech', icon: '🔐' },
  { russian: 'электронная почта', english: 'email', pronunciation: 'eh-leek-troh-na-ya poch-ta', category: 'Tech', icon: '📧' },
  { russian: 'экран', english: 'screen', pronunciation: 'eh-krahn', category: 'Tech', icon: '🖥️' },
  { russian: 'встреча', english: 'meeting', pronunciation: 'fstrye-cha', category: 'Business', icon: '📅' },
  { russian: 'файл', english: 'file', pronunciation: 'fayl', category: 'Tech', icon: '📁' },
  { russian: 'ссылка', english: 'link', pronunciation: 'ssil-ka', category: 'Tech', icon: '🔗' },
  { russian: 'код', english: 'code', pronunciation: 'koht', category: 'Tech', icon: '🧑‍💻' },
  { russian: 'ошибка', english: 'error', pronunciation: 'ah-shib-ka', category: 'Tech', icon: '🐛' },
  { russian: 'батарея', english: 'battery', pronunciation: 'bah-tah-rye-ya', category: 'Tech', icon: '🔋' },
  { russian: 'проект', english: 'project', pronunciation: 'prah-yekt', category: 'Business', icon: '📊' },
  { russian: 'клиент', english: 'client', pronunciation: 'klee-yent', category: 'Business', icon: '🤝' },
  { russian: 'команда', english: 'team', pronunciation: 'kah-mahn-da', category: 'Business', icon: '👥' },
  { russian: 'руководитель', english: 'manager', pronunciation: 'roo-kah-vah-dee-teel', category: 'Business', icon: '👔' },
  { russian: 'компания', english: 'company', pronunciation: 'kam-pah-nee-ya', category: 'Business', icon: '🏢' },
  { russian: 'контракт', english: 'contract', pronunciation: 'kan-trahkt', category: 'Business', icon: '📝' },
  { russian: 'расписание', english: 'schedule', pronunciation: 'rahs-pee-sah-nee-ye', category: 'Business', icon: '🗓️' },
  { russian: 'срок', english: 'deadline', pronunciation: 'srohk', category: 'Business', icon: '⏳' },
  { russian: 'счёт', english: 'invoice', pronunciation: 'schyot', category: 'Business', icon: '🧾' },
  { russian: 'зарплата', english: 'salary', pronunciation: 'zahr-plah-ta', category: 'Business', icon: '💵' },
  { russian: 'врач', english: 'doctor', pronunciation: 'vrahch', category: 'Health', icon: '🩺' },
  { russian: 'лекарство', english: 'medicine', pronunciation: 'lee-kar-stva', category: 'Health', icon: '💊' },
  { russian: 'боль', english: 'pain', pronunciation: 'bohl', category: 'Health', icon: '🤕' },
  { russian: 'температура', english: 'fever', pronunciation: 'teem-pee-rah-too-ra', category: 'Health', icon: '🤒' },
  { russian: 'аллергия', english: 'allergy', pronunciation: 'ah-leer-gee-ya', category: 'Health', icon: '⚠️' },
  { russian: 'головная боль', english: 'headache', pronunciation: 'gah-lahv-na-ya bohl', category: 'Health', icon: '🧠' },
  { russian: 'скорая помощь', english: 'Ambulance / Emergency', pronunciation: 'skoh-ra-ya poh-masch', category: 'Health', icon: '🚑' },
  { russian: 'рецепт', english: 'prescription', pronunciation: 'ree-tsept', category: 'Health', icon: '📋' },
  { russian: 'бинт', english: 'bandage', pronunciation: 'beent', category: 'Health', icon: '🩹' },
  { russian: 'здоровье', english: 'health', pronunciation: 'zdah-rohv-ye', category: 'Health', icon: '❤️' },
  { russian: 'рейс', english: 'flight', pronunciation: 'reys', category: 'Travel', icon: '🛫' },
  { russian: 'багаж', english: 'luggage', pronunciation: 'bah-gahsh', category: 'Travel', icon: '🧳' },
  { russian: 'бронь', english: 'reservation', pronunciation: 'brohn', category: 'Travel', icon: '🛎️' },
  { russian: 'ключ', english: 'key', pronunciation: 'klyooch', category: 'Home', icon: '🔑' },
  { russian: 'номер', english: 'Room (hotel)', pronunciation: 'noh-meer', category: 'Travel', icon: '🛏️' },
  { russian: 'выход на посадку', english: 'gate', pronunciation: 'vi-khat na pah-sahd-koo', category: 'Travel', icon: '🚪' },
  { russian: 'карта', english: 'map', pronunciation: 'kar-ta', category: 'Travel', icon: '🗺️' },
  { russian: 'вход', english: 'entrance', pronunciation: 'fkhoht', category: 'Travel', icon: '➡️' },
  { russian: 'выход', english: 'exit', pronunciation: 'vi-khat', category: 'Travel', icon: '⬅️' },
  { russian: 'таможня', english: 'customs', pronunciation: 'tah-mohzh-nya', category: 'Travel', icon: '🛂' },
  { russian: 'банковская карта', english: 'credit card', pronunciation: 'bahn-kahf-ska-ya kar-ta', category: 'Shopping', icon: '💳' },
  { russian: 'наличные', english: 'cash', pronunciation: 'nah-leech-ni-ye', category: 'Finance', icon: '💵' },
  { russian: 'цена', english: 'price', pronunciation: 'tsee-nah', category: 'Shopping', icon: '🏷️' },
  { russian: 'дешёвый', english: 'cheap', pronunciation: 'dee-sho-viy', category: 'Shopping', icon: '👇' },
  { russian: 'дорогой', english: 'expensive', pronunciation: 'dah-rah-goy', category: 'Shopping', icon: '💎' },
  { russian: 'скидка', english: 'discount', pronunciation: 'skeed-ka', category: 'Shopping', icon: '🏷️' },
  { russian: 'Ноутбук', english: 'Laptop', pronunciation: 'noh-oot-BOOK', category: 'Tech', level: 1, icon: '💻' },
  { russian: 'Планшет', english: 'Tablet', pronunciation: 'plahn-SHEHT', category: 'Tech', level: 1, icon: '📱' },
  { russian: 'Клавиатура', english: 'Keyboard', pronunciation: 'klah-vee-ah-TOO-rah', category: 'Tech', level: 1, icon: '⌨️' },
  { russian: 'Мышь', english: 'Mouse', pronunciation: 'mysh', category: 'Tech', level: 1, icon: '🖱️' },
  { russian: 'Зарядка', english: 'Charger', pronunciation: 'zah-RYAHD-kah', category: 'Tech', level: 1, icon: '🔌' },
  { russian: 'Кабель', english: 'Cable', pronunciation: 'KAH-byel', category: 'Tech', level: 1, icon: '🔌' },
  { russian: 'Вайфай', english: 'Wi-Fi', pronunciation: 'vay-FAY', category: 'Tech', level: 1, icon: '📶' },
  { russian: 'Сообщение', english: 'Message', pronunciation: 'suh-uhb-SHCHEH-nee-yeh', category: 'Tech', level: 1, icon: '💬' },
  { russian: 'Сайт', english: 'Website', pronunciation: 'sayt', category: 'Tech', level: 1, icon: '🌐' },
  { russian: 'Приложение', english: 'App', pronunciation: 'pree-lah-ZHEH-nee-yeh', category: 'Tech', level: 1, icon: '📱' },
  { russian: 'Папка', english: 'Folder', pronunciation: 'PAHP-kah', category: 'Tech', level: 1, icon: '📁' },
  { russian: 'Камера', english: 'Camera', pronunciation: 'KAH-mye-rah', category: 'Tech', level: 1, icon: '📷' },
  { russian: 'Микрофон', english: 'Microphone', pronunciation: 'mee-kruh-FOHN', category: 'Tech', level: 1, icon: '🎙️' },
  { russian: 'Наушники', english: 'Headphones', pronunciation: 'nah-OOSH-nee-kee', category: 'Tech', level: 1, icon: '🎧' },
  { russian: 'Принтер', english: 'Printer', pronunciation: 'PREEN-tyer', category: 'Tech', level: 1, icon: '🖨️' },
  { russian: 'Искать', english: 'Search', pronunciation: 'ees-KAHT', category: 'Tech', level: 1, icon: '🔍' },
  { russian: 'Сохранить', english: 'Save', pronunciation: 'suh-khrah-NEET', category: 'Tech', level: 1, icon: '💾' },
  { russian: 'Удалить', english: 'Delete', pronunciation: 'oo-dah-LEET', category: 'Tech', level: 1, icon: '🗑️' },
  { russian: 'Отправить', english: 'Send', pronunciation: 'uht-PRAH-veet', category: 'Tech', level: 1, icon: '📤' },
  { russian: 'Скачать', english: 'Download', pronunciation: 'skah-CHAHT', category: 'Tech', level: 1, icon: '📥' },
  { russian: 'Загрузить', english: 'Upload', pronunciation: 'zah-groo-ZEET', category: 'Tech', level: 1, icon: '📤' },
  { russian: 'В сети', english: 'Online', pronunciation: 'vseh-TEE', category: 'Tech', level: 1, icon: '🟢' },
  { russian: 'Не в сети', english: 'Offline', pronunciation: 'nye vseh-TEE', category: 'Tech', level: 1, icon: '⚪' },
  { russian: 'Работа', english: 'Work / Job', pronunciation: 'rah-BOH-tah', category: 'Business', level: 1, icon: '💼' },
  { russian: 'Офис', english: 'Office', pronunciation: 'OH-fees', category: 'Business', level: 1, icon: '🏢' },
  { russian: 'Купить', english: 'Buy', pronunciation: 'koo-PEET', category: 'Shopping', level: 1, icon: '🛍️' },
  { russian: 'Продать', english: 'Sell', pronunciation: 'prah-DAHT', category: 'Shopping', level: 1, icon: '🏷️' },
  { russian: 'Платить', english: 'Pay', pronunciation: 'plah-TEET', category: 'Shopping', level: 1, icon: '💳' },
  { russian: 'Чек', english: 'Receipt', pronunciation: 'chek', category: 'Shopping', level: 1, icon: '🧾' },
  { russian: 'Поддержка', english: 'Support', pronunciation: 'puhd-DYEHRZH-kah', category: 'Tech', level: 1, icon: '💁' },
  { russian: 'Открыть', english: 'Open', pronunciation: 'uht-KRYT', category: 'Descriptions', level: 1, icon: '📂' },
  { russian: 'Закрыть', english: 'Close', pronunciation: 'zah-KRYT', category: 'Tech', level: 1, icon: '✖️' },
  { russian: 'Обновить', english: 'Update', pronunciation: 'uhb-nah-VEET', category: 'Tech', level: 1, icon: '🔄' },
  { russian: 'Начальник', english: 'Boss / Supervisor', pronunciation: 'nah-CHAHL-neek', category: 'Business', level: 2, icon: '👔' },
  { russian: 'Коллега', english: 'Colleague', pronunciation: 'kah-LYEH-gah', category: 'Business', level: 2, icon: '👥' },
  { russian: 'Сотрудник', english: 'Employee', pronunciation: 'sah-TROOD-neek', category: 'Business', level: 2, icon: '🧑‍💼' },
  { russian: 'Задача', english: 'Task', pronunciation: 'zah-DAH-chah', category: 'Business', level: 2, icon: '✅' },
  { russian: 'Отчёт', english: 'Report', pronunciation: 'aht-CHOHT', category: 'Business', level: 2, icon: '📑' },
  { russian: 'Презентация', english: 'Presentation', pronunciation: 'prye-zyen-TAH-tsee-yah', category: 'Business', level: 2, icon: '📽️' },
  { russian: 'Подпись', english: 'Signature', pronunciation: 'POHT-pees', category: 'Business', level: 2, icon: '✍️' },
  { russian: 'Отпуск', english: 'Vacation', pronunciation: 'OHT-poosk', category: 'Business', level: 2, icon: '🏖️' },
  { russian: 'Резюме', english: 'Resume', pronunciation: 'rye-zyoo-MEH', category: 'Business', level: 2, icon: '📄' },
  { russian: 'Собеседование', english: 'Job interview', pronunciation: 'suh-bye-SYEH-duh-vah-nee-yeh', category: 'Business', level: 2, icon: '👔' },
  { russian: 'Цель', english: 'Goal', pronunciation: 'tsel', category: 'Business', level: 2, icon: '🎯' },
  { russian: 'Продукт', english: 'Product', pronunciation: 'prah-DOOKT', category: 'Business', level: 2, icon: '📦' },
  { russian: 'Услуга', english: 'Service', pronunciation: 'oo-SLOO-gah', category: 'Business', level: 2, icon: '🛠️' },
  { russian: 'Перевод', english: 'Transfer', pronunciation: 'pyee-ryee-VOHD', category: 'Finance', level: 2, icon: '💸' },
  { russian: 'Возврат', english: 'Refund', pronunciation: 'vahz-VRAHT', category: 'Shopping', level: 2, icon: '↩️' },
  { russian: 'Доставка', english: 'Delivery / Shipping', pronunciation: 'dah-STAHV-kah', category: 'Shopping', level: 2, icon: '🚚' },
  { russian: 'Посылка', english: 'Package / Parcel', pronunciation: 'pah-SYL-kah', category: 'Shopping', level: 2, icon: '📦' },
  { russian: 'Программное обеспечение', english: 'Software', pronunciation: 'prah-GRAHM-noh-yeh ah-bee-spye-CHEH-nee-yeh', category: 'Tech', level: 3, icon: '💾' },
  { russian: 'Аппаратное обеспечение', english: 'Hardware', pronunciation: 'ah-pah-RAHT-noh-yeh ah-bee-spye-CHEH-nee-yeh', category: 'Tech', level: 3, icon: '🖥️' },
  { russian: 'База данных', english: 'Database', pronunciation: 'BAH-zah DAHN-nykh', category: 'Tech', level: 3, icon: '🗄️' },
  { russian: 'Сервер', english: 'Server', pronunciation: 'SYEHR-vyehr', category: 'Tech', level: 3, icon: '🖥️' },
  { russian: 'Облачное хранилище', english: 'Cloud storage', pronunciation: 'OH-blahch-noh-yeh khrah-NEE-lee-sheh', category: 'Tech', level: 3, icon: '☁️' },
  { russian: 'Искусственный интеллект', english: 'Artificial Intelligence (AI)', pronunciation: 'ees-KOOS-stvyen-ny een-teel-LYEKT', category: 'Tech', level: 3, icon: '🤖' },
  { russian: 'Алгоритм', english: 'Algorithm', pronunciation: 'uhl-gah-REETM', category: 'Tech', level: 3, icon: '📐' },
  { russian: 'Разработчик', english: 'Developer', pronunciation: 'rahz-rah-BOHT-cheek', category: 'Tech', level: 3, icon: '🧑‍💻' },
  { russian: 'Кибербезопасность', english: 'Cybersecurity', pronunciation: 'kee-byehr-bye-zah-PAHS-nahst', category: 'Tech', level: 3, icon: '🛡️' },
  { russian: 'Операционная система', english: 'Operating system', pronunciation: 'uh-pye-rah-tsee-OHN-nah-yah sees-TYEH-mah', category: 'Tech', level: 3, icon: '⚙️' },
  { russian: 'Бюджет', english: 'Budget', pronunciation: 'byood-ZHEHT', category: 'Finance', level: 3, icon: '💰' },
  { russian: 'Инвестиции', english: 'Investment', pronunciation: 'een-vye-STEE-tsee-ee', category: 'Finance', level: 3, icon: '📈' },
  { russian: 'Выручка', english: 'Revenue', pronunciation: 'VY-rooch-kah', category: 'Finance', level: 3, icon: '💵' },
  { russian: 'Стартап', english: 'Startup', pronunciation: 'stahr-TAHP', category: 'Business', level: 3, icon: '🚀' },
  { russian: 'Удалённая работа', english: 'Remote work', pronunciation: 'oo-dah-LYOHN-nah-yah rah-BOH-tah', category: 'Business', level: 3, icon: '🏠' },
  { russian: 'Отец', english: 'Father', pronunciation: 'ah-TYETS', category: 'Family', level: 1, icon: '👨' },
  { russian: 'Мать', english: 'Mother', pronunciation: 'MAHT', category: 'Family', level: 1, icon: '👩' },
  { russian: 'Учитель', english: 'Teacher', pronunciation: 'oo-CHEE-tyel', category: 'People', level: 2, icon: '🧑‍🏫' },
  { russian: 'Студент', english: 'Student', pronunciation: 'stoo-DYENT', category: 'People', level: 2, icon: '🧑‍🎓' },
  { russian: 'Рис', english: 'Rice', pronunciation: 'REES', category: 'Food & Drink', level: 1, icon: '🍚' },
  { russian: 'Соль', english: 'Salt', pronunciation: 'SOHL', category: 'Food & Drink', level: 1, icon: '🧂' },
  { russian: 'Яйцо', english: 'Egg', pronunciation: 'yye-TSOH', category: 'Food & Drink', level: 1, icon: '🥚' },
  { russian: 'Сок', english: 'Juice', pronunciation: 'SOHK', category: 'Food & Drink', level: 1, icon: '🧃' },
  { russian: 'Сыр', english: 'Cheese', pronunciation: 'SYR', category: 'Food & Drink', level: 1, icon: '🧀' },
  { russian: 'Яблоко', english: 'Apple', pronunciation: 'YAH-blah-kah', category: 'Food & Drink', level: 1, icon: '🍏' },
  { russian: 'Завтрак', english: 'Breakfast', pronunciation: 'ZAHF-trahk', category: 'Food & Drink', level: 2, icon: '🍳' },
  { russian: 'Обед', english: 'Lunch', pronunciation: 'ah-BYET', category: 'Food & Drink', level: 2, icon: '🥪' },
  { russian: 'Ужин', english: 'Dinner', pronunciation: 'OO-zheen', category: 'Food & Drink', level: 2, icon: '🍲' },
  { russian: 'Супермаркет', english: 'Supermarket', pronunciation: 'soo-peer-MAHR-kyet', category: 'Places', level: 2, icon: '🛒' },
  { russian: 'Центр', english: 'Center', pronunciation: 'TSYEN-tuhr', category: 'Places', level: 2, icon: '📍' },
  { russian: 'Школа', english: 'School', pronunciation: 'SHKOH-lah', category: 'Places', level: 2, icon: '🏫' },
  { russian: 'Завод', english: 'Factory', pronunciation: 'zah-VOHT', category: 'Places', level: 2, icon: '🏭' },
  { russian: 'Море', english: 'Sea', pronunciation: 'MOH-rye', category: 'Nature', level: 1, icon: '🌊' },
  { russian: 'Дорога', english: 'Road', pronunciation: 'dah-ROH-gah', category: 'Places', level: 1, icon: '🛤️' },
  { russian: 'Лодка', english: 'Boat', pronunciation: 'LOHT-kah', category: 'Travel', level: 1, icon: '⛵' },
  { russian: 'Стол', english: 'Table', pronunciation: 'STOHL', category: 'Home', level: 1, icon: 'svg:table' },
  { russian: 'Стул', english: 'Chair', pronunciation: 'STOOL', category: 'Home', level: 1, icon: '🪑' },
  { russian: 'Дверь', english: 'Door', pronunciation: 'DVYAYR', category: 'Home', level: 1, icon: '🚪' },
  { russian: 'Окно', english: 'Window', pronunciation: 'ahk-NOH', category: 'Home', level: 1, icon: '🪟' },
  { russian: 'Сумка', english: 'Bag', pronunciation: 'SOOM-kah', category: 'Home', level: 1, icon: '👜' },
  { russian: 'Одежда', english: 'Clothes', pronunciation: 'ah-DYEZH-dah', category: 'Home', level: 1, icon: '👕' },
  { russian: 'Обувь / Туфли', english: 'Shoes', pronunciation: 'OH-boof / TOO-flee', category: 'Home', level: 1, icon: '👟' },
  { russian: 'Книга', english: 'Book', pronunciation: 'KNEE-gah', category: 'Home', level: 1, icon: '📖' },
  { russian: 'Журнал', english: 'Magazine', pronunciation: 'zhoor-NAHL', category: 'Home', level: 2, icon: '📰' },
  { russian: 'Зонт', english: 'Umbrella', pronunciation: 'ZOHNT', category: 'Home', level: 1, icon: '☂️' },
  { russian: 'Фото', english: 'Photo', pronunciation: 'FOH-tah', category: 'Home', level: 1, icon: '📷' },
  { russian: 'Собака', english: 'Dog', pronunciation: 'sah-BAH-kah', category: 'Animals', level: 1, icon: '🐶' },
  { russian: 'Кот / Кошка', english: 'Cat', pronunciation: 'KOHT / KOHSH-kah', category: 'Animals', level: 1, icon: '🐱' },
  { russian: 'Птица', english: 'Bird', pronunciation: 'PTEE-tsah', category: 'Animals', level: 1, icon: '🐦' },
  { russian: 'Луна', english: 'Moon', pronunciation: 'loo-NAH', category: 'Nature', level: 1, icon: '🌙' },
  { russian: 'Звезда', english: 'Star', pronunciation: 'zvyez-DAH', category: 'Nature', level: 1, icon: '⭐' },
  { russian: 'Цветок', english: 'Flower', pronunciation: 'tsvee-TOHK', category: 'Nature', level: 1, icon: '🌸' },
  { russian: 'Дерево', english: 'Tree', pronunciation: 'DYE-ryee-vah', category: 'Nature', level: 1, icon: '🌲' },
  { russian: 'Хороший / Хорошо', english: 'Good', pronunciation: 'khah-ROH-sheey / khah-rah-SHOH', category: 'Descriptions', level: 1, icon: '👍' },
  { russian: 'Плохой / Плохо', english: 'Bad', pronunciation: 'plah-KHOY / PLOH-khah', category: 'Descriptions', level: 1, icon: '👎' },
  { russian: 'Быстрый / Быстро', english: 'Fast / Quick', pronunciation: 'BYS-try / BYS-trah', category: 'Descriptions', level: 1, icon: '⚡' },
  { russian: 'Медленный / Медленно', english: 'Slow', pronunciation: 'MYED-leen-ny / MYED-leen-nah', category: 'Descriptions', level: 1, icon: '🐢' },
  { russian: 'Счастливый / Рад', english: 'Happy', pronunciation: 'shees-LEE-vy / RAHT', category: 'Descriptions', level: 1, icon: '😊' },
  { russian: 'Готов / Готовый', english: 'Ready', pronunciation: 'gah-TOHF / gah-TOH-vy', category: 'Descriptions', level: 1, icon: '✅' },
  { russian: 'Закрыто / Закрытый', english: 'Closed', pronunciation: 'zah-KRY-tah / zah-KRY-ty', category: 'Descriptions', level: 1, icon: '🔴' },
  { russian: 'Месяц', english: 'Month', pronunciation: 'MYE-syets', category: 'Time', level: 1, icon: '📆' },
  { russian: 'Год', english: 'Year', pronunciation: 'GOHT', category: 'Time', level: 1, icon: '🎆' },
  { russian: 'Глаз', english: 'Eye', pronunciation: 'GLAHS', category: 'Health', level: 1, icon: '👁️' },
  { russian: 'Глаза', english: 'Eyes', pronunciation: 'glah-ZAH', category: 'Health', level: 1, icon: '👀' },
  { russian: 'Нос', english: 'Nose', pronunciation: 'NOHS', category: 'Health', level: 1, icon: '👃' },
  { russian: 'Щека', english: 'Cheek', pronunciation: 'shchee-KAH', category: 'Health', level: 1, icon: '😊' },
  { russian: 'Сердце', english: 'Heart', pronunciation: 'SYEHR-tseh', category: 'Health', level: 1, icon: '❤️' },
  { russian: 'Голос', english: 'Voice', pronunciation: 'GOH-lahs', category: 'Health', level: 1, icon: '🗣️' },
  { russian: 'Чашка', english: 'Cup', pronunciation: 'CHAHSH-kah', category: 'Food & Drink', level: 1, icon: '☕' },
  { russian: 'Стакан', english: 'Glass (cup)', pronunciation: 'stah-KAHN', category: 'Food & Drink', level: 1, icon: '🥛' },
  { russian: 'Чайник', english: 'Kettle', pronunciation: 'CHY-neek', category: 'Home', level: 1, icon: '🫖' },
  { russian: 'Масло', english: 'Oil', pronunciation: 'MAHS-lah', category: 'Food & Drink', level: 1, icon: '🫒' },
  { russian: 'Лимон', english: 'Lemon', pronunciation: 'lee-MOHN', category: 'Food & Drink', level: 1, icon: '🍋' },
  { russian: 'Апельсин', english: 'Orange', pronunciation: 'ah-pyel-SEEN', category: 'Food & Drink', level: 1, icon: '🍊' },
  { russian: 'Йогурт', english: 'Yogurt', pronunciation: 'YOH-goort', category: 'Food & Drink', level: 1, icon: '🥣' },
  { russian: 'Лёд', english: 'Ice', pronunciation: 'LYOHT', category: 'Food & Drink', level: 1, icon: '🧊' },
  { russian: 'Ёж', english: 'Hedgehog', pronunciation: 'YOHZH', category: 'Animals', level: 2, icon: '🦔' },
  { russian: 'Жук', english: 'Beetle / Bug', pronunciation: 'ZHOOK', category: 'Animals', level: 2, icon: '🪲' },
  { russian: 'Зебра', english: 'Zebra', pronunciation: 'ZYE-brah', category: 'Animals', level: 2, icon: '🦓' },
  { russian: 'Идея', english: 'Idea', pronunciation: 'ee-DYE-yah', category: 'Essentials', level: 1, icon: '💡' },
  { russian: 'Вопрос', english: 'Question', pronunciation: 'vah-PROHS', category: 'Essentials', level: 1, icon: '❓' },
  { russian: 'Успех', english: 'Success', pronunciation: 'oos-PYEKH', category: 'Essentials', level: 2, icon: '🏆' },
  { russian: 'Любовь', english: 'Love', pronunciation: 'lyoo-BOHF', category: 'Essentials', level: 1, icon: '❤️' },
  { russian: 'Имя', english: 'Name', pronunciation: 'EE-myah', category: 'Essentials', level: 1, icon: '🏷️' },
  { russian: 'Тихий', english: 'Quiet', pronunciation: 'TEE-kheey', category: 'Descriptions', level: 1, icon: '🤫' },
  { russian: 'Свет', english: 'Light', pronunciation: 'SVYET', category: 'Essentials', level: 1, icon: '💡' },
  { russian: 'Остров', english: 'Island', pronunciation: 'OHS-trahf', category: 'Nature', level: 1, icon: '🏝️' },
  { russian: 'Город', english: 'City', pronunciation: 'GOH-raht', category: 'Places', level: 1, icon: '🏙️' },
  { russian: 'Страна', english: 'Country', pronunciation: 'strah-NAH', category: 'Places', level: 1, icon: '🌍' },
  { russian: 'Вокзал', english: 'Train station', pronunciation: 'vahk-ZAHL', category: 'Travel', level: 1, icon: '🚉' },
  { russian: 'Мы', english: 'We', pronunciation: 'MY', category: 'People', level: 1, icon: '👥' },
  { russian: 'Помощь', english: 'Help', pronunciation: 'POH-mahshch', category: 'Essentials', level: 1, icon: '🆘' },
  { russian: 'Обувь', english: 'Shoe / Shoes', pronunciation: 'OH-boof', category: 'Essentials', level: 1, icon: '👞' },
  { russian: 'Фрукт', english: 'Fruit', pronunciation: 'FROOKT', category: 'Food & Drink', level: 1, icon: '🍎' },
  { russian: 'Часы', english: 'Clock / Watch', pronunciation: 'chah-SY', category: 'Home', level: 1, icon: '⏰' },
  { russian: 'Виноград', english: 'Grape', pronunciation: 'vee-nah-GRAHT', category: 'Food & Drink', level: 1, icon: '🍇' },
  { russian: 'Рентген', english: 'X-ray', pronunciation: 'ryen-TGYEN', category: 'Health', level: 2, icon: '🩻' },
  { russian: 'Ксилофон', english: 'Xylophone', pronunciation: 'ksee-lah-FOHN', category: 'Home', level: 2, icon: '🎵' },
  { russian: 'Быстрый', english: 'Fast', pronunciation: 'BY-stry', category: 'Descriptions', level: 1, icon: '🚀' },
  { russian: 'Фиолетовый', english: 'Purple', pronunciation: 'fee-ah-LYEH-tah-vy', category: 'Colors', level: 1, icon: '🟣' },
  { russian: 'Розовый', english: 'Pink', pronunciation: 'ROH-zah-vy', category: 'Colors', level: 1, icon: '🌸' },
  { russian: 'Серый', english: 'Gray', pronunciation: 'SYEH-ry', category: 'Colors', level: 1, icon: '🔘' },
  { russian: 'Учиться', english: 'To learn', pronunciation: 'oo-CHEET-syah', category: 'Verbs', level: 1, icon: '📚' },
  { russian: 'Говорить', english: 'To speak', pronunciation: 'gah-vah-REET', category: 'Verbs', level: 1, icon: '🗣️' },
  { russian: 'Есть', english: 'To eat', pronunciation: 'YEST', category: 'Verbs', level: 1, icon: '🍽️' },
  { russian: 'Пить', english: 'To drink', pronunciation: 'PEET', category: 'Verbs', level: 1, icon: '🥤' },
  { russian: 'Идти', english: 'To go', pronunciation: 'eet-TEE', category: 'Verbs', level: 1, icon: '🚶' },
  { russian: 'Приходить', english: 'To come', pronunciation: 'pree-khah-DEET', category: 'Verbs', level: 1, icon: '🚶‍♂️' },
  { russian: 'Понимать', english: 'To understand', pronunciation: 'pah-nee-MAHT', category: 'Verbs', level: 1, icon: '💡' },
  { russian: 'Знать', english: 'To know', pronunciation: 'ZNAHT', category: 'Verbs', level: 1, icon: '🧠' },
  { russian: 'Покупать', english: 'To buy', pronunciation: 'pah-koo-PAHT', category: 'Verbs', level: 1, icon: '🛍️' },
  { russian: 'Помогать', english: 'To help', pronunciation: 'pah-mah-GAHT', category: 'Verbs', level: 1, icon: '🤝' },
  { russian: 'Работать', english: 'To work', pronunciation: 'rah-BOH-taht', category: 'Verbs', level: 1, icon: '💼' },
  { russian: 'Хотеть', english: 'To want', pronunciation: 'khah-TYEHT', category: 'Verbs', level: 1, icon: '💭' },
  { russian: 'Карта / Карточка', english: 'Card', pronunciation: 'KAHR-tah / KAHR-tach-kah', category: 'Places', level: 1, icon: '📍' },
  { russian: 'Объект / Предмет', english: 'Object', pronunciation: 'ahb-YEKT / preed-MYET', category: 'Home', level: 1, icon: '📦' },
  { russian: 'Ёлка', english: 'Christmas tree', pronunciation: 'YOHL-kah', category: 'Nature', level: 1, icon: '🌿' },
  { russian: 'Килограмм', english: 'Kilogram', pronunciation: 'kee-lah-GRAHM', category: 'Home', level: 1, icon: '⚖️' },
  { russian: 'Ночь', english: 'Night', pronunciation: 'nohch\'', category: 'Time', level: 1, icon: '🌙' },
  { russian: 'Веб', english: 'Web', pronunciation: 'vehp', category: 'Tech', level: 1, icon: '🌐' },
  { russian: 'Желток', english: 'Yolk', pronunciation: 'zheel-TOHK', category: 'Food & Drink', level: 1, icon: '🍽️' },
  { russian: 'Вагон', english: 'Wagon / Car', pronunciation: 'vah-GOHN', category: 'Travel', level: 1, icon: '📍' },
  { russian: 'Пример', english: 'Example', pronunciation: 'pree-MYER', category: 'Home', level: 1, icon: '📝' },
  { russian: 'Утро', english: 'Morning', pronunciation: 'OO-trah', category: 'Time', level: 1, icon: '🌅' },
  { russian: 'День (после полудня)', english: 'Afternoon', pronunciation: 'dyen\' (POH-slye pah-LOOD-nya)', category: 'Time', level: 1, icon: '☀️' },
  { russian: 'Вечер', english: 'Evening', pronunciation: 'VYE-cheer', category: 'Time', level: 1, icon: '🌆' },
  { russian: 'Царь', english: 'Czar / King', pronunciation: 'tsahr\'', category: 'People', level: 1, icon: '👑' },
  { russian: 'Борщ', english: 'Borscht', pronunciation: 'bohrshch', category: 'Food & Drink', level: 1, icon: '🍽️' },
  { russian: 'Юг', english: 'South', pronunciation: 'yook', category: 'Nature', level: 1, icon: '🧭' },
  { russian: 'Источник', english: 'Source', pronunciation: 'ees-TOHCH-neek', category: 'Home', level: 1, icon: '⛲' },
  { russian: 'Или', english: 'Or', pronunciation: 'EE-lee', category: 'Essentials', level: 1, icon: '🔀' },
  { russian: 'Это', english: 'This', pronunciation: 'EH-tah', category: 'Essentials', level: 1, icon: '👉' },
  { russian: 'Может быть', english: 'Maybe', pronunciation: 'MOH-zhet byt\'', category: 'Essentials', level: 1, icon: '🤔' },
  { russian: 'Нуждаться (нужно)', english: 'To need', pronunciation: 'noozh-DAHT-sya (NOOZH-nah)', category: 'Verbs', level: 1, icon: '⚡' },
  { russian: 'Банан', english: 'Banana', pronunciation: 'bah-NAHN', category: 'Food & Drink', icon: '🍌' },
  { russian: 'Мост', english: 'Bridge', pronunciation: 'mohst', category: 'Places', icon: '🌉' },
  { russian: 'Рагу', english: 'Stew', pronunciation: 'rah-GOO', category: 'Food & Drink', icon: '🍲' },
  { russian: 'Радио', english: 'Radio', pronunciation: 'RAH-dee-oh', category: 'Home', icon: '📻' },
  { russian: 'Письменный стол', english: 'Desk', pronunciation: 'PEES-myen-ny stohl', category: 'Home', icon: '🪑' },
  { russian: 'Музыка', english: 'Music', pronunciation: 'MOO-zy-kah', category: 'Home', icon: '🎵' },
  { russian: 'Клубника', english: 'Strawberry', pronunciation: 'kloob-NEE-kah', category: 'Food & Drink', icon: '🍓' },
  { russian: 'Чеснок', english: 'Garlic', pronunciation: 'chees-NOHK', category: 'Food & Drink', icon: '🧄' },
  { russian: 'Картофель', english: 'Potato', pronunciation: 'kahr-TOH-feel\'', category: 'Food & Drink', icon: '🥔' },
  { russian: 'Лук', english: 'Onion', pronunciation: 'look', category: 'Food & Drink', icon: '🧅' },
  { russian: 'Морковь', english: 'Carrot', pronunciation: 'mahr-KOHF\'', category: 'Food & Drink', icon: '🥕' },
  { russian: 'Ложка', english: 'Spoon', pronunciation: 'LOHSH-kah', category: 'Food & Drink', icon: '🥄' },
  { russian: 'Вилка', english: 'Fork', pronunciation: 'VEEL-kah', category: 'Food & Drink', icon: '🍴' },
  { russian: 'Нож', english: 'Knife', pronunciation: 'nohsh', category: 'Food & Drink', icon: '🔪' },
  { russian: 'Тарелка', english: 'Plate', pronunciation: 'tah-RYEL-kah', category: 'Food & Drink', icon: '🍽️' },
  { russian: 'Велосипед', english: 'Bicycle', pronunciation: 'vee-lah-see-PYET', category: 'Travel', icon: '🚲' },
  { russian: 'Чемодан', english: 'Suitcase', pronunciation: 'chee-mah-DAHN', category: 'Travel', icon: '🧳' },
  { russian: 'Рюкзак', english: 'Backpack', pronunciation: 'ryook-ZAHK', category: 'Travel', icon: '🎒' },
  { russian: 'Кошелёк', english: 'Wallet', pronunciation: 'kah-shee-LYOHK', category: 'Shopping', icon: '👛' },
  { russian: 'Пожарный', english: 'Firefighter', pronunciation: 'pah-ZHAHR-ny', category: 'People', icon: '🧑‍🚒' },
  { russian: 'Пляж', english: 'Beach', pronunciation: 'plyahsh', category: 'Nature', icon: '🏖️' },
  { russian: 'Гора', english: 'Mountain', pronunciation: 'gah-RAH', category: 'Nature', icon: '⛰️' },
  { russian: 'Река', english: 'River', pronunciation: 'ree-KAH', category: 'Nature', icon: '🌊' },
  { russian: 'Озеро', english: 'Lake', pronunciation: 'OH-zee-rah', category: 'Nature', icon: '🏞️' }
];

// Time expressions and telling time
const time: PhraseItem[] = [
  // Asking the time & basics
  {
    russian: 'Который час?',
    english: 'What time is it?',
    pronunciation: 'kah-TOH-riy chas',
    category: 'Questions',
    icon: '⌚'
  },
  {
    russian: 'Сколько сейчас времени?',
    english: 'What time is it now?',
    pronunciation: 'SKOHL-kah see-CHAS VRYE-mee-nee',
    category: 'Questions',
    icon: '🕒'
  },
  {
    russian: 'Во сколько?',
    english: 'At what time?',
    pronunciation: 'vah SKOHL-kah',
    category: 'Questions',
    icon: '❓'
  },
  {
    russian: 'время',
    english: 'time',
    pronunciation: 'VRYE-mya',
    category: 'Time',
    icon: '⏱️'
  },
  {
    russian: 'сейчас',
    english: 'now',
    pronunciation: 'see-CHAS',
    category: 'Time',
    icon: '📍'
  },
  {
    russian: 'час',
    english: 'hour',
    pronunciation: 'chas',
    category: 'Time',
    icon: '⌛'
  },
  {
    russian: 'минута',
    english: 'minute',
    pronunciation: 'mee-NOO-ta',
    category: 'Time',
    icon: '⏲️'
  },
  {
    russian: 'секунда',
    english: 'second',
    pronunciation: 'see-KOON-da',
    category: 'Time',
    icon: '⏱️'
  },

  // Hours (Genitive agreement: час, часа, часов)
  {
    russian: 'Один час',
    english: 'One o\'clock',
    pronunciation: 'ah-DEEN chas',
    category: 'Hour',
    icon: '🕐'
  },
  {
    russian: 'Два часа',
    english: 'Two o\'clock',
    pronunciation: 'dvah cha-SAH',
    category: 'Hour',
    icon: '🕑'
  },
  {
    russian: 'Три часа',
    english: 'Three o\'clock',
    pronunciation: 'tree cha-SAH',
    category: 'Hour',
    icon: '🕒'
  },
  {
    russian: 'Четыре часа',
    english: 'Four o\'clock',
    pronunciation: 'chee-TY-rye cha-SAH',
    category: 'Hour',
    icon: '🕓'
  },
  {
    russian: 'Пять часов',
    english: 'Five o\'clock',
    pronunciation: 'pyat\' cha-SOHF',
    category: 'Hour',
    icon: '🕔'
  },
  {
    russian: 'Шесть часов',
    english: 'Six o\'clock',
    pronunciation: 'shest\' cha-SOHF',
    category: 'Hour',
    icon: '🕕'
  },
  {
    russian: 'Семь часов',
    english: 'Seven o\'clock',
    pronunciation: 'syem\' cha-SOHF',
    category: 'Hour',
    icon: '🕖'
  },
  {
    russian: 'Восемь часов',
    english: 'Eight o\'clock',
    pronunciation: 'VOH-seem\' cha-SOHF',
    category: 'Hour',
    icon: '🕗'
  },
  {
    russian: 'Девять часов',
    english: 'Nine o\'clock',
    pronunciation: 'DYEH-veet\' cha-SOHF',
    category: 'Hour',
    icon: '🕘'
  },
  {
    russian: 'Десять часов',
    english: 'Ten o\'clock',
    pronunciation: 'DYEH-seet\' cha-SOHF',
    category: 'Hour',
    icon: '🕙'
  },
  {
    russian: 'Одиннадцать часов',
    english: 'Eleven o\'clock',
    pronunciation: 'ah-DEE-nat-sat\' cha-SOHF',
    category: 'Hour',
    icon: '🕚'
  },
  {
    russian: 'Двенадцать часов',
    english: 'Twelve o\'clock',
    pronunciation: 'dvye-NAT-sat\' cha-SOHF',
    category: 'Hour',
    icon: '🕛'
  },

  // Times of Day (genitive forms used after hours, e.g. «два часа дня»)
  {
    russian: 'утра',
    english: 'in the morning (a.m.)',
    pronunciation: 'oot-RAH',
    category: 'Time of Day',
    icon: '🌅'
  },
  {
    russian: 'дня',
    english: 'in the afternoon (p.m.)',
    pronunciation: 'dnya',
    category: 'Time of Day',
    icon: '☀️'
  },
  {
    russian: 'вечера',
    english: 'in the evening (p.m.)',
    pronunciation: 'VYE-chee-rah',
    category: 'Time of Day',
    icon: '🌆'
  },
  {
    russian: 'ночи',
    english: 'at night',
    pronunciation: 'NOH-chee',
    category: 'Time of Day',
    icon: '🌙'
  },
  {
    russian: 'полдень',
    english: 'noon / midday',
    pronunciation: 'POHL-dyen\'',
    category: 'Special',
    icon: '☀️'
  },
  {
    russian: 'полночь',
    english: 'midnight',
    pronunciation: 'POHL-nach',
    category: 'Special',
    icon: '🌑'
  },

  // Practical Expressions
  {
    russian: 'полчаса',
    english: 'half an hour',
    pronunciation: 'pohl-cha-SAH',
    category: 'Minutes',
    icon: '⏳'
  },
  {
    russian: 'четверть часа',
    english: 'quarter of an hour',
    pronunciation: 'CHYET-vyert\' cha-SAH',
    category: 'Minutes',
    icon: '⏱️'
  },
  {
    russian: 'Половина первого',
    english: 'Half past twelve (12:30)',
    pronunciation: 'pah-lah-VEE-nah PYER-vah-vah',
    category: 'Minutes',
    icon: '🕧'
  },
  {
    russian: 'Без десяти два',
    english: 'Ten to two (1:50)',
    pronunciation: 'byez dye-see-TEE dvah',
    category: 'Minutes',
    icon: '🕑'
  },
  {
    russian: 'Ровно три часа',
    english: 'Exactly three o\'clock',
    pronunciation: 'ROHV-nah tree cha-SAH',
    category: 'Special',
    icon: '🕒'
  },
  {
    russian: 'вовремя',
    english: 'on time',
    pronunciation: 'VOH-vrye-mya',
    category: 'Special',
    icon: '✅'
  },
  {
    russian: 'рано',
    english: 'early',
    pronunciation: 'RAH-nah',
    category: 'Special',
    icon: '🌅'
  },
  {
    russian: 'поздно',
    english: 'late',
    pronunciation: 'POHZ-nah',
    category: 'Special',
    icon: '🌙'
  },
  // Days of the Week & Calendar
  {
    russian: 'понедельник',
    english: 'Monday',
    pronunciation: 'pah-nee-DYEL\'-neek',
    category: 'Calendar',
    icon: '📅'
  },
  {
    russian: 'вторник',
    english: 'Tuesday',
    pronunciation: 'FTOHR-neek',
    category: 'Calendar',
    icon: '📅'
  },
  {
    russian: 'среда',
    english: 'Wednesday',
    pronunciation: 'srye-DAH',
    category: 'Calendar',
    icon: '📅'
  },
  {
    russian: 'четверг',
    english: 'Thursday',
    pronunciation: 'cheet-VYERK',
    category: 'Calendar',
    icon: '📅'
  },
  {
    russian: 'пятница',
    english: 'Friday',
    pronunciation: 'PYAT-nee-tsa',
    category: 'Calendar',
    icon: '📅'
  },
  {
    russian: 'суббота',
    english: 'Saturday',
    pronunciation: 'soo-BOH-ta',
    category: 'Calendar',
    icon: '📅'
  },
  {
    russian: 'воскресенье',
    english: 'Sunday',
    pronunciation: 'vah-skrye-SYEN\'-ye',
    category: 'Calendar',
    icon: '📅'
  },
  {
    russian: 'сегодня',
    english: 'today',
    pronunciation: 'see-VOH-dnya',
    category: 'Calendar',
    icon: '📆'
  },
  {
    russian: 'вчера',
    english: 'yesterday',
    pronunciation: 'fchee-RAH',
    category: 'Calendar',
    icon: '⏮️'
  },
  {
    russian: 'завтра',
    english: 'tomorrow',
    pronunciation: 'ZAHF-tra',
    category: 'Calendar',
    icon: '⏭️'
  },
  {
    russian: 'день',
    english: 'day',
    pronunciation: 'dyen\'',
    category: 'Calendar',
    icon: '☀️'
  },
  {
    russian: 'неделя',
    english: 'week',
    pronunciation: 'nee-DYE-lya',
    category: 'Calendar',
    icon: '🗓️'
  }
];

// Export all data
const russianData = {
  alphabet,
  basicPhrases,
  numbers,
  commonWords,
  time,
  grammar: RUSSIAN_GRAMMAR
};

export default russianData;