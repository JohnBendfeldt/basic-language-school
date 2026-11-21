import { GrammarFlashcard, GrammarRuleExplanationMeta } from '../types';
import { SupportedLanguageId } from '../data/languages/types';
import { SUPPLEMENTAL_DICTIONARY } from '../data/dictionaryExtensions';
import { CONCEPT_MATRIX } from '../data/conceptMatrix';

const lookupConceptTranslation = (englishGloss: string, baseLang: SupportedLanguageId): string => {
  const key = englishGloss.toLowerCase().trim();
  if (!key) return '';
  const supp = SUPPLEMENTAL_DICTIONARY[key]?.[baseLang];
  if (supp) return supp;
  for (const item of CONCEPT_MATRIX) {
    const enText = item.translations.en?.text?.toLowerCase().trim();
    if (enText === key && item.translations[baseLang]?.text) {
      return item.translations[baseLang]!.text;
    }
  }
  return '';
};

const GENDER_TERMS: Record<
  'masculine' | 'feminine' | 'neuter' | 'plural',
  Record<SupportedLanguageId, string>
> = {
  masculine: {
    en: 'masculine',
    es: 'masculino',
    fr: 'masculin',
    de: 'maskulin (männlich)',
    pt: 'masculino',
    ru: 'мужского рода',
    id: 'maskulin',
    tr: 'eril (maskülen)',
    zh: '阳性',
    ja: '男性名詞',
    ko: '남성',
    hi: 'पुल्लिंग',
    ar: 'مذكر',
    bn: 'পুংলিঙ্গ',
    ur: 'مذکر',
  },
  feminine: {
    en: 'feminine',
    es: 'femenino',
    fr: 'féminin',
    de: 'feminin (weiblich)',
    pt: 'feminino',
    ru: 'женского рода',
    id: 'feminin',
    tr: 'dişil (feminen)',
    zh: '阴性',
    ja: '女性名詞',
    ko: '여성',
    hi: 'स्त्रीलिंग',
    ar: 'مؤنث',
    bn: 'স্ত্রীলিঙ্গ',
    ur: 'مؤنث',
  },
  neuter: {
    en: 'neuter',
    es: 'neutro',
    fr: 'neutre',
    de: 'neutral (sächlich)',
    pt: 'neutro',
    ru: 'среднего рода',
    id: 'netral',
    tr: 'nötr (cinssiz)',
    zh: '中性',
    ja: '中性名詞',
    ko: '중성',
    hi: 'नपुंसकलिंग',
    ar: 'محايد',
    bn: 'ক্লীবলিঙ্গ',
    ur: 'نیوٹر (غیر مذکر و مؤنث)',
  },
  plural: {
    en: 'plural',
    es: 'plural',
    fr: 'pluriel',
    de: 'Plural (Mehrzahl)',
    pt: 'plural',
    ru: 'множественного числа',
    id: 'jamak',
    tr: 'çoğul',
    zh: '复数',
    ja: '複数形',
    ko: '복수',
    hi: 'बहुवचन',
    ar: 'جمع',
    bn: 'বহুবচন',
    ur: 'جمع',
  },
};

const PLURAL_TASK_LABELS: Record<SupportedLanguageId, string> = {
  en: 'plural',
  es: 'plural',
  fr: 'pluriel',
  de: 'Plural',
  pt: 'plural',
  ru: 'множественное число',
  id: 'bentuk jamak',
  tr: 'çoğul',
  zh: '复数',
  ja: '複数形',
  ko: '복수형',
  hi: 'बहुवचन',
  ar: 'الجمع',
  bn: 'বহুবচন',
  ur: 'جمع',
};

