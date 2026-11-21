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
  H: ['h', 'aitch', 'haitch', 'aych', 'he'],
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

// Explicit German letter names & phonetic sound variations
const GERMAN_LETTER_ANSWERS: Record<string, string[]> = {
  A: ['a', 'ah'],
  B: ['be', 'b'],
  C: ['tse', 'ce', 'c'],
  D: ['de', 'd'],
  E: ['e', 'eh'],
  F: ['ef', 'f'],
  G: ['ge', 'g'],
  H: ['ha', 'hah', 'h'],
  I: ['i', 'ee'],
  J: ['jot', 'yot', 'j'],
  K: ['ka', 'kah', 'k'],
  L: ['el', 'l'],
  M: ['em', 'm'],
  N: ['en', 'n'],
  O: ['o', 'oh'],
  P: ['pe', 'p'],
  Q: ['ku', 'qu', 'q'],
  R: ['er', 'r'],
  S: ['es', 's'],
  T: ['te', 't'],
  U: ['u', 'oo'],
  V: ['fau', 'vau', 'f', 'v'],
  W: ['ve', 'we', 'w', 'v'],
  X: ['iks', 'ix', 'x'],
  Y: ['ypsilon', 'upsilon', 'y'],
  Z: ['tset', 'zet', 'ts', 'z'],
  Ä: ['ae', 'a umlaut', 'a-umlaut', 'ä', 'e'],
  Ö: ['oe', 'o umlaut', 'o-umlaut', 'ö'],
  Ü: ['ue', 'u umlaut', 'u-umlaut', 'ü'],
  ß: ['eszett', 'esszett', 'scharfes s', 'ss', 'ß']
};

// Explicit Portuguese letter names & phonetic sound variations
const PORTUGUESE_LETTER_ANSWERS: Record<string, string[]> = {
  A: ['a'],
  B: ['be', 'bê', 'b'],
  C: ['ce', 'cê', 'se', 'k', 'c'],
  Ç: ['cedilha', 'ce cedilha', 's', 'ç', 'c'],
  D: ['de', 'dê', 'dji', 'd'],
  E: ['e', 'eh', 'ê'],
  F: ['efe', 'efi', 'f'],
  G: ['ge', 'gê', 'zhe', 'je', 'g'],
  H: ['aga', 'agá', 'h', 'muda', 'mudo', 'silent'],
  I: ['i'],
  J: ['jota', 'zhota', 'j'],
  K: ['ka', 'cá', 'k'],
  L: ['ele', 'eli', 'l'],
  M: ['eme', 'emi', 'm'],
  N: ['ene', 'eni', 'n'],
  O: ['o', 'oh', 'ô'],
  P: ['pe', 'pê', 'p'],
  Q: ['que', 'quê', 'ke', 'q'],
  R: ['erre', 'ehi', 'r'],
  S: ['esse', 'esi', 's'],
  T: ['te', 'tê', 'tchi', 't'],
  U: ['u'],
  V: ['ve', 'vê', 'v'],
  W: ['dabliu', 'dáblio', 'duplo ve', 'w'],
  X: ['xis', 'shis', 'sh', 'x'],
  Y: ['ipsilon', 'ípsilon', 'ipsilõ', 'y'],
  Z: ['ze', 'zê', 'z']
};

// Explicit Indonesian letter names & phonetic sound variations
const INDONESIAN_LETTER_ANSWERS: Record<string, string[]> = {
  A: ['a'],
  B: ['be', 'b'],
  C: ['ce', 'che', 'tche', 'c'],
  D: ['de', 'd'],
  E: ['e', 'eh'],
  F: ['ef', 'f'],
  G: ['ge', 'g'],
  H: ['ha', 'h'],
  I: ['i', 'ee'],
  J: ['je', 'dje', 'j'],
  K: ['ka', 'k'],
  L: ['el', 'l'],
  M: ['em', 'm'],
  N: ['en', 'n'],
  O: ['o'],
  P: ['pe', 'p'],
  Q: ['ki', 'qi', 'q'],
  R: ['er', 'r'],
  S: ['es', 's'],
  T: ['te', 't'],
  U: ['u', 'oo'],
  V: ['fe', 've', 'v'],
  W: ['we', 'w'],
  X: ['eks', 'ex', 'x'],
  Y: ['ye', 'y'],
  Z: ['zet', 'zed', 'z']
};

