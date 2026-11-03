import { SupportedLanguageId } from '../data/languages/types';

export interface PageContent {
  title: string;
  subtitle: string;
}

export interface TimeRuleCard {
  ruleBadge: string;
  title: string;
  desc: string;
  items: { label: string; text: string }[];
}

export interface TimeGrammarGuideData {
  headerTitle: string;
  rules: TimeRuleCard[];
  footerHint: string;
}

/**
 * Maps section titles and subtitles based on target language (learning course)
 * and base language (the user's native tongue).
 */
const getPageContentExplicit = (
  section: 'alphabet' | 'phrases' | 'words' | 'numbers' | 'time' | 'quiz',
  targetLang: SupportedLanguageId,
  baseLang: SupportedLanguageId
): PageContent => {
  // 1. ALPHABET
  if (section === 'alphabet') {
    if (targetLang === 'en') {
      switch (baseLang) {
        case 'ru':
          return {
            title: 'Английский алфавит',
            subtitle: '26 букв с правилами произношения, примерами слов и студийным аудио'
          };
        case 'es':
          return {
            title: 'Alfabeto inglés',
            subtitle: '26 letras con guías de pronunciación, vocabulario de ejemplo y audio nativo'
          };
        case 'fr':
          return {
            title: 'Alphabet anglais',
            subtitle: '26 lettres avec guides de prononciation, exemples de vocabulaire et audio natif'
          };
        case 'pt':
          return {
            title: 'Alfabeto inglês',
            subtitle: '26 letras com guias de pronúncia, vocabulário de exemplo e áudio nativo'
          };
        case 'de':
          return {
            title: 'Englisches Alphabet',
            subtitle: '26 Buchstaben mit Aussprachehilfen, Beispielwörtern und Studio-Audio'
          };
        case 'id':
          return {
            title: 'Alfabet Bahasa Inggris',
            subtitle: '26 huruf dengan panduan pelafalan, contoh kosakata, dan audio studio asli'
          };
        case 'tr':
          return {
            title: 'İngilizce Alfabesi',
            subtitle: 'Telaffuz rehberi, örnek kelimeler ve stüdyo sesiyle 26 harf'
          };
        case 'zh':
          return {
            title: '英语字母表',
            subtitle: '26个英文字母，包含发音规则、例词和录音棚母语发音'
          };
        case 'en':
        default:
          return {
            title: 'English Alphabet',
            subtitle: '26 letters with pronunciation guides, example vocabulary, and native studio audio'
          };
      }
    }

    if (targetLang === 'ru') {
      switch (baseLang) {
        case 'ru':
          return {
            title: 'Русский алфавит (Кириллица)',
            subtitle: '33 буквы с произношением, примерами слов и студийным аудио'
          };
        case 'es':
          return {
            title: 'Alfabeto ruso (cirílico)',
            subtitle: '33 letras con guías de pronunciación, palabras de ejemplo y audio de estudio'
          };
        case 'fr':
          return {
            title: 'Alphabet russe (cyrillique)',
            subtitle: '33 lettres avec guides de prononciation, mots d\'exemple et audio de studio'
          };
        case 'pt':
          return {
            title: 'Alfabeto russo (cirílico)',
            subtitle: '33 letras com guias de pronúncia, palavras de exemplo e áudio nativo'
          };
        case 'de':
          return {
            title: 'Russisches Alphabet (Kyrillisch)',
            subtitle: '33 Buchstaben mit Aussprachehilfen, Beispielwörtern und Studio-Audio'
          };
        case 'id':
          return {
            title: 'Alfabet Rusia (Sirilik)',
            subtitle: '33 huruf dengan panduan pelafalan, kata contoh, dan audio studio'
          };
        case 'tr':
          return {
            title: 'Rus Alfabesi (Kiril)',
            subtitle: 'Telaffuz rehberi, örnek kelimeler ve stüdyo sesiyle 33 harf'
          };
        case 'en':
        default:
          return {
            title: 'Russian Alphabet (Cyrillic)',
            subtitle: '33 letters with pronunciation guides, example words, and studio neural audio'
          };
      }
    }

    if (targetLang === 'es') {
      switch (baseLang) {
        case 'ru':
          return {
            title: 'Испанский алфавит',
            subtitle: '27 букв с правилами произношения, примерами слов и студийным аудио'
          };
        case 'es':
          return {
            title: 'Alfabeto español',
            subtitle: '27 letras con guías de pronunciación, vocabulario de ejemplo y audio nativo'
          };
        case 'fr':
          return {
            title: 'Alphabet espagnol',
            subtitle: '27 lettres avec guides de prononciation, vocabulaire et audio natif'
          };
        case 'pt':
          return {
            title: 'Alfabeto espanhol',
            subtitle: '27 letras com guias de pronúncia, vocabulário e áudio nativo'
          };
        case 'de':
          return {
            title: 'Spanisches Alphabet',
            subtitle: '27 Buchstaben mit Aussprachehilfen, Beispielwörtern und Studio-Audio'
          };
        case 'id':
          return {
            title: 'Alfabet Bahasa Spanyol',
            subtitle: '27 huruf dengan panduan pelafalan, kosakata contoh, dan audio studio'
          };
        case 'tr':
          return {
            title: 'İspanyolca Alfabesi',
            subtitle: 'Telaffuz rehberi, örnek kelimeler ve stüdyo sesiyle 27 harf'
          };
        case 'en':
        default:
          return {
            title: 'Spanish Alphabet',
            subtitle: '27 letters with pronunciation guides, example vocabulary, and native studio audio'
          };
      }
    }

    if (targetLang === 'fr') {
      switch (baseLang) {
        case 'ru':
          return {
            title: 'Французский алфавит',
            subtitle: '26 букв с правилами произношения, примерами слов и студийным аудио'
          };
        case 'es':
          return {
            title: 'Alfabeto francés',
            subtitle: '26 letras con guías de pronunciación, vocabulario y audio nativo'
          };
        case 'fr':
          return {
            title: 'Alphabet français',
            subtitle: '26 lettres avec guides de prononciation, vocabulaire d\'exemple et audio natif'
          };
        case 'pt':
          return {
            title: 'Alfabeto francês',
            subtitle: '26 letras com guias de pronúncia, vocabulário de exemplo e áudio nativo'
          };
        case 'de':
          return {
            title: 'Französisches Alphabet',
            subtitle: '26 Buchstaben mit Aussprachehilfen, Beispielwörtern und Studio-Audio'
          };
        case 'id':
          return {
            title: 'Alfabet Bahasa Prancis',
            subtitle: '26 huruf dengan panduan pelafalan, kosakata contoh, dan audio studio'
          };
        case 'tr':
          return {
            title: 'Fransızca Alfabesi',
            subtitle: 'Telaffuz rehberi, örnek kelimeler ve stüdyo sesiyle 26 harf'
          };
        case 'en':
        default:
          return {
            title: 'French Alphabet',
            subtitle: '26 letters with pronunciation guides, example vocabulary, and native studio audio'
          };
      }
    }

    if (targetLang === 'pt') {
      switch (baseLang) {
        case 'ru':
          return {
            title: 'Португальский алфавит',
            subtitle: '27 букв с правилами произношения, примерами слов и студийным аудио'
          };
        case 'es':
          return {
            title: 'Alfabeto portugués',
            subtitle: '27 letras con guías de pronunciación, vocabulario y audio nativo'
          };
        case 'fr':
          return {
            title: 'Alphabet portugais',
            subtitle: '27 lettres avec guides de prononciation, vocabulaire et audio natif'
          };
        case 'pt':
          return {
            title: 'Alfabeto português',
            subtitle: '27 letras com guias de pronúncia, vocabulário de exemplo e áudio nativo'
          };
        case 'de':
          return {
            title: 'Portugiesisches Alphabet',
            subtitle: '27 Buchstaben mit Aussprachehilfen, Beispielwörtern und Studio-Audio'
          };
        case 'id':
          return {
            title: 'Alfabet Bahasa Portugis',
            subtitle: '27 huruf dengan panduan pelafalan, contoh kosakata, dan audio studio asli'
          };
        case 'tr':
          return {
            title: 'Portekizce Alfabesi',
            subtitle: 'Telaffuz rehberi, örnek kelimeler ve stüdyo sesiyle 27 harf'
          };
        case 'en':
        default:
          return {
            title: 'Portuguese Alphabet',
            subtitle: '27 letters with pronunciation guides, example vocabulary, and native studio audio'
          };
      }
    }

    if (targetLang === 'de') {
      switch (baseLang) {
        case 'ru':
          return {
            title: 'Немецкий алфавит',
            subtitle: '30 букв (включая Ä, Ö, Ü, ß) с произношением, примерами слов и студийным аудио'
          };
        case 'es':
          return {
            title: 'Alfabeto alemán',
            subtitle: '30 letras (incluyendo Ä, Ö, Ü, ß) con guías de pronunciación y audio nativo'
          };
        case 'fr':
          return {
            title: 'Alphabet allemand',
            subtitle: '30 lettres (dont Ä, Ö, Ü, ß) avec guides de prononciation et audio natif'
          };
        case 'pt':
          return {
            title: 'Alfabeto alemão',
            subtitle: '30 letras (incluindo Ä, Ö, Ü, ß) com guias de pronúncia e áudio nativo'
          };
        case 'de':
          return {
            title: 'Deutsches Alphabet',
            subtitle: '30 Buchstaben (inkl. Ä, Ö, Ü, ß) mit Aussprachehilfen, Beispielwörtern und Studio-Audio'
          };
        case 'id':
          return {
            title: 'Alfabet Jerman',
            subtitle: '30 huruf (termasuk Ä, Ö, Ü, ß) dengan panduan pelafalan dan audio studio'
          };
        case 'tr':
          return {
            title: 'Alman Alfabesi',
            subtitle: 'Telaffuz rehberi, örnek kelimeler ve stüdyo sesiyle 30 harf (Ä, Ö, Ü, ß dahil)'
          };
        case 'en':
        default:
          return {
            title: 'German Alphabet',
            subtitle: '30 letters (including Ä, Ö, Ü, ß) with pronunciation guides, example vocabulary, and native studio audio'
          };
      }
    }

    if (targetLang === 'id') {
      switch (baseLang) {
        case 'ru':
          return {
            title: 'Индонезийский алфавит',
            subtitle: '26 букв с правилами произношения, примерами слов и студийным аудио'
          };
        case 'es':
          return {
            title: 'Alfabeto indonesio',
            subtitle: '26 letras con guías de pronunciación, vocabulario de ejemplo y audio nativo'
          };
        case 'fr':
          return {
            title: 'Alphabet indonésien',
            subtitle: '26 lettres avec guides de prononciation, vocabulaire et audio natif'
          };
        case 'pt':
          return {
            title: 'Alfabeto indonésio',
            subtitle: '26 letras com guias de pronúncia, vocabulário de exemplo e áudio nativo'
          };
        case 'de':
          return {
            title: 'Indonesisches Alphabet',
            subtitle: '26 Buchstaben mit Aussprachehilfen, Beispielwörtern und Studio-Audio'
          };
        case 'id':
          return {
            title: 'Alfabet Bahasa Indonesia',
            subtitle: '26 huruf dengan panduan pelafalan, kosakata contoh, dan audio studio'
          };
        case 'tr':
          return {
            title: 'Endonezce Alfabesi',
            subtitle: 'Telaffuz rehberi, örnek kelimeler ve stüdyo sesiyle 26 harf'
          };
        case 'en':
        default:
          return {
            title: 'Indonesian Alphabet',
            subtitle: '26 letters with pronunciation guides, example vocabulary, and native studio audio'
          };
      }
    }

    if (targetLang === 'tr') {
      switch (baseLang) {
        case 'ru':
          return {
            title: 'Турецкий алфавит',
            subtitle: '29 букв (включая Ç, Ğ, I/ı, İ/i, Ö, Ş, Ü) с произношением и студийным аудио'
          };
        case 'es':
          return {
            title: 'Alfabeto turco',
            subtitle: '29 letras (incluyendo Ç, Ğ, I/ı, İ/i, Ö, Ş, Ü) con guías de pronunciación y audio nativo'
          };
        case 'fr':
          return {
            title: 'Alphabet turc',
            subtitle: '29 lettres (dont Ç, Ğ, I/ı, İ/i, Ö, Ş, Ü) avec guides de prononciation et audio natif'
          };
        case 'pt':
          return {
            title: 'Alfabeto turco',
            subtitle: '29 letras (incluindo Ç, Ğ, I/ı, İ/i, Ö, Ş, Ü) com guias de pronúncia e áudio nativo'
          };
        case 'de':
          return {
            title: 'Türkisches Alphabet',
            subtitle: '29 Buchstaben (inkl. Ç, Ğ, I/ı, İ/i, Ö, Ş, Ü) mit Aussprachehilfen und Studio-Audio'
          };
        case 'id':
          return {
            title: 'Alfabet Turki',
            subtitle: '29 huruf (termasuk Ç, Ğ, I/ı, İ/i, Ö, Ş, Ü) dengan panduan pelafalan dan audio studio'
          };
        case 'tr':
          return {
            title: 'Türk Alfabesi',
            subtitle: 'Telaffuz rehberi, örnek kelimeler ve stüdyo sesiyle 29 harf (Ç, Ğ, I/ı, İ/i, Ö, Ş, Ü dahil)'
          };
        case 'en':
        default:
          return {
            title: 'Turkish Alphabet',
            subtitle: '29 letters (including Ç, Ğ, I/ı, İ/i, Ö, Ş, Ü) with pronunciation guides, example vocabulary, and native studio audio'
          };
      }
    }

    if (targetLang === 'zh') {
      switch (baseLang) {
        case 'ru':
          return {
            title: 'Китайский пиньинь и звуки (拼音)',
            subtitle: '29 звуков пиньиня (инициали и финали) с правилами произношения, иероглифами (汉字) и студийным аудио'
          };
        case 'es':
          return {
            title: 'Pinyin y sonidos del chino mandarín (拼音)',
            subtitle: '29 sonidos de pinyin (iniciales y finales) con guías de pronunciación, hanzi de ejemplo (汉字) y audio nativo'
          };
        case 'fr':
          return {
            title: 'Pinyin et sons du chinois mandarin (拼音)',
            subtitle: '29 sons pinyin (initiales et finales) avec guides de prononciation, exemples de hanzi (汉字) et audio natif'
          };
        case 'pt':
          return {
            title: 'Pinyin e sons do chinês mandarim (拼音)',
            subtitle: '29 sons de pinyin (iniciais e finais) com guias de pronúncia, exemplos em hanzi (汉字) e áudio nativo'
          };
        case 'de':
          return {
            title: 'Chinesisches Pinyin & Laute (拼音)',
            subtitle: '29 Pinyin-Laute (Anlaute & Auslaute) mit Aussprachehilfen, Hanzi-Beispielen (汉字) und Studio-Audio'
          };
        case 'id':
          return {
            title: 'Pinyin & Bunyi Bahasa Mandarin (拼音)',
            subtitle: '29 bunyi pinyin (konsonan awal & vokal akhir) dengan panduan pelafalan, contoh hanzi (汉字), dan audio studio'
          };
        case 'tr':
          return {
            title: 'Çince Pinyin ve Sesler (拼音)',
            subtitle: 'Telaffuz rehberi, örnek hanzi (汉字) ve stüdyo sesiyle 29 pinyin sesi'
          };
        case 'ar':
          return {
            title: 'نظام البينيين الصيني والأصوات (拼音)',
            subtitle: '29 صوتاً من أصوات البينيين الصينية مع قواعد النطق وأمثلة الحروف الصينية (汉字) وصوت الاستوديو'
          };
        case 'zh':
          return {
            title: '汉语拼音与发音',
            subtitle: '29个声母与韵母核心发音，配有标准例词汉字与录音棚原声'
          };
        case 'en':
        default:
          return {
            title: 'Mandarin Chinese Pinyin & Sounds (拼音)',
            subtitle: '29 core Pinyin sounds (initials & finals) with pronunciation guides, example Hanzi (汉字), and native studio audio'
          };
      }
    }
  }

  // 2. PHRASES & GREETINGS
  if (section === 'phrases') {
    const subtitleByBase: Record<SupportedLanguageId, string> = {
      en: 'Tap any card to reveal its translation and pronunciation',
      es: 'Toca cualquier tarjeta para ver su traducción y pronunciación',
      fr: 'Appuyez sur une carte pour voir sa traduction et sa prononciation',
      ru: 'Нажмите на любую карточку, чтобы увидеть перевод и произношение',
      pt: 'Toque em qualquer cartão para ver sua tradução e pronúncia',
      de: 'Tippe auf eine Karte, um Übersetzung und Aussprache anzuzeigen',
      id: 'Ketuk kartu mana saja untuk melihat terjemahan dan pelafalannya',
      tr: 'Çevirisini ve telaffuzunu görmek için herhangi bir karta dokunun',
      ja: 'カードをタップして翻訳と発音を確認できます',
      ko: '카드를 탭하여 번역과 발음을 확인하세요',
      zh: '点击卡片查看释义与标准发音',
      hi: 'अनुवाद और उच्चारण देखने के लिए किसी भी कार्ड पर टैप करें',
      ar: 'انقر على أي بطاقة لعرض الترجمة والنطق',
      bn: 'অনুবাদ এবং উচ্চারণ দেখতে যেকোনো কার্ডে ট্যাপ করুন',
      ur: 'ترجمہ اور تلفظ دیکھنے کے لیے کسی بھی کارڈ پر ٹیپ کریں'
    };

    if (targetLang === 'en') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Основные английские фразы', subtitle: subtitleByBase.ru };
        case 'es':
          return { title: 'Frases básicas en inglés', subtitle: subtitleByBase.es };
        case 'fr':
          return { title: 'Phrases de base en anglais', subtitle: subtitleByBase.fr };
        case 'pt':
          return { title: 'Frases essenciais em inglês', subtitle: subtitleByBase.pt };
        case 'de':
          return { title: 'Wichtige englische Sätze', subtitle: subtitleByBase.de };
        case 'id':
          return { title: 'Frasa Dasar Bahasa Inggris', subtitle: subtitleByBase.id };
        case 'tr':
          return { title: 'Temel İngilizce İfadeler', subtitle: subtitleByBase.tr };
        case 'en':
        default:
          return { title: 'Essential English Phrases & Greetings', subtitle: subtitleByBase.en };
      }
    }

    if (targetLang === 'ru') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Основные фразы и приветствия', subtitle: subtitleByBase.ru };
        case 'es':
          return { title: 'Frases básicas en ruso', subtitle: subtitleByBase.es };
        case 'fr':
          return { title: 'Phrases de base en russe', subtitle: subtitleByBase.fr };
        case 'pt':
          return { title: 'Frases básicas em russo', subtitle: subtitleByBase.pt };
        case 'de':
          return { title: 'Wichtige russische Sätze', subtitle: subtitleByBase.de };
        case 'id':
          return { title: 'Frasa Dasar Bahasa Rusia', subtitle: subtitleByBase.id };
        case 'tr':
          return { title: 'Temel Rusça İfadeler', subtitle: subtitleByBase.tr };
        case 'en':
        default:
          return { title: 'Basic Russian Phrases & Greetings', subtitle: subtitleByBase.en };
      }
    }

    if (targetLang === 'es') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Основные испанские фразы', subtitle: subtitleByBase.ru };
        case 'es':
          return { title: 'Frases básicas en español', subtitle: subtitleByBase.es };
        case 'fr':
          return { title: 'Phrases de base en espagnol', subtitle: subtitleByBase.fr };
        case 'pt':
          return { title: 'Frases básicas em espanhol', subtitle: subtitleByBase.pt };
        case 'de':
          return { title: 'Wichtige spanische Sätze', subtitle: subtitleByBase.de };
        case 'id':
          return { title: 'Frasa Dasar Bahasa Spanyol', subtitle: subtitleByBase.id };
        case 'tr':
          return { title: 'Temel İspanyolca İfadeler', subtitle: subtitleByBase.tr };
        case 'en':
        default:
          return { title: 'Basic Spanish Phrases & Greetings', subtitle: subtitleByBase.en };
      }
    }

    if (targetLang === 'fr') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Основные французские фразы', subtitle: subtitleByBase.ru };
        case 'es':
          return { title: 'Frases esenciales en francés', subtitle: subtitleByBase.es };
        case 'fr':
          return { title: 'Phrases de base en français', subtitle: subtitleByBase.fr };
        case 'pt':
          return { title: 'Frases essenciais em francês', subtitle: subtitleByBase.pt };
        case 'de':
          return { title: 'Wichtige französische Sätze', subtitle: subtitleByBase.de };
        case 'id':
          return { title: 'Frasa Dasar Bahasa Prancis', subtitle: subtitleByBase.id };
        case 'tr':
          return { title: 'Temel Fransızca İfadeler', subtitle: subtitleByBase.tr };
        case 'en':
        default:
          return { title: 'French Essential Phrases', subtitle: subtitleByBase.en };
      }
    }

    if (targetLang === 'pt') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Основные португальские фразы', subtitle: subtitleByBase.ru };
        case 'es':
          return { title: 'Frases esenciales en portugués', subtitle: subtitleByBase.es };
        case 'fr':
          return { title: 'Phrases de base en portugais', subtitle: subtitleByBase.fr };
        case 'pt':
          return { title: 'Frases básicas em português', subtitle: subtitleByBase.pt };
        case 'de':
          return { title: 'Wichtige portugiesische Sätze', subtitle: subtitleByBase.de };
        case 'id':
          return { title: 'Frasa Dasar Bahasa Portugis', subtitle: subtitleByBase.id };
        case 'tr':
          return { title: 'Temel Portekizce İfadeler', subtitle: subtitleByBase.tr };
        case 'en':
        default:
          return { title: 'Essential Portuguese Phrases & Greetings', subtitle: subtitleByBase.en };
      }
    }

    if (targetLang === 'de') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Основные немецкие фразы', subtitle: subtitleByBase.ru };
        case 'es':
          return { title: 'Frases esenciales en alemán', subtitle: subtitleByBase.es };
        case 'fr':
          return { title: 'Phrases de base en allemand', subtitle: subtitleByBase.fr };
        case 'pt':
          return { title: 'Frases essenciais em alemão', subtitle: subtitleByBase.pt };
        case 'de':
          return { title: 'Wichtige deutsche Sätze', subtitle: subtitleByBase.de };
        case 'id':
          return { title: 'Frasa Dasar Bahasa Jerman', subtitle: subtitleByBase.id };
        case 'tr':
          return { title: 'Temel Almanca İfadeler', subtitle: subtitleByBase.tr };
        case 'en':
        default:
          return { title: 'Essential German Phrases & Greetings', subtitle: subtitleByBase.en };
      }
    }

    if (targetLang === 'id') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Основные индонезийские фразы', subtitle: subtitleByBase.ru };
        case 'es':
          return { title: 'Frases esenciales en indonesio', subtitle: subtitleByBase.es };
        case 'fr':
          return { title: 'Phrases de base en indonésien', subtitle: subtitleByBase.fr };
        case 'pt':
          return { title: 'Frases essenciais em indonésio', subtitle: subtitleByBase.pt };
        case 'de':
          return { title: 'Wichtige indonesische Sätze', subtitle: subtitleByBase.de };
        case 'id':
          return { title: 'Frasa Dasar Bahasa Indonesia', subtitle: subtitleByBase.id };
        case 'tr':
          return { title: 'Temel Endonezce İfadeler', subtitle: subtitleByBase.tr };
        case 'en':
        default:
          return { title: 'Essential Indonesian Phrases & Greetings', subtitle: subtitleByBase.en };
      }
    }

    if (targetLang === 'tr') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Основные турецкие фразы', subtitle: subtitleByBase.ru };
        case 'es':
          return { title: 'Frases esenciales en turco', subtitle: subtitleByBase.es };
        case 'fr':
          return { title: 'Phrases de base en turc', subtitle: subtitleByBase.fr };
        case 'pt':
          return { title: 'Frases essenciais em turco', subtitle: subtitleByBase.pt };
        case 'de':
          return { title: 'Wichtige türkische Sätze', subtitle: subtitleByBase.de };
        case 'id':
          return { title: 'Frasa Dasar Bahasa Turki', subtitle: subtitleByBase.id };
        case 'tr':
          return { title: 'Temel Türkçe İfadeler', subtitle: subtitleByBase.tr };
        case 'en':
        default:
          return { title: 'Essential Turkish Phrases & Greetings', subtitle: subtitleByBase.en };
      }
    }
  }

  // 3. COMMON WORDS
  if (section === 'words') {
    const subtitleByBase: Record<SupportedLanguageId, string> = {
      en: 'Tap any card to reveal its translation and pronunciation',
      es: 'Toca cualquier tarjeta para ver su traducción y pronunciación',
      fr: 'Appuyez sur une carte pour voir sa traduction et sa prononciation',
      ru: 'Нажмите на любую карточку, чтобы увидеть перевод и произношение',
      pt: 'Toque em qualquer cartão para ver sua tradução e pronúncia',
      de: 'Tippe auf eine Karte, um Übersetzung und Aussprache anzuzeigen',
      id: 'Ketuk kartu mana saja untuk melihat terjemahan dan pelafalannya',
      tr: 'Çevirisini ve telaffuzunu görmek için herhangi bir karta dokunun',
      ja: 'カードをタップして翻訳と発音を確認できます',
      ko: '카드를 탭하여 번역과 발음을 확인하세요',
      zh: '点击卡片查看释义与标准发音',
      hi: 'अनुवाद और उच्चारण देखने के लिए किसी भी कार्ड पर टैप करें',
      ar: 'انقر على أي بطاقة لعرض الترجمة والنطق',
      bn: 'অনুবাদ এবং উচ্চারণ দেখতে যেকোনো কার্ডে ট্যাপ করুন',
      ur: 'ترجمہ اور تلفظ دیکھنے کے لیے کسی بھی کارڈ پر ٹیپ کریں'
    };

    if (targetLang === 'en') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Популярные английские слова', subtitle: subtitleByBase.ru };
        case 'es':
          return { title: 'Palabras comunes en inglés', subtitle: subtitleByBase.es };
        case 'fr':
          return { title: 'Mots courants en anglais', subtitle: subtitleByBase.fr };
        case 'pt':
          return { title: 'Palavras comuns em inglês', subtitle: subtitleByBase.pt };
        case 'de':
          return { title: 'Häufige englische Wörter', subtitle: subtitleByBase.de };
        case 'id':
          return { title: 'Kosakata & Kata Umum Bahasa Inggris', subtitle: subtitleByBase.id };
        case 'tr':
          return { title: 'Yaygın İngilizce Kelimeler', subtitle: subtitleByBase.tr };
        case 'en':
        default:
          return { title: 'Common English Words & High-Frequency Vocabulary', subtitle: subtitleByBase.en };
      }
    }

    if (targetLang === 'ru') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Популярные русские слова', subtitle: subtitleByBase.ru };
        case 'es':
          return { title: 'Palabras comunes en ruso', subtitle: subtitleByBase.es };
        case 'fr':
          return { title: 'Mots courants en russe', subtitle: subtitleByBase.fr };
        case 'pt':
          return { title: 'Palavras comuns em russo', subtitle: subtitleByBase.pt };
        case 'de':
          return { title: 'Häufige russische Wörter', subtitle: subtitleByBase.de };
        case 'id':
          return { title: 'Kosakata & Kata Umum Bahasa Rusia', subtitle: subtitleByBase.id };
        case 'tr':
          return { title: 'Yaygın Rusça Kelimeler', subtitle: subtitleByBase.tr };
        case 'en':
        default:
          return { title: 'Common Russian Words & Vocabulary', subtitle: subtitleByBase.en };
      }
    }

    if (targetLang === 'es') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Популярные испанские слова', subtitle: subtitleByBase.ru };
        case 'es':
          return { title: 'Palabras comunes en español', subtitle: subtitleByBase.es };
        case 'fr':
          return { title: 'Mots courants en espagnol', subtitle: subtitleByBase.fr };
        case 'pt':
          return { title: 'Palavras comuns em espanhol', subtitle: subtitleByBase.pt };
        case 'de':
          return { title: 'Häufige spanische Wörter', subtitle: subtitleByBase.de };
        case 'id':
          return { title: 'Kosakata & Kata Umum Bahasa Spanyol', subtitle: subtitleByBase.id };
        case 'tr':
          return { title: 'Yaygın İspanyolca Kelimeler', subtitle: subtitleByBase.tr };
        case 'en':
        default:
          return { title: 'Common Spanish Words & Vocabulary', subtitle: subtitleByBase.en };
      }
    }

    if (targetLang === 'fr') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Популярные французские слова', subtitle: subtitleByBase.ru };
        case 'es':
          return { title: 'Palabras comunes en francés', subtitle: subtitleByBase.es };
        case 'fr':
          return { title: 'Mots courants en français', subtitle: subtitleByBase.fr };
        case 'pt':
          return { title: 'Palavras comuns em francês', subtitle: subtitleByBase.pt };
        case 'de':
          return { title: 'Häufige französische Wörter', subtitle: subtitleByBase.de };
        case 'id':
          return { title: 'Kosakata & Kata Umum Bahasa Prancis', subtitle: subtitleByBase.id };
        case 'tr':
          return { title: 'Yaygın Fransızca Kelimeler', subtitle: subtitleByBase.tr };
        case 'en':
        default:
          return { title: 'Common French Words & Vocabulary', subtitle: subtitleByBase.en };
      }
    }

    if (targetLang === 'pt') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Популярные португальские слова', subtitle: subtitleByBase.ru };
        case 'es':
          return { title: 'Palabras comunes en portugués', subtitle: subtitleByBase.es };
        case 'fr':
          return { title: 'Mots courants en portugais', subtitle: subtitleByBase.fr };
        case 'pt':
          return { title: 'Palavras comuns em português', subtitle: subtitleByBase.pt };
        case 'de':
          return { title: 'Häufige portugiesische Wörter', subtitle: subtitleByBase.de };
        case 'id':
          return { title: 'Kosakata & Kata Umum Bahasa Portugis', subtitle: subtitleByBase.id };
        case 'tr':
          return { title: 'Yaygın Portekizce Kelimeler', subtitle: subtitleByBase.tr };
        case 'en':
        default:
          return { title: 'Common Portuguese Words & Vocabulary', subtitle: subtitleByBase.en };
      }
    }

    if (targetLang === 'de') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Популярные немецкие слова', subtitle: subtitleByBase.ru };
        case 'es':
          return { title: 'Palabras comunes en alemán', subtitle: subtitleByBase.es };
        case 'fr':
          return { title: 'Mots courants en allemand', subtitle: subtitleByBase.fr };
        case 'pt':
          return { title: 'Palavras comuns em alemão', subtitle: subtitleByBase.pt };
        case 'de':
          return { title: 'Häufige deutsche Wörter', subtitle: subtitleByBase.de };
        case 'id':
          return { title: 'Kata Umum Bahasa Jerman', subtitle: subtitleByBase.id };
        case 'tr':
          return { title: 'Yaygın Almanca Kelimeler', subtitle: subtitleByBase.tr };
        case 'en':
        default:
          return { title: 'Common German Words & Vocabulary', subtitle: subtitleByBase.en };
      }
    }

    if (targetLang === 'id') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Популярные индонезийские слова', subtitle: subtitleByBase.ru };
        case 'es':
          return { title: 'Palabras comunes en indonesio', subtitle: subtitleByBase.es };
        case 'fr':
          return { title: 'Mots courants en indonésien', subtitle: subtitleByBase.fr };
        case 'pt':
          return { title: 'Palavras comuns em indonésio', subtitle: subtitleByBase.pt };
        case 'de':
          return { title: 'Häufige indonesische Wörter', subtitle: subtitleByBase.de };
        case 'id':
          return { title: 'Kata Umum Bahasa Indonesia', subtitle: subtitleByBase.id };
        case 'tr':
          return { title: 'Yaygın Endonezce Kelimeler', subtitle: subtitleByBase.tr };
        case 'en':
        default:
          return { title: 'Common Indonesian Words & Vocabulary', subtitle: subtitleByBase.en };
      }
    }

    if (targetLang === 'tr') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Популярные турецкие слова', subtitle: subtitleByBase.ru };
        case 'es':
          return { title: 'Palabras comunes en turco', subtitle: subtitleByBase.es };
        case 'fr':
          return { title: 'Mots courants en turc', subtitle: subtitleByBase.fr };
        case 'pt':
          return { title: 'Palavras comuns em turco', subtitle: subtitleByBase.pt };
        case 'de':
          return { title: 'Häufige türkische Wörter', subtitle: subtitleByBase.de };
        case 'id':
          return { title: 'Kata Umum Bahasa Turki', subtitle: subtitleByBase.id };
        case 'tr':
          return { title: 'Yaygın Türkçe Kelimeler', subtitle: subtitleByBase.tr };
        case 'en':
        default:
          return { title: 'Common Turkish Words & Vocabulary', subtitle: subtitleByBase.en };
      }
    }
  }

  // 4. NUMBERS
  if (section === 'numbers') {
    if (targetLang === 'id') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Индонезийские числа (0–1000)', subtitle: 'Количественные числительные с правильным произношением' };
        case 'es':
          return { title: 'Números en indonesio (0–1.000)', subtitle: 'Números cardinales con pronunciación nativa' };
        case 'fr':
          return { title: 'Nombres en indonésien (0–1 000)', subtitle: 'Nombres cardinaux avec prononciation native' };
        case 'pt':
          return { title: 'Números em indonésio (0–1.000)', subtitle: 'Números cardinais com pronúncia nativa' };
        case 'de':
          return { title: 'Indonesische Zahlen (0–1.000)', subtitle: 'Grundzahlen mit Studio-Audio' };
        case 'id':
          return { title: 'Angka Bahasa Indonesia (0–1.000)', subtitle: 'Angka kardinal dari nol hingga seribu dengan pelafalan asli' };
        case 'tr':
          return { title: 'Endonezce Sayılar (0–1.000)', subtitle: 'Sıfırdan bine kadar temel sayılar ve telaffuzları' };
        case 'en':
        default:
          return { title: 'Indonesian Numbers (0–1,000)', subtitle: 'Cardinal numbers from zero to one thousand with native pronunciation' };
      }
    }

    if (targetLang === 'tr') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Турецкие числа (0–1000)', subtitle: 'Количественные числительные с правильным произношением' };
        case 'es':
          return { title: 'Números en turco (0–1.000)', subtitle: 'Números cardinales con pronunciación nativa' };
        case 'fr':
          return { title: 'Nombres en turc (0–1 000)', subtitle: 'Nombres cardinaux avec prononciation native' };
        case 'pt':
          return { title: 'Números em turco (0–1.000)', subtitle: 'Números cardinais com pronúncia nativa' };
        case 'de':
          return { title: 'Türkische Zahlen (0–1.000)', subtitle: 'Grundzahlen mit Studio-Audio' };
        case 'id':
          return { title: 'Angka Bahasa Turki (0–1.000)', subtitle: 'Angka kardinal dari nol hingga seribu dengan pelafalan asli' };
        case 'tr':
          return { title: 'Türkçe Sayılar (0–1.000)', subtitle: 'Sıfırdan bine kadar temel sayılar ve telaffuzları' };
        case 'en':
        default:
          return { title: 'Turkish Numbers (0–1,000)', subtitle: 'Cardinal numbers from zero to one thousand with native pronunciation' };
      }
    }
    if (targetLang === 'pt') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Португальские числа (0–1000)', subtitle: 'Количественные числительные с правильным произношением' };
        case 'es':
          return { title: 'Números en portugués (0–1.000)', subtitle: 'Números cardinales con pronunciación nativa' };
        case 'fr':
          return { title: 'Nombres en portugais (0–1 000)', subtitle: 'Nombres cardinaux avec prononciation native' };
        case 'pt':
          return { title: 'Números em português (0–1.000)', subtitle: 'Números cardinais com pronúncia nativa' };
        case 'de':
          return { title: 'Portugiesische Zahlen (0–1.000)', subtitle: 'Grundzahlen mit muttersprachlicher Aussprache' };
        case 'id':
          return { title: 'Angka Bahasa Portugis (0–1.000)', subtitle: 'Angka kardinal dari nol hingga seribu dengan pelafalan asli' };
        case 'tr':
          return { title: 'Portekizce Sayılar (0–1.000)', subtitle: 'Sıfırdan bine kadar temel sayılar ve telaffuzları' };
        case 'en':
        default:
          return { title: 'Portuguese Numbers (0–1,000)', subtitle: 'Cardinal numbers from zero to one thousand with native pronunciation' };
      }
    }

    if (targetLang === 'de') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Немецкие числа (0–1000)', subtitle: 'Количественные числительные с правильным произношением' };
        case 'es':
          return { title: 'Números en alemán (0–1.000)', subtitle: 'Números cardinales con pronunciación nativa' };
        case 'fr':
          return { title: 'Nombres en allemand (0–1 000)', subtitle: 'Nombres cardinaux avec prononciation native' };
        case 'pt':
          return { title: 'Números em alemão (0–1.000)', subtitle: 'Números cardinais com pronúncia nativa' };
        case 'de':
          return { title: 'Deutsche Zahlen (0–1.000)', subtitle: 'Grundzahlen von null bis tausend mit Studio-Audio' };
        case 'id':
          return { title: 'Angka Bahasa Jerman (0–1.000)', subtitle: 'Angka kardinal dari nol hingga seribu dengan pelafalan asli' };
        case 'tr':
          return { title: 'Almanca Sayılar (0–1.000)', subtitle: 'Sıfırdan bine kadar temel sayılar ve telaffuzları' };
        case 'en':
        default:
          return { title: 'German Numbers (0–1,000)', subtitle: 'Cardinal numbers from zero to one thousand with native pronunciation' };
      }
    }
    if (targetLang === 'en') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Английские числа (0–1000)', subtitle: 'Количественные числительные с правильным произношением' };
        case 'es':
          return { title: 'Números en inglés (0–1.000)', subtitle: 'Números cardinales con pronunciación nativa' };
        case 'fr':
          return { title: 'Nombres en anglais (0–1 000)', subtitle: 'Nombres cardinaux avec prononciation native' };
        case 'pt':
          return { title: 'Números em inglês (0–1.000)', subtitle: 'Números cardinais com pronúncia nativa' };
        case 'de':
          return { title: 'Englische Zahlen (0–1.000)', subtitle: 'Grundzahlen von null bis tausend mit Studio-Audio' };
        case 'id':
          return { title: 'Angka Bahasa Inggris (0–1.000)', subtitle: 'Angka kardinal dari nol hingga seribu dengan pelafalan asli' };
        case 'tr':
          return { title: 'İngilizce Sayılar (0–1.000)', subtitle: 'Sıfırdan bine kadar temel sayılar ve telaffuzları' };
        case 'en':
        default:
          return { title: 'English Numbers (0–1,000)', subtitle: 'Cardinal numbers from zero to one thousand with native pronunciation' };
      }
    }

    if (targetLang === 'ru') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Русские числа (0–1000)', subtitle: 'Количественные числительные с правильным произношением' };
        case 'es':
          return { title: 'Números en ruso (0–1.000)', subtitle: 'Números cardinales de cero a mil con pronunciación nativa' };
        case 'fr':
          return { title: 'Nombres en russe (0–1 000)', subtitle: 'Nombres cardinaux avec prononciation native' };
        case 'pt':
          return { title: 'Números em russo (0–1.000)', subtitle: 'Números cardinais de zero a mil com pronúncia nativa' };
        case 'de':
          return { title: 'Russische Zahlen (0–1.000)', subtitle: 'Grundzahlen von null bis tausend mit Studio-Audio' };
        case 'id':
          return { title: 'Angka Bahasa Rusia (0–1.000)', subtitle: 'Angka kardinal dari nol hingga seribu dengan pelafalan asli' };
        case 'tr':
          return { title: 'Rusça Sayılar (0–1.000)', subtitle: 'Sıfırdan bine kadar temel sayılar ve telaffuzları' };
        case 'en':
        default:
          return { title: 'Russian Numbers (0–1,000)', subtitle: 'Cardinal numbers from zero to one thousand with native pronunciation' };
      }
    }

    if (targetLang === 'es') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Испанские числа (0–1000)', subtitle: 'Количественные числительные с правильным произношением' };
        case 'es':
          return { title: 'Números en español (0–1.000)', subtitle: 'Números cardinales con pronunciación nativa' };
        case 'fr':
          return { title: 'Nombres en espagnol (0–1 000)', subtitle: 'Nombres cardinaux avec prononciation native' };
        case 'pt':
          return { title: 'Números em espanhol (0–1.000)', subtitle: 'Números cardinales com pronúncia nativa' };
        case 'de':
          return { title: 'Spanische Zahlen (0–1.000)', subtitle: 'Grundzahlen von null bis tausend mit Studio-Audio' };
        case 'id':
          return { title: 'Angka Bahasa Spanyol (0–1.000)', subtitle: 'Angka kardinal dari nol hingga seribu dengan pelafalan asli' };
        case 'tr':
          return { title: 'İspanyolca Sayılar (0–1.000)', subtitle: 'Sıfırdan bine kadar temel sayılar ve telaffuzları' };
        case 'en':
        default:
          return { title: 'Spanish Numbers (0–1,000)', subtitle: 'Cardinal numbers from zero to one thousand with native pronunciation' };
      }
    }

    if (targetLang === 'fr') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Французские числа (0–1000)', subtitle: 'Количественные числительные с правильным произношением' };
        case 'es':
          return { title: 'Números en francés (0–1.000)', subtitle: 'Números cardinales con pronunciación nativa' };
        case 'fr':
          return { title: 'Nombres en français (0–1 000)', subtitle: 'Nombres cardinaux avec prononciation native' };
        case 'pt':
          return { title: 'Nombres en français (0–1 000)', subtitle: 'Nombres cardinaux avec prononciation native' };
        case 'de':
          return { title: 'Französische Zahlen (0–1.000)', subtitle: 'Grundzahlen von null bis tausend mit Studio-Audio' };
        case 'id':
          return { title: 'Angka Bahasa Prancis (0–1.000)', subtitle: 'Angka kardinal dari nol hingga seribu dengan pelafalan asli' };
        case 'tr':
          return { title: 'Fransızca Sayılar (0–1.000)', subtitle: 'Sıfırdan bine kadar temel sayılar ve telaffuzları' };
        case 'en':
        default:
          return { title: 'French Numbers (0–1,000)', subtitle: 'Cardinal numbers from zero to one thousand with native pronunciation' };
      }
    }
  }

  // 5. TIME
  if (section === 'time') {
    if (targetLang === 'en') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Время и выражения времени', subtitle: 'Часы, минуты и повседневные фразы о времени' };
        case 'es':
          return { title: 'Cómo decir la hora en inglés', subtitle: 'Aprende horas, minutos y expresiones de tiempo cotidianas' };
        case 'fr':
          return { title: 'Dire l\'heure en anglais', subtitle: 'Heures, minutes et expressions de temps quotidiennes' };
        case 'pt':
          return { title: 'Como dizer as horas em inglês', subtitle: 'Aprenda horas, minutos e expressões de tempo cotidianas' };
        case 'de':
          return { title: 'Uhrzeit auf Englisch & Ausdrücke', subtitle: 'Stunden, Minuten und alltägliche Zeitausdrücke' };
        case 'id':
          return { title: 'Waktu & Jam dalam Bahasa Inggris', subtitle: 'Pelajari jam, menit, dan ungkapan waktu sehari-hari' };
        case 'tr':
          return { title: 'İngilizce Saatler ve Zaman İfadeleri', subtitle: 'Saatleri, dakikaları ve günlük zaman ifadelerini öğrenin' };
        case 'en':
        default:
          return { title: 'English Telling Time & Expressions', subtitle: 'Learn hours, minutes, and essential daily time expressions' };
      }
    }

    if (targetLang === 'ru') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Определение времени и фразы', subtitle: 'Часы, минуты и повседневные фразы о времени' };
        case 'es':
          return { title: 'La hora en ruso y expresiones', subtitle: 'Aprende horas, minutos y expresiones de tiempo cotidianas' };
        case 'fr':
          return { title: 'Dire l\'heure en russe et expressions', subtitle: 'Heures, minutes et expressions de temps quotidiennes' };
        case 'pt':
          return { title: 'As horas em russo e expressões', subtitle: 'Aprenda horas, minutos e expressões de tempo cotidianas' };
        case 'de':
          return { title: 'Uhrzeit auf Russisch & Ausdrücke', subtitle: 'Stunden, Minuten und alltägliche Zeitausdrücke' };
        case 'id':
          return { title: 'Waktu dalam Bahasa Rusia', subtitle: 'Pelajari jam, menit, dan ungkapan waktu sehari-hari' };
        case 'tr':
          return { title: 'Rusça Saatler ve Zaman İfadeleri', subtitle: 'Saatleri, dakikaları ve günlük zaman ifadelerini öğrenin' };
        case 'en':
        default:
          return { title: 'Telling Time & Time Phrases', subtitle: 'Learn hours, minutes, and essential daily time expressions' };
      }
    }

    if (targetLang === 'es') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Определение времени на испанском', subtitle: 'Часы, минуты и повседневные фразы о времени' };
        case 'es':
          return { title: 'La hora en español y expresiones', subtitle: 'Aprende horas, minutos y expresiones de tiempo cotidianas' };
        case 'fr':
          return { title: 'Dire l\'heure en espagnol et expressions', subtitle: 'Heures, minutes et expressions de temps quotidiennes' };
        case 'pt':
          return { title: 'As horas em espanhol e expressões', subtitle: 'Aprenda horas, minutos e expressões de tempo cotidianas' };
        case 'de':
          return { title: 'Uhrzeit auf Spanisch & Ausdrücke', subtitle: 'Stunden, Minuten und alltägliche Zeitausdrücke' };
        case 'id':
          return { title: 'Waktu dalam Bahasa Spanyol', subtitle: 'Pelajari jam, menit, dan ungkapan waktu sehari-hari' };
        case 'tr':
          return { title: 'İspanyolca Saatler ve Zaman İfadeleri', subtitle: 'Saatleri, dakikaları ve günlük zaman ifadelerini öğrenin' };
        case 'en':
        default:
          return { title: 'Spanish Telling Time & Expressions', subtitle: 'Learn hours, minutes, and essential daily time expressions' };
      }
    }

    if (targetLang === 'fr') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Определение времени на французском', subtitle: 'Часы, минуты и повседневные фразы о времени' };
        case 'es':
          return { title: 'La hora en francés y expresiones', subtitle: 'Aprende horas, minutos y expresiones de tiempo cotidianas' };
        case 'fr':
          return { title: 'Dire l\'heure en français et expressions', subtitle: 'Heures, minutes et expressions de temps quotidiennes' };
        case 'pt':
          return { title: 'As horas em francês e expressões', subtitle: 'Aprenda horas, minutos e expressões de tempo cotidianas' };
        case 'de':
          return { title: 'Uhrzeit auf Französisch & Ausdrücke', subtitle: 'Stunden, Minuten und alltägliche Zeitausdrücke' };
        case 'id':
          return { title: 'Waktu dalam Bahasa Prancis', subtitle: 'Pelajari jam, menit, dan ungkapan waktu sehari-hari' };
        case 'tr':
          return { title: 'Fransızca Saatler ve Zaman İfadeleri', subtitle: 'Saatleri, dakikaları ve günlük zaman ifadelerini öğrenin' };
        case 'en':
        default:
          return { title: 'French Telling Time & Expressions', subtitle: 'Learn hours, minutes, and essential daily time expressions' };
      }
    }

    if (targetLang === 'pt') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Определение времени на португальском', subtitle: 'Часы, минуты и повседневные фразы о времени' };
        case 'es':
          return { title: 'La hora en portugués y expresiones', subtitle: 'Aprende horas, minutos y expresiones de tiempo cotidianas' };
        case 'fr':
          return { title: 'Dire l\'heure en portugais et expressions', subtitle: 'Heures, minutes et expressions de temps quotidiennes' };
        case 'pt':
          return { title: 'Como dizer as horas em português', subtitle: 'Aprenda horas, minutos e expressões de tempo cotidianas' };
        case 'de':
          return { title: 'Uhrzeit auf Portugiesisch & Ausdrücke', subtitle: 'Stunden, Minuten und alltägliche Zeitausdrücke' };
        case 'id':
          return { title: 'Waktu dalam Bahasa Portugis', subtitle: 'Pelajari jam, menit, dan ungkapan waktu sehari-hari' };
        case 'tr':
          return { title: 'Portekizce Saatler ve Zaman İfadeleri', subtitle: 'Saatleri, dakikaları ve günlük zaman ifadelerini öğrenin' };
        case 'en':
        default:
          return { title: 'Portuguese Telling Time & Expressions', subtitle: 'Learn hours, minutes, and essential daily time expressions' };
      }
    }

    if (targetLang === 'de') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Определение времени на немецком', subtitle: 'Часы, минуты и повседневные фразы о времени' };
        case 'es':
          return { title: 'La hora en alemán y expresiones', subtitle: 'Aprende horas, minutos y expresiones de tiempo cotidianas' };
        case 'fr':
          return { title: 'Dire l\'heure en allemand et expressions', subtitle: 'Heures, minutes et expressions de temps quotidiennes' };
        case 'pt':
          return { title: 'As horas em alemão e expressões', subtitle: 'Aprenda horas, minutos e expressões de tempo cotidianas' };
        case 'de':
          return { title: 'Uhrzeit auf Deutsch & Ausdrücke', subtitle: 'Stunden, Minuten und alltägliche Zeitausdrücke' };
        case 'id':
          return { title: 'Waktu dalam Bahasa Jerman', subtitle: 'Pelajari jam, menit, dan ungkapan waktu sehari-hari' };
        case 'tr':
          return { title: 'Almanca Saatler ve Zaman İfadeleri', subtitle: 'Saatleri, dakikaları ve günlük zaman ifadelerini öğrenin' };
        case 'en':
        default:
          return { title: 'German Telling Time & Expressions', subtitle: 'Learn hours, minutes, and essential daily time expressions' };
      }
    }

    if (targetLang === 'id') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Определение времени на индонезийском', subtitle: 'Часы, минуты и повседневные фразы о времени' };
        case 'es':
          return { title: 'La hora en indonesio y expresiones', subtitle: 'Aprende horas, minutos y expresiones de tiempo cotidianas' };
        case 'fr':
          return { title: 'Dire l\'heure en indonésien et expressions', subtitle: 'Heures, minutes et expressions de temps quotidiennes' };
        case 'pt':
          return { title: 'As horas em indonésio e expressões', subtitle: 'Aprenda horas, minutos e expressões de tempo cotidianas' };
        case 'de':
          return { title: 'Uhrzeit auf Indonesisch & Ausdrücke', subtitle: 'Stunden, Minuten und alltägliche Zeitausdrücke' };
        case 'id':
          return { title: 'Waktu & Jam dalam Bahasa Indonesia', subtitle: 'Pelajari jam, menit, dan ungkapan waktu sehari-hari' };
        case 'tr':
          return { title: 'Endonezce Saatler ve Zaman İfadeleri', subtitle: 'Saatleri, dakikaları ve günlük zaman ifadelerini öğrenin' };
        case 'en':
        default:
          return { title: 'Indonesian Telling Time & Expressions', subtitle: 'Learn hours, minutes, and essential daily time expressions' };
      }
    }

    if (targetLang === 'tr') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Определение времени на турецком', subtitle: 'Часы, минуты и повседневные фразы о времени' };
        case 'es':
          return { title: 'La hora en turco y expresiones', subtitle: 'Aprende horas, minutos y expresiones de tiempo cotidianas' };
        case 'fr':
          return { title: 'Dire l\'heure en turc et expressions', subtitle: 'Heures, minutes et expressions de temps quotidiennes' };
        case 'pt':
          return { title: 'As horas em turco e expressões', subtitle: 'Aprenda horas, minutos e expressões de tempo cotidianas' };
        case 'de':
          return { title: 'Uhrzeit auf Türkisch & Ausdrücke', subtitle: 'Stunden, Minuten und alltägliche Zeitausdrücke' };
        case 'id':
          return { title: 'Waktu dalam Bahasa Turki', subtitle: 'Pelajari jam, menit, dan ungkapan waktu sehari-hari' };
        case 'tr':
          return { title: 'Türkçe Saatler ve Zaman İfadeleri', subtitle: 'Saatleri, dakikaları ve günlük zaman ifadelerini öğrenin' };
        case 'en':
        default:
          return { title: 'Turkish Telling Time & Expressions', subtitle: 'Learn hours, minutes, and essential daily time expressions' };
      }
    }
  }

  // Fallback default
  return {
    title: 'Language School',
    subtitle: 'Free interactive language practice'
  };
};

