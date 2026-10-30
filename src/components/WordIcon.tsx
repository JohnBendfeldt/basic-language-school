import React from 'react';

interface WordIconProps {
  icon?: string;
  word?: string;
  meaning?: string;
  className?: string;
  size?: number;
}

/**
 * 4-Legged Dining Table Vector SVG (< 350 bytes)
 * Replaces mismatched chair 🪑 emojis for table concepts
 */
export const TableSVG: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`word-icon-svg word-icon-table ${className}`}
    aria-label="Table"
  >
    {/* Floor Drop Shadow */}
    <ellipse cx="24" cy="42" rx="18" ry="2.5" fill="#000000" fillOpacity="0.12" />
    {/* Back Legs (Deeper perspective shadow) */}
    <rect x="13" y="20" width="3.5" height="19" rx="1.5" fill="#8D5B4C" />
    <rect x="31.5" y="20" width="3.5" height="19" rx="1.5" fill="#8D5B4C" />
    {/* Frame / Apron */}
    <rect x="8" y="19" width="32" height="4" rx="1" fill="#A0674B" />
    {/* Front Legs (Warm solid wood) */}
    <rect x="9" y="21" width="4" height="20" rx="1.5" fill="#C28258" />
    <rect x="35" y="21" width="4" height="20" rx="1.5" fill="#C28258" />
    {/* Tabletop Surface */}
    <path
      d="M5 18C5 16.3431 6.34315 15 8 15H40C41.6569 15 43 16.3431 43 18C43 19.6569 41.6569 21 40 21H8C6.34315 21 5 19.6569 5 18Z"
      fill="#D99B6A"
    />
    <path
      d="M7 16H41C41.8 16 42.5 16.4 42.8 17H5.2C5.5 16.4 6.2 16 7 16Z"
      fill="#F1BE93"
    />
  </svg>
);

/**
 * Interactive Planning / Meeting Board Vector SVG
 */
export const MeetingBoardSVG: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`word-icon-svg word-icon-meeting ${className}`}
    aria-label="Meeting Planning Board"
  >
    {/* Easel Stand */}
    <path d="M14 43L20 32M34 43L28 32M24 32V42" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
    {/* Whiteboard Frame */}
    <rect x="7" y="7" width="34" height="25" rx="3" fill="#E2E8F0" stroke="#475569" strokeWidth="2" />
    <rect x="9" y="9" width="30" height="21" rx="1.5" fill="#FFFFFF" />
    {/* Project notes */}
    <rect x="12" y="12" width="6" height="5" rx="1" fill="#3B82F6" />
    <rect x="21" y="12" width="6" height="5" rx="1" fill="#10B981" />
    <rect x="30" y="12" width="6" height="5" rx="1" fill="#F59E0B" />
    {/* Diagram connection lines */}
    <path d="M15 20H24M24 20H33M24 20V25" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="21" y="24" width="6" height="4" rx="1" fill="#8B5CF6" />
  </svg>
);

/**
 * Teacher / Instructor Vector SVG
 */
export const TeacherSVG: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`word-icon-svg word-icon-teacher ${className}`}
    aria-label="Teacher"
  >
    <rect x="16" y="8" width="26" height="20" rx="2" fill="#1E293B" stroke="#78350F" strokeWidth="2" />
    <path d="M20 14H36M20 18H32M20 22H27" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="15" cy="20" r="5" fill="#FBBF24" />
    <path d="M8 38C8 31.5 11 27 15 27C19 27 22 31.5 22 38" fill="#3B82F6" />
    <path d="M19 28L30 18" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const TABLE_KEYWORDS = new Set([
  'table',
  'tisch',
  'стол',
  'mesa',
  'meja',
  'masa',
  'la table',
  'der tisch',
]);

const MEETING_KEYWORDS = new Set([
  'meeting',
  'besprechung',
  'reunión',
  'reunion',
  'planen',
  'planifions',
  'планировать',
  'miting',
]);

const TEACHER_KEYWORDS = new Set([
  'teacher',
  'lehrer',
  'учитель',
  'profesor',
  'professeur',
  'öğretmen',
  'ogretmen',
  'guru',
]);

/**
 * Smart WordIcon: Renders custom vector SVGs when Unicode emojis are inaccurate or missing,
 * falling back gracefully to standard emojis.
 */
export const WordIcon: React.FC<WordIconProps> = ({
  icon,
  word,
  meaning,
  className = '',
  size = 28,
}) => {
  const normWord = (word || '').trim().toLowerCase();
  const normMeaning = (meaning || '').trim().toLowerCase();
  const normIcon = (icon || '').trim().toLowerCase();

  // 1. Direct SVG key requests
  if (normIcon === 'svg:table' || normIcon === 'table') {
    return <TableSVG size={size} className={className} />;
  }
  if (normIcon === 'svg:meeting' || normIcon === 'meeting') {
    return <MeetingBoardSVG size={size} className={className} />;
  }
  if (normIcon === 'svg:teacher' || normIcon === 'teacher') {
    return <TeacherSVG size={size} className={className} />;
  }

  // 2. Automatic emoji gap overrides:
  // E.g. If the word or meaning is "Table" but the icon was given a chair 🪑
  if (
    (TABLE_KEYWORDS.has(normWord) || TABLE_KEYWORDS.has(normMeaning)) &&
    (icon === '🪑' || !icon)
  ) {
    return <TableSVG size={size} className={className} />;
  }

  // Meeting / Planning
  if (MEETING_KEYWORDS.has(normWord) || MEETING_KEYWORDS.has(normMeaning)) {
    if (icon === '📅' || icon === '👥' || !icon) {
      return <MeetingBoardSVG size={size} className={className} />;
    }
  }

  // Teacher / Instructor
  if (TEACHER_KEYWORDS.has(normWord) || TEACHER_KEYWORDS.has(normMeaning)) {
    if (icon === '🏫' || !icon) {
      return <TeacherSVG size={size} className={className} />;
    }
  }

  // 3. Standard emoji fallback
  if (!icon) return null;

  return (
    <span className={`word-icon-emoji ${className}`} style={{ fontSize: `${size}px`, lineHeight: 1 }}>
      {icon}
    </span>
  );
};

export default WordIcon;

