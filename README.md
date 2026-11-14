# 🌐 Basic Language School

An interactive, high-performance multi-language learning platform offering **15 world languages** across **210 bidirectional language pairs**, featuring **14,500+ studio-quality neural audio recordings**, adaptive spaced-repetition quizzes, interactive grammar & flashcards, **8 non-Latin phonetic virtual keyboards**, single-file offline audio binary packs, and Progressive Web App (PWA) support.

[![React](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-1%2C565_Passing-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-21_E2E_Passing-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20Postgres-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Edge TTS](https://img.shields.io/badge/Audio-Edge%20Neural%20TTS-0078D4?style=for-the-badge&logo=microsoft&logoColor=white)](https://github.com/rany2/edge-tts)
[![PWA](https://img.shields.io/badge/PWA-Offline%20Ready-f59e0b?style=for-the-badge&logo=pwa&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![Hosted on Netlify](https://img.shields.io/badge/Hosted%20on-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://basiclanguage.school)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 🌟 Overview

**Basic Language School** (`basiclanguage.school`) unifies foundational world language education into a single streamlined, ad-free web application. Learn any of **15 major world languages** directly from any of the 15 supported base interface languages (**210 bidirectional learning directions**) with zero paywalls, shared authentication, cross-course progress tracking, and zero-latency studio neural audio.

### 📚 Supported Languages (All 15 Live · 210 Bidirectional Pairs)

| Code | Language | Native Script | Curriculum Scope | Neural Voice Model |
| :---: | :--- | :--- | :--- | :--- |
| `en` | **English** | Latin | Phonics A–Z, phrases, numbers & time, 500+ words, grammar & quiz | `en-US-JennyNeural` |
| `es` | **Spanish** | Latin | Alphabet (`ñ`), phrases, numbers & time, 500+ words, grammar & quiz | `es-MX-JorgeNeural` |
| `fr` | **French** | Latin | Alphabet, liaisons & nasal vowels, phrases, numbers, 500+ words, grammar | `fr-FR-HenriNeural` |
| `de` | **German** | Latin | Alphabet (`ä, ö, ü, ß`), cases & genders, phrases, numbers, 500+ words | `de-DE-ConradNeural` |
| `pt` | **Portuguese** | Latin | Alphabet (`ç`, accents), phrases, numbers & time, 500+ words, grammar | `pt-BR-AntonioNeural` |
| `id` | **Indonesian** | Latin | Alphabet phonetics, phrases, numbers & time, 500+ words, grammar | `id-ID-ArdiNeural` |
| `tr` | **Turkish** | Latin | Alphabet (`ç, ğ, ı, i, ö, ş, ü`), phrases, numbers, 500+ words, grammar | `tr-TR-AhmetNeural` |
| `ru` | **Russian** | Cyrillic | 33 Cyrillic letters, phonetic keyboard, phrases, numbers, 500+ words, grammar | `ru-RU-SvetlanaNeural` |
| `zh` | **Mandarin Chinese** | Hanzi & Pinyin | Pinyin & 4-tone guide, Hanzi basics, phonetic IME, phrases, 500+ words | `zh-CN-XiaoxiaoNeural` |
| `ja` | **Japanese** | Hiragana / Katakana | Kana charts, phonetic keyboard, phrases, numbers, 500+ words, grammar | `ja-JP-NanamiNeural` |
| `ko` | **Korean** | Hangul | Jamo syllable blocks, phonetic keyboard, phrases, numbers, 500+ words | `ko-KR-InJoonNeural` |
| `hi` | **Hindi** | Devanagari | Vowels & consonants, phonetic keyboard, phrases, numbers, 500+ words | `hi-IN-SwaraNeural` |
| `ar` | **Arabic** | Arabic (RTL) | 28 letters & forms, RTL layout, phonetic keyboard, phrases, 500+ words | `ar-SA-ZariyahNeural` |
| `bn` | **Bengali** | Bengali–Assamese | Sworoborno & Byanjonborno, phonetic keyboard, phrases, 500+ words | `bn-BD-NabanitaNeural` |
| `ur` | **Urdu** | Nastaliq (RTL) | Arabic–Persian script, RTL layout, phonetic keyboard, phrases, 500+ words | `ur-PK-UzmaNeural` |

---

## 🚀 Key Features

* **🌍 210 Bidirectional Language Pairs (15 Languages)**: Set your native interface language ("I speak") and target course ("I want to learn") independently across all 15 languages with automatic audio halting, RTL layout adaptation (`ar`, `ur`), localized grammar explanations, and dedicated SVG academic emblems (`AppEmblem.tsx`).
* **📘 Interactive Grammar, Verb Tables & Gender/Rule Flashcards**: Interactive noun-gender tabs, verb conjugation tables, grammar descriptions with neural audio speakers, and expanded **16-card rule/gender flashcards** with clickable option neural audio and crisp Web Audio API sound chimes (`correct` / `incorrect`).
* **🏮 Mandarin Pinyin & Tones Guide (`PinyinGuide.tsx`)**: Dedicated multi-tab Pinyin companion covering the 4 Mandarin tones, syllable anatomy (Initials/Finals), phonetic IME typing workflows, and interactive sound filters.
* **🏛️ Cultural & Script Origins (`LanguageAbout.tsx`)**: Localized deep dives into each language's history, writing system evolution (such as Simplified vs. Traditional Chinese comparisons), timelines, and structural traits.
* **⌨️ 8 Non-Latin Phonetic Virtual Keyboards + Live Sound-Out Spacebar Conversion**: Integrated clickable phonetic keyboards and live sound-it-out + Spacebar conversion in quiz input mode across all 8 non-Latin scripts (`ru`, `ar`, `ur`, `hi`, `bn`, `ja`, `ko`, `zh`).
* **🎙️ 14,500+ Studio Neural Audio Recordings & Speed Controls**: Pre-rendered native MP3 pronunciations generated via Microsoft Edge Neural TTS with variable speed control (`0.5×` to `1.25×`), word/example playback inside revealed cards, and clean browser TTS fallback.
* **📦 Instant Single-File Offline Audio Binary Packs (`offline-pack.bin`)**: Each language bundles all its MP3 clips into a single contiguous binary archive (`public/audio/<lang>/offline-pack.bin`) with byte-offset manifests (`manifest.json`), enabling rapid one-click offline downloads into browser Cache Storage for full Airplane Mode playback (`OfflineAudioModal.tsx`).
* **🎯 Adaptive Quiz Engine with Fuzzy Typo Tolerance**: Supports Source-to-Target, Target-to-Source, Listening Mode, smart script normalization, and Levenshtein typo detection that accepts harmless slips while rejecting near-miss real words.
* **☁️ Cloud Sync & Privacy-First Guest Mode (Supabase)**: Local progress persistence by default with optional **Google**, **Microsoft Entra ID**, and **GitHub** OAuth 2.0 / OIDC cloud synchronization (`progressService.ts`) backed by PostgreSQL Row Level Security (RLS).

---

## 🔒 Security Architecture

* **Strict Content Security Policy (CSP)**: Enforces `script-src 'self'` (no `'unsafe-inline'` or `'unsafe-eval'`), `worker-src 'self'`, `manifest-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'none'`, `form-action 'self'`, and `upgrade-insecure-requests`.
* **OWASP HTTP Headers**: Configured in [`netlify.toml`](netlify.toml) with HSTS (`max-age=31536000; includeSubDomains; preload`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `X-XSS-Protection: 0`, `Cross-Origin-Opener-Policy: same-origin-allow-popups`, `Referrer-Policy: strict-origin-when-cross-origin`, and restrictive `Permissions-Policy`.
* **Database Row Level Security (RLS) & Constraints**: PostgreSQL tables (`public.profiles`, `public.quiz_sessions`, `public.word_progress`) revoke `anon` access, enforce `auth.uid() = id` / `auth.uid() = user_id` RLS policies across all `SELECT`/`INSERT`/`UPDATE`/`DELETE` operations, and validate score/mastery/URL bounds via SQL `CHECK` constraints (see [`docs/schema.sql`](docs/schema.sql)).
* **Zero Password Handling & Safe Client Storage**: Passwordless federated OAuth 2.0 / OIDC sign-in, strict `https:` validation on Supabase endpoints and OAuth avatar URLs (`referrerPolicy="no-referrer"`), audio pack filename sanitization, and prototype-pollution-safe `localStorage` parsing.

*Detailed system architecture and database design are documented in [`docs/BACKEND_PLAN.md`](docs/BACKEND_PLAN.md).*

---

## 🛠️ Tech Stack

* **Frontend**: React 19.3, TypeScript 5.9, Modern CSS (CSS Variables, Flexbox/Grid, RTL support, Glassmorphism)
* **Routing**: Universal multi-language dual routing (`/learn/:lang/:section`, `/:lang/:section`, and root routes) with dynamic SEO metadata
* **Build System & PWA**: Vite 6, `@vitejs/plugin-react` v5, `vite-plugin-pwa` v2 (Workbox), custom offline audio pack bundler (`scripts/build-offline-packs.mjs`)
* **Testing**:
  * **Unit & Integration**: Vitest 5, React Testing Library 16, JSDOM (**1,565 tests across 58 suites**)
  * **End-to-End**: Playwright Chromium (**21 E2E browser specs** covering desktop, 390px mobile, RTL, Pinyin, phonetic typing, offline Airplane Mode, and neural audio)
* **Backend & Auth**: Supabase PostgreSQL, Row Level Security (RLS), OAuth 2.0 / OIDC (Google, Microsoft Entra ID, GitHub)
* **Audio Pipeline**: Python `edge-tts` studio batch synthesis (`scripts/generate-all-audio.py`) + Web Speech API fallback
* **Hosting & CDN**: Netlify (`301` domain redirects, OWASP security headers, SSL, SPA fallback rules)

---

## 📁 Project Structure

```text
basic-language-school/
├── CONTRIBUTING.md             # Contribution guidelines & curriculum PR workflow
├── SECURITY.md                 # Security policy & vulnerability reporting
├── docs/
│   ├── BACKEND_PLAN.md         # Cloud sync & OAuth integration architecture
│   └── schema.sql              # Supabase PostgreSQL schema with RLS policies
├── e2e/
│   ├── chinesePinyinAboutAndTypoQuiz.spec.ts
│   └── languageMatrixAndLayout.spec.ts
├── scripts/
│   ├── build-offline-packs.mjs # Packages each language's MP3s into offline-pack.bin
│   ├── generate-offline-manifests.mjs
│   ├── generate-all-audio.py   # Microsoft Edge Neural TTS batch generator
│   └── render-og-image.js      # Renders public/og-image.svg -> public/og-image.png
├── public/
│   ├── audio/                  # Pre-rendered neural MP3s & offline-pack.bin per language
│   ├── privacy/index.html      # Static Privacy Policy page
│   ├── terms/index.html        # Static Terms of Service page
│   ├── app-icon.svg            # Universal app crest vector source
│   ├── manifest.json           # PWA Web App Manifest
│   ├── og-image.svg / .png     # 15-language OpenGraph social preview banner
│   ├── robots.txt & sitemap.xml
│   └── favicon.ico
└── src/
    ├── App.tsx                 # Main application shell, routing & dynamic SEO metadata
    ├── contexts/
    │   └── LanguageContext.tsx # Base/target language state, routing sync & audio halt
    ├── components/
    │   ├── Alphabet.tsx        # Alphabet, script, Grammar & Cultural About host
    │   ├── AppEmblem.tsx       # Custom SVG graduation-cap emblems for all 15 languages
    │   ├── FlagIcon.tsx        # Cross-platform vector SVG flags for all 15 languages
    │   ├── Grammar.tsx         # Noun genders, verbs, descriptions & audio flashcards
    │   ├── LanguageAbout.tsx   # Localized cultural, historical & script origins tabs
    │   ├── LanguageSwitcher.tsx# Base & target language picker modals
    │   ├── NumbersAndTime.tsx  # Number reference & telling-time grammar guides
    │   ├── OfflineAudioModal.tsx # Offline pack selector & Cache Storage progress UI
    │   ├── PhoneticKeyboard.tsx# Virtual phonetic keyboards (ar, ur, hi, bn, ja, ko, zh)
    │   ├── Phrases.tsx         # Categorized phrases & 500+ topic vocabulary packs
    │   ├── PinyinGuide.tsx     # Mandarin tones, initials/finals & phonetic IME guide
    │   ├── PronunciationButton.tsx # Offline CacheFirst MP3 & Web Speech fallback button
    │   ├── Quiz.tsx            # Adaptive quiz engine with phonetic typing & feedback
    │   ├── RussianKeyboard.tsx # On-screen Cyrillic keyboard with live phonetic mapping
    │   └── ProgressModal.tsx   # Cross-language accuracy & spaced-repetition dashboard
    ├── data/
    │   ├── aboutTranslations.ts# App About & Contact translations
    │   ├── legalTranslations.ts# Localized Privacy Policy & Terms of Service
    │   └── languages/          # 15 course datasets, grammar flashcards & cultural guides
    ├── services/
    │   ├── offlineAudioService.ts # Binary .bin unpacker & Cache Storage manager
    │   ├── progressService.ts  # Local & Supabase cloud quiz progress sync
    │   └── supabaseClient.ts   # Supabase client setup
    └── utils/
        ├── fuzzyMatcher.ts     # Typo-tolerant quiz grading across scripts
        ├── phoneticTyping.ts   # Sound-out + Spacebar IME conversion for 8 scripts
        ├── speech.ts           # Audio playback queue & Web Speech API fallback
        └── translationResolver.ts # Matrix UI localization across 15x15 pairs
```

---

## 💻 Local Development

### Prerequisites
* **Node.js**: `v22.x` or later (see `engines` in `package.json`)
* **npm**: `v10.x` or later
* **Python**: `v3.10+` with `edge-tts` (optional, only for regenerating studio MP3 audio)

### 1. Clone & Install
```bash
git clone https://github.com/JohnBendfeldt/basic-language-school.git
cd basic-language-school
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the project root (optional; Guest Mode works without environment variables):
```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

### 3. Run Development Server
```bash
npm run dev
# Vite dev server starts at http://localhost:5173
```

### 4. Run Automated Tests
```bash
# Unit & integration suite (58 suites, 1,565 tests)
npm test

# Strict TypeScript check
npx tsc --noEmit --noUnusedLocals --noUnusedParameters

# Playwright end-to-end suite (21 browser tests)
npx playwright test
```

### 5. Build for Production
```bash
npm run build
# Compiles TypeScript, builds Vite bundle to dist/, and packages offline-pack.bin archives
npm run preview
# Preview the production build locally
```

---

## 🎙️ Studio Audio & Offline Binary Packs

To regenerate neural audio files (`edge-tts`) or rebuild the single-file offline binary packs (`offline-pack.bin` + `manifest.json`):

```bash
# Generate studio neural MP3s (all 15 languages)
pip3 install edge-tts
python3 scripts/generate-all-audio.py --all

# Rebuild single-file offline binary packs & manifests for all 15 languages
npm run build-offline-packs
```

---

## 🌐 Domain & Routing Strategy

| Domain | Role | Action |
| :--- | :--- | :--- |
| **`basiclanguage.school`** | Primary Application | Production deployment on Netlify |
| **`basiclanguage.academy`** | Secondary Domain | 301 Permanent Redirect to `basiclanguage.school` |
| **`basiclanguage.courses`** | Secondary Domain | 301 Permanent Redirect to `basiclanguage.school` |
| **`basicrussian.org`** | Standalone Legacy App | Preserved independently with its own database |

---

## 🤝 Contributing & Security

* **Contributing**: Translation fixes, native-speaker refinements, accessibility improvements, and bug fixes with tests are welcome — please read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening a pull request.
* **Security**: Please report suspected vulnerabilities privately rather than opening a public issue; see [`SECURITY.md`](SECURITY.md) for disclosure instructions.

---

## 👤 Author

**John Bendfeldt**  
* GitHub: [@JohnBendfeldt](https://github.com/JohnBendfeldt)  
* Platform: [basiclanguage.school](https://basiclanguage.school)  
* Contact: [dev@basiclanguage.school](mailto:dev@basiclanguage.school)

---

## 📄 License
This project's source code is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

> **Branding Note**: While the source code is open source under MIT, the **Basic Language School** name, domain branding (`basiclanguage.school`), and custom academic emblems are reserved for the official platform.