const CLUE_LABELS: Record<string, Record<SupportedLanguageId, string>> = {
  suffix_rule: {
    en: 'by its standard word ending',
    es: 'por su terminación típica',
    fr: 'par sa terminaison régulière',
    de: 'aufgrund seiner typischen Wortendung',
    pt: 'pela sua terminação regular',
    ru: 'по характерному окончанию слова',
    id: 'berdasarkan akhiran katanya',
    tr: 'tipik kelime son ekine göre',
    zh: '根据词尾规则',
    ja: '典型的な語尾の規則により',
    ko: '표준 어미 규칙에 따라',
    hi: 'इसके मानक शब्दांत नियम के अनुसार',
    ar: 'وفق قاعدة نهاية الكلمة القياسية',
    bn: 'শব্দের প্রচলিত সমাপ্তি নিয়ম অনুসারে',
    ur: 'لفظ کے معیاری اختتامی اصول کے مطابق',
  },
  exception_noun: {
    en: 'a high-frequency gender exception worth memorizing',
    es: 'una excepción frecuente que conviene memorizar',
    fr: 'une exception fréquente à mémoriser',
    de: 'eine wichtige Ausnahme, die man sich merken sollte',
    pt: 'uma exceção frequente que vale memorizar',
    ru: 'важное частотное исключение, которое нужно запомнить',
    id: 'pengecualian gender umum yang perlu dihafal',
    tr: 'ezberlenmesi gereken yaygın bir istisna',
    zh: '高频特殊性别例外，需重点记忆',
    ja: '頻出する重要な例外語',
    ko: '꼭 외워야 할 빈출 예외 명사',
    hi: 'एक महत्वपूर्ण अपवाद जिसे याद रखना ज़रूरी है',
    ar: 'استثناء شائع ومهم يجدر حفظه',
    bn: 'একটি গুরুত্বপূর্ণ ব্যতিক্রম যা মনে রাখা প্রয়োজন',
    ur: 'ایک اہم اور کثیر الاستعمال استثنا جسے یاد رکھنا ضروری ہے',
  },
  vowel_elision: {
    en: 'before a vowel or silent h',
    es: 'delante de vocal o h muda',
    fr: 'devant une voyelle ou un h muet',
    de: 'vor einem Vokal oder einem stummen h',
    pt: 'antes de vogal ou h mudo',
    ru: 'перед гласной или немой h',
    id: 'di depan huruf vokal atau h bisu',
    tr: 'ünlü harf veya sessiz h önünde',
    zh: '位于元音或不发音的 h 之前',
    ja: '母音または無音の h の前でエリジオン（母音省略）するため',
    ko: '모음이나 묵음 h 앞에서 축약되므로',
    hi: 'स्वर या मूक h से पहले संधि नियम के कारण',
    ar: 'قبل حرف علة أو هاء صامتة',
    bn: 'স্বরধ্বনি বা অনুচ্চারিত h-এর আগে',
    ur: 'حرفِ علت یا خاموش h سے پہلے',
  },
  stressed_a_feminine: {
    en: 'feminine noun starting with stressed "a/ha" takes singular "el" for smoother sound',
    es: 'sustantivo femenino que empieza por «a/ha» tónica lleva «el» en singular',
    fr: 'nom féminin commençant par un « a/ha » tonique prenant « el » au singulier',
    de: 'weibliches Nomen mit betontem „a/ha“ am Anfang verwendet im Singular „el“',
    pt: 'substantivo feminino iniciado por «a/ha» tônico usa «el» no singular',
    ru: 'существительное женского рода на ударное «a/ha» принимает в ед. ч. «el»',
    id: 'nomina feminin berawalan bunyi «a/ha» bertekanan memakai «el» pada bentuk tunggal',
    tr: 'vurgulu «a/ha» ile başlayan dişil isim tekilde «el» alır',
    zh: '以重读 a/ha 开头的阴性单数名词为便于发音改用 el，但词性仍为阴性',
    ja: '強勢のある a/ha で始まる女性単数名詞は発音上 el を取りますが、名詞は女性のままです',
    ko: '강세 있는 a/ha로 시작하는 여성 단수 명사는 발음상 el을 쓰지만 여성 명사입니다',
    hi: 'बलाघात वाले "a/ha" से शुरू होने वाली स्त्रीलिंग एकवचन संज्ञा के आगे उच्चारण हेतु "el" लगता है',
    ar: 'الاسم المؤنث المفرد المبدوء بصوت «a/ha» مشدّد يأخذ «el» لتسهيل النطق ويبقى مؤنثاً',
    bn: 'জোরালো «a/ha» দিয়ে শুরু স্ত্রীলিঙ্গ একবচন বিশেষ্যে উচ্চারণের সুবিধার্থে «el» বসে',
    ur: 'زوردار «a/ha» سے شروع ہونے والے واحد مؤنث اسم کے ساتھ تلفظ کی آسانی کے لیے «el» آتا ہے',
  },
  feminine_plural: {
    en: 'feminine plural agreement',
    es: 'concordancia en femenino plural',
    fr: 'accord au féminin pluriel',
    de: 'Kongruenz im Femininum Plural',
    pt: 'concordância no feminino plural',
    ru: 'согласование в женском роде множественного числа',
    id: 'kesesuaian feminin jamak',
    tr: 'dişil çoğul uyumu',
    zh: '阴性复数一致',
    ja: '女性複数形の一致',
    ko: '여성 복수 일치',
    hi: 'स्त्रीलिंग बहुवचन संगति',
    ar: 'مطابقة المؤنث الجمع',
    bn: 'স্ত্রীলিঙ্গ বহুবচন সামঞ্জস্য',
    ur: 'مؤنث جمع کی مطابقت',
  },
  silent_h_vowel: {
    en: 'starts with a vowel sound — silent h',
    es: 'empieza por sonido vocálico — h muda',
    fr: 'commence par un son voyelle — h muet',
    de: 'beginnt mit einem Vokallaut — stummes h',
    pt: 'começa com som de vogal — h mudo',
    ru: 'начинается с гласного звука — немая h',
    id: 'diawali bunyi vokal — h bisu',
    tr: 'ünlü sesiyle başlar — sessiz h',
    zh: '以元音音素开头，h 不发音',
    ja: '母音で始まる発音・無音の h のため',
    ko: '묵음 h로 인해 모음 소리로 시작하므로',
    hi: 'स्वर ध्वनि से शुरू होता है — मूक h',
    ar: 'تبدأ بصوت علة لأن الهاء صامتة',
    bn: 'স্বরধ্বনি দিয়ে উচ্চারণ শুরু হয় — অনুচ্চারিত h',
    ur: 'علت کی آواز سے شروع ہوتا ہے — خاموش h',
  },
  consonant_glide: {
    en: 'starts with a consonant glide sound /juː/',
    es: 'empieza por sonido consonántico /juː/',
    fr: 'commence par un son consonne /juː/',
    de: 'beginnt mit einem Konsonantenlaut /juː/',
    pt: 'começa com som consonantal /juː/',
    ru: 'начинается с согласного звука /juː/',
    id: 'diawali bunyi konsonan /juː/',
    tr: 'ünsüz /juː/ sesiyle başlar',
    zh: '虽然首字母是元音字母，但发音以辅音 /juː/ 开头',
    ja: '綴りは母音字でも発音が子音 /juː/ で始まるため',
    ko: '철자는 모음이지만 발음이 자음 /juː/로 시작하므로',
    hi: 'उच्चारण व्यंजन ध्वनि /juː/ से शुरू होता है',
    ar: 'يبدأ نطقها بصوت صامت /juː/ رغم كتابتها بحرف علة',
    bn: 'বানানে স্বরবর্ণ থাকলেও উচ্চারণ ব্যঞ্জনধ্বনি /juː/ দিয়ে শুরু হয়',
    ur: 'لکھنے میں حرفِ علت ہو مگر تلفظ حرفِ صحیح کی آواز /juː/ سے شروع ہوتا ہے',
  },
  permanent_trait: {
    en: 'permanent identity, origin, or inherent quality',
    es: 'identidad permanente, origen o cualidad esencial',
    fr: 'identité permanente, origine ou qualité essentielle',
    de: 'dauerhafte Identität, Herkunft oder Eigenschaft',
    pt: 'identidade permanente, origem ou qualidade essencial',
    ru: 'постоянный признак, профессия или происхождение',
    id: 'identitas tetap, asal, atau sifat permanen',
    tr: 'kalıcı kimlik, köken veya temel özellik',
    zh: '表示永久身份、职业、国籍或固有属性',
    ja: '恒常的な身分・職業・出身・性質を表すため',
    ko: '영구적인 신분·직업·출신·본질을 나타내므로',
    hi: 'स्थायी पहचान, पेशे या मूल गुण को दर्शाने के लिए',
    ar: 'للدلالة على الهوية الدائمة أو الأصل أو الصفة الثابتة',
    bn: 'স্থায়ী পরিচয়, পেশা বা সহজাত গুণ বোঝাতে',
    ur: 'مستقل شناخت، پیشے یا ذاتی صفت کے اظہار کے لیے',
  },
  temporary_state: {
    en: 'temporary state, mood, or current location',
    es: 'estado temporal, ánimo o ubicación actual',
    fr: 'état temporaire, humeur ou lieu actuel',
    de: 'vorübergehender Zustand, Stimmung oder Ort',
    pt: 'estado temporário, humor ou localização atual',
    ru: 'временное состояние, самочувствие или местонахождение',
    id: 'keadaan sementara, suasana hati, atau lokasi saat ini',
    tr: 'geçici durum, ruh hali veya mevcut konum',
    zh: '表示暂时状态、情绪或当前位置',
    ja: '一時的な状態・気分・現在の場所を表すため',
    ko: '일시적인 상태·기분·현재 위치를 나타내므로',
    hi: 'अस्थायी स्थिति, मनोदशा या वर्तमान स्थान दर्शाने के लिए',
    ar: 'للدلالة على الحالة المؤقتة أو الشعور أو الموقع الحالي',
    bn: 'অস্থায়ী অবস্থা, অনুভূতি বা বর্তমান অবস্থান বোঝাতে',
    ur: 'وقتی کیفیت، حالت یا موجودہ مقام کے اظہار کے لیے',
  },
  past_tense: {
    en: 'irregular past tense',
    es: 'pasado irregular',
    fr: 'passé irrégulier',
    de: 'unregelmäßige Vergangenheitsform',
    pt: 'passado irregular',
    ru: 'неправильная форма прошедшего времени',
    id: 'bentuk lampau tak beraturan',
    tr: 'düzensiz geçmiş zaman',
    zh: '不规则过去式',
    ja: '不規則な過去形',
    ko: '불규칙 과거형',
    hi: 'अनियमित भूतकाल रूप',
    ar: 'صيغة الماضي الشاذة',
    bn: 'অনিয়মিত অতীত রূপ',
    ur: 'بے قاعدہ ماضی کی صورت',
  },
  consonant_batchim: {
    en: 'after a syllable ending in a final consonant — batchim',
    es: 'tras una sílaba terminada en consonante final — batchim',
    fr: 'après une syllabe terminée par une consonne finale — batchim',
    de: 'nach einer Silbe mit Endkonsonant — Batchim',
    pt: 'após sílaba terminada em consoante final — batchim',
    ru: 'после слога с конечным согласным — патчхим',
    id: 'setelah suku kata berakhiran konsonan — batchim',
    tr: 'ünsüzle biten heceden sonra — batchim',
    zh: '前接有收音（辅音结尾）的音节',
    ja: 'パッチム（終声子音）で終わる音節の後に続くため',
    ko: '받침(자음)으로 끝나는 체언 뒤에 결합하므로',
    hi: 'व्यंजन पर समाप्त होने वाले अक्षर के बाद',
    ar: 'بعد مقطع ينتهي بحرف صامت — باتشيم',
    bn: 'ব্যঞ্জনধ্বনি দিয়ে শেষ হওয়া অক্ষরের পরে',
    ur: 'صحیح حرف پر ختم ہونے والے رکن کے بعد',
  },
  vowel_no_batchim: {
    en: 'after a syllable ending in a vowel — no batchim',
    es: 'tras una sílaba terminada en vocal — sin batchim',
    fr: 'après une syllabe terminée par une voyelle — sans batchim',
    de: 'nach einer auf Vokal endenden Silbe — ohne Batchim',
    pt: 'após sílaba terminada em vogal — sem batchim',
    ru: 'после открытого слога на гласную — без патчхима',
    id: 'setelah suku kata berakhiran vokal — tanpa batchim',
    tr: 'ünlüyle biten heceden sonra — batchim olmadan',
    zh: '前接无收音（元音结尾）的音节',
    ja: 'パッチムのない母音で終わる音節の後に続くため',
    ko: '받침 없는 모음으로 끝나는 체언 뒤에 결합하므로',
    hi: 'स्वर पर समाप्त होने वाले अक्षर के बाद',
    ar: 'بعد مقطع ينتهي بحرف علة — دون باتشيم',
    bn: 'স্বরধ্বনি দিয়ে শেষ হওয়া অক্ষরের পরে',
    ur: 'حرفِ علت پر ختم ہونے والے رکن کے بعد',
  },
  front_harmony: {
    en: 'front vowel harmony: e, i, ö, ü',
    es: 'armonía de vocales anteriores: e, i, ö, ü',
    fr: 'harmonie des voyelles antérieures : e, i, ö, ü',
    de: 'vordere Vokalharmonie: e, i, ö, ü',
    pt: 'harmonia das vogais anteriores: e, i, ö, ü',
    ru: 'гармония гласных переднего ряда: e, i, ö, ü',
    id: 'harmoni vokal depan: e, i, ö, ü',
    tr: 'ince ünlü uyumu: e, i, ö, ü',
    zh: '遵循前元音和谐律：e, i, ö, ü',
    ja: '前舌母音調和：e, i, ö, ü に従うため',
    ko: '전설 모음 조화 e, i, ö, ü에 따라',
    hi: 'अग्र स्वर सामंजस्य e, i, ö, ü के अनुसार',
    ar: 'وفق تناغم حروف العلة الأمامية: e, i, ö, ü',
    bn: 'অগ্র স্বরসঙ্গতি e, i, ö, ü নিয়ম অনুসারে',
    ur: 'پیش مصوتوں کی ہم آہنگی e, i, ö, ü کے مطابق',
  },
  back_harmony: {
    en: 'back vowel harmony: a, ı, o, u',
    es: 'armonía de vocales posteriores: a, ı, o, u',
    fr: 'harmonie des voyelles postérieures : a, ı, o, u',
    de: 'hintere Vokalharmonie: a, ı, o, u',
    pt: 'harmonia das vogais posteriores: a, ı, o, u',
    ru: 'гармония гласных заднего ряда: a, ı, o, u',
    id: 'harmoni vokal belakang: a, ı, o, u',
    tr: 'kalın ünlü uyumu: a, ı, o, u',
    zh: '遵循后元音和谐律：a, ı, o, u',
    ja: '後舌母音調和：a, ı, o, u に従うため',
    ko: '후설 모음 조화 a, ı, o, u에 따라',
    hi: 'पश्च स्वर सामंजस्य a, ı, o, u के अनुसार',
    ar: 'وفق تناغم حروف العلة الخلفية: a, ı, o, u',
    bn: 'পশ্চাৎ স্বরসঙ্গতি a, ı, o, u নিয়ম অনুসারে',
    ur: 'پس مصوتوں کی ہم آہنگی a, ı, o, u کے مطابق',
  },
  back_rounded_harmony: {
    en: 'back rounded 4-way vowel harmony after o/u ➔ u',
    es: 'armonía vocálica posterior redondeada tras o/u ➔ u',
    fr: 'harmonie vocalique postérieure arrondie après o/u ➔ u',
    de: 'hintere gerundete Vokalharmonie nach o/u ➔ u',
    pt: 'harmonia vocálica posterior arredondada após o/u ➔ u',
    ru: 'гармония задних огублённых гласных после o/u ➔ u',
    id: 'harmoni vokal belakang bulat setelah o/u ➔ u',
    tr: 'kalın yuvarlak ünlü uyumu: o/u sonrası ➔ u',
    zh: '后圆唇元音和谐律：o/u 后接 u',
    ja: '後舌円唇母音調和：o/u の後は u になるため',
    ko: '후설 원순 모음 조화: o/u 뒤에는 u',
    hi: 'पश्च गोल स्वर सामंजस्य: o/u के बाद u',
    ar: 'تناغم العلة الخلفية المدورة بعد o/u ⬅ u',
    bn: 'পশ্চাৎ গোলাকৃত স্বরসঙ্গতি: o/u-এর পরে u',
    ur: 'پس گول مصوتوں کی ہم آہنگی: o/u کے بعد u',
  },
  consonant_softening: {
    en: 'consonant softening before a vowel suffix: p ➔ b',
    es: 'suavización consonántica ante sufijo vocálico: p ➔ b',
    fr: 'adoucissement consonantique devant un suffixe vocalique : p ➔ b',
    de: 'Konsonantenerweichung vor Vokalsuffix: p ➔ b',
    pt: 'suavização consonantal antes de sufixo vocálico: p ➔ b',
    ru: 'озвончение согласного перед гласным суффиксом: p ➔ b',
    id: 'pelunakan konsonan sebelum akhiran vokal: p ➔ b',
    tr: 'ünlüyle başlayan ekten önce ünsüz yumuşaması: p ➔ b',
    zh: '元音后缀前辅音浊化软化：p ➔ b',
    ja: '母音語尾の前での子音軟化：p ➔ b',
    ko: '모음 어미 앞 자음 약화: p ➔ b',
    hi: 'स्वर प्रत्यय से पहले व्यंजन मृदुकरण: p ➔ b',
    ar: 'تليين الصامت قبل اللاحقة المصوتة: p ⬅ b',
    bn: 'স্বর প্রত্যয়ের আগে ব্যঞ্জন কোমলীকরণ: p ➔ b',
    ur: 'مصوتہ لاحقے سے پہلے صحیح حرف کی نرمی: p ⬅ b',
  },
  voiceless_assimilation: {
    en: 'consonant hardening after voiceless consonants: f, s, t, k, ç, ş, h, p',
    es: 'asimilación tras consonante sorda: f, s, t, k, ç, ş, h, p',
    fr: 'assimilation après consonne sourde : f, s, t, k, ç, ş, h, p',
    de: 'Konsonantenverhärtung nach stimmlosen Lauten: f, s, t, k, ç, ş, h, p',
    pt: 'assimilação após consoante surda: f, s, t, k, ç, ş, h, p',
    ru: 'оглушение аффикса после глухих согласных: f, s, t, k, ç, ş, h, p',
    id: 'asimilasi konsonan nirsuara: f, s, t, k, ç, ş, h, p',
    tr: 'ünsüz benzeşmesi: f, s, t, k, ç, ş, h, p sert ünsüzlerinden sonra',
    zh: '清辅音 f, s, t, k, ç, ş, h, p 后发生辅音清化同化',
    ja: '無声子音 f, s, t, k, ç, ş, h, p の後の子音同化規則により',
    ko: '무성 자음 f, s, t, k, ç, ş, h, p 뒤 자음 동화 규칙에 따라',
    hi: 'अघोष व्यंजन f, s, t, k, ç, ş, h, p के बाद व्यंजन संधि नियम से',
    ar: 'إبدال الصامت بعد الحروف المهموسة: f, s, t, k, ç, ş, h, p',
    bn: 'অঘোষ ব্যঞ্জন f, s, t, k, ç, ş, h, p-এর পরে ব্যঞ্জন সমীভবনের কারণে',
    ur: 'بے آواز صحیح حروف f, s, t, k, ç, ş, h, p کے بعد آواز کی مشابہت کی وجہ سے',
  },
  non_human_plural: {
    en: 'non-human plural nouns take feminine singular agreement in Arabic',
    es: 'los plurales no humanos concuerdan en femenino singular en árabe',
    fr: 'les pluriels non humains s\'accordent au féminin singulier en arabe',
    de: 'nicht-menschliche Pluralnomen verlangen im Arabischen Femininum Singular',
    pt: 'plurais não humanos concordam no feminino singular em árabe',
    ru: 'в арабском существительные во мн. ч., не обозначающие людей, согласуются в ж. р. ед. ч.',
    id: 'nomina jamak non-manusia menggunakan kesesuaian feminin tunggal dalam bahasa Arab',
    tr: 'Arapçada insan dışı çoğul isimler müennes tekil uyum alır',
    zh: '阿拉伯语中非人复数名词一律采用阴性单数一致',
    ja: 'アラビア語では人間以外の複数名詞は女性単数形で一致するため',
    ko: '아랍어에서 비인간 복수 명사는 여성 단수형으로 일치하므로',
    hi: 'अरबी में मानवेतर बहुवचन संज्ञाओं के साथ स्त्रीलिंग एकवचन रूप लगता है',
    ar: 'جمع غير العاقل يُعامل معاملة المفرد المؤنث في العربية',
    bn: 'আরবিতে মানবেতর বহুবচন বিশেষ্যের সাথে স্ত্রীলিঙ্গ একবচন রূপ বসে',
    ur: 'عربی میں غیر عاقل جمع کے ساتھ مفرد مؤنث کی مطابقت آتی ہے',
  },
};

