import { SupportedLanguageId } from '../data/languages/types';
import { PhraseItem } from '../types/index';
import { CONCEPT_MATRIX } from '../data/conceptMatrix';

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
  [key: string]: any;
  allWords: string[];
}

export const NUMBER_TABLE: Record<number, NumberMapping> = {
  0: { digit: 0, en: 'Zero', es: 'Cero', fr: 'Zéro', ru: 'Ноль', pt: 'Zero', de: 'Null', id: 'Nol', tr: 'Sıfır', allWords: ['zero', 'cero', 'zéro', 'ноль', 'нуль', 'null', 'nol', 'sıfır', '0'] },
  1: { digit: 1, en: 'One', es: 'Uno', fr: 'Un', ru: 'Один', pt: 'Um', de: 'Eins', id: 'Satu', tr: 'Bir', allWords: ['one', 'uno', 'una', 'un', 'une', 'один', 'одна', 'одно', 'um', 'uma', 'eins', 'satu', 'bir', '1'] },
  2: { digit: 2, en: 'Two', es: 'Dos', fr: 'Deux', ru: 'Два', pt: 'Dois', de: 'Zwei', id: 'Dua', tr: 'İki', allWords: ['two', 'dos', 'deux', 'два', 'две', 'dois', 'duas', 'zwei', 'dua', 'iki', '2'] },
  3: { digit: 3, en: 'Three', es: 'Tres', fr: 'Trois', ru: 'Три', pt: 'Três', de: 'Drei', id: 'Tiga', tr: 'Üç', allWords: ['three', 'tres', 'três', 'trois', 'три', 'drei', 'tiga', 'üç', '3'] },
  4: { digit: 4, en: 'Four', es: 'Cuatro', fr: 'Quatre', ru: 'Четыре', pt: 'Quatro', de: 'Vier', id: 'Empat', tr: 'Dört', allWords: ['four', 'cuatro', 'quatre', 'четыре', 'quatro', 'vier', 'empat', 'dört', '4'] },
  5: { digit: 5, en: 'Five', es: 'Cinco', fr: 'Cinq', ru: 'Пять', pt: 'Cinco', de: 'Fünf', id: 'Lima', tr: 'Beş', allWords: ['five', 'cinco', 'cinq', 'пять', 'fünf', 'lima', 'beş', '5'] },
  6: { digit: 6, en: 'Six', es: 'Seis', fr: 'Six', ru: 'Шесть', pt: 'Seis', de: 'Sechs', id: 'Enam', tr: 'Altı', allWords: ['six', 'seis', 'шесть', 'sechs', 'enam', 'altı', '6'] },
  7: { digit: 7, en: 'Seven', es: 'Siete', fr: 'Sept', ru: 'Семь', pt: 'Sete', de: 'Sieben', id: 'Tujuh', tr: 'Yedi', allWords: ['seven', 'siete', 'sept', 'семь', 'sete', 'sieben', 'tujuh', 'yedi', '7'] },
  8: { digit: 8, en: 'Eight', es: 'Ocho', fr: 'Huit', ru: 'Восемь', pt: 'Oito', de: 'Acht', id: 'Delapan', tr: 'Sekiz', allWords: ['eight', 'ocho', 'huit', 'восемь', 'oito', 'acht', 'delapan', 'sekiz', '8'] },
  9: { digit: 9, en: 'Nine', es: 'Nueve', fr: 'Neuf', ru: 'Девять', pt: 'Nove', de: 'Neun', id: 'Sembilan', tr: 'Dokuz', allWords: ['nine', 'nueve', 'neuf', 'девять', 'nove', 'neun', 'sembilan', 'dokuz', '9'] },
  10: { digit: 10, en: 'Ten', es: 'Diez', fr: 'Dix', ru: 'Десять', pt: 'Dez', de: 'Zehn', id: 'Sepuluh', tr: 'On', allWords: ['ten', 'diez', 'dix', 'десять', 'dez', 'zehn', 'sepuluh', 'on', '10'] },
  11: { digit: 11, en: 'Eleven', es: 'Once', fr: 'Onze', ru: 'Одиннадцать', pt: 'Onze', de: 'Elf', id: 'Sebelas', tr: 'On bir', allWords: ['eleven', 'once', 'onze', 'одиннадцать', 'elf', 'sebelas', 'on bir', '11'] },
  12: { digit: 12, en: 'Twelve', es: 'Doce', fr: 'Douze', ru: 'Двенадцать', pt: 'Doze', de: 'Zwölf', id: 'Dua belas', tr: 'On iki', allWords: ['twelve', 'doce', 'douze', 'двенадцать', 'doze', 'zwölf', 'dua belas', 'on iki', '12'] },
  13: { digit: 13, en: 'Thirteen', es: 'Trece', fr: 'Treize', ru: 'Тринадцать', pt: 'Treze', de: 'Dreizehn', id: 'Tiga belas', tr: 'On üç', allWords: ['thirteen', 'trece', 'treize', 'тринадцать', 'treze', 'dreizehn', 'tiga belas', 'on üç', '13'] },
  14: { digit: 14, en: 'Fourteen', es: 'Catorce', fr: 'Quatorze', ru: 'Четырнадцать', pt: 'Quatorze', de: 'Vierzehn', id: 'Empat belas', tr: 'On dört', allWords: ['fourteen', 'catorce', 'quatorze', 'четырнадцать', 'vierzehn', 'empat belas', 'on dört', '14'] },
  15: { digit: 15, en: 'Fifteen', es: 'Quince', fr: 'Quinze', ru: 'Пятнадцать', pt: 'Quinze', de: 'Fünfzehn', id: 'Lima belas', tr: 'On beş', allWords: ['fifteen', 'quince', 'quinze', 'пятнадцать', 'fünfzehn', 'lima belas', 'on beş', '15'] },
  16: { digit: 16, en: 'Sixteen', es: 'Dieciséis', fr: 'Seize', ru: 'Шестнадцать', pt: 'Dezesseis', de: 'Sechzehn', id: 'Enam belas', tr: 'On altı', allWords: ['sixteen', 'dieciséis', 'dieciseis', 'seize', 'шестнадцать', 'dezesseis', 'sechzehn', 'enam belas', 'on altı', '16'] },
  17: { digit: 17, en: 'Seventeen', es: 'Diecisiete', fr: 'Dix-sept', ru: 'Семнадцать', pt: 'Dezessete', de: 'Siebzehn', id: 'Tujuh belas', tr: 'On yedi', allWords: ['seventeen', 'diecisiete', 'dix-sept', 'семнадцать', 'dezessete', 'siebzehn', 'tujuh belas', 'on yedi', '17'] },
  18: { digit: 18, en: 'Eighteen', es: 'Dieciocho', fr: 'Dix-huit', ru: 'Восемнадцать', pt: 'Dezoito', de: 'Achtzehn', id: 'Delapan belas', tr: 'On sekiz', allWords: ['eighteen', 'dieciocho', 'dix-huit', 'восемнадцать', 'dezoito', 'achtzehn', 'delapan belas', 'on sekiz', '18'] },
  19: { digit: 19, en: 'Nineteen', es: 'Diecinueve', fr: 'Dix-neuf', ru: 'Девятнадцать', pt: 'Dezenove', de: 'Neunzehn', id: 'Sembilan belas', tr: 'On dokuz', allWords: ['nineteen', 'diecinueve', 'dix-neuf', 'девятнадцать', 'dezenove', 'neunzehn', 'sembilan belas', 'on dokuz', '19'] },
  20: { digit: 20, en: 'Twenty', es: 'Veinte', fr: 'Vingt', ru: 'Двадцать', pt: 'Vinte', de: 'Zwanzig', id: 'Dua puluh', tr: 'Yirmi', allWords: ['twenty', 'veinte', 'vingt', 'двадцать', 'vinte', 'zwanzig', 'dua puluh', 'yirmi', '20'] },
  30: { digit: 30, en: 'Thirty', es: 'Treinta', fr: 'Trente', ru: 'Тридцать', pt: 'Trinta', de: 'Dreißig', id: 'Tiga puluh', tr: 'Otuz', allWords: ['thirty', 'treinta', 'trente', 'тридцать', 'trinta', 'dreißig', 'tiga puluh', 'otuz', '30'] },
  40: { digit: 40, en: 'Forty', es: 'Cuarenta', fr: 'Quarante', ru: 'Сорок', pt: 'Quarenta', de: 'Vierzig', id: 'Empat puluh', tr: 'Kırk', allWords: ['forty', 'cuarenta', 'quarante', 'сорок', 'quarenta', 'vierzig', 'empat puluh', 'kırk', '40'] },
  50: { digit: 50, en: 'Fifty', es: 'Cincuenta', fr: 'Cinquante', ru: 'Пятьдесят', pt: 'Cinquenta', de: 'Fünfzig', id: 'Lima puluh', tr: 'Elli', allWords: ['fifty', 'cincuenta', 'cinquante', 'пятьдесят', 'cinquenta', 'fünfzig', 'lima puluh', 'elli', '50'] },
  60: { digit: 60, en: 'Sixty', es: 'Sesenta', fr: 'Soixante', ru: 'Шестьдесят', pt: 'Sessenta', de: 'Sechzig', id: 'Enam puluh', tr: 'Altmış', allWords: ['sixty', 'sesenta', 'soixante', 'шестьдесят', 'sessenta', 'sechzig', 'enam puluh', 'altmış', '60'] },
  70: { digit: 70, en: 'Seventy', es: 'Setenta', fr: 'Soixante-dix', ru: 'Семьдесят', pt: 'Setenta', de: 'Siebzig', id: 'Tujuh puluh', tr: 'Yetmiş', allWords: ['seventy', 'setenta', 'soixante-dix', 'семьдесят', 'siebzig', 'tujuh puluh', 'yetmiş', '70'] },
  80: { digit: 80, en: 'Eighty', es: 'Ochenta', fr: 'Quatre-vingts', ru: 'Восемьдесят', pt: 'Oitenta', de: 'Achtzig', id: 'Delapan puluh', tr: 'Seksen', allWords: ['eighty', 'ochenta', 'quatre-vingts', 'quatre-vingt', 'восемьдесят', 'oitenta', 'achtzig', 'delapan puluh', 'seksen', '80'] },
  90: { digit: 90, en: 'Ninety', es: 'Noventa', fr: 'Quatre-vingt-dix', ru: 'Девяносто', pt: 'Noventa', de: 'Neunzig', id: 'Sembilan puluh', tr: 'Doksan', allWords: ['ninety', 'noventa', 'quatre-vingt-dix', 'девяносто', 'neunzig', 'sembilan puluh', 'doksan', '90'] },
  100: { digit: 100, en: 'One hundred', es: 'Cien', fr: 'Cent', ru: 'Сто', pt: 'Cem', de: 'Hundert', id: 'Seratus', tr: 'Yüz', allWords: ['hundred', 'one hundred', 'a hundred', 'cien', 'ciento', 'cent', 'сто', 'cem', 'hundert', 'einhundert', 'seratus', 'yüz', '100'] },
  1000: { digit: 1000, en: 'One thousand', es: 'Mil', fr: 'Mille', ru: 'Тысяча', pt: 'Mil', de: 'Tausend', id: 'Seribu', tr: 'Bin', allWords: ['thousand', 'one thousand', 'a thousand', 'mil', 'mille', 'тысяча', 'tausend', 'eintausend', 'seribu', 'bin', '1000'] }

  
};

