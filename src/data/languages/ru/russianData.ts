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
    russianWord: 'йогурт',
    englishWord: 'yogurt',
    icon: '🥛'
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
    example: 'as in more',
    russianWord: 'окно',
    englishWord: 'window',
    icon: '🪟'
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
    example: 'as in fresh cheese',
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
    pronunciation: 'i',
    example: 'no English equivalent',
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
    pronunciation: 'dah svee-dah-nee-ye',
    category: 'Farewells',
    icon: '🚪'
  },
  {
    russian: 'Спасибо',
    english: 'Thank you',
    pronunciation: 'spah-see-bah',
    category: 'Politeness',
    icon: '🙏'
  },
  {
    russian: 'Пожалуйста',
    english: 'Please / You\'re welcome',
    pronunciation: 'pah-zhal-stah',
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
    pronunciation: 'eez-vee-nee-tye',
    category: 'Politeness',
    icon: '🙇'
  },
  {
    russian: 'Как дела',
    english: 'How are you',
    pronunciation: 'kahk dee-lah',
    category: 'Conversation',
    icon: '😊'
  },
  {
    russian: 'Хорошо',
    english: 'Good / Well',
    pronunciation: 'khah-rah-shoh',
    category: 'Responses',
    icon: '👍'
  },
  {
    russian: 'Плохо',
    english: 'Bad / Poorly',
    pronunciation: 'ploh-khah',
    category: 'Responses',
    icon: '👎'
  },
  {
    russian: 'Я не понимаю',
    english: 'I don\'t understand',
    pronunciation: 'ya nee pah-nee-mah-yu',
    category: 'Conversation',
    icon: '🤔'
  },
  {
    russian: 'Говорите медленнее',
    english: 'Speak more slowly',
    pronunciation: 'gah-vah-ree-tye myed-lyen-nye-ye',
    category: 'Conversation',
    icon: '🐢'
  },
  {
    russian: 'Повторите пожалуйста',
    english: 'Please repeat',
    pronunciation: 'pahf-tah-ree-tye pah-zhal-stah',
    category: 'Conversation',
    icon: '🔄'
  },
  {
    russian: 'Меня зовут',
    english: 'My name is',
    pronunciation: 'mee-nya zah-voot',
    category: 'Introductions',
    icon: '🏷️'
  },
  {
    russian: 'Сколько стоит',
    english: 'How much does it cost',
    pronunciation: 'skohl-kah stoh-eet',
    category: 'Shopping',
    icon: '💰'
  },
  {
    russian: 'Где туалет',
    english: 'Where is the bathroom',
    pronunciation: 'gdye too-ah-lyet',
    category: 'Travel',
    icon: '🚻'
  },
  {
    russian: 'Помогите',
    english: 'Help me',
    pronunciation: 'pah-mah-gee-tye',
    category: 'Emergency',
    icon: '🆘'
  },
  {
    russian: 'Я хочу есть',
    english: 'I want to eat',
    pronunciation: 'ya khah-choo yest',
    category: 'Dining',
    icon: '🍽️'
  },
  {
    russian: 'Я хочу пить',
    english: 'I want to drink',
    pronunciation: 'ya khah-choo peet',
    category: 'Dining',
    icon: '💧'
  },
  {
    russian: 'Доброе утро',
    english: 'Good morning',
    pronunciation: 'doh-bra-ye oo-tra',
    category: 'Greetings',
    icon: '🌅'
  },
  {
    russian: 'Добрый день',
    english: 'Good afternoon',
    pronunciation: 'doh-briy dyen\'',
    category: 'Greetings',
    icon: '☀️'
  },
  {
    russian: 'Добрый вечер',
    english: 'Good evening',
    pronunciation: 'doh-briy vye-cheer',
    category: 'Greetings',
    icon: '🌆'
  },
  {
    russian: 'Спокойной ночи',
    english: 'Good night',
    pronunciation: 'spah-koy-nay noh-chee',
    category: 'Greetings',
    icon: '🌙'
  },
  {
    russian: 'Пока',
    english: 'Bye (informal)',
    pronunciation: 'pah-kah',
    category: 'Farewells',
    icon: '👋'
  },
  {
    russian: 'Очень приятно',
    english: 'Nice to meet you',
    pronunciation: 'oh-cheen\' pree-yat-na',
    category: 'Introductions',
    icon: '🤝'
  },
  {
    russian: 'Не за что',
    english: 'You\'re welcome / Not at all',
    pronunciation: 'nye za shta',
    category: 'Politeness',
    icon: '🤗'
  },
  {
    russian: 'Вы говорите по-английски?',
    english: 'Do you speak English?',
    pronunciation: 'vy gah-vah-ree-tye pah ahn-gleey-skee',
    category: 'Conversation',
    icon: '🗣️'
  },
  {
    russian: 'Я немного говорю по-русски',
    english: 'I speak a little Russian',
    pronunciation: 'ya nye-mnoh-gah gah-vah-ryoo pah roos-kee',
    category: 'Conversation',
    icon: '💬'
  },
  {
    russian: 'Как это по-русски?',
    english: 'How do you say this in Russian?',
    pronunciation: 'kak eh-ta pah roos-kee',
    category: 'Conversation',
    icon: '❓'
  },
  {
    russian: 'Вы меня слышите?',
    english: 'Can you hear me?',
    pronunciation: 'vy mee-nya sli-shi-tye',
    category: 'Tech',
    icon: '🎧'
  },
  {
    russian: 'Видно мой экран?',
    english: 'Can you see my screen?',
    pronunciation: 'veed-na moy eh-krahn',
    category: 'Tech',
    icon: '🖥️'
  },
  {
    russian: 'Какой пароль от вайфая?',
    english: 'What is the Wi-Fi password?',
    pronunciation: 'kah-koy pah-rohl aht vay-fa-ya',
    category: 'Tech',
    icon: '📶'
  },
  // Business & Office
  {
    russian: 'Давайте назначим встречу',
    english: 'Let\'s schedule a meeting',
    pronunciation: 'dah-vay-tye nahz-nah-cheem fstrye-choo',
    category: 'Business',
    icon: '📅'
  },
  {
    russian: 'Я отправлю вам письмо',
    english: 'I will send you an email',
    pronunciation: 'ya aht-prahv-lyoo vahm pees-moh',
    category: 'Business',
    icon: '📧'
  },
  {
    russian: 'Какой крайний срок?',
    english: 'When is the deadline?',
    pronunciation: 'kah-koy kray-neey srohk',
    category: 'Business',
    icon: '⏳'
  },
  // Healthcare & Pharmacy
  {
    russian: 'Мне нужен врач',
    english: 'I need a doctor',
    pronunciation: 'mnye noo-zhen vrahch',
    category: 'Health',
    icon: '🩺'
  },
  {
    russian: 'Где ближайшая аптека?',
    english: 'Where is the nearest pharmacy?',
    pronunciation: 'gdye blee-zhay-sha-ya ap-tye-ka',
    category: 'Health',
    icon: '💊'
  },
  {
    russian: 'У меня аллергия на орехи',
    english: 'I am allergic to nuts',
    pronunciation: 'oo mee-nya ah-leer-gee-ya na ah-rye-khee',
    category: 'Health',
    icon: '⚠️'
  },
  // Hotel, Airport & Travel
  {
    russian: 'У меня есть бронь',
    english: 'I have a reservation',
    pronunciation: 'oo mee-nya yest brohn',
    category: 'Travel',
    icon: '🛎️'
  },
  {
    russian: 'Где находится вокзал?',
    english: 'Where is the train station?',
    pronunciation: 'gdye nah-khoh-deet-sya vahk-zahl',
    category: 'Travel',
    icon: '🚉'
  },
  {
    russian: 'Мне нужно такси',
    english: 'I need a taxi',
    pronunciation: 'mnye noozh-na tahk-see',
    category: 'Travel',
    icon: '🚕'
  },
  // Dining & Shopping
  {
    russian: 'Столик на двоих, пожалуйста',
    english: 'A table for two, please',
    pronunciation: 'stoh-leek na dvah-eekh pah-zhal-stah',
    category: 'Dining',
    icon: '🍽️'
  },
  {
    russian: 'Меню, пожалуйста',
    english: 'The menu, please',
    pronunciation: 'mee-nyoo pah-zhal-stah',
    category: 'Dining',
    icon: '📖'
  },
  {
    russian: 'Вы принимаете банковские карты?',
    english: 'Do you accept credit cards?',
    pronunciation: 'vy pree-nee-mah-ye-tye bahn-kahf-skee-ye kar-ti',
    category: 'Shopping',
    icon: '💳'
  },
  {
    russian: 'Это слишком дорого',
    english: 'It is too expensive',
    pronunciation: 'eh-ta sleesh-kam doh-ra-ga',
    category: 'Shopping',
    icon: '💸'
  }
];

