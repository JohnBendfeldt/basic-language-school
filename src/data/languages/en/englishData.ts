/**
 * English language curriculum data for basicenglish.school and basicenglish.academy
 * Comprehensive beginner foundation: Alphabet & Phonics, Essential Phrases, Numbers, and Core Vocabulary.
 */
import { AlphabetItem, PhraseItem, AppData } from '../../../types/index';

// English alphabet (A-Z) with phonics sounds and beginner vocabulary
const alphabet: AlphabetItem[] = [
  {
    letter: 'A',
    pronunciation: '/eɪ/ & /æ/',
    example: 'as in Apple, Ant',
    word: 'Apple',
    meaning: 'Noun: A sweet round fruit',
    icon: '🍎'
  },
  {
    letter: 'B',
    pronunciation: '/biː/',
    example: 'as in Book, Boy',
    word: 'Book',
    meaning: 'Noun: Pages with words to read',
    icon: '📖'
  },
  {
    letter: 'C',
    pronunciation: '/siː/ & /k/',
    example: 'as in Cat, Car',
    word: 'Cat',
    meaning: 'Noun: A small furry pet',
    icon: '🐱'
  },
  {
    letter: 'D',
    pronunciation: '/diː/',
    example: 'as in Dog, Door',
    word: 'Dog',
    meaning: 'Noun: A friendly loyal pet',
    icon: '🐶'
  },
  {
    letter: 'E',
    pronunciation: '/iː/ & /ɛ/',
    example: 'as in Egg, Elephant',
    word: 'Egg',
    meaning: 'Noun: Breakfast food from birds',
    icon: '🥚'
  },
  {
    letter: 'F',
    pronunciation: '/ɛf/',
    example: 'as in Friend, Fish',
    word: 'Fish',
    meaning: 'Noun: Animal that swims in water',
    icon: '🐟'
  },
  {
    letter: 'G',
    pronunciation: '/dʒiː/ & /ɡ/',
    example: 'as in Good, Girl',
    word: 'Good',
    meaning: 'Adjective: Positive, fine, nice',
    icon: '👍'
  },
  {
    letter: 'H',
    pronunciation: '/eɪtʃ/',
    example: 'as in House, Hello',
    word: 'House',
    meaning: 'Noun: A building where people live',
    icon: '🏠'
  },
  {
    letter: 'I',
    pronunciation: '/aɪ/ & /ɪ/',
    example: 'as in Ice, Island',
    word: 'Ice',
    meaning: 'Noun: Frozen solid water',
    icon: '🧊'
  },
  {
    letter: 'J',
    pronunciation: '/dʒeɪ/',
    example: 'as in Juice, Job',
    word: 'Juice',
    meaning: 'Noun: Drink made from fruit',
    icon: '🧃'
  },
  {
    letter: 'K',
    pronunciation: '/keɪ/',
    example: 'as in Key, Kitchen',
    word: 'Key',
    meaning: 'Noun: Metal tool to open doors',
    icon: '🔑'
  },
  {
    letter: 'L',
    pronunciation: '/ɛl/',
    example: 'as in Light, Love',
    word: 'Light',
    meaning: 'Noun: Brightness from sun or lamp',
    icon: '💡'
  },
  {
    letter: 'M',
    pronunciation: '/ɛm/',
    example: 'as in Mother, Milk',
    word: 'Milk',
    meaning: 'Noun: White dairy drink',
    icon: '🥛'
  },
  {
    letter: 'N',
    pronunciation: '/ɛn/',
    example: 'as in Name, Night',
    word: 'Name',
    meaning: 'Noun: What a person is called',
    icon: '🏷️'
  },
  {
    letter: 'O',
    pronunciation: '/oʊ/ & /ɒ/',
    example: 'as in Open, Orange',
    word: 'Orange',
    meaning: 'Noun: Round citrus fruit and color',
    icon: '🍊'
  },
  {
    letter: 'P',
    pronunciation: '/piː/',
    example: 'as in Please, Phone',
    word: 'Phone',
    meaning: 'Noun: Mobile device for calling',
    icon: '📱'
  },
  {
    letter: 'Q',
    pronunciation: '/kjuː/',
    example: 'as in Question, Quick',
    word: 'Quiet',
    meaning: 'Adjective: Making very little sound',
    icon: '🤫'
  },
  {
    letter: 'R',
    pronunciation: '/ɑːr/',
    example: 'as in Rain, Road',
    word: 'Road',
    meaning: 'Noun: Street for cars to drive',
    icon: '🛣️'
  },
  {
    letter: 'S',
    pronunciation: '/ɛs/',
    example: 'as in School, Sun',
    word: 'School',
    meaning: 'Noun: A place of learning',
    icon: '🏫'
  },
  {
    letter: 'T',
    pronunciation: '/tiː/',
    example: 'as in Time, Tea',
    word: 'Tea',
    meaning: 'Noun: Hot herbal or leaf drink',
    icon: '🍵'
  },
  {
    letter: 'U',
    pronunciation: '/juː/ & /ʌ/',
    example: 'as in Umbrella, Up',
    word: 'Umbrella',
    meaning: 'Noun: Shield used against rain',
    icon: '☂️'
  },
  {
    letter: 'V',
    pronunciation: '/viː/',
    example: 'as in Voice, Vacation',
    word: 'Voice',
    meaning: 'Noun: Sound made when speaking',
    icon: '🗣️'
  },
  {
    letter: 'W',
    pronunciation: '/ˈdʌbəl.juː/',
    example: 'as in Water, Window',
    word: 'Water',
    meaning: 'Noun: Essential clear liquid',
    icon: '💧'
  },
  {
    letter: 'X',
    pronunciation: '/ɛks/',
    example: 'as in Box, X-ray',
    word: 'X-ray',
    meaning: 'Noun: Medical picture of bones',
    icon: '🩻'
  },
  {
    letter: 'Y',
    pronunciation: '/waɪ/',
    example: 'as in Yes, Yellow',
    word: 'Yellow',
    meaning: 'Adjective: Color of the sun',
    icon: '💛'
  },
  {
    letter: 'Z',
    pronunciation: '/zɛd/ or /ziː/',
    example: 'as in Zoo, Zero',
    word: 'Zero',
    meaning: 'Noun: The number 0',
    icon: '0️⃣'
  }
];

