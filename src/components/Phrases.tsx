import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { PhraseItem } from '../types/index';
import PronunciationButton from './PronunciationButton';
import { NumberBadge } from './NumberBadge';
import WordIcon from './WordIcon';
import { FaSyncAlt } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { resolveTranslation, extractDigit } from '../utils/translationResolver';
import { localizeCategoryBadge } from '../utils/pageDictionary';
import { useIsMobile } from '../hooks/useIsMobile';
import { useModalAccessibility } from '../hooks/useModalAccessibility';

const CATEGORY_ICONS: Record<string, string> = {
  'all': '✨',
  'greetings': '👋',
  'introductions': '🤝',
  'courtesy': '🙏',
  'politeness': '🙏',
  'polite': '🙏',
  'conversation': '💬',
  'communication': '🗣️',
  'responses': '✅',
  'reply': '✅',
  'farewells': '🚪',
  'essentials': '⭐',
  'questions': '❓',
  'question': '❓',
  'emergency': '🆘',
  'food & drink': '🍲',
  'dining': '🍽️',
  'food': '🍎',
  'travel': '✈️',
  'transport': '🚆',
  'directions': '🧭',
  'places': '🏙️',
  'place': '🏙️',
  'shopping': '🛍️',
  'finance': '💵',
  'health': '🏥',
  'people': '👥',
  'family': '👨‍👩‍👧',
  'home': '🏠',
  'clothing': '👕',
  'colors': '🎨',
  'nature': '🌿',
  'animals': '🐾',
  'weather': '☀️',
  'time': '⏱️',
  'time of day': '🌅',
  'calendar': '📅',
  'verbs': '🏃',
  'common verbs': '🏃',
  'descriptions': '📝',
  'adjectives': '📝',
  'tech': '💻',
  'business': '💼',
  'work': '💼',
  'numbers': '🔢',
  'hour': '🕐',
  'hours': '🕐',
  'exact hours': '🕐',
  'half hours': '🕧',
  'quarter hours': '🕒',
  'time asking': '⌚',
  'minutes': '⏲️',
  'special': '🌟',
  'phrases': '💬',
  'expressions': '💬',
  'object': '📦',
  'general': '💡'
};

interface PhraseCardProps {
  cardIndex: number;
  targetText: string;
  translatedText: string;
  pronunciation: string;
  isRevealed: boolean;
  onToggleIndex: (index: number) => void;
  contentType?: 'phrases' | 'words' | 'numbers' | 'time';
  category?: string;
  icon?: string;
}