const TARGET_LETTER_COUNTS: Record<SupportedLanguageId, number> = {
  en: 26, es: 27, fr: 26, ru: 33, pt: 27, de: 30, id: 26, tr: 29,
  zh: 29, ja: 46, ko: 24, hi: 46, ar: 28, bn: 50, ur: 39
};

const TARGET_ENGLISH_NAMES: Record<SupportedLanguageId, string> = {
  en: 'English', es: 'Spanish', fr: 'French', ru: 'Russian', pt: 'Portuguese',
  de: 'German', id: 'Indonesian', tr: 'Turkish', zh: 'Mandarin Chinese',
  ja: 'Japanese', ko: 'Korean', hi: 'Hindi', ar: 'Arabic', bn: 'Bengali', ur: 'Urdu'
};

const buildDynamicPageContent = (
  section: 'alphabet' | 'phrases' | 'words' | 'numbers' | 'time' | 'quiz',
  targetLang: SupportedLanguageId,
  baseLang: SupportedLanguageId
): PageContent => {
  const count = TARGET_LETTER_COUNTS[targetLang] || 26;
  const enName = TARGET_ENGLISH_NAMES[targetLang] || targetLang;
  const tName = getLocalizedLanguageName(targetLang, baseLang, enName);

  if (baseLang === 'en') {
    switch (section) {
      case 'alphabet':
        return {
          title: `${enName} Alphabet`,
          subtitle: `${count} letters with pronunciation guides, example vocabulary, and native studio audio`
        };
      case 'phrases':
        return {
          title: `Essential ${enName} Phrases & Greetings`,
          subtitle: 'Tap any card to reveal its translation and pronunciation'
        };
      case 'words':
        return {
          title: `Common ${enName} Words & High-Frequency Vocabulary`,
          subtitle: 'Tap any card to reveal its translation and pronunciation'
        };
      case 'numbers':
        return {
          title: `${enName} Numbers (0–1,000)`,
          subtitle: 'Cardinal numbers from zero to one thousand with native pronunciation'
        };
      case 'time':
        return {
          title: `${enName} Telling Time & Expressions`,
          subtitle: 'Learn hours, minutes, and essential daily time expressions'
        };
      case 'quiz':
      default:
        return {
          title: `${enName} Practice Quiz`,
          subtitle: 'Interactive vocabulary, alphabet, and listening practice'
        };
    }
  }

  const tapSubtitle: Record<SupportedLanguageId, string> = {
    en: 'Tap any card to reveal its translation and pronunciation',
    es: 'Toca cualquier tarjeta para ver su traducción y pronunciación',
    fr: 'Appuyez sur une carte pour voir sa traduction et sa prononciation',
    ru: 'Нажмите на любую карточку, чтобы увидеть перевод и произношение',
    pt: 'Toque em qualquer cartão para ver sua tradução e pronúncia',
    de: 'Tippe auf eine Karte, um Übersetzung und Aussprache anzuzeigen',
    id: 'Ketuk kartu mana saja untuk melihat terjemahan dan pelafalannya',
    tr: 'Çevirisini ve telaffuzunu görmek için herhangi bir karta dokunun',
    ja: 'カードをタップして翻訳と発音を確認できます',
    ko: '카드를 탭하여 번역과 발음을 확인하세요',
    zh: '点击卡片查看释义与标准发音',
    hi: 'अनुवाद और उच्चारण देखने के लिए किसी भी कार्ड पर टैप करें',
    ar: 'انقر على أي بطاقة لعرض الترجمة والنطق',
    bn: 'অনুবাদ এবং উচ্চারণ দেখতে যেকোনো কার্ডে ট্যাপ করুন',
    ur: 'ترجمہ اور تلفظ دیکھنے کے لیے کسی بھی کارڈ پر ٹیپ کریں'
  };

  switch (baseLang) {
    case 'es':
      if (section === 'alphabet') return { title: `Alfabeto de ${tName}`, subtitle: `${count} letras con guías de pronunciación, ejemplos y audio nativo` };
      if (section === 'phrases') return { title: `Frases básicas en ${tName}`, subtitle: tapSubtitle.es };
      if (section === 'words') return { title: `Palabras comunes en ${tName}`, subtitle: tapSubtitle.es };
      if (section === 'numbers') return { title: `Números en ${tName} (0–1.000)`, subtitle: 'Números cardinales de cero a mil con pronunciación nativa' };
      if (section === 'time') return { title: `La hora en ${tName} y expresiones`, subtitle: 'Aprende horas, minutos y expresiones de tiempo cotidianas' };
      return { title: `Cuestionario de práctica (${tName})`, subtitle: 'Práctica interactiva de vocabulario, escritura y escucha' };
    case 'fr':
      if (section === 'alphabet') return { title: `Alphabet (${tName})`, subtitle: `${count} lettres avec guides de prononciation, exemples et audio natif` };
      if (section === 'phrases') return { title: `Phrases essentielles (${tName})`, subtitle: tapSubtitle.fr };
      if (section === 'words') return { title: `Mots fréquents (${tName})`, subtitle: tapSubtitle.fr };
      if (section === 'numbers') return { title: `Nombres (${tName}) (0–1 000)`, subtitle: 'Nombres cardinaux de zéro à mille avec prononciation native' };
      if (section === 'time') return { title: `Dire l'heure (${tName})`, subtitle: 'Heures, minutes et expressions de temps quotidiennes' };
      return { title: `Quiz d'entraînement (${tName})`, subtitle: 'Entraînement interactif de vocabulaire et d\'écoute' };
    case 'ru':
      if (section === 'alphabet') return { title: `Алфавит (${tName})`, subtitle: `${count} букв и знаков с правилами произношения, примерами и аудио` };
      if (section === 'phrases') return { title: `Основные фразы (${tName})`, subtitle: tapSubtitle.ru };
      if (section === 'words') return { title: `Популярные слова (${tName})`, subtitle: tapSubtitle.ru };
      if (section === 'numbers') return { title: `Числа (${tName}) (0–1000)`, subtitle: 'Количественные числительные от нуля до тысячи с произношением' };
      if (section === 'time') return { title: `Время и фразы (${tName})`, subtitle: 'Часы, минуты и повседневные выражения времени' };
      return { title: `Практический тест (${tName})`, subtitle: 'Интерактивная тренировка слов, фраз и восприятия на слух' };
    case 'pt':
      if (section === 'alphabet') return { title: `Alfabeto (${tName})`, subtitle: `${count} letras com guias de pronúncia, vocabulário e áudio nativo` };
      if (section === 'phrases') return { title: `Frases essenciais (${tName})`, subtitle: tapSubtitle.pt };
      if (section === 'words') return { title: `Palavras comuns (${tName})`, subtitle: tapSubtitle.pt };
      if (section === 'numbers') return { title: `Números (${tName}) (0–1.000)`, subtitle: 'Números cardinais de zero a mil com pronúncia nativa' };
      if (section === 'time') return { title: `Horas e tempo (${tName})`, subtitle: 'Aprenda horas, minutos e expressões cotidianas de tempo' };
      return { title: `Quiz prático (${tName})`, subtitle: 'Prática interativa de vocabulário, escrita e escuta' };
    case 'de':
      if (section === 'alphabet') return { title: `Alphabet (${tName})`, subtitle: `${count} Zeichen mit Aussprachehilfen, Beispielwörtern und Studio-Audio` };
      if (section === 'phrases') return { title: `Wichtige Sätze (${tName})`, subtitle: tapSubtitle.de };
      if (section === 'words') return { title: `Häufige Wörter (${tName})`, subtitle: tapSubtitle.de };
      if (section === 'numbers') return { title: `Zahlen (${tName}) (0–1.000)`, subtitle: 'Grundzahlen von null bis tausend mit Studio-Audio' };
      if (section === 'time') return { title: `Uhrzeit & Ausdrücke (${tName})`, subtitle: 'Stunden, Minuten und alltägliche Zeitausdrücke' };
      return { title: `Übungsquiz (${tName})`, subtitle: 'Interaktives Vokabel-, Schreib- und Hörtraining' };
    case 'id':
      if (section === 'alphabet') return { title: `Alfabet ${tName}`, subtitle: `${count} huruf dengan panduan pelafalan, kosakata contoh, dan audio asli` };
      if (section === 'phrases') return { title: `Frasa Dasar ${tName}`, subtitle: tapSubtitle.id };
      if (section === 'words') return { title: `Kosakata Umum ${tName}`, subtitle: tapSubtitle.id };
      if (section === 'numbers') return { title: `Angka ${tName} (0–1.000)`, subtitle: 'Angka kardinal dari nol hingga seribu dengan pelafalan asli' };
      if (section === 'time') return { title: `Waktu & Jam ${tName}`, subtitle: 'Pelajari jam, menit, dan ungkapan waktu sehari-hari' };
      return { title: `Kuis Latihan ${tName}`, subtitle: 'Latihan kosakata, penulisan, dan pendengaran interaktif' };
    case 'tr':
      if (section === 'alphabet') return { title: `${tName} Alfabesi`, subtitle: `Telaffuz rehberi, örnek kelimeler ve stüdyo sesiyle ${count} harf` };
      if (section === 'phrases') return { title: `Temel ${tName} İfadeler`, subtitle: tapSubtitle.tr };
      if (section === 'words') return { title: `Yaygın ${tName} Kelimeler`, subtitle: tapSubtitle.tr };
      if (section === 'numbers') return { title: `${tName} Sayılar (0–1.000)`, subtitle: 'Sıfırdan bine kadar temel sayılar ve telaffuzları' };
      if (section === 'time') return { title: `${tName} Saatler ve Zaman İfadeleri`, subtitle: 'Saatleri, dakikaları ve günlük zaman ifadelerini öğrenin' };
      return { title: `${tName} Alıştırma Testi`, subtitle: 'Etkileşimli kelime, yazma ve dinleme pratiği' };
    case 'zh':
      if (section === 'alphabet') return { title: `${tName}字母与发音`, subtitle: `共 ${count} 个字母/核心发音，附发音指南、例词与母语录音` };
      if (section === 'phrases') return { title: `${tName}常用短语与问候`, subtitle: tapSubtitle.zh };
      if (section === 'words') return { title: `${tName}高频核心词汇`, subtitle: tapSubtitle.zh };
      if (section === 'numbers') return { title: `${tName}数字 (0–1,000)`, subtitle: '从零到一千的基础基数词与标准母语发音' };
      if (section === 'time') return { title: `${tName}时间表达与常用语`, subtitle: '学习整点、分钟及日常时间表达方式' };
      return { title: `${tName}互动测验`, subtitle: '词汇、短语、拼写与听力综合练习' };
    case 'ja':
      if (section === 'alphabet') return { title: `${tName}の文字と発音`, subtitle: `${count}文字の発音ガイド、例文単語、ネイティブ音声付き` };
      if (section === 'phrases') return { title: `${tName}の基本フレーズと挨拶`, subtitle: tapSubtitle.ja };
      if (section === 'words') return { title: `${tName}の頻出単語・語彙`, subtitle: tapSubtitle.ja };
      if (section === 'numbers') return { title: `${tName}の数字 (0–1,000)`, subtitle: '0から1,000までの基本数字とネイティブ発音' };
      if (section === 'time') return { title: `${tName}の時刻と時間表現`, subtitle: '時・分と日常でよく使う時間表現を学ぶ' };
      return { title: `${tName}練習クイズ`, subtitle: '単語・フレーズ・リスニングの対話型テスト' };
    case 'ko':
      if (section === 'alphabet') return { title: `${tName} 문자 및 발음`, subtitle: `발음 가이드, 예시 어휘 및 원어민 음성이 포함된 ${count}개 글자` };
      if (section === 'phrases') return { title: `${tName} 필수 회화 및 인사말`, subtitle: tapSubtitle.ko };
      if (section === 'words') return { title: `${tName} 핵심 빈출 단어`, subtitle: tapSubtitle.ko };
      if (section === 'numbers') return { title: `${tName} 숫자 (0–1,000)`, subtitle: '0부터 1,000까지의 기본 숫자와 원어민 발음' };
      if (section === 'time') return { title: `${tName} 시간 및 시각 표현`, subtitle: '시, 분 및 일상적인 시간 표현 배우기' };
      return { title: `${tName} 실전 퀴즈`, subtitle: '어휘, 문장 및 듣기 맞춤형 연습' };
    case 'hi':
      if (section === 'alphabet') return { title: `${tName} वर्णमाला और ध्वनियाँ`, subtitle: `उच्चारण गाइड, उदाहरण शब्दों और मूल ऑडियो के साथ ${count} अक्षर` };
      if (section === 'phrases') return { title: `${tName} के आवश्यक वाक्यांश और अभिवादन`, subtitle: tapSubtitle.hi };
      if (section === 'words') return { title: `${tName} के सामान्य शब्द और शब्दावली`, subtitle: tapSubtitle.hi };
      if (section === 'numbers') return { title: `${tName} संख्याएँ (0–1,000)`, subtitle: 'शून्य से एक हज़ार तक की संख्याएँ और शुद्ध उच्चारण' };
      if (section === 'time') return { title: `${tName} में समय बताना और समय के वाक्य`, subtitle: 'घंटे, मिनट और रोज़मर्रा के समय से जुड़े भाव सीखें' };
      return { title: `${tName} अभ्यास प्रश्नोत्तरी`, subtitle: 'शब्दावली, लेखन और श्रवण का इंटरैक्टिव अभ्यास' };
    case 'ar':
      if (section === 'alphabet') return { title: `أبجدية وأصوات ${tName}`, subtitle: `${count} حرفاً مع دليل النطق وكلمات أمثلة وتسجيل صوتي أصلي` };
      if (section === 'phrases') return { title: `العبارات والتحيات الأساسية في ${tName}`, subtitle: tapSubtitle.ar };
      if (section === 'words') return { title: `الكلمات والمفردات الشائعة في ${tName}`, subtitle: tapSubtitle.ar };
      if (section === 'numbers') return { title: `الأرقام في ${tName} (0–1,000)`, subtitle: 'الأعداد الأساسية من الصفر إلى الألف مع النطق الصحيح' };
      if (section === 'time') return { title: `الوقت والساعة في ${tName}`, subtitle: 'تعلّم الساعات والدقائق وتعبيرات الوقت اليومية' };
      return { title: `اختبار تدريب ${tName}`, subtitle: 'تدريب تفاعلي على المفردات والكتابة والاستماع' };
    case 'bn':
      if (section === 'alphabet') return { title: `${tName} বর্ণমালা ও ধ্বনি`, subtitle: `উচ্চারণ নির্দেশিকা, উদাহরণ শব্দ ও স্টুডিও অডিওসহ ${count}টি বর্ণ` };
      if (section === 'phrases') return { title: `${tName} প্রয়োজনীয় বাক্যাংশ ও অভিবাদন`, subtitle: tapSubtitle.bn };
      if (section === 'words') return { title: `${tName} সাধারণ শব্দ ও শব্দভাণ্ডার`, subtitle: tapSubtitle.bn };
      if (section === 'numbers') return { title: `${tName} সংখ্যা (০–১,০০০)`, subtitle: 'শূন্য থেকে এক হাজার পর্যন্ত সংখ্যা ও সঠিক উচ্চারণ' };
      if (section === 'time') return { title: `${tName} সময় বলা ও সময়ের বাক্য`, subtitle: 'ঘণ্টা, মিনিট এবং দৈনন্দিন সময়ের প্রকাশ শিখুন' };
      return { title: `${tName} অনুশীলন কুইজ`, subtitle: 'শব্দভাণ্ডার, লেখা এবং শোনার ইন্টারেক্টিভ অনুশীলন' };
    case 'ur':
      if (section === 'alphabet') return { title: `${tName} حروفِ تہجی اور آوازیں`, subtitle: `تلفظ کی رہنمائی، مثالی الفاظ اور مستند آڈیو کے ساتھ ${count} حروف` };
      if (section === 'phrases') return { title: `${tName} کے بنیادی جملے اور سلام`, subtitle: tapSubtitle.ur };
      if (section === 'words') return { title: `${tName} کے عام الفاظ اور ذخیرۂ الفاظ`, subtitle: tapSubtitle.ur };
      if (section === 'numbers') return { title: `${tName} اعداد (0–1,000)`, subtitle: 'صفر سے ایک ہزار تک گنتی اور مستند تلفظ' };
      if (section === 'time') return { title: `${tName} میں وقت بتانا اور وقت کے جملے`, subtitle: 'گھنٹے، منٹ اور روزمرہ وقت کے اہم جملے سیکھیں' };
      return { title: `${tName} مشقی کوئز`, subtitle: 'ذخیرۂ الفاظ، لکھنے اور سننے کی انٹرایکٹو مشق' };
    default:
      return {
        title: `${enName} Practice`,
        subtitle: tapSubtitle.en
      };
  }
};

