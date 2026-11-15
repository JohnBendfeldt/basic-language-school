import React, { useEffect, useState, useMemo, useRef } from 'react';
import { FaTimes, FaTrophy, FaGraduationCap, FaRedo, FaCheckCircle, FaChartBar, FaArrowRight, FaFire, FaChevronDown, FaCheck } from 'react-icons/fa';
import { ProgressService } from '../services/progressService';
import { UserStats, WordProgress, MASTERY_THRESHOLD } from '../types/progress';
import { PROGRESS_MODAL_COPY } from '../utils/progressModalCopy';
import PronunciationButton from './PronunciationButton';
import { FlagIcon } from './FlagIcon';
import { containsCyrillic } from '../utils/transliteration';
import { useLanguage } from '../contexts/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { SupportedLanguageId } from '../data/languages/types';
import { getLocalizedLanguageName, localizeCategoryBadge } from '../utils/pageDictionary';
import { resolveTranslation } from '../utils/translationResolver';
import { useModalAccessibility } from '../hooks/useModalAccessibility';

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string | null;
  languageId?: string;
}

const getCurriculumTotal = (langId: string): number => {
  const meta = SUPPORTED_LANGUAGES[langId as SupportedLanguageId];
  if (!meta || !meta.data) return 75;
  const d = meta.data;
  return (
    (d.alphabet?.length || 0) +
    (d.basicPhrases?.length || 0) +
    (d.numbers?.length || 0) +
    (d.commonWords?.length || 0) +
    (d.time?.length || 0)
  );
};

const getWordReviewDetails = (item: WordProgress, currentLanguage: string) => {
  // If targetWord/meaningWord were explicitly recorded, use them directly
  if (item.targetWord) {
    const target = item.targetWord;
    const meaning = item.meaningWord || (item.prompt === target ? item.answer : item.prompt);
    const audioTarget = target.includes('/') ? target.split('/')[0].trim() : target;
    return { target, audioTarget, meaning };
  }

  let target = item.prompt;
  let meaning = item.answer;

  if (currentLanguage === 'ru') {
    const isPromptRussian = containsCyrillic(item.prompt);
    const isAnswerRussian = containsCyrillic(item.answer);
    if (!isPromptRussian && isAnswerRussian) {
      target = item.answer;
      meaning = item.prompt;
    }
  } else {
    // For Spanish, French, English etc.:
    // If wordId ends with '-to-target', the prompt was the English meaning and the answer was the foreign target!
    if (item.wordId && item.wordId.endsWith('-to-target')) {
      target = item.answer;
      meaning = item.prompt;
    }
  }

  // Clean target for audio (strip slashes/alternatives)
  const audioTarget = target.includes('/') ? target.split('/')[0].trim() : target;

  return {
    target,
    audioTarget,
    meaning
  };
};

