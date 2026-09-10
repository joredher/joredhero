import { socialLinks } from '../data/socialLinks.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import github from '../assets/icons/github.svg';
import linkedin from '../assets/icons/linkedin.svg';
import whatsapp from '../assets/icons/whatsapp.svg';

function SocialIcon({ id }) {
  if (id === 'instagram') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" /></svg>;
  const src = { github, linkedin, whatsapp }[id];
  return src ? <img className={`social-icon social-icon-${id}`} src={src} alt="" width="22" height="22" /> : null;
}
export default function SocialProfiles() {
  const { t } = useLanguage();
  return <nav className="social-profiles" aria-label={t('Social profiles')}>
    {socialLinks.map(link => <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer" title={link.label} aria-label={`${link.label} (${t('opens in a new tab')})`}><SocialIcon id={link.id} /></a>)}
  </nav>;
}
