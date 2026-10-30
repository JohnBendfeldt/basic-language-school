#!/usr/bin/env python3
"""
Replace placeholder items in Japanese and Korean commonWords with authentic native phrases,
pronunciations, and icons.
"""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / 'src' / 'data' / 'languages'

MAP_83 = [
    {
        "en_key": "i don't understand",
        "aliases": ["i don\\", "i don'", "i do not understand"],
        "ja": ("分かりません", "I don't understand", "wa-ka-ri-ma-sen", "General", "🤔"),
        "ko": ("이해하지 못해요", "I don't understand", "i-hae-ha-ji mot-hae-yo", "General", "🤔")
    },
    {
        "en_key": "one o'clock",
        "aliases": ["one o\\", "one o'"],
        "ja": ("一時", "One o'clock (1:00)", "i-chi-ji", "Hour", "🕐"),
        "ko": ("한 시", "One o'clock (1:00)", "han si", "Hour", "🕐")
    },
    {
        "en_key": "two o'clock",
        "aliases": ["two o\\", "two o'"],
        "ja": ("二時", "Two o'clock (2:00)", "ni-ji", "Hour", "🕑"),
        "ko": ("두 시", "Two o'clock (2:00)", "du si", "Hour", "🕑")
    },
    {
        "en_key": "three o'clock",
        "aliases": ["three o\\", "three o'"],
        "ja": ("三時", "Three o'clock (3:00)", "san-ji", "Hour", "🕒"),
        "ko": ("세 시", "Three o'clock (3:00)", "se si", "Hour", "🕒")
    },
    {
        "en_key": "exactly three o'clock",
        "aliases": ["exactly three o\\", "exactly three o'"],
        "ja": ("ちょうど三時", "Exactly three o'clock", "chou-do san-ji", "Time", "🕒"),
        "ko": ("정각 세 시", "Exactly three o'clock", "jeong-gak se si", "Time", "🕒")
    },
    {
        "en_key": "four o'clock",
        "aliases": ["four o\\", "four o'"],
        "ja": ("四時", "Four o'clock (4:00)", "yo-ji", "Hour", "🕓"),
        "ko": ("네 시", "Four o'clock (4:00)", "ne si", "Hour", "🕓")
    },
    {
        "en_key": "five o'clock",
        "aliases": ["five o\\", "five o'"],
        "ja": ("五時", "Five o'clock (5:00)", "go-ji", "Hour", "🕔"),
        "ko": ("다섯 시", "Five o'clock (5:00)", "da-seot si", "Hour", "🕔")
    },
    {
        "en_key": "six o'clock",
        "aliases": ["six o\\", "six o'"],
        "ja": ("六時", "Six o'clock (6:00)", "ro-ku-ji", "Hour", "🕕"),
        "ko": ("여섯 시", "Six o'clock (6:00)", "yeo-seot si", "Hour", "🕕")
    },
    {
        "en_key": "seven o'clock",
        "aliases": ["seven o\\", "seven o'"],
        "ja": ("七時", "Seven o'clock (7:00)", "shi-chi-ji", "Hour", "🕖"),
        "ko": ("일곱 시", "Seven o'clock (7:00)", "il-gop si", "Hour", "🕖")
    },
    {
        "en_key": "eight o'clock",
        "aliases": ["eight o\\", "eight o'"],
        "ja": ("八時", "Eight o'clock (8:00)", "ha-chi-ji", "Hour", "🕗"),
        "ko": ("여덟 시", "Eight o'clock (8:00)", "yeo-deol si", "Hour", "🕗")
    },
    {
        "en_key": "nine o'clock",
        "aliases": ["nine o\\", "nine o'"],
        "ja": ("九時", "Nine o'clock (9:00)", "ku-ji", "Hour", "🕘"),
        "ko": ("아홉 시", "Nine o'clock (9:00)", "a-hop si", "Hour", "🕘")
    },
    {
        "en_key": "ten o'clock",
        "aliases": ["ten o\\", "ten o'"],
        "ja": ("十時", "Ten o'clock (10:00)", "juu-ji", "Hour", "🕙"),
        "ko": ("열 시", "Ten o'clock (10:00)", "yeol si", "Hour", "🕙")
    },
    {
        "en_key": "eleven o'clock",
        "aliases": ["eleven o\\", "eleven o'"],
        "ja": ("十一時", "Eleven o'clock (11:00)", "juu-i-chi-ji", "Hour", "🕚"),
        "ko": ("열한 시", "Eleven o'clock (11:00)", "yeol-han si", "Hour", "🕚")
    },
    {
        "en_key": "twelve o'clock",
        "aliases": ["twelve o\\", "twelve o'"],
        "ja": ("十二時", "Twelve o'clock (12:00)", "juu-ni-ji", "Hour", "🕛"),
        "ko": ("열두 시", "Twelve o'clock (12:00)", "yeol-du si", "Hour", "🕛")
    },
    {
        "en_key": "half past two (2:30)",
        "aliases": ["half past two (2:30)"],
        "ja": ("二時半 (2:30)", "Half past two (2:30)", "ni-ji-han", "Time", "🕧"),
        "ko": ("두 시 반 (2:30)", "Half past two (2:30)", "du si ban", "Time", "🕧")
    },
    {
        "en_key": "quarter to three (2:45)",
        "aliases": ["quarter to three (2:45)"],
        "ja": ("三時十五分前 (2:45)", "Quarter to three (2:45)", "san-ji juu-go-fun mae", "Time", "🕒"),
        "ko": ("세 시 15분 전 (2:45)", "Quarter to three (2:45)", "se si sip-o-bun jeon", "Time", "🕒")
    },
    {
        "en_key": "half past twelve (12:30)",
        "aliases": ["half past twelve (12:30)"],
        "ja": ("十二時半 (12:30)", "Half past twelve (12:30)", "juu-ni-ji-han", "Time", "🕧"),
        "ko": ("열두 시 반 (12:30)", "Half past twelve (12:30)", "yeol-du si ban", "Time", "🕧")
    },
    {
        "en_key": "ten to two (1:50)",
        "aliases": ["ten to two (1:50)"],
        "ja": ("二時十分前 (1:50)", "Ten to two (1:50)", "ni-ji jup-pun mae", "Time", "🕑"),
        "ko": ("두 시 10분 전 (1:50)", "Ten to two (1:50)", "du si sip-pun jeon", "Time", "🕑")
    },
    {
        "en_key": "it is three o'clock",
        "aliases": ["it is three o\\", "it is three o'"],
        "ja": ("三時です", "It is three o'clock", "san-ji desu", "Time", "🕒"),
        "ko": ("세 시입니다", "It is three o'clock", "se si-im-ni-da", "Time", "🕒")
    },
    {
        "en_key": "it is four o'clock",
        "aliases": ["it is four o\\", "it is four o'"],
        "ja": ("四時です", "It is four o'clock", "yo-ji desu", "Time", "🕓"),
        "ko": ("네 시입니다", "It is four o'clock", "ne si-im-ni-da", "Time", "🕓")
    },
    {
        "en_key": "it is five o'clock",
        "aliases": ["it is five o\\", "it is five o'"],
        "ja": ("五時です", "It is five o'clock", "go-ji desu", "Time", "🕔"),
        "ko": ("다섯 시입니다", "It is five o'clock", "da-seot si-im-ni-da", "Time", "🕔")
    },
    {
        "en_key": "it is six o'clock",
        "aliases": ["it is six o\\", "it is six o'"],
        "ja": ("六時です", "It is six o'clock", "ro-ku-ji desu", "Time", "🕕"),
        "ko": ("여섯 시입니다", "It is six o'clock", "yeo-seot si-im-ni-da", "Time", "🕕")
    },
    {
        "en_key": "it is seven o'clock",
        "aliases": ["it is seven o\\", "it is seven o'"],
        "ja": ("七時です", "It is seven o'clock", "shi-chi-ji desu", "Time", "🕖"),
        "ko": ("일곱 시입니다", "It is seven o'clock", "il-gop si-im-ni-da", "Time", "🕖")
    },
    {
        "en_key": "it is eight o'clock",
        "aliases": ["it is eight o\\", "it is eight o'"],
        "ja": ("八時です", "It is eight o'clock", "ha-chi-ji desu", "Time", "🕗"),
        "ko": ("여덟 시입니다", "It is eight o'clock", "yeo-deol si-im-ni-da", "Time", "🕗")
    },
    {
        "en_key": "it is nine o'clock",
        "aliases": ["it is nine o\\", "it is nine o'"],
        "ja": ("九時です", "It is nine o'clock", "ku-ji desu", "Time", "🕘"),
        "ko": ("아홉 시입니다", "It is nine o'clock", "a-hop si-im-ni-da", "Time", "🕘")
    },
    {
        "en_key": "it is ten o'clock",
        "aliases": ["it is ten o\\", "it is ten o'"],
        "ja": ("十時です", "It is ten o'clock", "juu-ji desu", "Time", "🕙"),
        "ko": ("열 시입니다", "It is ten o'clock", "yeol si-im-ni-da", "Time", "🕙")
    },
    {
        "en_key": "it is eleven o'clock",
        "aliases": ["it is eleven o\\", "it is eleven o'"],
        "ja": ("十一時です", "It is eleven o'clock", "juu-i-chi-ji desu", "Time", "🕚"),
        "ko": ("열한 시입니다", "It is eleven o'clock", "yeol-han si-im-ni-da", "Time", "🕚")
    },
    {
        "en_key": "zero",
        "aliases": ["zero"],
        "ja": ("ゼロ / 零", "Zero (0)", "ze-ro", "Numbers", "0️⃣"),
        "ko": ("영 / 제로", "Zero (0)", "yeong", "Numbers", "0️⃣")
    },
    {
        "en_key": "love",
        "aliases": ["love"],
        "ja": ("愛", "Love", "a-i", "General", "❤️"),
        "ko": ("사랑", "Love", "sa-rang", "General", "❤️")
    },
    {
        "en_key": "island",
        "aliases": ["island"],
        "ja": ("島", "Island", "shi-ma", "Places", "🏝️"),
        "ko": ("섬", "Island", "seom", "Places", "🏝️")
    },
    {
        "en_key": "kilogram",
        "aliases": ["kilogram"],
        "ja": ("キログラム", "Kilogram", "ki-ro-gu-ra-mu", "General", "⚖️"),
        "ko": ("킬로그램", "Kilogram", "kil-lo-geu-raem", "General", "⚖️")
    },
    {
        "en_key": "web",
        "aliases": ["web"],
        "ja": ("ウェブ / インターネット", "Web / Internet", "we-bu", "Tech", "🌐"),
        "ko": ("웹 / 인터넷", "Web / Internet", "wep", "Tech", "🌐")
    },
    {
        "en_key": "success",
        "aliases": ["success"],
        "ja": ("成功", "Success", "sei-kou", "General", "🏆"),
        "ko": ("성공", "Success", "seong-gong", "General", "🏆")
    },
    {
        "en_key": "yolk",
        "aliases": ["yolk"],
        "ja": ("黄身 / 卵黄", "Yolk", "ki-mi", "Food", "🍳"),
        "ko": ("노른자", "Yolk", "no-reun-ja", "Food", "🍳")
    },
    {
        "en_key": "shoe",
        "aliases": ["shoe"],
        "ja": ("靴", "Shoe", "ku-tsu", "Clothing", "👞"),
        "ko": ("신발 / 구두", "Shoe", "sin-bal", "Clothing", "👞")
    },
    {
        "en_key": "hello (formal)",
        "aliases": ["hello (formal)"],
        "ja": ("こんにちは", "Hello (formal)", "kon-ni-chi-wa", "Greetings", "👋"),
        "ko": ("안녕하십니까", "Hello (formal)", "an-nyeong-ha-sip-ni-kka", "Greetings", "👋")
    },
    {
        "en_key": "good afternoon",
        "aliases": ["good afternoon"],
        "ja": ("こんにちは", "Good afternoon", "kon-ni-chi-wa", "Greetings", "☀️"),
        "ko": ("좋은 오후입니다", "Good afternoon", "jo-eun o-hu-im-ni-da", "Greetings", "☀️")
    },
    {
        "en_key": "very well, thank you",
        "aliases": ["very well, thank you"],
        "ja": ("とても元気です、ありがとう", "Very well, thank you", "to-te-mo gen-ki desu", "Greetings", "😊"),
        "ko": ("아주 잘 지내요, 감사합니다", "Very well, thank you", "a-ju jal ji-nae-yo", "Greetings", "😊")
    },
    {
        "en_key": "you are welcome",
        "aliases": ["you are welcome", "you\\", "you'"],
        "ja": ("どういたしまして", "You are welcome", "dou-i-ta-shi-ma-shi-te", "Courtesy", "🙏"),
        "ko": ("천만에요", "You are welcome", "cheon-man-e-yo", "Courtesy", "🙏")
    },
    {
        "en_key": "i am sorry",
        "aliases": ["i am sorry"],
        "ja": ("申し訳ありません", "I am sorry", "mou-shi-wa-ke a-ri-ma-sen", "Courtesy", "🙇"),
        "ko": ("죄송합니다", "I am sorry", "joe-song-ham-ni-da", "Courtesy", "🙇")
    },
    {
        "en_key": "have a great day",
        "aliases": ["have a great day"],
        "ja": ("よい一日を", "Have a great day", "yo-i ichi-nichi o", "Courtesy", "✨"),
        "ko": ("좋은 하루 되세요", "Have a great day", "jo-eun ha-ru doe-se-yo", "Courtesy", "✨")
    },
    {
        "en_key": "could you repeat that, please?",
        "aliases": ["could you repeat that, please?", "can you repeat, please?"],
        "ja": ("もう一度言っていただけますか？", "Could you repeat that, please?", "mou ichi-do it-te ku-da-sai", "Essentials", "🔄"),
        "ko": ("다시 한 번 말씀해 주시겠어요?", "Could you repeat that, please?", "da-si han beon mal-sseum-hae ju-si-get-seo-yo?", "Essentials", "🔄")
    },
    {
        "en_key": "do you speak english?",
        "aliases": ["do you speak english?"],
        "ja": ("英語を話せますか？", "Do you speak English?", "ei-go o ha-na-se-masu ka?", "Essentials", "🗣️"),
        "ko": ("영어 할 수 있으세요?", "Do you speak English?", "yeong-eo hal su it-eu-se-yo?", "Essentials", "🗣️")
    },
    {
        "en_key": "where is the restroom?",
        "aliases": ["where is the restroom?", "where is the bathroom?", "where are the restrooms?"],
        "ja": ("お手洗いはどこですか？", "Where is the restroom?", "o-te-a-ra-i wa do-ko desu ka?", "Places", "🚻"),
        "ko": ("화장실이 어디예요?", "Where is the restroom?", "hwa-jang-sil-i eo-di-ye-yo?", "Places", "🚻")
    },
    {
        "en_key": "where is the train station?",
        "aliases": ["where is the train station?"],
        "ja": ("駅はどこですか？", "Where is the train station?", "e-ki wa do-ko desu ka?", "Places", "🚉"),
        "ko": ("기차역이 어디예요?", "Where is the train station?", "gi-cha-yeok-i eo-di-ye-yo?", "Places", "🚉")
    },
    {
        "en_key": "i need a taxi",
        "aliases": ["i need a taxi"],
        "ja": ("タクシーが必要です", "I need a taxi", "ta-ku-shii ga hit-su-you desu", "Travel", "🚕"),
        "ko": ("택시가 필요해요", "I need a taxi", "taek-si-ga pil-yo-hae-yo", "Travel", "🚕")
    },
    {
        "en_key": "a table for two, please",
        "aliases": ["a table for two, please"],
        "ja": ("二人用の席をお願いします", "A table for two, please", "fu-ta-ri-you no se-ki o o-ne-gai-shi-masu", "Dining", "🍽️"),
        "ko": ("두 명 자리 부탁합니다", "A table for two, please", "du myeong ja-ri bu-tak-ham-ni-da", "Dining", "🍽️")
    },
    {
        "en_key": "the menu, please",
        "aliases": ["the menu, please"],
        "ja": ("メニューをお願いします", "The menu, please", "me-nyuu o o-ne-gai-shi-masu", "Dining", "📖"),
        "ko": ("메뉴판 주세요", "The menu, please", "me-nyu-pan ju-se-yo", "Dining", "📖")
    },
    {
        "en_key": "can i have the check, please?",
        "aliases": ["can i have the check, please?", "the check, please"],
        "ja": ("お会計をお願いします", "The check, please", "o-kai-kei o o-ne-gai-shi-masu", "Dining", "🧾"),
        "ko": ("계산서 주세요", "The check, please", "gye-san-seo ju-se-yo", "Dining", "🧾")
    },
    {
        "en_key": "how much does it cost?",
        "aliases": ["how much does it cost?"],
        "ja": ("いくらですか？", "How much does it cost?", "i-ku-ra desu ka?", "Shopping", "💰"),
        "ko": ("얼마인가요?", "How much does it cost?", "eol-ma-in-ga-yo?", "Shopping", "💰")
    },
    {
        "en_key": "do you accept credit cards?",
        "aliases": ["do you accept credit cards?"],
        "ja": ("クレジットカードは使えますか？", "Do you accept credit cards?", "ku-re-jit-to kaa-do wa tsu-ka-e-masu ka?", "Shopping", "💳"),
        "ko": ("신용카드 결제 되나요?", "Do you accept credit cards?", "sin-yong-ka-deu gyeol-je doe-na-yo?", "Shopping", "💳")
    },
    {
        "en_key": "it is too expensive",
        "aliases": ["it is too expensive"],
        "ja": ("高すぎます", "It is too expensive", "ta-ka-su-gi-masu", "Shopping", "💸"),
        "ko": ("너무 비싸요", "It is too expensive", "neo-mu bi-ssa-yo", "Shopping", "💸")
    },
    {
        "en_key": "i need a doctor",
        "aliases": ["i need a doctor"],
        "ja": ("医者が必要です", "I need a doctor", "i-sha ga hit-su-you desu", "Health", "👨‍⚕️"),
        "ko": ("의사가 필요해요", "I need a doctor", "ui-sa-ga pil-yo-hae-yo", "Health", "👨‍⚕️")
    },
    {
        "en_key": "what time is it?",
        "aliases": ["what time is it?"],
        "ja": ("今何時ですか？", "What time is it?", "i-ma nan-ji desu ka?", "Time", "⌚"),
        "ko": ("지금 몇 시인가요?", "What time is it?", "ji-geum myeot si-in-ga-yo?", "Time", "⌚")
    },
    {
        "en_key": "it is 1:00 sharp",
        "aliases": ["it is 1:00 sharp"],
        "ja": ("ちょうど一時です", "It is 1:00 sharp", "chou-do i-chi-ji desu", "Time", "🕐"),
        "ko": ("정각 한 시입니다", "It is 1:00 sharp", "jeong-gak han si-im-ni-da", "Time", "🕐")
    },
    {
        "en_key": "3:30 (half past three)",
        "aliases": ["3:30 (half past three)"],
        "ja": ("三時半 (3:30)", "3:30 (half past three)", "san-ji-han", "Time", "🕞"),
        "ko": ("세 시 반 (3:30)", "3:30 (half past three)", "se si ban", "Time", "🕞")
    },
    {
        "en_key": "4:15 (quarter past four)",
        "aliases": ["4:15 (quarter past four)"],
        "ja": ("四時十五分 (4:15)", "4:15 (quarter past four)", "yo-ji juu-go-fun", "Time", "🕓"),
        "ko": ("네 시 15분 (4:15)", "4:15 (quarter past four)", "ne si sip-o-bun", "Time", "🕓")
    },
    {
        "en_key": "4:45 (quarter to five)",
        "aliases": ["4:45 (quarter to five)"],
        "ja": ("五時十五分前 (4:45)", "4:45 (quarter to five)", "go-ji juu-go-fun mae", "Time", "🕔"),
        "ko": ("다섯 시 15분 전 (4:45)", "4:45 (quarter to five)", "da-seot si sip-o-bun jeon", "Time", "🕔")
    },
    {
        "en_key": "in the evening (p.m.)",
        "aliases": ["in the evening (p.m.)"],
        "ja": ("夕方に / 午後に", "In the evening (p.m.)", "yuu-ga-ta ni", "Time", "🌆"),
        "ko": ("저녁에 (p.m.)", "In the evening (p.m.)", "jeo-nyeok-e", "Time", "🌆")
    },
    {
        "en_key": "noon / midday",
        "aliases": ["noon / midday"],
        "ja": ("正午", "Noon / Midday", "shou-go", "Time", "🕛"),
        "ko": ("정오 / 낮 12시", "Noon / Midday", "jeong-o", "Time", "🕛")
    },
    {
        "en_key": "midnight",
        "aliases": ["midnight"],
        "ja": ("真夜中 / 午前0時", "Midnight", "ma-yo-na-ka", "Time", "🌙"),
        "ko": ("자정 / 밤 12시", "Midnight", "ja-jeong", "Time", "🌙")
    },
    {
        "en_key": "hello! / hi!",
        "aliases": ["hello! / hi!"],
        "ja": ("やあ！ / こんにちは！", "Hello! / Hi!", "yaa! / kon-ni-chi-wa!", "Greetings", "👋"),
        "ko": ("안녕! / 안녕하세요!", "Hello! / Hi!", "an-nyeong! / an-nyeong-ha-se-yo!", "Greetings", "👋")
    },
    {
        "en_key": "how are you? (formal)",
        "aliases": ["how are you? (formal)"],
        "ja": ("いかがお過ごしですか？", "How are you? (formal)", "i-ka-ga o-su-go-shi desu ka?", "Greetings", "🤝"),
        "ko": ("어떻게 지내십니까?", "How are you? (formal)", "eo-tteo-ke ji-nae-sip-ni-kka?", "Greetings", "🤝")
    },
    {
        "en_key": "i am doing well, thank you",
        "aliases": ["i am doing well, thank you"],
        "ja": ("元気にしております、ありがとうございます", "I am doing well, thank you", "gen-ki ni shi-te o-ri-masu", "Greetings", "😊"),
        "ko": ("잘 지내고 있습니다, 감사합니다", "I am doing well, thank you", "jal ji-nae-go it-seum-ni-da", "Greetings", "😊")
    },
    {
        "en_key": "pleased to meet you",
        "aliases": ["pleased to meet you"],
        "ja": ("お会いできて光栄です", "Pleased to meet you", "o-ai de-ki-te kou-ei desu", "Greetings", "🤝"),
        "ko": ("만나 뵙게 되어 반갑습니다", "Pleased to meet you", "man-na boep-ge doe-eo ban-gap-seum-ni-da", "Greetings", "🤝")
    },
    {
        "en_key": "one hundred",
        "aliases": ["one hundred"],
        "ja": ("百 (100)", "One hundred (100)", "hya-ku", "Numbers", "💯"),
        "ko": ("백 (100)", "One hundred (100)", "baek", "Numbers", "💯")
    },
    {
        "en_key": "one thousand",
        "aliases": ["one thousand"],
        "ja": ("千 (1000)", "One thousand (1000)", "sen", "Numbers", "🔢"),
        "ko": ("천 (1000)", "One thousand (1000)", "cheon", "Numbers", "🔢")
    },
    {
        "en_key": "could you speak slower, please?",
        "aliases": ["could you speak slower, please?"],
        "ja": ("もう少しゆっくり話していただけますか？", "Could you speak slower, please?", "mou su-ko-shi yuk-ku-ri", "Essentials", "🐢"),
        "ko": ("조금 더 천천히 말씀해 주시겠어요?", "Could you speak slower, please?", "jo-geum deo cheon-cheon-hi", "Essentials", "🐢")
    },
    {
        "en_key": "can you hear me?",
        "aliases": ["can you hear me?"],
        "ja": ("聞こえますか？", "Can you hear me?", "ki-ko-e-masu ka?", "Tech", "👂"),
        "ko": ("제 말이 들리시나요?", "Can you hear me?", "je mal-i deul-li-si-na-yo?", "Tech", "👂")
    },
    {
        "en_key": "can you see my screen?",
        "aliases": ["can you see my screen?"],
        "ja": ("画面は見えますか？", "Can you see my screen?", "ga-men wa mi-e-masu ka?", "Tech", "🖥️"),
        "ko": ("제 화면이 보이시나요?", "Can you see my screen?", "je hwa-myeon-i bo-i-si-na-yo?", "Tech", "🖥️")
    },
    {
        "en_key": "what is the wi-fi password?",
        "aliases": ["what is the wi-fi password?"],
        "ja": ("Wi-Fiのパスワードは何ですか？", "What is the Wi-Fi password?", "wai-fai no pa-su-waa-do wa nan desu ka?", "Tech", "📶"),
        "ko": ("와이파이 비밀번호가 무엇인가요?", "What is the Wi-Fi password?", "wa-i-pa-i bi-mil-beon-ho-ga mu-eot-in-ga-yo?", "Tech", "📶")
    },
    {
        "en_key": "let's schedule a meeting",
        "aliases": ["let\\", "let'", "let's schedule a meeting"],
        "ja": ("会議の予定を立てましょう", "Let's schedule a meeting", "kai-gi no yo-tei o ta-te-ma-shou", "Business", "📅"),
        "ko": ("회의 일정을 잡읍시다", "Let's schedule a meeting", "hoe-ui il-jeong-eul jab-eup-si-da", "Business", "📅")
    },
    {
        "en_key": "i will send you an email",
        "aliases": ["i will send you an email"],
        "ja": ("メールをお送りします", "I will send you an email", "mee-ru o o-o-ku-ri shi-masu", "Business", "📧"),
        "ko": ("이메일을 보내드리겠습니다", "I will send you an email", "i-me-il-eul bo-nae-deu-ri-get-seum-ni-da", "Business", "📧")
    },
    {
        "en_key": "when is the deadline?",
        "aliases": ["when is the deadline?"],
        "ja": ("締め切りはいつですか？", "When is the deadline?", "shi-me-ki-ri wa i-tsu desu ka?", "Business", "⏰"),
        "ko": ("마감일이 언제인가요?", "When is the deadline?", "ma-gam-il-i eon-je-in-ga-yo?", "Business", "⏰")
    },
    {
        "en_key": "where is the nearest pharmacy?",
        "aliases": ["where is the nearest pharmacy?"],
        "ja": ("一番近い薬局はどこですか？", "Where is the nearest pharmacy?", "ichi-ban chi-kai yak-kyo-ku wa do-ko desu ka?", "Health", "💊"),
        "ko": ("가장 가까운 약국이 어디인가요?", "Where is the nearest pharmacy?", "ga-jang ga-kka-un yak-guk-i eo-di-in-ga-yo?", "Health", "💊")
    },
    {
        "en_key": "i am allergic to nuts",
        "aliases": ["i am allergic to nuts"],
        "ja": ("ナッツアレルギーがあります", "I am allergic to nuts", "nat-tsu a-re-ru-gii ga a-ri-masu", "Health", "🥜"),
        "ko": ("견과류 알레르기가 있어요", "I am allergic to nuts", "gyeon-gwa-ryu al-le-reu-gi-ga it-seo-yo", "Health", "🥜")
    },
    {
        "en_key": "i have a reservation",
        "aliases": ["i have a reservation"],
        "ja": ("予約をしています", "I have a reservation", "yo-ya-ku o shi-te i-masu", "Dining", "🛎️"),
        "ko": ("예약했습니다", "I have a reservation", "ye-yak-haet-seum-ni-da", "Dining", "🛎️")
    }
]

