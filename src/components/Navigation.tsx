import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ 
  activeSection, 
  setActiveSection,
  isOpen
}) => {
  const { ui } = useLanguage();

  const navItems = [
    { id: 'alphabet', label: ui?.alphabetAndGrammar || ui?.alphabet || 'Alphabet & Grammar' },
    { id: 'phrases', label: ui?.basicPhrases || 'Basic Phrases' },
    { id: 'words', label: ui?.commonWords || 'Common Words' },
    { id: 'numbers', label: ui?.numbersAndTime || 'Numbers & Time' },
    { id: 'quiz', label: ui?.quiz || 'Quiz' }
  ];

  return (
    <nav className={`navigation ${isOpen ? 'open' : ''}`}>
      <ul>
        {navItems.map(item => (
          <li
            key={item.id}
            className={(activeSection === item.id || (item.id === 'numbers' && activeSection === 'time')) ? 'active' : ''}
            onClick={() => setActiveSection(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
