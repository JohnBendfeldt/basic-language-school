/**
 * Smart Fuzzy Matching Engine for Basic Language School quizzes
 * Provides contraction expansion, phrase synonyms, token-level typo tolerance,
 * and encouragement feedback ("Almost right! Typo detected: ...").
 */

export interface FuzzyMatchResult {
  isMatch: boolean;
  isTypo: boolean;
  similarity: number;
  matchedTarget?: string;
  typoWord?: { user: string; target: string };
  feedbackNote?: string;
}

/**
 * Standard Levenshtein distance calculation
 */
export const levenshteinDistance = (a: string, b: string): number => {
  const matrix: number[][] = Array(a.length + 1)
    .fill(null)
    .map(() => Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[a.length][b.length];
};

/**
 * Strip leading/trailing punctuation and common grammatical articles
 */
export const stripArticles = (s: string): string => {
  return s
    .replace(/\b(the|a|an|der|die|das|el|la|los|las|le|la|les|un|une|ein|eine|einen|einem|einer)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Stem word for common English suffixes
 */
export const stemWord = (w: string): string => {
  let s = w.toLowerCase().trim();
  if (s.endsWith('ning')) return s.slice(0, -4) + 'n'; // planning -> plan
  if (s.endsWith('ing') && s.length > 5) return s.slice(0, -3);
  if (s.endsWith('ed') && s.length > 4) return s.slice(0, -2);
  if (s.endsWith('es') && s.length > 4) return s.slice(0, -2);
  if (s.endsWith('s') && s.length > 3 && !s.endsWith('ss')) return s.slice(0, -1);
  return s;
};

const WORD_SYNONYMS: Record<string, string> = {
  schedule: 'plan',
  scheduled: 'plan',
  scheduling: 'plan',
  plans: 'plan',
  planning: 'plan',
  plan: 'plan',
  automobile: 'car',
  vehicle: 'car',
  restroom: 'bathroom',
  toilet: 'bathroom',
  washroom: 'bathroom',
  hi: 'hello',
  hey: 'hello',
  bye: 'goodbye',
  farewell: 'goodbye',
  talk: 'speak',
  talking: 'speak',
  speaks: 'speak',
  speaking: 'speak',
  tasty: 'delicious',
  yummy: 'delicious',
  quick: 'fast',
  speedy: 'fast',
  rapid: 'fast',
  ok: 'good',
  okay: 'good',
  fine: 'good',
  check: 'bill',
  photo: 'picture',
  photograph: 'picture',
  amazing: 'great',
  wonderful: 'great',
  fantastic: 'great',
};

export const canonicalizeWord = (w: string): string => {
  const stem = stemWord(w);
  return WORD_SYNONYMS[stem] || WORD_SYNONYMS[w.toLowerCase()] || stem;
};

/**
 * Normalize an English phrase with comprehensive contractions and synonym canonicalization
 */
export const normalizeEnglishPhrase = (text: string): string => {
  let s = text.toLowerCase().trim();

  // Remove text inside parentheses (e.g. 'Hello (formal)' -> 'Hello')
  s = s.replace(/\s*\([^)]*\)\s*/g, ' ');

  // Comprehensive Contraction Map
  const contractionMap: [RegExp, string][] = [
    [/\b(let's|lets)\b/gi, 'let us'],
    [/\b(where's|wheres)\b/gi, 'where is'],
    [/\b(what's|whats)\b/gi, 'what is'],
    [/\b(who's|whos)\b/gi, 'who is'],
    [/\b(how's|hows)\b/gi, 'how is'],
    [/\b(that's|thats)\b/gi, 'that is'],
    [/\b(it's|its)\b/gi, 'it is'],
    [/\b(there's|theres)\b/gi, 'there is'],
    [/\b(here's|heres)\b/gi, 'here is'],
    [/\b(i'm|im)\b/gi, 'i am'],
    [/\b(you're|youre)\b/gi, 'you are'],
    [/\b(we're|were)\b/gi, 'we are'],
    [/\b(they're|theyre)\b/gi, 'they are'],
    [/\b(he's|hes)\b/gi, 'he is'],
    [/\b(she's|shes)\b/gi, 'she is'],
    [/\b(don't|dont)\b/gi, 'do not'],
    [/\b(doesn't|doesnt)\b/gi, 'does not'],
    [/\b(didn't|didnt)\b/gi, 'did not'],
    [/\b(can't|cant)\b/gi, 'cannot'],
    [/\b(won't|wont)\b/gi, 'will not'],
    [/\b(i've|ive)\b/gi, 'i have'],
    [/\b(you've|youve)\b/gi, 'you have'],
    [/\b(we've|weve)\b/gi, 'we have'],
    [/\b(they've|theyve)\b/gi, 'they have'],
    [/\b(i'll|ill)\b/gi, 'i will'],
    [/\b(you'll|youll)\b/gi, 'you will'],
    [/\b(we'll|well)\b/gi, 'we will'],
    [/\b(they'll|theyll)\b/gi, 'they will'],
    [/\b(i'd|id)\b/gi, 'i would'],
    [/\b(we'd|wed)\b/gi, 'we would'],
    [/\bwanna\b/gi, 'want to'],
    [/\bgonna\b/gi, 'going to'],
  ];

  contractionMap.forEach(([pattern, replacement]) => {
    s = s.replace(pattern, replacement);
  });

  // Strip punctuation
  s = s.replace(/[.,/#!$%^&*;:{}=\-_`~()?'"]/g, ' ').replace(/\s+/g, ' ').trim();

  // Normalize conversational synonyms & equivalent phrasing
  const synonymMap: [RegExp, string][] = [
    [/\b(schedule a meeting|arrange a meeting)\b/gi, 'plan a meeting'],
    [/\b(shall we plan a meeting|can we plan a meeting)\b/gi, 'let us plan a meeting'],
    [/\b(restroom|toilet|washroom|water closet|wc|lavatory)\b/gi, 'bathroom'],
    [/\b(hi|hey|greetings)\b/gi, 'hello'],
    [/\b(bye|bye bye|see you|farewell)\b/gi, 'goodbye'],
    [/\b(thanks|thank u|many thanks)\b/gi, 'thank you'],
    [/\b(welcome|no problem|not at all|my pleasure|dont mention it)\b/gi, 'you are welcome'],
    [/\b(sorry|pardon|pardon me|forgive me)\b/gi, 'excuse me'],
    [/\b(speak slower|talk slower|speak slowly|talk more slowly)\b/gi, 'speak more slowly'],
    [/\b(repeat please|say it again|say that again|can you repeat)\b/gi, 'please repeat'],
    [/\b(how are you doing|how are things|how is it going)\b/gi, 'how are you'],
    [/\b(how much is it|how much is this|whats the price|what is the price)\b/gi, 'how much does it cost'],
    [/\b(im hungry|i am hungry|i want food|i would like to eat)\b/gi, 'i want to eat'],
    [/\b(im thirsty|i am thirsty|i want water|i would like to drink)\b/gi, 'i want to drink'],
    [/\b(i do not understand|i do not get it|i dont get it)\b/gi, 'i dont understand'],
    [/\b(i am called|they call me)\b/gi, 'my name is'],
    [/\b(yeah|yep|yup)\b/gi, 'yes'],
    [/\b(nope|nah)\b/gi, 'no'],
  ];

  synonymMap.forEach(([pattern, replacement]) => {
    s = s.replace(pattern, replacement);
  });

  return s.replace(/\s+/g, ' ').trim();
};

/**
 * Tokenize a phrase into lowercase words, skipping whitespace
 */
export const tokenize = (text: string): string[] => {
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?'"]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
};

/**
 * Evaluate smart fuzzy match between user input and target answers.
 * Supports token-level typo tolerance (e.g. 'wer' -> 'we'), contraction expansion,
 * and conversational synonyms.
 */
export const evaluateSmartAnswer = (
  userAnswer: string,
  rawTargets: string[]
): FuzzyMatchResult => {
  const cleanUser = userAnswer.trim();
  if (!cleanUser) {
    return { isMatch: false, isTypo: false, similarity: 0 };
  }

  const userNorm = normalizeEnglishPhrase(cleanUser);
  const userNoArticles = stripArticles(userNorm);
  const userTokens = tokenize(userNoArticles);
  const userCanonTokens = userTokens.map(canonicalizeWord);

  let bestResult: FuzzyMatchResult = {
    isMatch: false,
    isTypo: false,
    similarity: 0,
  };

  for (const target of rawTargets) {
    const cleanTarget = target.trim();
    if (!cleanTarget) continue;

    const targetNorm = normalizeEnglishPhrase(cleanTarget);
    const targetNoArticles = stripArticles(targetNorm);

    // 1. Direct exact or normalized match
    if (cleanUser.toLowerCase() === cleanTarget.toLowerCase() || userNorm === targetNorm) {
      return {
        isMatch: true,
        isTypo: false,
        similarity: 1.0,
        matchedTarget: cleanTarget,
      };
    }

    // 2. Article-stripped exact match
    if (userNoArticles && userNoArticles === targetNoArticles) {
      return {
        isMatch: true,
        isTypo: false,
        similarity: 0.98,
        matchedTarget: cleanTarget,
      };
    }

    // 3. Whole-phrase Levenshtein tolerance
    const fullDistance = levenshteinDistance(userNorm, targetNorm);
    const maxAllowedDist = targetNorm.length >= 8 ? 2 : (targetNorm.length >= 4 ? 1 : 0);
    if (fullDistance <= maxAllowedDist) {
      // Find the specific word with the typo
      const targetTokens = tokenize(targetNorm);
      const userTokens = tokenize(userNorm);
      let foundTypo: { user: string; target: string } | undefined;

      if (fullDistance > 0) {
        for (const u of userTokens) {
          if (!targetTokens.includes(u)) {
            for (const t of targetTokens) {
              if (!userTokens.includes(t) && levenshteinDistance(u, t) <= 2) {
                foundTypo = { user: u, target: t };
                break;
              }
            }
          }
          if (foundTypo) break;
        }
      }

      return {
        isMatch: true,
        isTypo: fullDistance > 0,
        similarity: 1 - fullDistance / Math.max(userNorm.length, targetNorm.length),
        matchedTarget: cleanTarget,
        typoWord: foundTypo,
        feedbackNote: fullDistance > 0 
          ? (foundTypo ? `Typo detected: "${foundTypo.user}" ➔ "${foundTypo.target}"` : `Pay attention to spelling: ${cleanTarget}`) 
          : undefined,
      };
    }

    // 4. Token-by-token fuzzy matching
    const targetTokens = tokenize(targetNoArticles);
    const targetCanonTokens = targetTokens.map(canonicalizeWord);

    if (targetTokens.length > 0 && userTokens.length > 0) {
      let matchedCount = 0;
      let typoDetected = false;
      let lastTypo: { user: string; target: string } | undefined;

      targetTokens.forEach((tToken, idx) => {
        const tCanon = targetCanonTokens[idx];

        // Direct token or canonical synonym match
        if (userTokens.includes(tToken) || userCanonTokens.includes(tCanon)) {
          matchedCount += 1;
          return;
        }

        // Token typo check
        const maxTokenDist = tToken.length >= 6 ? 2 : (tToken.length >= 2 ? 1 : 0);
        let bestTokenMatchDist = 999;
        let matchedUserToken = '';

        for (const uToken of userTokens) {
          const d = levenshteinDistance(uToken, tToken);
          if (d < bestTokenMatchDist) {
            bestTokenMatchDist = d;
            matchedUserToken = uToken;
          }
        }

        if (bestTokenMatchDist <= maxTokenDist) {
          matchedCount += 1;
          typoDetected = true;
          lastTypo = { user: matchedUserToken, target: tToken };
        }
      });

      const tokenSimilarity = matchedCount / Math.max(targetTokens.length, userTokens.length);

      // Match passes if at least 70% of meaningful tokens match, or all tokens match with minor typos
      if (tokenSimilarity >= 0.7 || (matchedCount === targetTokens.length && matchedCount >= 2)) {
        const candidate: FuzzyMatchResult = {
          isMatch: true,
          isTypo: typoDetected,
          similarity: tokenSimilarity,
          matchedTarget: cleanTarget,
          typoWord: lastTypo,
          feedbackNote: typoDetected && lastTypo 
            ? `Typo detected: "${lastTypo.user}" ➔ "${lastTypo.target}"` 
            : undefined,
        };
        if (candidate.similarity > bestResult.similarity || (!bestResult.isMatch && candidate.isMatch) || (!bestResult.typoWord && candidate.typoWord)) {
          bestResult = candidate;
        }
      }

      // Also check content words overlap (ignoring modal/auxiliary verbs like are, we, let, us)
      const isStopWord = (w: string) => ['are', 'we', 'let', 'us', 'is', 'the', 'a', 'an', 'shall', 'do', 'i', 'you'].includes(w);
      const targetContent = targetCanonTokens.filter(w => !isStopWord(w));
      const userContent = userCanonTokens.filter(w => !isStopWord(w));

      if (targetContent.length > 0 && userContent.length > 0) {
        const contentOverlap = targetContent.filter(w => userContent.includes(w)).length;
        if (contentOverlap === targetContent.length && targetContent.length >= 2) {
          const candidate: FuzzyMatchResult = {
            isMatch: true,
            isTypo: typoDetected,
            similarity: 0.85,
            matchedTarget: cleanTarget,
            typoWord: lastTypo,
            feedbackNote: typoDetected && lastTypo
              ? `Typo detected: "${lastTypo.user}" ➔ "${lastTypo.target}"`
              : undefined,
          };
          if (!bestResult.isMatch) {
            bestResult = candidate;
          }
        }
      }

      if (tokenSimilarity > bestResult.similarity && !bestResult.isMatch) {
        bestResult = {
          isMatch: false,
          isTypo: typoDetected,
          similarity: tokenSimilarity,
          matchedTarget: cleanTarget,
        };
      }
    }
  }

  return bestResult;
};
