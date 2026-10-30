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
export const getPageContent = (
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
      ko: '카드를 탭하여 번역과 발음을 확인하세요'
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
      ko: '카드를 탭하여 번역과 발음을 확인하세요'
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

/**
 * In-card alphabet UI labels (Sound, Example, as in) in the learner's base language
 */
export const getAlphabetLabels = (baseLang: SupportedLanguageId) => {
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
      ko: 'Базовый Корейский'
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
      ko: 'Coreano Básico'
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
      ko: 'Coréen de Base'
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
      ko: 'Coreano Básico'
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
      ko: 'Basis-Koreanisch'
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
      ko: 'Bahasa Korea Dasar'
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
      ko: 'Temel Korece'
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
      ko: 'Basic Korean'
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
      ko: 'ベーシック韓国語'
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
      ko: '베이직 한국어'
    }
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
      ko: 'Корейский'
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
      ko: 'Coreano'
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
      ko: 'Coréen'
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
      ko: 'Coreano'
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
      ko: 'Koreanisch'
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
      ko: 'Korea'
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
      ko: 'Korece'
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
      zh: '中国語'
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
      zh: '중국어'
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
    'greetings': { en: 'Greetings', es: 'Saludos', fr: 'Salutations', ru: 'Приветствия', pt: 'Saudações', de: 'Begrüßungen', id: 'Sapaan', tr: 'Selamlaşma' },
    'conversation': { en: 'Conversation', es: 'Conversación', fr: 'Conversation', ru: 'Разговор', pt: 'Conversação', de: 'Gespräch', id: 'Percakapan', tr: 'Sohbet' },
    'introductions': { en: 'Introductions', es: 'Presentaciones', fr: 'Présentations', ru: 'Знакомство', pt: 'Apresentações', de: 'Vorstellung', id: 'Perkenalan', tr: 'Tanışma' },
    'farewells': { en: 'Farewells', es: 'Despedidas', fr: 'Au revoir', ru: 'Прощание', pt: 'Despedidas', de: 'Abschied', id: 'Perpisahan', tr: 'Vedalaşma' },
    'politeness': { en: 'Politeness', es: 'Cortesía', fr: 'Politesse', ru: 'Вежливость', pt: 'Cortesia', de: 'Höflichkeit', id: 'Kesopanan', tr: 'Nezaket' },
    'responses': { en: 'Responses', es: 'Respuestas', fr: 'Réponses', ru: 'Ответы', pt: 'Respostas', de: 'Antworten', id: 'Tanggapan', tr: 'Yanıtlar' },
    'communication': { en: 'Communication', es: 'Comunicación', fr: 'Communication', ru: 'Общение', pt: 'Comunicação', de: 'Kommunikation', id: 'Komunikasi', tr: 'İletişim' },
    'travel': { en: 'Travel', es: 'Viajes', fr: 'Voyage', ru: 'Путешествия', pt: 'Viagem', de: 'Reisen', id: 'Perjalanan', tr: 'Seyahat' },
    'food & drink': { en: 'Food & Drink', es: 'Comida y Bebida', fr: 'Nourriture et Boissons', ru: 'Еда и напитки', pt: 'Comida e Bebida', de: 'Essen & Trinken', id: 'Makanan & Minuman', tr: 'Yiyecek ve İçecek' },
    'dining': { en: 'Dining', es: 'Restaurante', fr: 'Au Restaurant', ru: 'В ресторане', pt: 'Restaurante', de: 'Im Restaurant', id: 'Restoran', tr: 'Restoran' },
    'shopping': { en: 'Shopping', es: 'Compras', fr: 'Achats', ru: 'Покупки', pt: 'Compras', de: 'Einkaufen', id: 'Belanja', tr: 'Alışveriş' },
    'emergency': { en: 'Emergency', es: 'Emergencia', fr: 'Urgence', ru: 'Экстренные случаи', pt: 'Emergência', de: 'Notfall', id: 'Darurat', tr: 'Acil Durum' },
    'people & family': { en: 'People & Family', es: 'Gente y Familia', fr: 'Personnes et Famille', ru: 'Люди и семья', pt: 'Pessoas e Família', de: 'Menschen & Familie', id: 'Orang & Keluarga', tr: 'İnsanlar ve Aile' },
    'people': { en: 'People', es: 'Gente', fr: 'Personnes', ru: 'Люди', pt: 'Pessoas', de: 'Menschen', id: 'Orang', tr: 'İnsanlar' },
    'places': { en: 'Places', es: 'Lugares', fr: 'Lieux', ru: 'Места', pt: 'Lugares', de: 'Orte', id: 'Tempat', tr: 'Yerler' },
    'transport': { en: 'Transport', es: 'Transporte', fr: 'Transports', ru: 'Транспорт', pt: 'Transporte', de: 'Verkehr', id: 'Transportasi', tr: 'Ulaşım' },
    'everyday objects': { en: 'Everyday Objects', es: 'Objetos Cotidianos', fr: 'Objets du Quotidien', ru: 'Повседневные предметы', pt: 'Objetos do Dia a Dia', de: 'Alltagsgegenstände', id: 'Benda Sehari-hari', tr: 'Günlük Eşyalar' },
    'everyday essentials': { en: 'Everyday Essentials', es: 'Esenciales Diarios', fr: 'Essentiels du Quotidien', ru: 'Повседневные вещи', pt: 'Essenciais Diários', de: 'Alltägliches', id: 'Kebutuhan Harian', tr: 'Günlük İhtiyaçlar' },
    'essentials': { en: 'Essentials', es: 'Esenciales', fr: 'Essentiels', ru: 'Основное', pt: 'Essenciais', de: 'Grundlagen', id: 'Penting', tr: 'Temel' },
    'work': { en: 'Work', es: 'Trabajo', fr: 'Travail', ru: 'Работа', pt: 'Trabalho', de: 'Arbeit', id: 'Pekerjaan', tr: 'İş' },
    'finance': { en: 'Finance', es: 'Finanzas', fr: 'Finances', ru: 'Финансы', pt: 'Finanças', de: 'Finanzen', id: 'Keuangan', tr: 'Finans' },
    'time & weather': { en: 'Time & Weather', es: 'Tiempo y Clima', fr: 'Temps et Météo', ru: 'Время и погода', pt: 'Tempo e Clima', de: 'Zeit & Wetter', id: 'Waktu & Cuaca', tr: 'Zaman ve Hava' },
    'descriptions': { en: 'Descriptions', es: 'Descripciones', fr: 'Descriptions', ru: 'Описания', pt: 'Descrições', de: 'Beschreibungen', id: 'Deskripsi', tr: 'Tanımlar' },
    'common verbs': { en: 'Common Verbs', es: 'Verbos Comunes', fr: 'Verbes Courants', ru: 'Основные глаголы', pt: 'Verbos Comuns', de: 'Häufige Verben', id: 'Kata Kerja Umum', tr: 'Yaygın Fiiller' },
    'core actions': { en: 'Core Actions', es: 'Acciones Básicas', fr: 'Actions de Base', ru: 'Основные действия', pt: 'Ações Básicas', de: 'Grundverben', id: 'Tindakan Dasar', tr: 'Temel Eylemler' },
    'numbers': { en: 'Numbers', es: 'Números', fr: 'Nombres', ru: 'Числа', pt: 'Números', de: 'Zahlen', id: 'Angka', tr: 'Sayılar' },
    'numbers 0-10': { en: 'Numbers 0-10', es: 'Números 0-10', fr: 'Nombres 0-10', ru: 'Числа 0–10', pt: 'Números 0–10', de: 'Zahlen 0–10', id: 'Angka 0–10', tr: 'Sayılar 0–10' },
    'numbers 11-20': { en: 'Numbers 11-20', es: 'Números 11-20', fr: 'Nombres 11-20', ru: 'Числа 11–20', pt: 'Números 11–20', de: 'Zahlen 11–20', id: 'Angka 11–20', tr: 'Sayılar 11–20' },
    'tens': { en: 'Tens', es: 'Decenas', fr: 'Dizaines', ru: 'Десятки', pt: 'Dezenas', de: 'Zehner', id: 'Puluhan', tr: 'Onluklar' },
    'hundreds': { en: 'Hundreds', es: 'Centenas', fr: 'Centaines', ru: 'Сотни', pt: 'Centenas', de: 'Hunderter', id: 'Ratusan', tr: 'Yüzlükler' },
    'thousands': { en: 'Thousands', es: 'Miles', fr: 'Milliers', ru: 'Тысячи', pt: 'Milhares', de: 'Tausender', id: 'Ribuan', tr: 'Binlikler' },
    'time': { en: 'Time', es: 'Hora y Tiempo', fr: 'Heure et Temps', ru: 'Время', pt: 'Hora e Tempo', de: 'Zeit', id: 'Waktu', tr: 'Zaman' },
    'questions': { en: 'Questions', es: 'Preguntas', fr: 'Questions', ru: 'Вопросы', pt: 'Perguntas', de: 'Fragen', id: 'Pertanyaan', tr: 'Sorular' },
    'hour': { en: 'Hour', es: 'Horas', fr: 'Heures', ru: 'Часы', pt: 'Horas', de: 'Stunden', id: 'Jam', tr: 'Saat' },
    'minutes': { en: 'Minutes', es: 'Minutos', fr: 'Minutes', ru: 'Минуты', pt: 'Minutos', de: 'Minuten', id: 'Menit', tr: 'Dakika' },
    'special': { en: 'Special', es: 'Especial', fr: 'Spécial', ru: 'Особое', pt: 'Especial', de: 'Spezial', id: 'Khusus', tr: 'Özel' },
    'mixed': { en: 'Mixed', es: 'Mixto', fr: 'Mixte', ru: 'Смешанный', pt: 'Misto', de: 'Gemischt', id: 'Campuran', tr: 'Karışık' },
    'colors': { en: 'Colors', es: 'Colores', fr: 'Couleurs', ru: 'Цвета', pt: 'Cores', de: 'Farben', id: 'Warna', tr: 'Renkler' },
    'weather': { en: 'Weather', es: 'Clima', fr: 'Météo', ru: 'Погода', pt: 'Clima', de: 'Wetter', id: 'Cuaca', tr: 'Hava Durumu' },
    'tech': { en: 'Tech & IT', es: 'Tecnología', fr: 'Tech et IT', ru: 'Технологии', pt: 'Tecnologia', de: 'Tech & IT', id: 'Teknologi & IT', tr: 'Teknoloji ve Bilişim' },
    'business': { en: 'Business', es: 'Negocios', fr: 'Affaires', ru: 'Бизнес', pt: 'Negócios', de: 'Wirtschaft & Büro', id: 'Bisnis & Kantor', tr: 'İş ve Ofis' },
    'health': { en: 'Healthcare', es: 'Salud', fr: 'Santé', ru: 'Здоровье', pt: 'Saúde', de: 'Gesundheit', id: 'Kesehatan', tr: 'Sağlık' },
    'verbs': { en: 'Verbs', es: 'Verbos', fr: 'Verbes', ru: 'Глаголы', pt: 'Verbos', de: 'Verben', id: 'Kata Kerja', tr: 'Fiiller' },
    'calendar': { en: 'Calendar', es: 'Calendario', fr: 'Calendrier', ru: 'Календарь', pt: 'Calendário', de: 'Kalender', id: 'Kalender', tr: 'Takvim' },
    'family': { en: 'Family', es: 'Familia', fr: 'Famille', ru: 'Семья', pt: 'Família', de: 'Familie', id: 'Keluarga', tr: 'Aile' },
    'food': { en: 'Food', es: 'Comida', fr: 'Nourriture', ru: 'Еда', pt: 'Comida', de: 'Essen', id: 'Makanan', tr: 'Yiyecek' },
    'general': { en: 'General', es: 'General', fr: 'Général', ru: 'Общее', pt: 'Geral', de: 'Allgemein', id: 'Umum', tr: 'Genel' },
    'home': { en: 'Home', es: 'Hogar', fr: 'Maison', ru: 'Дом', pt: 'Casa', de: 'Zuhause', id: 'Rumah', tr: 'Ev' },
    'nature': { en: 'Nature', es: 'Naturaleza', fr: 'Nature', ru: 'Природа', pt: 'Natureza', de: 'Natur', id: 'Alam', tr: 'Doğa' },
    'question': { en: 'Questions', es: 'Preguntas', fr: 'Questions', ru: 'Вопросы', pt: 'Perguntas', de: 'Fragen', id: 'Pertanyaan', tr: 'Sorular' },
    'all': { en: 'All', es: 'Todos', fr: 'Tous', ru: 'Все', pt: 'Todos', de: 'Alle', id: 'Semua', tr: 'Tümü' }
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
      tr: 'Tüm Seviyeler'
    },
    '1': {
      en: 'Level 1: Foundations',
      es: 'Nivel 1: Fundamentos',
      fr: 'Niveau 1 : Fondations',
      ru: 'Уровень 1: Базовый',
      pt: 'Nível 1: Fundamentos',
      de: 'Stufe 1: Grundlagen',
      id: 'Tingkat 1: Dasar',
      tr: 'Seviye 1: Temel'
    },
    '2': {
      en: 'Level 2: Workplace',
      es: 'Nivel 2: Laboral',
      fr: 'Niveau 2 : Professionnel',
      ru: 'Уровень 2: Для работы',
      pt: 'Nível 2: Trabalho',
      de: 'Stufe 2: Arbeitswelt',
      id: 'Tingkat 2: Tempat Kerja',
      tr: 'Seviye 2: İş Yeri'
    },
    '3': {
      en: 'Level 3: Professional',
      es: 'Nivel 3: Profesional',
      fr: 'Niveau 3 : Avancé',
      ru: 'Уровень 3: Профессиональный',
      pt: 'Nível 3: Profissional',
      de: 'Stufe 3: Fachkompetenz',
      id: 'Tingkat 3: Mahir',
      tr: 'Seviye 3: İleri'
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
  };
  return map[baseLang] || map.en;
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

  // LanguageSwitcher
  customizingBadge: string;
  popularPairs: string;
  chooseLanguageToLearn: string;
  upcomingCourses: string;
  soonBadge: string;
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
    case 'ru':
      return {
        installApp: 'Установить',
        installAppTitle: 'Установить приложение на устройство',
        loadingLessons: 'Загрузка уроков...',
        allRightsReserved: 'Все права защищены.',
        aboutContact: 'О проекте и контакты',
        privacyPolicy: 'Политика конфиденциальности',
        termsOfService: 'Условия использования',

        customizingBadge: 'Настройка курса',
        popularPairs: 'Популярные языковые пары',
        chooseLanguageToLearn: 'Выберите язык для изучения',
        upcomingCourses: 'Скоро появятся',
        soonBadge: 'Скоро',
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

        customizingBadge: 'Personalizando',
        popularPairs: 'Pares Populares',
        chooseLanguageToLearn: 'Elige el idioma para aprender',
        upcomingCourses: 'Próximos Cursos',
        soonBadge: 'Pronto',
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

        customizingBadge: 'Personnalisation',
        popularPairs: 'Paires Populaires',
        chooseLanguageToLearn: 'Choisir la langue à apprendre',
        upcomingCourses: 'Cours à Venir',
        soonBadge: 'Bientôt',
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

        customizingBadge: 'Personalizando',
        popularPairs: 'Pares Populares',
        chooseLanguageToLearn: 'Escolha o idioma para aprender',
        upcomingCourses: 'Próximos Cursos',
        soonBadge: 'Em breve',
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

        customizingBadge: 'Anpassen',
        popularPairs: 'Beliebte Sprachpaare',
        chooseLanguageToLearn: 'Lernsprache auswählen',
        upcomingCourses: 'Kommende Kurse',
        soonBadge: 'Bald',
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

        customizingBadge: 'Menyesuaikan',
        popularPairs: 'Pasangan Populer',
        chooseLanguageToLearn: 'Pilih Bahasa untuk Dipelajari',
        upcomingCourses: 'Kursus Mendatang',
        soonBadge: 'Segera',
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

        customizingBadge: 'Özelleştirme',
        popularPairs: 'Popüler Çiftler',
        chooseLanguageToLearn: 'Öğrenilecek Dili Seçin',
        upcomingCourses: 'Yakında Gelecek Kurslar',
        soonBadge: 'Yakında',
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

        customizingBadge: 'Customizing',
        popularPairs: 'Popular Pairs',
        chooseLanguageToLearn: 'Choose Language to Learn',
        upcomingCourses: 'Upcoming Courses',
        soonBadge: 'Soon',
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

