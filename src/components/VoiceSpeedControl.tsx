import React, { useState, useRef, useEffect } from 'react';
import { FaTachometerAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { useLanguage, SpeechSpeed } from '../contexts/LanguageContext';
import { getComponentChrome, getRelaxedAndBriskSpeedLabels } from '../utils/pageDictionary';
import { useModalAccessibility } from '../hooks/useModalAccessibility';

export const VoiceSpeedControl: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { speechSpeed, setSpeechSpeed, baseLanguage } = useLanguage();
  const chrome = getComponentChrome(baseLanguage);
  const extraSpeeds = getRelaxedAndBriskSpeedLabels(baseLanguage);

  const SPEEDS: { value: SpeechSpeed; label: string; desc: string }[] = [
    { value: 0.5, label: '0.50×', desc: chrome.speedDesc05 },
    { value: 0.75, label: '0.75×', desc: chrome.speedDesc075 },
    { value: 0.9, label: '0.90×', desc: extraSpeeds.relaxed },
    { value: 1.0, label: '1.0×', desc: baseLanguage === 'en' ? 'Standard native speed' : chrome.speedDesc1 },
    { value: 1.1, label: '1.10×', desc: extraSpeeds.brisk },
    { value: 1.25, label: '1.25×', desc: baseLanguage === 'en' ? 'Challenge pace' : chrome.speedDesc125 },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useModalAccessibility({
    isOpen,
    onClose: () => setIsOpen(false),
    modalRef: dialogRef,
    lockScroll: false,
  });

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  return (
    <div className={`voice-speed-control ${className}`} ref={containerRef}>
      <button
        type="button"
        className="voice-speed-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        title="Adjust Audio Playback Speed"
        aria-label={`Voice speed: ${speechSpeed}x — ${speechSpeed}×. Click to change speed.`}
      >
        <FaTachometerAlt className="speed-icon" aria-hidden="true" />
        <span className="speed-label">{speechSpeed}×</span>
      </button>

      {isOpen && (
        <div
          className="voice-speed-backdrop"
          onClick={() => setIsOpen(false)}
          role="presentation"
        >
          <div
            ref={dialogRef}
            className="voice-speed-dropdown voice-speed-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Audio Playback Speed"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="speed-dropdown-header">
              <div className="speed-header-left">
                <div className="speed-header-icon-badge" aria-hidden="true">
                  <FaTachometerAlt aria-hidden="true" />
                </div>
                <div>
                  <span className="speed-header-title">{chrome.audioSpeedLabel}</span>
                  <span className="speed-header-subtitle">{chrome.studioVoicePace}</span>
                </div>
              </div>
              <button
                type="button"
                className="speed-modal-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close speed menu"
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>
            <div className="speed-options-list" role="menu" aria-label={chrome.audioSpeedLabel}>
              {SPEEDS.map((item, idx) => {
                const isSelected = item.value === speechSpeed;
                return (
                  <button
                    key={item.value}
                    type="button"
                    role="menuitem"
                    aria-current={isSelected ? 'true' : undefined}
                    className={`speed-option ${isSelected ? 'active' : ''}`}
                    onClick={() => {
                      setSpeechSpeed(item.value);
                      setIsOpen(false);
                    }}
                    onKeyDown={(e) => {
                      const items = Array.from(
                        e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]') || []
                      );
                      if (!items.length) return;
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        items[(idx + 1) % items.length]?.focus();
                      } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        items[(idx - 1 + items.length) % items.length]?.focus();
                      }
                    }}
                  >
                    <span className="speed-val">{item.label}</span>
                    <span className="speed-desc">{item.desc}</span>
                    {isSelected && <FaCheck className="speed-check" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceSpeedControl;
