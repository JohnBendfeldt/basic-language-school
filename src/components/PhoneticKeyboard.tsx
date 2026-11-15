import React from 'react';
import { PhoneticScriptLang } from '../utils/phoneticTyping';

export interface PhoneticKeyDef {
  label: string;
  value: string;
  en: string;
}

export interface PhoneticKeyboardProps {
  lang: Exclude<PhoneticScriptLang, 'ru'>;
  onLetterClick: (letter: string) => void;
}

interface KeyboardLayoutConfig {
  spaceLabel: string;
  isRtl?: boolean;
  rows: PhoneticKeyDef[][];
  specialRow: PhoneticKeyDef[];
}

const KEYBOARD_LAYOUTS: Record<Exclude<PhoneticScriptLang, 'ru'>, KeyboardLayoutConfig> = {
  ar: {
    spaceLabel: 'مسافة (Space)',
    isRtl: true,
    rows: [
      [
        { label: 'ق', value: 'ق', en: 'Q' },
        { label: 'و', value: 'و', en: 'W' },
        { label: 'ع', value: 'ع', en: '3/E' },
        { label: 'ر', value: 'ر', en: 'R' },
        { label: 'ت', value: 'ت', en: 'T' },
        { label: 'ي', value: 'ي', en: 'Y' },
        { label: 'أ', value: 'أ', en: 'U' },
        { label: 'إ', value: 'إ', en: 'I' },
        { label: 'ه', value: 'ه', en: 'O/H' },
        { label: 'ب', value: 'ب', en: 'B/P' }
      ],
      [
        { label: 'ا', value: 'ا', en: 'A' },
        { label: 'س', value: 'س', en: 'S' },
        { label: 'د', value: 'د', en: 'D' },
        { label: 'ف', value: 'ف', en: 'F' },
        { label: 'غ', value: 'غ', en: 'GH' },
        { label: 'ح', value: 'ح', en: '7/H' },
        { label: 'ج', value: 'ج', en: 'J' },
        { label: 'ك', value: 'ك', en: 'K' },
        { label: 'ل', value: 'ل', en: 'L' }
      ],
      [
        { label: 'ز', value: 'ز', en: 'Z' },
        { label: 'خ', value: 'خ', en: 'KH' },
        { label: 'ش', value: 'ش', en: 'SH' },
        { label: 'ث', value: 'ث', en: 'TH' },
        { label: 'ذ', value: 'ذ', en: 'DH' },
        { label: 'ن', value: 'ن', en: 'N' },
        { label: 'م', value: 'م', en: 'M' }
      ]
    ],
    specialRow: [
      { label: 'آ', value: 'آ', en: 'AA' },
      { label: 'ء', value: 'ء', en: "'" },
      { label: 'ة', value: 'ة', en: 'ah' },
      { label: 'ى', value: 'ى', en: 'á' },
      { label: 'ئ', value: 'ئ', en: 'ʾi' },
      { label: 'ؤ', value: 'ؤ', en: 'ʾu' },
      { label: 'لا', value: 'لا', en: 'la' },
      { label: 'ط', value: 'ط', en: 'Ṭ' },
      { label: 'ظ', value: 'ظ', en: 'Ẓ' },
      { label: 'ص', value: 'ص', en: 'Ṣ' },
      { label: 'ض', value: 'ض', en: 'Ḍ' }
    ]
  },
  ur: {
    spaceLabel: 'وقفہ (Space)',
    isRtl: true,
    rows: [
      [
        { label: 'ق', value: 'ق', en: 'Q' },
        { label: 'و', value: 'و', en: 'W' },
        { label: 'ع', value: 'ع', en: 'E' },
        { label: 'ر', value: 'ر', en: 'R' },
        { label: 'ت', value: 'ت', en: 'T' },
        { label: 'ے', value: 'ے', en: 'AY' },
        { label: 'ء', value: 'ء', en: "'" },
        { label: 'ی', value: 'ی', en: 'I/Y' },
        { label: 'ہ', value: 'ہ', en: 'H/O' },
        { label: 'پ', value: 'پ', en: 'P' }
      ],
      [
        { label: 'ا', value: 'ا', en: 'A' },
        { label: 'س', value: 'س', en: 'S' },
        { label: 'د', value: 'د', en: 'D' },
        { label: 'ف', value: 'ف', en: 'F' },
        { label: 'گ', value: 'گ', en: 'G' },
        { label: 'ھ', value: 'ھ', en: 'H-asp' },
        { label: 'ج', value: 'ج', en: 'J' },
        { label: 'ک', value: 'ک', en: 'K' },
        { label: 'ل', value: 'ل', en: 'L' }
      ],
      [
        { label: 'ز', value: 'ز', en: 'Z' },
        { label: 'ش', value: 'ش', en: 'SH' },
        { label: 'چ', value: 'چ', en: 'CH' },
        { label: 'ط', value: 'ط', en: 'Ṭ' },
        { label: 'ب', value: 'ب', en: 'B' },
        { label: 'ن', value: 'ن', en: 'N' },
        { label: 'م', value: 'م', en: 'M' }
      ]
    ],
    specialRow: [
      { label: 'آ', value: 'آ', en: 'AA' },
      { label: 'ٹ', value: 'ٹ', en: 'T-ret' },
      { label: 'ڈ', value: 'ڈ', en: 'D-ret' },
      { label: 'ڑ', value: 'ڑ', en: 'R-ret' },
      { label: 'ں', value: 'ں', en: 'N-nas' },
      { label: 'ژ', value: 'ژ', en: 'ZH' },
      { label: 'ح', value: 'ح', en: 'Ḥ' },
      { label: 'خ', value: 'خ', en: 'KH' },
      { label: 'غ', value: 'غ', en: 'GH' },
      { label: 'ص', value: 'ص', en: 'Ṣ' },
      { label: 'ض', value: 'ض', en: 'Ẓ' },
      { label: 'ظ', value: 'ظ', en: 'Ẓ2' },
      { label: 'ث', value: 'ث', en: 'TH' },
      { label: 'ذ', value: 'ذ', en: 'DH' },
      { label: 'ؤ', value: 'ؤ', en: 'ʾu' },
      { label: 'ئ', value: 'ئ', en: 'ʾi' }
    ]
  },
  hi: {
    spaceLabel: 'स्पेस (Space)',
    rows: [
      [
        { label: 'अ', value: 'अ', en: 'a' },
        { label: 'आ', value: 'आ', en: 'aa' },
        { label: 'इ', value: 'इ', en: 'i' },
        { label: 'ई', value: 'ई', en: 'ii' },
        { label: 'उ', value: 'उ', en: 'u' },
        { label: 'ऊ', value: 'ऊ', en: 'uu' },
        { label: 'ए', value: 'ए', en: 'e' },
        { label: 'ऐ', value: 'ऐ', en: 'ai' },
        { label: 'ओ', value: 'ओ', en: 'o' },
        { label: 'औ', value: 'औ', en: 'au' }
      ],
      [
        { label: 'क', value: 'क', en: 'k' },
        { label: 'ख', value: 'ख', en: 'kh' },
        { label: 'ग', value: 'ग', en: 'g' },
        { label: 'घ', value: 'घ', en: 'gh' },
        { label: 'च', value: 'च', en: 'ch' },
        { label: 'छ', value: 'छ', en: 'chh' },
        { label: 'ज', value: 'ज', en: 'j' },
        { label: 'झ', value: 'झ', en: 'jh' },
        { label: 'ट', value: 'ट', en: 'T' },
        { label: 'ड', value: 'ड', en: 'D' }
      ],
      [
        { label: 'त', value: 'त', en: 't' },
        { label: 'थ', value: 'थ', en: 'th' },
        { label: 'द', value: 'द', en: 'd' },
        { label: 'ध', value: 'ध', en: 'dh' },
        { label: 'न', value: 'न', en: 'n' },
        { label: 'प', value: 'प', en: 'p' },
        { label: 'फ', value: 'फ', en: 'ph' },
        { label: 'ब', value: 'ब', en: 'b' },
        { label: 'भ', value: 'भ', en: 'bh' },
        { label: 'म', value: 'म', en: 'm' }
      ]
    ],
    specialRow: [
      { label: 'य', value: 'य', en: 'y' },
      { label: 'र', value: 'र', en: 'r' },
      { label: 'ल', value: 'ल', en: 'l' },
      { label: 'व', value: 'व', en: 'v' },
      { label: 'श', value: 'श', en: 'sh' },
      { label: 'स', value: 'स', en: 's' },
      { label: 'ह', value: 'ह', en: 'h' },
      { label: 'ा', value: 'ा', en: '-aa' },
      { label: 'ि', value: 'ि', en: '-i' },
      { label: 'ी', value: 'ी', en: '-ii' },
      { label: 'ु', value: 'ु', en: '-u' },
      { label: 'ू', value: 'ू', en: '-uu' },
      { label: 'े', value: 'े', en: '-e' },
      { label: 'ै', value: 'ै', en: '-ai' },
      { label: 'ो', value: 'ो', en: '-o' },
      { label: 'ौ', value: 'ौ', en: '-au' },
      { label: 'ं', value: 'ं', en: 'ṅ' },
      { label: 'ँ', value: 'ँ', en: 'ñ' },
      { label: '्', value: '्', en: 'virama' }
    ]
  },
  bn: {
    spaceLabel: 'স্পেস (Space)',
    rows: [
      [
        { label: 'অ', value: 'অ', en: 'o' },
        { label: 'আ', value: 'আ', en: 'a' },
        { label: 'ই', value: 'ই', en: 'i' },
        { label: 'ঈ', value: 'ঈ', en: 'ii' },
        { label: 'উ', value: 'উ', en: 'u' },
        { label: 'ঊ', value: 'ঊ', en: 'uu' },
        { label: 'ঋ', value: 'ঋ', en: 'ri' },
        { label: 'এ', value: 'এ', en: 'e' },
        { label: 'ঐ', value: 'ঐ', en: 'oi' },
        { label: 'ও', value: 'ও', en: 'O' },
        { label: 'ঔ', value: 'ঔ', en: 'ou' }
      ],
      [
        { label: 'ক', value: 'ক', en: 'k' },
        { label: 'খ', value: 'খ', en: 'kh' },
        { label: 'গ', value: 'গ', en: 'g' },
        { label: 'ঘ', value: 'ঘ', en: 'gh' },
        { label: 'চ', value: 'চ', en: 'ch' },
        { label: 'ছ', value: 'ছ', en: 'chh' },
        { label: 'জ', value: 'জ', en: 'j' },
        { label: 'ঝ', value: 'ঝ', en: 'jh' },
        { label: 'ট', value: 'ট', en: 'T' },
        { label: 'ড', value: 'ড', en: 'D' }
      ],
      [
        { label: 'ত', value: 'ত', en: 't' },
        { label: 'থ', value: 'থ', en: 'th' },
        { label: 'দ', value: 'দ', en: 'd' },
        { label: 'ধ', value: 'ধ', en: 'dh' },
        { label: 'ন', value: 'ন', en: 'n' },
        { label: 'প', value: 'প', en: 'p' },
        { label: 'ফ', value: 'ফ', en: 'ph' },
        { label: 'ব', value: 'ব', en: 'b' },
        { label: 'ভ', value: 'ভ', en: 'bh' },
        { label: 'ম', value: 'ম', en: 'm' }
      ]
    ],
    specialRow: [
      { label: 'য', value: 'য', en: 'y/j' },
      { label: 'র', value: 'র', en: 'r' },
      { label: 'ল', value: 'ল', en: 'l' },
      { label: 'শ', value: 'শ', en: 'sh' },
      { label: 'স', value: 'স', en: 's' },
      { label: 'হ', value: 'হ', en: 'h' },
      { label: 'ড়', value: 'ড়', en: 'R' },
      { label: 'য়', value: 'য়', en: 'y' },
      { label: 'া', value: 'া', en: '-a' },
      { label: 'ি', value: 'ি', en: '-i' },
      { label: 'ী', value: 'ী', en: '-ii' },
      { label: 'ু', value: 'ু', en: '-u' },
      { label: 'ূ', value: 'ূ', en: '-uu' },
      { label: 'ে', value: 'ে', en: '-e' },
      { label: 'ো', value: 'ো', en: '-o' },
      { label: 'ং', value: 'ং', en: 'ng' },
      { label: 'ঁ', value: 'ঁ', en: '~' },
      { label: '্', value: '্', en: 'hasanta' }
    ]
  },
  ja: {
    spaceLabel: 'スペース (Space)',
    rows: [
      [
        { label: 'あ', value: 'あ', en: 'a' },
        { label: 'い', value: 'い', en: 'i' },
        { label: 'う', value: 'う', en: 'u' },
        { label: 'え', value: 'え', en: 'e' },
        { label: 'お', value: 'お', en: 'o' },
        { label: 'か', value: 'か', en: 'ka' },
        { label: 'き', value: 'き', en: 'ki' },
        { label: 'く', value: 'く', en: 'ku' },
        { label: 'け', value: 'け', en: 'ke' },
        { label: 'こ', value: 'こ', en: 'ko' }
      ],
      [
        { label: 'さ', value: 'さ', en: 'sa' },
        { label: 'し', value: 'し', en: 'shi' },
        { label: 'す', value: 'す', en: 'su' },
        { label: 'せ', value: 'せ', en: 'se' },
        { label: 'そ', value: 'そ', en: 'so' },
        { label: 'た', value: 'た', en: 'ta' },
        { label: 'ち', value: 'ち', en: 'chi' },
        { label: 'つ', value: 'つ', en: 'tsu' },
        { label: 'て', value: 'て', en: 'te' },
        { label: 'と', value: 'と', en: 'to' }
      ],
      [
        { label: 'な', value: 'な', en: 'na' },
        { label: 'に', value: 'に', en: 'ni' },
        { label: 'ぬ', value: 'ぬ', en: 'nu' },
        { label: 'ね', value: 'ね', en: 'ne' },
        { label: 'の', value: 'の', en: 'no' },
        { label: 'は', value: 'は', en: 'ha' },
        { label: 'ひ', value: 'ひ', en: 'hi' },
        { label: 'ふ', value: 'ふ', en: 'fu' },
        { label: 'へ', value: 'へ', en: 'he' },
        { label: 'ほ', value: 'ほ', en: 'ho' }
      ]
    ],
    specialRow: [
      { label: 'ま', value: 'ま', en: 'ma' },
      { label: 'み', value: 'み', en: 'mi' },
      { label: 'む', value: 'む', en: 'mu' },
      { label: 'め', value: 'め', en: 'me' },
      { label: 'も', value: 'も', en: 'mo' },
      { label: 'や', value: 'や', en: 'ya' },
      { label: 'ゆ', value: 'ゆ', en: 'yu' },
      { label: 'よ', value: 'よ', en: 'yo' },
      { label: 'ら', value: 'ら', en: 'ra' },
      { label: 'り', value: 'り', en: 'ri' },
      { label: 'る', value: 'る', en: 'ru' },
      { label: 'れ', value: 'れ', en: 're' },
      { label: 'ろ', value: 'ろ', en: 'ro' },
      { label: 'わ', value: 'わ', en: 'wa' },
      { label: 'を', value: 'を', en: 'wo' },
      { label: 'ん', value: 'ん', en: 'n' },
      { label: 'っ', value: 'っ', en: 'small' },
      { label: 'ゃ', value: 'ゃ', en: 'ya' },
      { label: 'ゅ', value: 'ゅ', en: 'yu' },
      { label: 'ょ', value: 'ょ', en: 'yo' },
      { label: 'ー', value: 'ー', en: '-' }
    ]
  },
  ko: {
    spaceLabel: '스페이스 (Space)',
    rows: [
      [
        { label: 'ㅂ', value: 'ㅂ', en: 'b' },
        { label: 'ㅈ', value: 'ㅈ', en: 'j' },
        { label: 'ㄷ', value: 'ㄷ', en: 'd' },
        { label: 'ㄱ', value: 'ㄱ', en: 'g' },
        { label: 'ㅅ', value: 'ㅅ', en: 's' },
        { label: 'ㅁ', value: 'ㅁ', en: 'm' },
        { label: 'ㄴ', value: 'ㄴ', en: 'n' },
        { label: 'ㅇ', value: 'ㅇ', en: 'ng/-' },
        { label: 'ㄹ', value: 'ㄹ', en: 'r/l' },
        { label: 'ㅎ', value: 'ㅎ', en: 'h' }
      ],
      [
        { label: 'ㅋ', value: 'ㅋ', en: 'k' },
        { label: 'ㅌ', value: 'ㅌ', en: 't' },
        { label: 'ㅊ', value: 'ㅊ', en: 'ch' },
        { label: 'ㅍ', value: 'ㅍ', en: 'p' },
        { label: 'ㄲ', value: 'ㄲ', en: 'kk' },
        { label: 'ㄸ', value: 'ㄸ', en: 'tt' },
        { label: 'ㅃ', value: 'ㅃ', en: 'pp' },
        { label: 'ㅆ', value: 'ㅆ', en: 'ss' },
        { label: 'ㅉ', value: 'ㅉ', en: 'jj' }
      ],
      [
        { label: 'ㅏ', value: 'ㅏ', en: 'a' },
        { label: 'ㅑ', value: 'ㅑ', en: 'ya' },
        { label: 'ㅓ', value: 'ㅓ', en: 'eo' },
        { label: 'ㅕ', value: 'ㅕ', en: 'yeo' },
        { label: 'ㅗ', value: 'ㅗ', en: 'o' },
        { label: 'ㅛ', value: 'ㅛ', en: 'yo' },
        { label: 'ㅜ', value: 'ㅜ', en: 'u' },
        { label: 'ㅠ', value: 'ㅠ', en: 'yu' },
        { label: 'ㅡ', value: 'ㅡ', en: 'eu' },
        { label: 'ㅣ', value: 'ㅣ', en: 'i' }
      ]
    ],
    specialRow: [
      { label: 'ㅐ', value: 'ㅐ', en: 'ae' },
      { label: 'ㅔ', value: 'ㅔ', en: 'e' },
      { label: 'ㅒ', value: 'ㅒ', en: 'yae' },
      { label: 'ㅖ', value: 'ㅖ', en: 'ye' },
      { label: 'ㅘ', value: 'ㅘ', en: 'wa' },
      { label: 'ㅝ', value: 'ㅝ', en: 'wo' },
      { label: 'ㅚ', value: 'ㅚ', en: 'oe' },
      { label: 'ㅟ', value: 'ㅟ', en: 'wi' },
      { label: 'ㅢ', value: 'ㅢ', en: 'ui' }
    ]
  },
  zh: {
    spaceLabel: '空格 (Space)',
    rows: [
      [
        { label: 'ā', value: 'ā', en: 'a1' },
        { label: 'á', value: 'á', en: 'a2' },
        { label: 'ǎ', value: 'ǎ', en: 'a3' },
        { label: 'à', value: 'à', en: 'a4' },
        { label: 'ē', value: 'ē', en: 'e1' },
        { label: 'é', value: 'é', en: 'e2' },
        { label: 'ě', value: 'ě', en: 'e3' },
        { label: 'è', value: 'è', en: 'e4' }
      ],
      [
        { label: 'ī', value: 'ī', en: 'i1' },
        { label: 'í', value: 'í', en: 'i2' },
        { label: 'ǐ', value: 'ǐ', en: 'i3' },
        { label: 'ì', value: 'ì', en: 'i4' },
        { label: 'ō', value: 'ō', en: 'o1' },
        { label: 'ó', value: 'ó', en: 'o2' },
        { label: 'ǒ', value: 'ǒ', en: 'o3' },
        { label: 'ò', value: 'ò', en: 'o4' }
      ],
      [
        { label: 'ū', value: 'ū', en: 'u1' },
        { label: 'ú', value: 'ú', en: 'u2' },
        { label: 'ǔ', value: 'ǔ', en: 'u3' },
        { label: 'ù', value: 'ù', en: 'u4' },
        { label: 'ǖ', value: 'ǖ', en: 'v1' },
        { label: 'ǘ', value: 'ǘ', en: 'v2' },
        { label: 'ǚ', value: 'ǚ', en: 'v3' },
        { label: 'ǜ', value: 'ǜ', en: 'v4' }
      ]
    ],
    specialRow: [
      { label: 'ü', value: 'ü', en: 'v' },
      { label: 'ń', value: 'ń', en: 'n2' },
      { label: 'ň', value: 'ň', en: 'n3' },
      { label: "'", value: "'", en: 'sep' }
    ]
  }
};

