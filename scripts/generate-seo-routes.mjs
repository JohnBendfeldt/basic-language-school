import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const BASE_URL = 'https://basiclanguage.school';

const seoMetadata = JSON.parse(
  fs.readFileSync(path.join(ROOT_DIR, 'src/data/languages/seoMetadata.json'), 'utf-8')
);

const SECTIONS_WITH_TIME = ['alphabet', 'grammar', 'phrases', 'words', 'numbers', 'time', 'quiz'];
const SECTIONS_NO_TIME = ['alphabet', 'grammar', 'phrases', 'words', 'numbers', 'quiz'];

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const indexPath = path.join(DIST_DIR, 'index.html');
if (!fs.existsSync(indexPath)) {
  throw new Error(`Missing built index.html at ${indexPath}`);
}

const template = fs.readFileSync(indexPath, 'utf-8');

const routes = [
  {
    path: '/about',
    title: 'About & Contact | Basic Language School',
    description:
      'Learn about Basic Language School, created by John Bendfeldt — a free, privacy-friendly platform for learning 15 world languages across 210 pairs with studio audio.',
    heading: 'About Basic Language School',
    summary:
      'Created by John Bendfeldt, Basic Language School provides free online courses across 15 world languages and 210 bidirectional pairs with studio neural audio, grammar flashcards, phonetic keyboards, and spaced-repetition quizzes.',
    navLinks: [
      { href: '/', label: 'Basic Language School Home' },
      { href: '/learn/es/alphabet', label: 'Learn Spanish' },
      { href: '/learn/fr/alphabet', label: 'Learn French' },
      { href: '/learn/de/alphabet', label: 'Learn German' },
      { href: '/learn/ru/alphabet', label: 'Learn Russian' },
      { href: '/learn/ja/alphabet', label: 'Learn Japanese' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
    ],
  },
];

for (const [langId, langInfo] of Object.entries(seoMetadata)) {
  const sections = langInfo.hasTimeGuide ? SECTIONS_WITH_TIME : SECTIONS_NO_TIME;
  for (const section of sections) {
    const meta = langInfo.seo[section];
    if (!meta) continue;
    routes.push({
      path: `/learn/${langId}/${section}`,
      title: meta.title,
      description: meta.description,
      heading: meta.title.replace(/\s*\|\s*Basic Language School$/i, ''),
      summary: meta.description,
      navLinks: [
        { href: '/', label: 'Basic Language School Home (15 Languages)' },
        ...sections.map((s) => ({
          href: `/learn/${langId}/${s}`,
          label: `${langInfo.name} ${s.charAt(0).toUpperCase() + s.slice(1)}`,
        })),
        { href: '/about', label: 'About Basic Language School' },
      ],
    });
  }
}

for (const route of routes) {
  const canonicalUrl = `${BASE_URL}${route.path}`;
  const escapedTitle = escapeHtml(route.title);
  const escapedDesc = escapeHtml(route.description);

  const navItemsHtml = route.navLinks
    .map((l) => `          <li><a href="${escapeHtml(l.href)}">${escapeHtml(l.label)}</a></li>`)
    .join('\n');

  const html = template
    .replace(/<title>[\s\S]*?<\/title>/i, () => `<title>${escapedTitle}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      () => `<meta name="description" content="${escapedDesc}" />`
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      () => `<link rel="canonical" href="${canonicalUrl}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
      () => `<meta property="og:url" content="${canonicalUrl}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      () => `<meta property="og:title" content="${escapedTitle}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      () => `<meta property="og:description" content="${escapedDesc}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
      () => `<meta name="twitter:title" content="${escapedTitle}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
      () => `<meta name="twitter:description" content="${escapedDesc}" />`
    )
    .replace(
      /<noscript>[\s\S]*?<\/noscript>/i,
      () => `<noscript>
      <h1>${escapeHtml(route.heading)}</h1>
      <p>${escapeHtml(route.summary)} Created by <a href="https://johnbendfeldt.com/" rel="author">John Bendfeldt</a>. Please enable JavaScript to use the full interactive app.</p>
      <nav aria-label="Course navigation">
        <ul>
${navItemsHtml}
        </ul>
      </nav>
    </noscript>`
    );

  const outFile = path.join(DIST_DIR, `${route.path.replace(/^\/+/, '')}.html`);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html, 'utf-8');
}

console.log(`Generated ${routes.length} static SEO route HTML files in dist/`);
