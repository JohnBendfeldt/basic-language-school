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
        case 'en':
        default:
          return {
            title: 'French Alphabet',
            subtitle: '26 letters with pronunciation guides, example vocabulary, and native studio audio'
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
      ru: 'Нажмите на любую карточку, чтобы увидеть перевод и произношение'
    };

    if (targetLang === 'en') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Основные английские фразы', subtitle: subtitleByBase.ru };
        case 'es':
          return { title: 'Frases básicas en inglés', subtitle: subtitleByBase.es };
        case 'fr':
          return { title: 'Phrases de base en anglais', subtitle: subtitleByBase.fr };
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
        case 'en':
        default:
          return { title: 'French Essential Phrases', subtitle: subtitleByBase.en };
      }
    }
  }

  // 3. COMMON WORDS
  if (section === 'words') {
    const subtitleByBase: Record<SupportedLanguageId, string> = {
      en: 'Tap any card to reveal its translation and pronunciation',
      es: 'Toca cualquier tarjeta para ver su traducción y pronunciación',
      fr: 'Appuyez sur une carte pour voir sa traduction et sa prononciation',
      ru: 'Нажмите на любую карточку, чтобы увидеть перевод и произношение'
    };

    if (targetLang === 'en') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Популярные английские слова', subtitle: subtitleByBase.ru };
        case 'es':
          return { title: 'Palabras comunes en inglés', subtitle: subtitleByBase.es };
        case 'fr':
          return { title: 'Mots courants en anglais', subtitle: subtitleByBase.fr };
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
        case 'en':
        default:
          return { title: 'Common French Words & Vocabulary', subtitle: subtitleByBase.en };
      }
    }
  }

  // 4. NUMBERS
  if (section === 'numbers') {
    if (targetLang === 'en') {
      switch (baseLang) {
        case 'ru':
          return { title: 'Английские числа (0–1000)', subtitle: 'Количественные числительные с правильным произношением' };
        case 'es':
          return { title: 'Números en inglés (0–1.000)', subtitle: 'Números cardinales con pronunciación nativa' };
        case 'fr':
          return { title: 'Nombres en anglais (0–1 000)', subtitle: 'Nombres cardinaux avec prononciation native' };
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
        case 'en':
        default:
          return { title: 'French Telling Time & Expressions', subtitle: 'Learn hours, minutes, and essential daily time expressions' };
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
      return { sound: 'Son :', example: 'Exemple :', asIn: 'comme dans' };
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
