#!/usr/bin/env python3
"""
Adds Chinese (zh) translations to:
  - src/utils/pageDictionary.ts
  - src/data/aboutTranslations.ts
  - src/data/legalTranslations.ts
"""

from pathlib import Path

ROOT = Path('/Users/johnbendfeldt/Documents/basic-language-school')

def patch_page_dictionary():
    path = ROOT / 'src' / 'utils' / 'pageDictionary.ts'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. subtitleByBase (phrases)
    old_sub_phrases = "      ja: 'カードをタップして翻訳と発音を確認できます',\n      ko: '카드를 탭하여 번역과 발음을 확인하세요'\n    };"
    new_sub_phrases = "      ja: 'カードをタップして翻訳と発音を確認できます',\n      ko: '카드를 탭하여 번역과 발음을 확인하세요',\n      zh: '点击卡片查看释义与标准发音'\n    };"
    c = c.replace(old_sub_phrases, new_sub_phrases)

    # 2. subtitleByBase (words)
    # The same block appears in phrases and words
    c = c.replace(old_sub_phrases, new_sub_phrases)

    # 3. getLocalizedAppName map
    # Add zh target to each base language
    c = c.replace("      ja: 'Базовый Японский',\n      ko: 'Базовый Корейский'\n    },",
                  "      ja: 'Базовый Японский',\n      ko: 'Базовый Корейский',\n      zh: 'Базовый Китайский'\n    },")
    c = c.replace("      ja: 'Japonés Básico',\n      ko: 'Coreano Básico'\n    },",
                  "      ja: 'Japonés Básico',\n      ko: 'Coreano Básico',\n      zh: 'Chino Básico'\n    },")
    c = c.replace("      ja: 'Japonais de Base',\n      ko: 'Coréen de Base'\n    },",
                  "      ja: 'Japonais de Base',\n      ko: 'Coréen de Base',\n      zh: 'Chinois de Base'\n    },")
    c = c.replace("      ja: 'Japonês Básico',\n      ko: 'Coreano Básico'\n    },",
                  "      ja: 'Japonês Básico',\n      ko: 'Coreano Básico',\n      zh: 'Chinês Básico'\n    },")
    c = c.replace("      ja: 'Basis-Japanisch',\n      ko: 'Basis-Koreanisch'\n    },",
                  "      ja: 'Basis-Japanisch',\n      ko: 'Basis-Koreanisch',\n      zh: 'Basis-Chinesisch'\n    },")
    c = c.replace("      ja: 'Bahasa Jepang Dasar',\n      ko: 'Bahasa Korea Dasar'\n    },",
                  "      ja: 'Bahasa Jepang Dasar',\n      ko: 'Bahasa Korea Dasar',\n      zh: 'Bahasa Mandarin Dasar'\n    },")
    c = c.replace("      ja: 'Temel Japonca',\n      ko: 'Temel Korece'\n    },",
                  "      ja: 'Temel Japonca',\n      ko: 'Temel Korece',\n      zh: 'Temel Çince'\n    },")
    c = c.replace("      ja: 'Basic Japanese',\n      ko: 'Basic Korean'\n    },",
                  "      ja: 'Basic Japanese',\n      ko: 'Basic Korean',\n      zh: 'Basic Chinese'\n    },")
    c = c.replace("      ja: 'ベーシック日本語',\n      ko: 'ベーシック韓国語'\n    },",
                  "      ja: 'ベーシック日本語',\n      ko: 'ベーシック韓国語',\n      zh: 'ベーシック中国語'\n    },")
    c = c.replace("      ja: '베이직 일본어',\n      ko: '베이직 한국어'\n    }\n  };",
                  "      ja: '베이직 일본어',\n      ko: '베이직 한국어',\n      zh: '베이직 중국어'\n    },\n    zh: {\n      en: '基础英语',\n      es: '基础西班牙语',\n      fr: '基础法语',\n      ru: '基础俄语',\n      pt: '基础葡萄牙语',\n      de: '基础德语',\n      id: '基础印尼语',\n      tr: '基础土耳其语',\n      ja: '基础日语',\n      ko: '基础韩语',\n      zh: '基础中文'\n    }\n  };")

    # 4. getLocalizedLanguageName map
    old_ko_map = "      ja: '일본어',\n      ko: '한국어',\n      zh: '중국어'\n    },\n    en: {}"
    new_ko_map = "      ja: '일본어',\n      ko: '한국어',\n      zh: '중국어'\n    },\n    zh: {\n      en: '英语',\n      es: '西班牙语',\n      fr: '法语',\n      ru: '俄语',\n      de: '德语',\n      it: '意大利语',\n      pt: '葡萄牙语',\n      id: '印尼语',\n      tr: '土耳其语',\n      ja: '日语',\n      ko: '韩语',\n      zh: '中文'\n    },\n    en: {}"
    c = c.replace(old_ko_map, new_ko_map)

    # 5. getQuizToolbarLabels
    old_toolbar = "    ko: { topic: '학습 주제', level: '난이도 수준', modality: '연습 모드', questionOf: (c, t) => `문제 ${c} / ${t}` },\n  };"
    new_toolbar = "    ko: { topic: '학습 주제', level: '난이도 수준', modality: '연습 모드', questionOf: (c, t) => `문제 ${c} / ${t}` },\n    zh: { topic: '课程主题', level: '熟练度等级', modality: '练习模式', questionOf: (c, t) => `第 ${c} 题 / 共 ${t} 题` },\n  };"
    c = c.replace(old_toolbar, new_toolbar)

    # 6. getComponentChromeStrings
    zh_chrome = """    case 'zh':
      return {
        installApp: '安装应用',
        installAppTitle: '安装应用到您的设备',
        loadingLessons: '正在加载课程...',
        allRightsReserved: '保留所有权利。',
        aboutContact: '关于与联系',
        privacyPolicy: '隐私政策',
        termsOfService: '服务条款',

        customizingBadge: '课程配置中',
        popularPairs: '热门语言对',
        chooseLanguageToLearn: '选择您想学习的语言',
        upcomingCourses: '即将推出',
        soonBadge: '即将上线',
        bidirectionalNotice: '双向母语教学 · 录音棚级母语发音',
        switchDirectionTitle: (baseName, targetName) =>
          `对调学习方向：学习 ${baseName}（母语：${targetName}）`,

        audioSpeedLabel: '语速调节',
        studioVoicePace: '录音棚语速',
        speedDesc05: '放慢发音，听清音节',
        speedDesc075: '初学者慢速',
        speedDesc1: '母语自然语速',
        speedDesc125: '流利快速听力',

        personalStudyDashboard: '个人学习面板',
        learningPair: '学习语言对',
        audioPlaybackSpeed: '音频播放速度',
        myLearningProgress: '我的学习进度',
        accountCloudSync: '账户与云同步',
        signOut: '退出登录',
        syncSignIn: '登录并同步',

        myStats: '学习统计',
        signIn: '登录',
        signOutTitle: '退出当前账户',
        progressModalTitle: '我的学习进度',
        overallAccuracy: '总体准确率',
        questionsAttempted: '已答题数',
        streak: '连续打卡',
        mastered: '已掌握',
        accuracyByCategory: '各分类准确率',
        alphabetCat: '字母拼音',
        phrasesCat: '基础短语',
        commonWordsCat: '核心词汇',
        numbersCat: '数字时间',
        correctOfTotal: (correct, total) => `答对 ${correct} / 共 ${total} 题`,
        syncPromoText: '想在所有设备间同步保存学习进度吗？',
        signInRegister: '登录 / 注册',
        resetAllStats: '重置所有统计',
        confirmResetStats: '确定要重置所有学习统计进度吗？',
        doneBtn: '完成'
      };
    case 'en':"""

    c = c.replace("    case 'en':", zh_chrome, 1)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("Patched src/utils/pageDictionary.ts")

