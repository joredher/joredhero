import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useEffect, useRef, useState } from 'react';
import Arrow from './Arrow.jsx';
import { prefersReducedMotion } from '../utils/motion.js';

const ADVANCE_MS = 4000;
const TRANSITION_MS = 700;
const LERP = 0.06;

export default function ProfilePhotoCarousel({ photos, name }) {
  const { t } = useLanguage();
  const frame = useRef(null);
  const motionPreference = useRef(null);
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  const exitTimeout = useRef(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState(null);

  function tick() {
    const c = current.current, dest = target.current;
    c.x += (dest.x - c.x) * LERP;
    c.y += (dest.y - c.y) * LERP;
    frame.current?.style.setProperty('--portrait-x', `${c.x.toFixed(2)}deg`);
    frame.current?.style.setProperty('--portrait-y', `${c.y.toFixed(2)}deg`);
    const settled = Math.abs(dest.x - c.x) < 0.01 && Math.abs(dest.y - c.y) < 0.01 && Math.abs(dest.x) < 0.01 && Math.abs(dest.y) < 0.01;
    raf.current = settled ? null : requestAnimationFrame(tick);
  }

  function scheduleTick() {
    if (raf.current == null) raf.current = requestAnimationFrame(tick);
  }

  function resetTilt() {
    target.current = { x: 0, y: 0 };
    scheduleTick();
  }

  useEffect(() => {
    const preference = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    motionPreference.current = preference;
    const handleChange = () => resetTilt();
    preference.addEventListener('change', handleChange);
    return () => {
      preference.removeEventListener('change', handleChange);
      motionPreference.current = null;
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePointerMove(event) {
    if (event.pointerType !== 'mouse' || !motionPreference.current?.matches) return;
    // Measure the stationary button so the moving image never shifts the hit area.
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5));
    const y = Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5));
    target.current = { x: -y * 5, y: x * 7 };
    scheduleTick();
  }

  function advance() {
    const from = activeIndexRef.current;
    const to = (from + 1) % photos.length;
    activeIndexRef.current = to;
    setExitingIndex(from);
    setActiveIndex(to);
    clearTimeout(exitTimeout.current);
    exitTimeout.current = setTimeout(() => setExitingIndex(null), TRANSITION_MS);
  }

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let interval = setInterval(advance, ADVANCE_MS);
    function handleVisibility() {
      clearInterval(interval);
      if (!document.hidden) interval = setInterval(advance, ADVANCE_MS);
    }
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => clearTimeout(exitTimeout.current), []);

  return <button
    type="button"
    className="profile-carousel"
    aria-label={t('Show the next photo of {name}', { name })}
    onPointerMove={handlePointerMove}
    onPointerLeave={resetTilt}
    onPointerCancel={resetTilt}
    onBlur={resetTilt}
    onClick={advance}
  >
    <div ref={frame} className="profile-frame">
      {photos.map((photo, index) => {
        const state = index === activeIndex ? 'is-active' : index === exitingIndex ? 'is-exiting' : '';
        return <div key={photo.id} className={`profile-photo-layer ${state}`.trim()} aria-hidden={index !== activeIndex}>
          <img src={photo.src} alt={t(photo.alt)} width={photo.width} height={photo.height} style={{ objectPosition: photo.position }} fetchPriority={index === 0 ? 'high' : 'low'} decoding="async" draggable="false" />
        </div>;
      })}
      <span className="profile-carousel-dots" aria-hidden="true">
        {photos.map((photo, index) => <span key={photo.id} className={index === activeIndex ? 'is-active' : ''} />)}
      </span>
    </div>
    <span className="profile-carousel-caption"><span>{t('Next photo')}</span><Arrow /></span>
  </button>;
}
