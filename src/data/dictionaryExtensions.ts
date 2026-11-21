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
    zh: '在晚上', ja: '夕方に・夜に', ko: '저녁에', hi: 'शाम को', ar: 'في المساء', bn: 'সন্ধ্যায়', ur: 'شام کو'
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
    zh: '不客气', ja: 'どういたしまして', ko: '천만에요', hi: 'कोई बात नहीं', ar: 'على الرحب والسعة',
    bn: 'কোনো ব্যাপার না', ur: 'کوئی بات نہیں'
  },
  'you are welcome': {
    zh: '不客气', ja: 'どういたしまして', ko: '천만에요', hi: 'कोई बात नहीं', ar: 'على الرحب والسعة',
    bn: 'কোনো ব্যাপার না', ur: 'کوئی بات نہیں'
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
  'quarter of an hour': { bn: 'পনেরো মিনিট / এক পোয়া ঘণ্টা', ur: 'پندرہ منٹ / ایک چوتھائی گھنٹہ' },
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

  // Missing alphabet example nouns & telling-time expressions (full 15-language coverage)
  'alligator': {
    en: 'Alligator', es: 'Caimán', fr: 'Alligator', de: 'Alligator', pt: 'Jacaré', ru: 'Аллигатор', id: 'Aligator', tr: 'Timsah',
    zh: '短吻鳄', ja: 'ワニ', ko: '악어', hi: 'मगरमच्छ', ar: 'تمساح', bn: 'কুমির', ur: 'مگرمچھ'
  },
  'antelope': {
    en: 'Antelope', es: 'Antílope', fr: 'Antilope', de: 'Antilope', pt: 'Antílope', ru: 'Антилопа', id: 'Antelop', tr: 'Antilop',
    zh: '羚羊', ja: 'レイヨウ', ko: '영양', hi: 'हिरण', ar: 'ظبي', bn: 'হরিণ', ur: 'ہرن'
  },
  'aunt': {
    en: 'Aunt', es: 'Tía', fr: 'Tante', de: 'Tante', pt: 'Tia', ru: 'Тётя', id: 'Bibi / Tante', tr: 'Teyze / Hala',
    zh: '阿姨 / 姑妈', ja: 'おば', ko: '이모 / 고모', hi: 'चाची / मौसी', ar: 'عمة / خالة', bn: 'খালা / পিসি', ur: 'خالہ / پھوپھی'
  },
  'away': {
    en: 'Away / Absent', es: 'Ausente / Lejos', fr: 'Absent / Loin', de: 'Abwesend / Weg', pt: 'Ausente / Longe', ru: 'В отъезде / Отсутствует', id: 'Pergi / Tidak di rumah', tr: 'Uzakta / Evde yok',
    zh: '不在家 / 离开', ja: '留守 / 離れて', ko: '부재 / 멀리', hi: 'बाहर / दूर', ar: 'غائب / بعيد', bn: 'বাইরে / অনুপস্থিত', ur: 'غیر حاضر / دور'
  },
  'balloon': {
    en: 'Balloon', es: 'Globo', fr: 'Ballon', de: 'Luftballon', pt: 'Balão', ru: 'Воздушный шар', id: 'Balon', tr: 'Balon',
    zh: '气球', ja: '風船', ko: '풍선', hi: 'गुब्बारा', ar: 'بالون', bn: 'বেলুন', ur: 'غبارہ'
  },
  'baseball': {
    en: 'Baseball', es: 'Béisbol', fr: 'Baseball', de: 'Baseball', pt: 'Beisebol', ru: 'Бейсбол', id: 'Bisbol', tr: 'Beyzbol',
    zh: '棒球', ja: '野球', ko: '야구', hi: 'बेसबॉल', ar: 'بيسبول', bn: 'বেসবল', ur: 'بیس بال'
  },
  'bear': {
    en: 'Bear', es: 'Oso', fr: 'Ours', de: 'Bär', pt: 'Urso', ru: 'Медведь', id: 'Beruang', tr: 'Ayı',
    zh: '熊', ja: '熊（くま）', ko: '곰', hi: 'भालू', ar: 'دب', bn: 'ভাল্লুক', ur: 'ریچھ'
  },
  'bow': {
    en: 'Bow', es: 'Arco', fr: 'Arc', de: 'Bogen', pt: 'Arco', ru: 'Лук (оружие)', id: 'Busur', tr: 'Yay',
    zh: '弓', ja: '弓（ゆみ）', ko: '활', hi: 'धनुष', ar: 'قوس', bn: 'ধনুক', ur: 'کمان'
  },
  'boys': {
    en: 'Boys', es: 'Niños / Chicos', fr: 'Garçons', de: 'Jungen', pt: 'Meninos', ru: 'Мальчики', id: 'Anak laki-laki', tr: 'Erkek çocuklar',
    zh: '男孩们', ja: '男の子たち', ko: '소년들', hi: 'लड़के', ar: 'أولاد', bn: 'ছেলেরা', ur: 'لڑکے'
  },
  'bull': {
    en: 'Bull', es: 'Toro', fr: 'Taureau', de: 'Stier', pt: 'Touro', ru: 'Бык', id: 'Banteng', tr: 'Boğa',
    zh: '公牛', ja: '雄牛', ko: '황소', hi: 'साँड़ / बैल', ar: 'ثور', bn: 'ষাঁড়', ur: 'سانڈ'
  },
  'camel': {
    en: 'Camel', es: 'Camello', fr: 'Chameau', de: 'Kamel', pt: 'Camelo', ru: 'Верблюд', id: 'Unta', tr: 'Deve',
    zh: '骆驼', ja: 'ラクダ', ko: '낙타', hi: 'ऊँट', ar: 'جمل', bn: 'উট', ur: 'اونٹ'
  },
  'candle': {
    en: 'Candle', es: 'Vela', fr: 'Bougie', de: 'Kerze', pt: 'Vela', ru: 'Свеча', id: 'Lilin', tr: 'Mum',
    zh: '蜡烛', ja: 'ろうそく', ko: '양초', hi: 'मोमबत्ती', ar: 'شمعة', bn: 'মোমবাতি', ur: 'موم بتی'
  },
  'cap': {
    en: 'Cap', es: 'Gorra', fr: 'Casquette', de: 'Mütze / Kappe', pt: 'Boné', ru: 'Кепка / Шапка', id: 'Topi', tr: 'Şapka / Kep',
    zh: '帽子', ja: '帽子（キャップ）', ko: '모자', hi: 'टोपी', ar: 'قبعة', bn: 'টুপি', ur: 'ٹوپی'
  },
  'chariot': {
    en: 'Chariot', es: 'Carroza / Carro', fr: 'Char', de: 'Streitwagen', pt: 'Carruagem', ru: 'Колесница', id: 'Kereta kuda', tr: 'Savaş arabası',
    zh: '战车', ja: '戦車 / 馬車', ko: '전차 / 마차', hi: 'रथ', ar: 'عربة حربية', bn: 'রথ', ur: 'رتھ'
  },
  'china': {
    en: 'China', es: 'China', fr: 'Chine', de: 'China', pt: 'China', ru: 'Китай', id: 'Tiongkok / Cina', tr: 'Çin',
    zh: '中国', ja: '中国', ko: '중국', hi: 'चीन', ar: 'الصين', bn: 'চীন', ur: 'چین'
  },
  'cooking': {
    en: 'Cooking', es: 'Cocina / Cocinar', fr: 'Cuisine', de: 'Kochen', pt: 'Cozinhar', ru: 'Готовка / Кулинария', id: 'Memasak', tr: 'Yemek pişirme',
    zh: '烹饪 / 做饭', ja: '料理', ko: '요리', hi: 'खाना पकाना', ar: 'الطبخ', bn: 'রান্না', ur: 'کھانا پکانا'
  },
  'crane': {
    en: 'Crane', es: 'Grulla', fr: 'Grue (oiseau)', de: 'Kranich', pt: 'Grou', ru: 'Журавль', id: 'Bangau', tr: 'Turna',
    zh: '仙鹤', ja: '鶴（つる）', ko: '학 / 두루미', hi: 'सारस / बगुला', ar: 'طائر الكركي', bn: 'সারস / বক', ur: 'بگلا / سارس'
  },
  'cucumber': {
    en: 'Cucumber', es: 'Pepino', fr: 'Concombre', de: 'Gurke', pt: 'Pepino', ru: 'Огурец', id: 'Timun', tr: 'Salatalık',
    zh: '黄瓜', ja: 'きゅうり', ko: '오이', hi: 'खीरा', ar: 'خيار', bn: 'শসা', ur: 'کھیرا'
  },
  'dawn': {
    en: 'Dawn', es: 'Amanecer / Alba', fr: 'Aube', de: 'Morgengrauen', pt: 'Amanhecer', ru: 'Рассвет', id: 'Fajar', tr: 'Şafak',
    zh: '黎明', ja: '夜明け', ko: '새벽', hi: 'भोर / सवेरा', ar: 'فجر', bn: 'ভোর', ur: 'سحر / فجر'
  },
  'deer': {
    en: 'Deer', es: 'Ciervo / Venado', fr: 'Cerf', de: 'Hirsch', pt: 'Veado / Cervo', ru: 'Олень', id: 'Rusa', tr: 'Geyik',
    zh: '鹿', ja: '鹿（しか）', ko: '사슴', hi: 'हिरण', ar: 'غزال', bn: 'হরিণ', ur: 'ہرن'
  },
  'dragon': {
    en: 'Dragon', es: 'Dragón', fr: 'Dragon', de: 'Drache', pt: 'Dragão', ru: 'Дракон', id: 'Naga', tr: 'Ejderha',
    zh: '龙', ja: '龍（りゅう）', ko: '용', hi: 'अजगर / ड्रैगन', ar: 'تنين', bn: 'ড্রাগন', ur: 'اژدہا / ڈریگن'
  },
  'drink': {
    en: 'Drink', es: 'Bebida / Beber', fr: 'Boisson / Boire', de: 'Getränk / Trinken', pt: 'Bebida / Beber', ru: 'Напиток / Пить', id: 'Minuman', tr: 'İçecek',
    zh: '饮料 / 喝', ja: '飲み物', ko: '음료 / 마시다', hi: 'पेय / पीना', ar: 'مشروب', bn: 'পানীয়', ur: 'مشروب / پینا'
  },
  'drum': {
    en: 'Drum', es: 'Tambor', fr: 'Tambour', de: 'Trommel', pt: 'Tambor', ru: 'Барабан', id: 'Drum / Gendang', tr: 'Davul',
    zh: '鼓', ja: '太鼓（たいこ）', ko: '북 / 드럼', hi: 'डमरू / ढोल', ar: 'طبلة', bn: 'ঢাক / ঢোল', ur: 'ڈھول'
  },
  'duck': {
    en: 'Duck', es: 'Pato', fr: 'Canard', de: 'Ente', pt: 'Pato', ru: 'Утка', id: 'Bebek', tr: 'Ördek',
    zh: '鸭子', ja: 'アヒル', ko: '오리', hi: 'बत्तख़', ar: 'بطة', bn: 'হাঁস', ur: 'بطخ'
  },
  'eagle': {
    en: 'Eagle', es: 'Águila', fr: 'Aigle', de: 'Adler', pt: 'Águia', ru: 'Орёл', id: 'Elang', tr: 'Kartal',
    zh: '鹰', ja: '鷲（わし）', ko: '독수리', hi: 'गरुड़ / चील', ar: 'نسر', bn: 'ঈগল', ur: 'عقاب'
  },
  'earth': {
    en: 'Earth / Land', es: 'Tierra', fr: 'Terre', de: 'Erde', pt: 'Terra', ru: 'Земля', id: 'Bumi / Tanah', tr: 'Toprak / Dünya',
    zh: '地球 / 土地', ja: '地球 / 土地', ko: '지구 / 땅', hi: 'पृथ्वी / धरती', ar: 'الأرض', bn: 'পৃথিবী / মাটি', ur: 'زمین'
  },
  'festival': {
    en: 'Festival', es: 'Festival / Fiesta', fr: 'Festival / Fête', de: 'Fest / Festival', pt: 'Festival', ru: 'Праздник / Фестиваль', id: 'Festival / Perayaan', tr: 'Bayram / Festival',
    zh: '节日', ja: '祭り（まつり）', ko: '축제', hi: 'त्योहार / उत्सव', ar: 'مهرجان / عيد', bn: 'উৎসব', ur: 'تہوار / جشن'
  },
  'flag': {
    en: 'Flag', es: 'Bandera', fr: 'Drapeau', de: 'Flagge / Fahne', pt: 'Bandeira', ru: 'Флаг', id: 'Bendera', tr: 'Bayrak',
    zh: '旗帜', ja: '旗（はた）', ko: '깃발 / 국기', hi: 'झंडा', ar: 'علم / راية', bn: 'পতাকা', ur: 'جھنڈا'
  },
  'flowerpot': {
    en: 'Flowerpot', es: 'Maceta', fr: 'Pot de fleurs', de: 'Blumentopf', pt: 'Vaso de flores', ru: 'Цветочный горшок', id: 'Pot bunga', tr: 'Saksı',
    zh: '花盆', ja: '植木鉢', ko: '화분', hi: 'गमला', ar: 'أصيص زهور', bn: 'ফুলের টব', ur: 'گملہ'
  },
  'forest': {
    en: 'Forest', es: 'Bosque', fr: 'Forêt', de: 'Wald', pt: 'Floresta', ru: 'Лес', id: 'Hutan', tr: 'Orman',
    zh: '森林', ja: '森（もり）', ko: '숲', hi: 'जंगल / वन', ar: 'غابة', bn: 'বন / জঙ্গল', ur: 'جنگل'
  },
  'fox': {
    en: 'Fox', es: 'Zorro', fr: 'Renard', de: 'Fuchs', pt: 'Raposa', ru: 'Лиса', id: 'Rubah', tr: 'Tilki',
    zh: '狐狸', ja: '狐（きつね）', ko: '여우', hi: 'लोमड़ी', ar: 'ثعلب', bn: 'শিয়াল', ur: 'لومڑی'
  },
  'fridge': {
    en: 'Fridge', es: 'Nevera / Refrigerador', fr: 'Réfrigérateur / Frigo', de: 'Kühlschrank', pt: 'Geladeira', ru: 'Холодильник', id: 'Kulkas', tr: 'Buzdolabı',
    zh: '冰箱', ja: '冷蔵庫', ko: '냉장고', hi: 'फ्रिज', ar: 'ثلاجة', bn: 'ফ্রিজ', ur: 'فریج'
  },
  'frog': {
    en: 'Frog', es: 'Rana', fr: 'Grenouille', de: 'Frosch', pt: 'Sapo', ru: 'Лягушка', id: 'Katak', tr: 'Kurbağa',
    zh: '青蛙', ja: 'カエル', ko: '개구리', hi: 'मेंढक', ar: 'ضفدع', bn: 'ব্যাঙ', ur: 'مینڈک'
  },
  'goose': {
    en: 'Goose', es: 'Ganso', fr: 'Oie', de: 'Gans', pt: 'Ganso', ru: 'Гусь', id: 'Angsa', tr: 'Kaz',
    zh: '鹅', ja: 'ガチョウ', ko: '거위', hi: 'हंस', ar: 'أوزة', bn: 'রাজহাঁস', ur: 'ہنس'
  },
  'hailstorm': {
    en: 'Hailstorm', es: 'Granizada', fr: 'Tempête de grêle', de: 'Hagelsturm', pt: 'Tempestade de granizo', ru: 'Град', id: 'Hujan es', tr: 'Dolu fırtınası',
    zh: '冰雹', ja: '雹（ひょう）', ko: '우박', hi: 'ओलावृष्टि', ar: 'عاصفة برد', bn: 'শিলাবৃষ্টি', ur: 'ژالہ باری'
  },
  'halwa': {
    en: 'Halwa (Sweet dessert)', es: 'Halva (postre dulce)', fr: 'Halva (dessert)', de: 'Halva (Süßspeise)', pt: 'Halva (doce)', ru: 'Халва', id: 'Halwa (manisan)', tr: 'Helva',
    zh: '哈尔瓦甜点', ja: 'ハルヴァ（甘い菓子）', ko: '할와 (달콤한 디저트)', hi: 'हलवा', ar: 'حلوى', bn: 'হালুয়া', ur: 'حلوہ'
  },
  'hand': {
    en: 'Hand', es: 'Mano', fr: 'Main', de: 'Hand', pt: 'Mão', ru: 'Рука (кисть)', id: 'Tangan', tr: 'El',
    zh: '手', ja: '手（て）', ko: '손', hi: 'हाथ', ar: 'يد', bn: 'হাত', ur: 'ہاتھ'
  },
  'hat': {
    en: 'Hat', es: 'Sombrero', fr: 'Chapeau', de: 'Hut', pt: 'Chapéu', ru: 'Шляпа', id: 'Topi', tr: 'Şapka',
    zh: '帽子', ja: '帽子（ぼうし）', ko: '모자', hi: 'टोपी', ar: 'قبعة', bn: 'টুপি', ur: 'ٹوپی'
  },
  'hexagon': {
    en: 'Hexagon', es: 'Hexágono', fr: 'Hexagone', de: 'Sechseck', pt: 'Hexágono', ru: 'Шестиугольник', id: 'Segi enam', tr: 'Altıgen',
    zh: '六边形', ja: '六角形', ko: '육각형', hi: 'षट्कोण', ar: 'سداسي الأضلاع', bn: 'ষড়ভুজ', ur: 'مسدس'
  },
  'horse': {
    en: 'Horse', es: 'Caballo', fr: 'Cheval', de: 'Pferd', pt: 'Cavalo', ru: 'Лошадь / Конь', id: 'Kuda', tr: 'At',
    zh: '马', ja: '馬（うま）', ko: '말', hi: 'घोड़ा', ar: 'حصان', bn: 'ঘোড়া', ur: 'گھوڑا'
  },
  'i / me': {
    en: 'I / Me', es: 'Yo', fr: 'Je / Moi', de: 'Ich', pt: 'Eu', ru: 'Я', id: 'Saya / Aku', tr: 'Ben',
    zh: '我', ja: '私（わたし）', ko: '나 / 저', hi: 'मैं', ar: 'أنا', bn: 'আমি', ur: 'میں'
  },
  'inkpot': {
    en: 'Inkpot', es: 'Tintero', fr: 'Encrier', de: 'Tintenfass', pt: 'Tinteiro', ru: 'Чернильница', id: 'Botol tinta', tr: 'Mürekkep hokkası',
    zh: '墨水瓶', ja: 'インク壺', ko: '잉크병', hi: 'दवात', ar: 'محبرة', bn: 'দোয়াত / কালির পাত্র', ur: 'دوات'
  },
  'insect': {
    en: 'Insect', es: 'Insecto', fr: 'Insecte', de: 'Insekt', pt: 'Inseto', ru: 'Насекомое', id: 'Serangga', tr: 'Böcek',
    zh: '昆虫', ja: '虫（むし）', ko: '곤충 / 벌레', hi: 'कीड़ा', ar: 'حشرة', bn: 'পোকা', ur: 'کیڑا'
  },
  'japan': {
    en: 'Japan', es: 'Japón', fr: 'Japon', de: 'Japan', pt: 'Japão', ru: 'Япония', id: 'Jepang', tr: 'Japonya',
    zh: '日本', ja: '日本', ko: '일본', hi: 'जापान', ar: 'اليابان', bn: 'জাপান', ur: 'جاپان'
  },
  'kite': {
    en: 'Kite', es: 'Cometa', fr: 'Cerf-volant', de: 'Drachen (Spielzeug)', pt: 'Pipa', ru: 'Воздушный змей', id: 'Layang-layang', tr: 'Uçurtma',
    zh: '风筝', ja: '凧（たこ）', ko: '연', hi: 'पतंग', ar: 'طائرة ورقية', bn: 'ঘুড়ি', ur: 'پتنگ'
  },
  'letter': {
    en: 'Letter', es: 'Carta', fr: 'Lettre', de: 'Brief', pt: 'Carta', ru: 'Письмо', id: 'Surat', tr: 'Mektup',
    zh: '信件', ja: '手紙', ko: '편지', hi: 'पत्र / चिट्ठी', ar: 'رسالة', bn: 'চিঠি', ur: 'خط'
  },
  'lid': {
    en: 'Lid / Cover', es: 'Tapa', fr: 'Couvercle', de: 'Deckel', pt: 'Tampa', ru: 'Крышка', id: 'Tutup', tr: 'Kapak',
    zh: '盖子', ja: '蓋（ふた）', ko: '뚜껑', hi: 'ढक्कन', ar: 'غطاء', bn: 'ঢাকনা', ur: 'ڈھکن'
  },
  'lion': {
    en: 'Lion', es: 'León', fr: 'Lion', de: 'Löwe', pt: 'Leão', ru: 'Лев', id: 'Singa', tr: 'Aslan',
    zh: '狮子', ja: 'ライオン', ko: '사자', hi: 'शेर / सिंह', ar: 'أسد', bn: 'সিংহ', ur: 'شیر'
  },
  'lip': {
    en: 'Lip', es: 'Labio', fr: 'Lèvre', de: 'Lippe', pt: 'Lábio', ru: 'Губа', id: 'Bibir', tr: 'Dudak',
    zh: '嘴唇', ja: '唇（くちびる）', ko: '입술', hi: 'होंठ', ar: 'شفة', bn: 'ঠোঁট', ur: 'ہونٹ'
  },
  'lotus': {
    en: 'Lotus', es: 'Loto', fr: 'Lotus', de: 'Lotusblume', pt: 'Lótus', ru: 'Лотос', id: 'Teratai', tr: 'Nilüfer / Lotus',
    zh: '莲花', ja: '蓮（はす）', ko: '연꽃', hi: 'कमल', ar: 'زهرة اللوتس', bn: 'পদ্মফুল', ur: 'کنول'
  },
  'mirror': {
    en: 'Mirror', es: 'Espejo', fr: 'Miroir', de: 'Spiegel', pt: 'Espelho', ru: 'Зеркало', id: 'Cermin', tr: 'Ayna',
    zh: '镜子', ja: '鏡（かがみ）', ko: '거울', hi: 'आईना / दर्पण', ar: 'مرآة', bn: 'আয়না', ur: 'آئینہ'
  },
  'mister': {
    en: 'Mister / Sir', es: 'Señor', fr: 'Monsieur', de: 'Herr', pt: 'Senhor', ru: 'Господин / Мистер', id: 'Tuan / Bapak', tr: 'Bay',
    zh: '先生', ja: '氏 / さん', ko: '씨 / 선생님', hi: 'श्रीमान', ar: 'سيد', bn: 'জনাব', ur: 'جناب'
  },
  'mortar': {
    en: 'Mortar (Grinding bowl)', es: 'Mortero', fr: 'Mortier', de: 'Mörser', pt: 'Pilão / Almofariz', ru: 'Ступка', id: 'Lesung / Cobek', tr: 'Havan',
    zh: '研钵 / 臼', ja: 'すり鉢 / 臼', ko: '절구', hi: 'ओखली', ar: 'هاون', bn: 'হামানদিস্তা', ur: 'اوکھلی'
  },
  'owl': {
    en: 'Owl', es: 'Búho / Lechuza', fr: 'Hibou', de: 'Eule', pt: 'Coruja', ru: 'Сова', id: 'Burung hantu', tr: 'Baykuş',
    zh: '猫头鹰', ja: 'フクロウ', ko: '부엉이 / 올빼미', hi: 'उल्लू', ar: 'بومة', bn: 'পেঁচা', ur: 'الو'
  },
  'paddy': {
    en: 'Paddy (Rice crop)', es: 'Arrozal', fr: 'Rizière / Riz paddy', de: 'Reispflanze', pt: 'Arroz com casca', ru: 'Рис-сырец', id: 'Padi', tr: 'Çeltik',
    zh: '稻谷', ja: '稲（いね）', ko: '벼', hi: 'धान', ar: 'أرز غير مقشور', bn: 'ধান', ur: 'دھان'
  },
  'parrot': {
    en: 'Parrot', es: 'Loro', fr: 'Perroquet', de: 'Papagei', pt: 'Papagaio', ru: 'Попугай', id: 'Burung beo', tr: 'Papağan',
    zh: '鹦鹉', ja: 'オウム / インコ', ko: '앵무새', hi: 'तोता', ar: 'ببغاء', bn: 'তোতা পাখি', ur: 'طوطا'
  },
  'piano': {
    en: 'Piano', es: 'Piano', fr: 'Piano', de: 'Klavier', pt: 'Piano', ru: 'Пианино / Фортепиано', id: 'Piano', tr: 'Piyano',
    zh: '钢琴', ja: 'ピアノ', ko: '피아노', hi: 'पियानो', ar: 'بيانو', bn: 'পিয়ানো', ur: 'پیانو'
  },
  'plushie': {
    en: 'Plushie / Stuffed toy', es: 'Peluche', fr: 'Peluche', de: 'Stofftier', pt: 'Pelúcia', ru: 'Плюшевая игрушка', id: 'Boneka', tr: 'Peluş oyuncak',
    zh: '毛绒玩具', ja: 'ぬいぐるみ', ko: '봉제 인형', hi: 'खिलौना / टेडी', ar: 'دمية محشوة', bn: 'পুতুল', ur: 'کھلونا گڑیا'
  },
  'pomegranate': {
    en: 'Pomegranate', es: 'Granada', fr: 'Grenade (fruit)', de: 'Granatapfel', pt: 'Romã', ru: 'Гранат (фрукт)', id: 'Delima', tr: 'Nar',
    zh: '石榴', ja: 'ザクロ', ko: '석류', hi: 'अनार', ar: 'رمان', bn: 'ডালিম / বেদানা', ur: 'انار'
  },
  'python': {
    en: 'Python', es: 'Pitón', fr: 'Python', de: 'Python', pt: 'Píton', ru: 'Питон', id: 'Ular piton', tr: 'Piton',
    zh: '蟒蛇', ja: 'ニシキヘビ', ko: '비단뱀', hi: 'अजगर', ar: 'ثعبان الأصلة', bn: 'অজগর', ur: 'اژدہا'
  },
  'rabbit': {
    en: 'Rabbit', es: 'Conejo', fr: 'Lapin', de: 'Kaninchen', pt: 'Coelho', ru: 'Кролик', id: 'Kelinci', tr: 'Tavşan',
    zh: '兔子', ja: 'うさぎ', ko: '토끼', hi: 'खरगोश', ar: 'أرنب', bn: 'খরগোশ', ur: 'خرگوش'
  },
  'rose': {
    en: 'Rose', es: 'Rosa', fr: 'Rose', de: 'Rose', pt: 'Rosa', ru: 'Роза', id: 'Mawar', tr: 'Gül',
    zh: '玫瑰', ja: 'バラ', ko: '장미', hi: 'गुलाब', ar: 'وردة', bn: 'গোলাপ', ur: 'گلاب'
  },
  'sacred fire': {
    en: 'Sacred fire', es: 'Fuego sagrado', fr: 'Feu sacré', de: 'Heiliges Feuer', pt: 'Fogo sagrado', ru: 'Священный огонь', id: 'Api suci', tr: 'Kutsal ateş',
    zh: '圣火', ja: '聖火', ko: '성화', hi: 'यज्ञ', ar: 'نار مقدسة', bn: 'যজ্ঞের আগুন', ur: 'مقدس آگ'
  },
  'sadness': {
    en: 'Sadness', es: 'Tristeza', fr: 'Tristesse', de: 'Traurigkeit', pt: 'Tristeza', ru: 'Грусть / Печаль', id: 'Kesedihan', tr: 'Üzüntü',
    zh: '悲伤', ja: '悲しみ', ko: '슬픔', hi: 'उदासी / दुख', ar: 'حزن', bn: 'দুঃখ', ur: 'اداسی'
  },
  'sage': {
    en: 'Sage (Wise person)', es: 'Sabio', fr: 'Sage', de: 'Weiser', pt: 'Sábio', ru: 'Мудрец', id: 'Orang bijak / Resi', tr: 'Bilge',
    zh: '圣贤', ja: '賢者', ko: '현자', hi: 'ऋषि', ar: 'حكيم', bn: 'ঋষি / জ্ঞানী', ur: 'دانا / حکیم'
  },
  'season': {
    en: 'Season', es: 'Estación / Temporada', fr: 'Saison', de: 'Jahreszeit', pt: 'Estação', ru: 'Сезон / Время года', id: 'Musim', tr: 'Mevsim',
    zh: '季节', ja: '季節', ko: '계절', hi: 'ऋतु / मौसम', ar: 'فصل / موسم', bn: 'ঋতু', ur: 'موسم'
  },
  'ship': {
    en: 'Ship', es: 'Barco / Buque', fr: 'Navire / Bateau', de: 'Schiff', pt: 'Navio', ru: 'Корабль', id: 'Kapal', tr: 'Gemi',
    zh: '船 / 轮船', ja: '船（ふね）', ko: '배 / 선박', hi: 'जहाज़', ar: 'سفينة', bn: 'জাহাজ', ur: 'بحری جہاز'
  },
  'soap': {
    en: 'Soap', es: 'Jabón', fr: 'Savon', de: 'Seife', pt: 'Sabão / Sabonete', ru: 'Мыло', id: 'Sabun', tr: 'Sabun',
    zh: '肥皂', ja: '石鹸', ko: '비누', hi: 'साबुन', ar: 'صابون', bn: 'সাবান', ur: 'صابن'
  },
  'spectacles': {
    en: 'Spectacles / Glasses', es: 'Gafas / Lentes', fr: 'Lunettes', de: 'Brille', pt: 'Óculos', ru: 'Очки', id: 'Kacamata', tr: 'Gözlük',
    zh: '眼镜', ja: '眼鏡（めがね）', ko: '안경', hi: 'ऐनक / चश्मा', ar: 'نظارة', bn: 'চশমা', ur: 'عینک'
  },
  'spinning top': {
    en: 'Spinning top', es: 'Trompo / Peonza', fr: 'Toupie', de: 'Kreisel', pt: 'Pião', ru: 'Волчок', id: 'Gasing', tr: 'Topaç',
    zh: '陀螺', ja: '独楽（こま）', ko: '팽이', hi: 'लट्टू', ar: 'بلبل (لعبة)', bn: 'লাটিম', ur: 'لٹو'
  },
  'stamp': {
    en: 'Stamp / Seal', es: 'Sello', fr: 'Timbre / Tampon', de: 'Stempel', pt: 'Carimbo / Selo', ru: 'Печать / Штамп', id: 'Stempel / Cap', tr: 'Damga / Mühür',
    zh: '印章', ja: 'ハンコ / 切手', ko: '도장 / 우표', hi: 'ठप्पा / मोहर', ar: 'ختم', bn: 'সিলমোহর / ডাকটিকিট', ur: 'مہر'
  },
  'sugarcane': {
    en: 'Sugarcane', es: 'Caña de azúcar', fr: 'Canne à sucre', de: 'Zuckerrohr', pt: 'Cana-de-açúcar', ru: 'Сахарный тростник', id: 'Tebu', tr: 'Şeker kamışı',
    zh: '甘蔗', ja: 'サトウキビ', ko: '사탕수수', hi: 'ईख / गन्ना', ar: 'قصب السكر', bn: 'আখ', ur: 'گنا'
  },
  'summer': {
    en: 'Summer', es: 'Verano', fr: 'Été', de: 'Sommer', pt: 'Verão', ru: 'Лето', id: 'Musim panas', tr: 'Yaz',
    zh: '夏天', ja: '夏（なつ）', ko: '여름', hi: 'गर्मी का मौसम', ar: 'الصيف', bn: 'গ্রীষ্মকাল', ur: 'گرمیوں کا موسم'
  },
  'sushi': {
    en: 'Sushi', es: 'Sushi', fr: 'Sushi', de: 'Sushi', pt: 'Sushi', ru: 'Суши', id: 'Sushi', tr: 'Suşi',
    zh: '寿司', ja: '寿司（すし）', ko: '초밥 / 스시', hi: 'सुशी', ar: 'سوشي', bn: 'সুশি', ur: 'سوشی'
  },
  'tamarind': {
    en: 'Tamarind', es: 'Tamarindo', fr: 'Tamarin', de: 'Tamarinde', pt: 'Tamarindo', ru: 'Тамаринд', id: 'Asam jawa', tr: 'Demirhindi',
    zh: '罗望子', ja: 'タマリンド', ko: '타마린드', hi: 'इमली', ar: 'تمر هندي', bn: 'তেঁতুল', ur: 'املی'
  },
  'tap': {
    en: 'Tap / Faucet', es: 'Grifo / Llave', fr: 'Robinet', de: 'Wasserhahn', pt: 'Torneira', ru: 'Кран (водопроводный)', id: 'Keran air', tr: 'Musluk',
    zh: '水龙头', ja: '蛇口', ko: '수도꼭지', hi: 'नल', ar: 'صنبور', bn: 'কল', ur: 'نلکا'
  },
  'tomato': {
    en: 'Tomato', es: 'Tomate', fr: 'Tomate', de: 'Tomate', pt: 'Tomate', ru: 'Помидор / Томат', id: 'Tomat', tr: 'Domates',
    zh: '西红柿 / 番茄', ja: 'トマト', ko: '토마토', hi: 'टमाटर', ar: 'طماطم', bn: 'টমেটো', ur: 'ٹماٹر'
  },
  'treasure': {
    en: 'Treasure', es: 'Tesoro', fr: 'Trésor', de: 'Schatz', pt: 'Tesouro', ru: 'Сокровище / Клад', id: 'Harta karun', tr: 'Hazine',
    zh: '宝藏 / 财宝', ja: '宝（たから）', ko: '보물', hi: 'ख़ज़ाना', ar: 'كنز', bn: 'গুপ্তধন / ধন', ur: 'خزانہ'
  },
  'turnip': {
    en: 'Turnip', es: 'Nabo', fr: 'Navet', de: 'Steckrübe / Rübe', pt: 'Nabo', ru: 'Репа', id: 'Lobak putih', tr: 'Şalgam',
    zh: '芜菁 / 萝卜', ja: 'カブ', ko: '순무', hi: 'शलगम', ar: 'لفت', bn: 'শালগম', ur: 'شلجم'
  },
  'vehicle': {
    en: 'Vehicle', es: 'Vehículo', fr: 'Véhicule', de: 'Fahrzeug', pt: 'Veículo', ru: 'Транспорт / Машина', id: 'Kendaraan', tr: 'Araç / Taşıt',
    zh: '车辆', ja: '乗り物', ko: '차량 / 탈것', hi: 'वाहन', ar: 'مركبة', bn: 'বাহন / গাড়ি', ur: 'گاڑی / سواری'
  },
  'vessel': {
    en: 'Vessel / Container', es: 'Vasija / Recipiente', fr: 'Récipient / Vase', de: 'Gefäß', pt: 'Vasilha / Recipiente', ru: 'Сосуд', id: 'Wadah / Bejana', tr: 'Kap',
    zh: '器皿 / 容器', ja: '容器（ようき）', ko: '그릇 / 용기', hi: 'बर्तन / पात्र', ar: 'إناء / وعاء', bn: 'পাত্র', ur: 'برتن / ظرف'
  },
  'watermelon': {
    en: 'Watermelon', es: 'Sandía', fr: 'Pastèque', de: 'Wassermelone', pt: 'Melancia', ru: 'Арбуз', id: 'Semangka', tr: 'Karpuz',
    zh: '西瓜', ja: 'スイカ', ko: '수박', hi: 'तरबूज़', ar: 'بطيخ', bn: 'তরমুজ', ur: 'تربوز'
  },
  'wolf': {
    en: 'Wolf', es: 'Lobo', fr: 'Loup', de: 'Wolf', pt: 'Lobo', ru: 'Волк', id: 'Serigala', tr: 'Kurt',
    zh: '狼', ja: '狼（おおかみ）', ko: '늑대', hi: 'भेड़िया', ar: 'ذئب', bn: 'নেকড়ে', ur: 'بھیڑیا'
  },
  'wool': {
    en: 'Wool', es: 'Lana', fr: 'Laine', de: 'Wolle', pt: 'Lã', ru: 'Шерсть', id: 'Wol', tr: 'Yün',
    zh: '羊毛', ja: '羊毛（ウール）', ko: '양모 / 울', hi: 'ऊन', ar: 'صوف', bn: 'উল / পশম', ur: 'اون'
  },
  'yam': {
    en: 'Yam', es: 'Ñame', fr: 'Igname', de: 'Yamswurzel', pt: 'Inhame', ru: 'Ямс / Батат', id: 'Ubi / Talas', tr: 'Yer elması',
    zh: '山药', ja: 'ヤムイモ', ko: '참마 / 얌', hi: 'रतालू', ar: 'يام (بطاطا)', bn: 'কচু / মিষ্টি আলু', ur: 'رتالو'
  },

  // Missing Time expressions (all 15 languages)
  "it is 1:00 (one o'clock)": {
    en: "It is 1:00 (One o'clock)", es: 'Es la 1:00 (la una)', fr: 'Il est 1h00 (une heure)', de: 'Es ist 1:00 Uhr', pt: 'É 1:00 (uma hora)', ru: 'Сейчас 1:00 (час дня)', id: 'Sekarang jam 1:00 (satu)', tr: 'Saat 1:00 (bir)',
    zh: '现在一点 (1:00)', ja: '1時です (1:00)', ko: '한 시입니다 (1:00)', hi: 'एक बजा है (1:00)', ar: 'الساعة الواحدة (1:00)', bn: 'এখন একটা বাজে (১:০০)', ur: 'ایک بجا ہے (1:00)'
  },
  "it is 2:00 (two o'clock)": {
    en: "It is 2:00 (Two o'clock)", es: 'Son las 2:00 (dos)', fr: 'Il est 2h00 (deux heures)', de: 'Es ist 2:00 Uhr', pt: 'São 2:00 (duas horas)', ru: 'Сейчас 2:00 (два часа)', id: 'Sekarang jam 2:00 (dua)', tr: 'Saat 2:00 (iki)',
    zh: '现在两点 (2:00)', ja: '2時です (2:00)', ko: '두 시입니다 (2:00)', hi: 'दो बजे हैं (2:00)', ar: 'الساعة الثانية (2:00)', bn: 'এখন দুইটা বাজে (২:০০)', ur: 'دو بجے ہیں (2:00)'
  },
  "it is 3:00 (three o'clock)": {
    en: "It is 3:00 (Three o'clock)", es: 'Son las 3:00 (tres)', fr: 'Il est 3h00 (trois heures)', de: 'Es ist 3:00 Uhr', pt: 'São 3:00 (três horas)', ru: 'Сейчас 3:00 (три часа)', id: 'Sekarang jam 3:00 (tiga)', tr: 'Saat 3:00 (üç)',
    zh: '现在三点 (3:00)', ja: '3時です (3:00)', ko: '세 시입니다 (3:00)', hi: 'तीन बजे हैं (3:00)', ar: 'الساعة الثالثة (3:00)', bn: 'এখন তিনটা বাজে (৩:০০)', ur: 'تین بجے ہیں (3:00)'
  },
  '1:30 (half past one)': {
    en: '1:30 (Half past one)', es: 'La 1:30 (una y media)', fr: '1h30 (une heure et demie)', de: '1:30 Uhr (halb zwei)', pt: '1:30 (uma e meia)', ru: '1:30 (половина второго)', id: '1:30 (setengah dua)', tr: 'Saat 1:30 (bir buçuk)',
    zh: '一点半 (1:30)', ja: '1時半 (1:30)', ko: '1시 30분 (1시 반)', hi: 'डेढ़ बजा है (1:30)', ar: 'الواحدة والنصف (1:30)', bn: 'দেড়টা (১:৩০)', ur: 'ڈیڑھ بجا ہے (1:30)'
  },
  '2:30 (half past two)': {
    en: '2:30 (Half past two)', es: 'Las 2:30 (dos y media)', fr: '2h30 (deux heures et demie)', de: '2:30 Uhr (halb drei)', pt: '2:30 (duas e meia)', ru: '2:30 (половина третьего)', id: '2:30 (setengah tiga)', tr: 'Saat 2:30 (iki buçuk)',
    zh: '两点半 (2:30)', ja: '2時半 (2:30)', ko: '2시 30분 (2시 반)', hi: 'ढाई बजे हैं (2:30)', ar: 'الثانية والنصف (2:30)', bn: 'আড়াইটা (২:৩০)', ur: 'ڈھائی بجے ہیں (2:30)'
  },
  '4:30 (half past four)': {
    en: '4:30 (Half past four)', es: 'Las 4:30 (cuatro y media)', fr: '4h30 (quatre heures et demie)', de: '4:30 Uhr (halb fünf)', pt: '4:30 (quatro e meia)', ru: '4:30 (половина пятого)', id: '4:30 (setengah lima)', tr: 'Saat 4:30 (dört buçuk)',
    zh: '四点半 (4:30)', ja: '4時半 (4:30)', ko: '4시 30분 (4시 반)', hi: 'साढ़े चार (4:30)', ar: 'الرابعة والنصف (4:30)', bn: 'সাড়ে চারটা (৪:৩০)', ur: 'ساڑھے چار بجے ہیں (4:30)'
  },
  '8:00 am (morning)': {
    en: '8:00 AM (Morning)', es: '8:00 AM (Mañana)', fr: '8h00 (Matin)', de: '8:00 Uhr (Morgens)', pt: '8:00 (Manhã)', ru: '8:00 утра', id: 'Jam 8:00 pagi', tr: 'Sabah 8:00',
    zh: '早上八点 (8:00)', ja: '午前8時 (8:00)', ko: '오전 8시 (아침)', hi: 'सुबह 8:00 बजे', ar: 'الثامنة صباحاً (8:00)', bn: 'সকাল আটটা (৮:০০)', ur: 'صبح کے آٹھ بجے (8:00)'
  },
  '12:00 pm (noon)': {
    en: '12:00 PM (Noon)', es: '12:00 PM (Mediodía)', fr: '12h00 (Midi)', de: '12:00 Uhr (Mittag)', pt: '12:00 (Meio-dia)', ru: '12:00 (Полдень)', id: 'Jam 12:00 siang', tr: 'Öğlen 12:00',
    zh: '中午十二点 (12:00)', ja: '正午12時 (12:00)', ko: '정오 12시 (낮)', hi: 'दोपहर 12:00 बजे', ar: 'الثانية عشرة ظهراً (12:00)', bn: 'দুপুর বারোটা (১২:০০)', ur: 'دوپہر کے بارہ بجے (12:00)'
  },
  '7:00 pm (evening)': {
    en: '7:00 PM (Evening)', es: '7:00 PM (Tarde / Noche)', fr: '19h00 (Soir)', de: '19:00 Uhr (Abends)', pt: '19:00 (Noite)', ru: '19:00 (Вечер)', id: 'Jam 7:00 malam', tr: 'Akşam 7:00',
    zh: '晚上七点 (7:00)', ja: '午後7時 (夕方・夜)', ko: '오후 7시 (저녁)', hi: 'शाम 7:00 बजे', ar: 'السابعة مساءً (7:00)', bn: 'সন্ধ্যা সাতটা (৭:০০)', ur: 'شام کے سات بجے (7:00)'
  },
  '10:00 pm (night)': {
    en: '10:00 PM (Night)', es: '10:00 PM (Noche)', fr: '22h00 (Nuit)', de: '22:00 Uhr (Nachts)', pt: '22:00 (Noite)', ru: '22:00 (Ночь)', id: 'Jam 10:00 malam', tr: 'Gece 10:00',
    zh: '晚上十点 (10:00)', ja: '午後10時 (夜)', ko: '밤 10시', hi: 'रात 10:00 बजे', ar: 'العاشرة ليلاً (10:00)', bn: 'রাত দশটা (১০:০০)', ur: 'رات کے دس بجے (10:00)'
  },
  'at noon (12:00 pm)': {
    en: 'At noon (12:00 PM)', es: 'Al mediodía (12:00 PM)', fr: 'À midi (12h00)', de: 'Mittags (12:00 Uhr)', pt: 'Ao meio-dia (12:00)', ru: 'В полдень (12:00)', id: 'Pada siang hari (12:00)', tr: 'Öğlen (12:00)',
    zh: '在中午 (12:00)', ja: '正午に (12:00)', ko: '정오에 (12:00)', hi: 'दोपहर में (12:00)', ar: 'ظهراً (12:00)', bn: 'দুপুরবেলা (১২:০০)', ur: 'دوپہر کے وقت (12:00)'
  },
  'half past (:30)': {
    en: 'Half past (:30)', es: 'Y media (:30)', fr: 'Et demie (:30)', de: 'Halb (:30)', pt: 'E meia (:30)', ru: 'Половина (:30)', id: 'Setengah (:30)', tr: 'Buçuk (:30)',
    zh: '半 (:30)', ja: '半 (:30)', ko: '반 (:30)', hi: 'साढ़े (:30)', ar: 'والنصف (:30)', bn: 'সাড়ে (:৩০)', ur: 'ساڑھے (:30)'
  },
  'quarter past (:15)': {
    en: 'Quarter past (:15)', es: 'Y cuarto (:15)', fr: 'Et quart (:15)', de: 'Viertel nach (:15)', pt: 'E quinze (:15)', ru: 'Четверть (:15)', id: 'Lewat seperempat (:15)', tr: 'Çeyrek geçe (:15)',
    zh: '一刻 (:15)', ja: '15分過ぎ (:15)', ko: '15분 (:15)', hi: 'सवा (:15)', ar: 'والربع (:15)', bn: 'সওয়া (:১৫)', ur: 'سوا (:15)'
  },
  'quarter to (:45)': {
    en: 'Quarter to (:45)', es: 'Menos cuarto (:45)', fr: 'Moins le quart (:45)', de: 'Viertel vor (:45)', pt: 'Quinze para (:45)', ru: 'Без четверти (:45)', id: 'Kurang seperempat (:45)', tr: 'Çeyrek kala (:45)',
    zh: '差一刻 (:45)', ja: '15分前 (:45)', ko: '15분 전 (:45)', hi: 'पौने (:45)', ar: 'إلا ربعاً (:45)', bn: 'পৌনে (:৪৫)', ur: 'پونے (:45)'
  },
  'am (morning)': {
    en: 'AM (Morning)', es: 'AM (Mañana)', fr: 'Matin (AM)', de: 'Vormittag (AM)', pt: 'Manhã (AM)', ru: 'Утра (AM)', id: 'Pagi (AM)', tr: 'Sabah (AM)',
    zh: '上午 (AM)', ja: '午前 (AM)', ko: '오전 (AM)', hi: 'सुबह (AM)', ar: 'صباحاً (AM)', bn: 'সকাল (AM)', ur: 'صبح (AM)'
  },
  'pm (afternoon)': {
    en: 'PM (Afternoon)', es: 'PM (Tarde)', fr: 'Après-midi (PM)', de: 'Nachmittag (PM)', pt: 'Tarde (PM)', ru: 'Дня / Вечера (PM)', id: 'Siang / Sore (PM)', tr: 'Öğleden sonra (PM)',
    zh: '下午 (PM)', ja: '午後 (PM)', ko: '오후 (PM)', hi: 'दोपहर (PM)', ar: 'مساءً (PM)', bn: 'দুপুর / বিকেল (PM)', ur: 'دوپہر / شام (PM)'
  },

  // Multi-word basic phrases & cross-curriculum idioms (prevent Step-5 single-word collapse across all 15 languages)
  'a glass of water please': {
    en: 'A glass of water, please', es: 'Un vaso de agua, por favor', fr: 'Un verre d\'eau, s\'il vous plaît', de: 'Ein Glas Wasser, bitte', pt: 'Um copo de água, por favor', ru: 'Стакан воды, пожалуйста', id: 'Segelas air, tolong', tr: 'Bir bardak su, lütfen',
    zh: '请给我一杯水', ja: 'お水を一杯ください', ko: '물 한 잔 주세요', hi: 'कृपया एक गिलास पानी दीजिए', ar: 'كوب من الماء، من فضلك', bn: 'এক গ্লাস জল দিন', ur: 'براہِ کرم ایک گلاس پانی دیجیے'
  },
  'a table for two': {
    en: 'A table for two', es: 'Una mesa para dos', fr: 'Une table pour deux', de: 'Einen Tisch für zwei', pt: 'Uma mesa para dois', ru: 'Столик на двоих', id: 'Meja untuk dua orang', tr: 'İki kişilik bir masa',
    zh: '一张两人桌', ja: '2名席', ko: '두 명 자리', hi: 'दो लोगों के लिए मेज़', ar: 'طاولة لشخصين', bn: 'দুইজনের জন্য টেবিল', ur: 'دو افراد کے لیے میز'
  },
  'call a doctor': {
    en: 'Call a doctor', es: 'Llame a un médico', fr: 'Appelez un médecin', de: 'Rufen Sie einen Arzt', pt: 'Chame um médico', ru: 'Вызовите врача', id: 'Panggil dokter', tr: 'Doktor çağırın',
    zh: '请叫医生', ja: '医者を呼んでください', ko: '의사를 불러주세요', hi: 'डॉक्टर को बुलाइए', ar: 'اتصل بطبيب', bn: 'ডাক্তার ডাকুন', ur: 'ڈاکٹر کو بلائیں'
  },
  'call an ambulance': {
    en: 'Call an ambulance', es: 'Llame a una ambulancia', fr: 'Appelez une ambulance', de: 'Rufen Sie einen Krankenwagen', pt: 'Chame uma ambulância', ru: 'Вызовите скорую помощь', id: 'Panggil ambulans', tr: 'Ambulans çağırın',
    zh: '请叫救护车', ja: '救急車を呼んでください', ko: '구급차를 불러주세요', hi: 'एम्बुलेंस बुलाइए', ar: 'اتصل بسيارة إسعاف', bn: 'অ্যাম্বুলেন্স ডাকুন', ur: 'ایمبولینس بلائیں'
  },
  'i am sharing my screen': {
    en: 'I am sharing my screen', es: 'Estoy compartiendo mi pantalla', fr: 'Je partage mon écran', de: 'Ich teile meinen Bildschirm', pt: 'Estou compartilhando minha tela', ru: 'Я показываю свой экран', id: 'Saya sedang berbagi layar', tr: 'Ekranımı paylaşıyorum',
    zh: '我正在共享屏幕', ja: '画面を共有しています', ko: '화면을 공유하고 있어요', hi: 'मैं अपनी स्क्रीन साझा कर रहा हूँ', ar: 'أشارك شاشتي الآن', bn: 'আমি স্ক্রিন শেয়ার করছি', ur: 'میں اپنی اسکرین شیئر کر رہا ہوں'
  },
  'my battery is dead': {
    en: 'My battery is dead', es: 'Mi batería está agotada', fr: 'Ma batterie est déchargée', de: 'Mein Akku ist leer', pt: 'Minha bateria acabou', ru: 'У меня села батарея', id: 'Baterai saya habis', tr: 'Şarjım bitti',
    zh: '我的电池没电了', ja: 'バッテリーが切れました', ko: '배터리가 다 닳았어요', hi: 'मेरी बैटरी ख़त्म हो गई है', ar: 'بطاريتي فرغت', bn: 'আমার চার্জ শেষ হয়ে গেছে', ur: 'میری بیٹری ختم ہو گئی ہے'
  },
  'one ticket please': {
    en: 'One ticket, please', es: 'Un boleto, por favor', fr: 'Un billet, s\'il vous plaît', de: 'Ein Ticket, bitte', pt: 'Uma passagem, por favor', ru: 'Один билет, пожалуйста', id: 'Satu tiket, tolong', tr: 'Bir bilet, lütfen',
    zh: '请给我一张票', ja: '切符を一枚ください', ko: '표 한 장 주세요', hi: 'कृपया एक टिकट दीजिए', ar: 'تذكرة واحدة، من فضلك', bn: 'একটি টিকিট দিন', ur: 'براہِ کرم ایک ٹکٹ دیجیے'
  },
  'the bill please': {
    en: 'The bill, please', es: 'La cuenta, por favor', fr: 'L\'addition, s\'il vous plaît', de: 'Die Rechnung, bitte', pt: 'A conta, por favor', ru: 'Счёт, пожалуйста', id: 'Minta bonnya, tolong', tr: 'Hesap, lütfen',
    zh: '请买单', ja: 'お会計をお願いします', ko: '계산서 주세요', hi: 'कृपया बिल दीजिए', ar: 'الفاتورة، من فضلك', bn: 'বিলটা দিন, দয়া করে', ur: 'براہِ کرم بل لا دیجیے'
  },
  'the food is very delicious': {
    en: 'The food is very delicious', es: 'La comida está muy deliciosa', fr: 'La nourriture est délicieuse', de: 'Das Essen ist sehr lecker', pt: 'A comida está muito deliciosa', ru: 'Еда очень вкусная', id: 'Makanannya sangat lezat', tr: 'Yemek çok lezzetli',
    zh: '食物非常美味', ja: '料理がとても美味しいです', ko: '음식이 아주 맛있어요', hi: 'खाना बहुत स्वादिष्ट है', ar: 'الطعام لذيذ جداً', bn: 'খাবার খুব সুস্বাদু', ur: 'کھانا بہت لذیذ ہے'
  },
  'the internet is very slow': {
    en: 'The internet is very slow', es: 'El internet es muy lento', fr: 'Internet est très lent', de: 'Das Internet ist sehr langsam', pt: 'A internet está muito lenta', ru: 'Интернет очень медленный', id: 'Internetnya sangat lambat', tr: 'İnternet çok yavaş',
    zh: '网络非常慢', ja: 'インターネットがとても遅いです', ko: '인터넷이 매우 느려요', hi: 'इंटरनेट बहुत धीमा है', ar: 'الإنترنت بطيء جداً', bn: 'ইন্টারনেট খুব ধীরগতি', ur: 'انٹرنیٹ بہت سست ہے'
  },
  'where is it?': {
    en: 'Where is it?', es: '¿Dónde está?', fr: 'Où est-ce ?', de: 'Wo ist es?', pt: 'Onde fica?', ru: 'Где это?', id: 'Di mana itu?', tr: 'Nerede?',
    zh: '它在哪里？', ja: 'どこにありますか？', ko: '어디에 있어요?', hi: 'यह कहाँ है?', ar: 'أين هو؟', bn: 'এটা কোথায়?', ur: 'یہ کہاں ہے؟'
  },
  'where will the car stop?': {
    en: 'Where will the car stop?', es: '¿Dónde se detendrá el coche?', fr: 'Où la voiture va-t-elle s\'arrêter ?', de: 'Wo wird das Auto halten?', pt: 'Onde o carro vai parar?', ru: 'Где остановится машина?', id: 'Di mana mobil akan berhenti?', tr: 'Araba nerede duracak?',
    zh: '车会在哪里停？', ja: '車はどこに停まりますか？', ko: '차가 어디에 멈추나요?', hi: 'गाड़ी कहाँ रुकेगी?', ar: 'أين ستتوقف السيارة؟', bn: 'গাড়ি কোথায় থামবে?', ur: 'گاڑی کہاں رکے گی؟'
  },
  'please send an email': {
    en: 'Please send an email', es: 'Por favor, envíe un correo electrónico', fr: 'Veuillez envoyer un courriel', de: 'Bitte senden Sie eine E-Mail', pt: 'Por favor, envie um e-mail', ru: 'Пожалуйста, отправьте письмо', id: 'Tolong kirim email', tr: 'Lütfen bir e-posta gönderin',
    zh: '请发送电子邮件', ja: 'メールを送ってください', ko: '이메일을 보내 주세요', hi: 'कृपया एक ईमेल भेजें', ar: 'يرجى إرسال بريد إلكتروني', bn: 'ইমেইল পাঠিয়ে দিন', ur: 'براہِ کرم ای میل بھیجیں'
  },
  'please send me an email': {
    en: 'Please send me an email', es: 'Por favor, envíeme un correo electrónico', fr: 'Veuillez m\'envoyer un courriel', de: 'Bitte senden Sie mir eine E-Mail', pt: 'Por favor, me envie um e-mail', ru: 'Пожалуйста, отправьте мне письмо', id: 'Tolong kirim saya email', tr: 'Lütfen bana bir e-posta gönderin',
    zh: '请给我发电子邮件', ja: '私にメールを送ってください', ko: '저에게 이메일을 보내 주세요', hi: 'कृपया मुझे ईमेल भेजें', ar: 'يرجى إرسال بريد إلكتروني لي', bn: 'দয়া করে আমাকে ইমেইল পাঠান', ur: 'مجھے ای میل بھیجیں'
  },
  'please speak slowly': {
    en: 'Please speak slowly', es: 'Por favor, hable despacio', fr: 'Parlez lentement, s\'il vous plaît', de: 'Bitte sprechen Sie langsam', pt: 'Por favor, fale devagar', ru: 'Говорите медленно, пожалуйста', id: 'Tolong bicara pelan-pelan', tr: 'Lütfen yavaş konuşun',
    zh: '请说慢一点', ja: 'ゆっくり話してください', ko: '천천히 말해 주세요', hi: 'कृपया धीरे बोलिए', ar: 'تحدث ببطء من فضلك', bn: 'দয়া করে ধীরে বলুন', ur: 'براہِ کرم آہستہ بولیں'
  },
  'please help me': {
    en: 'Please help me', es: 'Por favor, ayúdeme', fr: 'Aidez-moi, s\'il vous plaît', de: 'Bitte helfen Sie mir', pt: 'Por favor, ajude-me', ru: 'Пожалуйста, помогите мне', id: 'Tolong bantu saya', tr: 'Lütfen bana yardım edin',
    zh: '请帮帮我', ja: '助けてください', ko: '도와주세요', hi: 'कृपया मेरी मदद करें', ar: 'ساعدني من فضلك', bn: 'দয়া করে আমাকে সাহায্য করুন', ur: 'براہِ کرم میری مدد کریں'
  },
  'sounds good / i like it': {
    en: 'Sounds good / I like it', es: 'Suena bien / Me gusta', fr: 'Ça me plaît / C\'est bien', de: 'Klingt gut / Gefällt mir', pt: 'Parece ótimo / Eu gosto', ru: 'Отлично / Мне нравится', id: 'Bagus / Saya suka', tr: 'Kulağa hoş geliyor / Beğendim',
    zh: '听起来不错 / 我喜欢', ja: 'いいですね / 好きです', ko: '좋아요', hi: 'अच्छा लगता है / मुझे पसंद है', ar: 'يبدو جيداً / يعجبني', bn: 'ভালো লাগছে / আমার পছন্দ হয়েছে', ur: 'اچھا ہے / مجھے پسند ہے'
  },
  'thank you for the meal': {
    en: 'Thank you for the meal', es: 'Gracias por la comida', fr: 'Merci pour le repas', de: 'Danke für das Essen', pt: 'Obrigado pela refeição', ru: 'Спасибо за еду', id: 'Terima kasih atas makanannya', tr: 'Yemek için teşekkürler',
    zh: '谢谢款待', ja: 'ごちそうさまでした', ko: '잘 먹겠습니다', hi: 'भोजन के लिए धन्यवाद', ar: 'شكراً على الوجبة', bn: 'খাবারের জন্য ধন্যবাদ', ur: 'کھانے کے لیے شکریہ'
  },
  'thank you for the meal (before eating)': {
    en: 'Thank you for the meal (before eating)', es: 'Gracias por la comida (antes de comer)', fr: 'Merci pour ce repas (avant de manger)', de: 'Danke für das Essen (vor dem Essen)', pt: 'Obrigado pela refeição (antes de comer)', ru: 'Спасибо за еду (перед едой)', id: 'Terima kasih atas makanannya (sebelum makan)', tr: 'Yemek için teşekkürler (yemekten önce)',
    zh: '我开动了（饭前致谢）', ja: 'いただきます', ko: '잘 먹겠습니다', hi: 'भोजन के लिए धन्यवाद (खाने से पहले)', ar: 'شكراً على الطعام (قبل الأكل)', bn: 'খাবারের জন্য ধন্যবাদ (খাওয়ার আগে)', ur: 'کھانے کے لیے شکریہ (کھانے سے پہلے)'
  },
  'thank you for the meal (after eating)': {
    en: 'Thank you for the meal (after eating)', es: 'Gracias por la comida (después de comer)', fr: 'Merci pour le repas (après avoir mangé)', de: 'Danke für das Essen (nach dem Essen)', pt: 'Obrigado pela refeição (depois de comer)', ru: 'Спасибо за еду (после еды)', id: 'Terima kasih atas makanannya (setelah makan)', tr: 'Elinize sağlık (yemekten sonra)',
    zh: '多谢款待（饭后致谢）', ja: 'ごちそうさまでした', ko: '잘 먹었습니다', hi: 'भोजन के लिए धन्यवाद (खाने के बाद)', ar: 'شكراً على الطعام (بعد الأكل)', bn: 'খাবারের জন্য ধন্যবাদ (খাওয়ার পরে)', ur: 'کھانے کے لیے شکریہ (کھانے کے بعد)'
  },
  'thank you (polite)': {
    en: 'Thank you (polite)', es: 'Muchas gracias (formal)', fr: 'Merci beaucoup (poli)', de: 'Vielen Dank (höflich)', pt: 'Obrigado (formal)', ru: 'Спасибо (вежливо)', id: 'Terima kasih (sopan)', tr: 'Teşekkür ederim (kibar)',
    zh: '谢谢您（礼貌）', ja: 'ありがとうございます', ko: '고맙습니다', hi: 'धन्यवाद (विनम्र)', ar: 'شكراً لك (بأدب)', bn: 'ধন্যবাদ (ভদ্রভাবে)', ur: 'شکریہ (ادب سے)'
  },
  'goodbye (to someone leaving)': {
    en: 'Goodbye (to someone leaving)', es: 'Adiós (a quien se va)', fr: 'Au revoir (à celui qui part)', de: 'Auf Wiedersehen (an den Gehenden)', pt: 'Adeus (a quem parte)', ru: 'До свидания (уходящему)', id: 'Selamat jalan', tr: 'Güle güle',
    zh: '再见（对离开的人说）', ja: 'さようなら（去る人へ）', ko: '안녕히 가세요', hi: 'अलविदा (जाने वाले से)', ar: 'مع السلامة (للمغادر)', bn: 'বিদায় (যিনি যাচ্ছেন)', ur: 'خدا حافظ (جانے والے سے)'
  },
  'goodbye (to someone staying)': {
    en: 'Goodbye (to someone staying)', es: 'Adiós (a quien se queda)', fr: 'Au revoir (à celui qui reste)', de: 'Auf Wiedersehen (an den Bleibenden)', pt: 'Adeus (a quem fica)', ru: 'До свидания (остающемуся)', id: 'Selamat tinggal', tr: 'Hoşça kalın',
    zh: '再见（对留下的人说）', ja: 'さようなら（残る人へ）', ko: '안녕히 계세요', hi: 'अलविदा (रुकने वाले से)', ar: 'وداعاً (للباقي)', bn: 'বিদায় (যিনি থাকছেন)', ur: 'خدا حافظ (رکنے والے سے)'
  },
  'see you again / goodbye': {
    en: 'See you again / Goodbye', es: 'Hasta pronto / Adiós', fr: 'À bientôt / Au revoir', de: 'Bis bald / Auf Wiedersehen', pt: 'Até breve / Adeus', ru: 'До встречи / До свидания', id: 'Sampai jumpa lagi', tr: 'Tekrar görüşürüz / Hoşça kalın',
    zh: '再会 / 再见', ja: 'また会いましょう / さようなら', ko: '또 봐요 / 안녕히 계세요', hi: 'फिर मिलेंगे / अलविदा', ar: 'إلى اللقاء / مع السلامة', bn: 'আবার দেখা হবে', ur: 'پھر ملیں گے / خدا حافظ'
  },
  'hello / peace be upon you': {
    en: 'Hello / Peace be upon you', es: '¡Hola! / La paz sea contigo', fr: 'Bonjour / Que la paix soit sur vous', de: 'Hallo / Friede sei mit dir', pt: 'Olá / A paz esteja com você', ru: 'Здравствуйте / Мир вам', id: 'Halo / Assalamualaikum', tr: 'Merhaba / Selamün aleyküm',
    zh: '你好 / 愿平安与你同在', ja: 'こんにちは / あなたに平安あれ', ko: '안녕하세요 / 평화가 함께하기를', hi: 'नमस्ते / अस्सलामु अलैकुम', ar: 'السلام عليكم', bn: 'আসসালামু আলাইকুম / নমস্কার', ur: 'السلام علیکم'
  },

  // Grammar flashcard & clarified vocabulary translations (all 15 languages)
  'university': {
    en: 'University', es: 'Universidad', fr: 'Université', de: 'Universität', pt: 'Universidade', ru: 'Университет', id: 'Universitas', tr: 'Üniversite',
    zh: '大学', ja: '大学', ko: '대학교', hi: 'विश्वविद्यालय', ar: 'جامعة', bn: 'বিশ্ববিদ্যালয়', ur: 'یونیورسٹی'
  },
  'document': {
    en: 'Document', es: 'Documento', fr: 'Document', de: 'Dokument', pt: 'Documento', ru: 'Документ', id: 'Dokumen', tr: 'Belge',
    zh: '文件', ja: '書類', ko: '문서', hi: 'दस्तावेज़', ar: 'وثيقة', bn: 'নথি', ur: 'دستاویز'
  },
  'cold water': {
    en: 'Cold water', es: 'Agua fría', fr: 'Eau froide', de: 'Kaltes Wasser', pt: 'Água fria', ru: 'Холодная вода', id: 'Air dingin', tr: 'Soğuk su',
    zh: '冷水', ja: '冷たい水', ko: '차가운 물', hi: 'ठंडा पानी', ar: 'ماء بارد', bn: 'ঠান্ডা জল', ur: 'ٹھنڈا پانی'
  },
  'tired': {
    en: 'Tired', es: 'Cansado', fr: 'Fatigué', de: 'Müde', pt: 'Cansado', ru: 'Уставший', id: 'Lelah', tr: 'Yorgun',
    zh: '累', ja: '疲れた', ko: '피곤한', hi: 'थका हुआ', ar: 'متعب', bn: 'ক্লান্ত', ur: 'تھکا ہوا'
  },
  'books': {
    en: 'Books', es: 'Libros', fr: 'Livres', de: 'Bücher', pt: 'Livros', ru: 'Книги', id: 'Buku-buku', tr: 'Kitaplar',
    zh: '书（复数）', ja: '本（複数）', ko: '책들', hi: 'किताबें', ar: 'كتب', bn: 'বইগুলো', ur: 'کتابیں'
  },
  'better': {
    en: 'Better', es: 'Mejor', fr: 'Meilleur', de: 'Besser', pt: 'Melhor', ru: 'Лучше', id: 'Lebih baik', tr: 'Daha iyi',
    zh: '更好', ja: 'より良い', ko: '더 좋은', hi: 'बेहतर', ar: 'أفضل', bn: 'আরও ভালো', ur: 'بہتر'
  },
  'hungry': {
    en: 'Hungry', es: 'Hambriento', fr: 'Affamé', de: 'Hungrig', pt: 'Com fome', ru: 'Голодный', id: 'Lapar', tr: 'Aç',
    zh: '饿', ja: 'お腹が空いた', ko: '배고픈', hi: 'भूखा', ar: 'جائع', bn: 'ক্ষুধার্ত', ur: 'بھوکا'
  },
  'brazil': {
    en: 'Brazil', es: 'Brasil', fr: 'Brésil', de: 'Brasilien', pt: 'Brasil', ru: 'Бразилия', id: 'Brasil', tr: 'Brezilya',
    zh: '巴西', ja: 'ブラジル', ko: '브라질', hi: 'ब्राज़ील', ar: 'البرازيل', bn: 'ব্রাজিল', ur: 'برازیل'
  },
  'car key': {
    en: 'Car key', es: 'Llave del coche', fr: 'Clé de voiture', de: 'Autoschlüssel', pt: 'Chave do carro', ru: 'Ключ от машины', id: 'Kunci mobil', tr: 'Araba anahtarı',
    zh: '车钥匙', ja: '車の鍵', ko: '차 열쇠', hi: 'कार की चाबी', ar: 'مفتاح السيارة', bn: 'গাড়ির চাবি', ur: 'گاڑی کی چابی'
  },
  'children': {
    en: 'Children', es: 'Niños', fr: 'Enfants', de: 'Kinder', pt: 'Crianças', ru: 'Дети', id: 'Anak-anak', tr: 'Çocuklar',
    zh: '孩子们', ja: '子どもたち', ko: '아이들', hi: 'बच्चे', ar: 'أطفال', bn: 'শিশুরা', ur: 'بچے'
  },
  "don't forget": {
    en: "Don't forget", es: 'No olvides', fr: 'N\'oubliez pas', de: 'Vergiss nicht', pt: 'Não esqueça', ru: 'Не забудь', id: 'Jangan lupa', tr: 'Unutma',
    zh: '别忘了', ja: '忘れないで', ko: '잊지 마세요', hi: 'भूलना मत', ar: 'لا تنسَ', bn: 'ভুলে যেও না', ur: 'مت بھولنا'
  },
  'library': {
    en: 'Library', es: 'Biblioteca', fr: 'Bibliothèque', de: 'Bibliothek', pt: 'Biblioteca', ru: 'Библиотека', id: 'Perpustakaan', tr: 'Kütüphane',
    zh: '图书馆', ja: '図書館', ko: '도서관', hi: 'पुस्तकालय', ar: 'مكتبة', bn: 'গ্রন্থাগার', ur: 'کتب خانہ'
  },
  'czar': {
    en: 'Czar', es: 'Zar', fr: 'Tsar', de: 'Zar', pt: 'Czar', ru: 'Царь', id: 'Tsar', tr: 'Çar',
    zh: '沙皇', ja: 'ツァーリ', ko: '차르', hi: 'ज़ार', ar: 'قيصر', bn: 'জার', ur: 'زار'
  },
  'color': {
    en: 'Color', es: 'Color', fr: 'Couleur', de: 'Farbe', pt: 'Cor', ru: 'Цвет', id: 'Warna', tr: 'Renk',
    zh: '颜色', ja: '色', ko: '색 / 색깔', hi: 'रंग', ar: 'لون', bn: 'রঙ', ur: 'رنگ'
  },
  'mouse (animal)': {
    en: 'Mouse (animal)', es: 'Ratón (animal)', fr: 'Souris (animal)', de: 'Maus (Tier)', pt: 'Rato', ru: 'Мышь (животное)', id: 'Tikus', tr: 'Fare (hayvan)',
    zh: '老鼠', ja: 'ネズミ', ko: '쥐', hi: 'चूहा', ar: 'فأر', bn: 'ইঁদুর', ur: 'چوہا'
  },
  'cloud (computing)': {
    en: 'Cloud (computing)', es: 'Nube (informática)', fr: 'Cloud (informatique)', de: 'Cloud (IT)', pt: 'Nuvem (computação)', ru: 'Облако (ИТ)', id: 'Komputasi awan', tr: 'Bulut (bilişim)',
    zh: '云端', ja: 'クラウド', ko: '클라우드', hi: 'क्लाउड', ar: 'سحابة إلكترونية', bn: 'ক্লাউড', ur: 'کلاؤڈ'
  },
  'porcupine': {
    en: 'Porcupine', es: 'Puercoespín', fr: 'Porc-épic', de: 'Stachelschwein', pt: 'Porco-espinho', ru: 'Дикобраз', id: 'Landak', tr: 'Oklu kirpi',
    zh: '豪猪', ja: 'ヤマアラシ', ko: '호저', hi: 'साही', ar: 'نيص', bn: 'সজারু', ur: 'ساہی'
  },
  'hotel room': {
    en: 'Hotel room', es: 'Habitación de hotel', fr: 'Chambre d\'hôtel', de: 'Hotelzimmer', pt: 'Quarto de hotel', ru: 'Номер', id: 'Kamar hotel', tr: 'Otel odası',
    zh: '酒店房间', ja: 'ホテルの部屋', ko: '호텔 방', hi: 'होटल का कमरा', ar: 'غرفة فندق', bn: 'হোটেলের ঘর', ur: 'ہوٹل کا کمرہ'
  },
  'video camera': {
    en: 'Video camera', es: 'Cámara de video', fr: 'Caméra', de: 'Videokamera', pt: 'Câmera de vídeo', ru: 'Видеокамера', id: 'Kamera video', tr: 'Video kamera',
    zh: '摄像机', ja: 'ビデオカメラ', ko: '비디오 카메라', hi: 'वीडियो कैमरा', ar: 'كاميرا فيديو', bn: 'ভিডিও ক্যামেরা', ur: 'ویڈیو کیمرہ'
  },
  'wristwatch': {
    en: 'Wristwatch', es: 'Reloj de pulsera', fr: 'Montre-bracelet', de: 'Armbanduhr', pt: 'Relógio de pulso', ru: 'Наручные часы', id: 'Jam tangan', tr: 'Kol saati',
    zh: '手表', ja: '腕時計', ko: '손목시계', hi: 'कलाई घड़ी', ar: 'ساعة يد', bn: 'হাতঘড়ি', ur: 'کلائی کی گھڑی'
  },
  'sweets / dessert': {
    en: 'Sweets / Dessert', es: 'Dulces / Postre', fr: 'Douceurs / Dessert', de: 'Süßigkeiten / Nachspeise', pt: 'Doces / Sobremesa', ru: 'Сладости / Десерт', id: 'Manisan / Hidangan penutup', tr: 'Tatlılar',
    zh: '甜点', ja: 'お菓子 / デザート', ko: '과자 / 디저트', hi: 'मिठाई', ar: 'حلويات', bn: 'মিষ্টি', ur: 'مٹھائی'
  },
  'reserve / stock': {
    en: 'Reserve / Stock', es: 'Reserva / Existencias', fr: 'Réserve / Stock', de: 'Vorrat / Reserve', pt: 'Reserva / Estoque', ru: 'Запас / Резерв', id: 'Cadangan / Persediaan', tr: 'Stok / Rezerv',
    zh: '储备', ja: '備蓄 / 在庫', ko: '비축 / 재고', hi: 'भंडार / संचय', ar: 'مخزون / احتياطي', bn: 'মজুদ / সঞ্চয়', ur: 'ذخیرہ'
  },
  'calendar': {
    en: 'Calendar', es: 'Calendario', fr: 'Calendrier', de: 'Kalender', pt: 'Calendário', ru: 'Календарь', id: 'Kalender', tr: 'Takvim',
    zh: '日历', ja: 'カレンダー', ko: '달력', hi: 'कैलेंडर', ar: 'تقويم', bn: 'ক্যালেন্ডার', ur: 'کیلنڈر'
  },
  'ambulance / emergency': {
    en: 'Ambulance / Emergency', es: 'Ambulancia / Emergencia', fr: 'Ambulance / Urgence', de: 'Krankenwagen / Notfall', pt: 'Ambulância / Emergência', ru: 'Скорая помощь', id: 'Ambulans / Darurat', tr: 'Ambulans / Acil durum',
    zh: '救护车 / 急救', ja: '救急車 / 緊急', ko: '구급차 / 응급', hi: 'एम्बुलेंस / आपातकाल', ar: 'سيارة إسعاف / طوارئ', bn: 'অ্যাম্বুলেন্স / জরুরি', ur: 'ایمبولینس / ایمرجنسی'
  },
  'how much is this?': {
    en: 'How much is this?', es: '¿Cuánto cuesta esto?', fr: 'Combien coûte ceci ?', de: 'Wie viel kostet das?', pt: 'Quanto custa isto?', ru: 'Сколько это стоит?', id: 'Berapa harganya?', tr: 'Bu ne kadar?',
    zh: '这个多少钱？', ja: 'これはいくらですか？', ko: '이거 얼마예요?', hi: 'यह कितने का है?', ar: 'بكم هذا؟', bn: 'এর দাম কত?', ur: 'اس کی قیمت کیا ہے؟'
  },
};
