import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Alphabet from './components/Alphabet';
import Phrases from './components/Phrases';
import Navigation from './components/Navigation';
import NumbersAndTime from './components/NumbersAndTime';
import Quiz from './components/Quiz';
import BottomNavigation from './components/BottomNavigation';
import UserMenu from './components/UserMenu';
import LanguageSwitcher from './components/LanguageSwitcher';
import VoiceSpeedControl from './components/VoiceSpeedControl';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import MobileDrawer from './components/MobileDrawer';
import { FaBars } from 'react-icons/fa';
import { initVoices, cancelAllSpeech } from './utils/speech';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { SupportedLanguageId } from './data/languages/types';

// Map path segments to section IDs
const PATH_TO_SECTION: Record<string, string> = {
  '': 'alphabet',
  'alphabet': 'alphabet',
  'phrases': 'phrases',
  'numbers': 'numbers',
  'time': 'time',
  'words': 'words',
  'quiz': 'quiz',
  'privacy': 'privacy',
  'terms': 'terms',
};

const parsePath = (): { langId?: SupportedLanguageId; section: string } => {
  if (typeof window === 'undefined') return { section: 'alphabet' };

  const segments = window.location.pathname
    .toLowerCase()
    .split('/')
    .filter(Boolean);

  let langId: SupportedLanguageId | undefined;
  let section = 'alphabet';

  if (segments.length === 0) {
    return { section: 'alphabet' };
  }

  // Handle /learn/:lang/:section or /learn/:lang
  if (segments[0] === 'learn') {
    if (segments[1] && ['ru', 'en', 'es', 'fr'].includes(segments[1])) {
      langId = segments[1] as SupportedLanguageId;
      section = segments[2] && PATH_TO_SECTION[segments[2]] ? PATH_TO_SECTION[segments[2]] : 'alphabet';
    } else if (segments[1] && PATH_TO_SECTION[segments[1]]) {
      section = PATH_TO_SECTION[segments[1]];
    }
  } else if (['ru', 'en', 'es', 'fr'].includes(segments[0])) {
    // Handle /:lang/:section or /:lang
    langId = segments[0] as SupportedLanguageId;
    section = segments[1] && PATH_TO_SECTION[segments[1]] ? PATH_TO_SECTION[segments[1]] : 'alphabet';
  } else if (PATH_TO_SECTION[segments[0]]) {
    // Handle root /:section (e.g. /alphabet, /quiz)
    section = PATH_TO_SECTION[segments[0]];
  }

  return { langId, section };
};

