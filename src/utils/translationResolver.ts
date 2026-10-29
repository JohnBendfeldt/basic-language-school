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
  allWords: string[];
}

export const NUMBER_TABLE: Record<number, NumberMapping> = {
  0: { digit: 0, en: 'Zero', es: 'Cero', fr: 'Zéro', ru: 'Ноль', pt: 'Zero', de: 'Null', allWords: ['zero', 'cero', 'zéro', 'ноль', 'нуль', 'null', '0'] },
  1: { digit: 1, en: 'One', es: 'Uno', fr: 'Un', ru: 'Один', pt: 'Um', de: 'Eins', allWords: ['one', 'uno', 'una', 'un', 'une', 'один', 'одна', 'одно', 'um', 'uma', 'eins', '1'] },
  2: { digit: 2, en: 'Two', es: 'Dos', fr: 'Deux', ru: 'Два', pt: 'Dois', de: 'Zwei', allWords: ['two', 'dos', 'deux', 'два', 'две', 'dois', 'duas', 'zwei', '2'] },
  3: { digit: 3, en: 'Three', es: 'Tres', fr: 'Trois', ru: 'Три', pt: 'Três', de: 'Drei', allWords: ['three', 'tres', 'três', 'trois', 'три', 'drei', '3'] },
  4: { digit: 4, en: 'Four', es: 'Cuatro', fr: 'Quatre', ru: 'Четыре', pt: 'Quatro', de: 'Vier', allWords: ['four', 'cuatro', 'quatre', 'четыре', 'quatro', 'vier', '4'] },
  5: { digit: 5, en: 'Five', es: 'Cinco', fr: 'Cinq', ru: 'Пять', pt: 'Cinco', de: 'Fünf', allWords: ['five', 'cinco', 'cinq', 'пять', 'fünf', '5'] },
  6: { digit: 6, en: 'Six', es: 'Seis', fr: 'Six', ru: 'Шесть', pt: 'Seis', de: 'Sechs', allWords: ['six', 'seis', 'шесть', 'sechs', '6'] },
  7: { digit: 7, en: 'Seven', es: 'Siete', fr: 'Sept', ru: 'Семь', pt: 'Sete', de: 'Sieben', allWords: ['seven', 'siete', 'sept', 'семь', 'sete', 'sieben', '7'] },
  8: { digit: 8, en: 'Eight', es: 'Ocho', fr: 'Huit', ru: 'Восемь', pt: 'Oito', de: 'Acht', allWords: ['eight', 'ocho', 'huit', 'восемь', 'oito', 'acht', '8'] },
  9: { digit: 9, en: 'Nine', es: 'Nueve', fr: 'Neuf', ru: 'Девять', pt: 'Nove', de: 'Neun', allWords: ['nine', 'nueve', 'neuf', 'девять', 'nove', 'neun', '9'] },
  10: { digit: 10, en: 'Ten', es: 'Diez', fr: 'Dix', ru: 'Десять', pt: 'Dez', de: 'Zehn', allWords: ['ten', 'diez', 'dix', 'десять', 'dez', 'zehn', '10'] },
  11: { digit: 11, en: 'Eleven', es: 'Once', fr: 'Onze', ru: 'Одиннадцать', pt: 'Onze', de: 'Elf', allWords: ['eleven', 'once', 'onze', 'одиннадцать', 'elf', '11'] },
  12: { digit: 12, en: 'Twelve', es: 'Doce', fr: 'Douze', ru: 'Двенадцать', pt: 'Doze', de: 'Zwölf', allWords: ['twelve', 'doce', 'douze', 'двенадцать', 'doze', 'zwölf', '12'] },
  13: { digit: 13, en: 'Thirteen', es: 'Trece', fr: 'Treize', ru: 'Тринадцать', pt: 'Treze', de: 'Dreizehn', allWords: ['thirteen', 'trece', 'treize', 'тринадцать', 'treze', 'dreizehn', '13'] },
  14: { digit: 14, en: 'Fourteen', es: 'Catorce', fr: 'Quatorze', ru: 'Четырнадцать', pt: 'Quatorze', de: 'Vierzehn', allWords: ['fourteen', 'catorce', 'quatorze', 'четырнадцать', 'vierzehn', '14'] },
  15: { digit: 15, en: 'Fifteen', es: 'Quince', fr: 'Quinze', ru: 'Пятнадцать', pt: 'Quinze', de: 'Fünfzehn', allWords: ['fifteen', 'quince', 'quinze', 'пятнадцать', 'fünfzehn', '15'] },
  16: { digit: 16, en: 'Sixteen', es: 'Dieciséis', fr: 'Seize', ru: 'Шестнадцать', pt: 'Dezesseis', de: 'Sechzehn', allWords: ['sixteen', 'dieciséis', 'dieciseis', 'seize', 'шестнадцать', 'dezesseis', 'sechzehn', '16'] },
  17: { digit: 17, en: 'Seventeen', es: 'Diecisiete', fr: 'Dix-sept', ru: 'Семнадцать', pt: 'Dezessete', de: 'Siebzehn', allWords: ['seventeen', 'diecisiete', 'dix-sept', 'семнадцать', 'dezessete', 'siebzehn', '17'] },
  18: { digit: 18, en: 'Eighteen', es: 'Dieciocho', fr: 'Dix-huit', ru: 'Восемнадцать', pt: 'Dezoito', de: 'Achtzehn', allWords: ['eighteen', 'dieciocho', 'dix-huit', 'восемнадцать', 'dezoito', 'achtzehn', '18'] },
  19: { digit: 19, en: 'Nineteen', es: 'Diecinueve', fr: 'Dix-neuf', ru: 'Девятнадцать', pt: 'Dezenove', de: 'Neunzehn', allWords: ['nineteen', 'diecinueve', 'dix-neuf', 'девятнадцать', 'dezenove', 'neunzehn', '19'] },
  20: { digit: 20, en: 'Twenty', es: 'Veinte', fr: 'Vingt', ru: 'Двадцать', pt: 'Vinte', de: 'Zwanzig', allWords: ['twenty', 'veinte', 'vingt', 'двадцать', 'vinte', 'zwanzig', '20'] },
  30: { digit: 30, en: 'Thirty', es: 'Treinta', fr: 'Trente', ru: 'Тридцать', pt: 'Trinta', de: 'Dreißig', allWords: ['thirty', 'treinta', 'trente', 'тридцать', 'trinta', 'dreißig', '30'] },
  40: { digit: 40, en: 'Forty', es: 'Cuarenta', fr: 'Quarante', ru: 'Сорок', pt: 'Quarenta', de: 'Vierzig', allWords: ['forty', 'cuarenta', 'quarante', 'сорок', 'quarenta', 'vierzig', '40'] },
  50: { digit: 50, en: 'Fifty', es: 'Cincuenta', fr: 'Cinquante', ru: 'Пятьдесят', pt: 'Cinquenta', de: 'Fünfzig', allWords: ['fifty', 'cincuenta', 'cinquante', 'пятьдесят', 'cinquenta', 'fünfzig', '50'] },
  60: { digit: 60, en: 'Sixty', es: 'Sesenta', fr: 'Soixante', ru: 'Шестьдесят', pt: 'Sessenta', de: 'Sechzig', allWords: ['sixty', 'sesenta', 'soixante', 'шестьдесят', 'sessenta', 'sechzig', '60'] },
  70: { digit: 70, en: 'Seventy', es: 'Setenta', fr: 'Soixante-dix', ru: 'Семьдесят', pt: 'Setenta', de: 'Siebzig', allWords: ['seventy', 'setenta', 'soixante-dix', 'семьдесят', 'siebzig', '70'] },
  80: { digit: 80, en: 'Eighty', es: 'Ochenta', fr: 'Quatre-vingts', ru: 'Восемьдесят', pt: 'Oitenta', de: 'Achtzig', allWords: ['eighty', 'ochenta', 'quatre-vingts', 'quatre-vingt', 'восемьдесят', 'oitenta', 'achtzig', '80'] },
  90: { digit: 90, en: 'Ninety', es: 'Noventa', fr: 'Quatre-vingt-dix', ru: 'Девяносто', pt: 'Noventa', de: 'Neunzig', allWords: ['ninety', 'noventa', 'quatre-vingt-dix', 'девяносто', 'neunzig', '90'] },
  100: { digit: 100, en: 'One hundred', es: 'Cien', fr: 'Cent', ru: 'Сто', pt: 'Cem', de: 'Hundert', allWords: ['hundred', 'one hundred', 'a hundred', 'cien', 'ciento', 'cent', 'сто', 'cem', 'hundert', 'einhundert', '100'] },
  1000: { digit: 1000, en: 'One thousand', es: 'Mil', fr: 'Mille', ru: 'Тысяча', pt: 'Mil', de: 'Tausend', allWords: ['thousand', 'one thousand', 'a thousand', 'mil', 'mille', 'тысяча', 'tausend', 'eintausend', '1000'] }
};

