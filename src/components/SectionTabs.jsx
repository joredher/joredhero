import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useRef } from 'react';

export default function SectionTabs({ groups, selectedId, base, label }) {
  const { t } = useLanguage();
  const tabs = useRef([]);
  function onKeyDown(event, index) {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % groups.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + groups.length) % groups.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = groups.length - 1;
    else return;
    event.preventDefault();
    tabs.current[next]?.focus({ preventScroll: true });
    window.location.hash = `${base}/${groups[next].id}`;
  }
  return <div className="skill-tabs section-tabs" role="tablist" aria-label={t(label)}>
    {groups.map((group, index) => <a key={group.id} ref={el => { tabs.current[index] = el; }}
      role="tab" id={`tab-${group.id}`} href={`#${base}/${group.id}`} aria-selected={selectedId === group.id}
      aria-controls={`panel-${group.id}`} tabIndex={selectedId === group.id ? 0 : -1}
      onKeyDown={event => onKeyDown(event, index)}>{t(group.label)}</a>)}
  </div>;
}
