# Jorge Hernández — portfolio

A React portfolio, developed one visual iteration at a time. The first preview
reinterprets the supplied blue landing-page PDF with a dark background, blue
accents, spacious typography, and accessible interactions.

## Run it locally

Install a current Node.js LTS release from https://nodejs.org/. The Vite version
used here requires Node 20.19+ or 22.12+ (Node 24 also works).

Open a terminal in this repository and run:

```sh
npm install
npm run dev
```

Open the local address printed in the terminal, normally http://127.0.0.1:5173.
Keep that terminal running while you work. Saving a source file updates the
browser automatically; stop the preview with Ctrl+C. Opening `index.html`
directly does not run a React development project.

This repository includes a pnpm lockfile. For the exact versions used to check
this preview, use pnpm 11 and `pnpm install --frozen-lockfile`, then `pnpm dev`.
The npm commands above are an alternative if npm is already installed; use one
package manager consistently when contributing dependency changes.

```sh
npm run build    # create the production files in dist/
npm run preview  # inspect that build locally
```

## Small first edits

1. Change the introduction in `src/components/ProfileHero.jsx` and save it. Watch the preview update.
2. Change `--blue` in `src/styles.css` to try a different accent.
3. Edit a technology in `src/content.js`; its tab count updates with the list.
4. Edit category labels in `src/data/profileCategories.js`; both the map and overview update.
5. Add project content in `src/data/projects.js` without changing the visual components.
6. Update social profile URLs in `src/data/socialLinks.js`.
7. Update Spanish translations in `src/i18n/es.js` when you change English copy.

## React concepts in this version

- **Components:** `ProfileHero`, `ProfileImage`, `PortfolioExplorer`, `ProjectCard`,
  and `SectionTabs` separate the main parts of the experience.
- **Props:** the explorer receives the current route; project cards receive a project
  record. Reusable components display different content with the same structure.
- **State:** `useState` remembers the mobile menu and copy-link feedback.
  `usePortfolioLocation` keeps the interface synchronized with the URL hash.
- **Lists:** structured category, project, technology and journey data generate repeated items.
- **Effects:** the location hook listens for hash changes and removes the listener on
  cleanup. Navigation also moves focus and scrolls the explorer into view.
- **Styling:** responsive CSS adapts the layout, and the reduced-motion setting
  removes animation for visitors who request it.

## Content and scope

This is a first design draft, not a finished portfolio. The name, role, city,
languages, email and reference technologies come from the PDF and should be
reviewed for currency. Introductory copy is proposed copy for review.

The hero uses the original front-facing PNG supplied for the portfolio.
The PDF's placeholder statistics, repeated experience entries and sample blog
posts are not presented as personal history. The project section currently links
to this actual repository; it can grow as real project content is supplied.

## Portrait milestone

`ProfileHero` carries forward the first landing page's colors, typography and
professional introduction, with the portrait now at the center of the hero.
`ProfileImage` replaces the monogram with the supplied white-background photo.
The image is a native link to `#overview`, a conventional overview of all six
portfolio categories. Clicking it or pressing Enter updates the URL and moves
keyboard focus into the overview. The caption always says "Explore my profile".

Mouse movement adds a small tilt to the image inside a stationary link. There is
no continuous animation loop or slideshow. Tilt is disabled for touch and reduced
motion, including when the system preference changes while the page is open.

All three original 1254 × 1254 PNG photos live under `src/assets/images/`:

- `profile-front.png` — Photo Profile.png
- `profile-relaxed.png` — Photo Profile 2.png
- `profile-playful.png` — Photo Profile 3.png

Replace these image files to update the photos. If their dimensions or composition
change, update the matching width, height, alternative text and positioning in
`src/data/profilePhotos.js` as needed.

`src/data/profilePhotos.js` describes their IDs, alternative text and positioning;
only the first photo renders. Future section-linked changes can use these records.
The white background and original image pixels have been preserved. Component
styles live in `src/components/profile-hero.css`; shared styles stay in
`src/styles.css`. No new dependencies were added.

## Connected category map

`ProfileMap` places six `InteractiveNode` controls around the portrait on desktop:
About me, Journey, Projects, Tech & AI, Communities, and Connect. Stationary
connecting lines highlight on hover, keyboard focus, or selection. At 900px and
below, the photo sits above a two-column category grid with no horizontal swiping.

Selecting a category follows a native hash link into the shared section explorer.
The portrait opens the overview, whose cards lead to exactly the same section views.
Navigation is immediate. The explorer provides links to all sections and back to
the map, with a compact category grid on smaller screens.