// Numbers in Russian
const numbers: PhraseItem[] = [
  {
    russian: 'ноль',
    english: 'Zero',
    pronunciation: 'nohl',
    category: 'Numbers 0-10'
  },
  {
    russian: 'один',
    english: 'One',
    pronunciation: 'ah-deen',
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
    pronunciation: 'chee-tih-rye',
    category: 'Numbers 0-10'
  },
  {
    russian: 'пять',
    english: 'Five',
    pronunciation: 'pyat',
    category: 'Numbers 0-10'
  },
  {
    russian: 'шесть',
    english: 'Six',
    pronunciation: 'shest',
    category: 'Numbers 0-10'
  },
  {
    russian: 'семь',
    english: 'Seven',
    pronunciation: 'syem',
    category: 'Numbers 0-10'
  },
  {
    russian: 'восемь',
    english: 'Eight',
    pronunciation: 'voh-seem',
    category: 'Numbers 0-10'
  },
  {
    russian: 'девять',
    english: 'Nine',
    pronunciation: 'dyeh-vyet',
    category: 'Numbers 0-10'
  },
  {
    russian: 'десять',
    english: 'Ten',
    pronunciation: 'dyeh-syet',
    category: 'Numbers 0-10'
  },
  {
    russian: 'одиннадцать',
    english: 'Eleven',
    pronunciation: 'ah-deen-nad-tsat',
    category: 'Numbers 11-20'
  },
  {
    russian: 'двенадцать',
    english: 'Twelve',
    pronunciation: 'dvye-nad-tsat',
    category: 'Numbers 11-20'
  },
  {
    russian: 'тринадцать',
    english: 'Thirteen',
    pronunciation: 'tree-nad-tsat',
    category: 'Numbers 11-20'
  },
  {
    russian: 'четырнадцать',
    english: 'Fourteen',
    pronunciation: 'chee-tir-nad-tsat',
    category: 'Numbers 11-20'
  },
  {
    russian: 'пятнадцать',
    english: 'Fifteen',
    pronunciation: 'peet-nad-tsat',
    category: 'Numbers 11-20'
  },
  {
    russian: 'шестнадцать',
    english: 'Sixteen',
    pronunciation: 'shest-nad-tsat',
    category: 'Numbers 11-20'
  },
  {
    russian: 'семнадцать',
    english: 'Seventeen',
    pronunciation: 'seem-nad-tsat',
    category: 'Numbers 11-20'
  },
  {
    russian: 'восемнадцать',
    english: 'Eighteen',
    pronunciation: 'vah-seem-nad-tsat',
    category: 'Numbers 11-20'
  },
  {
    russian: 'девятнадцать',
    english: 'Nineteen',
    pronunciation: 'dee-veet-nad-tsat',
    category: 'Numbers 11-20'
  },
  {
    russian: 'двадцать',
    english: 'Twenty',
    pronunciation: 'dvad-tsat',
    category: 'Tens'
  },
  {
    russian: 'тридцать',
    english: 'Thirty',
    pronunciation: 'treed-tsat',
    category: 'Tens'
  },
  {
    russian: 'сорок',
    english: 'Forty',
    pronunciation: 'soh-rak',
    category: 'Tens'
  },
  {
    russian: 'пятьдесят',
    english: 'Fifty',
    pronunciation: 'pee-dee-seat',
    category: 'Tens'
  },
  {
    russian: 'шестьдесят',
    english: 'Sixty',
    pronunciation: 'shest-dee-seat',
    category: 'Tens'
  },
  {
    russian: 'семьдесят',
    english: 'Seventy',
    pronunciation: 'sem-dee-seat',
    category: 'Tens'
  },
  {
    russian: 'восемьдесят',
    english: 'Eighty',
    pronunciation: 'voh-seem-dee-seat',
    category: 'Tens'
  },
  {
    russian: 'девяносто',
    english: 'Ninety',
    pronunciation: 'dev-ya-noh-stah',
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
    pronunciation: 'tih-see-cha',
    category: 'Thousands'
  }
];

