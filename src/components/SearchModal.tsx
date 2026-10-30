import React, { useState, useEffect, useMemo, useRef } from 'react';
import { FaSearch, FaTimes, FaArrowRight, FaBookOpen, FaComment, FaListUl, FaFont, FaBolt } from 'react-icons/fa';
import PronunciationButton from './PronunciationButton';
import { useLanguage } from '../contexts/LanguageContext';
import { AppData } from '../types';
import { searchLanguageConcepts, SearchResultItem, SearchResultsGrouped } from '../utils/searchEngine';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (result: SearchResultItem) => void;
  appData: AppData;
}

const QUICK_SUGGESTIONS = [
  { label: 'Greetings', icon: '👋', query: 'greeting' },
  { label: 'Meeting', icon: '📅', query: 'meeting' },
  { label: 'Tech & Work', icon: '💻', query: 'tech' },
  { label: 'Food & Dining', icon: '🍲', query: 'food' },
  { label: 'Travel', icon: '✈️', query: 'travel' },
  { label: 'Verbs', icon: '🔄', query: 'verb' },
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
  appData,
}) => {
  const { currentLanguage, baseLanguage, currentMeta } = useLanguage();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'words' | 'phrases' | 'grammar'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveFilter('all');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Execute search across concepts
  const searchResults: SearchResultsGrouped = useMemo(() => {
    return searchLanguageConcepts(query, appData, currentLanguage, baseLanguage, 15);
  }, [query, appData, currentLanguage, baseLanguage]);

  // Visible items based on active filter
  const visibleItems = useMemo(() => {
    if (activeFilter === 'words') return searchResults.words;
    if (activeFilter === 'phrases') return searchResults.phrases;
    if (activeFilter === 'grammar') return searchResults.grammar;
    return [...searchResults.words, ...searchResults.phrases, ...searchResults.grammar];
  }, [activeFilter, searchResults]);

  if (!isOpen) return null;

  const handleCardClick = (item: SearchResultItem) => {
    onSelectResult(item);
  };

  const getSectionBadgeText = (item: SearchResultItem) => {
    if (item.section === 'words') return 'Words';
    if (item.section === 'phrases') return 'Phrases';
    if (item.section === 'numbers') return 'Numbers & Time';
    if (item.grammarTab) return `Grammar (${item.grammarTab})`;
    return 'Alphabet';
  };

  return (
    <div className="search-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Search words and concepts">
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Search Header Bar */}
        <div className="search-input-wrapper">
          <FaSearch className="search-input-icon" />
          <input
            ref={inputRef}
            type="search"
            className="search-input-field"
            placeholder={`Search ${currentMeta.name} or English words, phrases, concepts...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search concepts"
          />
          {query.length > 0 && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              aria-label="Clear search text"
            >
              <FaTimes />
            </button>
          )}
          <button
            type="button"
            className="search-close-btn"
            onClick={onClose}
            aria-label="Close search"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Chips (when query is empty) */}
        {query.trim().length === 0 && (
          <div className="search-suggestions-container">
            <p className="search-suggestions-title">💡 Popular concepts & topics to explore:</p>
            <div className="search-chips-row">
              {QUICK_SUGGESTIONS.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  className="search-suggestion-chip"
                  onClick={() => {
                    setQuery(chip.query);
                    inputRef.current?.focus();
                  }}
                >
                  <span className="chip-icon">{chip.icon}</span>
                  <span className="chip-label">{chip.label}</span>
                </button>
              ))}
            </div>
            <p className="search-hint-footer">
              Tip: You can search in either <strong>{currentMeta.name}</strong> or <strong>English</strong>. Type any word to see real phrases and grammar examples!
            </p>
          </div>
        )}

        {/* Results Filtering Tabs */}
        {query.trim().length > 0 && searchResults.totalCount > 0 && (
          <div className="search-results-filter-tabs">
            <button
              type="button"
              className={`search-filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All ({searchResults.totalCount})
            </button>
            {searchResults.words.length > 0 && (
              <button
                type="button"
                className={`search-filter-pill ${activeFilter === 'words' ? 'active' : ''}`}
                onClick={() => setActiveFilter('words')}
              >
                <FaListUl className="pill-mini-icon" /> Words ({searchResults.words.length})
              </button>
            )}
            {searchResults.phrases.length > 0 && (
              <button
                type="button"
                className={`search-filter-pill ${activeFilter === 'phrases' ? 'active' : ''}`}
                onClick={() => setActiveFilter('phrases')}
              >
                <FaComment className="pill-mini-icon" /> Phrases ({searchResults.phrases.length})
              </button>
            )}
            {searchResults.grammar.length > 0 && (
              <button
                type="button"
                className={`search-filter-pill ${activeFilter === 'grammar' ? 'active' : ''}`}
                onClick={() => setActiveFilter('grammar')}
              >
                <FaBookOpen className="pill-mini-icon" /> Grammar ({searchResults.grammar.length})
              </button>
            )}
          </div>
        )}

        {/* Results List */}
        {query.trim().length > 0 && (
          <div className="search-results-list" role="list">
            {searchResults.totalCount === 0 ? (
              <div className="search-no-results">
                <span className="no-results-emoji">🔍</span>
                <h4>No direct matches for "{query}"</h4>
                <p>Try searching another topic, English translation, or single word.</p>
              </div>
            ) : (
              visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="search-result-card"
                  onClick={() => handleCardClick(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(item);
                    }
                  }}
                >
                  <div className="search-card-main">
                    <div className="search-card-header">
                      {item.icon && <span className="search-card-icon">{item.icon}</span>}
                      {item.article && (
                        <span className={`search-article-badge badge-${item.article.toLowerCase()}`}>
                          {item.article}
                        </span>
                      )}
                      <h4 className="search-card-title">{item.title}</h4>
                      {item.matchReason && (
                        <span className="search-match-reason">{item.matchReason}</span>
                      )}
                    </div>

                    <p className="search-card-translation">{item.translation}</p>

                    {item.pronunciation && (
                      <p className="search-card-phonetics">/{item.pronunciation}/</p>
                    )}
                  </div>

                  <div className="search-card-actions" onClick={(e) => e.stopPropagation()}>
                    <PronunciationButton
                      text={item.article ? `${item.article} ${item.title}` : item.title}
                      lang={currentLanguage}
                      label=""
                      className="search-audio-btn"
                    />

                    <button
                      type="button"
                      className="search-jump-btn"
                      onClick={() => handleCardClick(item)}
                      title={`Open in ${getSectionBadgeText(item)}`}
                    >
                      <span className="jump-text">{getSectionBadgeText(item)}</span>
                      <FaArrowRight className="jump-icon" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
