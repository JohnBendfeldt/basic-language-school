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
    ko: '남성형',
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
    ko: '여성형',
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
    ko: '중성형',
    hi: 'नपुंसकलिंग',
    ar: 'محايد',
    bn: 'ক্লীবলিঙ্গ',
    ur: 'بے جان / نیوٹر',
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
    ko: '복수형',
    hi: 'बहुवचन',
    ar: 'جمع',
    bn: 'বহুবচন',
    ur: 'جمع',
  },
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
    zh: '高频特殊词性例外，需重点记忆',
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
    de: 'vor einem Vokal oder stummen h',
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
  silent_h_vowel: {
    en: 'starts with a vowel sound (silent h)',
    es: 'empieza por sonido vocálico (h muda)',
    fr: 'commence par un son voyelle (h muet)',
    de: 'beginnt mit einem Vokallaut (stummes h)',
    pt: 'começa com som de vogal (h mudo)',
    ru: 'начинается с гласного звука (немая h)',
    id: 'diawali bunyi vokal (h bisu)',
    tr: 'ünlü sesiyle başlar (sessiz h)',
    zh: '以元音音素开头（h 不发音）',
    ja: '母音で始まる発音（無音の h）のため',
    ko: '묵음 h로 인해 모음 소리로 시작하므로',
    hi: 'स्वर ध्वनि से शुरू होता है (मूक h)',
    ar: 'تبدأ بصوت علة (الهاء صامتة)',
    bn: 'স্বরধ্বনি দিয়ে উচ্চারণ শুরু হয় (অনুচ্চারিত h)',
    ur: 'علت کی آواز سے شروع ہوتا ہے (خاموش h)',
  },
  consonant_glide: {
    en: 'starts with a consonant glide sound (/juː/)',
    es: 'empieza por sonido consonántico (/juː/)',
    fr: 'commence par un son consonne (/juː/)',
    de: 'beginnt mit einem Konsonantenlaut (/juː/)',
    pt: 'começa com som consonantal (/juː/)',
    ru: 'начинается с согласного звука (/juː/)',
    id: 'diawali bunyi konsonan (/juː/)',
    tr: 'ünsüz (/juː/) sesiyle başlar',
    zh: '虽然首字母是元音字母，但发音以辅音 /juː/ 开头',
    ja: '綴りは母音字でも発音が子音（/juː/）で始まるため',
    ko: '철자는 모음이지만 발음이 자음(/juː/)으로 시작하므로',
    hi: 'उच्चारण व्यंजन ध्वनि (/juː/) से शुरू होता है',
    ar: 'يبدأ نطقها بصوت صامت (/juː/) رغم كتابتها بحرف علة',
    bn: 'বানানে স্বরবর্ণ থাকলেও উচ্চারণ ব্যঞ্জনধ্বনি (/juː/) দিয়ে শুরু হয়',
    ur: 'لکھنے میں حرفِ علت ہو مگر تلفظ صحیح آواز (/juː/) سے شروع ہوتا ہے',
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
  consonant_batchim: {
    en: 'after a syllable ending in a final consonant (batchim)',
    es: 'tras una sílaba terminada en consonante final (batchim)',
    fr: 'après une syllabe terminée par une consonne finale (batchim)',
    de: 'nach einer Silbe mit Endkonsonant (Batchim)',
    pt: 'após sílaba terminada em consoante final (batchim)',
    ru: 'после слога с конечным согласным (патчхим)',
    id: 'setelah suku kata berakhiran konsonan (batchim)',
    tr: 'ünsüzle (batchim) biten heceden sonra',
    zh: '前接有收音（辅音结尾）的音节',
    ja: 'パッチム（終声子音）で終わる音節の後に続くため',
    ko: '받침(자음)으로 끝나는 체언 뒤에 결합하므로',
    hi: 'व्यंजन (अंतिम ध्वनि) पर समाप्त होने वाले अक्षर के बाद',
    ar: 'بعد مقطع ينتهي بحرف صامت (باتشيم)',
    bn: 'ব্যঞ্জনধ্বনি (ব্যাচিম) দিয়ে শেষ হওয়া অক্ষরের পরে',
    ur: 'صحیح حرف (باچم) پر ختم ہونے والے رکن کے بعد',
  },
  vowel_no_batchim: {
    en: 'after a syllable ending in a vowel (no batchim)',
    es: 'tras una sílaba terminada en vocal (sin batchim)',
    fr: 'après une syllabe terminée par une voyelle (sans batchim)',
    de: 'nach einer auf Vokal endenden Silbe (ohne Batchim)',
    pt: 'após sílaba terminada em vogal (sem batchim)',
    ru: 'после открытого слога на гласную (без патчхима)',
    id: 'setelah suku kata berakhiran vokal (tanpa batchim)',
    tr: 'ünlüyle (batchim olmadan) biten heceden sonra',
    zh: '前接无收音（元音结尾）的音节',
    ja: 'パッチムのない（母音で終わる）音節の後に続くため',
    ko: '받침 없는 모음으로 끝나는 체언 뒤에 결합하므로',
    hi: 'स्वर पर समाप्त होने वाले अक्षर के बाद',
    ar: 'بعد مقطع ينتهي بحرف علة (دون باتشيم)',
    bn: 'স্বরধ্বনি দিয়ে শেষ হওয়া অক্ষরের পরে',
    ur: 'حرفِ علت پر ختم ہونے والے رکن کے بعد',
  },
  front_harmony: {
    en: 'front vowel harmony (e, i, ö, ü)',
    es: 'armonía de vocales anteriores (e, i, ö, ü)',
    fr: 'harmonie des voyelles antérieures (e, i, ö, ü)',
    de: 'vordere Vokalharmonie (e, i, ö, ü)',
    pt: 'harmonia das vogais anteriores (e, i, ö, ü)',
    ru: 'гармония гласных переднего ряда (e, i, ö, ü)',
    id: 'harmoni vokal depan (e, i, ö, ü)',
    tr: 'ince ünlü uyumu (e, i, ö, ü)',
    zh: '遵循前元音和谐律（e, i, ö, ü）',
    ja: '前舌母音調和（e, i, ö, ü）に従うため',
    ko: '전설 모음 조화(e, i, ö, ü)에 따라',
    hi: 'अग्र स्वर सामंजस्य (e, i, ö, ü) नियम के अनुसार',
    ar: 'وفق تناغم حروف العلة الأمامية (e, i, ö, ü)',
    bn: 'অগ্র স্বরসঙ্গতি (e, i, ö, ü) নিয়ম অনুসারে',
    ur: 'پیش مصوتوں کی ہم آہنگی (e, i, ö, ü) کے اصول کے مطابق',
  },
  back_harmony: {
    en: 'back vowel harmony (a, ı, o, u)',
    es: 'armonía de vocales posteriores (a, ı, o, u)',
    fr: 'harmonie des voyelles postérieures (a, ı, o, u)',
    de: 'hintere Vokalharmonie (a, ı, o, u)',
    pt: 'harmonia das vogais posteriores (a, ı, o, u)',
    ru: 'гармония гласных заднего ряда (a, ı, o, u)',
    id: 'harmoni vokal belakang (a, ı, o, u)',
    tr: 'kalın ünlü uyumu (a, ı, o, u)',
    zh: '遵循后元音和谐律（a, ı, o, u）',
    ja: '後舌母音調和（a, ı, o, u）に従うため',
    ko: '후설 모음 조화(a, ı, o, u)에 따라',
    hi: 'पश्च स्वर सामंजस्य (a, ı, o, u) नियम के अनुसार',
    ar: 'وفق تناغم حروف العلة الخلفية (a, ı, o, u)',
    bn: 'পশ্চাৎ স্বরসঙ্গতি (a, ı, o, u) নিয়ম অনুসারে',
    ur: 'پس مصوتوں کی ہم آہنگی (a, ı, o, u) کے اصول کے مطابق',
  },
  voiceless_assimilation: {
    en: 'consonant hardening after voiceless consonants (f, s, t, k, ç, ş, h, p)',
    es: 'asimilación tras consonante sorda (f, s, t, k, ç, ş, h, p)',
    fr: 'assimilation après consonne sourde (f, s, t, k, ç, ş, h, p)',
    de: 'Konsonantenverhärtung nach stimmlosen Lauten (f, s, t, k, ç, ş, h, p)',
    pt: 'assimilação após consoante surda (f, s, t, k, ç, ş, h, p)',
    ru: 'оглушение аффикса после глухих согласных (f, s, t, k, ç, ş, h, p)',
    id: 'asimilasi konsonan nirsuara (f, s, t, k, ç, ş, h, p)',
    tr: 'ünsüz benzeşmesi (f, s, t, k, ç, ş, h, p sert ünsüzlerinden sonra)',
    zh: '清辅音（f, s, t, k, ç, ş, h, p）后发生辅音清化同化',
    ja: '無声子音（f, s, t, k, ç, ş, h, p）の後の子音同化規則により',
    ko: '무성 자음(f, s, t, k, ç, ş, h, p) 뒤 자음 동화 규칙에 따라',
    hi: 'अघोष व्यंजन (f, s, t, k, ç, ş, h, p) के बाद व्यंजन संधि नियम से',
    ar: 'إبدال الصامت بعد الحروف المهموسة (f, s, t, k, ç, ş, h, p)',
    bn: 'অঘোষ ব্যঞ্জনের (f, s, t, k, ç, ş, h, p) পরে ব্যঞ্জন সমীভবনের কারণে',
    ur: 'بے آواز صحیح حروف (f, s, t, k, ç, ş, h, p) کے بعد آواز کی مشابہت کی وجہ سے',
  },
  non_human_plural: {
    en: 'non-human plural nouns take feminine singular agreement in Arabic',
    es: 'los plurales de cosas no humanas concuerdan en femenino singular',
    fr: 'les pluriels non humains s\'accordent au féminin singulier en arabe',
    de: 'nicht-menschliche Pluralnomen verlangen im Arabischen Femininum Singular',
    pt: 'plurais não humanos concordam no feminino singular em árabe',
    ru: 'множественное число неодушевлённых предметов согласуется в женском роде ед. ч.',
    id: 'jamak benda tak bernyawa menggunakan kesesuaian feminin tunggal dalam bahasa Arab',
    tr: 'Arapçada insan dışı çoğul isimler müennes tekil sıfat alır',
    zh: '阿拉伯语中非人复数名词的修饰语一律采用阴性单数形式',
    ja: 'アラビア語では人間以外の複数名詞は女性単数形で一致するため',
    ko: '아랍어에서 비인간 복수 명사는 여성 단수형으로 일치하므로',
    hi: 'अरबी में निर्जीव बहुवचन संज्ञाओं के साथ स्त्रीलिंग एकवचन विशेषण लगता है',
    ar: 'جمع غير العاقل يُعامل معاملة المفرد المؤنث في العربية',
    bn: 'আরবিতে অপ্রাণিবাচক বহুবচন বিশেষ্যের সাথে স্ত্রীলিঙ্গ একবচন বিশেষণ বসে',
    ur: 'عربی میں غیر عاقل جمع کے ساتھ مفرد مؤنث کی مطابقت آتی ہے',
  },
};

