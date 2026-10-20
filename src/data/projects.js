import { profile } from './profile.js';

// English copy is the source key; Spanish lives in src/i18n/es.js.
// previewUrl opens from the card's artwork; previewImage is the screenshot shown there.
export const projects = [
  {
    id: 'portfolio',
    title: 'A space of my own.',
    status: 'In progress',
    summary: 'Building this portfolio in React, one thoughtful iteration at a time.',
    description: 'A personal website that connects an interactive portrait map with a direct, accessible way to explore professional information.',
    technologies: [
      { label: 'React', href: '#skills/frontend/react' },
      { label: 'Vite', href: '#skills/frontend/vite' },
      { label: 'CSS', href: '#skills' },
    ],
    features: [
      'A photo-centered map with six professional categories.',
      'Shared sections that open as overlays from the map, each with its own link.',
      'Responsive layouts, keyboard navigation and reduced-motion support.',
      'Section and detail links that work with browser history.',
    ],
    source: profile.github,
    previewUrl: 'https://eocodey.com',
    previewImage: '/previews/portfolio.jpg',
    // Screenshots, responsibilities, dates and public demos can be supplied later.
  },
  {
    id: 'el-gran-bailoteo',
    title: 'A stage for llanero music.',
    status: 'In progress',
    summary: 'Building the landing page for El Gran Bailoteo, one festival edition at a time.',
    description: 'A fast, accessible landing page for a llanero music festival that brings the lineup, sponsors, VIP boxes and ticket checkout together in one place.',
    technologies: [
      { label: 'Next.js', href: '#skills' },
      { label: 'React', href: '#skills/frontend/react' },
      { label: 'TypeScript', href: '#skills/frontend/typescript' },
      { label: 'Playwright', href: '#skills' },
    ],
    features: [
      'An artist lineup with optimized photos and a carousel of sponsors.',
      'Ticket and VIP box sections with an embedded checkout and direct WhatsApp contact.',
      'Ambient llanero music with a player that respects browser autoplay rules.',
      'SEO in Spanish and English, with link-preview images for social sharing.',
      'Responsive layouts, accessible modals and unit and end-to-end test coverage.',
    ],
    source: 'https://github.com/joredher/bailoteolanding',
    previewUrl: 'https://fundacionbandolazo.com.co/el-gran-bailoteo-2026',
    previewImage: '/previews/bailoteo.jpg',
  },
  {
    id: 'lumiere-artesanal',
    title: 'Handmade, from a Yopal kitchen.',
    status: 'Live',
    summary: 'An online storefront for Lumière Artesanal, a small alfajor bakery in Yopal, Casanare.',
    description: 'A warm, mobile-friendly site for a home bakery that serves Argentine-style alfajores, where customers browse the flavors, build a box and send their order through WhatsApp.',
    technologies: [
      { label: 'React', href: '#skills/frontend/react' },
      { label: 'Vite', href: '#skills/frontend/vite' },
    ],
    features: [
      'A catalog of nine alfajor flavors with photos that open for a closer look.',
      'Box builder for minis or large alfajores, with prices and a minimum for single orders.',
      'Orders that open WhatsApp with the request ready to send.',
      'A step-by-step guide to ordering, plus Instagram and WhatsApp contact.',
      'Spanish copy with search-friendly metadata for local discovery.',
    ],
    previewUrl: 'https://xn--lumireartesanal-xmb.eocodey.com/',
    previewImage: '/previews/lumiere.jpg',
  },
];
