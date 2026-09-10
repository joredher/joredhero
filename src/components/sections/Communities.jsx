import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { communities } from '../../data/journey.js';
import CommunityCard from '../CommunityCard.jsx';
import EmptyState from './EmptyState.jsx';

export default function Communities() {
  const { t } = useLanguage();
  return <div><h2 id="section-heading">{t("Building ")}<span className="muted">{t("with others.")}</span></h2><p className="section-lead">{t("The people, events, and contributions that connect the work.")}</p>{communities.length ? communities.map(community => <CommunityCard key={community.id} community={community} />) : <EmptyState title={t("More connections to share.")}>{t("Community participation and contributions will appear here as I add more of my story.")}</EmptyState>}</div>;
}
