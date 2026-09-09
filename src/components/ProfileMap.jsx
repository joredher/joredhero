import { useLanguage } from '../i18n/LanguageContext.jsx';
import { profile } from '../content.js';
import { defaultProfilePhoto } from '../data/profilePhotos.js';
import { profileCategories } from '../data/profileCategories.js';
import ProfileImage from './ProfileImage.jsx';
import InteractiveNode from './InteractiveNode.jsx';
import './profile-map.css';

export default function ProfileMap({ route }) {
  const { t } = useLanguage();
  return <div className="profile-map-experience">
    <div className="map-overline"><span>{t("EXPLORE THE CONNECTIONS")}</span><span>{t("SIX DIMENSIONS. ONE STORY.")}</span></div>
    <div className="profile-map" role="group" aria-label={t("Explore my professional profile")} aria-describedby="map-instructions">
      <div className="map-portrait profile-stage">
        <div className="profile-halo" aria-hidden="true" /><div className="profile-outline" aria-hidden="true" />
        <ProfileImage photo={defaultProfilePhoto} href="#overview" name={profile.name} />
      </div>
      {profileCategories.map((category, index) => <InteractiveNode key={category.id} category={category} index={index} selected={route.section === category.section} />)}
    </div>
    <p id="map-instructions" className="map-instructions"><span aria-hidden="true">↗</span>{t(" Choose a dimension to discover more. Click my photo for the full overview.")}</p>
  </div>;
}
