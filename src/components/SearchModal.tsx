import React, { useState, useEffect, useMemo, useRef } from 'react';
import { FaSearch, FaTimes, FaArrowRight, FaBookOpen, FaComment, FaListUl } from 'react-icons/fa';
import PronunciationButton from './PronunciationButton';
import WordIcon from './WordIcon';
import { useLanguage } from '../contexts/LanguageContext';
import { AppData } from '../types';
import { searchLanguageConcepts, SearchResultItem, SearchResultsGrouped } from '../utils/searchEngine';
import { useModalAccessibility } from '../hooks/useModalAccessibility';

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
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const targetDir = currentLanguage === 'ar' || currentLanguage === 'ur' ? 'rtl' : 'ltr';
  const baseDir = baseLanguage === 'ar' || baseLanguage === 'ur' ? 'rtl' : 'ltr';

  // Reset search state when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveFilter('all');
    }
  }, [isOpen]);

  useModalAccessibility({
    isOpen,
    onClose,
    modalRef,
    initialFocusRef: inputRef,
  });

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

  const trimmedQuery = query.trim();

  return (
    <div className="search-modal-overlay" onClick={onClose} role="presentation">
      <div
        ref={modalRef}
        className="search-modal-container"
        role="dialog"
        aria-modal="true"
        aria-label="Search words and concepts"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="sr-only">Search words and concepts</h2>

        {/* Search Header Bar */}
        <div className="search-input-wrapper">
          <FaSearch className="search-input-icon" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            className="search-input-field"
            placeholder={`Search ${currentMeta.name} or English words, phrases, concepts...`}
            value={query}
            maxLength={120}
            onChange={(e) => setQuery(e.target.value.slice(0, 120))}
            aria-label="Search words, phrases, and grammar"
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
              <FaTimes aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            className="search-close-btn"
            onClick={onClose}
            aria-label="Close search — Esc"
          >
            Esc
          </button>
        </div>

        {/* Polite screen reader result count announcement */}
        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {trimmedQuery.length > 0
            ? searchResults.totalCount === 0
              ? `No direct matches for "${trimmedQuery}"`
              : `${visibleItems.length} ${visibleItems.length === 1 ? 'result' : 'results'} shown for "${trimmedQuery}"`
            : ''}
        </div>

        {/* Quick Suggestion Chips (when query is empty) */}
        {trimmedQuery.length === 0 && (
          <div className="search-suggestions-container">
            <p className="search-suggestions-title">💡 Popular concepts &amp; topics to explore:</p>
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
                  <span className="chip-icon" aria-hidden="true">{chip.icon}</span>
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
        {trimmedQuery.length > 0 && searchResults.totalCount > 0 && (
          <div className="search-results-filter-tabs" role="group" aria-label="Filter search results">
            <button
              type="button"
              aria-pressed={activeFilter === 'all'}
              className={`search-filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All ({searchResults.totalCount})
            </button>
            {searchResults.words.length > 0 && (
              <button
                type="button"
                aria-pressed={activeFilter === 'words'}
                className={`search-filter-pill ${activeFilter === 'words' ? 'active' : ''}`}
                onClick={() => setActiveFilter('words')}
              >
                <FaListUl className="pill-mini-icon" aria-hidden="true" /> Words ({searchResults.words.length})
              </button>
            )}
            {searchResults.phrases.length > 0 && (
              <button
                type="button"
                aria-pressed={activeFilter === 'phrases'}
                className={`search-filter-pill ${activeFilter === 'phrases' ? 'active' : ''}`}
                onClick={() => setActiveFilter('phrases')}
              >
                <FaComment className="pill-mini-icon" aria-hidden="true" /> Phrases ({searchResults.phrases.length})
              </button>
            )}
            {searchResults.grammar.length > 0 && (
              <button
                type="button"
                aria-pressed={activeFilter === 'grammar'}
                className={`search-filter-pill ${activeFilter === 'grammar' ? 'active' : ''}`}
                onClick={() => setActiveFilter('grammar')}
              >
                <FaBookOpen className="pill-mini-icon" aria-hidden="true" /> Grammar ({searchResults.grammar.length})
              </button>
            )}
          </div>
        )}

        {/* Results List */}
        {trimmedQuery.length > 0 && (
          searchResults.totalCount === 0 ? (
            <div className="search-results-list">
              <div className="search-no-results">
                <span className="no-results-emoji" aria-hidden="true">🔍</span>
                <h3>No direct matches for &ldquo;{query}&rdquo;</h3>
                <p>Try searching another topic, English translation, or single word.</p>
              </div>
            </div>
          ) : (
            <div className="search-results-list" role="list">
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="search-result-card"
                  role="listitem"
                  onClick={(e) => {
                    if (!(e.target as HTMLElement).closest('button')) {
                      handleCardClick(item);
                    }
                  }}
                >
                  <button
                    type="button"
                    className="search-card-primary-btn search-card-main"
                    onClick={() => handleCardClick(item)}
                  >
                    <div className="search-card-header">
                      {item.icon && (
                        <span aria-hidden="true" className="search-card-icon-wrap">
                          <WordIcon
                            icon={item.icon}
                            word={item.title}
                            meaning={item.translation}
                            size={22}
                            className="search-card-icon"
                          />
                        </span>
                      )}
                      {item.article && (
                        <span
                          className={`search-article-badge badge-${item.article.toLowerCase()}`}
                          lang={currentLanguage}
                          dir={targetDir}
                        >
                          {item.article}
                        </span>
                      )}
                      <h3 className="search-card-title" lang={currentLanguage} dir={targetDir}>
                        {item.title}
                      </h3>
                      {item.matchReason && (
                        <span className="search-match-reason">{item.matchReason}</span>
                      )}
                    </div>

                    <p className="search-card-translation" lang={baseLanguage} dir={baseDir}>
                      {item.translation}
                    </p>

                    {item.pronunciation && (
                      <p className="search-card-phonetics">/{item.pronunciation}/</p>
                    )}
                  </button>

                  <div className="search-card-actions" onClick={(e) => e.stopPropagation()}>
                    <PronunciationButton
                      text={item.article ? `${item.article} ${item.title}` : item.title}
                      lang={currentLanguage}
                      label={`Pronounce "${item.article ? `${item.article} ${item.title}` : item.title}"`}
                      className="search-audio-btn"
                    />

                    <button
                      type="button"
                      className="search-jump-btn"
                      onClick={() => handleCardClick(item)}
                      title={`Open in ${getSectionBadgeText(item)}`}
                      aria-label={`Open ${item.title} in ${getSectionBadgeText(item)}`}
                    >
                      <span className="jump-text">{getSectionBadgeText(item)}</span>
                      <FaArrowRight className="jump-icon" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchModal;
