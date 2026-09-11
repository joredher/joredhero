import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { journeyGroups } from '../../data/journey.js';
import JourneyTimeline from '../JourneyTimeline.jsx';
import EmptyState from './EmptyState.jsx';

export default function Journey({ route }) {
  const { t } = useLanguage();
  return <div className="journey-explorer">
            <h2 id="section-heading">{t('The journey ')}
              <span className="muted">{t('so far.')}</span>
            </h2>
            <p className="section-lead">
              {
                t('Experience, learning, and the milestones along the way.')
              }
            </p>
            <div className="explorer-groups">
              {
                journeyGroups.map(group =>
                  <section key={group.id} className="explorer-group" aria-labelledby={`group-heading-${group.id}`}>
                    <h3 id={`group-heading-${group.id}`}>{t(group.label)}</h3>
                    {
                      group.entries.length ?
                        <JourneyTimeline
                          group={group}
                          selectedId={route.group === group.id ? route.item : undefined} />
                          : <EmptyState
                              title={t('{category}, in time.', { category: t(group.label) })}>
                                {
                                  t(group.description)
                                }
                            </EmptyState>
                    }
                  </section>)
              }
            </div>
          </div>;
}
