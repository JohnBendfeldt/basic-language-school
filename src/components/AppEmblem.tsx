import React from 'react';
import { SupportedLanguageId } from '../data/languages/types';

interface AppEmblemProps {
  language: SupportedLanguageId;
}

export const AppEmblem: React.FC<AppEmblemProps> = ({ language }) => {
  // Shared graduation cap geometry
  const capGeometry = (goldGradId: string) => (
    <g transform="translate(0, 3)">
      <path d="M24 13L8 20.5L24 28L40 20.5L24 13Z" fill={`url(#${goldGradId})`} />
      <path
        d="M14 24.5V32C14 35.5 18 38 24 38C30 38 34 35.5 34 32V24.5"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M40 21V30.5" stroke={`url(#${goldGradId})`} strokeWidth="2" strokeLinecap="round" />
      <circle cx="40" cy="31.5" r="1.5" fill={`url(#${goldGradId})`} />
    </g>
  );

  switch (language) {
    case 'ru':
      return (
        <svg
          className="app-emblem russia-flag"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Basic Russian emblem"
          role="img"
        >
          <defs>
            <linearGradient id="rusEmblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="50%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="rusGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#rusEmblemBg)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          {/* Russian tricolor: White, Blue, Red */}
          <g transform="translate(6, 6)">
            <rect x="0" y="0" width="10" height="2.2" rx="1" fill="#ffffff" opacity="0.95" />
            <rect x="0" y="2.4" width="10" height="2.2" rx="0.5" fill="#0039a6" />
            <rect x="0" y="4.8" width="10" height="2.2" rx="1" fill="#d52b1e" />
          </g>
          {capGeometry('rusGoldGrad')}
        </svg>
      );

    case 'de':
      return (
        <svg
          className="app-emblem german-flag"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Basic German emblem"
          role="img"
        >
          <defs>
            <linearGradient id="deEmblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#312e81" />
            </linearGradient>
            <linearGradient id="deGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#deEmblemBg)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          {/* German tricolor: Black, Red, Gold */}
          <g transform="translate(6, 6)">
            <rect x="0" y="0" width="10" height="2.2" rx="1" fill="#000000" />
            <rect x="0" y="2.4" width="10" height="2.2" rx="0.5" fill="#dd0000" />
            <rect x="0" y="4.8" width="10" height="2.2" rx="1" fill="#ffce00" />
          </g>
          {capGeometry('deGoldGrad')}
        </svg>
      );

    case 'es':
      return (
        <svg
          className="app-emblem spanish-flag"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Basic Spanish emblem"
          role="img"
        >
          <defs>
            <linearGradient id="esEmblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7f1d1d" />
              <stop offset="50%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="esGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#esEmblemBg)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          {/* Spanish flag: Red, Gold, Red */}
          <g transform="translate(6, 6)">
            <rect x="0" y="0" width="10" height="2" rx="1" fill="#aa151b" />
            <rect x="0" y="2.2" width="10" height="2.6" rx="0.5" fill="#f1bf00" />
            <rect x="0" y="5" width="10" height="2" rx="1" fill="#aa151b" />
          </g>
          {capGeometry('esGoldGrad')}
        </svg>
      );

    case 'fr':
      return (
        <svg
          className="app-emblem french-flag"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Basic French emblem"
          role="img"
        >
          <defs>
            <linearGradient id="frEmblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="50%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="frGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#frEmblemBg)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          {/* French vertical tricolor: Blue, White, Red */}
          <g transform="translate(6, 6)">
            <rect x="0" y="0" width="3.3" height="7" rx="1" fill="#002654" />
            <rect x="3.3" y="0" width="3.4" height="7" fill="#ffffff" />
            <rect x="6.7" y="0" width="3.3" height="7" rx="1" fill="#ce1126" />
          </g>
          {capGeometry('frGoldGrad')}
        </svg>
      );

    case 'pt':
      return (
        <svg
          className="app-emblem portuguese-flag"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Basic Portuguese emblem"
          role="img"
        >
          <defs>
            <linearGradient id="ptEmblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#064e3b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>
            <linearGradient id="ptGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#ptEmblemBg)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          {/* Brazil/Portuguese green, yellow diamond, blue globe */}
          <g transform="translate(6, 6)">
            <rect x="0" y="0" width="10" height="7" rx="1.5" fill="#009b3a" />
            <polygon points="5,1 8.8,3.5 5,6 1.2,3.5" fill="#fedf00" />
            <circle cx="5" cy="3.5" r="1.3" fill="#002776" />
          </g>
          {capGeometry('ptGoldGrad')}
        </svg>
      );

    case 'id':
      return (
        <svg
          className="app-emblem indonesian-flag"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Basic Indonesian emblem"
          role="img"
        >
          <defs>
            <linearGradient id="idEmblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#991b1b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="idGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#idEmblemBg)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          {/* Indonesian bicolor: Red over White */}
          <g transform="translate(6, 6)">
            <rect x="0" y="0" width="10" height="3.5" rx="1" fill="#ce1126" />
            <rect x="0" y="3.5" width="10" height="3.5" rx="1" fill="#ffffff" />
          </g>
          {capGeometry('idGoldGrad')}
        </svg>
      );

    case 'tr':
      return (
        <svg
          className="app-emblem turkish-flag"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Basic Turkish emblem"
          role="img"
        >
          <defs>
            <linearGradient id="trEmblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#991b1b" />
              <stop offset="50%" stopColor="#7f1d1d" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="trGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#trEmblemBg)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          {/* Turkish red with white crescent and star */}
          <g transform="translate(6, 6)">
            <rect x="0" y="0" width="10" height="7" rx="1.5" fill="#e30a17" />
            <circle cx="4.2" cy="3.5" r="2.1" fill="#ffffff" />
            <circle cx="4.9" cy="3.5" r="1.6" fill="#e30a17" />
            <polygon points="7.2,3.5 6.8,3.8 7.0,3.3 6.6,3.0 7.1,3.0 7.2,2.5 7.4,3.0 7.9,3.0 7.5,3.3 7.7,3.8" fill="#ffffff" />
          </g>
          {capGeometry('trGoldGrad')}
        </svg>
      );

    case 'ja':
      return (
        <svg
          className="app-emblem japanese-flag"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Basic Japanese emblem"
          role="img"
        >
          <defs>
            <linearGradient id="jaEmblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#831843" />
              <stop offset="50%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="jaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#jaEmblemBg)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          {/* Japanese flag: white field with red sun disc */}
          <g transform="translate(6, 6)">
            <rect x="0" y="0" width="10" height="7" rx="1.5" fill="#ffffff" />
            <circle cx="5" cy="3.5" r="2.2" fill="#bc002d" />
          </g>
          {capGeometry('jaGoldGrad')}
        </svg>
      );

    case 'ko':
      return (
        <svg
          className="app-emblem korean-flag"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Basic Korean emblem"
          role="img"
        >
          <defs>
            <linearGradient id="koEmblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="50%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="koGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#koEmblemBg)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          {/* Korean flag: white field with red/blue Taegeuk circle */}
          <g transform="translate(6, 6)">
            <rect x="0" y="0" width="10" height="7" rx="1.5" fill="#ffffff" />
            <path d="M5 1.5 C6.2 1.5 7.2 2.5 7.2 3.5 C7.2 4.5 6.2 5.5 5 5.5 C3.8 5.5 2.8 4.5 2.8 3.5 C2.8 2.5 3.8 1.5 5 1.5 Z" fill="#0047a0" />
            <path d="M2.8 3.5 C2.8 2.3 3.8 1.5 5 1.5 C6.2 1.5 7.2 2.3 7.2 3.5 C6.1 3.5 6.1 4.5 5 4.5 C3.9 4.5 3.9 3.5 2.8 3.5 Z" fill="#cd2e3a" />
            <circle cx="6.1" cy="3" r="1.1" fill="#cd2e3a" />
            <circle cx="3.9" cy="4" r="1.1" fill="#0047a0" />
          </g>
          {capGeometry('koGoldGrad')}
        </svg>
      );

    case 'zh':
      return (
        <svg
          className="app-emblem chinese-flag"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Basic Chinese emblem"
          role="img"
        >
          <defs>
            <linearGradient id="zhEmblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#991b1b" />
              <stop offset="50%" stopColor="#7f1d1d" />
              <stop offset="100%" stopColor="#450a0a" />
            </linearGradient>
            <linearGradient id="zhGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#zhEmblemBg)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          {/* Chinese flag: red canton with golden stars */}
          <g transform="translate(6, 6)">
            <rect x="0" y="0" width="10" height="7" rx="1.5" fill="#de2910" />
            {/* Main large star */}
            <polygon points="2.5,0.8 2.8,1.8 3.8,1.8 3.0,2.4 3.3,3.3 2.5,2.7 1.7,3.3 2.0,2.4 1.2,1.8 2.2,1.8" fill="#ffde00" />
            {/* 4 small stars */}
            <polygon points="5.0,0.8 5.2,1.3 5.7,1.3 5.3,1.6 5.5,2.1 5.0,1.8 4.6,2.1 4.8,1.6 4.4,1.3 4.9,1.3" transform="scale(0.6) translate(3, 0.2)" fill="#ffde00" />
            <polygon points="6.0,1.6 6.2,2.1 6.7,2.1 6.3,2.4 6.5,2.9 6.0,2.6 5.6,2.9 5.8,2.4 5.4,2.1 5.9,2.1" transform="scale(0.6) translate(3.8, 0.8)" fill="#ffde00" />
            <polygon points="6.0,2.8 6.2,3.3 6.7,3.3 6.3,3.6 6.5,4.1 6.0,3.8 5.6,4.1 5.8,3.6 5.4,3.3 5.9,3.3" transform="scale(0.6) translate(3.8, 1.8)" fill="#ffde00" />
            <polygon points="5.0,3.8 5.2,4.3 5.7,4.3 5.3,4.6 5.5,5.1 5.0,4.8 4.6,5.1 4.8,4.6 4.4,4.3 4.9,4.3" transform="scale(0.6) translate(3, 2.5)" fill="#ffde00" />
          </g>
          {capGeometry('zhGoldGrad')}
        </svg>
      );

    case 'en':
    default:
      return (
        <svg
          className="app-emblem english-flag"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Basic English emblem"
          role="img"
        >
          <defs>
            <linearGradient id="enEmblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#312e81" />
            </linearGradient>
            <linearGradient id="enGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#enEmblemBg)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          {/* Authentic UK Union Jack motif */}
          <g transform="translate(6, 6)">
            <rect x="0" y="0" width="10" height="7" rx="1.5" fill="#012169" />
            <line x1="0" y1="0" x2="10" y2="7" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="10" y1="0" x2="0" y2="7" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="0" y1="0" x2="10" y2="7" stroke="#c8102e" strokeWidth="0.8" />
            <line x1="10" y1="0" x2="0" y2="7" stroke="#c8102e" strokeWidth="0.8" />
            <rect x="4" y="0" width="2" height="7" fill="#ffffff" />
            <rect x="0" y="2.5" width="10" height="2" fill="#ffffff" />
            <rect x="4.4" y="0" width="1.2" height="7" fill="#c8102e" />
            <rect x="0" y="2.9" width="10" height="1.2" fill="#c8102e" />
          </g>
          {capGeometry('enGoldGrad')}
        </svg>
      );
  }
};

export default AppEmblem;
