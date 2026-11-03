import { SupportedLanguageId } from '../data/languages/types';
import { PhraseItem } from '../types/index';
import { CONCEPT_MATRIX } from '../data/conceptMatrix';
import { SUPPORTED_LANGUAGES } from '../data/languages';

export interface NumberMapping {
  digit: number;
  en: string;
  es: string;
  fr: string;
  ru: string;
  pt: string;
  de: string;
  id: string;
  tr: string;
  ja?: string;
  ko?: string;
  zh?: string;
  hi?: string;
  ar?: string;
  [key: string]: any;
  allWords: string[];
}

export const NUMBER_TABLE: Record<number, NumberMapping> = {
  0: { digit: 0, en: 'Zero', es: 'Cero', fr: 'Zéro', ru: 'Ноль', pt: 'Zero', de: 'Null', id: 'Nol', tr: 'Sıfır', zh: '零', hi: 'शून्य', ar: 'صفر', ja: 'ゼロ', ko: '영', bn: 'শূন্য', ur: 'صفر', allWords: ['zero', 'cero', 'zéro', 'ноль', 'нуль', 'null', 'nol', 'sıfır', '0', '零', 'शून्य', 'صفر', '٠', 'ゼロ', '영', 'শূন্য'] },
  1: { digit: 1, en: 'One', es: 'Uno', fr: 'Un', ru: 'Один', pt: 'Um', de: 'Eins', id: 'Satu', tr: 'Bir', zh: '一', hi: 'एक', ar: 'واحد', ja: '一', ko: '일', bn: 'এক', ur: 'ایک', allWords: ['one', 'uno', 'una', 'un', 'une', 'один', 'одна', 'одно', 'um', 'uma', 'eins', 'satu', 'bir', '1', '一', 'एक', 'واحد', '١', '일', 'এক', 'ایک'] },
  2: { digit: 2, en: 'Two', es: 'Dos', fr: 'Deux', ru: 'Два', pt: 'Dois', de: 'Zwei', id: 'Dua', tr: 'İki', zh: '二', hi: 'दो', ar: 'اثنان', ja: '二', ko: '이', bn: 'দুই', ur: 'دو', allWords: ['two', 'dos', 'deux', 'два', 'две', 'dois', 'duas', 'zwei', 'dua', 'iki', '2', '二', '两', 'दो', 'اثنان', '٢', '이', 'দুই', 'دو'] },
  3: { digit: 3, en: 'Three', es: 'Tres', fr: 'Trois', ru: 'Три', pt: 'Três', de: 'Drei', id: 'Tiga', tr: 'Üç', zh: '三', hi: 'तीन', ar: 'ثلاثة', ja: '三', ko: '삼', bn: 'তিন', ur: 'تین', allWords: ['three', 'tres', 'três', 'trois', 'три', 'drei', 'tiga', 'üç', '3', '三', 'तीन', 'ثلاثة', '٣', '삼', 'তিন', 'تین'] },
  4: { digit: 4, en: 'Four', es: 'Cuatro', fr: 'Quatre', ru: 'Четыре', pt: 'Quatro', de: 'Vier', id: 'Empat', tr: 'Dört', zh: '四', hi: 'चार', ar: 'أربعة', ja: '四', ko: '사', bn: 'চার', ur: 'چار', allWords: ['four', 'cuatro', 'quatre', 'четыре', 'quatro', 'vier', 'empat', 'dört', '4', '四', 'चार', 'أربعة', '٤', '사', 'চার', 'چار'] },
  5: { digit: 5, en: 'Five', es: 'Cinco', fr: 'Cinq', ru: 'Пять', pt: 'Cinco', de: 'Fünf', id: 'Lima', tr: 'Beş', zh: '五', hi: 'पाँच', ar: 'خمسة', ja: '五', ko: '오', bn: 'পাঁচ', ur: 'پانچ', allWords: ['five', 'cinco', 'cinq', 'пять', 'fünf', 'lima', 'beş', '5', '五', 'पाँच', 'خمسة', '٥', '오', 'পাঁচ', 'پانچ'] },
  6: { digit: 6, en: 'Six', es: 'Seis', fr: 'Six', ru: 'Шесть', pt: 'Seis', de: 'Sechs', id: 'Enam', tr: 'Altı', zh: '六', hi: 'छह', ar: 'ستة', ja: '六', ko: '육', bn: 'ছয়', ur: 'چھ', allWords: ['six', 'seis', 'шесть', 'sechs', 'enam', 'altı', '6', '六', 'छह', 'ستة', '٦', '육', 'ছয়', 'چھ'] },
  7: { digit: 7, en: 'Seven', es: 'Siete', fr: 'Sept', ru: 'Семь', pt: 'Sete', de: 'Sieben', id: 'Tujuh', tr: 'Yedi', zh: '七', hi: 'सात', ar: 'سبعة', ja: '七', ko: '칠', bn: 'সাত', ur: 'سات', allWords: ['seven', 'siete', 'sept', 'семь', 'sete', 'sieben', 'tujuh', 'yedi', '7', '七', 'सात', 'سبعة', '٧', '칠', 'সাত', 'سات'] },
  8: { digit: 8, en: 'Eight', es: 'Ocho', fr: 'Huit', ru: 'Восемь', pt: 'Oito', de: 'Acht', id: 'Delapan', tr: 'Sekiz', zh: '八', hi: 'आठ', ar: 'ثمانية', ja: '八', ko: '팔', bn: 'আট', ur: 'آٹھ', allWords: ['eight', 'ocho', 'huit', 'восемь', 'oito', 'acht', 'delapan', 'sekiz', '8', '八', 'आठ', 'ثمانية', '٨', '팔', 'আট', 'آٹھ'] },
  9: { digit: 9, en: 'Nine', es: 'Nueve', fr: 'Neuf', ru: 'Девять', pt: 'Nove', de: 'Neun', id: 'Sembilan', tr: 'Dokuz', zh: '九', hi: 'नौ', ar: 'تسعة', ja: '九', ko: '구', bn: 'নয়', ur: 'نو', allWords: ['nine', 'nueve', 'neuf', 'девять', 'nove', 'neun', 'sembilan', 'dokuz', '9', '九', 'नौ', 'تسعة', '٩', '구', 'নয়', 'نو'] },
  10: { digit: 10, en: 'Ten', es: 'Diez', fr: 'Dix', ru: 'Десять', pt: 'Dez', de: 'Zehn', id: 'Sepuluh', tr: 'On', zh: '十', hi: 'दस', ar: 'عشرة', ja: '十', ko: '십', bn: 'দশ', ur: 'دس', allWords: ['ten', 'diez', 'dix', 'десять', 'dez', 'zehn', 'sepuluh', 'on', '10', '十', 'दस', 'عشرة', '١٠', '십', 'দশ', 'دس'] },
  11: { digit: 11, en: 'Eleven', es: 'Once', fr: 'Onze', ru: 'Одиннадцать', pt: 'Onze', de: 'Elf', id: 'Sebelas', tr: 'On bir', zh: '十一', hi: 'ग्यारह', ar: 'أحد عشر', ja: '十一', ko: '십일', bn: 'এগারো', ur: 'گیارہ', allWords: ['eleven', 'once', 'onze', 'одиннадцать', 'elf', 'sebelas', 'on bir', '11', '十一', 'ग्यारह', 'أحد عشر', '십일', 'এগারো', 'گیارہ'] },
  12: { digit: 12, en: 'Twelve', es: 'Doce', fr: 'Douze', ru: 'Двенадцать', pt: 'Doze', de: 'Zwölf', id: 'Dua belas', tr: 'On iki', zh: '十二', hi: 'बारह', ar: 'اثنا عشر', ja: '十二', ko: '십이', bn: 'বারো', ur: 'بارہ', allWords: ['twelve', 'doce', 'douze', 'двенадцать', 'doze', 'zwölf', 'dua belas', 'on iki', '12', '十二', 'बारह', 'اثنا عشر', '십이', 'বারো', 'بارہ'] },
  13: { digit: 13, en: 'Thirteen', es: 'Trece', fr: 'Treize', ru: 'Тринадцать', pt: 'Treze', de: 'Dreizehn', id: 'Tiga belas', tr: 'On üç', zh: '十三', hi: 'तेरह', ar: 'ثلاثة عشر', ja: '十三', ko: '십삼', bn: 'তেরো', ur: 'تیرہ', allWords: ['thirteen', 'trece', 'treize', 'тринадцать', 'treze', 'dreizehn', 'tiga belas', 'on üç', '13', '十三', 'तेरह', 'ثلاثة عشر', '십삼', 'তেরো', 'تیرہ'] },
  14: { digit: 14, en: 'Fourteen', es: 'Catorce', fr: 'Quatorze', ru: 'Четырнадцать', pt: 'Quatorze', de: 'Vierzehn', id: 'Empat belas', tr: 'On dört', zh: '十四', hi: 'चौदह', ar: 'أربعة عشر', ja: '十四', ko: '십사', bn: 'চৌদ্দ', ur: 'چودہ', allWords: ['fourteen', 'catorce', 'quatorze', 'четырнадцать', 'vierzehn', 'empat belas', 'on dört', '14', '十四', 'चौदह', 'أربعة عشر', '십사', 'চৌদ্দ', 'چودہ'] },
  15: { digit: 15, en: 'Fifteen', es: 'Quince', fr: 'Quinze', ru: 'Пятнадцать', pt: 'Quinze', de: 'Fünfzehn', id: 'Lima belas', tr: 'On beş', zh: '十五', hi: 'पंद्रह', ar: 'خمسة عشر', ja: '十五', ko: '십오', bn: 'পনেরো', ur: 'پندرہ', allWords: ['fifteen', 'quince', 'quinze', 'пятнадцать', 'fünfzehn', 'lima belas', 'on beş', '15', '十五', 'पंद्रह', 'خمسة عشر', '십오', 'পনেরো', 'پندرہ'] },
  16: { digit: 16, en: 'Sixteen', es: 'Dieciséis', fr: 'Seize', ru: 'Шестнадцать', pt: 'Dezesseis', de: 'Sechzehn', id: 'Enam belas', tr: 'On altı', zh: '十六', hi: 'सोलह', ar: 'ستة عشر', ja: '十六', ko: '십육', bn: 'ষোলো', ur: 'سولہ', allWords: ['sixteen', 'dieciséis', 'dieciseis', 'seize', 'шестнадцать', 'dezesseis', 'sechzehn', 'enam belas', 'on altı', '16', '十六', 'सोलह', 'ستة عشر', '십육', 'ষোলো', 'سولہ'] },
  17: { digit: 17, en: 'Seventeen', es: 'Diecisiete', fr: 'Dix-sept', ru: 'Семнадцать', pt: 'Dezessete', de: 'Siebzehn', id: 'Tujuh belas', tr: 'On yedi', zh: '十七', hi: 'सत्रह', ar: 'سبعة عشر', ja: '十七', ko: '십칠', bn: 'সতেরো', ur: 'سترہ', allWords: ['seventeen', 'diecisiete', 'dix-sept', 'семнадцать', 'dezessete', 'siebzehn', 'tujuh belas', 'on yedi', '17', '十七', 'सत्रह', 'سبعة عشر', '십칠', 'সতেরো', 'سترہ'] },
  18: { digit: 18, en: 'Eighteen', es: 'Dieciocho', fr: 'Dix-huit', ru: 'Восемнадцать', pt: 'Dezoito', de: 'Achtzehn', id: 'Delapan belas', tr: 'On sekiz', zh: '十八', hi: 'अठारह', ar: 'ثمانية عشر', ja: '十八', ko: '십팔', bn: 'আঠারো', ur: 'اٹھارہ', allWords: ['eighteen', 'dieciocho', 'dix-huit', 'восемнадцать', 'dezoito', 'achtzehn', 'delapan belas', 'on sekiz', '18', '十八', 'अठारह', 'ثمانية عشر', '십팔', 'আঠারো', 'اٹھارہ'] },
  19: { digit: 19, en: 'Nineteen', es: 'Diecinueve', fr: 'Dix-neuf', ru: 'Девятнадцать', pt: 'Dezenove', de: 'Neunzehn', id: 'Sembilan belas', tr: 'On dokuz', zh: '十九', hi: 'उन्नीस', ar: 'تسعة عشر', ja: '十九', ko: '십구', bn: 'উনিশ', ur: 'انیس', allWords: ['nineteen', 'diecinueve', 'dix-neuf', 'девятнадцать', 'dezenove', 'neunzehn', 'sembilan belas', 'on dokuz', '19', '十九', 'उन्नीस', 'تسعة عشر', '십구', 'উনিশ', 'انیس'] },
  20: { digit: 20, en: 'Twenty', es: 'Veinte', fr: 'Vingt', ru: 'Двадцать', pt: 'Vinte', de: 'Zwanzig', id: 'Dua puluh', tr: 'Yirmi', zh: '二十', hi: 'बीस', ar: 'عشرون', ja: '二十', ko: '이십', bn: 'বিশ', ur: 'بیس', allWords: ['twenty', 'veinte', 'vingt', 'двадцать', 'vinte', 'zwanzig', 'dua puluh', 'yirmi', '20', '二十', 'बीस', 'عشرون', '이십', 'বিশ', 'بیس'] },
  30: { digit: 30, en: 'Thirty', es: 'Treinta', fr: 'Trente', ru: 'Тридцать', pt: 'Trinta', de: 'Dreißig', id: 'Tiga puluh', tr: 'Otuz', zh: '三十', hi: 'तीस', ar: 'ثلاثون', ja: '三十', ko: '삼십', bn: 'ত্রিশ', ur: 'تیس', allWords: ['thirty', 'treinta', 'trente', 'тридцать', 'trinta', 'dreißig', 'tiga puluh', 'otuz', '30', '三十', 'तीस', 'ثلاثون', '삼십', 'ত্রিশ', 'تیس'] },
  40: { digit: 40, en: 'Forty', es: 'Cuarenta', fr: 'Quarante', ru: 'Сорок', pt: 'Quarenta', de: 'Vierzig', id: 'Empat puluh', tr: 'Kırk', zh: '四十', hi: 'चालीस', ar: 'أربعون', ja: '四十', ko: '사십', bn: 'চল্লিশ', ur: 'چالیس', allWords: ['forty', 'cuarenta', 'quarante', 'сорок', 'quarenta', 'vierzig', 'empat puluh', 'kırk', '40', '四十', 'चालीस', 'أربعون', '사십', 'চল্লিশ', 'چالیس'] },
  50: { digit: 50, en: 'Fifty', es: 'Cincuenta', fr: 'Cinquante', ru: 'Пятьдесят', pt: 'Cinquenta', de: 'Fünfzig', id: 'Lima puluh', tr: 'Elli', zh: '五十', hi: 'पचास', ar: 'خمسون', ja: '五十', ko: '오십', bn: 'পঞ্চাশ', ur: 'پچاس', allWords: ['fifty', 'cincuenta', 'cinquante', 'пятьдесят', 'cinquenta', 'fünfzig', 'lima puluh', 'elli', '50', '五十', 'पचास', 'خمسون', '오십', 'পঞ্চাশ', 'پچاس'] },
  60: { digit: 60, en: 'Sixty', es: 'Sesenta', fr: 'Soixante', ru: 'Шестьдесят', pt: 'Sessenta', de: 'Sechzig', id: 'Enam puluh', tr: 'Altmış', zh: '六十', hi: 'साठ', ar: 'ستون', ja: '六十', ko: '육십', bn: 'ষাট', ur: 'ساٹھ', allWords: ['sixty', 'sesenta', 'soixante', 'шестьдесят', 'sessenta', 'sechzig', 'enam puluh', 'altmış', '60', '六十', 'साठ', 'ستون', '육십', 'ষাট', 'ساٹھ'] },
  70: { digit: 70, en: 'Seventy', es: 'Setenta', fr: 'Soixante-dix', ru: 'Семьдесят', pt: 'Setenta', de: 'Siebzig', id: 'Tujuh puluh', tr: 'Yetmiş', zh: '七十', hi: 'सत्तर', ar: 'سبعون', ja: '七十', ko: '칠십', bn: 'সত্তর', ur: 'ستر', allWords: ['seventy', 'setenta', 'soixante-dix', 'семьдесят', 'siebzig', 'tujuh puluh', 'yetmiş', '70', '七十', 'सत्तर', 'سبعون', '칠십', 'সত্তর', 'ستر'] },
  80: { digit: 80, en: 'Eighty', es: 'Ochenta', fr: 'Quatre-vingts', ru: 'Восемьдесят', pt: 'Oitenta', de: 'Achtzig', id: 'Delapan puluh', tr: 'Seksen', zh: '八十', hi: 'अस्सी', ar: 'ثمانون', ja: '八十', ko: '팔십', bn: 'আশি', ur: 'اسی', allWords: ['eighty', 'ochenta', 'quatre-vingts', 'quatre-vingt', 'восемьдесят', 'oitenta', 'achtzig', 'delapan puluh', 'seksen', '80', '八十', 'अस्सी', 'ثمانون', '팔십', 'আশি', 'اسی'] },
  90: { digit: 90, en: 'Ninety', es: 'Noventa', fr: 'Quatre-vingt-dix', ru: 'Девяносто', pt: 'Noventa', de: 'Neunzig', id: 'Sembilan puluh', tr: 'Doksan', zh: '九十', hi: 'नब्बे', ar: 'تسعون', ja: '九十', ko: '구십', bn: 'নব্বই', ur: 'نوے', allWords: ['ninety', 'noventa', 'quatre-vingt-dix', 'девяносто', 'neunzig', 'sembilan puluh', 'doksan', '90', '九十', 'नब्बे', 'تسعون', '구십', 'নব্বই', 'نوے'] },
  100: { digit: 100, en: 'One hundred', es: 'Cien', fr: 'Cent', ru: 'Сто', pt: 'Cem', de: 'Hundert', id: 'Seratus', tr: 'Yüz', zh: '一百', hi: 'सौ', ar: 'مئة', ja: '百', ko: '백', bn: 'একশো', ur: 'سو', allWords: ['hundred', 'one hundred', 'a hundred', 'cien', 'ciento', 'cent', 'сто', 'cem', 'hundert', 'einhundert', 'seratus', 'yüz', '100', '一百', 'सौ', 'مئة', 'مائة', '百', '백', 'একশো', 'سو'] },
  1000: { digit: 1000, en: 'One thousand', es: 'Mil', fr: 'Mille', ru: 'Тысяча', pt: 'Mil', de: 'Tausend', id: 'Seribu', tr: 'Bin', zh: '一千', hi: 'हज़ार', ar: 'ألف', ja: '千', ko: '천', bn: 'এক হাজার', ur: 'ایک ہزار', allWords: ['thousand', 'one thousand', 'a thousand', 'mil', 'mille', 'тысяча', 'tausend', 'eintausend', 'seribu', 'bin', '1000', '一千', 'हज़ार', 'ألف', '千', '천', 'এক হাজার', 'ایک ہزار'] }


};