const PhraseCardComponent: React.FC<PhraseCardProps> = ({ 
  cardIndex,
  targetText, 
  translatedText, 
  pronunciation, 
  isRevealed, 
  onToggleIndex,
  contentType = 'phrases',
  category,
  icon
}) => {
  const { currentLanguage, baseLanguage, ui } = useLanguage();
  const localizedCategory = localizeCategoryBadge(category, baseLanguage);
  const targetDir = currentLanguage === 'ar' || currentLanguage === 'ur' ? 'rtl' : 'ltr';
  const baseDir = baseLanguage === 'ar' || baseLanguage === 'ur' ? 'rtl' : 'ltr';
  const handleToggle = useCallback(() => {
    onToggleIndex(cardIndex);
  }, [onToggleIndex, cardIndex]);

  // Extract numeric digits from translatedText/targetText if this is numbers mode
  let numericValue: string | null = null;
  if (contentType === 'numbers') {
    const resolvedDigit = extractDigit(translatedText) ?? extractDigit(targetText);
    if (resolvedDigit !== null) {
      numericValue = String(resolvedDigit);
    } else {
      const numMatch = (translatedText || targetText).match(/\b\d{1,3}(?:[,.]\d{3})+\b|\b\d+\b/);
      if (numMatch) {
        numericValue = numMatch[0];
      }
    }
  }

  return (
    <div 
      className={`phrase-card ${contentType === 'numbers' ? 'phrase-card-number' : ''} ${isRevealed ? 'phrase-revealed' : 'phrase-hidden'}`}
    >
      <div className="phrase-card-top-row">
        {localizedCategory && (
          <div className="phrase-meta-badge" lang={baseLanguage} dir={baseDir}>
            <span className="meta-category">{localizedCategory}</span>
          </div>
        )}
        {contentType === 'numbers' && numericValue && (
          <div className="phrase-number-pill" aria-hidden="true">
            <NumberBadge value={numericValue} size={30} />
          </div>
        )}
      </div>
      <div className="phrase-header">
        <div className="phrase-title-group">
          {icon && contentType !== 'numbers' && (
            <span className="phrase-icon-badge" aria-hidden="true">
              <WordIcon icon={icon} word={targetText} meaning={translatedText} size={24} />
            </span>
          )}
          <h3 className="phrase-text" lang={currentLanguage} dir={targetDir}>
            {targetText}
          </h3>
        </div>
        <PronunciationButton 
          text={targetText} 
          lang={currentLanguage}
          label={`Pronounce ${contentType === 'words' ? 'word' : contentType === 'numbers' ? 'number' : contentType === 'time' ? 'time expression' : 'phrase'} ${targetText}`}
          className="phrase-pronunciation"
          audioCategory={contentType}
          useLocalAudio={true}
        />
      </div>
      <div className="phrase-content">
        {isRevealed && (
          <div 
            className="phrase-revealed-wrap"
            onClick={(e) => {
              if (!(e.target as HTMLElement).closest('button')) {
                handleToggle();
              }
            }}
          >
            <div className="phrase-revealed-body">
              <div className="phrase-revealed-translation-row">
                <p className="english" lang={baseLanguage} dir={baseDir}>
                  {translatedText}
                </p>
                <PronunciationButton 
                  text={translatedText}
                  lang={baseLanguage}
                  label={`Listen to translation ${translatedText}`}
                  className="phrase-pronunciation mini"
                  useLocalAudio={false}
                />
              </div>
              {pronunciation && (
                <p className="pronunciation">
                  <span className="pronunciation-label">{ui.pronunciationLabel}</span> {pronunciation}
                </p>
              )}
            </div>
          </div>
        )}
        <button 
          key="phrase-toggle-btn"
          type="button"
          className={isRevealed ? 'card-hide-cue phrase-hide-btn' : 'phrase-reveal-btn'}
          aria-expanded={isRevealed}
          aria-label={isRevealed ? `Hide translation for ${targetText} — ${ui.tapToHide}` : `Reveal translation for ${targetText} — ${ui.tapToReveal}`}
          onClick={handleToggle}
        >
          <FaSyncAlt className={isRevealed ? 'cue-icon mini' : 'cue-icon'} aria-hidden="true" />
          <span>{isRevealed ? ui.tapToHide : ui.tapToReveal}</span>
        </button>
      </div>
    </div>
  );
};

const PhraseCard = React.memo(PhraseCardComponent);

interface PhrasesProps {
  data: PhraseItem[];
  title: string;
  contentType?: 'phrases' | 'words' | 'numbers' | 'time';
}

