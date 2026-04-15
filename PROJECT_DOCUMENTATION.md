# PROJECT_DOCUMENTATION.md

---

## 1. Project Overview

**Project Name:** Portfolio  
**Version:** 0.0.0  
**Type:** Personal portfolio website (single-page application)

**Purpose:** This is the personal portfolio website of **Mohammed Denideni**, a Full-Stack Developer based in Oran, Algeria. The site serves as a digital resume and project showcase, presenting the developer’s skills, biography, completed projects, and contact information in a visually polished, scrollable single-page layout.

**Target Audience:**
- Potential employers and recruiters
- Clients seeking web development services
- Peer developers reviewing past work

**Problem Solved:** Provides a centralized, professionally designed web presence to demonstrate technical competency, showcase a curated list of projects with live previews and screenshots, and enable direct contact via an embedded form.

**Current Status:** Production-ready static site (deployable as a static bundle). The codebase is complete and functional, though it contains hardcoded third-party credentials and no automated testing.

**Business Context / Domain Knowledge:**
- The portfolio markets MERN-stack expertise (MongoDB, Express, React, Node.js).
- Projects featured include an AHP decision-making app, a calculator, HTML/CSS templates, and a Pug.js to-do app.
- Contact inquiries are routed through EmailJS without a custom backend.

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
| **Swiper** | 11.1.15 | Touch-enabled carousel/slider used for the projects showcase (`EffectCoverflow`, `Autoplay`, etc.). |
| **MUI (Material-UI)** | 6.3.0 | Design system providing `TextField`, `Button`, `Box`, and icon components. |
| **@mui/icons-material** | 6.3.0 | Iconography (Facebook, Twitter, LinkedIn, GitHub, Phone, Email, LocationOn, etc.). |
| **@emotion/react / @emotion/styled** | 11.14.0 | Emotion CSS-in-JS engine required by MUI v6. |
| **@fontsource/roboto** | 5.1.0 | Self-hosted Roboto font (imported but not heavily used; primary font is Source Sans Pro from Google Fonts CDN). |
| **FontAwesome** | 6.6.0 (icons), 0.2.2 (React) | Additional icon library (imported but largely superseded by MUI icons). |
| **emailjs-com** | 3.2.0 | Browser SDK for sending contact-form emails directly from the client. |
| **jQuery** | 3.7.1 | Peer dependency for Bootstrap JS components (navbar collapse). |
| **@popperjs/core** | 2.11.8 | Positioning engine required by Bootstrap dropdowns/tooltips. |
| **bootstrap-icons** | 1.11.3 | Icon font set (imported; usage minimal). |

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
- **Database:** Not applicable — no persistent data store.
- **ORM / query layer:** Not applicable.
- **Authentication / authorization:** Not applicable — no user accounts or protected routes.
- **State management library:** Not applicable — local `useState` only; no Redux/Zustand/etc. in use despite being listed as a skill.
- **Testing framework:** Not applicable — no tests are present.
- **CI/CD or containerization:** Not applicable — no GitHub Actions, Docker, or deployment config files.

---

## 3. Project Architecture

**Architecture Type:** Frontend-only static single-page application (SPA). The entire app is a collection of React components rendered into a single `index.html` shell. It is a monolith, not a monorepo or microservice architecture.

