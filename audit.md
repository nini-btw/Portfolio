# Senior UI/UX Portfolio Audit

**Stack confirmed:** React 18 + Vite SPA, Bootstrap 5/React-Bootstrap (grid/nav) + MUI v6 (forms/icons) + hand-written Sass, `html{font-size:62.5%}` rem system, breakpoints 576/768/992, Framer Motion, Swiper (lightbox), a scroll-jacked "pinned panel" project carousel (`useScrollPin`), CMS data via Sanity with local fallback. Tested live at 320/375/390/768/1024/1440/1920, with DOM/computed-style inspection backing every claim below (not visual guesses).

## Executive Summary

| Dimension | Score /100 |
|---|---|
| Overall UI | 74 |
| UX | 68 |
| Visual hierarchy | 76 |
| Layout | 70 |
| Spacing | 72 |
| Typography | 80 |
| Color/contrast | 75 |
| Responsive design | 65 |
| Accessibility | 66 |
| Consistency (design system) | 62 |
| Interactions/motion | 78 |
| Professional polish | 73 |
| **Overall** | **72** |

This is a competent, above-average developer portfolio with real engineering craft (semantic headings, reduced-motion handling, CMS+fallback architecture, a genuinely nice project lightbox). It is held back not by taste but by a handful of **verified, reproducible bugs** at mobile widths, two **measured WCAG contrast failures**, undersized touch targets, and a design system that defines tokens (spacing scale, z-index) but doesn't consistently use them. None of this requires a redesign — it's targeted fixes.

---

## Critical Problems

**1. Project nav-dots rail overlaps the project description text on mobile**
**Why it matters:** Confirmed via `getBoundingClientRect()` at both 320px and 375px, in the fully-settled (non-transient) scroll state: the `.project-nav-dots` rail (right:1.4rem) and `.project-panel__desc` paragraph physically overlap by **6.1px**. Description text visually collides with the "01/06" counter/dots column on every one of the 6 project panels.
**Affected:** `ProjectShowcase`/`ProjectPanel`, all mobile widths ≤ ~430px.
**Fix:** Either shrink `.project-panel` right padding's interaction with `.project-nav-dots` (give the panel content a `padding-right` that reserves the dots' width + gap on mobile), or move the dots rail below the content on narrow screens instead of floating right.
**Priority:** Critical

**2. Mobile menu, when open, visually covers the hero photo and eyebrow label**
**Why it matters:** `.navbar` is `fixed-top`. When the collapse expands, its box grows from ~91px to **334px tall**, but it's still `position:fixed` so the hero section never reflows to compensate. Measured: `.hero-photo` sits at `top:116px`, entirely inside the navbar's 0–334px occlusion zone → the profile photo and "FULL-STACK DEVELOPER" pill are **completely hidden behind the opaque menu** while it's open. Screenshot-verified.
**Affected:** `NavBarP` + `Home`, all widths < 992px (lg breakpoint where the hamburger is used).
**Fix:** Make the expanded `#navbarText` an overlay (`position:absolute`/`fixed` panel over a scrim) rather than in-flow content that silently sits on top of the hero without pushing it, or reduce menu height with `overflow-y:auto` + `max-height:calc(100vh - navbar-height)`.
**Priority:** Critical

**3. Two text patterns fail WCAG AA contrast (measured, not estimated)**
- `.about-facts__label` ("ROLE" / "EDUCATION" eyebrow text): `#999999` on white, 12px/400 → **2.85:1** (needs 4.5:1)
- `.skills-marquee__label` ("FRONTEND"/"BACKEND"/etc.): `#999999` on tint, 12px/700 → **2.70:1** (bold at 12px does not qualify as "large text," still needs 4.5:1)
**Why it matters:** Both fail WCAG 2.1 AA 1.4.3 for normal-weight/size text. Low-vision users cannot reliably read these labels.
**Fix:** Darken to at least `#6b6b6b` (already used elsewhere in the codebase, e.g. `.heading-sec__sub`, and passes at 5.06:1) or `#595959`.
**Priority:** Critical

---

## High-Priority Problems

**4. Touch targets below WCAG 2.5.8 minimum (24×24px)**
- `.hero-socials a` (GitHub/LinkedIn/Email icons in hero): **22×22px** — below the 24×24 AA minimum, well below the 44×44 comfort target.
- `.project-nav-dots__dot`: **10×10px** — badly fails, and it's an interactive control (click-to-jump navigation) on both desktop and mobile.
**Fix:** Keep the visual dot/icon size but pad the clickable hit area to ≥24px (ideally 44px) via padding or a pseudo-element, not by growing the visible glyph.
**Priority:** High

