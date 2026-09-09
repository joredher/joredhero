import { experience } from './experience.js';
import { education, certifications } from './education.js';

export const journeyGroups = [
  { id: 'experience', label: 'Experience', entries: experience },
  { id: 'education', label: 'Education', entries: education },
  { id: 'certifications', label: 'Certifications', entries: certifications },
  { id: 'recognition', label: 'Recognition', description: 'Professional recognition and achievements will be collected here.', entries: [] },
];
// No community memberships or awards have been supplied.
export const communities = [];
