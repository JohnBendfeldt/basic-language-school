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
  FaCloudDownloadAlt,
  FaCheck,
  FaGlobe,
  FaSearch
} from 'react-icons/fa';
import { useLanguage, SpeechSpeed } from '../contexts/LanguageContext';
import { SupportedLanguageId } from '../data/languages/types';
import { FlagIcon } from './FlagIcon';
import AuthModal from './AuthModal';
import ProgressModal from './ProgressModal';
import { supabase, signOutUser } from '../services/supabaseClient';
import { getComponentChrome, getLocalizedAppName, getLocalizedLanguageName } from '../utils/pageDictionary';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
  onLanguageChange?: (langId: SupportedLanguageId) => void;
  onOpenSearch?: () => void;
  onOpenOfflineAudio?: () => void;
  installPrompt?: any;
  onInstallClick?: () => void;
}

const SPEEDS: { value: SpeechSpeed; label: string; key: 'slow' | 'learner' | 'relaxed' | 'standard' | 'brisk' | 'fast' }[] = [
  { value: 0.5, label: '0.50×', key: 'slow' },
  { value: 0.75, label: '0.75×', key: 'learner' },
  { value: 0.9, label: '0.90×', key: 'relaxed' },
  { value: 1.0, label: '1.0×', key: 'standard' },
  { value: 1.1, label: '1.10×', key: 'brisk' },
  { value: 1.25, label: '1.25×', key: 'fast' },
];

interface DrawerCopy {
  searchTitle: string;
  searchSubtitle: string;
  offlineTitle: string;
  offlineSubtitle: string;
  speedSubtitle: string;
  cloudSynced: string;
  speeds: Record<'slow' | 'learner' | 'relaxed' | 'standard' | 'brisk' | 'fast', string>;
}

