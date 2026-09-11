import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function EmptyState({ title, children }) {
  const { t } = useLanguage();
  return <div className="explorer-empty">
          <span className="empty-mark" aria-hidden="true">＋</span>
          <h3>{t(title)}</h3><p>{t(children)}</p>
          <span className="pending-label">{t("Details coming soon")}</span>
        </div>;
}