**Communication Pattern:** There is no frontend-to-backend communication. The only external network call is from the browser directly to **EmailJS** REST API when the contact form is submitted.

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
└─────────────────────────────────────────┘
```

### Primary Data Flow (Contact Form)
1. **User** fills name, email, subject, and message in the contact form (`Contact.jsx`).
2. **Client validation** runs in `validateForm()`; if fields are empty, an error string is set to local state.
3. On success, `emailjs.send(serviceId, templateId, formData, publicKey)` is invoked.
4. **EmailJS** returns a Promise; success or failure is logged to the console.
5. There is no UI success toast or follow-up redirect — only console logging.

---

## 4. Folder & File Structure

```
Portfolio/
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
│   │   ├── ClippedImage.jsx
│   │   ├── Contact.jsx
│   │   ├── Foot.jsx
│   │   ├── Home.jsx
│   │   ├── NavBarP.jsx
│   │   ├── Project.jsx
│   │   ├── SwiperC.jsx
│   │   └── subComponents/
│   │       └── SectionHeader.jsx
│   ├── index.sass
│   ├── main.jsx
│   └── stylesheets/
│       ├── aboutmeS.sass
│       ├── contactS.sass
│       ├── footS.sass
│       ├── homeS.sass
│       ├── navS.sass
│       ├── projectS.sass
│       ├── variables.sass
│       └── subStyle/
│           └── sectionHeader.sass
└── vite.config.js
```

### Folder Explanations

| Path | Purpose |
|------|---------|
| `public/` | Static assets copied verbatim into the build. Contains the CV PDF, logo, mockups, and per-project screenshots. |
| `src/` | Application source code. |
| `src/components/` | Top-level page section components (Home, Aboutme, Project, Contact, Foot) plus the navbar (`NavBarP`) and the interactive project slider (`SwiperC`). |
| `src/components/subComponents/` | Reusable presentational subcomponents. Currently holds `SectionHeader.jsx`. |
| `src/stylesheets/` | Sass stylesheets (indented syntax), one per major component, plus `variables.sass` for shared tokens. |
| `src/stylesheets/subStyle/` | Styles for subcomponents (`sectionHeader.sass`). |
| `dist/` | Generated build output from `vite build`. Not version-controlled. |
| `.vscode/` | Workspace-specific VS Code settings (spell-check word lists). |

### Naming Conventions
- **Components:** PascalCase (`Aboutme.jsx`, `NavBarP.jsx`, `SectionHeader.jsx`).
- **Stylesheets:** camelCase component name + suffix `S.sass` (`aboutmeS.sass`, `contactS.sass`).
- **Subcomponent styles:** Live in `subStyle/` and match the component name (`sectionHeader.sass`).
- **Assets:** Lowercase with hyphens for multi-word filenames (`20230615_182139-removebg-preview.png`).
- **Public screenshot folders:** Named after the project slug (`hap`, `calculator`, `template1`, `template2`).

### Non-Obvious Structural Choices
1. **Hash-based SPA navigation:** The app uses `react-router-hash-link` to scroll to section anchors (`#home`, `#aboutMe`, `#project`, `#contact`) even though it is technically a single-page app with only one route (`/`).
2. **No `pages/` or `views/` folder:** All section-level components live flat inside `src/components/`.
3. **Unused component:** `ClippedImage.jsx` exists but is never imported or rendered.
4. **Hardcoded project data:** The entire projects catalog is a static array inside `SwiperC.jsx` rather than a JSON file or CMS feed.

---

## 5. Configuration & Environment

### Environment Variables
**Not applicable.** The project does not use any environment variables (no `.env` files, no `import.meta.env` references). This is notable because third-party credentials (EmailJS service ID, template ID, and public key) are hardcoded directly into `src/components/Contact.jsx`.

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
- Loads Google Fonts (`Source Sans Pro` at weights 400, 600, 700, 900).
- Loads Swiper CSS and JS from unpkg CDN.
- Loads Bootstrap JS and Popper.js from jsDelivr CDN.
- Mounts the React app at `<div id="root"></div>`.

#### `package.json`
- `type: "module"` enables ES modules.
- Scripts:
  - `dev` — start Vite dev server.
  - `build` — production build.
  - `lint` — run ESLint.
  - `preview` — preview the production build locally.

#### `.gitignore`
- Ignores logs, `node_modules`, `dist-ssr`, editor directories (`.vscode/*` except extensions, `.idea`), and OS files.

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

**Not applicable.** This project has no database, no ORM, no data models, and no migrations. All content is static or held in React component state.

- **Project data** is stored as a hardcoded array inside `src/components/SwiperC.jsx`.
- **Form state** is ephemeral and lives only in the `Contact` component’s `useState` until it is sent to EmailJS.

---

## 7. API Reference

**Not applicable.** There are no custom API routes or backend endpoints. The only external API interaction is the EmailJS client SDK call embedded in the contact form.

**EmailJS Usage Detail (in `Contact.jsx`):**
```js
emailjs.send(
  "service_9qwd6o4",
  "template_3vr527a",
  formData,
  "pPj9pQfa02Mc8xF2c"
)
```
- **SDK:** `emailjs-com`
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
├── #home
│   └── Home
├── #aboutMe
│   └── Aboutme
│       └── SectionHeader
├── #project
│   └── Project
│       ├── SectionHeader
│       └── SwiperC
├── #contact
│   └── Contact
│       └── SectionHeader
└── Foot
```

### Routing
- **Router:** `BrowserRouter` wraps `<App />` in `main.jsx`.
- **Links:** `NavBarP.jsx` uses `HashLink` from `react-router-hash-link` with `smooth` scrolling to anchor IDs:
  - `/` (implicit)
  - `/#home`
  - `/#aboutMe`
  - `/#project`
  - `/#contact`
