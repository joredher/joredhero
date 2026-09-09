import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useState } from 'react';
import { profile } from '../content.js';
import { profileCategories } from '../data/profileCategories.js';
import { projects } from '../data/projects.js';
import { technologyGroups } from '../data/technologies.js';
import { communities, journeyGroups } from '../data/journey.js';
import ProjectCard from './ProjectCard.jsx';
import SectionTabs from './SectionTabs.jsx';
import Arrow from './Arrow.jsx';
import TechnologyLogo from './TechnologyLogo.jsx';
import SocialProfiles from './SocialProfiles.jsx';
import SectionModal from './SectionModal.jsx';
import JourneyTimeline from './JourneyTimeline.jsx';
import { experience } from '../data/experience.js';
import './portfolio-explorer.css';

function EmptyState({ title = 'More of the story is on its way.', children }) {
  const { t } = useLanguage();
  return <div className="explorer-empty"><span className="empty-mark" aria-hidden="true">＋</span><h3>{t(title)}</h3><p>{t(children)}</p><span className="pending-label">{t("Details coming soon")}</span></div>;
}

function About() {
  const { t } = useLanguage();
  return <div className="about"><h2 id="section-heading">{t("Engineering.")}<br /><span className="muted">{t("With a human side.")}</span></h2>
    <p className="profile-full-name">{profile.fullName}</p><p className="body-copy">{t(profile.biography)}</p><p className="body-copy profile-background">{t(profile.background)}</p>
    <dl className="profile-facts"><div><dt>{t("BASED IN")}</dt><dd>{profile.location}</dd></div><div><dt>{t("LANGUAGES")}</dt><dd>{profile.languages.map(item => t(item)).join(' & ')}</dd></div><div><dt>{t("FOCUS")}</dt><dd>{t(profile.role)}</dd></div></dl>
    <div className="related-links"><a href="#journey/experience">{t("Explore my experience")} <Arrow diagonal /></a><a href="#skills">{t("Explore my toolbox ")}<Arrow diagonal /></a><a href="#work">{t("Discover my work ")}<Arrow diagonal /></a></div>
  </div>;
}

function Work({ route }) {
  const { t } = useLanguage();
  const project = projects.find(p => p.id === route.group);
  if (!project) return <><h2 id="section-heading">{t("Work in ")}<span className="muted">{t("motion.")}</span></h2><p className="section-lead">{t("Starting with this space. Select a project to explore how it comes together.")}</p><div className="project-collection">{projects.map(p => <ProjectCard key={p.id} project={p} />)}</div></>;
  return <div className="project-detail"><a className="breadcrumb" href="#work">{t("← All projects")}</a><span className="project-status"><i />{t(project.status).toUpperCase()}</span><h2 id="section-heading">{t(project.title)}</h2><p className="section-lead">{t(project.description)}</p>
    <details className="detail-block" open><summary>{t("Inside the project")}</summary><ul className="feature-list">{project.features.map(feature => <li key={feature}>{t(feature)}</li>)}</ul></details>
    <details className="detail-block" open><summary>{t("Built with")}</summary><p className="detail-help">{t("Select a technology to explore its connection to this project.")}</p><ul className="technology-links">{project.technologies.map(tech => <li key={tech.href}><a href={tech.href}><TechnologyLogo name={tech.label} />{tech.label}<Arrow diagonal /></a></li>)}</ul></details>
    <a className="button primary" href={project.source} target="_blank" rel="noreferrer">{t("View source on GitHub ")}<Arrow diagonal /></a>
  </div>;
}

function SkillExplorer({ route }) {
  const { t } = useLanguage();
  const group = technologyGroups.find(g => g.id === route.group);
  const technology = group.technologies.find(item => item.id === route.item);
  if (technology) return <div className="technology-detail">
    <a className="breadcrumb" href={`#skills/${group.id}`}>← {t(group.label)}</a>
    <p className="eyebrow">{t('TECH STACK')} / {t(group.label)}</p>
    <h2 id="section-heading"><TechnologyLogo name={technology.name} symbol={technology.symbol} />{t(technology.label)}</h2>
    <p className="section-lead">{t(technology.description)}</p>
    {technology.experienceIds.length > 0 && <details className="detail-block" open><summary>{t('Related experience')}</summary>
      {technology.experienceIds.map(id => { const entry = experience.find(item => item.id === id); return <a className="related-project" key={id} href={`#journey/experience/${id}`}><span><strong>{entry.organization}</strong><small>{t(entry.title)} · {t(entry.period)}</small></span><Arrow diagonal /></a>; })}
    </details>}
    {technology.projectIds.length > 0 && <details className="detail-block" open><summary>{t('Connected projects')}</summary>
      {technology.projectIds.map(id => { const project = projects.find(item => item.id === id); return <a className="related-project" key={id} href={`#work/${id}`}><span><strong>{t(project.title)}</strong><small>{t(project.status)}</small></span><Arrow diagonal /></a>; })}
    </details>}
  </div>;
  return <div className="skill-explorer"><h2 id="section-heading">{t('My ')}<span className="muted">{t('toolbox.')}</span></h2><p className="section-lead">{t('Choose a group, then a technology to discover where it fits.')}</p>
    <SectionTabs groups={technologyGroups} selectedId={group.id} base="skills" label={t('Technology categories')} />
    {technologyGroups.map(g => <div key={g.id} id={`panel-${g.id}`} role="tabpanel" aria-labelledby={`tab-${g.id}`} tabIndex={0} hidden={group.id !== g.id}>
      <p className="skill-group-description">{t(g.description)}</p>
      <ul className="technology-grid">{g.technologies.map(tech => <li key={tech.id}><a href={`#skills/${g.id}/${tech.id}`}><span className="technology-name"><TechnologyLogo name={tech.name} symbol={tech.symbol} />{t(tech.label)}</span><Arrow diagonal /></a></li>)}</ul>
    </div>)}
  </div>;
}