export const getPageContent = (
  section: 'alphabet' | 'phrases' | 'words' | 'numbers' | 'time' | 'quiz',
  targetLang: SupportedLanguageId,
  baseLang: SupportedLanguageId
): PageContent => {
  const explicit = getPageContentExplicit(section, targetLang, baseLang);
  if (explicit.title === 'Language School') {
    return buildDynamicPageContent(section, targetLang, baseLang);
  }
  if (baseLang !== 'en') {
    const enDefault = getPageContentExplicit(section, targetLang, 'en');
    if (explicit.title === enDefault.title) {
      return buildDynamicPageContent(section, targetLang, baseLang);
    }
  }
  return explicit;
};

/**
 * In-card alphabet UI labels (Sound, Example, as in) in the learner's base language
 */
export const getAlphabetLabels = (baseLang: SupportedLanguageId): { sound: string; example: string; asIn: string } => {
  switch (baseLang) {
    case 'ru':
      return { sound: 'Звук:', example: 'Пример:', asIn: 'как в' };
    case 'es':
      return { sound: 'Sonido:', example: 'Ejemplo:', asIn: 'como en' };
    case 'fr':
      return { sound: 'Son:', example: 'Exemple:', asIn: 'comme dans' };
    case 'pt':
      return { sound: 'Som:', example: 'Exemplo:', asIn: 'como em' };
    case 'de':
      return { sound: 'Klang:', example: 'Beispiel:', asIn: 'wie in' };
    case 'id':
      return { sound: 'Bunyi:', example: 'Contoh:', asIn: 'seperti di' };
    case 'tr':
      return { sound: 'Ses:', example: 'Örnek:', asIn: 'örneğin:' };
    case 'ja':
      return { sound: '発音:', example: '例:', asIn: 'のように' };
    case 'ko':
      return { sound: '발음:', example: '예시:', asIn: '처럼' };
    case 'zh':
      return { sound: '发音:', example: '例词:', asIn: '类似于' };
    case 'hi':
      return { sound: 'ध्वनि:', example: 'उदाहरण:', asIn: 'जैसे' };
    case 'ar':
      return { sound: 'الصوت:', example: 'مثال:', asIn: 'كما في' };
    case 'bn':
      return { sound: 'ধ্বনি:', example: 'উদাহরণ:', asIn: 'যেমন' };
    case 'ur':
      return { sound: 'آواز:', example: 'مثال:', asIn: 'جیسے' };
    case 'en':
    default:
      return { sound: 'Sound:', example: 'Example:', asIn: 'as in' };
  }
};

/**
 * Tab labels for Numbers and Time section
 */
export const getTimeTabs = (baseLang: SupportedLanguageId) => {
  switch (baseLang) {
    case 'ru':
      return { numbers: 'Числа', time: 'Время' };
    case 'es':
      return { numbers: 'Números', time: 'La hora' };
    case 'fr':
      return { numbers: 'Nombres', time: 'L\'heure' };
    case 'pt':
      return { numbers: 'Números', time: 'As horas' };
    case 'de':
      return { numbers: 'Zahlen', time: 'Uhrzeit' };
    case 'id':
      return { numbers: 'Angka', time: 'Waktu' };
    case 'tr':
      return { numbers: 'Sayılar', time: 'Saatler' };
    case 'ja':
      return { numbers: '数字', time: '時刻' };
    case 'ko':
      return { numbers: '숫자', time: '시간 표현' };
    case 'zh':
      return { numbers: '数字', time: '时间表达' };
    case 'hi':
      return { numbers: 'संख्याएँ', time: 'समय' };
    case 'ar':
      return { numbers: 'الأرقام', time: 'الوقت' };
    case 'bn':
      return { numbers: 'সংখ্যা', time: 'সময়' };
    case 'ur':
      return { numbers: 'اعداد', time: 'وقت' };
    case 'en':
    default:
      return { numbers: 'Numbers', time: 'Telling Time' };
  }
};

/**
 * Localized Time Grammar Guide Rules for English course
 */
export const getEnglishTimeGuide = (baseLang: SupportedLanguageId): TimeGrammarGuideData => {
  switch (baseLang) {
    case 'ru':
      return {
        headerTitle: 'Правила времени в английском языке',
        rules: [
          {
            ruleBadge: 'Правило 1',
            title: 'O\'clock и точные часы',
            desc: 'Используется строго для ровного часа без минут:',
            items: [
              { label: '2:00', text: 'Two o\'clock (Два часа ровно)' },
              { label: '7:00', text: 'Seven o\'clock (Семь часов)' },
              { label: '12:00', text: 'Noon (Полдень) / Midnight (Полночь)' }
            ]
          },
          {
            ruleBadge: 'Правило 2',
            title: 'Past и To (части часа)',
            desc: 'Past — «после» (минуты от 1 до 30), To — «до» (минуты от 31 до 59):',
            items: [
              { label: ':15', text: 'Quarter past (Четверть после): Quarter past two = 2:15' },
              { label: ':30', text: 'Half past (Половина после): Half past two = 2:30' },
              { label: ':45', text: 'Quarter to (Четверть до): Quarter to three = 2:45' }
            ]
          },
          {
            ruleBadge: 'Правило 3',
            title: 'AM и PM (12-часовой формат)',
            desc: 'В английском используется 12-часовой формат с периодами суток:',
            items: [
              { label: 'AM', text: 'Утро и ночь (с 00:00 до 11:59)' },
              { label: 'PM', text: 'День и вечер (с 12:00 до 23:59)' },
              { label: 'Вопрос', text: '«What time is it?» — Сколько сейчас времени?' }
            ]
          }
        ],
        footerHint: 'Все числа и выражения времени записаны с чистым студийным произношением!'
      };
    case 'es':
      return {
        headerTitle: 'Reglas para decir la hora en inglés',
        rules: [
          {
            ruleBadge: 'Regla 1',
            title: 'O\'clock y horas en punto',
            desc: 'Se utiliza exactamente en la hora cuando no hay minutos:',
            items: [
              { label: '2:00', text: 'Two o\'clock (Las dos en punto)' },
              { label: '7:00', text: 'Seven o\'clock (Las siete en punto)' },
              { label: '12:00', text: 'Noon (Mediodía) / Midnight (Medianoche)' }
            ]
          },
          {
            ruleBadge: 'Regla 2',
            title: 'Past y To (fracciones de hora)',
            desc: 'Past = minutos pasados de la hora; To = minutos que faltan para la siguiente:',
            items: [
              { label: ':15', text: 'Quarter past (Y cuarto): Quarter past two = 2:15' },
              { label: ':30', text: 'Half past (Y media): Half past two = 2:30' },
              { label: ':45', text: 'Quarter to (Menos cuarto): Quarter to three = 2:45' }
            ]
          },
          {
            ruleBadge: 'Regla 3',
            title: 'AM vs PM (formato de 12 horas)',
            desc: 'El inglés utiliza el formato de 12 horas con divisiones del día:',
            items: [
              { label: 'AM', text: 'Mañana (desde la medianoche hasta las 11:59 AM)' },
              { label: 'PM', text: 'Tarde y noche (desde el mediodía hasta las 11:59 PM)' },
              { label: 'Pregunta', text: '«What time is it?» — ¿Qué hora es?' }
            ]
          }
        ],
        footerHint: '¡Todas las expresiones incluyen audio nativo de estudio!'
      };
    case 'fr':
      return {
        headerTitle: 'Règles pour dire l\'heure en anglais',
        rules: [
          {
            ruleBadge: 'Règle 1',
            title: 'O\'clock et les heures pile',
            desc: 'Utilisé strictement sur l\'heure lorsqu\'il n\'y a pas de minutes :',
            items: [
              { label: '2:00', text: 'Two o\'clock (Deux heures pile)' },
              { label: '7:00', text: 'Seven o\'clock (Sept heures pile)' },
              { label: '12:00', text: 'Noon (Midi) / Midnight (Minuit)' }
            ]
          },
          {
            ruleBadge: 'Règle 2',
            title: 'Past et To (fractions d\'heure)',
            desc: 'Past indique les minutes après l\'heure ; To indique les minutes avant la suivante :',
            items: [
              { label: ':15', text: 'Quarter past (Et quart) : Quarter past two = 2:15' },
              { label: ':30', text: 'Half past (Et demie) : Half past two = 2:30' },
              { label: ':45', text: 'Quarter to (Moins le quart) : Quarter to three = 2:45' }
            ]
          },
          {
            ruleBadge: 'Règle 3',
            title: 'AM vs PM (format 12 heures)',
            desc: 'L\'anglais utilise le format 12 heures avec les périodes du jour :',
            items: [
              { label: 'AM', text: 'Matin (de minuit à 11h59)' },
              { label: 'PM', text: 'Après-midi et soir (de midi à 23h59)' },
              { label: 'Question', text: '« What time is it? » — Quelle heure est-il ?' }
            ]
          }
        ],
        footerHint: 'Toutes les expressions incluent un audio de studio haute qualité !'
      };
    case 'pt':
      return {
        headerTitle: 'Regras para dizer as horas em inglês',
        rules: [
          {
            ruleBadge: 'Regra 1',
            title: 'O\'clock e horas em ponto',
            desc: 'Usado estritamente na hora quando não há minutos:',
            items: [
              { label: '2:00', text: 'Two o\'clock (Duas em ponto)' },
              { label: '7:00', text: 'Seven o\'clock (Sete em ponto)' },
              { label: '12:00', text: 'Noon (Meio-dia) / Midnight (Meia-noite)' }
            ]
          },
          {
            ruleBadge: 'Regra 2',
            title: 'Past e To (frações de hora)',
            desc: 'Past = minutos passados da hora; To = minutos que faltam para a próxima:',
            items: [
              { label: ':15', text: 'Quarter past (E quinze): Quarter past two = 2:15' },
              { label: ':30', text: 'Half past (E meia): Half past two = 2:30' },
              { label: ':45', text: 'Quarter to (Quinze para as): Quarter to three = 2:45' }
            ]
          },
          {
            ruleBadge: 'Regra 3',
            title: 'AM vs PM (formato 12 horas)',
            desc: 'O inglês usa o formato de 12 horas com divisões do dia:',
            items: [
              { label: 'AM', text: 'Manhã (da meia-noite até 11:59 AM)' },
              { label: 'PM', text: 'Tarde e noite (do meio-dia até 11:59 PM)' },
              { label: 'Pergunta', text: '«What time is it?» — Que horas são?' }
            ]
          }
        ],
        footerHint: 'Todas as expressões incluem áudio de estúdio de alta qualidade!'
      };
    case 'de':
      return {
        headerTitle: 'Regeln für die Uhrzeit im Englischen',
        rules: [
          {
            ruleBadge: 'Regel 1',
            title: 'O\'clock & Volle Stunden',
            desc: 'Wird nur zur vollen Stunde ohne Minuten verwendet:',
            items: [
              { label: '2:00', text: 'Two o\'clock (Zwei Uhr)' },
              { label: '7:00', text: 'Seven o\'clock (Sieben Uhr)' },
              { label: '12:00', text: 'Noon (Mittag) / Midnight (Mitternacht)' }
            ]
          },
          {
            ruleBadge: 'Regel 2',
            title: 'Past & To (Minuten vor und nach)',
            desc: 'Past = nach der vollen Stunde; To = vor der nächsten Stunde:',
            items: [
              { label: ':15', text: 'Quarter past (Viertel nach): Quarter past two = 2:15' },
              { label: ':30', text: 'Half past (Halb nach): Half past two = 2:30' },
              { label: ':45', text: 'Quarter to (Viertel vor): Quarter to three = 2:45' }
            ]
          },
          {
            ruleBadge: 'Regel 3',
            title: 'AM vs PM (12-Stunden-Format)',
            desc: 'Im Englischen wird das 12-Stunden-Format verwendet:',
            items: [
              { label: 'AM', text: 'Morgen/Vormittag (00:00 bis 11:59 Uhr)' },
              { label: 'PM', text: 'Nachmittag/Abend (12:00 bis 23:59 Uhr)' },
              { label: 'Frage', text: '«What time is it?» — Wie spät ist es?' }
            ]
          }
        ],
        footerHint: 'Alle Ausdrücke verfügen über klares Studio-Audio!'
      };
    case 'id':
      return {
        headerTitle: 'Aturan Menyatakan Waktu dalam Bahasa Inggris',
        rules: [
          {
            ruleBadge: 'Aturan 1',
            title: 'O\'clock & Jam Tepat',
            desc: 'Digunakan khusus untuk jam tepat tanpa menit tambahan:',
            items: [
              { label: '2:00', text: 'Two o\'clock (Tepat jam dua)' },
              { label: '7:00', text: 'Seven o\'clock (Tepat jam tujuh)' },
              { label: '12:00', text: 'Noon (Tengah hari) / Midnight (Tengah malam)' }
            ]
          },
          {
            ruleBadge: 'Aturan 2',
            title: 'Past & To (Bagian dari Jam)',
            desc: 'Past = lewat/lebih; To = kurang/menuju jam berikutnya:',
            items: [
              { label: ':15', text: 'Quarter past (Lewat seperempat): Quarter past two = 2:15' },
              { label: ':30', text: 'Half past (Lewat setengah jam): Half past two = 2:30' },
              { label: ':45', text: 'Quarter to (Kurang seperempat): Quarter to three = 2:45' }
            ]
          },
          {
            ruleBadge: 'Aturan 3',
            title: 'AM vs PM (Format 12 Jam)',
            desc: 'Bahasa Inggris menggunakan format 12 jam dengan pembagian waktu:',
            items: [
              { label: 'AM', text: 'Pagi & Dini hari (Tengah malam hingga 11:59 pagi)' },
              { label: 'PM', text: 'Siang & Malam (12:00 siang hingga 11:59 malam)' },
              { label: 'Pertanyaan', text: '«What time is it?» — Jam berapa sekarang?' }
            ]
          }
        ],
        footerHint: 'Semua angka dan ungkapan waktu dilengkapi audio studio asli!'
      };
    case 'tr':
      return {
        headerTitle: 'İngilizce Saat Söyleme Kuralları',
        rules: [
          {
            ruleBadge: 'Kural 1',
            title: 'O\'clock ve Tam Saatler',
            desc: 'Dakika olmadan tam saatlerde kullanılır:',
            items: [
              { label: '2:00', text: 'Two o\'clock (Saat tam iki)' },
              { label: '7:00', text: 'Seven o\'clock (Saat tam yedi)' },
              { label: '12:00', text: 'Noon (Öğle) / Midnight (Gece yarısı)' }
            ]
          },
          {
            ruleBadge: 'Kural 2',
            title: 'Past ve To (Geçe ve Kala)',
            desc: 'Past = geçe (1–30 dk); To = kala (31–59 dk):',
            items: [
              { label: ':15', text: 'Quarter past (Çeyrek geçe): Quarter past two = 2:15' },
              { label: ':30', text: 'Half past (Buçuk): Half past two = 2:30' },
              { label: ':45', text: 'Quarter to (Çeyrek kala): Quarter to three = 2:45' }
            ]
          },
          {
            ruleBadge: 'Kural 3',
            title: 'AM ve PM (12 Saatlik Format)',
            desc: 'İngilizce günün dilimleriyle 12 saatlik formatı kullanır:',
            items: [
              { label: 'AM', text: 'Sabah (gece yarısından 11:59\'a kadar)' },
              { label: 'PM', text: 'Öğleden sonra ve akşam (öğleden 23:59\'a kadar)' },
              { label: 'Soru', text: '«What time is it?» — Saat kaç?' }
            ]
          }
        ],
        footerHint: 'Tüm sayılar ve zaman ifadeleri stüdyo ses kaydına sahiptir!'
      };
    case 'en':
    default:
      return {
        headerTitle: 'English Telling Time Rules',
        rules: [
          {
            ruleBadge: 'Rule 1',
            title: 'O\'clock & Exact Hours',
            desc: 'Used strictly on the hour when there are no minutes:',
            items: [
              { label: '2:00', text: 'Two o\'clock' },
              { label: '7:00', text: 'Seven o\'clock' },
              { label: '12:00', text: 'Noon / Midnight' }
            ]
          },
          {
            ruleBadge: 'Rule 2',
            title: 'Past & To (Fractions of an Hour)',
            desc: 'Standard international English time expressions:',
            items: [
              { label: ':15', text: 'Quarter past (e.g. Quarter past two = 2:15)' },
              { label: ':30', text: 'Half past (e.g. Half past two = 2:30)' },
              { label: ':45', text: 'Quarter to (e.g. Quarter to three = 2:45)' }
            ]
          },
          {
            ruleBadge: 'Rule 3',
            title: 'AM vs PM',
            desc: 'English uses 12-hour format with day periods:',
            items: [
              { label: 'AM', text: 'Morning (Midnight until 11:59 AM)' },
              { label: 'PM', text: 'Afternoon & Night (Noon until 11:59 PM)' },
              { label: 'Question', text: '«What time is it?»' }
            ]
          }
        ],
        footerHint: 'All numbers and time expressions feature studio-quality native American English neural audio!'
      };
  }
};

/**
 * Localized Time Grammar Guide Rules for Russian course
 */
export const getRussianTimeGuide = (baseLang: SupportedLanguageId): TimeGrammarGuideData => {
  switch (baseLang) {
    case 'es':
      return {
        headerTitle: 'Reglas gramaticales de la hora en ruso',
        rules: [
          {
            ruleBadge: 'Regla 1',
            title: 'La regla de 1 / 2–4 / 5+ horas',
            desc: 'La palabra para «hora» cambia según el número:',
            items: [
              { label: '1', text: 'один час (nominativo singular)' },
              { label: '2, 3, 4', text: 'два, три, четыре часа (genitivo singular)' },
              { label: '5–12', text: 'пять ... двенадцать часов (genitivo plural)' }
            ]
          },
          {
            ruleBadge: 'Regla 2',
            title: 'Sin AM/PM — Momentos del día',
            desc: 'En ruso se especifica el momento del día en lugar de AM/PM:',
            items: [
              { label: 'утра', text: '8 часов утра (8:00 AM — mañana)' },
              { label: 'дня', text: '2 часа дня (2:00 PM — tarde)' },
              { label: 'вечера', text: '7 часов вечера (7:00 PM — noche/tarde)' },
              { label: 'ночи', text: '2 часа ночи (2:00 AM — madrugada)' }
            ]
          },
          {
            ruleBadge: 'Regla 3',
            title: 'Preguntar la hora',
            desc: 'Dos formas naturales de preguntar qué hora es:',
            items: [
              { label: 'Который час?', text: '«¿Qué hora es?» (La más común)' },
              { label: 'Сколько сейчас времени?', text: '«¿Cuánto tiempo es ahora?»' },
              { label: 'Во сколько?', text: '«¿A qué hora?»' }
            ]
          }
        ],
        footerHint: '¡Todas las frases incluyen audio neural nativo ruso! Toca cualquier tarjeta para ver la traducción.'
      };
    case 'fr':
      return {
        headerTitle: 'Règles pour dire l\'heure en russe',
        rules: [
          {
            ruleBadge: 'Règle 1',
            title: 'Règle des 1 / 2–4 / 5+ heures',
            desc: 'Le mot pour « heure » change selon le chiffre :',
            items: [
              { label: '1', text: 'один час (nominatif singulier)' },
              { label: '2, 3, 4', text: 'два, три, четыре часа (génitif singulier)' },
              { label: '5–12', text: 'пять ... двенадцать часов (génitif pluriel)' }
            ]
          },
          {
            ruleBadge: 'Règle 2',
            title: 'Pas d\'AM/PM — Moments de la journée',
            desc: 'Le russe précise le moment de la journée plutôt qu\'AM/PM :',
            items: [
              { label: 'утра', text: '8 часов утра (8h00 du matin)' },
              { label: 'дня', text: '2 часа дня (14h00 de l\'après-midi)' },
              { label: 'вечера', text: '7 часов вечера (19h00 du soir)' },
              { label: 'ночи', text: '2 часа ночи (2h00 de la nuit)' }
            ]
          },
          {
            ruleBadge: 'Règle 3',
            title: 'Demander l\'heure',
            desc: 'Façons naturelles de demander l\'heure :',
            items: [
              { label: 'Который час?', text: '« Quelle heure est-il ? » (Le plus courant)' },
              { label: 'Сколько сейчас времени?', text: '« Combien de temps maintenant ? »' },
              { label: 'Во сколько?', text: '« À quelle heure ? »' }
            ]
          }
        ],
        footerHint: 'Toutes les expressions incluent un audio neural natif ! Touchez une carte pour révéler la traduction.'
      };
    case 'ru':
      return {
        headerTitle: 'Правила обозначения времени в русском языке',
        rules: [
          {
            ruleBadge: 'Правило 1',
            title: 'Правило 1 / 2–4 / 5+ часов',
            desc: 'Форма слова «час» меняется в зависимости от числа:',
            items: [
              { label: '1', text: 'один час (именительный падеж)' },
              { label: '2, 3, 4', text: 'два, три, четыре часа (родительный падеж ед. ч.)' },
              { label: '5–12', text: 'пять ... двенадцать часов (родительный падеж мн. ч.)' }
            ]
          },
          {
            ruleBadge: 'Правило 2',
            title: 'Без AM/PM — Время суток',
            desc: 'Вместо AM/PM указывается время суток:',
            items: [
              { label: 'утра', text: '8 часов утра' },
              { label: 'дня', text: '2 часа дня' },
              { label: 'вечера', text: '7 часов вечера' },
              { label: 'ночи', text: '2 часа ночи' }
            ]
          },
          {
            ruleBadge: 'Правило 3',
            title: 'Как спросить время',
            desc: 'Естественные способы узнать время:',
            items: [
              { label: 'Который час?', text: 'Наиболее распространённый вопрос' },
              { label: 'Сколько сейчас времени?', text: 'Уточнение текущего времени' },
              { label: 'Во сколько?', text: 'Указание времени встречи или события' }
            ]
          }
        ],
        footerHint: 'Все фразы озвучены студийным аудио. Нажмите на карточку, чтобы открыть перевод!'
      };
    case 'pt':
      return {
        headerTitle: 'Regras da hora em russo',
        rules: [
          {
            ruleBadge: 'Regra 1',
            title: 'Regra de 1 / 2–4 / 5+ horas',
            desc: 'A palavra para «hora» muda conforme o número:',
            items: [
              { label: '1', text: 'один час (nominativo singular)' },
              { label: '2, 3, 4', text: 'два, три, четыре часа (genitivo singular)' },
              { label: '5–12', text: 'пять ... двенадцать часов (genitivo plural)' }
            ]
          },
          {
            ruleBadge: 'Regra 2',
            title: 'Sem AM/PM — Momentos do dia',
            desc: 'O russo especifica o momento do dia em vez de AM/PM:',
            items: [
              { label: 'утра', text: '8 часов утра (8:00 AM — manhã)' },
              { label: 'дня', text: '2 часа дня (2:00 PM — tarde)' },
              { label: 'вечера', text: '7 часов вечера (7:00 PM — noite)' },
              { label: 'ночи', text: '2 часа ночи (2:00 AM — madrugada)' }
            ]
          },
          {
            ruleBadge: 'Regra 3',
            title: 'Perguntar as horas',
            desc: 'Formas naturais de perguntar que horas são:',
            items: [
              { label: 'Который час?', text: '«Que horas são?» (Mais comum)' },
              { label: 'Сколько сейчас времени?', text: '«Quanto tempo é agora?»' },
              { label: 'Во сколько?', text: '«A que horas?»' }
            ]
          }
        ],
        footerHint: 'Todas as expressões incluem áudio neural nativo de estúdio!'
      };
    case 'de':
      return {
        headerTitle: 'Grammatikregeln für die Uhrzeit im Russischen',
        rules: [
          {
            ruleBadge: 'Regel 1',
            title: 'Die 1 / 2–4 / 5+ Stunden-Regel',
            desc: 'Das Wort für „Stunde“ ändert sich je nach Zahl:',
            items: [
              { label: '1', text: 'один час (Nominativ)' },
              { label: '2, 3, 4', text: 'два, три, четыре часа (Genitiv Singular)' },
              { label: '5–12', text: 'пять ... двенадцать часов (Genitiv Plural)' }
            ]
          },
          {
            ruleBadge: 'Regel 2',
            title: 'Kein AM/PM — Tageszeiten',
            desc: 'Im Russischen wird die Tageszeit statt AM/PM angegeben:',
            items: [
              { label: 'утра', text: '8 часов утра (8 Uhr morgens)' },
              { label: 'дня', text: '2 часа дня (14 Uhr nachmittags)' },
              { label: 'вечера', text: '7 часов вечера (19 Uhr abends)' },
              { label: 'ночи', text: '2 часа ночи (2 Uhr nachts)' }
            ]
          },
          {
            ruleBadge: 'Regel 3',
            title: 'Nach der Uhrzeit fragen',
            desc: 'Natürliche Fragen nach der Uhrzeit:',
            items: [
              { label: 'Который час?', text: '„Wie spät ist es?“ (Am gebräuchlichsten)' },
              { label: 'Сколько сейчас времени?', text: '„Wie viel Zeit ist es jetzt?“' },
              { label: 'Во сколько?', text: '„Um wie viel Uhr?“' }
            ]
          }
        ],
        footerHint: 'Alle Sätze verfügen über muttersprachliches russisches Audio!'
      };
    case 'id':
      return {
        headerTitle: 'Aturan Tata Bahasa Waktu dalam Bahasa Rusia',
        rules: [
          {
            ruleBadge: 'Aturan 1',
            title: 'Aturan 1 / 2–4 / 5+ Jam',
            desc: 'Kata untuk "jam" berubah sesuai angka:',
            items: [
              { label: '1', text: 'один час (nominatif tunggal)' },
              { label: '2, 3, 4', text: 'два, три, четыре часа (genitif tunggal)' },
              { label: '5–12', text: 'пять ... двенадцать часов (genitif jamak)' }
            ]
          },
          {
            ruleBadge: 'Aturan 2',
            title: 'Tanpa AM/PM — Bagian Hari',
            desc: 'Bahasa Rusia menyebutkan bagian waktu hari daripada AM/PM:',
            items: [
              { label: 'утра', text: '8 часов утра (jam 8 pagi)' },
              { label: 'дня', text: '2 часа дня (jam 2 siang)' },
              { label: 'вечера', text: '7 часов вечера (jam 7 malam)' },
              { label: 'ночи', text: '2 часа ночи (jam 2 dini hari)' }
            ]
          },
          {
            ruleBadge: 'Aturan 3',
            title: 'Menanyakan Waktu',
            desc: 'Cara alami menanyakan jam berapa sekarang:',
            items: [
              { label: 'Который час?', text: '«Jam berapa sekarang?» (Paling sering)' },
              { label: 'Сколько сейчас времени?', text: '«Berapa waktu sekarang?»' },
              { label: 'Во сколько?', text: '«Pada jam berapa?»' }
            ]
          }
        ],
        footerHint: 'Semua rekaman dilengkapi audio studio asli penutur Rusia!'
      };
    case 'tr':
      return {
        headerTitle: 'Rusça Saat Söyleme Kuralları',
        rules: [
          {
            ruleBadge: 'Kural 1',
            title: '1 / 2–4 / 5+ Saat Kuralı',
            desc: '«Saat» kelimesi sayıya göre değişir:',
            items: [
              { label: '1', text: 'один час (yalın tekil)' },
              { label: '2, 3, 4', text: 'два, три, четыре часа (ilgi tekil)' },
              { label: '5–12', text: 'пять ... двенадцать часов (ilgi çoğul)' }
            ]
          },
          {
            ruleBadge: 'Kural 2',
            title: 'AM/PM Yok — Günün Zamanı',
            desc: 'Rusça AM/PM yerine günün vaktini belirtir:',
            items: [
              { label: 'утра', text: '8 часов утра (sabah 8)' },
              { label: 'дня', text: '2 часа дня (öğleden sonra 2)' },
              { label: 'вечера', text: '7 часов вечера (akşam 7)' },
              { label: 'ночи', text: '2 часа ночи (gece 2)' }
            ]
          },
          {
            ruleBadge: 'Kural 3',
            title: 'Saati Sorma',
            desc: 'Saati sormanın doğal yolları:',
            items: [
              { label: 'Который час?', text: '«Saat kaç?» (En yaygın)' },
              { label: 'Сколько сейчас времени?', text: '«Şu an saat kaç?»' },
              { label: 'Во сколько?', text: '«Saat kaçta?»' }
            ]
          }
        ],
        footerHint: 'Tüm ifadeler stüdyo kalitesinde Rusça nöral ses içerir!'
      };
    case 'en':
    default:
      return {
        headerTitle: 'Russian Time Grammar Rules',
        rules: [
          {
            ruleBadge: 'Rule 1',
            title: 'The 1 / 2–4 / 5+ Hour Rule',
            desc: 'The word for "hour" changes based on the number:',
            items: [
              { label: '1', text: 'один час (nominative)' },
              { label: '2, 3, 4', text: 'два, три, четыре часа (genitive singular)' },
              { label: '5–12', text: 'пять ... двенадцать часов (genitive plural)' }
            ]
          },
          {
            ruleBadge: 'Rule 2',
            title: 'No AM / PM — Use Times of Day',
            desc: 'Russian specifies the time of day instead of AM/PM:',
            items: [
              { label: 'утра', text: '8 часов утра (8:00 AM — morning)' },
              { label: 'дня', text: '2 часа дня (2:00 PM — afternoon)' },
              { label: 'вечера', text: '7 часов вечера (7:00 PM — evening)' },
              { label: 'ночи', text: '2 часа ночи (2:00 AM — night)' }
            ]
          },
          {
            ruleBadge: 'Rule 3',
            title: 'Asking the Time',
            desc: 'Natural ways to ask what time it is:',
            items: [
              { label: 'Который час?', text: 'Lit. "Which hour?" (Most common)' },
              { label: 'Сколько сейчас времени?', text: '"How much time is it now?"' },
              { label: 'Во сколько?', text: '"At what time?"' }
            ]
          }
        ],
        footerHint: 'All phrases below feature native Russian neural audio recordings. Tap any card to reveal phonetics and translation!'
      };
  }
};

