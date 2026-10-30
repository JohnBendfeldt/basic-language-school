import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaRedo, FaBookOpen, FaBolt, FaListUl, FaVolumeUp } from 'react-icons/fa';
import PronunciationButton from './PronunciationButton';
import WordIcon from './WordIcon';
import { useLanguage } from '../contexts/LanguageContext';
import { GrammarData, GrammarFlashcard, GenderNounRule, VerbConjugation } from '../types';
import { getGrammarForLanguage } from '../data/languages/grammarData';
import { resolveTranslation } from '../utils/translationResolver';

interface GrammarProps {
  grammarData?: GrammarData;
  initialTab?: 'flashcards' | 'gender' | 'verbs' | 'descriptions';
}

export const Grammar: React.FC<GrammarProps> = ({ grammarData, initialTab = 'flashcards' }) => {
  const { currentLanguage, baseLanguage } = useLanguage();

  // Dynamic language grammar
  const activeGrammar: GrammarData = grammarData || getGrammarForLanguage(currentLanguage, baseLanguage);

  const [activeTab, setActiveTab] = useState<'flashcards' | 'gender' | 'verbs' | 'descriptions'>(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

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
    badgeArticles: baseLanguage === 'ru' ? '🏷️ Артикли (a / an)' : baseLanguage === 'es' ? '🏷️ Artículos (a / an)' : baseLanguage === 'fr' ? '🏷️ Articles (a / an)' : baseLanguage === 'de' ? '🏷️ Artikel (a / an)' : '🏷️ Articles (a / an)',
    badgeGender: baseLanguage === 'ru' ? '🏷️ Род существительных' : baseLanguage === 'es' ? '🏷️ Género gramatical' : baseLanguage === 'fr' ? '🏷️ Genre des noms' : baseLanguage === 'de' ? '🏷️ Geschlecht' : '🏷️ Noun Gender',
    badgeVerb: baseLanguage === 'ru' ? '🔄 Время глагола' : baseLanguage === 'es' ? '🔄 Tiempo verbal' : baseLanguage === 'fr' ? '🔄 Temps du verbe' : baseLanguage === 'de' ? '🔄 Zeitform' : '🔄 Verb Tense',
    badgeDescription: baseLanguage === 'ru' ? '📐 Описание' : baseLanguage === 'es' ? '📐 Descripción' : baseLanguage === 'fr' ? '📐 Description' : baseLanguage === 'de' ? '📐 Beschreibung' : '📐 Description',
    howToRecognize: baseLanguage === 'ru' ? 'Как распознать:' : baseLanguage === 'es' ? 'Cómo reconocerlo:' : baseLanguage === 'fr' ? 'Comment reconnaître :' : baseLanguage === 'de' ? 'Erkennungsmerkmale:' : 'How to recognize:',
    highFrequencyExamples: baseLanguage === 'ru' ? 'Частые примеры:' : baseLanguage === 'es' ? 'Ejemplos frecuentes:' : baseLanguage === 'fr' ? 'Exemples fréquents :' : baseLanguage === 'de' ? 'Häufige Beispiele:' : 'High-frequency examples:',
    exampleInContext: baseLanguage === 'ru' ? 'Пример в контексте:' : baseLanguage === 'es' ? 'Ejemplo en contexto:' : baseLanguage === 'fr' ? 'Exemple en contexte :' : baseLanguage === 'de' ? 'Beispiel im Kontext:' : 'Example in context:',
    deckCompleted: baseLanguage === 'ru' ? 'Колода пройдена!' : baseLanguage === 'es' ? '¡Baraja completada!' : baseLanguage === 'fr' ? 'Paquet terminé !' : baseLanguage === 'de' ? 'Stapel abgeschlossen!' : 'Deck Completed!',
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
              {/* Header Badge & Deck Progress */}
              <div className="grammar-card-header">
                <span className="grammar-category-badge">
                  {currentCard.type === 'gender'
                    ? (currentLanguage === 'en' ? localizedLabels.badgeArticles : localizedLabels.badgeGender)
                    : currentCard.type === 'article'
                    ? localizedLabels.badgeArticles
                    : currentCard.type === 'verb'
                    ? localizedLabels.badgeVerb
                    : localizedLabels.badgeDescription}
                </span>
                <span className="grammar-progress-count">
                  {currentIndex + 1} / {flashcardDeck.length}
                </span>
              </div>

              {/* Prompt Hero Card */}
              {(() => {
                const promptParts = currentCard.prompt.split(/\s*➔\s*/);
                const heroWord = promptParts[0];
                const taskPrompt = promptParts.length > 1 ? promptParts[1] : null;
                const hasComplexOptions = currentCard.options.some(
                  (opt) => opt.includes('(') || opt.length > 7
                );
                const audioTextToPlay = currentCard.audioWord
                  ? currentCard.audioWord
                  : currentCard.article
                    ? `${currentCard.article} ${heroWord.replace(/^___\s*/, '').trim()}`
                    : heroWord.replace(/^___\s*/, '').trim() || currentCard.correctAnswer;

                return (
                  <>
                    <div className="grammar-prompt-box">
                      {currentCard.icon && (
                        <div className="grammar-icon-badge" aria-hidden="true">
                          <WordIcon
                            icon={currentCard.icon}
                            word={heroWord}
                            meaning={currentCard.translation}
                            size={42}
                            className="grammar-prompt-icon"
                          />
                        </div>
                      )}
                      <h3 className="grammar-card-prompt">{heroWord}</h3>
                      {currentCard.translation && (
                        <p className="grammar-card-translation">
                          {currentCard.translations?.[baseLanguage] ||
                            resolveTranslation(
                              {
                                word: currentCard.audioWord || heroWord.replace(/^___\s*/, '').trim(),
                                meaning: currentCard.translation,
                              },
                              currentLanguage,
                              baseLanguage
                            ) ||
                            currentCard.translation}
                        </p>
                      )}
                      {taskPrompt && (
                        <div className="grammar-prompt-task-pill">
                          <span className="task-pill-arrow">➔</span>
                          <span>{taskPrompt}</span>
                        </div>
                      )}
                    </div>

                    {/* Option Buttons */}
                    <div className={`grammar-options-grid ${hasComplexOptions ? 'options-stacked' : 'options-compact'}`}>
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

                        const parenMatch = option.match(/^(.+?)\s*\((.+?)\)$/);
                        const mainText = parenMatch ? parenMatch[1] : option;
                        const subText = parenMatch ? parenMatch[2] : null;

                        return (
                          <button
                            key={option}
                            type="button"
                            className={`grammar-option-btn ${btnStateClass} ${genderColorClass}`}
                            onClick={() => handleOptionClick(option)}
                            disabled={selectedOption !== null}
                          >
                            <div className="grammar-option-content">
                              <span className="grammar-option-main">{mainText}</span>
                              {subText && <span className="grammar-option-sub">({subText})</span>}
                            </div>
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
                            text={audioTextToPlay}
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
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="grammar-deck-complete-card">
              <span className="complete-trophy">🏆</span>
              <h3>{localizedLabels.deckCompleted}</h3>
              <p className="complete-score">
                {baseLanguage === 'ru' ? (
                  <>Правильно: <strong>{cardScore}</strong> из <strong>{flashcardDeck.length}</strong>!</>
                ) : baseLanguage === 'es' ? (
                  <>¡Acertaste <strong>{cardScore}</strong> de <strong>{flashcardDeck.length}</strong>!</>
                ) : baseLanguage === 'fr' ? (
                  <>Vous avez obtenu <strong>{cardScore}</strong> sur <strong>{flashcardDeck.length}</strong> !</>
                ) : baseLanguage === 'de' ? (
                  <>Du hast <strong>{cardScore}</strong> von <strong>{flashcardDeck.length}</strong> richtig!</>
                ) : (
                  <>You got <strong>{cardScore}</strong> out of <strong>{flashcardDeck.length}</strong> correct!</>
                )}
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
                <h5>{localizedLabels.howToRecognize}</h5>
                <ul>
                  {rule.rules.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="gender-examples-list">
                <h5>{localizedLabels.highFrequencyExamples}</h5>
                <div className="gender-examples-grid">
                  {rule.examples.map((ex) => (
                    <div key={ex.word} className="gender-example-item">
                      <WordIcon
                        icon={ex.icon || '📌'}
                        word={ex.word}
                        meaning={ex.meaning}
                        size={22}
                        className="example-icon"
                      />
                      <div className="example-text-wrap">
                        <strong className="example-target" style={{ color: rule.color }}>
                          {currentLanguage === 'ru' ? ex.word : `${rule.article} ${ex.word}`}
                        </strong>
                        <span className="example-meaning">{ex.meaning}</span>
                      </div>
                      <PronunciationButton
                        text={currentLanguage === 'ru' ? ex.word : `${rule.article} ${ex.word}`}
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
                {verbsList[activeVerbIndex].forms.map((item) => {
                  const cleanPronoun = item.pronoun.replace(/\s*\(.*?\)/g, '').split('/')[0].trim();
                  const audioTarget = cleanPronoun ? `${cleanPronoun} ${item.form}` : item.form;
                  return (
                    <div key={item.pronoun} className="conjugation-row">
                      <span className="conj-pronoun">{item.pronoun}</span>
                      <strong className="conj-form">{item.form}</strong>
                      <PronunciationButton
                        text={audioTarget}
                        lang={currentLanguage}
                        className="conj-audio-btn"
                      />
                    </div>
                  );
                })}
              </div>

              {verbsList[activeVerbIndex].exampleSentence && (
                <div className="verb-example-box">
                  <div className="verb-example-header-row">
                    <span className="example-label">{localizedLabels.exampleInContext}</span>
                    <PronunciationButton
                      text={verbsList[activeVerbIndex].exampleSentence?.target || ''}
                      lang={currentLanguage}
                      className="verb-example-audio"
                    />
                  </div>
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