const Phrases: React.FC<PhrasesProps> = ({ 
  data, 
  title,
  contentType = 'phrases'
}) => {
  const { currentLanguage, baseLanguage, ui } = useLanguage();
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const activeCategory = selectedCategories.size === 0 ? 'all' : Array.from(selectedCategories).join('|');
  const [revealedSet, setRevealedSet] = useState<Set<number>>(() => new Set());
  const isInitialCategoriesRender = useRef(true);
  const isInitialRevealedRender = useRef(true);

  useModalAccessibility({
    isOpen: sheetOpen,
    onClose: () => setSheetOpen(false),
    modalRef: sheetRef,
  });

  // Build available category pills with counts
  const categoryPills = useMemo(() => {
    if (contentType === 'numbers' || contentType === 'time') return [];
    const counts = new Map<string, number>();
    for (const item of data) {
      if (item.category) {
        counts.set(item.category, (counts.get(item.category) || 0) + 1);
      }
    }
    if (counts.size < 2) return [];

    // Order everyday foundational categories first, followed by practical & specialized topic packs
    const priorityOrder = [
      'Greetings', 'Introductions', 'Courtesy', 'Politeness', 'Conversation', 'Communication',
      'Responses', 'Farewells', 'Essentials', 'Questions', 'Emergency',
      'Food & Drink', 'Dining', 'People', 'Family', 'Places', 'Home', 'Travel', 'Shopping',
      'Colors', 'Nature', 'Animals', 'Weather', 'Time', 'Calendar',
      'Verbs', 'Descriptions', 'Adjectives', 'Health', 'Finance', 'Tech', 'Business', 'Work', 'General'
    ];
    const entries = Array.from(counts.entries()).sort((a, b) => {
      const idxA = priorityOrder.indexOf(a[0]);
      const idxB = priorityOrder.indexOf(b[0]);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a[0].localeCompare(b[0]);
    });

    return entries.map(([cat, count]) => ({
      id: cat,
      label: localizeCategoryBadge(cat, baseLanguage) || cat,
      icon: CATEGORY_ICONS[cat.toLowerCase()] || '📌',
      count
    }));
  }, [data, contentType, baseLanguage]);

  const filteredData = useMemo(() => {
    if (selectedCategories.size === 0) return data;
    return data.filter(item => item.category && selectedCategories.has(item.category));
  }, [data, selectedCategories]);

  useEffect(() => {
    if (isInitialCategoriesRender.current) {
      isInitialCategoriesRender.current = false;
      return;
    }
    setSelectedCategories(prev => (prev.size === 0 ? prev : new Set()));
    setSheetOpen(prev => (prev ? false : prev));
  }, [data, title, currentLanguage]);

  const selectOnly = (id: string) => setSelectedCategories(new Set([id]));
  const clearCategories = () => setSelectedCategories(new Set());
  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    if (isInitialRevealedRender.current) {
      isInitialRevealedRender.current = false;
      return;
    }
    setRevealedSet(prev => (prev.size === 0 ? prev : new Set()));
  }, [filteredData, title, baseLanguage, activeCategory]);

  const toggleReveal = useCallback((index: number) => {
    setRevealedSet(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  const allRevealed = filteredData.length > 0 && revealedSet.size === filteredData.length;

  const toggleAll = useCallback(() => {
    setRevealedSet(prev => {
      if (filteredData.length > 0 && prev.size === filteredData.length) {
        return new Set();
      }
      const all = new Set<number>();
      for (let i = 0; i < filteredData.length; i++) {
        all.add(i);
      }
      return all;
    });
  }, [filteredData.length]);

  const resolvedCards = useMemo(() => {
    return filteredData.map(item => ({
      item,
      targetText: (item.russian || item.phrase || item.target || '').toString(),
      translatedText: resolveTranslation(item, currentLanguage, baseLanguage)
    }));
  }, [filteredData, currentLanguage, baseLanguage]);

  const allLabel = localizeCategoryBadge('all', baseLanguage) || 'All';

  return (
    <div className="section">
      <div className="phrases-header-section">
        <div className="phrases-header-text">
          <h2>{title}</h2>
          <p className="phrases-subtitle">
            {ui.tapCardToRevealSubtitle}
          </p>
        </div>
        <button
          type="button"
          className="study-toggle-btn"
          aria-pressed={allRevealed}
          onClick={toggleAll}
          aria-label={allRevealed ? `${ui.hideAll} ${title.toLowerCase()}` : `${ui.revealAll} ${title.toLowerCase()}`}
        >
          <FaSyncAlt className={`toggle-btn-icon ${allRevealed ? 'rotated' : ''}`} aria-hidden="true" />
          <span>{allRevealed ? ui.hideAll : ui.revealAll}</span>
        </button>
      </div>

      {categoryPills.length > 0 && !isMobile && (
        <div className="topic-pack-filter-bar" role="group" aria-label="Filter by topic or industry pack">
          <button
            type="button"
            className={`topic-pack-pill ${selectedCategories.size === 0 ? 'active' : ''}`}
            aria-pressed={selectedCategories.size === 0}
            data-category="all"
            onClick={clearCategories}
          >
            <span className="topic-pack-icon" aria-hidden="true">✨</span>
            <span className="topic-pack-label">{allLabel}</span>
            <span className="topic-pack-count">{data.length}</span>
          </button>
          {categoryPills.map((pill) => {
            const isSelected = selectedCategories.has(pill.id);
            return (
              <button
                key={pill.id}
                type="button"
                className={`topic-pack-pill ${isSelected ? 'active' : ''}`}
                aria-pressed={isSelected}
                data-category={pill.id}
                onClick={() => selectOnly(pill.id)}
              >
                <span className="topic-pack-icon" aria-hidden="true">{pill.icon}</span>
                <span className="topic-pack-label">{pill.label}</span>
                <span className="topic-pack-count">{pill.count}</span>
              </button>
            );
          })}
        </div>
      )}

      {categoryPills.length > 0 && isMobile && (
        <div className="topic-mobile-filter">
          <div className="topic-mobile-row">
            <button
              type="button"
              className={`topic-mobile-open ${selectedCategories.size > 0 ? 'has-selection' : ''}`}
              aria-haspopup="dialog"
              aria-expanded={sheetOpen}
              onClick={() => setSheetOpen(true)}
            >
              <span aria-hidden="true">🎛</span>
              <span>{ui.topics}</span>
              <span className="topic-pack-count">
                {selectedCategories.size > 0 ? selectedCategories.size : categoryPills.length}
              </span>
              <span aria-hidden="true">▾</span>
            </button>
            <div className="topic-mobile-strip" role="group" aria-label="Quick topics">
              <button
                type="button"
                className={`topic-pack-pill ${selectedCategories.size === 0 ? 'active' : ''}`}
                aria-pressed={selectedCategories.size === 0}
                onClick={clearCategories}
              >
                <span className="topic-pack-label">{allLabel}</span>
              </button>
              {categoryPills.slice(0, 6).map(pill => (
                <button
                  key={pill.id}
                  type="button"
                  className={`topic-pack-pill ${selectedCategories.has(pill.id) ? 'active' : ''}`}
                  aria-pressed={selectedCategories.has(pill.id)}
                  onClick={() => toggleCategory(pill.id)}
                >
                  <span className="topic-pack-icon" aria-hidden="true">{pill.icon}</span>
                  <span className="topic-pack-label">{pill.label}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedCategories.size > 0 && (
            <div className="topic-selected-chips">
              {categoryPills
                .filter(pill => selectedCategories.has(pill.id))
                .map(pill => (
                  <button
                    key={pill.id}
                    type="button"
                    className="topic-selected-chip"
                    aria-label={`${pill.label} ✕`}
                    onClick={() => toggleCategory(pill.id)}
                  >
                    <span aria-hidden="true">{pill.icon}</span> {pill.label} <span aria-hidden="true">✕</span>
                  </button>
                ))}
              <button type="button" className="topic-clear-link" onClick={clearCategories}>
                {ui.clearFilters}
              </button>
            </div>
          )}

          {sheetOpen && (
            <div className="topic-sheet-backdrop" onClick={() => setSheetOpen(false)} role="presentation">
              <div
                ref={sheetRef}
                className="topic-sheet"
                role="dialog"
                aria-modal="true"
                aria-label={ui.topics}
                onClick={e => e.stopPropagation()}
              >
                <div className="topic-sheet-header">
                  <h2>{ui.topics}</h2>
                  <button
                    type="button"
                    className="topic-sheet-close"
                    aria-label={ui.closeLabel}
                    onClick={() => setSheetOpen(false)}
                  >
                    <span aria-hidden="true">✕</span>
                  </button>
                </div>
                <div className="topic-sheet-chips">
                  {categoryPills.map(pill => {
                    const on = selectedCategories.has(pill.id);
                    return (
                      <button
                        key={pill.id}
                        type="button"
                        className={`topic-pack-pill ${on ? 'active' : ''}`}
                        aria-pressed={on}
                        onClick={() => toggleCategory(pill.id)}
                      >
                        <span className="topic-pack-icon" aria-hidden="true">{pill.icon}</span>
                        <span className="topic-pack-label">{pill.label}</span>
                        <span className="topic-pack-count">{pill.count}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="topic-sheet-footer">
                  <button
                    type="button"
                    className="topic-clear-link"
                    onClick={clearCategories}
                    disabled={selectedCategories.size === 0}
                  >
                    {ui.clearFilters}
                  </button>
                  <button type="button" className="topic-sheet-apply" onClick={() => setSheetOpen(false)}>
                    {ui.showCountItems.replace('{n}', String(filteredData.length))}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="phrases-container">
        {resolvedCards.map(({ item, targetText, translatedText }, index) => (
          <PhraseCard 
            key={`${activeCategory}-${index}`}
            cardIndex={index}
            targetText={targetText}
            translatedText={translatedText}
            pronunciation={item.pronunciation || ''}
            isRevealed={revealedSet.has(index)}
            onToggleIndex={toggleReveal}
            contentType={contentType}
            category={item.category}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Phrases;
