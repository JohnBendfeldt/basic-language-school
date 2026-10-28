# 🌐 Basic Language School (`basiclanguage.school`)
## Master Architecture & Implementation Action Plan

> **Domains:**
> - `basiclanguage.school` (Primary Production Platform)
> - `basiclanguage.academy` (301 Permanent Redirect to `.school`)
> - `basiclanguage.courses` (301 Permanent Redirect to `.school`)
> - `basicrussian.org` & `basicenglish.school` (Preserved independently as standalone sites)

---

## 🎯 Executive Summary

**Basic Language School** unifies language education into a single high-performance web platform. It eliminates the unsustainable operational overhead of maintaining separate top-level domains ($55+/year each) by consolidating Russian, English, Spanish, and French under `basiclanguage.school`.

The platform shares:
1. **Unified Frontend**: React 18, TypeScript, and Vite 6 with dual routing (`/learn/:lang/:section`).
2. **Dedicated Supabase Backend**: Isolated PostgreSQL database with multi-language schemas and Row Level Security.
3. **Custom Auth Vanity URL**: `auth.basiclanguage.school` so users experience a seamless, branded sign-in flow.
4. **Official Google Workspace**: `dev@basiclanguage.school` and `support@basiclanguage.school` for user communication.
5. **Studio-Quality Neural Audio**: Microsoft Edge Neural TTS pre-rendered batch pipeline for zero-latency, offline-capable playback.

---

## 📊 Milestone Status Dashboard

