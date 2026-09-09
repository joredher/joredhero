import { useLanguage } from '../i18n/LanguageContext.jsx';
import { profile } from '../content.js';
import ProfileMap from './ProfileMap.jsx';
import './profile-hero.css';

export default function ProfileHero({ route }) {
  const { t } = useLanguage();
  return <section id="home" className="hero map-hero section-anchor" aria-labelledby="hero-heading">
    <div className="map-hero-intro">
      <div className="hero-copy">
        <p className="eyebrow"><span className="small-line" />{t(profile.role)} / Colombia</p>
        <h1 id="hero-heading">{profile.name}<span className="blue-dot">.</span></h1>
      </div>
      <p className="map-hero-statement">{t("A technical mind.")}<br /><span>{t("A personal point of view.")}</span></p>
    </div>
    <ProfileMap route={route} />
    <div className="hero-footer"><span>{t('BASED IN {location}', { location: profile.location.toUpperCase() })}</span><span className="hero-edition">{t("PORTFOLIO / VOL. 01")}</span></div>
  </section>;
}
