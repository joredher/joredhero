import { useLanguage } from '../i18n/LanguageContext.jsx';
import { countries } from '../data/countries.js';
import co from '../assets/icons/co.svg';
import us from '../assets/icons/us.svg';
import cl from '../assets/icons/cl.svg';
import au from '../assets/icons/au.svg';

const flags = { CO: co, US: us, CL: cl, AU: au };

// Shows a country as its flag; the country's name stays as the accessible label and tooltip.
export default function CountryFlag({ code }) {
  const { t } = useLanguage();
  if (!flags[code]) return null;
  const name = t(countries[code].name);
  return <img className="country-flag" src={flags[code]} alt={name} title={name} width="20" height="15" />;
}