**5. Hero content is visually unbalanced at desktop/large-desktop widths**
**Why it matters:** Measured at 1920px: `.container` correctly caps at 1320px (Bootstrap, not a bug), but `.hero-inner` uses `justify-content:space-between` with a ~475px text column and a fixed 340px photo, leaving **~505px of dead empty space** between them — 38% of the container width. The layout doesn't feel "spacious," it feels unfinished/sparse, especially ≥1440px.
**Fix:** Either constrain `.hero-inner` to a centered max-width with a fixed gap (`gap: 8-10rem`, drop `space-between`), or give the text column `flex: 1` with a `max-width` cap so it grows proportionally instead of leaving a void.
**Priority:** High

**6. Scroll-snap transition briefly clips the "My Projects" heading under the fixed navbar**
**Why it matters:** During the `useScrollPin` auto-snap animation (triggered 120ms after scroll stops), an intermediate scroll position can render with `navBottom(90.6px) > headingTop(62.8px)`, clipping ~65% of the H2 letterforms behind the opaque navbar for a frame — reproducible, screenshot-captured. Settles correctly once the snap finishes, but it's visible mid-gesture, especially on a slower device.
**Fix:** Increase `.project-section` mobile `padding-top` clearance to account for the *tallest* navbar state reachable during transition, or clamp scroll-snap targets so intermediate frames never land inside the unsafe zone.
**Priority:** High

**7. Infinite skills marquee never reaches a readable resting state on touch devices**
**Why it matters:** `.marquee-track` animates continuously (26s loop) with no pause control besides `:hover`, which doesn't exist on touch. The `mask-image` fade permanently truncates the first/last ~8% of visible chips. Result: on mobile, a user can literally never read the full, complete list of skills at rest — confirmed in mobile screenshots showing chips like "edux Toolkit" and cut-off entries. This is decorative-first at the expense of the actual content (a skills list is information, not just texture).
**Fix:** Either pause on touch (`touchstart`) as well as hover, or drop the infinite marquee for a wrapped/static chip grid on mobile (`flex-wrap: wrap`) and keep the marquee only ≥768px.
**Priority:** High

---

## Medium Problems

**8. Design tokens defined but unused**
`variables.sass` defines `$space-1`–`$space-6`, but a repo-wide grep confirms **zero usages** outside the file that declares them — every component hardcodes raw rem values instead. The scale exists on paper only.
**Fix:** Either adopt the tokens going forward or remove them to stop implying a system that isn't enforced.
**Priority:** Medium

**9. Border-radius and shadow values are ad hoc, not a scale**
Radii used: `0.4rem, 0.6rem, 0.8rem, 1rem, 1.2rem, 1.6rem, 2rem`, plus raw px in three places (`5px`, `10px`, `2px` — breaking the rem-scaling that everything else relies on). Shadows: 13 distinct one-off `box-shadow` values, no shared elevation tiers (e.g. two different components independently reach for the exact same unusual `0 10px 100px rgba(0,0,0,0.1)` — clear copy-paste rather than a shared token).
**Fix:** Consolidate into ~4 radius steps and 3 shadow elevation tiers as Sass variables/CSS custom properties.
**Priority:** Medium

**10. Excessive stacked whitespace between About → Projects**
`.heading-sec__mb-med` margin-bottom is `9rem` (144px at default root), and `.project-section` adds another `10rem` top padding before its own heading — on top of `.aboutme`'s own bottom padding. In transition capture this produced a very tall, mostly-empty gap between the GitHub activity card and "My Projects." Even accounting for scroll-transition artifacts, the *resting* combined clearance (~230px+) before actual project content appears is generous to the point of feeling empty on first entry into the pinned section.
**Fix:** Reduce `.heading-sec__mb-med` to ~5–6rem, or tighten `.project-section`'s padding-top now that the header itself carries margin.
**Priority:** Medium

**11. About section column top-alignment is broken by Bootstrap's `align-items-center`**
The `<Row className="align-items-center">` in `Aboutme.jsx` vertically centers the shorter left column (facts card + CV button) against the taller right column (skills), so "My Skills" starts near the top of the section while the ROLE/EDUCATION card floats noticeably lower, misaligned with its counterpart's heading. Reads as unintentional rather than a deliberate asymmetric layout.
**Fix:** Change to `align-items-start` (or `align-items-stretch` with intentional vertical centering only within the shorter column).
**Priority:** Medium

