import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { profile } from '../../data/profile.js';
import Arrow from '../Arrow.jsx';

export default function About() {
  const { t } = useLanguage();
  return <div className="about">
            <div className="about-main">
              <h2 id="section-heading">
                {
                  t("Engineering.")}<br />
                  <span className="muted">
                    {
                      t("With a human side.")
                    }
                  </span>
              </h2>
              <p className="profile-full-name">
                {
                  profile.fullName
                }
              </p>
              <p className="body-copy">
                {
                  t(profile.biography)
                }
              </p>
              <p className="body-copy profile-background">
                {
                  t(profile.background)
                }
              </p>
            </div>
            <div className="about-side">
              <dl className="profile-facts">
                <div>
                  <dt>{t("BASED IN")}</dt>
                  <dd>{profile.location}</dd>
                </div>
                <div>
                  <dt>{t("LANGUAGES")}</dt>
                  <dd>{profile.languages.map(item => t(item)).join(' & ')}</dd>
                </div>
                <div>
                  <dt>{t("FOCUS")}</dt>
                  <dd>{t(profile.role)}</dd>
                </div>
              </dl>
              <div className="related-links">
                <a href="#journey/experience">
                  {
                    t("Explore my experience")
                  } <Arrow diagonal />
                </a>
                <a href="#skills">
                  {
                    t("Explore my toolbox ")
                  }<Arrow diagonal />
                </a>
                <a href="#work">
                  {
                    t("Discover my work ")
                  }<Arrow diagonal />
                </a>
              </div>
            </div>
          </div>;
}
