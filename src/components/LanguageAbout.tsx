import React from 'react';
import { SupportedLanguageId } from '../data/languages/types';
import { ABOUT_LANGUAGES, LanguageProfile } from '../data/languages/aboutLanguageData';
import PronunciationButton from './PronunciationButton';
import { FaHistory, FaLightbulb, FaBookOpen, FaGlobeAmericas, FaArrowRight } from 'react-icons/fa';

interface LanguageAboutProps {
  currentLanguage: SupportedLanguageId;
  baseLanguage: SupportedLanguageId;
}

export const LanguageAbout: React.FC<LanguageAboutProps> = ({ currentLanguage }) => {
  const profile: LanguageProfile = ABOUT_LANGUAGES[currentLanguage] || ABOUT_LANGUAGES.en;

  return (
    <div className="language-about-container">
      {/* Hero Banner */}
      <div className="about-hero-card">
        <div className="about-hero-badge">
          <FaGlobeAmericas className="hero-badge-icon" /> Language Origins & Story
        </div>
        <h2 className="about-hero-title">{profile.title}</h2>
        <p className="about-hero-native">{profile.nativeName}</p>
        <p className="about-hero-tagline">{profile.tagline}</p>

        {/* Core Identity Pills */}
        <div className="about-hero-meta-row">
          <div className="hero-meta-pill">
            <span className="meta-pill-label">Speakers</span>
            <span className="meta-pill-val">{profile.speakersCount}</span>
          </div>
          <div className="hero-meta-pill">
            <span className="meta-pill-label">Script System</span>
            <span className="meta-pill-val">{profile.writingSystem}</span>
          </div>
          <div className="hero-meta-pill">
            <span className="meta-pill-label">Family</span>
            <span className="meta-pill-val">{profile.languageFamily}</span>
          </div>
        </div>
      </div>

      {/* Quick Facts Grid */}
      <div className="about-section-wrap">
        <h3 className="about-section-heading">
          <FaLightbulb className="heading-icon" /> Quick Facts & Linguistic Profile
        </h3>
        <div className="about-facts-grid">
          {profile.facts.map((fact, idx) => (
            <div key={idx} className="about-fact-card">
              <span className="fact-icon" aria-hidden="true">{fact.icon || '📌'}</span>
              <div className="fact-content">
                <span className="fact-label">{fact.label}</span>
                <span className="fact-value">{fact.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Traditional vs Simplified Script Comparison (Mandarin Exclusive) */}
      {profile.scriptComparison && profile.scriptComparison.length > 0 && (
        <div className="about-section-wrap script-evolution-wrap">
          <div className="script-evolution-header">
            <span className="script-badge">1950s Literacy Revolution</span>
            <h3 className="about-section-heading">
              <FaBookOpen className="heading-icon" /> Traditional vs. Simplified Characters (繁简对比)
            </h3>
            <p className="script-evolution-desc">
              In 1949, over 80% of China’s population could not read or write because Traditional characters averaged 15 to 30 strokes each. In 1956, the government systematically streamlined characters into Simplified forms to bring universal literacy to working people:
            </p>
          </div>

          <div className="script-comparison-grid">
            {profile.scriptComparison.map((item, idx) => (
              <div key={idx} className="script-compare-card">
                <div className="compare-top-row">
                  {/* Traditional */}
                  <div className="compare-character-side traditional">
                    <span className="char-badge">Traditional (繁体)</span>
                    <span className="compare-char">{item.traditional}</span>
                    <span className="stroke-pill">{item.traditionalStrokes} strokes</span>
                  </div>

                  {/* Transition Arrow */}
                  <div className="compare-arrow-wrap">
                    <FaArrowRight className="compare-arrow" />
                    <span className="reduced-badge">
                      -{item.traditionalStrokes - item.simplifiedStrokes} strokes
                    </span>
                  </div>

                  {/* Simplified */}
                  <div className="compare-character-side simplified">
                    <span className="char-badge active">Simplified (简体)</span>
                    <span className="compare-char">{item.simplified}</span>
                    <span className="stroke-pill success">{item.simplifiedStrokes} strokes</span>
                  </div>
                </div>

                <div className="compare-bottom-info">
                  <div className="compare-sound-row">
                    <strong className="compare-pinyin">{item.pinyin}</strong>
                    <span className="compare-meaning">"{item.meaning}"</span>
                    <PronunciationButton
                      text={item.simplified}
                      lang="zh"
                      audioCategory="words"
                      useLocalAudio={true}
                      label={`Listen to ${item.simplified} (${item.pinyin})`}
                      className="compare-audio-btn"
                    />
                  </div>
                  <p className="compare-reason">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Historical Milestones Timeline */}
      <div className="about-section-wrap">
        <h3 className="about-section-heading">
          <FaHistory className="heading-icon" /> Historical Milestones & Evolution
        </h3>
        <div className="about-timeline">
          {profile.historyTimeline.map((milestone, idx) => (
            <div key={idx} className="timeline-node">
              <div className="timeline-marker-col">
                <div className="timeline-circle" />
                {idx < profile.historyTimeline.length - 1 && <div className="timeline-stem" />}
              </div>
              <div className="timeline-card">
                <div className="timeline-header-row">
                  <span className="timeline-era-badge">{milestone.era}</span>
                  {milestone.highlight && (
                    <span className="timeline-highlight-pill">{milestone.highlight}</span>
                  )}
                </div>
                <h4 className="timeline-milestone-title">{milestone.title}</h4>
                <p className="timeline-milestone-desc">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Linguistic Traits & Superpowers */}
      <div className="about-section-wrap">
        <h3 className="about-section-heading">
          <FaLightbulb className="heading-icon" /> Linguistic Secrets & Superpowers
        </h3>
        <div className="about-traits-grid">
          {profile.linguisticTraits.map((trait, idx) => (
            <div key={idx} className="about-trait-card">
              <div className="trait-top">
                <span className="trait-icon">{trait.icon || '✨'}</span>
                <h4 className="trait-title">{trait.title}</h4>
              </div>
              <p className="trait-desc">{trait.description}</p>
              {trait.example && (
                <div className="trait-example-box">
                  <span className="example-tag">Example:</span>
                  <span className="example-text">{trait.example}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Note Banner */}
      {profile.culturalNote && (
        <div className="about-cultural-banner">
          <span className="cultural-icon">🌺</span>
          <div className="cultural-text">
            <strong>Cultural Reflection:</strong> {profile.culturalNote}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageAbout;
