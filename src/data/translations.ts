import { SupportedLanguageId } from './languages/types';

export interface UIStrings {
  // Navigation tabs
  alphabet: string;
  basicPhrases: string;
  commonWords: string;
  numbersAndTime: string;
  numbers: string;
  time: string;
  quiz: string;

  // Header / App controls
  iSpeak: string;
  iWantToLearn: string;
  learning: string;
  nativeLanguage: string;
  switchPair: string;
  playbackSpeed: string;
  installApp: string;
  myStats: string;

  // Card labels & common actions
  example: string;
  sound: string;
  meaning: string;
  listen: string;
  tapToReveal: string;
  hide: string;
  revealAll: string;
  hideAll: string;

  // Quiz strings
  testYourKnowledge: string;
  checkAnswer: string;
  nextQuestion: string;
  startNextQuiz: string;
  completeQuiz: string;
  pressEnter: string;
  yourAnswerHere: string;
  correct: string;
  incorrect: string;
  wordsToReview: string;
}

export const UI_TRANSLATIONS: Record<SupportedLanguageId, UIStrings> = {
  en: {
    alphabet: 'Alphabet',
    basicPhrases: 'Basic Phrases',
    commonWords: 'Common Words',
    numbersAndTime: 'Numbers & Time',
    numbers: 'Numbers',
    time: 'Time & Days',
    quiz: 'Quiz',

    iSpeak: 'I speak',
    iWantToLearn: 'I want to learn',
    learning: 'Learning',
    nativeLanguage: 'My Language',
    switchPair: 'Switch languages',
    playbackSpeed: 'Audio speed',
    installApp: 'Install App',
    myStats: 'My Stats',

    example: 'Example',
    sound: 'Sound',
    meaning: 'Meaning',
    listen: 'Listen',
    tapToReveal: 'Tap to reveal translation',
    hide: 'Hide',
    revealAll: 'Reveal All',
    hideAll: 'Hide All',

    testYourKnowledge: 'Test Your Knowledge',
    checkAnswer: 'Check Answer',
    nextQuestion: 'Next Question',
    startNextQuiz: 'Start Next Quiz',
    completeQuiz: 'Complete Quiz & View Results',
    pressEnter: 'press ↵ Enter',
    yourAnswerHere: 'Your answer here...',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    wordsToReview: 'Words to Review from This Session',
  },

  es: {
    alphabet: 'Alfabeto',
    basicPhrases: 'Frases Básicas',
    commonWords: 'Palabras Comunes',
    numbersAndTime: 'Números y Tiempo',
    numbers: 'Números',
    time: 'Tiempo y Días',
    quiz: 'Cuestionario',

    iSpeak: 'Hablo',
    iWantToLearn: 'Quiero aprender',
    learning: 'Aprendiendo',
    nativeLanguage: 'Mi idioma',
    switchPair: 'Cambiar idiomas',
    playbackSpeed: 'Velocidad de audio',
    installApp: 'Instalar App',
    myStats: 'Mis Estadísticas',

    example: 'Ejemplo',
    sound: 'Sonido',
    meaning: 'Significado',
    listen: 'Escuchar',
    tapToReveal: 'Toca para revelar traducción',
    hide: 'Ocultar',
    revealAll: 'Mostrar Todo',
    hideAll: 'Ocultar Todo',

    testYourKnowledge: 'Pon a Prueba tu Conocimiento',
    checkAnswer: 'Comprobar Respuesta',
    nextQuestion: 'Siguiente Pregunta',
    startNextQuiz: 'Comenzar Siguiente Quiz',
    completeQuiz: 'Completar Quiz y Ver Resultados',
    pressEnter: 'presiona ↵ Enter',
    yourAnswerHere: 'Escribe tu respuesta aquí...',
    correct: '¡Correcto!',
    incorrect: 'Incorrecto',
    wordsToReview: 'Palabras para Repasar de Esta Sesión',
  },

  fr: {
    alphabet: 'Alphabet',
    basicPhrases: 'Phrases de Base',
    commonWords: 'Mots Courants',
    numbersAndTime: 'Nombres et Heure',
    numbers: 'Nombres',
    time: 'Heure et Jours',
    quiz: 'Quiz',

    iSpeak: 'Je parle',
    iWantToLearn: 'Je veux apprendre',
    learning: 'Apprentissage',
    nativeLanguage: 'Ma langue',
    switchPair: 'Changer de langues',
    playbackSpeed: 'Vitesse audio',
    installApp: 'Installer l\'App',
    myStats: 'Mes Stats',

    example: 'Exemple',
    sound: 'Son',
    meaning: 'Signification',
    listen: 'Écouter',
    tapToReveal: 'Appuyez pour révéler',
    hide: 'Masquer',
    revealAll: 'Tout Révéler',
    hideAll: 'Tout Masquer',

    testYourKnowledge: 'Testez Vos Connaissances',
    checkAnswer: 'Vérifier la Réponse',
    nextQuestion: 'Question Suivante',
    startNextQuiz: 'Commencer le Quiz Suivant',
    completeQuiz: 'Terminer le Quiz et Voir les Résultats',
    pressEnter: 'appuyez sur ↵ Entrée',
    yourAnswerHere: 'Votre réponse ici...',
    correct: 'Correct !',
    incorrect: 'Incorrect',
    wordsToReview: 'Mots à Réviser de Cette Session',
  },

  ru: {
    alphabet: 'Алфавит',
    basicPhrases: 'Основные фразы',
    commonWords: 'Популярные слова',
    numbersAndTime: 'Числа и время',
    numbers: 'Числа',
    time: 'Время и дни',
    quiz: 'Тест',

    iSpeak: 'Я говорю на',
    iWantToLearn: 'Я хочу учить',
    learning: 'Изучаю',
    nativeLanguage: 'Мой язык',
    switchPair: 'Поменять языки',
    playbackSpeed: 'Скорость аудио',
    installApp: 'Установить',
    myStats: 'Мой прогресс',

    example: 'Пример',
    sound: 'Звук',
    meaning: 'Значение',
    listen: 'Слушать',
    tapToReveal: 'Нажмите, чтобы увидеть перевод',
    hide: 'Скрыть',
    revealAll: 'Показать всё',
    hideAll: 'Скрыть всё',

    testYourKnowledge: 'Проверьте свои знания',
    checkAnswer: 'Проверить ответ',
    nextQuestion: 'Следующий вопрос',
    startNextQuiz: 'Начать следующий тест',
    completeQuiz: 'Завершить тест и посмотреть результаты',
    pressEnter: 'нажмите ↵ Enter',
    yourAnswerHere: 'Введите ваш ответ...',
    correct: 'Правильно!',
    incorrect: 'Неправильно',
    wordsToReview: 'Слова для повторения из этой сессии',
  },
};