**12. Social icon order is inconsistent between Contact and Footer**
Contact section: GitHub → LinkedIn → Twitter → Facebook. Footer: Facebook → Twitter → LinkedIn → GitHub (exact reverse). Minor, but it's the kind of inconsistency that separates "good" from "polished."
**Priority:** Medium

---

## Low Problems

**13.** Footer (`height: 7rem` fixed) has no responsive stacking rule; at ≤360px width the "Made with ❤️ by Mohammed Denideni" text wraps to two lines against a fixed-height row, getting visually tight against the social icons.
**14.** `cv-button.sass` uses `border-radius: 5px` (raw px, sharper/more corporate than the `0.8rem` used on the primary/secondary hero buttons it visually competes with) — three different-feeling CTA styles exist for a similar action (Download CV) across Hero and About.
**15.** (Subjective) The logo mark is a small, abstract squiggle at odds with the otherwise bold, confident, uppercase nav typography — it reads as unfinished/placeholder rather than a deliberate wordmark. Flagging as subjective since brand identity is a personal choice.

---

## Spacing Audit

| Issue | Location | Current | Recommended | Priority |
|---|---|---|---|---|
| Section header bottom margin very large | `.heading-sec__mb-med` | 9rem | 5–6rem | Medium |
| Stacked top clearance before project cards | `.project-section` padding-top + header margin | ~23rem combined (desktop) | ~14–16rem combined | Medium |
| Nav-dots collide with body copy | `.project-nav-dots` vs `.project-panel__desc` | 6.1px overlap | Add `padding-right: 4.5rem` to panel content on mobile | Critical |
| Hero text↔photo gap balloons at wide viewports | `.hero-inner` | ~505px empty at 1920px | Cap gap, don't `space-between` | High |
| About columns misaligned vertically | `Aboutme.jsx` Row | `align-items-center` | `align-items-start` | Medium |

## Layout Audit
- Bootstrap `.container` max-width (1320px) is correctly applied and centers content well at large desktop — **this part is fine**, the imbalance is inside the hero flexbox, not the container.
- The pinned-scroll project section is a strong, distinctive interaction on desktop but costs **6 × 100vh of scroll distance** just to browse projects — for 6 projects that's a lot of dedicated scroll real-estate before reaching Contact. Not "wrong," but worth being aware it's a deliberate UX tradeoff (immersive vs. quick-scan).
- No horizontal overflow at any tested width (320–1920) — clean.