/**
 * Localizes the top-level app title (e.g. "Basic English" -> "Базовый Английский")
 * while preserving exact English strings when baseLang === 'en'.
 */
export const getLocalizedAppName = (
  targetLang: SupportedLanguageId,
  baseLang: SupportedLanguageId,
  fallbackAppName: string
): string => {
  if (baseLang === 'en') return fallbackAppName;

  const map: Record<SupportedLanguageId, Record<SupportedLanguageId, string>> = {
    ru: {
      en: 'Базовый Английский',
      es: 'Базовый Испанский',
      fr: 'Базовый Французский',
      ru: 'Базовый Русский',
      pt: 'Базовый Португальский',
      de: 'Базовый Немецкий',
      id: 'Базовый Индонезийский',
      tr: 'Базовый Турецкий',
      ja: 'Базовый Японский',
      ko: 'Базовый Корейский',
      zh: 'Базовый Китайский',
      hi: 'Базовый Хинди',
      ar: 'Базовый Арабский',
      bn: 'Базовый Бенгальский',
      ur: 'Базовый Урду',
    },
    es: {
      en: 'Inglés Básico',
      es: 'Español Básico',
      fr: 'Francés Básico',
      ru: 'Ruso Básico',
      pt: 'Portugués Básico',
      de: 'Alemán Básico',
      id: 'Indonesio Básico',
      tr: 'Turco Básico',
      ja: 'Japonés Básico',
      ko: 'Coreano Básico',
      zh: 'Chino Básico',
      hi: 'Hindi Básico',
      ar: 'Árabe Básico',
      bn: 'Bengalí Básico',
      ur: 'Urdu Básico',
    },
    fr: {
      en: 'Anglais de Base',
      es: 'Espagnol de Base',
      fr: 'Français de Base',
      ru: 'Russe de Base',
      pt: 'Portugais de Base',
      de: 'Allemand de Base',
      id: 'Indonésien de Base',
      tr: 'Turc de Base',
      ja: 'Japonais de Base',
      ko: 'Coréen de Base',
      zh: 'Chinois de Base',
      hi: 'Hindi de Base',
      ar: 'Arabe de Base',
      bn: 'Bengali de Base',
      ur: 'Ourdou de Base',
    },
    pt: {
      en: 'Inglês Básico',
      es: 'Espanhol Básico',
      fr: 'Francês Básico',
      ru: 'Russo Básico',
      pt: 'Português Básico',
      de: 'Alemão Básico',
      id: 'Indonésio Básico',
      tr: 'Turco Básico',
      ja: 'Japonês Básico',
      ko: 'Coreano Básico',
      zh: 'Chinês Básico',
      hi: 'Híndi Básico',
      ar: 'Árabe Básico',
      bn: 'Bengali Básico',
      ur: 'Urdu Básico',
    },
    de: {
      en: 'Basis-Englisch',
      es: 'Basis-Spanisch',
      fr: 'Basis-Französisch',
      ru: 'Basis-Russisch',
      pt: 'Basis-Portugiesisch',
      de: 'Basis-Deutsch',
      id: 'Basis-Indonesisch',
      tr: 'Basis-Türkisch',
      ja: 'Basis-Japanisch',
      ko: 'Basis-Koreanisch',
      zh: 'Basis-Chinesisch',
      hi: 'Basis-Hindi',
      ar: 'Basis-Arabisch',
      bn: 'Basis-Bengalisch',
      ur: 'Basis-Urdu',
    },
    id: {
      en: 'Bahasa Inggris Dasar',
      es: 'Bahasa Spanyol Dasar',
      fr: 'Bahasa Prancis Dasar',
      ru: 'Bahasa Rusia Dasar',
      pt: 'Bahasa Portugis Dasar',
      de: 'Bahasa Jerman Dasar',
      id: 'Bahasa Indonesia Dasar',
      tr: 'Bahasa Turki Dasar',
      ja: 'Bahasa Jepang Dasar',
      ko: 'Bahasa Korea Dasar',
      zh: 'Bahasa Mandarin Dasar',
      hi: 'Bahasa Hindi Dasar',
      ar: 'Bahasa Arab Dasar',
      bn: 'Bahasa Bengali Dasar',
      ur: 'Bahasa Urdu Dasar',
    },
    tr: {
      en: 'Temel İngilizce',
      es: 'Temel İspanyolca',
      fr: 'Temel Fransızca',
      ru: 'Temel Rusça',
      pt: 'Temel Portekizce',
      de: 'Temel Almanca',
      id: 'Temel Endonezce',
      tr: 'Temel Türkçe',
      ja: 'Temel Japonca',
      ko: 'Temel Korece',
      zh: 'Temel Çince',
      hi: 'Temel Hintçe',
      ar: 'Temel Arapça',
      bn: 'Temel Bengalce',
      ur: 'Temel Urduca',
    },
    en: {
      en: 'Basic English',
      es: 'Basic Spanish',
      fr: 'Basic French',
      ru: 'Basic Russian',
      pt: 'Basic Portuguese',
      de: 'Basic German',
      id: 'Basic Indonesian',
      tr: 'Basic Turkish',
      ja: 'Basic Japanese',
      ko: 'Basic Korean',
      zh: 'Basic Chinese',
      hi: 'Basic Hindi',
      ar: 'Basic Arabic',
      bn: 'Basic Bengali',
      ur: 'Basic Urdu',
    },
    ja: {
      en: 'ベーシック英語',
      es: 'ベーシックスペイン語',
      fr: 'ベーシックフランス語',
      ru: 'ベーシックロシア語',
      pt: 'ベーシックポルトガル語',
      de: 'ベーシックドイツ語',
      id: 'ベーシックインドネシア語',
      tr: 'ベーシックトルコ語',
      ja: 'ベーシック日本語',
      ko: 'ベーシック韓国語',
      zh: 'ベーシック中国語',
      hi: 'ベーシックヒンディー語',
      ar: 'ベーシック アラビア語',
      bn: '基本ベンガル語',
      ur: '基本ウルドゥー語',
    },
    ko: {
      en: '베이직 영어',
      es: '베이직 스페인어',
      fr: '베이직 프랑스어',
      ru: '베이직 러시아어',
      pt: '베이직 포르투갈어',
      de: '베이직 독일어',
      id: '베이직 인도네시아어',
      tr: '베이직 튀르키예어',
      ja: '베이직 일본어',
      ko: '베이직 한국어',
      zh: '베이직 중국어',
      hi: '베이직 힌디어',
      ar: '베이직 아랍어',
      bn: '기초 벵골어',
      ur: '기초 우르두어',
    },
    zh: {
      en: '基础英语',
      es: '基础西班牙语',
      fr: '基础法语',
      ru: '基础俄语',
      pt: '基础葡萄牙语',
      de: '基础德语',
      id: '基础印尼语',
      tr: '基础土耳其语',
      ja: '基础日语',
      ko: '基础韩语',
      zh: '基础中文',
      hi: '基础印地语',
      ar: '基础阿拉伯语',
      bn: '基础孟加拉语',
      ur: '基础乌尔都语',
    },
    hi: {
      en: 'बेसिक अंग्रेज़ी',
      es: 'बेसिक स्पैनिश',
      fr: 'बेसिक फ़्रेंच',
      ru: 'बेसिक रूसी',
      pt: 'बेसिक पुर्तगाली',
      de: 'बेसिक जर्मन',
      id: 'बेसिक इंडोनेशियाई',
      tr: 'बेसिक तुर्की',
      ja: 'बेसिक जापानी',
      ko: 'बेसिक कोरियाई',
      zh: 'बेसिक चीनी',
      hi: 'बेसिक हिन्दी',
      ar: 'बेसिक अरबी',
      bn: 'बेसिक बंगाली',
      ur: 'बेसिक उर्दू',
    },
    ar: {
      en: 'الإنجليزية الأساسية',
      es: 'الإسبانية الأساسية',
      fr: 'الفرنسية الأساسية',
      ru: 'الروسية الأساسية',
      pt: 'البرتغالية الأساسية',
      de: 'الألمانية الأساسية',
      id: 'الإندونيسية الأساسية',
      tr: 'التركية الأساسية',
      ja: 'اليابانية الأساسية',
      ko: 'الكورية الأساسية',
      zh: 'الصينية الأساسية',
      hi: 'الهندية الأساسية',
      ar: 'العربية الأساسية',
      bn: 'البنغالية الأساسية',
      ur: 'الأردية الأساسية',
    },
    bn: {
      en: 'বেসিক ইংলিশ',
      es: 'বেসিক স্প্যানিশ',
      fr: 'বেসিক ফরাসি',
      ru: 'বেসিক রুশ',
      pt: 'বেসিক পর্তুগিজ',
      de: 'বেসিক জার্মান',
      id: 'বেসিক ইন্দোনেশীয়',
      tr: 'বেসিক তুর্কি',
      ja: 'বেসিক জাপানি',
      ko: 'বেসিক কোরীয়',
      zh: 'বেসিক চীনা',
      hi: 'বেসিক হিন্দি',
      ar: 'বেসিক আরবি',
      bn: 'বেসিক বাংলা',
      ur: 'বেসিক উর্দু',
    },
    ur: {
      en: 'بیسک انگلش',
      es: 'بیسک ہسپانوی',
      fr: 'بیسک فرانسیسی',
      ru: 'بیسک روسی',
      pt: 'بیسک پرتگالی',
      de: 'بیسک جرمن',
      id: 'بیسک انڈونیشیائی',
      tr: 'بیسک ترکی',
      ja: 'بیسک جاپانی',
      ko: 'بیسک کوریائی',
      zh: 'بیسک چینی',
      hi: 'بیسک ہندی',
      ar: 'بیسک عربی',
      bn: 'بیسک بنگالی',
      ur: 'بیسک اردو',
    },
  };

  return map[baseLang]?.[targetLang] || fallbackAppName;
};

/**
 * Localizes a language's display name into the learner's base language.
 */
export const getLocalizedLanguageName = (
  langId: SupportedLanguageId | string,
  baseLang: SupportedLanguageId,
  fallbackName: string
): string => {
  if (baseLang === 'en') return fallbackName;

  const map: Record<SupportedLanguageId, Record<string, string>> = {
    ru: {
      en: 'Английский',
      es: 'Испанский',
      fr: 'Французский',
      ru: 'Русский',
      de: 'Немецкий',
      it: 'Итальянский',
      pt: 'Португальский',
      id: 'Индонезийский',
      tr: 'Турецкий',
      ja: 'Японский',
      zh: 'Китайский',
      ko: 'Корейский',
      hi: 'Хинди',
      ar: 'Арабский',
      bn: 'Бенгальский',
      ur: 'Урду',
    },
    es: {
      en: 'Inglés',
      es: 'Español',
      fr: 'Francés',
      ru: 'Ruso',
      de: 'Alemán',
      it: 'Italiano',
      pt: 'Portugués',
      id: 'Indonesio',
      tr: 'Turco',
      ja: 'Japonés',
      zh: 'Chino',
      ko: 'Coreano',
      hi: 'Hindi',
      ar: 'Árabe',
      bn: 'Bengalí',
      ur: 'Urdu',
    },
    fr: {
      en: 'Anglais',
      es: 'Espagnol',
      fr: 'Français',
      ru: 'Russe',
      de: 'Allemand',
      it: 'Italien',
      pt: 'Portugais',
      id: 'Indonésien',
      tr: 'Turc',
      ja: 'Japonais',
      zh: 'Chinois',
      ko: 'Coréen',
      hi: 'Hindi',
      ar: 'Arabe',
      bn: 'Bengali',
      ur: 'Ourdou',
    },
    pt: {
      en: 'Inglês',
      es: 'Espanhol',
      fr: 'Francês',
      ru: 'Russo',
      de: 'Alemão',
      it: 'Italiano',
      pt: 'Português',
      id: 'Indonésio',
      tr: 'Turco',
      ja: 'Japonês',
      zh: 'Chinês',
      ko: 'Coreano',
      hi: 'Híndi',
      ar: 'Árabe',
      bn: 'Bengali',
      ur: 'Urdu',
    },
    de: {
      en: 'Englisch',
      es: 'Spanisch',
      fr: 'Französisch',
      ru: 'Russisch',
      de: 'Deutsch',
      it: 'Italienisch',
      pt: 'Portugiesisch',
      id: 'Indonesisch',
      tr: 'Türkisch',
      ja: 'Japanisch',
      zh: 'Chinesisch',
      ko: 'Koreanisch',
      hi: 'Hindi',
      ar: 'Arabisch',
      bn: 'Bengalisch',
      ur: 'Urdu',
    },
    id: {
      en: 'Inggris',
      es: 'Spanyol',
      fr: 'Prancis',
      ru: 'Rusia',
      de: 'Jerman',
      it: 'Italia',
      pt: 'Portugis',
      id: 'Indonesia',
      tr: 'Turki',
      ja: 'Jepang',
      zh: 'Mandarin',
      ko: 'Korea',
      hi: 'Hindi',
      ar: 'Arab',
    },
    tr: {
      en: 'İngilizce',
      es: 'İspanyolca',
      fr: 'Fransızca',
      ru: 'Rusça',
      de: 'Almanca',
      it: 'İtalyanca',
      pt: 'Portekizce',
      id: 'Endonezce',
      tr: 'Türkçe',
      ja: 'Japonca',
      zh: 'Çince',
      ko: 'Korece',
      hi: 'Hintçe',
      ar: 'Arapça',
      bn: 'Bengalce',
      ur: 'Urduca',
    },
    ja: {
      en: '英語',
      es: 'スペイン語',
      fr: 'フランス語',
      ru: 'ロシア語',
      de: 'ドイツ語',
      pt: 'ポルトガル語',
      id: 'インドネシア語',
      tr: 'トルコ語',
      ja: '日本語',
      ko: '韓国語',
      zh: '中国語',
      hi: 'ヒンディー語',
      ar: 'アラビア語',
      bn: 'ベンガル語',
      ur: 'ウルドゥー語',
    },
    ko: {
      en: '영어',
      es: '스페인어',
      fr: '프랑스어',
      ru: '러시아어',
      de: '독일어',
      pt: '포르투갈어',
      id: '인도네시아어',
      tr: '튀르키예어',
      ja: '일본어',
      ko: '한국어',
      zh: '중국어',
      hi: '힌디어',
      ar: '아랍어',
      bn: '벵골어',
      ur: '우르두어',
    },
    zh: {
      en: '英语',
      es: '西班牙语',
      fr: '法语',
      ru: '俄语',
      de: '德语',
      it: '意大利语',
      pt: '葡萄牙语',
      id: '印尼语',
      tr: '土耳其语',
      ja: '日语',
      ko: '韩语',
      zh: '中文',
      hi: '印地语',
      ar: '阿拉伯语',
      bn: '孟加拉语',
      ur: '乌尔都语',
    },
    hi: {
      en: 'अंग्रेज़ी',
      es: 'स्पैनिश',
      fr: 'फ़्रेंच',
      ru: 'रूसी',
      de: 'जर्मन',
      it: 'इतालवी',
      pt: 'पुर्तगाली',
      id: 'इंडोनेशियाई',
      tr: 'तुर्की',
      ja: 'जापानी',
      ko: 'कोरियाई',
      zh: 'चीनी',
      hi: 'हिन्दी',
      ar: 'अरबी',
      bn: 'बंगाली',
      ur: 'उर्दू',
    },
    ar: {
      en: 'الإنجليزية',
      es: 'الإسبانية',
      fr: 'الفرنسية',
      ru: 'الروسية',
      de: 'الألمانية',
      it: 'الإيطالية',
      pt: 'البرتغالية',
      id: 'الإندونيسية',
      tr: 'التركية',
      ja: 'اليابانية',
      zh: 'الصينية',
      ko: 'الكورية',
      hi: 'الهندية',
      ar: 'العربية',
      bn: 'البنغالية',
      ur: 'الأردية',
    },
    bn: {
      en: 'ইংরেজি',
      es: 'স্প্যানিশ',
      fr: 'ফরাসি',
      ru: 'রুশ',
      de: 'জার্মান',
      it: 'ইতালীয়',
      pt: 'পর্তুগিজ',
      id: 'ইন্দোনেশীয়',
      tr: 'তুর্কি',
      ja: 'জাপানি',
      zh: 'চীনা',
      ko: 'কোরীয়',
      hi: 'হিন্দি',
      ar: 'আরবি',
      bn: 'বাংলা',
      ur: 'উর্দু',
    },
    ur: {
      en: 'انگریزی',
      es: 'ہسپانوی',
      fr: 'فرانسیسی',
      ru: 'روسی',
      de: 'جرمن',
      it: 'اطالوی',
      pt: 'پرتگالی',
      id: 'انڈونیشیائی',
      tr: 'ترکی',
      ja: 'جاپانی',
      zh: 'چینی',
      ko: 'کوریائی',
      hi: 'ہندی',
      ar: 'عربی',
      bn: 'بنگالی',
      ur: 'اردو',
    },
    en: {}
  };

  return map[baseLang]?.[langId] || fallbackName;
};

/**
 * Localizes category badges on phrase/word/number cards into the learner's base language.
 */
