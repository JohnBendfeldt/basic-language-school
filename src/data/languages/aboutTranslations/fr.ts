import { AboutLanguageTranslations } from './types';

export const ABOUT_TRANSLATIONS_FR: AboutLanguageTranslations = {
  zh: {
    title: 'L’histoire du mandarin et du chinois simplifié',
    tagline: 'Des os oraculaires vieux de 3 000 ans à la révolution de l’alphabétisation des années 1950 et à la naissance du pinyin.',
    speakersCount: 'Plus de 1,1 milliard de locuteurs natifs',
    writingSystem: 'Caractères chinois simplifiés (简体字) et hanyu pinyin (汉语拼音)',
    languageFamily: 'Sino-tibétaine',
    facts: [
      { label: 'Locuteurs natifs', value: '1,1 milliard (n° 1 mondial)', icon: '👥' },
      { label: 'Écriture officielle', value: 'Caractères simplifiés (简体字)', icon: '✍️' },
      { label: 'Pont phonétique', value: 'Hanyu pinyin (adopté en 1958)', icon: '🔤' },
      { label: 'Dialecte standard', value: 'Phonologie de Pékin', icon: '📍' },
      { label: 'Conjugaison verbale', value: 'Aucune (ni formes du passé ni du futur)', icon: '✨' },
      { label: 'Langue officielle de l’ONU', value: 'Depuis 1946', icon: '🌐' }
    ],
    historyTimeline: [
      {
        era: 'v. 1200 av. J.-C.',
        title: 'L’écriture sur os oraculaires (甲骨文 · Jiǎgǔwén)',
        description: 'La plus ancienne écriture chinoise connue, gravée sur des carapaces de tortue et des omoplates de bœuf sous la dynastie Shang à des fins divinatoires. Les caractères étaient des représentations picturales directes d’éléments naturels tels que le soleil (日) et l’eau (水).',
        highlight: 'Naissance du chinois écrit'
      },
      {
        era: '221 av. J.-C.',
        title: 'L’unification impériale de l’écriture (秦始皇 · Petit sigillaire)',
        description: 'Le premier empereur de Chine, Qin Shi Huang, unifia des centaines de variantes régionales en une écriture nationale unique (petit sigillaire et écriture des scribes), garantissant que les décrets fussent lus à l’identique dans toutes les provinces quel que soit le dialecte parlé.',
        highlight: 'Unification de la Chine'
      },
      {
        era: 'v. 200 apr. J.-C. – années 1950',
        title: 'L’écriture régulière traditionnelle (繁体楷书 · Fántǐ Kǎishū)',
        description: 'Pendant près de 1 800 ans, le chinois traditionnel est resté la référence absolue de l’expression littéraire, administrative et poétique. Toutefois, des caractères complexes comptant de 20 à 30 traits dressaient d’immenses obstacles éducatifs pour le peuple.',
        highlight: 'Âge d’or de la littérature classique'
      },
      {
        era: '1949 – 1956',
        title: 'La crise de l’alphabétisation et les caractères simplifiés (简体字)',
        description: 'En 1949, la Chine connaissait un taux d’analphabétisme supérieur à 80 %. Afin de démocratiser rapidement l’instruction, le gouvernement lança le Plan de simplification des caractères chinois (汉字简化方案). Plus de 2 200 caractères complexes furent systématiquement allégés grâce à d’anciennes abréviations cursives et à la réduction du nombre de traits.',
        highlight: 'L’alphabétisation nationale est passée de 20 % à plus de 96 %'
      },
      {
        era: '1958',
        title: 'Zhou Youguang et l’invention du pinyin (汉语拼音)',
        description: 'L’économiste et linguiste Zhou Youguang dirigea le Comité de réforme de la langue écrite chinoise pour concevoir le hanyu pinyin. Fondé sur l’alphabet latin, le pinyin offrit une passerelle phonétique accessible sur laquelle reposent aujourd’hui les claviers d’ordinateur et les smartphones.',
        highlight: 'Zhou Youguang a vécu jusqu’à 111 ans (1906–2017)'
      }
    ],
    scriptComparison: [
      {
        traditional: '國',
        simplified: '国',
        pinyin: 'guó',
        meaning: 'Pays / Nation',
        traditionalStrokes: 11,
        simplifiedStrokes: 8,
        reason: 'Remplacement du radical intérieur complexe de l’arme par le symbole du jade (玉), évoquant un trésor protégé à l’intérieur des frontières nationales (囗).'
      },
      {
        traditional: '學',
        simplified: '学',
        pinyin: 'xué',
        meaning: 'Étudier / Apprendre',
        traditionalStrokes: 16,
        simplifiedStrokes: 8,
        reason: 'Réduction de la coiffe érudite de 16 traits en une abréviation cursive épurée de 8 traits, employée de manière informelle depuis des siècles.'
      },
      {
        traditional: '愛',
        simplified: '爱',
        pinyin: 'ài',
        meaning: 'Amour',
        traditionalStrokes: 13,
        simplifiedStrokes: 10,
        reason: 'Remplacement du radical central complexe du cœur (心) par la forme abrégée d’ami/harmonie (友) afin de rendre le tracé plus fluide et rapide.'
      },
      {
        traditional: '門',
        simplified: '门',
        pinyin: 'mén',
        meaning: 'Porte / Portail',
        traditionalStrokes: 8,
        simplifiedStrokes: 3,
        reason: 'Épuration des deux battants de porte en un contour d’encadrement ouvert en 3 traits.'
      },
      {
        traditional: '馬',
        simplified: '马',
        pinyin: 'mǎ',
        meaning: 'Cheval',
        traditionalStrokes: 10,
        simplifiedStrokes: 3,
        reason: 'Transformation de la crinière, des pattes et de la queue en 3 traits continus de pinceau cursif.'
      }
    ],
    linguisticTraits: [
      {
        title: 'Aucune conjugaison verbale',
        description: 'Contrairement au français ou à l’espagnol et leurs dizaines de terminaisons, les verbes chinois restent invariables ! « Manger » (吃 chī) est identique pour je mange, tu manges, nous avons mangé ou ils mangeront. Le temps s’exprime simplement par des marqueurs temporels (hier, demain) ou des particules d’aspect (了 le).',
        icon: '⚡',
        example: '我吃 (Je mange) · 昨天我吃 (Hier, j’ai mangé)'
      },
      {
        title: 'Ni genre grammatical ni marque du pluriel',
        description: 'Il n’existe aucun article masculin ou féminin (le/la) et les noms restent invariables au pluriel. Une pomme se dit 一个苹果 et cinq pommes 五个苹果.',
        icon: '🍎',
        example: '苹果 (Pomme) s’écrit toujours 苹果, au singulier comme au pluriel.'
      },
      {
        title: 'Les spécificatifs (classificateurs)',
        description: 'Chaque fois que l’on compte des objets en mandarin, un classificateur spécifique relie le nombre au nom selon sa forme ou sa catégorie (p. ex. 本 běn pour les livres, 辆 liàng pour les véhicules, 张 zhāng pour les objets plats).',
        icon: '📏',
        example: '一本书 (Un livre) · 一辆车 (Une voiture)'
      },
      {
        title: 'Langue tonale (4 tons)',
        description: 'Le mandarin possède 4 courbes mélodiques distinctes (ton haut plat, montant, descendant-montant, descendant) ainsi qu’un ton neutre. Changer la hauteur de la voix modifie entièrement le caractère et le sens de la syllabe.',
        icon: '🎵',
        example: 'mā (Mère 妈) vs mǎ (Cheval 马)'
      }
    ],
    culturalNote: 'Aujourd’hui, le chinois simplifié est la norme en Chine continentale, à Singapour et au sein d’organisations internationales comme l’ONU, tandis que le chinois traditionnel demeure précieux à Taïwan, Hong Kong, Macao et dans la calligraphie classique.'
  },

  ko: {
    title: 'Le miracle du hangeul : le don royal de l’alphabétisation',
    tagline: 'En 1443, le roi Sejong créa l’un des alphabets les plus scientifiquement conçus au monde.',
    speakersCount: 'Plus de 80 millions de locuteurs natifs',
    writingSystem: 'Hangeul (한글) — Alphabet phonétique à traits articulatoires',
    languageFamily: 'Coréanique (isolat linguistique)',
    facts: [
      { label: 'Inventeur', value: 'Le roi Sejong le Grand (1443)', icon: '👑' },
      { label: 'Système alphabétique', value: '24 lettres de base (consonnes et voyelles)', icon: '🔤' },
      { label: 'Conception scientifique', value: 'Les lettres imitent la bouche et la langue', icon: '👅' },
      { label: 'Fête nationale', value: 'Jour du Hangeul (9 octobre)', icon: '🎉' },
      { label: 'Ordre des mots', value: 'SOV (Sujet-Objet-Verbe)', icon: '🧱' },
      { label: 'Honorifiques', value: 'Niveaux de politesse intégrés à la grammaire', icon: '🙇' }
    ],
    historyTimeline: [
      {
        era: 'Avant 1443',
        title: 'Le fardeau des hanja (caractères chinois)',
        description: 'Les Coréens ne possédaient pas de système d’écriture propre et écrivaient à l’aide de caractères chinois complexes (hanja). Le chinois et le coréen appartenant à des familles linguistiques totalement distinctes, seule l’élite aristocratique fortunée (yangban) disposait des décennies nécessaires pour apprendre à lire.',
        highlight: 'Le peuple ne pouvait ni lire les lois ni écrire de lettres'
      },
      {
        era: '1443 – 1446',
        title: 'Le roi Sejong promulgue le Hunminjeongeum',
        description: 'Déterminé à émanciper les citoyens ordinaires, le roi Sejong mit secrètement au point le hangeul avec des érudits royaux. En 1446, il publia le Hunminjeongeum (« Les sons corrects pour l’instruction du peuple »), affirmant qu’écrire devait être aussi naturel que respirer.',
        highlight: '« Un sage peut l’apprendre en une matinée ; un ignorant en dix jours. »'
      },
      {
        era: 'XXe siècle',
        title: 'Démocratisation et vague hallyu',
        description: 'Malgré la résistance historique des élites traditionnelles, le hangeul s’est imposé à l’époque moderne, propulsant la Corée du Sud parmi les taux d’alphabétisation les plus élevés au monde (99 %) et portant son rayonnement culturel mondial (K-pop, séries coréennes).',
        highlight: 'Prix d’alphabétisation Roi Sejong de l’UNESCO créé en 1989'
      }
    ],
    linguisticTraits: [
      {
        title: 'Écriture articulatoire (mimétisme de la bouche et de la langue)',
        description: 'Les lettres du hangeul ne sont pas arbitraires : ㄱ imite la langue bloquant l’arrière du palais, ㄴ reproduit la langue touchant les alvéoles supérieures et ㅁ dessine la forme des lèvres.',
        icon: '👅',
        example: 'ㅁ (m) figure les lèvres jointes ; ㅂ (b) ajoute des traits pour l’occlusion.'
      },
      {
        title: 'Architecture en blocs syllabiques',
        description: 'Les lettres s’assemblent en blocs syllabiques carrés au lieu de s’aligner simplement les unes après les autres. Par exemple, h (ㅎ) + a (ㅏ) + n (ㄴ) s’empilent pour former « 한 » (han).',
        icon: '🧱',
        example: 'ㅎ + ㅏ + ㄴ = 한 (Han)'
      },
      {
        title: 'Ordre des mots Sujet-Objet-Verbe (SOV)',
        description: 'En coréen, le verbe se place toujours tout à la fin de la phrase. « Je mange une pomme » se construit selon l’ordre « Je pomme mange » (저는 사과를 먹어요).',
        icon: '🔄',
        example: '저는 (Je) + 사과를 (Pomme) + 먹어요 (Mange)'
      }
    ],
    culturalNote: 'Le Jour du Hangeul est célébré comme jour férié national en Corée du Sud chaque 9 octobre en hommage à cette création royale porteuse de liberté linguistique.'
  },

  ja: {
    title: 'L’harmonie de trois écritures (漢字 · ひらがな · カタカナ)',
    tagline: 'Une élégante symphonie linguistique alliant idéogrammes chinois et deux syllabaires phonétiques autochtones.',
    speakersCount: 'Plus de 125 millions de locuteurs natifs',
    writingSystem: 'Kanji (漢字), hiragana (ひらがな) et katakana (カタカナ)',
    languageFamily: 'Japonique',
    facts: [
      { label: 'Écritures utilisées', value: '3 systèmes d’écriture complémentaires', icon: '✍️' },
      { label: 'Jōyō kanji', value: '2 136 caractères enseignés à l’école', icon: '📚' },
      { label: 'Ordre des mots', value: 'SOV (le verbe se place toujours à la fin)', icon: '🔄' },
      { label: 'Système prosodique', value: 'Accent de hauteur mélodique (haut/bas)', icon: '🎵' },
      { label: 'Mots d’emprunt', value: 'Transcrits en katakana (p. ex. コーヒー)', icon: '☕' },
      { label: 'Particules', value: 'Marqueurs grammaticaux (は, が, を, に)', icon: '🏷️' }
    ],
    historyTimeline: [
      {
        era: 'Ve siècle',
        title: 'L’arrivée des kanji depuis le continent asiatique',
        description: 'Avant ses contacts avec la Chine, le japonais était une langue exclusivement orale. Les caractères chinois (kanji) furent adoptés pour transcrire les noms japonais, les lois et les soutras bouddhiques.',
        highlight: 'Adaptation des logogrammes chinois'
      },
      {
        era: 'VIIIe – Xe siècle',
        title: 'L’invention des hiragana et la littérature féminine',
        description: 'Les dames de la cour impériale simplifièrent des kanji cursifs en syllabes phonétiques fluides appelées hiragana (« main de femme »). Cet essor donna naissance à des chefs-d’œuvre universels, dont Le Dit du Genji de Murasaki Shikibu.',
        highlight: 'Naissance de l’écriture phonétique japonaise'
      },
      {
        era: 'Époque moderne',
        title: 'Les katakana et l’intégration du lexique mondial',
        description: 'Les katakana, créés à l’origine par des moines bouddhistes comme annotations abrégées, sont devenus l’écriture dédiée aux termes scientifiques modernes, aux noms étrangers et aux emprunts internationaux (p. ex. コンピューター konpyūtā).',
        highlight: 'Trois écritures œuvrant de concert'
      }
    ],
    linguisticTraits: [
      {
        title: 'Le système d’écriture tripartite',
        description: 'Une seule phrase réunit souvent les trois écritures : les kanji portent les racines lexicales (私 je, 食べる manger), les hiragana notent les terminaisons grammaticales et particules (は, を, ました), et les katakana transcrivent les mots d’origine étrangère (パン pain).',
        icon: '🧩',
        example: '私はパンを食べました (J’ai mangé du pain)'
      },
      {
        title: 'Les particules grammaticales (助词 · Joshi)',
        description: 'De petites particules postposées indiquent la fonction précise de chaque mot dans la phrase (は thème, が sujet, を complément d’objet direct, に destination ou temps).',
        icon: '🏷️',
        example: '猫が (le chat [sujet]) + 魚を (poisson [objet]) + 食べた (a mangé)'
      }
    ],
    culturalNote: 'Maîtriser le japonais permet d’apprécier un lien culturel profond entre la calligraphie visuelle, les registres de respect (keigo) et une communication tout en nuances contextuelles.'
  },

  ru: {
    title: 'L’âme slave : des moines cyrilliques à Pouchkine et Tolstoï',
    tagline: 'Une langue riche et expressive façonnée par des érudits byzantins, Pierre le Grand et d’immenses poètes.',
    speakersCount: 'Plus de 255 millions de locuteurs au total',
    writingSystem: 'Alphabet cyrillique russe (33 lettres)',
    languageFamily: 'Indo-européenne (slave orientale)',
    facts: [
      { label: 'Alphabet', value: '33 lettres (10 voyelles, 21 consonnes, 2 signes)', icon: '🔤' },
      { label: 'Réformes graphiques', value: 'Pierre le Grand (1708) et réforme de 1918', icon: '📜' },
      { label: 'Déclinaisons', value: '6 cas grammaticaux', icon: '🏛️' },
      { label: 'Genres', value: '3 (masculin, féminin, neutre)', icon: '⚖️' },
      { label: 'Langue spatiale', value: 'Requise à bord de la SSI aux côtés de l’anglais', icon: '🚀' },
      { label: 'Âge d’or littéraire', value: 'Pouchkine, Tolstoï, Dostoïevski, Tchekhov', icon: '📖' }
    ],
    historyTimeline: [
      {
        era: 'v. 863 apr. J.-C.',
        title: 'Les saints Cyrille et Méthode',
        description: 'Les frères missionnaires byzantins Cyrille et Méthode mirent au point l’alphabet glagolitique afin de traduire les textes bibliques pour les peuples slaves ; celui-ci évolua bientôt dans le Premier Empire bulgare pour donner naissance à l’alphabet cyrillique.',
        highlight: 'Naissance de l’alphabet cyrillique'
      },
      {
        era: '1708',
        title: 'La réforme de l’écriture civile de Pierre le Grand (Гражданский шрифт)',
        description: 'Le tsar Pierre le Grand biffa lui-même des lettres grecques ecclésiastiques archaïques et redessina le cyrillique russe à l’image de la typographie d’Europe occidentale, modernisant ainsi les sciences, les cartes marines et l’imprimerie russes.',
        highlight: 'Sécularisation et modernisation'
      },
      {
        era: '1918',
        title: 'La grande réforme orthographique post-révolutionnaire',
        description: 'Le gouvernement bolchevique simplifia l’orthographe en abolissant des lettres historiques redondantes (telles que ѣ « iat », ѳ « fita » et le ъ « ier » final impérial), établissant l’alphabet épuré de 33 lettres en usage aujourd’hui.',
        highlight: 'Adoption de la norme actuelle de 33 lettres'
      }
    ],
    linguisticTraits: [
      {
        title: 'L’accent tonique mobile',
        description: 'L’accent tonique en russe est imprévisible et peut changer le sens d’un mot (за́мок = château vs замо́к = cadenas). Le « o » non accentué se réduit naturellement vers un son « a » (молоко́ → malakó).',
        icon: '🎯',
        example: 'за́мок (château) vs замо́к (cadenas)'
      },
      {
        title: 'Consonnes dures et mouillées (palatalisation)',
        description: 'Presque chaque consonne fonctionne en paire dure (ordinaire) ou mouillée (palatalisée), distinguée par la voyelle qui la suit ou par le signe mou (ь).',
        icon: '🎶',
        example: 'мат (échec et mat) vs мать (mère)'
      }
    ],
    culturalNote: 'Le russe est l’une des six langues officielles des Nations unies et la seconde langue opérationnelle obligatoire de la Station spatiale internationale.'
  },

  tr: {
    title: 'Le miracle de 1928 : la révolution alphabétique d’Atatürk',
    tagline: 'Comment toute une nation est passée de l’écriture arabe ottomane à un alphabet latin phonétique en quelques mois.',
    speakersCount: 'Plus de 85 millions de locuteurs natifs',
    writingSystem: 'Alphabet latin turc (29 lettres)',
    languageFamily: 'Turcique',
    facts: [
      { label: 'La réforme de 1928', value: 'Harf Devrimi (révolution de l’alphabet d’Atatürk)', icon: '🏛️' },
      { label: 'Alphabet', value: '29 lettres (100 % phonétique : 1 lettre = 1 son)', icon: '🔤' },
      { label: 'Structure linguistique', value: 'Agglutinante (assemblage progressif de suffixes)', icon: '🧱' },
      { label: 'Harmonie vocalique', value: 'Accord harmonieux des voyelles antérieures et postérieures', icon: '🎵' },
      { label: 'Genre grammatical', value: 'Aucun ! « Il », « elle » et « cela » se disent simplement « o »', icon: '⚖️' },
      { label: 'Ordre des mots', value: 'SOV (Sujet-Objet-Verbe)', icon: '🔄' }
    ],
    historyTimeline: [
      {
        era: 'Xe siècle – 1928 apr. J.-C.',
        title: 'Le turc ottoman et l’inadéquation de l’alphabet arabe',
        description: 'Pendant plus de 900 ans, le turc s’écrivait en caractères arabes ottomans. Or, l’écriture arabe ne note que 3 voyelles alors que le turc compte 8 voyelles distinctes. Ce décalage provoquait de nombreuses ambiguïtés et maintenait l’alphabétisation sous la barre des 10 %.',
        highlight: 'Analphabétisme massif dû à l’inadéquation graphique'
      },
      {
        era: '1928',
        title: 'La révolution linguistique de Mustafa Kemal Atatürk (Harf Devrimi)',
        description: 'Fondateur de la République de Turquie, Atatürk parcourut personnellement villes et villages avec un tableau noir pour présenter un nouvel alphabet latin phonétique de 29 lettres taillé sur mesure pour la phonologie turque (introduisant ç, ğ, ı, ö, ş, ü).',
        highlight: 'L’alphabétisation nationale a bondi de 10 % à plus de 90 %'
      }
    ],
    linguisticTraits: [
      {
        title: 'Chaînes de suffixes agglutinants',
        description: 'Les mots se construisent en emboîtant des suffixes sur une racine comme des briques de construction. Un seul mot turc peut exprimer ce qui nécessite toute une phrase en français !',
        icon: '🧱',
        example: 'Ev (maison) → evler (maisons) → evlerimde (dans mes maisons)'
      },
      {
        title: 'Harmonie vocalique (Ünlü Uyumu)',
        description: 'À l’intérieur d’un mot, les voyelles s’accordent musicalement entre voyelles postérieures (a, ı, o, u) et antérieures (e, i, ö, ü). Les suffixes adaptent automatiquement leur voyelle à celle du radical.',
        icon: '🎶',
        example: 'araba-lar (voitures) vs kedi-ler (chats)'
      }
    ],
    culturalNote: 'Comme l’orthographe turque est entièrement phonétique, dès que vous connaissez le son des 29 lettres, vous pouvez prononcer avec exactitude n’importe quel mot de la langue.'
  },

  ar: {
    title: 'La langue de l’éloquence (لغة الضاد · Lughat al-Dad)',
    tagline: 'Une langue sacrée de racines et de schèmes unissant plus de 400 millions de locuteurs à travers le monde arabe.',
    speakersCount: 'Plus de 400 millions de locuteurs au total',
    writingSystem: 'Abjad arabe (28 lettres, de droite à gauche)',
    languageFamily: 'Afro-asiatique (sémitique)',
    facts: [
      { label: 'Sens d’écriture', value: 'De droite à gauche', icon: '➡️' },
      { label: 'Alphabet', value: '28 lettres (consonnes et voyelles longues)', icon: '🔤' },
      { label: 'Système de racines', value: 'Racines consonantiques de 3 lettres (trilitères)', icon: '🌱' },
      { label: 'Le son unique', value: 'Dād (ض) — présent presque exclusivement en arabe', icon: '🗣️' },
      { label: 'Nombre duel', value: 'Formes au singulier, au duel (deux) et au pluriel', icon: '2️⃣' },
      { label: 'Journée mondiale ONU', value: 'Journée mondiale de la langue arabe (18 décembre)', icon: '🌐' }
    ],
    historyTimeline: [
      {
        era: 'VIe siècle apr. J.-C.',
        title: 'La poésie préislamique (Mu’allaqāt)',
        description: 'Les poètes bédouins mémorisaient de savantes odes rimées célébrant l’honneur et la bravoure du désert, fixant ainsi le canon poétique sublime de l’arabe classique.',
        highlight: 'Âge d’or de la poésie préislamique'
      },
      {
        era: 'VIIe siècle apr. J.-C.',
        title: 'Le Coran et la préservation linguistique',
        description: 'La révélation et la compilation du Saint Coran codifièrent la grammaire et la phonologie arabes, préservant la langue presque intacte depuis plus de 1 400 ans.',
        highlight: 'Norme liturgique universelle de l’islam'
      },
      {
        era: 'Époque moderne',
        title: 'L’arabe standard moderne (الفصحى · Fus’ha)',
        description: 'Aujourd’hui, l’arabe standard moderne sert de langue formelle commune pour la littérature, l’information, la diplomatie et l’enseignement dans 22 pays.',
        highlight: 'Langue véhiculaire partagée du monde arabe'
      }
    ],
    linguisticTraits: [
      {
        title: 'La mécanique des racines à 3 lettres (الجذر · Al-Jidhr)',
        description: 'Presque chaque mot arabe jaillit d’une racine de 3 consonnes porteuse d’une idée abstraite. Ainsi, K-T-B (ك-ت-ب), liée à l’écriture, engendre kitāb (livre), kātib (écrivain), maktab (bureau) et maktūb (écrit/destin).',
        icon: '🌱',
        example: 'ك-ت-ب → كتاب (Livre) · مكتبة (Bibliothèque) · كاتب (Auteur)'
      },
      {
        title: 'Ligatures cursives fluides',
        description: 'Les lettres arabes se lient en une écriture cursive continue et changent de forme selon qu’elles se trouvent au début, au milieu, à la fin d’un mot ou isolées.',
        icon: '✍️',
        example: 'ب en position initiale (بـ), médiane (ـبـ) ou finale (ـب)'
      }
    ],
    culturalNote: 'La calligraphie arabe est célébrée comme l’une des formes les plus accomplies des arts visuels dans l’histoire de l’humanité.'
  },

  hi: {
    title: 'La voix de l’Inde : du sanskrit ancien à Bollywood',
    tagline: 'Écrite dans la gracieuse écriture devanagari (« Cité des Dieux ») et parlée par plus de 600 millions de personnes.',
    speakersCount: 'Plus de 600 millions de locuteurs au total',
    writingSystem: 'Alphasyllabaire (abugida) devanagari (देवनागरी)',
    languageFamily: 'Indo-européenne (indo-aryenne)',
    facts: [
      { label: 'Alphabet', value: '46 lettres devanagari (11 voyelles, 33 consonnes)', icon: '🔤' },
      { label: 'Ligne supérieure', value: 'Shirorekha (trait horizontal suspendant les lettres)', icon: '📏' },
      { label: 'Langue sœur', value: 'Mutuellement compréhensible à l’oral avec l’ourdou', icon: '🤝' },
      { label: 'Ordre des mots', value: 'SOV (Sujet-Objet-Verbe)', icon: '🔄' },
      { label: 'Ancêtre', value: 'Sanskrit (संस्कृतम्)', icon: '🏛️' },
      { label: 'Rayonnement lexical', value: 'Yoga, avatar, jungle, gourou, chaï, shampoing', icon: '🧘' }
    ],
    historyTimeline: [
      {
        era: 'v. 1500 av. J.-C.',
        title: 'Les racines du sanskrit védique',
        description: 'Le sanskrit védique évolua vers des dialectes prâkrits régionaux parlés au quotidien par les populations du nord de l’Inde.',
        highlight: 'Hymnes védiques et philosophie classique'
      },
      {
        era: 'XIIIe – XVIIIe siècle',
        title: 'L’émergence de l’hindoustani',
        description: 'Le sultanat de Delhi et l’époque moghole introduisirent un riche vocabulaire persan, turcique et arabe dans l’usage courant, faisant naître l’hindoustani comme langue vivante des bazars et de la poésie.',
        highlight: 'Naissance de l’hindoustani commun'
      },
      {
        era: '1950',
        title: 'Langue officielle de la République de l’Inde',
        description: 'Le hindi standard écrit en devanagari fut désigné langue officielle de l’Union indienne et est célébré dans tout le pays lors du Hindi Diwas (14 septembre).',
        highlight: 'Le Hindi Diwas est célébré chaque 14 septembre'
      }
    ],
    linguisticTraits: [
      {
        title: 'La barre horizontale supérieure (Shirorekha · शिरोरेखा)',
        description: 'Les caractères devanagari sont suspendus sous une ligne horizontale continue comme du linge sur un fil, reliant visuellement toutes les lettres d’un même mot.',
        icon: '📏',
        example: 'क + म + ल = कमल (Lotus)'
      },
      {
        title: 'Consonnes aspirées et non aspirées',
        description: 'Le hindi établit une distinction nette entre consonnes occlusives simples et occlusives aspirées accompagnées d’un souffle (k vs kh, p vs ph, t vs th). En plaçant la main devant la bouche, on sent nettement ce souffle sur les sons aspirés.',
        icon: '💨',
        example: 'कल (Hier/Demain) vs खल (Méchant)'
      }
    ],
    culturalNote: 'Les langues européennes ont emprunté des centaines de mots courants au hindi et au sanskrit, parmi lesquels karma, gourou, jungle, avatar, pyjama et shampoing.'
  },

  bn: {
    title: 'La langue de l’âme : Tagore et le Mouvement pour la langue',
    tagline: 'La seule langue de l’histoire humaine dont les locuteurs ont lutté et sacrifié leur vie pour défendre leur langue maternelle.',
    speakersCount: 'Plus de 270 millions de locuteurs natifs (n° 6 mondial)',
    writingSystem: 'Écriture bengali-assamaise (বাংলা লিপি)',
    languageFamily: 'Indo-européenne (indo-aryenne)',
    facts: [
      { label: 'Rang mondial', value: '6e langue maternelle la plus parlée au monde', icon: '🌐' },
      { label: 'Prix Nobel', value: 'Rabindranath Tagore (Nobel de littérature 1913)', icon: '🏅' },
      { label: 'Journée UNESCO', value: 'Journée internationale de la langue maternelle (21 fév.)', icon: '🌺' },
      { label: 'Voyelle inhérente', value: 'Son « o » arrondi (অ /ɔ/)', icon: '👄' },
      { label: 'Genre grammatical', value: 'Aucun ! Verbes et adjectifs sont neutres en genre', icon: '⚖️' },
      { label: 'Hymnes nationaux', value: 'Tagore a composé les hymnes de l’Inde et du Bangladesh', icon: '🎶' }
    ],
    historyTimeline: [
      {
        era: 'Xe – XIIe siècle',
        title: 'Les Charyapada : les plus anciens poèmes bengalis',
        description: 'Des poètes mystiques bouddhistes tantriques composèrent les chants des Charyapada sur des manuscrits en feuilles de palmier, livrant la plus ancienne trace écrite de la langue bengalie.',
        highlight: 'Chants mystiques en vieux bengali'
      },
      {
        era: '1913',
        title: 'Rabindranath Tagore remporte le prix Nobel',
        description: 'Le polymathe Rabindranath Tagore devint le premier lauréat non européen du prix Nobel de littérature pour son profond recueil spirituel Gitanjali (« L’Offrande lyrique »).',
        highlight: 'Premier lauréat asiatique du prix Nobel'
      },
      {
        era: '21 février 1952',
        title: 'Le Mouvement pour la langue bengalie (ভাষা আন্দোলন)',
        description: 'Des étudiants de Dacca descendirent dans la rue et sacrifièrent leur vie pour protester contre la mise à l’écart du bengali comme langue officielle d’État. En 1999, l’UNESCO proclama le 21 février Journée internationale de la langue maternelle en leur honneur.',
        highlight: 'Journée internationale de la langue maternelle de l’UNESCO'
      }
    ],
    linguisticTraits: [
      {
        title: 'La voyelle inhérente « o » arrondie',
        description: 'Contrairement au hindi qui porte par défaut un « a » bref, chaque consonne bengalie non marquée s’accompagne d’un son « o » chaleureux et arrondi (/ɔ/). Ainsi, জল se prononce « djol » (eau).',
        icon: '👄',
        example: 'ক = ko (et non ka) · জল = jol'
      },
      {
        title: 'Neutralité totale de genre',
        description: 'La grammaire bengalie ignore totalement le genre grammatical. Hommes, femmes et objets inanimés partagent le même pronom de troisième personne (সে il/elle) et les mêmes formes verbales.',
        icon: '⚖️',
        example: 'সে যায় (Il va / Elle va)'
      }
    ],
    culturalNote: 'La Journée internationale de la langue maternelle (21 février) est célébrée dans le monde entier en hommage aux étudiants martyrs bengalis de 1952.'
  },

  ur: {
    title: 'La langue de la poésie : écriture nastaliq et élégance de cour',
    tagline: 'Née dans les campements royaux, célébrée depuis des siècles à travers les ghazals, la romance et la philosophie.',
    speakersCount: 'Plus de 230 millions de locuteurs au total',
    writingSystem: 'Écriture perso-arabe nastaliq (نستعلیق · 39 lettres)',
    languageFamily: 'Indo-européenne (indo-aryenne)',
    facts: [
      { label: 'Origine du nom', value: 'Du turcique « Ordu » (campement royal)', icon: '⛺' },
      { label: 'Style calligraphique', value: 'Nastaliq (style persan incliné et fluide)', icon: '✒️' },
      { label: 'Héritage lexical', value: 'Base prâkrite enrichie de persan, d’arabe et de turc', icon: '🏛️' },
      { label: 'Jumeau parlé', value: 'Mutuellement intelligible avec le hindi parlé', icon: '🤝' },
      { label: 'Langue nationale', value: 'République islamique du Pakistan', icon: '🇵🇰' },
      { label: 'Formes poétiques', value: 'Ghazal (غزل), nazm et qawwali', icon: '📜' }
    ],
    historyTimeline: [
      {
        era: 'XIIIe siècle',
        title: 'Amir Khusrau et les campements de Delhi',
        description: 'Le poète soufi Amir Khusrau inaugura une poésie mêlant l’imagerie persane au parler hindavi local, posant les fondations de la littérature ourdoue.',
        highlight: 'Père de la littérature ourdoue'
      },
      {
        era: 'XVIIIe – XIXe siècle',
        title: 'L’âge d’or de la poésie ourdoue (Mir et Ghalib)',
        description: 'Mirza Ghalib et Mir Taqi Mir firent de la cour moghole de Delhi la capitale mondiale du ghazal, explorant l’amour, le doute existentiel et le mysticisme avec un lyrisme inégalé.',
        highlight: 'Les vers immortels de Mirza Ghalib'
      },
      {
        era: '1947',
        title: 'Langue nationale du Pakistan',
        description: 'L’ourdou fut choisi comme langue nationale fédératrice du Pakistan, tissant un lien commun entre des provinces variées parlant pendjabi, sindhi, pachto et baloutchi.',
        highlight: 'Symbole national d’unité'
      }
    ],
    linguisticTraits: [
      {
        title: 'L’écriture inclinée nastaliq',
        description: 'Contrairement au style arabe naskh horizontal, l’ourdou est traditionnellement calligraphié et composé en nastaliq, où chaque mot descend en diagonale de haut en droite vers le bas à gauche telle une cascade de soie.',
        icon: '✒️',
        example: 'L’écriture nastaliq descend en diagonale sur la ligne.'
      },
      {
        title: 'Politesse raffinée et tehzeeb (adab)',
        description: 'L’ourdou possède trois degrés distincts pour dire « tu/vous » : le familier « tu » (تو), le courtois « tum » (تم) et le déférent « aap » (آپ), accompagnés de formules de civilité raffinées.',
        icon: '🙇',
        example: 'آپ تشریف رکھیے (Veuillez nous faire l’honneur de vous asseoir)'
      }
    ],
    culturalNote: 'Dans toute l’Asie du Sud, l’ourdou est célébré comme la langue par excellence du romantisme, du raffinement courtois (tehzeeb) et de la musique mystique soufie.'
  },

  id: {
    title: 'La langue fédératrice : 17 000 îles, une seule langue',
    tagline: 'Comment le serment pacifique de la jeunesse de 1928 a uni 700 groupes ethniques au sein du plus vaste archipel du monde.',
    speakersCount: 'Plus de 300 millions de locuteurs au total',
    writingSystem: 'Alphabet latin (26 lettres, 100 % phonétique)',
    languageFamily: 'Austronésienne (malayo-polynésienne)',
    facts: [
      { label: 'Le serment de 1928', value: 'Sumpah Pemuda (Serment de la jeunesse pour l’unité)', icon: '🇮🇩' },
      { label: 'Simplicité grammaticale', value: 'Ni conjugaisons, ni temps verbaux, ni genre', icon: '✨' },
      { label: 'Formation du pluriel', value: 'Redoublement du mot (anak-anak = enfants)', icon: '👶' },
      { label: 'Orthographe phonétique', value: 'Les mots s’écrivent exactement comme ils se prononcent', icon: '🔤' },
      { label: 'Dialecte de base', value: 'Malais de Riau (langue commerciale neutre)', icon: '🚢' },
      { label: 'Mots d’emprunt', value: 'Sanskrit, arabe, néerlandais, portugais, chinois', icon: '🌏' }
    ],
    historyTimeline: [
      {
        era: 'VIIe siècle',
        title: 'La Route maritime de la soie et le melayu pasar',
        description: 'Pendant plus d’un millénaire, le malais côtier (malais des bazars) a servi de langue d’échange neutre reliant les sultans des îles aux Épices, les marchands chinois et les négociants arabes.',
        highlight: 'Langue véhiculaire neutre du commerce maritime'
      },
      {
        era: '28 octobre 1928',
        title: 'Le Serment de la jeunesse (Sumpah Pemuda)',
        description: 'De jeunes patriotes indonésiens prirent une décision visionnaire : plutôt que d’imposer le javanais (pourtant majoritaire démographiquement), ils choisirent le malais neutre afin d’assurer une fraternité égale entre les 700 langues locales.',
        highlight: '« Une patrie, une nation, une langue »'
      }
    ],
    linguisticTraits: [
      {
        title: 'La réduplication pour exprimer le pluriel',
        description: 'Pour mettre un nom au pluriel en indonésien, il suffit souvent de répéter le mot ! Anak signifie enfant, donc anak-anak signifie enfants. Buku signifie livre, donc buku-buku signifie livres.',
        icon: '🔁',
        example: 'Orang (personne) → orang-orang (personnes)'
      },
      {
        title: 'Le système d’affixes (Me-, Di-, Ber-, Pe-)',
        description: 'Si l’indonésien ne conjugue pas ses verbes selon le temps, un riche jeu de préfixes et de suffixes transforme les racines en verbes actifs, verbes passifs et noms abstraits.',
        icon: '🧩',
        example: 'Tulis (écrire) → menulis (écrire [actif]) → ditulis (est écrit)'
      }
    ],
    culturalNote: 'L’indonésien est largement considéré par les linguistes comme l’une des langues les plus accessibles au monde pour commencer à converser dès le premier jour.'
  },

  es: {
    title: 'De la Castille aux Amériques : l’épopée mondiale de l’espagnol',
    tagline: 'Né du latin vulgaire, enrichi par 700 ans d’arabe et parlé par plus de 500 millions de personnes dans 21 nations.',
    speakersCount: 'Plus de 500 millions de locuteurs natifs (n° 2 mondial)',
    writingSystem: 'Alphabet latin espagnol (27 lettres dont le Ñ)',
    languageFamily: 'Indo-européenne (romane)',
    facts: [
      { label: 'Locuteurs natifs', value: '2e langue maternelle la plus parlée au monde', icon: '🌎' },
      { label: 'Influence arabe', value: 'Plus de 4 000 mots d’origine arabe (azúcar, alcalde, ojalá)', icon: '🕌' },
      { label: 'Première grammaire moderne', value: 'Antonio de Nebrija (1492)', icon: '📖' },
      { label: 'Ponctuation inversée', value: '¡Exclamation ouvrante ! et ¿interrogation ouvrante ?', icon: '❓' },
      { label: 'Langue officielle dans', value: '21 pays répartis sur 4 continents', icon: '🏛️' },
      { label: 'Chef-d’œuvre littéraire', value: 'Don Quichotte de Miguel de Cervantes', icon: '🛡️' }
    ],
    historyTimeline: [
      {
        era: 'v. 200 av. J.-C. – 400 apr. J.-C.',
        title: 'L’Hispanie romaine et le latin vulgaire',
        description: 'Soldats, marchands et administrateurs romains implantèrent le latin vulgaire parlé dans la péninsule Ibérique, supplantant progressivement les langues celtiques et ibères.',
        highlight: 'Racines latines de l’espagnol'
      },
      {
        era: '711 – 1492 apr. J.-C.',
        title: 'Al-Andalus et l’héritage lexical arabe',
        description: 'Près de huit siècles de présence arabo-andalouse ont enrichi l’espagnol de milliers de termes scientifiques, agricoles et architecturaux, souvent introduits par l’article arabe « al- ».',
        highlight: 'Plus de 4 000 emprunts arabes dans le vocabulaire courant'
      },
      {
        era: '1492',
        title: 'La Grammaire de Nebrija et l’essor vers les Amériques',
        description: 'Antonio de Nebrija publia la toute première grammaire d’une langue vernaculaire européenne moderne et la présenta à la reine Isabelle la Catholique.',
        highlight: 'Première grammaire d’une langue européenne moderne'
      }
    ],
    linguisticTraits: [
      {
        title: 'La ponctuation inversée (¿ ? et ¡ !)',
        description: 'L’espagnol est la seule grande langue au monde qui indique au lecteur l’intonation interrogative ou exclamative dès le tout début de la phrase grâce à des signes d’ouverture inversés.',
        icon: '❓',
        example: '¿Cómo estás? · ¡Qué bueno!'
      },
      {
        title: 'Ser et estar (deux manières d’« être »)',
        description: 'L’espagnol distingue l’identité ou l’essence permanente (ser) de l’état passager ou du lieu (estar). « Soy feliz » signifie être d’un naturel heureux ; « estoy feliz » signifie se sentir heureux en ce moment.',
        icon: '⚖️',
        example: 'Soy profesor (identité) vs Estoy cansado (état actuel)'
      }
    ],
    culturalNote: 'L’espagnol est parlé dans 21 nations souveraines, chacune enrichissant la langue de traditions musicales vibrantes, de géants littéraires et d’expressions régionales savoureuses.'
  },

  fr: {
    title: 'La langue de la raison, de la diplomatie et de la Francophonie',
    tagline: 'La langue historique des traités, de la philosophie des Lumières et de plus de 320 millions de locuteurs dans le monde.',
    speakersCount: 'Plus de 320 millions de locuteurs au total',
    writingSystem: 'Alphabet latin français (26 lettres + signes diacritiques)',
    languageFamily: 'Indo-européenne (romane)',
    facts: [
      { label: 'Rayonnement mondial', value: 'Langue officielle dans 29 pays', icon: '🌍' },
      { label: 'Tradition diplomatique', value: 'Langue historique des traités internationaux', icon: '🕊️' },
      { label: 'Gardienne de la langue', value: 'Académie française (fondée en 1635 par Richelieu)', icon: '🏛️' },
      { label: 'Jeux olympiques et poste', value: 'Langue officielle du CIO et de l’UPU', icon: '🏅' },
      { label: 'Genres grammaticaux', value: '2 (masculin et féminin)', icon: '⚖️' },
      { label: 'Nuances vocaliques', value: 'Voyelles nasales (an, on, in, un)', icon: '🍷' }
    ],
    historyTimeline: [
      {
        era: '842 apr. J.-C.',
        title: 'Les Serments de Strasbourg',
        description: 'Le plus ancien document conservé rédigé dans une langue romane distincte du latin, prêté par les petits-fils de Charlemagne.',
        highlight: 'Plus ancien texte attesté en proto-français'
      },
      {
        era: '1539',
        title: 'L’ordonnance de Villers-Cotterêts',
        description: 'Le roi François Ier décréta que le français, et non plus le latin ecclésiastique, devait être employé dans tous les actes de justice, lois et édits royaux, unifiant l’administration du royaume.',
        highlight: 'Le français proclamé langue officielle de l’État'
      },
      {
        era: 'XVIIIe siècle',
        title: 'Le siècle des Lumières et la langue véhiculaire européenne',
        description: 'Le français devint la langue des cours royales européennes, de la diplomatie et des penseurs des Lumières tels que Voltaire, Rousseau et Diderot.',
        highlight: 'Langue universelle de la diplomatie'
      }
    ],
    linguisticTraits: [
      {
        title: 'La liaison et l’euphonie fluide',
        description: 'Le français accorde une importance primordiale à l’harmonie sonore (l’euphonie). Des consonnes finales habituellement muettes se prononcent pour se lier à la voyelle initiale du mot suivant (les amis → [le.za.mi]).',
        icon: '🎶',
        example: 'C’est un ami (Prononcé : [sɛ.t‿œ̃.na.mi])'
      },
      {
        title: 'Les voyelles nasales',
        description: 'Le français possède des voyelles nasales caractéristiques où l’air résonne simultanément par la bouche et par le nez (pain, bon, vent, un).',
        icon: '👃',
        example: 'Bon · Vin · Temps (trois timbres nasaux distincts)'
      }
    ],
    culturalNote: 'Aujourd’hui, la majorité des francophones de la planète vit sur le continent africain, faisant du français l’une des langues les plus dynamiques du XXIe siècle.'
  },

  de: {
    title: 'La langue des poètes, des penseurs et de l’ingénierie de précision',
    tagline: 'De la Bible de Martin Luther à la physique d’Einstein et à ses célèbres mots composés.',
    speakersCount: 'Plus de 130 millions de locuteurs au total',
    writingSystem: 'Alphabet latin allemand (26 lettres + ä, ö, ü, ß)',
    languageFamily: 'Indo-européenne (germanique occidentale)',
    facts: [
      { label: 'N° 1 dans l’UE', value: '1re langue maternelle de l’Union européenne', icon: '🇪🇺' },
      { label: 'Mots composés', value: 'Noms soudés entre eux pour exprimer des concepts précis', icon: '🧩' },
      { label: 'Cas grammaticaux', value: '4 cas (nominatif, accusatif, datif, génitif)', icon: '🏛️' },
      { label: 'Genres', value: '3 (der masculin, die féminin, das neutre)', icon: '⚖️' },
      { label: 'Majuscule aux noms', value: 'Tous les noms communs prennent une majuscule à l’écrit', icon: '🔠' },
      { label: 'Héritage scientifique', value: 'Langue de Goethe, Kant, Beethoven et Einstein', icon: '🔬' }
    ],
    historyTimeline: [
      {
        era: 'VIe – VIIIe siècle',
        title: 'La seconde mutation consonantique (haut allemand)',
        description: 'Une évolution phonétique majeure sépara l’allemand de ses cousines germaniques (anglais et néerlandais), transformant notamment le « t » en « z/ss » (anglais « water » → allemand « Wasser », « two » → « zwei »).',
        highlight: 'Divergence au sein du germanique occidental'
      },
      {
        era: '1522',
        title: 'La traduction de la Bible par Martin Luther',
        description: 'Martin Luther traduisit le Nouveau Testament dans une langue de chancellerie saxonne vivante et accessible, forgeant une norme littéraire allemande commune à partir de centaines de dialectes régionaux.',
        highlight: 'Naissance de l’allemand standard moderne (Hochdeutsch)'
      }
    ],
    linguisticTraits: [
      {
        title: 'La majuscule systématique aux noms',
        description: 'L’allemand est la seule grande langue au monde où chaque nom commun s’écrit avec une majuscule initiale, rendant les sujets, objets et concepts immédiatement repérables à la lecture.',
        icon: '🔠',
        example: 'Das Buch (Le livre) · Die Zeit (Le temps)'
      },
      {
        title: 'De légendaires mots composés',
        description: 'L’allemand fusionne aisément plusieurs noms en définitions conceptuelles limpides. Un gant est un « soulier de main » (Handschuh) et un réfrigérateur une « armoire froide » (Kühlschrank).',
        icon: '🧩',
        example: 'Kühlschrank (Armoire froide = Réfrigérateur)'
      }
    ],
    culturalNote: 'L’allemand demeure une langue majeure de la philosophie, de la musique classique et de l’innovation industrielle de pointe en Allemagne, en Autriche et en Suisse.'
  },

  pt: {
    title: 'La langue de Camões et des grandes routes océaniques',
    tagline: 'Parlée sur 4 continents, de Lisbonne à Rio de Janeiro, Luanda et Maputo.',
    speakersCount: 'Plus de 260 millions de locuteurs natifs',
    writingSystem: 'Alphabet latin portugais (26 lettres + signes diacritiques)',
    languageFamily: 'Indo-européenne (romane)',
    facts: [
      { label: 'Hémisphère Sud', value: 'Langue la plus parlée de l’hémisphère Sud', icon: '🌎' },
      { label: 'Poète national', value: 'Luís de Camões (Les Lusiades, 1572)', icon: '📜' },
      { label: 'Tildes nasaux', value: 'Le célèbre tilde (ã, õ) aux sonorités nasales chantantes', icon: '🎵' },
      { label: 'Genres', value: '2 (masculin en -o, féminin en -a)', icon: '⚖️' },
      { label: 'L’esprit de la saudade', value: 'Nostalgie intraduisible et tendre mélancolie', icon: '💖' },
      { label: 'Plus grand foyer', value: 'Le Brésil regroupe près de 80 % des locuteurs', icon: '🇧🇷' }
    ],
    historyTimeline: [
      {
        era: 'IXe – XIIe siècle',
        title: 'Le galicien-portugais (Galego-Português)',
        description: 'Issu du latin vulgaire au nord-ouest de la péninsule Ibérique, le galicien-portugais devint la langue privilégiée de la poésie lyrique des troubadours médiévaux.',
        highlight: 'Âge d’or de la poésie lyrique médiévale'
      },
      {
        era: 'XVe – XVIe siècle',
        title: 'L’ère des Grandes Découvertes et le rayonnement maritime',
        description: 'Les navigateurs portugais tels que Vasco de Gama portèrent la langue par-delà les océans jusqu’au Brésil, en Afrique (Angola, Mozambique), en Inde (Goa) et à Macao.',
        highlight: 'Expansion maritime mondiale'
      }
    ],
    linguisticTraits: [
      {
        title: 'Les voyelles nasales à tilde (ã, õ)',
        description: 'Le tilde était à l’origine un petit « n » abrégé du latin médiéval tracé au-dessus d’une voyelle (canção provient de cantionem). Il confère au portugais sa résonance nasale chaleureuse et immédiatement reconnaissable.',
        icon: '🎵',
        example: 'Pão (Pain) · Não (Non) · Coração (Cœur)'
      },
      {
        title: 'La saudade : l’âme de la langue',
        description: 'Souvent citée parmi les plus beaux mots intraduisibles du monde, la saudade exprime le désir doux-amer et nostalgique d’un être cher ou d’un lieu lointain.',
        icon: '💖',
        example: 'Tenho saudades de você (Tu me manques profondément)'
      }
    ],
    culturalNote: 'Le portugais est la langue officielle de neuf pays réunis au sein de la CPLP (Communauté des pays de langue portugaise).'
  },

  en: {
    title: 'La langue véhiculaire mondiale : des racines anglo-saxonnes à Internet',
    tagline: 'Comment une langue insulaire a absorbé le latin, le vieux norrois et le français pour devenir la langue commune du globe.',
    speakersCount: 'Plus de 1,5 milliard de locuteurs au total',
    writingSystem: 'Alphabet latin anglais (26 lettres)',
    languageFamily: 'Indo-européenne (germanique occidentale)',
    facts: [
      { label: 'Statut mondial', value: 'Langue véhiculaire des sciences, des technologies et de l’aviation', icon: '🌐' },
      { label: 'Vocabulaire hybride', value: '~60 % de racines latines/françaises + ~26 % germaniques', icon: '🧬' },
      { label: 'Richesse lexicale', value: 'Plus de 500 000 mots recensés dans le dictionnaire d’Oxford', icon: '📚' },
      { label: 'Simplicité grammaticale', value: 'Aucun genre grammatical, flexion verbale minimale', icon: '✨' },
      { label: 'Orthographe singulière', value: 'Graphies historiques figées malgré l’évolution des sons', icon: '🎩' },
      { label: 'Univers numérique', value: 'Langue principale des logiciels, d’Internet et du code', icon: '💻' }
    ],
    historyTimeline: [
      {
        era: 'v. 450 apr. J.-C.',
        title: 'Le vieil anglais (influences anglo-saxonnes et vikings)',
        description: 'Des peuples germaniques (Angles, Saxons, Jutes) s’établirent en Grande-Bretagne. Les incursions vikings de langue vieil-islandais/vieux norrois laissèrent des mots quotidiens essentiels comme sky (ciel), skin (peau), take (prendre), they (ils/elles) et give (donner).',
        highlight: 'Poème épique anglo-saxon Beowulf'
      },
      {
        era: '1066 apr. J.-C.',
        title: 'La conquête normande et l’apport massif du français',
        description: 'Guillaume le Conquérant fit du français anglo-normand la langue de la cour royale et du droit, créant un célèbre vocabulaire à double niveau (animaux d’élevage germaniques face aux viandes servies à table d’origine française : pig/pork [cochon/porc], cow/beef [vache/bœuf]).',
        highlight: 'Essor considérable du lexique français et latin'
      },
      {
        era: 'v. 1600 apr. J.-C.',
        title: 'Shakespeare et la Bible du roi Jacques',
        description: 'William Shakespeare forgea plus de 1 700 mots et expressions nouvelles, tandis que la Bible du roi Jacques fixa la cadence poétique de l’anglais moderne à travers le monde.',
        highlight: 'Envol de l’anglais moderne'
      }
    ],
    linguisticTraits: [
      {
        title: 'Un lexique à double registre germanique et français',
        description: 'L’anglais dispose presque toujours de deux mots pour une même notion : un terme germanique concret et familier, et un équivalent d’origine française ou latine plus soutenu.',
        icon: '🧬',
        example: 'Ask (germanique : demander) vs Inquire (français : s’enquérir) · Kingly vs Royal (royal)'
      },
      {
        title: 'Absence totale de genre grammatical',
        description: 'Contrairement au français ou à l’allemand, l’anglais a abandonné le genre grammatical des noms il y a des siècles. L’article défini est invariablement « the » !',
        icon: '✨',
        example: 'The sun (le soleil), the moon (la lune), the table (la table) — aucun genre à mémoriser.'
      }
    ],
    culturalNote: 'L’anglais constitue aujourd’hui la langue passerelle incontournable de la recherche scientifique mondiale, de l’aviation, du commerce international et du Web.'
  }
};
