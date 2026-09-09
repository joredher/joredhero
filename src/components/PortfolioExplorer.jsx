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
import './portfolio-explorer.css';

function EmptyState({ title = 'More of the story is on its way.', children }) {
  const { t } = useLanguage();
  return <div className="explorer-empty"><span className="empty-mark" aria-hidden="true">＋</span><h3>{t(title)}</h3><p>{t(children)}</p><span className="pending-label">{t("Details coming soon")}</span></div>;
}

function Overview() {
  const { t } = useLanguage();
  return <>
    <div className="overview-intro"><div><p className="eyebrow">{t("THE FULL PICTURE")}</p><h2 id="explorer-heading">{t("Choose a starting point")}<span className="blue-dot">.</span></h2></div><p>{t(profile.role)}<br />{profile.location}</p></div>
    <p className="overview-description">{t("Explore my work, the tools I use, and the story behind them. Every part of the portfolio is right here.")}</p>
    <div className="overview-grid">{profileCategories.map((category, index) => <a className="overview-card" href={`#${category.section}`} key={category.id}>
      <span className="overview-card-top"><span>0{index + 1}</span><Arrow diagonal /></span><h3>{t(category.label)}</h3><p>{t(category.hint)}</p>
      <span className="overview-card-bottom">{['journey', 'communities'].includes(category.id) ? t('Details coming soon') : t('Explore this section')}</span>
    </a>)}</div>
  </>;
}

function About() {
  const { t } = useLanguage();
  return <div className="about"><h2 id="section-heading">{t("Engineering.")}<br /><span className="muted">{t("With a human side.")}</span></h2>
    <p className="body-copy">{t(profile.biography)}</p>
    <dl className="profile-facts"><div><dt>{t("BASED IN")}</dt><dd>{profile.location}</dd></div><div><dt>{t("LANGUAGES")}</dt><dd>{profile.languages.map(item => t(item)).join(' & ')}</dd></div><div><dt>{t("FOCUS")}</dt><dd>{t(profile.role)}</dd></div></dl>
    <div className="related-links"><a href="#skills">{t("Explore my toolbox ")}<Arrow diagonal /></a><a href="#work">{t("Discover my work ")}<Arrow diagonal /></a></div>
  </div>;
}

function Work({ route }) {
  const { t } = useLanguage();
  const project = projects.find(p => p.id === route.group);
  if (!project) return <><h2 id="section-heading">{t("Work in ")}<span className="muted">{t("motion.")}</span></h2><p className="section-lead">{t("Starting with this space. Select a project to explore how it comes together.")}</p><div className="project-collection">{projects.map(p => <ProjectCard key={p.id} project={p} />)}</div></>;
  return <div className="project-detail"><a className="breadcrumb" href="#work">{t("← All projects")}</a><span className="project-status"><i />{t(project.status).toUpperCase()}</span><h2 id="section-heading">{t(project.title)}</h2><p className="section-lead">{t(project.description)}</p>
    <div className="detail-block"><h3>{t("Inside the project")}</h3><ul className="feature-list">{project.features.map(feature => <li key={feature}>{t(feature)}</li>)}</ul></div>
    <div className="detail-block"><h3>{t("Built with")}</h3><p className="detail-help">{t("Select a technology to explore its connection to this project.")}</p><ul className="technology-links">{project.technologies.map(tech => <li key={tech.href}><a href={tech.href}><TechnologyLogo name={tech.label} />{tech.label}<Arrow diagonal /></a></li>)}</ul></div>
    <a className="button primary" href={project.source} target="_blank" rel="noreferrer">{t("View source on GitHub ")}<Arrow diagonal /></a>
  </div>;
}

function SkillExplorer({ route }) {
  const { t } = useLanguage();
  const group = technologyGroups.find(g => g.id === route.group);
  const technology = group.technologies.find(t => t.id === route.item);
  if (technology) return <div className="technology-detail"><a className="breadcrumb" href={`#skills/${group.id}`}>← {t(group.label)}</a><p className="eyebrow">{t('TECH STACK')} / {t(group.label)}</p><h2 id="section-heading"><TechnologyLogo name={technology.name} />{technology.name}</h2><p className="section-lead">{t(technology.description, { name: technology.name })}</p>
    <div className="detail-block"><h3>{t("Connected projects")}</h3>{technology.projectIds.length ? technology.projectIds.map(id => { const project = projects.find(p => p.id === id); return <a className="related-project" key={id} href={`#work/${id}`}><span><strong>{t(project.title)}</strong><small>{t(project.status)}</small></span><Arrow diagonal /></a>; }) : <p className="detail-help">{t("Related project and experience details haven’t been added yet.")}</p>}</div>
  </div>;
  return <div className="skill-explorer"><h2 id="section-heading">{t("My ")}<span className="muted">{t("toolbox.")}</span></h2><p className="section-lead">{t("Choose a group, then a technology to discover where it fits.")}</p>
    <SectionTabs groups={technologyGroups} selectedId={group.id} base="skills" label={t("Technology categories")} />
    {technologyGroups.map(g => <div key={g.id} id={`panel-${g.id}`} role="tabpanel" aria-labelledby={`tab-${g.id}`} tabIndex={0} hidden={group.id !== g.id}>
      {g.technologies.length ? <ul className="technology-grid">{g.technologies.map(tech => <li key={tech.id}><a href={`#skills/${g.id}/${tech.id}`}><span className="technology-name"><TechnologyLogo name={tech.name} />{tech.name}</span><Arrow diagonal /></a></li>)}</ul> : <EmptyState title={t("A space for AI exploration.")}>{t(g.status)}</EmptyState>}
    </div>)}
  </div>;
}