function Journey({ route }) {
  const { t } = useLanguage();
  return <div><h2 id="section-heading">{t('The journey ')}<span className="muted">{t('so far.')}</span></h2><p className="section-lead">{t('Experience, learning, and the milestones along the way.')}</p><SectionTabs groups={journeyGroups} selectedId={route.group} base="journey" label={t('Journey categories')} />
    {journeyGroups.map(group => <div id={`panel-${group.id}`} role="tabpanel" aria-labelledby={`tab-${group.id}`} tabIndex={0} hidden={route.group !== group.id} key={group.id}>
      {group.entries.length ? <JourneyTimeline group={group} selectedId={route.group === group.id ? route.item : undefined} /> : <EmptyState title={t('{category}, in time.', { category: t(group.label) })}>{t(group.description)}</EmptyState>}
    </div>)}
  </div>;
}

function Communities() {
  const { t } = useLanguage();
  return <div><h2 id="section-heading">{t("Building ")}<span className="muted">{t("with others.")}</span></h2><p className="section-lead">{t("The people, events, and contributions that connect the work.")}</p>{communities.length ? communities.map(community => <details className="community-card" key={community.id}><summary>{community.name}</summary><p>{t(community.description)}</p></details>) : <EmptyState title={t("More connections to share.")}>{t("Community participation and contributions will appear here as I add more of my story.")}</EmptyState>}</div>;
}

function Contact() {
  const { t } = useLanguage();
  return <div className="contact-panel"><h2 id="section-heading">{t("Have something")}<br />{t("in ")}<span className="muted">{t("mind?")}</span></h2><p className="section-lead">{t("A project, an idea, or just a hello. Let’s start a conversation.")}</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<Arrow diagonal /></a><span className="contact-note">{t("Opens your email app")}</span><a className="phone-link" href={profile.phoneHref}>{t("Phone")}: {profile.phone}</a>
    <details className="detail-block" open><summary>{t("Social profiles")}</summary><SocialProfiles /></details>
    <details className="detail-block" open><summary>{t("Find the work")}</summary><a className="related-project" href={profile.github} target="_blank" rel="noreferrer"><span><strong>{t("Portfolio on GitHub")}</strong><small>{t("Explore the source · opens in a new tab")}</small></span><Arrow diagonal /></a></details>
    <div className="contact-pending"><span>{t("Résumé")}</span><p>{t("A downloadable résumé is coming soon.")}</p></div>
  </div>;
}

function ShareSection() {
  const { t } = useLanguage();
  const [status, setStatus] = useState('');
  const [fallback, setFallback] = useState('');
  async function copyLink() {
    const url = window.location.href;
    try { await navigator.clipboard.writeText(url); setStatus('Link copied'); setFallback(''); }
    catch { setStatus('Select and copy this address'); setFallback(url); }
  }
  return <div className="share-section"><button type="button" onClick={copyLink}>{t("Copy section link ")}<span aria-hidden="true">↗</span></button><span role="status">{t(status)}</span>{fallback && <input aria-label={t("Section address")} readOnly value={fallback} onFocus={event => event.target.select()} />}</div>;
}

export default function PortfolioExplorer({ route }) {
  const { t } = useLanguage();
  const selected = profileCategories.find(category => category.section === route.section);
  return <SectionModal route={route} selected={selected}>
    {route.section === 'about' && <About />}
    {route.section === 'work' && <Work route={route} />}
    {route.section === 'skills' && <SkillExplorer route={route} />}
    {route.section === 'journey' && <Journey route={route} />}
    {route.section === 'communities' && <Communities />}
    {route.section === 'contact' && <Contact />}
    {route.section === 'missing' && <div><h2 id="section-heading">{t("Let’s find your way back.")}</h2><p className="section-lead">{t("That section or detail isn’t available. Choose a dimension from the map.")}</p><a className="button primary" href="#home">{t("Back to the map ")}<Arrow /></a></div>}
    <ShareSection key={route.anchor} />
  </SectionModal>;
}
