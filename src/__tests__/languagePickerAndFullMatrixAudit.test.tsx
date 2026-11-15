import fs from 'fs';
import path from 'path';
import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, within, act, cleanup } from '@testing-library/react';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { SupportedLanguageId } from '../data/languages/types';
import { detectDeviceLanguage, detectInitialLanguagePair } from '../utils/localeDetection';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import MobileDrawer from '../components/MobileDrawer';
import { UI_TRANSLATIONS } from '../data/translations';
import {
  resolveTranslation,
  extractDigit,
  LANGUAGE_NAMES_IN_BASE,
  buildQuizQuestionHint,
} from '../utils/translationResolver';
import {
  getLocalizedLanguageName,
  getComponentChrome,
  getAlphabetLabels,
  getPageContent,
} from '../utils/pageDictionary';

const ALL_LANGS: SupportedLanguageId[] = [
  'en', 'es', 'fr', 'de', 'pt', 'ru', 'id', 'tr',
  'zh', 'ja', 'ko', 'hi', 'ar', 'bn', 'ur',
];

const NON_LATIN_BASES: SupportedLanguageId[] = ['ru', 'zh', 'ja', 'ko', 'hi', 'ar', 'bn', 'ur'];

// Script-neutral loanwords/abbreviations valid as ASCII in non-Latin scripts
const ALLOWED_ASCII_TOKENS = /^(OK|Wi-Fi|DNA|TV|ID|ATM|GPS|USB|PDF|VIP|APP|App|Email|E-mail|Internet|Taxi|Hotel|Menu|Bus|Metro|Radio|Video|Pizza|Coffee|Cafe|Café|Taxi \/ Cab|Hotel \/ Inn|T-shirt|Jeans|Computer|Laptop|Robot|Sport|Bank|Park|Bar|Golf|Tennis)$/i;

const RECENT_PAIRS_STORAGE_KEY = 'basic_language_recent_pairs';