| Phase | Milestone | Status | Key Deliverables |
| :---: | :--- | :---: | :--- |
| **Phase 1** | Project Setup & Repo Initialization | ✅ **Complete** | Private repo `JohnBendfeldt/basic-language-school` created, Vite 6 configured |
| **Phase 2** | Multi-Language Database Schema | ✅ **Complete** | PostgreSQL DDL in [`docs/schema.sql`](file:///Users/johnbendfeldt/Documents/basic-language-school/docs/schema.sql) with `language_id` scoping & RLS |
| **Phase 3** | Python Neural Speech Pipeline | ✅ **Complete** | Batch generator in [`scripts/generate-all-audio.py`](file:///Users/johnbendfeldt/Documents/basic-language-school/scripts/generate-all-audio.py) (`ru` + `en` voices) |
| **Phase 4** | Curriculum Modularization | ✅ **Complete** | Russian (33 Cyrillic letters, vocab, time) & English (26 phonics cards, vocab) |
| **Phase 5** | Dynamic Routing & Switcher UX | ✅ **Complete** | `LanguageContext`, Duolingo-style capsule `LanguageSwitcher`, dual-route matching |
| **Phase 6** | Quiz Engine & Test Verification | ✅ **Complete** | Scoped `ProgressService`, on-screen Russian keyboard, **44/44 Vitest tests passing** |
| **Phase 7** | Dedicated Supabase & Auth Vanity URL | 🟡 **In Progress** | New Supabase project creation, `auth.basiclanguage.school` vanity CNAME, Google OAuth |
| **Phase 8** | Google Workspace & Netlify Deployment | ⏳ **Planned** | MX/SPF/DKIM for `@basiclanguage.school`, Netlify CI/CD, 301 domain redirects |
| **Phase 9** | Spanish & French Expansion | ⏳ **Planned** | Spanish (`es-ES-ElviraNeural`) & French (`fr-FR-DeniseNeural`) curriculum & audio |
| **Phase 10**| Native Browser Language Detection | 🔮 **Vision** | Automatic `navigator.language` sniffing and native-language UI localization |

---

## 🗄️ Phase 7: Dedicated Supabase & Custom Auth Vanity URL

### 1. Project Isolation Strategy
* **Why not reuse `basicrussian.org`'s Supabase project?**
  1. `basicrussian.org` enforces a database constraint `UNIQUE (user_id, word_id)`. Updating this to `(user_id, language_id, word_id)` triggers PostgREST error `42P10` and breaks progress saving for live Russian learners.
  2. The Google OAuth consent screen on that project displays "Basic Russian", confusing English, Spanish, and French learners.
  3. Supabase allows **2 free projects** per account. Creating a dedicated project `basic-language-school` keeps `basicrussian.org` 100% safe and isolated.

### 2. Creating the New Supabase Project
1. Log in to [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **New project** and select your organization.
3. Name: `basic-language-school`.
4. Region: Choose closest to your target audience (e.g., `us-east-1` or `us-central-1`).
5. Set a secure database password and save it in your password manager.
6. Once provisioned, open **SQL Editor** and run the contents of [`docs/schema.sql`](file:///Users/johnbendfeldt/Documents/basic-language-school/docs/schema.sql).

### 3. Custom Auth Vanity URL (`auth.basiclanguage.school`)
Instead of users seeing `https://<project-ref>.supabase.co` when logging in or receiving verification emails, configure a branded vanity domain:

#### DNS Configuration
In your DNS registrar / DNS manager for `basiclanguage.school`:
| Record Type | Host / Name | Target / Value | TTL |
| :---: | :--- | :--- | :---: |
| **CNAME** | `auth` | `<project-ref>.supabase.co` *(or Supabase Custom Domain target)* | 300 / Auto |

#### Supabase Settings
1. In Supabase Dashboard, navigate to **Project Settings** → **Custom Domains**.
2. Enter `auth.basiclanguage.school`.
3. Supabase verifies the CNAME and provisions an automatic SSL certificate.
4. Update your local [`.env.local`](file:///Users/johnbendfeldt/Documents/basic-language-school/.env.local) and Netlify environment variables:
   ```env
   VITE_SUPABASE_URL=https://auth.basiclanguage.school
   VITE_SUPABASE_ANON_KEY=<your-new-anon-key>
   ```

### 4. Google Cloud Console OAuth 2.0 Configuration
1. Open [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Configure **OAuth Consent Screen**:
   - App Name: **Basic Language School**
   - User Support Email: `support@basiclanguage.school` (or personal Gmail during setup)
   - App Logo: Upload the `basiclanguage.school` crest/emblem
   - App Domain: `https://basiclanguage.school`
   - Privacy Policy: `https://basiclanguage.school/privacy`
3. Create **OAuth Client ID** (Web Application):
   - Name: `Basic Language School Web Client`
   - **Authorized JavaScript Origins**:
     - `https://basiclanguage.school`
     - `https://auth.basiclanguage.school`
     - `http://localhost:3000`
     - `http://localhost:5173`
   - **Authorized Redirect URIs**:
     - `https://auth.basiclanguage.school/auth/v1/callback`
     - `https://<new-project-ref>.supabase.co/auth/v1/callback`
4. Copy the **Client ID** and **Client Secret** into Supabase Dashboard under **Authentication** → **Providers** → **Google**.

---

## 📧 Phase 8: Google Workspace & Netlify Deployment

### 1. Google Workspace Setup for `@basiclanguage.school`
Setting up official Google Workspace provides:
* Professional email addresses: `admin@basiclanguage.school`, `dev@basiclanguage.school`, `support@basiclanguage.school`.
* Official Google identity verification for Google Cloud OAuth consent screens, avoiding unverified app warnings.

#### DNS Records Required for Google Workspace:
| Record Type | Host | Priority | Value |
| :---: | :---: | :---: | :--- |
| **MX** | `@` | `1` | `ASPMX.L.GOOGLE.COM.` |
| **MX** | `@` | `5` | `ALT1.ASPMX.L.GOOGLE.COM.` |
| **MX** | `@` | `5` | `ALT2.ASPMX.L.GOOGLE.COM.` |
| **MX** | `@` | `10`| `ALT3.ASPMX.L.GOOGLE.COM.` |
| **MX** | `@` | `10`| `ALT4.ASPMX.L.GOOGLE.COM.` |
| **TXT** | `@` | - | `v=spf1 include:_spf.google.com ~all` (SPF) |
| **TXT** | `google._domainkey` | - | *(DKIM public key generated in Workspace Admin)* |
| **TXT** | `_dmarc` | - | `v=DMARC1; p=quarantine; rua=mailto:dmarc@basiclanguage.school` |

### 2. Netlify Production Deployment
1. Connect GitHub repository `JohnBendfeldt/basic-language-school` to Netlify.
2. Build Settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Production branch**: `main`
3. Environment Variables in Netlify:
   - `VITE_SUPABASE_URL`: `https://auth.basiclanguage.school` (or direct Supabase URL)
   - `VITE_SUPABASE_ANON_KEY`: `<anon-key>`
4. Custom Domain & SSL:
   - Assign primary domain: `basiclanguage.school`
   - Netlify automatically provisions Let's Encrypt SSL.
5. Domain Redirects for Alternate TLDs:
   - In DNS for `basiclanguage.academy` and `basiclanguage.courses`, point CNAME / ALIAS to `basiclanguage.school`.
   - Add permanent 301 redirects in Netlify [`public/_redirects`](file:///Users/johnbendfeldt/Documents/basic-language-school/public/_redirects):
     ```text
     https://basiclanguage.academy/*  https://basiclanguage.school/:splat  301!
     https://basiclanguage.courses/*  https://basiclanguage.school/:splat  301!
     /*                               /index.html                           200
     ```

---

## 🇪🇸 🇫🇷 Phase 9: Spanish & French Expansion

### 1. Spanish Course Architecture (`es`)
* **Voice Model**: Microsoft Edge Neural `es-ES-ElviraNeural` (Castilian) or `es-MX-DaliaNeural` (Latin American).
* **Curriculum Content**:
  - `alphabet`: 27 letters (A–Z plus Ñ), digraphs (`ch`, `ll`, `rr`), accented vowels (`á`, `é`, `í`, `ó`, `ú`, `ü`).
  - `phrases`: Greetings, directions, dining, emergencies, polite requests.
  - `numbers`: 0 to 1,000 with gender agreement rules (`uno`/`una`, `doscientos`/`doscientas`).
  - `words`: 500 highest-frequency Spanish words categorized by frequency and POS.
  - `time`: Spanish time telling grammar (*"Es la una..."*, *"Son las dos..."*, *"y cuarto"*, *"menos cuarto"*).

### 2. French Course Architecture (`fr`)
* **Voice Model**: Microsoft Edge Neural `fr-FR-DeniseNeural`.
* **Curriculum Content**:
  - `alphabet`: 26 Latin letters, French accents (`é`, `è`, `ê`, `ë`, `ç`, `à`, `ù`, `œ`), nasal vowels.
  - `phrases`: High-utility French conversation, restaurant ordering, everyday travel.
  - `numbers`: 0 to 100 with vigesimal system explanations (70 = *soixante-dix*, 80 = *quatre-vingts*, 90 = *quatre-vingt-dix*).
  - `words`: 500 essential core words with gender markers (*le/la/un/une*).
  - `time`: French time expressions (*"Il est une heure..."*, *"et demie"*, *"moins le quart"*).

### 3. Audio Pipeline Extension
Update [`scripts/generate-all-audio.py`](file:///Users/johnbendfeldt/Documents/basic-language-school/scripts/generate-all-audio.py) to support:
```bash
python3 scripts/generate-all-audio.py --lang es
python3 scripts/generate-all-audio.py --lang fr
python3 scripts/generate-all-audio.py --all
```

---

## 🔮 Phase 10: Automatic Browser Language Detection & Adaptive Localization

### Long-term Vision
When a user arrives at `basiclanguage.school`:
1. **Detection**: Read `navigator.languages` or `navigator.language` (e.g., `es-MX`, `fr-FR`, `ru-RU`, `zh-CN`).
2. **Dynamic Onboarding**:
   - If a Spanish speaker lands on the site, welcome them in Spanish (*"¿Qué idioma quieres aprender hoy?"*) and offer English or Russian courses with explanations and prompts in Spanish.
   - If an English speaker arrives, the default UI language is English.
3. **Bilateral Translation Matrix**:
   - Rather than assuming all learners speak English, curriculum data structures will support native-to-target pairs (e.g., `es` -> `en`, `ru` -> `en`, `en` -> `ru`, `en` -> `es`).

---

## 🛠️ Complete Verification & Testing Protocol

Before deploying any production update:
1. **Type Checking**:
   ```bash
   npm run build
   ```
   Must pass with zero TypeScript diagnostics (`tsc && vite build`).
2. **Automated Unit & Integration Tests**:
   ```bash
   npm test
   ```
   Must pass all 44 tests across all 6 test suites:
   - `App.test.tsx` (Routing, navigation, language switching)
   - `Quiz.test.tsx` (Fuzzy matching, Cyrillic keyboard, scoring)
   - `authAndProgressUI.test.tsx` (Auth modal, progress modal)
   - `Phrases.test.tsx` (Audio playback, category filters)
   - `progressService.test.ts` (Database upserts, error handling, stats calculation)
   - `multiLanguage.test.tsx` (Context state, storage sync, fallback behavior)
3. **Audio Asset Integrity Check**:
   Confirm all referenced audio paths in `public/audio/{lang}/` resolve to valid files without circular symlinks or missing targets.
4. **Git Discipline**:
   Commit with clear semantic messages and push to `origin/main`.