- There is no `<Routes>` or `<Route>` configuration; the app renders all sections at once and relies on hash anchors for UX navigation.

### State Management
- **No global state library.** All state is local React state.
- `Contact.jsx` holds form state (`formData`, `error`).
- `SwiperC.jsx` holds UI state (`showOverlay`, `overlayContent`, `showOne`).

### Data Fetching Strategy
- **None.** No HTTP data fetching libraries (no SWR, React Query, or `useEffect` fetch calls). The only async operation is the EmailJS `send()` Promise on form submission.

### Form Handling
- **Native controlled components** via MUI `TextField`.
- Validation is a simple manual check for empty fields in `validateForm()`.
- No form library (React Hook Form, Formik) is used.

### Error Handling & Loading States
- `Contact.jsx` displays a red inline error paragraph if validation fails.
- There is **no loading spinner** during EmailJS submission.
- There is **no success confirmation UI** after EmailJS resolves.
- Errors are only logged to `console.log` / `console.error`.

### Key Reusable Components

| Component | File | Purpose |
|-----------|------|---------|
| **SectionHeader** | `src/components/subComponents/SectionHeader.jsx` | Renders a styled two-line heading (title + subtitle) with an underline accent. Accepts `title` (required string) and `subtitle` (required string) props. |

---

## 10. UI & UX Design

### Design System / Component Library
- **Hybrid approach:**
  - **Bootstrap 5 + React-Bootstrap** for structural layout, grid, and navbar collapse behavior.
  - **MUI (Material-UI)** for form inputs, buttons, and iconography.
  - **Custom Sass** for section-specific theming, typography overrides, and responsive adjustments.
  - **Swiper** for the projects carousel.

### Color Palette

| Color | Hex / RGBA | Usage |
|-------|------------|-------|
| Primary Blue | `#0062b9` | Section headers underline, skill category titles, CV button background. |
| MUI Blue | `#1976D2` | Contact info card background, slider pagination bullets, CTA buttons. |
| Light Blue | `#5BA3EC` | Contact section background, gradient accent in contact card. |
| Off-White | `#f8f8f8`, `#fafafa` | Section backgrounds (Home, About Me, Project). |
| Dark Grey | `#333` | Primary body text. |
| Medium Grey | `#777` | Skill pill text, subtitles. |
| Light Grey | `#ccc` | Contact card secondary text. |
| White | `#fff` | Contact form card, footer, overlay modal. |
| Black | `#000` | GitHub button in overlay. |

### Typography
- **Primary Font:** `Source Sans Pro` (loaded from Google Fonts CDN).
- **Weights used:** 400, 600, 700, 900.
- **Base HTML font size:** `62.5%` (enables rem math where `1rem = 10px`).
- **Scale:**
  - Hero heading: `4rem` (`#landing-header`)
  - Section headings: `4rem` (`heading-sec__main`)
  - Subheadings / h3: `2.8rem`
  - h4 (skill categories): `2rem`
  - Body text: `1.8rem` – `2.2rem`
  - Skill pills / labels: `1.6rem`

### Spacing & Layout System
- **CSS Grid / Flexbox hybrid:** Bootstrap’s 12-column grid (`Row`, `Col`) is used inside sections; custom flexbox centers content vertically.
- **Section padding:** `3rem 0 5rem 0` with `min-height: 100vh` for full-screen sections.
- **Container margins:** Navbar uses `padding: 1rem 5rem` on desktop.

### Responsive Design Approach
- **Breakpoints** (defined in `variables.sass`):
  - Small: `576px`
  - Medium: `768px`
  - Large: `992px`
- **Mobile-first overrides** are applied via `@media (max-width: ...)` queries scattered across Sass files.
- Notable responsive behaviors:
  - Home section stacks vertically below `768px` (landing text below image).
  - Navbar collapses into a hamburger menu (Bootstrap native).
  - Swiper height reduces progressively on smaller viewports (`70vh` → `55vh` → `43vh` → `30vh`).
  - Project overlay screenshot grid is hidden below `992px` to prevent clutter.

