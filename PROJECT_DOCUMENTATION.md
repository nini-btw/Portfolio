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
- The project is migrating from a hardcoded Swiper carousel to a filterable grid backed by Sanity CMS.

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
| **@fontsource/roboto** | 5.1.0 | Self-hosted Roboto font (imported but not heavily used; primary font is Source Sans Pro from Google Fonts CDN). |
| **emailjs-com** | 3.2.0 | Browser SDK for sending contact-form emails directly from the client. |
| **jQuery** | 3.7.1 | Peer dependency for Bootstrap JS components (navbar collapse). |
| **@popperjs/core** | 2.11.8 | Positioning engine required by Bootstrap dropdowns/tooltips. |
| **@sanity/client** | 6.29.1 | Sanity.io client for fetching CMS content. |
| **@sanity/image-url** | 1.2.0 | Utility for generating image URLs from Sanity image assets. |
| **framer-motion** | 11.18.2 | Animation library (installed for future use; not currently imported). |

### Unused Dependencies (still listed in `package.json` but not imported in source)
- `@fortawesome/free-solid-svg-icons` ^6.6.0
- `@fortawesome/react-fontawesome` ^0.2.2
- `bootstrap-icons` ^1.11.3
- `swiper` ^11.1.15

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

### Primary Data Flow (Projects Grid)
1. **`ProjectGrid`** mounts and calls `useProjects()`.
2. If `VITE_SANITY_PROJECT_ID` is missing, `fallbackProjects` is loaded immediately.
3. If present, the hook dynamically imports `src/lib/sanityClient.js` and runs a GROQ query.
4. Returned data populates the grid. On error, the grid falls back to `fallbackProjects`.
5. Clicking a card opens `ProjectModal` with the selected project object passed as a prop.

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
│   │   ├── ProjectGrid.jsx
│   │   ├── ProjectModal.jsx
│   │   └── subComponents/
│   │       └── SectionHeader.jsx
│   ├── constants/
│   │   └── social.js
│   ├── data/
│   │   └── fallbackProjects.js
│   ├── hooks/
│   │   └── useProjects.js
│   ├── index.sass
│   ├── lib/
│   │   └── sanityClient.js
│   ├── main.jsx
│   └── stylesheets/
│       ├── aboutmeS.sass
│       ├── contactS.sass
│       ├── footS.sass
│       ├── homeS.sass
│       ├── navS.sass
│       ├── projectGridS.sass
│       ├── projectModalS.sass
│       ├── projectS.sass
│       ├── variables.sass
│       └── subStyle/
│           └── sectionHeader.sass
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
| `src/components/` | Top-level page section components (`Home`, `Aboutme`, `Project`, `Contact`, `Foot`), navbar (`NavBarP`), the interactive project grid (`ProjectGrid`), and its modal (`ProjectModal`). |
| `src/components/subComponents/` | Reusable presentational subcomponents. Currently holds `SectionHeader.jsx`. |
| `src/constants/` | Shared constant values. Holds `social.js` with social media URLs. |
| `src/data/` | Static fallback data. Holds `fallbackProjects.js` used when Sanity is unavailable. |
| `src/hooks/` | Custom React hooks. Holds `useProjects.js` for Sanity/fallback data fetching. |
| `src/lib/` | Third-party client initialization. Holds `sanityClient.js`. |
| `src/stylesheets/` | Sass stylesheets (indented syntax), one per major component, plus `variables.sass` for shared tokens. |
| `src/stylesheets/subStyle/` | Styles for subcomponents (`sectionHeader.sass`). |
| `studio/` | Sanity Studio schema definitions. The developer must run `npm create sanity@latest` inside this folder and point it to these schema files. |
| `dist/` | Generated build output from `vite build`. Not version-controlled. |
| `.vscode/` | Workspace-specific VS Code settings (spell-check word lists). |

### Naming Conventions
- **Components:** PascalCase (`Aboutme.jsx`, `NavBarP.jsx`, `SectionHeader.jsx`, `ProjectGrid.jsx`).
- **Stylesheets:** camelCase component name + suffix `S.sass` (`aboutmeS.sass`, `contactS.sass`, `projectGridS.sass`).
- **Subcomponent styles:** Live in `subStyle/` and match the component name (`sectionHeader.sass`).
- **Hooks:** camelCase prefixed with `use` (`useProjects.js`).
- **Assets:** Lowercase with hyphens for multi-word filenames (`20230615_182139-removebg-preview.png`).
- **Public screenshot folders:** Named after the project slug (`hap`, `calculator`, `template1`, `template2`).

