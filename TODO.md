# TODO

Tracked action items. The UI/UX items below come from `UI_UX_ANALYSIS.md` — see that doc for full detail, reasoning, and file:line references on each.

## 🔴 Fix first (small, high-impact)

- [x] **Fix the Contact/Home oversized-section bug**: removed the redundant `<div id="home">`/`<div id="contact">` wrappers in `App.jsx` and dropped `#home`/`#contact` from the legacy selector in `index.sass`.
- [x] Replace placeholder social links in `src/constants/social.js` (LinkedIn + email now real; Facebook/Twitter added).
- [x] Reconcile Facebook/Twitter links into `SOCIAL_LINKS` — `Foot.jsx` and `Contact.jsx` now reference them instead of hardcoding.
- [x] Fix `navS.sass` typo/dead CSS: `inline-blockho` typo, duplicate `position: absolute`, dead `top: 1rem` override, non-matching `.navbar-toggler` selector.
- [x] Make `aria-current` on nav links reflect actual scroll position (`NavBarP.jsx` now uses an IntersectionObserver-driven active section).
- [x] Move `SectionHeader`'s subtitle out of the `<h2>` into a sibling `<p>`.
- [x] Add `scroll-padding-top` compensation below 768px (`index.sass`, now `6rem` below the `8rem` desktop value).

## 🟡 Worth investing in (structural)

- [x] Add a spacing scale (`$space-1..$space-6`) and neutral/status color tokens to `variables.sass`; migrated the five near-duplicate background grays and the inconsistent success/error colors onto them.
- [x] Remove the dead `$primary-color: #1248c6` in `navS.sass`; migrated remaining hardcoded `#0062b9`/`#004f96` literals (sass files + `Contact.jsx` inline `sx` + `GithubContributions.jsx`) onto shared tokens (`variables.$primary-color` / new `src/constants/theme.js` for JS).
- [x] Add a focus trap + focus-return to the project modal, and give it an entrance/exit animation (`ProjectModal.jsx` + `AnimatePresence` in `ProjectShowcase.jsx`).
- [x] Extend `prefers-reduced-motion` handling to hero ring spin, scroll-hint pulse, `StatCounter` count-up, and `ProjectPanel` stagger reveal.
- [ ] Pick one container/gutter convention and apply it consistently across Home/Aboutme/Project/Contact/Footer — **deferred**, visual-risk restructuring, left for a deliberate follow-up pass rather than a blind edit.
- [x] Load `Source Sans Pro` for real (via `@fontsource/source-sans-pro`) instead of the dead declaration.
- [x] Reconcile stray unused `.c { color: #fff }` in `index.sass`; removed redundant `href="#"` on `HashLink`s in `NavBarP.jsx`.
- [x] Investigate the triple-guarded `overflow-x: hidden` — removed the redundant `#root` guard; kept `html`'s (base guard) and `.aboutme`'s (justified by Bootstrap `Row` negative margins).
- [x] Fix contrast on small gray text (`#888`/`#777` → `#6b6b6b`) and the contact panel's lead text (`rgba(255,255,255,0.75)` → `0.88`).
- [ ] Reconcile the three incompatible two-column layout strategies (Home hero / ProjectPanel / Contact card) — **deferred**, same reasoning as the container item above.
- [x] Make responsive gap shrinkage consistent (Home hero fixed to halve 6→3rem; Contact form row / modal screenshots / modal features now shrink gap on stack too).
- [x] Move the off-token Contact breakpoint (900px → `$breakpoint-lg`) and converted hardcoded 576/768/992 literals across stylesheets to `variables.$breakpoint-*`.
- [x] Add a z-index scale (`$z-nav` / `$z-fab` / `$z-modal`) and apply it to navbar/mobile-download-button/modal backdrop.

## 🟢 Content/data gaps

- [ ] Populate `liveUrl`/`githubUrl`/`outcome` in `src/data/fallbackProjects.js` — **deferred**, needs real project details from you.
- [x] Make the "Projects Shipped" stat reflect live project count — `StatsRow.jsx` now calls `useProjects()` directly, falling back to the static count while loading/on error.

## Other

- [x] Footer social-icon hover scale — removed the oversized baseline `scale(2)`, hover now `scale(1.15)`, in line with the rest of the site's hover language.
- [x] ~~Visually verify scroll-snap "stickiness"~~ — superseded: the Project section was rebuilt from CSS scroll-snap to a JS-driven pinned-scroll interaction (see below) per direct user feedback that the old behavior "wasn't like I want."

## Follow-up requests (post-audit, direct user feedback)

- [x] **Aboutme layout bug**: left column (facts/CV button) not rendering, scrollbar flashing on load, content getting cut short, GitHub calendar cropped. Root cause: `#aboutMe`/`.aboutme` had the same doubled `min-height:100vh` + flex-centering pattern fixed on Home/Contact, plus a flex-centered wrapper (`d-flex justify-content-center`) around `<Row>` breaking Bootstrap's grid width math, plus the GitHub calendar's `overflow-x:auto` + `justify-content:center` combo clipping both edges. All three fixed.
- [x] About Me facts: role changed to "Full Stack Developer", Location and "Open to work" status removed (`AboutFacts.jsx`, plus dead CSS cleanup).
- [x] Added Jest to `skills.js` (testing category).
- [x] Moved "Years Coding+" stat from About's `StatsRow` to Contact, then removed it from Contact entirely per follow-up request — currently not shown anywhere on the site.
- [x] Fixed Contact section text sizing: added a proper MUI `ThemeProvider` (`src/theme.js`, `typography.htmlFontSize: 10`) — MUI was rendering all its text (`TextField`/`Button`) at ~62.5% of intended size against this project's `62.5%` root font-size, most visible in the Contact form. Also normalized internal spacing in `.contact-info`.
- [x] **Project section rebuilt as a pinned-scroll interaction** (`ProjectShowcase.jsx`, new `useScrollPin.js` hook): the section now locks to the screen via `position: sticky` while scrolling cycles through panels, replacing the old internal CSS-scroll-snap track. `useActiveIndex.js` and `projectS.sass` removed (superseded).
- [x] Fixed the project-number watermark: was rendering fully visible for every panel simultaneously (stacking bug from the pin rework — it lived outside the `isActive`-gated motion wrapper); now opacity-gated by `.is-active`, reformatted from `01`/`02` to plain `1`/`2`, and repositioned to the left edge instead of dead-center so it's not hidden behind the project image.
- [x] Project panel image cropping: switched from `object-fit: cover` to `object-fit: contain` (desktop and mobile) so the full uploaded image always shows, never cropped; widened the desktop image column (`1fr 1fr` → `1fr 1.35fr`); increased mobile gap between text/image and the mobile image container's height; made the mobile image container's letterbox background transparent so the watermark number shows through its empty margins.

---

Verified after this pass: `npm run build` and `npm run lint` both pass cleanly.