// Common words for everyday use
const commonWords: PhraseItem[] = [
  {
    russian: 'мужчина',
    english: 'man',
    pronunciation: 'moosh-chee-na',
    category: 'People',
    icon: '👨'
  },
  {
    russian: 'женщина',
    english: 'woman',
    pronunciation: 'zhen-shee-na',
    category: 'People',
    icon: '👩'
  },
  {
    russian: 'ребенок',
    english: 'child',
    pronunciation: 'ree-byo-nok',
    category: 'People',
    icon: '🧒'
  },
  {
    russian: 'мальчик',
    english: 'boy',
    pronunciation: 'mahl-cheek',
    category: 'People',
    icon: '👦'
  },
  {
    russian: 'девочка',
    english: 'girl',
    pronunciation: 'dyeh-vach-ka',
    category: 'People',
    icon: '👧'
  },
  {
    russian: 'друг',
    english: 'friend',
    pronunciation: 'drook',
    category: 'People',
    icon: '🤝'
  },
  {
    russian: 'еда',
    english: 'food',
    pronunciation: 'ye-da',
    category: 'Food & Drink',
    icon: '🍲'
  },
  {
    russian: 'вода',
    english: 'water',
    pronunciation: 'va-da',
    category: 'Food & Drink',
    icon: '💧'
  },
  {
    russian: 'хлеб',
    english: 'bread',
    pronunciation: 'khlyep',
    category: 'Food & Drink',
    icon: '🍞'
  },
  {
    russian: 'молоко',
    english: 'milk',
    pronunciation: 'ma-la-ko',
    category: 'Food & Drink',
    icon: '🥛'
  },
  {
    russian: 'мясо',
    english: 'meat',
    pronunciation: 'mya-sa',
    category: 'Food & Drink',
    icon: '🥩'
  },
  {
    russian: 'рыба',
    english: 'fish',
    pronunciation: 'rih-ba',
    category: 'Food & Drink',
    icon: '🐟'
  },
  {
    russian: 'овощи',
    english: 'vegetables',
    pronunciation: 'o-va-shi',
    category: 'Food & Drink',
    icon: '🥦'
  },
  {
    russian: 'фрукты',
    english: 'fruits',
    pronunciation: 'frook-ti',
    category: 'Food & Drink',
    icon: '🍎'
  },
  {
    russian: 'кофе',
    english: 'coffee',
    pronunciation: 'ko-fe',
    category: 'Food & Drink',
    icon: '☕'
  },
  {
    russian: 'чай',
    english: 'tea',
    pronunciation: 'chai',
    category: 'Food & Drink',
    icon: '🍵'
  },
  {
    russian: 'пиво',
    english: 'beer',
    pronunciation: 'pee-va',
    category: 'Food & Drink',
    icon: '🍺'
  },
  {
    russian: 'вино',
    english: 'wine',
    pronunciation: 'vee-no',
    category: 'Food & Drink',
    icon: '🍷'
  },
  {
    russian: 'магазин',
    english: 'store',
    pronunciation: 'ma-ga-zeen',
    category: 'Places',
    icon: '🛒'
  },
  {
    russian: 'ресторан',
    english: 'restaurant',
    pronunciation: 're-sta-ran',
    category: 'Places',
    icon: '🍴'
  },
  {
    russian: 'гостиница',
    english: 'hotel',
    pronunciation: 'ga-stee-nee-tsa',
    category: 'Places',
    icon: '🏨'
  },
  {
    russian: 'станция',
    english: 'station',
    pronunciation: 'stan-tsee-ya',
    category: 'Places',
    icon: '🚉'
  },
  {
    russian: 'аэропорт',
    english: 'airport',
    pronunciation: 'a-eh-ra-port',
    category: 'Places',
    icon: '✈️'
  },
  {
    russian: 'улица',
    english: 'street',
    pronunciation: 'oo-lee-tsa',
    category: 'Places',
    icon: '🛣️'
  },
  {
    russian: 'площадь',
    english: 'square',
    pronunciation: 'ploh-shad',
    category: 'Places',
    icon: '🏛️'
  },
  {
    russian: 'парк',
    english: 'park',
    pronunciation: 'park',
    category: 'Places',
    icon: '🌳'
  },
  {
    russian: 'больница',
    english: 'hospital',
    pronunciation: 'bal-nee-tsa',
    category: 'Places',
    icon: '🏥'
  },
  {
    russian: 'аптека',
    english: 'pharmacy',
    pronunciation: 'ap-tye-ka',
    category: 'Places',
    icon: '💊'
  },
  {
    russian: 'банк',
    english: 'bank',
    pronunciation: 'bank',
    category: 'Places',
    icon: '🏦'
  },
  {
    russian: 'почта',
    english: 'post office',
    pronunciation: 'poch-ta',
    category: 'Places',
    icon: '📮'
  },
  {
    russian: 'полиция',
    english: 'police',
    pronunciation: 'pa-lee-tsee-ya',
    category: 'Places',
    icon: '🚓'
  },
  {
    russian: 'музей',
    english: 'museum',
    pronunciation: 'moo-zyey',
    category: 'Places',
    icon: '🖼️'
  },
  {
    russian: 'театр',
    english: 'theater',
    pronunciation: 'tee-atr',
    category: 'Places',
    icon: '🎭'
  },
  {
    russian: 'кино',
    english: 'cinema',
    pronunciation: 'kee-no',
    category: 'Places',
    icon: '🎬'
  },
  {
    russian: 'билет',
    english: 'ticket',
    pronunciation: 'bee-lyet',
    category: 'Essentials',
    icon: '🎟️'
  },
  {
    russian: 'деньги',
    english: 'money',
    pronunciation: 'dyen-gee',
    category: 'Essentials',
    icon: '💵'
  },
  {
    russian: 'паспорт',
    english: 'passport',
    pronunciation: 'pass-port',
    category: 'Essentials',
    icon: '🛂'
  },
  {
    russian: 'виза',
    english: 'visa',
    pronunciation: 'vee-za',
    category: 'Essentials',
    icon: '📄'
  },
  // Question Words
  {
    russian: 'кто',
    english: 'who',
    pronunciation: 'ktoh',
    category: 'Questions',
    icon: '❓'
  },
  {
    russian: 'что',
    english: 'what',
    pronunciation: 'shtoh',
    category: 'Questions',
    icon: '❓'
  },
  {
    russian: 'где',
    english: 'where',
    pronunciation: 'gdye',
    category: 'Questions',
    icon: '📍'
  },
  {
    russian: 'когда',
    english: 'when',
    pronunciation: 'kahg-dah',
    category: 'Questions',
    icon: '🕒'
  },
  {
    russian: 'почему',
    english: 'why',
    pronunciation: 'pah-chee-moo',
    category: 'Questions',
    icon: '🤔'
  },
  {
    russian: 'как',
    english: 'how',
    pronunciation: 'kahk',
    category: 'Questions',
    icon: '💡'
  },
  {
    russian: 'сколько',
    english: 'how much / how many',
    pronunciation: 'skol\'-kah',
    category: 'Questions',
    icon: '🔢'
  },
  // Family
  {
    russian: 'семья',
    english: 'family',
    pronunciation: 'seem-ya',
    category: 'People',
    icon: '👨‍👩‍👧'
  },
  {
    russian: 'мама',
    english: 'mother / mom',
    pronunciation: 'mah-ma',
    category: 'People',
    icon: '👩'
  },
  {
    russian: 'папа',
    english: 'father / dad',
    pronunciation: 'pah-pa',
    category: 'People',
    icon: '👨'
  },
  {
    russian: 'сестра',
    english: 'sister',
    pronunciation: 'see-strah',
    category: 'People',
    icon: '👧'
  },
  {
    russian: 'брат',
    english: 'brother',
    pronunciation: 'braht',
    category: 'People',
    icon: '👦'
  },
  {
    russian: 'муж',
    english: 'husband',
    pronunciation: 'moozh',
    category: 'People',
    icon: '🤵'
  },
  {
    russian: 'жена',
    english: 'wife',
    pronunciation: 'zhe-nah',
    category: 'People',
    icon: '👰'
  },
  // Transportation
  {
    russian: 'метро',
    english: 'subway / metro',
    pronunciation: 'mee-troh',
    category: 'Transport',
    icon: '🚇'
  },
  {
    russian: 'поезд',
    english: 'train',
    pronunciation: 'poh-yezd',
    category: 'Transport',
    icon: '🚆'
  },
  {
    russian: 'такси',
    english: 'taxi',
    pronunciation: 'tahk-see',
    category: 'Transport',
    icon: '🚕'
  },
  {
    russian: 'автобус',
    english: 'bus',
    pronunciation: 'ahf-toh-boos',
    category: 'Transport',
    icon: '🚌'
  },
  {
    russian: 'машина',
    english: 'car',
    pronunciation: 'mah-shee-na',
    category: 'Transport',
    icon: '🚗'
  },
  {
    russian: 'самолёт',
    english: 'airplane',
    pronunciation: 'sah-mah-lyot',
    category: 'Transport',
    icon: '✈️'
  },
  // Colors & Descriptions
  {
    russian: 'красный',
    english: 'red',
    pronunciation: 'krah-sniy',
    category: 'Colors',
    icon: '🔴'
  },
  {
    russian: 'синий',
    english: 'blue',
    pronunciation: 'see-neey',
    category: 'Colors',
    icon: '🔵'
  },
  {
    russian: 'зелёный',
    english: 'green',
    pronunciation: 'zee-lyo-niy',
    category: 'Colors',
    icon: '🟢'
  },
  {
    russian: 'жёлтый',
    english: 'yellow',
    pronunciation: 'zhol-tiy',
    category: 'Colors',
    icon: '🟡'
  },
  {
    russian: 'чёрный',
    english: 'black',
    pronunciation: 'chor-niy',
    category: 'Colors',
    icon: '⚫'
  },
  {
    russian: 'белый',
    english: 'white',
    pronunciation: 'bye-liy',
    category: 'Colors',
    icon: '⚪'
  },
  {
    russian: 'большой',
    english: 'big',
    pronunciation: 'bal-shoy',
    category: 'Descriptions',
    icon: '🐘'
  },
  {
    russian: 'маленький',
    english: 'small',
    pronunciation: 'mah-leen-keey',
    category: 'Descriptions',
    icon: '🐁'
  },
  {
    russian: 'новый',
    english: 'new',
    pronunciation: 'noh-viy',
    category: 'Descriptions',
    icon: '✨'
  },
  {
    russian: 'старый',
    english: 'old',
    pronunciation: 'stah-riy',
    category: 'Descriptions',
    icon: '🕰️'
  },
  // Weather & Seasons
  {
    russian: 'солнце',
    english: 'sun',
    pronunciation: 'sohn-tse',
    category: 'Weather',
    icon: '☀️'
  },
  {
    russian: 'дождь',
    english: 'rain',
    pronunciation: 'dohsht',
    category: 'Weather',
    icon: '🌧️'
  },
  {
    russian: 'снег',
    english: 'snow',
    pronunciation: 'snyek',
    category: 'Weather',
    icon: '❄️'
  },
  {
    russian: 'ветер',
    english: 'wind',
    pronunciation: 'vye-teer',
    category: 'Weather',
    icon: '💨'
  },
  {
    russian: 'облако',
    english: 'cloud',
    pronunciation: 'oh-bla-ka',
    category: 'Weather',
    icon: '☁️'
  },
  {
    russian: 'гроза',
    english: 'storm',
    pronunciation: 'grah-zah',
    category: 'Weather',
    icon: '⛈️'
  },
  {
    russian: 'жарко',
    english: 'hot',
    pronunciation: 'zhar-ka',
    category: 'Weather',
    icon: '🔥'
  },
  {
    russian: 'холодно',
    english: 'cold',
    pronunciation: 'khoh-lad-na',
    category: 'Weather',
    icon: '🥶'
  },
  // Tech & Remote Work
  {
    russian: 'компьютер',
    english: 'computer',
    pronunciation: 'kam-pyoo-ter',
    category: 'Tech',
    icon: '💻'
  },
  {
    russian: 'телефон',
    english: 'phone',
    pronunciation: 'tee-lee-fohn',
    category: 'Tech',
    icon: '📱'
  },
  {
    russian: 'интернет',
    english: 'internet',
    pronunciation: 'een-ter-nyet',
    category: 'Tech',
    icon: '🌐'
  },
  {
    russian: 'пароль',
    english: 'password',
    pronunciation: 'pah-rohl',
    category: 'Tech',
    icon: '🔐'
  },
  {
    russian: 'электронная почта',
    english: 'email',
    pronunciation: 'eh-leek-troh-na-ya poch-ta',
    category: 'Tech',
    icon: '📧'
  },
  {
    russian: 'экран',
    english: 'screen',
    pronunciation: 'eh-krahn',
    category: 'Tech',
    icon: '🖥️'
  },
  {
    russian: 'встреча',
    english: 'meeting',
    pronunciation: 'fstrye-cha',
    category: 'Tech',
    icon: '📅'
  },
  {
    russian: 'файл',
    english: 'file',
    pronunciation: 'fayl',
    category: 'Tech',
    icon: '📁'
  },
  {
    russian: 'ссылка',
    english: 'link',
    pronunciation: 'ssil-ka',
    category: 'Tech',
    icon: '🔗'
  },
  {
    russian: 'код',
    english: 'code',
    pronunciation: 'koht',
    category: 'Tech',
    icon: '🧑‍💻'
  },
  {
    russian: 'ошибка',
    english: 'error',
    pronunciation: 'ah-shib-ka',
    category: 'Tech',
    icon: '🐛'
  },
  {
    russian: 'батарея',
    english: 'battery',
    pronunciation: 'bah-tah-rye-ya',
    category: 'Tech',
    icon: '🔋'
  },
  // Business & Office
  {
    russian: 'проект',
    english: 'project',
    pronunciation: 'prah-yekt',
    category: 'Business',
    icon: '📊'
  },
  {
    russian: 'клиент',
    english: 'client',
    pronunciation: 'klee-yent',
    category: 'Business',
    icon: '🤝'
  },
  {
    russian: 'команда',
    english: 'team',
    pronunciation: 'kah-mahn-da',
    category: 'Business',
    icon: '👥'
  },
  {
    russian: 'руководитель',
    english: 'manager',
    pronunciation: 'roo-kah-vah-dee-teel',
    category: 'Business',
    icon: '👔'
  },
  {
    russian: 'компания',
    english: 'company',
    pronunciation: 'kam-pah-nee-ya',
    category: 'Business',
    icon: '🏢'
  },
  {
    russian: 'контракт',
    english: 'contract',
    pronunciation: 'kan-trahkt',
    category: 'Business',
    icon: '📝'
  },
  {
    russian: 'расписание',
    english: 'schedule',
    pronunciation: 'rahs-pee-sah-nee-ye',
    category: 'Business',
    icon: '🗓️'
  },
  {
    russian: 'срок',
    english: 'deadline',
    pronunciation: 'srohk',
    category: 'Business',
    icon: '⏳'
  },
  {
    russian: 'счёт',
    english: 'invoice',
    pronunciation: 'schyot',
    category: 'Business',
    icon: '🧾'
  },
  {
    russian: 'зарплата',
    english: 'salary',
    pronunciation: 'zahr-plah-ta',
    category: 'Business',
    icon: '💵'
  },
  // Healthcare & Pharmacy
  {
    russian: 'врач',
    english: 'doctor',
    pronunciation: 'vrahch',
    category: 'Health',
    icon: '🩺'
  },
  {
    russian: 'лекарство',
    english: 'medicine',
    pronunciation: 'lee-kar-stva',
    category: 'Health',
    icon: '💊'
  },
  {
    russian: 'боль',
    english: 'pain',
    pronunciation: 'bohl',
    category: 'Health',
    icon: '🤕'
  },
  {
    russian: 'температура',
    english: 'fever',
    pronunciation: 'teem-pee-rah-too-ra',
    category: 'Health',
    icon: '🤒'
  },
  {
    russian: 'аллергия',
    english: 'allergy',
    pronunciation: 'ah-leer-gee-ya',
    category: 'Health',
    icon: '⚠️'
  },
  {
    russian: 'головная боль',
    english: 'headache',
    pronunciation: 'gah-lahv-na-ya bohl',
    category: 'Health',
    icon: '🧠'
  },
  {
    russian: 'скорая помощь',
    english: 'emergency',
    pronunciation: 'skoh-ra-ya poh-masch',
    category: 'Health',
    icon: '🚑'
  },
  {
    russian: 'рецепт',
    english: 'prescription',
    pronunciation: 'ree-tsept',
    category: 'Health',
    icon: '📋'
  },
  {
    russian: 'бинт',
    english: 'bandage',
    pronunciation: 'beent',
    category: 'Health',
    icon: '🩹'
  },
  {
    russian: 'здоровье',
    english: 'health',
    pronunciation: 'zdah-rohv-ye',
    category: 'Health',
    icon: '❤️'
  },
  // Hotel, Airport & Travel
  {
    russian: 'рейс',
    english: 'flight',
    pronunciation: 'reys',
    category: 'Travel',
    icon: '🛫'
  },
  {
    russian: 'багаж',
    english: 'luggage',
    pronunciation: 'bah-gahsh',
    category: 'Travel',
    icon: '🧳'
  },
  {
    russian: 'бронь',
    english: 'reservation',
    pronunciation: 'brohn',
    category: 'Travel',
    icon: '🛎️'
  },
  {
    russian: 'ключ',
    english: 'key',
    pronunciation: 'klyooch',
    category: 'Travel',
    icon: '🔑'
  },
  {
    russian: 'номер',
    english: 'room',
    pronunciation: 'noh-meer',
    category: 'Travel',
    icon: '🛏️'
  },
  {
    russian: 'выход на посадку',
    english: 'gate',
    pronunciation: 'vi-khat na pah-sahd-koo',
    category: 'Travel',
    icon: '🚪'
  },
  {
    russian: 'карта',
    english: 'map',
    pronunciation: 'kar-ta',
    category: 'Travel',
    icon: '🗺️'
  },
  {
    russian: 'вход',
    english: 'entrance',
    pronunciation: 'fkhoht',
    category: 'Travel',
    icon: '➡️'
  },
  {
    russian: 'выход',
    english: 'exit',
    pronunciation: 'vi-khat',
    category: 'Travel',
    icon: '⬅️'
  },
  {
    russian: 'таможня',
    english: 'customs',
    pronunciation: 'tah-mohzh-nya',
    category: 'Travel',
    icon: '🛂'
  },
  // Shopping & Money
  {
    russian: 'банковская карта',
    english: 'credit card',
    pronunciation: 'bahn-kahf-ska-ya kar-ta',
    category: 'Shopping',
    icon: '💳'
  },
  {
    russian: 'наличные',
    english: 'cash',
    pronunciation: 'nah-leech-ni-ye',
    category: 'Shopping',
    icon: '💵'
  },
  {
    russian: 'цена',
    english: 'price',
    pronunciation: 'tsee-nah',
    category: 'Shopping',
    icon: '🏷️'
  },
  {
    russian: 'дешёвый',
    english: 'cheap',
    pronunciation: 'dee-sho-viy',
    category: 'Shopping',
    icon: '👇'
  },
  {
    russian: 'дорогой',
    english: 'expensive',
    pronunciation: 'dah-rah-goy',
    category: 'Shopping',
    icon: '💎'
  },
  {
    russian: 'скидка',
    english: 'discount',
    pronunciation: 'skeed-ka',
    category: 'Shopping',
    icon: '🏷️'
  },
  // Batch 1: Modern Tech, Workplace & Commerce (Levels 1, 2, 3)
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
  { russian: 'Кредитная карта', english: 'Credit card', pronunciation: 'kree-DEET-nah-yah KAHR-tah', category: 'Shopping', level: 1, icon: '💳' },
  { russian: 'Чек', english: 'Receipt', pronunciation: 'chek', category: 'Shopping', level: 1, icon: '🧾' },
  { russian: 'Поддержка', english: 'Support', pronunciation: 'puhd-DYEHRZH-kah', category: 'Tech', level: 1, icon: '💁' },
  { russian: 'Открыть', english: 'Open', pronunciation: 'uht-KRYT', category: 'Tech', level: 1, icon: '📂' },
  { russian: 'Закрыть', english: 'Close', pronunciation: 'zah-KRYT', category: 'Tech', level: 1, icon: '✖️' },
  { russian: 'Обновить', english: 'Update', pronunciation: 'uhb-nah-VEET', category: 'Tech', level: 1, icon: '🔄' },
  { russian: 'Начальник', english: 'Boss / Supervisor', pronunciation: 'nah-CHAHL-neek', category: 'Business', level: 2, icon: '👔' },
  { russian: 'Коллега', english: 'Colleague', pronunciation: 'kah-LYEH-gah', category: 'Business', level: 2, icon: '👥' },
  { russian: 'Сотрудник', english: 'Employee', pronunciation: 'sah-TROOD-neek', category: 'Business', level: 2, icon: '🧑‍💼' },
  { russian: 'Задача', english: 'Task', pronunciation: 'zah-DAH-chah', category: 'Business', level: 2, icon: '✅' },
  { russian: 'Отчёт', english: 'Report', pronunciation: 'aht-CHOHT', category: 'Business', level: 2, icon: '📑' },
  { russian: 'Презентация', english: 'Presentation', pronunciation: 'prye-zyen-TAH-tsee-yah', category: 'Business', level: 2, icon: '📽️' },
  { russian: 'Договор', english: 'Contract', pronunciation: 'dah-gah-VOHR', category: 'Business', level: 2, icon: '📝' },
  { russian: 'Подпись', english: 'Signature', pronunciation: 'POHT-pees', category: 'Business', level: 2, icon: '✍️' },
  { russian: 'Отпуск', english: 'Vacation', pronunciation: 'OHT-poosk', category: 'Business', level: 2, icon: '🏖️' },
  { russian: 'Резюме', english: 'Resume', pronunciation: 'rye-zyoo-MEH', category: 'Business', level: 2, icon: '📄' },
  { russian: 'Собеседование', english: 'Job interview', pronunciation: 'suh-bye-SYEH-duh-vah-nee-yeh', category: 'Business', level: 2, icon: '👔' },
  { russian: 'Срок сдачи', english: 'Deadline', pronunciation: 'srohk ZDAH-chee', category: 'Business', level: 2, icon: '⏳' },
  { russian: 'Цель', english: 'Goal', pronunciation: 'tsel', category: 'Business', level: 2, icon: '🎯' },
  { russian: 'Продукт', english: 'Product', pronunciation: 'prah-DOOKT', category: 'Business', level: 2, icon: '📦' },
  { russian: 'Услуга', english: 'Service', pronunciation: 'oo-SLOO-gah', category: 'Business', level: 2, icon: '🛠️' },
  { russian: 'Перевод', english: 'Transfer', pronunciation: 'pyee-ryee-VOHD', category: 'Shopping', level: 2, icon: '💸' },
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
  { russian: 'Бюджет', english: 'Budget', pronunciation: 'byood-ZHEHT', category: 'Business', level: 3, icon: '💰' },
  { russian: 'Инвестиции', english: 'Investment', pronunciation: 'een-vye-STEE-tsee-ee', category: 'Business', level: 3, icon: '📈' },
  { russian: 'Выручка', english: 'Revenue', pronunciation: 'VY-rooch-kah', category: 'Business', level: 3, icon: '💵' },
  { russian: 'Стартап', english: 'Startup', pronunciation: 'stahr-TAHP', category: 'Business', level: 3, icon: '🚀' },
  { russian: 'Удалённая работа', english: 'Remote work', pronunciation: 'oo-dah-LYOHN-nah-yah rah-BOH-tah', category: 'Business', level: 3, icon: '🏠' },
  // Batch 2: High-Yield Everyday Vocabulary & Parity (Levels 1 & 2)
  { russian: 'Ребёнок', english: 'Child', pronunciation: 'rye-BYOH-nahk', category: 'People', level: 1, icon: '🧒' },
  { russian: 'Отец', english: 'Father', pronunciation: 'ah-TYETS', category: 'Family', level: 1, icon: '👨' },
  { russian: 'Мать', english: 'Mother', pronunciation: 'MAHT', category: 'Family', level: 1, icon: '👩' },
  { russian: 'Учитель', english: 'Teacher', pronunciation: 'oo-CHEE-tyel', category: 'People', level: 2, icon: '🧑‍🏫' },
  { russian: 'Студент', english: 'Student', pronunciation: 'stoo-DYENT', category: 'People', level: 2, icon: '🧑‍🎓' },
  { russian: 'Врач / Доктор', english: 'Doctor', pronunciation: 'VRAHCH / DOHK-tuhr', category: 'People', level: 2, icon: '🧑‍⚕️' },
  { russian: 'Рис', english: 'Rice', pronunciation: 'REES', category: 'Food', level: 1, icon: '🍚' },
  { russian: 'Соль', english: 'Salt', pronunciation: 'SOHL', category: 'Food', level: 1, icon: '🧂' },
  { russian: 'Яйцо', english: 'Egg', pronunciation: 'yye-TSOH', category: 'Food', level: 1, icon: '🥚' },
  { russian: 'Сок', english: 'Juice', pronunciation: 'SOHK', category: 'Food', level: 1, icon: '🧃' },
  { russian: 'Сыр', english: 'Cheese', pronunciation: 'SYR', category: 'Food', level: 1, icon: '🧀' },
  { russian: 'Яблоко', english: 'Apple', pronunciation: 'YAH-blah-kah', category: 'Food', level: 1, icon: '🍏' },
  { russian: 'Завтрак', english: 'Breakfast', pronunciation: 'ZAHF-trahk', category: 'Food', level: 2, icon: '🍳' },
  { russian: 'Обед', english: 'Lunch', pronunciation: 'ah-BYET', category: 'Food', level: 2, icon: '🥪' },
  { russian: 'Ужин', english: 'Dinner', pronunciation: 'OO-zheen', category: 'Food', level: 2, icon: '🍲' },
  { russian: 'Гостиница / Отель', english: 'Hotel', pronunciation: 'gahs-TEE-nee-tsah / ah-TYEL', category: 'Places', level: 1, icon: '🏨' },
  { russian: 'Станция / Вокзал', english: 'Station', pronunciation: 'STAHN-tsyee-yah / vahk-ZAHL', category: 'Places', level: 1, icon: '🚉' },
  { russian: 'Супермаркет', english: 'Supermarket', pronunciation: 'soo-peer-MAHR-kyet', category: 'Places', level: 2, icon: '🛒' },
  { russian: 'Кино / Кинотеатр', english: 'Cinema', pronunciation: 'kee-NOH / kee-nah-tyee-AH-tuhr', category: 'Places', level: 2, icon: '🎬' },
  { russian: 'Центр', english: 'Center', pronunciation: 'TSYEN-tuhr', category: 'Places', level: 2, icon: '📍' },
  { russian: 'Школа', english: 'School', pronunciation: 'SHKOH-lah', category: 'Places', level: 2, icon: '🏫' },
  { russian: 'Завод', english: 'Factory', pronunciation: 'zah-VAHT', category: 'Places', level: 2, icon: '🏭' },
  { russian: 'Море', english: 'Sea', pronunciation: 'MOH-rye', category: 'Places', level: 1, icon: '🌊' },
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
  { russian: 'Собака', english: 'Dog', pronunciation: 'sah-BAH-kah', category: 'Nature', level: 1, icon: '🐶' },
  { russian: 'Кот / Кошка', english: 'Cat', pronunciation: 'KOHT / KOHSH-kah', category: 'Nature', level: 1, icon: '🐱' },
  { russian: 'Птица', english: 'Bird', pronunciation: 'PTEE-tsah', category: 'Nature', level: 1, icon: '🐦' },
  { russian: 'Луна', english: 'Moon', pronunciation: 'loo-NAH', category: 'Nature', level: 1, icon: '🌙' },
  { russian: 'Звезда', english: 'Star', pronunciation: 'zvyez-DAH', category: 'Nature', level: 1, icon: '⭐' },
  { russian: 'Цветок', english: 'Flower', pronunciation: 'tsvee-TOHK', category: 'Nature', level: 1, icon: '🌸' },
  { russian: 'Дерево', english: 'Tree', pronunciation: 'DYE-ryee-vah', category: 'Nature', level: 1, icon: '🌲' },
  { russian: 'Хороший / Хорошо', english: 'Good', pronunciation: 'khah-ROH-sheey / khah-rah-SHOH', category: 'Descriptions', level: 1, icon: '👍' },
  { russian: 'Плохой / Плохо', english: 'Bad', pronunciation: 'plah-KHOY / PLOH-khah', category: 'Descriptions', level: 1, icon: '👎' },
  { russian: 'Быстрый / Быстро', english: 'Fast / Quick', pronunciation: 'BYS-try / BYS-trah', category: 'Descriptions', level: 1, icon: '⚡' },
  { russian: 'Медленный / Медленно', english: 'Slow', pronunciation: 'MYED-leen-ny / MYED-leen-nah', category: 'Descriptions', level: 1, icon: '🐢' },
  { russian: 'Счастливый / Рад', english: 'Happy', pronunciation: 'schahs-LEE-vy / RAHT', category: 'Descriptions', level: 1, icon: '😊' },
  { russian: 'Готов / Готовый', english: 'Ready', pronunciation: 'gah-TOHF / gah-TOH-vy', category: 'Descriptions', level: 1, icon: '✅' },
  { russian: 'Открыто / Открытый', english: 'Open', pronunciation: 'aht-KRY-tah / aht-KRY-ty', category: 'Descriptions', level: 1, icon: '🟢' },
  { russian: 'Закрыто / Закрытый', english: 'Closed', pronunciation: 'zah-KRY-tah / zah-KRY-ty', category: 'Descriptions', level: 1, icon: '🔴' },
  { russian: 'Жарко / Горячий', english: 'Hot', pronunciation: 'ZHAR-kah / gah-RYAH-cheey', category: 'Descriptions', level: 1, icon: '🔥' },
  // Batch 3: Calendar, Family, Body, Kitchen & Everyday Life
  { russian: 'Месяц', english: 'Month', pronunciation: 'MYE-syets', category: 'Calendar', level: 1, icon: '📆' },
  { russian: 'Год', english: 'Year', pronunciation: 'GOHT', category: 'Calendar', level: 1, icon: '🎆' },
  { russian: 'Глаз', english: 'Eye', pronunciation: 'GLAHS', category: 'Health', level: 1, icon: '👁️' },
  { russian: 'Глаза', english: 'Eyes', pronunciation: 'glah-ZAH', category: 'Health', level: 1, icon: '👀' },
  { russian: 'Нос', english: 'Nose', pronunciation: 'NOHS', category: 'Health', level: 1, icon: '👃' },
  { russian: 'Щека', english: 'Cheek', pronunciation: 'shchee-KAH', category: 'Health', level: 1, icon: '😊' },
  { russian: 'Сердце', english: 'Heart', pronunciation: 'SYEHRT-tseh', category: 'Health', level: 1, icon: '❤️' },
  { russian: 'Голос', english: 'Voice', pronunciation: 'GOH-lahs', category: 'Health', level: 1, icon: '🗣️' },
  { russian: 'Чашка', english: 'Cup', pronunciation: 'CHAHSH-kah', category: 'Food', level: 1, icon: '☕' },
  { russian: 'Стакан', english: 'Glass (cup)', pronunciation: 'stah-KAHN', category: 'Food', level: 1, icon: '🥛' },
  { russian: 'Чайник', english: 'Kettle', pronunciation: 'CHY-neek', category: 'Food', level: 1, icon: '🫖' },
  { russian: 'Масло', english: 'Oil', pronunciation: 'MAHS-lah', category: 'Food', level: 1, icon: '🫒' },
  { russian: 'Лимон', english: 'Lemon', pronunciation: 'lee-MOHN', category: 'Food', level: 1, icon: '🍋' },
  { russian: 'Апельсин', english: 'Orange', pronunciation: 'ah-pyel-SEEN', category: 'Food', level: 1, icon: '🍊' },
  { russian: 'Йогурт', english: 'Yogurt', pronunciation: 'YOH-goort', category: 'Food', level: 1, icon: '🥣' },
  { russian: 'Лёд', english: 'Ice', pronunciation: 'LYOHT', category: 'Food', level: 1, icon: '🧊' },
  { russian: 'Холодно / Холодный', english: 'Cold', pronunciation: 'KHOH-lahd-nah / khah-LOHD-ny', category: 'Weather', level: 1, icon: '🥶' },
  { russian: 'Ёж', english: 'Hedgehog', pronunciation: 'YOHZH', category: 'Weather', level: 2, icon: '🦔' },
  { russian: 'Жук', english: 'Beetle / Bug', pronunciation: 'ZHOOK', category: 'Weather', level: 2, icon: '🪲' },
  { russian: 'Зебра', english: 'Zebra', pronunciation: 'ZYE-brah', category: 'Weather', level: 2, icon: '🦓' },
  { russian: 'Идея', english: 'Idea', pronunciation: 'ee-DYE-yah', category: 'Essentials', level: 1, icon: '💡' },
  { russian: 'Вопрос', english: 'Question', pronunciation: 'vah-PROHS', category: 'Essentials', level: 1, icon: '❓' },
  { russian: 'Успех', english: 'Success', pronunciation: 'oos-PYEKH', category: 'Essentials', level: 2, icon: '🏆' },
  { russian: 'Любовь', english: 'Love', pronunciation: 'lyoo-BOHF', category: 'Essentials', level: 1, icon: '❤️' },
  { russian: 'Имя', english: 'Name', pronunciation: 'EE-myah', category: 'Essentials', level: 1, icon: '🏷️' },
  { russian: 'Тихий', english: 'Quiet', pronunciation: 'TEE-kheey', category: 'Essentials', level: 1, icon: '🤫' },
  { russian: 'Свет', english: 'Light', pronunciation: 'SVYET', category: 'Essentials', level: 1, icon: '💡' },
  { russian: 'Остров', english: 'Island', pronunciation: 'OHS-trahf', category: 'Travel', level: 1, icon: '🏝️' },
  // Batch 4: Foundational Verbs, Questions, City, Travel, Adjectives & Parity
  { russian: 'Город', english: 'City', pronunciation: 'GOH-raht', category: 'Places', level: 1, icon: '🏙️' },
  { russian: 'Страна', english: 'Country', pronunciation: 'strah-NAH', category: 'Places', level: 1, icon: '🌍' },
  { russian: 'Дом', english: 'House / Home', pronunciation: 'DOHM', category: 'Places', level: 1, icon: '🏠' },
  { russian: 'Вокзал', english: 'Train station', pronunciation: 'vahk-ZAHL', category: 'Travel', level: 1, icon: '🚉' },
  { russian: 'Мы', english: 'We', pronunciation: 'MY', category: 'People', level: 1, icon: '👥' },
  { russian: 'Помощь', english: 'Help', pronunciation: 'POH-mahshch', category: 'Essentials', level: 1, icon: '🆘' },
  { russian: 'Обувь', english: 'Shoe / Shoes', pronunciation: 'OH-boof', category: 'Essentials', level: 1, icon: '👞' },
  { russian: 'Фрукт', english: 'Fruit', pronunciation: 'FROOKT', category: 'Food', level: 1, icon: '🍎' },
  { russian: 'Часы', english: 'Clock / Watch', pronunciation: 'chah-SY', category: 'Essentials', level: 1, icon: '⏰' },
  { russian: 'Виноград', english: 'Grape', pronunciation: 'vee-nah-GRAHT', category: 'Food', level: 1, icon: '🍇' },
  { russian: 'Рентген', english: 'X-ray', pronunciation: 'ryen-TGYEN', category: 'Health', level: 2, icon: '🩻' },
  { russian: 'Ксилофон', english: 'Xylophone', pronunciation: 'ksee-lah-FOHN', category: 'Essentials', level: 2, icon: '🎵' },
  { russian: 'Хороший', english: 'Good', pronunciation: 'hah-ROH-sheey', category: 'Descriptions', level: 1, icon: '👍' },
  { russian: 'Плохой', english: 'Bad', pronunciation: 'plah-KHOY', category: 'Descriptions', level: 1, icon: '👎' },
  { russian: 'Открыто', english: 'Open', pronunciation: 'aht-KRY-tah', category: 'Descriptions', level: 1, icon: '🚪' },
  { russian: 'Закрыто', english: 'Closed', pronunciation: 'zah-KRY-tah', category: 'Descriptions', level: 1, icon: '🔒' },
  { russian: 'Быстрый', english: 'Fast', pronunciation: 'BY-stry', category: 'Descriptions', level: 1, icon: '🚀' },
  { russian: 'Медленный', english: 'Slow', pronunciation: 'MYED-lyen-ny', category: 'Descriptions', level: 1, icon: '🐢' },
  { russian: 'Счастливый', english: 'Happy', pronunciation: 'schahst-LEE-vy', category: 'Descriptions', level: 1, icon: '😊' },
  { russian: 'Готов', english: 'Ready', pronunciation: 'gah-TOHF', category: 'Descriptions', level: 1, icon: '✅' },
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
  // Batch 5: Core Everyday Vocabulary Expansion to 500+
  { russian: 'Папа / Отец', english: 'Father / Dad', category: 'General', level: 1, icon: '✨' },
  { russian: 'Мама / Мать', english: 'Mother / Mom', category: 'General', level: 1, icon: '✨' },
  { russian: 'Фрукт / Фрукты', english: 'Fruit', category: 'Food', level: 1, icon: '🍽️' },
  { russian: 'Карта / Карточка', english: 'Card', category: 'Places', level: 1, icon: '📍' },
  { russian: 'Объект / Предмет', english: 'Object', category: 'General', level: 1, icon: '✨' },
  { russian: 'Ёлка', english: 'Christmas tree', category: 'Nature', level: 1, icon: '🌿' },
  { russian: 'Килограмм', english: 'Kilogram', category: 'General', level: 1, icon: '✨' },
  { russian: 'Ночь', english: 'Night', category: 'General', level: 1, icon: '✨' },
  { russian: 'Веб', english: 'Web', category: 'General', level: 1, icon: '✨' },
  { russian: 'Желток', english: 'Yolk', category: 'Food', level: 1, icon: '🍽️' },
  { russian: 'Вагон', english: 'Wagon / Car', category: 'Places', level: 1, icon: '📍' },
  { russian: 'Пример', english: 'Example', category: 'General', level: 1, icon: '✨' },
  { russian: 'Утро', english: 'Morning', category: 'General', level: 1, icon: '✨' },
  { russian: 'День (после полудня)', english: 'Afternoon', category: 'General', level: 1, icon: '✨' },
  { russian: 'Вечер', english: 'Evening', category: 'General', level: 1, icon: '✨' },
  { russian: 'Царь', english: 'Czar / King', category: 'General', level: 1, icon: '✨' },
  { russian: 'Борщ', english: 'Borscht', category: 'Food', level: 1, icon: '🍽️' },
  { russian: 'Подъезд', english: 'Entrance', category: 'General', level: 1, icon: '✨' },
  { russian: 'Юг', english: 'South', category: 'General', level: 1, icon: '✨' },
  { russian: 'Источник', english: 'Source', category: 'General', level: 1, icon: '✨' },
  { russian: 'Или', english: 'Or', category: 'General', level: 1, icon: '✨' },
  { russian: 'Это', english: 'This', category: 'General', level: 1, icon: '✨' },
  { russian: 'Ем', english: 'I eat', category: 'Verbs', level: 1, icon: '⚡' },
  { russian: 'Может быть', english: 'Maybe', category: 'General', level: 1, icon: '✨' },
  { russian: 'Идти / Ехать', english: 'To go', category: 'Verbs', level: 1, icon: '⚡' },
  { russian: 'Приходить / Приезжать', english: 'To come', category: 'Verbs', level: 1, icon: '⚡' },
  { russian: 'Нуждаться (нужно)', english: 'To need', category: 'Verbs', level: 1, icon: '⚡' },
  { russian: 'Привет / Здравствуйте', english: 'Hello', category: 'General', level: 1, icon: '✨' },
  { russian: 'У меня всё хорошо, спасибо', english: 'I am fine, thank you', category: 'General', level: 1, icon: '✨' },
  { russian: 'Очень хорошо, спасибо', english: 'Very well, thank you', category: 'General', level: 1, icon: '✨' },
  { russian: 'А вы? / А у вас?', english: 'And you?', category: 'General', level: 1, icon: '✨' },
  { russian: 'Большое спасибо', english: 'Thank you very much', category: 'General', level: 1, icon: '✨' },
  { russian: 'Пожалуйста / Не за что', english: 'You are welcome', category: 'Verbs', level: 1, icon: '⚡' },
  { russian: 'Как вас зовут?', english: 'What is your name?', category: 'General', level: 1, icon: '✨' },
  { russian: 'Откуда вы?', english: 'Where are you from?', category: 'General', level: 1, icon: '✨' },
  { russian: 'Я из...', english: 'I am from...', category: 'General', level: 1, icon: '✨' },
  { russian: 'Хорошего дня', english: 'Have a nice day', category: 'General', level: 1, icon: '✨' },
  { russian: 'Я понимаю', english: 'I understand', category: 'Verbs', level: 1, icon: '⚡' },
  { russian: 'Говорите медленнее, пожалуйста', english: 'Please speak more slowly', category: 'Verbs', level: 1, icon: '⚡' },
  { russian: 'Можете говорить медленнее?', english: 'Can you speak more slowly?', category: 'Verbs', level: 1, icon: '⚡' },
  { russian: 'Что это значит?', english: 'What does this mean?', category: 'General', level: 1, icon: '✨' },
  { russian: 'Как сказать...?', english: 'How do you say...?', category: 'General', level: 1, icon: '✨' },
  { russian: 'Вы можете мне помочь?', english: 'Can you help me?', category: 'Verbs', level: 1, icon: '⚡' },
  { russian: 'Мне нужна помощь', english: 'I need help', category: 'Verbs', level: 1, icon: '⚡' },
  { russian: 'Помогите мне', english: 'Help me', category: 'Verbs', level: 1, icon: '⚡' },
  { russian: 'Где находится туалет?', english: 'Where is the restroom?', category: 'General', level: 1, icon: '✨' },
  { russian: 'Где находится аэропорт?', english: 'Where is the airport?', category: 'Places', level: 1, icon: '📍' },
  { russian: 'Я хочу поехать в аэропорт', english: 'I would like to go to the airport', category: 'Places', level: 1, icon: '📍' },
  { russian: 'Во сколько отправление?', english: 'What time is the departure?', category: 'General', level: 1, icon: '✨' },
  { russian: 'Где находится отель?', english: 'Where is the hotel?', category: 'Places', level: 1, icon: '📍' },
  { russian: 'Сколько стоит билет?', english: 'How much is a ticket?', category: 'Places', level: 1, icon: '📍' },
  { russian: 'Поверните налево', english: 'Turn left', category: 'General', level: 1, icon: '✨' },
  { russian: 'Поверните направо', english: 'Turn right', category: 'General', level: 1, icon: '✨' },
  { russian: 'Идите прямо', english: 'Go straight ahead', category: 'Verbs', level: 1, icon: '⚡' },
  { russian: 'Можно меню, пожалуйста?', english: 'Can I see the menu, please?', category: 'Verbs', level: 1, icon: '⚡' },
  { russian: 'Я бы хотел(а) воды', english: 'I would like water', category: 'Food', level: 1, icon: '🍽️' },
  { russian: 'Что вы порекомендуете?', english: 'What do you recommend?', category: 'General', level: 1, icon: '✨' },
  { russian: 'Это очень вкусно!', english: 'This is delicious!', category: 'General', level: 1, icon: '✨' },
  { russian: 'Счёт, пожалуйста', english: 'Can I have the check, please?', category: 'General', level: 1, icon: '✨' },
  { russian: 'Сколько это стоит?', english: 'How much does this cost?', category: 'Shopping', level: 1, icon: '🛍️' },
  { russian: 'Можно оплатить картой?', english: 'Can I pay by card?', category: 'Places', level: 1, icon: '📍' },
  { russian: 'Я просто смотрю', english: 'I am just looking', category: 'General', level: 1, icon: '✨' },
  { russian: 'Я просто смотрю, спасибо', english: 'I am just looking, thank you', category: 'General', level: 1, icon: '✨' },
  { russian: 'У вас есть другой размер?', english: 'Do you have this in another size?', category: 'General', level: 1, icon: '✨' },
  { russian: 'Я плохо себя чувствую', english: 'I don\'t feel well', category: 'General', level: 1, icon: '✨' },
  { russian: 'Вызовите полицию', english: 'Call the police', category: 'General', level: 1, icon: '✨' },
  { russian: 'Я потерял(а) свой паспорт', english: 'I lost my passport', category: 'General', level: 1, icon: '✨' },
  { russian: 'Один час (1:00)', english: 'One o\'clock (1:00)', category: 'General', level: 1, icon: '✨' },
  { russian: 'Ровно один час (1:00)', english: 'It is 1:00 sharp', category: 'General', level: 1, icon: '✨' },
  { russian: 'Два часа (2:00)', english: 'Two o\'clock (2:00)', category: 'General', level: 1, icon: '✨' },
  { russian: 'Три часа (3:00)', english: 'Three o\'clock (3:00)', category: 'General', level: 1, icon: '✨' },
  { russian: 'Ровно три часа (3:00)', english: 'Exactly three o\'clock (3:00)', category: 'General', level: 1, icon: '✨' },
  { russian: 'Четыре часа (4:00)', english: 'Four o\'clock (4:00)', category: 'General', level: 1, icon: '✨' },
  { russian: 'Пять часов (5:00)', english: 'Five o\'clock (5:00)', category: 'General', level: 1, icon: '✨' },
  { russian: 'Шесть часов (6:00)', english: 'Six o\'clock (6:00)', category: 'General', level: 1, icon: '✨' },
  { russian: 'Семь часов (7:00)', english: 'Seven o\'clock (7:00)', category: 'General', level: 1, icon: '✨' },
  { russian: 'Восемь часов (8:00)', english: 'Eight o\'clock (8:00)', category: 'General', level: 1, icon: '✨' },
  { russian: 'Девять часов (9:00)', english: 'Nine o\'clock (9:00)', category: 'General', level: 1, icon: '✨' },
  { russian: 'Десять часов (10:00)', english: 'Ten o\'clock (10:00)', category: 'General', level: 1, icon: '✨' },
  { russian: 'Одиннадцать часов (11:00)', english: 'Eleven o\'clock (11:00)', category: 'General', level: 1, icon: '✨' },
  { russian: 'Двенадцать часов (12:00)', english: 'Twelve o\'clock (12:00)', category: 'General', level: 1, icon: '✨' },
  { russian: 'Половина третьего (2:30)', english: 'Half past two (2:30)', category: 'General', level: 1, icon: '✨' },
  { russian: 'Без четверти три (2:45)', english: 'Quarter to three (2:45)', category: 'Verbs', level: 1, icon: '⚡' },
  { russian: 'Половина четвёртого (3:30)', english: '3:30 (half past three)', category: 'General', level: 1, icon: '✨' },
  { russian: 'Четверть пятого (4:15)', english: '4:15 (quarter past four)', category: 'General', level: 1, icon: '✨' },
  { russian: 'Без четверти пять (4:45)', english: '4:45 (quarter to five)', category: 'Verbs', level: 1, icon: '⚡' },
  { russian: 'Половина первого (12:30)', english: 'Half past twelve (12:30)', category: 'General', level: 1, icon: '✨' },
  { russian: 'Без десяти два (1:50)', english: 'Ten to two (1:50)', category: 'Verbs', level: 1, icon: '⚡' },
  { russian: 'Утра (утром)', english: 'In the morning (a.m.)', category: 'General', level: 1, icon: '✨' },
  { russian: 'Дня (днём)', english: 'In the afternoon (p.m.)', category: 'General', level: 1, icon: '✨' },
  { russian: 'Ночи (ночью)', english: 'At night', category: 'General', level: 1, icon: '✨' },
  { russian: 'Здравствуйте / Доброе утро', english: 'Hello / Good morning', category: 'Verbs', level: 1, icon: '⚡' },
  { russian: 'Привет / Пока', english: 'Hi / Bye', category: 'General', level: 1, icon: '✨' },
  { russian: 'Как ваши дела?', english: 'How are you? (formal)', category: 'General', level: 1, icon: '✨' },
  { russian: 'Всё хорошо, спасибо', english: 'I am doing well, thank you', category: 'General', level: 1, icon: '✨' },
  { russian: 'А вы?', english: 'And you?', category: 'General', level: 1, icon: '✨' },
  { russian: 'Время / Погода', english: 'Time / Weather', category: 'Verbs', level: 1, icon: '⚡' },
  { russian: 'Завтра / Утро', english: 'Tomorrow / Morning', category: 'General', level: 1, icon: '✨' },
  { russian: 'Офис / Стол', english: 'Office / Desk', category: 'General', level: 1, icon: '✨' },
  { russian: 'Вокзал / Станция', english: 'Train station', category: 'Places', level: 1, icon: '📍' },
  { russian: 'Мальчик / Ребёнок', english: 'Boy / Child', category: 'General', level: 1, icon: '✨' },
  { russian: 'Это далеко отсюда?', english: 'Is it far from here?', category: 'General', level: 1, icon: '✨' },
  { russian: 'Я покажу свой экран', english: 'Let me share my screen', category: 'Tech', level: 1, icon: '💻' },
  { russian: 'Медленное подключение к интернету', english: 'The internet connection is slow', category: 'General', level: 1, icon: '✨' },
  { russian: 'Можете отправить по почте?', english: 'Can you send it by email?', category: 'Tech', level: 1, icon: '💻' },
  { russian: 'У меня почти села батарея', english: 'My battery is almost dead', category: 'General', level: 1, icon: '✨' },
  { russian: 'Где автобусная остановка?', english: 'Where is the bus stop?', category: 'Places', level: 1, icon: '📍' },
  { russian: 'Как добраться до аэропорта?', english: 'How do I get to the airport?', category: 'Places', level: 1, icon: '📍' },
  { russian: 'Я бы хотел кофе, пожалуйста', english: 'I would like a coffee, please', category: 'Food', level: 1, icon: '🍽️' },
  { russian: 'Бутылку воды, пожалуйста', english: 'A bottle of water, please', category: 'Food', level: 1, icon: '🍽️' }
,
  {
    russian: 'Да',
    english: 'Yes',
    pronunciation: '',
    category: 'Essentials',
    icon: '✅'
  },
  {
    russian: 'Нет',
    english: 'No',
    pronunciation: '',
    category: 'Essentials',
    icon: '❌'
  },
  {
    russian: 'Время',
    english: 'Time / Weather',
    pronunciation: '',
    category: 'Time',
    icon: '⏱️'
  },
  {
    russian: 'Сегодня',
    english: 'Today',
    pronunciation: '',
    category: 'Time',
    icon: '📅'
  },
  {
    russian: 'Завтра',
    english: 'Tomorrow / Morning',
    pronunciation: '',
    category: 'Time',
    icon: '🌅'
  },
  {
    russian: 'Вчера',
    english: 'Yesterday',
    pronunciation: '',
    category: 'Time',
    icon: '⏮️'
  },
  {
    russian: 'Понедельник',
    english: 'Monday',
    pronunciation: '',
    category: 'Calendar',
    icon: '📅'
  },
  {
    russian: 'Вторник',
    english: 'Tuesday',
    pronunciation: '',
    category: 'Calendar',
    icon: '📅'
  },
  {
    russian: 'Среда',
    english: 'Wednesday',
    pronunciation: '',
    category: 'Calendar',
    icon: '📅'
  },
  {
    russian: 'Четверг',
    english: 'Thursday',
    pronunciation: '',
    category: 'Calendar',
    icon: '📅'
  },
  {
    russian: 'Пятница',
    english: 'Friday',
    pronunciation: '',
    category: 'Calendar',
    icon: '📅'
  },
  {
    russian: 'Суббота',
    english: 'Saturday',
    pronunciation: '',
    category: 'Calendar',
    icon: '📅'
  },
  {
    russian: 'Воскресенье',
    english: 'Sunday',
    pronunciation: '',
    category: 'Calendar',
    icon: '📅'
  },
  {
    russian: 'Неделя',
    english: 'Week',
    pronunciation: '',
    category: 'Calendar',
    icon: '🗓️'
  },
  {
    russian: 'Час',
    english: 'Hour',
    pronunciation: '',
    category: 'Time',
    icon: '⏳'
  },
  {
    russian: 'Минута',
    english: 'Minute',
    pronunciation: '',
    category: 'Time',
    icon: '⏱️'
  },
  {
    russian: 'Секунда',
    english: 'Second',
    pronunciation: '',
    category: 'Time',
    icon: '⚡'
  },
  {
    russian: 'Рано',
    english: 'Early',
    pronunciation: '',
    category: 'Time',
    icon: '🌅'
  },
  {
    russian: 'Поздно',
    english: 'Late',
    pronunciation: '',
    category: 'Time',
    icon: '🌙'
  },
  {
    russian: 'Сейчас',
    english: 'Now',
    pronunciation: '',
    category: 'Time',
    icon: '⏰'
  },
  {
    russian: 'Привет',
    english: 'Hello (informal)',
    pronunciation: '',
    category: 'General',
    icon: '✨'
  },
  {
    russian: 'Спасибо',
    english: 'Thank you',
    pronunciation: '',
    category: 'General',
    icon: '✨'
  },
  {
    russian: 'Пока',
    english: 'Bye (informal)',
    pronunciation: '',
    category: 'General',
    icon: '✨'
  },
  {
    russian: 'Повторите, пожалуйста',
    english: 'Please repeat',
    pronunciation: '',
    category: 'Verbs',
    icon: '⚡'
  },
  {
    russian: 'Говорите медленнее',
    english: 'Speak more slowly',
    pronunciation: '',
    category: 'Verbs',
    icon: '⚡'
  },
  {
    russian: 'Я немного говорю по-русски',
    english: 'I speak a little Russian',
    pronunciation: '',
    category: 'Verbs',
    icon: '⚡'
  },
  {
    russian: 'Как это по-русски?',
    english: 'How do you say this in Russian?',
    pronunciation: '',
    category: 'General',
    icon: '✨'
  },
  {
    russian: 'Я хочу есть',
    english: 'I want to eat',
    pronunciation: '',
    category: 'Verbs',
    icon: '⚡'
  },
  {
    russian: 'Я хочу пить',
    english: 'I want to drink',
    pronunciation: '',
    category: 'Verbs',
    icon: '⚡'
  },
  {
    russian: 'Сколько сейчас времени?',
    english: 'What time is it now?',
    pronunciation: '',
    category: 'General',
    icon: '✨'
  },
  {
    russian: 'Во сколько?',
    english: 'At what time?',
    pronunciation: '',
    category: 'General',
    icon: '✨'
  },
  {
    russian: 'Полчаса',
    english: 'Half an hour',
    pronunciation: '',
    category: 'General',
    icon: '✨'
  },
  {
    russian: 'Четверть часа',
    english: 'Quarter of an hour',
    pronunciation: '',
    category: 'General',
    icon: '✨'
  },
  {
    russian: 'Вовремя',
    english: 'On time',
    pronunciation: '',
    category: 'General',
    icon: '✨'
  },
  {
    russian: 'Как дела?',
    english: 'How are you?',
    pronunciation: '',
    category: 'General',
    icon: '✨'
  },
  {
    russian: 'Без проблем / Ничего страшного',
    english: 'No problem',
    pronunciation: '',
    category: 'Phrases',
    icon: '✅'
  },
  {
    russian: 'До скорого',
    english: 'See you soon',
    pronunciation: '',
    category: 'Phrases',
    icon: '👋'
  },
  {
    russian: 'Банан',
    english: 'Banana',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Рисовый пирожок',
    english: 'Rice cake',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Мост',
    english: 'Bridge',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Рагу',
    english: 'Stew',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Радио',
    english: 'Radio',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Письменный стол',
    english: 'Desk',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Музыка',
    english: 'Music',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Что?',
    english: 'What?',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Где?',
    english: 'Where?',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Когда?',
    english: 'When?',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Кто?',
    english: 'Who?',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Почему?',
    english: 'Why?',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Как?',
    english: 'How?',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Ноль',
    english: 'Zero',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'День',
    english: 'Day',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Здравствуйте',
    english: 'Hello (formal)',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Доброе утро',
    english: 'Good morning',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Добрый день',
    english: 'Good afternoon',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Добрый вечер',
    english: 'Good evening',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Спокойной ночи',
    english: 'Good night',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Пожалуйста',
    english: 'Please',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Извините',
    english: 'Excuse me',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Простите / Мне жаль',
    english: 'I am sorry',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Меня зовут...',
    english: 'My name is...',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Очень приятно познакомиться',
    english: 'Nice to meet you',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'До свидания',
    english: 'Goodbye',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Увидимся позже / Пока',
    english: 'See you later',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Я не понимаю',
    english: 'I do not understand',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Вы говорите по-английски?',
    english: 'Do you speak English?',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Помогите!',
    english: 'Help!',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Где туалет?',
    english: 'Where is the bathroom?',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Где находится вокзал?',
    english: 'Where is the train station?',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Мне нужно такси',
    english: 'I need a taxi',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Столик на двоих, пожалуйста',
    english: 'A table for two, please',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Меню, пожалуйста',
    english: 'The menu, please',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Сколько стоит?',
    english: 'How much does it cost?',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Вы принимаете банковские карты?',
    english: 'Do you accept credit cards?',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Это слишком дорого',
    english: 'It is too expensive',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Мне нужен врач',
    english: 'I need a doctor',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Который час?',
    english: 'What time is it?',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Ровно один час',
    english: 'It is 1:00 sharp',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Два часа',
    english: 'It is 2:00',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Вечера (вечером)',
    english: 'In the evening (p.m.)',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Полдень',
    english: 'Noon / Midday',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Полночь',
    english: 'Midnight',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Привет! / Здравствуйте!',
    english: 'Hello! / Hi!',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Очень приятно',
    english: 'Pleased to meet you',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Сто',
    english: 'One hundred',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Тысяча',
    english: 'One thousand',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Вы меня слышите?',
    english: 'Can you hear me?',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Видно мой экран?',
    english: 'Can you see my screen?',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Какой пароль от вайфая?',
    english: 'What is the Wi-Fi password?',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Давайте назначим встречу',
    english: "Let's schedule a meeting",
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Я отправлю вам письмо',
    english: 'I will send you an email',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Какой крайний срок?',
    english: 'When is the deadline?',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Где ближайшая аптека?',
    english: 'Where is the nearest pharmacy?',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'У меня аллергия на орехи',
    english: 'I am allergic to nuts',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'У меня есть бронь',
    english: 'I have a reservation',
    pronunciation: '',
    category: 'General',
    icon: '📌'
  },
  {
    russian: 'Клубника',
    english: 'Strawberry',
    pronunciation: '',
    category: 'Food & Drink',
    icon: '🍓'
  },
  {
    russian: 'Чеснок',
    english: 'Garlic',
    pronunciation: '',
    category: 'Food & Drink',
    icon: '🧄'
  },
  {
    russian: 'Картофель',
    english: 'Potato',
    pronunciation: '',
    category: 'Food & Drink',
    icon: '🥔'
  },
  {
    russian: 'Лук',
    english: 'Onion',
    pronunciation: '',
    category: 'Food & Drink',
    icon: '🧅'
  },
  {
    russian: 'Морковь',
    english: 'Carrot',
    pronunciation: '',
    category: 'Food & Drink',
    icon: '🥕'
  },
  {
    russian: 'Ложка',
    english: 'Spoon',
    pronunciation: '',
    category: 'Food & Drink',
    icon: '🥄'
  },
  {
    russian: 'Вилка',
    english: 'Fork',
    pronunciation: '',
    category: 'Food & Drink',
    icon: '🍴'
  },
  {
    russian: 'Нож',
    english: 'Knife',
    pronunciation: '',
    category: 'Food & Drink',
    icon: '🔪'
  },
  {
    russian: 'Тарелка',
    english: 'Plate',
    pronunciation: '',
    category: 'Food & Drink',
    icon: '🍽️'
  },
  {
    russian: 'Велосипед',
    english: 'Bicycle',
    pronunciation: '',
    category: 'Places',
    icon: '🚲'
  },
  {
    russian: 'Чемодан',
    english: 'Suitcase',
    pronunciation: '',
    category: 'Home',
    icon: '🧳'
  },
  {
    russian: 'Рюкзак',
    english: 'Backpack',
    pronunciation: '',
    category: 'Home',
    icon: '🎒'
  },
  {
    russian: 'Кошелек',
    english: 'Wallet',
    pronunciation: '',
    category: 'Home',
    icon: '👛'
  },
  {
    russian: 'Пожарный',
    english: 'Firefighter',
    pronunciation: '',
    category: 'People',
    icon: '🧑‍🚒'
  },
  {
    russian: 'Отель',
    english: 'Hotel',
    pronunciation: '',
    category: 'Places',
    icon: '🏨'
  },
  {
    russian: 'Пляж',
    english: 'Beach',
    pronunciation: '',
    category: 'Nature',
    icon: '🏖️'
  },
  {
    russian: 'Гора',
    english: 'Mountain',
    pronunciation: '',
    category: 'Nature',
    icon: '⛰️'
  },
  {
    russian: 'Река',
    english: 'River',
    pronunciation: '',
    category: 'Nature',
    icon: '🌊'
  },
  {
    russian: 'Озеро',
    english: 'Lake',
    pronunciation: '',
    category: 'Nature',
    icon: '🏞️'
  }
];

