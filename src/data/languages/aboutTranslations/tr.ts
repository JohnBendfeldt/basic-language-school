import { AboutLanguageTranslations } from './types';

export const ABOUT_TRANSLATIONS_TR: AboutLanguageTranslations = {
  zh: {
    title: 'Mandarin ve Basitleştirilmiş Çincenin Hikâyesi',
    tagline: '3.000 yıllık fal kemiklerinden 1950’lerin okuryazarlık devrimine ve Pinyin’in doğuşuna.',
    speakersCount: '1,1 Milyardan Fazla Ana Dil Konuşuru',
    writingSystem: 'Basitleştirilmiş Çin Karakterleri (简体字) ve Hanyu Pinyin (汉语拼音)',
    languageFamily: 'Çin-Tibet Dil Ailesi',
    facts: [
      { label: 'Ana Dil Konuşuru', value: '1,1 Milyar (Dünyada 1. Sırada)', icon: '👥' },
      { label: 'Resmî Yazı Sistemi', value: 'Basitleştirilmiş Karakterler (简体字)', icon: '✍️' },
      { label: 'Fonetik Köprü', value: 'Hanyu Pinyin (1958’de kabul edildi)', icon: '🔤' },
      { label: 'Standart Lehçe', value: 'Pekin Ses Bilgisi', icon: '📍' },
      { label: 'Fiil Çekimi', value: 'Sıfır (Geçmiş veya gelecek zaman eki yoktur)', icon: '✨' },
      { label: 'BM Resmî Dili', value: '1946’dan beri', icon: '🌐' }
    ],
    historyTimeline: [
      {
        era: 'MÖ yak. 1200',
        title: 'Fal Kemiği Yazısı (甲骨文 · Jiǎgǔwén)',
        description: 'Shang Hanedanı döneminde kehanet amacıyla kaplumbağa kabuklarına ve öküz kürek kemiklerine kazınan bilinen en eski Çin yazısıdır. Karakterler, güneş (日) ve su (水) gibi doğa unsurlarının doğrudan resimsel tasvirleriydi.',
        highlight: 'Yazılı Çincenin doğuşu'
      },
      {
        era: 'MÖ 221',
        title: 'İmparatorluk Yazı Birliği (秦始皇 · Küçük Mühür Yazısı)',
        description: 'Çin’in İlk İmparatoru Qin Shi Huang, yüzlerce bölgesel yazı biçimini tek bir ulusal Küçük Mühür ve Kâtip yazısında birleştirerek fermanların konuşulan lehçeden bağımsız biçimde tüm eyaletlerde aynı okunmasını sağladı.',
        highlight: 'Çin’de yazı birliğinin sağlanması'
      },
      {
        era: 'MS yak. 200 – 1950’ler',
        title: 'Geleneksel Kurallı Yazı (繁体楷书 · Fántǐ Kǎishū)',
        description: 'Yaklaşık 1.800 yıl boyunca Geleneksel Çince edebiyatın, devlet yönetiminin ve şiirin altın standardı olarak kaldı. Ancak karakter başına 20 ila 30 fırça darbesi içeren karmaşık yapılar, sıradan emekçi halkın eğitime erişiminde büyük engeller oluşturdu.',
        highlight: 'Klasik edebiyat dönemi'
      },
      {
        era: '1949 – 1956',
        title: 'Okuryazarlık Krizi ve Basitleştirilmiş Karakterler (简体字)',
        description: '1949 yılında Çin’de okuma yazma bilmeyenlerin oranı %80’in üzerindeydi. Eğitimi hızla halka yaymak amacıyla hükûmet Çin Karakterlerini Basitleştirme Planı’nı (汉字简化方案) başlattı. 2.200’den fazla karmaşık karakter, yüzyıllardır kullanılan el yazısı kısaltmalarıyla sadeleştirildi.',
        highlight: 'Ulusal okuryazarlık %20’den %96’nın üzerine çıktı'
      },
      {
        era: '1958',
        title: 'Zhou Youguang ve Pinyin’in İcadı (汉语拼音)',
        description: 'Ekonomist ve dilbilimci Zhou Youguang, Çin Yazı Dilini Reform Komitesi’ne liderlik ederek Hanyu Pinyin sistemini tasarladı. Latin alfabesini kullanan Pinyin, günümüzde bilgisayar ve akıllı telefon klavyelerinin temelini oluşturan erişilebilir bir fonetik köprü kurdu.',
        highlight: 'Zhou Youguang 111 yıl yaşadı (1906–2017)'
      }
    ],
    scriptComparison: [
      {
        traditional: '國',
        simplified: '国',
        pinyin: 'guó',
        meaning: 'Ülke / Ulus',
        traditionalStrokes: 11,
        simplifiedStrokes: 8,
        reason: 'İç kısımdaki karmaşık silah kökü, ülke sınırları (囗) içinde korunan bir hazineyi simgeleyen yeşim taşı (玉) simgesiyle değiştirildi.'
      },
      {
        traditional: '學',
        simplified: '学',
        pinyin: 'xué',
        meaning: 'Çalışmak / Öğrenmek',
        traditionalStrokes: 16,
        simplifiedStrokes: 8,
        reason: '16 darbeli yoğun üst kısım, yüzyıllardır günlük el yazısında kullanılan 8 darbeli yalın biçime indirgendi.'
      },
      {
        traditional: '愛',
        simplified: '爱',
        pinyin: 'ài',
        meaning: 'Sevgi / Aşk',
        traditionalStrokes: 13,
        simplifiedStrokes: 10,
        reason: 'Yazımı akıcı ve hızlı kılmak için ortadaki karmaşık kalp kökü (心) yerine dostluk ve uyumu simgeleyen (友) biçimi getirildi.'
      },
      {
        traditional: '門',
        simplified: '门',
        pinyin: 'mén',
        meaning: 'Kapı / Geçit',
        traditionalStrokes: 8,
        simplifiedStrokes: 3,
        reason: 'İki kanatlı ayrıntılı kapı çizimi, 3 darbeli yalın bir kapı çerçevesine dönüştürüldü.'
      },
      {
        traditional: '馬',
        simplified: '马',
        pinyin: 'mǎ',
        meaning: 'At',
        traditionalStrokes: 10,
        simplifiedStrokes: 3,
        reason: 'Yele, bacaklar ve kuyruk kesintisiz 3 akıcı fırça darbesinde birleştirildi.'
      }
    ],
    linguisticTraits: [
      {
        title: 'Fiil Çekimi Yoktur',
        description: 'Onlarca fiil çekim ekine sahip İspanyolca, Fransızca veya Türkçenin aksine Çince fiiller asla değişmez! "Yemek yemek" (吃 chī) ben yerim, sen yersin, dün yedik veya yarın yiyecekler için tamamen aynıdır. Zaman kavramı zaman zarflarıyla (dün, yarın) veya görünüş edatlarıyla (了 le) belirtilir.',
        icon: '⚡',
        example: '我吃 (Ben yerim) · 昨天我吃 (Dün yedim)'
      },
      {
        title: 'Dilbilgisel Cinsiyet ve Çoğul Eki Yoktur',
        description: 'Eril veya dişil tanımlıklar yoktur ve isimler çoğul olduğunda ek almaz. Bir elma 一个苹果, beş elma ise 五个苹果 şeklindedir.',
        icon: '🍎',
        example: '苹果 (Elma) hem tekilde hem çoğulda her zaman 苹果 olarak kalır.'
      },
      {
        title: 'Ölçü Sözcükleri (Sınıflandırıcılar)',
        description: 'Mandarincede nesneleri sayarken sayı ile isim arasına nesnenin biçimine veya türüne göre özel bir sınıflandırıcı sözcük girer (örn. kitaplar için 本 běn, taşıtlar için 辆 liàng, düz yüzeyler için 张 zhāng).',
        icon: '📏',
        example: '一本书 (Bir kitap) · 一辆车 (Bir araba)'
      },
      {
        title: 'Tonlu Dil Yapısı (4 Ton)',
        description: 'Mandarince 4 belirgin ses perdesi eğrisi (düz yüksek, yükselen, alçalıp yükselen, düşen) ve bir nötr ton kullanır. Ses perdesindeki değişim, hecenin karakterini ve anlamını bütünüyle değiştirir.',
        icon: '🎵',
        example: 'mā (Anne 妈) ile mǎ (At 马)'
      }
    ],
    culturalNote: 'Günümüzde Basitleştirilmiş Çince; Çin Ana Karası, Singapur ve Birleşmiş Milletler gibi uluslararası kuruluşlarda standart yazı sistemiyken, Geleneksel Çince Tayvan, Hong Kong, Makao ve klasik hat sanatında yaşatılmaktadır.'
  },

  ko: {
    title: 'Hangıl Mucizesi: Bir Kralın Halkına Okuryazarlık Armağanı',
    tagline: '1443 yılında Kral Sejong, dünyanın en bilimsel tasarımlı alfabelerinden birini oluşturdu.',
    speakersCount: '80 Milyondan Fazla Ana Dil Konuşuru',
    writingSystem: 'Hangıl (한글) — Özelliksel Fonetik Alfabe',
    languageFamily: 'Kore Dil Ailesi (İzole Dil)',
    facts: [
      { label: 'Mucidi', value: 'Büyük Kral Sejong (1443)', icon: '👑' },
      { label: 'Alfabe Sistemi', value: '24 Temel Harf (Ünsüzler ve Ünlüler)', icon: '🔤' },
      { label: 'Bilimsel Tasarım', value: 'Harf şekilleri ağız ve dil yapısını taklit eder', icon: '👅' },
      { label: 'Ulusal Bayram', value: 'Hangıl Günü (9 Ekim)', icon: '🎉' },
      { label: 'Söz Dizimi', value: 'Özne-Nesne-Yüklem (Türkçe ile aynı yapı)', icon: '🧱' },
      { label: 'Saygı İfadeleri', value: 'Dilbilgisine işlenmiş incelikli nezaket kademeleri', icon: '🙇' }
    ],
    historyTimeline: [
      {
        era: '1443 Öncesi',
        title: 'Hanja (Çin Karakterleri) Yükü',
        description: 'Korelilerin kendilerine özgü bir yazı sistemi yoktu ve karmaşık Çin karakterlerini (Hanja) kullanıyorlardı. Çince ile Korece tamamen farklı dil ailelerine ait olduğundan, yalnızca varlıklı soylu sınıf (Yangban) okuryazar olmak için gereken on yılları ayırabiliyordu.',
        highlight: 'Halk yasaları okuyamıyor ve mektup yazamıyordu'
      },
      {
        era: '1443 – 1446',
        title: 'Kral Sejong’un Hunminjeongeum’u İlan Etmesi',
        description: 'Sıradan yurttaşları güçlendirmeye kararlı olan Kral Sejong, saray bilginleriyle birlikte gizlice Hangıl alfabesini geliştirdi. 1446’da "Halkın Eğitimi İçin Doğru Sesler" (Hunminjeongeum) adlı eseri yayımlayarak okuma yazmanın nefes almak kadar kolay olması gerektiğini ilan etti.',
        highlight: '"Bilge bir kişi onu bir sabahta, bilgisiz biri ise on günde öğrenebilir."'
      },
      {
        era: '20. Yüzyıl',
        title: 'Demokratikleşme ve Kore Dalgası (Hallyu)',
        description: 'Geleneksel seçkinlerin tarihsel direnişine rağmen Hangıl modern çağda zafer kazanarak Güney Kore’yi dünyanın en yüksek okuryazarlık oranlarından birine (%99) taşıdı ve Kore müziği ile dizilerinin küresel yükselişine güç verdi.',
        highlight: '1989 yılında UNESCO Kral Sejong Okuryazarlık Ödülü kuruldu'
      }
    ],
    linguisticTraits: [
      {
        title: 'Özelliksel Yazı (Ağız ve Dil Hareketlerinin Yansıması)',
        description: 'Hangıl harfleri rastgele çizilmemiştir: ㄱ dil kökünün boğazı kapatmasını, ㄴ dil ucunun üst diş etine değmesini, ㅁ ise dudakların biçimini doğrudan yansıtır.',
        icon: '👅',
        example: 'ㅁ (m) kapalı dudakları gösterir; ㅂ (b) patlamalı ses için çizgiler ekler.'
      },
      {
        title: 'Hece Bloğu Mimarisi',
        description: 'Harfler düz bir satırda tek tek dizilmek yerine kare biçimli hece blokları hâlinde istiflenir. Örneğin ㅎ (h) + ㅏ (a) + ㄴ (n) birleşerek "한" (han) bloğunu oluşturur.',
        icon: '🧱',
        example: 'ㅎ (h) + ㅏ (a) + ㄴ (n) = 한 (han hecesi)'
      },
      {
        title: 'Özne-Nesne-Yüklem Söz Dizimi',
        description: 'Korecede tıpkı Türkçede olduğu gibi fiil her zaman cümlenin en sonunda yer alır. "Ben elma yiyorum" cümlesi "Ben elmayı yiyorum" (저는 사과를 먹어요) sırasıyla kurulur.',
        icon: '🔄',
        example: '저는 (Ben) + 사과를 (Elmayı) + 먹어요 (Yiyorum)'
      }
    ],
    culturalNote: 'Hangıl Günü, kraliyet eliyle halka armağan edilen dilsel özgürlüğü onurlandırmak amacıyla Güney Kore’de her yıl 9 Ekim’de resmî ulusal bayram olarak kutlanır.'
  },

  ja: {
    title: 'Üç Yazı Sisteminin Uyumu (漢字 · ひらがな · カタカナ)',
    tagline: 'Çin ideogramlarını iki yerli fonetik hece yazısıyla birleştiren zarif bir dilsel senfoni.',
    speakersCount: '125 Milyondan Fazla Ana Dil Konuşuru',
    writingSystem: 'Kanji (漢字), Hiragana (ひらがな) ve Katakana (カタカナ)',
    languageFamily: 'Japon Dil Ailesi',
    facts: [
      { label: 'Kullanılan Yazılar', value: 'Birbiriyle İç İçe Çalışan 3 Yazı Sistemi', icon: '✍️' },
      { label: 'Jōyō Kanji', value: 'Okullarda Öğretilen 2.136 Temel Karakter', icon: '📚' },
      { label: 'Söz Dizimi', value: 'Özne-Nesne-Yüklem (Fiil daima sonda gelir)', icon: '🔄' },
      { label: 'Vurgu Sistemi', value: 'Perde Vurgusu (Yüksek / Alçak ses perdesi)', icon: '🎵' },
      { label: 'Alıntı Sözcükler', value: 'Katakana ile yazılır (örn. コーヒー — kahve)', icon: '☕' },
      { label: 'Edatlar', value: 'Sözcük görevini belirten ekler (は, が, を, に)', icon: '🏷️' }
    ],
    historyTimeline: [
      {
        era: '5. Yüzyıl',
        title: 'Kanji’nin Asya Kıtasından Gelişi',
        description: 'Çin ile temas öncesinde Japonca yalnızca sözlü bir dildi. Japonca isimleri, yasaları ve Budist sutraları kayda geçirmek için Çin karakterleri (Kanji) benimsendi.',
        highlight: 'Çin logogramlarının Japoncaya uyarlanması'
      },
      {
        era: '8. – 10. Yüzyıl',
        title: 'Hiragana’nın İcadı ve Saray Kadın Edebiyatı',
        description: 'Saraylı kadın yazarlar, işlek Kanji biçimlerini sadeleştirerek Hiragana ("kadın eli") adı verilen akıcı hece yazısını geliştirdi. Bu yenilik, Murasaki Shikibu’nun dünyaca ünlü Genji’nin Hikâyesi romanı dâhil Japon edebiyatının başyapıtlarını doğurdu.',
        highlight: 'Yerli fonetik yazının doğuşu'
      },
      {
        era: 'Çağdaş Dönem',
        title: 'Katakana ve Küresel Söz Varlığının Uyarlanması',
        description: 'Başlangıçta Budist rahipler tarafından okuma notları olarak geliştirilen Katakana, modern bilimsel terimler, yabancı özel adlar ve küresel alıntı sözcükler için standart yazı sistemi hâline geldi (örn. コンピューター konpyūtā — bilgisayar).',
        highlight: 'Üç yazı sisteminin kusursuz uyumu'
      }
    ],
    linguisticTraits: [
      {
        title: 'Üçlü Yazı Sistemi',
        description: 'Tek bir cümlede çoğunlukla üç yazı sistemi bir arada kullanılır: Kanji temel kavram köklerini taşır (私 ben, 食べる yemek), Hiragana dilbilgisi eklerini ve edatları üstlenir (は, を, ました), Katakana ise yabancı kökenli sözcükleri aktarır (パン ekmek).',
        icon: '🧩',
        example: '私はパンを食べました (Ben ekmek yedim)'
      },
      {
        title: 'Dilbilgisel İlgeçler (助詞 · Joshi)',
        description: 'İsimlerden sonra gelen kısa görev edatları her sözcüğün cümledeki rolünü açıkça belirler (は konu, が özne, を belirtili nesne, に yönelme veya zaman).',
        icon: '🏷️',
        example: '猫が (kedi [özne]) + 魚を (balığı [nesne]) + 食べた (yedi)'
      }
    ],
    culturalNote: 'Japoncoda ustalaşmak; görsel hat sanatı, incelikli saygı dili (Keigo) ve bağlama dayalı iletişim arasındaki derin kültürel bağı keşfetmenizi sağlar.'
  },

  ru: {
    title: 'Slav Ruhu: Kiril Keşişlerinden Puşkin ve Tolstoy’a',
    tagline: 'Bizanslı bilginler, Deli Petro ve büyük şairler tarafından biçimlendirilen zengin ve etkileyici bir dil.',
    speakersCount: 'Toplam 255 Milyondan Fazla Konuşur',
    writingSystem: 'Rus Kiril Alfabesi (33 Harf)',
    languageFamily: 'Hint-Avrupa (Doğu Slav Kolu)',
    facts: [
      { label: 'Alfabe', value: '33 Harf (10 ünlü, 21 ünsüz, 2 işaret harfi)', icon: '🔤' },
      { label: 'Yazı Reformları', value: 'Büyük Petro (1708) ve Sovyet Reformu (1918)', icon: '📜' },
      { label: 'Durum Sistemi', value: '6 İsmin Hâli (Durum Çekimi)', icon: '🏛️' },
      { label: 'Cinsiyet', value: '3 Dilbilgisel Cinsiyet (Eril, Dişil, Nötr)', icon: '⚖️' },
      { label: 'Uzay Dili', value: 'Uluslararası Uzay İstasyonu’nda İngilizceyle birlikte zorunlu dil', icon: '🚀' },
      { label: 'Edebiyatın Altın Çağı', value: 'Puşkin, Tolstoy, Dostoyevski, Çehov', icon: '📖' }
    ],
    historyTimeline: [
      {
        era: 'MS yak. 863',
        title: 'Aziz Kiril ve Metodius Kardeşler',
        description: 'Bizanslı misyoner kardeşler Kiril ve Metodius, kutsal metinleri Slav halklarının diline çevirmek amacıyla Glagol yazısını geliştirdi; bu sistem kısa süre içinde Birinci Bulgar İmparatorluğu’nda Kiril alfabesine dönüştü.',
        highlight: 'Kiril alfabesinin doğuşu'
      },
      {
        era: '1708',
        title: 'Büyük Petro’nun Sivil Yazı Reformu (Гражданский шрифт)',
        description: 'Çar Büyük Petro, ağdalı kilise harflerini bizzat eleyip Rus Kiril harflerini Batı Avrupa matbaa estetiğine yaklaştırarak Rus bilimini, deniz haritacılığını ve yayıncılığını çağdaşlaştırdı.',
        highlight: 'Matbaanın dünyevileşmesi ve modernleşmesi'
      },
      {
        era: '1918',
        title: 'Devrim Sonrası Büyük İmla Reformu',
        description: 'Yeni yönetim, işlevini yitirmiş tarihsel harfleri (ѣ "yat", ѳ "fita" ve kelime sonundaki ъ sertlik işareti gibi) kaldırarak yazımı sadeleştirdi ve bugünkü 33 harflik akıcı alfabeyi kesinleştirdi.',
        highlight: 'Günümüzdeki 33 harflik standardın yerleşmesi'
      }
    ],
    linguisticTraits: [
      {
        title: 'Hareketli Sözcük Vurgusu',
        description: 'Rusçada vurgu sabit değildir ve yer değiştirdiğinde sözcüğün anlamını tamamen değiştirebilir (за́мок = kale / şato iken замо́к = asma kilit). Vurgusuz "o" ünlüsü doğal konuşmada "a" sesine yaklaşır (молоко́ → malakó).',
        icon: '🎯',
        example: 'за́мок (şato, kale) ile замо́к (kilit)'
      },
      {
        title: 'Sert ve Yumuşak Ünsüzler (Damaksıllaşma)',
        description: 'Neredeyse her ünsüz harfin sert (düz) ve yumuşak (damaksıllaşmış) bir karşılığı vardır; bu ayrım ardından gelen ünlü harfle veya yumuşatma işaretiyle (ь) belirlenir.',
        icon: '🎶',
        example: 'мат (satrançta mat) ile мать (anne)'
      }
    ],
    culturalNote: 'Rusça, Birleşmiş Milletler’in altı resmî dilinden biridir ve Uluslararası Uzay İstasyonu’nda astronotların öğrendiği zorunlu ikinci görev dilidir.'
  },

  tr: {
    title: '1928 Mucizesi: Atatürk’ün Harf Devrimi',
    tagline: 'Koca bir ulusun yalnızca birkaç ay içinde Osmanlı Arap yazısından fonetik Latin alfabesine geçiş öyküsü.',
    speakersCount: '85 Milyondan Fazla Ana Dil Konuşuru',
    writingSystem: 'Türk Latin Alfabesi (29 Harf)',
    languageFamily: 'Türk Dilleri Ailesi',
    facts: [
      { label: '1928 Reformu', value: 'Harf Devrimi (Atatürk’ün Alfabe İnkılabı)', icon: '🏛️' },
      { label: 'Alfabe', value: '29 Harf (Tamamen Fonetik: 1 harf = 1 ses)', icon: '🔤' },
      { label: 'Dil Yapısı', value: 'Sondan Eklemeli (Kök üzerine kurallı yapım ve çekim ekleri)', icon: '🧱' },
      { label: 'Ünlü Uyumu', value: 'Kalın ve ince ünlülerin ahenkli uyumu', icon: '🎵' },
      { label: 'Dilbilgisel Cinsiyet', value: 'Yoktur! Eril, dişil veya nötr ayrımı olmadan tek zamir "o" kullanılır', icon: '⚖️' },
      { label: 'Söz Dizimi', value: 'Özne-Nesne-Yüklem (ÖNY)', icon: '🔄' }
    ],
    historyTimeline: [
      {
        era: '10. Yüzyıl – 1928',
        title: 'Osmanlı Türkçesi ve Arap Alfabesi Uyumsuzluğu',
        description: 'Türkçe 900 yılı aşkın süre Arap kökenli Osmanlı yazısıyla yazıldı. Oysa Arap yazısında yalnızca 3 temel ünlü işareti bulunurken Türkçede anlam ayırt edici 8 zengin ünlü vardır. Bu uyumsuzluk ciddi okuma güçlüklerine yol açarak okuryazarlığı %10’un altında tuttu.',
        highlight: 'Alfabe-ses uyumsuzluğu nedeniyle düşük okuryazarlık'
      },
      {
        era: '1928',
        title: 'Mustafa Kemal Atatürk’ün Harf Devrimi',
        description: 'Türkiye Cumhuriyeti’nin kurucusu Atatürk, başında kara tahtayla yurt gezilerine çıkarak Türkçenin ses yapısına özenle uyarlanmış 29 harfli yeni fonetik Türk alfabesini (ç, ğ, ı, ö, ş, ü harfleriyle birlikte) bizzat halka öğretti.',
        highlight: 'Ulusal okuryazarlık oranı %10’dan %90’ın üzerine yükseldi'
      }
    ],
    linguisticTraits: [
      {
        title: 'Sondan Eklemeli Sözcük Zincirleri',
        description: 'Sözcükler, değişmeyen bir kökün sonuna yapboz parçaları gibi düzenli eklerin getirilmesiyle kurulur. Başka dillerde uzun bir cümle gerektiren anlam, Türkçede tek bir sözcükle ifade edilebilir!',
        icon: '🧱',
        example: 'Ev (kök) → evler (çoğul) → evlerimde (iyelik + bulunma hâli)'
      },
      {
        title: 'Ünlü Uyumu',
        description: 'Bir sözcükteki ünlüler kalın ünlüler (a, ı, o, u) ile ince ünlüler (e, i, ö, ü) arasında müzikal bir ahenk izler. Eklerin ünlüleri, eklendikleri kökün sesine kendiliğinden uyum sağlar.',
        icon: '🎶',
        example: 'araba-lar (kalın ünlü uyumu) ile kedi-ler (ince ünlü uyumu)'
      }
    ],
    culturalNote: 'Türkçe yazım kuralları %100 sesçil (fonetik) olduğundan, 29 harfin ses değerini öğrendiğiniz anda dildeki her sözcüğü eksiksiz ve doğru telaffuz edebilirsiniz.'
  },

  ar: {
    title: 'Belagat ve Fesahat Dili (لغة الضاد · Lugatü’d-Dâd)',
    tagline: 'Arap dünyasında 400 milyonu aşkın insanı birleştiren köklü ve kalıp tabanlı kadim bir dil.',
    speakersCount: 'Toplam 400 Milyondan Fazla Konuşur',
    writingSystem: 'Arap Ebced Yazısı (28 Harf, Sağdan Sola)',
    languageFamily: 'Afro-Asya (Sami Dilleri Kolu)',
    facts: [
      { label: 'Yazı Yönü', value: 'Sağdan Sola', icon: '➡️' },
      { label: 'Alfabe', value: '28 Harf (Ünsüzler ve uzun ünlüler)', icon: '🔤' },
      { label: 'Kök Sistemi', value: '3 Harfli Ünsüz Kökleri (Sülâsî Kökler)', icon: '🌱' },
      { label: 'Özgün Ses', value: 'Dâd (ض) — Neredeyse yalnızca Arapçada bulunan eşsiz ses', icon: '🗣️' },
      { label: 'İkil (Tesniye) Yapı', value: 'Tekil, İkil (iki varlık için özel çekim) ve Çoğul biçimler', icon: '2️⃣' },
      { label: 'Küresel Kutlama', value: 'BM Dünya Arapça Günü (18 Aralık)', icon: '🌐' }
    ],
    historyTimeline: [
      {
        era: 'MS 6. Yüzyıl',
        title: 'İslam Öncesi Şiir Geleneği (Muallakât)',
        description: 'Bedevi şairler çölde onuru ve cesareti yücelten derin kafiyeli kasideleri ezbere okuyarak Klasik Arapçanın yüksek şiirsel ölçütünü oluşturdu.',
        highlight: 'İslam öncesi sözlü şiirin altın çağı'
      },
      {
        era: 'MS 7. Yüzyıl',
        title: 'Kur’an-ı Kerim ve Dilin Korunması',
        description: 'Kur’an-ı Kerim’in indirilişi ve mushaf hâline getirilişi, Arap dilbilgisini ve ses düzenini kayıt altına alarak dili 1.400 yılı aşkın süre boyunca özünü kaybetmeden korudu.',
        highlight: 'İslam dünyasının evrensel ibadet ve ilim standardı'
      },
      {
        era: 'Çağdaş Dönem',
        title: 'Modern Standart Arapça (الفصحى · Fushâ)',
        description: 'Günümüzde Fasih Arapça (Fushâ); 22 ülkede edebiyatın, haber yayıncılığının, diplomasinin ve eğitimin ortak resmî dili olarak hizmet vermektedir.',
        highlight: 'Arap dünyasının ortak iletişim dili'
      }
    ],
    linguisticTraits: [
      {
        title: 'Üç Harfli Kök Mekanizması (الجذر · el-Cezr)',
        description: 'Neredeyse her Arapça sözcük, soyut bir temel anlam taşıyan 3 ünsüzlü bir kökten türetilir. Örneğin "yazmak" kavramıyla ilişkili K-T-B (ك-ت-ب) kökünden kitāb (kitap), kātib (yazar, kâtip), maktab (büro, çalışma yeri) ve maktūb (yazılmış, kader) sözcükleri doğar.',
        icon: '🌱',
        example: 'ك-ت-ب → كتاب (Kitap) · مكتبة (Kütüphane) · كاتب (Yazar)'
      },
      {
        title: 'Bitişik Akıcı Harf Biçimleri',
        description: 'Arap harfleri akıcı bir el yazısı düzeninde birbirine bağlanır ve sözcüğün başında, ortasında, sonunda ya da bağımsız duruşuna göre biçim değiştirir.',
        icon: '✍️',
        example: 'ب harfinin başta (بـ), ortada (ـبـ) ve sonda (ـب) yazılışı'
      }
    ],
    culturalNote: 'Arap hüsnühat (kaligrafi) sanatı, insanlık tarihinin en seçkin görsel sanat dallarından biri olarak kabul edilir.'
  },

  hi: {
    title: 'Hindistan’ın Sesi: Kadim Sanskritçeden Bollywood’a',
    tagline: 'Zarif Devanagari ("Tanrıların Şehri") yazısıyla kaleme alınan ve 600 milyondan fazla insanın konuştuğu dil.',
    speakersCount: 'Toplam 600 Milyondan Fazla Konuşur',
    writingSystem: 'Devanagari (देवनागरी) Abugida Yazısı',
    languageFamily: 'Hint-Avrupa (Hint-Aryan Kolu)',
    facts: [
      { label: 'Alfabe', value: '46 Devanagari Harfi (11 Ünlü, 33 Ünsüz)', icon: '🔤' },
      { label: 'Üst Çizgi', value: 'Şirorekha (Harflerin asılı durduğu yatay üst çizgi)', icon: '📏' },
      { label: 'Kardeş Dil', value: 'Günlük konuşma dilinde Urduca ile karşılıklı anlaşılır', icon: '🤝' },
      { label: 'Söz Dizimi', value: 'Özne-Nesne-Yüklem (Türkçe ile aynı sıra)', icon: '🔄' },
      { label: 'Tarihsel Ata', value: 'Sanskritçe (संस्कृतम्)', icon: '🏛️' },
      { label: 'Dünya Dillerine Etkisi', value: 'Yoga, avatar, cangıl, guru, çay, şampuan', icon: '🧘' }
    ],
    historyTimeline: [
      {
        era: 'MÖ yak. 1500',
        title: 'Vedik Sanskrit Kökleri',
        description: 'Vedik Sanskritçe zamanla Kuzey Hindistan genelinde halkın günlük yaşamda konuştuğu bölgesel Prakrit lehçelerine evrildi.',
        highlight: 'Veda ilahileri ve klasik Hint felsefesi'
      },
      {
        era: '13. – 18. Yüzyıl',
        title: 'Hindustani Dilinin Doğuşu',
        description: 'Delhi Sultanlığı ve Babür İmparatorluğu dönemleri Farsça, Türkçe ve Arapça sözcükleri günlük konuşmaya taşıyarak çarşıların ve şiirin canlı ortak dili Hindustani’yi ortaya çıkardı.',
        highlight: 'Ortak konuşma dili Hindustani’nin şekillenmesi'
      },
      {
        era: '1950',
        title: 'Hindistan Cumhuriyeti’nin Resmî Dili',
        description: 'Devanagari yazısıyla yazılan Standart Hintçe, Hindistan Birliği’nin resmî dili ilan edildi ve her yıl 14 Eylül’de ülke çapında Hintçe Günü (Hindi Diwas) olarak kutlanmaya başlandı.',
        highlight: 'Her yıl 14 Eylül’de kutlanan Hindi Diwas'
      }
    ],
    linguisticTraits: [
      {
        title: 'Taşıyıcı Üst Çizgi (Şirorekha · शिरोरेखा)',
        description: 'Devanagari harfleri, tıpkı ipe dizilmiş çamaşırlar gibi kesintisiz bir yatay üst çizgiden aşağı doğru sarkar; bu çizgi her sözcüğün harflerini görsel olarak bir arada tutar.',
        icon: '📏',
        example: 'क + म + ल = कमल (Nilüfer çiçeği)'
      },
      {
        title: 'Soluğu Güçlü (Üflemeli) ve Düz Ünsüz Ayrımı',
        description: 'Hintçe sade patlamalı ünsüzler ile güçlü nefesle çıkarılan ünsüzleri (k ile kh, p ile ph, t ile th) keskin biçimde ayırır. Elinizi ağzınızın önüne tuttuğunuzda soluklu seslerde belirgin bir hava akımı hissedilir.',
        icon: '💨',
        example: 'कल (Dün / Yarın) ile खल (Kötü niyetli)'
      }
    ],
    culturalNote: 'Dünya dilleri Hintçe ve Sanskritçeden karma, guru, avatar, pijama, şal ve şampuan gibi yüzlerce günlük sözcük ödünç almıştır.'
  },

  bn: {
    title: 'Ruhun Dili: Tagore ve Ana Dili Hareketi',
    tagline: 'İnsanlık tarihinde konuşurlarının kendi ana dillerini yaşatmak uğruna mücadele edip can verdiği tek dil.',
    speakersCount: '270 Milyondan Fazla Ana Dil Konuşuru (Dünyada 6. Sırada)',
    writingSystem: 'Bengal-Assam Yazısı (বাংলা লিপি)',
    languageFamily: 'Hint-Avrupa (Hint-Aryan Kolu)',
    facts: [
      { label: 'Küresel Sıralama', value: 'Dünyada En Çok Konuşulan 6. Ana Dil', icon: '🌐' },
      { label: 'Nobel Ödülü', value: 'Rabindranath Tagore (1913 Nobel Edebiyat Ödülü)', icon: '🏅' },
      { label: 'UNESCO Günü', value: 'Uluslararası Ana Dili Günü (21 Şubat)', icon: '🌺' },
      { label: 'Doğal Ünlü', value: 'Yuvarlak "o" sesi (অ /ɔ/)', icon: '👄' },
      { label: 'Dilbilgisel Cinsiyet', value: 'Yoktur! Fiiller ve sıfatlar cinsiyete göre değişmez', icon: '⚖️' },
      { label: 'Ulusal Marşlar', value: 'Tagore hem Hindistan’ın hem Bangladeş’in millî marşını yazmıştır', icon: '🎶' }
    ],
    historyTimeline: [
      {
        era: '10. – 12. Yüzyıl',
        title: 'Charyapada: En Eski Bengal Şiirleri',
        description: 'Budist mistik ozanların palmiye yaprağı el yazmalarına kaydettiği Charyapada ilahileri, Bengal dilinin bilinen en eski yazılı örneklerini oluşturur.',
        highlight: 'Eski Bengalce mistik ezgiler'
      },
      {
        era: '1913',
        title: 'Rabindranath Tagore’un Nobel Edebiyat Ödülü Zaferi',
        description: 'Çok yönlü düşünür ve şair Rabindranath Tagore, derin manevi şiir derlemesi Gitanjali ("İlahi Sunular") ile Nobel Edebiyat Ödülü’nü kazanan Avrupalı olmayan ilk yazar oldu.',
        highlight: 'Asya’nın ilk Nobel ödüllü yazarı'
      },
      {
        era: '21 Şubat 1952',
        title: 'Bengal Dili Hareketi (ভাষা আন্দোলন)',
        description: 'Dakka’daki üniversite öğrencileri Bengalcenin resmî devlet dili statüsünün silinmesi girişimlerine karşı sokaklara çıktı ve bu uğurda canlarını feda etti. UNESCO 1999 yılında onların anısına 21 Şubat’ı tüm dünyada Uluslararası Ana Dili Günü ilan etti.',
        highlight: 'UNESCO Uluslararası Ana Dili Günü'
      }
    ],
    linguisticTraits: [
      {
        title: 'Ünsüzlerdeki Doğal Yuvarlak "O" Ünlüsü',
        description: 'Varsayılan olarak kısa "a" sesi taşıyan Hintçenin aksine, Bengalcede işaret almamış her ünsüz harf sıcak ve yuvarlak bir "o" (/ɔ/) sesi barındırır. Örneğin "su" anlamına gelen জল sözcüğü "col" biçiminde okunur.',
        icon: '👄',
        example: 'ক = ko ("ka" değil) · জল = col (su)'
      },
      {
        title: 'Tam Cinsiyet Tarafsızlığı',
        description: 'Bengalce dilbilgisinde cinsiyet ayrımı hiç yoktur. Erkekler, kadınlar ve nesneler için aynı üçüncü tekil kişi zamiri (সে — o) ve tamamen aynı fiil çekimleri kullanılır.',
        icon: '⚖️',
        example: 'সে যায় (O gidiyor — kadın veya erkek)'
      }
    ],
    culturalNote: 'Uluslararası Ana Dili Günü (21 Şubat), 1952 yılında ana dilleri uğruna yaşamını yitiren Bengal üniversite öğrencilerinin anısına bütün dünyada kutlanmaktadır.'
  },

  ur: {
    title: 'Şiirin Dili: Nestâlik Hat Sanatı ve Saray Zarafeti',
    tagline: 'Hükümdar otağlarında filizlenen, yüzyıllar boyunca gazellerde, aşk şiirlerinde ve felsefede yüceltilen dil.',
    speakersCount: 'Toplam 230 Milyondan Fazla Konuşur',
    writingSystem: 'Fars-Arap Nestâlik Yazısı (نستعلیق · 39 Harf)',
    languageFamily: 'Hint-Avrupa (Hint-Aryan Kolu)',
    facts: [
      { label: 'Adının Kökeni', value: 'Türkçe "Ordu" (Hükümdar Otağı / Karargâh) sözcüğünden', icon: '⛺' },
      { label: 'Hat Üslubu', value: 'Nestâlik (Eğimli, akıcı İran hat üslubu)', icon: '✒️' },
      { label: 'Söz Varlığı Mirası', value: 'Prakrit temeli üzerinde Farsça, Arapça ve Türkçe hazinesi', icon: '🏛️' },
      { label: 'Konuşma İkizi', value: 'Günlük konuşmada Hintçe ile karşılıklı anlaşılır', icon: '🤝' },
      { label: 'Ulusal Dil', value: 'Pakistan İslam Cumhuriyeti', icon: '🇵🇰' },
      { label: 'Şiir Biçimleri', value: 'Gazel (غزل), Nazım ve Kavvali', icon: '📜' }
    ],
    historyTimeline: [
      {
        era: '13. Yüzyıl',
        title: 'Emîr Hüsrev Dehlevî ve Delhi Karargâhları',
        description: 'Mutasavvıf şair Emîr Hüsrev, Fars şiir imgelerini yerel Hindavî halk diliyle harmanlayarak erken dönem Urdu edebiyatının temellerini attı.',
        highlight: 'Urdu edebiyatının öncüsü'
      },
      {
        era: '18. – 19. Yüzyıl',
        title: 'Urdu Şiirinin Altın Çağı (Mîr ve Gâlib)',
        description: 'Mirza Esedullah Han Gâlib ve Mîr Takî Mîr, Delhi’deki Babür sarayını gazel sanatının dünya başkentine dönüştürerek aşkı, varoluşsal sorgulamaları ve tasavvufu eşsiz bir lirizmle işledi.',
        highlight: 'Mirza Gâlib’in ölümsüz beyitleri'
      },
      {
        era: '1947',
        title: 'Pakistan’ın Ulusal Dili',
        description: 'Urduca; Pencapça, Sindî, Peştuca ve Beluçça konuşulan farklı eyaletleri ortak bir çatı altında buluşturan birleştirici ulusal dil olarak seçildi.',
        highlight: 'Ulusal birliğin simgesi'
      }
    ],
    linguisticTraits: [
      {
        title: 'Eğimli Nestâlik Yazı Estetiği',
        description: 'Düz yatay çizgide ilerleyen standart Arap nesih yazısının aksine Urduca geleneksel olarak Nestâlik üslubuyla yazılır; her sözcük sağ üstten sol alta doğru süzülen ipek bir kumaş gibi zarifçe iner.',
        icon: '✒️',
        example: 'Nestâlik yazısında sözcükler satır boyunca çapraz bir akışla süzülür.'
      },
      {
        title: 'İncelikli Nezaket Kademeleri ve Tehzîb (Edep)',
        description: 'Urducada "sen / siz" hitabı üç ayrı incelik basamağına ayrılır: samimi "tu" (تو), nazik "tum" (تم) ve yüksek saygı bildiren "âp" (آپ); bunlara seçkin nezaket kalıpları eşlik eder.',
        icon: '🙇',
        example: 'آپ تشریف رکھیے (Lütfen teşrif edip buyurunuz, oturunuz)'
      }
    ],
    culturalNote: 'Urduca, Güney Asya genelinde romantizmin, incelikli saray görgüsünün (tehzîb) ve tasavvuf musikisinin en seçkin dili olarak el üstünde tutulur.'
  },

  id: {
    title: 'Birleştirici Dil: 17.000 Ada, Tek Bir Ortak Dil',
    tagline: '1928 yılındaki barışçıl bir gençlik andı, dünyanın en büyük takımadasındaki 700 etnik grubu nasıl tek yürek yaptı?',
    speakersCount: 'Toplam 300 Milyondan Fazla Konuşur',
    writingSystem: 'Latin Alfabesi (26 Harf, %100 Fonetik)',
    languageFamily: 'Avustronezya (Malay-Polinezya Kolu)',
    facts: [
      { label: '1928 Andı', value: 'Sumpah Pemuda (Birlik İçin Gençlik Andı)', icon: '🇮🇩' },
      { label: 'Dilbilgisi Yalınlığı', value: 'Fiil çekimi yok, zaman eki yok, cinsiyet ayrımı yok', icon: '✨' },
      { label: 'Çoğul Yapımı', value: 'Sözcük ikilemesi (anak-anak = çocuklar)', icon: '👶' },
      { label: 'Fonetik Yazım', value: 'Sözcükler tam olarak duyulduğu gibi yazılır', icon: '🔤' },
      { label: 'Temel Lehçe', value: 'Riau Malaycası (tarafsız deniz ticareti dili)', icon: '🚢' },
      { label: 'Alıntı Sözcükler', value: 'Sanskritçe, Arapça, Felemenkçe, Portekizce, Çince', icon: '🌏' }
    ],
    historyTimeline: [
      {
        era: '7. Yüzyıl',
        title: 'Deniz İpek Yolu ve Çarşı Malaycası (Melayu Pasar)',
        description: 'Bin yılı aşkın süre boyunca kıyı Malaycası; Baharat Adaları sultanlarını, Çinli denizcileri ve Arap tüccarları birbirine bağlayan tarafsız ticaret dili işlevini gördü.',
        highlight: 'Tarafsız deniz ticareti ortak dili'
      },
      {
        era: '28 Ekim 1928',
        title: 'Gençlik Andı (Sumpah Pemuda)',
        description: 'Genç Endonezyalı yurtseverler ileri görüşlü bir karar aldı: en kalabalık etnik grubun dili olan Cavacayı dayatmak yerine, 700 yerel dil arasında eşit kardeşliği sağlamak için tarafsız Malaycayı "Endonezce" adıyla benimsediler.',
        highlight: '"Tek Vatan, Tek Ulus, Tek Dil"'
      }
    ],
    linguisticTraits: [
      {
        title: 'Çoğul İçin İkileme (Redüplikasyon)',
        description: 'Endonezcede bir ismi çoğul yapmak için sözcüğü tireyle tekrarlamak yeterlidir! Anak çocuk demektir, anak-anak çocuklar olur; buku kitap, buku-buku ise kitaplar demektir.',
        icon: '🔁',
        example: 'Orang (insan, kişi) → orang-orang (insanlar)'
      },
      {
        title: 'Zengin Ek Sistemi (Me-, Di-, Ber-, Pe-)',
        description: 'Endonezcede fiil zaman çekimi bulunmasa da işlek ön ekler ve son ekler yalın kökleri etken fiillere, edilgen fiillere ve soyut isimlere dönüştürür.',
        icon: '🧩',
        example: 'Tulis (yaz kök) → menulis (yazmak) → ditulis (yazılır / yazıldı)'
      }
    ],
    culturalNote: 'Endonezce, dilbilimciler tarafından dünyada yeni başlayanların ilk günden itibaren konuşmaya başlayabileceği en erişilebilir dillerden biri kabul edilir.'
  },

  es: {
    title: 'Kastilya’dan Amerika Kıtalarına: İspanyolcanın Küresel Yolculuğu',
    tagline: 'Halk Latincesinden doğan, 700 yıllık Arapça etkisiyle zenginleşen ve 21 ülkede 500 milyonu aşkın insanın ana dili olan dil.',
    speakersCount: '500 Milyondan Fazla Ana Dil Konuşuru (Dünyada 2. Sırada)',
    writingSystem: 'İspanyol Latin Alfabesi (Ñ dâhil 27 Harf)',
    languageFamily: 'Hint-Avrupa (Romen Dilleri Kolu)',
    facts: [
      { label: 'Ana Dil Konuşuru', value: 'Dünyada En Çok Konuşulan 2. Ana Dil', icon: '🌎' },
      { label: 'Arapça Mirası', value: '4.000’den fazla Arapça kökenli sözcük (azúcar, alcalde, ojalá)', icon: '🕌' },
      { label: 'İlk Modern Dilbilgisi', value: 'Antonio de Nebrija (1492 yılı)', icon: '📖' },
      { label: 'Ters Noktalama', value: 'Cümle başında açılış ünlemi ¡ ve açılış soru işareti ¿', icon: '❓' },
      { label: 'Resmî Dil Olduğu Yerler', value: '4 Kıtada 21 Egemen Ülke', icon: '🏛️' },
      { label: 'Edebî Başyapıt', value: 'Miguel de Cervantes’in Don Kişot romanı', icon: '🛡️' }
    ],
    historyTimeline: [
      {
        era: 'MÖ yak. 200 – MS 400',
        title: 'Roma İspanyası ve Halk Latincesi',
        description: 'Romalı askerler, tüccarlar ve yöneticiler İber Yarımadası’na günlük konuşma Latincesini getirerek bölgedeki eski Kelt ve İber dillerinin yerini almasını sağladı.',
        highlight: 'İspanyolcanın Latince kökleri'
      },
      {
        era: 'MS 711 – 1492',
        title: 'Endülüs ve Arapça Söz Varlığı Mirası',
        description: 'Yaklaşık 800 yıl süren Endülüs İslam medeniyeti, İspanyolcaya çoğu Arapça "el-" (al-) tanımlığıyla başlayan binlerce bilim, tarım ve mimari terimi kazandırdı.',
        highlight: 'Günlük dilde yaşayan 4.000’den fazla Arapça kökenli sözcük'
      },
      {
        era: '1492',
        title: 'Nebrija’nın Dilbilgisi Kitabı ve Amerika Kıtalarına Açılım',
        description: 'Antonio de Nebrija, modern bir Avrupa halk dilinin ilk yazılı dilbilgisi kitabını yayımlayarak eseri Kraliçe İsabella’ya sundu.',
        highlight: 'Modern bir Avrupa halk dilinin ilk grameri'
      }
    ],
    linguisticTraits: [
      {
        title: 'Ters Noktalama İşaretleri (¿ ? ve ¡ !)',
        description: 'İspanyolca, cümlenin soru mu yoksa coşkulu bir ünlem mi olduğunu daha ilk kelimeden okura bildirmek için cümle başında ters soru ve ünlem işaretleri kullanan tek büyük dünya dilidir.',
        icon: '❓',
        example: '¿Cómo estás? (Nasılsın?) · ¡Qué bueno! (Ne güzel!)'
      },
      {
        title: 'Ser ve Estar ("Olmak" Fiilinin İki Farklı Yüzü)',
        description: 'İspanyolca kalıcı kimlik ve öz nitelikler (Ser) ile geçici durumlar ve konumları (Estar) birbirinden ayırır. Soy feliz "mutlu bir insanım", estoy feliz ise "şu anda mutluyum" anlamına gelir.',
        icon: '⚖️',
        example: 'Soy profesor (Meslek / Kimlik) ile Estoy cansado (Şu anki yorgunluk durumu)'
      }
    ],
    culturalNote: 'İspanyolca 21 bağımsız ülkede konuşulmakta olup her ülke bu ortak dile kendine özgü müzik gelenekleri, edebiyat devleri ve renkli deyimler katmaktadır.'
  },

  fr: {
    title: 'Aklın, Diplomasinin ve Frankofoni Dünyasının Dili',
    tagline: 'Uluslararası antlaşmaların, Aydınlanma felsefesinin ve dünya genelinde 320 milyonu aşkın insanın tarihsel dili.',
    speakersCount: 'Toplam 320 Milyondan Fazla Konuşur',
    writingSystem: 'Fransız Latin Alfabesi (26 Harf + Aksan İşaretleri)',
    languageFamily: 'Hint-Avrupa (Romen Dilleri Kolu)',
    facts: [
      { label: 'Küresel Konum', value: '29 ülkede resmî dil statüsü', icon: '🌍' },
      { label: 'Diplomasi Mirası', value: 'Uluslararası antlaşmaların geleneksel diplomasi dili', icon: '🕊️' },
      { label: 'Dilin Koruyucusu', value: 'Fransız Akademisi (1635’te Kardinal Richelieu tarafından kuruldu)', icon: '🏛️' },
      { label: 'Olimpiyat ve Posta', value: 'Uluslararası Olimpiyat Komitesi ve Dünya Posta Birliği resmî dili', icon: '🏅' },
      { label: 'Dilbilgisel Cinsiyet', value: '2 Cinsiyet (Eril ve Dişil)', icon: '⚖️' },
      { label: 'Ünlü Zenginliği', value: 'Genizsil (nazal) ünlüler (an, on, in, un)', icon: '🍷' }
    ],
    historyTimeline: [
      {
        era: 'MS 842',
        title: 'Strazburg Yeminleri (Serments de Strasbourg)',
        description: 'Şarlman’ın torunları tarafından edilen ve Klasik Latinceden ayrışmış erken bir Romen halk diliyle kaleme alınan günümüze ulaşmış en eski yazılı belgedir.',
        highlight: 'Belgelendirilmiş en eski Fransızca metin'
      },
      {
        era: '1539',
        title: 'Villers-Cotterêts Fermanı',
        description: 'Kral I. François tüm mahkeme kayıtlarında, yasalarda ve kraliyet fermanlarında kilise Latincesi yerine Fransızca kullanılmasını zorunlu kılarak birleşik Fransız devlet dilini tesis etti.',
        highlight: 'Fransızcanın resmî devlet dili ilan edilmesi'
      },
      {
        era: '18. Yüzyıl',
        title: 'Aydınlanma Çağı ve Avrupa’nın Ortak Kültür Dili',
        description: 'Fransızca; Avrupa saraylarının, diplomasinin ve Voltaire, Rousseau ile Diderot gibi Aydınlanma düşünürlerinin ortak entelektüel dili hâline geldi.',
        highlight: 'Küresel diplomasi ve felsefe dili'
      }
    ],
    linguisticTraits: [
      {
        title: 'Ulama (Liaison) ve Akıcı Ses Uyumu',
        description: 'Fransızca ses akıcılığına (öfoni) büyük önem verir. Normalde okunmayan kelime sonu ünsüzleri, ünlüyle başlayan bir sonraki sözcüğe bağlanarak ses kazanır (les amis → lez-ami).',
        icon: '🎶',
        example: 'C’est un ami (Okunuşu: se-tön-ami — "Bu bir arkadaştır")'
      },
      {
        title: 'Genizsil (Nazal) Ünlüler',
        description: 'Fransızcada havanın aynı anda hem ağız hem burun boşluğundan geçmesiyle oluşan kendine özgü genizsil ünlüler bulunur (pain, bon, vent, un).',
        icon: '👃',
        example: 'Bon (iyi) · Vin (şarap) · Temps (zaman / hava durumu)'
      }
    ],
    culturalNote: 'Bugün dünyada Fransızca konuşan nüfusun çoğunluğu Afrika kıtasında yaşamakta olup bu durum Fransızcayı 21. yüzyılın en hızlı büyüyen dillerinden biri yapmaktadır.'
  },

  de: {
    title: 'Şairlerin, Düşünürlerin ve Hassas Mühendisliğin Dili',
    tagline: 'Martin Luther’in İncil çevirisinden Einstein’ın fiziğine ve hayranlık uyandıran birleşik sözcüklere.',
    speakersCount: 'Toplam 130 Milyondan Fazla Konuşur',
    writingSystem: 'Alman Latin Alfabesi (26 Harf + ä, ö, ü, ß)',
    languageFamily: 'Hint-Avrupa (Batı Cermen Kolu)',
    facts: [
      { label: 'AB Birincisi', value: 'Avrupa Birliği’nde En Çok Konuşulan 1. Ana Dil', icon: '🇪🇺' },
      { label: 'Birleşik Sözcükler', value: 'Kesin kavramlar oluşturmak için uç uca eklenen kelimeler', icon: '🧩' },
      { label: 'İsmin Hâlleri', value: '4 Durum (Yalın, Belirtme, Yönelme, Tamlayan)', icon: '🏛️' },
      { label: 'Cinsiyet Sistemi', value: '3 Cinsiyet: Eril (der), Dişil (die), Nötr (das)', icon: '⚖️' },
      { label: 'Büyük Harf Kuralı', value: 'Yazıda bütün isimler cümle içinde büyük harfle başlar', icon: '🔠' },
      { label: 'Bilim ve Sanat Mirası', value: 'Goethe, Kant, Beethoven ve Einstein’ın dili', icon: '🔬' }
    ],
    historyTimeline: [
      {
        era: '6. – 8. Yüzyıl',
        title: 'Yüksek Almanca Ünsüz Kayması',
        description: 'Büyük bir ses değişimi Almancayı diğer Cermen kuzenlerinden (İngilizce ve Felemenkçe) ayırarak "t" seslerini "z/ss" seslerine dönüştürdü (İng. water "su" → Alm. Wasser, İng. two "iki" → Alm. zwei).',
        highlight: 'Ana Cermenceden ayrışma süreci'
      },
      {
        era: '1522',
        title: 'Martin Luther’in İncil Çevirisi',
        description: 'Martin Luther, Yeni Ahit’i canlı ve anlaşılır Saksonya elçilik lehçesine çevirerek yüzlerce dağınık yerel ağız arasından ortak bir ulusal Alman yazı standardının doğmasını sağladı.',
        highlight: 'Modern standart Yüksek Almancanın (Hochdeutsch) doğuşu'
      }
    ],
    linguisticTraits: [
      {
        title: 'Tüm İsimlerin Büyük Harfle Yazılması',
        description: 'Almanca, özel veya cins isim ayrımı olmaksızın her ismin büyük harfle başladığı tek büyük dünya dilidir; bu özellik cümledeki özneleri ve kavramları ilk bakışta seçmeyi kolaylaştırır.',
        icon: '🔠',
        example: 'Das Buch (Kitap) · Die Zeit (Zaman)'
      },
      {
        title: 'Efsanevi Birleşik Sözcükler',
        description: 'Almanca birden fazla ismi birleştirerek son derece net kavramlar üretebilir. Eldiven kelimesi kelimesine "el-ayakkabısı" (Handschuh), buzdolabı ise "serin-dolap" (Kühlschrank) demektir.',
        icon: '🧩',
        example: 'Kühlschrank ("Serin-dolap" = Buzdolabı)'
      }
    ],
    culturalNote: 'Almanca; Almanya, Avusturya ve İsviçre genelinde felsefenin, klasik müziğin ve ileri endüstriyel yeniliğin temel dilidir.'
  },

  pt: {
    title: 'Camões’in ve Açık Okyanus Yollarının Dili',
    tagline: 'Lizbon’dan Rio de Janeiro, Luanda ve Maputo’ya uzanan 4 kıtada yankılanan sıcak bir dil.',
    speakersCount: '260 Milyondan Fazla Ana Dil Konuşuru',
    writingSystem: 'Portekiz Latin Alfabesi (26 Harf + Aksan İşaretleri)',
    languageFamily: 'Hint-Avrupa (Romen Dilleri Kolu)',
    facts: [
      { label: 'Güney Yarımküre', value: 'Güney Yarımküre’de en çok konuşulan dil', icon: '🌎' },
      { label: 'Ulusal Şair', value: 'Luís de Camões (Os Lusíadas destanı, 1572)', icon: '📜' },
      { label: 'Genizsil Dalga İşareti', value: 'Müzikal geniz sesleri veren ünlü tilde (ã, õ) işareti', icon: '🎵' },
      { label: 'Dilbilgisel Cinsiyet', value: '2 Cinsiyet (-o ile biten Eril, -a ile biten Dişil)', icon: '⚖️' },
      { label: 'Saudade Kavramı', value: 'Tek sözcükle çevrilemeyen derin özlem ve tatlı hüzün', icon: '💖' },
      { label: 'En Büyük Nüfus', value: 'Tüm konuşurların yaklaşık %80’i Brezilya’da yaşar', icon: '🇧🇷' }
    ],
    historyTimeline: [
      {
        era: '9. – 12. Yüzyıl',
        title: 'Galiçyaca-Portekizce (Galego-Português)',
        description: 'İber Yarımadası’nın kuzeybatısında Halk Latincesinden gelişen Galiçyaca-Portekizce, Orta Çağ ozanlarının lirik şiirlerinde en seçkin sanat dili hâline geldi.',
        highlight: 'Orta Çağ lirik şiirinin altın çağı'
      },
      {
        era: '15. – 16. Yüzyıl',
        title: 'Coğrafi Keşifler Çağı ve Küresel Yayılım',
        description: 'Vasco da Gama gibi Portekizli denizciler dili okyanusların ötesine; Brezilya’ya, Afrika’ya (Angola, Mozambik), Hindistan’a (Goa) ve Makao’ya taşıdı.',
        highlight: 'Deniz aşırı küresel yayılım'
      }
    ],
    linguisticTraits: [
      {
        title: 'Tilde İşaretli Genizsil Ünlüler (ã, õ)',
        description: 'Tilde işareti başlangıçta Orta Çağ Latince el yazmalarında ünlü harfin üzerine küçültülerek yazılan bir "n" harfiydi (canção sözcüğü cantionem kökünden gelir). Portekizceye o sıcak ve hemen tanınan tınısını bu sesler verir.',
        icon: '🎵',
        example: 'Pão (Ekmek) · Não (Hayır) · Coração (Kalp)'
      },
      {
        title: 'Saudade: Dilin Ruhunu Taşıyan Sözcük',
        description: 'Dünyanın çevrilmesi en güç ve en zarif kelimelerinden biri sayılan saudade, uzaktaki sevilen birine veya geçmişteki güzel bir yere duyulan tatlı-buruk hasreti anlatır.',
        icon: '💖',
        example: 'Tenho saudades de você (Varlığına derin bir özlem duyuyorum)'
      }
    ],
    culturalNote: 'Portekizce, Portekizce Konuşan Ülkeler Topluluğu çatısı altında birleşen dokuz bağımsız ülkenin resmî dilidir.'
  },

  en: {
    title: 'Küresel Ortak Dil: Anglosakson Köklerden Dünya Çapında Ağa',
    tagline: 'Bir ada dilinin Latince, Eski İskandinavca ve Fransızcayı harmanlayarak dünyanın ortak iletişim diline dönüşme öyküsü.',
    speakersCount: 'Toplam 1,5 Milyardan Fazla Konuşur',
    writingSystem: 'İngiliz Latin Alfabesi (26 Harf)',
    languageFamily: 'Hint-Avrupa (Batı Cermen Kolu)',
    facts: [
      { label: 'Küresel Konum', value: 'Teknoloji, bilim ve havacılığın küresel ortak dili', icon: '🌐' },
      { label: 'Melez Söz Varlığı', value: '~%60 Latince/Fransızca kökler + ~%26 Cermen kökler', icon: '🧬' },
      { label: 'Toplam Sözcük', value: 'Oxford İngilizce Sözlüğü’nde 500.000’i aşkın madde başı', icon: '📚' },
      { label: 'Dilbilgisi Yalınlığı', value: 'İsimlerde cinsiyet ayrımı yok, çok az çekim eki var', icon: '✨' },
      { label: 'Yazım Kendine Özgülüğü', value: 'Sesler değişirken tarihsel yazılışlar korunmuştur', icon: '🎩' },
      { label: 'Dijital Dünya', value: 'Yazılımın, internetin ve kodlamanın birincil dili', icon: '💻' }
    ],
    historyTimeline: [
      {
        era: 'MS yak. 450',
        title: 'Eski İngilizce (Anglosakson ve Viking Etkileri)',
        description: 'Cermen boyları (Angluslar, Saksonlar, Jütler) Britanya’ya yerleşti. Ardından gelen Viking akınları Eski İskandinavcadan sky (gökyüzü), skin (deri), take (almak), they (onlar) ve give (vermek) gibi en temel günlük sözcükleri dile kattı.',
        highlight: 'Eski İngilizce destanı Beowulf'
      },
      {
        era: 'MS 1066',
        title: 'Norman Fethi ve Fransızca Sözcük Akını',
        description: 'Fatih William, Anglo-Norman Fransızcasını saray ve hukuk dili yaparak ünlü iki katmanlı söz varlığını doğurdu: çiftlikteki hayvanlar Cermen kökenli, sofradaki pişmiş etler ise Fransızca kökenli sözcüklerle anılır oldu (pig/pork — domuz/domuz eti, cow/beef — inek/sığır eti).',
        highlight: 'Fransızca ve Latince kelime hazinesinin patlaması'
      },
      {
        era: 'MS yak. 1600',
        title: 'Shakespeare ve Kral James İncili',
        description: 'William Shakespeare 1.700’den fazla yeni sözcük ve deyimi dile kazandırırken, Kral James İncili çevirisi modern İngilizcenin şiirsel ritmini kalıcılaştırdı.',
        highlight: 'Modern İngilizcenin yükselişi'
      }
    ],
    linguisticTraits: [
      {
        title: 'Çift Katmanlı Cermen ve Fransız Söz Varlığı',
        description: 'İngilizcede hemen her kavram için iki farklı sözcük bulunur: günlük hayattan gelen doğrudan bir Cermen sözcüğü ve daha resmî ya da seçkin bir Fransızca/Latince eş anlamlısı.',
        icon: '🧬',
        example: 'Ask "sormak" (Cermen) ile Inquire "soruşturmak" (Fransızca) · Kingly ile Royal ("kraliyete özgü")'
      },
      {
        title: 'İsimlerde Dilbilgisel Cinsiyetin Bulunmayışı',
        description: 'Almanca veya İspanyolcanın aksine İngilizce yüzyıllar önce isimlerdeki eril-dişil ayrımını bırakmıştır. Her isim için yalnızca tek bir tanımlık ("the") kullanılır!',
        icon: '✨',
        example: 'The sun (güneş), the moon (ay), the table (masa) — ezberlenecek cinsiyet ayrımı yoktur.'
      }
    ],
    culturalNote: 'İngilizce günümüzde küresel bilimin, sivil havacılığın, uluslararası ticaretin ve internet dünyasının tartışmasız ortak işletim dili konumundadır.'
  }
};
