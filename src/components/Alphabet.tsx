import React from 'react';
import PronunciationButton from './PronunciationButton';
import { AlphabetItem } from '../types/index';
import { useLanguage } from '../contexts/LanguageContext';

interface AlphabetProps {
  data: AlphabetItem[];
}

const Alphabet: React.FC<AlphabetProps> = ({ data }) => {
  const { currentLanguage, currentMeta } = useLanguage();

  return (
    <div className="section">
      <div className="alphabet-header">
        <h2>{currentLanguage === 'ru' ? 'Russian Alphabet (Cyrillic)' : `${currentMeta.name} Alphabet`}</h2>
        <p className="section-subtitle">
          {currentLanguage === 'ru'
            ? '33 letters with pronunciation guides, example words, and studio neural audio'
            : `${data.length} letters with pronunciation guides, example vocabulary, and native studio audio`}
        </p>
      </div>

      <div className="alphabet-container">
        {data.map((item, index) => {
          const exampleWord = item.russianWord || item.word;
          const exampleMeaning = item.englishWord || item.meaning;

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
                <strong>Sound:</strong> <span className="pronunciation-text">{item.pronunciation} {item.example}</span>
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
                      <strong className="example-label">Example:</strong>
                      <span className="example-word">{exampleWord}</span>
                      <PronunciationButton 
                        text={exampleWord} 
                        className="example-pronunciation"
                        audioCategory="examples"
                        useLocalAudio={true}
                        label={`Pronounce ${exampleWord}`}
                      />
                    </div>
                    {exampleMeaning && <span className="example-translation">({exampleMeaning})</span>}
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