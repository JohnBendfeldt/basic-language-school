import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaRedo, FaBookOpen, FaBolt, FaListUl, FaVolumeUp } from 'react-icons/fa';
import PronunciationButton from './PronunciationButton';
import { useLanguage } from '../contexts/LanguageContext';
import { GrammarData, GrammarFlashcard, GenderNounRule, VerbConjugation } from '../types';
import { getGrammarForLanguage } from '../data/languages/grammarData';

interface GrammarProps {
  grammarData?: GrammarData;
}

export const Grammar: React.FC<GrammarProps> = ({ grammarData }) => {
  const { currentLanguage, baseLanguage } = useLanguage();

  // Dynamic language grammar
  const activeGrammar: GrammarData = grammarData || getGrammarForLanguage(currentLanguage);

  const [activeTab, setActiveTab] = useState<'flashcards' | 'gender' | 'verbs' | 'descriptions'>('flashcards');

  // Flashcard Deck State
  const flashcardDeck: GrammarFlashcard[] = activeGrammar.flashcards && activeGrammar.flashcards.length > 0
    ? activeGrammar.flashcards
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [cardScore, setCardScore] = useState(0);
  const [deckFinished, setDeckFinished] = useState(false);

  // Verb Matrix State
  const verbsList: VerbConjugation[] = activeGrammar.verbs && activeGrammar.verbs.length > 0
    ? activeGrammar.verbs
    : [];
  const [activeVerbIndex, setActiveVerbIndex] = useState(0);

  // Reset progress when language or grammar data changes
  React.useEffect(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setCardScore(0);
    setDeckFinished(false);
    setActiveVerbIndex(0);
  }, [currentLanguage, grammarData]);

  const currentCard = flashcardDeck[currentIndex] || flashcardDeck[0];

  const handleOptionClick = (option: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    if (option === currentCard.correctAnswer) {
      setCardScore(prev => prev + 1);
    }
  };

  const handleNextCard = () => {
    if (currentIndex + 1 < flashcardDeck.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setDeckFinished(true);
    }
  };

  const handleRestartDeck = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setCardScore(0);
    setDeckFinished(false);
  };

  const localizedLabels = {
    flashcards: baseLanguage === 'de' ? 'Karteikarten' : baseLanguage === 'es' ? 'Tarjetas' : baseLanguage === 'fr' ? 'Flashcards' : baseLanguage === 'ru' ? 'Карточки' : 'Flashcards',
    gender: baseLanguage === 'de' ? 'Artikel & Geschlecht' : baseLanguage === 'es' ? 'Artículos y Género' : baseLanguage === 'fr' ? 'Articles & Genres' : baseLanguage === 'ru' ? 'Артикли и род' : 'Noun Genders',
    verbs: baseLanguage === 'de' ? 'Verben & Konjugation' : baseLanguage === 'es' ? 'Verbos y Tiempos' : baseLanguage === 'fr' ? 'Verbes & Temps' : baseLanguage === 'ru' ? 'Глаголы и времена' : 'Verb Tenses',
    descriptions: baseLanguage === 'de' ? 'Beschreibungen & Adjektive' : baseLanguage === 'es' ? 'Descripciones' : baseLanguage === 'fr' ? 'Descriptions' : baseLanguage === 'ru' ? 'Описания' : 'Descriptions',
    next: baseLanguage === 'de' ? 'Nächste Karte' : baseLanguage === 'es' ? 'Siguiente' : baseLanguage === 'fr' ? 'Suivant' : baseLanguage === 'ru' ? 'Далее' : 'Next Card',
    restart: baseLanguage === 'de' ? 'Neustart' : baseLanguage === 'es' ? 'Reiniciar' : baseLanguage === 'fr' ? 'Recommencer' : baseLanguage === 'ru' ? 'Заново' : 'Practice Again',
  };

  return (
    <div className="grammar-section" data-testid="grammar-component">
      {/* Secondary Tab Switcher */}
      <div className="grammar-subtabs-nav" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'flashcards'}
          className={`grammar-tab-btn ${activeTab === 'flashcards' ? 'active' : ''}`}
          onClick={() => setActiveTab('flashcards')}
        >
          <FaBolt className="tab-btn-icon" />
          <span>{localizedLabels.flashcards}</span>
        </button>

        {activeGrammar.genderRules && activeGrammar.genderRules.length > 0 && (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'gender'}
            className={`grammar-tab-btn ${activeTab === 'gender' ? 'active' : ''}`}
            onClick={() => setActiveTab('gender')}
          >
            <FaBookOpen className="tab-btn-icon" />
            <span>{localizedLabels.gender}</span>
          </button>
        )}

        {verbsList.length > 0 && (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'verbs'}
            className={`grammar-tab-btn ${activeTab === 'verbs' ? 'active' : ''}`}
            onClick={() => setActiveTab('verbs')}
          >
            <FaListUl className="tab-btn-icon" />
            <span>{localizedLabels.verbs}</span>
          </button>
        )}

        {activeGrammar.descriptions && activeGrammar.descriptions.length > 0 && (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'descriptions'}
            className={`grammar-tab-btn ${activeTab === 'descriptions' ? 'active' : ''}`}
            onClick={() => setActiveTab('descriptions')}
          >
            <span>{localizedLabels.descriptions}</span>
          </button>
        )}
      </div>

      {/* View 1: Interactive Flashcards */}
      {activeTab === 'flashcards' && (
        <div className="grammar-flashcard-container">
          {!currentCard ? (
            <div className="grammar-card">
              <p>No flashcards currently available for this section.</p>
            </div>
          ) : !deckFinished ? (
            <div className="grammar-card">
              <div className="grammar-card-header">
                <span className="grammar-category-badge">
                  {currentCard.type === 'gender' ? '🏷️ Noun Gender' : currentCard.type === 'verb' ? '🔄 Verb Tense' : '📐 Description'}
                </span>
                <span className="grammar-progress-count">
                  {currentIndex + 1} / {flashcardDeck.length}
                </span>
              </div>

              <div className="grammar-prompt-box">
                {currentCard.icon && <span className="grammar-prompt-icon">{currentCard.icon}</span>}
                <h3 className="grammar-card-prompt">{currentCard.prompt}</h3>
                {currentCard.translation && (
                  <p className="grammar-card-translation">({currentCard.translation})</p>
                )}
              </div>

              {/* Option Buttons */}
              <div className="grammar-options-grid">
                {currentCard.options.map((option) => {
                  const isSelected = selectedOption === option;
                  const isCorrect = option === currentCard.correctAnswer;
                  let btnStateClass = '';

                  if (selectedOption !== null) {
                    if (isCorrect) btnStateClass = 'option-correct';
                    else if (isSelected && !isCorrect) btnStateClass = 'option-incorrect';
                    else btnStateClass = 'option-dimmed';
                  }

                  // Gender color hints for German der/die/das
                  let genderColorClass = '';
                  if (option === 'der') genderColorClass = 'badge-masculine';
                  if (option === 'die') genderColorClass = 'badge-feminine';
                  if (option === 'das') genderColorClass = 'badge-neuter';

                  return (
                    <button
                      key={option}
                      type="button"
                      className={`grammar-option-btn ${btnStateClass} ${genderColorClass}`}
                      onClick={() => handleOptionClick(option)}
                      disabled={selectedOption !== null}
                    >
                      <span className="grammar-option-text">{option}</span>
                      {selectedOption !== null && isCorrect && <FaCheckCircle className="option-state-icon" />}
                      {selectedOption !== null && isSelected && !isCorrect && <FaTimesCircle className="option-state-icon" />}
                    </button>
                  );
                })}
              </div>

              {/* Immediate Feedback Card */}
              {selectedOption !== null && (
                <div className={`grammar-feedback-box ${selectedOption === currentCard.correctAnswer ? 'feedback-correct' : 'feedback-incorrect'}`}>
                  <p className="feedback-explanation">
                    {selectedOption === currentCard.correctAnswer ? '✨ ' : '💡 '}
                    {currentCard.explanation}
                  </p>

                  <div className="feedback-actions">
                    <PronunciationButton
                      text={currentCard.article ? `${currentCard.article} ${currentCard.prompt.replace(/^___\s*/, '').replace(/\s*\(.*\)/, '')}` : currentCard.correctAnswer}
                      lang={currentLanguage}
                      label="Listen"
                      className="grammar-audio-btn"
                    />

                    <button
                      type="button"
                      className="grammar-next-btn"
                      onClick={handleNextCard}
                      autoFocus
                    >
                      {localizedLabels.next} ➔
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grammar-deck-complete-card">
              <span className="complete-trophy">🏆</span>
              <h3>Deck Completed!</h3>
              <p className="complete-score">
                You got <strong>{cardScore}</strong> out of <strong>{flashcardDeck.length}</strong> correct!
              </p>
              <button
                type="button"
                className="grammar-restart-btn"
                onClick={handleRestartDeck}
              >
                <FaRedo /> {localizedLabels.restart}
              </button>
            </div>
          )}
        </div>
      )}

      {/* View 2: Gender Nouns Guide */}
      {activeTab === 'gender' && activeGrammar.genderRules && (
        <div className="gender-rules-grid">
          {activeGrammar.genderRules.map((rule: GenderNounRule) => (
            <div
              key={rule.article}
              className="gender-rule-card"
              style={{ borderTopColor: rule.color }}
            >
              <div className="gender-card-header">
                <span className="gender-article-badge" style={{ backgroundColor: rule.color }}>
                  {rule.article}
                </span>
                <h4>{rule.name}</h4>
              </div>

              <p className="gender-desc">{rule.description}</p>

              <div className="gender-rule-list">
                <h5>How to recognize:</h5>
                <ul>
                  {rule.rules.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="gender-examples-list">
                <h5>High-frequency examples:</h5>
                <div className="gender-examples-grid">
                  {rule.examples.map((ex) => (
                    <div key={ex.word} className="gender-example-item">
                      <span className="example-icon">{ex.icon || '📌'}</span>
                      <div className="example-text-wrap">
                        <strong className="example-target" style={{ color: rule.color }}>
                          {rule.article} {ex.word}
                        </strong>
                        <span className="example-meaning">{ex.meaning}</span>
                      </div>
                      <PronunciationButton
                        text={`${rule.article} ${ex.word}`}
                        lang={currentLanguage}
                        className="example-mini-audio"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View 3: Verb Conjugation Tables */}
      {activeTab === 'verbs' && verbsList.length > 0 && (
        <div className="verb-matrix-container">
          <div className="verb-selector-scroll">
            {verbsList.map((v, idx) => (
              <button
                key={v.verb}
                type="button"
                className={`verb-pill-btn ${idx === activeVerbIndex ? 'active' : ''}`}
                onClick={() => setActiveVerbIndex(idx)}
              >
                <strong>{v.verb}</strong>
                <span className="verb-pill-meaning">({v.meaning})</span>
              </button>
            ))}
          </div>

          {verbsList[activeVerbIndex] && (
            <div className="verb-detail-card">
              <div className="verb-detail-header">
                <div>
                  <h3>
                    <span className="verb-name">{verbsList[activeVerbIndex].verb}</span>
                    <span className="verb-meaning-tag">— {verbsList[activeVerbIndex].meaning}</span>
                  </h3>
                  <span className="verb-tense-badge">{verbsList[activeVerbIndex].tense}</span>
                </div>
                <PronunciationButton
                  text={verbsList[activeVerbIndex].verb}
                  lang={currentLanguage}
                  className="verb-main-audio"
                />
              </div>

              <div className="conjugation-table">
                {verbsList[activeVerbIndex].forms.map((item) => (
                  <div key={item.pronoun} className="conjugation-row">
                    <span className="conj-pronoun">{item.pronoun}</span>
                    <strong className="conj-form">{item.form}</strong>
                    <PronunciationButton
                      text={`${item.pronoun} ${item.form}`}
                      lang={currentLanguage}
                      className="conj-audio-btn"
                    />
                  </div>
                ))}
              </div>

              {verbsList[activeVerbIndex].exampleSentence && (
                <div className="verb-example-box">
                  <span className="example-label">Example in context:</span>
                  <p className="example-target-line">
                    «{verbsList[activeVerbIndex].exampleSentence?.target}»
                  </p>
                  <p className="example-translation-line">
                    ({verbsList[activeVerbIndex].exampleSentence?.translation})
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* View 4: Descriptions & Adjectives */}
      {activeTab === 'descriptions' && activeGrammar.descriptions && (
        <div className="descriptions-container">
          {activeGrammar.descriptions.map((desc, idx) => (
            <div key={idx} className="description-card">
              <h3>{desc.title}</h3>
              <p className="description-explanation">{desc.explanation}</p>

              <div className="comparison-table">
                <div className="comparison-header-row">
                  <span>Base (Positive)</span>
                  <span>Comparative</span>
                  <span>Superlative</span>
                  <span>Meaning</span>
                </div>
                {desc.examples.map((item, rowIdx) => (
                  <div key={rowIdx} className="comparison-data-row">
                    <span className="comp-positive">{item.positive}</span>
                    <span className="comp-comparative">{item.comparative}</span>
                    <span className="comp-superlative">{item.superlative}</span>
                    <span className="comp-meaning">{item.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Grammar;