### Non-Obvious Structural Choices
1. **Hash-based SPA navigation:** The app uses `react-router-hash-link` to scroll to section anchors (`#home`, `#aboutMe`, `#project`, `#contact`) even though it is technically a single-page app with only one route (`/`).
2. **No `pages/` or `views/` folder:** All section-level components live flat inside `src/components/`.
3. **CMS with local fallback:** The project is architected to work 100% without Sanity by shipping a fallback dataset. This ensures the portfolio is never broken during CMS setup.
4. **Dynamic import of Sanity client:** `useProjects.js` uses `import('../lib/sanityClient')` so the Sanity bundle chunk is only loaded when a project ID is configured.

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

The `project` document type contains the following fields:

| Field | Type | Purpose |
|-------|------|---------|
| `title` | `string` (required) | Project name. |
| `slug` | `slug` (required) | URL-friendly identifier. |
| `featured` | `boolean` | Pins project to the top of the grid. |
| `category` | `string` (required) | One of: `full-stack`, `frontend`, `tool`, `backend`. |
| `shortDescription` | `text` (max 120 chars, required) | Card subtitle. |
| `problem` | `text` | Problem the project solved (shown in modal). |
| `myRole` | `string` | e.g. "Solo developer". |
| `duration` | `string` | e.g. "3 weeks". |
| `outcome` | `text` | Measurable result. |
| `techStack` | `array` of `string` | Technology tags (layout: tags). |
| `screenshots` | `array` of `image` | Project screenshots; first image becomes thumbnail. |
| `liveUrl` | `url` | Live demo link. |
| `githubUrl` | `url` | Repository link. |

### Fallback Data
When Sanity is not configured, the app renders three fallback projects from `src/data/fallbackProjects.js`:
1. **HAP Decision Tool** (`full-stack`, featured)
2. **Calculator** (`frontend`)
3. **Pug Todo App** (`full-stack`)

### Data Fetching Hook
**File:** `src/hooks/useProjects.js`

- Returns `{ projects, loading, error }`.
- GROQ query fetches all `project` documents sorted by `featured desc, _createdAt desc`.
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
App
├── NavBarP
├── main
│   ├── #home
│   │   └── Home
│   ├── #aboutMe
│   │   └── Aboutme
│   │       └── SectionHeader
│   ├── #project
│   │   └── Project
│   │       ├── SectionHeader
│   │       └── ProjectGrid
│   │           └── ProjectModal (conditional)
│   └── #contact
│       └── Contact
│           └── SectionHeader
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
- `ProjectGrid.jsx` holds UI state (`activeFilter`, `selectedProject`).
- `ProjectModal.jsx` is fully controlled by props (`project`, `onClose`).

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
- `ProjectGrid.jsx` shows 3 skeleton cards while `loading` is true.
- If Sanity fails, an error message is shown above the grid, and fallback data is still rendered.
- `Contact.jsx` displays a red bordered alert box if validation fails or EmailJS errors out.
- The submit button shows a disabled "Sending…" state during submission.

### Key Reusable Components

| Component | File | Purpose |
|-----------|------|---------|
| **SectionHeader** | `src/components/subComponents/SectionHeader.jsx` | Renders a styled two-line heading (title + subtitle) with an underline accent. Accepts `title` (required string) and `subtitle` (required string) props. Validated with PropTypes. |

### Key Feature Components

| Component | File | Purpose |
|-----------|------|---------|
| **ProjectGrid** | `src/components/ProjectGrid.jsx` | Renders a filterable responsive grid of project cards. Manages `activeFilter` and `selectedProject` state. Includes skeleton loading UI. |
| **ProjectModal** | `src/components/ProjectModal.jsx` | Full-screen modal dialog displaying project details: screenshots, meta (role, duration, outcome), problem statement, and tech stack. Closes on backdrop click or Escape key. |

---

## 10. UI & UX Design

### Design System / Component Library
- **Hybrid approach:**
  - **Bootstrap 5 + React-Bootstrap** for structural layout, grid, and navbar collapse behavior.
  - **MUI (Material-UI)** for form inputs, buttons, and iconography.
  - **Custom Sass** for section-specific theming, typography overrides, and responsive adjustments.

### Color Palette

