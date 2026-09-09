import { skills } from '../content.js';

const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');
const portfolioNotes = {
  React: 'React provides the reusable components and interaction state in this portfolio.',
  Vite: 'Vite runs the local preview and builds the production version of this portfolio.',
  CSS: 'CSS defines the visual identity, responsive layouts and restrained motion in this portfolio.',
};

export const technologyGroups = Object.entries(skills).map(([label, names], index) => ({
  id: ['frontend', 'backend', 'portfolio'][index],
  label,
  technologies: names.map((name) => ({
    id: slug(name), name,
    description: label === 'This portfolio' ? portfolioNotes[name] : '{name} is listed in the original portfolio design. Related work and experience details will be added as they are supplied.',
    projectIds: label === 'This portfolio' ? ['portfolio'] : [],
  })),
}));

technologyGroups.push({ id: 'ai', label: 'AI', technologies: [], status: 'AI interests and projects coming soon.' });
