import React, { useState, useEffect } from 'react';
import {
  FaTimes,
  FaTachometerAlt,
  FaChartLine,
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaExchangeAlt,
  FaShieldAlt,
  FaFileContract,
  FaInfoCircle,
  FaDownload,
  FaCheck,
  FaGlobe,
  FaSearch
} from 'react-icons/fa';
import { useLanguage, SpeechSpeed } from '../contexts/LanguageContext';
import { FlagIcon } from './FlagIcon';
import AuthModal from './AuthModal';
import ProgressModal from './ProgressModal';
import { supabase, signOutUser } from '../services/supabaseClient';
import { ProgressService } from '../services/progressService';
import { getComponentChrome, getLocalizedAppName, getLocalizedLanguageName } from '../utils/pageDictionary';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
  onOpenSearch?: () => void;
  installPrompt?: any;
  onInstallClick?: () => void;
}

const SPEEDS: { value: SpeechSpeed; label: string; desc: string }[] = [
  { value: 0.5, label: '0.50×', desc: 'Slow' },
  { value: 0.75, label: '0.75×', desc: 'Learner' },
  { value: 0.9, label: '0.90×', desc: 'Relaxed' },
  { value: 1.0, label: '1.0×', desc: 'Standard' },
  { value: 1.1, label: '1.10×', desc: 'Brisk' },
  { value: 1.25, label: '1.25×', desc: 'Fast' },
];

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenSearch,
  installPrompt,
  onInstallClick
}) => {
  const {
    targetMeta,
    baseMeta,
    targetLanguage,
    baseLanguage,
    speechSpeed,
    setSpeechSpeed,
    swapLanguages,
    ui
  } = useLanguage();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [progressModalOpen, setProgressModalOpen] = useState(false);

  // Sync Supabase user
  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Lock background body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen && !authModalOpen && !progressModalOpen) return null;

  const handleSignOut = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  const handleOpenProgress = () => {
    onClose();
    setProgressModalOpen(true);
  };

  const handleOpenAuth = () => {
    onClose();
    setAuthModalOpen(true);
  };

  const chrome = getComponentChrome(baseLanguage);
  const localizedAppName = getLocalizedAppName(targetLanguage, baseLanguage, targetMeta.appName || 'Language School');
  const localizedBaseName = getLocalizedLanguageName(baseLanguage, baseLanguage, baseMeta.name);
  const localizedTargetName = getLocalizedLanguageName(targetLanguage, baseLanguage, targetMeta.name);

  return (
    <>
      {isOpen && (
        <div className="mobile-drawer-backdrop" onClick={onClose} role="presentation">
          <aside
            className="mobile-drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Settings and options menu"
            onClick={(e) => e.stopPropagation()}
          >
          {/* Drawer Top Header */}
          <div className="mobile-drawer-header">
            <div className="drawer-app-identity">
              <span className="drawer-course-flag">
                <FlagIcon lang={targetLanguage} size={28} />
              </span>
              <div>
                <h2 className="drawer-title">{localizedAppName}</h2>
                <p className="drawer-subtitle">{chrome.personalStudyDashboard}</p>
              </div>
            </div>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={onClose}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>

          <div className="mobile-drawer-scrollable">
            {/* Quick Search Action */}
            {onOpenSearch && (
              <div
                className="drawer-card drawer-search-card"
                onClick={() => {
                  onClose();
                  onOpenSearch();
                }}
                role="button"
                tabIndex={0}
              >
                <div className="drawer-action-content">
                  <div className="drawer-action-icon search-icon">
                    <FaSearch />
                  </div>
                  <div className="drawer-action-text">
                    <h3>Search Concepts & Words</h3>
                    <p>Instant lookup across phrases & grammar</p>
                  </div>
                </div>
                <span className="drawer-action-arrow">›</span>
              </div>
            )}

            {/* Section 1: Active Language Learning Pair */}
            <div className="drawer-card drawer-pair-card">
              <div className="drawer-card-label">
                <FaGlobe className="drawer-card-icon" />
                <span>{chrome.learningPair}</span>
              </div>
              <div className="drawer-pair-row">
                <div className="drawer-pair-lang">
                  <span className="drawer-pair-label">{ui.iSpeak || 'I speak'}</span>
                  <div className="drawer-pair-name-wrap">
                    <FlagIcon lang={baseLanguage} size={20} />
                    <span className="drawer-pair-name">{localizedBaseName}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="drawer-swap-btn"
                  onClick={swapLanguages}
                  title="Swap languages"
                  aria-label="Swap language pair"
                >
                  <FaExchangeAlt />
                </button>

                <div className="drawer-pair-lang">
                  <span className="drawer-pair-label">{ui.learning || 'Learning'}</span>
                  <div className="drawer-pair-name-wrap">
                    <FlagIcon lang={targetLanguage} size={20} />
                    <span className="drawer-pair-name">{localizedTargetName}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Audio Playback Speed */}
            <div className="drawer-card">
              <div className="drawer-card-label">
                <FaTachometerAlt className="drawer-card-icon" />
                <span>{chrome.audioPlaybackSpeed}</span>
              </div>
              <p className="drawer-card-desc">
                Adjust neural pronunciation pacing for clear listening
              </p>
              <div className="drawer-speed-grid">
                {SPEEDS.map((item) => {
                  const isSelected = item.value === speechSpeed;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      className={`drawer-speed-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => setSpeechSpeed(item.value)}
                    >
                      <span className="drawer-speed-val">{item.label}</span>
                      <span className="drawer-speed-desc">{item.desc}</span>
                      {isSelected && <FaCheck className="drawer-speed-check" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Progress & Detailed Stats */}
            <div className="drawer-card drawer-action-card" onClick={handleOpenProgress} role="button" tabIndex={0}>
              <div className="drawer-action-content">
                <div className="drawer-action-icon progress-icon">
                  <FaChartLine />
                </div>
                <div className="drawer-action-text">
                  <h3>{chrome.myLearningProgress}</h3>
                  <p>{chrome.overallAccuracy} · {chrome.mastered}</p>
                </div>
              </div>
              <span className="drawer-action-arrow">›</span>
            </div>

            {/* Section 4: Cloud Sync & Account */}
            <div className="drawer-card">
              <div className="drawer-card-label">
                <FaUser className="drawer-card-icon" />
                <span>{chrome.accountCloudSync}</span>
              </div>
              {currentUser ? (
                <div className="drawer-user-info">
                  <div className="drawer-user-details">
                    <span className="drawer-user-email">{currentUser.email}</span>
                    <span className="drawer-user-badge">Cloud Synced</span>
                  </div>
                  <button
                    type="button"
                    className="drawer-auth-btn sign-out"
                    onClick={handleSignOut}
                  >
                    <FaSignOutAlt />
                    <span>{chrome.signOut}</span>
                  </button>
                </div>
              ) : (
                <div className="drawer-guest-info">
                  <p className="drawer-guest-desc">
                    {chrome.syncPromoText}
                  </p>
                  <button
                    type="button"
                    className="drawer-auth-btn sign-in"
                    onClick={handleOpenAuth}
                  >
                    <FaSignInAlt />
                    <span>{chrome.syncSignIn}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Section 5: PWA Install App (if available) */}
            {installPrompt && (
              <div className="drawer-card drawer-install-card" onClick={onInstallClick} role="button" tabIndex={0}>
                <div className="drawer-action-content">
                  <div className="drawer-action-icon install-icon">
                    <FaDownload />
                  </div>
                  <div className="drawer-action-text">
                    <h3>{chrome.installApp}</h3>
                    <p>{chrome.installAppTitle}</p>
                  </div>
                </div>
                <span className="drawer-action-arrow">›</span>
              </div>
            )}

            {/* Section 6: Legal & About Links */}
            <div className="drawer-legal-links">
              <button
                type="button"
                className="drawer-legal-link"
                onClick={() => {
                  onNavigate('about');
                  onClose();
                }}
              >
                <FaInfoCircle />
                <span>{chrome.aboutContact}</span>
              </button>
              <button
                type="button"
                className="drawer-legal-link"
                onClick={() => {
                  onNavigate('privacy');
                  onClose();
                }}
              >
                <FaShieldAlt />
                <span>{chrome.privacyPolicy}</span>
              </button>
              <button
                type="button"
                className="drawer-legal-link"
                onClick={() => {
                  onNavigate('terms');
                  onClose();
                }}
              >
                <FaFileContract />
                <span>{chrome.termsOfService}</span>
              </button>
            </div>

            <div className="drawer-footer-note">
              <span>Basic Language School · Free & Open Education</span>
            </div>
          </div>
        </aside>
      </div>
      )}

      {/* Nested Modals triggered from Drawer */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <ProgressModal
        isOpen={progressModalOpen}
        onClose={() => setProgressModalOpen(false)}
        userEmail={currentUser?.email}
        languageId={targetLanguage}
      />
    </>
  );
};

export default MobileDrawer;
