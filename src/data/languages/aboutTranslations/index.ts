import { SupportedLanguageId } from '../types';
import { ABOUT_LANGUAGES, LanguageProfile } from '../aboutLanguageData';
import { AboutLanguageTranslations } from './types';
import { ABOUT_TRANSLATIONS_ZH } from './zh';
import { ABOUT_TRANSLATIONS_JA } from './ja';
import { ABOUT_TRANSLATIONS_KO } from './ko';
import { ABOUT_TRANSLATIONS_ES } from './es';
import { ABOUT_TRANSLATIONS_FR } from './fr';
import { ABOUT_TRANSLATIONS_PT } from './pt';
import { ABOUT_TRANSLATIONS_DE } from './de';
import { ABOUT_TRANSLATIONS_RU } from './ru';
import { ABOUT_TRANSLATIONS_TR } from './tr';
import { ABOUT_TRANSLATIONS_ID } from './id';
import { ABOUT_TRANSLATIONS_AR } from './ar';
import { ABOUT_TRANSLATIONS_UR } from './ur';
import { ABOUT_TRANSLATIONS_HI } from './hi';
import { ABOUT_TRANSLATIONS_BN } from './bn';

export const ABOUT_TRANSLATIONS_BY_BASE: Partial<Record<SupportedLanguageId, AboutLanguageTranslations>> = {
  zh: ABOUT_TRANSLATIONS_ZH,
  ja: ABOUT_TRANSLATIONS_JA,
  ko: ABOUT_TRANSLATIONS_KO,
  es: ABOUT_TRANSLATIONS_ES,
  fr: ABOUT_TRANSLATIONS_FR,
  pt: ABOUT_TRANSLATIONS_PT,
  de: ABOUT_TRANSLATIONS_DE,
  ru: ABOUT_TRANSLATIONS_RU,
  tr: ABOUT_TRANSLATIONS_TR,
  id: ABOUT_TRANSLATIONS_ID,
  ar: ABOUT_TRANSLATIONS_AR,
  ur: ABOUT_TRANSLATIONS_UR,
  hi: ABOUT_TRANSLATIONS_HI,
  bn: ABOUT_TRANSLATIONS_BN,
};

export const getLocalizedAboutProfile = (
  targetLang: SupportedLanguageId,
  baseLang: SupportedLanguageId = 'en'
): LanguageProfile => {
  const baseProfile = ABOUT_LANGUAGES[targetLang] || ABOUT_LANGUAGES.en;
  if (baseLang === 'en') {
    return baseProfile;
  }
  const localized = ABOUT_TRANSLATIONS_BY_BASE[baseLang]?.[baseProfile.id];
  if (!localized) {
    return baseProfile;
  }
  return {
    ...baseProfile,
    ...localized,
  };
};

export interface ScriptEvolutionLabels {
  badge: string;
  heading: string;
  description: string;
  traditionalBadge: string;
  simplifiedBadge: string;
  formatStrokes: (n: number) => string;
  formatReducedStrokes: (n: number) => string;
}

