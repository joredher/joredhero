import { useLanguage } from '../../i18n/LanguageContext.jsx';
import Arrow from '../Arrow.jsx';

export default function Missing() {
  const { t } = useLanguage();
  return <div><h2 id="section-heading">{t("Let’s find your way back.")}</h2><p className="section-lead">{t("That section or detail isn’t available. Choose a dimension from the map.")}</p><a className="button primary" href="#home">{t("Back to the map ")}<Arrow /></a></div>;
}