export const EXTENDED_DICTIONARY: Record<string, Partial<Record<SupportedLanguageId, string>>> = {
  // People & Family
  'man': { en: 'Man', es: 'Hombre', fr: 'Homme', ru: 'Мужчина', pt: 'Homem', de: 'Mann', id: 'Pria', tr: 'Erkek', ko: '남자', ja: '男性 / 男の人', zh: '男人', hi: 'पुरुष / आदमी', ar: 'رجل' },
  'woman': { en: 'Woman', es: 'Mujer', fr: 'Femme', ru: 'Женщина', pt: 'Mulher', de: 'Frau', id: 'Wanita', tr: 'Kadın', ko: '여자', ja: '女性 / 女の人', zh: '女人', hi: 'महिला / औरत', ar: 'امرأة' },
  'child': { en: 'Child', es: 'Niño / Niña', fr: 'Enfant', ru: 'Ребёнок', pt: 'Criança', de: 'Kind', id: 'Anak', tr: 'Çocuk', ko: '아이 / 어린이', ja: '子供', zh: '孩子', hi: 'बच्चा', ar: 'طفل' },
  'boy': { en: 'Boy', es: 'Niño / Chico', fr: 'Garçon', ru: 'Мальчик', pt: 'Menino', de: 'Junge', id: 'Anak laki-laki', tr: 'Erkek çocuk', ko: '소년 / 남자아이', ja: '男の子', zh: '男孩', hi: 'लड़का', ar: 'ولد' },
  'girl': { en: 'Girl', es: 'Niña / Chica', fr: 'Fille', ru: 'Девочка', pt: 'Menina', de: 'Mädchen', id: 'Anak perempuan', tr: 'Kız çocuk', ko: '소녀 / 여자아이', ja: '女の子', zh: '女孩', hi: 'लड़की', ar: 'بنت / فتاة' },
  'friend': { en: 'Friend', es: 'Amigo', fr: 'Ami', ru: 'Друг', pt: 'Amigo', de: 'Freund', id: 'Teman', tr: 'Arkadaş', ko: '친구', ja: '友達', zh: '朋友', hi: 'दोस्त / मित्र', ar: 'صديق' },
  'family': { en: 'Family', es: 'Familia', fr: 'Famille', ru: 'Семья', pt: 'Família', de: 'Familie', id: 'Keluarga', tr: 'Aile', ko: '가족', ja: '家族', zh: '家庭 / 家人', hi: 'परिवार', ar: 'عائلة / أسرة' },
  'father': { en: 'Father', es: 'Padre', fr: 'Père', ru: 'Отец', pt: 'Pai', de: 'Vater', id: 'Ayah', tr: 'Baba', ko: '아버지', ja: 'お父さん', zh: '父亲', hi: 'पिता / पापा', ar: 'أب' },
  'father / dad': { en: 'Father / Dad', es: 'Padre / Papá', fr: 'Père / Papa', ru: 'Папа / Отец', pt: 'Pai', de: 'Vater / Papa', id: 'Ayah', tr: 'Baba', ko: '아버지', ja: 'お父さん', hi: 'पिता / पापा', ar: 'أب / والد' },
  'mother': { en: 'Mother', es: 'Madre', fr: 'Mère', ru: 'Мать', pt: 'Mãe', de: 'Mutter', id: 'Ibu', tr: 'Anne', ko: '어머니', ja: 'お母さん', zh: '母亲', hi: 'माता / माँ', ar: 'أم' },
  'mother / mom': { en: 'Mother / Mom', es: 'Madre / Mamá', fr: 'Mère / Maman', ru: 'Мама / Мать', pt: 'Mãe', de: 'Mutter / Mama', id: 'Ibu', tr: 'Anne', ko: '어머니', ja: 'お母さん', hi: 'माता / माँ', ar: 'أم / والدة' },
  'mom': { en: 'Mom', es: 'Mamá', fr: 'Maman', ru: 'Мама', pt: 'Mãe', de: 'Mama', id: 'Ibu', tr: 'Anne', ko: '엄마', ja: 'お母さん / ママ', zh: '妈妈', hi: 'माँ', ar: 'ماما / أمي' },
  'husband': { en: 'Husband', es: 'Esposo / Marido', fr: 'Mari', ru: 'Муж', pt: 'Marido', de: 'Ehemann', id: 'Suami', tr: 'Eş / Koca', ko: '남편', ja: '夫 / 主人', zh: '丈夫 / 老公', hi: 'पति', ar: 'زوج' },
  'wife': { en: 'Wife', es: 'Esposa / Mujer', fr: 'Femme / Épouse', ru: 'Жена', pt: 'Esposa', de: 'Ehefrau', id: 'Istri', tr: 'Eş / Karı', ko: '아내', ja: '妻 / 家内', zh: '妻子 / 老婆', hi: 'पत्नी', ar: 'زوجة' },
  'teacher': { en: 'Teacher', es: 'Profesor / Maestro', fr: 'Enseignant', ru: 'Учитель', pt: 'Professor', de: 'Lehrer', id: 'Guru', tr: 'Öğretmen', ko: '선생님', ja: '先生', zh: '老师', hi: 'शिक्षक / अध्यापक', ar: 'معلم / أستاذ' },
  'student': { en: 'Student', es: 'Estudiante / Alumno', fr: 'Étudiant', ru: 'Студент', pt: 'Estudante', de: 'Student', id: 'Pelajar', tr: 'Öğrenci', ko: '학생', ja: '学生', zh: '学生', hi: 'छात्र / विद्यार्थी', ar: 'طالب' },
  'doctor': { en: 'Doctor', es: 'Médico / Doctor', fr: 'Médecin / Docteur', ru: 'Врач / Доктор', pt: 'Médico', de: 'Arzt', id: 'Dokter', tr: 'Doktor', ko: '의사', ja: '医者', zh: '医生', hi: 'डॉक्टर / चिकित्सक', ar: 'طبيب / دكتور' },
  'we': { en: 'We', es: 'Nosotros', fr: 'Nous', ru: 'Мы', pt: 'Nós', de: 'Wir', id: 'Kami', tr: 'Biz', ko: '우리', ja: '私たち', zh: '我们', hi: 'हम', ar: 'نحن' },

  // Food & Drink
  'water': { en: 'Water', es: 'Agua', fr: 'Eau', ru: 'Вода', pt: 'Água', de: 'Wasser', id: 'Air', tr: 'Su', ko: '물', ja: '水', zh: '水', hi: 'पानी', ar: 'ماء' },
  'bread': { en: 'Bread', es: 'Pan', fr: 'Pain', ru: 'Хлеб', pt: 'Pão', de: 'Brot', id: 'Roti', tr: 'Ekmek', ko: '빵', ja: 'パン', zh: '面包', hi: 'रोटी / ब्रेड', ar: 'خبز' },
  'food': { en: 'Food / Meal', es: 'Comida', fr: 'Nourriture', ru: 'Еда', pt: 'Comida', de: 'Essen', id: 'Makanan', tr: 'Yemek', ko: '음식', ja: '食べ物', zh: '食物', hi: 'खाना / भोजन', ar: 'طعام' },
  'milk': { en: 'Milk', es: 'Leche', fr: 'Lait', ru: 'Молоко', pt: 'Leite', de: 'Milch', id: 'Susu', tr: 'Süt', ko: '우유', ja: '牛乳', zh: '牛奶', hi: 'दूध', ar: 'حليب' },
  'meat': { en: 'Meat', es: 'Carne', fr: 'Viande', ru: 'Мясо', pt: 'Carne', de: 'Fleisch', id: 'Daging', tr: 'Et', ko: '고기', ja: '肉', zh: '肉', hi: 'माँस', ar: 'لحم' },
  'fish': { en: 'Fish', es: 'Pescado', fr: 'Poisson', ru: 'Рыба', pt: 'Peixe', de: 'Fisch', id: 'Ikan', tr: 'Balık', ko: '생선', ja: '魚', zh: '鱼', hi: 'मछली', ar: 'سمك' },
  'vegetables': { en: 'Vegetables', es: 'Verduras', fr: 'Légumes', ru: 'Овощи', pt: 'Legumes', de: 'Gemüse', id: 'Sayuran', tr: 'Sebzeler', ko: '채소들', ja: '野菜', zh: '蔬菜', hi: 'सब्ज़ियाँ', ar: 'خضروات' },
  'fruits': { en: 'Fruits', es: 'Frutas', fr: 'Fruits', ru: 'Фрукты', pt: 'Frutas', de: 'Obst', id: 'Buah-buahan', tr: 'Meyveler', ko: '과일들', ja: '果物', zh: '水果', hi: 'फल', ar: 'فواكه' },
  'fruit': { en: 'Fruit', es: 'Fruta', fr: 'Fruit', ru: 'Фрукт / Фрукты', pt: 'Fruta', de: 'Frucht', id: 'Buah', tr: 'Meyve', ko: '과일', ja: '果物', zh: '水果', hi: 'फल', ar: 'فاكهة' },
  'banana': { en: 'Banana', es: 'Plátano / Banana', fr: 'Banane', ru: 'Банан', pt: 'Banana', de: 'Banane', id: 'Pisang', tr: 'Muz', ko: '바나나', ja: 'バナナ', zh: '香蕉', hi: 'केला', ar: 'موز' },
  'rice': { en: 'Rice', es: 'Arroz', fr: 'Riz', ru: 'Рис', pt: 'Arroz', de: 'Reis', id: 'Nasi', tr: 'Pirinç', ko: '쌀 / 밥', ja: '米 / ご飯', zh: '米饭', hi: 'चावल', ar: 'أرز' },
  'rice cake': { en: 'Rice cake', es: 'Pastel de arroz', fr: 'Gâteau de riz', ru: 'Рисовый пирожок', pt: 'Bolo de arroz', de: 'Reiskuchen', id: 'Kue beras', tr: 'Pirinç keki', ko: '떡', ja: '餅 / お餅', zh: '年糕', hi: 'चावल की टिकिया', ar: 'كعكة أرز' },
  'bridge': { en: 'Bridge', es: 'Puente', fr: 'Pont', ru: 'Мост', pt: 'Ponte', de: 'Brücke', id: 'Jembatan', tr: 'Köprü', ko: '다리', ja: '橋', zh: '桥', hi: 'पुल', ar: 'جسر' },
  'stew': { en: 'Stew', es: 'Guiso', fr: 'Ragoût', ru: 'Рагу', pt: 'Ensopado', de: 'Eintopf', id: 'Sup kental', tr: 'Güveç', ko: '찌개', ja: 'シチュー', zh: '炖菜 / 砂锅', hi: 'गाढ़ा सूप / स्टू', ar: 'يخنة' },
  'radio': { en: 'Radio', es: 'Radio', fr: 'Radio', ru: 'Радио', pt: 'Rádio', de: 'Radio', id: 'Radio', tr: 'Radyo', ko: '라디오', ja: 'ラジオ', zh: '收音机', hi: 'रेडियो', ar: 'راديو / مذياع' },
  'desk': { en: 'Desk', es: 'Escritorio', fr: 'Bureau', ru: 'Письменный стол', pt: 'Escrivaninha', de: 'Schreibtisch', id: 'Meja tulis', tr: 'Çalışma masası', ko: '책상', ja: '机', zh: '书桌', hi: 'लेखन मेज़ / डेस्क', ar: 'مكتب / طاولة عمل' },
  'music': { en: 'Music', es: 'Música', fr: 'Musique', ru: 'Музыка', pt: 'Música', de: 'Musik', id: 'Musik', tr: 'Müzik', ko: '음악', ja: '音楽', zh: '音乐', hi: 'संगीत', ar: 'موسيقى' },
  'coffee': { en: 'Coffee', es: 'Café', fr: 'Café', ru: 'Кофе', pt: 'Café', de: 'Kaffee', id: 'Kopi', tr: 'Kahve', ko: '커피', ja: 'コーヒー', zh: '咖啡', hi: 'कॉफ़ी', ar: 'قهوة' },
  'tea': { en: 'Tea', es: 'Té', fr: 'Thé', ru: 'Чай', pt: 'Chá', de: 'Tee', id: 'Teh', tr: 'Çay', ko: '차', ja: 'お茶', zh: '茶', hi: 'चाय', ar: 'شاي' },
  'beer': { en: 'Beer', es: 'Cerveza', fr: 'Bière', ru: 'Пиво', pt: 'Cerveja', de: 'Bier', id: 'Bir', tr: 'Bira', ko: '맥주', ja: 'ビール', zh: '啤酒', hi: 'बीयर', ar: 'بيرة' },
  'wine': { en: 'Wine', es: 'Vino', fr: 'Vin', ru: 'Вино', pt: 'Vinho', de: 'Wein', id: 'Anggur', tr: 'Şarap', ko: '와인 / 포도주', ja: 'ワイン', zh: '红酒 / 葡萄酒', hi: 'शराब / वाइन', ar: 'نبيذ' },
  'breakfast': { en: 'Breakfast', es: 'Desayuno', fr: 'Petit-déjeuner', ru: 'Завтрак', pt: 'Café da manhã', de: 'Frühstück', id: 'Sarapan', tr: 'Kahvaltı', ko: '아침 식사', ja: '朝食', zh: '早餐', hi: 'नाश्ता / सुबह का जलपान', ar: 'فطور' },
  'lunch': { en: 'Lunch', es: 'Almuerzo', fr: 'Déjeuner', ru: 'Обед', pt: 'Almoço', de: 'Mittagessen', id: 'Makan siang', tr: 'Öğle yemeği', ko: '점심 식사', ja: '昼食', zh: '午餐', hi: 'दोपहर का भोजन / लंच', ar: 'غداء' },
  'dinner': { en: 'Dinner', es: 'Cena', fr: 'Dîner', ru: 'Ужин', pt: 'Jantar', de: 'Abendessen', id: 'Makan malam', tr: 'Akşam yemeği', ko: '저녁 식사', ja: '夕食', zh: '晚餐', hi: 'रात का भोजन / डिनर', ar: 'عشاء' },
  'salt': { en: 'Salt', es: 'Sal', fr: 'Sel', ru: 'Соль', pt: 'Sal', de: 'Salz', id: 'Garam', tr: 'Tuz', ko: '소금', ja: '塩', zh: '盐', hi: 'नमक', ar: 'ملح' },

  // Places & Travel
  'store': { en: 'Store / Shop', es: 'Tienda', fr: 'Magasin', ru: 'Магазин', pt: 'Loja', de: 'Geschäft', id: 'Toko', tr: 'Mağaza', ko: '가게 / 상점', ja: '店', zh: '商店', hi: 'दुकान', ar: 'متجر' },
  'shop': { en: 'Store / Shop', es: 'Tienda', fr: 'Magasin', ru: 'Магазин', pt: 'Loja', de: 'Geschäft', id: 'Toko', tr: 'Mağaza', ko: '가게 / 상점', ja: '店', zh: '商店', hi: 'दुकान', ar: 'محل' },
  'shop / store': { en: 'Store / Shop', es: 'Tienda', fr: 'Magasin', ru: 'Магазин', pt: 'Loja', de: 'Geschäft', id: 'Toko', tr: 'Mağaza', ko: '가게 / 상점', ja: '店', zh: '商店', hi: 'दुकान', ar: 'محل / متجر' },
  'restaurant': { en: 'Restaurant', es: 'Restaurante', fr: 'Restaurant', ru: 'Ресторан', pt: 'Restaurante', de: 'Restaurant', id: 'Restoran', tr: 'Restoran', ko: '식당 / 레스토랑', ja: 'レストラン', zh: '餐厅 / 饭馆', hi: 'रेस्तरां / भोजनालय', ar: 'مطعم' },
  'hotel': { en: 'Hotel', es: 'Hotel', fr: 'Hôtel', ru: 'Гостиница / Отель', pt: 'Hotel', de: 'Hotel', id: 'Hotel', tr: 'Otel', ko: '호텔', ja: 'ホテル', zh: '酒店', hi: 'होटल', ar: 'فندق' },
  'station': { en: 'Station', es: 'Estación', fr: 'Gare / Station', ru: 'Станция / Вокзал', pt: 'Estação', de: 'Bahnhof', id: 'Stasiun', tr: 'İstasyon', ko: '역', ja: '駅', zh: '车站', hi: 'स्टेशन', ar: 'محطة' },
  'airport': { en: 'Airport', es: 'Aeropuerto', fr: 'Aéroport', ru: 'Аэропорт', pt: 'Aeroporto', de: 'Flughafen', id: 'Bandara', tr: 'Havalimanı', ko: '공항', ja: '空港', zh: '机场', hi: 'हवाई अड्डा', ar: 'مطار' },
  'street': { en: 'Street', es: 'Calle', fr: 'Rue', ru: 'Улица', pt: 'Rua', de: 'Straße', id: 'Jalan', tr: 'Sokak', ko: '거리 / 길', ja: '通り / 道', zh: '街道', hi: 'सड़क / रास्ता', ar: 'شارع' },
  'square': { en: 'Square (plaza)', es: 'Plaza', fr: 'Place', ru: 'Площадь', pt: 'Praça', de: 'Platz', id: 'Alun-alun', tr: 'Meydan', ko: '광장', ja: '広場', zh: '广场', hi: 'चौक / मैदान', ar: 'ميدان' },
  'square (plaza)': { en: 'Square (plaza)', es: 'Plaza', fr: 'Place', ru: 'Площадь', pt: 'Praça', de: 'Platz', id: 'Alun-alun', tr: 'Meydan', zh: '广场', hi: 'चौक / मैदान', ar: 'ميدان' },
  'park': { en: 'Park', es: 'Parque', fr: 'Parc', ru: 'Парк', pt: 'Parque', de: 'Park', id: 'Taman', tr: 'Park', ko: '공원', ja: '公園', zh: '公园', hi: 'पार्क / बगीचा', ar: 'حديقة / متنزه' },
  'hospital': { en: 'Hospital', es: 'Hospital', fr: 'Hôpital', ru: 'Больница', pt: 'Hospital', de: 'Krankenhaus', id: 'Rumah sakit', tr: 'Hastane', ko: '병원', ja: '病院', zh: '医院', hi: 'अस्पताल', ar: 'مستشفى' },
  'pharmacy': { en: 'Pharmacy', es: 'Farmacia', fr: 'Pharmacie', ru: 'Аптека', pt: 'Farmácia', de: 'Apotheke', id: 'Apotek', tr: 'Eczane', ko: '약국', ja: '薬局', zh: '药店', hi: 'दवाखाना', ar: 'صيدلية' },
  'bank': { en: 'Bank', es: 'Banco', fr: 'Banque', ru: 'Банк', pt: 'Banco', de: 'Bank', id: 'Bank', tr: 'Banka', ko: '은행', ja: '銀行', zh: '银行', hi: 'बैंक', ar: 'بنك / مصرف' },
  'post office': { en: 'Post office', es: 'Oficina de correos', fr: 'Bureau de poste', ru: 'Почта', pt: 'Correios', de: 'Postamt', id: 'Kantor pos', tr: 'Postane', ko: '우체국', ja: '郵便局', zh: '邮局', hi: 'डाकघर', ar: 'مكتب بريد' },
  'supermarket': { en: 'Supermarket', es: 'Supermercado', fr: 'Supermarché', ru: 'Супермаркет', pt: 'Supermercado', de: 'Supermarkt', id: 'Supermarket', tr: 'Süpermarket', ko: '슈퍼마켓 / 마트', ja: 'スーパー', zh: '超市', hi: 'सुपरमार्केट / बाज़ार', ar: 'سوبرماركت' },
  'police': { en: 'Police', es: 'Policía', fr: 'Police', ru: 'Полиция', pt: 'Polícia', de: 'Polizei', id: 'Polisi', tr: 'Polis', ko: '경찰', ja: '警察', zh: '警察', hi: 'पुलिस', ar: 'شرطة' },
  'museum': { en: 'Museum', es: 'Museo', fr: 'Musée', ru: 'Музей', pt: 'Museu', de: 'Museum', id: 'Museum', tr: 'Müze', ko: '박물관', ja: '博物館', zh: '博物馆', hi: 'संग्रहालय / म्यूज़ियम', ar: 'متحف' },
  'theater': { en: 'Theater', es: 'Teatro', fr: 'Théâtre', ru: 'Театр', pt: 'Teatro', de: 'Theater', id: 'Teater', tr: 'Tiyatro', ko: '극장', ja: '劇場', zh: '剧院', hi: 'रंगमंच / थिएटर', ar: 'مسرح' },
  'cinema': { en: 'Cinema', es: 'Cine', fr: 'Cinéma', ru: 'Кино / Кинотеатр', pt: 'Cinema', de: 'Kino', id: 'Bioskop', tr: 'Sinema', ko: '영화관', ja: '映画館', zh: '电影院', hi: 'सिनेमाघर / सिनेमा', ar: 'سينما' },
  'city': { en: 'City', es: 'Ciudad', fr: 'Ville', ru: 'Город', pt: 'Cidade', de: 'Stadt', id: 'Kota', tr: 'Şehir', ko: '도시', ja: '都市 / 町', zh: '城市', hi: 'शहर', ar: 'مدينة' },
  'country': { en: 'Country', es: 'País', fr: 'Pays', ru: 'Страна', pt: 'País', de: 'Land', id: 'Negara', tr: 'Ülke', ko: '나라 / 국가', ja: '国', zh: '国家', hi: 'देश', ar: 'بلد / دولة' },
  'house': { en: 'House / Home', es: 'Casa', fr: 'Maison', ru: 'Дом', pt: 'Casa', de: 'Haus', id: 'Rumah', tr: 'Ev', ko: '집', ja: '家', zh: '房子', hi: 'घर / मकान', ar: 'بيت' },
  'home': { en: 'Home / House', es: 'Casa', fr: 'Maison', ru: 'Дом', pt: 'Casa', de: 'Haus', id: 'Rumah', tr: 'Ev', ko: '집 / 가정', ja: '我が家', zh: '家', hi: 'घर / मकान', ar: 'بيت / منزل' },
  'car': { en: 'Car', es: 'Carro / Coche', fr: 'Voiture', ru: 'Машина', pt: 'Carro', de: 'Auto', id: 'Mobil', tr: 'Araba', ko: '자동차 / 차', ja: '車 / 自動車', zh: '汽车', hi: 'गाड़ी / कार', ar: 'سيارة' },
  'train': { en: 'Train', es: 'Tren', fr: 'Train', ru: 'Поезд', pt: 'Trem', de: 'Zug', id: 'Kereta', tr: 'Tren', ko: '기차 / 열차', ja: '電車 / 列車', zh: '火车', hi: 'ट्रेन / रेलगाड़ी', ar: 'قطار' },
  'bus': { en: 'Bus', es: 'Autobús', fr: 'Bus', ru: 'Автобус', pt: 'Ônibus', de: 'Bus', id: 'Bus', tr: 'Otobüs', ko: '버스', ja: 'バス', zh: '公交车', hi: 'बस', ar: 'حافلة / باص' },
  'airplane': { en: 'Airplane', es: 'Avión', fr: 'Avion', ru: 'Самолёт', pt: 'Avião', de: 'Flugzeug', id: 'Pesawat', tr: 'Uçak', ko: '비행기', ja: '飛行機', zh: '飞机', hi: 'हवाई जहाज़ / विमान', ar: 'طائرة' },
  'taxi': { en: 'Taxi', es: 'Taxi', fr: 'Taxi', ru: 'Такси', pt: 'Táxi', de: 'Taxi', id: 'Taksi', tr: 'Taksi', ko: '택시', ja: 'タクシー', zh: '出租车', hi: 'टैक्सी', ar: 'تاكسي / سيارة أجرة' },
  'subway / metro': { en: 'Subway / Metro', es: 'Metro', fr: 'Métro', ru: 'Метро', pt: 'Metrô', de: 'U-Bahn', id: 'Metro', tr: 'Metro', ko: '지하철', ja: '地下鉄', zh: '地铁', hi: 'मेट्रो', ar: 'مترو' },
  'subway': { en: 'Subway', es: 'Metro', fr: 'Métro', ru: 'Метро', pt: 'Metrô', de: 'U-Bahn', id: 'Metro', tr: 'Metro', ko: '지하철', ja: '地下鉄', zh: '地铁', hi: 'मेट्रो / सबवे', ar: 'مترو الأنفاق' },
  'map': { en: 'Map', es: 'Mapa', fr: 'Carte / Plan', ru: 'Карта', pt: 'Mapa', de: 'Karte', id: 'Peta', tr: 'Harita', ko: '지도', ja: '地図', zh: '地图', hi: 'नक्शा / मानचित्र', ar: 'خريطة' },
  'visa': { en: 'Visa', es: 'Visa / Visado', fr: 'Visa', ru: 'Виза', pt: 'Visto', de: 'Visum', id: 'Visa', tr: 'Vize', ko: '비자', ja: 'ビザ / 査証', zh: '签证', hi: 'वीज़ा', ar: 'تأشيرة' },
  'center': { en: 'Center', es: 'Centro', fr: 'Centre', ru: 'Центр', pt: 'Centro', de: 'Zentrum', id: 'Pusat', tr: 'Merkez', ko: '중심 / 센터', ja: '中心 / センター', zh: '中心', hi: 'केंद्र / मध्य', ar: 'مركز' },
  'factory': { en: 'Factory', es: 'Fábrica', fr: 'Usine', ru: 'Завод', pt: 'Fábrica', de: 'Fabrik', id: 'Pabrik', tr: 'Fabrika', ko: '공장', ja: '工場', zh: '工厂', hi: 'कारख़ाना / फ़ैक्ट्री', ar: 'مصنع' },
  'sea': { en: 'Sea', es: 'Mar', fr: 'Mer', ru: 'Море', pt: 'Mar', de: 'Meer', id: 'Laut', tr: 'Deniz', ko: '바다', ja: '海', zh: '大海', hi: 'समुद्र / सागर', ar: 'بحر' },

  // Everyday Essentials & Objects
  'money': { en: 'Money', es: 'Dinero', fr: 'Argent', ru: 'Деньги', pt: 'Dinheiro', de: 'Geld', id: 'Uang', tr: 'Para', ko: '돈', ja: 'お金', zh: '钱', hi: 'पैसे / रुपया', ar: 'نقود / مال' },
  'ticket': { en: 'Ticket', es: 'Boleto / Billete', fr: 'Billet', ru: 'Билет', pt: 'Passagem', de: 'Ticket', id: 'Tiket', tr: 'Bilet', ko: '표 / 티켓', ja: '切符 / チケット', zh: '车票 / 门票', hi: 'टिकट', ar: 'تذكرة' },
  'passport': { en: 'Passport', es: 'Pasaporte', fr: 'Passeport', ru: 'Паспорт', pt: 'Passaporte', de: 'Reisepass', id: 'Paspor', tr: 'Pasaport', ko: '여권', ja: 'パスポート', zh: '护照', hi: 'पासपोर्ट', ar: 'جواز سفر' },
  'phone': { en: 'Phone', es: 'Teléfono', fr: 'Téléphone', ru: 'Телефон', pt: 'Telefone', de: 'Telefon', id: 'Telepon', tr: 'Telefon', ko: '전화기 / 스마트폰', ja: '電話 / スマホ', zh: '手机', hi: 'फ़ोन / मोबाइल', ar: 'هاتف' },
  'telephone': { en: 'Telephone', es: 'Teléfono', fr: 'Téléphone', ru: 'Телефон', pt: 'Telefone', de: 'Telefon', id: 'Telepon', tr: 'Telefon', ko: '전화기', ja: '電話', zh: '电话', hi: 'टेलीफ़ोन / फ़ोन', ar: 'هاتف' },
  'computer': { en: 'Computer', es: 'Computadora', fr: 'Ordinateur', ru: 'Компьютер', pt: 'Computador', de: 'Computer', id: 'Komputer', tr: 'Bilgisayar', ko: '컴퓨터', ja: 'コンピューター', zh: '电脑', hi: 'कंप्यूटर / संगणक', ar: 'حاسوب / كمبيوتر' },
  'book': { en: 'Book', es: 'Libro', fr: 'Livre', ru: 'Книга', pt: 'Livro', de: 'Buch', id: 'Buku', tr: 'Kitap', ko: '책', ja: '本', zh: '书', hi: 'किताब / पुस्तक', ar: 'كتاب' },
  'magazine': { en: 'Magazine', es: 'Revista', fr: 'Magazine', ru: 'Журнал', pt: 'Revista', de: 'Zeitschrift', id: 'Majalah', tr: 'Dergi', ko: '잡지', ja: '雑誌', zh: '杂志', hi: 'पत्रिका / मैगज़ीन', ar: 'مجلة' },
  'help': { en: 'Help', es: 'Ayuda', fr: 'Aide', ru: 'Помощь', pt: 'Ajuda', de: 'Hilfe', id: 'Bantuan', tr: 'Yardım', ko: '도움', ja: '助け', zh: '帮助', hi: 'मदद', ar: 'مساعدة' },
  'time': { en: 'Time', es: 'Tiempo / Hora', fr: 'Temps / Heure', ru: 'Время', pt: 'Tempo', de: 'Zeit', id: 'Waktu', tr: 'Zaman', ko: '시간', ja: '時間', zh: '时间', ar: 'وقت' },
  'work': { en: 'Work / Job', es: 'Trabajo', fr: 'Travail', ru: 'Работа', pt: 'Trabalho', de: 'Arbeit', id: 'Pekerjaan', tr: 'İş', ko: '일 / 작업', ja: '仕事', zh: '工作', hi: 'काम / नौकरी', ar: 'عمل' },
  'office': { en: 'Office', es: 'Oficina', fr: 'Bureau', ru: 'Офис', pt: 'Escritório', de: 'Büro', id: 'Kantor', tr: 'Ofis', ko: '사무실', ja: '事務所 / オフィス', zh: '办公室', hi: 'कार्यालय / दफ़्तर', ar: 'مكتب' },
  'card': { en: 'Card', es: 'Tarjeta', fr: 'Carte', ru: 'Карта / Карточка', pt: 'Cartão', de: 'Karte', id: 'Kartu', tr: 'Kart', ko: '카드', ja: 'カード', zh: '卡片', hi: 'कार्ड / ताश', ar: 'بطاقة' },
  'table': { en: 'Table', es: 'Mesa', fr: 'Table', ru: 'Стол', pt: 'Mesa', de: 'Tisch', id: 'Meja', tr: 'Masa', ko: '탁자 / 테이블', ja: 'テーブル / 机', zh: '桌子', hi: 'मेज़', ar: 'طاولة' },
  'chair': { en: 'Chair', es: 'Silla', fr: 'Chaise', ru: 'Стул', pt: 'Cadeira', de: 'Stuhl', id: 'Kursi', tr: 'Sandalye', ko: '의자', ja: '椅子', zh: '椅子', hi: 'कुर्सी', ar: 'كرسي' },
  'door': { en: 'Door', es: 'Puerta', fr: 'Porte', ru: 'Дверь', pt: 'Porta', de: 'Tür', id: 'Pintu', tr: 'Kapı', ko: '문', ja: 'ドア / 扉', zh: '门', hi: 'दरवाज़ा', ar: 'باب' },
  'bag': { en: 'Bag', es: 'Bolsa / Maleta', fr: 'Sac', ru: 'Сумка', pt: 'Bolsa', de: 'Tasche', id: 'Tas', tr: 'Çanta', ko: '가방', ja: 'バッグ / 鞄', zh: '包', hi: 'थैला / बैग', ar: 'حقيبة' },
  'clothes': { en: 'Clothes', es: 'Ropa', fr: 'Vêtements', ru: 'Одежда', pt: 'Roupas', de: 'Kleidung', id: 'Pakaian', tr: 'Giysi', ko: '옷', ja: '服', zh: '衣服', hi: 'कपड़े', ar: 'ملابس' },
  'shoes': { en: 'Shoes', es: 'Zapatos', fr: 'Chaussures', ru: 'Обувь / Туфли', pt: 'Sapatos', de: 'Schuhe', id: 'Sepatu', tr: 'Ayakkabı', ko: '신발', ja: '靴', zh: '鞋子', ar: 'حذاء' },
  'object': { en: 'Object', es: 'Objeto', fr: 'Objet', ru: 'Объект / Предмет', pt: 'Objeto', de: 'Objekt', id: 'Benda', tr: 'Nesne', ko: '물건 / 객체', ja: '物', zh: '物品', hi: 'वस्तु / चीज़', ar: 'شيء / غرض' },

  // Question Words
  'who': { en: 'Who', es: 'Quién', fr: 'Qui', ru: 'Кто', pt: 'Quem', de: 'Wer', id: 'Siapa', tr: 'Kim', ko: '누구', ja: '誰', zh: '谁', hi: 'कौन', ar: 'من' },
  'what': { en: 'What', es: 'Qué', fr: 'Quoi / Que', ru: 'Что', pt: 'O que', de: 'Was', id: 'Apa', tr: 'Ne', ko: '무엇', ja: '何', zh: '什么', hi: 'क्या', ar: 'ماذا' },
  'what?': { en: 'What?', es: '¿Qué?', fr: 'Quoi ?', ru: 'Что?', pt: 'O quê?', de: 'Was?', id: 'Apa?', tr: 'Ne?', ko: '무엇?', ja: '何？', zh: '什么？', hi: 'क्या?', ar: 'ماذا؟' },
  'where': { en: 'Where', es: 'Dónde', fr: 'Où', ru: 'Где', pt: 'Onde', de: 'Wo', id: 'Di mana', tr: 'Nerede', ko: '어디', ja: 'どこ', zh: '哪里', hi: 'कहाँ', ar: 'أين' },
  'where?': { en: 'Where?', es: '¿Dónde?', fr: 'Où ?', ru: 'Где?', pt: 'Onde?', de: 'Wo?', id: 'Di mana?', tr: 'Nerede?', ko: '어디?', ja: 'どこ？', zh: '哪里？', hi: 'कहाँ?', ar: 'أين؟' },
  'when': { en: 'When', es: 'Cuándo', fr: 'Quand', ru: 'Когда', pt: 'Quando', de: 'Wann', id: 'Kapan', tr: 'Ne zaman', ko: '언제', ja: 'いつ', zh: '什么时候', hi: 'कब', ar: 'متى' },
  'when?': { en: 'When?', es: '¿Cuándo?', fr: 'Quand ?', ru: 'Когда?', pt: 'Quando?', de: 'Wann?', id: 'Kapan?', tr: 'Ne zaman?', ko: '언제?', ja: 'いつ？', zh: '什么时候？', hi: 'कब?', ar: 'متى؟' },
  'who?': { en: 'Who?', es: '¿Quién?', fr: 'Qui ?', ru: 'Кто?', pt: 'Quem?', de: 'Wer?', id: 'Siapa?', tr: 'Kim?', ko: '누구?', ja: '誰？', zh: '谁？', hi: 'कौन?', ar: 'من؟' },
  'why': { en: 'Why', es: 'Por qué', fr: 'Pourquoi', ru: 'Почему', pt: 'Por que', de: 'Warum', id: 'Mengapa', tr: 'Neden', ko: '왜', ja: 'なぜ', zh: '为什么', hi: 'क्यों', ar: 'لماذا' },
  'why?': { en: 'Why?', es: '¿Por qué?', fr: 'Pourquoi ?', ru: 'Почему?', pt: 'Por quê?', de: 'Warum?', id: 'Mengapa?', tr: 'Neden?', ko: '왜?', ja: 'なぜ？', zh: '为什么？', hi: 'क्यों?', ar: 'لماذا؟' },
  'how': { en: 'How', es: 'Cómo', fr: 'Comment', ru: 'Как', pt: 'Como', de: 'Wie', id: 'Bagaimana', tr: 'Nasıl', ko: '어떻게', ja: 'どうやって', zh: '怎么', hi: 'कैसे', ar: 'كيف' },
  'how?': { en: 'How?', es: '¿Cómo?', fr: 'Comment ?', ru: 'Как?', pt: 'Como?', de: 'Wie?', id: 'Bagaimana?', tr: 'Nasıl?', ko: '어떻게?', ja: 'どうやって？', zh: '怎么？', hi: 'कैसे?', ar: 'كيف؟' },
  'how much / how many': { en: 'How much / How many', es: 'Cuánto / Cuántos', fr: 'Combien', ru: 'Сколько', pt: 'Quanto', de: 'Wie viel', id: 'Berapa', tr: 'Ne kadar', ko: '얼마', ja: 'いくら', zh: '多少', hi: 'कितना / कितने', ar: 'كم' },
  'how much': { en: 'How much', es: 'Cuánto', fr: 'Combien', ru: 'Сколько', pt: 'Quanto', de: 'Wie viel', id: 'Berapa', tr: 'Ne kadar', ko: '얼마', ja: 'いくら', ar: 'كم' },

  // Days of the Week & Calendar
  'monday': { en: 'Monday', es: 'Lunes', fr: 'Lundi', ru: 'Понедельник', pt: 'Segunda-feira', de: 'Montag', id: 'Senin', tr: 'Pazartesi', ko: '월요일', ja: '月曜日', zh: '星期一', hi: 'सोमवार', ar: 'الإثنين' },
  'tuesday': { en: 'Tuesday', es: 'Martes', fr: 'Mardi', ru: 'Вторник', pt: 'Terça-feira', de: 'Dienstag', id: 'Selasa', tr: 'Salı', ko: '화요일', ja: '火曜日', zh: '星期二', hi: 'मंगलवार', ar: 'الثلاثاء' },
  'wednesday': { en: 'Wednesday', es: 'Miércoles', fr: 'Mercredi', ru: 'Среда', pt: 'Quarta-feira', de: 'Mittwoch', id: 'Rabu', tr: 'Çarşamba', ko: '수요일', ja: '水曜日', zh: '星期三', hi: 'बुधवार', ar: 'الأربعاء' },
  'thursday': { en: 'Thursday', es: 'Jueves', fr: 'Jeudi', ru: 'Четверг', pt: 'Quinta-feira', de: 'Donnerstag', id: 'Kamis', tr: 'Perşembe', ko: '목요일', ja: '木曜日', zh: '星期四', hi: 'गुरुवार / बृहस्पतिवार', ar: 'الخميس' },
  'friday': { en: 'Friday', es: 'Viernes', fr: 'Vendredi', ru: 'Пятница', pt: 'Sexta-feira', de: 'Freitag', id: 'Jumat', tr: 'Cuma', ko: '금요일', ja: '金曜日', zh: '星期五', hi: 'शुक्रवार', ar: 'الجمعة' },
  'saturday': { en: 'Saturday', es: 'Sábado', fr: 'Samedi', ru: 'Суббота', pt: 'Sábado', de: 'Samstag', id: 'Sabtu', tr: 'Cumartesi', ko: '토요일', ja: '土曜日', zh: '星期六', hi: 'शनिवार', ar: 'السبت' },
  'sunday': { en: 'Sunday', es: 'Domingo', fr: 'Dimanche', ru: 'Воскресенье', pt: 'Domingo', de: 'Sonntag', id: 'Minggu', tr: 'Pazar', ko: '일요일', ja: '日曜日', zh: '星期日 / 星期天', hi: 'रविवार / इतवार', ar: 'الأحد' },
  'week': { en: 'Week', es: 'Semana', fr: 'Semaine', ru: 'Неделя', pt: 'Semana', de: 'Woche', id: 'Minggu', tr: 'Hafta', ko: '주 / 일주일', ja: '週', zh: '星期 / 周', hi: 'सप्ताह / हफ़्ता', ar: 'أسبوع' },
  'month': { en: 'Month', es: 'Mes', fr: 'Mois', ru: 'Месяц', pt: 'Mês', de: 'Monat', id: 'Bulan', tr: 'Ay', ko: '달 / 월', ja: '月', zh: '月', hi: 'महीना / माह', ar: 'شهر' },
  'year': { en: 'Year', es: 'Año', fr: 'An / Année', ru: 'Год', pt: 'Ano', de: 'Jahr', id: 'Tahun', tr: 'Yıl', ko: '년 / 해', ja: '年', zh: '年', hi: 'वर्ष / साल', ar: 'سنة / عام' },

  // Animals, Weather & Nature
  'dog': { en: 'Dog', es: 'Perro', fr: 'Chien', ru: 'Собака', pt: 'Cachorro', de: 'Hund', id: 'Anjing', tr: 'Köpek', ko: '개 / 강아지', ja: '犬', zh: '狗', hi: 'कुत्ता', ar: 'كلب' },
  'cat': { en: 'Cat', es: 'Gato', fr: 'Chat', ru: 'Кот / Кошка', pt: 'Gato', de: 'Katze', id: 'Kucing', tr: 'Kedi', ko: '고양이', ja: '猫', zh: '猫', hi: 'बिल्ली', ar: 'قطة' },
  'bird': { en: 'Bird', es: 'Pájaro / Ave', fr: 'Oiseau', ru: 'Птица', pt: 'Pássaro', de: 'Vogel', id: 'Burung', tr: 'Kuş', ko: '새', ja: '鳥', zh: '鸟', hi: 'पक्षी / चिड़िया', ar: 'طائر' },
  'sun': { en: 'Sun', es: 'Sol', fr: 'Soleil', ru: 'Солнце', pt: 'Sol', de: 'Sonne', id: 'Matahari', tr: 'Güneş', ko: '태양 / 해', ja: '太陽 / 日', zh: '太阳', hi: 'सूरज / सूर्य', ar: 'شمس' },
  'moon': { en: 'Moon', es: 'Luna', fr: 'Lune', ru: 'Луна', pt: 'Lua', de: 'Mond', id: 'Bulan', tr: 'Ay', ko: '달', ja: '月', zh: '月亮', hi: 'चाँद / चंद्रमा', ar: 'قمر' },
  'star': { en: 'Star', es: 'Estrella', fr: 'Étoile', ru: 'Звезда', pt: 'Estrela', de: 'Stern', id: 'Bintang', tr: 'Yıldız', ko: '별', ja: '星', zh: '星星', hi: 'तारा / नक्षत्र', ar: 'نجمة' },
  'rain': { en: 'Rain', es: 'Lluvia', fr: 'Pluie', ru: 'Дождь', pt: 'Chuva', de: 'Regen', id: 'Hujan', tr: 'Yağmur', ko: '비', ja: '雨', zh: '雨', hi: 'बारिश / वर्षा', ar: 'مطر' },
  'snow': { en: 'Snow', es: 'Nieve', fr: 'Neige', ru: 'Снег', pt: 'Neve', de: 'Schnee', id: 'Salju', tr: 'Kar', ko: '눈', ja: '雪', zh: '雪', hi: 'बर्फ़', ar: 'ثلج' },
  'cold': { en: 'Cold', es: 'Frío', fr: 'Froid', ru: 'Холодно / Холодный', pt: 'Frio', de: 'Kalt', id: 'Dingin', tr: 'Soğuk', ko: '차가운 / 추운', ja: '冷たい / 寒い', zh: '冷', hi: 'ठंडा', ar: 'بارد' },
  'hot': { en: 'Hot', es: 'Caliente / Calor', fr: 'Chaud', ru: 'Жарко / Горячий', pt: 'Quente', de: 'Heiß', id: 'Panas', tr: 'Sıcak', ko: '뜨거운 / 더운', ja: '熱い / 暑い', zh: '热', hi: 'गर्म', ar: 'حار / ساخن' },
  'hedgehog': { en: 'Hedgehog', es: 'Erizo', fr: 'Hérisson', ru: 'Ёж', pt: 'Ouriço', de: 'Igel', id: 'Landak', tr: 'Kirpi', ko: '고슴도치', ja: 'ハリネズミ', zh: '刺猬', hi: 'साही / कंटीला चूहा', ar: 'قنفذ' },
  'beetle': { en: 'Beetle / Bug', es: 'Escarabajo', fr: 'Scarabée', ru: 'Жук', pt: 'Besouro', de: 'Käfer', id: 'Kumbang', tr: 'Böcek', ko: '딱정벌레', ja: '甲虫 / カブトムシ', zh: '甲虫', hi: 'कीड़ा / भृंग', ar: 'خنفساء' },
  'flower': { en: 'Flower', es: 'Flor', fr: 'Fleur', ru: 'Цветок', pt: 'Flor', de: 'Blume', id: 'Bunga', tr: 'Çiçek', ko: '꽃', ja: '花', zh: '花', hi: 'फूल / पुष्प', ar: 'زهرة' },
  'tree': { en: 'Tree', es: 'Árbol', fr: 'Arbre', ru: 'Дерево', pt: 'Árvore', de: 'Baum', id: 'Pohon', tr: 'Ağaç', ko: '나무', ja: '木', zh: '树', hi: 'पेड़ / वृक्ष', ar: 'شجرة' },
  'christmas tree': { en: 'Christmas tree', es: 'Árbol de Navidad', fr: 'Sapin de Noël', ru: 'Ёлка', pt: 'Árvore de Natal', de: 'Weihnachtsbaum', id: 'Pohon Natal', tr: 'Noel ağacı', ko: '크리스마스 트리', ja: 'クリスマスツリー', zh: '圣诞树', hi: 'क्रिसमस ट्री', ar: 'شجرة عيد الميلاد' },
  'zebra': { en: 'Zebra', es: 'Cebra', fr: 'Zèbre', ru: 'Зебра', pt: 'Zebra', de: 'Zebra', id: 'Zebra', tr: 'Zebra', ko: '얼룩말', ja: 'シマウマ', zh: '斑马', hi: 'ज़ेबरा / वनमानुष', ar: 'حمار وحشي' },

  // Adjectives & Qualities
  'good': { en: 'Good', es: 'Bueno', fr: 'Bon', ru: 'Хороший / Хорошо', pt: 'Bom', de: 'Gut', id: 'Baik', tr: 'İyi', ko: '좋은', ja: '良い', zh: '好', hi: 'अच्छा', ar: 'جيد' },
  'bad': { en: 'Bad', es: 'Malo', fr: 'Mauvais', ru: 'Плохой / Плохо', pt: 'Ruim', de: 'Schlecht', id: 'Buruk', tr: 'Kötü', ko: '나쁜', ja: '悪い', zh: '坏', hi: 'बुरा / ख़राब', ar: 'سيئ' },
  'big': { en: 'Big / Large', es: 'Grande', fr: 'Grand', ru: 'Большой', pt: 'Grande', de: 'Groß', id: 'Besar', tr: 'Büyük', ko: '큰', ja: '大きい', zh: '大', hi: 'बड़ा', ar: 'كبير' },
  'small': { en: 'Small / Little', es: 'Pequeño', fr: 'Petit', ru: 'Маленький', pt: 'Pequeno', de: 'Klein', id: 'Kecil', tr: 'Küçük', ko: '작은', ja: '小さい', zh: '小', hi: 'छोटा', ar: 'صغير' },
  'new': { en: 'New', es: 'Nuevo', fr: 'Nouveau', ru: 'Новый', pt: 'Novo', de: 'Neu', id: 'Baru', tr: 'Yeni', ko: '새로운', ja: '新しい', zh: '新', hi: 'नया', ar: 'جديد' },
  'old': { en: 'Old', es: 'Viejo / Antiguo', fr: 'Vieux / Ancien', ru: 'Старый', pt: 'Velho', de: 'Alt', id: 'Tua / Lama', tr: 'Eski / Yaşlı', ko: '오래된 / 늙은', ja: '古い', zh: '旧 / 老', hi: 'पुराना', ar: 'قديم' },
  'open': { en: 'Open', es: 'Abierto', fr: 'Ouvert', ru: 'Открыто / Открытый', pt: 'Aberto', de: 'Offen', id: 'Buka', tr: 'Açık', ko: '열다 / 열린', ja: '開く / オープン', zh: '打开', hi: 'खुला', ar: 'مفتوح' },
  'closed': { en: 'Closed', es: 'Cerrado', fr: 'Fermé', ru: 'Закрыто / Закрытый', pt: 'Fechado', de: 'Geschlossen', id: 'Tutup', tr: 'Kapalı', ko: '닫힌', ja: '休業 / 閉店', zh: '关闭', hi: 'बंद', ar: 'مغلق' },
  'fast': { en: 'Fast / Quick', es: 'Rápido', fr: 'Rapide', ru: 'Быстрый / Быстро', pt: 'Rápido', de: 'Schnell', id: 'Cepat', tr: 'Hızlı', ko: '빠른', ja: '速い', zh: '快', hi: 'तेज़ / जल्दी', ar: 'سريع' },
  'slow': { en: 'Slow', es: 'Lento', fr: 'Lent', ru: 'Медленный / Медленно', pt: 'Lento', de: 'Langsam', id: 'Lambat', tr: 'Yavaş', ko: '느린', ja: '遅い', zh: '慢', hi: 'धीमा', ar: 'بطيء' },
  'happy': { en: 'Happy', es: 'Feliz', fr: 'Heureux', ru: 'Счастливый / Рад', pt: 'Feliz', de: 'Glücklich', id: 'Senang', tr: 'Mutlu', ko: '행복한', ja: '嬉しい / 幸せ', zh: '快乐 / 高兴', hi: 'ख़ुश / प्रसन्न', ar: 'سعيد' },
  'ready': { en: 'Ready', es: 'Listo', fr: 'Prêt', ru: 'Готов / Готовый', pt: 'Pronto', de: 'Bereit', id: 'Siap', tr: 'Hazır', ko: '준비된', ja: '準備完了', zh: '准备好了', hi: 'तैयार', ar: 'جاهز' },

  // Alphabet & Beginner Vocabulary
  'apple': { en: 'Apple', es: 'Manzana', fr: 'Pomme', ru: 'Яблоко', pt: 'Maçã', de: 'Apfel', id: 'Apel', tr: 'Elma', ko: '사과', ja: 'りんご', zh: '苹果', hi: 'सेब', ar: 'تفاح' },
  'egg': { en: 'Egg', es: 'Huevo', fr: 'Œuf', ru: 'Яйцо', pt: 'Ovo', de: 'Ei', id: 'Telur', tr: 'Yumurta', ko: '계란 / 달걀', ja: '卵', zh: '鸡蛋', hi: 'अंडा', ar: 'بيض' },
  'ice': { en: 'Ice', es: 'Hielo', fr: 'Glace', ru: 'Лёд', pt: 'Gelo', de: 'Eis', id: 'Es', tr: 'Buz', ko: '얼음', ja: '氷', zh: '冰', hi: 'बर्फ़', ar: 'جليد / ثلج' },
  'juice': { en: 'Juice', es: 'Jugo', fr: 'Jus', ru: 'Сок', pt: 'Suco', de: 'Saft', id: 'Jus', tr: 'Meyve suyu', ko: '주스', ja: 'ジュース', zh: '果汁', hi: 'रस / जूस', ar: 'عصير' },
  'key': { en: 'Key', es: 'Llave', fr: 'Clé', ru: 'Ключ', pt: 'Chave', de: 'Schlüssel', id: 'Kunci', tr: 'Anahtar', ko: '열쇠', ja: '鍵', zh: '钥匙', hi: 'चाबी', ar: 'مفتاح' },
  'light': { en: 'Light', es: 'Luz', fr: 'Lumière', ru: 'Свет', pt: 'Luz', de: 'Licht', id: 'Cahaya', tr: 'Işık', ko: '빛 / 밝은', ja: '光 / 明るい', zh: '光 / 明亮', hi: 'रोशनी / प्रकाश', ar: 'خفيف' },
  'name': { en: 'Name', es: 'Nombre', fr: 'Nom', ru: 'Имя', pt: 'Nome', de: 'Name', id: 'Nama', tr: 'İsim', ko: '이름', ja: '名前', zh: '名字', hi: 'नाम', ar: 'اسم' },
  'orange': { en: 'Orange', es: 'Naranja', fr: 'Orange', ru: 'Апельсин', pt: 'Laranja', de: 'Orange', id: 'Oranye', tr: 'Turuncu', ko: '오렌지', ja: 'オレンジ', zh: '橙子', hi: 'नारंगी', ar: 'برتقال' },
  'quiet': { en: 'Quiet', es: 'Tranquilo / Silencioso', fr: 'Silencieux / Calme', ru: 'Тихий', pt: 'Calmo', de: 'Ruhig', id: 'Tenang', tr: 'Sessiz', ko: '조용한', ja: '静かな', zh: '安静', hi: 'शांत / चुप', ar: 'هادئ' },
  'road': { en: 'Road', es: 'Camino / Carretera', fr: 'Route', ru: 'Дорога', pt: 'Estrada', de: 'Straße', id: 'Jalan', tr: 'Yol', ko: '도로', ja: '道路', zh: '路', hi: 'सड़क / मार्ग', ar: 'طريق' },
  'school': { en: 'School', es: 'Escuela', fr: 'École', ru: 'Школа', pt: 'Escola', de: 'Schule', id: 'Sekolah', tr: 'Okul', ko: '학교', ja: '学校', zh: '学校', hi: 'विद्यालय / स्कूल', ar: 'مدرسة' },
  'umbrella': { en: 'Umbrella', es: 'Paraguas', fr: 'Parapluie', ru: 'Зонт', pt: 'Guarda-chuva', de: 'Regenschirm', id: 'Payung', tr: 'Şemsiye', ko: '우산', ja: '傘', zh: '雨伞', hi: 'छाता / छतरी', ar: 'مظلة' },
  'voice': { en: 'Voice', es: 'Voz', fr: 'Voix', ru: 'Голос', pt: 'Voz', de: 'Stimme', id: 'Suara', tr: 'Ses', ko: '목소리', ja: '声', zh: '声音', hi: 'आवाज़ / वाणी', ar: 'صوت' },
  'x-ray': { en: 'X-ray', es: 'Rayos X', fr: 'Rayons X', ru: 'Рентген', pt: 'Raio X', de: 'Röntgenbild', id: 'Sinar-X', tr: 'Röntgen', ko: '엑스레이', ja: 'レントゲン', zh: 'X光', hi: 'एक्स-रे', ar: 'أشعة سينية' },
  'xylophone': { en: 'Xylophone', es: 'Xilófono', fr: 'Xylophone', ru: 'Ксилофон', pt: 'Xilofone', de: 'Xylophon', id: 'Xilofon', tr: 'Ksilofon', ko: '실로폰', ja: '木琴', zh: '木琴', hi: 'ज़ाइलोफ़ोन / काष्ठतरंग', ar: 'إكسيليفون' },
  'yellow': { en: 'Yellow', es: 'Amarillo', fr: 'Jaune', ru: 'Жёлтый', pt: 'Amarelo', de: 'Gelb', id: 'Kuning', tr: 'Sarı', ko: '노란색', ja: '黄色', zh: '黄色', hi: 'पीला', ar: 'أصفر' },
  'zero': { en: 'Zero', es: 'Cero', fr: 'Zéro', ru: 'Ноль', pt: 'Zero', de: 'Null', id: 'Nol', tr: 'Sıfır', ar: 'صفر' },
  'love': { en: 'Love', es: 'Amor', fr: 'Amour', ru: 'Любовь', pt: 'Amor', de: 'Liebe', id: 'Cinta', tr: 'Aşk', zh: '爱', hi: 'प्यार / प्रेम', ar: 'حب' },
  'boat': { en: 'Boat', es: 'Barco', fr: 'Bateau', ru: 'Лодка', pt: 'Barco', de: 'Boot', id: 'Perahu', tr: 'Tekne', ko: '배', ja: '船 / ボート', zh: '船', hi: 'नाव / कश्ती', ar: 'قارب' },
  'day': { en: 'Day', es: 'Día', fr: 'Jour', ru: 'День', pt: 'Dia', de: 'Tag', id: 'Hari', tr: 'Gün', ko: '날 / 일', ja: '日', zh: '天 / 日', hi: 'दिन / वार', ar: 'يوم' },
  'island': { en: 'Island', es: 'Isla', fr: 'Île', ru: 'Остров', pt: 'Ilha', de: 'Insel', id: 'Pulau', tr: 'Ada', zh: '岛屿', hi: 'द्वीप / टापू', ar: 'جزيرة' },
  'kilogram': { en: 'Kilogram', es: 'Kilo', fr: 'Kilo', ru: 'Килограмм', pt: 'Quilo', de: 'Kilogramm', id: 'Kilogram', tr: 'Kilogram', zh: '公斤', hi: 'किलोग्राम / किलो', ar: 'كيلوغرام' },
  'kilo': { en: 'Kilogram', es: 'Kilo', fr: 'Kilo', ru: 'Килограмм', pt: 'Quilo', de: 'Kilogramm', id: 'Kilogram', tr: 'Kilogram', zh: '公斤', hi: 'किलोग्राम / किलो', ar: 'كيلو' },
  'night': { en: 'Night', es: 'Noche', fr: 'Nuit', ru: 'Ночь', pt: 'Noite', de: 'Nacht', id: 'Malam', tr: 'Gece', ko: '밤', ja: '夜', zh: '夜里', hi: 'रात / रात्रि', ar: 'ليل / ليلة' },
  'eye': { en: 'Eye', es: 'Ojo', fr: 'Œil', ru: 'Глаз', pt: 'Olho', de: 'Auge', id: 'Mata', tr: 'Göz', ko: '눈', ja: '目', zh: '眼睛', hi: 'आँख', ar: 'عين' },
  'eyes': { en: 'Eyes', es: 'Ojos', fr: 'Yeux', ru: 'Глаза', pt: 'Olhos', de: 'Augen', id: 'Mata', tr: 'Gözler', ko: '두 눈', ja: '両目', zh: '眼睛', hi: 'आँखें', ar: 'عيون' },
  'cheek': { en: 'Cheek', es: 'Mejilla', fr: 'Joue', ru: 'Щека', pt: 'Bochecha', de: 'Wange', id: 'Pipi', tr: 'Yanak', ko: '뺨 / 볼', ja: '頬 / ほっぺ', zh: '脸颊', hi: 'गाल', ar: 'خد' },
  'cheese': { en: 'Cheese', es: 'Queso', fr: 'Fromage', ru: 'Сыр', pt: 'Queijo', de: 'Käse', id: 'Keju', tr: 'Peynir', ko: '치즈', ja: 'チーズ', zh: '奶酪 / 芝士', hi: 'पनीर', ar: 'جبن' },
  'clock': { en: 'Clock / Watch', es: 'Reloj', fr: 'Horloge / Montre', ru: 'Часы', pt: 'Relógio', de: 'Uhr', id: 'Jam', tr: 'Saat', ko: '시계', ja: '時計', zh: '钟表', hi: 'घड़ी', ar: 'ساعة' },
  'watch': { en: 'Watch / Clock', es: 'Reloj', fr: 'Montre', ru: 'Часы', pt: 'Relógio', de: 'Uhr', id: 'Jam tangan', tr: 'Saat', ko: '손목시계', ja: '腕時計', zh: '手表', hi: 'घड़ी', ar: 'ساعة يد' },
  'grape': { en: 'Grape', es: 'Uva', fr: 'Raisin', ru: 'Виноград', pt: 'Uva', de: 'Traube', id: 'Anggur', tr: 'Üzüm', ko: '포도', ja: 'ぶどう', zh: '葡萄', hi: 'अंगूर', ar: 'عنب' },
  'glass': { en: 'Glass (cup)', es: 'Vaso', fr: 'Verre', ru: 'Стакан', pt: 'Copo', de: 'Glas', id: 'Gelas', tr: 'Bardak', ko: '유리잔 / 컵', ja: 'グラス / コップ', zh: '水杯', hi: 'गिलास', ar: 'كأس' },
  'web': { en: 'Web', es: 'Web', fr: 'Web', ru: 'Веб', pt: 'Web', de: 'Web', id: 'Web', tr: 'Web', hi: 'वेब', ar: 'شبكة' },
  'success': { en: 'Success', es: 'Éxito', fr: 'Succès', ru: 'Успех', pt: 'Sucesso', de: 'Erfolg', id: 'Sukses', tr: 'Başarı', zh: '成功', hi: 'सफलता', ar: 'نجاح' },
  'yolk': { en: 'Yolk', es: 'Yema', fr: 'Jaune d\'œuf', ru: 'Желток', pt: 'Gema', de: 'Eigelb', id: 'Kuning telur', tr: 'Yumurta sarısı', zh: '蛋黄', hi: 'ज़र्दी (अंडे की पीली ज़र्दी)', ar: 'صفار البيض' },
  'shoe': { en: 'Shoe', es: 'Zapato', fr: 'Chaussure', ru: 'Обувь', pt: 'Sapato', de: 'Schuh', id: 'Sepatu', tr: 'Ayakkabı', zh: '鞋子', hi: 'जूता', ar: 'حذاء' },
  'idea': { en: 'Idea', es: 'Idea', fr: 'Idée', ru: 'Идея', pt: 'Ideia', de: 'Idee', id: 'Ide', tr: 'Fikir', ko: '생각 / 아이디어', ja: 'アイデア / 考え', zh: '想法', hi: 'विचार / उपाय', ar: 'فكرة' },
  'question': { en: 'Question', es: 'Pregunta', fr: 'Question', ru: 'Вопрос', pt: 'Pergunta', de: 'Frage', id: 'Pertanyaan', tr: 'Soru', ko: '질문', ja: '質問', zh: '问题', hi: 'प्रश्न / सवाल', ar: 'سؤال' },
  'wagon': { en: 'Wagon / Car', es: 'Vagón', fr: 'Wagon', ru: 'Вагон', pt: 'Vagão', de: 'Waggon', id: 'Gerbong', tr: 'Vagon', ko: '마차 / 왜건', ja: 'ワゴン', zh: '车厢', hi: 'डिब्बा / वैगन', ar: 'عربة' },
  'example': { en: 'Example', es: 'Ejemplo', fr: 'Exemple', ru: 'Пример', pt: 'Exemplo', de: 'Beispiel', id: 'Contoh', tr: 'Örnek', ko: '예시 / 예', ja: '例', zh: '例子', hi: 'उदाहरण', ar: 'مثال' },
  'brother': { en: 'Brother', es: 'Hermano', fr: 'Frère', ru: 'Брат', pt: 'Irmão', de: 'Bruder', id: 'Saudara laki-laki', tr: 'Erkek kardeş', ko: '형제 / 오빠 / 형', ja: '兄弟 / 兄 / 弟', zh: '兄弟 / 哥哥 / 弟弟', hi: 'भाई', ar: 'أخ' },
  'sister': { en: 'Sister', es: 'Hermana', fr: 'Sœur', ru: 'Сестра', pt: 'Irmã', de: 'Schwester', id: 'Saudara perempuan', tr: 'Kız kardeş', ko: '자매 / 언니 / 누나', ja: '姉妹 / 姉 / 妹', zh: '姐妹 / 姐姐 / 妹妹', hi: 'बहन', ar: 'أخت' },
  'lemon': { en: 'Lemon', es: 'Limón', fr: 'Citron', ru: 'Лимон', pt: 'Limão', de: 'Zitrone', id: 'Lemon', tr: 'Limon', ko: '레몬', ja: 'レモン', zh: '柠檬', hi: 'नींबू', ar: 'ليمون' },
  'nose': { en: 'Nose', es: 'Nariz', fr: 'Nez', ru: 'Нос', pt: 'Nariz', de: 'Nase', id: 'Hidung', tr: 'Burun', ko: '코', ja: '鼻', zh: '鼻子', hi: 'नाक', ar: 'أنف' },
  'window': { en: 'Window', es: 'Ventana', fr: 'Fenêtre', ru: 'Окно', pt: 'Janela', de: 'Fenster', id: 'Jendela', tr: 'Pencere', ko: '창문', ja: '窓', zh: '窗户', hi: 'खिड़की', ar: 'نافذة / شباك' },
  'dad': { en: 'Dad', es: 'Papá', fr: 'Papa', ru: 'Папа', pt: 'Pai', de: 'Papa', id: 'Ayah', tr: 'Baba', ko: '아빠', ja: 'お父さん / パパ', zh: '爸爸', hi: 'पापा / पिताजी', ar: 'بابا / والدي' },
  'kettle': { en: 'Kettle', es: 'Tetera', fr: 'Bouilloire', ru: 'Чайник', pt: 'Chaleira', de: 'Wasserkocher', id: 'Teko', tr: 'Çaydanlık', ko: '주전자', ja: 'やかん / ケトル', zh: '水壶', hi: 'केतली', ar: 'غلاية' },
  'morning': { en: 'Morning', es: 'Mañana', fr: 'Matin', ru: 'Утро', pt: 'Manhã', de: 'Morgen', id: 'Pagi', tr: 'Sabah', ko: '아침', ja: '朝', zh: '早上', hi: 'सुबह / प्रातःकाल', ar: 'صباح' },
  'afternoon': { en: 'Afternoon', es: 'Tarde', fr: 'Après-midi', ru: 'День (после полудня)', pt: 'Tarde', de: 'Nachmittag', id: 'Siang', tr: 'Öğleden sonra', ko: '오후', ja: '午後', zh: '下午', hi: 'दोपहर / मध्याह्न', ar: 'بعد الظهر' },
  'evening': { en: 'Evening', es: 'Tarde / Noche', fr: 'Soir', ru: 'Вечер', pt: 'Noite', de: 'Abend', id: 'Malam', tr: 'Akşam', ko: '저녁', ja: '夕方 / 夜', zh: '晚上', hi: 'शाम / संध्या', ar: 'مساء' },
  'photo': { en: 'Photo', es: 'Foto', fr: 'Photo', ru: 'Фото', pt: 'Foto', de: 'Foto', id: 'Foto', tr: 'Fotoğraf', ko: '사진', ja: '写真', zh: '照片', hi: 'तस्वीर / फ़ोटो', ar: 'صورة' },
  'czar': { en: 'Czar / King', es: 'Zar', fr: 'Tsar', ru: 'Царь', pt: 'Czar', de: 'Zar', id: 'Raja', tr: 'Çar', ko: '차르', ja: 'ツァーリ', zh: '国王', hi: 'राजा / ज़ार', ar: 'قيصر' },
  'borscht': { en: 'Borscht', es: 'Borsch', fr: 'Bortsch', ru: 'Борщ', pt: 'Borsch', de: 'Borschtsch', id: 'Sup bit', tr: 'Borş', ko: '보르시', ja: 'ボルシチ', zh: '红菜汤', hi: 'बोर्स्ट (सूप)', ar: 'شوربة البورش' },
  'entrance': { en: 'Entrance', es: 'Entrada', fr: 'Entrée', ru: 'Подъезд', pt: 'Entrada', de: 'Eingang', id: 'Pintu masuk', tr: 'Giriş', ko: '입구', ja: '入口', zh: '入口', hi: 'प्रवेश द्वार', ar: 'مدخل' },
  'south': { en: 'South', es: 'Sur', fr: 'Sud', ru: 'Юг', pt: 'Sul', de: 'Süden', id: 'Selatan', tr: 'Güney', ko: '남쪽', ja: '南', zh: '南', hi: 'दक्षिण', ar: 'جنوب' },
  'yogurt': { en: 'Yogurt', es: 'Yogur', fr: 'Yaourt', ru: 'Йогурт', pt: 'Iogurte', de: 'Joghurt', id: 'Yogurt', tr: 'Yoğurt', ko: '요거트', ja: 'ヨーグルト', zh: '酸奶', hi: 'दही', ar: 'زبادي / لبن' },
  'heart': { en: 'Heart', es: 'Corazón', fr: 'Cœur', ru: 'Сердце', pt: 'Coração', de: 'Herz', id: 'Hati', tr: 'Kalp', ko: '심장', ja: '心臓', zh: '心脏', hi: 'दिल / हृदय', ar: 'قلب' },
  'cup': { en: 'Cup', es: 'Taza', fr: 'Tasse', ru: 'Чашка', pt: 'Xícara', de: 'Tasse', id: 'Cangkir', tr: 'Fincan', ko: '컵', ja: 'カップ', zh: '杯子', hi: 'कप / प्याला', ar: 'كوب / فنجان' },
  'source': { en: 'Source', es: 'Fuente', fr: 'Source', ru: 'Источник', pt: 'Fonte', de: 'Quelle', id: 'Sumber', tr: 'Kaynak', ko: '원천 / 소스', ja: '源', zh: '来源', hi: 'स्रोत', ar: 'مصدر' },
  'oil': { en: 'Oil', es: 'Aceite', fr: 'Huile', ru: 'Масло', pt: 'Óleo', de: 'Öl', id: 'Minyak', tr: 'Yağ', ko: '기름 / 오일', ja: '油', zh: '油', hi: 'तेल', ar: 'زيت' },
  'or': { en: 'Or', es: 'O', fr: 'Ou', ru: 'Или', pt: 'Ou', de: 'Oder', id: 'Atau', tr: 'Veya', ko: '또는 / 혹은', ja: 'または', zh: '或者', hi: 'या / अथवा', ar: 'أو' },
  'this': { en: 'This', es: 'Esto', fr: 'Ceci', ru: 'Это', pt: 'Isto', de: 'Dies', id: 'Ini', tr: 'Bu', ko: '이것', ja: 'これ', zh: '这 / 这个', hi: 'यह / इस', ar: 'هذا' },
  'i eat': { en: 'I eat', es: 'Como', fr: 'Je mange', ru: 'Ем', pt: 'Eu como', de: 'Ich esse', id: 'Saya makan', tr: 'Yiyorum', ko: '나는 먹는다', ja: '私は食べます', zh: '我吃', hi: 'मैं खाता हूँ', ar: 'آكل' },
  'yes': { en: 'Yes', es: 'Sí', fr: 'Oui', ru: 'Да', pt: 'Sim', de: 'Ja', id: 'Ya', tr: 'Evet', ko: '네', ja: 'はい', zh: '是', hi: 'हाँ', ar: 'نعم' },
  'no': { en: 'No', es: 'No', fr: 'Non', ru: 'Нет', pt: 'Não', de: 'Nein', id: 'Tidak', tr: 'Hayır', ko: '아니요', ja: 'いいえ', zh: '不是', hi: 'नहीं', ar: 'لا' },
  'maybe': { en: 'Maybe', es: 'Quizás / Tal vez', fr: 'Peut-être', ru: 'Может быть', pt: 'Talvez', de: 'Vielleicht', id: 'Mungkin', tr: 'Belki', ko: '아마도', ja: 'たぶん / おそらく', zh: '也许 / 可能', hi: 'शायद', ar: 'ربما' },
  'today': { en: 'Today', es: 'Hoy', fr: 'Aujourd\'hui', ru: 'Сегодня', pt: 'Hoje', de: 'Heute', id: 'Hari ini', tr: 'Bugün', ko: '오늘', ja: '今日', zh: '今天', hi: 'आज', ar: 'اليوم' },
  'tomorrow': { en: 'Tomorrow', es: 'Mañana', fr: 'Demain', ru: 'Завтра', pt: 'Amanhã', de: 'Morgen', id: 'Besok', tr: 'Yarın', ko: '내일', ja: '明日', zh: '明天', hi: 'कल (आने वाला)', ar: 'غداً' },
  'yesterday': { en: 'Yesterday', es: 'Ayer', fr: 'Hier', ru: 'Вчера', pt: 'Ontem', de: 'Gestern', id: 'Kemarin', tr: 'Dün', ko: '어제', ja: '昨日', zh: '昨天', hi: 'कल (बीता हुआ)', ar: 'أمس' },

  // Core Actions (Verbs)
  'to learn': { en: 'To learn', es: 'Aprender', fr: 'Apprendre', ru: 'Учиться', pt: 'Aprender', de: 'Lernen', id: 'Belajar', tr: 'Öğrenmek', ko: '배우다', ja: '学ぶ', zh: '学习', hi: 'सीखना', ar: 'تعلم' },
  'to speak': { en: 'To speak', es: 'Hablar', fr: 'Parler', ru: 'Говорить', pt: 'Falar', de: 'Sprechen', id: 'Berbicara', tr: 'Konuşmak', ko: '말하다', ja: '話す', zh: '说 / 说话', hi: 'बोलना', ar: 'تكلم' },
  'to eat': { en: 'To eat', es: 'Comer', fr: 'Manger', ru: 'Есть', pt: 'Comer', de: 'Essen', id: 'Makan', tr: 'Yemek', ko: '먹다', ja: '食べる', zh: '吃', hi: 'खाना', ar: 'أكل' },
  'to drink': { en: 'To drink', es: 'Beber', fr: 'Boire', ru: 'Пить', pt: 'Beber', de: 'Trinken', id: 'Minum', tr: 'İçmek', ko: '마시다', ja: '飲む', zh: '喝', hi: 'पीना', ar: 'شرب' },
  'to go': { en: 'To go', es: 'Ir', fr: 'Aller', ru: 'Идти / Ехать', pt: 'Ir', de: 'Gehen', id: 'Pergi', tr: 'Gitmek', ko: '가다', ja: '行く', zh: '去', hi: 'जाना', ar: 'ذهب' },
  'to come': { en: 'To come', es: 'Venir', fr: 'Venir', ru: 'Приходить / Приезжать', pt: 'Vir', de: 'Kommen', id: 'Datang', tr: 'Gelmek', ko: '오다', ja: '来る', zh: '来', hi: 'आना', ar: 'جاء' },
  'to understand': { en: 'To understand', es: 'Entender / Comprender', fr: 'Comprendre', ru: 'Понимать', pt: 'Entender', de: 'Verstehen', id: 'Mengerti', tr: 'Anlamak', ko: '이해하다', ja: '理解する', zh: '理解 / 明白', hi: 'समझना', ar: 'فهم' },
  'to know': { en: 'To know', es: 'Saber / Conocer', fr: 'Savoir / Connaître', ru: 'Знать', pt: 'Saber', de: 'Wissen', id: 'Tahu', tr: 'Bilmek', ko: '알다', ja: '知る', zh: '知道', hi: 'जानना / मालूम होना', ar: 'عرف' },
  'to want': { en: 'To want', es: 'Querer', fr: 'Vouloir', ru: 'Хотеть', pt: 'Querer', de: 'Wollen', id: 'Ingin', tr: 'İstemek', ko: '원하다', ja: '欲しい / 望む', zh: '想要', hi: 'चाहना', ar: 'أراد' },
  'want': { en: 'To want', es: 'Querer', fr: 'Vouloir', ru: 'Хотеть', pt: 'Querer', de: 'Wollen', id: 'Ingin', tr: 'İstemek', ko: '원하다', ja: '欲しい / 望む', zh: '想要', hi: 'चाहना', ar: 'يريد' },
  'to need': { en: 'To need', es: 'Necesitar', fr: 'Avoir besoin de', ru: 'Нуждаться (нужно)', pt: 'Precisar', de: 'Brauchen', id: 'Butuh', tr: 'İhtiyacı olmak', ko: '필요하다', ja: '必要である', zh: '需要', hi: 'ज़रूरत होना', ar: 'احتاج' },
  'to buy': { en: 'To buy', es: 'Comprar', fr: 'Acheter', ru: 'Покупать', pt: 'Comprar', de: 'Kaufen', id: 'Membeli', tr: 'Satın almak', ko: '사다', ja: '買う', zh: '买', hi: 'ख़रीदना', ar: 'اشترى' },
  'to help': { en: 'To help', es: 'Ayudar', fr: 'Aider', ru: 'Помогать', pt: 'Ajudar', de: 'Helfen', id: 'Membantu', tr: 'Yardım etmek', ko: '돕다', ja: '助ける / 手伝う', zh: '帮助', hi: 'मदद करना / सहायता करना', ar: 'ساعد' },
  'to work': { en: 'To work', es: 'Trabajar', fr: 'Travailler', ru: 'Работать', pt: 'Trabalhar', de: 'Arbeiten', id: 'Bekerja', tr: 'Çalışmak', ko: '일하다', ja: '働く', zh: '工作', hi: 'काम करना', ar: 'عمل' },

  // Essential Phrases
  'hello': { en: 'Hello', es: '¡Hola!', fr: 'Bonjour', ru: 'Привет / Здравствуйте', pt: 'Olá', de: 'Hallo', id: 'Halo', tr: 'Merhaba', ko: '안녕하세요', ja: 'こんにちは', zh: '你好', ar: 'مرحباً' },
  'hello (informal)': { en: 'Hello (informal)', es: '¡Hola! (informal)', fr: 'Salut (informel)', ru: 'Привет', pt: 'Oi / Olá', de: 'Hallo', id: 'Halo', tr: 'Merhaba', ko: '안녕', ja: 'やあ', zh: '嗨 / 你好', hi: 'नमस्ते / हैलो', ar: 'أهلاً' },
  'hello (formal)': { en: 'Hello (formal)', es: 'Buenos días / Hola (formal)', fr: 'Bonjour (formel)', ru: 'Здравствуйте', pt: 'Olá / Bom dia', de: 'Guten Tag', id: 'Selamat pagi', tr: 'Merhaba', zh: '您好', hi: 'नमस्ते / नमस्कार', ar: 'مرحباً بك' },
  'good morning': { en: 'Good morning', es: 'Buenos días', fr: 'Bonjour', ru: 'Доброе утро', pt: 'Bom dia', de: 'Guten Morgen', id: 'Selamat pagi', tr: 'Günaydın', ko: '좋은 아침입니다', ja: 'おはようございます', zh: '早上好', hi: 'सुप्रभात', ar: 'صباح الخير' },
  'good afternoon': { en: 'Good afternoon', es: 'Buenas tardes', fr: 'Bon après-midi', ru: 'Добрый день', pt: 'Boa tarde', de: 'Guten Tag', id: 'Selamat siang', tr: 'İyi günler', zh: '下午好', hi: 'शुभ दोपहर', ar: 'طاب مساؤك' },
  'good evening': { en: 'Good evening', es: 'Buenas noches', fr: 'Bonsoir', ru: 'Добрый вечер', pt: 'Boa noite', de: 'Guten Abend', id: 'Selamat malam', tr: 'İyi akşamlar', ko: '좋은 저녁입니다', ja: 'こんばんは', zh: '晚上好', hi: 'शुभ संध्या', ar: 'مساء الخير' },
  'good night': { en: 'Good night', es: 'Buenas noches', fr: 'Bonne nuit', ru: 'Спокойной ночи', pt: 'Boa noite', de: 'Gute Nacht', id: 'Selamat malam', tr: 'İyi geceler', ko: '안녕히 주무세요', ja: 'おやすみなさい', zh: '晚安', hi: 'शुभ रात्रि', ar: 'تصبح على خير' },
  'how are you': { en: 'How are you?', es: '¿Cómo estás?', fr: 'Comment allez-vous ?', ru: 'Как дела?', pt: 'Tudo bem?', de: 'Wie geht es dir?', id: 'Apa kabar?', tr: 'Nasılsınız?', ko: '잘 지내세요?', ja: 'お元気ですか？', zh: '你好吗？', hi: 'आप कैसे हैं?', ar: 'كيف حالك' },
  'how are you?': { en: 'How are you?', es: '¿Cómo estás?', fr: 'Comment allez-vous ?', ru: 'Как дела?', pt: 'Tudo bem?', de: 'Wie geht es dir?', id: 'Apa kabar?', tr: 'Nasılsınız?', ko: '잘 지내세요?', ja: 'お元気ですか？', zh: '你好吗？', hi: 'आप कैसे हैं?', ar: 'كيف حالك؟' },
  'i am fine, thank you': { en: 'I am fine, thank you', es: 'Estoy bien, gracias', fr: 'Je vais bien, merci', ru: 'У меня всё хорошо, спасибо', pt: 'Estou bem, obrigado', de: 'Mir geht es gut, danke', id: 'Kabar baik, terima kasih', tr: 'İyiyim, teşekkürler', ko: '잘 지내요, 감사합니다', ja: '元気です、ありがとう', zh: '我很好，谢谢', hi: 'मैं ठीक हूँ, धन्यवाद', ar: 'أنا بخير، شكراً' },
  'very well, thank you': { en: 'Very well, thank you', es: 'Muy bien, gracias', fr: 'Très bien, merci', ru: 'Очень хорошо, спасибо', pt: 'Muito bem, obrigado', de: 'Sehr gut, danke', id: 'Sangat baik, terima kasih', tr: 'Çok iyiyim, teşekkürler', zh: '很好，谢谢', hi: 'बहुत अच्छा, धन्यवाद', ar: 'بخير جداً، شكراً' },
  'good / well': { en: 'Good / Well', es: 'Bien', fr: 'Bien', ru: 'Хорошо', pt: 'Bem', de: 'Gut', id: 'Baik', tr: 'İyi', ko: '좋은', ja: '良い', hi: 'अच्छा', ar: 'جيد' },
  'bad / poorly': { en: 'Bad / Poorly', es: 'Mal', fr: 'Mal', ru: 'Плохо', pt: 'Mal', de: 'Schlecht', id: 'Buruk', tr: 'Kötü', ko: '나쁜', ja: '悪い', hi: 'बुरा / ख़राब', ar: 'سيء' },
  'and you?': { en: 'And you?', es: '¿Y tú?', fr: 'Et vous ?', ru: 'А вы? / А у вас?', pt: 'E você?', de: 'Und dir?', id: 'Dan Anda?', tr: 'Ya siz?', ko: '당신은요?', ja: 'あなたは？', zh: '你呢？', hi: 'और आप?', ar: 'وأنت؟' },
  'please': { en: 'Please', es: 'Por favor', fr: 'S\'il vous plaît', ru: 'Пожалуйста', pt: 'Por favor', de: 'Bitte', id: 'Tolong', tr: 'Lütfen', ko: '제발 / 부탁합니다', ja: 'お願いします', zh: '请', hi: 'कृपया', ar: 'من فضلك' },
  'please / you\'re welcome': { en: 'Please / You\'re welcome', es: 'Por favor / De nada', fr: 'S\'il vous plaît / De rien', ru: 'Пожалуйста', pt: 'Por favor / De nada', de: 'Bitte', id: 'Tolong / Sama-sama', tr: 'Lütfen / Rica ederim', ko: '제발 / 부탁합니다', ja: 'お願いします', hi: 'कृपया', ar: 'من فضلك / عفواً' },
  'thank you': { en: 'Thank you', es: 'Gracias', fr: 'Merci', ru: 'Спасибо', pt: 'Obrigado', de: 'Danke', id: 'Terima kasih', tr: 'Teşekkür ederim', ko: '감사합니다', ja: 'ありがとう', zh: '谢谢', hi: 'धन्यवाद', ar: 'شكراً' },
  'thank you very much': { en: 'Thank you very much', es: 'Muchas gracias', fr: 'Merci beaucoup', ru: 'Большое спасибо', pt: 'Muito obrigado', de: 'Vielen Dank', id: 'Terima kasih banyak', tr: 'Çok teşekkür ederim', ko: '정말 감사합니다', ja: 'どうもありがとうございます', zh: '非常感谢', hi: 'बहुत-बहुत धन्यवाद', ar: 'شكراً جزيلاً' },
  'you are welcome': { en: 'You are welcome', es: 'De nada', fr: 'De rien', ru: 'Пожалуйста / Не за что', pt: 'De nada', de: 'Gern geschehen', id: 'Sama-sama', tr: 'Rica ederim', zh: '不客气', hi: 'आपका स्वागत है', ar: 'عفواً' },
  'you\'re welcome': { en: 'You\'re welcome', es: 'De nada', fr: 'De rien', ru: 'Пожалуйста / Не за что', pt: 'De nada', de: 'Gern geschehen', id: 'Sama-sama', tr: 'Rica ederim', ar: 'عفواً' },
  'you\'re welcome / not at all': { en: 'You\'re welcome / Not at all', es: 'De nada', fr: 'De rien', ru: 'Не за что', pt: 'De nada', de: 'Gern geschehen', id: 'Sama-sama', tr: 'Rica ederim', ar: 'عفواً / لا شكر على واجب' },
  'no problem': { en: 'No problem', es: 'No hay problema', fr: 'Pas de problème', ru: 'Без проблем / Ничего страшного', pt: 'Sem problema', de: 'Kein Problem', id: 'Tidak masalah', tr: 'Sorun değil', ko: '괜찮아요', ja: '問題ありません', zh: '没问题', hi: 'कोई बात नहीं', ar: 'لا مشكلة' },
  'excuse me': { en: 'Excuse me', es: 'Disculpe / Con permiso', fr: 'Excusez-moi', ru: 'Извините', pt: 'Com licença', de: 'Entschuldigung', id: 'Permisi', tr: 'Affedersiniz', ko: '실례합니다', ja: 'すみません', zh: '请问 / 不好意思', hi: 'माफ़ कीजिए / सुनिए', ar: 'معذرة' },
  'excuse me / sorry': { en: 'Excuse me / Sorry', es: 'Disculpe / Perdón', fr: 'Excusez-moi / Pardon', ru: 'Извините', pt: 'Com licença / Desculpe', de: 'Entschuldigung', id: 'Permisi / Maaf', tr: 'Affedersiniz / Özür dilerim', ko: '실례합니다', ja: 'すみません', hi: 'माफ़ कीजिए / सुनिए', ar: 'معذرة' },
  'i am sorry': { en: 'I am sorry', es: 'Lo siento / Perdón', fr: 'Pardon / Désolé', ru: 'Простите / Мне жаль', pt: 'Desculpe', de: 'Es tut mir leid', id: 'Maafkan saya', tr: 'Özür dilerim', zh: '对不起', hi: 'मुझे खेद है / माफ़ कीजिये', ar: 'أنا آسف' },
  'what is your name?': { en: 'What is your name?', es: '¿Cómo te llamas?', fr: 'Comment vous appelez-vous ?', ru: 'Как вас зовут?', pt: 'Qual é o seu nome?', de: 'Wie heißt du?', id: 'Siapa nama Anda?', tr: 'Adınız ne?', ko: '성함이 어떻게 되시나요?', ja: 'お名前は何ですか？', zh: '你叫什么名字？', hi: 'आपका नाम क्या है?', ar: 'ما اسمك؟' },
  'my name is': { en: 'My name is...', es: 'Me llamo...', fr: 'Je m\'appelle...', ru: 'Меня зовут...', pt: 'Meu nome é...', de: 'Ich heiße...', id: 'Nama saya...', tr: 'Benim adım...', ko: '제 이름은...', ja: '私の名前は...', zh: '我叫...', hi: 'मेरा नाम... है', ar: 'اسمي' },
  'my name is...': { en: 'My name is...', es: 'Me llamo...', fr: 'Je m\'appelle...', ru: 'Меня зовут...', pt: 'Meu nome é...', de: 'Ich heiße...', id: 'Nama saya...', tr: 'Benim adım...', ko: '제 이름은...', ja: '私の名前は...', zh: '我叫...', hi: 'मेरा नाम... है', ar: 'اسمي...' },
  'nice to meet you': { en: 'Nice to meet you', es: 'Mucho gusto / Encantado', fr: 'Enchanté(e)', ru: 'Очень приятно познакомиться', pt: 'Muito prazer', de: 'Freut mich', id: 'Senang bertemu dengan Anda', tr: 'Memnun oldum', ko: '만나서 반갑습니다', ja: 'はじめまして', zh: '很高兴认识你', hi: 'आपसे मिलकर बहुत खुशी हुई', ar: 'تشرفنا' },
  'where are you from?': { en: 'Where are you from?', es: '¿De dónde eres?', fr: 'D\'où venez-vous ?', ru: 'Откуда вы?', pt: 'De onde você é?', de: 'Woher kommst du?', id: 'Dari mana asal Anda?', tr: 'Nerelisiniz?', ko: '어디 출신이세요?', ja: 'どちらの出身ですか？', zh: '你来自哪里？', hi: 'आप कहाँ से हैं?', ar: 'من أين أنت؟' },
  'i am from...': { en: 'I am from...', es: 'Soy de...', fr: 'Je viens de...', ru: 'Я из...', pt: 'Eu sou de...', de: 'Ich komme aus...', id: 'Saya berasal dari...', tr: 'Ben ...-lıyım', ko: '저는 ... 출신입니다', ja: '私は...出身です', zh: '我来自...', hi: 'मैं... से हूँ', ar: 'أنا من...' },
  'goodbye': { en: 'Goodbye', es: 'Adiós', fr: 'Au revoir', ru: 'До свидания', pt: 'Tchau / Adeus', de: 'Auf Wiedersehen', id: 'Sampai jumpa', tr: 'Hoşça kalın', ko: '안녕히 가세요', ja: 'さようなら', zh: '再见', hi: 'अलविदा / फिर मिलेंगे', ar: 'مع السلامة' },
  'bye (informal)': { en: 'Bye (informal)', es: 'Chao / Hasta luego', fr: 'Salut / À plus', ru: 'Пока', pt: 'Tchau', de: 'Tschüss', id: 'Dadah', tr: 'Güle güle', ko: '잘 가', ja: 'またね', zh: '拜拜', hi: 'अलविदा / बाय', ar: 'وداعاً' },
  'see you later': { en: 'See you later', es: 'Hasta luego', fr: 'À bientôt', ru: 'Увидимся позже / Пока', pt: 'Até logo', de: 'Bis später', id: 'Sampai nanti', tr: 'Sonra görüşürüz', ko: '나중에 봐요', ja: 'また後で', zh: '一会儿见', hi: 'बाद में मिलते हैं', ar: 'إلى اللقاء' },
  'have a nice day': { en: 'Have a nice day', es: 'Que tenga un buen día', fr: 'Bonne journée', ru: 'Хорошего дня', pt: 'Tenha um bom dia', de: 'Schönen Tag noch', id: 'Semoga hari Anda menyenangkan', tr: 'İyi günler', ko: '좋은 하루 되세요', ja: '良い一日を', zh: '祝你度过美好的一天', hi: 'आपका दिन शुभ हो', ar: 'أتمنى لك يوماً جميلاً' },
  'have a great day': { en: 'Have a great day', es: 'Que tenga un buen día', fr: 'Bonne journée', ru: 'Хорошего дня', pt: 'Tenha um ótimo dia', de: 'Einen schönen Tag', id: 'Semoga hari Anda menyenangkan', tr: 'İyi günler', zh: '祝你拥有美好的一天', hi: 'आपका दिन बहुत अच्छा रहे', ar: 'أتمنى لك يوماً رائعاً' },
  'i understand': { en: 'I understand', es: 'Entiendo / Comprendo', fr: 'Je comprends', ru: 'Я понимаю', pt: 'Eu entendo', de: 'Ich verstehe', id: 'Saya mengerti', tr: 'Anlıyorum', ko: '이해해요', ja: '理解します', zh: '我明白了', hi: 'मैं समझ गया / समझ गई', ar: 'أنا أفهم' },
  'i do not understand': { en: 'I do not understand', es: 'No entiendo', fr: 'Je ne comprends pas', ru: 'Я не понимаю', pt: 'Eu não entendo', de: 'Ich verstehe nicht', id: 'Saya tidak mengerti', tr: 'Anlamıyorum', ar: 'لا أفهم' },
  'i don\'t understand': { en: 'I don\'t understand', es: 'No entiendo', fr: 'Je ne comprends pas', ru: 'Я не понимаю', pt: 'Eu não entendo', de: 'Ich verstehe nicht', id: 'Saya tidak mengerti', tr: 'Anlamıyorum', ar: 'لا أفهم' },
  'could you repeat that, please?': { en: 'Could you repeat that, please?', es: '¿Puede repetir, por favor?', fr: 'Pouvez-vous répéter ?', ru: 'Повторите, пожалуйста', pt: 'Pode repetir, por favor?', de: 'Können Sie das bitte wiederholen?', id: 'Bisa ulangi, tolong?', tr: 'Lütfen tekrar eder misiniz?', zh: '请重复一遍', hi: 'कृपया क्या आप इसे दोहरा सकते हैं?', ar: 'هل يمكنك تكرار ذلك من فضلك؟' },
  'can you repeat, please?': { en: 'Can you repeat, please?', es: '¿Puede repetir, por favor?', fr: 'Pouvez-vous répéter ?', ru: 'Повторите, пожалуйста', pt: 'Pode repetir, por favor?', de: 'Können Sie das bitte wiederholen?', id: 'Bisa ulangi, tolong?', tr: 'Lütfen tekrar eder misiniz?', ar: 'هل يمكنك الإعادة من فضلك؟' },
  'please repeat': { en: 'Please repeat', es: 'Repita, por favor', fr: 'Répétez, s\'il vous plaît', ru: 'Повторите, пожалуйста', pt: 'Repita, por favor', de: 'Bitte wiederholen', id: 'Tolong ulangi', tr: 'Lütfen tekrarlayın', ko: '다시 말씀해 주세요', ja: 'もう一度お願いします', zh: '请重复一遍', hi: 'कृपया दोहराएँ', ar: 'أعد من فضلك' },
  'please speak more slowly': { en: 'Please speak more slowly', es: 'Hable más despacio, por favor', fr: 'Parlez plus lentement, s\'il vous plaît', ru: 'Говорите медленнее, пожалуйста', pt: 'Fale mais devagar, por favor', de: 'Bitte sprechen Sie langsamer', id: 'Tolong bicara lebih pelan', tr: 'Lütfen daha yavaş konuşun', ko: '더 천천히 말해 주세요', ja: 'もっとゆっくり話してください', zh: '请说得更慢一些', hi: 'कृपया और धीरे बोलें', ar: 'تحدث ببطء أكثر من فضلك' },
  'can you speak more slowly?': { en: 'Can you speak more slowly?', es: '¿Puede hablar más despacio?', fr: 'Pouvez-vous parler plus lentement ?', ru: 'Можете говорить медленнее?', pt: 'Pode falar mais devagar?', de: 'Können Sie langsamer sprechen?', id: 'Bisa bicara lebih pelan?', tr: 'Daha yavaş konuşabilir misiniz?', ko: '더 천천히 말씀해 주시겠어요?', ja: 'もっとゆっくり話せますか？', zh: '你能说慢一点吗？', hi: 'क्या आप थोड़ा और धीरे बोल सकते हैं?', ar: 'هل يمكنك التحدث ببطء؟' },
  'speak more slowly': { en: 'Speak more slowly', es: 'Hable más despacio', fr: 'Parlez plus lentement', ru: 'Говорите медленнее', pt: 'Fale mais devagar', de: 'Sprechen Sie langsamer', id: 'Bicara lebih pelan', tr: 'Daha yavaş konuşun', ko: '천천히 말씀하세요', ja: 'ゆっくり話して', zh: '说慢一点', hi: 'धीरे बोलें', ar: 'تحدث ببطء' },
  'do you speak english?': { en: 'Do you speak English?', es: '¿Habla inglés?', fr: 'Parlez-vous anglais ?', ru: 'Вы говорите по-английски?', pt: 'Você fala inglês?', de: 'Sprechen Sie Englisch?', id: 'Apakah Anda berbicara bahasa Inggris?', tr: 'İngilizce biliyor musunuz?', zh: '你会说英语吗？', hi: 'क्या आप अंग्रेज़ी बोलते हैं?', ar: 'هل تتكلم الإنجليزية؟' },
  'i speak a little russian': { en: 'I speak a little Russian', es: 'Hablo un poco de ruso', fr: 'Je parle un peu russe', ru: 'Я немного говорю по-русски', pt: 'Eu falo um pouco de russo', de: 'Ich spreche ein bisschen Russisch', id: 'Saya berbicara sedikit bahasa Rusia', tr: 'Biraz Rusça konuşuyorum', ko: '러시아어를 조금 할 수 있어요', ja: 'ロシア語が少し話せます', zh: '我会说一点俄语', hi: 'मैं थोड़ी रूसी बोलता हूँ', ar: 'أتكلم القليل من الروسية' },
  'what does this mean?': { en: 'What does this mean?', es: '¿Qué significa esto?', fr: 'Qu\'est-ce que cela signifie ?', ru: 'Что это значит?', pt: 'O que significa isto?', de: 'Was bedeutet das?', id: 'Apa artinya ini?', tr: 'Bu ne demek?', ko: '이것은 무슨 뜻인가요?', ja: 'これはどういう意味ですか？', zh: '这是什么意思？', hi: 'इसका क्या मतलब है?', ar: 'ماذا يعني هذا؟' },
  'how do you say...?': { en: 'How do you say...?', es: '¿Cómo se dice...?', fr: 'Comment dit-on... ?', ru: 'Как сказать...?', pt: 'Como se diz...?', de: 'Wie sagt man...?', id: 'Bagaimana mengatakan...?', tr: 'Nasıl denir...?', ko: '어떻게 말하나요?', ja: 'どう言いますか？', zh: '...怎么说？', hi: '...को क्या कहते हैं?', ar: 'كيف تقول...؟' },
  'how do you say this in russian?': { en: 'How do you say this in Russian?', es: '¿Cómo se dice esto en ruso?', fr: 'Comment dit-on cela en russe ?', ru: 'Как это по-русски?', pt: 'Como se diz isto em russo?', de: 'Wie sagt man das auf Russisch?', id: 'Bagaimana mengatakan ini dalam bahasa Rusia?', tr: 'Bu Rusça nasıl söylenir?', ko: '러시아어로 어떻게 말하나요?', ja: 'ロシア語で何と言いますか？', zh: '这个用俄语怎么说？', hi: 'इसे रूसी में कैसे कहते हैं?', ar: 'كيف تقول هذا بالروسية؟' },
  'can you help me?': { en: 'Can you help me?', es: '¿Puede ayudarme?', fr: 'Pouvez-vous m\'aider ?', ru: 'Вы можете мне помочь?', pt: 'Pode me ajudar?', de: 'Können Sie mir helfen?', id: 'Bisa bantu saya?', tr: 'Bana yardım edebilir misiniz?', ko: '저를 도와주실 수 있나요?', ja: '手伝っていただけますか？', zh: '你能帮我吗？', hi: 'क्या आप मेरी मदद कर सकते हैं?', ar: 'هل يمكنك مساعدتي؟' },
  'i need help': { en: 'I need help', es: 'Necesito ayuda', fr: 'J\'ai besoin d\'aide', ru: 'Мне нужна помощь', pt: 'Preciso de ajuda', de: 'Ich brauche Hilfe', id: 'Saya butuh bantuan', tr: 'Yardıma ihtiyacım var', ko: '도움이 필요해요', ja: '助けが必要です', zh: '我需要帮助', hi: 'मुझे मदद की ज़रूरत है', ar: 'أحتاج إلى مساعدة' },
  'help me': { en: 'Help me', es: 'Ayúdeme', fr: 'Aidez-moi', ru: 'Помогите мне', pt: 'Ajude-me', de: 'Helfen Sie mir', id: 'Tolong saya', tr: 'Bana yardım edin', ko: '도와주세요', ja: '助けてください', zh: '帮帮我', hi: 'मेरी मदद करें', ar: 'ساعدني' },
  'help!': { en: 'Help!', es: '¡Ayuda! / ¡Socorro!', fr: 'À l\'aide ! / Au secours !', ru: 'Помогите!', pt: 'Socorro!', de: 'Hilfe!', id: 'Tolong!', tr: 'İmdat!', ko: '도와주세요!', ja: '助けて！', zh: '救命！', hi: 'बचाओ! / मदद!', ar: 'النجدة!' },
  'where is the restroom?': { en: 'Where is the restroom?', es: '¿Dónde está el baño?', fr: 'Où sont les toilettes ?', ru: 'Где находится туалет?', pt: 'Onde fica o banheiro?', de: 'Wo ist die Toilette?', id: 'Di mana kamar mandi?', tr: 'Tuvalet nerede?', zh: '洗手间在哪里？', hi: 'शौचालय कहाँ है?', ar: 'أين الحمام؟' },
  'where is the bathroom': { en: 'Where is the bathroom?', es: '¿Dónde está el baño?', fr: 'Où sont les toilettes ?', ru: 'Где туалет?', pt: 'Onde fica o banheiro?', de: 'Wo ist die Toilette?', id: 'Di mana kamar mandi?', tr: 'Tuvalet nerede?', zh: '洗手间在哪里？', ar: 'أين الحمام؟' },
  'where is the bathroom?': { en: 'Where is the bathroom?', es: '¿Dónde está el baño?', fr: 'Où sont les toilettes ?', ru: 'Где туалет?', pt: 'Onde fica o banheiro?', de: 'Wo ist die Toilette?', id: 'Di mana kamar mandi?', tr: 'Tuvalet nerede?', zh: '洗手间在哪里？', ar: 'أين الحمام؟' },
  'where is the train station?': { en: 'Where is the train station?', es: '¿Dónde está la estación de tren?', fr: 'Où est la gare ?', ru: 'Где находится вокзал?', pt: 'Onde fica a estação de trem?', de: 'Wo ist der Bahnhof?', id: 'Di mana stasiun kereta?', tr: 'Tren istasyonu nerede?', zh: '火车站在哪里？', hi: 'रेलवे स्टेशन कहाँ है?', ar: 'أين محطة القطار؟' },
  'where is the airport?': { en: 'Where is the airport?', es: '¿Dónde está el aeropuerto?', fr: 'Où est l\'aéroport ?', ru: 'Где находится аэропорт?', pt: 'Onde fica o aeroporto?', de: 'Wo ist der Flughafen?', id: 'Di mana bandara?', tr: 'Havalimanı nerede?', ko: '공항이 어디에 있나요?', ja: '空港はどこですか？', zh: '机场在哪里？', hi: 'हवाई अड्डा कहाँ है?', ar: 'أين المطار؟' },
  'i would like to go to the airport': { en: 'I would like to go to the airport', es: 'Quisiera ir al aeropuerto', fr: 'Je voudrais aller à l\'aéroport', ru: 'Я хочу поехать в аэропорт', pt: 'Gostaria de ir ao aeroporto', de: 'Ich möchte zum Flughafen fahren', id: 'Saya mau ke bandara', tr: 'Havalimanına gitmek istiyorum', ko: '공항에 가고 싶어요', ja: '空港に行きたいです', zh: '我想去机场', hi: 'मैं हवाई अड्डे जाना चाहता हूँ', ar: 'أود الذهاب إلى المطار' },
  'what time is the departure?': { en: 'What time is the departure?', es: '¿A qué hora es la salida?', fr: 'À quelle heure est le départ ?', ru: 'Во сколько отправление?', pt: 'A que horas é a partida?', de: 'Wann ist der Abflug?', id: 'Jam berapa keberangkatannya?', tr: 'Kalkış saat kaçta?', ko: '출발 시간이 언제인가요?', ja: '出発は何時ですか？', zh: '什么时候出发？', hi: 'रवाना होने का समय क्या है?', ar: 'في أي وقت المغادرة؟' },
  'where is the hotel?': { en: 'Where is the hotel?', es: '¿Dónde está el hotel?', fr: 'Où est l\'hôtel ?', ru: 'Где находится отель?', pt: 'Onde fica o hotel?', de: 'Wo ist das Hotel?', id: 'Di mana hotelnya?', tr: 'Otel nerede?', ko: '호텔이 어디에 있나요?', ja: 'ホテルはどこですか？', zh: '酒店在哪里？', hi: 'होटल कहाँ है?', ar: 'أين الفندق؟' },
  'how much is a ticket?': { en: 'How much is a ticket?', es: '¿Cuánto cuesta un boleto?', fr: 'Combien coûte un billet ?', ru: 'Сколько стоит билет?', pt: 'Quanto custa uma passagem?', de: 'Was kostet ein Ticket?', id: 'Berapa harga tiketnya?', tr: 'Bilet ne kadar?', ko: '표는 얼마인가요?', ja: '切符はいくらですか？', zh: '一张票多少钱？', hi: 'एक टिकट कितने का है?', ar: 'كم سعر التذكرة؟' },
  'i need a taxi': { en: 'I need a taxi', es: 'Necesito un taxi', fr: 'J\'ai besoin d\'un taxi', ru: 'Мне нужно такси', pt: 'Preciso de um táxi', de: 'Ich brauche ein Taxi', id: 'Saya butuh taksi', tr: 'Taksiye ihtiyacım var', zh: '我需要一辆出租车', hi: 'मुझे टैक्सी चाहिए', ar: 'أحتاج إلى سيارة أجرة' },
  'turn left': { en: 'Turn left', es: 'Gire a la izquierda', fr: 'Tournez à gauche', ru: 'Поверните налево', pt: 'Vire à esquerda', de: 'Links abbiegen', id: 'Belok kiri', tr: 'Sola dönün', ko: '좌회전', ja: '左折', zh: '左转', hi: 'बाएँ मुड़ें', ar: 'انعطف يساراً' },
  'turn right': { en: 'Turn right', es: 'Gire a la derecha', fr: 'Tournez à droite', ru: 'Поверните направо', pt: 'Vire à direita', de: 'Rechts abbiegen', id: 'Belok kanan', tr: 'Sağa dönün', ko: '우회전', ja: '右折', zh: '右转', hi: 'दाएँ मुड़ें', ar: 'انعطف يميناً' },
  'go straight ahead': { en: 'Go straight ahead', es: 'Siga todo recto', fr: 'Allez tout droit', ru: 'Идите прямо', pt: 'Siga em frente', de: 'Geradeaus gehen', id: 'Jalan lurus terus', tr: 'Düz gidin', ko: '곧장 가세요', ja: 'まっすぐ進んでください', zh: '直走', hi: 'सीधे आगे जाएँ', ar: 'اذهب إلى الأمام مباشرة' },
  'a table for two, please': { en: 'A table for two, please', es: 'Una mesa para dos, por favor', fr: 'Une table pour deux, s\'il vous plaît', ru: 'Столик на двоих, пожалуйста', pt: 'Uma mesa para dois, por favor', de: 'Einen Tisch für zwei, bitte', id: 'Meja untuk dua orang', tr: 'İki kişilik masa, lütfen', zh: '请安排两位', hi: 'दो लोगों के लिए एक मेज़, कृपया', ar: 'طاولة لشخصين من فضلك' },
  'the menu, please': { en: 'The menu, please', es: 'El menú, por favor', fr: 'La carte, s\'il vous plaît', ru: 'Меню, пожалуйста', pt: 'O cardápio, por favor', de: 'Die Speisekarte, bitte', id: 'Minta daftar menunya', tr: 'Menüyü görebilir miyim?', zh: '请给我菜单', hi: 'कृपया मेनू दिखाइए', ar: 'قائمة الطعام من فضلك' },
  'can i see the menu, please?': { en: 'Can I see the menu, please?', es: '¿Puedo ver el menú, por favor?', fr: 'Puis-je voir la carte ?', ru: 'Можно меню, пожалуйста?', pt: 'Posso ver o cardápio?', de: 'Kann ich bitte die Speisekarte sehen?', id: 'Minta daftar menunya', tr: 'Menüyü görebilir miyim?', ko: '메뉴판을 볼 수 있을까요?', ja: 'メニューを見せてもらえますか？', zh: '可以给我看一下菜单吗？', hi: 'क्या मुझे मेनू मिल सकता है?', ar: 'هل يمكنني رؤية قائمة الطعام من فضلك؟' },
  'i would like water': { en: 'I would like water', es: 'Quisiera agua', fr: 'Je voudrais de l\'eau', ru: 'Я бы хотел(а) воды', pt: 'Eu gostaria de água', de: 'Ich hätte gern Wasser', id: 'Saya mau air putih', tr: 'Su istiyorum', ko: '물 주세요', ja: 'お水をください', zh: '我想要水', hi: 'मुझे पानी चाहिए', ar: 'أود ماءً' },
  'i want to eat': { en: 'I want to eat', es: 'Quiero comer', fr: 'Je veux manger', ru: 'Я хочу есть', pt: 'Quero comer', de: 'Ich möchte essen', id: 'Saya ingin makan', tr: 'Yemek istiyorum', ko: '먹고 싶어요', ja: '食べたいです', zh: '我想吃东西', hi: 'मुझे भूख लगी है / मैं खाना चाहता हूँ', ar: 'أريد أن آكل' },
  'i want to drink': { en: 'I want to drink', es: 'Quiero beber', fr: 'Je veux boire', ru: 'Я хочу пить', pt: 'Quero beber', de: 'Ich möchte trinken', id: 'Saya ingin minum', tr: 'İçmek istiyorum', ko: '마시고 싶어요', ja: '飲みたいです', zh: '我想喝水', hi: 'मुझे प्यास लगी है / मैं पीना चाहता हूँ', ar: 'أريد أن أشرب' },
  'what do you recommend?': { en: 'What do you recommend?', es: '¿Qué recomienda?', fr: 'Que recommandez-vous ?', ru: 'Что вы порекомендуете?', pt: 'O que você recomenda?', de: 'Was empfehlen Sie?', id: 'Apa yang Anda rekomendasikan?', tr: 'Ne tavsiye edersiniz?', ko: '무엇을 추천하시나요?', ja: 'おすすめは何ですか？', zh: '你推荐什么？', hi: 'आप क्या पसंद करने की सलाह देते हैं?', ar: 'ماذا تقترح؟' },
  'this is delicious!': { en: 'This is delicious!', es: '¡Está delicioso!', fr: 'C\'est délicieux !', ru: 'Это очень вкусно!', pt: 'Isto está delicioso!', de: 'Das ist köstlich!', id: 'Ini enak sekali!', tr: 'Bu çok lezzetli!', ko: '정말 맛있어요!', ja: 'とても美味しいです！', zh: '这个真好吃！', hi: 'यह बहुत स्वादिष्ट है!', ar: 'هذا لذيذ جداً!' },
  'can i have the check, please?': { en: 'Can I have the check, please?', es: 'La cuenta, por favor', fr: 'L\'addition, s\'il vous plaît', ru: 'Счёт, пожалуйста', pt: 'A conta, por favor', de: 'Die Rechnung, bitte', id: 'Minta bonnya, tolong', tr: 'Hesap, lütfen', ar: 'الحساب من فضلك' },
  'the bill / check, please': { en: 'The check, please', es: 'La cuenta, por favor', fr: 'L\'addition, s\'il vous plaît', ru: 'Счёт, пожалуйста', pt: 'A conta, por favor', de: 'Die Rechnung, bitte', id: 'Minta bonnya, tolong', tr: 'Hesap, lütfen', zh: '买单', hi: 'कृपया बिल ले आइए', ar: 'الفاتورة من فضلك' },
  'the check, please': { en: 'The check, please', es: 'La cuenta, por favor', fr: 'L\'addition, s\'il vous plaît', ru: 'Счёт, пожалуйста', pt: 'A conta, por favor', de: 'Die Rechnung, bitte', id: 'Minta bonnya, tolong', tr: 'Hesap, lütfen', zh: '买单', hi: 'कृपया बिल ले आइए', ar: 'الحساب من فضلك' },
  'how much does this cost?': { en: 'How much does this cost?', es: '¿Cuánto cuesta esto?', fr: 'Combien ça coûte ?', ru: 'Сколько это стоит?', pt: 'Quanto custa isto?', de: 'Was kostet das?', id: 'Berapa harganya?', tr: 'Bu ne kadar?', ko: '이것은 얼마인가요?', ja: 'これはいくらですか？', zh: '这个多少钱？', hi: 'इसकी क़ीमत क्या है?', ar: 'كم يكلف هذا؟' },
  'how much does it cost': { en: 'How much does it cost?', es: '¿Cuánto cuesta?', fr: 'Combien ça coûte ?', ru: 'Сколько стоит?', pt: 'Quanto custa?', de: 'Was kostet das?', id: 'Berapa harganya?', tr: 'Bu ne kadar?', zh: '多少钱？', hi: 'यह कितने का है?', ar: 'كم يكلف هذا؟' },
  'do you accept credit cards?': { en: 'Do you accept credit cards?', es: '¿Aceptan tarjetas de crédito?', fr: 'Acceptez-vous les cartes bancaires ?', ru: 'Вы принимаете банковские карты?', pt: 'Vocês aceitam cartão de crédito?', de: 'Nehmen Sie Kreditkarten?', id: 'Apakah menerima kartu kredit?', tr: 'Kredi kartı geçiyor mu?', zh: '可以刷信用卡吗？', hi: 'क्या आप क्रेडिट कार्ड लेते हैं?', ar: 'هل تقبلون بطاقات الائتمان؟' },
  'can i pay by card?': { en: 'Can I pay by card?', es: '¿Puedo pagar con tarjeta?', fr: 'Puis-je payer par carte ?', ru: 'Можно оплатить картой?', pt: 'Posso pagar com cartão?', de: 'Kann ich mit Karte zahlen?', id: 'Bisa bayar pakai kartu?', tr: 'Kartla ödeyebilir miyim?', ko: '카드로 결제할 수 있나요?', ja: 'カードで支払えますか？', zh: '可以刷卡吗？', hi: 'क्या मैं कार्ड से भुगतान कर सकता हूँ?', ar: 'هل يمكنني الدفع بالبطاقة؟' },
  'i am just looking': { en: 'I am just looking', es: 'Solo estoy mirando', fr: 'Je regarde seulement', ru: 'Я просто смотрю', pt: 'Só estou olhando', de: 'Ich schaue nur', id: 'Saya hanya melihat-lihat', tr: 'Sadece bakıyorum', ko: '그냥 구경하는 중이에요', ja: '見ているだけです', zh: '我只是随便看看', hi: 'मैं बस देख रहा हूँ', ar: 'أنا فقط أتفرج' },
  'i am just looking, thank you': { en: 'I am just looking, thank you', es: 'Solo estoy mirando, gracias', fr: 'Je regarde seulement, merci', ru: 'Я просто смотрю, спасибо', pt: 'Só estou olhando, obrigado', de: 'Ich schaue nur, danke', id: 'Saya hanya melihat-lihat', tr: 'Sadece bakıyorum, teşekkürler', ko: '그냥 둘러보는 거예요, 감사합니다', ja: '見ているだけです、ありがとう', zh: '我只是看看，谢谢', hi: 'मैं बस देख रहा हूँ, धन्यवाद', ar: 'أنا فقط أتفرج، شكراً' },
  'do you have this in another size?': { en: 'Do you have this in another size?', es: '¿Tiene esto en otra talla?', fr: 'Avez-vous ceci dans une autre taille ?', ru: 'У вас есть другой размер?', pt: 'Tem isto em outro tamanho?', de: 'Haben Sie das in einer anderen Größe?', id: 'Apakah ada ukuran lain?', tr: 'Bunun başka bedeni var mı?', ko: '다른 사이즈가 있나요?', ja: '別のサイズはありますか？', zh: '有别的尺码吗？', hi: 'क्या आपके पास यह किसी अन्य आकार में है?', ar: 'هل لديك هذا بمقاس آخر؟' },
  'it is too expensive': { en: 'It is too expensive', es: 'Es demasiado caro', fr: 'C\'est trop cher', ru: 'Это слишком дорого', pt: 'É muito caro', de: 'Das ist zu teuer', id: 'Ini terlalu mahal', tr: 'Bu çok pahalı', zh: '太贵了', hi: 'यह बहुत महँगा है', ar: 'هذا مكلف جداً' },
  'i need a doctor': { en: 'I need a doctor', es: 'Necesito un médico', fr: 'J\'ai besoin d\'un médecin', ru: 'Мне нужен врач', pt: 'Preciso de um médico', de: 'Ich brauche einen Arzt', id: 'Saya butuh dokter', tr: 'Doktora ihtiyacım var', zh: '我需要医生', hi: 'मुझे डॉक्टर की ज़रूरत है', ar: 'أحتاج إلى طبيب' },
  'i don\'t feel well': { en: 'I don\'t feel well', es: 'No me siento bien', fr: 'Je ne me sens pas bien', ru: 'Я плохо себя чувствую', pt: 'Não estou me sentindo bem', de: 'Ich fühle mich nicht wohl', id: 'Saya merasa kurang sehat', tr: 'Kendimi iyi hissetmiyorum', ar: 'أشعر بتوعك' },
  'call the police': { en: 'Call the police', es: 'Llame a la policía', fr: 'Appelez la police', ru: 'Вызовите полицию', pt: 'Chame a polícia', de: 'Rufen Sie die Polizei', id: 'Panggil polisi', tr: 'Polisi arayın', ko: '경찰을 불러주세요', ja: '警察を呼んでください', zh: '报警', hi: 'पुलिस को बुलाएँ', ar: 'اتصل بالشرطة' },
  'i lost my passport': { en: 'I lost my passport', es: 'Perdí mi pasaporte', fr: 'J\'ai perdu mon passeport', ru: 'Я потерял(а) свой паспорт', pt: 'Perdi meu passaporte', de: 'Ich habe meinen Reisepass verloren', id: 'Saya kehilangan paspor saya', tr: 'Pasaportumu kaybettim', ko: '여권을 잃어버렸어요', ja: 'パスポートを紛失しました', zh: '我护照丢了', hi: 'मेरा पासपोर्ट खो गया है', ar: 'فقدت جواز سفري' },

  // Time expressions
  'what time is it?': { en: 'What time is it?', es: '¿Qué hora es?', fr: 'Quelle heure est-il ?', ru: 'Который час?', pt: 'Que horas são?', de: 'Wie spät ist es?', id: 'Jam berapa sekarang?', tr: 'Saat kaç?', zh: '几点了？', hi: 'क्या समय हुआ है?', ar: 'كم الساعة؟', ko: '지금 몇 시예요?', ja: '今何時ですか？', bn: 'এখন কয়টা বাজে?', ur: 'کتنے بجے ہیں؟' },
  'what time is it now?': { en: 'What time is it now?', es: '¿Qué hora es ahora?', fr: 'Quelle heure est-il maintenant ?', ru: 'Сколько сейчас времени?', pt: 'Que horas são agora?', de: 'Wie viel Uhr ist es jetzt?', id: 'Jam berapa sekarang?', tr: 'Şu an saat kaç?', ko: '지금 몇 시인가요?', ja: '今何時ですか？', zh: '现在几点了？', hi: 'अभी क्या समय हुआ है?', ar: 'كم الساعة الآن؟' },
  'at what time?': { en: 'At what time?', es: '¿A qué hora?', fr: 'À quelle heure ?', ru: 'Во сколько?', pt: 'A que horas?', de: 'Um wie viel Uhr?', id: 'Jam berapa?', tr: 'Saat kaçta?', ko: '몇 시에?', ja: '何時に？', zh: '什么时候？ / 几点？', hi: 'किस समय पर?', ar: 'في أي وقت؟' },
  'now': { en: 'Now', es: 'Ahora', fr: 'Maintenant', ru: 'Сейчас', pt: 'Agora', de: 'Jetzt', id: 'Sekarang', tr: 'Şimdi', ko: '지금', ja: '今', zh: '现在', hi: 'अब / अभी', ar: 'الآن' },
  'hour': { en: 'Hour', es: 'Hora', fr: 'Heure', ru: 'Час', pt: 'Hora', de: 'Stunde', id: 'Jam', tr: 'Saat', ko: '시간 / 시', ja: '時間 / 時', zh: '小时', hi: 'घंटा', ar: 'ساعة' },
  'minute': { en: 'Minute', es: 'Minuto', fr: 'Minute', ru: 'Минута', pt: 'Minuto', de: 'Minute', id: 'Menit', tr: 'Dakika', ko: '분', ja: '分', zh: '分钟', hi: 'मिनट', ar: 'دقيقة' },
  'second': { en: 'Second', es: 'Segundo', fr: 'Seconde', ru: 'Секунда', pt: 'Segundo', de: 'Sekunde', id: 'Detik', tr: 'Saniye', ko: '초', ja: '秒', zh: '秒', hi: 'सेकंड', ar: 'ثانية' },
  'one o\'clock': { en: 'One o\'clock (1:00)', es: 'Es la una (1:00)', fr: 'Il est une heure (1:00)', ru: 'Один час (1:00)', pt: 'É uma hora (1:00)', de: 'Es ist ein Uhr (1:00)', id: 'Jam satu (1:00)', tr: 'Saat bir (1:00)', ko: '시계', ja: '時計', zh: '钟表', ar: 'الساعة الواحدة' },
  'it is one o\'clock on the dot': { en: 'It is 1:00 sharp', es: 'Es la una en punto', fr: 'Il est une heure pile', ru: 'Ровно один час (1:00)', pt: 'É uma hora em ponto', de: 'Es ist Punkt ein Uhr', id: 'Sekarang jam satu tepat', tr: 'Saat tam bir', zh: '正好一点整', hi: 'ठीक एक बजा है', ar: 'الساعة الواحدة تماماً' },
  'two o\'clock': { en: 'Two o\'clock (2:00)', es: 'Son las dos (2:00)', fr: 'Il est deux heures (2:00)', ru: 'Два часа (2:00)', pt: 'São duas horas (2:00)', de: 'Es ist zwei Uhr (2:00)', id: 'Jam dua (2:00)', tr: 'Saat iki (2:00)', ar: 'الساعة الثانية', ko: '2시 (2:00)', ja: '2時 (2:00)', zh: '两点钟 (2:00)', hi: 'दो बजे हैं (2:00)', bn: 'দুইটা বাজে (2:00)', ur: 'دو بجے ہیں (2:00)' },
  'it is two o\'clock': { en: 'It is 2:00', es: 'Son las dos', fr: 'Il est deux heures', ru: 'Два часа (2:00)', pt: 'São duas horas', de: 'Es ist zwei Uhr', id: 'Sekarang jam dua', tr: 'Saat iki', ko: '시계', ja: '時計', zh: '钟表', hi: 'दो बजे हैं', ar: 'إنها الساعة الثانية' },
  'three o\'clock': { en: 'Three o\'clock (3:00)', es: 'Son las tres (3:00)', fr: 'Il est trois heures (3:00)', ru: 'Три часа (3:00)', pt: 'São três horas (3:00)', de: 'Es ist drei Uhr (3:00)', id: 'Jam tiga (3:00)', tr: 'Saat üç (3:00)', ko: '시계', ja: '時計', zh: '钟表', ar: 'الساعة الثالثة' },
  'exactly three o\'clock': { en: 'Exactly three o\'clock (3:00)', es: 'Las tres en punto', fr: 'Trois heures pile', ru: 'Ровно три часа (3:00)', pt: 'Três horas em ponto', de: 'Punkt drei Uhr', id: 'Jam tiga tepat', tr: 'Saat tam üç', ko: '시계', ja: '時計', zh: '钟表', ar: 'الساعة الثالثة تماماً' },
  'four o\'clock': { en: 'Four o\'clock (4:00)', es: 'Son las cuatro (4:00)', fr: 'Il est quatre heures (4:00)', ru: 'Четыре часа (4:00)', pt: 'São quatro horas (4:00)', de: 'Es ist vier Uhr (4:00)', id: 'Jam empat (4:00)', tr: 'Saat dört (4:00)', ko: '시계', ja: '時計', zh: '钟表', ar: 'الساعة الرابعة' },
  'five o\'clock': { en: 'Five o\'clock (5:00)', es: 'Son las cinco (5:00)', fr: 'Il est cinq heures (5:00)', ru: 'Пять часов (5:00)', pt: 'São cinco horas (5:00)', de: 'Es ist fünf Uhr (5:00)', id: 'Jam lima (5:00)', tr: 'Saat beş (5:00)', ko: '시계', ja: '時計', zh: '钟表', ar: 'الساعة الخامسة' },
  'six o\'clock': { en: 'Six o\'clock (6:00)', es: 'Son las seis (6:00)', fr: 'Il est six heures (6:00)', ru: 'Шесть часов (6:00)', pt: 'São seis horas (6:00)', de: 'Es ist sechs Uhr (6:00)', id: 'Jam enam (6:00)', tr: 'Saat altı (6:00)', ko: '시계', ja: '時計', zh: '钟表', ar: 'الساعة السادسة' },
  'seven o\'clock': { en: 'Seven o\'clock (7:00)', es: 'Son las siete (7:00)', fr: 'Il est sept heures (7:00)', ru: 'Семь часов (7:00)', pt: 'São sete horas (7:00)', de: 'Es ist sieben Uhr (7:00)', id: 'Jam tujuh (7:00)', tr: 'Saat yedi (7:00)', ko: '시계', ja: '時計', zh: '钟表', ar: 'الساعة السابعة' },
  'eight o\'clock': { en: 'Eight o\'clock (8:00)', es: 'Son las ocho (8:00)', fr: 'Il est huit heures (8:00)', ru: 'Восемь часов (8:00)', pt: 'São oito horas (8:00)', de: 'Es ist acht Uhr (8:00)', id: 'Jam delapan (8:00)', tr: 'Saat sekiz (8:00)', ko: '시계', ja: '時計', zh: '钟表', ar: 'الساعة الثامنة' },
  'nine o\'clock': { en: 'Nine o\'clock (9:00)', es: 'Son las nueve (9:00)', fr: 'Il est neuf heures (9:00)', ru: 'Девять часов (9:00)', pt: 'São nove horas (9:00)', de: 'Es ist neun Uhr (9:00)', id: 'Jam sembilan (9:00)', tr: 'Saat dokuz (9:00)', ko: '시계', ja: '時計', zh: '钟表', ar: 'الساعة التاسعة' },
  'ten o\'clock': { en: 'Ten o\'clock (10:00)', es: 'Son las diez (10:00)', fr: 'Il est dix heures (10:00)', ru: 'Десять часов (10:00)', pt: 'São dez horas (10:00)', de: 'Es ist zehn Uhr (10:00)', id: 'Jam sepuluh (10:00)', tr: 'Saat on (10:00)', ko: '시계', ja: '時計', zh: '钟表', ar: 'الساعة العاشرة' },
  'eleven o\'clock': { en: 'Eleven o\'clock (11:00)', es: 'Son las once (11:00)', fr: 'Il est onze heures (11:00)', ru: 'Одиннадцать часов (11:00)', pt: 'São onze horas (11:00)', de: 'Es ist elf Uhr (11:00)', id: 'Jam sebelas (11:00)', tr: 'Saat on bir (11:00)', ko: '시계', ja: '時計', zh: '钟表', ar: 'الساعة الحادية عشرة' },
  'twelve o\'clock': { en: 'Twelve o\'clock (12:00)', es: 'Son las doce (12:00)', fr: 'Il est douze heures (12:00)', ru: 'Двенадцать часов (12:00)', pt: 'São doze horas (12:00)', de: 'Es ist zwölf Uhr (12:00)', id: 'Jam dua belas (12:00)', tr: 'Saat on iki (12:00)', ko: '시계', ja: '時計', zh: '钟表', ar: 'الساعة الثانية عشرة' },
  'half past two': { en: 'Half past two (2:30)', es: 'Las dos y media (2:30)', fr: 'Deux heures et demie (2:30)', ru: 'Половина третьего (2:30)', pt: 'Duas e meia (2:30)', de: 'Halb drei (2:30)', id: 'Setengah tiga (2:30)', tr: 'Saat iki buçuk (2:30)', zh: '两点半', hi: 'ढाई बजे हैं (2:30)', ar: 'الثانية والنصف', ko: '2시 반 (2:30)', ja: '2時半 (2:30)', bn: 'আড়াইটা বাজে (2:30)', ur: 'ڈھائی بجے ہیں (2:30)' },
  'quarter to three': { en: 'Quarter to three (2:45)', es: 'Las tres menos cuarto (2:45)', fr: 'Trois heures moins le quart (2:45)', ru: 'Без четверти три (2:45)', pt: 'Quinze para as três (2:45)', de: 'Viertel vor drei (2:45)', id: 'Jam tiga kurang seperempat (2:45)', tr: 'Saat üçe çeyrek var (2:45)', zh: '两点四十五', hi: 'पौने तीन बजे हैं (2:45)', ar: 'الثالثة إلا ربعاً', ko: '3시 15분 전 (2:45)', ja: '3時15分前 (2:45)', bn: 'তিনটা বাজতে পনেরো মিনিট বাকি (2:45)', ur: 'تین بجنے میں پندرہ منٹ باقی ہیں (2:45)' },
  'it is 3:30 (half past three)': { en: '3:30 (half past three)', es: 'Son las tres y media', fr: 'Il est trois heures et demie', ru: 'Половина четвёртого (3:30)', pt: 'São três e meia', de: 'Es ist halb vier', id: 'Sekarang jam setengah empat', tr: 'Saat üç buçuk', zh: '三点半', hi: 'साढ़े तीन (3:30)' },
  'it is 4:15 (quarter past four)': { en: '4:15 (quarter past four)', es: 'Son las cuatro y cuarto', fr: 'Il est quatre heures et quart', ru: 'Четверть пятого (4:15)', pt: 'São quatro e quinze', de: 'Es ist Viertel nach vier', id: 'Sekarang jam empat lewat seperempat', tr: 'Saat dördü çeyrek geçiyor', zh: '四点十五分', hi: 'सवा चार (4:15)' },
  'it is 4:45 (quarter to five)': { en: '4:45 (quarter to five)', es: 'Son las cinco menos cuarto', fr: 'Il est cinq heures moins le quart', ru: 'Без четверти пять (4:45)', pt: 'São quinze para as cinco', de: 'Es ist Viertel vor fünf', id: 'Sekarang jam lima kurang seperempat', tr: 'Saat beşe çeyrek var', zh: '四点四十五分', hi: 'पौने पाँच (4:45)' },
  '3:30 (half past three)': { en: '3:30 (half past three)', es: 'Son las tres y media', fr: 'Il est trois heures et demie', ru: 'Половина четвёртого (3:30)', pt: 'São três e meia', de: 'Es ist halb vier', id: 'Sekarang jam setengah empat', tr: 'Saat üç buçuk', zh: '三点半', hi: 'साढ़े तीन (3:30)' },
  '4:15 (quarter past four)': { en: '4:15 (quarter past four)', es: 'Son las cuatro y cuarto', fr: 'Il est quatre heures et quart', ru: 'Четверть пятого (4:15)', pt: 'São quatro e quinze', de: 'Es ist Viertel nach vier', id: 'Sekarang jam empat lewat seperempat', tr: 'Saat dördü çeyrek geçiyor', zh: '四点十五分', hi: 'सवा चार (4:15)' },
  '4:45 (quarter to five)': { en: '4:45 (quarter to five)', es: 'Son las cinco menos cuarto', fr: 'Il est cinq heures moins le quart', ru: 'Без четверти пять (4:45)', pt: 'São quinze para as cinco', de: 'Es ist Viertel vor fünf', id: 'Sekarang jam lima kurang seperempat', tr: 'Saat beşe çeyrek var', zh: '四点四十五分', hi: 'पौने पाँच (4:45)' },
  'it is 1:00 sharp': { en: 'It is 1:00 sharp', es: 'Es la una en punto', fr: 'Il est une heure pile', ru: 'Ровно один час', pt: 'É uma hora em ponto', de: 'Es ist Punkt ein Uhr', id: 'Sekarang jam satu tepat', tr: 'Saat tam bir', zh: '正好一点整', hi: 'ठीक एक बजा है' },
  'it is 2:00': { en: 'It is 2:00', es: 'Son las dos', fr: 'Il est deux heures', ru: 'Два часа', pt: 'São duas horas', de: 'Es ist zwei Uhr', id: 'Sekarang jam dua', tr: 'Saat iki', zh: '两点整', hi: 'दो बजे हैं' },
  'hi / bye': { en: 'Hi / Bye', es: 'Hola', fr: 'Salut', ru: 'Привет', pt: 'Olá', de: 'Hallo', id: 'Halo', tr: 'Merhaba', ko: '안녕', ja: 'やあ', zh: '嗨 / 拜拜', hi: 'नमस्ते / अलविदा', ar: 'مرحباً / وداعاً' },
  'es ist elf uhr': { en: 'Eleven o\'clock (11:00)', es: 'Son las once', fr: 'Il est onze heures', ru: 'Одиннадцать часов (11:00)', pt: 'São onze horas', de: 'Es ist elf Uhr', id: 'Jam sebelas', tr: 'Saat on bir' },
  'son las cuatro y cuarto': { en: '4:15 (quarter past four)', es: 'Son las cuatro y cuarto', fr: 'Il est quatre heures et quart', ru: 'Четверть пятого (4:15)', pt: 'São quatro e quinze', de: 'Es ist Viertel nach vier', id: 'Sekarang jam empat lewat seperempat', tr: 'Saat dördü çeyrek geçiyor', zh: '四点十五分', hi: 'सवा चार (4:15)' },
  'son las cinco menos cuarto': { en: '4:45 (quarter to five)', es: 'Son las cinco menos cuarto', fr: 'Il est cinq heures moins le quart', ru: 'Без четверти пять (4:45)', pt: 'São quinze para as cinco', de: 'Es ist Viertel vor fünf', id: 'Sekarang jam lima kurang seperempat', tr: 'Saat beşe çeyrek var', zh: '四点四十五分', hi: 'पौने पाँच (4:45)' },
  'il est quatre heures et quart': { en: '4:15 (quarter past four)', es: 'Son las cuatro y cuarto', fr: 'Il est quatre heures et quart', ru: 'Четверть пятого (4:15)', pt: 'São quatro e quinze', de: 'Es ist Viertel nach vier', id: 'Sekarang jam empat lewat seperempat', tr: 'Saat dördü çeyrek geçiyor', zh: '四点十五分', hi: 'सवा चार (4:15)' },
  'il est cinq heures moins le quart': { en: '4:45 (quarter to five)', es: 'Son las cinco menos cuarto', fr: 'Il est cinq heures moins le quart', ru: 'Без четверти пять (4:45)', pt: 'São quinze para as cinco', de: 'Es ist Viertel vor fünf', id: 'Sekarang jam lima kurang seperempat', tr: 'Saat beşe çeyrek var', zh: '四点四十五分', hi: 'पौने पाँच (4:45)' },
  'half past twelve (12:30)': { en: 'Half past twelve (12:30)', es: 'Las doce y media (12:30)', fr: 'Midi et demi (12:30)', ru: 'Половина первого (12:30)', pt: 'Meio-dia e meia (12:30)', de: 'Halb eins (12:30)', id: 'Setengah satu siang (12:30)', tr: 'Saat on iki buçuk (12:30)', zh: '十二点半', hi: 'साढ़े बारह बजे हैं (12:30)' },
  'ten to two (1:50)': { en: 'Ten to two (1:50)', es: 'Las dos menos diez (1:50)', fr: 'Deux heures moins dix (1:50)', ru: 'Без десяти два (1:50)', pt: 'Dez para as duas (1:50)', de: 'Zehn vor zwei (1:50)', id: 'Jam dua kurang sepuluh (1:50)', tr: 'Saat ikiye on var (1:50)', zh: '一点五十', hi: 'दो बजने में दस मिनट' },
  'half an hour': { en: 'Half an hour', es: 'Media hora', fr: 'Une demi-heure', ru: 'Полчаса', pt: 'Meia hora', de: 'Eine halbe Stunde', id: 'Setengah jam', tr: 'Yarım saat', ko: '30분 / 반 시간', ja: '30分 / 半時間', zh: '半小时', hi: 'आधा घंटा', ar: 'نصف ساعة' },
  'quarter of an hour': { en: 'Quarter of an hour', es: 'Un cuarto de hora', fr: 'Un quart d\'heure', ru: 'Четверть часа', pt: 'Um quarto de hora', de: 'Eine Viertelstunde', id: 'Seperempat jam', tr: 'Çeyrek saat', ko: '15분', ja: '15分', zh: '一刻钟', hi: 'पंद्रह मिनट / एक चौथाई घंटा', ar: 'ربع ساعة' },
  'in the morning (a.m.)': { en: 'In the morning (a.m.)', es: 'De la mañana (a.m.)', fr: 'Du matin', ru: 'Утра (утром)', pt: 'Da manhã', de: 'Morgens', id: 'Di pagi hari', tr: 'Sabahleyin', ko: '오전에 (a.m.)', ja: '午前に', zh: '上午', hi: 'सुबह (एएम)', ar: 'في الصباح' },
  'in the afternoon (p.m.)': { en: 'In the afternoon (p.m.)', es: 'De la tarde (p.m.)', fr: 'De l\'après-midi', ru: 'Дня (днём)', pt: 'Da tarde', de: 'Nachmittags', id: 'Di siang hari', tr: 'Öğleden sonra', ko: '오후에 (p.m.)', ja: '午後に', zh: '下午', hi: 'दोपहर (पीएम)', ar: 'بعد الظهر' },
  'in the evening (p.m.)': { en: 'In the evening (p.m.)', es: 'De la noche / tarde (p.m.)', fr: 'Du soir', ru: 'Вечера (вечером)', pt: 'Da noite', de: 'Abends', id: 'Di sore hari', tr: 'Akşamleyin', zh: '晚上', hi: 'शाम को', ar: 'في المساء' },
  'at night': { en: 'At night', es: 'Por la noche', fr: 'La nuit', ru: 'Ночи (ночью)', pt: 'À noite', de: 'Nachts', id: 'Di malam hari', tr: 'Geceleyin', ko: '밤에', ja: '夜に', zh: '在夜里', hi: 'रात में', ar: 'في الليل' },
  'noon / midday': { en: 'Noon / Midday', es: 'Mediodía', fr: 'Midi', ru: 'Полдень', pt: 'Meio-dia', de: 'Mittag', id: 'Tengah hari', tr: 'Öğle', zh: '中午', hi: 'दोपहर के 12 बजे', ar: 'الظهر' },
  'midnight': { en: 'Midnight', es: 'Medianoche', fr: 'Minuit', ru: 'Полночь', pt: 'Meia-noite', de: 'Mitternacht', id: 'Tengah malam', tr: 'Gece yarısı', zh: '半夜 / 午夜', hi: 'आधी रात', ar: 'منتصف الليل' },
  'on time': { en: 'On time', es: 'A tiempo / Puntual', fr: 'À l\'heure', ru: 'Вовремя', pt: 'No horário', de: 'Pünktlich', id: 'Tepat waktu', tr: 'Zamanında', ko: '정각에 / 제시간에', ja: '時間通りに', zh: '准时', hi: 'समय पर', ar: 'في الوقت المحدد' },
  'early': { en: 'Early', es: 'Temprano', fr: 'Tôt', ru: 'Рано', pt: 'Cedo', de: 'Früh', id: 'Lebih awal', tr: 'Erken', ko: '일찍', ja: '早い', zh: '早', hi: 'जल्दी / समय से पहले', ar: 'مبكراً' },
  'late': { en: 'Late', es: 'Tarde', fr: 'En retard / Tard', ru: 'Поздно', pt: 'Tarde / Atrasado', de: 'Spät', id: 'Terlambat', tr: 'Geç', ko: '늦게', ja: '遅い', zh: '晚', hi: 'देर से / विलंब', ar: 'متأخراً' },

  // Spanish & French curriculum translation variants
  'hello! / hi!': { en: 'Hello! / Hi!', es: '¡Hola!', fr: 'Bonjour / Salut', ru: 'Привет! / Здравствуйте!', pt: 'Olá! / Oi!', de: 'Hallo!', id: 'Halo!', tr: 'Merhaba!', zh: '你好！', hi: 'नमस्ते!', ar: 'أهلاً وسهلاً!' },
  'hello / good morning': { en: 'Hello / Good morning', es: 'Hola / Buenos días', fr: 'Bonjour', ru: 'Здравствуйте / Доброе утро', pt: 'Olá / Bom dia', de: 'Hallo / Guten Morgen', id: 'Halo / Selamat pagi', tr: 'Merhaba / Günaydın', ko: '안녕하세요', ja: 'こんにちは', zh: '你好 / 早上好', hi: 'नमस्ते / सुप्रभात', ar: 'مرحباً' },
  'good evening / good night': { en: 'Good evening / Good night', es: 'Buenas noches', fr: 'Bonsoir / Bonne nuit', ru: 'Добрый вечер / Спокойной ночи', pt: 'Boa noite', de: 'Guten Abend / Gute Nacht', id: 'Selamat malam', tr: 'İyi akşamlar', ko: '좋은 저녁입니다', ja: 'こんばんは', hi: 'शुभ संध्या', ar: 'مساء الخير / تصبح على خير' },
  'hi / bye (informal)': { en: 'Hi / Bye', es: 'Hola / Chao', fr: 'Salut', ru: 'Привет / Пока', pt: 'Oi / Tchau', de: 'Hallo / Tschüss', id: 'Hai / Dadah', tr: 'Selam / Hoşça kal', ko: '안녕', ja: 'やあ', zh: '嗨 / 拜拜', hi: 'नमस्ते / अलविदा', ar: 'أهلاً / وداعاً' },
  'how are you? (informal)': { en: 'How are you?', es: '¿Cómo estás?', fr: 'Comment vas-tu ? / Ça va ?', ru: 'Как дела?', pt: 'Tudo bem?', de: 'Wie geht es dir?', id: 'Apa kabar?', tr: 'Nasılsın?', ko: '잘 지내세요?', ja: 'お元気ですか？', zh: '你好吗？', hi: 'आप कैसे हैं?', ar: 'كيف حالك؟' },
  'how are you? (formal)': { en: 'How are you? (formal)', es: '¿Cómo está usted?', fr: 'Comment allez-vous ?', ru: 'Как ваши дела?', pt: 'Como vai você?', de: 'Wie geht es Ihnen?', id: 'Apa kabar Anda?', tr: 'Nasılsınız?', zh: '您好吗？', hi: 'आप कैसे हैं?', ar: 'كيف حالكم؟' },
  'how are you? / doing okay? (informal)': { en: 'How are you?', es: '¿Cómo estás? / ¿Qué tal?', fr: 'Ça va ?', ru: 'Как дела?', pt: 'Tudo bem?', de: 'Wie geht es dir?', id: 'Apa kabar?', tr: 'Nasılsın?', ko: '잘 지내세요?', ja: 'お元気ですか？', zh: '你好吗？', hi: 'आप कैसे हैं?', ar: 'كيف حالك؟ / بخير؟' },
  'i am doing well, thank you': { en: 'I am doing well, thank you', es: 'Estoy bien, gracias', fr: 'Ça va bien, merci', ru: 'Всё хорошо, спасибо', pt: 'Estou bem, obrigado', de: 'Mir geht es gut, danke', id: 'Kabar baik, terima kasih', tr: 'İyiyim, teşekkürler', zh: '我很好，谢谢', hi: 'मैं बहुत अच्छा हूँ, धन्यवाद', ar: 'أنا على ما يرام، شكراً' },
  'and you? (formal)': { en: 'And you?', es: '¿Y usted?', fr: 'Et vous ?', ru: 'А вы?', pt: 'E você?', de: 'Und Ihnen?', id: 'Dan Anda?', tr: 'Ya siz?', ko: '당신은요?', ja: 'あなたは？', zh: '你呢？', hi: 'और आप?', ar: 'وحضرتك؟' },
  'please (formal)': { en: 'Please', es: 'Por favor', fr: 'S\'il vous plaît', ru: 'Пожалуйста', pt: 'Por favor', de: 'Bitte', id: 'Tolong', tr: 'Lütfen', ko: '제발 / 부탁합니다', ja: 'お願いします', zh: '请', hi: 'कृपया', ar: 'من فضلك / لو سمحت' },
  'what is your name? (formal)': { en: 'What is your name?', es: '¿Cómo se llama usted?', fr: 'Comment vous appelez-vous ?', ru: 'Как вас зовут?', pt: 'Qual é o seu nome?', de: 'Wie heißen Sie?', id: 'Siapa nama Anda?', tr: 'Adınız nedir?', ko: '성함이 어떻게 되시나요?', ja: 'お名前は何ですか？', zh: '你叫什么名字？', hi: 'आपका नाम क्या है?', ar: 'ما اسم حضرتك؟' },
  'pleased to meet you': { en: 'Pleased to meet you', es: 'Mucho gusto / Encantado', fr: 'Enchanté(e)', ru: 'Очень приятно', pt: 'Muito prazer', de: 'Freut mich', id: 'Senang bertemu dengan Anda', tr: 'Memnun oldum', zh: '很高兴认识您', hi: 'आपसे मिलकर अत्यंत प्रसन्नता हुई', ar: 'سررت بلقائك' },
  'where are the restrooms?': { en: 'Where are the restrooms?', es: '¿Dónde está el baño?', fr: 'Où sont les toilettes ?', ru: 'Где находится туалет?', pt: 'Onde fica o banheiro?', de: 'Wo ist die Toilette?', id: 'Di mana kamar mandi?', tr: 'Tuvalet nerede?', ar: 'أين دورة المياه؟' },
  'can you repeat?': { en: 'Can you repeat?', es: '¿Puede repetir?', fr: 'Pouvez-vous répéter ?', ru: 'Повторите, пожалуйста', pt: 'Pode repetir?', de: 'Können Sie wiederholen?', id: 'Bisa diulangi?', tr: 'Tekrar edebilir misiniz?', ko: '다시 한 번 말씀해 주시겠어요?', ja: '繰り返してもらえますか？', zh: '你能重复一遍吗？', hi: 'क्या आप दोहरा सकते हैं?', ar: 'هل يمكنك الإعادة؟' },
  'see you soon': { en: 'See you soon', es: 'Hasta pronto / Hasta luego', fr: 'À bientôt', ru: 'До скорого', pt: 'Até breve', de: 'Bis bald', id: 'Sampai jumpa lagi', tr: 'Yakında görüşürüz', ko: '곧 봐요', ja: 'またね', zh: '回头见', hi: 'जल्द ही मिलेंगे', ar: 'أراك قريباً' },
  'time / weather': { en: 'Time / Weather', es: 'Tiempo', fr: 'Temps', ru: 'Время / Погода', pt: 'Tempo', de: 'Zeit / Wetter', id: 'Waktu / Cuaca', tr: 'Zaman / Hava', ko: '시간', ja: '時間', zh: '时间 / 天气', hi: 'समय / मौसम', ar: 'وقت / طقس' },
  'tomorrow / morning': { en: 'Tomorrow / Morning', es: 'Mañana', fr: 'Demain / Matin', ru: 'Завтра / Утро', pt: 'Amanhã / Manhã', de: 'Morgen', id: 'Besok / Pagi', tr: 'Yarın / Sabah', ko: '내일', ja: '明日', zh: '明天早上', hi: 'कल (आने वाला) / सुबह', ar: 'غداً / صباح' },
  'office / desk': { en: 'Office / Desk', es: 'Oficina / Escritorio', fr: 'Bureau', ru: 'Офис / Стол', pt: 'Escritório', de: 'Büro', id: 'Kantor / Meja', tr: 'Ofis / Masa', ko: '사무실', ja: '事務所 / オフィス', hi: 'कार्यालय / दफ़्तर', ar: 'مكتب' },
  'money / silver': { en: 'Money', es: 'Dinero', fr: 'Argent', ru: 'Деньги', pt: 'Dinheiro', de: 'Geld', id: 'Uang', tr: 'Para', ko: '돈', ja: 'お金', zh: '钱', hi: 'पैसे / रुपया', ar: 'نقود / مال' },
  'train station': { en: 'Train station', es: 'Estación de tren', fr: 'Gare', ru: 'Вокзал / Станция', pt: 'Estação de trem', de: 'Bahnhof', id: 'Stasiun kereta', tr: 'Tren istasyonu', ko: '기차역', ja: '鉄道駅', zh: '火车站', hi: 'रेलवे स्टेशन', ar: 'محطة قطار' },
  'boy / child': { en: 'Boy / Child', es: 'Niño', fr: 'Garçon / Enfant', ru: 'Мальчик / Ребёнок', pt: 'Menino / Criança', de: 'Junge / Kind', id: 'Anak laki-laki / Anak', tr: 'Erkek çocuk / Çocuk', ko: '소년 / 남자아이', ja: '男の子', hi: 'लड़का', ar: 'ولد / طفل' },
  'one hundred': { en: 'One hundred', es: 'Cien', fr: 'Cent', ru: 'Сто', pt: 'Cem', de: 'Hundert', id: 'Seratus', tr: 'Yüz', ar: 'مئة' },
  'one thousand': { en: 'One thousand', es: 'Mil', fr: 'Mille', ru: 'Тысяча', pt: 'Mil', de: 'Tausend', id: 'Seribu', tr: 'Bin', ar: 'ألف' },
  'is it far from here?': { en: 'Is it far from here?', es: '¿Está lejos de aquí?', fr: 'Est-ce loin d\'ici ?', ru: 'Это далеко отсюда?', pt: 'É longe daqui?', de: 'Ist es weit von hier?', id: 'Apakah jauh dari sini?', tr: 'Buradan uzak mı?', ko: '여기서 먼가요?', ja: 'ここから遠いですか？', zh: '离这里远吗？', hi: 'क्या यह यहाँ से दूर है?', ar: 'هل هو بعيد من هنا؟' },
  'could you speak slower, please?': { en: 'Could you speak slower, please?', es: 'Hable más despacio, por favor', fr: 'Parlez plus lentement, s\'il vous plaît', ru: 'Говорите медленнее, пожалуйста', pt: 'Fale mais devagar, por favor', de: 'Bitte sprechen Sie langsamer', id: 'Bisa bicara lebih pelan?', tr: 'Daha yavaş konuşabilir misiniz?', zh: '请说慢一点', hi: 'कृपया थोड़ा धीरे बोलिए', ar: 'هل يمكنك التحدث ببطء أكثر من فضلك؟' },

  // Colors & Descriptions Pack
  'red': { en: 'Red', es: 'Rojo', fr: 'Rouge', ru: 'Красный', pt: 'Vermelho', de: 'Rot', id: 'Merah', tr: 'Kırmızı', ko: '빨간색', ja: '赤', zh: '红色', hi: 'लाल', ar: 'أحمر' },
  'blue': { en: 'Blue', es: 'Azul', fr: 'Bleu', ru: 'Синий', pt: 'Azul', de: 'Blau', id: 'Biru', tr: 'Mavi', ko: '파란색', ja: '青', zh: '蓝色', hi: 'नीला', ar: 'أزرق' },
  'green': { en: 'Green', es: 'Verde', fr: 'Vert', ru: 'Зелёный', pt: 'Verde', de: 'Grün', id: 'Hijau', tr: 'Yeşil', ko: '초록색', ja: '緑', zh: '绿色', hi: 'हरा', ar: 'أخضر' },
  'black': { en: 'Black', es: 'Negro', fr: 'Noir', ru: 'Чёрный', pt: 'Preto', de: 'Schwarz', id: 'Hitam', tr: 'Siyah', ko: '검은색', ja: '黒', zh: '黑色', hi: 'काला', ar: 'أسود' },
  'white': { en: 'White', es: 'Blanco', fr: 'Blanc', ru: 'Белый', pt: 'Branco', de: 'Weiß', id: 'Putih', tr: 'Beyaz', ko: '흰색', ja: '白', zh: '白色', hi: 'सफ़ेद', ar: 'أبيض' },
  'purple': { en: 'Purple', es: 'Morado', fr: 'Violet', ru: 'Фиолетовый', pt: 'Roxo', de: 'Lila', id: 'Ungu', tr: 'Mor', ko: '보라색', ja: '紫', zh: '紫色', hi: 'बैंगनी', ar: 'بنفسجي' },
  'pink': { en: 'Pink', es: 'Rosa', fr: 'Rose', ru: 'Розовый', pt: 'Rosa', de: 'Rosa', id: 'Merah muda', tr: 'Pembe', ko: '분홍색', ja: 'ピンク', zh: '粉色', hi: 'गुलाबी', ar: 'وردي' },
  'gray': { en: 'Gray', es: 'Gris', fr: 'Gris', ru: 'Серый', pt: 'Cinza', de: 'Grau', id: 'Abu-abu', tr: 'Gri', ko: '회색', ja: '灰色 / グレー', zh: '灰色', hi: 'स्लेटी / धूसर', ar: 'رمادي' },

  // Weather & Seasons Pack
  'wind': { en: 'Wind', es: 'Viento', fr: 'Vent', ru: 'Ветер', pt: 'Vento', de: 'Wind', id: 'Angin', tr: 'Rüzgar', ko: '바람', ja: '風', zh: '风', hi: 'हवा / पवन', ar: 'رياح' },
  'cloud': { en: 'Cloud', es: 'Nube', fr: 'Nuage', ru: 'Облако', pt: 'Nuvem', de: 'Wolke', id: 'Awan', tr: 'Bulut', ko: '구름', ja: '雲', zh: '云', hi: 'क्लाउड', ar: 'سحابة / غيمة' },
  'storm': { en: 'Storm', es: 'Tormenta', fr: 'Orage', ru: 'Гроза', pt: 'Tempestade', de: 'Sturm', id: 'Badai', tr: 'Fırtına', ko: '폭풍', ja: '嵐', zh: '暴风雨', hi: 'तूफ़ान / आँधी', ar: 'عاصفة' },

  // Tech & Remote Work Pack
  'internet': { en: 'Internet', es: 'Internet', fr: 'Internet', ru: 'Интернет', pt: 'Internet', de: 'Internet', id: 'Internet', tr: 'İnternet', ko: '인터넷', ja: 'インターネット', zh: '互联网', hi: 'इंटरनेट', ar: 'إنترنت' },
  'password': { en: 'Password', es: 'Contraseña', fr: 'Mot de passe', ru: 'Пароль', pt: 'Senha', de: 'Passwort', id: 'Kata sandi', tr: 'Şifre', ko: '비밀번호', ja: 'パスワード', zh: '密码', hi: 'पासवर्ड / कूटशब्द', ar: 'كلمة المرور' },
  'email': { en: 'Email', es: 'Correo electrónico', fr: 'Courriel', ru: 'Электронная почта', pt: 'E-mail', de: 'E-Mail', id: 'Email', tr: 'E-posta', ko: '이메일', ja: 'メール', zh: '电子邮件', hi: 'ईमेल', ar: 'بريد إلكتروني' },
  'screen': { en: 'Screen', es: 'Pantalla', fr: 'Écran', ru: 'Экран', pt: 'Tela', de: 'Bildschirm', id: 'Layar', tr: 'Ekran', ko: '화면 / 스크린', ja: '画面 / スクリーン', zh: '屏幕', hi: 'स्क्रीन / पर्दा', ar: 'شاشة' },
  'meeting': { en: 'Meeting', es: 'Reunión', fr: 'Réunion', ru: 'Встреча', pt: 'Reunião', de: 'Besprechung', id: 'Rapat', tr: 'Toplantı', ko: '회의 / 모임', ja: '会議', zh: '会议', hi: 'बैठक / मीटिंग', ar: 'اجتماع' },
  'file': { en: 'File', es: 'Archivo', fr: 'Fichier', ru: 'Файл', pt: 'Arquivo', de: 'Datei', id: 'Berkas', tr: 'Dosya', ko: '파일', ja: 'ファイル', zh: '文件', hi: 'फ़ाइल / नस्ती', ar: 'ملف' },
  'link': { en: 'Link', es: 'Enlace', fr: 'Lien', ru: 'Ссылка', pt: 'Link', de: 'Link', id: 'Tautan', tr: 'Bağlantı', ko: '링크', ja: 'リンク', zh: '链接', hi: 'लिंक / कड़ी', ar: 'رابط' },
  'code': { en: 'Code', es: 'Código', fr: 'Code', ru: 'Код', pt: 'Código', de: 'Code', id: 'Kode', tr: 'Kod', ko: '코드', ja: 'コード', zh: '代码', hi: 'कोड', ar: 'رمز / كود' },
  'error': { en: 'Error', es: 'Error', fr: 'Erreur', ru: 'Ошибка', pt: 'Erro', de: 'Fehler', id: 'Kesalahan', tr: 'Hata', ko: '오류 / 에러', ja: 'エラー', zh: '错误', hi: 'त्रुटि / ग़लती', ar: 'خطأ' },
  'battery': { en: 'Battery', es: 'Batería', fr: 'Batterie', ru: 'Батарея', pt: 'Bateria', de: 'Batterie', id: 'Baterai', tr: 'Pil', ko: '배터리', ja: 'バッテリー / 電池', zh: '电池', hi: 'बैटरी', ar: 'بطارية' },
  'can you hear me?': { en: 'Can you hear me?', es: '¿Me escucha?', fr: 'Vous m\'entendez ?', ru: 'Вы меня слышите?', pt: 'Você me ouve?', de: 'Können Sie mich hören?', id: 'Apakah Anda mendengar saya?', tr: 'Beni duyabiliyor musunuz?', zh: '你能听到我说话吗？', hi: 'क्या आप मुझे सुन सकते हैं?', ar: 'هل تسمعني؟' },
  'can you see my screen?': { en: 'Can you see my screen?', es: '¿Puede ver mi pantalla?', fr: 'Voyez-vous mon écran ?', ru: 'Видно мой экран?', pt: 'Você vê minha tela?', de: 'Können Sie meinen Bildschirm sehen?', id: 'Apakah Anda melihat layar saya?', tr: 'Ekranımı görebiliyor musunuz?', zh: '你能看到我的屏幕吗？', hi: 'क्या आप मेरी स्क्रीन देख सकते हैं?', ar: 'هل ترى شاشتي؟' },
  'let me share my screen': { en: 'Let me share my screen', es: 'Voy a compartir mi pantalla', fr: 'Je vais partager mon écran', ru: 'Я покажу свой экран', pt: 'Vou compartilhar minha tela', de: 'Ich teile meinen Bildschirm', id: 'Saya bagikan layar saya', tr: 'Ekranımı paylaşayım', ko: '화면을 공유하겠습니다', ja: '画面を共有します', zh: '我来共享屏幕', hi: 'मैं अपनी स्क्रीन साझा करता हूँ', ar: 'دعني أشارك شاشتي' },
  'what is the wi-fi password?': { en: 'What is the Wi-Fi password?', es: '¿Cuál es la contraseña del wifi?', fr: 'Quel est le mot de passe du Wi-Fi ?', ru: 'Какой пароль от вайфая?', pt: 'Qual é a senha do Wi-Fi?', de: 'Wie lautet das WLAN-Passwort?', id: 'Apa kata sandi Wi-Fi?', tr: 'Wi-Fi şifresi nedir?', zh: '无线网密码是什么？', hi: 'वाई-फ़ाई का पासवर्ड क्या है?', ar: 'ما هي كلمة مرور الواي فاي؟' },
  'the internet connection is slow': { en: 'The internet connection is slow', es: 'La conexión a internet es lenta', fr: 'La connexion internet est lente', ru: 'Медленное подключение к интернету', pt: 'A conexão com a internet está lenta', de: 'Die Internetverbindung ist langsam', id: 'Koneksi internetnya lambat', tr: 'İnternet bağlantısı yavaş', ko: '인터넷 연결이 느려요', ja: 'インターネット接続が遅いです', zh: '网络连接很慢', hi: 'इंटरनेट कनेक्शन धीमा है', ar: 'اتصال الإنترنت بطيء' },
  'can you send it by email?': { en: 'Can you send it by email?', es: '¿Puede enviarlo por correo?', fr: 'Pouvez-vous l\'envoyer par courriel ?', ru: 'Можете отправить по почте?', pt: 'Pode enviar por e-mail?', de: 'Können Sie es per E-Mail schicken?', id: 'Bisakah Anda kirim lewat email?', tr: 'E-posta ile gönderebilir misiniz?', ko: '이메일로 보내주실 수 있나요?', ja: 'メールで送っていただけますか？', zh: '你能通过邮件发送吗？', hi: 'क्या आप इसे ईमेल से भेज सकते हैं?', ar: 'هل يمكنك إرساله بالبريد الإلكتروني؟' },
  'my battery is almost dead': { en: 'My battery is almost dead', es: 'Mi batería está casi agotada', fr: 'Ma batterie est presque vide', ru: 'У меня почти села батарея', pt: 'Minha bateria está quase acabando', de: 'Mein Akku ist fast leer', id: 'Baterai saya hampir habis', tr: 'Şarjım bitmek üzere', ko: '배터리가 거의 다 됐어요', ja: 'バッテリーが切れそうです', zh: '我的电池快没电了', hi: 'मेरी बैटरी ख़त्म होने वाली है', ar: 'بطاريتي شارفت على النفاد' },

  // Business & Office Pack
  'project': { en: 'Project', es: 'Proyecto', fr: 'Projet', ru: 'Проект', pt: 'Projeto', de: 'Projekt', id: 'Proyek', tr: 'Proje', ko: '프로젝트', ja: 'プロジェクト', zh: '项目', hi: 'परियोजना / प्रोजेक्ट', ar: 'مشروع' },
  'client': { en: 'Client', es: 'Cliente', fr: 'Client', ru: 'Клиент', pt: 'Cliente', de: 'Kunde', id: 'Klien', tr: 'Müşteri', ko: '고객 / 클라이언트', ja: '顧客 / クライアント', zh: '客户', hi: 'ग्राहक / क्लाइंट', ar: 'عميل' },
  'team': { en: 'Team', es: 'Equipo', fr: 'Équipe', ru: 'Команда', pt: 'Equipe', de: 'Team', id: 'Tim', tr: 'Ekip', ko: '팀', ja: 'チーム', zh: '团队', hi: 'टीम / दल', ar: 'فريق' },
  'manager': { en: 'Manager', es: 'Gerente', fr: 'Directeur', ru: 'Руководитель', pt: 'Gerente', de: 'Manager', id: 'Manajer', tr: 'Yönetici', ko: '관리자 / 매니저', ja: 'マネージャー / 管理者', zh: '经理', hi: 'प्रबंधक / मैनेजर', ar: 'مدير' },
  'company': { en: 'Company', es: 'Empresa', fr: 'Entreprise', ru: 'Компания', pt: 'Empresa', de: 'Firma', id: 'Perusahaan', tr: 'Şirket', ko: '회사', ja: '会社', zh: '公司', hi: 'कंपनी / संस्था', ar: 'شركة' },
  'contract': { en: 'Contract', es: 'Contrato', fr: 'Contrat', ru: 'Контракт', pt: 'Contrato', de: 'Vertrag', id: 'Kontrak', tr: 'Sözleşme', ko: '계약 / 계약서', ja: '契約', zh: '合同', hi: 'अनुबंध / अनुबंध पत्र', ar: 'عقد' },
  'schedule': { en: 'Schedule', es: 'Horario', fr: 'Horaire', ru: 'Расписание', pt: 'Horário', de: 'Zeitplan', id: 'Jadwal', tr: 'Takvim', ko: '일정 / 스케줄', ja: 'スケジュール / 日程', zh: '日程 / 时间表', hi: 'समय सारणी / शेड्यूल', ar: 'جدول مواعيد' },
  'deadline': { en: 'Deadline', es: 'Fecha límite', fr: 'Date limite', ru: 'Срок', pt: 'Prazo', de: 'Frist', id: 'Tenggat waktu', tr: 'Son tarih', ko: '마감일 / 마감 시간', ja: '締め切り / 期限', zh: '截止日期', hi: 'अंतिम तिथि / डेडलाइन', ar: 'الموعد النهائي' },
  'invoice': { en: 'Invoice', es: 'Factura', fr: 'Facture', ru: 'Счёт', pt: 'Fatura', de: 'Rechnung', id: 'Faktur', tr: 'Fatura', ko: '청구서 / 인보이스', ja: '請求書', zh: '发票', hi: 'चालान / इनवॉइस', ar: 'فاتورة' },
  'salary': { en: 'Salary', es: 'Salario', fr: 'Salaire', ru: 'Зарплата', pt: 'Salário', de: 'Gehalt', id: 'Gaji', tr: 'Maaş', ko: '급여 / 월급', ja: '給料', zh: '工资', hi: 'वेतन / तनख्वाह', ar: 'راتب' },
  'let\'s schedule a meeting': { en: 'Let\'s schedule a meeting / Let\'s plan a meeting / Are we planning a meeting', es: 'Programemos una reunión', fr: 'Planifions une réunion', ru: 'Давайте назначим встречу', pt: 'Vamos agendar uma reunião', de: 'Planen wir ein Meeting', id: 'Mari jadwalkan rapat', tr: 'Bir toplantı planlayalım', ar: 'فلنحدد موعد اجتماع' },
  'let\'s schedule a meeting / let\'s plan a meeting / are we planning a meeting / shall we plan a meeting': { en: 'Let\'s schedule a meeting / Let\'s plan a meeting / Are we planning a meeting', es: 'Programemos una reunión', fr: 'Planifions une réunion', ru: 'Давайте назначим встречу', pt: 'Vamos agendar uma reunião', de: 'Planen wir ein Meeting', id: 'Mari jadwalkan rapat', tr: 'Bir toplantı planlayalım', ar: 'فلنحدد موعد اجتماع' },
  'i will send you an email': { en: 'I will send you an email', es: 'Le enviaré un correo', fr: 'Je vous enverrai un courriel', ru: 'Я отправлю вам письмо', pt: 'Vou te enviar um e-mail', de: 'Ich schicke Ihnen eine E-Mail', id: 'Saya akan mengirim email kepada Anda', tr: 'Size bir e-posta göndereceğim', zh: '我会给你发邮件', hi: 'मैं आपको ईमेल भेज दूँगा', ar: 'سأرسل لك بريداً إلكترونياً' },
  'when is the deadline?': { en: 'When is the deadline?', es: '¿Cuándo es la fecha límite?', fr: 'Quelle est la date limite ?', ru: 'Какой крайний срок?', pt: 'Qual é o prazo?', de: 'Wann ist die Frist?', id: 'Kapan tenggat waktunya?', tr: 'Son teslim tarihi ne zaman?', zh: '截止时间是什么时候？', hi: 'अंतिम तिथि कब है?', ar: 'متى الموعد النهائي؟' },

  // Healthcare & Pharmacy Pack
  'medicine': { en: 'Medicine', es: 'Medicina', fr: 'Médicament', ru: 'Лекарство', pt: 'Remédio', de: 'Medikament', id: 'Obat', tr: 'İlaç', ko: '약', ja: '薬', zh: '药', hi: 'दवा / औषधि', ar: 'دواء' },
  'pain': { en: 'Pain', es: 'Dolor', fr: 'Douleur', ru: 'Боль', pt: 'Dor', de: 'Schmerz', id: 'Rasa sakit', tr: 'Ağrı', ko: '통증 / 아픔', ja: '痛み', zh: '疼 / 疼痛', hi: 'दर्द / पीड़ा', ar: 'ألم' },
  'fever': { en: 'Fever', es: 'Fiebre', fr: 'Fièvre', ru: 'Температура', pt: 'Febre', de: 'Fieber', id: 'Demam', tr: 'Ateş', ko: '열', ja: '熱', zh: '发烧', hi: 'बुख़ार', ar: 'حمى' },
  'allergy': { en: 'Allergy', es: 'Alergia', fr: 'Allergie', ru: 'Аллергия', pt: 'Alergia', de: 'Allergie', id: 'Alergi', tr: 'Alerji', ko: '알레르기', ja: 'アレルギー', zh: '过敏', hi: 'एलर्जी', ar: 'حساسية' },
  'headache': { en: 'Headache', es: 'Dolor de cabeza', fr: 'Mal de tête', ru: 'Головная боль', pt: 'Dor de cabeça', de: 'Kopfschmerzen', id: 'Sakit kepala', tr: 'Baş ağrısı', ko: '두통', ja: '頭痛', zh: '头痛 / 头疼', hi: 'सिरदर्द', ar: 'صداع' },
  'emergency': { en: 'Emergency', es: 'Emergencia', fr: 'Urgence', ru: 'Скорая помощь', pt: 'Emergência', de: 'Notfall', id: 'Darurat', tr: 'Acil durum', ko: '비상 / 응급', ja: '緊急', zh: '紧急情况', hi: 'आपातकाल', ar: 'طوارئ' },
  'prescription': { en: 'Prescription', es: 'Receta médica', fr: 'Ordonnance', ru: 'Рецепт', pt: 'Receita médica', de: 'Rezept', id: 'Resep dokter', tr: 'Reçete', ko: '처방전', ja: '処方箋', zh: '处方', hi: 'नुस्ख़ा / पर्चा', ar: 'وصفة طبية' },
  'bandage': { en: 'Bandage', es: 'Venda', fr: 'Pansement', ru: 'Бинт', pt: 'Curativo', de: 'Verband', id: 'Perban', tr: 'Bandaj', ko: '붕대 / 반창고', ja: '包帯 / 絆創膏', zh: '绷带', hi: 'पट्टी', ar: 'ضمادة' },
  'health': { en: 'Health', es: 'Salud', fr: 'Santé', ru: 'Здоровье', pt: 'Saúde', de: 'Gesundheit', id: 'Kesehatan', tr: 'Sağlık', ko: '건강', ja: '健康', zh: '健康', hi: 'स्वास्थ्य / सेहत', ar: 'صحة' },
  'where is the nearest pharmacy?': { en: 'Where is the nearest pharmacy?', es: '¿Dónde está la farmacia más cercana?', fr: 'Où est la pharmacie la plus proche ?', ru: 'Где ближайшая аптека?', pt: 'Onde fica a farmácia mais próxima?', de: 'Wo ist die nächste Apotheke?', id: 'Di mana apotek terdekat?', tr: 'En yakın eczane nerede?', zh: '最近的药店在哪里？', hi: 'सबसे नज़दीकी दवाखाना कहाँ है?', ar: 'أين أقرب صيدلية؟' },
  'i am allergic to nuts': { en: 'I am allergic to nuts', es: 'Soy alérgico a las nueces', fr: 'Je suis allergique aux noix', ru: 'У меня аллергия на орехи', pt: 'Tenho alergia a nozes', de: 'Ich bin allergisch gegen Nüsse', id: 'Saya alergi kacang', tr: 'Kuruyemiş alerjim var', zh: '我对坚果过敏', hi: 'मुझे मेवों से एलर्जी है', ar: 'لدي حساسية من المكسرات' },

  // Hotel, Airport & Travel Pack
  'flight': { en: 'Flight', es: 'Vuelo', fr: 'Vol', ru: 'Рейс', pt: 'Voo', de: 'Flug', id: 'Penerbangan', tr: 'Uçuş', ko: '항공편 / 비행', ja: '便 / フライト', zh: '航班', hi: 'उड़ान / फ़्लाइट', ar: 'رحلة طيران' },
  'luggage': { en: 'Luggage', es: 'Equipaje', fr: 'Bagage', ru: 'Багаж', pt: 'Bagagem', de: 'Gepäck', id: 'Bagasi', tr: 'Bagaj', ko: '짐 / 수하물', ja: '手荷物', zh: '行李', hi: 'सामान / लगेज', ar: 'أمتعة' },
  'reservation': { en: 'Reservation', es: 'Reserva', fr: 'Réservation', ru: 'Бронь', pt: 'Reserva', de: 'Reservierung', id: 'Reservasi', tr: 'Rezervasyon', ko: '예약', ja: '予約', zh: '预订', hi: 'आरक्षण / बुकिंग', ar: 'حجز' },
  'room': { en: 'Room', es: 'Habitación', fr: 'Chambre', ru: 'Номер', pt: 'Quarto', de: 'Zimmer', id: 'Kamar', tr: 'Oda', ko: '방', ja: '部屋', zh: '房间', hi: 'कमरा', ar: 'غرفة' },
  'gate': { en: 'Gate', es: 'Puerta de embarque', fr: 'Porte d\'embarquement', ru: 'Выход на посадку', pt: 'Portão de embarque', de: 'Gate', id: 'Gerbang', tr: 'Kapı', ko: '탑승구 / 게이트', ja: '搭乗口 / ゲート', zh: '登机口', hi: 'गेट / प्रवेश द्वार', ar: 'بوابة' },
  'exit': { en: 'Exit', es: 'Salida', fr: 'Sortie', ru: 'Выход', pt: 'Saída', de: 'Ausgang', id: 'Pintu keluar', tr: 'Çıkış', ko: '출구', ja: '出口', zh: '出口', hi: 'निकास', ar: 'مخرج' },
  'customs': { en: 'Customs', es: 'Aduana', fr: 'Douane', ru: 'Таможня', pt: 'Alfândega', de: 'Zoll', id: 'Bea cukai', tr: 'Gümrük', ko: '세관', ja: '税関', zh: '海关', hi: 'सीमा शुल्क / कस्टम्स', ar: 'جمارك' },
  'i have a reservation': { en: 'I have a reservation', es: 'Tengo una reserva', fr: 'J\'ai une réservation', ru: 'У меня есть бронь', pt: 'Tenho uma reserva', de: 'Ich habe eine Reservierung', id: 'Saya punya reservasi', tr: 'Rezervasyonum var', zh: '我有预订', hi: 'मेरी बुकिंग / आरक्षण है', ar: 'لدي حجز' },

  // Shopping & Money Pack
  'credit card': { en: 'Credit card', es: 'Tarjeta de crédito', fr: 'Carte bancaire', ru: 'Банковская карта', pt: 'Cartão de crédito', de: 'Kreditkarte', id: 'Kartu kredit', tr: 'Kredi kartı', ko: '신용카드', ja: 'クレジットカード', zh: '信用卡', hi: 'क्रेडिट कार्ड', ar: 'بطاقة ائتمان' },
  'cash': { en: 'Cash', es: 'Efectivo', fr: 'Espèces', ru: 'Наличные', pt: 'Dinheiro vivo', de: 'Bargeld', id: 'Uang tunai', tr: 'Nakit', ko: '현금', ja: '現金', zh: '现金', hi: 'नकद / कैश', ar: 'نقداً / كاش' },
  'price': { en: 'Price', es: 'Precio', fr: 'Prix', ru: 'Цена', pt: 'Preço', de: 'Preis', id: 'Harga', tr: 'Fiyat', ko: '가격', ja: '価格 / 値段', zh: '价格', hi: 'मूल्य / क़ीमत', ar: 'سعر / ثمن' },
  'cheap': { en: 'Cheap', es: 'Barato', fr: 'Pas cher', ru: 'Дешёвый', pt: 'Barato', de: 'Billig', id: 'Murah', tr: 'Ucuz', ko: '싸고 저렴한', ja: '安い', zh: '便宜', hi: 'सस्ता', ar: 'رخيص' },
  'expensive': { en: 'Expensive', es: 'Caro', fr: 'Cher', ru: 'Дорогой', pt: 'Caro', de: 'Teuer', id: 'Mahal', tr: 'Pahalı', ko: '비싼', ja: '高い', zh: '贵', hi: 'महँगा', ar: 'غالي' },
  'discount': { en: 'Discount', es: 'Descuento', fr: 'Réduction', ru: 'Скидка', pt: 'Desconto', de: 'Rabatt', id: 'Diskon', tr: 'İndirim', ko: '할인', ja: '割引', zh: '折扣', hi: 'छूट / डिस्काउंट', ar: 'خصم' },
  'where is the bus stop?': { en: 'Where is the bus stop?', es: '¿Dónde está la parada de autobús?', fr: 'Où est l\'arrêt de bus ?', ru: 'Где автобусная остановка?', pt: 'Onde fica o ponto de ônibus?', de: 'Wo ist die Bushaltestelle?', id: 'Di mana halte bus?', tr: 'Otobüs durağı nerede?', ko: '버스 정류장이 어디인가요?', ja: 'バス停はどこですか？', zh: '公交站在哪里？', hi: 'बस स्टॉप कहाँ है?', ar: 'أين موقف الحافلات؟' },
  'how do i get to the airport?': { en: 'How do I get to the airport?', es: '¿Cómo llego al aeropuerto?', fr: 'Comment aller à l\'aéroport ?', ru: 'Как добраться до аэропорта?', pt: 'Como chego ao aeroporto?', de: 'Wie komme ich zum Flughafen?', id: 'Bagaimana cara ke bandara?', tr: 'Havalimanına nasıl gidebilirim?', ko: '공항에 어떻게 가나요?', ja: '空港へはどう行けばいいですか？', zh: '怎么去机场？', hi: 'हवाई अड्डे कैसे जाऊँ?', ar: 'كيف أصل إلى المطار؟' },
  'i would like a coffee, please': { en: 'I would like a coffee, please', es: 'Quisiera un café, por favor', fr: 'Je voudrais un café, s\'il vous plaît', ru: 'Я бы хотел кофе, пожалуйста', pt: 'Eu gostaria de um café, por favor', de: 'Ich hätte gern einen Kaffee, bitte', id: 'Saya mau kopi, tolong', tr: 'Bir kahve rica ediyorum', ko: '커피 한 잔 주세요', ja: 'コーヒーを一杯ください', zh: '请给我一杯咖啡', hi: 'कृपया मुझे एक कॉफ़ी दीजिए', ar: 'أود قهوة من فضلك' },
  'a bottle of water, please': { en: 'A bottle of water, please', es: 'Una botella de agua, por favor', fr: 'Une bouteille d\'eau, s\'il vous plaît', ru: 'Бутылку воды, пожалуйста', pt: 'Uma garrafa de água, por favor', de: 'Eine Flasche Wasser, bitte', id: 'Sebotol air, tolong', tr: 'Bir şişe su, lütfen', ko: '생수 한 병 주세요', ja: 'お水を一本ください', zh: '请给我一瓶水', hi: 'कृपया पानी की एक बोतल दीजिए', ar: 'زجاجة ماء من فضلك' },

  // Batch 1: Modern Tech, Workplace & Commerce (Levels 1, 2, 3)
  'laptop': { en: 'Laptop', es: 'Portátil', fr: 'Ordinateur portable', ru: 'Ноутбук', pt: 'Portátil', de: 'Laptop', id: 'Laptop', tr: 'Dizüstü bilgisayar', ko: '노트북', ja: 'ノートパソコン', zh: '笔记本电脑', hi: 'लैपटॉप', ar: 'حاسوب محمول' },
  'tablet': { en: 'Tablet', es: 'Tableta', fr: 'Tablette', ru: 'Планшет', pt: 'Tablet', de: 'Tablet', id: 'Tablet', tr: 'Tablet', ko: '태블릿', ja: 'タブレット', zh: '平板电脑', hi: 'टैबलेट', ar: 'جهاز لوحي' },
  'screen / display': { en: 'Screen', es: 'Pantalla', fr: 'Écran', ru: 'Экран', pt: 'Tela', de: 'Bildschirm', id: 'Layar', tr: 'Ekran', ko: '화면 / 스크린', ja: '画面 / スクリーン', zh: '屏幕', hi: 'स्क्रीन / पर्दा', ar: 'شاشة' },
  'keyboard': { en: 'Keyboard', es: 'Teclado', fr: 'Clavier', ru: 'Клавиатура', pt: 'Teclado', de: 'Tastatur', id: 'Papan ketik', tr: 'Klavye', ko: '키보드', ja: 'キーボード', zh: '键盘', hi: 'कीबोर्ड / कुंजीपटल', ar: 'لوحة مفاتيح' },
  'mouse': { en: 'Mouse', es: 'Ratón', fr: 'Souris', ru: 'Мышь', pt: 'Mouse', de: 'Maus', id: 'Tetikus', tr: 'Fare', ko: '마우스', ja: 'マウス', zh: '老鼠', hi: 'चूहा', ar: 'فأرة' },
  'charger': { en: 'Charger', es: 'Cargador', fr: 'Chargeur', ru: 'Зарядка', pt: 'Carregador', de: 'Ladegerät', id: 'Pengisi daya', tr: 'Şarj aleti', ko: '충전기', ja: '充電器', zh: '充电器', hi: 'चार्जर', ar: 'شاحن' },
  'cable': { en: 'Cable', es: 'Cable', fr: 'Câble', ru: 'Кабель', pt: 'Cabo', de: 'Kabel', id: 'Kabel', tr: 'Kablo', ko: '케이블', ja: 'ケーブル', zh: '数据线', hi: 'केबल / तार', ar: 'كابل / سلك' },
  'cable / wire': { en: 'Cable', es: 'Cable', fr: 'Câble', ru: 'Кабель', pt: 'Cabo', de: 'Kabel', id: 'Kabel', tr: 'Kablo', ko: '케이블', ja: 'ケーブル', zh: '数据线', hi: 'केबल / तार', ar: 'سلك / كابل' },
  'wifi': { en: 'Wi-Fi', es: 'Wifi', fr: 'Wi-Fi', ru: 'Вайфай', pt: 'Wi-Fi', de: 'WLAN', id: 'Wi-Fi', tr: 'Kablosuz ağ', ko: '와이파이', ja: 'ワイファイ', zh: '无线网络', hi: 'वाई-फ़ाई', ar: 'واي فاي' },
  'wi-fi': { en: 'Wi-Fi', es: 'Wifi', fr: 'Wi-Fi', ru: 'Вайфай', pt: 'Wi-Fi', de: 'WLAN', id: 'Wi-Fi', tr: 'Kablosuz ağ', ko: '와이파이', ja: 'ワイファイ', zh: '无线网络', hi: 'वाई-फ़ाई', ar: 'واي فاي' },
  'wi-fi / wlan': { en: 'Wi-Fi', es: 'Wifi', fr: 'Wi-Fi', ru: 'Вайфай', pt: 'Wi-Fi', de: 'WLAN', id: 'Wi-Fi', tr: 'Kablosuz ağ', ko: '와이파이', ja: 'ワイファイ', zh: '无线网络', hi: 'वाई-फ़ाई', ar: 'واي فاي / شبكة لاسلكية' },
  'message': { en: 'Message', es: 'Mensaje', fr: 'Message', ru: 'Сообщение', pt: 'Mensagem', de: 'Nachricht', id: 'Pesan', tr: 'Mesaj', ko: '메시지', ja: 'メッセージ', zh: '短信 / 消息', hi: 'संदेश / मैसेज', ar: 'رسالة' },
  'message / text': { en: 'Message', es: 'Mensaje', fr: 'Message', ru: 'Сообщение', pt: 'Mensagem', de: 'Nachricht', id: 'Pesan', tr: 'Mesaj', ko: '메시지', ja: 'メッセージ', zh: '短信 / 消息', hi: 'संदेश / मैसेज', ar: 'رسالة' },
  'website': { en: 'Website', es: 'Sitio web', fr: 'Site web', ru: 'Сайт', pt: 'Site', de: 'Webseite', id: 'Situs web', tr: 'Web sitesi', ko: '웹사이트', ja: 'ウェブサイト', zh: '网站', hi: 'वेबसाइट', ar: 'موقع إلكتروني' },
  'app': { en: 'Application', es: 'Aplicación', fr: 'Application', ru: 'Приложение', pt: 'Aplicativo', de: 'Anwendung', id: 'Aplikasi', tr: 'Uygulama', ko: '앱 / 애플리케이션', ja: 'アプリ', zh: '应用 / 软件', ar: 'تطبيق' },
  'application': { en: 'Application', es: 'Aplicación', fr: 'Application', ru: 'Приложение', pt: 'Aplicativo', de: 'Anwendung', id: 'Aplikasi', tr: 'Uygulama', ko: '앱 / 애플리케이션', ja: 'アプリ', zh: '应用 / 软件', ar: 'تطبيق' },
  'application / app': { en: 'Application', es: 'Aplicación', fr: 'Application', ru: 'Приложение', pt: 'Aplicativo', de: 'Anwendung', id: 'Aplikasi', tr: 'Uygulama', ko: '앱 / 애플리케이션', ja: 'アプリ', zh: '应用程序 / App', ar: 'تطبيق' },
  'file / document': { en: 'File', es: 'Archivo', fr: 'Fichier', ru: 'Файл', pt: 'Arquivo', de: 'Datei', id: 'Berkas', tr: 'Dosya', ko: '파일', ja: 'ファイル', zh: '文件', hi: 'फ़ाइल / नस्ती', ar: 'ملف / مستند' },
  'folder': { en: 'Folder', es: 'Carpeta', fr: 'Dossier', ru: 'Папка', pt: 'Pasta', de: 'Ordner', id: 'Folder', tr: 'Klasör', ko: '폴더', ja: 'フォルダー', zh: '文件夹', hi: 'फ़ोल्डर', ar: 'مجلد' },
  'camera': { en: 'Camera', es: 'Cámara', fr: 'Caméra', ru: 'Камера', pt: 'Câmera', de: 'Kamera', id: 'Kamera', tr: 'Kamera', ko: '카메라', ja: 'カメラ', zh: '相机', hi: 'कैमरा', ar: 'كاميرا' },
  'microphone': { en: 'Microphone', es: 'Micrófono', fr: 'Microphone', ru: 'Микрофон', pt: 'Microfone', de: 'Mikrofon', id: 'Mikrofon', tr: 'Mikrofon', ko: '마이크', ja: 'マイク', zh: '麦克风', hi: 'माइक्रोफ़ोन / माइक', ar: 'ميكروفون' },
  'headphones': { en: 'Headphones', es: 'Auriculares', fr: 'Écouteurs', ru: 'Наушники', pt: 'Fones de ouvido', de: 'Kopfhörer', id: 'Headphone', tr: 'Kulaklık', ko: '헤드폰', ja: 'ヘッドホン', zh: '耳机', hi: 'हेडफ़ोन', ar: 'سماعات' },
  'printer': { en: 'Printer', es: 'Impresora', fr: 'Imprimante', ru: 'Принтер', pt: 'Impressora', de: 'Drucker', id: 'Pencetak', tr: 'Yazıcı', ko: '프린터', ja: 'プリンター', zh: '打印机', hi: 'प्रिंटर', ar: 'طابعة' },
  'search': { en: 'Search', es: 'Buscar', fr: 'Rechercher', ru: 'Искать', pt: 'Pesquisar', de: 'Suchen', id: 'Cari', tr: 'Aramak', ko: '검색', ja: '検索', hi: 'खोज / सर्च', ar: 'بحث' },
  'search / find': { en: 'Search', es: 'Buscar', fr: 'Rechercher', ru: 'Искать', pt: 'Pesquisar', de: 'Suchen', id: 'Cari', tr: 'Aramak', ko: '검색', ja: '検索', zh: '搜索', hi: 'खोज / सर्च', ar: 'بحث / إيجاد' },
  'save': { en: 'Save', es: 'Guardar', fr: 'Enregistrer', ru: 'Сохранить', pt: 'Salvar', de: 'Speichern', id: 'Simpan', tr: 'Kaydetmek', ko: '저장', ja: '保存', zh: '保存', hi: 'सहेजना / सेव करना', ar: 'حفظ' },
  'delete': { en: 'Delete', es: 'Eliminar', fr: 'Supprimer', ru: 'Удалить', pt: 'Excluir', de: 'Löschen', id: 'Hapus', tr: 'Silmek', ko: '삭제', ja: '削除', zh: '删除', hi: 'हटाना / डिलीट करना', ar: 'حذف' },
  'delete / remove': { en: 'Delete', es: 'Eliminar', fr: 'Supprimer', ru: 'Удалить', pt: 'Excluir', de: 'Löschen', id: 'Hapus', tr: 'Silmek', ko: '삭제', ja: '削除', zh: '删除', hi: 'हटाना / डिलीट करना', ar: 'حذف / إزالة' },
  'send': { en: 'Send', es: 'Enviar', fr: 'Envoyer', ru: 'Отправить', pt: 'Enviar', de: 'Senden', id: 'Kirim', tr: 'Göndermek', ko: '보내기', ja: '送信', zh: '发送', hi: 'भेजना', ar: 'إرسال' },
  'download': { en: 'Download', es: 'Descargar', fr: 'Télécharger', ru: 'Скачать', pt: 'Baixar', de: 'Herunterladen', id: 'Mengunduh', tr: 'İndirmek', ko: '다운로드', ja: 'ダウンロード', zh: '下载', hi: 'डाउनलोड', ar: 'تنزيل / تحميل' },
  'upload': { en: 'Upload', es: 'Subir', fr: 'Téléverser', ru: 'Загрузить', pt: 'Carregar', de: 'Hochladen', id: 'Mengunggah', tr: 'Yüklemek', ko: '업로드', ja: 'アップロード', zh: '上传', hi: 'अपलोड', ar: 'رفع' },
  'online': { en: 'Online', es: 'En línea', fr: 'En ligne', ru: 'В сети', pt: 'Online', de: 'Online', id: 'Daring', tr: 'Çevrim içi', ko: '온라인', ja: 'オンライン', zh: '在线', hi: 'ऑनलाइन', ar: 'متصل بالإنترنت' },
  'offline': { en: 'Offline', es: 'Desconectado', fr: 'Hors ligne', ru: 'Не в сети', pt: 'Offline', de: 'Offline', id: 'Luring', tr: 'Çevrim dışı', ko: '오프라인', ja: 'オフライン', zh: '离线', hi: 'ऑफ़लाइन', ar: 'غير متصل' },
  'job': { en: 'Job', es: 'Trabajo', fr: 'Travail', ru: 'Работа', pt: 'Trabalho', de: 'Arbeit', id: 'Pekerjaan', tr: 'İş', ko: '직업', ja: '職業', zh: '工作', hi: 'नौकरी / काम', ar: 'وظيفة' },
  'buy': { en: 'Buy', es: 'Comprar', fr: 'Acheter', ru: 'Купить', pt: 'Comprar', de: 'Kaufen', id: 'Beli', tr: 'Satın almak', ko: '구매 / 사다', ja: '購入 / 買う', zh: '购买 / 买', hi: 'ख़रीदना', ar: 'شراء' },
  'buy / purchase': { en: 'Buy', es: 'Comprar', fr: 'Acheter', ru: 'Купить', pt: 'Comprar', de: 'Kaufen', id: 'Beli', tr: 'Satın almak', ko: '구매 / 사다', ja: '購入 / 買う', zh: '购买 / 买', hi: 'ख़रीदना', ar: 'شراء' },
  'sell': { en: 'Sell', es: 'Vender', fr: 'Vendre', ru: 'Продать', pt: 'Vender', de: 'Verkaufen', id: 'Jual', tr: 'Satmak', ko: '판매 / 팔다', ja: '販売 / 売る', zh: '出售 / 卖', hi: 'बेचना', ar: 'بيع' },
  'pay': { en: 'Pay', es: 'Pagar', fr: 'Payer', ru: 'Платить', pt: 'Pagar', de: 'Bezahlen', id: 'Bayar', tr: 'Ödemek', ko: '지불 / 결제', ja: '支払う / 決済', zh: '支付 / 付款', hi: 'भुगतान / पैसे चुकाना', ar: 'دفع' },
  'pay / payment': { en: 'Pay', es: 'Pagar', fr: 'Payer', ru: 'Платить', pt: 'Pagar', de: 'Bezahlen', id: 'Bayar', tr: 'Ödemek', ko: '지불 / 결제', ja: '支払う / 決済', zh: '支付 / 付款', hi: 'भुगतान / पैसे चुकाना', ar: 'دفع' },
  'credit_card': { en: 'Credit card', es: 'Tarjeta de crédito', fr: 'Carte de crédit', ru: 'Кредитная карта', pt: 'Cartão de crédito', de: 'Kreditkarte', id: 'Kartu kredit', tr: 'Kredi kartı', ko: '신용카드', ja: 'クレジットカード', zh: '信用卡', hi: 'क्रेडिट कार्ड', ar: 'بطاقة ائتمان' },
  'cheap / inexpensive': { en: 'Cheap', es: 'Barato', fr: 'Bon marché', ru: 'Дешёвый', pt: 'Barato', de: 'Billig', id: 'Murah', tr: 'Ucuz', ko: '싸고 저렴한', ja: '安い', zh: '便宜', hi: 'सस्ता', ar: 'رخيص' },
  'receipt': { en: 'Receipt', es: 'Recibo', fr: 'Reçu', ru: 'Чек', pt: 'Recibo', de: 'Quittung', id: 'Struk', tr: 'Fiş', ko: '영수증', ja: '領収書 / レシート', zh: '收据', hi: 'रसीद', ar: 'إيصال' },
  'help_desk': { en: 'Support', es: 'Soporte', fr: 'Assistance', ru: 'Поддержка', pt: 'Suporte', de: 'Kundendienst', id: 'Dukungan', tr: 'Destek', ko: '지원 / 고객센터', ja: 'サポート', ar: 'مكتب المساعدة' },
  'support': { en: 'Support', es: 'Soporte', fr: 'Assistance', ru: 'Поддержка', pt: 'Suporte', de: 'Kundendienst', id: 'Dukungan', tr: 'Destek', ko: '지원 / 고객센터', ja: 'サポート', ar: 'الدعم الفني' },
  'help desk': { en: 'Support', es: 'Soporte', fr: 'Assistance', ru: 'Поддержка', pt: 'Suporte', de: 'Kundendienst', id: 'Dukungan', tr: 'Destek', ko: '지원 / 고객센터', ja: 'サポート', ar: 'مكتب المساعدة' },
  'customer support / help desk': { en: 'Support', es: 'Soporte', fr: 'Assistance', ru: 'Поддержка', pt: 'Suporte', de: 'Kundendienst', id: 'Dukungan', tr: 'Destek', ko: '지원 / 고객센터', ja: 'サポート', ar: 'خدمة العملاء / مكتب المساعدة' },
  'support / help desk': { en: 'Support', es: 'Soporte', fr: 'Assistance', ru: 'Поддержка', pt: 'Suporte', de: 'Kundendienst', id: 'Dukungan', tr: 'Destek', ko: '지원 / 고객센터', ja: 'サポート', zh: '客户支持', ar: 'دعم فني' },
  'support / service': { en: 'Support', es: 'Soporte', fr: 'Assistance', ru: 'Поддержка', pt: 'Suporte', de: 'Kundendienst', id: 'Dukungan', tr: 'Destek', ko: '지원 / 고객센터', ja: 'サポート', ar: 'الدعم / الخدمة' },
  'open_action': { en: 'Open', es: 'Abrir', fr: 'Ouvrir', ru: 'Открыть', pt: 'Abrir', de: 'Öffnen', id: 'Buka', tr: 'Açmak', ko: '열다 / 열린', ja: '開く / オープン', zh: '打开', hi: 'खुला', ar: 'فتح' },
  'close_action': { en: 'Close', es: 'Cerrar', fr: 'Fermer', ru: 'Закрыть', pt: 'Fechar', de: 'Schließen', id: 'Tutup', tr: 'Kapatmak', ko: '닫다 / 닫힌', ja: '閉じる / クローズ', zh: '关闭', hi: 'बंद करना', ar: 'إغلاق' },
  'close': { en: 'Close', es: 'Cerrar', fr: 'Fermer', ru: 'Закрыть', pt: 'Fechar', de: 'Schließen', id: 'Tutup', tr: 'Kapatmak', ko: '닫다 / 닫힌', ja: '閉じる / クローズ', zh: '关闭', hi: 'बंद करना', ar: 'إغلاق' },
  'update_action': { en: 'Update', es: 'Actualizar', fr: 'Mettre à jour', ru: 'Обновить', pt: 'Atualizar', de: 'Aktualisieren', id: 'Perbarui', tr: 'Güncellemek', ko: '업데이트', ja: '更新 / アップデート', zh: '更新', hi: 'अपडेट / अद्यतन', ar: 'تحديث' },
  'update': { en: 'Update', es: 'Actualizar', fr: 'Mettre à jour', ru: 'Обновить', pt: 'Atualizar', de: 'Aktualisieren', id: 'Perbarui', tr: 'Güncellemek', ko: '업데이트', ja: '更新 / アップデート', zh: '更新', hi: 'अपडेट / अद्यतन', ar: 'تحديث' },
  'update / refresh': { en: 'Update', es: 'Actualizar', fr: 'Mettre à jour', ru: 'Обновить', pt: 'Atualizar', de: 'Aktualisieren', id: 'Perbarui', tr: 'Güncellemek', ko: '업데이트', ja: '更新 / アップデート', zh: '更新', hi: 'अपडेट / अद्यतन', ar: 'تحديث' },
  'boss': { en: 'Boss', es: 'Jefe', fr: 'Patron', ru: 'Начальник', pt: 'Chefe', de: 'Chef', id: 'Bos', tr: 'Patron', ko: '상사 / 사장님', ja: '上司', zh: '老板', hi: 'बॉस / मालिक', ar: 'رئيس العمل' },
  'boss / supervisor': { en: 'Boss', es: 'Jefe', fr: 'Patron', ru: 'Начальник', pt: 'Chefe', de: 'Chef', id: 'Bos', tr: 'Patron', ko: '상사 / 사장님', ja: '上司', zh: '老板', hi: 'बॉस / मालिक', ar: 'مدير / مشرف' },
  'colleague': { en: 'Colleague', es: 'Colega', fr: 'Collègue', ru: 'Коллега', pt: 'Colega', de: 'Kollege', id: 'Rekan kerja', tr: 'İş arkadaşı', ko: '동료', ja: '同僚', zh: '同事', hi: 'सहकर्मी', ar: 'زميل' },
  'colleague / coworker': { en: 'Colleague', es: 'Colega', fr: 'Collègue', ru: 'Коллега', pt: 'Colega', de: 'Kollege', id: 'Rekan kerja', tr: 'İş arkadaşı', ko: '동료', ja: '同僚', zh: '同事', hi: 'सहकर्मी', ar: 'زميل عمل' },
  'employee': { en: 'Employee', es: 'Empleado', fr: 'Employé', ru: 'Сотрудник', pt: 'Funcionário', de: 'Mitarbeiter', id: 'Karyawan', tr: 'Çalışan', ko: '직원', ja: '従業員 / 社員', zh: '员工', hi: 'कर्मचारी', ar: 'موظف' },
  'employee / worker': { en: 'Employee', es: 'Empleado', fr: 'Employé', ru: 'Сотрудник', pt: 'Funcionário', de: 'Mitarbeiter', id: 'Karyawan', tr: 'Çalışan', ko: '직원', ja: '従業員 / 社員', zh: '员工', hi: 'कर्मचारी', ar: 'موظف / عامل' },
  'customer / client': { en: 'Client', es: 'Cliente', fr: 'Client', ru: 'Клиент', pt: 'Cliente', de: 'Kunde', id: 'Klien', tr: 'Müşteri', ko: '고객 / 클라이언트', ja: '顧客 / クライアント', zh: '客户', hi: 'ग्राहक / क्लाइंट', ar: 'عميل / زبون' },
  'client / customer': { en: 'Client', es: 'Cliente', fr: 'Client', ru: 'Клиент', pt: 'Cliente', de: 'Kunde', id: 'Klien', tr: 'Müşteri', ko: '고객 / 클라이언트', ja: '顧客 / クライアント', zh: '客户', hi: 'ग्राहक / क्लाइंट', ar: 'عميل / زبون' },
  'schedule / calendar': { en: 'Schedule', es: 'Horario', fr: 'Emploi du temps', ru: 'Расписание', pt: 'Horário', de: 'Zeitplan', id: 'Jadwal', tr: 'Program', ko: '일정 / 스케줄', ja: 'スケジュール / 日程', zh: '日程 / 时间表', hi: 'समय सारणी / शेड्यूल', ar: 'جدول مواعيد / تقويم' },
  'task': { en: 'Task', es: 'Tarea', fr: 'Tâche', ru: 'Задача', pt: 'Tarefa', de: 'Aufgabe', id: 'Tugas', tr: 'Görev', ko: '업무 / 과제', ja: 'タスク / 課題', zh: '任务', hi: 'कार्य / काम', ar: 'مهمة' },
  'task / assignment': { en: 'Task', es: 'Tarea', fr: 'Tâche', ru: 'Задача', pt: 'Tarefa', de: 'Aufgabe', id: 'Tugas', tr: 'Görev', ko: '업무 / 과제', ja: 'タスク / 課題', zh: '任务', hi: 'कार्य / काम', ar: 'مهمة' },
  'report': { en: 'Report', es: 'Informe', fr: 'Rapport', ru: 'Отчёт', pt: 'Relatório', de: 'Bericht', id: 'Laporan', tr: 'Rapor', ko: '보고서', ja: 'レポート / 報告書', zh: '报告', hi: 'रिपोर्ट / प्रतिवेदन', ar: 'تقرير' },
  'report / summary': { en: 'Report', es: 'Informe', fr: 'Rapport', ru: 'Отчёт', pt: 'Relatório', de: 'Bericht', id: 'Laporan', tr: 'Rapor', ko: '보고서', ja: 'レポート / 報告書', zh: '报告', hi: 'रिपोर्ट / प्रतिवेदन', ar: 'تقرير / ملخص' },
  'presentation': { en: 'Presentation', es: 'Presentación', fr: 'Présentation', ru: 'Презентация', pt: 'Apresentação', de: 'Präsentation', id: 'Presentasi', tr: 'Sunum', ko: '발표 / 프레젠테이션', ja: 'プレゼンテーション', zh: '演示', hi: 'प्रस्तुति / प्रेजेंटेशन', ar: 'عرض تقديمي' },
  'contract / agreement': { en: 'Contract', es: 'Contrato', fr: 'Contrat', ru: 'Договор', pt: 'Contrato', de: 'Vertrag', id: 'Kontrak', tr: 'Sözleşme', ko: '계약 / 계약서', ja: '契約', zh: '合同', hi: 'अनुबंध / अनुबंध पत्र', ar: 'عقد / اتفاقية' },
  'signature': { en: 'Signature', es: 'Firma', fr: 'Signature', ru: 'Подпись', pt: 'Assinatura', de: 'Unterschrift', id: 'Tanda tangan', tr: 'İmza', ko: '서명 / 사인', ja: '署名 / サイン', zh: '签名', hi: 'हस्ताक्षर / दस्तख़त', ar: 'توقيع' },
  'company / business': { en: 'Company', es: 'Empresa', fr: 'Entreprise', ru: 'Компания', pt: 'Empresa', de: 'Unternehmen', id: 'Perusahaan', tr: 'Şirket', ko: '회사', ja: '会社', zh: '公司', hi: 'कंपनी / संस्था', ar: 'شركة' },
  'salary / wage': { en: 'Salary', es: 'Salario', fr: 'Salaire', ru: 'Зарплата', pt: 'Salário', de: 'Gehalt', id: 'Gaji', tr: 'Maaş', ko: '급여 / 월급', ja: '給料', zh: '工资', hi: 'वेतन / तनख्वाह', ar: 'راتب / أجر' },
  'vacation': { en: 'Vacation', es: 'Vacaciones', fr: 'Congé', ru: 'Отпуск', pt: 'Férias', de: 'Urlaub', id: 'Liburan', tr: 'Tatil', ko: '휴가 / 방학', ja: '休暇 / 休み', zh: '度假 / 假期', hi: 'छुट्टी / अवकाश', ar: 'عطلة / إجازة' },
  'vacation / leave': { en: 'Vacation', es: 'Vacaciones', fr: 'Congé', ru: 'Отпуск', pt: 'Férias', de: 'Urlaub', id: 'Liburan', tr: 'Tatil', ko: '휴가 / 방학', ja: '休暇 / 休み', zh: '度假 / 假期', hi: 'छुट्टी / अवकाश', ar: 'إجازة' },
  'vacation / time off': { en: 'Vacation', es: 'Vacaciones', fr: 'Congé', ru: 'Отпуск', pt: 'Férias', de: 'Urlaub', id: 'Liburan', tr: 'Tatil', ko: '휴가 / 방학', ja: '休暇 / 休み', zh: '度假 / 假期', hi: 'छुट्टी / अवकाश', ar: 'إجازة / عطلة' },
  'resume': { en: 'Resume', es: 'Currículum', fr: 'Curriculum vitae', ru: 'Резюме', pt: 'Currículo', de: 'Lebenslauf', id: 'Riwayat hidup', tr: 'Özgeçmiş', ko: '이력서', ja: '履歴書', hi: 'बायोडाटा / रिज़्यूमे', ar: 'سيرة ذاتية' },
  'cv': { en: 'Resume', es: 'Currículum', fr: 'Curriculum vitae', ru: 'Резюме', pt: 'Currículo', de: 'Lebenslauf', id: 'Riwayat hidup', tr: 'Özgeçmiş', ko: '이력서', ja: '履歴書', hi: 'बायोडाटा / रिज़्यूमे', ar: 'سيرة ذاتية' },
  'resume / cv': { en: 'Resume', es: 'Currículum', fr: 'Curriculum vitae', ru: 'Резюме', pt: 'Currículo', de: 'Lebenslauf', id: 'Riwayat hidup', tr: 'Özgeçmiş', ko: '이력서', ja: '履歴書', hi: 'बायोडाटा / रिज़्यूमे', ar: 'سيرة ذاتية' },
  'cv / resume': { en: 'Resume', es: 'Currículum', fr: 'Curriculum vitae', ru: 'Резюме', pt: 'Currículo', de: 'Lebenslauf', id: 'Riwayat hidup', tr: 'Özgeçmiş', ko: '이력서', ja: '履歴書', hi: 'बायोडाटा / रिज़्यूमे', ar: 'سيرة ذاتية' },
  'interview': { en: 'Interview', es: 'Entrevista', fr: 'Entretien', ru: 'Собеседование', pt: 'Entrevista', de: 'Bewerbungsgespräch', id: 'Wawancara', tr: 'Mülakat', ko: '면접 / 인터뷰', ja: '面接 / インタビュー', zh: '面试', hi: 'साक्षात्कार / इंटरव्यू', ar: 'مقابلة' },
  'job interview': { en: 'Interview', es: 'Entrevista', fr: 'Entretien', ru: 'Собеседование', pt: 'Entrevista', de: 'Bewerbungsgespräch', id: 'Wawancara', tr: 'Mülakat', ko: '면접 / 인터뷰', ja: '面接 / インタビュー', zh: '面试', hi: 'साक्षात्कार / इंटरव्यू', ar: 'مقابلة عمل' },
  'deadline / due date': { en: 'Deadline', es: 'Fecha límite', fr: 'Date limite', ru: 'Срок сдачи', pt: 'Prazo final', de: 'Frist', id: 'Tenggat waktu', tr: 'Son teslim tarihi', ko: '마감일 / 마감 시간', ja: '締め切り / 期限', zh: '截止日期', hi: 'अंतिम तिथि / डेडलाइन', ar: 'الموعد النهائي' },
  'goal': { en: 'Goal', es: 'Meta', fr: 'Objectif', ru: 'Цель', pt: 'Meta', de: 'Ziel', id: 'Tujuan', tr: 'Hedef', ko: '목표', ja: '目標', hi: 'लक्ष्य / ध्येय', ar: 'هدف' },
  'goal / objective': { en: 'Goal', es: 'Meta', fr: 'Objectif', ru: 'Цель', pt: 'Meta', de: 'Ziel', id: 'Tujuan', tr: 'Hedef', ko: '목표', ja: '目標', hi: 'लक्ष्य / ध्येय', ar: 'هدف' },
  'goal / target': { en: 'Goal', es: 'Meta', fr: 'Objectif', ru: 'Цель', pt: 'Meta', de: 'Ziel', id: 'Tujuan', tr: 'Hedef', ko: '목표', ja: '目標', zh: '目标', hi: 'लक्ष्य / ध्येय', ar: 'هدف' },
  'product': { en: 'Product', es: 'Producto', fr: 'Produit', ru: 'Продукт', pt: 'Produto', de: 'Produkt', id: 'Produk', tr: 'Ürün', ko: '제품 / 상품', ja: '製品 / 商品', zh: '产品', hi: 'उत्पाद / प्रोडक्ट', ar: 'منتج' },
  'service': { en: 'Service', es: 'Servicio', fr: 'Service', ru: 'Услуга', pt: 'Serviço', de: 'Dienstleistung', id: 'Layanan', tr: 'Hizmet', ko: '서비스', ja: 'サービス', zh: '服务', hi: 'सेवा', ar: 'خدمة' },
  'invoice / bill': { en: 'Invoice', es: 'Factura', fr: 'Facture', ru: 'Счёт', pt: 'Fatura', de: 'Rechnung', id: 'Faktur', tr: 'Fatura', ko: '청구서 / 인보이스', ja: '請求書', zh: '发票', hi: 'चालान / इनवॉइस', ar: 'فاتورة' },
  'transfer': { en: 'Transfer', es: 'Transferencia', fr: 'Virement', ru: 'Перевод', pt: 'Transferência', de: 'Überweisung', id: 'Transfer', tr: 'Havale', ko: '계좌이체 / 송금', ja: '振込 / 送金', zh: '转账', hi: 'स्थानांतरण / ट्रांसफ़र', ar: 'تحويل' },
  'bank transfer': { en: 'Transfer', es: 'Transferencia', fr: 'Virement', ru: 'Перевод', pt: 'Transferência', de: 'Überweisung', id: 'Transfer', tr: 'Havale', ko: '계좌이체 / 송금', ja: '振込 / 送金', zh: '转账', hi: 'स्थानांतरण / ट्रांसफ़र', ar: 'تحويل مصرفي' },
  'bank transfer / wire': { en: 'Transfer', es: 'Transferencia', fr: 'Virement', ru: 'Перевод', pt: 'Transferência', de: 'Überweisung', id: 'Transfer', tr: 'Havale', ko: '계좌이체 / 송금', ja: '振込 / 送金', zh: '转账', hi: 'स्थानांतरण / ट्रांसफ़र', ar: 'تحويل بنكي' },
  'refund': { en: 'Refund', es: 'Reembolso', fr: 'Remboursement', ru: 'Возврат', pt: 'Reembolso', de: 'Rückerstattung', id: 'Pengembalian dana', tr: 'Para iadesi', ko: '환불', ja: '返金 / 払い戻し', zh: '退款', hi: 'धनवापसी / रिफ़ंड', ar: 'استرداد' },
  'refund / return': { en: 'Refund', es: 'Reembolso', fr: 'Remboursement', ru: 'Возврат', pt: 'Reembolso', de: 'Rückerstattung', id: 'Pengembalian dana', tr: 'Para iadesi', ko: '환불', ja: '返金 / 払い戻し', zh: '退款', hi: 'धनवापसी / रिफ़ंड', ar: 'استرداد / إرجاع' },
  'shipping': { en: 'Shipping', es: 'Envío', fr: 'Livraison', ru: 'Доставка', pt: 'Envio', de: 'Versand', id: 'Pengiriman', tr: 'Kargo', ko: '배송', ja: '配送 / 発送', zh: '快递 / 发货', hi: 'वितरण / शिपिंग', ar: 'شحن' },
  'shipping / delivery': { en: 'Shipping', es: 'Envío', fr: 'Livraison', ru: 'Доставка', pt: 'Envio', de: 'Versand', id: 'Pengiriman', tr: 'Kargo', ko: '배송', ja: '配送 / 発送', zh: '快递 / 发货', hi: 'वितरण / शिपिंग', ar: 'شحن / توصيل' },
  'shipping / cargo': { en: 'Shipping', es: 'Envío', fr: 'Livraison', ru: 'Доставка', pt: 'Envio', de: 'Versand', id: 'Pengiriman', tr: 'Kargo', ko: '배송', ja: '配送 / 発送', zh: '快递 / 发货', hi: 'वितरण / शिपिंग', ar: 'شحن / بضائع' },
  'delivery / shipping': { en: 'Shipping', es: 'Envío', fr: 'Livraison', ru: 'Доставка', pt: 'Envio', de: 'Versand', id: 'Pengiriman', tr: 'Kargo', ko: '배송', ja: '配送 / 発送', zh: '快递 / 发货', hi: 'वितरण / शिपिंग', ar: 'توصيل / شحن' },
  'package': { en: 'Package', es: 'Paquete', fr: 'Colis', ru: 'Посылка', pt: 'Pacote', de: 'Paket', id: 'Paket', tr: 'Paket', ko: '소포 / 택배', ja: '小包 / 荷物', zh: '包裹', hi: 'पैकेट / पार्सल', ar: 'طرد / حزمة' },
  'package / parcel': { en: 'Package', es: 'Paquete', fr: 'Colis', ru: 'Посылка', pt: 'Pacote', de: 'Paket', id: 'Paket', tr: 'Paket', ko: '소포 / 택배', ja: '小包 / 荷物', zh: '包裹', hi: 'पैकेट / पार्सल', ar: 'طرد' },
  'software': { en: 'Software', es: 'Software', fr: 'Logiciel', ru: 'Программное обеспечение', pt: 'Software', de: 'Software', id: 'Perangkat lunak', tr: 'Yazılım', ko: '소프트웨어', ja: 'ソフトウェア', zh: '软件', hi: 'सॉफ़्टवेयर', ar: 'برمجيات' },
  'hardware': { en: 'Hardware', es: 'Hardware', fr: 'Matériel informatique', ru: 'Аппаратное обеспечение', pt: 'Hardware', de: 'Hardware', id: 'Perangkat keras', tr: 'Donanım', ko: '하드웨어', ja: 'ハードウェア', zh: '硬件', hi: 'हार्डवेयर', ar: 'عتاد / أجهزة' },
  'database': { en: 'Database', es: 'Base de datos', fr: 'Base de données', ru: 'База данных', pt: 'Banco de dados', de: 'Datenbank', id: 'Basis data', tr: 'Veritabanı', ko: '데이터베이스', ja: 'データベース', zh: '数据库', hi: 'डेटाबेस', ar: 'قاعدة بيانات' },
  'server': { en: 'Server', es: 'Servidor', fr: 'Serveur', ru: 'Сервер', pt: 'Servidor', de: 'Server', id: 'Peladen', tr: 'Sunucu', ko: '서버', ja: 'サーバー', zh: '服务器', hi: 'सर्वर', ar: 'خادم / سيرفر' },
  'cloud_storage': { en: 'Cloud storage', es: 'Almacenamiento en la nube', fr: 'Stockage dans le cloud', ru: 'Облачное хранилище', pt: 'Armazenamento em nuvem', de: 'Cloud-Speicher', id: 'Penyimpanan awan', tr: 'Bulut depolama', ko: '클라우드 저장소', ja: 'クラウドストレージ', zh: '云存储', hi: 'क्लाउड स्टोरेज', ar: 'تخزين سحابي' },
  'cloud storage': { en: 'Cloud storage', es: 'Almacenamiento en la nube', fr: 'Stockage dans le cloud', ru: 'Облачное хранилище', pt: 'Armazenamento em nuvem', de: 'Cloud-Speicher', id: 'Penyimpanan awan', tr: 'Bulut depolama', ko: '클라우드 저장소', ja: 'クラウドストレージ', zh: '云存储', hi: 'क्लाउड स्टोरेज', ar: 'تخزين سحابي' },
  'artificial_intelligence': { en: 'Artificial intelligence', es: 'Inteligencia artificial', fr: 'Intelligence artificielle', ru: 'Искусственный интеллект', pt: 'Inteligência artificial', de: 'Künstliche Intelligenz', id: 'Kecerdasan buatan', tr: 'Yapay zekâ', ko: '인공지능', ja: '人工知能', zh: '人工智能', hi: 'कृत्रिम बुद्धिमत्ता (एआई)', ar: 'ذكاء اصطناعي' },
  'artificial intelligence': { en: 'Artificial intelligence', es: 'Inteligencia artificial', fr: 'Intelligence artificielle', ru: 'Искусственный интеллект', pt: 'Inteligência artificial', de: 'Künstliche Intelligenz', id: 'Kecerdasan buatan', tr: 'Yapay zekâ', ko: '인공지능', ja: '人工知能', zh: '人工智能', hi: 'कृत्रिम बुद्धिमत्ता (एआई)', ar: 'ذكاء اصطناعي' },
  'artificial intelligence (ai)': { en: 'Artificial intelligence', es: 'Inteligencia artificial', fr: 'Intelligence artificielle', ru: 'Искусственный интеллект', pt: 'Inteligência artificial', de: 'Künstliche Intelligenz', id: 'Kecerdasan buatan', tr: 'Yapay zekâ', ko: '인공지능', ja: '人工知能', zh: '人工智能', hi: 'कृत्रिम बुद्धिमत्ता (एआई)', ar: 'ذكاء اصطناعي' },
  'algorithm': { en: 'Algorithm', es: 'Algoritmo', fr: 'Algorithme', ru: 'Алгоритм', pt: 'Algoritmo', de: 'Algorithmus', id: 'Algoritma', tr: 'Algoritma', ko: '알고리즘', ja: 'アルゴリズム', zh: '算法', hi: 'एल्गोरिदम / कलन विधि', ar: 'خوارزمية' },
  'developer': { en: 'Developer', es: 'Desarrollador', fr: 'Développeur', ru: 'Разработчик', pt: 'Desenvolvedor', de: 'Entwickler', id: 'Pengembang', tr: 'Geliştirici', ko: '개발자', ja: '開発者', zh: '开发者', hi: 'डेवलपर / विकासकर्ता', ar: 'مطور' },
  'developer / programmer': { en: 'Developer', es: 'Desarrollador', fr: 'Développeur', ru: 'Разработчик', pt: 'Desenvolvedor', de: 'Entwickler', id: 'Pengembang', tr: 'Geliştirici', ko: '개발자', ja: '開発者', zh: '开发者', hi: 'डेवलपर / विकासकर्ता', ar: 'مطور / مبرمج' },
  'cybersecurity': { en: 'Cybersecurity', es: 'Ciberseguridad', fr: 'Cybersécurité', ru: 'Кибербезопасность', pt: 'Cibersegurança', de: 'Cybersicherheit', id: 'Keamanan siber', tr: 'Siber güvenlik', ko: '사이버 보안', ja: 'サイバーセキュリティ', zh: '网络安全', hi: 'साइबर सुरक्षा', ar: 'أمن سيبراني' },
  'operating_system': { en: 'Operating system', es: 'Sistema operativo', fr: 'Système d\'exploitation', ru: 'Операционная система', pt: 'Sistema operacional', de: 'Betriebssystem', id: 'Sistem operasi', tr: 'İşletim sistemi', ko: '운영체제', ja: 'オペレーティングシステム', zh: '操作系统', hi: 'ऑपरेटिंग सिस्टम', ar: 'نظام تشغيل' },
  'operating system': { en: 'Operating system', es: 'Sistema operativo', fr: 'Système d\'exploitation', ru: 'Операционная система', pt: 'Sistema operacional', de: 'Betriebssystem', id: 'Sistem operasi', tr: 'İşletim sistemi', ko: '운영체제', ja: 'オペレーティングシステム', zh: '操作系统', hi: 'ऑपरेटिंग सिस्टम', ar: 'نظام تشغيل' },
  'budget': { en: 'Budget', es: 'Presupuesto', fr: 'Budget', ru: 'Бюджет', pt: 'Orçamento', de: 'Budget', id: 'Anggaran', tr: 'Bütçe', ko: '예산', ja: '予算', zh: '预算', hi: 'बजट / आय-व्ययक', ar: 'ميزانية' },
  'budget / financial plan': { en: 'Budget', es: 'Presupuesto', fr: 'Budget', ru: 'Бюджет', pt: 'Orçamento', de: 'Budget', id: 'Anggaran', tr: 'Bütçe', ko: '예산', ja: '予算', zh: '预算', hi: 'बजट / आय-व्ययक', ar: 'ميزانية' },
  'investment': { en: 'Investment', es: 'Inversión', fr: 'Investissement', ru: 'Инвестиции', pt: 'Investimento', de: 'Investition', id: 'Investasi', tr: 'Yatırım', ko: '투자', ja: '投資', zh: '投资', hi: 'निवेश', ar: 'استثمار' },
  'investment / capital': { en: 'Investment', es: 'Inversión', fr: 'Investissement', ru: 'Инвестиции', pt: 'Investimento', de: 'Investition', id: 'Investasi', tr: 'Yatırım', ko: '투자', ja: '投資', zh: '投资', hi: 'निवेश', ar: 'استثمار / رأس مال' },
  'revenue': { en: 'Revenue', es: 'Ingresos', fr: 'Revenus', ru: 'Выручка', pt: 'Receita', de: 'Umsatz', id: 'Pendapatan', tr: 'Gelir', ko: '수익 / 매출', ja: '収益 / 売上', hi: 'राजस्व / आय', ar: 'إيرادات' },
  'revenue / income': { en: 'Revenue', es: 'Ingresos', fr: 'Revenus', ru: 'Выручка', pt: 'Receita', de: 'Umsatz', id: 'Pendapatan', tr: 'Gelir', ko: '수익 / 매출', ja: '収益 / 売上', zh: '收入', hi: 'राजस्व / आय', ar: 'دخل / إيرادات' },
  'revenue / turnover': { en: 'Revenue', es: 'Ingresos', fr: 'Revenus', ru: 'Выручка', pt: 'Receita', de: 'Umsatz', id: 'Pendapatan', tr: 'Gelir', ko: '수익 / 매출', ja: '収益 / 売上', hi: 'राजस्व / आय', ar: 'إيرادات / دخل' },
  'startup': { en: 'Startup', es: 'Empresa emergente', fr: 'Jeune pousse', ru: 'Стартап', pt: 'Startup', de: 'Startup', id: 'Startup', tr: 'Yeni girişim', ko: '스타트업', ja: 'スタートアップ', zh: '初创公司', hi: 'स्टार्टअप / नया उद्यम', ar: 'شركة ناشئة' },
  'startup company': { en: 'Startup', es: 'Empresa emergente', fr: 'Jeune pousse', ru: 'Стартап', pt: 'Startup', de: 'Startup', id: 'Startup', tr: 'Yeni girişim', ko: '스타트업', ja: 'スタートアップ', zh: '初创公司', hi: 'स्टार्टअप / नया उद्यम', ar: 'شركة ناشئة' },
  'remote_work': { en: 'Remote work', es: 'Teletrabajo', fr: 'Télétravail', ru: 'Удалённая работа', pt: 'Trabalho remoto', de: 'Fernarbeit', id: 'Kerja jarak jauh', tr: 'Uzaktan çalışma', ko: '재택근무 / 원격근무', ja: 'リモートワーク / 在宅勤務', zh: '远程办公', hi: 'दूरस्थ कार्य / रिमोट वर्क', ar: 'عمل عن بعد' },
  'remote work': { en: 'Remote work', es: 'Teletrabajo', fr: 'Télétravail', ru: 'Удалённая работа', pt: 'Trabalho remoto', de: 'Fernarbeit', id: 'Kerja jarak jauh', tr: 'Uzaktan çalışma', ko: '재택근무 / 원격근무', ja: 'リモートワーク / 在宅勤務', zh: '远程办公', hi: 'दूरस्थ कार्य / रिमोट वर्क', ar: 'عمل عن بعد' },
  'remote work / telecommuting': { en: 'Remote work', es: 'Teletrabajo', fr: 'Télétravail', ru: 'Удалённая работа', pt: 'Trabalho remoto', de: 'Fernarbeit', id: 'Kerja jarak jauh', tr: 'Uzaktan çalışma', ko: '재택근무 / 원격근무', ja: 'リモートワーク / 在宅勤務', zh: '远程办公', hi: 'दूरस्थ कार्य / रिमोट वर्क', ar: 'العمل عن بُعد' },
  'remote work / homeoffice': { en: 'Remote work', es: 'Teletrabajo', fr: 'Télétravail', ru: 'Удалённая работа', pt: 'Trabalho remoto', de: 'Fernarbeit', id: 'Kerja jarak jauh', tr: 'Uzaktan çalışma', ko: '재택근무 / 원격근무', ja: 'リモートワーク / 在宅勤務', zh: '远程办公', hi: 'दूरस्थ कार्य / रिमोट वर्क', ar: 'العمل عن بُعد / من المنزل' },

  'strawberry': { en: 'Strawberry', es: 'Fresa', fr: 'Fraise', ru: 'Клубника', pt: 'Morango', de: 'Erdbeere', id: 'Stroberi', tr: 'Çilek', ko: '딸기', ja: 'いちご / 苺', zh: '草莓', hi: 'स्ट्रॉबेरी', ar: 'فراولة' },
  'garlic': { en: 'Garlic', es: 'Ajo', fr: 'Ail', ru: 'Чеснок', pt: 'Alho', de: 'Knoblauch', id: 'Bawang putih', tr: 'Sarımsak', ko: '마늘', ja: 'にんにく / 大蒜', zh: '大蒜', hi: 'लहसुन', ar: 'ثوم' },
  'potato': { en: 'Potato', es: 'Patata / Papa', fr: 'Pomme de terre', ru: 'Картофель', pt: 'Batata', de: 'Kartoffel', id: 'Kentang', tr: 'Patates', ko: '감자', ja: 'じゃがいも / 馬鈴薯', zh: '土豆', hi: 'आलू', ar: 'بطاطس' },
  'onion': { en: 'Onion', es: 'Cebolla', fr: 'Oignon', ru: 'Лук', pt: 'Cebola', de: 'Zwiebel', id: 'Bawang bombay', tr: 'Soğan', ko: '양파', ja: '玉ねぎ / タマネギ', zh: '洋葱', hi: 'प्याज़', ar: 'بصل' },
  'carrot': { en: 'Carrot', es: 'Zanahoria', fr: 'Carotte', ru: 'Морковь', pt: 'Cenoura', de: 'Karotte', id: 'Wortel', tr: 'Havuç', ko: '당근', ja: 'にんじん / 人参', zh: '胡萝卜', hi: 'गाजर', ar: 'جزر' },
  'spoon': { en: 'Spoon', es: 'Cuchara', fr: 'Cuillère', ru: 'Ложка', pt: 'Colher', de: 'Löffel', id: 'Sendok', tr: 'Kaşık', ko: '숟가락', ja: 'スプーン', zh: '汤匙 / 勺子', hi: 'चम्मच', ar: 'ملعقة' },
  'fork': { en: 'Fork', es: 'Tenedor', fr: 'Fourchette', ru: 'Вилка', pt: 'Garfo', de: 'Gabel', id: 'Garpu', tr: 'Çatal', ko: '포크', ja: 'フォーク', zh: '餐叉', hi: 'काँटा', ar: 'شوكة' },
  'knife': { en: 'Knife', es: 'Cuchillo', fr: 'Couteau', ru: 'Нож', pt: 'Faca', de: 'Messer', id: 'Pisau', tr: 'Bıçak', ko: '칼', ja: 'ナイフ / 包丁', zh: '餐刀', hi: 'चाकू / छुरी', ar: 'سكين' },
  'plate': { en: 'Plate', es: 'Plato', fr: 'Assiette', ru: 'Тарелка', pt: 'Prato', de: 'Teller', id: 'Piring', tr: 'Tabak', ko: '접시', ja: '皿 / お皿', zh: '餐盘', hi: 'थाली / प्लेट', ar: 'طبق / صحن' },
  'bicycle': { en: 'Bicycle', es: 'Bicicleta', fr: 'Vélo / Bicyclette', ru: 'Велосипед', pt: 'Bicicleta', de: 'Fahrrad', id: 'Sepeda', tr: 'Bisiklet', ko: '자전거', ja: '自転車', zh: '单车 / 自行车', hi: 'साइकिल', ar: 'دراجة' },
  'suitcase': { en: 'Suitcase', es: 'Maleta', fr: 'Valise', ru: 'Чемодан', pt: 'Mala', de: 'Koffer', id: 'Koper', tr: 'Bavul', ko: '여행가방 / 캐리어', ja: 'スーツケース', zh: '手提箱', hi: 'सूटकेस / पेटी', ar: 'حقيبة سفر' },
  'backpack': { en: 'Backpack', es: 'Mochila', fr: 'Sac à dos', ru: 'Рюкзак', pt: 'Mochila', de: 'Rucksack', id: 'Ransel', tr: 'Sırt çantası', ko: '배낭 / 책가방', ja: 'リュックサック', zh: '双肩包', hi: 'पिठ्ठू बस्ता / बैकपैक', ar: 'حقيبة ظهر' },
  'wallet': { en: 'Wallet', es: 'Billetera / Cartera', fr: 'Portefeuille', ru: 'Кошелёк', pt: 'Carteira', de: 'Geldbörse', id: 'Dompet', tr: 'Cüzdan', ko: '지갑', ja: '財布', zh: '钱包', hi: 'बटुआ / पर्स', ar: 'محفظة' },
  'ambulance': { en: 'Ambulance', es: 'Ambulancia', fr: 'Ambulance', ru: 'Скорая помощь', pt: 'Ambulância', de: 'Krankenwagen', id: 'Ambulans', tr: 'Ambulans', ko: '구급차', ja: '救急車', zh: '救护车', hi: 'एम्बुलेंस / रोगी वाहन', ar: 'سيارة إسعاف' },
  'firefighter': { en: 'Firefighter', es: 'Bombero', fr: 'Pompier', ru: 'Пожарный', pt: 'Bombeiro', de: 'Feuerwehrmann', id: 'Pemadam kebakaran', tr: 'İtfaiyeci', ko: '소방관', ja: '消防士', zh: '消防员', hi: 'दमकलकर्मी', ar: 'رجل إطفاء' },
  'beach': { en: 'Beach', es: 'Playa', fr: 'Plage', ru: 'Пляж', pt: 'Praia', de: 'Strand', id: 'Pantai', tr: 'Plaj', ko: '해변', ja: '浜辺 / ビーチ', zh: '海滩', hi: 'समुद्र तट / बीच', ar: 'شاطئ' },
  'mountain': { en: 'Mountain', es: 'Montaña', fr: 'Montagne', ru: 'Гора', pt: 'Montanha', de: 'Berg', id: 'Gunung', tr: 'Dağ', ko: '산', ja: '山', zh: '高山', hi: 'पहाड़ / पर्वत', ar: 'جبل' },
  'river': { en: 'River', es: 'Río', fr: 'Rivière / Fleuve', ru: 'Река', pt: 'Rio', de: 'Fluss', id: 'Sungai', tr: 'Nehir', ko: '강', ja: '川', zh: '河流', hi: 'नदी / सरिता', ar: 'نهر' },
  'lake': { en: 'Lake', es: 'Lago', fr: 'Lac', ru: 'Озеро', pt: 'Lago', de: 'See', id: 'Danau', tr: 'Göl', ko: '호수', ja: '湖', zh: '湖泊', hi: 'झील', ar: 'بحيرة' },
  'bedroom': { en: 'Bedroom', es: 'Dormitorio / Habitación', fr: 'Chambre', ru: 'Спальня', pt: 'Quarto', de: 'Schlafzimmer', id: 'Kamar tidur', tr: 'Yatak odası', ko: '침실', ja: '寝室', zh: '卧室', hi: 'शयनकक्ष / बेडरूम', ar: 'غرفة نوم' },
  'closet': { en: 'Closet', es: 'Armario', fr: 'Placard / Armoire', ru: 'Шкаф', pt: 'Armário', de: 'Kleiderschrank', id: 'Lemari pakaian', tr: 'Gardırop', ko: '옷장', ja: 'クローゼット', hi: 'अलमारी', ar: 'خزانة ملابس' },
  'glasses': { en: 'Glasses', es: 'Gafas / Lentes', fr: 'Lunettes', ru: 'Очки', pt: 'Óculos', de: 'Brille', id: 'Kaca mata', tr: 'Gözlük', ko: '안경', ja: '眼鏡 / メガネ', zh: '眼镜', hi: 'चश्मा', ar: 'نظارات' },
  'notebook': { en: 'Notebook', es: 'Cuaderno', fr: 'Carnet / Cahier', ru: 'Тетрадь / Блокнот', pt: 'Caderno', de: 'Notizbuch', id: 'Buku catatan', tr: 'Defter', ko: '공책 / 수첩', ja: 'ノート', hi: 'नोटबुक / कॉपी', ar: 'دفتر ملاحظات' },
  'pen': { en: 'Pen', es: 'Bolígrafo / Pluma', fr: 'Stylo', ru: 'Ручка', pt: 'Caneta', de: 'Kugelschreiber', id: 'Pena tinta', tr: 'Tükenmez kalem', ko: '펜', ja: 'ペン', zh: '钢笔', hi: 'कलम / पेन', ar: 'قلم' },
  'pencil': { en: 'Pencil', es: 'Lápiz', fr: 'Crayon', ru: 'Карандаш', pt: 'Lápis', de: 'Bleistift', id: 'Pensil kayu', tr: 'Kurşun kalem', ko: '연필', ja: '鉛筆', zh: '铅笔', hi: 'पेंसिल', ar: 'قلم رصاص' },
};

