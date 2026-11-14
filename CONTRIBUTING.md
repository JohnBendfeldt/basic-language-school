# Contributing to Basic Language School

Thank you for helping improve **Basic Language School** (`basiclanguage.school`)! Contributions from native speakers, language teachers, and frontend/accessibility engineers are warmly welcomed.

To keep pull requests focused and safe for learners worldwide, please review these guidelines before opening an issue or PR.

---

## What We Welcome

- **Native-Speaker Curriculum & Translation Fixes**
  - Improving natural phrasing, grammar examples, phonetic guides, and translations across the 15 supported languages (`src/data/languages/<lang>/`, `src/data/languages/grammarData.ts`, `src/data/languages/grammarFlashcards/`, `src/data/languages/aboutTranslations/`, `src/utils/translationResolver.ts`).
- **Phonetic Typing & Fuzzy Grading Improvements**
  - Improving sound-out transliteration (`src/utils/phoneticTyping.ts`), typo tolerance, or alternative accepted answers (`src/utils/fuzzyMatcher.ts`), accompanied by unit tests.
- **Accessibility, RTL Layout & Mobile UX Fixes**
  - Improving keyboard navigation, ARIA semantics, right-to-left (`ar`, `ur`) layout polish, or mobile viewport ergonomics.
- **Bug Fixes with Regression Tests**
  - Resolving reproducible bugs along with focused Vitest unit/integration tests in `src/__tests__/`.

---

## What Requires Maintainer Discussion First (or Is Out of Scope)

Please open an issue and discuss with the maintainer **before** submitting large changes in these areas:

- **Visual Redesigns & Major UI Overhauls**: Unsolicited redesigns or header/navigation restructuring will usually be declined unless coordinated first.
- **Bulk Binary Audio / Offline Pack Regeneration**: Do **not** regenerate or commit bulk `.mp3` clips or `public/audio/<lang>/offline-pack.bin` binaries in PRs. Edit the TypeScript curriculum text or open a **Translation or Audio Correction** issue so the maintainer can synthesize consistent studio neural audio and rebuild offline binary packs cleanly.
- **Database Schema & Authentication Changes**: Do not modify `docs/schema.sql`, Netlify security headers (`netlify.toml`), or OAuth providers without prior approval.
- **Third-Party Tracking, Ads, or Analytics**: Basic Language School is strictly privacy-first and ad-free; tracking SDKs will not be accepted.
- **Unrelated Formatting Churn**: Keep diffs tight and focused on the lines you actually changed.

---

## Local Development Setup

1. Fork the repository and create a branch from `main`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app in Guest Mode (no `.env.local` or Supabase credentials are required):
   ```bash
   npm run dev
   ```
4. The repository includes `.editorconfig`, `.gitattributes`, and `.vscode/settings.json` to keep line endings (`LF`) and formatting consistent. Do **not** reformat unrelated files or introduce `CRLF` line endings.

---

## Pull Request Checklist

Before opening a pull request against `main`, please verify locally:

1. **Automated Tests Pass**:
   ```bash
   npm test
   ```
2. **Production Typecheck & Build Pass** (checks strict TypeScript including `noUnusedLocals` / `noUnusedParameters`, Vite bundle, and offline audio packs):
   ```bash
   npm run build
   ```
3. **No Sensitive Data or Local Machine Paths**:
   - Never commit `.env*` files, API keys, tokens, or local absolute paths (such as `/Users/...` or `C:\...`).
   - Do not modify `docs/schema.sql` unless explicitly requested for an approved schema migration.
4. **Focused Diff**: Ensure `git diff` contains only your intentional changes and passes CI (`.github/workflows/ci.yml`).
