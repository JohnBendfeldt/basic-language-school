import React from 'react';
import { SupportedLanguageId } from '../data/languages/types';
import { ABOUT_LANGUAGES, LanguageProfile } from '../data/languages/aboutLanguageData';
import PronunciationButton from './PronunciationButton';
import { FaHistory, FaLightbulb, FaBookOpen, FaGlobeAmericas, FaArrowRight } from 'react-icons/fa';

interface LanguageAboutProps {
  currentLanguage: SupportedLanguageId;
  baseLanguage: SupportedLanguageId;
}

interface AboutChromeCopy {
  originsBadge: string;
  speakers: string;
  scriptSystem: string;
  family: string;
  quickFacts: string;
  historyHeading: string;
  secretsHeading: string;
  exampleTag: string;
  culturalReflection: string;
}

const ABOUT_CHROME_MAP: Record<SupportedLanguageId, AboutChromeCopy> = {
  en: {
    originsBadge: 'Language Origins & Story',
    speakers: 'Speakers',
    scriptSystem: 'Script System',
    family: 'Family',
    quickFacts: 'Quick Facts & Linguistic Profile',
    historyHeading: 'Historical Milestones & Evolution',
    secretsHeading: 'Linguistic Secrets & Superpowers',
    exampleTag: 'Example:',
    culturalReflection: 'Cultural Reflection:',
  },
  es: {
    originsBadge: 'Orígenes e historia del idioma',
    speakers: 'Hablantes',
    scriptSystem: 'Sistema de escritura',
    family: 'Familia lingüística',
    quickFacts: 'Datos clave y perfil lingüístico',
    historyHeading: 'Hitos históricos y evolución',
    secretsHeading: 'Rasgos únicos del idioma',
    exampleTag: 'Ejemplo:',
    culturalReflection: 'Reflexión cultural:',
  },
  fr: {
    originsBadge: 'Origines et histoire de la langue',
    speakers: 'Locuteurs',
    scriptSystem: 'Système d’écriture',
    family: 'Famille linguistique',
    quickFacts: 'Faits clés et profil linguistique',
    historyHeading: 'Repères historiques et évolution',
    secretsHeading: 'Particularités linguistiques',
    exampleTag: 'Exemple :',
    culturalReflection: 'Note culturelle :',
  },
  ru: {
    originsBadge: 'Происхождение и история языка',
    speakers: 'Носители',
    scriptSystem: 'Письменность',
    family: 'Языковая семья',
    quickFacts: 'Главные факты и профиль языка',
    historyHeading: 'Исторические вехи и развитие',
    secretsHeading: 'Лингвистические особенности',
    exampleTag: 'Пример:',
    culturalReflection: 'Культурная заметка:',
  },
  pt: {
    originsBadge: 'Origens e história do idioma',
    speakers: 'Falantes',
    scriptSystem: 'Sistema de escrita',
    family: 'Família linguística',
    quickFacts: 'Fatos rápidos e perfil linguístico',
    historyHeading: 'Marcos históricos e evolução',
    secretsHeading: 'Segredos e traços linguísticos',
    exampleTag: 'Exemplo:',
    culturalReflection: 'Reflexão cultural:',
  },
  de: {
    originsBadge: 'Ursprung & Geschichte der Sprache',
    speakers: 'Sprecher',
    scriptSystem: 'Schriftsystem',
    family: 'Sprachfamilie',
    quickFacts: 'Kurzprofil & Fakten',
    historyHeading: 'Historische Meilensteine & Entwicklung',
    secretsHeading: 'Sprachliche Besonderheiten',
    exampleTag: 'Beispiel:',
    culturalReflection: 'Kultureller Einblick:',
  },
  id: {
    originsBadge: 'Asal-Usul & Kisah Bahasa',
    speakers: 'Penutur',
    scriptSystem: 'Sistem Aksara',
    family: 'Rumpun Bahasa',
    quickFacts: 'Fakta Singkat & Profil Linguistik',
    historyHeading: 'Tonggak Sejarah & Evolusi',
    secretsHeading: 'Ciri Khas Bahasa',
    exampleTag: 'Contoh:',
    culturalReflection: 'Catatan Budaya:',
  },
  tr: {
    originsBadge: 'Dilin Kökeni ve Hikâyesi',
    speakers: 'Konuşanlar',
    scriptSystem: 'Yazı Sistemi',
    family: 'Dil Ailesi',
    quickFacts: 'Kısa Bilgiler ve Dil Profili',
    historyHeading: 'Tarihsel Dönüm Noktaları',
    secretsHeading: 'Dilbilimsel Özellikler',
    exampleTag: 'Örnek:',
    culturalReflection: 'Kültürel Not:',
  },
  zh: {
    originsBadge: '语言起源与历史故事',
    speakers: '使用人数',
    scriptSystem: '书写系统',
    family: '所属语系',
    quickFacts: '核心概况与语言档案',
    historyHeading: '历史里程碑与演变',
    secretsHeading: '语言特色与独特魅力',
    exampleTag: '示例：',
    culturalReflection: '文化印记：',
  },
  ja: {
    originsBadge: '言語の起源と物語',
    speakers: '話者数',
    scriptSystem: '文字体系',
    family: '語族',
    quickFacts: '基本データと言語プロフィール',
    historyHeading: '歴史の節目と発展',
    secretsHeading: '言語の特徴と魅力',
    exampleTag: '例：',
    culturalReflection: '文化的背景：',
  },
  ko: {
    originsBadge: '언어의 기원과 이야기',
    speakers: '사용자 수',
    scriptSystem: '문자 체계',
    family: '어족',
    quickFacts: '핵심 정보 및 언어 프로필',
    historyHeading: '역사적 이정표와 발전',
    secretsHeading: '언어적 특징과 매력',
    exampleTag: '예시:',
    culturalReflection: '문화적 의미:',
  },
  hi: {
    originsBadge: 'भाषा की उत्पत्ति और कहानी',
    speakers: 'वक्ता',
    scriptSystem: 'लिपि प्रणाली',
    family: 'भाषा परिवार',
    quickFacts: 'प्रमुख तथ्य और भाषाई परिचय',
    historyHeading: 'ऐतिहासिक पड़ाव और विकास',
    secretsHeading: 'भाषाई विशेषताएँ',
    exampleTag: 'उदाहरण:',
    culturalReflection: 'सांस्कृतिक झलक:',
  },
  ar: {
    originsBadge: 'أصول اللغة وقصتها',
    speakers: 'المتحدثون',
    scriptSystem: 'نظام الكتابة',
    family: 'العائلة اللغوية',
    quickFacts: 'حقائق سريعة والملف اللغوي',
    historyHeading: 'محطات تاريخية وتطور اللغة',
    secretsHeading: 'أسرار ومميزات اللغة',
    exampleTag: 'مثال:',
    culturalReflection: 'لمحة ثقافية:',
  },
  bn: {
    originsBadge: 'ভাষার উৎপত্তি ও ইতিহাস',
    speakers: 'ভাষাভাষী',
    scriptSystem: 'লিখন পদ্ধতি',
    family: 'ভাষা পরিবার',
    quickFacts: 'সংক্ষিপ্ত তথ্য ও ভাষাগত পরিচয়',
    historyHeading: 'ঐতিহাসিক মাইলফলক ও বিবর্তন',
    secretsHeading: 'ভাষাগত বৈশিষ্ট্য ও অনন্যতা',
    exampleTag: 'উদাহরণ:',
    culturalReflection: 'সাংস্কৃতিক প্রতিফলন:',
  },
  ur: {
    originsBadge: 'زبان کی ابتدا اور تاریخ',
    speakers: 'بولنے والے',
    scriptSystem: 'رسم الخط',
    family: 'لسانی خاندان',
    quickFacts: 'اہم حقائق اور لسانی خاکہ',
    historyHeading: 'تاریخی سنگِ میل اور ارتقا',
    secretsHeading: 'لسانی خصوصیات اور انفرادیت',
    exampleTag: 'مثال:',
    culturalReflection: 'ثقافتی جھلک:',
  },
};