const DRAWER_COPY: Record<SupportedLanguageId, DrawerCopy> = {
  en: {
    searchTitle: 'Search Concepts & Words',
    searchSubtitle: 'Instant lookup across phrases & grammar',
    offlineTitle: 'Offline Audio Courses',
    offlineSubtitle: 'Download courses for Airplane Mode playback',
    speedSubtitle: 'Adjust neural pronunciation pacing for clear listening',
    cloudSynced: 'Cloud Synced',
    speeds: { slow: 'Slow', learner: 'Learner', relaxed: 'Relaxed', standard: 'Standard', brisk: 'Brisk', fast: 'Fast' },
  },
  es: {
    searchTitle: 'Buscar palabras y conceptos',
    searchSubtitle: 'Búsqueda instantánea en frases y gramática',
    offlineTitle: 'Cursos de audio sin conexión',
    offlineSubtitle: 'Descarga paquetes para escuchar en modo avión',
    speedSubtitle: 'Ajusta el ritmo de pronunciación para escuchar con claridad',
    cloudSynced: 'Sincronizado en la nube',
    speeds: { slow: 'Lento', learner: 'Aprendiz', relaxed: 'Pausado', standard: 'Normal', brisk: 'Ágil', fast: 'Rápido' },
  },
  fr: {
    searchTitle: 'Rechercher mots et concepts',
    searchSubtitle: 'Recherche instantanée dans les phrases et la grammaire',
    offlineTitle: 'Cours audio hors ligne',
    offlineSubtitle: 'Téléchargez les voix pour le mode avion',
    speedSubtitle: 'Ajustez le rythme de prononciation pour une écoute claire',
    cloudSynced: 'Synchronisé dans le cloud',
    speeds: { slow: 'Lent', learner: 'Apprenant', relaxed: 'Posé', standard: 'Normal', brisk: 'Vif', fast: 'Rapide' },
  },
  de: {
    searchTitle: 'Wörter & Konzepte suchen',
    searchSubtitle: 'Sofortsuche in Sätzen und Grammatik',
    offlineTitle: 'Offline-Audiokurse',
    offlineSubtitle: 'Sprachpakete für den Flugmodus herunterladen',
    speedSubtitle: 'Sprechtempo für klares Hörverständnis anpassen',
    cloudSynced: 'In der Cloud synchronisiert',
    speeds: { slow: 'Langsam', learner: 'Lernend', relaxed: 'Ruhig', standard: 'Standard', brisk: 'Flott', fast: 'Schnell' },
  },
  pt: {
    searchTitle: 'Pesquisar palavras e conceitos',
    searchSubtitle: 'Busca instantânea em frases e gramática',
    offlineTitle: 'Cursos de áudio offline',
    offlineSubtitle: 'Baixe pacotes para ouvir no modo avião',
    speedSubtitle: 'Ajuste o ritmo da pronúncia para ouvir com clareza',
    cloudSynced: 'Sincronizado na nuvem',
    speeds: { slow: 'Lento', learner: 'Iniciante', relaxed: 'Calmo', standard: 'Padrão', brisk: 'Ágil', fast: 'Rápido' },
  },
  ru: {
    searchTitle: 'Поиск слов и понятий',
    searchSubtitle: 'Мгновенный поиск по фразам и грамматике',
    offlineTitle: 'Офлайн-аудиокурсы',
    offlineSubtitle: 'Скачайте озвучку для работы в авиарежиме',
    speedSubtitle: 'Настройте темп произношения для чёткого восприятия',
    cloudSynced: 'Синхронизировано в облаке',
    speeds: { slow: 'Медленно', learner: 'Учебный', relaxed: 'Спокойно', standard: 'Обычно', brisk: 'Бодро', fast: 'Быстро' },
  },
  id: {
    searchTitle: 'Cari Konsep & Kata',
    searchSubtitle: 'Pencarian instan di frasa & tata bahasa',
    offlineTitle: 'Kursus Audio Offline',
    offlineSubtitle: 'Unduh paket suara untuk Mode Pesawat',
    speedSubtitle: 'Atur kecepatan pelafalan agar terdengar jelas',
    cloudSynced: 'Tersinkron di Cloud',
    speeds: { slow: 'Lambat', learner: 'Pelajar', relaxed: 'Santai', standard: 'Standar', brisk: 'Gesit', fast: 'Cepat' },
  },
  tr: {
    searchTitle: 'Kavram ve Kelime Ara',
    searchSubtitle: 'İfadeler ve dilbilgisinde anında arama',
    offlineTitle: 'Çevrimdışı Ses Kursları',
    offlineSubtitle: 'Uçak modunda dinlemek için paketleri indirin',
    speedSubtitle: 'Net dinleme için telaffuz hızını ayarlayın',
    cloudSynced: 'Bulutla Eşitlendi',
    speeds: { slow: 'Yavaş', learner: 'Öğrenci', relaxed: 'Rahat', standard: 'Standart', brisk: 'Canlı', fast: 'Hızlı' },
  },
  ja: {
    searchTitle: '単語と概念を検索',
    searchSubtitle: 'フレーズと文法を瞬時に検索',
    offlineTitle: 'オフライン音声コース',
    offlineSubtitle: '機内モード用に発音パックをダウンロード',
    speedSubtitle: '聞き取りやすい発音スピードに調整',
    cloudSynced: 'クラウド同期済み',
    speeds: { slow: 'ゆっくり', learner: '学習用', relaxed: 'やや遅め', standard: '標準', brisk: 'やや速め', fast: '速い' },
  },
  ko: {
    searchTitle: '개념 및 단어 검색',
    searchSubtitle: '회화 및 문법에서 즉시 검색',
    offlineTitle: '오프라인 오디오 코스',
    offlineSubtitle: '비행기 모드용 발음 팩 다운로드',
    speedSubtitle: '명확한 청취를 위해 발음 속도를 조절하세요',
    cloudSynced: '클라우드 동기화됨',
    speeds: { slow: '느리게', learner: '학습자용', relaxed: '여유롭게', standard: '표준', brisk: '조금 빠르게', fast: '빠르게' },
  },
  zh: {
    searchTitle: '搜索词汇与概念',
    searchSubtitle: '在短语与语法中即时查找',
    offlineTitle: '离线语音课程',
    offlineSubtitle: '下载发音包，飞行模式下也能畅听练习',
    speedSubtitle: '调节语音语速，清晰跟读与听力练习',
    cloudSynced: '已云端同步',
    speeds: { slow: '慢速', learner: '学习', relaxed: '舒缓', standard: '标准', brisk: '轻快', fast: '快速' },
  },
  hi: {
    searchTitle: 'शब्द और अवधारणाएँ खोजें',
    searchSubtitle: 'वाक्यांशों और व्याकरण में तुरंत खोज',
    offlineTitle: 'ऑफ़लाइन ऑडियो कोर्स',
    offlineSubtitle: 'एयरप्लेन मोड के लिए उच्चारण पैक डाउनलोड करें',
    speedSubtitle: 'स्पष्ट सुनने के लिए उच्चारण की गति समायोजित करें',
    cloudSynced: 'क्लाउड से सिंक',
    speeds: { slow: 'धीमा', learner: 'सीखने योग्य', relaxed: 'सहज', standard: 'सामान्य', brisk: 'तेज़', fast: 'द्रुत' },
  },
  ar: {
    searchTitle: 'البحث عن الكلمات والمفاهيم',
    searchSubtitle: 'بحث فوري في العبارات والقواعد',
    offlineTitle: 'دورات الصوت دون اتصال',
    offlineSubtitle: 'نزّل حزم النطق للعمل في وضع الطيران',
    speedSubtitle: 'اضبط سرعة النطق للاستماع بوضوح',
    cloudSynced: 'متزامن سحابياً',
    speeds: { slow: 'بطيء', learner: 'للمتعلم', relaxed: 'هادئ', standard: 'قياسي', brisk: 'نشط', fast: 'سريع' },
  },
  bn: {
    searchTitle: 'শব্দ ও ধারণা খুঁজুন',
    searchSubtitle: 'বাক্যাংশ ও ব্যাকরণে তাৎক্ষণিক অনুসন্ধান',
    offlineTitle: 'অফলাইন অডিও কোর্স',
    offlineSubtitle: 'এয়ারপ্লেন মোডে শোনার জন্য অডিও ডাউনলোড করুন',
    speedSubtitle: 'স্পষ্ট শোনার জন্য উচ্চারণের গতি সামঞ্জস্য করুন',
    cloudSynced: 'ক্লাউডে সিঙ্ক করা',
    speeds: { slow: 'ধীর', learner: 'শিক্ষার্থী', relaxed: 'সহজ', standard: 'স্বাভাবিক', brisk: 'চটপটে', fast: 'দ্রুত' },
  },
  ur: {
    searchTitle: 'الفاظ اور تصورات تلاش کریں',
    searchSubtitle: 'جملوں اور گرامر میں فوری تلاش',
    offlineTitle: 'آف لائن آڈیو کورسز',
    offlineSubtitle: 'ایئر پلین موڈ کے لیے آڈیو پیک ڈاؤن لوڈ کریں',
    speedSubtitle: 'واضح سننے کے لیے تلفظ کی رفتار ایڈجسٹ کریں',
    cloudSynced: 'کلاؤڈ سے ہم آہنگ',
    speeds: { slow: 'آہستہ', learner: 'سیکھنے والا', relaxed: 'پرسکون', standard: 'معیاری', brisk: 'تیز تر', fast: 'تیز' },
  },
};

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onLanguageChange,
  onOpenSearch,
  onOpenOfflineAudio,
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

  // Sync Supabase user only when needed and guard against unmounted updates
  useEffect(() => {
    if (!supabase || !isOpen) return;
    let active = true;

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (active) setCurrentUser(user);
    }).catch(() => {});

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setCurrentUser(session?.user ?? null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [isOpen]);

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
  const drawerCopy = DRAWER_COPY[baseLanguage] || DRAWER_COPY.en;
  const localizedAppName = getLocalizedAppName(targetLanguage, baseLanguage, targetMeta.appName || 'Language School');
  const localizedBaseName = getLocalizedLanguageName(baseLanguage, baseLanguage, baseMeta.name);
  const localizedTargetName = getLocalizedLanguageName(targetLanguage, baseLanguage, targetMeta.name);

  const handleDrawerSwap = () => {
    const newTargetLang = baseLanguage;
    swapLanguages();
    onLanguageChange?.(newTargetLang);
  };

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
                    <h3>{drawerCopy.searchTitle}</h3>
                    <p>{drawerCopy.searchSubtitle}</p>
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
                  onClick={handleDrawerSwap}
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
                {drawerCopy.speedSubtitle}
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
                      <span className="drawer-speed-desc">{drawerCopy.speeds[item.key]}</span>
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

            {/* Section 3b: Offline Audio Courses (Airplane Mode) */}
            {onOpenOfflineAudio && (
              <div
                className="drawer-card drawer-offline-card"
                data-testid="drawer-offline-audio-card"
                onClick={() => {
                  onClose();
                  onOpenOfflineAudio();
                }}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    onClose();
                    onOpenOfflineAudio();
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="drawer-action-content">
                  <div className="drawer-action-icon offline-icon">
                    <FaCloudDownloadAlt />
                  </div>
                  <div className="drawer-action-text">
                    <h3>{drawerCopy.offlineTitle}</h3>
                    <p>{drawerCopy.offlineSubtitle}</p>
                  </div>
                </div>
                <span className="drawer-action-arrow">›</span>
              </div>
            )}

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
                    <span className="drawer-user-badge">{drawerCopy.cloudSynced}</span>
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
