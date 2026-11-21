import { AboutLanguageTranslations } from './types';

export const ABOUT_TRANSLATIONS_DE: AboutLanguageTranslations = {
  zh: {
    title: 'Die Geschichte des Mandarin und des vereinfachten Chinesisch',
    tagline: 'Von 3.000 Jahre alten Orakelknochen über die Alphabetisierungsrevolution der 1950er-Jahre bis zur Geburt von Pinyin.',
    speakersCount: 'Über 1,1 Milliarden Muttersprachler',
    writingSystem: 'Vereinfachte chinesische Schriftzeichen (简体字) & Hanyu Pinyin (汉语拼音)',
    languageFamily: 'Sinotibetisch',
    facts: [
      { label: 'Muttersprachler', value: '1,1 Milliarden (Platz 1 weltweit)', icon: '👥' },
      { label: 'Amtliche Schrift', value: 'Vereinfachte Schriftzeichen (简体字)', icon: '✍️' },
      { label: 'Lautschrift-Brücke', value: 'Hanyu Pinyin (eingeführt 1958)', icon: '🔤' },
      { label: 'Standarddialekt', value: 'Pekinger Lautung', icon: '📍' },
      { label: 'Verbkonjugation', value: 'Keine (keine Vergangenheits- oder Zukunftsformen)', icon: '✨' },
      { label: 'UNO-Amtssprache', value: 'Seit 1946', icon: '🌐' }
    ],
    historyTimeline: [
      {
        era: 'ca. 1200 v. Chr.',
        title: 'Orakelknochenschrift (甲骨文 · Jiǎgǔwén)',
        description: 'Die älteste bekannte chinesische Schrift, während der Shang-Dynastie zu Weissagungszwecken in Schildkrötenpanzer und Rinderschulterblätter geritzt. Die Zeichen waren direkte bildhafte Darstellungen von Naturelementen wie Sonne (日) und Wasser (水).',
        highlight: 'Geburt der chinesischen Schrift'
      },
      {
        era: '221 v. Chr.',
        title: 'Kaiserliche Schriftvereinheitlichung (秦始皇 · Kleine Siegelschrift)',
        description: 'Der erste Kaiser Chinas, Qin Shi Huang, vereinheitlichte Hunderte regionale Schriftvarianten zu einer landesweiten Kleinen Siegelschrift und Kanzleischrift, sodass Erlasse unabhängig vom gesprochenen Dialekt in allen Provinzen identisch gelesen werden konnten.',
        highlight: 'Reichseinigung Chinas'
      },
      {
        era: 'ca. 200 n. Chr. – 1950er-Jahre',
        title: 'Traditionelle Regelschrift (繁体楷书 · Fántǐ Kǎishū)',
        description: 'Fast 1.800 Jahre lang blieb das traditionelle Chinesisch der Maßstab für Literatur, Verwaltung und Dichtkunst. Komplexe Zeichen mit 20 bis 30 Strichen stellten jedoch für die einfache arbeitende Bevölkerung eine enorme Bildungshürde dar.',
        highlight: 'Epoche der klassischen Literatur'
      },
      {
        era: '1949 – 1956',
        title: 'Bildungsoffensive und vereinfachte Schriftzeichen (简体字)',
        description: 'Im Jahr 1949 lag die Analphabetenquote in China bei über 80 %. Um Bildung rasch für alle zugänglich zu machen, führte die Regierung das Programm zur Vereinfachung der chinesischen Schriftzeichen (汉字简化方案) ein. Über 2.200 komplexe Zeichen wurden mithilfe jahrhundertealter Kursivformen systematisch verschlankt.',
        highlight: 'Alphabetisierungsrate stieg von 20 % auf über 96 %'
      },
      {
        era: '1958',
        title: 'Zhou Youguang und die Erfindung von Pinyin (汉语拼音)',
        description: 'Der Ökonom und Sprachwissenschaftler Zhou Youguang leitete den Ausschuss für die Chinesische Schriftreform zur Entwicklung von Hanyu Pinyin. Mithilfe des lateinischen Alphabets schuf Pinyin eine leicht zugängliche Lautschriftbrücke, auf der heute Computertastaturen und Smartphones basieren.',
        highlight: 'Zhou Youguang wurde 111 Jahre alt (1906–2017)'
      }
    ],
    scriptComparison: [
      {
        traditional: '國',
        simplified: '国',
        pinyin: 'guó',
        meaning: 'Land / Nation',
        traditionalStrokes: 11,
        simplifiedStrokes: 8,
        reason: 'Ersetzte das komplexe innere Waffen-Radikal durch das Zeichen für Jade (玉) – als Sinnbild eines Schatzes innerhalb geschützter Landesgrenzen (囗).'
      },
      {
        traditional: '學',
        simplified: '学',
        pinyin: 'xué',
        meaning: 'Studieren / Lernen',
        traditionalStrokes: 16,
        simplifiedStrokes: 8,
        reason: 'Reduzierte das aufwendige 16-strichige Gelehrtendach auf eine fließende 8-strichige Kursivform, die informell schon seit Jahrhunderten gebräuchlich war.'
      },
      {
        traditional: '愛',
        simplified: '爱',
        pinyin: 'ài',
        meaning: 'Liebe',
        traditionalStrokes: 13,
        simplifiedStrokes: 10,
        reason: 'Ersetzte das komplexe mittlere Herz-Radikal (心) durch die Kurzform für Freund/Verbundenheit (友), um flüssigeres und schnelleres Schreiben zu ermöglichen.'
      },
      {
        traditional: '門',
        simplified: '门',
        pinyin: 'mén',
        meaning: 'Tür / Tor',
        traditionalStrokes: 8,
        simplifiedStrokes: 3,
        reason: 'Vereinfachte zwei detaillierte Türflügel zu einem offenen Türrahmen aus nur 3 Strichen.'
      },
      {
        traditional: '馬',
        simplified: '马',
        pinyin: 'mǎ',
        meaning: 'Pferd',
        traditionalStrokes: 10,
        simplifiedStrokes: 3,
        reason: 'Fasste Mähne, Beine und Schweif zu 3 schwungvollen, durchgehenden Pinselstrichen zusammen.'
      }
    ],
    linguisticTraits: [
      {
        title: 'Keine Verbkonjugation',
        description: 'Anders als im Deutschen oder Französischen mit zahlreichen Verbendungen verändern sich chinesische Verben nie! „Essen“ (吃 chī) bleibt identisch für ich esse, du isst, wir aßen oder sie werden essen. Die Zeitstufe wird schlicht über Zeitwörter (gestern, morgen) oder Aspektpartikeln (了 le) ausgedrückt.',
        icon: '⚡',
        example: '我吃 (Ich esse) · 我昨天吃了 (Gestern aß ich)'
      },
      {
        title: 'Kein grammatisches Geschlecht und keine Pluralendungen',
        description: 'Es gibt weder Artikel wie der/die/das noch Pluralendungen bei Substantiven. Ein Apfel heißt 一个苹果 und fünf Äpfel heißt 五个苹果.',
        icon: '🍎',
        example: '苹果 (Apfel) bleibt immer 苹果, im Singular wie im Plural.'
      },
      {
        title: 'Zählwörter (Klassifikatoren)',
        description: 'Beim Zählen von Dingen steht im Mandarin stets ein passendes Zählwort zwischen Zahl und Nomen, das sich nach Form oder Kategorie richtet (z. B. 本 běn für Bücher, 辆 liàng für Fahrzeuge, 张 zhāng für flache Gegenstände).',
        icon: '📏',
        example: '一本书 (Ein Buch) · 一辆车 (Ein Auto)'
      },
      {
        title: 'Tonsprache (4 Töne)',
        description: 'Mandarin nutzt 4 ausgeprägte Tonhöhenverläufe (hoch-eben, steigend, fallend-steigend, scharf fallend) sowie einen neutralen Ton. Eine veränderte Tonhöhe ergibt ein völlig anderes Schriftzeichen und eine neue Bedeutung.',
        icon: '🎵',
        example: 'mā (Mutter 妈) vs. mǎ (Pferd 马)'
      }
    ],
    culturalNote: 'Heute ist das vereinfachte Chinesisch der Standard in Festlandchina, Singapur und internationalen Organisationen wie der UNO, während die traditionellen Langzeichen in Taiwan, Hongkong, Macau und in der klassischen Kalligrafie weitergepflegt werden.'
  },

  ko: {
    title: 'Das Wunder des Hangul: Ein königliches Geschenk der Lesekunst',
    tagline: 'Im Jahr 1443 schuf König Sejong eines der wissenschaftlich durchdachtesten Alphabete der Welt.',
    speakersCount: 'Über 80 Millionen Muttersprachler',
    writingSystem: 'Hangul (한글) — Lautphysiologisches Buchstabenalphabet',
    languageFamily: 'Koreanisch (isolierte Sprache)',
    facts: [
      { label: 'Schöpfer', value: 'König Sejong der Große (1443)', icon: '👑' },
      { label: 'Alphabetsystem', value: '24 Grundbuchstaben (Konsonanten & Vokale)', icon: '🔤' },
      { label: 'Wissenschaftliches Prinzip', value: 'Buchstabenformen bilden Mund & Zunge nach', icon: '👅' },
      { label: 'Nationalfeiertag', value: 'Hangul-Tag (9. Oktober)', icon: '🎉' },
      { label: 'Satzbau', value: 'SOV (Subjekt-Objekt-Verb)', icon: '🧱' },
      { label: 'Höflichkeitsstufen', value: 'Respektformen fest in der Grammatik verankert', icon: '🙇' }
    ],
    historyTimeline: [
      {
        era: 'Vor 1443',
        title: 'Die Bürde der Hanja (chinesische Schriftzeichen)',
        description: 'Koreaner besaßen keine eigene Schrift und schrieben mit komplexen chinesischen Zeichen (Hanja). Da Chinesisch und Koreanisch völlig unterschiedlichen Sprachfamilien angehören, hatte nur die wohlhabende Adelselite (Yangban) die nötigen Jahrzehnte Zeit, um Lesen und Schreiben zu erlernen.',
        highlight: 'Das einfache Volk konnte weder Gesetze lesen noch Briefe verfassen'
      },
      {
        era: '1443 – 1446',
        title: 'König Sejong verkündet das Hunminjeongeum',
        description: 'Entschlossen, allen Bürgern Bildung zu ermöglichen, entwickelte König Sejong gemeinsam mit Hofgelehrten im Geheimen das Hangul. 1446 veröffentlichte er das Hunminjeongeum („Die richtigen Laute zur Unterweisung des Volkes“) mit dem Anspruch, Schreiben solle so mühelos sein wie das Atmen.',
        highlight: '„Ein Weiser erlernt es an einem Vormittag, ein Tor in zehn Tagen.“'
      },
      {
        era: '20. Jahrhundert',
        title: 'Demokratisierung und die Hallyu-Welle',
        description: 'Trotz jahrhundertelangen Widerstands traditioneller Eliten setzte sich Hangul in der Moderne durch, führte Südkorea zu einer der höchsten Alphabetisierungsraten weltweit (99 %) und trägt heute den globalen Kulturexport (K-Pop, K-Dramen).',
        highlight: 'UNESCO-König-Sejong-Alphabetisierungspreis 1989 gestiftet'
      }
    ],
    linguisticTraits: [
      {
        title: 'Artikulatorische Schrift (Nachbildung von Mund & Zunge)',
        description: 'Die Buchstaben des Hangul sind nicht willkürlich geformt: ㄱ zeigt die Zunge am Gaumensegel, ㄴ die Zungenspitze am oberen Zahndamm und ㅁ die Kontur der geschlossenen Lippen.',
        icon: '👅',
        example: 'ㅁ (m) zeigt geschlossene Lippen; ㅂ (b) ergänzt Striche für den Verschlusslaut.'
      },
      {
        title: 'Quadratische Silbenblock-Architektur',
        description: 'Buchstaben werden nicht einzeln hintereinander gereiht, sondern zu quadratischen Silbenblöcken gestapelt. So fügen sich h (ㅎ) + a (ㅏ) + n (ㄴ) harmonisch zu „한“ (han) zusammen.',
        icon: '🧱',
        example: 'ㅎ + ㅏ + ㄴ = 한 (Han)'
      },
      {
        title: 'Subjekt-Objekt-Verb-Wortstellung (SOV)',
        description: 'Im Koreanischen steht das Verb grundsätzlich ganz am Ende des Satzes. „Ich esse einen Apfel“ lautet wörtlich „Ich Apfel esse“ (저는 사과를 먹어요).',
        icon: '🔄',
        example: '저는 (Ich) + 사과를 (Apfel) + 먹어요 (Esse)'
      }
    ],
    culturalNote: 'Der Hangul-Tag wird in Südkorea jedes Jahr am 9. Oktober als gesetzlicher Nationalfeiertag begangen, um diese königliche Schöpfung sprachlicher Freiheit zu ehren.'
  },

  ja: {
    title: 'Die Harmonie dreier Schriften (漢字 · ひらがな · カタカナ)',
    tagline: 'Eine elegante sprachliche Symphonie aus chinesischen Begriffszeichen und zwei einheimischen Silbenschriften.',
    speakersCount: 'Über 125 Millionen Muttersprachler',
    writingSystem: 'Kanji (漢字), Hiragana (ひらがな) und Katakana (カタカナ)',
    languageFamily: 'Japonisch',
    facts: [
      { label: 'Aktive Schriften', value: '3 ineinandergreifende Schriftsysteme', icon: '✍️' },
      { label: 'Jōyō-Kanji', value: '2.136 in der Schule gelehrte Schriftzeichen', icon: '📚' },
      { label: 'Wortstellung', value: 'SOV (das Verb steht immer am Satzende)', icon: '🔄' },
      { label: 'Tonsystem', value: 'Tonhöhenakzent (Hoch-/Tiefton)', icon: '🎵' },
      { label: 'Lehnwörter', value: 'In Katakana geschrieben (z. B. コーヒー)', icon: '☕' },
      { label: 'Partikeln', value: 'Grammatische Funktionswörter (は, が, を, に)', icon: '🏷️' }
    ],
    historyTimeline: [
      {
        era: '5. Jahrhundert',
        title: 'Ankunft der Kanji vom asiatischen Festland',
        description: 'Vor dem Kontakt mit China war Japanisch eine rein gesprochene Sprache. Chinesische Schriftzeichen (Kanji) wurden übernommen, um japanische Namen, Gesetzestexte und buddhistische Sutras niederzuschreiben.',
        highlight: 'Übernahme chinesischer Wortzeichen'
      },
      {
        era: '8. – 10. Jahrhundert',
        title: 'Die Erfindung der Hiragana und die Hofdamenliteratur',
        description: 'Adelige Hofdamen vereinfachten kursive Kanji zu fließenden Lautsilben namens Hiragana („Frauenhand“). Dies brachte weltberühmte Meisterwerke der japanischen Literatur hervor, darunter Die Geschichte vom Prinzen Genji von Murasaki Shikibu.',
        highlight: 'Geburt der eigenen japanischen Lautschrift'
      },
      {
        era: 'Neuzeit',
        title: 'Katakana und die Aufnahme internationalen Wortschatzes',
        description: 'Katakana – ursprünglich von buddhistischen Mönchen als Lesehilfe aus Teilzeichen entwickelt – wurde zur festen Schrift für moderne Fachbegriffe, ausländische Namen und globale Lehnwörter (z. B. コンピューター konpyūtā).',
        highlight: 'Drei Schriften im nahtlosen Zusammenspiel'
      }
    ],
    linguisticTraits: [
      {
        title: 'Das dreiteilige Schriftsystem',
        description: 'Oft vereint ein einziger Satz alle drei Schriften: Kanji tragen die Wortstämme (私 ich, 食べる essen), Hiragana bilden Grammatikendungen und Partikeln (は, を, ました), und Katakana geben Fremdwörter wieder (パン Brot).',
        icon: '🧩',
        example: '私はパンを食べました (Ich habe Brot gegessen)'
      },
      {
        title: 'Grammatische Partikeln (助詞 · Joshi)',
        description: 'Kurze nachgestellte Partikeln kennzeichnen präzise die Rolle jedes Wortes im Satz (は Thema, が Subjekt, を direktes Objekt, に Ziel oder Zeitpunkt).',
        icon: '🏷️',
        example: '猫が (die Katze [Subjekt]) + 魚を (Fisch [Objekt]) + 食べた (fraß)'
      }
    ],
    culturalNote: 'Wer Japanisch lernt, entdeckt ein tiefes kulturelles Zusammenspiel aus visueller Kalligrafie, respektvollen Höflichkeitsebenen (Keigo) und feinsinniger, kontextbezogener Kommunikation.'
  },

  ru: {
    title: 'Die slawische Seele: Von kyrillischen Mönchen zu Puschkin & Tolstoi',
    tagline: 'Eine klangvolle, ausdrucksstarke Sprache, geformt von byzantinischen Gelehrten, Peter dem Großen und großen Dichtern.',
    speakersCount: 'Über 255 Millionen Sprecher insgesamt',
    writingSystem: 'Russisch-kyrillisches Alphabet (33 Buchstaben)',
    languageFamily: 'Indogermanisch (Ostslawisch)',
    facts: [
      { label: 'Alphabet', value: '33 Buchstaben (10 Vokale, 21 Konsonanten, 2 Zeichen)', icon: '🔤' },
      { label: 'Schriftreformen', value: 'Peter der Große (1708) & Reform von 1918', icon: '📜' },
      { label: 'Kasussystem', value: '6 grammatische Fälle', icon: '🏛️' },
      { label: 'Geschlechter', value: '3 (Maskulinum, Femininum, Neutrum)', icon: '⚖️' },
      { label: 'Weltraumsprache', value: 'Pflichtsprache auf der ISS neben Englisch', icon: '🚀' },
      { label: 'Goldenes Literaturzeitalter', value: 'Puschkin, Tolstoi, Dostojewski, Tschechow', icon: '📖' }
    ],
    historyTimeline: [
      {
        era: 'ca. 863 n. Chr.',
        title: 'Die Heiligen Kyrill und Method',
        description: 'Die byzantinischen Gelehrtenbrüder Kyrill und Method schufen die glagolitische Schrift zur Bibelübersetzung für die slawischen Völker, woraus im Ersten Bulgarischen Reich bald das kyrillische Alphabet hervorging.',
        highlight: 'Geburtsstunde der kyrillischen Schrift'
      },
      {
        era: '1708',
        title: 'Die bürgerliche Schriftreform Peters des Großen (Гражданский шрифт)',
        description: 'Zar Peter der Große strich eigenhändig altertümliche kirchengriechische Buchstaben und passte die russische Druckschrift an westeuropäische Antiqua-Vorbilder an, um Wissenschaft, Seekarten und Buchdruck zu modernisieren.',
        highlight: 'Säkularisierung und Modernisierung'
      },
      {
        era: '1918',
        title: 'Die große Rechtschreibreform nach der Revolution',
        description: 'Nach der Revolution vereinfachte eine Reform die Rechtschreibung durch die Abschaffung überflüssig gewordener historischer Buchstaben (wie ѣ „Jat“, ѳ „Fita“ und das auslautende ъ), wodurch das heutige 33-buchstabige Alphabet entstand.',
        highlight: 'Einführung des heutigen 33-Buchstaben-Standards'
      }
    ],
    linguisticTraits: [
      {
        title: 'Beweglicher Wortakzent',
        description: 'Die Betonung ist im Russischen frei beweglich und kann die Bedeutung eines Wortes verändern (за́мок = Schloss/Burg vs. замо́к = Vorhängeschloss). Ein unbetontes „o“ klingt in der Aussprache natürlich wie ein „a“ (молоко́ → malakó).',
        icon: '🎯',
        example: 'за́мок (Schloss/Burg) vs. замо́к (Vorhängeschloss)'
      },
      {
        title: 'Weiche und harte Konsonanten (Palatalisierung)',
        description: 'Nahezu jeder Konsonant existiert als hartes (unpalatalisiertes) oder weiches (palatalisiertes) Paar – erkennbar am nachfolgenden Vokal oder am Weichheitszeichen (ь).',
        icon: '🎶',
        example: 'брат (Bruder) vs. брать (nehmen)'
      }
    ],
    culturalNote: 'Russisch gehört zu den sechs Amtssprachen der Vereinten Nationen und ist die verbindliche zweite Arbeitssprache an Bord der Internationalen Raumstation (ISS).'
  },

  tr: {
    title: 'Das Wunder von 1928: Atatürks Alphabetrevolution',
    tagline: 'Wie eine ganze Nation innerhalb weniger Monate von der osmanisch-arabischen Schrift zu einem lautgetreuen lateinischen Alphabet wechselte.',
    speakersCount: 'Über 85 Millionen Muttersprachler',
    writingSystem: 'Türkisches Lateinalphabet (29 Buchstaben)',
    languageFamily: 'Turksprachen',
    facts: [
      { label: 'Die Reform von 1928', value: 'Harf Devrimi (Atatürks Buchstabenrevolution)', icon: '🏛️' },
      { label: 'Alphabet', value: '29 Buchstaben (vollkommen lautgetreu: 1 Zeichen = 1 Laut)', icon: '🔤' },
      { label: 'Sprachbau', value: 'Agglutinierend (logische Ketten von Nachsilben)', icon: '🧱' },
      { label: 'Vokalharmonie', value: 'Helle und dunkle Vokale stimmen harmonisch überein', icon: '🎵' },
      { label: 'Grammatisches Geschlecht', value: 'Keines! „Er“, „sie“ und „es“ heißen schlicht „o“', icon: '⚖️' },
      { label: 'Satzbau', value: 'SOV (Subjekt-Objekt-Verb)', icon: '🔄' }
    ],
    historyTimeline: [
      {
        era: '10. Jh. – 1928 n. Chr.',
        title: 'Osmanisches Türkisch und das unpassende arabische Schriftbild',
        description: 'Über 900 Jahre lang wurde Türkisch in osmanisch-arabischer Schrift geschrieben. Während die arabische Schrift jedoch nur 3 Grundvokale abbildet, besitzt das Türkische 8 bedeutungsunterscheidende Vokale. Dies führte zu Mehrdeutigkeiten und hielt die Lesequote unter 10 %.',
        highlight: 'Hoher Analphabetismus durch unpassendes Schriftsystem'
      },
      {
        era: '1928',
        title: 'Mustafa Kemal Atatürks Sprachrevolution (Harf Devrimi)',
        description: 'Der Staatsgründer der Türkischen Republik, Atatürk, reiste persönlich mit Wandtafeln durch Städte und Dörfer, um ein neues, präzise auf die türkische Lautung abgestimmtes 29-buchstabiges Lateinalphabet einzuführen (mit ç, ğ, ı, ö, ş, ü).',
        highlight: 'Alphabetisierungsrate stieg von 10 % auf über 90 %'
      }
    ],
    linguisticTraits: [
      {
        title: 'Agglutinierende Endungsketten',
        description: 'Wörter entstehen, indem man Endungen wie Bausteine an einen Wortstamm steckt. Ein einziges türkisches Wort kann ausdrücken, wofür man im Deutschen einen ganzen Satz benötigt!',
        icon: '🧱',
        example: 'Ev (Haus) → evler (Häuser) → evlerimde (in meinen Häusern)'
      },
      {
        title: 'Vokalharmonie (Ünlü Uyumu)',
        description: 'Die Vokale innerhalb eines Wortes harmonieren klanglich zwischen dunklen Vokalen (a, ı, o, u) und hellen Vokalen (e, i, ö, ü). Jede angehängte Endung passt ihren Vokal automatisch dem Wortstamm an.',
        icon: '🎶',
        example: 'araba-lar (Autos) vs. kedi-ler (Katzen)'
      }
    ],
    culturalNote: 'Da die türkische Rechtschreibung zu 100 % lautgetreu ist, kann man jedes Wort der Sprache korrekt aussprechen, sobald man die Laute der 29 Buchstaben beherrscht.'
  },

  ar: {
    title: 'Die Sprache der Beredsamkeit (لغة الضاد · Lughat al-Dad)',
    tagline: 'Eine traditionsreiche Wurzel-und-Muster-Sprache, die über 400 Millionen Sprecher in der arabischen Welt verbindet.',
    speakersCount: 'Über 400 Millionen Sprecher insgesamt',
    writingSystem: 'Arabisches Abdschad (28 Buchstaben, von rechts nach links)',
    languageFamily: 'Afroasiatisch (Semitisch)',
    facts: [
      { label: 'Schreibrichtung', value: 'Von rechts nach links', icon: '⬅️' },
      { label: 'Alphabet', value: '28 Buchstaben (Konsonanten und Langvokale)', icon: '🔤' },
      { label: 'Wurzelsystem', value: 'Dreibuchstabige Konsonantenwurzeln (Radikale)', icon: '🌱' },
      { label: 'Der besondere Laut', value: 'Dād (ض) — kommt fast ausschließlich im Arabischen vor', icon: '🗣️' },
      { label: 'Dualform', value: 'Eigene Formen für Einzahl, Zweizahl (Dual) und Mehrzahl', icon: '2️⃣' },
      { label: 'UNO-Welttag', value: 'Welttag der arabischen Sprache (18. Dezember)', icon: '🌐' }
    ],
    historyTimeline: [
      {
        era: '6. Jahrhundert n. Chr.',
        title: 'Vorislamische Dichtung (Mu’allaqāt)',
        description: 'Beduinische Dichter trugen kunstvoll gereimte Oden über Ehre und Mut in der Wüste frei aus dem Gedächtnis vor und begründeten damit das hohe sprachliche Ideal des klassischen Arabisch.',
        highlight: 'Blütezeit der vorislamischen Poesie'
      },
      {
        era: '7. Jahrhundert n. Chr.',
        title: 'Der Koran und die Bewahrung der Sprache',
        description: 'Die Offenbarung und schriftliche Fixierung des Korans kodifizierte die arabische Grammatik und Lautlehre und bewahrte die klassische Sprache über mehr als 1.400 Jahre hinweg nahezu unverändert.',
        highlight: 'Universelle liturgische Sprache des Islams'
      },
      {
        era: 'Moderne',
        title: 'Modernes Hocharabisch (الفصحى · Fus’ha)',
        description: 'Heute dient das Moderne Hocharabisch in 22 Ländern als gemeinsame Schriftsprache für Literatur, Nachrichten, Diplomatie und Bildung.',
        highlight: 'Gemeinsame Dachsprache der arabischen Welt'
      }
    ],
    linguisticTraits: [
      {
        title: 'Das 3-Konsonanten-Wurzelsystem (الجذر · Al-Jidhr)',
        description: 'Fast jedes arabische Wort entspringt einer dreibuchstabigen Konsonantenwurzel mit einer Grundbedeutung. Aus K-T-B (ك-ت-ب, „schreiben“) entstehen z. B. kitāb (Buch), kātib (Schreiber/Autor), maktab (Büro) und maktūb (geschrieben/vorherbestimmt).',
        icon: '🌱',
        example: 'ك-ت-ب → كتاب (Buch) · مكتبة (Bibliothek) · كاتب (Autor)'
      },
      {
        title: 'Fließende kursive Buchstabenverbindungen',
        description: 'Arabische Buchstaben verbinden sich zu einer geschwungenen Schreibschrift und verändern ihre Gestalt je nachdem, ob sie am Wortanfang, in der Wortmitte, am Wortende oder isoliert stehen.',
        icon: '✍️',
        example: 'ب am Wortanfang (بـ), in der Mitte (ـبـ) oder am Ende (ـب)'
      }
    ],
    culturalNote: 'Die arabische Kalligrafie gilt weltweit als eine der bedeutendsten und kunstvollsten Ausdrucksformen der bildenden Kunst.'
  },

  hi: {
    title: 'Die Stimme Indiens: Vom alten Sanskrit bis nach Bollywood',
    tagline: 'Geschrieben in der anmutigen Devanagari-Schrift („Stadt der Götter“) und gesprochen von über 600 Millionen Menschen.',
    speakersCount: 'Über 600 Millionen Sprecher insgesamt',
    writingSystem: 'Devanagari-Silbenschrift / Abugida (देवनागरी)',
    languageFamily: 'Indogermanisch (Indo-Arisch)',
    facts: [
      { label: 'Schriftzeichen', value: 'Devanagari-Schrift (11 Vokale, 33 Konsonanten & Ligaturen)', icon: '🔤' },
      { label: 'Oberlinie', value: 'Shirorekha (durchgehender waagerechter Kopfbalken)', icon: '📏' },
      { label: 'Schwestersprache', value: 'Im gesprochenen Alltag gegenseitig verständlich mit Urdu', icon: '🤝' },
      { label: 'Satzbau', value: 'SOV (Subjekt-Objekt-Verb)', icon: '🔄' },
      { label: 'Ursprungssprache', value: 'Sanskrit (संस्कृतम्)', icon: '🏛️' },
      { label: 'Weltweiter Wortschatz', value: 'Yoga, Avatar, Dschungel, Guru, Chai, Shampoo', icon: '🧘' }
    ],
    historyTimeline: [
      {
        era: 'ca. 1500 v. Chr.',
        title: 'Wurzeln im vedischen Sanskrit',
        description: 'Aus dem vedischen Sanskrit entwickelten sich regionale Prakrit-Mundarten, die von der Bevölkerung in ganz Nordindien im Alltag gesprochen wurden.',
        highlight: 'Vedische Hymnen & klassische Philosophie'
      },
      {
        era: '13. – 18. Jahrhundert',
        title: 'Die Entstehung des Hindustani',
        description: 'Das Sultanat von Delhi und die Mogulzeit brachten persisches, turksprachiges und arabisches Vokabular in die Alltagssprache und formten das Hindustani als lebendige Verkehrssprache der Basare und Dichtkunst.',
        highlight: 'Geburt der gemeinsamen Umgangssprache Hindustani'
      },
      {
        era: '1950',
        title: 'Amtssprache der Republik Indien',
        description: 'Standard-Hindi in Devanagari-Schrift wurde zur Amtssprache der Indischen Union erhoben und wird landesweit am Hindi Diwas (14. September) gefeiert.',
        highlight: 'Hindi Diwas wird jährlich am 14. September begangen'
      }
    ],
    linguisticTraits: [
      {
        title: 'Die tragende Oberlinie (Shirorekha · शिरोरेखा)',
        description: 'Die Zeichen der Devanagari-Schrift hängen wie Wäsche an einer Leine unter einem durchgehenden waagerechten Balken, der die Buchstaben eines Wortes optisch zusammenfasst.',
        icon: '📏',
        example: 'क + म + ल = कमल (Lotusblume)'
      },
      {
        title: 'Behauchte vs. unbehauchte Konsonanten',
        description: 'Hindi unterscheidet strikt zwischen unbehauchten und stark behauchten Verschlusslauten (k vs. kh, p vs. ph, t vs. th). Hält man die Hand vor den Mund, spürt man bei behauchten Lauten einen deutlichen Luftstoß.',
        icon: '💨',
        example: 'कल (Gestern/Morgen) vs. खल (Bösewicht)'
      }
    ],
    culturalNote: 'Viele vertraute Wörter im Deutschen und anderen europäischen Sprachen stammen aus dem Hindi und Sanskrit – darunter Karma, Guru, Dschungel, Avatar, Pyjama und Shampoo.'
  },

  bn: {
    title: 'Die Sprache der Seele: Tagore und die Sprachbewegung',
    tagline: 'Die einzige Sprache der Menschheitsgeschichte, für deren Erhalt Menschen gekämpft und ihr Leben gegeben haben.',
    speakersCount: 'Über 270 Millionen Muttersprachler (Platz 6 weltweit)',
    writingSystem: 'Bengalisch-assamesische Schrift (বাংলা লিপি)',
    languageFamily: 'Indogermanisch (Indo-Arisch)',
    facts: [
      { label: 'Weltrang', value: 'Sechsthäufigste Muttersprache der Welt', icon: '🌐' },
      { label: 'Nobelpreisträger', value: 'Rabindranath Tagore (Literaturnobelpreis 1913)', icon: '🏅' },
      { label: 'UNESCO-Gedenktag', value: 'Internationaler Tag der Muttersprache (21. Feb.)', icon: '🌺' },
      { label: 'Inhärenter Vokal', value: 'Gerundeter „o“-Klang (অ /ɔ/)', icon: '👄' },
      { label: 'Grammatisches Geschlecht', value: 'Keines! Verben und Adjektive sind geschlechtsneutral', icon: '⚖️' },
      { label: 'Nationalhymnen', value: 'Tagore verfasste die Hymnen Indiens und Bangladeschs', icon: '🎶' }
    ],
    historyTimeline: [
      {
        era: '10. – 12. Jahrhundert',
        title: 'Charyapada: Die älteste bengalische Dichtung',
        description: 'Buddhistisch-tantrische Mystiker verfassten auf Palmblatt-Manuskripten die Charyapada-Gesänge – das älteste überlieferte Zeugnis der bengalischen Sprache.',
        highlight: 'Mystische Gesänge des Altbengalischen'
      },
      {
        era: '1913',
        title: 'Rabindranath Tagore erhält den Nobelpreis',
        description: 'Der Universalgelehrte Rabindranath Tagore erhielt als erster Nicht-Europäer den Nobelpreis für Literatur für seine tiefgründige Gedichtsammlung Gitanjali („Sangesopfer“).',
        highlight: 'Erster asiatischer Nobelpreisträger'
      },
      {
        era: '21. Februar 1952',
        title: 'Die Bengalische Sprachbewegung (ভাষা আন্দোলন)',
        description: 'Studierende in Dhaka gingen auf die Straße und opferten ihr Leben im Protest gegen den Ausschluss des Bengalischen als Staatssprache. Zu ihren Ehren rief die UNESCO 1999 den 21. Februar weltweit zum Internationalen Tag der Muttersprache aus.',
        highlight: 'Internationaler Tag der Muttersprache der UNESCO'
      }
    ],
    linguisticTraits: [
      {
        title: 'Der inhärente gerundete „O“-Vokal',
        description: 'Anders als im Hindi mit seinem kurzen „a“ trägt jeder unmarkierte bengalische Konsonant von Natur aus einen warmen, offenen „o“-Laut (/ɔ/). So wird জল als „dschol“ (Wasser) ausgesprochen.',
        icon: '👄',
        example: 'ক = ko (nicht ka) · জল = jol'
      },
      {
        title: 'Vollständige Geschlechtsneutralität',
        description: 'Die bengalische Grammatik kennt keinerlei grammatisches Geschlecht. Männer, Frauen und Gegenstände teilen dasselbe Pronomen der dritten Person (সে er/sie) und dieselben Verbformen.',
        icon: '⚖️',
        example: 'সে যায় (Er geht / Sie geht)'
      }
    ],
    culturalNote: 'Der Internationale Tag der Muttersprache (21. Februar) wird weltweit zum Gedenken an die bengalischen Studierenden begangen, die 1952 für ihre Sprache starben.'
  },

  ur: {
    title: 'Die Sprache der Poesie: Nastaliq-Schrift & höfische Eleganz',
    tagline: 'Entstanden in königlichen Heerlagerstädten, seit Jahrhunderten gefeiert in Ghaselen, Liebeslyrik und Philosophie.',
    speakersCount: 'Über 230 Millionen Sprecher insgesamt',
    writingSystem: 'Persisch-arabische Nastaliq-Schrift (نستعلیق · 39 Buchstaben)',
    languageFamily: 'Indogermanisch (Indo-Arisch)',
    facts: [
      { label: 'Namensursprung', value: 'Vom turksprachigen „Ordu“ (königliches Heerlager)', icon: '⛺' },
      { label: 'Kalligrafiestil', value: 'Nastaliq (geneigter, fließender persischer Stil)', icon: '✒️' },
      { label: 'Wortschatz-Erbe', value: 'Prakrit-Basis mit Persisch, Arabisch und Turksprachen', icon: '🏛️' },
      { label: 'Gesprochener Zwilling', value: 'Mündlich gegenseitig verständlich mit Hindi', icon: '🤝' },
      { label: 'Nationalsprache', value: 'Islamische Republik Pakistan', icon: '🇵🇰' },
      { label: 'Dichtkunst', value: 'Ghasel (غزل), Nazm und Qawwali', icon: '📜' }
    ],
    historyTimeline: [
      {
        era: '13. Jahrhundert',
        title: 'Amir Khusrau und die Lager von Delhi',
        description: 'Der Sufi-Dichter Amir Khusrau verband erstmals persische Bildsprache mit der einheimischen Hindavi-Volkssprache und legte damit den Grundstein für die frühe Urdu-Literatur.',
        highlight: 'Wegbereiter der Urdu-Literatur'
      },
      {
        era: '18. – 19. Jahrhundert',
        title: 'Das Goldene Zeitalter der Urdu-Dichtung (Mir & Ghalib)',
        description: 'Mirza Ghalib und Mir Taqi Mir machten den Mogulhof von Delhi zur Welthauptstadt des Ghasels und erkundeten Liebe, existenziellen Zweifel und Mystik in unerreichter Klangschönheit.',
        highlight: 'Mirza Ghalibs unsterbliche Verse'
      },
      {
        era: '1947',
        title: 'Nationalsprache Pakistans',
        description: 'Urdu wurde als verbindende Nationalsprache Pakistans gewählt und bildet eine gemeinsame Brücke zwischen Provinzen, in denen Panjabi, Sindhi, Paschtu und Belutschisch gesprochen werden.',
        highlight: 'Nationales Symbol der Einheit'
      }
    ],
    linguisticTraits: [
      {
        title: 'Die schräg abfallende Nastaliq-Schrift',
        description: 'Anders als die waagerechte arabische Naskh-Schrift wird Urdu traditionell im Nastaliq-Duktus geschrieben und gesetzt, bei dem jedes Wort wie fließende Seide schräg von rechts oben nach links unten gleitet.',
        icon: '✒️',
        example: 'Die Nastaliq-Schrift fließt diagonal über die Zeile hinab.'
      },
      {
        title: 'Feine Höflichkeitskultur & Tehzeeb (Adab)',
        description: 'Urdu kennt drei fein abgestufte Anredeformen für „du/Sie“: das vertraute „tu“ (تو), das höfliche „tum“ (تم) und das ehrerbietige „aap“ (آپ), begleitet von erlesenen Höflichkeitswendungen.',
        icon: '🙇',
        example: 'آپ تشریف رکھیے (Bitte erweisen Sie uns die Ehre, Platz zu nehmen)'
      }
    ],
    culturalNote: 'In ganz Südasien gilt Urdu als Inbegriff von Romantik, höfischer Kultiviertheit (Tehzeeb) und mystischer Sufi-Musik.'
  },

  id: {
    title: 'Die einende Sprache: 17.000 Inseln, eine gemeinsame Stimme',
    tagline: 'Wie ein friedlicher Jugendschwur im Jahr 1928 rund 700 Volksgruppen im größten Inselstaat der Erde vereinte.',
    speakersCount: 'Über 300 Millionen Sprecher insgesamt',
    writingSystem: 'Lateinisches Alphabet (26 Buchstaben, 100 % lautgetreu)',
    languageFamily: 'Austronesisch (Malayo-Polynesisch)',
    facts: [
      { label: 'Der Schwur von 1928', value: 'Sumpah Pemuda (Jugendschwur der Einheit)', icon: '🇮🇩' },
      { label: 'Klare Grammatik', value: 'Keine Verbkonjugation, keine Zeitformen, kein Genus', icon: '✨' },
      { label: 'Pluralbildung', value: 'Wortverdopplung (anak-anak = Kinder)', icon: '👶' },
      { label: 'Lauttreue', value: 'Wörter werden genauso geschrieben, wie sie klingen', icon: '🔤' },
      { label: 'Grunddialekt', value: 'Riau-Malaiisch (neutrale Handelssprache)', icon: '🚢' },
      { label: 'Lehnwörter', value: 'Sanskrit, Arabisch, Niederländisch, Portugiesisch, Chinesisch', icon: '🌏' }
    ],
    historyTimeline: [
      {
        era: '7. Jahrhundert',
        title: 'Die maritime Seidenstraße und Melayu Pasar',
        description: 'Über ein Jahrtausend lang diente das Küstenmalaiische (Basar-Malaiisch) als neutrale Handelssprache, die Sultane der Gewürzinseln mit chinesischen und arabischen Kaufleuten verband.',
        highlight: 'Neutrale maritime Handels- und Verkehrssprache'
      },
      {
        era: '28. Oktober 1928',
        title: 'Der Schwur der Jugend (Sumpah Pemuda)',
        description: 'Junge indonesische Unabhängigkeitskämpfer trafen eine weitsichtige Entscheidung: Statt des zahlenmäßig dominierenden Javanischen wählten sie das neutrale Malaiisch, um Gleichberechtigung unter allen 700 Regionalsprachen zu schaffen.',
        highlight: '„Ein Vaterland, eine Nation, eine Sprache“'
      }
    ],
    linguisticTraits: [
      {
        title: 'Wortverdopplung (Reduplikation) für den Plural',
        description: 'Um im Indonesischen die Mehrzahl auszudrücken, wiederholt man einfach das Wort! Anak heißt Kind, anak-anak heißt Kinder. Buku heißt Buch, buku-buku heißt Bücher.',
        icon: '🔁',
        example: 'Orang (Mensch) → orang-orang (Menschen)'
      },
      {
        title: 'Das Affix-System (Me-, Di-, Ber-, Pe-)',
        description: 'Obwohl Indonesisch keine gebeugten Zeitformen kennt, verwandeln vielseitige Vor- und Nachsilben einfache Wortwurzeln in aktive Verben, Passivformen und abstrakte Substantive.',
        icon: '🧩',
        example: 'Tulis (schreiben) → menulis (aktiv schreiben) → ditulis (wird geschrieben)'
      }
    ],
    culturalNote: 'Unter Sprachwissenschaftlern gilt Indonesisch als eine der zugänglichsten Sprachen der Welt, in der Einsteiger schon vom ersten Tag an erste Gespräche führen können.'
  },

  es: {
    title: 'Von Kastilien bis nach Amerika: Der Weltenweg des Spanischen',
    tagline: 'Aus dem Vulgärlatein geboren, durch 700 Jahre Arabisch bereichert und von über 500 Millionen Menschen in 21 Staaten gesprochen.',
    speakersCount: 'Über 500 Millionen Muttersprachler (Platz 2 weltweit)',
    writingSystem: 'Spanisches Lateinalphabet (27 Buchstaben inklusive Ñ)',
    languageFamily: 'Indogermanisch (Romanisch)',
    facts: [
      { label: 'Muttersprachler', value: 'Zweithäufigste Muttersprache der Erde', icon: '🌎' },
      { label: 'Arabischer Einfluss', value: 'Über 4.000 arabische Lehnwörter (azúcar, alcalde, ojalá)', icon: '🕌' },
      { label: 'Erste moderne Grammatik', value: 'Antonio de Nebrija (1492)', icon: '📖' },
      { label: 'Umgekehrte Satzzeichen', value: '¡Eröffnendes Ausrufezeichen! & ¿Fragezeichen?', icon: '❓' },
      { label: 'Amtssprache in', value: '21 Ländern auf 4 Kontinenten', icon: '🏛️' },
      { label: 'Literarisches Meisterwerk', value: 'Don Quijote von Miguel de Cervantes', icon: '🛡️' }
    ],
    historyTimeline: [
      {
        era: 'ca. 200 v. Chr. – 400 n. Chr.',
        title: 'Das römische Hispanien und das Vulgärlatein',
        description: 'Römische Soldaten, Händler und Beamte brachten das gesprochene Vulgärlatein auf die Iberische Halbinsel und verdrängten nach und nach vorrömische keltische und iberische Sprachen.',
        highlight: 'Lateinisches Fundament des Spanischen'
      },
      {
        era: '711 – 1492 n. Chr.',
        title: 'Al-Andalus und das arabische Wortschatzerbe',
        description: 'Fast 800 Jahre maurischer Kulturblüte bereicherten das Spanische um Tausende Wörter aus Wissenschaft, Landwirtschaft und Architektur – oft erkennbar an der arabischen Vorsilbe „al-“.',
        highlight: 'Über 4.000 arabische Lehnwörter im Alltagsgebrauch'
      },
      {
        era: '1492',
        title: 'Nebrijas Grammatik und der Weg nach Amerika',
        description: 'Antonio de Nebrija veröffentlichte die erste gedruckte Grammatik einer modernen europäischen Volkssprache und überreichte sie Königin Isabella im Schicksalsjahr der Atlantikfahrten.',
        highlight: 'Erste Grammatik einer modernen europäischen Volkssprache'
      }
    ],
    linguisticTraits: [
      {
        title: 'Umgekehrte Satzzeichen am Satzanfang (¿ ? und ¡ !)',
        description: 'Spanisch ist die einzige Weltsprache, die Lesende schon zu Beginn eines Satzes durch umgekehrte Frage- und Ausrufezeichen auf die Satzmelodie einstimmt.',
        icon: '❓',
        example: '¿Cómo estás? · ¡Qué bueno!'
      },
      {
        title: 'Ser vs. Estar (zwei Arten von „sein“)',
        description: 'Spanisch trennt präzise zwischen dauerhaftem Wesen/Identität (ser) und vorübergehendem Zustand oder Ort (estar). „Soy feliz“ bedeutet ich bin ein glücklicher Mensch; „estoy feliz“ heißt ich bin gerade glücklich.',
        icon: '⚖️',
        example: 'Soy profesor (Identität) vs. Estoy cansado (aktueller Zustand)'
      }
    ],
    culturalNote: 'Spanisch wird in 21 souveränen Staaten gesprochen, von denen jeder lebendige Musiktraditionen, große Literatur und unverwechselbare Redewendungen beisteuert.'
  },

  fr: {
    title: 'Die Sprache der Vernunft, der Diplomatie & der Frankophonie',
    tagline: 'Die historische Sprache internationaler Verträge, der Aufklärung und von über 320 Millionen Sprechern weltweit.',
    speakersCount: 'Über 320 Millionen Sprecher insgesamt',
    writingSystem: 'Französisches Lateinalphabet (26 Buchstaben + Akzentzeichen)',
    languageFamily: 'Indogermanisch (Romanisch)',
    facts: [
      { label: 'Weltweite Geltung', value: 'Amtssprache in 29 Staaten', icon: '🌍' },
      { label: 'Diplomatisches Erbe', value: 'Traditionelle Sprache völkerrechtlicher Verträge', icon: '🕊️' },
      { label: 'Sprachhüterin', value: 'Académie française (1635 von Richelieu gegründet)', icon: '🏛️' },
      { label: 'Olympia & Weltpost', value: 'Offizielle Arbeitssprache des IOC und des Weltpostvereins', icon: '🏅' },
      { label: 'Grammatische Geschlechter', value: '2 (Maskulinum & Femininum)', icon: '⚖️' },
      { label: 'Klangnuancen', value: 'Charakteristische Nasalvokale (an, on, in, un)', icon: '🍷' }
    ],
    historyTimeline: [
      {
        era: '842 n. Chr.',
        title: 'Die Straßburger Eide (Serments de Strasbourg)',
        description: 'Das älteste erhaltene Schriftstück in einer frühen romanischen Volkssprache, die sich bereits klar vom Lateinischen gelöst hatte – geschworen von den Enkeln Karls des Großen.',
        highlight: 'Ältester überlieferter altfranzösischer Text'
      },
      {
        era: '1539',
        title: 'Das Edikt von Villers-Cotterêts',
        description: 'König Franz I. verfügte, dass in sämtlichen Gerichtsurkunden, Gesetzen und königlichen Erlassen fortan Französisch statt Kirchenlatein zu verwenden sei, und stärkte so den geeinten Zentralstaat.',
        highlight: 'Französisch wird offizielle Staatssprache'
      },
      {
        era: '18. Jahrhundert',
        title: 'Die Aufklärung und Europas Lingua franca',
        description: 'Französisch wurde zur Sprache der europäischen Fürstenhöfe, der Diplomatie und prägender Aufklärer wie Voltaire, Rousseau und Diderot.',
        highlight: 'Weltsprache der Diplomatie'
      }
    ],
    linguisticTraits: [
      {
        title: 'Liaison und fließender Wohlklang (Euphonie)',
        description: 'Das Französische legt höchsten Wert auf geschmeidigen Redefluss. Normalerweise stumme Endkonsonanten werden hörbar und binden sich an den folgenden Anfangsvokal (les amis → le-sa-mi [le.za.mi]).',
        icon: '🎶',
        example: 'C’est un ami (Ausgesprochen: se-tön-a-mi)'
      },
      {
        title: 'Nasalvokale',
        description: 'Das Französische besitzt markante Nasalvokale, bei denen der Luftstrom gleichzeitig durch Mund- und Nasenraum schwingt (pain, bon, vent, un).',
        icon: '👃',
        example: 'Bon (gut) · Vin (Wein) · Temps (Zeit/Wetter)'
      }
    ],
    culturalNote: 'Heute lebt die Mehrheit aller Französischsprechenden auf dem afrikanischen Kontinent – damit zählt Französisch zu den am schnellsten wachsenden Weltsprachen des 21. Jahrhunderts.'
  },

  de: {
    title: 'Die Sprache der Dichter, Denker & Präzisionskunst',
    tagline: 'Von Martin Luthers Bibelübersetzung über Einsteins Physik bis zu treffsicheren Wortzusammensetzungen.',
    speakersCount: 'Über 130 Millionen Sprecher insgesamt',
    writingSystem: 'Deutsches Lateinalphabet (26 Buchstaben + ä, ö, ü, ß)',
    languageFamily: 'Indogermanisch (Westgermanisch)',
    facts: [
      { label: 'Meistgesprochen in der EU', value: 'Häufigste Muttersprache der Europäischen Union', icon: '🇪🇺' },
      { label: 'Komposita', value: 'Zusammengesetzte Wörter für passgenaue Begriffe', icon: '🧩' },
      { label: 'Kasussystem', value: '4 Fälle (Nominativ, Akkusativ, Dativ, Genitiv)', icon: '🏛️' },
      { label: 'Geschlechter', value: '3 (der Maskulinum, die Femininum, das Neutrum)', icon: '⚖️' },
      { label: 'Substantivgroßschreibung', value: 'Jedes Substantiv wird im Schriftbild großgeschrieben', icon: '🔠' },
      { label: 'Wissenschaftsgeschichte', value: 'Sprache von Goethe, Kant, Beethoven und Einstein', icon: '🔬' }
    ],
    historyTimeline: [
      {
        era: '6. – 8. Jahrhundert',
        title: 'Die Zweite (Hochdeutsche) Lautverschiebung',
        description: 'Ein tiefgreifender Lautwandel trennte das Hochdeutsche von seinen germanischen Schwestersprachen (wie Englisch und Niederländisch) und wandelte etwa „t“ zu „z/ss“ (englisch „water“ → „Wasser“, „two“ → „zwei“).',
        highlight: 'Herausbildung des Hochdeutschen'
      },
      {
        era: '1522',
        title: 'Martin Luthers Bibelübersetzung',
        description: 'Martin Luther übersetzte das Neue Testament in eine kraftvolle, volksnahe sächsische Kanzleisprache und schuf damit aus Hunderten zersplitterten Mundarten das Fundament einer gemeinsamen deutschen Schriftsprache.',
        highlight: 'Geburt des modernen Standarddeutschen (Hochdeutsch)'
      }
    ],
    linguisticTraits: [
      {
        title: 'Großschreibung aller Substantive',
        description: 'Deutsch ist die einzige große Weltsprache, in der sämtliche Substantive großgeschrieben werden – dadurch lassen sich Satzkerne, Gegenstände und Begriffe beim Lesen sofort erfassen.',
        icon: '🔠',
        example: 'Das Buch · Die Zeit · Der Gedanke'
      },
      {
        title: 'Legendäre Wortzusammensetzungen (Komposita)',
        description: 'Das Deutsche fügt Einzelwörter mühelos zu bildhaften, präzisen Begriffen zusammen: Ein Handschuh ist buchstäblich ein „Schuh für die Hand“ und ein Kühlschrank ein „Schrank zum Kühlen“.',
        icon: '🧩',
        example: 'Hand + Schuh = Handschuh · Kühl + Schrank = Kühlschrank'
      }
    ],
    culturalNote: 'Deutsch ist in Deutschland, Österreich und der Schweiz eine prägende Kultursprache der Philosophie, der klassischen Musik und zukunftsweisender Ingenieurskunst.'
  },

  pt: {
    title: 'Die Sprache von Camões & der großen Ozeanrouten',
    tagline: 'Gesprochen auf 4 Kontinenten – von Lissabon über Rio de Janeiro bis nach Luanda und Maputo.',
    speakersCount: 'Über 260 Millionen Muttersprachler',
    writingSystem: 'Portugiesisches Lateinalphabet (26 Buchstaben + Akzentzeichen)',
    languageFamily: 'Indogermanisch (Romanisch)',
    facts: [
      { label: 'Südhalbkugel', value: 'Meistgesprochene Sprache der Südlichen Hemisphäre', icon: '🌎' },
      { label: 'Nationaldichter', value: 'Luís de Camões (Die Lusiaden, 1572)', icon: '📜' },
      { label: 'Nasale Tilden', value: 'Die berühmte Tilde (ã, õ) für weiche Nasallaute', icon: '🎵' },
      { label: 'Geschlechter', value: '2 (Maskulinum auf -o, Femininum auf -a)', icon: '⚖️' },
      { label: 'Das Gefühl Saudade', value: 'Unübersetzbare Sehnsucht und liebevolle Wehmut', icon: '💖' },
      { label: 'Größtes Sprecherland', value: 'Rund 80 % aller Sprecher leben in Brasilien', icon: '🇧🇷' }
    ],
    historyTimeline: [
      {
        era: '9. – 12. Jahrhundert',
        title: 'Galicisch-Portugiesisch (Galego-Português)',
        description: 'Aus dem Vulgärlatein im Nordwesten der Iberischen Halbinsel hervorgegangen, entwickelte sich das Galicisch-Portugiesische zur führenden Sprache der mittelalterlichen Troubadour-Lyrik.',
        highlight: 'Blütezeit mittelalterlicher Lieddichtung'
      },
      {
        era: '15. – 16. Jahrhundert',
        title: 'Das Zeitalter der Entdeckungen und die weltweite Verbreitung',
        description: 'Portugiesische Seefahrer wie Vasco da Gama trugen die Sprache über die Weltmeere nach Brasilien, Afrika (Angola, Mosambik), Indien (Goa) und Macau.',
        highlight: 'Weltweite maritime Ausbreitung'
      }
    ],
    linguisticTraits: [
      {
        title: 'Nasalvokale mit Tilde (ã, õ)',
        description: 'Die Tilde war ursprünglich ein winziges mittelalterliches „n“, das platzsparend über den Vokal geschrieben wurde (aus lateinisch cantionem wurde canção). Sie verleiht dem Portugiesischen seinen warmen, unverwechselbaren Klang.',
        icon: '🎵',
        example: 'Pão (Brot) · Não (Nein) · Coração (Herz)'
      },
      {
        title: 'Saudade: Die Seele der Sprache',
        description: 'Oft als eines der schönsten unübersetzbaren Wörter der Welt gerühmt, beschreibt Saudade eine bittersüße Sehnsucht nach einem geliebten Menschen oder einem fernen Ort.',
        icon: '💖',
        example: 'Tenho saudades de você (Ich sehne mich sehr nach dir)'
      }
    ],
    culturalNote: 'Portugiesisch ist Amtssprache von neun Ländern, die in der Gemeinschaft der Portugiesischsprachigen Länder (CPLP) miteinander verbunden sind.'
  },

  en: {
    title: 'Die globale Verkehrssprache: Von angelsächsischen Wurzeln zum Internet',
    tagline: 'Wie eine Inselsprache Latein, Altnordisch und Französisch in sich aufnahm und zur gemeinsamen Weltsprache wurde.',
    speakersCount: 'Über 1,5 Milliarden Sprecher insgesamt',
    writingSystem: 'Englisches Lateinalphabet (26 Buchstaben)',
    languageFamily: 'Indogermanisch (Westgermanisch)',
    facts: [
      { label: 'Weltstatus', value: 'Globale Verkehrssprache in Technik, Wissenschaft und Luftfahrt', icon: '🌐' },
      { label: 'Mischwortschatz', value: '~60 % lateinisch-französische + ~26 % germanische Wurzeln', icon: '🧬' },
      { label: 'Wortreichtum', value: 'Über 500.000 Einträge im Oxford-Wörterbuch', icon: '📚' },
      { label: 'Schlanke Grammatik', value: 'Kein grammatisches Genus, minimale Verbendungen', icon: '✨' },
      { label: 'Historische Schreibung', value: 'Alte Schreibweisen blieben trotz Lautwandels erhalten', icon: '🎩' },
      { label: 'Digitale Welt', value: 'Leitsprache für Software, Internet und Programmierung', icon: '💻' }
    ],
    historyTimeline: [
      {
        era: 'ca. 450 n. Chr.',
        title: 'Altenglisch (angelsächsische & skandinavische Einflüsse)',
        description: 'Germanische Stämme (Angeln, Sachsen, Jüten) siedelten in Britannien. Wikingerzüge brachten altnordische Alltagswörter wie sky (Himmel), skin (Haut), take (nehmen), they (sie) und give (geben) ins Englische.',
        highlight: 'Altenglisches Heldenepos Beowulf'
      },
      {
        era: '1066 n. Chr.',
        title: 'Die Normannische Eroberung und der französische Wortschatzschub',
        description: 'Wilhelm der Eroberer machte Anglonormannisch zur Sprache des Königshofs und der Gerichte. So entstand ein berühmter zweischichtiger Wortschatz (germanische Tiernamen auf dem Hof gegenüber französischen Bezeichnungen für zubereitetes Fleisch: pig/pork [Schwein/Schweinefleisch], cow/beef [Kuh/Rindfleisch]).',
        highlight: 'Enormer Zustrom französischer und lateinischer Wörter'
      },
      {
        era: 'ca. 1600 n. Chr.',
        title: 'Shakespeare und die King-James-Bibel',
        description: 'William Shakespeare prägte über 1.700 neue Wörter und Redewendungen, während die Bibelübersetzung unter König Jakob I. die poetische Sprachmelodie des modernen Englisch weltweit formte.',
        highlight: 'Aufbruch des modernen Englisch'
      }
    ],
    linguisticTraits: [
      {
        title: 'Doppelter Wortschatz aus Germanisch und Französisch',
        description: 'Für fast jeden Begriff besitzt das Englische zwei Wörter: ein direktes, bodenständiges germanisches Wort und ein gehobenes französisch-lateinisches Gegenstück.',
        icon: '🧬',
        example: 'Ask (germanisch: fragen) vs. Inquire (französisch: sich erkundigen) · Kingly vs. Royal (königlich)'
      },
      {
        title: 'Verzicht auf grammatisches Geschlecht',
        description: 'Anders als das Deutsche oder Spanische hat das Englische das Substantivgeschlecht vor Jahrhunderten abgelegt. Für alles gilt schlicht der Artikel „the“!',
        icon: '✨',
        example: 'The sun (die Sonne), the moon (der Mond), the table (der Tisch) — kein Genus zum Auswendiglernen.'
      }
    ],
    culturalNote: 'Englisch fungiert heute als unangefochtene Brückensprache der internationalen Wissenschaft, der Luftfahrt, des Welthandels und des weltweiten Internets.'
  }
};
