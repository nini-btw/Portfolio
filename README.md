# Mohammed Denideni — Portfolio

A personal portfolio website built as a single-page React application. It showcases projects, skills, and provides a contact form for potential employers and clients.

**Live Site:** (Add your deployed URL here)

## Overview

This is the personal portfolio of **Mohammed Denideni**, a Full-Stack Developer based in Oran, Algeria. The site presents a professional profile with:

- Hero introduction with animated profile photo
- About Me section with a facts card, animated skills marquee, animated stat counters, and a live GitHub contribution calendar
- Pinned-scroll project showcase — the section locks to the screen and cycles through one project per scroll, with case-study modals
- Contact form integrated with EmailJS
- Responsive design for all screen sizes

## Tech Stack

- **React 18** — UI library
- **Vite 5** — Build tool and dev server
- **React Router DOM** + **react-router-hash-link** — Hash-based smooth scrolling navigation
- **Bootstrap 5** + **React-Bootstrap** — Grid system and navbar components
- **MUI (Material-UI) v6** — Form inputs, buttons, and icons, with a custom `ThemeProvider` (`src/theme.js`) so MUI's rem-based sizing matches this project's `62.5%` root font-size
- **Framer Motion** — Reveal/stagger animations in the project showcase, modal enter/exit, and About Me (respects `prefers-reduced-motion`)
- **react-github-calendar** — GitHub contributions calendar in About Me
- **Sass** — Component-scoped styles (indented syntax)
- **EmailJS** — Client-side contact form delivery
- **Sanity CMS** — Headless CMS for project content (with local fallback)

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173/`).

### Build

```bash
npm run build
```

The production build is output to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the project root (see `.env.example` for the template):

| Variable | Purpose |
|----------|---------|
| `VITE_SANITY_PROJECT_ID` | Sanity project ID (optional — falls back to local data if missing) |
| `VITE_SANITY_DATASET` | Sanity dataset name (e.g., `production`) |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID for the contact form |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public API key |

> **Note:** Vite exposes all environment variables prefixed with `VITE_` to the client bundle. This is acceptable for public keys but avoid placing secrets here.

## Project Structure

```
src/
├── components/          # Page section components
│   ├── Home.jsx
│   ├── Aboutme.jsx
│   ├── Project.jsx           # thin pass-through to ProjectShowcase
│   ├── ProjectShowcase.jsx   # Pinned-scroll project section (owns id="project")
│   ├── ProjectPanel.jsx      # One absolutely-stacked panel per project
│   ├── ProjectModal.jsx      # Case-study detail modal (focus-trapped, animated)
│   ├── Contact.jsx
│   ├── Foot.jsx
│   ├── NavBarP.jsx
│   └── subComponents/
│       ├── SectionHeader.jsx
│       ├── TechBadge.jsx
│       ├── ProjectNavDots.jsx
│       ├── SkillsMarquee.jsx
│       ├── StatCounter.jsx
│       ├── StatsRow.jsx
│       ├── GithubContributions.jsx
│       ├── AboutFacts.jsx
│       └── CvButton.jsx
├── stylesheets/         # Sass styles (one per component), subStyle/ for subcomponents
├── hooks/
│   ├── useProjects.js     # Sanity/fallback data fetching
│   └── useScrollPin.js    # Pinned-scroll/snap tracking for the project showcase
├── lib/
│   └── sanityClient.js  # Sanity client setup
├── data/
│   ├── fallbackProjects.js
│   ├── skills.js
│   └── aboutStats.js
├── constants/
│   ├── social.js         # SOCIAL_LINKS + GITHUB_USERNAME
│   └── theme.js           # PRIMARY_COLOR/PRIMARY_HOVER for JS contexts
├── theme.js              # MUI ThemeProvider theme
├── App.jsx
├── main.jsx
└── index.sass           # Global styles
```

## Key Features

- **Sanity CMS Integration** — Projects are fetched dynamically from Sanity CMS. If Sanity is not configured, the site automatically falls back to a local dataset.
- **Pinned-Scroll Project Showcase** — The Project section locks to the screen (`position: sticky` inside a scroll-height wrapper sized to the project count) while scrolling cycles discretely through each project panel, driven by `useScrollPin.js`; only continues into the Contact section once you scroll past the last project.
- **Project Case-Study Modal** — Clicking a project's "Case study" CTA opens a focus-trapped, animated modal with screenshots, tech stack, role, duration, and problem statement.
- **About Me** — Facts card, CV button, animated skills marquee, animated stat counters, and a live GitHub contribution calendar (`react-github-calendar`) for the configured `GITHUB_USERNAME`.
- **Contact Form** — Validated form that sends emails directly via EmailJS without a backend.
- **Responsive Design** — Optimized for mobile, tablet, and desktop.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Notes

- The app uses hash-based navigation (`/#aboutMe`, `/#project`, etc.) for smooth scrolling between sections.
- Sanity Studio schema files are located in the `studio/` directory.
