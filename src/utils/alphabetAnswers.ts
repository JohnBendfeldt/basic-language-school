/**
 * Comprehensive alphabet answer validator and expansion utility.
 * Resolves keyboard input, phonetic names, and sound variations across
 * Spanish, French, English, and Russian.
 */

// Explicit Spanish letter names & phonetic sound variations
const SPANISH_LETTER_ANSWERS: Record<string, string[]> = {
  A: ['a'],
  B: ['be', 'b'],
  C: ['ce', 'se', 'k', 'c', 'se or k', 'ce or k', '/se/ or /k/'],
  D: ['de', 'd'],
  E: ['e'],
  F: ['efe', 'f'],
  G: ['ge', 'xe', 'he', 'g', 'xe or g', '/xe/ or /g/'],
  H: ['hache', 'ache', 'atʃe', 'atse', 'h', 'silent', 'muda', 'silent /atʃe/'],
  I: ['i'],
  J: ['jota', 'xota', 'hota', 'j', '/xota/'],
  K: ['ka', 'k'],
  L: ['ele', 'l'],
  M: ['eme', 'm'],
  N: ['ene', 'n'],
  Ñ: ['eñe', 'enye', 'ene', 'ñ', 'n', '/eɲe/'],
  O: ['o'],
  P: ['pe', 'p'],
  Q: ['cu', 'ku', 'q', '/ku/'],
  R: ['ere', 'erre', 'r', '/eɾe/'],
  S: ['ese', 's'],
  T: ['te', 't'],
  U: ['u'],
  V: ['uve', 've', 'ube', 'v', 'b'],
  W: ['doble u', 'doble ve', 'uve doble', 'w'],
  X: ['equis', 'ekis', 'x'],
  Y: ['i griega', 'ye', 'y'],
  Z: ['zeta', 'ceta', 'se', 'theta', 'z', '/theta/ or /se/']
};

// Explicit French letter names & phonetic sound variations
const FRENCH_LETTER_ANSWERS: Record<string, string[]> = {
  A: ['a', 'ɑ'],
  B: ['be', 'b'],
  C: ['ce', 'se', 'c'],
  D: ['de', 'd'],
  E: ['e', 'eu', 'ə'],
  F: ['ef', 'effe', 'f', 'ɛf'],
  G: ['ge', 'je', 'g', 'ʒe'],
  H: ['hache', 'ache', 'ash', 'h', 'muet', 'silent', 'aʃ', '/aʃ/ (muet)'],
  I: ['i'],
  J: ['ji', 'j', 'ʒi'],
  K: ['ka', 'k'],
  L: ['el', 'elle', 'l', 'ɛl'],
  M: ['em', 'emme', 'm', 'ɛm'],
  N: ['en', 'enne', 'n', 'ɛn'],
  O: ['o'],
  P: ['pe', 'p'],
  Q: ['ku', 'qu', 'cu', 'ky', 'q'],
  R: ['er', 'erre', 'air', 'r', 'ɛʁ'],
  S: ['es', 'esse', 's', 'ɛs'],
  T: ['te', 't'],
  U: ['u', 'y'],
  V: ['ve', 'v'],
  W: ['double ve', 'double v', 'dubləve', 'w'],
  X: ['iks', 'ex', 'x'],
  Y: ['i grec', 'igrec', 'y', 'iɡʁɛk'],
  Z: ['zed', 'zɛd', 'z']
};

// Explicit English letter names & phonics sounds
const ENGLISH_LETTER_ANSWERS: Record<string, string[]> = {
  A: ['a', 'ei', 'ay', 'ae', 'short a'],
  B: ['b', 'bee', 'bi'],
  C: ['c', 'see', 'si', 'k', 'cee'],
  D: ['d', 'dee', 'di'],
  E: ['e', 'ee', 'short e'],
  F: ['f', 'ef'],
  G: ['g', 'gee', 'ji'],
  H: ['h', 'aitch', 'aych', 'he'],
  I: ['i', 'eye', 'ai'],
  J: ['j', 'jay'],
  K: ['k', 'kay'],
  L: ['l', 'el'],
  M: ['m', 'em'],
  N: ['n', 'en'],
  O: ['o', 'oh'],
  P: ['p', 'pee', 'pi'],
  Q: ['q', 'cue', 'kyu'],
  R: ['r', 'ar', 'are'],
  S: ['s', 'es', 'ess'],
  T: ['t', 'tee', 'ti'],
  U: ['u', 'you', 'yu'],
  V: ['v', 'vee', 'vi'],
  W: ['w', 'double u', 'double you'],
  X: ['x', 'ex'],
  Y: ['y', 'why', 'wai'],
  Z: ['z', 'zee', 'zed']
};

// Russian alphabet sounds & standard transliterations
const RUSSIAN_LETTER_ANSWERS: Record<string, string[]> = {
  А: ['a'],
  Б: ['b', 'be'],
  В: ['v', 've'],
  Г: ['g', 'ge'],
  Д: ['d', 'de'],
  Е: ['ye', 'e'],
  Ё: ['yo', 'jo', 'io'],
  Ж: ['zh', 'zhe'],
  З: ['z', 'ze'],
  И: ['i', 'ee'],
  Й: ['y', 'short i', 'j'],
  К: ['k', 'ka'],
  Л: ['l', 'el'],
  М: ['m', 'em'],
  Н: ['n', 'en'],
  О: ['o'],
  П: ['p', 'pe'],
  Р: ['r', 'er'],
  С: ['s', 'es'],
  Т: ['t', 'te'],
  У: ['u', 'oo'],
  Ф: ['f', 'ef'],
  Х: ['kh', 'ha', 'h'],
  Ц: ['ts', 'tse'],
  Ч: ['ch', 'che'],
  Ш: ['sh', 'sha'],
  Щ: ['shch', 'shcha'],
  Ъ: ['hard sign', 'hard'],
  Ы: ['y', 'ui'],
  Ь: ['soft sign', 'soft'],
  Э: ['e', 'eh'],
  Ю: ['yu', 'iu'],
  Я: ['ya', 'ia']
};

