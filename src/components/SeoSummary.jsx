import { profile } from '../data/profile.js';
import { experience } from '../data/experience.js';
import { education, certifications } from '../data/education.js';
import { technologyGroups } from '../data/technologies.js';
import { projects } from '../data/projects.js';
import { communities } from '../data/communities.js';
import { socialLinks } from '../data/socialLinks.js';
import { resolveBilingual } from '../i18n/bilingual.js';

// Build-time-only content has no per-visitor language, so this reads English directly off
// the bilingual { en, es } shapes rather than depending on LanguageContext.
const en = (value) => resolveBilingual(value);

function JourneyEntry({ entry }) {
  return <article>
    <h4>{en(entry.title)}{entry.organization ? ` — ${entry.organization}` : ''}</h4>
    <p>{[en(entry.period), en(entry.location), entry.partTime ? 'Part-time' : ''].filter(Boolean).join(' · ')}</p>
    {en(entry.summary) && <p>{en(entry.summary)}</p>}
    {entry.details?.length > 0 && <ul>{entry.details.map((detail, index) => <li key={index}>{en(detail)}</li>)}</ul>}
    {entry.technologies?.length > 0 && <p>Technologies: {entry.technologies.join(', ')}</p>}
  </article>;
}

// A separate, flat, always-fully-expanded summary of the same content the interactive
// modals show — see the "Make the résumé content itself crawlable" note in the project
// plan for why this can't just reuse those components (they hide all-but-one tab/group
// behind `hidden`, which most crawlers treat like content that was never there).
export default function SeoSummary() {
  return <div>
    <h2>{profile.name} — {en(profile.role)}</h2>
    <p>{profile.fullName}</p>
    <p>{en(profile.biography)}</p>
    <p>{en(profile.background)}</p>
    <dl>
      <div><dt>Based in</dt><dd>{profile.location}</dd></div>
      <div><dt>Languages</dt><dd>{profile.languages.join(', ')}</dd></div>
      <div><dt>Contact</dt><dd>{profile.email}</dd></div>
    </dl>

    <h3>Experience</h3>
    {experience.map(entry => <JourneyEntry key={entry.id} entry={entry} />)}

    <h3>Education</h3>
    {education.map(entry => <JourneyEntry key={entry.id} entry={entry} />)}

    <h3>Certifications</h3>
    {certifications.map(entry => <JourneyEntry key={entry.id} entry={entry} />)}

    <h3>Technology &amp; tools</h3>
    {technologyGroups.map(group => <section key={group.id}>
      <h4>{en(group.label)}</h4>
      <p>{en(group.description)}</p>
      <ul>{group.technologies.map(tech => <li key={tech.id}>{tech.name}</li>)}</ul>
    </section>)}

    <h3>Projects</h3>
    {projects.map(project => <article key={project.id}>
      <h4>{en(project.title)}</h4>
      <p>{en(project.description)}</p>
      <p>Built with: {project.technologies.map(tech => tech.label).join(', ')}</p>
    </article>)}

    {communities.length > 0 && <>
      <h3>Communities</h3>
      {communities.map(community => <article key={community.id}>
        <h4>{community.name}</h4>
        <p>{en(community.description)}</p>
      </article>)}
    </>}

    <h3>Contact</h3>
    <p>{profile.email}</p>
    <ul>{socialLinks.map(link => <li key={link.id}><a href={link.href}>{link.label}</a></li>)}</ul>
  </div>;
}
