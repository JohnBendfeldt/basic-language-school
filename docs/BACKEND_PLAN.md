# Full-Stack & Security Architecture: Multi-Language Supabase PostgreSQL, OAuth 2.0 (Google, Entra ID, GitHub) & React 19 PWA

## 1. Executive Summary
**Basic Language School** (`basiclanguage.school`) is architected as a privacy-first, guest-ready React 19 Progressive Web App (PWA) supporting **15 world languages** (`en`, `es`, `fr`, `de`, `pt`, `id`, `tr`, `ru`, `zh`, `ja`, `ko`, `hi`, `ar`, `bn`, `ur`) across **210 bidirectional language pairs**, backed by **Supabase Auth** and **Supabase PostgreSQL** with strict **Row Level Security (RLS)**.

Learners can use every course, offline audio binary pack, and quiz feature immediately without an account (Guest Mode via language-scoped `localStorage`), or optionally sign in with **Google**, **Microsoft Entra ID (Azure)**, or **GitHub** to migrate their local study history and synchronize quiz sessions, accuracy metrics, daily streaks, and spaced-repetition mastery across devices.

---

## 2. Guiding Principles
1. **Guest-First, Offline-Ready**: 100% of lessons, quizzes, and downloadable single-file offline neural audio packs (`offline-pack.bin` via Cache Storage) work unauthenticated and in Airplane Mode. Guest progress is stored per language in `localStorage` and automatically uploaded and cleared once a user signs in.
2. **Defense-in-Depth Security**:
   - Passwordless OAuth 2.0 / OpenID Connect (OIDC) authentication via Supabase Auth.
   - Database-enforced Row Level Security (`auth.uid() = user_id` / `auth.uid() = id`), `anon` role privilege revocation, and SQL `CHECK` constraints (`docs/schema.sql`).
   - Strict HTTP security headers in `netlify.toml`, including a Content Security Policy (CSP) without `'unsafe-inline'` or `'unsafe-eval'` scripts, HSTS preload, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Cross-Origin-Opener-Policy: same-origin-allow-popups`.
   - Client-side validation of Supabase HTTPS endpoints, OAuth avatar URLs (`referrerPolicy="no-referrer"`), audio pack filenames, and prototype-pollution-safe `localStorage` parsing.
3. **Serverless & Zero-Maintenance Operations**: Static CDN delivery via Netlify paired directly with Supabase's managed Auth and PostgREST layer—eliminating custom middleware servers while enforcing multi-language authorization at the PostgreSQL row level.

---

## 3. System Architecture Diagram

```mermaid
flowchart TD
    subgraph Client["React 19 + Vite 6 PWA (Netlify CDN)"]
        UI["15-Language Curriculum, Grammar & Quiz"]
        OfflineAudio["OfflineAudioService (offline-pack.bin -> Cache Storage)"]
        UserMenu["UserMenu, MobileDrawer & AuthModal"]
        ProgressModal["ProgressModal (Cross-Course Stats & Review)"]
        ProgressService["ProgressService (Cloud + Guest Fallback)"]
        LocalStore[("Browser localStorage (per language_id)")]
    end

    subgraph IdP["OAuth 2.0 / OIDC Identity Providers"]
        Google["Google Identity"]
        Entra["Microsoft Entra ID"]
        GitHub["GitHub OAuth"]
    end

    subgraph Supabase["Supabase Cloud"]
        GoTrue["Supabase Auth (JWT Session)"]
        PostgREST["PostgREST + RLS Engine"]
        AuthUsers[("auth.users")]
        Profiles[("public.profiles")]
        QuizSessions[("public.quiz_sessions")]
        WordProgress[("public.word_progress")]
    end

    UserMenu -->|OAuth Redirect| GoTrue
    GoTrue <-->|OIDC / OAuth 2.0| Google
    GoTrue <-->|OIDC / OAuth 2.0| Entra
    GoTrue <-->|OAuth 2.0| GitHub
    GoTrue --> AuthUsers
    GoTrue -->|Signed JWT| ProgressService

    UI --> OfflineAudio
    UI --> ProgressService
    ProgressModal --> ProgressService
    ProgressService -->|Unauthenticated Fallback| LocalStore
    ProgressService -->|HTTPS + Bearer JWT| PostgREST
    PostgREST -->|auth.uid() = id| Profiles
    PostgREST -->|auth.uid() = user_id| QuizSessions
    PostgREST -->|auth.uid() = user_id| WordProgress
