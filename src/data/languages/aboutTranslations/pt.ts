import { AboutLanguageTranslations } from './types';

export const ABOUT_TRANSLATIONS_PT: AboutLanguageTranslations = {
  zh: {
    title: 'A história do mandarim e do chinês simplificado',
    tagline: 'Dos ossos oraculares de 3.000 anos atrás à revolução da alfabetização nos anos 1950 e ao nascimento do pinyin.',
    speakersCount: 'Mais de 1,1 bilhão de falantes nativos',
    writingSystem: 'Caracteres chineses simplificados (简体字) e hanyu pinyin (汉语拼音)',
    languageFamily: 'Sino-tibetana',
    facts: [
      { label: 'Falantes nativos', value: '1,1 bilhão (n.º 1 do mundo)', icon: '👥' },
      { label: 'Escrita oficial', value: 'Caracteres simplificados (简体字)', icon: '✍️' },
      { label: 'Ponte fonética', value: 'Hanyu pinyin (adotado em 1958)', icon: '🔤' },
      { label: 'Dialeto padrão', value: 'Fonologia de Pequim', icon: '📍' },
      { label: 'Conjugação verbal', value: 'Zero (sem formas de passado ou futuro)', icon: '✨' },
      { label: 'Idioma oficial da ONU', value: 'Desde 1946', icon: '🌐' }
    ],
    historyTimeline: [
      {
        era: 'c. 1200 a.C.',
        title: 'Escrita em ossos oraculares (甲骨文 · Jiǎgǔwén)',
        description: 'A mais antiga escrita chinesa conhecida, entalhada em cascos de tartaruga e omoplatas de boi durante a dinastia Shang para adivinhação. Os caracteres eram representações pictóricas diretas de elementos naturais como o sol (日) e a água (水).',
        highlight: 'Nascimento do chinês escrito'
      },
      {
        era: '221 a.C.',
        title: 'Unificação imperial da escrita (秦始皇 · Escrita do pequeno selo)',
        description: 'O primeiro imperador da China, Qin Shi Huang, unificou centenas de variações regionais de escrita em um único padrão nacional de pequeno selo e escrita clerical, garantindo que os decretos fossem lidos igualmente em todas as províncias, independentemente do dialeto falado.',
        highlight: 'Unificação da China'
      },
      {
        era: 'c. 200 d.C. – década de 1950',
        title: 'Escrita regular tradicional (繁体楷书 · Fántǐ Kǎishū)',
        description: 'Durante quase 1.800 anos, o chinês tradicional permaneceu como o padrão máximo da expressão literária, administrativa e poética. Contudo, caracteres complexos com 20 a 30 traços criavam imensas barreiras educacionais para a população trabalhadora.',
        highlight: 'Era da literatura clássica'
      },
      {
        era: '1949 – 1956',
        title: 'A crise do analfabetismo e os caracteres simplificados (简体字)',
        description: 'Em 1949, a China enfrentava uma taxa de analfabetismo superior a 80%. Para democratizar rapidamente a educação, o governo lançou o Esquema de Simplificação dos Caracteres Chineses (汉字简化方案). Mais de 2.200 caracteres complexos foram sistematicamente simplificados com base em formas cursivas seculares e na redução do número de traços.',
        highlight: 'A alfabetização nacional saltou de 20% para mais de 96%'
      },
      {
        era: '1958',
        title: 'Zhou Youguang e a invenção do pinyin (汉语拼音)',
        description: 'O economista e linguista Zhou Youguang liderou o Comitê para a Reforma da Língua Escrita Chinesa na criação do hanyu pinyin. Usando o alfabeto latino, o pinyin ofereceu uma ponte fonética acessível da qual dependem hoje os teclados de computador e smartphones.',
        highlight: 'Zhou Youguang viveu até os 111 anos (1906–2017)'
      }
    ],
    scriptComparison: [
      {
        traditional: '國',
        simplified: '国',
        pinyin: 'guó',
        meaning: 'País / Nação',
        traditionalStrokes: 11,
        simplifiedStrokes: 8,
        reason: 'Substituiu o complexo radical interno de arma pelo símbolo do jade (玉), representando um tesouro protegido dentro das fronteiras nacionais (囗).'
      },
      {
        traditional: '學',
        simplified: '学',
        pinyin: 'xué',
        meaning: 'Estudar / Aprender',
        traditionalStrokes: 16,
        simplifiedStrokes: 8,
        reason: 'Reduziu a elaborada parte superior erudita de 16 traços a uma forma cursiva enxuta de 8 traços que já era usada informalmente havia séculos.'
      },
      {
        traditional: '愛',
        simplified: '爱',
        pinyin: 'ài',
        meaning: 'Amor',
        traditionalStrokes: 13,
        simplifiedStrokes: 10,
        reason: 'Substituiu o complexo radical central do coração (心) pela forma abreviada de amigo/harmonia (友) para tornar a escrita mais fluida e ágil.'
      },
      {
        traditional: '門',
        simplified: '门',
        pinyin: 'mén',
        meaning: 'Porta / Portão',
        traditionalStrokes: 8,
        simplifiedStrokes: 3,
        reason: 'Simplificou os dois batentes de uma porta em um contorno aberto de apenas 3 traços.'
      },
      {
        traditional: '馬',
        simplified: '马',
        pinyin: 'mǎ',
        meaning: 'Cavalo',
        traditionalStrokes: 10,
        simplifiedStrokes: 3,
        reason: 'Transformou a crina, as patas e a cauda em 3 pinceladas cursivas contínuas.'
      }
    ],
    linguisticTraits: [
      {
        title: 'Sem conjugação verbal',
        description: 'Ao contrário do português ou do espanhol, com dezenas de desinências verbais, os verbos em chinês nunca mudam! “Comer” (吃 chī) é idêntico para eu como, tu comes, nós comemos ou eles comerão. O tempo é indicado de modo simples por marcadores temporais (ontem, amanhã) ou partículas aspectuais (了 le).',
        icon: '⚡',
        example: '我吃 (Eu como) · 我昨天吃了 (Ontem eu comi)'
      },
      {
        title: 'Sem gênero gramatical nem terminações de plural',
        description: 'Não existem artigos masculinos ou femininos (o/a) e os substantivos não sofrem flexão de plural. Uma maçã é 一个苹果 e cinco maçãs é 五个苹果.',
        icon: '🍎',
        example: '苹果 (Maçã) é sempre 苹果, no singular ou no plural.'
      },
      {
        title: 'Palavras de medida (classificadores)',
        description: 'Sempre que se contam objetos em mandarim, um classificador específico liga o número ao substantivo de acordo com seu formato ou categoria (por exemplo, 本 běn para livros, 辆 liàng para veículos, 张 zhāng para folhas e superfícies planas).',
        icon: '📏',
        example: '一本书 (Um livro) · 一辆车 (Um carro)'
      },
      {
        title: 'Idioma tonal (4 tons)',
        description: 'O mandarim utiliza 4 contornos melódicos distintos (alto constante, ascendente, descendente-ascendente e descendente), além de um tom neutro. Mudar a entonação altera completamente o caractere e o significado da sílaba.',
        icon: '🎵',
        example: 'mā (Mãe 妈) vs. mǎ (Cavalo 马)'
      }
    ],
    culturalNote: 'Hoje, o chinês simplificado é o padrão na China continental, em Singapura e em órgãos internacionais como a ONU, enquanto o chinês tradicional continua sendo valorizado em Taiwan, Hong Kong, Macau e na caligrafia clássica.'
  },

  ko: {
    title: 'O milagre do hangul: o presente real da alfabetização',
    tagline: 'Em 1443, o rei Sejong criou um dos alfabetos mais cientificamente projetados do mundo.',
    speakersCount: 'Mais de 80 milhões de falantes nativos',
    writingSystem: 'Hangul (한글) — Alfabeto fonético de traços articulatórios',
    languageFamily: 'Coreânica (língua isolada)',
    facts: [
      { label: 'Inventor', value: 'Rei Sejong, o Grande (1443)', icon: '👑' },
      { label: 'Sistema alfabético', value: '24 letras básicas (consoantes e vogais)', icon: '🔤' },
      { label: 'Concepção científica', value: 'O formato das letras imita a boca e a língua', icon: '👅' },
      { label: 'Feriado nacional', value: 'Dia do Hangul (9 de outubro)', icon: '🎉' },
      { label: 'Ordem das palavras', value: 'SOV (Sujeito-Objeto-Verbo)', icon: '🧱' },
      { label: 'Honoríficos', value: 'Níveis de cortesia integrados à gramática', icon: '🙇' }
    ],
    historyTimeline: [
      {
        era: 'Antes de 1443',
        title: 'O peso do hanja (caracteres chineses)',
        description: 'Os coreanos não tinham sistema de escrita próprio e escreviam usando complexos caracteres chineses (hanja). Como o chinês e o coreano pertencem a famílias linguísticas completamente distintas, apenas a elite aristocrática abastada (yangban) dispunha das décadas necessárias para se alfabetizar.',
        highlight: 'O povo comum não conseguia ler leis nem escrever cartas'
      },
      {
        era: '1443 – 1446',
        title: 'O rei Sejong promulga o Hunminjeongeum',
        description: 'Determinado a emancipar os cidadãos comuns, o rei Sejong desenvolveu secretamente o hangul com estudiosos da corte. Em 1446, publicou o Hunminjeongeum (“Os sons corretos para a instrução do povo”), declarando que escrever deveria ser tão fácil quanto respirar.',
        highlight: '“Um sábio aprende em uma manhã; um tolo, em dez dias.”'
      },
      {
        era: 'Século XX',
        title: 'Democratização e a onda hallyu',
        description: 'Apesar da resistência histórica das elites tradicionais, o hangul triunfou na era moderna, levando a Coreia do Sul a uma das maiores taxas de alfabetização do planeta (99%) e impulsionando suas exportações culturais globais (K-pop, K-dramas).',
        highlight: 'Prêmio Rei Sejong de Alfabetização da UNESCO criado em 1989'
      }
    ],
    linguisticTraits: [
      {
        title: 'Escrita articulatória (imitação da boca e da língua)',
        description: 'As letras do hangul não são arbitrárias: ㄱ imita a língua bloqueando a garganta, ㄴ reproduz a língua tocando a gengiva superior e ㅁ desenha o contorno dos lábios.',
        icon: '👅',
        example: 'ㅁ (m) mostra os lábios fechados; ㅂ (b) acrescenta traços para a oclusão.'
      },
      {
        title: 'Arquitetura em blocos silábicos',
        description: 'As letras são empilhadas em blocos silábicos quadrados em vez de escritas numa linha horizontal contínua. Por exemplo, h (ㅎ) + a (ㅏ) + n (ㄴ) agrupam-se em “한” (han).',
        icon: '🧱',
        example: 'ㅎ + ㅏ + ㄴ = 한 (Han)'
      },
      {
        title: 'Ordem Sujeito-Objeto-Verbo (SOV)',
        description: 'Em coreano, o verbo vem sempre no finalzinho da frase. “Eu como uma maçã” estrutura-se como “Eu maçã como” (저는 사과를 먹어요).',
        icon: '🔄',
        example: '저는 (Eu) + 사과를 (Maçã) + 먹어요 (Como)'
      }
    ],
    culturalNote: 'O Dia do Hangul é comemorado como feriado nacional na Coreia do Sul todo dia 9 de outubro para celebrar a criação real que trouxe liberdade linguística ao povo.'
  },

  ja: {
    title: 'A harmonia de três escritas (漢字 · ひらがな · カタカナ)',
    tagline: 'Uma elegante sinfonia linguística que combina ideogramas chineses com dois silabários fonéticos nativos.',
    speakersCount: 'Mais de 125 milhões de falantes nativos',
    writingSystem: 'Kanji (漢字), hiragana (ひらがな) e katakana (カタカナ)',
    languageFamily: 'Japônica',
    facts: [
      { label: 'Escritas em uso', value: '3 sistemas de escrita interligados', icon: '✍️' },
      { label: 'Joyo kanji', value: '2.136 caracteres ensinados nas escolas', icon: '📚' },
      { label: 'Ordem das palavras', value: 'SOV (o verbo vem sempre por último)', icon: '🔄' },
      { label: 'Sistema melódico', value: 'Acento tonal de altura (alto/baixo)', icon: '🎵' },
      { label: 'Estrangeirismos', value: 'Escritos em katakana (ex.: コーヒー)', icon: '☕' },
      { label: 'Partículas', value: 'Marcadores gramaticais (は, が, を, に)', icon: '🏷️' }
    ],
    historyTimeline: [
      {
        era: 'Século V',
        title: 'A chegada do kanji a partir do continente asiático',
        description: 'Antes do contato com a China, o japonês era uma língua puramente oral. Os caracteres chineses (kanji) foram adotados para registrar nomes japoneses, leis e sutras budistas.',
        highlight: 'Adaptação dos logogramas chineses'
      },
      {
        era: 'Séculos VIII – X',
        title: 'A invenção do hiragana e a literatura feminina',
        description: 'Damas da corte imperial simplificaram kanjis cursivos em sílabas fonéticas fluidas chamadas hiragana (“mão feminina”). Isso fez florescer obras-primas da literatura mundial, como O Conto de Genji, de Murasaki Shikibu.',
        highlight: 'Nascimento da escrita fonética nativa'
      },
      {
        era: 'Era moderna',
        title: 'O katakana e a integração do vocabulário global',
        description: 'O katakana, originalmente criado por monges budistas como notas abreviadas de leitura, tornou-se a escrita dedicada a termos científicos modernos, nomes estrangeiros e empréstimos globais (ex.: コンピューター konpyūtā).',
        highlight: 'Três escritas atuando em perfeita sintonia'
      }
    ],
    linguisticTraits: [
      {
        title: 'O sistema triplo de escrita',
        description: 'Uma única frase costuma reunir as três escritas: o kanji carrega as raízes de significado (私 eu, 食べる comer), o hiragana expressa terminações gramaticais e partículas (は, を, ました), e o katakana transcreve palavras estrangeiras (パン pão).',
        icon: '🧩',
        example: '私はパンを食べました (Eu comi pão)'
      },
      {
        title: 'Partículas gramaticais (助詞 · Joshi)',
        description: 'Pequenas partículas pospostas indicam o papel exato de cada palavra na frase (は tópico, が sujeito, を objeto direto, に destino ou tempo).',
        icon: '🏷️',
        example: '猫が (o gato [sujeito]) + 魚を (peixe [objeto]) + 食べた (comeu)'
      }
    ],
    culturalNote: 'Dominar o japonês permite apreciar uma profunda relação cultural entre caligrafia visual, níveis respeitosos de tratamento (keigo) e comunicação guiada pelo contexto.'
  },

  ru: {
    title: 'A alma eslava: dos monges cirílicos a Púchkin e Tolstói',
    tagline: 'Uma língua rica e expressiva lapidada por eruditos bizantinos, Pedro, o Grande, e grandes poetas.',
    speakersCount: 'Mais de 255 milhões de falantes no total',
    writingSystem: 'Alfabeto cirílico russo (33 letras)',
    languageFamily: 'Indo-europeia (eslava oriental)',
    facts: [
      { label: 'Alfabeto', value: '33 letras (10 vogais, 21 consoantes e 2 sinais)', icon: '🔤' },
      { label: 'Reforma gráfica', value: 'Pedro, o Grande (1708) e reforma soviética (1918)', icon: '📜' },
      { label: 'Sistema de casos', value: '6 casos gramaticais', icon: '🏛️' },
      { label: 'Gêneros', value: '3 (masculino, feminino e neutro)', icon: '⚖️' },
      { label: 'Língua espacial', value: 'Obrigatória na EEI ao lado do inglês', icon: '🚀' },
      { label: 'Era de Ouro literária', value: 'Púchkin, Tolstói, Dostoiévski, Tchekhov', icon: '📖' }
    ],
    historyTimeline: [
      {
        era: 'c. 863 d.C.',
        title: 'Os santos Cirilo e Metódio',
        description: 'Os irmãos missionários bizantinos Cirilo e Metódio desenvolveram o alfabeto glagolítico para traduzir textos bíblicos aos povos eslavos, o qual logo evoluiu no Primeiro Império Búlgaro para formar o alfabeto cirílico.',
        highlight: 'Nascimento do alfabeto cirílico'
      },
      {
        era: '1708',
        title: 'A reforma da escrita civil de Pedro, o Grande (Гражданский шрифт)',
        description: 'O czar Pedro, o Grande, riscou pessoalmente letras gregas eclesiásticas arcaicas e redesenhou o cirílico russo para aproximá-lo da tipografia da Europa Ocidental, modernizando a ciência, as cartas náuticas e a imprensa russa.',
        highlight: 'Secularização e modernização'
      },
      {
        era: '1918',
        title: 'A grande reforma ortográfica pós-revolucionária',
        description: 'O governo bolchevique simplificou a ortografia abolindo letras históricas redundantes (como ѣ “iat”, ѳ “fita” e o ъ “ier” final imperial), consolidando o alfabeto enxuto de 33 letras usado até hoje.',
        highlight: 'Estabelecimento do padrão atual de 33 letras'
      }
    ],
    linguisticTraits: [
      {
        title: 'Acento tônico móvel',
        description: 'A sílaba tônica em russo é imprevisível e pode mudar o sentido da palavra (за́мок = castelo vs. замо́к = cadeado). O “o” átono reduz-se naturalmente a um som próximo de “a” (молоко́ → malakó).',
        icon: '🎯',
        example: 'за́мок (castelo) vs. замо́к (cadeado)'
      },
      {
        title: 'Consoantes brandas e duras (palatalização)',
        description: 'Quase todas as consoantes formam pares duros (simples) ou brandos (palatalizados), diferenciados pela vogal seguinte ou pelo sinal brando (ь).',
        icon: '🎶',
        example: 'брат (irmão) vs. брать (pegar)'
      }
    ],
    culturalNote: 'O russo é um dos seis idiomas oficiais das Nações Unidas e a segunda língua operacional obrigatória a bordo da Estação Espacial Internacional.'
  },

  tr: {
    title: 'O milagre de 1928: a revolução alfabética de Atatürk',
    tagline: 'Como uma nação inteira migrou da escrita árabe otomana para um alfabeto latino fonético em poucos meses.',
    speakersCount: 'Mais de 85 milhões de falantes nativos',
    writingSystem: 'Alfabeto latino turco (29 letras)',
    languageFamily: 'Túrquica',
    facts: [
      { label: 'A reforma de 1928', value: 'Harf Devrimi (revolução do alfabeto de Atatürk)', icon: '🏛️' },
      { label: 'Alfabeto', value: '29 letras (totalmente fonético: 1 letra = 1 som)', icon: '🔤' },
      { label: 'Estrutura linguística', value: 'Aglutinante (encadeamento lógico de sufixos)', icon: '🧱' },
      { label: 'Harmonia vocálica', value: 'Vogais anteriores e posteriores combinam em harmonia', icon: '🎵' },
      { label: 'Gênero gramatical', value: 'Nenhum! “Ele”, “ela” e “isso” são apenas “o”', icon: '⚖️' },
      { label: 'Ordem das palavras', value: 'SOV (Sujeito-Objeto-Verbo)', icon: '🔄' }
    ],
    historyTimeline: [
      {
        era: 'Século X – 1928 d.C.',
        title: 'O turco otomano e a incompatibilidade com a escrita árabe',
        description: 'Por mais de 900 anos, o turco foi escrito com caracteres árabes otomanos. No entanto, o árabe representa apenas 3 vogais básicas, ao passo que o turco possui 8 vogais ricas. Essa incompatibilidade gerava ambiguidade constante e mantinha a alfabetização abaixo de 10%.',
        highlight: 'Analfabetismo generalizado devido ao descompasso gráfico'
      },
      {
        era: '1928',
        title: 'A revolução linguística de Mustafa Kemal Atatürk (Harf Devrimi)',
        description: 'Fundador da República da Turquia, Atatürk percorreu pessoalmente cidades e vilarejos com um quadro-negro para ensinar um novo alfabeto latino fonético de 29 letras adaptado à fonologia turca (introduzindo ç, ğ, ı, ö, ş, ü).',
        highlight: 'A alfabetização nacional saltou de 10% para mais de 90%'
      }
    ],
    linguisticTraits: [
      {
        title: 'Cadeias aglutinantes de sufixos',
        description: 'As palavras são construídas encaixando sufixos numa raiz como peças de montar. Uma única palavra turca pode expressar o que exigiria uma frase inteira em português!',
        icon: '🧱',
        example: 'Ev (casa) → evler (casas) → evlerimde (em minhas casas)'
      },
      {
        title: 'Harmonia vocálica (Ünlü Uyumu)',
        description: 'As vogais dentro da palavra harmonizam-se musicalmente entre vogais posteriores (a, ı, o, u) e anteriores (e, i, ö, ü). Os sufixos ajustam automaticamente suas vogais para combinar com a raiz.',
        icon: '🎶',
        example: 'araba-lar (carros) vs. kedi-ler (gatos)'
      }
    ],
    culturalNote: 'Como a ortografia turca é 100% fonética, assim que você aprende os sons das 29 letras, consegue pronunciar com precisão qualquer palavra do idioma.'
  },

  ar: {
    title: 'A língua da eloquência (لغة الضاد · Lughat al-Dad)',
    tagline: 'Uma língua sagrada de raízes e padrões que une mais de 400 milhões de falantes em todo o mundo árabe.',
    speakersCount: 'Mais de 400 milhões de falantes no total',
    writingSystem: 'Abjad árabe (28 letras, da direita para a esquerda)',
    languageFamily: 'Afro-asiática (semítica)',
    facts: [
      { label: 'Direção da escrita', value: 'Da direita para a esquerda', icon: '⬅️' },
      { label: 'Alfabeto', value: '28 letras (consoantes e vogais longas)', icon: '🔤' },
      { label: 'Sistema de raízes', value: 'Raízes consonantais de 3 letras (trilíteras)', icon: '🌱' },
      { label: 'O som exclusivo', value: 'Dad (ض) — encontrado quase exclusivamente no árabe', icon: '🗣️' },
      { label: 'Número dual', value: 'Formas para singular, dual (dois) e plural', icon: '2️⃣' },
      { label: 'Dia mundial na ONU', value: 'Dia Mundial da Língua Árabe (18 de dezembro)', icon: '🌐' }
    ],
    historyTimeline: [
      {
        era: 'Século VI d.C.',
        title: 'Poesia pré-islâmica (Mu’allaqat)',
        description: 'Poetas beduínos memorizavam complexas odes rimadas que exaltavam a honra e a bravura no deserto, estabelecendo o sublime padrão poético do árabe clássico.',
        highlight: 'Era de ouro da poesia pré-islâmica'
      },
      {
        era: 'Século VII d.C.',
        title: 'O Alcorão e a preservação linguística',
        description: 'A revelação e a compilação do Sagrado Alcorão codificaram a gramática e a fonologia árabes, preservando o idioma praticamente inalterado por mais de 1.400 anos.',
        highlight: 'Padrão litúrgico universal do Islã'
      },
      {
        era: 'Era moderna',
        title: 'Árabe padrão moderno (الفصحى · Fus’ha)',
        description: 'Hoje, o árabe padrão moderno funciona como a língua formal compartilhada na literatura, no jornalismo, na diplomacia e na educação em 22 países.',
        highlight: 'Língua franca comum do mundo árabe'
      }
    ],
    linguisticTraits: [
      {
        title: 'A engrenagem das raízes de 3 letras (الجذر · Al-Jidhr)',
        description: 'Quase toda palavra árabe nasce de uma raiz de 3 letras que carrega um sentido abstrato. Por exemplo, K-T-B (ك-ت-ب), ligada à escrita, gera kitāb (livro), kātib (escritor), maktab (escritório) e maktūb (escrito/destino).',
        icon: '🌱',
        example: 'ك-ت-ب → كتاب (Livro) · مكتبة (Biblioteca) · كاتب (Autor)'
      },
      {
        title: 'Ligaduras cursivas',
        description: 'As letras árabes conectam-se numa escrita cursiva fluida, mudando de forma conforme ocupem a posição inicial, medial, final ou isolada na palavra.',
        icon: '✍️',
        example: 'ب na posição inicial (بـ), medial (ـبـ) ou final (ـب)'
      }
    ],
    culturalNote: 'A caligrafia árabe é celebrada como uma das formas mais elevadas de arte visual da história humana.'
  },

  hi: {
    title: 'A voz da Índia: do antigo sânscrito a Bollywood',
    tagline: 'Escrita no gracioso alfabeto devanágari (“Cidade dos Deuses”) e falada por mais de 600 milhões de pessoas.',
    speakersCount: 'Mais de 600 milhões de falantes no total',
    writingSystem: 'Escrita abugida devanágari (देवनागरी)',
    languageFamily: 'Indo-europeia (indo-ariana)',
    facts: [
      { label: 'Alfabeto', value: 'Escrita devanágari (11 vogais, 33 consoantes e ligaduras)', icon: '🔤' },
      { label: 'Linha superior', value: 'Shirorekha (traço horizontal que sustenta as letras)', icon: '📏' },
      { label: 'Língua irmã', value: 'Coloquialmente intercompreensível com o urdu', icon: '🤝' },
      { label: 'Ordem das palavras', value: 'SOV (Sujeito-Objeto-Verbo)', icon: '🔄' },
      { label: 'Ancestral', value: 'Sânscrito (संस्कृतम्)', icon: '🏛️' },
      { label: 'Influência global', value: 'Ioga, avatar, guru, chai, pijama, xampu', icon: '🧘' }
    ],
    historyTimeline: [
      {
        era: 'c. 1500 a.C.',
        title: 'Raízes no sânscrito védico',
        description: 'O sânscrito védico evoluiu para dialetos prácritos regionais falados pela população cotidiana em todo o norte da Índia.',
        highlight: 'Hinos védicos e filosofia clássica'
      },
      {
        era: 'Séculos XIII – XVIII',
        title: 'O surgimento do hindustâni',
        description: 'O Sultanato de Déli e a era mogol trouxeram vocabulário persa, túrquico e árabe para a conversa diária, moldando o hindustâni como língua franca vibrante dos bazares e da poesia.',
        highlight: 'Nascimento do hindustâni comum'
      },
      {
        era: '1950',
        title: 'Idioma oficial da República da Índia',
        description: 'O hindi padrão escrito em devanágari foi designado língua oficial da União Indiana, sendo celebrado nacionalmente no Hindi Diwas (14 de setembro).',
        highlight: 'O Hindi Diwas é celebrado todo dia 14 de setembro'
      }
    ],
    linguisticTraits: [
      {
        title: 'O traço superior suspenso (Shirorekha · शिरोरेखा)',
        description: 'Os caracteres devanágari pendem de uma linha horizontal contínua como roupas num varal, agrupando visualmente as letras de cada palavra.',
        icon: '📏',
        example: 'क + म + ल = कमल (Lótus)'
      },
      {
        title: 'Consoantes aspiradas vs. não aspiradas',
        description: 'O hindi diferencia claramente consoantes oclusivas simples de oclusivas aspiradas pronunciadas com sopro de ar (k vs. kh, p vs. ph, t vs. th). Ao colocar a mão diante da boca, sente-se o sopro nos sons aspirados.',
        icon: '💨',
        example: 'कल (Ontem/Amanhã) vs. खल (Perverso)'
      }
    ],
    culturalNote: 'O português e outras línguas ocidentais absorveram diversas palavras cotidianas do hindi e do sânscrito, incluindo carma, guru, avatar, chita, pijama e xampu.'
  },

  bn: {
    title: 'A língua da alma: Tagore e o Movimento pela Língua',
    tagline: 'O único idioma da história humana cujos falantes lutaram e deram a vida para preservar sua língua materna.',
    speakersCount: 'Mais de 270 milhões de falantes nativos (n.º 6 do mundo)',
    writingSystem: 'Escrita bengali-assamesa (বাংলা লিপি)',
    languageFamily: 'Indo-europeia (indo-ariana)',
    facts: [
      { label: 'Posição mundial', value: '6.ª língua materna mais falada do mundo', icon: '🌐' },
      { label: 'Prêmio Nobel', value: 'Rabindranath Tagore (Nobel de Literatura em 1913)', icon: '🏅' },
      { label: 'Data da UNESCO', value: 'Dia Internacional da Língua Materna (21 de fev.)', icon: '🌺' },
      { label: 'Vogal inerente', value: 'Som arredondado de “o” (অ /ɔ/)', icon: '👄' },
      { label: 'Gênero gramatical', value: 'Nenhum! Verbos e adjetivos são neutros em gênero', icon: '⚖️' },
      { label: 'Hinos nacionais', value: 'Tagore compôs os hinos da Índia e de Bangladesh', icon: '🎶' }
    ],
    historyTimeline: [
      {
        era: 'Séculos X – XII',
        title: 'Charyapada: a mais antiga poesia bengali',
        description: 'Poetas místicos tântricos budistas compuseram os cânticos do Charyapada em manuscritos de folha de palmeira, registrando a forma mais antiga conhecida da língua bengali.',
        highlight: 'Canções místicas em bengali antigo'
      },
      {
        era: '1913',
        title: 'Rabindranath Tagore conquista o Prêmio Nobel',
        description: 'O polímata Rabindranath Tagore tornou-se o primeiro não europeu a vencer o Prêmio Nobel de Literatura por sua profunda coletânea espiritual Gitanjali (“Oferenda Lírica”).',
        highlight: 'Primeiro laureado asiático do Nobel'
      },
      {
        era: '21 de fevereiro de 1952',
        title: 'O Movimento pela Língua Bengali (ভাষা আন্দোলন)',
        description: 'Estudantes em Daca saíram às ruas e sacrificaram a própria vida protestando contra tentativas de excluir o bengali como idioma oficial de Estado. Em 1999, a UNESCO declarou o dia 21 de fevereiro Dia Internacional da Língua Materna em sua homenagem.',
        highlight: 'Dia Internacional da Língua Materna da UNESCO'
      }
    ],
    linguisticTraits: [
      {
        title: 'A vogal inerente “o” arredondada',
        description: 'Diferentemente do hindi, cujo padrão é um “a” curto, toda consoante bengali sem sinal vocálico carrega um som suave e arredondado de “o” aberto (/ɔ/). Assim, জল pronuncia-se “djol” (água).',
        icon: '👄',
        example: 'ক = ko (e não ka) · জল = jol'
      },
      {
        title: 'Neutralidade total de gênero',
        description: 'A gramática bengali não possui gênero gramatical. Homens, mulheres e objetos inanimados usam os mesmos pronomes de terceira pessoa (সে ele/ela) e formas verbais idênticas.',
        icon: '⚖️',
        example: 'সে যায় (Ele vai / Ela vai)'
      }
    ],
    culturalNote: 'O Dia Internacional da Língua Materna (21 de fevereiro) é celebrado mundialmente em tributo aos estudantes mártires bengalis de 1952.'
  },

  ur: {
    title: 'A língua da poesia: escrita nastaliq e elegância cortesã',
    tagline: 'Nascida nos acampamentos reais e celebrada há séculos em gazéis, romances e filosofia.',
    speakersCount: 'Mais de 230 milhões de falantes no total',
    writingSystem: 'Escrita perso-árabe nastaliq (نستعلیق · 39 letras)',
    languageFamily: 'Indo-europeia (indo-ariana)',
    facts: [
      { label: 'Origem do nome', value: 'Do túrquico “Ordu” (acampamento real)', icon: '⛺' },
      { label: 'Estilo caligráfico', value: 'Nastaliq (estilo persa inclinado e fluido)', icon: '✒️' },
      { label: 'Herança vocabular', value: 'Base prácrita com persa, árabe e túrquico', icon: '🏛️' },
      { label: 'Gêmeo falado', value: 'Mutuamente inteligível com o hindi falado', icon: '🤝' },
      { label: 'Língua nacional', value: 'República Islâmica do Paquistão', icon: '🇵🇰' },
      { label: 'Formas poéticas', value: 'Gazel (غزل), nazm e qawwali', icon: '📜' }
    ],
    historyTimeline: [
      {
        era: 'Século XIII',
        title: 'Amir Khusrau e os acampamentos de Déli',
        description: 'O poeta sufi Amir Khusrau foi pioneiro ao unir imagens poéticas persas ao vernáculo hindavi local, lançando os alicerces da literatura urdu.',
        highlight: 'Pai da literatura urdu'
      },
      {
        era: 'Séculos XVIII – XIX',
        title: 'A Era de Ouro da poesia urdu (Mir e Ghalib)',
        description: 'Mirza Ghalib e Mir Taqi Mir transformaram a corte mogol de Déli na capital mundial do gazel, explorando o amor, a dúvida existencial e o misticismo com lirismo incomparável.',
        highlight: 'Os versos imortais de Mirza Ghalib'
      },
      {
        era: '1947',
        title: 'Língua nacional do Paquistão',
        description: 'O urdu foi escolhido como língua nacional unificadora do Paquistão, servindo de elo comum entre diversas províncias falantes de punjabi, sindi, pashto e balúchi.',
        highlight: 'Símbolo nacional de unidade'
      }
    ],
    linguisticTraits: [
      {
        title: 'A escrita inclinada nastaliq',
        description: 'Ao contrário do árabe naskh horizontal padrão, o urdu é tradicionalmente manuscrito e diagramado em nastaliq, estilo no qual cada palavra desce diagonalmente do canto superior direito ao inferior esquerdo como seda em cascata.',
        icon: '✒️',
        example: 'A escrita nastaliq desce em diagonal pela linha.'
      },
      {
        title: 'Cortesia refinada e tehzeeb (adab)',
        description: 'O urdu conta com três níveis distintos de tratamento para “você/tu”: o íntimo “tu” (تو), o cordial “tum” (تم) e o reverente “aap” (آپ), acompanhados de expressões requintadas de gentileza.',
        icon: '🙇',
        example: 'آپ تشریف رکھیے (Conceda-nos a honra de se sentar, por favor)'
      }
    ],
    culturalNote: 'O urdu é reverenciado em todo o sul da Ásia como o idioma supremo do romantismo, do refinamento cortesão (tehzeeb) e da música mística sufi.'
  },

  id: {
    title: 'A língua unificadora: 17.000 ilhas, um só idioma',
    tagline: 'Como um juramento pacífico da juventude em 1928 uniu 700 grupos étnicos no maior arquipélago do planeta.',
    speakersCount: 'Mais de 300 milhões de falantes no total',
    writingSystem: 'Alfabeto latino (26 letras, 100% fonético)',
    languageFamily: 'Austronésia (malaio-polinésia)',
    facts: [
      { label: 'O juramento de 1928', value: 'Sumpah Pemuda (Juramento da Juventude pela Unidade)', icon: '🇮🇩' },
      { label: 'Simplicidade gramatical', value: 'Sem conjugações verbais, sem tempos nem gênero', icon: '✨' },
      { label: 'Pluralização', value: 'Reduplicação da palavra (anak-anak = crianças)', icon: '👶' },
      { label: 'Escrita fonética', value: 'As palavras são escritas exatamente como soam', icon: '🔤' },
      { label: 'Dialeto base', value: 'Malaio de Riau (língua comercial neutra)', icon: '🚢' },
      { label: 'Empréstimos lexicais', value: 'Sânscrito, árabe, holandês, português e chinês', icon: '🌏' }
    ],
    historyTimeline: [
      {
        era: 'Século VII',
        title: 'A Rota Marítima da Seda e o melayu pasar',
        description: 'Por mais de um milênio, o malaio costeiro (malaio dos mercados) serviu como língua comercial neutra conectando sultões das Ilhas das Especiarias, mercadores chineses e comerciantes árabes.',
        highlight: 'Língua franca neutra do comércio marítimo'
      },
      {
        era: '28 de outubro de 1928',
        title: 'O Juramento da Juventude (Sumpah Pemuda)',
        description: 'Jovens patriotas indonésios tomaram uma decisão visionária: em vez de escolher o javanês (da maioria étnica dominante), adotaram o malaio neutro para garantir igualdade fraterna entre todas as 700 línguas locais.',
        highlight: '“Uma pátria, uma nação, uma língua”'
      }
    ],
    linguisticTraits: [
      {
        title: 'Reduplicação para formar o plural',
        description: 'Para colocar algo no plural em indonésio, basta repetir a palavra! Anak é criança, logo anak-anak significa crianças. Buku é livro, portanto buku-buku significa livros.',
        icon: '🔁',
        example: 'Orang (pessoa) → orang-orang (pessoas)'
      },
      {
        title: 'Sistema de afixos (Me-, Di-, Ber-, Pe-)',
        description: 'Embora o indonésio não flexione verbos por tempo, um rico conjunto de prefixos e sufixos transforma raízes em verbos ativos, verbos passivos e substantivos abstratos.',
        icon: '🧩',
        example: 'Tulis (escrever) → menulis (escrever [ativo]) → ditulis (é escrito)'
      }
    ],
    culturalNote: 'O indonésio é amplamente considerado pelos linguistas um dos idiomas mais acessíveis do mundo para iniciantes começarem a falar desde o primeiro dia.'
  },

  es: {
    title: 'De Castela às Américas: a jornada global do espanhol',
    tagline: 'Nascido do latim vulgar, enriquecido por 700 anos de árabe e falado por mais de 500 milhões em 21 nações.',
    speakersCount: 'Mais de 500 milhões de falantes nativos (n.º 2 do mundo)',
    writingSystem: 'Alfabeto latino espanhol (27 letras, incluindo o Ñ)',
    languageFamily: 'Indo-europeia (românica)',
    facts: [
      { label: 'Falantes nativos', value: '2.ª língua materna mais falada do mundo', icon: '🌎' },
      { label: 'Influência árabe', value: 'Mais de 4.000 palavras de origem árabe (azúcar, alcalde, ojalá)', icon: '🕌' },
      { label: 'Primeira gramática moderna', value: 'Antonio de Nebrija (1492)', icon: '📖' },
      { label: 'Pontuação invertida', value: '¡Exclamação de abertura! e ¿interrogação de abertura?', icon: '❓' },
      { label: 'Oficial em', value: '21 países distribuídos por 4 continentes', icon: '🏛️' },
      { label: 'Obra-prima literária', value: 'Dom Quixote, de Miguel de Cervantes', icon: '🛡️' }
    ],
    historyTimeline: [
      {
        era: 'c. 200 a.C. – 400 d.C.',
        title: 'A Hispânia romana e o latim vulgar',
        description: 'Soldados, mercadores e administradores romanos levaram o latim vulgar falado à Península Ibérica, substituindo gradualmente as línguas celtas e ibéricas pré-romanas.',
        highlight: 'Raízes latinas do espanhol'
      },
      {
        era: '711 – 1492 d.C.',
        title: 'Al-Andalus e o legado lexical árabe',
        description: 'Quase 800 anos de presença mourisca enriqueceram o espanhol com milhares de termos científicos, agrícolas e arquitetônicos, muitos iniciados pelo artigo árabe “al-”.',
        highlight: 'Mais de 4.000 empréstimos árabes no uso cotidiano'
      },
      {
        era: '1492',
        title: 'A Gramática de Nebrija e a expansão para as Américas',
        description: 'Antonio de Nebrija publicou a primeira gramática de uma língua vernácula europeia moderna, apresentando-a à rainha Isabel no ano decisivo da expansão atlântica.',
        highlight: 'Primeira gramática de uma língua vernácula europeia'
      }
    ],
    linguisticTraits: [
      {
        title: 'Pontuação invertida (¿ ? e ¡ !)',
        description: 'O espanhol é a única grande língua que prepara o leitor para a entonação da frase logo no início, utilizando pontos de interrogação e de exclamação invertidos.',
        icon: '❓',
        example: '¿Cómo estás? · ¡Qué bueno!'
      },
      {
        title: 'Ser vs. Estar (duas formas de “ser/estar”)',
        description: 'Assim como o português, o espanhol distingue a essência ou identidade permanente (ser) de estados temporários ou localizações (estar). “Soy feliz” indica ser uma pessoa feliz; “estoy feliz” expressa sentir-se feliz agora.',
        icon: '⚖️',
        example: 'Soy profesor (identidade) vs. Estoy cansado (estado atual)'
      }
    ],
    culturalNote: 'O espanhol é falado em 21 nações soberanas, cada qual contribuindo com tradições musicais vibrantes, gigantes da literatura e expressões regionais únicas.'
  },

  fr: {
    title: 'A língua da razão, da diplomacia e da Francofonia',
    tagline: 'O idioma histórico dos tratados, da filosofia iluminista e de mais de 320 milhões de falantes pelo mundo.',
    speakersCount: 'Mais de 320 milhões de falantes no total',
    writingSystem: 'Alfabeto latino francês (26 letras + sinais diacríticos)',
    languageFamily: 'Indo-europeia (românica)',
    facts: [
      { label: 'Presença mundial', value: 'Idioma oficial em 29 países', icon: '🌍' },
      { label: 'Tradição diplomática', value: 'Língua histórica dos tratados internacionais', icon: '🕊️' },
      { label: 'Guardiã do idioma', value: 'Academia Francesa (fundada em 1635 por Richelieu)', icon: '🏛️' },
      { label: 'Olimpíadas e correios', value: 'Língua oficial de trabalho do COI e da UPU', icon: '🏅' },
      { label: 'Gêneros gramaticais', value: '2 (masculino e feminino)', icon: '⚖️' },
      { label: 'Nuances vocálicas', value: 'Vogais nasais (an, on, in, un)', icon: '🍷' }
    ],
    historyTimeline: [
      {
        era: '842 d.C.',
        title: 'Os Juramentos de Estrasburgo (Serments de Strasbourg)',
        description: 'O documento mais antigo preservado redigido num vernáculo românico já distinto do latim, jurado pelos netos de Carlos Magno.',
        highlight: 'Mais antigo texto francês documentado'
      },
      {
        era: '1539',
        title: 'Ordenança de Villers-Cotterêts',
        description: 'O rei Francisco I decretou que o francês, em vez do latim eclesiástico, deveria ser utilizado em todos os atos jurídicos, leis e decretos reais, consolidando o Estado francês unificado.',
        highlight: 'O francês declarado língua oficial de Estado'
      },
      {
        era: 'Século XVIII',
        title: 'O Iluminismo e a língua franca europeia',
        description: 'O francês tornou-se o idioma das cortes reais europeias, da diplomacia e de pensadores iluministas como Voltaire, Rousseau e Diderot.',
        highlight: 'Língua global da diplomacia'
      }
    ],
    linguisticTraits: [
      {
        title: 'Liaison e fluidez melódica (eufonia)',
        description: 'O francês valoriza imensamente a fluidez sonora (eufonia). Consoantes finais normalmente mudas ganham som e ligam-se à vogal seguinte (les amis → lê-za-mi).',
        icon: '🎶',
        example: 'C’est un ami (Pronunciado: sê-tãn-a-mi)'
      },
      {
        title: 'Vogais nasais',
        description: 'O francês apresenta 4 vogais nasais características nas quais o ar flui simultaneamente pela boca e pelo nariz (pain, bon, vent, un).',
        icon: '👃',
        example: 'Bon (bom) · Vin (vinho) · Temps (tempo)'
      }
    ],
    culturalNote: 'Hoje, a maioria dos falantes de francês do planeta vive no continente africano, fazendo do francês uma das línguas que mais crescem no século XXI.'
  },

  de: {
    title: 'A língua dos poetas, dos pensadores e da engenharia de precisão',
    tagline: 'Da Bíblia de Martinho Lutero à física de Einstein e às notáveis palavras compostas.',
    speakersCount: 'Mais de 130 milhões de falantes no total',
    writingSystem: 'Alfabeto latino alemão (26 letras + ä, ö, ü, ß)',
    languageFamily: 'Indo-europeia (germânica ocidental)',
    facts: [
      { label: 'Mais falada na UE', value: '1.ª língua materna da União Europeia', icon: '🇪🇺' },
      { label: 'Palavras compostas', value: 'Palavras encadeadas para formar conceitos exatos', icon: '🧩' },
      { label: 'Casos gramaticais', value: '4 casos (nominativo, acusativo, dativo e genitivo)', icon: '🏛️' },
      { label: 'Gêneros', value: '3 (der masculino, die feminino, das neutro)', icon: '⚖️' },
      { label: 'Substantivos em maiúscula', value: 'Todo substantivo é grafado com inicial maiúscula', icon: '🔠' },
      { label: 'Herança científica', value: 'Língua de Goethe, Kant, Beethoven e Einstein', icon: '🔬' }
    ],
    historyTimeline: [
      {
        era: 'Séculos VI – VIII',
        title: 'A mutação consonantal do alto-alemão',
        description: 'Uma grande mudança fonética separou o alemão de suas línguas primas germânicas (inglês e holandês), transformando o “t” em “z/ss” (inglês “water” → alemão “Wasser”, “two” → “zwei”).',
        highlight: 'Divergência em relação ao proto-germânico'
      },
      {
        era: '1522',
        title: 'A tradução da Bíblia por Martinho Lutero',
        description: 'Martinho Lutero traduziu o Novo Testamento para um dialeto saxão de chancelaria vibrante e acessível, forjando um padrão literário nacional unificado a partir de centenas de dialetos regionais.',
        highlight: 'Nascimento do alemão padrão moderno (Hochdeutsch)'
      }
    ],
    linguisticTraits: [
      {
        title: 'Inicial maiúscula em todos os substantivos',
        description: 'O alemão é a única grande língua do mundo em que todo substantivo recebe letra maiúscula inicial, tornando sujeitos, objetos e conceitos imediatamente reconhecíveis na leitura.',
        icon: '🔠',
        example: 'Das Buch (O livro) · Die Zeit (O tempo)'
      },
      {
        title: 'Lendárias palavras compostas',
        description: 'O alemão funde substantivos em descrições conceituais precisas. Uma luva é um “sapato de mão” (Handschuh) e uma geladeira é um “armário de frio” (Kühlschrank).',
        icon: '🧩',
        example: 'Kühlschrank (Armário de frio = Geladeira)'
      }
    ],
    culturalNote: 'O alemão é língua central da filosofia, da música clássica e da inovação industrial de ponta na Alemanha, na Áustria e na Suíça.'
  },

  pt: {
    title: 'A língua de Camões e das rotas oceânicas',
    tagline: 'Falada em 4 continentes, de Lisboa ao Rio de Janeiro, Luanda e Maputo.',
    speakersCount: 'Mais de 260 milhões de falantes nativos',
    writingSystem: 'Alfabeto latino português (26 letras + sinais diacríticos)',
    languageFamily: 'Indo-europeia (românica)',
    facts: [
      { label: 'Hemisfério Sul', value: 'Idioma mais falado do Hemisfério Sul', icon: '🌎' },
      { label: 'Poeta nacional', value: 'Luís de Camões (Os Lusíadas, 1572)', icon: '📜' },
      { label: 'Til nasal', value: 'O famoso til (ã, õ) de sonoridade nasal musical', icon: '🎵' },
      { label: 'Gêneros', value: '2 (masculino -o, feminino -a)', icon: '⚖️' },
      { label: 'O conceito de saudade', value: 'Lembrança intraduzível e afeto nostálgico', icon: '💖' },
      { label: 'Maior população', value: 'O Brasil reúne cerca de 80% de todos os falantes', icon: '🇧🇷' }
    ],
    historyTimeline: [
      {
        era: 'Séculos IX – XII',
        title: 'Galego-português',
        description: 'Evoluindo do latim vulgar no noroeste da Península Ibérica, o galego-português tornou-se a língua suprema da poesia lírica trovadoresca medieval.',
        highlight: 'Era de ouro do trovadorismo medieval'
      },
      {
        era: 'Séculos XV – XVI',
        title: 'A Era dos Descobrimentos e a diáspora global',
        description: 'Navegadores portugueses como Vasco da Gama levaram a língua através dos oceanos até o Brasil, a África (Angola, Moçambique), a Índia (Goa) e Macau.',
        highlight: 'Expansão marítima mundial'
      }
    ],
    linguisticTraits: [
      {
        title: 'Vogais nasais com til (ã, õ)',
        description: 'O til era originalmente um pequeno “n” abreviado do latim medieval escrito sobre a vogal (canção veio de cantionem). Ele produz a ressonância nasal acolhedora e inconfundível do português.',
        icon: '🎵',
        example: 'Pão · Não · Coração'
      },
      {
        title: 'Saudade: a alma do idioma',
        description: 'Frequentemente citada como uma das mais belas palavras intraduzíveis do mundo, saudade descreve a lembrança agridoce de alguém querido ou de um lugar ausente.',
        icon: '💖',
        example: 'Tenho saudades de você (Sinto profundamente a sua falta)'
      }
    ],
    culturalNote: 'O português é a língua oficial de nove países unidos na CPLP (Comunidade dos Países de Língua Portuguesa).'
  },

  en: {
    title: 'A língua franca global: das raízes anglo-saxãs à rede mundial',
    tagline: 'Como um idioma insular absorveu o latim, o nórdico antigo e o francês para se tornar a língua comum do mundo.',
    speakersCount: 'Mais de 1,5 bilhão de falantes no total',
    writingSystem: 'Alfabeto latino inglês (26 letras)',
    languageFamily: 'Indo-europeia (germânica ocidental)',
    facts: [
      { label: 'Alcance mundial', value: 'Língua franca global da tecnologia, da ciência e da aviação', icon: '🌐' },
      { label: 'Vocabulário híbrido', value: '~60% de raízes latinas/francesas + ~26% germânicas', icon: '🧬' },
      { label: 'Total de palavras', value: 'Mais de 500.000 palavras no dicionário Oxford', icon: '📚' },
      { label: 'Simplicidade gramatical', value: 'Sem gênero gramatical e com flexão verbal mínima', icon: '✨' },
      { label: 'Ortografia peculiar', value: 'Grafias históricas preservadas mesmo após mudanças fonéticas', icon: '🎩' },
      { label: 'Mundo digital', value: 'Idioma principal de softwares, da internet e da programação', icon: '💻' }
    ],
    historyTimeline: [
      {
        era: 'c. 450 d.C.',
        title: 'Inglês antigo (influências anglo-saxãs e vikings)',
        description: 'Tribos germânicas (anglos, saxões e jutos) chegaram à Grã-Bretanha. As incursões vikings de língua nórdica antiga trouxeram palavras essenciais do cotidiano como sky (céu), skin (pele), take (pegar), they (eles) e give (dar).',
        highlight: 'Poema épico anglo-saxão Beowulf'
      },
      {
        era: '1066 d.C.',
        title: 'A conquista normanda e a infusão francesa',
        description: 'Guilherme, o Conquistador, tornou o francês anglo-normando o idioma da corte real e da justiça, criando um célebre vocabulário em duas camadas (animais criados no campo em germânico vs. carnes servidas à mesa em francês: pig/pork [porco], cow/beef [vaca/carne bovina]).',
        highlight: 'Explosão do vocabulário francês e latino'
      },
      {
        era: 'c. 1600 d.C.',
        title: 'Shakespeare e a Bíblia do Rei Jaime',
        description: 'William Shakespeare cunhou mais de 1.700 novas palavras e expressões, enquanto a Bíblia do Rei Jaime padronizou a cadência poética do inglês pelo mundo.',
        highlight: 'O inglês moderno ganha impulso mundial'
      }
    ],
    linguisticTraits: [
      {
        title: 'Vocabulário em dupla camada: germânico e francês',
        description: 'O inglês dispõe de duas palavras para quase tudo: um termo germânico direto e cotidiano e um equivalente francês ou latino mais erudito.',
        icon: '🧬',
        example: 'Ask (germânico: perguntar) vs. Inquire (francês: indagar) · Kingly vs. Royal (real/régio)'
      },
      {
        title: 'Ausência de gênero gramatical',
        description: 'Ao contrário do português ou do alemão, o inglês abandonou o gênero gramatical nos substantivos há séculos. Tudo usa simplesmente o artigo “the”!',
        icon: '✨',
        example: 'The sun (o sol), the moon (a lua), the table (a mesa) — nenhum gênero para decorar.'
      }
    ],
    culturalNote: 'O inglês é hoje o sistema operacional incontestável da ciência mundial, da aviação, do comércio internacional e da rede global da internet.'
  }
};