const formatClueParen = (clueText: string, baseLang: SupportedLanguageId): string => {
  if (!clueText) return '';
  if (baseLang === 'zh' || baseLang === 'ja') return `（${clueText}）`;
  return ` (${clueText})`;
};

export const formatRuleExplanation = (
  meta: GrammarRuleExplanationMeta,
  baseLang: SupportedLanguageId
): string => {
  const full = meta.fullPhrase || `${meta.answer} ${meta.targetWord}`.trim();
  const gLabel = meta.gender ? GENDER_TERMS[meta.gender][baseLang] : '';
  const clueText = meta.clue && CLUE_LABELS[meta.clue] ? CLUE_LABELS[meta.clue][baseLang] : '';
  const suffix = formatClueParen(clueText, baseLang);

  switch (meta.kind) {
    case 'gender_article':
    case 'gender_exception': {
      const isPlural = meta.gender === 'plural';
      const map: Record<SupportedLanguageId, string> = {
        en: `"${meta.targetWord}" is ${gLabel}${suffix} -> "${full}".`,
        es: `«${meta.targetWord}» es ${gLabel}${suffix} -> «${full}».`,
        fr: isPlural
          ? `« ${meta.targetWord} » est au pluriel${suffix} -> « ${full} ».`
          : `« ${meta.targetWord} » est ${gLabel}${suffix} -> « ${full} ».`,
        de: isPlural
          ? `„${meta.targetWord}“ steht im Plural${suffix} -> „${full}“.`
          : `„${meta.targetWord}“ ist ${gLabel}${suffix} -> „${full}“.`,
        pt: `«${meta.targetWord}» é ${gLabel}${suffix} -> «${full}».`,
        ru: `«${meta.targetWord}» — слово ${gLabel}${suffix} -> «${full}».`,
        id: isPlural
          ? `"${meta.targetWord}" berbentuk ${gLabel}${suffix} -> "${full}".`
          : `"${meta.targetWord}" bergender ${gLabel}${suffix} -> "${full}".`,
        tr: `"${meta.targetWord}" ${gLabel} bir isimdir${suffix} -> "${full}".`,
        zh: `“${meta.targetWord}”属于${gLabel}名词${suffix} ➔ “${full}”。`,
        ja: `「${meta.targetWord}」は${gLabel}です${suffix} ➔ 「${full}」。`,
        ko: `'${meta.targetWord}'은(는) ${gLabel} 명사입니다${suffix} ➔ '${full}'.`,
        hi: `"${meta.targetWord}" ${gLabel} संज्ञा है${suffix} ➔ "${full}"।`,
        ar: `«${meta.targetWord}» اسم ${gLabel}${suffix} ⬅ «${full}».`,
        bn: `"${meta.targetWord}" হলো ${gLabel} বিশেষ্য${suffix} ➔ "${full}"।`,
        ur: `"${meta.targetWord}" ${gLabel} اسم ہے${suffix} ⬅ "${full}"۔`,
      };
      return map[baseLang];
    }

    case 'gender_agreement': {
      const gParen = gLabel ? ` (${gLabel})` : '';
      const map: Record<SupportedLanguageId, string> = {
        en: `Agrees with ${gLabel ? `${gLabel} ` : ''}"${meta.targetWord}"${suffix}: "${full}".`,
        es: `Concuerda con «${meta.targetWord}»${gParen}${suffix}: «${full}».`,
        fr: `S'accorde avec « ${meta.targetWord} »${gParen}${suffix} : « ${full} ».`,
        de: `Kongruiert mit „${meta.targetWord}“${gParen}${suffix}: „${full}“.`,
        pt: `Concorda com «${meta.targetWord}»${gParen}${suffix}: «${full}».`,
        ru: `Согласуется со словом «${meta.targetWord}»${gParen}${suffix}: «${full}».`,
        id: `Menyesuaikan dengan "${meta.targetWord}"${gParen}${suffix}: "${full}".`,
        tr: `"${meta.targetWord}"${gParen} ile uyum sağlar${suffix}: "${full}".`,
        zh: `与${gLabel}词“${meta.targetWord}”保持性数一致${suffix}：“${full}”。`,
        ja: `${gLabel ? `${gLabel}の` : ''}「${meta.targetWord}」に一致させます${suffix}：「${full}」。`,
        ko: `${gLabel ? `${gLabel} ` : ''}'${meta.targetWord}'에 성·수를 일치시킵니다${suffix}: '${full}'.`,
        hi: `${gLabel ? `${gLabel} ` : ''}शब्द "${meta.targetWord}" के अनुसार रूप बदलता है${suffix}: "${full}"।`,
        ar: `يتطابق مع «${meta.targetWord}»${gParen}${suffix}: «${full}».`,
        bn: `${gLabel ? `${gLabel} ` : ''}শব্দ "${meta.targetWord}"-এর সাথে সামঞ্জস্যপূর্ণ রূপ${suffix}: "${full}"।`,
        ur: `${gLabel ? `${gLabel} ` : ''}لفظ "${meta.targetWord}" کے ساتھ مطابقت رکھتا ہے${suffix}: "${full}"۔`,
      };
      return map[baseLang];
    }

    case 'ser_estar': {
      const map: Record<SupportedLanguageId, string> = {
        en: `Use "${meta.answer}" here${suffix}: "${full}".`,
        es: `Se usa «${meta.answer}» aquí${suffix}: «${full}».`,
        fr: `On utilise « ${meta.answer} » ici${suffix} : « ${full} ».`,
        de: `Hier steht „${meta.answer}“${suffix}: „${full}“.`,
        pt: `Usa-se «${meta.answer}» aqui${suffix}: «${full}».`,
        ru: `Здесь используется форма «${meta.answer}»${suffix}: «${full}».`,
        id: `Gunakan "${meta.answer}" di sini${suffix}: "${full}".`,
        tr: `Burada "${meta.answer}" kullanılır${suffix}: "${full}".`,
        zh: `此处使用“${meta.answer}”${suffix}：“${full}”。`,
        ja: `ここでは「${meta.answer}」を使います${suffix}：「${full}」。`,
        ko: `여기서는 '${meta.answer}'을(를) 씁니다${suffix}: '${full}'.`,
        hi: `यहाँ "${meta.answer}" का प्रयोग होता है${suffix}: "${full}"।`,
        ar: `نستخدم «${meta.answer}» هنا${suffix}: «${full}».`,
        bn: `এখানে "${meta.answer}" ব্যবহৃত হয়${suffix}: "${full}"।`,
        ur: `یہاں "${meta.answer}" استعمال ہوتا ہے${suffix}: "${full}"۔`,
      };
      return map[baseLang];
    }

    case 'sound_article': {
      const map: Record<SupportedLanguageId, string> = {
        en: `"${meta.targetWord}" takes "${meta.answer}"${suffix}: "${full}".`,
        es: `«${meta.targetWord}» lleva «${meta.answer}»${suffix}: «${full}».`,
        fr: `« ${meta.targetWord} » prend « ${meta.answer} »${suffix} : « ${full} ».`,
        de: `„${meta.targetWord}“ verlangt „${meta.answer}“${suffix}: „${full}“.`,
        pt: `«${meta.targetWord}» usa «${meta.answer}»${suffix}: «${full}».`,
        ru: `Со словом «${meta.targetWord}» ставится «${meta.answer}»${suffix}: «${full}».`,
        id: `"${meta.targetWord}" memakai "${meta.answer}"${suffix}: "${full}".`,
        tr: `"${meta.targetWord}" kelimesi "${meta.answer}" alır${suffix}: "${full}".`,
        zh: `“${meta.targetWord}”前应搭配“${meta.answer}”${suffix}：“${full}”。`,
        ja: `「${meta.targetWord}」には「${meta.answer}」が付きます${suffix}：「${full}」。`,
        ko: `'${meta.targetWord}' 앞에는 '${meta.answer}'을(를) 씁니다${suffix}: '${full}'.`,
        hi: `"${meta.targetWord}" के साथ "${meta.answer}" लगता है${suffix}: "${full}"।`,
        ar: `تأخذ كلمة «${meta.targetWord}» الأداة «${meta.answer}»${suffix}: «${full}».`,
        bn: `"${meta.targetWord}"-এর আগে "${meta.answer}" বসে${suffix}: "${full}"।`,
        ur: `"${meta.targetWord}" کے ساتھ "${meta.answer}" آتا ہے${suffix}: "${full}"۔`,
      };
      return map[baseLang];
    }

    case 'verb_conjugation': {
      const map: Record<SupportedLanguageId, string> = {
        en: `With "${meta.targetWord}", the correct verb form is "${meta.answer}"${suffix} -> "${full}".`,
        es: `Con «${meta.targetWord}», la forma verbal correcta es «${meta.answer}»${suffix} -> «${full}».`,
        fr: `Avec « ${meta.targetWord} », la forme verbale correcte est « ${meta.answer} »${suffix} -> « ${full} ».`,
        de: `Bei „${meta.targetWord}“ lautet die richtige Verbform „${meta.answer}“${suffix} -> „${full}“.`,
        pt: `Com «${meta.targetWord}», a forma verbal correta é «${meta.answer}»${suffix} -> «${full}».`,
        ru: `С «${meta.targetWord}» используется глагольная форма «${meta.answer}»${suffix} -> «${full}».`,
        id: `Untuk "${meta.targetWord}", bentuk kata kerja yang tepat adalah "${meta.answer}"${suffix} -> "${full}".`,
        tr: `"${meta.targetWord}" için doğru fiil çekimi "${meta.answer}" şeklindedir${suffix} -> "${full}".`,
        zh: `主语或词干“${meta.targetWord}”对应的正确动词形式为“${meta.answer}”${suffix} ➔ “${full}”。`,
        ja: `「${meta.targetWord}」に対する正しい動詞の形は「${meta.answer}」です${suffix} ➔ 「${full}」。`,
        ko: `'${meta.targetWord}'에 알맞은 동사 활용형은 '${meta.answer}'입니다${suffix} ➔ '${full}'.`,
        hi: `"${meta.targetWord}" के साथ सही क्रिया रूप "${meta.answer}" है${suffix} ➔ "${full}"।`,
        ar: `مع «${meta.targetWord}» تكون صيغة الفعل الصحيحة «${meta.answer}»${suffix} ⬅ «${full}».`,
        bn: `"${meta.targetWord}"-এর সাথে সঠিক ক্রিয়ার রূপ হলো "${meta.answer}"${suffix} ➔ "${full}"।`,
        ur: `"${meta.targetWord}" کے ساتھ درست فعلی صورت "${meta.answer}" ہے${suffix} ⬅ "${full}"۔`,
      };
      return map[baseLang];
    }

    case 'classifier': {
      const map: Record<SupportedLanguageId, string> = {
        en: `"${meta.answer}" is the correct classifier/counter for "${meta.targetWord}" -> "${full}".`,
        es: `«${meta.answer}» es el clasificador correcto para «${meta.targetWord}» -> «${full}».`,
        fr: `« ${meta.answer} » est le classificateur approprié pour « ${meta.targetWord} » -> « ${full} ».`,
        de: `„${meta.answer}“ ist das passende Zählwort für „${meta.targetWord}“ -> „${full}“.`,
        pt: `«${meta.answer}» é o classificador correto para «${meta.targetWord}» -> «${full}».`,
        ru: `«${meta.answer}» — правильный счётный суффикс/классификатор для «${meta.targetWord}» -> «${full}».`,
        id: `"${meta.answer}" adalah kata penggolong yang tepat untuk "${meta.targetWord}" -> "${full}".`,
        tr: `"${meta.targetWord}" için doğru sınıflandırıcı/sayaç "${meta.answer}" biçimidir -> "${full}".`,
        zh: `名词“${meta.targetWord}”应搭配专用量词/分类词“${meta.answer}” ➔ “${full}”。`,
        ja: `「${meta.targetWord}」には助数詞・類別詞「${meta.answer}」を使います ➔ 「${full}」。`,
        ko: `'${meta.targetWord}'에는 분류사/단위명사 '${meta.answer}'을(를) 씁니다 ➔ '${full}'.`,
        hi: `"${meta.targetWord}" के लिए सही गणक/प्रत्यय "${meta.answer}" है ➔ "${full}"।`,
        ar: `«${meta.answer}» هو المُصنِّف الصحيح مع «${meta.targetWord}» ⬅ «${full}».`,
        bn: `"${meta.targetWord}"-এর সাথে সঠিক নির্দেশক/গণক হলো "${meta.answer}" ➔ "${full}"।`,
        ur: `"${meta.targetWord}" کے لیے درست عددی علامت "${meta.answer}" ہے ⬅ "${full}"۔`,
      };
      return map[baseLang];
    }

    case 'vowel_harmony': {
      const hasFull = Boolean(meta.fullPhrase && meta.fullPhrase !== meta.answer);
      const map: Record<SupportedLanguageId, string> = {
        en: `"${meta.targetWord}" forms "${meta.answer}"${suffix}${hasFull ? ` -> "${full}"` : ''}.`,
        es: `«${meta.targetWord}» forma «${meta.answer}»${suffix}${hasFull ? ` -> «${full}»` : ''}.`,
        fr: `« ${meta.targetWord} » donne « ${meta.answer} »${suffix}${hasFull ? ` -> « ${full} »` : ''}.`,
        de: `„${meta.targetWord}“ bildet „${meta.answer}“${suffix}${hasFull ? ` -> „${full}“` : ''}.`,
        pt: `«${meta.targetWord}» forma «${meta.answer}»${suffix}${hasFull ? ` -> «${full}»` : ''}.`,
        ru: `От «${meta.targetWord}» образуется форма «${meta.answer}»${suffix}${hasFull ? ` -> «${full}»` : ''}.`,
        id: `"${meta.targetWord}" membentuk "${meta.answer}"${suffix}${hasFull ? ` -> "${full}"` : ''}.`,
        tr: `"${meta.targetWord}" kelimesi "${meta.answer}" biçimini alır${suffix}${hasFull ? ` -> "${full}"` : ''}.`,
        zh: `“${meta.targetWord}”变形为“${meta.answer}”${suffix}${hasFull ? ` ➔ “${full}”` : ''}。`,
        ja: `「${meta.targetWord}」は「${meta.answer}」になります${suffix}${hasFull ? ` ➔ 「${full}」` : ''}。`,
        ko: `'${meta.targetWord}'은(는) '${meta.answer}' 형태가 됩니다${suffix}${hasFull ? ` ➔ '${full}'` : ''}.`,
        hi: `"${meta.targetWord}" का सही रूप "${meta.answer}" बनता है${suffix}${hasFull ? ` ➔ "${full}"` : ''}।`,
        ar: `تتحول «${meta.targetWord}» إلى «${meta.answer}»${suffix}${hasFull ? ` ⬅ «${full}»` : ''}.`,
        bn: `"${meta.targetWord}" থেকে "${meta.answer}" গঠিত হয়${suffix}${hasFull ? ` ➔ "${full}"` : ''}।`,
        ur: `"${meta.targetWord}" کی درست صورت "${meta.answer}" بنتی ہے${suffix}${hasFull ? ` ⬅ "${full}"` : ''}۔`,
      };
      return map[baseLang];
    }

    case 'particle_marker':
    case 'negation':
    case 'preposition_case':
    case 'comparison':
    default: {
      const map: Record<SupportedLanguageId, string> = {
        en: `"${meta.answer}" completes this pattern${suffix}: "${full}".`,
        es: `«${meta.answer}» completa esta estructura${suffix}: «${full}».`,
        fr: `« ${meta.answer} » complète cette structure${suffix} : « ${full} ».`,
        de: `„${meta.answer}“ vervollständigt dieses Muster${suffix}: „${full}“.`,
        pt: `«${meta.answer}» completa esta estrutura${suffix}: «${full}».`,
        ru: `«${meta.answer}» правильно дополняет эту конструкцию${suffix}: «${full}».`,
        id: `"${meta.answer}" melengkapi pola tata bahasa ini${suffix}: "${full}".`,
        tr: `Bu dil bilgisi kalıbını "${meta.answer}" tamamlar${suffix}: "${full}".`,
        zh: `此处应填入“${meta.answer}”${suffix}：“${full}”。`,
        ja: `この文型には「${meta.answer}」が入ります${suffix}：「${full}」。`,
        ko: `이 문형에는 '${meta.answer}'이(가) 들어갑니다${suffix}: '${full}'.`,
        hi: `इस व्याकरण संरचना में "${meta.answer}" सही विकल्प है${suffix}: "${full}"।`,
        ar: `تكتمل هذه القاعدة باستخدام «${meta.answer}»${suffix}: «${full}».`,
        bn: `এই ব্যাকরণ গঠনে "${meta.answer}" বসবে${suffix}: "${full}"।`,
        ur: `اس گرامر کی ترکیب میں "${meta.answer}" درست ہے${suffix}: "${full}"۔`,
      };
      return map[baseLang];
    }
  }
};

