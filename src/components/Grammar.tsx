import React, { useState, useRef, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaRedo, FaBookOpen, FaBolt, FaListUl } from 'react-icons/fa';
import PronunciationButton from './PronunciationButton';
import WordIcon from './WordIcon';
import { useLanguage } from '../contexts/LanguageContext';
import { GrammarData, GrammarFlashcard, GenderNounRule, VerbConjugation } from '../types';
import { getGrammarForLanguage } from '../data/languages/grammarData';
import { resolveTranslation } from '../utils/translationResolver';
import { SupportedLanguageId } from '../data/languages/types';
import { warmUpAudioContext } from '../utils/audioWarmup';

const localizeGrammarMeaning = (raw: string, baseLang: SupportedLanguageId): string => {
  if (!raw || baseLang === 'en' || !/^[a-zA-Z\s/,.'()-]+$/.test(raw)) {
    return raw;
  }
  const parts = raw.split(/\s*\/\s*/);
  const translated = parts.map((part) => {
    const clean = part.replace(/\s*\([^)]*\)\s*/g, '').trim();
    if (!clean) return part;
    const direct = resolveTranslation({ phrase: clean, english: clean }, 'en', baseLang);
    if (direct && direct.toLowerCase() !== clean.toLowerCase()) {
      return direct;
    }
    if (/^to\s+/i.test(clean)) {
      const bare = clean.replace(/^to\s+/i, '').trim();
      const bareResolved = resolveTranslation({ phrase: bare, english: bare }, 'en', baseLang);
      if (bareResolved && bareResolved.toLowerCase() !== bare.toLowerCase()) {
        return bareResolved;
      }
    }
    return part;
  });
  return translated.join(' / ');
};

interface GrammarProps {
  grammarData?: GrammarData;
  initialTab?: 'flashcards' | 'gender' | 'verbs' | 'descriptions';
}

export const getSpokenGrammarWord = (text: string, lang: string): string => {
  if (!text) return '';
  // Remove parenthetical notes/translations, e.g. "gut (good)" -> "gut", "ev (house)" -> "ev"
  const cleaned = text
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .replace(/\s*\[[^\]]*\]\s*/g, ' ')
    .replace(/[«»"“”„‟`]/g, '')
    .trim();

  // For non-Latin scripts, if both native and Latin transliteration exist, extract native script:
  if (lang === 'zh') {
    const hanziMatch = cleaned.match(/[\u4e00-\u9fa5]+/g);
    if (hanziMatch) return hanziMatch.join('');
  } else if (lang === 'ja') {
    const jpMatch = cleaned.match(/[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+/g);
    if (jpMatch) return jpMatch.join('');
  } else if (lang === 'ko') {
    const koMatch = cleaned.match(/[\uac00-\ud7af\u1100-\u11ff]+/g);
    if (koMatch) return koMatch.join(' ');
  } else if (lang === 'ar') {
    const arMatch = cleaned.match(/[\u0600-\u06ff]+/g);
    if (arMatch) return arMatch.join(' ');
  } else if (lang === 'hi') {
    const hiMatch = cleaned.match(/[\u0900-\u097f]+/g);
    if (hiMatch) return hiMatch.join(' ');
  } else if (lang === 'bn') {
    const bnMatch = cleaned.match(/[\u0980-\u09ff]+/g);
    if (bnMatch) return bnMatch.join(' ');
  } else if (lang === 'ur') {
    const urMatch = cleaned.match(/[\u0600-\u06ff\u0750-\u077f\ufb50-\ufdff\ufe70-\ufeff]+/g);
    if (urMatch) return urMatch.join(' ');
  }

  return cleaned.split('/')[0].split(/\s*—\s*/)[0].trim();
};

export const getFlashcardFullAudioText = (card: GrammarFlashcard, lang: string): string => {
  if (card.audioWord) {
    const trimmedAudio = card.audioWord.trim();
    if (
      card.article &&
      !trimmedAudio.toLowerCase().startsWith(`${card.article.toLowerCase()} `) &&
      !(card.article.endsWith("'") && trimmedAudio.toLowerCase().startsWith(card.article.toLowerCase()))
    ) {
      return `${card.article} ${trimmedAudio}`.trim();
    }
    return trimmedAudio;
  }
  const canonicalPrompt = card.prompts?.en || card.prompt;
  const promptParts = canonicalPrompt.split(/\s*➔\s*/);
  const hero = promptParts[0].trim();
  const task = promptParts.length > 1 ? promptParts[1].trim() : null;

  if (card.article) {
    return `${card.article} ${hero.replace(/^___\s*/, '').trim()}`.trim();
  }
  if (task && task.includes('___')) {
    return task
      .replace('___', card.correctAnswer)
      .replace(/\s*\([^)]*\)\s*/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  if (hero.includes('___')) {
    return hero
      .replace('___', card.correctAnswer)
      .replace(/\s*\([^)]*\)\s*/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  return getSpokenGrammarWord(card.correctAnswer, lang) || card.correctAnswer;
};

export const getFlashcardPromptStemAudioText = (card: GrammarFlashcard, lang: string): string => {
  if (card.promptAudio) {
    return card.promptAudio.trim();
  }
  const canonicalPrompt = card.prompts?.en || card.prompt;
  const promptParts = canonicalPrompt.split(/\s*➔\s*/);
  const hero = promptParts[0].trim();
  const task = promptParts.length > 1 ? promptParts[1].trim() : null;

  if (hero.includes('___')) {
    const stripped = hero
      .replace(/\s*\([^)]*\)\s*/g, ' ')
      .replace(/\s*\[[^\]]*\]\s*/g, ' ')
      .replace(/___/g, '')
      .trim();
    if (stripped && !/\s/.test(stripped)) {
      return getSpokenGrammarWord(stripped, lang);
    }
    return '';
  }

  if (promptParts.length > 1) {
    const parenVerb = hero.match(/^[^\s(]+\s*\(([^)]+)\)$/);
    if (parenVerb) {
      return getSpokenGrammarWord(parenVerb[1], lang);
    }
    const plusVerb = hero.match(/\+\s*(.+)$/);
    if (plusVerb) {
      return getSpokenGrammarWord(plusVerb[1], lang);
    }
    if (!/\s/.test(hero) && !/["«„]/.test(hero)) {
      return getSpokenGrammarWord(hero, lang);
    }
    if (task && (/^___/.test(task) || /___[?？!！.。]*$/.test(task))) {
      const strippedTask = task
        .replace(/\s*\([^)]*\)\s*/g, ' ')
        .replace(/___/g, '')
        .replace(/[?？!！.。]/g, '')
        .trim();
      if (strippedTask && !/\s/.test(strippedTask)) {
        return getSpokenGrammarWord(strippedTask, lang);
      }
    }
    return '';
  }

  const quoted = hero.match(/"([^"_]+)"/);
  if (quoted) {
    return getSpokenGrammarWord(quoted[1], lang);
  }
  return '';
};

export const getFlashcardOptionAudioText = (
  option: string,
  lang: string,
  card?: GrammarFlashcard
): string => {
  if (card?.optionAudio?.[option]) {
    return card.optionAudio[option]!.trim();
  }
  const strippedAffix = option
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .replace(/\s*\[[^\]]*\]\s*/g, ' ')
    .replace(/^-+|-+$/g, '')
    .trim();

  if (lang === 'ja') {
    if (strippedAffix === 'は') return 'わ';
    if (strippedAffix === 'へ') return 'え';
  }
  if (lang === 'bn') {
    if (strippedAffix === 'ে') return 'এ';
    if (strippedAffix === 'ের') return 'এর';
  }

  return getSpokenGrammarWord(strippedAffix, lang).replace(/^-+|-+$/g, '').trim();
};