The six top-level categories define the current desktop layout; future entries
can be added inside those categories as the detailed sections are developed.
Map-specific styling lives in `src/components/profile-map.css`.

## Shared explorer milestone

The existing hash navigation is extended by `src/hooks/usePortfolioLocation.js`;
no routing library or other dependency was added. Direct links, page reloads,
and browser Back/Forward restore the selected section, group or detail:

| URL hash | View |
| --- | --- |
| `#home` | Portrait and connected map |
| `#overview` | All six categories |
| `#about` | Biography and profile facts |
| `#work` / `#work/portfolio` | Project collection / project details |
| `#skills/portfolio` / `#skills/portfolio/react` | Technology group / technology details |
| `#journey/education` | Education within the journey |
| `#communities` | Communities |
| `#contact` | Email and available professional links |

The shorter `#skills` and `#journey` links select their first group. Aliases such
as `#projects`, `#experience` and `#education` also work. Unavailable addresses show
a recovery link. Each section has a Copy section link action with a selectable
address fallback if clipboard access is unavailable. On the local preview these
addresses work on this computer; public sharing will require deployment.

`PortfolioExplorer` renders one section at a time. Projects link to their
technologies, and technology details link back to connected projects. Technology
and journey tabs support arrow keys, Home and End while preserving keyboard focus.

Content is separated from the visual components:

- `src/content.js`: profile, navigation and the reference technology lists.
- `src/data/profileCategories.js`: shared map and overview labels and destinations.
- `src/data/projects.js`: project descriptions, features, technologies and source links.
- `src/data/technologies.js`: technology groups, descriptions and project connections.
- `src/data/journey.js`: experience, education, certification and recognition records;
  expandable entries are ready to consume future content. Community records also live here.
- `src/data/profilePhotos.js`: the three original photo assets and their display metadata.

Journey, Communities, AI details and the résumé remain clearly
marked as pending. No personal history is invented to fill those sections.
Explorer styling lives in `src/components/portfolio-explorer.css` and preserves the
existing colors, typography, project artwork and portrait interaction.

## Languages, social profiles and logos

The header has two language buttons: Colombian flag / ES for Spanish and Australian
flag / EN for English. Text labels and accessible language names accompany the flags.
English is the initial default; a visitor's explicit choice is remembered in
`localStorage` under `portfolio-language`. The switch still works if storage is blocked.
Switching translates the current view without changing its URL or selected detail.
The document language, title, description, image descriptions and navigation labels
also update. Shared links keep the recipient's own language preference.

`LanguageProvider` in `src/i18n/LanguageContext.jsx` supplies the language and `t()`
function. English content is the source text; `src/i18n/es.js` maps it to Spanish.
To add copy, put it in the appropriate content file, render it through `t()`, and
add its Spanish translation. Names such as React and stable route IDs are unchanged.
An untranslated new phrase falls back to English. No translation service is called.

LinkedIn, Instagram and GitHub profile links appear in Contact and the footer.
They come from `src/data/socialLinks.js` and open in new tabs. The project source
link remains separate and points to this repository.

`TechnologyLogo` displays local SVG logos beside technology names in the stack,
project tags, project details and individual technology views. Names remain visible;
logos are decorative for screen readers. Add new logo mappings in
`src/components/TechnologyLogo.jsx` when adding technologies.

Flags and logos are stored in `src/assets/icons/`. They require no external requests
at runtime. See `THIRD_PARTY_NOTICES.md` for their sources and included licenses.
The Instagram camera symbol is a local SVG component.

Checked for this version: all explorer routes and history navigation, English and
Spanish content, remembered language and blocked storage, mobile menu, keyboard
tabs, touch, reduced motion, and overflow at widths 320, 390, 768, 1024 and 1440.
Logo loading was checked with external requests blocked. The production build passes.

Contact opens the visitor's email application through a `mailto:` link. There is
no form backend, message storage, authentication, or analytics in this version.
Typography currently loads from Google Fonts, with a sans-serif fallback if
offline. Pushing source code to GitHub does not deploy the website; hosting remains
a separate step. No automatic deployment workflow is configured.

## Next iterations

1. Review the shared explorer and the project-to-technology navigation.
2. Add real projects, experience, education, credentials, communities and a CV as
   information is supplied.
3. Develop each populated section's presentation in small iterations.
4. Explore section-linked transitions between the other portraits.

## References

- [React: Your first component](https://react.dev/learn/your-first-component)
- [React: State](https://react.dev/learn/state-a-components-memory)
- [Vite: Getting started](https://vite.dev/guide/)
