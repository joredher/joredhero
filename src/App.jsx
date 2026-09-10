import { useLanguage } from './i18n/LanguageContext.jsx';
import { useEffect } from 'react';
import { profile } from './data/profile.js';
import Arrow from './components/Arrow.jsx';
import LanguageSwitcher from './components/LanguageSwitcher.jsx';
import ResumeDownload from './components/ResumeDownload.jsx';
import SocialProfiles from './components/SocialProfiles.jsx';
import ProfileHero from './components/ProfileHero.jsx';
import PortfolioExplorer from './components/PortfolioExplorer.jsx';
import ProfileSidePanel from './components/ProfileSidePanel.jsx';
import usePortfolioLocation from './hooks/usePortfolioLocation.js';
import { ProfilePanelProvider, useProfilePanel } from './hooks/useProfilePanel.jsx';

function Header({ inert }) {
  const { t } = useLanguage();
  return <header className="site-header" inert={inert}>
    <a className="wordmark"
      href="#home"
      aria-label={t("Jorge Hernández, home")}>
        {profile.monogram}<span>.</span>
    </a>
    <div className="header-actions">
      <LanguageSwitcher />
      <ResumeDownload />
      <a className="header-contact" href="#contact">
        {t("Let’s talk")} <Arrow diagonal />
      </a>
    </div>
  </header>;
}

function AppShell() {
  const { t } = useLanguage();
  const route = usePortfolioLocation();
  const profilePanel = useProfilePanel();
  useEffect(() => {
    if (route.section !== 'home') return;
    document.getElementById('home')?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, [route]);
  const sectionOpen = route.section !== 'home';
  // A section reached via URL (e.g. the back button, or a typed-in hash) should take over
  // from the profile panel rather than leaving both overlays stacked.
  useEffect(() => {
    if (sectionOpen) profilePanel.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionOpen]);
  const backgroundInert = sectionOpen || profilePanel.isOpen;
  return <>
    <a className="skip-link" href="#main">
      {t("Skip to portfolio content")}
    </a>
    <Header inert={backgroundInert} />
    <main id="main" tabIndex={-1} inert={backgroundInert}>
      <ProfileHero route={route} />
    </main>
    <PortfolioExplorer route={route} />
    <footer className="site-footer" inert={backgroundInert}>
      <a className="wordmark" href="#home" aria-label={t("Back to top")}>
        {profile.monogram}<span>.</span>
      </a>
      <p>© {new Date().getFullYear()} {profile.name}</p>
      <SocialProfiles />
      <a href="#home">{t("Back to top ↑")}</a>
    </footer>
    <ProfileSidePanel />
  </>;
}

export default function App() {
  return <ProfilePanelProvider><AppShell /></ProfilePanelProvider>;
}