def patch_about():
    path = ROOT / 'src' / 'data' / 'aboutTranslations.ts'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    zh_about = """  zh: {
    title: '关于与联系',
    subtitle: '面向所有人的免费、开放且易用的多语言教育平台。',
    backToPractice: '返回练习',
    backToPracticeAria: '返回练习课程',
    appOverviewTitle: '什么是 Basic Language School？',
    appOverviewParagraphs: [
      'Basic Language School 是一个交互式、自主进度的语言学习平台，旨在帮助零基础学习者自信地掌握语言基础。',
      '与将内容隐藏在付费墙、订阅计时器或体力红心背后的应用不同，Basic Language School 提供无广告、无付费墙的完整课程学习。'
    ],
    featuresTitle: '核心特性与架构',
    features: [
      {
        icon: '🌐',
        title: '覆盖全球核心语言',
        desc: '支持英语、西班牙语、法语、德语、俄语、葡萄牙语、印尼语、土耳其语、日语、韩语以及中文的双向自主学习。'
      },
      {
        icon: '🎧',
        title: '500+ 核心词汇与录音棚级母语发音',
        desc: '每个词汇和短语均配备标准微软神经网络原生离线音频，告别机械合成音。'
      },
      {
        icon: '📊',
        title: '间隔重复与自适应练习',
        desc: '具备打字输入、听力听写与多项选择模式，根据您的答题情况智能复习难点词汇。'
      }
    ],
    contactTitle: '联系与支持',
    contactParagraphs: [
      '如果您有任何建议、翻译勘误或合作意向，欢迎随时与我们联系。'
    ],
    contactNameLabel: '姓名：',
    contactEmailLabel: '邮箱：',
    contactBugsLabel: '问题反馈：',
    communityTitle: '开源社区',
    communityParagraphs: [
      '本项目代码在 GitHub 上完全开源，欢迎开发者共同维护与改进。'
    ],
    footerPrompt: '想了解我们如何保护您的数据？',
    privacyLinkText: '查看隐私政策',
    termsLinkText: '查看服务条款'
  }
};"""

    c = c.replace("  ko: {\n", f"{zh_about[:-2]},\n  ko: {{\n")
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("Patched src/data/aboutTranslations.ts")

