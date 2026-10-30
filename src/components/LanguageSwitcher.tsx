import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaCheck, FaGlobe, FaStar, FaExchangeAlt, FaTimes } from 'react-icons/fa';
import { useLanguage, ROADMAP_MOST_SPOKEN_LANGUAGES } from '../contexts/LanguageContext';
import { SupportedLanguageId } from '../data/languages/types';
import { FlagIcon } from './FlagIcon';
import { getLocalizedLanguageName, getComponentChrome, getLocalizedRegionName } from '../utils/pageDictionary';

interface LanguageSwitcherProps {
  onLanguageChange?: (langId: SupportedLanguageId) => void;
  className?: string;
}

type PairTab = 'target' | 'base';

export type LanguageRegion = 'all' | 'romance' | 'germanic' | 'slavic-eurasian' | 'east-asian' | 'south-asian' | 'middle-eastern';

export const LANGUAGE_REGION_MAP: Record<string, LanguageRegion> = {
  es: 'romance',
  fr: 'romance',
  pt: 'romance',
  en: 'germanic',
  de: 'germanic',
  ru: 'slavic-eurasian',
  tr: 'slavic-eurasian',
  id: 'slavic-eurasian',
  ja: 'east-asian',
  ko: 'east-asian',
  zh: 'east-asian',
  hi: 'south-asian',
  bn: 'south-asian',
  ur: 'south-asian',
  ar: 'middle-eastern',
};

const HIGH_AFFINITY_CORRIDORS: Record<string, SupportedLanguageId[]> = {
  en: ['es', 'ar', 'hi', 'zh', 'fr', 'ja', 'ko', 'de', 'ru', 'pt', 'tr', 'bn', 'ur'],
  es: ['pt', 'en', 'fr', 'zh', 'ja', 'de', 'ru', 'ar'],
  pt: ['es', 'en', 'fr', 'zh', 'ja', 'de'],
  fr: ['en', 'ar', 'es', 'zh', 'ja', 'de', 'pt', 'ru'],
  de: ['en', 'fr', 'zh', 'ja', 'es', 'ru', 'tr', 'ar'],
  ru: ['zh', 'de', 'en', 'ja', 'ko', 'tr', 'es', 'fr', 'hi', 'ar'],
  tr: ['en', 'de', 'ar', 'zh', 'ko', 'ja', 'ru', 'fr', 'ur'],
  id: ['zh', 'en', 'ja', 'ko', 'tr', 'de', 'ru', 'ar'],
  ko: ['zh', 'ja', 'en', 'es', 'de', 'fr', 'ru'],
  ja: ['zh', 'ko', 'en', 'es', 'de', 'fr', 'ru'],
  zh: ['en', 'ja', 'ko', 'ru', 'es', 'fr', 'de', 'hi', 'ar'],
  hi: ['en', 'ur', 'bn', 'ru', 'de', 'fr', 'zh', 'es', 'ja', 'ar'],
  ar: ['en', 'ur', 'fr', 'tr', 'de', 'es', 'ru', 'zh', 'hi'],
  bn: ['en', 'hi', 'ur', 'ar', 'zh', 'de', 'fr'],
  ur: ['en', 'ar', 'hi', 'bn', 'tr', 'de', 'fr'],
};

interface StoredLanguagePair {
  base: SupportedLanguageId;
  target: SupportedLanguageId;
}

const RECENT_PAIRS_STORAGE_KEY = 'basic_language_recent_pairs';

const FLAG_EMOJIS: Record<string, string> = {
  en: '🇬🇧',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  ru: '🇷🇺',
  pt: '🇧🇷',
  id: '🇮🇩',
  tr: '🇹🇷',
  ja: '🇯🇵',
  ko: '🇰🇷',
  zh: '🇨🇳',
  hi: '🇮🇳',
  ar: '🇸🇦',
  bn: '🇧🇩',
  ur: '🇵🇰',
};

const DEFAULT_INITIAL_PAIRS: StoredLanguagePair[] = [
  { base: 'en', target: 'fr' },
  { base: 'en', target: 'es' },
  { base: 'en', target: 'de' },
  { base: 'en', target: 'ru' },
];