function Journey({ route }) {
  const { t } = useLanguage();
  return <div><h2 id="section-heading">{t("The journey ")}<span className="muted">{t("so far.")}</span></h2><p className="section-lead">{t("Experience, learning, and the milestones along the way.")}</p><SectionTabs groups={journeyGroups} selectedId={route.group} base="journey" label={t("Journey categories")} />
    {journeyGroups.map(group => <div id={`panel-${group.id}`} role="tabpanel" aria-labelledby={`tab-${group.id}`} tabIndex={0} hidden={route.group !== group.id} key={group.id}>
      {group.entries.length ? <ol className="journey-timeline">{group.entries.map(entry => <li key={entry.id}><details><summary>{t(entry.title)}<span>{entry.period}</span></summary><p>{entry.organization}</p><p>{t(entry.summary)}</p><ul>{entry.details?.map(detail => <li key={detail}>{t(detail)}</li>)}</ul></details></li>)}</ol> : <EmptyState title={t('{category}, in time.', { category: t(group.label) })}>{t(group.description)}</EmptyState>}
    </div>)}
  </div>;
}

function Communities() {
  const { t } = useLanguage();
  return <div><h2 id="section-heading">{t("Building ")}<span className="muted">{t("with others.")}</span></h2><p className="section-lead">{t("The people, events, and contributions that connect the work.")}</p>{communities.length ? communities.map(community => <details className="community-card" key={community.id}><summary>{community.name}</summary><p>{t(community.description)}</p></details>) : <EmptyState title={t("More connections to share.")}>{t("Community participation and contributions will appear here as I add more of my story.")}</EmptyState>}</div>;
}

function Contact() {
  const { t } = useLanguage();
  return <div className="contact-panel"><h2 id="section-heading">{t("Have something")}<br />{t("in ")}<span className="muted">{t("mind?")}</span></h2><p className="section-lead">{t("A project, an idea, or just a hello. Let’s start a conversation.")}</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<Arrow diagonal /></a><span className="contact-note">{t("Opens your email app")}</span>
    <div className="detail-block"><h3>{t("Social profiles")}</h3><SocialProfiles /></div>
    <div className="detail-block"><h3>{t("Find the work")}</h3><a className="related-project" href={profile.github} target="_blank" rel="noreferrer"><span><strong>{t("Portfolio on GitHub")}</strong><small>{t("Explore the source · opens in a new tab")}</small></span><Arrow diagonal /></a></div>
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
  const overview = route.section === 'home' || route.section === 'overview';
  const selected = profileCategories.find(category => category.section === route.section);
  return <section id="overview" tabIndex={-1} className="content-section portfolio-explorer" aria-label={t("Portfolio overview and sections")}>
    {overview ? <Overview /> : <>
      <div className="explorer-toolbar"><a href="#overview">{t("← All sections")}</a><a href="#home">{t("Back to the map ↑")}</a></div>
      <div className="explorer-layout"><nav className="explorer-navigation" aria-label={t("Portfolio sections")}>{profileCategories.map((category, index) => <a key={category.id} href={`#${category.section}`} aria-current={selected?.id === category.id ? 'location' : undefined}><span>0{index + 1}</span>{t(category.label)}<Arrow diagonal /></a>)}</nav>
        <div id="explorer-panel"><article id={route.anchor} tabIndex={-1} className="explorer-content" aria-labelledby="section-heading" key={route.section}>
          {selected && <p className="eyebrow explorer-section-label">{t(selected.label)}</p>}
          {route.section === 'about' && <About />}
          {route.section === 'work' && <Work route={route} />}
          {route.section === 'skills' && <SkillExplorer route={route} />}
          {route.section === 'journey' && <Journey route={route} />}
          {route.section === 'communities' && <Communities />}
          {route.section === 'contact' && <Contact />}
          {route.section === 'missing' && <div><h2 id="section-heading">{t("Let’s find your way back.")}</h2><p className="section-lead">{t("That section or detail isn’t available. Choose a section from the overview.")}</p><a className="button primary" href="#overview">{t("Explore all sections ")}<Arrow /></a></div>}
          <ShareSection key={route.anchor} />
        </article></div>
      </div>
    </>}
  </section>;
}