/**
 * Normalizes an IPA phonetic string into common Latin keyboard approximations.
 */
function normalizeIpaToAscii(ipa: string): string[] {
  const variants: string[] = [];
  let s = ipa.toLowerCase();

  // Strip slash marks and brackets
  s = s.replace(/[/\[\]]/g, '').trim();
  if (s) variants.push(s);

  // Common IPA character replacements
  const ascii = s
    .replace(/ɑ/g, 'a')
    .replace(/æ/g, 'ae')
    .replace(/eɪ/g, 'ei')
    .replace(/ɛ/g, 'e')
    .replace(/ə/g, 'e')
    .replace(/ɪ/g, 'i')
    .replace(/iː/g, 'ee')
    .replace(/biː/g, 'b')
    .replace(/diː/g, 'd')
    .replace(/siː/g, 'c')
    .replace(/ʃ/g, 'sh')
    .replace(/ʒ/g, 'j')
    .replace(/ʁ|ɾ/g, 'r')
    .replace(/ɲ/g, 'ny')
    .replace(/θ/g, 'th')
    .replace(/dubləve/g, 'double ve')
    .replace(/iɡʁɛk/g, 'i grec')
    .replace(/zɛd/g, 'zed');

  if (ascii && !variants.includes(ascii)) {
    variants.push(ascii);
  }

  return variants;
}

/**
 * Returns an exhaustive list of accepted user answers for any alphabet question.
 *
 * @param character The letter symbol (e.g. 'C', 'H', 'Ñ', 'Б')
 * @param pronunciation The raw pronunciation string from the dataset (e.g. '/se/ or /k/', 'silent /atʃe/')
 * @param language The language code ('es', 'fr', 'en', 'ru')
 * @returns Array of lowercase valid answer strings
 */
export function getAlphabetAcceptedAnswers(
  character: string,
  pronunciation: string = '',
  language: string = 'ru'
): string[] {
  const accepted = new Set<string>();
  const charUpper = character.toUpperCase().trim();
  const charLower = character.toLowerCase().trim();

  // 1. The letter itself is always acceptable (e.g. user typed 'c' for prompt 'C')
  if (charLower) {
    accepted.add(charLower);
  }

  // 2. Language-specific dictionary lookup
  let dict: Record<string, string[]> | undefined;
  if (language === 'es') dict = SPANISH_LETTER_ANSWERS;
  else if (language === 'fr') dict = FRENCH_LETTER_ANSWERS;
  else if (language === 'en') dict = ENGLISH_LETTER_ANSWERS;
  else if (language === 'ru') dict = RUSSIAN_LETTER_ANSWERS;

  if (dict && dict[charUpper]) {
    dict[charUpper].forEach(ans => accepted.add(ans.toLowerCase().trim()));
  }

  // Also check Spanish / French / English if language not matched
  if (SPANISH_LETTER_ANSWERS[charUpper]) {
    SPANISH_LETTER_ANSWERS[charUpper].forEach(ans => accepted.add(ans.toLowerCase().trim()));
  }
  if (FRENCH_LETTER_ANSWERS[charUpper]) {
    FRENCH_LETTER_ANSWERS[charUpper].forEach(ans => accepted.add(ans.toLowerCase().trim()));
  }
  if (ENGLISH_LETTER_ANSWERS[charUpper]) {
    ENGLISH_LETTER_ANSWERS[charUpper].forEach(ans => accepted.add(ans.toLowerCase().trim()));
  }

  // 3. Dynamic parsing from the dataset pronunciation string
  if (pronunciation) {
    const rawLower = pronunciation.toLowerCase();
    accepted.add(rawLower);

    // Strip slashes
    const noSlashes = rawLower.replace(/[/]/g, ' ').replace(/\s+/g, ' ').trim();
    if (noSlashes) accepted.add(noSlashes);

    // Strip parenthesized text (e.g. 'silent /atʃe/' or '/aʃ/ (muet)')
    const noParens = noSlashes.replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
    if (noParens) accepted.add(noParens);

    // Tokenize by ' or ', ' and ', ' & ', ',', '/'
    const tokens = rawLower
      .replace(/[()[\]]/g, ' ')
      .split(/\s+(?:or|and|&)\s+|\/|,/g)
      .map(t => t.trim())
      .filter(Boolean);

    for (const token of tokens) {
      // Clean token of noise words
      const cleaned = token
        .replace(/^(?:silent|muet|sound|like\s+english\s+h|as\s+in|trilled|guttural)\s+/gi, '')
        .trim();
      if (cleaned) {
        accepted.add(cleaned);
        // Expand IPA approximations
        normalizeIpaToAscii(cleaned).forEach(v => accepted.add(v));
      }
    }

    // Special keywords: if 'silent' or 'muet' was in pronunciation, accept them
    if (rawLower.includes('silent')) {
      accepted.add('silent');
    }
    if (rawLower.includes('muet')) {
      accepted.add('muet');
      accepted.add('silent');
    }
  }

  return Array.from(accepted).filter(Boolean);
}