// Essential everyday English phrases
const basicPhrases: PhraseItem[] = [
  // Greetings & Introductions
  {
    phrase: 'Hello',
    meaning: 'Universal friendly greeting (any time of day)',
    pronunciation: '/həˈloʊ/ (heh-LOH)',
    category: 'Greetings',
    icon: '👋'
  },
  {
    phrase: 'Good morning',
    meaning: 'Polite greeting used from dawn until 12:00 PM',
    pronunciation: '/ɡʊd ˈmɔːrnɪŋ/ (good MOR-ning)',
    category: 'Greetings',
    icon: '🌅'
  },
  {
    phrase: 'Good afternoon',
    meaning: 'Greeting used between 12:00 PM and evening',
    pronunciation: '/ɡʊd ˌæftərˈnuːn/ (good af-ter-NOON)',
    category: 'Greetings',
    icon: '☀️'
  },
  {
    phrase: 'Good evening',
    meaning: 'Polite greeting used after 6:00 PM',
    pronunciation: '/ɡʊd ˈiːvnɪŋ/ (good EEV-ning)',
    category: 'Greetings',
    icon: '🌆'
  },
  {
    phrase: 'How are you?',
    meaning: 'Common inquiry about someone\'s well-being',
    pronunciation: '/haʊ ɑːr juː/ (how ar yoo)',
    category: 'Conversation',
    icon: '😊'
  },
  {
    phrase: 'Nice to meet you',
    meaning: 'Polite phrase said when meeting someone for the first time',
    pronunciation: '/naɪs tuː miːt juː/ (nys to meet yoo)',
    category: 'Introductions',
    icon: '🤝'
  },
  {
    phrase: 'What is your name?',
    meaning: 'Polite question to ask someone their name',
    pronunciation: '/wʌt ɪz jʊər neɪm/ (wuht iz yor naym)',
    category: 'Introductions',
    icon: '❓'
  },
  {
    phrase: 'My name is...',
    meaning: 'Standard way to introduce yourself',
    pronunciation: '/maɪ neɪm ɪz/ (my naym iz)',
    category: 'Introductions',
    icon: '🏷️'
  },
  {
    phrase: 'Goodbye',
    meaning: 'Standard farewell phrase',
    pronunciation: '/ɡʊdˈbaɪ/ (good-BY)',
    category: 'Farewells',
    icon: '👋'
  },
  {
    phrase: 'Have a great day',
    meaning: 'Warm, friendly closing remark',
    pronunciation: '/hæv ə ɡreɪt deɪ/ (hav a grayt day)',
    category: 'Farewells',
    icon: '🌟'
  },

  // Polite Essentials
  {
    phrase: 'Please',
    meaning: 'Essential courtesy word when asking for anything',
    pronunciation: '/pliːz/ (pleez)',
    category: 'Politeness',
    icon: '🙏'
  },
  {
    phrase: 'Thank you very much',
    meaning: 'Expressing sincere gratitude',
    pronunciation: '/θæŋk juː ˈvɛri mʌtʃ/ (thank yoo veh-ree much)',
    category: 'Politeness',
    icon: '💖'
  },
  {
    phrase: 'You are welcome',
    meaning: 'Standard polite reply to thank you',
    pronunciation: '/jʊər ˈwɛlkəm/ (yor WEL-kum)',
    category: 'Politeness',
    icon: '🤗'
  },
  {
    phrase: 'Excuse me',
    meaning: 'Getting attention politely or stepping past someone',
    pronunciation: '/ɪkˈskjuːz miː/ (ik-SKYOOZ mee)',
    category: 'Politeness',
    icon: '🙋'
  },
  {
    phrase: 'I am sorry',
    meaning: 'Apologizing for an error or bump',
    pronunciation: '/aɪ æm ˈsɒri/ (eye am SAH-ree)',
    category: 'Politeness',
    icon: '🙇'
  },
  {
    phrase: 'Yes',
    meaning: 'Affirmative response',
    pronunciation: '/jɛs/ (yes)',
    category: 'Responses',
    icon: '✅'
  },
  {
    phrase: 'No',
    meaning: 'Negative response',
    pronunciation: '/noʊ/ (noh)',
    category: 'Responses',
    icon: '❌'
  },

  // Travel & Directions
  {
    phrase: 'Where is the restroom?',
    meaning: 'Asking where the toilet or bathroom is located',
    pronunciation: '/wɛər ɪz ðə ˈrɛstruːm/ (wear iz the REST-room)',
    category: 'Travel',
    icon: '🚻'
  },
  {
    phrase: 'Where is the bus stop?',
    meaning: 'Asking for public transit location',
    pronunciation: '/wɛər ɪz ðə bʌs stɒp/ (wear iz the bus stop)',
    category: 'Travel',
    icon: '🚏'
  },
  {
    phrase: 'How do I get to the airport?',
    meaning: 'Asking for directions to airport',
    pronunciation: '/haʊ duː aɪ ɡɛt tuː ði ˈɛərpɔːrt/ (how doo eye get to the AIR-port)',
    category: 'Travel',
    icon: '✈️'
  },
  {
    phrase: 'Is it far from here?',
    meaning: 'Inquiring about walking or travel distance',
    pronunciation: '/ɪz ɪt fɑːr frʌm hɪər/ (iz it far from heer)',
    category: 'Travel',
    icon: '🗺️'
  },

  // Dining & Ordering
  {
    phrase: 'Can I have the check, please?',
    meaning: 'Asking the server for the restaurant bill',
    pronunciation: '/kæn aɪ hæv ðə tʃɛk pliːz/ (kan eye hav the chek pleez)',
    category: 'Dining',
    icon: '🧾'
  },
  {
    phrase: 'I would like a coffee, please',
    meaning: 'Ordering a beverage politely at a cafe',
    pronunciation: '/aɪ wʊd laɪk ə ˈkɒfi pliːz/ (eye wood lyk a KAW-fee pleez)',
    category: 'Dining',
    icon: '☕'
  },
  {
    phrase: 'A bottle of water, please',
    meaning: 'Ordering drinking water',
    pronunciation: '/ə ˈbɒtəl ʌv ˈwɔːtər pliːz/ (a BAH-tul uv WAH-ter pleez)',
    category: 'Dining',
    icon: '💧'
  },
  {
    phrase: 'How much does this cost?',
    meaning: 'Asking the price of an item in a store',
    pronunciation: '/haʊ mʌtʃ dʌz ðɪs kɒst/ (how much duz this kawst)',
    category: 'Shopping',
    icon: '🏷️'
  },

  // Communication & Assistance
  {
    phrase: 'Do you speak English?',
    meaning: 'Asking if the other person knows English',
    pronunciation: '/duː juː spiːk ˈɪŋɡlɪʃ/ (doo yoo speek ING-glish)',
    category: 'Conversation',
    icon: '🗣️'
  },
  {
    phrase: 'Could you speak slower, please?',
    meaning: 'Polite request when someone speaks too quickly',
    pronunciation: '/kʊd juː spiːk ˈsloʊər pliːz/ (kood yoo speek SLOH-er pleez)',
    category: 'Conversation',
    icon: '🐢'
  },
  {
    phrase: 'I do not understand',
    meaning: 'Expressing that you need clarification',
    pronunciation: '/aɪ duː nɒt ˌʌndərˈstænd/ (eye doo not un-der-STAND)',
    category: 'Conversation',
    icon: '🤔'
  },
  {
    phrase: 'Could you repeat that, please?',
    meaning: 'Asking someone to say something again',
    pronunciation: '/kʊd juː rɪˈpiːt ðæt pliːz/ (kood yoo ree-PEET that pleez)',
    category: 'Conversation',
    icon: '🔁'
  },
  {
    phrase: 'Can you help me?',
    meaning: 'Asking for assistance or support',
    pronunciation: '/kæn juː hɛlp miː/ (kan yoo help mee)',
    category: 'Emergency',
    icon: '🆘'
  },
  // Tech & Remote Work
  {
    phrase: 'Can you hear me?',
    meaning: 'Checking audio on a video or phone call',
    pronunciation: '/kæn juː hɪər miː/ (kan yoo heer mee)',
    category: 'Tech',
    icon: '🎧'
  },
  {
    phrase: 'Can you see my screen?',
    meaning: 'Checking screen share during a remote meeting',
    pronunciation: '/kæn juː siː maɪ skriːn/ (kan yoo see my skreen)',
    category: 'Tech',
    icon: '🖥️'
  },
  {
    phrase: 'What is the Wi-Fi password?',
    meaning: 'Asking for wireless internet access',
    pronunciation: '/wʌt ɪz ðə ˈwaɪfaɪ ˈpæswɜːrd/ (wuht iz the WY-fy PASS-werd)',
    category: 'Tech',
    icon: '📶'
  },
  // Business & Office
  {
    phrase: 'Let\'s schedule a meeting',
    meaning: 'Setting up a work call or appointment',
    pronunciation: '/lɛts ˈskɛdʒuːl ə ˈmiːtɪŋ/ (lets SKEJ-ool a MEE-ting)',
    category: 'Business',
    icon: '📅'
  },
  {
    phrase: 'I will send you an email',
    meaning: 'Promising to follow up in writing',
    pronunciation: '/aɪ wɪl sɛnd juː ən ˈiːmeɪl/ (eye wil send yoo an EE-mayl)',
    category: 'Business',
    icon: '📧'
  },
  {
    phrase: 'When is the deadline?',
    meaning: 'Asking when a project or task is due',
    pronunciation: '/wɛn ɪz ðə ˈdɛdlaɪn/ (wen iz the DED-lyn)',
    category: 'Business',
    icon: '⏳'
  },
  // Healthcare & Pharmacy
  {
    phrase: 'I need a doctor',
    meaning: 'Requesting urgent medical care',
    pronunciation: '/aɪ niːd ə ˈdɒktər/ (eye need a DAHK-ter)',
    category: 'Health',
    icon: '🩺'
  },
  {
    phrase: 'Where is the nearest pharmacy?',
    meaning: 'Asking where to buy medicine nearby',
    pronunciation: '/wɛər ɪz ðə ˈnɪərɪst ˈfɑːrməsi/ (wear iz the NEER-ist FAR-muh-see)',
    category: 'Health',
    icon: '💊'
  },
  {
    phrase: 'I am allergic to nuts',
    meaning: 'Communicating a food allergy clearly',
    pronunciation: '/aɪ æm əˈlɜːrdʒɪk tuː nʌts/ (eye am uh-LER-jik to nuts)',
    category: 'Health',
    icon: '⚠️'
  },
  // Hotel, Airport & Travel
  {
    phrase: 'I have a reservation',
    meaning: 'Checking in at a hotel or restaurant',
    pronunciation: '/aɪ hæv ə ˌrɛzərˈveɪʃən/ (eye hav a rez-er-VAY-shun)',
    category: 'Travel',
    icon: '🛎️'
  },
  {
    phrase: 'Where is the train station?',
    meaning: 'Asking for directions to rail transit',
    pronunciation: '/wɛər ɪz ðə treɪn ˈsteɪʃən/ (wear iz the trayn STAY-shun)',
    category: 'Travel',
    icon: '🚉'
  },
  {
    phrase: 'I need a taxi',
    meaning: 'Requesting a cab ride',
    pronunciation: '/aɪ niːd ə ˈtæksi/ (eye need a TAK-see)',
    category: 'Travel',
    icon: '🚕'
  },
  // Dining & Shopping
  {
    phrase: 'A table for two, please',
    meaning: 'Requesting seating at a restaurant',
    pronunciation: '/ə ˈteɪbəl fɔːr tuː pliːz/ (a TAY-bul for too pleez)',
    category: 'Dining',
    icon: '🍽️'
  },
  {
    phrase: 'The menu, please',
    meaning: 'Asking the server for the food list',
    pronunciation: '/ðə ˈmɛnjuː pliːz/ (the MEN-yoo pleez)',
    category: 'Dining',
    icon: '📖'
  },
  {
    phrase: 'Do you accept credit cards?',
    meaning: 'Checking payment options before buying',
    pronunciation: '/duː juː əkˈsɛpt ˈkrɛdɪt kɑːrdz/ (doo yoo ak-SEPT KRED-it kardz)',
    category: 'Shopping',
    icon: '💳'
  },
  {
    phrase: 'It is too expensive',
    meaning: 'Stating that a price is too high',
    pronunciation: '/ɪt ɪz tuː ɪkˈspɛnsɪv/ (it iz too ik-SPEN-siv)',
    category: 'Shopping',
    icon: '💸'
  }
];

