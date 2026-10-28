import React from 'react';

export type FlagLanguage = 'ru' | 'en' | 'es' | 'fr' | 'us';

interface FlagIconProps {
  lang: FlagLanguage | string;
  size?: number | string;
  className?: string;
  ariaLabel?: string;
}

/**
 * Universal vector SVG flags that render consistently on all platforms,
 * including Windows Chrome which lacks emoji country flags and displays
 * letter codes (like [GB], [RU], [ES]) instead.
 */
export const FlagIcon: React.FC<FlagIconProps> = ({
  lang,
  size = 20,
  className = '',
  ariaLabel,
}) => {
  const norm = (lang || '').toLowerCase();

  const width = typeof size === 'number' ? `${size}px` : size;
  // Standard flag aspect ratio 4:3
  const height = typeof size === 'number' ? `${Math.round(size * 0.75)}px` : 'auto';

  const commonStyle: React.CSSProperties = {
    display: 'inline-block',
    verticalAlign: 'middle',
    borderRadius: '2px',
    boxShadow: '0 0 1px rgba(0, 0, 0, 0.4)',
    width,
    height,
    overflow: 'hidden',
    flexShrink: 0,
  };

  if (norm === 'ru') {
    // Russian tricolor: white, blue, red
    return (
      <svg
        viewBox="0 0 640 480"
        style={commonStyle}
        className={`flag-icon flag-ru ${className}`}
        aria-label={ariaLabel || 'Russian flag'}
        role="img"
      >
        <rect width="640" height="160" fill="#ffffff" />
        <rect y="160" width="640" height="160" fill="#0039a6" />
        <rect y="320" width="640" height="160" fill="#d52b1e" />
      </svg>
    );
  }

  if (norm === 'es') {
    // Spanish flag: red, yellow (double height), red
    return (
      <svg
        viewBox="0 0 640 480"
        style={commonStyle}
        className={`flag-icon flag-es ${className}`}
        aria-label={ariaLabel || 'Spanish flag'}
        role="img"
      >
        <rect width="640" height="120" fill="#aa151b" />
        <rect y="120" width="640" height="240" fill="#f1bf00" />
        <rect y="360" width="640" height="120" fill="#aa151b" />
      </svg>
    );
  }

  if (norm === 'fr') {
    // French tricolor: blue, white, red
    return (
      <svg
        viewBox="0 0 640 480"
        style={commonStyle}
        className={`flag-icon flag-fr ${className}`}
        aria-label={ariaLabel || 'French flag'}
        role="img"
      >
        <rect width="213.3" height="480" fill="#002654" />
        <rect x="213.3" width="213.4" height="480" fill="#ffffff" />
        <rect x="426.7" width="213.3" height="480" fill="#ce1126" />
      </svg>
    );
  }

  if (norm === 'en' || norm === 'gb' || norm === 'uk') {
    // Union Jack (clear, high-contrast)
    return (
      <svg
        viewBox="0 0 60 30"
        style={commonStyle}
        className={`flag-icon flag-gb ${className}`}
        aria-label={ariaLabel || 'English flag'}
        role="img"
      >
        <clipPath id="s">
          <path d="M0,0 v30 h60 v-30 z"/>
        </clipPath>
        <clipPath id="t">
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
        </clipPath>
        <g clipPath="url(#s)">
          <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
        </g>
      </svg>
    );
  }

  // Fallback: Globe icon
  return (
    <span style={{ fontSize: width, lineHeight: 1 }} className={`flag-fallback ${className}`}>
      🌐
    </span>
  );
};