export const localizeCategoryBadge = (
  category: string | undefined,
  baseLang: SupportedLanguageId
): string | undefined => {
  if (!category) return category;

  const key = category.trim().toLowerCase();
  const map: Record<string, Partial<Record<SupportedLanguageId, string>>> = {
    'all': {
      en: 'All', es: 'Todos', fr: 'Tous', ru: 'Все', pt: 'Todos', de: 'Alle', id: 'Semua', tr: 'Tümü',
      ja: 'すべて', ko: '전체', zh: '全部', hi: 'सभी', ar: 'الكل', bn: 'সব', ur: 'تمام'
    },
    'all topics': {
      en: 'All Topics', es: 'Todos los temas', fr: 'Tous les thèmes', ru: 'Все темы', pt: 'Todos os tópicos', de: 'Alle Themen', id: 'Semua Topik', tr: 'Tüm Konular',
      ja: 'すべてのトピック', ko: '모든 주제', zh: '全部主题', hi: 'सभी विषय', ar: 'جميع المواضيع', bn: 'সব বিষয়', ur: 'تمام عنوانات'
    },
    'alphabet': {
      en: 'Alphabet', es: 'Alfabeto', fr: 'Alphabet', ru: 'Алфавит', pt: 'Alfabeto', de: 'Alphabet', id: 'Huruf', tr: 'Alfabe',
      ja: 'アルファベット', ko: '알파벳', zh: '字母表', hi: 'वर्णमाला', ar: 'الأبجدية', bn: 'বর্ণমালা', ur: 'حروف تہجی'
    },
    'basicphrases': {
      en: 'Phrases & Greetings', es: 'Frases y Saludos', fr: 'Phrases et Salutations', ru: 'Основные фразы', pt: 'Frases e Saudações', de: 'Phrasen & Grüße', id: 'Frasa & Sapaan', tr: 'İfadeler ve Selamlar',
      ja: 'フレーズと挨拶', ko: '문구 및 인사말', zh: '常用短语与问候', hi: 'वाक्यांश और अभिवादन', ar: 'عبارات وتحيات', bn: 'বাক্যাংশ ও অভিবাদন', ur: 'جملے اور سلام'
    },
    'phrases & greetings': {
      en: 'Phrases & Greetings', es: 'Frases y Saludos', fr: 'Phrases et Salutations', ru: 'Основные фразы', pt: 'Frases e Saudações', de: 'Phrasen & Grüße', id: 'Frasa & Sapaan', tr: 'İfadeler ve Selamlar',
      ja: 'フレーズと挨拶', ko: '문구 및 인사말', zh: '常用短语与问候', hi: 'वाक्यांश और अभिवादन', ar: 'عبارات وتحيات', bn: 'বাক্যাংশ ও অভিবাদন', ur: 'جملے اور سلام'
    },
    'phrases': {
      en: 'Phrases', es: 'Frases', fr: 'Phrases', ru: 'Фразы', pt: 'Frases', de: 'Phrasen', id: 'Frasa', tr: 'İfadeler',
      ja: 'フレーズ', ko: '문구', zh: '短语', hi: 'वाक्यांश', ar: 'عبارات', bn: 'বাক্যাংশ', ur: 'جملے'
    },
    'commonwords': {
      en: 'Common Words', es: 'Palabras Comunes', fr: 'Mots Fréquents', ru: 'Популярные слова', pt: 'Palavras Comuns', de: 'Häufige Wörter', id: 'Kata Umum', tr: 'Yaygın Kelimeler',
      ja: 'よく使う単語', ko: '자주 쓰는 단어', zh: '常用单词', hi: 'सामान्य शब्द', ar: 'كلمات شائعة', bn: 'সাধারণ শব্দ', ur: 'عام الفاظ'
    },
    'common words': {
      en: 'Common Words', es: 'Palabras Comunes', fr: 'Mots Fréquents', ru: 'Популярные слова', pt: 'Palavras Comuns', de: 'Häufige Wörter', id: 'Kata Umum', tr: 'Yaygın Kelimeler',
      ja: 'よく使う単語', ko: '자주 쓰는 단어', zh: '常用单词', hi: 'सामान्य शब्द', ar: 'كلمات شائعة', bn: 'সাধারণ শব্দ', ur: 'عام الفاظ'
    },
    'words': {
      en: 'Words', es: 'Palabras', fr: 'Mots', ru: 'Слова', pt: 'Palavras', de: 'Wörter', id: 'Kata-kata', tr: 'Kelimeler',
      ja: '単語', ko: '단어', zh: '词汇', hi: 'शब्द', ar: 'كلمات', bn: 'শব্দ', ur: 'الفاظ'
    },
    'numbers': {
      en: 'Numbers', es: 'Números', fr: 'Nombres', ru: 'Числа', pt: 'Números', de: 'Zahlen', id: 'Angka', tr: 'Sayılar',
      ja: '数字', ko: '숫자', zh: '数字', hi: 'संख्याएँ', ar: 'الأرقام', bn: 'সংখ্যা', ur: 'اعداد'
    },
    'time': {
      en: 'Time & Days', es: 'Hora y Días', fr: 'Heure et Jours', ru: 'Время', pt: 'Horas e Dias', de: 'Zeit & Tage', id: 'Waktu & Hari', tr: 'Zaman ve Günler',
      ja: '時間と曜日', ko: '시간 및 요일', zh: '时间与日期', hi: 'समय और दिन', ar: 'الوقت والأيام', bn: 'সময় ও দিন', ur: 'وقت اور دن'
    },
    'time & days': {
      en: 'Time & Days', es: 'Hora y Días', fr: 'Heure et Jours', ru: 'Время и дни', pt: 'Horas e Dias', de: 'Zeit & Tage', id: 'Waktu & Hari', tr: 'Zaman ve Günler',
      ja: '時間と曜日', ko: '시간 및 요일', zh: '时间与日期', hi: 'समय और दिन', ar: 'الوقت والأيام', bn: 'সময় ও দিন', ur: 'وقت اور دن'
    },
    'tech': {
      en: 'Tech & IT', es: 'Tecnología', fr: 'Tech et IT', ru: 'Технологии', pt: 'Tecnologia', de: 'Tech & IT', id: 'Teknologi & IT', tr: 'Teknoloji ve Bilişim',
      ja: 'テクノロジー・IT', ko: '기술 및 IT', zh: '科技与IT', hi: 'प्रौद्योगिकी व आईटी', ar: 'التكنولوجيا وتقنية المعلومات', bn: 'প্রযুক্তি ও আইটি', ur: 'ٹیکنالوجی اور آئی ٹی'
    },
    'business': {
      en: 'Business & Work', es: 'Negocios y Trabajo', fr: 'Affaires et Travail', ru: 'Бизнес', pt: 'Negócios e Trabalho', de: 'Wirtschaft & Büro', id: 'Bisnis & Kantor', tr: 'İş ve Ofis',
      ja: 'ビジネス・仕事', ko: '비즈니스 및 업무', zh: '商务与工作', hi: 'व्यवसाय और कार्य', ar: 'الأعمال والوظائف', bn: 'ব্যবসা ও কর্মক্ষেত্র', ur: 'کاروبار اور ملازمت'
    },
    'health': {
      en: 'Healthcare', es: 'Salud', fr: 'Santé', ru: 'Здоровье', pt: 'Saúde', de: 'Gesundheit', id: 'Kesehatan', tr: 'Sağlık',
      ja: '医療・健康', ko: '건강 및 의료', zh: '医疗健康', hi: 'स्वास्थ्य सेवा', ar: 'الرعاية الصحية', bn: 'স্বাস্থ্যসেবা', ur: 'صحت کی دیکھ بھال'
    },
    'travel': {
      en: 'Travel & Transit', es: 'Viajes y Tránsito', fr: 'Voyage et Transit', ru: 'Путешествия', pt: 'Viagem e Tránsito', de: 'Reisen & Verkehr', id: 'Perjalanan & Transportasi', tr: 'Seyahat ve Ulaşım',
      ja: '旅行と交通', ko: '여행 및 교통', zh: '旅游与交通', hi: 'यात्रा और पारगमन', ar: 'السفر والتنقل', bn: 'ভ্রমণ ও যাতায়াত', ur: 'سفر اور نقل و حمل'
    },
    'dining': {
      en: 'Food & Dining', es: 'Comida y Restaurante', fr: 'Au Restaurant', ru: 'В ресторане', pt: 'Restaurante', de: 'Im Restaurant', id: 'Restoran', tr: 'Restoran',
      ja: '食事とレストラン', ko: '음식 및 식사', zh: '餐饮美食', hi: 'खान-पान', ar: 'الطعام والمطاعم', bn: 'খাবার ও রেস্তোরাঁ', ur: 'کھانا اور ریستوراں'
    },
    'shopping': {
      en: 'Shopping & Money', es: 'Compras y Dinero', fr: 'Achats et Argent', ru: 'Покупки', pt: 'Compras e Dinheiro', de: 'Einkaufen & Geld', id: 'Belanja & Uang', tr: 'Alışveriş ve Para',
      ja: 'ショッピング・お金', ko: '쇼핑 및 돈', zh: '购物与金钱', hi: 'खरीदारी और पैसा', ar: 'التسوق والمال', bn: 'কেনাকাটা ও অর্থ', ur: 'خریداری اور رقم'
    },
    'colors': {
      en: 'Colors', es: 'Colores', fr: 'Couleurs', ru: 'Цвета', pt: 'Cores', de: 'Farben', id: 'Warna', tr: 'Renkler',
      ja: '色', ko: '색상', zh: '颜色', hi: 'रंग', ar: 'الألوان', bn: 'রং', ur: 'رنگ'
    },
    'weather': {
      en: 'Weather & Nature', es: 'Clima y Naturaleza', fr: 'Météo et Nature', ru: 'Погода', pt: 'Clima e Natureza', de: 'Wetter & Natur', id: 'Cuaca & Alam', tr: 'Hava Durumu ve Doğa',
      ja: '天気と自然', ko: '날씨 및 자연', zh: '天气与自然', hi: 'मौसम और प्रकृति', ar: 'الطقس والطبيعة', bn: 'আবহাওয়া ও প্রকৃতি', ur: 'موسم اور فطرت'
    },
    'greetings': { en: 'Greetings', es: 'Saludos', fr: 'Salutations', ru: 'Приветствия', pt: 'Saudações', de: 'Begrüßungen', id: 'Sapaan', tr: 'Selamlaşma', ja: '挨拶', ko: '인사', zh: '问候', hi: 'अभिवादन', ar: 'التحيات', bn: 'অভিবাদন', ur: 'سلام' },
    'conversation': { en: 'Conversation', es: 'Conversación', fr: 'Conversation', ru: 'Разговор', pt: 'Conversação', de: 'Gespräch', id: 'Percakapan', tr: 'Sohbet', ja: '会話', ko: '대화', zh: '对话', hi: 'बातचीत', ar: 'محادثة', bn: 'কথোপকথন', ur: 'گفتگو' },
    'introductions': { en: 'Introductions', es: 'Presentaciones', fr: 'Présentations', ru: 'Знакомство', pt: 'Apresentações', de: 'Vorstellung', id: 'Perkenalan', tr: 'Tanışma', ja: '自己紹介', ko: '소개', zh: '介绍', hi: 'परिचय', ar: 'التعارف', bn: 'পরিচিতি', ur: 'تعارف' },
    'farewells': { en: 'Farewells', es: 'Despedidas', fr: 'Au revoir', ru: 'Прощание', pt: 'Despedidas', de: 'Abschied', id: 'Perpisahan', tr: 'Vedalaşma', ja: '別れの言葉', ko: '작별', zh: '告别', hi: 'विदाई', ar: 'الوداع', bn: 'বিদায়', ur: 'الوداع' },
    'politeness': { en: 'Politeness', es: 'Cortesía', fr: 'Politesse', ru: 'Вежливость', pt: 'Cortesia', de: 'Höflichkeit', id: 'Kesopanan', tr: 'Nezaket', ja: '丁寧な表現', ko: '예절', zh: '礼貌', hi: 'विनम्रता', ar: 'اللباقة', bn: 'ভদ্রতা', ur: 'شائستگی' },
    'responses': { en: 'Responses', es: 'Respuestas', fr: 'Réponses', ru: 'Ответы', pt: 'Respostas', de: 'Antworten', id: 'Tanggapan', tr: 'Yanıtlar', ja: '返答', ko: '응답', zh: '回应', hi: 'उत्तर', ar: 'الردود', bn: 'উত্তর', ur: 'جوابات' },
    'communication': { en: 'Communication', es: 'Comunicación', fr: 'Communication', ru: 'Общение', pt: 'Comunicação', de: 'Kommunikation', id: 'Komunikasi', tr: 'İletişim', ja: 'コミュニケーション', ko: '의사소통', zh: '交流', hi: 'संचार', ar: 'التواصل', bn: 'যোগাযোগ', ur: 'رابطہ' },
    'food & drink': { en: 'Food & Drink', es: 'Comida y Bebida', fr: 'Nourriture et Boissons', ru: 'Еда и напитки', pt: 'Comida e Bebida', de: 'Essen & Trinken', id: 'Makanan & Minuman', tr: 'Yiyecek ve İçecek', ja: '飲食', ko: '음식과 음료', zh: '饮食', hi: 'भोजन और पेय', ar: 'الطعام والشراب', bn: 'খাবার ও পানীয়', ur: 'کھانا اور پینا' },
    'emergency': { en: 'Emergency', es: 'Emergencia', fr: 'Urgence', ru: 'Экстренные случаи', pt: 'Emergência', de: 'Notfall', id: 'Darurat', tr: 'Acil Durum', ja: '緊急時', ko: '비상 상황', zh: '紧急情况', hi: 'आपातकाल', ar: 'الطوارئ', bn: 'জরুরি অবস্থা', ur: 'ہنگامی صورتحال' },
    'people & family': { en: 'People & Family', es: 'Gente y Familia', fr: 'Personnes et Famille', ru: 'Люди и семья', pt: 'Pessoas e Família', de: 'Menschen & Familie', id: 'Orang & Keluarga', tr: 'İnsanlar ve Aile', ja: '人と家族', ko: '사람과 가족', zh: '人与家庭', hi: 'लोग और परिवार', ar: 'الناس والأسرة', bn: 'মানুষ ও পরিবার', ur: 'لوگ اور خاندان' },
    'people': { en: 'People', es: 'Gente', fr: 'Personnes', ru: 'Люди', pt: 'Pessoas', de: 'Menschen', id: 'Orang', tr: 'İnsanlar', ja: '人々', ko: '사람들', zh: '人物', hi: 'लोग', ar: 'الناس', bn: 'মানুষ', ur: 'لوگ' },
    'places': { en: 'Places', es: 'Lugares', fr: 'Lieux', ru: 'Места', pt: 'Lugares', de: 'Orte', id: 'Tempat', tr: 'Yerler', ja: '場所', ko: '장소', zh: '地点', hi: 'स्थान', ar: 'الأماكن', bn: 'স্থান', ur: 'مقامات' },
    'transport': { en: 'Transport', es: 'Transporte', fr: 'Transports', ru: 'Транспорт', pt: 'Transporte', de: 'Verkehr', id: 'Transportasi', tr: 'Ulaşım', ja: '交通', ko: '교통', zh: '交通', hi: 'परिवहन', ar: 'المواصلات', bn: 'পরিবহন', ur: 'نقل و حمل' },
    'everyday objects': { en: 'Everyday Objects', es: 'Objetos Cotidianos', fr: 'Objets du Quotidien', ru: 'Повседневные предметы', pt: 'Objetos do Dia a Dia', de: 'Alltagsgegenstände', id: 'Benda Sehari-hari', tr: 'Günlük Eşyalar', ja: '日常の物', ko: '일상 사물', zh: '日常物品', hi: 'दैनिक वस्तुएँ', ar: 'أشياء يومية', bn: 'দৈনন্দিন বস্তু', ur: 'روزمرہ کی اشیاء' },
    'everyday essentials': { en: 'Everyday Essentials', es: 'Esenciales Diarios', fr: 'Essentiels du Quotidien', ru: 'Повседневные вещи', pt: 'Essenciais Diários', de: 'Alltägliches', id: 'Kebutuhan Harian', tr: 'Günlük İhtiyaçlar', ja: '必需品', ko: '일상 필수품', zh: '生活必需品', hi: 'दैनिक आवश्यकताएँ', ar: 'الأساسيات اليومية', bn: 'দৈনন্দিন প্রয়োজনীয় জিনিস', ur: 'روزمرہ کی ضروریات' },
    'essentials': { en: 'Essentials', es: 'Esenciales', fr: 'Essentiels', ru: 'Основное', pt: 'Essenciais', de: 'Grundlagen', id: 'Penting', tr: 'Temel', ja: '基本事項', ko: '기본 사항', zh: '基础必备', hi: 'बुनियादी', ar: 'الأساسيات', bn: 'মৌলিক', ur: 'بنیادی باتیں' },
    'work': { en: 'Work', es: 'Trabajo', fr: 'Travail', ru: 'Работа', pt: 'Trabalho', de: 'Arbeit', id: 'Pekerjaan', tr: 'İş', ja: '仕事', ko: '일', zh: '工作', hi: 'काम', ar: 'العمل', bn: 'কাজ', ur: 'کام' },
    'finance': { en: 'Finance', es: 'Finanzas', fr: 'Finances', ru: 'Финансы', pt: 'Finanças', de: 'Finanzen', id: 'Keuangan', tr: 'Finans', ja: '金融', ko: '금융', zh: '金融', hi: 'वित्त', ar: 'المالية', bn: 'অর্থায়ন', ur: 'مالیات' },
    'time & weather': { en: 'Time & Weather', es: 'Tiempo y Clima', fr: 'Temps et Météo', ru: 'Время и погода', pt: 'Tempo e Clima', de: 'Zeit & Wetter', id: 'Waktu & Cuaca', tr: 'Zaman ve Hava', ja: '時間と天気', ko: '시간과 날씨', zh: '时间与天气', hi: 'समय और मौसम', ar: 'الوقت والطقس', bn: 'সময় ও আবহাওয়া', ur: 'وقت اور موسم' },
    'descriptions': { en: 'Descriptions', es: 'Descripciones', fr: 'Descriptions', ru: 'Описания', pt: 'Descrições', de: 'Beschreibungen', id: 'Deskripsi', tr: 'Tanımlar', ja: '描写', ko: '설명', zh: '描述', hi: 'विवरण', ar: 'الأوصاف', bn: 'বিবরণ', ur: 'اوصاف' },
    'common verbs': { en: 'Common Verbs', es: 'Verbos Comunes', fr: 'Verbes Courants', ru: 'Основные глаголы', pt: 'Verbos Comuns', de: 'Häufige Verben', id: 'Kata Kerja Umum', tr: 'Yaygın Fiiller', ja: '基本動詞', ko: '자주 쓰이는 동사', zh: '常用动词', hi: 'सामान्य क्रियाएँ', ar: 'أفعال شائعة', bn: 'সাধারণ ক্রিয়া', ur: 'عام افعال' },
    'core actions': { en: 'Core Actions', es: 'Acciones Básicas', fr: 'Actions de Base', ru: 'Основные действия', pt: 'Ações Básicas', de: 'Grundverben', id: 'Tindakan Dasar', tr: 'Temel Eylemler', ja: '基本動作', ko: '기본 동작', zh: '核心行动', hi: 'मुख्य क्रियाएँ', ar: 'الإجراءات الأساسية', bn: 'প্রধান পদক্ষেপ', ur: 'بنیادی اعمال' },
    'numbers 0-10': {
      en: 'Numbers 0-10', es: 'Números 0-10', fr: 'Nombres 0-10', ru: 'Числа 0–10', pt: 'Números 0–10', de: 'Zahlen 0–10', id: 'Angka 0–10', tr: 'Sayılar 0–10',
      ja: '数字 0〜10', ko: '숫자 0–10', zh: '数字 0–10', hi: 'संख्याएँ 0–10', ar: 'الأرقام 0–10', bn: 'সংখ্যা ০–১০', ur: 'اعداد 0–10'
    },
    'numbers 11-20': {
      en: 'Numbers 11-20', es: 'Números 11-20', fr: 'Nombres 11-20', ru: 'Числа 11–20', pt: 'Números 11–20', de: 'Zahlen 11–20', id: 'Angka 11–20', tr: 'Sayılar 11–20',
      ja: '数字 11〜20', ko: '숫자 11–20', zh: '数字 11–20', hi: 'संख्याएँ 11–20', ar: 'الأرقام 11–20', bn: 'সংখ্যা ১১–২০', ur: 'اعداد 11–20'
    },
    'tens': {
      en: 'Tens', es: 'Decenas', fr: 'Dizaines', ru: 'Десятки', pt: 'Dezenas', de: 'Zehner', id: 'Puluhan', tr: 'Onluklar',
      ja: '10の位', ko: '십 단위', zh: '整十数', hi: 'दहाई', ar: 'العشرات', bn: 'দশক', ur: 'دہائیاں'
    },
    'hundreds': {
      en: 'Hundreds', es: 'Centenas', fr: 'Centaines', ru: 'Сотни', pt: 'Centenas', de: 'Hunderter', id: 'Ratusan', tr: 'Yüzlükler',
      ja: '100の位', ko: '백 단위', zh: '整百数', hi: 'सैकड़ा', ar: 'المئات', bn: 'শতক', ur: 'سینکڑے'
    },
    'thousands': {
      en: 'Thousands', es: 'Miles', fr: 'Milliers', ru: 'Тысячи', pt: 'Milhares', de: 'Tausender', id: 'Ribuan', tr: 'Binlikler',
      ja: '1000の位', ko: '천 단위', zh: '整千数', hi: 'हज़ार', ar: 'الآلاف', bn: 'হাজার', ur: 'ہزار'
    },
    'questions': {
      en: 'Questions', es: 'Preguntas', fr: 'Questions', ru: 'Вопросы', pt: 'Perguntas', de: 'Fragen', id: 'Pertanyaan', tr: 'Sorular',
      ja: '質問', ko: '질문', zh: '疑问词与提问', hi: 'प्रश्न', ar: 'الأسئلة', bn: 'প্রশ্ন', ur: 'سوالات'
    },
    'question': {
      en: 'Questions', es: 'Preguntas', fr: 'Questions', ru: 'Вопросы', pt: 'Perguntas', de: 'Fragen', id: 'Pertanyaan', tr: 'Sorular',
      ja: '質問', ko: '질문', zh: '提问', hi: 'प्रश्न', ar: 'الأسئلة', bn: 'প্রশ্ন', ur: 'سوالات'
    },
    'hour': {
      en: 'Hour', es: 'Horas', fr: 'Heures', ru: 'Часы', pt: 'Horas', de: 'Stunden', id: 'Jam', tr: 'Saat',
      ja: '時', ko: '시', zh: '整点', hi: 'घंटा', ar: 'الساعة', bn: 'ঘণ্টা', ur: 'گھنٹہ'
    },
    'hours': {
      en: 'Hours', es: 'Horas', fr: 'Heures', ru: 'Часы', pt: 'Horas', de: 'Stunden', id: 'Jam', tr: 'Saatler',
      ja: '時間・正時', ko: '정각·시간', zh: '小时', hi: 'घंटे', ar: 'الساعات', bn: 'ঘণ্টা', ur: 'گھنٹے'
    },
    'exact hours': {
      en: 'Exact Hours', es: 'Horas en punto', fr: 'Heures piles', ru: 'Точные часы', pt: 'Horas exatas', de: 'Volle Stunden', id: 'Jam Tepat', tr: 'Tam Saatler',
      ja: 'ちょうどの時刻', ko: '정각 표현', zh: '整点表达', hi: 'ठीक घंटे', ar: 'الساعات التامة', bn: 'পূর্ণ ঘণ্টা', ur: 'پورا گھنٹہ'
    },
    'half hours': {
      en: 'Half Hours', es: 'Medias horas', fr: 'Demi-heures', ru: 'Половина часа', pt: 'Meias horas', de: 'Halbe Stunden', id: 'Setengah Jam', tr: 'Yarım Saatler',
      ja: '30分・半', ko: '30분 표현', zh: '半点表达', hi: 'साढ़े / आधा घंटा', ar: 'نصف الساعة', bn: 'আধা ঘণ্টা', ur: 'آدھا گھنٹہ'
    },
    'quarter hours': {
      en: 'Quarter Hours', es: 'Cuartos de hora', fr: 'Quarts d\'heure', ru: 'Четверти часа', pt: 'Quartos de hora', de: 'Viertelstunden', id: 'Seperempat Jam', tr: 'Çeyrek Saatler',
      ja: '15分・45分', ko: '15분·45분 표현', zh: '一刻钟表达', hi: 'सवा / पौने', ar: 'ربع الساعة', bn: 'সোয়া ও পৌনে', ur: 'سوا اور پونے'
    },
    'minutes': {
      en: 'Minutes', es: 'Minutos', fr: 'Minutes', ru: 'Минуты', pt: 'Minutos', de: 'Minuten', id: 'Menit', tr: 'Dakika',
      ja: '分', ko: '분', zh: '分钟', hi: 'मिनट', ar: 'الدقائق', bn: 'মিনিট', ur: 'منٹ'
    },
    'time asking': {
      en: 'Time Asking', es: 'Preguntar la hora', fr: 'Demander l\'heure', ru: 'Вопросы о времени', pt: 'Perguntar as horas', de: 'Nach der Zeit fragen', id: 'Menanyakan Waktu', tr: 'Saati Sorma',
      ja: '時刻を尋ねる', ko: '시간 묻기', zh: '询问时间', hi: 'समय पूछना', ar: 'السؤال عن الوقت', bn: 'সময় জিজ্ঞাসা', ur: 'وقت پوچھنا'
    },
    'time of day': {
      en: 'Time of Day', es: 'Momentos del día', fr: 'Moments de la journée', ru: 'Время суток', pt: 'Períodos do dia', de: 'Tageszeiten', id: 'Waktu Hari', tr: 'Günün Vakitleri',
      ja: '時間帯', ko: '하루의 시간대', zh: '一天中的时段', hi: 'दिन का समय', ar: 'أوقات اليوم', bn: 'দিনের সময়', ur: 'دن کے اوقات'
    },
    'special': {
      en: 'Special', es: 'Especial', fr: 'Spécial', ru: 'Особое', pt: 'Especial', de: 'Spezial', id: 'Khusus', tr: 'Özel',
      ja: '特別表現', ko: '특별 표현', zh: '特殊表达', hi: 'विशेष', ar: 'خاص', bn: 'বিশেষ', ur: 'خاص'
    },
    'mixed': {
      en: 'Mixed', es: 'Mixto', fr: 'Mixte', ru: 'Смешанный', pt: 'Misto', de: 'Gemischt', id: 'Campuran', tr: 'Karışık',
      ja: 'ミックス', ko: '혼합', zh: '综合', hi: 'मिश्रित', ar: 'مختلط', bn: 'মিশ্র', ur: 'ملا جلا'
    },
    'verbs': {
      en: 'Verbs', es: 'Verbos', fr: 'Verbes', ru: 'Глаголы', pt: 'Verbos', de: 'Verben', id: 'Kata Kerja', tr: 'Fiiller',
      ja: '動詞', ko: '동사', zh: '动词', hi: 'क्रियाएँ', ar: 'الأفعال', bn: 'ক্রিয়া', ur: 'افعال'
    },
    'calendar': {
      en: 'Calendar', es: 'Calendario', fr: 'Calendrier', ru: 'Календарь', pt: 'Calendário', de: 'Kalender', id: 'Kalender', tr: 'Takvim',
      ja: 'カレンダー・暦', ko: '달력·날짜', zh: '日历与日期', hi: 'कैलेंडर', ar: 'التقويم', bn: 'ক্যালেন্ডার', ur: 'کیلنڈر'
    },
    'family': {
      en: 'Family', es: 'Familia', fr: 'Famille', ru: 'Семья', pt: 'Família', de: 'Familie', id: 'Keluarga', tr: 'Aile',
      ja: '家族', ko: '가족', zh: '家庭', hi: 'परिवार', ar: 'الأسرة', bn: 'পরিবার', ur: 'خاندان'
    },
    'food': {
      en: 'Food', es: 'Comida', fr: 'Nourriture', ru: 'Еда', pt: 'Comida', de: 'Essen', id: 'Makanan', tr: 'Yiyecek',
      ja: '食べ物', ko: '음식', zh: '食物', hi: 'भोजन', ar: 'الطعام', bn: 'খাবার', ur: 'کھانا'
    },
    'general': {
      en: 'General', es: 'General', fr: 'Général', ru: 'Общее', pt: 'Geral', de: 'Allgemein', id: 'Umum', tr: 'Genel',
      ja: '一般', ko: '일반', zh: '通用词汇', hi: 'सामान्य', ar: 'عام', bn: 'সাধারণ', ur: 'عمومی'
    },
    'home': {
      en: 'Home', es: 'Hogar', fr: 'Maison', ru: 'Дом', pt: 'Casa', de: 'Zuhause', id: 'Rumah', tr: 'Ev',
      ja: '家・住まい', ko: '집·가정', zh: '家居', hi: 'घर', ar: 'المنزل', bn: 'বাড়ি', ur: 'گھر'
    },
    'nature': {
      en: 'Nature', es: 'Naturaleza', fr: 'Nature', ru: 'Природа', pt: 'Natureza', de: 'Natur', id: 'Alam', tr: 'Doğa',
      ja: '自然', ko: '자연', zh: '自然', hi: 'प्रकृति', ar: 'الطبيعة', bn: 'প্রকৃতি', ur: 'فطرت'
    },
    'adjectives': {
      en: 'Adjectives', es: 'Adjetivos', fr: 'Adjectifs', ru: 'Прилагательные', pt: 'Adjetivos', de: 'Adjektive', id: 'Kata Sifat', tr: 'Sıfatlar',
      ja: '形容詞', ko: '형용사', zh: '形容词', hi: 'विशेषण', ar: 'الصفات', bn: 'বিশেষণ', ur: 'صفتیں'
    },
    'animals': {
      en: 'Animals', es: 'Animales', fr: 'Animaux', ru: 'Животные', pt: 'Animais', de: 'Tiere', id: 'Hewan', tr: 'Hayvanlar',
      ja: '動物', ko: '동물', zh: '动物', hi: 'पशु-पक्षी', ar: 'الحيوانات', bn: 'প্রাণী', ur: 'جانور'
    },
    'clothing': {
      en: 'Clothing', es: 'Ropa', fr: 'Vêtements', ru: 'Одежда', pt: 'Roupas', de: 'Kleidung', id: 'Pakaian', tr: 'Giyim',
      ja: '衣類・服', ko: '의류·옷', zh: '服饰', hi: 'कपड़े', ar: 'الملابس', bn: 'পোশাক', ur: 'لباس'
    },
    'courtesy': {
      en: 'Courtesy', es: 'Cortesía', fr: 'Courtoisie', ru: 'Вежливость', pt: 'Cortesia', de: 'Höflichkeit', id: 'Sopan Santun', tr: 'Nezaket',
      ja: '礼儀・丁寧表現', ko: '예의·정중한 표현', zh: '礼貌用语', hi: 'शिष्टाचार', ar: 'المجاملة واللباقة', bn: 'সৌজন্য', ur: 'شائستگی'
    },
    'polite': {
      en: 'Polite', es: 'Cortesía', fr: 'Politesse', ru: 'Вежливость', pt: 'Cortesia', de: 'Höflich', id: 'Sopan', tr: 'Kibar İfadeler',
      ja: '丁寧表現', ko: '정중한 표현', zh: '礼貌表达', hi: 'विनम्र', ar: 'مهذب', bn: 'ভদ্রতা', ur: 'شائستہ'
    },
    'expressions': {
      en: 'Expressions', es: 'Expresiones', fr: 'Expressions', ru: 'Выражения', pt: 'Expressões', de: 'Ausdrücke', id: 'Ungkapan', tr: 'İfadeler',
      ja: '表現', ko: '관용·일상 표현', zh: '常用表达', hi: 'अभिव्यक्तियाँ', ar: 'تعبيرات', bn: 'অভিব্যক্তি', ur: 'تاثرات و محاورے'
    },
    'object': {
      en: 'Objects', es: 'Objetos', fr: 'Objets', ru: 'Предметы', pt: 'Objetos', de: 'Gegenstände', id: 'Benda', tr: 'Nesneler',
      ja: '物・アイテム', ko: '사물', zh: '物品', hi: 'वस्तुएँ', ar: 'الأشياء', bn: 'বস্তু', ur: 'اشیاء'
    },
    'place': {
      en: 'Places', es: 'Lugares', fr: 'Lieux', ru: 'Места', pt: 'Lugares', de: 'Orte', id: 'Tempat', tr: 'Yerler',
      ja: '場所', ko: '장소', zh: '地点', hi: 'स्थान', ar: 'الأماكن', bn: 'স্থান', ur: 'مقامات'
    },
    'reply': {
      en: 'Replies', es: 'Respuestas', fr: 'Réponses', ru: 'Ответы', pt: 'Respostas', de: 'Antworten', id: 'Balasan', tr: 'Yanıtlar',
      ja: '返答', ko: '응답', zh: '回答', hi: 'उत्तर', ar: 'الردود', bn: 'উত্তর', ur: 'جوابات'
    }
  };

  return map[key]?.[baseLang] || category;
};

export const localizeLevelBadge = (level: 'all' | 1 | 2 | 3, baseLang: SupportedLanguageId = 'en'): string => {
  const map: Record<string, Partial<Record<SupportedLanguageId, string>>> = {
    'all': {
      en: 'All Levels',
      es: 'Todos los niveles',
      fr: 'Tous les niveaux',
      ru: 'Все уровни',
      pt: 'Todos os níveis',
      de: 'Alle Stufen',
      id: 'Semua Tingkat',
      tr: 'Tüm Seviyeler',
      ja: '全レベル',
      ko: '모든 레벨',
      zh: '全部等级',
      hi: 'सभी स्तर',
      ar: 'جميع المستويات',
      bn: 'সব স্তর',
      ur: 'تمام درجات'
    },
    '1': {
      en: 'Level 1: Foundations',
      es: 'Nivel 1: Fundamentos',
      fr: 'Niveau 1 : Fondations',
      ru: 'Уровень 1: Базовый',
      pt: 'Nível 1: Fundamentos',
      de: 'Stufe 1: Grundlagen',
      id: 'Tingkat 1: Dasar',
      tr: 'Seviye 1: Temel',
      ja: 'レベル1：基礎',
      ko: '레벨 1: 기초',
      zh: '第1级：基础入门',
      hi: 'स्तर 1: बुनियादी',
      ar: 'المستوى 1: الأساسيات',
      bn: 'স্তর ১: ভিত্তি',
      ur: 'درجہ 1: بنیادی'
    },
    '2': {
      en: 'Level 2: Workplace',
      es: 'Nivel 2: Laboral',
      fr: 'Niveau 2 : Professionnel',
      ru: 'Уровень 2: Для работы',
      pt: 'Nível 2: Trabalho',
      de: 'Stufe 2: Arbeitswelt',
      id: 'Tingkat 2: Tempat Kerja',
      tr: 'Seviye 2: İş Yeri',
      ja: 'レベル2：実務・職場',
      ko: '레벨 2: 실무·직장',
      zh: '第2级：职场应用',
      hi: 'स्तर 2: कार्यस्थल',
      ar: 'المستوى 2: بيئة العمل',
      bn: 'স্তর ২: কর্মক্ষেত্র',
      ur: 'درجہ 2: عملی و دفتری'
    },
    '3': {
      en: 'Level 3: Professional',
      es: 'Nivel 3: Profesional',
      fr: 'Niveau 3 : Avancé',
      ru: 'Уровень 3: Профессиональный',
      pt: 'Nível 3: Profissional',
      de: 'Stufe 3: Fachkompetenz',
      id: 'Tingkat 3: Mahir',
      tr: 'Seviye 3: İleri',
      ja: 'レベル3：上級・専門',
      ko: '레벨 3: 고급·전문',
      zh: '第3级：专业精通',
      hi: 'स्तर 3: व्यावसायिक',
      ar: 'المستوى 3: متقدم واحترافي',
      bn: 'স্তর ৩: পেশাদার',
      ur: 'درجہ 3: ماہرانہ'
    }
  };
  return map[String(level)]?.[baseLang] || `Level ${level}`;
};

export const getQuizToolbarLabels = (baseLang: SupportedLanguageId = 'en') => {
  const map: Record<SupportedLanguageId, { topic: string; level: string; modality: string; questionOf: (current: number, total: number) => string }> = {
    en: { topic: 'Curriculum Topic', level: 'Proficiency Level', modality: 'Practice Modality', questionOf: (c, t) => `Question ${c} of ${t}` },
    es: { topic: 'Tema del curso', level: 'Nivel de dominio', modality: 'Modalidad de práctica', questionOf: (c, t) => `Pregunta ${c} de ${t}` },
    fr: { topic: 'Thème du cours', level: 'Niveau de maîtrise', modality: 'Mode d’entraînement', questionOf: (c, t) => `Question ${c} sur ${t}` },
    ru: { topic: 'Тема курса', level: 'Уровень сложности', modality: 'Режим тренировки', questionOf: (c, t) => `Вопрос ${c} из ${t}` },
    pt: { topic: 'Tópico do curso', level: 'Nível de domínio', modality: 'Modalidade de prática', questionOf: (c, t) => `Pergunta ${c} de ${t}` },
    de: { topic: 'Themenbereich', level: 'Schwierigkeitsgrad', modality: 'Übungsmodus', questionOf: (c, t) => `Frage ${c} von ${t}` },
    id: { topic: 'Topik Materi', level: 'Tingkat Kemahiran', modality: 'Mode Latihan', questionOf: (c, t) => `Pertanyaan ${c} dari ${t}` },
    tr: { topic: 'Ders Konusu', level: 'Yeterlilik Seviyesi', modality: 'Pratik Modu', questionOf: (c, t) => `Soru ${c} / ${t}` },
    ja: { topic: '学習トピック', level: '習熟度レベル', modality: '練習モード', questionOf: (c, t) => `問題 ${c} / ${t}` },
    ko: { topic: '학습 주제', level: '난이도 수준', modality: '연습 모드', questionOf: (c, t) => `문제 ${c} / ${t}` },
    zh: { topic: '课程主题', level: '熟练度等级', modality: '练习模式', questionOf: (c, t) => `第 ${c} 题 / 共 ${t} 题` },
    hi: { topic: 'पाठ विषय', level: 'कठिनाई स्तर', modality: 'अभ्यास मोड', questionOf: (c, t) => `प्रश्न ${c} / ${t}` },
    ar: { topic: 'موضوع الدرس', level: 'مستوى الصعوبة', modality: 'نمط التدريب', questionOf: (c, t) => `السؤال ${c} من ${t}` },
    bn: { topic: 'পাঠ বিষয়', level: 'দক্ষতার স্তর', modality: 'অনুশীলন মোড', questionOf: (c, t) => `প্রশ্ন ${c} / ${t}` },
    ur: { topic: 'سبق کا عنوان', level: 'مہارت کی سطح', modality: 'مشقی طریقہ', questionOf: (c, t) => `سوال ${c} از ${t}` },
  };
  return map[baseLang] || map.en;
};

