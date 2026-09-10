import { useLanguage } from '../i18n/LanguageContext.jsx';
import Arrow from './Arrow.jsx';
import casanareLogo from '../assets/icons/casanare-dev.svg';

const communityLogos = { 'casanare-dev': casanareLogo };

export default function CommunityCard({ community }) {
  const { t } = useLanguage();
  const logo = communityLogos[community.logoId];
  return <article className="community-card">
    <div className="community-identity">
      <div className="community-logo">{logo
        ? <img src={logo} alt="" width="511" height="59" loading="lazy" />
        : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18" /></svg>}
      </div>
      <div><p className="eyebrow">{t('Community')}</p><h3>{community.name}</h3><p className="community-location">{community.location}</p></div>
    </div>
    <p className="community-description">{t(community.description)}</p>
    <a className="community-members" href={community.membersUrl} target="_blank" rel="noopener noreferrer">{t('Meet the community')}<Arrow diagonal /><span className="sr-only"> ({t('opens in a new tab')})</span></a>
  </article>;
}
