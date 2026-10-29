import { SupportedLanguageId } from '../data/languages/types';
import { PhraseItem } from '../types/index';
import { CONCEPT_MATRIX } from '../data/conceptMatrix';

export interface NumberMapping {
  digit: number;
  en: string;
  es: string;
  fr: string;
  ru: string;
  allWords: string[];
}

export const NUMBER_TABLE: Record<number, NumberMapping> = {
  0: { digit: 0, en: 'Zero', es: 'Cero', fr: 'Zéro', ru: 'Ноль', allWords: ['zero', 'cero', 'zéro', 'ноль', 'нуль', '0'] },
  1: { digit: 1, en: 'One', es: 'Uno', fr: 'Un', ru: 'Один', allWords: ['one', 'uno', 'una', 'un', 'une', 'один', 'одна', 'одно', '1'] },
  2: { digit: 2, en: 'Two', es: 'Dos', fr: 'Deux', ru: 'Два', allWords: ['two', 'dos', 'deux', 'два', 'две', '2'] },
  3: { digit: 3, en: 'Three', es: 'Tres', fr: 'Trois', ru: 'Три', allWords: ['three', 'tres', 'trois', 'три', '3'] },
  4: { digit: 4, en: 'Four', es: 'Cuatro', fr: 'Quatre', ru: 'Четыре', allWords: ['four', 'cuatro', 'quatre', 'четыре', '4'] },
  5: { digit: 5, en: 'Five', es: 'Cinco', fr: 'Cinq', ru: 'Пять', allWords: ['five', 'cinco', 'cinq', 'пять', '5'] },
  6: { digit: 6, en: 'Six', es: 'Seis', fr: 'Six', ru: 'Шесть', allWords: ['six', 'seis', 'шесть', '6'] },
  7: { digit: 7, en: 'Seven', es: 'Siete', fr: 'Sept', ru: 'Семь', allWords: ['seven', 'siete', 'sept', 'семь', '7'] },
  8: { digit: 8, en: 'Eight', es: 'Ocho', fr: 'Huit', ru: 'Восемь', allWords: ['eight', 'ocho', 'huit', 'восемь', '8'] },
  9: { digit: 9, en: 'Nine', es: 'Nueve', fr: 'Neuf', ru: 'Девять', allWords: ['nine', 'nueve', 'neuf', 'девять', '9'] },
  10: { digit: 10, en: 'Ten', es: 'Diez', fr: 'Dix', ru: 'Десять', allWords: ['ten', 'diez', 'dix', 'десять', '10'] },
  11: { digit: 11, en: 'Eleven', es: 'Once', fr: 'Onze', ru: 'Одиннадцать', allWords: ['eleven', 'once', 'onze', 'одиннадцать', '11'] },
  12: { digit: 12, en: 'Twelve', es: 'Doce', fr: 'Douze', ru: 'Двенадцать', allWords: ['twelve', 'doce', 'douze', 'двенадцать', '12'] },
  13: { digit: 13, en: 'Thirteen', es: 'Trece', fr: 'Treize', ru: 'Тринадцать', allWords: ['thirteen', 'trece', 'treize', 'тринадцать', '13'] },
  14: { digit: 14, en: 'Fourteen', es: 'Catorce', fr: 'Quatorze', ru: 'Четырнадцать', allWords: ['fourteen', 'catorce', 'quatorze', 'четырнадцать', '14'] },
  15: { digit: 15, en: 'Fifteen', es: 'Quince', fr: 'Quinze', ru: 'Пятнадцать', allWords: ['fifteen', 'quince', 'quinze', 'пятнадцать', '15'] },
  16: { digit: 16, en: 'Sixteen', es: 'Dieciséis', fr: 'Seize', ru: 'Шестнадцать', allWords: ['sixteen', 'dieciséis', 'dieciseis', 'seize', 'шестнадцать', '16'] },
  17: { digit: 17, en: 'Seventeen', es: 'Diecisiete', fr: 'Dix-sept', ru: 'Семнадцать', allWords: ['seventeen', 'diecisiete', 'dix-sept', 'семнадцать', '17'] },
  18: { digit: 18, en: 'Eighteen', es: 'Dieciocho', fr: 'Dix-huit', ru: 'Восемнадцать', allWords: ['eighteen', 'dieciocho', 'dix-huit', 'восемнадцать', '18'] },
  19: { digit: 19, en: 'Nineteen', es: 'Diecinueve', fr: 'Dix-neuf', ru: 'Девятнадцать', allWords: ['nineteen', 'diecinueve', 'dix-neuf', 'девятнадцать', '19'] },
  20: { digit: 20, en: 'Twenty', es: 'Veinte', fr: 'Vingt', ru: 'Двадцать', allWords: ['twenty', 'veinte', 'vingt', 'двадцать', '20'] },
  30: { digit: 30, en: 'Thirty', es: 'Treinta', fr: 'Trente', ru: 'Тридцать', allWords: ['thirty', 'treinta', 'trente', 'тридцать', '30'] },
  40: { digit: 40, en: 'Forty', es: 'Cuarenta', fr: 'Quarante', ru: 'Сорок', allWords: ['forty', 'cuarenta', 'quarante', 'сорок', '40'] },
  50: { digit: 50, en: 'Fifty', es: 'Cincuenta', fr: 'Cinquante', ru: 'Пятьдесят', allWords: ['fifty', 'cincuenta', 'cinquante', 'пятьдесят', '50'] },
  60: { digit: 60, en: 'Sixty', es: 'Sesenta', fr: 'Soixante', ru: 'Шестьдесят', allWords: ['sixty', 'sesenta', 'soixante', 'шестьдесят', '60'] },
  70: { digit: 70, en: 'Seventy', es: 'Setenta', fr: 'Soixante-dix', ru: 'Семьдесят', allWords: ['seventy', 'setenta', 'soixante-dix', 'семьдесят', '70'] },
  80: { digit: 80, en: 'Eighty', es: 'Ochenta', fr: 'Quatre-vingts', ru: 'Восемьдесят', allWords: ['eighty', 'ochenta', 'quatre-vingts', 'quatre-vingt', 'восемьдесят', '80'] },
  90: { digit: 90, en: 'Ninety', es: 'Noventa', fr: 'Quatre-vingt-dix', ru: 'Девяносто', allWords: ['ninety', 'noventa', 'quatre-vingt-dix', 'девяносто', '90'] },
  100: { digit: 100, en: 'One hundred', es: 'Cien', fr: 'Cent', ru: 'Сто', allWords: ['hundred', 'one hundred', 'a hundred', 'cien', 'ciento', 'cent', 'сто', '100'] },
  1000: { digit: 1000, en: 'One thousand', es: 'Mil', fr: 'Mille', ru: 'Тысяча', allWords: ['thousand', 'one thousand', 'a thousand', 'mil', 'mille', 'тысяча', '1000'] }
};