def patch_legal():
    path = ROOT / 'src' / 'data' / 'legalTranslations.ts'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    zh_terms = """  zh: {
    title: '服务条款',
    lastUpdated: '最后更新日期：2026年10月',
    backToPractice: '返回练习',
    backToPracticeAria: '返回练习课程',
    sections: [
      {
        heading: '1. 条款接受',
        paragraphs: [
          '访问或使用 Basic Language School 即表示您同意受本服务条款的约束。'
        ]
      },
      {
        heading: '2. 服务说明',
        paragraphs: [
          'Basic Language School 是一个交互式语言学习网站，为全球学习者提供免费且开放的多语言基础课程。'
        ]
      },
      {
        heading: '3. 用户行为与账户',
        paragraphs: [
          '您可以以访客身份直接体验，也可以通过 Google 或 Microsoft 登录同步进度。请勿使用自动化程序或恶意机器人滥用服务。'
        ]
      },
      {
        heading: '4. 知识产权',
        paragraphs: [
          '本平台开源代码采用 MIT 许可证发布。'
        ]
      },
      {
        heading: '5. 免责声明',
        paragraphs: [
          '本平台按"原样"（AS IS）提供，不对服务的绝对完整性或无故障运行作任何明示或暗示的保证。'
        ]
      }
    ],
    contactHeading: '联系我们',
    contactIntro: '如对本条款有任何疑问，请联系我们：',
    footerPrompt: '想了解我们如何处理数据？ ',
    footerLink: '查看隐私政策'
  }
};"""

    c = c.replace("  ko: {\n", f"{zh_terms[:-2]},\n  ko: {{\n")

    zh_privacy = """  zh: {
    title: '隐私政策',
    lastUpdated: '最后更新日期：2026年10月',
    backToPractice: '返回练习',
    backToPracticeAria: '返回练习课程',
    summaryTitle: '简要说明',
    summaryText: '我们坚持默认保护隐私原则。Basic Language School 是一个教育学习平台。我们仅收集保存您的测验得分和学习进度所需的最基本信息。我们绝不出售您的数据，不投放任何第三方跟踪广告，您可以随时重置并删除本地数据。',
    sections: [
      {
        heading: '1. 我们收集的信息',
        paragraphs: [
          '我们通过两种方式处理学习数据：'
        ],
        listItems: [
          '访客用户（未登录）：若您直接使用应用，您的测验得分与打卡记录仅保存在您本地浏览器的 localStorage 中，不向任何外部服务器上传。',
          '注册用户（Google 或 Microsoft 登录）：若您选择登录跨设备同步，我们仅接收最基本的账户标识（邮箱与昵称）。',
          '学习记录：测验得分、掌握词汇数量与间隔复习表现。'
        ]
      },
      {
        heading: '2. 数据的存储与保护',
        paragraphs: [
          '所有数据传输均经过现代 TLS/HTTPS 加密保护。'
        ]
      },
      {
        heading: '3. 您的权利',
        paragraphs: [
          '您可以随时通过学习面板一键清除所有本地学习数据。'
        ]
      }
    ],
    contactHeading: '隐私咨询',
    contactIntro: '如对隐私保护有任何疑问，请联系我们：',
    footerPrompt: '想查看服务条款？ ',
    footerLink: '查看服务条款'
  }
};"""

    # For PRIVACY_TRANSLATIONS, insert zh before ko
    idx = c.find('export const PRIVACY_TRANSLATIONS')
    c_before = c[:idx]
    c_after = c[idx:]
    c_after = c_after.replace("  ko: {\n", f"{zh_privacy[:-2]},\n  ko: {{\n", 1)
    c = c_before + c_after

    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("Patched src/data/legalTranslations.ts")

if __name__ == '__main__':
    patch_page_dictionary()
    patch_about()
    patch_legal()
