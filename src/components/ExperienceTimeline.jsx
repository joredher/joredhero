import { useLanguage } from '../i18n/LanguageContext.jsx';
import { companies } from '../data/companies.js';
import { technologyHref } from '../data/technologies.js';
import Arrow from './Arrow.jsx';
import Building from './Building.jsx';
import Calendar from './Calendar.jsx';
import CompanyLogo from './CompanyLogo.jsx';
import CountryFlag from './CountryFlag.jsx';
import Emphasis, { Accent } from './Emphasis.jsx';
import TechnologyLogo from './TechnologyLogo.jsx';
import linkedin from '../assets/icons/linkedin.svg';
import './experience-timeline.css';

// Title, dates, company, place and links for one role — shared by the timeline cards and the entry page.
// `openHref` adds the link to the role's own page (the cards pass it; that page itself doesn't).
export function ExperienceHeader({ entry, as: Heading = 'h4', openHref }) {
  const { t } = useLanguage();
  const company = companies[entry.companyId];
  const [from, to] = t(entry.period).split(' – ');
  return <header className="experience-head">
    <div className="experience-titleline">
      <Heading className="experience-title" id={`role-${entry.id}`}>
        <Accent text={t(entry.title)} accent={t(entry.titleAccent)} />
      </Heading>
      <p className="experience-when">
        <span className="date-pill">
          <Calendar width="15" height="15" />
          <span>{from}</span>
          {to && <>
            <Arrow width="14" height="14" />
            {entry.current && <span className="live-dot" aria-hidden="true" />}
            <span>{to}</span>
          </>}
        </span>
        {entry.partTime && <span className="chip">{t('Part-time')}</span>}
      </p>
    </div>
    <p className="experience-meta">
      <span className="meta-item">
        <Building width="16" height="16" />
        <a href={company.web} target="_blank" rel="noopener noreferrer">
          {company.name}<span className="sr-only"> ({t('opens in a new tab')})</span>
        </a>
      </span>
      <span className="meta-item">
        <CountryFlag code={company.location.country} />
        {company.location.city}, {company.location.region}
      </span>
      {company.remote && <span className="chip">{t('Remote')}</span>}
      {company.linkedin && <a className="meta-linkedin" href={company.linkedin} target="_blank" rel="noopener noreferrer"
        title="LinkedIn"
        aria-label={`${t('{company} on LinkedIn', { company: company.name })} (${t('opens in a new tab')})`}>
        <img src={linkedin} alt="" width="18" height="18" />
      </a>}
      {openHref && <a className="experience-open" href={openHref} aria-describedby={`role-${entry.id}`}>
        {t('Open this entry')} <Arrow diagonal />
      </a>}
    </p>
  </header>;
}

export default function ExperienceTimeline({ entries }) {
  const { t } = useLanguage();
  return <ol className="experience-timeline">
    {entries.map(entry => <li key={entry.id} className={entry.current ? 'is-current' : undefined}>
      <CompanyLogo companyId={entry.companyId} />
      <article className="experience-card" aria-labelledby={`role-${entry.id}`}>
        <ExperienceHeader entry={entry} openHref={`#journey/experience/${entry.id}`} />
        <ul className="experience-highlights">
          {entry.highlights.map((highlight, index) => <li key={index}><Emphasis>{t(highlight)}</Emphasis></li>)}
        </ul>
        <div className="experience-foot">
          <ul className="technology-links">
            {entry.technologies.map(name => <li key={name}>
              <a href={technologyHref(name)}><TechnologyLogo name={name} />{name}</a>
            </li>)}
          </ul>
        </div>
      </article>
    </li>)}
  </ol>;
}