export const EXTENDED_DICTIONARY: Record<string, Partial<Record<SupportedLanguageId, string>>> = {
  // People & Family
  'man': { en: 'Man', es: 'Hombre', fr: 'Homme', ru: 'Мужчина', pt: 'Homem', de: 'Mann', id: 'Pria', tr: 'Erkek', ko: '남자', ja: '男性 / 男の人' },
  'woman': { en: 'Woman', es: 'Mujer', fr: 'Femme', ru: 'Женщина', pt: 'Mulher', de: 'Frau', id: 'Wanita', tr: 'Kadın', ko: '여자', ja: '女性 / 女の人' },
  'child': { en: 'Child', es: 'Niño / Niña', fr: 'Enfant', ru: 'Ребёнок', pt: 'Criança', de: 'Kind', id: 'Anak', tr: 'Çocuk', ko: '아이 / 어린이', ja: '子供' },
  'boy': { en: 'Boy', es: 'Niño / Chico', fr: 'Garçon', ru: 'Мальчик', pt: 'Menino', de: 'Junge', id: 'Anak laki-laki', tr: 'Erkek çocuk', ko: '소년 / 남자아이', ja: '男の子' },
  'girl': { en: 'Girl', es: 'Niña / Chica', fr: 'Fille', ru: 'Девочка', pt: 'Menina', de: 'Mädchen', id: 'Anak perempuan', tr: 'Kız çocuk', ko: '소녀 / 여자아이', ja: '女の子' },
  'friend': { en: 'Friend', es: 'Amigo', fr: 'Ami', ru: 'Друг', pt: 'Amigo', de: 'Freund', id: 'Teman', tr: 'Arkadaş', ko: '친구', ja: '友達' },
  'family': { en: 'Family', es: 'Familia', fr: 'Famille', ru: 'Семья', pt: 'Família', de: 'Familie', id: 'Keluarga', tr: 'Aile', ko: '가족', ja: '家族' },
  'father': { en: 'Father', es: 'Padre', fr: 'Père', ru: 'Отец', pt: 'Pai', de: 'Vater', id: 'Ayah', tr: 'Baba', ko: '아버지', ja: 'お父さん' },
  'father / dad': { en: 'Father / Dad', es: 'Padre / Papá', fr: 'Père / Papa', ru: 'Папа / Отец', pt: 'Pai', de: 'Vater / Papa', id: 'Ayah', tr: 'Baba', ko: '아버지', ja: 'お父さん' },
  'mother': { en: 'Mother', es: 'Madre', fr: 'Mère', ru: 'Мать', pt: 'Mãe', de: 'Mutter', id: 'Ibu', tr: 'Anne', ko: '어머니', ja: 'お母さん' },
  'mother / mom': { en: 'Mother / Mom', es: 'Madre / Mamá', fr: 'Mère / Maman', ru: 'Мама / Мать', pt: 'Mãe', de: 'Mutter / Mama', id: 'Ibu', tr: 'Anne', ko: '어머니', ja: 'お母さん' },
  'mom': { en: 'Mom', es: 'Mamá', fr: 'Maman', ru: 'Мама', pt: 'Mãe', de: 'Mama', id: 'Ibu', tr: 'Anne', ko: '엄마', ja: 'お母さん / ママ' },
  'husband': { en: 'Husband', es: 'Esposo / Marido', fr: 'Mari', ru: 'Муж', pt: 'Marido', de: 'Ehemann', id: 'Suami', tr: 'Eş / Koca', ko: '남편', ja: '夫 / 主人' },
  'wife': { en: 'Wife', es: 'Esposa / Mujer', fr: 'Femme / Épouse', ru: 'Жена', pt: 'Esposa', de: 'Ehefrau', id: 'Istri', tr: 'Eş / Karı', ko: '아내', ja: '妻 / 家内' },
  'teacher': { en: 'Teacher', es: 'Profesor / Maestro', fr: 'Enseignant', ru: 'Учитель', pt: 'Professor', de: 'Lehrer', id: 'Guru', tr: 'Öğretmen', ko: '선생님', ja: '先生' },
  'student': { en: 'Student', es: 'Estudiante / Alumno', fr: 'Étudiant', ru: 'Студент', pt: 'Estudante', de: 'Student', id: 'Pelajar', tr: 'Öğrenci', ko: '학생', ja: '学生' },
  'doctor': { en: 'Doctor', es: 'Médico / Doctor', fr: 'Médecin / Docteur', ru: 'Врач / Доктор', pt: 'Médico', de: 'Arzt', id: 'Dokter', tr: 'Doktor', ko: '의사', ja: '医者' },
  'we': { en: 'We', es: 'Nosotros', fr: 'Nous', ru: 'Мы', pt: 'Nós', de: 'Wir', id: 'Kami', tr: 'Biz', ko: '우리', ja: '私たち' },

  // Food & Drink
  'water': { en: 'Water', es: 'Agua', fr: 'Eau', ru: 'Вода', pt: 'Água', de: 'Wasser', id: 'Air', tr: 'Su', ko: '물', ja: '水' },
  'bread': { en: 'Bread', es: 'Pan', fr: 'Pain', ru: 'Хлеб', pt: 'Pão', de: 'Brot', id: 'Roti', tr: 'Ekmek', ko: '빵', ja: 'パン' },
  'food': { en: 'Food / Meal', es: 'Comida', fr: 'Nourriture', ru: 'Еда', pt: 'Comida', de: 'Essen', id: 'Makanan', tr: 'Yemek', ko: '음식', ja: '食べ物' },
  'milk': { en: 'Milk', es: 'Leche', fr: 'Lait', ru: 'Молоко', pt: 'Leite', de: 'Milch', id: 'Susu', tr: 'Süt', ko: '우유', ja: '牛乳' },
  'meat': { en: 'Meat', es: 'Carne', fr: 'Viande', ru: 'Мясо', pt: 'Carne', de: 'Fleisch', id: 'Daging', tr: 'Et', ko: '고기', ja: '肉' },
  'fish': { en: 'Fish', es: 'Pescado', fr: 'Poisson', ru: 'Рыба', pt: 'Peixe', de: 'Fisch', id: 'Ikan', tr: 'Balık', ko: '생선', ja: '魚' },
  'vegetables': { en: 'Vegetables', es: 'Verduras', fr: 'Légumes', ru: 'Овощи', pt: 'Legumes', de: 'Gemüse', id: 'Sayuran', tr: 'Sebzeler', ko: '채소들', ja: '野菜' },
  'fruits': { en: 'Fruits', es: 'Frutas', fr: 'Fruits', ru: 'Фрукты', pt: 'Frutas', de: 'Obst', id: 'Buah-buahan', tr: 'Meyveler', ko: '과일들', ja: '果物' },
  'fruit': { en: 'Fruit', es: 'Fruta', fr: 'Fruit', ru: 'Фрукт / Фрукты', pt: 'Fruta', de: 'Frucht', id: 'Buah', tr: 'Meyve', ko: '과일', ja: '果物' },
  'banana': { en: 'Banana', es: 'Plátano / Banana', fr: 'Banane', ru: 'Банан', pt: 'Banana', de: 'Banane', id: 'Pisang', tr: 'Muz', ko: '바나나', ja: 'バナナ' },
  'rice': { en: 'Rice', es: 'Arroz', fr: 'Riz', ru: 'Рис', pt: 'Arroz', de: 'Reis', id: 'Nasi', tr: 'Pirinç', ko: '쌀 / 밥', ja: '米 / ご飯' },
  'rice cake': { en: 'Rice cake', es: 'Pastel de arroz', fr: 'Gâteau de riz', ru: 'Рисовый пирожок', pt: 'Bolo de arroz', de: 'Reiskuchen', id: 'Kue beras', tr: 'Pirinç keki', ko: '떡', ja: '餅 / お餅' },
  'bridge': { en: 'Bridge', es: 'Puente', fr: 'Pont', ru: 'Мост', pt: 'Ponte', de: 'Brücke', id: 'Jembatan', tr: 'Köprü', ko: '다리', ja: '橋' },
  'stew': { en: 'Stew', es: 'Guiso', fr: 'Ragoût', ru: 'Рагу', pt: 'Ensopado', de: 'Eintopf', id: 'Sup kental', tr: 'Güveç', ko: '찌개', ja: 'シチュー' },
  'radio': { en: 'Radio', es: 'Radio', fr: 'Radio', ru: 'Радио', pt: 'Rádio', de: 'Radio', id: 'Radio', tr: 'Radyo', ko: '라디오', ja: 'ラジオ' },
  'desk': { en: 'Desk', es: 'Escritorio', fr: 'Bureau', ru: 'Письменный стол', pt: 'Escrivaninha', de: 'Schreibtisch', id: 'Meja tulis', tr: 'Çalışma masası', ko: '책상', ja: '机' },
  'music': { en: 'Music', es: 'Música', fr: 'Musique', ru: 'Музыка', pt: 'Música', de: 'Musik', id: 'Musik', tr: 'Müzik', ko: '음악', ja: '音楽' },
  'coffee': { en: 'Coffee', es: 'Café', fr: 'Café', ru: 'Кофе', pt: 'Café', de: 'Kaffee', id: 'Kopi', tr: 'Kahve', ko: '커피', ja: 'コーヒー' },
  'tea': { en: 'Tea', es: 'Té', fr: 'Thé', ru: 'Чай', pt: 'Chá', de: 'Tee', id: 'Teh', tr: 'Çay', ko: '차', ja: 'お茶' },
  'beer': { en: 'Beer', es: 'Cerveza', fr: 'Bière', ru: 'Пиво', pt: 'Cerveja', de: 'Bier', id: 'Bir', tr: 'Bira', ko: '맥주', ja: 'ビール' },
  'wine': { en: 'Wine', es: 'Vino', fr: 'Vin', ru: 'Вино', pt: 'Vinho', de: 'Wein', id: 'Anggur', tr: 'Şarap', ko: '와인 / 포도주', ja: 'ワイン' },
  'breakfast': { en: 'Breakfast', es: 'Desayuno', fr: 'Petit-déjeuner', ru: 'Завтрак', pt: 'Café da manhã', de: 'Frühstück', id: 'Sarapan', tr: 'Kahvaltı', ko: '아침 식사', ja: '朝食' },
  'lunch': { en: 'Lunch', es: 'Almuerzo', fr: 'Déjeuner', ru: 'Обед', pt: 'Almoço', de: 'Mittagessen', id: 'Makan siang', tr: 'Öğle yemeği', ko: '점심 식사', ja: '昼食' },
  'dinner': { en: 'Dinner', es: 'Cena', fr: 'Dîner', ru: 'Ужин', pt: 'Jantar', de: 'Abendessen', id: 'Makan malam', tr: 'Akşam yemeği', ko: '저녁 식사', ja: '夕食' },
  'salt': { en: 'Salt', es: 'Sal', fr: 'Sel', ru: 'Соль', pt: 'Sal', de: 'Salz', id: 'Garam', tr: 'Tuz', ko: '소금', ja: '塩' },

  // Places & Travel
  'store': { en: 'Store / Shop', es: 'Tienda', fr: 'Magasin', ru: 'Магазин', pt: 'Loja', de: 'Geschäft', id: 'Toko', tr: 'Mağaza', ko: '가게 / 상점', ja: '店' },
  'shop': { en: 'Store / Shop', es: 'Tienda', fr: 'Magasin', ru: 'Магазин', pt: 'Loja', de: 'Geschäft', id: 'Toko', tr: 'Mağaza', ko: '가게 / 상점', ja: '店' },
  'shop / store': { en: 'Store / Shop', es: 'Tienda', fr: 'Magasin', ru: 'Магазин', pt: 'Loja', de: 'Geschäft', id: 'Toko', tr: 'Mağaza', ko: '가게 / 상점', ja: '店' },
  'restaurant': { en: 'Restaurant', es: 'Restaurante', fr: 'Restaurant', ru: 'Ресторан', pt: 'Restaurante', de: 'Restaurant', id: 'Restoran', tr: 'Restoran', ko: '식당 / 레스토랑', ja: 'レストラン' },
  'hotel': { en: 'Hotel', es: 'Hotel', fr: 'Hôtel', ru: 'Гостиница / Отель', pt: 'Hotel', de: 'Hotel', id: 'Hotel', tr: 'Otel', ko: '호텔', ja: 'ホテル' },
  'station': { en: 'Station', es: 'Estación', fr: 'Gare / Station', ru: 'Станция / Вокзал', pt: 'Estação', de: 'Bahnhof', id: 'Stasiun', tr: 'İstasyon', ko: '역', ja: '駅' },
  'airport': { en: 'Airport', es: 'Aeropuerto', fr: 'Aéroport', ru: 'Аэропорт', pt: 'Aeroporto', de: 'Flughafen', id: 'Bandara', tr: 'Havalimanı', ko: '공항', ja: '空港' },
  'street': { en: 'Street', es: 'Calle', fr: 'Rue', ru: 'Улица', pt: 'Rua', de: 'Straße', id: 'Jalan', tr: 'Sokak', ko: '거리 / 길', ja: '通り / 道' },
  'square': { en: 'Square (plaza)', es: 'Plaza', fr: 'Place', ru: 'Площадь', pt: 'Praça', de: 'Platz', id: 'Alun-alun', tr: 'Meydan', ko: '광장', ja: '広場' },
  'square (plaza)': { en: 'Square (plaza)', es: 'Plaza', fr: 'Place', ru: 'Площадь', pt: 'Praça', de: 'Platz', id: 'Alun-alun', tr: 'Meydan' },
  'park': { en: 'Park', es: 'Parque', fr: 'Parc', ru: 'Парк', pt: 'Parque', de: 'Park', id: 'Taman', tr: 'Park', ko: '공원', ja: '公園' },
  'hospital': { en: 'Hospital', es: 'Hospital', fr: 'Hôpital', ru: 'Больница', pt: 'Hospital', de: 'Krankenhaus', id: 'Rumah sakit', tr: 'Hastane', ko: '병원', ja: '病院' },
  'pharmacy': { en: 'Pharmacy', es: 'Farmacia', fr: 'Pharmacie', ru: 'Аптека', pt: 'Farmácia', de: 'Apotheke', id: 'Apotek', tr: 'Eczane', ko: '약국', ja: '薬局' },
  'bank': { en: 'Bank', es: 'Banco', fr: 'Banque', ru: 'Банк', pt: 'Banco', de: 'Bank', id: 'Bank', tr: 'Banka', ko: '은행', ja: '銀行' },
  'post office': { en: 'Post office', es: 'Oficina de correos', fr: 'Bureau de poste', ru: 'Почта', pt: 'Correios', de: 'Postamt', id: 'Kantor pos', tr: 'Postane', ko: '우체국', ja: '郵便局' },
  'supermarket': { en: 'Supermarket', es: 'Supermercado', fr: 'Supermarché', ru: 'Супермаркет', pt: 'Supermercado', de: 'Supermarkt', id: 'Supermarket', tr: 'Süpermarket', ko: '슈퍼마켓 / 마트', ja: 'スーパー' },
  'police': { en: 'Police', es: 'Policía', fr: 'Police', ru: 'Полиция', pt: 'Polícia', de: 'Polizei', id: 'Polisi', tr: 'Polis', ko: '경찰', ja: '警察' },
  'museum': { en: 'Museum', es: 'Museo', fr: 'Musée', ru: 'Музей', pt: 'Museu', de: 'Museum', id: 'Museum', tr: 'Müze', ko: '박물관', ja: '博物館' },
  'theater': { en: 'Theater', es: 'Teatro', fr: 'Théâtre', ru: 'Театр', pt: 'Teatro', de: 'Theater', id: 'Teater', tr: 'Tiyatro', ko: '극장', ja: '劇場' },
  'cinema': { en: 'Cinema', es: 'Cine', fr: 'Cinéma', ru: 'Кино / Кинотеатр', pt: 'Cinema', de: 'Kino', id: 'Bioskop', tr: 'Sinema', ko: '영화관', ja: '映画館' },
  'city': { en: 'City', es: 'Ciudad', fr: 'Ville', ru: 'Город', pt: 'Cidade', de: 'Stadt', id: 'Kota', tr: 'Şehir', ko: '도시', ja: '都市 / 町' },
  'country': { en: 'Country', es: 'País', fr: 'Pays', ru: 'Страна', pt: 'País', de: 'Land', id: 'Negara', tr: 'Ülke', ko: '나라 / 국가', ja: '国' },
  'house': { en: 'House / Home', es: 'Casa', fr: 'Maison', ru: 'Дом', pt: 'Casa', de: 'Haus', id: 'Rumah', tr: 'Ev', ko: '집', ja: '家' },
  'home': { en: 'Home / House', es: 'Casa', fr: 'Maison', ru: 'Дом', pt: 'Casa', de: 'Haus', id: 'Rumah', tr: 'Ev', ko: '집 / 가정', ja: '我が家' },
  'car': { en: 'Car', es: 'Carro / Coche', fr: 'Voiture', ru: 'Машина', pt: 'Carro', de: 'Auto', id: 'Mobil', tr: 'Araba', ko: '자동차 / 차', ja: '車 / 自動車' },
  'train': { en: 'Train', es: 'Tren', fr: 'Train', ru: 'Поезд', pt: 'Trem', de: 'Zug', id: 'Kereta', tr: 'Tren', ko: '기차 / 열차', ja: '電車 / 列車' },
  'bus': { en: 'Bus', es: 'Autobús', fr: 'Bus', ru: 'Автобус', pt: 'Ônibus', de: 'Bus', id: 'Bus', tr: 'Otobüs', ko: '버스', ja: 'バス' },
  'airplane': { en: 'Airplane', es: 'Avión', fr: 'Avion', ru: 'Самолёт', pt: 'Avião', de: 'Flugzeug', id: 'Pesawat', tr: 'Uçak', ko: '비행기', ja: '飛行機' },
  'taxi': { en: 'Taxi', es: 'Taxi', fr: 'Taxi', ru: 'Такси', pt: 'Táxi', de: 'Taxi', id: 'Taksi', tr: 'Taksi', ko: '택시', ja: 'タクシー' },
  'subway / metro': { en: 'Subway / Metro', es: 'Metro', fr: 'Métro', ru: 'Метро', pt: 'Metrô', de: 'U-Bahn', id: 'Metro', tr: 'Metro', ko: '지하철', ja: '地下鉄' },
  'subway': { en: 'Subway', es: 'Metro', fr: 'Métro', ru: 'Метро', pt: 'Metrô', de: 'U-Bahn', id: 'Metro', tr: 'Metro', ko: '지하철', ja: '地下鉄' },
  'map': { en: 'Map', es: 'Mapa', fr: 'Carte / Plan', ru: 'Карта', pt: 'Mapa', de: 'Karte', id: 'Peta', tr: 'Harita', ko: '지도', ja: '地図' },
  'visa': { en: 'Visa', es: 'Visa / Visado', fr: 'Visa', ru: 'Виза', pt: 'Visto', de: 'Visum', id: 'Visa', tr: 'Vize', ko: '비자', ja: 'ビザ / 査証' },
  'center': { en: 'Center', es: 'Centro', fr: 'Centre', ru: 'Центр', pt: 'Centro', de: 'Zentrum', id: 'Pusat', tr: 'Merkez', ko: '중심 / 센터', ja: '中心 / センター' },
  'factory': { en: 'Factory', es: 'Fábrica', fr: 'Usine', ru: 'Завод', pt: 'Fábrica', de: 'Fabrik', id: 'Pabrik', tr: 'Fabrika', ko: '공장', ja: '工場' },
  'sea': { en: 'Sea', es: 'Mar', fr: 'Mer', ru: 'Море', pt: 'Mar', de: 'Meer', id: 'Laut', tr: 'Deniz', ko: '바다', ja: '海' },

  // Everyday Essentials & Objects
  'money': { en: 'Money', es: 'Dinero', fr: 'Argent', ru: 'Деньги', pt: 'Dinheiro', de: 'Geld', id: 'Uang', tr: 'Para', ko: '돈', ja: 'お金' },
  'ticket': { en: 'Ticket', es: 'Boleto / Billete', fr: 'Billet', ru: 'Билет', pt: 'Passagem', de: 'Ticket', id: 'Tiket', tr: 'Bilet', ko: '표 / 티켓', ja: '切符 / チケット' },
  'passport': { en: 'Passport', es: 'Pasaporte', fr: 'Passeport', ru: 'Паспорт', pt: 'Passaporte', de: 'Reisepass', id: 'Paspor', tr: 'Pasaport', ko: '여권', ja: 'パスポート' },
  'phone': { en: 'Phone', es: 'Teléfono', fr: 'Téléphone', ru: 'Телефон', pt: 'Telefone', de: 'Telefon', id: 'Telepon', tr: 'Telefon', ko: '전화기 / 스마트폰', ja: '電話 / スマホ' },
  'telephone': { en: 'Telephone', es: 'Teléfono', fr: 'Téléphone', ru: 'Телефон', pt: 'Telefone', de: 'Telefon', id: 'Telepon', tr: 'Telefon', ko: '전화기', ja: '電話' },
  'computer': { en: 'Computer', es: 'Computadora', fr: 'Ordinateur', ru: 'Компьютер', pt: 'Computador', de: 'Computer', id: 'Komputer', tr: 'Bilgisayar', ko: '컴퓨터', ja: 'コンピューター' },
  'book': { en: 'Book', es: 'Libro', fr: 'Livre', ru: 'Книга', pt: 'Livro', de: 'Buch', id: 'Buku', tr: 'Kitap', ko: '책', ja: '本' },
  'magazine': { en: 'Magazine', es: 'Revista', fr: 'Magazine', ru: 'Журнал', pt: 'Revista', de: 'Zeitschrift', id: 'Majalah', tr: 'Dergi', ko: '잡지', ja: '雑誌' },
  'help': { en: 'Help', es: 'Ayuda', fr: 'Aide', ru: 'Помощь', pt: 'Ajuda', de: 'Hilfe', id: 'Bantuan', tr: 'Yardım', ko: '도움', ja: '助け' },
  'time': { en: 'Time', es: 'Tiempo / Hora', fr: 'Temps / Heure', ru: 'Время', pt: 'Tempo', de: 'Zeit', id: 'Waktu', tr: 'Zaman', ko: '시간', ja: '時間' },
  'work': { en: 'Work / Job', es: 'Trabajo', fr: 'Travail', ru: 'Работа', pt: 'Trabalho', de: 'Arbeit', id: 'Pekerjaan', tr: 'İş', ko: '일 / 작업', ja: '仕事' },
  'office': { en: 'Office', es: 'Oficina', fr: 'Bureau', ru: 'Офис', pt: 'Escritório', de: 'Büro', id: 'Kantor', tr: 'Ofis', ko: '사무실', ja: '事務所 / オフィス' },
  'card': { en: 'Card', es: 'Tarjeta', fr: 'Carte', ru: 'Карта / Карточка', pt: 'Cartão', de: 'Karte', id: 'Kartu', tr: 'Kart', ko: '카드', ja: 'カード' },
  'table': { en: 'Table', es: 'Mesa', fr: 'Table', ru: 'Стол', pt: 'Mesa', de: 'Tisch', id: 'Meja', tr: 'Masa', ko: '탁자 / 테이블', ja: 'テーブル / 机' },
  'chair': { en: 'Chair', es: 'Silla', fr: 'Chaise', ru: 'Стул', pt: 'Cadeira', de: 'Stuhl', id: 'Kursi', tr: 'Sandalye', ko: '의자', ja: '椅子' },
  'door': { en: 'Door', es: 'Puerta', fr: 'Porte', ru: 'Дверь', pt: 'Porta', de: 'Tür', id: 'Pintu', tr: 'Kapı', ko: '문', ja: 'ドア / 扉' },
  'bag': { en: 'Bag', es: 'Bolsa / Maleta', fr: 'Sac', ru: 'Сумка', pt: 'Bolsa', de: 'Tasche', id: 'Tas', tr: 'Çanta', ko: '가방', ja: 'バッグ / 鞄' },
  'clothes': { en: 'Clothes', es: 'Ropa', fr: 'Vêtements', ru: 'Одежда', pt: 'Roupas', de: 'Kleidung', id: 'Pakaian', tr: 'Giysi', ko: '옷', ja: '服' },
  'shoes': { en: 'Shoes', es: 'Zapatos', fr: 'Chaussures', ru: 'Обувь / Туфли', pt: 'Sapatos', de: 'Schuhe', id: 'Sepatu', tr: 'Ayakkabı', ko: '신발', ja: '靴' },
  'object': { en: 'Object', es: 'Objeto', fr: 'Objet', ru: 'Объект / Предмет', pt: 'Objeto', de: 'Objekt', id: 'Benda', tr: 'Nesne', ko: '물건 / 객체', ja: '物' },

  // Question Words
  'who': { en: 'Who', es: 'Quién', fr: 'Qui', ru: 'Кто', pt: 'Quem', de: 'Wer', id: 'Siapa', tr: 'Kim', ko: '누구', ja: '誰' },
  'what': { en: 'What', es: 'Qué', fr: 'Quoi / Que', ru: 'Что', pt: 'O que', de: 'Was', id: 'Apa', tr: 'Ne', ko: '무엇', ja: '何' },
  'what?': { en: 'What?', es: '¿Qué?', fr: 'Quoi ?', ru: 'Что?', pt: 'O quê?', de: 'Was?', id: 'Apa?', tr: 'Ne?', ko: '무엇?', ja: '何？' },
  'where': { en: 'Where', es: 'Dónde', fr: 'Où', ru: 'Где', pt: 'Onde', de: 'Wo', id: 'Di mana', tr: 'Nerede', ko: '어디', ja: 'どこ' },
  'where?': { en: 'Where?', es: '¿Dónde?', fr: 'Où ?', ru: 'Где?', pt: 'Onde?', de: 'Wo?', id: 'Di mana?', tr: 'Nerede?', ko: '어디?', ja: 'どこ？' },
  'when': { en: 'When', es: 'Cuándo', fr: 'Quand', ru: 'Когда', pt: 'Quando', de: 'Wann', id: 'Kapan', tr: 'Ne zaman', ko: '언제', ja: 'いつ' },
  'when?': { en: 'When?', es: '¿Cuándo?', fr: 'Quand ?', ru: 'Когда?', pt: 'Quando?', de: 'Wann?', id: 'Kapan?', tr: 'Ne zaman?', ko: '언제?', ja: 'いつ？' },
  'who?': { en: 'Who?', es: '¿Quién?', fr: 'Qui ?', ru: 'Кто?', pt: 'Quem?', de: 'Wer?', id: 'Siapa?', tr: 'Kim?', ko: '누구?', ja: '誰？' },
  'why': { en: 'Why', es: 'Por qué', fr: 'Pourquoi', ru: 'Почему', pt: 'Por que', de: 'Warum', id: 'Mengapa', tr: 'Neden', ko: '왜', ja: 'なぜ' },
  'why?': { en: 'Why?', es: '¿Por qué?', fr: 'Pourquoi ?', ru: 'Почему?', pt: 'Por quê?', de: 'Warum?', id: 'Mengapa?', tr: 'Neden?', ko: '왜?', ja: 'なぜ？' },
  'how': { en: 'How', es: 'Cómo', fr: 'Comment', ru: 'Как', pt: 'Como', de: 'Wie', id: 'Bagaimana', tr: 'Nasıl', ko: '어떻게', ja: 'どうやって' },
  'how?': { en: 'How?', es: '¿Cómo?', fr: 'Comment ?', ru: 'Как?', pt: 'Como?', de: 'Wie?', id: 'Bagaimana?', tr: 'Nasıl?', ko: '어떻게?', ja: 'どうやって？' },
  'how much / how many': { en: 'How much / How many', es: 'Cuánto / Cuántos', fr: 'Combien', ru: 'Сколько', pt: 'Quanto', de: 'Wie viel', id: 'Berapa', tr: 'Ne kadar', ko: '얼마', ja: 'いくら' },
  'how much': { en: 'How much', es: 'Cuánto', fr: 'Combien', ru: 'Сколько', pt: 'Quanto', de: 'Wie viel', id: 'Berapa', tr: 'Ne kadar', ko: '얼마', ja: 'いくら' },

  // Days of the Week & Calendar
  'monday': { en: 'Monday', es: 'Lunes', fr: 'Lundi', ru: 'Понедельник', pt: 'Segunda-feira', de: 'Montag', id: 'Senin', tr: 'Pazartesi', ko: '월요일', ja: '月曜日' },
  'tuesday': { en: 'Tuesday', es: 'Martes', fr: 'Mardi', ru: 'Вторник', pt: 'Terça-feira', de: 'Dienstag', id: 'Selasa', tr: 'Salı', ko: '화요일', ja: '火曜日' },
  'wednesday': { en: 'Wednesday', es: 'Miércoles', fr: 'Mercredi', ru: 'Среда', pt: 'Quarta-feira', de: 'Mittwoch', id: 'Rabu', tr: 'Çarşamba', ko: '수요일', ja: '水曜日' },
  'thursday': { en: 'Thursday', es: 'Jueves', fr: 'Jeudi', ru: 'Четверг', pt: 'Quinta-feira', de: 'Donnerstag', id: 'Kamis', tr: 'Perşembe', ko: '목요일', ja: '木曜日' },
  'friday': { en: 'Friday', es: 'Viernes', fr: 'Vendredi', ru: 'Пятница', pt: 'Sexta-feira', de: 'Freitag', id: 'Jumat', tr: 'Cuma', ko: '금요일', ja: '金曜日' },
  'saturday': { en: 'Saturday', es: 'Sábado', fr: 'Samedi', ru: 'Суббота', pt: 'Sábado', de: 'Samstag', id: 'Sabtu', tr: 'Cumartesi', ko: '토요일', ja: '土曜日' },
  'sunday': { en: 'Sunday', es: 'Domingo', fr: 'Dimanche', ru: 'Воскресенье', pt: 'Domingo', de: 'Sonntag', id: 'Minggu', tr: 'Pazar', ko: '일요일', ja: '日曜日' },
  'week': { en: 'Week', es: 'Semana', fr: 'Semaine', ru: 'Неделя', pt: 'Semana', de: 'Woche', id: 'Minggu', tr: 'Hafta', ko: '주 / 일주일', ja: '週' },
  'month': { en: 'Month', es: 'Mes', fr: 'Mois', ru: 'Месяц', pt: 'Mês', de: 'Monat', id: 'Bulan', tr: 'Ay', ko: '달 / 월', ja: '月' },
  'year': { en: 'Year', es: 'Año', fr: 'An / Année', ru: 'Год', pt: 'Ano', de: 'Jahr', id: 'Tahun', tr: 'Yıl', ko: '년 / 해', ja: '年' },

  // Animals, Weather & Nature
  'dog': { en: 'Dog', es: 'Perro', fr: 'Chien', ru: 'Собака', pt: 'Cachorro', de: 'Hund', id: 'Anjing', tr: 'Köpek', ko: '개 / 강아지', ja: '犬' },
  'cat': { en: 'Cat', es: 'Gato', fr: 'Chat', ru: 'Кот / Кошка', pt: 'Gato', de: 'Katze', id: 'Kucing', tr: 'Kedi', ko: '고양이', ja: '猫' },
  'bird': { en: 'Bird', es: 'Pájaro / Ave', fr: 'Oiseau', ru: 'Птица', pt: 'Pássaro', de: 'Vogel', id: 'Burung', tr: 'Kuş', ko: '새', ja: '鳥' },
  'sun': { en: 'Sun', es: 'Sol', fr: 'Soleil', ru: 'Солнце', pt: 'Sol', de: 'Sonne', id: 'Matahari', tr: 'Güneş', ko: '태양 / 해', ja: '太陽 / 日' },
  'moon': { en: 'Moon', es: 'Luna', fr: 'Lune', ru: 'Луна', pt: 'Lua', de: 'Mond', id: 'Bulan', tr: 'Ay', ko: '달', ja: '月' },
  'star': { en: 'Star', es: 'Estrella', fr: 'Étoile', ru: 'Звезда', pt: 'Estrela', de: 'Stern', id: 'Bintang', tr: 'Yıldız', ko: '별', ja: '星' },
  'rain': { en: 'Rain', es: 'Lluvia', fr: 'Pluie', ru: 'Дождь', pt: 'Chuva', de: 'Regen', id: 'Hujan', tr: 'Yağmur', ko: '비', ja: '雨' },
  'snow': { en: 'Snow', es: 'Nieve', fr: 'Neige', ru: 'Снег', pt: 'Neve', de: 'Schnee', id: 'Salju', tr: 'Kar', ko: '눈', ja: '雪' },
  'cold': { en: 'Cold', es: 'Frío', fr: 'Froid', ru: 'Холодно / Холодный', pt: 'Frio', de: 'Kalt', id: 'Dingin', tr: 'Soğuk', ko: '차가운 / 추운', ja: '冷たい / 寒い' },
  'hot': { en: 'Hot', es: 'Caliente / Calor', fr: 'Chaud', ru: 'Жарко / Горячий', pt: 'Quente', de: 'Heiß', id: 'Panas', tr: 'Sıcak', ko: '뜨거운 / 더운', ja: '熱い / 暑い' },
  'hedgehog': { en: 'Hedgehog', es: 'Erizo', fr: 'Hérisson', ru: 'Ёж', pt: 'Ouriço', de: 'Igel', id: 'Landak', tr: 'Kirpi', ko: '고슴도치', ja: 'ハリネズミ' },
  'beetle': { en: 'Beetle / Bug', es: 'Escarabajo', fr: 'Scarabée', ru: 'Жук', pt: 'Besouro', de: 'Käfer', id: 'Kumbang', tr: 'Böcek', ko: '딱정벌레', ja: '甲虫 / カブトムシ' },
  'flower': { en: 'Flower', es: 'Flor', fr: 'Fleur', ru: 'Цветок', pt: 'Flor', de: 'Blume', id: 'Bunga', tr: 'Çiçek', ko: '꽃', ja: '花' },
  'tree': { en: 'Tree', es: 'Árbol', fr: 'Arbre', ru: 'Дерево', pt: 'Árvore', de: 'Baum', id: 'Pohon', tr: 'Ağaç', ko: '나무', ja: '木' },
  'christmas tree': { en: 'Christmas tree', es: 'Árbol de Navidad', fr: 'Sapin de Noël', ru: 'Ёлка', pt: 'Árvore de Natal', de: 'Weihnachtsbaum', id: 'Pohon Natal', tr: 'Noel ağacı', ko: '크리스마스 트리', ja: 'クリスマスツリー' },
  'zebra': { en: 'Zebra', es: 'Cebra', fr: 'Zèbre', ru: 'Зебра', pt: 'Zebra', de: 'Zebra', id: 'Zebra', tr: 'Zebra', ko: '얼룩말', ja: 'シマウマ' },

  // Adjectives & Qualities
  'good': { en: 'Good', es: 'Bueno', fr: 'Bon', ru: 'Хороший / Хорошо', pt: 'Bom', de: 'Gut', id: 'Baik', tr: 'İyi', ko: '좋은', ja: '良い' },
  'bad': { en: 'Bad', es: 'Malo', fr: 'Mauvais', ru: 'Плохой / Плохо', pt: 'Ruim', de: 'Schlecht', id: 'Buruk', tr: 'Kötü', ko: '나쁜', ja: '悪い' },
  'big': { en: 'Big / Large', es: 'Grande', fr: 'Grand', ru: 'Большой', pt: 'Grande', de: 'Groß', id: 'Besar', tr: 'Büyük', ko: '큰', ja: '大きい' },
  'small': { en: 'Small / Little', es: 'Pequeño', fr: 'Petit', ru: 'Маленький', pt: 'Pequeno', de: 'Klein', id: 'Kecil', tr: 'Küçük', ko: '작은', ja: '小さい' },
  'new': { en: 'New', es: 'Nuevo', fr: 'Nouveau', ru: 'Новый', pt: 'Novo', de: 'Neu', id: 'Baru', tr: 'Yeni', ko: '새로운', ja: '新しい' },
  'old': { en: 'Old', es: 'Viejo / Antiguo', fr: 'Vieux / Ancien', ru: 'Старый', pt: 'Velho', de: 'Alt', id: 'Tua / Lama', tr: 'Eski / Yaşlı', ko: '오래된 / 늙은', ja: '古い' },
  'open': { en: 'Open', es: 'Abierto', fr: 'Ouvert', ru: 'Открыто / Открытый', pt: 'Aberto', de: 'Offen', id: 'Buka', tr: 'Açık', ko: '열다 / 열린', ja: '開く / オープン' },
  'closed': { en: 'Closed', es: 'Cerrado', fr: 'Fermé', ru: 'Закрыто / Закрытый', pt: 'Fechado', de: 'Geschlossen', id: 'Tutup', tr: 'Kapalı', ko: '닫힌', ja: '休業 / 閉店' },
  'fast': { en: 'Fast / Quick', es: 'Rápido', fr: 'Rapide', ru: 'Быстрый / Быстро', pt: 'Rápido', de: 'Schnell', id: 'Cepat', tr: 'Hızlı', ko: '빠른', ja: '速い' },
  'slow': { en: 'Slow', es: 'Lento', fr: 'Lent', ru: 'Медленный / Медленно', pt: 'Lento', de: 'Langsam', id: 'Lambat', tr: 'Yavaş', ko: '느린', ja: '遅い' },
  'happy': { en: 'Happy', es: 'Feliz', fr: 'Heureux', ru: 'Счастливый / Рад', pt: 'Feliz', de: 'Glücklich', id: 'Senang', tr: 'Mutlu', ko: '행복한', ja: '嬉しい / 幸せ' },
  'ready': { en: 'Ready', es: 'Listo', fr: 'Prêt', ru: 'Готов / Готовый', pt: 'Pronto', de: 'Bereit', id: 'Siap', tr: 'Hazır', ko: '준비된', ja: '準備完了' },

  // Alphabet & Beginner Vocabulary
  'apple': { en: 'Apple', es: 'Manzana', fr: 'Pomme', ru: 'Яблоко', pt: 'Maçã', de: 'Apfel', id: 'Apel', tr: 'Elma', ko: '사과', ja: 'りんご' },
  'egg': { en: 'Egg', es: 'Huevo', fr: 'Œuf', ru: 'Яйцо', pt: 'Ovo', de: 'Ei', id: 'Telur', tr: 'Yumurta', ko: '계란 / 달걀', ja: '卵' },
  'ice': { en: 'Ice', es: 'Hielo', fr: 'Glace', ru: 'Лёд', pt: 'Gelo', de: 'Eis', id: 'Es', tr: 'Buz', ko: '얼음', ja: '氷' },
  'juice': { en: 'Juice', es: 'Jugo', fr: 'Jus', ru: 'Сок', pt: 'Suco', de: 'Saft', id: 'Jus', tr: 'Meyve suyu', ko: '주스', ja: 'ジュース' },
  'key': { en: 'Key', es: 'Llave', fr: 'Clé', ru: 'Ключ', pt: 'Chave', de: 'Schlüssel', id: 'Kunci', tr: 'Anahtar', ko: '열쇠', ja: '鍵' },
  'light': { en: 'Light', es: 'Luz', fr: 'Lumière', ru: 'Свет', pt: 'Luz', de: 'Licht', id: 'Cahaya', tr: 'Işık', ko: '빛 / 밝은', ja: '光 / 明るい' },
  'name': { en: 'Name', es: 'Nombre', fr: 'Nom', ru: 'Имя', pt: 'Nome', de: 'Name', id: 'Nama', tr: 'İsim', ko: '이름', ja: '名前' },
  'orange': { en: 'Orange', es: 'Naranja', fr: 'Orange', ru: 'Апельсин', pt: 'Laranja', de: 'Orange', id: 'Oranye', tr: 'Turuncu', ko: '오렌지', ja: 'オレンジ' },
  'quiet': { en: 'Quiet', es: 'Tranquilo / Silencioso', fr: 'Silencieux / Calme', ru: 'Тихий', pt: 'Calmo', de: 'Ruhig', id: 'Tenang', tr: 'Sessiz', ko: '조용한', ja: '静かな' },
  'road': { en: 'Road', es: 'Camino / Carretera', fr: 'Route', ru: 'Дорога', pt: 'Estrada', de: 'Straße', id: 'Jalan', tr: 'Yol', ko: '도로', ja: '道路' },
  'school': { en: 'School', es: 'Escuela', fr: 'École', ru: 'Школа', pt: 'Escola', de: 'Schule', id: 'Sekolah', tr: 'Okul', ko: '학교', ja: '学校' },
  'umbrella': { en: 'Umbrella', es: 'Paraguas', fr: 'Parapluie', ru: 'Зонт', pt: 'Guarda-chuva', de: 'Regenschirm', id: 'Payung', tr: 'Şemsiye', ko: '우산', ja: '傘' },
  'voice': { en: 'Voice', es: 'Voz', fr: 'Voix', ru: 'Голос', pt: 'Voz', de: 'Stimme', id: 'Suara', tr: 'Ses', ko: '목소리', ja: '声' },
  'x-ray': { en: 'X-ray', es: 'Rayos X', fr: 'Rayons X', ru: 'Рентген', pt: 'Raio X', de: 'Röntgenbild', id: 'Sinar-X', tr: 'Röntgen', ko: '엑스레이', ja: 'レントゲン' },
  'xylophone': { en: 'Xylophone', es: 'Xilófono', fr: 'Xylophone', ru: 'Ксилофон', pt: 'Xilofone', de: 'Xylophon', id: 'Xilofon', tr: 'Ksilofon', ko: '실로폰', ja: '木琴' },
  'yellow': { en: 'Yellow', es: 'Amarillo', fr: 'Jaune', ru: 'Жёлтый', pt: 'Amarelo', de: 'Gelb', id: 'Kuning', tr: 'Sarı', ko: '노란색', ja: '黄色' },
  'zero': { en: 'Zero', es: 'Cero', fr: 'Zéro', ru: 'Ноль', pt: 'Zero', de: 'Null', id: 'Nol', tr: 'Sıfır' },
  'love': { en: 'Love', es: 'Amor', fr: 'Amour', ru: 'Любовь', pt: 'Amor', de: 'Liebe', id: 'Cinta', tr: 'Aşk' },
  'boat': { en: 'Boat', es: 'Barco', fr: 'Bateau', ru: 'Лодка', pt: 'Barco', de: 'Boot', id: 'Perahu', tr: 'Tekne', ko: '배', ja: '船 / ボート' },
  'day': { en: 'Day', es: 'Día', fr: 'Jour', ru: 'День', pt: 'Dia', de: 'Tag', id: 'Hari', tr: 'Gün', ko: '날 / 일', ja: '日' },
  'island': { en: 'Island', es: 'Isla', fr: 'Île', ru: 'Остров', pt: 'Ilha', de: 'Insel', id: 'Pulau', tr: 'Ada' },
  'kilogram': { en: 'Kilogram', es: 'Kilo', fr: 'Kilo', ru: 'Килограмм', pt: 'Quilo', de: 'Kilogramm', id: 'Kilogram', tr: 'Kilogram' },
  'kilo': { en: 'Kilogram', es: 'Kilo', fr: 'Kilo', ru: 'Килограмм', pt: 'Quilo', de: 'Kilogramm', id: 'Kilogram', tr: 'Kilogram' },
  'night': { en: 'Night', es: 'Noche', fr: 'Nuit', ru: 'Ночь', pt: 'Noite', de: 'Nacht', id: 'Malam', tr: 'Gece', ko: '밤', ja: '夜' },
  'eye': { en: 'Eye', es: 'Ojo', fr: 'Œil', ru: 'Глаз', pt: 'Olho', de: 'Auge', id: 'Mata', tr: 'Göz', ko: '눈', ja: '目' },
  'eyes': { en: 'Eyes', es: 'Ojos', fr: 'Yeux', ru: 'Глаза', pt: 'Olhos', de: 'Augen', id: 'Mata', tr: 'Gözler', ko: '두 눈', ja: '両目' },
  'cheek': { en: 'Cheek', es: 'Mejilla', fr: 'Joue', ru: 'Щека', pt: 'Bochecha', de: 'Wange', id: 'Pipi', tr: 'Yanak', ko: '뺨 / 볼', ja: '頬 / ほっぺ' },
  'cheese': { en: 'Cheese', es: 'Queso', fr: 'Fromage', ru: 'Сыр', pt: 'Queijo', de: 'Käse', id: 'Keju', tr: 'Peynir', ko: '치즈', ja: 'チーズ' },
  'clock': { en: 'Clock / Watch', es: 'Reloj', fr: 'Horloge / Montre', ru: 'Часы', pt: 'Relógio', de: 'Uhr', id: 'Jam', tr: 'Saat', ko: '시계', ja: '時計' },
  'watch': { en: 'Watch / Clock', es: 'Reloj', fr: 'Montre', ru: 'Часы', pt: 'Relógio', de: 'Uhr', id: 'Jam tangan', tr: 'Saat', ko: '손목시계', ja: '腕時計' },
  'grape': { en: 'Grape', es: 'Uva', fr: 'Raisin', ru: 'Виноград', pt: 'Uva', de: 'Traube', id: 'Anggur', tr: 'Üzüm', ko: '포도', ja: 'ぶどう' },
  'glass': { en: 'Glass (cup)', es: 'Vaso', fr: 'Verre', ru: 'Стакан', pt: 'Copo', de: 'Glas', id: 'Gelas', tr: 'Bardak', ko: '유리잔 / 컵', ja: 'グラス / コップ' },
  'web': { en: 'Web', es: 'Web', fr: 'Web', ru: 'Веб', pt: 'Web', de: 'Web', id: 'Web', tr: 'Web' },
  'success': { en: 'Success', es: 'Éxito', fr: 'Succès', ru: 'Успех', pt: 'Sucesso', de: 'Erfolg', id: 'Sukses', tr: 'Başarı' },
  'yolk': { en: 'Yolk', es: 'Yema', fr: 'Jaune d\'œuf', ru: 'Желток', pt: 'Gema', de: 'Eigelb', id: 'Kuning telur', tr: 'Yumurta sarısı' },
  'shoe': { en: 'Shoe', es: 'Zapato', fr: 'Chaussure', ru: 'Обувь', pt: 'Sapato', de: 'Schuh', id: 'Sepatu', tr: 'Ayakkabı' },
  'idea': { en: 'Idea', es: 'Idea', fr: 'Idée', ru: 'Идея', pt: 'Ideia', de: 'Idee', id: 'Ide', tr: 'Fikir', ko: '생각 / 아이디어', ja: 'アイデア / 考え' },
  'question': { en: 'Question', es: 'Pregunta', fr: 'Question', ru: 'Вопрос', pt: 'Pergunta', de: 'Frage', id: 'Pertanyaan', tr: 'Soru', ko: '질문', ja: '質問' },
  'wagon': { en: 'Wagon / Car', es: 'Vagón', fr: 'Wagon', ru: 'Вагон', pt: 'Vagão', de: 'Waggon', id: 'Gerbong', tr: 'Vagon', ko: '마차 / 왜건', ja: 'ワゴン' },
  'example': { en: 'Example', es: 'Ejemplo', fr: 'Exemple', ru: 'Пример', pt: 'Exemplo', de: 'Beispiel', id: 'Contoh', tr: 'Örnek', ko: '예시 / 예', ja: '例' },
  'brother': { en: 'Brother', es: 'Hermano', fr: 'Frère', ru: 'Брат', pt: 'Irmão', de: 'Bruder', id: 'Saudara laki-laki', tr: 'Erkek kardeş', ko: '형제 / 오빠 / 형', ja: '兄弟 / 兄 / 弟' },
  'sister': { en: 'Sister', es: 'Hermana', fr: 'Sœur', ru: 'Сестра', pt: 'Irmã', de: 'Schwester', id: 'Saudara perempuan', tr: 'Kız kardeş', ko: '자매 / 언니 / 누나', ja: '姉妹 / 姉 / 妹' },
  'lemon': { en: 'Lemon', es: 'Limón', fr: 'Citron', ru: 'Лимон', pt: 'Limão', de: 'Zitrone', id: 'Lemon', tr: 'Limon', ko: '레몬', ja: 'レモン' },
  'nose': { en: 'Nose', es: 'Nariz', fr: 'Nez', ru: 'Нос', pt: 'Nariz', de: 'Nase', id: 'Hidung', tr: 'Burun', ko: '코', ja: '鼻' },
  'window': { en: 'Window', es: 'Ventana', fr: 'Fenêtre', ru: 'Окно', pt: 'Janela', de: 'Fenster', id: 'Jendela', tr: 'Pencere', ko: '창문', ja: '窓' },
  'dad': { en: 'Dad', es: 'Papá', fr: 'Papa', ru: 'Папа', pt: 'Pai', de: 'Papa', id: 'Ayah', tr: 'Baba', ko: '아빠', ja: 'お父さん / パパ' },
  'kettle': { en: 'Kettle', es: 'Tetera', fr: 'Bouilloire', ru: 'Чайник', pt: 'Chaleira', de: 'Wasserkocher', id: 'Teko', tr: 'Çaydanlık', ko: '주전자', ja: 'やかん / ケトル' },
  'morning': { en: 'Morning', es: 'Mañana', fr: 'Matin', ru: 'Утро', pt: 'Manhã', de: 'Morgen', id: 'Pagi', tr: 'Sabah', ko: '아침', ja: '朝' },
  'afternoon': { en: 'Afternoon', es: 'Tarde', fr: 'Après-midi', ru: 'День (после полудня)', pt: 'Tarde', de: 'Nachmittag', id: 'Siang', tr: 'Öğleden sonra', ko: '오후', ja: '午後' },
  'evening': { en: 'Evening', es: 'Tarde / Noche', fr: 'Soir', ru: 'Вечер', pt: 'Noite', de: 'Abend', id: 'Malam', tr: 'Akşam', ko: '저녁', ja: '夕方 / 夜' },
  'photo': { en: 'Photo', es: 'Foto', fr: 'Photo', ru: 'Фото', pt: 'Foto', de: 'Foto', id: 'Foto', tr: 'Fotoğraf', ko: '사진', ja: '写真' },
  'czar': { en: 'Czar / King', es: 'Zar', fr: 'Tsar', ru: 'Царь', pt: 'Czar', de: 'Zar', id: 'Raja', tr: 'Çar', ko: '차르', ja: 'ツァーリ' },
  'borscht': { en: 'Borscht', es: 'Borsch', fr: 'Bortsch', ru: 'Борщ', pt: 'Borsch', de: 'Borschtsch', id: 'Sup bit', tr: 'Borş', ko: '보르시', ja: 'ボルシチ' },
  'entrance': { en: 'Entrance', es: 'Entrada', fr: 'Entrée', ru: 'Подъезд', pt: 'Entrada', de: 'Eingang', id: 'Pintu masuk', tr: 'Giriş', ko: '입구', ja: '入口' },
  'south': { en: 'South', es: 'Sur', fr: 'Sud', ru: 'Юг', pt: 'Sul', de: 'Süden', id: 'Selatan', tr: 'Güney', ko: '남쪽', ja: '南' },
  'yogurt': { en: 'Yogurt', es: 'Yogur', fr: 'Yaourt', ru: 'Йогурт', pt: 'Iogurte', de: 'Joghurt', id: 'Yogurt', tr: 'Yoğurt', ko: '요거트', ja: 'ヨーグルト' },
  'heart': { en: 'Heart', es: 'Corazón', fr: 'Cœur', ru: 'Сердце', pt: 'Coração', de: 'Herz', id: 'Hati', tr: 'Kalp', ko: '심장', ja: '心臓' },
  'cup': { en: 'Cup', es: 'Taza', fr: 'Tasse', ru: 'Чашка', pt: 'Xícara', de: 'Tasse', id: 'Cangkir', tr: 'Fincan', ko: '컵', ja: 'カップ' },
  'source': { en: 'Source', es: 'Fuente', fr: 'Source', ru: 'Источник', pt: 'Fonte', de: 'Quelle', id: 'Sumber', tr: 'Kaynak', ko: '원천 / 소스', ja: '源' },
  'oil': { en: 'Oil', es: 'Aceite', fr: 'Huile', ru: 'Масло', pt: 'Óleo', de: 'Öl', id: 'Minyak', tr: 'Yağ', ko: '기름 / 오일', ja: '油' },
  'or': { en: 'Or', es: 'O', fr: 'Ou', ru: 'Или', pt: 'Ou', de: 'Oder', id: 'Atau', tr: 'Veya', ko: '또는 / 혹은', ja: 'または' },
  'this': { en: 'This', es: 'Esto', fr: 'Ceci', ru: 'Это', pt: 'Isto', de: 'Dies', id: 'Ini', tr: 'Bu', ko: '이것', ja: 'これ' },
  'i eat': { en: 'I eat', es: 'Como', fr: 'Je mange', ru: 'Ем', pt: 'Eu como', de: 'Ich esse', id: 'Saya makan', tr: 'Yiyorum', ko: '나는 먹는다', ja: '私は食べます' },
  'yes': { en: 'Yes', es: 'Sí', fr: 'Oui', ru: 'Да', pt: 'Sim', de: 'Ja', id: 'Ya', tr: 'Evet', ko: '네', ja: 'はい' },
  'no': { en: 'No', es: 'No', fr: 'Non', ru: 'Нет', pt: 'Não', de: 'Nein', id: 'Tidak', tr: 'Hayır', ko: '아니요', ja: 'いいえ' },
  'maybe': { en: 'Maybe', es: 'Quizás / Tal vez', fr: 'Peut-être', ru: 'Может быть', pt: 'Talvez', de: 'Vielleicht', id: 'Mungkin', tr: 'Belki', ko: '아마도', ja: 'たぶん / おそらく' },
  'today': { en: 'Today', es: 'Hoy', fr: 'Aujourd\'hui', ru: 'Сегодня', pt: 'Hoje', de: 'Heute', id: 'Hari ini', tr: 'Bugün', ko: '오늘', ja: '今日' },
  'tomorrow': { en: 'Tomorrow', es: 'Mañana', fr: 'Demain', ru: 'Завтра', pt: 'Amanhã', de: 'Morgen', id: 'Besok', tr: 'Yarın', ko: '내일', ja: '明日' },
  'yesterday': { en: 'Yesterday', es: 'Ayer', fr: 'Hier', ru: 'Вчера', pt: 'Ontem', de: 'Gestern', id: 'Kemarin', tr: 'Dün', ko: '어제', ja: '昨日' },

  // Core Actions (Verbs)
  'to learn': { en: 'To learn', es: 'Aprender', fr: 'Apprendre', ru: 'Учиться', pt: 'Aprender', de: 'Lernen', id: 'Belajar', tr: 'Öğrenmek', ko: '배우다', ja: '学ぶ' },
  'to speak': { en: 'To speak', es: 'Hablar', fr: 'Parler', ru: 'Говорить', pt: 'Falar', de: 'Sprechen', id: 'Berbicara', tr: 'Konuşmak', ko: '말하다', ja: '話す' },
  'to eat': { en: 'To eat', es: 'Comer', fr: 'Manger', ru: 'Есть', pt: 'Comer', de: 'Essen', id: 'Makan', tr: 'Yemek', ko: '먹다', ja: '食べる' },
  'to drink': { en: 'To drink', es: 'Beber', fr: 'Boire', ru: 'Пить', pt: 'Beber', de: 'Trinken', id: 'Minum', tr: 'İçmek', ko: '마시다', ja: '飲む' },
  'to go': { en: 'To go', es: 'Ir', fr: 'Aller', ru: 'Идти / Ехать', pt: 'Ir', de: 'Gehen', id: 'Pergi', tr: 'Gitmek', ko: '가다', ja: '行く' },
  'to come': { en: 'To come', es: 'Venir', fr: 'Venir', ru: 'Приходить / Приезжать', pt: 'Vir', de: 'Kommen', id: 'Datang', tr: 'Gelmek', ko: '오다', ja: '来る' },
  'to understand': { en: 'To understand', es: 'Entender / Comprender', fr: 'Comprendre', ru: 'Понимать', pt: 'Entender', de: 'Verstehen', id: 'Mengerti', tr: 'Anlamak', ko: '이해하다', ja: '理解する' },
  'to know': { en: 'To know', es: 'Saber / Conocer', fr: 'Savoir / Connaître', ru: 'Знать', pt: 'Saber', de: 'Wissen', id: 'Tahu', tr: 'Bilmek', ko: '알다', ja: '知る' },
  'to want': { en: 'To want', es: 'Querer', fr: 'Vouloir', ru: 'Хотеть', pt: 'Querer', de: 'Wollen', id: 'Ingin', tr: 'İstemek', ko: '원하다', ja: '欲しい / 望む' },
  'want': { en: 'To want', es: 'Querer', fr: 'Vouloir', ru: 'Хотеть', pt: 'Querer', de: 'Wollen', id: 'Ingin', tr: 'İstemek', ko: '원하다', ja: '欲しい / 望む' },
  'to need': { en: 'To need', es: 'Necesitar', fr: 'Avoir besoin de', ru: 'Нуждаться (нужно)', pt: 'Precisar', de: 'Brauchen', id: 'Butuh', tr: 'İhtiyacı olmak', ko: '필요하다', ja: '必要である' },
  'to buy': { en: 'To buy', es: 'Comprar', fr: 'Acheter', ru: 'Покупать', pt: 'Comprar', de: 'Kaufen', id: 'Membeli', tr: 'Satın almak', ko: '사다', ja: '買う' },
  'to help': { en: 'To help', es: 'Ayudar', fr: 'Aider', ru: 'Помогать', pt: 'Ajudar', de: 'Helfen', id: 'Membantu', tr: 'Yardım etmek', ko: '돕다', ja: '助ける / 手伝う' },
  'to work': { en: 'To work', es: 'Trabajar', fr: 'Travailler', ru: 'Работать', pt: 'Trabalhar', de: 'Arbeiten', id: 'Bekerja', tr: 'Çalışmak', ko: '일하다', ja: '働く' },

  // Essential Phrases
  'hello': { en: 'Hello', es: '¡Hola!', fr: 'Bonjour', ru: 'Привет / Здравствуйте', pt: 'Olá', de: 'Hallo', id: 'Halo', tr: 'Merhaba', ko: '안녕하세요', ja: 'こんにちは' },
  'hello (informal)': { en: 'Hello (informal)', es: '¡Hola! (informal)', fr: 'Salut (informel)', ru: 'Привет', pt: 'Oi / Olá', de: 'Hallo', id: 'Halo', tr: 'Merhaba', ko: '안녕', ja: 'やあ' },
  'hello (formal)': { en: 'Hello (formal)', es: 'Buenos días / Hola (formal)', fr: 'Bonjour (formel)', ru: 'Здравствуйте', pt: 'Olá / Bom dia', de: 'Guten Tag', id: 'Selamat pagi', tr: 'Merhaba' },
  'good morning': { en: 'Good morning', es: 'Buenos días', fr: 'Bonjour', ru: 'Доброе утро', pt: 'Bom dia', de: 'Guten Morgen', id: 'Selamat pagi', tr: 'Günaydın', ko: '좋은 아침입니다', ja: 'おはようございます' },
  'good afternoon': { en: 'Good afternoon', es: 'Buenas tardes', fr: 'Bon après-midi', ru: 'Добрый день', pt: 'Boa tarde', de: 'Guten Tag', id: 'Selamat siang', tr: 'İyi günler' },
  'good evening': { en: 'Good evening', es: 'Buenas noches', fr: 'Bonsoir', ru: 'Добрый вечер', pt: 'Boa noite', de: 'Guten Abend', id: 'Selamat malam', tr: 'İyi akşamlar', ko: '좋은 저녁입니다', ja: 'こんばんは' },
  'good night': { en: 'Good night', es: 'Buenas noches', fr: 'Bonne nuit', ru: 'Спокойной ночи', pt: 'Boa noite', de: 'Gute Nacht', id: 'Selamat malam', tr: 'İyi geceler', ko: '안녕히 주무세요', ja: 'おやすみなさい' },
  'how are you': { en: 'How are you?', es: '¿Cómo estás?', fr: 'Comment allez-vous ?', ru: 'Как дела?', pt: 'Tudo bem?', de: 'Wie geht es dir?', id: 'Apa kabar?', tr: 'Nasılsınız?', ko: '잘 지내세요?', ja: 'お元気ですか？' },
  'how are you?': { en: 'How are you?', es: '¿Cómo estás?', fr: 'Comment allez-vous ?', ru: 'Как дела?', pt: 'Tudo bem?', de: 'Wie geht es dir?', id: 'Apa kabar?', tr: 'Nasılsınız?', ko: '잘 지내세요?', ja: 'お元気ですか？' },
  'i am fine, thank you': { en: 'I am fine, thank you', es: 'Estoy bien, gracias', fr: 'Je vais bien, merci', ru: 'У меня всё хорошо, спасибо', pt: 'Estou bem, obrigado', de: 'Mir geht es gut, danke', id: 'Kabar baik, terima kasih', tr: 'İyiyim, teşekkürler', ko: '잘 지내요, 감사합니다', ja: '元気です、ありがとう' },
  'very well, thank you': { en: 'Very well, thank you', es: 'Muy bien, gracias', fr: 'Très bien, merci', ru: 'Очень хорошо, спасибо', pt: 'Muito bem, obrigado', de: 'Sehr gut, danke', id: 'Sangat baik, terima kasih', tr: 'Çok iyiyim, teşekkürler' },
  'good / well': { en: 'Good / Well', es: 'Bien', fr: 'Bien', ru: 'Хорошо', pt: 'Bem', de: 'Gut', id: 'Baik', tr: 'İyi', ko: '좋은', ja: '良い' },
  'bad / poorly': { en: 'Bad / Poorly', es: 'Mal', fr: 'Mal', ru: 'Плохо', pt: 'Mal', de: 'Schlecht', id: 'Buruk', tr: 'Kötü', ko: '나쁜', ja: '悪い' },
  'and you?': { en: 'And you?', es: '¿Y tú?', fr: 'Et vous ?', ru: 'А вы? / А у вас?', pt: 'E você?', de: 'Und dir?', id: 'Dan Anda?', tr: 'Ya siz?', ko: '당신은요?', ja: 'あなたは？' },
  'please': { en: 'Please', es: 'Por favor', fr: 'S\'il vous plaît', ru: 'Пожалуйста', pt: 'Por favor', de: 'Bitte', id: 'Tolong', tr: 'Lütfen', ko: '제발 / 부탁합니다', ja: 'お願いします' },
  'please / you\'re welcome': { en: 'Please / You\'re welcome', es: 'Por favor / De nada', fr: 'S\'il vous plaît / De rien', ru: 'Пожалуйста', pt: 'Por favor / De nada', de: 'Bitte', id: 'Tolong / Sama-sama', tr: 'Lütfen / Rica ederim', ko: '제발 / 부탁합니다', ja: 'お願いします' },
  'thank you': { en: 'Thank you', es: 'Gracias', fr: 'Merci', ru: 'Спасибо', pt: 'Obrigado', de: 'Danke', id: 'Terima kasih', tr: 'Teşekkür ederim', ko: '감사합니다', ja: 'ありがとう' },
  'thank you very much': { en: 'Thank you very much', es: 'Muchas gracias', fr: 'Merci beaucoup', ru: 'Большое спасибо', pt: 'Muito obrigado', de: 'Vielen Dank', id: 'Terima kasih banyak', tr: 'Çok teşekkür ederim', ko: '정말 감사합니다', ja: 'どうもありがとうございます' },
  'you are welcome': { en: 'You are welcome', es: 'De nada', fr: 'De rien', ru: 'Пожалуйста / Не за что', pt: 'De nada', de: 'Gern geschehen', id: 'Sama-sama', tr: 'Rica ederim' },
  'you\'re welcome': { en: 'You\'re welcome', es: 'De nada', fr: 'De rien', ru: 'Пожалуйста / Не за что', pt: 'De nada', de: 'Gern geschehen', id: 'Sama-sama', tr: 'Rica ederim' },
  'you\'re welcome / not at all': { en: 'You\'re welcome / Not at all', es: 'De nada', fr: 'De rien', ru: 'Не за что', pt: 'De nada', de: 'Gern geschehen', id: 'Sama-sama', tr: 'Rica ederim' },
  'no problem': { en: 'No problem', es: 'No hay problema', fr: 'Pas de problème', ru: 'Без проблем / Ничего страшного', pt: 'Sem problema', de: 'Kein Problem', id: 'Tidak masalah', tr: 'Sorun değil', ko: '괜찮아요', ja: '問題ありません' },
  'excuse me': { en: 'Excuse me', es: 'Disculpe / Con permiso', fr: 'Excusez-moi', ru: 'Извините', pt: 'Com licença', de: 'Entschuldigung', id: 'Permisi', tr: 'Affedersiniz', ko: '실례합니다', ja: 'すみません' },
  'excuse me / sorry': { en: 'Excuse me / Sorry', es: 'Disculpe / Perdón', fr: 'Excusez-moi / Pardon', ru: 'Извините', pt: 'Com licença / Desculpe', de: 'Entschuldigung', id: 'Permisi / Maaf', tr: 'Affedersiniz / Özür dilerim', ko: '실례합니다', ja: 'すみません' },
  'i am sorry': { en: 'I am sorry', es: 'Lo siento / Perdón', fr: 'Pardon / Désolé', ru: 'Простите / Мне жаль', pt: 'Desculpe', de: 'Es tut mir leid', id: 'Maafkan saya', tr: 'Özür dilerim' },
  'what is your name?': { en: 'What is your name?', es: '¿Cómo te llamas?', fr: 'Comment vous appelez-vous ?', ru: 'Как вас зовут?', pt: 'Qual é o seu nome?', de: 'Wie heißt du?', id: 'Siapa nama Anda?', tr: 'Adınız ne?', ko: '성함이 어떻게 되시나요?', ja: 'お名前は何ですか？' },
  'my name is': { en: 'My name is...', es: 'Me llamo...', fr: 'Je m\'appelle...', ru: 'Меня зовут...', pt: 'Meu nome é...', de: 'Ich heiße...', id: 'Nama saya...', tr: 'Benim adım...', ko: '제 이름은...', ja: '私の名前は...' },
  'my name is...': { en: 'My name is...', es: 'Me llamo...', fr: 'Je m\'appelle...', ru: 'Меня зовут...', pt: 'Meu nome é...', de: 'Ich heiße...', id: 'Nama saya...', tr: 'Benim adım...', ko: '제 이름은...', ja: '私の名前は...' },
  'nice to meet you': { en: 'Nice to meet you', es: 'Mucho gusto / Encantado', fr: 'Enchanté(e)', ru: 'Очень приятно познакомиться', pt: 'Muito prazer', de: 'Freut mich', id: 'Senang bertemu dengan Anda', tr: 'Memnun oldum', ko: '만나서 반갑습니다', ja: 'はじめまして' },
  'where are you from?': { en: 'Where are you from?', es: '¿De dónde eres?', fr: 'D\'où venez-vous ?', ru: 'Откуда вы?', pt: 'De onde você é?', de: 'Woher kommst du?', id: 'Dari mana asal Anda?', tr: 'Nerelisiniz?', ko: '어디 출신이세요?', ja: 'どちらの出身ですか？' },
  'i am from...': { en: 'I am from...', es: 'Soy de...', fr: 'Je viens de...', ru: 'Я из...', pt: 'Eu sou de...', de: 'Ich komme aus...', id: 'Saya berasal dari...', tr: 'Ben ...-lıyım', ko: '저는 ... 출신입니다', ja: '私は...出身です' },
  'goodbye': { en: 'Goodbye', es: 'Adiós', fr: 'Au revoir', ru: 'До свидания', pt: 'Tchau / Adeus', de: 'Auf Wiedersehen', id: 'Sampai jumpa', tr: 'Hoşça kalın', ko: '안녕히 가세요', ja: 'さようなら' },
  'bye (informal)': { en: 'Bye (informal)', es: 'Chao / Hasta luego', fr: 'Salut / À plus', ru: 'Пока', pt: 'Tchau', de: 'Tschüss', id: 'Dadah', tr: 'Güle güle', ko: '잘 가', ja: 'またね' },
  'see you later': { en: 'See you later', es: 'Hasta luego', fr: 'À bientôt', ru: 'Увидимся позже / Пока', pt: 'Até logo', de: 'Bis später', id: 'Sampai nanti', tr: 'Sonra görüşürüz', ko: '나중에 봐요', ja: 'また後で' },
  'have a nice day': { en: 'Have a nice day', es: 'Que tenga un buen día', fr: 'Bonne journée', ru: 'Хорошего дня', pt: 'Tenha um bom dia', de: 'Schönen Tag noch', id: 'Semoga hari Anda menyenangkan', tr: 'İyi günler', ko: '좋은 하루 되세요', ja: '良い一日を' },
  'have a great day': { en: 'Have a great day', es: 'Que tenga un buen día', fr: 'Bonne journée', ru: 'Хорошего дня', pt: 'Tenha um ótimo dia', de: 'Einen schönen Tag', id: 'Semoga hari Anda menyenangkan', tr: 'İyi günler' },
  'i understand': { en: 'I understand', es: 'Entiendo / Comprendo', fr: 'Je comprends', ru: 'Я понимаю', pt: 'Eu entendo', de: 'Ich verstehe', id: 'Saya mengerti', tr: 'Anlıyorum', ko: '이해해요', ja: '理解します' },
  'i do not understand': { en: 'I do not understand', es: 'No entiendo', fr: 'Je ne comprends pas', ru: 'Я не понимаю', pt: 'Eu não entendo', de: 'Ich verstehe nicht', id: 'Saya tidak mengerti', tr: 'Anlamıyorum' },
  'i don\'t understand': { en: 'I don\'t understand', es: 'No entiendo', fr: 'Je ne comprends pas', ru: 'Я не понимаю', pt: 'Eu não entendo', de: 'Ich verstehe nicht', id: 'Saya tidak mengerti', tr: 'Anlamıyorum' },
  'could you repeat that, please?': { en: 'Could you repeat that, please?', es: '¿Puede repetir, por favor?', fr: 'Pouvez-vous répéter ?', ru: 'Повторите, пожалуйста', pt: 'Pode repetir, por favor?', de: 'Können Sie das bitte wiederholen?', id: 'Bisa ulangi, tolong?', tr: 'Lütfen tekrar eder misiniz?' },
  'can you repeat, please?': { en: 'Can you repeat, please?', es: '¿Puede repetir, por favor?', fr: 'Pouvez-vous répéter ?', ru: 'Повторите, пожалуйста', pt: 'Pode repetir, por favor?', de: 'Können Sie das bitte wiederholen?', id: 'Bisa ulangi, tolong?', tr: 'Lütfen tekrar eder misiniz?' },
  'please repeat': { en: 'Please repeat', es: 'Repita, por favor', fr: 'Répétez, s\'il vous plaît', ru: 'Повторите, пожалуйста', pt: 'Repita, por favor', de: 'Bitte wiederholen', id: 'Tolong ulangi', tr: 'Lütfen tekrarlayın', ko: '다시 말씀해 주세요', ja: 'もう一度お願いします' },
  'please speak more slowly': { en: 'Please speak more slowly', es: 'Hable más despacio, por favor', fr: 'Parlez plus lentement, s\'il vous plaît', ru: 'Говорите медленнее, пожалуйста', pt: 'Fale mais devagar, por favor', de: 'Bitte sprechen Sie langsamer', id: 'Tolong bicara lebih pelan', tr: 'Lütfen daha yavaş konuşun', ko: '더 천천히 말해 주세요', ja: 'もっとゆっくり話してください' },
  'can you speak more slowly?': { en: 'Can you speak more slowly?', es: '¿Puede hablar más despacio?', fr: 'Pouvez-vous parler plus lentement ?', ru: 'Можете говорить медленнее?', pt: 'Pode falar mais devagar?', de: 'Können Sie langsamer sprechen?', id: 'Bisa bicara lebih pelan?', tr: 'Daha yavaş konuşabilir misiniz?', ko: '더 천천히 말씀해 주시겠어요?', ja: 'もっとゆっくり話せますか？' },
  'speak more slowly': { en: 'Speak more slowly', es: 'Hable más despacio', fr: 'Parlez plus lentement', ru: 'Говорите медленнее', pt: 'Fale mais devagar', de: 'Sprechen Sie langsamer', id: 'Bicara lebih pelan', tr: 'Daha yavaş konuşun', ko: '천천히 말씀하세요', ja: 'ゆっくり話して' },
  'do you speak english?': { en: 'Do you speak English?', es: '¿Habla inglés?', fr: 'Parlez-vous anglais ?', ru: 'Вы говорите по-английски?', pt: 'Você fala inglês?', de: 'Sprechen Sie Englisch?', id: 'Apakah Anda berbicara bahasa Inggris?', tr: 'İngilizce biliyor musunuz?' },
  'i speak a little russian': { en: 'I speak a little Russian', es: 'Hablo un poco de ruso', fr: 'Je parle un peu russe', ru: 'Я немного говорю по-русски', pt: 'Eu falo um pouco de russo', de: 'Ich spreche ein bisschen Russisch', id: 'Saya berbicara sedikit bahasa Rusia', tr: 'Biraz Rusça konuşuyorum', ko: '러시아어를 조금 할 수 있어요', ja: 'ロシア語が少し話せます' },
  'what does this mean?': { en: 'What does this mean?', es: '¿Qué significa esto?', fr: 'Qu\'est-ce que cela signifie ?', ru: 'Что это значит?', pt: 'O que significa isto?', de: 'Was bedeutet das?', id: 'Apa artinya ini?', tr: 'Bu ne demek?', ko: '이것은 무슨 뜻인가요?', ja: 'これはどういう意味ですか？' },
  'how do you say...?': { en: 'How do you say...?', es: '¿Cómo se dice...?', fr: 'Comment dit-on... ?', ru: 'Как сказать...?', pt: 'Como se diz...?', de: 'Wie sagt man...?', id: 'Bagaimana mengatakan...?', tr: 'Nasıl denir...?', ko: '어떻게 말하나요?', ja: 'どう言いますか？' },
  'how do you say this in russian?': { en: 'How do you say this in Russian?', es: '¿Cómo se dice esto en ruso?', fr: 'Comment dit-on cela en russe ?', ru: 'Как это по-русски?', pt: 'Como se diz isto em russo?', de: 'Wie sagt man das auf Russisch?', id: 'Bagaimana mengatakan ini dalam bahasa Rusia?', tr: 'Bu Rusça nasıl söylenir?', ko: '러시아어로 어떻게 말하나요?', ja: 'ロシア語で何と言いますか？' },
  'can you help me?': { en: 'Can you help me?', es: '¿Puede ayudarme?', fr: 'Pouvez-vous m\'aider ?', ru: 'Вы можете мне помочь?', pt: 'Pode me ajudar?', de: 'Können Sie mir helfen?', id: 'Bisa bantu saya?', tr: 'Bana yardım edebilir misiniz?', ko: '저를 도와주실 수 있나요?', ja: '手伝っていただけますか？' },
  'i need help': { en: 'I need help', es: 'Necesito ayuda', fr: 'J\'ai besoin d\'aide', ru: 'Мне нужна помощь', pt: 'Preciso de ajuda', de: 'Ich brauche Hilfe', id: 'Saya butuh bantuan', tr: 'Yardıma ihtiyacım var', ko: '도움이 필요해요', ja: '助けが必要です' },
  'help me': { en: 'Help me', es: 'Ayúdeme', fr: 'Aidez-moi', ru: 'Помогите мне', pt: 'Ajude-me', de: 'Helfen Sie mir', id: 'Tolong saya', tr: 'Bana yardım edin', ko: '도와주세요', ja: '助けてください' },
  'help!': { en: 'Help!', es: '¡Ayuda! / ¡Socorro!', fr: 'À l\'aide ! / Au secours !', ru: 'Помогите!', pt: 'Socorro!', de: 'Hilfe!', id: 'Tolong!', tr: 'İmdat!', ko: '도와주세요!', ja: '助けて！' },
  'where is the restroom?': { en: 'Where is the restroom?', es: '¿Dónde está el baño?', fr: 'Où sont les toilettes ?', ru: 'Где находится туалет?', pt: 'Onde fica o banheiro?', de: 'Wo ist die Toilette?', id: 'Di mana kamar mandi?', tr: 'Tuvalet nerede?' },
  'where is the bathroom': { en: 'Where is the bathroom?', es: '¿Dónde está el baño?', fr: 'Où sont les toilettes ?', ru: 'Где туалет?', pt: 'Onde fica o banheiro?', de: 'Wo ist die Toilette?', id: 'Di mana kamar mandi?', tr: 'Tuvalet nerede?' },
  'where is the bathroom?': { en: 'Where is the bathroom?', es: '¿Dónde está el baño?', fr: 'Où sont les toilettes ?', ru: 'Где туалет?', pt: 'Onde fica o banheiro?', de: 'Wo ist die Toilette?', id: 'Di mana kamar mandi?', tr: 'Tuvalet nerede?' },
  'where is the train station?': { en: 'Where is the train station?', es: '¿Dónde está la estación de tren?', fr: 'Où est la gare ?', ru: 'Где находится вокзал?', pt: 'Onde fica a estação de trem?', de: 'Wo ist der Bahnhof?', id: 'Di mana stasiun kereta?', tr: 'Tren istasyonu nerede?' },
  'where is the airport?': { en: 'Where is the airport?', es: '¿Dónde está el aeropuerto?', fr: 'Où est l\'aéroport ?', ru: 'Где находится аэропорт?', pt: 'Onde fica o aeroporto?', de: 'Wo ist der Flughafen?', id: 'Di mana bandara?', tr: 'Havalimanı nerede?', ko: '공항이 어디에 있나요?', ja: '空港はどこですか？' },
  'i would like to go to the airport': { en: 'I would like to go to the airport', es: 'Quisiera ir al aeropuerto', fr: 'Je voudrais aller à l\'aéroport', ru: 'Я хочу поехать в аэропорт', pt: 'Gostaria de ir ao aeroporto', de: 'Ich möchte zum Flughafen fahren', id: 'Saya mau ke bandara', tr: 'Havalimanına gitmek istiyorum', ko: '공항에 가고 싶어요', ja: '空港に行きたいです' },
  'what time is the departure?': { en: 'What time is the departure?', es: '¿A qué hora es la salida?', fr: 'À quelle heure est le départ ?', ru: 'Во сколько отправление?', pt: 'A que horas é a partida?', de: 'Wann ist der Abflug?', id: 'Jam berapa keberangkatannya?', tr: 'Kalkış saat kaçta?', ko: '출발 시간이 언제인가요?', ja: '出発は何時ですか？' },
  'where is the hotel?': { en: 'Where is the hotel?', es: '¿Dónde está el hotel?', fr: 'Où est l\'hôtel ?', ru: 'Где находится отель?', pt: 'Onde fica o hotel?', de: 'Wo ist das Hotel?', id: 'Di mana hotelnya?', tr: 'Otel nerede?', ko: '호텔이 어디에 있나요?', ja: 'ホテルはどこですか？' },
  'how much is a ticket?': { en: 'How much is a ticket?', es: '¿Cuánto cuesta un boleto?', fr: 'Combien coûte un billet ?', ru: 'Сколько стоит билет?', pt: 'Quanto custa uma passagem?', de: 'Was kostet ein Ticket?', id: 'Berapa harga tiketnya?', tr: 'Bilet ne kadar?', ko: '표는 얼마인가요?', ja: '切符はいくらですか？' },
  'i need a taxi': { en: 'I need a taxi', es: 'Necesito un taxi', fr: 'J\'ai besoin d\'un taxi', ru: 'Мне нужно такси', pt: 'Preciso de um táxi', de: 'Ich brauche ein Taxi', id: 'Saya butuh taksi', tr: 'Taksiye ihtiyacım var' },
  'turn left': { en: 'Turn left', es: 'Gire a la izquierda', fr: 'Tournez à gauche', ru: 'Поверните налево', pt: 'Vire à esquerda', de: 'Links abbiegen', id: 'Belok kiri', tr: 'Sola dönün', ko: '좌회전', ja: '左折' },
  'turn right': { en: 'Turn right', es: 'Gire a la derecha', fr: 'Tournez à droite', ru: 'Поверните направо', pt: 'Vire à direita', de: 'Rechts abbiegen', id: 'Belok kanan', tr: 'Sağa dönün', ko: '우회전', ja: '右折' },
  'go straight ahead': { en: 'Go straight ahead', es: 'Siga todo recto', fr: 'Allez tout droit', ru: 'Идите прямо', pt: 'Siga em frente', de: 'Geradeaus gehen', id: 'Jalan lurus terus', tr: 'Düz gidin', ko: '곧장 가세요', ja: 'まっすぐ進んでください' },
  'a table for two, please': { en: 'A table for two, please', es: 'Una mesa para dos, por favor', fr: 'Une table pour deux, s\'il vous plaît', ru: 'Столик на двоих, пожалуйста', pt: 'Uma mesa para dois, por favor', de: 'Einen Tisch für zwei, bitte', id: 'Meja untuk dua orang', tr: 'İki kişilik masa, lütfen' },
  'the menu, please': { en: 'The menu, please', es: 'El menú, por favor', fr: 'La carte, s\'il vous plaît', ru: 'Меню, пожалуйста', pt: 'O cardápio, por favor', de: 'Die Speisekarte, bitte', id: 'Minta daftar menunya', tr: 'Menüyü görebilir miyim?' },
  'can i see the menu, please?': { en: 'Can I see the menu, please?', es: '¿Puedo ver el menú, por favor?', fr: 'Puis-je voir la carte ?', ru: 'Можно меню, пожалуйста?', pt: 'Posso ver o cardápio?', de: 'Kann ich bitte die Speisekarte sehen?', id: 'Minta daftar menunya', tr: 'Menüyü görebilir miyim?', ko: '메뉴판을 볼 수 있을까요?', ja: 'メニューを見せてもらえますか？' },
  'i would like water': { en: 'I would like water', es: 'Quisiera agua', fr: 'Je voudrais de l\'eau', ru: 'Я бы хотел(а) воды', pt: 'Eu gostaria de água', de: 'Ich hätte gern Wasser', id: 'Saya mau air putih', tr: 'Su istiyorum', ko: '물 주세요', ja: 'お水をください' },
  'i want to eat': { en: 'I want to eat', es: 'Quiero comer', fr: 'Je veux manger', ru: 'Я хочу есть', pt: 'Quero comer', de: 'Ich möchte essen', id: 'Saya ingin makan', tr: 'Yemek istiyorum', ko: '먹고 싶어요', ja: '食べたいです' },
  'i want to drink': { en: 'I want to drink', es: 'Quiero beber', fr: 'Je veux boire', ru: 'Я хочу пить', pt: 'Quero beber', de: 'Ich möchte trinken', id: 'Saya ingin minum', tr: 'İçmek istiyorum', ko: '마시고 싶어요', ja: '飲みたいです' },
  'what do you recommend?': { en: 'What do you recommend?', es: '¿Qué recomienda?', fr: 'Que recommandez-vous ?', ru: 'Что вы порекомендуете?', pt: 'O que você recomenda?', de: 'Was empfehlen Sie?', id: 'Apa yang Anda rekomendasikan?', tr: 'Ne tavsiye edersiniz?', ko: '무엇을 추천하시나요?', ja: 'おすすめは何ですか？' },
  'this is delicious!': { en: 'This is delicious!', es: '¡Está delicioso!', fr: 'C\'est délicieux !', ru: 'Это очень вкусно!', pt: 'Isto está delicioso!', de: 'Das ist köstlich!', id: 'Ini enak sekali!', tr: 'Bu çok lezzetli!', ko: '정말 맛있어요!', ja: 'とても美味しいです！' },
  'can i have the check, please?': { en: 'Can I have the check, please?', es: 'La cuenta, por favor', fr: 'L\'addition, s\'il vous plaît', ru: 'Счёт, пожалуйста', pt: 'A conta, por favor', de: 'Die Rechnung, bitte', id: 'Minta bonnya, tolong', tr: 'Hesap, lütfen' },
  'the bill / check, please': { en: 'The check, please', es: 'La cuenta, por favor', fr: 'L\'addition, s\'il vous plaît', ru: 'Счёт, пожалуйста', pt: 'A conta, por favor', de: 'Die Rechnung, bitte', id: 'Minta bonnya, tolong', tr: 'Hesap, lütfen' },
  'the check, please': { en: 'The check, please', es: 'La cuenta, por favor', fr: 'L\'addition, s\'il vous plaît', ru: 'Счёт, пожалуйста', pt: 'A conta, por favor', de: 'Die Rechnung, bitte', id: 'Minta bonnya, tolong', tr: 'Hesap, lütfen' },
  'how much does this cost?': { en: 'How much does this cost?', es: '¿Cuánto cuesta esto?', fr: 'Combien ça coûte ?', ru: 'Сколько это стоит?', pt: 'Quanto custa isto?', de: 'Was kostet das?', id: 'Berapa harganya?', tr: 'Bu ne kadar?', ko: '이것은 얼마인가요?', ja: 'これはいくらですか？' },
  'how much does it cost': { en: 'How much does it cost?', es: '¿Cuánto cuesta?', fr: 'Combien ça coûte ?', ru: 'Сколько стоит?', pt: 'Quanto custa?', de: 'Was kostet das?', id: 'Berapa harganya?', tr: 'Bu ne kadar?' },
  'do you accept credit cards?': { en: 'Do you accept credit cards?', es: '¿Aceptan tarjetas de crédito?', fr: 'Acceptez-vous les cartes bancaires ?', ru: 'Вы принимаете банковские карты?', pt: 'Vocês aceitam cartão de crédito?', de: 'Nehmen Sie Kreditkarten?', id: 'Apakah menerima kartu kredit?', tr: 'Kredi kartı geçiyor mu?' },
  'can i pay by card?': { en: 'Can I pay by card?', es: '¿Puedo pagar con tarjeta?', fr: 'Puis-je payer par carte ?', ru: 'Можно оплатить картой?', pt: 'Posso pagar com cartão?', de: 'Kann ich mit Karte zahlen?', id: 'Bisa bayar pakai kartu?', tr: 'Kartla ödeyebilir miyim?', ko: '카드로 결제할 수 있나요?', ja: 'カードで支払えますか？' },
  'i am just looking': { en: 'I am just looking', es: 'Solo estoy mirando', fr: 'Je regarde seulement', ru: 'Я просто смотрю', pt: 'Só estou olhando', de: 'Ich schaue nur', id: 'Saya hanya melihat-lihat', tr: 'Sadece bakıyorum', ko: '그냥 구경하는 중이에요', ja: '見ているだけです' },
  'i am just looking, thank you': { en: 'I am just looking, thank you', es: 'Solo estoy mirando, gracias', fr: 'Je regarde seulement, merci', ru: 'Я просто смотрю, спасибо', pt: 'Só estou olhando, obrigado', de: 'Ich schaue nur, danke', id: 'Saya hanya melihat-lihat', tr: 'Sadece bakıyorum, teşekkürler', ko: '그냥 둘러보는 거예요, 감사합니다', ja: '見ているだけです、ありがとう' },
  'do you have this in another size?': { en: 'Do you have this in another size?', es: '¿Tiene esto en otra talla?', fr: 'Avez-vous ceci dans une autre taille ?', ru: 'У вас есть другой размер?', pt: 'Tem isto em outro tamanho?', de: 'Haben Sie das in einer anderen Größe?', id: 'Apakah ada ukuran lain?', tr: 'Bunun başka bedeni var mı?', ko: '다른 사이즈가 있나요?', ja: '別のサイズはありますか？' },
  'it is too expensive': { en: 'It is too expensive', es: 'Es demasiado caro', fr: 'C\'est trop cher', ru: 'Это слишком дорого', pt: 'É muito caro', de: 'Das ist zu teuer', id: 'Ini terlalu mahal', tr: 'Bu çok pahalı' },
  'i need a doctor': { en: 'I need a doctor', es: 'Necesito un médico', fr: 'J\'ai besoin d\'un médecin', ru: 'Мне нужен врач', pt: 'Preciso de um médico', de: 'Ich brauche einen Arzt', id: 'Saya butuh dokter', tr: 'Doktora ihtiyacım var' },
  'i don\'t feel well': { en: 'I don\'t feel well', es: 'No me siento bien', fr: 'Je ne me sens pas bien', ru: 'Я плохо себя чувствую', pt: 'Não estou me sentindo bem', de: 'Ich fühle mich nicht wohl', id: 'Saya merasa kurang sehat', tr: 'Kendimi iyi hissetmiyorum' },
  'call the police': { en: 'Call the police', es: 'Llame a la policía', fr: 'Appelez la police', ru: 'Вызовите полицию', pt: 'Chame a polícia', de: 'Rufen Sie die Polizei', id: 'Panggil polisi', tr: 'Polisi arayın', ko: '경찰을 불러주세요', ja: '警察を呼んでください' },
  'i lost my passport': { en: 'I lost my passport', es: 'Perdí mi pasaporte', fr: 'J\'ai perdu mon passeport', ru: 'Я потерял(а) свой паспорт', pt: 'Perdi meu passaporte', de: 'Ich habe meinen Reisepass verloren', id: 'Saya kehilangan paspor saya', tr: 'Pasaportumu kaybettim', ko: '여권을 잃어버렸어요', ja: 'パスポートを紛失しました' },

  // Time expressions
  'what time is it?': { en: 'What time is it?', es: '¿Qué hora es?', fr: 'Quelle heure est-il ?', ru: 'Который час?', pt: 'Que horas são?', de: 'Wie spät ist es?', id: 'Jam berapa sekarang?', tr: 'Saat kaç?' },
  'what time is it now?': { en: 'What time is it now?', es: '¿Qué hora es ahora?', fr: 'Quelle heure est-il maintenant ?', ru: 'Сколько сейчас времени?', pt: 'Que horas são agora?', de: 'Wie viel Uhr ist es jetzt?', id: 'Jam berapa sekarang?', tr: 'Şu an saat kaç?', ko: '지금 몇 시인가요?', ja: '今何時ですか？' },
  'at what time?': { en: 'At what time?', es: '¿A qué hora?', fr: 'À quelle heure ?', ru: 'Во сколько?', pt: 'A que horas?', de: 'Um wie viel Uhr?', id: 'Jam berapa?', tr: 'Saat kaçta?', ko: '몇 시에?', ja: '何時に？' },
  'now': { en: 'Now', es: 'Ahora', fr: 'Maintenant', ru: 'Сейчас', pt: 'Agora', de: 'Jetzt', id: 'Sekarang', tr: 'Şimdi', ko: '지금', ja: '今' },
  'hour': { en: 'Hour', es: 'Hora', fr: 'Heure', ru: 'Час', pt: 'Hora', de: 'Stunde', id: 'Jam', tr: 'Saat', ko: '시간 / 시', ja: '時間 / 時' },
  'minute': { en: 'Minute', es: 'Minuto', fr: 'Minute', ru: 'Минута', pt: 'Minuto', de: 'Minute', id: 'Menit', tr: 'Dakika', ko: '분', ja: '分' },
  'second': { en: 'Second', es: 'Segundo', fr: 'Seconde', ru: 'Секунда', pt: 'Segundo', de: 'Sekunde', id: 'Detik', tr: 'Saniye', ko: '초', ja: '秒' },
  'one o\'clock': { en: 'One o\'clock (1:00)', es: 'Es la una (1:00)', fr: 'Il est une heure (1:00)', ru: 'Один час (1:00)', pt: 'É uma hora (1:00)', de: 'Es ist ein Uhr (1:00)', id: 'Jam satu (1:00)', tr: 'Saat bir (1:00)', ko: '시계', ja: '時計' },
  'it is one o\'clock on the dot': { en: 'It is 1:00 sharp', es: 'Es la una en punto', fr: 'Il est une heure pile', ru: 'Ровно один час (1:00)', pt: 'É uma hora em ponto', de: 'Es ist Punkt ein Uhr', id: 'Sekarang jam satu tepat', tr: 'Saat tam bir' },
  'two o\'clock': { en: 'Two o\'clock (2:00)', es: 'Son las dos (2:00)', fr: 'Il est deux heures (2:00)', ru: 'Два часа (2:00)', pt: 'São duas horas (2:00)', de: 'Es ist zwei Uhr (2:00)', id: 'Jam dua (2:00)', tr: 'Saat iki (2:00)', ko: '시계', ja: '時計' },
  'it is two o\'clock': { en: 'It is 2:00', es: 'Son las dos', fr: 'Il est deux heures', ru: 'Два часа (2:00)', pt: 'São duas horas', de: 'Es ist zwei Uhr', id: 'Sekarang jam dua', tr: 'Saat iki', ko: '시계', ja: '時計' },
  'three o\'clock': { en: 'Three o\'clock (3:00)', es: 'Son las tres (3:00)', fr: 'Il est trois heures (3:00)', ru: 'Три часа (3:00)', pt: 'São três horas (3:00)', de: 'Es ist drei Uhr (3:00)', id: 'Jam tiga (3:00)', tr: 'Saat üç (3:00)', ko: '시계', ja: '時計' },
  'exactly three o\'clock': { en: 'Exactly three o\'clock (3:00)', es: 'Las tres en punto', fr: 'Trois heures pile', ru: 'Ровно три часа (3:00)', pt: 'Três horas em ponto', de: 'Punkt drei Uhr', id: 'Jam tiga tepat', tr: 'Saat tam üç', ko: '시계', ja: '時計' },
  'four o\'clock': { en: 'Four o\'clock (4:00)', es: 'Son las cuatro (4:00)', fr: 'Il est quatre heures (4:00)', ru: 'Четыре часа (4:00)', pt: 'São quatro horas (4:00)', de: 'Es ist vier Uhr (4:00)', id: 'Jam empat (4:00)', tr: 'Saat dört (4:00)', ko: '시계', ja: '時計' },
  'five o\'clock': { en: 'Five o\'clock (5:00)', es: 'Son las cinco (5:00)', fr: 'Il est cinq heures (5:00)', ru: 'Пять часов (5:00)', pt: 'São cinco horas (5:00)', de: 'Es ist fünf Uhr (5:00)', id: 'Jam lima (5:00)', tr: 'Saat beş (5:00)', ko: '시계', ja: '時計' },
  'six o\'clock': { en: 'Six o\'clock (6:00)', es: 'Son las seis (6:00)', fr: 'Il est six heures (6:00)', ru: 'Шесть часов (6:00)', pt: 'São seis horas (6:00)', de: 'Es ist sechs Uhr (6:00)', id: 'Jam enam (6:00)', tr: 'Saat altı (6:00)', ko: '시계', ja: '時計' },
  'seven o\'clock': { en: 'Seven o\'clock (7:00)', es: 'Son las siete (7:00)', fr: 'Il est sept heures (7:00)', ru: 'Семь часов (7:00)', pt: 'São sete horas (7:00)', de: 'Es ist sieben Uhr (7:00)', id: 'Jam tujuh (7:00)', tr: 'Saat yedi (7:00)', ko: '시계', ja: '時計' },
  'eight o\'clock': { en: 'Eight o\'clock (8:00)', es: 'Son las ocho (8:00)', fr: 'Il est huit heures (8:00)', ru: 'Восемь часов (8:00)', pt: 'São oito horas (8:00)', de: 'Es ist acht Uhr (8:00)', id: 'Jam delapan (8:00)', tr: 'Saat sekiz (8:00)', ko: '시계', ja: '時計' },
  'nine o\'clock': { en: 'Nine o\'clock (9:00)', es: 'Son las nueve (9:00)', fr: 'Il est neuf heures (9:00)', ru: 'Девять часов (9:00)', pt: 'São nove horas (9:00)', de: 'Es ist neun Uhr (9:00)', id: 'Jam sembilan (9:00)', tr: 'Saat dokuz (9:00)', ko: '시계', ja: '時計' },
  'ten o\'clock': { en: 'Ten o\'clock (10:00)', es: 'Son las diez (10:00)', fr: 'Il est dix heures (10:00)', ru: 'Десять часов (10:00)', pt: 'São dez horas (10:00)', de: 'Es ist zehn Uhr (10:00)', id: 'Jam sepuluh (10:00)', tr: 'Saat on (10:00)', ko: '시계', ja: '時計' },
  'eleven o\'clock': { en: 'Eleven o\'clock (11:00)', es: 'Son las once (11:00)', fr: 'Il est onze heures (11:00)', ru: 'Одиннадцать часов (11:00)', pt: 'São onze horas (11:00)', de: 'Es ist elf Uhr (11:00)', id: 'Jam sebelas (11:00)', tr: 'Saat on bir (11:00)', ko: '시계', ja: '時計' },
  'twelve o\'clock': { en: 'Twelve o\'clock (12:00)', es: 'Son las doce (12:00)', fr: 'Il est douze heures (12:00)', ru: 'Двенадцать часов (12:00)', pt: 'São doze horas (12:00)', de: 'Es ist zwölf Uhr (12:00)', id: 'Jam dua belas (12:00)', tr: 'Saat on iki (12:00)', ko: '시계', ja: '時計' },
  'half past two': { en: 'Half past two (2:30)', es: 'Las dos y media (2:30)', fr: 'Deux heures et demie (2:30)', ru: 'Половина третьего (2:30)', pt: 'Duas e meia (2:30)', de: 'Halb drei (2:30)', id: 'Setengah tiga (2:30)', tr: 'Saat iki buçuk (2:30)' },
  'quarter to three': { en: 'Quarter to three (2:45)', es: 'Las tres menos cuarto (2:45)', fr: 'Trois heures moins le quart (2:45)', ru: 'Без четверти три (2:45)', pt: 'Quinze para as três (2:45)', de: 'Viertel vor drei (2:45)', id: 'Jam tiga kurang seperempat (2:45)', tr: 'Saat üçe çeyrek var (2:45)' },
  'it is 3:30 (half past three)': { en: '3:30 (half past three)', es: 'Son las tres y media', fr: 'Il est trois heures et demie', ru: 'Половина четвёртого (3:30)', pt: 'São três e meia', de: 'Es ist halb vier', id: 'Sekarang jam setengah empat', tr: 'Saat üç buçuk' },
  'it is 4:15 (quarter past four)': { en: '4:15 (quarter past four)', es: 'Son las cuatro y cuarto', fr: 'Il est quatre heures et quart', ru: 'Четверть пятого (4:15)', pt: 'São quatro e quinze', de: 'Es ist Viertel nach vier', id: 'Sekarang jam empat lewat seperempat', tr: 'Saat dördü çeyrek geçiyor' },
  'it is 4:45 (quarter to five)': { en: '4:45 (quarter to five)', es: 'Son las cinco menos cuarto', fr: 'Il est cinq heures moins le quart', ru: 'Без четверти пять (4:45)', pt: 'São quinze para as cinco', de: 'Es ist Viertel vor fünf', id: 'Sekarang jam lima kurang seperempat', tr: 'Saat beşe çeyrek var' },
  '3:30 (half past three)': { en: '3:30 (half past three)', es: 'Son las tres y media', fr: 'Il est trois heures et demie', ru: 'Половина четвёртого (3:30)', pt: 'São três e meia', de: 'Es ist halb vier', id: 'Sekarang jam setengah empat', tr: 'Saat üç buçuk' },
  '4:15 (quarter past four)': { en: '4:15 (quarter past four)', es: 'Son las cuatro y cuarto', fr: 'Il est quatre heures et quart', ru: 'Четверть пятого (4:15)', pt: 'São quatro e quinze', de: 'Es ist Viertel nach vier', id: 'Sekarang jam empat lewat seperempat', tr: 'Saat dördü çeyrek geçiyor' },
  '4:45 (quarter to five)': { en: '4:45 (quarter to five)', es: 'Son las cinco menos cuarto', fr: 'Il est cinq heures moins le quart', ru: 'Без четверти пять (4:45)', pt: 'São quinze para as cinco', de: 'Es ist Viertel vor fünf', id: 'Sekarang jam lima kurang seperempat', tr: 'Saat beşe çeyrek var' },
  'it is 1:00 sharp': { en: 'It is 1:00 sharp', es: 'Es la una en punto', fr: 'Il est une heure pile', ru: 'Ровно один час', pt: 'É uma hora em ponto', de: 'Es ist Punkt ein Uhr', id: 'Sekarang jam satu tepat', tr: 'Saat tam bir' },
  'it is 2:00': { en: 'It is 2:00', es: 'Son las dos', fr: 'Il est deux heures', ru: 'Два часа', pt: 'São duas horas', de: 'Es ist zwei Uhr', id: 'Sekarang jam dua', tr: 'Saat iki' },
  'hi / bye': { en: 'Hi / Bye', es: 'Hola', fr: 'Salut', ru: 'Привет', pt: 'Olá', de: 'Hallo', id: 'Halo', tr: 'Merhaba', ko: '안녕', ja: 'やあ' },
  'es ist elf uhr': { en: 'Eleven o\'clock (11:00)', es: 'Son las once', fr: 'Il est onze heures', ru: 'Одиннадцать часов (11:00)', pt: 'São onze horas', de: 'Es ist elf Uhr', id: 'Jam sebelas', tr: 'Saat on bir' },
  'son las cuatro y cuarto': { en: '4:15 (quarter past four)', es: 'Son las cuatro y cuarto', fr: 'Il est quatre heures et quart', ru: 'Четверть пятого (4:15)', pt: 'São quatro e quinze', de: 'Es ist Viertel nach vier', id: 'Sekarang jam empat lewat seperempat', tr: 'Saat dördü çeyrek geçiyor' },
  'son las cinco menos cuarto': { en: '4:45 (quarter to five)', es: 'Son las cinco menos cuarto', fr: 'Il est cinq heures moins le quart', ru: 'Без четверти пять (4:45)', pt: 'São quinze para as cinco', de: 'Es ist Viertel vor fünf', id: 'Sekarang jam lima kurang seperempat', tr: 'Saat beşe çeyrek var' },
  'il est quatre heures et quart': { en: '4:15 (quarter past four)', es: 'Son las cuatro y cuarto', fr: 'Il est quatre heures et quart', ru: 'Четверть пятого (4:15)', pt: 'São quatro e quinze', de: 'Es ist Viertel nach vier', id: 'Sekarang jam empat lewat seperempat', tr: 'Saat dördü çeyrek geçiyor' },
  'il est cinq heures moins le quart': { en: '4:45 (quarter to five)', es: 'Son las cinco menos cuarto', fr: 'Il est cinq heures moins le quart', ru: 'Без четверти пять (4:45)', pt: 'São quinze para as cinco', de: 'Es ist Viertel vor fünf', id: 'Sekarang jam lima kurang seperempat', tr: 'Saat beşe çeyrek var' },
  'half past twelve (12:30)': { en: 'Half past twelve (12:30)', es: 'Las doce y media (12:30)', fr: 'Midi et demi (12:30)', ru: 'Половина первого (12:30)', pt: 'Meio-dia e meia (12:30)', de: 'Halb eins (12:30)', id: 'Setengah satu siang (12:30)', tr: 'Saat on iki buçuk (12:30)' },
  'ten to two (1:50)': { en: 'Ten to two (1:50)', es: 'Las dos menos diez (1:50)', fr: 'Deux heures moins dix (1:50)', ru: 'Без десяти два (1:50)', pt: 'Dez para as duas (1:50)', de: 'Zehn vor zwei (1:50)', id: 'Jam dua kurang sepuluh (1:50)', tr: 'Saat ikiye on var (1:50)' },
  'half an hour': { en: 'Half an hour', es: 'Media hora', fr: 'Une demi-heure', ru: 'Полчаса', pt: 'Meia hora', de: 'Eine halbe Stunde', id: 'Setengah jam', tr: 'Yarım saat', ko: '30분 / 반 시간', ja: '30分 / 半時間' },
  'quarter of an hour': { en: 'Quarter of an hour', es: 'Un cuarto de hora', fr: 'Un quart d\'heure', ru: 'Четверть часа', pt: 'Um quarto de hora', de: 'Eine Viertelstunde', id: 'Seperempat jam', tr: 'Çeyrek saat', ko: '15분', ja: '15分' },
  'in the morning (a.m.)': { en: 'In the morning (a.m.)', es: 'De la mañana (a.m.)', fr: 'Du matin', ru: 'Утра (утром)', pt: 'Da manhã', de: 'Morgens', id: 'Di pagi hari', tr: 'Sabahleyin', ko: '오전에 (a.m.)', ja: '午前に' },
  'in the afternoon (p.m.)': { en: 'In the afternoon (p.m.)', es: 'De la tarde (p.m.)', fr: 'De l\'après-midi', ru: 'Дня (днём)', pt: 'Da tarde', de: 'Nachmittags', id: 'Di siang hari', tr: 'Öğleden sonra', ko: '오후에 (p.m.)', ja: '午後に' },
  'in the evening (p.m.)': { en: 'In the evening (p.m.)', es: 'De la noche / tarde (p.m.)', fr: 'Du soir', ru: 'Вечера (вечером)', pt: 'Da noite', de: 'Abends', id: 'Di sore hari', tr: 'Akşamleyin' },
  'at night': { en: 'At night', es: 'Por la noche', fr: 'La nuit', ru: 'Ночи (ночью)', pt: 'À noite', de: 'Nachts', id: 'Di malam hari', tr: 'Geceleyin', ko: '밤에', ja: '夜に' },
  'noon / midday': { en: 'Noon / Midday', es: 'Mediodía', fr: 'Midi', ru: 'Полдень', pt: 'Meio-dia', de: 'Mittag', id: 'Tengah hari', tr: 'Öğle' },
  'midnight': { en: 'Midnight', es: 'Medianoche', fr: 'Minuit', ru: 'Полночь', pt: 'Meia-noite', de: 'Mitternacht', id: 'Tengah malam', tr: 'Gece yarısı' },
  'on time': { en: 'On time', es: 'A tiempo / Puntual', fr: 'À l\'heure', ru: 'Вовремя', pt: 'No horário', de: 'Pünktlich', id: 'Tepat waktu', tr: 'Zamanında', ko: '정각에 / 제시간에', ja: '時間通りに' },
  'early': { en: 'Early', es: 'Temprano', fr: 'Tôt', ru: 'Рано', pt: 'Cedo', de: 'Früh', id: 'Lebih awal', tr: 'Erken', ko: '일찍', ja: '早い' },
  'late': { en: 'Late', es: 'Tarde', fr: 'En retard / Tard', ru: 'Поздно', pt: 'Tarde / Atrasado', de: 'Spät', id: 'Terlambat', tr: 'Geç', ko: '늦게', ja: '遅い' },

  // Spanish & French curriculum translation variants
  'hello! / hi!': { en: 'Hello! / Hi!', es: '¡Hola!', fr: 'Bonjour / Salut', ru: 'Привет! / Здравствуйте!', pt: 'Olá! / Oi!', de: 'Hallo!', id: 'Halo!', tr: 'Merhaba!' },
  'hello / good morning': { en: 'Hello / Good morning', es: 'Hola / Buenos días', fr: 'Bonjour', ru: 'Здравствуйте / Доброе утро', pt: 'Olá / Bom dia', de: 'Hallo / Guten Morgen', id: 'Halo / Selamat pagi', tr: 'Merhaba / Günaydın', ko: '안녕하세요', ja: 'こんにちは' },
  'good evening / good night': { en: 'Good evening / Good night', es: 'Buenas noches', fr: 'Bonsoir / Bonne nuit', ru: 'Добрый вечер / Спокойной ночи', pt: 'Boa noite', de: 'Guten Abend / Gute Nacht', id: 'Selamat malam', tr: 'İyi akşamlar', ko: '좋은 저녁입니다', ja: 'こんばんは' },
  'hi / bye (informal)': { en: 'Hi / Bye', es: 'Hola / Chao', fr: 'Salut', ru: 'Привет / Пока', pt: 'Oi / Tchau', de: 'Hallo / Tschüss', id: 'Hai / Dadah', tr: 'Selam / Hoşça kal', ko: '안녕', ja: 'やあ' },
  'how are you? (informal)': { en: 'How are you?', es: '¿Cómo estás?', fr: 'Comment vas-tu ? / Ça va ?', ru: 'Как дела?', pt: 'Tudo bem?', de: 'Wie geht es dir?', id: 'Apa kabar?', tr: 'Nasılsın?', ko: '잘 지내세요?', ja: 'お元気ですか？' },
  'how are you? (formal)': { en: 'How are you? (formal)', es: '¿Cómo está usted?', fr: 'Comment allez-vous ?', ru: 'Как ваши дела?', pt: 'Como vai você?', de: 'Wie geht es Ihnen?', id: 'Apa kabar Anda?', tr: 'Nasılsınız?' },
  'how are you? / doing okay? (informal)': { en: 'How are you?', es: '¿Cómo estás? / ¿Qué tal?', fr: 'Ça va ?', ru: 'Как дела?', pt: 'Tudo bem?', de: 'Wie geht es dir?', id: 'Apa kabar?', tr: 'Nasılsın?', ko: '잘 지내세요?', ja: 'お元気ですか？' },
  'i am doing well, thank you': { en: 'I am doing well, thank you', es: 'Estoy bien, gracias', fr: 'Ça va bien, merci', ru: 'Всё хорошо, спасибо', pt: 'Estou bem, obrigado', de: 'Mir geht es gut, danke', id: 'Kabar baik, terima kasih', tr: 'İyiyim, teşekkürler' },
  'and you? (formal)': { en: 'And you?', es: '¿Y usted?', fr: 'Et vous ?', ru: 'А вы?', pt: 'E você?', de: 'Und Ihnen?', id: 'Dan Anda?', tr: 'Ya siz?', ko: '당신은요?', ja: 'あなたは？' },
  'please (formal)': { en: 'Please', es: 'Por favor', fr: 'S\'il vous plaît', ru: 'Пожалуйста', pt: 'Por favor', de: 'Bitte', id: 'Tolong', tr: 'Lütfen', ko: '제발 / 부탁합니다', ja: 'お願いします' },
  'what is your name? (formal)': { en: 'What is your name?', es: '¿Cómo se llama usted?', fr: 'Comment vous appelez-vous ?', ru: 'Как вас зовут?', pt: 'Qual é o seu nome?', de: 'Wie heißen Sie?', id: 'Siapa nama Anda?', tr: 'Adınız nedir?', ko: '성함이 어떻게 되시나요?', ja: 'お名前は何ですか？' },
  'pleased to meet you': { en: 'Pleased to meet you', es: 'Mucho gusto / Encantado', fr: 'Enchanté(e)', ru: 'Очень приятно', pt: 'Muito prazer', de: 'Freut mich', id: 'Senang bertemu dengan Anda', tr: 'Memnun oldum' },
  'where are the restrooms?': { en: 'Where are the restrooms?', es: '¿Dónde está el baño?', fr: 'Où sont les toilettes ?', ru: 'Где находится туалет?', pt: 'Onde fica o banheiro?', de: 'Wo ist die Toilette?', id: 'Di mana kamar mandi?', tr: 'Tuvalet nerede?' },
  'can you repeat?': { en: 'Can you repeat?', es: '¿Puede repetir?', fr: 'Pouvez-vous répéter ?', ru: 'Повторите, пожалуйста', pt: 'Pode repetir?', de: 'Können Sie wiederholen?', id: 'Bisa diulangi?', tr: 'Tekrar edebilir misiniz?', ko: '다시 한 번 말씀해 주시겠어요?', ja: '繰り返してもらえますか？' },
  'see you soon': { en: 'See you soon', es: 'Hasta pronto / Hasta luego', fr: 'À bientôt', ru: 'До скорого', pt: 'Até breve', de: 'Bis bald', id: 'Sampai jumpa lagi', tr: 'Yakında görüşürüz', ko: '곧 봐요', ja: 'またね' },
  'time / weather': { en: 'Time / Weather', es: 'Tiempo', fr: 'Temps', ru: 'Время / Погода', pt: 'Tempo', de: 'Zeit / Wetter', id: 'Waktu / Cuaca', tr: 'Zaman / Hava', ko: '시간', ja: '時間' },
  'tomorrow / morning': { en: 'Tomorrow / Morning', es: 'Mañana', fr: 'Demain / Matin', ru: 'Завтра / Утро', pt: 'Amanhã / Manhã', de: 'Morgen', id: 'Besok / Pagi', tr: 'Yarın / Sabah', ko: '내일', ja: '明日' },
  'office / desk': { en: 'Office / Desk', es: 'Oficina / Escritorio', fr: 'Bureau', ru: 'Офис / Стол', pt: 'Escritório', de: 'Büro', id: 'Kantor / Meja', tr: 'Ofis / Masa', ko: '사무실', ja: '事務所 / オフィス' },
  'money / silver': { en: 'Money', es: 'Dinero', fr: 'Argent', ru: 'Деньги', pt: 'Dinheiro', de: 'Geld', id: 'Uang', tr: 'Para', ko: '돈', ja: 'お金' },
  'train station': { en: 'Train station', es: 'Estación de tren', fr: 'Gare', ru: 'Вокзал / Станция', pt: 'Estação de trem', de: 'Bahnhof', id: 'Stasiun kereta', tr: 'Tren istasyonu', ko: '기차역', ja: '鉄道駅' },
  'boy / child': { en: 'Boy / Child', es: 'Niño', fr: 'Garçon / Enfant', ru: 'Мальчик / Ребёнок', pt: 'Menino / Criança', de: 'Junge / Kind', id: 'Anak laki-laki / Anak', tr: 'Erkek çocuk / Çocuk', ko: '소년 / 남자아이', ja: '男の子' },
  'one hundred': { en: 'One hundred', es: 'Cien', fr: 'Cent', ru: 'Сто', pt: 'Cem', de: 'Hundert', id: 'Seratus', tr: 'Yüz' },
  'one thousand': { en: 'One thousand', es: 'Mil', fr: 'Mille', ru: 'Тысяча', pt: 'Mil', de: 'Tausend', id: 'Seribu', tr: 'Bin' },
  'is it far from here?': { en: 'Is it far from here?', es: '¿Está lejos de aquí?', fr: 'Est-ce loin d\'ici ?', ru: 'Это далеко отсюда?', pt: 'É longe daqui?', de: 'Ist es weit von hier?', id: 'Apakah jauh dari sini?', tr: 'Buradan uzak mı?', ko: '여기서 먼가요?', ja: 'ここから遠いですか？' },
  'could you speak slower, please?': { en: 'Could you speak slower, please?', es: 'Hable más despacio, por favor', fr: 'Parlez plus lentement, s\'il vous plaît', ru: 'Говорите медленнее, пожалуйста', pt: 'Fale mais devagar, por favor', de: 'Bitte sprechen Sie langsamer', id: 'Bisa bicara lebih pelan?', tr: 'Daha yavaş konuşabilir misiniz?' },

  // Colors & Descriptions Pack
  'red': { en: 'Red', es: 'Rojo', fr: 'Rouge', ru: 'Красный', pt: 'Vermelho', de: 'Rot', id: 'Merah', tr: 'Kırmızı', ko: '빨간색', ja: '赤' },
  'blue': { en: 'Blue', es: 'Azul', fr: 'Bleu', ru: 'Синий', pt: 'Azul', de: 'Blau', id: 'Biru', tr: 'Mavi', ko: '파란색', ja: '青' },
  'green': { en: 'Green', es: 'Verde', fr: 'Vert', ru: 'Зелёный', pt: 'Verde', de: 'Grün', id: 'Hijau', tr: 'Yeşil', ko: '초록색', ja: '緑' },
  'black': { en: 'Black', es: 'Negro', fr: 'Noir', ru: 'Чёрный', pt: 'Preto', de: 'Schwarz', id: 'Hitam', tr: 'Siyah', ko: '검은색', ja: '黒' },
  'white': { en: 'White', es: 'Blanco', fr: 'Blanc', ru: 'Белый', pt: 'Branco', de: 'Weiß', id: 'Putih', tr: 'Beyaz', ko: '흰색', ja: '白' },
  'purple': { en: 'Purple', es: 'Morado', fr: 'Violet', ru: 'Фиолетовый', pt: 'Roxo', de: 'Lila', id: 'Ungu', tr: 'Mor', ko: '보라색', ja: '紫' },
  'pink': { en: 'Pink', es: 'Rosa', fr: 'Rose', ru: 'Розовый', pt: 'Rosa', de: 'Rosa', id: 'Merah muda', tr: 'Pembe', ko: '분홍색', ja: 'ピンク' },
  'gray': { en: 'Gray', es: 'Gris', fr: 'Gris', ru: 'Серый', pt: 'Cinza', de: 'Grau', id: 'Abu-abu', tr: 'Gri', ko: '회색', ja: '灰色 / グレー' },

  // Weather & Seasons Pack
  'wind': { en: 'Wind', es: 'Viento', fr: 'Vent', ru: 'Ветер', pt: 'Vento', de: 'Wind', id: 'Angin', tr: 'Rüzgar', ko: '바람', ja: '風' },
  'cloud': { en: 'Cloud', es: 'Nube', fr: 'Nuage', ru: 'Облако', pt: 'Nuvem', de: 'Wolke', id: 'Awan', tr: 'Bulut', ko: '구름', ja: '雲' },
  'storm': { en: 'Storm', es: 'Tormenta', fr: 'Orage', ru: 'Гроза', pt: 'Tempestade', de: 'Sturm', id: 'Badai', tr: 'Fırtına', ko: '폭풍', ja: '嵐' },

  // Tech & Remote Work Pack
  'internet': { en: 'Internet', es: 'Internet', fr: 'Internet', ru: 'Интернет', pt: 'Internet', de: 'Internet', id: 'Internet', tr: 'İnternet', ko: '인터넷', ja: 'インターネット' },
  'password': { en: 'Password', es: 'Contraseña', fr: 'Mot de passe', ru: 'Пароль', pt: 'Senha', de: 'Passwort', id: 'Kata sandi', tr: 'Şifre', ko: '비밀번호', ja: 'パスワード' },
  'email': { en: 'Email', es: 'Correo electrónico', fr: 'Courriel', ru: 'Электронная почта', pt: 'E-mail', de: 'E-Mail', id: 'Email', tr: 'E-posta', ko: '이메일', ja: 'メール' },
  'screen': { en: 'Screen', es: 'Pantalla', fr: 'Écran', ru: 'Экран', pt: 'Tela', de: 'Bildschirm', id: 'Layar', tr: 'Ekran', ko: '화면 / 스크린', ja: '画面 / スクリーン' },
  'meeting': { en: 'Meeting', es: 'Reunión', fr: 'Réunion', ru: 'Встреча', pt: 'Reunião', de: 'Besprechung', id: 'Rapat', tr: 'Toplantı', ko: '회의 / 모임', ja: '会議' },
  'file': { en: 'File', es: 'Archivo', fr: 'Fichier', ru: 'Файл', pt: 'Arquivo', de: 'Datei', id: 'Berkas', tr: 'Dosya', ko: '파일', ja: 'ファイル' },
  'link': { en: 'Link', es: 'Enlace', fr: 'Lien', ru: 'Ссылка', pt: 'Link', de: 'Link', id: 'Tautan', tr: 'Bağlantı', ko: '링크', ja: 'リンク' },
  'code': { en: 'Code', es: 'Código', fr: 'Code', ru: 'Код', pt: 'Código', de: 'Code', id: 'Kode', tr: 'Kod', ko: '코드', ja: 'コード' },
  'error': { en: 'Error', es: 'Error', fr: 'Erreur', ru: 'Ошибка', pt: 'Erro', de: 'Fehler', id: 'Kesalahan', tr: 'Hata', ko: '오류 / 에러', ja: 'エラー' },
  'battery': { en: 'Battery', es: 'Batería', fr: 'Batterie', ru: 'Батарея', pt: 'Bateria', de: 'Batterie', id: 'Baterai', tr: 'Pil', ko: '배터리', ja: 'バッテリー / 電池' },
  'can you hear me?': { en: 'Can you hear me?', es: '¿Me escucha?', fr: 'Vous m\'entendez ?', ru: 'Вы меня слышите?', pt: 'Você me ouve?', de: 'Können Sie mich hören?', id: 'Apakah Anda mendengar saya?', tr: 'Beni duyabiliyor musunuz?' },
  'can you see my screen?': { en: 'Can you see my screen?', es: '¿Puede ver mi pantalla?', fr: 'Voyez-vous mon écran ?', ru: 'Видно мой экран?', pt: 'Você vê minha tela?', de: 'Können Sie meinen Bildschirm sehen?', id: 'Apakah Anda melihat layar saya?', tr: 'Ekranımı görebiliyor musunuz?' },
  'let me share my screen': { en: 'Let me share my screen', es: 'Voy a compartir mi pantalla', fr: 'Je vais partager mon écran', ru: 'Я покажу свой экран', pt: 'Vou compartilhar minha tela', de: 'Ich teile meinen Bildschirm', id: 'Saya bagikan layar saya', tr: 'Ekranımı paylaşayım', ko: '화면을 공유하겠습니다', ja: '画面を共有します' },
  'what is the wi-fi password?': { en: 'What is the Wi-Fi password?', es: '¿Cuál es la contraseña del wifi?', fr: 'Quel est le mot de passe du Wi-Fi ?', ru: 'Какой пароль от вайфая?', pt: 'Qual é a senha do Wi-Fi?', de: 'Wie lautet das WLAN-Passwort?', id: 'Apa kata sandi Wi-Fi?', tr: 'Wi-Fi şifresi nedir?' },
  'the internet connection is slow': { en: 'The internet connection is slow', es: 'La conexión a internet es lenta', fr: 'La connexion internet est lente', ru: 'Медленное подключение к интернету', pt: 'A conexão com a internet está lenta', de: 'Die Internetverbindung ist langsam', id: 'Koneksi internetnya lambat', tr: 'İnternet bağlantısı yavaş', ko: '인터넷 연결이 느려요', ja: 'インターネット接続が遅いです' },
  'can you send it by email?': { en: 'Can you send it by email?', es: '¿Puede enviarlo por correo?', fr: 'Pouvez-vous l\'envoyer par courriel ?', ru: 'Можете отправить по почте?', pt: 'Pode enviar por e-mail?', de: 'Können Sie es per E-Mail schicken?', id: 'Bisakah Anda kirim lewat email?', tr: 'E-posta ile gönderebilir misiniz?', ko: '이메일로 보내주실 수 있나요?', ja: 'メールで送っていただけますか？' },
  'my battery is almost dead': { en: 'My battery is almost dead', es: 'Mi batería está casi agotada', fr: 'Ma batterie est presque vide', ru: 'У меня почти села батарея', pt: 'Minha bateria está quase acabando', de: 'Mein Akku ist fast leer', id: 'Baterai saya hampir habis', tr: 'Şarjım bitmek üzere', ko: '배터리가 거의 다 됐어요', ja: 'バッテリーが切れそうです' },

  // Business & Office Pack
  'project': { en: 'Project', es: 'Proyecto', fr: 'Projet', ru: 'Проект', pt: 'Projeto', de: 'Projekt', id: 'Proyek', tr: 'Proje', ko: '프로젝트', ja: 'プロジェクト' },
  'client': { en: 'Client', es: 'Cliente', fr: 'Client', ru: 'Клиент', pt: 'Cliente', de: 'Kunde', id: 'Klien', tr: 'Müşteri', ko: '고객 / 클라이언트', ja: '顧客 / クライアント' },
  'team': { en: 'Team', es: 'Equipo', fr: 'Équipe', ru: 'Команда', pt: 'Equipe', de: 'Team', id: 'Tim', tr: 'Ekip', ko: '팀', ja: 'チーム' },
  'manager': { en: 'Manager', es: 'Gerente', fr: 'Directeur', ru: 'Руководитель', pt: 'Gerente', de: 'Manager', id: 'Manajer', tr: 'Yönetici', ko: '관리자 / 매니저', ja: 'マネージャー / 管理者' },
  'company': { en: 'Company', es: 'Empresa', fr: 'Entreprise', ru: 'Компания', pt: 'Empresa', de: 'Firma', id: 'Perusahaan', tr: 'Şirket', ko: '회사', ja: '会社' },
  'contract': { en: 'Contract', es: 'Contrato', fr: 'Contrat', ru: 'Контракт', pt: 'Contrato', de: 'Vertrag', id: 'Kontrak', tr: 'Sözleşme', ko: '계약 / 계약서', ja: '契約' },
  'schedule': { en: 'Schedule', es: 'Horario', fr: 'Horaire', ru: 'Расписание', pt: 'Horário', de: 'Zeitplan', id: 'Jadwal', tr: 'Takvim', ko: '일정 / 스케줄', ja: 'スケジュール / 日程' },
  'deadline': { en: 'Deadline', es: 'Fecha límite', fr: 'Date limite', ru: 'Срок', pt: 'Prazo', de: 'Frist', id: 'Tenggat waktu', tr: 'Son tarih', ko: '마감일 / 마감 시간', ja: '締め切り / 期限' },
  'invoice': { en: 'Invoice', es: 'Factura', fr: 'Facture', ru: 'Счёт', pt: 'Fatura', de: 'Rechnung', id: 'Faktur', tr: 'Fatura', ko: '청구서 / 인보이스', ja: '請求書' },
  'salary': { en: 'Salary', es: 'Salario', fr: 'Salaire', ru: 'Зарплата', pt: 'Salário', de: 'Gehalt', id: 'Gaji', tr: 'Maaş', ko: '급여 / 월급', ja: '給料' },
  'let\'s schedule a meeting': { en: 'Let\'s schedule a meeting / Let\'s plan a meeting / Are we planning a meeting', es: 'Programemos una reunión', fr: 'Planifions une réunion', ru: 'Давайте назначим встречу', pt: 'Vamos agendar uma reunião', de: 'Planen wir ein Meeting', id: 'Mari jadwalkan rapat', tr: 'Bir toplantı planlayalım' },
  'let\'s schedule a meeting / let\'s plan a meeting / are we planning a meeting / shall we plan a meeting': { en: 'Let\'s schedule a meeting / Let\'s plan a meeting / Are we planning a meeting', es: 'Programemos una reunión', fr: 'Planifions une réunion', ru: 'Давайте назначим встречу', pt: 'Vamos agendar uma reunião', de: 'Planen wir ein Meeting', id: 'Mari jadwalkan rapat', tr: 'Bir toplantı planlayalım' },
  'i will send you an email': { en: 'I will send you an email', es: 'Le enviaré un correo', fr: 'Je vous enverrai un courriel', ru: 'Я отправлю вам письмо', pt: 'Vou te enviar um e-mail', de: 'Ich schicke Ihnen eine E-Mail', id: 'Saya akan mengirim email kepada Anda', tr: 'Size bir e-posta göndereceğim' },
  'when is the deadline?': { en: 'When is the deadline?', es: '¿Cuándo es la fecha límite?', fr: 'Quelle est la date limite ?', ru: 'Какой крайний срок?', pt: 'Qual é o prazo?', de: 'Wann ist die Frist?', id: 'Kapan tenggat waktunya?', tr: 'Son teslim tarihi ne zaman?' },

  // Healthcare & Pharmacy Pack
  'medicine': { en: 'Medicine', es: 'Medicina', fr: 'Médicament', ru: 'Лекарство', pt: 'Remédio', de: 'Medikament', id: 'Obat', tr: 'İlaç', ko: '약', ja: '薬' },
  'pain': { en: 'Pain', es: 'Dolor', fr: 'Douleur', ru: 'Боль', pt: 'Dor', de: 'Schmerz', id: 'Rasa sakit', tr: 'Ağrı', ko: '통증 / 아픔', ja: '痛み' },
  'fever': { en: 'Fever', es: 'Fiebre', fr: 'Fièvre', ru: 'Температура', pt: 'Febre', de: 'Fieber', id: 'Demam', tr: 'Ateş', ko: '열', ja: '熱' },
  'allergy': { en: 'Allergy', es: 'Alergia', fr: 'Allergie', ru: 'Аллергия', pt: 'Alergia', de: 'Allergie', id: 'Alergi', tr: 'Alerji', ko: '알레르기', ja: 'アレルギー' },
  'headache': { en: 'Headache', es: 'Dolor de cabeza', fr: 'Mal de tête', ru: 'Головная боль', pt: 'Dor de cabeça', de: 'Kopfschmerzen', id: 'Sakit kepala', tr: 'Baş ağrısı', ko: '두통', ja: '頭痛' },
  'emergency': { en: 'Emergency', es: 'Emergencia', fr: 'Urgence', ru: 'Скорая помощь', pt: 'Emergência', de: 'Notfall', id: 'Darurat', tr: 'Acil durum', ko: '비상 / 응급', ja: '緊急' },
  'prescription': { en: 'Prescription', es: 'Receta médica', fr: 'Ordonnance', ru: 'Рецепт', pt: 'Receita médica', de: 'Rezept', id: 'Resep dokter', tr: 'Reçete', ko: '처방전', ja: '処方箋' },
  'bandage': { en: 'Bandage', es: 'Venda', fr: 'Pansement', ru: 'Бинт', pt: 'Curativo', de: 'Verband', id: 'Perban', tr: 'Bandaj', ko: '붕대 / 반창고', ja: '包帯 / 絆創膏' },
  'health': { en: 'Health', es: 'Salud', fr: 'Santé', ru: 'Здоровье', pt: 'Saúde', de: 'Gesundheit', id: 'Kesehatan', tr: 'Sağlık', ko: '건강', ja: '健康' },
  'where is the nearest pharmacy?': { en: 'Where is the nearest pharmacy?', es: '¿Dónde está la farmacia más cercana?', fr: 'Où est la pharmacie la plus proche ?', ru: 'Где ближайшая аптека?', pt: 'Onde fica a farmácia mais próxima?', de: 'Wo ist die nächste Apotheke?', id: 'Di mana apotek terdekat?', tr: 'En yakın eczane nerede?' },
  'i am allergic to nuts': { en: 'I am allergic to nuts', es: 'Soy alérgico a las nueces', fr: 'Je suis allergique aux noix', ru: 'У меня аллергия на орехи', pt: 'Tenho alergia a nozes', de: 'Ich bin allergisch gegen Nüsse', id: 'Saya alergi kacang', tr: 'Kuruyemiş alerjim var' },

  // Hotel, Airport & Travel Pack
  'flight': { en: 'Flight', es: 'Vuelo', fr: 'Vol', ru: 'Рейс', pt: 'Voo', de: 'Flug', id: 'Penerbangan', tr: 'Uçuş', ko: '항공편 / 비행', ja: '便 / フライト' },
  'luggage': { en: 'Luggage', es: 'Equipaje', fr: 'Bagage', ru: 'Багаж', pt: 'Bagagem', de: 'Gepäck', id: 'Bagasi', tr: 'Bagaj', ko: '짐 / 수하물', ja: '手荷物' },
  'reservation': { en: 'Reservation', es: 'Reserva', fr: 'Réservation', ru: 'Бронь', pt: 'Reserva', de: 'Reservierung', id: 'Reservasi', tr: 'Rezervasyon', ko: '예약', ja: '予約' },
  'room': { en: 'Room', es: 'Habitación', fr: 'Chambre', ru: 'Номер', pt: 'Quarto', de: 'Zimmer', id: 'Kamar', tr: 'Oda', ko: '방', ja: '部屋' },
  'gate': { en: 'Gate', es: 'Puerta de embarque', fr: 'Porte d\'embarquement', ru: 'Выход на посадку', pt: 'Portão de embarque', de: 'Gate', id: 'Gerbang', tr: 'Kapı', ko: '탑승구 / 게이트', ja: '搭乗口 / ゲート' },
  'exit': { en: 'Exit', es: 'Salida', fr: 'Sortie', ru: 'Выход', pt: 'Saída', de: 'Ausgang', id: 'Pintu keluar', tr: 'Çıkış', ko: '출구', ja: '出口' },
  'customs': { en: 'Customs', es: 'Aduana', fr: 'Douane', ru: 'Таможня', pt: 'Alfândega', de: 'Zoll', id: 'Bea cukai', tr: 'Gümrük', ko: '세관', ja: '税関' },
  'i have a reservation': { en: 'I have a reservation', es: 'Tengo una reserva', fr: 'J\'ai une réservation', ru: 'У меня есть бронь', pt: 'Tenho uma reserva', de: 'Ich habe eine Reservierung', id: 'Saya punya reservasi', tr: 'Rezervasyonum var' },

  // Shopping & Money Pack
  'credit card': { en: 'Credit card', es: 'Tarjeta de crédito', fr: 'Carte bancaire', ru: 'Банковская карта', pt: 'Cartão de crédito', de: 'Kreditkarte', id: 'Kartu kredit', tr: 'Kredi kartı', ko: '신용카드', ja: 'クレジットカード' },
  'cash': { en: 'Cash', es: 'Efectivo', fr: 'Espèces', ru: 'Наличные', pt: 'Dinheiro vivo', de: 'Bargeld', id: 'Uang tunai', tr: 'Nakit', ko: '현금', ja: '現金' },
  'price': { en: 'Price', es: 'Precio', fr: 'Prix', ru: 'Цена', pt: 'Preço', de: 'Preis', id: 'Harga', tr: 'Fiyat', ko: '가격', ja: '価格 / 値段' },
  'cheap': { en: 'Cheap', es: 'Barato', fr: 'Pas cher', ru: 'Дешёвый', pt: 'Barato', de: 'Billig', id: 'Murah', tr: 'Ucuz', ko: '싸고 저렴한', ja: '安い' },
  'expensive': { en: 'Expensive', es: 'Caro', fr: 'Cher', ru: 'Дорогой', pt: 'Caro', de: 'Teuer', id: 'Mahal', tr: 'Pahalı', ko: '비싼', ja: '高い' },
  'discount': { en: 'Discount', es: 'Descuento', fr: 'Réduction', ru: 'Скидка', pt: 'Desconto', de: 'Rabatt', id: 'Diskon', tr: 'İndirim', ko: '할인', ja: '割引' },
  'where is the bus stop?': { en: 'Where is the bus stop?', es: '¿Dónde está la parada de autobús?', fr: 'Où est l\'arrêt de bus ?', ru: 'Где автобусная остановка?', pt: 'Onde fica o ponto de ônibus?', de: 'Wo ist die Bushaltestelle?', id: 'Di mana halte bus?', tr: 'Otobüs durağı nerede?', ko: '버스 정류장이 어디인가요?', ja: 'バス停はどこですか？' },
  'how do i get to the airport?': { en: 'How do I get to the airport?', es: '¿Cómo llego al aeropuerto?', fr: 'Comment aller à l\'aéroport ?', ru: 'Как добраться до аэропорта?', pt: 'Como chego ao aeroporto?', de: 'Wie komme ich zum Flughafen?', id: 'Bagaimana cara ke bandara?', tr: 'Havalimanına nasıl gidebilirim?', ko: '공항에 어떻게 가나요?', ja: '空港へはどう行けばいいですか？' },
  'i would like a coffee, please': { en: 'I would like a coffee, please', es: 'Quisiera un café, por favor', fr: 'Je voudrais un café, s\'il vous plaît', ru: 'Я бы хотел кофе, пожалуйста', pt: 'Eu gostaria de um café, por favor', de: 'Ich hätte gern einen Kaffee, bitte', id: 'Saya mau kopi, tolong', tr: 'Bir kahve rica ediyorum', ko: '커피 한 잔 주세요', ja: 'コーヒーを一杯ください' },
  'a bottle of water, please': { en: 'A bottle of water, please', es: 'Una botella de agua, por favor', fr: 'Une bouteille d\'eau, s\'il vous plaît', ru: 'Бутылку воды, пожалуйста', pt: 'Uma garrafa de água, por favor', de: 'Eine Flasche Wasser, bitte', id: 'Sebotol air, tolong', tr: 'Bir şişe su, lütfen', ko: '생수 한 병 주세요', ja: 'お水を一本ください' },

  // Batch 1: Modern Tech, Workplace & Commerce (Levels 1, 2, 3)
  'laptop': { en: 'Laptop', es: 'Portátil', fr: 'Ordinateur portable', ru: 'Ноутбук', pt: 'Portátil', de: 'Laptop', id: 'Laptop', tr: 'Dizüstü bilgisayar', ko: '노트북', ja: 'ノートパソコン' },
  'tablet': { en: 'Tablet', es: 'Tableta', fr: 'Tablette', ru: 'Планшет', pt: 'Tablet', de: 'Tablet', id: 'Tablet', tr: 'Tablet', ko: '태블릿', ja: 'タブレット' },
  'screen / display': { en: 'Screen', es: 'Pantalla', fr: 'Écran', ru: 'Экран', pt: 'Tela', de: 'Bildschirm', id: 'Layar', tr: 'Ekran', ko: '화면 / 스크린', ja: '画面 / スクリーン' },
  'keyboard': { en: 'Keyboard', es: 'Teclado', fr: 'Clavier', ru: 'Клавиатура', pt: 'Teclado', de: 'Tastatur', id: 'Papan ketik', tr: 'Klavye', ko: '키보드', ja: 'キーボード' },
  'mouse': { en: 'Mouse', es: 'Ratón', fr: 'Souris', ru: 'Мышь', pt: 'Mouse', de: 'Maus', id: 'Tetikus', tr: 'Fare', ko: '마우스', ja: 'マウス' },
  'charger': { en: 'Charger', es: 'Cargador', fr: 'Chargeur', ru: 'Зарядка', pt: 'Carregador', de: 'Ladegerät', id: 'Pengisi daya', tr: 'Şarj aleti', ko: '충전기', ja: '充電器' },
  'cable': { en: 'Cable', es: 'Cable', fr: 'Câble', ru: 'Кабель', pt: 'Cabo', de: 'Kabel', id: 'Kabel', tr: 'Kablo', ko: '케이블', ja: 'ケーブル' },
  'cable / wire': { en: 'Cable', es: 'Cable', fr: 'Câble', ru: 'Кабель', pt: 'Cabo', de: 'Kabel', id: 'Kabel', tr: 'Kablo', ko: '케이블', ja: 'ケーブル' },
  'wifi': { en: 'Wi-Fi', es: 'Wifi', fr: 'Wi-Fi', ru: 'Вайфай', pt: 'Wi-Fi', de: 'WLAN', id: 'Wi-Fi', tr: 'Kablosuz ağ', ko: '와이파이', ja: 'ワイファイ' },
  'wi-fi': { en: 'Wi-Fi', es: 'Wifi', fr: 'Wi-Fi', ru: 'Вайфай', pt: 'Wi-Fi', de: 'WLAN', id: 'Wi-Fi', tr: 'Kablosuz ağ', ko: '와이파이', ja: 'ワイファイ' },
  'wi-fi / wlan': { en: 'Wi-Fi', es: 'Wifi', fr: 'Wi-Fi', ru: 'Вайфай', pt: 'Wi-Fi', de: 'WLAN', id: 'Wi-Fi', tr: 'Kablosuz ağ', ko: '와이파이', ja: 'ワイファイ' },
  'message': { en: 'Message', es: 'Mensaje', fr: 'Message', ru: 'Сообщение', pt: 'Mensagem', de: 'Nachricht', id: 'Pesan', tr: 'Mesaj', ko: '메시지', ja: 'メッセージ' },
  'message / text': { en: 'Message', es: 'Mensaje', fr: 'Message', ru: 'Сообщение', pt: 'Mensagem', de: 'Nachricht', id: 'Pesan', tr: 'Mesaj', ko: '메시지', ja: 'メッセージ' },
  'website': { en: 'Website', es: 'Sitio web', fr: 'Site web', ru: 'Сайт', pt: 'Site', de: 'Webseite', id: 'Situs web', tr: 'Web sitesi', ko: '웹사이트', ja: 'ウェブサイト' },
  'app': { en: 'Application', es: 'Aplicación', fr: 'Application', ru: 'Приложение', pt: 'Aplicativo', de: 'Anwendung', id: 'Aplikasi', tr: 'Uygulama', ko: '앱 / 애플리케이션', ja: 'アプリ' },
  'application': { en: 'Application', es: 'Aplicación', fr: 'Application', ru: 'Приложение', pt: 'Aplicativo', de: 'Anwendung', id: 'Aplikasi', tr: 'Uygulama', ko: '앱 / 애플리케이션', ja: 'アプリ' },
  'application / app': { en: 'Application', es: 'Aplicación', fr: 'Application', ru: 'Приложение', pt: 'Aplicativo', de: 'Anwendung', id: 'Aplikasi', tr: 'Uygulama', ko: '앱 / 애플리케이션', ja: 'アプリ' },
  'file / document': { en: 'File', es: 'Archivo', fr: 'Fichier', ru: 'Файл', pt: 'Arquivo', de: 'Datei', id: 'Berkas', tr: 'Dosya', ko: '파일', ja: 'ファイル' },
  'folder': { en: 'Folder', es: 'Carpeta', fr: 'Dossier', ru: 'Папка', pt: 'Pasta', de: 'Ordner', id: 'Folder', tr: 'Klasör', ko: '폴더', ja: 'フォルダー' },
  'camera': { en: 'Camera', es: 'Cámara', fr: 'Caméra', ru: 'Камера', pt: 'Câmera', de: 'Kamera', id: 'Kamera', tr: 'Kamera', ko: '카메라', ja: 'カメラ' },
  'microphone': { en: 'Microphone', es: 'Micrófono', fr: 'Microphone', ru: 'Микрофон', pt: 'Microfone', de: 'Mikrofon', id: 'Mikrofon', tr: 'Mikrofon', ko: '마이크', ja: 'マイク' },
  'headphones': { en: 'Headphones', es: 'Auriculares', fr: 'Écouteurs', ru: 'Наушники', pt: 'Fones de ouvido', de: 'Kopfhörer', id: 'Headphone', tr: 'Kulaklık', ko: '헤드폰', ja: 'ヘッドホン' },
  'printer': { en: 'Printer', es: 'Impresora', fr: 'Imprimante', ru: 'Принтер', pt: 'Impressora', de: 'Drucker', id: 'Pencetak', tr: 'Yazıcı', ko: '프린터', ja: 'プリンター' },
  'search': { en: 'Search', es: 'Buscar', fr: 'Rechercher', ru: 'Искать', pt: 'Pesquisar', de: 'Suchen', id: 'Cari', tr: 'Aramak', ko: '검색', ja: '検索' },
  'search / find': { en: 'Search', es: 'Buscar', fr: 'Rechercher', ru: 'Искать', pt: 'Pesquisar', de: 'Suchen', id: 'Cari', tr: 'Aramak', ko: '검색', ja: '検索' },
  'save': { en: 'Save', es: 'Guardar', fr: 'Enregistrer', ru: 'Сохранить', pt: 'Salvar', de: 'Speichern', id: 'Simpan', tr: 'Kaydetmek', ko: '저장', ja: '保存' },
  'delete': { en: 'Delete', es: 'Eliminar', fr: 'Supprimer', ru: 'Удалить', pt: 'Excluir', de: 'Löschen', id: 'Hapus', tr: 'Silmek', ko: '삭제', ja: '削除' },
  'delete / remove': { en: 'Delete', es: 'Eliminar', fr: 'Supprimer', ru: 'Удалить', pt: 'Excluir', de: 'Löschen', id: 'Hapus', tr: 'Silmek', ko: '삭제', ja: '削除' },
  'send': { en: 'Send', es: 'Enviar', fr: 'Envoyer', ru: 'Отправить', pt: 'Enviar', de: 'Senden', id: 'Kirim', tr: 'Göndermek', ko: '보내기', ja: '送信' },
  'download': { en: 'Download', es: 'Descargar', fr: 'Télécharger', ru: 'Скачать', pt: 'Baixar', de: 'Herunterladen', id: 'Mengunduh', tr: 'İndirmek', ko: '다운로드', ja: 'ダウンロード' },
  'upload': { en: 'Upload', es: 'Subir', fr: 'Téléverser', ru: 'Загрузить', pt: 'Carregar', de: 'Hochladen', id: 'Mengunggah', tr: 'Yüklemek', ko: '업로드', ja: 'アップロード' },
  'online': { en: 'Online', es: 'En línea', fr: 'En ligne', ru: 'В сети', pt: 'Online', de: 'Online', id: 'Daring', tr: 'Çevrim içi', ko: '온라인', ja: 'オンライン' },
  'offline': { en: 'Offline', es: 'Desconectado', fr: 'Hors ligne', ru: 'Не в сети', pt: 'Offline', de: 'Offline', id: 'Luring', tr: 'Çevrim dışı', ko: '오프라인', ja: 'オフライン' },
  'job': { en: 'Job', es: 'Trabajo', fr: 'Travail', ru: 'Работа', pt: 'Trabalho', de: 'Arbeit', id: 'Pekerjaan', tr: 'İş', ko: '직업', ja: '職業' },
  'buy': { en: 'Buy', es: 'Comprar', fr: 'Acheter', ru: 'Купить', pt: 'Comprar', de: 'Kaufen', id: 'Beli', tr: 'Satın almak', ko: '구매 / 사다', ja: '購入 / 買う' },
  'buy / purchase': { en: 'Buy', es: 'Comprar', fr: 'Acheter', ru: 'Купить', pt: 'Comprar', de: 'Kaufen', id: 'Beli', tr: 'Satın almak', ko: '구매 / 사다', ja: '購入 / 買う' },
  'sell': { en: 'Sell', es: 'Vender', fr: 'Vendre', ru: 'Продать', pt: 'Vender', de: 'Verkaufen', id: 'Jual', tr: 'Satmak', ko: '판매 / 팔다', ja: '販売 / 売る' },
  'pay': { en: 'Pay', es: 'Pagar', fr: 'Payer', ru: 'Платить', pt: 'Pagar', de: 'Bezahlen', id: 'Bayar', tr: 'Ödemek', ko: '지불 / 결제', ja: '支払う / 決済' },
  'pay / payment': { en: 'Pay', es: 'Pagar', fr: 'Payer', ru: 'Платить', pt: 'Pagar', de: 'Bezahlen', id: 'Bayar', tr: 'Ödemek', ko: '지불 / 결제', ja: '支払う / 決済' },
  'credit_card': { en: 'Credit card', es: 'Tarjeta de crédito', fr: 'Carte de crédit', ru: 'Кредитная карта', pt: 'Cartão de crédito', de: 'Kreditkarte', id: 'Kartu kredit', tr: 'Kredi kartı', ko: '신용카드', ja: 'クレジットカード' },
  'cheap / inexpensive': { en: 'Cheap', es: 'Barato', fr: 'Bon marché', ru: 'Дешёвый', pt: 'Barato', de: 'Billig', id: 'Murah', tr: 'Ucuz', ko: '싸고 저렴한', ja: '安い' },
  'receipt': { en: 'Receipt', es: 'Recibo', fr: 'Reçu', ru: 'Чек', pt: 'Recibo', de: 'Quittung', id: 'Struk', tr: 'Fiş', ko: '영수증', ja: '領収書 / レシート' },
  'help_desk': { en: 'Support', es: 'Soporte', fr: 'Assistance', ru: 'Поддержка', pt: 'Suporte', de: 'Kundendienst', id: 'Dukungan', tr: 'Destek', ko: '지원 / 고객센터', ja: 'サポート' },
  'support': { en: 'Support', es: 'Soporte', fr: 'Assistance', ru: 'Поддержка', pt: 'Suporte', de: 'Kundendienst', id: 'Dukungan', tr: 'Destek', ko: '지원 / 고객센터', ja: 'サポート' },
  'help desk': { en: 'Support', es: 'Soporte', fr: 'Assistance', ru: 'Поддержка', pt: 'Suporte', de: 'Kundendienst', id: 'Dukungan', tr: 'Destek', ko: '지원 / 고객센터', ja: 'サポート' },
  'customer support / help desk': { en: 'Support', es: 'Soporte', fr: 'Assistance', ru: 'Поддержка', pt: 'Suporte', de: 'Kundendienst', id: 'Dukungan', tr: 'Destek', ko: '지원 / 고객센터', ja: 'サポート' },
  'support / help desk': { en: 'Support', es: 'Soporte', fr: 'Assistance', ru: 'Поддержка', pt: 'Suporte', de: 'Kundendienst', id: 'Dukungan', tr: 'Destek', ko: '지원 / 고객센터', ja: 'サポート' },
  'support / service': { en: 'Support', es: 'Soporte', fr: 'Assistance', ru: 'Поддержка', pt: 'Suporte', de: 'Kundendienst', id: 'Dukungan', tr: 'Destek', ko: '지원 / 고객센터', ja: 'サポート' },
  'open_action': { en: 'Open', es: 'Abrir', fr: 'Ouvrir', ru: 'Открыть', pt: 'Abrir', de: 'Öffnen', id: 'Buka', tr: 'Açmak', ko: '열다 / 열린', ja: '開く / オープン' },
  'close_action': { en: 'Close', es: 'Cerrar', fr: 'Fermer', ru: 'Закрыть', pt: 'Fechar', de: 'Schließen', id: 'Tutup', tr: 'Kapatmak', ko: '닫다 / 닫힌', ja: '閉じる / クローズ' },
  'close': { en: 'Close', es: 'Cerrar', fr: 'Fermer', ru: 'Закрыть', pt: 'Fechar', de: 'Schließen', id: 'Tutup', tr: 'Kapatmak', ko: '닫다 / 닫힌', ja: '閉じる / クローズ' },
  'update_action': { en: 'Update', es: 'Actualizar', fr: 'Mettre à jour', ru: 'Обновить', pt: 'Atualizar', de: 'Aktualisieren', id: 'Perbarui', tr: 'Güncellemek', ko: '업데이트', ja: '更新 / アップデート' },
  'update': { en: 'Update', es: 'Actualizar', fr: 'Mettre à jour', ru: 'Обновить', pt: 'Atualizar', de: 'Aktualisieren', id: 'Perbarui', tr: 'Güncellemek', ko: '업데이트', ja: '更新 / アップデート' },
  'update / refresh': { en: 'Update', es: 'Actualizar', fr: 'Mettre à jour', ru: 'Обновить', pt: 'Atualizar', de: 'Aktualisieren', id: 'Perbarui', tr: 'Güncellemek', ko: '업데이트', ja: '更新 / アップデート' },
  'boss': { en: 'Boss', es: 'Jefe', fr: 'Patron', ru: 'Начальник', pt: 'Chefe', de: 'Chef', id: 'Bos', tr: 'Patron', ko: '상사 / 사장님', ja: '上司' },
  'boss / supervisor': { en: 'Boss', es: 'Jefe', fr: 'Patron', ru: 'Начальник', pt: 'Chefe', de: 'Chef', id: 'Bos', tr: 'Patron', ko: '상사 / 사장님', ja: '上司' },
  'colleague': { en: 'Colleague', es: 'Colega', fr: 'Collègue', ru: 'Коллега', pt: 'Colega', de: 'Kollege', id: 'Rekan kerja', tr: 'İş arkadaşı', ko: '동료', ja: '同僚' },
  'colleague / coworker': { en: 'Colleague', es: 'Colega', fr: 'Collègue', ru: 'Коллега', pt: 'Colega', de: 'Kollege', id: 'Rekan kerja', tr: 'İş arkadaşı', ko: '동료', ja: '同僚' },
  'employee': { en: 'Employee', es: 'Empleado', fr: 'Employé', ru: 'Сотрудник', pt: 'Funcionário', de: 'Mitarbeiter', id: 'Karyawan', tr: 'Çalışan', ko: '직원', ja: '従業員 / 社員' },
  'employee / worker': { en: 'Employee', es: 'Empleado', fr: 'Employé', ru: 'Сотрудник', pt: 'Funcionário', de: 'Mitarbeiter', id: 'Karyawan', tr: 'Çalışan', ko: '직원', ja: '従業員 / 社員' },
  'customer / client': { en: 'Client', es: 'Cliente', fr: 'Client', ru: 'Клиент', pt: 'Cliente', de: 'Kunde', id: 'Klien', tr: 'Müşteri', ko: '고객 / 클라이언트', ja: '顧客 / クライアント' },
  'client / customer': { en: 'Client', es: 'Cliente', fr: 'Client', ru: 'Клиент', pt: 'Cliente', de: 'Kunde', id: 'Klien', tr: 'Müşteri', ko: '고객 / 클라이언트', ja: '顧客 / クライアント' },
  'schedule / calendar': { en: 'Schedule', es: 'Horario', fr: 'Emploi du temps', ru: 'Расписание', pt: 'Horário', de: 'Zeitplan', id: 'Jadwal', tr: 'Program', ko: '일정 / 스케줄', ja: 'スケジュール / 日程' },
  'task': { en: 'Task', es: 'Tarea', fr: 'Tâche', ru: 'Задача', pt: 'Tarefa', de: 'Aufgabe', id: 'Tugas', tr: 'Görev', ko: '업무 / 과제', ja: 'タスク / 課題' },
  'task / assignment': { en: 'Task', es: 'Tarea', fr: 'Tâche', ru: 'Задача', pt: 'Tarefa', de: 'Aufgabe', id: 'Tugas', tr: 'Görev', ko: '업무 / 과제', ja: 'タスク / 課題' },
  'report': { en: 'Report', es: 'Informe', fr: 'Rapport', ru: 'Отчёт', pt: 'Relatório', de: 'Bericht', id: 'Laporan', tr: 'Rapor', ko: '보고서', ja: 'レポート / 報告書' },
  'report / summary': { en: 'Report', es: 'Informe', fr: 'Rapport', ru: 'Отчёт', pt: 'Relatório', de: 'Bericht', id: 'Laporan', tr: 'Rapor', ko: '보고서', ja: 'レポート / 報告書' },
  'presentation': { en: 'Presentation', es: 'Presentación', fr: 'Présentation', ru: 'Презентация', pt: 'Apresentação', de: 'Präsentation', id: 'Presentasi', tr: 'Sunum', ko: '발표 / 프레젠테이션', ja: 'プレゼンテーション' },
  'contract / agreement': { en: 'Contract', es: 'Contrato', fr: 'Contrat', ru: 'Договор', pt: 'Contrato', de: 'Vertrag', id: 'Kontrak', tr: 'Sözleşme', ko: '계약 / 계약서', ja: '契約' },
  'signature': { en: 'Signature', es: 'Firma', fr: 'Signature', ru: 'Подпись', pt: 'Assinatura', de: 'Unterschrift', id: 'Tanda tangan', tr: 'İmza', ko: '서명 / 사인', ja: '署名 / サイン' },
  'company / business': { en: 'Company', es: 'Empresa', fr: 'Entreprise', ru: 'Компания', pt: 'Empresa', de: 'Unternehmen', id: 'Perusahaan', tr: 'Şirket', ko: '회사', ja: '会社' },
  'salary / wage': { en: 'Salary', es: 'Salario', fr: 'Salaire', ru: 'Зарплата', pt: 'Salário', de: 'Gehalt', id: 'Gaji', tr: 'Maaş', ko: '급여 / 월급', ja: '給料' },
  'vacation': { en: 'Vacation', es: 'Vacaciones', fr: 'Congé', ru: 'Отпуск', pt: 'Férias', de: 'Urlaub', id: 'Liburan', tr: 'Tatil', ko: '휴가 / 방학', ja: '休暇 / 休み' },
  'vacation / leave': { en: 'Vacation', es: 'Vacaciones', fr: 'Congé', ru: 'Отпуск', pt: 'Férias', de: 'Urlaub', id: 'Liburan', tr: 'Tatil', ko: '휴가 / 방학', ja: '休暇 / 休み' },
  'vacation / time off': { en: 'Vacation', es: 'Vacaciones', fr: 'Congé', ru: 'Отпуск', pt: 'Férias', de: 'Urlaub', id: 'Liburan', tr: 'Tatil', ko: '휴가 / 방학', ja: '休暇 / 休み' },
  'resume': { en: 'Resume', es: 'Currículum', fr: 'Curriculum vitae', ru: 'Резюме', pt: 'Currículo', de: 'Lebenslauf', id: 'Riwayat hidup', tr: 'Özgeçmiş', ko: '이력서', ja: '履歴書' },
  'cv': { en: 'Resume', es: 'Currículum', fr: 'Curriculum vitae', ru: 'Резюме', pt: 'Currículo', de: 'Lebenslauf', id: 'Riwayat hidup', tr: 'Özgeçmiş', ko: '이력서', ja: '履歴書' },
  'resume / cv': { en: 'Resume', es: 'Currículum', fr: 'Curriculum vitae', ru: 'Резюме', pt: 'Currículo', de: 'Lebenslauf', id: 'Riwayat hidup', tr: 'Özgeçmiş', ko: '이력서', ja: '履歴書' },
  'cv / resume': { en: 'Resume', es: 'Currículum', fr: 'Curriculum vitae', ru: 'Резюме', pt: 'Currículo', de: 'Lebenslauf', id: 'Riwayat hidup', tr: 'Özgeçmiş', ko: '이력서', ja: '履歴書' },
  'interview': { en: 'Interview', es: 'Entrevista', fr: 'Entretien', ru: 'Собеседование', pt: 'Entrevista', de: 'Bewerbungsgespräch', id: 'Wawancara', tr: 'Mülakat', ko: '면접 / 인터뷰', ja: '面接 / インタビュー' },
  'job interview': { en: 'Interview', es: 'Entrevista', fr: 'Entretien', ru: 'Собеседование', pt: 'Entrevista', de: 'Bewerbungsgespräch', id: 'Wawancara', tr: 'Mülakat', ko: '면접 / 인터뷰', ja: '面接 / インタビュー' },
  'deadline / due date': { en: 'Deadline', es: 'Fecha límite', fr: 'Date limite', ru: 'Срок сдачи', pt: 'Prazo final', de: 'Frist', id: 'Tenggat waktu', tr: 'Son teslim tarihi', ko: '마감일 / 마감 시간', ja: '締め切り / 期限' },
  'goal': { en: 'Goal', es: 'Meta', fr: 'Objectif', ru: 'Цель', pt: 'Meta', de: 'Ziel', id: 'Tujuan', tr: 'Hedef', ko: '목표', ja: '目標' },
  'goal / objective': { en: 'Goal', es: 'Meta', fr: 'Objectif', ru: 'Цель', pt: 'Meta', de: 'Ziel', id: 'Tujuan', tr: 'Hedef', ko: '목표', ja: '目標' },
  'goal / target': { en: 'Goal', es: 'Meta', fr: 'Objectif', ru: 'Цель', pt: 'Meta', de: 'Ziel', id: 'Tujuan', tr: 'Hedef', ko: '목표', ja: '目標' },
  'product': { en: 'Product', es: 'Producto', fr: 'Produit', ru: 'Продукт', pt: 'Produto', de: 'Produkt', id: 'Produk', tr: 'Ürün', ko: '제품 / 상품', ja: '製品 / 商品' },
  'service': { en: 'Service', es: 'Servicio', fr: 'Service', ru: 'Услуга', pt: 'Serviço', de: 'Dienstleistung', id: 'Layanan', tr: 'Hizmet', ko: '서비스', ja: 'サービス' },
  'invoice / bill': { en: 'Invoice', es: 'Factura', fr: 'Facture', ru: 'Счёт', pt: 'Fatura', de: 'Rechnung', id: 'Faktur', tr: 'Fatura', ko: '청구서 / 인보이스', ja: '請求書' },
  'transfer': { en: 'Transfer', es: 'Transferencia', fr: 'Virement', ru: 'Перевод', pt: 'Transferência', de: 'Überweisung', id: 'Transfer', tr: 'Havale', ko: '계좌이체 / 송금', ja: '振込 / 送金' },
  'bank transfer': { en: 'Transfer', es: 'Transferencia', fr: 'Virement', ru: 'Перевод', pt: 'Transferência', de: 'Überweisung', id: 'Transfer', tr: 'Havale', ko: '계좌이체 / 송금', ja: '振込 / 送金' },
  'bank transfer / wire': { en: 'Transfer', es: 'Transferencia', fr: 'Virement', ru: 'Перевод', pt: 'Transferência', de: 'Überweisung', id: 'Transfer', tr: 'Havale', ko: '계좌이체 / 송금', ja: '振込 / 送金' },
  'refund': { en: 'Refund', es: 'Reembolso', fr: 'Remboursement', ru: 'Возврат', pt: 'Reembolso', de: 'Rückerstattung', id: 'Pengembalian dana', tr: 'Para iadesi', ko: '환불', ja: '返金 / 払い戻し' },
  'refund / return': { en: 'Refund', es: 'Reembolso', fr: 'Remboursement', ru: 'Возврат', pt: 'Reembolso', de: 'Rückerstattung', id: 'Pengembalian dana', tr: 'Para iadesi', ko: '환불', ja: '返金 / 払い戻し' },
  'shipping': { en: 'Shipping', es: 'Envío', fr: 'Livraison', ru: 'Доставка', pt: 'Envio', de: 'Versand', id: 'Pengiriman', tr: 'Kargo', ko: '배송', ja: '配送 / 発送' },
  'shipping / delivery': { en: 'Shipping', es: 'Envío', fr: 'Livraison', ru: 'Доставка', pt: 'Envio', de: 'Versand', id: 'Pengiriman', tr: 'Kargo', ko: '배송', ja: '配送 / 発送' },
  'shipping / cargo': { en: 'Shipping', es: 'Envío', fr: 'Livraison', ru: 'Доставка', pt: 'Envio', de: 'Versand', id: 'Pengiriman', tr: 'Kargo', ko: '배송', ja: '配送 / 発送' },
  'delivery / shipping': { en: 'Shipping', es: 'Envío', fr: 'Livraison', ru: 'Доставка', pt: 'Envio', de: 'Versand', id: 'Pengiriman', tr: 'Kargo', ko: '배송', ja: '配送 / 発送' },
  'package': { en: 'Package', es: 'Paquete', fr: 'Colis', ru: 'Посылка', pt: 'Pacote', de: 'Paket', id: 'Paket', tr: 'Paket', ko: '소포 / 택배', ja: '小包 / 荷物' },
  'package / parcel': { en: 'Package', es: 'Paquete', fr: 'Colis', ru: 'Посылка', pt: 'Pacote', de: 'Paket', id: 'Paket', tr: 'Paket', ko: '소포 / 택배', ja: '小包 / 荷物' },
  'software': { en: 'Software', es: 'Software', fr: 'Logiciel', ru: 'Программное обеспечение', pt: 'Software', de: 'Software', id: 'Perangkat lunak', tr: 'Yazılım', ko: '소프트웨어', ja: 'ソフトウェア' },
  'hardware': { en: 'Hardware', es: 'Hardware', fr: 'Matériel informatique', ru: 'Аппаратное обеспечение', pt: 'Hardware', de: 'Hardware', id: 'Perangkat keras', tr: 'Donanım', ko: '하드웨어', ja: 'ハードウェア' },
  'database': { en: 'Database', es: 'Base de datos', fr: 'Base de données', ru: 'База данных', pt: 'Banco de dados', de: 'Datenbank', id: 'Basis data', tr: 'Veritabanı', ko: '데이터베이스', ja: 'データベース' },
  'server': { en: 'Server', es: 'Servidor', fr: 'Serveur', ru: 'Сервер', pt: 'Servidor', de: 'Server', id: 'Peladen', tr: 'Sunucu', ko: '서버', ja: 'サーバー' },
  'cloud_storage': { en: 'Cloud storage', es: 'Almacenamiento en la nube', fr: 'Stockage dans le cloud', ru: 'Облачное хранилище', pt: 'Armazenamento em nuvem', de: 'Cloud-Speicher', id: 'Penyimpanan awan', tr: 'Bulut depolama', ko: '클라우드 저장소', ja: 'クラウドストレージ' },
  'cloud storage': { en: 'Cloud storage', es: 'Almacenamiento en la nube', fr: 'Stockage dans le cloud', ru: 'Облачное хранилище', pt: 'Armazenamento em nuvem', de: 'Cloud-Speicher', id: 'Penyimpanan awan', tr: 'Bulut depolama', ko: '클라우드 저장소', ja: 'クラウドストレージ' },
  'artificial_intelligence': { en: 'Artificial intelligence', es: 'Inteligencia artificial', fr: 'Intelligence artificielle', ru: 'Искусственный интеллект', pt: 'Inteligência artificial', de: 'Künstliche Intelligenz', id: 'Kecerdasan buatan', tr: 'Yapay zekâ', ko: '인공지능', ja: '人工知能' },
  'artificial intelligence': { en: 'Artificial intelligence', es: 'Inteligencia artificial', fr: 'Intelligence artificielle', ru: 'Искусственный интеллект', pt: 'Inteligência artificial', de: 'Künstliche Intelligenz', id: 'Kecerdasan buatan', tr: 'Yapay zekâ', ko: '인공지능', ja: '人工知能' },
  'artificial intelligence (ai)': { en: 'Artificial intelligence', es: 'Inteligencia artificial', fr: 'Intelligence artificielle', ru: 'Искусственный интеллект', pt: 'Inteligência artificial', de: 'Künstliche Intelligenz', id: 'Kecerdasan buatan', tr: 'Yapay zekâ', ko: '인공지능', ja: '人工知能' },
  'algorithm': { en: 'Algorithm', es: 'Algoritmo', fr: 'Algorithme', ru: 'Алгоритм', pt: 'Algoritmo', de: 'Algorithmus', id: 'Algoritma', tr: 'Algoritma', ko: '알고리즘', ja: 'アルゴリズム' },
  'developer': { en: 'Developer', es: 'Desarrollador', fr: 'Développeur', ru: 'Разработчик', pt: 'Desenvolvedor', de: 'Entwickler', id: 'Pengembang', tr: 'Geliştirici', ko: '개발자', ja: '開発者' },
  'developer / programmer': { en: 'Developer', es: 'Desarrollador', fr: 'Développeur', ru: 'Разработчик', pt: 'Desenvolvedor', de: 'Entwickler', id: 'Pengembang', tr: 'Geliştirici', ko: '개발자', ja: '開発者' },
  'cybersecurity': { en: 'Cybersecurity', es: 'Ciberseguridad', fr: 'Cybersécurité', ru: 'Кибербезопасность', pt: 'Cibersegurança', de: 'Cybersicherheit', id: 'Keamanan siber', tr: 'Siber güvenlik', ko: '사이버 보안', ja: 'サイバーセキュリティ' },
  'operating_system': { en: 'Operating system', es: 'Sistema operativo', fr: 'Système d\'exploitation', ru: 'Операционная система', pt: 'Sistema operacional', de: 'Betriebssystem', id: 'Sistem operasi', tr: 'İşletim sistemi', ko: '운영체제', ja: 'オペレーティングシステム' },
  'operating system': { en: 'Operating system', es: 'Sistema operativo', fr: 'Système d\'exploitation', ru: 'Операционная система', pt: 'Sistema operacional', de: 'Betriebssystem', id: 'Sistem operasi', tr: 'İşletim sistemi', ko: '운영체제', ja: 'オペレーティングシステム' },
  'budget': { en: 'Budget', es: 'Presupuesto', fr: 'Budget', ru: 'Бюджет', pt: 'Orçamento', de: 'Budget', id: 'Anggaran', tr: 'Bütçe', ko: '예산', ja: '予算' },
  'budget / financial plan': { en: 'Budget', es: 'Presupuesto', fr: 'Budget', ru: 'Бюджет', pt: 'Orçamento', de: 'Budget', id: 'Anggaran', tr: 'Bütçe', ko: '예산', ja: '予算' },
  'investment': { en: 'Investment', es: 'Inversión', fr: 'Investissement', ru: 'Инвестиции', pt: 'Investimento', de: 'Investition', id: 'Investasi', tr: 'Yatırım', ko: '투자', ja: '投資' },
  'investment / capital': { en: 'Investment', es: 'Inversión', fr: 'Investissement', ru: 'Инвестиции', pt: 'Investimento', de: 'Investition', id: 'Investasi', tr: 'Yatırım', ko: '투자', ja: '投資' },
  'revenue': { en: 'Revenue', es: 'Ingresos', fr: 'Revenus', ru: 'Выручка', pt: 'Receita', de: 'Umsatz', id: 'Pendapatan', tr: 'Gelir', ko: '수익 / 매출', ja: '収益 / 売上' },
  'revenue / income': { en: 'Revenue', es: 'Ingresos', fr: 'Revenus', ru: 'Выручка', pt: 'Receita', de: 'Umsatz', id: 'Pendapatan', tr: 'Gelir', ko: '수익 / 매출', ja: '収益 / 売上' },
  'revenue / turnover': { en: 'Revenue', es: 'Ingresos', fr: 'Revenus', ru: 'Выручка', pt: 'Receita', de: 'Umsatz', id: 'Pendapatan', tr: 'Gelir', ko: '수익 / 매출', ja: '収益 / 売上' },
  'startup': { en: 'Startup', es: 'Empresa emergente', fr: 'Jeune pousse', ru: 'Стартап', pt: 'Startup', de: 'Startup', id: 'Startup', tr: 'Yeni girişim', ko: '스타트업', ja: 'スタートアップ' },
  'startup company': { en: 'Startup', es: 'Empresa emergente', fr: 'Jeune pousse', ru: 'Стартап', pt: 'Startup', de: 'Startup', id: 'Startup', tr: 'Yeni girişim', ko: '스타트업', ja: 'スタートアップ' },
  'remote_work': { en: 'Remote work', es: 'Teletrabajo', fr: 'Télétravail', ru: 'Удалённая работа', pt: 'Trabalho remoto', de: 'Fernarbeit', id: 'Kerja jarak jauh', tr: 'Uzaktan çalışma', ko: '재택근무 / 원격근무', ja: 'リモートワーク / 在宅勤務' },
  'remote work': { en: 'Remote work', es: 'Teletrabajo', fr: 'Télétravail', ru: 'Удалённая работа', pt: 'Trabalho remoto', de: 'Fernarbeit', id: 'Kerja jarak jauh', tr: 'Uzaktan çalışma', ko: '재택근무 / 원격근무', ja: 'リモートワーク / 在宅勤務' },
  'remote work / telecommuting': { en: 'Remote work', es: 'Teletrabajo', fr: 'Télétravail', ru: 'Удалённая работа', pt: 'Trabalho remoto', de: 'Fernarbeit', id: 'Kerja jarak jauh', tr: 'Uzaktan çalışma', ko: '재택근무 / 원격근무', ja: 'リモートワーク / 在宅勤務' },
  'remote work / homeoffice': { en: 'Remote work', es: 'Teletrabajo', fr: 'Télétravail', ru: 'Удалённая работа', pt: 'Trabalho remoto', de: 'Fernarbeit', id: 'Kerja jarak jauh', tr: 'Uzaktan çalışma', ko: '재택근무 / 원격근무', ja: 'リモートワーク / 在宅勤務' },

  'strawberry': { en: 'Strawberry', es: 'Fresa', fr: 'Fraise', ru: 'Клубника', pt: 'Morango', de: 'Erdbeere', id: 'Stroberi', tr: 'Çilek', ko: '딸기', ja: 'いちご / 苺' },
  'garlic': { en: 'Garlic', es: 'Ajo', fr: 'Ail', ru: 'Чеснок', pt: 'Alho', de: 'Knoblauch', id: 'Bawang putih', tr: 'Sarımsak', ko: '마늘', ja: 'にんにく / 大蒜' },
  'potato': { en: 'Potato', es: 'Patata / Papa', fr: 'Pomme de terre', ru: 'Картофель', pt: 'Batata', de: 'Kartoffel', id: 'Kentang', tr: 'Patates', ko: '감자', ja: 'じゃがいも / 馬鈴薯' },
  'onion': { en: 'Onion', es: 'Cebolla', fr: 'Oignon', ru: 'Лук', pt: 'Cebola', de: 'Zwiebel', id: 'Bawang bombay', tr: 'Soğan', ko: '양파', ja: '玉ねぎ / タマネギ' },
  'carrot': { en: 'Carrot', es: 'Zanahoria', fr: 'Carotte', ru: 'Морковь', pt: 'Cenoura', de: 'Karotte', id: 'Wortel', tr: 'Havuç', ko: '당근', ja: 'にんじん / 人参' },
  'spoon': { en: 'Spoon', es: 'Cuchara', fr: 'Cuillère', ru: 'Ложка', pt: 'Colher', de: 'Löffel', id: 'Sendok', tr: 'Kaşık', ko: '숟가락', ja: 'スプーン' },
  'fork': { en: 'Fork', es: 'Tenedor', fr: 'Fourchette', ru: 'Вилка', pt: 'Garfo', de: 'Gabel', id: 'Garpu', tr: 'Çatal', ko: '포크', ja: 'フォーク' },
  'knife': { en: 'Knife', es: 'Cuchillo', fr: 'Couteau', ru: 'Нож', pt: 'Faca', de: 'Messer', id: 'Pisau', tr: 'Bıçak', ko: '칼', ja: 'ナイフ / 包丁' },
  'plate': { en: 'Plate', es: 'Plato', fr: 'Assiette', ru: 'Тарелка', pt: 'Prato', de: 'Teller', id: 'Piring', tr: 'Tabak', ko: '접시', ja: '皿 / お皿' },
  'bicycle': { en: 'Bicycle', es: 'Bicicleta', fr: 'Vélo / Bicyclette', ru: 'Велосипед', pt: 'Bicicleta', de: 'Fahrrad', id: 'Sepeda', tr: 'Bisiklet', ko: '자전거', ja: '自転車' },
  'suitcase': { en: 'Suitcase', es: 'Maleta', fr: 'Valise', ru: 'Чемодан', pt: 'Mala', de: 'Koffer', id: 'Koper', tr: 'Bavul', ko: '여행가방 / 캐리어', ja: 'スーツケース' },
  'backpack': { en: 'Backpack', es: 'Mochila', fr: 'Sac à dos', ru: 'Рюкзак', pt: 'Mochila', de: 'Rucksack', id: 'Ransel', tr: 'Sırt çantası', ko: '배낭 / 책가방', ja: 'リュックサック' },
  'wallet': { en: 'Wallet', es: 'Billetera / Cartera', fr: 'Portefeuille', ru: 'Кошелёк', pt: 'Carteira', de: 'Geldbörse', id: 'Dompet', tr: 'Cüzdan', ko: '지갑', ja: '財布' },
  'ambulance': { en: 'Ambulance', es: 'Ambulancia', fr: 'Ambulance', ru: 'Скорая помощь', pt: 'Ambulância', de: 'Krankenwagen', id: 'Ambulans', tr: 'Ambulans', ko: '구급차', ja: '救急車' },
  'firefighter': { en: 'Firefighter', es: 'Bombero', fr: 'Pompier', ru: 'Пожарный', pt: 'Bombeiro', de: 'Feuerwehrmann', id: 'Pemadam kebakaran', tr: 'İtfaiyeci', ko: '소방관', ja: '消防士' },
  'beach': { en: 'Beach', es: 'Playa', fr: 'Plage', ru: 'Пляж', pt: 'Praia', de: 'Strand', id: 'Pantai', tr: 'Plaj', ko: '해변', ja: '浜辺 / ビーチ' },
  'mountain': { en: 'Mountain', es: 'Montaña', fr: 'Montagne', ru: 'Гора', pt: 'Montanha', de: 'Berg', id: 'Gunung', tr: 'Dağ', ko: '산', ja: '山' },
  'river': { en: 'River', es: 'Río', fr: 'Rivière / Fleuve', ru: 'Река', pt: 'Rio', de: 'Fluss', id: 'Sungai', tr: 'Nehir', ko: '강', ja: '川' },
  'lake': { en: 'Lake', es: 'Lago', fr: 'Lac', ru: 'Озеро', pt: 'Lago', de: 'See', id: 'Danau', tr: 'Göl', ko: '호수', ja: '湖' },
  'bedroom': { en: 'Bedroom', es: 'Dormitorio / Habitación', fr: 'Chambre', ru: 'Спальня', pt: 'Quarto', de: 'Schlafzimmer', id: 'Kamar tidur', tr: 'Yatak odası', ko: '침실', ja: '寝室' },
  'closet': { en: 'Closet', es: 'Armario', fr: 'Placard / Armoire', ru: 'Шкаф', pt: 'Armário', de: 'Kleiderschrank', id: 'Lemari pakaian', tr: 'Gardırop', ko: '옷장', ja: 'クローゼット' },
  'glasses': { en: 'Glasses', es: 'Gafas / Lentes', fr: 'Lunettes', ru: 'Очки', pt: 'Óculos', de: 'Brille', id: 'Kaca mata', tr: 'Gözlük', ko: '안경', ja: '眼鏡 / メガネ' },
  'notebook': { en: 'Notebook', es: 'Cuaderno', fr: 'Carnet / Cahier', ru: 'Тетрадь / Блокнот', pt: 'Caderno', de: 'Notizbuch', id: 'Buku catatan', tr: 'Defter', ko: '공책 / 수첩', ja: 'ノート' },
  'pen': { en: 'Pen', es: 'Bolígrafo / Pluma', fr: 'Stylo', ru: 'Ручка', pt: 'Caneta', de: 'Kugelschreiber', id: 'Pena tinta', tr: 'Tükenmez kalem', ko: '펜', ja: 'ペン' },
  'pencil': { en: 'Pencil', es: 'Lápiz', fr: 'Crayon', ru: 'Карандаш', pt: 'Lápis', de: 'Bleistift', id: 'Pensil kayu', tr: 'Kurşun kalem', ko: '연필', ja: '鉛筆' },
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

  // 1. Check if item is a cardinal number
  const rawEnglish = (item.english || (item as any).englishWord || item.translation || item.meaning || item.phrase || '').toString();
  const primaryText = (item.phrase || item.russian || (item as any).word || '').toString();
  const isTimeExpression =
    (item as any).category === 'Time' ||
    /\d+:\d+/.test(rawEnglish) ||
    /\d+:\d+/.test(primaryText) ||
    /\b(o'clock|half\s+past|quarter|en\s+punto|y\s+media|y\s+cuarto|menos\s+cuarto|menos\s+diez|heure|heures|demie|quart|час|часа|часов|половина|четверть|ровно|em\s+ponto|e\s+meia|para\s+as|horas|punkt|uhr|halb|viertel|jam|setengah|seperempat|tepat|saat|buçuk|çeyrek|geçiyor)\b/i.test(`${rawEnglish} ${primaryText}`);

  if (!isTimeExpression) {
    const digit = extractDigit(rawEnglish) ?? extractDigit(primaryText);
    if (digit !== null && NUMBER_TABLE[digit]) {
      const numEntry = NUMBER_TABLE[digit];
      if (baseLang in numEntry) {
        return `${digit} (${numEntry[baseLang]})`;
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
    const val = EXTENDED_DICTIONARY[lower]?.[baseLang];
    if (val) {
      return val;
    }
    const cleaned = lower
      .replace(/^noun:\s*/i, '')
      .replace(/^verb:\s*/i, '')
      .replace(/\s*\([^)]*\)\s*/g, ' ')
      .trim();
    const valCleaned = EXTENDED_DICTIONARY[cleaned]?.[baseLang];
    if (cleaned && valCleaned) {
      return valCleaned;
    }
  }

  // 3. Direct target word lookup across dictionary values
  const directTarget = ((item as any).russianWord || (item as any).russian || (item as any).word || item.phrase || '').toString().toLowerCase().trim();
  const directTargetClean = directTarget.replace(/\s*\([^)]*\)\s*/g, ' ').trim();
  if (directTarget) {
    for (const mapping of Object.values(EXTENDED_DICTIONARY)) {
      if (
        (mapping.en && (mapping.en.toLowerCase() === directTarget || mapping.en.toLowerCase().replace(/\s*\([^)]*\)\s*/g, ' ').trim() === directTargetClean)) ||
        (mapping.ru && (mapping.ru.toLowerCase() === directTarget || mapping.ru.toLowerCase().replace(/\s*\([^)]*\)\s*/g, ' ').trim() === directTargetClean)) ||
        (mapping.es && (mapping.es.toLowerCase() === directTarget || mapping.es.toLowerCase().replace(/\s*\([^)]*\)\s*/g, ' ').trim() === directTargetClean)) ||
        (mapping.fr && (mapping.fr.toLowerCase() === directTarget || mapping.fr.toLowerCase().replace(/\s*\([^)]*\)\s*/g, ' ').trim() === directTargetClean)) ||
        (mapping.pt && (mapping.pt.toLowerCase() === directTarget || mapping.pt.toLowerCase().replace(/\s*\([^)]*\)\s*/g, ' ').trim() === directTargetClean)) ||
        (mapping.de && (mapping.de.toLowerCase() === directTarget || mapping.de.toLowerCase().replace(/\s*\([^)]*\)\s*/g, ' ').trim() === directTargetClean)) ||
        (mapping.id && (mapping.id.toLowerCase() === directTarget || mapping.id.toLowerCase().replace(/\s*\([^)]*\)\s*/g, ' ').trim() === directTargetClean)) ||
        (mapping.tr && (mapping.tr.toLowerCase() === directTarget || mapping.tr.toLowerCase().replace(/\s*\([^)]*\)\s*/g, ' ').trim() === directTargetClean)) ||
        (mapping.ko && (mapping.ko.toLowerCase() === directTarget || mapping.ko.toLowerCase().replace(/\s*\([^)]*\)\s*/g, ' ').trim() === directTargetClean)) ||
        (mapping.ja && (mapping.ja.toLowerCase() === directTarget || mapping.ja.toLowerCase().replace(/\s*\([^)]*\)\s*/g, ' ').trim() === directTargetClean))
      ) {
        const valBase = mapping[baseLang];
        if (valBase) return valBase;
      }
    }
  }

  // 4. Clean key for word-boundary token & matrix lookup
  const cleanKey = (item.english || (item as any).englishWord || item.translation || item.phrase || item.meaning || '')
    .toString()
    .toLowerCase()
    .replace(/^noun:\s*/i, '')
    .replace(/^verb:\s*/i, '')
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .trim();

  // 5. Check for multi-word or token matches in dictionary using word boundaries (longest keys first)
  const sortedDict = Object.entries(EXTENDED_DICTIONARY).sort((a, b) => b[0].length - a[0].length);
  for (const [key, mapping] of sortedDict) {
    if (key.length >= 3 && cleanKey.length >= 3) {
      const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const wholeWordRegex = new RegExp(`(^|\\s)${escapedKey}(\\s|$)`, 'i');
      if (wholeWordRegex.test(cleanKey)) {
        const valKey = mapping[baseLang];
        if (valKey) {
          return valKey;
        }
      }
    }
  }

  // 6. Check Universal Concept Matrix
  const matrixMatch = CONCEPT_MATRIX.find(c => {
    return Object.values(c.translations).some(t => {
      if (!t) return false;
      const tText = t.text.toLowerCase();
      return tText === cleanKey;
    });
  });

  if (matrixMatch && matrixMatch.translations[baseLang]) {
    return matrixMatch.translations[baseLang]!.text;
  }

  // 7. Fallback: English translation or primary text
  return item.english || (item as any).englishWord || item.translation || item.meaning || item.phrase || item.russian || '';
};

