import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useEffect, useRef, useState } from 'react';
import { profileCategories } from '../data/profileCategories.js';
import Arrow from './Arrow.jsx';
import './section-modal.css';

const EXIT_MS = 220;

export default function SectionModal({ route, selected, children }) {
  const { t } = useLanguage();
  const isOpen = route.section !== 'home';
  const [mounted, setMounted] = useState(isOpen);
  const [entered, setEntered] = useState(false);
  const triggerRef = useRef(null);
  const lastOpenSectionRef = useRef(route.section);
  if (isOpen) lastOpenSectionRef.current = route.section;

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

  // Restore focus to whatever opened the modal (or the matching card) once it's fully closed.
  useEffect(() => {
    if (mounted || isOpen) return;
    const category = profileCategories.find(c => c.section === lastOpenSectionRef.current);
    const fallback = category && document.getElementById(`node-${category.id}`);
    const target = triggerRef.current?.isConnected ? triggerRef.current : fallback;
    target?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  // Move focus into the panel on open and on every section change while open.
  useEffect(() => {
    if (!mounted) return;
    const target = document.getElementById(route.anchor);
    if (!target) return;
    // Switching a technology/journey tab should keep keyboard focus in the tablist.
    if (document.activeElement?.getAttribute('role') === 'tab' && !route.item) {
      target.querySelector('[role="tab"][aria-selected="true"]')?.focus({ preventScroll: true });
      return;
    }
    target.focus({ preventScroll: true });
    // New résumé detail links should start at the top of the scrollable content.
    target.closest('.section-modal-body')?.scrollTo({ top: 0, behavior: 'instant' });
  }, [mounted, route]);

  function close() { window.location.hash = '#home'; }
  function handleKeyDown(event) {
    if (event.key === 'Escape') close();
  }

  if (!mounted) return null;
  return <div className={`section-modal${entered ? ' is-open' : ''}`} onKeyDown={handleKeyDown}>
    <div className="section-modal-backdrop" onClick={close} />
    <div className="section-modal-panel" role="dialog" aria-modal="true" aria-labelledby="section-heading">
      <div className="section-modal-head">
        {selected && <p className="eyebrow explorer-section-label">{t(selected.label)}</p>}
        <button type="button" className="section-modal-close" onClick={close}>{t('Close')}<span aria-hidden="true">×</span></button>
      </div>
      <nav className="explorer-navigation" aria-label={t('Portfolio sections')}>
        {profileCategories.map((category, index) => <a key={category.id} href={`#${category.section}`} aria-current={selected?.id === category.id ? 'location' : undefined}><span>0{index + 1}</span>{t(category.label)}<Arrow diagonal /></a>)}
      </nav>
      <div className="section-modal-body">
        <article id={route.anchor} tabIndex={-1} className="explorer-content" key={route.section}>
          {children}
        </article>
      </div>
    </div>
  </div>;
}
