import { useLanguage } from '../i18n/LanguageContext.jsx';
import { technologyHref } from '../data/technologies.js';
import TechnologyLogo from './TechnologyLogo.jsx';

function EntryContent({ entry }) {
  const { t } = useLanguage();
  return <>
          <p className="journey-location">
            {
              t(entry.location)}{entry.partTime && <> · {t('Part-time')}</>
            }
            </p>
          <p>{t(entry.summary)}</p>
          {
            entry.details.length > 0 && <ul className="feature-list">
              {
                entry.details.map((detail, index) => 
                  <li key={index}>{t(detail)}</li>)
              }
            </ul>
          }
          {
            entry.technologies?.length > 0 && <div className="journey-stack">
              <h4>{t('Technologies used')}</h4>
              <ul className="technology-links">
                {
                  entry.technologies.map(name => 
                    <li key={name}>
                      <a href={technologyHref(name)}>
                        <TechnologyLogo name={name} />{name}
                      </a>
                    </li>)
                }
              </ul>
            </div>}
        </>;
}

export default function JourneyTimeline({ group, selectedId }) {
  const { t } = useLanguage();
  const selected = group.entries.find(entry => entry.id === selectedId);
  
  if (selected) 
    return <div className="journey-entry-detail">
              <a
                className="breadcrumb"
                href={`#journey/${group.id}`}>← {t(group.label)}
              </a>
              <h3>{t(selected.title)}</h3>
              <p className="journey-organization">{selected.organization}</p>
              <p className="journey-period">{t(selected.period)}</p>
              <EntryContent entry={selected} />
            </div>;
            
  return <ol className="journey-timeline">
            {
              group.entries.map(entry => 
                <li key={entry.id}>
                  <details>
                    <summary>
                      <span className="journey-title">{t(entry.title)}</span>
                      <span className="journey-organization">{entry.organization}</span>
                      <span className="journey-period">
                        {
                          t(entry.period)}{entry.partTime && <> · {t('Part-time')}</>}
                      </span>
                    </summary>
                    <EntryContent entry={entry} />
                    <a className="breadcrumb entry-permalink"
                      href={`#journey/${group.id}/${entry.id}`}>
                        {
                          t('Open this entry')} ↗
                    </a>
                  </details>
                </li>)
            }
          </ol>;
}
