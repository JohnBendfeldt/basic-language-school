# 🌐 Basic Language School

An interactive, high-performance multi-language learning platform featuring studio-quality neural audio pronunciation, adaptive spaced-repetition quizzes, dynamic language switching, an on-screen Cyrillic keyboard for Russian, and Progressive Web App (PWA) offline support.

[![React](https://img.shields.io/badge/React%2018-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite%206-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-44%20Passing-22c55e?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20Postgres-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Edge TTS](https://img.shields.io/badge/Audio-Edge%20Neural%20TTS-0078D4?style=for-the-badge&logo=microsoft&logoColor=white)](https://github.com/rany2/edge-tts)
[![PWA](https://img.shields.io/badge/PWA-Ready-f59e0b?style=for-the-badge&logo=pwa&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![Hosted on Netlify](https://img.shields.io/badge/Hosted%20on-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://basiclanguage.school)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 🌟 Overview

**Basic Language School** (`basiclanguage.school`) unifies world language education into a single streamlined web application. Instead of fragmenting learning across costly individual domains, it provides a centralized platform for mastering multiple languages with shared authentication, unified progress tracking, and zero-latency neural audio.

### 📚 Supported & Upcoming Languages

| Flag | Language | Status | Primary Focus Areas | Voice Model |
| :---: | :--- | :---: | :--- | :--- |
| 🇷🇺 | **Russian** | **Live** | 33 Cyrillic letters, survival phrases, numbers & time grammar, on-screen keyboard | `ru-RU-SvetlanaNeural` |
| 🇬🇧 | **English** | **Live** | 26 A–Z phonics cards, survival phrases, Oxford 3000 high-frequency vocab, time rules | `en-US-JennyNeural` |
| 🇪🇸 | **Spanish** | *In Progress* | Castilian & Latin American phonetics, essential conversational phrases, numbers | `es-ES-ElviraNeural` |
| 🇫🇷 | **French** | *In Progress* | French phonetics, nasal vowels, liaisons, daily phrases, numbers | `fr-FR-DeniseNeural` |

---

## 🚀 Key Features

* **🌍 Duolingo-Style Instant Language Switcher**: Switch courses on the fly (`/learn/ru` ⇄ `/learn/en`) with automatic audio halting, scoped progress tracking, and dynamic course emblems.
* **🎙️ Studio-Quality Neural Audio**: High-fidelity native speech generated via Microsoft Edge Neural TTS (`ru-RU-SvetlanaNeural`, `en-US-JennyNeural`), stored as pre-rendered MP3 assets for instant, zero-latency playback with offline PWA caching.
* **🎯 Adaptive Quiz Engine with Fuzzy Matching**:
  * Employs Levenshtein-distance string matching to forgive minor spelling mistakes while reinforcing correct orthography.
  * Dual testing modes (Source-to-Target & Target-to-Source) with immediate audio reinforcement.
  * Spaced repetition tracking recording mastery levels and error frequency per word.
* **⌨️ Integrated Cyrillic Keyboard & Transliteration**: Full on-screen Russian keyboard with click-to-type input and phonetic transliteration mapping for users without physical Russian keyboards.
* **🔤 English Phonics & Essential Vocabulary**: Visual A–Z phonics tiles with curated vocabulary, example sentences, and American English audio.
* **☁️ Cloud Sync & Identity (Supabase)**:
  * Google OAuth sign-in with seamless guest mode fallback.
  * Cross-device progress synchronization across multiple languages in isolated PostgreSQL records.
  * Dedicated vanity domain (`auth.basiclanguage.school`) for branded authentication.
* **📱 Progressive Web App (PWA)**: Installable on iOS, Android, macOS, and Windows with offline caching powered by Vite PWA and Workbox.

---

## 🛠️ Tech Stack

* **Frontend**: React 18, TypeScript, Vanilla CSS (CSS Variables, Modern Flexbox/Grid, Glassmorphism)
* **Routing**: Universal multi-language dual routing (`/learn/:lang/:section` with direct fallback routes)
* **Build System**: Vite 6, `@vitejs/plugin-react`, `vite-plugin-pwa`
* **Testing**: Vitest, React Testing Library, JSDOM (44 automated unit & integration tests)
* **Backend & Auth**: Supabase PostgreSQL, Row Level Security (RLS), Google OAuth 2.0
* **Audio Engine**: Python `edge-tts` batch generation pipeline with Web Speech API browser fallback
* **Hosting & CDN**: Netlify with custom security headers and SPA rewrite rules

---

## 📁 Project Structure

```text
basic-language-school/
├── ACTION_PLAN.md            # Comprehensive architecture and milestone roadmap
├── docs/
│   └── schema.sql            # Supabase PostgreSQL schema with multi-language RLS
├── scripts/
│   ├── generate-all-audio.py # Python batch neural speech generator (ru, en, es, fr)
│   └── generate-speech.py    # Single-phrase audio generator
├── public/
│   ├── audio/
│   │   ├── ru/               # Russian pre-rendered audio (alphabet, phrases, numbers, words)
│   │   ├── en/               # English pre-rendered audio (alphabet, phrases, numbers, words)
│   │   └── sounds/           # UI feedback audio (correct.mp3, incorrect.mp3)
│   ├── manifest.json         # PWA Web App Manifest
│   └── favicon.ico
└── src/
    ├── App.tsx               # Main application shell with dual routing & dynamic headers
    ├── contexts/
    │   └── LanguageContext.tsx # Global language state, routing sync & audio control
    ├── components/
    │   ├── Alphabet.tsx      # Multi-language alphabet & phonics renderer
    │   ├── LanguageSwitcher.tsx # Duolingo-style capsule dropdown
    │   ├── NumbersAndTime.tsx # Dynamic numbers and time grammar guides
    │   ├── Phrases.tsx       # Essential conversational phrases with audio
    │   ├── PronunciationButton.tsx # Audio button with path resolution & fallback
    │   ├── Quiz.tsx          # Adaptive quiz engine with Cyrillic keyboard integration
    │   ├── RussianKeyboard.tsx # On-screen Cyrillic keyboard for Russian mode
    │   ├── UserMenu.tsx      # User profile, cloud sync status & language indicator
    │   ├── AuthModal.tsx     # Google OAuth & guest sign-in modal
    │   └── ProgressModal.tsx # Cross-language learning statistics and word mastery
    ├── data/
    │   └── languages/
    │       ├── types.ts      # Multi-language curriculum contracts
    │       ├── index.ts      # Registry for available courses
    │       ├── ru/           # Russian vocabulary and curriculum data
    │       └── en/           # English vocabulary and phonics data
    └── services/
        ├── supabaseClient.ts # Supabase client initialization
        └── progressService.ts# Scoped cross-language progress sync
```

---

## 💻 Local Development

### Prerequisites
* **Node.js**: `v20.x` or `v22.x` (Active LTS)
* **npm**: `v10.x` or later
* **Python**: `v3.10+` with `edge-tts` (optional, for regenerating neural audio)

### 1. Clone & Install
```bash
git clone https://github.com/JohnBendfeldt/basic-language-school.git
cd basic-language-school
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the project root:
```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

### 3. Run Development Server
```bash
npm start
# Server starts at http://localhost:3000
```

### 4. Run Automated Tests
```bash
npm test
# Runs 44 unit and integration tests across 6 test suites with Vitest
```

### 5. Build for Production
```bash
npm run build
# Compiles TypeScript and builds optimized production bundle to dist/
npm run preview
# Preview the production build locally
```

---

## 🎙️ Neural Audio Generation

To generate or refresh audio files using Microsoft Edge Neural TTS:

```bash
# Install Python dependency
pip install edge-tts

# Generate all audio for English
python3 scripts/generate-all-audio.py --lang en

# Generate all audio for Russian
python3 scripts/generate-all-audio.py --lang ru

# Generate both languages
python3 scripts/generate-all-audio.py --all
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

## 👤 Author

**John Bendfeldt**  
* GitHub: [@JohnBendfeldt](https://github.com/JohnBendfeldt)  
* Platform: [basiclanguage.school](https://basiclanguage.school)  
* Contact: [dev@basiclanguage.school](mailto:dev@basiclanguage.school)

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
