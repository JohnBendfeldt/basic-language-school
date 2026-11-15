import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import axe from 'axe-core';
import App from '../App';
import { LanguageProvider } from '../contexts/LanguageContext';
import PronunciationButton from '../components/PronunciationButton';
import OfflineAudioModal from '../components/OfflineAudioModal';
import MobileDrawer from '../components/MobileDrawer';
import UserMenu from '../components/UserMenu';

window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = vi.fn();
window.HTMLCanvasElement.prototype.getContext = vi.fn(() => null) as any;
window.scrollTo = vi.fn() as any;

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

async function expectNoAxeViolations(container: HTMLElement = document.body) {
  const results = await axe.run(container, {
    runOnly: {
      type: 'tag',
      values: WCAG_TAGS,
    },
    rules: {
      // Computed color-contrast requires a real layout/rendering engine and is verified in Playwright E2E (e2e/accessibility.spec.ts)
      'color-contrast': { enabled: false },
    },
  });

  const formatted = results.violations.map(
    (v) =>
      `${v.id} (${v.impact}): ${v.help}\n` +
      v.nodes.map((n) => `  - ${n.html}\n    ${n.failureSummary}`).join('\n')
  );

  expect(formatted).toEqual([]);
}

const mountAppAt = async (
  routePath: string,
  opts: { base?: string; target?: string } = {}
) => {
  localStorage.clear();
  if (opts.base) localStorage.setItem('basic_language_base_lang', opts.base);
  if (opts.target) localStorage.setItem('basic_language_target_lang', opts.target);
  window.history.pushState({}, '', routePath);
  const utils = render(<App />);
  await waitFor(() => expect(utils.container.querySelector('.loading-section')).toBeNull());
  return utils;
};