export const EXTENDED_DICTIONARY: Record<string, Record<SupportedLanguageId, string>> = {
  // People & Family
  'man': { en: 'Man', es: 'Hombre', fr: 'Homme', ru: 'Мужчина' },
  'woman': { en: 'Woman', es: 'Mujer', fr: 'Femme', ru: 'Женщина' },
  'child': { en: 'Child', es: 'Niño / Niña', fr: 'Enfant', ru: 'Ребёнок' },
  'boy': { en: 'Boy', es: 'Niño / Chico', fr: 'Garçon', ru: 'Мальчик' },
  'girl': { en: 'Girl', es: 'Niña / Chica', fr: 'Fille', ru: 'Девочка' },
  'friend': { en: 'Friend', es: 'Amigo', fr: 'Ami', ru: 'Друг' },
  'family': { en: 'Family', es: 'Familia', fr: 'Famille', ru: 'Семья' },
  'father': { en: 'Father', es: 'Padre', fr: 'Père', ru: 'Отец' },
  'father / dad': { en: 'Father / Dad', es: 'Padre / Papá', fr: 'Père / Papa', ru: 'Папа / Отец' },
  'mother': { en: 'Mother', es: 'Madre', fr: 'Mère', ru: 'Мать' },
  'mother / mom': { en: 'Mother / Mom', es: 'Madre / Mamá', fr: 'Mère / Maman', ru: 'Мама / Мать' },
  'mom': { en: 'Mom', es: 'Mamá', fr: 'Maman', ru: 'Мама' },
  'husband': { en: 'Husband', es: 'Esposo / Marido', fr: 'Mari', ru: 'Муж' },
  'wife': { en: 'Wife', es: 'Esposa / Mujer', fr: 'Femme / Épouse', ru: 'Жена' },
  'teacher': { en: 'Teacher', es: 'Profesor / Maestro', fr: 'Enseignant', ru: 'Учитель' },
  'student': { en: 'Student', es: 'Estudiante / Alumno', fr: 'Étudiant', ru: 'Студент' },
  'doctor': { en: 'Doctor', es: 'Médico / Doctor', fr: 'Médecin / Docteur', ru: 'Врач / Доктор' },
  'we': { en: 'We', es: 'Nosotros', fr: 'Nous', ru: 'Мы' },

  // Food & Drink
  'water': { en: 'Water', es: 'Agua', fr: 'Eau', ru: 'Вода' },
  'bread': { en: 'Bread', es: 'Pan', fr: 'Pain', ru: 'Хлеб' },
  'food': { en: 'Food / Meal', es: 'Comida', fr: 'Nourriture', ru: 'Еда' },
  'milk': { en: 'Milk', es: 'Leche', fr: 'Lait', ru: 'Молоко' },
  'meat': { en: 'Meat', es: 'Carne', fr: 'Viande', ru: 'Мясо' },
  'fish': { en: 'Fish', es: 'Pescado', fr: 'Poisson', ru: 'Рыба' },
  'vegetables': { en: 'Vegetables', es: 'Verduras', fr: 'Légumes', ru: 'Овощи' },
  'fruits': { en: 'Fruits', es: 'Frutas', fr: 'Fruits', ru: 'Фрукты' },
  'fruit': { en: 'Fruit', es: 'Fruta', fr: 'Fruit', ru: 'Фрукт / Фрукты' },
  'rice': { en: 'Rice', es: 'Arroz', fr: 'Riz', ru: 'Рис' },
  'coffee': { en: 'Coffee', es: 'Café', fr: 'Café', ru: 'Кофе' },
  'tea': { en: 'Tea', es: 'Té', fr: 'Thé', ru: 'Чай' },
  'beer': { en: 'Beer', es: 'Cerveza', fr: 'Bière', ru: 'Пиво' },
  'wine': { en: 'Wine', es: 'Vino', fr: 'Vin', ru: 'Вино' },
  'breakfast': { en: 'Breakfast', es: 'Desayuno', fr: 'Petit-déjeuner', ru: 'Завтрак' },
  'lunch': { en: 'Lunch', es: 'Almuerzo', fr: 'Déjeuner', ru: 'Обед' },
  'dinner': { en: 'Dinner', es: 'Cena', fr: 'Dîner', ru: 'Ужин' },

  // Places & Travel
  'store': { en: 'Store / Shop', es: 'Tienda', fr: 'Magasin', ru: 'Магазин' },
  'shop': { en: 'Store / Shop', es: 'Tienda', fr: 'Magasin', ru: 'Магазин' },
  'restaurant': { en: 'Restaurant', es: 'Restaurante', fr: 'Restaurant', ru: 'Ресторан' },
  'hotel': { en: 'Hotel', es: 'Hotel', fr: 'Hôtel', ru: 'Гостиница / Отель' },
  'station': { en: 'Station', es: 'Estación', fr: 'Gare / Station', ru: 'Станция / Вокзал' },
  'airport': { en: 'Airport', es: 'Aeropuerto', fr: 'Aéroport', ru: 'Аэропорт' },
  'street': { en: 'Street', es: 'Calle', fr: 'Rue', ru: 'Улица' },
  'square': { en: 'Square (plaza)', es: 'Plaza', fr: 'Place', ru: 'Площадь' },
  'square (plaza)': { en: 'Square (plaza)', es: 'Plaza', fr: 'Place', ru: 'Площадь' },
  'park': { en: 'Park', es: 'Parque', fr: 'Parc', ru: 'Парк' },
  'hospital': { en: 'Hospital', es: 'Hospital', fr: 'Hôpital', ru: 'Больница' },
  'pharmacy': { en: 'Pharmacy', es: 'Farmacia', fr: 'Pharmacie', ru: 'Аптека' },
  'bank': { en: 'Bank', es: 'Banco', fr: 'Banque', ru: 'Банк' },
  'post office': { en: 'Post office', es: 'Oficina de correos', fr: 'Bureau de poste', ru: 'Почта' },
  'supermarket': { en: 'Supermarket', es: 'Supermercado', fr: 'Supermarché', ru: 'Супермаркет' },
  'police': { en: 'Police', es: 'Policía', fr: 'Police', ru: 'Полиция' },
  'museum': { en: 'Museum', es: 'Museo', fr: 'Musée', ru: 'Музей' },
  'theater': { en: 'Theater', es: 'Teatro', fr: 'Théâtre', ru: 'Театр' },
  'cinema': { en: 'Cinema', es: 'Cine', fr: 'Cinéma', ru: 'Кино / Кинотеатр' },
  'city': { en: 'City', es: 'Ciudad', fr: 'Ville', ru: 'Город' },
  'country': { en: 'Country', es: 'País', fr: 'Pays', ru: 'Страна' },
  'house': { en: 'House / Home', es: 'Casa', fr: 'Maison', ru: 'Дом' },
  'home': { en: 'Home / House', es: 'Casa', fr: 'Maison', ru: 'Дом' },
  'car': { en: 'Car', es: 'Carro / Coche', fr: 'Voiture', ru: 'Машина' },
  'train': { en: 'Train', es: 'Tren', fr: 'Train', ru: 'Поезд' },
  'bus': { en: 'Bus', es: 'Autobús', fr: 'Bus', ru: 'Автобус' },
  'airplane': { en: 'Airplane', es: 'Avión', fr: 'Avion', ru: 'Самолёт' },
  'taxi': { en: 'Taxi', es: 'Taxi', fr: 'Taxi', ru: 'Такси' },
  'subway / metro': { en: 'Subway / Metro', es: 'Metro', fr: 'Métro', ru: 'Метро' },
  'map': { en: 'Map', es: 'Mapa', fr: 'Carte / Plan', ru: 'Карта' },
  'visa': { en: 'Visa', es: 'Visa / Visado', fr: 'Visa', ru: 'Виза' },
  'center': { en: 'Center', es: 'Centro', fr: 'Centre', ru: 'Центр' },
  'factory': { en: 'Factory', es: 'Fábrica', fr: 'Usine', ru: 'Завод' },

  // Everyday Essentials & Objects
  'money': { en: 'Money', es: 'Dinero', fr: 'Argent', ru: 'Деньги' },
  'ticket': { en: 'Ticket', es: 'Boleto / Billete', fr: 'Billet', ru: 'Билет' },
  'passport': { en: 'Passport', es: 'Pasaporte', fr: 'Passeport', ru: 'Паспорт' },
  'phone': { en: 'Phone', es: 'Teléfono', fr: 'Téléphone', ru: 'Телефон' },
  'telephone': { en: 'Telephone', es: 'Teléfono', fr: 'Téléphone', ru: 'Телефон' },
  'computer': { en: 'Computer', es: 'Computadora', fr: 'Ordinateur', ru: 'Компьютер' },
  'book': { en: 'Book', es: 'Libro', fr: 'Livre', ru: 'Книга' },
  'magazine': { en: 'Magazine', es: 'Revista', fr: 'Magazine', ru: 'Журнал' },
  'help': { en: 'Help', es: 'Ayuda', fr: 'Aide', ru: 'Помощь' },
  'time': { en: 'Time', es: 'Tiempo / Hora', fr: 'Temps / Heure', ru: 'Время' },
  'work': { en: 'Work / Job', es: 'Trabajo', fr: 'Travail', ru: 'Работа' },
  'office': { en: 'Office', es: 'Oficina', fr: 'Bureau', ru: 'Офис' },
  'card': { en: 'Card', es: 'Tarjeta', fr: 'Carte', ru: 'Карта / Карточка' },
  'table': { en: 'Table', es: 'Mesa', fr: 'Table', ru: 'Стол' },
  'chair': { en: 'Chair', es: 'Silla', fr: 'Chaise', ru: 'Стул' },
  'door': { en: 'Door', es: 'Puerta', fr: 'Porte', ru: 'Дверь' },
  'bag': { en: 'Bag', es: 'Bolsa / Maleta', fr: 'Sac', ru: 'Сумка' },
  'clothes': { en: 'Clothes', es: 'Ropa', fr: 'Vêtements', ru: 'Одежда' },
  'shoes': { en: 'Shoes', es: 'Zapatos', fr: 'Chaussures', ru: 'Обувь / Туфли' },
  'object': { en: 'Object', es: 'Objeto', fr: 'Objet', ru: 'Объект / Предмет' },

  // Question Words
  'who': { en: 'Who', es: 'Quién', fr: 'Qui', ru: 'Кто' },
  'what': { en: 'What', es: 'Qué', fr: 'Quoi / Que', ru: 'Что' },
  'where': { en: 'Where', es: 'Dónde', fr: 'Où', ru: 'Где' },
  'when': { en: 'When', es: 'Cuándo', fr: 'Quand', ru: 'Когда' },
  'why': { en: 'Why', es: 'Por qué', fr: 'Pourquoi', ru: 'Почему' },
  'how': { en: 'How', es: 'Cómo', fr: 'Comment', ru: 'Как' },
  'how much / how many': { en: 'How much / How many', es: 'Cuánto / Cuántos', fr: 'Combien', ru: 'Сколько' },

  // Days of the Week & Calendar
  'monday': { en: 'Monday', es: 'Lunes', fr: 'Lundi', ru: 'Понедельник' },
  'tuesday': { en: 'Tuesday', es: 'Martes', fr: 'Mardi', ru: 'Вторник' },
  'wednesday': { en: 'Wednesday', es: 'Miércoles', fr: 'Mercredi', ru: 'Среда' },
  'thursday': { en: 'Thursday', es: 'Jueves', fr: 'Jeudi', ru: 'Четверг' },
  'friday': { en: 'Friday', es: 'Viernes', fr: 'Vendredi', ru: 'Пятница' },
  'saturday': { en: 'Saturday', es: 'Sábado', fr: 'Samedi', ru: 'Суббота' },
  'sunday': { en: 'Sunday', es: 'Domingo', fr: 'Dimanche', ru: 'Воскресенье' },
  'week': { en: 'Week', es: 'Semana', fr: 'Semaine', ru: 'Неделя' },
  'month': { en: 'Month', es: 'Mes', fr: 'Mois', ru: 'Месяц' },
  'year': { en: 'Year', es: 'Año', fr: 'An / Année', ru: 'Год' },

  // Animals, Weather & Nature
  'dog': { en: 'Dog', es: 'Perro', fr: 'Chien', ru: 'Собака' },
  'cat': { en: 'Cat', es: 'Gato', fr: 'Chat', ru: 'Кот / Кошка' },
  'bird': { en: 'Bird', es: 'Pájaro / Ave', fr: 'Oiseau', ru: 'Птица' },
  'sun': { en: 'Sun', es: 'Sol', fr: 'Soleil', ru: 'Солнце' },
  'moon': { en: 'Moon', es: 'Luna', fr: 'Lune', ru: 'Луна' },
  'star': { en: 'Star', es: 'Estrella', fr: 'Étoile', ru: 'Звезда' },
  'rain': { en: 'Rain', es: 'Lluvia', fr: 'Pluie', ru: 'Дождь' },
  'snow': { en: 'Snow', es: 'Nieve', fr: 'Neige', ru: 'Снег' },
  'cold': { en: 'Cold', es: 'Frío', fr: 'Froid', ru: 'Холодно / Холодный' },
  'hot': { en: 'Hot', es: 'Caliente / Calor', fr: 'Chaud', ru: 'Жарко / Горячий' },
  'hedgehog': { en: 'Hedgehog', es: 'Erizo', fr: 'Hérisson', ru: 'Ёж' },
  'beetle': { en: 'Beetle / Bug', es: 'Escarabajo', fr: 'Scarabée', ru: 'Жук' },
  'flower': { en: 'Flower', es: 'Flor', fr: 'Fleur', ru: 'Цветок' },
  'tree': { en: 'Tree', es: 'Árbol', fr: 'Arbre', ru: 'Дерево' },
  'christmas tree': { en: 'Christmas tree', es: 'Árbol de Navidad', fr: 'Sapin de Noël', ru: 'Ёлка' },

  // Adjectives & Qualities
  'good': { en: 'Good', es: 'Bueno', fr: 'Bon', ru: 'Хороший / Хорошо' },
  'bad': { en: 'Bad', es: 'Malo', fr: 'Mauvais', ru: 'Плохой / Плохо' },
  'big': { en: 'Big / Large', es: 'Grande', fr: 'Grand', ru: 'Большой' },
  'small': { en: 'Small / Little', es: 'Pequeño', fr: 'Petit', ru: 'Маленький' },
  'new': { en: 'New', es: 'Nuevo', fr: 'Nouveau', ru: 'Новый' },
  'old': { en: 'Old', es: 'Viejo / Antiguo', fr: 'Vieux / Ancien', ru: 'Старый' },
  'open': { en: 'Open', es: 'Abierto', fr: 'Ouvert', ru: 'Открыто / Открытый' },
  'closed': { en: 'Closed', es: 'Cerrado', fr: 'Fermé', ru: 'Закрыто / Закрытый' },
  'fast': { en: 'Fast / Quick', es: 'Rápido', fr: 'Rapide', ru: 'Быстрый / Быстро' },
  'slow': { en: 'Slow', es: 'Lento', fr: 'Lent', ru: 'Медленный / Медленно' },
  'happy': { en: 'Happy', es: 'Feliz', fr: 'Heureux', ru: 'Счастливый / Рад' },
  'ready': { en: 'Ready', es: 'Listo', fr: 'Prêt', ru: 'Готов / Готовый' },

  // Alphabet & Beginner Vocabulary
  'apple': { en: 'Apple', es: 'Manzana', fr: 'Pomme', ru: 'Яблоко' },
  'egg': { en: 'Egg', es: 'Huevo', fr: 'Œuf', ru: 'Яйцо' },
  'ice': { en: 'Ice', es: 'Hielo', fr: 'Glace', ru: 'Лёд' },
  'juice': { en: 'Juice', es: 'Jugo', fr: 'Jus', ru: 'Сок' },
  'key': { en: 'Key', es: 'Llave', fr: 'Clé', ru: 'Ключ' },
  'light': { en: 'Light', es: 'Luz', fr: 'Lumière', ru: 'Свет' },
  'name': { en: 'Name', es: 'Nombre', fr: 'Nom', ru: 'Имя' },
  'orange': { en: 'Orange', es: 'Naranja', fr: 'Orange', ru: 'Апельсин' },
  'quiet': { en: 'Quiet', es: 'Tranquilo / Silencioso', fr: 'Silencieux / Calme', ru: 'Тихий' },
  'road': { en: 'Road', es: 'Camino / Carretera', fr: 'Route', ru: 'Дорога' },
  'school': { en: 'School', es: 'Escuela', fr: 'École', ru: 'Школа' },
  'umbrella': { en: 'Umbrella', es: 'Paraguas', fr: 'Parapluie', ru: 'Зонт' },
  'voice': { en: 'Voice', es: 'Voz', fr: 'Voix', ru: 'Голос' },
  'x-ray': { en: 'X-ray', es: 'Rayos X', fr: 'Rayons X', ru: 'Рентген' },
  'xylophone': { en: 'Xylophone', es: 'Xilófono', fr: 'Xylophone', ru: 'Ксилофон' },
  'yellow': { en: 'Yellow', es: 'Amarillo', fr: 'Jaune', ru: 'Жёлтый' },
  'zero': { en: 'Zero', es: 'Cero', fr: 'Zéro', ru: 'Ноль' },
  'love': { en: 'Love', es: 'Amor', fr: 'Amour', ru: 'Любовь' },
  'boat': { en: 'Boat', es: 'Barco', fr: 'Bateau', ru: 'Лодка' },
  'day': { en: 'Day', es: 'Día', fr: 'Jour', ru: 'День' },
  'island': { en: 'Island', es: 'Isla', fr: 'Île', ru: 'Остров' },
  'kilogram': { en: 'Kilogram', es: 'Kilo', fr: 'Kilo', ru: 'Килограмм' },
  'kilo': { en: 'Kilogram', es: 'Kilo', fr: 'Kilo', ru: 'Килограмм' },
  'night': { en: 'Night', es: 'Noche', fr: 'Nuit', ru: 'Ночь' },
  'eye': { en: 'Eye', es: 'Ojo', fr: 'Œil', ru: 'Глаз' },
  'eyes': { en: 'Eyes', es: 'Ojos', fr: 'Yeux', ru: 'Глаза' },
  'cheek': { en: 'Cheek', es: 'Mejilla', fr: 'Joue', ru: 'Щека' },
  'cheese': { en: 'Cheese', es: 'Queso', fr: 'Fromage', ru: 'Сыр' },
  'clock': { en: 'Clock / Watch', es: 'Reloj', fr: 'Horloge / Montre', ru: 'Часы' },
  'watch': { en: 'Watch / Clock', es: 'Reloj', fr: 'Montre', ru: 'Часы' },
  'grape': { en: 'Grape', es: 'Uva', fr: 'Raisin', ru: 'Виноград' },
  'glass': { en: 'Glass (cup)', es: 'Vaso', fr: 'Verre', ru: 'Стакан' },
  'web': { en: 'Web', es: 'Web', fr: 'Web', ru: 'Веб' },
  'success': { en: 'Success', es: 'Éxito', fr: 'Succès', ru: 'Успех' },
  'yolk': { en: 'Yolk', es: 'Yema', fr: 'Jaune d\'œuf', ru: 'Желток' },
  'shoe': { en: 'Shoe', es: 'Zapato', fr: 'Chaussure', ru: 'Обувь' },
  'idea': { en: 'Idea', es: 'Idea', fr: 'Idée', ru: 'Идея' },
  'question': { en: 'Question', es: 'Pregunta', fr: 'Question', ru: 'Вопрос' },
  'wagon': { en: 'Wagon / Car', es: 'Vagón', fr: 'Wagon', ru: 'Вагон' },
  'example': { en: 'Example', es: 'Ejemplo', fr: 'Exemple', ru: 'Пример' },
  'brother': { en: 'Brother', es: 'Hermano', fr: 'Frère', ru: 'Брат' },
  'sister': { en: 'Sister', es: 'Hermana', fr: 'Sœur', ru: 'Сестра' },
  'lemon': { en: 'Lemon', es: 'Limón', fr: 'Citron', ru: 'Лимон' },
  'nose': { en: 'Nose', es: 'Nariz', fr: 'Nez', ru: 'Нос' },
  'window': { en: 'Window', es: 'Ventana', fr: 'Fenêtre', ru: 'Окно' },
  'dad': { en: 'Dad', es: 'Papá', fr: 'Papa', ru: 'Папа' },
  'kettle': { en: 'Kettle', es: 'Tetera', fr: 'Bouilloire', ru: 'Чайник' },
  'morning': { en: 'Morning', es: 'Mañana', fr: 'Matin', ru: 'Утро' },
  'afternoon': { en: 'Afternoon', es: 'Tarde', fr: 'Après-midi', ru: 'День (после полудня)' },
  'evening': { en: 'Evening', es: 'Tarde / Noche', fr: 'Soir', ru: 'Вечер' },
  'photo': { en: 'Photo', es: 'Foto', fr: 'Photo', ru: 'Фото' },
  'czar': { en: 'Czar / King', es: 'Zar', fr: 'Tsar', ru: 'Царь' },
  'borscht': { en: 'Borscht', es: 'Borsch', fr: 'Bortsch', ru: 'Борщ' },
  'entrance': { en: 'Entrance', es: 'Entrada', fr: 'Entrée', ru: 'Подъезд' },
  'south': { en: 'South', es: 'Sur', fr: 'Sud', ru: 'Юг' },
  'yogurt': { en: 'Yogurt', es: 'Yogur', fr: 'Yaourt', ru: 'Йогурт' },
  'or': { en: 'Or', es: 'O', fr: 'Ou', ru: 'Или' },
  'this': { en: 'This', es: 'Esto', fr: 'Ceci', ru: 'Это' },
  'i eat': { en: 'I eat', es: 'Como', fr: 'Je mange', ru: 'Ем' },
  'yes': { en: 'Yes', es: 'Sí', fr: 'Oui', ru: 'Да' },
  'no': { en: 'No', es: 'No', fr: 'Non', ru: 'Нет' },
  'maybe': { en: 'Maybe', es: 'Quizás / Tal vez', fr: 'Peut-être', ru: 'Может быть' },
  'today': { en: 'Today', es: 'Hoy', fr: 'Aujourd\'hui', ru: 'Сегодня' },
  'tomorrow': { en: 'Tomorrow', es: 'Mañana', fr: 'Demain', ru: 'Завтра' },
  'yesterday': { en: 'Yesterday', es: 'Ayer', fr: 'Hier', ru: 'Вчера' },

  // Core Actions (Verbs)
  'to learn': { en: 'To learn', es: 'Aprender', fr: 'Apprendre', ru: 'Учиться' },
  'to speak': { en: 'To speak', es: 'Hablar', fr: 'Parler', ru: 'Говорить' },
  'to eat': { en: 'To eat', es: 'Comer', fr: 'Manger', ru: 'Есть' },
  'to drink': { en: 'To drink', es: 'Beber', fr: 'Boire', ru: 'Пить' },
  'to go': { en: 'To go', es: 'Ir', fr: 'Aller', ru: 'Идти / Ехать' },
  'to come': { en: 'To come', es: 'Venir', fr: 'Venir', ru: 'Приходить / Приезжать' },
  'to understand': { en: 'To understand', es: 'Entender / Comprender', fr: 'Comprendre', ru: 'Понимать' },
  'to know': { en: 'To know', es: 'Saber / Conocer', fr: 'Savoir / Connaître', ru: 'Знать' },
  'to want': { en: 'To want', es: 'Querer', fr: 'Vouloir', ru: 'Хотеть' },
  'to need': { en: 'To need', es: 'Necesitar', fr: 'Avoir besoin de', ru: 'Нуждаться (нужно)' },
  'to buy': { en: 'To buy', es: 'Comprar', fr: 'Acheter', ru: 'Покупать' },
  'to help': { en: 'To help', es: 'Ayudar', fr: 'Aider', ru: 'Помогать' },
  'to work': { en: 'To work', es: 'Trabajar', fr: 'Travailler', ru: 'Работать' },

  // Essential Phrases
  'hello': { en: 'Hello', es: '¡Hola!', fr: 'Bonjour', ru: 'Привет / Здравствуйте' },
  'hello (informal)': { en: 'Hello (informal)', es: '¡Hola! (informal)', fr: 'Salut (informel)', ru: 'Привет' },
  'hello (formal)': { en: 'Hello (formal)', es: 'Buenos días / Hola (formal)', fr: 'Bonjour (formel)', ru: 'Здравствуйте' },
  'good morning': { en: 'Good morning', es: 'Buenos días', fr: 'Bonjour', ru: 'Доброе утро' },
  'good afternoon': { en: 'Good afternoon', es: 'Buenas tardes', fr: 'Bon après-midi', ru: 'Добрый день' },
  'good evening': { en: 'Good evening', es: 'Buenas noches', fr: 'Bonsoir', ru: 'Добрый вечер' },
  'good night': { en: 'Good night', es: 'Buenas noches', fr: 'Bonne nuit', ru: 'Спокойной ночи' },
  'how are you': { en: 'How are you?', es: '¿Cómo estás?', fr: 'Comment allez-vous ?', ru: 'Как дела?' },
  'how are you?': { en: 'How are you?', es: '¿Cómo estás?', fr: 'Comment allez-vous ?', ru: 'Как дела?' },
  'i am fine, thank you': { en: 'I am fine, thank you', es: 'Estoy bien, gracias', fr: 'Je vais bien, merci', ru: 'У меня всё хорошо, спасибо' },
  'very well, thank you': { en: 'Very well, thank you', es: 'Muy bien, gracias', fr: 'Très bien, merci', ru: 'Очень хорошо, спасибо' },
  'good / well': { en: 'Good / Well', es: 'Bien', fr: 'Bien', ru: 'Хорошо' },
  'bad / poorly': { en: 'Bad / Poorly', es: 'Mal', fr: 'Mal', ru: 'Плохо' },
  'and you?': { en: 'And you?', es: '¿Y tú?', fr: 'Et vous ?', ru: 'А вы? / А у вас?' },
  'please': { en: 'Please', es: 'Por favor', fr: 'S\'il vous plaît', ru: 'Пожалуйста' },
  'please / you\'re welcome': { en: 'Please / You\'re welcome', es: 'Por favor / De nada', fr: 'S\'il vous plaît / De rien', ru: 'Пожалуйста' },
  'thank you': { en: 'Thank you', es: 'Gracias', fr: 'Merci', ru: 'Спасибо' },
  'thank you very much': { en: 'Thank you very much', es: 'Muchas gracias', fr: 'Merci beaucoup', ru: 'Большое спасибо' },
  'you are welcome': { en: 'You are welcome', es: 'De nada', fr: 'De rien', ru: 'Пожалуйста / Не за что' },
  'you\'re welcome / not at all': { en: 'You\'re welcome / Not at all', es: 'De nada', fr: 'De rien', ru: 'Не за что' },
  'no problem': { en: 'No problem', es: 'No hay problema', fr: 'Pas de problème', ru: 'Без проблем / Ничего страшного' },
  'excuse me': { en: 'Excuse me', es: 'Disculpe / Con permiso', fr: 'Excusez-moi', ru: 'Извините' },
  'excuse me / sorry': { en: 'Excuse me / Sorry', es: 'Disculpe / Perdón', fr: 'Excusez-moi / Pardon', ru: 'Извините' },
  'i am sorry': { en: 'I am sorry', es: 'Lo siento / Perdón', fr: 'Pardon / Désolé', ru: 'Простите / Мне жаль' },
  'what is your name?': { en: 'What is your name?', es: '¿Cómo te llamas?', fr: 'Comment vous appelez-vous ?', ru: 'Как вас зовут?' },
  'my name is': { en: 'My name is...', es: 'Me llamo...', fr: 'Je m\'appelle...', ru: 'Меня зовут...' },
  'my name is...': { en: 'My name is...', es: 'Me llamo...', fr: 'Je m\'appelle...', ru: 'Меня зовут...' },
  'nice to meet you': { en: 'Nice to meet you', es: 'Mucho gusto / Encantado', fr: 'Enchanté(e)', ru: 'Очень приятно познакомиться' },
  'where are you from?': { en: 'Where are you from?', es: '¿De dónde eres?', fr: 'D\'où venez-vous ?', ru: 'Откуда вы?' },
  'i am from...': { en: 'I am from...', es: 'Soy de...', fr: 'Je viens de...', ru: 'Я из...' },
  'goodbye': { en: 'Goodbye', es: 'Adiós', fr: 'Au revoir', ru: 'До свидания' },
  'bye (informal)': { en: 'Bye (informal)', es: 'Chao / Hasta luego', fr: 'Salut / À plus', ru: 'Пока' },
  'see you later': { en: 'See you later', es: 'Hasta luego', fr: 'À bientôt', ru: 'Увидимся позже / Пока' },
  'have a nice day': { en: 'Have a nice day', es: 'Que tenga un buen día', fr: 'Bonne journée', ru: 'Хорошего дня' },
  'have a great day': { en: 'Have a great day', es: 'Que tenga un buen día', fr: 'Bonne journée', ru: 'Хорошего дня' },
  'i understand': { en: 'I understand', es: 'Entiendo / Comprendo', fr: 'Je comprends', ru: 'Я понимаю' },
  'i do not understand': { en: 'I do not understand', es: 'No entiendo', fr: 'Je ne comprends pas', ru: 'Я не понимаю' },
  'i don\'t understand': { en: 'I don\'t understand', es: 'No entiendo', fr: 'Je ne comprends pas', ru: 'Я не понимаю' },
  'could you repeat that, please?': { en: 'Could you repeat that, please?', es: '¿Puede repetir, por favor?', fr: 'Pouvez-vous répéter ?', ru: 'Повторите, пожалуйста' },
  'can you repeat, please?': { en: 'Can you repeat, please?', es: '¿Puede repetir, por favor?', fr: 'Pouvez-vous répéter ?', ru: 'Повторите, пожалуйста' },
  'please repeat': { en: 'Please repeat', es: 'Repita, por favor', fr: 'Répétez, s\'il vous plaît', ru: 'Повторите, пожалуйста' },
  'please speak more slowly': { en: 'Please speak more slowly', es: 'Hable más despacio, por favor', fr: 'Parlez plus lentement, s\'il vous plaît', ru: 'Говорите медленнее, пожалуйста' },
  'speak more slowly': { en: 'Speak more slowly', es: 'Hable más despacio', fr: 'Parlez plus lentement', ru: 'Говорите медленнее' },
  'do you speak english?': { en: 'Do you speak English?', es: '¿Habla inglés?', fr: 'Parlez-vous anglais ?', ru: 'Вы говорите по-английски?' },
  'i speak a little russian': { en: 'I speak a little Russian', es: 'Hablo un poco de ruso', fr: 'Je parle un peu russe', ru: 'Я немного говорю по-русски' },
  'what does this mean?': { en: 'What does this mean?', es: '¿Qué significa esto?', fr: 'Qu\'est-ce que cela signifie ?', ru: 'Что это значит?' },
  'how do you say...?': { en: 'How do you say...?', es: '¿Cómo se dice...?', fr: 'Comment dit-on... ?', ru: 'Как сказать...?' },
  'how do you say this in russian?': { en: 'How do you say this in Russian?', es: '¿Cómo se dice esto en ruso?', fr: 'Comment dit-on cela en russe ?', ru: 'Как это по-русски?' },
  'can you help me?': { en: 'Can you help me?', es: '¿Puede ayudarme?', fr: 'Pouvez-vous m\'aider ?', ru: 'Вы можете мне помочь?' },
  'help me': { en: 'Help me', es: 'Ayúdeme', fr: 'Aidez-moi', ru: 'Помогите мне' },
  'help!': { en: 'Help!', es: '¡Ayuda! / ¡Socorro!', fr: 'À l\'aide ! / Au secours !', ru: 'Помогите!' },
  'where is the restroom?': { en: 'Where is the restroom?', es: '¿Dónde está el baño?', fr: 'Où sont les toilettes ?', ru: 'Где находится туалет?' },
  'where is the bathroom': { en: 'Where is the bathroom?', es: '¿Dónde está el baño?', fr: 'Où sont les toilettes ?', ru: 'Где туалет?' },
  'where is the train station?': { en: 'Where is the train station?', es: '¿Dónde está la estación de tren?', fr: 'Où est la gare ?', ru: 'Где находится вокзал?' },
  'where is the airport?': { en: 'Where is the airport?', es: '¿Dónde está el aeropuerto?', fr: 'Où est l\'aéroport ?', ru: 'Где находится аэропорт?' },
  'where is the hotel?': { en: 'Where is the hotel?', es: '¿Dónde está el hotel?', fr: 'Où est l\'hôtel ?', ru: 'Где находится отель?' },
  'how much is a ticket?': { en: 'How much is a ticket?', es: '¿Cuánto cuesta un boleto?', fr: 'Combien coûte un billet ?', ru: 'Сколько стоит билет?' },
  'i need a taxi': { en: 'I need a taxi', es: 'Necesito un taxi', fr: 'J\'ai besoin d\'un taxi', ru: 'Мне нужно такси' },
  'turn left': { en: 'Turn left', es: 'Gire a la izquierda', fr: 'Tournez à gauche', ru: 'Поверните налево' },
  'turn right': { en: 'Turn right', es: 'Gire a la derecha', fr: 'Tournez à droite', ru: 'Поверните направо' },
  'go straight ahead': { en: 'Go straight ahead', es: 'Siga todo recto', fr: 'Allez tout droit', ru: 'Идите прямо' },
  'a table for two, please': { en: 'A table for two, please', es: 'Una mesa para dos, por favor', fr: 'Une table pour deux, s\'il vous plaît', ru: 'Столик на двоих, пожалуйста' },
  'the menu, please': { en: 'The menu, please', es: 'El menú, por favor', fr: 'La carte, s\'il vous plaît', ru: 'Меню, пожалуйста' },
  'i would like water': { en: 'I would like water', es: 'Quisiera agua', fr: 'Je voudrais de l\'eau', ru: 'Я бы хотел(а) воды' },
  'i want to eat': { en: 'I want to eat', es: 'Quiero comer', fr: 'Je veux manger', ru: 'Я хочу есть' },
  'i want to drink': { en: 'I want to drink', es: 'Quiero beber', fr: 'Je veux boire', ru: 'Я хочу пить' },
  'what do you recommend?': { en: 'What do you recommend?', es: '¿Qué recomienda?', fr: 'Que recommandez-vous ?', ru: 'Что вы порекомендуете?' },
  'this is delicious!': { en: 'This is delicious!', es: '¡Está delicioso!', fr: 'C\'est délicieux !', ru: 'Это очень вкусно!' },
  'can i have the check, please?': { en: 'Can I have the check, please?', es: 'La cuenta, por favor', fr: 'L\'addition, s\'il vous plaît', ru: 'Счёт, пожалуйста' },
  'the bill / check, please': { en: 'The check, please', es: 'La cuenta, por favor', fr: 'L\'addition, s\'il vous plaît', ru: 'Счёт, пожалуйста' },
  'the check, please': { en: 'The check, please', es: 'La cuenta, por favor', fr: 'L\'addition, s\'il vous plaît', ru: 'Счёт, пожалуйста' },
  'how much does this cost?': { en: 'How much does this cost?', es: '¿Cuánto cuesta esto?', fr: 'Combien ça coûte ?', ru: 'Сколько это стоит?' },
  'how much does it cost': { en: 'How much does it cost?', es: '¿Cuánto cuesta?', fr: 'Combien ça coûte ?', ru: 'Сколько стоит?' },
  'do you accept credit cards?': { en: 'Do you accept credit cards?', es: '¿Aceptan tarjetas de crédito?', fr: 'Acceptez-vous les cartes bancaires ?', ru: 'Вы принимаете банковские карты?' },
  'i am just looking': { en: 'I am just looking', es: 'Solo estoy mirando', fr: 'Je regarde seulement', ru: 'Я просто смотрю' },
  'do you have this in another size?': { en: 'Do you have this in another size?', es: '¿Tiene esto en otra talla?', fr: 'Avez-vous ceci dans une autre taille ?', ru: 'У вас есть другой размер?' },
  'it is too expensive': { en: 'It is too expensive', es: 'Es demasiado caro', fr: 'C\'est trop cher', ru: 'Это слишком дорого' },
  'i need a doctor': { en: 'I need a doctor', es: 'Necesito un médico', fr: 'J\'ai besoin d\'un médecin', ru: 'Мне нужен врач' },
  'call the police': { en: 'Call the police', es: 'Llame a la policía', fr: 'Appelez la police', ru: 'Вызовите полицию' },
  'i lost my passport': { en: 'I lost my passport', es: 'Perdí mi pasaporte', fr: 'J\'ai perdu mon passeport', ru: 'Я потерял(а) свой паспорт' },

  // Time expressions
  'what time is it?': { en: 'What time is it?', es: '¿Qué hora es?', fr: 'Quelle heure est-il ?', ru: 'Который час?' },
  'what time is it now?': { en: 'What time is it now?', es: '¿Qué hora es ahora?', fr: 'Quelle heure est-il maintenant ?', ru: 'Сколько сейчас времени?' },
  'at what time?': { en: 'At what time?', es: '¿A qué hora?', fr: 'À quelle heure ?', ru: 'Во сколько?' },
  'now': { en: 'Now', es: 'Ahora', fr: 'Maintenant', ru: 'Сейчас' },
  'hour': { en: 'Hour', es: 'Hora', fr: 'Heure', ru: 'Час' },
  'minute': { en: 'Minute', es: 'Minuto', fr: 'Minute', ru: 'Минута' },
  'second': { en: 'Second', es: 'Segundo', fr: 'Seconde', ru: 'Секунда' },
  'one o\'clock': { en: 'One o\'clock (1:00)', es: 'Es la una (1:00)', fr: 'Il est une heure (1:00)', ru: 'Один час (1:00)' },
  'it is one o\'clock on the dot': { en: 'It is 1:00 sharp', es: 'Es la una en punto', fr: 'Il est une heure pile', ru: 'Ровно один час (1:00)' },
  'two o\'clock': { en: 'Two o\'clock (2:00)', es: 'Son las dos (2:00)', fr: 'Il est deux heures (2:00)', ru: 'Два часа (2:00)' },
  'it is two o\'clock': { en: 'It is 2:00', es: 'Son las dos', fr: 'Il est deux heures', ru: 'Два часа (2:00)' },
  'three o\'clock': { en: 'Three o\'clock (3:00)', es: 'Son las tres (3:00)', fr: 'Il est trois heures (3:00)', ru: 'Три часа (3:00)' },
  'exactly three o\'clock': { en: 'Exactly three o\'clock (3:00)', es: 'Las tres en punto', fr: 'Trois heures pile', ru: 'Ровно три часа (3:00)' },
  'four o\'clock': { en: 'Four o\'clock (4:00)', es: 'Son las cuatro (4:00)', fr: 'Il est quatre heures (4:00)', ru: 'Четыре часа (4:00)' },
  'five o\'clock': { en: 'Five o\'clock (5:00)', es: 'Son las cinco (5:00)', fr: 'Il est cinq heures (5:00)', ru: 'Пять часов (5:00)' },
  'six o\'clock': { en: 'Six o\'clock (6:00)', es: 'Son las seis (6:00)', fr: 'Il est six heures (6:00)', ru: 'Шесть часов (6:00)' },
  'seven o\'clock': { en: 'Seven o\'clock (7:00)', es: 'Son las siete (7:00)', fr: 'Il est sept heures (7:00)', ru: 'Семь часов (7:00)' },
  'eight o\'clock': { en: 'Eight o\'clock (8:00)', es: 'Son las ocho (8:00)', fr: 'Il est huit heures (8:00)', ru: 'Восемь часов (8:00)' },
  'nine o\'clock': { en: 'Nine o\'clock (9:00)', es: 'Son las nueve (9:00)', fr: 'Il est neuf heures (9:00)', ru: 'Девять часов (9:00)' },
  'ten o\'clock': { en: 'Ten o\'clock (10:00)', es: 'Son las diez (10:00)', fr: 'Il est dix heures (10:00)', ru: 'Десять часов (10:00)' },
  'eleven o\'clock': { en: 'Eleven o\'clock (11:00)', es: 'Son las once (11:00)', fr: 'Il est onze heures (11:00)', ru: 'Одиннадцать часов (11:00)' },
  'twelve o\'clock': { en: 'Twelve o\'clock (12:00)', es: 'Son las doce (12:00)', fr: 'Il est douze heures (12:00)', ru: 'Двенадцать часов (12:00)' },
  'half past two': { en: 'Half past two (2:30)', es: 'Las dos y media (2:30)', fr: 'Deux heures et demie (2:30)', ru: 'Половина третьего (2:30)' },
  'quarter to three': { en: 'Quarter to three (2:45)', es: 'Las tres menos cuarto (2:45)', fr: 'Trois heures moins le quart (2:45)', ru: 'Без четверти три (2:45)' },
  'it is 3:30 (half past three)': { en: '3:30 (half past three)', es: 'Son las tres y media', fr: 'Il est trois heures et demie', ru: 'Половина четвёртого (3:30)' },
  'it is 4:15 (quarter past four)': { en: '4:15 (quarter past four)', es: 'Son las cuatro y cuarto', fr: 'Il est quatre heures et quart', ru: 'Четверть пятого (4:15)' },
  'it is 4:45 (quarter to five)': { en: '4:45 (quarter to five)', es: 'Son las cinco menos cuarto', fr: 'Il est cinq heures moins le quart', ru: 'Без четверти пять (4:45)' },
  'son las cuatro y cuarto': { en: '4:15 (quarter past four)', es: 'Son las cuatro y cuarto', fr: 'Il est quatre heures et quart', ru: 'Четверть пятого (4:15)' },
  'son las cinco menos cuarto': { en: '4:45 (quarter to five)', es: 'Son las cinco menos cuarto', fr: 'Il est cinq heures moins le quart', ru: 'Без четверти пять (4:45)' },
  'il est quatre heures et quart': { en: '4:15 (quarter past four)', es: 'Son las cuatro y cuarto', fr: 'Il est quatre heures et quart', ru: 'Четверть пятого (4:15)' },
  'il est cinq heures moins le quart': { en: '4:45 (quarter to five)', es: 'Son las cinco menos cuarto', fr: 'Il est cinq heures moins le quart', ru: 'Без четверти пять (4:45)' },
  'half past twelve (12:30)': { en: 'Half past twelve (12:30)', es: 'Las doce y media (12:30)', fr: 'Midi et demi (12:30)', ru: 'Половина первого (12:30)' },
  'ten to two (1:50)': { en: 'Ten to two (1:50)', es: 'Las dos menos diez (1:50)', fr: 'Deux heures moins dix (1:50)', ru: 'Без десяти два (1:50)' },
  'half an hour': { en: 'Half an hour', es: 'Media hora', fr: 'Une demi-heure', ru: 'Полчаса' },
  'quarter of an hour': { en: 'Quarter of an hour', es: 'Un cuarto de hora', fr: 'Un quart d\'heure', ru: 'Четверть часа' },
  'in the morning (a.m.)': { en: 'In the morning (a.m.)', es: 'De la mañana (a.m.)', fr: 'Du matin', ru: 'Утра (утром)' },
  'in the afternoon (p.m.)': { en: 'In the afternoon (p.m.)', es: 'De la tarde (p.m.)', fr: 'De l\'après-midi', ru: 'Дня (днём)' },
  'in the evening (p.m.)': { en: 'In the evening (p.m.)', es: 'De la noche / tarde (p.m.)', fr: 'Du soir', ru: 'Вечера (вечером)' },
  'at night': { en: 'At night', es: 'Por la noche', fr: 'La nuit', ru: 'Ночи (ночью)' },
  'noon / midday': { en: 'Noon / Midday', es: 'Mediodía', fr: 'Midi', ru: 'Полдень' },
  'midnight': { en: 'Midnight', es: 'Medianoche', fr: 'Minuit', ru: 'Полночь' },
  'on time': { en: 'On time', es: 'A tiempo / Puntual', fr: 'À l\'heure', ru: 'Вовремя' },
  'early': { en: 'Early', es: 'Temprano', fr: 'Tôt', ru: 'Рано' },
  'late': { en: 'Late', es: 'Tarde', fr: 'En retard / Tard', ru: 'Поздно' },

  // Spanish & French curriculum translation variants
  'hello! / hi!': { en: 'Hello! / Hi!', es: '¡Hola!', fr: 'Bonjour / Salut', ru: 'Привет! / Здравствуйте!' },
  'hello / good morning': { en: 'Hello / Good morning', es: 'Hola / Buenos días', fr: 'Bonjour', ru: 'Здравствуйте / Доброе утро' },
  'good evening / good night': { en: 'Good evening / Good night', es: 'Buenas noches', fr: 'Bonsoir / Bonne nuit', ru: 'Добрый вечер / Спокойной ночи' },
  'hi / bye (informal)': { en: 'Hi / Bye', es: 'Hola / Chao', fr: 'Salut', ru: 'Привет / Пока' },
  'how are you? (informal)': { en: 'How are you?', es: '¿Cómo estás?', fr: 'Comment vas-tu ? / Ça va ?', ru: 'Как дела?' },
  'how are you? (formal)': { en: 'How are you? (formal)', es: '¿Cómo está usted?', fr: 'Comment allez-vous ?', ru: 'Как ваши дела?' },
  'how are you? / doing okay? (informal)': { en: 'How are you?', es: '¿Cómo estás? / ¿Qué tal?', fr: 'Ça va ?', ru: 'Как дела?' },
  'i am doing well, thank you': { en: 'I am doing well, thank you', es: 'Estoy bien, gracias', fr: 'Ça va bien, merci', ru: 'Всё хорошо, спасибо' },
  'and you? (formal)': { en: 'And you?', es: '¿Y usted?', fr: 'Et vous ?', ru: 'А вы?' },
  'please (formal)': { en: 'Please', es: 'Por favor', fr: 'S\'il vous plaît', ru: 'Пожалуйста' },
  'what is your name? (formal)': { en: 'What is your name?', es: '¿Cómo se llama usted?', fr: 'Comment vous appelez-vous ?', ru: 'Как вас зовут?' },
  'pleased to meet you': { en: 'Pleased to meet you', es: 'Mucho gusto / Encantado', fr: 'Enchanté(e)', ru: 'Очень приятно' },
  'where are the restrooms?': { en: 'Where are the restrooms?', es: '¿Dónde está el baño?', fr: 'Où sont les toilettes ?', ru: 'Где находится туалет?' },
  'can you repeat?': { en: 'Can you repeat?', es: '¿Puede repetir?', fr: 'Pouvez-vous répéter ?', ru: 'Повторите, пожалуйста' },
  'see you soon': { en: 'See you soon', es: 'Hasta pronto / Hasta luego', fr: 'À bientôt', ru: 'До скорого' },
  'time / weather': { en: 'Time / Weather', es: 'Tiempo', fr: 'Temps', ru: 'Время / Погода' },
  'tomorrow / morning': { en: 'Tomorrow / Morning', es: 'Mañana', fr: 'Demain / Matin', ru: 'Завтра / Утро' },
  'office / desk': { en: 'Office / Desk', es: 'Oficina / Escritorio', fr: 'Bureau', ru: 'Офис / Стол' },
  'money / silver': { en: 'Money', es: 'Dinero', fr: 'Argent', ru: 'Деньги' },
  'train station': { en: 'Train station', es: 'Estación de tren', fr: 'Gare', ru: 'Вокзал / Станция' },
  'boy / child': { en: 'Boy / Child', es: 'Niño', fr: 'Garçon / Enfant', ru: 'Мальчик / Ребёнок' },
  'one hundred': { en: 'One hundred', es: 'Cien', fr: 'Cent', ru: 'Сто' },
  'one thousand': { en: 'One thousand', es: 'Mil', fr: 'Mille', ru: 'Тысяча' },
  'is it far from here?': { en: 'Is it far from here?', es: '¿Está lejos de aquí?', fr: 'Est-ce loin d\'ici ?', ru: 'Это далеко отсюда?' },
  'could you speak slower, please?': { en: 'Could you speak slower, please?', es: 'Hable más despacio, por favor', fr: 'Parlez plus lentement, s\'il vous plaît', ru: 'Говорите медленнее, пожалуйста' },

  // Colors & Descriptions Pack
  'red': { en: 'Red', es: 'Rojo', fr: 'Rouge', ru: 'Красный' },
  'blue': { en: 'Blue', es: 'Azul', fr: 'Bleu', ru: 'Синий' },
  'green': { en: 'Green', es: 'Verde', fr: 'Vert', ru: 'Зелёный' },
  'black': { en: 'Black', es: 'Negro', fr: 'Noir', ru: 'Чёрный' },
  'white': { en: 'White', es: 'Blanco', fr: 'Blanc', ru: 'Белый' },

  // Weather & Seasons Pack
  'wind': { en: 'Wind', es: 'Viento', fr: 'Vent', ru: 'Ветер' },
  'cloud': { en: 'Cloud', es: 'Nube', fr: 'Nuage', ru: 'Облако' },
  'storm': { en: 'Storm', es: 'Tormenta', fr: 'Orage', ru: 'Гроза' },

  // Tech & Remote Work Pack
  'internet': { en: 'Internet', es: 'Internet', fr: 'Internet', ru: 'Интернет' },
  'password': { en: 'Password', es: 'Contraseña', fr: 'Mot de passe', ru: 'Пароль' },
  'email': { en: 'Email', es: 'Correo electrónico', fr: 'Courriel', ru: 'Электронная почта' },
  'screen': { en: 'Screen', es: 'Pantalla', fr: 'Écran', ru: 'Экран' },
  'meeting': { en: 'Meeting', es: 'Reunión', fr: 'Réunion', ru: 'Встреча' },
  'file': { en: 'File', es: 'Archivo', fr: 'Fichier', ru: 'Файл' },
  'link': { en: 'Link', es: 'Enlace', fr: 'Lien', ru: 'Ссылка' },
  'code': { en: 'Code', es: 'Código', fr: 'Code', ru: 'Код' },
  'error': { en: 'Error', es: 'Error', fr: 'Erreur', ru: 'Ошибка' },
  'battery': { en: 'Battery', es: 'Batería', fr: 'Batterie', ru: 'Батарея' },
  'can you hear me?': { en: 'Can you hear me?', es: '¿Me escucha?', fr: 'Vous m\'entendez ?', ru: 'Вы меня слышите?' },
  'can you see my screen?': { en: 'Can you see my screen?', es: '¿Puede ver mi pantalla?', fr: 'Voyez-vous mon écran ?', ru: 'Видно мой экран?' },
  'what is the wi-fi password?': { en: 'What is the Wi-Fi password?', es: '¿Cuál es la contraseña del wifi?', fr: 'Quel est le mot de passe du Wi-Fi ?', ru: 'Какой пароль от вайфая?' },

  // Business & Office Pack
  'project': { en: 'Project', es: 'Proyecto', fr: 'Projet', ru: 'Проект' },
  'client': { en: 'Client', es: 'Cliente', fr: 'Client', ru: 'Клиент' },
  'team': { en: 'Team', es: 'Equipo', fr: 'Équipe', ru: 'Команда' },
  'manager': { en: 'Manager', es: 'Gerente', fr: 'Directeur', ru: 'Руководитель' },
  'company': { en: 'Company', es: 'Empresa', fr: 'Entreprise', ru: 'Компания' },
  'contract': { en: 'Contract', es: 'Contrato', fr: 'Contrat', ru: 'Контракт' },
  'schedule': { en: 'Schedule', es: 'Horario', fr: 'Horaire', ru: 'Расписание' },
  'deadline': { en: 'Deadline', es: 'Fecha límite', fr: 'Date limite', ru: 'Срок' },
  'invoice': { en: 'Invoice', es: 'Factura', fr: 'Facture', ru: 'Счёт' },
  'salary': { en: 'Salary', es: 'Salario', fr: 'Salaire', ru: 'Зарплата' },
  'let\'s schedule a meeting': { en: 'Let\'s schedule a meeting', es: 'Programemos una reunión', fr: 'Planifions une réunion', ru: 'Давайте назначим встречу' },
  'i will send you an email': { en: 'I will send you an email', es: 'Le enviaré un correo', fr: 'Je vous enverrai un courriel', ru: 'Я отправлю вам письмо' },
  'when is the deadline?': { en: 'When is the deadline?', es: '¿Cuándo es la fecha límite?', fr: 'Quelle est la date limite ?', ru: 'Какой крайний срок?' },

  // Healthcare & Pharmacy Pack
  'medicine': { en: 'Medicine', es: 'Medicina', fr: 'Médicament', ru: 'Лекарство' },
  'pain': { en: 'Pain', es: 'Dolor', fr: 'Douleur', ru: 'Боль' },
  'fever': { en: 'Fever', es: 'Fiebre', fr: 'Fièvre', ru: 'Температура' },
  'allergy': { en: 'Allergy', es: 'Alergia', fr: 'Allergie', ru: 'Аллергия' },
  'headache': { en: 'Headache', es: 'Dolor de cabeza', fr: 'Mal de tête', ru: 'Головная боль' },
  'emergency': { en: 'Emergency', es: 'Emergencia', fr: 'Urgence', ru: 'Скорая помощь' },
  'prescription': { en: 'Prescription', es: 'Receta médica', fr: 'Ordonnance', ru: 'Рецепт' },
  'bandage': { en: 'Bandage', es: 'Venda', fr: 'Pansement', ru: 'Бинт' },
  'health': { en: 'Health', es: 'Salud', fr: 'Santé', ru: 'Здоровье' },
  'where is the nearest pharmacy?': { en: 'Where is the nearest pharmacy?', es: '¿Dónde está la farmacia más cercana?', fr: 'Où est la pharmacie la plus proche ?', ru: 'Где ближайшая аптека?' },
  'i am allergic to nuts': { en: 'I am allergic to nuts', es: 'Soy alérgico a las nueces', fr: 'Je suis allergique aux noix', ru: 'У меня аллергия на орехи' },

  // Hotel, Airport & Travel Pack
  'flight': { en: 'Flight', es: 'Vuelo', fr: 'Vol', ru: 'Рейс' },
  'luggage': { en: 'Luggage', es: 'Equipaje', fr: 'Bagage', ru: 'Багаж' },
  'reservation': { en: 'Reservation', es: 'Reserva', fr: 'Réservation', ru: 'Бронь' },
  'room': { en: 'Room', es: 'Habitación', fr: 'Chambre', ru: 'Номер' },
  'gate': { en: 'Gate', es: 'Puerta de embarque', fr: 'Porte d\'embarquement', ru: 'Выход на посадку' },
  'exit': { en: 'Exit', es: 'Salida', fr: 'Sortie', ru: 'Выход' },
  'customs': { en: 'Customs', es: 'Aduana', fr: 'Douane', ru: 'Таможня' },
  'i have a reservation': { en: 'I have a reservation', es: 'Tengo una reserva', fr: 'J\'ai une réservation', ru: 'У меня есть бронь' },

  // Shopping & Money Pack
  'credit card': { en: 'Credit card', es: 'Tarjeta de crédito', fr: 'Carte bancaire', ru: 'Банковская карта' },
  'cash': { en: 'Cash', es: 'Efectivo', fr: 'Espèces', ru: 'Наличные' },
  'price': { en: 'Price', es: 'Precio', fr: 'Prix', ru: 'Цена' },
  'cheap': { en: 'Cheap', es: 'Barato', fr: 'Pas cher', ru: 'Дешёвый' },
  'expensive': { en: 'Expensive', es: 'Caro', fr: 'Cher', ru: 'Дорогой' },
  'discount': { en: 'Discount', es: 'Descuento', fr: 'Réduction', ru: 'Скидка' },
  'where is the bus stop?': { en: 'Where is the bus stop?', es: '¿Dónde está la parada de autobús?', fr: 'Où est l\'arrêt de bus ?', ru: 'Где автобусная остановка?' },
  'how do i get to the airport?': { en: 'How do I get to the airport?', es: '¿Cómo llego al aeropuerto?', fr: 'Comment aller à l\'aéroport ?', ru: 'Как добраться до аэропорта?' },
  'i would like a coffee, please': { en: 'I would like a coffee, please', es: 'Quisiera un café, por favor', fr: 'Je voudrais un café, s\'il vous plaît', ru: 'Я бы хотел кофе, пожалуйста' },
  'a bottle of water, please': { en: 'A bottle of water, please', es: 'Una botella de agua, por favor', fr: 'Une bouteille d\'eau, s\'il vous plaît', ru: 'Бутылку воды, пожалуйста' }
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
    /\b(o'clock|half\s+past|quarter|en\s+punto|y\s+media|y\s+cuarto|menos\s+cuarto|menos\s+diez|heure|heures|demie|quart|час|часа|часов|половина|четверть|ровно)\b/i.test(text)
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
    /\b(o'clock|half\s+past|quarter|en\s+punto|y\s+media|y\s+cuarto|menos\s+cuarto|menos\s+diez|heure|heures|demie|quart|час|часа|часов|половина|четверть|ровно)\b/i.test(`${rawEnglish} ${primaryText}`);

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

  // 3. Direct Russian / Spanish / French word lookup across dictionary values
  const directTarget = ((item as any).russianWord || (item as any).russian || (item as any).word || item.phrase || '').toString().toLowerCase().trim();
  if (directTarget) {
    for (const mapping of Object.values(EXTENDED_DICTIONARY)) {
      if (
        (mapping.ru && mapping.ru.toLowerCase() === directTarget) ||
        (mapping.es && mapping.es.toLowerCase() === directTarget) ||
        (mapping.fr && mapping.fr.toLowerCase() === directTarget)
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
      const tText = t.text.toLowerCase();
      return tText === cleanKey;
    });
  });

  if (matrixMatch && matrixMatch.translations[baseLang]) {
    return matrixMatch.translations[baseLang].text;
  }

  // 7. Fallback: English translation or primary text
  return item.english || (item as any).englishWord || item.translation || item.meaning || item.phrase || item.russian || '';
};

/**
 * Localized Language Names in the native speaker's tongue
 */
export const LANGUAGE_NAMES_IN_BASE: Record<SupportedLanguageId, Record<SupportedLanguageId, string>> = {
  en: { en: 'English', es: 'Spanish', fr: 'French', ru: 'Russian' },
  es: { en: 'inglés', es: 'español', fr: 'francés', ru: 'ruso' },
  fr: { en: 'anglais', es: 'espagnol', fr: 'français', ru: 'russe' },
  ru: { en: 'английском', es: 'испанском', fr: 'французском', ru: 'русском' }
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
      case 'en':
      default:
        return `How do you say "${promptWord}" in ${targetNameInBase}?`;
    }
  }
};
