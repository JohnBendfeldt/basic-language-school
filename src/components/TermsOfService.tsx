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
  const englishPassageLang = baseLanguage !== 'en' ? 'en' : undefined;

  return (
    <div className="section legal-container">
      <div className="legal-card">
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

        <h2 className="legal-title">{t.title}</h2>
        <p className="legal-last-updated">{t.lastUpdated}</p>

        {t.sections.map((sec, idx) => (
          <React.Fragment key={idx}>
            <h3>{sec.heading}</h3>
            {sec.paragraphs.map((p, pIdx) => {
              const mitRegex = /(MIT License|Licencia MIT|licence MIT|лицензии MIT|licença MIT|MIT-Lizenz|Lisensi MIT|MIT Lisansı|MITライセンス|MIT 许可证|MIT लाइसेंस|MIT 라이선스|ترخيص MIT|MIT লাইসেন্স|MIT لائسنس)/;
              const match = p.match(mitRegex);
              if (!match) {
                return <p key={pIdx}>{p}</p>;
              }
              const [beforeMit, afterMit] = p.split(match[0]);
              const ghIndex = afterMit.indexOf('GitHub');
              return (
                <p key={pIdx}>
                  {beforeMit}
                  <a
                    href="https://github.com/JohnBendfeldt/basic-language-school/blob/main/LICENSE"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {match[0]}
                  </a>
                  {ghIndex >= 0 ? (
                    <>
                      {afterMit.slice(0, ghIndex)}
                      <a
                        href="https://github.com/JohnBendfeldt/basic-language-school"
                        target="_blank"
                        rel="noopener noreferrer"
                        lang={englishPassageLang}
                        dir={englishPassageLang ? 'ltr' : undefined}
                      >
                        GitHub
                      </a>
                      {afterMit.slice(ghIndex + 'GitHub'.length)}
                    </>
                  ) : (
                    afterMit
                  )}
                </p>
              );
            })}
            {sec.listItems && sec.listItems.length > 0 && (
              <ul>
                {sec.listItems.map((li, lIdx) => (
                  <li key={lIdx}>{li}</li>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}

        <h3>{t.contactHeading}</h3>
        <p>{t.contactIntro}</p>
        <p className="legal-contact-block" lang={englishPassageLang} dir={englishPassageLang ? 'ltr' : undefined}>
          <strong>Basic Language School</strong><br />
          Attn: John Bendfeldt<br />
          Email: <a href="mailto:dev@basiclanguage.school">dev@basiclanguage.school</a><br />
          Website: <a href="https://basiclanguage.school">https://basiclanguage.school</a><br />
          GitHub:{' '}
          <a
            href="https://github.com/JohnBendfeldt/basic-language-school"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/JohnBendfeldt/basic-language-school
          </a>
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
