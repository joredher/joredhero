import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { profile } from '../../data/profile.js';
import { resumeFiles, resumeFileNames } from '../../data/resume.js';
import Arrow from '../Arrow.jsx';
import Download from '../Download.jsx';
import SocialProfiles from '../SocialProfiles.jsx';

export default function Contact() {
  const { t } = useLanguage();
  return <div className="contact-panel">
            <h2 id="section-heading">
              {
                t("Have something")
              }<br />{ t("in ") }
              <span className="muted">
                { t("mind?") }
              </span>
            </h2>
            <p className="section-lead">
              {
                t("A project, an idea, or just a hello. Let’s start a conversation.")
              }
            </p>
            <a className="email-link"
              href={`mailto:${profile.email}`}>
                {profile.email}<Arrow diagonal />
            </a>
            <span className="contact-note">{t("Opens your email app")}</span>
            <details className="detail-block" open>
              <summary>{t("Social profiles")}</summary>
              <SocialProfiles />
            </details>
            <details className="detail-block" open>
              <summary>{t("Find the work")}</summary>
              <a className="related-project"
                href={profile.github}
                target="_blank"
                rel="noreferrer">
                  <span>
                    <strong>{t("Portfolio on GitHub")}</strong>
                    <small>{t("Explore the source · opens in a new tab")}</small>
                  </span><Arrow diagonal />
              </a>
            </details>
            <div className="contact-resume">
              <span>{t("Résumé")}</span>
              <div className="resume-links">
                <a className="related-project"
                  href={resumeFiles.en}
                  download={resumeFileNames.en}>
                    <span>
                      <strong>{t("English")}</strong>
                      <small>PDF</small>
                    </span>
                    <Download />
                </a>
                <a className="related-project"
                  href={resumeFiles.es}
                  download={resumeFileNames.es}>
                    <span>
                      <strong>{t("Spanish")}</strong>
                      <small>PDF</small>
                    </span>
                    <Download />
                </a>
              </div>
            </div>
          </div>;
}