## Typography Audit
- Heading hierarchy is **correct and semantic** end-to-end: H1 (hero) → H2 (About/Projects/Contact) → H3 (skills/project titles/"Get in touch") → H4 (GitHub Activity). No skipped levels. This is genuinely good, uncommon-for-portfolios discipline.
- Body text contrast (`.hero-sub` #555, `.heading-sec__sub` #6b6b6b) passes AA comfortably (7.08:1 / 5.06:1).
- The two `#999` "eyebrow" label instances are the only real typography-contrast failures (see Critical #3).
- Line-lengths are reasonable (`.hero-sub` max-width 46rem, `.contact-info__lead` etc.) — no runaway paragraph widths.

## Color & Contrast Audit
- Primary blue (`#0062b9`) on white text: **6.10:1**, passes comfortably everywhere it's used as a button fill.
- Tech badges (blue/gray tested; green/amber/pink not directly reachable in this pass but use similarly conservative dark-on-pastel pairings) pass AA with wide margin (9+:1).
- Failures are isolated to the two `#999` gray label instances (Critical #3) — not a systemic color problem, a localized one.

## Button & CTA Audit
- Primary vs secondary hierarchy (filled blue "Hire me" vs outlined "Download CV") is clear and consistent between Hero and the equivalent Contact "Send message" fill.
- Three different CTA visual treatments exist for essentially the same "get my CV" action (Hero secondary outline button, About's gradient `.cv-button` with shine effect, `0.8rem` vs `5px` radius) — inconsistent (Medium, #14).
- Mobile CTA rows (Hero) stack/wrap acceptably at all tested widths, no overlap.

## Responsive Audit
- **Mobile (320–430):** No horizontal overflow. Two confirmed bugs: nav-dots/description overlap (Critical), mobile menu hiding hero photo (Critical). Marquee legibility issue (High).
- **Tablet (768):** Column-reverse hero stacks cleanly; hamburger still shown (correct, breakpoint is `lg`/992). Vertical centering slightly top-heavy (Low-Medium, asymmetric top/bottom whitespace in the 100vh hero).
- **Desktop (1024–1440):** Clean, functional; project panels and lightbox tested and working.
- **Large desktop (1920):** Container correctly capped, but hero balance issue (High #5) is most visible here.

## Accessibility Audit
**What's already good:**
- Correct semantic heading order, no skips.
- All images have meaningful `alt` text.
- Form fields use real associated `<label>` elements (MUI), not placeholder-only patterns.
- Landmarks present and correctly scoped (`nav`, `main`, `footer`; the extra `<footer>` found is inside the third-party GitHub-calendar widget, not a real duplication).
- Global `*:focus-visible { outline: 2px solid primary }` — visible keyboard focus by default, not suppressed.
- `prefers-reduced-motion` is respected in multiple places (hero ring spin, scroll hint, CV button shine, skills marquee).
- Hamburger button has correct `aria-expanded`, `aria-controls`, `aria-label`.

**What needs fixing:**
- Two WCAG AA contrast failures (Critical #3).
- Touch targets under 24×24 minimum (High #4).
- Mobile menu hiding content behind itself is also an accessibility concern, not just visual (High #2/Critical #2) — content becomes unreachable/confusing for low-vision or motor-impaired users relying on visual landmarks.

## Design System Audit
- **Consistent:** primary color usage, typography family/scale, heading semantics, focus-visible treatment.
- **Inconsistent:** spacing (tokens defined, unused), border-radius (7+ distinct values, some raw px), box-shadow (13 one-off values, no elevation tiers), CTA button styling (3 different treatments for similar actions), social icon ordering between sections.
- **Recommend formalizing:** a 4-step radius scale, a 3-tier shadow scale, and actually wiring the existing `$space-*` tokens into components (or removing them).

## Page-by-Page Audit

### Home / Hero
**Good:** Clean typographic hierarchy, correct CTA priority, respects reduced motion, no overflow at any width.
**Problems:** Desktop/large-desktop imbalance (#5); mobile menu hides photo when open (#2); social icons under touch-target minimum (#4).
**Priority:** Critical (menu overlap) → High (balance, touch targets)

### About Me
**Good:** Correct H2→H3→H4 nesting, GitHub activity integration is a nice differentiator, stat counters clear.
**Problems:** Column top-misalignment (#11); marquee legibility on mobile (#7); `#999` label contrast fails (#3); large dead-space transition into Projects (#10).
**Priority:** Critical (contrast) → High (marquee) → Medium (alignment, spacing)

### Projects
**Good:** Distinctive pinned-scroll interaction, clean per-panel layout, nav dots + counter give orientation, lightbox (recently added) is genuinely well-executed — full-screen, uncropped, responsive, keyboard/zoom support.
**Problems:** Nav-dots/description overlap on mobile (#1, Critical); transient heading clip during snap (#6).
**Priority:** Critical

### Contact
**Good:** Clean two-panel card, strong color contrast on the blue panel, proper MUI-labeled fields, sensible validation and success state.
**Problems:** None critical found; minor icon-order inconsistency vs. footer (#12).
**Priority:** Low

### Footer
**Good:** Simple, unobtrusive, hover states defined for each brand color.
**Problems:** Fixed height doesn't accommodate two-line wrap at very narrow widths (#13); icon order mismatch with Contact (#12).
**Priority:** Low

---

## Prioritized Improvement Plan

### Phase 1 — Critical Fixes
1. Fix nav-dots/description text overlap on mobile (#1)
2. Fix mobile menu hiding hero content (#2)
3. Fix the two WCAG contrast failures (#3)

### Phase 2 — UI/UX Improvements
4. Enlarge touch targets for hero socials + nav dots (#4)
5. Rebalance hero layout at desktop/large-desktop (#5)
6. Fix transient heading clip during scroll-snap (#6)
7. Fix marquee legibility on touch devices (#7)

### Phase 3 — Visual Polish
8. Consolidate border-radius into a scale; fix raw-px outliers (#9)
9. Consolidate box-shadow into elevation tiers (#9)
10. Tighten About→Projects whitespace (#10)
11. Fix About column top-alignment (#11)
12. Unify social icon ordering (#12)

### Phase 4 — Final Polish
13. Footer responsive wrap handling (#13)
14. Unify the three CV-button treatments (#14)
15. Either wire up or remove unused `$space-*` tokens (#8)
16. (Subjective, optional) Revisit the logo mark

---

Everything above was verified against the running app — measured element geometry, computed contrast ratios, and screenshots at 320/375/390/768/1024/1440/1920 — not inferred from source alone. No code was changed in this pass.
