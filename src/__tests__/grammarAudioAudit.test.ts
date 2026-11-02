import fs from 'fs';
import path from 'path';
import { describe, it } from 'vitest';
import { getGrammarForLanguage } from '../data/languages/grammarData';
import { getCandidateAudioPathsForText } from '../components/PronunciationButton';
import { getSpokenGrammarWord } from '../components/Grammar';
import { SupportedLanguageId } from '../data/languages/types';

const PUBLIC_DIR = path.resolve(__dirname, '../../public');

function diskFileExistsForCandidates(candidateUrls: string[]): boolean {
  return candidateUrls.some((url) => {
    const decodedRelPath = decodeURIComponent(url).replace(/^\//, '');
    const fullPath = path.join(PUBLIC_DIR, decodedRelPath);
    return fs.existsSync(fullPath);
  });
}

const ALL_LANGUAGES: SupportedLanguageId[] = [
  'en', 'es', 'fr', 'ru', 'pt', 'de', 'id', 'tr', 'zh', 'ja', 'ko', 'hi', 'ar', 'bn', 'ur'
];

interface AudioTarget {
  lang: string;
  filename: string;
  spoken: string;
}

describe('Grammar Audio Audit Across All Languages', () => {
  it('audits all grammar audio files on disk and exports missing targets', () => {
    const missingByLanguage: Record<string, string[]> = {};
    const targetsToGenerate: AudioTarget[] = [];
    const seen = new Set<string>();

    const addTarget = (lang: string, targetText: string, spokenText?: string) => {
      const candidates = getCandidateAudioPathsForText(targetText, lang);
      if (!diskFileExistsForCandidates(candidates)) {
        // extract filename from first candidate
        const match = candidates[0].match(/\/([^/]+)\.mp3$/);
        if (match) {
          const fn = decodeURIComponent(match[1]);
          const key = `${lang}:${fn}`;
          if (!seen.has(key)) {
            seen.add(key);
            targetsToGenerate.push({
              lang,
              filename: fn,
              spoken: (spokenText || targetText)
                .replace(/\s*\([^)]*\)\s*/g, ' ')
                .replace(/\s*\[[^\]]*\]\s*/g, ' ')
                .replace(/[«»"“”„‟`]/g, '')
                .replace(/\s*—\s*.*/, '')
                .replace(/\s+/g, ' ')
                .trim(),
            });
          }
        }
      }
    };

    for (const lang of ALL_LANGUAGES) {
      const grammar = getGrammarForLanguage(lang, 'en');
      const missing: string[] = [];

      // 1. Gender rules examples
      if (grammar.genderRules) {
        for (const rule of grammar.genderRules) {
          for (const ex of rule.examples) {
            // In non-Latin languages, don't speak the rule name
            const isNonLatin = ['hi', 'ar', 'zh', 'ja', 'ko', 'bn', 'ur'].includes(lang);
            const targetText = (lang === 'ru' || isNonLatin) ? ex.word : `${rule.article} ${ex.word}`;
            const spokenText = ex.word.replace(/\s*\([^)]*\)\s*/g, '').trim();
            const candidates = getCandidateAudioPathsForText(targetText, lang);
            if (!diskFileExistsForCandidates(candidates)) {
              missing.push(`[gender] "${targetText}"`);
              addTarget(lang, targetText, isNonLatin ? spokenText : targetText);
            }
          }
        }
      }

      // 2. Verbs, forms, and example sentences
      if (grammar.verbs) {
        for (const v of grammar.verbs) {
          // main verb
          const cleanVerb = v.verb.replace(/\s*\(.*?\)/g, '').trim();
          const verbCandidates = getCandidateAudioPathsForText(v.verb, lang);
          if (!diskFileExistsForCandidates(verbCandidates)) {
            missing.push(`[verb] "${v.verb}"`);
            addTarget(lang, v.verb, cleanVerb);
            if (cleanVerb !== v.verb) {
              addTarget(lang, cleanVerb, cleanVerb);
            }
          }

          // forms
          for (const item of v.forms) {
            const isNonPersonConjugated = ['zh', 'id', 'ja', 'ko'].includes(lang);
            const cleanPronoun = item.pronoun.replace(/\s*\(.*?\)/g, '').split('/')[0].trim();
            const [mainForm] = item.form.split(/\s*—\s*/);
            const cleanForm = mainForm.replace(/\s*\([^)]*\)\s*/g, '').split('/')[0].trim();

            let audioTarget = cleanForm;
            if (!isNonPersonConjugated && cleanPronoun && (!/[a-zA-Z]/.test(cleanPronoun) || lang === 'en')) {
              audioTarget = `${cleanPronoun} ${cleanForm}`;
            }

            const formCandidates = getCandidateAudioPathsForText(audioTarget, lang);
            if (!diskFileExistsForCandidates(formCandidates)) {
              missing.push(`[form] "${item.pronoun} ${item.form}" -> target: "${audioTarget}"`);
              // add target
              addTarget(lang, audioTarget, audioTarget);
              // Also add cleanForm and combined for personal conjugation languages
              if (!isNonPersonConjugated && cleanPronoun) {
                addTarget(lang, cleanForm, cleanForm);
                addTarget(lang, `${cleanPronoun} ${cleanForm}`, `${cleanPronoun} ${cleanForm}`);
              }
            }
          }

          // example sentence
          if (v.exampleSentence?.target) {
            const sent = v.exampleSentence.target;
            const sentCandidates = getCandidateAudioPathsForText(sent, lang, 'phrases');
            if (!diskFileExistsForCandidates(sentCandidates)) {
              missing.push(`[exampleSentence] "${sent}"`);
              addTarget(lang, sent, sent);
            }
          }
        }
      }

      // 3. Flashcards
      if (grammar.flashcards) {
        for (const card of grammar.flashcards) {
          const promptParts = card.prompt.split(/\s*➔\s*/);
          const heroWord = promptParts[0];
          const taskPrompt = promptParts.length > 1 ? promptParts[1] : null;

          let audioTextToPlay = card.audioWord;
          if (!audioTextToPlay) {
            if (card.article) {
              audioTextToPlay = `${card.article} ${heroWord.replace(/^___\s*/, '').trim()}`;
            } else if (taskPrompt && taskPrompt.includes('___')) {
              audioTextToPlay = taskPrompt.replace('___', card.correctAnswer).replace(/\s+/g, ' ').trim();
            } else if (heroWord.includes('___')) {
              audioTextToPlay = heroWord.replace('___', card.correctAnswer).replace(/\s+/g, ' ').trim();
            } else {
              audioTextToPlay = card.correctAnswer;
            }
          }

          const cardCandidates = getCandidateAudioPathsForText(audioTextToPlay, lang);
          if (!diskFileExistsForCandidates(cardCandidates)) {
            missing.push(`[flashcard ${card.id}] "${audioTextToPlay}"`);
            addTarget(lang, audioTextToPlay, audioTextToPlay);
          }
        }
      }

      // 4. Descriptions & Adjectives
      if (grammar.descriptions) {
        for (const desc of grammar.descriptions) {
          for (const item of desc.examples) {
            const forms = [item.positive, item.comparative, item.superlative];
            for (const f of forms) {
              if (f) {
                const spoken = getSpokenGrammarWord(f, lang);
                if (spoken) {
                  const formCandidates = getCandidateAudioPathsForText(spoken, lang, 'grammar');
                  if (!diskFileExistsForCandidates(formCandidates)) {
                    missing.push(`[description] "${f}" -> target: "${spoken}"`);
                    addTarget(lang, spoken, spoken);
                  }
                }
              }
            }
          }
        }
      }

      if (missing.length > 0) {
        missingByLanguage[lang] = missing;
      }
    }

    const outPath = path.resolve(__dirname, '../../scripts/grammar_targets.json');
    fs.writeFileSync(outPath, JSON.stringify(targetsToGenerate, null, 2));
    console.log(`Exported ${targetsToGenerate.length} audio targets to ${outPath}`);
  });
});
