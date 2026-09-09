import { useLanguage } from './i18n/LanguageContext.jsx';
import { useEffect, useRef, useState } from 'react';
import { navigation, profile } from './content.js';
import Arrow from './components/Arrow.jsx';
import LanguageSwitcher from './components/LanguageSwitcher.jsx';
import SocialProfiles from './components/SocialProfiles.jsx';
import ProfileHero from './components/ProfileHero.jsx';
import PortfolioExplorer from './components/PortfolioExplorer.jsx';
import usePortfolioLocation from './hooks/usePortfolioLocation.js';

function Header({ active }) {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  function closeMenu() { setMenuOpen(false); }
  return <header className="site-header" onKeyDown={(event) => {
    if (event.key === 'Escape' && menuOpen) {
      closeMenu();
      menuButton.current?.focus();
    }
  }}>
    <a className="wordmark" href="#home" aria-label={t("Eduardo Hernández, home")} onClick={closeMenu}>eh<span>.</span></a>
    <button ref={menuButton} className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? t('Close') : t('Menu')}<span aria-hidden="true">{menuOpen ? '−' : '+'}</span></button>
    <nav id="main-navigation" aria-label={t("Main navigation")} className={menuOpen ? 'navigation is-open' : 'navigation'}>
      {navigation.map(({ id, label }, index) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={closeMenu}><span className="nav-number">0{index + 1}</span>{t(label)}</a>)}
    </nav>
    <div className="header-actions"><LanguageSwitcher /><a className="header-contact" href="#contact">{t("Let’s talk")} <Arrow diagonal /></a></div>
  </header>;
}

export default function App() {
  const { t } = useLanguage();
  const route = usePortfolioLocation();
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(route.anchor) || document.getElementById('explorer-panel');
      if (!target) return;
      // Switching a technology/journey tab should keep keyboard focus in the tablist.
      if (document.activeElement?.getAttribute('role') === 'tab' && !route.item) {
        target.querySelector('[role="tab"][aria-selected="true"]')?.focus({ preventScroll: true });
        return;
      }
      if (route.section !== 'home') target.focus({ preventScroll: true });
      const scrollTarget = route.section === 'home' ? target : document.getElementById('overview');
      scrollTarget.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [route]);
  const active = navigation.some(item => item.id === route.section) ? route.section : 'overview';
  return <><a className="skip-link" href="#overview">{t("Skip to portfolio content")}</a><Header active={active} />
    <main id="main"><ProfileHero route={route} /><PortfolioExplorer route={route} /></main>
    <footer className="site-footer"><a className="wordmark" href="#home" aria-label={t("Back to top")}>eh<span>.</span></a><p>© {new Date().getFullYear()} {profile.name}</p><SocialProfiles /><a href="#home">{t("Back to top ↑")}</a></footer>
  </>;
}
