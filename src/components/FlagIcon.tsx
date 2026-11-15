import React from 'react';

export type FlagLanguage =
  | 'ru'
  | 'en'
  | 'es'
  | 'fr'
  | 'pt'
  | 'de'
  | 'id'
  | 'tr'
  | 'us'
  | 'ja'
  | 'ko'
  | 'zh'
  | 'cn'
  | 'hi'
  | 'in'
  | 'ar'
  | 'sa'
  | 'bn'
  | 'bd'
  | 'ur'
  | 'pk';

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
 *
 * Defaults to decorative (`aria-hidden="true"`) when rendered alongside
 * visible language names so screen readers do not announce noisy duplicate
 * flag descriptions inside buttons/menus unless `ariaLabel` is explicitly supplied.
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

  const a11yProps = ariaLabel
    ? ({ role: 'img', 'aria-label': ariaLabel } as const)
    : ({ 'aria-hidden': true, focusable: 'false' } as const);

  if (norm === 'ru') {
    return (
      <svg
        viewBox="0 0 640 480"
        style={commonStyle}
        className={`flag-icon flag-ru ${className}`}
        {...a11yProps}
      >
        <rect width="640" height="160" fill="#ffffff" />
        <rect y="160" width="640" height="160" fill="#0039a6" />
        <rect y="320" width="640" height="160" fill="#d52b1e" />
      </svg>
    );
  }

  if (norm === 'es') {
    return (
      <svg
        viewBox="0 0 640 480"
        style={commonStyle}
        className={`flag-icon flag-es ${className}`}
        {...a11yProps}
      >
        <rect width="640" height="120" fill="#aa151b" />
        <rect y="120" width="640" height="240" fill="#f1bf00" />
        <rect y="360" width="640" height="120" fill="#aa151b" />
      </svg>
    );
  }

  if (norm === 'fr') {
    return (
      <svg
        viewBox="0 0 640 480"
        style={commonStyle}
        className={`flag-icon flag-fr ${className}`}
        {...a11yProps}
      >
        <rect width="213.3" height="480" fill="#002654" />
        <rect x="213.3" width="213.4" height="480" fill="#ffffff" />
        <rect x="426.7" width="213.3" height="480" fill="#ce1126" />
      </svg>
    );
  }

  if (norm === 'en' || norm === 'gb' || norm === 'uk') {
    return (
      <svg
        viewBox="0 0 60 30"
        style={commonStyle}
        className={`flag-icon flag-gb ${className}`}
        {...a11yProps}
      >
        <clipPath id="s">
          <path d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        <clipPath id="t">
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
        </clipPath>
        <g clipPath="url(#s)">
          <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </svg>
    );
  }

  if (norm === 'pt' || norm === 'br') {
    return (
      <svg
        viewBox="0 0 640 480"
        style={commonStyle}
        className={`flag-icon flag-pt ${className}`}
        {...a11yProps}
      >
        <rect width="640" height="480" fill="#009b3a" />
        <polygon points="320,60 580,240 320,420 60,240" fill="#fedf00" />
        <circle cx="320" cy="240" r="105" fill="#002776" />
        <path d="M220,225 Q320,185 420,255" stroke="#ffffff" strokeWidth="18" fill="none" />
      </svg>
    );
  }

  if (norm === 'de') {
    return (
      <svg
        viewBox="0 0 640 480"
        style={commonStyle}
        className={`flag-icon flag-de ${className}`}
        {...a11yProps}
      >
        <rect width="640" height="160" fill="#000000" />
        <rect y="160" width="640" height="160" fill="#dd0000" />
        <rect y="320" width="640" height="160" fill="#ffce00" />
      </svg>
    );
  }

  if (norm === 'id') {
    return (
      <svg
        viewBox="0 0 640 480"
        style={commonStyle}
        className={`flag-icon flag-id ${className}`}
        {...a11yProps}
      >
        <rect width="640" height="240" fill="#ce1126" />
        <rect y="240" width="640" height="240" fill="#ffffff" />
      </svg>
    );
  }

  if (norm === 'tr') {
    return (
      <svg
        viewBox="0 0 640 480"
        style={commonStyle}
        className={`flag-icon flag-tr ${className}`}
        {...a11yProps}
      >
        <rect width="640" height="480" fill="#e30a17" />
        <circle cx="240" cy="240" r="120" fill="#ffffff" />
        <circle cx="270" cy="240" r="96" fill="#e30a17" />
        <polygon
          points="385,240 442,258 406,209 406,271 442,222"
          fill="#ffffff"
        />
      </svg>
    );
  }

  if (norm === 'ja') {
    return (
      <svg
        viewBox="0 0 640 480"
        style={commonStyle}
        className={`flag-icon flag-ja ${className}`}
        {...a11yProps}
      >
        <rect width="640" height="480" fill="#ffffff" />
        <circle cx="320" cy="240" r="144" fill="#bc002d" />
      </svg>
    );
  }

  if (norm === 'ko') {
    return (
      <svg
        viewBox="0 0 640 480"
        style={commonStyle}
        className={`flag-icon flag-ko ${className}`}
        {...a11yProps}
      >
        <rect width="640" height="480" fill="#ffffff" />
        <circle cx="320" cy="240" r="120" fill="#cd2e3a" />
        <path d="M200 240C200 306.3 253.7 360 320 360C386.3 360 440 306.3 440 240H200Z" fill="#0047a0" />
        <circle cx="260" cy="240" r="60" fill="#cd2e3a" />
        <circle cx="380" cy="240" r="60" fill="#0047a0" />
        <rect x="130" y="100" width="40" height="8" rx="2" fill="#000000" transform="rotate(35 150 104)" />
        <rect x="470" y="370" width="40" height="8" rx="2" fill="#000000" transform="rotate(35 490 374)" />
      </svg>
    );
  }

  if (norm === 'zh' || norm === 'cn' || norm === 'mandarin chinese') {
    return (
      <svg
        viewBox="0 0 640 480"
        style={commonStyle}
        className={`flag-icon flag-zh ${className}`}
        {...a11yProps}
      >
        <rect width="640" height="480" fill="#de2910" />
        <polygon points="128,64 148,124 210,124 160,160 179,220 128,183 77,220 96,160 46,124 108,124" fill="#ffde00" />
        <polygon points="256,48 262,68 283,68 266,80 272,100 256,88 240,100 246,80 229,68 250,68" fill="#ffde00" transform="rotate(10 256 74)" />
        <polygon points="307,96 313,116 334,116 317,128 323,148 307,136 291,148 297,128 280,116 301,116" fill="#ffde00" transform="rotate(25 307 122)" />
        <polygon points="307,173 313,193 334,193 317,205 323,225 307,213 291,225 297,205 280,193 301,193" fill="#ffde00" transform="rotate(45 307 199)" />
        <polygon points="256,221 262,241 283,241 266,253 272,273 256,261 240,273 246,253 229,241 250,241" fill="#ffde00" transform="rotate(65 256 247)" />
      </svg>
    );
  }

  if (norm === 'hi' || norm === 'in' || norm === 'hindi') {
    return (
      <svg
        viewBox="0 0 640 480"
        style={commonStyle}
        className={`flag-icon flag-in ${className}`}
        {...a11yProps}
      >
        <rect width="640" height="160" fill="#ff9933" />
        <rect y="160" width="640" height="160" fill="#ffffff" />
        <rect y="320" width="640" height="160" fill="#138808" />
        <circle cx="320" cy="240" r="56" fill="none" stroke="#000080" strokeWidth="8" />
        <circle cx="320" cy="240" r="14" fill="#000080" />
      </svg>
    );
  }

  if (norm === 'ar' || norm === 'sa' || norm === 'modern standard arabic') {
    return (
      <svg
        viewBox="0 0 640 480"
        style={commonStyle}
        className={`flag-icon flag-sa ${className}`}
        {...a11yProps}
      >
        <rect width="640" height="480" fill="#165d31" />
        <path d="M180 295h280v12H180z M440 288l28 13-28 13z" fill="#ffffff" />
        <text x="320" y="240" textAnchor="middle" fill="#ffffff" fontSize="56" fontWeight="bold" fontFamily="sans-serif">العربية</text>
      </svg>
    );
  }

  if (norm === 'bn' || norm === 'bd' || norm === 'bengali') {
    return (
      <svg
        viewBox="0 0 640 480"
        style={commonStyle}
        className={`flag-icon flag-bd ${className}`}
        {...a11yProps}
      >
        <rect width="640" height="480" fill="#006a4e" />
        <circle cx="288" cy="240" r="144" fill="#f42a41" />
      </svg>
    );
  }

  if (norm === 'ur' || norm === 'pk' || norm === 'urdu') {
    return (
      <svg
        viewBox="0 0 640 480"
        style={commonStyle}
        className={`flag-icon flag-pk ${className}`}
        {...a11yProps}
      >
        <rect width="640" height="480" fill="#01411c" />
        <rect width="160" height="480" fill="#ffffff" />
        <circle cx="410" cy="240" r="110" fill="#ffffff" />
        <circle cx="438" cy="218" r="95" fill="#01411c" />
        <polygon points="460,180 468,198 488,198 472,210 478,228 460,216 442,228 448,210 432,198 452,198" fill="#ffffff" transform="rotate(-20 460 204)" />
      </svg>
    );
  }

  // Fallback: Globe icon
  return (
    <span
      style={{ fontSize: width, lineHeight: 1 }}
      className={`flag-fallback ${className}`}
      {...(ariaLabel ? { role: 'img', 'aria-label': ariaLabel } : { 'aria-hidden': true })}
    >
      🌐
    </span>
  );
};