const promptArrow = (lang: SupportedLanguageId): string =>
  lang === 'ar' || lang === 'ur' ? '⬅' : '➔';

const PROMPT_TASK_LOCALIZER: Array<{
  pattern: RegExp;
  render: (match: RegExpMatchArray, baseLang: SupportedLanguageId) => string;
}> = [
  {
    pattern: /^(.+?)\s*➔\s*(?:Which gender\?|Какой род\?)$/i,
    render: (m, lang) => {
      const q: Record<SupportedLanguageId, string> = {
        en: 'Which gender?',
        es: '¿Qué género?',
        fr: 'Quel genre ?',
        de: 'Welches Geschlecht?',
        pt: 'Qual gênero?',
        ru: 'Какой род?',
        id: 'Gender apa?',
        tr: 'Dilbilgisel cinsi nedir?',
        zh: '属于哪个语法性别？',
        ja: 'どの性？',
        ko: '어떤 성?',
        hi: 'कौन सा लिंग?',
        ar: 'ما الجنس النحوي؟',
        bn: 'কোন লিঙ্গ?',
        ur: 'کون سی جنس؟',
      };
      return `${m[1]} ${promptArrow(lang)} ${q[lang]}`;
    },
  },
  {
    pattern: /^(.+?)\s*➔\s*(?:present form|present tense|présent|presente|Präsens)$/i,
    render: (m, lang) => {
      const q: Record<SupportedLanguageId, string> = {
        en: 'present tense',
        es: 'presente',
        fr: 'présent',
        de: 'Präsens',
        pt: 'presente',
        ru: 'настоящее время',
        id: 'kala kini',
        tr: 'geniş/şimdiki zaman',
        zh: '现在时',
        ja: '現在形',
        ko: '현재형',
        hi: 'वर्तमान काल',
        ar: 'المضارع',
        bn: 'বর্তমান কাল',
        ur: 'فعل حال',
      };
      return `${m[1]} ${promptArrow(lang)} ${q[lang]}`;
    },
  },
  {
    pattern: /^(.+?)\s*➔\s*(?:past tense|прошедшее время)$/i,
    render: (m, lang) => {
      const q: Record<SupportedLanguageId, string> = {
        en: 'past tense',
        es: 'pasado',
        fr: 'passé',
        de: 'Vergangenheit',
        pt: 'passado',
        ru: 'прошедшее время',
        id: 'kala lampau',
        tr: 'geçmiş zaman',
        zh: '过去时',
        ja: '過去形',
        ko: '과거형',
        hi: 'भूतकाल',
        ar: 'الماضي',
        bn: 'অতীত কাল',
        ur: 'فعل ماضی',
      };
      return `${m[1]} ${promptArrow(lang)} ${q[lang]}`;
    },
  },
  {
    pattern: /^(.+?)\s*➔\s*(?:negative|否定)$/i,
    render: (m, lang) => {
      const q: Record<SupportedLanguageId, string> = {
        en: 'negative',
        es: 'negativo',
        fr: 'négatif',
        de: 'Verneinung',
        pt: 'negativo',
        ru: 'отрицание',
        id: 'negatif',
        tr: 'olumsuz',
        zh: '否定形',
        ja: '否定形',
        ko: '부정형',
        hi: 'नकारात्मक',
        ar: 'النفي',
        bn: 'নেতিবাচক',
        ur: 'منفی',
      };
      return `${m[1]} ${promptArrow(lang)} ${q[lang]}`;
    },
  },
  {
    pattern: /^Comparative degree of\s*"([^"]+)"$/i,
    render: (m, lang) => {
      const q: Record<SupportedLanguageId, string> = {
        en: `Comparative degree of "${m[1]}"`,
        es: `Grado comparativo de «${m[1]}»`,
        fr: `Comparatif de « ${m[1]} »`,
        de: `Komparativ von „${m[1]}“`,
        pt: `Grau comparativo de «${m[1]}»`,
        ru: `Сравнительная степень от «${m[1]}»`,
        id: `Bentuk perbandingan dari "${m[1]}"`,
        tr: `"${m[1]}" kelimesinin karşılaştırma hali`,
        zh: `“${m[1]}”的比较级`,
        ja: `「${m[1]}」の比較級`,
        ko: `'${m[1]}'의 비교급`,
        hi: `"${m[1]}" की तुलनात्मक अवस्था`,
        ar: `صيغة المقارنة من «${m[1]}»`,
        bn: `"${m[1]}"-এর তুলনামূলক রূপ`,
        ur: `"${m[1]}" کی تقابلی صورت`,
      };
      return q[lang];
    },
  },
  {
    pattern: /^Polite\s+past tense of\s*"([^"]+)"(?:\s*\([^)]*\))?$/i,
    render: (m, lang) => {
      const q: Record<SupportedLanguageId, string> = {
        en: `Polite past tense of "${m[1]}"`,
        es: `Pasado cortés de «${m[1]}»`,
        fr: `Passé poli de « ${m[1]} »`,
        de: `Höfliche Vergangenheit von „${m[1]}“`,
        pt: `Passado cortês de «${m[1]}»`,
        ru: `Вежливое прошедшее время от «${m[1]}»`,
        id: `Bentuk lampau sopan dari "${m[1]}"`,
        tr: `"${m[1]}" fiilinin nazik geçmiş zamanı`,
        zh: `“${m[1]}”的敬语过去式`,
        ja: `「${m[1]}」の丁寧な過去形`,
        ko: `'${m[1]}'의 정중한 과거형`,
        hi: `"${m[1]}" का शिष्ट भूतकाल रूप`,
        ar: `الماضي المهذب من «${m[1]}»`,
        bn: `"${m[1]}"-এর শিষ্ট অতীত রূপ`,
        ur: `"${m[1]}" کی مؤدبانہ ماضی صورت`,
      };
      return q[lang];
    },
  },
  {
    pattern: /^Past tense of\s*"([^"]+)"(?:\s*\([^)]*\))?$/i,
    render: (m, lang) => {
      const q: Record<SupportedLanguageId, string> = {
        en: `Past tense of "${m[1]}"`,
        es: `Pasado de «${m[1]}»`,
        fr: `Passé de « ${m[1]} »`,
        de: `Vergangenheit von „${m[1]}“`,
        pt: `Passado de «${m[1]}»`,
        ru: `Прошедшее время от «${m[1]}»`,
        id: `Bentuk lampau dari "${m[1]}"`,
        tr: `"${m[1]}" fiilinin geçmiş zamanı`,
        zh: `“${m[1]}”的过去式`,
        ja: `「${m[1]}」の過去形`,
        ko: `'${m[1]}'의 과거형`,
        hi: `"${m[1]}" का भूतकाल रूप`,
        ar: `الماضي من «${m[1]}»`,
        bn: `"${m[1]}"-এর অতীত রূপ`,
        ur: `"${m[1]}" کی ماضی کی صورت`,
      };
      return q[lang];
    },
  },
  {
    pattern: /^(?:Everyday\s+)?[Pp]olite\s+(?:\([^)]*\)\s+)?present tense of\s*"([^"]+)"(?:\s*\([^)]*\))?$/i,
    render: (m, lang) => {
      const q: Record<SupportedLanguageId, string> = {
        en: `Everyday polite (-아요/어요) present tense of "${m[1]}"`,
        es: `Presente cortés cotidiano (-아요/어요) de «${m[1]}»`,
        fr: `Présent poli courant (-아요/어요) de « ${m[1]} »`,
        de: `Alltägliches höfliches Präsens (-아요/어요) von „${m[1]}“`,
        pt: `Presente cortês cotidiano (-아요/어요) de «${m[1]}»`,
        ru: `Повседневное вежливое настоящее время (-아요/어요) от «${m[1]}»`,
        id: `Kala kini sopan sehari-hari (-아요/어요) dari "${m[1]}"`,
        tr: `"${m[1]}" fiilinin günlük nazik (-아요/어요) şimdiki zamanı`,
        zh: `“${m[1]}”的日常敬语（-아요/어요）现在时`,
        ja: `「${m[1]}」の日常丁寧（-아요/어요）現在形`,
        ko: `'${m[1]}'의 해요체(-아요/어요) 현재형`,
        hi: `"${m[1]}" का दैनिक शिष्ट (-아요/어요) वर्तमान काल`,
        ar: `المضارع المهذب اليومي (-아요/어요) من «${m[1]}»`,
        bn: `"${m[1]}"-এর দৈনন্দিন শিষ্ট (-아요/어요) বর্তমান রূপ`,
        ur: `"${m[1]}" کا روزمرہ مؤدبانہ (-아요/어요) فعل حال`,
      };
      return q[lang];
    },
  },
  {
    pattern: /^Plural of\s*"([^"]+)"(?:\s*(?:in\s+\w+|\[[^\]]*\]|\([^)]*\)))*$/i,
    render: (m, lang) => `${m[1]} ${promptArrow(lang)} ${PLURAL_TASK_LABELS[lang]}`,
  },
  {
    pattern: /^Topic marker in Japanese \(pronounced "wa"\):\s*(.+)$/i,
    render: (m, lang) => {
      const q: Record<SupportedLanguageId, string> = {
        en: `${m[1]} ➔ topic particle (wa)`,
        es: `${m[1]} ➔ partícula de tema (wa)`,
        fr: `${m[1]} ➔ particule de thème (wa)`,
        de: `${m[1]} ➔ Themenpartikel (wa)`,
        pt: `${m[1]} ➔ partícula de tópico (wa)`,
        ru: `${m[1]} ➔ тематическая частица (wa)`,
        id: `${m[1]} ➔ partikel topik (wa)`,
        tr: `${m[1]} ➔ konu edatı (wa)`,
        zh: `${m[1]} ➔ 主题助词 (wa)`,
        ja: `${m[1]} ➔ 主題の助詞 (wa)`,
        ko: `${m[1]} ➔ 주제 조사 (wa)`,
        hi: `${m[1]} ➔ विषय निपात (wa)`,
        ar: `${m[1]} ⬅ أداة الموضوع (wa)`,
        bn: `${m[1]} ➔ বিষয় নির্দেশক অব্যয় (wa)`,
        ur: `${m[1]} ⬅ موضوع کی علامت (wa)`,
      };
      return q[lang];
    },
  },
  {
    pattern: /^.+?➔\s*([^\x00-\x7F].*___.*|[A-Za-zÀ-ÿ]+\s*___\s*[A-Za-zÀ-ÿ]+)$/,
    render: (m) => m[1].trim(),
  },
  {
    pattern: /^([^\x00-\x7F]+___)\s*\([a-zA-Z\s]+\)$/,
    render: (m) => m[1].trim(),
  },
];

