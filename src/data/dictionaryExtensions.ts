import { SupportedLanguageId } from './languages/types';

/**
 * Supplemental multi-language dictionary entries ensuring 100% coverage across
 * all 15 supported languages (including Bengali `bn`, Urdu `ur`, Mandarin `zh`,
 * Japanese `ja`, Korean `ko`, Hindi `hi`, Arabic `ar`, and European languages)
 * for every word, phrase, and time expression in the English & cross-language curricula.
 */
export const SUPPLEMENTAL_DICTIONARY: Record<string, Partial<Record<SupportedLanguageId, string>>> = {
  // Exact 15-language English basicPhrases & time expressions so multi-word phrases never match partial words
  'have a great day': {
    en: 'Have a great day', es: 'Que tengas un excelente día', fr: 'Passez une excellente journée', ru: 'Хорошего дня!', pt: 'Tenha um ótimo dia', de: 'Schönen Tag noch!', id: 'Semoga harimu menyenangkan', tr: 'İyi günler dilerim',
    zh: '祝你有美好的一天', ja: '良い一日をお過ごしください', ko: '좋은 하루 보내세요', hi: 'आपका दिन शुभ हो', ar: 'أتمنى لك يوماً رائعاً', bn: 'আপনার দিনটি দারুণ কাটুক', ur: 'آپ کا دن اچھا گزرے'
  },
  'have a nice day': {
    en: 'Have a nice day', es: 'Que tengas un buen día', fr: 'Bonne journée', ru: 'Хорошего дня', pt: 'Tenha um bom dia', de: 'Schönen Tag', id: 'Semoga harimu menyenangkan', tr: 'İyi günler',
    zh: '祝你今天愉快', ja: '良い一日を', ko: '좋은 하루 되세요', hi: 'आपका दिन अच्छा रहे', ar: 'طاب يومك', bn: 'আপনার দিনটি শুভ হোক', ur: 'آپ کا دن خوشگوار گزرے'
  },
  'thank you very much': {
    en: 'Thank you very much', es: 'Muchas gracias', fr: 'Merci beaucoup', ru: 'Большое спасибо', pt: 'Muito obrigado', de: 'Vielen Dank', id: 'Terima kasih banyak', tr: 'Çok teşekkür ederim',
    zh: '非常感谢', ja: 'どうもありがとうございます', ko: '정말 감사합니다', hi: 'बहुत-बहुत धन्यवाद', ar: 'شكراً جزيلاً', bn: 'অনেক ধন্যবাদ', ur: 'بہت بہت شکریہ'
  },
  'where is the bus stop?': {
    en: 'Where is the bus stop?', es: '¿Dónde está la parada de autobús?', fr: 'Où est l’arrêt de bus ?', ru: 'Где автобусная остановка?', pt: 'Onde fica o ponto de ônibus?', de: 'Wo ist die Bushaltestelle?', id: 'Di mana halte bus?', tr: 'Otobüs durağı nerede?',
    zh: '公交车站在哪里？', ja: 'バス停はどこですか？', ko: '버스 정류장이 어디에 있나요?', hi: 'बस स्टॉप कहाँ है?', ar: 'أين موقف الحافلة؟', bn: 'বাস স্টপ কোথায়?', ur: 'بس اسٹاپ کہاں ہے؟'
  },
  'i would like a coffee, please': {
    en: 'I would like a coffee, please', es: 'Quisiera un café, por favor', fr: 'Je voudrais un café, s’il vous plaît', ru: 'Мне кофе, пожалуйста', pt: 'Eu gostaria de um café, por favor', de: 'Ich hätte gern einen Kaffee, bitte', id: 'Saya mau kopi, tolong', tr: 'Bir kahve alabilir miyim lütfen',
    zh: '请给我来一杯咖啡', ja: 'コーヒーを一つお願いします', ko: '커피 한 잔 주세요', hi: 'मुझे एक कॉफ़ी चाहिए, कृपया', ar: 'أود قهوة من فضلك', bn: 'দয়া করে আমাকে এক কাপ কফি দিন', ur: 'براہِ کرم مجھے ایک کافی دیجیے'
  },
  'a bottle of water, please': {
    en: 'A bottle of water, please', es: 'Una botella de agua, por favor', fr: 'Une bouteille d’eau, s’il vous plaît', ru: 'Бутылку воды, пожалуйста', pt: 'Uma garrafa de água, por favor', de: 'Eine Flasche Wasser, bitte', id: 'Sebotol air, tolong', tr: 'Bir şişe su lütfen',
    zh: '请给我一瓶水', ja: 'お水を一本お願いします', ko: '물 한 병 주세요', hi: 'कृपया पानी की एक बोतल दीजिए', ar: 'زجاجة ماء من فضلك', bn: 'দয়া করে এক বোতল পানি দিন', ur: 'براہِ کرم پانی کی ایک بوتل دیجیے'
  },
  'how much does this cost?': {
    en: 'How much does this cost?', es: '¿Cuánto cuesta esto?', fr: 'Combien ça coûte ?', ru: 'Сколько это стоит?', pt: 'Quanto custa isto?', de: 'Wie viel kostet das?', id: 'Berapa harganya ini?', tr: 'Bunun fiyatı ne kadar?',
    zh: '这个多少钱？', ja: 'これはいくらですか？', ko: '이것은 얼마인가요?', hi: 'इसकी क़ीमत कितनी है?', ar: 'كم سعر هذا؟', bn: 'এটার দাম কত?', ur: 'اس کی قیمت کتنی ہے؟'
  },
  'do you speak english?': {
    en: 'Do you speak English?', es: '¿Hablas inglés?', fr: 'Parlez-vous anglais ?', ru: 'Вы говорите по-английски?', pt: 'Você fala inglês?', de: 'Sprechen Sie Englisch?', id: 'Apakah Anda bisa berbahasa Inggris?', tr: 'İngilizce biliyor musunuz?',
    zh: '你会说英语吗？', ja: '英語を話せますか？', ko: '영어를 하시나요?', hi: 'क्या आप अंग्रेज़ी बोलते हैं?', ar: 'هل تتحدث الإنجليزية؟', bn: 'আপনি কি ইংরেজি বলতে পারেন?', ur: 'کیا آپ انگریزی بولتے ہیں؟'
  },
  'can you hear me?': {
    en: 'Can you hear me?', es: '¿Me escuchas?', fr: 'Vous m’entendez ?', ru: 'Меня слышно?', pt: 'Você está me ouvindo?', de: 'Können Sie mich hören?', id: 'Apakah Anda bisa mendengar saya?', tr: 'Beni duyabiliyor musunuz?',
    zh: '你能听到我说话吗？', ja: '私の声が聞こえますか？', ko: '제 목소리 들리시나요?', hi: 'क्या आप मुझे सुन पा रहे हैं?', ar: 'هل تسمعني؟', bn: 'আপনি কি আমার কথা শুনতে পাচ্ছেন?', ur: 'کیا آپ کو میری آواز آ رہی ہے؟'
  },
  'what is the wi-fi password?': {
    en: 'What is the Wi-Fi password?', es: '¿Cuál es la contraseña del Wi-Fi?', fr: 'Quel est le mot de passe du Wi-Fi ?', ru: 'Какой пароль от Wi-Fi?', pt: 'Qual é a senha do Wi-Fi?', de: 'Wie lautet das WLAN-Passwort?', id: 'Apa kata sandi Wi-Fi-nya?', tr: 'Wi-Fi şifresi nedir?',
    zh: 'Wi-Fi 密码是多少？', ja: 'Wi-Fiのパスワードは何ですか？', ko: '와이파이 비밀번호가 무엇인가요?', hi: 'वाई-फ़ाई का पासवर्ड क्या है?', ar: 'ما هي كلمة مرور الواي فاي؟', bn: 'ওয়াই-ফাই পাসওয়ার্ড কী?', ur: 'وائی فائی کا پاس ورڈ کیا ہے؟'
  },
  'i need a doctor': {
    en: 'I need a doctor', es: 'Necesito un médico', fr: 'J’ai besoin d’un médecin', ru: 'Мне нужен врач', pt: 'Preciso de um médico', de: 'Ich brauche einen Arzt', id: 'Saya butuh dokter', tr: 'Doktora ihtiyacım var',
    zh: '我需要看医生', ja: '医者が必要です', ko: '의사가 필요해요', hi: 'मुझे डॉक्टर की ज़रूरत है', ar: 'أحتاج إلى طبيب', bn: 'আমার একজন ডাক্তার দরকার', ur: 'مجھے ڈاکٹر کی ضرورت ہے'
  },
  'where is the nearest pharmacy?': {
    en: 'Where is the nearest pharmacy?', es: '¿Dónde está la farmacia más cercana?', fr: 'Où est la pharmacie la plus proche ?', ru: 'Где ближайшая аптека?', pt: 'Onde fica a farmácia mais próxima?', de: 'Wo ist die nächste Apotheke?', id: 'Di mana apotek terdekat?', tr: 'En yakın eczane nerede?',
    zh: '最近的药店在哪里？', ja: '一番近い薬局はどこですか？', ko: '가장 가까운 약국이 어디인가요?', hi: 'सबसे नज़दीकी दवाखाना कहाँ है?', ar: 'أين أقرب صيدلية؟', bn: 'সবচেয়ে কাছের ফার্মেসি কোথায়?', ur: 'سب سے قریبی دواخانہ کہاں ہے؟'
  },
  'i have a reservation': {
    en: 'I have a reservation', es: 'Tengo una reserva', fr: 'J’ai une réservation', ru: 'У меня бронь', pt: 'Tenho uma reserva', de: 'Ich habe eine Reservierung', id: 'Saya sudah pesan tempat', tr: 'Rezervasyonum var',
    zh: '我有预订', ja: '予約しています', ko: '예약했습니다', hi: 'मेरी बुकिंग (आरक्षण) है', ar: 'لدي حجز', bn: 'আমার বুকিং আছে', ur: 'میری بکنگ ہے'
  },
  'where is the train station?': {
    en: 'Where is the train station?', es: '¿Dónde está la estación de tren?', fr: 'Où est la gare ?', ru: 'Где железнодорожный вокзал?', pt: 'Onde fica a estação de trem?', de: 'Wo ist der Bahnhof?', id: 'Di mana stasiun kereta?', tr: 'Tren istasyonu nerede?',
    zh: '火车站在哪里？', ja: '駅はどこですか？', ko: '기차역이 어디에 있나요?', hi: 'रेलवे स्टेशन कहाँ है?', ar: 'أين محطة القطار؟', bn: 'রেলস্টেশন কোথায়?', ur: 'ریلوے اسٹیشن کہاں ہے؟'
  },
  'a table for two, please': {
    en: 'A table for two, please', es: 'Una mesa para dos, por favor', fr: 'Une table pour deux, s’il vous plaît', ru: 'Столик на двоих, пожалуйста', pt: 'Uma mesa para dois, por favor', de: 'Einen Tisch für zwei, bitte', id: 'Meja untuk dua orang, tolong', tr: 'İki kişilik bir masa lütfen',
    zh: '请给我一张两人桌', ja: '2名席をお願いします', ko: '두 명 자리 부탁합니다', hi: 'कृपया दो लोगों के लिए एक मेज़ दीजिए', ar: 'طاولة لشخصين من فضلك', bn: 'দয়া করে দুজনের একটি টেবিল দিন', ur: 'براہِ کرم دو افراد کے لیے میز دیجیے'
  },
  'the menu, please': {
    en: 'The menu, please', es: 'El menú, por favor', fr: 'La carte, s’il vous plaît', ru: 'Меню, пожалуйста', pt: 'O cardápio, por favor', de: 'Die Speisekarte, bitte', id: 'Menunya, tolong', tr: 'Menü lütfen',
    zh: '请给我菜单', ja: 'メニューをお願いします', ko: '메뉴판 좀 주세요', hi: 'कृपया मेन्यू दीजिए', ar: 'قائمة الطعام من فضلك', bn: 'দয়া করে মেনুটা দিন', ur: 'براہِ کرم مینو دیجیے'
  },
  'what time is it?': {
    en: 'What time is it?', es: '¿Qué hora es?', fr: 'Quelle heure est-il ?', ru: 'Который час?', pt: 'Que horas são?', de: 'Wie spät ist es?', id: 'Jam berapa sekarang?', tr: 'Saat kaç?',
    zh: '现在几点了？', ja: '今何時ですか？', ko: '지금 몇 시인가요?', hi: 'अभी क्या समय हुआ है?', ar: 'كم الساعة؟', bn: 'এখন কয়টা বাজে?', ur: 'کیا وقت ہوا ہے؟'
  },
  'half past two': {
    en: 'Half past two (2:30)', es: 'Las dos y media (2:30)', fr: 'Deux heures et demie (2h30)', ru: 'Половина третьего (2:30)', pt: 'Duas e meia (2:30)', de: 'Halb drei (2:30)', id: 'Setengah tiga (2:30)', tr: 'Saat iki buçuk (2:30)',
    zh: '两点半 (2:30)', ja: '2時30分（2時半）', ko: '2시 30분 (두 시 반)', hi: 'ढाई बजे (2:30)', ar: 'الثانية والنصف (2:30)', bn: 'আড়াইটা বাজে (২:৩০)', ur: 'ڈھائی بجے (2:30)'
  },
  'quarter to three': {
    en: 'Quarter to three (2:45)', es: 'Las tres menos cuarto (2:45)', fr: 'Trois heures moins le quart (2h45)', ru: 'Без четверти три (2:45)', pt: 'Quinze para as três (2:45)', de: 'Viertel vor drei (2:45)', id: 'Jam tiga kurang seperempat (2:45)', tr: 'Üçe çeyrek var (2:45)',
    zh: '差一刻三点 / 两点四十五 (2:45)', ja: '3時15分前 (2:45)', ko: '3시 15분 전 (2:45)', hi: 'पौने तीन बजे (2:45)', ar: 'الثالثة إلا ربعاً (2:45)', bn: 'পৌনে তিনটে (২:৪৫)', ur: 'پونے تین بجے (2:45)'
  },
  'in the evening': {
    en: 'In the evening', es: 'Por la tarde / noche', fr: 'Le soir', ru: 'Вечером', pt: 'À noite', de: 'Am Abend', id: 'Di malam hari', tr: 'Akşamleyin',
    zh: '在晚上 (下午/傍晚)', ja: '夕方に・夜に', ko: '저녁에 (오후)', hi: 'शाम को', ar: 'في المساء', bn: 'সন্ধ্যায়', ur: 'شام کو'
  },
  'hello (formal)': { zh: '您好（正式）', ja: 'こんにちは（丁寧）', ko: '안녕하십니까 (격식)', hi: 'नमस्ते (औपचारिक)', ar: 'مرحباً (رسمي)', bn: 'নমস্কার / আসসালামু আলাইকুম', ur: 'السلام علیکم / آداب' },
  'hello (informal)': { zh: '嗨 / 你好（日常）', ja: 'やあ / こんにちは', ko: '안녕 (반말)', hi: 'हैलो / नमस्ते', ar: 'أهلاً', bn: 'হ্যালো / হাই', ur: 'ہیلو' },
  'good night': { zh: '晚安', ja: 'おやすみなさい', ko: '안녕히 주무세요', hi: 'शुभ रात्रि', ar: 'تصبح على خير', bn: 'শুভ রাত্রি', ur: 'شب بخیر' },
  'i am fine, thank you': { zh: '我很好，谢谢', ja: '元気です、ありがとう', ko: '잘 지내요, 감사합니다', hi: 'मैं ठीक हूँ, धन्यवाद', ar: 'أنا بخير، شكراً', bn: 'আমি ভালো আছি, ধন্যবাদ', ur: 'میں ٹھیک ہوں، شکریہ' },
  'very well, thank you': { zh: '非常好，谢谢', ja: 'とても元気です、ありがとう', ko: '아주 좋아요, 감사합니다', hi: 'बहुत बढ़िया, धन्यवाद', ar: 'بخير جداً، شكراً', bn: 'খুব ভালো, ধন্যবাদ', ur: 'بہت اچھا، شکریہ' },
  'good / well': { zh: '好 / 很好', ja: '良い / 元気', ko: '좋음 / 잘', hi: 'अच्छा / ठीक', ar: 'جيد / بخير', bn: 'ভালো', ur: 'اچھا / ٹھیک' },
  'bad / poorly': { zh: '不好 / 糟糕', ja: '悪い / 良くない', ko: '나쁨 / 별로', hi: 'ख़राब / बुरा', ar: 'سيئ', bn: 'খারাপ', ur: 'خراب / برا' },
  "i don't understand": { zh: '我不明白', ja: 'わかりません', ko: '이해하지 못했어요', hi: 'मुझे समझ नहीं आया', ar: 'لا أفهم', bn: 'আমি বুঝতে পারছি না', ur: 'مجھے سمجھ نہیں آیا' },
  'please repeat': { zh: '请重复一遍', ja: 'もう一度お願いします', ko: '다시 말씀해 주세요', hi: 'कृपया दोहराइए', ar: 'أعد من فضلك', bn: 'দয়া করে আবার বলুন', ur: 'براہِ کرم دہرائیے' },
  'please speak more slowly': { zh: '请说慢一点', ja: 'もう少しゆっくり話してください', ko: '천천히 말씀해 주세요', hi: 'कृपया धीरे बोलिए', ar: 'تحدث ببطء من فضلك', bn: 'দয়া করে ধীরে বলুন', ur: 'براہِ کرم آہستہ بولیے' },
  'where is the bathroom?': { zh: '洗手间在哪里？', ja: 'お手洗いはどこですか？', ko: '화장실이 어디인가요?', hi: 'बाथरूम कहाँ है?', ar: 'أين الحمام؟', bn: 'বাথরুম কোথায়?', ur: 'واش روم کہاں ہے؟' },
  'where is the airport?': { zh: '机场在哪里？', ja: '空港はどこですか？', ko: '공항이 어디인가요?', hi: 'हवाई अड्डा कहाँ है?', ar: 'أين المطار؟', bn: 'বিমানবন্দর কোথায়?', ur: 'ہوائی اڈہ کہاں ہے؟' },
  'i would like to go to the airport': { zh: '我想去机场', ja: '空港へ行きたいです', ko: '공항에 가고 싶습니다', hi: 'मैं हवाई अड्डे जाना चाहता हूँ', ar: 'أود الذهاب إلى المطار', bn: 'আমি বিমানবন্দরে যেতে চাই', ur: 'میں ہوائی اڈے جانا چاہتا ہوں' },
  'christmas tree': { zh: '圣诞树', ja: 'クリスマスツリー', ko: '크리스마스 트리', hi: 'क्रिसमस ट्री', ar: 'شجرة عيد الميلاد', bn: 'ক্রিসমাস ট্রি', ur: 'کرسمس ٹری' },
  'wagon / car': { zh: '车厢 / 汽车', ja: '車両 / 車', ko: '객차 / 자동차', hi: 'डिब्बा / गाड़ी', ar: 'عربة / سيارة', bn: 'বগি / গাড়ি', ur: 'ڈبہ / گاڑی' },
  'watch / clock': { zh: '手表 / 时钟', ja: '腕時計 / 時計', ko: '손목시계 / 시계', hi: 'घड़ी', ar: 'ساعة يد / ساعة', bn: 'ঘড়ি', ur: 'گھڑی' },
  'clock / watch': { zh: '时钟 / 手表', ja: '時計 / 腕時計', ko: '시계', hi: 'घड़ी', ar: 'ساعة', bn: 'ঘড়ি', ur: 'گھڑی' },

  // High-frequency conversational phrases (15 languages)
  'can i have the check, please?': {
    en: 'Can I have the check, please?',
    es: '¿Me trae la cuenta, por favor?',
    fr: 'L’addition, s’il vous plaît ?',
    ru: 'Можно счёт, пожалуйста?',
    pt: 'Pode trazer a conta, por favor?',
    de: 'Kann ich bitte die Rechnung haben?',
    id: 'Boleh minta bonnya?',
    tr: 'Hesabı alabilir miyim lütfen?',
    zh: '请买单 / 请给我账单',
    ja: 'お会計をお願いします',
    ko: '계산서 좀 주시겠어요?',
    hi: 'कृपया बिल दीजिए?',
    ar: 'هل يمكنني الحصول على الفاتورة من فضلك؟',
    bn: 'দয়া করে বিলটা দেবেন?',
    ur: 'براہِ کرم بل لا دیجیے؟'
  },
  'i do not understand': {
    en: 'I do not understand',
    es: 'No entiendo',
    fr: 'Je ne comprends pas',
    ru: 'Я не понимаю',
    pt: 'Eu não entendo',
    de: 'Ich verstehe nicht',
    id: 'Saya tidak mengerti',
    tr: 'Anlamıyorum',
    zh: '我听不懂 / 我不明白',
    ja: 'わかりません',
    ko: '이해하지 못했어요',
    hi: 'मुझे समझ नहीं आया',
    ar: 'أنا لا أفهم',
    bn: 'আমি বুঝতে পারছি না',
    ur: 'مجھے سمجھ نہیں آیا'
  },
  'can you repeat, please?': {
    en: 'Can you repeat, please?',
    es: '¿Puede repetir, por favor?',
    fr: 'Pouvez-vous répéter, s’il vous plaît ?',
    ru: 'Можете повторить, пожалуйста?',
    pt: 'Pode repetir, por favor?',
    de: 'Können Sie das bitte wiederholen?',
    id: 'Bisa diulangi, tolong?',
    tr: 'Tekrar edebilir misiniz lütfen?',
    zh: '请再说一遍好吗？',
    ja: 'もう一度言っていただけますか？',
    ko: '다시 한번 말씀해 주시겠어요?',
    hi: 'क्या आप कृपया दोहरा सकते हैं?',
    ar: 'هل يمكنك الإعادة من فضلك؟',
    bn: 'দয়া করে আরেকবার বলবেন?',
    ur: 'کیا آپ براہِ کرم دوبارہ کہہ سکتے ہیں؟'
  },
  'could you repeat that, please?': {
    en: 'Could you repeat that, please?',
    es: '¿Podría repetir eso, por favor?',
    fr: 'Pourriez-vous répéter cela, s’il vous plaît ?',
    ru: 'Не могли бы вы повторить, пожалуйста?',
    pt: 'Poderia repetir isso, por favor?',
    de: 'Könnten Sie das bitte wiederholen?',
    id: 'Bisakah Anda mengulanginya?',
    tr: 'Bunu tekrar edebilir misiniz lütfen?',
    zh: '您能再重复一遍吗？',
    ja: 'もう一度繰り返していただけますか？',
    ko: '다시 말씀해 주시겠어요?',
    hi: 'क्या आप इसे कृपया दोहरा सकते हैं?',
    ar: 'هل يمكنك تكرار ذلك من فضلك؟',
    bn: 'দয়া করে কথাটা আরেকবার বলবেন?',
    ur: 'براہِ کرم یہ بات دہرا دیجیے؟'
  },
  'can you repeat?': {
    zh: '能再说一遍吗？', ja: 'もう一度言えますか？', ko: '다시 말해 줄래요?', hi: 'क्या आप दोहरा सकते हैं?', ar: 'هل يمكنك الإعادة؟',
    bn: 'আরেকবার বলবেন?', ur: 'کیا آپ دہرا سکتے ہیں؟'
  },
  "i don't feel well": {
    en: "I don't feel well",
    es: 'No me siento bien',
    fr: 'Je ne me sens pas bien',
    ru: 'Я плохо себя чувствую',
    pt: 'Não me sinto bem',
    de: 'Mir geht es nicht gut',
    id: 'Saya merasa kurang enak badan',
    tr: 'Kendimi iyi hissetmiyorum',
    zh: '我觉得身体不舒服',
    ja: '気分がよくありません',
    ko: '몸이 좋지 않아요',
    hi: 'मेरी तबीयत ठीक नहीं लग रही है',
    ar: 'لا أشعر أنني بخير',
    bn: 'আমার শরীর ভালো লাগছে না',
    ur: 'میری طبیعت ٹھیک نہیں ہے'
  },
  "you're welcome": {
    zh: '不客气', ja: 'どういたしまして', ko: '천만에요', hi: 'कोई बात नहीं / आपका स्वागत है', ar: 'على الرحب والسعة',
    bn: 'স্বাগতম / কিছু মনে করবেন না', ur: 'کوئی بات نہیں / خوش آمدید'
  },
  'you are welcome': {
    zh: '不客气', ja: 'どういたしまして', ko: '천만에요', hi: 'आपका स्वागत है', ar: 'على الرحب والسعة',
    bn: 'স্বাগতম', ur: 'کوئی بات نہیں / خوش آمدید'
  },
  'i am sorry': {
    zh: '对不起', ja: 'ごめんなさい', ko: '미안합니다 / 죄송합니다', hi: 'मुझे खेद है / माफ़ कीजिए', ar: 'أنا آسف',
    bn: 'আমি দুঃখিত', ur: 'مجھے افسوس ہے / معاف کیجیے'
  },
  'where is the restroom?': {
    zh: '洗手间在哪里？', ja: 'お手洗いはどこですか？', ko: '화장실이 어디에 있나요?', hi: 'शौचालय कहाँ है?', ar: 'أين دورة المياه؟',
    bn: 'শৌচাগার / ওয়াশরুম কোথায়?', ur: 'واش روم کہاں ہے؟'
  },
  'where are the restrooms?': {
    zh: '洗手间在哪里？', ja: 'お手洗いはどこですか？', ko: '화장실이 어디에 있나요?', hi: 'शौचालय कहाँ हैं?', ar: 'أين دورات المياه؟',
    bn: 'ওয়াশরুম কোথায়?', ur: 'بیت الخلا کہاں ہیں؟'
  },
  'how do i get to the airport?': {
    zh: '去机场怎么走？', ja: '空港へはどう行けばいいですか？', ko: '공항에 어떻게 가나요?', hi: 'मैं हवाई अड्डे कैसे पहुँचूँ?', ar: 'كيف أصل إلى المطار؟',
    bn: 'আমি বিমানবন্দরে কীভাবে যাব?', ur: 'میں ہوائی اڈے کیسے جاؤں؟'
  },
  'is it far from here?': {
    zh: '离这里远吗？', ja: 'ここから遠いですか？', ko: '여기서 먼가요?', hi: 'क्या यह यहाँ से दूर है?', ar: 'هل هو بعيد من هنا؟',
    bn: 'এটা কি এখান থেকে দূরে?', ur: 'کیا یہ یہاں سے دور ہے؟'
  },
  'could you speak slower, please?': {
    zh: '请您说慢一点好吗？', ja: 'もう少しゆっくり話していただけますか？', ko: '조금 더 천천히 말씀해 주시겠어요?', hi: 'क्या आप कृपया थोड़ा धीरे बोल सकते हैं?', ar: 'هل يمكنك التحدث ببطء أكثر من فضلك؟',
    bn: 'দয়া করে একটু ধীরে কথা বলবেন?', ur: 'براہِ کرم تھوڑا آہستہ بولیے؟'
  },
  'can you speak more slowly?': {
    zh: '能说慢一点吗？', ja: 'もっとゆっくり話せますか？', ko: '더 천천히 말해 주시겠어요?', hi: 'क्या आप धीरे बोल सकते हैं?', ar: 'هل يمكنك التحدث ببطء؟',
    bn: 'আপনি কি আরেকটু ধীরে বলতে পারেন?', ur: 'کیا آپ آہستہ بول سکتے ہیں؟'
  },
  'speak more slowly': {
    zh: '请说慢一点', ja: 'もっとゆっくり話してください', ko: '더 천천히 말해 주세요', hi: 'थोड़ा धीरे बोलिए', ar: 'تحدث ببطء أكثر',
    bn: 'আরও ধীরে বলুন', ur: 'تھوڑا آہستہ بولیں'
  },
  'can you help me?': {
    zh: '您能帮帮我吗？', ja: '手伝っていただけますか？', ko: '도와주시겠어요?', hi: 'क्या आप मेरी मदद कर सकते हैं?', ar: 'هل يمكنك مساعدتي؟',
    bn: 'আপনি কি আমাকে সাহায্য করতে পারেন?', ur: 'کیا آپ میری مدد کر سکتے ہیں؟'
  },
  'i need help': {
    zh: '我需要帮助', ja: '助けが必要です', ko: '도움이 필요해요', hi: 'मुझे मदद चाहिए', ar: 'أحتاج إلى مساعدة',
    bn: 'আমার সাহায্য দরকার', ur: 'مجھے مدد کی ضرورت ہے'
  },
  'help me': {
    zh: '帮帮我', ja: '助けてください', ko: '도와주세요', hi: 'मेरी मदद करो', ar: 'ساعدني',
    bn: 'আমাকে সাহায্য করুন', ur: 'میری مدد کریں'
  },
  'help!': {
    zh: '救命！/ 帮帮我！', ja: '助けて！', ko: '도와주세요!', hi: 'मदद करो!', ar: 'النجدة!',
    bn: 'বাঁচান! / সাহায্য করুন!', ur: 'مدد کریں!'
  },
  'can you see my screen?': {
    zh: '你能看到我的屏幕吗？', ja: '私の画面が見えますか？', ko: '제 화면이 보이시나요?', hi: 'क्या आपको मेरी स्क्रीन दिख रही है?', ar: 'هل ترى شاشتي؟',
    bn: 'আপনি কি আমার স্ক্রিন দেখতে পাচ্ছেন?', ur: 'کیا آپ کو میری اسکرین نظر آ رہی ہے؟'
  },
  'let me share my screen': {
    zh: '让我共享一下屏幕', ja: '画面を共有します', ko: '화면을 공유하겠습니다', hi: 'मैं अपनी स्क्रीन साझा करता हूँ', ar: 'دعني أشارك شاشتي',
    bn: 'আমি আমার স্ক্রিন শেয়ার করছি', ur: 'مجھے اپنی اسکرین شیئر کرنے دیں'
  },
  "let's schedule a meeting": {
    zh: '我们安排一次会议吧', ja: '会議の予定を組みましょう', ko: '회의 일정을 잡읍시다', hi: 'आइए एक मीटिंग तय करें', ar: 'لنحدد موعداً لاجتماع',
    bn: 'চলুন একটি মিটিং নির্ধারণ করি', ur: 'آئیے ایک میٹنگ طے کریں'
  },
  'i will send you an email': {
    zh: '我会给你发一封电子邮件', ja: 'メールをお送りします', ko: '이메일을 보내 드리겠습니다', hi: 'मैं आपको एक ईमेल भेजूँगा', ar: 'سأرسل لك بريداً إلكترونياً',
    bn: 'আমি আপনাকে একটি ইমেইল পাঠাব', ur: 'میں آپ کو ای میل بھیجوں گا'
  },
  'can you send it by email?': {
    zh: '能发电子邮件给我吗？', ja: 'メールで送っていただけますか？', ko: '이메일로 보내 주시겠어요?', hi: 'क्या आप इसे ईमेल से भेज सकते हैं?', ar: 'هل يمكنك إرساله بالبريد الإلكتروني؟',
    bn: 'আপনি কি এটি ইমেইলে পাঠাতে পারবেন?', ur: 'کیا آپ اسے ای میل کے ذریعے بھیج سکتے ہیں؟'
  },
  'when is the deadline?': {
    zh: '截止日期是什么时候？', ja: '締め切りはいつですか？', ko: '마감일이 언제인가요?', hi: 'अंतिम तिथि कब है?', ar: 'متى الموعد النهائي؟',
    bn: 'জমা দেওয়ার শেষ তারিখ কবে?', ur: 'آخری تاریخ کب ہے؟'
  },
  'i am allergic to nuts': {
    zh: '我对坚果过敏', ja: 'ナッツアレルギーがあります', ko: '견과류 알레르기가 있어요', hi: 'मुझे मेवों (नट्स) से एलर्जी है', ar: 'لدي حساسية من المكسرات',
    bn: 'বাদামে আমার অ্যালার্জি আছে', ur: 'مجھے خشک میوہ جات سے الرجی ہے'
  },
  'i need a taxi': {
    zh: '我需要一辆出租车', ja: 'タクシーが必要です', ko: '택시가 필요해요', hi: 'मुझे टैक्सी चाहिए', ar: 'أحتاج إلى سيارة أجرة',
    bn: 'আমার একটি ট্যাক্সি দরকার', ur: 'مجھے ٹیکسی چاہیے'
  },
  'do you accept credit cards?': {
    zh: '可以刷信用卡吗？', ja: 'クレジットカードは使えますか？', ko: '신용카드 결제 되나요?', hi: 'क्या आप क्रेडिट कार्ड स्वीकार करते हैं?', ar: 'هل تقبلون بطاقات الائتمان؟',
    bn: 'আপনারা কি ক্রেডিট কার্ড গ্রহণ করেন?', ur: 'کیا آپ کریڈٹ کارڈ قبول کرتے ہیں؟'
  },
  'can i pay by card?': {
    zh: '可以刷卡支付吗？', ja: 'カードで払えますか？', ko: '카드로 결제할 수 있나요?', hi: 'क्या मैं कार्ड से भुगतान कर सकता हूँ?', ar: 'هل يمكنني الدفع بالبطاقة؟',
    bn: 'আমি কি কার্ডে বিল দিতে পারি?', ur: 'کیا میں کارڈ سے ادائیگی کر سکتا ہوں؟'
  },
  'it is too expensive': {
    zh: '太贵了', ja: '高すぎます', ko: '너무 비싸요', hi: 'यह बहुत महँगा है', ar: 'هذا غالٍ جداً',
    bn: 'এটা অনেক দামি', ur: 'یہ بہت مہنگا ہے'
  },
  'pleased to meet you': {
    zh: '很高兴认识你', ja: 'はじめまして', ko: '만나서 반갑습니다', hi: 'आपसे मिलकर ख़ुशी हुई', ar: 'تشرفنا بمعرفتك',
    bn: 'আপনার সাথে পরিচিত হয়ে ভালো লাগল', ur: 'آپ سے مل کر خوشی ہوئی'
  },
  'no problem': {
    zh: '没问题', ja: '問題ありません', ko: '문제없어요', hi: 'कोई समस्या नहीं', ar: 'لا مشكلة',
    bn: 'কোনো সমস্যা নেই', ur: 'کوئی مسئلہ نہیں'
  },
  'see you soon': {
    zh: '回头见 / 一会儿见', ja: 'またすぐに会いましょう', ko: '곧 또 봐요', hi: 'जल्द ही मिलेंगे', ar: 'أراك قريباً',
    bn: 'শীঘ্রই দেখা হবে', ur: 'جلد ملاقات ہوگی'
  },
  'see you later': {
    zh: '待会儿见 / 再见', ja: 'また後で', ko: '나중에 봐요', hi: 'फिर मिलेंगे', ar: 'أراك لاحقاً',
    bn: 'পরে দেখা হবে', ur: 'پھر ملیں گے'
  },
  'bye (informal)': { bn: 'বিদায়', ur: 'خدا حافظ / بائے' },
  'bye': { bn: 'বিদায়', ur: 'خدا حافظ' },
  'hello! / hi!': { bn: 'হ্যালো! / নমস্কার!', ur: 'ہیلو! / السلام علیکم!' },
  'hi / bye': { bn: 'হাই / বিদায়', ur: 'ہیلو / خدا حافظ' },
  'and you?': { bn: 'আর আপনি?', ur: 'اور آپ؟' },
  'where are you from?': { bn: 'আপনি কোথা থেকে এসেছেন?', ur: 'آپ کہاں سے ہیں؟' },
  'i am from...': { bn: 'আমি ... থেকে এসেছি', ur: 'میرا تعلق ... سے ہے' },
  'i understand': { bn: 'আমি বুঝতে পেরেছি', ur: 'میں سمجھتا ہوں' },
  'i speak a little russian': { bn: 'আমি অল্প রুশ বলতে পারি', ur: 'میں تھوڑی روسی بول لیتا ہوں' },
  'what does this mean?': { bn: 'এর অর্থ কী?', ur: 'اس کا کیا مطلب ہے؟' },
  'how do you say...?': { bn: 'কীভাবে বলেন...?', ur: '... کیسے کہتے ہیں؟' },
  'how do you say this in russian?': { bn: 'এটা রুশ ভাষায় কীভাবে বলে?', ur: 'اسے روسی میں کیسے کہتے ہیں؟' },
  'what time is the departure?': { bn: 'ছাড়ার সময় কখন?', ur: 'روانگی کا وقت کیا ہے؟' },
  'where is the hotel?': { bn: 'হোটেলটি কোথায়?', ur: 'ہوٹل کہاں ہے؟' },
  'how much is a ticket?': { bn: 'টিকিটের দাম কত?', ur: 'ٹکٹ کتنے کا ہے؟' },
  'turn left': { bn: 'বামে ঘুরুন', ur: 'بائیں مڑیں' },
  'turn right': { bn: 'ডানে ঘুরুন', ur: 'دائیں مڑیں' },
  'go straight ahead': { bn: 'সোজা সামনে যান', ur: 'سیدھے آگے جائیں' },
  'can i see the menu, please?': { bn: 'দয়া করে মেনুটা দেখতে পারি?', ur: 'کیا میں مینو دیکھ سکتا ہوں؟' },
  'i want to eat': { bn: 'আমি খেতে চাই', ur: 'میں کھانا چاہتا ہوں' },
  'i want to drink': { bn: 'আমি পান করতে চাই', ur: 'میں پینا چاہتا ہوں' },
  'i eat': { bn: 'আমি খাই', ur: 'میں کھاتا ہوں' },
  'what do you recommend?': { bn: 'আপনি কী সুপারিশ করেন?', ur: 'آپ کیا تجویز کرتے ہیں؟' },
  'this is delicious!': { bn: 'এটা দারুণ সুস্বাদু!', ur: 'یہ بہت مزیدار ہے!' },
  'how much does it cost?': { bn: 'এটার দাম কত?', ur: 'اس کی قیمت کتنی ہے؟' },
  'i am just looking': { bn: 'আমি শুধু দেখছি', ur: 'میں صرف دیکھ رہا ہوں' },
  'do you have this in another size?': { bn: 'এটা কি অন্য সাইজে আছে?', ur: 'کیا یہ دوسرے سائز میں موجود ہے؟' },
  'i lost my passport': { bn: 'আমি আমার পাসপোর্ট হারিয়ে ফেলেছি', ur: 'میرا پاسپورٹ کھو گیا ہے' },
  'what time is it now?': { bn: 'এখন কয়টা বাজে?', ur: 'ابھی کیا وقت ہوا ہے؟' },
  'at what time?': { bn: 'কয়টার সময়?', ur: 'کس وقت؟' },
  'my battery is almost dead': { bn: 'আমার ফোনের ব্যাটারি প্রায় শেষ', ur: 'میری بیٹری ختم ہونے والی ہے' },

  // Clock & Time expressions (Bengali & Urdu + cross-language)
  "one o'clock": { bn: 'একটা বাজে (১:০০)', ur: 'ایک بجا ہے (1:00)' },
  'it is 1:00 sharp': { bn: 'ঠিক একটা বাজে', ur: 'ٹھیک ایک بجا ہے' },
  "two o'clock": {
    en: "Two o'clock (2:00)", es: 'Las dos en punto (2:00)', fr: 'Deux heures (2h00)', ru: 'Два часа ровно (2:00)', pt: 'Duas horas em ponto (2:00)', de: 'Zwei Uhr (2:00)', id: 'Jam dua tepat (2:00)', tr: 'Saat tam iki (2:00)',
    zh: '两点整 (2:00)', ja: '2時ちょうど (2:00)', ko: '2시 정각 (2:00)', hi: 'दो बजे (2:00)', ar: 'الساعة الثانية تماماً (2:00)', bn: 'দুটো বাজে (২:০০)', ur: 'دو بجے ہیں (2:00)'
  },
  "three o'clock": { bn: 'তিনটে বাজে (৩:০০)', ur: 'تین بجے ہیں (3:00)' },
  "it is three o'clock": { bn: 'এখন তিনটে বাজে', ur: 'تین بجے ہیں' },
  "exactly three o'clock": { bn: 'ঠিক তিনটে বাজে (৩:০০)', ur: 'ٹھیک تین بجے ہیں (3:00)' },
  "four o'clock": { bn: 'চারটে বাজে (৪:০০)', ur: 'چار بجے ہیں (4:00)' },
  "it is four o'clock": { bn: 'এখন চারটে বাজে', ur: 'چار بجے ہیں' },
  "five o'clock": { bn: 'পাঁচটা বাজে (৫:০০)', ur: 'پانچ بجے ہیں (5:00)' },
  "it is five o'clock": { bn: 'এখন পাঁচটা বাজে', ur: 'پانچ بجے ہیں' },
  "six o'clock": { bn: 'ছয়টা বাজে (৬:০০)', ur: 'چھ بجے ہیں (6:00)' },
  "it is six o'clock": { bn: 'এখন ছয়টা বাজে', ur: 'چھ بجے ہیں' },
  "seven o'clock": { bn: 'সাতটা বাজে (৭:০০)', ur: 'سات بجے ہیں (7:00)' },
  "it is seven o'clock": { bn: 'এখন সাতটা বাজে', ur: 'سات بجے ہیں' },
  "eight o'clock": { bn: 'আটটা বাজে (৮:০০)', ur: 'آٹھ بجے ہیں (8:00)' },
  "it is eight o'clock": { bn: 'এখন আটটা বাজে', ur: 'آٹھ بجے ہیں' },
  "nine o'clock": { bn: 'নয়টা বাজে (৯:০০)', ur: 'نو بجے ہیں (9:00)' },
  "it is nine o'clock": { bn: 'এখন নয়টা বাজে', ur: 'نو بجے ہیں' },
  "ten o'clock": { bn: 'দশটা বাজে (১০:০০)', ur: 'دس بجے ہیں (10:00)' },
  "it is ten o'clock": { bn: 'এখন দশটা বাজে', ur: 'دس بجے ہیں' },
  "eleven o'clock": { bn: 'এগারোটা বাজে (১১:০০)', ur: 'گیارہ بجے ہیں (11:00)' },
  "it is eleven o'clock": { bn: 'এখন এগারোটা বাজে', ur: 'گیارہ بجے ہیں' },
  "twelve o'clock": { bn: 'বারোটা বাজে (১২:০০)', ur: 'بارہ بجے ہیں (12:00)' },
  'half past twelve': { bn: 'সাড়ে বারোটা (১২:৩০)', ur: 'ساڑھے بارہ بجے (12:30)' },
  'ten to two': { bn: 'দুটো বাজতে দশ মিনিট বাকি (১:৫০)', ur: 'دو بجنے میں دس منٹ (1:50)' },
  'half an hour': { bn: 'আধা ঘণ্টা', ur: 'آدھا گھنٹہ' },
  'quarter of an hour': { bn: 'পনেরো মিনিট / এক পোয়া ঘণ্টা', ur: 'پندرہ منٹ / سوا گھنٹے کا چوتھائی' },
  'noon / midday': { bn: 'দুপুর বারোটা / মধ্যাহ্ন', ur: 'دوپہر بارہ بجے' },
  'on time': { bn: 'সময়মতো', ur: 'وقت پر' },
  'hour': { bn: 'ঘণ্টা', ur: 'گھنٹہ' },
  'minute': { bn: 'মিনিট', ur: 'منٹ' },
  'second': { bn: 'সেকেন্ড', ur: 'سیکنڈ' },
  'early': { bn: 'তাড়াতাড়ি / আগেভাগে', ur: 'جلدی / وقت سے پہلے' },
  'late': { bn: 'দেরি', ur: 'دیر سے' },
  'time': { hi: 'समय / वक़्त', bn: 'সময়', ur: 'وقت' },
  'time / weather': { bn: 'সময় / আবহাওয়া', ur: 'وقت / موسم' },
  'monday': { bn: 'সোমবার', ur: 'پیر' },
  'tuesday': { bn: 'মঙ্গলবার', ur: 'منگل' },
  'wednesday': { bn: 'বুধবার', ur: 'بدھ' },
  'thursday': { bn: 'বৃহস্পতিবার', ur: 'جمعرات' },
  'friday': { bn: 'শুক্রবার', ur: 'جمعہ' },
  'saturday': { bn: 'শনিবার', ur: 'ہفتہ' },
  'sunday': { bn: 'রবিবার', ur: 'اتوار' },

  // Core Vocabulary Words (Bengali, Urdu & Hindi)
  'house': { bn: 'বাড়ি / ঘর', ur: 'گھر / مکان' },
  'name': { bn: 'নাম', ur: 'نام' },
  'quiet': { bn: 'শান্ত / নীরব', ur: 'خاموش / پرسکون' },
  'voice': { bn: 'কণ্ঠস্বর / আওয়াজ', ur: 'آواز' },
  'x-ray': { bn: 'এক্স-রে (রঞ্জনরশ্মি)', ur: 'ایکس رے' },
  'umbrella': { bn: 'ছাতা', ur: 'چھتری' },
  'orange': { bn: 'কমলা / কমলালেবু', ur: 'مالٹا / نارنگی' },
  'ice': { bn: 'বরফ', ur: 'برف' },
  'light': { bn: 'আলো', ur: 'روشنی' },
  'food': { bn: 'খাবার', ur: 'کھانا / خوراک' },
  'food / meal': { bn: 'খাবার / আহার', ur: 'کھانا' },
  'breakfast': { bn: 'সকালের নাস্তা', ur: 'ناشتہ' },
  'lunch': { bn: 'দুপুরের খাবার', ur: 'دوپہر کا کھانا' },
  'dinner': { bn: 'রাতের খাবার', ur: 'رات کا کھانا' },
  'restaurant': { bn: 'রেস্তোরাঁ', ur: 'ریستوراں' },
  'pharmacy': { bn: 'ওষুধের দোকান / ফার্মেসি', ur: 'دواخانہ / فارمیسی' },
  'supermarket': { bn: 'সুপারমার্কেট', ur: 'سپر مارکیٹ' },
  'bank': { bn: 'ব্যাংক', ur: 'بینک' },
  'family': { bn: 'পরিবার', ur: 'خاندان' },
  'child': { bn: 'শিশু / সন্তান', ur: 'بچہ' },
  'ticket': { bn: 'টিকিট', ur: 'ٹکٹ' },
  'passport': { bn: 'পাসপোর্ট', ur: 'پاسپورٹ' },
  'to learn': { bn: 'শেখা', ur: 'سیکھنا' },
  'to speak': { bn: 'কথা বলা', ur: 'بولنا' },
  'to eat': { bn: 'খাওয়া', ur: 'کھانا' },
  'to drink': { bn: 'পান করা', ur: 'پینا' },
  'to go': { bn: 'যাওয়া', ur: 'جانا' },
  'to understand': { bn: 'বোঝা', ur: 'سمجھنا' },
  'to come': { bn: 'আসা', ur: 'آنا' },
  'to know': { bn: 'জানা', ur: 'جاننا' },
  'to buy': { bn: 'কেনা', ur: 'خریدنا' },
  'to help': { bn: 'সাহায্য করা', ur: 'مدد کرنا' },
  'to work': { bn: 'কাজ করা', ur: 'کام کرنا' },
  'to want': { bn: 'চাওয়া', ur: 'چاہنا' },
  'to need': { bn: 'প্রয়োজন হওয়া', ur: 'ضرورت ہونا' },
  'snow': { bn: 'তুষার / বরফপাত', ur: 'برف باری' },
  'cloud': { bn: 'মেঘ', ur: 'بادل' },
  'storm': { bn: 'ঝড়', ur: 'طوفان / آندھی' },
  'internet': { bn: 'ইন্টারনেট', ur: 'انٹرنیٹ' },
  'password': { bn: 'পাসওয়ার্ড / গোপন সংকেত', ur: 'پاس ورڈ / خفیہ کوڈ' },
  'email': { bn: 'ইমেইল', ur: 'ای میل' },
  'screen': { bn: 'স্ক্রিন / পর্দা', ur: 'اسکرین' },
  'meeting': { bn: 'মিটিং / সভা', ur: 'میٹنگ / اجلاس' },
  'file': { bn: 'ফাইল / নথি', ur: 'فائل' },
  'link': { bn: 'লিংক / সংযোগ', ur: 'لنک / ربط' },
  'code': { bn: 'কোড / সংকেত', ur: 'کوڈ' },
  'error': { bn: 'ত্রুটি / ভুল', ur: 'خرابی / غلطی' },
  'battery': { bn: 'ব্যাটারি', ur: 'بیٹری' },
  'project': { bn: 'প্রকল্প / প্রজেক্ট', ur: 'منصوبہ / پروجیکٹ' },
  'client': { bn: 'গ্রাহক / ক্লায়েন্ট', ur: 'کلائنٹ / گاہک' },
  'team': { bn: 'দল / টিম', ur: 'ٹیم / گروپ' },
  'manager': { bn: 'ব্যবস্থাপক / ম্যানেজার', ur: 'مینیجر / منتظم' },
  'company': { bn: 'কোম্পানি / প্রতিষ্ঠান', ur: 'کمپنی / ادارہ' },
  'contract': { bn: 'চুক্তিপত্র', ur: 'معاہدہ' },
  'schedule': { bn: 'সময়সূচি', ur: 'نظام الاوقات / شیڈول' },
  'deadline': { bn: 'শেষ সময়সীমা', ur: 'آخری تاریخ / ڈیڈ لائن' },
  'invoice': { bn: 'চালান / ইনভয়েস', ur: 'بل / انوائس' },
  'salary': { bn: 'বেতন', ur: 'تنخواہ' },
  'medicine': { bn: 'ওষুধ', ur: 'دوائی' },
  'fever': { bn: 'জ্বর', ur: 'بخار' },
  'allergy': { bn: 'অ্যালার্জি', ur: 'الرجی' },
  'headache': { bn: 'মাথাব্যথা', ur: 'سر درد' },
  'emergency': { bn: 'জরুরি অবস্থা', ur: 'ہنگامی صورتحال' },
  'prescription': { bn: 'ব্যবস্থাপত্র / প্রেসক্রিপশন', ur: 'ڈاکٹر کا نسخہ' },
  'bandage': { bn: 'ব্যান্ডেজ / পট্টি', ur: 'پٹی' },
  'health': { bn: 'স্বাস্থ্য', ur: 'صحت' },
  'flight': { bn: 'ফ্লাইট / বিমানযাত্রা', ur: 'پرواز / فلائٹ' },
  'luggage': { bn: 'লাগেজ / মালপত্র', ur: 'سامانِ سفر' },
  'reservation': { bn: 'বুকিং / সংরক্ষণ', ur: 'بکنگ / ریزرویشن' },
  'gate': { bn: 'গেট / প্রবেশদ্বার', ur: 'گیٹ / دروازہ' },
  'map': { bn: 'মানচিত্র', ur: 'نقشہ' },
  'entrance': { bn: 'প্রবেশপথ', ur: 'داخلی راستہ' },
  'exit': { bn: 'বহির্গমন পথ', ur: 'باہر جانے کا راستہ' },
  'customs': { bn: 'শুল্ক বিভাগ / কাস্টমস', ur: 'کسٹمز' },
  'credit card': { bn: 'ক্রেডিট কার্ড', ur: 'کریڈٹ کارڈ' },
  'cash': { bn: 'নগদ টাকা', ur: 'نقد رقم' },
  'price': { bn: 'দাম / মূল্য', ur: 'قیمت' },
  'cheap': { bn: 'সস্তা / সাশ্রয়ী', ur: 'سستا' },
  'expensive': { bn: 'দামি / ব্যয়বহুল', ur: 'مہنگا' },
  'discount': { bn: 'ছাড় / ডিসকাউন্ট', ur: 'رعایت / ڈسکاؤنٹ' },
  'laptop': { bn: 'ল্যাপটপ', ur: 'لیپ ٹاپ' },
  'tablet': { bn: 'ট্যাবলেট', ur: 'ٹیبلٹ' },
  'keyboard': { bn: 'কীবোর্ড', ur: 'کی بورڈ' },
  'mouse': { bn: 'মাউস / ইঁদুর', ur: 'ماؤس / چوہا' },
  'charger': { bn: 'চার্জার', ur: 'چارجر' },
  'cable': { bn: 'কেবল / তার', ur: 'کیبل / تار' },
  'cable / wire': { bn: 'কেবল / তার', ur: 'کیبل / تار' },
  'message': { bn: 'বার্তা / মেসেজ', ur: 'پیغام / میسج' },
  'message / text': { bn: 'বার্তা / মেসেজ', ur: 'پیغام' },
  'website': { bn: 'ওয়েবসাইট', ur: 'ویب سائٹ' },
  'application': { bn: 'অ্যাপ্লিকেশন / অ্যাপ', ur: 'ایپلیکیشن / ایپ' },
  'application / app': { bn: 'অ্যাপ্লিকেশন / অ্যাপ', ur: 'ایپلیکیشن' },
  'folder': { bn: 'ফোল্ডার', ur: 'فولڈر' },
  'camera': { bn: 'ক্যামেরা', ur: 'کیمرہ' },
  'microphone': { bn: 'মাইক্রোফোন', ur: 'مائیکروفون' },
  'headphones': { bn: 'হেডফোন', ur: 'ہیڈ فونز' },
  'printer': { bn: 'প্রিন্টার', ur: 'پرنٹر' },
  'search': { bn: 'অনুসন্ধান / খোঁজা', ur: 'تلاش کرنا' },
  'search / find': { bn: 'অনুসন্ধান / খোঁজা', ur: 'تلاش کرنا' },
  'save': { bn: 'সংরক্ষণ করা', ur: 'محفوظ کرنا' },
  'delete': { bn: 'মুছে ফেলা', ur: 'حذف کرنا / مٹانا' },
  'delete / remove': { bn: 'মুছে ফেলা', ur: 'حذف کرنا' },
  'send': { bn: 'পাঠানো', ur: 'بھیجنا' },
  'download': { bn: 'ডাউনলোড করা', ur: 'ڈاؤن لوڈ کرنا' },
  'upload': { bn: 'আপলোড করা', ur: 'اپ لوڈ کرنا' },
  'online': { bn: 'অনলাইন', ur: 'آن لائن' },
  'offline': { bn: 'অফলাইন', ur: 'آف لائن' },
  'job': { bn: 'চাকরি / কাজ', ur: 'ملازمت / کام' },
  'job / work': { bn: 'চাকরি / কাজ', ur: 'ملازمت / کام' },
  'work / job': { bn: 'কাজ / চাকরি', ur: 'کام / ملازمت' },
  'office': { bn: 'অফিস / কার্যালয়', ur: 'دفتر' },
  'office / desk': { bn: 'অফিস / ডেস্ক', ur: 'دفتر / میز' },
  'buy': { bn: 'কেনা / ক্রয় করা', ur: 'خریدنا' },
  'buy / purchase': { bn: 'কেনা / ক্রয় করা', ur: 'خریدنا' },
  'sell': { bn: 'বিক্রি করা', ur: 'بیچنا' },
  'pay': { bn: 'পরিশোধ করা', ur: 'ادائیگی کرنا' },
  'pay / payment': { bn: 'পরিশোধ / পেমেন্ট', ur: 'ادائیگی' },
  'receipt': { bn: 'রসিদ', ur: 'رسید' },
  'support': { bn: 'সহায়তা কেন্দ্র', ur: 'معاونت / سپورٹ' },
  'customer support / help desk': { bn: 'গ্রাহক সহায়তা কেন্দ্র', ur: 'کسٹمر سپورٹ / مدد مرکز' },
  'open': { bn: 'খোলা', ur: 'کھلا / کھولنا' },
  'close': { bn: 'বন্ধ করা', ur: 'بند کرنا' },
  'closed': { bn: 'বন্ধ', ur: 'بند' },
  'update': { bn: 'হালনাগাদ / আপডেট', ur: 'اپ ڈیٹ کرنا' },
  'update / refresh': { bn: 'হালনাগাদ / আপডেট', ur: 'اپ ڈیٹ / تازہ کرنا' },
  'boss': { bn: 'বস / ঊর্ধ্বতন কর্মকর্তা', ur: 'باس / افسر' },
  'boss / supervisor': { bn: 'বস / তত্ত্বাবধায়ক', ur: 'افسر / نگران' },
  'colleague': { bn: 'সহকর্মী', ur: 'ہم منصب / ساتھی کارکن' },
  'colleague / coworker': { bn: 'সহকর্মী', ur: 'ساتھی کارکن' },
  'employee': { bn: 'কর্মচারী', ur: 'ملازم' },
  'employee / worker': { bn: 'কর্মচারী / কর্মী', ur: 'ملازم / کارکن' },
  'task': { bn: 'কাজ / দায়িত্ব', ur: 'کام / ذمہ داری' },
  'task / assignment': { bn: 'কাজ / অ্যাসাইনমেন্ট', ur: 'کام / تفویض' },
  'report': { bn: 'প্রতিবেদন / রিপোর্ট', ur: 'رپورٹ' },
  'report / summary': { bn: 'প্রতিবেদন / সারসংক্ষেপ', ur: 'رپورٹ / خلاصہ' },
  'presentation': { bn: 'উপস্থাপনা / প্রেজেন্টেশন', ur: 'پیشکش / پریزنٹیشن' },
  'signature': { bn: 'স্বাক্ষর', ur: 'دستخط' },
  'vacation': { bn: 'ছুটি / অবকাশ', ur: 'چھٹیاں' },
  'vacation / time off': { bn: 'ছুটি / অবকাশ', ur: 'چھٹیاں / رخصت' },
  'resume': { bn: 'জীবনবৃত্তান্ত / সিভি', ur: 'سی وی / کوائف نامہ' },
  'resume / cv': { bn: 'জীবনবৃত্তান্ত / সিভি', ur: 'سی وی / کوائف نامہ' },
  'interview': { bn: 'সাক্ষাৎকার / ইন্টারভিউ', ur: 'انٹرویو' },
  'job interview': { bn: 'চাকরির সাক্ষাৎকার', ur: 'ملازمت کا انٹرویو' },
  'goal': { bn: 'লক্ষ্য', ur: 'مقصد / ہدف' },
  'goal / target': { bn: 'লক্ষ্য / উদ্দেশ্য', ur: 'ہدف / مقصد' },
  'product': { bn: 'পণ্য', ur: 'مصنوعات / پروڈکٹ' },
  'service': { bn: 'সেবা / সার্ভিস', ur: 'خدمت / سروس' },
  'transfer': { bn: 'অর্থ স্থানান্তর / ট্রান্সফার', ur: 'منتقلی / ٹرانسفر' },
  'bank transfer / wire': { bn: 'ব্যাংক ট্রান্সফার', ur: 'بینک ٹرانسفر' },
  'refund': { bn: 'অর্থ ফেরত / রিফান্ড', ur: 'رقم کی واپسی' },
  'refund / return': { bn: 'অর্থ ফেরত / রিটার্ন', ur: 'رقم کی واپسی' },
  'shipping': { bn: 'ডেলিভারি / প্রেরণ', ur: 'ترسیل / ڈیلیوری' },
  'shipping / delivery': { bn: 'ডেলিভারি / পণ্য পাঠানো', ur: 'ترسیل / ڈیلیوری' },
  'package': { bn: 'পার্সেল / প্যাকেজ', ur: 'پارسل / پیکج' },
  'package / parcel': { bn: 'পার্সেল / প্যাকেজ', ur: 'پارسل / پیکج' },
  'software': { bn: 'সফটওয়্যার', ur: 'سافٹ ویئر' },
  'hardware': { bn: 'হার্ডওয়্যার', ur: 'ہارڈ ویئر' },
  'database': { bn: 'ডেটাবেস', ur: 'ڈیٹا بیس' },
  'server': { bn: 'সার্ভার', ur: 'سرور' },
  'cloud storage': { bn: 'ক্লাউড স্টোরেজ', ur: 'کلاؤڈ اسٹوریج' },
  'artificial intelligence': { bn: 'কৃত্রিম বুদ্ধিমত্তা', ur: 'مصنوعی ذہانت' },
  'algorithm': { bn: 'অ্যালগরিদম', ur: 'الگورتھم' },
  'developer': { bn: 'ডেভেলপার / প্রোগ্রামার', ur: 'ڈیولپر / پروگرامر' },
  'developer / programmer': { bn: 'ডেভেলপার / প্রোগ্রামার', ur: 'ڈیولپر / پروگرامر' },
  'cybersecurity': { bn: 'সাইবার নিরাপত্তা', ur: 'سائبر سیکیورٹی' },
  'operating system': { bn: 'অপারেটিং সিস্টেম', ur: 'آپریٹنگ سسٹم' },
  'budget': { bn: 'বাজেট', ur: 'بجٹ' },
  'budget / financial plan': { bn: 'বাজেট / আর্থিক পরিকল্পনা', ur: 'بجٹ / مالیاتی منصوبہ' },
  'investment': { bn: 'বিনিয়োগ', ur: 'سرمایہ کاری' },
  'investment / capital': { bn: 'বিনিয়োগ / মূলধন', ur: 'سرمایہ کاری' },
  'revenue': { bn: 'রাজস্ব / আয়', ur: 'آمدنی / محاصل' },
  'revenue / turnover': { bn: 'রাজস্ব / মোট আয়', ur: 'آمدنی / کاروباری حجم' },
  'startup': { bn: 'স্টার্টআপ প্রতিষ্ঠান', ur: 'نئی کمپنی / اسٹارٹ اپ' },
  'startup company': { bn: 'স্টার্টআপ প্রতিষ্ঠান', ur: 'نئی کمپنی / اسٹارٹ اپ' },
  'remote work': { bn: 'দূরবর্তী কাজ / ঘরে বসে কাজ', ur: 'گھر سے کام / ریموٹ ورک' },
  'remote work / telecommuting': { bn: 'ঘরে বসে কাজ', ur: 'گھر سے کام' },
  'man': { bn: 'পুরুষ / মানুষ', ur: 'مرد / آدمی' },
  'woman': { bn: 'নারী / মহিলা', ur: 'عورت / خاتون' },
  'husband': { bn: 'স্বামী', ur: 'شوہر' },
  'wife': { bn: 'স্ত্রী', ur: 'بیوی' },
  'mom': { bn: 'মা', ur: 'امی / ماں' },
  'dad': { bn: 'বাবা', ur: 'ابو / والد' },
  'fruits': { bn: 'ফলমূল', ur: 'پھل' },
  'beer': { bn: 'বিয়ার', ur: 'بیئر' },
  'wine': { bn: 'ওয়াইন', ur: 'مشروب / وائن' },
  'cheese': { bn: 'পনির / চিজ', ur: 'پنیر' },
  'juice': { bn: 'ফলের রস / জুস', ur: 'جوس / رس' },
  'oil': { bn: 'তেল', ur: 'تیل' },
  'lemon': { bn: 'লেবু', ur: 'لیموں' },
  'yogurt': { bn: 'দই', ur: 'دہی' },
  'grape': { bn: 'আঙুর', ur: 'انگور' },
  'strawberry': { bn: 'স্ট্রবেরি', ur: 'اسٹرابیری' },
  'garlic': { bn: 'রসুন', ur: 'لہسن' },
  'potato': { bn: 'আলু', ur: 'آلو' },
  'onion': { bn: 'পেঁয়াজ', ur: 'پیاز' },
  'carrot': { bn: 'গাজর', ur: 'گاجر' },
  'borscht': { bn: 'বোরশট স্যুপ', ur: 'چقندر کا سوپ (بورش)' },
  'park': { bn: 'পার্ক / উদ্যান', ur: 'پارک / باغ' },
  'museum': { bn: 'জাদুঘর', ur: 'عجائب گھر' },
  'theater': { bn: 'নাট্যশালা / থিয়েটার', ur: 'تھیٹر' },
  'cinema': { bn: 'সিনেমা হল', ur: 'سنیما گھر' },
  'center': { bn: 'কেন্দ্র', ur: 'مرکز' },
  'factory': { bn: 'কারখানা', ur: 'کارخانہ / فیکٹری' },
  'sea': { bn: 'সমুদ্র / সাগর', ur: 'سمندر' },
  'taxi': { bn: 'ট্যাক্সি', ur: 'ٹیکسی' },
  'subway': { bn: 'পাতাল রেল / মেট্রো', ur: 'میٹرو / زیرِ زمین ٹرین' },
  'subway / metro': { bn: 'মেট্রো / পাতাল রেল', ur: 'میٹرو ٹرین' },
  'square': { bn: 'চত্বর / ময়দান', ur: 'چوک / میدان' },
  'square / plaza': { bn: 'চত্বর / প্লাজা', ur: 'چوک / پلازہ' },
  'square (plaza)': { bn: 'চত্বর / ময়দান', ur: 'چوک / میدان' },
  'post office': { bn: 'ডাকঘর / পোস্ট অফিস', ur: 'ڈاک خانہ' },
  'police': { bn: 'পুলিশ', ur: 'پولیس' },
  'visa': { bn: 'ভিসা', ur: 'ویزا' },
  'telephone': { bn: 'টেলিফোন / ফোন', ur: 'ٹیلی فون' },
  'help': { bn: 'সাহায্য', ur: 'مدد' },
  'bridge': { bn: 'সেতু / পুল', ur: 'پل' },
  'stew': { bn: 'স্টু / ঝোল রান্না', ur: 'یخنی / سالن' },
  'radio': { bn: 'রেডিও / বেতার', ur: 'ریڈیو' },
  'desk': { bn: 'টেবিল / ডেস্ক', ur: 'لکھنے کی میز / ڈیسک' },
  'music': { bn: 'সংগীত / গান', ur: 'موسیقی' },
  'clothes': { bn: 'পোশাক / কাপড়', ur: 'کپڑے / لباس' },
  'shoes': { hi: 'जूते', bn: 'জুতো', ur: 'جوتے' },
  'shoe': { hi: 'जूता', bn: 'জুতো', ur: 'جوتا' },
  'shoe / shoes': { hi: 'जूते', bn: 'জুতো', ur: 'جوتے' },
  'magazine': { bn: 'ম্যাগাজিন / সাময়িকী', ur: 'رسالہ / میگزین' },
  'photo': { bn: 'ছবি / ফটো', ur: 'تصویر' },
  'card': { bn: 'কার্ড', ur: 'کارڈ' },
  'happy': { bn: 'খুশি / আনন্দিত', ur: 'خوش' },
  'ready': { bn: 'প্রস্তুত / তৈরি', ur: 'تیار' },
  'eye': { bn: 'চোখ', ur: 'آنکھ' },
  'eyes': { bn: 'চোখগুলো', ur: 'آنکھیں' },
  'nose': { bn: 'নাক', ur: 'ناک' },
  'cheek': { bn: 'গাল', ur: 'گال' },
  'heart': { bn: 'হৃদয় / মন', ur: 'دل' },
  'cup': { bn: 'কাপ / পেয়ালা', ur: 'کپ / پیالی' },
  'glass': { bn: 'গ্লাস / কাচ', ur: 'گلاس / شیشہ' },
  'glass (cup)': { bn: 'গ্লাস', ur: 'گلاس' },
  'kettle': { bn: 'কেটলি', ur: 'کیتلی' },
  'spoon': { bn: 'চামচ', ur: 'چمچ' },
  'fork': { bn: 'কাঁটাচামচ', ur: 'کانٹا' },
  'knife': { bn: 'ছুরি', ur: 'چھری / چاقو' },
  'plate': { bn: 'থালা / প্লেট', ur: 'پلیٹ / طشتری' },
  'hedgehog': { bn: 'সজারু / হেজহগ', ur: 'خارپشت' },
  'beetle': { bn: 'গুবরে পোকা', ur: 'بھونرا / کیڑا' },
  'beetle / bug': { bn: 'পোকা / গুবরে পোকা', ur: 'بھونرا / کیڑا' },
  'zebra': { bn: 'জেব্রা', ur: 'زیبرا' },
  'xylophone': { bn: 'জাইলোফোন', ur: 'زائلو فون (ساز)' },
  'idea': { bn: 'ধারণা / আইডিয়া', ur: 'خیال / تجویز' },
  'question': { bn: 'প্রশ্ন', ur: 'سوال' },
  'success': { bn: 'সাফল্য', ur: 'کامیابی' },
  'love': { bn: 'ভালোবাসা', ur: 'محبت' },
  'island': { bn: 'দ্বীপ', ur: 'جزیرہ' },
  'south': { bn: 'দক্ষিণ', ur: 'جنوب' },
  'source': { bn: 'উৎস', ur: 'ذریعہ / ماخذ' },
  'this': { bn: 'এটি / এই', ur: 'یہ' },
  'maybe': { bn: 'হয়তো', ur: 'شاید' },
  'object': { bn: 'বস্তু / জিনিস', ur: 'چیز / شے' },
  'kilogram': { bn: 'কিলোগ্রাম / কেজি', ur: 'کلوگرام' },
  'web': { bn: 'ওয়েব / জাল', ur: 'ویب / جال' },
  'yolk': { bn: 'ডিমের কুসুম', ur: 'انڈے کی زردی' },
  'example': { bn: 'উদাহরণ', ur: 'مثال' },
  'czar / king': { bn: 'রাজা / সম্রাট', ur: 'بادشاہ' },
  'suitcase': { bn: 'স্যুটকেস', ur: 'سوٹ کیس' },
  'backpack': { bn: 'পিঠের ব্যাগ / ব্যাকপ্যাক', ur: 'پشت کا بیگ' },
  'wallet': { bn: 'মানিব্যাগ / ওয়ালেট', ur: 'بٹوہ' },
  'ambulance': { bn: 'অ্যাম্বুলেন্স', ur: 'ایمبولینس' },
  'firefighter': { bn: 'দমকলকর্মী', ur: 'فائر فائٹر / آگ بجھانے والا' },
  'beach': { bn: 'সমুদ্রসৈকত', ur: 'ساحلِ سمندر' },
  'mountain': { bn: 'পাহাড় / পর্বত', ur: 'پہاڑ' },
  'lake': { bn: 'হ্রদ / লেক', ur: 'جھیل' },
  'purple': { bn: 'বেগুনি', ur: 'جامنی' },
  'pink': { bn: 'গোলাপি', ur: 'گلابی' },
  'gray': { bn: 'ধূসর', ur: 'سرمئی' },
  'who': { bn: 'কে', ur: 'کون' },
  'who?': { bn: 'কে?', ur: 'کون؟' },
  'what': { bn: 'কী', ur: 'کیا' },
  'what?': { bn: 'কী?', ur: 'کیا؟' },
  'where': { bn: 'কোথায়', ur: 'کہاں' },
  'where?': { bn: 'কোথায়?', ur: 'کہاں؟' },
  'when': { bn: 'কখন', ur: 'کب' },
  'when?': { bn: 'কখন?', ur: 'کب؟' },
  'why': { bn: 'কেন', ur: 'کیوں' },
  'why?': { bn: 'কেন?', ur: 'کیوں؟' },
  'how': { bn: 'কীভাবে', ur: 'کیسے' },
  'how?': { bn: 'কীভাবে?', ur: 'کیسے؟' },
  'how much': { bn: 'কত', ur: 'کتنا' },
  'how much / how many': { bn: 'কত / কয়টি', ur: 'کتنا / کتنے' },

  // Cross-course 15-language parity entries (so every course pair resolves into native script)
  'pain': {
    en: 'Pain', es: 'Dolor', fr: 'Douleur', de: 'Schmerz', pt: 'Dor', ru: 'Боль', id: 'Rasa sakit', tr: 'Ağrı',
    zh: '疼痛', ja: '痛み', ko: '통증 / 아픔', hi: 'दर्द / पीड़ा', ar: 'ألم', bn: 'ব্যথা / যন্ত্রণা', ur: 'درد / تکلیف'
  },
  'bedroom': {
    en: 'Bedroom', es: 'Dormitorio / Habitación', fr: 'Chambre', de: 'Schlafzimmer', pt: 'Quarto', ru: 'Спальня', id: 'Kamar tidur', tr: 'Yatak odası',
    zh: '卧室', ja: '寝室', ko: '침실', hi: 'शयनकक्ष / बेडरूम', ar: 'غرفة نوم', bn: 'শোবার ঘর', ur: 'سونے کا کمرہ'
  },
  'closet': {
    en: 'Closet', es: 'Armario / Guardarropa', fr: 'Placard / Armoire', de: 'Kleiderschrank', pt: 'Guarda-roupa / Armário', ru: 'Шкаф', id: 'Lemari pakaian', tr: 'Gardırop / Dolap',
    zh: '衣柜', ja: 'クローゼット / 押し入れ', ko: '옷장', hi: 'अलमारी', ar: 'خزانة ملابس', bn: 'আলমারি', ur: 'الماری'
  },
  'glasses': {
    en: 'Glasses', es: 'Gafas / Lentes', fr: 'Lunettes', de: 'Brille', pt: 'Óculos', ru: 'Очки', id: 'Kacamata', tr: 'Gözlük',
    zh: '眼镜', ja: '眼鏡', ko: '안경', hi: 'चश्मा', ar: 'نظارات', bn: 'চশমা', ur: 'عینک / چشمہ'
  },
  'notebook': {
    en: 'Notebook', es: 'Cuaderno', fr: 'Cahier', de: 'Notizbuch / Heft', pt: 'Caderno', ru: 'Тетрадь / Блокнот', id: 'Buku catatan', tr: 'Defter',
    zh: '笔记本', ja: 'ノート', ko: '공책 / 노트', hi: 'नोटबुक / कॉपी', ar: 'دفتر', bn: 'খাতা / নোটবুক', ur: 'کاپی / نوٹ بک'
  },
  'pencil': {
    en: 'Pencil', es: 'Lápiz', fr: 'Crayon', de: 'Bleistift', pt: 'Lápis', ru: 'Карандаш', id: 'Pensil', tr: 'Kurşun kalem',
    zh: '铅笔', ja: '鉛筆', ko: '연필', hi: 'पेंसिल', ar: 'قلم رصاص', bn: 'পেন্সিল', ur: 'پینسل'
  },
  'wi-fi / wlan': {
    en: 'Wi-Fi / WLAN', es: 'Wi-Fi', fr: 'Wi-Fi', de: 'WLAN', pt: 'Wi-Fi', ru: 'Вай-фай (Wi-Fi)', id: 'Wi-Fi', tr: 'Wi-Fi / Kablosuz ağ',
    zh: '无线网络 (Wi-Fi)', ja: 'Wi-Fi（ワイファイ）', ko: '와이파이 (Wi-Fi)', hi: 'वाई-फ़ाई (Wi-Fi)', ar: 'واي فاي (Wi-Fi)', bn: 'ওয়াই-ফাই (Wi-Fi)', ur: 'وائی فائی (Wi-Fi)'
  },
  'okay / all right': {
    en: 'Okay / All right', es: 'Vale / Está bien', fr: "D'accord", de: 'Okay / In Ordnung', pt: 'Tudo bem / Certo', ru: 'Хорошо / Ладно', id: 'Baiklah / Oke', tr: 'Tamam / Peki',
    zh: '好的 / 没问题', ja: 'わかりました / 大丈夫です', ko: '알겠습니다 / 괜찮아요', hi: 'ठीक है', ar: 'حسناً / تمام', bn: 'ঠিক আছে', ur: 'ٹھیک ہے'
  },
  'okay / alright': {
    en: 'Okay / Alright', es: 'Vale / Está bien', fr: "D'accord", de: 'Okay / In Ordnung', pt: 'Tudo bem / Certo', ru: 'Хорошо / Ладно', id: 'Baiklah / Oke', tr: 'Tamam / Peki',
    zh: '好的 / 没问题', ja: 'わかりました / 大丈夫です', ko: '알겠습니다 / 괜찮아요', hi: 'ठीक है', ar: 'حسناً / تمام', bn: 'ঠিক আছে', ur: 'ٹھیک ہے'
  },
  'i am fine': {
    en: 'I am fine', es: 'Estoy bien', fr: 'Je vais bien', de: 'Mir geht es gut', pt: 'Estou bem', ru: 'У меня всё хорошо', id: 'Saya baik-baik saja', tr: 'İyiyim',
    zh: '我很好', ja: '元気です', ko: '저는 잘 지내요', hi: 'मैं ठीक हूँ', ar: 'أنا بخير', bn: 'আমি ভালো আছি', ur: 'میں ٹھیک ہوں'
  },
  'i am doing well': {
    en: 'I am doing well', es: 'Estoy muy bien', fr: 'Je vais bien', de: 'Mir geht es gut', pt: 'Estou indo bem', ru: 'У меня всё хорошо', id: 'Kabar saya baik', tr: 'İyiyim',
    zh: '我过得很好', ja: '元気です', ko: '잘 지내고 있어요', hi: 'मैं ठीक हूँ', ar: 'أنا بخير', bn: 'আমি ভালো আছি', ur: 'میں ٹھیک ہوں'
  },
  'cheers': {
    en: 'Cheers', es: '¡Salud!', fr: 'Santé !', de: 'Prost!', pt: 'Saúde!', ru: 'За здоровье!', id: 'Bersulang!', tr: 'Şerefe!',
    zh: '干杯！', ja: '乾杯！', ko: '건배!', hi: 'चियर्स / स्वास्थ्य के नाम!', ar: 'في صحتك!', bn: 'চিয়ার্স / আনন্দ হোক!', ur: 'خوشی کے نام!'
  },
  'welcome': {
    en: 'Welcome', es: 'Bienvenido', fr: 'Bienvenue', de: 'Willkommen', pt: 'Bem-vindo', ru: 'Добро пожаловать', id: 'Selamat datang', tr: 'Hoş geldiniz',
    zh: '欢迎', ja: 'ようこそ', ko: '환영합니다', hi: 'स्वागत है', ar: 'أهلاً وسهلاً', bn: 'স্বাগতম', ur: 'خوش آمدید'
  },
  'praise be to god / doing well': {
    en: 'Praise be to God / Doing well', es: 'Gracias a Dios / Muy bien', fr: 'Dieu merci / Ça va bien', de: 'Gott sei Dank / Es geht mir gut', pt: 'Graças a Deus / Tudo bem', ru: 'Слава Богу / Всё хорошо', id: 'Alhamdulillah / Baik', tr: 'Elhamdülillah / Çok şükür iyiyim',
    zh: '感谢真主 / 一切都好', ja: 'おかげさまで元気です（アルハムドゥリッラー）', ko: '덕분에 잘 지냅니다 (알함둘릴라)', hi: 'ईश्वर की कृपा से सब ठीक है', ar: 'الحمد لله', bn: 'আলহামদুলিল্লাহ / ভালো আছি', ur: 'الحمد للہ / اللہ کا شکر ہے'
  },
  'i speak a little japanese': {
    en: 'I speak a little Japanese', es: 'Hablo un poco de japonés', fr: 'Je parle un peu japonais', de: 'Ich spreche ein bisschen Japanisch', pt: 'Falo um pouco de japonês', ru: 'Я немного говорю по-японски', id: 'Saya berbicara sedikit bahasa Jepang', tr: 'Biraz Japonca konuşuyorum',
    zh: '我会说一点日语', ja: '日本語が少し話せます', ko: '일본어를 조금 할 줄 알아요', hi: 'मैं थोड़ी जापानी बोलता हूँ', ar: 'أتحدث القليل من اليابانية', bn: 'আমি অল্প জাপানি বলতে পারি', ur: 'میں تھوڑی جاپانی بول لیتا ہوں'
  },
  'i speak a little korean': {
    en: 'I speak a little Korean', es: 'Hablo un poco de coreano', fr: 'Je parle un peu coréen', de: 'Ich spreche ein bisschen Koreanisch', pt: 'Falo um pouco de coreano', ru: 'Я немного говорю по-корейски', id: 'Saya berbicara sedikit bahasa Korea', tr: 'Biraz Korece konuşuyorum',
    zh: '我会说一点韩语', ja: '韓国語が少し話せます', ko: '한국어 조금 해요', hi: 'मैं थोड़ी कोरियाई बोलता हूँ', ar: 'أتحدث القليل من الكورية', bn: 'আমি অল্প কোরীয় বলতে পারি', ur: 'میں تھوڑی کوریائی بول لیتا ہوں'
  },
  'noon / daytime': {
    en: 'Noon / Daytime', es: 'Mediodía / De día', fr: 'Midi / Journée', de: 'Mittag / Tagsüber', pt: 'Meio-dia / Durante o dia', ru: 'Полдень / Дневное время', id: 'Siang hari', tr: 'Öğle / Gündüz',
    zh: '中午 / 白天', ja: '昼', ko: '낮 / 정오', hi: 'दोपहर / दिन का समय', ar: 'الظهر / النهار', bn: 'দুপুর / দিনের বেলা', ur: 'دوپہر / دن کا وقت'
  },
  "i don't know": {
    en: "I don't know", es: 'No sé', fr: 'Je ne sais pas', de: 'Ich weiß nicht', pt: 'Não sei', ru: 'Я не знаю', id: 'Saya tidak tahu', tr: 'Bilmiyorum',
    zh: '我不知道', ja: 'わかりません / 知りません', ko: '잘 모르겠어요', hi: 'मुझे नहीं पता', ar: 'لا أعرف', bn: 'আমি জানি না', ur: 'مجھے معلوم نہیں'
  },
  'i do not know': {
    en: 'I do not know', es: 'No sé', fr: 'Je ne sais pas', de: 'Ich weiß nicht', pt: 'Não sei', ru: 'Я не знаю', id: 'Saya tidak tahu', tr: 'Bilmiyorum',
    zh: '我不知道', ja: 'わかりません / 知りません', ko: '잘 모르겠어요', hi: 'मुझे नहीं पता', ar: 'لا أعرف', bn: 'আমি জানি না', ur: 'مجھے معلوم نہیں'
  },
  'could you speak more slowly?': {
    en: 'Could you speak more slowly?', es: '¿Podría hablar más despacio?', fr: 'Pourriez-vous parler plus lentement ?', de: 'Könnten Sie langsamer sprechen?', pt: 'Poderia falar mais devagar?', ru: 'Не могли бы вы говорить помедленнее?', id: 'Bisakah Anda berbicara lebih pelan?', tr: 'Daha yavaş konuşabilir misiniz?',
    zh: '您能说慢一点吗？', ja: 'もう少しゆっくり話していただけますか？', ko: '조금 더 천천히 말씀해 주시겠어요?', hi: 'क्या आप थोड़ा धीरे बोल सकते हैं?', ar: 'هل يمكنك التحدث ببطء أكثر؟', bn: 'আরেকটু আস্তে বলবেন?', ur: 'کیا آپ تھوڑا آہستہ بول سکتے ہیں؟'
  },
  'can i see the menu?': {
    en: 'Can I see the menu?', es: '¿Puedo ver el menú?', fr: 'Puis-je voir le menu ?', de: 'Kann ich die Speisekarte sehen?', pt: 'Posso ver o cardápio?', ru: 'Можно посмотреть меню?', id: 'Boleh saya lihat menunya?', tr: 'Menüyü görebilir miyim?',
    zh: '我可以看一下菜单吗？', ja: 'メニューを見せていただけますか？', ko: '메뉴판 좀 볼 수 있을까요?', hi: 'क्या मैं मेन्यू देख सकता हूँ?', ar: 'هل يمكنني رؤية القائمة؟', bn: 'মেনু দেখতে পারি?', ur: 'کیا میں مینو دیکھ سکتا ہوں؟'
  },
  'i feel sick': {
    en: 'I feel sick', es: 'Me siento enfermo', fr: 'Je me sens malade', de: 'Mir ist schlecht / Ich fühle mich krank', pt: 'Estou passando mal', ru: 'Мне плохо / Я чувствую себя больным', id: 'Saya merasa sakit', tr: 'Kendimi hasta hissediyorum',
    zh: '我觉得不舒服 / 我生病了', ja: '気分が悪いです', ko: '몸이 안 좋아요 / 아파요', hi: 'मेरी तबीयत खराब लग रही है', ar: 'أشعر بالمرض / لست على ما يرام', bn: 'আমার শরীর খারাপ লাগছে', ur: 'میری طبیعت خراب ہے'
  },
  'i feel unwell / sick': {
    en: 'I feel unwell / sick', es: 'Me siento mal / enfermo', fr: 'Je ne me sens pas bien', de: 'Ich fühle mich unwohl / krank', pt: 'Não estou me sentindo bem', ru: 'Мне нездоровится', id: 'Saya merasa kurang enak badan', tr: 'Kendimi iyi hissetmiyorum',
    zh: '我觉得身体不适', ja: '体調が悪いです', ko: '몸이 좋지 않아요', hi: 'मेरी तबीयत ठीक नहीं है', ar: 'أشعر بتوعك / بالمرض', bn: 'আমার শরীর খারাপ লাগছে', ur: 'میری طبیعت خراب ہے'
  },
  'bed': {
    en: 'Bed', es: 'Cama', fr: 'Lit', de: 'Bett', pt: 'Cama', ru: 'Кровать', id: 'Tempat tidur', tr: 'Yatak',
    zh: '床', ja: 'ベッド / 布団', ko: '침대', hi: 'बिस्तर', ar: 'سرير', bn: 'বিছানা', ur: 'بستر'
  },
  'mango': {
    en: 'Mango', es: 'Mango', fr: 'Mangue', de: 'Mango', pt: 'Manga', ru: 'Манго', id: 'Mangga', tr: 'Mango',
    zh: '芒果', ja: 'マンゴー', ko: '망고', hi: 'आम', ar: 'مانجو', bn: 'আম', ur: 'آم'
  },
  'sweet': {
    en: 'Sweet', es: 'Dulce', fr: 'Sucré / Doux', de: 'Süß', pt: 'Doce', ru: 'Сладкий', id: 'Manis', tr: 'Tatlı',
    zh: '甜 / 甜食', ja: '甘い / お菓子', ko: '달콤한 / 단것', hi: 'मीठा / मिठाई', ar: 'حلو / حلوى', bn: 'মিষ্টি', ur: 'مٹھائی / میٹھا'
  },
  'sugar': {
    en: 'Sugar', es: 'Azúcar', fr: 'Sucre', de: 'Zucker', pt: 'Açúcar', ru: 'Сахар', id: 'Gula', tr: 'Şeker',
    zh: '糖', ja: '砂糖', ko: '설탕', hi: 'चीनी / शक्कर', ar: 'سكر', bn: 'চিনি', ur: 'چینی'
  },
  'person / human': {
    en: 'Person / Human', es: 'Persona / Ser humano', fr: 'Personne / Être humain', de: 'Person / Mensch', pt: 'Pessoa / Ser humano', ru: 'Человек', id: 'Orang / Manusia', tr: 'Kişi / İnsan',
    zh: '人 / 人类', ja: '人 / 人間', ko: '사람 / 인간', hi: 'व्यक्ति / इंसान', ar: 'شخص / إنسان', bn: 'মানুষ / ব্যক্তি', ur: 'انسان / شخص'
  },
  'cow': {
    en: 'Cow', es: 'Vaca', fr: 'Vache', de: 'Kuh', pt: 'Vaca', ru: 'Корова', id: 'Sapi', tr: 'İnek',
    zh: '牛 / 奶牛', ja: '牛（うし）', ko: '소', hi: 'गाय', ar: 'بقرة', bn: 'গরু', ur: 'گائے'
  },
  'tiger': {
    en: 'Tiger', es: 'Tigre', fr: 'Tigre', de: 'Tiger', pt: 'Tigre', ru: 'Тигр', id: 'Harimau', tr: 'Kaplan',
    zh: '老虎', ja: '虎（とら）', ko: '호랑이', hi: 'बाघ', ar: 'نمر', bn: 'বাঘ', ur: 'شیر / باگھ'
  },
  'lion / tiger': {
    en: 'Lion / Tiger', es: 'León / Tigre', fr: 'Lion / Tigre', de: 'Löwe / Tiger', pt: 'Leão / Tigre', ru: 'Лев / Тигр', id: 'Singa / Harimau', tr: 'Aslan / Kaplan',
    zh: '狮子 / 老虎', ja: 'ライオン / 虎', ko: '사자 / 호랑이', hi: 'शेर / बाघ', ar: 'أسد / نمر', bn: 'সিংহ / বাঘ', ur: 'شیر'
  },
  'elephant': {
    en: 'Elephant', es: 'Elefante', fr: 'Éléphant', de: 'Elefant', pt: 'Elefante', ru: 'Слон', id: 'Gajah', tr: 'Fil',
    zh: '大象', ja: '象（ぞう）', ko: '코끼리', hi: 'हाथी', ar: 'فيل', bn: 'হাতি', ur: 'ہاتھی'
  },
  'sky': {
    en: 'Sky', es: 'Cielo', fr: 'Ciel', de: 'Himmel', pt: 'Céu', ru: 'Небо', id: 'Langit', tr: 'Gökyüzü',
    zh: '天空', ja: '空（そら）', ko: '하늘', hi: 'आकाश / आसमान', ar: 'سماء', bn: 'আকাশ', ur: 'آسمان'
  },
  'village': {
    en: 'Village', es: 'Pueblo / Aldea', fr: 'Village', de: 'Dorf', pt: 'Aldeia / Vila', ru: 'Деревня / Село', id: 'Desa', tr: 'Köy',
    zh: '村庄 / 乡村', ja: '村（むら）', ko: '마을 / 시골', hi: 'गाँव', ar: 'قرية', bn: 'গ্রাম', ur: 'گاؤں'
  },
  'market': {
    en: 'Market', es: 'Mercado', fr: 'Marché', de: 'Markt', pt: 'Mercado', ru: 'Рынок / Базар', id: 'Pasar', tr: 'Pazar / Çarşı',
    zh: '市场 / 集市', ja: '市場（いちば）', ko: '시장', hi: 'बाज़ार', ar: 'سوق', bn: 'বাজার', ur: 'بازار'
  },
  'beautiful': {
    en: 'Beautiful', es: 'Hermoso / Bonito', fr: 'Beau / Belle', de: 'Schön', pt: 'Bonito / Lindo', ru: 'Красивый', id: 'Indah / Cantik', tr: 'Güzel',
    zh: '美丽 / 漂亮', ja: '美しい / きれい', ko: '아름다운 / 예쁜', hi: 'सुंदर / खूबसूरत', ar: 'جميل', bn: 'সুন্দর', ur: 'خوبصورت'
  },
  'easy': {
    en: 'Easy', es: 'Fácil', fr: 'Facile', de: 'Einfach / Leicht', pt: 'Fácil', ru: 'Лёгкий / Простой', id: 'Mudah', tr: 'Kolay',
    zh: '容易 / 简单', ja: '簡単 / やさしい', ko: '쉬운', hi: 'आसान / सरल', ar: 'سهل', bn: 'সহজ', ur: 'آسان'
  },
  'difficult': {
    en: 'Difficult', es: 'Difícil', fr: 'Difficile', de: 'Schwierig / Schwer', pt: 'Difícil', ru: 'Трудный / Сложный', id: 'Sulit / Susah', tr: 'Zor',
    zh: '困难 / 难', ja: '難しい', ko: '어려운', hi: 'कठिन / मुश्किल', ar: 'صعب', bn: 'কঠিন', ur: 'مشکل'
  },
  'clean': {
    en: 'Clean', es: 'Limpio', fr: 'Propre', de: 'Sauber', pt: 'Limpo', ru: 'Чистый', id: 'Bersih', tr: 'Temiz',
    zh: '干净', ja: '清潔 / きれい', ko: '깨끗한', hi: 'साफ़ / स्वच्छ', ar: 'نظيف', bn: 'পরিষ্কার', ur: 'صاف'
  },
  'later': {
    en: 'Later', es: 'Más tarde / Luego', fr: 'Plus tard', de: 'Später', pt: 'Mais tarde / Depois', ru: 'Позже / Потом', id: 'Nanti', tr: 'Sonra / Daha sonra',
    zh: '以后 / 稍后', ja: 'あとで / 後ほど', ko: '나중에', hi: 'बाद में', ar: 'لاحقاً / بعدين', bn: 'পরে', ur: 'بعد میں'
  },
};
