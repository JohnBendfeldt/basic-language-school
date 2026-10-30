#!/usr/bin/env python3
"""
Appends missing high-frequency vocabulary entries to EXTENDED_DICTIONARY in translationResolver.ts.
"""

from pathlib import Path
import re

ROOT = Path('/Users/johnbendfeldt/Documents/basic-language-school')
TR_PATH = ROOT / 'src' / 'utils' / 'translationResolver.ts'

ADDITIONS = {
  'strawberry': { 'en': 'Strawberry', 'es': 'Fresa', 'fr': 'Fraise', 'ru': 'Клубника', 'pt': 'Morango', 'de': 'Erdbeere', 'id': 'Stroberi', 'tr': 'Çilek', 'ko': '딸기', 'ja': 'いちご / 苺' },
  'garlic': { 'en': 'Garlic', 'es': 'Ajo', 'fr': 'Ail', 'ru': 'Чеснок', 'pt': 'Alho', 'de': 'Knoblauch', 'id': 'Bawang putih', 'tr': 'Sarımsak', 'ko': '마늘', 'ja': 'にんにく / 大蒜' },
  'potato': { 'en': 'Potato', 'es': 'Patata / Papa', 'fr': 'Pomme de terre', 'ru': 'Картофель', 'pt': 'Batata', 'de': 'Kartoffel', 'id': 'Kentang', 'tr': 'Patates', 'ko': '감자', 'ja': 'じゃがいも / 馬鈴薯' },
  'onion': { 'en': 'Onion', 'es': 'Cebolla', 'fr': 'Oignon', 'ru': 'Лук', 'pt': 'Cebola', 'de': 'Zwiebel', 'id': 'Bawang bombay', 'tr': 'Soğan', 'ko': '양파', 'ja': '玉ねぎ / タマネギ' },
  'carrot': { 'en': 'Carrot', 'es': 'Zanahoria', 'fr': 'Carotte', 'ru': 'Морковь', 'pt': 'Cenoura', 'de': 'Karotte', 'id': 'Wortel', 'tr': 'Havuç', 'ko': '당근', 'ja': 'にんじん / 人参' },
  'spoon': { 'en': 'Spoon', 'es': 'Cuchara', 'fr': 'Cuillère', 'ru': 'Ложка', 'pt': 'Colher', 'de': 'Löffel', 'id': 'Sendok', 'tr': 'Kaşık', 'ko': '숟가락', 'ja': 'スプーン' },
  'fork': { 'en': 'Fork', 'es': 'Tenedor', 'fr': 'Fourchette', 'ru': 'Вилка', 'pt': 'Garfo', 'de': 'Gabel', 'id': 'Garpu', 'tr': 'Çatal', 'ko': '포크', 'ja': 'フォーク' },
  'knife': { 'en': 'Knife', 'es': 'Cuchillo', 'fr': 'Couteau', 'ru': 'Нож', 'pt': 'Faca', 'de': 'Messer', 'id': 'Pisau', 'tr': 'Bıçak', 'ko': '칼', 'ja': 'ナイフ / 包丁' },
  'plate': { 'en': 'Plate', 'es': 'Plato', 'fr': 'Assiette', 'ru': 'Тарелка', 'pt': 'Prato', 'de': 'Teller', 'id': 'Piring', 'tr': 'Tabak', 'ko': '접시', 'ja': '皿 / お皿' },
  'bicycle': { 'en': 'Bicycle', 'es': 'Bicicleta', 'fr': 'Vélo / Bicyclette', 'ru': 'Велосипед', 'pt': 'Bicicleta', 'de': 'Fahrrad', 'id': 'Sepeda', 'tr': 'Bisiklet', 'ko': '자전거', 'ja': '自転車' },
  'suitcase': { 'en': 'Suitcase', 'es': 'Maleta', 'fr': 'Valise', 'ru': 'Чемодан', 'pt': 'Mala', 'de': 'Koffer', 'id': 'Koper', 'tr': 'Bavul', 'ko': '여행가방 / 캐리어', 'ja': 'スーツケース' },
  'backpack': { 'en': 'Backpack', 'es': 'Mochila', 'fr': 'Sac à dos', 'ru': 'Рюкзак', 'pt': 'Mochila', 'de': 'Rucksack', 'id': 'Ransel', 'tr': 'Sırt çantası', 'ko': '배낭 / 책가방', 'ja': 'リュックサック' },
  'wallet': { 'en': 'Wallet', 'es': 'Billetera / Cartera', 'fr': 'Portefeuille', 'ru': 'Кошелёк', 'pt': 'Carteira', 'de': 'Geldbörse', 'id': 'Dompet', 'tr': 'Cüzdan', 'ko': '지갑', 'ja': '財布' },
  'ambulance': { 'en': 'Ambulance', 'es': 'Ambulancia', 'fr': 'Ambulance', 'ru': 'Скорая помощь', 'pt': 'Ambulância', 'de': 'Krankenwagen', 'id': 'Ambulans', 'tr': 'Ambulans', 'ko': '구급차', 'ja': '救急車' },
  'firefighter': { 'en': 'Firefighter', 'es': 'Bombero', 'fr': 'Pompier', 'ru': 'Пожарный', 'pt': 'Bombeiro', 'de': 'Feuerwehrmann', 'id': 'Pemadam kebakaran', 'tr': 'İtfaiyeci', 'ko': '소방관', 'ja': '消防士' },
  'beach': { 'en': 'Beach', 'es': 'Playa', 'fr': 'Plage', 'ru': 'Пляж', 'pt': 'Praia', 'de': 'Strand', 'id': 'Pantai', 'tr': 'Plaj', 'ko': '해변', 'ja': '浜辺 / ビーチ' },
  'mountain': { 'en': 'Mountain', 'es': 'Montaña', 'fr': 'Montagne', 'ru': 'Гора', 'pt': 'Montanha', 'de': 'Berg', 'id': 'Gunung', 'tr': 'Dağ', 'ko': '산', 'ja': '山' },
  'river': { 'en': 'River', 'es': 'Río', 'fr': 'Rivière / Fleuve', 'ru': 'Река', 'pt': 'Rio', 'de': 'Fluss', 'id': 'Sungai', 'tr': 'Nehir', 'ko': '강', 'ja': '川' },
  'lake': { 'en': 'Lake', 'es': 'Lago', 'fr': 'Lac', 'ru': 'Озеро', 'pt': 'Lago', 'de': 'See', 'id': 'Danau', 'tr': 'Göl', 'ko': '호수', 'ja': '湖' },
  'bedroom': { 'en': 'Bedroom', 'es': 'Dormitorio / Habitación', 'fr': 'Chambre', 'ru': 'Спальня', 'pt': 'Quarto', 'de': 'Schlafzimmer', 'id': 'Kamar tidur', 'tr': 'Yatak odası', 'ko': '침실', 'ja': '寝室' },
  'closet': { 'en': 'Closet', 'es': 'Armario', 'fr': 'Placard / Armoire', 'ru': 'Шкаф', 'pt': 'Armário', 'de': 'Kleiderschrank', 'id': 'Lemari pakaian', 'tr': 'Gardırop', 'ko': '옷장', 'ja': 'クローゼット' },
  'glasses': { 'en': 'Glasses', 'es': 'Gafas / Lentes', 'fr': 'Lunettes', 'ru': 'Очки', 'pt': 'Óculos', 'de': 'Brille', 'id': 'Kaca mata', 'tr': 'Gözlük', 'ko': '안경', 'ja': '眼鏡 / メガネ' },
  'notebook': { 'en': 'Notebook', 'es': 'Cuaderno', 'fr': 'Carnet / Cahier', 'ru': 'Тетрадь / Блокнот', 'pt': 'Caderno', 'de': 'Notizbuch', 'id': 'Buku catatan', 'tr': 'Defter', 'ko': '공책 / 수첩', 'ja': 'ノート' },
  'pen': { 'en': 'Pen', 'es': 'Bolígrafo / Pluma', 'fr': 'Stylo', 'ru': 'Ручка', 'pt': 'Caneta', 'de': 'Kugelschreiber', 'id': 'Pena tinta', 'tr': 'Tükenmez kalem', 'ko': '펜', 'ja': 'ペン' },
  'pencil': { 'en': 'Pencil', 'es': 'Lápiz', 'fr': 'Crayon', 'ru': 'Карандаш', 'pt': 'Lápis', 'de': 'Bleistift', 'id': 'Pensil kayu', 'tr': 'Kurşun kalem', 'ko': '연필', 'ja': '鉛筆' }
}

def main():
    txt = TR_PATH.read_text(encoding='utf-8')
    
    insert_lines = []
    for k, v in ADDITIONS.items():
        if f"'{k}': {{" not in txt:
            line_parts = [f"{lang}: '{val}'" for lang, val in v.items()]
            insert_lines.append(f"  '{k}': {{ {', '.join(line_parts)} }},")
    
    if insert_lines:
        insert_str = "\n" + "\n".join(insert_lines) + "\n"
        # Insert right before the end of EXTENDED_DICTIONARY
        pos = txt.find("};\n\n/**\n * Extended Russian")
        if pos == -1:
            pos = txt.find("};\n\nexport const")
        if pos != -1:
            txt = txt[:pos] + insert_str + txt[pos:]
            TR_PATH.write_text(txt, encoding='utf-8')
            print(f"Added {len(insert_lines)} items to EXTENDED_DICTIONARY.")
        else:
            print("Could not find insertion marker in translationResolver.ts")
    else:
        print("All additions already present.")

if __name__ == '__main__':
    main()