export type LanguageRegionKey = 'all' | 'romance' | 'germanic' | 'slavic-eurasian' | 'east-asian' | 'south-asian' | 'middle-eastern';

export const getLocalizedRegionName = (
  region: LanguageRegionKey,
  baseLang: SupportedLanguageId = 'en'
): string => {
  const map: Record<LanguageRegionKey, Record<SupportedLanguageId, string>> = {
    all: {
      en: 'All', es: 'Todos', fr: 'Tous', ru: 'Все', pt: 'Todos', de: 'Alle', id: 'Semua', tr: 'Tümü',
      ja: 'すべて', ko: '전체', zh: '全部', hi: 'सभी', ar: 'الكل', bn: 'সব', ur: 'تمام'
    },
    romance: {
      en: 'Romance', es: 'Románicas', fr: 'Romanes', ru: 'Романские', pt: 'Românicas', de: 'Romanisch', id: 'Romanika', tr: 'Romen',
      ja: 'ロマンス諸語', ko: '로망스어군', zh: '罗曼语族', hi: 'रोमांस भाषाएँ', ar: 'الرومانسية', bn: 'রোমান্স ভাষা', ur: 'رومانس زبانیں'
    },
    germanic: {
      en: 'Germanic', es: 'Germánicas', fr: 'Germaniques', ru: 'Германские', pt: 'Germânicas', de: 'Germanisch', id: 'Jermanik', tr: 'Cermen',
      ja: 'ゲルマン諸語', ko: '게르만어군', zh: '日耳曼语族', hi: 'जर्मनिक भाषाएँ', ar: 'الجرمانية', bn: 'জার্মানীয় ভাষা', ur: 'جرمانوی زبانیں'
    },
    'slavic-eurasian': {
      en: 'Slavic & Eurasian', es: 'Eslavas y Euroasiáticas', fr: 'Slaves et Eurasiennes', ru: 'Славянские и евразийские', pt: 'Eslavas e Eurasiáticas', de: 'Slawisch & Eurasisch', id: 'Slavia & Eurasia', tr: 'Slav ve Avrasya',
      ja: 'スラブ・ユーラシア諸語', ko: '슬라브 및 유라시아어군', zh: '斯拉夫与欧亚语系', hi: 'स्लाव और यूरेशियाई', ar: 'السلافية والأوراسية', bn: 'স্লাভিক ও ইউরেশীয়', ur: 'سلاوی اور یوریشیائی'
    },
    'east-asian': {
      en: 'East Asian', es: 'Asia Oriental', fr: 'Asie de l’Est', ru: 'Восточноазиатские', pt: 'Leste Asiático', de: 'Ostasiatisch', id: 'Asia Timur', tr: 'Doğu Asya',
      ja: '東アジア諸語', ko: '동아시아어군', zh: '东亚语系', hi: 'पूर्वी एशियाई', ar: 'شرق آسيا', bn: 'পূর্ব এশীয়', ur: 'مشرقی ایشیائی'
    },
    'south-asian': {
      en: 'South Asian', es: 'Asia Meridional', fr: 'Asie du Sud', ru: 'Южноазиатские', pt: 'Sul Asiático', de: 'Südasiatisch', id: 'Asia Selatan', tr: 'Güney Asya',
      ja: '南アジア諸語', ko: '남아시아어군', zh: '南亚语系', hi: 'दक्षिण एशियाई', ar: 'جنوب آسيا', bn: 'দক্ষিণ এশীয়', ur: 'جنوبی ایشیائی'
    },
    'middle-eastern': {
      en: 'Middle Eastern', es: 'Medio Oriente', fr: 'Moyen-Orient', ru: 'Ближневосточные', pt: 'Oriente Médio', de: 'Nahöstlich', id: 'Timur Tengah', tr: 'Orta Doğu',
      ja: '中東諸語', ko: '중동어군', zh: '中东语系', hi: 'मध्य पूर्वी', ar: 'الشرق الأوسط', bn: 'মধ্যপ্রাচ্য', ur: 'مشرق وسطیٰ'
    }
  };

  return map[region]?.[baseLang] || map[region]?.en || region;
};

export interface QuizRecapStrings {
  sessionComplete: string;
  correctRatio: (score: number, goal: number) => string;
  goal: string;
  correct: string;
  bestStreak: string;
  mastered: string;
  remaining: string;
  loggedNotice: string;
  chooseTopic: string;
  chooseNextLength: string;
  startNextQuiz: (goal: number) => string;
  pressEnter: string;
  wordsToReview: (count: number) => string;
  reviewHint: string;
  answerLabel: string;
  youTypedLabel: string;
  coreCurriculum: string;
  specializedPacks: string;
  replayAudio: string;
  needHint: string;
  meaningLabel: string;
  levelCheckpoint: (level: number | string, percentage: number) => { title: string; desc: string };
  feedbackSubtitle: (percentage: number, targetName: string) => string;
}

export const getQuizRecapLabels = (baseLang: SupportedLanguageId = 'en'): QuizRecapStrings => {
  switch (baseLang) {
    case 'ru':
      return {
        sessionComplete: 'Тест завершён!',
        correctRatio: (s, g) => `${s} из ${g} верно`,
        goal: 'Цель',
        correct: 'Верно',
        bestStreak: 'Лучшая серия',
        mastered: 'Изучено',
        remaining: 'Осталось',
        loggedNotice: 'Записано как 1 пройденный тест в вашем прогрессе',
        chooseTopic: 'Выберите тему:',
        chooseNextLength: 'Выберите длину следующего теста:',
        startNextQuiz: (g) => `Начать следующий тест (${g} вопр.)`,
        pressEnter: 'нажмите ↵ Enter',
        wordsToReview: (c) => `Слова для повторения из этого теста (${c})`,
        reviewHint: 'Послушайте правильное произношение, чтобы закрепить материал:',
        answerLabel: 'Ответ:',
        youTypedLabel: 'Ваш ответ:',
        coreCurriculum: 'Основной курс',
        specializedPacks: 'Специализированные темы',
        replayAudio: 'Нажмите для повтора аудио',
        needHint: 'Нужна подсказка?',
        meaningLabel: 'Значение',
        levelCheckpoint: (lvl, pct) => ({
          title: `Рубеж уровня ${lvl} пройден!`,
          desc: `Вы показали уверенное владение материалом уровня ${lvl} (${pct}% верных ответов). Отличная работа!`
        }),
        feedbackSubtitle: (pct) => {
          if (pct === 100) return 'Идеальный результат! Вы ответили правильно на все вопросы.';
          if (pct >= 80) return 'Отличная работа! Ваши языковые навыки уверенно растут.';
          if (pct >= 60) return 'Хороший прогресс! Ещё немного практики — и всё получится.';
          return 'Повторение — мать учения. Каждый подход приближает вас к свободной речи!';
        }
      };

    case 'es':
      return {
        sessionComplete: '¡Sesión de test completada!',
        correctRatio: (s, g) => `${s} de ${g} correctas`,
        goal: 'Meta',
        correct: 'Correcto',
        bestStreak: 'Mejor racha',
        mastered: 'Dominadas',
        remaining: 'Restantes',
        loggedNotice: 'Registrado como 1 prueba completada en tu progreso',
        chooseTopic: 'Elegir tema:',
        chooseNextLength: 'Elegir duración del siguiente test:',
        startNextQuiz: (g) => `Iniciar siguiente test (${g} preg.)`,
        pressEnter: 'pulsa ↵ Enter',
        wordsToReview: (c) => `Palabras para repasar de esta sesión (${c})`,
        reviewHint: 'Escucha la pronunciación correcta para reforzar tu memoria:',
        answerLabel: 'Respuesta:',
        youTypedLabel: 'Escribiste:',
        coreCurriculum: 'Programa principal',
        specializedPacks: 'Packs especializados',
        replayAudio: 'Toca para reproducir el audio de nuevo',
        needHint: '¿Necesitas una pista?',
        meaningLabel: 'Significado',
        levelCheckpoint: (lvl, pct) => ({
          title: `¡Punto de control de nivel ${lvl} superado!`,
          desc: `Has demostrado un dominio sólido del vocabulario del nivel ${lvl} (${pct}% de aciertos). ¡Bien hecho!`
        }),
        feedbackSubtitle: (pct) => {
          if (pct === 100) return '¡Puntaje perfecto! Has dominado todas las preguntas de esta sesión.';
          if (pct >= 80) return '¡Excelente trabajo! Tus habilidades lingüísticas están mejorando mucho.';
          if (pct >= 60) return '¡Buen progreso! Un poco más de práctica y lo dominarás por completo.';
          return 'La repetición es la clave del aprendizaje. ¡Cada intento te acerca a la fluidez!';
        }
      };

    case 'fr':
      return {
        sessionComplete: 'Session de quiz terminée !',
        correctRatio: (s, g) => `${s} sur ${g} corrects`,
        goal: 'Objectif',
        correct: 'Correct',
        bestStreak: 'Meilleure série',
        mastered: 'Maîtrisés',
        remaining: 'Restants',
        loggedNotice: 'Enregistré comme 1 quiz terminé dans vos progrès d’apprentissage',
        chooseTopic: 'Choisir un thème :',
        chooseNextLength: 'Choisir la longueur du prochain quiz :',
        startNextQuiz: (g) => `Démarrer le quiz suivant (${g} quest.)`,
        pressEnter: 'appuyez sur ↵ Entrée',
        wordsToReview: (c) => `Mots à réviser de cette session (${c})`,
        reviewHint: 'Écoutez la prononciation correcte pour renforcer votre mémoire :',
        answerLabel: 'Réponse :',
        youTypedLabel: 'Vous avez tapé :',
        coreCurriculum: 'Programme fondamental',
        specializedPacks: 'Modules spécialisés',
        replayAudio: 'Touchez pour réécouter l’audio',
        needHint: 'Besoin d’un indice ?',
        meaningLabel: 'Signification',
        levelCheckpoint: (lvl, pct) => ({
          title: `Étape du niveau ${lvl} validée !`,
          desc: `Vous avez fait preuve d’une solide maîtrise du vocabulaire de niveau ${lvl} (${pct} % de précision). Bien joué !`
        }),
        feedbackSubtitle: (pct) => {
          if (pct === 100) return 'Score parfait ! Vous avez maîtrisé toutes les questions de cette session.';
          if (pct >= 80) return 'Excellent travail ! Vos compétences linguistiques progressent à grands pas.';
          if (pct >= 60) return 'Des progrès solides ! Encore un peu d’entraînement et vous maîtriserez tout.';
          return 'La répétition est la clé de la réussite. Chaque essai renforce votre mémoire !';
        }
      };

    case 'de':
      return {
        sessionComplete: 'Quiz-Sitzung abgeschlossen!',
        correctRatio: (s, g) => `${s} von ${g} richtig`,
        goal: 'Ziel',
        correct: 'Richtig',
        bestStreak: 'Beste Serie',
        mastered: 'Gemeistert',
        remaining: 'Übrig',
        loggedNotice: 'Als 1 abgeschlossenes Quiz in deinem Lernfortschritt gespeichert',
        chooseTopic: 'Thema wählen:',
        chooseNextLength: 'Länge des nächsten Quiz wählen:',
        startNextQuiz: (g) => `Nächstes Quiz starten (${g} Fragen)`,
        pressEnter: 'drücke ↵ Enter',
        wordsToReview: (c) => `Wörter zum Wiederholen aus dieser Sitzung (${c})`,
        reviewHint: 'Höre die richtige Aussprache an, um dein Gedächtnis zu stärken:',
        answerLabel: 'Antwort:',
        youTypedLabel: 'Du hast getippt:',
        coreCurriculum: 'Grundlehrplan',
        specializedPacks: 'Branchen- & Spezialthemen',
        replayAudio: 'Tippen zum erneuten Abspielen',
        needHint: 'Brauchst du einen Hinweis?',
        meaningLabel: 'Bedeutung',
        levelCheckpoint: (lvl, pct) => ({
          title: `Stufe ${lvl} Kontrollpunkt bestanden!`,
          desc: `Du hast solide Kenntnisse des Wortschatzes der Stufe ${lvl} gezeigt (${pct} % Genauigkeit). Sehr gut!`
        }),
        feedbackSubtitle: (pct) => {
          if (pct === 100) return 'Perfekte Punktzahl! Du hast alle Fragen dieser Sitzung gemeistert.';
          if (pct >= 80) return 'Großartige Arbeit! Deine Sprachkenntnisse wachsen stetig.';
          if (pct >= 60) return 'Guter Fortschritt! Noch ein wenig Übung und du meisterst alles.';
          return 'Übung macht den Meister. Jeder Versuch bringt dich weiter voran!';
        }
      };

    case 'pt':
      return {
        sessionComplete: 'Sessão do quiz concluída!',
        correctRatio: (s, g) => `${s} de ${g} corretas`,
        goal: 'Meta',
        correct: 'Correto',
        bestStreak: 'Melhor sequência',
        mastered: 'Dominadas',
        remaining: 'Restantes',
        loggedNotice: 'Registrado como 1 quiz concluído em seu progresso',
        chooseTopic: 'Escolher tema:',
        chooseNextLength: 'Escolher duração do próximo quiz:',
        startNextQuiz: (g) => `Iniciar próximo quiz (${g} perg.)`,
        pressEnter: 'pressione ↵ Enter',
        wordsToReview: (c) => `Palavras para revisar desta sessão (${c})`,
        reviewHint: 'Ouça a pronúncia correta para reforçar a memória:',
        answerLabel: 'Resposta:',
        youTypedLabel: 'Você digitou:',
        coreCurriculum: 'Currículo principal',
        specializedPacks: 'Módulos especializados',
        replayAudio: 'Toque para ouvir o áudio novamente',
        needHint: 'Precisa de uma dica?',
        meaningLabel: 'Significado',
        levelCheckpoint: (lvl, pct) => ({
          title: `Etapa do nível ${lvl} superada!`,
          desc: `Você demonstrou domínio sólido do vocabulário do nível ${lvl} (${pct}% de acertos). Muito bem!`
        }),
        feedbackSubtitle: (pct) => {
          if (pct === 100) return 'Pontuação perfeita! Você dominou todas as perguntas desta sessão.';
          if (pct >= 80) return 'Excelente trabalho! Suas habilidades linguísticas estão evoluindo bastante.';
          if (pct >= 60) return 'Bom progresso! Mais um pouco de treino e você dominará tudo.';
          return 'A repetição é a base do aprendizado. Cada tentativa deixa você mais fluente!';
        }
      };

    case 'tr':
      return {
        sessionComplete: 'Test Oturumu Tamamlandı!',
        correctRatio: (s, g) => `${s} / ${g} doğru`,
        goal: 'Hedef',
        correct: 'Doğru',
        bestStreak: 'En İyi Seri',
        mastered: 'Öğrenilen',
        remaining: 'Kalan',
        loggedNotice: 'Öğrenme ilerlemenize 1 tamamlanan test olarak kaydedildi',
        chooseTopic: 'Konu seçin:',
        chooseNextLength: 'Sonraki test uzunluğunu seçin:',
        startNextQuiz: (g) => `Sonraki Testi Başlat (${g} Soru)`,
        pressEnter: '↵ Enter tuşuna basın',
        wordsToReview: (c) => `Bu Oturumdan Tekrar Edilecek Kelimeler (${c})`,
        reviewHint: 'Hafızanızı pekiştirmek için doğru telaffuzu dinleyin:',
        answerLabel: 'Cevap:',
        youTypedLabel: 'Yazdığınız:',
        coreCurriculum: 'Temel Müfredat',
        specializedPacks: 'Sektörel ve Özel Paketler',
        replayAudio: 'Sesi tekrar dinlemek için dokunun',
        needHint: 'İpucu ister misiniz?',
        meaningLabel: 'Anlamı',
        levelCheckpoint: (lvl, pct) => ({
          title: `Seviye ${lvl} Tamamlandı!`,
          desc: `Seviye ${lvl} kelimelerinde sağlam bir hakimiyet gösterdiniz (%${pct} doğruluk). Tebrikler!`
        }),
        feedbackSubtitle: (pct) => {
          if (pct === 100) return 'Kusursuz puan! Bu oturumdaki tüm soruları doğru cevapladınız.';
          if (pct >= 80) return 'Harika iş! Dil becerileriniz hızla güçleniyor.';
          if (pct >= 60) return 'Güzel ilerleme! Biraz daha pratikle hepsini öğreneceksiniz.';
          return 'Tekrar bilginin anasıdır. Her deneme sizi akıcılığa bir adım daha yaklaştırır!';
        }
      };

    case 'id':
      return {
        sessionComplete: 'Sesi Kuis Selesai!',
        correctRatio: (s, g) => `${s} dari ${g} benar`,
        goal: 'Target',
        correct: 'Benar',
        bestStreak: 'Rangkaian Terbaik',
        mastered: 'Dikuasai',
        remaining: 'Tersisa',
        loggedNotice: 'Tercatat sebagai 1 kuis selesai dalam kemajuan belajar Anda',
        chooseTopic: 'Pilih topik:',
        chooseNextLength: 'Pilih panjang kuis berikutnya:',
        startNextQuiz: (g) => `Mulai Kuis Berikutnya (${g} Pertanyaan)`,
        pressEnter: 'tekan ↵ Enter',
        wordsToReview: (c) => `Kata untuk Diulas dari Sesi Ini (${c})`,
        reviewHint: 'Dengarkan pengucapan yang benar untuk memperkuat ingatan:',
        answerLabel: 'Jawaban:',
        youTypedLabel: 'Ketik Anda:',
        coreCurriculum: 'Kurikulum Utama',
        specializedPacks: 'Paket Spesialis & Industri',
        replayAudio: 'Ketuk untuk memutar audio lagi',
        needHint: 'Butuh petunjuk?',
        meaningLabel: 'Arti',
        levelCheckpoint: (lvl, pct) => ({
          title: `Pos Pemeriksaan Tingkat ${lvl} Berhasil Dilewati!`,
          desc: `Anda menunjukkan penguasaan kosakata Tingkat ${lvl} yang kuat (akurasi ${pct}%). Luar biasa!`
        }),
        feedbackSubtitle: (pct) => {
          if (pct === 100) return 'Skor sempurna! Anda menguasai setiap pertanyaan dalam sesi ini.';
          if (pct >= 80) return 'Kerja bagus! Keterampilan bahasa Anda semakin meningkat.';
          if (pct >= 60) return 'Kemajuan bagus! Sedikit latihan lagi dan Anda akan menguasainya.';
          return 'Latihan berulang membangun keyakinan abadi. Teruslah berlatih!';
        }
      };

    case 'ja':
      return {
        sessionComplete: 'クイズセッション完了！',
        correctRatio: (s, g) => `${s} / ${g} 正解`,
        goal: '目標',
        correct: '正解',
        bestStreak: '最長連続正解',
        mastered: '習得済み',
        remaining: '残り',
        loggedNotice: '学習進捗に完了クイズ1回として記録されました',
        chooseTopic: 'トピックを選択:',
        chooseNextLength: '次のクイズの長さを選択:',
        startNextQuiz: (g) => `次のクイズを開始 (${g}問)`,
        pressEnter: '↵ Enter を押す',
        wordsToReview: (c) => `このセッションの復習単語 (${c})`,
        reviewHint: '正しい発音を聞いて記憶を定着させましょう:',
        answerLabel: '正解:',
        youTypedLabel: 'あなたの回答:',
        coreCurriculum: 'コアカリキュラム',
        specializedPacks: '業界・専門パック',
        replayAudio: 'タップして音声を再生',
        needHint: 'ヒントが必要ですか？',
        meaningLabel: '意味',
        levelCheckpoint: (lvl, pct) => ({
          title: `レベル${lvl} チェックポイント達成！`,
          desc: `レベル${lvl}の単語をしっかり習得できています（正解率${pct}%）。素晴らしい成果です！`
        }),
        feedbackSubtitle: (pct) => {
          if (pct === 100) return '満点です！すべての問題に完璧に答えられました。';
          if (pct >= 80) return '素晴らしい！語学力が着実に伸びています。';
          if (pct >= 60) return '順調です！あと少し練習すれば完璧に身につきます。';
          return '反復練習が上達への近道です。一歩ずつ前進しましょう！';
        }
      };

    case 'ko':
      return {
        sessionComplete: '퀴즈 세션 완료!',
        correctRatio: (s, g) => `${s} / ${g} 정답`,
        goal: '목표',
        correct: '정답',
        bestStreak: '최대 연속 정답',
        mastered: '마스터함',
        remaining: '남음',
        loggedNotice: '학습 진행 기록에 완료된 퀴즈 1회로 저장되었습니다',
        chooseTopic: '주제 선택:',
        chooseNextLength: '다음 퀴즈 길이 선택:',
        startNextQuiz: (g) => `다음 퀴즈 시작 (${g}문제)`,
        pressEnter: '↵ Enter 누르기',
        wordsToReview: (c) => `이번 세션 복습 단어 (${c})`,
        reviewHint: '정확한 발음을 듣고 기억을 강화하세요:',
        answerLabel: '정답:',
        youTypedLabel: '입력한 답:',
        coreCurriculum: '핵심 커리큘럼',
        specializedPacks: '분야별 전문 팩',
        replayAudio: '오디오 다시 듣기',
        needHint: '힌트가 필요하신가요?',
        meaningLabel: '의미',
        levelCheckpoint: (lvl, pct) => ({
          title: `레벨 ${lvl} 체크포인트 통과!`,
          desc: `레벨 ${lvl} 단어를 탄탄하게 습득하셨습니다 (정답률 ${pct}%). 잘하셨습니다!`
        }),
        feedbackSubtitle: (pct) => {
          if (pct === 100) return '만점입니다! 이번 세션의 모든 문제를 맞히셨습니다.';
          if (pct >= 80) return '훌륭합니다! 언어 실력이 탄탄해지고 있습니다.';
          if (pct >= 60) return '순조로운 발전입니다! 조금만 더 연습하면 완벽해집니다.';
          return '반복 연습이 마스터의 지름길입니다. 한 걸음씩 꾸준히 나아가세요!';
        }
      };

    case 'zh':
      return {
        sessionComplete: '测试环节完成！',
        correctRatio: (s, g) => `${s} / ${g} 正确`,
        goal: '目标',
        correct: '正确',
        bestStreak: '最佳连胜',
        mastered: '已掌握',
        remaining: '剩余',
        loggedNotice: '已计入您的学习进度（完成1次测试）',
        chooseTopic: '选择主题：',
        chooseNextLength: '选择下次测试题数：',
        startNextQuiz: (g) => `开始下次测试 (${g}题)`,
        pressEnter: '按 ↵ Enter 键',
        wordsToReview: (c) => `本次测试需要复习的词汇 (${c})`,
        reviewHint: '收听标准发音以加深记忆：',
        answerLabel: '正确答案：',
        youTypedLabel: '你的输入：',
        coreCurriculum: '核心课程',
        specializedPacks: '行业与专业主题包',
        replayAudio: '点击重新播放音频',
        needHint: '需要提示吗？',
        meaningLabel: '释义',
        levelCheckpoint: (lvl, pct) => ({
          title: `已通过第 ${lvl} 级测试关卡！`,
          desc: `你已熟练掌握第 ${lvl} 级的核心词汇（正确率 ${pct}%）。表现优异！`
        }),
        feedbackSubtitle: (pct) => {
          if (pct === 100) return '满分通关！你已掌握本环节中的所有词句。';
          if (pct >= 80) return '表现出色！你的外语能力正在稳步提升。';
          if (pct >= 60) return '稳步进阶！再加把劲就能完全攻克。';
          return '熟能生巧，日积月累。每一次练习都在拉近你与流利的距离！';
        }
      };

    case 'hi':
      return {
        sessionComplete: 'प्रश्नोत्तरी सत्र पूरा हुआ!',
        correctRatio: (s, g) => `${s} / ${g} सही`,
        goal: 'लक्ष्य',
        correct: 'सही',
        bestStreak: 'सर्वोत्तम लड़ी',
        mastered: 'कंठस्थ',
        remaining: 'शेष',
        loggedNotice: 'आपकी सीखने की प्रगति में 1 पूर्ण प्रश्नोत्तरी के रूप में दर्ज किया गया',
        chooseTopic: 'विषय चुनें:',
        chooseNextLength: 'अगली प्रश्नोत्तरी लंबाई चुनें:',
        startNextQuiz: (g) => `अगली प्रश्नोत्तरी शुरू करें (${g} प्रश्न)`,
        pressEnter: '↵ Enter दबाएँ',
        wordsToReview: (c) => `इस सत्र से दोहराने योग्य शब्द (${c})`,
        reviewHint: 'याददाश्त को पक्का करने के लिए सही उच्चारण सुनें:',
        answerLabel: 'उत्तर:',
        youTypedLabel: 'आपने लिखा:',
        coreCurriculum: 'मुख्य पाठ्यक्रम',
        specializedPacks: 'उद्योग और विशेष पैक',
        replayAudio: 'ऑडियो दोबारा सुनने के लिए टैप करें',
        needHint: 'संकेत चाहिए?',
        meaningLabel: 'अर्थ',
        levelCheckpoint: (lvl, pct) => ({
          title: `स्तर ${lvl} चेकपॉइंट उत्तीर्ण!`,
          desc: `आपने स्तर ${lvl} की शब्दावली पर मजबूत पकड़ दिखाई है (${pct}% सटीकता)। बहुत बढ़िया!`
        }),
        feedbackSubtitle: (pct) => {
          if (pct === 100) return 'उत्कृष्ट स्कोर! आपने इस सत्र के सभी प्रश्नों में महारत हासिल की।';
          if (pct >= 80) return 'शानदार प्रयास! आपकी भाषा कुशलता लगातार मजबूत हो रही है।';
          if (pct >= 60) return 'अच्छा सुधार! थोड़े और अभ्यास से सब कुछ याद हो जाएगा।';
          return 'अभ्यास से ही सिद्धि मिलती है। हर प्रयास आपको लक्ष्य के करीब ले जाता है!';
        }
      };

    case 'ar':
      return {
        sessionComplete: 'اكتملت جلسة الاختبار!',
        correctRatio: (s, g) => `${s} من ${g} صحيح`,
        goal: 'الهدف',
        correct: 'صحيح',
        bestStreak: 'أطول سلسلة',
        mastered: 'متقن',
        remaining: 'المتبقي',
        loggedNotice: 'تم تسجيل اختبار مكتمل واحد في تقدمك التعليمي',
        chooseTopic: 'اختر موضوعاً:',
        chooseNextLength: 'اختر طول الاختبار القادم:',
        startNextQuiz: (g) => `بدء الاختبار التالي (${g} أسئلة)`,
        pressEnter: 'اضغط ↵ Enter',
        wordsToReview: (c) => `الكلمات المطلوب مراجعتها من هذه الجلسة (${c})`,
        reviewHint: 'استمع إلى النطق الصحيح لتعزيز حفظك:',
        answerLabel: 'الإجابة:',
        youTypedLabel: 'ما كتبته:',
        coreCurriculum: 'المنهج الأساسي',
        specializedPacks: 'حزم مهنية ومتخصصة',
        replayAudio: 'انقر لإعادة تشغيل الصوت',
        needHint: 'هل تحتاج إلى تلميح؟',
        meaningLabel: 'المعنى',
        levelCheckpoint: (lvl, pct) => ({
          title: `تم اجتياز نقطة تفتيش المستوى ${lvl}!`,
          desc: `أظهرت تمكناً متيناً من مفردات المستوى ${lvl} بدقة ${pct}%. أحسنت!`
        }),
        feedbackSubtitle: (pct) => {
          if (pct === 100) return 'درجة كاملة! لقد أتقنت جميع أسئلة هذه الجلسة.';
          if (pct >= 80) return 'عمل ممتاز! مهاراتك اللغوية تنمو وتتطور بقوة.';
          if (pct >= 60) return 'تقدم جيد! القليل من الممارسة الإضافية وستتقن كل شيء.';
          return 'التكرار أساس التعلم. كل محاولة تقربك أكثر من الطلاقة!';
        }
      };

    case 'bn':
      return {
        sessionComplete: 'কুইজ সেশন সম্পন্ন!',
        correctRatio: (s, g) => `${s} / ${g} সঠিক`,
        goal: 'লক্ষ্য',
        correct: 'সঠিক',
        bestStreak: 'সেরা ধারাবাহিকতা',
        mastered: 'আয়ত্ত',
        remaining: 'অবশিষ্ট',
        loggedNotice: 'আপনার শেখার অগ্রগতিতে ১টি সম্পন্ন কুইজ হিসেবে সংরক্ষিত হয়েছে',
        chooseTopic: 'বিষয় নির্বাচন করুন:',
        chooseNextLength: 'পরবর্তী কুইজের দৈর্ঘ্য নির্বাচন করুন:',
        startNextQuiz: (g) => `পরবর্তী কুইজ শুরু করুন (${g}টি প্রশ্ন)`,
        pressEnter: '↵ Enter চাপুন',
        wordsToReview: (c) => `এই সেশন থেকে পুনর্বিবেচনার শব্দ (${c})`,
        reviewHint: 'স্মৃতি শক্তিশালী করতে সঠিক উচ্চারণ শুনুন:',
        answerLabel: 'উত্তর:',
        youTypedLabel: 'আপনি লিখেছেন:',
        coreCurriculum: 'মূল পাঠ্যক্রম',
        specializedPacks: 'বিশেষায়িত প্যাক',
        replayAudio: 'অডিও পুনরায় শুনতে ট্যাপ করুন',
        needHint: 'ইঙ্গিত প্রয়োজন?',
        meaningLabel: 'অর্থ',
        levelCheckpoint: (lvl, pct) => ({
          title: `স্তর ${lvl} চেকপয়েন্ট উত্তীর্ণ!`,
          desc: `আপনি স্তর ${lvl}-এর শব্দকোষে দৃঢ় দক্ষতা দেখিয়েছেন (${pct}% নির্ভুলতা)। চমৎকার!`
        }),
        feedbackSubtitle: (pct) => {
          if (pct === 100) return 'নিখুঁত স্কোর! আপনি এই সেশনের প্রতিটি প্রশ্নে দক্ষতা অর্জন করেছেন।';
          if (pct >= 80) return 'অসাধারণ প্রচেষ্টা! আপনার ভাষার দক্ষতা ক্রমান্বয়ে শক্তিশালী হচ্ছে।';
          if (pct >= 60) return 'ভালো অগ্রগতি! আরেকটু অনুশীলনে সবকিছু আয়ত্তে আসবে।';
          return 'অনুশীলনই সাফল্যের চাবিকাঠি। প্রতিটি প্রচেষ্টা আপনাকে লক্ষ্যের কাছে নিয়ে যায়!';
        }
      };

    case 'ur':
      return {
        sessionComplete: 'کوئز سیشن مکمل!',
        correctRatio: (s, g) => `${s} از ${g} درست`,
        goal: 'ہدف',
        correct: 'درست',
        bestStreak: 'بہترین سلسلہ',
        mastered: 'مہارت حاصل کی',
        remaining: 'باقی',
        loggedNotice: 'آپ کی تعلیمی پیش رفت میں 1 مکمل کوئز کے طور پر درج ہو گیا',
        chooseTopic: 'عنوان منتخب کریں:',
        chooseNextLength: 'اگلے کوئز کی لمبائی منتخب کریں:',
        startNextQuiz: (g) => `اگلا کوئز شروع کریں (${g} سوالات)`,
        pressEnter: '↵ Enter دبائیں',
        wordsToReview: (c) => `اس سیشن سے دہرانے کے لیے الفاظ (${c})`,
        reviewHint: 'یادداشت پختہ کرنے کے لیے درست تلفظ سنیں:',
        answerLabel: 'جواب:',
        youTypedLabel: 'آپ نے لکھا:',
        coreCurriculum: 'بنیادی نصاب',
        specializedPacks: 'پیشہ ورانہ اور خصوصی پیک',
        replayAudio: 'آڈیو دوبارہ سننے کے لیے ٹیپ کریں',
        needHint: 'کیا اشارہ درکار ہے؟',
        meaningLabel: 'معنی',
        levelCheckpoint: (lvl, pct) => ({
          title: `لیول ${lvl} چیک پوائنٹ پاس ہو گیا!`,
          desc: `آپ نے لیول ${lvl} کے ذخیرہ الفاظ پر ٹھوس گرفت کا مظاہرہ کیا ہے (${pct}% درستگی)۔ شاباش!`
        }),
        feedbackSubtitle: (pct) => {
          if (pct === 100) return 'شاندار اسکور! آپ نے اس سیشن کے تمام سوالات پر مکمل مہارت حاصل کر لی۔';
          if (pct >= 80) return 'بہترین کارکردگی! آپ کی زبان دانی میں واضح بہتری آ رہی ہے۔';
          if (pct >= 60) return 'اچھی پیش رفت! کچھ اور مشق سے سب کچھ یاد ہو جائے گا۔';
          return 'مشق ہی کامیابی کا زینہ ہے۔ ہر کوشش آپ کو روانی کے قریب لاتی ہے!';
        }
      };

    case 'en':
    default:
      return {
        sessionComplete: 'Quiz Session Complete!',
        correctRatio: (s, g) => `${s} / ${g} correct`,
        goal: 'Goal',
        correct: 'Correct',
        bestStreak: 'Best Streak',
        mastered: 'Mastered',
        remaining: 'Remaining',
        loggedNotice: 'Logged as 1 completed quiz in your learning progress',
        chooseTopic: 'Choose topic:',
        chooseNextLength: 'Choose next quiz length:',
        startNextQuiz: (g) => `Start Next Quiz (${g} Qs)`,
        pressEnter: 'press ↵ Enter',
        wordsToReview: (c) => `Words to Review from This Session (${c})`,
        reviewHint: 'Listen to the correct pronunciation to reinforce your memory:',
        answerLabel: 'Answer:',
        youTypedLabel: 'You typed:',
        coreCurriculum: 'Core Curriculum',
        specializedPacks: 'Industry & Specialized Packs',
        replayAudio: 'Tap to play audio again',
        needHint: 'Need a hint?',
        meaningLabel: 'Meaning',
        levelCheckpoint: (lvl, pct) => ({
          title: `Level ${lvl} Checkpoint Passed!`,
          desc: `You showed solid command of Level ${lvl} vocabulary (${pct}% accuracy). Nicely done.`
        }),
        feedbackSubtitle: (pct) => {
          if (pct === 100) return 'Perfect score! You mastered every question in this session.';
          if (pct >= 80) return 'Outstanding job! Your communication skills are getting stronger.';
          if (pct >= 60) return 'Solid progress! A little more practice and you will ace it.';
          return 'Practice makes perfect. Repetition builds lasting confidence!';
        }
      };
  }
};

