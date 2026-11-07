import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { resolveBilingual } from '../i18n/bilingual.js';
import { profile } from '../data/profile.js';
import { socialLinks } from '../data/socialLinks.js';
import { conversation } from '../data/conversation.js';
import { processSteps } from '../data/process.js';
import { prefersReducedMotion } from '../utils/motion.js';
import Arrow from './Arrow.jsx';
import './conversation.css';

const TYPING_MS = 650;
const whatsappBase = socialLinks.find(link => link.id === 'whatsapp')?.href;

function Jorge({ children, className = '' }) {
  return <div className={`chat-row from-jorge ${className}`}>
    <span className="chat-avatar" aria-hidden="true">{profile.monogram}<span>.</span></span>
    <div className="chat-bubble">{children}</div>
  </div>;
}

// The scripted conversation, shared by the landing-page section (variant "inline") and the
// floating chat panel (variant "panel"). Each instance keeps its own progress.
export default function ConversationChat({ variant = 'inline' }) {
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
  function restart() { change(0); }

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

  return <div className={`chat${variant === 'panel' ? ' chat--panel' : ''}`} role="log" aria-live="polite" aria-relevant="additions" aria-label={t("Conversation with Jorge")}>
      <Jorge>{t(conversation.greeting)}</Jorge>

      {steps.map((step, index) => {
        const reached = index <= answers.length;
        const answered = index < answers.length;
        const latest = index === answers.length - 1;
        if (!reached || (index === answers.length && typing)) return null;
        return <div className="chat-step" key={step.id}>
          <Jorge>{t(step.question)}</Jorge>
          {answered && <>
            <div className="chat-row from-visitor">
              <div className="chat-bubble">
                {t(picked[index].label)}
                <button type="button" className="chat-change" onClick={() => change(index)}>{t("Change")}</button>
              </div>
            </div>
            {!(latest && typing) && <Jorge>{t(picked[index].reply)}</Jorge>}
            {latest && typing && <Jorge className="is-typing"><span className="typing" role="status" aria-label={t("Jorge is typing")}><i /><i /><i /></span></Jorge>}
          </>}
          {!answered && !typing && <div className="chat-options" role="group" aria-label={t(step.question)} ref={optionsRef}>
            {step.options.map(option =>
              <button type="button" key={option.id} onClick={() => choose(index, option.id)}>{t(option.label)}</button>)}
          </div>}
        </div>;
      })}

      {done && !typing && <div className="chat-step chat-path">
        <Jorge>
          <p>{t(conversation.path.intro)}</p>
          <ol className="path-list">
            {processSteps.map((step, index) => <li key={step.id}>
              <span className="path-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <span>
                <strong>{t(step.title)}</strong>
                <span className="path-summary">{t(step.summary)}</span>
                <span className="path-need"><em>{t("What I need from you")}:</em> {t(step.youProvide)}</span>
              </span>
            </li>)}
          </ol>
        </Jorge>
        <Jorge>{t(conversation.closing)}</Jorge>
        <div className="chat-actions">
          <a className="button primary" href={links[channel].href}
            {...(links[channel].external ? { target: '_blank', rel: 'noreferrer' } : {})}>
            {t("Send my answers by")} {links[channel].label} <Arrow diagonal />
          </a>
          <a className="chat-secondary" href={links[other].href}
            {...(links[other].external ? { target: '_blank', rel: 'noreferrer' } : {})}>
            {t("or by")} {links[other].label}
          </a>
          <button type="button" className="chat-restart" onClick={restart}>{t("Start over")}</button>
        </div>
      </div>}
      <div ref={endRef} aria-hidden="true" />
    </div>;
}