// Explicit Turkish letter names & phonetic sound variations
const TURKISH_LETTER_ANSWERS: Record<string, string[]> = {
  A: ['a'],
  B: ['be', 'b'],
  C: ['ce', 'je', 'dje', 'c'],
  Ç: ['çe', 'che', 'tche', 'ç', 'c'],
  D: ['de', 'd'],
  E: ['e'],
  F: ['fe', 'f'],
  G: ['ge', 'g'],
  Ğ: ['yumuşak ge', 'yumusak ge', 'soft g', 'ğ', 'g'],
  H: ['he', 'h'],
  I: ['ı', 'dotless i', 'uh', 'i'],
  İ: ['i', 'dotted i', 'ee'],
  J: ['je', 'zhe', 'j'],
  K: ['ke', 'ka', 'k'],
  L: ['le', 'l'],
  M: ['me', 'm'],
  N: ['ne', 'n'],
  O: ['o'],
  Ö: ['ö', 'oe', 'eu'],
  P: ['pe', 'p'],
  R: ['re', 'r'],
  S: ['se', 's'],
  Ş: ['şe', 'she', 'sh', 'ş', 's'],
  T: ['te', 't'],
  U: ['u', 'oo'],
  Ü: ['ü', 'ue'],
  V: ['ve', 'v'],
  Y: ['ye', 'y'],
  Z: ['ze', 'z']
};

// Explicit Mandarin Pinyin initials & finals
const CHINESE_LETTER_ANSWERS: Record<string, string[]> = {
  b: ['b', 'bo', 'bō', 'p'],
  p: ['p', 'po', 'pō'],
  m: ['m', 'mo', 'mō'],
  f: ['f', 'fo', 'fō'],
  d: ['d', 'de', 'dē', 't'],
  t: ['t', 'te', 'tē'],
  n: ['n', 'ne', 'nē'],
  l: ['l', 'le', 'lē'],
  g: ['g', 'ge', 'gē', 'k'],
  k: ['k', 'ke', 'kē'],
  h: ['h', 'he', 'hē', 'kh'],
  j: ['j', 'ji', 'jī'],
  q: ['q', 'qi', 'qī', 'ch'],
  x: ['x', 'xi', 'xī', 'sh'],
  zh: ['zh', 'zhi', 'zhī'],
  ch: ['ch', 'chi', 'chī'],
  sh: ['sh', 'shi', 'shī'],
  r: ['r', 'ri', 'rī'],
  z: ['z', 'zi', 'zī', 'ts', 'dz'],
  c: ['c', 'ci', 'cī', 'ts'],
  s: ['s', 'si', 'sī'],
  y: ['y', 'yi', 'yī'],
  w: ['w', 'wu', 'wū'],
  a: ['a', 'ā', 'ah'],
  o: ['o', 'ō', 'oh'],
  e: ['e', 'ē', 'uh'],
  i: ['i', 'yi', 'yī', 'ee'],
  u: ['u', 'wu', 'wū', 'oo'],
  ü: ['ü', 'v', 'yu', 'yū', 'ǖ', 'u']
};

// Explicit Japanese Hiragana romanizations (Hepburn & Kunrei variants)
const JAPANESE_LETTER_ANSWERS: Record<string, string[]> = {
  'あ': ['a'], 'い': ['i'], 'う': ['u'], 'え': ['e'], 'お': ['o'],
  'か': ['ka'], 'き': ['ki'], 'く': ['ku'], 'け': ['ke'], 'こ': ['ko'],
  'さ': ['sa'], 'し': ['shi', 'si'], 'す': ['su'], 'せ': ['se'], 'そ': ['so'],
  'た': ['ta'], 'ち': ['chi', 'ti'], 'つ': ['tsu', 'tu'], 'て': ['te'], 'と': ['to'],
  'な': ['na'], 'に': ['ni'], 'ぬ': ['nu'], 'ね': ['ne'], 'の': ['no'],
  'は': ['ha', 'wa'], 'ひ': ['hi'], 'ふ': ['fu', 'hu'], 'へ': ['he', 'e'], 'ほ': ['ho'],
  'ま': ['ma'], 'み': ['mi'], 'む': ['mu'], 'め': ['me'], 'も': ['mo'],
  'や': ['ya'], 'ゆ': ['yu'], 'よ': ['yo'],
  'ら': ['ra', 'la'], 'り': ['ri', 'li'], 'る': ['ru', 'lu'], 'れ': ['re', 'le'], 'ろ': ['ro', 'lo'],
  'わ': ['wa'], 'を': ['o', 'wo'], 'ん': ['n', 'nn', 'm']
};

