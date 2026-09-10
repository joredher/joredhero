// Runs after the client and SSR builds (see package.json's "build" script). Splices
// server-rendered markup into dist/index.html: the real app shell replaces the empty
// #root div (for main.jsx to hydrate), and a separate, always-visible-to-crawlers
// SeoSummary is inserted as a sibling, outside the hydration root — see
// src/components/SeoSummary.jsx for why that has to be a separate pass.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const indexPath = path.join(rootDir, 'dist', 'index.html');
const ssrEntryPath = path.join(rootDir, 'dist-ssr', 'entry-server.js');
const ssrDir = path.join(rootDir, 'dist-ssr');

const { renderApp, renderSeoSummary, renderPersonJsonLd } = await import(pathToFileURL(ssrEntryPath));

let html = await readFile(indexPath, 'utf8');

const rootPlaceholder = '<div id="root"></div>';
if (!html.includes(rootPlaceholder)) {
  throw new Error(`prerender: could not find ${JSON.stringify(rootPlaceholder)} in dist/index.html — did the Vite output shape change?`);
}
html = html.replace(rootPlaceholder, `<div id="root">${renderApp()}</div>`);

const seoMarker = '<!--seo-summary-->';
if (!html.includes(seoMarker)) {
  throw new Error(`prerender: could not find ${JSON.stringify(seoMarker)} in dist/index.html — was it removed from index.html?`);
}
const seoBlock = [
  `<div id="seo-summary" class="sr-only" inert="">${renderSeoSummary()}</div>`,
  `<script type="application/ld+json">${renderPersonJsonLd()}</script>`,
].join('');
html = html.replace(seoMarker, seoBlock);

await writeFile(indexPath, html);
await rm(ssrDir, { recursive: true, force: true });