def main():
    lookup = {}
    for entry in MAP_83:
        for al in entry["aliases"]:
            lookup[al.lower().strip()] = entry
        lookup[entry["en_key"].lower().strip()] = entry

    for lang in ['ja', 'ko']:
        p = next(DATA_DIR.glob(f'{lang}/*Data.ts'))
        lines = p.read_text(encoding='utf-8').splitlines()
        
        new_lines = []
        replaced_count = 0
        in_cw = False
        
        for line in lines:
            if 'const commonWords' in line:
                in_cw = True
            elif in_cw and line.strip().startswith('];'):
                in_cw = False

            if in_cw:
                matched_entry = None
                line_lower = line.lower()
                for alias, entry in lookup.items():
                    if f"'{alias}'" in line_lower or f'"{alias}"' in line_lower or f": '{alias}" in line_lower or f': "{alias}' in line_lower:
                        matched_entry = entry
                        break
                    if "phrase: 'let\\'" in line_lower or "translation: 'let\\'" in line_lower:
                        matched_entry = lookup["let's schedule a meeting"]
                        break
                    if "phrase: 'i don\\'" in line_lower or "translation: 'i don\\'" in line_lower:
                        matched_entry = lookup["i don't understand"]
                        break
                    if "phrase: 'you\\'" in line_lower or "translation: 'you\\'" in line_lower:
                        matched_entry = lookup["you are welcome"]
                        break

                if matched_entry:
                    ph, tr, pron, cat, ic = matched_entry[lang]
                    tr_esc = tr.replace("'", "\\'")
                    ph_esc = ph.replace("'", "\\'")
                    pron_esc = pron.replace("'", "\\'")
                    new_line = f"  {{ phrase: '{ph_esc}', translation: '{tr_esc}', pronunciation: '{pron_esc}', category: '{cat}', icon: '{ic}' }},"
                    new_lines.append(new_line)
                    replaced_count += 1
                    continue

            new_lines.append(line)

        out_txt = "\n".join(new_lines) + "\n"
        out_txt = re.sub(r",\s*\n\];", "\n];", out_txt)
        p.write_text(out_txt, encoding='utf-8')
        print(f"[{lang}] Successfully replaced {replaced_count} placeholder items with authentic vocabulary.")

if __name__ == '__main__':
    main()
