import { AppData, PhraseItem, GrammarData } from '../types';
import { SupportedLanguageId } from '../data/languages/types';
import { resolveTranslation } from './translationResolver';
import { getGrammarForLanguage } from '../data/languages/grammarData';

export interface SearchResultItem {
  id: string;
  type: 'word' | 'phrase' | 'number' | 'time' | 'grammar-verb' | 'grammar-gender' | 'grammar-concept';
  title: string;
  translation: string;
  pronunciation?: string;
  category?: string;
  article?: string;
  icon?: string;
  section: 'words' | 'phrases' | 'numbers' | 'alphabet';
  grammarTab?: 'flashcards' | 'gender' | 'verbs' | 'descriptions';
  matchReason?: string;
}

export interface SearchResultsGrouped {
  words: SearchResultItem[];
  phrases: SearchResultItem[];
  grammar: SearchResultItem[];
  totalCount: number;
}

/**
 * Normalizes text for accent-insensitive and punctuation-free search comparison
 */
export const normalizeSearchQuery = (text: string): string => {
  return (text || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics / accents
    .replace(/['’"“”«».,!?;:()\-—_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Searches across words, phrases, numbers, time expressions, and grammar concepts
 */
export const searchLanguageConcepts = (
  rawQuery: string,
  appData: AppData,
  currentLanguage: SupportedLanguageId,
  baseLanguage: SupportedLanguageId,
  limitPerCategory: number = 10
): SearchResultsGrouped => {
  const query = normalizeSearchQuery((rawQuery || '').slice(0, 120));
  if (!query || query.length === 0) {
    return { words: [], phrases: [], grammar: [], totalCount: 0 };
  }

  const grammar: GrammarData = appData.grammar || getGrammarForLanguage(currentLanguage);

  const matchedWords: SearchResultItem[] = [];
  const matchedPhrases: SearchResultItem[] = [];
  const matchedGrammar: SearchResultItem[] = [];

  const seenKeys = new Set<string>();

  // Helper to extract primary target text from a phrase item
  const getPrimaryText = (item: PhraseItem): string => {
    return (item.phrase || item.russian || item.target || '').trim();
  };

  // 1. Search Alphabet Words & Letters
  if (appData.alphabet) {
    for (const item of appData.alphabet) {
      const word = (item.word || (item as any).russianWord || '').trim();
      const meaning = (item.meaning || (item as any).englishWord || '').trim();
      const normWord = normalizeSearchQuery(word);
      const normMeaning = normalizeSearchQuery(meaning);
      const normLetter = normalizeSearchQuery(item.letter);

      if (
        (normWord && normWord.includes(query)) ||
        (normMeaning && normMeaning.includes(query)) ||
        normLetter === query
      ) {
        const key = `alpha-${item.letter}-${word || item.letter}`;
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          matchedWords.push({
            id: key,
            type: 'word',
            title: word || `Letter ${item.letter}`,
            translation: meaning ? `${meaning} (Letter ${item.letter})` : `Sound ${item.pronunciation}`,
            pronunciation: item.pronunciation,
            category: 'Alphabet',
            icon: item.icon || '🔤',
            section: 'alphabet',
            matchReason: 'Alphabet vocabulary',
          });
        }
      }
    }
  }

  // 2. Search Common Words
  if (appData.commonWords) {
    for (const item of appData.commonWords) {
      const primary = getPrimaryText(item);
      const translation = resolveTranslation(item, currentLanguage, baseLanguage);
      const normPrimary = normalizeSearchQuery(primary);
      const normTrans = normalizeSearchQuery(translation);
      const normCat = normalizeSearchQuery(item.category || '');

      const isPrimaryMatch = normPrimary.includes(query);
      const isTransMatch = normTrans.includes(query);
      const isCatMatch = normCat.includes(query);

      if (isPrimaryMatch || isTransMatch || isCatMatch) {
        const key = `word-${primary}`;
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          matchedWords.push({
            id: key,
            type: 'word',
            title: primary,
            translation,
            pronunciation: item.pronunciation,
            category: item.category,
            article: item.article,
            icon: item.icon || '📘',
            section: 'words',
            matchReason: isPrimaryMatch ? 'Word match' : isTransMatch ? 'Meaning match' : 'Category match',
          });
        }
      }
    }
  }

  // 2. Search Basic Phrases (Contextual examples)
  if (appData.basicPhrases) {
    for (const item of appData.basicPhrases) {
      const primary = getPrimaryText(item);
      const translation = resolveTranslation(item, currentLanguage, baseLanguage);
      const normPrimary = normalizeSearchQuery(primary);
      const normTrans = normalizeSearchQuery(translation);
      const normCat = normalizeSearchQuery(item.category || '');

      const isPrimaryMatch = normPrimary.includes(query);
      const isTransMatch = normTrans.includes(query);
      const isCatMatch = normCat.includes(query);

      if (isPrimaryMatch || isTransMatch || isCatMatch) {
        const key = `phrase-${primary}`;
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          matchedPhrases.push({
            id: key,
            type: 'phrase',
            title: primary,
            translation,
            pronunciation: item.pronunciation,
            category: item.category,
            icon: item.icon || '💬',
            section: 'phrases',
            matchReason: isPrimaryMatch ? 'In-context phrase' : isTransMatch ? 'Translation match' : 'Topic match',
          });
        }
      }
    }
  }

  // 3. Search Numbers and Time
  const numbersAndTime = [...(appData.numbers || []), ...(appData.time || [])];
  for (const item of numbersAndTime) {
    const primary = getPrimaryText(item);
    const translation = resolveTranslation(item, currentLanguage, baseLanguage);
    const normPrimary = normalizeSearchQuery(primary);
    const normTrans = normalizeSearchQuery(translation);

    if (normPrimary.includes(query) || normTrans.includes(query)) {
      const key = `num-${primary}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        matchedPhrases.push({
          id: key,
          type: item.category === 'Time' || item.category === 'Hour' || item.category === 'Minutes' ? 'time' : 'number',
          title: primary,
          translation,
          pronunciation: item.pronunciation,
          category: item.category || 'Numbers & Time',
          icon: item.icon || '⏱️',
          section: 'numbers',
          matchReason: 'Numbers & Time match',
        });
      }
    }
  }

  // 4. Search Grammar Verbs
  if (grammar && grammar.verbs) {
    for (const verb of grammar.verbs) {
      const normVerb = normalizeSearchQuery(verb.verb);
      const normMeaning = normalizeSearchQuery(verb.meaning);
      const formsText = verb.forms.map(f => `${f.pronoun} ${f.form}`).join(' ');
      const normForms = normalizeSearchQuery(formsText);
      const exSentence = verb.exampleSentence ? `${verb.exampleSentence.target} ${verb.exampleSentence.translation}` : '';
      const normEx = normalizeSearchQuery(exSentence);

      const isVerbMatch = normVerb.includes(query);
      const isMeaningMatch = normMeaning.includes(query);
      const isFormMatch = normForms.includes(query);
      const isExMatch = normEx.includes(query);

      if (isVerbMatch || isMeaningMatch || isFormMatch || isExMatch) {
        const key = `verb-${verb.verb}`;
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          matchedGrammar.push({
            id: key,
            type: 'grammar-verb',
            title: verb.verb,
            translation: verb.meaning,
            category: verb.tense || 'Verb Conjugation',
            icon: '🔄',
            section: 'alphabet',
            grammarTab: 'verbs',
            matchReason: isFormMatch ? `Conjugation form match` : `Verb tense: ${verb.tense}`,
          });
        }
      }
    }
  }

  // 5. Search Grammar Gender Rules
  if (grammar && grammar.genderRules) {
    for (const rule of grammar.genderRules) {
      const normArticle = normalizeSearchQuery(rule.article);
      const normName = normalizeSearchQuery(rule.name);
      const normDesc = normalizeSearchQuery(rule.description);
      const examplesText = rule.examples.map(e => `${e.article} ${e.word} ${e.meaning}`).join(' ');
      const normExamples = normalizeSearchQuery(examplesText);

      if (normArticle === query || normName.includes(query) || normDesc.includes(query) || normExamples.includes(query)) {
        const key = `gender-${rule.article}`;
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          matchedGrammar.push({
            id: key,
            type: 'grammar-gender',
            title: rule.name,
            translation: rule.description,
            article: rule.article,
            category: 'Noun Genders',
            icon: '🏷️',
            section: 'alphabet',
            grammarTab: 'gender',
            matchReason: `Article rule: ${rule.article}`,
          });
        }
      }
    }
  }

  // 6. Search Descriptions & Comparison Tables
  if (grammar && grammar.descriptions) {
    for (const desc of grammar.descriptions) {
      const normTitle = normalizeSearchQuery(desc.title);
      const normExp = normalizeSearchQuery(desc.explanation);
      const examplesText = desc.examples.map(e => `${e.positive} ${e.comparative} ${e.superlative} ${e.meaning}`).join(' ');
      const normExamples = normalizeSearchQuery(examplesText);

      if (normTitle.includes(query) || normExp.includes(query) || normExamples.includes(query)) {
        const key = `desc-${desc.title}`;
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          matchedGrammar.push({
            id: key,
            type: 'grammar-concept',
            title: desc.title,
            translation: desc.explanation,
            category: 'Adjectives & Comparison',
            icon: '📐',
            section: 'alphabet',
            grammarTab: 'descriptions',
            matchReason: 'Adjective description',
          });
        }
      }
    }
  }

  // Sort: Exact matches first, preferring rich dictionary words over alphabet letter examples on ties
  const sortExactFirst = (a: SearchResultItem, b: SearchResultItem) => {
    const aNorm = normalizeSearchQuery(a.title);
    const bNorm = normalizeSearchQuery(b.title);
    if (aNorm === query && bNorm !== query) return -1;
    if (bNorm === query && aNorm !== query) return 1;
    if (aNorm.startsWith(query) && !bNorm.startsWith(query)) return -1;
    if (bNorm.startsWith(query) && !aNorm.startsWith(query)) return 1;
    const titleCmp = a.title.localeCompare(b.title);
    if (titleCmp !== 0) return titleCmp;
    if (a.section === 'words' && b.section !== 'words') return -1;
    if (b.section === 'words' && a.section !== 'words') return 1;
    return 0;
  };

  matchedWords.sort(sortExactFirst);
  matchedPhrases.sort(sortExactFirst);
  matchedGrammar.sort(sortExactFirst);

  const words = matchedWords.slice(0, limitPerCategory);
  const phrases = matchedPhrases.slice(0, limitPerCategory);
  const grammarResults = matchedGrammar.slice(0, limitPerCategory);
  const totalCount = words.length + phrases.length + grammarResults.length;

  return {
    words,
    phrases,
    grammar: grammarResults,
    totalCount,
  };
};