const getRecentPairsTitle = (baseLang: SupportedLanguageId): string => {
  switch (baseLang) {
    case 'ru': return 'Недавние пары';
    case 'es': return 'Pares recientes';
    case 'fr': return 'Paires récentes';
    case 'de': return 'Zuletzt verwendete Paare';
    case 'pt': return 'Pares recentes';
    case 'tr': return 'Son Kullanılan Çiftler';
    case 'id': return 'Pasangan Terbaru';
    case 'ja': return '最近の組み合わせ';
    case 'ko': return '최근 언어 쌍';
    case 'zh': return '最近选择的语言对';
    case 'hi': return 'हाल के भाषा जोड़े';
    case 'ar': return 'الأزواج الأخيرة';
    case 'bn': return 'সাম্প্রতিক ভাষা জোড়া';
    case 'ur': return 'حالیہ زبانوں کے جوڑے';
    default: return 'Recent Pairs';
  }
};

const getSuggestedTitle = (baseLang: SupportedLanguageId): string => {
  switch (baseLang) {
    case 'ru': return 'Рекомендуемые курсы';
    case 'es': return 'Sugeridos para ti';
    case 'fr': return 'Suggéré pour vous';
    case 'de': return 'Empfohlen für dich';
    case 'pt': return 'Sugeridos para você';
    case 'tr': return 'Sizin İçin Önerilen';
    case 'id': return 'Disarankan untuk Anda';
    case 'ja': return 'おすすめのコース';
    case 'ko': return '추천 학습 코스';
    case 'zh': return '为你推荐';
    case 'hi': return 'आपके लिए अनुशंसित';
    case 'ar': return 'مقترحة لك';
    case 'bn': return 'আপনার জন্য প্রস্তাবিত';
    case 'ur': return 'آپ کے لیے تجویز کردہ';
    default: return 'Suggested For You';
  }
};

const getRoadmapTitle = (baseLang: SupportedLanguageId): string => {
  switch (baseLang) {
    case 'ru': return 'Глобальная карта развития языков';
    case 'es': return 'Mapa global de idiomas';
    case 'fr': return 'Feuille de route mondiale des langues';
    case 'de': return 'Globale Sprachen-Roadmap';
    case 'pt': return 'Roteiro global de idiomas';
    case 'tr': return 'Küresel Dil Yol Haritası';
    case 'id': return 'Peta Jalan Bahasa Global';
    case 'ja': return '言語追加ロードマップ';
    case 'ko': return '글로벌 언어 로드맵';
    case 'zh': return '全球语言路线图';
    case 'hi': return 'वैश्विक भाषा रोडमैप';
    case 'ar': return 'خارطة طريق اللغات العالمية';
    case 'bn': return 'গ্লোবাল ল্যাঙ্গুয়েজ রোডম্যাপ';
    case 'ur': return 'عالمی زبانوں کا لائحہ عمل';
    default: return 'Global Language Roadmap';
  }
};

