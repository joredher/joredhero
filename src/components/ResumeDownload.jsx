import { useLanguage } from '../i18n/LanguageContext.jsx';
import { resumeFiles, resumeFileNames } from '../data/resume.js';
import Download from './Download.jsx';

export default function ResumeDownload() {
  const { language, t } = useLanguage();
  return <a className="resume-download" href={resumeFiles[language]} download={resumeFileNames[language]}
    aria-label={t('Download résumé (PDF)')} title={t('Download résumé (PDF)')}>
    <Download />
  </a>;
}
