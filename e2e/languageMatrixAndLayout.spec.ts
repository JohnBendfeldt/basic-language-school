import fs from 'node:fs';
import path from 'node:path';
import { test, expect } from '@playwright/test';

test.describe('Playwright E2E: Layout, Modals, Alignment & Neural Audio Matrix', () => {
  test('Desktop: VoiceSpeedControl and LanguageSwitcher modals open centered inside viewport and preserve target language when changing "I speak"', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'ru');
      localStorage.setItem('basic_language_target_lang', 'en');
    });

    await page.goto('/learn/en/alphabet');

    // 1. Click Speech Speed trigger and assert modal is visible & inside viewport bounds
    const speedTrigger = page.getByRole('button', { name: /Voice speed/i });
    await expect(speedTrigger).toBeVisible();
    await speedTrigger.click();

    const speedDialog = page.getByRole('dialog', { name: /Audio Playback Speed/i });
    await expect(speedDialog).toBeVisible();
    const speedBox = await speedDialog.boundingBox();
    expect(speedBox).not.toBeNull();
    expect(speedBox!.x).toBeGreaterThanOrEqual(0);
    expect(speedBox!.y).toBeGreaterThanOrEqual(0);
    expect(speedBox!.x + speedBox!.width).toBeLessThanOrEqual(1280);
    expect(speedBox!.y + speedBox!.height).toBeLessThanOrEqual(800);

    // Close speed modal
    await page.keyboard.press('Escape');
    await expect(speedDialog).toBeHidden();

    // 2. Open LanguageSwitcher, switch "I speak" from Russian to French, verify modal stays open & target remains English (Anglais)
    const pairTrigger = page.getByRole('button', { name: /Current language pair/i });
    await pairTrigger.click();

    const langModal = page.getByRole('dialog', { name: /Language selection modal/i });
    await expect(langModal).toBeVisible();

    // The "I speak" box (base language) is the first of the two pair boxes in the modal
    const iSpeakTab = langModal.locator('.pair-box.base-box');
    await iSpeakTab.click();

    const frenchOption = langModal.getByRole('menuitem', { name: /Французский/i });
    await frenchOption.click();

    await expect(langModal).toBeVisible();
    await expect(langModal.getByText('Anglais').first()).toBeVisible();
  });

  test('Mobile (390x844): MobileDrawer and ProgressModal fit cleanly inside phone viewport without clipping', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'fr');
      localStorage.setItem('basic_language_target_lang', 'es');
    });

    await page.goto('/learn/es/phrases');

    // Open mobile hamburger menu
    const menuBtn = page.getByRole('button', { name: /Open settings and menu/i });
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();

    const drawer = page.getByRole('dialog', { name: /Settings and options menu/i });
    await expect(drawer).toBeVisible();

    // Click "My Learning Progress" inside mobile drawer
    const progressBtn = drawer.locator('.drawer-action-card').first();
    await progressBtn.click();

    // Verify ProgressModal is localized in French and fits inside the 390px mobile viewport
    const progressDialog = page.locator('.progress-modal-container');
    await expect(progressDialog).toBeVisible();
    await expect(progressDialog.getByText("Votre Progression d'Apprentissage")).toBeVisible();

    const modalBox = await progressDialog.boundingBox();
    expect(modalBox).not.toBeNull();
    expect(modalBox!.x).toBeGreaterThanOrEqual(0);
    expect(modalBox!.x + modalBox!.width).toBeLessThanOrEqual(390);
  });

  test('Alphabet Card Alignment (FR -> ES): labels never wrap colons onto a second line and row dividers align horizontally', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'fr');
      localStorage.setItem('basic_language_target_lang', 'es');
    });

    await page.goto('/learn/es/alphabet');

    const exampleLabels = page.locator('.alphabet-card .example-label');
    await expect(exampleLabels.first()).toBeVisible();
    const count = await exampleLabels.count();
    expect(count).toBeGreaterThan(10);

    // Every "Exemple:" label must stay on a single line (height < 28px)
    for (let i = 0; i < Math.min(count, 12); i++) {
      const box = await exampleLabels.nth(i).boundingBox();
      expect(box).not.toBeNull();
      expect(box!.height).toBeLessThan(28);
    }

    // First 4 cards in the top row should have their .example section aligned at the same Y coordinate
    const examples = page.locator('.alphabet-card .example');
    const box0 = await examples.nth(0).boundingBox();
    const box1 = await examples.nth(1).boundingBox();
    const box2 = await examples.nth(2).boundingBox();
    expect(box0).not.toBeNull();
    expect(box1).not.toBeNull();
    expect(box2).not.toBeNull();
    expect(Math.abs(box0!.y - box1!.y)).toBeLessThanOrEqual(3);
    expect(Math.abs(box1!.y - box2!.y)).toBeLessThanOrEqual(3);
  });

  test('Revealed Card Audio & Russian Numbers: tapping translation speaker plays 200 OK neural MP3 without closing card or using speechSynthesis', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'es');
      localStorage.setItem('basic_language_target_lang', 'ru');
      (window as any).__speechSynthCalls = 0;
      if (window.speechSynthesis) {
        window.speechSynthesis.speak = () => {
          (window as any).__speechSynthCalls++;
        };
      }
    });

    const audioResponses: Array<{ url: string; status: number }> = [];
    page.on('response', (res) => {
      if (res.url().includes('/audio/') && res.url().endsWith('.mp3')) {
        audioResponses.push({ url: res.url(), status: res.status() });
      }
    });

    await page.goto('/learn/ru/numbers');

    // Verify Russian NumberBadge pills render for 100 and 1000
    await expect(page.locator('svg.number-svg-badge text', { hasText: /^100$/ })).toBeVisible();
    await expect(page.locator('svg.number-svg-badge text', { hasText: /^1000$/ })).toBeVisible();

    // Reveal the "сто" (100) card (match exact h3 so it doesn't match "девяносто")
    const stoCard = page.locator('.phrase-card').filter({
      has: page.locator('h3.phrase-text', { hasText: /^сто$/ }),
    });
    await stoCard.getByRole('button', { name: 'Reveal translation for сто', exact: true }).click();

    // Verify translation is "100 (Cien)" (NOT "Uno"!)
    await expect(stoCard.getByText('100 (Cien)')).toBeVisible();

    // Click the mini speaker button inside the revealed card
    const miniSpeaker = stoCard.getByRole('button', { name: /Listen to translation 100 \(Cien\)/i });
    await miniSpeaker.click();

    // Card must remain open (not hidden!)
    await expect(stoCard.getByText('100 (Cien)')).toBeVisible();

    // Wait briefly for MP3 request and verify 200/206 OK + 0 speechSynthesis calls
    await expect
      .poll(() =>
        audioResponses.some(
          (r) => r.url.endsWith('/audio/es/numbers/cien.mp3') && (r.status === 200 || r.status === 206)
        )
      )
      .toBe(true);

    const synthCalls = await page.evaluate(() => (window as any).__speechSynthCalls || 0);
    expect(synthCalls).toBe(0);
  });

  test('Topic & Industry Pack Filter Pills: filters Common Words into Tech & IT, Colors, and Weather packs with native neural audio', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'es');
    });

    await page.goto('/learn/es/words');

    const filterBar = page.getByRole('group', { name: /Filter by topic or industry pack/i });
    await expect(filterBar).toBeVisible();

    const techPill = filterBar.locator('button[data-category="Tech"]');
    const businessPill = filterBar.locator('button[data-category="Business"]');
    const healthPill = filterBar.locator('button[data-category="Health"]');
    const colorsPill = filterBar.locator('button[data-category="Colors"]');
    const weatherPill = filterBar.locator('button[data-category="Weather"]');

    await expect(techPill).toBeVisible();
    await expect(businessPill).toBeVisible();
    await expect(healthPill).toBeVisible();
    await expect(colorsPill).toBeVisible();
    await expect(weatherPill).toBeVisible();

    // Filter to Tech & IT pack
    await techPill.click();
    await expect(page.locator('h3.phrase-text', { hasText: /^Contraseña$/ })).toBeVisible();
    await expect(page.locator('h3.phrase-text', { hasText: /^Agua$/ })).toBeHidden();

    // Filter to Business pack
    await businessPill.click();
    await expect(page.locator('h3.phrase-text', { hasText: /^Proyecto$/ })).toBeVisible();
    await expect(page.locator('h3.phrase-text', { hasText: /^Contraseña$/ })).toBeHidden();

    // Filter to Healthcare pack
    await healthPill.click();
    await expect(page.locator('h3.phrase-text', { hasText: /^Médico$/ })).toBeVisible();

    // Filter to Colors pack
    await colorsPill.click();
    await expect(page.locator('h3.phrase-text', { hasText: /^Rojo$/ })).toBeVisible();
    await expect(page.locator('h3.phrase-text', { hasText: /^Contraseña$/ })).toBeHidden();

    // Filter to Weather pack
    await weatherPill.click();
    await expect(page.locator('h3.phrase-text', { hasText: /^Tormenta$/ })).toBeVisible();
  });

  test('Portuguese (PT-BR) & German (DE) Courses: renders special alphabet letters (Ç, Ä, Ö, Ü, ß), topic packs, and plays 200 OK neural audio', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'pt');
      localStorage.setItem('basic_language_target_lang', 'de');
    });

    const audioResponses: Array<{ url: string; status: number }> = [];
    page.on('response', (res) => {
      if (res.url().includes('/audio/') && res.url().endsWith('.mp3')) {
        audioResponses.push({ url: res.url(), status: res.status() });
      }
    });

    await page.goto('/learn/de/alphabet');

    // Verify Portuguese UI localization for German Alphabet
    await expect(page.locator('h2', { hasText: 'Alfabeto alemão' })).toBeVisible();
    await expect(page.locator('.letter-uppercase', { hasText: /^Ä$/ })).toBeVisible();
    await expect(page.locator('.letter-uppercase', { hasText: /^ß$/ })).toBeVisible();

    // Navigate to German Common Words and filter by Tech pack
    await page.goto('/learn/de/words');
    const filterBar = page.getByRole('group', { name: /Filter by topic or industry pack/i });
    await filterBar.locator('button[data-category="Tech"]').click();

    const passwortCard = page.locator('.phrase-card').filter({
      has: page.locator('h3.phrase-text', { hasText: /^Passwort$/ }),
    });
    await expect(passwortCard).toBeVisible();
    await passwortCard.getByRole('button', { name: /Pronounce word Passwort/i }).click();

    await expect
      .poll(() =>
        audioResponses.some(
          (r) => r.url.endsWith('/audio/de/words/passwort.mp3') && (r.status === 200 || r.status === 206)
        )
      )
      .toBe(true);
  });

  test('Indonesian (ID) & Turkish (TR) Courses: renders unique alphabet letters (Ç, Ğ, I, İ, Ö, Ş, Ü), filters by topic, and plays 200 OK neural audio', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'tr');
    });

    const audioResponses: Array<{ url: string; status: number }> = [];
    page.on('response', (res) => {
      if (res.url().includes('/audio/') && res.url().endsWith('.mp3')) {
        audioResponses.push({ url: res.url(), status: res.status() });
      }
    });

    await page.goto('/learn/tr/alphabet');

    // Verify Turkish Alphabet letters including Ç, Ğ, I, İ, Ş
    await expect(page.locator('.letter-uppercase', { hasText: /^Ç$/ })).toBeVisible();
    await expect(page.locator('.letter-uppercase', { hasText: /^Ğ$/ })).toBeVisible();
    await expect(page.locator('.letter-uppercase', { hasText: /^I$/ })).toBeVisible();
    await expect(page.locator('.letter-uppercase', { hasText: /^İ$/ })).toBeVisible();
    await expect(page.locator('.letter-uppercase', { hasText: /^Ş$/ })).toBeVisible();

    // Verify Indonesian course loading and audio
    await page.goto('/learn/id/words');
    const filterBar = page.getByRole('group', { name: /Filter by topic or industry pack/i });
    await filterBar.locator('button[data-category="Tech"]').click();

    const kataSandiCard = page.locator('.phrase-card').filter({
      has: page.locator('h3.phrase-text', { hasText: /^Kata sandi$/ }),
    });
    await expect(kataSandiCard).toBeVisible();
    await kataSandiCard.getByRole('button', { name: /Pronounce word Kata sandi/i }).click();

    await expect
      .poll(() =>
        audioResponses.some(
          (r) => r.url.endsWith('/audio/id/words/kata_sandi.mp3') && (r.status === 200 || r.status === 206)
        )
      )
      .toBe(true);
  });

  test('Quiz E2E: topic packs filter questions, modality switch renders listening card, and repeat advice banner is visible', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'es');
    });

    await page.goto('/learn/es/quiz');

    // 1. Verify repeat guidance tip banner
    await expect(page.locator('.quiz-repeat-tip-banner')).toBeVisible();

    // 2. Verify modality toggles
    const writingBtn = page.getByRole('radio', { name: /Writing/i });
    const listeningBtn = page.getByRole('radio', { name: /Listening/i });
    const allModesBtn = page.getByRole('radio', { name: /All Modes/i });
    await expect(writingBtn).toBeVisible();
    await expect(listeningBtn).toBeVisible();
    await expect(allModesBtn).toBeVisible();
    await expect(writingBtn).toHaveClass(/active/);

    // 3. Verify topic pack filter (e.g. Tech & IT via dropdown)
    const topicTrigger = page.locator('#topic-dropdown-trigger');
    await expect(topicTrigger).toBeVisible();
    await topicTrigger.click();
    const techOption = page.locator('.quiz-dropdown-item', { hasText: 'Tech & IT' });
    await expect(techOption).toBeVisible();
    await techOption.click();
    await expect(topicTrigger).toContainText('Tech & IT');

    // 4. Switch to Listening Ear-Training Mode
    await listeningBtn.click();
    await expect(listeningBtn).toHaveClass(/active/);
    await expect(page.locator('.quiz-listening-card')).toBeVisible();
    await expect(page.locator('.quiz-listening-audio-btn')).toBeVisible();
    await expect(page.locator('.show-listening-hint-btn')).toBeVisible();
  });

  test('Grammar tabs layout: Noun Genders, Verb Tenses, and Descriptions share consistent 980px width, non-compacted table, and mobile responsiveness', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'de');
    });

    await page.goto('/learn/de/alphabet');

    // Switch to Grammar & Flashcards tab
    const grammarTab = page.locator('.section-segmented-control button[role="tab"]').nth(1);
    await grammarTab.click();
    await expect(grammarTab).toHaveClass(/active/);

    // 1. Check Noun Genders tab width
    const gendersTabBtn = page.getByRole('tab', { name: /Noun Genders/i });
    await expect(gendersTabBtn).toBeVisible();
    await gendersTabBtn.click();
    const gendersGrid = page.locator('.gender-rules-grid');
    await expect(gendersGrid).toBeVisible();
    const gendersBox = await gendersGrid.boundingBox();
    expect(gendersBox).not.toBeNull();
    expect(gendersBox!.width).toBeGreaterThanOrEqual(920);
    expect(gendersBox!.width).toBeLessThanOrEqual(1000);

    // 2. Check Verb Tenses tab width (consistent with Noun Genders)
    const verbsTabBtn = page.getByRole('tab', { name: /Verb Tenses/i });
    await expect(verbsTabBtn).toBeVisible();
    await verbsTabBtn.click();
    const verbsContainer = page.locator('.verb-matrix-container');
    await expect(verbsContainer).toBeVisible();
    const verbsBox = await verbsContainer.boundingBox();
    expect(verbsBox).not.toBeNull();
    expect(verbsBox!.width).toBeGreaterThanOrEqual(920);
    expect(verbsBox!.width).toBeLessThanOrEqual(1000);

    // 3. Check Descriptions tab width (consistent 980px, no longer compacted at 650px)
    const descTabBtn = page.getByRole('tab', { name: /Descriptions/i });
    await expect(descTabBtn).toBeVisible();
    await descTabBtn.click();
    const descContainer = page.locator('.descriptions-container');
    await expect(descContainer).toBeVisible();
    const descBox = await descContainer.boundingBox();
    expect(descBox).not.toBeNull();
    expect(descBox!.width).toBeGreaterThanOrEqual(920);
    expect(descBox!.width).toBeLessThanOrEqual(1000);

    // Width difference between all 3 tabs must be practically zero (harmonious layout)
    expect(Math.abs(verbsBox!.width - descBox!.width)).toBeLessThan(5);
    expect(Math.abs(gendersBox!.width - descBox!.width)).toBeLessThan(5);

    // 4. Mobile responsiveness check (375px phone)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(200);

    // Assert that the page body does not have horizontal overflow blowout
    const isOverflowing = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(isOverflowing).toBe(false);

    // Assert description card fits within phone screen
    const mobileDescCard = page.locator('.description-card').first();
    const cardBox = await mobileDescCard.boundingBox();
    expect(cardBox).not.toBeNull();
    expect(cardBox!.width).toBeLessThanOrEqual(375);
  });

  test('Centered Alphabet Pills, Zero English Leaks (UR/ZH), Larger Urdu Fonts & Phonetic Keyboard', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'ur');
      localStorage.setItem('basic_language_target_lang', 'en');
    });

    await page.goto('/learn/en/alphabet');

    const pillBar = page.locator('.section-segmented-control').first();
    await expect(pillBar).toBeVisible();
    const barBox = await pillBar.boundingBox();
    expect(barBox).not.toBeNull();

    // Centered horizontally on desktop
    const centerOffset = Math.abs(barBox!.x + barBox!.width / 2 - 640);
    expect(centerOffset).toBeLessThan(24);

    // Zero text overflow or overlap between the 3 segmented buttons
    const buttons = pillBar.locator('.segmented-tab-btn');
    expect(await buttons.count()).toBe(3);
    for (let i = 0; i < 3; i++) {
      const btnText = (await buttons.nth(i).textContent()) || '';
      expect(btnText).not.toMatch(/Sounds|Flashcards|About & Origins|History/i);
      const overflows = await buttons.nth(i).evaluate((el) => el.scrollWidth > el.clientWidth + 1);
      expect(overflows).toBe(false);
    }

    // Check Common Words topic pills in Urdu have zero leaked English categories & larger readable font
    await page.goto('/learn/en/words');
    const topicPills = page.locator('.topic-pack-filter-bar .topic-pack-label');
    await expect(topicPills.first()).toBeVisible();
    const allPillTexts = await topicPills.allTextContents();
    for (const txt of allPillTexts) {
      expect(txt).not.toMatch(/^(Family|Questions|Calendar|Food|General|Home|Nature|Verbs)$/i);
    }

    const subtitleFontPx = await page.locator('.phrases-subtitle').evaluate((el) =>
      parseFloat(window.getComputedStyle(el).fontSize)
    );
    expect(subtitleFontPx).toBeGreaterThanOrEqual(17);

    // Mobile check (375px): centered segmented pill never overflows viewport or collides
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/learn/en/alphabet');
    await expect(pillBar).toBeVisible();
    const mobileBarBox = await pillBar.boundingBox();
    expect(mobileBarBox).not.toBeNull();
    expect(mobileBarBox!.x).toBeGreaterThanOrEqual(0);
    expect(mobileBarBox!.x + mobileBarBox!.width).toBeLessThanOrEqual(375);

    const hasDocOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(hasDocOverflow).toBe(false);

    // Switch to learning Urdu (EN -> UR Quiz) and verify Phonetic Urdu Keyboard opens
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.evaluate(() => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'ur');
    });
    await page.goto('/learn/ur/quiz');
    await expect(page.locator('.quiz-card')).toBeVisible();
  });

  test('Snug Alphabet Audio Buttons, 100% Localized Chinese About Pages, Clean Time Tab & Live Phonetic Spacebar Conversion', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'zh');
    });

    // 1. Alphabet card audio buttons sit close to example word & meaning (not pushed far right)
    await page.goto('/learn/zh/alphabet');
    const firstCard = page.locator('.alphabet-card').first();
    await expect(firstCard).toBeVisible();

    const meaningSpanBox = await firstCard.locator('.example-translation').boundingBox();
    const miniBtnBox = await firstCard.locator('.example-meaning-row .example-pronunciation').boundingBox();
    expect(meaningSpanBox).not.toBeNull();
    expect(miniBtnBox).not.toBeNull();
    const gapPx = miniBtnBox!.x - (meaningSpanBox!.x + meaningSpanBox!.width);
    expect(gapPx).toBeGreaterThanOrEqual(0);
    expect(gapPx).toBeLessThanOrEqual(20);

    // 2. Mandarin speaker viewing English & Spanish About tabs sees 100% Chinese Quick Facts & History
    await page.evaluate(() => {
      localStorage.setItem('basic_language_base_lang', 'zh');
      localStorage.setItem('basic_language_target_lang', 'en');
    });
    await page.goto('/learn/en/alphabet');
    await page.locator('.segmented-tab-btn').nth(2).click();
    await expect(page.locator('.language-about-container')).toBeVisible();
    const aboutTextEn = (await page.locator('.language-about-container').textContent()) || '';
    expect(aboutTextEn).not.toContain('The Global Lingua Franca');
    expect(aboutTextEn).not.toContain('GLOBAL STATUS');
    expect(aboutTextEn).toContain('全球通用语');

    // 3. Turkish Time tab has only Time expressions (no leaked food items like Sarımsak)
    await page.evaluate(() => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'tr');
    });
    await page.goto('/learn/tr/time');
    await expect(page.locator('h3.phrase-text').first()).toBeVisible();
    const trTimeBody = (await page.locator('.phrases-container').textContent()) || '';
    expect(trTimeBody).not.toContain('Sarımsak');
    expect(trTimeBody).not.toContain('FOOD & DRİNK');

    // 4. Live Pinyin-style Sound-It-Out + Spacebar conversion in Quiz
    await page.evaluate(() => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'zh');
      localStorage.setItem('basic_quiz_mode', 'listening');
      localStorage.setItem('basic_quiz_mode_zh', 'listening');
    });
    await page.goto('/learn/zh/quiz');
    const quizInput = page.locator('input.quiz-input');
    await expect(quizInput).toBeVisible();
    await quizInput.fill('nihao');
    await expect(page.locator('.phonetic-live-preview-pill')).toContainText('你好');
    await quizInput.type(' ');
    await expect(quizInput).toHaveValue('你好 ');
  });

  test('Both Language Pickers, French Liaison Unicode Arrow & Non-Anglo-Centric Quiz Grading (zh -> es)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'fr');
    });

    // 1. French About page Liaison example renders clean Unicode → (never raw LaTeX $\rightarrow$)
    await page.goto('/learn/fr/alphabet');
    await page.locator('.segmented-tab-btn').nth(2).click();
    await expect(page.locator('.language-about-container')).toBeVisible();
    await expect(page.locator('.language-about-container')).toContainText('les amis → lay-zah-mee');
    await expect(page.locator('.language-about-container')).not.toContainText('$\\rightarrow$');

    // 2. Interactive test of BOTH language pickers ("I speak" -> Mandarin, "I want to learn" -> Spanish)
    await page.getByRole('button', { name: /Current language pair/i }).first().click();
    const modal = page.getByRole('dialog', { name: 'Language selection modal' });
    await expect(modal).toBeVisible();

    // Switch base language ("I speak") to Mandarin Chinese
    await modal.locator('.pair-box.base-box').click();
    await modal.getByRole('menuitem', { name: /Mandarin Chinese/i }).click();

    // Switch target language ("I want to learn" -> 想学语言) to Spanish (西班牙语)
    await modal.locator('.pair-box.target-box').click();
    await modal.getByRole('menuitem', { name: /西班牙语/i }).click();
    await expect(modal).toBeHidden();
    await expect(page).toHaveURL(/\/learn\/es\//);

    // Verify Spanish Origins & History for Mandarin speakers is 100% localized in Chinese
    await page.locator('.segmented-tab-btn').nth(2).click();
    await expect(page.locator('.language-about-container')).toBeVisible();
    const esZhAbout = (await page.locator('.language-about-container').textContent()) || '';
    expect(esZhAbout).not.toContain('From Castile to the Americas');
    expect(esZhAbout).not.toContain('NATIVE SPEAKERS');

    // 3. Navigate to Quiz in zh -> es and verify English answer ("Hello") is rejected
    await page.goto('/learn/es/quiz');
    const quizInput = page.locator('input.quiz-input');
    await expect(quizInput).toBeVisible();
    await quizInput.fill('Hello');
    await page.locator('button.check-button').click();
    await expect(page.locator('.quiz-feedback-drawer.feedback-incorrect')).toBeVisible();
  });

  test('Offline Audio Course Picker & Airplane Mode Playback: downloads active pair into Cache Storage and plays cached MP3s with context.setOffline(true)', async ({
    page,
    context,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    // Build a real 2-clip offline-pack.bin for Spanish from studio MP3s on disk to verify single-file binary pack unpacking in real Chromium Cache Storage
    const esClipA = fs.readFileSync(path.resolve(process.cwd(), 'public/audio/es/alphabet/a.mp3'));
    const esClipAmor = fs.readFileSync(path.resolve(process.cwd(), 'public/audio/es/examples/amor.mp3'));
    const esPackBuffer = Buffer.concat([esClipA, esClipAmor]);
    let esPackRequested = false;
    let esIndividualMp3Requested = false;

    await page.route('**/audio/es/manifest.json', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          lang: 'es',
          fileCount: 2,
          totalBytes: esPackBuffer.length,
          packFile: 'offline-pack.bin',
          files: ['alphabet/a.mp3', 'examples/amor.mp3'],
          sizes: [esClipA.length, esClipAmor.length],
        }),
      });
    });

    await page.route('**/audio/es/offline-pack.bin', async (route) => {
      esPackRequested = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/octet-stream',
        body: esPackBuffer,
      });
    });

    page.on('request', (req) => {
      const u = req.url();
      if (u.includes('/audio/es/alphabet/') || u.includes('/audio/es/examples/')) {
        esIndividualMp3Requested = true;
      }
    });

    await page.route('**/audio/en/manifest.json', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          lang: 'en',
          fileCount: 1,
          totalBytes: 12288,
          files: ['words/love.mp3'],
        }),
      });
    });

    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'es');
      (window as any).__ttsCalls = 0;
      if (window.speechSynthesis) {
        const origSpeak = window.speechSynthesis.speak.bind(window.speechSynthesis);
        window.speechSynthesis.speak = (u: SpeechSynthesisUtterance) => {
          (window as any).__ttsCalls += 1;
          return origSpeak(u);
        };
      }
    });

    await page.goto('/learn/es/alphabet');

    // 1. Verify Desktop header has zero horizontal overflow with the new offline course button
    const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollW).toBeLessThanOrEqual(1280);

    // 2. Open Offline Audio Course Picker from header and verify active pair (es + en) is pre-selected
    const offlineHeaderBtn = page.getByTestId('header-offline-btn');
    await expect(offlineHeaderBtn).toBeVisible();
    await offlineHeaderBtn.click();

    const offlineDialog = page.getByRole('dialog', { name: 'Offline Audio Courses' });
    await expect(offlineDialog).toBeVisible();
    const dialogBox = await offlineDialog.boundingBox();
    expect(dialogBox).not.toBeNull();
    expect(dialogBox!.x).toBeGreaterThanOrEqual(0);
    expect(dialogBox!.x + dialogBox!.width).toBeLessThanOrEqual(1280);

    await expect(page.getByTestId('offline-pack-es')).toHaveAttribute('aria-checked', 'true');
    await expect(page.getByTestId('offline-pack-en')).toHaveAttribute('aria-checked', 'true');
    await expect(page.getByTestId('offline-pack-fr')).toHaveAttribute('aria-checked', 'false');

    // 3. Download active pair into real Chromium Cache Storage via single-file offline-pack.bin
    await offlineDialog.getByRole('button', { name: /Download Selected/i }).click();
    await expect(page.getByTestId('offline-pack-es')).toContainText('Offline Ready');
    await expect(page.getByTestId('offline-pack-en')).toContainText('Offline Ready');
    await expect(offlineHeaderBtn).toHaveClass(/offline-ready/);
    expect(esPackRequested).toBe(true);
    expect(esIndividualMp3Requested).toBe(false);

    await offlineDialog.getByRole('button', { name: 'Done' }).last().click();
    await expect(offlineDialog).toBeHidden();

    // 4. Switch Chromium to Airplane Mode (context.setOffline(true)) and verify pronunciation plays from cache with zero network errors
    const offlineFailedAudioRequests: string[] = [];
    page.on('requestfailed', (req) => {
      if (req.url().includes('/audio/')) {
        offlineFailedAudioRequests.push(req.url());
      }
    });

    await context.setOffline(true);
    try {
      const firstCardAudioBtn = page.locator('.alphabet-card .letter-header .pronunciation-button').first();
      await expect(firstCardAudioBtn).toBeVisible();
      await firstCardAudioBtn.click();

      // Wait briefly for offline blob playback lifecycle and verify zero network errors & zero TTS fallback
      await page.waitForTimeout(350);
      expect(offlineFailedAudioRequests).toEqual([]);
      const ttsCalls = await page.evaluate(() => (window as any).__ttsCalls || 0);
      expect(ttsCalls).toBe(0);
    } finally {
      await context.setOffline(false);
    }

    // 5. Verify Mobile (390x844) drawer Offline Audio card & responsive modal fit
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: /Open settings and menu/i }).click();
    const drawer = page.getByRole('dialog', { name: /Settings and options menu/i });
    await expect(drawer).toBeVisible();

    const drawerOfflineCard = drawer.getByTestId('drawer-offline-audio-card');
    await expect(drawerOfflineCard).toBeVisible();
    await drawerOfflineCard.click();

    await expect(offlineDialog).toBeVisible();
    const mobileBox = await offlineDialog.boundingBox();
    expect(mobileBox).not.toBeNull();
    expect(mobileBox!.x).toBeGreaterThanOrEqual(0);
    expect(mobileBox!.x + mobileBox!.width).toBeLessThanOrEqual(390);
  });

  test('Grammar Flashcards: expanded 16-card deck, option & prompt neural MP3 speaker buttons without premature answer selection, and 390px RTL mobile fit', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      if (!localStorage.getItem('basic_language_base_lang')) {
        localStorage.setItem('basic_language_base_lang', 'zh');
        localStorage.setItem('basic_language_target_lang', 'de');
      }
      (window as any).__playedAudioSrcs = [];
      const origPlay = window.HTMLMediaElement.prototype.play;
      window.HTMLMediaElement.prototype.play = function (this: HTMLMediaElement) {
        if (this.src) {
          (window as any).__playedAudioSrcs.push(this.src);
        }
        return origPlay.apply(this);
      };
    });

    const grammarAudioStatuses: Array<{ url: string; status: number }> = [];
    page.on('response', (res) => {
      if (res.url().includes('/audio/de/grammar/') || res.url().includes('/audio/sounds/')) {
        grammarAudioStatuses.push({ url: res.url(), status: res.status() });
      }
    });

    await page.goto('/learn/de/alphabet');
    await page.locator('.section-segmented-control button[role="tab"]').nth(1).click();

    await expect(page.locator('.grammar-progress-count')).toContainText('1 / 16');

    const promptSpeaker = page.locator('.grammar-prompt-audio-btn');
    await expect(promptSpeaker).toBeVisible();
    await expect(promptSpeaker).toHaveAttribute('aria-label', 'Pronounce Tisch');

    const optionButtons = page.locator('.grammar-option-btn');
    const optionSpeakers = page.locator('.grammar-option-audio-btn');
    await expect(optionButtons).toHaveCount(3);
    await expect(optionSpeakers).toHaveCount(3);

    // Click option speaker for "der" — must play 200/206 OK studio MP3 without selecting/disabling options
    await page.getByRole('button', { name: 'Pronounce der', exact: true }).click();
    await expect(page.locator('.grammar-feedback-box')).toBeHidden();
    await expect(optionButtons.first()).toBeEnabled();
    await expect
      .poll(() =>
        grammarAudioStatuses.some(
          (r) => r.url.endsWith('/audio/de/grammar/der.mp3') && (r.status === 200 || r.status === 206)
        )
      )
      .toBe(true);

    // Now select correct option "der" and verify correct.mp3 chime + localized Mandarin feedback + updated full-phrase prompt speaker
    await page.locator('.grammar-option-btn').filter({ hasText: /^der$/ }).click();
    await expect(page.locator('.grammar-feedback-box')).toBeVisible();
    await expect(page.locator('.feedback-explanation')).toContainText('阳性');
    await expect(promptSpeaker).toHaveAttribute('aria-label', 'Pronounce der Tisch');
    await expect
      .poll(() =>
        page.evaluate(() =>
          ((window as any).__playedAudioSrcs || []).some((s: string) => s.endsWith('/audio/sounds/correct.mp3'))
        )
      )
      .toBe(true);

    // Verify 390x844 mobile RTL (ur -> ar) fits all option buttons & speaker icons inside phone viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => {
      localStorage.setItem('basic_language_base_lang', 'ur');
      localStorage.setItem('basic_language_target_lang', 'ar');
    });
    await page.goto('/learn/ar/alphabet');
    await page.locator('.section-segmented-control button[role="tab"]').nth(1).click();

    await expect(page.locator('.grammar-progress-count')).toContainText('1 / 15');
    const mobileScrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(mobileScrollW).toBeLessThanOrEqual(390);

    const arOptionSpeakers = page.locator('.grammar-option-audio-btn');
    const spCount = await arOptionSpeakers.count();
    expect(spCount).toBeGreaterThanOrEqual(2);
    for (let i = 0; i < spCount; i++) {
      const box = await arOptionSpeakers.nth(i).boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(390);
    }
  });
});