export const LanguageAbout: React.FC<LanguageAboutProps> = ({ currentLanguage, baseLanguage }) => {
  const profile: LanguageProfile = ABOUT_LANGUAGES[currentLanguage] || ABOUT_LANGUAGES.en;
  const copy = ABOUT_CHROME_MAP[baseLanguage] || ABOUT_CHROME_MAP.en;

  return (
    <div className="language-about-container">
      {/* Hero Banner */}
      <div className="about-hero-card">
        <div className="about-hero-badge">
          <FaGlobeAmericas className="hero-badge-icon" /> {copy.originsBadge}
        </div>
        <h2 className="about-hero-title">{profile.title}</h2>
        <p className="about-hero-native">{profile.nativeName}</p>
        <p className="about-hero-tagline">{profile.tagline}</p>

        {/* Core Identity Pills */}
        <div className="about-hero-meta-row">
          <div className="hero-meta-pill">
            <span className="meta-pill-label">{copy.speakers}</span>
            <span className="meta-pill-val">{profile.speakersCount}</span>
          </div>
          <div className="hero-meta-pill">
            <span className="meta-pill-label">{copy.scriptSystem}</span>
            <span className="meta-pill-val">{profile.writingSystem}</span>
          </div>
          <div className="hero-meta-pill">
            <span className="meta-pill-label">{copy.family}</span>
            <span className="meta-pill-val">{profile.languageFamily}</span>
          </div>
        </div>
      </div>

      {/* Quick Facts Grid */}
      <div className="about-section-wrap">
        <h3 className="about-section-heading">
          <FaLightbulb className="heading-icon" /> {copy.quickFacts}
        </h3>
        <div className="about-facts-grid">
          {profile.facts.map((fact, idx) => (
            <div key={idx} className="about-fact-card">
              <span className="fact-icon" aria-hidden="true">{fact.icon || '📌'}</span>
              <div className="fact-content">
                <span className="fact-label">{fact.label}</span>
                <span className="fact-value">{fact.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Traditional vs Simplified Script Comparison (Mandarin Exclusive) */}
      {profile.scriptComparison && profile.scriptComparison.length > 0 && (
        <div className="about-section-wrap script-evolution-wrap">
          <div className="script-evolution-header">
            <span className="script-badge">1950s Literacy Revolution</span>
            <h3 className="about-section-heading">
              <FaBookOpen className="heading-icon" /> Traditional vs. Simplified Characters (繁简对比)
            </h3>
            <p className="script-evolution-desc">
              In 1949, over 80% of China’s population could not read or write because Traditional characters averaged 15 to 30 strokes each. In 1956, the government systematically streamlined characters into Simplified forms to bring universal literacy to working people:
            </p>
          </div>

          <div className="script-comparison-grid">
            {profile.scriptComparison.map((item, idx) => (
              <div key={idx} className="script-compare-card">
                <div className="compare-top-row">
                  {/* Traditional */}
                  <div className="compare-character-side traditional">
                    <span className="char-badge">Traditional (繁体)</span>
                    <span className="compare-char">{item.traditional}</span>
                    <span className="stroke-pill">{item.traditionalStrokes} strokes</span>
                  </div>

                  {/* Transition Arrow */}
                  <div className="compare-arrow-wrap">
                    <FaArrowRight className="compare-arrow" />
                    <span className="reduced-badge">
                      -{item.traditionalStrokes - item.simplifiedStrokes} strokes
                    </span>
                  </div>

                  {/* Simplified */}
                  <div className="compare-character-side simplified">
                    <span className="char-badge active">Simplified (简体)</span>
                    <span className="compare-char">{item.simplified}</span>
                    <span className="stroke-pill success">{item.simplifiedStrokes} strokes</span>
                  </div>
                </div>

                <div className="compare-bottom-info">
                  <div className="compare-sound-row">
                    <strong className="compare-pinyin">{item.pinyin}</strong>
                    <span className="compare-meaning">"{item.meaning}"</span>
                    <PronunciationButton
                      text={item.simplified}
                      lang="zh"
                      audioCategory="words"
                      useLocalAudio={true}
                      label={`Listen to ${item.simplified} (${item.pinyin})`}
                      className="compare-audio-btn"
                    />
                  </div>
                  <p className="compare-reason">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Historical Milestones Timeline */}
      <div className="about-section-wrap">
        <h3 className="about-section-heading">
          <FaHistory className="heading-icon" /> {copy.historyHeading}
        </h3>
        <div className="about-timeline">
          {profile.historyTimeline.map((milestone, idx) => (
            <div key={idx} className="timeline-node">
              <div className="timeline-marker-col">
                <div className="timeline-circle" />
                {idx < profile.historyTimeline.length - 1 && <div className="timeline-stem" />}
              </div>
              <div className="timeline-card">
                <div className="timeline-header-row">
                  <span className="timeline-era-badge">{milestone.era}</span>
                  {milestone.highlight && (
                    <span className="timeline-highlight-pill">{milestone.highlight}</span>
                  )}
                </div>
                <h4 className="timeline-milestone-title">{milestone.title}</h4>
                <p className="timeline-milestone-desc">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Linguistic Traits & Superpowers */}
      <div className="about-section-wrap">
        <h3 className="about-section-heading">
          <FaLightbulb className="heading-icon" /> {copy.secretsHeading}
        </h3>
        <div className="about-traits-grid">
          {profile.linguisticTraits.map((trait, idx) => (
            <div key={idx} className="about-trait-card">
              <div className="trait-top">
                <span className="trait-icon">{trait.icon || '✨'}</span>
                <h4 className="trait-title">{trait.title}</h4>
              </div>
              <p className="trait-desc">{trait.description}</p>
              {trait.example && (
                <div className="trait-example-box">
                  <span className="example-tag">{copy.exampleTag}</span>
                  <span className="example-text">{trait.example}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Note Banner */}
      {profile.culturalNote && (
        <div className="about-cultural-banner">
          <span className="cultural-icon">🌺</span>
          <div className="cultural-text">
            <strong>{copy.culturalReflection}</strong> {profile.culturalNote}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageAbout;
