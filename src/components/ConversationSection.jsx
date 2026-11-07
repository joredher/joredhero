import { useLanguage } from '../i18n/LanguageContext.jsx';
import ConversationChat from './ConversationChat.jsx';
import './conversation.css';

// The landing-page "How I work" section: the same scripted chat the floating button opens.
export default function ConversationSection() {
  const { t } = useLanguage();
  return <section id="how-i-work" className="conversation section-anchor" aria-labelledby="conversation-heading">
    <div className="conversation-intro">
      <p className="eyebrow"><span className="small-line" />{t("HOW I WORK")}</p>
      <h2 id="conversation-heading">{t("Let’s have a ")}<span className="muted">{t("conversation.")}</span></h2>
      <p className="section-lead">{t("Answer a few questions and see how a project with me would go, from the first message to launch.")}</p>
    </div>
    <ConversationChat />
  </section>;
}