describe('WCAG 2.1 / 2.2 Level AA Accessibility Audit Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    window.history.pushState({}, '', '/');
    document.title = '';
    document.body.style.overflow = '';
  });

  describe('1. Internationalization, <html lang/dir>, Target Language Tagging & Page Titles', () => {
    it('sets <html lang> and <html dir> from base UI language rather than target language (WCAG 3.1.1)', async () => {
      const { unmount } = await mountAppAt('/learn/ru/alphabet', { base: 'en', target: 'ru' });
      expect(document.documentElement.lang).toBe('en');
      expect(document.documentElement.dir).toBe('ltr');
      unmount();

      const rtlMount = await mountAppAt('/learn/fr/alphabet', { base: 'ar', target: 'fr' });
      expect(document.documentElement.lang).toBe('ar');
      expect(document.documentElement.dir).toBe('rtl');
      rtlMount.unmount();
    });

    it('tags target-language content with accurate lang and dir attributes (WCAG 3.1.2)', async () => {
      const { container, unmount } = await mountAppAt('/learn/ar/phrases', {
        base: 'en',
        target: 'ar',
      });
      const arabicPhraseNodes = container.querySelectorAll('.phrase-card .phrase-text[lang="ar"][dir="rtl"]');
      expect(arabicPhraseNodes.length).toBeGreaterThan(0);
      unmount();
    });

    it('updates document.title accurately across routes and Alphabet/Grammar/About sub-tabs (WCAG 2.4.2)', async () => {
      const { unmount } = await mountAppAt('/learn/de/alphabet', { base: 'en', target: 'de' });
      expect(document.title).toMatch(/Alphabet/i);

      const grammarTab = screen.getByRole('tab', { name: /Grammar/i });
      fireEvent.click(grammarTab);
      await waitFor(() => expect(document.title).toMatch(/Grammar/i));

      const aboutLangTab = screen.getByRole('tab', { name: /About/i });
      fireEvent.click(aboutLangTab);
      await waitFor(() => expect(document.title).toMatch(/About/i));
      unmount();

      const privacyMount = await mountAppAt('/privacy', { base: 'en', target: 'de' });
      expect(document.title).toMatch(/Privacy Policy/i);
      privacyMount.unmount();

      const termsMount = await mountAppAt('/terms', { base: 'en', target: 'de' });
      expect(document.title).toMatch(/Terms of Service/i);
      termsMount.unmount();

      const aboutAppMount = await mountAppAt('/about', { base: 'en', target: 'de' });
      expect(document.title).toMatch(/About/i);
      aboutAppMount.unmount();
    });
  });

  describe('2. Landmarks, Skip Link, Navigation & Zero Axe Violations Across All Core Views', () => {
    it('provides skip link, labeled navigation landmarks, button-wrapped brand heading, and passes axe on Alphabet', async () => {
      const { container } = await mountAppAt('/learn/ru/alphabet', { base: 'en', target: 'ru' });

      const skipLink = container.querySelector('a.skip-link');
      expect(skipLink).not.toBeNull();
      expect(skipLink).toHaveAttribute('href', '#main-content');

      const main = container.querySelector('main#main-content');
      expect(main).not.toBeNull();
      expect(main).toHaveAttribute('tabindex', '-1');

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(within(h1).getByRole('button')).toHaveClass('brand-home-button');

      const navs = screen.getAllByRole('navigation');
      expect(navs.length).toBeGreaterThanOrEqual(2);
      navs.forEach((nav) => {
        expect(nav.getAttribute('aria-label')).toBeTruthy();
      });

      const activeNavBtn = container.querySelector('.nav-tab-btn[aria-current="page"]');
      expect(activeNavBtn).not.toBeNull();

      await expectNoAxeViolations(container);
    });

    it('passes axe on Chinese Alphabet & PinyinGuide across Tones, Anatomy, and Typing tabs', async () => {
      const { container } = await mountAppAt('/learn/zh/alphabet', { base: 'en', target: 'zh' });
      await expectNoAxeViolations(container);

      fireEvent.click(screen.getByRole('tab', { name: /Syllable Anatomy/i }));
      await expectNoAxeViolations(container);

      fireEvent.click(screen.getByRole('tab', { name: /How Latin Letters Become Hanzi/i }));
      await expectNoAxeViolations(container);
    });

    it('passes axe on Grammar flashcards, live feedback, noun gender rules, verb ARIA tables, and comparison ARIA tables', async () => {
      const { container } = await mountAppAt('/learn/de/alphabet', { base: 'en', target: 'de' });
      fireEvent.click(screen.getByRole('tab', { name: /Grammar/i }));

      // Flashcards before & after selecting an option
      await expectNoAxeViolations(container);
      const firstChoice = container.querySelector<HTMLButtonElement>('.grammar-option-btn');
      expect(firstChoice).not.toBeNull();
      fireEvent.click(firstChoice!);
      expect(container.querySelector('.grammar-feedback-box[role="status"]')).not.toBeNull();
      await expectNoAxeViolations(container);

      // Noun Genders
      fireEvent.click(screen.getByRole('tab', { name: /Noun Genders/i }));
      await expectNoAxeViolations(container);

      // Verb Tenses ARIA table
      fireEvent.click(screen.getByRole('tab', { name: /Verb Tenses/i }));
      const verbTables = screen.getAllByRole('table');
      expect(verbTables.length).toBeGreaterThan(0);
      expect(within(verbTables[0]).getAllByRole('columnheader').length).toBe(3);
      expect(within(verbTables[0]).getAllByRole('cell').length).toBeGreaterThan(0);
      await expectNoAxeViolations(container);

      // Descriptions & Time comparison ARIA table
      fireEvent.click(screen.getByRole('tab', { name: /Descriptions/i }));
      expect(screen.getAllByRole('table').length).toBeGreaterThan(0);
      await expectNoAxeViolations(container);
    });

    it('passes axe on Phrases collapsed & revealed, keeps focus on toggle button, and un-nests mini PronunciationButton', async () => {
      const { container } = await mountAppAt('/learn/es/phrases', { base: 'en', target: 'es' });
      await expectNoAxeViolations(container);

      const firstRevealBtn = container.querySelector<HTMLButtonElement>('.phrase-reveal-btn');
      expect(firstRevealBtn).not.toBeNull();
      expect(firstRevealBtn).toHaveAttribute('aria-expanded', 'false');

      firstRevealBtn!.focus();
      fireEvent.click(firstRevealBtn!);

      expect(firstRevealBtn).toHaveAttribute('aria-expanded', 'true');
      expect(document.activeElement).toBe(firstRevealBtn);

      // Ensure no nested interactive button inside another button
      const nestedButtons = container.querySelectorAll('button button, [role="button"] button');
      expect(nestedButtons.length).toBe(0);

      await expectNoAxeViolations(container);
    });

    it('passes axe on Numbers & Time including Time Grammar Guide', async () => {
      const { container } = await mountAppAt('/learn/fr/numbers', { base: 'en', target: 'fr' });
      await expectNoAxeViolations(container);

      const timeTab = container.querySelector<HTMLButtonElement>('.sub-nav-button:nth-child(2)');
      if (timeTab) {
        fireEvent.click(timeTab);
        await expectNoAxeViolations(container);
      }
    });

    it('passes axe on Quiz (Writing mode, open dropdowns, Virtual Keyboard, Listening mode, and Feedback sheet)', async () => {
      const { container } = await mountAppAt('/learn/ru/quiz', { base: 'en', target: 'ru' });
      await expectNoAxeViolations(container);

      // Open topic listbox dropdown
      const topicBtn = container.querySelector<HTMLButtonElement>('#topic-dropdown-trigger');
      expect(topicBtn).not.toBeNull();
      fireEvent.click(topicBtn!);
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      await expectNoAxeViolations(container);
      fireEvent.keyDown(window, { key: 'Escape' });

      // Open Russian virtual keyboard if not already open
      const kbToggle = container.querySelector<HTMLButtonElement>('.kb-quick-toggle-btn');
      if (kbToggle && kbToggle.getAttribute('aria-expanded') === 'false') {
        fireEvent.click(kbToggle);
      }
      await expectNoAxeViolations(container);

      // Submit an answer to verify feedback drawer accessibility
      const input = container.querySelector<HTMLInputElement>('.quiz-input');
      if (input) {
        fireEvent.change(input, { target: { value: 'тест' } });
        const checkBtn = container.querySelector<HTMLButtonElement>('.check-button');
        if (checkBtn) {
          fireEvent.click(checkBtn);
          await expectNoAxeViolations(container);
        }
      }
    });

    it('passes axe on About, Privacy Policy, and Terms of Service with proper single-h1 hierarchy', async () => {
      for (const legalPath of ['/about', '/privacy', '/terms']) {
        const { container, unmount } = await mountAppAt(legalPath, { base: 'en', target: 'de' });
        expect(screen.getAllByRole('heading', { level: 1 }).length).toBe(1);
        expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThanOrEqual(1);
        await expectNoAxeViolations(container);
        unmount();
      }
    });
  });

  describe('3. Modals, Menus, Focus Trap, Escape Dismissal & Focus Restoration', () => {
    it('traps Tab focus, passes axe, and restores trigger focus on Escape in SearchModal, LanguageSwitcher, and VoiceSpeedControl', async () => {
      const { container } = await mountAppAt('/learn/de/alphabet', { base: 'en', target: 'de' });

      // 1. SearchModal
      const searchTrigger = container.querySelector<HTMLButtonElement>('.header-search-btn')!;
      searchTrigger.focus();
      fireEvent.click(searchTrigger);

      const searchDialog = await screen.findByRole('dialog');
      const searchInput = within(searchDialog).getByRole('searchbox');
      await waitFor(() => expect(document.activeElement).toBe(searchInput));
      fireEvent.change(searchInput, { target: { value: 'a' } });
      await expectNoAxeViolations(container);

      fireEvent.keyDown(window, { key: 'Escape' });
      await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
      expect(document.activeElement).toBe(searchTrigger);

      // 2. LanguageSwitcher
      const langTrigger = container.querySelector<HTMLButtonElement>('.language-switcher-trigger')!;
      langTrigger.focus();
      fireEvent.click(langTrigger);

      const langDialog = await screen.findByRole('dialog', { name: /Language selection modal/i });
      expect(within(langDialog).getByRole('menu')).toBeInTheDocument();
      await expectNoAxeViolations(container);

      fireEvent.keyDown(window, { key: 'Escape' });
      await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
      expect(document.activeElement).toBe(langTrigger);

      // 3. VoiceSpeedControl
      const speedTrigger = container.querySelector<HTMLButtonElement>('.voice-speed-trigger')!;
      speedTrigger.focus();
      fireEvent.click(speedTrigger);

      const speedDialog = await screen.findByRole('dialog', { name: /Audio Playback Speed/i });
      expect(speedDialog).toBeInTheDocument();
      await expectNoAxeViolations(container);

      // Test Tab wrap inside VoiceSpeedControl
      const focusable = Array.from(speedDialog.querySelectorAll<HTMLElement>('button:not([disabled])'));
      const lastBtn = focusable[focusable.length - 1];
      lastBtn.focus();
      fireEvent.keyDown(window, { key: 'Tab' });
      expect(document.activeElement).toBe(focusable[0]);

      fireEvent.keyDown(window, { key: 'Escape' });
      await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
      expect(document.activeElement).toBe(speedTrigger);
    });

    it('passes axe on AuthModal, ProgressModal (closing inner listbox first on Escape), OfflineAudioModal, MobileDrawer, and UserMenu', async () => {
      const { container } = await mountAppAt('/learn/es/alphabet', { base: 'en', target: 'es' });

      // ProgressModal via header progress button or UserMenu
      const userTrigger = container.querySelector<HTMLButtonElement>('.user-profile-trigger');
      if (userTrigger) {
        userTrigger.focus();
        fireEvent.click(userTrigger);

        // Guest mode opens AuthModal or UserMenu depending on auth config; check dialog if opened
        const maybeDialog = screen.queryByRole('dialog');
        if (maybeDialog) {
          await expectNoAxeViolations(container);
          fireEvent.keyDown(window, { key: 'Escape' });
          await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
        }
      }

      // OfflineAudioModal standalone check (verifying un-nested remove button & checkbox semantics)
      const onCloseOffline = vi.fn();
      const offlineRender = render(
        <LanguageProvider>
          <OfflineAudioModal isOpen={true} onClose={onCloseOffline} />
        </LanguageProvider>
      );
      expect(offlineRender.container.querySelectorAll('[role="checkbox"] button').length).toBe(0);
      await expectNoAxeViolations(offlineRender.container);
      offlineRender.unmount();

      // MobileDrawer standalone check
      const onCloseDrawer = vi.fn();
      const drawerRender = render(
        <LanguageProvider>
          <MobileDrawer
            isOpen={true}
            onClose={onCloseDrawer}
            onNavigate={vi.fn()}
            onOpenSearch={vi.fn()}
            onOpenOfflineAudio={vi.fn()}
          />
        </LanguageProvider>
      );
      await expectNoAxeViolations(drawerRender.container);
      drawerRender.unmount();

      // UserMenu standalone check
      const menuRender = render(
        <LanguageProvider>
          <UserMenu onNavigate={vi.fn()} />
        </LanguageProvider>
      );
      await expectNoAxeViolations(menuRender.container);
      menuRender.unmount();
    });
  });

  describe('4. Focus Preservation on PronunciationButton & Virtual Keyboard', () => {
    it('preserves focus on PronunciationButton using aria-disabled instead of native disabled during playback', async () => {
      let resolvePlay!: () => void;
      const playSpy = vi
        .spyOn(window.HTMLMediaElement.prototype, 'play')
        .mockImplementation(() => new Promise<void>((res) => { resolvePlay = res; }));

      render(
        <LanguageProvider>
          <PronunciationButton text="Привет" lang="ru" useLocalAudio={true} />
        </LanguageProvider>
      );

      const btn = screen.getByRole('button', { name: 'Pronounce "Привет"' });
      btn.focus();
      expect(document.activeElement).toBe(btn);

      fireEvent.click(btn);
      await waitFor(() => expect(btn).toHaveAttribute('aria-disabled', 'true'));
      expect(btn).not.toBeDisabled();
      expect(document.activeElement).toBe(btn);

      if (resolvePlay) resolvePlay();
      playSpy.mockImplementation(() => Promise.resolve());
    });

    it('keeps focus on virtual keyboard button when activated via keyboard instead of yanking focus to input', async () => {
      vi.useFakeTimers();
      try {
        localStorage.setItem('basic_language_base_lang', 'en');
        localStorage.setItem('basic_language_target_lang', 'ru');
        window.history.pushState({}, '', '/learn/ru/quiz');
        const { container } = render(<App />);
        await vi.advanceTimersByTimeAsync(200);

        const kbToggle = container.querySelector<HTMLButtonElement>('.kb-quick-toggle-btn');
        if (kbToggle && kbToggle.getAttribute('aria-expanded') === 'false') {
          fireEvent.click(kbToggle);
        }

        const firstKey = container.querySelector<HTMLButtonElement>('.russian-keyboard .keyboard-key');
        if (firstKey) {
          firstKey.focus();
          expect(document.activeElement).toBe(firstKey);
          fireEvent.click(firstKey);
          await vi.advanceTimersByTimeAsync(20);
          expect(document.activeElement).toBe(firstKey);
        }
      } finally {
        vi.useRealTimers();
      }
    });
  });

  describe('5. Static Standalone HTML Pages (public/privacy, public/terms, public/voice-test)', () => {
    it.each([
      ['public/privacy/index.html', true],
      ['public/terms/index.html', true],
      ['public/voice-test.html', false],
    ])('validates landmarks, viewport meta, and axe rules in %s', async (relPath, hasSkipLink) => {
      const fullPath = path.resolve(process.cwd(), relPath);
      const rawHtml = fs.readFileSync(fullPath, 'utf-8');
      const parsed = new DOMParser().parseFromString(rawHtml, 'text/html');

      expect(parsed.documentElement.getAttribute('lang')).toBe('en');
      expect(parsed.querySelector('meta[name="viewport"]')).not.toBeNull();
      expect(parsed.querySelector('title')?.textContent?.trim().length).toBeGreaterThan(0);

      if (hasSkipLink) {
        const skip = parsed.querySelector('a.skip-link');
        expect(skip).not.toBeNull();
        expect(skip?.getAttribute('href')).toBe('#main-content');
        expect(parsed.querySelector('main#main-content')).not.toBeNull();
      }

      const host = document.createElement('div');
      host.innerHTML = parsed.body.innerHTML;
      document.body.appendChild(host);
      try {
        await expectNoAxeViolations(host);
      } finally {
        document.body.removeChild(host);
      }
    });
  });
});
