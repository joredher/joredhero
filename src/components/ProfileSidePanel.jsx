import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useProfilePanel } from '../hooks/useProfilePanel.jsx';
import { personalityProfiles } from '../data/personalityProfiles.js';
import { profilePhotos } from '../data/profilePhotos.js';
import { prefersReducedMotion } from '../utils/motion.js';
import Arrow from './Arrow.jsx';
import './profile-side-panel.css';

const EXIT_MS = 260;

export default function ProfileSidePanel() {
  const { t } = useLanguage();
  const { openId, isOpen, close, next, previous } = useProfilePanel();
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const triggerRef = useRef(null);
  const lastOpenIdRef = useRef(openId);
  if (isOpen) lastOpenIdRef.current = openId;

  useEffect(() => {
    const reduceMotion = prefersReducedMotion();
    if (isOpen) {
      triggerRef.current = document.activeElement;
      setMounted(true);
      if (reduceMotion) { setEntered(true); return; }
      // A tick after mount, so the browser paints the closed state before we transition to open.
      const timeout = setTimeout(() => setEntered(true), 0);
      return () => clearTimeout(timeout);
    }
    setEntered(false);
    if (reduceMotion) { setMounted(false); return; }
    const timeout = setTimeout(() => setMounted(false), EXIT_MS);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Restore focus to the photo that opened the panel once it's fully closed.
  useEffect(() => {
    if (mounted || isOpen) return;
    if (triggerRef.current?.isConnected) triggerRef.current.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  // Move focus to the heading on open, and again whenever Previous/Next changes the profile.
  useEffect(() => {
    if (!mounted) return;
    document.getElementById('profile-panel-heading')?.focus({ preventScroll: true });
    document.querySelector('.profile-side-panel-body')?.scrollTo({ top: 0, behavior: 'instant' });
  }, [mounted, openId]);

  useEffect(() => {
    if (!mounted) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [mounted]);

  function handleKeyDown(event) {
    if (event.key === 'Escape') close();
  }

  if (!mounted) return null;

  const activeId = openId ?? lastOpenIdRef.current;
  const photo = profilePhotos.find(item => item.id === activeId);
  const story = personalityProfiles.find(item => item.id === activeId);
  if (!photo || !story) return null;

  return <div className={`profile-side-panel${entered ? ' is-open' : ''}`}
              onKeyDown={handleKeyDown}>
            <div className="profile-side-panel-backdrop" onClick={close} />
            <div className="profile-side-panel-sheet"
                role="dialog" 
                aria-modal="true"
                aria-labelledby="profile-panel-heading">
              <div className="profile-side-panel-head">
                <button type="button" className="profile-side-panel-close" onClick={close}>
                  {t('Close')}<span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="profile-side-panel-body">
                <figure className="profile-side-panel-figure">
                  <img src={photo.src}
                      alt={t(photo.alt)}
                      width={photo.width}
                      height={photo.height}
                      style={{ objectPosition: photo.position }} />
                </figure>
                <p className="eyebrow profile-side-panel-tagline">{t(story.tagline)}</p>
                <h2 id="profile-panel-heading" tabIndex={-1}>{t(story.title)}</h2>
                <p className="profile-side-panel-description">{t(story.description)}</p>
                <ul className="profile-side-panel-keywords">
                  {
                    story.keywords.map((keyword, index) => 
                      <li key={index}>{t(keyword)}</li>)
                  }
                </ul>
              </div>
              <nav className="profile-side-panel-nav" aria-label={t('Other profiles')}>
                <button type="button"
                        onClick={previous}>
                          <Arrow className="is-reversed" />{t('Previous profile')}
                </button>
                <button type="button"
                        onClick={next}>
                          {t('Next profile')}<Arrow />
                        </button>
              </nav>
            </div>
          </div>;
}
