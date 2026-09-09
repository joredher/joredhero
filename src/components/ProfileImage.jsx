import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useEffect, useRef } from 'react';
import Arrow from './Arrow.jsx';

export default function ProfileImage({ photo, href, name }) {
  const { t } = useLanguage();
  const frame = useRef(null);
  const motionPreference = useRef(null);

  function resetTilt() {
    frame.current?.style.removeProperty('--portrait-x');
    frame.current?.style.removeProperty('--portrait-y');
  }

  useEffect(() => {
    const preference = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    motionPreference.current = preference;
    const handleChange = () => resetTilt();
    preference.addEventListener('change', handleChange);
    return () => {
      preference.removeEventListener('change', handleChange);
      motionPreference.current = null;
    };
  }, []);

  function handlePointerMove(event) {
    if (event.pointerType !== 'mouse' || !motionPreference.current?.matches) return;
    // Measure the stationary link so the moving image never shifts the hit area.
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5));
    const y = Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5));
    frame.current.style.setProperty('--portrait-x', `${(-y * 5).toFixed(2)}deg`);
    frame.current.style.setProperty('--portrait-y', `${(x * 7).toFixed(2)}deg`);
  }

  function handleExplore(event) {
    resetTilt();
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    // Preserve native hash navigation; move keyboard focus into the direct view.
    document.getElementById(href.slice(1))?.focus({ preventScroll: true });
  }

  return <a
    className="profile-image-link"
    href={href}
    aria-label={t('Explore {name}’s profile', { name })}
    onPointerMove={handlePointerMove}
    onPointerLeave={resetTilt}
    onPointerCancel={resetTilt}
    onBlur={resetTilt}
    onClick={handleExplore}
  >
    <div ref={frame} className="profile-frame">
      <img src={photo.src} alt={t(photo.alt)} width={photo.width} height={photo.height} style={{ objectPosition: photo.position }} fetchPriority="high" decoding="async" draggable="false" />
    </div>
    <span className="profile-image-caption"><span>{t("Explore my profile")}</span><Arrow diagonal /></span>
  </a>;
}
