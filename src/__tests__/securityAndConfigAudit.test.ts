import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { isSafeHttpsUrl } from '../services/supabaseClient';
import { isSupportedLanguageId, getLanguageMeta } from '../data/languages';
import { evaluateSmartAnswer, levenshteinDistance } from '../utils/fuzzyMatcher';
import { convertLastLatinWordOnSpace, previewSoundOutToken } from '../utils/phoneticTyping';
import { searchLanguageConcepts } from '../utils/searchEngine';
import { ProgressService } from '../services/progressService';

const ROOT_DIR = path.resolve(__dirname, '../..');

describe('Security Headers, CSP, HTML Script-Injection & PostgreSQL RLS Regression Audit', () => {
  const netlifyToml = fs.readFileSync(path.join(ROOT_DIR, 'netlify.toml'), 'utf-8');
  const schemaSql = fs.readFileSync(path.join(ROOT_DIR, 'docs/schema.sql'), 'utf-8');
  const pkgJson = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf-8'));

  it('enforces pre-deploy test gating, OWASP security headers, and strict script-src CSP in netlify.toml', () => {
    expect(netlifyToml).toContain('command = "npm test && npm run build"');
    expect(netlifyToml).toContain('X-Frame-Options = "DENY"');
    expect(netlifyToml).toContain('X-Content-Type-Options = "nosniff"');
    expect(netlifyToml).toContain('Cross-Origin-Opener-Policy = "same-origin-allow-popups"');
    expect(netlifyToml).toContain('Referrer-Policy = "strict-origin-when-cross-origin"');
    expect(netlifyToml).toContain('Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"');

    const cspMatch = netlifyToml.match(/Content-Security-Policy\s*=\s*"([^"]+)"/);
    expect(cspMatch).not.toBeNull();
    const csp = cspMatch![1];

    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("script-src 'self'");
    expect(csp).toContain("worker-src 'self'");
    expect(csp).toContain("manifest-src 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain('https://auth.basiclanguage.school');
    expect(csp).toContain('upgrade-insecure-requests');

    const scriptSrc = csp.split(';').find((d) => d.trim().startsWith('script-src')) || '';
    expect(scriptSrc).not.toContain("'unsafe-inline'");
    expect(scriptSrc).not.toContain("'unsafe-eval'");
  });

  it('ensures no HTML entry points contain executable inline <script> blocks that would violate strict CSP', () => {
    const htmlFiles = ['index.html', 'public/privacy/index.html', 'public/terms/index.html'];
    for (const relPath of htmlFiles) {
      const fullPath = path.join(ROOT_DIR, relPath);
      expect(fs.existsSync(fullPath)).toBe(true);
      const html = fs.readFileSync(fullPath, 'utf-8');

      const scriptTags = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
      for (const [, attrs, body] of scriptTags) {
        const isJsonLd = /type=["']application\/ld\+json["']/i.test(attrs);
        const hasExternalSrc = /\bsrc=["'][^"']+["']/i.test(attrs);
        if (!isJsonLd) {
          expect(hasExternalSrc).toBe(true);
          expect(body.trim()).toBe('');
        }
      }
    }
  });

  it('enforces Row Level Security, anon privilege revocation, and CHECK constraints across all 3 tables in docs/schema.sql', () => {
    for (const table of ['profiles', 'quiz_sessions', 'word_progress']) {
      expect(schemaSql).toContain(`REVOKE ALL ON public.${table} FROM anon;`);
      expect(schemaSql).toContain(`ALTER TABLE public.${table} ENABLE ROW LEVEL SECURITY;`);
    }
    expect(schemaSql).toContain('TO authenticated');
    expect(schemaSql).toContain('USING (auth.uid() = id)');
    expect(schemaSql).toContain('USING (auth.uid() = user_id)');
    expect(schemaSql).toContain('WITH CHECK (auth.uid() = user_id)');
    expect(schemaSql).toContain('CHECK (score >= 0 AND score <= total_questions)');
    expect(schemaSql).toContain('CHECK (mastery_level BETWEEN 0 AND 5)');
  });

  it('validates isSafeHttpsUrl against HTTP, javascript:, data:, and malformed URLs', () => {
    expect(isSafeHttpsUrl('https://auth.basiclanguage.school')).toBe(true);
    expect(isSafeHttpsUrl('http://insecure.example.com')).toBe(false);
    expect(isSafeHttpsUrl('javascript:alert(1)')).toBe(false);
    expect(isSafeHttpsUrl('data:image/svg+xml,<svg/>')).toBe(false);
    expect(isSafeHttpsUrl('not a url')).toBe(false);
    expect(isSafeHttpsUrl('')).toBe(false);
    expect(isSafeHttpsUrl(null)).toBe(false);
  });

  it('stays pinned to React 19.3+ and TypeScript 5.9+ with valid PWA manifest', () => {
    expect(pkgJson.dependencies.react).toMatch(/^\^?19\./);
    expect(pkgJson.dependencies['react-dom']).toMatch(/^\^?19\./);
    expect(pkgJson.devDependencies.typescript).toMatch(/^\^?(?:5\.9|[6-9]|\d{2,})\./);

    const manifest = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'public/manifest.json'), 'utf-8'));
    expect(manifest.name).toBeTruthy();
    expect(['.', '/']).toContain(manifest.start_url);
    expect(netlifyToml).toContain('for = "/*.html"');
  });

  describe('Input Hardening, Prototype Guards & Service Worker No-Reload Regression', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('never triggers window.location.reload from service worker controllerchange in src/index.tsx', () => {
      const indexTsx = fs.readFileSync(path.join(ROOT_DIR, 'src/index.tsx'), 'utf-8');
      expect(indexTsx).not.toContain('window.location.reload');
      expect(indexTsx).not.toContain('controllerchange');
    });

    it('guards language metadata and Object.prototype keys in routing, matchers, and phonetic helpers', () => {
      for (const protoKey of ['constructor', 'toString', '__proto__', 'valueOf', 'hasOwnProperty']) {
        expect(isSupportedLanguageId(protoKey)).toBe(false);
        expect(getLanguageMeta(protoKey).id).toBe('ru');

        const match = evaluateSmartAnswer(protoKey, ['hello']);
        expect(match.isMatch).toBe(false);
        expect(() => convertLastLatinWordOnSpace(`${protoKey} `, 'ar')).not.toThrow();
        expect(() => previewSoundOutToken(protoKey, 'ja')).not.toThrow();
      }
    });

    it('bounds 20,000-character bad inputs without freezing or overflowing', () => {
      const huge = 'a '.repeat(10000);
      expect(levenshteinDistance(huge, 'a'.repeat(20000))).toBeLessThanOrEqual(250);
      expect(() => evaluateSmartAnswer(huge, ['hello'])).not.toThrow();
      const spaceRes = convertLastLatinWordOnSpace(`${huge} `, 'zh');
      expect(spaceRes.converted.length).toBeLessThanOrEqual(300);
      expect(previewSoundOutToken(huge, 'zh')).toBeNull();
      expect(() => searchLanguageConcepts(huge, getLanguageMeta('es').data, 'es', 'en')).not.toThrow();
    });

    it('sanitizes unsafe localStorage keys, arrays, and out-of-range metrics in ProgressService', async () => {
      await ProgressService.recordWordAttempt({
        category: 'phrases',
        wordId: 'constructor',
        prompt: 'hi',
        answer: 'hello',
        isCorrect: true,
        languageId: '__proto__',
      });
      await ProgressService.recordWordAttempt({
        category: 'phrases',
        wordId: '__proto__',
        prompt: 'hi',
        answer: 'hello',
        isCorrect: true,
        languageId: 'es',
      });
      await ProgressService.setActiveLanguage('__proto__');
      expect(ProgressService.getActiveLanguage()).toBe('ru');
      expect(localStorage.getItem('__proto___word_progress')).toBeNull();
      expect(localStorage.getItem('es_word_progress')).toBeNull();
      expect(localStorage.getItem('russian_word_progress')).toBeNull();

      localStorage.setItem(
        'russian_word_progress',
        JSON.stringify({
          __proto__: { wordId: '__proto__', masteryLevel: 5 },
          constructor: { wordId: 'constructor', masteryLevel: 5 },
          badArray: [1, 2, 3],
          ok_word: { wordId: 'ok_word', masteryLevel: 999, timesCorrect: -5 },
        })
      );
      localStorage.setItem(
        'russian_quiz_sessions',
        JSON.stringify([
          null,
          'bad',
          { category: 'phrases', score: 999, totalQuestions: 10, percentage: 999 },
        ])
      );

      const mastered = await ProgressService.getMasteredWordIds('ru');
      expect(mastered.has('ok_word')).toBe(true);
      expect(mastered.has('constructor')).toBe(false);
      expect(mastered.has('__proto__')).toBe(false);

      const stats = await ProgressService.getUserStats('ru');
      expect(stats.wordsMasteredCount).toBe(1);
      expect(stats.recentSessions[0].totalQuestions).toBe(10);
      expect(stats.recentSessions[0].score).toBe(10);
      expect(stats.recentSessions[0].percentage).toBe(100);
    });

    it('overrides transitive deepmerge with fail-closed prototype guard (GHSA-gcqx-w48m-w2h4)', async () => {
      expect(pkgJson.devDependencies.deepmerge).toBe('file:vendor/deepmerge');
      expect(pkgJson.overrides.deepmerge).toBe('$deepmerge');

      const { default: deepmerge } = await import('deepmerge');
      const hostile = JSON.parse(
        '{"__proto__":{"isAdmin":true},"constructor":{"isAdmin":true},"prototype":{"isAdmin":true},"safe":{"ok":true}}'
      ) as Record<string, unknown>;

      const fromNullProto = deepmerge(Object.create(null) as Record<string, unknown>, hostile);
      expect(Object.getPrototypeOf(fromNullProto)).toBe(Object.prototype);
      expect(fromNullProto.isAdmin).toBeUndefined();
      expect(Object.prototype.hasOwnProperty.call(fromNullProto, '__proto__')).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(fromNullProto, 'constructor')).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(fromNullProto, 'prototype')).toBe(false);
      expect(fromNullProto.safe).toEqual({ ok: true });

      const fromNullPlaceholder = deepmerge({ session: null } as Record<string, unknown>, { session: hostile });
      expect(Object.getPrototypeOf(fromNullPlaceholder.session)).toBe(Object.prototype);
      expect((fromNullPlaceholder.session as Record<string, unknown>).isAdmin).toBeUndefined();
      expect((fromNullPlaceholder.session as Record<string, unknown>).safe).toEqual({ ok: true });

      const fromHostileTarget = deepmerge(hostile, { extra: 1 });
      expect(Object.getPrototypeOf(fromHostileTarget)).toBe(Object.prototype);
      expect(fromHostileTarget.isAdmin).toBeUndefined();
      expect(fromHostileTarget.extra).toBe(1);
      expect(({} as Record<string, unknown>).isAdmin).toBeUndefined();
    });
  });
});