const PhoneticKeyboard: React.FC<PhoneticKeyboardProps> = ({ lang, onLetterClick }) => {
  const config = KEYBOARD_LAYOUTS[lang];

  return (
    <div
      className={`russian-keyboard phonetic-keyboard phonetic-keyboard-${lang}`}
      data-script-lang={lang}
      dir="ltr"
      role="group"
      aria-label={`Phonetic virtual keyboard (${lang})`}
    >
      {config.rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((keyItem, i) => (
            <button
              key={`${rowIndex}-${i}-${keyItem.value}`}
              className="keyboard-key"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onLetterClick(keyItem.value)}
              type="button"
              aria-label={`Insert letter ${keyItem.label} — ${keyItem.en}`}
            >
              <span className="key-ru key-script" lang={lang} dir={config.isRtl ? 'rtl' : 'ltr'}>{keyItem.label}</span>{' '}
              <span className="key-en">{keyItem.en}</span>
            </button>
          ))}
        </div>
      ))}

      {config.specialRow.length > 0 && (
        <div className="keyboard-row special-chars-row">
          {config.specialRow.map((charItem, idx) => (
            <button
              key={`special-${idx}-${charItem.value}`}
              className="keyboard-key special-key"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onLetterClick(charItem.value)}
              type="button"
              aria-label={`Insert letter ${charItem.label} — ${charItem.en}`}
            >
              <span className="key-ru key-script" lang={lang} dir={config.isRtl ? 'rtl' : 'ltr'}>{charItem.label}</span>{' '}
              <span className="key-en">{charItem.en}</span>
            </button>
          ))}
        </div>
      )}

      <div className="keyboard-row keyboard-utility-row">
        <button
          className="keyboard-key space-key"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onLetterClick(' ')}
          type="button"
          aria-label={`Space — ${config.spaceLabel.replace(/\s*\([^)]*\)/g, '')}`}
        >
          {config.spaceLabel}
        </button>

        <button
          className="keyboard-key backspace-key"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onLetterClick('backspace')}
          type="button"
          aria-label="Backspace"
        >
          ←
        </button>

        <button
          className="keyboard-key clear-key"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onLetterClick('clear')}
          type="button"
          aria-label="Clear"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default PhoneticKeyboard;

