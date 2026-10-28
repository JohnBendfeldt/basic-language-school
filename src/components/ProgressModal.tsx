import React, { useEffect, useState } from 'react';
import { FaTimes, FaTrophy, FaGraduationCap, FaRedo, FaCheckCircle, FaChartBar } from 'react-icons/fa';
import { ProgressService } from '../services/progressService';
import { UserStats, WordProgress } from '../types/progress';
import PronunciationButton from './PronunciationButton';
import { containsCyrillic } from '../utils/transliteration';
import { useLanguage } from '../contexts/LanguageContext';

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string | null;
  languageId?: string;
}

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
  const { currentLanguage: contextLang, currentMeta } = useLanguage();
  const effectiveLang = languageId || contextLang;
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      ProgressService.getUserStats(effectiveLang)
        .then(data => setStats(data))
        .catch(err => console.error('Error fetching progress stats:', err))
        .finally(() => setLoading(false));
    }
  }, [isOpen, effectiveLang]);

  if (!isOpen) return null;

  return (
    <div className="progress-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="progress-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="progress-modal-close" onClick={onClose} aria-label="Close modal">
          <FaTimes />
        </button>

        <div className="progress-modal-header">
          <div className="progress-header-title">
            <FaChartBar className="header-icon" />
            <div>
              <h2>Your Learning Progress</h2>
              <p className="user-indicator">
                {userEmail ? `Logged in as ${userEmail}` : 'Guest Mode (Saved in this browser)'}
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="progress-loading">
            <div className="loading-spinner"></div>
            <p>Loading your statistics...</p>
          </div>
        ) : !stats || (stats.totalQuizzesTaken === 0 && stats.wordsMasteredCount === 0 && stats.wordsLearningCount === 0) ? (
          <div className="progress-empty-state">
            <FaGraduationCap className="empty-icon" />
            <h3>No Quiz History Yet</h3>
            <p>Start taking quizzes or practicing phrases to track your accuracy, mastery, and vocabulary over time!</p>
          </div>
        ) : (
          <div className="progress-modal-body">
            {/* Stat Cards Grid */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon trophy-icon">
                  <FaTrophy />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{stats.totalQuizzesTaken}</span>
                  <span className="stat-label">Quizzes Completed</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon accuracy-icon">
                  <FaChartBar />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{stats.averageScore}%</span>
                  <span className="stat-label">Average Score</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon mastered-icon">
                  <FaCheckCircle />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{stats.wordsMasteredCount}</span>
                  <span className="stat-label">Words Mastered</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon learning-icon">
                  <FaGraduationCap />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{stats.wordsLearningCount}</span>
                  <span className="stat-label">Words Learning</span>
                </div>
              </div>
            </div>

            {/* Words To Review Section */}
            {stats.wordsToReview.length > 0 && (
              <div className="progress-section">
                <div className="section-title">
                  <FaRedo className="section-icon" />
                  <h3>Words & Phrases to Review</h3>
                </div>
                <p className="section-subtitle">
                  These items were missed recently. Practice their pronunciation to reinforce your memory.
                </p>

                <div className="review-words-list">
                  {stats.wordsToReview.map((item) => {
                    const { target, audioTarget, meaning } = getWordReviewDetails(item, effectiveLang);
                    return (
                      <div key={item.wordId} className="review-word-card">
                        <div className="review-word-info">
                          <span className="russian-text">{target}</span>
                          <span className="english-translation">{meaning}</span>
                        </div>

                        <div className="review-word-actions">
                          <span className="accuracy-badge">
                            {item.timesCorrect}✓ / {item.timesIncorrect}✗
                          </span>
                          <PronunciationButton
                            text={audioTarget}
                            lang={effectiveLang}
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
                  <FaTrophy className="section-icon" />
                  <h3>Recent Quiz Sessions</h3>
                </div>

                <div className="recent-sessions-list">
                  {stats.recentSessions.map((session) => (
                    <div key={session.id} className="session-item">
                      <div className="session-meta">
                        <span className="session-category">{session.category}</span>
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
