import { profileCategories } from '../data/profileCategories.js';
import SectionModal from './SectionModal.jsx';
import About from './sections/About.jsx';
import Work from './sections/Work.jsx';
import SkillExplorer from './sections/SkillExplorer.jsx';
import Journey from './sections/Journey.jsx';
import Communities from './sections/Communities.jsx';
import Contact from './sections/Contact.jsx';
import Missing from './sections/Missing.jsx';
import ShareSection from './sections/ShareSection.jsx';
import './portfolio-explorer.css';

// Maps a resolved route's section to the component that renders it — kept as a plain
// object so adding a section is a one-line addition here, not a chain of conditionals.
const sections = {
  about: About,
  work: Work,
  skills: SkillExplorer,
  journey: Journey,
  communities: Communities,
  contact: Contact,
  missing: Missing,
};

export default function PortfolioExplorer({ route }) {
  const selected = profileCategories.find(category => category.section === route.section);
  const Section = sections[route.section];
  return <SectionModal route={route} selected={selected}>
            {Section && <Section route={route} />}
            <ShareSection key={route.anchor} />
          </SectionModal>;
}
