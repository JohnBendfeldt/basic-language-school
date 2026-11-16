import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaCheck, FaGlobe, FaExchangeAlt, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { SupportedLanguageId } from '../data/languages/types';
import { FlagIcon } from './FlagIcon';
import { getLocalizedLanguageName, getComponentChrome, getLocalizedRegionName, getLanguageRequestCopy, getLanguagePickerCopy } from '../utils/pageDictionary';
import { useModalAccessibility } from '../hooks/useModalAccessibility';

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
  en: ['es', 'ar', 'hi', 'zh', 'fr', 'ja', 'ko', 'de', 'ru', 'pt', 'tr', 'id', 'bn', 'ur'],
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

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onLanguageChange, className = '' }) => {
  const {
    targetLanguage,
    targetMeta,
    baseLanguage,
    baseMeta,
    availableLanguages,
    setLanguagePair,
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
          return parsed
            .filter(p => p && typeof p === 'object' && p.base && p.target && p.base !== p.target)
            .slice(0, 4);
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_INITIAL_PAIRS;
  });

  const recordRecentPair = (base: SupportedLanguageId, target: SupportedLanguageId) => {
    if (!base || !target || base === target) return;
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

  useModalAccessibility({
    isOpen,
    onClose: () => setIsOpen(false),
    modalRef,
  });

  const handleSelectTarget = (langId: string, available: boolean) => {
    if (!available) return;
    const nextTarget = langId as SupportedLanguageId;
    const effectiveBase: SupportedLanguageId =
      nextTarget === baseLanguage
        ? (targetLanguage !== nextTarget ? targetLanguage : (nextTarget === 'en' ? 'es' : 'en'))
        : baseLanguage;
    setLanguagePair(effectiveBase, nextTarget);
    recordRecentPair(effectiveBase, nextTarget);
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
      // Swap target language to previous base language atomically so target and base are never identical.
      const newTarget = baseLanguage !== nextBase ? baseLanguage : (nextBase === 'en' ? 'es' : 'en');
      setLanguagePair(nextBase, newTarget);
      recordRecentPair(nextBase, newTarget);
      if (onLanguageChange) {
        onLanguageChange(newTarget);
      }
    } else {
      // Normal case: learner is learning French, and changes native language from Russian to Indonesian.
      // Target MUST stay French! Base becomes Indonesian!
      setLanguagePair(nextBase, targetLanguage);
      recordRecentPair(nextBase, targetLanguage);
    }
  };

  const handleQuickPair = (base: SupportedLanguageId, target: SupportedLanguageId) => {
    if (base === target) return;
    setLanguagePair(base, target);
    recordRecentPair(base, target);
    if (onLanguageChange) {
      onLanguageChange(target);
    }
    setIsOpen(false);
  };

  const handleSwapClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextBase = targetLanguage;
    const nextTarget = baseLanguage;
    swapLanguages();
    recordRecentPair(nextBase, nextTarget);
    if (onLanguageChange) {
      onLanguageChange(nextTarget);
    }
  };

  const chrome = getComponentChrome(baseLanguage);
  const requestCopy = getLanguageRequestCopy(baseLanguage);
  const pickerCopy = getLanguagePickerCopy(baseLanguage);
  const localizedTargetName = getLocalizedLanguageName(targetMeta.id, baseLanguage, targetMeta.name);
  const localizedBaseName = getLocalizedLanguageName(baseMeta.id, baseLanguage, baseMeta.name);
  const baseNativeDir = baseMeta.id === 'ar' || baseMeta.id === 'ur' ? 'rtl' : 'ltr';
  const targetNativeDir = targetMeta.id === 'ar' || targetMeta.id === 'ur' ? 'rtl' : 'ltr';

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
          aria-label={`Current language pair: ${baseMeta.name} to ${targetMeta.name} — ${localizedTargetName}. Click to switch.`}
        >
          <span className="pair-flag-chips" aria-hidden="true">
            <span className="base-flag-chip" title={`${ui.iSpeak || 'I speak'}: ${localizedBaseName}`}>
              <FlagIcon lang={baseMeta.id} size={18} />
            </span>
            <span className="pair-arrow-symbol" aria-hidden="true">→</span>
            <span className="target-flag-chip" title={`${ui.learning || 'Learning'}: ${localizedTargetName}`}>
              <FlagIcon lang={targetMeta.id} size={20} />
            </span>
          </span>
          <span className="language-name">{localizedTargetName}</span>
          <FaChevronDown className={`language-chevron ${isOpen ? 'open' : ''}`} aria-hidden="true" />
        </button>

        {/* Direct quick-swap button right in the navbar */}
        <button
          type="button"
          className="quick-swap-nav-btn"
          onClick={handleSwapClick}
          title={ui.switchPair || 'Swap languages (learn the other way around)'}
          aria-label="Swap language pair"
        >
          <FaExchangeAlt aria-hidden="true" />
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
              <FaTimes aria-hidden="true" />
            </button>

            <div className="language-modal-header">
              <div className="language-modal-header-icon" aria-hidden="true">
                <FaGlobe className="dropdown-icon" aria-hidden="true" />
              </div>
              <div className="language-modal-header-text">
                <h2>{ui.switchPair || 'Language Learning Pair'}</h2>
                <p>
                  {pickerCopy.subtitle}
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
                aria-pressed={activeTab === 'base'}
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
                    <span className="pair-box-native" lang={baseMeta.id} dir={baseNativeDir}>
                      {baseMeta.nativeName}
                    </span>
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
                <FaExchangeAlt aria-hidden="true" />
              </button>

              <div
                className={`pair-box target-box ${activeTab === 'target' ? 'selected-tab' : ''}`}
                onClick={() => setActiveTab('target')}
                role="button"
                tabIndex={0}
                aria-pressed={activeTab === 'target'}
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
                    <span className="pair-box-native" lang={targetMeta.id} dir={targetNativeDir}>
                      {targetMeta.nativeName}
                    </span>
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
                          aria-pressed={isCurrent}
                          className={`quick-pair-chip ${isCurrent ? 'active' : ''}`}
                          onClick={() => handleQuickPair(p.base, p.target)}
                          aria-label={`Switch to pair ${p.base.toUpperCase()} to ${p.target.toUpperCase()} — ${p.base.toUpperCase()} ${p.target.toUpperCase()}`}
                        >
                          <FlagIcon lang={p.base} size={15} />
                          <span>{p.base.toUpperCase()}</span>
                          <span className="chip-arrow" aria-hidden="true">→</span>
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
                            aria-pressed={isCurrent}
                            className={`quick-pair-chip ${isCurrent ? 'active' : ''}`}
                            onClick={() => handleQuickPair(baseLanguage, tgt.id as SupportedLanguageId)}
                            aria-label={localizedTgtName === tgt.name ? `Learn ${tgt.name}` : `Learn ${tgt.name} — ${localizedTgtName}`}
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
            <div className="language-list">
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

              <div
                className="language-options-grid"
                role="menu"
                aria-label={
                  activeTab === 'target'
                    ? chrome.chooseLanguageToLearn
                    : (ui.iSpeak || 'Choose Your Language')
                }
                onKeyDown={(e) => {
                  const items = Array.from(
                    e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitem"]')
                  );
                  if (!items.length) return;
                  const idx = items.indexOf(document.activeElement as HTMLButtonElement);
                  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    items[(idx + 1) % items.length]?.focus();
                  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    items[(idx - 1 + items.length) % items.length]?.focus();
                  }
                }}
              >
                {availableLanguages
                  .filter(l => l.available)
                  .filter(l => selectedRegion === 'all' || LANGUAGE_REGION_MAP[l.id] === selectedRegion)
                  .map(lang => {
                    const isSelected = activeTab === 'target' 
                      ? lang.id === targetLanguage 
                      : lang.id === baseLanguage;
                    const localizedOptName = getLocalizedLanguageName(lang.id, baseLanguage, lang.name);
                    const optNativeDir = lang.id === 'ar' || lang.id === 'ur' ? 'rtl' : 'ltr';

                    return (
                      <button
                        key={lang.id}
                        type="button"
                        role="menuitem"
                        aria-current={isSelected ? 'true' : undefined}
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
                          <span className="option-native" lang={lang.id} dir={optNativeDir}>
                            {lang.nativeName}
                          </span>
                        </div>
                        {isSelected && <FaCheck className="option-check" aria-hidden="true" />}
                      </button>
                    );
                  })}
              </div>

              {activeTab === 'target' && (
                <div className="language-request-section">
                  <div className="language-request-callout">
                    <div className="request-callout-icon" aria-hidden="true">✉️</div>
                    <div className="request-callout-body">
                      <h3 className="request-callout-title">{requestCopy.title}</h3>
                      <p className="request-callout-text">
                        {requestCopy.before}{' '}
                        <a
                          href="mailto:dev@basiclanguage.school?subject=Language%20Request%20for%20Basic%20Language%20School"
                          className="request-email-link"
                        >
                          dev@basiclanguage.school
                        </a>{' '}
                        {requestCopy.after}{' '}
                        <a
                          href="https://github.com/JohnBendfeldt/basic-language-school"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="request-email-link"
                          lang={baseLanguage !== 'en' ? 'en' : undefined}
                          dir={baseLanguage !== 'en' ? 'ltr' : undefined}
                        >
                          {requestCopy.githubLabel}
                        </a>
                        {requestCopy.closing}
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
                aria-label={`${pickerCopy.done} — Confirm selection and close modal`}
              >
                {pickerCopy.done}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