const getVerbLanguageNotice = (
  lang: string,
  baseLang: string
): { title: string; text: string } | null => {
  if (lang === 'zh') {
    const zhNotices: Record<string, { title: string; text: string }> = {
      ru: {
        title: 'В китайском языке глаголы НЕ спрягаются!',
        text: 'Форма глагола не меняется по лицам (я, ты, он, мы, они). Время, вид и направленность действия выражаются частицами: 在 (длительное), 了 (завершённое), 过 (опыт в прошлом), 要/会 (будущее/намерение) и отрицаниями 不 / 没.',
      },
      de: {
        title: 'Im Chinesischen gibt es keine Konjugation!',
        text: 'Die Verbform bleibt für alle Personen (ich, du, er, wir, sie) exakt gleich. Zeiten und Aspekte werden durch funktionale Partikeln wie 在 (Verlauf), 了 (abgeschlossen), 过 (Erfahrung) und 要 (Zukunft) ausgedrückt.',
      },
      es: {
        title: '¡El chino mandarín no tiene conjugación verbal!',
        text: 'La forma verbal es idéntica para todas las personas (yo, tú, él, nosotros). El tiempo y aspecto se expresan con partículas como 在 (en progreso), 了 (completado), 过 (experiencia) y 要 (futuro).',
      },
      fr: {
        title: 'Le chinois mandarin ne se conjugue pas !',
        text: 'La forme du verbe reste identique pour toutes les personnes (je, tu, il, nous). Le temps et l\'aspect s\'expriment par des particules comme 在 (en cours), 了 (accompli), 过 (expérience passée) et 要 (futur).',
      },
      pt: {
        title: 'O chinês mandarim NÃO conjuga verbos!',
        text: 'A forma do verbo nunca muda por pessoa. O tempo e o aspecto são expressos com partículas como 在 (em andamento), 了 (concluído), 过 (experiência passada) e 要 (futuro).',
      },
      id: {
        title: 'Bahasa Mandarin TIDAK memiliki konjugasi kata kerja!',
        text: 'Bentuk kata kerja selalu sama untuk semua subjek. Waktu dan aspek dinyatakan dengan partikel seperti 在 (sedang), 了 (sudah selesai), 过 (pernah), dan 要 (akan).',
      },
      tr: {
        title: 'Mandarin Çincesinde fiil çekimi YOKTUR!',
        text: 'Fiiller şahıslara göre hiç değişmez. Zaman ve görünüş 在 (devam eden), 了 (tamamlanmış), 过 (geçmiş deneyim) ve 要 (gelecek) gibi edatlarla ifade edilir.',
      },
      zh: {
        title: '汉语动词没有词形变化！',
        text: '无论主语是“我、你、他、我们”，动词形式完全一致，通过助词表达体貌与时间：在（进行）、了（完成）、过（经历）、要/会（将来）。',
      },
      ja: {
        title: '中国語の動詞は人称変化しません！',
        text: '主語が誰であっても動詞の形は同じです。時制やアスペクトは助詞で表します：在（進行）、了（完了）、过（経験）、要（未来）。',
      },
      ko: {
        title: '중국어 동사는 인칭에 따라 변하지 않습니다!',
        text: '주어가 누구든 동사 형태가 동일하며, 시제와 상은 조사로 표현합니다: 在(진행), 了(완료), 过(경험), 要(미래).',
      },
      hi: {
        title: 'मंदारिन चीनी में क्रिया का रूप नहीं बदलता!',
        text: 'सभी कर्ताओं के लिए क्रिया एक समान रहती है। काल और अवस्था निपातों से व्यक्त होते हैं: 在 (जारी), 了 (पूर्ण), 过 (अनुभव), और 要 (भविष्य)।',
      },
      ar: {
        title: 'الأفعال في الصينية المندرينية لا تتصرّف حسب الضمائر!',
        text: 'يبقى الفعل ثابتاً مع جميع الضمائر، ويُعبَّر عن الزمن بالأدوات الوظيفية مثل 在 (مستمر) و了 (مكتمل) و过 (تجربة سابقة) و要 (مستقبل).',
      },
      bn: {
        title: 'মান্দারিন চীনা ভাষায় ক্রিয়ার রূপ পরিবর্তন হয় না!',
        text: 'সর্বনাম যাই হোক না কেন ক্রিয়া একই থাকে। কাল ও ভাব প্রকাশ পায় অব্যয় দিয়ে: 在 (চলমান), 了 (সম্পন্ন), 过 (অভিজ্ঞতা), এবং 要 (ভবিষ্যৎ)।',
      },
      ur: {
        title: 'مینڈارن چینی میں فعل کی گردان نہیں ہوتی!',
        text: 'ہر ضمیر کے ساتھ فعل ایک جیسا رہتا ہے۔ زمانہ حروف سے ظاہر کیا جاتا ہے: 在 (جاری)، 了 (مکمل)، 过 (تجربہ)، اور 要 (مستقبل)۔',
      },
    };
    return zhNotices[baseLang] || {
      title: 'Mandarin Chinese has NO verb conjugations!',
      text: 'Verbs never change by person (I, you, he, we, they all use the exact same base word). Time and aspect are expressed using functional particles like 在 (ongoing), 了 (completed), 过 (past experience), and 要 (future intention).',
    };
  }

  if (lang === 'id') {
    const idNotices: Record<string, { title: string; text: string }> = {
      ru: {
        title: 'В индонезийском языке нет спряжения глаголов!',
        text: 'Глагол не меняется по лицам и числам. Время и модальность выражаются служебными словами: sedang (сейчас), sudah (уже), akan (будет) и belum (ещё не).',
      },
      de: {
        title: 'Im Indonesischen gibt es keine Konjugation!',
        text: 'Verben verändern sich weder nach Person noch nach Zahl. Zeiten werden durch Zeitmarken wie sedang (gerade), sudah (bereits) und akan (wird) angezeigt.',
      },
      es: {
        title: '¡El indonesio no tiene conjugaciones verbales!',
        text: 'El verbo no cambia según la persona. Los tiempos se indican mediante marcadores: sedang (actualmente), sudah (ya), akan (futuro) y belum (aún no).',
      },
      fr: {
        title: 'L\'indonésien ne conjugue pas les verbes !',
        text: 'Le verbe ne varie ni en personne ni en nombre. Le temps est indiqué par des marqueurs temporels : sedang (en cours), sudah (déjà), akan (futur) et belum (pas encore).',
      },
      pt: {
        title: 'Os verbos em indonésio NÃO são conjugados!',
        text: 'Os verbos nunca mudam de forma por pessoa. O tempo é indicado por marcadores auxiliares: sedang (agora), sudah (já), akan (futuro) e belum (ainda não).',
      },
      id: {
        title: 'Kata kerja bahasa Indonesia TIDAK mengalami konjugasi!',
        text: 'Kata kerja tidak berubah menurut subjek. Waktu dinyatakan dengan penanda: sedang, sudah, akan, dan belum.',
      },
      tr: {
        title: 'Endonezcede fiiller çekimlenmez!',
        text: 'Fiiller şahıslara göre değişmez. Zaman sedang (şu anda), sudah (zaten), akan (gelecek) ve belum (henüz değil) belirteçleriyle gösterilir.',
      },
      zh: {
        title: '印尼语动词没有变位！',
        text: '动词不会随人称变化，时态通过时间助词表达：sedang（正在）、sudah（已经）、akan（将要）和 belum（尚未）。',
      },
      ja: {
        title: 'インドネシア語の動詞は活用しません！',
        text: '人称によって動詞の形は変わらず、時制は助詞で表します：sedang（進行）、sudah（完了）、akan（未来）、belum（未完了）。',
      },
      ko: {
        title: '인도네시아어 동사는 활용하지 않습니다!',
        text: '인칭에 따라 동사 형태가 변하지 않으며 시제는 표지어로 나타냅니다: sedang(진행), sudah(완료), akan(미래), belum(아직).',
      },
      hi: {
        title: 'इंडोनेशियाई क्रियाओं का रूप नहीं बदलता!',
        text: 'कर्ता के अनुसार क्रिया नहीं बदलती। काल सहायक शब्दों से दर्शाया जाता है: sedang (अभी), sudah (पहले ही), akan (भविष्य), और belum (अभी नहीं)।',
      },
      ar: {
        title: 'الأفعال في الإندونيسية لا تتصرّف!',
        text: 'لا يتغير شكل الفعل حسب الضمير، بل يُحدَّد الزمن بكلمات مساعدة: sedang (الآن)، sudah (قد)، akan (سوف)، وbelum (ليس بعد).',
      },
      bn: {
        title: 'ইন্দোনেশীয় ভাষায় ক্রিয়ার রূপ পরিবর্তন হয় না!',
        text: 'পুরুষভেদে ক্রিয়া বদলায় না। সময় বোঝাতে সহায়ক শব্দ ব্যবহৃত হয়: sedang (চলমান), sudah (ইতিমধ্যে), akan (ভবিষ্যৎ), এবং belum (এখনও না)।',
      },
      ur: {
        title: 'انڈونیشیائی زبان میں فعل کی گردان نہیں ہوتی!',
        text: 'ضمیر کے مطابق فعل تبدیل نہیں ہوتا۔ زمانہ معاون الفاظ سے ظاہر ہوتا ہے: sedang (جاری)، sudah (مکمل)، akan (مستقبل)، اور belum (ابھی نہیں)۔',
      },
    };
    return idNotices[baseLang] || {
      title: 'Indonesian verbs do NOT conjugate!',
      text: 'Verbs never change form for person (I, you, they). Time is indicated using auxiliary marker words: sedang (currently), sudah (already), akan (will), and belum (not yet).',
    };
  }

  if (lang === 'ja') {
    const jaNotices: Record<string, { title: string; text: string }> = {
      ru: {
        title: 'Японские глаголы НЕ изменяются по лицам!',
        text: 'Форма одинакова для «я», «ты», «они». Глаголы спрягаются по уровню вежливости (вежливая 〜ます / словарная), времени (прошедшее 〜ました) и утверждению/отрицанию (〜ません).',
      },
      de: {
        title: 'Japanische Verben konjugieren NICHT nach Person!',
        text: 'Die Form ist für „ich“, „du“, „sie“ identisch. Verben ändern sich nach Höflichkeitsform (〜ます), Zeitform (Vergangenheit 〜ました) und Verneinung (〜ません).',
      },
      es: {
        title: '¡Los verbos japoneses NO conjugan por persona!',
        text: 'La forma es idéntica para "yo", "tú", "ellos". Los verbos cambian por nivel de cortesía (〜ます), tiempo (pasado 〜ました) y polaridad negativa (〜ません).',
      },
      fr: {
        title: 'Les verbes japonais ne varient PAS selon la personne !',
        text: 'La forme est identique pour « je », « tu », « ils ». Les verbes se déclinent selon la politesse (〜ます), le temps (passé 〜ました) et la polarité (négation 〜ません).',
      },
      pt: {
        title: 'Os verbos japoneses NÃO variam por pessoa!',
        text: 'A forma é idêntica para "eu", "você" ou "eles". Os verbos mudam conforme a cortesia (〜ます), o tempo (passado 〜ました) e a negação (〜ません).',
      },
      id: {
        title: 'Kata kerja bahasa Jepang TIDAK berubah menurut subjek!',
        text: 'Bentuk kata kerja sama untuk semua orang, tetapi berubah menurut tingkat kesopanan (〜ます), waktu lampau (〜ました), dan bentuk negatif (〜ません).',
      },
      tr: {
        title: 'Japonca fiiller şahsa göre çekimlenmez!',
        text: 'Özne kim olursa olsun fiil aynıdır; bunun yerine nezaket düzeyi (〜ます), geçmiş zaman (〜ました) ve olumsuzluk (〜ません) için çekimlenir.',
      },
      zh: {
        title: '日语动词不随人称变化！',
        text: '无论主语是“我、你、他们”，动词形式相同；日语动词根据礼貌体（〜ます）、过去时（〜ました）和否定式（〜ません）进行活用。',
      },
      ja: {
        title: '日本語の動詞は人称による変化がありません！',
        text: '丁寧体（〜ます）と普通体、過去形（〜ました）、否定形（〜ません）によって活用します。',
      },
      ko: {
        title: '일본어 동사는 인칭에 따라 변하지 않습니다!',
        text: '주어와 관계없이 형태가 같으며, 정중체(〜ます), 과거형(〜ました), 부정형(〜ません)에 따라 활용합니다.',
      },
      hi: {
        title: 'जापानी क्रियाएँ पुरुष (कर्ता) के अनुसार नहीं बदलतीं!',
        text: 'सभी कर्ताओं के लिए रूप समान रहता है; क्रियाएँ शिष्टाचार स्तर (〜ます), भूतकाल (〜ました) और नकारात्मक रूप (〜ません) के लिए बदलती हैं।',
      },
      ar: {
        title: 'الأفعال اليابانية لا تتغير حسب الفاعل!',
        text: 'يبقى الفعل متطابقاً مع جميع الضمائر، ويتصرف بدلاً من ذلك حسب درجة الاحترام (〜ます) والزمن الماضي (〜ました) والنفي (〜ません).',
      },
      bn: {
        title: 'জাপানি ক্রিয়া পুরুষভেদে পরিবর্তিত হয় না!',
        text: 'সর্বনাম নির্বিশেষে ক্রিয়ার রূপ একই থাকে; সৌজন্য (〜ます), অতীত কাল (〜ました) এবং না-বোধক (〜ません) অর্থে রূপ বদলায়।',
      },
      ur: {
        title: 'جاپانی افعال فاعل کے لحاظ سے تبدیل نہیں ہوتے!',
        text: 'ہر ضمیر کے ساتھ فعل یکساں رہتا ہے، البتہ احترام (〜ます)، ماضی (〜ました) اور منفی صورت (〜ません) کے لیے بدلتا ہے۔',
      },
    };
    return jaNotices[baseLang] || {
      title: 'Japanese verbs do NOT conjugate by person!',
      text: 'Whether saying "I", "you", or "they", the verb form is identical. Japanese verbs conjugate instead for politeness (polite 〜ます vs plain), tense (past 〜ました), and negative polarity (〜ません).',
    };
  }

  if (lang === 'ko') {
    const koNotices: Record<string, { title: string; text: string }> = {
      ru: {
        title: 'Корейские глаголы НЕ изменяются по лицам!',
        text: 'Форма не зависит от лица (я, ты, мы). Глаголы изменяются по уровням вежливости (вежливый 해요체 / официальный 습니다), времени (прошедшее 았/었어요, будущее ㄹ 거예요) и отрицанию.',
      },
      de: {
        title: 'Koreanische Verben konjugieren NICHT nach Person!',
        text: 'Die Form ist unabhängig von der Person (ich, du, wir). Verben verändern sich nach Höflichkeitsstufen (해요체 / 습니다), Zeitformen (Vergangenheit 았/었어요, Zukunft ㄹ 거예요) und Verneinung.',
      },
      es: {
        title: '¡Los verbos coreanos NO conjugan por persona!',
        text: 'La forma no depende de la persona (yo, tú, nosotros). Los verbos cambian según el nivel de cortesía (해요체 / 습니다), el tiempo (pasado 았/었어요, futuro ㄹ 거예요) y la negación.',
      },
      fr: {
        title: 'Les verbes coréens ne varient PAS selon la personne !',
        text: 'La forme ne dépend pas de la personne (je, tu, nous). Les verbes se conjuguent selon le niveau de politesse (해요체 / 습니다), le temps (passé 았/었어요, futur ㄹ 거예요) et la négation.',
      },
      pt: {
        title: 'Os verbos coreanos NÃO variam por pessoa!',
        text: 'Os verbos permanecem iguais para qualquer sujeito, mudando por nível de cortesia (해요 / 습니다) e tempo verbal (았/었어요, ㄹ 거예요).',
      },
      id: {
        title: 'Kata kerja bahasa Korea TIDAK berubah menurut subjek!',
        text: 'Kata kerja tetap sama untuk semua subjek, tetapi berubah menurut tingkat kesopanan (해요 / 습니다) dan kala waktu (았/었어요, ㄹ 거예요).',
      },
      tr: {
        title: 'Korece fiiller şahsa göre çekimlenmez!',
        text: 'Özne kim olursa olsun fiil aynı kalır; nezaket düzeylerine (해요 / 습니다) ve zamanlara (았/었어요, ㄹ 거예요) göre çekimlenir.',
      },
      zh: {
        title: '韩语动词不随人称变化！',
        text: '无论主语是谁，动词形式保持一致，而是根据敬语等级（非格式体敬语 해요、格式体 습니다）和时态（过去 았/었어요、将来 ㄹ 거예요）变化。',
      },
      ja: {
        title: '韓国語の動詞は人称変化しません！',
        text: '主語に関係なく形は同じで、敬語レベル（해요体／습니다体）や時制（過去 았/었어요、未来 ㄹ 거예요）によって活用します。',
      },
      ko: {
        title: '한국어 동사는 인칭에 따라 변하지 않습니다!',
        text: '높임법(해요체 / 합쇼체)과 시제(과거 았/었어요, 미래 ㄹ 거예요)에 따라 어미가 활용됩니다.',
      },
      hi: {
        title: 'कोरियाई क्रियाएँ कर्ता के अनुसार नहीं बदलतीं!',
        text: 'सभी कर्ताओं के लिए रूप समान रहता है, पर शिष्टाचार स्तर (해요 / 습니다) और काल (भूतकाल 았/었어요, भविष्य ㄹ 거예요) के अनुसार बदलता है।',
      },
      ar: {
        title: 'الأفعال الكورية لا تتغير حسب الضمير!',
        text: 'تبقى صيغة الفعل واحدة مع جميع الضمائر، وتتصرف حسب مستويات الاحترام (해요 / 습니다) والأزمنة (الماضي 았/었어요 والمستقبل ㄹ 거예요).',
      },
      bn: {
        title: 'কোরীয় ক্রিয়া পুরুষভেদে পরিবর্তিত হয় না!',
        text: 'সর্বনাম নির্বিশেষে ক্রিয়া একই থাকে, তবে সৌজন্য স্তর (해요 / 습니다) ও কাল (অতীত 았/었어요, ভবিষ্যৎ ㄹ 거예요) অনুসারে পরিবর্তিত হয়।',
      },
      ur: {
        title: 'کوریائی افعال ضمیر کے مطابق نہیں بدلتے!',
        text: 'ہر فاعل کے ساتھ فعل یکساں رہتا ہے، البتہ احترام کے درجات (해요 / 습니다) اور زمانے (ماضی 았/었어요، مستقبل ㄹ 거예요) کے مطابق بدلتا ہے۔',
      },
    };
    return koNotices[baseLang] || {
      title: 'Korean verbs do NOT conjugate by person!',
      text: 'Korean verbs remain the same regardless of who the subject is (I, you, he, we). Instead, verbs conjugate for politeness levels (informal polite 해요, formal 습니다) and tenses (past 았/었어요, future ㄹ 거예요).',
    };
  }

  return null;
};

