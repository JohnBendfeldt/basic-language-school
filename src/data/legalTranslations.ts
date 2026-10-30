import { SupportedLanguageId } from './languages/types';

export interface LegalContent {
  title: string;
  lastUpdated: string;
  backToPractice: string;
  backToPracticeAria: string;
  summaryTitle?: string;
  summaryText?: string;
  sections: {
    heading: string;
    paragraphs: string[];
    listItems?: string[];
  }[];
  contactHeading: string;
  contactIntro: string;
  footerPrompt: string;
  footerLink: string;
}

export const TERMS_TRANSLATIONS: Record<SupportedLanguageId, LegalContent> = {
  en: {
    title: 'Terms of Service',
    lastUpdated: 'Last Updated: October 16, 2026',
    backToPractice: 'Back to Practice',
    backToPracticeAria: 'Back to practice lessons',
    sections: [
      {
        heading: '1. Agreement to Terms',
        paragraphs: [
          'By accessing or using Basic Language School (located at basiclanguage.school), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application.'
        ]
      },
      {
        heading: '2. Purpose of the Service',
        paragraphs: [
          'Basic Language School is provided as an interactive, educational language learning platform designed to help users practice 8 languages (Spanish, French, German, Russian, Portuguese, Indonesian, Turkish, and English) including alphabets, pronunciation, numbers, common words, and workplace vocabulary. The service is provided free of charge for personal, non-commercial educational use.'
        ]
      },
      {
        heading: '3. User Accounts & Acceptable Use',
        paragraphs: [
          'You may use Basic Language School without an account (Guest Mode) or sign in via Google OAuth or Microsoft Entra ID to save your learning history across courses. When using the service, you agree not to:'
        ],
        listItems: [
          'Attempt to bypass, disable, or tamper with security or Row Level Security policies of our database or APIs.',
          'Use automated bots, scrapers, or scripts to abuse the quiz or voice APIs.',
          'Impersonate another user or access an account not belonging to you.'
        ]
      },
      {
        heading: '4. Intellectual Property',
        paragraphs: [
          'The code for Basic Language School is open source under the MIT License. The audio assets, learning design, and trademarks belong to their respective creators and operators.'
        ]
      },
      {
        heading: '5. Disclaimer of Warranties',
        paragraphs: [
          'Basic Language School is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied. While we strive for accuracy in our language transliterations and pronunciation guides, we make no guarantees that the content is completely error-free or that service will be uninterrupted.'
        ]
      },
      {
        heading: '6. Limitation of Liability',
        paragraphs: [
          'In no event shall Basic Language School or its developer be liable for any indirect, incidental, or consequential damages resulting from your use of or inability to use the service.'
        ]
      },
      {
        heading: '7. Modifications to the Service',
        paragraphs: [
          'We reserve the right to modify, update, or discontinue any feature of Basic Language School at any time without notice.'
        ]
      }
    ],
    contactHeading: '8. Contact Information',
    contactIntro: 'For any questions regarding these Terms, please contact:',
    footerPrompt: 'Questions about how we handle your data? ',
    footerLink: 'View Privacy Policy'
  },
  es: {
    title: 'Términos de Servicio',
    lastUpdated: 'Última actualización: 16 de octubre de 2026',
    backToPractice: 'Volver a la Práctica',
    backToPracticeAria: 'Volver a las lecciones de práctica',
    sections: [
      {
        heading: '1. Aceptación de los Términos',
        paragraphs: [
          'Al acceder o utilizar Basic Language School (ubicado en basiclanguage.school), aceptas regirte por estos Términos de Servicio. Si no estás de acuerdo con estos términos, por favor no utilices la aplicación.'
        ]
      },
      {
        heading: '2. Propósito del Servicio',
        paragraphs: [
          'Basic Language School es una plataforma educativa e interactiva diseñada para practicar 8 idiomas (español, francés, alemán, ruso, portugués, indonesio, turco e inglés), abarcando alfabetos, pronunciación, números, vocabulario cotidiano y profesional. El servicio se ofrece de forma gratuita para uso educativo personal.'
        ]
      },
      {
        heading: '3. Cuentas de Usuario y Uso Aceptable',
        paragraphs: [
          'Puedes usar la aplicación como invitado (sin cuenta) o iniciar sesión con Google o Microsoft para sincronizar tu progreso. Al usar el servicio, aceptas no:'
        ],
        listItems: [
          'Intentar eludir o manipular las políticas de seguridad de la base de datos o APIs.',
          'Utilizar robots, scrapers o scripts automatizados para abusar de los cuestionarios o APIs de voz.',
          'Suplantar la identidad de otro usuario o acceder a cuentas ajenas.'
        ]
      },
      {
        heading: '4. Propiedad Intelectual',
        paragraphs: [
          'El código fuente es de código abierto bajo la Licencia MIT. Los recursos de audio, diseño pedagógico y marcas comerciales pertenecen a sus respectivos creadores.'
        ]
      },
      {
        heading: '5. Exención de Garantías',
        paragraphs: [
          'El servicio se proporciona "TAL CUAL" y "SEGÚN DISPONIBILIDAD", sin garantías de ningún tipo. Aunque nos esforzamos por la precisión en transliteraciones y audio, no garantizamos que el contenido esté totalmente libre de errores.'
        ]
      },
      {
        heading: '6. Limitación de Responsabilidad',
        paragraphs: [
          'En ningún caso Basic Language School ni sus desarrolladores serán responsables de daños indirectos o consecuentes derivados del uso del servicio.'
        ]
      },
      {
        heading: '7. Modificaciones del Servicio',
        paragraphs: [
          'Nos reservamos el derecho de modificar o actualizar cualquier característica de la plataforma en cualquier momento.'
        ]
      }
    ],
    contactHeading: '8. Información de Contacto',
    contactIntro: 'Para cualquier consulta relacionada con estos Términos, comunícate con:',
    footerPrompt: '¿Preguntas sobre cómo tratamos tus datos? ',
    footerLink: 'Ver Política de Privacidad'
  },
  fr: {
    title: "Conditions d'utilisation",
    lastUpdated: 'Dernière mise à jour : 16 octobre 2026',
    backToPractice: 'Retour à la pratique',
    backToPracticeAria: 'Retour aux leçons de pratique',
    sections: [
      {
        heading: '1. Acceptation des conditions',
        paragraphs: [
          "En accédant à Basic Language School (situé sur basiclanguage.school), vous acceptez d'être lié par les présentes Conditions d'utilisation."
        ]
      },
      {
        heading: '2. Objectif du service',
        paragraphs: [
          "Basic Language School est une plateforme d'apprentissage linguistique interactive et gratuite permettant d'apprendre 8 langues à des fins personnelles et éducatives."
        ]
      },
      {
        heading: '3. Comptes utilisateurs et usage acceptable',
        paragraphs: [
          'Vous pouvez utiliser le service en mode invité ou vous connecter via Google ou Microsoft pour sauvegarder vos progrès.'
        ],
        listItems: [
          'Ne pas tenter de contourner les politiques de sécurité de nos bases de données.',
          'Ne pas utiliser de robots ou scripts automatisés.',
          "Ne pas usurper l'identité d'un autre utilisateur."
        ]
      },
      {
        heading: '4. Propriété intellectuelle',
        paragraphs: [
          'Le code est open source sous licence MIT. Les ressources audio et la marque appartiennent à leurs créateurs respectifs.'
        ]
      },
      {
        heading: '5. Exclusion de garanties',
        paragraphs: [
          'Le service est fourni « TEL QUEL », sans garantie expresse ou implicite.'
        ]
      },
      {
        heading: '6. Limitation de responsabilité',
        paragraphs: [
          "Nous ne pourrons être tenus responsables des dommages indirects résultant de l'utilisation du service."
        ]
      },
      {
        heading: '7. Modifications du service',
        paragraphs: [
          'Nous nous réservons le droit de modifier ou de mettre à jour le service à tout moment.'
        ]
      }
    ],
    contactHeading: '8. Contact',
    contactIntro: 'Pour toute question relative aux présentes conditions, veuillez contacter :',
    footerPrompt: 'Des questions sur vos données personnelles ? ',
    footerLink: 'Voir la Politique de confidentialité'
  },
  ru: {
    title: 'Условия использования',
    lastUpdated: 'Последнее обновление: 16 октября 2026 г.',
    backToPractice: 'Вернуться к урокам',
    backToPracticeAria: 'Вернуться к урокам практики',
    sections: [
      {
        heading: '1. Согласие с условиями',
        paragraphs: [
          'Используя сервис Basic Language School (basiclanguage.school), вы соглашаетесь соблюдать настоящие Условия использования.'
        ]
      },
      {
        heading: '2. Назначение сервиса',
        paragraphs: [
          'Basic Language School — это бесплатная интерактивная образовательная платформа для изучения 8 языков (испанский, французский, немецкий, русский, португальский, индонезийский, турецкий и английский).'
        ]
      },
      {
        heading: '3. Учётные записи и правила использования',
        paragraphs: [
          'Вы можете пользоваться сервисом без регистрации (Гостевой режим) или войти через Google/Microsoft для сохранения своего прогресса. Запрещается:'
        ],
        listItems: [
          'Пытаться обойти или нарушить политики безопасности базы данных (Row Level Security).',
          'Использовать автоматизированных ботов или скраперы для перегрузки тестов или аудио-API.',
          'Выдавать себя за другого пользователя или получать несанкционированный доступ к аккаунту.'
        ]
      },
      {
        heading: '4. Интеллектуальная собственность',
        paragraphs: [
          'Исходный код платформы распространяется по лицензии MIT. Аудиозаписи и дизайн принадлежат их авторам.'
        ]
      },
      {
        heading: '5. Отказ от гарантий',
        paragraphs: [
          'Сервис предоставляется на условиях «КАК ЕСТЬ» и «ПО МЕРЕ ДОСТУПНОСТИ» без каких-либо прямых или подразумеваемых гарантий.'
        ]
      },
      {
        heading: '6. Ограничение ответственности',
        paragraphs: [
          'Разработчики не несут ответственности за косвенные убытки, возникшие в результате использования или невозможности использования сервиса.'
        ]
      },
      {
        heading: '7. Изменения в сервисе',
        paragraphs: [
          'Мы оставляем за собой право изменять или обновлять функционал платформы в любое время.'
        ]
      }
    ],
    contactHeading: '8. Контактная информация',
    contactIntro: 'По любым вопросам относительно настоящих Условий обращайтесь:',
    footerPrompt: 'Вопросы о защите персональных данных? ',
    footerLink: 'Политика конфиденциальности'
  },
  pt: {
    title: 'Termos de Serviço',
    lastUpdated: 'Última atualização: 16 de outubro de 2026',
    backToPractice: 'Voltar à Prática',
    backToPracticeAria: 'Voltar às lições de prática',
    sections: [
      {
        heading: '1. Concordância com os Termos',
        paragraphs: [
          'Ao acessar ou utilizar a Basic Language School (basiclanguage.school), você concorda com estes Termos de Serviço.'
        ]
      },
      {
        heading: '2. Finalidade do Serviço',
        paragraphs: [
          'A Basic Language School é uma plataforma educacional gratuita desenvolvida para o aprendizado prático de 8 idiomas.'
        ]
      },
      {
        heading: '3. Contas de Usuário e Uso Aceitável',
        paragraphs: [
          'Você pode praticar como convidado ou conectar sua conta Google/Microsoft para salvar o progresso.'
        ],
        listItems: [
          'Não burlar ou adulterar as políticas de segurança do banco de dados.',
          'Não utilizar bots ou scripts automatizados.',
          'Não se passar por outro usuário.'
        ]
      },
      {
        heading: '4. Propriedade Intelectual',
        paragraphs: [
          'O código é aberto sob licença MIT. Os arquivos de áudio pertencem aos seus respectivos criadores.'
        ]
      },
      {
        heading: '5. Isenção de Garantias',
        paragraphs: [
          'O serviço é fornecido "NO ESTADO EM QUE SE ENCONTRA", sem garantias de qualquer tipo.'
        ]
      },
      {
        heading: '6. Limitação de Responsabilidade',
        paragraphs: [
          'Não seremos responsáveis por quaisquer danos indiretos decorrentes do uso da plataforma.'
        ]
      },
      {
        heading: '7. Alterações no Serviço',
        paragraphs: [
          'Reservamo-nos o direito de modificar ou atualizar os recursos a qualquer momento.'
        ]
      }
    ],
    contactHeading: '8. Informações de Contato',
    contactIntro: 'Para dúvidas sobre estes Termos, entre em contato:',
    footerPrompt: 'Dúvidas sobre como tratamos seus dados? ',
    footerLink: 'Ver Política de Privacidade'
  },
  de: {
    title: 'Nutzungsbedingungen',
    lastUpdated: 'Zuletzt aktualisiert: 16. Oktober 2026',
    backToPractice: 'Zurück zur Übung',
    backToPracticeAria: 'Zurück zu den Übungslektionen',
    sections: [
      {
        heading: '1. Zustimmung zu den Bedingungen',
        paragraphs: [
          'Durch den Zugriff auf die Basic Language School (basiclanguage.school) erklären Sie sich mit diesen Nutzungsbedingungen einverstanden.'
        ]
      },
      {
        heading: '2. Zweck des Dienstes',
        paragraphs: [
          'Basic Language School ist eine kostenlose, interaktive Bildungsplattform zum Erlernen von 8 Sprachen.'
        ]
      },
      {
        heading: '3. Benutzerkonten und zulässige Nutzung',
        paragraphs: [
          'Sie können die App als Gast nutzen oder sich über Google/Microsoft anmelden, um Ihren Lernfortschritt zu synchronisieren.'
        ],
        listItems: [
          'Keine Manipulation der Datenbanksicherheit oder APIs.',
          'Keine Verwendung automatisierter Bots oder Scraper.',
          'Keine Identitätstäuschung oder unbefugter Kontozugriff.'
        ]
      },
      {
        heading: '4. Geistiges Eigentum',
        paragraphs: [
          'Der Quellcode ist unter der MIT-Lizenz quelloffen. Audiodaten und Marken gehören den jeweiligen Urhebern.'
        ]
      },
      {
        heading: '5. Gewährleistungsausschluss',
        paragraphs: [
          'Die Bereitstellung erfolgt „WIE BESEHEN“ und „WIE VERFÜGBAR“ ohne jegliche Gewährleistung.'
        ]
      },
      {
        heading: '6. Haftungsbeschränkung',
        paragraphs: [
          'Wir haften nicht für indirekte Schäden, die aus der Nutzung des Dienstes entstehen.'
        ]
      },
      {
        heading: '7. Änderungen am Dienst',
        paragraphs: [
          'Wir behalten uns das Recht vor, Funktionen jederzeit ohne vorherige Ankündigung anzupassen.'
        ]
      }
    ],
    contactHeading: '8. Kontaktinformationen',
    contactIntro: 'Bei Fragen zu diesen Bedingungen kontaktieren Sie bitte:',
    footerPrompt: 'Fragen zum Datenschutz? ',
    footerLink: 'Datenschutzerklärung ansehen'
  },
  id: {
    title: 'Ketentuan Layanan',
    lastUpdated: 'Terakhir Diperbarui: 16 Oktober 2026',
    backToPractice: 'Kembali ke Latihan',
    backToPracticeAria: 'Kembali ke pelajaran latihan',
    sections: [
      {
        heading: '1. Persetujuan terhadap Ketentuan',
        paragraphs: [
          'Dengan mengakses atau menggunakan Basic Language School (basiclanguage.school), Anda setuju untuk terikat oleh Ketentuan Layanan ini.'
        ]
      },
      {
        heading: '2. Tujuan Layanan',
        paragraphs: [
          'Basic Language School adalah platform pembelajaran bahasa interaktif dan gratis untuk melatih 8 bahasa untuk keperluan pendidikan pribadi.'
        ]
      },
      {
        heading: '3. Akun Pengguna & Penggunaan yang Diizinkan',
        paragraphs: [
          'Anda dapat belajar sebagai tamu atau masuk melalui Google/Microsoft untuk menyinkronkan kemajuan belajar Anda.'
        ],
        listItems: [
          'Dilarang meretas atau memanipulasi keamanan basis data.',
          'Dilarang menggunakan bot atau perayap otomatis.',
          'Dilarang menyamar sebagai pengguna lain.'
        ]
      },
      {
        heading: '4. Hak Kekayaan Intelektual',
        paragraphs: [
          'Kode sumber bersifat open source di bawah Lisensi MIT. Aset audio adalah milik pencipta masing-masing.'
        ]
      },
      {
        heading: '5. Penafian Garansi',
        paragraphs: [
          'Layanan disediakan "SEBAGAIMANA ADANYA" tanpa jaminan apa pun.'
        ]
      },
      {
        heading: '6. Batasan Tanggung Jawab',
        paragraphs: [
          'Kami tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan layanan.'
        ]
      },
      {
        heading: '7. Perubahan Layanan',
        paragraphs: [
          'Kami berhak mengubah atau memperbarui fitur layanan kapan saja.'
        ]
      }
    ],
    contactHeading: '8. Informasi Kontak',
    contactIntro: 'Untuk pertanyaan mengenai Ketentuan ini, silakan hubungi:',
    footerPrompt: 'Pertanyaan tentang cara kami menangani data Anda? ',
    footerLink: 'Lihat Kebijakan Privasi'
  },
  tr: {
    title: 'Hizmet Şartları',
    lastUpdated: 'Son Güncelleme: 16 Ekim 2026',
    backToPractice: 'Alıştırmaya Dön',
    backToPracticeAria: 'Alıştırma derslerine geri dön',
    sections: [
      {
        heading: '1. Şartların Kabulü',
        paragraphs: [
          'Basic Language School (basiclanguage.school) web sitesine erişerek bu Hizmet Şartlarına bağlı kalmayı kabul etmiş olursunuz.'
        ]
      },
      {
        heading: '2. Hizmetin Amacı',
        paragraphs: [
          'Basic Language School, 8 dilde alıştırma yapmaya yönelik ücretsiz ve etkileşimli bir eğitim platformudur.'
        ]
      },
      {
        heading: '3. Kullanıcı Hesapları ve Kabul Edilebilir Kullanım',
        paragraphs: [
          'Uygulamayı misafir olarak kullanabilir veya ilerlemenizi eşitlemek için Google/Microsoft ile oturum açabilirsiniz.'
        ],
        listItems: [
          'Veritabanı güvenlik politikalarını atlatmaya çalışmayın.',
          'Otomatik botlar veya veri madenciliği araçları kullanmayın.',
          'Başka bir kullanıcının kimliğine bürünmeyin.'
        ]
      },
      {
        heading: '4. Fikri Mülkiyet',
        paragraphs: [
          'Kaynak kod MIT Lisansı altında açık kaynaktır. Ses dosyaları ilgili hak sahiplerine aittir.'
        ]
      },
      {
        heading: '5. Garanti Reddi',
        paragraphs: [
          'Hizmet "OLDUĞU GİBİ" ve "MEVCUT OLDUĞU ŞEKİLDE" hiçbir garanti verilmeksizin sunulmaktadır.'
        ]
      },
      {
        heading: '6. Sorumluluğun Sınırlandırılması',
        paragraphs: [
          'Hizmetin kullanımından doğabilecek dolaylı zararlardan sorumluluk kabul edilmez.'
        ]
      },
      {
        heading: '7. Hizmet Değişiklikleri',
        paragraphs: [
          'Hizmet özelliklerini dilediğimiz zaman değiştirme hakkımız saklıdır.'
        ]
      }
    ],
    contactHeading: '8. İletişim Bilgileri',
    contactIntro: 'Bu Şartlarla ilgili her türlü soru için lütfen iletişime geçin:',
    footerPrompt: 'Verilerinizin nasıl işlendiği hakkında sorularınız mı var? ',
    footerLink: 'Gizlilik Politikasını Görüntüle'
  },
  ja: {
    title: '利用規約',
    lastUpdated: '最終更新日: 2026年10月',
    backToPractice: '練習に戻る',
    backToPracticeAria: '練習レッスンに戻る',
    sections: [
      {
        heading: '1. 規約への同意',
        paragraphs: [
          'Basic Language School（basiclanguage.school）を利用することにより、利用者は本利用規約に同意したものとみなされます。同意いただけない場合はアプリの利用をお控えください。'
        ]
      },
      {
        heading: '2. サービスの目的',
        paragraphs: [
          'Basic Language School は、完全無料の自習型語学教育プラットフォームです。文字、発音、数字、単語、フレーズの学習を支援します。'
        ]
      },
      {
        heading: '3. アカウントと利用規則',
        paragraphs: [
          'アカウント登録なし（ゲストモード）でも全機能をご利用いただけます。Google や Microsoft でログインすると進捗が保存されます。不正なスクレイピングや攻撃行為は禁止されています。'
        ]
      },
      {
        heading: '4. 知的財産権',
        paragraphs: [
          '本アプリケーションのコードはオープンソース（MITライセンス）として提供されます。'
        ]
      },
      {
        heading: '5. 免責事項',
        paragraphs: [
          '本サービスは「現状有姿（AS IS）」で提供され、いかなる明示または黙示の保証も行いません。'
        ]
      }
    ],
    contactHeading: 'お問い合わせ',
    contactIntro: '本規約についてのご質問は以下よりご連絡ください:',
    footerPrompt: 'プライバシーポリシーをご確認ください: ',
    footerLink: 'プライバシーポリシーを表示'
  },
  zh: {
    title: '服务条款',
    lastUpdated: '最后更新日期：2026年10月',
    backToPractice: '返回练习',
    backToPracticeAria: '返回练习课程',
    sections: [
      {
        heading: '1. 条款接受',
        paragraphs: [
          '访问或使用 Basic Language School 即表示您同意受本服务条款的约束。'
        ]
      },
      {
        heading: '2. 服务说明',
        paragraphs: [
          'Basic Language School 是一个交互式语言学习网站，为全球学习者提供免费且开放的多语言基础课程。'
        ]
      },
      {
        heading: '3. 用户行为与账户',
        paragraphs: [
          '您可以以访客身份直接体验，也可以通过 Google 或 Microsoft 登录同步进度。请勿使用自动化程序或恶意机器人滥用服务。'
        ]
      },
      {
        heading: '4. 知识产权',
        paragraphs: [
          '本平台开源代码采用 MIT 许可证发布。'
        ]
      },
      {
        heading: '5. 免责声明',
        paragraphs: [
          '本平台按"原样"（AS IS）提供，不对服务的绝对完整性或无故障运行作任何明示或暗示的保证。'
        ]
      }
    ],
    contactHeading: '联系我们',
    contactIntro: '如对本条款有任何疑问，请联系我们：',
    footerPrompt: '想了解我们如何处理数据？ ',
    footerLink: '查看隐私政策'
  },
  hi: {
    title: 'सेवा की शर्तें',
    lastUpdated: 'अंतिम अद्यतन: अक्टूबर 2026',
    backToPractice: 'अभ्यास पर वापस जाएँ',
    backToPracticeAria: 'अभ्यास पाठों पर वापस जाएँ',
    sections: [
      {
        heading: '1. शर्तों की स्वीकृति',
        paragraphs: [
          'Basic Language School का उपयोग करके, आप इन सेवा की शर्तों का पालन करने के लिए सहमत होते हैं।'
        ]
      },
      {
        heading: '2. सेवा का उद्देश्य',
        paragraphs: [
          'Basic Language School एक निःशुल्क, गैर-व्यावसायिक शैक्षिक मंच है जो भाषा सीखने वालों को मूलभूत कौशल प्रदान करता है।'
        ]
      },
      {
        heading: '3. उपयोगकर्ता आचरण',
        paragraphs: [
          'आप अतिथि के रूप में या Google / Microsoft से लॉगिन करके प्रगति सहेज सकते हैं। कृपया किसी भी बॉट या स्क्रिप्ट से सिस्टम का दुरुपयोग न करें।'
        ]
      },
      {
        heading: '4. बौद्धिक संपदा',
        paragraphs: [
          'यह प्लेटफ़ॉर्म MIT लाइसेंस के तहत ओपन-सोर्स प्रदान किया गया है।'
        ]
      },
      {
        heading: '5. अस्वीकरण',
        paragraphs: [
          'यह सेवा "जैसी है" (AS IS) आधार पर बिना किसी वारंटी के प्रदान की जाती है।'
        ]
      }
    ],
    contactHeading: 'संपर्क करें',
    contactIntro: 'यदि आपके पास इन शर्तों से संबंधित कोई प्रश्न हैं, तो हमसे संपर्क करें:',
    footerPrompt: 'गोपनीयता नीति देखना चाहते हैं? ',
    footerLink: 'गोपनीयता नीति देखें'
  },
  ko: {
    title: '이용약관',
    lastUpdated: '최종 수정일: 2026년 10월',
    backToPractice: '학습으로 돌아가기',
    backToPracticeAria: '학습 레슨으로 돌아가기',
    sections: [
      {
        heading: '1. 약관의 동의',
        paragraphs: [
          'Basic Language School(basiclanguage.school)을 이용함으로써 본 이용약관에 동의하게 됩니다. 동의하지 않으시는 경우 서비스 이용을 중단해 주시기 바랍니다.'
        ]
      },
      {
        heading: '2. 서비스 목적',
        paragraphs: [
          'Basic Language School은 누구나 무료로 외국어(글자, 발음, 숫자, 어휘, 문법)를 익힐 수 있도록 제작된 자기주도형 학습 웹 애플리케이션입니다.'
        ]
      },
      {
        heading: '3. 계정 및 준수 사항',
        paragraphs: [
          '비로그인 게스트 모드로도 이용 가능하며, Google 또는 Microsoft 계정으로 로그인하여 학습 기록을 동기화할 수 있습니다. 비정상적인 자동화 도구나 봇을 통한 악용은 금지됩니다.'
        ]
      },
      {
        heading: '4. 지식재산권',
        paragraphs: [
          '본 서비스의 코드는 MIT 라이선스 오픈소스로 제공됩니다.'
        ]
      },
      {
        heading: '5. 보증의 부인',
        paragraphs: [
          '본 서비스는 "있는 그대로(AS IS)" 제공되며, 서비스의 완전성이나 무결성을 보증하지 않습니다.'
        ]
      }
    ],
    contactHeading: '문의처',
    contactIntro: '약관에 관한 문의 사항은 아래로 문의해 주세요:',
    footerPrompt: '개인정보 처리방침이 궁금하신가요? ',
    footerLink: '개인정보 처리방침 보기'
  },
  ar: {
    title: 'شروط الخدمة',
    lastUpdated: 'آخر تحديث: أكتوبر 2026',
    backToPractice: 'العودة إلى التدريب',
    backToPracticeAria: 'العودة إلى دروس التدريب',
    sections: [
      {
        heading: '1. الموافقة على الشروط',
        paragraphs: [
          'باستخدامك لموقع Basic Language School (الموجود على basiclanguage.school)، فإنك توافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق، يُرجى عدم استخدام التطبيق.'
        ]
      },
      {
        heading: '2. الغرض من الخدمة',
        paragraphs: [
          'Basic Language School منصة تعليمية تفاعلية مجانية مصممة لمساعدة المتعلمين على ممارسة اللغات بما في ذلك الحروف والأصوات والأرقام والمفردات والقواعد الأساسية.'
        ]
      },
      {
        heading: '3. حسابات المستخدمين والاستخدام المقبول',
        paragraphs: [
          'يمكنك استخدام المنصة كضيف أو تسجيل الدخول عبر Google أو Microsoft لحفظ تقدمك. يُحظر تماماً استخدام برامج الروبوت أو الأدوات الآلية لإساءة استخدام النظام أو واجهات الصوت.'
        ]
      },
      {
        heading: '4. الملكية الفكرية',
        paragraphs: [
          'يتم توفير هذا المشروع مفتوح المصدر تحت ترخيص MIT.'
        ]
      },
      {
        heading: '5. إخلاء المسؤولية',
        paragraphs: [
          'يتم توفير الخدمة "كما هي" دون أي ضمانات من أي نوع.'
        ]
      }
    ],
    contactHeading: 'اتصل بنا',
    contactIntro: 'إذا كانت لديك أي أسئلة حول شروط الخدمة، يمكنك التواصل معنا عبر:',
    footerPrompt: 'هل تبحث عن سياسة الخصوصية؟ ',
    footerLink: 'عرض سياسة الخصوصية'
  }
};