export const formatRuleExplanation = (
  meta: GrammarRuleExplanationMeta,
  baseLang: SupportedLanguageId
): string => {
  const full = meta.fullPhrase || `${meta.answer} ${meta.targetWord}`.trim();
  const gLabel = meta.gender ? GENDER_TERMS[meta.gender][baseLang] : '';
  const clueText = meta.clue && CLUE_LABELS[meta.clue] ? CLUE_LABELS[meta.clue][baseLang] : '';

  switch (meta.kind) {
    case 'gender_article':
    case 'gender_exception': {
      const suffix = clueText ? ` (${clueText})` : '';
      const map: Record<SupportedLanguageId, string> = {
        en: `"${meta.targetWord}" is ${gLabel}${suffix} -> "${full}".`,
        es: `«${meta.targetWord}» es ${gLabel}${suffix} -> «${full}».`,
        fr: `« ${meta.targetWord} » est ${gLabel}${suffix} -> « ${full} ».`,
        de: `„${meta.targetWord}“ ist ${gLabel}${suffix} -> „${full}“.`,
        pt: `«${meta.targetWord}» é ${gLabel}${suffix} -> «${full}».`,
        ru: `«${meta.targetWord}» — слово ${gLabel}${suffix} -> «${full}».`,
        id: `"${meta.targetWord}" bergender ${gLabel}${suffix} -> "${full}".`,
        tr: `"${meta.targetWord}" ${gLabel} bir isimdir${suffix} -> "${full}".`,
        zh: `“${meta.targetWord}”属于${gLabel}名词${suffix} ➔ “${full}”。`,
        ja: `「${meta.targetWord}」は${gLabel}です${suffix} ➔ 「${full}」。`,
        ko: `'${meta.targetWord}'은(는) ${gLabel} 명사입니다${suffix} ➔ '${full}'.`,
        hi: `"${meta.targetWord}" ${gLabel} संज्ञा है${suffix} ➔ "${full}"।`,
        ar: `كلمة «${meta.targetWord}» ${gLabel}${suffix} ⬅ «${full}».`,
        bn: `"${meta.targetWord}" হলো ${gLabel} বিশেষ্য${suffix} ➔ "${full}"।`,
        ur: `"${meta.targetWord}" ${gLabel} اسم ہے${suffix} ⬅ "${full}"۔`,
      };
      return map[baseLang];
    }

    case 'gender_agreement': {
      const suffix = clueText ? ` (${clueText})` : '';
      const map: Record<SupportedLanguageId, string> = {
        en: `Agrees with ${gLabel} "${meta.targetWord}"${suffix}: "${full}".`,
        es: `Concuerda con «${meta.targetWord}» (${gLabel})${suffix}: «${full}».`,
        fr: `S'accorde avec « ${meta.targetWord} » (${gLabel})${suffix} : « ${full} ».`,
        de: `Kongruiert mit „${meta.targetWord}“ (${gLabel})${suffix}: „${full}“.`,
        pt: `Concorda com «${meta.targetWord}» (${gLabel})${suffix}: «${full}».`,
        ru: `Согласуется со словом «${meta.targetWord}» (${gLabel})${suffix}: «${full}».`,
        id: `Menyesuaikan dengan "${meta.targetWord}" (${gLabel})${suffix}: "${full}".`,
        tr: `"${meta.targetWord}" (${gLabel}) ile uyum sağlar${suffix}: "${full}".`,
        zh: `与${gLabel}词“${meta.targetWord}”保持性数一致${suffix}：“${full}”。`,
        ja: `${gLabel}の「${meta.targetWord}」に一致させます${suffix}：「${full}」。`,
        ko: `${gLabel} '${meta.targetWord}'에 성·수를 일치시킵니다${suffix}: '${full}'.`,
        hi: `${gLabel} शब्द "${meta.targetWord}" के अनुसार रूप बदलता है${suffix}: "${full}"।`,
        ar: `يتطابق مع «${meta.targetWord}» (${gLabel})${suffix}: «${full}».`,
        bn: `${gLabel} শব্দ "${meta.targetWord}"-এর সাথে সামঞ্জস্যপূর্ণ রূপ${suffix}: "${full}"।`,
        ur: `${gLabel} لفظ "${meta.targetWord}" کے مطابق مطابقت رکھتا ہے${suffix}: "${full}"۔`,
      };
      return map[baseLang];
    }

    case 'ser_estar': {
      const reason = clueText || '';
      const map: Record<SupportedLanguageId, string> = {
        en: `Use "${meta.answer}" here (${reason}): "${full}".`,
        es: `Se usa «${meta.answer}» aquí (${reason}): «${full}».`,
        fr: `On utilise « ${meta.answer} » ici (${reason}) : « ${full} ».`,
        de: `Hier steht „${meta.answer}“ (${reason}): „${full}“.`,
        pt: `Usa-se «${meta.answer}» aqui (${reason}): «${full}».`,
        ru: `Здесь используется форма «${meta.answer}» (${reason}): «${full}».`,
        id: `Gunakan "${meta.answer}" di sini (${reason}): "${full}".`,
        tr: `Burada "${meta.answer}" kullanılır (${reason}): "${full}".`,
        zh: `此处使用“${meta.answer}”（${reason}）：“${full}”。`,
        ja: `ここでは「${meta.answer}」を使います（${reason}）：「${full}」。`,
        ko: `여기서는 '${meta.answer}'을(를) 씁니다(${reason}): '${full}'.`,
        hi: `यहाँ "${meta.answer}" का प्रयोग होता है (${reason}): "${full}"।`,
        ar: `نستخدم «${meta.answer}» هنا (${reason}): «${full}».`,
        bn: `এখানে "${meta.answer}" ব্যবহৃত হয় (${reason}): "${full}"।`,
        ur: `یہاں "${meta.answer}" استعمال ہوتا ہے (${reason}): "${full}"۔`,
      };
      return map[baseLang];
    }

    case 'sound_article': {
      const reason = clueText ? ` (${clueText})` : '';
      const map: Record<SupportedLanguageId, string> = {
        en: `"${meta.targetWord}" takes "${meta.answer}"${reason}: "${full}".`,
        es: `«${meta.targetWord}» lleva «${meta.answer}»${reason}: «${full}».`,
        fr: `« ${meta.targetWord} » prend « ${meta.answer} »${reason} : « ${full} ».`,
        de: `„${meta.targetWord}“ verlangt „${meta.answer}“${reason}: „${full}“.`,
        pt: `«${meta.targetWord}» usa «${meta.answer}»${reason}: «${full}».`,
        ru: `Со словом «${meta.targetWord}» ставится «${meta.answer}»${reason}: «${full}».`,
        id: `"${meta.targetWord}" memakai "${meta.answer}"${reason}: "${full}".`,
        tr: `"${meta.targetWord}" kelimesi "${meta.answer}" alır${reason}: "${full}".`,
        zh: `“${meta.targetWord}”前应搭配“${meta.answer}”${reason}：“${full}”。`,
        ja: `「${meta.targetWord}」には「${meta.answer}」が付きます${reason}：「${full}」。`,
        ko: `'${meta.targetWord}' 앞에는 '${meta.answer}'을(를) 씁니다${reason}: '${full}'.`,
        hi: `"${meta.targetWord}" के साथ "${meta.answer}" लगता है${reason}: "${full}"।`,
        ar: `تأخذ كلمة «${meta.targetWord}» الأداة «${meta.answer}»${reason}: «${full}».`,
        bn: `"${meta.targetWord}"-এর আগে "${meta.answer}" বসে${reason}: "${full}"।`,
        ur: `"${meta.targetWord}" کے ساتھ "${meta.answer}" آتا ہے${reason}: "${full}"۔`,
      };
      return map[baseLang];
    }

    case 'verb_conjugation': {
      const map: Record<SupportedLanguageId, string> = {
        en: `With "${meta.targetWord}", the correct verb form is "${meta.answer}" -> "${full}".`,
        es: `Con «${meta.targetWord}», la forma verbal correcta es «${meta.answer}» -> «${full}».`,
        fr: `Avec « ${meta.targetWord} », la forme verbale correcte est « ${meta.answer} » -> « ${full} ».`,
        de: `Bei „${meta.targetWord}“ lautet die richtige Verbform „${meta.answer}“ -> „${full}“.`,
        pt: `Com «${meta.targetWord}», a forma verbal correta é «${meta.answer}» -> «${full}».`,
        ru: `С «${meta.targetWord}» используется глагольная форма «${meta.answer}» -> «${full}».`,
        id: `Untuk "${meta.targetWord}", bentuk kata kerja yang tepat adalah "${meta.answer}" -> "${full}".`,
        tr: `"${meta.targetWord}" için doğru fiil çekimi "${meta.answer}" şeklindedir -> "${full}".`,
        zh: `主语或词干“${meta.targetWord}”对应的正确动词形式为“${meta.answer}” ➔ “${full}”。`,
        ja: `「${meta.targetWord}」に対する正しい動詞の形は「${meta.answer}」です ➔ 「${full}」。`,
        ko: `'${meta.targetWord}'에 알맞은 동사 활용형은 '${meta.answer}'입니다 ➔ '${full}'.`,
        hi: `"${meta.targetWord}" के साथ सही क्रिया रूप "${meta.answer}" है ➔ "${full}"।`,
        ar: `مع «${meta.targetWord}» تكون صيغة الفعل الصحيحة «${meta.answer}» ⬅ «${full}».`,
        bn: `"${meta.targetWord}"-এর সাথে সঠিক ক্রিয়ার রূপ হলো "${meta.answer}" ➔ "${full}"।`,
        ur: `"${meta.targetWord}" کے ساتھ درست فعلی صورت "${meta.answer}" ہے ⬅ "${full}"۔`,
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
      const reason = clueText ? ` (${clueText})` : '';
      const map: Record<SupportedLanguageId, string> = {
        en: `"${meta.targetWord}" takes "${meta.answer}"${reason}.`,
        es: `«${meta.targetWord}» forma «${meta.answer}»${reason}.`,
        fr: `« ${meta.targetWord} » donne « ${meta.answer} »${reason}.`,
        de: `„${meta.targetWord}“ bildet „${meta.answer}“${reason}.`,
        pt: `«${meta.targetWord}» forma «${meta.answer}»${reason}.`,
        ru: `От «${meta.targetWord}» образуется форма «${meta.answer}»${reason}.`,
        id: `"${meta.targetWord}" membentuk "${meta.answer}"${reason}.`,
        tr: `"${meta.targetWord}" kelimesi "${meta.answer}" biçimini alır${reason}.`,
        zh: `“${meta.targetWord}”变形为“${meta.answer}”${reason}。`,
        ja: `「${meta.targetWord}」は「${meta.answer}」になります${reason}。`,
        ko: `'${meta.targetWord}'은(는) '${meta.answer}' 형태가 됩니다${reason}.`,
        hi: `"${meta.targetWord}" का सही रूप "${meta.answer}" बनता है${reason}।`,
        ar: `تتحول «${meta.targetWord}» إلى «${meta.answer}»${reason}.`,
        bn: `"${meta.targetWord}" থেকে "${meta.answer}" গঠিত হয়${reason}।`,
        ur: `"${meta.targetWord}" کی درست صورت "${meta.answer}" بنتی ہے${reason}۔`,
      };
      return map[baseLang];
    }

    case 'particle_marker':
    case 'negation':
    case 'preposition_case':
    case 'comparison':
    default: {
      const reason = clueText ? ` (${clueText})` : '';
      const map: Record<SupportedLanguageId, string> = {
        en: `"${meta.answer}" completes this pattern${reason}: "${full}".`,
        es: `«${meta.answer}» completa esta estructura${reason}: «${full}».`,
        fr: `« ${meta.answer} » complète cette structure${reason} : « ${full} ».`,
        de: `„${meta.answer}“ vervollständigt dieses Muster${reason}: „${full}“.`,
        pt: `«${meta.answer}» completa esta estrutura${reason}: «${full}».`,
        ru: `«${meta.answer}» правильно дополняет эту конструкцию${reason}: «${full}».`,
        id: `"${meta.answer}" melengkapi pola tata bahasa ini${reason}: "${full}".`,
        tr: `Bu dilbilgisi kalıbını "${meta.answer}" tamamlar${reason}: "${full}".`,
        zh: `此处应填入语法标记“${meta.answer}”${reason}：“${full}”。`,
        ja: `この文型には「${meta.answer}」が入ります${reason}：「${full}」。`,
        ko: `이 문형에는 '${meta.answer}'이(가) 들어갑니다${reason}: '${full}'.`,
        hi: `इस व्याकरण संरचना में "${meta.answer}" सही विकल्प है${reason}: "${full}"।`,
        ar: `تكتمل هذه القاعدة باستخدام «${meta.answer}»${reason}: «${full}».`,
        bn: `এই ব্যাকরণ গঠনে "${meta.answer}" বসবে${reason}: "${full}"।`,
        ur: `اس گرامر کی ترکیب میں "${meta.answer}" درست ہے${reason}: "${full}"۔`,
      };
      return map[baseLang];
    }
  }
};

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
        tr: 'Hangi cinsiyet?',
        zh: '属于哪个词性？',
        ja: 'どの性？',
        ko: '어떤 성?',
        hi: 'कौन सा लिंग?',
        ar: 'ما الجنس النحوي؟',
        bn: 'কোন লিঙ্গ?',
        ur: 'کون سی جنس؟',
      };
      return `${m[1]} ➔ ${q[lang]}`;
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
      return `${m[1]} ➔ ${q[lang]}`;
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
      return `${m[1]} ➔ ${q[lang]}`;
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
    pattern: /^(?:Polite\s+)?past tense of\s*"([^"]+)"(?:\s*\([^)]*\))?$/i,
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
    pattern: /^Polite present tense of\s*"([^"]+)"(?:\s*\([^)]*\))?$/i,
    render: (m, lang) => {
      const q: Record<SupportedLanguageId, string> = {
        en: `Polite present tense of "${m[1]}"`,
        es: `Presente cortés de «${m[1]}»`,
        fr: `Présent poli de « ${m[1]} »`,
        de: `Höfliches Präsens von „${m[1]}“`,
        pt: `Presente cortês de «${m[1]}»`,
        ru: `Вежливое настоящее время от «${m[1]}»`,
        id: `Kala kini sopan dari "${m[1]}"`,
        tr: `"${m[1]}" fiilinin nazik şimdiki zamanı`,
        zh: `“${m[1]}”的敬语现在时`,
        ja: `「${m[1]}」の丁寧な現在形`,
        ko: `'${m[1]}'의 해요체 현재형`,
        hi: `"${m[1]}" का शिष्ट वर्तमान काल`,
        ar: `المضارع المهذب من «${m[1]}»`,
        bn: `"${m[1]}"-এর শিষ্ট বর্তমান রূপ`,
        ur: `"${m[1]}" کا مؤدبانہ فعل حال`,
      };
      return q[lang];
    },
  },
  {
    pattern: /^Plural of\s*"([^"]+)"(?:\s*(?:in\s+\w+|\[[^\]]*\]|\([^)]*\)))*$/i,
    render: (m, lang) => `${m[1]} ➔ ${GENDER_TERMS.plural[lang]}`,
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
        ar: `${m[1]} ➔ أداة الموضوع (wa)`,
        bn: `${m[1]} ➔ বিষয় নির্দেশক অব্যয় (wa)`,
        ur: `${m[1]} ➔ موضوع کی علامت (wa)`,
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
  if (!card.prompts?.[baseLang] && baseLang !== 'en') {
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
      const rawHero = card.prompt.split(/\s*➔\s*/)[0].replace(/___/g, '').trim();
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