export const EXTENDED_DICTIONARY: Record<string, Record<SupportedLanguageId, string>> = {
  // People & Family
  'man': { en: 'Man', es: 'Hombre', fr: 'Homme', ru: 'Мужчина', pt: 'Homem', de: 'Mann' },
  'woman': { en: 'Woman', es: 'Mujer', fr: 'Femme', ru: 'Женщина', pt: 'Mulher', de: 'Frau' },
  'child': { en: 'Child', es: 'Niño / Niña', fr: 'Enfant', ru: 'Ребёнок', pt: 'Criança', de: 'Kind' },
  'boy': { en: 'Boy', es: 'Niño / Chico', fr: 'Garçon', ru: 'Мальчик', pt: 'Menino', de: 'Junge' },
  'girl': { en: 'Girl', es: 'Niña / Chica', fr: 'Fille', ru: 'Девочка', pt: 'Menina', de: 'Mädchen' },
  'friend': { en: 'Friend', es: 'Amigo', fr: 'Ami', ru: 'Друг', pt: 'Amigo', de: 'Freund' },
  'family': { en: 'Family', es: 'Familia', fr: 'Famille', ru: 'Семья', pt: 'Família', de: 'Familie' },
  'father': { en: 'Father', es: 'Padre', fr: 'Père', ru: 'Отец', pt: 'Pai', de: 'Vater' },
  'father / dad': { en: 'Father / Dad', es: 'Padre / Papá', fr: 'Père / Papa', ru: 'Папа / Отец', pt: 'Pai', de: 'Vater / Papa' },
  'mother': { en: 'Mother', es: 'Madre', fr: 'Mère', ru: 'Мать', pt: 'Mãe', de: 'Mutter' },
  'mother / mom': { en: 'Mother / Mom', es: 'Madre / Mamá', fr: 'Mère / Maman', ru: 'Мама / Мать', pt: 'Mãe', de: 'Mutter / Mama' },
  'mom': { en: 'Mom', es: 'Mamá', fr: 'Maman', ru: 'Мама', pt: 'Mãe', de: 'Mama' },
  'husband': { en: 'Husband', es: 'Esposo / Marido', fr: 'Mari', ru: 'Муж', pt: 'Marido', de: 'Ehemann' },
  'wife': { en: 'Wife', es: 'Esposa / Mujer', fr: 'Femme / Épouse', ru: 'Жена', pt: 'Esposa', de: 'Ehefrau' },
  'teacher': { en: 'Teacher', es: 'Profesor / Maestro', fr: 'Enseignant', ru: 'Учитель', pt: 'Professor', de: 'Lehrer' },
  'student': { en: 'Student', es: 'Estudiante / Alumno', fr: 'Étudiant', ru: 'Студент', pt: 'Estudante', de: 'Student' },
  'doctor': { en: 'Doctor', es: 'Médico / Doctor', fr: 'Médecin / Docteur', ru: 'Врач / Доктор', pt: 'Médico', de: 'Arzt' },
  'we': { en: 'We', es: 'Nosotros', fr: 'Nous', ru: 'Мы', pt: 'Nós', de: 'Wir' },

  // Food & Drink
  'water': { en: 'Water', es: 'Agua', fr: 'Eau', ru: 'Вода', pt: 'Água', de: 'Wasser' },
  'bread': { en: 'Bread', es: 'Pan', fr: 'Pain', ru: 'Хлеб', pt: 'Pão', de: 'Brot' },
  'food': { en: 'Food / Meal', es: 'Comida', fr: 'Nourriture', ru: 'Еда', pt: 'Comida', de: 'Essen' },
  'milk': { en: 'Milk', es: 'Leche', fr: 'Lait', ru: 'Молоко', pt: 'Leite', de: 'Milch' },
  'meat': { en: 'Meat', es: 'Carne', fr: 'Viande', ru: 'Мясо', pt: 'Carne', de: 'Fleisch' },
  'fish': { en: 'Fish', es: 'Pescado', fr: 'Poisson', ru: 'Рыба', pt: 'Peixe', de: 'Fisch' },
  'vegetables': { en: 'Vegetables', es: 'Verduras', fr: 'Légumes', ru: 'Овощи', pt: 'Legumes', de: 'Gemüse' },
  'fruits': { en: 'Fruits', es: 'Frutas', fr: 'Fruits', ru: 'Фрукты', pt: 'Frutas', de: 'Obst' },
  'fruit': { en: 'Fruit', es: 'Fruta', fr: 'Fruit', ru: 'Фрукт / Фрукты', pt: 'Fruta', de: 'Frucht' },
  'rice': { en: 'Rice', es: 'Arroz', fr: 'Riz', ru: 'Рис', pt: 'Arroz', de: 'Reis' },
  'coffee': { en: 'Coffee', es: 'Café', fr: 'Café', ru: 'Кофе', pt: 'Café', de: 'Kaffee' },
  'tea': { en: 'Tea', es: 'Té', fr: 'Thé', ru: 'Чай', pt: 'Chá', de: 'Tee' },
  'beer': { en: 'Beer', es: 'Cerveza', fr: 'Bière', ru: 'Пиво', pt: 'Cerveja', de: 'Bier' },
  'wine': { en: 'Wine', es: 'Vino', fr: 'Vin', ru: 'Вино', pt: 'Vinho', de: 'Wein' },
  'breakfast': { en: 'Breakfast', es: 'Desayuno', fr: 'Petit-déjeuner', ru: 'Завтрак', pt: 'Café da manhã', de: 'Frühstück' },
  'lunch': { en: 'Lunch', es: 'Almuerzo', fr: 'Déjeuner', ru: 'Обед', pt: 'Almoço', de: 'Mittagessen' },
  'dinner': { en: 'Dinner', es: 'Cena', fr: 'Dîner', ru: 'Ужин', pt: 'Jantar', de: 'Abendessen' },

  // Places & Travel
  'store': { en: 'Store / Shop', es: 'Tienda', fr: 'Magasin', ru: 'Магазин', pt: 'Loja', de: 'Geschäft' },
  'shop': { en: 'Store / Shop', es: 'Tienda', fr: 'Magasin', ru: 'Магазин', pt: 'Loja', de: 'Geschäft' },
  'restaurant': { en: 'Restaurant', es: 'Restaurante', fr: 'Restaurant', ru: 'Ресторан', pt: 'Restaurante', de: 'Restaurant' },
  'hotel': { en: 'Hotel', es: 'Hotel', fr: 'Hôtel', ru: 'Гостиница / Отель', pt: 'Hotel', de: 'Hotel' },
  'station': { en: 'Station', es: 'Estación', fr: 'Gare / Station', ru: 'Станция / Вокзал', pt: 'Estação', de: 'Bahnhof' },
  'airport': { en: 'Airport', es: 'Aeropuerto', fr: 'Aéroport', ru: 'Аэропорт', pt: 'Aeroporto', de: 'Flughafen' },
  'street': { en: 'Street', es: 'Calle', fr: 'Rue', ru: 'Улица', pt: 'Rua', de: 'Straße' },
  'square': { en: 'Square (plaza)', es: 'Plaza', fr: 'Place', ru: 'Площадь', pt: 'Praça', de: 'Platz' },
  'square (plaza)': { en: 'Square (plaza)', es: 'Plaza', fr: 'Place', ru: 'Площадь', pt: 'Praça', de: 'Platz' },
  'park': { en: 'Park', es: 'Parque', fr: 'Parc', ru: 'Парк', pt: 'Parque', de: 'Park' },
  'hospital': { en: 'Hospital', es: 'Hospital', fr: 'Hôpital', ru: 'Больница', pt: 'Hospital', de: 'Krankenhaus' },
  'pharmacy': { en: 'Pharmacy', es: 'Farmacia', fr: 'Pharmacie', ru: 'Аптека', pt: 'Farmácia', de: 'Apotheke' },
  'bank': { en: 'Bank', es: 'Banco', fr: 'Banque', ru: 'Банк', pt: 'Banco', de: 'Bank' },
  'post office': { en: 'Post office', es: 'Oficina de correos', fr: 'Bureau de poste', ru: 'Почта', pt: 'Correios', de: 'Postamt' },
  'supermarket': { en: 'Supermarket', es: 'Supermercado', fr: 'Supermarché', ru: 'Супермаркет', pt: 'Supermercado', de: 'Supermarkt' },
  'police': { en: 'Police', es: 'Policía', fr: 'Police', ru: 'Полиция', pt: 'Polícia', de: 'Polizei' },
  'museum': { en: 'Museum', es: 'Museo', fr: 'Musée', ru: 'Музей', pt: 'Museu', de: 'Museum' },
  'theater': { en: 'Theater', es: 'Teatro', fr: 'Théâtre', ru: 'Театр', pt: 'Teatro', de: 'Theater' },
  'cinema': { en: 'Cinema', es: 'Cine', fr: 'Cinéma', ru: 'Кино / Кинотеатр', pt: 'Cinema', de: 'Kino' },
  'city': { en: 'City', es: 'Ciudad', fr: 'Ville', ru: 'Город', pt: 'Cidade', de: 'Stadt' },
  'country': { en: 'Country', es: 'País', fr: 'Pays', ru: 'Страна', pt: 'País', de: 'Land' },
  'house': { en: 'House / Home', es: 'Casa', fr: 'Maison', ru: 'Дом', pt: 'Casa', de: 'Haus' },
  'home': { en: 'Home / House', es: 'Casa', fr: 'Maison', ru: 'Дом', pt: 'Casa', de: 'Haus' },
  'car': { en: 'Car', es: 'Carro / Coche', fr: 'Voiture', ru: 'Машина', pt: 'Carro', de: 'Auto' },
  'train': { en: 'Train', es: 'Tren', fr: 'Train', ru: 'Поезд', pt: 'Trem', de: 'Zug' },
  'bus': { en: 'Bus', es: 'Autobús', fr: 'Bus', ru: 'Автобус', pt: 'Ônibus', de: 'Bus' },
  'airplane': { en: 'Airplane', es: 'Avión', fr: 'Avion', ru: 'Самолёт', pt: 'Avião', de: 'Flugzeug' },
  'taxi': { en: 'Taxi', es: 'Taxi', fr: 'Taxi', ru: 'Такси', pt: 'Táxi', de: 'Taxi' },
  'subway / metro': { en: 'Subway / Metro', es: 'Metro', fr: 'Métro', ru: 'Метро', pt: 'Metrô', de: 'U-Bahn' },
  'map': { en: 'Map', es: 'Mapa', fr: 'Carte / Plan', ru: 'Карта', pt: 'Mapa', de: 'Karte' },
  'visa': { en: 'Visa', es: 'Visa / Visado', fr: 'Visa', ru: 'Виза', pt: 'Visto', de: 'Visum' },
  'center': { en: 'Center', es: 'Centro', fr: 'Centre', ru: 'Центр', pt: 'Centro', de: 'Zentrum' },
  'factory': { en: 'Factory', es: 'Fábrica', fr: 'Usine', ru: 'Завод', pt: 'Fábrica', de: 'Fabrik' },

  // Everyday Essentials & Objects
  'money': { en: 'Money', es: 'Dinero', fr: 'Argent', ru: 'Деньги', pt: 'Dinheiro', de: 'Geld' },
  'ticket': { en: 'Ticket', es: 'Boleto / Billete', fr: 'Billet', ru: 'Билет', pt: 'Passagem', de: 'Ticket' },
  'passport': { en: 'Passport', es: 'Pasaporte', fr: 'Passeport', ru: 'Паспорт', pt: 'Passaporte', de: 'Reisepass' },
  'phone': { en: 'Phone', es: 'Teléfono', fr: 'Téléphone', ru: 'Телефон', pt: 'Telefone', de: 'Telefon' },
  'telephone': { en: 'Telephone', es: 'Teléfono', fr: 'Téléphone', ru: 'Телефон', pt: 'Telefone', de: 'Telefon' },
  'computer': { en: 'Computer', es: 'Computadora', fr: 'Ordinateur', ru: 'Компьютер', pt: 'Computador', de: 'Computer' },
  'book': { en: 'Book', es: 'Libro', fr: 'Livre', ru: 'Книга', pt: 'Livro', de: 'Buch' },
  'magazine': { en: 'Magazine', es: 'Revista', fr: 'Magazine', ru: 'Журнал', pt: 'Revista', de: 'Zeitschrift' },
  'help': { en: 'Help', es: 'Ayuda', fr: 'Aide', ru: 'Помощь', pt: 'Ajuda', de: 'Hilfe' },
  'time': { en: 'Time', es: 'Tiempo / Hora', fr: 'Temps / Heure', ru: 'Время', pt: 'Tempo', de: 'Zeit' },
  'work': { en: 'Work / Job', es: 'Trabajo', fr: 'Travail', ru: 'Работа', pt: 'Trabalho', de: 'Arbeit' },
  'office': { en: 'Office', es: 'Oficina', fr: 'Bureau', ru: 'Офис', pt: 'Escritório', de: 'Büro' },
  'card': { en: 'Card', es: 'Tarjeta', fr: 'Carte', ru: 'Карта / Карточка', pt: 'Cartão', de: 'Karte' },
  'table': { en: 'Table', es: 'Mesa', fr: 'Table', ru: 'Стол', pt: 'Mesa', de: 'Tisch' },
  'chair': { en: 'Chair', es: 'Silla', fr: 'Chaise', ru: 'Стул', pt: 'Cadeira', de: 'Stuhl' },
  'door': { en: 'Door', es: 'Puerta', fr: 'Porte', ru: 'Дверь', pt: 'Porta', de: 'Tür' },
  'bag': { en: 'Bag', es: 'Bolsa / Maleta', fr: 'Sac', ru: 'Сумка', pt: 'Bolsa', de: 'Tasche' },
  'clothes': { en: 'Clothes', es: 'Ropa', fr: 'Vêtements', ru: 'Одежда', pt: 'Roupas', de: 'Kleidung' },
  'shoes': { en: 'Shoes', es: 'Zapatos', fr: 'Chaussures', ru: 'Обувь / Туфли', pt: 'Sapatos', de: 'Schuhe' },
  'object': { en: 'Object', es: 'Objeto', fr: 'Objet', ru: 'Объект / Предмет', pt: 'Objeto', de: 'Objekt' },

  // Question Words
  'who': { en: 'Who', es: 'Quién', fr: 'Qui', ru: 'Кто', pt: 'Quem', de: 'Wer' },
  'what': { en: 'What', es: 'Qué', fr: 'Quoi / Que', ru: 'Что', pt: 'O que', de: 'Was' },
  'where': { en: 'Where', es: 'Dónde', fr: 'Où', ru: 'Где', pt: 'Onde', de: 'Wo' },
  'when': { en: 'When', es: 'Cuándo', fr: 'Quand', ru: 'Когда', pt: 'Quando', de: 'Wann' },
  'why': { en: 'Why', es: 'Por qué', fr: 'Pourquoi', ru: 'Почему', pt: 'Por que', de: 'Warum' },
  'how': { en: 'How', es: 'Cómo', fr: 'Comment', ru: 'Как', pt: 'Como', de: 'Wie' },
  'how much / how many': { en: 'How much / How many', es: 'Cuánto / Cuántos', fr: 'Combien', ru: 'Сколько', pt: 'Quanto', de: 'Wie viel' },

  // Days of the Week & Calendar
  'monday': { en: 'Monday', es: 'Lunes', fr: 'Lundi', ru: 'Понедельник', pt: 'Segunda-feira', de: 'Montag' },
  'tuesday': { en: 'Tuesday', es: 'Martes', fr: 'Mardi', ru: 'Вторник', pt: 'Terça-feira', de: 'Dienstag' },
  'wednesday': { en: 'Wednesday', es: 'Miércoles', fr: 'Mercredi', ru: 'Среда', pt: 'Quarta-feira', de: 'Mittwoch' },
  'thursday': { en: 'Thursday', es: 'Jueves', fr: 'Jeudi', ru: 'Четверг', pt: 'Quinta-feira', de: 'Donnerstag' },
  'friday': { en: 'Friday', es: 'Viernes', fr: 'Vendredi', ru: 'Пятница', pt: 'Sexta-feira', de: 'Freitag' },
  'saturday': { en: 'Saturday', es: 'Sábado', fr: 'Samedi', ru: 'Суббота', pt: 'Sábado', de: 'Samstag' },
  'sunday': { en: 'Sunday', es: 'Domingo', fr: 'Dimanche', ru: 'Воскресенье', pt: 'Domingo', de: 'Sonntag' },
  'week': { en: 'Week', es: 'Semana', fr: 'Semaine', ru: 'Неделя', pt: 'Semana', de: 'Woche' },
  'month': { en: 'Month', es: 'Mes', fr: 'Mois', ru: 'Месяц', pt: 'Mês', de: 'Monat' },
  'year': { en: 'Year', es: 'Año', fr: 'An / Année', ru: 'Год', pt: 'Ano', de: 'Jahr' },

  // Animals, Weather & Nature
  'dog': { en: 'Dog', es: 'Perro', fr: 'Chien', ru: 'Собака', pt: 'Cachorro', de: 'Hund' },
  'cat': { en: 'Cat', es: 'Gato', fr: 'Chat', ru: 'Кот / Кошка', pt: 'Gato', de: 'Katze' },
  'bird': { en: 'Bird', es: 'Pájaro / Ave', fr: 'Oiseau', ru: 'Птица', pt: 'Pássaro', de: 'Vogel' },
  'sun': { en: 'Sun', es: 'Sol', fr: 'Soleil', ru: 'Солнце', pt: 'Sol', de: 'Sonne' },
  'moon': { en: 'Moon', es: 'Luna', fr: 'Lune', ru: 'Луна', pt: 'Lua', de: 'Mond' },
  'star': { en: 'Star', es: 'Estrella', fr: 'Étoile', ru: 'Звезда', pt: 'Estrela', de: 'Stern' },
  'rain': { en: 'Rain', es: 'Lluvia', fr: 'Pluie', ru: 'Дождь', pt: 'Chuva', de: 'Regen' },
  'snow': { en: 'Snow', es: 'Nieve', fr: 'Neige', ru: 'Снег', pt: 'Neve', de: 'Schnee' },
  'cold': { en: 'Cold', es: 'Frío', fr: 'Froid', ru: 'Холодно / Холодный', pt: 'Frio', de: 'Kalt' },
  'hot': { en: 'Hot', es: 'Caliente / Calor', fr: 'Chaud', ru: 'Жарко / Горячий', pt: 'Quente', de: 'Heiß' },
  'hedgehog': { en: 'Hedgehog', es: 'Erizo', fr: 'Hérisson', ru: 'Ёж', pt: 'Ouriço', de: 'Igel' },
  'beetle': { en: 'Beetle / Bug', es: 'Escarabajo', fr: 'Scarabée', ru: 'Жук', pt: 'Besouro', de: 'Käfer' },
  'flower': { en: 'Flower', es: 'Flor', fr: 'Fleur', ru: 'Цветок', pt: 'Flor', de: 'Blume' },
  'tree': { en: 'Tree', es: 'Árbol', fr: 'Arbre', ru: 'Дерево', pt: 'Árvore', de: 'Baum' },
  'christmas tree': { en: 'Christmas tree', es: 'Árbol de Navidad', fr: 'Sapin de Noël', ru: 'Ёлка', pt: 'Árvore de Natal', de: 'Weihnachtsbaum' },

  // Adjectives & Qualities
  'good': { en: 'Good', es: 'Bueno', fr: 'Bon', ru: 'Хороший / Хорошо', pt: 'Bom', de: 'Gut' },
  'bad': { en: 'Bad', es: 'Malo', fr: 'Mauvais', ru: 'Плохой / Плохо', pt: 'Ruim', de: 'Schlecht' },
  'big': { en: 'Big / Large', es: 'Grande', fr: 'Grand', ru: 'Большой', pt: 'Grande', de: 'Groß' },
  'small': { en: 'Small / Little', es: 'Pequeño', fr: 'Petit', ru: 'Маленький', pt: 'Pequeno', de: 'Klein' },
  'new': { en: 'New', es: 'Nuevo', fr: 'Nouveau', ru: 'Новый', pt: 'Novo', de: 'Neu' },
  'old': { en: 'Old', es: 'Viejo / Antiguo', fr: 'Vieux / Ancien', ru: 'Старый', pt: 'Velho', de: 'Alt' },
  'open': { en: 'Open', es: 'Abierto', fr: 'Ouvert', ru: 'Открыто / Открытый', pt: 'Aberto', de: 'Offen' },
  'closed': { en: 'Closed', es: 'Cerrado', fr: 'Fermé', ru: 'Закрыто / Закрытый', pt: 'Fechado', de: 'Geschlossen' },
  'fast': { en: 'Fast / Quick', es: 'Rápido', fr: 'Rapide', ru: 'Быстрый / Быстро', pt: 'Rápido', de: 'Schnell' },
  'slow': { en: 'Slow', es: 'Lento', fr: 'Lent', ru: 'Медленный / Медленно', pt: 'Lento', de: 'Langsam' },
  'happy': { en: 'Happy', es: 'Feliz', fr: 'Heureux', ru: 'Счастливый / Рад', pt: 'Feliz', de: 'Glücklich' },
  'ready': { en: 'Ready', es: 'Listo', fr: 'Prêt', ru: 'Готов / Готовый', pt: 'Pronto', de: 'Bereit' },

  // Alphabet & Beginner Vocabulary
  'apple': { en: 'Apple', es: 'Manzana', fr: 'Pomme', ru: 'Яблоко', pt: 'Maçã', de: 'Apfel' },
  'egg': { en: 'Egg', es: 'Huevo', fr: 'Œuf', ru: 'Яйцо', pt: 'Ovo', de: 'Ei' },
  'ice': { en: 'Ice', es: 'Hielo', fr: 'Glace', ru: 'Лёд', pt: 'Gelo', de: 'Eis' },
  'juice': { en: 'Juice', es: 'Jugo', fr: 'Jus', ru: 'Сок', pt: 'Suco', de: 'Saft' },
  'key': { en: 'Key', es: 'Llave', fr: 'Clé', ru: 'Ключ', pt: 'Chave', de: 'Schlüssel' },
  'light': { en: 'Light', es: 'Luz', fr: 'Lumière', ru: 'Свет', pt: 'Luz', de: 'Licht' },
  'name': { en: 'Name', es: 'Nombre', fr: 'Nom', ru: 'Имя', pt: 'Nome', de: 'Name' },
  'orange': { en: 'Orange', es: 'Naranja', fr: 'Orange', ru: 'Апельсин', pt: 'Laranja', de: 'Orange' },
  'quiet': { en: 'Quiet', es: 'Tranquilo / Silencioso', fr: 'Silencieux / Calme', ru: 'Тихий', pt: 'Calmo', de: 'Ruhig' },
  'road': { en: 'Road', es: 'Camino / Carretera', fr: 'Route', ru: 'Дорога', pt: 'Estrada', de: 'Straße' },
  'school': { en: 'School', es: 'Escuela', fr: 'École', ru: 'Школа', pt: 'Escola', de: 'Schule' },
  'umbrella': { en: 'Umbrella', es: 'Paraguas', fr: 'Parapluie', ru: 'Зонт', pt: 'Guarda-chuva', de: 'Regenschirm' },
  'voice': { en: 'Voice', es: 'Voz', fr: 'Voix', ru: 'Голос', pt: 'Voz', de: 'Stimme' },
  'x-ray': { en: 'X-ray', es: 'Rayos X', fr: 'Rayons X', ru: 'Рентген', pt: 'Raio X', de: 'Röntgenbild' },
  'xylophone': { en: 'Xylophone', es: 'Xilófono', fr: 'Xylophone', ru: 'Ксилофон', pt: 'Xilofone', de: 'Xylophon' },
  'yellow': { en: 'Yellow', es: 'Amarillo', fr: 'Jaune', ru: 'Жёлтый', pt: 'Amarelo', de: 'Gelb' },
  'zero': { en: 'Zero', es: 'Cero', fr: 'Zéro', ru: 'Ноль', pt: 'Zero', de: 'Null' },
  'love': { en: 'Love', es: 'Amor', fr: 'Amour', ru: 'Любовь', pt: 'Amor', de: 'Liebe' },
  'boat': { en: 'Boat', es: 'Barco', fr: 'Bateau', ru: 'Лодка', pt: 'Barco', de: 'Boot' },
  'day': { en: 'Day', es: 'Día', fr: 'Jour', ru: 'День', pt: 'Dia', de: 'Tag' },
  'island': { en: 'Island', es: 'Isla', fr: 'Île', ru: 'Остров', pt: 'Ilha', de: 'Insel' },
  'kilogram': { en: 'Kilogram', es: 'Kilo', fr: 'Kilo', ru: 'Килограмм', pt: 'Quilo', de: 'Kilogramm' },
  'kilo': { en: 'Kilogram', es: 'Kilo', fr: 'Kilo', ru: 'Килограмм', pt: 'Quilo', de: 'Kilogramm' },
  'night': { en: 'Night', es: 'Noche', fr: 'Nuit', ru: 'Ночь', pt: 'Noite', de: 'Nacht' },
  'eye': { en: 'Eye', es: 'Ojo', fr: 'Œil', ru: 'Глаз', pt: 'Olho', de: 'Auge' },
  'eyes': { en: 'Eyes', es: 'Ojos', fr: 'Yeux', ru: 'Глаза', pt: 'Olhos', de: 'Augen' },
  'cheek': { en: 'Cheek', es: 'Mejilla', fr: 'Joue', ru: 'Щека', pt: 'Bochecha', de: 'Wange' },
  'cheese': { en: 'Cheese', es: 'Queso', fr: 'Fromage', ru: 'Сыр', pt: 'Queijo', de: 'Käse' },
  'clock': { en: 'Clock / Watch', es: 'Reloj', fr: 'Horloge / Montre', ru: 'Часы', pt: 'Relógio', de: 'Uhr' },
  'watch': { en: 'Watch / Clock', es: 'Reloj', fr: 'Montre', ru: 'Часы', pt: 'Relógio', de: 'Uhr' },
  'grape': { en: 'Grape', es: 'Uva', fr: 'Raisin', ru: 'Виноград', pt: 'Uva', de: 'Traube' },
  'glass': { en: 'Glass (cup)', es: 'Vaso', fr: 'Verre', ru: 'Стакан', pt: 'Copo', de: 'Glas' },
  'web': { en: 'Web', es: 'Web', fr: 'Web', ru: 'Веб', pt: 'Web', de: 'Web' },
  'success': { en: 'Success', es: 'Éxito', fr: 'Succès', ru: 'Успех', pt: 'Sucesso', de: 'Erfolg' },
  'yolk': { en: 'Yolk', es: 'Yema', fr: 'Jaune d\'œuf', ru: 'Желток', pt: 'Gema', de: 'Eigelb' },
  'shoe': { en: 'Shoe', es: 'Zapato', fr: 'Chaussure', ru: 'Обувь', pt: 'Sapato', de: 'Schuh' },
  'idea': { en: 'Idea', es: 'Idea', fr: 'Idée', ru: 'Идея', pt: 'Ideia', de: 'Idee' },
  'question': { en: 'Question', es: 'Pregunta', fr: 'Question', ru: 'Вопрос', pt: 'Pergunta', de: 'Frage' },
  'wagon': { en: 'Wagon / Car', es: 'Vagón', fr: 'Wagon', ru: 'Вагон', pt: 'Vagão', de: 'Waggon' },
  'example': { en: 'Example', es: 'Ejemplo', fr: 'Exemple', ru: 'Пример', pt: 'Exemplo', de: 'Beispiel' },
  'brother': { en: 'Brother', es: 'Hermano', fr: 'Frère', ru: 'Брат', pt: 'Irmão', de: 'Bruder' },
  'sister': { en: 'Sister', es: 'Hermana', fr: 'Sœur', ru: 'Сестра', pt: 'Irmã', de: 'Schwester' },
  'lemon': { en: 'Lemon', es: 'Limón', fr: 'Citron', ru: 'Лимон', pt: 'Limão', de: 'Zitrone' },
  'nose': { en: 'Nose', es: 'Nariz', fr: 'Nez', ru: 'Нос', pt: 'Nariz', de: 'Nase' },
  'window': { en: 'Window', es: 'Ventana', fr: 'Fenêtre', ru: 'Окно', pt: 'Janela', de: 'Fenster' },
  'dad': { en: 'Dad', es: 'Papá', fr: 'Papa', ru: 'Папа', pt: 'Pai', de: 'Papa' },
  'kettle': { en: 'Kettle', es: 'Tetera', fr: 'Bouilloire', ru: 'Чайник', pt: 'Chaleira', de: 'Wasserkocher' },
  'morning': { en: 'Morning', es: 'Mañana', fr: 'Matin', ru: 'Утро', pt: 'Manhã', de: 'Morgen' },
  'afternoon': { en: 'Afternoon', es: 'Tarde', fr: 'Après-midi', ru: 'День (после полудня)', pt: 'Tarde', de: 'Nachmittag' },
  'evening': { en: 'Evening', es: 'Tarde / Noche', fr: 'Soir', ru: 'Вечер', pt: 'Noite', de: 'Abend' },
  'photo': { en: 'Photo', es: 'Foto', fr: 'Photo', ru: 'Фото', pt: 'Foto', de: 'Foto' },
  'czar': { en: 'Czar / King', es: 'Zar', fr: 'Tsar', ru: 'Царь', pt: 'Czar', de: 'Zar' },
  'borscht': { en: 'Borscht', es: 'Borsch', fr: 'Bortsch', ru: 'Борщ', pt: 'Borsch', de: 'Borschtsch' },
  'entrance': { en: 'Entrance', es: 'Entrada', fr: 'Entrée', ru: 'Подъезд', pt: 'Entrada', de: 'Eingang' },
  'south': { en: 'South', es: 'Sur', fr: 'Sud', ru: 'Юг', pt: 'Sul', de: 'Süden' },
  'yogurt': { en: 'Yogurt', es: 'Yogur', fr: 'Yaourt', ru: 'Йогурт', pt: 'Iogurte', de: 'Joghurt' },
  'heart': { en: 'Heart', es: 'Corazón', fr: 'Cœur', ru: 'Сердце', pt: 'Coração', de: 'Herz' },
  'cup': { en: 'Cup', es: 'Taza', fr: 'Tasse', ru: 'Чашка', pt: 'Xícara', de: 'Tasse' },
  'source': { en: 'Source', es: 'Fuente', fr: 'Source', ru: 'Источник', pt: 'Fonte', de: 'Quelle' },
  'oil': { en: 'Oil', es: 'Aceite', fr: 'Huile', ru: 'Масло', pt: 'Óleo', de: 'Öl' },
  'or': { en: 'Or', es: 'O', fr: 'Ou', ru: 'Или', pt: 'Ou', de: 'Oder' },
  'this': { en: 'This', es: 'Esto', fr: 'Ceci', ru: 'Это', pt: 'Isto', de: 'Dies' },
  'i eat': { en: 'I eat', es: 'Como', fr: 'Je mange', ru: 'Ем', pt: 'Eu como', de: 'Ich esse' },
  'yes': { en: 'Yes', es: 'Sí', fr: 'Oui', ru: 'Да', pt: 'Sim', de: 'Ja' },
  'no': { en: 'No', es: 'No', fr: 'Non', ru: 'Нет', pt: 'Não', de: 'Nein' },
  'maybe': { en: 'Maybe', es: 'Quizás / Tal vez', fr: 'Peut-être', ru: 'Может быть', pt: 'Talvez', de: 'Vielleicht' },
  'today': { en: 'Today', es: 'Hoy', fr: 'Aujourd\'hui', ru: 'Сегодня', pt: 'Hoje', de: 'Heute' },
  'tomorrow': { en: 'Tomorrow', es: 'Mañana', fr: 'Demain', ru: 'Завтра', pt: 'Amanhã', de: 'Morgen' },
  'yesterday': { en: 'Yesterday', es: 'Ayer', fr: 'Hier', ru: 'Вчера', pt: 'Ontem', de: 'Gestern' },

  // Core Actions (Verbs)
  'to learn': { en: 'To learn', es: 'Aprender', fr: 'Apprendre', ru: 'Учиться', pt: 'Aprender', de: 'Lernen' },
  'to speak': { en: 'To speak', es: 'Hablar', fr: 'Parler', ru: 'Говорить', pt: 'Falar', de: 'Sprechen' },
  'to eat': { en: 'To eat', es: 'Comer', fr: 'Manger', ru: 'Есть', pt: 'Comer', de: 'Essen' },
  'to drink': { en: 'To drink', es: 'Beber', fr: 'Boire', ru: 'Пить', pt: 'Beber', de: 'Trinken' },
  'to go': { en: 'To go', es: 'Ir', fr: 'Aller', ru: 'Идти / Ехать', pt: 'Ir', de: 'Gehen' },
  'to come': { en: 'To come', es: 'Venir', fr: 'Venir', ru: 'Приходить / Приезжать', pt: 'Vir', de: 'Kommen' },
  'to understand': { en: 'To understand', es: 'Entender / Comprender', fr: 'Comprendre', ru: 'Понимать', pt: 'Entender', de: 'Verstehen' },
  'to know': { en: 'To know', es: 'Saber / Conocer', fr: 'Savoir / Connaître', ru: 'Знать', pt: 'Saber', de: 'Wissen' },
  'to want': { en: 'To want', es: 'Querer', fr: 'Vouloir', ru: 'Хотеть', pt: 'Querer', de: 'Wollen' },
  'to need': { en: 'To need', es: 'Necesitar', fr: 'Avoir besoin de', ru: 'Нуждаться (нужно)', pt: 'Precisar', de: 'Brauchen' },
  'to buy': { en: 'To buy', es: 'Comprar', fr: 'Acheter', ru: 'Покупать', pt: 'Comprar', de: 'Kaufen' },
  'to help': { en: 'To help', es: 'Ayudar', fr: 'Aider', ru: 'Помогать', pt: 'Ajudar', de: 'Helfen' },
  'to work': { en: 'To work', es: 'Trabajar', fr: 'Travailler', ru: 'Работать', pt: 'Trabalhar', de: 'Arbeiten' },

  // Essential Phrases
  'hello': { en: 'Hello', es: '¡Hola!', fr: 'Bonjour', ru: 'Привет / Здравствуйте', pt: 'Olá', de: 'Hallo' },
  'hello (informal)': { en: 'Hello (informal)', es: '¡Hola! (informal)', fr: 'Salut (informel)', ru: 'Привет', pt: 'Oi / Olá', de: 'Hallo' },
  'hello (formal)': { en: 'Hello (formal)', es: 'Buenos días / Hola (formal)', fr: 'Bonjour (formel)', ru: 'Здравствуйте', pt: 'Olá / Bom dia', de: 'Guten Tag' },
  'good morning': { en: 'Good morning', es: 'Buenos días', fr: 'Bonjour', ru: 'Доброе утро', pt: 'Bom dia', de: 'Guten Morgen' },
  'good afternoon': { en: 'Good afternoon', es: 'Buenas tardes', fr: 'Bon après-midi', ru: 'Добрый день', pt: 'Boa tarde', de: 'Guten Tag' },
  'good evening': { en: 'Good evening', es: 'Buenas noches', fr: 'Bonsoir', ru: 'Добрый вечер', pt: 'Boa noite', de: 'Guten Abend' },
  'good night': { en: 'Good night', es: 'Buenas noches', fr: 'Bonne nuit', ru: 'Спокойной ночи', pt: 'Boa noite', de: 'Gute Nacht' },
  'how are you': { en: 'How are you?', es: '¿Cómo estás?', fr: 'Comment allez-vous ?', ru: 'Как дела?', pt: 'Tudo bem?', de: 'Wie geht es dir?' },
  'how are you?': { en: 'How are you?', es: '¿Cómo estás?', fr: 'Comment allez-vous ?', ru: 'Как дела?', pt: 'Tudo bem?', de: 'Wie geht es dir?' },
  'i am fine, thank you': { en: 'I am fine, thank you', es: 'Estoy bien, gracias', fr: 'Je vais bien, merci', ru: 'У меня всё хорошо, спасибо', pt: 'Estou bem, obrigado', de: 'Mir geht es gut, danke' },
  'very well, thank you': { en: 'Very well, thank you', es: 'Muy bien, gracias', fr: 'Très bien, merci', ru: 'Очень хорошо, спасибо', pt: 'Muito bem, obrigado', de: 'Sehr gut, danke' },
  'good / well': { en: 'Good / Well', es: 'Bien', fr: 'Bien', ru: 'Хорошо', pt: 'Bem', de: 'Gut' },
  'bad / poorly': { en: 'Bad / Poorly', es: 'Mal', fr: 'Mal', ru: 'Плохо', pt: 'Mal', de: 'Schlecht' },
  'and you?': { en: 'And you?', es: '¿Y tú?', fr: 'Et vous ?', ru: 'А вы? / А у вас?', pt: 'E você?', de: 'Und dir?' },
  'please': { en: 'Please', es: 'Por favor', fr: 'S\'il vous plaît', ru: 'Пожалуйста', pt: 'Por favor', de: 'Bitte' },
  'please / you\'re welcome': { en: 'Please / You\'re welcome', es: 'Por favor / De nada', fr: 'S\'il vous plaît / De rien', ru: 'Пожалуйста', pt: 'Por favor / De nada', de: 'Bitte' },
  'thank you': { en: 'Thank you', es: 'Gracias', fr: 'Merci', ru: 'Спасибо', pt: 'Obrigado', de: 'Danke' },
  'thank you very much': { en: 'Thank you very much', es: 'Muchas gracias', fr: 'Merci beaucoup', ru: 'Большое спасибо', pt: 'Muito obrigado', de: 'Vielen Dank' },
  'you are welcome': { en: 'You are welcome', es: 'De nada', fr: 'De rien', ru: 'Пожалуйста / Не за что', pt: 'De nada', de: 'Gern geschehen' },
  'you\'re welcome / not at all': { en: 'You\'re welcome / Not at all', es: 'De nada', fr: 'De rien', ru: 'Не за что', pt: 'De nada', de: 'Gern geschehen' },
  'no problem': { en: 'No problem', es: 'No hay problema', fr: 'Pas de problème', ru: 'Без проблем / Ничего страшного', pt: 'Sem problema', de: 'Kein Problem' },
  'excuse me': { en: 'Excuse me', es: 'Disculpe / Con permiso', fr: 'Excusez-moi', ru: 'Извините', pt: 'Com licença', de: 'Entschuldigung' },
  'excuse me / sorry': { en: 'Excuse me / Sorry', es: 'Disculpe / Perdón', fr: 'Excusez-moi / Pardon', ru: 'Извините', pt: 'Com licença / Desculpe', de: 'Entschuldigung' },
  'i am sorry': { en: 'I am sorry', es: 'Lo siento / Perdón', fr: 'Pardon / Désolé', ru: 'Простите / Мне жаль', pt: 'Desculpe', de: 'Es tut mir leid' },
  'what is your name?': { en: 'What is your name?', es: '¿Cómo te llamas?', fr: 'Comment vous appelez-vous ?', ru: 'Как вас зовут?', pt: 'Qual é o seu nome?', de: 'Wie heißt du?' },
  'my name is': { en: 'My name is...', es: 'Me llamo...', fr: 'Je m\'appelle...', ru: 'Меня зовут...', pt: 'Meu nome é...', de: 'Ich heiße...' },
  'my name is...': { en: 'My name is...', es: 'Me llamo...', fr: 'Je m\'appelle...', ru: 'Меня зовут...', pt: 'Meu nome é...', de: 'Ich heiße...' },
  'nice to meet you': { en: 'Nice to meet you', es: 'Mucho gusto / Encantado', fr: 'Enchanté(e)', ru: 'Очень приятно познакомиться', pt: 'Muito prazer', de: 'Freut mich' },
  'where are you from?': { en: 'Where are you from?', es: '¿De dónde eres?', fr: 'D\'où venez-vous ?', ru: 'Откуда вы?', pt: 'De onde você é?', de: 'Woher kommst du?' },
  'i am from...': { en: 'I am from...', es: 'Soy de...', fr: 'Je viens de...', ru: 'Я из...', pt: 'Eu sou de...', de: 'Ich komme aus...' },
  'goodbye': { en: 'Goodbye', es: 'Adiós', fr: 'Au revoir', ru: 'До свидания', pt: 'Tchau / Adeus', de: 'Auf Wiedersehen' },
  'bye (informal)': { en: 'Bye (informal)', es: 'Chao / Hasta luego', fr: 'Salut / À plus', ru: 'Пока', pt: 'Tchau', de: 'Tschüss' },
  'see you later': { en: 'See you later', es: 'Hasta luego', fr: 'À bientôt', ru: 'Увидимся позже / Пока', pt: 'Até logo', de: 'Bis später' },
  'have a nice day': { en: 'Have a nice day', es: 'Que tenga un buen día', fr: 'Bonne journée', ru: 'Хорошего дня', pt: 'Tenha um bom dia', de: 'Schönen Tag noch' },
  'have a great day': { en: 'Have a great day', es: 'Que tenga un buen día', fr: 'Bonne journée', ru: 'Хорошего дня', pt: 'Tenha um ótimo dia', de: 'Einen schönen Tag' },
  'i understand': { en: 'I understand', es: 'Entiendo / Comprendo', fr: 'Je comprends', ru: 'Я понимаю', pt: 'Eu entendo', de: 'Ich verstehe' },
  'i do not understand': { en: 'I do not understand', es: 'No entiendo', fr: 'Je ne comprends pas', ru: 'Я не понимаю', pt: 'Eu não entendo', de: 'Ich verstehe nicht' },
  'i don\'t understand': { en: 'I don\'t understand', es: 'No entiendo', fr: 'Je ne comprends pas', ru: 'Я не понимаю', pt: 'Eu não entendo', de: 'Ich verstehe nicht' },
  'could you repeat that, please?': { en: 'Could you repeat that, please?', es: '¿Puede repetir, por favor?', fr: 'Pouvez-vous répéter ?', ru: 'Повторите, пожалуйста', pt: 'Pode repetir, por favor?', de: 'Können Sie das bitte wiederholen?' },
  'can you repeat, please?': { en: 'Can you repeat, please?', es: '¿Puede repetir, por favor?', fr: 'Pouvez-vous répéter ?', ru: 'Повторите, пожалуйста', pt: 'Pode repetir, por favor?', de: 'Können Sie das bitte wiederholen?' },
  'please repeat': { en: 'Please repeat', es: 'Repita, por favor', fr: 'Répétez, s\'il vous plaît', ru: 'Повторите, пожалуйста', pt: 'Repita, por favor', de: 'Bitte wiederholen' },
  'please speak more slowly': { en: 'Please speak more slowly', es: 'Hable más despacio, por favor', fr: 'Parlez plus lentement, s\'il vous plaît', ru: 'Говорите медленнее, пожалуйста', pt: 'Fale mais devagar, por favor', de: 'Bitte sprechen Sie langsamer' },
  'speak more slowly': { en: 'Speak more slowly', es: 'Hable más despacio', fr: 'Parlez plus lentement', ru: 'Говорите медленнее', pt: 'Fale mais devagar', de: 'Sprechen Sie langsamer' },
  'do you speak english?': { en: 'Do you speak English?', es: '¿Habla inglés?', fr: 'Parlez-vous anglais ?', ru: 'Вы говорите по-английски?', pt: 'Você fala inglês?', de: 'Sprechen Sie Englisch?' },
  'i speak a little russian': { en: 'I speak a little Russian', es: 'Hablo un poco de ruso', fr: 'Je parle un peu russe', ru: 'Я немного говорю по-русски', pt: 'Eu falo um pouco de russo', de: 'Ich spreche ein bisschen Russisch' },
  'what does this mean?': { en: 'What does this mean?', es: '¿Qué significa esto?', fr: 'Qu\'est-ce que cela signifie ?', ru: 'Что это значит?', pt: 'O que significa isto?', de: 'Was bedeutet das?' },
  'how do you say...?': { en: 'How do you say...?', es: '¿Cómo se dice...?', fr: 'Comment dit-on... ?', ru: 'Как сказать...?', pt: 'Como se diz...?', de: 'Wie sagt man...?' },
  'how do you say this in russian?': { en: 'How do you say this in Russian?', es: '¿Cómo se dice esto en ruso?', fr: 'Comment dit-on cela en russe ?', ru: 'Как это по-русски?', pt: 'Como se diz isto em russo?', de: 'Wie sagt man das auf Russisch?' },
  'can you help me?': { en: 'Can you help me?', es: '¿Puede ayudarme?', fr: 'Pouvez-vous m\'aider ?', ru: 'Вы можете мне помочь?', pt: 'Pode me ajudar?', de: 'Können Sie mir helfen?' },
  'help me': { en: 'Help me', es: 'Ayúdeme', fr: 'Aidez-moi', ru: 'Помогите мне', pt: 'Ajude-me', de: 'Helfen Sie mir' },
  'help!': { en: 'Help!', es: '¡Ayuda! / ¡Socorro!', fr: 'À l\'aide ! / Au secours !', ru: 'Помогите!', pt: 'Socorro!', de: 'Hilfe!' },
  'where is the restroom?': { en: 'Where is the restroom?', es: '¿Dónde está el baño?', fr: 'Où sont les toilettes ?', ru: 'Где находится туалет?', pt: 'Onde fica o banheiro?', de: 'Wo ist die Toilette?' },
  'where is the bathroom': { en: 'Where is the bathroom?', es: '¿Dónde está el baño?', fr: 'Où sont les toilettes ?', ru: 'Где туалет?', pt: 'Onde fica o banheiro?', de: 'Wo ist die Toilette?' },
  'where is the train station?': { en: 'Where is the train station?', es: '¿Dónde está la estación de tren?', fr: 'Où est la gare ?', ru: 'Где находится вокзал?', pt: 'Onde fica a estação de trem?', de: 'Wo ist der Bahnhof?' },
  'where is the airport?': { en: 'Where is the airport?', es: '¿Dónde está el aeropuerto?', fr: 'Où est l\'aéroport ?', ru: 'Где находится аэропорт?', pt: 'Onde fica o aeroporto?', de: 'Wo ist der Flughafen?' },
  'where is the hotel?': { en: 'Where is the hotel?', es: '¿Dónde está el hotel?', fr: 'Où est l\'hôtel ?', ru: 'Где находится отель?', pt: 'Onde fica o hotel?', de: 'Wo ist das Hotel?' },
  'how much is a ticket?': { en: 'How much is a ticket?', es: '¿Cuánto cuesta un boleto?', fr: 'Combien coûte un billet ?', ru: 'Сколько стоит билет?', pt: 'Quanto custa uma passagem?', de: 'Was kostet ein Ticket?' },
  'i need a taxi': { en: 'I need a taxi', es: 'Necesito un taxi', fr: 'J\'ai besoin d\'un taxi', ru: 'Мне нужно такси', pt: 'Preciso de um táxi', de: 'Ich brauche ein Taxi' },
  'turn left': { en: 'Turn left', es: 'Gire a la izquierda', fr: 'Tournez à gauche', ru: 'Поверните налево', pt: 'Vire à esquerda', de: 'Links abbiegen' },
  'turn right': { en: 'Turn right', es: 'Gire a la derecha', fr: 'Tournez à droite', ru: 'Поверните направо', pt: 'Vire à direita', de: 'Rechts abbiegen' },
  'go straight ahead': { en: 'Go straight ahead', es: 'Siga todo recto', fr: 'Allez tout droit', ru: 'Идите прямо', pt: 'Siga em frente', de: 'Geradeaus gehen' },
  'a table for two, please': { en: 'A table for two, please', es: 'Una mesa para dos, por favor', fr: 'Une table pour deux, s\'il vous plaît', ru: 'Столик на двоих, пожалуйста', pt: 'Uma mesa para dois, por favor', de: 'Einen Tisch für zwei, bitte' },
  'the menu, please': { en: 'The menu, please', es: 'El menú, por favor', fr: 'La carte, s\'il vous plaît', ru: 'Меню, пожалуйста', pt: 'O cardápio, por favor', de: 'Die Speisekarte, bitte' },
  'i would like water': { en: 'I would like water', es: 'Quisiera agua', fr: 'Je voudrais de l\'eau', ru: 'Я бы хотел(а) воды', pt: 'Eu gostaria de água', de: 'Ich hätte gern Wasser' },
  'i want to eat': { en: 'I want to eat', es: 'Quiero comer', fr: 'Je veux manger', ru: 'Я хочу есть', pt: 'Quero comer', de: 'Ich möchte essen' },
  'i want to drink': { en: 'I want to drink', es: 'Quiero beber', fr: 'Je veux boire', ru: 'Я хочу пить', pt: 'Quero beber', de: 'Ich möchte trinken' },
  'what do you recommend?': { en: 'What do you recommend?', es: '¿Qué recomienda?', fr: 'Que recommandez-vous ?', ru: 'Что вы порекомендуете?', pt: 'O que você recomenda?', de: 'Was empfehlen Sie?' },
  'this is delicious!': { en: 'This is delicious!', es: '¡Está delicioso!', fr: 'C\'est délicieux !', ru: 'Это очень вкусно!', pt: 'Isto está delicioso!', de: 'Das ist köstlich!' },
  'can i have the check, please?': { en: 'Can I have the check, please?', es: 'La cuenta, por favor', fr: 'L\'addition, s\'il vous plaît', ru: 'Счёт, пожалуйста', pt: 'A conta, por favor', de: 'Die Rechnung, bitte' },
  'the bill / check, please': { en: 'The check, please', es: 'La cuenta, por favor', fr: 'L\'addition, s\'il vous plaît', ru: 'Счёт, пожалуйста', pt: 'A conta, por favor', de: 'Die Rechnung, bitte' },
  'the check, please': { en: 'The check, please', es: 'La cuenta, por favor', fr: 'L\'addition, s\'il vous plaît', ru: 'Счёт, пожалуйста', pt: 'A conta, por favor', de: 'Die Rechnung, bitte' },
  'how much does this cost?': { en: 'How much does this cost?', es: '¿Cuánto cuesta esto?', fr: 'Combien ça coûte ?', ru: 'Сколько это стоит?', pt: 'Quanto custa isto?', de: 'Was kostet das?' },
  'how much does it cost': { en: 'How much does it cost?', es: '¿Cuánto cuesta?', fr: 'Combien ça coûte ?', ru: 'Сколько стоит?', pt: 'Quanto custa?', de: 'Was kostet das?' },
  'do you accept credit cards?': { en: 'Do you accept credit cards?', es: '¿Aceptan tarjetas de crédito?', fr: 'Acceptez-vous les cartes bancaires ?', ru: 'Вы принимаете банковские карты?', pt: 'Vocês aceitam cartão de crédito?', de: 'Nehmen Sie Kreditkarten?' },
  'i am just looking': { en: 'I am just looking', es: 'Solo estoy mirando', fr: 'Je regarde seulement', ru: 'Я просто смотрю', pt: 'Só estou olhando', de: 'Ich schaue nur' },
  'do you have this in another size?': { en: 'Do you have this in another size?', es: '¿Tiene esto en otra talla?', fr: 'Avez-vous ceci dans une autre taille ?', ru: 'У вас есть другой размер?', pt: 'Tem isto em outro tamanho?', de: 'Haben Sie das in einer anderen Größe?' },
  'it is too expensive': { en: 'It is too expensive', es: 'Es demasiado caro', fr: 'C\'est trop cher', ru: 'Это слишком дорого', pt: 'É muito caro', de: 'Das ist zu teuer' },
  'i need a doctor': { en: 'I need a doctor', es: 'Necesito un médico', fr: 'J\'ai besoin d\'un médecin', ru: 'Мне нужен врач', pt: 'Preciso de um médico', de: 'Ich brauche einen Arzt' },
  'call the police': { en: 'Call the police', es: 'Llame a la policía', fr: 'Appelez la police', ru: 'Вызовите полицию', pt: 'Chame a polícia', de: 'Rufen Sie die Polizei' },
  'i lost my passport': { en: 'I lost my passport', es: 'Perdí mi pasaporte', fr: 'J\'ai perdu mon passeport', ru: 'Я потерял(а) свой паспорт', pt: 'Perdi meu passaporte', de: 'Ich habe meinen Reisepass verloren' },

  // Time expressions
  'what time is it?': { en: 'What time is it?', es: '¿Qué hora es?', fr: 'Quelle heure est-il ?', ru: 'Который час?', pt: 'Que horas são?', de: 'Wie spät ist es?' },
  'what time is it now?': { en: 'What time is it now?', es: '¿Qué hora es ahora?', fr: 'Quelle heure est-il maintenant ?', ru: 'Сколько сейчас времени?', pt: 'Que horas são agora?', de: 'Wie viel Uhr ist es jetzt?' },
  'at what time?': { en: 'At what time?', es: '¿A qué hora?', fr: 'À quelle heure ?', ru: 'Во сколько?', pt: 'A que horas?', de: 'Um wie viel Uhr?' },
  'now': { en: 'Now', es: 'Ahora', fr: 'Maintenant', ru: 'Сейчас', pt: 'Agora', de: 'Jetzt' },
  'hour': { en: 'Hour', es: 'Hora', fr: 'Heure', ru: 'Час', pt: 'Hora', de: 'Stunde' },
  'minute': { en: 'Minute', es: 'Minuto', fr: 'Minute', ru: 'Минута', pt: 'Minuto', de: 'Minute' },
  'second': { en: 'Second', es: 'Segundo', fr: 'Seconde', ru: 'Секунда', pt: 'Segundo', de: 'Sekunde' },
  'one o\'clock': { en: 'One o\'clock (1:00)', es: 'Es la una (1:00)', fr: 'Il est une heure (1:00)', ru: 'Один час (1:00)', pt: 'É uma hora (1:00)', de: 'Es ist ein Uhr (1:00)' },
  'it is one o\'clock on the dot': { en: 'It is 1:00 sharp', es: 'Es la una en punto', fr: 'Il est une heure pile', ru: 'Ровно один час (1:00)', pt: 'É uma hora em ponto', de: 'Es ist Punkt ein Uhr' },
  'two o\'clock': { en: 'Two o\'clock (2:00)', es: 'Son las dos (2:00)', fr: 'Il est deux heures (2:00)', ru: 'Два часа (2:00)', pt: 'São duas horas (2:00)', de: 'Es ist zwei Uhr (2:00)' },
  'it is two o\'clock': { en: 'It is 2:00', es: 'Son las dos', fr: 'Il est deux heures', ru: 'Два часа (2:00)', pt: 'São duas horas', de: 'Es ist zwei Uhr' },
  'three o\'clock': { en: 'Three o\'clock (3:00)', es: 'Son las tres (3:00)', fr: 'Il est trois heures (3:00)', ru: 'Три часа (3:00)', pt: 'São três horas (3:00)', de: 'Es ist drei Uhr (3:00)' },
  'exactly three o\'clock': { en: 'Exactly three o\'clock (3:00)', es: 'Las tres en punto', fr: 'Trois heures pile', ru: 'Ровно три часа (3:00)', pt: 'Três horas em ponto', de: 'Punkt drei Uhr' },
  'four o\'clock': { en: 'Four o\'clock (4:00)', es: 'Son las cuatro (4:00)', fr: 'Il est quatre heures (4:00)', ru: 'Четыре часа (4:00)', pt: 'São quatro horas (4:00)', de: 'Es ist vier Uhr (4:00)' },
  'five o\'clock': { en: 'Five o\'clock (5:00)', es: 'Son las cinco (5:00)', fr: 'Il est cinq heures (5:00)', ru: 'Пять часов (5:00)', pt: 'São cinco horas (5:00)', de: 'Es ist fünf Uhr (5:00)' },
  'six o\'clock': { en: 'Six o\'clock (6:00)', es: 'Son las seis (6:00)', fr: 'Il est six heures (6:00)', ru: 'Шесть часов (6:00)', pt: 'São seis horas (6:00)', de: 'Es ist sechs Uhr (6:00)' },
  'seven o\'clock': { en: 'Seven o\'clock (7:00)', es: 'Son las siete (7:00)', fr: 'Il est sept heures (7:00)', ru: 'Семь часов (7:00)', pt: 'São sete horas (7:00)', de: 'Es ist sieben Uhr (7:00)' },
  'eight o\'clock': { en: 'Eight o\'clock (8:00)', es: 'Son las ocho (8:00)', fr: 'Il est huit heures (8:00)', ru: 'Восемь часов (8:00)', pt: 'São oito horas (8:00)', de: 'Es ist acht Uhr (8:00)' },
  'nine o\'clock': { en: 'Nine o\'clock (9:00)', es: 'Son las nueve (9:00)', fr: 'Il est neuf heures (9:00)', ru: 'Девять часов (9:00)', pt: 'São nove horas (9:00)', de: 'Es ist neun Uhr (9:00)' },
  'ten o\'clock': { en: 'Ten o\'clock (10:00)', es: 'Son las diez (10:00)', fr: 'Il est dix heures (10:00)', ru: 'Десять часов (10:00)', pt: 'São dez horas (10:00)', de: 'Es ist zehn Uhr (10:00)' },
  'eleven o\'clock': { en: 'Eleven o\'clock (11:00)', es: 'Son las once (11:00)', fr: 'Il est onze heures (11:00)', ru: 'Одиннадцать часов (11:00)', pt: 'São onze horas (11:00)', de: 'Es ist elf Uhr (11:00)' },
  'twelve o\'clock': { en: 'Twelve o\'clock (12:00)', es: 'Son las doce (12:00)', fr: 'Il est douze heures (12:00)', ru: 'Двенадцать часов (12:00)', pt: 'São doze horas (12:00)', de: 'Es ist zwölf Uhr (12:00)' },
  'half past two': { en: 'Half past two (2:30)', es: 'Las dos y media (2:30)', fr: 'Deux heures et demie (2:30)', ru: 'Половина третьего (2:30)', pt: 'Duas e meia (2:30)', de: 'Halb drei (2:30)' },
  'quarter to three': { en: 'Quarter to three (2:45)', es: 'Las tres menos cuarto (2:45)', fr: 'Trois heures moins le quart (2:45)', ru: 'Без четверти три (2:45)', pt: 'Quinze para as três (2:45)', de: 'Viertel vor drei (2:45)' },
  'it is 3:30 (half past three)': { en: '3:30 (half past three)', es: 'Son las tres y media', fr: 'Il est trois heures et demie', ru: 'Половина четвёртого (3:30)', pt: 'São três e meia', de: 'Es ist halb vier' },
  'it is 4:15 (quarter past four)': { en: '4:15 (quarter past four)', es: 'Son las cuatro y cuarto', fr: 'Il est quatre heures et quart', ru: 'Четверть пятого (4:15)', pt: 'São quatro e quinze', de: 'Es ist Viertel nach vier' },
  'it is 4:45 (quarter to five)': { en: '4:45 (quarter to five)', es: 'Son las cinco menos cuarto', fr: 'Il est cinq heures moins le quart', ru: 'Без четверти пять (4:45)', pt: 'São quinze para as cinco', de: 'Es ist Viertel vor fünf' },
  'son las cuatro y cuarto': { en: '4:15 (quarter past four)', es: 'Son las cuatro y cuarto', fr: 'Il est quatre heures et quart', ru: 'Четверть пятого (4:15)', pt: 'São quatro e quinze', de: 'Es ist Viertel nach vier' },
  'son las cinco menos cuarto': { en: '4:45 (quarter to five)', es: 'Son las cinco menos cuarto', fr: 'Il est cinq heures moins le quart', ru: 'Без четверти пять (4:45)', pt: 'São quinze para as cinco', de: 'Es ist Viertel vor fünf' },
  'il est quatre heures et quart': { en: '4:15 (quarter past four)', es: 'Son las cuatro y cuarto', fr: 'Il est quatre heures et quart', ru: 'Четверть пятого (4:15)', pt: 'São quatro e quinze', de: 'Es ist Viertel nach vier' },
  'il est cinq heures moins le quart': { en: '4:45 (quarter to five)', es: 'Son las cinco menos cuarto', fr: 'Il est cinq heures moins le quart', ru: 'Без четверти пять (4:45)', pt: 'São quinze para as cinco', de: 'Es ist Viertel vor fünf' },
  'half past twelve (12:30)': { en: 'Half past twelve (12:30)', es: 'Las doce y media (12:30)', fr: 'Midi et demi (12:30)', ru: 'Половина первого (12:30)', pt: 'Meio-dia e meia (12:30)', de: 'Halb eins (12:30)' },
  'ten to two (1:50)': { en: 'Ten to two (1:50)', es: 'Las dos menos diez (1:50)', fr: 'Deux heures moins dix (1:50)', ru: 'Без десяти два (1:50)', pt: 'Dez para as duas (1:50)', de: 'Zehn vor zwei (1:50)' },
  'half an hour': { en: 'Half an hour', es: 'Media hora', fr: 'Une demi-heure', ru: 'Полчаса', pt: 'Meia hora', de: 'Eine halbe Stunde' },
  'quarter of an hour': { en: 'Quarter of an hour', es: 'Un cuarto de hora', fr: 'Un quart d\'heure', ru: 'Четверть часа', pt: 'Um quarto de hora', de: 'Eine Viertelstunde' },
  'in the morning (a.m.)': { en: 'In the morning (a.m.)', es: 'De la mañana (a.m.)', fr: 'Du matin', ru: 'Утра (утром)', pt: 'Da manhã', de: 'Morgens' },
  'in the afternoon (p.m.)': { en: 'In the afternoon (p.m.)', es: 'De la tarde (p.m.)', fr: 'De l\'après-midi', ru: 'Дня (днём)', pt: 'Da tarde', de: 'Nachmittags' },
  'in the evening (p.m.)': { en: 'In the evening (p.m.)', es: 'De la noche / tarde (p.m.)', fr: 'Du soir', ru: 'Вечера (вечером)', pt: 'Da noite', de: 'Abends' },
  'at night': { en: 'At night', es: 'Por la noche', fr: 'La nuit', ru: 'Ночи (ночью)', pt: 'À noite', de: 'Nachts' },
  'noon / midday': { en: 'Noon / Midday', es: 'Mediodía', fr: 'Midi', ru: 'Полдень', pt: 'Meio-dia', de: 'Mittag' },
  'midnight': { en: 'Midnight', es: 'Medianoche', fr: 'Minuit', ru: 'Полночь', pt: 'Meia-noite', de: 'Mitternacht' },
  'on time': { en: 'On time', es: 'A tiempo / Puntual', fr: 'À l\'heure', ru: 'Вовремя', pt: 'No horário', de: 'Pünktlich' },
  'early': { en: 'Early', es: 'Temprano', fr: 'Tôt', ru: 'Рано', pt: 'Cedo', de: 'Früh' },
  'late': { en: 'Late', es: 'Tarde', fr: 'En retard / Tard', ru: 'Поздно', pt: 'Tarde / Atrasado', de: 'Spät' },

  // Spanish & French curriculum translation variants
  'hello! / hi!': { en: 'Hello! / Hi!', es: '¡Hola!', fr: 'Bonjour / Salut', ru: 'Привет! / Здравствуйте!', pt: 'Olá! / Oi!', de: 'Hallo!' },
  'hello / good morning': { en: 'Hello / Good morning', es: 'Hola / Buenos días', fr: 'Bonjour', ru: 'Здравствуйте / Доброе утро', pt: 'Olá / Bom dia', de: 'Hallo / Guten Morgen' },
  'good evening / good night': { en: 'Good evening / Good night', es: 'Buenas noches', fr: 'Bonsoir / Bonne nuit', ru: 'Добрый вечер / Спокойной ночи', pt: 'Boa noite', de: 'Guten Abend / Gute Nacht' },
  'hi / bye (informal)': { en: 'Hi / Bye', es: 'Hola / Chao', fr: 'Salut', ru: 'Привет / Пока', pt: 'Oi / Tchau', de: 'Hallo / Tschüss' },
  'how are you? (informal)': { en: 'How are you?', es: '¿Cómo estás?', fr: 'Comment vas-tu ? / Ça va ?', ru: 'Как дела?', pt: 'Tudo bem?', de: 'Wie geht es dir?' },
  'how are you? (formal)': { en: 'How are you? (formal)', es: '¿Cómo está usted?', fr: 'Comment allez-vous ?', ru: 'Как ваши дела?', pt: 'Como vai você?', de: 'Wie geht es Ihnen?' },
  'how are you? / doing okay? (informal)': { en: 'How are you?', es: '¿Cómo estás? / ¿Qué tal?', fr: 'Ça va ?', ru: 'Как дела?', pt: 'Tudo bem?', de: 'Wie geht es dir?' },
  'i am doing well, thank you': { en: 'I am doing well, thank you', es: 'Estoy bien, gracias', fr: 'Ça va bien, merci', ru: 'Всё хорошо, спасибо', pt: 'Estou bem, obrigado', de: 'Mir geht es gut, danke' },
  'and you? (formal)': { en: 'And you?', es: '¿Y usted?', fr: 'Et vous ?', ru: 'А вы?', pt: 'E você?', de: 'Und Ihnen?' },
  'please (formal)': { en: 'Please', es: 'Por favor', fr: 'S\'il vous plaît', ru: 'Пожалуйста', pt: 'Por favor', de: 'Bitte' },
  'what is your name? (formal)': { en: 'What is your name?', es: '¿Cómo se llama usted?', fr: 'Comment vous appelez-vous ?', ru: 'Как вас зовут?', pt: 'Qual é o seu nome?', de: 'Wie heißen Sie?' },
  'pleased to meet you': { en: 'Pleased to meet you', es: 'Mucho gusto / Encantado', fr: 'Enchanté(e)', ru: 'Очень приятно', pt: 'Muito prazer', de: 'Freut mich' },
  'where are the restrooms?': { en: 'Where are the restrooms?', es: '¿Dónde está el baño?', fr: 'Où sont les toilettes ?', ru: 'Где находится туалет?', pt: 'Onde fica o banheiro?', de: 'Wo ist die Toilette?' },
  'can you repeat?': { en: 'Can you repeat?', es: '¿Puede repetir?', fr: 'Pouvez-vous répéter ?', ru: 'Повторите, пожалуйста', pt: 'Pode repetir?', de: 'Können Sie wiederholen?' },
  'see you soon': { en: 'See you soon', es: 'Hasta pronto / Hasta luego', fr: 'À bientôt', ru: 'До скорого', pt: 'Até breve', de: 'Bis bald' },
  'time / weather': { en: 'Time / Weather', es: 'Tiempo', fr: 'Temps', ru: 'Время / Погода', pt: 'Tempo', de: 'Zeit / Wetter' },
  'tomorrow / morning': { en: 'Tomorrow / Morning', es: 'Mañana', fr: 'Demain / Matin', ru: 'Завтра / Утро', pt: 'Amanhã / Manhã', de: 'Morgen' },
  'office / desk': { en: 'Office / Desk', es: 'Oficina / Escritorio', fr: 'Bureau', ru: 'Офис / Стол', pt: 'Escritório', de: 'Büro' },
  'money / silver': { en: 'Money', es: 'Dinero', fr: 'Argent', ru: 'Деньги', pt: 'Dinheiro', de: 'Geld' },
  'train station': { en: 'Train station', es: 'Estación de tren', fr: 'Gare', ru: 'Вокзал / Станция', pt: 'Estação de trem', de: 'Bahnhof' },
  'boy / child': { en: 'Boy / Child', es: 'Niño', fr: 'Garçon / Enfant', ru: 'Мальчик / Ребёнок', pt: 'Menino / Criança', de: 'Junge / Kind' },
  'one hundred': { en: 'One hundred', es: 'Cien', fr: 'Cent', ru: 'Сто', pt: 'Cem', de: 'Hundert' },
  'one thousand': { en: 'One thousand', es: 'Mil', fr: 'Mille', ru: 'Тысяча', pt: 'Mil', de: 'Tausend' },
  'is it far from here?': { en: 'Is it far from here?', es: '¿Está lejos de aquí?', fr: 'Est-ce loin d\'ici ?', ru: 'Это далеко отсюда?', pt: 'É longe daqui?', de: 'Ist es weit von hier?' },
  'could you speak slower, please?': { en: 'Could you speak slower, please?', es: 'Hable más despacio, por favor', fr: 'Parlez plus lentement, s\'il vous plaît', ru: 'Говорите медленнее, пожалуйста', pt: 'Fale mais devagar, por favor', de: 'Bitte sprechen Sie langsamer' },

  // Colors & Descriptions Pack
  'red': { en: 'Red', es: 'Rojo', fr: 'Rouge', ru: 'Красный', pt: 'Vermelho', de: 'Rot' },
  'blue': { en: 'Blue', es: 'Azul', fr: 'Bleu', ru: 'Синий', pt: 'Azul', de: 'Blau' },
  'green': { en: 'Green', es: 'Verde', fr: 'Vert', ru: 'Зелёный', pt: 'Verde', de: 'Grün' },
  'black': { en: 'Black', es: 'Negro', fr: 'Noir', ru: 'Чёрный', pt: 'Preto', de: 'Schwarz' },
  'white': { en: 'White', es: 'Blanco', fr: 'Blanc', ru: 'Белый', pt: 'Branco', de: 'Weiß' },

  // Weather & Seasons Pack
  'wind': { en: 'Wind', es: 'Viento', fr: 'Vent', ru: 'Ветер', pt: 'Vento', de: 'Wind' },
  'cloud': { en: 'Cloud', es: 'Nube', fr: 'Nuage', ru: 'Облако', pt: 'Nuvem', de: 'Wolke' },
  'storm': { en: 'Storm', es: 'Tormenta', fr: 'Orage', ru: 'Гроза', pt: 'Tempestade', de: 'Sturm' },

  // Tech & Remote Work Pack
  'internet': { en: 'Internet', es: 'Internet', fr: 'Internet', ru: 'Интернет', pt: 'Internet', de: 'Internet' },
  'password': { en: 'Password', es: 'Contraseña', fr: 'Mot de passe', ru: 'Пароль', pt: 'Senha', de: 'Passwort' },
  'email': { en: 'Email', es: 'Correo electrónico', fr: 'Courriel', ru: 'Электронная почта', pt: 'E-mail', de: 'E-Mail' },
  'screen': { en: 'Screen', es: 'Pantalla', fr: 'Écran', ru: 'Экран', pt: 'Tela', de: 'Bildschirm' },
  'meeting': { en: 'Meeting', es: 'Reunión', fr: 'Réunion', ru: 'Встреча', pt: 'Reunião', de: 'Besprechung' },
  'file': { en: 'File', es: 'Archivo', fr: 'Fichier', ru: 'Файл', pt: 'Arquivo', de: 'Datei' },
  'link': { en: 'Link', es: 'Enlace', fr: 'Lien', ru: 'Ссылка', pt: 'Link', de: 'Link' },
  'code': { en: 'Code', es: 'Código', fr: 'Code', ru: 'Код', pt: 'Código', de: 'Code' },
  'error': { en: 'Error', es: 'Error', fr: 'Erreur', ru: 'Ошибка', pt: 'Erro', de: 'Fehler' },
  'battery': { en: 'Battery', es: 'Batería', fr: 'Batterie', ru: 'Батарея', pt: 'Bateria', de: 'Batterie' },
  'can you hear me?': { en: 'Can you hear me?', es: '¿Me escucha?', fr: 'Vous m\'entendez ?', ru: 'Вы меня слышите?', pt: 'Você me ouve?', de: 'Können Sie mich hören?' },
  'can you see my screen?': { en: 'Can you see my screen?', es: '¿Puede ver mi pantalla?', fr: 'Voyez-vous mon écran ?', ru: 'Видно мой экран?', pt: 'Você vê minha tela?', de: 'Können Sie meinen Bildschirm sehen?' },
  'what is the wi-fi password?': { en: 'What is the Wi-Fi password?', es: '¿Cuál es la contraseña del wifi?', fr: 'Quel est le mot de passe du Wi-Fi ?', ru: 'Какой пароль от вайфая?', pt: 'Qual é a senha do Wi-Fi?', de: 'Wie lautet das WLAN-Passwort?' },

  // Business & Office Pack
  'project': { en: 'Project', es: 'Proyecto', fr: 'Projet', ru: 'Проект', pt: 'Projeto', de: 'Projekt' },
  'client': { en: 'Client', es: 'Cliente', fr: 'Client', ru: 'Клиент', pt: 'Cliente', de: 'Kunde' },
  'team': { en: 'Team', es: 'Equipo', fr: 'Équipe', ru: 'Команда', pt: 'Equipe', de: 'Team' },
  'manager': { en: 'Manager', es: 'Gerente', fr: 'Directeur', ru: 'Руководитель', pt: 'Gerente', de: 'Manager' },
  'company': { en: 'Company', es: 'Empresa', fr: 'Entreprise', ru: 'Компания', pt: 'Empresa', de: 'Firma' },
  'contract': { en: 'Contract', es: 'Contrato', fr: 'Contrat', ru: 'Контракт', pt: 'Contrato', de: 'Vertrag' },
  'schedule': { en: 'Schedule', es: 'Horario', fr: 'Horaire', ru: 'Расписание', pt: 'Horário', de: 'Zeitplan' },
  'deadline': { en: 'Deadline', es: 'Fecha límite', fr: 'Date limite', ru: 'Срок', pt: 'Prazo', de: 'Frist' },
  'invoice': { en: 'Invoice', es: 'Factura', fr: 'Facture', ru: 'Счёт', pt: 'Fatura', de: 'Rechnung' },
  'salary': { en: 'Salary', es: 'Salario', fr: 'Salaire', ru: 'Зарплата', pt: 'Salário', de: 'Gehalt' },
  'let\'s schedule a meeting': { en: 'Let\'s schedule a meeting', es: 'Programemos una reunión', fr: 'Planifions une réunion', ru: 'Давайте назначим встречу', pt: 'Vamos agendar uma reunião', de: 'Planen wir ein Meeting' },
  'i will send you an email': { en: 'I will send you an email', es: 'Le enviaré un correo', fr: 'Je vous enverrai un courriel', ru: 'Я отправлю вам письмо', pt: 'Vou te enviar um e-mail', de: 'Ich schicke Ihnen eine E-Mail' },
  'when is the deadline?': { en: 'When is the deadline?', es: '¿Cuándo es la fecha límite?', fr: 'Quelle est la date limite ?', ru: 'Какой крайний срок?', pt: 'Qual é o prazo?', de: 'Wann ist die Frist?' },

  // Healthcare & Pharmacy Pack
  'medicine': { en: 'Medicine', es: 'Medicina', fr: 'Médicament', ru: 'Лекарство', pt: 'Remédio', de: 'Medikament' },
  'pain': { en: 'Pain', es: 'Dolor', fr: 'Douleur', ru: 'Боль', pt: 'Dor', de: 'Schmerz' },
  'fever': { en: 'Fever', es: 'Fiebre', fr: 'Fièvre', ru: 'Температура', pt: 'Febre', de: 'Fieber' },
  'allergy': { en: 'Allergy', es: 'Alergia', fr: 'Allergie', ru: 'Аллергия', pt: 'Alergia', de: 'Allergie' },
  'headache': { en: 'Headache', es: 'Dolor de cabeza', fr: 'Mal de tête', ru: 'Головная боль', pt: 'Dor de cabeça', de: 'Kopfschmerzen' },
  'emergency': { en: 'Emergency', es: 'Emergencia', fr: 'Urgence', ru: 'Скорая помощь', pt: 'Emergência', de: 'Notfall' },
  'prescription': { en: 'Prescription', es: 'Receta médica', fr: 'Ordonnance', ru: 'Рецепт', pt: 'Receita médica', de: 'Rezept' },
  'bandage': { en: 'Bandage', es: 'Venda', fr: 'Pansement', ru: 'Бинт', pt: 'Curativo', de: 'Verband' },
  'health': { en: 'Health', es: 'Salud', fr: 'Santé', ru: 'Здоровье', pt: 'Saúde', de: 'Gesundheit' },
  'where is the nearest pharmacy?': { en: 'Where is the nearest pharmacy?', es: '¿Dónde está la farmacia más cercana?', fr: 'Où est la pharmacie la plus proche ?', ru: 'Где ближайшая аптека?', pt: 'Onde fica a farmácia mais próxima?', de: 'Wo ist die nächste Apotheke?' },
  'i am allergic to nuts': { en: 'I am allergic to nuts', es: 'Soy alérgico a las nueces', fr: 'Je suis allergique aux noix', ru: 'У меня аллергия на орехи', pt: 'Tenho alergia a nozes', de: 'Ich bin allergisch gegen Nüsse' },

  // Hotel, Airport & Travel Pack
  'flight': { en: 'Flight', es: 'Vuelo', fr: 'Vol', ru: 'Рейс', pt: 'Voo', de: 'Flug' },
  'luggage': { en: 'Luggage', es: 'Equipaje', fr: 'Bagage', ru: 'Багаж', pt: 'Bagagem', de: 'Gepäck' },
  'reservation': { en: 'Reservation', es: 'Reserva', fr: 'Réservation', ru: 'Бронь', pt: 'Reserva', de: 'Reservierung' },
  'room': { en: 'Room', es: 'Habitación', fr: 'Chambre', ru: 'Номер', pt: 'Quarto', de: 'Zimmer' },
  'gate': { en: 'Gate', es: 'Puerta de embarque', fr: 'Porte d\'embarquement', ru: 'Выход на посадку', pt: 'Portão de embarque', de: 'Gate' },
  'exit': { en: 'Exit', es: 'Salida', fr: 'Sortie', ru: 'Выход', pt: 'Saída', de: 'Ausgang' },
  'customs': { en: 'Customs', es: 'Aduana', fr: 'Douane', ru: 'Таможня', pt: 'Alfândega', de: 'Zoll' },
  'i have a reservation': { en: 'I have a reservation', es: 'Tengo una reserva', fr: 'J\'ai une réservation', ru: 'У меня есть бронь', pt: 'Tenho uma reserva', de: 'Ich habe eine Reservierung' },

  // Shopping & Money Pack
  'credit card': { en: 'Credit card', es: 'Tarjeta de crédito', fr: 'Carte bancaire', ru: 'Банковская карта', pt: 'Cartão de crédito', de: 'Kreditkarte' },
  'cash': { en: 'Cash', es: 'Efectivo', fr: 'Espèces', ru: 'Наличные', pt: 'Dinheiro vivo', de: 'Bargeld' },
  'price': { en: 'Price', es: 'Precio', fr: 'Prix', ru: 'Цена', pt: 'Preço', de: 'Preis' },
  'cheap': { en: 'Cheap', es: 'Barato', fr: 'Pas cher', ru: 'Дешёвый', pt: 'Barato', de: 'Billig' },
  'expensive': { en: 'Expensive', es: 'Caro', fr: 'Cher', ru: 'Дорогой', pt: 'Caro', de: 'Teuer' },
  'discount': { en: 'Discount', es: 'Descuento', fr: 'Réduction', ru: 'Скидка', pt: 'Desconto', de: 'Rabatt' },
  'where is the bus stop?': { en: 'Where is the bus stop?', es: '¿Dónde está la parada de autobús?', fr: 'Où est l\'arrêt de bus ?', ru: 'Где автобусная остановка?', pt: 'Onde fica o ponto de ônibus?', de: 'Wo ist die Bushaltestelle?' },
  'how do i get to the airport?': { en: 'How do I get to the airport?', es: '¿Cómo llego al aeropuerto?', fr: 'Comment aller à l\'aéroport ?', ru: 'Как добраться до аэропорта?', pt: 'Como chego ao aeroporto?', de: 'Wie komme ich zum Flughafen?' },
  'i would like a coffee, please': { en: 'I would like a coffee, please', es: 'Quisiera un café, por favor', fr: 'Je voudrais un café, s\'il vous plaît', ru: 'Я бы хотел кофе, пожалуйста', pt: 'Eu gostaria de um café, por favor', de: 'Ich hätte gern einen Kaffee, bitte' },
  'a bottle of water, please': { en: 'A bottle of water, please', es: 'Una botella de agua, por favor', fr: 'Une bouteille d\'eau, s\'il vous plaît', ru: 'Бутылку воды, пожалуйста', pt: 'Uma garrafa de água, por favor', de: 'Eine Flasche Wasser, bitte' }
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
    /\b(o'clock|half\s+past|quarter|en\s+punto|y\s+media|y\s+cuarto|menos\s+cuarto|menos\s+diez|heure|heures|demie|quart|час|часа|часов|половина|четверть|ровно|em\s+ponto|e\s+meia|para\s+as|horas|punkt|uhr|halb|viertel)\b/i.test(text)
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
    /\b(o'clock|half\s+past|quarter|en\s+punto|y\s+media|y\s+cuarto|menos\s+cuarto|menos\s+diez|heure|heures|demie|quart|час|часа|часов|половина|четверть|ровно|em\s+ponto|e\s+meia|para\s+as|horas|punkt|uhr|halb|viertel)\b/i.test(`${rawEnglish} ${primaryText}`);

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
  if (directTarget) {
    for (const mapping of Object.values(EXTENDED_DICTIONARY)) {
      if (
        (mapping.ru && mapping.ru.toLowerCase() === directTarget) ||
        (mapping.es && mapping.es.toLowerCase() === directTarget) ||
        (mapping.fr && mapping.fr.toLowerCase() === directTarget) ||
        (mapping.pt && mapping.pt.toLowerCase() === directTarget) ||
        (mapping.de && mapping.de.toLowerCase() === directTarget)
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
  en: { en: 'English', es: 'Spanish', fr: 'French', ru: 'Russian', pt: 'Portuguese', de: 'German' },
  es: { en: 'inglés', es: 'español', fr: 'francés', ru: 'ruso', pt: 'portugués', de: 'alemán' },
  fr: { en: 'anglais', es: 'espagnol', fr: 'français', ru: 'russe', pt: 'portugais', de: 'allemand' },
  ru: { en: 'английском', es: 'испанском', fr: 'французском', ru: 'русском', pt: 'португальском', de: 'немецком' },
  pt: { en: 'inglês', es: 'espanhol', fr: 'francês', ru: 'russo', pt: 'português', de: 'alemão' },
  de: { en: 'Englisch', es: 'Spanisch', fr: 'Französisch', ru: 'Russisch', pt: 'Portugiesisch', de: 'Deutsch' }
};

/**
 * Localized hint for alphabet quiz cards
 */
export const getAlphabetQuizHint = (
  character: string,
  targetLang: SupportedLanguageId,
  baseLang: SupportedLanguageId,
  metaName: string
): string => {
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
      case 'en':
      default:
        return `What sound does the Cyrillic letter "${character}" make?`;
    }
  }

  switch (baseLang) {
    case 'ru':
      return `Введите букву «${character}» или послушайте её звучание:`;
    case 'es':
      return `Escribe la letra «${character}» o escucha su sonido en ${metaName}:`;
    case 'fr':
      return `Tapez la lettre « ${character} » ou écoutez son son en ${metaName} :`;
    case 'pt':
      return `Digite a letra «${character}» ou ouça o som em ${metaName}:`;
    case 'de':
      return `Tippe den Buchstaben „${character}“ oder höre dir den Klang auf ${metaName} an:`;
    case 'en':
    default:
      return `Type the letter "${character}" or listen to its sound in ${metaName}:`;
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
      case 'en':
      default:
        return `How do you say "${promptWord}" in ${targetNameInBase}?`;
    }
  }
};
