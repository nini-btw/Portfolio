# PROJECT_DOCUMENTATION.md

---

## 1. Project Overview

**Project Name:** Portfolio  
**Version:** 0.0.0  
**Type:** Personal portfolio website (single-page application)

**Purpose:** This is the personal portfolio website of **Mohammed Denideni**, a Full-Stack Developer based in Oran, Algeria. The site serves as a digital resume and project showcase, presenting the developer's skills, biography, completed projects, and contact information in a visually polished, scrollable single-page layout.

**Target Audience:**
- Potential employers and recruiters
- Clients seeking web development services
- Peer developers reviewing past work

**Problem Solved:** Provides a centralized, professionally designed web presence to demonstrate technical competency, showcase a curated list of projects with live previews and screenshots, and enable direct contact via an embedded form.

**Current Status:** Production-ready static site (deployable as a static bundle). The codebase is complete and functional. It includes a Sanity CMS integration layer with a local fallback dataset, meaning the site works even before Sanity is fully configured.

**Business Context / Domain Knowledge:**
- The portfolio markets MERN-stack expertise (MongoDB, Express, React, Node.js).
- Projects featured include an AHP decision-making app, a calculator, HTML/CSS templates, and a Pug.js to-do app.
- Contact inquiries are routed through EmailJS without a custom backend.
- Projects are backed by Sanity CMS (with a local fallback dataset) and presented as a pinned-scroll showcase — the section locks to the screen and cycles through one project per screen as you scroll — rather than a static grid.

---

## 2. Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | Core UI library for building component-based interfaces. |
| **React DOM** | 18.3.1 | Renders the React tree to the browser DOM. |
| **Vite** | 5.4.1 | Development server, Hot Module Replacement (HMR), and production bundler. |
| **React Router DOM** | 6.26.2 | Client-side routing; enables hash-based navigation between page sections. |
| **react-router-hash-link** | 2.4.3 | Provides `HashLink` for smooth scrolling to anchored section IDs (`#home`, `#aboutMe`, etc.). |
| **Bootstrap** | 5.3.3 | Base CSS framework for grid system, navbar behavior, and responsive utilities. |
| **React-Bootstrap** | 2.10.5 | React components for Bootstrap layout primitives (`Container`, `Row`, `Col`, `Navbar`). |
| **Sass** | 1.80.4 | Preprocessor for custom component-scoped stylesheets (indented `.sass` syntax). |
| **MUI (Material-UI)** | 6.3.0 | Design system providing `TextField`, `Button`, `Box`, and icon components. |
| **@mui/icons-material** | 6.3.0 | Iconography (Facebook, Twitter, LinkedIn, GitHub, Phone, Email, LocationOn, etc.). |
| **@emotion/react / @emotion/styled** | 11.14.0 | Emotion CSS-in-JS engine required by MUI v6. |
| **@fontsource/roboto** | 5.1.0 | Installed but not imported anywhere in `src/` — dead dependency. |
| **@fontsource/source-sans-pro** | 5.x | Self-hosted `Source Sans Pro` (400/600/700 weights), imported in `main.jsx`. Added because MUI computes its own component sizing in `rem` relative to `html`'s actual font-size; without a matching self-hosted font + theme fix, MUI text rendered at the wrong scale (see `src/theme.js` below). `index.html` still also loads the same font from the Google Fonts CDN — a redundant double-load left over from before this was self-hosted (tracked in Known Issues). |
| **emailjs-com** | 3.2.0 | Browser SDK for sending contact-form emails directly from the client. |
| **jQuery** | 3.7.1 | Peer dependency for Bootstrap JS components (navbar collapse). |
| **@popperjs/core** | 2.11.8 | Positioning engine required by Bootstrap dropdowns/tooltips. |
| **@sanity/client** | 6.29.1 | Sanity.io client for fetching CMS content. |
| **@sanity/image-url** | 1.2.0 | Utility for generating image URLs from Sanity image assets. |
| **framer-motion** | 11.18.2 | Animation library — drives the project showcase's per-panel reveal animations and the About Me stat counters/GitHub calendar entrance. |
| **react-github-calendar** | 5.0.8 | Renders the GitHub contribution calendar in About Me for `GITHUB_USERNAME` (unauthenticated public data). |

### Tooling / DevOps

| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | 9.9.0 | Linting with flat config (`eslint.config.js`). |
| **eslint-plugin-react** | 7.35.0 | React-specific lint rules. |
| **eslint-plugin-react-hooks** | 5.1.0-rc.0 | Rules of Hooks enforcement. |
| **eslint-plugin-react-refresh** | 0.4.9 | Fast Refresh compatibility checks. |
| **globals** | 15.9.0 | Browser globals for ESLint. |

### Not Applicable
- **Backend framework:** Not applicable — there is no backend.
- **Database:** Not applicable — no persistent application database. Sanity CMS is used as an external content source.
- **ORM / query layer:** Not applicable.
- **Authentication / authorization:** Not applicable — no user accounts or protected routes.
- **State management library:** Not applicable — local `useState` only.
- **Testing framework:** Not applicable — no tests are present.
- **CI/CD or containerization:** Not applicable — no GitHub Actions, Docker, or deployment config files.

---

## 3. Project Architecture

**Architecture Type:** Frontend-only static single-page application (SPA). The entire app is a collection of React components rendered into a single `index.html` shell. It is a monolith, not a monorepo or microservice architecture.

**Communication Pattern:**
- **Sanity CMS:** The app fetches project data from Sanity using GROQ queries (`src/hooks/useProjects.js`). If the Sanity project ID is missing or the request fails, it falls back to a hardcoded local dataset (`src/data/fallbackProjects.js`).
- **EmailJS:** The only other external network call is from the browser directly to the EmailJS REST API when the contact form is submitted.

### System Diagram

```
┌─────────────────────────────────────────┐
│           User Browser                  │
│  ┌─────────────────────────────────┐    │
│  │  index.html (Vite bundle)       │    │
│  │  ┌─────────┐  ┌─────────────┐   │    │
│  │  │ React   │──▶ React Router│   │    │
│  │  │ (App)   │  │ (HashLink)  │   │    │
│  │  └────┬────┘  └─────────────┘   │    │
│  │       │                         │    │
│  │  ┌────┴─────────────────────┐   │    │
│  │  │ Section Components:      │   │    │
│  │  │ NavBarP, Home, Aboutme,  │   │    │
│  │  │ Project, Contact, Foot   │   │    │
│  │  └──────────────────────────┘   │    │
│  └─────────────────────────────────┘    │
│              │                          │
│              ▼ (form submit)            │
│      ┌──────────────┐                   │
│      │   EmailJS    │                   │
│      │   (external) │                   │
│      └──────────────┘                   │
│              ▲                          │
│      ┌──────────────┐                   │
│      │   Sanity     │                   │
│      │   (CMS)      │                   │
│      └──────────────┘                   │
└─────────────────────────────────────────┘
```

