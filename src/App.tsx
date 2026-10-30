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
import About from './components/About';
import MobileDrawer from './components/MobileDrawer';
import AppEmblem from './components/AppEmblem';
import SearchModal from './components/SearchModal';
import { SearchResultItem } from './utils/searchEngine';
import { FaBars, FaSearch } from 'react-icons/fa';
import { initVoices, cancelAllSpeech } from './utils/speech';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { SupportedLanguageId } from './data/languages/types';
import { SUPPORTED_LANGUAGES } from './data/languages';
import { getPageContent, getLocalizedAppName, getComponentChrome } from './utils/pageDictionary';

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
  'about': 'about',
  'contact': 'about',
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
    if (segments[1] && segments[1] in SUPPORTED_LANGUAGES) {
      langId = segments[1] as SupportedLanguageId;
      section = segments[2] && PATH_TO_SECTION[segments[2]] ? PATH_TO_SECTION[segments[2]] : 'alphabet';
    } else if (segments[1] && PATH_TO_SECTION[segments[1]]) {
      section = PATH_TO_SECTION[segments[1]];
    }
  } else if (segments[0] in SUPPORTED_LANGUAGES) {
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [alphabetSubTab, setAlphabetSubTab] = useState<'alphabet' | 'grammar'>('alphabet');
  const [grammarInitialTab, setGrammarInitialTab] = useState<'flashcards' | 'gender' | 'verbs' | 'descriptions'>('flashcards');

  // Listen for Cmd+K or Ctrl+K to toggle Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchResultSelect = (result: SearchResultItem) => {
    setIsSearchOpen(false);
    if (result.section === 'alphabet' && result.grammarTab) {
      setAlphabetSubTab('grammar');
      setGrammarInitialTab(result.grammarTab);
      handleSectionChange('alphabet');
    } else {
      if (result.section === 'alphabet') {
        setAlphabetSubTab('alphabet');
      }
      handleSectionChange(result.section);
    }
  };

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
      if (baseLanguage === 'en') {
        if (sectionType === 'phrases') return `${currentMeta.name} Essential Phrases`;
        if (sectionType === 'words') return `Common ${currentMeta.name} Words & Vocabulary`;
        if (sectionType === 'numbers') return `${currentMeta.name} Numbers`;
        return `${currentMeta.name} Time Expressions`;
      }
      return getPageContent(sectionType, currentLanguage, baseLanguage).title;
    };

    switch (activeSection) {
      case 'alphabet':
        return (
          <Alphabet 
            data={currentMeta.data.alphabet} 
            initialSubTab={alphabetSubTab}
            grammarInitialTab={grammarInitialTab}
          />
        );
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
      case 'about':
        return <About onNavigate={handleSectionChange} />;
      default:
        return <Alphabet data={currentMeta.data.alphabet} />;
    }
  };

  const chrome = getComponentChrome(baseLanguage);
  const localizedAppName = getLocalizedAppName(currentLanguage, baseLanguage, currentMeta.appName);

  return (
    <div className="app">
      <header>
        <div className="header-content">
          <h1 
            onClick={() => handleSectionChange('alphabet')} 
            style={{ cursor: 'pointer' }} 
            title={`Return to ${localizedAppName} lessons`}
          >
            <AppEmblem language={currentLanguage} />
            {localizedAppName}
          </h1>

          {/* Desktop Actions: Spacious row on wider screens */}
          <div className="header-actions desktop-header-actions">
            {/* Quick Concept & Word Search */}
            <button
              type="button"
              className="header-search-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search vocabulary and phrases"
              title="Search concepts (⌘K)"
            >
              <FaSearch className="search-btn-icon" />
              <span className="search-btn-label">Search</span>
              <kbd className="search-btn-kbd">⌘K</kbd>
            </button>

            {/* Playback speed selector (.50x to 1.25x) */}
            <VoiceSpeedControl />

            {/* Duolingo-style language switcher */}
            <LanguageSwitcher onLanguageChange={handleLanguageChange} />

            {installPrompt && (
              <button onClick={handleInstallClick} className="install-button">
                {chrome.installApp}
              </button>
            )}
            <UserMenu onNavigate={handleSectionChange} />
          </div>

          {/* Mobile Actions: Clean, uncluttered, thumb-friendly */}
          <div className="header-actions mobile-header-actions">
            <button
              type="button"
              className="mobile-search-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search vocabulary and phrases"
              title="Search"
            >
              <FaSearch />
            </button>
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
          onOpenSearch={() => setIsSearchOpen(true)}
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

      {/* Global Concept & Vocabulary Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSearchResultSelect}
        appData={currentMeta.data}
      />
      
      <footer>
        <p>
          © {new Date().getFullYear()} Basic Language School · {chrome.allRightsReserved.replace(/\.$/, '')} ·{' '}
          <a
            href="/about"
            className="footer-link"
            onClick={(e) => {
              e.preventDefault();
              handleSectionChange('about');
            }}
          >
            {chrome.aboutContact}
          </a>{' '}
          ·{' '}
          <a
            href="/privacy"
            className="footer-link"
            onClick={(e) => {
              e.preventDefault();
              handleSectionChange('privacy');
            }}
          >
            {chrome.privacyPolicy}
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
            {chrome.termsOfService}
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