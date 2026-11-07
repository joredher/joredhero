import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { resolveBilingual } from '../i18n/bilingual.js';
import { profile } from '../data/profile.js';
import { socialLinks } from '../data/socialLinks.js';
import { conversation } from '../data/conversation.js';
import { processSteps } from '../data/process.js';
import { prefersReducedMotion } from '../utils/motion.js';
import Arrow from './Arrow.jsx';
import ChatAvatar from './ChatAvatar.jsx';
import HeroIcon from './HeroIcon.jsx';
import './conversation.css';

const TYPING_MS = 650;
const whatsappBase = socialLinks.find(link => link.id === 'whatsapp')?.href;

const dots = (label) => <span className="typing" role="status" aria-label={label}><i /><i /><i /></span>;

// The scripted conversation shown inside the floating chat panel. It keeps its own progress.
export default function ConversationChat() {
  const { t, language } = useLanguage();
  const { steps } = conversation;
  const [answers, setAnswers] = useState([]);   // chosen option id per answered step
  const [typing, setTyping] = useState(false);  // Jorge "is typing" after the latest answer
  const interacted = useRef(false);              // nothing scrolls or takes focus before the first tap
  const endRef = useRef(null);
  const optionsRef = useRef(null);
  const done = answers.length === steps.length;

  useEffect(() => {
    if (!typing) return;
    if (prefersReducedMotion()) { setTyping(false); return; }
    const timeout = setTimeout(() => setTyping(false), TYPING_MS);
    return () => clearTimeout(timeout);
  }, [typing, answers]);

  // Keep the newest message in view, and put keyboard focus on the new choices.
  useEffect(() => {
    if (!interacted.current || typing) return;
    endRef.current?.scrollIntoView({ block: 'nearest', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    optionsRef.current?.querySelector('button')?.focus({ preventScroll: true });
  }, [answers, typing]);

  function choose(stepIndex, optionId) {
    interacted.current = true;
    setAnswers([...answers.slice(0, stepIndex), optionId]);
    setTyping(true);
  }
  function change(stepIndex) {
    interacted.current = true;
    setAnswers(answers.slice(0, stepIndex));
    setTyping(false);
  }

  const picked = steps.map((step, index) => step.options.find(option => option.id === answers[index]));
  const channel = picked[3]?.id;
  const text = done ? t(conversation.message, {
    build: resolveBilingual(picked[0].summary, language),
    stage: resolveBilingual(picked[1].summary, language),
    when: resolveBilingual(picked[2].summary, language),
  }) : '';
  const links = {
    whatsapp: { label: 'WhatsApp', href: `${whatsappBase}?text=${encodeURIComponent(text)}`, external: true },
    email: {
      label: t({ en: 'Email', es: 'Correo' }),
      href: `mailto:${profile.email}?subject=${encodeURIComponent(t(conversation.subject))}&body=${encodeURIComponent(text)}`,
    },
  };
  const other = channel === 'whatsapp' ? 'email' : 'whatsapp';
  const external = link => link.external ? { target: '_blank', rel: 'noreferrer' } : {};

  // The conversation as a flat list of rows. Consecutive messages from Jorge are grouped:
  // only the first shows his photo, so the thread stays short and easy to scan.
  const rows = [{ key: 'greeting', from: 'jorge', content: t(conversation.greeting) }];
  steps.forEach((step, index) => {
    if (index > answers.length || (index === answers.length && typing)) return;
    rows.push({ key: `q-${step.id}`, from: 'jorge', content: t(step.question) });
    if (index < answers.length) {
      const label = t(picked[index].label);
      rows.push({
        key: `a-${step.id}`, from: 'visitor',
        content: <>
          <span>{label}</span>
          <button type="button" className="chat-change" onClick={() => change(index)}
            aria-label={`${t("Change answer")}: ${label}`} title={t("Change answer")}>
            <HeroIcon name="arrow-path" size={16} />
          </button>
        </>,
      });
      rows.push(index === answers.length - 1 && typing
        ? { key: 'typing', from: 'jorge', content: dots(t("Jorge is typing")) }
        : { key: `r-${step.id}`, from: 'jorge', content: t(picked[index].reply) });
    } else {
      rows.push({
        key: `o-${step.id}`, control: true,
        content: <div className="chat-options" role="group" aria-label={t(step.question)} ref={optionsRef}>
          {step.options.map(option =>
            <button type="button" key={option.id} onClick={() => choose(index, option.id)}>{t(option.label)}</button>)}
        </div>,
      });
    }
  });
  if (done && !typing) {
    rows.push({
      key: 'path', from: 'jorge',
      content: <>
        <p>{t(conversation.path.intro)}</p>
        <ol className="stages">
          {processSteps.map(stage => <li key={stage.id} className="stage">
            <details>
              <summary>
                <span className="stage-dot" aria-hidden="true" />
                <strong>{t(stage.title)}</strong>
                <HeroIcon name="chevron-down" size={16} className="stage-chevron" />
              </summary>
              <p>{t(stage.summary)}</p>
              <p className="stage-need"><em>{t("What I need from you")}:</em> {t(stage.youProvide)}</p>
            </details>
          </li>)}
        </ol>
      </>,
    });
    rows.push({ key: 'closing', from: 'jorge', content: t(conversation.closing) });
    rows.push({
      key: 'actions', control: true,
      content: <div className="chat-actions">
        <a className="chat-send" href={links[channel].href} {...external(links[channel])}>
          {t("Send my answers by")} {links[channel].label} <Arrow diagonal width={16} height={16} />
        </a>
        <a className="chat-chip" href={links[other].href} {...external(links[other])}>
          {t("or by")} {links[other].label}
        </a>
        <button type="button" className="chat-restart" onClick={() => change(0)}>
          <HeroIcon name="arrow-path" size={16} /> {t("Start over")}
        </button>
      </div>,
    });
  }

  let previousFrom = null;
  return <div className="chat" role="log" aria-live="polite" aria-relevant="additions" aria-label={t("Conversation with Jorge")}>
    {rows.map(row => {
      const grouped = row.from === 'jorge' && previousFrom === 'jorge';
      previousFrom = row.control ? null : row.from;
      if (row.control) return <div key={row.key} className="chat-control">{row.content}</div>;
      return <div key={row.key} className={`chat-row from-${row.from}${grouped ? ' is-grouped' : ''}${row.key === 'typing' ? ' is-typing' : ''}`}>
        {row.from === 'jorge' && (grouped ? <span className="chat-avatar-spacer" aria-hidden="true" /> : <ChatAvatar />)}
        <div className="chat-bubble">{row.content}</div>
      </div>;
    })}
    <div ref={endRef} aria-hidden="true" />
  </div>;
}