/**
 * Localized Language Names in the native speaker's tongue
 */
export const LANGUAGE_NAMES_IN_BASE: Record<SupportedLanguageId, Record<SupportedLanguageId, string>> = {
  en: { en: 'English', es: 'Spanish', fr: 'French', ru: 'Russian', pt: 'Portuguese', de: 'German', id: 'Indonesian', tr: 'Turkish', ja: 'Japanese', ko: 'Korean' },
  es: { en: 'inglés', es: 'español', fr: 'francés', ru: 'ruso', pt: 'portugués', de: 'alemán', id: 'indonesio', tr: 'turco', ja: 'japonés', ko: 'coreano' },
  fr: { en: 'anglais', es: 'espagnol', fr: 'français', ru: 'russe', pt: 'portugais', de: 'allemand', id: 'indonésien', tr: 'turc', ja: 'japonais', ko: 'coréen' },
  ru: { en: 'английском', es: 'испанском', fr: 'французском', ru: 'русском', pt: 'португальском', de: 'немецком', id: 'индонезийском', tr: 'турецком', ja: 'японском', ko: 'корейском' },
  pt: { en: 'inglês', es: 'espanhol', fr: 'francês', ru: 'russo', pt: 'português', de: 'alemão', id: 'indonésio', tr: 'turco', ja: 'japonês', ko: 'coreano' },
  de: { en: 'Englisch', es: 'Spanisch', fr: 'Französisch', ru: 'Russisch', pt: 'Portugiesisch', de: 'Deutsch', id: 'Indonesisch', tr: 'Türkisch', ja: 'Japanisch', ko: 'Koreanisch' },
  id: { en: 'bahasa Inggris', es: 'bahasa Spanyol', fr: 'bahasa Prancis', ru: 'bahasa Rusia', pt: 'bahasa Portugis', de: 'bahasa Jerman', id: 'bahasa Indonesia', tr: 'bahasa Turki', ja: 'bahasa Jepang', ko: 'bahasa Korea' },
  tr: { en: 'İngilizce', es: 'İspanyolca', fr: 'Fransızca', ru: 'Rusça', pt: 'Portekizce', de: 'Almanca', id: 'Endonezce', tr: 'Türkçe', ja: 'Japonca', ko: 'Korece' },
  ja: { en: '英語', es: 'スペイン語', fr: 'フランス語', ru: 'ロシア語', pt: 'ポルトガル語', de: 'ドイツ語', id: 'インドネシア語', tr: 'トルコ語', ja: '日本語', ko: '韓国語' },
  ko: { en: '영어', es: '스페인어', fr: '프랑스어', ru: '러시아어', pt: '포르투갈어', de: '독일어', id: '인도네시아어', tr: '튀르키예어', ja: '일본어', ko: '한국어' },
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
  if (isListening) {
    switch (baseLang) {
      case 'ru':
        return `Послушайте аудио и введите букву на ${metaName}:`;
      case 'es':
        return `Escucha el audio y escribe la letra en ${metaName}:`;
      case 'fr':
        return `Écoutez l'audio et tapez la lettre en ${metaName} :`;
      case 'pt':
        return `Ouça o áudio e digite a letra em ${metaName}:`;
      case 'de':
        return `Höre dir das Audio an und tippe den Buchstaben auf ${metaName}:`;
      case 'id':
        return `Dengarkan audio dan ketik hurufnya dalam ${metaName}:`;
      case 'tr':
        return `Sesi dinleyin ve ${metaName} dilindeki harfi yazın:`;
      case 'en':
      default:
        return `Listen to the audio and type the letter in ${metaName}:`;
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
      case 'en':
      default:
        return `What sound does the Cyrillic letter "${character}" make?`;
    }
  }

  switch (baseLang) {
    case 'ru':
      return `Какое произношение или название у буквы «${character}» в ${metaName}?`;
    case 'es':
      return `¿Cuál es el nombre o pronunciación de la letra «${character}» en ${metaName}?`;
    case 'fr':
      return `Quel est le nom ou la prononciation de la lettre « ${character} » en ${metaName} ?`;
    case 'pt':
      return `Qual é o nome ou pronúncia da letra «${character}» em ${metaName}?`;
    case 'de':
      return `Wie lautet der Name oder Laut des Buchstabens „${character}“ auf ${metaName}?`;
    case 'id':
      return `Apa nama atau lafal huruf "${character}" dalam ${metaName}?`;
    case 'tr':
      return `${metaName} dilinde "${character}" harfinin okunuşu veya adı nedir?`;
    case 'en':
    default:
      return `What is the pronunciation or name of the letter "${character}" in ${metaName}?`;
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
      case 'en':
      default:
        return `How do you say "${promptWord}" in ${targetNameInBase}?`;
    }
  }
};
