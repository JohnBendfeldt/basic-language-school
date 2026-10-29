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

export const EXTENDED_DICTIONARY: Record<string, Record<SupportedLanguageId, string>> = {
  // People & Family
  'man': { en: 'Man', es: 'Hombre', fr: 'Homme', ru: 'Мужчина', pt: 'Homem', de: 'Mann', id: 'Pria', tr: 'Erkek' },
  'woman': { en: 'Woman', es: 'Mujer', fr: 'Femme', ru: 'Женщина', pt: 'Mulher', de: 'Frau', id: 'Wanita', tr: 'Kadın' },
  'child': { en: 'Child', es: 'Niño / Niña', fr: 'Enfant', ru: 'Ребёнок', pt: 'Criança', de: 'Kind', id: 'Anak', tr: 'Çocuk' },
  'boy': { en: 'Boy', es: 'Niño / Chico', fr: 'Garçon', ru: 'Мальчик', pt: 'Menino', de: 'Junge', id: 'Anak laki-laki', tr: 'Erkek çocuk' },
  'girl': { en: 'Girl', es: 'Niña / Chica', fr: 'Fille', ru: 'Девочка', pt: 'Menina', de: 'Mädchen', id: 'Anak perempuan', tr: 'Kız çocuk' },
  'friend': { en: 'Friend', es: 'Amigo', fr: 'Ami', ru: 'Друг', pt: 'Amigo', de: 'Freund', id: 'Teman', tr: 'Arkadaş' },
  'family': { en: 'Family', es: 'Familia', fr: 'Famille', ru: 'Семья', pt: 'Família', de: 'Familie', id: 'Keluarga', tr: 'Aile' },
  'father': { en: 'Father', es: 'Padre', fr: 'Père', ru: 'Отец', pt: 'Pai', de: 'Vater', id: 'Ayah', tr: 'Baba' },
  'father / dad': { en: 'Father / Dad', es: 'Padre / Papá', fr: 'Père / Papa', ru: 'Папа / Отец', pt: 'Pai', de: 'Vater / Papa', id: 'Ayah', tr: 'Baba' },
  'mother': { en: 'Mother', es: 'Madre', fr: 'Mère', ru: 'Мать', pt: 'Mãe', de: 'Mutter', id: 'Ibu', tr: 'Anne' },
  'mother / mom': { en: 'Mother / Mom', es: 'Madre / Mamá', fr: 'Mère / Maman', ru: 'Мама / Мать', pt: 'Mãe', de: 'Mutter / Mama', id: 'Ibu', tr: 'Anne' },
  'mom': { en: 'Mom', es: 'Mamá', fr: 'Maman', ru: 'Мама', pt: 'Mãe', de: 'Mama', id: 'Ibu', tr: 'Anne' },
  'husband': { en: 'Husband', es: 'Esposo / Marido', fr: 'Mari', ru: 'Муж', pt: 'Marido', de: 'Ehemann', id: 'Suami', tr: 'Eş / Koca' },
  'wife': { en: 'Wife', es: 'Esposa / Mujer', fr: 'Femme / Épouse', ru: 'Жена', pt: 'Esposa', de: 'Ehefrau', id: 'Istri', tr: 'Eş / Karı' },
  'teacher': { en: 'Teacher', es: 'Profesor / Maestro', fr: 'Enseignant', ru: 'Учитель', pt: 'Professor', de: 'Lehrer', id: 'Guru', tr: 'Öğretmen' },
  'student': { en: 'Student', es: 'Estudiante / Alumno', fr: 'Étudiant', ru: 'Студент', pt: 'Estudante', de: 'Student', id: 'Pelajar', tr: 'Öğrenci' },
  'doctor': { en: 'Doctor', es: 'Médico / Doctor', fr: 'Médecin / Docteur', ru: 'Врач / Доктор', pt: 'Médico', de: 'Arzt', id: 'Dokter', tr: 'Doktor' },
  'we': { en: 'We', es: 'Nosotros', fr: 'Nous', ru: 'Мы', pt: 'Nós', de: 'Wir', id: 'Kami', tr: 'Biz' },

  // Food & Drink
  'water': { en: 'Water', es: 'Agua', fr: 'Eau', ru: 'Вода', pt: 'Água', de: 'Wasser', id: 'Air', tr: 'Su' },
  'bread': { en: 'Bread', es: 'Pan', fr: 'Pain', ru: 'Хлеб', pt: 'Pão', de: 'Brot', id: 'Roti', tr: 'Ekmek' },
  'food': { en: 'Food / Meal', es: 'Comida', fr: 'Nourriture', ru: 'Еда', pt: 'Comida', de: 'Essen', id: 'Makanan', tr: 'Yemek' },
  'milk': { en: 'Milk', es: 'Leche', fr: 'Lait', ru: 'Молоко', pt: 'Leite', de: 'Milch', id: 'Susu', tr: 'Süt' },
  'meat': { en: 'Meat', es: 'Carne', fr: 'Viande', ru: 'Мясо', pt: 'Carne', de: 'Fleisch', id: 'Daging', tr: 'Et' },
  'fish': { en: 'Fish', es: 'Pescado', fr: 'Poisson', ru: 'Рыба', pt: 'Peixe', de: 'Fisch', id: 'Ikan', tr: 'Balık' },
  'vegetables': { en: 'Vegetables', es: 'Verduras', fr: 'Légumes', ru: 'Овощи', pt: 'Legumes', de: 'Gemüse', id: 'Sayuran', tr: 'Sebzeler' },
  'fruits': { en: 'Fruits', es: 'Frutas', fr: 'Fruits', ru: 'Фрукты', pt: 'Frutas', de: 'Obst', id: 'Buah-buahan', tr: 'Meyveler' },
  'fruit': { en: 'Fruit', es: 'Fruta', fr: 'Fruit', ru: 'Фрукт / Фрукты', pt: 'Fruta', de: 'Frucht', id: 'Buah', tr: 'Meyve' },
  'rice': { en: 'Rice', es: 'Arroz', fr: 'Riz', ru: 'Рис', pt: 'Arroz', de: 'Reis', id: 'Nasi', tr: 'Pirinç' },
  'coffee': { en: 'Coffee', es: 'Café', fr: 'Café', ru: 'Кофе', pt: 'Café', de: 'Kaffee', id: 'Kopi', tr: 'Kahve' },
  'tea': { en: 'Tea', es: 'Té', fr: 'Thé', ru: 'Чай', pt: 'Chá', de: 'Tee', id: 'Teh', tr: 'Çay' },
  'beer': { en: 'Beer', es: 'Cerveza', fr: 'Bière', ru: 'Пиво', pt: 'Cerveja', de: 'Bier', id: 'Bir', tr: 'Bira' },
  'wine': { en: 'Wine', es: 'Vino', fr: 'Vin', ru: 'Вино', pt: 'Vinho', de: 'Wein', id: 'Anggur', tr: 'Şarap' },
  'breakfast': { en: 'Breakfast', es: 'Desayuno', fr: 'Petit-déjeuner', ru: 'Завтрак', pt: 'Café da manhã', de: 'Frühstück', id: 'Sarapan', tr: 'Kahvaltı' },
  'lunch': { en: 'Lunch', es: 'Almuerzo', fr: 'Déjeuner', ru: 'Обед', pt: 'Almoço', de: 'Mittagessen', id: 'Makan siang', tr: 'Öğle yemeği' },
  'dinner': { en: 'Dinner', es: 'Cena', fr: 'Dîner', ru: 'Ужин', pt: 'Jantar', de: 'Abendessen', id: 'Makan malam', tr: 'Akşam yemeği' },
  'salt': { en: 'Salt', es: 'Sal', fr: 'Sel', ru: 'Соль', pt: 'Sal', de: 'Salz', id: 'Garam', tr: 'Tuz' },

  // Places & Travel
  'store': { en: 'Store / Shop', es: 'Tienda', fr: 'Magasin', ru: 'Магазин', pt: 'Loja', de: 'Geschäft', id: 'Toko', tr: 'Mağaza' },
  'shop': { en: 'Store / Shop', es: 'Tienda', fr: 'Magasin', ru: 'Магазин', pt: 'Loja', de: 'Geschäft', id: 'Toko', tr: 'Mağaza' },
  'shop / store': { en: 'Store / Shop', es: 'Tienda', fr: 'Magasin', ru: 'Магазин', pt: 'Loja', de: 'Geschäft', id: 'Toko', tr: 'Mağaza' },
  'restaurant': { en: 'Restaurant', es: 'Restaurante', fr: 'Restaurant', ru: 'Ресторан', pt: 'Restaurante', de: 'Restaurant', id: 'Restoran', tr: 'Restoran' },
  'hotel': { en: 'Hotel', es: 'Hotel', fr: 'Hôtel', ru: 'Гостиница / Отель', pt: 'Hotel', de: 'Hotel', id: 'Hotel', tr: 'Otel' },
  'station': { en: 'Station', es: 'Estación', fr: 'Gare / Station', ru: 'Станция / Вокзал', pt: 'Estação', de: 'Bahnhof', id: 'Stasiun', tr: 'İstasyon' },
  'airport': { en: 'Airport', es: 'Aeropuerto', fr: 'Aéroport', ru: 'Аэропорт', pt: 'Aeroporto', de: 'Flughafen', id: 'Bandara', tr: 'Havalimanı' },
  'street': { en: 'Street', es: 'Calle', fr: 'Rue', ru: 'Улица', pt: 'Rua', de: 'Straße', id: 'Jalan', tr: 'Sokak' },
  'square': { en: 'Square (plaza)', es: 'Plaza', fr: 'Place', ru: 'Площадь', pt: 'Praça', de: 'Platz', id: 'Alun-alun', tr: 'Meydan' },
  'square (plaza)': { en: 'Square (plaza)', es: 'Plaza', fr: 'Place', ru: 'Площадь', pt: 'Praça', de: 'Platz', id: 'Alun-alun', tr: 'Meydan' },
  'park': { en: 'Park', es: 'Parque', fr: 'Parc', ru: 'Парк', pt: 'Parque', de: 'Park', id: 'Taman', tr: 'Park' },
  'hospital': { en: 'Hospital', es: 'Hospital', fr: 'Hôpital', ru: 'Больница', pt: 'Hospital', de: 'Krankenhaus', id: 'Rumah sakit', tr: 'Hastane' },
  'pharmacy': { en: 'Pharmacy', es: 'Farmacia', fr: 'Pharmacie', ru: 'Аптека', pt: 'Farmácia', de: 'Apotheke', id: 'Apotek', tr: 'Eczane' },
  'bank': { en: 'Bank', es: 'Banco', fr: 'Banque', ru: 'Банк', pt: 'Banco', de: 'Bank', id: 'Bank', tr: 'Banka' },
  'post office': { en: 'Post office', es: 'Oficina de correos', fr: 'Bureau de poste', ru: 'Почта', pt: 'Correios', de: 'Postamt', id: 'Kantor pos', tr: 'Postane' },
  'supermarket': { en: 'Supermarket', es: 'Supermercado', fr: 'Supermarché', ru: 'Супермаркет', pt: 'Supermercado', de: 'Supermarkt', id: 'Supermarket', tr: 'Süpermarket' },
  'police': { en: 'Police', es: 'Policía', fr: 'Police', ru: 'Полиция', pt: 'Polícia', de: 'Polizei', id: 'Polisi', tr: 'Polis' },
  'museum': { en: 'Museum', es: 'Museo', fr: 'Musée', ru: 'Музей', pt: 'Museu', de: 'Museum', id: 'Museum', tr: 'Müze' },
  'theater': { en: 'Theater', es: 'Teatro', fr: 'Théâtre', ru: 'Театр', pt: 'Teatro', de: 'Theater', id: 'Teater', tr: 'Tiyatro' },
  'cinema': { en: 'Cinema', es: 'Cine', fr: 'Cinéma', ru: 'Кино / Кинотеатр', pt: 'Cinema', de: 'Kino', id: 'Bioskop', tr: 'Sinema' },
  'city': { en: 'City', es: 'Ciudad', fr: 'Ville', ru: 'Город', pt: 'Cidade', de: 'Stadt', id: 'Kota', tr: 'Şehir' },
  'country': { en: 'Country', es: 'País', fr: 'Pays', ru: 'Страна', pt: 'País', de: 'Land', id: 'Negara', tr: 'Ülke' },
  'house': { en: 'House / Home', es: 'Casa', fr: 'Maison', ru: 'Дом', pt: 'Casa', de: 'Haus', id: 'Rumah', tr: 'Ev' },
  'home': { en: 'Home / House', es: 'Casa', fr: 'Maison', ru: 'Дом', pt: 'Casa', de: 'Haus', id: 'Rumah', tr: 'Ev' },
  'car': { en: 'Car', es: 'Carro / Coche', fr: 'Voiture', ru: 'Машина', pt: 'Carro', de: 'Auto', id: 'Mobil', tr: 'Araba' },
  'train': { en: 'Train', es: 'Tren', fr: 'Train', ru: 'Поезд', pt: 'Trem', de: 'Zug', id: 'Kereta', tr: 'Tren' },
  'bus': { en: 'Bus', es: 'Autobús', fr: 'Bus', ru: 'Автобус', pt: 'Ônibus', de: 'Bus', id: 'Bus', tr: 'Otobüs' },
  'airplane': { en: 'Airplane', es: 'Avión', fr: 'Avion', ru: 'Самолёт', pt: 'Avião', de: 'Flugzeug', id: 'Pesawat', tr: 'Uçak' },
  'taxi': { en: 'Taxi', es: 'Taxi', fr: 'Taxi', ru: 'Такси', pt: 'Táxi', de: 'Taxi', id: 'Taksi', tr: 'Taksi' },
  'subway / metro': { en: 'Subway / Metro', es: 'Metro', fr: 'Métro', ru: 'Метро', pt: 'Metrô', de: 'U-Bahn', id: 'Metro', tr: 'Metro' },
  'subway': { en: 'Subway', es: 'Metro', fr: 'Métro', ru: 'Метро', pt: 'Metrô', de: 'U-Bahn', id: 'Metro', tr: 'Metro' },
  'map': { en: 'Map', es: 'Mapa', fr: 'Carte / Plan', ru: 'Карта', pt: 'Mapa', de: 'Karte', id: 'Peta', tr: 'Harita' },
  'visa': { en: 'Visa', es: 'Visa / Visado', fr: 'Visa', ru: 'Виза', pt: 'Visto', de: 'Visum', id: 'Visa', tr: 'Vize' },
  'center': { en: 'Center', es: 'Centro', fr: 'Centre', ru: 'Центр', pt: 'Centro', de: 'Zentrum', id: 'Pusat', tr: 'Merkez' },
  'factory': { en: 'Factory', es: 'Fábrica', fr: 'Usine', ru: 'Завод', pt: 'Fábrica', de: 'Fabrik', id: 'Pabrik', tr: 'Fabrika' },
  'sea': { en: 'Sea', es: 'Mar', fr: 'Mer', ru: 'Море', pt: 'Mar', de: 'Meer', id: 'Laut', tr: 'Deniz' },

  // Everyday Essentials & Objects
  'money': { en: 'Money', es: 'Dinero', fr: 'Argent', ru: 'Деньги', pt: 'Dinheiro', de: 'Geld', id: 'Uang', tr: 'Para' },
  'ticket': { en: 'Ticket', es: 'Boleto / Billete', fr: 'Billet', ru: 'Билет', pt: 'Passagem', de: 'Ticket', id: 'Tiket', tr: 'Bilet' },
  'passport': { en: 'Passport', es: 'Pasaporte', fr: 'Passeport', ru: 'Паспорт', pt: 'Passaporte', de: 'Reisepass', id: 'Paspor', tr: 'Pasaport' },
  'phone': { en: 'Phone', es: 'Teléfono', fr: 'Téléphone', ru: 'Телефон', pt: 'Telefone', de: 'Telefon', id: 'Telepon', tr: 'Telefon' },
  'telephone': { en: 'Telephone', es: 'Teléfono', fr: 'Téléphone', ru: 'Телефон', pt: 'Telefone', de: 'Telefon', id: 'Telepon', tr: 'Telefon' },
  'computer': { en: 'Computer', es: 'Computadora', fr: 'Ordinateur', ru: 'Компьютер', pt: 'Computador', de: 'Computer', id: 'Komputer', tr: 'Bilgisayar' },
  'book': { en: 'Book', es: 'Libro', fr: 'Livre', ru: 'Книга', pt: 'Livro', de: 'Buch', id: 'Buku', tr: 'Kitap' },
  'magazine': { en: 'Magazine', es: 'Revista', fr: 'Magazine', ru: 'Журнал', pt: 'Revista', de: 'Zeitschrift', id: 'Majalah', tr: 'Dergi' },
  'help': { en: 'Help', es: 'Ayuda', fr: 'Aide', ru: 'Помощь', pt: 'Ajuda', de: 'Hilfe', id: 'Bantuan', tr: 'Yardım' },
  'time': { en: 'Time', es: 'Tiempo / Hora', fr: 'Temps / Heure', ru: 'Время', pt: 'Tempo', de: 'Zeit', id: 'Waktu', tr: 'Zaman' },
  'work': { en: 'Work / Job', es: 'Trabajo', fr: 'Travail', ru: 'Работа', pt: 'Trabalho', de: 'Arbeit', id: 'Pekerjaan', tr: 'İş' },
  'office': { en: 'Office', es: 'Oficina', fr: 'Bureau', ru: 'Офис', pt: 'Escritório', de: 'Büro', id: 'Kantor', tr: 'Ofis' },
  'card': { en: 'Card', es: 'Tarjeta', fr: 'Carte', ru: 'Карта / Карточка', pt: 'Cartão', de: 'Karte', id: 'Kartu', tr: 'Kart' },
  'table': { en: 'Table', es: 'Mesa', fr: 'Table', ru: 'Стол', pt: 'Mesa', de: 'Tisch', id: 'Meja', tr: 'Masa' },
  'chair': { en: 'Chair', es: 'Silla', fr: 'Chaise', ru: 'Стул', pt: 'Cadeira', de: 'Stuhl', id: 'Kursi', tr: 'Sandalye' },
  'door': { en: 'Door', es: 'Puerta', fr: 'Porte', ru: 'Дверь', pt: 'Porta', de: 'Tür', id: 'Pintu', tr: 'Kapı' },
  'bag': { en: 'Bag', es: 'Bolsa / Maleta', fr: 'Sac', ru: 'Сумка', pt: 'Bolsa', de: 'Tasche', id: 'Tas', tr: 'Çanta' },
  'clothes': { en: 'Clothes', es: 'Ropa', fr: 'Vêtements', ru: 'Одежда', pt: 'Roupas', de: 'Kleidung', id: 'Pakaian', tr: 'Giysi' },
  'shoes': { en: 'Shoes', es: 'Zapatos', fr: 'Chaussures', ru: 'Обувь / Туфли', pt: 'Sapatos', de: 'Schuhe', id: 'Sepatu', tr: 'Ayakkabı' },
  'object': { en: 'Object', es: 'Objeto', fr: 'Objet', ru: 'Объект / Предмет', pt: 'Objeto', de: 'Objekt', id: 'Benda', tr: 'Nesne' },

  // Question Words
  'who': { en: 'Who', es: 'Quién', fr: 'Qui', ru: 'Кто', pt: 'Quem', de: 'Wer', id: 'Siapa', tr: 'Kim' },
  'what': { en: 'What', es: 'Qué', fr: 'Quoi / Que', ru: 'Что', pt: 'O que', de: 'Was', id: 'Apa', tr: 'Ne' },
  'what?': { en: 'What?', es: '¿Qué?', fr: 'Quoi ?', ru: 'Что?', pt: 'O quê?', de: 'Was?', id: 'Apa?', tr: 'Ne?' },
  'where': { en: 'Where', es: 'Dónde', fr: 'Où', ru: 'Где', pt: 'Onde', de: 'Wo', id: 'Di mana', tr: 'Nerede' },
  'where?': { en: 'Where?', es: '¿Dónde?', fr: 'Où ?', ru: 'Где?', pt: 'Onde?', de: 'Wo?', id: 'Di mana?', tr: 'Nerede?' },
  'when': { en: 'When', es: 'Cuándo', fr: 'Quand', ru: 'Когда', pt: 'Quando', de: 'Wann', id: 'Kapan', tr: 'Ne zaman' },
  'when?': { en: 'When?', es: '¿Cuándo?', fr: 'Quand ?', ru: 'Когда?', pt: 'Quando?', de: 'Wann?', id: 'Kapan?', tr: 'Ne zaman?' },
  'who?': { en: 'Who?', es: '¿Quién?', fr: 'Qui ?', ru: 'Кто?', pt: 'Quem?', de: 'Wer?', id: 'Siapa?', tr: 'Kim?' },
  'why': { en: 'Why', es: 'Por qué', fr: 'Pourquoi', ru: 'Почему', pt: 'Por que', de: 'Warum', id: 'Mengapa', tr: 'Neden' },
  'why?': { en: 'Why?', es: '¿Por qué?', fr: 'Pourquoi ?', ru: 'Почему?', pt: 'Por quê?', de: 'Warum?', id: 'Mengapa?', tr: 'Neden?' },
  'how': { en: 'How', es: 'Cómo', fr: 'Comment', ru: 'Как', pt: 'Como', de: 'Wie', id: 'Bagaimana', tr: 'Nasıl' },
  'how?': { en: 'How?', es: '¿Cómo?', fr: 'Comment ?', ru: 'Как?', pt: 'Como?', de: 'Wie?', id: 'Bagaimana?', tr: 'Nasıl?' },
  'how much / how many': { en: 'How much / How many', es: 'Cuánto / Cuántos', fr: 'Combien', ru: 'Сколько', pt: 'Quanto', de: 'Wie viel', id: 'Berapa', tr: 'Ne kadar' },
  'how much': { en: 'How much', es: 'Cuánto', fr: 'Combien', ru: 'Сколько', pt: 'Quanto', de: 'Wie viel', id: 'Berapa', tr: 'Ne kadar' },

  // Days of the Week & Calendar
  'monday': { en: 'Monday', es: 'Lunes', fr: 'Lundi', ru: 'Понедельник', pt: 'Segunda-feira', de: 'Montag', id: 'Senin', tr: 'Pazartesi' },
  'tuesday': { en: 'Tuesday', es: 'Martes', fr: 'Mardi', ru: 'Вторник', pt: 'Terça-feira', de: 'Dienstag', id: 'Selasa', tr: 'Salı' },
  'wednesday': { en: 'Wednesday', es: 'Miércoles', fr: 'Mercredi', ru: 'Среда', pt: 'Quarta-feira', de: 'Mittwoch', id: 'Rabu', tr: 'Çarşamba' },
  'thursday': { en: 'Thursday', es: 'Jueves', fr: 'Jeudi', ru: 'Четверг', pt: 'Quinta-feira', de: 'Donnerstag', id: 'Kamis', tr: 'Perşembe' },
  'friday': { en: 'Friday', es: 'Viernes', fr: 'Vendredi', ru: 'Пятница', pt: 'Sexta-feira', de: 'Freitag', id: 'Jumat', tr: 'Cuma' },
  'saturday': { en: 'Saturday', es: 'Sábado', fr: 'Samedi', ru: 'Суббота', pt: 'Sábado', de: 'Samstag', id: 'Sabtu', tr: 'Cumartesi' },
  'sunday': { en: 'Sunday', es: 'Domingo', fr: 'Dimanche', ru: 'Воскресенье', pt: 'Domingo', de: 'Sonntag', id: 'Minggu', tr: 'Pazar' },
  'week': { en: 'Week', es: 'Semana', fr: 'Semaine', ru: 'Неделя', pt: 'Semana', de: 'Woche', id: 'Minggu', tr: 'Hafta' },
  'month': { en: 'Month', es: 'Mes', fr: 'Mois', ru: 'Месяц', pt: 'Mês', de: 'Monat', id: 'Bulan', tr: 'Ay' },
  'year': { en: 'Year', es: 'Año', fr: 'An / Année', ru: 'Год', pt: 'Ano', de: 'Jahr', id: 'Tahun', tr: 'Yıl' },

  // Animals, Weather & Nature
  'dog': { en: 'Dog', es: 'Perro', fr: 'Chien', ru: 'Собака', pt: 'Cachorro', de: 'Hund', id: 'Anjing', tr: 'Köpek' },
  'cat': { en: 'Cat', es: 'Gato', fr: 'Chat', ru: 'Кот / Кошка', pt: 'Gato', de: 'Katze', id: 'Kucing', tr: 'Kedi' },
  'bird': { en: 'Bird', es: 'Pájaro / Ave', fr: 'Oiseau', ru: 'Птица', pt: 'Pássaro', de: 'Vogel', id: 'Burung', tr: 'Kuş' },
  'sun': { en: 'Sun', es: 'Sol', fr: 'Soleil', ru: 'Солнце', pt: 'Sol', de: 'Sonne', id: 'Matahari', tr: 'Güneş' },
  'moon': { en: 'Moon', es: 'Luna', fr: 'Lune', ru: 'Луна', pt: 'Lua', de: 'Mond', id: 'Bulan', tr: 'Ay' },
  'star': { en: 'Star', es: 'Estrella', fr: 'Étoile', ru: 'Звезда', pt: 'Estrela', de: 'Stern', id: 'Bintang', tr: 'Yıldız' },
  'rain': { en: 'Rain', es: 'Lluvia', fr: 'Pluie', ru: 'Дождь', pt: 'Chuva', de: 'Regen', id: 'Hujan', tr: 'Yağmur' },
  'snow': { en: 'Snow', es: 'Nieve', fr: 'Neige', ru: 'Снег', pt: 'Neve', de: 'Schnee', id: 'Salju', tr: 'Kar' },
  'cold': { en: 'Cold', es: 'Frío', fr: 'Froid', ru: 'Холодно / Холодный', pt: 'Frio', de: 'Kalt', id: 'Dingin', tr: 'Soğuk' },
  'hot': { en: 'Hot', es: 'Caliente / Calor', fr: 'Chaud', ru: 'Жарко / Горячий', pt: 'Quente', de: 'Heiß', id: 'Panas', tr: 'Sıcak' },
  'hedgehog': { en: 'Hedgehog', es: 'Erizo', fr: 'Hérisson', ru: 'Ёж', pt: 'Ouriço', de: 'Igel', id: 'Landak', tr: 'Kirpi' },
  'beetle': { en: 'Beetle / Bug', es: 'Escarabajo', fr: 'Scarabée', ru: 'Жук', pt: 'Besouro', de: 'Käfer', id: 'Kumbang', tr: 'Böcek' },
  'flower': { en: 'Flower', es: 'Flor', fr: 'Fleur', ru: 'Цветок', pt: 'Flor', de: 'Blume', id: 'Bunga', tr: 'Çiçek' },
  'tree': { en: 'Tree', es: 'Árbol', fr: 'Arbre', ru: 'Дерево', pt: 'Árvore', de: 'Baum', id: 'Pohon', tr: 'Ağaç' },
  'christmas tree': { en: 'Christmas tree', es: 'Árbol de Navidad', fr: 'Sapin de Noël', ru: 'Ёлка', pt: 'Árvore de Natal', de: 'Weihnachtsbaum', id: 'Pohon Natal', tr: 'Noel ağacı' },
  'zebra': { en: 'Zebra', es: 'Cebra', fr: 'Zèbre', ru: 'Зебра', pt: 'Zebra', de: 'Zebra', id: 'Zebra', tr: 'Zebra' },

  // Adjectives & Qualities
  'good': { en: 'Good', es: 'Bueno', fr: 'Bon', ru: 'Хороший / Хорошо', pt: 'Bom', de: 'Gut', id: 'Baik', tr: 'İyi' },
  'bad': { en: 'Bad', es: 'Malo', fr: 'Mauvais', ru: 'Плохой / Плохо', pt: 'Ruim', de: 'Schlecht', id: 'Buruk', tr: 'Kötü' },
  'big': { en: 'Big / Large', es: 'Grande', fr: 'Grand', ru: 'Большой', pt: 'Grande', de: 'Groß', id: 'Besar', tr: 'Büyük' },
  'small': { en: 'Small / Little', es: 'Pequeño', fr: 'Petit', ru: 'Маленький', pt: 'Pequeno', de: 'Klein', id: 'Kecil', tr: 'Küçük' },
  'new': { en: 'New', es: 'Nuevo', fr: 'Nouveau', ru: 'Новый', pt: 'Novo', de: 'Neu', id: 'Baru', tr: 'Yeni' },
  'old': { en: 'Old', es: 'Viejo / Antiguo', fr: 'Vieux / Ancien', ru: 'Старый', pt: 'Velho', de: 'Alt', id: 'Tua / Lama', tr: 'Eski / Yaşlı' },
  'open': { en: 'Open', es: 'Abierto', fr: 'Ouvert', ru: 'Открыто / Открытый', pt: 'Aberto', de: 'Offen', id: 'Buka', tr: 'Açık' },
  'closed': { en: 'Closed', es: 'Cerrado', fr: 'Fermé', ru: 'Закрыто / Закрытый', pt: 'Fechado', de: 'Geschlossen', id: 'Tutup', tr: 'Kapalı' },
  'fast': { en: 'Fast / Quick', es: 'Rápido', fr: 'Rapide', ru: 'Быстрый / Быстро', pt: 'Rápido', de: 'Schnell', id: 'Cepat', tr: 'Hızlı' },
  'slow': { en: 'Slow', es: 'Lento', fr: 'Lent', ru: 'Медленный / Медленно', pt: 'Lento', de: 'Langsam', id: 'Lambat', tr: 'Yavaş' },
  'happy': { en: 'Happy', es: 'Feliz', fr: 'Heureux', ru: 'Счастливый / Рад', pt: 'Feliz', de: 'Glücklich', id: 'Senang', tr: 'Mutlu' },
  'ready': { en: 'Ready', es: 'Listo', fr: 'Prêt', ru: 'Готов / Готовый', pt: 'Pronto', de: 'Bereit', id: 'Siap', tr: 'Hazır' },

  // Alphabet & Beginner Vocabulary
  'apple': { en: 'Apple', es: 'Manzana', fr: 'Pomme', ru: 'Яблоко', pt: 'Maçã', de: 'Apfel', id: 'Apel', tr: 'Elma' },
  'egg': { en: 'Egg', es: 'Huevo', fr: 'Œuf', ru: 'Яйцо', pt: 'Ovo', de: 'Ei', id: 'Telur', tr: 'Yumurta' },
  'ice': { en: 'Ice', es: 'Hielo', fr: 'Glace', ru: 'Лёд', pt: 'Gelo', de: 'Eis', id: 'Es', tr: 'Buz' },
  'juice': { en: 'Juice', es: 'Jugo', fr: 'Jus', ru: 'Сок', pt: 'Suco', de: 'Saft', id: 'Jus', tr: 'Meyve suyu' },
  'key': { en: 'Key', es: 'Llave', fr: 'Clé', ru: 'Ключ', pt: 'Chave', de: 'Schlüssel', id: 'Kunci', tr: 'Anahtar' },
  'light': { en: 'Light', es: 'Luz', fr: 'Lumière', ru: 'Свет', pt: 'Luz', de: 'Licht', id: 'Cahaya', tr: 'Işık' },
  'name': { en: 'Name', es: 'Nombre', fr: 'Nom', ru: 'Имя', pt: 'Nome', de: 'Name', id: 'Nama', tr: 'İsim' },
  'orange': { en: 'Orange', es: 'Naranja', fr: 'Orange', ru: 'Апельсин', pt: 'Laranja', de: 'Orange', id: 'Oranye', tr: 'Turuncu' },
  'quiet': { en: 'Quiet', es: 'Tranquilo / Silencioso', fr: 'Silencieux / Calme', ru: 'Тихий', pt: 'Calmo', de: 'Ruhig', id: 'Tenang', tr: 'Sessiz' },
  'road': { en: 'Road', es: 'Camino / Carretera', fr: 'Route', ru: 'Дорога', pt: 'Estrada', de: 'Straße', id: 'Jalan', tr: 'Yol' },
  'school': { en: 'School', es: 'Escuela', fr: 'École', ru: 'Школа', pt: 'Escola', de: 'Schule', id: 'Sekolah', tr: 'Okul' },
  'umbrella': { en: 'Umbrella', es: 'Paraguas', fr: 'Parapluie', ru: 'Зонт', pt: 'Guarda-chuva', de: 'Regenschirm', id: 'Payung', tr: 'Şemsiye' },
  'voice': { en: 'Voice', es: 'Voz', fr: 'Voix', ru: 'Голос', pt: 'Voz', de: 'Stimme', id: 'Suara', tr: 'Ses' },
  'x-ray': { en: 'X-ray', es: 'Rayos X', fr: 'Rayons X', ru: 'Рентген', pt: 'Raio X', de: 'Röntgenbild', id: 'Sinar-X', tr: 'Röntgen' },
  'xylophone': { en: 'Xylophone', es: 'Xilófono', fr: 'Xylophone', ru: 'Ксилофон', pt: 'Xilofone', de: 'Xylophon', id: 'Xilofon', tr: 'Ksilofon' },
  'yellow': { en: 'Yellow', es: 'Amarillo', fr: 'Jaune', ru: 'Жёлтый', pt: 'Amarelo', de: 'Gelb', id: 'Kuning', tr: 'Sarı' },
  'zero': { en: 'Zero', es: 'Cero', fr: 'Zéro', ru: 'Ноль', pt: 'Zero', de: 'Null', id: 'Nol', tr: 'Sıfır' },
  'love': { en: 'Love', es: 'Amor', fr: 'Amour', ru: 'Любовь', pt: 'Amor', de: 'Liebe', id: 'Cinta', tr: 'Aşk' },
  'boat': { en: 'Boat', es: 'Barco', fr: 'Bateau', ru: 'Лодка', pt: 'Barco', de: 'Boot', id: 'Perahu', tr: 'Tekne' },
  'day': { en: 'Day', es: 'Día', fr: 'Jour', ru: 'День', pt: 'Dia', de: 'Tag', id: 'Hari', tr: 'Gün' },
  'island': { en: 'Island', es: 'Isla', fr: 'Île', ru: 'Остров', pt: 'Ilha', de: 'Insel', id: 'Pulau', tr: 'Ada' },
  'kilogram': { en: 'Kilogram', es: 'Kilo', fr: 'Kilo', ru: 'Килограмм', pt: 'Quilo', de: 'Kilogramm', id: 'Kilogram', tr: 'Kilogram' },
  'kilo': { en: 'Kilogram', es: 'Kilo', fr: 'Kilo', ru: 'Килограмм', pt: 'Quilo', de: 'Kilogramm', id: 'Kilogram', tr: 'Kilogram' },
  'night': { en: 'Night', es: 'Noche', fr: 'Nuit', ru: 'Ночь', pt: 'Noite', de: 'Nacht', id: 'Malam', tr: 'Gece' },
  'eye': { en: 'Eye', es: 'Ojo', fr: 'Œil', ru: 'Глаз', pt: 'Olho', de: 'Auge', id: 'Mata', tr: 'Göz' },
  'eyes': { en: 'Eyes', es: 'Ojos', fr: 'Yeux', ru: 'Глаза', pt: 'Olhos', de: 'Augen', id: 'Mata', tr: 'Gözler' },
  'cheek': { en: 'Cheek', es: 'Mejilla', fr: 'Joue', ru: 'Щека', pt: 'Bochecha', de: 'Wange', id: 'Pipi', tr: 'Yanak' },
  'cheese': { en: 'Cheese', es: 'Queso', fr: 'Fromage', ru: 'Сыр', pt: 'Queijo', de: 'Käse', id: 'Keju', tr: 'Peynir' },
  'clock': { en: 'Clock / Watch', es: 'Reloj', fr: 'Horloge / Montre', ru: 'Часы', pt: 'Relógio', de: 'Uhr', id: 'Jam', tr: 'Saat' },
  'watch': { en: 'Watch / Clock', es: 'Reloj', fr: 'Montre', ru: 'Часы', pt: 'Relógio', de: 'Uhr', id: 'Jam tangan', tr: 'Saat' },
  'grape': { en: 'Grape', es: 'Uva', fr: 'Raisin', ru: 'Виноград', pt: 'Uva', de: 'Traube', id: 'Anggur', tr: 'Üzüm' },
  'glass': { en: 'Glass (cup)', es: 'Vaso', fr: 'Verre', ru: 'Стакан', pt: 'Copo', de: 'Glas', id: 'Gelas', tr: 'Bardak' },
  'web': { en: 'Web', es: 'Web', fr: 'Web', ru: 'Веб', pt: 'Web', de: 'Web', id: 'Web', tr: 'Web' },
  'success': { en: 'Success', es: 'Éxito', fr: 'Succès', ru: 'Успех', pt: 'Sucesso', de: 'Erfolg', id: 'Sukses', tr: 'Başarı' },
  'yolk': { en: 'Yolk', es: 'Yema', fr: 'Jaune d\'œuf', ru: 'Желток', pt: 'Gema', de: 'Eigelb', id: 'Kuning telur', tr: 'Yumurta sarısı' },
  'shoe': { en: 'Shoe', es: 'Zapato', fr: 'Chaussure', ru: 'Обувь', pt: 'Sapato', de: 'Schuh', id: 'Sepatu', tr: 'Ayakkabı' },
  'idea': { en: 'Idea', es: 'Idea', fr: 'Idée', ru: 'Идея', pt: 'Ideia', de: 'Idee', id: 'Ide', tr: 'Fikir' },
  'question': { en: 'Question', es: 'Pregunta', fr: 'Question', ru: 'Вопрос', pt: 'Pergunta', de: 'Frage', id: 'Pertanyaan', tr: 'Soru' },
  'wagon': { en: 'Wagon / Car', es: 'Vagón', fr: 'Wagon', ru: 'Вагон', pt: 'Vagão', de: 'Waggon', id: 'Gerbong', tr: 'Vagon' },
  'example': { en: 'Example', es: 'Ejemplo', fr: 'Exemple', ru: 'Пример', pt: 'Exemplo', de: 'Beispiel', id: 'Contoh', tr: 'Örnek' },
  'brother': { en: 'Brother', es: 'Hermano', fr: 'Frère', ru: 'Брат', pt: 'Irmão', de: 'Bruder', id: 'Saudara laki-laki', tr: 'Erkek kardeş' },
  'sister': { en: 'Sister', es: 'Hermana', fr: 'Sœur', ru: 'Сестра', pt: 'Irmã', de: 'Schwester', id: 'Saudara perempuan', tr: 'Kız kardeş' },
  'lemon': { en: 'Lemon', es: 'Limón', fr: 'Citron', ru: 'Лимон', pt: 'Limão', de: 'Zitrone', id: 'Lemon', tr: 'Limon' },
  'nose': { en: 'Nose', es: 'Nariz', fr: 'Nez', ru: 'Нос', pt: 'Nariz', de: 'Nase', id: 'Hidung', tr: 'Burun' },
  'window': { en: 'Window', es: 'Ventana', fr: 'Fenêtre', ru: 'Окно', pt: 'Janela', de: 'Fenster', id: 'Jendela', tr: 'Pencere' },
  'dad': { en: 'Dad', es: 'Papá', fr: 'Papa', ru: 'Папа', pt: 'Pai', de: 'Papa', id: 'Ayah', tr: 'Baba' },
  'kettle': { en: 'Kettle', es: 'Tetera', fr: 'Bouilloire', ru: 'Чайник', pt: 'Chaleira', de: 'Wasserkocher', id: 'Teko', tr: 'Çaydanlık' },
  'morning': { en: 'Morning', es: 'Mañana', fr: 'Matin', ru: 'Утро', pt: 'Manhã', de: 'Morgen', id: 'Pagi', tr: 'Sabah' },
  'afternoon': { en: 'Afternoon', es: 'Tarde', fr: 'Après-midi', ru: 'День (после полудня)', pt: 'Tarde', de: 'Nachmittag', id: 'Siang', tr: 'Öğleden sonra' },
  'evening': { en: 'Evening', es: 'Tarde / Noche', fr: 'Soir', ru: 'Вечер', pt: 'Noite', de: 'Abend', id: 'Malam', tr: 'Akşam' },
  'photo': { en: 'Photo', es: 'Foto', fr: 'Photo', ru: 'Фото', pt: 'Foto', de: 'Foto', id: 'Foto', tr: 'Fotoğraf' },
  'czar': { en: 'Czar / King', es: 'Zar', fr: 'Tsar', ru: 'Царь', pt: 'Czar', de: 'Zar', id: 'Raja', tr: 'Çar' },
  'borscht': { en: 'Borscht', es: 'Borsch', fr: 'Bortsch', ru: 'Борщ', pt: 'Borsch', de: 'Borschtsch', id: 'Sup bit', tr: 'Borş' },
  'entrance': { en: 'Entrance', es: 'Entrada', fr: 'Entrée', ru: 'Подъезд', pt: 'Entrada', de: 'Eingang', id: 'Pintu masuk', tr: 'Giriş' },
  'south': { en: 'South', es: 'Sur', fr: 'Sud', ru: 'Юг', pt: 'Sul', de: 'Süden', id: 'Selatan', tr: 'Güney' },
  'yogurt': { en: 'Yogurt', es: 'Yogur', fr: 'Yaourt', ru: 'Йогурт', pt: 'Iogurte', de: 'Joghurt', id: 'Yogurt', tr: 'Yoğurt' },
  'heart': { en: 'Heart', es: 'Corazón', fr: 'Cœur', ru: 'Сердце', pt: 'Coração', de: 'Herz', id: 'Hati', tr: 'Kalp' },
  'cup': { en: 'Cup', es: 'Taza', fr: 'Tasse', ru: 'Чашка', pt: 'Xícara', de: 'Tasse', id: 'Cangkir', tr: 'Fincan' },
  'source': { en: 'Source', es: 'Fuente', fr: 'Source', ru: 'Источник', pt: 'Fonte', de: 'Quelle', id: 'Sumber', tr: 'Kaynak' },
  'oil': { en: 'Oil', es: 'Aceite', fr: 'Huile', ru: 'Масло', pt: 'Óleo', de: 'Öl', id: 'Minyak', tr: 'Yağ' },
  'or': { en: 'Or', es: 'O', fr: 'Ou', ru: 'Или', pt: 'Ou', de: 'Oder', id: 'Atau', tr: 'Veya' },
  'this': { en: 'This', es: 'Esto', fr: 'Ceci', ru: 'Это', pt: 'Isto', de: 'Dies', id: 'Ini', tr: 'Bu' },
  'i eat': { en: 'I eat', es: 'Como', fr: 'Je mange', ru: 'Ем', pt: 'Eu como', de: 'Ich esse', id: 'Saya makan', tr: 'Yiyorum' },
  'yes': { en: 'Yes', es: 'Sí', fr: 'Oui', ru: 'Да', pt: 'Sim', de: 'Ja', id: 'Ya', tr: 'Evet' },
  'no': { en: 'No', es: 'No', fr: 'Non', ru: 'Нет', pt: 'Não', de: 'Nein', id: 'Tidak', tr: 'Hayır' },
  'maybe': { en: 'Maybe', es: 'Quizás / Tal vez', fr: 'Peut-être', ru: 'Может быть', pt: 'Talvez', de: 'Vielleicht', id: 'Mungkin', tr: 'Belki' },
  'today': { en: 'Today', es: 'Hoy', fr: 'Aujourd\'hui', ru: 'Сегодня', pt: 'Hoje', de: 'Heute', id: 'Hari ini', tr: 'Bugün' },
  'tomorrow': { en: 'Tomorrow', es: 'Mañana', fr: 'Demain', ru: 'Завтра', pt: 'Amanhã', de: 'Morgen', id: 'Besok', tr: 'Yarın' },
  'yesterday': { en: 'Yesterday', es: 'Ayer', fr: 'Hier', ru: 'Вчера', pt: 'Ontem', de: 'Gestern', id: 'Kemarin', tr: 'Dün' },

  // Core Actions (Verbs)
  'to learn': { en: 'To learn', es: 'Aprender', fr: 'Apprendre', ru: 'Учиться', pt: 'Aprender', de: 'Lernen', id: 'Belajar', tr: 'Öğrenmek' },
  'to speak': { en: 'To speak', es: 'Hablar', fr: 'Parler', ru: 'Говорить', pt: 'Falar', de: 'Sprechen', id: 'Berbicara', tr: 'Konuşmak' },
  'to eat': { en: 'To eat', es: 'Comer', fr: 'Manger', ru: 'Есть', pt: 'Comer', de: 'Essen', id: 'Makan', tr: 'Yemek' },
  'to drink': { en: 'To drink', es: 'Beber', fr: 'Boire', ru: 'Пить', pt: 'Beber', de: 'Trinken', id: 'Minum', tr: 'İçmek' },
  'to go': { en: 'To go', es: 'Ir', fr: 'Aller', ru: 'Идти / Ехать', pt: 'Ir', de: 'Gehen', id: 'Pergi', tr: 'Gitmek' },
  'to come': { en: 'To come', es: 'Venir', fr: 'Venir', ru: 'Приходить / Приезжать', pt: 'Vir', de: 'Kommen', id: 'Datang', tr: 'Gelmek' },
  'to understand': { en: 'To understand', es: 'Entender / Comprender', fr: 'Comprendre', ru: 'Понимать', pt: 'Entender', de: 'Verstehen', id: 'Mengerti', tr: 'Anlamak' },
  'to know': { en: 'To know', es: 'Saber / Conocer', fr: 'Savoir / Connaître', ru: 'Знать', pt: 'Saber', de: 'Wissen', id: 'Tahu', tr: 'Bilmek' },
  'to want': { en: 'To want', es: 'Querer', fr: 'Vouloir', ru: 'Хотеть', pt: 'Querer', de: 'Wollen', id: 'Ingin', tr: 'İstemek' },
  'want': { en: 'To want', es: 'Querer', fr: 'Vouloir', ru: 'Хотеть', pt: 'Querer', de: 'Wollen', id: 'Ingin', tr: 'İstemek' },
  'to need': { en: 'To need', es: 'Necesitar', fr: 'Avoir besoin de', ru: 'Нуждаться (нужно)', pt: 'Precisar', de: 'Brauchen', id: 'Butuh', tr: 'İhtiyacı olmak' },
  'to buy': { en: 'To buy', es: 'Comprar', fr: 'Acheter', ru: 'Покупать', pt: 'Comprar', de: 'Kaufen', id: 'Membeli', tr: 'Satın almak' },
  'to help': { en: 'To help', es: 'Ayudar', fr: 'Aider', ru: 'Помогать', pt: 'Ajudar', de: 'Helfen', id: 'Membantu', tr: 'Yardım etmek' },
  'to work': { en: 'To work', es: 'Trabajar', fr: 'Travailler', ru: 'Работать', pt: 'Trabalhar', de: 'Arbeiten', id: 'Bekerja', tr: 'Çalışmak' },

  // Essential Phrases
  'hello': { en: 'Hello', es: '¡Hola!', fr: 'Bonjour', ru: 'Привет / Здравствуйте', pt: 'Olá', de: 'Hallo', id: 'Halo', tr: 'Merhaba' },
  'hello (informal)': { en: 'Hello (informal)', es: '¡Hola! (informal)', fr: 'Salut (informel)', ru: 'Привет', pt: 'Oi / Olá', de: 'Hallo', id: 'Halo', tr: 'Merhaba' },
  'hello (formal)': { en: 'Hello (formal)', es: 'Buenos días / Hola (formal)', fr: 'Bonjour (formel)', ru: 'Здравствуйте', pt: 'Olá / Bom dia', de: 'Guten Tag', id: 'Selamat pagi', tr: 'Merhaba' },
  'good morning': { en: 'Good morning', es: 'Buenos días', fr: 'Bonjour', ru: 'Доброе утро', pt: 'Bom dia', de: 'Guten Morgen', id: 'Selamat pagi', tr: 'Günaydın' },
  'good afternoon': { en: 'Good afternoon', es: 'Buenas tardes', fr: 'Bon après-midi', ru: 'Добрый день', pt: 'Boa tarde', de: 'Guten Tag', id: 'Selamat siang', tr: 'İyi günler' },
  'good evening': { en: 'Good evening', es: 'Buenas noches', fr: 'Bonsoir', ru: 'Добрый вечер', pt: 'Boa noite', de: 'Guten Abend', id: 'Selamat malam', tr: 'İyi akşamlar' },
  'good night': { en: 'Good night', es: 'Buenas noches', fr: 'Bonne nuit', ru: 'Спокойной ночи', pt: 'Boa noite', de: 'Gute Nacht', id: 'Selamat malam', tr: 'İyi geceler' },
  'how are you': { en: 'How are you?', es: '¿Cómo estás?', fr: 'Comment allez-vous ?', ru: 'Как дела?', pt: 'Tudo bem?', de: 'Wie geht es dir?', id: 'Apa kabar?', tr: 'Nasılsınız?' },
  'how are you?': { en: 'How are you?', es: '¿Cómo estás?', fr: 'Comment allez-vous ?', ru: 'Как дела?', pt: 'Tudo bem?', de: 'Wie geht es dir?', id: 'Apa kabar?', tr: 'Nasılsınız?' },
  'i am fine, thank you': { en: 'I am fine, thank you', es: 'Estoy bien, gracias', fr: 'Je vais bien, merci', ru: 'У меня всё хорошо, спасибо', pt: 'Estou bem, obrigado', de: 'Mir geht es gut, danke', id: 'Kabar baik, terima kasih', tr: 'İyiyim, teşekkürler' },
  'very well, thank you': { en: 'Very well, thank you', es: 'Muy bien, gracias', fr: 'Très bien, merci', ru: 'Очень хорошо, спасибо', pt: 'Muito bem, obrigado', de: 'Sehr gut, danke', id: 'Sangat baik, terima kasih', tr: 'Çok iyiyim, teşekkürler' },
  'good / well': { en: 'Good / Well', es: 'Bien', fr: 'Bien', ru: 'Хорошо', pt: 'Bem', de: 'Gut', id: 'Baik', tr: 'İyi' },
  'bad / poorly': { en: 'Bad / Poorly', es: 'Mal', fr: 'Mal', ru: 'Плохо', pt: 'Mal', de: 'Schlecht', id: 'Buruk', tr: 'Kötü' },
  'and you?': { en: 'And you?', es: '¿Y tú?', fr: 'Et vous ?', ru: 'А вы? / А у вас?', pt: 'E você?', de: 'Und dir?', id: 'Dan Anda?', tr: 'Ya siz?' },
  'please': { en: 'Please', es: 'Por favor', fr: 'S\'il vous plaît', ru: 'Пожалуйста', pt: 'Por favor', de: 'Bitte', id: 'Tolong', tr: 'Lütfen' },
  'please / you\'re welcome': { en: 'Please / You\'re welcome', es: 'Por favor / De nada', fr: 'S\'il vous plaît / De rien', ru: 'Пожалуйста', pt: 'Por favor / De nada', de: 'Bitte', id: 'Tolong / Sama-sama', tr: 'Lütfen / Rica ederim' },
  'thank you': { en: 'Thank you', es: 'Gracias', fr: 'Merci', ru: 'Спасибо', pt: 'Obrigado', de: 'Danke', id: 'Terima kasih', tr: 'Teşekkür ederim' },
  'thank you very much': { en: 'Thank you very much', es: 'Muchas gracias', fr: 'Merci beaucoup', ru: 'Большое спасибо', pt: 'Muito obrigado', de: 'Vielen Dank', id: 'Terima kasih banyak', tr: 'Çok teşekkür ederim' },
  'you are welcome': { en: 'You are welcome', es: 'De nada', fr: 'De rien', ru: 'Пожалуйста / Не за что', pt: 'De nada', de: 'Gern geschehen', id: 'Sama-sama', tr: 'Rica ederim' },
  'you\'re welcome': { en: 'You\'re welcome', es: 'De nada', fr: 'De rien', ru: 'Пожалуйста / Не за что', pt: 'De nada', de: 'Gern geschehen', id: 'Sama-sama', tr: 'Rica ederim' },
  'you\'re welcome / not at all': { en: 'You\'re welcome / Not at all', es: 'De nada', fr: 'De rien', ru: 'Не за что', pt: 'De nada', de: 'Gern geschehen', id: 'Sama-sama', tr: 'Rica ederim' },
  'no problem': { en: 'No problem', es: 'No hay problema', fr: 'Pas de problème', ru: 'Без проблем / Ничего страшного', pt: 'Sem problema', de: 'Kein Problem', id: 'Tidak masalah', tr: 'Sorun değil' },
  'excuse me': { en: 'Excuse me', es: 'Disculpe / Con permiso', fr: 'Excusez-moi', ru: 'Извините', pt: 'Com licença', de: 'Entschuldigung', id: 'Permisi', tr: 'Affedersiniz' },
  'excuse me / sorry': { en: 'Excuse me / Sorry', es: 'Disculpe / Perdón', fr: 'Excusez-moi / Pardon', ru: 'Извините', pt: 'Com licença / Desculpe', de: 'Entschuldigung', id: 'Permisi / Maaf', tr: 'Affedersiniz / Özür dilerim' },
  'i am sorry': { en: 'I am sorry', es: 'Lo siento / Perdón', fr: 'Pardon / Désolé', ru: 'Простите / Мне жаль', pt: 'Desculpe', de: 'Es tut mir leid', id: 'Maafkan saya', tr: 'Özür dilerim' },
  'what is your name?': { en: 'What is your name?', es: '¿Cómo te llamas?', fr: 'Comment vous appelez-vous ?', ru: 'Как вас зовут?', pt: 'Qual é o seu nome?', de: 'Wie heißt du?', id: 'Siapa nama Anda?', tr: 'Adınız ne?' },
  'my name is': { en: 'My name is...', es: 'Me llamo...', fr: 'Je m\'appelle...', ru: 'Меня зовут...', pt: 'Meu nome é...', de: 'Ich heiße...', id: 'Nama saya...', tr: 'Benim adım...' },
  'my name is...': { en: 'My name is...', es: 'Me llamo...', fr: 'Je m\'appelle...', ru: 'Меня зовут...', pt: 'Meu nome é...', de: 'Ich heiße...', id: 'Nama saya...', tr: 'Benim adım...' },
  'nice to meet you': { en: 'Nice to meet you', es: 'Mucho gusto / Encantado', fr: 'Enchanté(e)', ru: 'Очень приятно познакомиться', pt: 'Muito prazer', de: 'Freut mich', id: 'Senang bertemu dengan Anda', tr: 'Memnun oldum' },
  'where are you from?': { en: 'Where are you from?', es: '¿De dónde eres?', fr: 'D\'où venez-vous ?', ru: 'Откуда вы?', pt: 'De onde você é?', de: 'Woher kommst du?', id: 'Dari mana asal Anda?', tr: 'Nerelisiniz?' },
  'i am from...': { en: 'I am from...', es: 'Soy de...', fr: 'Je viens de...', ru: 'Я из...', pt: 'Eu sou de...', de: 'Ich komme aus...', id: 'Saya berasal dari...', tr: 'Ben ...-lıyım' },
  'goodbye': { en: 'Goodbye', es: 'Adiós', fr: 'Au revoir', ru: 'До свидания', pt: 'Tchau / Adeus', de: 'Auf Wiedersehen', id: 'Sampai jumpa', tr: 'Hoşça kalın' },
  'bye (informal)': { en: 'Bye (informal)', es: 'Chao / Hasta luego', fr: 'Salut / À plus', ru: 'Пока', pt: 'Tchau', de: 'Tschüss', id: 'Dadah', tr: 'Güle güle' },
  'see you later': { en: 'See you later', es: 'Hasta luego', fr: 'À bientôt', ru: 'Увидимся позже / Пока', pt: 'Até logo', de: 'Bis später', id: 'Sampai nanti', tr: 'Sonra görüşürüz' },
  'have a nice day': { en: 'Have a nice day', es: 'Que tenga un buen día', fr: 'Bonne journée', ru: 'Хорошего дня', pt: 'Tenha um bom dia', de: 'Schönen Tag noch', id: 'Semoga hari Anda menyenangkan', tr: 'İyi günler' },
  'have a great day': { en: 'Have a great day', es: 'Que tenga un buen día', fr: 'Bonne journée', ru: 'Хорошего дня', pt: 'Tenha um ótimo dia', de: 'Einen schönen Tag', id: 'Semoga hari Anda menyenangkan', tr: 'İyi günler' },
  'i understand': { en: 'I understand', es: 'Entiendo / Comprendo', fr: 'Je comprends', ru: 'Я понимаю', pt: 'Eu entendo', de: 'Ich verstehe', id: 'Saya mengerti', tr: 'Anlıyorum' },
  'i do not understand': { en: 'I do not understand', es: 'No entiendo', fr: 'Je ne comprends pas', ru: 'Я не понимаю', pt: 'Eu não entendo', de: 'Ich verstehe nicht', id: 'Saya tidak mengerti', tr: 'Anlamıyorum' },
  'i don\'t understand': { en: 'I don\'t understand', es: 'No entiendo', fr: 'Je ne comprends pas', ru: 'Я не понимаю', pt: 'Eu não entendo', de: 'Ich verstehe nicht', id: 'Saya tidak mengerti', tr: 'Anlamıyorum' },
  'could you repeat that, please?': { en: 'Could you repeat that, please?', es: '¿Puede repetir, por favor?', fr: 'Pouvez-vous répéter ?', ru: 'Повторите, пожалуйста', pt: 'Pode repetir, por favor?', de: 'Können Sie das bitte wiederholen?', id: 'Bisa ulangi, tolong?', tr: 'Lütfen tekrar eder misiniz?' },
  'can you repeat, please?': { en: 'Can you repeat, please?', es: '¿Puede repetir, por favor?', fr: 'Pouvez-vous répéter ?', ru: 'Повторите, пожалуйста', pt: 'Pode repetir, por favor?', de: 'Können Sie das bitte wiederholen?', id: 'Bisa ulangi, tolong?', tr: 'Lütfen tekrar eder misiniz?' },
  'please repeat': { en: 'Please repeat', es: 'Repita, por favor', fr: 'Répétez, s\'il vous plaît', ru: 'Повторите, пожалуйста', pt: 'Repita, por favor', de: 'Bitte wiederholen', id: 'Tolong ulangi', tr: 'Lütfen tekrarlayın' },
  'please speak more slowly': { en: 'Please speak more slowly', es: 'Hable más despacio, por favor', fr: 'Parlez plus lentement, s\'il vous plaît', ru: 'Говорите медленнее, пожалуйста', pt: 'Fale mais devagar, por favor', de: 'Bitte sprechen Sie langsamer', id: 'Tolong bicara lebih pelan', tr: 'Lütfen daha yavaş konuşun' },
  'can you speak more slowly?': { en: 'Can you speak more slowly?', es: '¿Puede hablar más despacio?', fr: 'Pouvez-vous parler plus lentement ?', ru: 'Можете говорить медленнее?', pt: 'Pode falar mais devagar?', de: 'Können Sie langsamer sprechen?', id: 'Bisa bicara lebih pelan?', tr: 'Daha yavaş konuşabilir misiniz?' },
  'speak more slowly': { en: 'Speak more slowly', es: 'Hable más despacio', fr: 'Parlez plus lentement', ru: 'Говорите медленнее', pt: 'Fale mais devagar', de: 'Sprechen Sie langsamer', id: 'Bicara lebih pelan', tr: 'Daha yavaş konuşun' },
  'do you speak english?': { en: 'Do you speak English?', es: '¿Habla inglés?', fr: 'Parlez-vous anglais ?', ru: 'Вы говорите по-английски?', pt: 'Você fala inglês?', de: 'Sprechen Sie Englisch?', id: 'Apakah Anda berbicara bahasa Inggris?', tr: 'İngilizce biliyor musunuz?' },
  'i speak a little russian': { en: 'I speak a little Russian', es: 'Hablo un poco de ruso', fr: 'Je parle un peu russe', ru: 'Я немного говорю по-русски', pt: 'Eu falo um pouco de russo', de: 'Ich spreche ein bisschen Russisch', id: 'Saya berbicara sedikit bahasa Rusia', tr: 'Biraz Rusça konuşuyorum' },
  'what does this mean?': { en: 'What does this mean?', es: '¿Qué significa esto?', fr: 'Qu\'est-ce que cela signifie ?', ru: 'Что это значит?', pt: 'O que significa isto?', de: 'Was bedeutet das?', id: 'Apa artinya ini?', tr: 'Bu ne demek?' },
  'how do you say...?': { en: 'How do you say...?', es: '¿Cómo se dice...?', fr: 'Comment dit-on... ?', ru: 'Как сказать...?', pt: 'Como se diz...?', de: 'Wie sagt man...?', id: 'Bagaimana mengatakan...?', tr: 'Nasıl denir...?' },
  'how do you say this in russian?': { en: 'How do you say this in Russian?', es: '¿Cómo se dice esto en ruso?', fr: 'Comment dit-on cela en russe ?', ru: 'Как это по-русски?', pt: 'Como se diz isto em russo?', de: 'Wie sagt man das auf Russisch?', id: 'Bagaimana mengatakan ini dalam bahasa Rusia?', tr: 'Bu Rusça nasıl söylenir?' },
  'can you help me?': { en: 'Can you help me?', es: '¿Puede ayudarme?', fr: 'Pouvez-vous m\'aider ?', ru: 'Вы можете мне помочь?', pt: 'Pode me ajudar?', de: 'Können Sie mir helfen?', id: 'Bisa bantu saya?', tr: 'Bana yardım edebilir misiniz?' },
  'i need help': { en: 'I need help', es: 'Necesito ayuda', fr: 'J\'ai besoin d\'aide', ru: 'Мне нужна помощь', pt: 'Preciso de ajuda', de: 'Ich brauche Hilfe', id: 'Saya butuh bantuan', tr: 'Yardıma ihtiyacım var' },
  'help me': { en: 'Help me', es: 'Ayúdeme', fr: 'Aidez-moi', ru: 'Помогите мне', pt: 'Ajude-me', de: 'Helfen Sie mir', id: 'Tolong saya', tr: 'Bana yardım edin' },
  'help!': { en: 'Help!', es: '¡Ayuda! / ¡Socorro!', fr: 'À l\'aide ! / Au secours !', ru: 'Помогите!', pt: 'Socorro!', de: 'Hilfe!', id: 'Tolong!', tr: 'İmdat!' },
  'where is the restroom?': { en: 'Where is the restroom?', es: '¿Dónde está el baño?', fr: 'Où sont les toilettes ?', ru: 'Где находится туалет?', pt: 'Onde fica o banheiro?', de: 'Wo ist die Toilette?', id: 'Di mana kamar mandi?', tr: 'Tuvalet nerede?' },
  'where is the bathroom': { en: 'Where is the bathroom?', es: '¿Dónde está el baño?', fr: 'Où sont les toilettes ?', ru: 'Где туалет?', pt: 'Onde fica o banheiro?', de: 'Wo ist die Toilette?', id: 'Di mana kamar mandi?', tr: 'Tuvalet nerede?' },
  'where is the bathroom?': { en: 'Where is the bathroom?', es: '¿Dónde está el baño?', fr: 'Où sont les toilettes ?', ru: 'Где туалет?', pt: 'Onde fica o banheiro?', de: 'Wo ist die Toilette?', id: 'Di mana kamar mandi?', tr: 'Tuvalet nerede?' },
  'where is the train station?': { en: 'Where is the train station?', es: '¿Dónde está la estación de tren?', fr: 'Où est la gare ?', ru: 'Где находится вокзал?', pt: 'Onde fica a estação de trem?', de: 'Wo ist der Bahnhof?', id: 'Di mana stasiun kereta?', tr: 'Tren istasyonu nerede?' },
  'where is the airport?': { en: 'Where is the airport?', es: '¿Dónde está el aeropuerto?', fr: 'Où est l\'aéroport ?', ru: 'Где находится аэропорт?', pt: 'Onde fica o aeroporto?', de: 'Wo ist der Flughafen?', id: 'Di mana bandara?', tr: 'Havalimanı nerede?' },
  'i would like to go to the airport': { en: 'I would like to go to the airport', es: 'Quisiera ir al aeropuerto', fr: 'Je voudrais aller à l\'aéroport', ru: 'Я хочу поехать в аэропорт', pt: 'Gostaria de ir ao aeroporto', de: 'Ich möchte zum Flughafen fahren', id: 'Saya mau ke bandara', tr: 'Havalimanına gitmek istiyorum' },
  'what time is the departure?': { en: 'What time is the departure?', es: '¿A qué hora es la salida?', fr: 'À quelle heure est le départ ?', ru: 'Во сколько отправление?', pt: 'A que horas é a partida?', de: 'Wann ist der Abflug?', id: 'Jam berapa keberangkatannya?', tr: 'Kalkış saat kaçta?' },
  'where is the hotel?': { en: 'Where is the hotel?', es: '¿Dónde está el hotel?', fr: 'Où est l\'hôtel ?', ru: 'Где находится отель?', pt: 'Onde fica o hotel?', de: 'Wo ist das Hotel?', id: 'Di mana hotelnya?', tr: 'Otel nerede?' },
  'how much is a ticket?': { en: 'How much is a ticket?', es: '¿Cuánto cuesta un boleto?', fr: 'Combien coûte un billet ?', ru: 'Сколько стоит билет?', pt: 'Quanto custa uma passagem?', de: 'Was kostet ein Ticket?', id: 'Berapa harga tiketnya?', tr: 'Bilet ne kadar?' },
  'i need a taxi': { en: 'I need a taxi', es: 'Necesito un taxi', fr: 'J\'ai besoin d\'un taxi', ru: 'Мне нужно такси', pt: 'Preciso de um táxi', de: 'Ich brauche ein Taxi', id: 'Saya butuh taksi', tr: 'Taksiye ihtiyacım var' },
  'turn left': { en: 'Turn left', es: 'Gire a la izquierda', fr: 'Tournez à gauche', ru: 'Поверните налево', pt: 'Vire à esquerda', de: 'Links abbiegen', id: 'Belok kiri', tr: 'Sola dönün' },
  'turn right': { en: 'Turn right', es: 'Gire a la derecha', fr: 'Tournez à droite', ru: 'Поверните направо', pt: 'Vire à direita', de: 'Rechts abbiegen', id: 'Belok kanan', tr: 'Sağa dönün' },
  'go straight ahead': { en: 'Go straight ahead', es: 'Siga todo recto', fr: 'Allez tout droit', ru: 'Идите прямо', pt: 'Siga em frente', de: 'Geradeaus gehen', id: 'Jalan lurus terus', tr: 'Düz gidin' },
  'a table for two, please': { en: 'A table for two, please', es: 'Una mesa para dos, por favor', fr: 'Une table pour deux, s\'il vous plaît', ru: 'Столик на двоих, пожалуйста', pt: 'Uma mesa para dois, por favor', de: 'Einen Tisch für zwei, bitte', id: 'Meja untuk dua orang', tr: 'İki kişilik masa, lütfen' },
  'the menu, please': { en: 'The menu, please', es: 'El menú, por favor', fr: 'La carte, s\'il vous plaît', ru: 'Меню, пожалуйста', pt: 'O cardápio, por favor', de: 'Die Speisekarte, bitte', id: 'Minta daftar menunya', tr: 'Menüyü görebilir miyim?' },
  'can i see the menu, please?': { en: 'Can I see the menu, please?', es: '¿Puedo ver el menú, por favor?', fr: 'Puis-je voir la carte ?', ru: 'Можно меню, пожалуйста?', pt: 'Posso ver o cardápio?', de: 'Kann ich bitte die Speisekarte sehen?', id: 'Minta daftar menunya', tr: 'Menüyü görebilir miyim?' },
  'i would like water': { en: 'I would like water', es: 'Quisiera agua', fr: 'Je voudrais de l\'eau', ru: 'Я бы хотел(а) воды', pt: 'Eu gostaria de água', de: 'Ich hätte gern Wasser', id: 'Saya mau air putih', tr: 'Su istiyorum' },
  'i want to eat': { en: 'I want to eat', es: 'Quiero comer', fr: 'Je veux manger', ru: 'Я хочу есть', pt: 'Quero comer', de: 'Ich möchte essen', id: 'Saya ingin makan', tr: 'Yemek istiyorum' },
  'i want to drink': { en: 'I want to drink', es: 'Quiero beber', fr: 'Je veux boire', ru: 'Я хочу пить', pt: 'Quero beber', de: 'Ich möchte trinken', id: 'Saya ingin minum', tr: 'İçmek istiyorum' },
  'what do you recommend?': { en: 'What do you recommend?', es: '¿Qué recomienda?', fr: 'Que recommandez-vous ?', ru: 'Что вы порекомендуете?', pt: 'O que você recomenda?', de: 'Was empfehlen Sie?', id: 'Apa yang Anda rekomendasikan?', tr: 'Ne tavsiye edersiniz?' },
  'this is delicious!': { en: 'This is delicious!', es: '¡Está delicioso!', fr: 'C\'est délicieux !', ru: 'Это очень вкусно!', pt: 'Isto está delicioso!', de: 'Das ist köstlich!', id: 'Ini enak sekali!', tr: 'Bu çok lezzetli!' },
  'can i have the check, please?': { en: 'Can I have the check, please?', es: 'La cuenta, por favor', fr: 'L\'addition, s\'il vous plaît', ru: 'Счёт, пожалуйста', pt: 'A conta, por favor', de: 'Die Rechnung, bitte', id: 'Minta bonnya, tolong', tr: 'Hesap, lütfen' },
  'the bill / check, please': { en: 'The check, please', es: 'La cuenta, por favor', fr: 'L\'addition, s\'il vous plaît', ru: 'Счёт, пожалуйста', pt: 'A conta, por favor', de: 'Die Rechnung, bitte', id: 'Minta bonnya, tolong', tr: 'Hesap, lütfen' },
  'the check, please': { en: 'The check, please', es: 'La cuenta, por favor', fr: 'L\'addition, s\'il vous plaît', ru: 'Счёт, пожалуйста', pt: 'A conta, por favor', de: 'Die Rechnung, bitte', id: 'Minta bonnya, tolong', tr: 'Hesap, lütfen' },
  'how much does this cost?': { en: 'How much does this cost?', es: '¿Cuánto cuesta esto?', fr: 'Combien ça coûte ?', ru: 'Сколько это стоит?', pt: 'Quanto custa isto?', de: 'Was kostet das?', id: 'Berapa harganya?', tr: 'Bu ne kadar?' },
  'how much does it cost': { en: 'How much does it cost?', es: '¿Cuánto cuesta?', fr: 'Combien ça coûte ?', ru: 'Сколько стоит?', pt: 'Quanto custa?', de: 'Was kostet das?', id: 'Berapa harganya?', tr: 'Bu ne kadar?' },
  'do you accept credit cards?': { en: 'Do you accept credit cards?', es: '¿Aceptan tarjetas de crédito?', fr: 'Acceptez-vous les cartes bancaires ?', ru: 'Вы принимаете банковские карты?', pt: 'Vocês aceitam cartão de crédito?', de: 'Nehmen Sie Kreditkarten?', id: 'Apakah menerima kartu kredit?', tr: 'Kredi kartı geçiyor mu?' },
  'can i pay by card?': { en: 'Can I pay by card?', es: '¿Puedo pagar con tarjeta?', fr: 'Puis-je payer par carte ?', ru: 'Можно оплатить картой?', pt: 'Posso pagar com cartão?', de: 'Kann ich mit Karte zahlen?', id: 'Bisa bayar pakai kartu?', tr: 'Kartla ödeyebilir miyim?' },
  'i am just looking': { en: 'I am just looking', es: 'Solo estoy mirando', fr: 'Je regarde seulement', ru: 'Я просто смотрю', pt: 'Só estou olhando', de: 'Ich schaue nur', id: 'Saya hanya melihat-lihat', tr: 'Sadece bakıyorum' },
  'i am just looking, thank you': { en: 'I am just looking, thank you', es: 'Solo estoy mirando, gracias', fr: 'Je regarde seulement, merci', ru: 'Я просто смотрю, спасибо', pt: 'Só estou olhando, obrigado', de: 'Ich schaue nur, danke', id: 'Saya hanya melihat-lihat', tr: 'Sadece bakıyorum, teşekkürler' },
  'do you have this in another size?': { en: 'Do you have this in another size?', es: '¿Tiene esto en otra talla?', fr: 'Avez-vous ceci dans une autre taille ?', ru: 'У вас есть другой размер?', pt: 'Tem isto em outro tamanho?', de: 'Haben Sie das in einer anderen Größe?', id: 'Apakah ada ukuran lain?', tr: 'Bunun başka bedeni var mı?' },
  'it is too expensive': { en: 'It is too expensive', es: 'Es demasiado caro', fr: 'C\'est trop cher', ru: 'Это слишком дорого', pt: 'É muito caro', de: 'Das ist zu teuer', id: 'Ini terlalu mahal', tr: 'Bu çok pahalı' },
  'i need a doctor': { en: 'I need a doctor', es: 'Necesito un médico', fr: 'J\'ai besoin d\'un médecin', ru: 'Мне нужен врач', pt: 'Preciso de um médico', de: 'Ich brauche einen Arzt', id: 'Saya butuh dokter', tr: 'Doktora ihtiyacım var' },
  'i don\'t feel well': { en: 'I don\'t feel well', es: 'No me siento bien', fr: 'Je ne me sens pas bien', ru: 'Я плохо себя чувствую', pt: 'Não estou me sentindo bem', de: 'Ich fühle mich nicht wohl', id: 'Saya merasa kurang sehat', tr: 'Kendimi iyi hissetmiyorum' },
  'call the police': { en: 'Call the police', es: 'Llame a la policía', fr: 'Appelez la police', ru: 'Вызовите полицию', pt: 'Chame a polícia', de: 'Rufen Sie die Polizei', id: 'Panggil polisi', tr: 'Polisi arayın' },
  'i lost my passport': { en: 'I lost my passport', es: 'Perdí mi pasaporte', fr: 'J\'ai perdu mon passeport', ru: 'Я потерял(а) свой паспорт', pt: 'Perdi meu passaporte', de: 'Ich habe meinen Reisepass verloren', id: 'Saya kehilangan paspor saya', tr: 'Pasaportumu kaybettim' },

  // Time expressions
  'what time is it?': { en: 'What time is it?', es: '¿Qué hora es?', fr: 'Quelle heure est-il ?', ru: 'Который час?', pt: 'Que horas são?', de: 'Wie spät ist es?', id: 'Jam berapa sekarang?', tr: 'Saat kaç?' },
  'what time is it now?': { en: 'What time is it now?', es: '¿Qué hora es ahora?', fr: 'Quelle heure est-il maintenant ?', ru: 'Сколько сейчас времени?', pt: 'Que horas são agora?', de: 'Wie viel Uhr ist es jetzt?', id: 'Jam berapa sekarang?', tr: 'Şu an saat kaç?' },
  'at what time?': { en: 'At what time?', es: '¿A qué hora?', fr: 'À quelle heure ?', ru: 'Во сколько?', pt: 'A que horas?', de: 'Um wie viel Uhr?', id: 'Jam berapa?', tr: 'Saat kaçta?' },
  'now': { en: 'Now', es: 'Ahora', fr: 'Maintenant', ru: 'Сейчас', pt: 'Agora', de: 'Jetzt', id: 'Sekarang', tr: 'Şimdi' },
  'hour': { en: 'Hour', es: 'Hora', fr: 'Heure', ru: 'Час', pt: 'Hora', de: 'Stunde', id: 'Jam', tr: 'Saat' },
  'minute': { en: 'Minute', es: 'Minuto', fr: 'Minute', ru: 'Минута', pt: 'Minuto', de: 'Minute', id: 'Menit', tr: 'Dakika' },
  'second': { en: 'Second', es: 'Segundo', fr: 'Seconde', ru: 'Секунда', pt: 'Segundo', de: 'Sekunde', id: 'Detik', tr: 'Saniye' },
  'one o\'clock': { en: 'One o\'clock (1:00)', es: 'Es la una (1:00)', fr: 'Il est une heure (1:00)', ru: 'Один час (1:00)', pt: 'É uma hora (1:00)', de: 'Es ist ein Uhr (1:00)', id: 'Jam satu (1:00)', tr: 'Saat bir (1:00)' },
  'it is one o\'clock on the dot': { en: 'It is 1:00 sharp', es: 'Es la una en punto', fr: 'Il est une heure pile', ru: 'Ровно один час (1:00)', pt: 'É uma hora em ponto', de: 'Es ist Punkt ein Uhr', id: 'Sekarang jam satu tepat', tr: 'Saat tam bir' },
  'two o\'clock': { en: 'Two o\'clock (2:00)', es: 'Son las dos (2:00)', fr: 'Il est deux heures (2:00)', ru: 'Два часа (2:00)', pt: 'São duas horas (2:00)', de: 'Es ist zwei Uhr (2:00)', id: 'Jam dua (2:00)', tr: 'Saat iki (2:00)' },
  'it is two o\'clock': { en: 'It is 2:00', es: 'Son las dos', fr: 'Il est deux heures', ru: 'Два часа (2:00)', pt: 'São duas horas', de: 'Es ist zwei Uhr', id: 'Sekarang jam dua', tr: 'Saat iki' },
  'three o\'clock': { en: 'Three o\'clock (3:00)', es: 'Son las tres (3:00)', fr: 'Il est trois heures (3:00)', ru: 'Три часа (3:00)', pt: 'São três horas (3:00)', de: 'Es ist drei Uhr (3:00)', id: 'Jam tiga (3:00)', tr: 'Saat üç (3:00)' },
  'exactly three o\'clock': { en: 'Exactly three o\'clock (3:00)', es: 'Las tres en punto', fr: 'Trois heures pile', ru: 'Ровно три часа (3:00)', pt: 'Três horas em ponto', de: 'Punkt drei Uhr', id: 'Jam tiga tepat', tr: 'Saat tam üç' },
  'four o\'clock': { en: 'Four o\'clock (4:00)', es: 'Son las cuatro (4:00)', fr: 'Il est quatre heures (4:00)', ru: 'Четыре часа (4:00)', pt: 'São quatro horas (4:00)', de: 'Es ist vier Uhr (4:00)', id: 'Jam empat (4:00)', tr: 'Saat dört (4:00)' },
  'five o\'clock': { en: 'Five o\'clock (5:00)', es: 'Son las cinco (5:00)', fr: 'Il est cinq heures (5:00)', ru: 'Пять часов (5:00)', pt: 'São cinco horas (5:00)', de: 'Es ist fünf Uhr (5:00)', id: 'Jam lima (5:00)', tr: 'Saat beş (5:00)' },
  'six o\'clock': { en: 'Six o\'clock (6:00)', es: 'Son las seis (6:00)', fr: 'Il est six heures (6:00)', ru: 'Шесть часов (6:00)', pt: 'São seis horas (6:00)', de: 'Es ist sechs Uhr (6:00)', id: 'Jam enam (6:00)', tr: 'Saat altı (6:00)' },
  'seven o\'clock': { en: 'Seven o\'clock (7:00)', es: 'Son las siete (7:00)', fr: 'Il est sept heures (7:00)', ru: 'Семь часов (7:00)', pt: 'São sete horas (7:00)', de: 'Es ist sieben Uhr (7:00)', id: 'Jam tujuh (7:00)', tr: 'Saat yedi (7:00)' },
  'eight o\'clock': { en: 'Eight o\'clock (8:00)', es: 'Son las ocho (8:00)', fr: 'Il est huit heures (8:00)', ru: 'Восемь часов (8:00)', pt: 'São oito horas (8:00)', de: 'Es ist acht Uhr (8:00)', id: 'Jam delapan (8:00)', tr: 'Saat sekiz (8:00)' },
  'nine o\'clock': { en: 'Nine o\'clock (9:00)', es: 'Son las nueve (9:00)', fr: 'Il est neuf heures (9:00)', ru: 'Девять часов (9:00)', pt: 'São nove horas (9:00)', de: 'Es ist neun Uhr (9:00)', id: 'Jam sembilan (9:00)', tr: 'Saat dokuz (9:00)' },
  'ten o\'clock': { en: 'Ten o\'clock (10:00)', es: 'Son las diez (10:00)', fr: 'Il est dix heures (10:00)', ru: 'Десять часов (10:00)', pt: 'São dez horas (10:00)', de: 'Es ist zehn Uhr (10:00)', id: 'Jam sepuluh (10:00)', tr: 'Saat on (10:00)' },
  'eleven o\'clock': { en: 'Eleven o\'clock (11:00)', es: 'Son las once (11:00)', fr: 'Il est onze heures (11:00)', ru: 'Одиннадцать часов (11:00)', pt: 'São onze horas (11:00)', de: 'Es ist elf Uhr (11:00)', id: 'Jam sebelas (11:00)', tr: 'Saat on bir (11:00)' },
  'twelve o\'clock': { en: 'Twelve o\'clock (12:00)', es: 'Son las doce (12:00)', fr: 'Il est douze heures (12:00)', ru: 'Двенадцать часов (12:00)', pt: 'São doze horas (12:00)', de: 'Es ist zwölf Uhr (12:00)', id: 'Jam dua belas (12:00)', tr: 'Saat on iki (12:00)' },
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
  'hi / bye': { en: 'Hi / Bye', es: 'Hola', fr: 'Salut', ru: 'Привет', pt: 'Olá', de: 'Hallo', id: 'Halo', tr: 'Merhaba' },
  'es ist elf uhr': { en: 'Eleven o\'clock (11:00)', es: 'Son las once', fr: 'Il est onze heures', ru: 'Одиннадцать часов (11:00)', pt: 'São onze horas', de: 'Es ist elf Uhr', id: 'Jam sebelas', tr: 'Saat on bir' },
  'son las cuatro y cuarto': { en: '4:15 (quarter past four)', es: 'Son las cuatro y cuarto', fr: 'Il est quatre heures et quart', ru: 'Четверть пятого (4:15)', pt: 'São quatro e quinze', de: 'Es ist Viertel nach vier', id: 'Sekarang jam empat lewat seperempat', tr: 'Saat dördü çeyrek geçiyor' },
  'son las cinco menos cuarto': { en: '4:45 (quarter to five)', es: 'Son las cinco menos cuarto', fr: 'Il est cinq heures moins le quart', ru: 'Без четверти пять (4:45)', pt: 'São quinze para as cinco', de: 'Es ist Viertel vor fünf', id: 'Sekarang jam lima kurang seperempat', tr: 'Saat beşe çeyrek var' },
  'il est quatre heures et quart': { en: '4:15 (quarter past four)', es: 'Son las cuatro y cuarto', fr: 'Il est quatre heures et quart', ru: 'Четверть пятого (4:15)', pt: 'São quatro e quinze', de: 'Es ist Viertel nach vier', id: 'Sekarang jam empat lewat seperempat', tr: 'Saat dördü çeyrek geçiyor' },
  'il est cinq heures moins le quart': { en: '4:45 (quarter to five)', es: 'Son las cinco menos cuarto', fr: 'Il est cinq heures moins le quart', ru: 'Без четверти пять (4:45)', pt: 'São quinze para as cinco', de: 'Es ist Viertel vor fünf', id: 'Sekarang jam lima kurang seperempat', tr: 'Saat beşe çeyrek var' },
  'half past twelve (12:30)': { en: 'Half past twelve (12:30)', es: 'Las doce y media (12:30)', fr: 'Midi et demi (12:30)', ru: 'Половина первого (12:30)', pt: 'Meio-dia e meia (12:30)', de: 'Halb eins (12:30)', id: 'Setengah satu siang (12:30)', tr: 'Saat on iki buçuk (12:30)' },
  'ten to two (1:50)': { en: 'Ten to two (1:50)', es: 'Las dos menos diez (1:50)', fr: 'Deux heures moins dix (1:50)', ru: 'Без десяти два (1:50)', pt: 'Dez para as duas (1:50)', de: 'Zehn vor zwei (1:50)', id: 'Jam dua kurang sepuluh (1:50)', tr: 'Saat ikiye on var (1:50)' },
  'half an hour': { en: 'Half an hour', es: 'Media hora', fr: 'Une demi-heure', ru: 'Полчаса', pt: 'Meia hora', de: 'Eine halbe Stunde', id: 'Setengah jam', tr: 'Yarım saat' },
  'quarter of an hour': { en: 'Quarter of an hour', es: 'Un cuarto de hora', fr: 'Un quart d\'heure', ru: 'Четверть часа', pt: 'Um quarto de hora', de: 'Eine Viertelstunde', id: 'Seperempat jam', tr: 'Çeyrek saat' },
  'in the morning (a.m.)': { en: 'In the morning (a.m.)', es: 'De la mañana (a.m.)', fr: 'Du matin', ru: 'Утра (утром)', pt: 'Da manhã', de: 'Morgens', id: 'Di pagi hari', tr: 'Sabahleyin' },
  'in the afternoon (p.m.)': { en: 'In the afternoon (p.m.)', es: 'De la tarde (p.m.)', fr: 'De l\'après-midi', ru: 'Дня (днём)', pt: 'Da tarde', de: 'Nachmittags', id: 'Di siang hari', tr: 'Öğleden sonra' },
  'in the evening (p.m.)': { en: 'In the evening (p.m.)', es: 'De la noche / tarde (p.m.)', fr: 'Du soir', ru: 'Вечера (вечером)', pt: 'Da noite', de: 'Abends', id: 'Di sore hari', tr: 'Akşamleyin' },
  'at night': { en: 'At night', es: 'Por la noche', fr: 'La nuit', ru: 'Ночи (ночью)', pt: 'À noite', de: 'Nachts', id: 'Di malam hari', tr: 'Geceleyin' },
  'noon / midday': { en: 'Noon / Midday', es: 'Mediodía', fr: 'Midi', ru: 'Полдень', pt: 'Meio-dia', de: 'Mittag', id: 'Tengah hari', tr: 'Öğle' },
  'midnight': { en: 'Midnight', es: 'Medianoche', fr: 'Minuit', ru: 'Полночь', pt: 'Meia-noite', de: 'Mitternacht', id: 'Tengah malam', tr: 'Gece yarısı' },
  'on time': { en: 'On time', es: 'A tiempo / Puntual', fr: 'À l\'heure', ru: 'Вовремя', pt: 'No horário', de: 'Pünktlich', id: 'Tepat waktu', tr: 'Zamanında' },
  'early': { en: 'Early', es: 'Temprano', fr: 'Tôt', ru: 'Рано', pt: 'Cedo', de: 'Früh', id: 'Lebih awal', tr: 'Erken' },
  'late': { en: 'Late', es: 'Tarde', fr: 'En retard / Tard', ru: 'Поздно', pt: 'Tarde / Atrasado', de: 'Spät', id: 'Terlambat', tr: 'Geç' },

  // Spanish & French curriculum translation variants
  'hello! / hi!': { en: 'Hello! / Hi!', es: '¡Hola!', fr: 'Bonjour / Salut', ru: 'Привет! / Здравствуйте!', pt: 'Olá! / Oi!', de: 'Hallo!', id: 'Halo!', tr: 'Merhaba!' },
  'hello / good morning': { en: 'Hello / Good morning', es: 'Hola / Buenos días', fr: 'Bonjour', ru: 'Здравствуйте / Доброе утро', pt: 'Olá / Bom dia', de: 'Hallo / Guten Morgen', id: 'Halo / Selamat pagi', tr: 'Merhaba / Günaydın' },
  'good evening / good night': { en: 'Good evening / Good night', es: 'Buenas noches', fr: 'Bonsoir / Bonne nuit', ru: 'Добрый вечер / Спокойной ночи', pt: 'Boa noite', de: 'Guten Abend / Gute Nacht', id: 'Selamat malam', tr: 'İyi akşamlar' },
  'hi / bye (informal)': { en: 'Hi / Bye', es: 'Hola / Chao', fr: 'Salut', ru: 'Привет / Пока', pt: 'Oi / Tchau', de: 'Hallo / Tschüss', id: 'Hai / Dadah', tr: 'Selam / Hoşça kal' },
  'how are you? (informal)': { en: 'How are you?', es: '¿Cómo estás?', fr: 'Comment vas-tu ? / Ça va ?', ru: 'Как дела?', pt: 'Tudo bem?', de: 'Wie geht es dir?', id: 'Apa kabar?', tr: 'Nasılsın?' },
  'how are you? (formal)': { en: 'How are you? (formal)', es: '¿Cómo está usted?', fr: 'Comment allez-vous ?', ru: 'Как ваши дела?', pt: 'Como vai você?', de: 'Wie geht es Ihnen?', id: 'Apa kabar Anda?', tr: 'Nasılsınız?' },
  'how are you? / doing okay? (informal)': { en: 'How are you?', es: '¿Cómo estás? / ¿Qué tal?', fr: 'Ça va ?', ru: 'Как дела?', pt: 'Tudo bem?', de: 'Wie geht es dir?', id: 'Apa kabar?', tr: 'Nasılsın?' },
  'i am doing well, thank you': { en: 'I am doing well, thank you', es: 'Estoy bien, gracias', fr: 'Ça va bien, merci', ru: 'Всё хорошо, спасибо', pt: 'Estou bem, obrigado', de: 'Mir geht es gut, danke', id: 'Kabar baik, terima kasih', tr: 'İyiyim, teşekkürler' },
  'and you? (formal)': { en: 'And you?', es: '¿Y usted?', fr: 'Et vous ?', ru: 'А вы?', pt: 'E você?', de: 'Und Ihnen?', id: 'Dan Anda?', tr: 'Ya siz?' },
  'please (formal)': { en: 'Please', es: 'Por favor', fr: 'S\'il vous plaît', ru: 'Пожалуйста', pt: 'Por favor', de: 'Bitte', id: 'Tolong', tr: 'Lütfen' },
  'what is your name? (formal)': { en: 'What is your name?', es: '¿Cómo se llama usted?', fr: 'Comment vous appelez-vous ?', ru: 'Как вас зовут?', pt: 'Qual é o seu nome?', de: 'Wie heißen Sie?', id: 'Siapa nama Anda?', tr: 'Adınız nedir?' },
  'pleased to meet you': { en: 'Pleased to meet you', es: 'Mucho gusto / Encantado', fr: 'Enchanté(e)', ru: 'Очень приятно', pt: 'Muito prazer', de: 'Freut mich', id: 'Senang bertemu dengan Anda', tr: 'Memnun oldum' },
  'where are the restrooms?': { en: 'Where are the restrooms?', es: '¿Dónde está el baño?', fr: 'Où sont les toilettes ?', ru: 'Где находится туалет?', pt: 'Onde fica o banheiro?', de: 'Wo ist die Toilette?', id: 'Di mana kamar mandi?', tr: 'Tuvalet nerede?' },
  'can you repeat?': { en: 'Can you repeat?', es: '¿Puede repetir?', fr: 'Pouvez-vous répéter ?', ru: 'Повторите, пожалуйста', pt: 'Pode repetir?', de: 'Können Sie wiederholen?', id: 'Bisa diulangi?', tr: 'Tekrar edebilir misiniz?' },
  'see you soon': { en: 'See you soon', es: 'Hasta pronto / Hasta luego', fr: 'À bientôt', ru: 'До скорого', pt: 'Até breve', de: 'Bis bald', id: 'Sampai jumpa lagi', tr: 'Yakında görüşürüz' },
  'time / weather': { en: 'Time / Weather', es: 'Tiempo', fr: 'Temps', ru: 'Время / Погода', pt: 'Tempo', de: 'Zeit / Wetter', id: 'Waktu / Cuaca', tr: 'Zaman / Hava' },
  'tomorrow / morning': { en: 'Tomorrow / Morning', es: 'Mañana', fr: 'Demain / Matin', ru: 'Завтра / Утро', pt: 'Amanhã / Manhã', de: 'Morgen', id: 'Besok / Pagi', tr: 'Yarın / Sabah' },
  'office / desk': { en: 'Office / Desk', es: 'Oficina / Escritorio', fr: 'Bureau', ru: 'Офис / Стол', pt: 'Escritório', de: 'Büro', id: 'Kantor / Meja', tr: 'Ofis / Masa' },
  'money / silver': { en: 'Money', es: 'Dinero', fr: 'Argent', ru: 'Деньги', pt: 'Dinheiro', de: 'Geld', id: 'Uang', tr: 'Para' },
  'train station': { en: 'Train station', es: 'Estación de tren', fr: 'Gare', ru: 'Вокзал / Станция', pt: 'Estação de trem', de: 'Bahnhof', id: 'Stasiun kereta', tr: 'Tren istasyonu' },
  'boy / child': { en: 'Boy / Child', es: 'Niño', fr: 'Garçon / Enfant', ru: 'Мальчик / Ребёнок', pt: 'Menino / Criança', de: 'Junge / Kind', id: 'Anak laki-laki / Anak', tr: 'Erkek çocuk / Çocuk' },
  'one hundred': { en: 'One hundred', es: 'Cien', fr: 'Cent', ru: 'Сто', pt: 'Cem', de: 'Hundert', id: 'Seratus', tr: 'Yüz' },
  'one thousand': { en: 'One thousand', es: 'Mil', fr: 'Mille', ru: 'Тысяча', pt: 'Mil', de: 'Tausend', id: 'Seribu', tr: 'Bin' },
  'is it far from here?': { en: 'Is it far from here?', es: '¿Está lejos de aquí?', fr: 'Est-ce loin d\'ici ?', ru: 'Это далеко отсюда?', pt: 'É longe daqui?', de: 'Ist es weit von hier?', id: 'Apakah jauh dari sini?', tr: 'Buradan uzak mı?' },
  'could you speak slower, please?': { en: 'Could you speak slower, please?', es: 'Hable más despacio, por favor', fr: 'Parlez plus lentement, s\'il vous plaît', ru: 'Говорите медленнее, пожалуйста', pt: 'Fale mais devagar, por favor', de: 'Bitte sprechen Sie langsamer', id: 'Bisa bicara lebih pelan?', tr: 'Daha yavaş konuşabilir misiniz?' },

  // Colors & Descriptions Pack
  'red': { en: 'Red', es: 'Rojo', fr: 'Rouge', ru: 'Красный', pt: 'Vermelho', de: 'Rot', id: 'Merah', tr: 'Kırmızı' },
  'blue': { en: 'Blue', es: 'Azul', fr: 'Bleu', ru: 'Синий', pt: 'Azul', de: 'Blau', id: 'Biru', tr: 'Mavi' },
  'green': { en: 'Green', es: 'Verde', fr: 'Vert', ru: 'Зелёный', pt: 'Verde', de: 'Grün', id: 'Hijau', tr: 'Yeşil' },
  'black': { en: 'Black', es: 'Negro', fr: 'Noir', ru: 'Чёрный', pt: 'Preto', de: 'Schwarz', id: 'Hitam', tr: 'Siyah' },
  'white': { en: 'White', es: 'Blanco', fr: 'Blanc', ru: 'Белый', pt: 'Branco', de: 'Weiß', id: 'Putih', tr: 'Beyaz' },
  'purple': { en: 'Purple', es: 'Morado', fr: 'Violet', ru: 'Фиолетовый', pt: 'Roxo', de: 'Lila', id: 'Ungu', tr: 'Mor' },
  'pink': { en: 'Pink', es: 'Rosa', fr: 'Rose', ru: 'Розовый', pt: 'Rosa', de: 'Rosa', id: 'Merah muda', tr: 'Pembe' },
  'gray': { en: 'Gray', es: 'Gris', fr: 'Gris', ru: 'Серый', pt: 'Cinza', de: 'Grau', id: 'Abu-abu', tr: 'Gri' },

  // Weather & Seasons Pack
  'wind': { en: 'Wind', es: 'Viento', fr: 'Vent', ru: 'Ветер', pt: 'Vento', de: 'Wind', id: 'Angin', tr: 'Rüzgar' },
  'cloud': { en: 'Cloud', es: 'Nube', fr: 'Nuage', ru: 'Облако', pt: 'Nuvem', de: 'Wolke', id: 'Awan', tr: 'Bulut' },
  'storm': { en: 'Storm', es: 'Tormenta', fr: 'Orage', ru: 'Гроза', pt: 'Tempestade', de: 'Sturm', id: 'Badai', tr: 'Fırtına' },

  // Tech & Remote Work Pack
  'internet': { en: 'Internet', es: 'Internet', fr: 'Internet', ru: 'Интернет', pt: 'Internet', de: 'Internet', id: 'Internet', tr: 'İnternet' },
  'password': { en: 'Password', es: 'Contraseña', fr: 'Mot de passe', ru: 'Пароль', pt: 'Senha', de: 'Passwort', id: 'Kata sandi', tr: 'Şifre' },
  'email': { en: 'Email', es: 'Correo electrónico', fr: 'Courriel', ru: 'Электронная почта', pt: 'E-mail', de: 'E-Mail', id: 'Email', tr: 'E-posta' },
  'screen': { en: 'Screen', es: 'Pantalla', fr: 'Écran', ru: 'Экран', pt: 'Tela', de: 'Bildschirm', id: 'Layar', tr: 'Ekran' },
  'meeting': { en: 'Meeting', es: 'Reunión', fr: 'Réunion', ru: 'Встреча', pt: 'Reunião', de: 'Besprechung', id: 'Rapat', tr: 'Toplantı' },
  'file': { en: 'File', es: 'Archivo', fr: 'Fichier', ru: 'Файл', pt: 'Arquivo', de: 'Datei', id: 'Berkas', tr: 'Dosya' },
  'link': { en: 'Link', es: 'Enlace', fr: 'Lien', ru: 'Ссылка', pt: 'Link', de: 'Link', id: 'Tautan', tr: 'Bağlantı' },
  'code': { en: 'Code', es: 'Código', fr: 'Code', ru: 'Код', pt: 'Código', de: 'Code', id: 'Kode', tr: 'Kod' },
  'error': { en: 'Error', es: 'Error', fr: 'Erreur', ru: 'Ошибка', pt: 'Erro', de: 'Fehler', id: 'Kesalahan', tr: 'Hata' },
  'battery': { en: 'Battery', es: 'Batería', fr: 'Batterie', ru: 'Батарея', pt: 'Bateria', de: 'Batterie', id: 'Baterai', tr: 'Pil' },
  'can you hear me?': { en: 'Can you hear me?', es: '¿Me escucha?', fr: 'Vous m\'entendez ?', ru: 'Вы меня слышите?', pt: 'Você me ouve?', de: 'Können Sie mich hören?', id: 'Apakah Anda mendengar saya?', tr: 'Beni duyabiliyor musunuz?' },
  'can you see my screen?': { en: 'Can you see my screen?', es: '¿Puede ver mi pantalla?', fr: 'Voyez-vous mon écran ?', ru: 'Видно мой экран?', pt: 'Você vê minha tela?', de: 'Können Sie meinen Bildschirm sehen?', id: 'Apakah Anda melihat layar saya?', tr: 'Ekranımı görebiliyor musunuz?' },
  'let me share my screen': { en: 'Let me share my screen', es: 'Voy a compartir mi pantalla', fr: 'Je vais partager mon écran', ru: 'Я покажу свой экран', pt: 'Vou compartilhar minha tela', de: 'Ich teile meinen Bildschirm', id: 'Saya bagikan layar saya', tr: 'Ekranımı paylaşayım' },
  'what is the wi-fi password?': { en: 'What is the Wi-Fi password?', es: '¿Cuál es la contraseña del wifi?', fr: 'Quel est le mot de passe du Wi-Fi ?', ru: 'Какой пароль от вайфая?', pt: 'Qual é a senha do Wi-Fi?', de: 'Wie lautet das WLAN-Passwort?', id: 'Apa kata sandi Wi-Fi?', tr: 'Wi-Fi şifresi nedir?' },
  'the internet connection is slow': { en: 'The internet connection is slow', es: 'La conexión a internet es lenta', fr: 'La connexion internet est lente', ru: 'Медленное подключение к интернету', pt: 'A conexão com a internet está lenta', de: 'Die Internetverbindung ist langsam', id: 'Koneksi internetnya lambat', tr: 'İnternet bağlantısı yavaş' },
  'can you send it by email?': { en: 'Can you send it by email?', es: '¿Puede enviarlo por correo?', fr: 'Pouvez-vous l\'envoyer par courriel ?', ru: 'Можете отправить по почте?', pt: 'Pode enviar por e-mail?', de: 'Können Sie es per E-Mail schicken?', id: 'Bisakah Anda kirim lewat email?', tr: 'E-posta ile gönderebilir misiniz?' },
  'my battery is almost dead': { en: 'My battery is almost dead', es: 'Mi batería está casi agotada', fr: 'Ma batterie est presque vide', ru: 'У меня почти села батарея', pt: 'Minha bateria está quase acabando', de: 'Mein Akku ist fast leer', id: 'Baterai saya hampir habis', tr: 'Şarjım bitmek üzere' },

  // Business & Office Pack
  'project': { en: 'Project', es: 'Proyecto', fr: 'Projet', ru: 'Проект', pt: 'Projeto', de: 'Projekt', id: 'Proyek', tr: 'Proje' },
  'client': { en: 'Client', es: 'Cliente', fr: 'Client', ru: 'Клиент', pt: 'Cliente', de: 'Kunde', id: 'Klien', tr: 'Müşteri' },
  'team': { en: 'Team', es: 'Equipo', fr: 'Équipe', ru: 'Команда', pt: 'Equipe', de: 'Team', id: 'Tim', tr: 'Ekip' },
  'manager': { en: 'Manager', es: 'Gerente', fr: 'Directeur', ru: 'Руководитель', pt: 'Gerente', de: 'Manager', id: 'Manajer', tr: 'Yönetici' },
  'company': { en: 'Company', es: 'Empresa', fr: 'Entreprise', ru: 'Компания', pt: 'Empresa', de: 'Firma', id: 'Perusahaan', tr: 'Şirket' },
  'contract': { en: 'Contract', es: 'Contrato', fr: 'Contrat', ru: 'Контракт', pt: 'Contrato', de: 'Vertrag', id: 'Kontrak', tr: 'Sözleşme' },
  'schedule': { en: 'Schedule', es: 'Horario', fr: 'Horaire', ru: 'Расписание', pt: 'Horário', de: 'Zeitplan', id: 'Jadwal', tr: 'Takvim' },
  'deadline': { en: 'Deadline', es: 'Fecha límite', fr: 'Date limite', ru: 'Срок', pt: 'Prazo', de: 'Frist', id: 'Tenggat waktu', tr: 'Son tarih' },
  'invoice': { en: 'Invoice', es: 'Factura', fr: 'Facture', ru: 'Счёт', pt: 'Fatura', de: 'Rechnung', id: 'Faktur', tr: 'Fatura' },
  'salary': { en: 'Salary', es: 'Salario', fr: 'Salaire', ru: 'Зарплата', pt: 'Salário', de: 'Gehalt', id: 'Gaji', tr: 'Maaş' },
  'let\'s schedule a meeting': { en: 'Let\'s schedule a meeting', es: 'Programemos una reunión', fr: 'Planifions une réunion', ru: 'Давайте назначим встречу', pt: 'Vamos agendar uma reunião', de: 'Planen wir ein Meeting', id: 'Mari jadwalkan rapat', tr: 'Bir toplantı planlayalım' },
  'i will send you an email': { en: 'I will send you an email', es: 'Le enviaré un correo', fr: 'Je vous enverrai un courriel', ru: 'Я отправлю вам письмо', pt: 'Vou te enviar um e-mail', de: 'Ich schicke Ihnen eine E-Mail', id: 'Saya akan mengirim email kepada Anda', tr: 'Size bir e-posta göndereceğim' },
  'when is the deadline?': { en: 'When is the deadline?', es: '¿Cuándo es la fecha límite?', fr: 'Quelle est la date limite ?', ru: 'Какой крайний срок?', pt: 'Qual é o prazo?', de: 'Wann ist die Frist?', id: 'Kapan tenggat waktunya?', tr: 'Son teslim tarihi ne zaman?' },

  // Healthcare & Pharmacy Pack
  'medicine': { en: 'Medicine', es: 'Medicina', fr: 'Médicament', ru: 'Лекарство', pt: 'Remédio', de: 'Medikament', id: 'Obat', tr: 'İlaç' },
  'pain': { en: 'Pain', es: 'Dolor', fr: 'Douleur', ru: 'Боль', pt: 'Dor', de: 'Schmerz', id: 'Rasa sakit', tr: 'Ağrı' },
  'fever': { en: 'Fever', es: 'Fiebre', fr: 'Fièvre', ru: 'Температура', pt: 'Febre', de: 'Fieber', id: 'Demam', tr: 'Ateş' },
  'allergy': { en: 'Allergy', es: 'Alergia', fr: 'Allergie', ru: 'Аллергия', pt: 'Alergia', de: 'Allergie', id: 'Alergi', tr: 'Alerji' },
  'headache': { en: 'Headache', es: 'Dolor de cabeza', fr: 'Mal de tête', ru: 'Головная боль', pt: 'Dor de cabeça', de: 'Kopfschmerzen', id: 'Sakit kepala', tr: 'Baş ağrısı' },
  'emergency': { en: 'Emergency', es: 'Emergencia', fr: 'Urgence', ru: 'Скорая помощь', pt: 'Emergência', de: 'Notfall', id: 'Darurat', tr: 'Acil durum' },
  'prescription': { en: 'Prescription', es: 'Receta médica', fr: 'Ordonnance', ru: 'Рецепт', pt: 'Receita médica', de: 'Rezept', id: 'Resep dokter', tr: 'Reçete' },
  'bandage': { en: 'Bandage', es: 'Venda', fr: 'Pansement', ru: 'Бинт', pt: 'Curativo', de: 'Verband', id: 'Perban', tr: 'Bandaj' },
  'health': { en: 'Health', es: 'Salud', fr: 'Santé', ru: 'Здоровье', pt: 'Saúde', de: 'Gesundheit', id: 'Kesehatan', tr: 'Sağlık' },
  'where is the nearest pharmacy?': { en: 'Where is the nearest pharmacy?', es: '¿Dónde está la farmacia más cercana?', fr: 'Où est la pharmacie la plus proche ?', ru: 'Где ближайшая аптека?', pt: 'Onde fica a farmácia mais próxima?', de: 'Wo ist die nächste Apotheke?', id: 'Di mana apotek terdekat?', tr: 'En yakın eczane nerede?' },
  'i am allergic to nuts': { en: 'I am allergic to nuts', es: 'Soy alérgico a las nueces', fr: 'Je suis allergique aux noix', ru: 'У меня аллергия на орехи', pt: 'Tenho alergia a nozes', de: 'Ich bin allergisch gegen Nüsse', id: 'Saya alergi kacang', tr: 'Kuruyemiş alerjim var' },

  // Hotel, Airport & Travel Pack
  'flight': { en: 'Flight', es: 'Vuelo', fr: 'Vol', ru: 'Рейс', pt: 'Voo', de: 'Flug', id: 'Penerbangan', tr: 'Uçuş' },
  'luggage': { en: 'Luggage', es: 'Equipaje', fr: 'Bagage', ru: 'Багаж', pt: 'Bagagem', de: 'Gepäck', id: 'Bagasi', tr: 'Bagaj' },
  'reservation': { en: 'Reservation', es: 'Reserva', fr: 'Réservation', ru: 'Бронь', pt: 'Reserva', de: 'Reservierung', id: 'Reservasi', tr: 'Rezervasyon' },
  'room': { en: 'Room', es: 'Habitación', fr: 'Chambre', ru: 'Номер', pt: 'Quarto', de: 'Zimmer', id: 'Kamar', tr: 'Oda' },
  'gate': { en: 'Gate', es: 'Puerta de embarque', fr: 'Porte d\'embarquement', ru: 'Выход на посадку', pt: 'Portão de embarque', de: 'Gate', id: 'Gerbang', tr: 'Kapı' },
  'exit': { en: 'Exit', es: 'Salida', fr: 'Sortie', ru: 'Выход', pt: 'Saída', de: 'Ausgang', id: 'Pintu keluar', tr: 'Çıkış' },
  'customs': { en: 'Customs', es: 'Aduana', fr: 'Douane', ru: 'Таможня', pt: 'Alfândega', de: 'Zoll', id: 'Bea cukai', tr: 'Gümrük' },
  'i have a reservation': { en: 'I have a reservation', es: 'Tengo una reserva', fr: 'J\'ai une réservation', ru: 'У меня есть бронь', pt: 'Tenho uma reserva', de: 'Ich habe eine Reservierung', id: 'Saya punya reservasi', tr: 'Rezervasyonum var' },

  // Shopping & Money Pack
  'credit card': { en: 'Credit card', es: 'Tarjeta de crédito', fr: 'Carte bancaire', ru: 'Банковская карта', pt: 'Cartão de crédito', de: 'Kreditkarte', id: 'Kartu kredit', tr: 'Kredi kartı' },
  'cash': { en: 'Cash', es: 'Efectivo', fr: 'Espèces', ru: 'Наличные', pt: 'Dinheiro vivo', de: 'Bargeld', id: 'Uang tunai', tr: 'Nakit' },
  'price': { en: 'Price', es: 'Precio', fr: 'Prix', ru: 'Цена', pt: 'Preço', de: 'Preis', id: 'Harga', tr: 'Fiyat' },
  'cheap': { en: 'Cheap', es: 'Barato', fr: 'Pas cher', ru: 'Дешёвый', pt: 'Barato', de: 'Billig', id: 'Murah', tr: 'Ucuz' },
  'expensive': { en: 'Expensive', es: 'Caro', fr: 'Cher', ru: 'Дорогой', pt: 'Caro', de: 'Teuer', id: 'Mahal', tr: 'Pahalı' },
  'discount': { en: 'Discount', es: 'Descuento', fr: 'Réduction', ru: 'Скидка', pt: 'Desconto', de: 'Rabatt', id: 'Diskon', tr: 'İndirim' },
  'where is the bus stop?': { en: 'Where is the bus stop?', es: '¿Dónde está la parada de autobús?', fr: 'Où est l\'arrêt de bus ?', ru: 'Где автобусная остановка?', pt: 'Onde fica o ponto de ônibus?', de: 'Wo ist die Bushaltestelle?', id: 'Di mana halte bus?', tr: 'Otobüs durağı nerede?' },
  'how do i get to the airport?': { en: 'How do I get to the airport?', es: '¿Cómo llego al aeropuerto?', fr: 'Comment aller à l\'aéroport ?', ru: 'Как добраться до аэропорта?', pt: 'Como chego ao aeroporto?', de: 'Wie komme ich zum Flughafen?', id: 'Bagaimana cara ke bandara?', tr: 'Havalimanına nasıl gidebilirim?' },
  'i would like a coffee, please': { en: 'I would like a coffee, please', es: 'Quisiera un café, por favor', fr: 'Je voudrais un café, s\'il vous plaît', ru: 'Я бы хотел кофе, пожалуйста', pt: 'Eu gostaria de um café, por favor', de: 'Ich hätte gern einen Kaffee, bitte', id: 'Saya mau kopi, tolong', tr: 'Bir kahve rica ediyorum' },
  'a bottle of water, please': { en: 'A bottle of water, please', es: 'Una botella de agua, por favor', fr: 'Une bouteille d\'eau, s\'il vous plaît', ru: 'Бутылку воды, пожалуйста', pt: 'Uma garrafa de água, por favor', de: 'Eine Flasche Wasser, bitte', id: 'Sebotol air, tolong', tr: 'Bir şişe su, lütfen' },

  // Batch 1: Modern Tech, Workplace & Commerce (Levels 1, 2, 3)
  'laptop': { en: 'Laptop', es: 'Portátil', fr: 'Ordinateur portable', ru: 'Ноутбук', pt: 'Portátil', de: 'Laptop', id: 'Laptop', tr: 'Dizüstü bilgisayar' },
  'tablet': { en: 'Tablet', es: 'Tableta', fr: 'Tablette', ru: 'Планшет', pt: 'Tablet', de: 'Tablet', id: 'Tablet', tr: 'Tablet' },
  'screen / display': { en: 'Screen', es: 'Pantalla', fr: 'Écran', ru: 'Экран', pt: 'Tela', de: 'Bildschirm', id: 'Layar', tr: 'Ekran' },
  'keyboard': { en: 'Keyboard', es: 'Teclado', fr: 'Clavier', ru: 'Клавиатура', pt: 'Teclado', de: 'Tastatur', id: 'Papan ketik', tr: 'Klavye' },
  'mouse': { en: 'Mouse', es: 'Ratón', fr: 'Souris', ru: 'Мышь', pt: 'Mouse', de: 'Maus', id: 'Tetikus', tr: 'Fare' },
  'charger': { en: 'Charger', es: 'Cargador', fr: 'Chargeur', ru: 'Зарядка', pt: 'Carregador', de: 'Ladegerät', id: 'Pengisi daya', tr: 'Şarj aleti' },
  'cable': { en: 'Cable', es: 'Cable', fr: 'Câble', ru: 'Кабель', pt: 'Cabo', de: 'Kabel', id: 'Kabel', tr: 'Kablo' },
  'cable / wire': { en: 'Cable', es: 'Cable', fr: 'Câble', ru: 'Кабель', pt: 'Cabo', de: 'Kabel', id: 'Kabel', tr: 'Kablo' },
  'wifi': { en: 'Wi-Fi', es: 'Wifi', fr: 'Wi-Fi', ru: 'Вайфай', pt: 'Wi-Fi', de: 'WLAN', id: 'Wi-Fi', tr: 'Kablosuz ağ' },
  'wi-fi': { en: 'Wi-Fi', es: 'Wifi', fr: 'Wi-Fi', ru: 'Вайфай', pt: 'Wi-Fi', de: 'WLAN', id: 'Wi-Fi', tr: 'Kablosuz ağ' },
  'wi-fi / wlan': { en: 'Wi-Fi', es: 'Wifi', fr: 'Wi-Fi', ru: 'Вайфай', pt: 'Wi-Fi', de: 'WLAN', id: 'Wi-Fi', tr: 'Kablosuz ağ' },
  'message': { en: 'Message', es: 'Mensaje', fr: 'Message', ru: 'Сообщение', pt: 'Mensagem', de: 'Nachricht', id: 'Pesan', tr: 'Mesaj' },
  'message / text': { en: 'Message', es: 'Mensaje', fr: 'Message', ru: 'Сообщение', pt: 'Mensagem', de: 'Nachricht', id: 'Pesan', tr: 'Mesaj' },
  'website': { en: 'Website', es: 'Sitio web', fr: 'Site web', ru: 'Сайт', pt: 'Site', de: 'Webseite', id: 'Situs web', tr: 'Web sitesi' },
  'app': { en: 'Application', es: 'Aplicación', fr: 'Application', ru: 'Приложение', pt: 'Aplicativo', de: 'Anwendung', id: 'Aplikasi', tr: 'Uygulama' },
  'application': { en: 'Application', es: 'Aplicación', fr: 'Application', ru: 'Приложение', pt: 'Aplicativo', de: 'Anwendung', id: 'Aplikasi', tr: 'Uygulama' },
  'application / app': { en: 'Application', es: 'Aplicación', fr: 'Application', ru: 'Приложение', pt: 'Aplicativo', de: 'Anwendung', id: 'Aplikasi', tr: 'Uygulama' },
  'file / document': { en: 'File', es: 'Archivo', fr: 'Fichier', ru: 'Файл', pt: 'Arquivo', de: 'Datei', id: 'Berkas', tr: 'Dosya' },
  'folder': { en: 'Folder', es: 'Carpeta', fr: 'Dossier', ru: 'Папка', pt: 'Pasta', de: 'Ordner', id: 'Folder', tr: 'Klasör' },
  'camera': { en: 'Camera', es: 'Cámara', fr: 'Caméra', ru: 'Камера', pt: 'Câmera', de: 'Kamera', id: 'Kamera', tr: 'Kamera' },
  'microphone': { en: 'Microphone', es: 'Micrófono', fr: 'Microphone', ru: 'Микрофон', pt: 'Microfone', de: 'Mikrofon', id: 'Mikrofon', tr: 'Mikrofon' },
  'headphones': { en: 'Headphones', es: 'Auriculares', fr: 'Écouteurs', ru: 'Наушники', pt: 'Fones de ouvido', de: 'Kopfhörer', id: 'Headphone', tr: 'Kulaklık' },
  'printer': { en: 'Printer', es: 'Impresora', fr: 'Imprimante', ru: 'Принтер', pt: 'Impressora', de: 'Drucker', id: 'Pencetak', tr: 'Yazıcı' },
  'search': { en: 'Search', es: 'Buscar', fr: 'Rechercher', ru: 'Искать', pt: 'Pesquisar', de: 'Suchen', id: 'Cari', tr: 'Aramak' },
  'search / find': { en: 'Search', es: 'Buscar', fr: 'Rechercher', ru: 'Искать', pt: 'Pesquisar', de: 'Suchen', id: 'Cari', tr: 'Aramak' },
  'save': { en: 'Save', es: 'Guardar', fr: 'Enregistrer', ru: 'Сохранить', pt: 'Salvar', de: 'Speichern', id: 'Simpan', tr: 'Kaydetmek' },
  'delete': { en: 'Delete', es: 'Eliminar', fr: 'Supprimer', ru: 'Удалить', pt: 'Excluir', de: 'Löschen', id: 'Hapus', tr: 'Silmek' },
  'delete / remove': { en: 'Delete', es: 'Eliminar', fr: 'Supprimer', ru: 'Удалить', pt: 'Excluir', de: 'Löschen', id: 'Hapus', tr: 'Silmek' },
  'send': { en: 'Send', es: 'Enviar', fr: 'Envoyer', ru: 'Отправить', pt: 'Enviar', de: 'Senden', id: 'Kirim', tr: 'Göndermek' },
  'download': { en: 'Download', es: 'Descargar', fr: 'Télécharger', ru: 'Скачать', pt: 'Baixar', de: 'Herunterladen', id: 'Mengunduh', tr: 'İndirmek' },
  'upload': { en: 'Upload', es: 'Subir', fr: 'Téléverser', ru: 'Загрузить', pt: 'Carregar', de: 'Hochladen', id: 'Mengunggah', tr: 'Yüklemek' },
  'online': { en: 'Online', es: 'En línea', fr: 'En ligne', ru: 'В сети', pt: 'Online', de: 'Online', id: 'Daring', tr: 'Çevrim içi' },
  'offline': { en: 'Offline', es: 'Desconectado', fr: 'Hors ligne', ru: 'Не в сети', pt: 'Offline', de: 'Offline', id: 'Luring', tr: 'Çevrim dışı' },
  'job': { en: 'Job', es: 'Trabajo', fr: 'Travail', ru: 'Работа', pt: 'Trabalho', de: 'Arbeit', id: 'Pekerjaan', tr: 'İş' },
  'buy': { en: 'Buy', es: 'Comprar', fr: 'Acheter', ru: 'Купить', pt: 'Comprar', de: 'Kaufen', id: 'Beli', tr: 'Satın almak' },
  'buy / purchase': { en: 'Buy', es: 'Comprar', fr: 'Acheter', ru: 'Купить', pt: 'Comprar', de: 'Kaufen', id: 'Beli', tr: 'Satın almak' },
  'sell': { en: 'Sell', es: 'Vender', fr: 'Vendre', ru: 'Продать', pt: 'Vender', de: 'Verkaufen', id: 'Jual', tr: 'Satmak' },
  'pay': { en: 'Pay', es: 'Pagar', fr: 'Payer', ru: 'Платить', pt: 'Pagar', de: 'Bezahlen', id: 'Bayar', tr: 'Ödemek' },
  'pay / payment': { en: 'Pay', es: 'Pagar', fr: 'Payer', ru: 'Платить', pt: 'Pagar', de: 'Bezahlen', id: 'Bayar', tr: 'Ödemek' },
  'credit_card': { en: 'Credit card', es: 'Tarjeta de crédito', fr: 'Carte de crédit', ru: 'Кредитная карта', pt: 'Cartão de crédito', de: 'Kreditkarte', id: 'Kartu kredit', tr: 'Kredi kartı' },
  'cheap / inexpensive': { en: 'Cheap', es: 'Barato', fr: 'Bon marché', ru: 'Дешёвый', pt: 'Barato', de: 'Billig', id: 'Murah', tr: 'Ucuz' },
  'receipt': { en: 'Receipt', es: 'Recibo', fr: 'Reçu', ru: 'Чек', pt: 'Recibo', de: 'Quittung', id: 'Struk', tr: 'Fiş' },
  'help_desk': { en: 'Support', es: 'Soporte', fr: 'Assistance', ru: 'Поддержка', pt: 'Suporte', de: 'Kundendienst', id: 'Dukungan', tr: 'Destek' },
  'support': { en: 'Support', es: 'Soporte', fr: 'Assistance', ru: 'Поддержка', pt: 'Suporte', de: 'Kundendienst', id: 'Dukungan', tr: 'Destek' },
  'help desk': { en: 'Support', es: 'Soporte', fr: 'Assistance', ru: 'Поддержка', pt: 'Suporte', de: 'Kundendienst', id: 'Dukungan', tr: 'Destek' },
  'customer support / help desk': { en: 'Support', es: 'Soporte', fr: 'Assistance', ru: 'Поддержка', pt: 'Suporte', de: 'Kundendienst', id: 'Dukungan', tr: 'Destek' },
  'support / help desk': { en: 'Support', es: 'Soporte', fr: 'Assistance', ru: 'Поддержка', pt: 'Suporte', de: 'Kundendienst', id: 'Dukungan', tr: 'Destek' },
  'support / service': { en: 'Support', es: 'Soporte', fr: 'Assistance', ru: 'Поддержка', pt: 'Suporte', de: 'Kundendienst', id: 'Dukungan', tr: 'Destek' },
  'open_action': { en: 'Open', es: 'Abrir', fr: 'Ouvrir', ru: 'Открыть', pt: 'Abrir', de: 'Öffnen', id: 'Buka', tr: 'Açmak' },
  'close_action': { en: 'Close', es: 'Cerrar', fr: 'Fermer', ru: 'Закрыть', pt: 'Fechar', de: 'Schließen', id: 'Tutup', tr: 'Kapatmak' },
  'close': { en: 'Close', es: 'Cerrar', fr: 'Fermer', ru: 'Закрыть', pt: 'Fechar', de: 'Schließen', id: 'Tutup', tr: 'Kapatmak' },
  'update_action': { en: 'Update', es: 'Actualizar', fr: 'Mettre à jour', ru: 'Обновить', pt: 'Atualizar', de: 'Aktualisieren', id: 'Perbarui', tr: 'Güncellemek' },
  'update': { en: 'Update', es: 'Actualizar', fr: 'Mettre à jour', ru: 'Обновить', pt: 'Atualizar', de: 'Aktualisieren', id: 'Perbarui', tr: 'Güncellemek' },
  'update / refresh': { en: 'Update', es: 'Actualizar', fr: 'Mettre à jour', ru: 'Обновить', pt: 'Atualizar', de: 'Aktualisieren', id: 'Perbarui', tr: 'Güncellemek' },
  'boss': { en: 'Boss', es: 'Jefe', fr: 'Patron', ru: 'Начальник', pt: 'Chefe', de: 'Chef', id: 'Bos', tr: 'Patron' },
  'boss / supervisor': { en: 'Boss', es: 'Jefe', fr: 'Patron', ru: 'Начальник', pt: 'Chefe', de: 'Chef', id: 'Bos', tr: 'Patron' },
  'colleague': { en: 'Colleague', es: 'Colega', fr: 'Collègue', ru: 'Коллега', pt: 'Colega', de: 'Kollege', id: 'Rekan kerja', tr: 'İş arkadaşı' },
  'colleague / coworker': { en: 'Colleague', es: 'Colega', fr: 'Collègue', ru: 'Коллега', pt: 'Colega', de: 'Kollege', id: 'Rekan kerja', tr: 'İş arkadaşı' },
  'employee': { en: 'Employee', es: 'Empleado', fr: 'Employé', ru: 'Сотрудник', pt: 'Funcionário', de: 'Mitarbeiter', id: 'Karyawan', tr: 'Çalışan' },
  'employee / worker': { en: 'Employee', es: 'Empleado', fr: 'Employé', ru: 'Сотрудник', pt: 'Funcionário', de: 'Mitarbeiter', id: 'Karyawan', tr: 'Çalışan' },
  'customer / client': { en: 'Client', es: 'Cliente', fr: 'Client', ru: 'Клиент', pt: 'Cliente', de: 'Kunde', id: 'Klien', tr: 'Müşteri' },
  'client / customer': { en: 'Client', es: 'Cliente', fr: 'Client', ru: 'Клиент', pt: 'Cliente', de: 'Kunde', id: 'Klien', tr: 'Müşteri' },
  'schedule / calendar': { en: 'Schedule', es: 'Horario', fr: 'Emploi du temps', ru: 'Расписание', pt: 'Horário', de: 'Zeitplan', id: 'Jadwal', tr: 'Program' },
  'task': { en: 'Task', es: 'Tarea', fr: 'Tâche', ru: 'Задача', pt: 'Tarefa', de: 'Aufgabe', id: 'Tugas', tr: 'Görev' },
  'task / assignment': { en: 'Task', es: 'Tarea', fr: 'Tâche', ru: 'Задача', pt: 'Tarefa', de: 'Aufgabe', id: 'Tugas', tr: 'Görev' },
  'report': { en: 'Report', es: 'Informe', fr: 'Rapport', ru: 'Отчёт', pt: 'Relatório', de: 'Bericht', id: 'Laporan', tr: 'Rapor' },
  'report / summary': { en: 'Report', es: 'Informe', fr: 'Rapport', ru: 'Отчёт', pt: 'Relatório', de: 'Bericht', id: 'Laporan', tr: 'Rapor' },
  'presentation': { en: 'Presentation', es: 'Presentación', fr: 'Présentation', ru: 'Презентация', pt: 'Apresentação', de: 'Präsentation', id: 'Presentasi', tr: 'Sunum' },
  'contract / agreement': { en: 'Contract', es: 'Contrato', fr: 'Contrat', ru: 'Договор', pt: 'Contrato', de: 'Vertrag', id: 'Kontrak', tr: 'Sözleşme' },
  'signature': { en: 'Signature', es: 'Firma', fr: 'Signature', ru: 'Подпись', pt: 'Assinatura', de: 'Unterschrift', id: 'Tanda tangan', tr: 'İmza' },
  'company / business': { en: 'Company', es: 'Empresa', fr: 'Entreprise', ru: 'Компания', pt: 'Empresa', de: 'Unternehmen', id: 'Perusahaan', tr: 'Şirket' },
  'salary / wage': { en: 'Salary', es: 'Salario', fr: 'Salaire', ru: 'Зарплата', pt: 'Salário', de: 'Gehalt', id: 'Gaji', tr: 'Maaş' },
  'vacation': { en: 'Vacation', es: 'Vacaciones', fr: 'Congé', ru: 'Отпуск', pt: 'Férias', de: 'Urlaub', id: 'Liburan', tr: 'Tatil' },
  'vacation / leave': { en: 'Vacation', es: 'Vacaciones', fr: 'Congé', ru: 'Отпуск', pt: 'Férias', de: 'Urlaub', id: 'Liburan', tr: 'Tatil' },
  'vacation / time off': { en: 'Vacation', es: 'Vacaciones', fr: 'Congé', ru: 'Отпуск', pt: 'Férias', de: 'Urlaub', id: 'Liburan', tr: 'Tatil' },
  'resume': { en: 'Resume', es: 'Currículum', fr: 'Curriculum vitae', ru: 'Резюме', pt: 'Currículo', de: 'Lebenslauf', id: 'Riwayat hidup', tr: 'Özgeçmiş' },
  'cv': { en: 'Resume', es: 'Currículum', fr: 'Curriculum vitae', ru: 'Резюме', pt: 'Currículo', de: 'Lebenslauf', id: 'Riwayat hidup', tr: 'Özgeçmiş' },
  'resume / cv': { en: 'Resume', es: 'Currículum', fr: 'Curriculum vitae', ru: 'Резюме', pt: 'Currículo', de: 'Lebenslauf', id: 'Riwayat hidup', tr: 'Özgeçmiş' },
  'cv / resume': { en: 'Resume', es: 'Currículum', fr: 'Curriculum vitae', ru: 'Резюме', pt: 'Currículo', de: 'Lebenslauf', id: 'Riwayat hidup', tr: 'Özgeçmiş' },
  'interview': { en: 'Interview', es: 'Entrevista', fr: 'Entretien', ru: 'Собеседование', pt: 'Entrevista', de: 'Bewerbungsgespräch', id: 'Wawancara', tr: 'Mülakat' },
  'job interview': { en: 'Interview', es: 'Entrevista', fr: 'Entretien', ru: 'Собеседование', pt: 'Entrevista', de: 'Bewerbungsgespräch', id: 'Wawancara', tr: 'Mülakat' },
  'deadline / due date': { en: 'Deadline', es: 'Fecha límite', fr: 'Date limite', ru: 'Срок сдачи', pt: 'Prazo final', de: 'Frist', id: 'Tenggat waktu', tr: 'Son teslim tarihi' },
  'goal': { en: 'Goal', es: 'Meta', fr: 'Objectif', ru: 'Цель', pt: 'Meta', de: 'Ziel', id: 'Tujuan', tr: 'Hedef' },
  'goal / objective': { en: 'Goal', es: 'Meta', fr: 'Objectif', ru: 'Цель', pt: 'Meta', de: 'Ziel', id: 'Tujuan', tr: 'Hedef' },
  'goal / target': { en: 'Goal', es: 'Meta', fr: 'Objectif', ru: 'Цель', pt: 'Meta', de: 'Ziel', id: 'Tujuan', tr: 'Hedef' },
  'product': { en: 'Product', es: 'Producto', fr: 'Produit', ru: 'Продукт', pt: 'Produto', de: 'Produkt', id: 'Produk', tr: 'Ürün' },
  'service': { en: 'Service', es: 'Servicio', fr: 'Service', ru: 'Услуга', pt: 'Serviço', de: 'Dienstleistung', id: 'Layanan', tr: 'Hizmet' },
  'invoice / bill': { en: 'Invoice', es: 'Factura', fr: 'Facture', ru: 'Счёт', pt: 'Fatura', de: 'Rechnung', id: 'Faktur', tr: 'Fatura' },
  'transfer': { en: 'Transfer', es: 'Transferencia', fr: 'Virement', ru: 'Перевод', pt: 'Transferência', de: 'Überweisung', id: 'Transfer', tr: 'Havale' },
  'bank transfer': { en: 'Transfer', es: 'Transferencia', fr: 'Virement', ru: 'Перевод', pt: 'Transferência', de: 'Überweisung', id: 'Transfer', tr: 'Havale' },
  'bank transfer / wire': { en: 'Transfer', es: 'Transferencia', fr: 'Virement', ru: 'Перевод', pt: 'Transferência', de: 'Überweisung', id: 'Transfer', tr: 'Havale' },
  'refund': { en: 'Refund', es: 'Reembolso', fr: 'Remboursement', ru: 'Возврат', pt: 'Reembolso', de: 'Rückerstattung', id: 'Pengembalian dana', tr: 'Para iadesi' },
  'refund / return': { en: 'Refund', es: 'Reembolso', fr: 'Remboursement', ru: 'Возврат', pt: 'Reembolso', de: 'Rückerstattung', id: 'Pengembalian dana', tr: 'Para iadesi' },
  'shipping': { en: 'Shipping', es: 'Envío', fr: 'Livraison', ru: 'Доставка', pt: 'Envio', de: 'Versand', id: 'Pengiriman', tr: 'Kargo' },
  'shipping / delivery': { en: 'Shipping', es: 'Envío', fr: 'Livraison', ru: 'Доставка', pt: 'Envio', de: 'Versand', id: 'Pengiriman', tr: 'Kargo' },
  'shipping / cargo': { en: 'Shipping', es: 'Envío', fr: 'Livraison', ru: 'Доставка', pt: 'Envio', de: 'Versand', id: 'Pengiriman', tr: 'Kargo' },
  'delivery / shipping': { en: 'Shipping', es: 'Envío', fr: 'Livraison', ru: 'Доставка', pt: 'Envio', de: 'Versand', id: 'Pengiriman', tr: 'Kargo' },
  'package': { en: 'Package', es: 'Paquete', fr: 'Colis', ru: 'Посылка', pt: 'Pacote', de: 'Paket', id: 'Paket', tr: 'Paket' },
  'package / parcel': { en: 'Package', es: 'Paquete', fr: 'Colis', ru: 'Посылка', pt: 'Pacote', de: 'Paket', id: 'Paket', tr: 'Paket' },
  'software': { en: 'Software', es: 'Software', fr: 'Logiciel', ru: 'Программное обеспечение', pt: 'Software', de: 'Software', id: 'Perangkat lunak', tr: 'Yazılım' },
  'hardware': { en: 'Hardware', es: 'Hardware', fr: 'Matériel informatique', ru: 'Аппаратное обеспечение', pt: 'Hardware', de: 'Hardware', id: 'Perangkat keras', tr: 'Donanım' },
  'database': { en: 'Database', es: 'Base de datos', fr: 'Base de données', ru: 'База данных', pt: 'Banco de dados', de: 'Datenbank', id: 'Basis data', tr: 'Veritabanı' },
  'server': { en: 'Server', es: 'Servidor', fr: 'Serveur', ru: 'Сервер', pt: 'Servidor', de: 'Server', id: 'Peladen', tr: 'Sunucu' },
  'cloud_storage': { en: 'Cloud storage', es: 'Almacenamiento en la nube', fr: 'Stockage dans le cloud', ru: 'Облачное хранилище', pt: 'Armazenamento em nuvem', de: 'Cloud-Speicher', id: 'Penyimpanan awan', tr: 'Bulut depolama' },
  'cloud storage': { en: 'Cloud storage', es: 'Almacenamiento en la nube', fr: 'Stockage dans le cloud', ru: 'Облачное хранилище', pt: 'Armazenamento em nuvem', de: 'Cloud-Speicher', id: 'Penyimpanan awan', tr: 'Bulut depolama' },
  'artificial_intelligence': { en: 'Artificial intelligence', es: 'Inteligencia artificial', fr: 'Intelligence artificielle', ru: 'Искусственный интеллект', pt: 'Inteligência artificial', de: 'Künstliche Intelligenz', id: 'Kecerdasan buatan', tr: 'Yapay zekâ' },
  'artificial intelligence': { en: 'Artificial intelligence', es: 'Inteligencia artificial', fr: 'Intelligence artificielle', ru: 'Искусственный интеллект', pt: 'Inteligência artificial', de: 'Künstliche Intelligenz', id: 'Kecerdasan buatan', tr: 'Yapay zekâ' },
  'artificial intelligence (ai)': { en: 'Artificial intelligence', es: 'Inteligencia artificial', fr: 'Intelligence artificielle', ru: 'Искусственный интеллект', pt: 'Inteligência artificial', de: 'Künstliche Intelligenz', id: 'Kecerdasan buatan', tr: 'Yapay zekâ' },
  'algorithm': { en: 'Algorithm', es: 'Algoritmo', fr: 'Algorithme', ru: 'Алгоритм', pt: 'Algoritmo', de: 'Algorithmus', id: 'Algoritma', tr: 'Algoritma' },
  'developer': { en: 'Developer', es: 'Desarrollador', fr: 'Développeur', ru: 'Разработчик', pt: 'Desenvolvedor', de: 'Entwickler', id: 'Pengembang', tr: 'Geliştirici' },
  'developer / programmer': { en: 'Developer', es: 'Desarrollador', fr: 'Développeur', ru: 'Разработчик', pt: 'Desenvolvedor', de: 'Entwickler', id: 'Pengembang', tr: 'Geliştirici' },
  'cybersecurity': { en: 'Cybersecurity', es: 'Ciberseguridad', fr: 'Cybersécurité', ru: 'Кибербезопасность', pt: 'Cibersegurança', de: 'Cybersicherheit', id: 'Keamanan siber', tr: 'Siber güvenlik' },
  'operating_system': { en: 'Operating system', es: 'Sistema operativo', fr: 'Système d\'exploitation', ru: 'Операционная система', pt: 'Sistema operacional', de: 'Betriebssystem', id: 'Sistem operasi', tr: 'İşletim sistemi' },
  'operating system': { en: 'Operating system', es: 'Sistema operativo', fr: 'Système d\'exploitation', ru: 'Операционная система', pt: 'Sistema operacional', de: 'Betriebssystem', id: 'Sistem operasi', tr: 'İşletim sistemi' },
  'budget': { en: 'Budget', es: 'Presupuesto', fr: 'Budget', ru: 'Бюджет', pt: 'Orçamento', de: 'Budget', id: 'Anggaran', tr: 'Bütçe' },
  'budget / financial plan': { en: 'Budget', es: 'Presupuesto', fr: 'Budget', ru: 'Бюджет', pt: 'Orçamento', de: 'Budget', id: 'Anggaran', tr: 'Bütçe' },
  'investment': { en: 'Investment', es: 'Inversión', fr: 'Investissement', ru: 'Инвестиции', pt: 'Investimento', de: 'Investition', id: 'Investasi', tr: 'Yatırım' },
  'investment / capital': { en: 'Investment', es: 'Inversión', fr: 'Investissement', ru: 'Инвестиции', pt: 'Investimento', de: 'Investition', id: 'Investasi', tr: 'Yatırım' },
  'revenue': { en: 'Revenue', es: 'Ingresos', fr: 'Revenus', ru: 'Выручка', pt: 'Receita', de: 'Umsatz', id: 'Pendapatan', tr: 'Gelir' },
  'revenue / income': { en: 'Revenue', es: 'Ingresos', fr: 'Revenus', ru: 'Выручка', pt: 'Receita', de: 'Umsatz', id: 'Pendapatan', tr: 'Gelir' },
  'revenue / turnover': { en: 'Revenue', es: 'Ingresos', fr: 'Revenus', ru: 'Выручка', pt: 'Receita', de: 'Umsatz', id: 'Pendapatan', tr: 'Gelir' },
  'startup': { en: 'Startup', es: 'Empresa emergente', fr: 'Jeune pousse', ru: 'Стартап', pt: 'Startup', de: 'Startup', id: 'Startup', tr: 'Yeni girişim' },
  'startup company': { en: 'Startup', es: 'Empresa emergente', fr: 'Jeune pousse', ru: 'Стартап', pt: 'Startup', de: 'Startup', id: 'Startup', tr: 'Yeni girişim' },
  'remote_work': { en: 'Remote work', es: 'Teletrabajo', fr: 'Télétravail', ru: 'Удалённая работа', pt: 'Trabalho remoto', de: 'Fernarbeit', id: 'Kerja jarak jauh', tr: 'Uzaktan çalışma' },
  'remote work': { en: 'Remote work', es: 'Teletrabajo', fr: 'Télétravail', ru: 'Удалённая работа', pt: 'Trabalho remoto', de: 'Fernarbeit', id: 'Kerja jarak jauh', tr: 'Uzaktan çalışma' },
  'remote work / telecommuting': { en: 'Remote work', es: 'Teletrabajo', fr: 'Télétravail', ru: 'Удалённая работа', pt: 'Trabalho remoto', de: 'Fernarbeit', id: 'Kerja jarak jauh', tr: 'Uzaktan çalışma' },
  'remote work / homeoffice': { en: 'Remote work', es: 'Teletrabajo', fr: 'Télétravail', ru: 'Удалённая работа', pt: 'Trabalho remoto', de: 'Fernarbeit', id: 'Kerja jarak jauh', tr: 'Uzaktan çalışma' },
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
    if (EXTENDED_DICTIONARY[lower] && EXTENDED_DICTIONARY[lower][baseLang]) {
      return EXTENDED_DICTIONARY[lower][baseLang];
    }
    const cleaned = lower
      .replace(/^noun:\s*/i, '')
      .replace(/^verb:\s*/i, '')
      .replace(/\s*\([^)]*\)\s*/g, ' ')
      .trim();
    if (cleaned && EXTENDED_DICTIONARY[cleaned] && EXTENDED_DICTIONARY[cleaned][baseLang]) {
      return EXTENDED_DICTIONARY[cleaned][baseLang];
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
        (mapping.tr && (mapping.tr.toLowerCase() === directTarget || mapping.tr.toLowerCase().replace(/\s*\([^)]*\)\s*/g, ' ').trim() === directTargetClean))
      ) {
        if (mapping[baseLang]) return mapping[baseLang];
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

  // 5. Check for multi-word or token matches in dictionary using word boundaries
  for (const [key, mapping] of Object.entries(EXTENDED_DICTIONARY)) {
    if (key.length >= 3 && cleanKey.length >= 3) {
      const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const wholeWordRegex = new RegExp(`(^|\\s)${escapedKey}(\\s|$)`, 'i');
      if (wholeWordRegex.test(cleanKey)) {
        if (mapping[baseLang]) {
          return mapping[baseLang];
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
  en: { en: 'English', es: 'Spanish', fr: 'French', ru: 'Russian', pt: 'Portuguese', de: 'German', id: 'Indonesian', tr: 'Turkish' },
  es: { en: 'inglés', es: 'español', fr: 'francés', ru: 'ruso', pt: 'portugués', de: 'alemán', id: 'indonesio', tr: 'turco' },
  fr: { en: 'anglais', es: 'espagnol', fr: 'français', ru: 'russe', pt: 'portugais', de: 'allemand', id: 'indonésien', tr: 'turc' },
  ru: { en: 'английском', es: 'испанском', fr: 'французском', ru: 'русском', pt: 'португальском', de: 'немецком', id: 'индонезийском', tr: 'турецком' },
  pt: { en: 'inglês', es: 'espanhol', fr: 'francês', ru: 'russo', pt: 'português', de: 'alemão', id: 'indonésio', tr: 'turco' },
  de: { en: 'Englisch', es: 'Spanisch', fr: 'Französisch', ru: 'Russisch', pt: 'Portugiesisch', de: 'Deutsch', id: 'Indonesisch', tr: 'Türkisch' },
  id: { en: 'bahasa Inggris', es: 'bahasa Spanyol', fr: 'bahasa Prancis', ru: 'bahasa Rusia', pt: 'bahasa Portugis', de: 'bahasa Jerman', id: 'bahasa Indonesia', tr: 'bahasa Turki' },
  tr: { en: 'İngilizce', es: 'İspanyolca', fr: 'Fransızca', ru: 'Rusça', pt: 'Portekizce', de: 'Almanca', id: 'Endonezce', tr: 'Türkçe' }
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