| Color | Hex / RGBA | Usage |
|-------|------------|-------|
| Primary Blue | `#0062b9` | Section headers underline, skill category titles, CV button, contact info panel, hero accents. |
| MUI Hover Blue | `#004f96` | Primary button hover state. |
| Light Blue | `#5BA3EC` | Accent in hero gradient blob (legacy, minimal). |
| Off-White | `#f8f8f8`, `#fafafa` | Section backgrounds (About Me, Project). |
| Hero Background | `#f8f9fc` | Hero section background. |
| Contact Background | `#f3f7fb` | Contact section background (light gray-blue). |
| Deep Navy (removed) | — | Previously used; now replaced with primary blue `#0062b9` for the contact left panel. |
| Dark Grey | `#333` | Primary body text. |
| Medium Grey | `#777` | Skill pill text, subtitles. |
| White | `#fff` | Contact form card, footer, overlay modal. |
| Black | `#000` | GitHub button in overlay. |

### Typography
- **Primary Font:** `Source Sans Pro` (loaded from Google Fonts CDN).
- **Weights used:** 400, 600, 700, 900.
- **Base HTML font size:** `62.5%` (enables rem math where `1rem = 10px`).
- **Scale:**
  - Hero heading: `5rem` (responsive down to `3.2rem`)
  - Section headings: `4rem` (`heading-sec__main`)
  - Subheadings / h3: `2.8rem`
  - h4 (skill categories): `2rem`
  - Body text: `1.5rem` – `2.2rem`
  - Skill pills / labels: `1.2rem`

### Spacing & Layout System
- **CSS Grid / Flexbox hybrid:** Bootstrap's 12-column grid (`Row`, `Col`) is used inside sections; custom CSS Grid powers the project card layout and the contact card split.
- **Contact card:** Two-column grid (`34rem` info panel + `1fr` form) with a max-width of `96rem`.
- **Project grid:** Responsive auto-fill grid with `minmax(30rem, 1fr)`.

### Responsive Design Approach
- **Breakpoints** (defined in `variables.sass`):
  - Small: `576px`
  - Medium: `768px`
  - Large: `992px`
- Notable responsive behaviors:
  - Home section stacks vertically below `768px`.
  - Contact card becomes single-column below `900px`.
  - Project grid becomes single-column below `768px`.
  - Navbar collapses into a hamburger menu (Bootstrap native).

### Animations & Transitions
- **Hero photo ring:** `spin` keyframes rotate a dashed border ring continuously (`20s` linear).
- **Scroll hint:** `scrollPulse` animates opacity and scale of a bottom gradient line.
- **Project cards:** `translateY(-4px)` + box-shadow on hover.
- **Project card image:** `scale(1.04)` on hover.
- **Skeleton loaders:** `shimmer` animation on a diagonal gradient.
- **Modal:** Backdrop fade is CSS-driven; no JS animation library is currently used for it.

### Accessibility Considerations
- **Focus management:** Global `outline: none` is overridden by a `*:focus-visible` rule (`2px solid #0062b9`) to restore keyboard visibility.
- **Modal:** Traps scroll (`document.body.style.overflow = 'hidden'`), closes on `Escape`, and has `role="dialog"` with `aria-label` bound to the project title.
- **Form:** Error messages use `role="alert"`.
- **Images:** Hero profile image has descriptive `alt` text.
- **Social links:** Have `aria-label` attributes.

### Key UI Patterns
- **Fixed top navbar** with smooth-scroll hash links.
- **Full-viewport hero section** with a circular profile photo (`Profile.png`), animated dashed ring, label badge, and dual CTA buttons.
- **Two-column skills grid** (Front-End / Back-End) with pill tags.
- **Filterable project grid** with category pills (All, Full-Stack, Frontend, Tool, Backend).
- **Project case-study modal** with screenshot gallery, meta data grid, problem statement, and tech stack tags.
- **Split contact card:** blue info panel on the left with contact details and social icons; white form panel on the right with validation and success states.
- **Sticky footer** with social links and attribution.

---

## 11. Design Patterns & Code Conventions

### Design Patterns
- **Presentation Component pattern:** Most components are purely presentational; state is co-located where needed (`Contact`, `ProjectGrid`).
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
- `ProjectGrid.jsx` (`TechBadge`, `ProjectCard`)
- `ProjectModal.jsx`

### Custom Hooks

| Hook | File | Purpose |
|------|------|---------|
| **useProjects** | `src/hooks/useProjects.js` | Fetches project documents from Sanity via GROQ. Falls back to `fallbackProjects` if the project ID is missing or the request fails. Returns `{ projects, loading, error }`. |

### Utility Functions

| Function | File | Purpose |
|----------|------|---------|
| **urlFor** | `src/lib/sanityClient.js` | Wraps `imageUrlBuilder(client).image(source)` to generate responsive image URLs from Sanity image records. |

### Constants & Enums

