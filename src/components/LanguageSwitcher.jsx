import { useLanguage } from '../i18n/LanguageContext.jsx';
import colombia from '../assets/icons/co.svg';
import australia from '../assets/icons/au.svg';
import './identity-controls.css';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  return <div className="language-switcher"
              role="group" 
              aria-label={t('Language')}>
          {
            [
              { 
                id: 'es',
                flag: colombia,
                label: 'Español', 
                short: 'ES'
              }, 
              { 
                id: 'en', 
                flag: australia, 
                label: 'English', 
                short: 'EN' 
              }].map(option =>
                <button type="button"
                        key={option.id}
                        lang={option.id} 
                        aria-label={option.label} 
                        title={option.label}
                        aria-pressed={language === option.id} 
                        onClick={() => setLanguage(option.id)}>
                  <img src={option.flag} 
                      alt="" 
                      width="24" 
                      height="18"/>
                      <span>{option.short}</span>
                </button>)
          }
        </div>;
}