describe('Language Picker Setup, Routing & Full 210-Pair Cross-Language Audit', () => {
  let originalLanguagesDesc: PropertyDescriptor | undefined;
  let originalLanguageDesc: PropertyDescriptor | undefined;

  beforeEach(() => {
    localStorage.clear();
    window.history.pushState({}, '', '/');
    originalLanguagesDesc = Object.getOwnPropertyDescriptor(window.navigator, 'languages');
    originalLanguageDesc = Object.getOwnPropertyDescriptor(window.navigator, 'language');
  });

  afterEach(() => {
    cleanup();
    if (originalLanguagesDesc) {
      Object.defineProperty(window.navigator, 'languages', originalLanguagesDesc);
    }
    if (originalLanguageDesc) {
      Object.defineProperty(window.navigator, 'language', originalLanguageDesc);
    }
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  });

  const mockNavigatorLocales = (locales: string[]) => {
    Object.defineProperty(window.navigator, 'languages', {
      configurable: true,
      value: locales,
    });
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: locales[0] || 'en-US',
    });
  };

  describe('1. All 15 Device Locales, Legacy Codes & Explicit URL Collision Preservation', () => {
    const LOCALE_CASES: Array<{
      locales: string[];
      expectedBase: SupportedLanguageId;
      expectedTarget: SupportedLanguageId;
    }> = [
      { locales: ['en-US', 'en'], expectedBase: 'en', expectedTarget: 'ru' },
      { locales: ['es-MX', 'es'], expectedBase: 'es', expectedTarget: 'en' },
      { locales: ['fr-CA', 'fr'], expectedBase: 'fr', expectedTarget: 'en' },
      { locales: ['ru-RU', 'ru'], expectedBase: 'ru', expectedTarget: 'en' },
      { locales: ['pt_BR', 'pt'], expectedBase: 'pt', expectedTarget: 'en' },
      { locales: ['de-DE', 'de'], expectedBase: 'de', expectedTarget: 'en' },
      { locales: ['id-ID', 'id'], expectedBase: 'id', expectedTarget: 'en' },
      { locales: ['in-ID', 'in'], expectedBase: 'id', expectedTarget: 'en' },
      { locales: ['tr-TR', 'tr'], expectedBase: 'tr', expectedTarget: 'en' },
      { locales: ['zh-Hant-TW', 'zh'], expectedBase: 'zh', expectedTarget: 'en' },
      { locales: ['ja-JP', 'ja'], expectedBase: 'ja', expectedTarget: 'en' },
      { locales: ['ko-KR', 'ko'], expectedBase: 'ko', expectedTarget: 'en' },
      { locales: ['hi-IN', 'hi'], expectedBase: 'hi', expectedTarget: 'en' },
      { locales: ['ar-SA', 'ar'], expectedBase: 'ar', expectedTarget: 'en' },
      { locales: ['bn-BD', 'bn'], expectedBase: 'bn', expectedTarget: 'en' },
      { locales: ['ur-PK', 'ur'], expectedBase: 'ur', expectedTarget: 'en' },
    ];

    it.each(LOCALE_CASES)(
      'detects locale $locales -> base=$expectedBase, target=$expectedTarget',
      ({ locales, expectedBase, expectedTarget }) => {
        mockNavigatorLocales(locales);
        expect(detectDeviceLanguage()).toBe(expectedBase);

        const initial = detectInitialLanguagePair();
        expect(initial.baseLanguage).toBe(expectedBase);
        expect(initial.targetLanguage).toBe(expectedTarget);
        expect(initial.baseLanguage).not.toBe(initial.targetLanguage);
      }
    );

    it('falls back to English for unknown browser locales and never collides', () => {
      mockNavigatorLocales(['xx-ZZ', 'tlh']);
      expect(detectDeviceLanguage()).toBe('en');
      const pair = detectInitialLanguagePair();
      expect(pair).toEqual({ baseLanguage: 'en', targetLanguage: 'ru' });
    });

    it('preserves explicit URL target course when it collides with device locale or saved base', () => {
      // Case A: German device locale opening /learn/de
      mockNavigatorLocales(['de-DE']);
      window.history.pushState({}, '', '/learn/de');
      expect(detectInitialLanguagePair()).toEqual({ baseLanguage: 'en', targetLanguage: 'de' });

      // Case B: English device locale opening /learn/en
      mockNavigatorLocales(['en-US']);
      window.history.pushState({}, '', '/learn/en');
      expect(detectInitialLanguagePair()).toEqual({ baseLanguage: 'es', targetLanguage: 'en' });

      // Case C: Saved localStorage base=es, target=fr opening /learn/es (adjusts base to saved target 'fr')
      localStorage.setItem('basic_language_base_lang', 'es');
      localStorage.setItem('basic_language_target_lang', 'fr');
      window.history.pushState({}, '', '/learn/es');
      expect(detectInitialLanguagePair()).toEqual({ baseLanguage: 'fr', targetLanguage: 'es' });

      // Case D: Japanese device locale opening /learn/ja
      localStorage.clear();
      mockNavigatorLocales(['ja-JP']);
      window.history.pushState({}, '', '/learn/ja');
      expect(detectInitialLanguagePair()).toEqual({ baseLanguage: 'en', targetLanguage: 'ja' });
    });

    it('keeps (baseLanguage, targetLanguage) collision-free across popstate back/forward navigation', async () => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'fr');
      window.history.pushState({}, '', '/learn/fr');

      const StateReadout: React.FC = () => {
        const { baseLanguage, targetLanguage } = useLanguage();
        return <div data-testid="popstate-pair">{`${baseLanguage}->${targetLanguage}`}</div>;
      };

      render(
        <LanguageProvider>
          <StateReadout />
        </LanguageProvider>
      );

      expect(screen.getByTestId('popstate-pair').textContent).toBe('en->fr');

      // Navigate to /learn/de -> keeps base=en, target=de
      await act(async () => {
        window.history.pushState({}, '', '/learn/de');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
      expect(screen.getByTestId('popstate-pair').textContent).toBe('en->de');

      // Navigate back/forward to /learn/en while base was 'en' -> flips base to prev target 'de'
      await act(async () => {
        window.history.pushState({}, '', '/learn/en');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
      expect(screen.getByTestId('popstate-pair').textContent).toBe('de->en');

      // Navigate back to /learn/fr -> keeps base='de', target='fr'
      await act(async () => {
        window.history.pushState({}, '', '/learn/fr');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
      expect(screen.getByTestId('popstate-pair').textContent).toBe('de->fr');
    });
  });

  describe('2. Interactive LanguageSwitcher & MobileDrawer Pair Setup Transitions', () => {
    const PairProbe: React.FC = () => {
      const { baseLanguage, targetLanguage, ui } = useLanguage();
      return <div data-testid="picker-pair">{`${baseLanguage}->${targetLanguage}:${ui.quiz}`}</div>;
    };

    it('switches EN->FR to ES->EN via quick-pair chip without stale closure clobbering', () => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'fr');
      localStorage.setItem(
        RECENT_PAIRS_STORAGE_KEY,
        JSON.stringify([
          { base: 'es', target: 'en' },
          { base: 'en', target: 'fr' },
        ])
      );

      const onLangChange = vi.fn();
      render(
        <LanguageProvider>
          <LanguageSwitcher onLanguageChange={onLangChange} />
          <PairProbe />
        </LanguageProvider>
      );

      expect(screen.getByTestId('picker-pair').textContent).toContain('en->fr:');

      fireEvent.click(screen.getByRole('button', { name: /Current language pair/i }));
      const dialog = screen.getByRole('dialog', { name: 'Language selection modal' });
      fireEvent.click(within(dialog).getByRole('button', { name: /^Switch to pair ES to EN\b/ }));

      expect(screen.getByTestId('picker-pair').textContent).toBe(`es->en:${UI_TRANSLATIONS.es.quiz}`);
      expect(onLangChange).toHaveBeenCalledWith('en');
      expect(screen.queryByRole('dialog', { name: 'Language selection modal' })).toBeNull();
    });

    it('flips EN->FR to FR->EN cleanly when clicking English in "I want to learn" and never writes EN->EN recent pair', () => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'fr');

      const onLangChange = vi.fn();
      render(
        <LanguageProvider>
          <LanguageSwitcher onLanguageChange={onLangChange} />
          <PairProbe />
        </LanguageProvider>
      );

      fireEvent.click(screen.getByRole('button', { name: /Current language pair/i }));
      const dialog = screen.getByRole('dialog', { name: 'Language selection modal' });

      // Ensure HIGH_AFFINITY_CORRIDORS.en includes Indonesian in Suggested chips
      expect(within(dialog).getByRole('button', { name: 'Learn Indonesian' })).toBeTruthy();

      // Default active tab is "I want to learn"; click English
      fireEvent.click(within(dialog).getByRole('menuitem', { name: /English/i }));

      expect(screen.getByTestId('picker-pair').textContent).toBe(`fr->en:${UI_TRANSLATIONS.fr.quiz}`);
      expect(onLangChange).toHaveBeenCalledWith('en');

      const recentRaw = localStorage.getItem(RECENT_PAIRS_STORAGE_KEY);
      expect(recentRaw).toBeTruthy();
      const recentPairs = JSON.parse(recentRaw!) as Array<{ base: string; target: string }>;
      expect(recentPairs[0]).toEqual({ base: 'fr', target: 'en' });
      expect(recentPairs.some(p => p.base === p.target)).toBe(false);
    });

    it('preserves French target while switching "I speak" across id/ar/ur/de, swaps when selecting fr, and keeps RTL/LTR dir synced', () => {
      localStorage.setItem('basic_language_base_lang', 'ru');
      localStorage.setItem('basic_language_target_lang', 'fr');

      const onLangChange = vi.fn();
      render(
        <LanguageProvider>
          <LanguageSwitcher onLanguageChange={onLangChange} />
          <MobileDrawer
            isOpen={true}
            onClose={() => {}}
            onNavigate={() => {}}
            onLanguageChange={onLangChange}
          />
          <PairProbe />
        </LanguageProvider>
      );

      expect(screen.getByTestId('picker-pair').textContent).toBe(`ru->fr:${UI_TRANSLATIONS.ru.quiz}`);

      fireEvent.click(screen.getByRole('button', { name: /Current language pair/i }));
      const dialog = screen.getByRole('dialog', { name: 'Language selection modal' });

      // Click "I speak" tab (localized in Russian: UI_TRANSLATIONS.ru.iSpeak)
      fireEvent.click(within(dialog).getByRole('button', { name: new RegExp(`^${UI_TRANSLATIONS.ru.iSpeak}`) }));

      // Switch base -> Indonesian ('id')
      fireEvent.click(within(dialog).getByRole('menuitem', { name: /Bahasa Indonesia/i }));
      expect(screen.getByTestId('picker-pair').textContent).toBe(`id->fr:${UI_TRANSLATIONS.id.quiz}`);
      expect(document.documentElement.dir).toBe('ltr');

      // Switch base -> Arabic ('ar') -> RTL
      fireEvent.click(within(dialog).getByRole('menuitem', { name: /العربية/i }));
      expect(screen.getByTestId('picker-pair').textContent).toBe(`ar->fr:${UI_TRANSLATIONS.ar.quiz}`);
      expect(document.documentElement.dir).toBe('rtl');

      // Switch base -> Urdu ('ur') -> RTL
      fireEvent.click(within(dialog).getByRole('menuitem', { name: /اردو/i }));
      expect(screen.getByTestId('picker-pair').textContent).toBe(`ur->fr:${UI_TRANSLATIONS.ur.quiz}`);
      expect(document.documentElement.dir).toBe('rtl');

      // Switch base -> German ('de') -> LTR
      fireEvent.click(within(dialog).getByRole('menuitem', { name: /Deutsch/i }));
      expect(screen.getByTestId('picker-pair').textContent).toBe(`de->fr:${UI_TRANSLATIONS.de.quiz}`);
      expect(document.documentElement.dir).toBe('ltr');

      // Select French ('fr') in "I speak" while learning French -> swaps cleanly to fr->de
      fireEvent.click(within(dialog).getByRole('menuitem', { name: /Français/i }));
      expect(screen.getByTestId('picker-pair').textContent).toBe(`fr->de:${UI_TRANSLATIONS.fr.quiz}`);
      expect(onLangChange).toHaveBeenCalledWith('de');

      // Test modal swap button -> flips fr->de to de->fr
      fireEvent.click(within(dialog).getByRole('button', { name: 'Swap native and learning languages' }));
      expect(screen.getByTestId('picker-pair').textContent).toBe(`de->fr:${UI_TRANSLATIONS.de.quiz}`);
      expect(onLangChange).toHaveBeenCalledWith('fr');

      // Close modal and test navbar quick-swap -> flips de->fr to fr->de
      fireEvent.click(within(dialog).getByRole('button', { name: 'Close modal' }));
      const headerSwap = document.querySelector('.quick-swap-nav-btn') as HTMLButtonElement;
      expect(headerSwap).toBeTruthy();
      fireEvent.click(headerSwap);
      expect(screen.getByTestId('picker-pair').textContent).toBe(`fr->de:${UI_TRANSLATIONS.fr.quiz}`);
      expect(onLangChange).toHaveBeenCalledWith('de');

      // Test MobileDrawer swap -> flips fr->de back to de->fr
      const drawer = screen.getByRole('dialog', { name: 'Settings and options menu' });
      fireEvent.click(within(drawer).getByRole('button', { name: 'Swap language pair' }));
      expect(screen.getByTestId('picker-pair').textContent).toBe(`de->fr:${UI_TRANSLATIONS.de.quiz}`);
      expect(onLangChange).toHaveBeenCalledWith('fr');

      const storedRecent = JSON.parse(localStorage.getItem(RECENT_PAIRS_STORAGE_KEY) || '[]') as Array<{ base: string; target: string }>;
      expect(storedRecent.some(p => p.base === p.target)).toBe(false);
    });
  });

  describe('3. Exhaustive 15 × 14 = 210 Cross-Language Mapping & Homograph Matrix', () => {
    it('verifies UI chrome, page dictionaries, LANGUAGE_NAMES_IN_BASE, hints, numbers, and translations across all 210 pairs', () => {
      const uiIssues: string[] = [];
      const translationIssues: string[] = [];
      const numberMismatches: string[] = [];
      const asciiLeaks: string[] = [];

      let pairCount = 0;

      for (const baseLang of ALL_LANGS) {
        const ui = UI_TRANSLATIONS[baseLang];
        const chrome = getComponentChrome(baseLang);
        const alphaLabels = getAlphabetLabels(baseLang);

        if (!ui || !ui.quiz || !ui.iSpeak || !ui.iWantToLearn) {
          uiIssues.push(`Missing core UI_TRANSLATIONS for base=${baseLang}`);
        }
        if (!chrome?.progressModalTitle || !chrome?.signIn) {
          uiIssues.push(`Missing getComponentChrome for base=${baseLang}`);
        }
        if (!alphaLabels?.sound || !alphaLabels?.example || !alphaLabels?.asIn) {
          uiIssues.push(`Missing getAlphabetLabels for base=${baseLang}`);
        }

        for (const targetLang of ALL_LANGS) {
          if (baseLang === targetLang) continue;
          pairCount += 1;

          const baseNameMap = LANGUAGE_NAMES_IN_BASE[baseLang];
          const targetNameInBase = baseNameMap?.[targetLang];
          if (!targetNameInBase) {
            uiIssues.push(`Missing LANGUAGE_NAMES_IN_BASE[${baseLang}][${targetLang}]`);
          }

          const targetMeta = SUPPORTED_LANGUAGES[targetLang];
          const localizedName = getLocalizedLanguageName(targetLang, baseLang, targetMeta.name);
          if (!localizedName || !localizedName.trim()) {
            uiIssues.push(`Empty getLocalizedLanguageName(${targetLang}, ${baseLang})`);
          }

          for (const sec of ['alphabet', 'phrases', 'words', 'numbers', 'time', 'quiz'] as const) {
            const pc = getPageContent(sec, targetLang, baseLang);
            if (!pc.title.trim() || !pc.subtitle.trim()) {
              uiIssues.push(`Empty getPageContent(${sec}, ${targetLang}, ${baseLang})`);
            }
          }

          const hintTarget = buildQuizQuestionHint('Hola', true, targetLang, baseLang);
          const hintBase = buildQuizQuestionHint('Hello', false, targetLang, baseLang);
          if (!hintTarget.includes('Hola') || !hintBase.includes('Hello')) {
            uiIssues.push(`Broken quiz hint for ${baseLang}->${targetLang}`);
          }

          const data = targetMeta.data;
          const sections = ['alphabet', 'basicPhrases', 'commonWords', 'numbers', 'time'] as const;

          for (const section of sections) {
            const items = data[section] || [];
            for (const item of items) {
              const resolved = resolveTranslation(item as any, targetLang, baseLang).trim();
              if (!resolved) {
                translationIssues.push(`[${baseLang}<-${targetLang} ${section}] empty translation`);
                continue;
              }

              // Check no raw English glossary category tags leaked to non-English speakers
              if (baseLang !== 'en' && /^(Noun|Verb|Adjective|Adverb|Color|Preposition):/i.test(resolved)) {
                translationIssues.push(`[${baseLang}<-${targetLang} ${section}] English tag prefix leak: "${resolved}"`);
              }

              // Check no raw phonetic IPA notation (/.../) leaked into translation output
              if (/\/[a-zæɑɒɔəɛɜɡɪʃʊʌʒθðŋɾʁɲˈˌː]{2,}\//i.test(resolved)) {
                translationIssues.push(`[${baseLang}<-${targetLang} ${section}] IPA slash leak: "${resolved}"`);
              }

              // Check cardinal numbers preserve exact numeric digit across all 210 pairs
              if (section === 'numbers' && !(targetLang === 'en' && (item as any).category === 'Time')) {
                const rawSrc = (
                  (item as any).english ||
                  (item as any).translation ||
                  (item as any).phrase ||
                  (item as any).russian ||
                  ''
                ).toString();
                const expectedDigit = extractDigit(rawSrc);
                const actualDigit = extractDigit(resolved);
                if (expectedDigit === null || expectedDigit !== actualDigit) {
                  numberMismatches.push(
                    `[${baseLang}<-${targetLang}] "${rawSrc}" expected digit ${expectedDigit}, got "${resolved}" (${actualDigit})`
                  );
                }
              }

              // Check non-Latin base languages never receive untranslated ASCII English fallbacks (including timed phrases)
              if (
                NON_LATIN_BASES.includes(baseLang) &&
                /[a-zA-Z]/.test(resolved) &&
                /^[a-zA-Z0-9\s,.'?!:/()-]+$/.test(resolved) &&
                !ALLOWED_ASCII_TOKENS.test(resolved)
              ) {
                asciiLeaks.push(`[${baseLang}<-${targetLang} ${section}] ASCII leak: "${resolved}"`);
              }
            }
          }
        }
      }

      expect(pairCount).toBe(210);
      expect(uiIssues).toEqual([]);
      expect(translationIssues.slice(0, 30)).toEqual([]);
      expect(translationIssues.length).toBe(0);
      expect(numberMismatches.slice(0, 30)).toEqual([]);
      expect(numberMismatches.length).toBe(0);
      expect(asciiLeaks.slice(0, 30)).toEqual([]);
      expect(asciiLeaks.length).toBe(0);
    }, 30000);

    it('never confuses false-friend homographs (fr Pain, id Air, id Bir, de Tag/Kind/See) across any base language', () => {
      const frPainAlpha = SUPPORTED_LANGUAGES.fr.data.alphabet.find(a => a.word === 'Pain')!;
      const frPainWord = SUPPORTED_LANGUAGES.fr.data.commonWords.find(w => w.phrase === 'Pain')!;
      const idAirAlpha = SUPPORTED_LANGUAGES.id.data.alphabet.find(a => a.word === 'Air')!;
      const idAirPhrase = SUPPORTED_LANGUAGES.id.data.basicPhrases.find(p => p.phrase === 'Air')
        || SUPPORTED_LANGUAGES.id.data.commonWords.find(w => w.phrase === 'Air')!;
      const idBirWord = SUPPORTED_LANGUAGES.id.data.commonWords.find(w => w.phrase === 'Bir')!;
      const deTagAlpha = SUPPORTED_LANGUAGES.de.data.alphabet.find(a => a.word === 'Tag')!;
      const deKindWord = SUPPORTED_LANGUAGES.de.data.commonWords.find(w => w.phrase === 'Kind')!;
      const deSeeWord = SUPPORTED_LANGUAGES.de.data.commonWords.find(w => w.phrase === 'See')!;

      expect(frPainAlpha).toBeDefined();
      expect(frPainWord).toBeDefined();
      expect(idAirAlpha).toBeDefined();
      expect(idAirPhrase).toBeDefined();
      expect(idBirWord).toBeDefined();
      expect(deTagAlpha).toBeDefined();
      expect(deKindWord).toBeDefined();
      expect(deSeeWord).toBeDefined();

      // Spot-check exact canonical meanings in representative languages
      expect(resolveTranslation(frPainAlpha, 'fr', 'en')).toBe('Bread');
      expect(resolveTranslation(frPainAlpha, 'fr', 'es')).toBe('Pan');
      expect(resolveTranslation(frPainAlpha, 'fr', 'de')).toBe('Brot');
      expect(resolveTranslation(frPainAlpha, 'fr', 'zh')).toBe('面包');

      for (const baseLang of ALL_LANGS) {
        if (baseLang !== 'fr') {
          const expectedBread = resolveTranslation({ phrase: 'Bread', english: 'Bread' }, 'en', baseLang);
          expect(resolveTranslation(frPainAlpha, 'fr', baseLang)).toBe(expectedBread);
          expect(resolveTranslation(frPainWord, 'fr', baseLang)).toBe(expectedBread);
        }

        if (baseLang !== 'id') {
          const expectedWater = resolveTranslation({ phrase: 'Water', english: 'Water' }, 'en', baseLang);
          expect(resolveTranslation(idAirAlpha, 'id', baseLang)).toBe(expectedWater);
          expect(resolveTranslation(idAirPhrase, 'id', baseLang)).toBe(expectedWater);

          const resolvedBir = resolveTranslation(idBirWord, 'id', baseLang);
          const expectedBeer = resolveTranslation({ phrase: 'Beer', english: 'Beer' }, 'en', baseLang);
          expect(resolvedBir).toBe(expectedBeer);
          expect(resolvedBir).not.toMatch(/^1\s/);
        }

        if (baseLang !== 'de') {
          expect(resolveTranslation(deTagAlpha, 'de', baseLang)).toBe(
            resolveTranslation({ phrase: 'Day', english: 'Day' }, 'en', baseLang)
          );
          expect(resolveTranslation(deKindWord, 'de', baseLang)).toBe(
            resolveTranslation({ phrase: 'Child', english: 'Child' }, 'en', baseLang)
          );
          expect(resolveTranslation(deSeeWord, 'de', baseLang)).toBe(
            resolveTranslation({ phrase: 'Lake', english: 'Lake' }, 'en', baseLang)
          );
        }
      }
    });
  });

  describe('4. French Studio fr-FR-HenriNeural MP3 & Offline Manifest Integrity', () => {
    it('confirms the 4 unified French MP3s exist on disk and match manifest.json byte totals', () => {
      const frAudioDir = path.resolve(__dirname, '../../public/audio/fr');
      const manifestPath = path.join(frAudioDir, 'manifest.json');
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8')) as {
        lang: string;
        fileCount: number;
        totalBytes: number;
        files: string[];
        sizes: number[];
      };

      expect(manifest.lang).toBe('fr');
      expect(manifest.fileCount).toBe(1162);
      expect(manifest.totalBytes).toBe(13805568);
      expect(manifest.files.length).toBe(manifest.fileCount);
      expect(manifest.sizes.length).toBe(manifest.fileCount);

      const unifiedFiles = [
        'phrases/je_mappelle.mp3',
        'words/aujourdhui.mp3',
        'phrases/laddition_sil_vous_plait.mp3',
        'phrases/sil_vous_plait.mp3',
      ];

      for (const relPath of unifiedFiles) {
        const idx = manifest.files.indexOf(relPath);
        expect(idx).toBeGreaterThanOrEqual(0);

        const fullPath = path.join(frAudioDir, relPath);
        expect(fs.existsSync(fullPath)).toBe(true);
        const stat = fs.statSync(fullPath);
        expect(stat.size).toBeGreaterThan(5000);
        expect(stat.size).toBe(manifest.sizes[idx]);
      }

      const computedSum = manifest.sizes.reduce((sum, sz) => sum + sz, 0);
      expect(computedSum).toBe(manifest.totalBytes);
    });
  });
});