const getRoadmapSubtitle = (baseLang: SupportedLanguageId): string => {
  switch (baseLang) {
    case 'ru': return 'Приоритет отдаётся самым распространённым языкам мира, чтобы открыть обучение как можно большему числу людей.';
    case 'es': return 'Priorizando los idiomas más hablados del mundo para llegar a la mayor cantidad de estudiantes.';
    case 'fr': return 'Priorité aux langues les plus parlées au monde pour toucher un maximum d’apprenants.';
    case 'de': return 'Wir priorisieren die meistgesprochenen Sprachen der Welt, um weltweit die meisten Lernenden zu erreichen.';
    case 'pt': return 'Priorizando os idiomas mais falados do mundo para alcançar o maior número de estudantes.';
    case 'tr': return 'Dünya genelinde en çok öğrenciye ulaşmak için en çok konuşulan dillere öncelik veriyoruz.';
    case 'id': return 'Memprioritaskan bahasa yang paling banyak digunakan di dunia untuk menjangkau lebih banyak pelajar.';
    case 'ja': return '世界で最も多く話されている言語を優先し、より多くの学習者へお届けします。';
    case 'ko': return '전 세계 더 많은 학습자에게 다가가기 위해 가장 널리 사용되는 언어를 우선순위로 둡니다.';
    case 'zh': return '优先开发全球使用人数最多的语言，让更多学习者轻松开启新语言之旅。';
    case 'hi': return 'दुनिया भर में अधिक से अधिक शिक्षार्थियों तक पहुँचने के लिए सबसे अधिक बोली जाने वाली भाषाओं को प्राथमिकता दी जा रही है।';
    case 'ar': return 'إعطاء الأولوية للغات الأكثر تحدثاً في العالم للوصول إلى أكبر عدد من المتعلمين.';
    case 'bn': return 'বিশ্বব্যাপী সর্বাধিক শিক্ষার্থীদের কাছে পৌঁছানোর জন্য সর্বাধিক কথ্য ভাষাগুলিকে অগ্রাধিকার দেওয়া হচ্ছে।';
    case 'ur': return 'دنیا بھر کے زیادہ سے زیادہ سیکھنے والوں تک پہنچنے کے لیے سب سے زیادہ بولی جانے والی زبانوں کو ترجیح دی جا رہی ہے۔';
    default: return "Prioritizing the world's most spoken languages to reach the most learners worldwide.";
  }
};

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onLanguageChange, className = '' }) => {
  const {
    targetLanguage,
    targetMeta,
    baseLanguage,
    baseMeta,
    availableLanguages,
    setTargetLanguage,
    setBaseLanguage,
    swapLanguages,
    ui
  } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<PairTab>('target');
  const [selectedRegion, setSelectedRegion] = useState<LanguageRegion>('all');
  const modalRef = useRef<HTMLDivElement>(null);

  const [recentPairs, setRecentPairs] = useState<StoredLanguagePair[]>(() => {
    try {
      const raw = localStorage.getItem(RECENT_PAIRS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.filter(p => p.base && p.target && p.base !== p.target).slice(0, 4);
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_INITIAL_PAIRS;
  });

  const recordRecentPair = (base: SupportedLanguageId, target: SupportedLanguageId) => {
    setRecentPairs(prev => {
      const filtered = prev.filter(p => !(p.base === base && p.target === target));
      const updated = [{ base, target }, ...filtered].slice(0, 4);
      try {
        localStorage.setItem(RECENT_PAIRS_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when modal is open on mobile to prevent background scroll-jumping
  useEffect(() => {
    if (isOpen) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  const handleSelectTarget = (langId: string, available: boolean) => {
    if (!available) return;
    const nextTarget = langId as SupportedLanguageId;
    setTargetLanguage(nextTarget);
    recordRecentPair(baseLanguage, nextTarget);
    if (onLanguageChange) {
      onLanguageChange(nextTarget);
    }
    setIsOpen(false);
  };

  const handleSelectBase = (langId: string, available: boolean) => {
    if (!available) return;
    const nextBase = langId as SupportedLanguageId;
    if (nextBase === targetLanguage) {
      // Swapping case: learner sets native language to the current target (e.g. learning French, sets native to French).
      // Swap target language to previous base language so target and base are never identical.
      const newTarget = baseLanguage !== nextBase ? baseLanguage : (nextBase === 'en' ? 'es' : 'en');
      setBaseLanguage(nextBase);
      setTargetLanguage(newTarget);
      recordRecentPair(nextBase, newTarget);
      if (onLanguageChange) {
        onLanguageChange(newTarget);
      }
    } else {
      // Normal case: learner is learning French, and changes native language from Russian to Indonesian.
      // Target MUST stay French! Base becomes Indonesian!
      setBaseLanguage(nextBase);
      recordRecentPair(nextBase, targetLanguage);
    }
  };

  const handleQuickPair = (base: SupportedLanguageId, target: SupportedLanguageId) => {
    setBaseLanguage(base);
    setTargetLanguage(target);
    recordRecentPair(base, target);
    if (onLanguageChange) {
      onLanguageChange(target);
    }
    setIsOpen(false);
  };

  const handleSwapClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    swapLanguages();
    recordRecentPair(targetLanguage, baseLanguage);
    if (onLanguageChange) {
      onLanguageChange(baseLanguage);
    }
  };

  const chrome = getComponentChrome(baseLanguage);
  const localizedTargetName = getLocalizedLanguageName(targetMeta.id, baseLanguage, targetMeta.name);
  const localizedBaseName = getLocalizedLanguageName(baseMeta.id, baseLanguage, baseMeta.name);

  return (
    <div className={`language-switcher-container ${className}`}>
      <div className="language-pair-trigger-wrap">
        <button
          type="button"
          className="language-switcher-trigger"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          title={`${ui.iSpeak}: ${localizedBaseName}, ${ui.learning}: ${localizedTargetName}`}
          aria-label={`Current language pair: ${baseMeta.name} to ${targetMeta.name}. Click to switch.`}
        >
          <span className="pair-flag-chips">
            <span className="base-flag-chip" title={`${ui.iSpeak || 'I speak'}: ${localizedBaseName}`}>
              <FlagIcon lang={baseMeta.id} size={18} />
            </span>
            <span className="pair-arrow-symbol" aria-hidden="true">→</span>
            <span className="target-flag-chip" title={`${ui.learning || 'Learning'}: ${localizedTargetName}`}>
              <FlagIcon lang={targetMeta.id} size={20} />
            </span>
          </span>
          <span className="language-name">{localizedTargetName}</span>
          <FaChevronDown className={`language-chevron ${isOpen ? 'open' : ''}`} />
        </button>

        {/* Direct quick-swap button right in the navbar */}
        <button
          type="button"
          className="quick-swap-nav-btn"
          onClick={handleSwapClick}
          title={ui.switchPair || 'Swap languages (learn the other way around)'}
          aria-label="Swap language pair"
        >
          <FaExchangeAlt />
        </button>
      </div>

      {isOpen && (
        <div
          className="language-modal-backdrop"
          onClick={() => setIsOpen(false)}
          role="presentation"
        >
          <div
            className="language-modal-container language-dropdown-menu language-pair-modal"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Language selection modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="language-modal-close auth-modal-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            <div className="language-modal-header">
              <div className="language-modal-header-icon">
                <FaGlobe className="dropdown-icon" />
              </div>
              <div className="language-modal-header-text">
                <h2>{ui.switchPair || 'Language Learning Pair'}</h2>
                <p>
                  {baseLanguage === 'es'
                    ? 'Elige tu idioma nativo y el curso que deseas estudiar'
                    : baseLanguage === 'fr'
                    ? 'Choisissez votre langue maternelle et le cours à étudier'
                    : baseLanguage === 'de'
                    ? 'Wähle deine Muttersprache und die Zielsprache'
                    : baseLanguage === 'ru'
                    ? 'Выберите родной язык и язык для изучения'
                    : baseLanguage === 'pt'
                    ? 'Escolha seu idioma nativo e o curso que deseja estudar'
                    : baseLanguage === 'tr'
                    ? 'Ana dilinizi ve öğrenmek istediğiniz dili seçin'
                    : baseLanguage === 'id'
                    ? 'Pilih bahasa ibu dan bahasa yang ingin Anda pelajari'
                    : 'Choose your native language and the language you want to study'}
                </p>
              </div>
            </div>

            {/* Dual-Box Visualizer with interactive swap button */}
            <div className="pair-visualizer-card">
              <div
                className={`pair-box base-box ${activeTab === 'base' ? 'selected-tab' : ''}`}
                onClick={() => setActiveTab('base')}
                role="button"
                tabIndex={0}
                aria-label={ui.iSpeak || 'I speak'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveTab('base');
                  }
                }}
              >
                <div className="pair-box-top-row">
                  <span className="pair-box-label">{ui.iSpeak || 'I speak'}</span>
                  {activeTab === 'base' && <span className="pair-box-badge">{chrome.customizingBadge}</span>}
                </div>
                <div className="pair-box-value">
                  <FlagIcon lang={baseMeta.id} size={26} />
                  <div className="pair-box-names">
                    <span className="pair-box-name">{localizedBaseName}</span>
                    <span className="pair-box-native">{baseMeta.nativeName}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="pair-swap-circle-btn"
                onClick={handleSwapClick}
                title={ui.switchPair || 'Swap learning & native languages'}
                aria-label="Swap native and learning languages"
              >
                <FaExchangeAlt />
              </button>

              <div
                className={`pair-box target-box ${activeTab === 'target' ? 'selected-tab' : ''}`}
                onClick={() => setActiveTab('target')}
                role="button"
                tabIndex={0}
                aria-label={ui.iWantToLearn || 'I want to learn'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveTab('target');
                  }
                }}
              >
                <div className="pair-box-top-row">
                  <span className="pair-box-label">{ui.iWantToLearn || 'I want to learn'}</span>
                  {activeTab === 'target' && <span className="pair-box-badge">{chrome.customizingBadge}</span>}
                </div>
                <div className="pair-box-value">
                  <FlagIcon lang={targetMeta.id} size={26} />
                  <div className="pair-box-names">
                    <span className="pair-box-name">{localizedTargetName}</span>
                    <span className="pair-box-native">{targetMeta.nativeName}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick-Pairs Section: Recent & High-Affinity Corridors */}
            <div className="quick-pairs-section">
              {recentPairs.length > 0 && (
                <div className="quick-pairs-group">
                  <div className="quick-pairs-title">⚡ {getRecentPairsTitle(baseLanguage)}</div>
                  <div className="quick-pairs-chips">
                    {recentPairs.map(p => {
                      const isCurrent = baseLanguage === p.base && targetLanguage === p.target;
                      return (
                        <button
                          key={`recent-${p.base}-${p.target}`}
                          type="button"
                          className={`quick-pair-chip ${isCurrent ? 'active' : ''}`}
                          onClick={() => handleQuickPair(p.base, p.target)}
                          aria-label={`Switch to pair ${p.base.toUpperCase()} to ${p.target.toUpperCase()}`}
                        >
                          <FlagIcon lang={p.base} size={15} />
                          <span>{p.base.toUpperCase()}</span>
                          <span className="chip-arrow">→</span>
                          <FlagIcon lang={p.target} size={15} />
                          <span>{p.target.toUpperCase()}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {availableLanguages.filter(l => l.available && l.id !== baseLanguage && (HIGH_AFFINITY_CORRIDORS[baseLanguage] || ['es', 'fr', 'en', 'de']).includes(l.id as SupportedLanguageId)).length > 0 && (
                <div className="quick-pairs-group" style={{ marginTop: '0.65rem' }}>
                  <div className="quick-pairs-title">✨ {getSuggestedTitle(baseLanguage)}</div>
                  <div className="quick-pairs-chips">
                    {availableLanguages
                      .filter(l => l.available && l.id !== baseLanguage && (HIGH_AFFINITY_CORRIDORS[baseLanguage] || ['es', 'fr', 'en', 'de']).includes(l.id as SupportedLanguageId))
                      .map(tgt => {
                        const isCurrent = targetLanguage === tgt.id;
                        const localizedTgtName = getLocalizedLanguageName(tgt.id, baseLanguage, tgt.name);
                        return (
                          <button
                            key={`sugg-${baseLanguage}-${tgt.id}`}
                            type="button"
                            className={`quick-pair-chip ${isCurrent ? 'active' : ''}`}
                            onClick={() => handleQuickPair(baseLanguage, tgt.id as SupportedLanguageId)}
                            aria-label={`Learn ${tgt.name}`}
                          >
                            <FlagIcon lang={tgt.id} size={14} /> {localizedTgtName}
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>

            {/* Language Selection List for Active Tab */}
            <div className="language-list" role="menu">
              <div className="language-list-header">
                <div className="language-group-title">
                  {activeTab === 'target' 
                    ? chrome.chooseLanguageToLearn
                    : (ui.iSpeak || 'Choose Your Language (Interface & Meaning)')}
                </div>

                {/* Regional / Family Filter Dropdown */}
                <div className="region-filter-dropdown-wrapper">
                  <select
                    className="region-filter-select"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value as LanguageRegion)}
                    aria-label="Filter languages by family"
                  >
                    <option value="all">🌍 {getLocalizedRegionName('all', baseLanguage)} ({availableLanguages.length})</option>
                    <option value="romance">🏛️ {getLocalizedRegionName('romance', baseLanguage)}</option>
                    <option value="germanic">🏰 {getLocalizedRegionName('germanic', baseLanguage)}</option>
                    <option value="slavic-eurasian">🌍 {getLocalizedRegionName('slavic-eurasian', baseLanguage)}</option>
                    <option value="east-asian">🌸 {getLocalizedRegionName('east-asian', baseLanguage)}</option>
                    <option value="south-asian">🪷 {getLocalizedRegionName('south-asian', baseLanguage)}</option>
                    <option value="middle-eastern">🌙 {getLocalizedRegionName('middle-eastern', baseLanguage)}</option>
                  </select>
                </div>
              </div>

              <div className="language-options-grid">
                {availableLanguages
                  .filter(l => l.available)
                  .filter(l => selectedRegion === 'all' || LANGUAGE_REGION_MAP[l.id] === selectedRegion)
                  .map(lang => {
                    const isSelected = activeTab === 'target' 
                      ? lang.id === targetLanguage 
                      : lang.id === baseLanguage;
                    const localizedOptName = getLocalizedLanguageName(lang.id, baseLanguage, lang.name);

                    return (
                      <button
                        key={lang.id}
                        type="button"
                        role="menuitem"
                        className={`language-option ${isSelected ? 'active' : ''}`}
                        onClick={() => {
                          if (activeTab === 'target') {
                            handleSelectTarget(lang.id, true);
                          } else {
                            handleSelectBase(lang.id, true);
                          }
                        }}
                      >
                        <span className="option-flag" aria-hidden="true">
                          <FlagIcon lang={lang.id} size={26} />
                        </span>
                        <div className="option-details">
                          <span className="option-name">{localizedOptName}</span>
                          <span className="option-native">{lang.nativeName}</span>
                        </div>
                        {isSelected && <FaCheck className="option-check" />}
                      </button>
                    );
                  })}
              </div>

              {activeTab === 'target' && (
                <div className="language-roadmap-container">
                  <div className="language-roadmap-header">
                    <span className="roadmap-title-badge">
                      <FaStar className="upcoming-icon" /> {getRoadmapTitle(baseLanguage)}
                    </span>
                    <p className="roadmap-subtitle">
                      {getRoadmapSubtitle(baseLanguage)}
                    </p>
                  </div>

                  <div className="language-roadmap-chips">
                    {ROADMAP_MOST_SPOKEN_LANGUAGES.map((lang) => (
                      <div key={lang.name} className="roadmap-lang-chip" title={`${lang.name} (${lang.speakers})`}>
                        <span className="chip-flag" aria-hidden="true">
                          <FlagIcon lang={lang.id || lang.name} size={20} />
                        </span>
                        <div className="chip-info">
                          <span className="chip-name">{lang.name}</span>
                          <span className="chip-speakers">{lang.speakers}</span>
                        </div>
                        <span className="coming-soon-badge">{chrome.soonBadge}</span>
                      </div>
                    ))}
                  </div>

                  <div className="language-request-callout">
                    <div className="request-callout-icon" aria-hidden="true">✉️</div>
                    <div className="request-callout-body">
                      <h4 className="request-callout-title">Request a Language</h4>
                      <p className="request-callout-text">
                        Have a language you'd love to learn? Email{' '}
                        <a
                          href="mailto:dev@basiclanguage.school?subject=Language%20Request%20for%20Basic%20Language%20School"
                          className="request-email-link"
                        >
                          dev@basiclanguage.school
                        </a>{' '}
                        to request it. Once this project is open source, community contributions will enable support for even more languages!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="language-dropdown-footer">
              <span>{chrome.bidirectionalNotice}</span>
              <button
                type="button"
                className="language-modal-done-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Confirm selection and close modal"
              >
                {baseLanguage === 'es' ? 'Listo' : baseLanguage === 'fr' ? 'Terminé' : baseLanguage === 'ru' ? 'Готово' : baseLanguage === 'de' ? 'Fertig' : baseLanguage === 'pt' ? 'Concluir' : baseLanguage === 'id' ? 'Selesai' : baseLanguage === 'tr' ? 'Tamam' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
