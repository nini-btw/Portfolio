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

**State:** local `useState` only, no global store. Form state lives in `Contact.jsx`; filter/selected-project state lives in `ProjectGrid.jsx`.

**Styling is a deliberate hybrid**, not a single design system:
- Bootstrap 5 + React-Bootstrap for grid/layout/navbar collapse
- MUI v6 + Emotion for form inputs, buttons, icons
- Hand-written indented-syntax Sass (not SCSS), one file per component in `src/stylesheets/` (e.g. `homeS.sass`, `contactS.sass`), plus shared tokens in `src/stylesheets/variables.sass` (`$primary-color: #0062b9`, breakpoints at 576/768/992px). Most other colors are hardcoded per-stylesheet rather than tokenized.

**Data layer — CMS with local fallback pattern (the core architectural idea of this repo):**
- `src/hooks/useProjects.js` is the single source of project data. If `VITE_SANITY_PROJECT_ID` is unset, it immediately returns `src/data/fallbackProjects.js` without any network call. If set, it dynamically `import()`s `src/lib/sanityClient.js` (keeping the ~87kB Sanity chunk out of the bundle unless configured) and runs a GROQ query; on any fetch error it falls back to the same local dataset.
- The Sanity Studio schema lives in `studio/schemaTypes/project.js` (document type `project`: title, slug, featured, category [`full-stack`|`frontend`|`tool`|`backend`], shortDescription, problem, myRole, duration, outcome, mainFeature, features[], techStack[], screenshots[], liveUrl, githubUrl). Studio itself has not been initialized (`npm create sanity@latest` inside `studio/` is still pending) — treat Sanity as optional/unconfigured unless told otherwise.
- When adding/editing project content without touching Sanity, edit `src/data/fallbackProjects.js` and matching shape must stay in sync with the schema above.
- `ProjectGrid.jsx` consumes `useProjects()`, handles the category filter UI, skeleton loading state, and opens `ProjectModal.jsx` (controlled via `project`/`onClose` props) when a card is clicked.

**Contact form → EmailJS:** `Contact.jsx` does manual validation (`validateForm()`, regex email check) then calls `emailjs.send(serviceId, templateId, formData, publicKey)` directly from the browser — no server involved. Credentials come from `VITE_EMAILJS_*` env vars; remember all `VITE_`-prefixed vars are exposed client-side by Vite's design, so only public-safe values belong there.

**Env vars** (see `.env.example`): `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`.

## Known repo quirks

- `src/constants/social.js` has placeholder URLs (`YOUR_USERNAME`) that need real values before relying on the footer/hero social links.
- `src/lib/sanityClient.js` exports a `urlFor` helper for building image URLs, but it's currently unused — `useProjects.js` resolves image URLs directly in the GROQ projection instead.
