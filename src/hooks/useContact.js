import { useEffect, useState } from 'react';
import { encodedContact } from '../data/contact.js';

const empty = { email: '', whatsapp: '' };

export function decodeContact() {
  return { email: atob(encodedContact.email), whatsapp: atob(encodedContact.whatsapp) };
}

export const whatsappUrl = (number, text) => number ? `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}` : undefined;
export const mailtoUrl = (email, { subject, body } = {}) => {
  if (!email) return undefined;
  const query = [subject && `subject=${encodeURIComponent(subject)}`, body && `body=${encodeURIComponent(body)}`].filter(Boolean).join('&');
  return `mailto:${email}${query ? `?${query}` : ''}`;
};

// Empty during the server render and the first client render, so the prerendered HTML holds
// no address or number and hydration matches. The real values arrive right after mount.
export default function useContact() {
  const [contact, setContact] = useState(empty);
  useEffect(() => { setContact(decodeContact()); }, []);
  return contact;
}
