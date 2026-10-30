import { describe, it, expect } from 'vitest';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { getGrammarForLanguage } from '../data/languages/grammarData';
import { resolveTranslation } from '../utils/translationResolver';
import { SupportedLanguageId } from '../data/languages/types';
import { PhraseItem } from '../types';

const ALL: SupportedLanguageId[] = ['en', 'es', 'fr', 'ru', 'pt', 'de', 'id', 'tr', 'zh', 'ja', 'ko', 'hi', 'ar', 'bn', 'ur'];
// Representative base languages (Latin, Cyrillic, CJK, Indic, RTL) to keep the suite fast
const SAMPLE_BASES: SupportedLanguageId[] = ['en', 'ru', 'ja', 'hi', 'ar'];

const targetText = (p: PhraseItem): string => (p.phrase ?? p.russian ?? p.target ?? '').trim();

const phraseLists = (lang: SupportedLanguageId) => {
  const d = SUPPORTED_LANGUAGES[lang].data;
  return {
    basicPhrases: d.basicPhrases ?? [],
    commonWords: d.commonWords ?? [],
    numbers: d.numbers ?? [],
    time: d.time ?? [],
  };
};

describe('Curriculum data integrity (all 15 languages)', () => {
  describe.each(ALL)('%s', (lang) => {
    const data = SUPPORTED_LANGUAGES[lang].data;

    it('has a populated curriculum', () => {
      if (SUPPORTED_LANGUAGES[lang].hasAlphabet) expect(data.alphabet.length).toBeGreaterThan(5);
      expect(data.basicPhrases.length).toBeGreaterThan(10);
      expect(data.commonWords.length).toBeGreaterThan(20);
      expect(data.numbers.length).toBeGreaterThan(10);
    });

    it('alphabet entries are complete, unique, and have a real phonetic anchor', () => {
      const seen = new Set<string>();
      const problems: string[] = [];
      for (const a of data.alphabet) {
        if (!a.letter?.trim()) problems.push('empty letter');
        if (seen.has(a.letter)) problems.push(`duplicate letter ${a.letter}`);
        seen.add(a.letter);
        if (!a.pronunciation?.trim() && !a.example?.trim()) problems.push(`${a.letter}: no pronunciation or example`);
        // Self-referential anchor like "as in Araba" for the example word Araba teaches nothing
        const word = (a.word ?? a.russianWord ?? '').trim().toLowerCase();
        const anchor = (a.example ?? '').replace(/^(as in|comme dans|como en|как в)\s*/i, '').trim().toLowerCase();
        if (word && anchor && anchor === word) problems.push(`${a.letter}: example anchor "${a.example}" repeats the example word`);
      }
      expect(problems).toEqual([]);
    });

    it('phrase, word, number and time entries have a target text and no exact duplicate rows', () => {
      const problems: string[] = [];
      for (const [listName, list] of Object.entries(phraseLists(lang))) {
        const seen = new Set<string>();
        list.forEach((p, i) => {
          const t = targetText(p);
          if (!t) problems.push(`${listName}[${i}]: empty target`);
          // Same target with a different meaning is a legitimate homograph (e.g. 月 moon/month);
          // the same target AND meaning twice is a redundant row.
          const key = `${t.toLowerCase()}||${(p.translation ?? p.meaning ?? p.english ?? '').trim().toLowerCase()}`;
          if (t && seen.has(key)) problems.push(`${listName}: duplicate "${t}"`);
          seen.add(key);
        });
      }
      expect(problems).toEqual([]);
    });

    it('a single-word noun is never labeled with a clock-time sentence (regression: 時計 / 시계 -> "It is 2:00")', () => {
      const problems: string[] = [];
      for (const p of [...data.commonWords, ...data.basicPhrases]) {
        const t = targetText(p);
        const meaning = (p.translation ?? p.meaning ?? p.english ?? '').trim();
        const isClockSentence = /^it is \d{1,2}:\d{2}$/i.test(meaning);
        const isSingleToken = t.length > 0 && !/\s/.test(t);
        const hasTimeMarker = /\d|時|点|點|시|분/.test(t);
        if (isClockSentence && isSingleToken && !hasTimeMarker) problems.push(`"${t}" -> "${meaning}"`);
      }
      expect(problems).toEqual([]);
    });

    it('every entry resolves to a non-empty meaning for key base languages', () => {
      const problems: string[] = [];
      for (const base of SAMPLE_BASES) {
        if (base === lang) continue;
        for (const [listName, list] of Object.entries(phraseLists(lang))) {
          for (const p of list) {
            const meaning = resolveTranslation(p, lang, base);
            if (!meaning || !meaning.trim()) problems.push(`${base}<-${lang} ${listName}: "${targetText(p)}"`);
          }
        }
      }
      expect(problems.slice(0, 20)).toEqual([]);
    });

  });
});

