import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { journeyGroups } from '../../data/journey.js';
import ExperienceTimeline from '../ExperienceTimeline.jsx';
import JourneyTimeline from '../JourneyTimeline.jsx';
import EmptyState from './EmptyState.jsx';

const experienceGroup = journeyGroups.find(group => group.id === 'experience');
const sideGroups = journeyGroups.filter(group => group.id !== 'experience');

export default function Journey({ route }) {
  const { t } = useLanguage();
  const openRole = route.group === 'experience' ? route.item : undefined;
  return <div className="journey-explorer">
            <h2 id="section-heading">{t('The journey ')}
              <span className="muted">{t('so far.')}</span>
            </h2>
            <p className="section-lead">
              {
                t('Experience, learning, and the milestones along the way.')
              }
            </p>
            <div className="journey-layout">
              <section className="journey-main" aria-labelledby="group-heading-experience">
                <h3 id="group-heading-experience">{t(experienceGroup.label)}</h3>
                {
                  openRole
                    ? <JourneyTimeline group={experienceGroup} selectedId={openRole} />
                    : <ExperienceTimeline entries={experienceGroup.entries} />
                }
              </section>
              <div className="journey-side">
                {
                  sideGroups.map(group =>
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
            </div>
          </div>;
}