const AppContent: React.FC = () => {
  const { currentLanguage, currentMeta, setLanguage, baseLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>(() => parsePath().section);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [speechInitialized, setSpeechInitialized] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Update SEO Title & Meta tags dynamically per language and section
  const updateMeta = useCallback((section: string) => {
    const seoInfo = currentMeta.seo[section] || currentMeta.seo.alphabet;
    if (seoInfo) {
      document.title = seoInfo.title;

      const descTag = document.querySelector('meta[name="description"]');
      if (descTag) descTag.setAttribute('content', seoInfo.description);

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', seoInfo.title);

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', seoInfo.description);

      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', `https://basiclanguage.school/learn/${currentLanguage}/${section}`);
      }
    }
  }, [currentLanguage, currentMeta]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const onPopState = () => {
      const parsed = parsePath();
      if (parsed.langId && parsed.langId !== currentLanguage) {
        setLanguage(parsed.langId);
      }
      setActiveSection(parsed.section);
      updateMeta(parsed.section);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', onPopState);
    updateMeta(activeSection);

    return () => window.removeEventListener('popstate', onPopState);
  }, [currentLanguage, setLanguage, activeSection, updateMeta]);

  // Handle PWA installation prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as any);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as any);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Initialize Speech Synthesis
  useEffect(() => {
    const initSpeech = async () => {
      try {
        await initVoices();
        setSpeechInitialized(true);
      } catch (err) {
        console.error('Failed to initialize speech:', err);
        setSpeechInitialized(true);
      }
    };
    initSpeech();
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return;
    (installPrompt as any).prompt();
    (installPrompt as any).userChoice.then(() => {
      setInstallPrompt(null);
    });
  };

  const handleSectionChange = (section: string) => {
    cancelAllSpeech();
    document.querySelectorAll('audio').forEach(audio => {
      try { audio.pause(); } catch (e) { console.warn('Error pausing audio:', e); }
    });

    const isLearnPrefix = window.location.pathname.startsWith('/learn');
    const newPath = isLearnPrefix ? `/learn/${currentLanguage}/${section}` : `/${section}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({ section, lang: currentLanguage }, '', newPath);
    }

    setActiveSection(section);
    updateMeta(section);
    window.scrollTo(0, 0);
  };

  const handleLanguageChange = (newLangId: SupportedLanguageId) => {
    setLanguage(newLangId);
    const newPath = `/learn/${newLangId}/${activeSection}`;
    window.history.pushState({ section: activeSection, lang: newLangId }, '', newPath);
    window.scrollTo(0, 0);
  };

  const renderActiveSection = () => {
    if (!speechInitialized) {
      return (
        <div className="section loading-section">
          <h2>Loading Speech Engine</h2>
          <p className="loading-message">Initializing voice capabilities. This may take a moment...</p>
          <div className="loading-spinner"></div>
        </div>
      );
    }

    const getSectionTitle = (sectionType: 'phrases' | 'words' | 'numbers' | 'time') => {
      if (baseLanguage === 'es') {
        if (sectionType === 'phrases') return `Frases Básicas (${currentMeta.nativeName})`;
        if (sectionType === 'words') return `Palabras Comunes (${currentMeta.nativeName})`;
        if (sectionType === 'numbers') return `Números (${currentMeta.nativeName})`;
        return `Tiempo y Expresiones (${currentMeta.nativeName})`;
      }
      if (baseLanguage === 'ru') {
        if (sectionType === 'phrases') return `Основные фразы (${currentMeta.nativeName})`;
        if (sectionType === 'words') return `Популярные слова (${currentMeta.nativeName})`;
        if (sectionType === 'numbers') return `Числа (${currentMeta.nativeName})`;
        return `Время и выражения (${currentMeta.nativeName})`;
      }
      if (baseLanguage === 'fr') {
        if (sectionType === 'phrases') return `Phrases de Base (${currentMeta.nativeName})`;
        if (sectionType === 'words') return `Mots Courants (${currentMeta.nativeName})`;
        if (sectionType === 'numbers') return `Nombres (${currentMeta.nativeName})`;
        return `Heure et Expressions (${currentMeta.nativeName})`;
      }
      if (sectionType === 'phrases') return `${currentMeta.name} Essential Phrases`;
      if (sectionType === 'words') return `Common ${currentMeta.name} Words & Vocabulary`;
      if (sectionType === 'numbers') return `${currentMeta.name} Numbers`;
      return `${currentMeta.name} Time Expressions`;
    };

    switch (activeSection) {
      case 'alphabet':
        return <Alphabet data={currentMeta.data.alphabet} />;
      case 'phrases':
        return (
          <Phrases 
            data={currentMeta.data.basicPhrases} 
            title={getSectionTitle('phrases')} 
            contentType="phrases"
          />
        );
      case 'numbers':
      case 'time':
        return (
          <NumbersAndTime 
            numbersData={currentMeta.data.numbers} 
            timeData={currentMeta.data.time || []}
            activeTab={activeSection === 'time' ? 'time' : 'numbers'}
            onTabChange={(tab) => handleSectionChange(tab)}
          />
        );
      case 'words':
        return (
          <Phrases 
            data={currentMeta.data.commonWords} 
            title={getSectionTitle('words')} 
            contentType="words"
          />
        );
      case 'quiz':
        return (
          <Quiz 
            key={`${currentLanguage}-${baseLanguage}`}
            data={{
              alphabet: currentMeta.data.alphabet.map(item => ({
                character: item.letter,
                pronunciation: item.pronunciation,
                example: item.example,
                russianWord: item.russianWord || item.word
              })),
              basicPhrases: currentMeta.data.basicPhrases,
              numbers: currentMeta.data.numbers,
              commonWords: currentMeta.data.commonWords,
              time: currentMeta.data.time || []
            }} 
          />
        );
      case 'privacy':
        return <PrivacyPolicy onNavigate={handleSectionChange} />;
      case 'terms':
        return <TermsOfService onNavigate={handleSectionChange} />;
      default:
        return <Alphabet data={currentMeta.data.alphabet} />;
    }
  };

  return (
    <div className="app">
      <header>
        <div className="header-content">
          <h1 
            onClick={() => handleSectionChange('alphabet')} 
            style={{ cursor: 'pointer' }} 
            title={`Return to ${currentMeta.appName} lessons`}
          >
            {/* Dynamic Emblem: Language-specific flag accent (ES, FR, EN, RU) on Academic Crest */}
            {currentLanguage === 'ru' ? (
              <svg className="app-emblem russia-flag" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Basic Russian emblem" role="img">
                <defs>
                  <linearGradient id="rusEmblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb"/>
                    <stop offset="50%" stopColor="#1e40af"/>
                    <stop offset="100%" stopColor="#0f172a"/>
                  </linearGradient>
                  <linearGradient id="rusGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fde047"/>
                    <stop offset="60%" stopColor="#f59e0b"/>
                    <stop offset="100%" stopColor="#d97706"/>
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#rusEmblemBg)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5"/>
                <g transform="translate(6, 6)">
                  <rect x="0" y="0" width="10" height="2" rx="1" fill="#ffffff" opacity="0.95"/>
                  <rect x="0" y="2.5" width="10" height="2" rx="1" fill="#3b82f6"/>
                  <rect x="0" y="5" width="10" height="2" rx="1" fill="#ef4444"/>
                </g>
                <g transform="translate(0, 3)">
                  <path d="M24 13L8 20.5L24 28L40 20.5L24 13Z" fill="url(#rusGoldGrad)"/>
                  <path d="M14 24.5V32C14 35.5 18 38 24 38C30 38 34 35.5 34 32V24.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  <path d="M40 21V30.5" stroke="url(#rusGoldGrad)" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="40" cy="31.5" r="1.5" fill="url(#rusGoldGrad)"/>
                </g>
              </svg>
            ) : currentLanguage === 'es' ? (
              <svg className="app-emblem spanish-flag" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Basic Spanish emblem" role="img">
                <defs>
                  <linearGradient id="esEmblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7f1d1d"/>
                    <stop offset="50%" stopColor="#1e1b4b"/>
                    <stop offset="100%" stopColor="#0f172a"/>
                  </linearGradient>
                  <linearGradient id="esGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fde047"/>
                    <stop offset="60%" stopColor="#f59e0b"/>
                    <stop offset="100%" stopColor="#d97706"/>
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#esEmblemBg)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5"/>
                {/* Spanish flag accent strip */}
                <g transform="translate(6, 6)">
                  <rect x="0" y="0" width="10" height="2" rx="1" fill="#aa151b"/>
                  <rect x="0" y="2.2" width="10" height="2.6" rx="0.5" fill="#f1bf00"/>
                  <rect x="0" y="5" width="10" height="2" rx="1" fill="#aa151b"/>
                </g>
                <g transform="translate(0, 3)">
                  <path d="M24 13L8 20.5L24 28L40 20.5L24 13Z" fill="url(#esGoldGrad)"/>
                  <path d="M14 24.5V32C14 35.5 18 38 24 38C30 38 34 35.5 34 32V24.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  <path d="M40 21V30.5" stroke="url(#esGoldGrad)" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="40" cy="31.5" r="1.5" fill="url(#esGoldGrad)"/>
                </g>
              </svg>
            ) : currentLanguage === 'fr' ? (
              <svg className="app-emblem french-flag" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Basic French emblem" role="img">
                <defs>
                  <linearGradient id="frEmblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e3a8a"/>
                    <stop offset="50%" stopColor="#1e1b4b"/>
                    <stop offset="100%" stopColor="#0f172a"/>
                  </linearGradient>
                  <linearGradient id="frGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fde047"/>
                    <stop offset="60%" stopColor="#f59e0b"/>
                    <stop offset="100%" stopColor="#d97706"/>
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#frEmblemBg)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5"/>
                {/* French tricolor accent strip */}
                <g transform="translate(6, 6)">
                  <rect x="0" y="0" width="3.3" height="7" rx="1" fill="#002654"/>
                  <rect x="3.3" y="0" width="3.4" height="7" fill="#ffffff"/>
                  <rect x="6.7" y="0" width="3.3" height="7" rx="1" fill="#ce1126"/>
                </g>
                <g transform="translate(0, 3)">
                  <path d="M24 13L8 20.5L24 28L40 20.5L24 13Z" fill="url(#frGoldGrad)"/>
                  <path d="M14 24.5V32C14 35.5 18 38 24 38C30 38 34 35.5 34 32V24.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  <path d="M40 21V30.5" stroke="url(#frGoldGrad)" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="40" cy="31.5" r="1.5" fill="url(#frGoldGrad)"/>
                </g>
              </svg>
            ) : (
              <svg className="app-emblem english-flag" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Basic English emblem" role="img">
                <defs>
                  <linearGradient id="enEmblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e3a8a"/>
                    <stop offset="50%" stopColor="#0f172a"/>
                    <stop offset="100%" stopColor="#312e81"/>
                  </linearGradient>
                  <linearGradient id="enGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a"/>
                    <stop offset="60%" stopColor="#f59e0b"/>
                    <stop offset="100%" stopColor="#b45309"/>
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#enEmblemBg)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
                {/* UK/US Accent */}
                <g transform="translate(6, 6)">
                  <rect x="0" y="0" width="10" height="2" rx="1" fill="#ef4444"/>
                  <rect x="0" y="2.5" width="10" height="2" rx="1" fill="#ffffff"/>
                  <rect x="0" y="5" width="10" height="2" rx="1" fill="#2563eb"/>
                </g>
                <g transform="translate(0, 3)">
                  <path d="M24 13L8 20.5L24 28L40 20.5L24 13Z" fill="url(#enGoldGrad)"/>
                  <path d="M14 24.5V32C14 35.5 18 38 24 38C30 38 34 35.5 34 32V24.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  <path d="M40 21V30.5" stroke="url(#enGoldGrad)" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="40" cy="31.5" r="1.5" fill="url(#enGoldGrad)"/>
                </g>
              </svg>
            )}
            {currentMeta.appName}
          </h1>

          {/* Desktop Actions: Spacious row on wider screens */}
          <div className="header-actions desktop-header-actions">
            {/* Playback speed selector (.50x to 1.25x) */}
            <VoiceSpeedControl />

            {/* Duolingo-style language switcher */}
            <LanguageSwitcher onLanguageChange={handleLanguageChange} />

            {installPrompt && (
              <button onClick={handleInstallClick} className="install-button">
                Install App
              </button>
            )}
            <UserMenu onNavigate={handleSectionChange} />
          </div>

          {/* Mobile Actions: Clean, uncluttered, thumb-friendly */}
          <div className="header-actions mobile-header-actions">
            <LanguageSwitcher onLanguageChange={handleLanguageChange} />
            <button
              type="button"
              className="mobile-hamburger-btn"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open settings and menu"
              title="Menu"
            >
              <FaBars />
            </button>
          </div>
        </div>

        <Navigation 
          activeSection={activeSection} 
          setActiveSection={handleSectionChange} 
          isOpen={false}
          _onClose={() => {}}
        />

        {/* Mobile Pull-out Drawer Menu */}
        <MobileDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onNavigate={handleSectionChange}
          installPrompt={installPrompt}
          onInstallClick={handleInstallClick}
        />
      </header>
      
      <main tabIndex={-1}>
        {renderActiveSection()}
      </main>
      
      <BottomNavigation 
        activeSection={activeSection} 
        setActiveSection={handleSectionChange} 
      />
      
      <footer>
        <p>
          © {new Date().getFullYear()} Basic Language School · All Rights Reserved ·{' '}
          <a
            href="/privacy"
            className="footer-link"
            onClick={(e) => {
              e.preventDefault();
              handleSectionChange('privacy');
            }}
          >
            Privacy Policy
          </a>{' '}
          ·{' '}
          <a
            href="/terms"
            className="footer-link"
            onClick={(e) => {
              e.preventDefault();
              handleSectionChange('terms');
            }}
          >
            Terms of Service
          </a>
        </p>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;