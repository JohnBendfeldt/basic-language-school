import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function renderOgImage() {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2
  });

  const svgPath = path.resolve(__dirname, '../public/og-image.svg');
  const svgContent = fs.readFileSync(svgPath, 'utf8');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body, html { width: 1200px; height: 630px; overflow: hidden; background: #0b0f19; }
          svg { width: 1200px; height: 630px; display: block; }
        </style>
      </head>
      <body>
        ${svgContent}
      </body>
    </html>
  `);

  await page.waitForTimeout(500);

  const pngPath = path.resolve(__dirname, '../public/og-image.png');
  await page.screenshot({
    path: pngPath,
    type: 'png',
    clip: { x: 0, y: 0, width: 1200, height: 630 }
  });

  console.log(`Rendered high-res OG image to: ${pngPath}`);
  await browser.close();
}

renderOgImage().catch(err => {
  console.error('Error rendering OG image:', err);
  process.exit(1);
});
