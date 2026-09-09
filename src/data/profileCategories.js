import { profile, skills } from '../content.js';

// Stable category IDs can also serve the later section explorer.
// Pending categories name topics, not unverified achievements or memberships.
export const profileCategories = [
  {
    id: 'about', section: 'about', label: 'About me', hint: 'The person behind the work', icon: 'person',
    title: 'A technical mind. A personal point of view.',
    summary: `I’m ${profile.name}, a systems engineer based in ${profile.location}. This is where my work and the person behind it come together.`,
    items: ['Systems engineering', 'Spanish & English'],
    actions: [{ label: 'More about me', href: '#about' }],
  },
  {
    id: 'journey', section: 'journey', label: 'Journey', hint: 'Experience · Education · Recognition', icon: 'journey',
    title: 'The milestones along the way.',
    summary: 'My experience, education, and professional milestones will be collected here as this portfolio grows.',
    items: ['Experience', 'Education', 'Certifications', 'Recognition'],
    status: 'Details coming soon', actions: [],
  },
  {
    id: 'projects', section: 'work', label: 'Projects', hint: 'Ideas turned into experiences', icon: 'projects',
    title: 'A space of my own.',
    summary: 'The first project here is this portfolio: a personal website built in React and developed one thoughtful iteration at a time.',
    items: skills['This portfolio'],
    actions: [{ label: 'Explore my work', href: '#work' }],
  },
  {
    id: 'technology', section: 'skills', label: 'Tech & AI', hint: 'Tools · Systems · Exploration', icon: 'technology',
    title: 'Explore the tools behind the work.',
    summary: 'Browse my frontend and backend toolbox, along with the technologies used to build this portfolio.',
    items: [...skills.Backend, ...skills['This portfolio']],
    status: 'AI interests and projects coming soon',
    actions: [{ label: 'Explore my toolbox', href: '#skills' }],
  },
  {
    id: 'communities', section: 'communities', label: 'Communities', hint: 'People · Events · Contributions', icon: 'community',
    title: 'Learning and building with others.',
    summary: 'Community participation, events, and contributions will appear here as I add more of my story.',
    items: ['Communities', 'Events', 'Contributions'],
    status: 'Details coming soon', actions: [],
  },
  {
    id: 'connect', section: 'contact', label: 'Connect', hint: 'Contact · Profiles · Résumé', icon: 'connect',
    title: 'The next conversation starts here.',
    summary: 'A project, an idea, or just a hello. Get in touch by email, or take a look at the source of this portfolio.',
    items: [], status: 'More professional profiles and résumé coming soon',
    actions: [{ label: 'Contact me', href: '#contact' }, { label: 'Portfolio on GitHub', href: profile.github, external: true }],
  },
];
