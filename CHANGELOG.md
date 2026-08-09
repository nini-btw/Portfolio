# Changelog

All notable changes to this project are tracked here. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); dates are `YYYY-MM-DD`.

## [Unreleased]

Nothing yet.

---

## [1.1.0] - 2026-08-09

### Added
- `ProjectShowcase` + `ProjectPanel`: project presentation redesign replacing
  the filterable `ProjectGrid`, going through two iterations:
  1. Initial version: full-viewport, CSS scroll-snapped project track (one
     project per screen), active panel tracked via an `IntersectionObserver`
     (`useActiveIndex`).
  2. **Rebuilt as a pinned-scroll interaction** (`useScrollPin.js`) after
     feedback that the scroll-snap version wasn't behaving as wanted: the
     Project section now locks to the screen (`position: sticky` inside a
     `panelCount * 100vh` wrapper) while scrolling cycles discretely through
     panels — stacked via `position: absolute`, cross-faded via
     `framer-motion`, snapping to the nearest panel once scrolling settles —
     and only continues into Contact once you scroll past the last panel.
     `useActiveIndex.js` and `projectS.sass` removed as part of this rework.
- `ProjectNavDots`: fixed vertical nav rail that highlights the active panel
  and jumps to a panel on click (now via `useScrollPin`'s `scrollToIndex`).
- `TechBadge`: colored pill for tech-stack items.
- About Me additions: `AboutFacts`, `CvButton`, `SkillsMarquee` (pure-CSS
  marquee, `src/data/skills.js`, now includes Jest), `StatsRow`/`StatCounter`
  (animated count-ups, `src/data/aboutStats.js`), `GithubContributions` (via
  new `react-github-calendar` dependency, keyed off `GITHUB_USERNAME` in
  `src/constants/social.js`).
- `src/theme.js` — MUI `ThemeProvider` theme, applied in `main.jsx`.
- `src/constants/theme.js` — `PRIMARY_COLOR`/`PRIMARY_HOVER` JS constants
  mirroring `variables.sass`, for the handful of places (MUI `sx`, GitHub
  calendar theme array) that can't reach Sass variables.
- `src/hooks/useScrollPin.js` — pinned-section scroll/snap tracking hook.
- Design tokens in `variables.sass`: a `$space-1..$space-6` spacing scale, a
  `$z-nav`/`$z-fab`/`$z-modal` z-index scale, `$surface-tint` (replacing five
  near-duplicate off-white backgrounds), and `$success-*`/`$error-*` status
  colors (replacing inconsistent one-off values).
- `CHANGELOG.md`, `TODO.md`, `UI_UX_ANALYSIS.md` (this session's audit +
  tracking docs).
- Real self-hosted `Source Sans Pro` via `@fontsource/source-sans-pro`
  (previously declared in CSS but never actually loaded).

### Changed
- `Aboutme.jsx` and `Project.jsx` restructured to compose the new
  subcomponents above; `Project.jsx` is now a thin pass-through to
  `ProjectShowcase.jsx`, which owns `<section id="project">` directly.
- `ProjectModal.jsx`: focus trap + focus-return added, enter/exit animated
  via `framer-motion` `AnimatePresence` (was instant show/hide).
- `App.jsx`: removed redundant `<div id="home">`/`<div id="contact">`
  wrappers — `Home`/`Contact` already render their own `<section id="...">`,
  and the duplicate ids were colliding with a legacy CSS rule that stacked
  two `min-height: 100vh` boxes, causing the Contact section to render at
  roughly 2× its intended height.
- `Aboutme`/`.aboutme`: same doubled-`min-height` pattern fixed there too,
  plus a flex-centered wrapper around the `Row` that was breaking Bootstrap's
  grid width math (causing the left facts/CV-button column to not render
  correctly) — replaced with a `w-100` `Row`.
- `NavBarP.jsx`: `aria-current="page"` now reflects real scroll position via
  an internal `IntersectionObserver`, instead of being hardcoded on all
  links; redundant `href="#"` removed from `HashLink`s.
- `SectionHeader.jsx`: subtitle moved out of the `<h2>` into a sibling `<p>`.
- `AboutFacts.jsx`: role changed to "Full Stack Developer"; Location and the
  "Open to work" status row removed.
- `StatsRow.jsx`: "Years Coding+" removed (now shows Projects Shipped +
  Technologies only); "Projects Shipped" now reflects the live project count
  from `useProjects()` instead of a hardcoded fallback-array length.
- `GithubContributions`: fixed the contribution calendar being cropped on
  both edges — `overflow-x: auto` + `justify-content: center` together start
  the scroll position mid-content; changed to `flex-start`.
- Project panel images: `object-fit` switched from `cover` to `contain`
  (desktop and mobile) so uploaded images are never cropped; desktop image
  column widened (`1fr 1fr` → `1fr 1.35fr`); mobile image container made
  taller with a larger gap from the text column, and its opaque letterbox
  background made transparent so the project-number watermark shows through.
- Project panel watermark number: reformatted from zero-padded `01`/`02` to
  plain `1`/`2`, repositioned from dead-center to the left edge, and fixed a
  stacking bug (introduced by the pin rework) where every panel's watermark
  rendered simultaneously on top of each other since it lived outside the
  `isActive`-gated motion wrapper.
- `Contact.jsx`: fixed MUI text (`TextField`/`Button`) rendering at ~62.5% of
  its intended size — the app had no MUI `ThemeProvider`, so MUI's rem-based
  sizing assumed a 16px root against this project's actual `62.5%` (10px)
  root; fixed via `src/theme.js`'s `typography.htmlFontSize: 10`. Also
  tightened `.contact-info`'s internal spacing.
- `src/constants/social.js`: real LinkedIn URL and email address; `facebook`/
  `twitter` promoted from hardcoded literals in `Foot.jsx`/`Contact.jsx` into
  `SOCIAL_LINKS` as the single source of truth.
- `navS.sass`: fixed dead/broken CSS — `inline-blockho` typo, duplicate
  `position: absolute`, a dead overridden `top: 1rem`, and a `.navbar-toggler`
  selector that likely never matched Bootstrap's actual markup.
- Extended `prefers-reduced-motion` handling to the hero photo ring spin,
  scroll-hint pulse, About Me stat count-up, and project panel stagger
  reveal (previously only the skills marquee and CV button respected it).
- Footer social-icon hover scale reduced from a `scale(2)`→`scale(2.3)`
  baseline (a clear outlier) to `scale(1)`→`scale(1.15)`, matching the rest
  of the site's hover language.
- Small gray text contrast improved (`#888`/`#777` → `#6b6b6b`) and the
  Contact info panel's lead paragraph opacity raised (`0.75` → `0.88`).
- Hardcoded `576`/`768`/`992` breakpoint literals across most stylesheets
  converted to `variables.$breakpoint-*`; the Contact card's off-token
  `900px` breakpoint moved to `$breakpoint-lg` (992px).
- `PROJECT_DOCUMENTATION.md` and `README.md` fully updated to describe the
  pinned-scroll architecture, the MUI theme fix, new component/data/hook
  inventory, and current dependency table.

### Removed
- `ProjectGrid.jsx` and `src/stylesheets/projectGridS.sass` (superseded by
  `ProjectShowcase`/`ProjectPanel`).
- `useActiveIndex.js` and `projectS.sass` (superseded by the pinned-scroll
  rework — see Added).
- Unused dependencies: `@fortawesome/free-solid-svg-icons`,
  `@fortawesome/react-fontawesome`, `bootstrap-icons`, `swiper`.
- Dead CSS: unused `$primary-color: #1248c6` in `navS.sass`, stray
  `.c { color: #fff }` in `index.sass`, redundant `#root` `overflow-x`
  guard, now-unused `.project-panel__index` badge (superseded by the
  repositioned watermark number).

### Known issues carried forward
- `index.html` still loads `Source Sans Pro` from the Google Fonts CDN in
  addition to the new self-hosted `@fontsource` import — redundant, not yet
  cleaned up.
- Fallback projects (`src/data/fallbackProjects.js`) still have empty
  `liveUrl`/`githubUrl`/`outcome` for all 5 entries.
- Container/gutter convention and the three different two-column layout
  strategies (Home hero / ProjectPanel / Contact card) intentionally left
  unconsolidated — flagged as visual-risk changes needing a design decision,
  not a mechanical fix.

---

## Prior history (from git log, pre-changelog)

- `f20430c` feat: change the project modal ui
- `40d6695` feat: connect the app with sanity
- `7fa777e` docs: update the project documentation
- `d784244` feat: change the hero section and project section
- `beccda6` adding cv
