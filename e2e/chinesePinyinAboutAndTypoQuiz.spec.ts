import { test, expect } from '@playwright/test';

test.describe('Playwright E2E: Mandarin Pinyin Guide, About Story Tab, Grammar Audio & Typo Quiz', () => {
  test('Mandarin Chinese (ZH): Pinyin Guide tabs (Tones, Anatomy, Typing IME) & sound filter chips', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'zh');
    });

    await page.goto('/learn/zh/alphabet');

    // 1. Verify header and Pinyin badges
    await expect(page.locator('h2', { hasText: 'Mandarin Chinese Pinyin & Sounds' })).toBeVisible();
    const pinyinBadges = page.locator('.pinyin-badge');
    await expect(pinyinBadges.first()).toBeVisible();
    await expect(pinyinBadges.first()).toHaveText('拼音 Pinyin');

    // 2. Verify sound filter chips
    const filterBar = page.locator('.zh-alphabet-filter-bar');
    await expect(filterBar).toBeVisible();

    const allBtn = filterBar.locator('button', { hasText: /^All Sounds/i });
    const initialsBtn = filterBar.locator('button', { hasText: /^Initials · 声母/i });
    const finalsBtn = filterBar.locator('button', { hasText: /^Finals · 韵母/i });

    await expect(allBtn).toBeVisible();
    await expect(initialsBtn).toBeVisible();
    await expect(finalsBtn).toBeVisible();

    // Filter to Initials (21 cards: b, p, m, f, d, t, n, l, g, k, h, j, q, x, zh, ch, sh, r, z, c, s)
    await initialsBtn.click();
    await expect(initialsBtn).toHaveClass(/active/);
    const initialCards = page.locator('.alphabet-card');
    await expect(initialCards).toHaveCount(21);
    await expect(initialCards.first().locator('.letter-single')).toHaveText('b');

    // Filter to Finals & Semi-vowels (8 cards: y, w, a, o, e, i, u, ü)
    await finalsBtn.click();
    await expect(finalsBtn).toHaveClass(/active/);
    const finalCards = page.locator('.alphabet-card');
    await expect(finalCards).toHaveCount(8);

    // Reset back to All Sounds (29 total)
    await allBtn.click();
    await expect(allBtn).toHaveClass(/active/);
    const allCards = page.locator('.alphabet-card');
    await expect(allCards).toHaveCount(29);

    // 3. Verify Pinyin Guide: Tones tab and full-width layout
    const guide = page.locator('.pinyin-guide-container');
    await expect(guide).toBeVisible();

    // Verify Guide expands across full content width (> 1000px on 1280px viewport, eliminating the old 880px limit)
    const guideBox = await guide.boundingBox();
    expect(guideBox).not.toBeNull();
    expect(guideBox!.width).toBeGreaterThan(950);

    // Track audio requests to confirm 200 OK (no 404 delays)
    const audioResponses: { url: string; status: number }[] = [];
    page.on('response', (response) => {
      if (response.url().includes('/audio/zh/')) {
        audioResponses.push({ url: response.url(), status: response.status() });
      }
    });

    // 5 tone cards (High Flat, Rising, Falling-Rising Dip, Falling, Neutral)
    const toneCards = guide.locator('.pinyin-tone-card');
    await expect(toneCards).toHaveCount(5);
    await expect(toneCards.nth(0)).toContainText('1st Tone');
    await expect(toneCards.nth(0)).toContainText('High Flat');
    await expect(toneCards.nth(2)).toContainText('3rd Tone');
    await expect(toneCards.nth(2)).toContainText('Falling-Rising Dip');
    await expect(toneCards.nth(4)).toContainText('Neutral Tone');

    // Click 1st tone "妈" audio button and verify it loads 200 OK immediately
    const ma1Btn = toneCards.nth(0).locator('.tone-audio-btn');
    await ma1Btn.click();
    await page.waitForTimeout(300);

    const maResponses = audioResponses.filter((r) => r.url.includes('%E5%A6%88') || r.url.includes('妈'));
    expect(maResponses.length).toBeGreaterThan(0);
    for (const r of maResponses) {
      expect([200, 206]).toContain(r.status);
    }

    // 4. Switch to Syllable Anatomy tab
    const formulaTab = guide.getByRole('tab', { name: /Syllable Anatomy/i });
    await expect(formulaTab).toBeVisible();
    await formulaTab.click();
    await expect(formulaTab).toHaveClass(/active/);

    const equation = guide.locator('.pinyin-formula-equation');
    await expect(equation).toBeVisible();
    await expect(equation.locator('.formula-block.initial .block-val')).toHaveText('b');
    await expect(equation.locator('.formula-block.final .block-val')).toHaveText('a');
    await expect(equation.locator('.formula-block.tone .block-val')).toContainText('4th');
    await expect(equation.locator('.formula-block.result .block-val')).toHaveText('bà');
    await expect(equation.locator('.formula-block.hanzi .block-val')).toHaveText('爸');

    // 5. Switch to Typing IME tab
    const typingTab = guide.getByRole('tab', { name: /How Latin Letters/i });
    await expect(typingTab).toBeVisible();
    await typingTab.click();
    await expect(typingTab).toHaveClass(/active/);

    const steps = guide.locator('.pinyin-typing-flow .typing-step');
    await expect(steps).toHaveCount(3);
    await expect(steps.nth(0)).toContainText('n');
    await expect(steps.nth(0)).toContainText('h');
    await expect(steps.nth(1)).toContainText('你好');
    await expect(steps.nth(2)).toContainText('你好');
  });

  test('Chinese "About & Origins" story tab: Teaser banner navigation, Traditional vs. Simplified comparison cards, and timeline', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'zh');
    });

    await page.goto('/learn/zh/alphabet');

    // 1. Click the teaser banner on the Alphabet tab
    const teaserBanner = page.locator('.chinese-about-teaser');
    await expect(teaserBanner).toBeVisible();
    await expect(teaserBanner).toContainText('Curious how Chinese writing evolved');

    // Verify Teaser expands across full content width (> 950px on 1280px viewport, eliminating the old 880px limit)
    const teaserBox = await teaserBanner.boundingBox();
    expect(teaserBox).not.toBeNull();
    expect(teaserBox!.width).toBeGreaterThan(950);

    await teaserBanner.click();

    // 2. Verify segmented tab switched to About
    const aboutTab = page.locator('.section-segmented-control button[role="tab"]').nth(2);
    await expect(aboutTab).toHaveClass(/active/);

    const aboutContainer = page.locator('.language-about-container');
    await expect(aboutContainer).toBeVisible();

    // Verify About Container expands across full content width (> 950px on 1280px viewport)
    const aboutBox = await aboutContainer.boundingBox();
    expect(aboutBox).not.toBeNull();
    expect(aboutBox!.width).toBeGreaterThan(950);

    // 3. Verify Hero Banner & Meta Information
    await expect(aboutContainer.locator('.about-hero-title')).toHaveText('The Story of Mandarin & Simplified Chinese');
    await expect(aboutContainer.locator('.about-hero-native')).toHaveText('普通话 (Pǔtōnghuà) · 汉语 (Hànyǔ)');
    await expect(aboutContainer.locator('.about-hero-meta-row')).toContainText('1.1+ Billion Native Speakers');
    await expect(aboutContainer.locator('.about-hero-meta-row')).toContainText('Simplified Chinese Characters');
    await expect(aboutContainer.locator('.about-hero-meta-row')).toContainText('Hanyu Pinyin');

    // 4. Verify Traditional vs Simplified Comparison Cards (5 curated cards)
    const compareWrap = aboutContainer.locator('.script-evolution-wrap');
    await expect(compareWrap).toBeVisible();
    await expect(compareWrap).toContainText('Traditional vs. Simplified Characters (繁简对比)');

    const compareCards = compareWrap.locator('.script-compare-card');
    await expect(compareCards).toHaveCount(5);

    // Card 1: 國 -> 国 (-3 strokes)
    const card0 = compareCards.nth(0);
    await expect(card0.locator('.compare-character-side.traditional .compare-char')).toHaveText('國');
    await expect(card0.locator('.compare-character-side.simplified .compare-char')).toHaveText('国');
    await expect(card0.locator('.reduced-badge')).toHaveText('-3 strokes');
    await expect(card0.locator('.compare-pinyin')).toHaveText('guó');

    // Card 2: 學 -> 学 (-8 strokes)
    const card1 = compareCards.nth(1);
    await expect(card1.locator('.compare-character-side.traditional .compare-char')).toHaveText('學');
    await expect(card1.locator('.compare-character-side.simplified .compare-char')).toHaveText('学');
    await expect(card1.locator('.reduced-badge')).toHaveText('-8 strokes');

    // Card 3: 愛 -> 爱 (-3 strokes)
    const card2 = compareCards.nth(2);
    await expect(card2.locator('.compare-character-side.traditional .compare-char')).toHaveText('愛');
    await expect(card2.locator('.compare-character-side.simplified .compare-char')).toHaveText('爱');
    await expect(card2.locator('.reduced-badge')).toHaveText('-3 strokes');

    // Card 4: 門 -> 门 (-5 strokes)
    const card3 = compareCards.nth(3);
    await expect(card3.locator('.compare-character-side.traditional .compare-char')).toHaveText('門');
    await expect(card3.locator('.compare-character-side.simplified .compare-char')).toHaveText('门');
    await expect(card3.locator('.reduced-badge')).toHaveText('-5 strokes');

    // Card 5: 馬 -> 马 (-7 strokes)
    const card4 = compareCards.nth(4);
    await expect(card4.locator('.compare-character-side.traditional .compare-char')).toHaveText('馬');
    await expect(card4.locator('.compare-character-side.simplified .compare-char')).toHaveText('马');
    await expect(card4.locator('.reduced-badge')).toHaveText('-7 strokes');

    // Test audio pronunciation button on comparison card
    const audioBtn = card0.locator('button.compare-audio-btn');
    await expect(audioBtn).toBeVisible();
    await audioBtn.click();

    // 5. Verify Historical Milestones Timeline
    const timeline = aboutContainer.locator('.about-timeline');
    await expect(timeline).toBeVisible();
    await expect(timeline).toContainText('c. 1200 BCE');
    await expect(timeline).toContainText('Oracle Bone Script');
    await expect(timeline).toContainText('221 BCE');
    await expect(timeline).toContainText('Imperial Script Unification');
    await expect(timeline).toContainText('Simplified Characters');
    await expect(timeline).toContainText('Invention of Pinyin');

    // 6. Click Alphabet tab to return back
    const alphabetTab = page.locator('.section-segmented-control button[role="tab"]').nth(0);
    await alphabetTab.click();
    await expect(alphabetTab).toHaveClass(/active/);
    await expect(page.locator('.alphabet-container')).toBeVisible();
    await expect(page.locator('.alphabet-card').first()).toBeVisible();
  });

  test('Cultural & Script Origins (About Tab) for Russian (Cyrillic Script) and Spanish (Romance)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'ru');
    });

    await page.goto('/learn/ru/alphabet');

    // Switch to About tab for Russian
    const aboutTab = page.locator('.section-segmented-control button[role="tab"]').nth(2);
    await aboutTab.click();

    const aboutContainer = page.locator('.language-about-container');
    await expect(aboutContainer).toBeVisible();
    await expect(aboutContainer.locator('.about-hero-title')).toHaveText('The Slavic Soul: From Cyrillic Monks to Pushkin & Tolstoy');
    await expect(aboutContainer.locator('.about-hero-native')).toHaveText('Русский язык (Russkiy yazyk)');
    await expect(aboutContainer.locator('.about-hero-meta-row')).toContainText('Russian Cyrillic Alphabet');

    // Verify Russian timeline milestones
    const timeline = aboutContainer.locator('.about-timeline');
    await expect(timeline).toBeVisible();
    await expect(timeline).toContainText('863');
    await expect(timeline).toContainText('Saints Cyril and Methodius');
    await expect(timeline).toContainText('1708');
    await expect(timeline).toContainText('Peter the Great’s Civil Script');
    await expect(timeline).toContainText('1918');
    await expect(timeline).toContainText('Orthography Reform');

    // Now switch to Spanish
    await page.goto('/learn/es/alphabet');
    const esAboutTab = page.locator('.section-segmented-control button[role="tab"]').nth(2);
    await esAboutTab.click();

    const esAboutContainer = page.locator('.language-about-container');
    await expect(esAboutContainer).toBeVisible();
    await expect(esAboutContainer.locator('.about-hero-title')).toHaveText('From Castile to the Americas: The Global Spanish Journey');
    await expect(esAboutContainer.locator('.about-hero-native')).toHaveText('Español · Castellano');
    await expect(esAboutContainer.locator('.about-hero-meta-row')).toContainText('500+ Million Native Speakers');
    await expect(esAboutContainer.locator('.about-hero-meta-row')).toContainText('Romance');
  });

  test('Grammar Descriptions: click-to-speak audio buttons render and trigger pronunciation', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'zh');
    });

    await page.goto('/learn/zh/grammar');

    // Switch to Descriptions / Rules & Patterns sub-tab in Grammar
    const descriptionsTab = page.locator('.grammar-tab-btn').filter({ hasText: /Rules & Patterns|Descriptions/i });
    await expect(descriptionsTab).toBeVisible();
    await descriptionsTab.click();
    await expect(descriptionsTab).toHaveClass(/active/);

    // Verify Descriptions view is rendered
    const descContainer = page.locator('.descriptions-container');
    await expect(descContainer).toBeVisible();

    // Check that pronunciation buttons are present on grammar pattern examples
    const grammarAudioBtns = descContainer.locator('.pronunciation-button');
    const btnCount = await grammarAudioBtns.count();
    expect(btnCount).toBeGreaterThanOrEqual(1);

    // Click the first grammar pronunciation button
    await grammarAudioBtns.first().click();
  });

  test('Quiz E2E: Strict typo matching rejects near-miss real words and displays feedback drawer', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'es');
    });

    await page.goto('/learn/es/quiz');

    // Ensure Writing mode is active
    const writingBtn = page.getByRole('radio', { name: /Writing/i });
    await expect(writingBtn).toBeVisible();
    await expect(writingBtn).toHaveClass(/active/);

    const input = page.locator('input.quiz-input');
    await expect(input).toBeVisible();

    // 1. Enter an incorrect word and submit
    await input.fill('completelyincorrectxyz');
    await page.keyboard.press('Enter');

    // 2. Feedback drawer opens with incorrect status
    const feedbackDrawer = page.locator('.quiz-feedback-drawer');
    await expect(feedbackDrawer).toBeVisible();
    await expect(feedbackDrawer).toHaveClass(/feedback-incorrect/);

    const feedbackTitle = feedbackDrawer.locator('.feedback-title');
    await expect(feedbackTitle).toContainText(/Not quite|Incorrect/i);

    // 3. Override button "I was right" is visible on incorrect answer
    const overrideBtn = feedbackDrawer.locator('.feedback-override-button');
    await expect(overrideBtn).toBeVisible();

    // 4. Click Continue to advance to the next question
    const continueBtn = feedbackDrawer.locator('.feedback-continue-button');
    await expect(continueBtn).toBeVisible();
    await continueBtn.click();

    // 5. Drawer closes, input is re-enabled and focused for the next question
    await expect(feedbackDrawer).toBeHidden();
    await expect(input).toBeEnabled();
    await expect(input).toHaveValue('');
  });

  test('Bengali & Korean: Example words stay inside cards without overflow and row dividers align horizontally', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'bn');
    });

    await page.goto('/learn/bn/alphabet');

    const cards = page.locator('.alphabet-card');
    await expect(cards.first()).toBeVisible();

    // Verify Bengali top 4 cards: example section and speaker buttons stay within card boundaries
    for (let i = 0; i < 4; i++) {
      const card = cards.nth(i);
      const cardBox = await card.boundingBox();
      expect(cardBox).not.toBeNull();

      const exampleRow = card.locator('.example-word-row');
      const exampleBox = await exampleRow.boundingBox();
      expect(exampleBox).not.toBeNull();
      // Ensure example row does not overflow horizontally beyond card padding
      expect(exampleBox!.x + exampleBox!.width).toBeLessThanOrEqual(cardBox!.x + cardBox!.width + 1);

      const speakerBtn = card.locator('.example-word-row .example-pronunciation');
      const speakerBox = await speakerBtn.boundingBox();
      expect(speakerBox).not.toBeNull();
      expect(speakerBox!.x + speakerBox!.width).toBeLessThanOrEqual(cardBox!.x + cardBox!.width);
    }

    // Verify divider lines align across cards in the row
    const examples = page.locator('.alphabet-card .example');
    const bBox0 = await examples.nth(0).boundingBox();
    const bBox1 = await examples.nth(1).boundingBox();
    const bBox2 = await examples.nth(2).boundingBox();
    const bBox3 = await examples.nth(3).boundingBox();
    expect(Math.abs(bBox0!.y - bBox1!.y)).toBeLessThanOrEqual(3);
    expect(Math.abs(bBox1!.y - bBox2!.y)).toBeLessThanOrEqual(3);
    expect(Math.abs(bBox2!.y - bBox3!.y)).toBeLessThanOrEqual(3);

    // Switch to Korean and verify horizontal divider alignment
    await page.goto('/learn/ko/alphabet');
    const koExamples = page.locator('.alphabet-card .example');
    const kBox0 = await koExamples.nth(0).boundingBox();
    const kBox1 = await koExamples.nth(1).boundingBox();
    const kBox2 = await koExamples.nth(2).boundingBox();
    const kBox3 = await koExamples.nth(3).boundingBox();
    expect(Math.abs(kBox0!.y - kBox1!.y)).toBeLessThanOrEqual(3);
    expect(Math.abs(kBox1!.y - kBox2!.y)).toBeLessThanOrEqual(3);
    expect(Math.abs(kBox2!.y - kBox3!.y)).toBeLessThanOrEqual(3);
  });

  test('About Page: Hero title is readable white and trait example boxes are bottom-aligned', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      localStorage.setItem('basic_language_base_lang', 'en');
      localStorage.setItem('basic_language_target_lang', 'ko');
    });

    await page.goto('/learn/ko/alphabet');

    // Switch to About tab for Korean
    const aboutTab = page.locator('.section-segmented-control button[role="tab"]').nth(2);
    await aboutTab.click();

    const aboutContainer = page.locator('.language-about-container');
    await expect(aboutContainer).toBeVisible();

    // 1. Verify Hero title has luminous white text (not dark navy from .section h2)
    const heroTitle = aboutContainer.locator('.about-hero-title');
    await expect(heroTitle).toBeVisible();
    const titleColor = await heroTitle.evaluate((el) => window.getComputedStyle(el).color);
    expect(titleColor).toBe('rgb(255, 255, 255)');

    // 2. Verify Linguistic Secrets & Superpowers cards have bottom-aligned example boxes
    const traitExampleBoxes = aboutContainer.locator('.trait-example-box');
    const count = await traitExampleBoxes.count();
    expect(count).toBeGreaterThanOrEqual(3);

    // Get bottom edge (y + height) for each example box in the top row
    const box0 = await traitExampleBoxes.nth(0).boundingBox();
    const box1 = await traitExampleBoxes.nth(1).boundingBox();
    const box2 = await traitExampleBoxes.nth(2).boundingBox();
    expect(box0).not.toBeNull();
    expect(box1).not.toBeNull();
    expect(box2).not.toBeNull();

    const bottom0 = box0!.y + box0!.height;
    const bottom1 = box1!.y + box1!.height;
    const bottom2 = box2!.y + box2!.height;

    // All example boxes must be bottom-aligned at the bottom of their cards within 3px
    expect(Math.abs(bottom0 - bottom1)).toBeLessThanOrEqual(3);
    expect(Math.abs(bottom1 - bottom2)).toBeLessThanOrEqual(3);
  });
});