/**
 * Extracts numeric digits from strings like "15", "15 (Fifteen)", "1,000 (One Thousand)",
 * or exact cardinal number words ("Zero", "One hundred", "One thousand", "Сто", "Тысяча").
 * Ignores clock times and time expressions (e.g. "2:00 sharp", "12:30", "Two o'clock").
 */
export const extractDigit = (text: string): number | null => {
  if (!text) return null;
  if (
    /\d+:\d+/.test(text) ||
    /\b(o'clock|half\s+past|quarter|en\s+punto|y\s+media|y\s+cuarto|menos\s+cuarto|menos\s+diez|heure|heures|demie|quart|час|часа|часов|половина|четверть|ровно|em\s+ponto|e\s+meia|para\s+as|horas|punkt|uhr|halb|viertel|jam|setengah|seperempat|tepat|saat|buçuk|çeyrek|geçiyor)\b/i.test(text)
  ) {
    return null;
  }
  const match = text.match(/\b\d{1,3}(?:[,.]\d{3})+\b|\b\d+\b/);
  if (match) {
    const rawNumber = match[0].replace(/[,.]/g, '');
    const n = parseInt(rawNumber, 10);
    if (!isNaN(n)) return n;
  }

  // Also check exact cardinal number words in NUMBER_TABLE (e.g. "One hundred", "One thousand", "Сто", "Тысяча")
  const cleanedWord = text
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .trim()
    .toLowerCase();
  if (cleanedWord) {
    for (const entry of Object.values(NUMBER_TABLE)) {
      if (entry.allWords.includes(cleanedWord)) {
        return entry.digit;
      }
    }
  }

  return null;
};

/**
 * Gets a clean, localized number text for display and prompt matching.
 */
export const getLocalizedNumber = (
  rawText: string,
  lang: SupportedLanguageId
): string | null => {
  const digit = extractDigit(rawText);
  if (digit !== null && NUMBER_TABLE[digit]) {
    const item = NUMBER_TABLE[digit];
    const word = item[lang] || item.en;
    return `${digit} (${word})`;
  }
  return null;
};

export interface TranslatableItem {
  english?: string;
  russian?: string;
  russianWord?: string;
  word?: string;
  englishWord?: string;
  phrase?: string;
  meaning?: string;
  translation?: string;
  target?: string;
  pronunciation?: string;
}

type LanguageTranslationMap = Partial<Record<SupportedLanguageId, string>>;

const TIME_EXPRESSION_REGEX = /\b(o'clock|half\s+past|quarter|en\s+punto|y\s+media|y\s+cuarto|menos\s+cuarto|menos\s+diez|heure|heures|demie|quart|час|часа|часов|половина|четверть|ровно|em\s+ponto|e\s+meia|para\s+as|horas|punkt|uhr|halb|viertel|jam|setengah|seperempat|tepat|saat|buçuk|çeyrek|geçiyor)\b/i;

const cleanLookupKey = (raw: string): string =>
  raw
    .toLowerCase()
    .replace(/^noun:\s*/i, '')
    .replace(/^verb:\s*/i, '')
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

let indexesInitialized = false;
const enLookupMap = new Map<string, LanguageTranslationMap>();
const targetValueLookupMap = new Map<string, LanguageTranslationMap>();
const conceptTextLookupMap = new Map<string, LanguageTranslationMap>();
let compiledWordBoundaryList: Array<{ key: string; lowerKey: string; regex: RegExp; mapping: LanguageTranslationMap }> = [];
const translationCache = new Map<string, string>();
const MAX_CACHE_ENTRIES = 25000;

const mergeIntoMap = (
  map: Map<string, LanguageTranslationMap>,
  key: string,
  values: LanguageTranslationMap,
  overwriteExisting: boolean
) => {
  if (!key) return;
  const existing = map.get(key);
  if (!existing) {
    map.set(key, { ...values });
    return;
  }
  for (const [lang, text] of Object.entries(values) as Array<[SupportedLanguageId, string | undefined]>) {
    if (!text) continue;
    if (overwriteExisting || !existing[lang]) {
      existing[lang] = text;
    }
  }
};

const ensureTranslationIndexes = () => {
  if (indexesInitialized) return;
  indexesInitialized = true;

  // 1. Seed primary dictionary entries (highest priority)
  for (const [rawKey, mapping] of Object.entries(EXTENDED_DICTIONARY)) {
    const lowerKey = rawKey.toLowerCase().trim();
    mergeIntoMap(enLookupMap, lowerKey, mapping, true);
    const cleanedKey = cleanLookupKey(lowerKey);
    if (cleanedKey && cleanedKey !== lowerKey) {
      mergeIntoMap(enLookupMap, cleanedKey, mapping, false);
    }
  }

  // 2. Enrich missing language slots from Universal Concept Matrix
  for (const concept of CONCEPT_MATRIX) {
    const conceptMap: LanguageTranslationMap = {};
    for (const [lang, entry] of Object.entries(concept.translations) as Array<[SupportedLanguageId, { text: string } | undefined]>) {
      if (entry?.text) {
        conceptMap[lang] = entry.text;
      }
    }
    for (const textVal of Object.values(conceptMap)) {
      if (!textVal) continue;
      const lowerText = textVal.toLowerCase().trim();
      mergeIntoMap(conceptTextLookupMap, lowerText, conceptMap, false);
      const cleanedText = cleanLookupKey(lowerText);
      if (cleanedText && cleanedText !== lowerText) {
        mergeIntoMap(conceptTextLookupMap, cleanedText, conceptMap, false);
      }
    }
    if (conceptMap.en) {
      const { en: _omitEn, ...nonEnConceptMap } = conceptMap;
      const enLower = conceptMap.en.toLowerCase().trim();
      mergeIntoMap(enLookupMap, enLower, nonEnConceptMap, false);
      const enClean = cleanLookupKey(enLower);
      if (enClean && enClean !== enLower) {
        mergeIntoMap(enLookupMap, enClean, nonEnConceptMap, false);
      }
    }
  }

  // 3. Cross-index all 15 supported language curricula so newer languages (ur, bn, ar, hi, zh, ja, ko, etc.)
  // automatically resolve shared English meanings without falling back to English definitions.
  if (SUPPORTED_LANGUAGES) {
    const allLangEntries = Object.entries(SUPPORTED_LANGUAGES) as Array<[SupportedLanguageId, (typeof SUPPORTED_LANGUAGES)[SupportedLanguageId]]>;
    for (const [lang, meta] of allLangEntries) {
      if (lang === 'en' || !meta?.data) continue;

      if (Array.isArray(meta.data.alphabet)) {
        for (const item of meta.data.alphabet) {
          const targetWord = (item.word || '').toString().trim();
          const enMeaning = (item.meaning || '').toString().trim();
          if (!targetWord || !enMeaning) continue;
          const cleanEn = cleanLookupKey(enMeaning);
          mergeIntoMap(enLookupMap, cleanEn, { [lang]: targetWord }, false);
          if (cleanEn.includes('/')) {
            for (const part of cleanEn.split('/')) {
              const trimmed = part.trim();
              if (trimmed.length >= 2) {
                mergeIntoMap(enLookupMap, trimmed, { [lang]: targetWord }, false);
              }
            }
          }
        }
      }

      const phraseLists = [meta.data.basicPhrases, meta.data.commonWords, meta.data.time];
      for (const list of phraseLists) {
        if (!Array.isArray(list)) continue;
        for (const item of list) {
          const targetText = (item.russian || item.phrase || item.target || (item as any).word || '').toString().trim();
          const enText = (item.english || item.translation || item.meaning || '').toString().trim();
          if (!targetText || !enText) continue;
          const exactLower = enText.toLowerCase();
          const cleanEn = cleanLookupKey(enText);
          mergeIntoMap(enLookupMap, exactLower, { [lang]: targetText }, false);
          if (cleanEn && cleanEn !== exactLower) {
            mergeIntoMap(enLookupMap, cleanEn, { [lang]: targetText }, false);
          }
          if (cleanEn.includes('/')) {
            for (const part of cleanEn.split('/')) {
              const trimmed = part.trim();
              if (trimmed.length >= 2) {
                mergeIntoMap(enLookupMap, trimmed, { [lang]: targetText }, false);
              }
            }
          }
        }
      }
    }

    // Link English curriculum definitions (e.g. "Noun: A sweet round fruit" -> "Apple") to their multi-language entries
    const enData = SUPPORTED_LANGUAGES.en?.data;
    if (enData) {
      if (Array.isArray(enData.alphabet)) {
        for (const item of enData.alphabet) {
          const enWord = cleanLookupKey((item.word || '').toString());
          const enDef = cleanLookupKey((item.meaning || '').toString());
          const wordEntry = enLookupMap.get(enWord);
          if (enWord && enDef && wordEntry) {
            const { en: _omitEn, ...nonEnWordEntry } = wordEntry;
            mergeIntoMap(enLookupMap, enDef, nonEnWordEntry, false);
          }
        }
      }
      for (const list of [enData.basicPhrases, enData.commonWords]) {
        if (!Array.isArray(list)) continue;
        for (const item of list) {
          const enPhrase = cleanLookupKey((item.phrase || '').toString());
          const enDef = cleanLookupKey((item.translation || item.meaning || '').toString());
          const phraseEntry = enLookupMap.get(enPhrase);
          if (enPhrase && enDef && phraseEntry) {
            const { en: _omitEn, ...nonEnPhraseEntry } = phraseEntry;
            mergeIntoMap(enLookupMap, enDef, nonEnPhraseEntry, false);
          }
        }
      }
    }
  }

  // 4. Build reverse target-word O(1) index across all 15 languages from enLookupMap
  for (const mapping of enLookupMap.values()) {
    for (const val of Object.values(mapping)) {
      if (!val) continue;
      const lowerVal = val.toLowerCase().trim();
      if (lowerVal) {
        mergeIntoMap(targetValueLookupMap, lowerVal, mapping, false);
      }
      const cleanVal = lowerVal.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
      if (cleanVal && cleanVal !== lowerVal) {
        mergeIntoMap(targetValueLookupMap, cleanVal, mapping, false);
      }
    }
  }

  // 5. Pre-sort & pre-compile word-boundary regular expressions once
  compiledWordBoundaryList = Object.entries(EXTENDED_DICTIONARY)
    .filter(([key]) => key.length >= 3)
    .sort((a, b) => b[0].length - a[0].length)
    .map(([key]) => {
      const lowerKey = key.toLowerCase().trim();
      const escapedKey = lowerKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const enrichedMapping = enLookupMap.get(lowerKey) || EXTENDED_DICTIONARY[key];
      return {
        key,
        lowerKey,
        regex: new RegExp(`(^|\\s)${escapedKey}(\\s|$)`, 'i'),
        mapping: enrichedMapping
      };
    });
};

/**
 * Resolves translation of a phrase item into the user's base/reference language.
 */
export const resolveTranslation = (
  item: TranslatableItem | PhraseItem,
  targetLang: SupportedLanguageId,
  baseLang: SupportedLanguageId
): string => {
  if (!item) return '';

  // If user speaks the target language, show primary text
  if (baseLang === targetLang) {
    return ((item as any).word || (item as any).russianWord || item.russian || item.phrase || item.target || '').toString();
  }

  const cacheKey = `${targetLang}|${baseLang}|${(item as any).category ?? ''}|${(item as any).word ?? ''}|${(item as any).englishWord ?? ''}|${item.english ?? ''}|${item.translation ?? ''}|${item.phrase ?? ''}|${item.russian ?? ''}|${(item as any).russianWord ?? ''}|${item.meaning ?? ''}`;
  const cached = translationCache.get(cacheKey);
  if (cached !== undefined) {
    return cached;
  }

  ensureTranslationIndexes();

  const storeAndReturn = (result: string): string => {
    if (translationCache.size >= MAX_CACHE_ENTRIES) {
      translationCache.clear();
    }
    translationCache.set(cacheKey, result);
    return result;
  };

  // 1. Check if item is a cardinal number
  const rawEnglish = (item.english || (item as any).englishWord || item.translation || item.meaning || item.phrase || '').toString();
  const primaryText = (item.phrase || item.russian || (item as any).word || '').toString();
  const isTimeExpression =
    (item as any).category === 'Time' ||
    /\d+:\d+/.test(rawEnglish) ||
    /\d+:\d+/.test(primaryText) ||
    TIME_EXPRESSION_REGEX.test(`${rawEnglish} ${primaryText}`);

  if (!isTimeExpression) {
    const digit = extractDigit(rawEnglish) ?? extractDigit(primaryText);
    if (digit !== null && NUMBER_TABLE[digit]) {
      const numEntry = NUMBER_TABLE[digit];
      if (baseLang in numEntry) {
        return storeAndReturn(`${digit} (${numEntry[baseLang]})`);
      }
    }
  }

  // 2. Direct candidate key lookup in priority order (word, englishWord, english, translation, phrase, meaning)
  const rawCandidates = [
    (item as any).word,
    (item as any).englishWord,
    item.english,
    item.translation,
    item.phrase,
    item.meaning
  ]
    .filter(Boolean)
    .map(val => String(val).trim());

  for (const candidate of rawCandidates) {
    const lower = candidate.toLowerCase();
    const val = enLookupMap.get(lower)?.[baseLang];
    if (val) {
      return storeAndReturn(val);
    }
    const cleaned = cleanLookupKey(lower);
    const valCleaned = cleaned ? enLookupMap.get(cleaned)?.[baseLang] : undefined;
    if (valCleaned) {
      return storeAndReturn(valCleaned);
    }
  }

  // 3. Direct target word O(1) lookup across dictionary values
  const directTarget = ((item as any).russianWord || (item as any).russian || (item as any).word || item.phrase || '').toString().toLowerCase().trim();
  if (directTarget) {
    const directMatch = targetValueLookupMap.get(directTarget)?.[baseLang];
    if (directMatch) return storeAndReturn(directMatch);
    const directTargetClean = directTarget.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
    if (directTargetClean && directTargetClean !== directTarget) {
      const cleanMatch = targetValueLookupMap.get(directTargetClean)?.[baseLang];
      if (cleanMatch) return storeAndReturn(cleanMatch);
    }
  }

  // 4. Clean key for word-boundary token & matrix lookup
  const cleanKey = cleanLookupKey(
    (item.english || (item as any).englishWord || item.translation || item.phrase || item.meaning || '').toString()
  );

  // 5. Check for multi-word or token matches in dictionary using precompiled word-boundary regexes (longest keys first)
  if (cleanKey.length >= 3) {
    for (const entry of compiledWordBoundaryList) {
      if (cleanKey.length < entry.lowerKey.length) continue;
      const valKey = entry.mapping[baseLang];
      if (valKey && cleanKey.includes(entry.lowerKey) && entry.regex.test(cleanKey)) {
        return storeAndReturn(valKey);
      }
    }
  }

  // 6. Check Universal Concept Matrix O(1) map
  const matrixMatch = conceptTextLookupMap.get(cleanKey)?.[baseLang];
  if (matrixMatch) {
    return storeAndReturn(matrixMatch);
  }

  // 7. Fallback: English translation or primary text
  return storeAndReturn(
    item.english || (item as any).englishWord || item.translation || item.meaning || item.phrase || item.russian || ''
  );
};

/**
 * Localized Language Names in the native speaker's tongue
 */
export const LANGUAGE_NAMES_IN_BASE: Record<SupportedLanguageId, Record<SupportedLanguageId, string>> = {
  en: { en: 'English', es: 'Spanish', fr: 'French', ru: 'Russian', pt: 'Portuguese', de: 'German', id: 'Indonesian', tr: 'Turkish', ja: 'Japanese', ko: 'Korean', zh: 'Chinese', hi: 'Hindi', ar: 'Arabic', bn: 'Bengali', ur: 'Urdu' },
  es: { en: 'inglés', es: 'español', fr: 'francés', ru: 'ruso', pt: 'portugués', de: 'alemán', id: 'indonesio', tr: 'turco', ja: 'japonés', ko: 'coreano', zh: 'chino', hi: 'hindi', ar: 'árabe', bn: 'bengalí', ur: 'urdu' },
  fr: { en: 'anglais', es: 'espagnol', fr: 'français', ru: 'russe', pt: 'portugais', de: 'allemand', id: 'indonésien', tr: 'turc', ja: 'japonais', ko: 'coréen', zh: 'chinois', hi: 'hindi', ar: 'arabe', bn: 'bengali', ur: 'ourdou' },
  ru: { en: 'английском', es: 'испанском', fr: 'французском', ru: 'русском', pt: 'португальском', de: 'немецком', id: 'индонезийском', tr: 'турецком', ja: 'японском', ko: 'корейском', zh: 'китайском', hi: 'хинди', ar: 'арабском', bn: 'бенгальском', ur: 'урду' },
  pt: { en: 'inglês', es: 'espanhol', fr: 'francês', ru: 'russo', pt: 'português', de: 'alemão', id: 'indonésio', tr: 'turco', ja: 'japonês', ko: 'coreano', zh: 'chinês', hi: 'híndi', ar: 'árabe', bn: 'bengali', ur: 'urdu' },
  de: { en: 'Englisch', es: 'Spanisch', fr: 'Französisch', ru: 'Russisch', pt: 'Portugiesisch', de: 'Deutsch', id: 'Indonesisch', tr: 'Türkisch', ja: 'Japanisch', ko: 'Koreanisch', zh: 'Chinesisch', hi: 'Hindi', ar: 'Arabisch', bn: 'Bengalisch', ur: 'Urdu' },
  id: { en: 'bahasa Inggris', es: 'bahasa Spanyol', fr: 'bahasa Prancis', ru: 'bahasa Rusia', pt: 'bahasa Portugis', de: 'bahasa Jerman', id: 'bahasa Indonesia', tr: 'bahasa Turki', ja: 'bahasa Jepang', ko: 'bahasa Korea', zh: 'bahasa Mandarin', hi: 'bahasa Hindi', ar: 'bahasa Arab', bn: 'bahasa Bengali', ur: 'bahasa Urdu' },
  tr: { en: 'İngilizce', es: 'İspanyolca', fr: 'Fransızca', ru: 'Rusça', pt: 'Portekizce', de: 'Almanca', id: 'Endonezce', tr: 'Türkçe', ja: 'Japonca', ko: 'Korece', zh: 'Çince', hi: 'Hintçe', ar: 'Arapça', bn: 'Bengalce', ur: 'Urduca' },
  ja: { en: '英語', es: 'スペイン語', fr: 'フランス語', ru: 'ロシア語', pt: 'ポルトガル語', de: 'ドイツ語', id: 'インドネシア語', tr: 'トルコ語', ja: '日本語', ko: '韓国語', zh: '中国語', hi: 'ヒンディー語', ar: 'アラビア語', bn: 'ベンガル語', ur: 'ウルドゥー語' },
  ko: { en: '영어', es: '스페인어', fr: '프랑스어', ru: '러시아어', pt: '포르투갈어', de: '독일어', id: '인도네시아어', tr: '튀르키예어', ja: '일본어', ko: '한국어', zh: '중국어', hi: '힌디어', ar: '아랍어', bn: '벵골어', ur: '우르두어' },
  hi: { en: 'अंग्रेज़ी', es: 'स्पैनिश', fr: 'फ़्रेंच', ru: 'रूसी', pt: 'पुर्तगाली', de: 'जर्मन', id: 'इंडोनेशियाई', tr: 'तुर्की', ja: 'जापानी', ko: 'कोरियाई', zh: 'चीनी', hi: 'हिन्दी', ar: 'अरबी', bn: 'बंगाली', ur: 'उर्दू' },
  zh: { en: '英语', es: '西班牙语', fr: '法语', ru: '俄语', pt: '葡萄牙语', de: '德语', id: '印尼语', tr: '土耳其语', ja: '日语', ko: '韩语', zh: '中文', hi: '印地语', ar: '阿拉伯语', bn: '孟加拉语', ur: '乌尔都语' },
  ar: { en: 'الإنجليزية', es: 'الإسبانية', fr: 'الفرنسية', ru: 'الروسية', pt: 'البرتغالية', de: 'الألمانية', id: 'الإندونيسية', tr: 'التركية', ja: 'اليابانية', ko: 'الكورية', zh: 'الصينية', hi: 'الهندية', ar: 'العربية', bn: 'البنغالية', ur: 'الأردية' },
  bn: { en: 'ইংরেজি', es: 'স্প্যানিশ', fr: 'ফরাসি', ru: 'রুশ', pt: 'পর্তুগিজ', de: 'জার্মান', id: 'ইন্দোনেশীয়', tr: 'তুর্কি', ja: 'জাপানি', ko: 'কোরীয়', zh: 'চীনা', hi: 'হিন্দি', ar: 'আরবি', bn: 'বাংলা', ur: 'উর্দু' },
  ur: { en: 'انگریزی', es: 'ہسپانوی', fr: 'فرانسیسی', ru: 'روسی', pt: 'پرتگالی', de: 'جرمن', id: 'انڈونیشیائی', tr: 'ترکی', ja: 'جاپانی', ko: 'کوریائی', zh: 'چینی', hi: 'ہندی', ar: 'عربی', bn: 'بنگالی', ur: 'اردو' }
};

/**
 * Localized hint for alphabet quiz cards
 */
export const getAlphabetQuizHint = (
  character: string,
  targetLang: SupportedLanguageId,
  baseLang: SupportedLanguageId,
  metaName: string,
  isListening?: boolean
): string => {
  const targetNameInBase = LANGUAGE_NAMES_IN_BASE[baseLang]?.[targetLang] || metaName;

  if (isListening) {
    switch (baseLang) {
      case 'ru':
        return `Послушайте аудио и введите букву на ${targetNameInBase}:`;
      case 'es':
        return `Escucha el audio y escribe la letra en ${targetNameInBase}:`;
      case 'fr':
        return `Écoutez l'audio et tapez la lettre en ${targetNameInBase} :`;
      case 'pt':
        return `Ouça o áudio e digite a letra em ${targetNameInBase}:`;
      case 'de':
        return `Höre dir das Audio an und tippe den Buchstaben auf ${targetNameInBase}:`;
      case 'id':
        return `Dengarkan audio dan ketik hurufnya dalam ${targetNameInBase}:`;
      case 'tr':
        return `Sesi dinleyin ve ${targetNameInBase} dilindeki harfi yazın:`;
      case 'ja':
        return `音声を聞いて${targetNameInBase}の文字を入力してください:`;
      case 'ko':
        return `오디오를 듣고 ${targetNameInBase} 문자를 입력하세요:`;
      case 'zh':
        return `听音频并输入${targetNameInBase}字母:`;
      case 'hi':
        return `ऑडियो सुनें और ${targetNameInBase} में अक्षर लिखें:`;
      case 'ar':
        return `استمع إلى الصوت واكتب الحرف في ${targetNameInBase}:`;
      case 'bn':
        return `অডিও শুনুন এবং ${targetNameInBase}-এ অক্ষর লিখুন:`;
      case 'ur':
        return `آڈیو سنیں اور ${targetNameInBase} میں حرف لکھیں:`;
      case 'en':
      default:
        return `Listen to the audio and type the letter in ${targetNameInBase}:`;
    }
  }

  if (targetLang === 'ru') {
    switch (baseLang) {
      case 'ru':
        return `Какой звук передаёт русская буква «${character}»?`;
      case 'es':
        return `¿Qué sonido hace la letra cirílica «${character}»?`;
      case 'fr':
        return `Quel son fait la lettre cyrillique « ${character} » ?`;
      case 'pt':
        return `Que som faz a letra cirílica «${character}»?`;
      case 'de':
        return `Welchen Laut hat der kyrillische Buchstabe „${character}“?`;
      case 'id':
        return `Bunyi apa yang dihasilkan huruf Sirilik "${character}"?`;
      case 'tr':
        return `Kiril harfi "${character}" hangi sesi çıkarır?`;
      case 'ja':
        return `キリル文字「${character}」はどんな音を表しますか？`;
      case 'ko':
        return `키릴 문자 "${character}"는 어떤 소리를 냅니까?`;
      case 'zh':
        return `西里尔字母“${character}”发什么音？`;
      case 'hi':
        return `सिरिलिक अक्षर «${character}» कौन सी ध्वनि देता है?`;
      case 'ar':
        return `ما الصوت الذي يصدره الحرف السيريلي «${character}»؟`;
      case 'bn':
        return `সিরিলিক অক্ষর «${character}» কোন ধ্বনি নির্দেশ করে?`;
      case 'ur':
        return `سیریلک حرف «${character}» کی آواز کیا ہے؟`;
      case 'en':
      default:
        return `What sound does the Cyrillic letter "${character}" make?`;
    }
  }

  switch (baseLang) {
    case 'ru':
      return `Какое произношение или название у буквы «${character}» на ${targetNameInBase}?`;
    case 'es':
      return `¿Cuál es el nombre o pronunciación de la letra «${character}» en ${targetNameInBase}?`;
    case 'fr':
      return `Quel est le nom ou la prononciation de la lettre « ${character} » en ${targetNameInBase} ?`;
    case 'pt':
      return `Qual é o nome ou pronúncia da letra «${character}» em ${targetNameInBase}?`;
    case 'de':
      return `Wie lautet der Name oder Laut des Buchstabens „${character}“ auf ${targetNameInBase}?`;
    case 'id':
      return `Apa nama atau lafal huruf "${character}" dalam ${targetNameInBase}?`;
    case 'tr':
      return `${targetNameInBase} dilinde "${character}" harfinin okunuşu veya adı nedir?`;
    case 'ja':
      return `${targetNameInBase}の文字「${character}」の発音または名称は何ですか？`;
    case 'ko':
      return `${targetNameInBase} 문자 "${character}"의 발음이나 이름은 무엇입니까?`;
    case 'zh':
      return `${targetNameInBase}字母“${character}”的发音或名称是什么？`;
    case 'hi':
      return `${targetNameInBase} में "${character}" अक्षर का नाम या उच्चारण क्या है?`;
    case 'ar':
      return `ما هو اسم أو نطق الحرف «${character}» في ${targetNameInBase}؟`;
    case 'bn':
      return `${targetNameInBase}-এ «${character}» অক্ষরের উচ্চারণ বা নাম কী?`;
    case 'ur':
      return `${targetNameInBase} میں «${character}» حرف کا تلفظ یا نام کیا ہے؟`;
    case 'en':
    default:
      return `What is the pronunciation or name of the letter "${character}" in ${targetNameInBase}?`;
  }
};

/**
 * Builds localized quiz hint / question string
 */
export const buildQuizQuestionHint = (
  promptWord: string,
  isTargetPrompt: boolean,
  targetLang: SupportedLanguageId,
  baseLang: SupportedLanguageId
): string => {
  const targetNameInBase = LANGUAGE_NAMES_IN_BASE[baseLang]?.[targetLang] || targetLang;

  if (isTargetPrompt) {
    // Target -> Base ("What does X mean?")
    switch (baseLang) {
      case 'es':
        return `¿Qué significa "${promptWord}"?`;
      case 'fr':
        return `Que signifie "${promptWord}" ?`;
      case 'ru':
        return `Что означает "${promptWord}"?`;
      case 'pt':
        return `O que significa "${promptWord}"?`;
      case 'de':
        return `Was bedeutet „${promptWord}“?`;
      case 'id':
        return `Apa arti dari "${promptWord}"?`;
      case 'tr':
        return `"${promptWord}" ne anlama geliyor?`;
      case 'ja':
        return `「${promptWord}」はどういう意味ですか？`;
      case 'ko':
        return `"${promptWord}"은(는) 무슨 뜻입니까?`;
      case 'bn':
        return `"${promptWord}" এর অর্থ কী?`;
      case 'ur':
        return `"${promptWord}" کا کیا مطلب ہے؟`;
      case 'zh':
        return `“${promptWord}”是什么意思？`;
      case 'hi':
        return `"${promptWord}" का क्या अर्थ है?`;
      case 'ar':
        return `ما معنى "${promptWord}"؟`;
      case 'en':
      default:
        return `What does "${promptWord}" mean?`;
    }
  } else {
    // Base -> Target ("How do you say X in Spanish?")
    switch (baseLang) {
      case 'es':
        return `¿Cómo se dice "${promptWord}" en ${targetNameInBase}?`;
      case 'fr':
        return `Comment dit-on "${promptWord}" en ${targetNameInBase} ?`;
      case 'ru':
        return `Как сказать "${promptWord}" на ${targetNameInBase}?`;
      case 'pt':
        return `Como se diz "${promptWord}" em ${targetNameInBase}?`;
      case 'de':
        return `Wie sagt man „${promptWord}“ auf ${targetNameInBase}?`;
      case 'id':
        return `Bagaimana mengatakan "${promptWord}" dalam ${targetNameInBase}?`;
      case 'tr':
        return `${targetNameInBase} dilinde "${promptWord}" nasıl denir?`;
      case 'ja':
        return `「${promptWord}」を${targetNameInBase}でどう言いますか？`;
      case 'ko':
        return `"${promptWord}"을(를) ${targetNameInBase}로 어떻게 말합니까?`;
      case 'bn':
        return `${targetNameInBase}-এ "${promptWord}" কীভাবে বলবেন?`;
      case 'ur':
        return `${targetNameInBase} میں "${promptWord}" کیسے کہتے ہیں؟`;
      case 'zh':
        return `用${targetNameInBase}怎么说“${promptWord}”？`;
      case 'hi':
        return `${targetNameInBase} में "${promptWord}" को क्या कहते हैं?`;
      case 'ar':
        return `كيف تقول "${promptWord}" في ${targetNameInBase}؟`;
      case 'en':
      default:
        return `How do you say "${promptWord}" in ${targetNameInBase}?`;
    }
  }
};
