import React from 'react';
import { FaArrowLeft, FaEnvelope, FaUser, FaGithub, FaHeart, FaShieldAlt, FaFileContract } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { ABOUT_TRANSLATIONS } from '../data/aboutTranslations';

interface AboutProps {
  onNavigate: (section: string) => void;
}

interface OpenSourceRepoItem {
  name: string;
  slug: string;
  url: string;
  description: string;
}

const OPEN_SOURCE_REPOS: OpenSourceRepoItem[] = [
  {
    name: 'Basic Language School',
    slug: 'JohnBendfeldt/basic-language-school',
    url: 'https://github.com/JohnBendfeldt/basic-language-school',
    description: 'Multi-language PWA hub with 15 languages, 210 bidirectional pairs, offline audio packs, and phonetic keyboards.',
  },
  {
    name: 'Basic English',
    slug: 'JohnBendfeldt/basic-english',
    url: 'https://github.com/JohnBendfeldt/basic-english',
    description: 'Standalone English alphabet, phonics, numbers, and vocabulary PWA (basicenglish.school).',
  },
  {
    name: 'Basic French',
    slug: 'JohnBendfeldt/basic-french',
    url: 'https://github.com/JohnBendfeldt/basic-french',
    description: 'Standalone French phonetics, numbers, time, and accent-forgiving quiz PWA (basicfrench.org).',
  },
  {
    name: 'Basic Russian',
    slug: 'JohnBendfeldt/basic-russian',
    url: 'https://github.com/JohnBendfeldt/basic-russian',
    description: 'Standalone Russian & Cyrillic PWA with virtual keyboard and live Latin-to-Cyrillic transliteration (basicrussian.org).',
  },
];

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const { baseLanguage } = useLanguage();
  const t = ABOUT_TRANSLATIONS[baseLanguage] || ABOUT_TRANSLATIONS.en;
  const englishPassageLang = baseLanguage !== 'en' ? 'en' : undefined;

  return (
    <div className="section legal-container about-container">
      <div className="legal-card about-card">
        {/* Navigation Bar */}
        <div className="legal-nav-bar">
          <button 
            type="button"
            className="legal-back-btn" 
            onClick={() => onNavigate('alphabet')}
            aria-label={t.backToPracticeAria}
          >
            <FaArrowLeft className="back-btn-icon" aria-hidden="true" />
            <span>{t.backToPractice}</span>
          </button>
        </div>

        {/* Header */}
        <h2 className="legal-title">{t.title}</h2>
        <p className="about-subtitle">{t.subtitle}</p>

        {/* Philosophy Highlight Box */}
        <div className="about-philosophy-banner">
          <div className="about-philosophy-icon" aria-hidden="true">
            <FaHeart aria-hidden="true" />
          </div>
          <div className="about-philosophy-text" lang={englishPassageLang} dir={englishPassageLang ? 'ltr' : undefined}>
            <strong>No bulk. No fluff. No patronizing. Just learning.</strong>
            <p>
              We believe foundational language education should be open to all: genuinely free, ad-free bidirectional learning across 15 languages. Built to get straight to real language practice without paywalls, subscription timers, distracting ads, or artificial energy limits.
            </p>
          </div>
        </div>

        {/* Section 1: Overview */}
        <h3>{t.appOverviewTitle}</h3>
        {t.appOverviewParagraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}

        {/* Section 2: Core Features */}
        <h3>{t.featuresTitle}</h3>
        <div className="about-features-grid">
          {t.features.map((feat, idx) => (
            <div key={idx} className="about-feature-item">
              <span className="about-feature-icon" aria-hidden="true">{feat.icon}</span>
              <div className="about-feature-content">
                <h4>{feat.title}</h4>
                <p>{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section 3: About Creator */}
        <h3>{t.creatorTitle}</h3>
        {t.creatorBio.map((bio, idx) => (
          <p key={idx}>{bio}</p>
        ))}

        {/* Section 4: Contact & Bug Reports */}
        <h3>{t.contactTitle}</h3>
        <p>{t.contactIntro}</p>

        <div className="about-contact-box">
          <div className="contact-row">
            <span className="contact-label">
              <FaUser className="contact-icon" aria-hidden="true" /> {t.contactNameLabel}
            </span>
            <span className="contact-value" lang={englishPassageLang} dir={englishPassageLang ? 'ltr' : undefined}>
              <a
                href="https://johnbendfeldt.com"
                target="_blank"
                rel="noopener noreferrer author"
              >
                John Bendfeldt
              </a>
            </span>
          </div>
          <div className="contact-row">
            <span className="contact-label">
              <FaEnvelope className="contact-icon" aria-hidden="true" /> {t.contactEmailLabel}
            </span>
            <span className="contact-value">
              <a href="mailto:dev@basiclanguage.school">dev@basiclanguage.school</a>
            </span>
          </div>
          <div className="contact-row">
            <span className="contact-label">
              <FaGithub className="contact-icon" aria-hidden="true" /> {t.contactBugsLabel}
            </span>
            <span className="contact-value" lang={englishPassageLang} dir={englishPassageLang ? 'ltr' : undefined}>
              Open an issue or pull request on{' '}
              <a
                href="https://github.com/JohnBendfeldt/basic-language-school/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Issues
              </a>{' '}
              or email <a href="mailto:dev@basiclanguage.school">dev@basiclanguage.school</a>
            </span>
          </div>
        </div>

        {/* Section 5: Open Source & GitHub Repositories */}
        <h3>{t.communityTitle}</h3>
        {t.communityParagraphs.map((cp, idx) => (
          <p key={idx}>{cp}</p>
        ))}

        <div
          className="about-repos-grid"
          lang={englishPassageLang}
          dir={englishPassageLang ? 'ltr' : undefined}
        >
          {OPEN_SOURCE_REPOS.map((repo) => (
            <a
              key={repo.slug}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="about-repo-card"
            >
              <span className="about-repo-header">
                <FaGithub className="about-repo-icon" aria-hidden="true" />
                <span className="about-repo-title">{repo.name}</span>
              </span>
              <span className="about-repo-desc">{repo.description}</span>
              <span className="about-repo-slug">{repo.slug} ↗</span>
            </a>
          ))}
        </div>

        {/* Footer Legal Prompt */}
        <div className="legal-page-footer about-legal-footer">
          <span>{t.footerPrompt}</span>
          <div className="about-footer-links">
            <button 
              type="button" 
              className="legal-inline-link" 
              onClick={() => onNavigate('privacy')}
            >
              <FaShieldAlt className="inline-link-icon" aria-hidden="true" />
              <span>{t.privacyLinkText}</span>
            </button>
            <span className="footer-link-divider" aria-hidden="true">·</span>
            <button 
              type="button" 
              className="legal-inline-link" 
              onClick={() => onNavigate('terms')}
            >
              <FaFileContract className="inline-link-icon" aria-hidden="true" />
              <span>{t.termsLinkText}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
