import { createContext, useContext, useEffect, useState } from 'react';
import { spanish } from './es.js';
import { resolveBilingual } from './bilingual.js';

const LanguageContext = createContext(null);
const storageKey = 'portfolio-language';
export function LanguageProvider({ children }) {
  // Always starts 'en' (matching what a build-time prerender always sees, since it can't
  // know a visitor's stored preference or browser language) so hydration never mismatches;
  // the real preference — a stored choice, or failing that the browser's own language on a
  // first visit — is applied right after mount below.
  const [language, setLanguage] = useState('en');
  useEffect(() => {
    let stored;
    try { stored = localStorage.getItem(storageKey); } catch { stored = null; }
    if (stored === 'es') setLanguage('es');
    // No saved choice yet — a first visit — so fall back to the browser's own language
    // setting rather than always defaulting to English regardless of who's visiting.
    else if (stored === null && navigator.language?.startsWith('es')) setLanguage('es');
  }, []);
  function t(message, values = {}) {
    // Résumé records keep both languages together; existing UI strings use the dictionary.
    message = resolveBilingual(message, language);
    const key = message.trim();
    const translated = language === 'es' && Object.hasOwn(spanish, key)
      ? message.replace(key, () => spanish[key]) : message;
    return translated.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
  }
  useEffect(() => {
    document.documentElement.lang = language === 'es' ? 'es-CO' : 'en-AU';
    document.title = `Jorge Hernández — ${language === 'es' ? 'Portafolio' : 'Portfolio'}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', language === 'es'
      ? 'Jorge Hernández — ingeniero de software y desarrollador full stack y backend.'
      : 'Jorge Hernández — software engineer, full stack and backend developer.');
    try { localStorage.setItem(storageKey, language); } catch { /* Language still works when storage is unavailable. */ }
  }, [language]);
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}
export function useLanguage() { return useContext(LanguageContext); }
