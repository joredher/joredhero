import { profile } from '../content.js';

export const projects = [{
  id: 'portfolio',
  title: 'A space of my own.',
  status: 'In progress',
  summary: 'Building this portfolio in React, one thoughtful iteration at a time.',
  description: 'A personal website that connects an interactive portrait map with a direct, accessible way to explore professional information.',
  technologies: [
    { label: 'React', href: '#skills/portfolio/react' },
    { label: 'Vite', href: '#skills/portfolio/vite' },
    { label: 'CSS', href: '#skills/portfolio/css' },
  ],
  features: [
    'A photo-centered map with six professional categories.',
    'Shared sections that open as overlays from the map, each with its own link.',
    'Responsive layouts, keyboard navigation and reduced-motion support.',
    'Section and detail links that work with browser history.',
  ],
  source: profile.github,
  // Screenshots, responsibilities, dates and public demos can be supplied later.
}];
