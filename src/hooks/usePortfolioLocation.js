import { useEffect, useState } from 'react';
import { projects } from '../data/projects.js';
import { technologyGroups } from '../data/technologies.js';
import { journeyGroups } from '../data/journey.js';

// Extend the existing hash navigation; no second router or global state store.
export function resolvePortfolioLocation(hash) {
  let anchor;
  try { anchor = decodeURIComponent(hash.replace(/^#/, '')) || 'home'; }
  catch { return { section: 'missing', anchor: 'invalid-link' }; }
  const aliases = { projects: 'work', technology: 'skills', connect: 'contact', experience: 'journey/experience', education: 'journey/education', certifications: 'journey/certifications', recognition: 'journey/recognition' };
  const canonical = Object.hasOwn(aliases, anchor) ? aliases[anchor] : anchor;
  const [section, group, item, extra] = canonical.split('/');
  const route = { section, group, item, anchor };
  if (extra !== undefined) return { ...route, section: 'missing' };
  if (['home', 'overview', 'about', 'contact', 'communities'].includes(section) && group === undefined) return route;
  if (section === 'work' && item === undefined && (group === undefined || projects.some(p => p.id === group))) return route;
  if (section === 'skills') {
    const technologyGroup = technologyGroups.find(g => g.id === (group || 'frontend'));
    if (technologyGroup && (item === undefined || technologyGroup.technologies.some(t => t.id === item))) return { ...route, group: technologyGroup.id };
  }
  if (section === 'journey' && item === undefined && journeyGroups.some(g => g.id === (group || 'experience'))) return { ...route, group: group || 'experience' };
  return { ...route, section: 'missing' };
}

export default function usePortfolioLocation() {
  const [route, setRoute] = useState(() => resolvePortfolioLocation(window.location.hash));
  useEffect(() => {
    const onHashChange = () => setRoute(resolvePortfolioLocation(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  return route;
}
