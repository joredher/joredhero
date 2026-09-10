import { useLanguage } from '../i18n/LanguageContext.jsx';
import Arrow from './Arrow.jsx';
import { profile } from '../data/profile.js';
import TechnologyLogo from './TechnologyLogo.jsx';

export function ProjectArtwork() {
  const { t } = useLanguage();
  return <div className="project-art" aria-hidden="true"><div className="mini-browser"><div className="mini-toolbar"><i /><i /><i /><span>joredhero / portfolio</span></div><div className="mini-content"><span>{profile.monogram}.</span><div><b>{t("A space")}<br />{t("of my own.")}</b><i /></div></div></div><span className="project-art-label">{t("DESIGNED TO EVOLVE.")}</span></div>;
}

export default function ProjectCard({ project }) {
  const { t } = useLanguage();
  return <a className="project" href={`#work/${project.id}`}>
    <ProjectArtwork />
    <div className="project-description"><span className="project-status"><i />{t(project.status).toUpperCase()}</span>
      <h3>{t(project.title)}</h3><p>{t(project.summary)}</p>
      <ul className="project-tags">{project.technologies.map(tech => <li key={tech.label}><TechnologyLogo name={tech.label} />{tech.label}</li>)}</ul>
      <span className="project-link">{t("Discover the project ")}<Arrow diagonal /></span>
    </div>
  </a>;
}
