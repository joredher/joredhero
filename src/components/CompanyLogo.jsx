import { useState } from 'react';
import Building from './Building.jsx';
import delta from '../assets/companies/delta.png';
import r8write from '../assets/companies/r8write.svg';
import fixu from '../assets/companies/fixu.svg';
import legopstech from '../assets/companies/legopstech.svg';
import creandosoft from '../assets/companies/creandosoft.png';
import sistemasInteligentes from '../assets/companies/sistemas-inteligentes.png';

// `plate` is the backing each artwork needs to stay legible on the dark UI: white artwork sits on a
// dark plate, dark artwork on a light one (the same idea as TechnologyLogo's tiles). A company with
// no entry here — or whose image fails to load — shows the company icon instead.
const logos = {
  delta: { src: delta, plate: 'light' },
  r8write: { src: r8write, plate: 'light' },
  fixu: { src: fixu, plate: 'dark' },
  legopstech: { src: legopstech, plate: 'light' },
  creandosoft: { src: creandosoft, plate: 'light' },
  'sistemas-inteligentes': { src: sistemasInteligentes, plate: 'light' },
};

// Decorative: the company name always sits right next to it.
export default function CompanyLogo({ companyId }) {
  const [failed, setFailed] = useState(false);
  const logo = failed ? undefined : logos[companyId];
  return <span className={`company-logo plate-${logo?.plate ?? 'dark'}${logo ? '' : ' is-fallback'}`} aria-hidden="true">
    {logo
      ? <img src={logo.src} alt="" loading="lazy" decoding="async" draggable="false" onError={() => setFailed(true)} />
      : <Building />}
  </span>;
}
