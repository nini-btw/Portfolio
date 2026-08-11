# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start Vite dev server (http://localhost:5173/)
npm run build     # production build -> dist/
npm run preview   # serve the dist/ build locally
npm run lint      # ESLint (flat config, eslint.config.js)
```

There is no test suite (no Jest/Vitest/RTL) and no CI config — do not assume test commands exist.

## Architecture

This is a client-only React SPA (Vite) with no backend and no database. It is a single scrollable page: `App.jsx` renders `NavBarP`, then `Home`/`Aboutme`/`Project`/`Contact` each inside an anchor `<div id="...">`, then `Foot`. Navigation is hash-based via `react-router-hash-link`'s `HashLink` (smooth scroll to `#home`, `#aboutMe`, `#project`, `#contact`) — there are no `<Routes>`/`<Route>`, just one page.

**State:** local `useState` only, no global store. Form state lives in `Contact.jsx`; selected-project state (which opens `ProjectModal.jsx`) lives in `ProjectShowcase.jsx`.

**Styling is a deliberate hybrid**, not a single design system:
- Bootstrap 5 + React-Bootstrap for grid/layout/navbar collapse
- MUI v6 + Emotion for form inputs, buttons, icons
- Hand-written indented-syntax Sass (not SCSS), one file per component in `src/stylesheets/` (e.g. `homeS.sass`, `contactS.sass`), plus shared tokens in `src/stylesheets/variables.sass` (`$primary-color: #0062b9`, breakpoints at 576/768/992px). Most other colors are hardcoded per-stylesheet rather than tokenized.

**Data layer — CMS with local fallback pattern (the core architectural idea of this repo):**
- `src/hooks/useProjects.js` is the single source of project data. If `VITE_SANITY_PROJECT_ID` is unset, it immediately returns `src/data/fallbackProjects.js` without any network call. If set, it dynamically `import()`s `src/lib/sanityClient.js` (keeping the ~87kB Sanity chunk out of the bundle unless configured) and runs a GROQ query; on any fetch error it falls back to the same local dataset.
- The Sanity Studio schema lives in `studio/portfolio/schemaTypes/project.js` — the **deployed** schema, edited and pushed via `npx sanity schema deploy` (run from `studio/portfolio/`) against project `jyl3yhl8` / dataset `production`. Document type `project`: title, slug, featured, order (number, controls display position), category [`full-stack`|`frontend`|`tool`|`backend`], shortDescription, problem, myRole, duration, outcome, techStack[], screenshots[], liveUrl, githubUrl. `studio/schemaTypes/project.js` is a second, unused stale duplicate of this file — kept in sync for consistency but not what's actually deployed.
- When adding/editing project content without touching Sanity, edit `src/data/fallbackProjects.js` and matching shape must stay in sync with the schema above.
- `ProjectShowcase.jsx` consumes `useProjects()` (query sorted by `order asc`), renders one `ProjectPanel.jsx` card per project in a scroll-pinned track (`useScrollPin.js`), and opens `ProjectModal.jsx` (controlled via `project`/`onClose` props) when a card's "Case study" CTA is clicked.

**Contact form → EmailJS:** `Contact.jsx` does manual validation (`validateForm()`, regex email check) then calls `emailjs.send(serviceId, templateId, formData, publicKey)` directly from the browser — no server involved. Credentials come from `VITE_EMAILJS_*` env vars; remember all `VITE_`-prefixed vars are exposed client-side by Vite's design, so only public-safe values belong there.

**Env vars** (see `.env.example`): `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`.

## Known repo quirks

- `src/constants/social.js` has placeholder URLs (`YOUR_USERNAME`) that need real values before relying on the footer/hero social links.
- `src/lib/sanityClient.js` exports a `urlFor` helper for building image URLs, but it's currently unused — `useProjects.js` resolves image URLs directly in the GROQ projection instead.