export interface ComponentChromeStrings {
  // App Header & Footer
  installApp: string;
  installAppTitle: string;
  loadingLessons: string;
  allRightsReserved: string;
  aboutContact: string;
  privacyPolicy: string;
  termsOfService: string;
  search: string;
  searchTitle: string;

  // LanguageSwitcher
  customizingBadge: string;
  popularPairs: string;
  chooseLanguageToLearn: string;
  bidirectionalNotice: string;
  switchDirectionTitle: (baseName: string, targetName: string) => string;

  // VoiceSpeedControl
  audioSpeedLabel: string;
  studioVoicePace: string;
  speedDesc05: string;
  speedDesc075: string;
  speedDesc1: string;
  speedDesc125: string;

  // MobileDrawer
  personalStudyDashboard: string;
  learningPair: string;
  audioPlaybackSpeed: string;
  myLearningProgress: string;
  accountCloudSync: string;
  signOut: string;
  syncSignIn: string;

  // UserMenu & ProgressModal
  myStats: string;
  signIn: string;
  signOutTitle: string;
  progressModalTitle: string;
  overallAccuracy: string;
  questionsAttempted: string;
  streak: string;
  mastered: string;
  accuracyByCategory: string;
  alphabetCat: string;
  phrasesCat: string;
  commonWordsCat: string;
  numbersCat: string;
  correctOfTotal: (correct: number, total: number) => string;
  syncPromoText: string;
  signInRegister: string;
  resetAllStats: string;
  confirmResetStats: string;
  doneBtn: string;
}

export const getComponentChrome = (baseLang: SupportedLanguageId): ComponentChromeStrings => {
  switch (baseLang) {
    case 'ar':
      return {
        installApp: 'تثبيت التطبيق',
        installAppTitle: 'تثبيت التطبيق على جهازك',
        loadingLessons: 'جاري تحميل الدروس...',
        allRightsReserved: 'جميع الحقوق محفوظة.',
        aboutContact: 'حول المشروع والتواصل',
        privacyPolicy: 'سياسة الخصوصية',
        termsOfService: 'شروط الخدمة',
        search: 'بحث',
        searchTitle: 'البحث عن المفردات والعبارات (⌘K)',

        customizingBadge: 'تخصيص',
        popularPairs: 'اللغات الشائعة',
        chooseLanguageToLearn: 'اختر لغة لتتعلمها',
        bidirectionalNotice: 'منهج تعليمي ثنائي الاتجاه · صوت استوديو عصبي',
        switchDirectionTitle: (baseName, targetName) =>
          `تبديل الاتجاه: تعلم ${baseName} من ${targetName}`,

        audioSpeedLabel: 'سرعة الصوت',
        studioVoicePace: 'سرعة صوت الاستوديو',
        speedDesc05: 'حركة بطيئة لنطق المقاطع بوضوح',
        speedDesc075: 'سرعة المتعلم',
        speedDesc1: 'سرعة المتحدث الأصلي الطبيعية',
        speedDesc125: 'استماع سريع وطلاقة',

        personalStudyDashboard: 'لوحة الدراسة الشخصية',
        learningPair: 'زوج اللغات',
        audioPlaybackSpeed: 'سرعة تشغيل الصوت',
        myLearningProgress: 'تقدمي التعليمي',
        accountCloudSync: 'الحساب والمزامنة السحابية',
        signOut: 'تسجيل الخروج',
        syncSignIn: 'مزامنة وتسجيل الدخول',

        myStats: 'إحصائياتي',
        signIn: 'تسجيل الدخول',
        signOutTitle: 'تسجيل الخروج',
        progressModalTitle: 'تقدمي في التعلم',
        overallAccuracy: 'الدقة الكلية',
        questionsAttempted: 'الأسئلة المجاب عنها',
        streak: 'سلسلة الأيام',
        mastered: 'تم إتقانها',
        accuracyByCategory: 'الدقة حسب الفئة',
        alphabetCat: 'الحروف',
        phrasesCat: 'العبارات الأساسية',
        commonWordsCat: 'الكلمات الشائعة',
        numbersCat: 'الأرقام',
        correctOfTotal: (correct, total) => `${correct} من ${total} صحيح`,
        syncPromoText: 'هل تريد حفظ تقدمك ومزامنته عبر جميع أجهزتك؟',
        signInRegister: 'تسجيل الدخول / إنشاء حساب',
        resetAllStats: 'إعادة تعيين جميع الإحصائيات',
        confirmResetStats: 'هل أنت متأكد من رغبتك في إعادة تعيين إحصائيات التعلم بالكامل؟',
        doneBtn: 'تم'
      };

    case 'bn':
      return {
        installApp: 'অ্যাপ ইনস্টল করুন',
        installAppTitle: 'আপনার ডিভাইসে অ্যাপ্লিকেশন ইনস্টল করুন',
        loadingLessons: 'পাঠ লোড হচ্ছে...',
        allRightsReserved: 'সর্বস্বত্ব সংরক্ষিত।',
        aboutContact: 'পরিচিতি ও যোগাযোগ',
        privacyPolicy: 'গোপনীয়তা নীতি',
        termsOfService: 'ব্যবহারের শর্তাবলী',
        search: 'অনুসন্ধান',
        searchTitle: 'শব্দকোষ ও বাক্যাংশ অনুসন্ধান করুন (⌘K)',

        customizingBadge: 'কাস্টমাইজ',
        popularPairs: 'জনপ্রিয় ভাষা জোড়া',
        chooseLanguageToLearn: 'শেখার জন্য ভাষা বেছে নিন',
        bidirectionalNotice: 'দ্বিমুখী পাঠ্যক্রম · স্টুডিও নিউরাল ভয়েস',
        switchDirectionTitle: (baseName: string, targetName: string) =>
          `দিক পরিবর্তন: ${targetName} থেকে ${baseName} শিখুন`,

        audioSpeedLabel: 'অডিও গতি',
        studioVoicePace: 'স্টুডিও ভয়েস গতি',
        speedDesc05: 'স্পষ্ট অক্ষরের জন্য ধীর গতি',
        speedDesc075: 'শিক্ষার্থীর গতি',
        speedDesc1: 'প্রাকৃতিক মাতৃভাষীর গতি',
        speedDesc125: 'দ্রুত সাবলীল শ্রবণ',

        personalStudyDashboard: 'ব্যক্তিগত স্টাডি ড্যাশবোর্ড',
        learningPair: 'শেখার জোড়া',
        audioPlaybackSpeed: 'অডিও প্লেব্যাক গতি',
        myLearningProgress: 'আমার শেখার অগ্রগতি',
        accountCloudSync: 'অ্যাকাউন্ট ও ক্লাউড সিঙ্ক',
        signOut: 'সাইন আউট',
        syncSignIn: 'সিঙ্ক ও সাইন ইন',

        myStats: 'আমার পরিসংখ্যান',
        signIn: 'সাইন ইন',
        signOutTitle: 'সাইন আউট',
        progressModalTitle: 'আমার অগ্রগতি',
        overallAccuracy: 'সামগ্রিক নির্ভুলতা',
        questionsAttempted: 'উত্তরিত প্রশ্নাবলী',
        streak: 'ধারাবাহিকতা',
        mastered: 'আয়ত্ত',
        accuracyByCategory: 'বিভাগ অনুযায়ী নির্ভুলতা',
        alphabetCat: 'বর্ণমালা',
        phrasesCat: 'প্রয়োজনীয় বাক্য',
        commonWordsCat: 'প্রয়োজনীয় শব্দ',
        numbersCat: 'সংখ্যা',
        correctOfTotal: (correct: number, total: number) => `${total}-এর মধ্যে ${correct} সঠিক`,
        syncPromoText: 'আপনার সমস্ত ডিভাইসে অগ্রগতি সংরক্ষণ করতে চান?',
        signInRegister: 'সাইন ইন / নিবন্ধন',
        resetAllStats: 'সকল পরিসংখ্যান পুনরায় সেট করুন',
        confirmResetStats: 'আপনি কি নিশ্চিত যে আপনার সমস্ত অগ্রগতির পরিসংখ্যান পুনরায় সেট করতে চান?',
        doneBtn: 'সম্পন্ন'
      };

    case 'ur':
      return {
        installApp: 'ایپ انسٹال کریں',
        installAppTitle: 'اپنے آلے پر ایپلیکیشن انسٹال کریں',
        loadingLessons: 'اسباق لوڈ ہو رہے ہیں...',
        allRightsReserved: 'جملہ حقوق محفوظ ہیں۔',
        aboutContact: 'ہمارے متعلق اور رابطہ',
        privacyPolicy: 'رازداری کی پالیسی',
        termsOfService: 'شرائط و ضوابط',
        search: 'تلاش',
        searchTitle: 'الفاظ اور جملے تلاش کریں (⌘K)',

        customizingBadge: 'ترمیم',
        popularPairs: 'مشہور زبانیں',
        chooseLanguageToLearn: 'سیکھنے کے لیے زبان منتخب کریں',
        bidirectionalNotice: 'دو طرفہ نصاب · اسٹوڈیو نیورل وائس',
        switchDirectionTitle: (baseName: string, targetName: string) =>
          `سمت تبدیل کریں: ${targetName} سے ${baseName} سیکھیں`,

        audioSpeedLabel: 'آواز کی رفتار',
        studioVoicePace: 'اسٹوڈیو آواز کی رفتار',
        speedDesc05: 'حروف کی وضاحت کے لیے دھیمی رفتار',
        speedDesc075: 'سیکھنے والے کی رفتار',
        speedDesc1: 'قدرتی مادری زبان کی رفتار',
        speedDesc125: 'تیز روانی سے سننا',

        personalStudyDashboard: 'ذاتی مطالعہ کا ڈیش بورڈ',
        learningPair: 'تعلیمی جوڑا',
        audioPlaybackSpeed: 'آڈیو پلے بیک کی رفتار',
        myLearningProgress: 'میری تعلیمی پیش رفت',
        accountCloudSync: 'اکاؤنٹ اور کلاؤڈ سنک',
        signOut: 'سائن آؤٹ',
        syncSignIn: 'ہم آہنگ اور سائن ان کریں',

        myStats: 'میرے اعداد و شمار',
        signIn: 'سائن ان',
        signOutTitle: 'سائن آؤٹ',
        progressModalTitle: 'میری تعلیمی پیش رفت',
        overallAccuracy: 'مجموعی درستگی',
        questionsAttempted: 'حل شدہ سوالات',
        streak: 'مسلسل دن',
        mastered: 'مہارت حاصل کی',
        accuracyByCategory: 'درجہ بندی کے لحاظ سے درستگی',
        alphabetCat: 'حروفِ تہجی',
        phrasesCat: 'بنیادی جملے',
        commonWordsCat: 'عام الفاظ',
        numbersCat: 'اعداد',
        correctOfTotal: (correct: number, total: number) => `${total} میں سے ${correct} درست`,
        syncPromoText: 'کیا آپ تمام آلات پر اپنی پیش رفت محفوظ کرنا چاہتے ہیں؟',
        signInRegister: 'سائن ان / رجسٹر',
        resetAllStats: 'تمام اعداد و شمار دوبارہ ترتیب دیں',
        confirmResetStats: 'کیا آپ واقعی اپنی تمام تعلیمی پیش رفت کو دوبارہ ترتیب دینا چاہتے ہیں؟',
        doneBtn: 'مکمل'
      };

    case 'ru':
      return {
        installApp: 'Установить',
        installAppTitle: 'Установить приложение на устройство',
        loadingLessons: 'Загрузка уроков...',
        allRightsReserved: 'Все права защищены.',
        aboutContact: 'О проекте и контакты',
        privacyPolicy: 'Политика конфиденциальности',
        termsOfService: 'Условия использования',
        search: 'Поиск',
        searchTitle: 'Поиск слов и понятий (⌘K)',

        customizingBadge: 'Настройка курса',
        popularPairs: 'Популярные языковые пары',
        chooseLanguageToLearn: 'Выберите язык для изучения',
        bidirectionalNotice: 'Двустороннее обучение · Студийная озвучка',
        switchDirectionTitle: (baseName, targetName) =>
          `Поменять направление: изучать ${baseName} (мой язык: ${targetName})`,

        audioSpeedLabel: 'Скорость аудио',
        studioVoicePace: 'Темп голоса',
        speedDesc05: 'Замедленно по слогам',
        speedDesc075: 'Учебный темп',
        speedDesc1: 'Естественная скорость',
        speedDesc125: 'Быстрый темп',

        personalStudyDashboard: 'Личная панель обучения',
        learningPair: 'Языковая пара',
        audioPlaybackSpeed: 'Скорость воспроизведения аудио',
        myLearningProgress: 'Мой прогресс обучения',
        accountCloudSync: 'Аккаунт и синхронизация',
        signOut: 'Выйти',
        syncSignIn: 'Войти и синхронизировать',

        myStats: 'Статистика',
        signIn: 'Войти',
        signOutTitle: 'Выйти из аккаунта',
        progressModalTitle: 'Мой прогресс',
        overallAccuracy: 'Общая точность',
        questionsAttempted: 'Отвечено вопросов',
        streak: 'Серия',
        mastered: 'Изучено',
        accuracyByCategory: 'Точность по категориям',
        alphabetCat: 'Алфавит',
        phrasesCat: 'Основные фразы',
        commonWordsCat: 'Популярные слова',
        numbersCat: 'Числа',
        correctOfTotal: (correct, total) => `${correct} из ${total} верно`,
        syncPromoText: 'Хотите сохранить прогресс на всех устройствах?',
        signInRegister: 'Войти / Регистрация',
        resetAllStats: 'Сбросить статистику',
        confirmResetStats: 'Вы уверены, что хотите сбросить всю статистику обучения?',
        doneBtn: 'Готово'
      };
    case 'es':
      return {
        installApp: 'Instalar App',
        installAppTitle: 'Instalar aplicación en tu dispositivo',
        loadingLessons: 'Cargando lecciones...',
        allRightsReserved: 'Todos los derechos reservados.',
        aboutContact: 'Acerca de y Contacto',
        privacyPolicy: 'Política de Privacidad',
        termsOfService: 'Términos de Servicio',
        search: 'Buscar',
        searchTitle: 'Buscar conceptos (⌘K)',

        customizingBadge: 'Personalizando',
        popularPairs: 'Pares Populares',
        chooseLanguageToLearn: 'Elige el idioma para aprender',
        bidirectionalNotice: 'Currículo bidireccional · Voz neural de estudio',
        switchDirectionTitle: (baseName, targetName) =>
          `Cambiar dirección: aprender ${baseName} desde ${targetName}`,

        audioSpeedLabel: 'Velocidad de Audio',
        studioVoicePace: 'Ritmo de voz',
        speedDesc05: 'Cámara lenta para sílabas claras',
        speedDesc075: 'Ritmo de estudiante',
        speedDesc1: 'Velocidad nativa natural',
        speedDesc125: 'Práctica de escucha rápida',

        personalStudyDashboard: 'Panel de Estudio Personal',
        learningPair: 'Par de Idiomas',
        audioPlaybackSpeed: 'Velocidad de Reproducción de Audio',
        myLearningProgress: 'Mi Progreso de Aprendizaje',
        accountCloudSync: 'Cuenta y Sincronización en la Nube',
        signOut: 'Cerrar Sesión',
        syncSignIn: 'Sincronizar e Iniciar Sesión',

        myStats: 'Mis Estadísticas',
        signIn: 'Iniciar Sesión',
        signOutTitle: 'Cerrar sesión',
        progressModalTitle: 'Mi Progreso',
        overallAccuracy: 'Precisión General',
        questionsAttempted: 'Preguntas Respondidas',
        streak: 'Racha',
        mastered: 'Dominadas',
        accuracyByCategory: 'Precisión por Categoría',
        alphabetCat: 'Alfabeto',
        phrasesCat: 'Frases Básicas',
        commonWordsCat: 'Palabras Comunes',
        numbersCat: 'Números',
        correctOfTotal: (correct, total) => `${correct} de ${total} correctas`,
        syncPromoText: '¿Quieres guardar tu progreso en todos tus dispositivos?',
        signInRegister: 'Iniciar Sesión / Registrarse',
        resetAllStats: 'Restablecer Estadísticas',
        confirmResetStats: '¿Estás seguro de que quieres borrar tu progreso?',
        doneBtn: 'Listo'
      };
    case 'fr':
      return {
        installApp: 'Installer l\'App',
        installAppTitle: 'Installer l\'application sur votre appareil',
        loadingLessons: 'Chargement des leçons...',
        allRightsReserved: 'Tous droits réservés.',
        aboutContact: 'À propos & Contact',
        privacyPolicy: 'Politique de Confidentialité',
        termsOfService: 'Conditions d\'Utilisation',
        search: 'Rechercher',
        searchTitle: 'Rechercher des notions (⌘K)',

        customizingBadge: 'Personnalisation',
        popularPairs: 'Paires Populaires',
        chooseLanguageToLearn: 'Choisir la langue à apprendre',
        bidirectionalNotice: 'Programme bidirectionnel · Voix neurale de studio',
        switchDirectionTitle: (baseName, targetName) =>
          `Inverser la direction : apprendre ${baseName} depuis ${targetName}`,

        audioSpeedLabel: 'Vitesse Audio',
        studioVoicePace: 'Rythme de la voix',
        speedDesc05: 'Ralenti pour syllabes claires',
        speedDesc075: 'Rythme d\'apprentissage',
        speedDesc1: 'Vitesse native naturelle',
        speedDesc125: 'Écoute rapide',

        personalStudyDashboard: 'Tableau de Bord d\'Étude',
        learningPair: 'Paire de Langues',
        audioPlaybackSpeed: 'Vitesse de Lecture Audio',
        myLearningProgress: 'Ma Progression d\'Apprentissage',
        accountCloudSync: 'Compte et Synchronisation Cloud',
        signOut: 'Se Déconnecter',
        syncSignIn: 'Synchroniser et Se Connecter',

        myStats: 'Mes Statistiques',
        signIn: 'Se Connecter',
        signOutTitle: 'Se déconnecter',
        progressModalTitle: 'Ma Progression',
        overallAccuracy: 'Précision Globale',
        questionsAttempted: 'Questions Tentées',
        streak: 'Série',
        mastered: 'Maîtrisées',
        accuracyByCategory: 'Précision par Catégorie',
        alphabetCat: 'Alphabet',
        phrasesCat: 'Phrases de Base',
        commonWordsCat: 'Mots Courants',
        numbersCat: 'Nombres',
        correctOfTotal: (correct, total) => `${correct} sur ${total} correctes`,
        syncPromoText: 'Voulez-vous sauvegarder votre progression sur tous vos appareils ?',
        signInRegister: 'Se Connecter / S\'inscrire',
        resetAllStats: 'Réinitialiser les Statistiques',
        confirmResetStats: 'Êtes-vous sûr de vouloir réinitialiser toutes vos statistiques ?',
        doneBtn: 'Terminé'
      };
    case 'pt':
      return {
        installApp: 'Instalar App',
        installAppTitle: 'Instalar aplicativo no seu dispositivo',
        loadingLessons: 'Carregando lições...',
        allRightsReserved: 'Todos os direitos reservados.',
        aboutContact: 'Sobre e Contato',
        privacyPolicy: 'Política de Privacidade',
        termsOfService: 'Termos de Serviço',
        search: 'Buscar',
        searchTitle: 'Buscar conceitos (⌘K)',

        customizingBadge: 'Personalizando',
        popularPairs: 'Pares Populares',
        chooseLanguageToLearn: 'Escolha o idioma para aprender',
        bidirectionalNotice: 'Currículo bidirecional · Voz neural de estúdio',
        switchDirectionTitle: (baseName, targetName) =>
          `Inverter direção: aprender ${baseName} a partir de ${targetName}`,

        audioSpeedLabel: 'Velocidade do Áudio',
        studioVoicePace: 'Ritmo da voz de estúdio',
        speedDesc05: 'Câmera lenta para sílabas claras',
        speedDesc075: 'Ritmo de estudante',
        speedDesc1: 'Velocidade nativa natural',
        speedDesc125: 'Escuta rápida fluente',

        personalStudyDashboard: 'Painel de Estudo Pessoal',
        learningPair: 'Par de Idiomas',
        audioPlaybackSpeed: 'Velocidade de Reprodução do Áudio',
        myLearningProgress: 'Meu Progresso de Aprendizado',
        accountCloudSync: 'Conta e Sincronização na Nuvem',
        signOut: 'Sair',
        syncSignIn: 'Sincronizar e Entrar',

        myStats: 'Minhas Estatísticas',
        signIn: 'Entrar',
        signOutTitle: 'Sair da conta',
        progressModalTitle: 'Meu Progresso',
        overallAccuracy: 'Precisão Geral',
        questionsAttempted: 'Questões Respondidas',
        streak: 'Sequência',
        mastered: 'Dominadas',
        accuracyByCategory: 'Precisão por Categoria',
        alphabetCat: 'Alfabeto',
        phrasesCat: 'Frases Básicas',
        commonWordsCat: 'Palavras Comuns',
        numbersCat: 'Números',
        correctOfTotal: (correct, total) => `${correct} de ${total} corretas`,
        syncPromoText: 'Quer salvar seu progresso em todos os seus dispositivos?',
        signInRegister: 'Entrar / Cadastrar',
        resetAllStats: 'Redefinir Estatísticas',
        confirmResetStats: 'Tem certeza de que deseja redefinir todas as suas estatísticas?',
        doneBtn: 'Concluído'
      };
    case 'de':
      return {
        installApp: 'App installieren',
        installAppTitle: 'App auf deinem Gerät installieren',
        loadingLessons: 'Lektionen werden geladen...',
        allRightsReserved: 'Alle Rechte vorbehalten.',
        aboutContact: 'Über uns & Kontakt',
        privacyPolicy: 'Datenschutz',
        termsOfService: 'Nutzungsbedingungen',
        search: 'Suchen',
        searchTitle: 'Konzepte durchsuchen (⌘K)',

        customizingBadge: 'Anpassen',
        popularPairs: 'Beliebte Sprachpaare',
        chooseLanguageToLearn: 'Lernsprache auswählen',
        bidirectionalNotice: 'Bidirektionaler Lehrplan · Studio-Neuralstimme',
        switchDirectionTitle: (baseName, targetName) =>
          `Richtung wechseln: ${baseName} von ${targetName} lernen`,

        audioSpeedLabel: 'Audio-Tempo',
        studioVoicePace: 'Sprechtempo der Studiostimme',
        speedDesc05: 'Zeitlupe für deutliche Silben',
        speedDesc075: 'Lerntempo',
        speedDesc1: 'Natürliches Muttersprachler-Tempo',
        speedDesc125: 'Schnelles Hörverständnis',

        personalStudyDashboard: 'Persönliches Lern-Dashboard',
        learningPair: 'Sprachpaar',
        audioPlaybackSpeed: 'Audio-Wiedergabegeschwindigkeit',
        myLearningProgress: 'Mein Lernfortschritt',
        accountCloudSync: 'Konto & Cloud-Sync',
        signOut: 'Abmelden',
        syncSignIn: 'Synchronisieren & Anmelden',

        myStats: 'Meine Statistik',
        signIn: 'Anmelden',
        signOutTitle: 'Abmelden',
        progressModalTitle: 'Mein Fortschritt',
        overallAccuracy: 'Gesamtgenauigkeit',
        questionsAttempted: 'Beantwortete Fragen',
        streak: 'Serie',
        mastered: 'Gemeistert',
        accuracyByCategory: 'Genauigkeit nach Kategorie',
        alphabetCat: 'Alphabet',
        phrasesCat: 'Wichtige Sätze',
        commonWordsCat: 'Häufige Wörter',
        numbersCat: 'Zahlen',
        correctOfTotal: (correct, total) => `${correct} von ${total} richtig`,
        syncPromoText: 'Möchtest du deinen Fortschritt auf allen Geräten speichern?',
        signInRegister: 'Anmelden / Registrieren',
        resetAllStats: 'Statistik zurücksetzen',
        confirmResetStats: 'Möchtest du wirklich deinen gesamten Lernfortschritt zurücksetzen?',
        doneBtn: 'Fertig'
      };
    case 'id':
      return {
        installApp: 'Instal Aplikasi',
        installAppTitle: 'Instal aplikasi di perangkat Anda',
        loadingLessons: 'Memuat pelajaran...',
        allRightsReserved: 'Hak Cipta Dilindungi.',
        aboutContact: 'Tentang & Kontak',
        privacyPolicy: 'Kebijakan Privasi',
        termsOfService: 'Ketentuan Layanan',
        search: 'Cari',
        searchTitle: 'Cari kosakata (⌘K)',

        customizingBadge: 'Menyesuaikan',
        popularPairs: 'Pasangan Populer',
        chooseLanguageToLearn: 'Pilih Bahasa untuk Dipelajari',
        bidirectionalNotice: 'Kurikulum dua arah · Suara neural studio',
        switchDirectionTitle: (baseName, targetName) =>
          `Tukar arah: Belajar ${baseName} dari ${targetName}`,

        audioSpeedLabel: 'Kecepatan Audio',
        studioVoicePace: 'Tempo suara studio',
        speedDesc05: 'Gerak lambat untuk suku kata jelas',
        speedDesc075: 'Tempo pelajar',
        speedDesc1: 'Kecepatan asli alami',
        speedDesc125: 'Latihan mendengar cepat',

        personalStudyDashboard: 'Dasbor Belajar Pribadi',
        learningPair: 'Pasangan Bahasa',
        audioPlaybackSpeed: 'Kecepatan Pemutaran Audio',
        myLearningProgress: 'Kemajuan Belajar Saya',
        accountCloudSync: 'Akun & Sinkronisasi Cloud',
        signOut: 'Keluar',
        syncSignIn: 'Sinkronkan & Masuk',

        myStats: 'Statistik Saya',
        signIn: 'Masuk',
        signOutTitle: 'Keluar',
        progressModalTitle: 'Kemajuan Saya',
        overallAccuracy: 'Akurasi Keseluruhan',
        questionsAttempted: 'Pertanyaan Dijawab',
        streak: 'Beruntun',
        mastered: 'Dikuasai',
        accuracyByCategory: 'Akurasi per Kategori',
        alphabetCat: 'Alfabet',
        phrasesCat: 'Frasa Dasar',
        commonWordsCat: 'Kata Umum',
        numbersCat: 'Angka',
        correctOfTotal: (correct, total) => `${correct} dari ${total} benar`,
        syncPromoText: 'Ingin menyimpan kemajuan Anda di semua perangkat?',
        signInRegister: 'Masuk / Daftar',
        resetAllStats: 'Atur Ulang Statistik',
        confirmResetStats: 'Apakah Anda yakin ingin mengatur ulang semua statistik kemajuan?',
        doneBtn: 'Selesai'
      };
    case 'tr':
      return {
        installApp: 'Uygulamayı Yükle',
        installAppTitle: 'Uygulamayı cihazınıza yükleyin',
        loadingLessons: 'Dersler yükleniyor...',
        allRightsReserved: 'Tüm Hakları Saklıdır.',
        aboutContact: 'Hakkında ve İletişim',
        privacyPolicy: 'Gizlilik Politikası',
        termsOfService: 'Hizmet Şartları',
        search: 'Ara',
        searchTitle: 'Kavramları ara (⌘K)',

        customizingBadge: 'Özelleştirme',
        popularPairs: 'Popüler Çiftler',
        chooseLanguageToLearn: 'Öğrenilecek Dili Seçin',
        bidirectionalNotice: 'Çift yönlü müfredat · Stüdyo nöral ses',
        switchDirectionTitle: (baseName, targetName) =>
          `Yönü değiştir: ${targetName} dilinden ${baseName} öğren`,

        audioSpeedLabel: 'Ses Hızı',
        studioVoicePace: 'Stüdyo ses temposu',
        speedDesc05: 'Net heceler için yavaş çekim',
        speedDesc075: 'Öğrenci temposu',
        speedDesc1: 'Doğal ana dil hızı',
        speedDesc125: 'Hızlı akıcı dinleme',

        personalStudyDashboard: 'Kişisel Çalışma Paneli',
        learningPair: 'Dil Çifti',
        audioPlaybackSpeed: 'Ses Çalma Hızı',
        myLearningProgress: 'Öğrenme İlerlemem',
        accountCloudSync: 'Hesap ve Bulut Senkronizasyonu',
        signOut: 'Çıkış Yap',
        syncSignIn: 'Senkronize Et ve Giriş Yap',

        myStats: 'İstatistiklerim',
        signIn: 'Giriş Yap',
        signOutTitle: 'Çıkış yap',
        progressModalTitle: 'İlerlemem',
        overallAccuracy: 'Genel Doğruluk',
        questionsAttempted: 'Cevaplanan Sorular',
        streak: 'Seri',
        mastered: 'Öğrenilen',
        accuracyByCategory: 'Kategoriye Göre Doğruluk',
        alphabetCat: 'Alfabe',
        phrasesCat: 'Temel İfadeler',
        commonWordsCat: 'Yaygın Kelimeler',
        numbersCat: 'Sayılar',
        correctOfTotal: (correct, total) => `${total} soruda ${correct} doğru`,
        syncPromoText: 'İlerlemenizi tüm cihazlarınızda kaydetmek ister misiniz?',
        signInRegister: 'Giriş Yap / Kayıt Ol',
        resetAllStats: 'Tüm İstatistikleri Sıfırla',
        confirmResetStats: 'Tüm ilerleme istatistiklerinizi sıfırlamak istediğinizden emin misiniz?',
        doneBtn: 'Tamam'
      };
    case 'ja':
      return {
        installApp: 'アプリをインストール',
        installAppTitle: 'このデバイスにアプリをインストール',
        loadingLessons: 'レッスンを読み込み中...',
        allRightsReserved: 'All Rights Reserved.',
        aboutContact: '概要・お問い合わせ',
        privacyPolicy: 'プライバシーポリシー',
        termsOfService: '利用規約',
        search: '検索',
        searchTitle: '単語やフレーズを検索 (⌘K)',

        customizingBadge: 'カスタマイズ中',
        popularPairs: '人気の言語ペア',
        chooseLanguageToLearn: '学びたい言語を選択',
        bidirectionalNotice: '双方向カリキュラム · スタジオ品質のネイティブ音声',
        switchDirectionTitle: (baseName: string, targetName: string) =>
          `学習方向を入れ替える：${baseName}を学ぶ（母語：${targetName}）`,

        audioSpeedLabel: '音声速度',
        studioVoicePace: 'スタジオ音声のペース',
        speedDesc05: 'ゆっくり、音節をはっきり',
        speedDesc075: '初心者向けのゆっくり速度',
        speedDesc1: 'ネイティブの自然な速度',
        speedDesc125: '流暢なリスニング練習',

        personalStudyDashboard: '学習ダッシュボード',
        learningPair: '学習言語ペア',
        audioPlaybackSpeed: '音声の再生速度',
        myLearningProgress: '学習の進捗',
        accountCloudSync: 'アカウントとクラウド同期',
        signOut: 'ログアウト',
        syncSignIn: 'ログインして同期',

        myStats: '学習統計',
        signIn: 'ログイン',
        signOutTitle: 'アカウントからログアウト',
        progressModalTitle: '学習の進捗',
        overallAccuracy: '全体の正答率',
        questionsAttempted: '回答した問題数',
        streak: '連続日数',
        mastered: '習得済み',
        accuracyByCategory: 'カテゴリ別の正答率',
        alphabetCat: '文字と発音',
        phrasesCat: '基本フレーズ',
        commonWordsCat: '基本単語',
        numbersCat: '数字と時間',
        correctOfTotal: (correct: number, total: number) => `${total}問中${correct}問正解`,
        syncPromoText: 'すべてのデバイスで進捗を同期しますか？',
        signInRegister: 'ログイン / 登録',
        resetAllStats: 'すべての統計をリセット',
        confirmResetStats: 'すべての学習統計をリセットしてもよろしいですか？',
        doneBtn: '完了'
      };
    case 'ko':
      return {
        installApp: '앱 설치',
        installAppTitle: '이 기기에 앱 설치',
        loadingLessons: '레슨을 불러오는 중...',
        allRightsReserved: 'All Rights Reserved.',
        aboutContact: '소개 및 문의',
        privacyPolicy: '개인정보 처리방침',
        termsOfService: '이용약관',
        search: '검색',
        searchTitle: '단어와 문구 검색 (⌘K)',

        customizingBadge: '맞춤 설정 중',
        popularPairs: '인기 언어 조합',
        chooseLanguageToLearn: '배우고 싶은 언어를 선택하세요',
        bidirectionalNotice: '양방향 커리큘럼 · 스튜디오급 원어민 음성',
        switchDirectionTitle: (baseName: string, targetName: string) =>
          `학습 방향 바꾸기: ${baseName} 학습 (모국어: ${targetName})`,

        audioSpeedLabel: '음성 속도',
        studioVoicePace: '스튜디오 음성 속도',
        speedDesc05: '천천히, 음절을 또렷하게',
        speedDesc075: '초보자용 느린 속도',
        speedDesc1: '원어민의 자연스러운 속도',
        speedDesc125: '유창한 듣기 연습',

        personalStudyDashboard: '나의 학습 대시보드',
        learningPair: '학습 언어 조합',
        audioPlaybackSpeed: '음성 재생 속도',
        myLearningProgress: '나의 학습 진도',
        accountCloudSync: '계정 및 클라우드 동기화',
        signOut: '로그아웃',
        syncSignIn: '로그인하고 동기화',

        myStats: '학습 통계',
        signIn: '로그인',
        signOutTitle: '계정에서 로그아웃',
        progressModalTitle: '나의 학습 진도',
        overallAccuracy: '전체 정답률',
        questionsAttempted: '푼 문제 수',
        streak: '연속 학습일',
        mastered: '마스터함',
        accuracyByCategory: '분류별 정답률',
        alphabetCat: '문자와 발음',
        phrasesCat: '기본 문구',
        commonWordsCat: '기본 단어',
        numbersCat: '숫자와 시간',
        correctOfTotal: (correct: number, total: number) => `${total}문제 중 ${correct}문제 정답`,
        syncPromoText: '모든 기기에서 학습 진도를 동기화하시겠어요?',
        signInRegister: '로그인 / 가입',
        resetAllStats: '모든 통계 초기화',
        confirmResetStats: '모든 학습 통계를 초기화하시겠습니까?',
        doneBtn: '완료'
      };
    case 'zh':
      return {
        installApp: '安装应用',
        installAppTitle: '安装应用到您的设备',
        loadingLessons: '正在加载课程...',
        allRightsReserved: '保留所有权利。',
        aboutContact: '关于与联系',
        privacyPolicy: '隐私政策',
        termsOfService: '服务条款',
        search: '搜索',
        searchTitle: '搜索词汇与语法 (⌘K)',

        customizingBadge: '课程配置中',
        popularPairs: '热门语言对',
        chooseLanguageToLearn: '选择您想学习的语言',
        bidirectionalNotice: '双向母语教学 · 录音棚级母语发音',
        switchDirectionTitle: (baseName: string, targetName: string) =>
          `对调学习方向：学习 ${baseName}（母语：${targetName}）`,

        audioSpeedLabel: '语速调节',
        studioVoicePace: '录音棚语速',
        speedDesc05: '放慢发音，听清音节',
        speedDesc075: '初学者慢速',
        speedDesc1: '母语自然语速',
        speedDesc125: '流利快速听力',

        personalStudyDashboard: '个人学习面板',
        learningPair: '学习语言对',
        audioPlaybackSpeed: '音频播放速度',
        myLearningProgress: '我的学习进度',
        accountCloudSync: '账户与云同步',
        signOut: '退出登录',
        syncSignIn: '登录并同步',

        myStats: '学习统计',
        signIn: '登录',
        signOutTitle: '退出当前账户',
        progressModalTitle: '我的学习进度',
        overallAccuracy: '总体准确率',
        questionsAttempted: '已答题数',
        streak: '连续打卡',
        mastered: '已掌握',
        accuracyByCategory: '各分类准确率',
        alphabetCat: '字母拼音',
        phrasesCat: '基础短语',
        commonWordsCat: '核心词汇',
        numbersCat: '数字时间',
        correctOfTotal: (correct: number, total: number) => `答对 ${correct} / 共 ${total} 题`,
        syncPromoText: '想在所有设备间同步保存学习进度吗？',
        signInRegister: '登录 / 注册',
        resetAllStats: '重置所有统计',
        confirmResetStats: '确定要重置所有学习统计进度吗？',
        doneBtn: '完成'
      };
    case 'hi':
      return {
        installApp: 'ऐप इंस्टॉल करें',
        installAppTitle: 'अपने डिवाइस पर ऐप इंस्टॉल करें',
        loadingLessons: 'पाठ लोड हो रहे हैं...',
        allRightsReserved: 'सर्वाधिकार सुरक्षित।',
        aboutContact: 'परिचय और संपर्क',
        privacyPolicy: 'गोपनीयता नीति',
        termsOfService: 'सेवा की शर्तें',
        search: 'खोजें',
        searchTitle: 'शब्दावली और वाक्यांश खोजें (⌘K)',

        customizingBadge: 'अनुकूलन जारी',
        popularPairs: 'लोकप्रिय भाषा जोड़े',
        chooseLanguageToLearn: 'सीखने के लिए भाषा चुनें',
        bidirectionalNotice: 'द्विदिशीय पाठ्यक्रम · स्टूडियो न्यूरल वॉइस',
        switchDirectionTitle: (baseName: string, targetName: string) =>
          `दिशा बदलें: ${targetName} से ${baseName} सीखें`,

        audioSpeedLabel: 'ध्वनि गति',
        studioVoicePace: 'स्टूडियो आवाज़ की गति',
        speedDesc05: 'धीमी गति',
        speedDesc075: 'शिक्षार्थी गति',
        speedDesc1: 'स्वाभाविक गति',
        speedDesc125: 'तेज़ गति',

        personalStudyDashboard: 'व्यक्तिगत अध्ययन डैशबोर्ड',
        learningPair: 'भाषा जोड़ा',
        audioPlaybackSpeed: 'ऑडियो प्लेबैक गति',
        myLearningProgress: 'मेरी सीखने की प्रगति',
        accountCloudSync: 'खाता और क्लाउड सिंक',
        signOut: 'लॉग आउट',
        syncSignIn: 'सिंक और लॉग इन करें',

        myStats: 'मेरे आँकड़े',
        signIn: 'लॉग इन',
        signOutTitle: 'लॉग आउट',
        progressModalTitle: 'मेरी प्रगति',
        overallAccuracy: 'समग्र सटीकता',
        questionsAttempted: 'प्रयास किए गए प्रश्न',
        streak: 'दैनिक स्ट्रीक',
        mastered: 'कंठस्थ',
        accuracyByCategory: 'श्रेणीवार सटीकता',
        alphabetCat: 'वर्णमाला',
        phrasesCat: 'मूल वाक्यांश',
        commonWordsCat: 'सामान्य शब्द',
        numbersCat: 'संख्याएँ व समय',
        correctOfTotal: (correct: number, total: number) => `${total} में से ${correct} सही`,
        syncPromoText: 'क्या आप सभी डिवाइसों पर अपनी प्रगति सहेजना चाहते हैं?',
        signInRegister: 'लॉग इन / पंजीकरण',
        resetAllStats: 'सभी आँकड़े रीसेट करें',
        confirmResetStats: 'क्या आप वाकई अपने सभी प्रगति आँकड़े रीसेट करना चाहते हैं?',
        doneBtn: 'पूर्ण'
      };
    case 'en':
    default:
      return {
        installApp: 'Install App',
        installAppTitle: 'Install Application on your device',
        loadingLessons: 'Loading lessons...',
        allRightsReserved: 'All Rights Reserved.',
        aboutContact: 'About & Contact',
        privacyPolicy: 'Privacy Policy',
        termsOfService: 'Terms of Service',
        search: 'Search',
        searchTitle: 'Search concepts (⌘K)',

        customizingBadge: 'Customizing',
        popularPairs: 'Popular Pairs',
        chooseLanguageToLearn: 'Choose Language to Learn',
        bidirectionalNotice: 'Bidirectional curriculum · Studio neural voice',
        switchDirectionTitle: (baseName, targetName) =>
          `Switch direction: Learn ${baseName} from ${targetName}`,

        audioSpeedLabel: 'Audio Speed',
        studioVoicePace: 'Studio voice pace',
        speedDesc05: 'Slow-motion for clear syllables',
        speedDesc075: 'Learner pace',
        speedDesc1: 'Natural native speed',
        speedDesc125: 'Fast fluent listening',

        personalStudyDashboard: 'Personal Study Dashboard',
        learningPair: 'Learning Pair',
        audioPlaybackSpeed: 'Audio Playback Speed',
        myLearningProgress: 'My Learning Progress',
        accountCloudSync: 'Account & Cloud Sync',
        signOut: 'Sign Out',
        syncSignIn: 'Sync & Sign In',

        myStats: 'My Stats',
        signIn: 'Sign In',
        signOutTitle: 'Sign out',
        progressModalTitle: 'My Progress',
        overallAccuracy: 'Overall Accuracy',
        questionsAttempted: 'Questions Attempted',
        streak: 'Streak',
        mastered: 'Mastered',
        accuracyByCategory: 'Accuracy by Category',
        alphabetCat: 'Alphabet',
        phrasesCat: 'Basic Phrases',
        commonWordsCat: 'Common Words',
        numbersCat: 'Numbers',
        correctOfTotal: (correct, total) => `${correct} of ${total} correct`,
        syncPromoText: 'Want to save your progress across all your devices?',
        signInRegister: 'Sign In / Register',
        resetAllStats: 'Reset All Stats',
        confirmResetStats: 'Are you sure you want to reset all your progress stats?',
        doneBtn: 'Done'
      };
  }
};


