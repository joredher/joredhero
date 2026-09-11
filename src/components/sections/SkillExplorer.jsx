import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { technologyGroups } from '../../data/technologies.js';
import { experience } from '../../data/experience.js';
import { projects } from '../../data/projects.js';
import TechnologyLogo from '../TechnologyLogo.jsx';
import Arrow from '../Arrow.jsx';

export default function SkillExplorer({ route }) {
  const { t } = useLanguage();
  const group = technologyGroups.find(g => g.id === route.group);
  const technology = group.technologies.find(item => item.id === route.item);
  if (technology) return <div className="technology-detail">
                              <a className="breadcrumb"
                                href={`#skills/${group.id}`}>
                                  ← {t(group.label)}
                              </a>
                              <p className="eyebrow">
                                {t('TECH STACK')} / {t(group.label)}
                              </p>
                              <h2 id="section-heading">
                                <TechnologyLogo
                                  name={technology.name}
                                  symbol={technology.symbol} />
                                  {
                                    t(technology.label)
                                  }
                              </h2>
                              <p className="section-lead">
                                {
                                  t(technology.description)
                                }
                              </p>
                              {
                                technology.experienceIds.length > 0 && 
                                  <details className="detail-block" open>
                                    <summary>
                                      {t('Related experience')}
                                    </summary>
                                    {
                                      technology.experienceIds.map(id => { 
                                        const entry = experience.find(item => item.id === id); 
                                        return <a 
                                                className="related-project"
                                                key={id} 
                                                href={`#journey/experience/${id}`}>
                                                  <span>
                                                    <strong>{entry.organization}</strong>
                                                    <small>{t(entry.title)} · {t(entry.period)}</small>
                                                    </span><Arrow diagonal />
                                                </a>; })
                                    }
                                  </details>
                              }
                              {
                                technology.projectIds.length > 0 && 
                                  <details className="detail-block" open>
                                    <summary>
                                      {
                                        t('Connected projects')
                                      }
                                    </summary>
                                    {
                                      technology.projectIds.map(id => { 
                                        const project = projects.find(item => item.id === id); 
                                        return <a className="related-project" 
                                                  key={id} 
                                                  href={`#work/${id}`}>
                                                    <span>
                                                      <strong>{t(project.title)}</strong>
                                                      <small>{t(project.status)}</small>
                                                    </span><Arrow diagonal />
                                                </a>; })
                                    }
                                  </details>
                              }
                          </div>;

  return <div className="skill-explorer">
            <h2 id="section-heading">
              {t('My ')}<span className="muted">{t('toolbox.')}</span>
            </h2>
            <p className="section-lead">
              {
                t('Choose a technology to discover where it fits.')
              }
            </p>
            {
              technologyGroups.map(g =>
                <section key={g.id} className="explorer-group" aria-labelledby={`group-heading-${g.id}`}>
                  <h3 id={`group-heading-${g.id}`}>{t(g.label)}</h3>
                  <p className="skill-group-description">{t(g.description)}</p>
                  <ul className="technology-grid">
                    {
                      g.technologies.map(tech =>
                        <li key={tech.id}>
                          <a href={`#skills/${g.id}/${tech.id}`}>
                            <span className="technology-name">
                              <TechnologyLogo
                                name={tech.name}
                                symbol={tech.symbol} />
                                {t(tech.label)}
                            </span>
                            <Arrow diagonal />
                          </a>
                        </li>)
                    }
                  </ul>
                </section>)}
          </div>;
}