| File | Contents |
|------|----------|
| `src/constants/social.js` | `SOCIAL_LINKS` object containing `github`, `linkedin`, `twitter`, and `email` URLs. Imported by `Home.jsx` and `Foot.jsx`. |
| `src/data/fallbackProjects.js` | Static array of 3 fallback project objects. |

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
- Opportunity: remove unused dependencies (`@fortawesome/*`, `bootstrap-icons`, `swiper`) from `package.json` to clean up install size.

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

1. **Unused Dependencies in `package.json`**
   - `@fortawesome/free-solid-svg-icons`, `@fortawesome/react-fontawesome`, `bootstrap-icons`, and `swiper` were uninstalled from `node_modules` during an upgrade but still remain listed in `package.json`. They should be removed to keep dependencies clean.

2. **Placeholder Social Links**
   - `src/constants/social.js` contains placeholder URLs (`https://github.com/YOUR_USERNAME`, etc.) that need to be replaced with real profiles.

3. **No Tests**
   - Zero test coverage. Form validation and overlay interactions are fragile to regressions.

4. **No CMS Content Yet**
   - Sanity Studio exists only as schema files. The developer must still run `npm create sanity@latest` inside `studio/`, populate projects, and add `VITE_SANITY_PROJECT_ID` to `.env`.

5. **Sass Deprecation Warnings**
   - `npm run build` prints multiple warnings: *"The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0."* This comes from Vite's Sass integration and does not break the build.

6. **Mixed Quote Styles**
   - The codebase uses both single and double quotes inconsistently across files.

7. **`.env` in Source Control Risk**
   - `.env` is currently ignored by `.gitignore`, but developers should be careful not to commit it accidentally with real secrets.

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

**What this project does:** A personal portfolio SPA for Mohammed Denideni. It displays a hero intro with a circular profile photo (`Profile.png`), an about-me section with skills, a filterable project grid with a case-study modal, a contact form wired to EmailJS, and a footer with social links.

**Full tech stack in one list:** React 18, Vite 5, React Router DOM + HashLink, Bootstrap 5 + React-Bootstrap, MUI v6 + Emotion, Sass (indented syntax), EmailJS, Sanity CMS (`@sanity/client`, `@sanity/image-url`), ESLint 9.

**Main folders:**
- `src/components/` — page sections (`Home`, `Aboutme`, `Project`, `Contact`, `Foot`), navbar (`NavBarP`), project grid (`ProjectGrid`), and modal (`ProjectModal`).
- `src/stylesheets/` — one `.sass` file per component plus `variables.sass`.
- `src/hooks/` — `useProjects.js` (Sanity + fallback data fetching).
- `src/lib/` — `sanityClient.js`.
- `src/data/` — `fallbackProjects.js`.
- `src/constants/` — `social.js`.
- `public/images/` — logo, `Profile.png`, mockups, and per-project screenshot folders.
- `studio/schemaTypes/` — Sanity Studio schema definitions.

**Most important files to know:**
- `src/App.jsx` — root layout rendering all sections inside `<main>`.
- `src/main.jsx` — mounts React inside `BrowserRouter`, imports Bootstrap CSS and global Sass.
- `src/components/ProjectGrid.jsx` — the entire projects UI: filters, cards, skeletons, and modal trigger.
- `src/hooks/useProjects.js` — determines whether to fetch from Sanity or use fallback data.
- `src/components/Contact.jsx` — contact form + EmailJS integration using environment variables.
- `src/stylesheets/variables.sass` — shared colors and breakpoints.
- `index.html` — HTML shell with SEO meta tags and Bootstrap CDN scripts.
- `.env` — holds Sanity and EmailJS credentials (not committed).

**How to add a new feature:**
1. **New section:** Create a component in `src/components/`, add a corresponding `.sass` file in `src/stylesheets/`, import and render it inside `src/App.jsx` inside a `<div id="newSection">`, and add a `HashLink` in `NavBarP.jsx`.
2. **New project (Sanity):** Add a document in Sanity Studio using the `project` schema.
3. **New project (fallback only):** Edit `src/data/fallbackProjects.js` and add images to `public/images/`.
4. **New style token:** Add it to `src/stylesheets/variables.sass` and import via `@use './variables'` in the relevant Sass file.

**How to run locally:**
```bash
npm install
npm run dev
```

**Gotchas / non-obvious things:**
- The app uses hash anchors (`/#aboutMe`) for navigation, not real routes.
- If `VITE_SANITY_PROJECT_ID` is missing, the project grid renders fallback data automatically.
- The Sanity client is loaded via dynamic import to avoid bundling it when unused.
- `@fortawesome/*`, `bootstrap-icons`, and `swiper` are still in `package.json` but unused in source.
- The global Sass reset removes `outline: none`, but `*:focus-visible` restores accessibility.