// Time expressions and telling time
const time: PhraseItem[] = [
  // Asking the time & basics
  {
    russian: 'Который час?',
    english: 'What time is it?',
    pronunciation: 'kah-toh-riy chas'
  },
  {
    russian: 'Сколько сейчас времени?',
    english: 'What time is it now?',
    pronunciation: 'skohl-kah see-chas vrye-mee-nee'
  },
  {
    russian: 'Во сколько?',
    english: 'At what time?',
    pronunciation: 'vah skohl-kah'
  },
  {
    russian: 'время',
    english: 'time',
    pronunciation: 'vrye-mya'
  },
  {
    russian: 'сейчас',
    english: 'now',
    pronunciation: 'see-chas'
  },
  {
    russian: 'час',
    english: 'hour',
    pronunciation: 'chas'
  },
  {
    russian: 'минута',
    english: 'minute',
    pronunciation: 'mee-noo-ta'
  },
  {
    russian: 'секунда',
    english: 'second',
    pronunciation: 'see-koon-da'
  },

  // Hours (Genitive agreement: час, часа, часов)
  {
    russian: 'Один час',
    english: 'One o\'clock',
    pronunciation: 'ah-deen chas'
  },
  {
    russian: 'Два часа',
    english: 'Two o\'clock',
    pronunciation: 'dva cha-sah'
  },
  {
    russian: 'Три часа',
    english: 'Three o\'clock',
    pronunciation: 'tree cha-sah'
  },
  {
    russian: 'Четыре часа',
    english: 'Four o\'clock',
    pronunciation: 'chee-ty-rye cha-sah'
  },
  {
    russian: 'Пять часов',
    english: 'Five o\'clock',
    pronunciation: 'pyat\' cha-sohf'
  },
  {
    russian: 'Шесть часов',
    english: 'Six o\'clock',
    pronunciation: 'shest\' cha-sohf'
  },
  {
    russian: 'Семь часов',
    english: 'Seven o\'clock',
    pronunciation: 'syem\' cha-sohf'
  },
  {
    russian: 'Восемь часов',
    english: 'Eight o\'clock',
    pronunciation: 'voh-seem\' cha-sohf'
  },
  {
    russian: 'Девять часов',
    english: 'Nine o\'clock',
    pronunciation: 'dyeh-vyat\' cha-sohf'
  },
  {
    russian: 'Десять часов',
    english: 'Ten o\'clock',
    pronunciation: 'dyeh-syat\' cha-sohf'
  },
  {
    russian: 'Одиннадцать часов',
    english: 'Eleven o\'clock',
    pronunciation: 'ah-deen-nad-tsat\' cha-sohf'
  },
  {
    russian: 'Двенадцать часов',
    english: 'Twelve o\'clock',
    pronunciation: 'dvye-nad-tsat\' cha-sohf'
  },

  // Times of Day
  {
    russian: 'утра',
    english: 'in the morning (a.m.)',
    pronunciation: 'oot-rah'
  },
  {
    russian: 'дня',
    english: 'in the afternoon (p.m.)',
    pronunciation: 'dnya'
  },
  {
    russian: 'вечера',
    english: 'in the evening (p.m.)',
    pronunciation: 'vye-chee-rah'
  },
  {
    russian: 'ночи',
    english: 'at night',
    pronunciation: 'noh-chee'
  },
  {
    russian: 'полдень',
    english: 'noon / midday',
    pronunciation: 'pohl-dyen\''
  },
  {
    russian: 'полночь',
    english: 'midnight',
    pronunciation: 'pohl-nahch'
  },

  // Practical Expressions
  {
    russian: 'полчаса',
    english: 'half an hour',
    pronunciation: 'pohl-cha-sah'
  },
  {
    russian: 'четверть часа',
    english: 'quarter of an hour',
    pronunciation: 'cheet-vyert\' cha-sah'
  },
  {
    russian: 'Половина первого',
    english: 'Half past twelve (12:30)',
    pronunciation: 'pah-lah-vee-nah pyer-vah-vah'
  },
  {
    russian: 'Без десяти два',
    english: 'Ten to two (1:50)',
    pronunciation: 'byez dye-see-tee dva'
  },
  {
    russian: 'Ровно три часа',
    english: 'Exactly three o\'clock',
    pronunciation: 'rohv-nah tree cha-sah'
  },
  {
    russian: 'вовремя',
    english: 'on time',
    pronunciation: 'voh-vrye-mya'
  },
  {
    russian: 'рано',
    english: 'early',
    pronunciation: 'rah-nah'
  },
  {
    russian: 'поздно',
    english: 'late',
    pronunciation: 'pohz-nah'
  },
  // Days of the Week & Calendar
  {
    russian: 'понедельник',
    english: 'Monday',
    pronunciation: 'pah-nee-dyel\'-neek'
  },
  {
    russian: 'вторник',
    english: 'Tuesday',
    pronunciation: 'ftohr-neek'
  },
  {
    russian: 'среда',
    english: 'Wednesday',
    pronunciation: 'srye-dah'
  },
  {
    russian: 'четверг',
    english: 'Thursday',
    pronunciation: 'cheet-vyerk'
  },
  {
    russian: 'пятница',
    english: 'Friday',
    pronunciation: 'pyat-nee-tsa'
  },
  {
    russian: 'суббота',
    english: 'Saturday',
    pronunciation: 'soo-boh-ta'
  },
  {
    russian: 'воскресенье',
    english: 'Sunday',
    pronunciation: 'vah-skrye-syen\'-ye'
  },
  {
    russian: 'сегодня',
    english: 'today',
    pronunciation: 'see-voh-dnya'
  },
  {
    russian: 'вчера',
    english: 'yesterday',
    pronunciation: 'fchee-rah'
  },
  {
    russian: 'завтра',
    english: 'tomorrow',
    pronunciation: 'zahf-tra'
  },
  {
    russian: 'день',
    english: 'day',
    pronunciation: 'dyen\''
  },
  {
    russian: 'неделя',
    english: 'week',
    pronunciation: 'nee-dye-lya'
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