import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import useContact, { mailtoUrl, whatsappUrl } from '../hooks/useContact.js';
import ConversationChat from './ConversationChat.jsx';
import ChatAvatar from './ChatAvatar.jsx';
import HeroIcon from './HeroIcon.jsx';
import './chat-launcher.css';

// A floating button that opens the same scripted conversation in a panel. It is a
// non-modal dialog, so the page behind it stays usable. The panel is mounted on first
// open and then only hidden, so a visitor keeps their progress when they close it.
export default function ChatLauncher() {
  const { t } = useLanguage();
  const contact = useContact();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  const wasOpen = useRef(false);

  function toggle() {
    setMounted(true);
    setOpen(value => !value);
  }

  useEffect(() => {
    if (open) {
      panelRef.current?.querySelector('.chat-options button, .chat-actions a')?.focus({ preventScroll: true });
    } else if (wasOpen.current) buttonRef.current?.focus({ preventScroll: true });
    wasOpen.current = open;
  }, [open]);

  function handleKeyDown(event) {
    if (event.key === 'Escape') setOpen(false);
  }

  return <div className="chat-launcher" onKeyDown={handleKeyDown}>
    {mounted && <section id="chat-panel" ref={panelRef} className="chat-panel" hidden={!open}
      role="dialog" aria-modal="false" aria-labelledby="chat-panel-title">
      <header className="chat-panel-head">
        <ChatAvatar className="chat-avatar--head" />
        <h2 id="chat-panel-title">{t("Chat with Jorge")}</h2>
        <button type="button" className="chat-panel-close" onClick={() => setOpen(false)}
          aria-label={t("Close chat")} title={t("Close chat")}>
          <HeroIcon name="x-mark" size={22} />
        </button>
      </header>
      <div className="chat-panel-body"><ConversationChat /></div>
      <footer className="chat-panel-foot">
        <span>{t("Prefer to talk to Jorge directly?")}</span>
        <a href={whatsappUrl(contact.whatsapp)} target="_blank" rel="noreferrer">WhatsApp</a>
        <a href={mailtoUrl(contact.email)}>{t({ en: 'Email', es: 'Correo' })}</a>
      </footer>
    </section>}
    <button ref={buttonRef} type="button" className="chat-fab" onClick={toggle}
      aria-label={open ? t("Close chat") : t("Open chat")} title={open ? t("Close chat") : t("Open chat")}
      aria-expanded={open} aria-controls={mounted ? 'chat-panel' : undefined}>
      <HeroIcon name={open ? 'x-mark' : 'chat-bubble-left-right'} size={28} />
    </button>
  </div>;
}
