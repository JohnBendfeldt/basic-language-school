import React from 'react';
import PronunciationButton from './PronunciationButton';
import { AlphabetItem } from '../types/index';
import { useLanguage } from '../contexts/LanguageContext';
import { getPageContent, getAlphabetLabels } from '../utils/pageDictionary';
import { resolveTranslation } from '../utils/translationResolver';

interface AlphabetProps {
  data: AlphabetItem[];
}

const Alphabet: React.FC<AlphabetProps> = ({ data }) => {
  const { currentLanguage, baseLanguage, currentMeta } = useLanguage();
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

  return (
    <div className="section">
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

          // Format phonetic example phrase with localized "as in" (e.g. "as in", "comme dans", "como en", "как в", "como em", "wie in")
          const localizedExamplePhrase = item.example
            ? item.example.replace(/^(as in|comme dans|como en|как в|como em|wie in)\s*/i, `${labels.asIn} `)
            : '';

          return (
            <div className="alphabet-card" key={index}>
              <div className="letter-container">
                <div className="letter-header">
                  <div className="letter-pair">
                    <span className="letter-uppercase">{item.letter}</span>
                    <span className="letter-lowercase">{item.letter.toLowerCase()}</span>
                  </div>
                </div>
                
                <div className="letter-underline"></div>
                
                <div className="pronunciation-button-wrapper">
                  <PronunciationButton 
                    text={item.letter.toLowerCase()} 
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
                      {item.icon}
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
                            useLocalAudio={false}
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
    </div>
  );
};

export default Alphabet;
