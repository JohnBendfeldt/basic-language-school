import React from 'react';
import { PhraseItem } from '../types/index';
import Phrases from './Phrases';
import { FaCalculator, FaClock, FaLightbulb, FaInfoCircle } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  getTimeTabs, 
  getPageContent, 
  getEnglishTimeGuide, 
  getRussianTimeGuide 
} from '../utils/pageDictionary';

interface NumbersAndTimeProps {
  numbersData: PhraseItem[];
  timeData?: PhraseItem[];
  activeTab: 'numbers' | 'time';
  onTabChange: (tab: 'numbers' | 'time') => void;
}

const NumbersAndTime: React.FC<NumbersAndTimeProps> = ({
  numbersData,
  timeData,
  activeTab,
  onTabChange,
}) => {
  const { currentLanguage, baseLanguage, currentMeta } = useLanguage();
  const tabs = getTimeTabs(baseLanguage);

  // For languages without separate time arrays, filter or provide fallback
  const resolvedTimeData = (timeData && timeData.length > 0)
    ? timeData
    : numbersData.filter(item => {
        if ((item as any).category === 'Time') return true;
        const text = `${item.phrase || ''} ${item.russian || ''} ${item.translation || ''} ${item.meaning || ''}`.toLowerCase();
        return (
          text.includes('clock') ||
          text.includes('time') ||
          text.includes('past') ||
          text.includes('quarter') ||
          text.includes('noon') ||
          text.includes('midnight') ||
          text.includes('hora') ||
          text.includes('heure')
        );
      });

  // Localized section titles
  const numbersPage = getPageContent('numbers', currentLanguage, baseLanguage);
  const timePage = getPageContent('time', currentLanguage, baseLanguage);

  // Maintain backwards compatibility with English native tests
  const numbersTitle = baseLanguage === 'en'
    ? (currentLanguage === 'ru' ? 'Russian Numbers (0–1,000)' : `${currentMeta.name} Numbers (0–1,000)`)
    : numbersPage.title;

  const timeTitle = baseLanguage === 'en'
    ? (currentLanguage === 'ru' ? 'Telling Time & Time Phrases' : `${currentMeta.name} Telling Time & Expressions`)
    : timePage.title;

  // Active grammar guide for time
  const grammarGuide = currentLanguage === 'ru'
    ? getRussianTimeGuide(baseLanguage)
    : currentLanguage === 'en'
      ? getEnglishTimeGuide(baseLanguage)
      : null;

  return (
    <div className="numbers-and-time-section">
      <div className="section-tab-container">
        <div className="section-tab-bar" role="tablist" aria-label="Numbers and Time Navigation">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'numbers'}
            className={`section-tab-btn ${activeTab === 'numbers' ? 'active' : ''}`}
            onClick={() => onTabChange('numbers')}
          >
            <FaCalculator className="tab-btn-icon" aria-hidden="true" />
            <span>{tabs.numbers}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'time'}
            className={`section-tab-btn ${activeTab === 'time' ? 'active' : ''}`}
            onClick={() => onTabChange('time')}
          >
            <FaClock className="tab-btn-icon" aria-hidden="true" />
            <span>{tabs.time}</span>
          </button>
        </div>
      </div>

      {activeTab === 'time' && grammarGuide && (
        <div className="time-grammar-guide">
          <div className="guide-header">
            <FaLightbulb className="guide-icon" aria-hidden="true" />
            <h3>{grammarGuide.headerTitle}</h3>
          </div>
          <div className="guide-grid">
            {grammarGuide.rules.map((rule, idx) => (
              <div className="guide-card" key={idx}>
                <span className="guide-badge">{rule.ruleBadge}</span>
                <h4>{rule.title}</h4>
                <p>{rule.desc}</p>
                <ul>
                  {rule.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <strong>{item.label}:</strong> <em>{item.text}</em>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="guide-footer-hint">
            <FaInfoCircle aria-hidden="true" />
            <span>{grammarGuide.footerHint}</span>
          </div>
        </div>
      )}

      {activeTab === 'numbers' ? (
        <Phrases
          data={numbersData}
          title={numbersTitle}
          contentType="numbers"
        />
      ) : (
        <Phrases
          data={resolvedTimeData}
          title={timeTitle}
          contentType="time"
        />
      )}
    </div>
  );
};

export default NumbersAndTime;
