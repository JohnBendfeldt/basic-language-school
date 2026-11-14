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
import OfflineAudioModal from './components/OfflineAudioModal';
import { SearchResultItem } from './utils/searchEngine';
import { FaBars, FaCheckCircle, FaCloudDownloadAlt, FaSearch } from 'react-icons/fa';
import { initVoices, cancelAllSpeech } from './utils/speech';
import {
  getVerifiedOfflineLanguages,
  readStoredDownloadedLanguages,
  subscribeOfflineAudioChanges,
} from './services/offlineAudioService';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { SupportedLanguageId } from './data/languages/types';
import { SUPPORTED_LANGUAGES, isSupportedLanguageId } from './data/languages';
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

const parsePath = (): { langId?: SupportedLanguageId; section: string; subTab?: 'alphabet' | 'grammar' } => {
  if (typeof window === 'undefined') return { section: 'alphabet' };

  const segments = window.location.pathname
    .toLowerCase()
    .split('/')
    .filter(Boolean);

  let langId: SupportedLanguageId | undefined;
  let section = 'alphabet';
  let subTab: 'alphabet' | 'grammar' | undefined;

  if (segments.length === 0) {
    return { section: 'alphabet' };
  }

  const hasOwn = (obj: object, key: string): boolean =>
    Object.prototype.hasOwnProperty.call(obj, key);

  // Handle /learn/:lang/:section or /learn/:lang
  if (segments[0] === 'learn') {
    if (isSupportedLanguageId(segments[1])) {
      langId = segments[1];
      if (segments[2] === 'grammar') {
        section = 'alphabet';
        subTab = 'grammar';
      } else {
        section = segments[2] && hasOwn(PATH_TO_SECTION, segments[2]) ? PATH_TO_SECTION[segments[2]] : 'alphabet';
      }
    } else if (segments[1] && hasOwn(PATH_TO_SECTION, segments[1])) {
      section = PATH_TO_SECTION[segments[1]];
    }
  } else if (isSupportedLanguageId(segments[0])) {
    // Handle /:lang/:section or /:lang
    langId = segments[0];
    if (segments[1] === 'grammar') {
      section = 'alphabet';
      subTab = 'grammar';
    } else {
      section = segments[1] && hasOwn(PATH_TO_SECTION, segments[1]) ? PATH_TO_SECTION[segments[1]] : 'alphabet';
    }
  } else if (hasOwn(PATH_TO_SECTION, segments[0])) {
    // Handle root /:section (e.g. /alphabet, /quiz)
    section = PATH_TO_SECTION[segments[0]];
  }

  return { langId, section, subTab };
};

const OFFLINE_BTN_TITLES: Record<SupportedLanguageId, { download: string; ready: string }> = {
  en: { download: 'Download Offline Audio Courses', ready: 'Offline Audio Ready — Manage Courses' },
  es: { download: 'Descargar cursos de audio sin conexión', ready: 'Audio sin conexión listo — Gestionar' },
  fr: { download: 'Télécharger les cours audio hors ligne', ready: 'Audio hors ligne prêt — Gérer' },
  de: { download: 'Offline-Audiokurse herunterladen', ready: 'Offline-Audio bereit — Verwalten' },
  pt: { download: 'Baixar cursos de áudio offline', ready: 'Áudio offline pronto — Gerenciar' },
  ru: { download: 'Скачать офлайн-аудиокурсы', ready: 'Офлайн-аудио готово — Управление' },
  id: { download: 'Unduh Kursus Audio Offline', ready: 'Audio Offline Siap — Kelola' },
  tr: { download: 'Çevrimdışı Ses Kurslarını İndir', ready: 'Çevrimdışı Ses Hazır — Yönet' },
  zh: { download: '下载离线语音课程', ready: '离线语音已就绪 — 管理课程' },
  ja: { download: 'オフライン音声コースをダウンロード', ready: 'オフライン音声準備完了 — 管理' },
  ko: { download: '오프라인 오디오 코스 다운로드', ready: '오프라인 오디오 준비됨 — 관리' },
  hi: { download: 'ऑफ़लाइन ऑडियो कोर्स डाउनलोड करें', ready: 'ऑफ़लाइन ऑडियो तैयार — प्रबंधित करें' },
  ar: { download: 'تنزيل دورات الصوت دون اتصال', ready: 'الصوت دون اتصال جاهز — إدارة' },
  bn: { download: 'অফলাইন অডিও কোর্স ডাউনলোড করুন', ready: 'অফলাইন অডিও প্রস্তুত — পরিচালনা' },
  ur: { download: 'آف لائن آڈیو کورسز ڈاؤن لوڈ کریں', ready: 'آف لائن آڈیو تیار — انتظام کریں' },
};