```

---

## 4. Multi-Language Database Schema & Row Level Security

The canonical schema lives in [`docs/schema.sql`](schema.sql) and links directly to Supabase's managed `auth.users` table with `ON DELETE CASCADE`:

* **`public.profiles`**:
  - Stores user profile preferences including `active_language`, optional `email`, `display_name`, and `https://`-validated `avatar_url`.
* **`public.quiz_sessions`**:
  - Tracks completed quiz `language_id`, `category`, `score`, `total_questions`, generated `percentage`, and `completed_at` timestamp.
  - Enforces `CHECK (score >= 0 AND score <= total_questions)` and `CHECK (total_questions > 0 AND total_questions <= 500)`.
* **`public.word_progress`**:
  - Tracks per-language spaced-repetition performance (`language_id`, `word_id`, `category`, `prompt`, `answer`, `times_correct`, `times_incorrect`, `last_tested_at`, `mastery_level`).
  - Enforces `UNIQUE (user_id, language_id, word_id)` and `CHECK (mastery_level BETWEEN 0 AND 5)`.
  - Mastery increases by `+1` per correct attempt and decreases by `-1` per miss (clamped `0`–`5`). Missed words remain in **Words & Phrases to Review** until reaching `mastery_level >= 2`, and items reaching `mastery_level >= 5` are marked mastered.
* **Privilege & RLS Isolation**:
  - `REVOKE ALL` from `anon`; `GRANT` least-privilege operations exclusively to `authenticated`.
  - Explicit `SELECT`, `INSERT`, `UPDATE`, and `DELETE` RLS policies restrict every query and mutation to `auth.uid() = id` (`profiles`) and `auth.uid() = user_id` (`quiz_sessions`, `word_progress`).

---

## 5. Environment & Identity Configuration

1. Copy `.env.example` to `.env.local` for local cloud-sync testing (or leave unconfigured to run in Guest Mode):
   ```bash
   VITE_SUPABASE_URL=https://<project-ref>.supabase.co
   VITE_SUPABASE_ANON_KEY=<supabase-anon-public-key>
   ```
   *(Note: `VITE_SUPABASE_ANON_KEY` is a publishable client key designed to be paired with PostgreSQL RLS; never expose a `service_role` secret in client environment variables.)*
2. Run [`docs/schema.sql`](schema.sql) in the Supabase SQL Editor.
3. Enable **Google**, **Azure (Microsoft Entra ID)**, and **GitHub** providers under **Supabase Dashboard → Authentication → Providers**, and add `https://basiclanguage.school` (plus `http://localhost:5173` for local dev) to **Redirect URLs**.
4. Microsoft Entra publisher domain verification is served from `/well-known/microsoft-identity-association.json` and routed via `/.well-known/*` rules in [`netlify.toml`](../netlify.toml).

---

## 6. Implementation Status

- [x] **Multi-Language Client Data & Spaced-Repetition Layer**: Implemented `src/types/progress.ts` and `src/services/progressService.ts` with language-scoped, prototype-safe `localStorage` persistence, streak tracking, and cross-course mastery aggregation.
- [x] **Supabase Auth & Federated OAuth Providers**: Implemented `src/services/supabaseClient.ts`, `AuthModal.tsx`, `UserMenu.tsx`, and `MobileDrawer.tsx` supporting Google, Microsoft Entra ID, and GitHub sign-in.
- [x] **PostgreSQL Schema & RLS Hardening**: Shipped `docs/schema.sql` with `auth.users` foreign keys, `language_id` composite uniqueness, `CHECK` constraints, `anon` privilege revocation, and strict `authenticated` RLS policies.
- [x] **Cross-Language Progress Dashboard & One-Time Guest Sync**: Implemented `ProgressModal.tsx` ("My Stats", course switcher, & "Words & Phrases to Review") and deduplicated guest-to-cloud migration on sign-in.
- [x] **React 19 & OWASP Security Hardening**: Upgraded to React 19.3 + TypeScript 5.9 + `vite-plugin-pwa` v2 and hardened CSP (`script-src 'self'`), HSTS, COOP, and OAuth avatar handling.
