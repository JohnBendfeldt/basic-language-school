import { SupportedLanguageId } from './languages/types';

export interface AboutContent {
  title: string;
  subtitle: string;
  backToPractice: string;
  backToPracticeAria: string;
  appOverviewTitle: string;
  appOverviewParagraphs: string[];
  featuresTitle: string;
  features: {
    icon: string;
    title: string;
    desc: string;
  }[];
  creatorTitle: string;
  creatorBio: string[];
  contactTitle: string;
  contactIntro: string;
  contactNameLabel: string;
  contactEmailLabel: string;
  contactBugsLabel: string;
  communityTitle: string;
  communityParagraphs: string[];
  footerPrompt: string;
  privacyLinkText: string;
  termsLinkText: string;
}

export const ABOUT_TRANSLATIONS: Record<SupportedLanguageId, AboutContent> = {
  en: {
    title: 'About & Contact',
    subtitle: 'Free, open, and accessible language education for everyone.',
    backToPractice: 'Back to Practice',
    backToPracticeAria: 'Back to practice lessons',
    appOverviewTitle: 'What is Basic Language School?',
    appOverviewParagraphs: [
      'Basic Language School is an interactive, self-paced web app built to take language learners from complete beginners to confident foundational speakers.',
      'Unlike apps that hide content behind paywalls, subscription timers, or artificial energy hearts, Basic Language School offers full curriculum access with zero ads and zero paywalls.'
    ],
    featuresTitle: 'Key Features & Core Architecture',
    features: [
      {
        icon: '🌐',
        title: '8 Languages & 56 Directions',
        desc: 'Learn Spanish, French, German, Russian, Portuguese, Indonesian, Turkish, or English — studying directly from any of these 8 base languages.'
      },
      {
        icon: '🎧',
        title: '500+ Words & Studio Neural Audio',
        desc: 'Every single word, phrase, and number has a crystal-clear native neural audio pronunciation with variable playback speeds (0.5× to 1.25×).'
      },
      {
        icon: '⚡',
        title: 'Spaced-Repetition & Multi-Modal Quizzes',
        desc: 'Practice via Listening Mode (typing what you hear) or Writing Mode (translating prompts) with smart typo tolerance and instant phonetics.'
      },
      {
        icon: '📱',
        title: 'Progressive Web App (Offline Ready)',
        desc: 'Install directly to your home screen on Android, iOS, Windows, or Mac with offline caching for reliable study on the go.'
      },
      {
        icon: '🔒',
        title: 'Privacy-First Architecture',
        desc: 'All learning progress, test streaks, and mastered words are stored locally by default, with optional cloud sync via Google, GitHub, or Microsoft.'
      }
    ],
    creatorTitle: 'About the Creator',
    creatorBio: [
      'Hi, I\'m John Bendfeldt. I created Basic Language School out of a deep passion for linguistics, education, and building clean, fast web applications.',
      'Language learning opens doors to cultures, careers, and lifelong friendships. My goal is to make learning the essential foundation of any major language simple, delightful, and completely free.'
    ],
    contactTitle: 'Questions, Support & Bug Reports',
    contactIntro: 'Have a question, suggestion, or run into an issue? I love hearing from learners and actively maintain the platform.',
    contactNameLabel: 'Creator & Maintainer:',
    contactEmailLabel: 'Email:',
    contactBugsLabel: 'Bug Reports & Feedback:',
    communityTitle: 'Open Source Vision & GitHub Contributions',
    communityParagraphs: [
      'The source code repository is currently private while core curriculum expansions and audio tuning are completed.',
      'The roadmap is to open-source the project on GitHub, welcoming community contributions, language packs, native speaker audio review, and developer pull requests (PRs) and issue tracking.'
    ],
    footerPrompt: 'Explore our legal policies:',
    privacyLinkText: 'Privacy Policy',
    termsLinkText: 'Terms of Service'
  },
  es: {
    title: 'Acerca de y Contacto',
    subtitle: 'Educación lingüística gratuita, abierta y accesible para todos.',
    backToPractice: 'Volver a la práctica',
    backToPracticeAria: 'Volver a las lecciones de práctica',
    appOverviewTitle: '¿Qué es Basic Language School?',
    appOverviewParagraphs: [
      'Basic Language School es una aplicación web interactiva diseñada para llevar a los estudiantes desde principiantes absolutos hasta dominar las bases de conversación.',
      'A diferencia de aplicaciones que bloquean contenidos con muros de pago o límites de energía, Basic Language School ofrece acceso total al plan de estudios sin publicidad y sin costes.'
    ],
    featuresTitle: 'Características Principales',
    features: [
      {
        icon: '🌐',
        title: '8 Idiomas y 56 Direcciones',
        desc: 'Aprende español, inglés, francés, alemán, ruso, portugués, indonesio o turco, estudiando desde cualquiera de estas 8 lenguas maternas.'
      },
      {
        icon: '🎧',
        title: 'Más de 500 palabras y audio neuronal nativo',
        desc: 'Cada palabra, frase y número cuenta con pronunciación de estudio con velocidades ajustables (0.5× a 1.25×).'
      },
      {
        icon: '⚡',
        title: 'Cuestionarios interactivos y auditivos',
        desc: 'Practica en modo escucha o escritura con tolerancia inteligente de errores tipográficos y guías fonéticas.'
      },
      {
        icon: '📱',
        title: 'Aplicación Web Progresiva (PWA)',
        desc: 'Instálala en tu pantalla de inicio en Android, iPhone o PC con soporte sin conexión para estudiar donde quieras.'
      },
      {
        icon: '🔒',
        title: 'Privacidad garantizada',
        desc: 'Tu progreso se guarda localmente por defecto, con sincronización opcional en la nube mediante Google, GitHub o Microsoft.'
      }
    ],
    creatorTitle: 'Acerca del Creador',
    creatorBio: [
      'Hola, soy John Bendfeldt. Creé Basic Language School motivado por una gran pasión por la lingüística, la educación y el desarrollo web rápido y moderno.',
      'Aprender un idioma abre puertas a nuevas culturas y amistades. Mi objetivo es que aprender las bases esenciales de cualquier idioma importante sea simple, intuitivo y gratuito.'
    ],
    contactTitle: 'Preguntas, Soporte y Reportes de Errores',
    contactIntro: '¿Tienes alguna duda, sugerencia o encontraste un fallo? Me encanta recibir comentarios de los estudiantes y mantengo la aplicación activamente.',
    contactNameLabel: 'Creador y desarrollador:',
    contactEmailLabel: 'Correo electrónico:',
    contactBugsLabel: 'Reporte de errores y sugerencias:',
    communityTitle: 'Visión de Código Abierto y GitHub',
    communityParagraphs: [
      'El repositorio de código fuente es privado temporalmente mientras se completan las expansiones del plan de estudios y la calibración del audio.',
      'El objetivo es abrir el proyecto en GitHub a la comunidad para recibir sugerencias, mejoras de hablantes nativos, apertura de problemas (issues) y pull requests (PRs).'
    ],
    footerPrompt: 'Consulta nuestras políticas legales:',
    privacyLinkText: 'Política de Privacidad',
    termsLinkText: 'Términos de Servicio'
  },
  ru: {
    title: 'О проекте и контакты',
    subtitle: 'Бесплатное, открытое и доступное языковое образование для всех.',
    backToPractice: 'Вернуться к урокам',
    backToPracticeAria: 'Вернуться к практическим урокам',
    appOverviewTitle: 'Что такое Basic Language School?',
    appOverviewParagraphs: [
      'Basic Language School — это интерактивное веб-приложение, созданное для того, чтобы помочь учащимся пройти путь от нуля до уверенной базовой речи.',
      'В отличие от сервисов с платными подписками, рекламой или таймерами «жизней», Basic Language School предоставляет полный доступ ко всей программе совершенно бесплатно.'
    ],
    featuresTitle: 'Ключевые возможности и архитектура',
    features: [
      {
        icon: '🌐',
        title: '8 языков и 56 языковых пар',
        desc: 'Изучайте английский, испанский, французский, немецкий, русский, португальский, индонезийский или турецкий язык в любом направлении.'
      },
      {
        icon: '🎧',
        title: '500+ слов и студийное нейроаудио',
        desc: 'Каждое слово, фраза и число озвучены качественным студийным звуком с регулятором темпа от 0.5× до 1.25×.'
      },
      {
        icon: '⚡',
        title: 'Тесты с интервальным повторением',
        desc: 'Тренируйтесь в режиме аудирования или письма с умным распознаванием опечаток и фонетическими подсказками.'
      },
      {
        icon: '📱',
        title: 'PWA с автономным режимом',
        desc: 'Устанавливайте приложение на телефон или компьютер для быстрого доступа даже без стабильного интернета.'
      },
      {
        icon: '🔒',
        title: 'Конфиденциальность превыше всего',
        desc: 'Весь ваш прогресс по умолчанию хранится локально на устройстве с возможностью облачной синхронизации через Google, GitHub или Microsoft.'
      }
    ],
    creatorTitle: 'Об авторе',
    creatorBio: [
      'Привет! Меня зовут Джон Бендфельдт (John Bendfeldt). Я создал Basic Language School из любви к лингвистике, образованию и удобным веб-технологиям.',
      'Изучение языков открывает двери к новым культурам и карьерным возможностям. Моя цель — сделать изучение фундамента любого языка простым, приятным и доступным каждому.'
    ],
    contactTitle: 'Вопросы, поддержка и сообщения об ошибках',
    contactIntro: 'Есть вопрос, идея для улучшения или заметили ошибку? Я всегда рад отзывам пользователей и постоянно развиваю платформу.',
    contactNameLabel: 'Автор и разработчик:',
    contactEmailLabel: 'Электронная почта:',
    contactBugsLabel: 'Ошибки и предложения:',
    communityTitle: 'Открытый исходный код и планы на GitHub',
    communityParagraphs: [
      'В настоящее время репозиторий временно закрыт, пока завершается полировка аудиобазы и расширение словарного запаса до 500+ единиц.',
      'В планах — открыть проект на GitHub для сообщества: принимать Pull Request (PR), отслеживать пожелания в Issues и привлекать носителей языка для проверки произношения.'
    ],
    footerPrompt: 'Юридическая информация:',
    privacyLinkText: 'Политика конфиденциальности',
    termsLinkText: 'Условия использования'
  },
  fr: {
    title: 'À propos & Contact',
    subtitle: 'Une éducation linguistique gratuite, ouverte et accessible à tous.',
    backToPractice: 'Retour aux leçons',
    backToPracticeAria: 'Retour aux leçons de pratique',
    appOverviewTitle: 'Qu\'est-ce que Basic Language School ?',
    appOverviewParagraphs: [
      'Basic Language School est une application web interactive conçue pour vous accompagner de grand débutant jusqu\'à la maîtrise des bases de communication.',
      'Contrairement aux applications avec abonnements payants ou cœurs limités, Basic Language School offre un accès complet sans publicité ni barrière financière.'
    ],
    featuresTitle: 'Fonctionnalités Principales',
    features: [
      {
        icon: '🌐',
        title: '8 Langues & 56 Paires',
        desc: 'Apprenez l\'anglais, l\'espagnol, l\'allemand, le russe, le portugais, l\'indonésien, le turc ou le français depuis votre langue maternelle.'
      },
      {
        icon: '🎧',
        title: 'Plus de 500 mots et audio neuronal',
        desc: 'Chaque mot, phrase et chiffre dispose d\'une prononciation studio claire avec vitesse ajustable (0.5× à 1.25×).'
      },
      {
        icon: '⚡',
        title: 'Quiz d\'écoute et d\'écriture',
        desc: 'Entraînez-vous avec répétition espacée, tolérance intelligente aux fautes de frappe et phonétique instantanée.'
      },
      {
        icon: '📱',
        title: 'Progressive Web App (PWA)',
        desc: 'Installez l\'application directement sur smartphone ou ordinateur pour apprendre même hors ligne.'
      },
      {
        icon: '🔒',
        title: 'Respect absolu de la vie privée',
        desc: 'Votre progression est stockée localement par défaut, avec synchronisation cloud optionnelle via Google, GitHub ou Microsoft.'
      }
    ],
    creatorTitle: 'À propos du Créateur',
    creatorBio: [
      'Bonjour, je m\'appelle John Bendfeldt. J\'ai créé Basic Language School par passion pour la linguistique, l\'apprentissage et le développement d\'applications rapides.',
      'Apprendre une langue rapproche les cultures et ouvre des perspectives. Mon but est de rendre l\'apprentissage des bases gratuit, direct et agréable pour tous.'
    ],
    contactTitle: 'Questions, Support et Signalement de Bugs',
    contactIntro: 'Une question, une suggestion ou un problème technique ? Vos retours sont précieux pour continuer d\'améliorer l\'application.',
    contactNameLabel: 'Créateur & Développeur :',
    contactEmailLabel: 'E-mail :',
    contactBugsLabel: 'Bugs et suggestions :',
    communityTitle: 'Vision Open Source et GitHub',
    communityParagraphs: [
      'Le dépôt de code source est actuellement privé pendant les dernières optimisations du cursus et des fichiers audio.',
      'L\'objectif est de publier le projet en open source sur GitHub pour accueillir les contributions de la communauté, les revues d\'audio par des locuteurs natifs et les Pull Requests (PR).'
    ],
    footerPrompt: 'Consulter nos documents juridiques :',
    privacyLinkText: 'Politique de Confidentialité',
    termsLinkText: 'Conditions d\'Utilisation'
  },
  pt: {
    title: 'Sobre e Contato',
    subtitle: 'Educação linguística gratuita, aberta e acessível para todos.',
    backToPractice: 'Voltar à prática',
    backToPracticeAria: 'Voltar às lições de prática',
    appOverviewTitle: 'O que é a Basic Language School?',
    appOverviewParagraphs: [
      'A Basic Language School é uma plataforma web interativa desenvolvida para levar o estudante desde o nível iniciante até a conversação fundamental.',
      'Diferente de aplicativos que bloqueiam recursos com assinaturas caras ou limites diários de vidas, a Basic Language School oferece currículo completo 100% gratuito e sem anúncios.'
    ],
    featuresTitle: 'Destaques e Recursos',
    features: [
      {
        icon: '🌐',
        title: '8 Idiomas e 56 Direções',
        desc: 'Aprenda inglês, espanhol, francês, alemão, russo, português, indonésio ou turco estudando diretamente do seu idioma nativo.'
      },
      {
        icon: '🎧',
        title: 'Mais de 500 palavras com áudio neural',
        desc: 'Cada palavra, frase e número tem pronúncia de estúdio de alta fidelidade com ajuste de velocidade (0.5× a 1.25×).'
      },
      {
        icon: '⚡',
        title: 'Quizzes com repetição espaçada',
        desc: 'Treine nos modos de Escuta ou Escrita com tolerância inteligente a pequenos erros de digitação.'
      },
      {
        icon: '📱',
        title: 'Aplicativo PWA (Pronto para Uso Offline)',
        desc: 'Instale na tela inicial do seu celular ou computador para estudar onde e quando quiser.'
      },
      {
        icon: '🔒',
        title: 'Privacidade em Primeiro Lugar',
        desc: 'Todo o progresso é salvo no seu dispositivo por padrão, com sincronização em nuvem opcional via Google, GitHub ou Microsoft.'
      }
    ],
    creatorTitle: 'Sobre o Criador',
    creatorBio: [
      'Olá, eu sou John Bendfeldt. Criei a Basic Language School inspirado pela minha paixão por idiomas, educação aberta e tecnologia web de alto desempenho.',
      'Aprender uma língua transforma vidas e constrói conexões globais. Meu compromisso é tornar a base de qualquer idioma acessível e gratuita para todo mundo.'
    ],
    contactTitle: 'Dúvidas, Suporte e Relato de Bugs',
    contactIntro: 'Tem alguma dúvida, sugestão ou encontrou algum problema no app? Fico muito feliz em receber feedback dos estudantes.',
    contactNameLabel: 'Criador e Desenvolvedor:',
    contactEmailLabel: 'E-mail:',
    contactBugsLabel: 'Relato de bugs e ideias:',
    communityTitle: 'Visão de Código Aberto no GitHub',
    communityParagraphs: [
      'O repositório do projeto está temporariamente privado enquanto concluímos a expansão completa de 500+ termos em todos os cursos.',
      'O plano é abrir o código no GitHub para a comunidade global, permitindo a abertura de issues, envio de Pull Requests (PRs) e colaboração de falantes nativos.'
    ],
    footerPrompt: 'Políticas e termos legais:',
    privacyLinkText: 'Política de Privacidade',
    termsLinkText: 'Termos de Serviço'
  },
  de: {
    title: 'Über uns & Kontakt',
    subtitle: 'Kostenlose, offene und zugängliche Sprachbildung für alle.',
    backToPractice: 'Zurück zur Übung',
    backToPracticeAria: 'Zurück zu den Übungen',
    appOverviewTitle: 'Was ist die Basic Language School?',
    appOverviewParagraphs: [
      'Die Basic Language School ist eine interaktive Web-App, die Lernende vom ersten Schritt bis zu verlässlichen Grundkenntnissen begleitet.',
      'Im Gegensatz zu Apps mit teuren Abonnements oder künstlichen Energie-Limits bietet die Basic Language School vollständigen Lehrplan-Zugang ohne Werbung und ohne Kosten.'
    ],
    featuresTitle: 'Hauptfunktionen & Architektur',
    features: [
      {
        icon: '🌐',
        title: '8 Sprachen & 56 Sprachkombinationen',
        desc: 'Lernen Sie Englisch, Spanisch, Französisch, Deutsch, Russisch, Portugiesisch, Indonesisch oder Türkisch aus jeder beliebigen Ausgangssprache.'
      },
      {
        icon: '🎧',
        title: 'Über 500 Wörter mit Studio-Audio',
        desc: 'Jedes Wort, jeder Satz und jede Zahl verfügt über kristallklare neurale Aussprache mit einstellbarem Tempo (0.5× bis 1.25×).'
      },
      {
        icon: '⚡',
        title: 'Spaced-Repetition-Quizze',
        desc: 'Üben Sie im Hör- oder Schreibmodus mit intelligenter Tippfehlertoleranz und phonetischen Tastaturhilfen.'
      },
      {
        icon: '📱',
        title: 'Progressive Web App (PWA)',
        desc: 'Installierbar auf Smartphones und PCs mit Offline-Unterstützung für unterbrechungsfreies Lernen unterwegs.'
      },
      {
        icon: '🔒',
        title: 'Datenschutz von Anfang an',
        desc: 'Ihr Lernfortschritt bleibt standardmäßig lokal auf Ihrem Gerät gespeichert, mit optionaler Cloud-Synchronisierung via Google, GitHub oder Microsoft.'
      }
    ],
    creatorTitle: 'Über den Gründer',
    creatorBio: [
      'Hallo, ich bin John Bendfeldt. Ich habe die Basic Language School aus Begeisterung für Sprachwissenschaften, Bildung und moderne Webtechnologien entwickelt.',
      'Sprachen verbinden Menschen und eröffnen neue Welten. Mein Ziel ist es, das Erlernen der wichtigsten Grundlagen so einfach, direkt und barrierefrei wie möglich zu gestalten.'
    ],
    contactTitle: 'Fragen, Support & Fehlermeldungen',
    contactIntro: 'Haben Sie Fragen, Feedback oder einen Fehler entdeckt? Ich freue mich über jede Rückmeldung und pflege die Plattform kontinuierlich.',
    contactNameLabel: 'Entwickler & Maintainer:',
    contactEmailLabel: 'E-Mail:',
    contactBugsLabel: 'Fehlermeldungen & Anregungen:',
    communityTitle: 'Open-Source-Vision auf GitHub',
    communityParagraphs: [
      'Das Quellcode-Repository ist derzeit privat, während die Lehrpläne und Audio-Abstimmungen fertiggestellt werden.',
      'Die Vision ist es, das Projekt auf GitHub für die Community zu öffnen, um Pull Requests (PRs), Issues und Beiträge von Muttersprachlern willkommen zu heißen.'
    ],
    footerPrompt: 'Rechtliche Hinweise:',
    privacyLinkText: 'Datenschutzerklärung',
    termsLinkText: 'Nutzungsbedingungen'
  },
  id: {
    title: 'Tentang & Kontak',
    subtitle: 'Pendidikan bahasa gratis, terbuka, dan dapat diakses oleh semua orang.',
    backToPractice: 'Kembali ke Latihan',
    backToPracticeAria: 'Kembali ke materi latihan',
    appOverviewTitle: 'Apa itu Basic Language School?',
    appOverviewParagraphs: [
      'Basic Language School adalah aplikasi web interaktif yang dirancang untuk membimbing pembelajar dari pemula mutlak hingga menguasai percakapan dasar.',
      'Berbeda dari aplikasi yang membatasi materi dengan langganan mahal atau batas energi harian, Basic Language School menyediakan kurikulum lengkap 100% gratis tanpa iklan.'
    ],
    featuresTitle: 'Fitur Utama & Keunggulan',
    features: [
      {
        icon: '🌐',
        title: '8 Bahasa & 56 Pasangan Arah',
        desc: 'Pelajari Bahasa Inggris, Spanyol, Prancis, Jerman, Rusia, Portugis, Indonesia, atau Turki langsung dari bahasa ibu Anda.'
      },
      {
        icon: '🎧',
        title: '500+ Kata dengan Audio Neural Asli',
        desc: 'Setiap kata, frasa, dan angka dilengkapi audio studio dengan pengatur kecepatan pemutaran (0.5× hingga 1.25×).'
      },
      {
        icon: '⚡',
        title: 'Kuis Pengulangan Berjarak',
        desc: 'Latihan melalui Mode Mendengarkan atau Menulis dengan toleransi salah ketik yang cerdas dan panduan fonetik.'
      },
      {
        icon: '📱',
        title: 'PWA (Siap Pakai Offline)',
        desc: 'Dapat dipasang di layar utama Android, iPhone, atau laptop untuk belajar praktis tanpa hambatan jaringan.'
      },
      {
        icon: '🔒',
        title: 'Privasi Terjamin',
        desc: 'Seluruh riwayat latihan tersimpan di perangkat Anda secara lokal, dengan opsi sinkronisasi cloud melalui Google, GitHub, atau Microsoft.'
      }
    ],
    creatorTitle: 'Tentang Pembuat',
    creatorBio: [
      'Halo, saya John Bendfeldt. Saya mengembangkan Basic Language School dari kecintaan mendalam pada ilmu bahasa, pendidikan, dan pembuatan aplikasi web modern.',
      'Kemampuan bahasa membuka pintu ke berbagai budaya dan peluang baru. Misi saya adalah membuat pembelajaran fondasi bahasa apa pun menjadi menyenangkan, mudah, dan gratis.'
    ],
    contactTitle: 'Pertanyaan, Dukungan & Laporan Masalah',
    contactIntro: 'Punya pertanyaan, ide, atau menemukan kesalahan kata/audio? Saya sangat senang mendengar masukan dari para pembelajar.',
    contactNameLabel: 'Pembuat & Pengembang:',
    contactEmailLabel: 'Email:',
    contactBugsLabel: 'Laporan Bug & Masukan:',
    communityTitle: 'Visi Sumber Terbuka (Open Source) di GitHub',
    communityParagraphs: [
      'Repositori kode saat ini bersifat privat selama penyempurnaan kurikulum dan penyesuaian audio 500+ materi berlangsung.',
      'Rencana ke depan adalah membuka kode di GitHub agar komunitas dapat berkontribusi lewat Pull Request (PR), membuka laporan isu, dan menyumbang koreksi penutur asli.'
    ],
    footerPrompt: 'Pelajari kebijakan hukum kami:',
    privacyLinkText: 'Kebijakan Privasi',
    termsLinkText: 'Ketentuan Layanan'
  },
  tr: {
    title: 'Hakkında ve İletişim',
    subtitle: 'Herkes için ücretsiz, açık ve erişilebilir dil eğitimi.',
    backToPractice: 'Pratiğe Dön',
    backToPracticeAria: 'Pratik derslerine geri dön',
    appOverviewTitle: 'Basic Language School Nedir?',
    appOverviewParagraphs: [
      'Basic Language School, dil öğrenenleri sıfırdan güvenle temel konuşma seviyesine taşımak için tasarlanmış etkileşimli bir web uygulamasıdır.',
      'İçeriği ücretli aboneliklerin veya günlük can sınırlarının ardına gizleyen uygulamaların aksine, Basic Language School tüm müfredatı reklamsız ve tamamen ücretsiz sunar.'
    ],
    featuresTitle: 'Öne Çıkan Özellikler',
    features: [
      {
        icon: '🌐',
        title: '8 Dil ve 56 Yön',
        desc: 'İngilizce, İspanyolca, Fransızca, Almanca, Rusça, Portekizce, Endonezce veya Türkçe dillerini ana dilinizden öğrenin.'
      },
      {
        icon: '🎧',
        title: '500+ Kelime ve Nöral Stüdyo Sesi',
        desc: 'Her kelime, ifade ve sayı için değişken oynatma hızına (0.5× - 1.25×) sahip stüdyo kalitesinde telaffuz sesi mevcuttur.'
      },
      {
        icon: '⚡',
        title: 'Aralıklı Tekrar Kümeleri ve Kuisler',
        desc: 'Akıllı yazım hatası toleransı ve fonetik ipuçlarıyla Dinleme veya Yazma modlarında pratik yapın.'
      },
      {
        icon: '📱',
        title: 'PWA (Çevrimdışı Kullanıma Hazır)',
        desc: 'Kesintisiz çalışma için telefonunuza veya bilgisayarınıza ana ekran uygulaması olarak doğrudan yükleyin.'
      },
      {
        icon: '🔒',
        title: 'Gizlilik Öncelikli Mimari',
        desc: 'Tüm öğrenme geçmişiniz varsayılan olarak cihazınızda yerel kalır; Google, GitHub veya Microsoft ile isteğe bağlı bulut senkronizasyonu yapılabilir.'
      }
    ],
    creatorTitle: 'Geliştirici Hakkında',
    creatorBio: [
      'Merhaba, ben John Bendfeldt. Basic Language School uygulamasını dilbilime, eğitime ve modern web teknolojilerine olan tutkumla geliştirdim.',
      'Dil öğrenmek kültürlerin ve yeni fırsatların kapısını aralar. Amacım, temel dil öğrenimini herkes için anlaşılır, zahmetsiz ve ücretsiz kılmaktır.'
    ],
    contactTitle: 'Sorular, Destek ve Hata Bildirimi',
    contactIntro: 'Bir sorunuz, öneriniz mi var veya bir yazım/ses hatasıyla mı karşılaştınız? Geri bildirimleriniz platformu geliştirmemde büyük önem taşır.',
    contactNameLabel: 'Geliştirici:',
    contactEmailLabel: 'E-posta:',
    contactBugsLabel: 'Hata Bildirimi ve Görüşler:',
    communityTitle: 'Açık Kaynak Vizyonu ve GitHub',
    communityParagraphs: [
      'Müfredat genişletmeleri ve ses kalibrasyonları tamamlanana kadar kaynak kod deposu geçici olarak özeldir.',
      'Gelecek planımız, projeyi GitHub üzerinden açık kaynaklı hale getirerek topluluk katkılarını, yerel telaffuz geri bildirimlerini ve Pull Request\'leri (PR) kabul etmektir.'
    ],
    footerPrompt: 'Yasal belgelerimizi inceleyin:',
    privacyLinkText: 'Gizlilik Politikası',
    termsLinkText: 'Hizmet Şartları'
  }
};