### Primary Data Flow (Contact Form)
1. **User** fills name, email, subject, and message in the contact form (`Contact.jsx`).
2. **Client validation** runs in `validateForm()`; if fields are empty or email is invalid, an error string is set to local state and displayed as a red alert box.
3. On success, `emailjs.send(serviceId, templateId, formData, publicKey)` is invoked.
4. **EmailJS** returns a Promise. On success, a success screen is shown. On failure, an inline error is shown.

### Primary Data Flow (Projects Showcase — "pinned scroll" section)
1. **`ProjectShowcase`** mounts and calls `useProjects()`.
2. If `VITE_SANITY_PROJECT_ID` is missing, `fallbackProjects` is loaded immediately.
3. If present, the hook dynamically imports `src/lib/sanityClient.js` and runs a GROQ query.
4. The section is NOT a normal-flow block. `ProjectShowcase` renders a `.project-pin-wrapper` div sized to `projectCount * 100vh` (inline style, since only JS knows the project count) wrapping a `<section id="project" className="project-section">` that is `position: sticky; top: 0; height: 100vh`. As the page scrolls through that tall wrapper, the section visually stays pinned to the screen.
5. **`useScrollPin`** (`src/hooks/useScrollPin.js`) tracks `window.scrollY` against the wrapper's position to compute which panel index should be active, and — once scrolling settles — snaps the page to the nearest panel boundary via `window.scrollTo({ behavior: 'smooth' })`, so panels always land on a discrete "screen" rather than mid-transition. It also exposes `scrollToIndex(i)` for `ProjectNavDots` clicks.
6. Every `ProjectPanel` is rendered simultaneously, stacked via `position: absolute; inset: 0` inside `.project-track`; only the panel whose `index === activeIndex` gets the `is-active` class (drives its `framer-motion` reveal animation, `pointer-events: auto`, and its watermark number's opacity — panels are stacked directly on top of each other, so an inactive panel's watermark must be opacity-gated or it visibly overlaps the active one's).
7. On error, the showcase falls back to `fallbackProjects` and shows an inline error banner.
8. Clicking a panel's "Case study" CTA opens `ProjectModal` (now wrapped in `framer-motion`'s `AnimatePresence` in `ProjectShowcase.jsx` for an enter/exit animation) with the selected project object passed as a prop. The modal has a focus trap and returns focus to the triggering element on close.

---

## 4. Folder & File Structure

```
Portfolio/
├── .env
├── .env.example
├── .gitignore
├── .vscode/
│   └── settings.json
├── dist/                          # Vite production build output
│   ├── assets/
│   ├── images/
│   ├── index.html
│   └── vite.svg
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── PROJECT_DOCUMENTATION.md
├── public/
│   ├── cv.pdf
│   ├── images/
│   │   ├── 20230615_182139-removebg-preview.png
│   │   ├── all-devices-white-*.png    # project mockups
│   │   ├── logo.png
│   │   ├── Profile.png
│   │   ├── mockup/
│   │   └── screenshots/               # project screenshot folders
│   │       ├── calculator/
│   │       ├── hap/
│   │       ├── template1/
│   │       └── template2/
│   └── vite.svg
├── README.md
├── src/
│   ├── App.jsx
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Aboutme.jsx
│   │   ├── Contact.jsx
│   │   ├── Foot.jsx
│   │   ├── Home.jsx
│   │   ├── NavBarP.jsx
│   │   ├── Project.jsx
│   │   ├── ProjectShowcase.jsx        # pinned-scroll project section (owns id="project")
│   │   ├── ProjectPanel.jsx           # one absolutely-stacked panel per project
│   │   ├── ProjectModal.jsx
│   │   └── subComponents/
│   │       ├── SectionHeader.jsx
│   │       ├── TechBadge.jsx
│   │       ├── ProjectNavDots.jsx
│   │       ├── SkillsMarquee.jsx
│   │       ├── StatCounter.jsx
│   │       ├── StatsRow.jsx
│   │       ├── GithubContributions.jsx
│   │       ├── AboutFacts.jsx         # Role / Education facts card
│   │       └── CvButton.jsx           # animated "Download CV" button
│   ├── constants/
│   │   ├── social.js                  # SOCIAL_LINKS (github/linkedin/twitter/facebook/email) + GITHUB_USERNAME
│   │   └── theme.js                   # PRIMARY_COLOR / PRIMARY_HOVER — mirrors variables.sass for use in JS (MUI sx, etc.)
│   ├── data/
│   │   ├── fallbackProjects.js        # 5 fallback projects
│   │   ├── skills.js
│   │   └── aboutStats.js
│   ├── hooks/
│   │   ├── useProjects.js
│   │   └── useScrollPin.js            # drives the pinned-section scroll/snap interaction for ProjectShowcase
│   ├── index.sass
│   ├── lib/
│   │   └── sanityClient.js
│   ├── main.jsx
│   ├── theme.js                       # MUI theme (ThemeProvider, wraps <App/> in main.jsx)
│   └── stylesheets/
│       ├── aboutmeS.sass
│       ├── contactS.sass
│       ├── footS.sass
│       ├── homeS.sass
│       ├── navS.sass
│       ├── projectShowcaseS.sass      # also owns .project-section/.project-pin-wrapper (no separate projectS.sass anymore)
│       ├── projectModalS.sass
│       ├── variables.sass
│       └── subStyle/
│           ├── sectionHeader.sass
│           ├── skillsMarquee.sass
│           ├── statsRow.sass
│           ├── githubContributions.sass
│           ├── aboutFacts.sass
│           └── cvButton.sass
├── studio/                        # Sanity Studio schema files
│   └── schemaTypes/
│       ├── index.js
│       └── project.js
└── vite.config.js
```

### Folder Explanations

| Path | Purpose |
|------|---------|
| `public/` | Static assets copied verbatim into the build. Contains the CV PDF, logo, profile photo (`Profile.png`), mockups, and per-project screenshots. |
| `src/` | Application source code. |
| `src/components/` | Top-level page section components (`Home`, `Aboutme`, `Project`, `Contact`, `Foot`), navbar (`NavBarP`), the full-viewport project showcase (`ProjectShowcase`, `ProjectPanel`), and the case-study modal (`ProjectModal`). |
| `src/components/subComponents/` | Reusable presentational subcomponents: `SectionHeader`, `TechBadge`, `ProjectNavDots`, and the About Me pieces `SkillsMarquee`, `StatCounter`, `StatsRow`, `GithubContributions`, `AboutFacts`, `CvButton`. |
| `src/constants/` | Shared constant values. `social.js` holds `SOCIAL_LINKS` (github/linkedin/twitter/facebook/email) and `GITHUB_USERNAME`; `theme.js` holds `PRIMARY_COLOR`/`PRIMARY_HOVER` for use in JS contexts (MUI `sx` props) that can't reach `variables.sass`. |
| `src/data/` | Static fallback/local data. Holds `fallbackProjects.js` (5 projects, used when Sanity is unavailable), `skills.js` (About Me skill list, includes Jest/Vitest/Playwright/Sentry etc.), and `aboutStats.js` (derived stat-counter values). |
| `src/hooks/` | Custom React hooks. Holds `useProjects.js` for Sanity/fallback data fetching and `useScrollPin.js` for the Project section's pinned-scroll/snap interaction. |
| `src/lib/` | Third-party client initialization. Holds `sanityClient.js`. |
| `src/theme.js` | MUI theme (`createTheme`) applied via `ThemeProvider` in `main.jsx`. Critically sets `typography.htmlFontSize: 10` — see "Non-Obvious Structural Choices" below. |
| `src/stylesheets/` | Sass stylesheets (indented syntax), one per major component, plus `variables.sass` for shared tokens (colors, a `$space-1..$space-6` spacing scale, `$z-*` z-index scale, breakpoints). |
| `src/stylesheets/subStyle/` | Styles for subcomponents (`sectionHeader.sass`, `skillsMarquee.sass`, `statsRow.sass`, `githubContributions.sass`, `aboutFacts.sass`, `cvButton.sass`). |
| `studio/` | Sanity Studio schema definitions. The developer must run `npm create sanity@latest` inside this folder and point it to these schema files. |
| `dist/` | Generated build output from `vite build`. Not version-controlled. |
| `.vscode/` | Workspace-specific VS Code settings (spell-check word lists). |

