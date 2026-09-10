import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { journeyGroups } from '../../data/journey.js';
import SectionTabs from '../SectionTabs.jsx';
import JourneyTimeline from '../JourneyTimeline.jsx';
import EmptyState from './EmptyState.jsx';

export default function Journey({ route }) {
  const { t } = useLanguage();
  return <div><h2 id="section-heading">{t('The journey ')}<span className="muted">{t('so far.')}</span></h2><p className="section-lead">{t('Experience, learning, and the milestones along the way.')}</p><SectionTabs groups={journeyGroups} selectedId={route.group} base="journey" label={t('Journey categories')} />
    {journeyGroups.map(group => <div id={`panel-${group.id}`} role="tabpanel" aria-labelledby={`tab-${group.id}`} tabIndex={0} hidden={route.group !== group.id} key={group.id}>
      {group.entries.length ? <JourneyTimeline group={group} selectedId={route.group === group.id ? route.item : undefined} /> : <EmptyState title={t('{category}, in time.', { category: t(group.label) })}>{t(group.description)}</EmptyState>}
    </div>)}
  </div>;
}
