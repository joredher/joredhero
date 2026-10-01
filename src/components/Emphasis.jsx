import { Fragment } from 'react';

// Data marks key phrases as **bold**; this renders them as <strong> without touching innerHTML.
export default function Emphasis({ children }) {
  return String(children).split('**').map((part, index) =>
    index % 2 ? <strong key={index}>{part}</strong> : <Fragment key={index}>{part}</Fragment>);
}

// Shows `accent` (a phrase inside `text`) in the accent colour, e.g. "Senior <Backend>".
export function Accent({ text, accent }) {
  const start = accent ? text.indexOf(accent) : -1;
  if (start < 0) return text;
  return <>{text.slice(0, start)}<span className="accent">{accent}</span>{text.slice(start + accent.length)}</>;
}