### Naming Conventions
- **Components:** PascalCase (`Aboutme.jsx`, `NavBarP.jsx`, `SectionHeader.jsx`, `ProjectShowcase.jsx`).
- **Stylesheets:** camelCase component name + suffix `S.sass` (`aboutmeS.sass`, `contactS.sass`, `projectShowcaseS.sass`).
- **Subcomponent styles:** Live in `subStyle/` and match the component name (`sectionHeader.sass`).
- **Hooks:** camelCase prefixed with `use` (`useProjects.js`).
- **Assets:** Lowercase with hyphens for multi-word filenames (`20230615_182139-removebg-preview.png`).
- **Public screenshot folders:** Named after the project slug (`hap`, `calculator`, `template1`, `template2`).

### Non-Obvious Structural Choices
1. **Hash-based SPA navigation:** The app uses `react-router-hash-link` to scroll to section anchors (`#home`, `#aboutMe`, `#project`, `#contact`) even though it is technically a single-page app with only one route (`/`). `NavBarP.jsx` also runs its own `IntersectionObserver` over the four section elements so `aria-current="page"` reflects whichever section is actually in view, rather than being hardcoded.
2. **No `pages/` or `views/` folder:** All section-level components live flat inside `src/components/`.
3. **CMS with local fallback:** The project is architected to work 100% without Sanity by shipping a fallback dataset. This ensures the portfolio is never broken during CMS setup.
4. **Dynamic import of Sanity client:** `useProjects.js` uses `import('../lib/sanityClient')` so the Sanity bundle chunk is only loaded when a project ID is configured.
5. **`html { font-size: 62.5% }` + MUI `htmlFontSize` theme option:** `index.sass` uses the common "62.5% trick" (`1rem = 10px` at baseline, rescaled further at breakpoints) so the rest of the site's hand-written Sass can use large, readable rem multipliers. MUI computes its own component sizing in `rem` assuming a 16px root by default — without `src/theme.js`'s `typography.htmlFontSize: 10`, every MUI component (`TextField`, `Button`, etc., most visible in `Contact.jsx`) rendered at ~62.5% of its intended size. This is the standard MUI-documented fix for that exact combination and doubles as a reminder for anyone adding more MUI components: they need the `ThemeProvider` from `main.jsx` to size correctly, not manual `sx` font-size overrides.
6. **Section ids must not be duplicated between a wrapper `<div>` in `App.jsx` and the component's own root element.** `Home` and `Contact` each render their own `<section id="...">`; `App.jsx` used to also wrap them in `<div id="home">`/`<div id="contact">`, producing duplicate DOM ids that collided with a legacy global CSS rule (`#home, #aboutMe, #contact` in `index.sass`) and stacked two `min-height: 100vh` boxes on top of each other — the actual cause of a previous "Contact section renders ~2x too tall" bug. `App.jsx` no longer double-wraps `Home`/`Contact`; `Aboutme`'s root has no id of its own, so its `<div id="aboutMe">` wrapper in `App.jsx` is intentional and still needed.
7. **Project section is a pinned-scroll block, not normal document flow.** See "Primary Data Flow (Projects Showcase)" above — `ProjectShowcase` owns a `position: sticky` section inside a tall wrapper sized by JS (`panelCount * 100vh`), not a fixed-height block that scrolls normally into/out of view like every other section.

---

## 5. Configuration & Environment

### Environment Variables

| Variable | Purpose | Used In |
|----------|---------|---------|
| `VITE_SANITY_PROJECT_ID` | Sanity project ID. If blank or missing, the app falls back to local data. | `src/hooks/useProjects.js`, `src/lib/sanityClient.js` |
| `VITE_SANITY_DATASET` | Sanity dataset name (e.g. `production`). | `src/lib/sanityClient.js` |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID for the contact form. | `src/components/Contact.jsx` |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID. | `src/components/Contact.jsx` |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public API key. | `src/components/Contact.jsx` |

### Configuration Files

