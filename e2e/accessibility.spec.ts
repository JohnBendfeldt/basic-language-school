import { test, expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

async function assertNoAxeViolations(page: Page, contextLabel: string) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  const summary = results.violations.map(
    (v) =>
      `[${contextLabel}] ${v.id} (${v.impact}): ${v.help}\n` +
      v.nodes
        .slice(0, 5)
        .map((n) => `  target=${JSON.stringify(n.target)}\n  ${n.failureSummary}`)
        .join('\n')
  );
  expect(summary, `Axe WCAG 2.1/2.2 AA violations on ${contextLabel}`).toEqual([]);
}

test.describe('Playwright E2E WCAG 2.1 / 2.2 Level AA Accessibility & Color Contrast Audit', () => {
  test('Desktop LTR: Alphabet, Grammar (Flashcards, Genders, Verb & Comparison ARIA Tables), and LanguageAbout pass axe AA', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'de');
    });

    await page.goto('/learn/de/alphabet');
    await expect(page.locator('.alphabet-section')).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
    await assertNoAxeViolations(page, 'Desktop DE Alphabet');

    // Grammar Flashcards (unanswered & answered)
    await page.getByRole('tab', { name: /Grammar/i }).click();
    await expect(page.locator('.grammar-section')).toBeVisible();
    await assertNoAxeViolations(page, 'Desktop DE Grammar Flashcards (initial)');

    await page.locator('.grammar-option-btn').first().click();
    await expect(page.locator('.grammar-feedback-box[role="status"]')).toBeVisible();
    await assertNoAxeViolations(page, 'Desktop DE Grammar Flashcards (feedback)');

    // Noun Genders
    await page.getByRole('tab', { name: /Noun Genders/i }).click();
    await assertNoAxeViolations(page, 'Desktop DE Grammar Noun Genders');

    // Verb Tenses ARIA table
    await page.getByRole('tab', { name: /Verb Tenses/i }).click();
    await expect(page.getByRole('table').first()).toBeVisible();
    await assertNoAxeViolations(page, 'Desktop DE Grammar Verb Tenses Table');

    // Descriptions Comparison ARIA table
    await page.getByRole('tab', { name: /Descriptions/i }).click();
    await expect(page.getByRole('table').first()).toBeVisible();
    await assertNoAxeViolations(page, 'Desktop DE Grammar Descriptions Table');

    // Language About sub-view
    await page.getByRole('tab', { name: /About/i }).click();
    await expect(page.locator('.language-about-container')).toBeVisible();
    await assertNoAxeViolations(page, 'Desktop DE LanguageAbout');
  });

  test('Desktop LTR: Chinese PinyinGuide, Phrases (collapsed & revealed), Numbers & Time, Quiz, and Legal pages pass axe AA', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'en');
    });

    // Chinese PinyinGuide
    await page.goto('/learn/zh/alphabet');
    await expect(page.locator('.pinyin-guide-container')).toBeVisible();
    await assertNoAxeViolations(page, 'Chinese PinyinGuide Tones');

    await page.getByRole('tab', { name: /Syllable Anatomy/i }).click();
    await assertNoAxeViolations(page, 'Chinese PinyinGuide Anatomy');

    await page.getByRole('tab', { name: /How Latin Letters Become Hanzi/i }).click();
    await assertNoAxeViolations(page, 'Chinese PinyinGuide Typing');

    // Phrases collapsed & revealed
    await page.goto('/learn/es/phrases');
    await expect(page.locator('.phrase-card').first()).toBeVisible();
    await assertNoAxeViolations(page, 'Spanish Phrases (collapsed)');

    const revealBtn = page.locator('.phrase-reveal-btn').first();
    await revealBtn.click();
    await expect(page.locator('.phrase-hide-btn').first()).toHaveAttribute('aria-expanded', 'true');
    await assertNoAxeViolations(page, 'Spanish Phrases (revealed)');

    // Numbers & Time
    await page.goto('/learn/fr/numbers');
    await expect(page.locator('.numbers-and-time-section')).toBeVisible();
    await assertNoAxeViolations(page, 'French Numbers');

    const timeSubBtn = page.locator('.sub-nav-button').nth(1);
    if (await timeSubBtn.isVisible()) {
      await timeSubBtn.click();
      await assertNoAxeViolations(page, 'French Time & Grammar Guide');
    }

    // Quiz (Russian virtual keyboard + feedback sheet)
    await page.goto('/learn/ru/quiz');
    await expect(page.locator('.quiz-section')).toBeVisible();
    const kbToggle = page.locator('.kb-quick-toggle-btn');
    if ((await kbToggle.isVisible()) && (await kbToggle.getAttribute('aria-expanded')) === 'false') {
      await kbToggle.click();
    }
    await assertNoAxeViolations(page, 'Russian Quiz + Virtual Keyboard');

    await page.locator('.quiz-input').fill('тест');
    await page.locator('.check-button').click();
    await expect(page.locator('.quiz-feedback-drawer')).toBeVisible();
    await assertNoAxeViolations(page, 'Russian Quiz Feedback Drawer');

    // Legal & About pages
    for (const legalRoute of ['/about', '/privacy', '/terms']) {
      await page.goto(legalRoute);
      await expect(page.locator('main#main-content')).toBeVisible();
      await assertNoAxeViolations(page, `Legal Route ${legalRoute}`);
    }
  });

  test('Desktop Modals & Menus: SearchModal, LanguageSwitcher, VoiceSpeedControl, OfflineAudioModal, AuthModal, ProgressModal pass axe AA & keyboard focus rules', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'es');
    });

    await page.goto('/learn/es/alphabet');
    await expect(page.locator('.alphabet-section')).toBeVisible();

    // Skip link keyboard test: first Tab focuses .skip-link, Enter focuses #main-content
    await page.keyboard.press('Tab');
    const skipLink = page.locator('a.skip-link');
    await expect(skipLink).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main#main-content')).toBeFocused();

    // 1. SearchModal
    const searchBtn = page.locator('.desktop-header-actions .header-search-btn');
    await searchBtn.click();
    const searchInput = page.getByRole('searchbox');
    await expect(searchInput).toBeFocused();
    await searchInput.fill('hola');
    await assertNoAxeViolations(page, 'SearchModal with query');
    await page.keyboard.press('Escape');
    await expect(searchInput).toBeHidden();
    await expect(searchBtn).toBeFocused();

    // 2. LanguageSwitcher
    const langBtn = page.locator('.desktop-header-actions .language-switcher-trigger');
    await langBtn.click();
    await expect(page.getByRole('dialog', { name: /Language selection modal/i })).toBeVisible();
    await assertNoAxeViolations(page, 'LanguageSwitcher Modal');
    await page.keyboard.press('Escape');
    await expect(langBtn).toBeFocused();

    // 3. VoiceSpeedControl
    const speedBtn = page.locator('.desktop-header-actions .voice-speed-trigger');
    await speedBtn.click();
    await expect(page.getByRole('dialog', { name: /Audio Playback Speed/i })).toBeVisible();
    await assertNoAxeViolations(page, 'VoiceSpeedControl Modal');
    await page.keyboard.press('Escape');
    await expect(speedBtn).toBeFocused();

    // 4. OfflineAudioModal
    const offlineBtn = page.locator('.desktop-header-actions .header-offline-btn');
    if (await offlineBtn.isVisible()) {
      await offlineBtn.click();
      await expect(page.locator('.offline-modal-dialog')).toBeVisible();
      await assertNoAxeViolations(page, 'OfflineAudioModal');
      await page.keyboard.press('Escape');
      await expect(offlineBtn).toBeFocused();
    }

    // 5. Guest stats & sign-in modals
    const statsBtn = page.locator('.desktop-header-actions .progress-btn');
    if (await statsBtn.isVisible()) {
      await statsBtn.click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await assertNoAxeViolations(page, 'ProgressModal');
      await page.keyboard.press('Escape');
      await expect(statsBtn).toBeFocused();
    }

    const signInBtn = page.locator('.desktop-header-actions .signin-btn');
    if (await signInBtn.isVisible()) {
      await signInBtn.click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await assertNoAxeViolations(page, 'AuthModal');
      await page.keyboard.press('Escape');
      await expect(signInBtn).toBeFocused();
    }
  });

  test('Mobile (390x844) & RTL (Arabic UI & Arabic Target): BottomNavigation, MobileDrawer, and RTL views pass axe AA', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'ar');
      localStorage.setItem('basic_language_target_lang', 'fr');
    });

    await page.goto('/learn/fr/phrases');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await assertNoAxeViolations(page, 'Mobile RTL (AR -> FR) Phrases');

    // Open MobileDrawer
    const menuBtn = page.getByRole('button', { name: /Open settings and menu/i });
    await menuBtn.click();
    const drawer = page.getByRole('dialog', { name: /Settings and options menu/i });
    await expect(drawer).toBeVisible();
    await assertNoAxeViolations(page, 'Mobile RTL MobileDrawer');

    await page.keyboard.press('Escape');
    await expect(drawer).toBeHidden();
    await expect(menuBtn).toBeFocused();
  });
});
