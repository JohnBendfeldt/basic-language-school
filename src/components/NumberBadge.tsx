import React from 'react';

interface NumberBadgeProps {
  value: string | number;
  className?: string;
  size?: number;
}

/**
 * Clean, modern vector number badge for adult learners.
 * Replaces cartoonish keycap emojis (0️⃣, 1️⃣, 1️⃣2️⃣) with crisp, high-contrast
 * typographic SVG badges.
 */
export const NumberBadge: React.FC<NumberBadgeProps> = ({
  value,
  className = '',
  size = 36,
}) => {
  const displayVal = String(value).trim();
  const isLarge = displayVal.length >= 3;
  const isMedium = displayVal.length === 2;

  const width = isLarge ? Math.round(size * 1.5) : Math.round(size * 1.15);
  const height = size;
  const rx = Math.round(size * 0.28);

  const fontSize = isLarge
    ? Math.round(size * 0.42)
    : isMedium
      ? Math.round(size * 0.52)
      : Math.round(size * 0.58);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`number-svg-badge ${className}`}
      aria-hidden="true"
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
      }}
    >
      <defs>
        <linearGradient id={`nb-grad-${displayVal}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4338ca" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <filter id="nb-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#1e1b4b" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Rounded Badge Body */}
      <rect
        x="1"
        y="1"
        width={width - 2}
        height={height - 2}
        rx={rx}
        fill={`url(#nb-grad-${displayVal})`}
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        filter="url(#nb-shadow)"
      />

      {/* Subtle Inner Highlight */}
      <rect
        x="2"
        y="2"
        width={width - 4}
        height={(height - 4) / 2}
        rx={rx - 1}
        fill="rgba(255, 255, 255, 0.12)"
      />

      {/* Numerical Digit Text */}
      <text
        x={width / 2}
        y={height / 2 + fontSize * 0.36}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontSize={fontSize}
        fontWeight="800"
        fill="#ffffff"
        letterSpacing={isLarge ? '-0.5px' : '0'}
      >
        {displayVal}
      </text>
    </svg>
  );
};
