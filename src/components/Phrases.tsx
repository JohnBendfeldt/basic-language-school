import React, { useState, useEffect } from 'react';
import { PhraseItem } from '../types/index';
import PronunciationButton from './PronunciationButton';
import { NumberBadge } from './NumberBadge';
import { FaSyncAlt } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { resolveTranslation } from '../utils/translationResolver';

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

  // Extract numeric digits from translatedText/targetText if this is numbers mode
  let numericValue: string | null = null;
  if (contentType === 'numbers') {
    const numMatch = (translatedText || targetText).match(/\b\d+([,.]\d+)?\b/);
    if (numMatch) {
      numericValue = numMatch[0];
    }
  }

  return (
    <div 
      className={`phrase-card ${contentType === 'numbers' ? 'phrase-card-number' : ''} ${isRevealed ? 'phrase-revealed' : 'phrase-hidden'}`} 
      key={`card-${animationKey}`}
    >
      <div className="phrase-card-top-row">
        {category && (
          <div className="phrase-meta-badge">
            <span className="meta-category">{category}</span>
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
  const [revealedCards, setRevealedCards] = useState<boolean[]>(
    new Array(data.length).fill(false)
  );
  const [lastToggledCard, setLastToggledCard] = useState<number | null>(null);

  useEffect(() => {
    setRevealedCards(new Array(data.length).fill(false));
    setLastToggledCard(null);
  }, [data, title, baseLanguage]);

  const toggleReveal = (index: number) => {
    const newRevealedCards = [...revealedCards];
    newRevealedCards[index] = !newRevealedCards[index];
    setRevealedCards(newRevealedCards);
    setLastToggledCard(index);
  };

  const allRevealed = revealedCards.length > 0 && revealedCards.every(Boolean);

  const toggleAll = () => {
    const nextState = !allRevealed;
    setRevealedCards(new Array(data.length).fill(nextState));
  };

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

      <div className="phrases-container">
        {data.map((item, index) => {
          const targetText = (item.russian || item.phrase || item.target || '').toString();
          const translatedText = resolveTranslation(item, currentLanguage, baseLanguage);

          return (
            <PhraseCard 
              key={index}
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
