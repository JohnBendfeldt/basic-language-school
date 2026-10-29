import React, { useState, useEffect, useMemo } from 'react';
import { PhraseItem } from '../types/index';
import PronunciationButton from './PronunciationButton';
import { NumberBadge } from './NumberBadge';
import { FaSyncAlt } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { resolveTranslation, extractDigit } from '../utils/translationResolver';
import { localizeCategoryBadge } from '../utils/pageDictionary';

const CATEGORY_ICONS: Record<string, string> = {
  'all': '✨',
  'tech': '💻',
  'business': '💼',
  'health': '🏥',
  'colors': '🎨',
  'weather': '☀️',
  'travel': '✈️',
  'shopping': '🛍️',
  'food & drink': '🍲',
  'dining': '🍽️',
  'places': '🏙️',
  'transport': '🚆',
  'people': '👥',
  'greetings': '👋',
  'conversation': '💬',
  'introductions': '🤝',
  'politeness': '🙏',
  'responses': '✅',
  'farewells': '🚪',
  'emergency': '🆘',
  'essentials': '⭐',
  'work': '💼',
  'finance': '💵',
  'time': '⏱️',
  'questions': '❓',
  'common verbs': '🏃'
};

interface PhraseCardProps {
  targetText: string;
  translatedText: string;
  pronunciation: string;
  isRevealed: boolean;
  onToggleReveal: () => void;
  animationKey: number;
  contentType?: 'phrases' | 'words' | 'numbers' | 'time';
  category?: string;
  icon?: string;
}

const PhraseCard: React.FC<PhraseCardProps> = ({ 
  targetText, 
  translatedText, 
  pronunciation, 
  isRevealed, 
  onToggleReveal,
  animationKey,
  contentType = 'phrases',
  category,
  icon
}) => {
  const { currentLanguage, baseLanguage, ui } = useLanguage();
  const localizedCategory = localizeCategoryBadge(category, baseLanguage);

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
      key={`card-${animationKey}`}
    >
      <div className="phrase-card-top-row">
        {localizedCategory && (
          <div className="phrase-meta-badge">
            <span className="meta-category">{localizedCategory}</span>
          </div>
        )}
        {contentType === 'numbers' && numericValue && (
          <div className="phrase-number-pill">
            <NumberBadge value={numericValue} size={30} />
          </div>
        )}
      </div>
      <div className="phrase-header">
        <div className="phrase-title-group">
          {icon && contentType !== 'numbers' && (
            <span className="phrase-icon-badge" aria-hidden="true">
              {icon}
            </span>
          )}
          <h3 className="phrase-text">{targetText}</h3>
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
        {isRevealed ? (
          <div 
            className="phrase-revealed-wrap"
            role="button"
            tabIndex={0}
            aria-expanded={true}
            aria-label={`Hide translation for ${targetText}`}
            onClick={onToggleReveal}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggleReveal();
              }
            }}
          >
            <div className="phrase-revealed-body">
              <div className="phrase-revealed-translation-row">
                <p className="english">{translatedText}</p>
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
            <div className="card-hide-cue">
              <FaSyncAlt className="cue-icon mini" aria-hidden="true" />
              <span>{ui.tapToHide}</span>
            </div>
          </div>
        ) : (
          <button 
            type="button"
            className="phrase-reveal-btn" 
            aria-expanded={false}
            aria-label={`Reveal translation for ${targetText}`}
            onClick={onToggleReveal}
          >
            <FaSyncAlt className="cue-icon" aria-hidden="true" />
            <span>{ui.tapToReveal}</span>
          </button>
        )}
      </div>
    </div>
  );
};

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
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [revealedCards, setRevealedCards] = useState<boolean[]>(
    new Array(data.length).fill(false)
  );
  const [lastToggledCard, setLastToggledCard] = useState<number | null>(null);

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

    // Highlight industry & everyday topic packs first (Tech, Business, Health, Colors, Weather, Travel, Shopping), then remaining categories
    const priorityOrder = ['Tech', 'Business', 'Health', 'Colors', 'Weather', 'Travel', 'Shopping', 'Food & Drink', 'Dining', 'Places', 'Transport', 'People', 'Greetings', 'Conversation', 'Politeness', 'Emergency', 'Essentials', 'Work', 'Finance', 'Time', 'Questions', 'Common Verbs'];
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
    if (activeCategory === 'all') return data;
    return data.filter(item => item.category === activeCategory);
  }, [data, activeCategory]);

  useEffect(() => {
    setActiveCategory('all');
  }, [data, title, currentLanguage]);

  useEffect(() => {
    setRevealedCards(new Array(filteredData.length).fill(false));
    setLastToggledCard(null);
  }, [filteredData, title, baseLanguage, activeCategory]);

  const toggleReveal = (index: number) => {
    const newRevealedCards = [...revealedCards];
    newRevealedCards[index] = !newRevealedCards[index];
    setRevealedCards(newRevealedCards);
    setLastToggledCard(index);
  };

  const allRevealed = revealedCards.length > 0 && revealedCards.every(Boolean);

  const toggleAll = () => {
    const nextState = !allRevealed;
    setRevealedCards(new Array(filteredData.length).fill(nextState));
  };

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
          onClick={toggleAll}
          aria-label={allRevealed ? `${ui.hideAll} ${title.toLowerCase()}` : `${ui.revealAll} ${title.toLowerCase()}`}
        >
          <FaSyncAlt className={`toggle-btn-icon ${allRevealed ? 'rotated' : ''}`} aria-hidden="true" />
          <span>{allRevealed ? ui.hideAll : ui.revealAll}</span>
        </button>
      </div>

      {categoryPills.length > 0 && (
        <div className="topic-pack-filter-bar" role="group" aria-label="Filter by topic or industry pack">
          <button
            type="button"
            className={`topic-pack-pill ${activeCategory === 'all' ? 'active' : ''}`}
            aria-pressed={activeCategory === 'all'}
            data-category="all"
            onClick={() => setActiveCategory('all')}
          >
            <span className="topic-pack-icon" aria-hidden="true">✨</span>
            <span className="topic-pack-label">{allLabel}</span>
            <span className="topic-pack-count">{data.length}</span>
          </button>
          {categoryPills.map((pill) => {
            const isSelected = activeCategory === pill.id;
            const isFeaturedPack =
              pill.id === 'Tech' ||
              pill.id === 'Business' ||
              pill.id === 'Health' ||
              pill.id === 'Colors' ||
              pill.id === 'Weather';
            return (
              <button
                key={pill.id}
                type="button"
                className={`topic-pack-pill ${isSelected ? 'active' : ''} ${isFeaturedPack ? 'featured-pack' : ''}`}
                aria-pressed={isSelected}
                data-category={pill.id}
                onClick={() => setActiveCategory(pill.id)}
              >
                <span className="topic-pack-icon" aria-hidden="true">{pill.icon}</span>
                <span className="topic-pack-label">{pill.label}</span>
                <span className="topic-pack-count">{pill.count}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="phrases-container">
        {filteredData.map((item, index) => {
          const targetText = (item.russian || item.phrase || item.target || '').toString();
          const translatedText = resolveTranslation(item, currentLanguage, baseLanguage);

          return (
            <PhraseCard 
              key={`${activeCategory}-${index}`}
              targetText={targetText}
              translatedText={translatedText}
              pronunciation={item.pronunciation || ''}
              isRevealed={revealedCards[index]}
              onToggleReveal={() => toggleReveal(index)}
              animationKey={lastToggledCard === index ? Date.now() : index}
              contentType={contentType}
              category={item.category}
              icon={item.icon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Phrases;