// English numbers & time
const numbers: PhraseItem[] = [
  { phrase: 'Zero', meaning: '0 (Zero)', pronunciation: '/ˈzɪəroʊ/ (ZEE-roh)', category: 'Numbers 0-10', icon: '0️⃣' },
  { phrase: 'One', meaning: '1 (One)', pronunciation: '/wʌn/ (wun)', category: 'Numbers 0-10', icon: '1️⃣' },
  { phrase: 'Two', meaning: '2 (Two)', pronunciation: '/tuː/ (too)', category: 'Numbers 0-10', icon: '2️⃣' },
  { phrase: 'Three', meaning: '3 (Three)', pronunciation: '/θriː/ (three)', category: 'Numbers 0-10', icon: '3️⃣' },
  { phrase: 'Four', meaning: '4 (Four)', pronunciation: '/fɔːr/ (for)', category: 'Numbers 0-10', icon: '4️⃣' },
  { phrase: 'Five', meaning: '5 (Five)', pronunciation: '/faɪv/ (fyv)', category: 'Numbers 0-10', icon: '5️⃣' },
  { phrase: 'Six', meaning: '6 (Six)', pronunciation: '/sɪks/ (siks)', category: 'Numbers 0-10', icon: '6️⃣' },
  { phrase: 'Seven', meaning: '7 (Seven)', pronunciation: '/ˈsɛvən/ (SEH-vun)', category: 'Numbers 0-10', icon: '7️⃣' },
  { phrase: 'Eight', meaning: '8 (Eight)', pronunciation: '/eɪt/ (ayt)', category: 'Numbers 0-10', icon: '8️⃣' },
  { phrase: 'Nine', meaning: '9 (Nine)', pronunciation: '/naɪn/ (nyn)', category: 'Numbers 0-10', icon: '9️⃣' },
  { phrase: 'Ten', meaning: '10 (Ten)', pronunciation: '/tɛn/ (ten)', category: 'Numbers 0-10', icon: '🔟' },
  { phrase: 'Eleven', meaning: '11 (Eleven)', pronunciation: '/ɪˈlɛvən/ (ee-LEV-un)', category: 'Numbers 11-20', icon: '1️⃣1️⃣' },
  { phrase: 'Twelve', meaning: '12 (Twelve)', pronunciation: '/twɛlv/ (twelv)', category: 'Numbers 11-20', icon: '1️⃣2️⃣' },
  { phrase: 'Thirteen', meaning: '13 (Thirteen)', pronunciation: '/ˌθɜːrˈtiːn/ (ther-TEEN)', category: 'Numbers 11-20', icon: '1️⃣3️⃣' },
  { phrase: 'Fourteen', meaning: '14 (Fourteen)', pronunciation: '/ˌfɔːrˈtiːn/ (for-TEEN)', category: 'Numbers 11-20', icon: '1️⃣4️⃣' },
  { phrase: 'Fifteen', meaning: '15 (Fifteen)', pronunciation: '/ˌfɪfˈtiːn/ (fif-TEEN)', category: 'Numbers 11-20', icon: '1️⃣5️⃣' },
  { phrase: 'Sixteen', meaning: '16 (Sixteen)', pronunciation: '/ˌsɪksˈtiːn/ (siks-TEEN)', category: 'Numbers 11-20', icon: '1️⃣6️⃣' },
  { phrase: 'Seventeen', meaning: '17 (Seventeen)', pronunciation: '/ˌsɛvənˈtiːn/ (sev-un-TEEN)', category: 'Numbers 11-20', icon: '1️⃣7️⃣' },
  { phrase: 'Eighteen', meaning: '18 (Eighteen)', pronunciation: '/ˌeɪˈtiːn/ (ay-TEEN)', category: 'Numbers 11-20', icon: '1️⃣8️⃣' },
  { phrase: 'Nineteen', meaning: '19 (Nineteen)', pronunciation: '/ˌnaɪnˈtiːn/ (nyn-TEEN)', category: 'Numbers 11-20', icon: '1️⃣9️⃣' },
  { phrase: 'Twenty', meaning: '20 (Twenty)', pronunciation: '/ˈtwɛnti/ (TWEN-tee)', category: 'Tens', icon: '2️⃣0️⃣' },
  { phrase: 'Thirty', meaning: '30 (Thirty)', pronunciation: '/ˈθɜːrti/ (THER-tee)', category: 'Tens', icon: '3️⃣0️⃣' },
  { phrase: 'Forty', meaning: '40 (Forty)', pronunciation: '/ˈfɔːrti/ (FOR-tee)', category: 'Tens', icon: '4️⃣0️⃣' },
  { phrase: 'Fifty', meaning: '50 (Fifty)', pronunciation: '/ˈfɪfti/ (FIF-tee)', category: 'Tens', icon: '5️⃣0️⃣' },
  { phrase: 'Sixty', meaning: '60 (Sixty)', pronunciation: '/ˈsɪksti/ (SIKS-tee)', category: 'Tens', icon: '6️⃣0️⃣' },
  { phrase: 'Seventy', meaning: '70 (Seventy)', pronunciation: '/ˈsɛvənti/ (SEV-un-tee)', category: 'Tens', icon: '7️⃣0️⃣' },
  { phrase: 'Eighty', meaning: '80 (Eighty)', pronunciation: '/ˈeɪti/ (AY-tee)', category: 'Tens', icon: '8️⃣0️⃣' },
  { phrase: 'Ninety', meaning: '90 (Ninety)', pronunciation: '/ˈnaɪnti/ (NYN-tee)', category: 'Tens', icon: '9️⃣0️⃣' },
  { phrase: 'One hundred', meaning: '100 (One Hundred)', pronunciation: '/wʌn ˈhʌndrəd/ (wun HUN-dred)', category: 'Hundreds', icon: '💯' },
  { phrase: 'One thousand', meaning: '1,000 (One Thousand)', pronunciation: '/wʌn ˈθaʊzənd/ (wun THOW-zund)', category: 'Thousands', icon: '🔢' },
  { phrase: 'What time is it?', meaning: 'Asking for the current time', pronunciation: '/wʌt taɪm ɪz ɪt/ (wuht tym iz it)', category: 'Time', icon: '⏰' },
  { phrase: 'Two o\'clock', meaning: '2:00 sharp', pronunciation: '/tuː əˈklɒk/ (too uh-KLOK)', category: 'Time', icon: '🕑' },
  { phrase: 'Half past two', meaning: '2:30 (30 minutes past 2)', pronunciation: '/hæf pæst tuː/ (haf past too)', category: 'Time', icon: '🕝' },
  { phrase: 'Quarter to three', meaning: '2:45 (15 minutes until 3)', pronunciation: '/ˈkwɔːrtər tuː θriː/ (KWOR-ter to three)', category: 'Time', icon: '🕒' }
];