export const getScriptEvolutionLabels = (baseLang: SupportedLanguageId): ScriptEvolutionLabels => {
  switch (baseLang) {
    case 'zh':
      return {
        badge: '1950年代普及识字改革',
        heading: '繁体字与简体字对比 (繁简对比)',
        description:
          '1949年，中国超过80%的人口不识字，许多常用繁体字动辄超过10至20画。1956年，国家系统推行汉字简化方案，帮助广大民众普及读写能力：',
        traditionalBadge: '繁体字',
        simplifiedBadge: '简体字',
        formatStrokes: (n) => `${n} 画`,
        formatReducedStrokes: (n) => `减少 ${n} 画`,
      };
    case 'ja':
      return {
        badge: '1950年代の識字改革',
        heading: '繁体字と簡体字の比較 (繁簡対比)',
        description:
          '1949年当時、中国の人口の80%以上が読み書きできませんでした。伝統的な繁体字には10〜20画以上の複雑な字が多く含まれていたため、1956年に体系的に簡略化した「簡体字」が導入されました：',
        traditionalBadge: '繁体字',
        simplifiedBadge: '簡体字',
        formatStrokes: (n) => `${n}画`,
        formatReducedStrokes: (n) => `-${n}画`,
      };
    case 'ko':
      return {
        badge: '1950년대 문해력 혁명',
        heading: '번체자 vs 간체자 비교 (繁简对比)',
        description:
          '1949년 중국 인구의 80% 이상이 글을 읽고 쓰지 못했습니다. 10~20획을 넘나드는 복잡한 번체자를 1956년 체계적으로 간소화하여 대중의 문해력을 크게 높였습니다:',
        traditionalBadge: '번체 (繁体)',
        simplifiedBadge: '간체 (简体)',
        formatStrokes: (n) => `${n}획`,
        formatReducedStrokes: (n) => `-${n}획`,
      };
    case 'ru': {
      const ruStrokeWord = (n: number): string => {
        const abs = Math.abs(n);
        const mod10 = abs % 10;
        const mod100 = abs % 100;
        if (mod10 === 1 && mod100 !== 11) return 'черта';
        if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'черты';
        return 'черт';
      };
      return {
        badge: 'Реформа грамотности 1950-х годов',
        heading: 'Традиционные и упрощённые иероглифы (繁简对比)',
        description:
          'В 1949 году более 80% населения Китая не умели читать и писать, а многие традиционные иероглифы содержали по 10–20 и более черт. В 1956 году была проведена систематическая реформа упрощения письменности:',
        traditionalBadge: 'Традиционный (繁体)',
        simplifiedBadge: 'Упрощённый (简体)',
        formatStrokes: (n) => `${n} ${ruStrokeWord(n)}`,
        formatReducedStrokes: (n) => `-${n} ${ruStrokeWord(n)}`,
      };
    }
    case 'es':
      return {
        badge: 'Revolución de alfabetización de los años 50',
        heading: 'Caracteres tradicionales vs. simplificados (繁简对比)',
        description:
          'En 1949, más del 80 % de la población de China no sabía leer ni escribir, y muchos caracteres tradicionales tenían entre 10 y más de 20 trazos. En 1956 se simplificaron sistemáticamente para universalizar la alfabetización:',
        traditionalBadge: 'Tradicional (繁体)',
        simplifiedBadge: 'Simplificado (简体)',
        formatStrokes: (n) => `${n} trazos`,
        formatReducedStrokes: (n) => `-${n} trazos`,
      };
    case 'fr':
      return {
        badge: 'Révolution de l’alphabétisation des années 1950',
        heading: 'Caractères traditionnels vs simplifiés (繁简对比)',
        description:
          'En 1949, plus de 80 % de la population chinoise était analphabète, et de nombreux caractères traditionnels comptaient de 10 à plus de 20 traits. En 1956, la réforme des caractères simplifiés a démocratisé la lecture et l’écriture :',
        traditionalBadge: 'Traditionnel (繁体)',
        simplifiedBadge: 'Simplifié (简体)',
        formatStrokes: (n) => `${n} traits`,
        formatReducedStrokes: (n) => `-${n} traits`,
      };
    case 'de':
      return {
        badge: 'Alphabetisierungsreform der 1950er-Jahre',
        heading: 'Traditionelle vs. Kurzzeichen (繁简对比)',
        description:
          '1949 konnten über 80 % der chinesischen Bevölkerung weder lesen noch schreiben, und viele traditionelle Zeichen hatten 10 bis über 20 Striche. 1956 wurden die Zeichen systematisch zu Kurzzeichen vereinfacht:',
        traditionalBadge: 'Traditionell (繁体)',
        simplifiedBadge: 'Vereinfacht (简体)',
        formatStrokes: (n) => `${n} Striche`,
        formatReducedStrokes: (n) => `-${n} Striche`,
      };
    case 'pt':
      return {
        badge: 'Revolução de alfabetização dos anos 1950',
        heading: 'Caracteres tradicionais vs. simplificados (繁简对比)',
        description:
          'Em 1949, mais de 80% da população chinesa não sabia ler nem escrever, e muitos caracteres tradicionais tinham de 10 a mais de 20 traços. Em 1956, eles foram simplificados sistematicamente:',
        traditionalBadge: 'Tradicional (繁体)',
        simplifiedBadge: 'Simplificado (简体)',
        formatStrokes: (n) => `${n} traços`,
        formatReducedStrokes: (n) => `-${n} traços`,
      };
    case 'id':
      return {
        badge: 'Revolusi Literasi 1950-an',
        heading: 'Karakter Tradisional vs. Sederhana (繁简对比)',
        description:
          'Pada tahun 1949, lebih dari 80% penduduk Tiongkok belum bisa membaca atau menulis, dan banyak karakter Tradisional memiliki 10 hingga 20+ guratan. Pada tahun 1956, aksara disederhanakan secara sistematis:',
        traditionalBadge: 'Tradisional (繁体)',
        simplifiedBadge: 'Sederhana (简体)',
        formatStrokes: (n) => `${n} guratan`,
        formatReducedStrokes: (n) => `-${n} guratan`,
      };
    case 'tr':
      return {
        badge: '1950’ler Okuryazarlık Devrimi',
        heading: 'Geleneksel ve Basitleştirilmiş Karakterler (繁简对比)',
        description:
          '1949’da Çin nüfusunun %80’inden fazlası okuma yazma bilmiyordu ve pek çok Geleneksel karakter 10 ila 20’den fazla fırça darbesinden oluşuyordu. 1956’da okuryazarlığı yaygınlaştırmak için karakterler sistemli biçimde sadeleştirildi:',
        traditionalBadge: 'Geleneksel (繁体)',
        simplifiedBadge: 'Basitleştirilmiş (简体)',
        formatStrokes: (n) => `${n} çizgi`,
        formatReducedStrokes: (n) => `-${n} çizgi`,
      };
    case 'hi':
      return {
        badge: '1950 के दशक की साक्षरता क्रांति',
        heading: 'पारंपरिक बनाम सरलीकृत चीनी अक्षर (繁简对比)',
        description:
          '1949 में चीन की 80% से अधिक आबादी पढ़-लिख नहीं सकती थी और कई पारंपरिक अक्षरों में 10 से 20 से अधिक स्ट्रोक होते थे। 1956 में जनसाधारण की साक्षरता के लिए अक्षरों को व्यवस्थित रूप से सरल बनाया गया:',
        traditionalBadge: 'पारंपरिक (繁体)',
        simplifiedBadge: 'सरलीकृत (简体)',
        formatStrokes: (n) => `${n} स्ट्रोक`,
        formatReducedStrokes: (n) => `-${n} स्ट्रोक`,
      };
    case 'ar': {
      const arStrokePhrase = (n: number): string => {
        const abs = Math.abs(n);
        if (abs === 1) return 'خط واحد';
        if (abs === 2) return 'خطان';
        if (abs >= 3 && abs <= 10) return `${abs} خطوط`;
        return `${abs} خطاً`;
      };
      return {
        badge: 'ثورة محو الأمية في خمسينيات القرن العشرين',
        heading: 'المقارنة بين المقاطع التقليدية والمبسطة (繁简对比)',
        description:
          'في عام 1949 كان أكثر من 80% من سكان الصين غير قادرين على القراءة والكتابة، وكان كثير من المقاطع التقليدية يضم ما بين 10 وأكثر من 20 ضربة خطية. وفي عام 1956 جرى تبسيط المقاطع منهجياً لنشر القراءة والكتابة:',
        traditionalBadge: 'تقليدي (繁体)',
        simplifiedBadge: 'مبسّط (简体)',
        formatStrokes: (n) => arStrokePhrase(n),
        formatReducedStrokes: (n) => `-${arStrokePhrase(n)}`,
      };
    }
    case 'bn':
      return {
        badge: '১৯৫০-এর দশকের সাক্ষরতা বিপ্লব',
        heading: 'প্রথাগত বনাম সরলীকৃত চীনা অক্ষর (繁简对比)',
        description:
          '১৯৪৯ সালে চীনের ৮০%-এর বেশি মানুষ পড়তে বা লিখতে পারতেন না, আর বহু প্রথাগত অক্ষরে ১০ থেকে ২০টিরও বেশি আঁচড় থাকত। ১৯৫৬ সালে সর্বজনীন সাক্ষরতা প্রসারের জন্য অক্ষরগুলোকে পদ্ধতিগতভাবে সরলীকৃত করা হয়:',
        traditionalBadge: 'প্রথাগত (繁体)',
        simplifiedBadge: 'সরলীকৃত (简体)',
        formatStrokes: (n) => `${n} আঁচড়`,
        formatReducedStrokes: (n) => `-${n} আঁচড়`,
      };
    case 'ur':
      return {
        badge: '1950ء کی دہائی کا خواندگی انقلاب',
        heading: 'روایتی بمقابلہ آسان چینی حروف (繁简对比)',
        description:
          '1949ء میں چین کی 80 فیصد سے زائد آبادی پڑھ لکھ نہیں سکتی تھی اور بہت سے روایتی حروف 10 سے 20 سے زائد لکیروں پر مشتمل تھے۔ 1956ء میں عام لوگوں میں خواندگی پھیلانے کے لیے حروف کو منظم طور پر آسان بنایا گیا:',
        traditionalBadge: 'روایتی (繁体)',
        simplifiedBadge: 'آسان (简体)',
        formatStrokes: (n) => `${n} لکیریں`,
        formatReducedStrokes: (n) => `-${n} لکیریں`,
      };
    default:
      return {
        badge: '1950s Literacy Revolution',
        heading: 'Traditional vs. Simplified Characters (繁简对比)',
        description:
          'In 1949, over 80% of China’s population could not read or write, and complex Traditional characters frequently took 10 to 20+ strokes each. In 1956, the government systematically streamlined characters into Simplified forms to bring universal literacy to working people:',
        traditionalBadge: 'Traditional (繁体)',
        simplifiedBadge: 'Simplified (简体)',
        formatStrokes: (n) => `${n} strokes`,
        formatReducedStrokes: (n) => `-${n} strokes`,
      };
  }
};