/**
 * Note shown after a quiz answer when the target word has more than one meaning
 * (e.g. 月 = "Moon" / "Month"), so the learner knows every sense is accepted.
 */
export const getMultiMeaningNote = (
  baseLang: SupportedLanguageId,
  target: string,
  meanings: string[]
): string => {
  const m = meanings.join(' · ');
  const t = target;
  switch (baseLang) {
    case 'es': return `«${t}» tiene más de un significado: ${m}`;
    case 'fr': return `« ${t} » a plusieurs sens : ${m}`;
    case 'ru': return `«${t}» имеет несколько значений: ${m}`;
    case 'pt': return `“${t}” tem mais de um significado: ${m}`;
    case 'de': return `„${t}“ hat mehrere Bedeutungen: ${m}`;
    case 'id': return `“${t}” memiliki lebih dari satu arti: ${m}`;
    case 'tr': return `“${t}” birden fazla anlama gelir: ${m}`;
    case 'ja': return `「${t}」には複数の意味があります：${m}`;
    case 'ko': return `「${t}」에는 여러 가지 뜻이 있습니다: ${m}`;
    case 'zh': return `“${t}”有多个意思：${m}`;
    case 'hi': return `“${t}” के एक से अधिक अर्थ हैं: ${m}`;
    case 'ar': return `«${t}» لها أكثر من معنى: ${m}`;
    case 'bn': return `“${t}” এর একাধিক অর্থ আছে: ${m}`;
    case 'ur': return `“${t}” کے ایک سے زیادہ معنی ہیں: ${m}`;
    case 'en':
    default: return `“${t}” has more than one meaning: ${m}`;
  }
};

/** Descriptions for the 0.9× and 1.1× playback speeds in the learner's language. */
export const getRelaxedAndBriskSpeedLabels = (baseLang: SupportedLanguageId): { relaxed: string; brisk: string } => {
  const table: Record<SupportedLanguageId, { relaxed: string; brisk: string }> = {
    en: { relaxed: 'Relaxed', brisk: 'Brisk natural cadence' },
    es: { relaxed: 'Relajado', brisk: 'Ritmo ágil' },
    fr: { relaxed: 'Détendu', brisk: 'Rythme vif' },
    ru: { relaxed: 'Спокойный темп', brisk: 'Живой темп' },
    pt: { relaxed: 'Descontraído', brisk: 'Ritmo ágil' },
    de: { relaxed: 'Entspannt', brisk: 'Flotter Rhythmus' },
    id: { relaxed: 'Santai', brisk: 'Irama cepat alami' },
    tr: { relaxed: 'Rahat', brisk: 'Canlı doğal tempo' },
    ja: { relaxed: 'ゆったり', brisk: 'テンポよく自然に' },
    ko: { relaxed: '여유로운 속도', brisk: '활기찬 자연스러운 속도' },
    zh: { relaxed: '轻松语速', brisk: '轻快自然语速' },
    hi: { relaxed: 'आरामदायक गति', brisk: 'तेज़ प्राकृतिक लय' },
    ar: { relaxed: 'وتيرة مريحة', brisk: 'إيقاع طبيعي سريع' },
    bn: { relaxed: 'স্বাচ্ছন্দ্যময় গতি', brisk: 'দ্রুত স্বাভাবিক ছন্দ' },
    ur: { relaxed: 'آرام دہ رفتار', brisk: 'تیز قدرتی رفتار' },
  };
  return table[baseLang] ?? table.en;
};

/** Text of the "Request a Language" note shown at the bottom of the language picker. */
export const getLanguageRequestCopy = (
  baseLang: SupportedLanguageId
): { title: string; before: string; after: string } => {
  const table: Record<SupportedLanguageId, { title: string; before: string; after: string }> = {
    en: { title: 'Request a Language', before: "Have a language you'd love to learn? Email", after: 'to request it. Once this project is open source, community contributions will enable support for even more languages!' },
    es: { title: 'Solicita un idioma', before: '¿Hay un idioma que te gustaría aprender? Escribe a', after: 'para pedirlo. ¡Cuando este proyecto sea de código abierto, las contribuciones de la comunidad permitirán aún más idiomas!' },
    fr: { title: 'Demandez une langue', before: 'Une langue que vous aimeriez apprendre ? Écrivez à', after: 'pour la demander. Une fois ce projet open source, les contributions de la communauté permettront d’ajouter encore plus de langues !' },
    ru: { title: 'Запросить язык', before: 'Хотите изучать другой язык? Напишите на', after: 'и мы рассмотрим запрос. Когда проект станет открытым, вклад сообщества позволит добавить ещё больше языков!' },
    pt: { title: 'Peça um idioma', before: 'Quer aprender outro idioma? Escreva para', after: 'para solicitá-lo. Quando o projeto for de código aberto, as contribuições da comunidade permitirão ainda mais idiomas!' },
    de: { title: 'Sprache anfragen', before: 'Möchtest du eine andere Sprache lernen? Schreibe an', after: 'um sie anzufragen. Sobald das Projekt Open Source ist, ermöglichen Beiträge der Community noch mehr Sprachen!' },
    id: { title: 'Minta Bahasa', before: 'Ingin belajar bahasa lain? Kirim email ke', after: 'untuk memintanya. Setelah proyek ini open source, kontribusi komunitas akan menghadirkan lebih banyak bahasa!' },
    tr: { title: 'Dil Talep Et', before: 'Öğrenmek istediğiniz başka bir dil mi var? Şu adrese yazın:', after: 'Bu proje açık kaynak olduğunda topluluk katkılarıyla daha da fazla dil desteklenecek!' },
    ja: { title: '言語をリクエスト', before: '学びたい言語はありますか？こちらにメールしてください：', after: 'このプロジェクトがオープンソースになれば、コミュニティの協力でさらに多くの言語に対応できます！' },
    ko: { title: '언어 요청', before: '배우고 싶은 언어가 있나요? 이메일을 보내 주세요:', after: '이 프로젝트가 오픈 소스가 되면 커뮤니티 기여로 더 많은 언어를 지원할 수 있습니다!' },
    zh: { title: '申请新语言', before: '想学习其他语言吗？请发送邮件至', after: '提出申请。项目开源后，社区贡献将支持更多语言！' },
    hi: { title: 'भाषा का अनुरोध करें', before: 'कोई और भाषा सीखना चाहते हैं? ईमेल करें:', after: 'अनुरोध करने के लिए। प्रोजेक्ट के ओपन सोर्स होने पर समुदाय के योगदान से और भी भाषाएँ जुड़ेंगी!' },
    ar: { title: 'اطلب لغة', before: 'هل ترغب في تعلّم لغة أخرى؟ راسلنا على', after: 'لطلبها. وعندما يصبح المشروع مفتوح المصدر ستتيح مساهمات المجتمع دعم المزيد من اللغات!' },
    bn: { title: 'ভাষার অনুরোধ করুন', before: 'অন্য কোনো ভাষা শিখতে চান? ইমেইল করুন:', after: 'অনুরোধ জানাতে। প্রকল্পটি ওপেন সোর্স হলে কমিউনিটির অবদানে আরও ভাষা যুক্ত হবে!' },
    ur: { title: 'زبان کی درخواست کریں', before: 'کوئی اور زبان سیکھنا چاہتے ہیں؟ ای میل کریں:', after: 'درخواست کے لیے۔ پروجیکٹ اوپن سورس ہونے پر کمیونٹی کے تعاون سے مزید زبانیں شامل ہوں گی!' },
  };
  return table[baseLang] ?? table.en;
};

/** Subtitle and confirm-button text of the language picker dialog. */
export const getLanguagePickerCopy = (baseLang: SupportedLanguageId): { subtitle: string; done: string } => {
  const table: Record<SupportedLanguageId, { subtitle: string; done: string }> = {
    en: { subtitle: 'Choose your native language and the language you want to study', done: 'Done' },
    es: { subtitle: 'Elige tu idioma nativo y el curso que deseas estudiar', done: 'Listo' },
    fr: { subtitle: 'Choisissez votre langue maternelle et le cours à étudier', done: 'Terminé' },
    de: { subtitle: 'Wähle deine Muttersprache und die Zielsprache', done: 'Fertig' },
    ru: { subtitle: 'Выберите родной язык и язык для изучения', done: 'Готово' },
    pt: { subtitle: 'Escolha seu idioma nativo e o curso que deseja estudar', done: 'Concluir' },
    tr: { subtitle: 'Ana dilinizi ve öğrenmek istediğiniz dili seçin', done: 'Tamam' },
    id: { subtitle: 'Pilih bahasa ibu dan bahasa yang ingin Anda pelajari', done: 'Selesai' },
    ja: { subtitle: '母語と学びたい言語を選んでください', done: '完了' },
    ko: { subtitle: '모국어와 배우고 싶은 언어를 선택하세요', done: '완료' },
    zh: { subtitle: '选择您的母语和想学习的语言', done: '完成' },
    hi: { subtitle: 'अपनी मातृभाषा और सीखने की भाषा चुनें', done: 'पूर्ण' },
    ar: { subtitle: 'اختر لغتك الأم واللغة التي تريد تعلّمها', done: 'تم' },
    bn: { subtitle: 'আপনার মাতৃভাষা ও শেখার ভাষা বেছে নিন', done: 'সম্পন্ন' },
    ur: { subtitle: 'اپنی مادری زبان اور سیکھنے کی زبان منتخب کریں', done: 'مکمل' },
  };
  return table[baseLang] ?? table.en;
};

export type PraiseTier = 'perfect' | 'great' | 'good' | 'practice';

export const getPraiseTier = (percentage: number): PraiseTier =>
  percentage === 100 ? 'perfect' : percentage >= 80 ? 'great' : percentage >= 60 ? 'good' : 'practice';

/**
 * Short praise shown on the quiz recap, in the language being learned, with a pronunciation hint
 * (romanization for non-Latin scripts) so every learner also practices a phrase they can say aloud.
 */
export const getPraiseHeadline = (
  targetLang: SupportedLanguageId,
  percentage: number
): { title: string; pronunciation: string } => {
  const table: Record<SupportedLanguageId, Record<PraiseTier, { title: string; pronunciation: string }>> = {
    en: {
      perfect: { title: 'Outstanding!', pronunciation: 'Perfect score!' },
      great: { title: 'Great Job!', pronunciation: 'Well done!' },
      good: { title: 'Good Progress!', pronunciation: 'Keep going!' },
      practice: { title: 'Practice makes perfect', pronunciation: 'Step by step' },
    },
    es: {
      perfect: { title: '¡Excelente!', pronunciation: '¡Puntaje perfecto!' },
      great: { title: '¡Muy bien!', pronunciation: '¡Mwee byehn!' },
      good: { title: '¡Buen trabajo!', pronunciation: '¡Bwehn trah-BAH-hoh!' },
      practice: { title: 'La práctica hace al maestro', pronunciation: '¡Sigue practicando!' },
    },
    fr: {
      perfect: { title: 'Parfait !', pronunciation: 'Score parfait !' },
      great: { title: 'Très bien !', pronunciation: 'Treh byahn !' },
      good: { title: 'Bien joué !', pronunciation: 'Byahn zhoo-AY !' },
      practice: { title: 'C’est en forgeant qu’on devient forgeron', pronunciation: 'Continuez à pratiquer !' },
    },
    ru: {
      perfect: { title: 'Отлично!', pronunciation: 'Otlichno!' },
      great: { title: 'Молодец!', pronunciation: 'Molodets!' },
      good: { title: 'Хорошо!', pronunciation: 'Khorosho!' },
      practice: { title: 'Повторение — мать учения', pronunciation: 'Povtorenie — mat ucheniya' },
    },
    de: {
      perfect: { title: 'Ausgezeichnet!', pronunciation: 'OWS-ge-tsyke-net' },
      great: { title: 'Sehr gut!', pronunciation: 'zair goot' },
      good: { title: 'Gut gemacht!', pronunciation: 'goot ge-MAKHT' },
      practice: { title: 'Übung macht den Meister', pronunciation: 'EW-bung makht dayn MY-ster' },
    },
    pt: {
      perfect: { title: 'Excelente!', pronunciation: 'ex-se-LEN-tchi' },
      great: { title: 'Muito bem!', pronunciation: 'MWEEN-too bayn' },
      good: { title: 'Bom trabalho!', pronunciation: 'bohm tra-BA-lyoo' },
      practice: { title: 'A prática leva à perfeição', pronunciation: 'a PRA-tchi-ka LEH-va a per-fay-SOWN' },
    },
    id: {
      perfect: { title: 'Luar biasa!', pronunciation: 'LOO-ar bee-AH-sah' },
      great: { title: 'Bagus sekali!', pronunciation: 'BAH-goos seh-KAH-lee' },
      good: { title: 'Kerja bagus!', pronunciation: 'KER-jah BAH-goos' },
      practice: { title: 'Latihan membuat sempurna', pronunciation: 'lah-TEE-han mem-BOO-at sem-POOR-nah' },
    },
    tr: {
      perfect: { title: 'Mükemmel!', pronunciation: 'mew-kem-MEL' },
      great: { title: 'Çok iyi!', pronunciation: 'chok ee-YEE' },
      good: { title: 'İyi iş!', pronunciation: 'ee-YEE ish' },
      practice: { title: 'Tekrar ustalık getirir', pronunciation: 'tek-RAR oos-tah-LUK geh-teer-EER' },
    },
    ja: {
      perfect: { title: '完璧です！', pronunciation: 'Kanpeki desu!' },
      great: { title: 'よくできました！', pronunciation: 'Yoku dekimashita!' },
      good: { title: 'いい調子！', pronunciation: 'Ii chōshi!' },
      practice: { title: '継続は力なり', pronunciation: 'Keizoku wa chikara nari' },
    },
    ko: {
      perfect: { title: '완벽해요!', pronunciation: 'Wanbyeokaeyo!' },
      great: { title: '잘했어요!', pronunciation: 'Jalhaesseoyo!' },
      good: { title: '좋아요!', pronunciation: 'Joayo!' },
      practice: { title: '연습이 완벽을 만든다', pronunciation: 'Yeonseubi wanbyeogeul mandeunda' },
    },
    zh: {
      perfect: { title: '太棒了！', pronunciation: 'Tài bàng le!' },
      great: { title: '做得好！', pronunciation: 'Zuò de hǎo!' },
      good: { title: '不错！', pronunciation: 'Bú cuò!' },
      practice: { title: '熟能生巧', pronunciation: 'Shú néng shēng qiǎo' },
    },
    hi: {
      perfect: { title: 'शानदार!', pronunciation: 'Shaandaar!' },
      great: { title: 'बहुत बढ़िया!', pronunciation: 'Bahut badhiya!' },
      good: { title: 'अच्छा प्रयास!', pronunciation: 'Achchha prayaas!' },
      practice: { title: 'अभ्यास से ही पूर्णता आती है', pronunciation: 'Abhyaas se hi poornata aati hai' },
    },
    ar: {
      perfect: { title: 'ممتاز!', pronunciation: 'Mumtaaz!' },
      great: { title: 'أحسنت!', pronunciation: 'Ahsanta!' },
      good: { title: 'جيد!', pronunciation: 'Jayyid!' },
      practice: { title: 'التكرار يعلّم الشطّار', pronunciation: 'At-Takraar yu\'allim ash-shuttaar' },
    },
    bn: {
      perfect: { title: 'চমৎকার!', pronunciation: 'Chomotkar!' },
      great: { title: 'দারুণ!', pronunciation: 'Darun!' },
      good: { title: 'ভালো!', pronunciation: 'Bhalo!' },
      practice: { title: 'অভ্যাসেই পারদর্শিতা', pronunciation: 'Obhyaashei paardorshita' },
    },
    ur: {
      perfect: { title: 'شاندار!', pronunciation: 'Shaandaar!' },
      great: { title: 'بہت خوب!', pronunciation: 'Bohat khoob!' },
      good: { title: 'اچھا!', pronunciation: 'Achha!' },
      practice: { title: 'مشق سے کمال آتا ہے', pronunciation: 'Mashq se kamaal aata hai' },
    },
  };
  return (table[targetLang] ?? table.en)[getPraiseTier(percentage)];
};
