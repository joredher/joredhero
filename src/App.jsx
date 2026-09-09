import { useLanguage } from './i18n/LanguageContext.jsx';
import { useEffect } from 'react';
import { profile } from './content.js';
import Arrow from './components/Arrow.jsx';
import LanguageSwitcher from './components/LanguageSwitcher.jsx';
import SocialProfiles from './components/SocialProfiles.jsx';
import ProfileHero from './components/ProfileHero.jsx';
import PortfolioExplorer from './components/PortfolioExplorer.jsx';
import usePortfolioLocation from './hooks/usePortfolioLocation.js';

function Header({ inert }) {
  const { t } = useLanguage();
  return <header className="site-header" inert={inert}>
    <a className="wordmark"
      href="#home"
      aria-label={t("Jorge Hernández, home")}>
        eh<span>.</span>
    </a>
    <div className="header-actions">
      <LanguageSwitcher />
      <a className="header-contact" href="#contact">
        {t("Let’s talk")} <Arrow diagonal />
      </a>
    </div>
  </header>;
}

export default function App() {
  const { t } = useLanguage();
  const route = usePortfolioLocation();
  useEffect(() => {
    if (route.section !== 'home') return;
    document.getElementById('home')?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, [route]);
  const sectionOpen = route.section !== 'home';
  return <>
    <a className="skip-link" href="#main">
      {t("Skip to portfolio content")}
    </a>
    <Header inert={sectionOpen} />
    <main id="main" tabIndex={-1} inert={sectionOpen}>
      <ProfileHero route={route} />
    </main>
    <PortfolioExplorer route={route} />
    <footer className="site-footer" inert={sectionOpen}>
      <a className="wordmark" href="#home" aria-label={t("Back to top")}>
        eh<span>.</span>
      </a>
      <p>© {new Date().getFullYear()} {profile.name}</p>
      <SocialProfiles />
      <a href="#home">{t("Back to top ↑")}</a>
    </footer>
  </>;
}