### Animations & Transitions
- **Swiper carousel:** `EffectCoverflow` with `rotate: 50`, `depth: 100`, autoplay delay of `3000ms`.
- **Hover transforms:**
  - Social icons scale from `2` to `2.3` on hover.
  - CV button translates `Y(-3px)` on hover.
  - Skill pills and overlay pagination bullets scale up on hover.
- **Overlay modal fade:** `.one` and `.two` containers use `opacity` and `transform: scale()` transitions (`1s ease`) toggled by `showOne` state every `3000ms`.

### Accessibility Considerations
- **Partial / mixed.**
  - `aria-label`, `aria-controls`, `aria-expanded` are present on the Bootstrap navbar toggler.
  - `aria-current="page"` is applied to nav links.
  - Focus outlines are globally removed (`outline: none`), which hinders keyboard navigation visibility.
  - No skip-to-content link, no alt text on the hero image (empty string), and no ARIA live regions for form errors.
  - Color contrast is generally acceptable (dark text on light backgrounds).

### Key UI Patterns
- **Fixed top navbar** with smooth-scroll hash links.
- **Full-viewport hero section** with a blob-shaped profile image.
- **Two-column skills grid** (Front-End / Back-End) with pill tags.
- **Coverflow carousel** for project previews; clicking a slide opens a full-screen overlay modal.
- **Alternating overlay content** inside the project modal: mockup image vs. scattered screenshots toggle every 3 seconds.
- **Split contact card:** blue info panel on the left, white form panel on the right.
- **Sticky footer** with social links and attribution.

### Screenshots / Main Pages
Because the app is a single-page scroll site, there are no distinct "pages," but there are five visual sections:
1. **Home:** Large headline "Hey, I’m Mohammed Denideni" with a tagline and a stylized profile photo inside a morphing blob shape. Vertical social links on the left edge.
2. **About Me:** Section header, biography column, and a two-category skills grid (Front-End / Back-End) with grey pill tags. A prominent blue CV button.
3. **Projects:** Section header followed by a full-width Swiper carousel showing project screenshots with a 3D coverflow effect.
4. **Contact:** Blue background. A rounded white card containing contact info (phone, email, location) and a Material-UI form (name, email, subject, message).
5. **Footer:** White bar with "Made with ❤️ by Mohammed Denideni" on the left and social icons on the right.

---

## 11. Design Patterns & Code Conventions

### Design Patterns
- **Presentation Component pattern:** Most components are purely presentational; state is co-located where needed (`Contact`, `SwiperC`).
- **No higher-order components (HOCs), render props, or compound components** are used.
- **Centralized variables file:** `variables.sass` holds color tokens and breakpoints, imported via `@use` where needed.

### Code Style & Formatting
- **ESLint** enforces React/recommended and Hooks/recommended rules.
- **No Prettier configuration** is present.
- **Quote style:** Mixed — JSX uses double quotes; some JS uses double quotes, others single quotes.
- **Indentation:** 2 spaces in JS/JSX; indentation in `.sass` files is inconsistent (2 or 4 spaces).

### Separation of Concerns
- **UI vs. Logic:** UI markup and local logic are tightly coupled inside each component file. There is no separate "services" or "utils" folder.
- **Styles:** Each major component imports its own `.sass` file, keeping styles component-scoped by convention rather than by CSS Modules.

### TypeScript
**Not applicable.** The project is written in plain JavaScript (JSX). Prop types are used in exactly one file: `SectionHeader.jsx` imports `prop-types` to validate `title` and `subtitle`.

### Custom Hooks
**None.** There are no custom hooks in the codebase.

### Utility Functions
**None.** No shared utility files exist.

### Constants & Enums
- **Hardcoded constants:**
  - EmailJS credentials in `Contact.jsx`.
  - Project metadata array in `SwiperC.jsx`.
  - Social media URLs repeated in both `Home.jsx` and `Foot.jsx`.

---

## 12. Third-Party Services & Integrations

| Service | Purpose | SDK / Client | Where Used |
|---------|---------|--------------|------------|
| **EmailJS** | Send contact-form emails without a backend. | `emailjs-com` (npm) | `src/components/Contact.jsx` |
| **Google Fonts** | Load `Source Sans Pro` typeface. | CDN `<link>` | `index.html` |
| **unpkg (Swiper)** | Load Swiper CSS and JS bundles. | CDN `<link>` / `<script>` | `index.html` |
| **jsDelivr (Bootstrap / Popper)** | Load Bootstrap JS and Popper.js for navbar collapse. | CDN `<script>` | `index.html` |

