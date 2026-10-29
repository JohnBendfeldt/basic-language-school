import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { TERMS_TRANSLATIONS } from '../data/legalTranslations';

interface TermsOfServiceProps {
  onNavigate: (section: string) => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onNavigate }) => {
  const { baseLanguage } = useLanguage();
  const t = TERMS_TRANSLATIONS[baseLanguage] || TERMS_TRANSLATIONS.en;

  return (
    <div className="section legal-container">
      <div className="legal-card">
        <div className="legal-nav-bar">
          <button 
            className="legal-back-btn" 
            onClick={() => onNavigate('alphabet')}
            aria-label={t.backToPracticeAria}
          >
            <FaArrowLeft className="back-btn-icon" aria-hidden="true" />
            <span>{t.backToPractice}</span>
          </button>
        </div>

        <h1 className="legal-title">{t.title}</h1>
        <p className="legal-last-updated">{t.lastUpdated}</p>

        {t.sections.map((sec, idx) => (
          <React.Fragment key={idx}>
            <h2>{sec.heading}</h2>
            {sec.paragraphs.map((p, pIdx) => (
              <p key={pIdx}>{p}</p>
            ))}
            {sec.listItems && sec.listItems.length > 0 && (
              <ul>
                {sec.listItems.map((li, lIdx) => (
                  <li key={lIdx}>{li}</li>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}

        <h2>{t.contactHeading}</h2>
        <p>{t.contactIntro}</p>
        <p className="legal-contact-block">
          <strong>Basic Language School</strong><br />
          Attn: John Bendfeldt<br />
          Email: <a href="mailto:dev@basiclanguage.school">dev@basiclanguage.school</a><br />
          Website: <a href="https://basiclanguage.school">https://basiclanguage.school</a>
        </p>

        <div className="legal-page-footer">
          <span>{t.footerPrompt}</span>
          <button 
            type="button" 
            className="legal-inline-link" 
            onClick={() => onNavigate('privacy')}
          >
            {t.footerLink}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
