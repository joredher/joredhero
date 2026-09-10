import test from 'node:test';
import assert from 'node:assert/strict';
import { profile } from '../src/data/profile.js';
import { experience } from '../src/data/experience.js';
import { journeyGroups } from '../src/data/journey.js';
import { technologyGroups, technologyHref } from '../src/data/technologies.js';
import { projects } from '../src/data/projects.js';
import { resolvePortfolioLocation } from '../src/hooks/usePortfolioLocation.js';

test('every résumé technology link and related record resolves to real content', () => {
  for (const group of technologyGroups) {
    assert.equal(new Set(group.technologies.map(item => item.id)).size, group.technologies.length);
    for (const item of group.technologies) {
      const route = resolvePortfolioLocation(`#skills/${group.id}/${item.id}`);
      assert.equal(route.item, item.id);
      assert.equal(route.section, 'skills');
      for (const id of item.experienceIds) {
        assert.ok(experience.find(entry => entry.id === id)?.technologies.includes(item.name));
        assert.equal(resolvePortfolioLocation(`#journey/experience/${id}`).section, 'journey');
      }
      for (const id of item.projectIds) assert.ok(projects.some(project => project.id === id));
    }
  }
  for (const entry of experience) for (const name of entry.technologies) {
    assert.notEqual(technologyHref(name), '#skills', `Missing technology: ${name}`);
    assert.equal(resolvePortfolioLocation(technologyHref(name)).section, 'skills');
  }
});

test('all new bilingual records contain both languages', () => {
  let bilingualRecords = 0;
  function check(value) {
    if (!value || typeof value !== 'object') return;
    if ('en' in value || 'es' in value) {
      assert.ok(typeof value.en === 'string' && value.en.trim());
      assert.ok(typeof value.es === 'string' && value.es.trim());
      bilingualRecords++;
    } else Object.values(value).forEach(check);
  }
  [profile, journeyGroups, technologyGroups].forEach(check);
  assert.ok(bilingualRecords > 0);
});

test('legacy technology links and journey aliases survive; invalid records stay unavailable', () => {
  assert.equal(resolvePortfolioLocation('#skills/backend/mysql').group, 'data');
  assert.equal(resolvePortfolioLocation('#skills/backend/laravel').item, 'laravel');
  assert.equal(resolvePortfolioLocation('#skills/portfolio/react').item, 'react');
  assert.equal(resolvePortfolioLocation('#education').group, 'education');
  assert.equal(resolvePortfolioLocation('#journey/certifications/unab-mintic').item, 'unab-mintic');
  for (const hash of ['#journey/experience/missing', '#skills/data/missing', '#constructor', '#%E0%A4%A']) {
    assert.equal(resolvePortfolioLocation(hash).section, 'missing');
  }
});