export const ProgressModal: React.FC<ProgressModalProps> = ({ isOpen, onClose, userEmail, languageId }) => {
  const { currentLanguage: contextLang, baseLanguage, setLanguage } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<string>(() => languageId || contextLang || 'ru');
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [masteryOverview, setMasteryOverview] = useState<Record<string, { wordsMastered: number; totalItems: number; percentMastered: number }>>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);

  useModalAccessibility({
    isOpen,
    onClose,
    modalRef,
    onEscape: () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
        dropdownTriggerRef.current?.focus({ preventScroll: true });
        return true;
      }
      return false;
    },
  });

  // Sync selected language when modal opens or languageId changes
  useEffect(() => {
    if (isOpen) {
      setSelectedLang(languageId || contextLang || 'ru');
      setIsDropdownOpen(false);
    }
  }, [isOpen, languageId, contextLang]);

  // Click outside listener to close language dropdown and focus selected option on open
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      const selectedOpt =
        listboxRef.current?.querySelector<HTMLButtonElement>('[role="option"][aria-selected="true"]') ||
        listboxRef.current?.querySelector<HTMLButtonElement>('[role="option"]');
      selectedOpt?.focus({ preventScroll: true });
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Fetch stats for active selected language and multi-language overview
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const languageList = Object.keys(SUPPORTED_LANGUAGES).map(id => ({
        id,
        totalItems: getCurriculumTotal(id)
      }));

      Promise.all([
        ProgressService.getUserStats(selectedLang),
        ProgressService.getMultiLanguageMastery(languageList)
      ])
        .then(([statsData, multiData]) => {
          setStats(statsData);
          setMasteryOverview(multiData);
        })
        .catch(err => console.error('Error fetching progress stats:', err))
        .finally(() => setLoading(false));
    }
  }, [isOpen, selectedLang]);

  const activeMeta = useMemo(() => {
    return SUPPORTED_LANGUAGES[selectedLang as SupportedLanguageId] || SUPPORTED_LANGUAGES.ru;
  }, [selectedLang]);

  const totalCurriculum = useMemo(() => {
    return getCurriculumTotal(selectedLang);
  }, [selectedLang]);

  const percentMastered = useMemo(() => {
    if (!stats || totalCurriculum <= 0) return 0;
    return Math.min(100, Math.round((stats.wordsMasteredCount / totalCurriculum) * 100));
  }, [stats, totalCurriculum]);

  if (!isOpen) return null;

  const localizedActiveLangName = getLocalizedLanguageName(selectedLang, baseLanguage, activeMeta.name);
  const selectedTargetDir = selectedLang === 'ar' || selectedLang === 'ur' ? 'rtl' : 'ltr';
  const baseDir = baseLanguage === 'ar' || baseLanguage === 'ur' ? 'rtl' : 'ltr';

  const modalCopy = (() => {
    const translated = PROGRESS_MODAL_COPY[baseLanguage];
    if (translated) return translated;
    switch (baseLanguage) {
      case 'ru':
        return {
          title: 'Ваш прогресс обучения',
          selectLanguageLabel: 'Язык курса',
          loggedInAs: (email: string) => `Вы вошли как ${email}`,
          guestMode: 'Гостевой режим (сохранено в браузере)',
          loading: 'Загрузка статистики...',
          noHistoryTitle: 'Истории тестов пока нет',
          noHistoryDesc: (langName: string) =>
            `Проходите тесты и изучайте фразы (${langName}), чтобы отслеживать точность, серию и выученные слова!`,
          switchToPractice: (langName: string) => `Перейти к практике: ${langName}`,
          masteredBadge: 'Изучено',
          curriculumMastery: (langName: string) => `Освоение курса: ${langName}`,
          masteryCountDesc: (mastered: number, total: number) =>
            `Изучено ${mastered} из ${total} основных слов и фраз (уровень ${MASTERY_THRESHOLD}+)`,
          studyBtn: (langName: string) => `Учить ${langName}`,
          dailyStreak: 'Дневная серия',
          quizzesCompleted: 'Пройдено тестов',
          averageScore: 'Средний результат',
          wordsMastered: 'Выучено слов',
          wordsLearning: 'На изучении',
          wordsToReviewTitle: 'Слова и фразы для повторения',
          wordsToReviewDesc: (langName: string) =>
            `Недавние ошибки в курсе «${langName}». Прослушайте произношение, чтобы закрепить их в памяти.`,
          recentSessionsTitle: 'Недавние тесты'
        };
      case 'es':
        return {
          title: 'Tu Progreso de Aprendizaje',
          selectLanguageLabel: 'Curso de idioma',
          loggedInAs: (email: string) => `Sesión iniciada como ${email}`,
          guestMode: 'Modo Invitado (Guardado en este navegador)',
          loading: 'Cargando tus estadísticas...',
          noHistoryTitle: 'Aún no hay historial de cuestionarios',
          noHistoryDesc: (langName: string) =>
            `¡Empieza a tomar cuestionarios o practicar frases en ${langName} para seguir tu precisión y vocabulario!`,
          switchToPractice: (langName: string) => `Cambiar para practicar ${langName}`,
          masteredBadge: 'Dominado',
          curriculumMastery: (langName: string) => `Dominio del Curso de ${langName}`,
          masteryCountDesc: (mastered: number, total: number) =>
            `${mastered} de ${total} palabras y frases clave dominadas en Nivel ${MASTERY_THRESHOLD}+`,
          studyBtn: (langName: string) => `Estudiar ${langName}`,
          dailyStreak: 'Racha Diaria',
          quizzesCompleted: 'Cuestionarios Completados',
          averageScore: 'Puntuación Media',
          wordsMastered: 'Palabras Dominadas',
          wordsLearning: 'Palabras en Estudio',
          wordsToReviewTitle: 'Palabras y Frases para Repasar',
          wordsToReviewDesc: (langName: string) =>
            `Estos elementos se fallaron recientemente en ${langName}. Practica su pronunciación para reforzar tu memoria.`,
          recentSessionsTitle: 'Sesiones de Cuestionario Recientes'
        };
      case 'fr':
        return {
          title: 'Votre Progression d\'Apprentissage',
          selectLanguageLabel: 'Cours de langue',
          loggedInAs: (email: string) => `Connecté en tant que ${email}`,
          guestMode: 'Mode Invité (Enregistré dans ce navigateur)',
          loading: 'Chargement de vos statistiques...',
          noHistoryTitle: 'Aucun Historique de Quiz',
          noHistoryDesc: (langName: string) =>
            `Commencez à faire des quiz ou à pratiquer des phrases en ${langName} pour suivre votre précision et votre vocabulaire !`,
          switchToPractice: (langName: string) => `Passer à la pratique : ${langName}`,
          masteredBadge: 'Maîtrisé',
          curriculumMastery: (langName: string) => `Maîtrise du Programme (${langName})`,
          masteryCountDesc: (mastered: number, total: number) =>
            `${mastered} sur ${total} mots et phrases clés maîtrisés au Niveau ${MASTERY_THRESHOLD}+`,
          studyBtn: (langName: string) => `Étudier : ${langName}`,
          dailyStreak: 'Série Quotidienne',
          quizzesCompleted: 'Quiz Terminés',
          averageScore: 'Score Moyen',
          wordsMastered: 'Mots Maîtrisés',
          wordsLearning: 'Mots en Cours',
          wordsToReviewTitle: 'Mots et Phrases à Réviser',
          wordsToReviewDesc: (langName: string) =>
            `Ces éléments ont été manqués récemment en ${langName}. Écoutez leur prononciation pour renforcer votre mémoire.`,
          recentSessionsTitle: 'Sessions de Quiz Récentes'
        };
      case 'en':
      default:
        return {
          title: 'Your Learning Progress',
          selectLanguageLabel: 'Course Language',
          loggedInAs: (email: string) => `Logged in as ${email}`,
          guestMode: 'Guest Mode (Saved in this browser)',
          loading: 'Loading your statistics...',
          noHistoryTitle: 'No Quiz History Yet',
          noHistoryDesc: (langName: string) =>
            `Start taking quizzes or practicing phrases in ${langName} to track your accuracy, mastery, and vocabulary over time!`,
          switchToPractice: (langName: string) => `Switch to Practice ${langName}`,
          masteredBadge: 'Mastered',
          curriculumMastery: (langName: string) => `${langName} Curriculum Mastery`,
          masteryCountDesc: (mastered: number, total: number) =>
            `${mastered} of ${total} core words & phrases mastered at Level ${MASTERY_THRESHOLD}+`,
          studyBtn: (langName: string) => `Study ${langName}`,
          dailyStreak: 'Daily Streak',
          quizzesCompleted: 'Quizzes Completed',
          averageScore: 'Average Score',
          wordsMastered: 'Words Mastered',
          wordsLearning: 'Words Learning',
          wordsToReviewTitle: 'Words & Phrases to Review',
          wordsToReviewDesc: (langName: string) =>
            `These items were missed recently in ${langName}. Practice their pronunciation to reinforce your memory.`,
          recentSessionsTitle: 'Recent Quiz Sessions'
        };
    }
  })();

  return (
    <div
      ref={modalRef}
      className="progress-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="progress-modal-title"
      onClick={onClose}
    >
      <div
        className="progress-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="progress-modal-close" onClick={onClose} aria-label="Close modal">
          <FaTimes aria-hidden="true" />
        </button>

        <div className="progress-modal-header">
          <div className="progress-header-title">
            <FaChartBar className="header-icon" aria-hidden="true" />
            <div>
              <h2 id="progress-modal-title">{modalCopy.title}</h2>
              <p className="user-indicator">
                {userEmail ? modalCopy.loggedInAs(userEmail) : modalCopy.guestMode}
              </p>
            </div>
          </div>
        </div>

        {/* Course Language Dropdown (Replaces horizontal scrolling tab strip) */}
        <div className="progress-lang-selector-card">
          <div className="progress-lang-selector-header">
            <label htmlFor="progress-lang-dropdown" className="progress-lang-label">
              {modalCopy.selectLanguageLabel}
            </label>
            <span className="progress-lang-sublabel">{Object.keys(SUPPORTED_LANGUAGES).length} languages</span>
          </div>
          <div className="progress-dropdown-wrapper" ref={dropdownRef}>
            <button
              ref={dropdownTriggerRef}
              id="progress-lang-dropdown"
              type="button"
              className={`progress-dropdown-trigger ${isDropdownOpen ? 'open' : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onKeyDown={(e) => {
                if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !isDropdownOpen) {
                  e.preventDefault();
                  setIsDropdownOpen(true);
                }
              }}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
              aria-label={`Current course: ${localizedActiveLangName} — ${percentMastered}% ${modalCopy.masteredBadge}. Click to change course progress.`}
            >
              <div className="dropdown-trigger-main">
                <span className="dropdown-trigger-flag" aria-hidden="true">
                  <FlagIcon lang={activeMeta.id} size={22} />
                </span>
                <span className="dropdown-trigger-name">{localizedActiveLangName}</span>
              </div>{' '}
              <div className="dropdown-trigger-end">
                <span className={`dropdown-trigger-badge ${percentMastered > 0 ? 'has-mastery' : ''}`}>
                  {percentMastered}% {modalCopy.masteredBadge}
                </span>
                <FaChevronDown className={`dropdown-chevron ${isDropdownOpen ? 'rotated' : ''}`} aria-hidden="true" />
              </div>
            </button>

            {isDropdownOpen && (
              <div
                ref={listboxRef}
                className="progress-dropdown-menu"
                role="listbox"
                aria-label="Available languages"
                onKeyDown={(e) => {
                  const options = Array.from(
                    e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="option"]')
                  );
                  if (!options.length) return;
                  const idx = options.indexOf(document.activeElement as HTMLButtonElement);
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    options[(idx + 1) % options.length]?.focus();
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    options[(idx - 1 + options.length) % options.length]?.focus();
                  } else if (e.key === 'Home') {
                    e.preventDefault();
                    options[0]?.focus();
                  } else if (e.key === 'End') {
                    e.preventDefault();
                    options[options.length - 1]?.focus();
                  }
                }}
              >
                {Object.values(SUPPORTED_LANGUAGES).map(lang => {
                  const isSelected = lang.id === selectedLang;
                  const overview = masteryOverview[lang.id];
                  const percent = overview?.percentMastered ?? (lang.id === selectedLang ? percentMastered : 0);
                  const localizedName = getLocalizedLanguageName(lang.id, baseLanguage, lang.name);
                  return (
                    <button
                      key={lang.id}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      className={`progress-dropdown-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedLang(lang.id);
                        setIsDropdownOpen(false);
                        dropdownTriggerRef.current?.focus({ preventScroll: true });
                      }}
                    >
                      <div className="dropdown-item-left">
                        <span className="dropdown-item-flag" aria-hidden="true">
                          <FlagIcon lang={lang.id} size={20} />
                        </span>
                        <span className="dropdown-item-name">{localizedName}</span>
                      </div>
                      <div className="dropdown-item-right">
                        <span className={`dropdown-item-badge ${percent > 0 ? 'has-mastery' : ''}`}>
                          {percent}%
                        </span>
                        {isSelected ? (
                          <FaCheck className="dropdown-item-check" aria-hidden="true" />
                        ) : (
                          <span className="dropdown-item-check-placeholder" aria-hidden="true" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="progress-loading" role="status" aria-live="polite">
            <div className="loading-spinner" aria-hidden="true"></div>
            <p>{modalCopy.loading}</p>
          </div>
        ) : !stats || (stats.totalQuizzesTaken === 0 && stats.wordsMasteredCount === 0 && stats.wordsLearningCount === 0) ? (
          <div className="progress-empty-state">
            <FaGraduationCap className="empty-icon" aria-hidden="true" />
            <h3>{modalCopy.noHistoryTitle}</h3>
            <p>
              {modalCopy.noHistoryDesc(localizedActiveLangName)}
            </p>
            {selectedLang !== contextLang ? (
              <button
                type="button"
                className="study-lang-cta-btn"
                onClick={() => {
                  setLanguage(selectedLang as SupportedLanguageId);
                  onClose();
                }}
              >
                <span>{modalCopy.switchToPractice(localizedActiveLangName)}</span>
                <FaArrowRight aria-hidden="true" />
              </button>
            ) : null}
          </div>
        ) : (
          <div className="progress-modal-body">
            {/* Curriculum Percent Mastered Hero Banner */}
            <div className="mastery-summary-card">
              <div className="mastery-card-left">
                <div className="mastery-percent-display">
                  <span className="mastery-percent-number">{percentMastered}%</span>
                  <span className="mastery-percent-label">{modalCopy.masteredBadge}</span>
                </div>
                <div className="mastery-meta-info">
                  <h3>{modalCopy.curriculumMastery(localizedActiveLangName)}</h3>
                  <p>
                    {baseLanguage === 'en' ? (
                      <>
                        <strong>{stats.wordsMasteredCount}</strong> of <strong>{totalCurriculum}</strong> core words &amp; phrases mastered at Level {MASTERY_THRESHOLD}+
                      </>
                    ) : (
                      modalCopy.masteryCountDesc(stats.wordsMasteredCount, totalCurriculum)
                    )}
                  </p>
                  <div
                    className="mastery-progress-track"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={percentMastered}
                    aria-label={modalCopy.curriculumMastery(localizedActiveLangName)}
                  >
                    <div 
                      className="mastery-progress-fill" 
                      style={{ width: `${percentMastered}%` }}
                    />
                  </div>
                </div>
              </div>

              {selectedLang !== contextLang && (
                <button
                  type="button"
                  className="switch-active-lang-btn"
                  onClick={() => {
                    setLanguage(selectedLang as SupportedLanguageId);
                    onClose();
                  }}
                  title={`Switch active app language to ${localizedActiveLangName}`}
                >
                  <span>{modalCopy.studyBtn(localizedActiveLangName)}</span>
                  <span className="btn-flag" aria-hidden="true">
                    <FlagIcon lang={activeMeta.id} size={18} />
                  </span>
                </button>
              )}
            </div>

            {/* Stat Cards Grid */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon streak-icon" aria-hidden="true">
                  <FaFire aria-hidden="true" />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{stats.currentDailyStreak || 0}</span>
                  <span className="stat-label">{modalCopy.dailyStreak}</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon trophy-icon" aria-hidden="true">
                  <FaTrophy aria-hidden="true" />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{stats.totalQuizzesTaken}</span>
                  <span className="stat-label">{modalCopy.quizzesCompleted}</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon accuracy-icon" aria-hidden="true">
                  <FaChartBar aria-hidden="true" />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{stats.averageScore}%</span>
                  <span className="stat-label">{modalCopy.averageScore}</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon mastered-icon" aria-hidden="true">
                  <FaCheckCircle aria-hidden="true" />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{stats.wordsMasteredCount}</span>
                  <span className="stat-label">{modalCopy.wordsMastered}</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon learning-icon" aria-hidden="true">
                  <FaGraduationCap aria-hidden="true" />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{stats.wordsLearningCount}</span>
                  <span className="stat-label">{modalCopy.wordsLearning}</span>
                </div>
              </div>
            </div>

            {/* Words To Review Section */}
            {stats.wordsToReview.length > 0 && (
              <div className="progress-section">
                <div className="section-title">
                  <FaRedo className="section-icon" aria-hidden="true" />
                  <h3>{modalCopy.wordsToReviewTitle}</h3>
                </div>
                <p className="section-subtitle">
                  {modalCopy.wordsToReviewDesc(localizedActiveLangName)}
                </p>

                <div className="review-words-list">
                  {stats.wordsToReview.map((item) => {
                    const { target, audioTarget, meaning } = getWordReviewDetails(item, selectedLang);
                    const localizedMeaning =
                      baseLanguage !== 'en' && baseLanguage !== (selectedLang as SupportedLanguageId)
                        ? resolveTranslation(
                            {
                              phrase: target,
                              russian: target,
                              word: target,
                              translation: meaning,
                              english: meaning
                            },
                            selectedLang as SupportedLanguageId,
                            baseLanguage
                          ) || meaning
                        : meaning;
                    return (
                      <div key={item.wordId} className="review-word-card">
                        <div className="review-word-info">
                          <span className="russian-text" lang={selectedLang} dir={selectedTargetDir}>
                            {target}
                          </span>
                          <span className="english-translation" lang={baseLanguage} dir={baseDir}>
                            {localizedMeaning}
                          </span>
                        </div>

                        <div className="review-word-actions">
                          <span className="accuracy-badge">
                            {item.timesCorrect}✓ / {item.timesIncorrect}✗
                          </span>
                          <PronunciationButton
                            text={audioTarget}
                            lang={selectedLang}
                            audioCategory={item.category as any}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recent Sessions List */}
            {stats.recentSessions.length > 0 && (
              <div className="progress-section">
                <div className="section-title">
                  <FaTrophy className="section-icon" aria-hidden="true" />
                  <h3>{modalCopy.recentSessionsTitle}</h3>
                </div>

                <div className="recent-sessions-list">
                  {stats.recentSessions.map((session) => (
                    <div key={session.id} className="session-item">
                      <div className="session-meta">
                        <span className="session-category">
                          {localizeCategoryBadge(session.category, baseLanguage) || session.category}
                        </span>
                        <span className="session-date">
                          {new Date(session.completedAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="session-score">
                        <span className={`score-badge ${session.percentage >= 80 ? 'high' : session.percentage >= 50 ? 'med' : 'low'}`}>
                          {session.score}/{session.totalQuestions} ({session.percentage}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressModal;
