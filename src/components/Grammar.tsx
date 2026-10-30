import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaRedo, FaBookOpen, FaBolt, FaListUl } from 'react-icons/fa';
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

const getVerbLanguageNotice = (
  lang: string,
  baseLang: string
): { title: string; text: string } | null => {
  if (lang === 'zh') {
    if (baseLang === 'ru') {
      return {
        title: 'В китайском языке глаголы НЕ спрягаются!',
        text: 'Форма глагола не меняется по лицам (я, ты, он, мы, они). Время, вид и направленность действия выражаются частицами: 在 (длительное), 了 (завершённое), 过 (опыт в прошлом), 要/会 (будущее/намерение) и отрицаниями 不 / 没.',
      };
    }
    if (baseLang === 'de') {
      return {
        title: 'Im Chinesischen gibt es keine Konjugation!',
        text: 'Die Verbform bleibt für alle Personen (ich, du, er, wir, sie) exakt gleich. Zeiten und Aspekte werden durch funktionale Partikeln wie 在 (Verlauf), 了 (abgeschlossen), 过 (Erfahrung) und 要 (Zukunft) ausgedrückt.',
      };
    }
    if (baseLang === 'es') {
      return {
        title: '¡El chino mandarín no tiene conjugación verbal!',
        text: 'La forma verbal es idéntica para todas las personas (yo, tú, él, nosotros). El tiempo y aspecto se expresan con partículas como 在 (en progreso), 了 (completado), 过 (experiencia) y 要 (futuro).',
      };
    }
    if (baseLang === 'fr') {
      return {
        title: 'Le chinois mandarin ne se conjugue pas !',
        text: 'La forme du verbe reste identique pour toutes les personnes (je, tu, il, nous). Le temps et l\'aspect s\'expriment par des particules comme 在 (en cours), 了 (accompli), 过 (expérience passée) et 要 (futur).',
      };
    }
    return {
      title: 'Mandarin Chinese has NO verb conjugations!',
      text: 'Verbs never change by person (I, you, he, we, they all use the exact same base word). Time and aspect are expressed using functional particles like 在 (ongoing), 了 (completed), 过 (past experience), and 要 (future intention).',
    };
  }

  if (lang === 'id') {
    if (baseLang === 'ru') {
      return {
        title: 'В индонезийском языке нет спряжения глаголов!',
        text: 'Глагол не меняется по лицам и числам. Время и модальность выражаются служебными словами: sedang (сейчас), sudah (уже), akan (будет) и belum (ещё не).',
      };
    }
    if (baseLang === 'de') {
      return {
        title: 'Im Indonesischen gibt es keine Konjugation!',
        text: 'Verben verändern sich weder nach Person noch nach Zahl. Zeiten werden durch Zeitmarken wie sedang (gerade), sudah (bereits) und akan (wird) angezeigt.',
      };
    }
    if (baseLang === 'es') {
      return {
        title: '¡El indonesio no tiene conjugaciones verbales!',
        text: 'El verbo no cambia según la persona. Los tiempos se indican mediante marcadores: sedang (actualmente), sudah (ya), akan (futuro) y belum (aún no).',
      };
    }
    if (baseLang === 'fr') {
      return {
        title: 'L\'indonésien ne conjugue pas les verbes !',
        text: 'Le verbe ne varie ni en personne ni en nombre. Le temps est indiqué par des marqueurs temporels : sedang (en cours), sudah (déjà), akan (futur) et belum (pas encore).',
      };
    }
    return {
      title: 'Indonesian verbs do NOT conjugate!',
      text: 'Verbs never change form for person (I, you, they). Time is indicated using auxiliary marker words: sedang (currently), sudah (already), akan (will), and belum (not yet).',
    };
  }

  if (lang === 'ja') {
    if (baseLang === 'ru') {
      return {
        title: 'Японские глаголы НЕ изменяются по лицам!',
        text: 'Форма одинакова для «я», «ты», «они». Глаголы спрягаются по уровню вежливости (вежливая 〜ます / словарная), времени (прошедшее 〜ました) и утверждению/отрицанию (〜ません).',
      };
    }
    if (baseLang === 'de') {
      return {
        title: 'Japanische Verben konjugieren NICHT nach Person!',
        text: 'Die Form ist für „ich“, „du“, „sie“ identisch. Verben ändern sich nach Höflichkeitsform (〜ます), Zeitform (Vergangenheit 〜ました) und Verneinung (〜ません).',
      };
    }
    if (baseLang === 'es') {
      return {
        title: '¡Los verbos japoneses NO conjugan por persona!',
        text: 'La forma es idéntica para "yo", "tú", "ellos". Los verbos cambian por nivel de cortesía (〜ます), tiempo (pasado 〜ました) y polaridad negativa (〜ません).',
      };
    }
    if (baseLang === 'fr') {
      return {
        title: 'Les verbes japonais ne varient PAS selon la personne !',
        text: 'La forme est identique pour « je », « tu », « ils ». Les verbes se déclinent selon la politesse (〜ます), le temps (passé 〜ました) et la polarité (négation 〜ません).',
      };
    }
    return {
      title: 'Japanese verbs do NOT conjugate by person!',
      text: 'Whether saying "I", "you", or "they", the verb form is identical. Japanese verbs conjugate instead for politeness (polite 〜ます vs plain), tense (past 〜ました), and negative polarity (〜ません).',
    };
  }

  if (lang === 'ko') {
    if (baseLang === 'ru') {
      return {
        title: 'Корейские глаголы НЕ изменяются по лицам!',
        text: 'Форма не зависит от лица (я, ты, мы). Глаголы изменяются по уровням вежливости (вежливый 해요체 / официальный 습니다), времени (прошедшее 았/었어요, будущее ㄹ 거예요) и отрицанию.',
      };
    }
    if (baseLang === 'de') {
      return {
        title: 'Koreanische Verben konjugieren NICHT nach Person!',
        text: 'Die Form ist unabhängig von der Person (ich, du, wir). Verben verändern sich nach Höflichkeitsstufen (해요체 / 습니다), Zeitformen (Vergangenheit 았/었어요, Zukunft ㄹ 거예요) und Verneinung.',
      };
    }
    if (baseLang === 'es') {
      return {
        title: '¡Los verbos coreanos NO conjugan por persona!',
        text: 'La forma no depende de la persona (yo, tú, nosotros). Los verbos cambian según el nivel de cortesía (해요체 / 습니다), el tiempo (pasado 았/었어요, futuro ㄹ 거예요) y la negación.',
      };
    }
    if (baseLang === 'fr') {
      return {
        title: 'Les verbes coréens ne varient PAS selon la personne !',
        text: 'La forme ne dépend pas de la personne (je, tu, nous). Les verbes se conjuguent selon le niveau de politesse (해요체 / 습니다), le temps (passé 았/었어요, futur ㄹ 거예요) et la négation.',
      };
    }
    return {
      title: 'Korean verbs do NOT conjugate by person!',
      text: 'Korean verbs remain the same regardless of who the subject is (I, you, he, we). Instead, verbs conjugate for politeness levels (informal polite 해요, formal 습니다) and tenses (past 았/었어요, future ㄹ 거예요).',
    };
  }

  return null;
};

