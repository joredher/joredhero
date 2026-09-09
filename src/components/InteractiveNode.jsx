import { useLanguage } from '../i18n/LanguageContext.jsx';
const icons = {
  person: <><circle cx="12" cy="8" r="3" /><path d="M5 20v-2a7 7 0 0 1 14 0v2" /></>,
  journey: <><path d="M6 5v14h12M6 12h8M6 5h12" /><circle cx="18" cy="5" r="2" /><circle cx="14" cy="12" r="2" /><circle cx="18" cy="19" r="2" /></>,
  projects: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V4h8v3M3 12h18M10 12v3h4v-3" /></>,
  technology: <path d="m7 7-5 5 5 5m10-10 5 5-5 5M14 4l-4 16" />,
  community: <><circle cx="12" cy="8" r="3" /><path d="M7 20v-2a5 5 0 0 1 10 0v2M5 5a3 3 0 0 0 0 6M19 5a3 3 0 0 1 0 6M2 19v-2a4 4 0 0 1 3-4m17 6v-2a4 4 0 0 0-3-4" /></>,
  connect: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
};

export default function InteractiveNode({ category, index, selected }) {
  const { t } = useLanguage();
  return <a href={`#${category.section}`}
    className={`interactive-node node-${index < 3 ? 'left' : 'right'}${selected ? ' is-selected' : ''}`}
    style={{ '--node-row': (index % 3) + 1 }}
    id={`node-${category.id}`} aria-current={selected ? 'location' : undefined}>
    <span className="node-connector" aria-hidden="true" />
    <span className="node-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">{icons[category.icon]}</svg></span>
    <span className="node-copy"><span className="node-title">{t(category.label)}</span><span className="node-hint">{t(category.hint)}</span></span>
    <span className="node-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
  </a>;
}
