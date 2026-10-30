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
  tapToHide: string;
  hide: string;
  revealAll: string;
  hideAll: string;
  topics: string;
  clearFilters: string;
  showCountItems: string;
  closeLabel: string;
  keyboardTip: string;
  quizSettings: string;
  pronunciationLabel: string;
  tapCardToRevealSubtitle: string;

  // Quiz strings
  testYourKnowledge: string;
  allTopics: string;
  checkAnswer: string;
  nextQuestion: string;
  startNextQuiz: string;
  completeQuiz: string;
  pressEnter: string;
  yourAnswerHere: string;
  correct: string;
  incorrect: string;
  correctAnswerIs: string;
  wordsToReview: string;
  scoreLabel: string;
  masteredLabel: string;
  remainingLabel: string;
  questionOf: string;
  allModes: string;
  writingMode: string;
  listeningMode: string;
  repeatHint: string;
  listeningPromptHint: string;
}

export const UI_TRANSLATIONS: Record<SupportedLanguageId, UIStrings> = {
  en: {
    alphabet: 'Alphabet',
    basicPhrases: 'Phrases & Greetings',
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
    tapToReveal: 'Tap to reveal',
    tapToHide: 'Tap to hide',
    hide: 'Hide',
    revealAll: 'Reveal All',
    hideAll: 'Hide All',
    topics: 'Topics',
    clearFilters: 'Clear',
    showCountItems: 'Show {n}',
    closeLabel: 'Close',
    keyboardTip: 'Tip: you can add a {lang} keyboard in your phone settings. It makes typing faster.',
    quizSettings: 'Settings',
    pronunciationLabel: 'Pronunciation:',
    tapCardToRevealSubtitle: 'Tap any card to reveal its translation and pronunciation',

    testYourKnowledge: 'Test Your Knowledge',
    allTopics: 'All Topics',
    checkAnswer: 'Check Answer',
    nextQuestion: 'Next Question',
    startNextQuiz: 'Start Next Quiz',
    completeQuiz: 'Complete Quiz & View Results',
    pressEnter: 'press ↵ Enter',
    yourAnswerHere: 'Your answer here...',
    correct: 'Correct!',
    incorrect: 'Not quite',
    correctAnswerIs: 'The correct answer is:',
    wordsToReview: 'Words to Review from This Session',
    scoreLabel: 'Score:',
    masteredLabel: 'Mastered:',
    remainingLabel: 'remaining',
    questionOf: 'Question',
    allModes: 'All Modes',
    writingMode: 'Writing',
    listeningMode: 'Listening',
    repeatHint: 'Tip: Try repeating words and phrases aloud as you hear them. Slow the audio down whenever you like.',
    listeningPromptHint: 'Listen to the audio and type what you hear:'
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
    tapToReveal: 'Toca para ver',
    tapToHide: 'Toca para ocultar',
    hide: 'Ocultar',
    revealAll: 'Mostrar Todo',
    hideAll: 'Ocultar Todo',
    topics: 'Temas',
    clearFilters: 'Borrar',
    showCountItems: 'Mostrar {n}',
    closeLabel: 'Cerrar',
    keyboardTip: 'Consejo: puedes agregar un teclado de {lang} en los ajustes de tu teléfono. Escribirás más rápido.',
    quizSettings: 'Ajustes',
    pronunciationLabel: 'Pronunciación:',
    tapCardToRevealSubtitle: 'Toca cualquier tarjeta para ver su traducción y pronunciación',

    testYourKnowledge: 'Pon a Prueba tu Conocimiento',
    allTopics: 'Todos los Temas',
    checkAnswer: 'Comprobar Respuesta',
    nextQuestion: 'Siguiente Pregunta',
    startNextQuiz: 'Comenzar Siguiente Quiz',
    completeQuiz: 'Completar Quiz y Ver Resultados',
    pressEnter: 'presiona ↵ Enter',
    yourAnswerHere: 'Escribe tu respuesta aquí...',
    correct: '¡Correcto!',
    incorrect: 'Casi, pero no del todo.',
    correctAnswerIs: 'La respuesta correcta es:',
    wordsToReview: 'Palabras para Repasar de Esta Sesión',
    scoreLabel: 'Puntuación:',
    masteredLabel: 'Dominadas:',
    remainingLabel: 'restantes',
    questionOf: 'Pregunta',
    allModes: 'Todos los modos',
    writingMode: 'Escritura',
    listeningMode: 'Escucha',
    repeatHint: 'Consejo: puedes repetir las palabras y frases en voz alta. Ajusta la velocidad cuando quieras.',
    listeningPromptHint: 'Escucha el audio y escribe lo que oyes:'
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
    tapToHide: 'Appuyez pour masquer',
    hide: 'Masquer',
    revealAll: 'Tout Révéler',
    hideAll: 'Tout Masquer',
    topics: 'Thèmes',
    clearFilters: 'Effacer',
    showCountItems: 'Afficher {n}',
    closeLabel: 'Fermer',
    keyboardTip: 'Astuce : vous pouvez ajouter un clavier {lang} dans les réglages de votre téléphone. Vous écrirez plus vite.',
    quizSettings: 'Réglages',
    pronunciationLabel: 'Prononciation :',
    tapCardToRevealSubtitle: 'Appuyez sur une carte pour voir sa traduction et sa prononciation',

    testYourKnowledge: 'Testez Vos Connaissances',
    allTopics: 'Tous les Sujets',
    checkAnswer: 'Vérifier la Réponse',
    nextQuestion: 'Question Suivante',
    startNextQuiz: 'Commencer le Quiz Suivant',
    completeQuiz: 'Terminer le Quiz et Voir les Résultats',
    pressEnter: 'appuyez sur ↵ Entrée',
    yourAnswerHere: 'Votre réponse ici...',
    correct: 'Correct !',
    incorrect: 'Pas tout à fait.',
    correctAnswerIs: 'La bonne réponse est :',
    wordsToReview: 'Mots à Réviser de Cette Session',
    scoreLabel: 'Score :',
    masteredLabel: 'Maîtrisés :',
    remainingLabel: 'restants',
    questionOf: 'Question',
    allModes: 'Tous les modes',
    writingMode: 'Écriture',
    listeningMode: 'Écoute',
    repeatHint: 'Astuce : vous pouvez répéter les mots à voix haute. Ralentissez l\'audio quand vous le souhaitez.',
    listeningPromptHint: 'Écoutez l’audio et écrivez ce que vous entendez :'
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
    tapToReveal: 'Нажмите, чтобы увидеть',
    tapToHide: 'Нажмите, чтобы скрыть',
    hide: 'Скрыть',
    revealAll: 'Показать всё',
    hideAll: 'Скрыть всё',
    topics: 'Темы',
    clearFilters: 'Сбросить',
    showCountItems: 'Показать {n}',
    closeLabel: 'Закрыть',
    keyboardTip: 'Совет: в настройках телефона можно добавить клавиатуру ({lang}). Печатать станет быстрее.',
    quizSettings: 'Настройки',
    pronunciationLabel: 'Произношение:',
    tapCardToRevealSubtitle: 'Нажмите на любую карточку, чтобы увидеть перевод и произношение',

    testYourKnowledge: 'Проверьте свои знания',
    allTopics: 'Все темы',
    checkAnswer: 'Проверить ответ',
    nextQuestion: 'Следующий вопрос',
    startNextQuiz: 'Начать следующий тест',
    completeQuiz: 'Завершить тест и посмотреть результаты',
    pressEnter: 'нажмите ↵ Enter',
    yourAnswerHere: 'Введите ваш ответ...',
    correct: 'Правильно!',
    incorrect: 'Не совсем так.',
    correctAnswerIs: 'Правильный ответ:',
    wordsToReview: 'Слова для повторения из этой сессии',
    scoreLabel: 'Счёт:',
    masteredLabel: 'Изучено:',
    remainingLabel: 'осталось',
    questionOf: 'Вопрос',
    allModes: 'Все режимы',
    writingMode: 'Письмо',
    listeningMode: 'Аудирование',
    repeatHint: 'Совет: можно повторять слова вслух. Скорость аудио можно замедлить в любой момент.',
    listeningPromptHint: 'Послушайте аудио и напишите то, что слышите:'
  },

  pt: {
    alphabet: 'Alfabeto',
    basicPhrases: 'Frases Básicas',
    commonWords: 'Palavras Comuns',
    numbersAndTime: 'Números e Horas',
    numbers: 'Números',
    time: 'Horas e Dias',
    quiz: 'Quiz',

    iSpeak: 'Eu falo',
    iWantToLearn: 'Quero aprender',
    learning: 'Aprendendo',
    nativeLanguage: 'Meu idioma',
    switchPair: 'Trocar idiomas',
    playbackSpeed: 'Velocidade do áudio',
    installApp: 'Instalar App',
    myStats: 'Minhas Estatísticas',

    example: 'Exemplo',
    sound: 'Som',
    meaning: 'Significado',
    listen: 'Ouvir',
    tapToReveal: 'Toque para ver',
    tapToHide: 'Toque para ocultar',
    hide: 'Ocultar',
    revealAll: 'Mostrar Tudo',
    hideAll: 'Ocultar Tudo',
    topics: 'Temas',
    clearFilters: 'Limpar',
    showCountItems: 'Mostrar {n}',
    closeLabel: 'Fechar',
    keyboardTip: 'Dica: você pode adicionar um teclado de {lang} nas configurações do celular. Digitar fica mais rápido.',
    quizSettings: 'Ajustes',
    pronunciationLabel: 'Pronúncia:',
    tapCardToRevealSubtitle: 'Toque em qualquer cartão para ver sua tradução e pronúncia',

    testYourKnowledge: 'Teste Seu Conhecimento',
    allTopics: 'Todos os Tópicos',
    checkAnswer: 'Verificar Resposta',
    nextQuestion: 'Próxima Pergunta',
    startNextQuiz: 'Iniciar Próximo Quiz',
    completeQuiz: 'Concluir Quiz e Ver Resultados',
    pressEnter: 'pressione ↵ Enter',
    yourAnswerHere: 'Sua resposta aqui...',
    correct: 'Correto!',
    incorrect: 'Quase lá.',
    correctAnswerIs: 'A resposta correta é:',
    wordsToReview: 'Palavras para Revisar Desta Sessão',
    scoreLabel: 'Pontuação:',
    masteredLabel: 'Dominadas:',
    remainingLabel: 'restantes',
    questionOf: 'Pergunta',
    allModes: 'Todos os modos',
    writingMode: 'Escrita',
    listeningMode: 'Audição',
    repeatHint: 'Dica: você pode repetir as palavras em voz alta. Ajuste a velocidade do áudio quando quiser.',
    listeningPromptHint: 'Ouça o áudio e digite o que você ouvir:'
  },

  de: {
    alphabet: 'Alphabet',
    basicPhrases: 'Wichtige Sätze',
    commonWords: 'Häufige Wörter',
    numbersAndTime: 'Zahlen & Uhrzeit',
    numbers: 'Zahlen',
    time: 'Uhrzeit & Tage',
    quiz: 'Quiz',

    iSpeak: 'Ich spreche',
    iWantToLearn: 'Ich möchte lernen',
    learning: 'Lerne',
    nativeLanguage: 'Meine Sprache',
    switchPair: 'Sprachen wechseln',
    playbackSpeed: 'Audio-Tempo',
    installApp: 'App installieren',
    myStats: 'Meine Statistik',

    example: 'Beispiel',
    sound: 'Klang',
    meaning: 'Bedeutung',
    listen: 'Anhören',
    tapToReveal: 'Tippen zum Anzeigen',
    tapToHide: 'Tippen zum Ausblenden',
    hide: 'Ausblenden',
    revealAll: 'Alle anzeigen',
    hideAll: 'Alle ausblenden',
    topics: 'Themen',
    clearFilters: 'Zurücksetzen',
    showCountItems: '{n} anzeigen',
    closeLabel: 'Schließen',
    keyboardTip: 'Tipp: Sie können in den Handy-Einstellungen eine Tastatur für {lang} hinzufügen. Dann tippen Sie schneller.',
    quizSettings: 'Einstellungen',
    pronunciationLabel: 'Aussprache:',
    tapCardToRevealSubtitle: 'Tippe auf eine Karte, um Übersetzung und Aussprache anzuzeigen',

    testYourKnowledge: 'Teste dein Wissen',
    allTopics: 'Alle Themen',
    checkAnswer: 'Antwort prüfen',
    nextQuestion: 'Nächste Frage',
    startNextQuiz: 'Nächstes Quiz starten',
    completeQuiz: 'Quiz beenden & Ergebnisse ansehen',
    pressEnter: 'drücke ↵ Enter',
    yourAnswerHere: 'Deine Antwort hier...',
    correct: 'Richtig!',
    incorrect: 'Nicht ganz.',
    correctAnswerIs: 'Die richtige Antwort lautet:',
    wordsToReview: 'Wörter zum Wiederholen aus dieser Sitzung',
    scoreLabel: 'Punkte:',
    masteredLabel: 'Gemeistert:',
    remainingLabel: 'übrig',
    questionOf: 'Frage',
    allModes: 'Alle Modi',
    writingMode: 'Schreiben',
    listeningMode: 'Hören',
    repeatHint: 'Tipp: Sie können die Wörter laut nachsprechen. Das Sprechtempo lässt sich jederzeit anpassen.',
    listeningPromptHint: 'Hören Sie zu und schreiben Sie, was Sie hören:'
  },

  id: {
    alphabet: 'Alfabet',
    basicPhrases: 'Frasa Dasar',
    commonWords: 'Kata Umum',
    numbersAndTime: 'Angka & Waktu',
    numbers: 'Angka',
    time: 'Waktu & Hari',
    quiz: 'Kuis',

    iSpeak: 'Saya berbicara',
    iWantToLearn: 'Saya ingin belajar',
    learning: 'Belajar',
    nativeLanguage: 'Bahasa Saya',
    switchPair: 'Ganti bahasa',
    playbackSpeed: 'Kecepatan audio',
    installApp: 'Instal Aplikasi',
    myStats: 'Statistik Saya',

    example: 'Contoh',
    sound: 'Bunyi',
    meaning: 'Arti',
    listen: 'Dengarkan',
    tapToReveal: 'Ketuk untuk melihat',
    tapToHide: 'Ketuk para menyembunyikan',
    hide: 'Sembunyikan',
    revealAll: 'Tampilkan Semua',
    hideAll: 'Sembunyikan Semua',
    topics: 'Topik',
    clearFilters: 'Hapus',
    showCountItems: 'Tampilkan {n}',
    closeLabel: 'Tutup',
    keyboardTip: 'Tips: Anda bisa menambahkan keyboard {lang} di pengaturan ponsel. Mengetik jadi lebih cepat.',
    quizSettings: 'Pengaturan',
    pronunciationLabel: 'Pelafalan:',
    tapCardToRevealSubtitle: 'Ketuk kartu mana saja untuk melihat terjemahan dan pelafalannya',

    testYourKnowledge: 'Uji Pengetahuan Anda',
    allTopics: 'Semua Topik',
    checkAnswer: 'Periksa Jawaban',
    nextQuestion: 'Pertanyaan Berikutnya',
    startNextQuiz: 'Mulai Kuis Berikutnya',
    completeQuiz: 'Selesaikan Kuis & Lihat Hasil',
    pressEnter: 'tekan ↵ Enter',
    yourAnswerHere: 'Jawaban Anda di sini...',
    correct: 'Benar!',
    incorrect: 'Belum tepat.',
    correctAnswerIs: 'Jawaban yang benar adalah:',
    wordsToReview: 'Kata untuk Diulas dari Sesi Ini',
    scoreLabel: 'Skor:',
    masteredLabel: 'Dikuasai:',
    remainingLabel: 'tersisa',
    questionOf: 'Pertanyaan',
    allModes: 'Semua Mode',
    writingMode: 'Menulis',
    listeningMode: 'Mendengarkan',
    repeatHint: 'Tips: Anda bisa mengucapkan kata-kata dengan lantang. Kurangi kecepatan suara kapan saja.',
    listeningPromptHint: 'Dengarkan audio dan ketik apa yang Anda dengar:'
  },

  tr: {
    alphabet: 'Alfabe',
    basicPhrases: 'Temel İfadeler',
    commonWords: 'Yaygın Kelimeler',
    numbersAndTime: 'Sayılar ve Saat',
    numbers: 'Sayılar',
    time: 'Saat ve Günler',
    quiz: 'Test',

    iSpeak: 'Konuştuğum dil',
    iWantToLearn: 'Öğrenmek istediğim',
    learning: 'Öğreniyor',
    nativeLanguage: 'Dilim',
    switchPair: 'Dilleri değiştir',
    playbackSpeed: 'Ses hızı',
    installApp: 'Uygulamayı Yükle',
    myStats: 'İstatistiklerim',

    example: 'Örnek',
    sound: 'Ses',
    meaning: 'Anlam',
    listen: 'Dinle',
    tapToReveal: 'Görmek için dokun',
    tapToHide: 'Gizlemek için dokun',
    hide: 'Gizle',
    revealAll: 'Tümünü Göster',
    hideAll: 'Tümünü Gizle',
    topics: 'Konular',
    clearFilters: 'Temizle',
    showCountItems: '{n} göster',
    closeLabel: 'Kapat',
    keyboardTip: 'İpucu: Telefon ayarlarından {lang} klavyesi ekleyebilirsiniz. Daha hızlı yazarsınız.',
    quizSettings: 'Ayarlar',
    pronunciationLabel: 'Telaffuz:',
    tapCardToRevealSubtitle: 'Çevirisini ve telaffuzunu görmek için herhangi bir karta dokunun',

    testYourKnowledge: 'Bilgini Test Et',
    allTopics: 'Tüm Konular',
    checkAnswer: 'Cevabı Kontrol Et',
    nextQuestion: 'Sonraki Soru',
    startNextQuiz: 'Sonraki Teste Başla',
    completeQuiz: 'Testi Bitir ve Sonuçları Gör',
    pressEnter: '↵ Enter tuşuna basın',
    yourAnswerHere: 'Cevabınız buraya...',
    correct: 'Doğru!',
    incorrect: 'Tam değil.',
    correctAnswerIs: 'Doğru cevap:',
    wordsToReview: 'Bu Oturumdan Tekrar Edilecek Kelimeler',
    scoreLabel: 'Puan:',
    masteredLabel: 'Öğrenilen:',
    remainingLabel: 'kaldı',
    questionOf: 'Soru',
    allModes: 'Tüm Modlar',
    writingMode: 'Yazma',
    listeningMode: 'Dinleme',
    repeatHint: 'İpucu: Duyduğunuz kelimeleri sesli tekrarlayabilirsiniz. Hızı istediğiniz zaman yavaşlatabilirsiniz.',
    listeningPromptHint: 'Sesi dinleyin ve duyduğunuzu yazın:'
  }
};
