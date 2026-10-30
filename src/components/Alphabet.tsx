import React, { useState } from 'react';
import PronunciationButton from './PronunciationButton';
import Grammar from './Grammar';
import WordIcon from './WordIcon';
import { AlphabetItem } from '../types/index';
import { useLanguage } from '../contexts/LanguageContext';
import { getPageContent, getAlphabetLabels } from '../utils/pageDictionary';
import { resolveTranslation } from '../utils/translationResolver';

interface AlphabetProps {
  data: AlphabetItem[];
  initialSubTab?: 'alphabet' | 'grammar';
  grammarInitialTab?: 'flashcards' | 'gender' | 'verbs' | 'descriptions';
}

const Alphabet: React.FC<AlphabetProps> = ({
  data,
  initialSubTab = 'alphabet',
  grammarInitialTab = 'flashcards'
}) => {
  const { currentLanguage, baseLanguage, currentMeta, ui } = useLanguage();
  const [activeView, setActiveView] = useState<'alphabet' | 'grammar'>(initialSubTab);

  React.useEffect(() => {
    if (initialSubTab) {
      setActiveView(initialSubTab);
    }
  }, [initialSubTab]);
  const pageContent = getPageContent('alphabet', currentLanguage, baseLanguage);
  const labels = getAlphabetLabels(baseLanguage);

  // Preserve legacy English native learner titles for backwards test compatibility
  const headerTitle = baseLanguage === 'en'
    ? (currentLanguage === 'ru' ? 'Russian Alphabet (Cyrillic)' : `${currentMeta.name} Alphabet`)
    : pageContent.title;

  const headerSubtitle = baseLanguage === 'en'
    ? (currentLanguage === 'ru'
        ? '33 letters with pronunciation guides, example words, and studio neural audio'
        : `${data.length} letters with pronunciation guides, example vocabulary, and native studio audio`)
    : pageContent.subtitle;

  const grammarMainLabel = ui?.grammar || (
    baseLanguage === 'de' ? 'Grammatik'
    : baseLanguage === 'es' ? 'Gramática'
    : baseLanguage === 'fr' ? 'Grammaire'
    : baseLanguage === 'ru' ? 'Грамматика'
    : baseLanguage === 'pt' ? 'Gramática'
    : baseLanguage === 'tr' ? 'Dilbilgisi'
    : baseLanguage === 'id' ? 'Tata Bahasa'
    : 'Grammar'
  );

  const grammarSuffix = baseLanguage === 'de' ? ' & Karteikarten'
    : baseLanguage === 'es' ? ' y Tarjetas'
    : baseLanguage === 'fr' ? ' et Flashcards'
    : baseLanguage === 'ru' ? ' и карточки'
    : baseLanguage === 'pt' ? ' e Cartões'
    : baseLanguage === 'tr' ? ' ve Kartlar'
    : baseLanguage === 'id' ? ' & Kartu'
    : ' & Flashcards';

  const alphabetMainLabel = ui?.alphabet || (
    baseLanguage === 'de' ? 'Alphabet'
    : baseLanguage === 'es' ? 'Alfabeto'
    : baseLanguage === 'fr' ? 'Alphabet'
    : baseLanguage === 'ru' ? 'Алфавит'
    : baseLanguage === 'pt' ? 'Alfabeto'
    : baseLanguage === 'tr' ? 'Alfabe'
    : baseLanguage === 'id' ? 'Alfabet'
    : 'Alphabet'
  );

  const alphabetSuffix = baseLanguage === 'de' ? ' & Laute'
    : baseLanguage === 'es' ? ' y Sonidos'
    : baseLanguage === 'fr' ? ' et Sons'
    : baseLanguage === 'ru' ? ' и звуки'
    : ' & Sounds';

  const alphabetTabLabel = `${alphabetMainLabel}${alphabetSuffix}`;
  const grammarTabLabel = `${grammarMainLabel}${grammarSuffix}`;

  return (
    <div className="section alphabet-section">
      {/* Segmented Control: Alphabet vs Grammar */}
      <div className="section-segmented-control" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeView === 'alphabet'}
          aria-label={alphabetTabLabel}
          className={`segmented-tab-btn ${activeView === 'alphabet' ? 'active' : ''}`}
          onClick={() => setActiveView('alphabet')}
        >
          <span className="tab-icon">🔤</span>
          <span className="tab-label-text">
            <span className="tab-label-main">{alphabetMainLabel}</span>
            <span className="tab-label-extra">{alphabetSuffix}</span>
          </span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeView === 'grammar'}
          aria-label={grammarTabLabel}
          className={`segmented-tab-btn ${activeView === 'grammar' ? 'active' : ''}`}
          onClick={() => setActiveView('grammar')}
        >
          <span className="tab-icon">📖</span>
          <span className="tab-label-text">
            <span className="tab-label-main">{grammarMainLabel}</span>
            <span className="tab-label-extra">{grammarSuffix}</span>
          </span>
        </button>
      </div>

      {activeView === 'grammar' ? (
        <Grammar initialTab={grammarInitialTab} />
      ) : (
        <>
          <div className="alphabet-header">
            <h2>{headerTitle}</h2>
            <p className="section-subtitle">
              {headerSubtitle}
            </p>
          </div>

          <div className="alphabet-container">
            {data.map((item, index) => {
              const exampleWord = item.russianWord || item.word;

              // Resolve translation in the learner's base language
              let exampleMeaning = '';
              if (baseLanguage === 'en' && currentLanguage === 'en') {
                exampleMeaning = item.meaning || '';
              } else {
                exampleMeaning = resolveTranslation(item, currentLanguage, baseLanguage);
              }

              // Format phonetic example phrase with localized "as in" (e.g. "as in", "comme dans", "como en", "как в", "como em", "wie in", "seperti di", "gibi")
              const localizedExamplePhrase = item.example
                ? item.example.replace(/^(as in|comme dans|como en|как в|como em|wie in|seperti di)\s*/i, `${labels.asIn} `)
                : '';

              const lowerLetter = currentLanguage === 'tr'
                ? item.letter.replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase()
                : item.letter.toLowerCase();

              return (
                <div className="alphabet-card" key={index}>
                  <div className="letter-container">
                    <div className="letter-header">
                      <div className="letter-pair">
                        <span className="letter-uppercase">{item.letter}</span>
                        <span className="letter-lowercase">{lowerLetter}</span>
                      </div>
                    </div>
                    
                    <div className="letter-underline"></div>
                    
                    <div className="pronunciation-button-wrapper">
                      <PronunciationButton 
                        text={lowerLetter} 
                        audioCategory="alphabet"
                        useLocalAudio={true}
                        label={`Pronounce letter ${item.letter}`}
                      />
                    </div>
                  </div>
                  
                  <div className="pronunciation">
                    <strong>{labels.sound}</strong> <span className="pronunciation-text">{item.pronunciation} {localizedExamplePhrase}</span>
                  </div>
                  
                  {exampleWord && (
                    <div className="example">
                      {item.icon && (
                        <span className="example-icon-badge" aria-hidden="true">
                          <WordIcon icon={item.icon} word={exampleWord} meaning={exampleMeaning} size={22} />
                        </span>
                      )}
                      <div className="example-details">
                        <div className="example-word-row">
                          <strong className="example-label">{labels.example}</strong>
                          <span className="example-word">{exampleWord}</span>
                          <PronunciationButton 
                            text={exampleWord} 
                            className="example-pronunciation"
                            audioCategory="examples"
                            useLocalAudio={true}
                            label={`Pronounce ${exampleWord}`}
                          />
                        </div>
                        {exampleMeaning && (
                          <div className="example-meaning-row">
                            <span className="example-translation">({exampleMeaning})</span>
                            {baseLanguage !== currentLanguage && (
                              <PronunciationButton 
                                text={exampleMeaning}
                                lang={baseLanguage}
                                className="example-pronunciation mini"
                                useLocalAudio={true}
                                audioCategory="words"
                                label={`Listen to ${exampleMeaning}`}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Alphabet;
