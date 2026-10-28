import React, { useState, useRef, useEffect } from 'react';
import { FaTachometerAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { useLanguage, SpeechSpeed } from '../contexts/LanguageContext';

const SPEEDS: { value: SpeechSpeed; label: string; desc: string }[] = [
  { value: 0.5, label: '0.50×', desc: 'Slow-motion for clear syllables' },
  { value: 0.75, label: '0.75×', desc: 'Learner pace' },
  { value: 0.9, label: '0.90×', desc: 'Relaxed' },
  { value: 1.0, label: '1.0×', desc: 'Standard native speed' },
  { value: 1.1, label: '1.10×', desc: 'Brisk natural cadence' },
  { value: 1.25, label: '1.25×', desc: 'Challenge pace' },
];

export const VoiceSpeedControl: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { speechSpeed, setSpeechSpeed } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className={`voice-speed-control ${className}`} ref={containerRef}>
      <button
        type="button"
        className="voice-speed-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        title="Adjust Audio Playback Speed"
        aria-label={`Voice speed: ${speechSpeed}x. Click to change speed.`}
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
            className="voice-speed-dropdown voice-speed-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Audio Playback Speed"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="speed-dropdown-header">
              <div className="speed-header-left">
                <div className="speed-header-icon-badge">
                  <FaTachometerAlt />
                </div>
                <div>
                  <span className="speed-header-title">Audio Speed</span>
                  <span className="speed-header-subtitle">Studio voice pace</span>
                </div>
              </div>
              <button
                type="button"
                className="speed-modal-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close speed menu"
              >
                <FaTimes />
              </button>
            </div>
            <div className="speed-options-list" role="menu">
              {SPEEDS.map(item => {
                const isSelected = item.value === speechSpeed;
                return (
                  <button
                    key={item.value}
                    type="button"
                    role="menuitem"
                    className={`speed-option ${isSelected ? 'active' : ''}`}
                    onClick={() => {
                      setSpeechSpeed(item.value);
                      setIsOpen(false);
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
