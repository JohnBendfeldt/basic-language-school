import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaCheck, FaGlobe, FaStar } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { SupportedLanguageId } from '../data/languages/types';
import { FlagIcon } from './FlagIcon';

interface LanguageSwitcherProps {
  onLanguageChange?: (langId: SupportedLanguageId) => void;
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onLanguageChange, className = '' }) => {
  const { currentLanguage, currentMeta, availableLanguages, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelectLanguage = (langId: string, available: boolean) => {
    if (!available) return;
    setLanguage(langId as SupportedLanguageId);
    if (onLanguageChange) {
      onLanguageChange(langId as SupportedLanguageId);
    }
    setIsOpen(false);
  };

  return (
    <div className={`language-switcher-container ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className="language-switcher-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        title="Switch language"
        aria-label={`Current language: ${currentMeta.name}. Click to switch.`}
      >
        <span className="language-flag" aria-hidden="true">
          <FlagIcon lang={currentMeta.id} size={22} />
        </span>
        <span className="language-name">{currentMeta.name}</span>
        <FaChevronDown className={`language-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="language-dropdown-menu" role="menu">
          <div className="language-dropdown-header">
            <FaGlobe className="dropdown-icon" />
            <span>Select Learning Language</span>
          </div>

          <div className="language-list">
            <div className="language-group-title">Active Courses</div>
            {availableLanguages
              .filter(l => l.available)
              .map(lang => {
                const isSelected = lang.id === currentLanguage;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    role="menuitem"
                    className={`language-option ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSelectLanguage(lang.id, true)}
                  >
                    <span className="option-flag" aria-hidden="true">
                      <FlagIcon lang={lang.id} size={22} />
                    </span>
                    <div className="option-details">
                      <span className="option-name">{lang.name}</span>
                      <span className="option-native">{lang.nativeName}</span>
                    </div>
                    {isSelected && <FaCheck className="option-check" />}
                  </button>
                );
              })}

            <div className="language-group-title language-upcoming-title">
              <FaStar className="upcoming-icon" />
              <span>Upcoming Courses</span>
            </div>
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

          <div className="language-dropdown-footer">
            <span>Unified curriculum · Studio neural voice</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
