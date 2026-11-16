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
        title: '15 Languages & 210 Directions',
        desc: 'Learn English, Spanish, French, German, Portuguese, Indonesian, Turkish, Russian, Mandarin Chinese, Japanese, Korean, Hindi, Arabic, Bengali, or Urdu — studying directly from any of these 15 base languages.'
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
    communityTitle: 'Open Source & GitHub Repositories',
    communityParagraphs: [
      'Basic Language School and its standalone sister apps (Basic English, Basic French, and Basic Russian) are open source under the MIT License on GitHub.',
      'We welcome community contributions — including new language packs, native speaker audio reviews, issue reports, and developer pull requests (PRs). Explore the repositories below:'
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
        title: '15 Idiomas y 210 Direcciones',
        desc: 'Aprende español, inglés, francés, alemán, portugués, indonesio, turco, ruso, chino mandarín, japonés, coreano, hindi, árabe, bengalí o urdu, estudiando desde cualquiera de estas 15 lenguas maternas.'
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
    communityTitle: 'Código Abierto y Repositorios en GitHub',
    communityParagraphs: [
      'Basic Language School y sus aplicaciones independientes hermanas (Basic English, Basic French y Basic Russian) son de código abierto bajo la Licencia MIT en GitHub.',
      'Damos la bienvenida a las contribuciones de la comunidad: paquetes de idiomas, revisiones de hablantes nativos, apertura de issues y pull requests (PRs).'
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
        title: '15 языков и 210 языковых пар',
        desc: 'Изучайте английский, испанский, французский, немецкий, португальский, индонезийский, турецкий, русский, китайский, японский, корейский, хинди, арабский, бенгальский или урду в любом из 210 направлений.'
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
    communityTitle: 'Открытый исходный код и репозитории на GitHub',
    communityParagraphs: [
      'Платформа Basic Language School и её отдельные приложения-спутники (Basic English, Basic French и Basic Russian) полностью открыты на GitHub под лицензией MIT.',
      'Мы рады вкладу сообщества: вы можете создавать Issues, помогать с проверкой произношения носителями языка и отправлять Pull Request (PR).'
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
        title: '15 Langues & 210 Paires',
        desc: 'Apprenez l\'anglais, l\'espagnol, le français, l\'allemand, le portugais, l\'indonésien, le turc, le russe, le chinois mandarin, le japonais, le coréen, le hindi, l\'arabe, le bengali ou l\'ourdou depuis votre langue maternelle.'
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
    communityTitle: 'Open Source et Dépôts GitHub',
    communityParagraphs: [
      'Basic Language School ainsi que ses applications autonomes sœurs (Basic English, Basic French et Basic Russian) sont publiés en open source sous licence MIT sur GitHub.',
      'Nous accueillons avec plaisir les contributions de la communauté : signalements d\'issues, relectures audio par des locuteurs natifs et Pull Requests (PR).'
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
        title: '15 Idiomas e 210 Direções',
        desc: 'Aprenda inglês, espanhol, francês, alemão, português, indonésio, turco, russo, chinês mandarim, japonês, coreano, hindi, árabe, bengali ou urdu estudando diretamente do seu idioma nativo.'
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
    communityTitle: 'Código Aberto e Repositórios no GitHub',
    communityParagraphs: [
      'A Basic Language School e seus aplicativos independentes (Basic English, Basic French e Basic Russian) têm código aberto sob a Licença MIT no GitHub.',
      'Convidamos a comunidade global a colaborar com abertura de issues, revisão de áudio por falantes nativos e envio de Pull Requests (PRs).'
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
        title: '15 Sprachen & 210 Sprachkombinationen',
        desc: 'Lernen Sie Englisch, Spanisch, Französisch, Deutsch, Portugiesisch, Indonesisch, Türkisch, Russisch, Mandarin-Chinesisch, Japanisch, Koreanisch, Hindi, Arabisch, Bengalisch oder Urdu aus jeder dieser 15 Ausgangssprachen.'
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
    communityTitle: 'Open Source & GitHub-Repositories',
    communityParagraphs: [
      'Die Basic Language School sowie die eigenständigen Schwester-Apps (Basic English, Basic French und Basic Russian) sind unter der MIT-Lizenz auf GitHub als Open Source veröffentlicht.',
      'Wir freuen uns über Beiträge der Community – ob neue Sprachpakete, Aussprache-Feedback von Muttersprachlern, Issues oder Pull Requests (PRs).'
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
        title: '15 Bahasa & 210 Pasangan Arah',
        desc: 'Pelajari Bahasa Inggris, Spanyol, Prancis, Jerman, Portugis, Indonesia, Turki, Rusia, Mandarin, Jepang, Korea, Hindi, Arab, Bengali, atau Urdu langsung dari bahasa ibu Anda.'
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
    communityTitle: 'Sumber Terbuka (Open Source) & Repositori GitHub',
    communityParagraphs: [
      'Basic Language School beserta aplikasi mandiri pendampingnya (Basic English, Basic French, dan Basic Russian) bersifat open source di bawah Lisensi MIT di GitHub.',
      'Kami menyambut kontribusi komunitas melalui laporan isu (Issues), tinjauan audio oleh penutur asli, serta Pull Request (PR).'
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
        title: '15 Dil ve 210 Yön',
        desc: 'İngilizce, İspanyolca, Fransızca, Almanca, Portekizce, Endonezce, Türkçe, Rusça, Çince (Mandarin), Japonca, Korece, Hintçe, Arapça, Bengalce veya Urduca dillerini ana dilinizden öğrenin.'
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
    communityTitle: 'Açık Kaynak ve GitHub Depoları',
    communityParagraphs: [
      'Basic Language School ve bağımsız kardeş uygulamaları (Basic English, Basic French ve Basic Russian) MIT Lisansı kapsamında GitHub üzerinde açık kaynaklıdır.',
      'Topluluk katkılarını, yeni dil paketlerini, ana dili konuşanların telaffuz incelemelerini ve GitHub üzerinden Issue ile Pull Request\'leri (PR) memnuniyetle karşılıyoruz.'
    ],
    footerPrompt: 'Yasal belgelerimizi inceleyin:',
    privacyLinkText: 'Gizlilik Politikası',
    termsLinkText: 'Hizmet Şartları'
  },
  ja: {
    title: 'Basic Language School について',
    subtitle: '誰でも学べる、自由でオープンな言語学習プラットフォーム。',
    backToPractice: '練習に戻る',
    backToPracticeAria: '練習レッスンに戻る',
    appOverviewTitle: 'Basic Language School とは？',
    appOverviewParagraphs: [
      'Basic Language School は、完全な初心者から自信を持って基礎的な会話ができるレベルまで導く、無料の自習型ウェブアプリです。',
      '課金ウォールや課金タイマー、不必要なライフ制限は一切なく、広告もありません。'
    ],
    featuresTitle: '主な特徴',
    features: [
      {
        icon: '🌐',
        title: 'マルチ言語対応 & 双方向学習',
        desc: '英語、日本語、韓国語、スペイン語、フランス語、ドイツ語、ロシア語、ポルトガル語などを母国語から直接学習できます。'
      },
      {
        icon: '🎧',
        title: 'スタジオ品質のネイティブ音声',
        desc: 'すべての単語やフレーズに自然で明瞭な発音音声を用意し、速度調節（0.5×〜1.25×）も可能です。'
      },
      {
        icon: '⚡',
        title: '間隔反復クイズ & タイプ練習',
        desc: 'タイポ許容機能とスマートな判定でストレスなくリスニング・ライティングを習得できます。'
      },
      {
        icon: '📱',
        title: 'オフライン対応 PWA',
        desc: 'ホーム画面に追加して、電波の届かないオフライン環境でも学習を続けられます。'
      },
      {
        icon: '🔒',
        title: 'プライバシー重視',
        desc: '学習履歴はブラウザ内に安全に保存され、オプションでクラウド同期も可能です。'
      }
    ],
    creatorTitle: '開発者について',
    creatorBio: [
      'こんにちは、開発者の John Bendfeldt です。言語学習と教育への情熱から Basic Language School を開発しました。',
      '新しい言語を学ぶことは世界への扉を開きます。誰もが手軽に学べる環境をこれからも提供していきます。'
    ],
    contactTitle: 'お問い合わせ・フィードバック',
    contactIntro: 'ご質問、ご提案、誤字・発音の修正報告など、お気軽にフィードバックをお寄せください。',
    contactNameLabel: '開発者:',
    contactEmailLabel: 'メール:',
    contactBugsLabel: '改善提案・バグ報告:',
    communityTitle: 'オープンソース & GitHub リポジトリ',
    communityParagraphs: [
      'Basic Language School および姉妹アプリ（Basic English・Basic French・Basic Russian）はすべて MIT ライセンスのもと GitHub でオープンソース公開されています。Issue 報告、ネイティブ発音レビュー、Pull Request（PR）による貢献を歓迎します。'
    ],
    footerPrompt: '利用規約とプライバシーポリシー:',
    privacyLinkText: 'プライバシーポリシー',
    termsLinkText: '利用規約'
  },
  zh: {
    title: '关于与联系',
    subtitle: '面向所有人的免费、开放且易用的多语言教育平台。',
    backToPractice: '返回练习',
    backToPracticeAria: '返回练习课程',
    appOverviewTitle: '什么是 Basic Language School？',
    appOverviewParagraphs: [
      'Basic Language School 是一个交互式、自主进度的语言学习平台，旨在帮助零基础学习者自信地掌握语言基础。',
      '与将内容隐藏在付费墙、订阅计时器或体力红心背后的应用不同，Basic Language School 提供无广告、无付费墙的完整课程学习。'
    ],
    featuresTitle: '核心特性与架构',
    features: [
      {
        icon: '🌐',
        title: '覆盖全球 15 种核心语言与 210 个学习方向',
        desc: '支持英语、西班牙语、法语、德语、葡萄牙语、印尼语、土耳其语、俄语、中文、日语、韩语、印地语、阿拉伯语、孟加拉语及乌尔都语的双向自主学习。'
      },
      {
        icon: '🎧',
        title: '500+ 核心词汇与录音棚级母语发音',
        desc: '每个词汇和短语均配备标准微软神经网络原生离线音频，告别机械合成音。'
      },
      {
        icon: '📊',
        title: '间隔重复与自适应练习',
        desc: '具备打字输入、听力听写与多项选择模式，根据您的答题情况智能复习难点词汇。'
      }
    ],
    creatorTitle: '关于开发者',
    creatorBio: [
      'Basic Language School 的诞生源于对纯粹、无障碍多语言学习的追求，致力于让全世界的学习者免费享受到高质量的语言启蒙教育。'
    ],
    contactTitle: '联系与反馈',
    contactIntro: '如果您有任何疑问、建议、发音或翻译勘误，欢迎随时向我们反馈。',
    contactNameLabel: '姓名：',
    contactEmailLabel: '邮箱：',
    contactBugsLabel: '问题反馈：',
    communityTitle: '开源社区与 GitHub 仓库',
    communityParagraphs: [
      'Basic Language School 及其独立姐妹应用（Basic English、Basic French、Basic Russian）均已在 GitHub 采用 MIT 许可证开源，欢迎开发者与母语学习者提交 Issue 与 Pull Request 共同完善课程与发音数据。'
    ],
    footerPrompt: '想了解我们如何保护您的数据？',
    privacyLinkText: '查看隐私政策',
    termsLinkText: '查看服务条款'
  },
  hi: {
    title: 'परिचय और संपर्क',
    subtitle: 'सभी के लिए निःशुल्क, खुला और सुलभ भाषा शिक्षण मंच।',
    backToPractice: 'अभ्यास पर वापस जाएँ',
    backToPracticeAria: 'अभ्यास पाठों पर वापस जाएँ',
    appOverviewTitle: 'Basic Language School क्या है?',
    appOverviewParagraphs: [
      'Basic Language School एक संवादात्मक, स्व-गति से चलने वाला भाषा शिक्षण मंच है, जो शुरुआती शिक्षार्थियों को मूलभूत भाषा कौशल में पारंगत बनाता है।',
      'अन्य ऐप्स के विपरीत जहाँ सामग्री सशुल्क दीवारों या विज्ञापनों के पीछे छिपी होती है, Basic Language School बिना किसी विज्ञापन और बिना शुल्क के पूर्ण पाठ्यक्रम प्रदान करता है।'
    ],
    featuresTitle: 'मुख्य विशेषताएँ और वास्तुकला',
    features: [
      {
        icon: '🌐',
        title: 'विश्व की 15 प्रमुख भाषाएँ और 210 दिशाएँ',
        desc: 'अंग्रेज़ी, स्पैनिश, फ़्रेंच, जर्मन, पुर्तगाली, इंडोनेशियाई, तुर्की, रूसी, मंदारिन चीनी, जापानी, कोरियाई, हिन्दी, अरबी, बंगाली और उर्दू में द्विदिशीय अध्ययन।'
      },
      {
        icon: '🎧',
        title: '500+ शब्द और स्टूडियो न्यूरल ऑडियो',
        desc: 'प्रत्येक शब्द और वाक्यांश के लिए क्रिस्टल-स्पष्ट प्रामाणिक स्टूडियो न्यूरल उच्चारण।'
      },
      {
        icon: '📊',
        title: 'अंतराल पुनरावृत्ति और अनुकूलन अभ्यास',
        desc: 'लेखन, श्रवण और बहुविकल्पीय मोड के साथ स्मार्ट क्विज़।'
      }
    ],
    creatorTitle: 'डेवलपर के बारे में',
    creatorBio: [
      'Basic Language School की शुरुआत उच्च-गुणवत्ता वाली भाषा शिक्षा को दुनिया के हर व्यक्ति के लिए मुफ़्त और सुलभ बनाने के उद्देश्य से हुई।'
    ],
    contactTitle: 'संपर्क और फ़ीडबैक',
    contactIntro: 'यदि आपके पास कोई प्रश्न, सुझाव या त्रुटि सुधार है, तो कृपया हमसे संपर्क करें।',
    contactNameLabel: 'नाम:',
    contactEmailLabel: 'ईमेल:',
    contactBugsLabel: 'समस्या रिपोर्ट:',
    communityTitle: 'ओपन सोर्स और GitHub रिपॉज़िटरी',
    communityParagraphs: [
      'Basic Language School और इसके सहयोगी ऐप्स (Basic English, Basic French और Basic Russian) MIT लाइसेंस के तहत GitHub पर ओपन-सोर्स हैं और समुदाय के Issues व Pull Requests का स्वागत करते हैं।'
    ],
    footerPrompt: 'गोपनीयता और नियम जानना चाहते हैं?',
    privacyLinkText: 'गोपनीयता नीति देखें',
    termsLinkText: 'सेवा की शर्तें देखें'
  },
  ko: {
    title: '소개 & 문의',
    subtitle: '누구나 자유롭게 배울 수 있는 오픈 어학 학습 플랫폼.',
    backToPractice: '학습으로 돌아가기',
    backToPracticeAria: '학습 레슨으로 돌아가기',
    appOverviewTitle: 'Basic Language School이란?',
    appOverviewParagraphs: [
      'Basic Language School은 완전한 기초 학습자부터 자신감 있게 대화할 수 있는 기초 실력까지 이끌어주는 무료 자기주도형 웹 앱입니다.',
      '유료 결제벽, 결제 타이머, 불필요한 하트 시스템이나 광고 없이 모든 커리큘럼을 무료로 이용할 수 있습니다.'
    ],
    featuresTitle: '주요 기능 및 핵심 아키텍처',
    features: [
      {
        icon: '🌐',
        title: '다국어 & 양방향 학습 지원',
        desc: '영어, 한국어, 일본어, 스페인어, 프랑스어, 독일어, 러시아어 등을 모국어로부터 직접 학습할 수 있습니다.'
      },
      {
        icon: '🎧',
        title: '자연스러운 스튜디오 네이티브 음성',
        desc: '모든 단어와 표현에 명확하고 자연스러운 원어민 음성을 제공하며, 속도 조절(0.5×~1.25×)도 지원합니다.'
      },
      {
        icon: '⚡',
        title: '스마트 오타 허용 퀴즈 & 복습',
        desc: '사소한 오타에 유연한 스마트 퍼지 매칭과 쓰기/듣기 연습으로 좌절 없이 학습할 수 있습니다.'
      },
      {
        icon: '📱',
        title: '오프라인 완벽 지원 PWA',
        desc: '홈 화면에 설치하여 오프라인 환경에서도 인터넷 연결 없이 언제 어디서나 학습할 수 있습니다.'
      },
      {
        icon: '🔒',
        title: '프라이버시 최우선',
        desc: '학습 기록은 기기 로컬에 안전하게 저장되며, 선택적으로 클라우드 동기화가 가능합니다.'
      }
    ],
    creatorTitle: '개발자 소개',
    creatorBio: [
      '안녕하세요, 개발자 John Bendfeldt입니다. 어학과 교육에 대한 열정으로 Basic Language School을 제작했습니다.',
      '새로운 언어를 배우는 것은 새로운 세상을 만나는 일입니다. 누구나 부담 없이 언어를 익힐 수 있도록 돕겠습니다.'
    ],
    contactTitle: '문의 및 피드백',
    contactIntro: '질문이나 개선 제안, 발음/오타 제보가 있으신가요? 여러분의 피드백은 서비스 개선에 큰 힘이 됩니다.',
    contactNameLabel: '개발자:',
    contactEmailLabel: '이메일:',
    contactBugsLabel: '제안 및 버그 제보:',
    communityTitle: '오픈소스 및 GitHub 저장소',
    communityParagraphs: [
      'Basic Language School과 자매 단독 웹앱(Basic English, Basic French, Basic Russian)은 모두 MIT 라이선스 하에 GitHub에 공개된 오픈소스 프로젝트입니다. 이슈 제보, 원어민 발음 검수 및 Pull Request(PR) 기여를 환영합니다.'
    ],
    footerPrompt: '법적 고지:',
    privacyLinkText: '개인정보 처리방침',
    termsLinkText: '이용약관'
  },
  ar: {
    title: 'حول والتواصل',
    subtitle: 'منصة مفتوحة لتعلم اللغات مجاناً للجميع.',
    backToPractice: 'العودة إلى التدريب',
    backToPracticeAria: 'العودة إلى دروس التدريب',
    appOverviewTitle: 'ما هي مدرسة اللغات الأساسية (Basic Language School)؟',
    appOverviewParagraphs: [
      'Basic Language School هو تطبيق ويب مجاني يساعدك على الانتقال من مستوى المبتدئ إلى التحدث بثقة في المحادثات اليومية ومواقف العمل.',
      'جميع الدروس مجانية تماماً ومتاحة للجميع، دون جدران دفع، أو مؤقتات مزعجة، أو إعلانات.'
    ],
    featuresTitle: 'الميزات الرئيسية وبنية المنصة',
    features: [
      {
        icon: '🌐',
        title: 'منهج ثنائي الاتجاه بلغات متعددة',
        desc: 'تعلم العربية والإنجليزية والفرنسية والإسبانية والألمانية والروسية والمزيد مباشرة بلغتك الأم.'
      },
      {
        icon: '🎧',
        title: 'أصوات أصلية بجودة استوديو احترافية',
        desc: 'كل حرف وكلمة وعبارة مسجلة بصوت نقي ونطق أصلي، مع إمكانية التحكم في السرعة (0.5× إلى 1.25×).'
      },
      {
        icon: '⚡',
        title: 'اختبارات ذكية مع مطابقة ذكية للأخطاء المطبعية',
        desc: 'تدرب على الكتابة والاستماع مع خوارزمية ذكية تتسامح مع الأخطاء المطبعية البسيطة لتجنب الإحباط.'
      },
      {
        icon: '📱',
        title: 'تطبيق ويب تقدمي (PWA) يعمل بدون إنترنت',
        desc: 'ثبته مباشرة على هاتفك أو جهازك وتمرن في أي وقت حتى بدون اتصال بالإنترنت.'
      },
      {
        icon: '🔒',
        title: 'الخصوصية أولاً',
        desc: 'يتم حفظ تقدمك وإحصائياتك محلياً على جهازك بأمان مع خيار المزامنة السحابية عند رغبتك.'
      }
    ],
    creatorTitle: 'عن المطور',
    creatorBio: [
      'مرحباً! أنا جون بيندفيلدت (John Bendfeldt). قمت ببناء Basic Language School بشغف باللغات والتعليم لإتاحة العلم للجميع.',
      'تعلم لغة جديدة يفتح لك أبواباً إلى عوالم وثقافات جديدة، وهدفي هو جعل هذه التجربة ممتعة ومجانية تماماً.'
    ],
    contactTitle: 'التواصل والآراء',
    contactIntro: 'هل لديك سؤال أو اقتراح أو ملاحظة حول النطق؟ يسعدنا دائماً سماع رأيك لتحسين المنصة.',
    contactNameLabel: 'المطور:',
    contactEmailLabel: 'البريد الإلكتروني:',
    contactBugsLabel: 'الاقتراحات والإبلاغ عن الأخطاء:',
    communityTitle: 'المصدر المفتوح ومستودعات GitHub',
    communityParagraphs: [
      'منصة Basic Language School وتطبيقاتها المستقلة الشقيقة (Basic English و Basic French و Basic Russian) مفتوحة المصدر بالكامل تحت ترخيص MIT على GitHub، ونرحب بمساهمات المجتمع ومراجعات النطق وطلبات السحب (PRs).'
    ],
    footerPrompt: 'المعلومات القانونية:',
    privacyLinkText: 'سياسة الخصوصية',
    termsLinkText: 'شروط الخدمة'
  },
  bn: {
    title: 'পরিচিতি ও যোগাযোগ',
    subtitle: 'সবার জন্য উন্মুক্ত, সহজলভ্য এবং সম্পূর্ণ বিনামূল্যের ভাষা শিক্ষা।',
    backToPractice: 'অনুশীলনে ফিরুন',
    backToPracticeAria: 'অনুশীলন পাঠে ফিরে যান',
    appOverviewTitle: 'Basic Language School কী?',
    appOverviewParagraphs: [
      'Basic Language School একটি ইন্টারেক্টিভ ও স্ব-গতিশীল ওয়েব প্ল্যাটফর্ম, যা নতুন শিক্ষার্থীদের শুরু থেকে আত্মবিশ্বাসী বক্তা হতে সাহায্য করে।',
      'কোনো বিজ্ঞাপন বা পে-ওয়াল ছাড়াই প্ল্যাটফর্মের সকল বিষয়বস্তু সম্পূর্ণ উন্মুক্ত।'
    ],
    featuresTitle: 'মূল বৈশিষ্ট্য ও স্থাপত্য',
    features: [
      {
        icon: '🌐',
        title: 'দ্বিমুখী পাঠ্যক্রম',
        desc: 'আপনার নিজস্ব মাতৃভাষা থেকে সরাসরি বাংলা, ইংরেজি, রুশ, স্প্যানিশ এবং অন্যান্য ভাষা শিখুন।'
      },
      {
        icon: '🎧',
        title: 'স্টুডিও মানের খাঁটি নিউরাল অডিও',
        desc: 'প্রতিটি বর্ণ, শব্দ ও বাক্যের জন্য প্রাকৃতিক উচ্চারণ এবং প্লেব্যাক গতি নিয়ন্ত্রণের সুবিধা।'
      },
      {
        icon: '⚡',
        title: 'স্মার্ট কুইজ ও টাইপো সহনশীলতা',
        desc: 'বানানের ছোটখাটো ভুল ক্ষমা করে কার্যকরভাবে শেখার ইন্টারেক্টিভ কুইজ।'
      },
      {
        icon: '📱',
        title: 'অফলাইন সুবিধাসহ প্রগ্রেসিভ ওয়েব অ্যাপ (PWA)',
        desc: 'ইন্টারনেট ছাড়াই যেকোনো ডিভাইসে সরাসরি ইনস্টল করে অনুশীলন চালিয়ে যান।'
      },
      {
        icon: '🔒',
        title: 'গোপনীয়তা অগ্রাধিকার',
        desc: 'আপনার শেখার অগ্রগতি আপনার ডিভাইসেই নিরাপদে সংরক্ষিত থাকে।'
      }
    ],
    creatorTitle: 'নির্মাতা পরিচিতি',
    creatorBio: [
      'হ্যালো! আমি জন বেন্ডফেল্ডট (John Bendfeldt)। সবার জন্য উন্মুক্ত ও সমৃদ্ধ ভাষা শিক্ষার উদ্দেশ্যে এই প্ল্যাটফর্ম তৈরি করেছি।',
      'নতুন ভাষা শেখা নতুন সংস্কৃতির দ্বার উন্মোচন করে, আর এই অভিজ্ঞতাকে আনন্দদায়ক করাই আমাদের লক্ষ্য।'
    ],
    contactTitle: 'যোগাযোগ ও প্রতিক্রিয়া',
    contactIntro: 'আপনার কোনো প্রশ্ন, পরামর্শ বা মতামত থাকলে নির্দ্বিধায় আমাদের জানান।',
    contactNameLabel: 'নির্মাতা:',
    contactEmailLabel: 'ইমেইল:',
    contactBugsLabel: 'সমস্যা প্রতিবেদন:',
    communityTitle: 'ওপেন সোর্স ও GitHub রিপোজিটরি',
    communityParagraphs: [
      'Basic Language School এবং এর সহযোগী অ্যাপগুলো (Basic English, Basic French ও Basic Russian) MIT লাইসেন্সের অধীনে GitHub-এ সম্পূর্ণ ওপেন সোর্স। আমরা কমিউনিটির Issue, উচ্চারণ যাচাই এবং Pull Request স্বাগত জানাই।'
    ],
    footerPrompt: 'আইনি তথ্য:',
    privacyLinkText: 'গোপনীয়তা নীতি',
    termsLinkText: 'ব্যবহারের শর্তাবলী'
  },
  ur: {
    title: 'ہمارے متعلق اور رابطہ',
    subtitle: 'سب کے لیے مفت، کھلی اور قابل رسائی زبان کی تعلیم۔',
    backToPractice: 'مشق پر واپس جائیں',
    backToPracticeAria: 'مشقی اسباق پر واپس جائیں',
    appOverviewTitle: 'بیسک لینگویج اسکول کیا ہے؟',
    appOverviewParagraphs: [
      'بیسک لینگویج اسکول ایک انٹرایکٹو اور خود رفتار تعلیمی ویب پلیٹ فارم ہے جو ابتدائی سیکھنے والوں کو اعتماد فراہم کرتا ہے۔',
      'بغیر کسی اشتہارات یا ادائیگی کی پابندی کے تمام اسباق مکمل طور پر مفت دستیاب ہیں۔'
    ],
    featuresTitle: 'اہم خصوصیات اور بنیادی ڈھانچہ',
    features: [
      {
        icon: '🌐',
        title: 'دو طرفہ جامع نصاب',
        desc: 'اپنی مادری زبان سے براہ راست اردو، انگریزی، عربی اور دیگر عالمی زبانیں سیکھیں۔'
      },
      {
        icon: '🎧',
        title: 'اصلی اور معیاری اسٹوڈیو آڈیو',
        desc: 'ہر حرف، لفظ اور جملے کے لیے واضح تلفظ اور رفتار کنٹرول کی سہولت۔'
      },
      {
        icon: '⚡',
        title: 'ہوشمندانہ کوئز اور ٹائپنگ مشق',
        desc: 'سننے اور لکھنے کی مہارت کے لیے جدید اور پرکشش امتحانات۔'
      },
      {
        icon: '📱',
        title: 'آف لائن پروگریسو ویب ایپ (PWA)',
        desc: 'انٹرنیٹ کے بغیر بھی اپنے فون یا کمپیوٹر پر انسٹال کر کے مطالعہ جاری رکھیں۔'
      },
      {
        icon: '🔒',
        title: 'رازداری اور ڈیٹا کی حفاظت',
        desc: 'آپ کی تعلیمی پیش رفت مکمل طور پر آپ کے آلے پر محفوظ رہتی ہے۔'
      }
    ],
    creatorTitle: 'ڈویلپر کے بارے میں',
    creatorBio: [
      'خوش آمدید! میرا نام جان بینڈفیلڈٹ (John Bendfeldt) ہے۔ میں نے یہ پلیٹ فارم زبان کے شوق اور مفت تعلیم کے فروغ کے لیے بنایا ہے۔',
      'نئی زبان سیکھنا ایک نئی دنیا میں قدم رکھنے کے مترادف ہے، اور ہمارا مقصد اس سفر کو آسان بنانا ہے۔'
    ],
    contactTitle: 'رابطہ اور آراء',
    contactIntro: 'اگر آپ کے پاس کوئی سوال یا مشورہ ہے تو ہم سے ضرور رابطہ کریں۔',
    contactNameLabel: 'ڈویلپر:',
    contactEmailLabel: 'ای میل:',
    contactBugsLabel: 'تجاویز اور نقائص کی رپورٹ:',
    communityTitle: 'اوپن سورس اور GitHub ریپوزٹریز',
    communityParagraphs: [
      'بیسک لینگویج اسکول اور اس کی ذیلی ایپس (Basic English، Basic French اور Basic Russian) GitHub پر MIT لائسنس کے تحت مکمل طور پر اوپن سورس ہیں۔ کمیونٹی کی تجاویز، آڈیو جائزے اور Pull Requests کا خیرمقدم کیا جاتا ہے۔'
    ],
    footerPrompt: 'قانونی معلومات:',
    privacyLinkText: 'رازداری کی پالیسی',
    termsLinkText: 'شرائط و ضوابط'
  }
};