export const Grammar: React.FC<GrammarProps> = ({ grammarData, initialTab = 'flashcards' }) => {
  const { currentLanguage, baseLanguage } = useLanguage();

  // Dynamic language grammar: always resolve and localize for active language pair
  const activeGrammar: GrammarData = React.useMemo(() => {
    return getGrammarForLanguage(currentLanguage, baseLanguage, grammarData);
  }, [currentLanguage, baseLanguage, grammarData]);

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

  // Stable pseudo-random shuffle of options for each flashcard so answers aren't predictable
  const cardOptions = React.useMemo(() => {
    if (!currentCard?.options) return [];
    const opts = [...currentCard.options];
    let seed = 0;
    for (let i = 0; i < (currentCard.id || '').length; i++) {
      seed = (seed * 31 + currentCard.id.charCodeAt(i)) & 0xffffffff;
    }
    for (let i = opts.length - 1; i > 0; i--) {
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      const j = Math.abs(seed) % (i + 1);
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
  }, [currentCard?.id, currentCard?.options]);

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
    verbs: (() => {
      if (currentLanguage === 'zh') return baseLanguage === 'ru' ? 'Глаголы и частицы' : baseLanguage === 'de' ? 'Verben & Partikeln' : baseLanguage === 'es' ? 'Verbos y partículas' : baseLanguage === 'fr' ? 'Verbes et particules' : 'Verbs & Particles';
      if (currentLanguage === 'id') return baseLanguage === 'ru' ? 'Глаголы и маркеры' : baseLanguage === 'de' ? 'Verben & Zeitmarker' : baseLanguage === 'es' ? 'Verbos y marcadores' : baseLanguage === 'fr' ? 'Verbes et marqueurs' : 'Verb Markers';
      if (currentLanguage === 'ja' || currentLanguage === 'ko') return baseLanguage === 'ru' ? 'Формы вежливости' : baseLanguage === 'de' ? 'Höflichkeitsformen' : baseLanguage === 'es' ? 'Formas y Cortesía' : baseLanguage === 'fr' ? 'Formes de politesse' : 'Verb Forms & Politeness';
      return baseLanguage === 'de' ? 'Verben & Konjugation' : baseLanguage === 'es' ? 'Verbos y Tiempos' : baseLanguage === 'fr' ? 'Verbes & Temps' : baseLanguage === 'ru' ? 'Глаголы и времена' : 'Verb Tenses';
    })(),
    descriptions: (() => {
      const isPatternLang = ['tr', 'zh', 'ja', 'ko', 'hi', 'ar', 'id'].includes(currentLanguage);
      if (isPatternLang) {
        if (baseLanguage === 'de') return 'Regeln & Muster';
        if (baseLanguage === 'es') return 'Reglas y Patrones';
        if (baseLanguage === 'fr') return 'Règles et Modèles';
        if (baseLanguage === 'ru') return 'Правила и модели';
        return 'Rules & Patterns';
      }
      return baseLanguage === 'de' ? 'Beschreibungen & Adjektive' : baseLanguage === 'es' ? 'Descripciones' : baseLanguage === 'fr' ? 'Descriptions' : baseLanguage === 'ru' ? 'Описания' : 'Descriptions';
    })(),
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
                const activePrompt = currentCard.prompts?.[baseLanguage] || currentCard.prompt;
                const promptParts = activePrompt.split(/\s*➔\s*/);
                const heroWord = promptParts[0];
                const taskPrompt = promptParts.length > 1 ? promptParts[1] : null;
                const hasComplexOptions = cardOptions.some(
                  (opt) => opt.includes('(') || opt.length > 7
                );
                let audioTextToPlay = currentCard.audioWord;
                if (!audioTextToPlay) {
                  if (currentCard.article) {
                    audioTextToPlay = `${currentCard.article} ${heroWord.replace(/^___\s*/, '').trim()}`;
                  } else if (taskPrompt && taskPrompt.includes('___')) {
                    audioTextToPlay = taskPrompt.replace('___', currentCard.correctAnswer).replace(/\s+/g, ' ').trim();
                  } else if (heroWord.includes('___')) {
                    audioTextToPlay = heroWord.replace('___', currentCard.correctAnswer).replace(/\s+/g, ' ').trim();
                  } else {
                    audioTextToPlay = currentCard.correctAnswer;
                  }
                }

                const renderPromptWithBlank = (text: string) => {
                  if (!text || !text.includes('___')) return text;
                  const parts = text.split('___');
                  const isCorrect = selectedOption === currentCard.correctAnswer;

                  return (
                    <>
                      {parts.map((part, idx) => (
                        <React.Fragment key={idx}>
                          {part}
                          {idx < parts.length - 1 && (
                            selectedOption ? (
                              <span className={`grammar-blank-filled ${isCorrect ? 'correct' : 'incorrect'}`}>
                                {selectedOption}
                              </span>
                            ) : (
                              <span className="grammar-blank-slot" aria-label="blank space">
                                <span className="grammar-blank-line" />
                              </span>
                            )
                          )}
                        </React.Fragment>
                      ))}
                    </>
                  );
                };

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
                      <h3 className="grammar-card-prompt">{renderPromptWithBlank(heroWord)}</h3>
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
                          <span>{renderPromptWithBlank(taskPrompt)}</span>
                        </div>
                      )}
                    </div>

                    {/* Option Buttons */}
                    <div className={`grammar-options-grid ${hasComplexOptions ? 'options-stacked' : 'options-compact'}`}>
                      {cardOptions.map((option) => {
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
                          {currentCard.explanations?.[baseLanguage] || currentCard.explanation}
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
                  {rule.examples.map((ex) => {
                    const hasGrammaticalArticle = ['de', 'fr', 'es', 'pt', 'en'].includes(currentLanguage);
                    const displayTarget = hasGrammaticalArticle ? `${rule.article} ${ex.word}` : ex.word;
                    return (
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
                            {displayTarget}
                          </strong>
                          <span className="example-meaning">{ex.meaning}</span>
                        </div>
                        <PronunciationButton
                          text={displayTarget}
                          lang={currentLanguage}
                          audioCategory="grammar"
                          className="example-mini-audio"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View 3: Verb Conjugation Tables */}
      {activeTab === 'verbs' && verbsList.length > 0 && (
        <div className="verb-matrix-container">
          {(() => {
            const notice = getVerbLanguageNotice(currentLanguage, baseLanguage);
            if (!notice) return null;
            return (
              <div className="verb-grammar-notice">
                <span className="notice-icon" aria-hidden="true">💡</span>
                <div className="notice-body">
                  <strong>{notice.title}</strong>
                  <p>{notice.text}</p>
                </div>
              </div>
            );
          })()}

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
                  audioCategory="grammar"
                  className="verb-main-audio"
                />
              </div>

              <div className="conjugation-table">
                {verbsList[activeVerbIndex].forms.map((item) => {
                  const isNonPersonConjugated = ['zh', 'id', 'ja', 'ko'].includes(currentLanguage);
                  const cleanPronoun = item.pronoun.replace(/\s*\(.*?\)/g, '').split('/')[0].trim();
                  const [mainForm, formDesc] = item.form.split(/\s*—\s*/);
                  const cleanForm = mainForm.replace(/\s*\([^)]*\)\s*/g, '').split('/')[0].trim();
                  
                  let audioTarget = cleanForm;
                  if (!isNonPersonConjugated && cleanPronoun && (!/[a-zA-Z]/.test(cleanPronoun) || currentLanguage === 'en')) {
                    audioTarget = `${cleanPronoun} ${cleanForm}`;
                  }

                  return (
                    <div key={item.pronoun} className="conjugation-row">
                      <span className="conj-pronoun">{item.pronoun}</span>
                      <div className="conj-form-wrap">
                        <strong className="conj-form">{mainForm}</strong>
                        {formDesc && <span className="conj-form-desc">{formDesc}</span>}
                      </div>
                      <PronunciationButton
                        text={audioTarget}
                        lang={currentLanguage}
                        audioCategory="grammar"
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
                  <span>{desc.headers?.[0] || (baseLanguage === 'ru' ? 'Исходная форма' : baseLanguage === 'es' ? 'Positivo' : baseLanguage === 'fr' ? 'Positif' : baseLanguage === 'de' ? 'Grundform' : 'Base (Positive)')}</span>
                  <span>{desc.headers?.[1] || (baseLanguage === 'ru' ? 'Сравнительная' : baseLanguage === 'es' ? 'Comparativo' : baseLanguage === 'fr' ? 'Comparatif' : baseLanguage === 'de' ? 'Komparativ' : 'Comparative')}</span>
                  <span>{desc.headers?.[2] || (baseLanguage === 'ru' ? 'Превосходная' : baseLanguage === 'es' ? 'Superlativo' : baseLanguage === 'fr' ? 'Superlatif' : baseLanguage === 'de' ? 'Superlativ' : 'Superlative')}</span>
                  <span>{desc.headers?.[3] || (baseLanguage === 'ru' ? 'Значение' : baseLanguage === 'es' ? 'Significado' : baseLanguage === 'fr' ? 'Sens' : baseLanguage === 'de' ? 'Bedeutung' : 'Meaning')}</span>
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

