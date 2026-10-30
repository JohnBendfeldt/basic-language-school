import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaCheck, FaGlobe, FaStar, FaExchangeAlt, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { SupportedLanguageId } from '../data/languages/types';
import { FlagIcon } from './FlagIcon';
import { getLocalizedLanguageName, getComponentChrome } from '../utils/pageDictionary';

interface LanguageSwitcherProps {
  onLanguageChange?: (langId: SupportedLanguageId) => void;
  className?: string;
}

type PairTab = 'target' | 'base';

export type LanguageRegion = 'all' | 'romance' | 'germanic' | 'slavic-eurasian' | 'east-asian';

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
};

const HIGH_AFFINITY_CORRIDORS: Record<string, SupportedLanguageId[]> = {
  en: ['es', 'fr', 'ja', 'ko', 'de', 'ru', 'pt', 'tr'],
  es: ['pt', 'en', 'fr', 'ja', 'de', 'ru'],
  pt: ['es', 'en', 'fr', 'ja', 'de'],
  fr: ['en', 'es', 'ja', 'de', 'pt', 'ru'],
  de: ['en', 'fr', 'ja', 'es', 'ru', 'tr'],
  ru: ['de', 'en', 'ja', 'ko', 'tr', 'es', 'fr'],
  tr: ['en', 'de', 'ko', 'ja', 'ru', 'fr'],
  id: ['en', 'ja', 'ko', 'tr', 'de', 'ru'],
  ko: ['ja', 'en', 'es', 'de', 'fr', 'ru'],
  ja: ['ko', 'en', 'es', 'de', 'fr', 'ru'],
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
};

const DEFAULT_INITIAL_PAIRS: StoredLanguagePair[] = [
  { base: 'en', target: 'fr' },
  { base: 'en', target: 'es' },
  { base: 'en', target: 'de' },
  { base: 'en', target: 'ru' },
];

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
                  {ui.iSpeak && ui.iWantToLearn
                    ? `${ui.iSpeak} & ${ui.iWantToLearn}`
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
                  <div className="quick-pairs-title">⚡ {baseLanguage === 'de' ? 'Zuletzt verwendete Paare' : baseLanguage === 'es' ? 'Pares recientes' : baseLanguage === 'fr' ? 'Paires récentes' : baseLanguage === 'ru' ? 'Недавние пары' : baseLanguage === 'pt' ? 'Pares recentes' : baseLanguage === 'tr' ? 'Son Kullanılan Çiftler' : baseLanguage === 'id' ? 'Pasangan Terbaru' : 'Recent Pairs'}</div>
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
                          {FLAG_EMOJIS[p.base] || '🌐'} {p.base.toUpperCase()} → {FLAG_EMOJIS[p.target] || '🌐'} {p.target.toUpperCase()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {availableLanguages.filter(l => l.available && l.id !== baseLanguage && (HIGH_AFFINITY_CORRIDORS[baseLanguage] || ['es', 'fr', 'en', 'de']).includes(l.id as SupportedLanguageId)).length > 0 && (
                <div className="quick-pairs-group" style={{ marginTop: '0.65rem' }}>
                  <div className="quick-pairs-title">✨ {baseLanguage === 'de' ? 'Empfohlen für dich' : baseLanguage === 'es' ? 'Sugeridos para ti' : baseLanguage === 'fr' ? 'Suggéré pour vous' : baseLanguage === 'ru' ? 'Рекомендуемые курсы' : baseLanguage === 'pt' ? 'Sugeridos para você' : baseLanguage === 'tr' ? 'Sizin İçin Önerilen' : baseLanguage === 'id' ? 'Disarankan untuk Anda' : 'Suggested For You'} ({localizedBaseName})</div>
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

            {/* Tab Selector: Choose which side to customize */}
            <div className="pair-picker-tabs">
              <button
                type="button"
                className={`pair-tab-btn ${activeTab === 'target' ? 'active' : ''}`}
                onClick={() => setActiveTab('target')}
              >
                <span>{ui.iWantToLearn || 'Learning'}</span>
                <span className="tab-current-badge">{localizedTargetName}</span>
              </button>
              <button
                type="button"
                className={`pair-tab-btn ${activeTab === 'base' ? 'active' : ''}`}
                onClick={() => setActiveTab('base')}
              >
                <span>{ui.iSpeak || 'I speak'}</span>
                <span className="tab-current-badge">{localizedBaseName}</span>
              </button>
            </div>

            {/* Language Selection List for Active Tab */}
            <div className="language-list" role="menu">
              <div className="language-group-title">
                {activeTab === 'target' 
                  ? chrome.chooseLanguageToLearn
                  : (ui.iSpeak || 'Choose Your Language (Interface & Meaning)')}
              </div>

              {/* Regional / Family Filter Pills */}
              <div className="region-filter-bar" role="group" aria-label="Filter languages by region">
                <button
                  type="button"
                  className={`region-pill ${selectedRegion === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedRegion('all')}
                >
                  All ({availableLanguages.length})
                </button>
                <button
                  type="button"
                  className={`region-pill ${selectedRegion === 'romance' ? 'active' : ''}`}
                  onClick={() => setSelectedRegion('romance')}
                >
                  🏛️ Romance
                </button>
                <button
                  type="button"
                  className={`region-pill ${selectedRegion === 'germanic' ? 'active' : ''}`}
                  onClick={() => setSelectedRegion('germanic')}
                >
                  🏰 Germanic
                </button>
                <button
                  type="button"
                  className={`region-pill ${selectedRegion === 'slavic-eurasian' ? 'active' : ''}`}
                  onClick={() => setSelectedRegion('slavic-eurasian')}
                >
                  🌍 Slavic & Eurasian
                </button>
                <button
                  type="button"
                  className={`region-pill ${selectedRegion === 'east-asian' ? 'active' : ''}`}
                  onClick={() => setSelectedRegion('east-asian')}
                >
                  🌸 East Asian
                </button>
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
                <>
                  <div className="language-group-title language-upcoming-title">
                    <FaStar className="upcoming-icon" />
                    <span>{chrome.upcomingCourses}</span>
                  </div>
                  <div className="language-options-grid upcoming-grid">
                    {availableLanguages
                      .filter(l => !l.available)
                      .filter(l => selectedRegion === 'all' || LANGUAGE_REGION_MAP[l.id] === selectedRegion)
                      .map(lang => {
                        const localizedOptName = getLocalizedLanguageName(lang.id, baseLanguage, lang.name);
                        return (
                          <div
                            key={lang.id}
                            className="language-option upcoming disabled"
                            title="Course under active development"
                          >
                            <span className="option-flag" aria-hidden="true">{lang.flag}</span>
                            <div className="option-details">
                              <span className="option-name">{localizedOptName}</span>
                              <span className="option-native">{lang.nativeName}</span>
                            </div>
                            <span className="coming-soon-badge">{chrome.soonBadge}</span>
                          </div>
                        );
                      })}
                  </div>
                </>
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
