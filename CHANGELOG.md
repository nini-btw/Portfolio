# Changelog

All notable changes to this project are tracked here. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); dates are `YYYY-MM-DD`.

## [Unreleased]

### Fixed
- **Nav links didn't scroll — silently ate the click instead.** Root cause:
  the `HashLink`s in `NavBarP.jsx` carried `data-bs-toggle="collapse"
  data-bs-target="#navbarText"` (presumably meant to auto-close the mobile
  menu on link click), but Bootstrap's JS is loaded globally via `<script>`
  tags in `index.html`, and its collapse data-api attaches a native click
  listener that calls `preventDefault()` on *any* element carrying that
  attribute — at any viewport width, not just mobile. That silently killed
  `HashLink`'s own click handling before it could scroll, while still
  toggling the (always-visible-on-desktop) collapse's `.show` class, which
  is exactly the "starts an animation on the navbar but nothing happens"
  symptom. Confirmed by instrumenting `window.scrollTo`/`scrollIntoView`
  (neither was ever called) and by stripping the `data-bs-*` attributes
  live, which fixed it immediately. Fix: removed those attributes from the
  links and close the mobile menu instead via Bootstrap's own JS API
  (`window.bootstrap.Collapse`) from a plain `onClick`, which — unlike the
  data-api — doesn't touch `preventDefault`, so `HashLink`'s scroll logic
  runs normally. Verified on both desktop (link click scrolls, no
  spurious collapse animation) and mobile (link click scrolls **and**
  closes the open menu).

