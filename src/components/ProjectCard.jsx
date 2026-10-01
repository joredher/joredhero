import { useLanguage } from '../i18n/LanguageContext.jsx';
import Arrow from './Arrow.jsx';
import { profile } from '../data/profile.js';
import TechnologyLogo from './TechnologyLogo.jsx';

export function ProjectArtwork({ project }) {
  const { t } = useLanguage();
  const url = project?.previewUrl;
  const image = project?.previewImage;
  const host = url ? new URL(url).host : 'joredhero / portfolio';

  const art = <div className="project-art" aria-hidden={url ? undefined : 'true'}>
    <div className="mini-browser">
      <div className="mini-toolbar">
        <i /><i /><i />
        <span>{host}</span>
      </div>
      {image
        ? <div className="mini-frame">
            <img src={image} alt="" loading="lazy" />
          </div>
        : <div className="mini-content">
            <span>{profile.monogram}.</span>
            <div>
              <b>{t("A space")}<br />{t("of my own.")}</b>
              <i />
            </div>
          </div>}
    </div>
    <span className="project-art-label">{t("DESIGNED TO EVOLVE.")}</span>
  </div>;

  // Links can't nest, so the artwork is its own link to the live site.
  return url
    ? <a className="project-art-link"
         href={url}
         target="_blank"
         rel="noreferrer"
         aria-label={`${t("Visit the live site")}: ${host}`}>
        {art}
      </a>
    : art;
}

export default function ProjectCard({ project }) {
  const { t } = useLanguage();
  return <article className="project">
            <ProjectArtwork project={project} />
            <a className="project-description" href={`#work/${project.id}`}>
              <span className="project-status">
                <i />{t(project.status).toUpperCase()}
              </span>
              <h3>{t(project.title)}</h3><p>{t(project.summary)}</p>
              <ul className="project-tags">
                {project.technologies.map(tech =>
                  <li key={tech.label}>
                    <TechnologyLogo name={tech.label} />{tech.label}
                  </li>)}
              </ul>
              <span className="project-link">
                {t("Discover the project ")}
                <Arrow diagonal />
              </span>
            </a>
          </article>;
}