export const Grammar: React.FC<GrammarProps> = ({ grammarData, initialTab = 'flashcards' }) => {
  const { currentLanguage, baseLanguage } = useLanguage();

  // Dynamic language grammar: always resolve and localize for active language pair
  const activeGrammar: GrammarData = React.useMemo(() => {
    return getGrammarForLanguage(currentLanguage, baseLanguage, grammarData);
  }, [currentLanguage, baseLanguage, grammarData]);

  const [activeTab, setActiveTab] = useState<'flashcards' | 'gender' | 'verbs' | 'descriptions'>(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Flashcard Deck State
  const flashcardDeck: GrammarFlashcard[] = activeGrammar.flashcards && activeGrammar.flashcards.length > 0
    ? activeGrammar.flashcards
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [cardScore, setCardScore] = useState(0);
  const [deckFinished, setDeckFinished] = useState(false);
  const correctSoundRef = useRef<HTMLAudioElement | null>(null);
  const incorrectSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const correctAudio = new Audio('/audio/sounds/correct.mp3');
    correctAudio.preload = 'auto';
    const incorrectAudio = new Audio('/audio/sounds/incorrect.mp3');
    incorrectAudio.preload = 'auto';
    correctSoundRef.current = correctAudio;
    incorrectSoundRef.current = incorrectAudio;

    return () => {
      if (correctSoundRef.current) correctSoundRef.current.pause();
      if (incorrectSoundRef.current) incorrectSoundRef.current.pause();
    };
  }, []);

  const playFeedbackChime = (audio: HTMLAudioElement | null, type: 'correct' | 'incorrect') => {
    if (!audio) return;
    try {
      audio.pause();
      audio.currentTime = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => {
          console.warn(`Could not play ${type} sound`, e);
        });
      }
    } catch (e) {
      console.warn(`Error playing ${type} sound`, e);
    }
  };

  // Verb Matrix State
  const verbsList: VerbConjugation[] = activeGrammar.verbs && activeGrammar.verbs.length > 0
    ? activeGrammar.verbs
    : [];
  const [activeVerbIndex, setActiveVerbIndex] = useState(0);

  // Reset progress when language or grammar data changes
  React.useEffect(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setCardScore(0);
    setDeckFinished(false);
    setActiveVerbIndex(0);
  }, [currentLanguage, grammarData]);

  const currentCard = flashcardDeck[currentIndex] || flashcardDeck[0];

  // Stable pseudo-random shuffle of options for each flashcard so answers aren't predictable
  const cardOptions = React.useMemo(() => {
    if (!currentCard?.options) return [];
    const opts = [...currentCard.options];
    let seed = 0;
    for (let i = 0; i < (currentCard.id || '').length; i++) {
      seed = (seed * 31 + currentCard.id.charCodeAt(i)) & 0xffffffff;
    }
    for (let i = opts.length - 1; i > 0; i--) {
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      const j = Math.abs(seed) % (i + 1);
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
  }, [currentCard?.id, currentCard?.options]);

  const handleOptionClick = (option: string) => {
    if (selectedOption !== null) return;
    warmUpAudioContext();
    setSelectedOption(option);
    if (option === currentCard.correctAnswer) {
      setCardScore(prev => prev + 1);
      playFeedbackChime(correctSoundRef.current, 'correct');
    } else {
      playFeedbackChime(incorrectSoundRef.current, 'incorrect');
    }
  };

  const handleNextCard = () => {
    if (currentIndex + 1 < flashcardDeck.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setDeckFinished(true);
    }
  };

  const handleRestartDeck = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setCardScore(0);
    setDeckFinished(false);
  };

  const localizedLabels = (() => {
    const flashcardsMap: Record<string, string> = {
      en: 'Flashcards', de: 'Karteikarten', es: 'Tarjetas', fr: 'Flashcards', ru: 'Карточки',
      pt: 'Cartões', id: 'Kartu Kilat', tr: 'Bilgi Kartları', zh: '语法闪卡', ja: '暗記カード',
      ko: '플래시카드', hi: 'फ़्लैशकार्ड', ar: 'بطاقات تعليمية', bn: 'ফ্ল্যাশকার্ড', ur: 'فلیش کارڈز'
    };
    const genderMap: Record<string, string> = {
      en: 'Noun Genders', de: 'Artikel & Geschlecht', es: 'Artículos y Género', fr: 'Articles & Genres', ru: 'Артикли и род',
      pt: 'Artigos e Gênero', id: 'Kata Sandang & Gender', tr: 'Tanımlıklar ve Cinsiyet', zh: '冠词与词性', ja: '冠詞と名詞の性',
      ko: '관사 및 명사 성', hi: 'लिंग और उपपद', ar: 'التذكير والتأنيث', bn: 'লিঙ্গ ও পদাশ্রিত নির্দেশক', ur: 'تذکیر و تانیث'
    };
    const verbsParticlesMap: Record<string, string> = {
      en: 'Verbs & Particles', de: 'Verben & Partikeln', es: 'Verbos y partículas', fr: 'Verbes et particules', ru: 'Глаголы и частицы',
      pt: 'Verbos e partículas', id: 'Kata Kerja & Partikel', tr: 'Fiiller ve Edatlar', zh: '动词与助词', ja: '動詞と助詞',
      ko: '동사 및 조사', hi: 'क्रियाएँ और निपात', ar: 'الأفعال والأدوات', bn: 'ক্রিয়া ও অব্যয়', ur: 'افعال اور حروف'
    };
    const verbsMarkersMap: Record<string, string> = {
      en: 'Verb Markers', de: 'Verben & Zeitmarker', es: 'Verbos y marcadores', fr: 'Verbes et marqueurs', ru: 'Глаголы и маркеры',
      pt: 'Marcadores verbais', id: 'Penanda Waktu', tr: 'Zaman Belirteçleri', zh: '动词时态标记', ja: '時制マーカー',
      ko: '동사 시제 표지', hi: 'काल संकेतक', ar: 'علامات الزمن', bn: 'কাল নির্দেশক', ur: 'زمانے کی علامات'
    };
    const verbsPoliteMap: Record<string, string> = {
      en: 'Verb Forms & Politeness', de: 'Höflichkeitsformen', es: 'Formas y Cortesía', fr: 'Formes de politesse', ru: 'Формы вежливости',
      pt: 'Formas de cortesia', id: 'Bentuk Kesopanan', tr: 'Nezaket Biçimleri', zh: '动词与敬语形式', ja: '動詞の活用と敬語',
      ko: '동사 활용 및 높임법', hi: 'क्रिया रूप और शिष्टाचार', ar: 'صيغ الأفعال والاحترام', bn: 'ক্রিয়ার রূপ ও সৌজন্য', ur: 'افعال اور آداب'
    };
    const verbsTensesMap: Record<string, string> = {
      en: 'Verb Tenses', de: 'Verben & Konjugation', es: 'Verbos y Tiempos', fr: 'Verbes & Temps', ru: 'Глаголы и времена',
      pt: 'Verbos e Tempos', id: 'Kata Kerja & Kala', tr: 'Fiil Zamanları', zh: '动词与时态', ja: '動詞と時制',
      ko: '동사 및 시제', hi: 'क्रिया और काल', ar: 'الأفعال والأزمنة', bn: 'ক্রিয়া ও কাল', ur: 'افعال اور زمانے'
    };
    const rulesPatternsMap: Record<string, string> = {
      en: 'Rules & Patterns', de: 'Regeln & Muster', es: 'Reglas y Patrones', fr: 'Règles et Modèles', ru: 'Правила и модели',
      pt: 'Regras e Padrões', id: 'Aturan & Pola', tr: 'Kurallar ve Kalıplar', zh: '语法规则与句型', ja: '文法ルールと文型',
      ko: '문법 규칙 및 패턴', hi: 'नियम और पैटर्न', ar: 'القواعد والأنماط', bn: 'নিয়ম ও গঠন', ur: 'اصول اور تراکیب'
    };
    const descriptionsMap: Record<string, string> = {
      en: 'Descriptions', de: 'Beschreibungen & Adjektive', es: 'Descripciones', fr: 'Descriptions', ru: 'Описания',
      pt: 'Descrições', id: 'Kata Sifat & Deskripsi', tr: 'Sıfatlar ve Tanımlar', zh: '形容词与描述', ja: '形容詞と描写',
      ko: '형용사 및 묘사', hi: 'विशेषण और विवरण', ar: 'الصفات والوصف', bn: 'বিশেষণ ও বিবরণ', ur: 'صفتیں اور اوصاف'
    };
    const nextMap: Record<string, string> = {
      en: 'Next Card', de: 'Nächste Karte', es: 'Siguiente', fr: 'Suivant', ru: 'Далее',
      pt: 'Próximo', id: 'Kartu Berikutnya', tr: 'Sonraki Kart', zh: '下一张', ja: '次のカード',
      ko: '다음 카드', hi: 'अगला कार्ड', ar: 'البطاقة التالية', bn: 'পরবর্তী কার্ড', ur: 'اگلا کارڈ'
    };
    const restartMap: Record<string, string> = {
      en: 'Practice Again', de: 'Neustart', es: 'Reiniciar', fr: 'Recommencer', ru: 'Заново',
      pt: 'Praticar Novamente', id: 'Ulangi Latihan', tr: 'Tekrar Çalış', zh: '重新练习', ja: 'もう一度練習',
      ko: '다시 연습하기', hi: 'फिर से अभ्यास करें', ar: 'التدرب مجدداً', bn: 'আবার অনুশীলন করুন', ur: 'دوبارہ مشق کریں'
    };
    const badgeArticlesMap: Record<string, string> = {
      en: '🏷️ Articles (a / an)', ru: '🏷️ Артикли (a / an)', es: '🏷️ Artículos (a / an)', fr: '🏷️ Articles (a / an)', de: '🏷️ Artikel (a / an)',
      pt: '🏷️ Artigos (a / an)', id: '🏷️ Kata Sandang (a / an)', tr: '🏷️ Tanımlıklar (a / an)', zh: '🏷️ 冠词 (a / an)', ja: '🏷️ 冠詞 (a / an)',
      ko: '🏷️ 관사 (a / an)', hi: '🏷️ आर्टिकल (a / an)', ar: '🏷️ أدوات التعريف والتنكير', bn: '🏷️ আর্টিকেল (a / an)', ur: '🏷️ حروفِ تنکیر (a / an)'
    };
    const badgeGenderMap: Record<string, string> = {
      en: '🏷️ Noun Gender', ru: '🏷️ Род существительных', es: '🏷️ Género gramatical', fr: '🏷️ Genre des noms', de: '🏷️ Geschlecht',
      pt: '🏷️ Gênero gramatical', id: '🏷️ Gender Kata Benda', tr: '🏷️ İsim Cinsiyeti', zh: '🏷️ 名词词性', ja: '🏷️ 名詞の性',
      ko: '🏷️ 명사의 성', hi: '🏷️ संज्ञा लिंग', ar: '🏷️ جنس الاسم', bn: '🏷️ বিশেষ্যের লিঙ্গ', ur: '🏷️ اسم کی جنس'
    };
    const badgeVerbMap: Record<string, string> = {
      en: '🔄 Verb Tense', ru: '🔄 Время глагола', es: '🔄 Tiempo verbal', fr: '🔄 Temps du verbe', de: '🔄 Zeitform',
      pt: '🔄 Tempo verbal', id: '🔄 Kala Kata Kerja', tr: '🔄 Fiil Zamanı', zh: '🔄 动词时态', ja: '🔄 動詞の時制',
      ko: '🔄 동사 시제', hi: '🔄 क्रिया काल', ar: '🔄 زمن الفعل', bn: '🔄 ক্রিয়ার কাল', ur: '🔄 فعل کا زمانہ'
    };
    const badgeDescriptionMap: Record<string, string> = {
      en: '📐 Description', ru: '📐 Описание', es: '📐 Descripción', fr: '📐 Description', de: '📐 Beschreibung',
      pt: '📐 Descrição', id: '📐 Deskripsi', tr: '📐 Tanımlama', zh: '📐 语法描述', ja: '📐 文法パターン',
      ko: '📐 문법 설명', hi: '📐 व्याकरण विवरण', ar: '📐 الوصف والقواعد', bn: '📐 ব্যাকরণ বিবরণ', ur: '📐 قواعد کی وضاحت'
    };
    const howToRecognizeMap: Record<string, string> = {
      en: 'How to recognize:', ru: 'Как распознать:', es: 'Cómo reconocerlo:', fr: 'Comment reconnaître :', de: 'Erkennungsmerkmale:',
      pt: 'Como reconhecer:', id: 'Cara mengenali:', tr: 'Nasıl tanınır:', zh: '识别方法：', ja: '見分け方：',
      ko: '구별 방법:', hi: 'कैसे पहचानें:', ar: 'كيفية التمييز:', bn: 'চেনার উপায়:', ur: 'پہچان کا طریقہ:'
    };
    const highFreqMap: Record<string, string> = {
      en: 'High-frequency examples:', ru: 'Частые примеры:', es: 'Ejemplos frecuentes:', fr: 'Exemples fréquents :', de: 'Häufige Beispiele:',
      pt: 'Exemplos frequentes:', id: 'Contoh umum:', tr: 'Sık kullanılan örnekler:', zh: '高频例词：', ja: 'よく使う例：',
      ko: '자주 쓰이는 예시:', hi: 'प्रमुख उदाहरण:', ar: 'أمثلة شائعة:', bn: 'প্রচলিত উদাহরণ:', ur: 'عام مثالیں:'
    };
    const contextMap: Record<string, string> = {
      en: 'Example in context:', ru: 'Пример в контексте:', es: 'Ejemplo en contexto:', fr: 'Exemple en contexte :', de: 'Beispiel im Kontext:',
      pt: 'Exemplo em contexto:', id: 'Contoh dalam kalimat:', tr: 'Bağlam içinde örnek:', zh: '语境例句：', ja: '文脈での例文：',
      ko: '문맥 속 예문:', hi: 'संदर्भ में उदाहरण:', ar: 'مثال في السياق:', bn: 'বাক্যে উদাহরণ:', ur: 'جملے میں مثال:'
    };
    const deckDoneMap: Record<string, string> = {
      en: 'Deck Completed!', ru: 'Колода пройдена!', es: '¡Baraja completada!', fr: 'Paquet terminé !', de: 'Stapel abgeschlossen!',
      pt: 'Baralho concluído!', id: 'Dek Selesai!', tr: 'Deste Tamamlandı!', zh: '闪卡练习已完成！', ja: 'デッキ完了！',
      ko: '카드 학습 완료!', hi: 'अभ्यास पूरा हुआ!', ar: 'اكتملت البطاقات!', bn: 'ফ্ল্যাশকার্ড সম্পন্ন!', ur: 'کارڈز کی مشق مکمل!'
    };

    const isPatternLang = ['tr', 'zh', 'ja', 'ko', 'hi', 'ar', 'bn', 'ur', 'id'].includes(currentLanguage);

    return {
      flashcards: flashcardsMap[baseLanguage] || flashcardsMap.en,
      gender: genderMap[baseLanguage] || genderMap.en,
      verbs: (() => {
        if (currentLanguage === 'zh') return verbsParticlesMap[baseLanguage] || verbsParticlesMap.en;
        if (currentLanguage === 'id') return verbsMarkersMap[baseLanguage] || verbsMarkersMap.en;
        if (currentLanguage === 'ja' || currentLanguage === 'ko') return verbsPoliteMap[baseLanguage] || verbsPoliteMap.en;
        return verbsTensesMap[baseLanguage] || verbsTensesMap.en;
      })(),
      descriptions: isPatternLang
        ? (rulesPatternsMap[baseLanguage] || rulesPatternsMap.en)
        : (descriptionsMap[baseLanguage] || descriptionsMap.en),
      next: nextMap[baseLanguage] || nextMap.en,
      restart: restartMap[baseLanguage] || restartMap.en,
      badgeArticles: badgeArticlesMap[baseLanguage] || badgeArticlesMap.en,
      badgeGender: badgeGenderMap[baseLanguage] || badgeGenderMap.en,
      badgeVerb: badgeVerbMap[baseLanguage] || badgeVerbMap.en,
      badgeDescription: badgeDescriptionMap[baseLanguage] || badgeDescriptionMap.en,
      howToRecognize: howToRecognizeMap[baseLanguage] || howToRecognizeMap.en,
      highFrequencyExamples: highFreqMap[baseLanguage] || highFreqMap.en,
      exampleInContext: contextMap[baseLanguage] || contextMap.en,
      deckCompleted: deckDoneMap[baseLanguage] || deckDoneMap.en,
    };
  })();

  return (
    <div className="grammar-section" data-testid="grammar-component">
      {/* Secondary Tab Switcher */}
      <div className="grammar-subtabs-nav" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'flashcards'}
          className={`grammar-tab-btn ${activeTab === 'flashcards' ? 'active' : ''}`}
          onClick={() => setActiveTab('flashcards')}
        >
          <FaBolt className="tab-btn-icon" />
          <span>{localizedLabels.flashcards}</span>
        </button>

        {activeGrammar.genderRules && activeGrammar.genderRules.length > 0 && (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'gender'}
            className={`grammar-tab-btn ${activeTab === 'gender' ? 'active' : ''}`}
            onClick={() => setActiveTab('gender')}
          >
            <FaBookOpen className="tab-btn-icon" />
            <span>{localizedLabels.gender}</span>
          </button>
        )}

        {verbsList.length > 0 && (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'verbs'}
            className={`grammar-tab-btn ${activeTab === 'verbs' ? 'active' : ''}`}
            onClick={() => setActiveTab('verbs')}
          >
            <FaListUl className="tab-btn-icon" />
            <span>{localizedLabels.verbs}</span>
          </button>
        )}

        {activeGrammar.descriptions && activeGrammar.descriptions.length > 0 && (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'descriptions'}
            className={`grammar-tab-btn ${activeTab === 'descriptions' ? 'active' : ''}`}
            onClick={() => setActiveTab('descriptions')}
          >
            <span>{localizedLabels.descriptions}</span>
          </button>
        )}
      </div>

      {/* View 1: Interactive Flashcards */}
      {activeTab === 'flashcards' && (
        <div className="grammar-flashcard-container">
          {!currentCard ? (
            <div className="grammar-card">
              <p>No flashcards currently available for this section.</p>
            </div>
          ) : !deckFinished ? (
            <div className="grammar-card">
              {/* Header Badge & Deck Progress */}
              <div className="grammar-card-header">
                <span className="grammar-category-badge">
                  {currentCard.type === 'gender'
                    ? (currentLanguage === 'en' ? localizedLabels.badgeArticles : localizedLabels.badgeGender)
                    : currentCard.type === 'article'
                    ? localizedLabels.badgeArticles
                    : currentCard.type === 'verb'
                    ? localizedLabels.badgeVerb
                    : localizedLabels.badgeDescription}
                </span>
                <span className="grammar-progress-count">
                  {currentIndex + 1} / {flashcardDeck.length}
                </span>
              </div>

              {/* Prompt Hero Card */}
              {(() => {
                const activePrompt = currentCard.prompts?.[baseLanguage] || currentCard.prompt;
                const promptParts = activePrompt.split(/\s*➔\s*/);
                const heroWord = promptParts[0];
                const taskPrompt = promptParts.length > 1 ? promptParts[1] : null;
                const hasComplexOptions = cardOptions.some(
                  (opt) => opt.includes('(') || opt.length > 7
                );
                const audioTextToPlay = getFlashcardFullAudioText(currentCard, currentLanguage);
                const promptStemAudio = getFlashcardPromptStemAudioText(currentCard, currentLanguage);
                const activePromptAudio = selectedOption !== null ? audioTextToPlay : promptStemAudio;

                const renderPromptWithBlank = (text: string) => {
                  if (!text || !text.includes('___')) return text;
                  const parts = text.split('___');
                  const isCorrect = selectedOption === currentCard.correctAnswer;

                  return (
                    <>
                      {parts.map((part, idx) => (
                        <React.Fragment key={idx}>
                          {part}
                          {idx < parts.length - 1 && (
                            selectedOption ? (
                              <span className={`grammar-blank-filled ${isCorrect ? 'correct' : 'incorrect'}`}>
                                {selectedOption}
                              </span>
                            ) : (
                              <span className="grammar-blank-slot" aria-label="blank space">
                                <span className="grammar-blank-line" />
                              </span>
                            )
                          )}
                        </React.Fragment>
                      ))}
                    </>
                  );
                };

                return (
                  <>
                    <div className="grammar-prompt-box">
                      {currentCard.icon && (
                        <div className="grammar-icon-badge" aria-hidden="true">
                          <WordIcon
                            icon={currentCard.icon}
                            word={heroWord}
                            meaning={currentCard.translation}
                            size={42}
                            className="grammar-prompt-icon"
                          />
                        </div>
                      )}
                      <div className="grammar-prompt-heading-row">
                        <h3 className="grammar-card-prompt">{renderPromptWithBlank(heroWord)}</h3>
                        {activePromptAudio && (
                          <PronunciationButton
                            text={activePromptAudio}
                            lang={currentLanguage}
                            audioCategory="grammar"
                            label={`Pronounce ${activePromptAudio}`}
                            className="grammar-prompt-audio-btn"
                          />
                        )}
                      </div>
                      {currentCard.translation && (
                        <p className="grammar-card-translation">
                          {currentCard.translations?.[baseLanguage] ||
                            resolveTranslation(
                              {
                                word: currentCard.audioWord || heroWord.replace(/^___\s*/, '').trim(),
                                meaning: currentCard.translation,
                              },
                              currentLanguage,
                              baseLanguage
                            ) ||
                            currentCard.translation}
                        </p>
                      )}
                      {taskPrompt && (
                        <div className="grammar-prompt-task-pill">
                          <span className="task-pill-arrow">➔</span>
                          <span>{renderPromptWithBlank(taskPrompt)}</span>
                        </div>
                      )}
                    </div>

                    {/* Option Buttons */}
                    <div
                      className={`grammar-options-grid ${
                        hasComplexOptions ? 'options-stacked' : `options-compact options-count-${cardOptions.length}`
                      }`}
                    >
                      {cardOptions.map((option) => {
                        const isSelected = selectedOption === option;
                        const isCorrect = option === currentCard.correctAnswer;
                        let btnStateClass = '';

                        if (selectedOption !== null) {
                          if (isCorrect) btnStateClass = 'option-correct';
                          else if (isSelected && !isCorrect) btnStateClass = 'option-incorrect';
                          else btnStateClass = 'option-dimmed';
                        }

                        // Gender color hints for German der/die/das
                        let genderColorClass = '';
                        if (option === 'der') genderColorClass = 'badge-masculine';
                        if (option === 'die') genderColorClass = 'badge-feminine';
                        if (option === 'das') genderColorClass = 'badge-neuter';

                        const parenMatch = option.match(/^(.+?)\s*\((.+?)\)$/);
                        const mainText = parenMatch ? parenMatch[1] : option;
                        const subText = parenMatch ? parenMatch[2] : null;
                        const spokenOption = getFlashcardOptionAudioText(option, currentLanguage, currentCard);

                        return (
                          <div key={option} className="grammar-option-item">
                            <button
                              type="button"
                              className={`grammar-option-btn ${btnStateClass} ${genderColorClass}`}
                              onClick={() => handleOptionClick(option)}
                              disabled={selectedOption !== null}
                            >
                              <div className="grammar-option-content">
                                <span className="grammar-option-main">{mainText}</span>
                                {subText && <span className="grammar-option-sub">({subText})</span>}
                              </div>
                              {selectedOption !== null && isCorrect && <FaCheckCircle className="option-state-icon" />}
                              {selectedOption !== null && isSelected && !isCorrect && <FaTimesCircle className="option-state-icon" />}
                            </button>
                            {spokenOption && (
                              <PronunciationButton
                                text={spokenOption}
                                lang={currentLanguage}
                                audioCategory="grammar"
                                label={`Pronounce ${mainText}`}
                                className="grammar-option-audio-btn"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Immediate Feedback Card */}
                    {selectedOption !== null && (
                      <div className={`grammar-feedback-box ${selectedOption === currentCard.correctAnswer ? 'feedback-correct' : 'feedback-incorrect'}`}>
                        <p className="feedback-explanation">
                          {selectedOption === currentCard.correctAnswer ? '✨ ' : '💡 '}
                          {currentCard.explanations?.[baseLanguage] || currentCard.explanation}
                        </p>

                        <div className="feedback-actions">
                          <PronunciationButton
                            text={audioTextToPlay}
                            lang={currentLanguage}
                            audioCategory="grammar"
                            label="Listen"
                            className="grammar-audio-btn"
                          />

                          <button
                            type="button"
                            className="grammar-next-btn"
                            onClick={handleNextCard}
                            autoFocus
                          >
                            {localizedLabels.next} ➔
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="grammar-deck-complete-card">
              <span className="complete-trophy">🏆</span>
              <h3>{localizedLabels.deckCompleted}</h3>
              <p className="complete-score">
                {baseLanguage === 'ru' ? (
                  <>Правильно: <strong>{cardScore}</strong> из <strong>{flashcardDeck.length}</strong>!</>
                ) : baseLanguage === 'es' ? (
                  <>¡Acertaste <strong>{cardScore}</strong> de <strong>{flashcardDeck.length}</strong>!</>
                ) : baseLanguage === 'fr' ? (
                  <>Vous avez obtenu <strong>{cardScore}</strong> sur <strong>{flashcardDeck.length}</strong> !</>
                ) : baseLanguage === 'de' ? (
                  <>Du hast <strong>{cardScore}</strong> von <strong>{flashcardDeck.length}</strong> richtig!</>
                ) : baseLanguage === 'pt' ? (
                  <>Você acertou <strong>{cardScore}</strong> de <strong>{flashcardDeck.length}</strong>!</>
                ) : baseLanguage === 'id' ? (
                  <>Anda menjawab benar <strong>{cardScore}</strong> dari <strong>{flashcardDeck.length}</strong>!</>
                ) : baseLanguage === 'tr' ? (
                  <><strong>{flashcardDeck.length}</strong> sorudan <strong>{cardScore}</strong> doğru yaptınız!</>
                ) : baseLanguage === 'zh' ? (
                  <>答对 <strong>{cardScore}</strong> / <strong>{flashcardDeck.length}</strong> 题！</>
                ) : baseLanguage === 'ja' ? (
                  <><strong>{flashcardDeck.length}</strong>問中<strong>{cardScore}</strong>問正解！</>
                ) : baseLanguage === 'ko' ? (
                  <><strong>{flashcardDeck.length}</strong>문제 중 <strong>{cardScore}</strong>문제 정답!</>
                ) : baseLanguage === 'hi' ? (
                  <>आपने <strong>{flashcardDeck.length}</strong> में से <strong>{cardScore}</strong> सही उत्तर दिए!</>
                ) : baseLanguage === 'ar' ? (
                  <>أجبت بشكل صحيح على <strong>{cardScore}</strong> من أصل <strong>{flashcardDeck.length}</strong>!</>
                ) : baseLanguage === 'bn' ? (
                  <>আপনি <strong>{flashcardDeck.length}</strong>টির মধ্যে <strong>{cardScore}</strong>টি সঠিক উত্তর দিয়েছেন!</>
                ) : baseLanguage === 'ur' ? (
                  <>آپ نے <strong>{flashcardDeck.length}</strong> میں سے <strong>{cardScore}</strong> درست جواب دیے!</>
                ) : (
                  <>You got <strong>{cardScore}</strong> out of <strong>{flashcardDeck.length}</strong> correct!</>
                )}
              </p>
              <button
                type="button"
                className="grammar-restart-btn"
                onClick={handleRestartDeck}
              >
                <FaRedo /> {localizedLabels.restart}
              </button>
            </div>
          )}
        </div>
      )}

      {/* View 2: Gender Nouns Guide */}
      {activeTab === 'gender' && activeGrammar.genderRules && (
        <div className="gender-rules-grid">
          {activeGrammar.genderRules.map((rule: GenderNounRule) => (
            <div
              key={rule.article}
              className="gender-rule-card"
              style={{ borderTopColor: rule.color }}
            >
              <div className="gender-card-header">
                <span className="gender-article-badge" style={{ backgroundColor: rule.color }}>
                  {rule.article}
                </span>
                <h4>{rule.name}</h4>
              </div>

              <p className="gender-desc">{rule.description}</p>

              <div className="gender-rule-list">
                <h5>{localizedLabels.howToRecognize}</h5>
                <ul>
                  {rule.rules.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="gender-examples-list">
                <h5>{localizedLabels.highFrequencyExamples}</h5>
                <div className="gender-examples-grid">
                  {rule.examples.map((ex) => {
                    const hasGrammaticalArticle = ['de', 'fr', 'es', 'pt', 'en'].includes(currentLanguage);
                    const displayTarget = hasGrammaticalArticle ? `${rule.article} ${ex.word}` : ex.word;
                    return (
                      <div key={ex.word} className="gender-example-item">
                        <WordIcon
                          icon={ex.icon || '📌'}
                          word={ex.word}
                          meaning={ex.meaning}
                          size={22}
                          className="example-icon"
                        />
                        <div className="example-text-wrap">
                          <strong className="example-target" style={{ color: rule.color }}>
                            {displayTarget}
                          </strong>
                          <span className="example-meaning">{localizeGrammarMeaning(ex.meaning, baseLanguage)}</span>
                        </div>
                        <PronunciationButton
                          text={displayTarget}
                          lang={currentLanguage}
                          audioCategory="grammar"
                          className="example-mini-audio"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View 3: Verb Conjugation Tables */}
      {activeTab === 'verbs' && verbsList.length > 0 && (
        <div className="verb-matrix-container">
          {(() => {
            const notice = getVerbLanguageNotice(currentLanguage, baseLanguage);
            if (!notice) return null;
            return (
              <div className="verb-grammar-notice">
                <span className="notice-icon" aria-hidden="true">💡</span>
                <div className="notice-body">
                  <strong>{notice.title}</strong>
                  <p>{notice.text}</p>
                </div>
              </div>
            );
          })()}

          <div className="verb-selector-scroll">
            {verbsList.map((v, idx) => (
              <button
                key={v.verb}
                type="button"
                className={`verb-pill-btn ${idx === activeVerbIndex ? 'active' : ''}`}
                onClick={() => setActiveVerbIndex(idx)}
              >
                <strong>{v.verb}</strong>
                <span className="verb-pill-meaning">({localizeGrammarMeaning(v.meaning, baseLanguage)})</span>
              </button>
            ))}
          </div>

          {verbsList[activeVerbIndex] && (
            <div className="verb-detail-card">
              <div className="verb-detail-header">
                <div>
                  <h3>
                    <span className="verb-name">{verbsList[activeVerbIndex].verb}</span>
                    <span className="verb-meaning-tag">— {localizeGrammarMeaning(verbsList[activeVerbIndex].meaning, baseLanguage)}</span>
                  </h3>
                  <span className="verb-tense-badge">{verbsList[activeVerbIndex].tense}</span>
                </div>
                <PronunciationButton
                  text={verbsList[activeVerbIndex].verb}
                  lang={currentLanguage}
                  audioCategory="grammar"
                  className="verb-main-audio"
                />
              </div>

              <div className="conjugation-table">
                {verbsList[activeVerbIndex].forms.map((item) => {
                  const isNonPersonConjugated = ['zh', 'id', 'ja', 'ko'].includes(currentLanguage);
                  const cleanPronoun = item.pronoun.replace(/\s*\(.*?\)/g, '').split('/')[0].trim();
                  const [mainForm, formDesc] = item.form.split(/\s*—\s*/);
                  const cleanForm = mainForm.replace(/\s*\([^)]*\)\s*/g, '').split('/')[0].trim();
                  
                  let audioTarget = cleanForm;
                  if (!isNonPersonConjugated && cleanPronoun && (!/[a-zA-Z]/.test(cleanPronoun) || currentLanguage === 'en')) {
                    audioTarget = `${cleanPronoun} ${cleanForm}`;
                  }

                  return (
                    <div key={item.pronoun} className="conjugation-row">
                      <span className="conj-pronoun">{item.pronoun}</span>
                      <div className="conj-form-wrap">
                        <strong className="conj-form">{mainForm}</strong>
                        {formDesc && <span className="conj-form-desc">{formDesc}</span>}
                      </div>
                      <PronunciationButton
                        text={audioTarget}
                        lang={currentLanguage}
                        audioCategory="grammar"
                        className="conj-audio-btn"
                      />
                    </div>
                  );
                })}
              </div>

              {verbsList[activeVerbIndex].exampleSentence && (
                <div className="verb-example-box">
                  <div className="verb-example-header-row">
                    <span className="example-label">{localizedLabels.exampleInContext}</span>
                    <PronunciationButton
                      text={verbsList[activeVerbIndex].exampleSentence?.target || ''}
                      lang={currentLanguage}
                      className="verb-example-audio"
                    />
                  </div>
                  <p className="example-target-line">
                    «{verbsList[activeVerbIndex].exampleSentence?.target}»
                  </p>
                  <p className="example-translation-line">
                    ({verbsList[activeVerbIndex].exampleSentence?.translation})
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* View 4: Descriptions & Adjectives */}
      {activeTab === 'descriptions' && activeGrammar.descriptions && (
        <div className="descriptions-container">
          {activeGrammar.descriptions.map((desc, idx) => (
            <div key={idx} className="description-card">
              <h3>{desc.title}</h3>
              <p className="description-explanation">{desc.explanation}</p>

              <div className="comparison-table">
                <div className="comparison-header-row">
                  <span>{desc.headers?.[0] || ({
                    en: 'Base (Positive)', ru: 'Исходная форма', es: 'Positivo', fr: 'Positif', de: 'Grundform',
                    pt: 'Positivo', id: 'Bentuk Dasar', tr: 'Yalın Hal', zh: '原级', ja: '原級',
                    ko: '원급', hi: 'मूल रूप', ar: 'الصيغة الأساسية', bn: 'মূল রূপ', ur: 'مطلق صفت'
                  }[baseLanguage] || 'Base (Positive)')}</span>
                  <span>{desc.headers?.[1] || ({
                    en: 'Comparative', ru: 'Сравнительная', es: 'Comparativo', fr: 'Comparatif', de: 'Komparativ',
                    pt: 'Comparativo', id: 'Komparatif', tr: 'Karşılaştırma', zh: '比较级', ja: '比較級',
                    ko: '비교급', hi: 'उत्तरावस्था', ar: 'المقارنة', bn: 'তরতম্য', ur: 'تفصیلِ بعض'
                  }[baseLanguage] || 'Comparative')}</span>
                  <span>{desc.headers?.[2] || ({
                    en: 'Superlative', ru: 'Превосходная', es: 'Superlativo', fr: 'Superlatif', de: 'Superlativ',
                    pt: 'Superlativo', id: 'Superlatif', tr: 'Üstünlük', zh: '最高级', ja: '最上級',
                    ko: '최상급', hi: 'उत्तमावस्था', ar: 'التفضيل', bn: 'অতিশায়ন', ur: 'تفصیلِ کل'
                  }[baseLanguage] || 'Superlative')}</span>
                  <span>{desc.headers?.[3] || ({
                    en: 'Meaning', ru: 'Значение', es: 'Significado', fr: 'Sens', de: 'Bedeutung',
                    pt: 'Significado', id: 'Arti', tr: 'Anlam', zh: '释义', ja: '意味',
                    ko: '의미', hi: 'अर्थ', ar: 'المعنى', bn: 'অর্থ', ur: 'معنی'
                  }[baseLanguage] || 'Meaning')}</span>
                </div>
                {desc.examples.map((item, rowIdx) => {
                  const spokenPos = getSpokenGrammarWord(item.positive, currentLanguage);
                  const spokenComp = getSpokenGrammarWord(item.comparative, currentLanguage);
                  const spokenSuper = getSpokenGrammarWord(item.superlative, currentLanguage);

                  return (
                    <div key={rowIdx} className="comparison-data-row">
                      <div className="comp-cell comp-positive">
                        <span className="comp-text">{item.positive}</span>
                        {spokenPos && (
                          <PronunciationButton
                            text={spokenPos}
                            lang={currentLanguage}
                            audioCategory="grammar"
                            className="comp-mini-audio"
                            label={`Pronounce ${spokenPos}`}
                          />
                        )}
                      </div>
                      <div className="comp-cell comp-comparative">
                        <span className="comp-text">{item.comparative}</span>
                        {spokenComp && (
                          <PronunciationButton
                            text={spokenComp}
                            lang={currentLanguage}
                            audioCategory="grammar"
                            className="comp-mini-audio"
                            label={`Pronounce ${spokenComp}`}
                          />
                        )}
                      </div>
                      <div className="comp-cell comp-superlative">
                        <span className="comp-text">{item.superlative}</span>
                        {spokenSuper && (
                          <PronunciationButton
                            text={spokenSuper}
                            lang={currentLanguage}
                            audioCategory="grammar"
                            className="comp-mini-audio"
                            label={`Pronounce ${spokenSuper}`}
                          />
                        )}
                      </div>
                      <span className="comp-meaning">{localizeGrammarMeaning(item.meaning, baseLanguage)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Grammar;

