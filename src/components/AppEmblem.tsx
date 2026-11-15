import React from 'react';
import { SupportedLanguageId } from '../data/languages/types';

interface AppEmblemProps {
  language: SupportedLanguageId;
  decorative?: boolean;
}

export const AppEmblem: React.FC<AppEmblemProps> = ({ language, decorative = false }) => {
  const emblemA11y = (label: string) =>
    decorative
      ? ({ 'aria-hidden': true as const, focusable: 'false' as const })
      : ({ 'aria-label': label, role: 'img' as const });

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

  // High-contrast enamel flag badge with crisp white rim and drop shadow
  // Ensures flags with dark stripes (e.g. German black, French navy, British dark blue)
  // pop vibrantly against dark emblem gradients.
  const renderFlagBadge = (
    clipId: string,
    content: React.ReactNode,
    width = 13,
    height = 9,
    x = 5,
    y = 5
  ) => (
    <g transform={`translate(${x}, ${y})`}>
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width={width} height={height} rx="2" />
        </clipPath>
      </defs>
      {/* Subtle outer shadow */}
      <rect
        x="-0.5"
        y="-0.5"
        width={width + 1}
        height={height + 1}
        rx="2.5"
        fill="rgba(0, 0, 0, 0.45)"
      />
      {/* Opaque white backing */}
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        rx="2"
        fill="#ffffff"
      />
      {/* Clipped flag content */}
      <g clipPath={`url(#${clipId})`}>
        {content}
      </g>
      {/* Crisp high-contrast white enamel border */}
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        rx="2"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.8"
      />
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
          {...emblemA11y('Basic Russian emblem')}
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
          {renderFlagBadge(
            'ruFlagClip',
            <>
              <rect x="0" y="0" width="13" height="3" fill="#ffffff" />
              <rect x="0" y="3" width="13" height="3" fill="#0039a6" />
              <rect x="0" y="6" width="13" height="3" fill="#d52b1e" />
            </>
          )}
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
          {...emblemA11y('Basic German emblem')}
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
          {/* German tricolor framed in white enamel so black top stripe pops crisply */}
          {renderFlagBadge(
            'deFlagClip',
            <>
              <rect x="0" y="0" width="13" height="3" fill="#18181b" />
              <rect x="0" y="3" width="13" height="3" fill="#ef4444" />
              <rect x="0" y="6" width="13" height="3" fill="#ffce00" />
            </>
          )}
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
          {...emblemA11y('Basic Spanish emblem')}
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
          {renderFlagBadge(
            'esFlagClip',
            <>
              <rect x="0" y="0" width="13" height="2.5" fill="#c60b1e" />
              <rect x="0" y="2.5" width="13" height="4" fill="#f1bf00" />
              <rect x="0" y="6.5" width="13" height="2.5" fill="#c60b1e" />
            </>
          )}
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
          {...emblemA11y('Basic French emblem')}
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
          {/* French vertical tricolor with vibrant royal blue and crisp white frame */}
          {renderFlagBadge(
            'frFlagClip',
            <>
              <rect x="0" y="0" width="4.33" height="9" fill="#0055a5" />
              <rect x="4.33" y="0" width="4.34" height="9" fill="#ffffff" />
              <rect x="8.67" y="0" width="4.33" height="9" fill="#ef4135" />
            </>
          )}
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
          {...emblemA11y('Basic Portuguese emblem')}
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
          {renderFlagBadge(
            'ptFlagClip',
            <>
              <rect x="0" y="0" width="13" height="9" fill="#009b3a" />
              <polygon points="6.5,1.2 11.8,4.5 6.5,7.8 1.2,4.5" fill="#fedf00" />
              <circle cx="6.5" cy="4.5" r="1.8" fill="#002776" />
            </>
          )}
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
          {...emblemA11y('Basic Indonesian emblem')}
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
          {renderFlagBadge(
            'idFlagClip',
            <>
              <rect x="0" y="0" width="13" height="4.5" fill="#ce1126" />
              <rect x="0" y="4.5" width="13" height="4.5" fill="#ffffff" />
            </>
          )}
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
          {...emblemA11y('Basic Turkish emblem')}
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
          {renderFlagBadge(
            'trFlagClip',
            <>
              <rect x="0" y="0" width="13" height="9" fill="#e30a17" />
              <circle cx="5.2" cy="4.5" r="2.8" fill="#ffffff" />
              <circle cx="6.1" cy="4.5" r="2.2" fill="#e30a17" />
              <polygon points="9.3,4.5 8.8,4.9 9.0,4.3 8.5,3.9 9.1,3.9 9.3,3.3 9.5,3.9 10.1,3.9 9.6,4.3 9.8,4.9" fill="#ffffff" />
            </>
          )}
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
          {...emblemA11y('Basic Japanese emblem')}
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
          {renderFlagBadge(
            'jaFlagClip',
            <>
              <rect x="0" y="0" width="13" height="9" fill="#ffffff" />
              <circle cx="6.5" cy="4.5" r="2.8" fill="#bc002d" />
            </>
          )}
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
          {...emblemA11y('Basic Korean emblem')}
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
          {renderFlagBadge(
            'koFlagClip',
            <>
              <rect x="0" y="0" width="13" height="9" fill="#ffffff" />
              <path d="M6.5 2 C8 2 9.2 3.2 9.2 4.5 C9.2 5.8 8 7 6.5 7 C5 7 3.8 5.8 3.8 4.5 C3.8 3.2 5 2 6.5 2 Z" fill="#0047a0" />
              <path d="M3.8 4.5 C3.8 3 5 2 6.5 2 C8 2 9.2 3 9.2 4.5 C7.8 4.5 7.8 5.8 6.5 5.8 C5.2 5.8 5.2 4.5 3.8 4.5 Z" fill="#cd2e3a" />
              <circle cx="7.9" cy="3.9" r="1.3" fill="#cd2e3a" />
              <circle cx="5.1" cy="5.1" r="1.3" fill="#0047a0" />
            </>
          )}
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
          {...emblemA11y('Basic Chinese emblem')}
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
          {renderFlagBadge(
            'zhFlagClip',
            <>
              <rect x="0" y="0" width="13" height="9" fill="#de2910" />
              <polygon points="3.2,1.2 3.6,2.3 4.8,2.3 3.8,3.0 4.2,4.1 3.2,3.4 2.2,4.1 2.6,3.0 1.6,2.3 2.8,2.3" fill="#ffde00" />
              <polygon points="4.9,0.7 5.1,1.1 5.5,1.1 5.2,1.3 5.3,1.7 4.9,1.5 4.6,1.7 4.7,1.3 4.4,1.1 4.8,1.1" fill="#ffde00" />
              <polygon points="5.7,1.5 5.9,1.9 6.3,1.9 6.0,2.1 6.1,2.5 5.7,2.3 5.4,2.5 5.5,2.1 5.2,1.9 5.6,1.9" fill="#ffde00" />
              <polygon points="5.7,2.8 5.9,3.2 6.3,3.2 6.0,3.4 6.1,3.8 5.7,3.6 5.4,3.8 5.5,3.4 5.2,3.2 5.6,3.2" fill="#ffde00" />
              <polygon points="4.9,3.6 5.1,4.0 5.5,4.0 5.2,4.2 5.3,4.6 4.9,4.4 4.6,4.6 4.7,4.2 4.4,4.0 4.8,4.0" fill="#ffde00" />
            </>
          )}
          {capGeometry('zhGoldGrad')}
        </svg>
      );

    case 'hi':
      return (
        <svg
          className="app-emblem hindi-flag"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...emblemA11y('Basic Hindi emblem')}
        >
          <defs>
            <linearGradient id="hiEmblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="50%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="hiGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#hiEmblemBg)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          {renderFlagBadge(
            'hiFlagClip',
            <>
              <rect x="0" y="0" width="13" height="3" fill="#ff9933" />
              <rect x="0" y="3" width="13" height="3" fill="#ffffff" />
              <circle cx="6.5" cy="4.5" r="1.1" fill="none" stroke="#000080" strokeWidth="0.5" />
              <circle cx="6.5" cy="4.5" r="0.35" fill="#000080" />
              <rect x="0" y="6" width="13" height="3" fill="#138808" />
            </>
          )}
          {capGeometry('hiGoldGrad')}
        </svg>
      );

    case 'ar':
      return (
        <svg
          className="app-emblem arabic-flag"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...emblemA11y('Basic Arabic emblem')}
        >
          <defs>
            <linearGradient id="arEmblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#006c35" />
              <stop offset="50%" stopColor="#064e3b" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
            <linearGradient id="arGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#arEmblemBg)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          {renderFlagBadge(
            'arFlagClip',
            <>
              <rect x="0" y="0" width="13" height="9" fill="#006c35" />
              <path d="M2 2.8 Q4 2.1 6.5 2.8 T11 2.8" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" fill="none" />
              <path d="M3.2 4.1 Q6.5 3.6 9.8 4.1" stroke="#ffffff" strokeWidth="0.7" strokeLinecap="round" fill="none" />
              <line x1="2.5" y1="6.2" x2="10.5" y2="6.2" stroke="#ffffff" strokeWidth="0.7" strokeLinecap="round" />
              <line x1="9.8" y1="5.4" x2="9.8" y2="7.0" stroke="#ffffff" strokeWidth="0.5" strokeLinecap="round" />
              <circle cx="10.8" cy="6.2" r="0.5" fill="#ffffff" />
            </>
          )}
          {capGeometry('arGoldGrad')}
        </svg>
      );

    case 'bn':
      return (
        <svg
          className="app-emblem bengali-flag"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...emblemA11y('Basic Bengali emblem')}
        >
          <defs>
            <linearGradient id="bnEmblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#006a4e" />
              <stop offset="50%" stopColor="#004d38" />
              <stop offset="100%" stopColor="#0f2b20" />
            </linearGradient>
            <linearGradient id="bnGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#bnEmblemBg)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          {/* Bangladesh flag: bottle green with red circle slightly toward hoist */}
          {renderFlagBadge(
            'bnFlagClip',
            <>
              <rect x="0" y="0" width="13" height="9" fill="#006a4e" />
              <circle cx="5.8" cy="4.5" r="2.8" fill="#f42a41" />
            </>
          )}
          {capGeometry('bnGoldGrad')}
        </svg>
      );

    case 'ur':
      return (
        <svg
          className="app-emblem urdu-flag"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...emblemA11y('Basic Urdu emblem')}
        >
          <defs>
            <linearGradient id="urEmblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#115740" />
              <stop offset="50%" stopColor="#0c3e2e" />
              <stop offset="100%" stopColor="#06241a" />
            </linearGradient>
            <linearGradient id="urGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#urEmblemBg)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          {/* Pakistan flag: white vertical stripe on hoist, dark green field with white crescent & star */}
          {renderFlagBadge(
            'urFlagClip',
            <>
              <rect x="0" y="0" width="13" height="9" fill="#115740" />
              <rect x="0" y="0" width="3.25" height="9" fill="#ffffff" />
              <circle cx="8.2" cy="4.5" r="2.2" fill="#ffffff" />
              <circle cx="8.8" cy="4.0" r="1.9" fill="#115740" />
              <polygon points="8.6,3.0 8.9,3.8 9.7,3.8 9.1,4.3 9.3,5.1 8.6,4.6 7.9,5.1 8.1,4.3 7.5,3.8 8.3,3.8" fill="#ffffff" />
            </>
          )}
          {capGeometry('urGoldGrad')}
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
          {...emblemA11y('Basic English emblem')}
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
          {/* Framed UK Union Jack with crisp white enamel border */}
          {renderFlagBadge(
            'enFlagClip',
            <>
              <rect x="0" y="0" width="13" height="9" fill="#012169" />
              <line x1="0" y1="0" x2="13" y2="9" stroke="#ffffff" strokeWidth="2.2" />
              <line x1="13" y1="0" x2="0" y2="9" stroke="#ffffff" strokeWidth="2.2" />
              <line x1="0" y1="0" x2="13" y2="9" stroke="#c8102e" strokeWidth="1.1" />
              <line x1="13" y1="0" x2="0" y2="9" stroke="#c8102e" strokeWidth="1.1" />
              <rect x="4.8" y="0" width="3.4" height="9" fill="#ffffff" />
              <rect x="0" y="2.8" width="13" height="3.4" fill="#ffffff" />
              <rect x="5.5" y="0" width="2" height="9" fill="#c8102e" />
              <rect x="0" y="3.5" width="13" height="2" fill="#c8102e" />
            </>
          )}
          {capGeometry('enGoldGrad')}
        </svg>
      );
  }
};

export default AppEmblem;
