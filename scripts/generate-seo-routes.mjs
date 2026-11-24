import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const BASE_URL = 'https://basiclanguage.school';
const PERSON_ID = 'https://johnbendfeldt.com/#person';
const ORG_ID = `${BASE_URL}/#organization`;
const WEBSITE_ID = `${BASE_URL}/#website`;

const SECTIONS_WITH_TIME = ['alphabet', 'grammar', 'phrases', 'words', 'numbers', 'time', 'quiz'];
const SECTIONS_NO_TIME = ['alphabet', 'grammar', 'phrases', 'words', 'numbers', 'quiz'];

const SECTION_LABELS = {
  alphabet: 'Alphabet',
  grammar: 'Grammar',
  phrases: 'Phrases',
  words: 'Words',
  numbers: 'Numbers',
  time: 'Time',
  quiz: 'Quiz',
};

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/**
 * Enriches the root JSON-LD @graph with route-specific WebPage/AboutPage,
 * BreadcrumbList, and per-language Course entities so deep static routes
 * carry full structured data for crawlers.
 */
export function buildRouteJsonLd(baseJsonLd, route) {
  const canonicalUrl = `${BASE_URL}${route.path}`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const graph = Array.isArray(baseJsonLd['@graph']) ? [...baseJsonLd['@graph']] : [];

  if (route.path === '/about') {
    graph.push(
      {
        '@type': 'AboutPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: route.title,
        description: route.description,
        inLanguage: 'en',
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': ORG_ID },
        author: { '@id': PERSON_ID },
        breadcrumb: { '@id': breadcrumbId },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Basic Language School',
            item: `${BASE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About & Contact',
            item: canonicalUrl,
          },
        ],
      }
    );
  } else if (route.langId && route.langName && route.section) {
    const courseId = `${BASE_URL}/learn/${route.langId}#course`;
    const courseUrl = `${BASE_URL}/learn/${route.langId}/alphabet`;
    const inLanguage = route.langId === 'en' ? 'en' : ['en', route.langId];
    const sectionLabel = SECTION_LABELS[route.section] || route.section;

    graph.push(
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: route.title,
        description: route.description,
        inLanguage,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': courseId },
        author: { '@id': PERSON_ID },
        breadcrumb: { '@id': breadcrumbId },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Basic Language School',
            item: `${BASE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: `Basic ${route.langName}`,
            item: courseUrl,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: sectionLabel,
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'Course',
        '@id': courseId,
        name: `Free Online Basic ${route.langName} Course`,
        description: route.description,
        url: courseUrl,
        inLanguage,
        educationalLevel: 'Beginner to Intermediate',
        teaches: `${route.langName} language`,
        isAccessibleForFree: true,
        creator: { '@id': PERSON_ID },
        provider: { '@id': ORG_ID },
        offers: {
          '@type': 'Offer',
          category: 'Free',
          price: '0',
          priceCurrency: 'USD',
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
        },
      }
    );
  }

  return {
    ...baseJsonLd,
    '@graph': graph,
  };
}

export function generateSeoRoutes() {
  const seoMetadata = JSON.parse(
    fs.readFileSync(path.join(ROOT_DIR, 'src/data/languages/seoMetadata.json'), 'utf-8')
  );

  const indexPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) {
    throw new Error(`Missing built index.html at ${indexPath}`);
  }

  const template = fs.readFileSync(indexPath, 'utf-8');
  const ldMatch = template.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  const baseJsonLd = ldMatch ? JSON.parse(ldMatch[1]) : null;

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
        langId,
        langName: langInfo.name,
        section,
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

    let html = template
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

    if (baseJsonLd) {
      const routeJsonLd = buildRouteJsonLd(baseJsonLd, route);
      const serializedLd = JSON.stringify(routeJsonLd, null, 2).replace(/</g, '\\u003c');
      html = html.replace(
        /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
        () => `<script type="application/ld+json">\n${serializedLd}\n    </script>`
      );
    }

    const outFile = path.join(DIST_DIR, `${route.path.replace(/^\/+/, '')}.html`);
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html, 'utf-8');
  }

  // Stamp dist/sitemap.xml <lastmod> with the build date so deploys stay fresh
  const distSitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  if (fs.existsSync(distSitemapPath)) {
    const today = new Date().toISOString().slice(0, 10);
    const sitemapXml = fs
      .readFileSync(distSitemapPath, 'utf-8')
      .replace(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
    fs.writeFileSync(distSitemapPath, sitemapXml, 'utf-8');
  }

  console.log(`Generated ${routes.length} static SEO route HTML files in dist/`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  generateSeoRoutes();
}