### Security Note
EmailJS credentials (`service_9qwd6o4`, `template_3vr527a`, `pPj9pQfa02Mc8xF2c`) are hardcoded in `Contact.jsx`. EmailJS public keys are generally safe to expose, but the service ID and template ID should ideally be stored in environment variables for cleanliness and rotation flexibility.

---

## 13. Testing

**Not applicable.** There are no tests, test scripts, or testing dependencies in this project.

- No `*.test.js`, `*.spec.js`, or `__tests__` folders exist.
- `package.json` does not include Jest, Vitest, Cypress, Playwright, or Testing Library.

### What Should Be Tested (Recommendation)
1. **Contact form validation:** Ensure empty fields trigger the error message.
2. **EmailJS integration:** Mock the SDK and assert it is called with the correct payload.
3. **SwiperC overlay:** Verify that clicking a slide opens the overlay with the correct project data.
4. **Navigation:** Verify that `HashLink` anchors map to the correct section IDs.
5. **Accessibility:** Automated a11y scans (axe-core) to catch missing labels and contrast issues.

---

## 14. Performance & Optimization

### Current Optimizations
- **Vite bundling:** Fast dev HMR and production tree-shaking out of the box.
- **Image assets:** Stored in `public/images/`; Vite copies them as static files without additional processing.
- **Lazy loading:** Not implemented.
- **Code splitting:** Not implemented — the entire app is bundled into a single JS and CSS file (`dist/assets/index-*.js`, `dist/assets/index-*.css`).

### SEO Setup
- **Very minimal.** `index.html` contains a static `<title>Denideni Mohammed</title>` and a viewport meta tag.
- No meta description, OpenGraph tags, Twitter cards, canonical URL, `robots.txt`, or sitemap.

### Bundle Analysis
- No explicit bundle analyzer is configured.
- Notable bundle contributors:
  - **MUI + Emotion** (~significant)
  - **Bootstrap + React-Bootstrap**
  - **Swiper**
  - **FontAwesome + MUI Icons** (two icon libraries shipped together)
- Opportunity: remove unused icon libraries (`@fortawesome/*`, `bootstrap-icons`) and dead code (`ClippedImage.jsx`) to reduce bundle size.

### SSR / SSG
**Not applicable.** The app is a client-side rendered SPA. There is no Next.js, no server-side rendering, and no static generation at build time beyond Vite’s default HTML injection.

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
- **Staging / Production:** No environment-specific configurations exist. The same build artifact is intended for all environments.

### CI/CD
**Not applicable.** No GitHub Actions, GitLab CI, or other pipeline configuration files are present.

### Docker
**Not applicable.** No `Dockerfile` or `docker-compose.yml` exists.

### Database Deployment
**Not applicable.**

---

## 16. Known Issues & Technical Debt

1. **Hardcoded EmailJS Credentials**
   - `service_9qwd6o4`, `template_3vr527a`, and the public key are baked into `Contact.jsx`. While public keys are meant to be exposed, keeping them in source makes rotation harder and clutters the component.

2. **No Success / Error UX for Contact Form**
   - After EmailJS resolves, there is no user-facing success message, toast, or redirect. Failures are only logged to the console.

3. **Unused Dependencies & Dead Code**
   - `ClippedImage.jsx` is never imported or rendered.
   - `@fortawesome/free-solid-svg-icons` and `@fortawesome/react-fontawesome` are installed but unused (MUI icons are used instead).
   - `bootstrap-icons` is installed but barely used.
   - `jquery` is only required as a peer dependency for Bootstrap JS; it is not directly invoked in application code.

4. **Accessibility Gaps**
   - Global `outline: none` removes keyboard focus indicators.
   - Hero image has an empty `alt=""` attribute.
   - No skip-to-main-content link.
   - Form error is not announced via ARIA live regions.

5. **Duplicate Social Links**
   - The same four social URLs are hardcoded in both `Home.jsx` and `Foot.jsx`. A single constants file or config object would improve maintainability.

6. **Missing Tests**
   - Zero test coverage. Form validation and overlay interactions are fragile to regressions.

7. **No SEO Metadata**
   - Missing description, OpenGraph, and structured data tags that are important for a portfolio’s discoverability.

