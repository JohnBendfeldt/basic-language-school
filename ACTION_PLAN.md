# 🌐 Basic Language School (`basiclanguage.school`)
## Master Architecture & Implementation Action Plan

> **Domains:**
> - `basiclanguage.school` (Primary Production Platform)
> - `basiclanguage.academy` (301 Permanent Redirect to `.school`)
> - `basiclanguage.courses` (301 Permanent Redirect to `.school`)
> - `basicrussian.org` & `basicenglish.school` (Preserved independently as standalone sites until fully verified)

---

## 🎯 Executive Summary
Basic Language School unifies language learning (Russian, English, and upcoming languages like Spanish and French) under a single modern codebase, a single Supabase backend, a unified Google OAuth setup, and a studio-quality neural audio pipeline powered by Microsoft Edge Neural TTS.

---

## 🗺️ Project Milestones

```
Phase 1: Project Setup & Action Plan (Complete)
    ├── Workspace created at documents/basic-language-school
    ├── Package & Vite configs prepared
    └── Action plan established
Phase 2: Database Schema & Auth
    ├── Supabase SQL migration (profiles, quiz_sessions with language_id, word_progress)
    └── Google OAuth & Guest mode configuration
Phase 3: Python Neural Speech Engine
    ├── scripts/generate-all-audio.py supporting --lang ru, --lang en, --all
    ├── Pre-rendered high-fidelity neural MP3s (ru-RU-SvetlanaNeural, en-US-JennyNeural)
    └── Zero runtime latency, 100% offline-ready PWA cache
Phase 4: Multi-Language Curriculum & Types
    ├── Unified LanguageMeta & Curriculum contracts
    ├── Russian curriculum module (Alphabet, Phrases, Numbers, Words, Time)
    └── English curriculum module (A-Z Phonics, Essential Phrases, Numbers, Oxford 3000 Words)
Phase 5: Routing & UX (The Duolingo Pattern)
    ├── LanguageContext with persistence (localStorage + Supabase profiles)
    ├── Topbar LanguageSwitcher (🇷🇺 Russian ⇄ 🇬🇧 English)
    ├── Route matching (/learn, /learn/:lang, /learn/:lang/:section)
    └── Language-specific widgets (RussianKeyboard conditionally rendered)
Phase 6: Quiz Engine & Mastery Tracking
    ├── ProgressService scoped by languageId
    └── Interactive Spaced Repetition Quiz
Phase 7: Production Deployment & Domain Routing
    ├── Netlify / Vercel build & SPA rewrites
    ├── Domain DNS & 301 redirects for .academy and .courses
    └── Verification testing
```

---

## 🗄️ Database Architecture (Supabase PostgreSQL)

Execute this script in Supabase SQL Editor:

```sql
-- 1. Profiles Table with Active Language
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  active_language VARCHAR(10) NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Quiz Sessions with Language Tagging
CREATE TABLE IF NOT EXISTS public.quiz_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  language_id VARCHAR(10) NOT NULL DEFAULT 'en',
  category VARCHAR(50) NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  percentage NUMERIC(5,2) GENERATED ALWAYS AS (
    CASE WHEN total_questions > 0 THEN ROUND((score::numeric / total_questions) * 100, 2) ELSE 0 END
  ) STORED,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_user_lang ON public.quiz_sessions(user_id, language_id, completed_at DESC);

-- 3. Spaced-Repetition Word Progress
CREATE TABLE IF NOT EXISTS public.word_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  language_id VARCHAR(10) NOT NULL DEFAULT 'en',
  category VARCHAR(50) NOT NULL,
  word_id VARCHAR(150) NOT NULL,
  prompt TEXT NOT NULL,
  answer TEXT NOT NULL,
  times_correct INTEGER NOT NULL DEFAULT 0,
  times_incorrect INTEGER NOT NULL DEFAULT 0,
  last_tested_at TIMESTAMPTZ DEFAULT NOW(),
  mastery_level INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT unique_user_lang_word UNIQUE (user_id, language_id, word_id)
);
CREATE INDEX IF NOT EXISTS idx_word_progress_user_lang ON public.word_progress(user_id, language_id, mastery_level);

-- 4. Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.word_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own profile" ON public.profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users can manage own quiz sessions" ON public.quiz_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own word progress" ON public.word_progress FOR ALL USING (auth.uid() = user_id);
```

---

## 🎙️ Speech Synthesis Architecture (Python Edge-TTS)

Browser `window.speechSynthesis` is replaced with pre-generated neural audio:
* **Russian Voice:** `ru-RU-SvetlanaNeural`
* **English Voice:** `en-US-JennyNeural` (Studio-quality native American English)
* **Audio Directory Layout:**
  ```
  public/audio/
    ru/
      alphabet/
      phrases/
      numbers/
      words/
      time/
    en/
      alphabet/
      phrases/
      numbers/
      words/
    sounds/
      correct.mp3
      incorrect.mp3
  ```

Running the generation script:
```bash
python3 scripts/generate-all-audio.py --lang en   # Generates all English studio MP3s
python3 scripts/generate-all-audio.py --lang ru   # Generates all Russian studio MP3s
python3 scripts/generate-all-audio.py --all       # Generates both
```

---

## 🧭 Routing & User Navigation (The Duolingo Pattern)

| URL Pattern | Behavior |
| :--- | :--- |
| `/` | Universal Landing Page: Quick language selector and value proposition |
| `/learn` | Reads user's `active_language` (Supabase / localStorage) and forwards to that language |
| `/learn/ru` | Russian dashboard (Alphabet, Phrases, Numbers, Time, Quiz) |
| `/learn/en` | English dashboard (Phonics, Phrases, Numbers, Vocabulary, Quiz) |
| `/learn/:lang/:section` | Direct deep-link for sharing and SEO (e.g. `/learn/ru/alphabet`, `/learn/en/phrases`) |

---

## 📁 Repository Directory Structure

```text
basic-language-school/
├── ACTION_PLAN.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── netlify.toml
├── docs/
│   └── schema.sql
├── scripts/
│   └── generate-all-audio.py
├── public/
│   ├── audio/
│   │   ├── ru/
│   │   ├── en/
│   │   └── sounds/
│   └── favicon.ico
└── src/
    ├── App.tsx
    ├── App.css
    ├── index.css
    ├── index.tsx
    ├── contexts/
    │   └── LanguageContext.tsx
    ├── components/
    │   ├── Alphabet.tsx
    │   ├── Phrases.tsx
    │   ├── NumbersAndTime.tsx
    │   ├── Quiz.tsx
    │   ├── RussianKeyboard.tsx
    │   ├── LanguageSwitcher.tsx
    │   ├── PronunciationButton.tsx
    │   ├── Navigation.tsx
    │   ├── BottomNavigation.tsx
    │   ├── UserMenu.tsx
    │   ├── AuthModal.tsx
    │   └── ProgressModal.tsx
    ├── data/
    │   └── languages/
    │       ├── types.ts
    │       ├── index.ts
    │       ├── ru/
    │       └── en/
    ├── services/
    │   ├── supabaseClient.ts
    │   └── progressService.ts
    └── types/
        ├── index.ts
        └── progress.ts
```
