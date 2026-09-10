# Jorge Hernández — portfolio

A bilingual React portfolio with a dark-and-blue visual identity, floating profile
cards, a three-photo carousel, and sections presented in interactive modals.
The résumé update preserves the existing design and navigation from `master`.

## Run locally

Use Node 20.19+ or 22.12+ (Node 24 works). From this repository:

```sh
npm install
npm run dev
```

Open the local address printed by Vite. Keep the terminal running; saving a source
file updates the preview. Stop it with Ctrl+C. Opening `index.html` directly does
not run the React application.

The repository also includes a pnpm lockfile. To use it, run
`pnpm install --frozen-lockfile` and `pnpm dev`. Use one package manager consistently.

```sh
npm test          # content graph, bilingual records and route checks
npm run build    # production files in dist/
npm run preview  # local preview of the production build
```

## Where to edit content

| File | Content |
| --- | --- |
| `src/data/profile.js` | Name, role, biography, background, languages and contact information |
| `src/data/experience.js` | Employment dates, organisations, responsibilities and technologies |
| `src/data/education.js` | Education and programming certification |
| `src/data/journey.js` | Journey groups and currently empty recognition records |
| `src/data/technologies.js` | Skill groups, descriptions and related experience/project connections |
| `src/data/projects.js` | Project descriptions, features and source links |
| `src/data/socialLinks.js` | Icon-only LinkedIn, Instagram, GitHub and WhatsApp links |
| `src/data/profileCategories.js` | Six landing-page category labels and destinations |
| `src/data/profilePhotos.js` | Photo files, alternative text and positioning |

The résumé records use `{ en: 'English text', es: 'Texto en español' }` so both
versions can be maintained together. Existing interface strings use the dictionary
in `src/i18n/es.js`. `LanguageProvider` exposes `t()` for both formats. New English
interface phrases fall back to English until their translation is added.

The language buttons use Colombian / ES and Australian / EN flags with accessible
language names. A visitor's choice is stored under `portfolio-language` and also
updates document metadata. No translation service is called.

## Résumé content

The supplied **EN Jorge Hernandez 2026.pdf** and skills screenshot are the sources
for the professional profile, seven employment records, three education records,
one programming certification, and eight Tech & AI groups:

- Frontend
- Backend
- Databases & real time
- Scraping & automation
- Cloud, DevOps & tools
- Methods & AI
- Professional skills
- This portfolio

Dates, concurrent roles, part-time labels and the English B2+ level are preserved
as supplied. The profile retains the résumé's “over five years” wording; overlapping
jobs are not added together to calculate experience. Institution names follow the
résumé. The UNAB/MINTIC training appears once under Certifications. No verification
URL was supplied. Recognition remains empty.

Blade is grouped with the Laravel backend, separately from Vue. AWS service cards
use the AWS logo; Blade uses Laravel's logo. OpenVidu/WebRTC and non-branded concepts
use neutral symbols. AI describes assisted coding with Copilot and ChatGPT, without
claiming model-development experience. The portrait carousel and floating map remain
as implemented on `master`.

The original résumé PDF is not bundled as a public download in this content update.
The contact section includes email and icon-only social links. WhatsApp opens a chat with the supplied number; the phone number is not shown as a separate line.
Company work is described in Journey; no unpublished company repositories, demos,
metrics or client project cards are invented.

## Navigation and progressive disclosure

Map cards open modal sections. Journey entries expand to show responsibilities and
technology links; each also has a direct entry link. Technology details link back
to the roles that explicitly list that tool in the résumé. The portfolio project
remains linked to React, Vite and CSS.

Examples:

- `#about`
- `#journey/experience/r8write`
- `#journey/education/canterbury`
- `#journey/certifications/unab-mintic`
- `#skills/automation/puppeteer`
- `#skills/ai/github-copilot`
- `#skills/professional`
- `#work/portfolio`

The existing hash router handles direct links, reloads and browser history.
`#skills/backend/mysql` redirects within the view to its new database group.
`#overview` remains an alias for the landing map, as implemented on `master`.
Tabs support arrow keys, Home and End. Escape closes the modal.

## Visual assets

The three supplied PNGs remain under `src/assets/images/`. Logos and flags are
local SVG files in `src/assets/icons/`, rendered through `TechnologyLogo` and
`LanguageSwitcher`. Logo names remain visible and the decorative images have empty
alternative text. Add a mapping in `TechnologyLogo.jsx` when adding a new brand;
otherwise a neutral concept symbol is shown.

See `THIRD_PARTY_NOTICES.md` for logo and flag sources and licenses. Typography uses
Google Fonts with local sans-serif fallbacks. No new runtime dependencies are needed
for the résumé update. There is no authentication, analytics or contact-form backend.
Pushing source code to GitHub does not deploy the website.

## Community and monogram

Casanare Devs appears in Communities with its locally stored official logo and a link
to https://casanare.dev/members. Community records live in src/data/communities.js;
logo mappings live in CommunityCard.jsx. No leadership role or event history is claimed.

The shared monogram is eo. (Eduardo Oropeza); the hero continues to display Jorge
Hernández. Social links show logos only, with accessible names, hover titles, and
46px touch targets in Contact and the footer.
