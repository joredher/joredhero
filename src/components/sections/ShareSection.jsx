import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { useState } from 'react';

export default function ShareSection() {
  const { t } = useLanguage();
  const [status, setStatus] = useState('');
  const [fallback, setFallback] = useState('');
  
  async function copyLink() {
    const url = window.location.href;
    try { 
      
      await navigator.clipboard.writeText(url); 
      setStatus('Link copied'); 
      setFallback(''); 
    
    } catch { 
      
      setStatus('Select and copy this address');
      setFallback(url); 
    
    }
  }
  return <div className="share-section">
            <button type="button" onClick={copyLink}>
              {
                t("Copy section link ")
              }<span aria-hidden="true">↗</span>
            </button>
            <span role="status">
              {
                t(status)
              }
            </span>
            {
              fallback && <input aria-label={t("Section address")} 
                                readOnly 
                                value={fallback} 
                                onFocus={event => event.target.select()} />
            }
          </div>;
}
