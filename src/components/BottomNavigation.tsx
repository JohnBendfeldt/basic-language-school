import React from 'react';
import { FaFont, FaComment, FaListUl, FaCalculator, FaQuestionCircle } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

interface BottomNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeSection, 
  setActiveSection
}) => {
  const { ui, baseLanguage } = useLanguage();

  const getAlphabetGrammarLabel = () => {
    switch (baseLanguage) {
      case 'ru': return 'Алфавит &\nГрамматика';
      case 'es': return 'Alfabeto &\nGramática';
      case 'fr': return 'Alphabet &\nGrammaire';
      case 'de': return 'Alphabet &\nGrammatik';
      case 'pt': return 'Alfabeto &\nGramática';
      case 'tr': return 'Alfabe &\nDilbilgisi';
      case 'id': return 'Alfabet &\nTata Bahasa';
      case 'ko': return '한글 &\n문법';
      case 'ja': return 'かな &\n文法';
      case 'zh': return '拼音 &\n语法';
      case 'hi': return 'वर्णमाला &\nव्याकरण';
      case 'ar': return 'الحروف و\nالقواعد';
      default: return 'Alphabet &\nGrammar';
    }
  };

  const getAlphabetGrammarAria = () => {
    return ui?.alphabetAndGrammar || 'Alphabet & Grammar';
  };

  const navItems = [
    { 
      id: 'alphabet', 
      label: getAlphabetGrammarLabel(),
      ariaLabel: getAlphabetGrammarAria(),
      icon: <FaFont aria-hidden="true" /> 
    },
    { id: 'phrases', label: ui?.basicPhrases || 'Phrases', ariaLabel: ui?.basicPhrases || 'Phrases', icon: <FaComment aria-hidden="true" /> },
    { id: 'words', label: ui?.commonWords || 'Words', ariaLabel: ui?.commonWords || 'Words', icon: <FaListUl aria-hidden="true" /> },
    { id: 'numbers', label: ui?.numbersAndTime || 'Numbers & Time', ariaLabel: ui?.numbersAndTime || 'Numbers & Time', icon: <FaCalculator aria-hidden="true" /> },
    { id: 'quiz', label: ui?.quiz || 'Quiz', ariaLabel: ui?.quiz || 'Quiz', icon: <FaQuestionCircle aria-hidden="true" /> }
  ];

  const handleNavClick = (id: string) => {
    const element = document.querySelector(`.bottom-nav-item[data-section="${id}"]`);
    if (element) {
      element.classList.add('nav-click-effect');
      setTimeout(() => {
        element.classList.remove('nav-click-effect');
      }, 200);
    }
    
    setActiveSection(id);
  };

  return (
    <nav
      className="bottom-navigation"
      aria-label={ui?.bottomNavigation || 'Bottom navigation'}
    >
      {navItems.map((item) => {
        const isActive =
          activeSection === item.id || (item.id === 'numbers' && activeSection === 'time');
        return (
          <button
            key={item.id}
            type="button"
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => handleNavClick(item.id)}
            aria-label={item.ariaLabel ? `Switch to ${item.ariaLabel} section` : `Switch to ${item.label.replace('\n', ' ')} section`}
            data-section={item.id}
          >
            <div className="bottom-nav-icon" aria-hidden="true">{item.icon}</div>
            <span className="bottom-nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