### Changed
- Navbar logo (audit finding #15) rebuilt as a hand-authored SVG
  (`public/images/logo.svg`) replacing the old raster `logo.png`, this time
  vector-traced against the actual pixel geometry of the original mark
  (its bounding box, stroke width, and vertex coordinates extracted with a
  small one-off `pngjs` script, not eyeballed or reinterpreted) rather than
  redesigned — same "D" arch over the zigzag "M", same proportions, same
  bar widths, confirmed via a side-by-side render against the original PNG
  before being wired in. Fixes the same underlying problem the raster
  version had (thin strokes blurring into an ambiguous mark at the ~44-54px
  navbar display size) without changing the mark itself. Verified at both
  desktop and mobile navbar sizes. Old `logo.png` removed (recoverable from
  git history); `PROJECT_DOCUMENTATION.md`'s file-tree reference updated.
  (Note: an earlier attempt in this same window redrew the mark from a
  generic D/M letterform interpretation instead of tracing the actual file
  — reverted after feedback that it didn't match the original design.)

---

## [1.2.0] - 2026-08-30

### Added
- `ImageLightbox` (`src/components/ImageLightbox.jsx`, `imageLightboxS.sass`,
  new `swiper` dependency) — full-screen, white-background gallery opened
  from either the main project thumbnail (`ProjectPanel`) or any screenshot
  inside the case-study modal (`ProjectModal`), landing on the exact image
  clicked. Supports arrow navigation, pinch/double-tap zoom, keyboard, and a
  fraction counter (`1/6`). On mobile the prev/next arrows sit centered
  under the image — not pinned to the left/right screen edges — with the
  counter positioned just below them, both in easy thumb reach.
- `audit.md` — full UI/UX audit (layout, spacing, typography, color/contrast,
  buttons, responsive behavior, accessibility, motion, design-system
  consistency) covering the whole site at 320–1920px. 15 numbered findings,
  each independently reproduced and measured against the live app (computed
  styles, `getBoundingClientRect()`, WCAG contrast math) rather than judged
  from source alone, plus a prioritized fix plan (Critical → Low).
- `ui-ux-audit-screenshots/` (before) and `ui-ux-audit-screenshots/after/` —
  real-browser Playwright evidence for all 15 findings, one screenshot per
  finding (two each for the paired mobile-width and Contact/Footer-order
  findings), before and after the fixes below.
- Shared design tokens in `variables.sass`: `$radius-sm`/`$radius-md`/
  `$radius-lg`/`$radius-pill` and `$shadow-sm`/`$shadow-md`/`$shadow-lg`.

### Fixed
All items below are from `audit.md`; each was re-verified live post-fix
(measured geometry and/or a fresh screenshot), not just visually eyeballed.
- **`.project-nav-dots` overlapping project description text on mobile**
  (measured 6.1px overlap at 320/375px) — `.project-panel__info` now reserves
  right padding for the dots rail below the `md` breakpoint.
- **Mobile nav menu silently hiding the hero photo/eyebrow behind itself** —
  the expanded `#navbarText` was growing `.navbar`'s own fixed box in normal
  flow, so page content never reflowed and just sat, partially exposed,
  underneath it. Rebuilt as a proper fixed, full-viewport overlay panel below
  the toggler row, with the toggler and logo lifted above it via z-index so
  the close button and brand mark stay usable while it's open.
- **WCAG AA contrast failures**: `.about-facts__label` and
  `.skills-marquee__label` were `#999` on white/tint (2.7–2.85:1, fails the
  4.5:1 minimum for normal text) — both changed to `#6b6b6b` (5.33:1),
  matching the value already used and passing elsewhere in the codebase.
- **Touch targets under the WCAG 2.5.8 24×24px minimum**: `.hero-socials a`
  was 22×22px (padded to 36×36, icon's own rendered size unchanged) and
  `.project-nav-dots__dot` was 10×10px (restructured so the button's hit area
  is 24×24px while the painted dot stays visually small via a `::before`).
- **Hero content reading as unbalanced/sparse at desktop widths** — measured
  ~505px of dead space between the text column and photo at 1920px
  (`.hero-inner` used `justify-content: space-between` with no cap on the
  container). Changed to `justify-content: center` with a `clamp()`-bounded
  gap so the pair reads as one balanced group at any width.
- **Fixed navbar transiently clipping the "My Projects" heading** while the
  pinned project section engages `position: sticky` mid-scroll (measured up
  to 28px of overlap at specific scroll offsets, not just a resting-state
  issue). Two-part fix: `useScrollPin`'s idle auto-correction now snaps
  `behavior: 'instant'` instead of `'smooth'` (a smooth re-scroll firing
  after the user has already stopped scrolling was the actual mechanism
  leaving the clipped frame on screen for hundreds of ms), plus
  `.project-section`'s mobile `padding-top` recalculated from a direct
  measurement (heading's on-screen top equals padding-top exactly once
  stuck, with no other offset) to `12rem` — re-scanning the entire transition
  range afterward confirmed zero remaining overlap at any scroll offset.
- **Skills marquee unreadable on touch devices** — the infinite-loop
  animation never stops without a `:hover`, which doesn't exist on touch,
  and the edge mask permanently truncated the first/last visible chip.
  Below the `md` breakpoint it's now a static, fully-readable wrapped chip
  grid (animation, mask, and the loop's duplicate chip set all disabled via
  a new `marquee-chip--dup` class); the desktop/tablet marquee is unchanged.
- **Excessive whitespace between About and Projects** —
  `.heading-sec__mb-med` margin-bottom cut from `9rem` to `5.5rem` (kept
  independent of the padding-top change above: margin-bottom controls the
  gap *after* the heading, padding-top controls clip-safety *before* it, so
  the two fixes don't fight each other).
- **About section's two columns starting at different vertical positions** —
  `Aboutme.jsx`'s `Row` changed from `align-items-center` to
  `align-items-start`.
- **Inconsistent social-icon order** between the Contact panel (GitHub,
  LinkedIn, Twitter, Facebook) and the footer (was Facebook, Twitter,
  LinkedIn, GitHub — the exact reverse) — footer reordered to match.
- **Footer text wrapping awkwardly against the icons below ~360px** — added
  a stacked (`flex-direction: column`, centered) layout below
  `$breakpoint-sm`.

### Changed
- `cvButton.sass` (`5px`) and `githubContributions.sass` (`10px`) raw-px
  border-radii moved onto the new `$radius-sm`/`$radius-md` tokens.
- `navS.sass`: two byte-for-byte identical `box-shadow: 0 10px 100px
  rgba(0,0,0,0.1)` declarations (`.navbar`, the `.dl` mobile CV button)
  consolidated onto `$shadow-md`.

### Removed
- Unused `$space-1`..`$space-6` spacing tokens from `variables.sass`
  (confirmed zero usages anywhere else in the repo).

### Deferred
- **Logo mark** (audit finding #15) — flagged as subjective/branding in the
  audit; left untouched pending the user's direction rather than assuming a
  redesign.
- Noticed but out of scope: `react-router-hash-link` nav clicks don't
  trigger a scroll under Playwright's simulated clicks — reproduced
  identically on untouched desktop nav links, unrelated to any fix above,
  not one of the 15 audited findings.

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