const AppContent: React.FC = () => {
  const { currentLanguage, currentMeta, setLanguage, baseLanguage } = useLanguage();
  const parsed = parsePath();
  const [activeSection, setActiveSection] = useState<string>(() => parsed.section);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState(false);
  const [offlineModalFromInstall, setOfflineModalFromInstall] = useState(false);
  const [downloadedOfflineLangs, setDownloadedOfflineLangs] = useState<Set<SupportedLanguageId>>(
    () => new Set(readStoredDownloadedLanguages())
  );
  const [alphabetSubTab, setAlphabetSubTab] = useState<'alphabet' | 'grammar'>(() => parsed.subTab || 'alphabet');
  const [grammarInitialTab, setGrammarInitialTab] = useState<'flashcards' | 'gender' | 'verbs' | 'descriptions'>('flashcards');

  // Platform-aware search shortcut (⌘K on macOS/iOS, Ctrl K on Windows/Linux)
  const [searchShortcut, setSearchShortcut] = useState({
    kbd: '⌘K',
    title: 'Search concepts (⌘K)',
  });

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const isMac = (
        /Mac|iPhone|iPod|iPad/i.test(navigator.platform || '') ||
        /Mac OS X/i.test(navigator.userAgent || '')
      );
      if (!isMac) {
        setSearchShortcut({
          kbd: 'Ctrl K',
          title: 'Search concepts (Ctrl+K)',
        });
      }
    }
  }, []);

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
    const safeSection = Object.prototype.hasOwnProperty.call(currentMeta.seo, section) ? section : 'alphabet';
    const seoInfo = currentMeta.seo[safeSection] || currentMeta.seo.alphabet;
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
        canonical.setAttribute('href', `https://basiclanguage.school/learn/${currentLanguage}/${safeSection}`);
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
      if (parsed.subTab) {
        setAlphabetSubTab(parsed.subTab);
      }
      updateMeta(parsed.section);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', onPopState);
    updateMeta(activeSection);

    return () => window.removeEventListener('popstate', onPopState);
  }, [currentLanguage, setLanguage, activeSection, updateMeta]);

  // Keep downloaded offline audio status synchronized across modals & header
  useEffect(() => {
    let active = true;
    getVerifiedOfflineLanguages()
      .then((verified) => {
        if (active) setDownloadedOfflineLangs(verified);
      })
      .catch(() => {});

    const unsubscribe = subscribeOfflineAudioChanges(() => {
      if (active) {
        setDownloadedOfflineLangs(new Set(readStoredDownloadedLanguages()));
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  // Handle PWA installation prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setOfflineModalFromInstall(true);
      setIsOfflineModalOpen(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as any);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as any);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Initialize Speech Synthesis fallback voices asynchronously without blocking UI render
  useEffect(() => {
    initVoices().catch((err) => {
      console.error('Failed to initialize speech:', err);
    });
  }, []);

  const handleInstallClick = () => {
    setIsDrawerOpen(false);
    if (!installPrompt) {
      setOfflineModalFromInstall(true);
      setIsOfflineModalOpen(true);
      return;
    }
    (installPrompt as any).prompt();
    Promise.resolve((installPrompt as any).userChoice)
      .then((choice: any) => {
        setInstallPrompt(null);
        if (!choice || choice.outcome !== 'dismissed') {
          setOfflineModalFromInstall(true);
          setIsOfflineModalOpen(true);
        }
      })
      .catch(() => {
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
    if (newLangId !== currentLanguage) {
      setLanguage(newLangId);
    }
    const newPath = `/learn/${newLangId}/${activeSection}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({ section: activeSection, lang: newLangId }, '', newPath);
    }
    window.scrollTo(0, 0);
  };

  const renderActiveSection = () => {
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
  const isActivePairOfflineReady =
    downloadedOfflineLangs.has(currentLanguage) && downloadedOfflineLangs.has(baseLanguage);
  const offlineBtnCopy = OFFLINE_BTN_TITLES[baseLanguage] || OFFLINE_BTN_TITLES.en;
  const offlineBtnLabel = isActivePairOfflineReady ? offlineBtnCopy.ready : offlineBtnCopy.download;

  return (
    <div className="app" data-target-lang={currentLanguage} data-base-lang={baseLanguage}>
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
              aria-label={chrome.searchTitle || searchShortcut.title}
              title={chrome.searchTitle || searchShortcut.title}
            >
              <FaSearch className="search-btn-icon" />
              <span className="search-btn-label">{chrome.search || 'Search'}</span>
              <kbd className="search-btn-kbd">{searchShortcut.kbd}</kbd>
            </button>

            {/* Playback speed selector (.50x to 1.25x) */}
            <VoiceSpeedControl />

            {/* Duolingo-style language switcher */}
            <LanguageSwitcher onLanguageChange={handleLanguageChange} />

            {/* Offline Audio Course Downloader */}
            <button
              type="button"
              data-testid="header-offline-btn"
              className={`header-offline-btn ${isActivePairOfflineReady ? 'offline-ready' : ''}`}
              onClick={() => {
                setOfflineModalFromInstall(false);
                setIsOfflineModalOpen(true);
              }}
              aria-label={offlineBtnLabel}
              title={offlineBtnLabel}
            >
              {isActivePairOfflineReady ? <FaCheckCircle /> : <FaCloudDownloadAlt />}
            </button>

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
              aria-label={chrome.searchTitle || searchShortcut.title}
              title={chrome.search || 'Search'}
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
        />

        {/* Mobile Pull-out Drawer Menu */}
        <MobileDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onNavigate={handleSectionChange}
          onLanguageChange={handleLanguageChange}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenOfflineAudio={() => {
            setOfflineModalFromInstall(false);
            setIsOfflineModalOpen(true);
          }}
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

      {/* Offline Audio Course Downloader Modal */}
      <OfflineAudioModal
        isOpen={isOfflineModalOpen}
        onClose={() => setIsOfflineModalOpen(false)}
        openedFromInstall={offlineModalFromInstall}
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