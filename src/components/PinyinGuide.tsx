import React, { useState } from 'react';
import { FaChevronDown, FaLightbulb, FaKeyboard } from 'react-icons/fa';
import PronunciationButton from './PronunciationButton';
import { SupportedLanguageId } from '../data/languages/types';

interface PinyinGuideProps {
  baseLanguage: SupportedLanguageId;
}

interface ToneCard {
  toneNumber: number;
  toneName: string;
  mark: string;
  contour: 'high-flat' | 'rising' | 'dipping' | 'falling' | 'neutral';
  pitchDescription: string;
  pinyin: string;
  hanzi: string;
  translation: string;
  sampleDescription: string;
}

export const PinyinGuide: React.FC<PinyinGuideProps> = ({ baseLanguage }) => {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('basic_pinyin_guide_open');
      return saved !== 'false';
    } catch {
      return true;
    }
  });

  const [activeTab, setActiveTab] = useState<'tones' | 'anatomy' | 'typing'>('tones');

  const toggleOpen = () => {
    setIsOpen(prev => {
      const next = !prev;
      try {
        localStorage.setItem('basic_pinyin_guide_open', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Localized text dictionary for base languages
  const text = React.useMemo(() => {
    switch (baseLanguage) {
      case 'ru':
        return {
          badge: 'Гид по фонетике',
          title: 'Как устроен пиньинь и тоны',
          subtitle: 'Мост от латинских букв к китайским иероглифам (汉字)',
          toggleShow: 'Показать гид по пиньиню',
          toggleHide: 'Скрыть гид',
          tabTones: '4 тона и нейтральный',
          tabAnatomy: 'Формула слога',
          tabTyping: 'Как печатать иероглифы',
          toneHeader: 'В китайском языке тон полностью меняет значение слова:',
          formulaTitle: 'Анатомия китайского слога',
          formulaDesc: 'Каждый произносимый слог в путунхуа строится по строгой формуле:',
          typingTitle: 'От латинских букв к китайским иероглифам',
          typingDesc: 'На смартфонах и компьютерах китайский язык печатают с помощью стандартной клавиатуры:',
          homophoneTitle: 'Зачем нужны иероглифы, если есть пиньинь?',
          homophoneDesc: 'В китайском языке огромное количество омофонов — слов с одинаковым звучанием. Например, слог «shì» может означать «быть» (是), «дело» (事), «город» (市) или «комната» (室). Иероглифы устраняют путаницу и передают точный смысл, а пиньинь служит проводником к их произношению.'
        };
      case 'es':
        return {
          badge: 'Guía de fonética',
          title: 'Cómo funciona el Pinyin y los Tonos',
          subtitle: 'El puente de las letras latinas a los caracteres chinos (汉字)',
          toggleShow: 'Mostrar guía de Pinyin',
          toggleHide: 'Ocultar guía',
          tabTones: 'Los 4 Tonos y Neutro',
          tabAnatomy: 'Fórmula de la Sílaba',
          tabTyping: 'Cómo escribir Hanzi',
          toneHeader: 'En mandarín, el tono cambia totalmente el significado de la palabra:',
          formulaTitle: 'Anatomía de una sílaba en chino',
          formulaDesc: 'Cada sílaba hablada se forma siguiendo una fórmula estricta:',
          typingTitle: 'De letras latinas a caracteres chinos',
          typingDesc: 'En teléfonos y computadoras, el chino se escribe con un teclado latino estándar:',
          homophoneTitle: '¿Por qué necesitamos caracteres si tenemos Pinyin?',
          homophoneDesc: 'El chino tiene numerosos homófonos (palabras que suenan idéntico). Por ejemplo, «shì» puede significar «ser» (是), «asunto» (事), «ciudad» (市) o «habitación» (室). Los caracteres eliminan la ambigüedad, mientras que el pinyin guía la pronunciación.'
        };
      case 'fr':
        return {
          badge: 'Guide phonétique',
          title: 'Comment fonctionnent le Pinyin et les Tons',
          subtitle: 'Le pont entre les lettres latines et les caractères chinois (汉字)',
          toggleShow: 'Afficher le guide Pinyin',
          toggleHide: 'Masquer le guide',
          tabTones: 'Les 4 Tons et Neutre',
          tabAnatomy: 'Formule de la syllabe',
          tabTyping: 'Comment taper les Hanzi',
          toneHeader: 'En mandarin, le ton change complètement le sens du mot :',
          formulaTitle: 'Anatomie d\'une syllabe chinoise',
          formulaDesc: 'Chaque syllabe parlée est construite selon une formule stricte :',
          typingTitle: 'Des lettres latines aux caractères chinois',
          typingDesc: 'Sur téléphones et ordinateurs, le chinois se tape avec un clavier latin standard :',
          homophoneTitle: 'Pourquoi des caractères si le Pinyin existe ?',
          homophoneDesc: 'Le chinois compte de très nombreux homophones. Par exemple, « shì » peut signifier « être » (是), « affaire » (事), « ville » (市) ou « pièce » (室). Les caractères éliminent toute ambiguïté, tandis que le pinyin guide la prononciation.'
        };
      case 'de':
        return {
          badge: 'Phonetischer Leitfaden',
          title: 'Wie Pinyin und Töne funktionieren',
          subtitle: 'Die Brücke von lateinischen Buchstaben zu chinesischen Schriftzeichen (汉字)',
          toggleShow: 'Pinyin-Leitfaden anzeigen',
          toggleHide: 'Leitfaden ausblenden',
          tabTones: 'Die 4 Töne & Neutral',
          tabAnatomy: 'Silben-Formel',
          tabTyping: 'Hanzi tippen',
          toneHeader: 'Im Mandarin verändert der Ton die Wortbedeutung vollständig:',
          formulaTitle: 'Aufbau einer chinesischen Silbe',
          formulaDesc: 'Jede Silbe setzt sich nach einer klaren Regel zusammen:',
          typingTitle: 'Von lateinischen Buchstaben zu Schriftzeichen',
          typingDesc: 'Auf Tastaturen wird Chinesisch über die normale lateinische Tastatur getippt:',
          homophoneTitle: 'Warum gibt es Schriftzeichen trotz Pinyin?',
          homophoneDesc: 'Mandarin hat viele Homophone (gleichklingende Wörter). Die Silbe «shì» kann z. B. «sein» (是), «Angelegenheit» (事), «Stadt» (市) oder «Zimmer» (室) bedeuten. Schriftzeichen schaffen Klarheit, während Pinyin die Aussprache zeigt.'
        };
      case 'pt':
        return {
          badge: 'Guia Fonético',
          title: 'Como funcionam o Pinyin e os Tons',
          subtitle: 'A ponte das letras latinas aos caracteres chineses (汉字)',
          toggleShow: 'Mostrar guia de Pinyin',
          toggleHide: 'Ocultar guia',
          tabTones: 'Os 4 Tons e Neutro',
          tabAnatomy: 'Estrutura da Sílaba',
          tabTyping: 'Como digitar Hanzi',
          toneHeader: 'No mandarim, o tom muda completamente o significado da palavra:',
          formulaTitle: 'Anatomia de uma sílaba em mandarim',
          formulaDesc: 'Cada sílaba falada segue uma fórmula de três partes:',
          typingTitle: 'De letras latinas a caracteres chineses',
          typingDesc: 'Em celulares e computadores, digita-se chinês com o teclado padrão:',
          homophoneTitle: 'Por que os caracteres (Hanzi) ainda importam?',
          homophoneDesc: 'O mandarim possui muitos homófonos (palavras com o mesmo som). Os caracteres eliminam ambiguidades na escrita, enquanto o Pinyin mostra a pronúncia exata.'
        };
      case 'id':
        return {
          badge: 'Panduan Fonetik',
          title: 'Cara Kerja Pinyin & Nada',
          subtitle: 'Jembatan dari huruf Latin ke aksara Mandarin (汉字)',
          toggleShow: 'Tampilkan Panduan Pinyin',
          toggleHide: 'Sembunyikan Panduan',
          tabTones: '4 Nada & Netral',
          tabAnatomy: 'Struktur Suku Kata',
          tabTyping: 'Cara Mengetik Hanzi',
          toneHeader: 'Dalam bahasa Mandarin, tinggi-rendah nada menentukan arti kata:',
          formulaTitle: 'Anatomi Suku Kata Mandarin',
          formulaDesc: 'Setiap suku kata Mandarin tersusun dari tiga bagian:',
          typingTitle: 'Dari Huruf Latin Menjadi Aksara Hanzi',
          typingDesc: 'Di ponsel dan komputer, bahasa Mandarin diketik memakai papan ketik QWERTY:',
          homophoneTitle: 'Mengapa Aksara Hanzi Tetap Penting?',
          homophoneDesc: 'Bahasa Mandarin memiliki banyak kata yang terdengar sama (homofon). Aksara Hanzi memastikan arti tertulis tetap jelas, sedangkan Pinyin memandu pelafalannya.'
        };
      case 'tr':
        return {
          badge: 'Fonetik Rehber',
          title: 'Pinyin ve Tonlar Nasıl Çalışır?',
          subtitle: 'Latin harflerinden Çin karakterlerine (汉字) uzanan köprü',
          toggleShow: 'Pinyin Rehberini Göster',
          toggleHide: 'Rehberi Gizle',
          tabTones: '4 Ton ve Nötr Ton',
          tabAnatomy: 'Hece Yapısı',
          tabTyping: 'Hanzi Nasıl Yazılır?',
          toneHeader: 'Mandarin Çincesinde ses tonu kelimenin anlamını tamamen değiştirir:',
          formulaTitle: 'Mandarin Hecesinin Yapısı',
          formulaDesc: 'Her hece üç temel bölümden oluşur:',
          typingTitle: 'Latin Harflerinden Çin Karakterlerine',
          typingDesc: 'Telefon ve bilgisayarlarda Çince standart klavye ile yazılır:',
          homophoneTitle: 'Neden Karakterler (Hanzi) Hâlâ Gerekli?',
          homophoneDesc: 'Mandarinde aynı sese sahip pek çok eşsesli kelime vardır. Karakterler anlam karmaşasını ortadan kaldırırken Pinyin doğru telaffuzu gösterir.'
        };
      case 'zh':
        return {
          badge: '拼音指南',
          title: '汉语拼音与四声原理',
          subtitle: '连接拉丁字母与汉字（汉字）的发音桥梁',
          toggleShow: '展开拼音与声调指南',
          toggleHide: '收起指南',
          tabTones: '四声与轻声',
          tabAnatomy: '音节结构',
          tabTyping: '如何用拼音输入汉字',
          toneHeader: '在普通话中，声调的高低升降直接决定词义：',
          formulaTitle: '普通话音节的组成结构',
          formulaDesc: '每个普通话音节都遵循清晰的三部分结构：',
          typingTitle: '如何用拉丁字母输入汉字',
          typingDesc: '在手机和电脑上，使用标准拉丁字母键盘即可输入汉字：',
          homophoneTitle: '有了拼音为什么还需要汉字？',
          homophoneDesc: '普通话中有大量同音字（如“shì”可以是“是、事、市、室”）。汉字在书面语中消除歧义，而拼音提供准确读音。'
        };
      case 'ja':
        return {
          badge: '発音ガイド',
          title: 'ピンインと声調の仕組み',
          subtitle: 'ローマ字から中国語の漢字（汉字）への架け橋',
          toggleShow: 'ピンインガイドを表示',
          toggleHide: 'ガイドを閉じる',
          tabTones: '四声と軽声',
          tabAnatomy: '音節の構造',
          tabTyping: '漢字の入力方法',
          toneHeader: '中国語（普通話）では、声の高さと変化（声調）で意味が決まります：',
          formulaTitle: '中国語音節の構造',
          formulaDesc: 'すべての音節は3つの要素で構成されます：',
          typingTitle: 'ローマ字から中国語の漢字を入力する',
          typingDesc: 'スマートフォンやパソコンでは、通常のローマ字キーボードでピンインを打って漢字に変換します：',
          homophoneTitle: 'ピンインがあるのに漢字が必要な理由',
          homophoneDesc: '中国語には同音異義語が数多くあります（例：「shì」＝是・事・市・室）。漢字が意味を明確にし、ピンインが発音を示します。'
        };
      case 'ko':
        return {
          badge: '발음 가이드',
          title: '한어병음과 성조 원리',
          subtitle: '로마자에서 중국어 한자(汉字)로 이어지는 다리',
          toggleShow: '병음 가이드 펼치기',
          toggleHide: '가이드 접기',
          tabTones: '4성과 경성',
          tabAnatomy: '음절 구조',
          tabTyping: '한자 입력 방법',
          toneHeader: '중국어에서는 음의 높낮이(성조)에 따라 단어의 뜻이 완전히 달라집니다:',
          formulaTitle: '중국어 음절의 구조',
          formulaDesc: '모든 중국어 음절은 세 부분의 공식으로 이루어집니다:',
          typingTitle: '로마자로 중국어 한자 입력하기',
          typingDesc: '스마트폰과 컴퓨터에서는 기본 영문 키보드로 병음을 입력해 한자를 선택합니다:',
          homophoneTitle: '병음이 있는데도 한자가 필요한 이유',
          homophoneDesc: '중국어에는 동음이의어가 매우 많습니다(예: "shì" = 是·事·市·室). 한자는 정확한 의미를 전달하고 병음은 발음을 안내합니다.'
        };
      case 'hi':
        return {
          badge: 'ध्वनि मार्गदर्शिका',
          title: 'पिनयिन और स्वर (Tones) कैसे काम करते हैं',
          subtitle: 'लैटिन अक्षरों से चीनी अक्षरों (汉字) तक का सेतु',
          toggleShow: 'पिनयिन गाइड दिखाएँ',
          toggleHide: 'गाइड छिपाएँ',
          tabTones: '4 स्वर और तटस्थ स्वर',
          tabAnatomy: 'अक्षर संरचना',
          tabTyping: 'चीनी अक्षर कैसे टाइप करें',
          toneHeader: 'मंदारिन चीनी में स्वर का उतार-चढ़ाव शब्द का सटीक अर्थ तय करता है:',
          formulaTitle: 'मंदारिन शब्दांश की संरचना',
          formulaDesc: 'प्रत्येक शब्दांश तीन भागों के नियम का पालन करता है:',
          typingTitle: 'लैटिन अक्षरों से चीनी अक्षर कैसे बनते हैं',
          typingDesc: 'फ़ोन और कंप्यूटर पर सामान्य अंग्रेज़ी कीबोर्ड से ही पिनयिन टाइप कर चीनी लिखी जाती है:',
          homophoneTitle: 'पिनयिन होने पर भी चीनी अक्षर (Hanzi) क्यों ज़रूरी हैं?',
          homophoneDesc: 'मंदारिन में एक ही ध्वनि के कई शब्द होते हैं। चीनी अक्षर अर्थ को स्पष्ट रखते हैं जबकि पिनयिन सही उच्चारण सिखाता है।'
        };
      case 'ar':
        return {
          badge: 'دليل النطق الصوتي',
          title: 'كيف يعمل نظام البينيين والنغمات',
          subtitle: 'الجسر الرابط بين الحروف اللاتينية والرموز الصينية (汉字)',
          toggleShow: 'إظهار دليل البينيين',
          toggleHide: 'إخفاء الدليل',
          tabTones: 'النغمات الأربع والمحايدة',
          tabAnatomy: 'بنية المقطع الصوتي',
          tabTyping: 'كيفية كتابة الرموز الصينية',
          toneHeader: 'في اللغة الصينية، تحدد طبقة الصوت ونغمته المعنى الدقيق للكلمة:',
          formulaTitle: 'تشريح المقطع الصوتي الصيني',
          formulaDesc: 'يتكون كل مقطع منطوق في الصينية من ثلاثة عناصر:',
          typingTitle: 'كيف تتحول الحروف اللاتينية إلى رموز صينية',
          typingDesc: 'على الهواتف والحواسيب، تُكتب الصينية باستخدام لوحة المفاتيح اللاتينية القياسية:',
          homophoneTitle: 'لماذا تظل الرموز الصينية (Hanzi) ضرورية؟',
          homophoneDesc: 'تضم الصينية العديد من الكلمات المتطابقة في النطق والمختلفة في المعنى؛ فتزيل الرموز الغموض الكتابي بينما يوضح البينيين النطق.'
        };
      case 'bn':
        return {
          badge: 'উচ্চারণ নির্দেশিকা',
          title: 'পিনইন ও স্বরভঙ্গি কীভাবে কাজ করে',
          subtitle: 'লাতিন অক্ষর থেকে চীনা অক্ষরে (汉字) যাওয়ার সেতু',
          toggleShow: 'পিনইন নির্দেশিকা দেখান',
          toggleHide: 'নির্দেশিকা লুকান',
          tabTones: '৪টি স্বর ও নিরপেক্ষ স্বর',
          tabAnatomy: 'সিলেবল গঠন',
          tabTyping: 'কীভাবে হানজি টাইপ করবেন',
          toneHeader: 'মান্দারিন চীনা ভাষায় স্বরের ওঠানামা শব্দের অর্থ নির্ধারণ করে:',
          formulaTitle: 'মান্দারিন সিলেবলের গঠন',
          formulaDesc: 'প্রতিটি উচ্চারিত সিলেবল তিনটি অংশ নিয়ে গঠিত:',
          typingTitle: 'লাতিন অক্ষর থেকে কীভাবে চীনা অক্ষর লেখা হয়',
          typingDesc: 'ফোন ও কম্পিউটারে সাধারণ ইংরেজি কিবোর্ড দিয়েই পিনইন টাইপ করে চীনা লেখা হয়:',
          homophoneTitle: 'পিনইন থাকা সত্ত্বেও চীনা অক্ষর (Hanzi) কেন জরুরি?',
          homophoneDesc: 'চীনা ভাষায় একই উচ্চারণের বহু ভিন্ন অর্থের শব্দ রয়েছে। অক্ষরগুলো অর্থের দ্ব্যর্থতা দূর করে আর পিনইন সঠিক উচ্চারণ দেখায়।'
        };
      case 'ur':
        return {
          badge: 'صوتی رہنما',
          title: 'پِن یِن اور لہجے کیسے کام کرتے ہیں',
          subtitle: 'لاطینی حروف سے چینی حروف (汉字) تک کا پل',
          toggleShow: 'پِن یِن رہنما دکھائیں',
          toggleHide: 'رہنما چھپائیں',
          tabTones: '4 لہجے اور معتدل لہجہ',
          tabAnatomy: 'ہجے کی ساخت',
          tabTyping: 'چینی حروف ٹائپ کرنے کا طریقہ',
          toneHeader: 'مینڈارن چینی میں آواز کا اتار چڑھاؤ لفظ کا اصل مطلب طے کرتا ہے:',
          formulaTitle: 'مینڈارن ہجے کی ساخت',
          formulaDesc: 'ہر بولا جانے والا ہجہ تین حصوں پر مشتمل ہوتا ہے:',
          typingTitle: 'لاطینی حروف سے چینی حروف کیسے بنتے ہیں',
          typingDesc: 'فون اور کمپیوٹر پر معیاری انگریزی کی بورڈ سے پِن یِن لکھ کر چینی حروف منتخب کیے جاتے ہیں:',
          homophoneTitle: 'پِن یِن کے باوجود چینی حروف (Hanzi) کیوں ضروری ہیں؟',
          homophoneDesc: 'چینی زبان میں ایک جیسی آواز والے کئی الفاظ ہوتے ہیں۔ چینی حروف تحریر میں ابہام ختم کرتے ہیں جبکہ پِن یِن درست تلفظ بتاتی ہے۔'
        };
      case 'en':
      default:
        return {
          badge: 'Phonetic Guide',
          title: 'How Pinyin & Tones Work',
          subtitle: 'The bridge from Latin letters to Chinese characters (汉字)',
          toggleShow: 'Show Pinyin & Tones Guide',
          toggleHide: 'Hide Guide',
          tabTones: 'The 4 Tones & Neutral',
          tabAnatomy: 'Syllable Anatomy',
          tabTyping: 'How Latin Letters Become Hanzi',
          toneHeader: 'In Mandarin Chinese, pitch and tone determine the word’s exact meaning:',
          formulaTitle: 'Anatomy of a Mandarin Syllable',
          formulaDesc: 'Every spoken syllable in Mandarin follows a three-part structural formula:',
          typingTitle: 'How Latin Letters Become Chinese Characters',
          typingDesc: 'On smartphones and computers, Chinese is typed using a standard English/Latin QWERTY keyboard:',
          homophoneTitle: 'Why Characters (Hanzi) Still Matter',
          homophoneDesc: 'Mandarin has dozens of homophones — words sharing the exact same sound and tone. For instance, the syllable "shì" can mean "to be" (是), "event/matter" (事), "city" (市), or "room" (室). Characters eliminate all ambiguity in writing, while Pinyin provides the universal pronunciation key.'
        };
    }
  }, [baseLanguage]);

  const toneCards: ToneCard[] = [
    {
      toneNumber: 1,
      toneName: '1st Tone (High Flat · 阴平)',
      mark: 'ā',
      contour: 'high-flat',
      pitchDescription: 'High, steady pitch held high (55)',
      pinyin: 'mā',
      hanzi: '妈',
      translation: 'Mother',
      sampleDescription: 'Singing a high musical note evenly'
    },
    {
      toneNumber: 2,
      toneName: '2nd Tone (Rising · 阳平)',
      mark: 'á',
      contour: 'rising',
      pitchDescription: 'Starts mid-pitch and glides high (35)',
      pinyin: 'má',
      hanzi: '麻',
      translation: 'Hemp / Numb',
      sampleDescription: 'Like asking a question in surprise: "What?!"'
    },
    {
      toneNumber: 3,
      toneName: '3rd Tone (Falling-Rising Dip · 上声)',
      mark: 'ǎ',
      contour: 'dipping',
      pitchDescription: 'Dips down low before curving upward (214)',
      pinyin: 'mǎ',
      hanzi: '马',
      translation: 'Horse',
      sampleDescription: 'Like a thoughtful "Well..." with a vocal drop'
    },
    {
      toneNumber: 4,
      toneName: '4th Tone (Falling Sharp · 去声)',
      mark: 'à',
      contour: 'falling',
      pitchDescription: 'Starts high and drops sharply downward (51)',
      pinyin: 'mà',
      hanzi: '骂',
      translation: 'To scold',
      sampleDescription: 'Like a firm command or emphatic "No!"'
    },
    {
      toneNumber: 5,
      toneName: 'Neutral Tone (Light · 轻声)',
      mark: 'a',
      contour: 'neutral',
      pitchDescription: 'Short, soft, unstressed release',
      pinyin: 'ma',
      hanzi: '吗',
      translation: 'Question particle',
      sampleDescription: 'Soft and quick at the end of a sentence (你好吗?)'
    }
  ];

  return (
    <div className="pinyin-guide-container">
      {/* Header Banner & Collapse Toggle */}
      <div className="pinyin-guide-header">
        <div className="pinyin-guide-title-wrap">
          <span className="pinyin-guide-badge">🀄 {text.badge}</span>
          <h3 className="pinyin-guide-title">{text.title}</h3>
          <p className="pinyin-guide-subtitle">{text.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={toggleOpen}
          className="pinyin-toggle-btn"
          aria-expanded={isOpen}
          aria-label={isOpen ? text.toggleHide : text.toggleShow}
        >
          <span>{isOpen ? text.toggleHide : text.toggleShow}</span>
          <FaChevronDown className={`pinyin-toggle-icon ${isOpen ? 'open' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="pinyin-guide-body">
          {/* Navigation Sub-Tabs */}
          <div className="pinyin-guide-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'tones'}
              className={`pinyin-tab-btn ${activeTab === 'tones' ? 'active' : ''}`}
              onClick={() => setActiveTab('tones')}
            >
              🎵 {text.tabTones}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'anatomy'}
              className={`pinyin-tab-btn ${activeTab === 'anatomy' ? 'active' : ''}`}
              onClick={() => setActiveTab('anatomy')}
            >
              🧩 {text.tabAnatomy}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'typing'}
              className={`pinyin-tab-btn ${activeTab === 'typing' ? 'active' : ''}`}
              onClick={() => setActiveTab('typing')}
            >
              ⌨️ {text.tabTyping}
            </button>
          </div>

          {/* TAB 1: THE 4 TONES */}
          {activeTab === 'tones' && (
            <div className="pinyin-tab-panel tones-panel">
              <p className="pinyin-panel-intro">
                <FaLightbulb className="panel-hint-icon" /> {text.toneHeader}
              </p>

              <div className="pinyin-tone-grid">
                {toneCards.map((card) => (
                  <div key={card.toneNumber} className={`pinyin-tone-card tone-${card.toneNumber}`}>
                    <div className="tone-card-top">
                      <span className="tone-name-badge">{card.toneName}</span>
                      <div className="tone-pitch-visual" aria-hidden="true">
                        {card.contour === 'high-flat' && (
                          <svg width="40" height="28" viewBox="0 0 40 28">
                            <line x1="4" y1="8" x2="36" y2="8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                          </svg>
                        )}
                        {card.contour === 'rising' && (
                          <svg width="40" height="28" viewBox="0 0 40 28">
                            <line x1="4" y1="22" x2="36" y2="8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                          </svg>
                        )}
                        {card.contour === 'dipping' && (
                          <svg width="40" height="28" viewBox="0 0 40 28">
                            <path d="M 4 10 Q 20 25 36 8" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                          </svg>
                        )}
                        {card.contour === 'falling' && (
                          <svg width="40" height="28" viewBox="0 0 40 28">
                            <line x1="4" y1="8" x2="36" y2="22" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                          </svg>
                        )}
                        {card.contour === 'neutral' && (
                          <svg width="40" height="28" viewBox="0 0 40 28">
                            <circle cx="20" cy="14" r="5" fill="currentColor" />
                          </svg>
                        )}
                      </div>
                    </div>

                    <div className="tone-card-center">
                      <div className="tone-hanzi-wrap">
                        <span className="tone-hanzi">{card.hanzi}</span>
                        <span className="tone-pinyin">{card.pinyin}</span>
                      </div>
                      <PronunciationButton
                        text={card.hanzi}
                        lang="zh"
                        audioCategory="words"
                        useLocalAudio={true}
                        label={`Listen to ${card.hanzi} (${card.pinyin})`}
                        className="tone-audio-btn"
                      />
                    </div>

                    <div className="tone-card-bottom">
                      <span className="tone-meaning">"{card.translation}"</span>
                      <span className="tone-pitch-desc">{card.pitchDescription}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SYLLABLE FORMULA */}
          {activeTab === 'anatomy' && (
            <div className="pinyin-tab-panel anatomy-panel">
              <h4 className="pinyin-panel-title">{text.formulaTitle}</h4>
              <p className="pinyin-panel-intro">{text.formulaDesc}</p>

              {/* Visual Formula Equation */}
              <div className="pinyin-formula-equation">
                <div className="formula-block initial">
                  <span className="block-label">Initial · 声母</span>
                  <span className="block-val">b</span>
                  <span className="block-sub">Consonant Start</span>
                </div>
                <span className="formula-op">+</span>
                <div className="formula-block final">
                  <span className="block-label">Final · 韵母</span>
                  <span className="block-val">a</span>
                  <span className="block-sub">Vowel Core</span>
                </div>
                <span className="formula-op">+</span>
                <div className="formula-block tone">
                  <span className="block-label">Tone · 声调</span>
                  <span className="block-val">ˋ (4th)</span>
                  <span className="block-sub">Pitch Contour</span>
                </div>
                <span className="formula-op">=</span>
                <div className="formula-block result">
                  <span className="block-label">Pinyin</span>
                  <span className="block-val">bà</span>
                  <span className="block-sub">Spoken Syllable</span>
                </div>
                <span className="formula-arrow">➜</span>
                <div className="formula-block hanzi">
                  <span className="block-label">Hanzi</span>
                  <span className="block-val">爸</span>
                  <span className="block-sub">Dad</span>
                </div>
              </div>

              {/* Breakdown Cards */}
              <div className="pinyin-breakdown-cards">
                <div className="breakdown-card">
                  <h5 className="breakdown-card-title">1. The 21 Initials (声母 · Shēngmǔ)</h5>
                  <p className="breakdown-card-text">
                    Consonants placed at the start of a syllable. The letters below in our chart represent all 21 initials:
                  </p>
                  <div className="pinyin-pill-cloud">
                    <span className="pinyin-pill">b</span>
                    <span className="pinyin-pill">p</span>
                    <span className="pinyin-pill">m</span>
                    <span className="pinyin-pill">f</span>
                    <span className="pinyin-pill">d</span>
                    <span className="pinyin-pill">t</span>
                    <span className="pinyin-pill">n</span>
                    <span className="pinyin-pill">l</span>
                    <span className="pinyin-pill">g</span>
                    <span className="pinyin-pill">k</span>
                    <span className="pinyin-pill">h</span>
                    <span className="pinyin-pill">j</span>
                    <span className="pinyin-pill">q</span>
                    <span className="pinyin-pill">x</span>
                    <span className="pinyin-pill">zh</span>
                    <span className="pinyin-pill">ch</span>
                    <span className="pinyin-pill">sh</span>
                    <span className="pinyin-pill">r</span>
                    <span className="pinyin-pill">z</span>
                    <span className="pinyin-pill">c</span>
                    <span className="pinyin-pill">s</span>
                  </div>
                </div>

                <div className="breakdown-card">
                  <h5 className="breakdown-card-title">2. Finals (韵母 · Yùnmǔ) & Semi-Vowels</h5>
                  <p className="breakdown-card-text">
                    Vowels and endings that complete the syllable. Tone marks are always placed over vowels (a &gt; o &gt; e &gt; i/u/ü):
                  </p>
                  <div className="pinyin-pill-cloud">
                    <span className="pinyin-pill">a</span>
                    <span className="pinyin-pill">o</span>
                    <span className="pinyin-pill">e</span>
                    <span className="pinyin-pill">i</span>
                    <span className="pinyin-pill">u</span>
                    <span className="pinyin-pill">ü</span>
                    <span className="pinyin-pill special">y (yī)</span>
                    <span className="pinyin-pill special">w (wū)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HOW TYPING WORKS (LATIN TO HANZI) */}
          {activeTab === 'typing' && (
            <div className="pinyin-tab-panel typing-panel">
              <h4 className="pinyin-panel-title">
                <FaKeyboard className="panel-icon" /> {text.typingTitle}
              </h4>
              <p className="pinyin-panel-intro">{text.typingDesc}</p>

              {/* Interactive Visual Keyboard Flow */}
              <div className="pinyin-typing-flow">
                <div className="typing-step">
                  <span className="step-num">Step 1</span>
                  <div className="step-mock-keyboard">
                    <span className="key-cap">n</span>
                    <span className="key-cap">i</span>
                    <span className="key-cap">h</span>
                    <span className="key-cap">a</span>
                    <span className="key-cap">o</span>
                  </div>
                  <span className="step-caption">Type Latin letters without tones</span>
                </div>

                <div className="flow-arrow">➜</div>

                <div className="typing-step">
                  <span className="step-num">Step 2</span>
                  <div className="step-mock-candidates">
                    <span className="candidate-choice active">1. 你好</span>
                    <span className="candidate-choice">2. 拟好</span>
                    <span className="candidate-choice">3. 泥耗</span>
                  </div>
                  <span className="step-caption">Keyboard predicts matching Hanzi</span>
                </div>

                <div className="flow-arrow">➜</div>

                <div className="typing-step">
                  <span className="step-num">Step 3</span>
                  <div className="step-mock-output">
                    <span className="output-hanzi">你好！</span>
                    <span className="output-meaning">(Hello!)</span>
                  </div>
                  <span className="step-caption">Select #1 to insert the character</span>
                </div>
              </div>

              {/* Homophones Explanation Box */}
              <div className="pinyin-homophone-box">
                <div className="homophone-badge">💡 {text.homophoneTitle}</div>
                <p className="homophone-text">{text.homophoneDesc}</p>
                <div className="homophone-examples">
                  <span className="homophone-chip"><strong>是</strong> (shì) · To be</span>
                  <span className="homophone-chip"><strong>事</strong> (shì) · Matter</span>
                  <span className="homophone-chip"><strong>市</strong> (shì) · City</span>
                  <span className="homophone-chip"><strong>室</strong> (shì) · Room</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PinyinGuide;
