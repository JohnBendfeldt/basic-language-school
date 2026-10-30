/**
 * Splits a tip into its first sentence and the remainder (split after the first . ! or ? that is
 * followed by whitespace). Returns `rest: null` when the text is a single sentence.
 */
export const splitFirstSentence = (text: string): { first: string; rest: string | null } => {
  const match = text.match(/^([\s\S]+?[.!?。！？])\s+([\s\S]+)$/);
  if (!match) return { first: text, rest: null };
  return { first: match[1], rest: match[2] };
};
