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

    const iSpeakTab = langModal.locator('.pair-tab-btn').nth(1);
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
    const colorsPill = filterBar.locator('button[data-category="Colors"]');
    const weatherPill = filterBar.locator('button[data-category="Weather"]');

    await expect(techPill).toBeVisible();
    await expect(colorsPill).toBeVisible();
    await expect(weatherPill).toBeVisible();

    // Filter to Tech & IT pack
    await techPill.click();
    await expect(page.locator('h3.phrase-text', { hasText: /^Contraseña$/ })).toBeVisible();
    await expect(page.locator('h3.phrase-text', { hasText: /^Agua$/ })).toBeHidden();

    // Filter to Colors pack
    await colorsPill.click();
    await expect(page.locator('h3.phrase-text', { hasText: /^Rojo$/ })).toBeVisible();
    await expect(page.locator('h3.phrase-text', { hasText: /^Contraseña$/ })).toBeHidden();

    // Filter to Weather pack
    await weatherPill.click();
    await expect(page.locator('h3.phrase-text', { hasText: /^Tormenta$/ })).toBeVisible();
  });
});