export const PRIVACY_TRANSLATIONS: Record<SupportedLanguageId, LegalContent> = {
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last Updated: October 16, 2026',
    backToPractice: 'Back to Practice',
    backToPracticeAria: 'Back to practice lessons',
    summaryTitle: 'Plain English Summary',
    summaryText: 'We believe in privacy by default. Basic Language School is an educational platform. We only collect the minimal information needed to save your quiz progress and learning stats across our 8 language courses. We never sell your data, we do not run third-party advertising trackers, and you can delete your data at any time.',
    sections: [
      {
        heading: '1. Information We Collect',
        paragraphs: [
          'We collect information in two ways:'
        ],
        listItems: [
          'Guest Users (Unauthenticated): If you use the app without logging in, your quiz scores and word practice history are stored exclusively in your local browser’s localStorage. No personal identification is collected or transmitted to our servers.',
          'Registered Users (Authenticated via Google or Microsoft): If you choose to sign in to sync progress across devices, we receive basic authentication details (email address, display name, and avatar URL if provided).',
          'Learning Data: Quiz session scores, accuracy rates, and spaced-repetition performance for practice vocabulary.'
        ]
      },
      {
        heading: '2. How We Use Your Information',
        paragraphs: [
          'Your information is used strictly to provide and improve your language learning experience: saving quiz scores, tracking vocabulary mastery, and securing your cross-device sync.',
          'We do not sell, rent, monetize, or trade your personal data with any third parties or advertisers.'
        ]
      },
      {
        heading: '3. Data Storage & Security',
        paragraphs: [
          'Your data is stored in a secure cloud PostgreSQL database managed via Supabase with Row Level Security (RLS) policies and HTTPS/TLS encryption in transit. We never handle or store your account passwords.'
        ]
      },
      {
        heading: '4. Your Rights & Data Deletion (GDPR & CCPA)',
        paragraphs: [
          'You have full control over your personal data. You may view your data in the "My Stats" dashboard or request permanent deletion by emailing dev@basiclanguage.school (purged within 14 business days).'
        ]
      },
      {
        heading: '5. Third-Party Services',
        paragraphs: [
          'We work with trusted infrastructure providers: Google Identity & Microsoft Entra ID (authentication), Supabase (database), and Netlify (static hosting).'
        ]
      },
      {
        heading: '6. Children’s Privacy',
        paragraphs: [
          'We do not knowingly collect personal data from children under the age of 13. If you believe a child has provided personal information, please contact us for immediate removal.'
        ]
      },
      {
        heading: '7. Changes to This Policy',
        paragraphs: [
          'We may update this Privacy Policy from time to time. Any updates will be posted here with a revised "Last Updated" date.'
        ]
      }
    ],
    contactHeading: '8. Contact Us',
    contactIntro: 'If you have any questions or requests regarding your privacy, please contact:',
    footerPrompt: 'Looking for our terms? ',
    footerLink: 'View Terms of Service'
  },
  es: {
    title: 'Política de Privacidad',
    lastUpdated: 'Última actualización: 16 de octubre de 2026',
    backToPractice: 'Volver a la Práctica',
    backToPracticeAria: 'Volver a las lecciones de práctica',
    summaryTitle: 'Resumen Claro',
    summaryText: 'Creemos en la privacidad por defecto. Basic Language School es una plataforma educativa. Solo recopilamos la información mínima necesaria para guardar tu progreso en los 8 cursos de idiomas. Nunca vendemos tus datos, no usamos rastreadores publicitarios y puedes borrar tus datos en cualquier momento.',
    sections: [
      {
        heading: '1. Información que Recopilamos',
        paragraphs: [
          'Recopilamos información de dos maneras:'
        ],
        listItems: [
          'Usuarios Invitados: Si usas la app sin iniciar sesión, tu progreso se guarda exclusivamente en el almacenamiento local de tu navegador (localStorage). No se recopila información personal.',
          'Usuarios Registrados (Google o Microsoft): Al iniciar sesión para sincronizar, recibimos únicamente tu correo electrónico, nombre para mostrar y avatar.',
          'Datos de Aprendizaje: Puntuaciones de exámenes, precisión y nivel de dominio de palabras.'
        ]
      },
      {
        heading: '2. Cómo Usamos tu Información',
        paragraphs: [
          'Usamos tus datos únicamente para proporcionarte tu experiencia de estudio: guardar rachas, calcular el dominio de palabras y sincronizar tu sesión entre dispositivos.',
          'Nunca vendemos, alquilamos ni compartimos tus datos personales con terceros o anunciantes.'
        ]
      },
      {
        heading: '3. Almacenamiento y Seguridad de Datos',
        paragraphs: [
          'Tus datos se almacenan en una base de datos segura PostgreSQL gestionada mediante Supabase, con cifrado TLS y políticas estrictas de seguridad por fila (RLS). No almacenamos contraseñas.'
        ]
      },
      {
        heading: '4. Tus Derechos y Eliminación de Datos (RGPD y CCPA)',
        paragraphs: [
          'Tienes derecho a ver tus estadísticas en el panel "Mi Progreso" o solicitar la eliminación permanente de tu cuenta y datos escribiendo a dev@basiclanguage.school.'
        ]
      },
      {
        heading: '5. Proveedores de Infraestructura',
        paragraphs: [
          'Colaboramos con proveedores confiables: Google Identity y Microsoft Entra ID (autenticación), Supabase (base de datos) y Netlify (alojamiento).'
        ]
      },
      {
        heading: '6. Privacidad de Menores',
        paragraphs: [
          'No recopilamos conscientemente datos de menores de 13 años. Contáctanos si crees que un menor nos ha proporcionado datos.'
        ]
      },
      {
        heading: '7. Cambios en esta Política',
        paragraphs: [
          'Podemos actualizar esta política ocasionalmente para reflejar mejoras en la plataforma.'
        ]
      }
    ],
    contactHeading: '8. Contáctanos',
    contactIntro: 'Para cualquier duda o solicitud relacionada con tu privacidad, contáctanos:',
    footerPrompt: '¿Buscas nuestros términos de servicio? ',
    footerLink: 'Ver Términos de Servicio'
  },
  fr: {
    title: 'Politique de confidentialité',
    lastUpdated: 'Dernière mise à jour : 16 octobre 2026',
    backToPractice: 'Retour à la pratique',
    backToPracticeAria: 'Retour aux leçons de pratique',
    summaryTitle: 'Résumé en clair',
    summaryText: "Nous respectons votre vie privée. Basic Language School ne collecte que les informations strictement nécessaires à la sauvegarde de vos progrès d'apprentissage. Nous ne vendons jamais vos données et n'utilisons aucun traceur publicitaire.",
    sections: [
      {
        heading: '1. Informations collectées',
        paragraphs: [
          'Nous collectons des informations selon deux modes :'
        ],
        listItems: [
          'Utilisateurs invités : données stockées exclusivement dans le navigateur local (localStorage).',
          'Utilisateurs connectés (Google/Microsoft) : adresse e-mail, nom et photo de profil.',
          "Données d'apprentissage : scores aux quiz et maîtrise du vocabulaire."
        ]
      },
      {
        heading: '2. Utilisation des informations',
        paragraphs: [
          "Vos données sont utilisées exclusivement pour vous offrir le suivi de votre apprentissage linguistique. Nous ne vendons aucune donnée personnelle à des tiers."
        ]
      },
      {
        heading: '3. Sécurité des données',
        paragraphs: [
          'Données hébergées sur Supabase PostgreSQL avec chiffrement TLS et sécurité au niveau des lignes (RLS).'
        ]
      },
      {
        heading: '4. Vos droits (RGPD)',
        paragraphs: [
          'Vous disposez d’un droit d’accès et de suppression complète de vos données sur simple demande par e-mail à dev@basiclanguage.school.'
        ]
      },
      {
        heading: '5. Services tiers',
        paragraphs: [
          'Google Identity, Microsoft Entra ID, Supabase et Netlify.'
        ]
      },
      {
        heading: '6. Protection des mineurs',
        paragraphs: [
          'Nous ne collectons pas sciemment de données auprès d’enfants de moins de 13 ans.'
        ]
      },
      {
        heading: '7. Mises à jour de la politique',
        paragraphs: [
          'Toute mise à jour sera publiée sur cette page.'
        ]
      }
    ],
    contactHeading: '8. Contact',
    contactIntro: 'Pour toute question relative à votre confidentialité :',
    footerPrompt: 'Vous cherchez nos conditions d’utilisation ? ',
    footerLink: "Voir les Conditions d'utilisation"
  },
  ru: {
    title: 'Политика конфиденциальности',
    lastUpdated: 'Последнее обновление: 16 октября 2026 г.',
    backToPractice: 'Вернуться к урокам',
    backToPracticeAria: 'Вернуться к урокам практики',
    summaryTitle: 'Краткое резюме',
    summaryText: 'Мы уважаем вашу конфиденциальность. Basic Language School — образовательный проект. Мы собираем только минимальные данные, необходимые для синхронизации вашего прогресса в тестах по 8 языкам. Мы никогда не продаём ваши данные, не размещаем рекламные трекеры и позволяем удалить данные в любой момент.',
    sections: [
      {
        heading: '1. Собираемая информация',
        paragraphs: [
          'Мы собираем данные двумя путями:'
        ],
        listItems: [
          'Гостевой режим: статистика тестов хранится исключительно локально в браузере (localStorage). Персональные данные не передаются на сервер.',
          'Авторизованные пользователи (Google / Microsoft): адрес электронной почты, отображаемое имя и аватар профиля.',
          'Учебные данные: баллы за тесты, процент точности и уровень освоения слов.'
        ]
      },
      {
        heading: '2. Как мы используем информацию',
        paragraphs: [
          'Данные используются строго для сохранения ваших учебных сессий, вычисления освоенных слов и синхронизации между устройствами.',
          'Мы не продаём и не передаём персональные данные третьим лицам или рекламодателям.'
        ]
      },
      {
        heading: '3. Хранение и безопасность данных',
        paragraphs: [
          'Данные хранятся в защищённой базе данных PostgreSQL под управлением Supabase с шифрованием TLS и политиками разграничения доступа на уровне строк (RLS). Мы не храним ваши пароли.'
        ]
      },
      {
        heading: '4. Ваши права и удаление данных (GDPR)',
        paragraphs: [
          'Вы можете в любой момент просмотреть свою статистику или запросить полное удаление учётной записи и истории тестов, написав на dev@basiclanguage.school.'
        ]
      },
      {
        heading: '5. Сторонние сервисы',
        paragraphs: [
          'Google Identity и Microsoft Entra ID (авторизация), Supabase (база данных), Netlify (хостинг).'
        ]
      },
      {
        heading: '6. Конфиденциальность детей',
        paragraphs: [
          'Платформа не собирает персональные данные детей младше 13 лет.'
        ]
      },
      {
        heading: '7. Изменения политики',
        paragraphs: [
          'Любые обновления политики будут опубликованы на этой странице с указанием новой даты.'
        ]
      }
    ],
    contactHeading: '8. Связь с нами',
    contactIntro: 'По любым вопросам конфиденциальности обращайтесь:',
    footerPrompt: 'Ищете условия использования? ',
    footerLink: 'Условия использования'
  },
  pt: {
    title: 'Política de Privacidade',
    lastUpdated: 'Última atualização: 16 de outubro de 2026',
    backToPractice: 'Voltar à Prática',
    backToPracticeAria: 'Voltar às lições de prática',
    summaryTitle: 'Resumo em Linguagem Simples',
    summaryText: 'Privacidade em primeiro lugar. Coletamos apenas as informações mínimas necessárias para salvar seu progresso nos 8 cursos de idiomas. Nunca vendemos seus dados e não usamos rastreadores de anúncios.',
    sections: [
      {
        heading: '1. Informações que Coletamos',
        paragraphs: [
          'Coletamos informações de duas formas:'
        ],
        listItems: [
          'Modo Convidado: salvo exclusivamente no armazenamento local do navegador (localStorage).',
          'Usuários Conectados (Google/Microsoft): e-mail, nome de exibição e avatar.',
          'Dados de Estudo: pontuações em quizzes e histórico de repetição espaçada.'
        ]
      },
      {
        heading: '2. Como Usamos seus Dados',
        paragraphs: [
          'Apenas para sincronizar e aprimorar sua experiência de aprendizado.'
        ]
      },
      {
        heading: '3. Armazenamento e Segurança',
        paragraphs: [
          'Banco de dados PostgreSQL seguro no Supabase com criptografia TLS e Row Level Security (RLS).'
        ]
      },
      {
        heading: '4. Seus Direitos e Exclusão de Dados',
        paragraphs: [
          'Você pode solicitar a exclusão definitiva dos seus dados enviando um e-mail para dev@basiclanguage.school.'
        ]
      },
      {
        heading: '5. Serviços de Terceiros',
        paragraphs: [
          'Google, Microsoft, Supabase e Netlify.'
        ]
      },
      {
        heading: '6. Privacidade Infantil',
        paragraphs: [
          'Não coletamos intencionalmente dados de menores de 13 anos.'
        ]
      },
      {
        heading: '7. Alterações nesta Política',
        paragraphs: [
          'Atualizações serão publicadas nesta página com data revisada.'
        ]
      }
    ],
    contactHeading: '8. Fale Conosco',
    contactIntro: 'Para qualquer dúvida sobre sua privacidade:',
    footerPrompt: 'Procurando nossos termos? ',
    footerLink: 'Ver Termos de Serviço'
  },
  de: {
    title: 'Datenschutzerklärung',
    lastUpdated: 'Zuletzt aktualisiert: 16. Oktober 2026',
    backToPractice: 'Zurück zur Übung',
    backToPracticeAria: 'Zurück zu den Übungslektionen',
    summaryTitle: 'Kurzfassung',
    summaryText: 'Datenschutz steht bei uns an erster Stelle. Wir erfassen nur das Minimum an Daten, um Ihren Lernfortschritt in den 8 Sprachkursen zu speichern. Wir verkaufen niemals Ihre Daten und setzen keine Werbe-Tracker ein.',
    sections: [
      {
        heading: '1. Erfasste Informationen',
        paragraphs: [
          'Wir erfassen Daten auf zwei Wegen:'
        ],
        listItems: [
          'Gast-Nutzer: Daten verbleiben ausschließlich im lokalen Browserspeicher (localStorage).',
          'Registrierte Nutzer (Google/Microsoft): E-Mail-Adresse, Name und Profilbild.',
          'Lerndaten: Testergebnisse, Genauigkeitsraten und Vokabelbeherrschung.'
        ]
      },
      {
        heading: '2. Nutzung Ihrer Daten',
        paragraphs: [
          'Ausschließlich zur Bereitstellung und Sicherung Ihres personalisierten Lernerlebnisses.'
        ]
      },
      {
        heading: '3. Speicherung und Sicherheit',
        paragraphs: [
          'Sichere PostgreSQL-Datenbank auf Supabase mit TLS-Verschlüsselung und Row Level Security (RLS).'
        ]
      },
      {
        heading: '4. Ihre Rechte (DSGVO)',
        paragraphs: [
          'Sie haben das Recht auf Auskunft und vollständige Löschung Ihrer Daten per E-Mail an dev@basiclanguage.school.'
        ]
      },
      {
        heading: '5. Drittanbieter-Dienste',
        paragraphs: [
          'Google Identity, Microsoft Entra ID, Supabase und Netlify.'
        ]
      },
      {
        heading: '6. Schutz von Minderjährigen',
        paragraphs: [
          'Wir erfassen wissentlich keine Daten von Kindern unter 13 Jahren.'
        ]
      },
      {
        heading: '7. Änderungen dieser Erklärung',
        paragraphs: [
          'Änderungen werden hier mit aktualisiertem Datum veröffentlicht.'
        ]
      }
    ],
    contactHeading: '8. Kontakt',
    contactIntro: 'Bei Fragen zum Datenschutz kontaktieren Sie bitte:',
    footerPrompt: 'Suchen Sie unsere Nutzungsbedingungen? ',
    footerLink: 'Nutzungsbedingungen ansehen'
  },
  id: {
    title: 'Kebijakan Privasi',
    lastUpdated: 'Terakhir Diperbarui: 16 Oktober 2026',
    backToPractice: 'Kembali ke Latihan',
    backToPracticeAria: 'Kembali ke pelajaran latihan',
    summaryTitle: 'Ringkasan Singkat',
    summaryText: 'Kami mengutamakan privasi Anda. Basic Language School hanya mengumpulkan data minimal untuk menyimpan kemajuan kuis dan statistik belajar Anda di 8 bahasa. Kami tidak pernah menjual data Anda dan tidak menggunakan pelacak iklan pihak ketiga.',
    sections: [
      {
        heading: '1. Informasi yang Kami Kumpulkan',
        paragraphs: [
          'Kami mengumpulkan informasi dalam dua cara:'
        ],
        listItems: [
          'Pengguna Tamu: riwayat latihan tersimpan secara lokal di browser Anda (localStorage). Tidak ada data pribadi yang dikirim ke server.',
          'Pengguna Terdaftar (Google/Microsoft): alamat email, nama tampilan, dan avatar.',
          'Data Pembelajaran: skor kuis, tingkat akurasi, dan penguasaan kata.'
        ]
      },
      {
        heading: '2. Bagaimana Kami Menggunakan Informasi Anda',
        paragraphs: [
          'Informasi Anda hanya digunakan untuk menyediakan sinkronisasi belajar antardiskon dan melacak penguasaan kosakata.'
        ]
      },
      {
        heading: '3. Penyimpanan Data & Keamanan',
        paragraphs: [
          'Data disimpan di basis data PostgreSQL aman yang dikelola Supabase dengan enkripsi TLS dan Row Level Security (RLS).'
        ]
      },
      {
        heading: '4. Hak Anda & Penghapusan Data',
        paragraphs: [
          'Anda dapat melihat statistik Anda kapan saja atau meminta penghapusan permanen akun Anda dengan mengirim email ke dev@basiclanguage.school.'
        ]
      },
      {
        heading: '5. Layanan Pihak Ketiga',
        paragraphs: [
          'Google Identity, Microsoft Entra ID, Supabase, dan Netlify.'
        ]
      },
      {
        heading: '6. Privasi Anak-Anak',
        paragraphs: [
          'Kami tidak secara sengaja mengumpulkan data dari anak-anak di bawah usia 13 tahun.'
        ]
      },
      {
        heading: '7. Perubahan Kebijakan Ini',
        paragraphs: [
          'Pembaruan kebijakan akan dipublikasikan di halaman ini.'
        ]
      }
    ],
    contactHeading: '8. Hubungi Kami',
    contactIntro: 'Untuk pertanyaan terkait privasi Anda, silakan hubungi:',
    footerPrompt: 'Mencari ketentuan layanan kami? ',
    footerLink: 'Lihat Ketentuan Layanan'
  },
  tr: {
    title: 'Gizlilik Politikası',
    lastUpdated: 'Son Güncelleme: 16 Ekim 2026',
    backToPractice: 'Alıştırmaya Dön',
    backToPracticeAria: 'Alıştırma derslerine geri dön',
    summaryTitle: 'Açık Özet',
    summaryText: 'Gizliliğinize saygı duyuyoruz. Basic Language School bir eğitim platformudur. Yalnızca 8 dildeki sınav ilerlemenizi ve öğrenme istatistiklerinizi kaydetmek için gereken asgari bilgileri topluyoruz. Verilerinizi asla satmıyoruz ve reklam izleyicileri kullanmıyoruz.',
    sections: [
      {
        heading: '1. Topladığımız Bilgiler',
        paragraphs: [
          'Bilgileri iki şekilde topluyoruz:'
        ],
        listItems: [
          'Misafir Kullanıcılar: veriler yalnızca tarayıcınızın yerel depolama alanında (localStorage) saklanır. Sunucularımıza kişisel veri iletilmez.',
          'Kayıtlı Kullanıcılar (Google/Microsoft): e-posta adresi, görünen ad ve profil resmi.',
          'Öğrenim Verileri: test puanları, doğruluk oranları ve kelime ustalık seviyesi.'
        ]
      },
      {
        heading: '2. Bilgilerinizi Nasıl Kullanıyoruz',
        paragraphs: [
          'Verileriniz yalnızca cihazlar arası senkronizasyon ve öğrenme takibi amacıyla kullanılır. Veriler asla üçüncü şahıslara veya reklamcılara satılmaz.'
        ]
      },
      {
        heading: '3. Veri Güvenliği',
        paragraphs: [
          'Veriler Supabase PostgreSQL üzerinde TLS şifrelemesi ve Satır Düzeyinde Güvenlik (RLS) ile korunmaktadır.'
        ]
      },
      {
        heading: '4. Haklarınız ve Veri Silme (KVKK & GDPR)',
        paragraphs: [
          'Verilerinizi "İstatistiklerim" panelinden görebilir veya kalıcı silme talebi için dev@basiclanguage.school adresine yazabilirsiniz.'
        ]
      },
      {
        heading: '5. Üçüncü Taraf Hizmetleri',
        paragraphs: [
          'Google Identity, Microsoft Entra ID, Supabase ve Netlify.'
        ]
      },
      {
        heading: '6. Çocukların Gizliliği',
        paragraphs: [
          '13 yaşın altındaki çocuklardan bilerek kişisel veri toplamıyoruz.'
        ]
      },
      {
        heading: '7. Politika Değişiklikleri',
        paragraphs: [
          'Güncellemeler revize edilmiş tarihle bu sayfada yayınlanacaktır.'
        ]
      }
    ],
    contactHeading: '8. Bize Ulaşın',
    contactIntro: 'Gizlilikle ilgili tüm sorularınız için lütfen iletişime geçin:',
    footerPrompt: 'Hizmet şartlarımızı mı arıyorsunuz? ',
    footerLink: 'Hizmet Şartlarını Görüntüle'
  },
  ja: {
    title: 'プライバシーポリシー',
    lastUpdated: '最終更新日: 2026年10月',
    backToPractice: '練習に戻る',
    backToPracticeAria: '練習レッスンに戻る',
    summaryTitle: 'プライバシーの要約',
    summaryText: 'Basic Language School は教育プラットフォームであり、利用者のプライバシーを尊重します。広告トラッカーはなく、データの第三者への販売も行いません。',
    sections: [
      {
        heading: '1. 収集する情報',
        paragraphs: [
          'ゲスト利用の場合、学習データはお使いの端末のブラウザ内（localStorage）にのみ保存されます。ログインした場合は、端末間同期のためにメールアドレスと学習進捗のみがクラウドに保存されます。'
        ]
      },
      {
        heading: '2. データの利用目的',
        paragraphs: [
          '学習進捗の保存、クイズの成績管理、機能改善のためにのみ使用されます。'
        ]
      },
      {
        heading: '3. データの安全性',
        paragraphs: [
          'すべての通信は暗号化（TLS）され、セキュアに管理されています。'
        ]
      }
    ],
    contactHeading: 'お問い合わせ',
    contactIntro: 'プライバシーに関するお問い合わせは以下までお願いいたします:',
    footerPrompt: '利用規約はこちら: ',
    footerLink: '利用規約を表示'
  },
  zh: {
    title: '隐私政策',
    lastUpdated: '最后更新日期：2026年10月',
    backToPractice: '返回练习',
    backToPracticeAria: '返回练习课程',
    summaryTitle: '简要说明',
    summaryText: '我们坚持默认保护隐私原则。Basic Language School 是一个教育学习平台。我们仅收集保存您的测验得分和学习进度所需的最基本信息。我们绝不出售您的数据，不投放任何第三方跟踪广告，您可以随时重置并删除本地数据。',
    sections: [
      {
        heading: '1. 我们收集的信息',
        paragraphs: [
          '我们通过两种方式处理学习数据：'
        ],
        listItems: [
          '访客用户（未登录）：若您直接使用应用，您的测验得分与打卡记录仅保存在您本地浏览器的 localStorage 中，不向任何外部服务器上传。',
          '注册用户（Google 或 Microsoft 登录）：若您选择登录跨设备同步，我们仅接收最基本的账户标识（邮箱与昵称）。',
          '学习记录：测验得分、掌握词汇数量与间隔复习表现。'
        ]
      },
      {
        heading: '2. 数据的存储与保护',
        paragraphs: [
          '所有数据传输均经过现代 TLS/HTTPS 加密保护。'
        ]
      },
      {
        heading: '3. 您的权利',
        paragraphs: [
          '您可以随时通过学习面板一键清除所有本地学习数据。'
        ]
      }
    ],
    contactHeading: '隐私咨询',
    contactIntro: '如对隐私保护有任何疑问，请联系我们：',
    footerPrompt: '想查看服务条款？ ',
    footerLink: '查看服务条款'
  },
  hi: {
    title: 'गोपनीयता नीति',
    lastUpdated: 'अंतिम अद्यतन: अक्टूबर 2026',
    backToPractice: 'अभ्यास पर वापस जाएँ',
    backToPracticeAria: 'अभ्यास पाठों पर वापस जाएँ',
    summaryTitle: 'गोपनीयता सिद्धांत',
    summaryText: 'हम डिफ़ॉल्ट रूप से गोपनीयता का सम्मान करते हैं। Basic Language School एक शैक्षिक मंच है। हम केवल आपकी सीखने की प्रगति और स्कोर को ट्रैक करने के लिए आवश्यक न्यूनतम डेटा एकत्र करते हैं। कोई विज्ञापन नहीं, कोई डेटा बिक्री नहीं।',
    sections: [
      {
        heading: '1. हमारे द्वारा एकत्रित जानकारी',
        paragraphs: [
          'हम सीखने के डेटा को दो तरीकों से संभालते हैं:'
        ],
        listItems: [
          'अतिथि उपयोगकर्ता: यदि आप बिना लॉगिन के अभ्यास करते हैं, तो डेटा केवल आपके ब्राउज़र के localStorage में रहता है।',
          'लॉगिन उपयोगकर्ता: उपकरणों के बीच प्रगति सिंक करने के लिए आपका ईमेल और स्कोर सुरक्षित रूप से सहेजा जाता है।',
          'सीखने के आँकड़े: क्विज़ स्कोर और अंतराल पुनरावृत्ति रिकॉर्ड।'
        ]
      },
      {
        heading: '2. डेटा सुरक्षा',
        paragraphs: [
          'सभी डेटा आधुनिक TLS/HTTPS एन्क्रिप्शन द्वारा सुरक्षित हैं।'
        ]
      },
      {
        heading: '3. आपके अधिकार',
        paragraphs: [
          'आप डैशबोर्ड से किसी भी समय अपने सभी आँकड़े और स्थानीय डेटा को रीसेट या हटा सकते हैं।'
        ]
      }
    ],
    contactHeading: 'गोपनीयता पूछताछ',
    contactIntro: 'यदि आपके पास गोपनीयता से संबंधित कोई प्रश्न हैं, तो हमसे संपर्क करें:',
    footerPrompt: 'सेवा की शर्तें देखना चाहते हैं? ',
    footerLink: 'सेवा की शर्तें देखें'
  },
  ko: {
    title: '개인정보 처리방침',
    lastUpdated: '최종 수정일: 2026년 10월',
    backToPractice: '학습으로 돌아가기',
    backToPracticeAria: '학습 레슨으로 돌아가기',
    summaryTitle: '개인정보 보호 원칙',
    summaryText: 'Basic Language School은 이용자의 개인정보를 소중히 다룹니다. 광고 트래커나 제3자 데이터 판매가 없으며, 학습 진도 관리에 필요한 최소한의 정보만 사용합니다.',
    sections: [
      {
        heading: '1. 수집하는 정보',
        paragraphs: [
          '비로그인 이용 시 모든 학습 데이터는 기기 로컬(localStorage)에만 저장됩니다. 로그인 시 기기 간 동기화를 위해 계정 이메일과 퀴즈 점수만 보관됩니다.'
        ]
      },
      {
        heading: '2. 정보의 이용 목적',
        paragraphs: [
          '단어 및 표현 복습 일정 관리와 학습 통계 제공 목적으로만 활용됩니다.'
        ]
      },
      {
        heading: '3. 데이터 보안',
        paragraphs: [
          '모든 데이터 전송은 최신 암호화 프로토콜(TLS)을 통해 안전하게 보호됩니다.'
        ]
      }
    ],
    contactHeading: '문의처',
    contactIntro: '개인정보 보호 관련 문의 사항은 아래로 문의해 주시기 바랍니다:',
    footerPrompt: '이용약관이 궁금하신가요? ',
    footerLink: '이용약관 보기'
  },
  ar: {
    title: 'سياسة الخصوصية',
    lastUpdated: 'آخر تحديث: أكتوبر 2026',
    backToPractice: 'العودة إلى التدريب',
    backToPracticeAria: 'العودة إلى دروس التدريب',
    summaryTitle: 'ملخص الخصوصية',
    summaryText: 'نحن نؤمن بالخصوصية كأولوية قصوى. لا نقوم ببيع بياناتك الشخصية ولا نستخدم أدوات تعقب تابعة لجهات خارجية، ونجمع فقط الحد الأدنى من المعلومات اللازمة لحفظ تقدمك التعليمي.',
    sections: [
      {
        heading: '1. المعلومات التي نجمعها',
        paragraphs: [
          'في وضع الضيف، تُخزن درجات الاختبارات ومفردات التدريب محلياً فقط في متصفحك (localStorage). عند تسجيل الدخول الاختياري، نحتفظ فقط ببيانات الحساب الأساسية لمزامنة تقدمك عبر أجهزتك.'
        ]
      },
      {
        heading: '2. كيفية استخدام المعلومات',
        paragraphs: [
          'تُستخدم المعلومات فقط لتقديم تجربة تعلم اللغة وتحسينها وتتبع إتقان المفردات ومزامنة الدرجات.'
        ]
      },
      {
        heading: '3. أمان البيانات',
        paragraphs: [
          'يتم نقل وتخزين جميع البيانات باستخدام بروتوكولات التشفير الحديثة (HTTPS/TLS) لضمان حماية بياناتك.'
        ]
      }
    ],
    contactHeading: 'استفسارات الخصوصية',
    contactIntro: 'إذا كانت لديك أي استفسارات بخصوص الخصوصية، يسعدنا تواصلك معنا:',
    footerPrompt: 'هل تبحث عن شروط الخدمة؟ ',
    footerLink: 'عرض شروط الخدمة'
  }
};
