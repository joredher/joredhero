import { createContext, useContext, useEffect, useState } from 'react';
import { spanish } from './es.js';

const LanguageContext = createContext(null);
const storageKey = 'portfolio-language';
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem(storageKey) === 'es' ? 'es' : 'en'; }
    catch { return 'en'; }
  });
  function t(message, values = {}) {
    const key = message.trim();
    const translated = language === 'es' && Object.hasOwn(spanish, key)
      ? message.replace(key, () => spanish[key]) : message;
    return translated.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
  }
  useEffect(() => {
    document.documentElement.lang = language === 'es' ? 'es-CO' : 'en-AU';
    document.title = `Eduardo Hernández — ${language === 'es' ? 'Portafolio' : 'Portfolio'}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', language === 'es'
      ? 'Eduardo Hernández — ingeniero de sistemas. Un portafolio en evolución.'
      : 'Eduardo Hernández — systems engineer. A portfolio in progress.');
    try { localStorage.setItem(storageKey, language); } catch { /* Language still works when storage is unavailable. */ }
  }, [language]);
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}
export function useLanguage() { return useContext(LanguageContext); }
