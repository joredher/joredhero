import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import App from './App.jsx';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import SeoSummary from './components/SeoSummary.jsx';
import { profile } from './data/profile.js';
import { resolveBilingual } from './i18n/bilingual.js';

// TODO: replace with the real production domain once hosting is chosen (also appears
// in index.html's canonical/og:url tags and public/robots.txt + sitemap.xml).
const SITE_URL = 'https://your-domain.example';

// Mirrors main.jsx's tree so the prerendered markup matches the client's first render exactly.
export function renderApp() {
  return renderToString(
    <React.StrictMode>
      <LanguageProvider><App /></LanguageProvider>
    </React.StrictMode>,
  );
}

// A separate static pass, outside the hydration root — see SeoSummary.jsx for why.
export function renderSeoSummary() {
  return renderToStaticMarkup(<SeoSummary />);
}

// Generated from the same profile data used everywhere else, rather than hand-duplicated.
export function renderPersonJsonLd() {
  const en = resolveBilingual;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.fullName,
    email: profile.email,
    jobTitle: en(profile.role),
    description: en(profile.biography),
    address: { '@type': 'PostalAddress', addressLocality: profile.location },
    url: SITE_URL,
    sameAs: [profile.github],
  });
}
