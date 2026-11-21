import { AboutLanguageTranslations } from './types';

export const ABOUT_TRANSLATIONS_ES: AboutLanguageTranslations = {
  zh: {
    title: 'La historia del mandarín y el chino simplificado',
    tagline: 'De los huesos oraculares de hace 3.000 años a la revolución de alfabetización de los años 50 y el nacimiento del pinyin.',
    speakersCount: 'Más de 1.100 millones de hablantes nativos',
    writingSystem: 'Caracteres chinos simplificados (简体字) y hanyu pinyin (汉语拼音)',
    languageFamily: 'Sinotibetana',
    facts: [
      { label: 'Hablantes nativos', value: '1.100 millones (n.º 1 del mundo)', icon: '👥' },
      { label: 'Escritura oficial', value: 'Caracteres simplificados (简体字)', icon: '✍️' },
      { label: 'Puente fonético', value: 'Hanyu pinyin (adoptado en 1958)', icon: '🔤' },
      { label: 'Dialecto estándar', value: 'Fonología de Pekín', icon: '📍' },
      { label: 'Conjugación verbal', value: 'Cero (sin formas de pasado ni futuro)', icon: '✨' },
      { label: 'Idioma oficial de la ONU', value: 'Desde 1946', icon: '🌐' }
    ],
    historyTimeline: [
      {
        era: 'c. 1200 a. C.',
        title: 'Escritura en huesos oraculares (甲骨文 · Jiǎgǔwén)',
        description: 'La escritura china más antigua conocida, tallada en caparazones de tortuga y omóplatos de buey durante la dinastía Shang para la adivinación. Los caracteres eran representaciones pictóricas directas de elementos naturales como el sol (日) y el agua (水).',
        highlight: 'Nacimiento del chino escrito'
      },
      {
        era: '221 a. C.',
        title: 'Unificación imperial de la escritura (秦始皇 · Escritura de sello pequeño)',
        description: 'El primer emperador de China, Qin Shi Huang, unificó cientos de variantes regionales de escritura en un único sistema nacional de sello pequeño y escritura clerical, garantizando que los decretos se leyeran igual en todas las provincias sin importar el dialecto hablado.',
        highlight: 'Unificación de China'
      },
      {
        era: 'c. 200 d. C. – años 1950',
        title: 'Escritura regular tradicional (繁体楷书 · Fántǐ Kǎishū)',
        description: 'Durante casi 1.800 años, el chino tradicional fue el estándar supremo de la expresión literaria, administrativa y poética. Sin embargo, los complejos caracteres de entre 20 y 30 trazos suponían enormes barreras educativas para el pueblo trabajador.',
        highlight: 'Era de la literatura clásica'
      },
      {
        era: '1949 – 1956',
        title: 'La crisis de alfabetización y los caracteres simplificados (简体字)',
        description: 'En 1949, China afrontaba una tasa de analfabetismo superior al 80 %. Para democratizar rápidamente la educación, el gobierno impulsó el Plan de Simplificación de Caracteres Chinos (汉字简化方案). Más de 2.200 caracteres complejos se simplificaron sistemáticamente empleando abreviaturas cursivas centenarias y reduciendo el número de trazos.',
        highlight: 'La alfabetización nacional saltó del 20 % a más del 96 %'
      },
      {
        era: '1958',
        title: 'Zhou Youguang y la invención del pinyin (汉语拼音)',
        description: 'El economista y lingüista Zhou Youguang dirigió el Comité para la Reforma de la Lengua Escrita China con el fin de diseñar el hanyu pinyin. Mediante el alfabeto latino, el pinyin tendió un puente fonético accesible del que hoy dependen los teclados de ordenador y los teléfonos inteligentes.',
        highlight: 'Zhou Youguang vivió hasta los 111 años (1906–2017)'
      }
    ],
    scriptComparison: [
      {
        traditional: '國',
        simplified: '国',
        pinyin: 'guó',
        meaning: 'País / Nación',
        traditionalStrokes: 11,
        simplifiedStrokes: 8,
        reason: 'Sustituyó el complejo radical interior de arma por el símbolo del jade (玉), simbolizando un tesoro protegido dentro de las fronteras nacionales (囗).'
      },
      {
        traditional: '學',
        simplified: '学',
        pinyin: 'xué',
        meaning: 'Estudiar / Aprender',
        traditionalStrokes: 16,
        simplifiedStrokes: 8,
        reason: 'Redujo la compleja parte superior erudita de 16 trazos a una ágil abreviatura cursiva de 8 trazos que llevaba siglos usándose de manera informal.'
      },
      {
        traditional: '愛',
        simplified: '爱',
        pinyin: 'ài',
        meaning: 'Amor',
        traditionalStrokes: 13,
        simplifiedStrokes: 10,
        reason: 'Reemplazó el complejo radical central del corazón (心) por la forma abreviada de amigo/armonía (友) para hacer la escritura más fluida y rápida.'
      },
      {
        traditional: '門',
        simplified: '门',
        pinyin: 'mén',
        meaning: 'Puerta / Portal',
        traditionalStrokes: 8,
        simplifiedStrokes: 3,
        reason: 'Estilizó los dos batientes de una puerta en un contorno abierto de solo 3 trazos.'
      },
      {
        traditional: '馬',
        simplified: '马',
        pinyin: 'mǎ',
        meaning: 'Caballo',
        traditionalStrokes: 10,
        simplifiedStrokes: 3,
        reason: 'Transformó la crin, las patas y la cola en 3 trazos continuos de pincel cursivo.'
      }
    ],
    linguisticTraits: [
      {
        title: 'Sin conjugación verbal',
        description: 'A diferencia del español o el francés, con docenas de desinencias verbales, ¡los verbos chinos nunca cambian! «Comer» (吃 chī) es idéntico para yo como, tú comes, nosotros comimos o ellos comerán. El tiempo se expresa simplemente con marcadores temporales (ayer, mañana) o partículas de aspecto (了 le).',
        icon: '⚡',
        example: '我吃 (Yo como) · 我昨天吃了 (Ayer comí)'
      },
      {
        title: 'Sin género gramatical ni terminaciones de plural',
        description: 'No existen artículos masculinos ni femeninos (el/la) y los sustantivos no cambian en plural. Una manzana es 一个苹果 y cinco manzanas es 五个苹果.',
        icon: '🍎',
        example: '苹果 (Manzana) es siempre 苹果, en singular o en plural.'
      },
      {
        title: 'Palabras de medida (clasificadores)',
        description: 'Siempre que se cuentan objetos en mandarín, un clasificador específico enlaza el número con el sustantivo según su forma o categoría (p. ej., 本 běn para libros, 辆 liàng para vehículos, 张 zhāng para objetos planos).',
        icon: '📏',
        example: '一本书 (Un libro) · 一辆车 (Un coche)'
      },
      {
        title: 'Idioma tonal (4 tonos)',
        description: 'El mandarín emplea 4 contornos melódicos distintos (alto sostenido, ascendente, descendente-ascendente y descendente) más un tono neutro. Cambiar la entonación altera por completo el carácter y el significado de la sílaba.',
        icon: '🎵',
        example: 'mā (Madre 妈) vs. mǎ (Caballo 马)'
      }
    ],
    culturalNote: 'Hoy en día, el chino simplificado es el estándar en China continental, Singapur y organismos internacionales como la ONU, mientras que el chino tradicional sigue siendo muy apreciado en Taiwán, Hong Kong, Macao y en la caligrafía clásica.'
  },

  ko: {
    title: 'El milagro del hangul: el regalo real de la alfabetización',
    tagline: 'En 1443, el rey Sejong creó uno de los alfabetos más científicos del mundo.',
    speakersCount: 'Más de 80 millones de hablantes nativos',
    writingSystem: 'Hangul (한글) — Alfabeto fonético de rasgos articulatorios',
    languageFamily: 'Coreánica (lengua aislada)',
    facts: [
      { label: 'Inventor', value: 'El rey Sejong el Grande (1443)', icon: '👑' },
      { label: 'Sistema alfabético', value: '24 letras básicas (consonantes y vocales)', icon: '🔤' },
      { label: 'Diseño científico', value: 'Las letras imitan la forma de la boca y la lengua', icon: '👅' },
      { label: 'Fiesta nacional', value: 'Día del Hangul (9 de octubre)', icon: '🎉' },
      { label: 'Orden de palabras', value: 'SOV (Sujeto-Objeto-Verbo)', icon: '🧱' },
      { label: 'Honoríficos', value: 'Niveles de cortesía integrados en la gramática', icon: '🙇' }
    ],
    historyTimeline: [
      {
        era: 'Antes de 1443',
        title: 'El peso del hanja (caracteres chinos)',
        description: 'Los coreanos carecían de escritura propia y escribían usando complejos caracteres chinos (hanja). Como el chino y el coreano pertenecen a familias lingüísticas totalmente distintas, solo la élite aristocrática adinerada (yangban) disponía de las décadas necesarias para aprender a leer y escribir.',
        highlight: 'El pueblo llano no podía leer leyes ni escribir cartas'
      },
      {
        era: '1443 – 1446',
        title: 'El rey Sejong promulga el Hunminjeongeum',
        description: 'Decidido a dar voz a los ciudadanos comunes, el rey Sejong desarrolló en secreto el hangul junto con eruditos reales. En 1446 publicó el Hunminjeongeum («Los sonidos correctos para la instrucción del pueblo»), declarando que escribir debía ser tan sencillo como respirar.',
        highlight: '«Un sabio puede aprenderlo en una mañana; un necio, en diez días».'
      },
      {
        era: 'Siglo XX',
        title: 'Democratización y la ola hallyu',
        description: 'Pese a la resistencia histórica de las élites tradicionales, el hangul triunfó en la época moderna, impulsando a Corea del Sur hacia una de las tasas de alfabetización más altas del mundo (99 %) y potenciando sus exportaciones culturales globales (K-pop, K-dramas).',
        highlight: 'Premio de Alfabetización Rey Sejong de la UNESCO creado en 1989'
      }
    ],
    linguisticTraits: [
      {
        title: 'Escritura de rasgos (imitación de boca y lengua)',
        description: 'Las letras del hangul no son arbitrarias: ㄱ imita la lengua bloqueando la garganta, ㄴ reproduce la lengua tocando la encía superior y ㅁ dibuja el contorno de los labios.',
        icon: '👅',
        example: 'ㅁ (m) muestra los labios cerrados; ㅂ (b) añade trazos para la oclusión.'
      },
      {
        title: 'Arquitectura en bloques silábicos',
        description: 'Las letras se agrupan en bloques silábicos cuadrados en lugar de escribirse en una fila lineal horizontal. Por ejemplo, h (ㅎ) + a (ㅏ) + n (ㄴ) se apilan para formar «한» (han).',
        icon: '🧱',
        example: 'ㅎ + ㅏ + ㄴ = 한 (Han)'
      },
      {
        title: 'Orden Sujeto-Objeto-Verbo (SOV)',
        description: 'En coreano, el verbo va siempre al final de la oración. «Yo como una manzana» se estructura como «Yo manzana como» (저는 사과를 먹어요).',
        icon: '🔄',
        example: '저는 (Yo) + 사과를 (Manzana) + 먹어요 (Como)'
      }
    ],
    culturalNote: 'El Día del Hangul se celebra como festivo nacional en Corea del Sur cada 9 de octubre para honrar la creación real que trajo la libertad lingüística.'
  },

  ja: {
    title: 'La armonía de tres escrituras (漢字 · ひらがな · カタカナ)',
    tagline: 'Una elegante sinfonía lingüística que combina ideogramas chinos con dos silabarios fonéticos propios.',
    speakersCount: 'Más de 125 millones de hablantes nativos',
    writingSystem: 'Kanji (漢字), hiragana (ひらがな) y katakana (カタカナ)',
    languageFamily: 'Japónica',
    facts: [
      { label: 'Escrituras en uso', value: '3 sistemas de escritura entrelazados', icon: '✍️' },
      { label: 'Joyo kanji', value: '2.136 caracteres enseñados en las escuelas', icon: '📚' },
      { label: 'Orden de palabras', value: 'SOV (el verbo va siempre al final)', icon: '🔄' },
      { label: 'Sistema tonal', value: 'Acento tonal de altura (alto/bajo)', icon: '🎵' },
      { label: 'Préstamos léxicos', value: 'Escritos en katakana (p. ej., コーヒー)', icon: '☕' },
      { label: 'Partículas', value: 'Marcadores gramaticales (は, が, を, に)', icon: '🏷️' }
    ],
    historyTimeline: [
      {
        era: 'Siglo V',
        title: 'El kanji llega desde el continente asiático',
        description: 'Antes del contacto con China, el japonés era un idioma exclusivamente hablado. Se adoptaron los caracteres chinos (kanji) para escribir nombres japoneses, leyes y sutras budistas.',
        highlight: 'Adaptación de los logogramas chinos'
      },
      {
        era: 'Siglos VIII – X',
        title: 'La invención del hiragana y la literatura femenina',
        description: 'Las damas de la corte simplificaron el kanji cursivo en sílabas fonéticas fluidas llamadas hiragana («mano de mujer»). Esto dio vida a obras maestras universales de la literatura japonesa, como La novela de Genji de Murasaki Shikibu.',
        highlight: 'Nacimiento de la escritura fonética autóctona'
      },
      {
        era: 'Era moderna',
        title: 'El katakana y la integración del vocabulario global',
        description: 'El katakana, creado originalmente por monjes budistas como notas abreviadas de lectura, se convirtió en la escritura designada para términos científicos modernos, nombres extranjeros y préstamos globales (p. ej., コンピューター konpyūtā).',
        highlight: 'Tres escrituras funcionando en perfecta armonía'
      }
    ],
    linguisticTraits: [
      {
        title: 'El sistema tripartito de escritura',
        description: 'Una sola frase suele combinar las tres escrituras: el kanji aporta las raíces léxicas (私 yo, 食べる comer), el hiragana expresa las desinencias gramaticales y partículas (は, を, ました), y el katakana transcribe palabras extranjeras (パン pan).',
        icon: '🧩',
        example: '私はパンを食べました (Comí pan)'
      },
      {
        title: 'Partículas gramaticales (助詞 · Joshi)',
        description: 'Pequeñas partículas pospuestas indican la función exacta de cada palabra en la oración (は tema, が sujeto, を objeto directo, に destino o tiempo).',
        icon: '🏷️',
        example: '猫が (el gato [sujeto]) + 魚を (pescado [objeto]) + 食べた (comió)'
      }
    ],
    culturalNote: 'Dominar el japonés permite apreciar un vínculo cultural profundo entre la caligrafía visual, el lenguaje honorífico respetuoso (keigo) y la comunicación guiada por el contexto.'
  },

  ru: {
    title: 'El alma eslava: de los monjes cirílicos a Pushkin y Tolstói',
    tagline: 'Una lengua rica y expresiva esculpida por eruditos bizantinos, Pedro el Grande y grandes poetas.',
    speakersCount: 'Más de 255 millones de hablantes en total',
    writingSystem: 'Alfabeto cirílico ruso (33 letras)',
    languageFamily: 'Indoeuropea (eslava oriental)',
    facts: [
      { label: 'Alfabeto', value: '33 letras (10 vocales, 21 consonantes y 2 signos)', icon: '🔤' },
      { label: 'Reforma gráfica', value: 'Pedro el Grande (1708) y reforma soviética (1918)', icon: '📜' },
      { label: 'Sistema de casos', value: '6 casos gramaticales', icon: '🏛️' },
      { label: 'Géneros', value: '3 (masculino, femenino y neutro)', icon: '⚖️' },
      { label: 'Idioma espacial', value: 'Obligatorio en la EEI junto con el inglés', icon: '🚀' },
      { label: 'Siglo de Oro literario', value: 'Pushkin, Tolstói, Dostoyevski, Chéjov', icon: '📖' }
    ],
    historyTimeline: [
      {
        era: 'c. 863 d. C.',
        title: 'Los santos Cirilo y Metodio',
        description: 'Los hermanos misioneros bizantinos Cirilo y Metodio desarrollaron el alfabeto glagolítico para traducir textos bíblicos para los pueblos eslavos, el cual pronto evolucionó en el Primer Imperio búlgaro hasta dar origen al alfabeto cirílico.',
        highlight: 'Nacimiento del cirílico'
      },
      {
        era: '1708',
        title: 'La reforma de la escritura civil de Pedro el Grande (Гражданский шрифт)',
        description: 'El zar Pedro el Grande tachó personalmente letras griegas eclesiásticas arcaicas y rediseñó el cirílico ruso para asemejarlo a la tipografía de Europa occidental, modernizando la ciencia, las cartas náuticas y la imprenta rusas.',
        highlight: 'Secularización y modernización'
      },
      {
        era: '1918',
        title: 'La gran reforma ortográfica posrevolucionaria',
        description: 'El gobierno bolchevique simplificó la ortografía suprimiendo letras históricas redundantes (como ѣ «yat», ѳ «fita» y la ъ «yer» final imperial), estableciendo el ágil alfabeto de 33 letras que se utiliza hoy.',
        highlight: 'Establecimiento del estándar actual de 33 letras'
      }
    ],
    linguisticTraits: [
      {
        title: 'Acento prosódico móvil',
        description: 'El acento en ruso es impredecible y puede cambiar el significado de una palabra (за́мок = castillo vs. замо́к = candado). La «o» átona se reduce de forma natural a un sonido «a» (молоко́ → malakó).',
        icon: '🎯',
        example: 'за́мок (castillo) vs. замо́к (candado)'
      },
      {
        title: 'Consonantes blandas y duras (palatalización)',
        description: 'Casi todas las consonantes existen en pares duros (simples) o blandos (palatalizados), diferenciados por la vocal que les sigue o por el signo blando (ь).',
        icon: '🎶',
        example: 'брат (hermano) vs. брать (tomar)'
      }
    ],
    culturalNote: 'El ruso es uno de los seis idiomas oficiales de las Naciones Unidas y la segunda lengua operativa obligatoria en la Estación Espacial Internacional.'
  },

  tr: {
    title: 'El milagro de 1928: la revolución alfabética de Atatürk',
    tagline: 'Cómo toda una nación pasó de la escritura árabe otomana a un alfabeto latino fonético en cuestión de meses.',
    speakersCount: 'Más de 85 millones de hablantes nativos',
    writingSystem: 'Alfabeto latino turco (29 letras)',
    languageFamily: 'Túrquica',
    facts: [
      { label: 'La reforma de 1928', value: 'Harf Devrimi (revolución del alfabeto de Atatürk)', icon: '🏛️' },
      { label: 'Alfabeto', value: '29 letras (totalmente fonético: 1 letra = 1 sonido)', icon: '🔤' },
      { label: 'Estructura lingüística', value: 'Aglutinante (bloques sucesivos de sufijos)', icon: '🧱' },
      { label: 'Armonía vocálica', value: 'Las vocales anteriores y posteriores concuerdan en armonía', icon: '🎵' },
      { label: 'Género gramatical', value: '¡Ninguno! Incluso «él», «ella» y «ello» se dicen solo «o»', icon: '⚖️' },
      { label: 'Orden de palabras', value: 'SOV (Sujeto-Objeto-Verbo)', icon: '🔄' }
    ],
    historyTimeline: [
      {
        era: 'Siglo X – 1928 d. C.',
        title: 'El turco otomano y el desajuste con el alfabeto árabe',
        description: 'Durante más de 900 años, el turco se escribió con caracteres árabes otomanos. Sin embargo, el árabe solo representa 3 sonidos vocálicos, mientras que el turco posee 8 ricas vocales. Este desajuste generaba gran ambigüedad y mantenía la alfabetización por debajo del 10 %.',
        highlight: 'Analfabetismo generalizado por incompatibilidad gráfica'
      },
      {
        era: '1928',
        title: 'La revolución lingüística de Mustafa Kemal Atatürk (Harf Devrimi)',
        description: 'El fundador de la República de Turquía, Atatürk, recorrió personalmente pueblos y plazas con una pizarra para enseñar un nuevo alfabeto latino fonético de 29 letras adaptado a la fonología turca (incorporando ç, ğ, ı, ö, ş, ü).',
        highlight: 'La alfabetización nacional pasó del 10 % a más del 90 %'
      }
    ],
    linguisticTraits: [
      {
        title: 'Cadenas de sufijos aglutinantes',
        description: 'Las palabras se construyen ensamblando sufijos sobre una raíz como bloques de construcción. ¡Una sola palabra puede expresar lo que en español requiere toda una oración!',
        icon: '🧱',
        example: 'Ev (casa) → evler (casas) → evlerimde (en mis casas)'
      },
      {
        title: 'Armonía vocálica (Ünlü Uyumu)',
        description: 'Las vocales dentro de una palabra armonizan musicalmente entre vocales posteriores (a, ı, o, u) y anteriores (e, i, ö, ü). Los sufijos cambian automáticamente su vocal para concordar con la raíz.',
        icon: '🎶',
        example: 'araba-lar (coches) vs. kedi-ler (gatos)'
      }
    ],
    culturalNote: 'Dado que la ortografía turca es 100 % fonética, una vez que aprendes el sonido de sus 29 letras, puedes pronunciar con exactitud cualquier palabra del idioma.'
  },

  ar: {
    title: 'La lengua de la elocuencia (لغة الضاد · Lughat al-Dad)',
    tagline: 'Una lengua sagrada de raíces y patrones que une a más de 400 millones de hablantes en el mundo árabe.',
    speakersCount: 'Más de 400 millones de hablantes en total',
    writingSystem: 'Abyad árabe (28 letras, de derecha a izquierda)',
    languageFamily: 'Afroasiática (semítica)',
    facts: [
      { label: 'Dirección', value: 'De derecha a izquierda', icon: '⬅️' },
      { label: 'Alfabeto', value: '28 letras (consonantes y vocales largas)', icon: '🔤' },
      { label: 'Sistema de raíces', value: 'Raíces consonánticas de 3 letras (trilíteras)', icon: '🌱' },
      { label: 'El sonido único', value: 'Dad (ض) — presente casi exclusivamente en el árabe', icon: '🗣️' },
      { label: 'Número dual', value: 'Formas para singular, dual (dos) y plural', icon: '2️⃣' },
      { label: 'Día mundial en la ONU', value: 'Día Mundial de la Lengua Árabe (18 de diciembre)', icon: '🌐' }
    ],
    historyTimeline: [
      {
        era: 'Siglo VI d. C.',
        title: 'Poesía preislámica (Mu’allaqat)',
        description: 'Los poetas beduinos memorizaban complejas odas rimadas que celebraban el honor y la valentía en el desierto, forjando el sublime canon poético del árabe clásico.',
        highlight: 'Edad de oro de la poesía preislámica'
      },
      {
        era: 'Siglo VII d. C.',
        title: 'El Corán y la preservación lingüística',
        description: 'La revelación y compilación del Sagrado Corán codificó la gramática y la fonología árabes, conservando la lengua prácticamente intacta durante más de 1.400 años.',
        highlight: 'Estándar litúrgico universal del islam'
      },
      {
        era: 'Era moderna',
        title: 'Árabe estándar moderno (الفصحى · Fus’ha)',
        description: 'Hoy en día, el árabe estándar moderno actúa como lengua formal común de la literatura, las noticias, la diplomacia y la educación en 22 países.',
        highlight: 'Lengua franca compartida del mundo árabe'
      }
    ],
    linguisticTraits: [
      {
        title: 'El motor de raíces de 3 letras (الجذر · Al-Jidhr)',
        description: 'Casi todas las palabras árabes nacen de una raíz de 3 letras que encierra una idea abstracta. Por ejemplo, K-T-B (ك-ت-ب), ligada a la escritura, genera kitāb (libro), kātib (escritor), maktab (oficina) y maktūb (escrito/destino).',
        icon: '🌱',
        example: 'ك-ت-ب → كتاب (Libro) · مكتبة (Biblioteca) · كاتب (Autor)'
      },
      {
        title: 'Ligaduras cursivas',
        description: 'Las letras árabes se enlazan en una escritura cursiva fluida y cambian de forma según aparezcan al principio, en medio, al final o aisladas dentro de la palabra.',
        icon: '✍️',
        example: 'ب en posición inicial (بـ), media (ـبـ) o final (ـب)'
      }
    ],
    culturalNote: 'La caligrafía árabe es celebrada como una de las expresiones más elevadas de las artes visuales en la historia de la humanidad.'
  },

  hi: {
    title: 'La voz de la India: del antiguo sánscrito a Bollywood',
    tagline: 'Escrita en el elegante alfabeto devanagari («Ciudad de los Dioses») y hablada por más de 600 millones de personas.',
    speakersCount: 'Más de 600 millones de hablantes en total',
    writingSystem: 'Escritura abugida devanagari (देवनागरी)',
    languageFamily: 'Indoeuropea (indoaria)',
    facts: [
      { label: 'Alfabeto', value: 'Escritura devanagari (11 vocales, 33 consonantes y conjuntas)', icon: '🔤' },
      { label: 'Línea superior', value: 'Shirorekha (trazo horizontal del que cuelgan las letras)', icon: '📏' },
      { label: 'Lengua hermana', value: 'Intercambiable en el habla cotidiana con el urdu', icon: '🤝' },
      { label: 'Orden de palabras', value: 'SOV (Sujeto-Objeto-Verbo)', icon: '🔄' },
      { label: 'Ancestro', value: 'Sánscrito (संस्कृतम्)', icon: '🏛️' },
      { label: 'Influencia global', value: 'Yoga, avatar, jungla, gurú, chai, champú', icon: '🧘' }
    ],
    historyTimeline: [
      {
        era: 'c. 1500 a. C.',
        title: 'Raíces en el sánscrito védico',
        description: 'El sánscrito védico evolucionó hacia dialectos prácritos regionales hablados por la población cotidiana en todo el norte de la India.',
        highlight: 'Himnos védicos y filosofía clásica'
      },
      {
        era: 'Siglos XIII – XVIII',
        title: 'El surgimiento del indostaní',
        description: 'El Sultanato de Delhi y la era mogol incorporaron vocabulario persa, túrquico y árabe a la conversación diaria, dando forma al indostaní como vibrante lengua franca de bazares y poetas.',
        highlight: 'Nacimiento del indostaní común'
      },
      {
        era: '1950',
        title: 'Idioma oficial de la República de la India',
        description: 'El hindi estándar escrito en devanagari fue designado lengua oficial de la Unión India y se celebra en todo el país durante el Hindi Diwas (14 de septiembre).',
        highlight: 'El Hindi Diwas se celebra cada 14 de septiembre'
      }
    ],
    linguisticTraits: [
      {
        title: 'La línea superior colgante (Shirorekha · शिरोरेखा)',
        description: 'Los caracteres devanagari cuelgan de una línea horizontal continua como ropa tendida al sol, agrupando visualmente las letras que forman cada palabra.',
        icon: '📏',
        example: 'क + म + ल = कमल (Loto)'
      },
      {
        title: 'Consonantes aspiradas frente a no aspiradas',
        description: 'El hindi distingue con nitidez entre oclusivas simples y oclusivas aspiradas con soplo de aire (k vs. kh, p vs. ph, t vs. th). Si pones la mano frente a la boca, notarás una ráfaga de aire en los sonidos aspirados.',
        icon: '💨',
        example: 'कल (Ayer/Mañana) vs. खल (Malvado)'
      }
    ],
    culturalNote: 'Las lenguas modernas han tomado prestadas cientos de palabras cotidianas del hindi y el sánscrito, entre ellas karma, gurú, jungla, avatar, pijama y champú.'
  },

  bn: {
    title: 'La lengua del alma: Tagore y el Movimiento por la Lengua',
    tagline: 'El único idioma de la historia humana cuyos hablantes lucharon y dieron la vida por preservar su lengua materna.',
    speakersCount: 'Más de 270 millones de hablantes nativos (n.º 6 del mundo)',
    writingSystem: 'Escritura bengalí-asamesa (বাংলা লিপি)',
    languageFamily: 'Indoeuropea (indoaria)',
    facts: [
      { label: 'Posición mundial', value: '6.ª lengua materna más hablada del mundo', icon: '🌐' },
      { label: 'Premio Nobel', value: 'Rabindranath Tagore (Nobel de Literatura en 1913)', icon: '🏅' },
      { label: 'Conmemoración UNESCO', value: 'Día Internacional de la Lengua Materna (21 de feb.)', icon: '🌺' },
      { label: 'Vocal inherente', value: 'Sonido «o» redondeado (অ /ɔ/)', icon: '👄' },
      { label: 'Género gramatical', value: '¡Ninguno! Verbos y adjetivos son neutros en género', icon: '⚖️' },
      { label: 'Himnos nacionales', value: 'Tagore compuso los himnos de la India y de Bangladés', icon: '🎶' }
    ],
    historyTimeline: [
      {
        era: 'Siglos X – XII',
        title: 'Charyapada: la poesía bengalí más antigua',
        description: 'Poetas místicos tántricos budistas compusieron los cantos del Charyapada en manuscritos de hoja de palma, dejando el testimonio más antiguo conservado de la lengua bengalí.',
        highlight: 'Cantos místicos en bengalí antiguo'
      },
      {
        era: '1913',
        title: 'Rabindranath Tagore gana el Premio Nobel',
        description: 'El polímata Rabindranath Tagore se convirtió en la primera persona no europea galardonada con el Premio Nobel de Literatura por su profundo poemario espiritual Gitanjali («Ofrenda lírica»).',
        highlight: 'Primer Premio Nobel asiático'
      },
      {
        era: '21 de febrero de 1952',
        title: 'El Movimiento por la Lengua Bengalí (ভাষা আন্দোলন)',
        description: 'Estudiantes de Daca salieron a las calles y sacrificaron sus vidas protestando contra los intentos de suprimir el bengalí como lengua oficial del Estado. En 1999, la UNESCO proclamó el 21 de febrero Día Internacional de la Lengua Materna en su honor.',
        highlight: 'Día Internacional de la Lengua Materna de la UNESCO'
      }
    ],
    linguisticTraits: [
      {
        title: 'La vocal inherente «o» redondeada',
        description: 'A diferencia del hindi, cuya vocal por defecto es una «a» breve, toda consonante bengalí sin marca vocálica porta un cálido sonido «o» redondeado (/ɔ/). Por ejemplo, জল se pronuncia «jol» (agua).',
        icon: '👄',
        example: 'ক = ko (no ka) · জল = jol'
      },
      {
        title: 'Neutralidad total de género',
        description: 'La gramática bengalí carece por completo de género gramatical. Hombres, mujeres y objetos inanimados emplean los mismos pronombres de tercera persona (সে él/ella) e idénticas formas verbales.',
        icon: '⚖️',
        example: 'সে যায় (Él va / Ella va)'
      }
    ],
    culturalNote: 'El Día Internacional de la Lengua Materna (21 de febrero) se conmemora en todo el mundo en homenaje a los mártires universitarios bengalíes de 1952.'
  },

  ur: {
    title: 'La lengua de la poesía: escritura nastaliq y elegancia cortesana',
    tagline: 'Nacida en campamentos reales y celebrada durante siglos en gazales, romances y filosofía.',
    speakersCount: 'Más de 230 millones de hablantes en total',
    writingSystem: 'Escritura perso-árabe nastaliq (نستعلیق · 39 letras)',
    languageFamily: 'Indoeuropea (indoaria)',
    facts: [
      { label: 'Origen del nombre', value: 'Del túrquico «Ordu» (campamento real)', icon: '⛺' },
      { label: 'Estilo caligráfico', value: 'Nastaliq (estilo persa inclinado y fluido)', icon: '✒️' },
      { label: 'Herencia léxica', value: 'Base prácrita con persa, árabe y túrquico', icon: '🏛️' },
      { label: 'Gemelo hablado', value: 'Mutuamente inteligible con el hindi hablado', icon: '🤝' },
      { label: 'Lengua nacional', value: 'República Islámica de Pakistán', icon: '🇵🇰' },
      { label: 'Formas poéticas', value: 'Gazal (غزل), nazm y qawwali', icon: '📜' }
    ],
    historyTimeline: [
      {
        era: 'Siglo XIII',
        title: 'Amir Khusrau y los campamentos de Delhi',
        description: 'El poeta sufí Amir Khusrau fue pionero en combinar la imaginería persa con la lengua vernácula hindaví local, sentando los cimientos de la literatura urdu temprana.',
        highlight: 'Padre de la literatura urdu'
      },
      {
        era: 'Siglos XVIII – XIX',
        title: 'La Edad de Oro de la poesía urdu (Mir y Ghalib)',
        description: 'Mirza Ghalib y Mir Taqi Mir transformaron la corte mogol de Delhi en la capital mundial del gazal, explorando el amor, la duda existencial y el misticismo con un lirismo inigualable.',
        highlight: 'Los versos inmortales de Mirza Ghalib'
      },
      {
        era: '1947',
        title: 'Lengua nacional de Pakistán',
        description: 'El urdu fue elegido lengua nacional integradora de Pakistán, sirviendo de lazo común entre diversas provincias hablantes de punyabí, sindhi, pastún y baluchi.',
        highlight: 'Símbolo nacional de unidad'
      }
    ],
    linguisticTraits: [
      {
        title: 'La escritura inclinada nastaliq',
        description: 'A diferencia del estilo árabe naskh horizontal estándar, el urdu se escribe y compone tradicionalmente en nastaliq, donde cada palabra desciende en diagonal de arriba a la derecha hacia abajo a la izquierda como seda en cascada.',
        icon: '✒️',
        example: 'La escritura nastaliq desciende en diagonal sobre el renglón.'
      },
      {
        title: 'Cortesía refinada y tehzeeb (adab)',
        description: 'El urdu distingue tres niveles de tratamiento para «tú/usted»: el íntimo «tu» (تو), el cortés «tum» (تم) y el reverencial «aap» (آپ), acompañados de exquisitas fórmulas de cortesía.',
        icon: '🙇',
        example: 'آپ تشریف رکھیے (Haga el honor de tomar asiento, por favor)'
      }
    ],
    culturalNote: 'El urdu es venerado en todo el sur de Asia como el idioma por excelencia del romanticismo, el refinamiento cortesano (tehzeeb) y la música mística sufí.'
  },

  id: {
    title: 'La lengua unificadora: 17.000 islas, un solo idioma',
    tagline: 'Cómo una pacífica promesa juvenil en 1928 unió a 700 grupos étnicos en el archipiélago más grande del mundo.',
    speakersCount: 'Más de 300 millones de hablantes en total',
    writingSystem: 'Alfabeto latino (26 letras, 100 % fonético)',
    languageFamily: 'Austronesia (malayo-polinesia)',
    facts: [
      { label: 'El juramento de 1928', value: 'Sumpah Pemuda (Juramento de la Juventud)', icon: '🇮🇩' },
      { label: 'Sencillez gramatical', value: 'Sin conjugaciones verbales, sin tiempos ni género', icon: '✨' },
      { label: 'Pluralización', value: 'Reduplicación de palabras (anak-anak = niños)', icon: '👶' },
      { label: 'Ortografía fonética', value: 'Las palabras se escriben tal como suenan', icon: '🔤' },
      { label: 'Dialecto base', value: 'Malayo de Riau (lengua comercial neutral)', icon: '🚢' },
      { label: 'Préstamos léxicos', value: 'Sánscrito, árabe, neerlandés, portugués y chino', icon: '🌏' }
    ],
    historyTimeline: [
      {
        era: 'Siglo VII',
        title: 'La Ruta Marítima de la Seda y el melayu pasar',
        description: 'Durante más de un milenio, el malayo costero (malayo de bazar) sirvió como lengua comercial neutral que conectaba a los sultanes de las islas de las Especias con mercaderes chinos y árabes.',
        highlight: 'Lengua franca neutral del comercio marítimo'
      },
      {
        era: '28 de octubre de 1928',
        title: 'El Juramento de la Juventud (Sumpah Pemuda)',
        description: 'Jóvenes patriotas indonesios tomaron una decisión visionaria: en lugar de imponer el javanés (la etnia mayoritaria), eligieron el malayo neutral para garantizar la fraternidad en igualdad entre las 700 lenguas locales.',
        highlight: '«Una patria, una nación, una lengua»'
      }
    ],
    linguisticTraits: [
      {
        title: 'Reduplicación para formar el plural',
        description: 'Para expresar el plural en indonesio, ¡basta con repetir la palabra! Anak es niño, así que anak-anak significa niños. Buku es libro, de modo que buku-buku significa libros.',
        icon: '🔁',
        example: 'Orang (persona) → orang-orang (personas)'
      },
      {
        title: 'Sistema de afijos (Me-, Di-, Ber-, Pe-)',
        description: 'Aunque el indonesio carece de tiempos verbales conjugados, un rico sistema de prefijos y sufijos transforma raíces léxicas en verbos activos, verbos pasivos y sustantivos abstractos.',
        icon: '🧩',
        example: 'Tulis (escribir) → menulis (escribir [activo]) → ditulis (es escrito)'
      }
    ],
    culturalNote: 'Los lingüistas consideran ampliamente al indonesio como uno de los idiomas más accesibles del mundo para empezar a conversar desde el primer día.'
  },

  es: {
    title: 'De Castilla a las Américas: el viaje global del español',
    tagline: 'Nacido del latín vulgar, enriquecido por 700 años de árabe y hablado por más de 500 millones de personas en 21 naciones.',
    speakersCount: 'Más de 500 millones de hablantes nativos (n.º 2 del mundo)',
    writingSystem: 'Alfabeto latino español (27 letras, incluida la Ñ)',
    languageFamily: 'Indoeuropea (romance)',
    facts: [
      { label: 'Hablantes nativos', value: '2.ª lengua materna más hablada del mundo', icon: '🌎' },
      { label: 'Influencia árabe', value: 'Más de 4.000 arabismos (azúcar, alcalde, ojalá)', icon: '🕌' },
      { label: 'Primera gramática moderna', value: 'Antonio de Nebrija (1492)', icon: '📖' },
      { label: 'Puntuación doble', value: '¡Exclamación de apertura! y ¿interrogación de apertura?', icon: '❓' },
      { label: 'Idioma oficial en', value: '21 países de 4 continentes', icon: '🏛️' },
      { label: 'Obra cumbre literaria', value: 'Don Quijote de la Mancha de Miguel de Cervantes', icon: '🛡️' }
    ],
    historyTimeline: [
      {
        era: 'c. 200 a. C. – 400 d. C.',
        title: 'La Hispania romana y el latín vulgar',
        description: 'Soldados, comerciantes y administradores romanos llevaron el latín vulgar hablado a la península ibérica, desplazando gradualmente a las lenguas prerromanas celtas e íberas.',
        highlight: 'Raíces latinas del español'
      },
      {
        era: '711 – 1492 d. C.',
        title: 'Al-Ándalus y el legado léxico árabe',
        description: 'Casi ocho siglos de presencia andalusí enriquecieron el castellano con miles de voces científicas, agrícolas y arquitectónicas, muchas iniciadas con el artículo árabe «al-».',
        highlight: 'Más de 4.000 préstamos árabes en el uso diario'
      },
      {
        era: '1492',
        title: 'La Gramática de Nebrija y la proyección hacia América',
        description: 'Antonio de Nebrija publicó la primera gramática de una lengua vernácula europea moderna, presentándola ante la reina Isabel como compañera de la expansión histórica.',
        highlight: 'Primera gramática de una lengua moderna europea'
      }
    ],
    linguisticTraits: [
      {
        title: 'Signos de apertura (¿ ? y ¡ !)',
        description: 'El español es la única gran lengua del mundo que advierte al lector sobre la entonación interrogativa o exclamativa desde el inicio mismo de la frase mediante signos de apertura.',
        icon: '❓',
        example: '¿Cómo estás? · ¡Qué bueno!'
      },
      {
        title: 'Ser frente a estar (dos formas de existir)',
        description: 'El español distingue con precisión entre la identidad o esencia permanente (ser) y los estados temporales o ubicaciones (estar). «Soy feliz» describe el carácter; «estoy feliz» expresa cómo me siento ahora.',
        icon: '⚖️',
        example: 'Soy profesor (identidad) vs. Estoy cansado (estado actual)'
      }
    ],
    culturalNote: 'El español se habla en 21 naciones soberanas, cada una de las cuales aporta vibrantes tradiciones musicales, gigantes literarios y giros expresivos propios.'
  },

  fr: {
    title: 'La lengua de la razón, la diplomacia y la Francofonía',
    tagline: 'El idioma histórico de los tratados, la filosofía de la Ilustración y más de 320 millones de hablantes en el mundo.',
    speakersCount: 'Más de 320 millones de hablantes en total',
    writingSystem: 'Alfabeto latino francés (26 letras + signos diacríticos)',
    languageFamily: 'Indoeuropea (romance)',
    facts: [
      { label: 'Alcance mundial', value: 'Idioma oficial en 29 países', icon: '🌍' },
      { label: 'Tradición diplomática', value: 'Lengua histórica de los tratados internacionales', icon: '🕊️' },
      { label: 'Guardián del idioma', value: 'Academia Francesa (fundada en 1635 por Richelieu)', icon: '🏛️' },
      { label: 'Olimpismo y correos', value: 'Lengua oficial de trabajo del COI y la UPU', icon: '🏅' },
      { label: 'Géneros gramaticales', value: '2 (masculino y femenino)', icon: '⚖️' },
      { label: 'Matices vocálicos', value: 'Vocales nasales (an, on, in, un)', icon: '🍷' }
    ],
    historyTimeline: [
      {
        era: '842 d. C.',
        title: 'Los Juramentos de Estrasburgo (Serments de Strasbourg)',
        description: 'El documento más antiguo conservado escrito en una lengua romance temprana ya diferenciada del latín, pronunciado por los nietos de Carlomagno.',
        highlight: 'Texto francés documentado más antiguo'
      },
      {
        era: '1539',
        title: 'Ordenanza de Villers-Cotterêts',
        description: 'El rey Francisco I decretó que el francés, en lugar del latín eclesiástico, debía emplearse en todas las actas jurídicas, leyes y decretos reales, consolidando el Estado francés unificado.',
        highlight: 'El francés proclamado lengua oficial del Estado'
      },
      {
        era: 'Siglo XVIII',
        title: 'La Ilustración y la lengua franca europea',
        description: 'El francés se convirtió en el idioma de las cortes reales europeas, la diplomacia y los filósofos ilustrados como Voltaire, Rousseau y Diderot.',
        highlight: 'Lengua universal de la diplomacia'
      }
    ],
    linguisticTraits: [
      {
        title: 'La liaison y la eufonía fluida',
        description: 'El francés otorga un valor supremo a la fluidez melódica (eufonía). Las consonantes finales normalmente mudas cobran voz y se enlazan con la vocal inicial siguiente (les amis → le-za-mí).',
        icon: '🎶',
        example: 'C’est un ami (Pronunciado: se-tœn-a-mí)'
      },
      {
        title: 'Vocales nasales',
        description: 'El francés cuenta con 4 vocales nasales características en las que el aire resuena simultáneamente por la boca y la nariz (pain, bon, vent, un).',
        icon: '👃',
        example: 'Bon (bueno) · Vin (vino) · Temps (tiempo)'
      }
    ],
    culturalNote: 'En la actualidad, la mayoría de los francófonos del mundo vive en el continente africano, lo que convierte al francés en una de las lenguas de más rápido crecimiento del siglo XXI.'
  },

  de: {
    title: 'La lengua de los poetas, los pensadores y la ingeniería de precisión',
    tagline: 'De la Biblia de Martín Lutero a la física de Einstein y sus célebres palabras compuestas.',
    speakersCount: 'Más de 130 millones de hablantes en total',
    writingSystem: 'Alfabeto latino alemán (26 letras + ä, ö, ü, ß)',
    languageFamily: 'Indoeuropea (germánica occidental)',
    facts: [
      { label: 'Más hablado en la UE', value: '1.ª lengua materna de la Unión Europea', icon: '🇪🇺' },
      { label: 'Palabras compuestas', value: 'Sustantivos unidos para expresar conceptos exactos', icon: '🧩' },
      { label: 'Casos gramaticales', value: '4 casos (nominativo, acusativo, dativo y genitivo)', icon: '🏛️' },
      { label: 'Géneros', value: '3 (der masculino, die femenino, das neutro)', icon: '⚖️' },
      { label: 'Mayúscula en sustantivos', value: 'Todos los sustantivos se escriben con mayúscula inicial', icon: '🔠' },
      { label: 'Legado científico', value: 'Lengua de Goethe, Kant, Beethoven y Einstein', icon: '🔬' }
    ],
    historyTimeline: [
      {
        era: 'Siglos VI – VIII',
        title: 'La mutación consonántica del alto alemán',
        description: 'Un gran cambio fonético separó al alemán de sus lenguas primas germánicas (como el inglés o el neerlandés), transformando la «t» en «z/ss» (inglés «water» → alemán «Wasser», «two» → «zwei»).',
        highlight: 'Divergencia respecto al protogermánico'
      },
      {
        era: '1522',
        title: 'La traducción de la Biblia de Martín Lutero',
        description: 'Martín Lutero tradujo el Nuevo Testamento a un dialecto cancilleresco sajón vivo y accesible, forjando un estándar literario alemán común a partir de cientos de dialectos regionales fragmentados.',
        highlight: 'Nacimiento del alemán estándar moderno (Hochdeutsch)'
      }
    ],
    linguisticTraits: [
      {
        title: 'Mayúscula inicial en todos los sustantivos',
        description: 'El alemán es la única gran lengua del mundo en la que todos los sustantivos se escriben con mayúscula inicial, lo que permite identificar al instante sujetos, objetos y conceptos en la página.',
        icon: '🔠',
        example: 'Das Buch (El libro) · Die Zeit (El tiempo)'
      },
      {
        title: 'Legendarias palabras compuestas',
        description: 'El alemán puede fusionar varios sustantivos en descripciones conceptuales exactas. Un guante es un «zapato de mano» (Handschuh) y un frigorífico es un «armario de frío» (Kühlschrank).',
        icon: '🧩',
        example: 'Kühlschrank (Armario de frío = Frigorífico)'
      }
    ],
    culturalNote: 'El alemán es lengua clave de la filosofía, la música clásica y la innovación industrial de vanguardia en Alemania, Austria y Suiza.'
  },

  pt: {
    title: 'La lengua de Camões y las rutas oceánicas',
    tagline: 'Hablada en 4 continentes, desde Lisboa hasta Río de Janeiro, Luanda y Maputo.',
    speakersCount: 'Más de 260 millones de hablantes nativos',
    writingSystem: 'Alfabeto latino portugués (26 letras + signos diacríticos)',
    languageFamily: 'Indoeuropea (romance)',
    facts: [
      { label: 'Hemisferio sur', value: 'Idioma más hablado del hemisferio sur', icon: '🌎' },
      { label: 'Poeta nacional', value: 'Luís de Camões (Os Lusíadas, 1572)', icon: '📜' },
      { label: 'Tildes nasales', value: 'La célebre tilde nasal (ã, õ) de sonoridad musical', icon: '🎵' },
      { label: 'Géneros', value: '2 (masculino -o, femenino -a)', icon: '⚖️' },
      { label: 'El concepto de saudade', value: 'Añoranza intraducible y afecto nostálgico', icon: '💖' },
      { label: 'Mayor población', value: 'Brasil concentra cerca del 80 % de sus hablantes', icon: '🇧🇷' }
    ],
    historyTimeline: [
      {
        era: 'Siglos IX – XII',
        title: 'Galaicoportugués (Galego-Português)',
        description: 'Evolucionado a partir del latín vulgar en el noroeste de la península ibérica, el galaicoportugués se convirtió en la lengua predilecta de la poesía lírica trovadoresca medieval.',
        highlight: 'Edad de oro de la lírica medieval'
      },
      {
        era: 'Siglos XV – XVI',
        title: 'La Era de los Descubrimientos y la diáspora global',
        description: 'Navegantes portugueses como Vasco da Gama llevaron el idioma a través de los océanos hasta Brasil, África (Angola, Mozambique), la India (Goa) y Macao.',
        highlight: 'Expansión marítima mundial'
      }
    ],
    linguisticTraits: [
      {
        title: 'Vocales nasales con virgulilla (ã, õ)',
        description: 'La tilde o virgulilla era en su origen una diminuta «n» abreviada del latín medieval escrita sobre una vocal (canção procede de cantionem). Produce la cálida e inconfundible resonancia nasal del portugués.',
        icon: '🎵',
        example: 'Pão (Pan) · Não (No) · Coração (Corazón)'
      },
      {
        title: 'Saudade: el alma del idioma',
        description: 'Considerada a menudo una de las palabras intraducibles más bellas del mundo, saudade describe una añoranza agridulce por alguien querido o un lugar lejano.',
        icon: '💖',
        example: 'Tenho saudades de você (Te echo profundamente de menos)'
      }
    ],
    culturalNote: 'El portugués es lengua oficial de nueve países hermanados en la CPLP (Comunidad de Países de Lengua Portuguesa).'
  },

  en: {
    title: 'La lengua franca global: de las raíces anglosajonas a la red mundial',
    tagline: 'Cómo una lengua insular absorbió el latín, el nórdico antiguo y el francés hasta convertirse en el idioma común del mundo.',
    speakersCount: 'Más de 1.500 millones de hablantes en total',
    writingSystem: 'Alfabeto latino inglés (26 letras)',
    languageFamily: 'Indoeuropea (germánica occidental)',
    facts: [
      { label: 'Estatus mundial', value: 'Lengua franca global de la ciencia, la tecnología y la aviación', icon: '🌐' },
      { label: 'Vocabulario híbrido', value: '~60 % de raíces latinas/francesas + ~26 % germánicas', icon: '🧬' },
      { label: 'Riqueza léxica', value: 'Más de 500.000 palabras en el diccionario Oxford', icon: '📚' },
      { label: 'Sencillez gramatical', value: 'Sin género gramatical y con flexión verbal mínima', icon: '✨' },
      { label: 'Ortografía peculiar', value: 'Conserva grafías históricas mientras los sonidos cambiaron', icon: '🎩' },
      { label: 'La red digital', value: 'Idioma principal del software, internet y la programación', icon: '💻' }
    ],
    historyTimeline: [
      {
        era: 'c. 450 d. C.',
        title: 'Inglés antiguo (influencias anglosajonas y vikingas)',
        description: 'Tribus germánicas (anglos, sajones y jutos) llegaron a Gran Bretaña. Las incursiones vikingas de habla nórdica antigua aportaron palabras básicas cotidianas como sky (cielo), skin (piel), take (tomar), they (ellos) y give (dar).',
        highlight: 'Poema épico anglosajón Beowulf'
      },
      {
        era: '1066 d. C.',
        title: 'La conquista normanda y el aporte francés',
        description: 'Guillermo el Conquistador convirtió el francés anglonormando en la lengua de la corte real y las leyes, creando un célebre vocabulario de doble estrato (animales de granja germánicos frente a carnes cocinadas francesas: pig/pork [cerdo], cow/beef [vaca/res]).',
        highlight: 'Auge del vocabulario francés y latino'
      },
      {
        era: 'c. 1600 d. C.',
        title: 'Shakespeare y la Biblia del rey Jacobo',
        description: 'William Shakespeare acuñó más de 1.700 palabras y expresiones nuevas, mientras que la Biblia del rey Jacobo estandarizó la cadencia poética del inglés en todo el mundo.',
        highlight: 'El inglés moderno alza el vuelo'
      }
    ],
    linguisticTraits: [
      {
        title: 'Vocabulario de doble registro germánico y francés',
        description: 'El inglés dispone de casi dos palabras para cada idea: una voz germánica directa y cotidiana, y un equivalente francés o latino más culto y formal.',
        icon: '🧬',
        example: 'Ask (germánico: preguntar) vs. Inquire (francés: indagar) · Kingly vs. Royal (regio/real)'
      },
      {
        title: 'Ausencia de género gramatical',
        description: 'A diferencia del alemán o el español, el inglés abandonó el género gramatical de los sustantivos hace siglos. ¡Todo lleva simplemente el artículo «the»!',
        icon: '✨',
        example: 'The sun (el sol), the moon (la luna), the table (la mesa) — sin géneros que memorizar.'
      }
    ],
    culturalNote: 'El inglés es hoy el sistema operativo indiscutible de la ciencia mundial, la aviación, el comercio internacional y la red global de internet.'
  }
};
