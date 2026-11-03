import { AboutLanguageTranslations } from './types';

export const ABOUT_TRANSLATIONS_ID: AboutLanguageTranslations = {
  zh: {
    title: 'Kisah Bahasa Mandarin & Aksara Hanzi Sederhana',
    tagline: 'Dari tulang ramalan berusia 3.000 tahun hingga revolusi melek huruf tahun 1950-an dan lahirnya Pinyin.',
    speakersCount: 'Lebih dari 1,1 Miliar Penutur Jati',
    writingSystem: 'Aksara Hanzi Sederhana (简体字) & Hanyu Pinyin (汉语拼音)',
    languageFamily: 'Sino-Tibet',
    facts: [
      { label: 'Penutur Jati', value: '1,1 Miliar (Peringkat 1 Dunia)', icon: '👥' },
      { label: 'Aksara Resmi', value: 'Aksara Sederhana (简体字)', icon: '✍️' },
      { label: 'Jembatan Fonetik', value: 'Hanyu Pinyin (Diresmikan 1958)', icon: '🔤' },
      { label: 'Dialek Baku', value: 'Fonologi Beijing', icon: '📍' },
      { label: 'Konjugasi Kata Kerja', value: 'Nol (Tanpa perubahan bentuk lampau/depan)', icon: '✨' },
      { label: 'Bahasa Resmi PBB', value: 'Sejak 1946', icon: '🌐' }
    ],
    historyTimeline: [
      {
        era: 'sekitar 1200 SM',
        title: 'Aksara Tulang Ramalan (甲骨文 · Jiǎgǔwén)',
        description: 'Tulisan Tionghoa tertua yang diketahui, diukir pada tempurung kura-kura dan tulang belikat lembu pada masa Dinasti Shang untuk ritual ramalan. Karakter-karakternya merupakan gambaran visual langsung dari unsur alam seperti matahari (日) dan air (水).',
        highlight: 'Lahirnya bahasa tulis Tionghoa'
      },
      {
        era: '221 SM',
        title: 'Penyatuan Aksara Kekaisaran (秦始皇 · Aksara Segel Kecil)',
        description: 'Kaisar Pertama Tiongkok, Qin Shi Huang, menyatukan ratusan variasi tulisan daerah menjadi satu standar nasional Aksara Segel Kecil dan Aksara Resmi, sehingga maklumat kekaisaran dapat dibaca seragam di seluruh provinsi terlepas dari perbedaan dialek lisan.',
        highlight: 'Penyatuan aksara Tiongkok'
      },
      {
        era: 'sekitar 200 M – 1950-an',
        title: 'Aksara Baku Tradisional (繁体楷书 · Fántǐ Kǎishū)',
        description: 'Selama hampir 1.800 tahun, aksara Hanzi Tradisional menjadi tolok ukur utama sastra, pemerintahan, dan puisi. Namun, karakter rumit yang terdiri atas 20 hingga 30 guratan menciptakan hambatan pendidikan yang besar bagi rakyat pekerja biasa.',
        highlight: 'Zaman keemasan sastra klasik'
      },
      {
        era: '1949 – 1956',
        title: 'Krisis Buta Huruf & Aksara Sederhana (简体字)',
        description: 'Pada tahun 1949, tingkat buta huruf di Tiongkok melampaui 80%. Demi memeratakan pendidikan secara cepat, pemerintah meluncurkan Skema Penyederhanaan Aksara Hanzi (汉字简化方案). Lebih dari 2.200 karakter rumit diringkas secara sistematis berdasarkan bentuk tulisan cepat yang telah digunakan selama berabad-abad.',
        highlight: 'Tingkat melek huruf nasional melonjak dari 20% menjadi lebih dari 96%'
      },
      {
        era: '1958',
        title: 'Zhou Youguang & Penemuan Pinyin (汉语拼音)',
        description: 'Ekonom dan pakar bahasa Zhou Youguang memimpin Komite Reformasi Bahasa Tulis Tionghoa untuk merancang Hanyu Pinyin. Menggunakan abjad Latin, Pinyin menjadi jembatan fonetik mudah yang kini menjadi tumpuan papan ketik komputer dan ponsel cerdas.',
        highlight: 'Zhou Youguang hidup hingga usia 111 tahun (1906–2017)'
      }
    ],
    scriptComparison: [
      {
        traditional: '國',
        simplified: '国',
        pinyin: 'guó',
        meaning: 'Negara / Bangsa',
        traditionalStrokes: 11,
        simplifiedStrokes: 8,
        reason: 'Mengganti komponen senjata yang rumit di bagian dalam dengan lambang batu giok (玉), melambangkan pusaka berharga yang dijaga di dalam batas negara (囗).'
      },
      {
        traditional: '學',
        simplified: '学',
        pinyin: 'xué',
        meaning: 'Belajar / Menuntut Ilmu',
        traditionalStrokes: 16,
        simplifiedStrokes: 8,
        reason: 'Meringkas bagian atap terpelajar berjumlah 16 guratan menjadi bentuk ringkas 8 guratan yang telah lama dipakai dalam tulisan tangan sehari-hari.'
      },
      {
        traditional: '愛',
        simplified: '爱',
        pinyin: 'ài',
        meaning: 'Cinta / Kasih',
        traditionalStrokes: 13,
        simplifiedStrokes: 10,
        reason: 'Mengganti radikal hati (心) yang rapat di bagian tengah dengan unsur sahabat/kerukunan (友) agar penulisan lebih mengalir dan cepat.'
      },
      {
        traditional: '門',
        simplified: '门',
        pinyin: 'mén',
        meaning: 'Pintu / Gerbang',
        traditionalStrokes: 8,
        simplifiedStrokes: 3,
        reason: 'Menyederhanakan dua daun pintu ayun menjadi garis bentuk gawang pintu terbuka dalam 3 guratan.'
      },
      {
        traditional: '馬',
        simplified: '马',
        pinyin: 'mǎ',
        meaning: 'Kuda',
        traditionalStrokes: 10,
        simplifiedStrokes: 3,
        reason: 'Menyatukan surai, empat kaki, dan ekor menjadi 3 sapuan kuas kursif yang berkesinambungan.'
      }
    ],
    linguisticTraits: [
      {
        title: 'Tanpa Konjugasi Kata Kerja',
        description: 'Berbeda dengan bahasa Spanyol atau Prancis yang memiliki puluhan perubahan akhiran kata kerja, kata kerja bahasa Mandarin tidak pernah berubah bentuk—persis seperti bahasa Indonesia! Kata "makan" (吃 chī) tetap sama untuk saya makan, kamu makan, kemarin kami makan, atau besok mereka makan. Waktu cukup ditunjukkan dengan keterangan waktu (kemarin, besok) atau partikel aspek (了 le).',
        icon: '⚡',
        example: '我吃 (Saya makan) · 昨天我吃 (Kemarin saya makan)'
      },
      {
        title: 'Tanpa Genus Tata Bahasa atau Akhiran Jamak',
        description: 'Tidak ada kata sandang maskulin/feminin, dan kata benda tidak berubah bentuk ketika jamak. Satu buah apel adalah 一个苹果, sedangkan lima buah apel adalah 五个苹果.',
        icon: '🍎',
        example: '苹果 (Apel) selalu tetap 苹果, baik tunggal maupun jamak.'
      },
      {
        title: 'Kata Penggolong (Kata Bantu Bilangan)',
        description: 'Setiap kali menghitung benda dalam bahasa Mandarin, kata bantu bilangan khusus menghubungkan angka dengan kata benda berdasarkan bentuk atau kategorinya (mis. 本 běn untuk buku, 辆 liàng untuk kendaraan, 张 zhāng untuk lembaran tipis).',
        icon: '📏',
        example: '一本书 (Sebuah buku) · 一辆车 (Sebuah mobil)'
      },
      {
        title: 'Bahasa Bernada (4 Nada Utama)',
        description: 'Bahasa Mandarin menggunakan 4 pola tinggi-rendah suara yang tegas (datar tinggi, naik, turun-naik, mengentak turun) ditambah satu nada netral. Perubahan nada suara mengubah karakter sekaligus arti suku kata sepenuhnya.',
        icon: '🎵',
        example: 'mā (Ibu 妈) dibandingkan mǎ (Kuda 马)'
      }
    ],
    culturalNote: 'Kini, aksara Hanzi Sederhana menjadi standar resmi di Tiongkok Daratan, Singapura, dan badan internasional seperti PBB, sementara Hanzi Tradisional tetap dilestarikan di Taiwan, Hong Kong, Makau, serta seni kaligrafi klasik.'
  },

  ko: {
    title: 'Keajaiban Hangeul: Anugerah Melek Huruf dari Sang Raja',
    tagline: 'Pada tahun 1443, Raja Sejong menciptakan salah satu sistem abjad paling ilmiah di dunia.',
    speakersCount: 'Lebih dari 80 Juta Penutur Jati',
    writingSystem: 'Hangeul (한글) — Abjad Fonetik Berbasis Alat Ucap',
    languageFamily: 'Koreanik (Bahasa Isolat)',
    facts: [
      { label: 'Pencipta', value: 'Raja Sejong yang Agung (1443)', icon: '👑' },
      { label: 'Sistem Abjad', value: '24 Huruf Inti (Konsonan & Vokal)', icon: '🔤' },
      { label: 'Rancangan Ilmiah', value: 'Bentuk huruf meniru posisi mulut & lidah', icon: '👅' },
      { label: 'Hari Libur Nasional', value: 'Hari Hangeul (9 Oktober)', icon: '🎉' },
      { label: 'Urutan Kata', value: 'Subjek-Objek-Kata Kerja (Kata kerja di akhir)', icon: '🧱' },
      { label: 'Tingkat Tutur', value: 'Tingkatan kesantunan menyatu dalam tata bahasa', icon: '🙇' }
    ],
    historyTimeline: [
      {
        era: 'Sebelum 1443',
        title: 'Beban Aksara Hanja (Karakter Tionghoa)',
        description: 'Masyarakat Korea dahulu belum memiliki aksara asli dan menulis menggunakan karakter Tionghoa yang rumit (Hanja). Karena bahasa Tionghoa dan Korea berasal dari rumpun bahasa yang sama sekali berbeda, hanya kaum bangsawan berada (Yangban) yang sanggup meluangkan puluhan tahun untuk belajar membaca.',
        highlight: 'Rakyat jelata tidak dapat membaca hukum atau menulis surat'
      },
      {
        era: '1443 – 1446',
        title: 'Raja Sejong Memaklumatkan Hunminjeongeum',
        description: 'Bertekad memberdayakan rakyat biasa, Raja Sejong secara diam-diam merancang Hangeul bersama para cendekiawan istana. Pada tahun 1446, beliau menerbitkan Hunminjeongeum ("Bunyi yang Tepat untuk Pengajaran Rakyat"), menyatakan bahwa menulis seharusnya semudah bernapas.',
        highlight: '"Orang bijak dapat mempelajarinya dalam satu pagi; orang awam dalam sepuluh hari."'
      },
      {
        era: 'Abad ke-20',
        title: 'Demokratisasi & Gelombang Budaya Korea (Hallyu)',
        description: 'Meski sempat ditentang kaum bangsawan tradisional pada masa lampau, Hangeul berjaya di era modern dan mengantarkan Korea Selatan mencapai salah satu tingkat melek huruf tertinggi di dunia (99%) sekaligus menggerakkan gelombang musik dan drama Korea ke seluruh penjuru bumi.',
        highlight: 'Penghargaan Literasi Raja Sejong UNESCO didirikan pada tahun 1989'
      }
    ],
    linguisticTraits: [
      {
        title: 'Aksara Anatomis (Meniru Bentuk Mulut & Lidah)',
        description: 'Bentuk huruf Hangeul tidak dibuat sembarangan: ㄱ meniru pangkal lidah yang menutup kerongkongan, ㄴ meniru ujung lidah yang menyentuh gusi atas, dan ㅁ meniru bentuk bibir.',
        icon: '👅',
        example: 'ㅁ (m) menggambarkan bibir tertutup; ㅂ (b) menambah garis hembusan bunyi.'
      },
      {
        title: 'Arsitektur Blok Suku Kata',
        description: 'Huruf-huruf tidak ditulis berderet memanjang satu per satu, melainkan disusun rapi menjadi blok suku kata berbentuk persegi. Misalnya, ㅎ (h) + ㅏ (a) + ㄴ (n) menyatu menjadi "한" (han).',
        icon: '🧱',
        example: 'ㅎ (h) + ㅏ (a) + ㄴ (n) = 한 (suku kata han)'
      },
      {
        title: 'Urutan Kata Subjek-Objek-Kata Kerja',
        description: 'Dalam bahasa Korea, kata kerja selalu diletakkan paling akhir di ujung kalimat. Kalimat "Saya makan apel" disusun menjadi "Saya apel makan" (저는 사과를 먹어요).',
        icon: '🔄',
        example: '저는 (Saya) + 사과를 (Apel) + 먹어요 (Makan)'
      }
    ],
    culturalNote: 'Hari Hangeul dirayakan sebagai hari libur nasional di Korea Selatan setiap tanggal 9 Oktober untuk menghormati warisan kemerdekaan berbahasa bagi seluruh rakyat.'
  },

  ja: {
    title: 'Harmoni Tiga Aksara (漢字 · ひらがな · カタカナ)',
    tagline: 'Simfoni bahasa yang anggun, memadukan ideograf Tionghoa dengan dua aksara suku kata asli Jepang.',
    speakersCount: 'Lebih dari 125 Juta Penutur Jati',
    writingSystem: 'Kanji (漢字), Hiragana (ひらがな), dan Katakana (カタカナ)',
    languageFamily: 'Japonik',
    facts: [
      { label: 'Aksara Aktif', value: '3 Sistem Tulisan yang Saling Melengkapi', icon: '✍️' },
      { label: 'Jōyō Kanji', value: '2.136 Karakter Baku yang Diajarkan di Sekolah', icon: '📚' },
      { label: 'Urutan Kata', value: 'Subjek-Objek-Kata Kerja (Kata kerja selalu di akhir)', icon: '🔄' },
      { label: 'Sistem Intonasi', value: 'Aksen Tinggi-Rendah Nada (Tinggi / Rendah)', icon: '🎵' },
      { label: 'Kata Serapan', value: 'Ditulis dengan Katakana (mis. コーヒー — kopi)', icon: '☕' },
      { label: 'Partikel', value: 'Penanda fungsi tata bahasa (は, が, を, に)', icon: '🏷️' }
    ],
    historyTimeline: [
      {
        era: 'Abad ke-5',
        title: 'Kedatangan Kanji dari Daratan Asia',
        description: 'Sebelum bersentuhan dengan peradaban Tiongkok, bahasa Jepang murni berupa bahasa lisan. Karakter Tionghoa (Kanji) kemudian diserap untuk menuliskan nama, hukum, dan kitab sutra Buddha.',
        highlight: 'Adaptasi aksara logogram Tionghoa'
      },
      {
        era: 'Abad ke-8 – ke-10',
        title: 'Penemuan Hiragana & Kejayaan Sastra Perempuan Istana',
        description: 'Para bangsawan perempuan di istana menyederhanakan guratan kursif Kanji menjadi aksara suku kata mengalir yang disebut Hiragana ("tulisan perempuan"). Inovasi ini melahirkan mahakarya sastra dunia, termasuk novel Hikayat Genji karya Murasaki Shikibu.',
        highlight: 'Lahirnya aksara fonetik asli Jepang'
      },
      {
        era: 'Masa Kini',
        title: 'Katakana & Penyerapan Kosakata Dunia',
        description: 'Katakana, yang awalnya diciptakan para biksu Buddha sebagai catatan bacaan ringkas, ditetapkan sebagai aksara khusus untuk istilah ilmiah modern, nama asing, dan kata serapan global (mis. コンピューター konpyūtā — komputer).',
        highlight: 'Tiga aksara bekerja selaras dalam satu kalimat'
      }
    ],
    linguisticTraits: [
      {
        title: 'Sistem Tiga Aksara Terpadu',
        description: 'Satu kalimat bahasa Jepang kerap memadukan ketiga aksara sekaligus: Kanji memuat akar makna utama (私 saya, 食べる makan), Hiragana menangani imbuhan tata bahasa dan partikel (は, を, ました), sedangkan Katakana menuliskan kata serapan asing (パン roti).',
        icon: '🧩',
        example: '私はパンを食べました (Saya telah makan roti)'
      },
      {
        title: 'Partikel Tata Bahasa (助詞 · Joshi)',
        description: 'Partikel singkat yang diletakkan sesudah kata benda menandai peran setiap kata secara jernih dalam kalimat (は topik, が subjek, を objek langsung, に tujuan atau waktu).',
        icon: '🏷️',
        example: '猫が (kucing [subjek]) + 魚を (ikan [objek]) + 食べた (memakan)'
      }
    ],
    culturalNote: 'Menguasai bahasa Jepang membuka pemahaman mendalam atas keterkaitan erat antara seni kaligrafi visual, etika kesantunan berbahasa (Keigo), dan komunikasi yang peka konteks.'
  },

  ru: {
    title: 'Jiwa Slavia: Dari Biarawan Sirilik hingga Pushkin & Tolstoy',
    tagline: 'Bahasa yang kaya dan ekspresif, ditempa oleh cendekiawan Bizantium, Tsar Pyotr yang Agung, dan para penyair besar.',
    speakersCount: 'Lebih dari 255 Juta Total Penutur',
    writingSystem: 'Abjad Sirilik Rusia (33 Huruf)',
    languageFamily: 'Indo-Eropa (Slavia Timur)',
    facts: [
      { label: 'Abjad', value: '33 Huruf (10 vokal, 21 konsonan, 2 tanda pelafalan)', icon: '🔤' },
      { label: 'Reformasi Aksara', value: 'Pyotr yang Agung (1708) & Reformasi Ejaan (1918)', icon: '📜' },
      { label: 'Sistem Kasus', value: '6 Kasus Tata Bahasa', icon: '🏛️' },
      { label: 'Genus Kata', value: '3 Genus (Maskulin, Feminin, Netral)', icon: '⚖️' },
      { label: 'Bahasa Antariksa', value: 'Bahasa wajib di Stasiun Luar Angkasa Internasional selain Inggris', icon: '🚀' },
      { label: 'Zaman Keemasan Sastra', value: 'Pushkin, Tolstoy, Dostoyevsky, Chekhov', icon: '📖' }
    ],
    historyTimeline: [
      {
        era: 'sekitar 863 M',
        title: 'Santo Sirilus dan Metodius',
        description: 'Dua bersaudara utusan Bizantium, Sirilus dan Metodius, menyusun aksara Glagolitik untuk menerjemahkan kitab suci bagi bangsa-bangsa Slavia, yang tak lama kemudian berkembang di Kekaisaran Bulgaria Pertama menjadi abjad Sirilik.',
        highlight: 'Lahirnya abjad Sirilik'
      },
      {
        era: '1708',
        title: 'Reformasi Huruf Sipil Pyotr yang Agung (Гражданский шрифт)',
        description: 'Tsar Pyotr yang Agung secara langsung mencoret bentuk huruf gerejawi kuno dan merancang ulang huruf cetak Sirilik Rusia agar selaras dengan tipografi Eropa Barat demi memajukan ilmu pengetahuan, peta pelayaran, dan percetakan.',
        highlight: 'Sekularisasi dan modernisasi percetakan'
      },
      {
        era: '1918',
        title: 'Reformasi Besar Ejaan Pasca-Revolusi',
        description: 'Pemerintah menyederhanakan ejaan dengan menghapus huruf-huruf historis yang tak lagi terpakai dalam bunyi lisan (seperti ѣ "yat", ѳ "fita", dan tanda keras ъ di akhir kata), menghasilkan abjad 33 huruf yang ringkas hingga kini.',
        highlight: 'Penetapan standar 33 huruf masa kini'
      }
    ],
    linguisticTraits: [
      {
        title: 'Tekanan Kata yang Dinamis',
        description: 'Letak tekanan suku kata dalam bahasa Rusia bersifat bebas dan dapat mengubah makna kata secara drastis (за́мок = kastil/istana, sedangkan замо́к = gembok). Huruf "o" tanpa tekanan secara alami terdengar seperti bunyi "a" (молоко́ → malakó).',
        icon: '🎯',
        example: 'за́мок (istana) dibandingkan замо́к (gembok)'
      },
      {
        title: 'Konsonan Keras & Lunak (Palatalisasi)',
        description: 'Hampir setiap konsonan memiliki pasangan bunyi keras (biasa) dan lunak (dipalatalisasi), yang ditandai oleh huruf vokal sesudahnya atau oleh tanda pelunak (ь).',
        icon: '🎶',
        example: 'мат (skakmat catur) dibandingkan мать (ibu)'
      }
    ],
    culturalNote: 'Bahasa Rusia merupakan salah satu dari enam bahasa resmi Perserikatan Bangsa-Bangsa serta bahasa operasional kedua yang wajib dikuasai para antariksawan di Stasiun Luar Angkasa Internasional.'
  },

  tr: {
    title: 'Keajaiban 1928: Revolusi Abjad Atatürk',
    tagline: 'Bagaimana seluruh bangsa beralih dari aksara Arab Utsmaniyah ke abjad Latin fonetik hanya dalam hitungan bulan.',
    speakersCount: 'Lebih dari 85 Juta Penutur Jati',
    writingSystem: 'Abjad Latin Turki (29 Huruf)',
    languageFamily: 'Turkik',
    facts: [
      { label: 'Reformasi 1928', value: 'Harf Devrimi (Revolusi Abjad Atatürk)', icon: '🏛️' },
      { label: 'Abjad', value: '29 Huruf (Sepenuhnya Fonetik: 1 huruf = 1 bunyi)', icon: '🔤' },
      { label: 'Struktur Bahasa', value: 'Aglutinatif (Rangkaian akhiran yang teratur)', icon: '🧱' },
      { label: 'Keselarasan Vokal', value: 'Vokal depan dan vokal belakang berpadu selaras', icon: '🎵' },
      { label: 'Genus Tata Bahasa', value: 'Tidak ada! Kata ganti laki-laki, perempuan, maupun benda cukup "o"', icon: '⚖️' },
      { label: 'Urutan Kata', value: 'Subjek-Objek-Kata Kerja (Kata kerja di akhir)', icon: '🔄' }
    ],
    historyTimeline: [
      {
        era: 'Abad ke-10 – 1928 M',
        title: 'Bahasa Turki Utsmaniyah & Ketidakcocokan Aksara Arab',
        description: 'Selama lebih dari 900 tahun, bahasa Turki ditulis menggunakan aksara Arab Utsmaniyah. Namun, aksara Arab hanya melambangkan 3 vokal dasar, padahal bahasa Turki memiliki 8 bunyi vokal pembeda makna. Ketidakcocokan ini menimbulkan kerancuan bacaan dan menahan angka melek huruf di bawah 10%.',
        highlight: 'Tingginya angka buta huruf akibat ketidakcocokan aksara'
      },
      {
        era: '1928',
        title: 'Revolusi Bahasa Mustafa Kemal Atatürk (Harf Devrimi)',
        description: 'Pendiri Republik Turki, Atatürk, terjun langsung keliling kota dan desa membawa papan tulis untuk mengajarkan abjad Latin fonetik baru berjumlah 29 huruf yang dirancang khusus mengikuti bunyi bahasa Turki (termasuk huruf ç, ğ, ı, ö, ş, ü).',
        highlight: 'Melek huruf nasional melesat dari 10% hingga melampaui 90%'
      }
    ],
    linguisticTraits: [
      {
        title: 'Rangkaian Akhiran Aglutinatif',
        description: 'Kata-kata dibentuk dengan menempelkan imbuhan akhiran secara beruntun pada kata dasar layaknya balok susun. Satu kata bahasa Turki sanggup mengungkapkan makna satu kalimat utuh!',
        icon: '🧱',
        example: 'Ev (rumah) → evler (rumah-rumah) → evlerimde (di dalam rumah-rumah saya)'
      },
      {
        title: 'Keselarasan Vokal (Ünlü Uyumu)',
        description: 'Huruf vokal di dalam sebuah kata mengalir selaras antara kelompok vokal belakang (a, ı, o, u) dan vokal depan (e, i, ö, ü). Vokal pada akhiran otomatis menyesuaikan diri dengan vokal kata dasarnya.',
        icon: '🎶',
        example: 'araba-lar (mobil-mobil) dibandingkan kedi-ler (kucing-kucing)'
      }
    ],
    culturalNote: 'Karena ejaan bahasa Turki 100% fonetik, begitu Anda menguasai bunyi ke-29 hurufnya, Anda dapat melafalkan setiap kata dalam bahasa Turki secara tepat.'
  },

  ar: {
    title: 'Bahasa Kefasihan Sastra (لغة الضاد · Lughat al-Dad)',
    tagline: 'Bahasa suci berbasis akar dan pola kata yang mempersatukan lebih dari 400 juta penutur di seluruh dunia Arab.',
    speakersCount: 'Lebih dari 400 Juta Total Penutur',
    writingSystem: 'Abjad Arab (28 Huruf, Ditulis dari Kanan ke Kiri)',
    languageFamily: 'Afroasiatik (Semitik)',
    facts: [
      { label: 'Arah Tulisan', value: 'Kanan ke Kiri', icon: '➡️' },
      { label: 'Abjad', value: '28 Huruf (Konsonan dan vokal panjang)', icon: '🔤' },
      { label: 'Sistem Akar Kata', value: 'Akar 3 Huruf Konsonan (Tsulatsi)', icon: '🌱' },
      { label: 'Bunyi Khas', value: 'Huruf Dhad (ض) — Hampir hanya ditemukan dalam bahasa Arab', icon: '🗣️' },
      { label: 'Bentuk Ganda (Mutsanna)', value: 'Memiliki bentuk Tunggal, Ganda (berjumlah dua), dan Jamak', icon: '2️⃣' },
      { label: 'Hari Bahasa Dunia', value: 'Hari Bahasa Arab Sedunia PBB (18 Desember)', icon: '🌐' }
    ],
    historyTimeline: [
      {
        era: 'Abad ke-6 M',
        title: 'Puisi Pra-Islam (Al-Mu’allaqat)',
        description: 'Para penyair Badui menghafalkan syair-syair indah berima yang mengagungkan kehormatan dan keberanian di padang pasir, menegakkan tolok ukur puitis bahasa Arab Klasik.',
        highlight: 'Zaman keemasan syair lisan pra-Islam'
      },
      {
        era: 'Abad ke-7 M',
        title: 'Al-Qur’an & Pelestarian Kaidah Bahasa',
        description: 'Turunnya wahyu dan pembukuan Al-Qur’an membakukan tata bahasa serta fonologi bahasa Arab, menjaga keutuhan bahasa tersebut nyaris tak berubah selama lebih dari 1.400 tahun.',
        highlight: 'Standar bahasa ibadah umat Islam sedunia'
      },
      {
        era: 'Masa Kini',
        title: 'Bahasa Arab Baku Modern (الفصحى · Fusha)',
        description: 'Saat ini, Bahasa Arab Baku Modern (Fusha) berfungsi sebagai bahasa resmi pemersatu dalam sastra, pemberitaan, diplomasi, dan pendidikan di 22 negara.',
        highlight: 'Bahasa pemersatu di seluruh dunia Arab'
      }
    ],
    linguisticTraits: [
      {
        title: 'Mesin Akar Tiga Huruf (الجذر · Al-Jidzr)',
        description: 'Hampir setiap kosakata bahasa Arab tumbuh dari akar 3 huruf konsonan yang mengemban makna inti. Misalnya, akar K-T-B (ك-ت-ب) yang berkaitan dengan tulis-menulis melahirkan kata kitāb (buku/kitab), kātib (penulis), maktab (kantor/meja tulis), dan maktūb (tertulis/takdir).',
        icon: '🌱',
        example: 'ك-ت-ب → كتاب (Buku) · مكتبة (Perpustakaan) · كاتب (Penulis)'
      },
      {
        title: 'Rangkaian Huruf Sambung yang Mengalir',
        description: 'Huruf-huruf Arab ditulis bersambung secara luwes dan berubah bentuk sesuai letaknya di awal, tengah, akhir kata, atau ketika berdiri sendiri.',
        icon: '✍️',
        example: 'Huruf ب di awal (بـ), di tengah (ـبـ), atau di akhir kata (ـب)'
      }
    ],
    culturalNote: 'Seni kaligrafi Arab (khat) dihormati sebagai salah satu cabang seni rupa paling luhur dalam sejarah peradaban manusia, serta telah menyumbangkan ribuan kata serapan bagi bahasa Indonesia.'
  },

  hi: {
    title: 'Suara India: Dari Sanskerta Kuno hingga Sinema Bollywood',
    tagline: 'Ditulis dengan aksara Devanagari yang anggun ("Kota Para Dewa") dan dituturkan oleh lebih dari 600 juta orang.',
    speakersCount: 'Lebih dari 600 Juta Total Penutur',
    writingSystem: 'Aksara Abugida Devanagari (देवनागरी)',
    languageFamily: 'Indo-Eropa (Indo-Arya)',
    facts: [
      { label: 'Abjad', value: '46 Huruf Devanagari (11 Vokal, 33 Konsonan)', icon: '🔤' },
      { label: 'Garis Atas', value: 'Shirorekha (Garis mendatar tempat menggantungkan huruf)', icon: '📏' },
      { label: 'Bahasa Serumpun', value: 'Saling dapat dipahami secara lisan dengan bahasa Urdu', icon: '🤝' },
      { label: 'Urutan Kata', value: 'Subjek-Objek-Kata Kerja (Kata kerja di akhir)', icon: '🔄' },
      { label: 'Leluhur Bahasa', value: 'Bahasa Sanskerta (संस्कृतम्)', icon: '🏛️' },
      { label: 'Pengaruh Global', value: 'Yoga, avatar, rimba, guru, teh chai, sampo', icon: '🧘' }
    ],
    historyTimeline: [
      {
        era: 'sekitar 1500 SM',
        title: 'Akar Sanskerta Weda',
        description: 'Bahasa Sanskerta Weda berkembang menjadi berbagai dialek Prakerta daerah yang dituturkan dalam keseharian masyarakat di seluruh India Utara.',
        highlight: 'Kidung Weda & filsafat klasik India'
      },
      {
        era: 'Abad ke-13 – ke-18',
        title: 'Kemunculan Bahasa Hindustani',
        description: 'Masa Kesultanan Delhi dan Kekaisaran Mughal memadukan kosakata Persia, Turkik, dan Arab ke dalam percakapan sehari-hari, melahirkan bahasa Hindustani sebagai bahasa pergaulan pasar dan puisi.',
        highlight: 'Lahirnya bahasa pergaulan Hindustani'
      },
      {
        era: '1950',
        title: 'Bahasa Resmi Republik India',
        description: 'Bahasa Hindi Baku dalam aksara Devanagari ditetapkan sebagai bahasa resmi Pemerintah Pusat India dan dirayakan setiap tahun pada Hari Hindi (Hindi Diwas) tanggal 14 September.',
        highlight: 'Hari Hindi dirayakan setiap 14 September'
      }
    ],
    linguisticTraits: [
      {
        title: 'Garis Gantung Utama (Shirorekha · शिरोरेखा)',
        description: 'Huruf-huruf Devanagari menggantung ke bawah dari seutas garis lurus mendatar di bagian atas, menyatukan huruf-huruf dalam satu kata secara visual.',
        icon: '📏',
        example: 'क + म + ल = कमल (Bunga teratai)'
      },
      {
        title: 'Konsonan Berhembus (Aspirasi) & Tanpa Hembusan',
        description: 'Bahasa Hindi membedakan secara tegas bunyi konsonan biasa dan konsonan berhembus napas kuat (k dengan kh, p dengan ph, t dengan th). Jika telapak tangan diletakkan di depan mulut, akan terasa hembusan udara jelas pada bunyi berhembus.',
        icon: '💨',
        example: 'कल (Kemarin / Besok) dibandingkan खल (Jahat / Licik)'
      }
    ],
    culturalNote: 'Berbagai bahasa dunia, termasuk bahasa Indonesia dan bahasa Inggris, menyerap banyak kosakata dari Sanskerta dan Hindi seperti guru, karma, avatar, piyama, dan sampo.'
  },

  bn: {
    title: 'Bahasa Jiwa: Tagore & Gerakan Pembelaan Bahasa Ibu',
    tagline: 'Satu-satunya bahasa dalam sejarah manusia yang para penuturnya berjuang dan mengorbankan nyawa demi mempertahankan bahasa ibu mereka.',
    speakersCount: 'Lebih dari 270 Juta Penutur Jati (Peringkat 6 Dunia)',
    writingSystem: 'Aksara Bengali-Assam (বাংলা লিপি)',
    languageFamily: 'Indo-Eropa (Indo-Arya)',
    facts: [
      { label: 'Peringkat Dunia', value: 'Bahasa Ibu Paling Banyak Dituturkan ke-6 di Dunia', icon: '🌐' },
      { label: 'Peraih Nobel', value: 'Rabindranath Tagore (Nobel Sastra 1913)', icon: '🏅' },
      { label: 'Hari Peringatan UNESCO', value: 'Hari Bahasa Ibu Internasional (21 Februari)', icon: '🌺' },
      { label: 'Vokal Bawaan', value: 'Bunyi vokal bulat "o" (অ /ɔ/)', icon: '👄' },
      { label: 'Genus Tata Bahasa', value: 'Tidak ada! Kata kerja dan kata sifat bebas penggolongan jenis', icon: '⚖️' },
      { label: 'Lagu Kebangsaan', value: 'Tagore menggubah lagu kebangsaan India sekaligus Bangladesh', icon: '🎶' }
    ],
    historyTimeline: [
      {
        era: 'Abad ke-10 – ke-12',
        title: 'Charyapada: Puisi Bengali Tertua',
        description: 'Para penyair mistik Buddha menggubah nyanyian Charyapada di atas naskah daun lontar, menandai bentuk tertulis paling awal dari bahasa Bengali.',
        highlight: 'Kidung mistik Bengali Kuno'
      },
      {
        era: '1913',
        title: 'Rabindranath Tagore Meraih Hadiah Nobel',
        description: 'Sastrawan dan pemikir serbabisa Rabindranath Tagore menjadi tokoh non-Eropa pertama yang meraih Hadiah Nobel Sastra berkat kumpulan puisi rohaninya yang mendalam, Gitanjali ("Persembahan Nyanyian").',
        highlight: 'Peraih Nobel pertama dari benua Asia'
      },
      {
        era: '21 Februari 1952',
        title: 'Gerakan Bahasa Bengali (ভাষা আন্দোলন)',
        description: 'Para mahasiswa di Dhaka turun ke jalan dan mengorbankan jiwa demi menentang upaya penghapusan bahasa Bengali sebagai bahasa resmi negara. Pada tahun 1999, UNESCO menetapkan 21 Februari sebagai Hari Bahasa Ibu Internasional di seluruh dunia untuk menghormati jasa mereka.',
        highlight: 'Hari Bahasa Ibu Internasional UNESCO'
      }
    ],
    linguisticTraits: [
      {
        title: 'Vokal Bawaan "O" yang Bulat',
        description: 'Berbeda dengan bahasa Hindi yang secara bawaan berbunyi "a" pendek, setiap huruf konsonan Bengali tanpa tanda vokal mengemban bunyi "o" (/ɔ/) yang hangat dan bulat. Contohnya, kata জল ("air") dilafalkan "jol".',
        icon: '👄',
        example: 'ক = ko (bukan ka) · জল = jol (air)'
      },
      {
        title: 'Tata Bahasa Tanpa Penggolongan Genus',
        description: 'Tata bahasa Bengali sama sekali tidak mengenal pembedaan genus maskulin atau feminin. Laki-laki dan perempuan menggunakan kata ganti orang ketiga yang sama (সে — dia) serta bentuk kata kerja yang seragam.',
        icon: '⚖️',
        example: 'সে যায় (Dia pergi — laki-laki maupun perempuan)'
      }
    ],
    culturalNote: 'Hari Bahasa Ibu Internasional (21 Februari) diperingati di seluruh penjuru dunia sebagai penghormatan bagi para pahlawan mahasiswa Bengali tahun 1952.'
  },

  ur: {
    title: 'Bahasa Puisi: Kaligrafi Nastaliq & Keanggunan Sastra Istana',
    tagline: 'Lahir dari perkemahan kerajaan, diagungkan selama berabad-abad lewat puisi ghazal, kisah cinta, dan filsafat.',
    speakersCount: 'Lebih dari 230 Juta Total Penutur',
    writingSystem: 'Aksara Arab-Persia Nastaliq (نستعلیق · 39 Huruf)',
    languageFamily: 'Indo-Eropa (Indo-Arya)',
    facts: [
      { label: 'Asal-usul Nama', value: 'Dari kata Turkik "Ordu" (Perkemahan Kerajaan)', icon: '⛺' },
      { label: 'Gaya Kaligrafi', value: 'Nastaliq (Gaya tulisan Persia yang miring dan mengalir)', icon: '✒️' },
      { label: 'Warisan Kosakata', value: 'Dasar Prakerta diperkaya kosakata Persia, Arab, dan Turkik', icon: '🏛️' },
      { label: 'Kembaran Lisan', value: 'Saling dapat dipahami dalam percakapan sehari-hari dengan Hindi', icon: '🤝' },
      { label: 'Bahasa Nasional', value: 'Republik Islam Pakistan', icon: '🇵🇰' },
      { label: 'Bentuk Puisi', value: 'Ghazal (غزل), Nazm, dan musik Qawwali', icon: '📜' }
    ],
    historyTimeline: [
      {
        era: 'Abad ke-13',
        title: 'Amir Khusrau & Perjumpaan Budaya di Delhi',
        description: 'Penyair sufi Amir Khusrau memelopori syair yang memadukan keindahan kiasan Persia dengan bahasa rakyat setempat Hindavi, meletakkan fondasi awal kesusastraan Urdu.',
        highlight: 'Bapak kesusastraan Urdu'
      },
      {
        era: 'Abad ke-18 – ke-19',
        title: 'Zaman Keemasan Puisi Urdu (Mir & Ghalib)',
        description: 'Mirza Ghalib dan Mir Taqi Mir menjadikan istana Mughal di Delhi sebagai kiblat puisi Ghazal dunia, menyelami tema cinta, perenungan batin, dan tasawuf dengan keindahan lirik tiada tara.',
        highlight: 'Bait-bait abadi Mirza Ghalib'
      },
      {
        era: '1947',
        title: 'Bahasa Nasional Pemersatu Pakistan',
        description: 'Bahasa Urdu dipilih sebagai bahasa pemersatu nasional Pakistan yang menjembatani beragam provinsi penutur bahasa Punjabi, Sindhi, Pashto, dan Balochi.',
        highlight: 'Lambang persatuan nasional'
      }
    ],
    linguisticTraits: [
      {
        title: 'Keindahan Aksara Nastaliq yang Menurun Diagonal',
        description: 'Tidak seperti gaya khat Naskhi Arab yang mendatar lurus, bahasa Urdu secara tradisional ditulis dalam gaya Nastaliq, di mana setiap kata meluncur miring dari kanan atas ke kiri bawah bagaikan untaian sutra.',
        icon: '✒️',
        example: 'Tulisan Nastaliq mengalir miring secara anggun melintasi baris.'
      },
      {
        title: 'Tingkatan Kesantunan Halus & Budaya Tehzeeb (Adab)',
        description: 'Bahasa Urdu memiliki tiga tingkatan sapaan "kamu/Anda": akrab "tu" (تو), sopan "tum" (تم), dan penuh hormat "aap" (آپ), yang diiringi ungkapan tata krama nan santun.',
        icon: '🙇',
        example: 'آپ تشریف رکھیے (Silakan berkenan duduk, kehormatan bagi kami)'
      }
    ],
    culturalNote: 'Di seluruh kawasan Asia Selatan, bahasa Urdu dijunjung tinggi sebagai puncak bahasa romantisme, kehalusan budi pekerti (tehzeeb), dan musik sufi.'
  },

  id: {
    title: 'Bahasa Pemersatu: 17.000 Pulau, Satu Bahasa Persatuan',
    tagline: 'Bagaimana ikrar damai Sumpah Pemuda tahun 1928 mempersatukan lebih dari 700 suku bangsa di negara kepulauan terbesar di dunia.',
    speakersCount: 'Lebih dari 300 Juta Total Penutur',
    writingSystem: 'Abjad Latin (26 Huruf, 100% Fonetik)',
    languageFamily: 'Austronesia (Melayu-Polinesia)',
    facts: [
      { label: 'Ikrar 1928', value: 'Sumpah Pemuda (Ikrar Persatuan Pemuda Indonesia)', icon: '🇮🇩' },
      { label: 'Kemudahan Tata Bahasa', value: 'Tanpa konjugasi kata kerja, tanpa kala waktu, tanpa genus', icon: '✨' },
      { label: 'Bentuk Jamak', value: 'Pengulangan kata / reduplikasi (anak → anak-anak)', icon: '👶' },
      { label: 'Ejaan Fonetik', value: 'Kata-kata dieja persis sesuai bunyi pengucapannya', icon: '🔤' },
      { label: 'Akar Bahasa', value: 'Bahasa Melayu Riau (bahasa niaga lintas pulau yang netral)', icon: '🚢' },
      { label: 'Kekayaan Serapan', value: 'Sanskerta, Arab, Belanda, Portugis, Tionghoa', icon: '🌏' }
    ],
    historyTimeline: [
      {
        era: 'Abad ke-7',
        title: 'Jalur Rempah Bahari & Melayu Pasar',
        description: 'Selama lebih dari seribu tahun, bahasa Melayu pesisir berfungsi sebagai bahasa pengantar niaga yang netral, menghubungkan kesultanan Kepulauan Rempah, pelaut Tionghoa, dan saudagar Arab.',
        highlight: 'Bahasa pengantar niaga bahari Nusantara'
      },
      {
        era: '28 Oktober 1928',
        title: 'Sumpah Pemuda',
        description: 'Para pemuda pejuang kemerdekaan mengambil keputusan berpandangan jauh ke depan: alih-alih memilih bahasa Jawa (suku dengan jumlah penduduk terbesar), mereka memilih bahasa Melayu yang netral dan menobatkannya sebagai Bahasa Indonesia demi kesetaraan persaudaraan seluruh 700 bahasa daerah.',
        highlight: '"Satu Tanah Air, Satu Bangsa, Satu Bahasa"'
      }
    ],
    linguisticTraits: [
      {
        title: 'Reduplikasi (Kata Ulang) untuk Bentuk Jamak',
        description: 'Untuk menyatakan bentuk jamak dalam bahasa Indonesia, cukup ulangi kata dasarnya! Anak bermakna satu anak, sedangkan anak-anak bermakna banyak anak; buku menjadi buku-buku.',
        icon: '🔁',
        example: 'Orang (tunggal) → orang-orang (jamak)'
      },
      {
        title: 'Sistem Imbuhan yang Kaya (Me-, Di-, Ber-, Pe-)',
        description: 'Meskipun kata kerja tidak berubah menurut waktu lampau atau depan, rangkaian awalan dan akhiran secara teratur membentuk kata kerja aktif, kata kerja pasif, hingga kata benda abstrak dari satu kata dasar.',
        icon: '🧩',
        example: 'Tulis (kata dasar) → menulis (kata kerja aktif) → ditulis (kata kerja pasif)'
      }
    ],
    culturalNote: 'Bahasa Indonesia diakui luas oleh para pakar linguistik dunia sebagai salah satu bahasa paling ramah dan mudah dipelajari untuk mulai berbicara sejak hari pertama.'
  },

  es: {
    title: 'Dari Kastilia ke Benua Amerika: Perjalanan Global Bahasa Spanyol',
    tagline: 'Lahir dari bahasa Latin Rakyat, diperkaya 700 tahun pengaruh Arab, dan dituturkan lebih dari 500 juta orang di 21 negara.',
    speakersCount: 'Lebih dari 500 Juta Penutur Jati (Peringkat 2 Dunia)',
    writingSystem: 'Abjad Latin Spanyol (27 Huruf termasuk Ñ)',
    languageFamily: 'Indo-Eropa (Roman)',
    facts: [
      { label: 'Penutur Jati', value: 'Bahasa Ibu Paling Banyak Dituturkan ke-2 di Dunia', icon: '🌎' },
      { label: 'Warisan Bahasa Arab', value: 'Lebih dari 4.000 kata serapan Arab (azúcar, alcalde, ojalá)', icon: '🕌' },
      { label: 'Tata Bahasa Modern Pertama', value: 'Antonio de Nebrija (tahun 1492)', icon: '📖' },
      { label: 'Tanda Baca Terbalik', value: 'Tanda seru pembuka ¡ dan tanda tanya pembuka ¿', icon: '❓' },
      { label: 'Bahasa Resmi di', value: '21 Negara Berdaulat di 4 Benua', icon: '🏛️' },
      { label: 'Mahakarya Sastra', value: 'Don Quixote karya Miguel de Cervantes', icon: '🛡️' }
    ],
    historyTimeline: [
      {
        era: 'sekitar 200 SM – 400 M',
        title: 'Hispania Romawi & Bahasa Latin Rakyat',
        description: 'Prajurit, pedagang, dan pejabat Romawi membawa bahasa Latin lisan sehari-hari ke Semenanjung Iberia, secara bertahap menggantikan bahasa-bahasa Keltik dan Iberia kuno.',
        highlight: 'Akar bahasa Latin pada bahasa Spanyol'
      },
      {
        era: '711 – 1492 M',
        title: 'Al-Andalus & Warisan Kosakata Arab',
        description: 'Hampir 800 tahun peradaban Islam di Andalusia memperkaya bahasa Spanyol dengan ribuan istilah ilmu pengetahuan, pertanian, dan arsitektur yang banyak diawali kata sandang Arab "al-".',
        highlight: 'Lebih dari 4.000 kata serapan Arab dalam pemakaian sehari-hari'
      },
      {
        era: '1492',
        title: 'Tata Bahasa Nebrija & Penyebaran ke Benua Amerika',
        description: 'Antonio de Nebrija menerbitkan buku tata bahasa cetak pertama untuk bahasa daerah Eropa modern dan mempersembahkannya kepada Ratu Isabella.',
        highlight: 'Tata bahasa cetak pertama untuk bahasa rakyat Eropa'
      }
    ],
    linguisticTraits: [
      {
        title: 'Tanda Baca Terbalik di Awal Kalimat (¿ ? dan ¡ !)',
        description: 'Bahasa Spanyol adalah satu-satunya bahasa besar dunia yang memberi tahu pembaca intonasi kalimat sejak kata pertama melalui tanda tanya dan tanda seru terbalik di awal kalimat.',
        icon: '❓',
        example: '¿Cómo estás? (Apa kabar?) · ¡Qué bueno! (Bagus sekali!)'
      },
      {
        title: 'Ser dan Estar (Dua Jenis Kata Kerja "Adalah / Berada")',
        description: 'Bahasa Spanyol membedakan antara jati diri permanen (Ser) dan keadaan atau lokasi sementara (Estar). Soy feliz berarti saya pribadi yang periang, sedangkan estoy feliz berarti saya sedang merasa bahagia saat ini.',
        icon: '⚖️',
        example: 'Soy profesor (Jati diri / Profesi) dibandingkan Estoy cansado (Keadaan lelah saat ini)'
      }
    ],
    culturalNote: 'Bahasa Spanyol dituturkan di 21 negara merdeka yang masing-masing menyumbangkan tradisi musik semarak, sastrawan besar, serta ungkapan khas daerah.'
  },

  fr: {
    title: 'Bahasa Nalar, Diplomasi & Dunia Frankofoni',
    tagline: 'Bahasa bersejarah dalam perjanjian internasional, filsafat Pencerahan, dan lebih dari 320 juta penutur di seluruh dunia.',
    speakersCount: 'Lebih dari 320 Juta Total Penutur',
    writingSystem: 'Abjad Latin Prancis (26 Huruf + Tanda Diakritik)',
    languageFamily: 'Indo-Eropa (Roman)',
    facts: [
      { label: 'Kedudukan Global', value: 'Bahasa resmi di 29 negara', icon: '🌍' },
      { label: 'Warisan Diplomasi', value: 'Bahasa tradisional perjanjian dan hubungan internasional', icon: '🕊️' },
      { label: 'Penjaga Bahasa', value: 'Académie Française (Didirikan tahun 1635 oleh Richelieu)', icon: '🏛️' },
      { label: 'Olimpiade & Pos', value: 'Bahasa kerja resmi Komite Olimpiade Internasional dan Pos Dunia', icon: '🏅' },
      { label: 'Genus Tata Bahasa', value: '2 Genus (Maskulin & Feminin)', icon: '⚖️' },
      { label: 'Nuansa Vokal', value: 'Bunyi vokal sengau/nasal khas (an, on, in, un)', icon: '🍷' }
    ],
    historyTimeline: [
      {
        era: '842 M',
        title: 'Sumpah Strasbourg (Serments de Strasbourg)',
        description: 'Naskah tertua yang masih bertahan dalam bahasa Roman awal yang telah terpisah dari bahasa Latin klasik, diikrarkan oleh cucu-cucu Kaisar Charlemagne.',
        highlight: 'Naskah bahasa Prancis tertua yang tercatat sejarah'
      },
      {
        era: '1539',
        title: 'Maklumat Villers-Cotterêts',
        description: 'Raja François I menetapkan bahwa bahasa Prancis—bukan lagi bahasa Latin gereja—wajib digunakan dalam seluruh dokumen pengadilan, undang-undang, dan titah kerajaan.',
        highlight: 'Bahasa Prancis ditetapkan sebagai bahasa resmi negara'
      },
      {
        era: 'Abad ke-18',
        title: 'Abad Pencerahan & Bahasa Pergaulan Eropa',
        description: 'Bahasa Prancis menjadi bahasa utama istana kerajaan Eropa, diplomasi internasional, serta para filsuf Pencerahan seperti Voltaire, Rousseau, dan Diderot.',
        highlight: 'Bahasa diplomasi dan pemikiran dunia'
      }
    ],
    linguisticTraits: [
      {
        title: 'Pertautan Bunyi (Liaison) & Kemerduan Aliran Suara',
        description: 'Bahasa Prancis sangat mengutamakan kelancaran alunan bunyi (eufoni). Huruf konsonan akhir kata yang biasanya senyap akan hidup kembali dan menyambung ke vokal awal kata berikutnya (les amis → lez-ami).',
        icon: '🎶',
        example: 'C’est un ami (Dilafalkan menyambung: se-ten-a-mi — "Ini seorang teman")'
      },
      {
        title: 'Vokal Sengau (Nasal)',
        description: 'Bahasa Prancis memiliki 4 vokal sengau khas di mana udara mengalir keluar secara bersamaan melalui rongga mulut dan hidung (pain, bon, vent, un).',
        icon: '👃',
        example: 'Bon (baik/enak) · Vin (anggur) · Temps (waktu/cuaca)'
      }
    ],
    culturalNote: 'Saat ini, mayoritas penutur bahasa Prancis di dunia tinggal di benua Afrika, menjadikan bahasa Prancis salah satu bahasa dengan pertumbuhan tercepat pada abad ke-21.'
  },

  de: {
    title: 'Bahasa Para Penyair, Pemikir & Rekayasa Presisi',
    tagline: 'Dari terjemahan Alkitab Martin Luther hingga fisika Einstein dan kata majemuk yang sangat presisi.',
    speakersCount: 'Lebih dari 130 Juta Total Penutur',
    writingSystem: 'Abjad Latin Jerman (26 Huruf + ä, ö, ü, ß)',
    languageFamily: 'Indo-Eropa (Jermanik Barat)',
    facts: [
      { label: 'Terbesar di Uni Eropa', value: 'Bahasa Ibu Paling Banyak Dituturkan ke-1 di Uni Eropa', icon: '🇪🇺' },
      { label: 'Kata Majemuk', value: 'Kata-kata dirangkai menyatu membentuk konsep yang tepat', icon: '🧩' },
      { label: 'Kasus Tata Bahasa', value: '4 Kasus (Nominatif, Akusatif, Datif, Genitif)', icon: '🏛️' },
      { label: 'Genus Kata', value: '3 Genus: Maskulin (der), Feminin (die), Netral (das)', icon: '⚖️' },
      { label: 'Huruf Kapital', value: 'Setiap kata benda wajib diawali huruf kapital dalam tulisan', icon: '🔠' },
      { label: 'Warisan Keilmuan', value: 'Bahasa Goethe, Kant, Beethoven, dan Einstein', icon: '🔬' }
    ],
    historyTimeline: [
      {
        era: 'Abad ke-6 – ke-8',
        title: 'Pergeseran Konsonan Jerman Hulu',
        description: 'Perubahan bunyi besar memisahkan bahasa Jerman dari kerabat Jermaniknya (Inggris dan Belanda), mengubah bunyi "t" menjadi "z/ss" (Inggris water "air" → Jerman Wasser, Inggris two "dua" → Jerman zwei).',
        highlight: 'Pemisahan dari rumpun Jermanik Purba'
      },
      {
        era: '1522',
        title: 'Terjemahan Alkitab Martin Luther',
        description: 'Martin Luther menerjemahkan Perjanjian Baru ke dalam dialek kepaniteraan Sachsen yang hidup dan mudah dipahami rakyat, merajut satu standar bahasa tulis nasional Jerman dari ratusan dialek daerah.',
        highlight: 'Lahirnya bahasa Jerman Baku modern (Hochdeutsch)'
      }
    ],
    linguisticTraits: [
      {
        title: 'Huruf Kapital pada Seluruh Kata Benda',
        description: 'Bahasa Jerman adalah satu-satunya bahasa besar di dunia yang menuliskan huruf kapital pada setiap kata benda di posisi mana pun, memudahkan pembaca mengenali subjek dan objek seketika.',
        icon: '🔠',
        example: 'Das Buch (Buku itu) · Die Zeit (Waktu itu)'
      },
      {
        title: 'Kata Majemuk yang Legendaris',
        description: 'Bahasa Jerman dapat meleburkan beberapa kata benda menjadi satu istilah berkonsep tajam. Sarung tangan secara harfiah disebut "sepatu-tangan" (Handschuh), dan kulkas disebut "lemari-pendingin" (Kühlschrank).',
        icon: '🧩',
        example: 'Kühlschrank ("Lemari-sejuk" = Kulkas)'
      }
    ],
    culturalNote: 'Bahasa Jerman merupakan bahasa utama filsafat, musik klasik, dan inovasi rekayasa industri mutakhir di Jerman, Austria, serta Swiss.'
  },

  pt: {
    title: 'Bahasa Camões & Jalur Pelayaran Samudra Raya',
    tagline: 'Dituturkan melintasi 4 benua, dari Lisboa hingga Rio de Janeiro, Luanda, Maputo, dan Dili.',
    speakersCount: 'Lebih dari 260 Juta Penutur Jati',
    writingSystem: 'Abjad Latin Portugis (26 Huruf + Tanda Diakritik)',
    languageFamily: 'Indo-Eropa (Roman)',
    facts: [
      { label: 'Belahan Bumi Selatan', value: 'Bahasa paling banyak dituturkan di Belahan Bumi Selatan', icon: '🌎' },
      { label: 'Penyair Nasional', value: 'Luís de Camões (Wiracarita Os Lusíadas, 1572)', icon: '📜' },
      { label: 'Tanda Tilde Sengau', value: 'Tanda gelombang terkenal (ã, õ) untuk alunan vokal sengau', icon: '🎵' },
      { label: 'Genus Kata', value: '2 Genus (Maskulin berakhiran -o, Feminin berakhiran -a)', icon: '⚖️' },
      { label: 'Makna Saudade', value: 'Rasa rindu mendalam dan kenangan manis yang tak tergantikan', icon: '💖' },
      { label: 'Populasi Terbesar', value: 'Brasil mencakup sekitar 80% dari seluruh penutur', icon: '🇧🇷' }
    ],
    historyTimeline: [
      {
        era: 'Abad ke-9 – ke-12',
        title: 'Bahasa Galisia-Portugis (Galego-Português)',
        description: 'Berkembang dari bahasa Latin Rakyat di barat laut Semenanjung Iberia, bahasa Galisia-Portugis menjadi bahasa utama puisi lirik para penyair pengembara Abad Pertengahan.',
        highlight: 'Zaman keemasan puisi lirik Abad Pertengahan'
      },
      {
        era: 'Abad ke-15 – ke-16',
        title: 'Abad Penjelajahan Samudra & Persebaran Global',
        description: 'Para pelaut Portugis seperti Vasco da Gama membawa bahasa ini menyeberangi samudra menuju Brasil, Afrika (Angola, Mozambik), India (Goa), Makau, hingga meninggalkan jejak kosakata di Nusantara.',
        highlight: 'Perluasan bahari lintas benua'
      }
    ],
    linguisticTraits: [
      {
        title: 'Vokal Sengau Bertanda Tilde (ã, õ)',
        description: 'Tanda tilde mulanya adalah huruf "n" kecil dalam singkatan naskah Latin Abad Pertengahan yang ditulis di atas huruf vokal (kata canção berasal dari cantionem). Tanda ini menghasilkan gema sengau hangat yang menjadi ciri khas bahasa Portugis.',
        icon: '🎵',
        example: 'Pão (Roti) · Não (Tidak) · Coração (Hati / Jantung)'
      },
      {
        title: 'Saudade: Jiwa Bahasa Portugis',
        description: 'Sering disebut sebagai salah satu kata paling puitis yang sulit diterjemahkan secara tunggal, saudade melukiskan kerinduan mendalam bercampur haru akan seseorang atau tempat tercinta yang jauh.',
        icon: '💖',
        example: 'Tenho saudades de você (Saya sangat merindukan kehadiranmu)'
      }
    ],
    culturalNote: 'Bahasa Portugis berstatus bahasa resmi di sembilan negara anggota Komunitas Negara-Negara Berbahasa Portugis, serta menyumbangkan kata-kata akrab dalam bahasa Indonesia seperti meja, jendela, sepatu, keju, dan minggu.'
  },

  en: {
    title: 'Bahasa Pengantar Dunia: Dari Akar Anglo-Sakson hingga Jaringan Jagat Jembar',
    tagline: 'Bagaimana sebuah bahasa kepulauan menyerap kosakata Latin, Nordik Kuno, dan Prancis hingga menjadi bahasa bersama umat manusia.',
    speakersCount: 'Lebih dari 1,5 Miliar Total Penutur',
    writingSystem: 'Abjad Latin Inggris (26 Huruf)',
    languageFamily: 'Indo-Eropa (Jermanik Barat)',
    facts: [
      { label: 'Kedudukan Global', value: 'Bahasa pengantar utama teknologi, sains, dan penerbangan dunia', icon: '🌐' },
      { label: 'Kosakata Campuran', value: '~60% akar Latin/Prancis + ~26% akar Jermanik', icon: '🧬' },
      { label: 'Jumlah Kosakata', value: 'Lebih dari 500.000 entri kata dalam Kamus Bahasa Inggris Oxford', icon: '📚' },
      { label: 'Kesederhanaan Tata Bahasa', value: 'Tanpa genus kata benda, minim perubahan akhiran kata kerja', icon: '✨' },
      { label: 'Keunikan Ejaan', value: 'Ejaan historis tetap dipertahankan sementara bunyinya bergeser', icon: '🎩' },
      { label: 'Dunia Digital', value: 'Bahasa utama perangkat lunak, internet, dan pemrograman', icon: '💻' }
    ],
    historyTimeline: [
      {
        era: 'sekitar 450 M',
        title: 'Bahasa Inggris Kuno (Pengaruh Anglo-Sakson & Viking)',
        description: 'Suku-suku Jermanik (Angles, Sakson, Jutes) menetap di Britania. Kedatangan bangsa Viking Nordik Kuno menyumbangkan kata-kata inti sehari-hari seperti sky (langit), skin (kulit), take (mengambil), they (mereka), dan give (memberi).',
        highlight: 'Wiracarita Inggris Kuno Beowulf'
      },
      {
        era: '1066 M',
        title: 'Penaklukan Norman & Masuknya Kosakata Prancis',
        description: 'William Sang Penakluk menjadikan bahasa Prancis Anglo-Norman sebagai bahasa istana dan hukum, melahirkan kosakata berlapis ganda yang terkenal (hewan ternak berakar Jermanik, sedangkan hidangan daging di meja bangsawan berakar Prancis: pig/pork — babi/daging babi, cow/beef — sapi/daging sapi).',
        highlight: 'Ledakan serapan kosakata Prancis dan Latin'
      },
      {
        era: 'sekitar 1600 M',
        title: 'Shakespeare & Alkitab Raja James',
        description: 'William Shakespeare menciptakan lebih dari 1.700 kata serta ungkapan baru, sementara terjemahan Alkitab Raja James membakukan irama puitis bahasa Inggris modern ke seluruh dunia.',
        highlight: 'Bahasa Inggris Modern berkembang pesat'
      }
    ],
    linguisticTraits: [
      {
        title: 'Kosakata Dua Lapis: Jermanik & Prancis',
        description: 'Bahasa Inggris hampir selalu memiliki dua kata untuk konsep yang sama: kata Jermanik yang lugas untuk percakapan sehari-hari dan padanan Prancis/Latin yang bernuansa resmi atau terpelajar.',
        icon: '🧬',
        example: 'Ask "bertanya" (Jermanik) dan Inquire "menanyakan resmi" (Prancis) · Kingly dan Royal ("bersifat kerajaan")'
      },
      {
        title: 'Ketiadaan Genus Tata Bahasa pada Kata Benda',
        description: 'Tidak seperti bahasa Jerman atau Spanyol, bahasa Inggris telah meninggalkan genus kata benda berabad-abad silam. Semua kata benda cukup memakai kata sandang yang sama, yakni "the"!',
        icon: '✨',
        example: 'The sun (matahari), the moon (bulan), the table (meja) — tanpa genus kata benda yang perlu dihafal.'
      }
    ],
    culturalNote: 'Bahasa Inggris kini menjadi bahasa penghubung utama dalam ilmu pengetahuan global, penerbangan sipil, perdagangan internasional, dan jaringan internet dunia.'
  }
};
