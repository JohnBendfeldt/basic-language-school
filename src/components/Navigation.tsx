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
    <nav
      className={`navigation ${isOpen ? 'open' : ''}`}
      aria-label={ui?.mainNavigation || 'Main navigation'}
    >
      <ul>
        {navItems.map((item) => {
          const isActive =
            activeSection === item.id || (item.id === 'numbers' && activeSection === 'time');
          return (
            <li
              key={item.id}
              className={isActive ? 'active' : ''}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setActiveSection(item.id);
                }
              }}
            >
              <button
                type="button"
                className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