#### `vite.config.js`
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```
- **Key settings:** Default Vite React configuration. No custom aliases, proxy rules, or build overrides.

#### `eslint.config.js`
- Uses the new ESLint flat config format.
- Ignores the `dist` directory.
- Targets `**/*.{js,jsx}`.
- Sets ECMAScript 2020, browser globals, and JSX parser features.
- Enforces recommended rules from `@eslint/js`, `eslint-plugin-react`, `jsx-runtime`, and `react-hooks`.
- Disables `react/jsx-no-target-blank`.
- Enables `react-refresh/only-export-components` with `allowConstantExport: true`.

#### `index.html`
- Standard Vite HTML entry point.
- Title: `Denideni Mohammed`.
- SEO meta tags: `description`, `og:title`, `og:description`, `og:type`.
- Loads Google Fonts (`Source Sans Pro` at weights 400, 600, 700, 900).
- Loads Bootstrap JS and Popper.js from jsDelivr CDN (fixed, no angle brackets).
- Mounts the React app at `<div id="root"></div>`.
- **Swiper CDN links have been removed.**

#### `package.json`
- `type: "module"` enables ES modules.
- Scripts:
  - `dev` — start Vite dev server.
  - `build` — production build.
  - `lint` — run ESLint.
  - `preview` — preview the production build locally.

#### `.gitignore`
- Ignores `.env`, logs, `node_modules`, `dist-ssr`, editor directories, and OS files.

#### `.env.example`
- Template file listing all required environment variables. Copy to `.env` and fill in your values.

#### `.vscode/settings.json`
- Adds custom words to the VS Code spell checker: `Aboutme`, `swiper`.

### Local Development Setup (Step-by-Step)
1. **Prerequisites:** Node.js (LTS recommended) and npm.
2. **Clone / open** the project directory.
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the dev server:**
   ```bash
   npm run dev
   ```
5. Open the URL printed in the terminal (typically `http://localhost:5173/`).
6. (Optional) **Build for production:**
   ```bash
   npm run build
   ```
7. (Optional) **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 6. Database & Data Layer

**Not applicable** — there is no application database. All content is either:
- Static data in `src/data/fallbackProjects.js`
- Fetched at runtime from **Sanity CMS** (see below)
- Held temporarily in React component state

### Sanity CMS Schema

**Studio schema file:** `studio/schemaTypes/project.js`
**Schema index:** `studio/schemaTypes/index.js`

#### Schema Index (`studio/schemaTypes/index.js`)

```js
import project from './project'
export const schemaTypes = [project]
```

The schema exports a single document type: `project`.

#### Project Document Schema (`studio/schemaTypes/project.js`)

```js
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured (pin to top)',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls display position (1 = first). Lower numbers show first.',
      validation: (Rule) => Rule.required().integer().min(1),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Full-Stack', value: 'full-stack' },
          { title: 'Frontend', value: 'frontend' },
          { title: 'Tool', value: 'tool' },
          { title: 'Backend', value: 'backend' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'shortDescription',
      title: 'Short Description (shown on card)',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().max(120),
    },
    {
      name: 'problem',
      title: 'Problem it solved',
      type: 'text',
      rows: 3,
      description: 'What pain or need did this project address?',
    },
    {
      name: 'myRole',
      title: 'My Role',
      type: 'string',
      description: 'e.g. Solo developer, Team lead, Frontend only',
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. 3 weeks, 2 months',
    },
    {
      name: 'outcome',
      title: 'Outcome / Result',
      type: 'text',
      rows: 2,
      description: 'Measurable result if any. e.g. Used by 50+ users.',
    },
    {
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'screenshots',
      title: 'Screenshots',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'First image is used as the card thumbnail.',
    },
    {
      name: 'liveUrl',
      title: 'Live Demo URL',
      type: 'url',
    },
    {
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'screenshots.0' },
  },
}
```

#### Field Reference

| Field | Type | Validation | Purpose |
|-------|------|------------|---------|
| `title` | `string` | Required | Project name displayed on cards and modals. |
| `slug` | `slug` | Required, auto-generated from title | URL-friendly identifier. Max 96 chars. |
| `featured` | `boolean` | Default `false` | Pins project to the top of the grid when sorted. |
| `order` | `number` | Required, integer, min 1 | Manual display position — projects render in ascending `order`. |
| `category` | `string` | Required | One of: `full-stack`, `frontend`, `tool`, `backend`. Rendered as radio buttons in Studio. |
| `shortDescription` | `text` | Required, max 120 chars | Card subtitle shown below the project title. |
| `problem` | `text` | Optional | Problem statement shown in the project modal. |
| `myRole` | `string` | Optional | Role description, e.g. "Solo developer". |
| `duration` | `string` | Optional | Time spent, e.g. "3 weeks". |
| `outcome` | `text` | Optional | Measurable result or impact summary. |
| `techStack` | `array` of `string` | Optional | Technology tags rendered as pills. Uses `tags` layout in Studio. |
| `screenshots` | `array` of `image` | Optional | Project screenshots with hotspot support. First image is used as the card thumbnail. |
| `liveUrl` | `url` | Optional | Link to live demo. |
| `githubUrl` | `url` | Optional | Link to source repository. |

#### Studio Preview Configuration

The schema defines a custom preview that shows:
- **Title:** the project `title`
- **Subtitle:** the `category`
- **Media:** the first screenshot (if uploaded)

#### Setting Up Sanity Studio

The Studio is already initialized at `studio/portfolio/` (project `jyl3yhl8`, dataset `production`) — the schema in `studio/portfolio/schemaTypes/project.js` is the deployed one.

1. Navigate to the Studio directory:
   ```bash
   cd studio/portfolio
   ```
2. Install dependencies (if not already done):
   ```bash
   npm install
   ```
3. Edit the schema in `studio/portfolio/schemaTypes/`, then deploy it:
   ```bash
   npx sanity schema deploy
   ```
4. Start the Studio locally to add/edit content:
   ```bash
   npm run dev
   ```
5. Add or edit projects via the Studio UI.
6. The root `.env` already points at this project via `VITE_SANITY_PROJECT_ID=jyl3yhl8` and `VITE_SANITY_DATASET=production`.

### Fallback Data
When Sanity is not configured, the app renders five fallback projects from `src/data/fallbackProjects.js`:
1. **HAP Decision Tool** (`full-stack`, featured)
2. **Calculator** (`frontend`)
3. **Pug Todo App** (`full-stack`)
4. **Kasper Template** (`frontend`)
5. **Leon Template** (`frontend`)

### Data Fetching Hook
**File:** `src/hooks/useProjects.js`

- Returns `{ projects, loading, error }`.
- GROQ query fetches all `project` documents sorted by `order asc`.
- Image references are resolved to direct CDN URLs: `"screenshots": screenshots[].asset->url` and `"thumbnail": screenshots[0].asset->url`.

---

## 7. API Reference

**Not applicable** — there are no custom API routes or backend endpoints.

### External API Usage

#### Sanity Client
- **SDK:** `@sanity/client`
- **File:** `src/lib/sanityClient.js`
- **Config:**
  - `projectId`: `import.meta.env.VITE_SANITY_PROJECT_ID`
  - `dataset`: `import.meta.env.VITE_SANITY_DATASET`
  - `useCdn: true`
  - `apiVersion: '2024-01-01'`

#### EmailJS
- **SDK:** `emailjs-com`
- **File:** `src/components/Contact.jsx`
- **Method:** `emailjs.send(serviceID, templateID, templateParams, publicKey)`
- **Request payload shape:** `{ name: string, email: string, subject: string, message: string }`
- **Response:** Promise resolving to an EmailJS response object or rejecting with an error.

---

## 8. Authentication & Authorization

**Not applicable.** The portfolio is entirely public. There are no users, sessions, tokens, roles, or protected routes.

---

## 9. Frontend Architecture

### Component Hierarchy

```
App (wrapped in MUI ThemeProvider, src/theme.js — see main.jsx)
├── NavBarP (tracks active section via IntersectionObserver)
├── main
│   ├── Home (renders its own <section id="home">)
│   ├── #aboutMe
│   │   └── Aboutme
│   │       ├── SectionHeader
│   │       ├── AboutFacts (Role, Education)
│   │       ├── CvButton
│   │       ├── SkillsMarquee
│   │       ├── StatsRow (StatCounter × 2 — Projects Shipped, Technologies)
│   │       └── GithubContributions
│   ├── Project (thin pass-through) → ProjectShowcase
│   │   └── ProjectShowcase (owns <section id="project">, pinned via position:sticky)
│   │       ├── SectionHeader
│   │       ├── ProjectPanel × N (absolutely stacked, one active at a time)
│   │       ├── ProjectNavDots
│   │       └── ProjectModal (conditional, AnimatePresence-wrapped)
│   └── Contact (renders its own <section id="contact">)
│       └── SectionHeader
└── Foot
```

### Routing
- **Router:** `BrowserRouter` wraps `<App />` in `main.jsx`.
- **Links:** `NavBarP.jsx` uses `HashLink` from `react-router-hash-link` with `smooth` scrolling to anchor IDs:
  - `/#home`
  - `/#aboutMe`
  - `/#project`
  - `/#contact`
- There is no `<Routes>` or `<Route>` configuration; the app renders all sections at once and relies on hash anchors for UX navigation.

### State Management
- **No global state library.** All state is local React state.
- `Contact.jsx` holds form state (`formData`, `error`, `success`, `sending`).
- `ProjectShowcase.jsx` holds `selectedProject` state and a `wrapperRef`; the currently active panel index and the `scrollToIndex` function come from `useScrollPin` (scroll-position-driven, not `IntersectionObserver`-driven anymore — see `src/hooks/useScrollPin.js`).
- `NavBarP.jsx` holds its own `activeId` state, driven by an internal `IntersectionObserver` over the four top-level sections.
- `ProjectModal.jsx` is fully controlled by props (`project`, `onClose`); internally manages a focus trap and restores focus to the previously-focused element on unmount.

### Data Fetching Strategy
- **Custom hook:** `useProjects.js` fetches from Sanity on mount using a GROQ query.
- If `VITE_SANITY_PROJECT_ID` is absent, it immediately sets `fallbackProjects` and skips the network request.
- If the Sanity fetch fails, it gracefully falls back to `fallbackProjects` and sets `error`.

### Form Handling
- **Native controlled components** via MUI `TextField`.
- Validation is a manual check for empty fields and a regex email validation in `validateForm()`.
- No form library (React Hook Form, Formik) is used.
- On success, a dedicated success screen is shown. On failure, a styled inline alert appears.

### Error Handling & Loading States
- `ProjectShowcase.jsx` shows 3 skeleton panels (`ProjectPanelSkeleton`) while `loading` is true (the pin wrapper's height is sized to 3 panels during this window, then re-sized to the real project count once data resolves).
- If Sanity fails, an error message is shown above the track, and fallback data is still rendered.
- `Contact.jsx` displays a red bordered alert box if validation fails or EmailJS errors out.
- The submit button shows a disabled "Sending…" state during submission.

### Key Reusable Components

| Component | File | Purpose |
|-----------|------|---------|
| **SectionHeader** | `src/components/subComponents/SectionHeader.jsx` | Renders a styled two-line heading (title + subtitle) with an underline accent. Accepts `title` (required string) and `subtitle` (required string) props. Validated with PropTypes. |
| **TechBadge** | `src/components/subComponents/TechBadge.jsx` | Small colored pill for a tech-stack item; color keyed off a `TECH_COLORS` map. |
| **ProjectNavDots** | `src/components/subComponents/ProjectNavDots.jsx` | Fixed vertical dot rail for the project showcase; highlights the active panel and jumps to a panel on click. |
| **SkillsMarquee** | `src/components/subComponents/SkillsMarquee.jsx` | Pure-CSS `@keyframes` horizontal marquee of skill chips (from `src/data/skills.js`), pausing on hover, respecting `prefers-reduced-motion`. |
| **StatCounter** / **StatsRow** | `src/components/subComponents/StatCounter.jsx`, `StatsRow.jsx` | Count-up stat tile (years coding, projects shipped, technologies used) animated with `framer-motion`'s `useInView`/`animate` once scrolled into view; values sourced from `src/data/aboutStats.js`. |
| **GithubContributions** | `src/components/subComponents/GithubContributions.jsx` | Wraps `react-github-calendar`'s `GitHubCalendar` for `GITHUB_USERNAME`, themed to `$primary-color`, revealed with a `framer-motion` `whileInView` fade. |
| **AboutFacts** | `src/components/subComponents/AboutFacts.jsx` | Small facts card: Role ("Full Stack Developer") and Education. Animated in with `framer-motion` `whileInView`. |
| **CvButton** | `src/components/subComponents/CvButton.jsx` | Animated "Download CV" button (spring hover, shine sweep), links to `/cv.pdf`. |

### Key Feature Components

| Component | File | Purpose |
|-----------|------|---------|
| **ProjectShowcase** | `src/components/ProjectShowcase.jsx` | Fetches projects via `useProjects()`. Owns the pinned-scroll `<section id="project">` (see "Primary Data Flow" above): a `.project-pin-wrapper` sized to `panelCount * 100vh`, a `position: sticky` inner section, and every `ProjectPanel` stacked absolutely inside `.project-track`. Manages `selectedProject` state, gets the active panel index + `scrollToIndex` from `useScrollPin`. Renders `ProjectNavDots` and, inside an `AnimatePresence`, `ProjectModal`. |
| **ProjectPanel** | `src/components/ProjectPanel.jsx` | One panel per project, `position: absolute; inset: 0` (all panels stacked, only the `isActive` one interactive/visible): title, category, description, tech badges, live/GitHub links, a "Case study" CTA, and a large left-aligned watermark number (`index + 1`, opacity-gated by `isActive` so inactive panels' numbers don't show through). Content staggers in via `framer-motion` variants keyed off the `isActive` prop; both the stagger and the watermark respect `prefers-reduced-motion` via `useReducedMotion`. Exports a `ProjectPanelSkeleton` for the loading state. |
| **ProjectModal** | `src/components/ProjectModal.jsx` | Full-screen modal dialog displaying project details: screenshots, meta (role, duration, outcome), problem statement, and tech stack. Closes on backdrop click or Escape key, traps focus within itself while open, and restores focus to the previously-focused element on close. Enter/exit is animated via `framer-motion` (`AnimatePresence` lives in the parent, `ProjectShowcase.jsx`). |

---

## 10. UI & UX Design

### Design System / Component Library
- **Hybrid approach:**
  - **Bootstrap 5 + React-Bootstrap** for structural layout, grid, and navbar collapse behavior.
  - **MUI (Material-UI)** for form inputs, buttons, and iconography.
  - **Custom Sass** for section-specific theming, typography overrides, and responsive adjustments.

### Color Palette
`variables.sass` is the source of truth for tokenized colors; most other values below are still hardcoded per-file (a known gap, see Known Issues).

| Color | Token / Hex | Usage |
|-------|------|-------|
| Primary Blue | `$primary-color` (`#0062b9`) | Section headers underline, skill category titles, CV button, contact info panel, hero accents, active nav-dot. |
| Primary Hover | `$primary-hover` (`#004f96`) | Primary button/link hover state. |
| Surface Tint | `$surface-tint` (`#f8f9fb`) | Shared section background — replaces what used to be five near-duplicate off-whites (`#f8f8f8`/`#fafafa`/`#f8f9fc`/`#f3f7fb`) across Home/About/Project/Contact/GitHub calendar. |
| Success | `$success-color` / `$success-bg-start` / `$success-bg-end` | Contact form success state, project "Featured"/badge-green accents. |
| Error | `$error-color` / `$error-bg` | Contact form validation error, project showcase error banner. |
| Spacing scale | `$space-1` (`0.4rem`) … `$space-6` (`4.8rem`) | Available for new spacing decisions; not yet retrofitted everywhere (most existing rules still use ad hoc rem values). |
| Z-index scale | `$z-nav` (500) / `$z-fab` (800) / `$z-modal` (1000) | Navbar, mobile CV download FAB, modal backdrop — previously all hardcoded to the same literal `1000`. |
| White | `#fff` | Contact form card, footer, modal panel. |

### Typography
- **Primary Font:** `Source Sans Pro`, self-hosted via `@fontsource/source-sans-pro` (400/600/700), imported in `main.jsx`. (`index.html` also still loads it from Google Fonts CDN — redundant, see Known Issues.)
- **Base HTML font size:** `62.5%` (`1rem = 10px` at baseline), rescaled further at breakpoints (`59%` ≤992px, `56%` ≤900px, `65%` ≥1800px).
- **MUI components use the same rem scale correctly** thanks to `src/theme.js`'s `typography.htmlFontSize: 10` passed to `ThemeProvider` — without it, `TextField`/`Button` text renders far too small (see "Non-Obvious Structural Choices").
- **Scale:** Hero heading `5rem` (→`3.2rem`), section headings `4rem`, h3 `2.8rem`, body text `1.5rem`–`2.2rem`, pills/labels `1.2rem`.

### Spacing & Layout System
- **CSS Grid / Flexbox hybrid:** Bootstrap's 12-column grid (`Row`, `Col`) is used only in `Aboutme.jsx`; everything else (Home hero, Project panels, Contact card) is hand-rolled Flexbox/Grid.
- **Contact card:** Two-column grid (`34rem` info panel + `1fr` form) with a max-width of `96rem`, collapsing to one column at `$breakpoint-lg` (992px).
- **Project panels:** `1fr 1.35fr` grid (text column narrower than the media column, widened from an even `1fr 1fr` split so project images render larger) on desktop; single column with a large gap on mobile.

### Responsive Design Approach
- **Breakpoints** (`variables.sass`): Small `576px`, Medium `768px`, Large `992px`. Most stylesheets now reference these via `@use variables` rather than hardcoding raw numbers (a prior inconsistency).
- Notable responsive behaviors:
  - Home section stacks vertically below `768px`.
  - Contact card becomes single-column at `992px`.
  - Project panel media uses `object-fit: contain` at all sizes (shows the full uploaded image, never crops it) and gets a taller container + larger gap from the text column below `768px`, with its own background/shadow removed there so the project-number watermark can show through the image's transparent letterbox margins.
  - Navbar collapses into a hamburger menu (Bootstrap native); the logo is manually repositioned/scaled via `transform: scale(.8)` below `768px`.

### Animations & Transitions
- **Hero photo ring:** `spin` keyframes rotate a dashed border ring continuously (`20s` linear); disabled under `prefers-reduced-motion: reduce`.
- **Scroll hint:** `scrollPulse` animates opacity/scale of a bottom gradient line; disabled under reduced motion.
- **Project panels:** `framer-motion` stagger reveal (title/description/badges/CTA) keyed off `isActive`; uses `useReducedMotion` to swap to a plain opacity fade with no stagger/y-offset when reduced motion is preferred.
- **About Me stat counters:** `framer-motion` count-up animation (`useInView` + `animate`), skips straight to the final value under reduced motion.
- **Modal:** `framer-motion` `AnimatePresence` fade/scale enter-exit (previously instant show/hide).
- **Skeleton loaders:** `shimmer` animation on a diagonal gradient.

### Accessibility Considerations
- **Focus management:** Global `outline: none` is overridden by a `*:focus-visible` rule (`2px solid $primary-color`) to restore keyboard visibility.
- **Modal:** Traps scroll (`document.body.style.overflow = 'hidden'`), closes on `Escape` or backdrop click, has `role="dialog"` with `aria-label` bound to the project title, traps Tab focus within itself, and restores focus to the triggering element on close.
- **Nav:** `aria-current="page"` on `NavBarP` links now reflects real scroll position (`IntersectionObserver`-driven) instead of being hardcoded on all links.
- **Form:** Error messages use `role="alert"`.
- **Images:** Hero profile image, project thumbnails, and modal screenshots all have descriptive `alt` text.
- **Social links:** Have `aria-label` attributes.
- **SectionHeader:** subtitle is a sibling `<p>`, not nested inside the `<h2>` (previously both title and subtitle shared the heading's accessible name).

### Key UI Patterns
- **Fixed top navbar** with smooth-scroll hash links and a real active-section indicator.
- **Full-viewport hero section** with a circular profile photo (`Profile.png`), animated dashed ring, label badge, and dual CTA buttons.
- **About Me:** facts card + CV button (left), animated skills marquee (right), stats row, and GitHub contribution calendar below.
- **Pinned-scroll project showcase:** the Project section locks to the screen while scrolling cycles through project panels one at a time (see "Primary Data Flow" above); only continues to About Me/Contact once you scroll past the first/last panel. Case-study modal on demand.
- **Split contact card:** blue info panel on the left with contact details and social icons; white form panel on the right with validation and success states.
- **Footer** with social links and attribution.

---

## 11. Design Patterns & Code Conventions

### Design Patterns
- **Presentation Component pattern:** Most components are purely presentational; state is co-located where needed (`Contact`, `ProjectShowcase`).
- **Custom Hook pattern:** Data fetching is abstracted into `useProjects.js`.
- **Fallback pattern:** The app always works, even if external services (Sanity) are unavailable.
- **Centralized variables file:** `variables.sass` holds color tokens and breakpoints, imported via `@use` where needed.

### Code Style & Formatting
- **ESLint** enforces React/recommended and Hooks/recommended rules.
- **No Prettier configuration** is present.
- **Quote style:** Mixed — JSX uses double quotes; JS uses single quotes in newer files.
- **Indentation:** 2 spaces in JS/JSX; indentation in `.sass` files varies (2 or 4 spaces).

### Separation of Concerns
- **UI vs. Logic:** UI markup and local logic are tightly coupled inside each component file. Shared business logic (data fetching) lives in `src/hooks/`.
- **Styles:** Each major component imports its own `.sass` file, keeping styles component-scoped by convention rather than by CSS Modules.

### TypeScript
**Not applicable.** The project is written in plain JavaScript (JSX). Prop types are used in:
- `SectionHeader.jsx`
- `TechBadge.jsx`, `ProjectPanel.jsx`, `ProjectNavDots.jsx`, `StatCounter.jsx`
- `ProjectModal.jsx`

### Custom Hooks

| Hook | File | Purpose |
|------|------|---------|
| **useProjects** | `src/hooks/useProjects.js` | Fetches project documents from Sanity via GROQ. Falls back to `fallbackProjects` if the project ID is missing or the request fails. Returns `{ projects, loading, error }`. |
| **useScrollPin** | `src/hooks/useScrollPin.js` | Drives the Project section's pinned-scroll interaction: tracks scroll progress through a `panelCount * 100vh` wrapper to compute the active panel index, snaps to the nearest panel boundary once scrolling settles, and exposes `scrollToIndex(i)` for nav-dot clicks. Returns `{ activeIndex, scrollToIndex }`. |

### Utility Functions

| Function | File | Purpose |
|----------|------|---------|
| **urlFor** | `src/lib/sanityClient.js` | Wraps `imageUrlBuilder(client).image(source)` to generate responsive image URLs from Sanity image records. **Note:** Exported but currently unused — `useProjects.js` fetches direct URLs via GROQ instead. |

### Constants & Enums

| File | Contents |
|------|----------|
| `src/constants/social.js` | `SOCIAL_LINKS` object containing `github`, `linkedin`, `twitter`, `facebook`, and `email` (all real values now). Also exports `GITHUB_USERNAME`. Imported by `Home.jsx`, `Foot.jsx`, `Contact.jsx`, `GithubContributions.jsx`. |
| `src/constants/theme.js` | `PRIMARY_COLOR`/`PRIMARY_HOVER` — mirrors `variables.sass`'s `$primary-color`/`$primary-hover` for the handful of places (MUI `sx` props, the GitHub calendar's JS theme array) that can't reach Sass variables. |
| `src/data/fallbackProjects.js` | Static array of 5 fallback project objects. |
| `src/data/skills.js` | Array of `{ name, category }` skill entries grouped into frontend/backend/testing/monitoring/tools/design/ai; rendered by `SkillsMarquee`. |

---

## 12. Third-Party Services & Integrations

| Service | Purpose | SDK / Client | Where Used |
|---------|---------|--------------|------------|
| **Sanity** | Headless CMS for project content. | `@sanity/client`, `@sanity/image-url` | `src/lib/sanityClient.js`, `src/hooks/useProjects.js` |
| **EmailJS** | Send contact-form emails without a backend. | `emailjs-com` (npm) | `src/components/Contact.jsx` |
| **Google Fonts** | Load `Source Sans Pro` typeface. | CDN `<link>` | `index.html` |
| **jsDelivr (Bootstrap / Popper)** | Load Bootstrap JS and Popper.js for navbar collapse. | CDN `<script>` | `index.html` |

### Security Note
EmailJS credentials are read from environment variables (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`). The fallback values that were previously hardcoded have been moved into `.env`. Note: Vite exposes `import.meta.env` variables prefixed with `VITE_` to the client bundle, so these values are still visible in the production build. This is acceptable for EmailJS public keys but should be understood as a client-side exposure.

---

## 13. Testing

**Not applicable.** There are no tests, test scripts, or testing dependencies in this project.

- No `*.test.js`, `*.spec.js`, or `__tests__` folders exist.
- `package.json` does not include Jest, Vitest, Cypress, Playwright, or Testing Library.

### What Should Be Tested (Recommendation)
1. **Contact form validation:** Ensure empty fields and invalid emails trigger the error alert.
2. **EmailJS integration:** Mock the SDK and assert it is called with the correct payload.
3. **ProjectModal behavior:** Verify that Escape key and backdrop click call `onClose`.
4. **useProjects hook:** Test fallback behavior when `VITE_SANITY_PROJECT_ID` is missing.
5. **Accessibility:** Automated a11y scans (axe-core) to catch any remaining focus/label issues.

---

## 14. Performance & Optimization

### Current Optimizations
- **Vite bundling:** Fast dev HMR and production tree-shaking out of the box.
- **Lazy loading of Sanity client:** `useProjects.js` dynamically imports `sanityClient.js` so the ~87 kB Sanity chunk is only loaded when a project ID is present.
- **Image assets:** Stored in `public/images/`; Vite copies them as static files.
- **Code splitting:** Vite automatically code-splits the Sanity bundle (`assets/sanityClient-*.js`).

### SEO Setup
- `index.html` includes:
  - `<title>Denideni Mohammed</title>`
  - `<meta name="description">`
  - OpenGraph tags (`og:title`, `og:description`, `og:type`)
- No `robots.txt` or sitemap is present.

### Bundle Analysis
- No explicit bundle analyzer is configured.
- Notable bundle contributors:
  - **MUI + Emotion**
  - **Bootstrap + React-Bootstrap**
  - **Sanity client**

### SSR / SSG
**Not applicable.** The app is a client-side rendered SPA. There is no Next.js, no server-side rendering, and no static generation at build time beyond Vite's default HTML injection.

---

## 15. Deployment & DevOps

### Deployment Target
**Not specified in code.** The `dist/` folder contains a static site that can be deployed to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, AWS S3, etc.).

### Build Commands
```bash
npm run build   # Produces the dist/ folder
npm run preview # Serves dist/ locally via Vite preview server
```

### Environment Setup
- **Local:** `npm install` → `npm run dev`.
- **Staging / Production:** No environment-specific build configurations exist. The same artifact is intended for all environments, differentiated only by environment variables.

### CI/CD
**Not applicable.** No GitHub Actions, GitLab CI, or other pipeline configuration files are present.

### Docker
**Not applicable.** No `Dockerfile` or `docker-compose.yml` exists.

### Database Deployment
**Not applicable.**

---

## 16. Known Issues & Technical Debt

1. **Duplicate font load**
   - `Source Sans Pro` is now self-hosted via `@fontsource/source-sans-pro` (`main.jsx`), but `index.html` still also loads the same font from the Google Fonts CDN — a harmless but wasteful double-load left over from before it was self-hosted. Removing the `<link>` tags in `index.html` would clean this up.

2. **No Tests**
   - Zero test coverage. Form validation, modal focus-trap, and the pinned-scroll interaction are all fragile to regressions.

3. **No CMS Content Yet**
   - Sanity Studio exists only as schema files. The developer must still run `npm create sanity@latest` inside `studio/`, populate projects, and add `VITE_SANITY_PROJECT_ID` to `.env`.

4. **Fallback project links are placeholders**
   - Every entry in `src/data/fallbackProjects.js` has empty `liveUrl`/`githubUrl`/`outcome`, so the Live/GitHub links and the modal's Solution text never render for the fallback dataset. Needs real values or Sanity content.

5. **Sass Deprecation Warnings**
   - `npm run build` prints multiple warnings: *"The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0."* This comes from Vite's Sass integration and does not break the build.

6. **Mixed Quote Styles**
   - The codebase uses both single and double quotes inconsistently across files.

7. **`.env` in Source Control Risk**
   - `.env` is ignored by `.gitignore`, and `.env.example` is provided as a safe template. Developers should copy `.env.example` to `.env` and fill in real values locally without committing them.

8. **Container/gutter convention still inconsistent across sections**
   - Home/Aboutme/Contact rely on Bootstrap's default `.container` gutter, while Project uses a custom rem-based padding — not yet unified onto one convention. Deliberately deferred (visual-risk change, needs a design decision rather than a mechanical fix).

9. **`dist/` is committed to git**
   - Unusual but intentional in this repo's history (every prior commit includes a fresh `dist/` build). Continue rebuilding before each commit that should ship a new build, or start ignoring it if that's no longer the deployment model.

---

## 17. Glossary

| Term | Definition |
|------|------------|
| **AHP** | Analytic Hierarchy Process — a structured technique for organizing and analyzing complex decisions. Referenced in the "HAP" project. |
| **Bootstrap** | Popular CSS framework providing responsive grid, components, and utilities. |
| **EmailJS** | Third-party service that sends emails directly from client-side JavaScript without a server. |
| **GROQ** | Graph-Relational Object Queries — Sanity's query language used in `useProjects.js`. |
| **HashLink** | A wrapper around React Router's `Link` that supports smooth scrolling to anchor IDs (`#section`). |
| **MERN** | MongoDB, Express, React, Node.js — the stack the developer specializes in. |
| **MUI** | Material-UI; a React component library implementing Google's Material Design. |
| **Pug.js** | Templating engine (formerly Jade) used in the "ToDo App" project. |
| **Sass** | CSS preprocessor; this project uses the indented `.sass` syntax (not SCSS). |
| **Sanity** | Headless CMS used to manage and serve project content. |
| **Vite** | Next-generation frontend tooling used for bundling and dev server. |

---

## 18. Quick Reference for AI Agents

**What this project does:** A personal portfolio SPA for Mohammed Denideni. It displays a hero intro with a circular profile photo (`Profile.png`), an about-me section with facts/CV button, an animated skills marquee, stat counters, and a GitHub contribution calendar, a pinned-scroll project showcase (the section locks to the screen while you scroll through project panels) with a case-study modal, a contact form wired to EmailJS, and a footer with social links.

**Full tech stack in one list:** React 18, Vite 5, React Router DOM + HashLink, Bootstrap 5 + React-Bootstrap, MUI v6 + Emotion (with a custom `ThemeProvider`, see `src/theme.js`), Sass (indented syntax), framer-motion, EmailJS, Sanity CMS (`@sanity/client`, `@sanity/image-url`), react-github-calendar, ESLint 9.

**Main folders:**
- `src/components/` — page sections (`Home`, `Aboutme`, `Project`, `Contact`, `Foot`), navbar (`NavBarP`), the pinned-scroll project showcase (`ProjectShowcase`, `ProjectPanel`), and modal (`ProjectModal`).
- `src/components/subComponents/` — `SectionHeader`, `TechBadge`, `ProjectNavDots`, `SkillsMarquee`, `StatCounter`, `StatsRow`, `GithubContributions`, `AboutFacts`, `CvButton`.
- `src/stylesheets/` — one `.sass` file per component plus `variables.sass` (colors, spacing scale, z-index scale, breakpoints).
- `src/hooks/` — `useProjects.js` (Sanity + fallback data fetching), `useScrollPin.js` (pinned-section scroll/snap tracking for the Project section).
- `src/lib/` — `sanityClient.js`.
- `src/data/` — `fallbackProjects.js` (5 projects), `skills.js`, `aboutStats.js`.
- `src/constants/` — `social.js` (real social links), `theme.js` (JS-side color constants).
- `src/theme.js` — MUI `ThemeProvider` theme (root-level, not in `constants/`).
- `public/images/` — logo, `Profile.png`, mockups, and per-project screenshot folders.
- `studio/schemaTypes/` — Sanity Studio schema definitions.

**Most important files to know:**
- `src/App.jsx` — root layout rendering all sections inside `<main>`. `Home` and `Contact` render their own `id`; only `Aboutme` needs an `id` wrapper div here (it has none of its own).
- `src/main.jsx` — mounts React inside `BrowserRouter` + MUI `ThemeProvider`, imports Bootstrap CSS, self-hosted fonts, and global Sass.
- `src/components/ProjectShowcase.jsx` — the entire projects UI: pinned-scroll section, absolutely-stacked panels, nav dots, skeletons, and modal trigger.
- `src/hooks/useScrollPin.js` — if the pinned-scroll interaction needs tuning, this is where the scroll-progress math and snap-timeout logic live.
- `src/hooks/useProjects.js` — determines whether to fetch from Sanity or use fallback data.
- `src/components/Contact.jsx` — contact form + EmailJS integration using environment variables.
- `src/stylesheets/variables.sass` — shared colors, spacing scale, z-index scale, breakpoints.
- `src/theme.js` — MUI theme; **any new MUI component must render under the `ThemeProvider` in `main.jsx`** or its text will size incorrectly (see below).
- `index.html` — HTML shell with SEO meta tags and Bootstrap CDN scripts.
- `.env` — holds Sanity and EmailJS credentials (not committed).

**How to add a new feature:**
1. **New section:** Create a component in `src/components/` that renders its own `<section id="...">` (don't also wrap it in a `<div id="...">` in `App.jsx` — that duplicate-id pattern previously caused a real layout bug), add a corresponding `.sass` file in `src/stylesheets/`, render it inside `src/App.jsx`, and add a `HashLink` (plus an entry in `NavBarP.jsx`'s `navLinks` array, so active-state tracking picks it up).
2. **New project (Sanity):** Add a document in Sanity Studio using the `project` schema.
3. **New project (fallback only):** Edit `src/data/fallbackProjects.js` and add images to `public/images/`.
4. **New style token:** Add it to `src/stylesheets/variables.sass` (use the existing `$space-*`/`$z-*` scales where applicable) and import via `@use './variables' as v` in the relevant Sass file.
5. **Environment setup:** Copy `.env.example` to `.env` and configure the required variables.

**How to run locally:**
```bash
npm install
npm run dev
```

**Gotchas / non-obvious things:**
- The app uses hash anchors (`/#aboutMe`) for navigation, not real routes.
- If `VITE_SANITY_PROJECT_ID` is missing, the project showcase renders fallback data automatically.
- The Sanity client is loaded via dynamic import to avoid bundling it when unused.
- The global Sass reset removes `outline: none`, but `*:focus-visible` restores accessibility.
- **MUI + the 62.5% font trick:** don't remove `typography.htmlFontSize: 10` from `src/theme.js` or add MUI components outside the `ThemeProvider` — either will make MUI text render at ~62.5% of its intended size against this project's `html { font-size: 62.5% }` base.
- **The Project section is not normal document flow** — it's a `position: sticky` block inside a `panelCount * 100vh` wrapper, driven by `useScrollPin`'s scroll-position math, not CSS `scroll-snap`. If project panels ever stop switching correctly, check `useScrollPin.js` and the `.is-active` class wiring in `ProjectPanel.jsx`/`projectShowcaseS.sass` first.
- Don't duplicate a component's own section `id` with a wrapper `<div id="...">` in `App.jsx` — see "Non-Obvious Structural Choices" above for why that's a real bug, not just untidy markup.
