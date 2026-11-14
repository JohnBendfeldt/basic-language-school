import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const appCssPath = path.resolve(__dirname, '../App.css');
const appCss = fs.readFileSync(appCssPath, 'utf8');

function extractRuleBlock(css: string, selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(?:^|\\n)\\s*${escaped}\\s*\\{([^}]*)\\}`, 'g');
  const matches = Array.from(css.matchAll(regex));
  expect(matches.length, `Expected rule block for selector "${selector}"`).toBeGreaterThan(0);
  return matches.map((m) => m[1]).join('\n');
}

describe('Header button sizing and pill geometry consistency', () => {
  const desktopPillSelectors = [
    '.install-button',
    '.header-action-btn',
    '.user-profile-trigger',
    '.language-switcher-trigger',
    '.voice-speed-trigger',
    '.header-search-btn',
  ];

  const desktopCircularIconSelectors = [
    '.quick-swap-nav-btn',
    '.header-offline-btn',
  ];

  it.each(desktopPillSelectors)(
    'keeps desktop header pill %s at a uniform 36px height and full-pill radius',
    (selector) => {
      const declarations = extractRuleBlock(appCss, selector);
      expect(declarations).toMatch(/height:\s*36px\s*;/);
      expect(declarations).toMatch(/box-sizing:\s*border-box\s*;/);
      expect(declarations).toMatch(/border-radius:\s*9999px\s*;/);
    }
  );

  it('does not leave rectangular 8px border-radius on .install-button', () => {
    const declarations = extractRuleBlock(appCss, '.install-button');
    expect(declarations).not.toMatch(/border-radius:\s*8px\s*;/);
  });

  it.each(desktopCircularIconSelectors)(
    'keeps desktop header circular icon button %s at 36x36px with 50% radius',
    (selector) => {
      const declarations = extractRuleBlock(appCss, selector);
      expect(declarations).toMatch(/width:\s*36px\s*;/);
      expect(declarations).toMatch(/height:\s*36px\s*;/);
      expect(declarations).toMatch(/border-radius:\s*50%\s*;/);
    }
  );

  it('unifies mobile header controls to 34px in a final @media (max-width: 768px) block', () => {
    const mobileBlockStart = appCss.lastIndexOf('@media (max-width: 768px)');
    expect(mobileBlockStart).toBeGreaterThan(appCss.indexOf('.header-offline-btn'));

    const tailCss = appCss.slice(mobileBlockStart);
    expect(tailCss).toContain('.language-switcher-trigger');
    expect(tailCss).toContain('.voice-speed-trigger');
    expect(tailCss).toContain('.install-button');
    expect(tailCss).toContain('.header-action-btn');
    expect(tailCss).toContain('.header-search-btn');
    expect(tailCss).toContain('.user-profile-trigger');
    expect(tailCss).toContain('.quick-swap-nav-btn');
    expect(tailCss).toContain('.header-offline-btn');
    expect(tailCss).toMatch(/height:\s*34px\s*;/);
    expect(tailCss).toMatch(/width:\s*34px\s*;\s*\n\s*height:\s*34px\s*;/);
  });
});