describe('Grammar data integrity (all 15 languages)', () => {
  describe.each(ALL)('%s', (lang) => {
    const grammar = getGrammarForLanguage(lang, 'en');

    it('has grammar content', () => {
      const total = (grammar.genderRules?.length ?? 0) + (grammar.verbs?.length ?? 0) + (grammar.descriptions?.length ?? 0);
      expect(total).toBeGreaterThan(0);
    });

    it('verb tables have a verb, tense, and complete pronoun/form rows', () => {
      const problems: string[] = [];
      for (const v of grammar.verbs ?? []) {
        if (!v.verb?.trim()) problems.push('verb missing name');
        if (!v.tense?.trim()) problems.push(`${v.verb}: missing tense`);
        if (!v.forms?.length) problems.push(`${v.verb}: no forms`);
        const pronouns = new Set<string>();
        for (const f of v.forms ?? []) {
          if (!f.pronoun?.trim() || !f.form?.trim()) problems.push(`${v.verb}: blank row ${JSON.stringify(f)}`);
          if (pronouns.has(f.pronoun)) problems.push(`${v.verb}: duplicate pronoun ${f.pronoun}`);
          pronouns.add(f.pronoun);
        }
      }
      expect(problems).toEqual([]);
    });

    it('gender/noun rule examples are filled in', () => {
      const problems: string[] = [];
      for (const r of grammar.genderRules ?? []) {
        if (!r.examples?.length) problems.push(`${r.name}: no examples`);
        for (const ex of r.examples ?? []) {
          if (!ex.word?.trim() || !ex.meaning?.trim()) problems.push(`${r.name}: incomplete example ${JSON.stringify(ex)}`);
        }
      }
      expect(problems).toEqual([]);
    });

    it('flashcards have unique ids, valid options, and the correct answer is one of them', () => {
      const problems: string[] = [];
      const ids = new Set<string>();
      for (const c of grammar.flashcards ?? []) {
        if (ids.has(c.id)) problems.push(`duplicate id ${c.id}`);
        ids.add(c.id);
        if (!c.options.includes(c.correctAnswer)) problems.push(`${c.id}: correct answer "${c.correctAnswer}" is not in options`);
        if (new Set(c.options).size !== c.options.length) problems.push(`${c.id}: duplicate options`);
        if (c.options.length < 2) problems.push(`${c.id}: fewer than 2 options`);
        if (!c.prompt?.trim()) problems.push(`${c.id}: empty prompt`);
        if (!c.explanation?.trim()) problems.push(`${c.id}: empty explanation`);
      }
      expect(problems).toEqual([]);
    });

    it('flashcards localize into every base language without blank prompts or explanations', () => {
      const problems: string[] = [];
      for (const base of ALL) {
        const g = getGrammarForLanguage(lang, base);
        for (const c of g.flashcards ?? []) {
          if (!c.prompt?.trim()) problems.push(`${base}: ${c.id} blank prompt`);
          if (!(c.explanations?.[base] ?? c.explanation)?.trim()) problems.push(`${base}: ${c.id} blank explanation`);
        }
      }
      expect(problems).toEqual([]);
    });
  });
});

