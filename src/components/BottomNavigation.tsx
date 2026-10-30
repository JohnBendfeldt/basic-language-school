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
      icon: <FaFont /> 
    },
    { id: 'phrases', label: ui?.basicPhrases || 'Phrases', ariaLabel: ui?.basicPhrases || 'Phrases', icon: <FaComment /> },
    { id: 'words', label: ui?.commonWords || 'Words', ariaLabel: ui?.commonWords || 'Words', icon: <FaListUl /> },
    { id: 'numbers', label: ui?.numbersAndTime || 'Numbers & Time', ariaLabel: ui?.numbersAndTime || 'Numbers & Time', icon: <FaCalculator /> },
    { id: 'quiz', label: ui?.quiz || 'Quiz', ariaLabel: ui?.quiz || 'Quiz', icon: <FaQuestionCircle /> }
  ];

  const handleNavClick = (id: string) => {
    // Apply tactile feedback when clicked
    const element = document.querySelector(`.bottom-nav-item[data-section="${id}"]`);
    if (element) {
      element.classList.add('nav-click-effect');
      setTimeout(() => {
        element.classList.remove('nav-click-effect');
      }, 200);
    }
    
    // Switch to the selected section immediately without delayed scroll jerk
    setActiveSection(id);
  };

  return (
    <nav className="bottom-navigation">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`bottom-nav-item ${(activeSection === item.id || (item.id === 'numbers' && activeSection === 'time')) ? 'active' : ''}`}
          onClick={() => handleNavClick(item.id)}
          aria-label={item.ariaLabel ? `Switch to ${item.ariaLabel} section` : `Switch to ${item.label.replace('\n', ' ')} section`}
          data-section={item.id}
        >
          <div className="bottom-nav-icon">{item.icon}</div>
          <span className="bottom-nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNavigation;
