import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaCheck, FaGlobe, FaStar, FaExchangeAlt, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { SupportedLanguageId } from '../data/languages/types';
import { FlagIcon } from './FlagIcon';

interface LanguageSwitcherProps {
  onLanguageChange?: (langId: SupportedLanguageId) => void;
  className?: string;
}

type PairTab = 'target' | 'base';

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
  const modalRef = useRef<HTMLDivElement>(null);

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
    setTargetLanguage(langId as SupportedLanguageId);
    if (onLanguageChange) {
      onLanguageChange(langId as SupportedLanguageId);
    }
    setIsOpen(false);
  };

  const handleSelectBase = (langId: string, available: boolean) => {
    if (!available) return;
    setBaseLanguage(langId as SupportedLanguageId);
    setIsOpen(false);
  };

  const handleQuickPair = (base: SupportedLanguageId, target: SupportedLanguageId) => {
    setBaseLanguage(base);
    setTargetLanguage(target);
    if (onLanguageChange) {
      onLanguageChange(target);
    }
    setIsOpen(false);
  };

  const handleSwapClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    swapLanguages();
    if (onLanguageChange) {
      onLanguageChange(baseLanguage);
    }
  };

  return (
    <div className={`language-switcher-container ${className}`}>
      <div className="language-pair-trigger-wrap">
        <button
          type="button"
          className="language-switcher-trigger"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          title={`I speak ${baseMeta.name}, learning ${targetMeta.name}. Click to change pair.`}
          aria-label={`Current language pair: ${baseMeta.name} to ${targetMeta.name}. Click to switch.`}
        >
          <span className="pair-flag-chips">
            <span className="base-flag-chip" title={`${ui.iSpeak || 'I speak'}: ${baseMeta.name}`}>
              <FlagIcon lang={baseMeta.id} size={18} />
            </span>
            <span className="pair-arrow-symbol" aria-hidden="true">→</span>
            <span className="target-flag-chip" title={`${ui.learning || 'Learning'}: ${targetMeta.name}`}>
              <FlagIcon lang={targetMeta.id} size={20} />
            </span>
          </span>
          <span className="language-name">{targetMeta.name}</span>
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
                  {activeTab === 'base' && <span className="pair-box-badge">Customizing</span>}
                </div>
                <div className="pair-box-value">
                  <FlagIcon lang={baseMeta.id} size={26} />
                  <div className="pair-box-names">
                    <span className="pair-box-name">{baseMeta.name}</span>
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
                  {activeTab === 'target' && <span className="pair-box-badge">Customizing</span>}
                </div>
                <div className="pair-box-value">
                  <FlagIcon lang={targetMeta.id} size={26} />
                  <div className="pair-box-names">
                    <span className="pair-box-name">{targetMeta.name}</span>
                    <span className="pair-box-native">{targetMeta.nativeName}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick-Pairs Section */}
            <div className="quick-pairs-section">
              <div className="quick-pairs-title">Popular Pairs</div>
              <div className="quick-pairs-chips">
                <button
                  type="button"
                  className={`quick-pair-chip ${baseLanguage === 'en' && targetLanguage === 'es' ? 'active' : ''}`}
                  onClick={() => handleQuickPair('en', 'es')}
                >
                  🇬🇧 EN → 🇪🇸 ES
                </button>
                <button
                  type="button"
                  className={`quick-pair-chip ${baseLanguage === 'es' && targetLanguage === 'en' ? 'active' : ''}`}
                  onClick={() => handleQuickPair('es', 'en')}
                >
                  🇪🇸 ES → 🇬🇧 EN
                </button>
                <button
                  type="button"
                  className={`quick-pair-chip ${baseLanguage === 'en' && targetLanguage === 'fr' ? 'active' : ''}`}
                  onClick={() => handleQuickPair('en', 'fr')}
                >
                  🇬🇧 EN → 🇫🇷 FR
                </button>
                <button
                  type="button"
                  className={`quick-pair-chip ${baseLanguage === 'fr' && targetLanguage === 'en' ? 'active' : ''}`}
                  onClick={() => handleQuickPair('fr', 'en')}
                >
                  🇫🇷 FR → 🇬🇧 EN
                </button>
                <button
                  type="button"
                  className={`quick-pair-chip ${baseLanguage === 'en' && targetLanguage === 'ru' ? 'active' : ''}`}
                  onClick={() => handleQuickPair('en', 'ru')}
                >
                  🇬🇧 EN → 🇷🇺 RU
                </button>
                <button
                  type="button"
                  className={`quick-pair-chip ${baseLanguage === 'ru' && targetLanguage === 'en' ? 'active' : ''}`}
                  onClick={() => handleQuickPair('ru', 'en')}
                >
                  🇷🇺 RU → 🇬🇧 EN
                </button>
                <button
                  type="button"
                  className={`quick-pair-chip ${baseLanguage === 'es' && targetLanguage === 'ru' ? 'active' : ''}`}
                  onClick={() => handleQuickPair('es', 'ru')}
                >
                  🇪🇸 ES → 🇷🇺 RU
                </button>
                <button
                  type="button"
                  className={`quick-pair-chip ${baseLanguage === 'ru' && targetLanguage === 'es' ? 'active' : ''}`}
                  onClick={() => handleQuickPair('ru', 'es')}
                >
                  🇷🇺 RU → 🇪🇸 ES
                </button>
              </div>
            </div>

            {/* Tab Selector: Choose which side to customize */}
            <div className="pair-picker-tabs">
              <button
                type="button"
                className={`pair-tab-btn ${activeTab === 'target' ? 'active' : ''}`}
                onClick={() => setActiveTab('target')}
              >
                <span>{ui.iWantToLearn || 'Learning'}</span>
                <span className="tab-current-badge">{targetMeta.name}</span>
              </button>
              <button
                type="button"
                className={`pair-tab-btn ${activeTab === 'base' ? 'active' : ''}`}
                onClick={() => setActiveTab('base')}
              >
                <span>{ui.iSpeak || 'I speak'}</span>
                <span className="tab-current-badge">{baseMeta.name}</span>
              </button>
            </div>

            {/* Language Selection List for Active Tab */}
            <div className="language-list" role="menu">
              <div className="language-group-title">
                {activeTab === 'target' 
                  ? (ui.iWantToLearn ? `Choose Language to Learn` : 'Select Learning Course')
                  : (ui.iSpeak ? `Choose Your Language (Interface & Meaning)` : 'Select Your Native Language')}
              </div>

              <div className="language-options-grid">
                {availableLanguages
                  .filter(l => l.available)
                  .map(lang => {
                    const isSelected = activeTab === 'target' 
                      ? lang.id === targetLanguage 
                      : lang.id === baseLanguage;

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
                          <span className="option-name">{lang.name}</span>
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
                    <span>Upcoming Courses</span>
                  </div>
                  <div className="language-options-grid upcoming-grid">
                    {availableLanguages
                      .filter(l => !l.available)
                      .map(lang => (
                        <div
                          key={lang.id}
                          className="language-option upcoming disabled"
                          title="Course under active development"
                        >
                          <span className="option-flag" aria-hidden="true">{lang.flag}</span>
                          <div className="option-details">
                            <span className="option-name">{lang.name}</span>
                            <span className="option-native">{lang.nativeName}</span>
                          </div>
                          <span className="coming-soon-badge">Soon</span>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>

            <div className="language-dropdown-footer">
              <span>Bidirectional curriculum · Studio neural voice</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