8. **Sass Import Warnings**
   - `index.sass` uses `@use '../src/stylesheets/variables'` without a file extension or namespace alias, which can cause resolution issues depending on the Sass compiler version.

9. **Broken / Unreliable CDN URLs in `index.html`**
   - Some CDN links are wrapped in angle brackets (`<https://unpkg.com/swiper/swiper-bundle.min.css>`), which will produce invalid `href`/`src` values in the browser.

---

## 17. Glossary

| Term | Definition |
|------|------------|
| **AHP** | Analytic Hierarchy Process — a structured technique for organizing and analyzing complex decisions. Referenced in the "HAP" project. |
| **Bootstrap** | Popular CSS framework providing responsive grid, components, and utilities. |
| **EmailJS** | Third-party service that sends emails directly from client-side JavaScript without a server. |
| **HashLink** | A wrapper around React Router’s `Link` that supports smooth scrolling to anchor IDs (`#section`). |
| **MERN** | MongoDB, Express, React, Node.js — the stack the developer specializes in. |
| **MUI** | Material-UI; a React component library implementing Google’s Material Design. |
| **Pug.js** | Templating engine (formerly Jade) used in the "ToDo App" project. |
| **Sass** | CSS preprocessor; this project uses the indented `.sass` syntax (not SCSS). |
| **Swiper** | Modern touch slider library used for the project carousel. |
| **Vite** | Next-generation frontend tooling used for bundling and dev server. |

---

## 18. Quick Reference for AI Agents

**What this project does:** A personal portfolio SPA for Mohammed Denideni. It displays a hero intro, an about-me section with skills, a Swiper carousel of past projects (with an overlay detail modal), a contact form wired to EmailJS, and a footer with social links.

**Full tech stack in one list:** React 18, Vite 5, React Router DOM + HashLink, Bootstrap 5 + React-Bootstrap, MUI v6 + Emotion, Swiper 11, Sass (indented syntax), EmailJS, ESLint 9.

**Main folders:**
- `src/components/` — page sections (`Home`, `Aboutme`, `Project`, `Contact`, `Foot`), navbar (`NavBarP`), project slider (`SwiperC`), and `subComponents/SectionHeader.jsx`.
- `src/stylesheets/` — one `.sass` file per component plus `variables.sass`.
- `public/images/` — logo, mockups, and per-project screenshot folders (`calculator/`, `hap/`, `template1/`, `template2/`).
- `public/cv.pdf` — downloadable resume.
- `dist/` — Vite build output.

**Most important files to know:**
- `src/App.jsx` — root layout rendering all sections.
- `src/main.jsx` — mounts React inside `BrowserRouter`, imports Bootstrap CSS and global Sass.
- `src/components/SwiperC.jsx` — contains the entire projects dataset and the interactive coverflow slider with overlay modal.
- `src/components/Contact.jsx` — contact form + EmailJS integration (hardcoded keys).
- `src/stylesheets/variables.sass` — shared colors and breakpoints.
- `index.html` — HTML shell with CDN links (some have broken angle-bracket syntax).

**How to add a new feature:**
1. **New section:** Create a component in `src/components/`, add a corresponding `.sass` file in `src/stylesheets/`, import and render it inside `App.jsx` inside a `<div id="newSection">`, and add a `HashLink` in `NavBarP.jsx`.
2. **New project:** Edit the `projects` array inside `src/components/SwiperC.jsx`. Add mockup and screenshot images to `public/images/mockup/` and `public/images/screenshots/[project-slug]/`.
3. **New style token:** Add it to `src/stylesheets/variables.sass` and import via `@use './variables'` in the relevant Sass file.
4. **New dependency:** `npm install <package>`; if it’s a UI library, import it in the component. No backend or DB changes are ever needed.

**How to run locally:**
```bash
npm install
npm run dev
```

**Gotchas / non-obvious things:**
- There is no backend, no DB, and no tests.
- The app uses hash anchors (`/#aboutMe`) for navigation, not real routes.
- EmailJS credentials are hardcoded in `Contact.jsx` — move them to environment variables if refactoring.
- Several CDN URLs in `index.html` are malformed (wrapped in `<>`), which may break Swiper or Bootstrap JS in some browsers.
- `ClippedImage.jsx` is dead code (never imported).
- Two icon libraries are bundled but only MUI icons are actually used.
- The global Sass reset removes `outline: none`, harming keyboard accessibility.
