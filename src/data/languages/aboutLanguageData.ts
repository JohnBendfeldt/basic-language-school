import { SupportedLanguageId } from './types';

export interface FactItem {
  label: string;
  value: string;
  icon?: string;
}

export interface TimelineMilestone {
  era: string;
  title: string;
  description: string;
  highlight?: string;
}

export interface ScriptComparisonItem {
  traditional: string;
  simplified: string;
  pinyin: string;
  meaning: string;
  traditionalStrokes: number;
  simplifiedStrokes: number;
  reason: string;
}

export interface LinguisticTrait {
  title: string;
  description: string;
  icon?: string;
  example?: string;
}

export interface LanguageProfile {
  id: SupportedLanguageId;
  englishName: string;
  nativeName: string;
  title: string;
  tagline: string;
  speakersCount: string;
  writingSystem: string;
  languageFamily: string;
  facts: FactItem[];
  historyTimeline: TimelineMilestone[];
  scriptComparison?: ScriptComparisonItem[];
  linguisticTraits: LinguisticTrait[];
  culturalNote: string;
}

export const ABOUT_LANGUAGES: Record<SupportedLanguageId, LanguageProfile> = {
  zh: {
    id: 'zh',
    englishName: 'Mandarin Chinese',
    nativeName: '普通话 (Pǔtōnghuà) · 汉语 (Hànyǔ)',
    title: 'The Story of Mandarin & Simplified Chinese',
    tagline: 'From 3,000-year-old oracle bones to the 1950s literacy revolution and the birth of Pinyin.',
    speakersCount: '1.1+ Billion Native Speakers',
    writingSystem: 'Simplified Chinese Characters (简体字) & Hanyu Pinyin (汉语拼音)',
    languageFamily: 'Sino-Tibetan',
    facts: [
      { label: 'Native Speakers', value: '1.1 Billion (World #1)', icon: '👥' },
      { label: 'Official Script', value: 'Simplified Characters (简体字)', icon: '✍️' },
      { label: 'Phonetic Bridge', value: 'Hanyu Pinyin (Adopted 1958)', icon: '🔤' },
      { label: 'Standard Dialect', value: 'Beijing Phonology', icon: '📍' },
      { label: 'Verb Conjugation', value: 'Zero (No past/future forms)', icon: '✨' },
      { label: 'UN Official Language', value: 'Since 1946', icon: '🌐' }
    ],
    historyTimeline: [
      {
        era: 'c. 1200 BCE',
        title: 'Oracle Bone Script (甲骨文 · Jiǎgǔwén)',
        description: 'The earliest known Chinese writing carved into turtle shells and ox scapulae during the Shang Dynasty for divination. Characters were direct pictorial representations of natural elements like the sun (日) and water (水).',
        highlight: 'Birth of written Chinese'
      },
      {
        era: '221 BCE',
        title: 'Imperial Script Unification (秦始皇 · Small Seal Script)',
        description: 'The First Emperor of China, Qin Shi Huang, unified hundreds of regional script variations into a single national Small Seal and Clerical script, ensuring that decrees could be read identically across all provinces regardless of spoken dialect.',
        highlight: 'Unification of China'
      },
      {
        era: 'c. 200 CE – 1950s',
        title: 'Traditional Regular Script (繁体楷书 · Fántǐ Kǎishū)',
        description: 'For nearly 1,800 years, Traditional Chinese remained the gold standard of literary, administrative, and poetic expression. However, complex characters with 20 to 30 strokes per character created immense educational hurdles for ordinary working people.',
        highlight: 'Classical literature era'
      },
      {
        era: '1949 – 1956',
        title: 'The Literacy Crisis & Simplified Characters (简体字)',
        description: 'In 1949, China faced an illiteracy rate exceeding 80%. To rapidly democratize education, the government launched the Scheme for Simplifying Chinese Characters (汉字简化方案). Over 2,200 complex characters were systematically streamlined using centuries-old cursive shorthand and reduced stroke counts.',
        highlight: 'National literacy jumped from 20% to 96%+'
      },
      {
        era: '1958',
        title: 'Zhou Youguang & The Invention of Pinyin (汉语拼音)',
        description: 'Economist and linguist Zhou Youguang led the Committee for the Reform of the Chinese Written Language to design Hanyu Pinyin. Using the Latin alphabet, Pinyin provided an accessible phonetic bridge that modern computer keyboards and smartphones rely on today.',
        highlight: 'Zhou Youguang lived to 111 (1906–2017)'
      }
    ],
    scriptComparison: [
      {
        traditional: '國',
        simplified: '国',
        pinyin: 'guó',
        meaning: 'Country / Nation',
        traditionalStrokes: 11,
        simplifiedStrokes: 8,
        reason: 'Replaced complex interior weapon radical with the jade symbol (玉), symbolizing a treasure protected within national borders (囗).'
      },
      {
        traditional: '學',
        simplified: '学',
        pinyin: 'xué',
        meaning: 'Study / Learn',
        traditionalStrokes: 16,
        simplifiedStrokes: 8,
        reason: 'Reduced the 16-stroke scholarly roof to a streamlined 8-stroke cursive shorthand that had been used informally for centuries.'
      },
      {
        traditional: '愛',
        simplified: '爱',
        pinyin: 'ài',
        meaning: 'Love',
        traditionalStrokes: 13,
        simplifiedStrokes: 10,
        reason: 'Replaced the complex middle heart radical (心) with friend/harmony (友) shorthand to make writing fluid and rapid.'
      },
      {
        traditional: '門',
        simplified: '门',
        pinyin: 'mén',
        meaning: 'Door / Gate',
        traditionalStrokes: 8,
        simplifiedStrokes: 3,
        reason: 'Streamlined two swinging door panels into a 3-stroke open doorway contour.'
      },
      {
        traditional: '馬',
        simplified: '马',
        pinyin: 'mǎ',
        meaning: 'Horse',
        traditionalStrokes: 10,
        simplifiedStrokes: 3,
        reason: 'Turned the mane, legs, and tail into 3 continuous cursive brush strokes.'
      }
    ],
    linguisticTraits: [
      {
        title: 'No Verb Conjugation',
        description: 'Unlike Spanish or French with dozens of verb endings, Chinese verbs never change! "To eat" (吃 chī) is identical for I eat, you eat, we ate, or they will eat. Tense is communicated simply with time markers (yesterday, tomorrow) or aspect particles (了 le).',
        icon: '⚡',
        example: '我吃 (I eat) · 昨天我吃 (Yesterday I ate)'
      },
      {
        title: 'No Grammatical Gender or Plural Endings',
        description: 'There are no masculine/feminine articles (el/la, der/die/das) and nouns do not change for plurals. One apple is 一个苹果, and five apples is 五个苹果.',
        icon: '🍎',
        example: '苹果 (Apple) is always 苹果, singular or plural.'
      },
      {
        title: 'Measure Words (Classifiers)',
        description: 'Whenever you count objects in Mandarin, a specific classifier links the number to the noun based on its shape or category (e.g. 本 běn for books, 辆 liàng for vehicles, 张 zhāng for flat sheets).',
        icon: '📏',
        example: '一本书 (One book) · 一辆车 (One car)'
      },
      {
        title: 'Tonal Language (4 Tones)',
        description: 'Mandarin uses 4 distinct pitch contours (high flat, rising, dipping, falling) plus a neutral tone. A change in pitch completely alters the character and meaning of the syllable.',
        icon: '🎵',
        example: 'mā (Mother 妈) vs mǎ (Horse 马)'
      }
    ],
    culturalNote: 'Today, Simplified Chinese is the standard across Mainland China, Singapore, and international bodies like the UN, while Traditional Chinese continues to be cherished in Taiwan, Hong Kong, Macau, and classical calligraphy.'
  },

  ko: {
    id: 'ko',
    englishName: 'Korean',
    nativeName: '한국어 (Hangugeo) · 한글 (Hangul)',
    title: 'The Miracle of Hangul: A King’s Gift of Literacy',
    tagline: 'In 1443, King Sejong created one of the world’s most scientifically designed alphabets.',
    speakersCount: '80+ Million Native Speakers',
    writingSystem: 'Hangul (한글) — Featural Phonetic Alphabet',
    languageFamily: 'Koreanic (Language Isolate)',
    facts: [
      { label: 'Inventor', value: 'King Sejong the Great (1443)', icon: '👑' },
      { label: 'Alphabet System', value: '24 Core Letters (Consonants & Vowels)', icon: '🔤' },
      { label: 'Scientific Design', value: 'Letter shapes mimic mouth & tongue', icon: '👅' },
      { label: 'National Holiday', value: 'Hangul Day (October 9)', icon: '🎉' },
      { label: 'Word Order', value: 'SOV (Subject-Object-Verb)', icon: '🧱' },
      { label: 'Honorifics', value: 'Politeness levels baked into grammar', icon: '🙇' }
    ],
    historyTimeline: [
      {
        era: 'Before 1443',
        title: 'The Burden of Hanja (Chinese Characters)',
        description: 'Koreans had no native writing system and wrote using complex Chinese characters (Hanja). Because Chinese and Korean belong to completely different language families, only wealthy aristocratic elites (Yangban) had the decades required to achieve literacy.',
        highlight: 'Commoners could not read laws or write letters'
      },
      {
        era: '1443 – 1446',
        title: 'King Sejong Promulgates the Hunminjeongeum',
        description: 'Determined to empower ordinary citizens, King Sejong secretly developed Hangul with royal scholars. In 1446, he published the Hunminjeongeum ("The Proper Sounds for the Education of the People"), declaring that writing should be as easy as breathing.',
        highlight: '"A wise man can learn it in a morning; a fool in ten days."'
      },
      {
        era: '20th Century',
        title: 'Democratization & The Hallyu Wave',
        description: 'Despite historical resistance from traditional elites, Hangul triumphed in the modern era, propelling South Korea to one of the highest national literacy rates in the world (99%) and powering global cultural exports (K-Pop, K-Drama).',
        highlight: 'UNESCO King Sejong Literacy Prize established in 1989'
      }
    ],
    linguisticTraits: [
      {
        title: 'Featural Script (Mouth & Tongue Mimicry)',
        description: 'Hangul letters are not arbitrary: ㄱ mimics the tongue blocking the throat, ㄴ mimics the tongue touching the upper gums, and ㅁ mimics the shape of the lips.',
        icon: '👅',
        example: 'ㅁ (m) shows closed lips; ㅂ (b) adds lines for aspiration.'
      },
      {
        title: 'Syllabic Block Architecture',
        description: 'Letters are stacked into square syllable blocks rather than written in a linear horizontal row. For example, h (ㅎ) + a (ㅏ) + n (ㄴ) stack into "한" (han).',
        icon: '🧱',
        example: 'ㅎ + ㅏ + ㄴ = 한 (Han)'
      },
      {
        title: 'Subject-Object-Verb (SOV) Word Order',
        description: 'In Korean, the verb always comes at the very end of the sentence. "I eat an apple" is structured as "I apple eat" (저는 사과를 먹어요).',
        icon: '🔄',
        example: '저는 (I) + 사과를 (Apple) + 먹어요 (Eat)'
      }
    ],
    culturalNote: 'Hangul Day is celebrated as a national public holiday in South Korea every October 9th to honor the royal creation of linguistic freedom.'
  },

  ja: {
    id: 'ja',
    englishName: 'Japanese',
    nativeName: '日本語 (Nihongo)',
    title: 'The Harmony of Three Scripts (漢字 · ひらがな · カタカナ)',
    tagline: 'An elegant linguistic symphony combining Chinese ideographs with two native phonetic syllabaries.',
    speakersCount: '125+ Million Native Speakers',
    writingSystem: 'Kanji (漢字), Hiragana (ひらがな), and Katakana (カタカナ)',
    languageFamily: 'Japonic',
    facts: [
      { label: 'Scripts in Use', value: '3 Interlocking Writing Systems', icon: '✍️' },
      { label: 'Joyo Kanji', value: '2,136 Characters Taught in Schools', icon: '📚' },
      { label: 'Word Order', value: 'SOV (Verb always comes last)', icon: '🔄' },
      { label: 'Tone System', value: 'Pitch Accent (High/Low)', icon: '🎵' },
      { label: 'Loanwords', value: 'Written in Katakana (e.g. コーヒー)', icon: '☕' },
      { label: 'Particles', value: 'Grammatical markers (は, が, を, に)', icon: '🏷️' }
    ],
    historyTimeline: [
      {
        era: '5th Century',
        title: 'Kanji Arrives from the Asian Continent',
        description: 'Before contact with China, Japanese was purely a spoken language. Chinese characters (Kanji) were adopted to write Japanese names, laws, and Buddhist sutras.',
        highlight: 'Adaptation of Chinese logograms'
      },
      {
        era: '8th – 10th Century',
        title: 'The Invention of Hiragana & Women’s Literature',
        description: 'Court women simplified cursive Kanji into flowing phonetic syllables called Hiragana ("women’s hand"). This unleashed world-renowned Japanese literary masterpieces, including Lady Murasaki Shikibu’s The Tale of Genji.',
        highlight: 'Birth of native phonetic writing'
      },
      {
        era: 'Modern Era',
        title: 'Katakana & Global Vocabulary Integration',
        description: 'Katakana, originally created by Buddhist monks as shorthand notes, became the designated script for modern scientific terms, foreign names, and global loanwords (e.g., コンピューター konpyūtā).',
        highlight: 'Three scripts working seamlessly together'
      }
    ],
    linguisticTraits: [
      {
        title: 'The Tripartite Script System',
        description: 'A single sentence often uses all three scripts: Kanji carries core roots (私 I, 食べる to eat), Hiragana handles grammatical endings and particles (は, を, ました), and Katakana transcribes foreign words (パン bread).',
        icon: '🧩',
        example: '私はパンを食べました (I ate bread)'
      },
      {
        title: 'Grammatical Particles (助词 · Joshi)',
        description: 'Little post-position particles indicate the role of each word in the sentence (は topic, が subject, を direct object, に destination/time).',
        icon: '🏷️',
        example: '猫が (the cat [subject]) + 魚を (fish [object]) + 食べた (ate)'
      }
    ],
    culturalNote: 'Mastering Japanese allows you to appreciate a profound cultural relationship between visual calligraphy, respectful honorifics (Keigo), and context-driven communication.'
  },

  ru: {
    id: 'ru',
    englishName: 'Russian',
    nativeName: 'Русский язык (Russkiy yazyk)',
    title: 'The Slavic Soul: From Cyrillic Monks to Pushkin & Tolstoy',
    tagline: 'A rich, expressive language sculpted by Byzantine scholars, Peter the Great, and great poets.',
    speakersCount: '255+ Million Total Speakers',
    writingSystem: 'Russian Cyrillic Alphabet (33 Letters)',
    languageFamily: 'Indo-European (East Slavic)',
    facts: [
      { label: 'Alphabet', value: '33 Letters (10 vowels, 21 consonants, 2 signs)', icon: '🔤' },
      { label: 'Script Reform', value: 'Peter the Great (1708) & Soviet (1918)', icon: '📜' },
      { label: 'Case System', value: '6 Grammatical Cases', icon: '🏛️' },
      { label: 'Genders', value: '3 (Masculine, Feminine, Neuter)', icon: '⚖️' },
      { label: 'Space Language', value: 'Mandatory on the ISS alongside English', icon: '🚀' },
      { label: 'Literary Golden Age', value: 'Pushkin, Tolstoy, Dostoevsky, Chekhov', icon: '📖' }
    ],
    historyTimeline: [
      {
        era: 'c. 863 CE',
        title: 'Saints Cyril and Methodius',
        description: 'Byzantine missionary brothers Cyril and Methodius developed the Glagolitic script to translate biblical texts for Slavic peoples, which soon evolved in the First Bulgarian Empire into the Cyrillic alphabet.',
        highlight: 'Birth of Cyrillic'
      },
      {
        era: '1708',
        title: 'Peter the Great’s Civil Script Reform (Гражданский шрифт)',
        description: 'Tsar Peter the Great personally crossed out archaic ecclesiastical Greek letters and reshaped Russian Cyrillic to resemble Western European typography, modernizing Russian science, naval charts, and printing.',
        highlight: 'Secularization and modernization'
      },
      {
        era: '1918',
        title: 'The Great Post-Revolution Orthography Reform',
        description: 'The Bolshevik government simplified spelling by abolishing redundant historical letters (like ѣ "yat", ѳ "fita", and imperial final ъ "yer"), creating the streamlined 33-letter alphabet used today.',
        highlight: 'Current 33-letter standard established'
      }
    ],
    linguisticTraits: [
      {
        title: 'Mobile Word Stress',
        description: 'Stress in Russian is unpredictable and can change the word’s meaning (за́мок = castle vs замо́к = padlock). Unstressed "o" naturally reduces to an "ah" sound (молоко́ $\\rightarrow$ malakó).',
        icon: '🎯',
        example: 'за́мок (castle) vs замо́к (padlock)'
      },
      {
        title: 'Soft & Hard Consonants (Palatalization)',
        description: 'Almost every consonant comes in a hard (plain) or soft (palatalized) pair, distinguished by the vowel that follows it or the soft sign (ь).',
        icon: '🎶',
        example: 'мат (checkmate) vs мать (mother)'
      }
    ],
    culturalNote: 'Russian is one of the six official languages of the United Nations and the mandatory second operational language of the International Space Station.'
  },

  tr: {
    id: 'tr',
    englishName: 'Turkish',
    nativeName: 'Türkçe',
    title: 'The Miracle of 1928: Atatürk’s Alphabet Revolution',
    tagline: 'How an entire nation transitioned from Ottoman Arabic script to a phonetic Latin alphabet in months.',
    speakersCount: '85+ Million Native Speakers',
    writingSystem: 'Turkish Latin Alphabet (29 Letters)',
    languageFamily: 'Turkic',
    facts: [
      { label: 'The 1928 Reform', value: 'Harf Devrimi (Atatürk’s Alphabet Revolution)', icon: '🏛️' },
      { label: 'Alphabet', value: '29 Letters (Completely Phonetic: 1 letter = 1 sound)', icon: '🔤' },
      { label: 'Linguistic Structure', value: 'Agglutinative (Building blocks of suffixes)', icon: '🧱' },
      { label: 'Vowel Harmony', value: 'Front and Back vowels match in harmony', icon: '🎵' },
      { label: 'Grammatical Gender', value: 'None! Even "he", "she", and "it" are just "o"', icon: '⚖️' },
      { label: 'Word Order', value: 'SOV (Subject-Object-Verb)', icon: '🔄' }
    ],
    historyTimeline: [
      {
        era: '10th – 1928 CE',
        title: 'Ottoman Turkish & The Arabic Script Mismatch',
        description: 'For over 900 years, Turkish was written in Ottoman Arabic script. However, Arabic has only 3 vowel representations, whereas Turkish features 8 rich vowels. This mismatch caused widespread ambiguity and kept literacy below 10%.',
        highlight: 'Widespread illiteracy due to script mismatch'
      },
      {
        era: '1928',
        title: 'Mustafa Kemal Atatürk’s Language Revolution (Harf Devrimi)',
        description: 'The founder of the Turkish Republic, Atatürk, personally toured towns with blackboards to introduce a brand-new 29-letter phonetic Latin alphabet adapted to Turkish phonology (introducing ç, ğ, ı, ö, ş, ü).',
        highlight: 'National literacy soared from 10% to 90%+'
      }
    ],
    linguisticTraits: [
      {
        title: 'Agglutinative Suffix Chains',
        description: 'Words are constructed by snapping suffixes onto a root like Lego blocks. A single word can express what takes a whole English sentence!',
        icon: '🧱',
        example: 'Ev (house) $\\rightarrow$ evler (houses) $\\rightarrow$ evlerimde (in my houses)'
      },
      {
        title: 'Vowel Harmony (Ünlü Uyumu)',
        description: 'Vowels inside a word harmonize musically between back vowels (a, ı, o, u) and front vowels (e, i, ö, ü). Suffixes automatically shift vowels to match the root.',
        icon: '🎶',
        example: 'araba-lar (cars) vs kedi-ler (cats)'
      }
    ],
    culturalNote: 'Because Turkish spelling is 100% phonetic, once you learn the sounds of the 29 letters, you can pronounce every single word in the language accurately.'
  },

  ar: {
    id: 'ar',
    englishName: 'Arabic',
    nativeName: 'العربية (al-ʿArabiyyah)',
    title: 'The Language of Eloquence (لغة الضاد · Lughat al-Dad)',
    tagline: 'A sacred root-and-pattern language uniting 400+ million speakers across the Arab world.',
    speakersCount: '400+ Million Total Speakers',
    writingSystem: 'Arabic Abjad (28 Letters, Right-to-Left)',
    languageFamily: 'Afroasiatic (Semitic)',
    facts: [
      { label: 'Direction', value: 'Right to Left (RTL)', icon: '➡️' },
      { label: 'Alphabet', value: '28 Letters (All consonants and long vowels)', icon: '🔤' },
      { label: 'Root System', value: '3-Letter Consonantal Roots (Triliteral)', icon: '🌱' },
      { label: 'The Unique Sound', value: 'Daad (ض) — Found almost exclusively in Arabic', icon: '🗣️' },
      { label: 'Dual Number', value: 'Singular, Dual (two), and Plural forms', icon: '2️⃣' },
      { label: 'World Mother Language', value: 'UN World Arabic Language Day (Dec 18)', icon: '🌐' }
    ],
    historyTimeline: [
      {
        era: '6th Century CE',
        title: 'Pre-Islamic Poetry (Mu\'allaqat)',
        description: 'Bedouin poets memorized complex, rhyming odes celebrating desert honor and bravery, establishing the sublime poetic standard of Classical Arabic.',
        highlight: 'Golden age of pre-Islamic poetry'
      },
      {
        era: '7th Century CE',
        title: 'The Quran & Linguistic Preservation',
        description: 'The revelation and compilation of the Holy Quran codified Arabic grammar and phonology, preserving the language virtually unchanged for over 1,400 years.',
        highlight: 'Universal Islamic liturgical standard'
      },
      {
        era: 'Modern Era',
        title: 'Modern Standard Arabic (الفصحى · Fus\'ha)',
        description: 'Today, Modern Standard Arabic serves as the shared formal language of literature, news, diplomacy, and education across 22 countries.',
        highlight: 'Shared lingua franca of the Arab world'
      }
    ],
    linguisticTraits: [
      {
        title: '3-Letter Root Machine (الجذر · Al-Jidhr)',
        description: 'Nearly every Arabic word springs from a 3-letter root carrying an abstract meaning. For example, K-T-B (ك-ت-ب) relating to writing yields kitāb (book), kātib (writer), maktab (office), and maktūb (destined).',
        icon: '🌱',
        example: 'ك-ت-ب $\\rightarrow$ كتاب (Book) · مكتبة (Library) · كاتب (Author)'
      },
      {
        title: 'Cursive Ligatures',
        description: 'Arabic letters connect in fluid cursive script, changing shape depending on whether they sit at the beginning, middle, end, or isolated in a word.',
        icon: '✍️',
        example: 'ب sitting initial (بـ), medial (ـبـ), or final (ـب)'
      }
    ],
    culturalNote: 'Arabic calligraphy is celebrated as one of the highest forms of visual art in human history.'
  },

  hi: {
    id: 'hi',
    englishName: 'Hindi',
    nativeName: 'हिन्दी (Hindī)',
    title: 'The Voice of India: From Ancient Sanskrit to Bollywood',
    tagline: 'Written in the graceful Devanagari script ("City of the Gods") and spoken by 600+ million.',
    speakersCount: '600+ Million Total Speakers',
    writingSystem: 'Devanagari (देवनागरी) Abugida Script',
    languageFamily: 'Indo-European (Indo-Aryan)',
    facts: [
      { label: 'Alphabet', value: '46 Devanagari Letters (11 Vowels, 33 Consonants)', icon: '🔤' },
      { label: 'Top Line', value: 'Shirorekha (Horizontal headline hanging letters)', icon: '📏' },
      { label: 'Sibling Language', value: 'Colloquially interchangeable with Urdu', icon: '🤝' },
      { label: 'Word Order', value: 'SOV (Subject-Object-Verb)', icon: '🔄' },
      { label: 'Ancestor', value: 'Sanskrit (संस्कृतम्)', icon: '🏛️' },
      { label: 'Global Influence', value: 'Yoga, Avatar, Jungle, Guru, Chai, Shampoo', icon: '🧘' }
    ],
    historyTimeline: [
      {
        era: 'c. 1500 BCE',
        title: 'Sanskrit Vedic Roots',
        description: 'Vedic Sanskrit evolved into regional Prakrit dialects spoken by the everyday population across Northern India.',
        highlight: 'Vedic hymns & classical philosophy'
      },
      {
        era: '13th – 18th Century',
        title: 'The Emergence of Hindustani',
        description: 'The Delhi Sultanate and Mughal era brought Persian, Turkic, and Arabic vocabulary into everyday conversation, creating Hindustani as the bustling lingua franca of bazars and poetry.',
        highlight: 'Birth of common Hindustani'
      },
      {
        era: '1950',
        title: 'Official Language of the Republic of India',
        description: 'Standard Hindi written in Devanagari was designated as an official language of the Union of India, celebrated nationally on Hindi Diwas (September 14).',
        highlight: 'Hindi Diwas celebrated annually on Sept 14'
      }
    ],
    linguisticTraits: [
      {
        title: 'The Hanging Headline (Shirorekha · शिरोरेखा)',
        description: 'Devanagari characters hang downward from a continuous horizontal top line like laundry on a line, visually grouping the letters of a word together.',
        icon: '📏',
        example: 'क + म + ल = कमल (Lotus)'
      },
      {
        title: 'Aspirated vs Unaspirated Consonants',
        description: 'Hindi distinguishes sharply between plain stops and breathy aspirated stops (k vs kh, p vs ph, t vs th). Holding a hand in front of your mouth feels a burst of air on aspirated sounds.',
        icon: '💨',
        example: 'कल (Yesterday/Tomorrow) vs खल (Wicked)'
      }
    ],
    culturalNote: 'English has borrowed hundreds of everyday words from Hindi and Sanskrit, including karma, guru, jungle, avatar, cheetah, pajama, and shampoo.'
  },

  bn: {
    id: 'bn',
    englishName: 'Bengali',
    nativeName: 'বাংলা (Bangla)',
    title: 'The Language of the Soul: Tagore & The Language Movement',
    tagline: 'The only language in human history whose speakers fought and died to preserve their mother tongue.',
    speakersCount: '270+ Million Native Speakers (World #6)',
    writingSystem: 'Bengali-Assamese Script (বাংলা লিপি)',
    languageFamily: 'Indo-European (Indo-Aryan)',
    facts: [
      { label: 'Rank', value: '6th Most Spoken Native Language Globally', icon: '🌐' },
      { label: 'Nobel Laureate', value: 'Rabindranath Tagore (Nobel Literature 1913)', icon: '🏅' },
      { label: 'UNESCO Holiday', value: 'International Mother Language Day (Feb 21)', icon: '🌺' },
      { label: 'Inherent Vowel', value: 'Rounded "o" sound (অ / ɔ/)', icon: '👄' },
      { label: 'Grammatical Gender', value: 'None! Verbs and adjectives are gender-neutral', icon: '⚖️' },
      { label: 'National Anthems', value: 'Tagore penned the anthems of both India & Bangladesh', icon: '🎶' }
    ],
    historyTimeline: [
      {
        era: '10th – 12th Century',
        title: 'Charyapada: The Earliest Bengali Poetry',
        description: 'Buddhist tantric mystic poets composed the Charyapada songs in palm-leaf manuscripts, marking the earliest recorded form of the Bengali language.',
        highlight: 'Old Bengali mystic songs'
      },
      {
        era: '1913',
        title: 'Rabindranath Tagore Wins the Nobel Prize',
        description: 'Polymath Rabindranath Tagore became the first non-European to win the Nobel Prize in Literature for his profound spiritual collection Gitanjali ("Song Offerings").',
        highlight: 'First Asian Nobel Laureate'
      },
      {
        era: 'February 21, 1952',
        title: 'The Bengali Language Movement (ভাষা আন্দোলন)',
        description: 'Students in Dhaka took to the streets and sacrificed their lives protesting attempts to erase Bengali as an official state language. In 1999, UNESCO declared February 21st International Mother Language Day worldwide in their honor.',
        highlight: 'UNESCO International Mother Language Day'
      }
    ],
    linguisticTraits: [
      {
        title: 'The Inherent Rounded "O" Vowel',
        description: 'Unlike Hindi which defaults to a short "a" sound, every unmarked Bengali consonant carries a warm, rounded "o" (\\/ɔ\\/) sound. For example, জল is pronounced "jol" (water).',
        icon: '👄',
        example: 'ক = ko (not ka) · জল = jol'
      },
      {
        title: 'Complete Gender Neutrality',
        description: 'Bengali grammar has zero grammatical gender. Men, women, and inanimate objects use the same third-person pronouns (সে she/he) and identical verb forms.',
        icon: '⚖️',
        example: 'সে যায় (He goes / She goes)'
      }
    ],
    culturalNote: 'International Mother Language Day (February 21) is observed worldwide in tribute to the Bengali university martyrs of 1952.'
  },

  ur: {
    id: 'ur',
    englishName: 'Urdu',
    nativeName: 'اُردُو (Urdū)',
    title: 'The Language of Poetry: Nastaliq Script & Courtly Elegance',
    tagline: 'Born from royal encampments, celebrated for centuries in ghazals, romance, and philosophy.',
    speakersCount: '230+ Million Total Speakers',
    writingSystem: 'Perso-Arabic Nastaliq Script (نستعلیق · 39 Letters)',
    languageFamily: 'Indo-European (Indo-Aryan)',
    facts: [
      { label: 'Origin of Name', value: 'From Turkic "Ordu" (Royal Camp)', icon: '⛺' },
      { label: 'Calligraphy Style', value: 'Nastaliq (Sloping, fluid Persian style)', icon: '✒️' },
      { label: 'Vocabulary Heritage', value: 'Prakrit base with Persian, Arabic, and Turkic', icon: '🏛️' },
      { label: 'Spoken Twin', value: 'Mutually intelligible with spoken Hindi', icon: '🤝' },
      { label: 'National Language', value: 'Islamic Republic of Pakistan', icon: '🇵🇰' },
      { label: 'Poetic Form', value: 'Ghazal (غزل), Nazm, and Qawwali', icon: '📜' }
    ],
    historyTimeline: [
      {
        era: '13th Century',
        title: 'Amir Khusrau & The Camps of Delhi',
        description: 'Sufi poet Amir Khusrau pioneered verse combining Persian imagery with local Hindavi vernacular, laying the foundations of early Urdu literature.',
        highlight: 'Father of Urdu literature'
      },
      {
        era: '18th – 19th Century',
        title: 'The Golden Age of Urdu Poetry (Mir & Ghalib)',
        description: 'Mirza Ghalib and Mir Taqi Mir transformed the Mughal court of Delhi into the world capital of the Ghazal, exploring love, existential doubt, and mysticism with unparalleled lyricism.',
        highlight: 'Mirza Ghalib’s immortal verses'
      },
      {
        era: '1947',
        title: 'National Language of Pakistan',
        description: 'Urdu was chosen as the national unifying language of Pakistan, serving as a unifying thread across diverse provinces speaking Punjabi, Sindhi, Pashto, and Balochi.',
        highlight: 'National symbol of unity'
      }
    ],
    linguisticTraits: [
      {
        title: 'The Sloping Nastaliq Script',
        description: 'Unlike standard horizontal Arabic Naskh, Urdu is traditionally handwritten and set in Nastaliq, where each word descends diagonally from top-right to bottom-left like cascading silk.',
        icon: '✒️',
        example: 'Nastaliq cascades diagonally across the line.'
      },
      {
        title: 'Nuanced Politeness & Tehzeeb (Adab)',
        description: 'Urdu has three distinct levels of "you": informal "tu" (तू), polite "tum" (تم), and deferential "aap" (آپ), accompanied by elaborate courtesies.',
        icon: '🙇',
        example: 'آپ تشریف رکھیے (Please grace us by taking a seat)'
      }
    ],
    culturalNote: 'Urdu is celebrated throughout South Asia as the ultimate language of romance, courtly refinement (tehzeeb), and mystical Sufi music.'
  },

  id: {
    id: 'id',
    englishName: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    title: 'The Unifying Tongue: 17,000 Islands, One Language',
    tagline: 'How a peaceful 1928 youth pledge united 700 ethnic groups across the world’s largest archipelago.',
    speakersCount: '300+ Million Total Speakers',
    writingSystem: 'Latin Alphabet (26 Letters, 100% Phonetic)',
    languageFamily: 'Austronesian (Malayo-Polynesian)',
    facts: [
      { label: 'The 1928 Pledge', value: 'Sumpah Pemuda (Youth Pledge of Unity)', icon: '🇮🇩' },
      { label: 'Grammar Simplicity', value: 'No verb conjugations, no tenses, no gender', icon: '✨' },
      { label: 'Pluralization', value: 'Word reduplication (anak-anak = children)', icon: '👶' },
      { label: 'Phonetic Spelling', value: 'Words are spelled exactly as they sound', icon: '🔤' },
      { label: 'Base Dialect', value: 'Riau Malay (neutral trading language)', icon: '🚢' },
      { label: 'Loanwords', value: 'Sanskrit, Arabic, Dutch, Portuguese, Chinese', icon: '🌏' }
    ],
    historyTimeline: [
      {
        era: '7th Century',
        title: 'The Maritime Silk Road & Melayu Pasar',
        description: 'For over a millennium, coastal Malay (Bazaar Malay) served as the neutral trading tongue connecting Spice Island sultans, Chinese traders, and Arab merchants.',
        highlight: 'Neutral maritime trading tongue'
      },
      {
        era: 'October 28, 1928',
        title: 'The Youth Pledge (Sumpah Pemuda)',
        description: 'Young Indonesian patriots made a visionary decision: rather than choosing Javanese (the dominant ethnic majority), they chose neutral Malay to ensure equal brotherhood across all 700 local languages.',
        highlight: '"One Motherland, One Nation, One Language"'
      }
    ],
    linguisticTraits: [
      {
        title: 'Reduplication for Plurals',
        description: 'To make something plural in Indonesian, you simply repeat the word! Anak is child, so anak-anak is children. Buku is book, so buku-buku is books.',
        icon: '🔁',
        example: 'Orang (person) $\\rightarrow$ orang-orang (people)'
      },
      {
        title: 'Affix System (Me-, Di-, Ber-, Pe-)',
        description: 'While Indonesian has no verb tenses, rich prefixes and suffixes transform root words into active verbs, passive verbs, and abstract nouns.',
        icon: '🧩',
        example: 'Tulis (write) $\\rightarrow$ menulis (to write) $\\rightarrow$ ditulis (is written)'
      }
    ],
    culturalNote: 'Indonesian is widely considered by linguists to be one of the easiest languages in the world for beginners to start speaking from Day 1.'
  },

  es: {
    id: 'es',
    englishName: 'Spanish',
    nativeName: 'Español · Castellano',
    title: 'From Castile to the Americas: The Global Spanish Journey',
    tagline: 'Born from Vulgar Latin, enriched by 700 years of Arabic, spoken by 500+ million across 21 nations.',
    speakersCount: '500+ Million Native Speakers (World #2)',
    writingSystem: 'Spanish Latin Alphabet (27 Letters including Ñ)',
    languageFamily: 'Indo-European (Romance)',
    facts: [
      { label: 'Native Speakers', value: 'World #2 Most Spoken Native Language', icon: '🌎' },
      { label: 'Arabic Influence', value: '4,000+ Arabic loanwords (azúcar, alcalde, ojalá)', icon: '🕌' },
      { label: 'First Modern Grammar', value: 'Antonio de Nebrija (1492)', icon: '📖' },
      { label: 'Inverted Punctuation', value: '¡Opening exclamation! & ¿Opening question?', icon: '❓' },
      { label: 'Official in', value: '21 Countries across 4 Continents', icon: '🏛️' },
      { label: 'Literary Masterpiece', value: 'Don Quixote by Miguel de Cervantes', icon: '🛡️' }
    ],
    historyTimeline: [
      {
        era: 'c. 200 BCE – 400 CE',
        title: 'Roman Hispania & Vulgar Latin',
        description: 'Roman soldiers, traders, and administrators brought spoken Vulgar Latin to the Iberian Peninsula, displacing Celtic and Iberian languages.',
        highlight: 'Latin roots of Spanish'
      },
      {
        era: '711 – 1492 CE',
        title: 'Al-Andalus & The Arabic Lexical Legacy',
        description: 'Nearly 800 years of Moorish rule enriched Spanish with thousands of scientific, agricultural, and architectural words starting with the Arabic article "al-".',
        highlight: '4,000+ Arabic loanwords in daily use'
      },
      {
        era: '1492',
        title: 'Nebrija’s Grammar & Expansion to the Americas',
        description: 'Antonio de Nebrija published the first grammar of a modern European vernacular, presenting it to Queen Isabella as "the instrument of empire."',
        highlight: 'First European vernacular grammar'
      }
    ],
    linguisticTraits: [
      {
        title: 'Inverted Punctuation (¿ ? and ¡ !)',
        description: 'Spanish is the only major language that alerts readers to the mood of a sentence at the very beginning with upside-down question marks and exclamation points.',
        icon: '❓',
        example: '¿Cómo estás? · ¡Qué bueno!'
      },
      {
        title: 'Ser vs Estar (Two Kinds of "To Be")',
        description: 'Spanish distinguishes between permanent identity/essence (Ser) and temporary states/locations (Estar). Soy feliz means I am a happy person; estoy feliz means I feel happy right now.',
        icon: '⚖️',
        example: 'Soy profesor (Identity) vs Estoy cansado (Current state)'
      }
    ],
    culturalNote: 'Spanish is spoken across 21 sovereign nations, each contributing vibrant musical traditions, literary giants, and regional idioms.'
  },

  fr: {
    id: 'fr',
    englishName: 'French',
    nativeName: 'Français',
    title: 'The Language of Reason, Diplomacy & La Francophonie',
    tagline: 'The historic language of treaties, Enlightenment philosophy, and 320+ million speakers globally.',
    speakersCount: '320+ Million Total Speakers',
    writingSystem: 'French Latin Alphabet (26 Letters + Diacritics)',
    languageFamily: 'Indo-European (Romance)',
    facts: [
      { label: 'Global Status', value: 'Official language of 29 countries', icon: '🌍' },
      { label: 'Diplomacy Heritage', value: 'The traditional language of international treaties', icon: '🕊️' },
      { label: 'Language Guardian', value: 'Académie Française (Founded 1635 by Richelieu)', icon: '🏛️' },
      { label: 'Olympics & Post', value: 'Official working tongue of the IOC and UPU', icon: '🏅' },
      { label: 'Grammar Genders', value: '2 (Masculine & Feminine)', icon: '⚖️' },
      { label: 'Vowel Nuances', value: 'Nasal vowels (an, on, in, un)', icon: '🍷' }
    ],
    historyTimeline: [
      {
        era: '842 CE',
        title: 'The Oaths of Strasbourg (Serments de Strasbourg)',
        description: 'The oldest surviving document written in an early Romance vernacular distinct from Latin, sworn by Charlemagne’s grandsons.',
        highlight: 'Oldest documented French text'
      },
      {
        era: '1539',
        title: 'Ordinance of Villers-Cotterêts',
        description: 'King Francis I decreed that French, rather than church Latin, must be used in all legal acts, laws, and royal decrees, creating the unified French state.',
        highlight: 'French declared official state language'
      },
      {
        era: '18th Century',
        title: 'The Enlightenment & European Lingua Franca',
        description: 'French became the language of European royal courts, diplomacy, and Enlightenment thinkers like Voltaire, Rousseau, and Diderot.',
        highlight: 'Global language of diplomacy'
      }
    ],
    linguisticTraits: [
      {
        title: 'Liaison & Flowing Euphony',
        description: 'French places supreme value on vocal flow (euphony). Normally silent ending consonants wake up and link to the next vowel sound (les amis $\\rightarrow$ lay-zah-mee).',
        icon: '🎶',
        example: 'C’est un ami (Pronounced: Seh-tuhn-ah-mee)'
      },
      {
        title: 'Nasal Vowels',
        description: 'French features 4 distinctive nasal vowels where air flows simultaneously through the mouth and nose (pain, bon, vent, un).',
        icon: '👃',
        example: 'Bon (good) · Vin (wine) · Temps (weather)'
      }
    ],
    culturalNote: 'Today, the majority of the world’s French speakers live on the African continent, making French one of the fastest-growing languages of the 21st century.'
  },

  de: {
    id: 'de',
    englishName: 'German',
    nativeName: 'Deutsch',
    title: 'The Language of Poets, Thinkers & Precision Engineering',
    tagline: 'From Martin Luther’s Bible to Einstein’s physics and remarkable compound words.',
    speakersCount: '130+ Million Total Speakers',
    writingSystem: 'German Latin Alphabet (26 Letters + ä, ö, ü, ß)',
    languageFamily: 'Indo-European (West Germanic)',
    facts: [
      { label: 'Most Spoken in EU', value: '#1 First Language in the European Union', icon: '🇪🇺' },
      { label: 'Compound Words', value: 'Words chained together to form exact concepts', icon: '🧩' },
      { label: 'Grammatical Cases', value: '4 Cases (Nominative, Accusative, Dative, Genitive)', icon: '🏛️' },
      { label: 'Genders', value: '3 (Der Maskulin, Die Feminin, Das Neutrum)', icon: '⚖️' },
      { label: 'Noun Capitalization', value: 'Every single noun is capitalized in writing', icon: '🔠' },
      { label: 'Scientific Heritage', value: 'Language of Goethe, Kant, Beethoven, Einstein', icon: '🔬' }
    ],
    historyTimeline: [
      {
        era: '6th – 8th Century',
        title: 'The High German Consonant Shift',
        description: 'A major phonetic sound shift separated German from its Germanic cousins (English/Dutch), changing "t" to "z/ss" (water $\\rightarrow$ Wasser, two $\\rightarrow$ zwei).',
        highlight: 'Divergence from Proto-Germanic'
      },
      {
        era: '1522',
        title: 'Martin Luther’s Bible Translation',
        description: 'Martin Luther translated the New Testament into a vibrant, accessible Saxon chancery dialect, forging a unified national German literary standard from hundreds of fragmented regional dialects.',
        highlight: 'Birth of modern standard Hochdeutsch'
      }
    ],
    linguisticTraits: [
      {
        title: 'Capitalization of All Nouns',
        description: 'German is the only major language in the world where every noun is capitalized, making subjects, objects, and concepts immediately identifiable on the page.',
        icon: '🔠',
        example: 'Das Buch (The book) · Die Zeit (The time)'
      },
      {
        title: 'Legendary Compound Words',
        description: 'German can fuse nouns together into precise conceptual descriptions. A glove is a "hand-shoe" (Handschuh), and a refrigerator is a "cool-cabinet" (Kühlschrank).',
        icon: '🧩',
        example: 'Kühlschrank (Cool-cabinet = Fridge)'
      }
    ],
    culturalNote: 'German is the language of philosophy, classical music, and cutting-edge industrial innovation across Germany, Austria, and Switzerland.'
  },

  pt: {
    id: 'pt',
    englishName: 'Portuguese',
    nativeName: 'Português',
    title: 'The Language of Camões & The Maritime Ocean Roads',
    tagline: 'Spoken across 4 continents from Lisbon to Rio de Janeiro, Luanda, and Maputo.',
    speakersCount: '260+ Million Native Speakers',
    writingSystem: 'Portuguese Latin Alphabet (26 Letters + Diacritics)',
    languageFamily: 'Indo-European (Romance)',
    facts: [
      { label: 'Southern Hemisphere', value: 'Most spoken language in the Southern Hemisphere', icon: '🌎' },
      { label: 'National Poet', value: 'Luís de Camões (Os Lusíadas, 1572)', icon: '📜' },
      { label: 'Nasal Tildes', value: 'The famous tilde (ã, õ) for musical nasal sounds', icon: '🎵' },
      { label: 'Genders', value: '2 (Masculine -o, Feminine -a)', icon: '⚖️' },
      { label: 'The Concept of Saudade', value: 'Untranslatable longing and nostalgic love', icon: '💖' },
      { label: 'Largest Population', value: 'Brazil accounts for ~80% of all speakers', icon: '🇧🇷' }
    ],
    historyTimeline: [
      {
        era: '9th – 12th Century',
        title: 'Galician-Portuguese (Galego-Português)',
        description: 'Evolving from Vulgar Latin in the northwest of the Iberian peninsula, Galician-Portuguese became the supreme language of medieval troubadour lyric poetry.',
        highlight: 'Medieval lyric poetry golden age'
      },
      {
        era: '15th – 16th Century',
        title: 'The Age of Discovery & Global Diaspora',
        description: 'Portuguese navigators like Vasco da Gama carried the language across oceans to Brazil, Africa (Angola, Mozambique), India (Goa), and Macau.',
        highlight: 'Global maritime expansion'
      }
    ],
    linguisticTraits: [
      {
        title: 'Nasal Vowels with Tildes (ã, õ)',
        description: 'The tilde was originally a tiny medieval Latin shorthand "n" written over a vowel (canção came from cantionem). It produces Portuguese’s warm, unmistakable nasal resonance.',
        icon: '🎵',
        example: 'Pão (Bread) · Não (No) · Coração (Heart)'
      },
      {
        title: 'Saudade: The Soul of the Language',
        description: 'Often called one of the most beautiful untranslatable words in the world, saudade describes a bittersweet longing for someone or somewhere that is absent.',
        icon: '💖',
        example: 'Tenho saudades de você (I yearn for your presence)'
      }
    ],
    culturalNote: 'Portuguese is the official language of nine countries united in the CPLP (Community of Portuguese Language Countries).'
  },

  en: {
    id: 'en',
    englishName: 'English',
    nativeName: 'English',
    title: 'The Global Lingua Franca: From Anglo-Saxon Roots to Global Web',
    tagline: 'How an island tongue absorbed Latin, Norse, and French to become the world’s common language.',
    speakersCount: '1.5+ Billion Total Speakers',
    writingSystem: 'English Latin Alphabet (26 Letters)',
    languageFamily: 'Indo-European (West Germanic)',
    facts: [
      { label: 'Global Status', value: 'Global lingua franca of technology, science, and air travel', icon: '🌐' },
      { label: 'Hybrid Vocabulary', value: '~60% Latin/French roots + ~26% Germanic roots', icon: '🧬' },
      { label: 'Total Words', value: 'Over 500,000 words in the Oxford English Dictionary', icon: '📚' },
      { label: 'Grammar Simplicity', value: 'No grammatical gender, minimal verb inflection', icon: '✨' },
      { label: 'Spelling Eccentricity', value: 'Historical spellings preserved while sounds shifted', icon: '🎩' },
      { label: 'The Web', value: 'Primary language of software, internet, and code', icon: '💻' }
    ],
    historyTimeline: [
      {
        era: 'c. 450 CE',
        title: 'Old English (Anglo-Saxon & Viking Influences)',
        description: 'Germanic tribes (Angles, Saxons, Jutes) arrived in Britain. Old Norse Viking invasions infused core daily words like sky, skin, take, they, and give.',
        highlight: 'Old English epic Beowulf'
      },
      {
        era: '1066 CE',
        title: 'The Norman Conquest & French Infusion',
        description: 'William the Conqueror made Anglo-Norman French the language of the royal court and law, creating a famous two-tiered vocabulary (Germanic farm animals vs French cooked meats: pig/pork, cow/beef).',
        highlight: 'French and Latin vocabulary boom'
      },
      {
        era: 'c. 1600 CE',
        title: 'Shakespeare & The King James Bible',
        description: 'William Shakespeare coined over 1,700 new words and phrases, while the King James Bible standardized poetic English cadence across the world.',
        highlight: 'Modern English takes flight'
      }
    ],
    linguisticTraits: [
      {
        title: 'Double-Tiered Germanic & French Vocabulary',
        description: 'English has two words for almost everything: a direct, earthly Germanic word and a sophisticated French/Latin counterpart.',
        icon: '🧬',
        example: 'Ask (Germanic) vs Inquire (French) · Kingly vs Royal'
      },
      {
        title: 'Absence of Grammatical Gender',
        description: 'Unlike German or Spanish, English abandoned noun gender centuries ago. Everything is simply "the"!',
        icon: '✨',
        example: 'The sun, the moon, the table — no gender to memorize.'
      }
    ],
    culturalNote: 'English is today the undisputed operating system of global science, aviation, international commerce, and the World Wide Web.'
  }
};
