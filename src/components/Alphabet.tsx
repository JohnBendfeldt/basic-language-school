import React, { useState } from 'react';
import PronunciationButton from './PronunciationButton';
import Grammar from './Grammar';
import WordIcon from './WordIcon';
import PinyinGuide from './PinyinGuide';
import LanguageAbout from './LanguageAbout';
import { AlphabetItem } from '../types/index';
import { useLanguage } from '../contexts/LanguageContext';
import { getPageContent, getAlphabetLabels } from '../utils/pageDictionary';
import { resolveTranslation } from '../utils/translationResolver';

const CHINESE_INITIALS = new Set([
  'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's'
]);

interface AlphabetProps {
  data: AlphabetItem[];
  initialSubTab?: 'alphabet' | 'grammar' | 'about';
  grammarInitialTab?: 'flashcards' | 'gender' | 'verbs' | 'descriptions';
}

const Alphabet: React.FC<AlphabetProps> = ({
  data,
  initialSubTab = 'alphabet',
  grammarInitialTab = 'flashcards'
}) => {
  const { currentLanguage, baseLanguage, currentMeta, ui } = useLanguage();
  const [activeView, setActiveView] = useState<'alphabet' | 'grammar' | 'about'>(initialSubTab);
  const [zhFilter, setZhFilter] = useState<'all' | 'initials' | 'finals'>('all');

  React.useEffect(() => {
    if (initialSubTab) {
      setActiveView(initialSubTab);
    }
  }, [initialSubTab]);

  const displayItems = React.useMemo(() => {
    if (currentLanguage !== 'zh' || zhFilter === 'all') return data;
    if (zhFilter === 'initials') {
      return data.filter(item => CHINESE_INITIALS.has(item.letter));
    }
    return data.filter(item => !CHINESE_INITIALS.has(item.letter));
  }, [data, currentLanguage, zhFilter]);
  const pageContent = getPageContent('alphabet', currentLanguage, baseLanguage);
  const labels = getAlphabetLabels(baseLanguage);

  // Distinct writing system titles and subtitles
  let defaultEnTitle = `${currentMeta.name} Alphabet`;
  let defaultEnSubtitle = `${data.length} letters with pronunciation guides, example vocabulary, and native studio audio`;

  if (currentLanguage === 'ru') {
    defaultEnTitle = 'Russian Alphabet (Cyrillic)';
    defaultEnSubtitle = '33 letters with pronunciation guides, example words, and studio neural audio';
  } else if (currentLanguage === 'zh') {
    defaultEnTitle = 'Mandarin Chinese Pinyin & Sounds (拼音)';
    defaultEnSubtitle = '29 core Pinyin sounds (initials & finals) with pronunciation guides, example Hanzi (汉字), and native studio audio';
  } else if (currentLanguage === 'ja') {
    defaultEnTitle = 'Japanese Hiragana & Sounds (ひらがな)';
    defaultEnSubtitle = '46 Hiragana characters with pronunciation guides, example words, and native studio audio';
  } else if (currentLanguage === 'ko') {
    defaultEnTitle = 'Korean Hangul & Sounds (한글)';
    defaultEnSubtitle = '24 core Hangul letters (consonants & vowels) with pronunciation guides, example words, and native studio audio';
  } else if (currentLanguage === 'hi') {
    defaultEnTitle = 'Hindi Varnamala & Sounds (वर्णमाला)';
    defaultEnSubtitle = '46 Devanagari letters with pronunciation guides, example words, and native studio audio';
  } else if (currentLanguage === 'ar') {
    defaultEnTitle = 'Arabic Alphabet & Sounds (الحروف العربية)';
    defaultEnSubtitle = '28 Arabic letters with pronunciation guides, example words, and native studio audio';
  }

  const headerTitle = baseLanguage === 'en' ? defaultEnTitle : pageContent.title;
  const headerSubtitle = baseLanguage === 'en' ? defaultEnSubtitle : pageContent.subtitle;

  const grammarMainLabel = ui?.grammar || (
    baseLanguage === 'de' ? 'Grammatik'
    : baseLanguage === 'es' ? 'Gramática'
    : baseLanguage === 'fr' ? 'Grammaire'
    : baseLanguage === 'ru' ? 'Грамматика'
    : baseLanguage === 'pt' ? 'Gramática'
    : baseLanguage === 'tr' ? 'Dilbilgisi'
    : baseLanguage === 'id' ? 'Tata Bahasa'
    : baseLanguage === 'zh' ? '语法'
    : baseLanguage === 'ja' ? '文法'
    : baseLanguage === 'ko' ? '문법'
    : baseLanguage === 'hi' ? 'व्याकरण'
    : baseLanguage === 'ar' ? 'القواعد'
    : baseLanguage === 'bn' ? 'ব্যাকরণ'
    : baseLanguage === 'ur' ? 'قواعد'
    : 'Grammar'
  );

  const grammarSuffix = baseLanguage === 'de' ? ' & Karteikarten'
    : baseLanguage === 'es' ? ' y Tarjetas'
    : baseLanguage === 'fr' ? ' et Cartes'
    : baseLanguage === 'ru' ? ' и карточки'
    : baseLanguage === 'pt' ? ' e Cartões'
    : baseLanguage === 'tr' ? ' ve Kartlar'
    : baseLanguage === 'id' ? ' & Kartu'
    : baseLanguage === 'zh' ? '与闪卡'
    : baseLanguage === 'ja' ? '・暗記カード'
    : baseLanguage === 'ko' ? ' 및 카드'
    : baseLanguage === 'hi' ? ' और फ़्लैशकार्ड'
    : baseLanguage === 'ar' ? ' والبطاقات'
    : baseLanguage === 'bn' ? ' ও ফ্ল্যাশকার্ড'
    : baseLanguage === 'ur' ? ' اور کارڈز'
    : ' & Flashcards';

  const alphabetMainLabel = ui?.alphabet || (
    baseLanguage === 'de' ? 'Alphabet'
    : baseLanguage === 'es' ? 'Alfabeto'
    : baseLanguage === 'fr' ? 'Alphabet'
    : baseLanguage === 'ru' ? 'Алфавит'
    : baseLanguage === 'pt' ? 'Alfabeto'
    : baseLanguage === 'tr' ? 'Alfabe'
    : baseLanguage === 'id' ? 'Alfabet'
    : baseLanguage === 'zh' ? '字母'
    : baseLanguage === 'ja' ? '文字'
    : baseLanguage === 'ko' ? '문자'
    : baseLanguage === 'hi' ? 'वर्णमाला'
    : baseLanguage === 'ar' ? 'الأبجدية'
    : baseLanguage === 'bn' ? 'বর্ণমালা'
    : baseLanguage === 'ur' ? 'حروف تہجی'
    : 'Alphabet'
  );

  const alphabetSuffix = baseLanguage === 'de' ? ' & Laute'
    : baseLanguage === 'es' ? ' y Sonidos'
    : baseLanguage === 'fr' ? ' et Sons'
    : baseLanguage === 'ru' ? ' и звуки'
    : baseLanguage === 'pt' ? ' e Sons'
    : baseLanguage === 'tr' ? ' ve Sesler'
    : baseLanguage === 'id' ? ' & Bunyi'
    : baseLanguage === 'zh' ? '与发音'
    : baseLanguage === 'ja' ? 'と発音'
    : baseLanguage === 'ko' ? ' 및 발음'
    : baseLanguage === 'hi' ? ' और ध्वनियाँ'
    : baseLanguage === 'ar' ? ' والأصوات'
    : baseLanguage === 'bn' ? ' ও ধ্বনি'
    : baseLanguage === 'ur' ? ' اور آوازیں'
    : ' & Sounds';

  const aboutMainLabel = (
    baseLanguage === 'de' ? 'Über die Sprache'
    : baseLanguage === 'es' ? 'Sobre el idioma'
    : baseLanguage === 'fr' ? 'À propos'
    : baseLanguage === 'ru' ? 'О языке'
    : baseLanguage === 'pt' ? 'Sobre o idioma'
    : baseLanguage === 'tr' ? 'Dil Hakkında'
    : baseLanguage === 'id' ? 'Tentang Bahasa'
    : baseLanguage === 'zh' ? '语言故事'
    : baseLanguage === 'ja' ? '言語の起源'
    : baseLanguage === 'ko' ? '언어 기원'
    : baseLanguage === 'hi' ? 'भाषा परिचय'
    : baseLanguage === 'ar' ? 'حول اللغة'
    : baseLanguage === 'bn' ? 'ভাষার পরিচিতি'
    : baseLanguage === 'ur' ? 'زبان کا تعارف'
    : 'About & Origins'
  );

  const aboutSuffix = (
    baseLanguage === 'de' ? ' & Geschichte'
    : baseLanguage === 'es' ? ' e Historia'
    : baseLanguage === 'fr' ? ' et Histoire'
    : baseLanguage === 'ru' ? ' и история'
    : baseLanguage === 'pt' ? ' e História'
    : baseLanguage === 'tr' ? ' ve Tarihçe'
    : baseLanguage === 'id' ? ' & Sejarah'
    : baseLanguage === 'zh' ? '与历史'
    : baseLanguage === 'ja' ? 'と歴史'
    : baseLanguage === 'ko' ? ' 및 역사'
    : baseLanguage === 'hi' ? ' और इतिहास'
    : baseLanguage === 'ar' ? ' والتاريخ'
    : baseLanguage === 'bn' ? ' ও ইতিহাস'
    : baseLanguage === 'ur' ? ' اور تاریخ'
    : ' & History'
  );

  const zhFilterLabels = (() => {
    const map: Record<string, { all: string; initials: string; finals: string; teaser: string; readStory: string }> = {
      en: {
        all: 'All Sounds',
        initials: 'Initials · 声母',
        finals: 'Finals · 韵母',
        teaser: 'Curious how Chinese writing evolved from ancient oracle bones to Simplified characters & Pinyin in the 1950s?',
        readStory: 'Read the Story ➜'
      },
      es: {
        all: 'Todos los sonidos',
        initials: 'Iniciales · 声母',
        finals: 'Finales · 韵母',
        teaser: '¿Te preguntas cómo evolucionó la escritura china desde los huesos oraculares hasta los caracteres simplificados y el Pinyin?',
        readStory: 'Leer la historia ➜'
      },
      fr: {
        all: 'Tous les sons',
        initials: 'Initiales · 声母',
        finals: 'Finales · 韵母',
        teaser: 'Découvrez comment l’écriture chinoise a évolué des os oraculaires aux caractères simplifiés et au Pinyin.',
        readStory: 'Lire l’histoire ➜'
      },
      ru: {
        all: 'Все звуки',
        initials: 'Инициали · 声母',
        finals: 'Финали · 韵母',
        teaser: 'Узнайте, как китайская письменность прошла путь от гадательных костей до упрощённых иероглифов и пиньиня.',
        readStory: 'Читать историю ➜'
      },
      pt: {
        all: 'Todos os sons',
        initials: 'Iniciais · 声母',
        finals: 'Finais · 韵母',
        teaser: 'Veja como a escrita chinesa evoluiu dos ossos oraculares aos caracteres simplificados e ao Pinyin.',
        readStory: 'Ler a história ➜'
      },
      de: {
        all: 'Alle Laute',
        initials: 'Anlaute · 声母',
        finals: 'Auslaute · 韵母',
        teaser: 'Erfahre, wie sich die chinesische Schrift von Orakelknochen zu Kurzzeichen und Pinyin entwickelte.',
        readStory: 'Geschichte lesen ➜'
      },
      id: {
        all: 'Semua Bunyi',
        initials: 'Awalan · 声母',
        finals: 'Akhiran · 韵母',
        teaser: 'Penasaran bagaimana tulisan Mandarin berkembang dari tulang ramalan hingga aksara sederhana & Pinyin?',
        readStory: 'Baca Kisahnya ➜'
      },
      tr: {
        all: 'Tüm Sesler',
        initials: 'Önsesler · 声母',
        finals: 'Sonsesler · 韵母',
        teaser: 'Çin yazısının fal kemiklerinden Basitleştirilmiş karakterlere ve Pinyin’e nasıl evrildiğini keşfedin.',
        readStory: 'Hikâyeyi Oku ➜'
      },
      zh: {
        all: '全部发音',
        initials: '声母',
        finals: '韵母',
        teaser: '想了解汉字如何从甲骨文演变为现代简体字与汉语拼音吗？',
        readStory: '阅读历史故事 ➜'
      },
      ja: {
        all: 'すべての音',
        initials: '声母（子音）',
        finals: '韻母（母音）',
        teaser: '甲骨文字から簡体字とピンインへ進化した中国語文字の歴史を見てみましょう。',
        readStory: '歴史を読む ➜'
      },
      ko: {
        all: '모든 발음',
        initials: '성모 · 声母',
        finals: '운모 · 韵母',
        teaser: '갑골문에서 간체자와 한어병음으로 발전한 중국 문자의 역사가 궁금하신가요?',
        readStory: '이야기 읽기 ➜'
      },
      hi: {
        all: 'सभी ध्वनियाँ',
        initials: 'आरंभिक · 声母',
        finals: 'अंतिम · 韵母',
        teaser: 'जानें कि चीनी लिपि प्राचीन हड्डियों से सरलीकृत अक्षरों और पिनयिन तक कैसे विकसित हुई।',
        readStory: 'कहानी पढ़ें ➜'
      },
      ar: {
        all: 'جميع الأصوات',
        initials: 'البدايات · 声母',
        finals: 'النهايات · 韵母',
        teaser: 'تعرّف على تطور الكتابة الصينية من نقوش العظام القديمة إلى المقاطع المبسطة ونظام البينيين.',
        readStory: 'اقرأ القصة ➜'
      },
      bn: {
        all: 'সব ধ্বনি',
        initials: 'প্রারম্ভিক · 声母',
        finals: 'সমাপ্তি · 韵母',
        teaser: 'প্রাচীন লিপি থেকে সরলীকৃত চীনা অক্ষর ও পিনইনে বিবর্তনের ইতিহাস জানুন।',
        readStory: 'ইতিহাস পড়ুন ➜'
      },
      ur: {
        all: 'تمام آوازیں',
        initials: 'ابتدائی آوازیں · 声母',
        finals: 'اختتامی آوازیں · 韵母',
        teaser: 'جانیے کہ چینی رسم الخط قدیم نقوش سے سادہ حروف اور پِن یِن تک کیسے پہنچا۔',
        readStory: 'کہانی پڑھیں ➜'
      }
    };
    return map[baseLanguage] || map.en;
  })();

  const alphabetTabLabel = `${alphabetMainLabel}${alphabetSuffix}`;
  const grammarTabLabel = `${grammarMainLabel}${grammarSuffix}`;
  const aboutTabLabel = `${aboutMainLabel}${aboutSuffix}`;

  return (
    <div className="section alphabet-section">
      {/* Segmented Control: Alphabet vs Grammar vs About */}
      <div className="section-segmented-control" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeView === 'alphabet'}
          aria-label={alphabetTabLabel}
          className={`segmented-tab-btn ${activeView === 'alphabet' ? 'active' : ''}`}
          onClick={() => setActiveView('alphabet')}
        >
          <span className="tab-icon">🔤</span>
          <span className="tab-label-text">
            <span className="tab-label-main">{alphabetMainLabel}</span>
            <span className="tab-label-extra">{alphabetSuffix}</span>
          </span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeView === 'grammar'}
          aria-label={grammarTabLabel}
          className={`segmented-tab-btn ${activeView === 'grammar' ? 'active' : ''}`}
          onClick={() => setActiveView('grammar')}
        >
          <span className="tab-icon">📖</span>
          <span className="tab-label-text">
            <span className="tab-label-main">{grammarMainLabel}</span>
            <span className="tab-label-extra">{grammarSuffix}</span>
          </span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeView === 'about'}
          aria-label={aboutTabLabel}
          className={`segmented-tab-btn ${activeView === 'about' ? 'active' : ''}`}
          onClick={() => setActiveView('about')}
        >
          <span className="tab-icon">🌏</span>
          <span className="tab-label-text">
            <span className="tab-label-main">{aboutMainLabel}</span>
            <span className="tab-label-extra">{aboutSuffix}</span>
          </span>
        </button>
      </div>

      {activeView === 'grammar' ? (
        <Grammar initialTab={grammarInitialTab} />
      ) : activeView === 'about' ? (
        <LanguageAbout currentLanguage={currentLanguage} baseLanguage={baseLanguage} />
      ) : (
        <>
          <div className="alphabet-header">
            <h2>{headerTitle}</h2>
            <p className="section-subtitle">
              {headerSubtitle}
            </p>
          </div>

          {currentLanguage === 'zh' && (
            <div
              className="chinese-about-teaser"
              onClick={() => setActiveView('about')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveView('about'); }}
              aria-label="Learn about the history of Chinese writing and Pinyin"
            >
              <div className="teaser-content">
                <span className="teaser-icon">📜</span>
                <span className="teaser-text">
                  {zhFilterLabels.teaser}
                </span>
              </div>
              <span className="teaser-link">{zhFilterLabels.readStory}</span>
            </div>
          )}

          {currentLanguage === 'zh' && (
            <PinyinGuide baseLanguage={baseLanguage} />
          )}

          {currentLanguage === 'zh' && (
            <div className="zh-alphabet-filter-bar" role="group" aria-label="Pinyin sound filters">
              <button
                type="button"
                className={`zh-filter-chip ${zhFilter === 'all' ? 'active' : ''}`}
                onClick={() => setZhFilter('all')}
              >
                {zhFilterLabels.all} ({data.length})
              </button>
              <button
                type="button"
                className={`zh-filter-chip ${zhFilter === 'initials' ? 'active' : ''}`}
                onClick={() => setZhFilter('initials')}
              >
                {zhFilterLabels.initials} ({data.filter(i => CHINESE_INITIALS.has(i.letter)).length})
              </button>
              <button
                type="button"
                className={`zh-filter-chip ${zhFilter === 'finals' ? 'active' : ''}`}
                onClick={() => setZhFilter('finals')}
              >
                {zhFilterLabels.finals} ({data.filter(i => !CHINESE_INITIALS.has(i.letter)).length})
              </button>
            </div>
          )}

          <div className="alphabet-container">
            {displayItems.map((item, index) => {
              const exampleWord = item.russianWord || item.word;

              // Resolve translation in the learner's base language
              let exampleMeaning = '';
              if (baseLanguage === 'en' && currentLanguage === 'en') {
                exampleMeaning = item.meaning || '';
              } else {
                exampleMeaning = resolveTranslation(item, currentLanguage, baseLanguage);
              }

              // Format phonetic example phrase with localized "as in" (e.g. "as in", "comme dans", "como en", "как в", "como em", "wie in", "seperti di", "gibi")
              let localizedExamplePhrase = '';
              if (item.examplesByLang && item.examplesByLang[baseLanguage]) {
                const custom = item.examplesByLang[baseLanguage]!;
                localizedExamplePhrase = custom.startsWith(labels.asIn) || /^(как|мягк|твёрд|звук|comme|wie|como|seperti)/i.test(custom)
                  ? custom
                  : `${labels.asIn} ${custom}`;
              } else if (item.example) {
                localizedExamplePhrase = item.example.replace(/^(as in|comme dans|como en|как в|como em|wie in|seperti di)\s*/i, `${labels.asIn} `);
              }

              const lowerLetter = currentLanguage === 'tr'
                ? item.letter.replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase()
                : item.letter.toLowerCase();

              const isCasedScript = ['en', 'es', 'fr', 'de', 'pt', 'id', 'tr', 'ru'].includes(currentLanguage);

              return (
                <div className="alphabet-card" key={index}>
                  <div className="letter-container">
                    {currentLanguage === 'zh' && (
                      <span className="pinyin-badge">拼音 Pinyin</span>
                    )}
                    <div className="letter-header">
                      <div className="letter-pair">
                        {isCasedScript ? (
                          <>
                            <span className="letter-uppercase">{item.letter}</span>
                            <span className="letter-lowercase">{lowerLetter}</span>
                          </>
                        ) : (
                          <span className="letter-single">{item.letter}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="letter-underline"></div>
                    
                    <div className="pronunciation-button-wrapper">
                      <PronunciationButton 
                        text={lowerLetter} 
                        audioCategory="alphabet"
                        useLocalAudio={true}
                        label={`Pronounce letter ${item.letter}`}
                      />
                    </div>
                  </div>
                  
                  <div className="pronunciation">
                    <strong>{labels.sound}</strong> <span className="pronunciation-text">{item.pronunciation} {localizedExamplePhrase}</span>
                  </div>
                  
                  {exampleWord && (
                    <div className="example">
                      {item.icon && (
                        <span className="example-icon-badge" aria-hidden="true">
                          <WordIcon icon={item.icon} word={exampleWord} meaning={exampleMeaning} size={22} />
                        </span>
                      )}
                      <div className="example-details">
                        <div className="example-word-row">
                          <span className="example-word-text">
                            <strong className="example-label">{labels.example}</strong>{' '}
                            <span className="example-word">{exampleWord}</span>{' '}
                            {item.wordPronunciation && (
                              <span className="example-word-pronunciation" title="Pronunciation">
                                ({item.wordPronunciation})
                              </span>
                            )}
                          </span>
                          <PronunciationButton 
                            text={exampleWord} 
                            className="example-pronunciation"
                            audioCategory="examples"
                            useLocalAudio={true}
                            label={`Pronounce ${exampleWord}`}
                          />
                        </div>
                        {exampleMeaning && (
                          <div className="example-meaning-row">
                            <span className="example-translation">({exampleMeaning})</span>
                            {baseLanguage !== currentLanguage && (
                              <PronunciationButton 
                                text={exampleMeaning}
                                lang={baseLanguage}
                                className="example-pronunciation mini"
                                useLocalAudio={true}
                                audioCategory="words"
                                label={`Listen to ${exampleMeaning}`}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Alphabet;
