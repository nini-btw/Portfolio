# Mohammed Denideni — Portfolio

A personal portfolio website built as a single-page React application. It showcases projects, skills, and provides a contact form for potential employers and clients.

**Live Site:** (Add your deployed URL here)

## Overview

This is the personal portfolio of **Mohammed Denideni**, a Full-Stack Developer based in Oran, Algeria. The site presents a professional profile with:

- Hero introduction with animated profile photo
- About Me section with skills breakdown
- Filterable project grid with case-study modals
- Contact form integrated with EmailJS
- Responsive design for all screen sizes

## Tech Stack

- **React 18** — UI library
- **Vite 5** — Build tool and dev server
- **React Router DOM** + **react-router-hash-link** — Hash-based smooth scrolling navigation
- **Bootstrap 5** + **React-Bootstrap** — Grid system and navbar components
- **MUI (Material-UI) v6** — Form inputs, buttons, and icons
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
│   ├── Project.jsx
│   ├── Contact.jsx
│   ├── Foot.jsx
│   ├── NavBarP.jsx
│   ├── ProjectGrid.jsx
│   ├── ProjectModal.jsx
│   └── subComponents/
│       └── SectionHeader.jsx
├── stylesheets/         # Sass styles (one per component)
├── hooks/
│   └── useProjects.js   # Sanity/fallback data fetching
├── lib/
│   └── sanityClient.js  # Sanity client setup
├── data/
│   └── fallbackProjects.js
├── constants/
│   └── social.js
├── App.jsx
├── main.jsx
└── index.sass           # Global styles
```

## Key Features

- **Sanity CMS Integration** — Projects are fetched dynamically from Sanity CMS. If Sanity is not configured, the site automatically falls back to a local dataset.
- **Filterable Project Grid** — Projects can be filtered by category: All, Full-Stack, Frontend, Tool, Backend.
- **Project Case-Study Modal** — Clicking a project card opens a detailed modal with screenshots, tech stack, role, duration, and problem statement.
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
- Unused dependencies (`@fortawesome/*`, `bootstrap-icons`, `swiper`) are still listed in `package.json` but not imported in source. They can be safely removed if desired.
- Sanity Studio schema files are located in the `studio/` directory.
