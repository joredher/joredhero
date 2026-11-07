import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { profile } from '../data/profile.js';
import { socialLinks } from '../data/socialLinks.js';
import ConversationChat from './ConversationChat.jsx';
import './chat-launcher.css';

const whatsapp = socialLinks.find(link => link.id === 'whatsapp')?.href;

// A floating button that opens the same scripted conversation in a panel. It is a
// non-modal dialog, so the page behind it stays usable. The panel is mounted on first
// open and then only hidden, so a visitor keeps their progress when they close it.
export default function ChatLauncher() {
  const { t } = useLanguage();
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
        <span className="chat-avatar" aria-hidden="true">{profile.monogram}<span>.</span></span>
        <h2 id="chat-panel-title">{t("Chat with Jorge")}</h2>
        <button type="button" className="chat-panel-close" onClick={() => setOpen(false)}>
          {t("Close chat")}<span aria-hidden="true">×</span>
        </button>
      </header>
      <div className="chat-panel-body"><ConversationChat variant="panel" /></div>
      <footer className="chat-panel-foot">
        <span>{t("Prefer to talk to Jorge directly?")}</span>
        <a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
        <a href={`mailto:${profile.email}`}>{t({ en: 'Email', es: 'Correo' })}</a>
      </footer>
    </section>}
    <button ref={buttonRef} type="button" className="chat-fab" onClick={toggle}
      aria-expanded={open} aria-controls={mounted ? 'chat-panel' : undefined}>
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.5-4.6A8 8 0 1 1 21 12Z" />
      </svg>
      <span>{open ? t("Close chat") : t("Chat")}</span>
    </button>
  </div>;
}