// Explicit Korean Hangul jamo names & Revised Romanization
const KOREAN_LETTER_ANSWERS: Record<string, string[]> = {
  'ㄱ': ['g', 'k', 'giyeok', 'kiyok'],
  'ㄴ': ['n', 'nieun'],
  'ㄷ': ['d', 't', 'digeut', 'tigeut'],
  'ㄹ': ['r', 'l', 'rieul'],
  'ㅁ': ['m', 'mieum'],
  'ㅂ': ['b', 'p', 'bieup'],
  'ㅅ': ['s', 'sh', 'siot'],
  'ㅇ': ['ng', 'ieung', 'silent'],
  'ㅈ': ['j', 'ch', 'jieut'],
  'ㅊ': ['ch', 'chieut'],
  'ㅋ': ['k', 'kh', 'kieuk'],
  'ㅌ': ['t', 'th', 'tieut'],
  'ㅍ': ['p', 'ph', 'pieup'],
  'ㅎ': ['h', 'hieut'],
  'ㅏ': ['a', 'ah'],
  'ㅑ': ['ya'],
  'ㅓ': ['eo', 'uh', 'o'],
  'ㅕ': ['yeo', 'yuh'],
  'ㅗ': ['o', 'oh'],
  'ㅛ': ['yo'],
  'ㅜ': ['u', 'oo'],
  'ㅠ': ['yu', 'yoo'],
  'ㅡ': ['eu', 'uh'],
  'ㅣ': ['i', 'ee'],
  'ㄲ': ['kk', 'gg', 'ssang-giyeok', 'ssang giyeok', 'ssanggiyeok'],
  'ㄸ': ['tt', 'dd', 'ssang-digeut', 'ssang digeut', 'ssangdigeut'],
  'ㅃ': ['pp', 'bb', 'ssang-bieup', 'ssang bieup', 'ssangbieup'],
  'ㅆ': ['ss', 'ssang-siot', 'ssang siot', 'ssangsiot'],
  'ㅉ': ['jj', 'ssang-jieut', 'ssang jieut', 'ssangjieut']
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

// Bengali alphabet sounds & common phonetic Latin spellings
export const BENGALI_LETTER_ANSWERS: Record<string, string[]> = {
  'অ': ['o', 'a', 'aw', 'shor o', 'shor-o', 'shoro'],
  'আ': ['aa', 'a', 'shor aa', 'shor-aa', 'shoraa'],
  'ই': ['i', 'ee', 'e', 'hrasho i', 'rhasho i'],
  'ঈ': ['ee', 'i', 'ii', 'dirgho i', 'dhirgho i'],
  'উ': ['u', 'oo', 'hrasho u', 'rhasho u'],
  'ঊ': ['oo', 'u', 'uu', 'dirgho u', 'dhirgho u'],
  'ঋ': ['ri', 'ree', 'rri', 'hri'],
  'এ': ['e', 'ay', 'ae'],
  'ঐ': ['oi', 'oj', 'oy'],
  'ও': ['o', 'oh'],
  'ঔ': ['ou', 'ow', 'au'],
  'ক': ['ko', 'k', 'ka'],
  'খ': ['kho', 'kh', 'kha', 'k'],
  'গ': ['go', 'g', 'ga'],
  'ঘ': ['gho', 'gh', 'gha', 'g'],
  'ঙ': ['ngo', 'ng', 'nga', 'ung', 'umo'],
  'চ': ['cho', 'ch', 'cha', 'c'],
  'ছ': ['chho', 'chh', 'chha', 'ch', 'cho'],
  'জ': ['jo', 'j', 'ja', 'z', 'zo'],
  'ঝ': ['jho', 'jh', 'jha', 'j'],
  'ঞ': ['nio', 'nyo', 'ni', 'io', 'eeyon', 'n'],
  'ট': ['to', 't', 'ta', 'ṭ', 'ṭo'],
  'ঠ': ['tho', 'th', 't', 'ṭh', 'ṭho', 'tha', 'to', 'ta'],
  'ড': ['do', 'd', 'da', 'ḍ', 'ḍo'],
  'ঢ': ['dho', 'dh', 'dha', 'd', 'ḍh', 'ḍho', 'do', 'da'],
  'ণ': ['no', 'n', 'na', 'moddho no', 'murdhonno no', 'ṇ'],
  'ত': ['to', 't', 'ta'],
  'থ': ['tho', 'th', 't', 'tha', 'to', 'ta'],
  'দ': ['do', 'd', 'da'],
  'ধ': ['dho', 'dh', 'dha', 'd', 'do', 'da'],
  'ন': ['no', 'n', 'na', 'donto no'],
  'প': ['po', 'p', 'pa'],
  'ফ': ['pho', 'fo', 'ph', 'f', 'pha', 'fa', 'p', 'po', 'ha'],
  'ব': ['bo', 'b', 'ba'],
  'ভ': ['bho', 'bh', 'bha', 'v', 'vo', 'va', 'b'],
  'ম': ['mo', 'm', 'ma'],
  'য': ['jo', 'j', 'ja', 'y', 'yo', 'ya', 'ontostho jo'],
  'র': ['ro', 'r', 'ra'],
  'ল': ['lo', 'l', 'la'],
  'শ': ['sho', 'sh', 'sha', 'talobbo sho', 's'],
  'ষ': ['sho', 'sh', 'sha', 'murdhonno sho', 's', 'ṣ'],
  'স': ['sho', 'so', 'sh', 's', 'sha', 'sa', 'donto sho'],
  'হ': ['ho', 'h', 'ha'],
  'ড়': ['rho', 'rh', 'r', 'ro', 'ra', 'd-e-bindu ro', 'd e bindu ro'],
  'ঢ়': ['rho', 'rh', 'r', 'ro', 'ra', 'dh-e-bindu ro', 'dh e bindu ro'],
  'য়': ['y', 'yo', 'ya', 'e', 'ontostho e', 'ontostho y'],
  'ৎ': ['khanda ta', 'khandata', 'khanda tho', 'khandatho', 'khanda to', 'khandato', 'quan do tho', 'quandotho', 'quan do ta', 't', 'ta', 'th', 'tho', 'to'],
  'ং': ['anusvara', 'anushbar', 'anushbor', 'anusvar', 'ng', 'ong'],
  'ঃ': ['visarga', 'bishorgo', 'bisarga', 'h', 'oh'],
  'ঁ': ['chandrabindu', 'chondrobindu', 'candrabindu', 'nasal', 'n']
};

// Hindi alphabet sounds & common phonetic Latin spellings
export const HINDI_LETTER_ANSWERS: Record<string, string[]> = {
  'अ': ['a', 'short a'],
  'आ': ['aa', 'a'],
  'इ': ['i', 'ee', 'chhoti i'],
  'ई': ['ee', 'i', 'ii', 'badi ee'],
  'उ': ['u', 'oo', 'chhota u'],
  'ऊ': ['oo', 'u', 'uu', 'bada oo'],
  'ऋ': ['ri', 'ree', 'rri'],
  'ए': ['e', 'ay'],
  'ऐ': ['ai', 'ae'],
  'ओ': ['o', 'oh'],
  'औ': ['au', 'ou', 'ow'],
  'अं': ['ang', 'an', 'am'],
  'क': ['ka', 'k'],
  'ख': ['kha', 'kh', 'k'],
  'ग': ['ga', 'g'],
  'घ': ['gha', 'gh', 'g'],
  'ङ': ['nga', 'ng'],
  'च': ['cha', 'ch', 'c'],
  'छ': ['chha', 'chh', 'ch'],
  'ज': ['ja', 'j', 'z'],
  'झ': ['jha', 'jh', 'j'],
  'ञ': ['nya', 'ny', 'nia', 'n'],
  'ट': ['ta', 't'],
  'ठ': ['tha', 'th', 't'],
  'ड': ['da', 'd'],
  'ढ': ['dha', 'dh', 'd'],
  'ण': ['na', 'n'],
  'त': ['ta', 't'],
  'थ': ['tha', 'th', 't'],
  'द': ['da', 'd'],
  'ध': ['dha', 'dh', 'd'],
  'न': ['na', 'n'],
  'प': ['pa', 'p'],
  'फ': ['pha', 'ph', 'fa', 'f', 'p'],
  'ब': ['ba', 'b'],
  'भ': ['bha', 'bh', 'b'],
  'म': ['ma', 'm'],
  'य': ['ya', 'y'],
  'र': ['ra', 'r'],
  'ल': ['la', 'l'],
  'व': ['va', 'v', 'wa', 'w'],
  'श': ['sha', 'sh', 's'],
  'ष': ['sha', 'sh', 's'],
  'स': ['sa', 's'],
  'ह': ['ha', 'h'],
  'क्ष': ['ksha', 'ksh', 'x'],
  'त्र': ['tra', 'tr'],
  'ज्ञ': ['gya', 'gy', 'gyan', 'jnya', 'jna', 'dnya']
};

// Urdu alphabet sounds & common phonetic Latin spellings
export const URDU_LETTER_ANSWERS: Record<string, string[]> = {
  'آ': ['alif madd', 'alif madda', 'aa', 'a'],
  'ا': ['alif', 'a'],
  'ب': ['be', 'bay', 'b'],
  'پ': ['pe', 'pay', 'p'],
  'ت': ['te', 'tay', 't'],
  'ٹ': ['te', 'tay', 't', 'ṭe'],
  'ث': ['se', 'say', 's'],
  'ج': ['jeem', 'jim', 'j'],
  'چ': ['che', 'chay', 'ch'],
  'ح': ['he', 'bari he', 'badi he', 'h'],
  'خ': ['khe', 'khay', 'kh'],
  'د': ['daal', 'dal', 'd'],
  'ڈ': ['daal', 'dal', 'd', 'ḍaal'],
  'ذ': ['zaal', 'zal', 'z'],
  'ر': ['re', 'ray', 'r'],
  'ڑ': ['re', 'ray', 'r', 'ṛe'],
  'ز': ['ze', 'zay', 'z'],
  'ژ': ['zhe', 'zhay', 'zh'],
  'س': ['seen', 'sin', 's'],
  'ش': ['sheen', 'shin', 'sh'],
  'ص': ['swaad', 'swad', 'saad', 's'],
  'ض': ['zwaad', 'zwad', 'zaad', 'z'],
  'ط': ['toye', 'toe', 'toy', 't'],
  'ظ': ['zoye', 'zoe', 'zoy', 'z'],
  'ع': ['ain', 'ayn', 'a'],
  'غ': ['ghain', 'ghayn', 'gh'],
  'ف': ['fe', 'fay', 'f'],
  'ق': ['qaaf', 'qaf', 'q', 'k'],
  'ک': ['kaaf', 'kaf', 'k'],
  'گ': ['gaaf', 'gaf', 'g'],
  'ل': ['laam', 'lam', 'l'],
  'م': ['meem', 'mim', 'm'],
  'ن': ['noon', 'nun', 'n'],
  'ں': ['noon ghunna', 'nun ghunna', 'n'],
  'و': ['wao', 'waw', 'w', 'v', 'o', 'u'],
  'ہ': ['chhoti he', 'he', 'heh', 'h'],
  'ھ': ['do chashmi he', 'do-chashmi he', 'he', 'h'],
  'ء': ['hamza', 'hamzah', 'a'],
  'ی': ['chhoti ye', 'ye', 'y', 'i', 'ee'],
  'ے': ['bari ye', 'badi ye', 'ye', 'ay', 'e']
};

// Arabic alphabet sounds & common phonetic Latin spellings
export const ARABIC_LETTER_ANSWERS: Record<string, string[]> = {
  'ا': ['alif', 'alef', 'a', 'aa'],
  'أ': ['alif', 'alef', 'a', 'aa'],
  'ب': ['baa', 'ba', 'b'],
  'ت': ['taa', 'ta', 't'],
  'ث': ['thaa', 'tha', 'th'],
  'ج': ['jeem', 'jim', 'j'],
  'ح': ['haa', 'ha', 'h'],
  'خ': ['khaa', 'kha', 'kh', 'x'],
  'د': ['daal', 'dal', 'd'],
  'ذ': ['dhaal', 'dhal', 'dh', 'th'],
  'ر': ['raa', 'ra', 'r'],
  'ز': ['zaay', 'zay', 'zain', 'z'],
  'س': ['seen', 'sin', 's'],
  'ش': ['sheen', 'shin', 'sh'],
  'ص': ['saad', 'sad', 's'],
  'ض': ['daad', 'dad', 'd'],
  'ط': ['taa', 'ta', 't'],
  'ظ': ['dhaa', 'dha', 'zhaa', 'dh', 'z'],
  'ع': ['ayn', 'ain', 'a', '3'],
  'غ': ['ghayn', 'ghain', 'gh'],
  'ف': ['faa', 'fa', 'f'],
  'ق': ['qaaf', 'qaf', 'q', 'k'],
  'ك': ['kaaf', 'kaf', 'k'],
  'ل': ['laam', 'lam', 'l'],
  'م': ['meem', 'mim', 'm'],
  'ن': ['noon', 'nun', 'n'],
  'هـ': ['haa', 'ha', 'h'],
  'ه': ['haa', 'ha', 'h'],
  'و': ['waaw', 'waw', 'w', 'u', 'oo'],
  'ي': ['yaa', 'ya', 'y', 'i', 'ee']
};

/**
 * Normalizes an IPA phonetic string (or tone-marked Pinyin syllable)
 * into common Latin keyboard approximations.
 */
function normalizeIpaToAscii(ipa: string): string[] {
  const variants: string[] = [];
  let s = ipa.toLowerCase();

  // Strip slash marks and brackets
  s = s.replace(/[/\[\]]/g, '').trim();
  if (s) variants.push(s);

  // Run multi-character IPA sequences BEFORE single-character replacements
  // so patterns like `biː`, `dubləve`, `iɡʁɛk`, `zɛd`, `sˤ` are not pre-mutated.
  const ascii = s
    .replace(/dubləve/g, 'double ve')
    .replace(/iɡʁɛk/g, 'i grec')
    .replace(/zɛd/g, 'zed')
    .replace(/biː/g, 'b')
    .replace(/diː/g, 'd')
    .replace(/siː/g, 'c')
    .replace(/eɪ/g, 'ei')
    .replace(/iː/g, 'ee')
    .replace(/uː/g, 'oo')
    .replace(/t̪/g, 't')
    .replace(/d̪/g, 'd')
    .replace(/sˤ/g, 's')
    .replace(/dˤ/g, 'd')
    .replace(/tˤ/g, 't')
    .replace(/ðˤ/g, 'dh')
    .replace(/tʃ/g, 'ch')
    .replace(/dʒ/g, 'j')
    .replace(/tɕ/g, 'j')
    .replace(/ʈʂ/g, 'zh')
    .replace(/e̯/g, 'y')
    .replace(/[āáǎà]/g, 'a')
    .replace(/[ōóǒò]/g, 'o')
    .replace(/[ēéěè]/g, 'e')
    .replace(/[īíǐì]/g, 'i')
    .replace(/[ūúǔù]/g, 'u')
    .replace(/[ǖǘǚǜ]/g, 'u')
    .replace(/ɑ|ɒ/g, 'a')
    .replace(/æ/g, 'ae')
    .replace(/ɛ/g, 'e')
    .replace(/ə/g, 'a')
    .replace(/ɔ/g, 'o')
    .replace(/ɪ/g, 'i')
    .replace(/ʈ/g, 't')
    .replace(/ɖ/g, 'd')
    .replace(/ʰ|ʱ/g, 'h')
    .replace(/ŋ/g, 'ng')
    .replace(/ɲ/g, 'ny')
    .replace(/ɽ/g, 'r')
    .replace(/ħ/g, 'h')
    .replace(/x/g, 'kh')
    .replace(/ɣ/g, 'gh')
    .replace(/q/g, 'k')
    .replace(/ʔ|ʕ/g, 'a')
    .replace(/ɡ/g, 'g')
    .replace(/ʃ|ʂ|ɕ/g, 'sh')
    .replace(/ʒ|ʐ/g, 'j')
    .replace(/ʁ|ɾ/g, 'r')
    .replace(/θ/g, 'th')
    .replace(/ɯ/g, 'i')
    .replace(/ø/g, 'oe')
    .replace(/ɤ/g, 'e')
    .replace(/[ˈˌ̃ː]/g, '');

  if (ascii && !variants.includes(ascii)) {
    variants.push(ascii);
  }

  return variants;
}

const SILENT_LETTER_TRANSLATIONS: Record<string, string[]> = {
  en: ['silent'],
  es: ['muda', 'silenciosa'],
  fr: ['muet', 'muette'],
  de: ['stumm'],
  pt: ['muda', 'mudo'],
  ru: ['немая', 'немой', 'без звука'],
  id: ['bisu', 'senyap'],
  tr: ['sessiz'],
  ja: ['無音', '発音しない'],
  ko: ['묵음'],
  zh: ['不发音', '静音'],
  hi: ['मूक', 'मौन'],
  ar: ['صامت', 'صامتة'],
  bn: ['নীরব', 'অনুচ্চারিত'],
  ur: ['خاموش', 'ساکت'],
};

const HARD_SIGN_TRANSLATIONS: Record<string, string[]> = {
  en: ['hard sign', 'hard'],
  ru: ['твёрдый знак', 'твердый знак', 'твёрдый', 'твердый'],
  es: ['signo duro', 'duro'],
  fr: ['signe dur', 'dur'],
  de: ['hartes zeichen', 'hart'],
  pt: ['sinal duro', 'duro'],
  id: ['tanda keras', 'keras'],
  tr: ['sert işaret', 'sert isaret', 'sert'],
  ja: ['硬音記号', 'こうおんきごう'],
  ko: ['경음 부호', '경음부호'],
  zh: ['硬音符号', '硬符'],
  hi: ['कठोर चिह्न'],
  ar: ['علامة التفخيم'],
  bn: ['কঠিন চিহ্ন'],
  ur: ['سخت علامت'],
};

const SOFT_SIGN_TRANSLATIONS: Record<string, string[]> = {
  en: ['soft sign', 'soft'],
  ru: ['мягкий знак', 'мягкий'],
  es: ['signo blando', 'blando'],
  fr: ['signe mou', 'mou'],
  de: ['weiches zeichen', 'weich'],
  pt: ['sinal brando', 'brando', 'sinal suave'],
  id: ['tanda lunak', 'lunak'],
  tr: ['yumuşak işaret', 'yumusak isaret', 'yumuşak'],
  ja: ['軟音記号', 'なんおんきごう'],
  ko: ['연음 부호', '연음부호'],
  zh: ['软音符号', '软符'],
  hi: ['कोमल चिह्न'],
  ar: ['علامة الترقيق'],
  bn: ['নরম চিহ্ন'],
  ur: ['نرم علامت'],
};

/**
 * Returns an exhaustive list of accepted user answers for any alphabet question.
 *
 * @param character The letter symbol (e.g. 'C', 'H', 'Ñ', 'Б', 'ঠ')
 * @param pronunciation The raw pronunciation string from the dataset (e.g. '/se/ or /k/', '/ʈʰɔ/ (tho)')
 * @param language The language code ('es', 'fr', 'en', 'ru', 'de', 'pt', 'id', 'tr', 'zh', 'ja', 'ko', 'bn', 'hi', 'ur', 'ar')
 * @param baseLanguage The learner's native/reference language code (defaults to 'en')
 * @returns Array of lowercase valid answer strings
 */
export function getAlphabetAcceptedAnswers(
  character: string,
  pronunciation: string = '',
  language: string = 'ru',
  baseLanguage: string = 'en'
): string[] {
  const accepted = new Set<string>();
  const trimmedChar = character.trim();
  const toLower = (s: string): string =>
    language === 'tr' ? s.replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase() : s.toLowerCase();
  const charUpper = language === 'tr'
    ? trimmedChar.replace(/i/g, 'İ').replace(/ı/g, 'I').toUpperCase()
    : trimmedChar.toUpperCase();
  const charLower = toLower(trimmedChar);
  const involvesEnglish = language === 'en' || baseLanguage === 'en';

  // 1. Language-specific dictionary lookup (phonetic pronunciations prioritized first)
  let dict: Record<string, string[]> | undefined;
  if (language === 'es') dict = SPANISH_LETTER_ANSWERS;
  else if (language === 'fr') dict = FRENCH_LETTER_ANSWERS;
  else if (language === 'en') dict = ENGLISH_LETTER_ANSWERS;
  else if (language === 'de') dict = GERMAN_LETTER_ANSWERS;
  else if (language === 'pt') dict = PORTUGUESE_LETTER_ANSWERS;
  else if (language === 'id') dict = INDONESIAN_LETTER_ANSWERS;
  else if (language === 'tr') dict = TURKISH_LETTER_ANSWERS;
  else if (language === 'zh') dict = CHINESE_LETTER_ANSWERS;
  else if (language === 'ja') dict = JAPANESE_LETTER_ANSWERS;
  else if (language === 'ko') dict = KOREAN_LETTER_ANSWERS;
  else if (language === 'ru') dict = RUSSIAN_LETTER_ANSWERS;
  else if (language === 'bn') dict = BENGALI_LETTER_ANSWERS;
  else if (language === 'hi') dict = HINDI_LETTER_ANSWERS;
  else if (language === 'ur') dict = URDU_LETTER_ANSWERS;
  else if (language === 'ar') dict = ARABIC_LETTER_ANSWERS;

  const foundInDict = dict && (dict[trimmedChar] || dict[charUpper] || dict[charLower]);
  if (foundInDict) {
    foundInDict.forEach(ans => accepted.add(toLower(ans).trim()));
  }

  // Cross-lookup in non-colliding script dictionaries only when not matched by language parameter
  if (!foundInDict) {
    if (BENGALI_LETTER_ANSWERS[trimmedChar]) {
      BENGALI_LETTER_ANSWERS[trimmedChar].forEach(ans => accepted.add(ans.toLowerCase().trim()));
    }
    if (HINDI_LETTER_ANSWERS[trimmedChar]) {
      HINDI_LETTER_ANSWERS[trimmedChar].forEach(ans => accepted.add(ans.toLowerCase().trim()));
    }
    if (URDU_LETTER_ANSWERS[trimmedChar]) {
      URDU_LETTER_ANSWERS[trimmedChar].forEach(ans => accepted.add(ans.toLowerCase().trim()));
    }
    if (ARABIC_LETTER_ANSWERS[trimmedChar]) {
      ARABIC_LETTER_ANSWERS[trimmedChar].forEach(ans => accepted.add(ans.toLowerCase().trim()));
    }
    if (JAPANESE_LETTER_ANSWERS[trimmedChar]) {
      JAPANESE_LETTER_ANSWERS[trimmedChar].forEach(ans => accepted.add(ans.toLowerCase().trim()));
    }
    if (KOREAN_LETTER_ANSWERS[trimmedChar]) {
      KOREAN_LETTER_ANSWERS[trimmedChar].forEach(ans => accepted.add(ans.toLowerCase().trim()));
    }
    if (RUSSIAN_LETTER_ANSWERS[charUpper]) {
      RUSSIAN_LETTER_ANSWERS[charUpper].forEach(ans => accepted.add(ans.toLowerCase().trim()));
    }
    // Only cross-lookup non-ASCII Latin letters (e.g. Ñ) or English when course involves English
    if (!/^[A-Z]$/.test(charUpper)) {
      if (SPANISH_LETTER_ANSWERS[charUpper]) {
        SPANISH_LETTER_ANSWERS[charUpper].forEach(ans => accepted.add(ans.toLowerCase().trim()));
      }
      if (FRENCH_LETTER_ANSWERS[charUpper]) {
        FRENCH_LETTER_ANSWERS[charUpper].forEach(ans => accepted.add(ans.toLowerCase().trim()));
      }
    } else if (language === 'en') {
      if (ENGLISH_LETTER_ANSWERS[charUpper]) {
        ENGLISH_LETTER_ANSWERS[charUpper].forEach(ans => accepted.add(ans.toLowerCase().trim()));
      }
    }
  }

  // Localized names for Russian hard sign (Ъ) and soft sign (Ь)
  if (language === 'ru' && charUpper === 'Ъ') {
    (HARD_SIGN_TRANSLATIONS[baseLanguage] || []).forEach(w => accepted.add(w.toLowerCase()));
    (HARD_SIGN_TRANSLATIONS.ru || []).forEach(w => accepted.add(w.toLowerCase()));
  } else if (language === 'ru' && charUpper === 'Ь') {
    (SOFT_SIGN_TRANSLATIONS[baseLanguage] || []).forEach(w => accepted.add(w.toLowerCase()));
    (SOFT_SIGN_TRANSLATIONS.ru || []).forEach(w => accepted.add(w.toLowerCase()));
  }

  // 2. The letter itself is acceptable (e.g. user typed 'c' for prompt 'C', or 'ঠ' for 'ঠ')
  if (charLower) {
    accepted.add(charLower);
  }

  // 3. Dynamic parsing from the dataset pronunciation string
  if (pronunciation) {
    const rawLower = pronunciation.toLowerCase();
    if (involvesEnglish) {
      accepted.add(rawLower);
    }

    // Strip slashes
    const noSlashes = rawLower.replace(/[/]/g, ' ').replace(/\s+/g, ' ').trim();
    if (noSlashes && involvesEnglish) accepted.add(noSlashes);

    // Strip parenthesized text (e.g. 'silent /atʃe/' or '/aʃ/ (muet)')
    const noParens = noSlashes.replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
    if (noParens && (involvesEnglish || !/\b(?:silent|or|and|as in|short|long|hard|soft)\b/i.test(noParens))) {
      accepted.add(noParens);
    }

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
      if (cleaned && (involvesEnglish || !/\b(?:silent|as in|sound|like english)\b/i.test(cleaned))) {
        accepted.add(cleaned);
        // Expand IPA approximations
        normalizeIpaToAscii(cleaned).forEach(v => accepted.add(v));
      }
    }

    // Special keywords: if 'silent' or 'muet' was in pronunciation, accept localized silent terms
    if (rawLower.includes('silent') || rawLower.includes('muet')) {
      if (rawLower.includes('muet')) {
        accepted.add('muet');
      }
      if (involvesEnglish) {
        accepted.add('silent');
      }
      (SILENT_LETTER_TRANSLATIONS[baseLanguage] || []).forEach(w => accepted.add(w.toLowerCase()));
      (SILENT_LETTER_TRANSLATIONS[language] || []).forEach(w => accepted.add(w.toLowerCase()));
    }
  }

  if (!involvesEnglish) {
    for (const entry of Array.from(accepted)) {
      if (
        entry === 'silent' ||
        entry === 'soft sign' ||
        entry === 'hard sign' ||
        entry === 'soft' ||
        entry === 'hard' ||
        /\b(?:or|as in|short a|short e|short i)\b/i.test(entry)
      ) {
        accepted.delete(entry);
      }
    }
  }

  return Array.from(accepted).filter(Boolean);
}
