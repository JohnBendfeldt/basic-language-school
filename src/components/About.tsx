import React from 'react';
import { FaArrowLeft, FaEnvelope, FaUser, FaGithub, FaHeart, FaShieldAlt, FaFileContract } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { ABOUT_TRANSLATIONS } from '../data/aboutTranslations';

interface AboutProps {
  onNavigate: (section: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const { baseLanguage } = useLanguage();
  const t = ABOUT_TRANSLATIONS[baseLanguage] || ABOUT_TRANSLATIONS.en;

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
        <h1 className="legal-title">{t.title}</h1>
        <p className="about-subtitle">{t.subtitle}</p>

        {/* Philosophy Highlight Box */}
        <div className="about-philosophy-banner">
          <div className="about-philosophy-icon">
            <FaHeart />
          </div>
          <div className="about-philosophy-text">
            <strong>No bulk. No fluff. No patronizing. Just learning.</strong>
            <p>
              We believe foundational language education should be open to all: genuinely free, ad-free bidirectional learning across 8 languages. Built to get straight to real language practice without paywalls, subscription timers, distracting ads, or artificial energy limits.
            </p>
          </div>
        </div>

        {/* Section 1: Overview */}
        <h2>{t.appOverviewTitle}</h2>
        {t.appOverviewParagraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}

        {/* Section 2: Core Features */}
        <h2>{t.featuresTitle}</h2>
        <div className="about-features-grid">
          {t.features.map((feat, idx) => (
            <div key={idx} className="about-feature-item">
              <span className="about-feature-icon" role="img" aria-hidden="true">{feat.icon}</span>
              <div className="about-feature-content">
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section 3: About Creator */}
        <h2>{t.creatorTitle}</h2>
        {t.creatorBio.map((bio, idx) => (
          <p key={idx}>{bio}</p>
        ))}

        {/* Section 4: Contact & Bug Reports */}
        <h2>{t.contactTitle}</h2>
        <p>{t.contactIntro}</p>

        <div className="about-contact-box">
          <div className="contact-row">
            <span className="contact-label">
              <FaUser className="contact-icon" /> {t.contactNameLabel}
            </span>
            <span className="contact-value">John Bendfeldt</span>
          </div>
          <div className="contact-row">
            <span className="contact-label">
              <FaEnvelope className="contact-icon" /> {t.contactEmailLabel}
            </span>
            <span className="contact-value">
              <a href="mailto:dev@basiclanguage.school">dev@basiclanguage.school</a>
            </span>
          </div>
          <div className="contact-row">
            <span className="contact-label">
              <FaGithub className="contact-icon" /> {t.contactBugsLabel}
            </span>
            <span className="contact-value">
              Send questions, audio suggestions, or bug reports anytime to <a href="mailto:dev@basiclanguage.school">dev@basiclanguage.school</a>
            </span>
          </div>
        </div>

        {/* Section 5: Open Source & Roadmap */}
        <h2>{t.communityTitle}</h2>
        {t.communityParagraphs.map((cp, idx) => (
          <p key={idx}>{cp}</p>
        ))}

        {/* Footer Legal Prompt */}
        <div className="legal-page-footer about-legal-footer">
          <span>{t.footerPrompt}</span>
          <div className="about-footer-links">
            <button 
              type="button" 
              className="legal-inline-link" 
              onClick={() => onNavigate('privacy')}
            >
              <FaShieldAlt className="inline-link-icon" />
              <span>{t.privacyLinkText}</span>
            </button>
            <span className="footer-link-divider">·</span>
            <button 
              type="button" 
              className="legal-inline-link" 
              onClick={() => onNavigate('terms')}
            >
              <FaFileContract className="inline-link-icon" />
              <span>{t.termsLinkText}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