export const localizeFlashcardForBaseLanguage = (
  card: GrammarFlashcard,
  _targetLang: SupportedLanguageId,
  baseLang: SupportedLanguageId
): GrammarFlashcard => {
  // 1. Prompt
  let prompt = card.prompts?.[baseLang] || card.prompt;
  if (!card.prompts?.[baseLang]) {
    for (const rule of PROMPT_TASK_LOCALIZER) {
      const match = card.prompt.match(rule.pattern);
      if (match) {
        prompt = rule.render(match, baseLang);
        break;
      }
    }
  }

  // 2. Explanation
  let explanation = card.explanations?.[baseLang] || '';
  if (!explanation) {
    if (baseLang === 'en' && card.explanation) {
      explanation = card.explanation;
    } else if (card.ruleMeta) {
      explanation = formatRuleExplanation(card.ruleMeta, baseLang);
    } else if (baseLang !== 'en') {
      // Auto-construct localized rulemeta from card metadata for legacy cards without full 15-lang maps
      const inferredFull =
        card.audioWord ||
        (card.article ? `${card.article} ${card.prompt.replace(/^___\s*/, '').trim()}` : card.correctAnswer);
      const rawHero = card.prompt.split(/\s*[➔⬅]\s*/)[0].replace(/___/g, '').replace(/\s+/g, ' ').trim();
      const quotedInHero = rawHero.match(/"([^"_]+)"/);
      const inferredTarget =
        (quotedInHero ? quotedInHero[1].trim() : rawHero.replace(/\s*\([^)]*\)\s*/g, '').replace(/\s*\[[^\]]*\]\s*/g, '').trim()) ||
        card.correctAnswer;
      if (card.type === 'gender' && card.gender) {
        explanation = formatRuleExplanation(
          {
            kind: 'gender_article',
            targetWord: inferredTarget,
            answer: card.correctAnswer,
            fullPhrase: inferredFull,
            gender: card.gender,
          },
          baseLang
        );
      } else if (card.type === 'verb') {
        explanation = formatRuleExplanation(
          {
            kind: 'verb_conjugation',
            targetWord: inferredTarget,
            answer: card.correctAnswer,
            fullPhrase: inferredFull,
          },
          baseLang
        );
      } else {
        explanation = formatRuleExplanation(
          {
            kind: 'particle_marker',
            targetWord: inferredTarget,
            answer: card.correctAnswer,
            fullPhrase: inferredFull,
          },
          baseLang
        );
      }
    } else {
      explanation = card.explanation;
    }
  }

  // 3. Translation
  let translation = card.translations?.[baseLang] || '';
  if (!translation && card.translation) {
    if (baseLang === 'en') {
      translation = card.translation;
    } else {
      const bareMeaning = card.translation.replace(/^(the|a|an)\s+/i, '').trim();
      const resolved =
        lookupConceptTranslation(card.translation, baseLang) ||
        lookupConceptTranslation(bareMeaning, baseLang);
      translation = resolved || card.translation;
    }
  }

  return {
    ...card,
    prompt,
    explanation,
    translation: translation || card.translation,
  };
};
