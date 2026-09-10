import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { projects } from '../../data/projects.js';
import ProjectCard from '../ProjectCard.jsx';
import TechnologyLogo from '../TechnologyLogo.jsx';
import Arrow from '../Arrow.jsx';

export default function Work({ route }) {
  const { t } = useLanguage();
  const project = projects.find(p => p.id === route.group);
  if (!project) return <><h2 id="section-heading">{t("Work in ")}<span className="muted">{t("motion.")}</span></h2><p className="section-lead">{t("Starting with this space. Select a project to explore how it comes together.")}</p><div className="project-collection">{projects.map(p => <ProjectCard key={p.id} project={p} />)}</div></>;
  return <div className="project-detail"><a className="breadcrumb" href="#work">{t("← All projects")}</a><span className="project-status"><i />{t(project.status).toUpperCase()}</span><h2 id="section-heading">{t(project.title)}</h2><p className="section-lead">{t(project.description)}</p>
    <details className="detail-block" open><summary>{t("Inside the project")}</summary><ul className="feature-list">{project.features.map(feature => <li key={feature}>{t(feature)}</li>)}</ul></details>
    <details className="detail-block" open><summary>{t("Built with")}</summary><p className="detail-help">{t("Select a technology to explore its connection to this project.")}</p><ul className="technology-links">{project.technologies.map(tech => <li key={tech.href}><a href={tech.href}><TechnologyLogo name={tech.label} />{tech.label}<Arrow diagonal /></a></li>)}</ul></details>
    <a className="button primary" href={project.source} target="_blank" rel="noreferrer">{t("View source on GitHub ")}<Arrow diagonal /></a>
  </div>;
}