// High-frequency core vocabulary (Oxford 3000 beginner selection + Topic Packs)
const commonWords: PhraseItem[] = [
  // Food & Drink
  { phrase: 'Water', meaning: 'Noun: Essential drink for life', pronunciation: '/ˈwɔːtər/ (WAH-ter)', category: 'Food & Drink', icon: '💧' },
  { phrase: 'Bread', meaning: 'Noun: Baked staple food', pronunciation: '/brɛd/ (bred)', category: 'Food & Drink', icon: '🍞' },
  { phrase: 'Coffee', meaning: 'Noun: Popular brewed morning beverage', pronunciation: '/ˈkɒfi/ (KAW-fee)', category: 'Food & Drink', icon: '☕' },
  { phrase: 'Tea', meaning: 'Noun: Hot or iced herbal/leaf infusion', pronunciation: '/tiː/ (tee)', category: 'Food & Drink', icon: '🍵' },
  { phrase: 'Food', meaning: 'Noun: Nourishment to eat', pronunciation: '/fuːd/ (food)', category: 'Food & Drink', icon: '🍲' },
  { phrase: 'Breakfast', meaning: 'Noun: First meal of the day', pronunciation: '/ˈbrɛkfəst/ (BREK-fust)', category: 'Food & Drink', icon: '🍳' },
  { phrase: 'Lunch', meaning: 'Noun: Midday meal', pronunciation: '/lʌntʃ/ (lunch)', category: 'Food & Drink', icon: '🥪' },
  { phrase: 'Dinner', meaning: 'Noun: Evening meal', pronunciation: '/ˈdɪnər/ (DIN-er)', category: 'Food & Drink', icon: '🍽️' },
  { phrase: 'Restaurant', meaning: 'Noun: Place to buy and eat meals', pronunciation: '/ˈrɛstərɒnt/ (RES-tuh-rahnt)', category: 'Food & Drink', icon: '🍴' },

  // Places & Travel
  { phrase: 'Airport', meaning: 'Noun: Hub for airplanes and flights', pronunciation: '/ˈɛərpɔːrt/ (AIR-port)', category: 'Places', icon: '✈️' },
  { phrase: 'Hotel', meaning: 'Noun: Place with rooms for travelers', pronunciation: '/hoʊˈtɛl/ (hoh-TEL)', category: 'Places', icon: '🏨' },
  { phrase: 'Station', meaning: 'Noun: Stop for trains, metro, or buses', pronunciation: '/ˈsteɪʃən/ (STAY-shun)', category: 'Places', icon: '🚉' },
  { phrase: 'Hospital', meaning: 'Noun: Medical center for illness/injury', pronunciation: '/ˈhɒspɪtəl/ (HAHS-pi-tul)', category: 'Places', icon: '🏥' },
  { phrase: 'Pharmacy', meaning: 'Noun: Store for medicine and prescriptions', pronunciation: '/ˈfɑːrməsi/ (FAR-muh-see)', category: 'Places', icon: '💊' },
  { phrase: 'Supermarket', meaning: 'Noun: Large grocery store', pronunciation: '/ˈsuːpərˌmɑːrkɪt/ (SOO-per-mar-kit)', category: 'Places', icon: '🛒' },
  { phrase: 'Bank', meaning: 'Noun: Financial institution for money', pronunciation: '/bæŋk/ (bank)', category: 'Places', icon: '🏦' },
  { phrase: 'City', meaning: 'Noun: Large populated urban area', pronunciation: '/ˈsɪti/ (SIT-ee)', category: 'Places', icon: '🏙️' },

  // People & Family
  { phrase: 'Family', meaning: 'Noun: Parents, children, and relatives', pronunciation: '/ˈfæməli/ (FAM-uh-lee)', category: 'People', icon: '👨‍👩‍👧' },
  { phrase: 'Friend', meaning: 'Noun: A close companion you care about', pronunciation: '/frɛnd/ (frend)', category: 'People', icon: '🤝' },
  { phrase: 'Mother', meaning: 'Noun: Female parent', pronunciation: '/ˈmʌðər/ (MUH-ther)', category: 'People', icon: '👩' },
  { phrase: 'Father', meaning: 'Noun: Male parent', pronunciation: '/ˈfɑːðər/ (FAH-ther)', category: 'People', icon: '👨' },
  { phrase: 'Child', meaning: 'Noun: Young person (plural: children)', pronunciation: '/tʃaɪld/ (chyld)', category: 'People', icon: '🧒' },
  { phrase: 'Teacher', meaning: 'Noun: Instructor at school', pronunciation: '/ˈtiːtʃər/ (TEE-cher)', category: 'People', icon: '🧑‍🏫' },
  { phrase: 'Student', meaning: 'Noun: A learner taking classes', pronunciation: '/ˈstjuːdənt/ (STOO-dent)', category: 'People', icon: '🎒' },

  // Objects & Everyday Essentials
  { phrase: 'Money', meaning: 'Noun: Currency used to purchase goods', pronunciation: '/ˈmʌni/ (MUN-ee)', category: 'Essentials', icon: '💵' },
  { phrase: 'Ticket', meaning: 'Noun: Pass for transit, cinema, or events', pronunciation: '/ˈtɪkɪt/ (TIK-it)', category: 'Essentials', icon: '🎟️' },
  { phrase: 'Passport', meaning: 'Noun: Official travel identification document', pronunciation: '/ˈpæspɔːrt/ (PASS-port)', category: 'Essentials', icon: '🛂' },
  { phrase: 'Book', meaning: 'Noun: Printed literature or study material', pronunciation: '/bʊk/ (book)', category: 'Essentials', icon: '📖' },

  // Core Verbs / Actions
  { phrase: 'To learn', meaning: 'Verb: Gain knowledge or skill', pronunciation: '/tuː lɜːrn/ (to lern)', category: 'Common Verbs', icon: '🧠' },
  { phrase: 'To speak', meaning: 'Verb: Say words, communicate in a language', pronunciation: '/tuː spiːk/ (to speek)', category: 'Common Verbs', icon: '💬' },
  { phrase: 'To eat', meaning: 'Verb: Consume food', pronunciation: '/tuː iːt/ (to eet)', category: 'Common Verbs', icon: '🍴' },
  { phrase: 'To drink', meaning: 'Verb: Swallow liquids', pronunciation: '/tuː drɪŋk/ (to drink)', category: 'Common Verbs', icon: '🥤' },
  { phrase: 'To go', meaning: 'Verb: Move or travel somewhere', pronunciation: '/tuː ɡoʊ/ (to goh)', category: 'Common Verbs', icon: '🚶' },
  { phrase: 'To understand', meaning: 'Verb: Grasp the meaning', pronunciation: '/tuː ˌʌndərˈstænd/ (to un-der-STAND)', category: 'Common Verbs', icon: '💡' },

  // Colors & Descriptions
  { phrase: 'Red', meaning: 'Color: Red', pronunciation: '/rɛd/ (red)', category: 'Colors', icon: '🔴' },
  { phrase: 'Blue', meaning: 'Color: Blue', pronunciation: '/bluː/ (bloo)', category: 'Colors', icon: '🔵' },
  { phrase: 'Green', meaning: 'Color: Green', pronunciation: '/ɡriːn/ (green)', category: 'Colors', icon: '🟢' },
  { phrase: 'Yellow', meaning: 'Color: Yellow', pronunciation: '/ˈjɛloʊ/ (YEL-oh)', category: 'Colors', icon: '🟡' },
  { phrase: 'Black', meaning: 'Color: Black', pronunciation: '/blæk/ (blak)', category: 'Colors', icon: '⚫' },
  { phrase: 'White', meaning: 'Color: White', pronunciation: '/waɪt/ (wyt)', category: 'Colors', icon: '⚪' },
  { phrase: 'Big', meaning: 'Adjective: Large in size', pronunciation: '/bɪɡ/ (big)', category: 'Descriptions', icon: '🐘' },
  { phrase: 'Small', meaning: 'Adjective: Little in size', pronunciation: '/smɔːl/ (smawl)', category: 'Descriptions', icon: '🐁' },
  { phrase: 'New', meaning: 'Adjective: Recently made or modern', pronunciation: '/njuː/ (noo)', category: 'Descriptions', icon: '✨' },
  { phrase: 'Old', meaning: 'Adjective: Aged or historic', pronunciation: '/oʊld/ (ohld)', category: 'Descriptions', icon: '🕰️' },

  // Weather & Seasons
  { phrase: 'Sun', meaning: 'Noun: Daylight star / sunshine', pronunciation: '/sʌn/ (sun)', category: 'Weather', icon: '☀️' },
  { phrase: 'Rain', meaning: 'Noun: Water falling from clouds', pronunciation: '/reɪn/ (rayn)', category: 'Weather', icon: '🌧️' },
  { phrase: 'Snow', meaning: 'Noun: Frozen white flakes in winter', pronunciation: '/snoʊ/ (snoh)', category: 'Weather', icon: '❄️' },
  { phrase: 'Wind', meaning: 'Noun: Moving air outdoors', pronunciation: '/wɪnd/ (wind)', category: 'Weather', icon: '💨' },
  { phrase: 'Cloud', meaning: 'Noun: White or gray mass in the sky', pronunciation: '/klaʊd/ (klowd)', category: 'Weather', icon: '☁️' },
  { phrase: 'Storm', meaning: 'Noun: Heavy rain, wind, or thunder', pronunciation: '/stɔːrm/ (storm)', category: 'Weather', icon: '⛈️' },
  { phrase: 'Hot', meaning: 'Adjective: High temperature / warm', pronunciation: '/hɒt/ (haht)', category: 'Weather', icon: '🔥' },
  { phrase: 'Cold', meaning: 'Adjective: Low temperature / chilly', pronunciation: '/koʊld/ (kohld)', category: 'Weather', icon: '🥶' },

  // Tech & Remote Work
  { phrase: 'Computer', meaning: 'Noun: Electronic machine for work/browsing', pronunciation: '/kəmˈpjuːtər/ (kum-PYOO-ter)', category: 'Tech', icon: '💻' },
  { phrase: 'Phone', meaning: 'Noun: Mobile smartphone', pronunciation: '/foʊn/ (fohn)', category: 'Tech', icon: '📱' },
  { phrase: 'Internet', meaning: 'Noun: Global network / Wi-Fi connection', pronunciation: '/ˈɪntərnɛt/ (IN-ter-net)', category: 'Tech', icon: '🌐' },
  { phrase: 'Password', meaning: 'Noun: Secret login key', pronunciation: '/ˈpæswɜːrd/ (PASS-werd)', category: 'Tech', icon: '🔐' },
  { phrase: 'Email', meaning: 'Noun: Electronic mail message', pronunciation: '/ˈiːmeɪl/ (EE-mayl)', category: 'Tech', icon: '📧' },
  { phrase: 'Screen', meaning: 'Noun: Display monitor on phone or laptop', pronunciation: '/skriːn/ (skreen)', category: 'Tech', icon: '🖥️' },
  { phrase: 'Meeting', meaning: 'Noun: Work call or conference session', pronunciation: '/ˈmiːtɪŋ/ (MEE-ting)', category: 'Tech', icon: '📅' },
  { phrase: 'File', meaning: 'Noun: Digital document or folder item', pronunciation: '/faɪl/ (fyl)', category: 'Tech', icon: '📁' },
  { phrase: 'Link', meaning: 'Noun: Website URL or hyperlink', pronunciation: '/lɪŋk/ (link)', category: 'Tech', icon: '🔗' },
  { phrase: 'Code', meaning: 'Noun: Software programming or passcode', pronunciation: '/koʊd/ (kohd)', category: 'Tech', icon: '🧑‍💻' },
  { phrase: 'Error', meaning: 'Noun: Software bug or mistake', pronunciation: '/ˈɛrər/ (EHR-er)', category: 'Tech', icon: '🐛' },
  { phrase: 'Battery', meaning: 'Noun: Device power charge', pronunciation: '/ˈbætəri/ (BAT-uh-ree)', category: 'Tech', icon: '🔋' },

  // Business & Office
  { phrase: 'Project', meaning: 'Noun: Planned work assignment', pronunciation: '/ˈprɒdʒɛkt/ (PRAH-jekt)', category: 'Business', icon: '📊' },
  { phrase: 'Client', meaning: 'Noun: Customer or business partner', pronunciation: '/ˈklaɪənt/ (KLY-unt)', category: 'Business', icon: '🤝' },
  { phrase: 'Team', meaning: 'Noun: Group working together', pronunciation: '/tiːm/ (teem)', category: 'Business', icon: '👥' },
  { phrase: 'Manager', meaning: 'Noun: Supervisor or team lead', pronunciation: '/ˈmænɪdʒər/ (MAN-i-jer)', category: 'Business', icon: '👔' },
  { phrase: 'Company', meaning: 'Noun: Business organization or firm', pronunciation: '/ˈkʌmpəni/ (KUM-puh-nee)', category: 'Business', icon: '🏢' },
  { phrase: 'Contract', meaning: 'Noun: Written legal agreement', pronunciation: '/ˈkɒntrækt/ (KAHN-trakt)', category: 'Business', icon: '📝' },
  { phrase: 'Schedule', meaning: 'Noun: Timetable or calendar plan', pronunciation: '/ˈskɛdʒuːl/ (SKEJ-ool)', category: 'Business', icon: '🗓️' },
  { phrase: 'Deadline', meaning: 'Noun: Due date for completing work', pronunciation: '/ˈdɛdlaɪn/ (DED-lyn)', category: 'Business', icon: '⏳' },
  { phrase: 'Invoice', meaning: 'Noun: Bill for goods or services', pronunciation: '/ˈɪnvɔɪs/ (IN-voys)', category: 'Business', icon: '🧾' },
  { phrase: 'Salary', meaning: 'Noun: Regular employment pay', pronunciation: '/ˈsæləri/ (SAL-uh-ree)', category: 'Business', icon: '💵' },

  // Healthcare & Pharmacy
  { phrase: 'Doctor', meaning: 'Noun: Medical physician', pronunciation: '/ˈdɒktər/ (DAHK-ter)', category: 'Health', icon: '🩺' },
  { phrase: 'Medicine', meaning: 'Noun: Treatment or drug from a pharmacy', pronunciation: '/ˈmɛdɪsɪn/ (MED-i-sin)', category: 'Health', icon: '💊' },
  { phrase: 'Pain', meaning: 'Noun: Physical hurt or ache', pronunciation: '/peɪn/ (payn)', category: 'Health', icon: '🤕' },
  { phrase: 'Fever', meaning: 'Noun: High body temperature', pronunciation: '/ˈfiːvər/ (FEE-ver)', category: 'Health', icon: '🤒' },
  { phrase: 'Allergy', meaning: 'Noun: Adverse reaction to food/pollen', pronunciation: '/ˈælərdʒi/ (AL-er-jee)', category: 'Health', icon: '⚠️' },
  { phrase: 'Headache', meaning: 'Noun: Pain in the head', pronunciation: '/ˈhɛdeɪk/ (HED-ayk)', category: 'Health', icon: '🧠' },
  { phrase: 'Emergency', meaning: 'Noun: Urgent crisis requiring help', pronunciation: '/ɪˈmɜːrdʒənsi/ (ee-MER-jun-see)', category: 'Health', icon: '🚑' },
  { phrase: 'Prescription', meaning: 'Noun: Doctor\'s medicine order', pronunciation: '/prɪˈskrɪpʃən/ (pri-SKRIP-shun)', category: 'Health', icon: '📋' },
  { phrase: 'Bandage', meaning: 'Noun: Protective strip for a cut', pronunciation: '/ˈbændɪdʒ/ (BAN-dij)', category: 'Health', icon: '🩹' },
  { phrase: 'Health', meaning: 'Noun: Physical well-being', pronunciation: '/hɛlθ/ (helth)', category: 'Health', icon: '❤️' },

  // Hotel, Airport & Travel
  { phrase: 'Flight', meaning: 'Noun: Airplane journey', pronunciation: '/flaɪt/ (flyt)', category: 'Travel', icon: '🛫' },
  { phrase: 'Luggage', meaning: 'Noun: Suitcases and travel bags', pronunciation: '/ˈlʌɡɪdʒ/ (LUG-ij)', category: 'Travel', icon: '🧳' },
  { phrase: 'Reservation', meaning: 'Noun: Advance booking for room or table', pronunciation: '/ˌrɛzərˈveɪʃən/ (rez-er-VAY-shun)', category: 'Travel', icon: '🛎️' },
  { phrase: 'Key', meaning: 'Noun: Room or door opener', pronunciation: '/kiː/ (kee)', category: 'Travel', icon: '🔑' },
  { phrase: 'Room', meaning: 'Noun: Hotel accommodation space', pronunciation: '/ruːm/ (room)', category: 'Travel', icon: '🛏️' },
  { phrase: 'Gate', meaning: 'Noun: Airport boarding exit', pronunciation: '/ɡeɪt/ (gayt)', category: 'Travel', icon: '🚪' },
  { phrase: 'Map', meaning: 'Noun: Visual guide of streets', pronunciation: '/mæp/ (map)', category: 'Travel', icon: '🗺️' },
  { phrase: 'Entrance', meaning: 'Noun: Way in to a building', pronunciation: '/ˈɛntrəns/ (EN-truns)', category: 'Travel', icon: '➡️' },
  { phrase: 'Exit', meaning: 'Noun: Way out of a building', pronunciation: '/ˈɛɡzɪt/ (EG-zit)', category: 'Travel', icon: '⬅️' },
  { phrase: 'Customs', meaning: 'Noun: Border inspection at airport', pronunciation: '/ˈkʌstəmz/ (KUS-tumz)', category: 'Travel', icon: '🛂' },

  // Shopping & Money
  { phrase: 'Credit card', meaning: 'Noun: Payment card', pronunciation: '/ˈkrɛdɪt kɑːrd/ (KRED-it kard)', category: 'Shopping', icon: '💳' },
  { phrase: 'Cash', meaning: 'Noun: Physical bills and coins', pronunciation: '/kæʃ/ (kash)', category: 'Shopping', icon: '💵' },
  { phrase: 'Price', meaning: 'Noun: Cost of an item', pronunciation: '/praɪs/ (prys)', category: 'Shopping', icon: '🏷️' },
  { phrase: 'Cheap', meaning: 'Adjective: Low in price / affordable', pronunciation: '/tʃiːp/ (cheep)', category: 'Shopping', icon: '👇' },
  { phrase: 'Expensive', meaning: 'Adjective: High in price', pronunciation: '/ɪkˈspɛnsɪv/ (ik-SPEN-siv)', category: 'Shopping', icon: '💎' },
  { phrase: 'Discount', meaning: 'Noun: Price reduction or sale', pronunciation: '/ˈdɪskaʊnt/ (DIS-kownt)', category: 'Shopping', icon: '🏷️' },
  // Batch 1: Modern Tech, Workplace & Commerce (Levels 1, 2, 3)
  { phrase: 'Laptop', translation: 'Laptop', pronunciation: 'LAP-top', category: 'Tech', level: 1, icon: '💻' },
  { phrase: 'Tablet', translation: 'Tablet', pronunciation: 'TAB-lit', category: 'Tech', level: 1, icon: '📱' },
  { phrase: 'Keyboard', translation: 'Keyboard', pronunciation: 'KEE-bord', category: 'Tech', level: 1, icon: '⌨️' },
  { phrase: 'Mouse', translation: 'Mouse', pronunciation: 'mows', category: 'Tech', level: 1, icon: '🖱️' },
  { phrase: 'Charger', translation: 'Charger', pronunciation: 'CHAHR-jer', category: 'Tech', level: 1, icon: '🔌' },
  { phrase: 'Cable', translation: 'Cable / Wire', pronunciation: 'KAY-buhl', category: 'Tech', level: 1, icon: '🔌' },
  { phrase: 'Wi-Fi', translation: 'Wi-Fi', pronunciation: 'WAI-fai', category: 'Tech', level: 1, icon: '📶' },
  { phrase: 'Message', translation: 'Message / Text', pronunciation: 'MES-ij', category: 'Tech', level: 1, icon: '💬' },
  { phrase: 'Website', translation: 'Website', pronunciation: 'WEB-syt', category: 'Tech', level: 1, icon: '🌐' },
  { phrase: 'Application', translation: 'Application / App', pronunciation: 'ap-li-KAY-shuhn', category: 'Tech', level: 1, icon: '📱' },
  { phrase: 'Folder', translation: 'Folder', pronunciation: 'FOHL-der', category: 'Tech', level: 1, icon: '📁' },
  { phrase: 'Camera', translation: 'Camera', pronunciation: 'KAM-ruh', category: 'Tech', level: 1, icon: '📷' },
  { phrase: 'Microphone', translation: 'Microphone', pronunciation: 'MY-kruh-fohn', category: 'Tech', level: 1, icon: '🎙️' },
  { phrase: 'Headphones', translation: 'Headphones', pronunciation: 'HED-fohnz', category: 'Tech', level: 1, icon: '🎧' },
  { phrase: 'Printer', translation: 'Printer', pronunciation: 'PRIN-ter', category: 'Tech', level: 1, icon: '🖨️' },
  { phrase: 'Search', translation: 'Search / Find', pronunciation: 'surch', category: 'Tech', level: 1, icon: '🔍' },
  { phrase: 'Save', translation: 'Save', pronunciation: 'sayv', category: 'Tech', level: 1, icon: '💾' },
  { phrase: 'Delete', translation: 'Delete / Remove', pronunciation: 'di-LEET', category: 'Tech', level: 1, icon: '🗑️' },
  { phrase: 'Send', translation: 'Send', pronunciation: 'send', category: 'Tech', level: 1, icon: '📤' },
  { phrase: 'Download', translation: 'Download', pronunciation: 'DOWN-lohd', category: 'Tech', level: 1, icon: '📥' },
  { phrase: 'Upload', translation: 'Upload', pronunciation: 'UP-lohd', category: 'Tech', level: 1, icon: '📤' },
  { phrase: 'Online', translation: 'Online', pronunciation: 'ON-lyn', category: 'Tech', level: 1, icon: '🟢' },
  { phrase: 'Offline', translation: 'Offline', pronunciation: 'AWF-lyn', category: 'Tech', level: 1, icon: '⚪' },
  { phrase: 'Job', translation: 'Job / Work', pronunciation: 'job', category: 'Business', level: 1, icon: '💼' },
  { phrase: 'Office', translation: 'Office', pronunciation: 'AW-fis', category: 'Business', level: 1, icon: '🏢' },
  { phrase: 'Store', translation: 'Store / Shop', pronunciation: 'stor', category: 'Shopping', level: 1, icon: '🏪' },
  { phrase: 'Buy', translation: 'Buy / Purchase', pronunciation: 'by', category: 'Shopping', level: 1, icon: '🛍️' },
  { phrase: 'Sell', translation: 'Sell', pronunciation: 'sel', category: 'Shopping', level: 1, icon: '🏷️' },
  { phrase: 'Pay', translation: 'Pay / Payment', pronunciation: 'pay', category: 'Shopping', level: 1, icon: '💳' },
  { phrase: 'Receipt', translation: 'Receipt', pronunciation: 'ri-SEET', category: 'Shopping', level: 1, icon: '🧾' },
  { phrase: 'Support', translation: 'Customer Support / Help Desk', pronunciation: 'suh-PORT', category: 'Tech', level: 1, icon: '💁' },
  { phrase: 'Open', translation: 'Open', pronunciation: 'OH-puhn', category: 'Tech', level: 1, icon: '📂' },
  { phrase: 'Close', translation: 'Close', pronunciation: 'klohz', category: 'Tech', level: 1, icon: '✖️' },
  { phrase: 'Update', translation: 'Update / Refresh', pronunciation: 'up-DAYT', category: 'Tech', level: 1, icon: '🔄' },
  { phrase: 'Boss', translation: 'Boss / Supervisor', pronunciation: 'baws', category: 'Business', level: 2, icon: '👔' },
  { phrase: 'Colleague', translation: 'Colleague / Coworker', pronunciation: 'KOL-eeg', category: 'Business', level: 2, icon: '👥' },
  { phrase: 'Employee', translation: 'Employee / Worker', pronunciation: 'em-ploy-EE', category: 'Business', level: 2, icon: '🧑‍💼' },
  { phrase: 'Task', translation: 'Task / Assignment', pronunciation: 'task', category: 'Business', level: 2, icon: '✅' },
  { phrase: 'Report', translation: 'Report / Summary', pronunciation: 'ri-PORT', category: 'Business', level: 2, icon: '📑' },
  { phrase: 'Presentation', translation: 'Presentation', pronunciation: 'prez-en-TAY-shuhn', category: 'Business', level: 2, icon: '📽️' },
  { phrase: 'Signature', translation: 'Signature', pronunciation: 'SIG-nuh-chur', category: 'Business', level: 2, icon: '✍️' },
  { phrase: 'Vacation', translation: 'Vacation / Time off', pronunciation: 'vay-KAY-shuhn', category: 'Business', level: 2, icon: '🏖️' },
  { phrase: 'Resume', translation: 'Resume / CV', pronunciation: 'REZ-oo-may', category: 'Business', level: 2, icon: '📄' },
  { phrase: 'Interview', translation: 'Job interview', pronunciation: 'IN-ter-vyoo', category: 'Business', level: 2, icon: '👔' },
  { phrase: 'Goal', translation: 'Goal / Target', pronunciation: 'gohl', category: 'Business', level: 2, icon: '🎯' },
  { phrase: 'Product', translation: 'Product', pronunciation: 'PROD-uhkt', category: 'Business', level: 2, icon: '📦' },
  { phrase: 'Service', translation: 'Service', pronunciation: 'SUR-vis', category: 'Business', level: 2, icon: '🛠️' },
  { phrase: 'Transfer', translation: 'Bank transfer / Wire', pronunciation: 'TRANS-fur', category: 'Shopping', level: 2, icon: '💸' },
  { phrase: 'Refund', translation: 'Refund / Return', pronunciation: 'REE-fund', category: 'Shopping', level: 2, icon: '↩️' },
  { phrase: 'Shipping', translation: 'Shipping / Delivery', pronunciation: 'SHIP-ing', category: 'Shopping', level: 2, icon: '🚚' },
  { phrase: 'Package', translation: 'Package / Parcel', pronunciation: 'PAK-ij', category: 'Shopping', level: 2, icon: '📦' },
  { phrase: 'Software', translation: 'Software', pronunciation: 'SAWFT-wair', category: 'Tech', level: 3, icon: '💾' },
  { phrase: 'Hardware', translation: 'Hardware', pronunciation: 'HAHRD-wair', category: 'Tech', level: 3, icon: '🖥️' },
  { phrase: 'Database', translation: 'Database', pronunciation: 'DAY-tuh-bays', category: 'Tech', level: 3, icon: '🗄️' },
  { phrase: 'Server', translation: 'Server', pronunciation: 'SUR-ver', category: 'Tech', level: 3, icon: '🖥️' },
  { phrase: 'Cloud storage', translation: 'Cloud storage', pronunciation: 'klowd STOR-ij', category: 'Tech', level: 3, icon: '☁️' },
  { phrase: 'Artificial intelligence', translation: 'Artificial Intelligence (AI)', pronunciation: 'ahr-tuh-FISH-uhl in-TEL-i-juhns', category: 'Tech', level: 3, icon: '🤖' },
  { phrase: 'Algorithm', translation: 'Algorithm', pronunciation: 'AL-guh-rith-uhm', category: 'Tech', level: 3, icon: '📐' },
  { phrase: 'Developer', translation: 'Developer / Programmer', pronunciation: 'di-VEL-uh-per', category: 'Tech', level: 3, icon: '🧑‍💻' },
  { phrase: 'Cybersecurity', translation: 'Cybersecurity', pronunciation: 'SY-ber-se-kyoor-i-tee', category: 'Tech', level: 3, icon: '🛡️' },
  { phrase: 'Operating system', translation: 'Operating system', pronunciation: 'OP-uh-ray-ting SIS-tuhm', category: 'Tech', level: 3, icon: '⚙️' },
  { phrase: 'Budget', translation: 'Budget / Financial plan', pronunciation: 'BUHJ-it', category: 'Business', level: 3, icon: '💰' },
  { phrase: 'Investment', translation: 'Investment / Capital', pronunciation: 'in-VEST-muhnt', category: 'Business', level: 3, icon: '📈' },
  { phrase: 'Revenue', translation: 'Revenue / Turnover', pronunciation: 'REV-uh-noo', category: 'Business', level: 3, icon: '💵' },
  { phrase: 'Startup', translation: 'Startup company', pronunciation: 'STAHRT-up', category: 'Business', level: 3, icon: '🚀' },
  { phrase: 'Remote work', translation: 'Remote work / Telecommuting', pronunciation: 'ri-MOHT wurk', category: 'Business', level: 3, icon: '🏠' },
  // Batch 2: High-Yield Everyday Vocabulary & Parity (Levels 1 & 2)
  { phrase: 'Man', translation: 'Man', pronunciation: 'MAHN', category: 'People', level: 1, icon: '👨' },
  { phrase: 'Woman', translation: 'Woman', pronunciation: 'WUU-muhn', category: 'People', level: 1, icon: '👩' },
  { phrase: 'Boy', translation: 'Boy', pronunciation: 'BOHY', category: 'People', level: 1, icon: '👦' },
  { phrase: 'Girl', translation: 'Girl', pronunciation: 'GURL', category: 'People', level: 1, icon: '👧' },
  { phrase: 'Husband', translation: 'Husband', pronunciation: 'HUZ-buhnd', category: 'Family', level: 2, icon: '💍' },
  { phrase: 'Wife', translation: 'Wife', pronunciation: 'WYF', category: 'Family', level: 2, icon: '💍' },
  { phrase: 'Meat', translation: 'Meat', pronunciation: 'MEET', category: 'Food', level: 1, icon: '🥩' },
  { phrase: 'Vegetables', translation: 'Vegetables', pronunciation: 'VEJ-tuh-buhlz', category: 'Food', level: 1, icon: '🥦' },
  { phrase: 'Fruits', translation: 'Fruits', pronunciation: 'FROOTS', category: 'Food', level: 1, icon: '🍎' },
  { phrase: 'Rice', translation: 'Rice', pronunciation: 'RYS', category: 'Food', level: 1, icon: '🍚' },
  { phrase: 'Beer', translation: 'Beer', pronunciation: 'BEER', category: 'Food', level: 1, icon: '🍺' },
  { phrase: 'Wine', translation: 'Wine', pronunciation: 'WYN', category: 'Food', level: 1, icon: '🍷' },
  { phrase: 'Salt', translation: 'Salt', pronunciation: 'SAWLT', category: 'Food', level: 1, icon: '🧂' },
  { phrase: 'Cheese', translation: 'Cheese', pronunciation: 'CHEEZ', category: 'Food', level: 1, icon: '🧀' },
  { phrase: 'Street', translation: 'Street', pronunciation: 'STREET', category: 'Places', level: 1, icon: '🛣️' },
  { phrase: 'Park', translation: 'Park', pronunciation: 'PAHRK', category: 'Places', level: 1, icon: '🌳' },
  { phrase: 'Museum', translation: 'Museum', pronunciation: 'myoo-ZEE-uhm', category: 'Places', level: 2, icon: '🏛️' },
  { phrase: 'Theater', translation: 'Theater', pronunciation: 'THEE-uh-ter', category: 'Places', level: 2, icon: '🎭' },
  { phrase: 'Cinema', translation: 'Cinema', pronunciation: 'SIN-uh-muh', category: 'Places', level: 2, icon: '🎬' },
  { phrase: 'Center', translation: 'Center', pronunciation: 'SEN-ter', category: 'Places', level: 2, icon: '📍' },
  { phrase: 'Factory', translation: 'Factory', pronunciation: 'FAK-tuh-ree', category: 'Places', level: 2, icon: '🏭' },
  { phrase: 'Sea', translation: 'Sea', pronunciation: 'SEE', category: 'Places', level: 1, icon: '🌊' },
  { phrase: 'Bus', translation: 'Bus', pronunciation: 'BUHS', category: 'Travel', level: 1, icon: '🚌' },
  { phrase: 'Taxi', translation: 'Taxi', pronunciation: 'TAK-see', category: 'Travel', level: 1, icon: '🚕' },
  { phrase: 'Airplane', translation: 'Airplane', pronunciation: 'AIR-playn', category: 'Travel', level: 1, icon: '✈️' },
  { phrase: 'Boat', translation: 'Boat', pronunciation: 'BOHT', category: 'Travel', level: 1, icon: '⛵' },
  { phrase: 'Table', translation: 'Table', pronunciation: 'TAY-buhl', category: 'Home', level: 1, icon: '🪑' },
  { phrase: 'Chair', translation: 'Chair', pronunciation: 'CHAIR', category: 'Home', level: 1, icon: '🪑' },
  { phrase: 'Door', translation: 'Door', pronunciation: 'DOR', category: 'Home', level: 1, icon: '🚪' },
  { phrase: 'Window', translation: 'Window', pronunciation: 'WIN-doh', category: 'Home', level: 1, icon: '🪟' },
  { phrase: 'Bag', translation: 'Bag', pronunciation: 'BAG', category: 'Home', level: 1, icon: '👜' },
  { phrase: 'Clothes', translation: 'Clothes', pronunciation: 'KLOHZ', category: 'Home', level: 1, icon: '👕' },
  { phrase: 'Shoes', translation: 'Shoes', pronunciation: 'SHOOZ', category: 'Home', level: 1, icon: '👟' },
  { phrase: 'Magazine', translation: 'Magazine', pronunciation: 'mag-uh-ZEEN', category: 'Home', level: 2, icon: '📰' },
  { phrase: 'Photo', translation: 'Photo', pronunciation: 'FOH-toh', category: 'Home', level: 1, icon: '📷' },
  { phrase: 'Card', translation: 'Card', pronunciation: 'KAHRD', category: 'Shopping', level: 1, icon: '💳' },
  { phrase: 'Bird', translation: 'Bird', pronunciation: 'BURD', category: 'Nature', level: 1, icon: '🐦' },
  { phrase: 'Moon', translation: 'Moon', pronunciation: 'MOON', category: 'Nature', level: 1, icon: '🌙' },
  { phrase: 'Star', translation: 'Star', pronunciation: 'STAHR', category: 'Nature', level: 1, icon: '⭐' },
  { phrase: 'Flower', translation: 'Flower', pronunciation: 'FLOW-er', category: 'Nature', level: 1, icon: '🌸' },
  { phrase: 'Tree', translation: 'Tree', pronunciation: 'TREE', category: 'Nature', level: 1, icon: '🌲' },
  { phrase: 'Bad', translation: 'Bad', pronunciation: 'BAD', category: 'Descriptions', level: 1, icon: '👎' },
  { phrase: 'Fast / Quick', translation: 'Fast / Quick', pronunciation: 'FAST / KWIK', category: 'Descriptions', level: 1, icon: '⚡' },
  { phrase: 'Slow', translation: 'Slow', pronunciation: 'SLOH', category: 'Descriptions', level: 1, icon: '🐢' },
  { phrase: 'Happy', translation: 'Happy', pronunciation: 'HAP-ee', category: 'Descriptions', level: 1, icon: '😊' },
  { phrase: 'Ready', translation: 'Ready', pronunciation: 'RED-ee', category: 'Descriptions', level: 1, icon: '✅' },
  { phrase: 'Closed', translation: 'Closed', pronunciation: 'KLOHZD', category: 'Descriptions', level: 1, icon: '🔴' },
  // Batch 3: Calendar, Family, Body, Kitchen & Everyday Life
  { phrase: 'Monday', translation: 'Monday', pronunciation: 'MUHN-day', category: 'Calendar', level: 1, icon: '📅' },
  { phrase: 'Tuesday', translation: 'Tuesday', pronunciation: 'TOOZ-day', category: 'Calendar', level: 1, icon: '📅' },
  { phrase: 'Wednesday', translation: 'Wednesday', pronunciation: 'WENZ-day', category: 'Calendar', level: 1, icon: '📅' },
  { phrase: 'Thursday', translation: 'Thursday', pronunciation: 'THURZ-day', category: 'Calendar', level: 1, icon: '📅' },
  { phrase: 'Friday', translation: 'Friday', pronunciation: 'FRY-day', category: 'Calendar', level: 1, icon: '📅' },
  { phrase: 'Saturday', translation: 'Saturday', pronunciation: 'SAT-er-day', category: 'Calendar', level: 1, icon: '📅' },
  { phrase: 'Sunday', translation: 'Sunday', pronunciation: 'SUHN-day', category: 'Calendar', level: 1, icon: '📅' },
  { phrase: 'Week', translation: 'Week', pronunciation: 'WEEK', category: 'Calendar', level: 1, icon: '🗓️' },
  { phrase: 'Month', translation: 'Month', pronunciation: 'MUHNTH', category: 'Calendar', level: 1, icon: '📆' },
  { phrase: 'Year', translation: 'Year', pronunciation: 'YEER', category: 'Calendar', level: 1, icon: '🎆' },
  { phrase: 'Brother', translation: 'Brother', pronunciation: 'BRUH-dher', category: 'Family', level: 1, icon: '👦' },
  { phrase: 'Sister', translation: 'Sister', pronunciation: 'SIS-ter', category: 'Family', level: 1, icon: '👧' },
  { phrase: 'Eye', translation: 'Eye', pronunciation: 'EYE', category: 'Health', level: 1, icon: '👁️' },
  { phrase: 'Eyes', translation: 'Eyes', pronunciation: 'EYEZ', category: 'Health', level: 1, icon: '👀' },
  { phrase: 'Nose', translation: 'Nose', pronunciation: 'NOHZ', category: 'Health', level: 1, icon: '👃' },
  { phrase: 'Cheek', translation: 'Cheek', pronunciation: 'CHEEK', category: 'Health', level: 1, icon: '😊' },
  { phrase: 'Heart', translation: 'Heart', pronunciation: 'HAHRT', category: 'Health', level: 1, icon: '❤️' },
  { phrase: 'Cup', translation: 'Cup', pronunciation: 'KUHP', category: 'Food', level: 1, icon: '☕' },
  { phrase: 'Glass (cup)', translation: 'Glass (cup)', pronunciation: 'GLAS', category: 'Food', level: 1, icon: '🥛' },
  { phrase: 'Kettle', translation: 'Kettle', pronunciation: 'KET-uhl', category: 'Food', level: 1, icon: '🫖' },
  { phrase: 'Oil', translation: 'Oil', pronunciation: 'OYL', category: 'Food', level: 1, icon: '🫒' },
  { phrase: 'Lemon', translation: 'Lemon', pronunciation: 'LEM-uhn', category: 'Food', level: 1, icon: '🍋' },
  { phrase: 'Yogurt', translation: 'Yogurt', pronunciation: 'YOH-gert', category: 'Food', level: 1, icon: '🥣' },
  { phrase: 'Hedgehog', translation: 'Hedgehog', pronunciation: 'HEJ-hog', category: 'Weather', level: 2, icon: '🦔' },
  { phrase: 'Beetle / Bug', translation: 'Beetle / Bug', pronunciation: 'BEE-tuhl', category: 'Weather', level: 2, icon: '🪲' },
  { phrase: 'Zebra', translation: 'Zebra', pronunciation: 'ZEE-bruh', category: 'Weather', level: 2, icon: '🦓' },
  { phrase: 'Idea', translation: 'Idea', pronunciation: 'eye-DEE-uh', category: 'Essentials', level: 1, icon: '💡' },
  { phrase: 'Question', translation: 'Question', pronunciation: 'KWES-chuhn', category: 'Essentials', level: 1, icon: '❓' },
  { phrase: 'Success', translation: 'Success', pronunciation: 'suhk-SES', category: 'Essentials', level: 2, icon: '🏆' },
  { phrase: 'Love', translation: 'Love', pronunciation: 'LUHV', category: 'Essentials', level: 1, icon: '❤️' },
  { phrase: 'Island', translation: 'Island', pronunciation: 'EYE-luhnd', category: 'Travel', level: 1, icon: '🏝️' },
  { phrase: 'Big / Large', translation: 'Big / Large', pronunciation: 'BIG', category: 'Descriptions', level: 1, icon: '🐘' },
  { phrase: 'Small / Little', translation: 'Small / Little', pronunciation: 'SMAWL', category: 'Descriptions', level: 1, icon: '🐭' },
  // Batch 4: Foundational Verbs, Questions, City, Travel, Adjectives & Parity
  { phrase: 'Who', translation: 'Who', pronunciation: 'HOO', category: 'Questions', level: 1, icon: '❓' },
  { phrase: 'What', translation: 'What', pronunciation: 'WAHT', category: 'Questions', level: 1, icon: '❓' },
  { phrase: 'Where', translation: 'Where', pronunciation: 'WEHR', category: 'Questions', level: 1, icon: '📍' },
  { phrase: 'When', translation: 'When', pronunciation: 'WEN', category: 'Questions', level: 1, icon: '🕒' },
  { phrase: 'Why', translation: 'Why', pronunciation: 'WY', category: 'Questions', level: 1, icon: '💡' },
  { phrase: 'How', translation: 'How', pronunciation: 'HOW', category: 'Questions', level: 1, icon: '⚙️' },
  { phrase: 'How much', translation: 'How much / How many', pronunciation: 'HOW MUCH', category: 'Questions', level: 1, icon: '💰' },
  { phrase: 'Country', translation: 'Country', pronunciation: 'KUHN-tree', category: 'Places', level: 1, icon: '🌍' },
  { phrase: 'Car', translation: 'Car', pronunciation: 'KAHR', category: 'Travel', level: 1, icon: '🚗' },
  { phrase: 'Train', translation: 'Train', pronunciation: 'TRAYN', category: 'Travel', level: 1, icon: '🚆' },
  { phrase: 'Subway', translation: 'Subway / Metro', pronunciation: 'SUHB-way', category: 'Travel', level: 1, icon: '🚇' },
  { phrase: 'Square', translation: 'Square / Plaza', pronunciation: 'SKWEHR', category: 'Places', level: 1, icon: '🏛️' },
  { phrase: 'Post office', translation: 'Post office', pronunciation: 'POHST OFF-iss', category: 'Places', level: 1, icon: '🏤' },
  { phrase: 'Police', translation: 'Police', pronunciation: 'puh-LEES', category: 'Places', level: 1, icon: '👮' },
  { phrase: 'Train station', translation: 'Train station', pronunciation: 'TRAYN STAY-shuhn', category: 'Travel', level: 1, icon: '🚉' },
  { phrase: 'We', translation: 'We', pronunciation: 'WEE', category: 'People', level: 1, icon: '👥' },
  { phrase: 'Visa', translation: 'Visa', pronunciation: 'VEE-zuh', category: 'Travel', level: 1, icon: '🛂' },
  { phrase: 'Telephone', translation: 'Telephone', pronunciation: 'TEL-uh-fohn', category: 'Tech', level: 1, icon: '☎️' },
  { phrase: 'Help', translation: 'Help', pronunciation: 'HELP', category: 'Essentials', level: 1, icon: '🆘' },
  { phrase: 'Shoe', translation: 'Shoe / Shoes', pronunciation: 'SHOO', category: 'Essentials', level: 1, icon: '👞' },
  { phrase: 'Fruit', translation: 'Fruit', pronunciation: 'FROOT', category: 'Food', level: 1, icon: '🍎' },
  { phrase: 'Clock', translation: 'Clock / Watch', pronunciation: 'KLOK', category: 'Essentials', level: 1, icon: '⏰' },
  { phrase: 'Grape', translation: 'Grape', pronunciation: 'GRAYP', category: 'Food', level: 1, icon: '🍇' },
  { phrase: 'Beetle', translation: 'Beetle / Bug', pronunciation: 'BEE-tuhl', category: 'Nature', level: 2, icon: '🪲' },
  { phrase: 'Xylophone', translation: 'Xylophone', pronunciation: 'ZY-luh-fohn', category: 'Essentials', level: 2, icon: '🎵' },
  { phrase: 'Hour', translation: 'Hour', pronunciation: 'OW-er', category: 'Time', level: 1, icon: '⏳' },
  { phrase: 'Minute', translation: 'Minute', pronunciation: 'MIN-it', category: 'Time', level: 1, icon: '⏱️' },
  { phrase: 'Second', translation: 'Second', pronunciation: 'SEK-uhnd', category: 'Time', level: 1, icon: '⚡' },
  { phrase: 'Early', translation: 'Early', pronunciation: 'UR-lee', category: 'Time', level: 1, icon: '🌅' },
  { phrase: 'Late', translation: 'Late', pronunciation: 'LAYT', category: 'Time', level: 1, icon: '🌙' },
  { phrase: 'Now', translation: 'Now', pronunciation: 'NOW', category: 'Time', level: 1, icon: '⏰' },
  { phrase: 'Fast', translation: 'Fast', pronunciation: 'FAST', category: 'Descriptions', level: 1, icon: '🚀' },
  { phrase: 'Purple', translation: 'Purple', pronunciation: 'PUR-puhl', category: 'Colors', level: 1, icon: '🟣' },
  { phrase: 'Pink', translation: 'Pink', pronunciation: 'PINGK', category: 'Colors', level: 1, icon: '🌸' },
  { phrase: 'Gray', translation: 'Gray', pronunciation: 'GRAY', category: 'Colors', level: 1, icon: '🔘' },
  { phrase: 'To come', translation: 'To come', pronunciation: 'too KUHM', category: 'Verbs', level: 1, icon: '🚶‍♂️' },
  { phrase: 'To know', translation: 'To know', pronunciation: 'too NOH', category: 'Verbs', level: 1, icon: '🧠' },
  { phrase: 'To buy', translation: 'To buy', pronunciation: 'too BY', category: 'Verbs', level: 1, icon: '🛍️' },
  { phrase: 'To help', translation: 'To help', pronunciation: 'too HELP', category: 'Verbs', level: 1, icon: '🤝' },
  { phrase: 'To work', translation: 'To work', pronunciation: 'too WURK', category: 'Verbs', level: 1, icon: '💼' },
  { phrase: 'To want', translation: 'To want', pronunciation: 'too WAHNT', category: 'Verbs', level: 1, icon: '💭' },
  // Batch 5: Core Everyday Vocabulary Expansion to 500+
  { phrase: 'Father / Dad', translation: 'Father / Dad', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Mother / Mom', translation: 'Mother / Mom', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Mom', translation: 'Mom', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Store / Shop', translation: 'Store / Shop', category: 'Shopping', level: 1, icon: '🛍️' },
  { phrase: 'Square (plaza)', translation: 'Square (plaza)', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Home / House', translation: 'Home / House', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Subway / Metro', translation: 'Subway / Metro', category: 'Places', level: 1, icon: '📍' },
  { phrase: 'Time', translation: 'Time', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Work / Job', translation: 'Work / Job', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'Object', translation: 'Object', category: 'General', level: 1, icon: '✨' },
  { phrase: 'How much / How many', translation: 'How much / How many', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Christmas tree', translation: 'Christmas tree', category: 'Nature', level: 1, icon: '🌿' },
  { phrase: 'Day', translation: 'Day', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Kilogram', translation: 'Kilogram', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Night', translation: 'Night', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Watch / Clock', translation: 'Watch / Clock', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Web', translation: 'Web', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Yolk', translation: 'Yolk', category: 'Food', level: 1, icon: '🍽️' },
  { phrase: 'Wagon / Car', translation: 'Wagon / Car', category: 'Places', level: 1, icon: '📍' },
  { phrase: 'Example', translation: 'Example', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Dad', translation: 'Dad', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Morning', translation: 'Morning', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Afternoon', translation: 'Afternoon', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Evening', translation: 'Evening', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Czar / King', translation: 'Czar / King', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Borscht', translation: 'Borscht', category: 'Food', level: 1, icon: '🍽️' },
  { phrase: 'South', translation: 'South', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Source', translation: 'Source', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Or', translation: 'Or', category: 'General', level: 1, icon: '✨' },
  { phrase: 'This', translation: 'This', category: 'General', level: 1, icon: '✨' },
  { phrase: 'I eat', translation: 'I eat', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'Maybe', translation: 'Maybe', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Today', translation: 'Today', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Tomorrow', translation: 'Tomorrow', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Yesterday', translation: 'Yesterday', category: 'General', level: 1, icon: '✨' },
  { phrase: 'To need', translation: 'To need', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'Hello (informal)', translation: 'Hello (informal)', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Good night', translation: 'Good night', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'I am fine, thank you', translation: 'I am fine, thank you', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Very well, thank you', translation: 'Very well, thank you', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Good / Well', translation: 'Good / Well', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'Bad / Poorly', translation: 'Bad / Poorly', category: 'General', level: 1, icon: '✨' },
  { phrase: 'And you?', translation: 'And you?', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Thank you', translation: 'Thank you', category: 'General', level: 1, icon: '✨' },
  { phrase: 'You\'re welcome', translation: 'You\'re welcome', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'Where are you from?', translation: 'Where are you from?', category: 'General', level: 1, icon: '✨' },
  { phrase: 'I am from...', translation: 'I am from...', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Bye (informal)', translation: 'Bye (informal)', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Have a nice day', translation: 'Have a nice day', category: 'General', level: 1, icon: '✨' },
  { phrase: 'I understand', translation: 'I understand', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'I don\'t understand', translation: 'I don\'t understand', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'Can you repeat, please?', translation: 'Can you repeat, please?', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'Please repeat', translation: 'Please repeat', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'Please speak more slowly', translation: 'Please speak more slowly', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'Can you speak more slowly?', translation: 'Can you speak more slowly?', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'Speak more slowly', translation: 'Speak more slowly', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'I speak a little Russian', translation: 'I speak a little Russian', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'What does this mean?', translation: 'What does this mean?', category: 'General', level: 1, icon: '✨' },
  { phrase: 'How do you say...?', translation: 'How do you say...?', category: 'General', level: 1, icon: '✨' },
  { phrase: 'How do you say this in Russian?', translation: 'How do you say this in Russian?', category: 'General', level: 1, icon: '✨' },
  { phrase: 'I need help', translation: 'I need help', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'Help me', translation: 'Help me', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'Where is the bathroom?', translation: 'Where is the bathroom?', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Where is the airport?', translation: 'Where is the airport?', category: 'Places', level: 1, icon: '📍' },
  { phrase: 'I would like to go to the airport', translation: 'I would like to go to the airport', category: 'Places', level: 1, icon: '📍' },
  { phrase: 'What time is the departure?', translation: 'What time is the departure?', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Where is the hotel?', translation: 'Where is the hotel?', category: 'Places', level: 1, icon: '📍' },
  { phrase: 'How much is a ticket?', translation: 'How much is a ticket?', category: 'Places', level: 1, icon: '📍' },
  { phrase: 'Turn left', translation: 'Turn left', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Turn right', translation: 'Turn right', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Go straight ahead', translation: 'Go straight ahead', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'Can I see the menu, please?', translation: 'Can I see the menu, please?', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'I would like water', translation: 'I would like water', category: 'Food', level: 1, icon: '🍽️' },
  { phrase: 'I want to eat', translation: 'I want to eat', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'I want to drink', translation: 'I want to drink', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'What do you recommend?', translation: 'What do you recommend?', category: 'General', level: 1, icon: '✨' },
  { phrase: 'This is delicious!', translation: 'This is delicious!', category: 'General', level: 1, icon: '✨' },
  { phrase: 'The check, please', translation: 'The check, please', category: 'General', level: 1, icon: '✨' },
  { phrase: 'How much does it cost?', translation: 'How much does it cost?', category: 'Shopping', level: 1, icon: '🛍️' },
  { phrase: 'Can I pay by card?', translation: 'Can I pay by card?', category: 'Places', level: 1, icon: '📍' },
  { phrase: 'I am just looking', translation: 'I am just looking', category: 'General', level: 1, icon: '✨' },
  { phrase: 'I am just looking, thank you', translation: 'I am just looking, thank you', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Do you have this in another size?', translation: 'Do you have this in another size?', category: 'General', level: 1, icon: '✨' },
  { phrase: 'I don\'t feel well', translation: 'I don\'t feel well', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Call the police', translation: 'Call the police', category: 'General', level: 1, icon: '✨' },
  { phrase: 'I lost my passport', translation: 'I lost my passport', category: 'General', level: 1, icon: '✨' },
  { phrase: 'What time is it now?', translation: 'What time is it now?', category: 'General', level: 1, icon: '✨' },
  { phrase: 'At what time?', translation: 'At what time?', category: 'General', level: 1, icon: '✨' },
  { phrase: 'One o\'clock (1:00)', translation: 'One o\'clock (1:00)', category: 'General', level: 1, icon: '✨' },
  { phrase: 'It is 1:00 sharp', translation: 'It is 1:00 sharp', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Two o\'clock (2:00)', translation: 'Two o\'clock (2:00)', category: 'General', level: 1, icon: '✨' },
  { phrase: 'It is 2:00', translation: 'It is 2:00', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Three o\'clock (3:00)', translation: 'Three o\'clock (3:00)', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Exactly three o\'clock (3:00)', translation: 'Exactly three o\'clock (3:00)', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Four o\'clock (4:00)', translation: 'Four o\'clock (4:00)', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Five o\'clock (5:00)', translation: 'Five o\'clock (5:00)', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Six o\'clock (6:00)', translation: 'Six o\'clock (6:00)', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Seven o\'clock (7:00)', translation: 'Seven o\'clock (7:00)', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Eight o\'clock (8:00)', translation: 'Eight o\'clock (8:00)', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Nine o\'clock (9:00)', translation: 'Nine o\'clock (9:00)', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Ten o\'clock (10:00)', translation: 'Ten o\'clock (10:00)', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Eleven o\'clock (11:00)', translation: 'Eleven o\'clock (11:00)', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Twelve o\'clock (12:00)', translation: 'Twelve o\'clock (12:00)', category: 'General', level: 1, icon: '✨' },
  { phrase: '3:30 (half past three)', translation: '3:30 (half past three)', category: 'General', level: 1, icon: '✨' },
  { phrase: '4:15 (quarter past four)', translation: '4:15 (quarter past four)', category: 'General', level: 1, icon: '✨' },
  { phrase: '4:45 (quarter to five)', translation: '4:45 (quarter to five)', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'Half past twelve (12:30)', translation: 'Half past twelve (12:30)', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Ten to two (1:50)', translation: 'Ten to two (1:50)', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'Half an hour', translation: 'Half an hour', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Quarter of an hour', translation: 'Quarter of an hour', category: 'General', level: 1, icon: '✨' },
  { phrase: 'In the morning (a.m.)', translation: 'In the morning (a.m.)', category: 'General', level: 1, icon: '✨' },
  { phrase: 'In the afternoon (p.m.)', translation: 'In the afternoon (p.m.)', category: 'General', level: 1, icon: '✨' },
  { phrase: 'At night', translation: 'At night', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Noon / Midday', translation: 'Noon / Midday', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Midnight', translation: 'Midnight', category: 'General', level: 1, icon: '✨' },
  { phrase: 'On time', translation: 'On time', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Hello! / Hi!', translation: 'Hello! / Hi!', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Hello / Good morning', translation: 'Hello / Good morning', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'Hi / Bye', translation: 'Hi / Bye', category: 'General', level: 1, icon: '✨' },
  { phrase: 'How are you? (formal)', translation: 'How are you? (formal)', category: 'General', level: 1, icon: '✨' },
  { phrase: 'I am doing well, thank you', translation: 'I am doing well, thank you', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Where are the restrooms?', translation: 'Where are the restrooms?', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Can you repeat?', translation: 'Can you repeat?', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'Time / Weather', translation: 'Time / Weather', category: 'Verbs', level: 1, icon: '⚡' },
  { phrase: 'Tomorrow / Morning', translation: 'Tomorrow / Morning', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Office / Desk', translation: 'Office / Desk', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Boy / Child', translation: 'Boy / Child', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Let me share my screen', translation: 'Let me share my screen', category: 'Tech', level: 1, icon: '💻' },
  { phrase: 'The internet connection is slow', translation: 'The internet connection is slow', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Can you send it by email?', translation: 'Can you send it by email?', category: 'Tech', level: 1, icon: '💻' },
  { phrase: 'My battery is almost dead', translation: 'My battery is almost dead', category: 'General', level: 1, icon: '✨' },
  { phrase: 'Let\'s schedule a meeting', translation: 'Let\'s schedule a meeting', category: 'General', level: 1, icon: '✨' },
];

export const englishData: AppData = {
  alphabet,
  basicPhrases,
  numbers,
  commonWords
};

export default englishData;
