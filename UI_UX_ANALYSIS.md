# UI/UX Analysis

> **Status:** this is a point-in-time snapshot from when it was written. Most items below (including the Contact sizing bug, Aboutme layout, and a full rebuild of the Project section's scroll interaction) have since been addressed — see `TODO.md` for the current checklist and `CHANGELOG.md` for what shipped. Left as-is rather than rewritten, since it's still an accurate record of *why* each fix was made.

A focused audit of the portfolio's interface and user experience — visual design, layout/spacing, interaction, responsiveness, and accessibility. This is not a code-architecture review (see `PROJECT_DOCUMENTATION.md` for that); every finding here is something a user would see or feel, traced back to the exact file/line causing it.

The site is a single-page, hash-anchored React SPA (`Home` → `Aboutme` → `Project` → `Contact` → `Foot`), styled with a hybrid of Bootstrap 5, MUI, and hand-written indented Sass. That hybrid is a deliberate architectural choice (see `CLAUDE.md`) — this doc evaluates how well it holds together visually, not whether it should exist.

---

## 🔴 The one bug worth fixing first

**The Contact section is roughly twice as tall as it should be, and it's not a design choice — it's a nesting mistake.**

`App.jsx` wraps `Home` and `Contact` in extra divs:

```jsx
<div id="home"><Home /></div>
<div id="contact"><Contact /></div>
```

But both components already render their own section with the *same id* (`Home.jsx:10` → `<section id="home">`, `Contact.jsx:63` → `<section id="contact">`). That's a duplicate DOM id — invalid HTML — and it's not cosmetic: a legacy rule still sitting in `src/index.sass:61-69` matches it:

```sass
#home, #aboutMe, #contact
  padding: 3rem 0 5rem 0
  min-height: 100vh
  text-align: center
  ...
```

So the **outer wrapper** div gets `min-height: 100vh` + `padding: 3rem 0 5rem 0`, and **inside it**, `.contact-section` (Contact's own root, `contactS.sass:1-4`) independently sets its *own second* `min-height: 100vh` + `padding: 8rem 0 10rem`. A box that must be at least one full viewport tall, nested inside another box that must *also* be at least one full viewport tall, forces the outer box to stretch to fit both — the rendered section ends up needing roughly **2×100vh** of vertical space before the contact card's actual content is even added, plus **11rem (~110px)** of stacked top padding and **15rem (~150px)** of stacked bottom padding (5rem/7rem + 8rem/10rem at ≤768px, `contactS.sass:10-11`).

This is almost certainly why the section feels disproportionately large and empty compared to everything else on the page.

**Same bug, smaller symptom, on Home**: its real top padding is ~13rem (3rem leaked + 10rem own), not the 10rem visible in `homeS.sass:6`, and it inherits `text-align: center` from the same leaked rule with nothing resetting it back to left — so `.hero-heading`/`.hero-sub`/`.hero-label` (`homeS.sass:35-68`) may render center-aligned at desktop widths even though the flex layout (`justify-content: space-between`) implies a left-aligned text column. Same risk applies to `.contact-info__lead` (`contactS.sass:53-57`), which has no `text-align` of its own either.

**Fix** (pick one): remove the redundant `<div id="home">`/`<div id="contact">` wrappers in `App.jsx` (the components already own those ids), *or* drop `#home`/`#contact` from the selector in `index.sass:61` and fold whatever it was still providing into `homeS.sass`/`contactS.sass` directly. `#aboutMe` is a softer case — `Aboutme`'s root has no explicit id of its own (the id lives only on the wrapper), so that one isn't duplicated, but it's still inheriting `min-height`, padding, and center-alignment from the same legacy rule, worth checking visually.

---

## 1. Visual Design System

**Tokens are minimal.** `src/stylesheets/variables.sass` defines exactly two things: `$primary-color: #0062b9` and three breakpoints (576/768/992px). There is no spacing scale, no gray scale, no z-index scale, no shared container width — every other value in the codebase is a hardcoded literal chosen per file.

**Color:**
- The primary blue is reused correctly via `variables.$primary-color` in newer files (`projectShowcaseS.sass`, `skillsMarquee.sass`, `statsRow.sass`, `githubContributions.sass`, `aboutFacts.sass`, `cvButton.sass`) but hardcoded as a raw `#0062b9` literal in older ones (`projectModalS.sass`, `contactS.sass`, `homeS.sass`, `index.sass:50`, and inline via MUI `sx` in `Contact.jsx:182`) — same color, two sources of truth, will drift the next time the brand blue changes.
- `navS.sass:3` declares a **second, unused, conflicting** `$primary-color: #1248c6` (a different purple-blue) that's never actually applied — dead code, but confusing to read.
- **Five different near-identical off-white backgrounds** are used interchangeably with no shared token: `#f8f8f8` (`index.sass:63`), `#fafafa` (`index.sass:79`, `aboutmeS.sass:3`, `projectS.sass:5`, `githubContributions.sass:8`), `#f8f9fc` (`homeS.sass:5`), `#f3f7fb` (`contactS.sass:2`). None of these are visually distinguishable in isolation, which is exactly the problem — they should be one token.
- **"Success/positive" green has three different values**: `#eaf3de`/`#27500a` (project badge), `#eaf3de → #d4e8c0`/`#2e5c0a` (contact success icon), `#3fb950` (About Facts status dot).
- **"Error" red has two values**: `#a32d2d` (project showcase error banner) vs `#c62828` (contact form error) — same semantic meaning, different color.
- Text grays are ungoverned: `#333`, `#444`, `#555`, `#666`, `#777`, `#888`, `#999`, plus the literal CSS keyword `grey` (`aboutmeS.sass:17`) all appear with no scale.

**Typography:**
- Root font-size is `62.5%` (`index.sass:13`, so `1rem = 10px`), but it's re-scaled *again* at breakpoints: 59% under 992px, 56% under a raw `56.25em` (900px — doesn't match any tokenized breakpoint), 65% over `112.5em` (1800px). Every rem value elsewhere in the codebase is relative to a root size that shifts four times on its own, independent of each component's own media queries — two stacked scaling systems.
- Body font is declared twice back to back: `font-family: sans-serif` immediately overridden by `'Source Sans Pro', sans-serif'` (`index.sass:33-34`). No `@font-face`, `<link>`, or import for Source Sans Pro was found anywhere (`index.html`, `main.jsx`) — so it's very likely silently falling back to the browser's default sans-serif the whole time. Either load the font or drop the dead declaration.
- Headings run large and heavy throughout: hero `<h1>` 5rem/900, section headers 4rem/bold, project panel title 4rem/700, modal title 3.2rem/700 — consistent in weight philosophy even without a formal type scale.

**Spacing:** no scale exists. See the dedicated Layout & Spacing section below for specifics.

---

## 2. Layout & Spacing

### Container / max-width — four different systems on one page

| Section | Mechanism | Effective max-width | Horizontal padding |
|---|---|---|---|
| Home | Bootstrap `.container` (`Home.jsx:11`) | 540/720/960/1140/1320px (Bootstrap's own steps) | Bootstrap's 1.5rem/24px gutter |
| Aboutme | react-bootstrap `<Container>` + `.aboutme{max-width:100%}` override (`aboutmeS.sass:5`) | Stretches full width — breaks from Home/Contact's capped pattern | Bootstrap gutter |
| Contact | Bootstrap `.container` outer + inner `.contact-card{max-width:96rem}` (`contactS.sass:20-21`) | Double-capped | Bootstrap gutter outer, none inner |
| Project | No container, full-bleed `padding: 0 6rem` → `0 2.4rem` at ≤768px (`projectShowcaseS.sass:25,29`) | 100vw | Custom rem gutter, unrelated to Bootstrap |
| Footer | No container, `padding: 2rem 3rem` (`footS.sass:6`) | 100vw | Yet another custom gutter value |

Four unrelated horizontal-padding systems, no shared `--container-padding` token. Worth consolidating even just visually — scroll the page and the left edge of content will jump around slightly between sections.

### Vertical rhythm — every section reinvents its own gap

Beyond the duplicate-id bug above, the actual top/bottom padding pairs in play: Home `10rem/6rem` (+3rem/5rem leaked), Aboutme has *no* explicit section padding of its own (relies entirely on the leaked 3rem/5rem plus an internal `margin-top: 4rem` on `.stats-row`/`.github-contributions`), Contact `8rem/10rem` (+3rem/5rem leaked), Project uses a fixed `height: 100vh` instead of padding at all (`projectS.sass:3-8`) — a completely different sizing strategy from its siblings. No shared vertical-rhythm value ties these together.

### Two-column layouts — three incompatible strategies for the same idea

- **Home hero**: flex row, `justify-content: space-between`, text column capped at `max-width: 54rem`, photo column a fixed `34rem × 34rem` square.
- **ProjectPanel**: CSS grid, true `1fr 1fr` (`projectShowcaseS.sass:51-57`).
- **Contact card**: CSS grid, asymmetric `34rem 1fr` (`contactS.sass:15`).

Three visually-similar "info column + visual column" splits, three different sizing philosophies. Not broken, but it means the page doesn't read as one system when you compare sections side by side.

### No spacing scale

Sampling actual padding/margin/gap values in use turns up roughly 30 distinct rem values with no discernible step pattern (no 8px-multiple system, nothing derived from a shared variable). Concrete examples:
- Three visually-similar pill badges use three different paddings: `.tech-badge` `0.4rem 1rem`, `.modal-badge` `0.5rem 1.4rem`, `.modal-tech` `0.6rem 1.6rem`.
- Five buttons use five different paddings: `.hero-btn` `1.2rem 3rem`, `.cv-button` `1.4rem 4rem`, `.modal-link` / `.contact-success__reset` `1rem 2rem`, `.project-panel__cta` `0.7rem 1.8rem`.
- Card padding is equally ungoverned: `.contact-form-panel` `4.5rem` vs `.contact-info` `4.5rem 3.5rem` (asymmetric within the *same* card) vs `.modal-panel` `4rem` vs `.about-facts` `2.8rem`.

A `$space-1..$space-6` scale added to `variables.sass` would be a small, high-leverage fix — it's the single biggest lever for making the site feel like one cohesive product rather than several components stitched together.

### Responsive gap shrinkage is inconsistent

About half the components halve their gap when they stack at a breakpoint (ProjectPanel 6→3rem, SkillsMarquee 1.2→0.6rem, StatsRow 4→2rem) — reads like an implicit rule. But Home's hero breaks it (6→4rem, not 6→3rem), and several grid components don't shrink their gap at all despite their columns collapsing to one (Contact form row, modal screenshots grid, modal features grid).

### Fixed navbar height vs. scroll offset doesn't reconcile

The navbar is `fixed-top` unconditionally (`NavBarP.jsx:8`), padding `1rem 5rem` plus a hardcoded `100px`-tall logo (`NavBarP.jsx:10` — raw px HTML attribute, doesn't scale with the root font-size shifts described above) — roughly **120px** tall in practice. But:
- `html { scroll-padding-top: 8rem }` (`index.sass:16-17`) is only **80px**, and only applies at `min-width: 768px`.
- **Below 768px there is no scroll-padding compensation at all**, yet the navbar stays fixed. Any smooth-scroll nav click on mobile can land a section's heading partially under the navbar.
- `.project-section` mirrors this: `height: 100vh` on mobile only becomes `calc(100vh - 8rem)` at ≥768px (`projectS.sass:3-8`), so its own header can render under the navbar on small screens too.

### Off-token breakpoint and z-index

- Contact's card collapses at a literal `900px` (`contactS.sass:23`) — matches none of the three tokenized breakpoints (576/768/992). Most stylesheets besides `navS.sass`/`projectShowcaseS.sass` hardcode 576/768/992 as raw numbers rather than referencing `variables.sass`, so the token file isn't the single source of truth it looks like.
- No z-index scale exists; three unrelated features all hardcode the same literal `1000` (mobile download button, navbar, modal backdrop) — not currently conflicting, but there's no reserved room between them for anything new.

---

## 3. Section-by-Section UX Walkthrough

**Hero (Home)** — label pill, two-line heading, CTA pair ("Hire me" primary, "Download CV" secondary), social icons, a circular framed photo with a decorative spinning ring, and a scroll-hint bar. Solid, conventional hero pattern; the main risk is the inherited center-align bug above.

**Nav** — Bootstrap collapse-based mobile menu; logo is repositioned with a manual absolute-position + `transform: scale(.8)` hack at ≤768px (`navS.sass:43-47`) rather than sizing responsively through the rem system — fragile if content around it shifts. All four nav links carry `aria-current="page"` unconditionally (see Accessibility).

**About Me** — a two-column skills/facts split, plus a full-width stats row (animated count-ups) and a GitHub contribution calendar below. Good density of content, animated tastefully (see Motion section), but it's the section most exposed to the `text-align:center` inheritance risk if `#aboutMe` also picks up the legacy rule.

**Project showcase** — the most distinctive UX idea on the site: a vertical scroll-snapped, full-viewport "one project per screen" track, with an IntersectionObserver deciding the active panel and driving both the framer-motion reveal and the nav-dot rail. This is a strong, memorable pattern and clearly the newest/most deliberate part of the redesign. One usability note: scroll-snap this aggressive (`scroll-snap-stop: always`) can feel "sticky"/hard to skim quickly past on a trackpad — worth a quick hands-on check.

**Project modal** — opens on "Case study →", closes on backdrop click or Escape, locks body scroll. It's the one interactive surface with **no** framer-motion entrance/exit (instant show/hide) despite everything else on the page being animated — a visible inconsistency in polish. No focus trap and no focus-return to the triggering button on close (see Accessibility).

**Contact** — split blue info panel + form panel. Manual validation runs only on submit (not on blur), clears the moment any field changes, and reports all errors as one combined string rather than per-field. Functionally fine, just less precise feedback than per-field inline errors would give. Success state swaps in a clean confirmation panel with a reset button.

**Footer** — simple text + icon row, but the social icons sit at a baseline `transform: scale(2)` growing to `scale(2.3)` on hover (`footS.sass:26,36`) — a much larger baseline scale than any other interactive element on the site (everything else uses subtle `translateY`/`scale(~1.05–1.3)`). Worth a visual check; it may look oversized relative to the rest of the icon language.

---

## 4. Interaction & Motion

Framer-motion is used generously and mostly with sensible timing: `ProjectPanel` staggers children in at `0.08s` intervals with `0.5s` easing per item, `StatCounter` counts up over `1.5s`, `CvButton` uses spring physics (`stiffness:400, damping:20`) on hover, and both `SkillsMarquee` and `GithubContributions` fade/slide in once on scroll (`whileInView`, `once:true`).

**`prefers-reduced-motion` is only respected in two places** — the skills marquee (stops it) and the CV button's shine sweep. It is *not* applied to: the hero photo's continuous 20s ring spin, the scroll-hint pulse, the `StatCounter` count-up animation, or the `ProjectPanel` stagger reveal. For a site whose most eye-catching pattern (the scroll-snapped project track) is animation-heavy, this is worth closing — it's a small, mechanical fix (wrap the relevant `motion` props in a media-query check or a shared hook) with real accessibility payoff.

---

## 5. Responsive Design

Breakpoints observed in practice (beyond the tokenized 576/768/992):

| Component | Change | Breakpoint |
|---|---|---|
| Hero | row → column-reverse, gap 6→4rem | ≤768px |
| Hero heading | 5rem → 4rem → 3.2rem | ≤992px, ≤576px |
| Hero photo | 34rem → 28rem → 22rem | ≤992px, ≤768px |
| Project panel content | 2-col grid → 1-col, gap 6→3rem | ≤768px |
| Project nav dots | `right: 3rem` → `1.4rem` | ≤768px |
| Modal screenshots | 3 → 2 → 1 columns | ≤992px, ≤576px |
| Modal problem/outcome split | 2 → 1 column | ≤768px |
| Contact card | 2-col grid → 1-col | **≤900px** (off-token) |
| Contact form row | 2 → 1 column | ≤576px |
| Skills marquee row | horizontal → stacked | ≤768px |
| Stats row | row → column | ≤768px |

Mobile nav collapse is standard Bootstrap 5 (`navbar-toggler`/`collapse`, data-attribute driven, no React state) — reliable, if not deeply customized. A duplicate rule (`.description { margin-top: 3rem }` at ≤768px) is declared identically in both `index.sass:84-86` and `aboutmeS.sass:21-24` — harmless since identical, but a sign the two files aren't being cross-checked when edited.

---

## 6. Accessibility

**Done well:** descriptive alt text throughout (hero photo, project thumbnails, modal screenshots all have meaningful, non-generic alt strings), `aria-label`s on every icon-only control (social icons, modal close, nav dots, mobile nav toggle), `role="dialog" aria-modal="true"` on the project modal, `role="alert"` on the contact form error, decorative elements correctly marked `aria-hidden="true"` (hero ring, scroll hint, watermark numerals, status dot), and a global `:focus-visible` outline (`index.sass:49-51`).

**Gaps:**
- `aria-current="page"` is hardcoded `true` on **all four** nav links simultaneously (`NavBarP.jsx:33,44,55,66`) regardless of actual scroll position — currently tells assistive tech all four links are "current" at once, which is inaccurate. Since `useActiveIndex`'s IntersectionObserver pattern already exists for the project showcase, the same idea could drive real active-link tracking here.
- The project modal has no focus trap and doesn't return focus to the triggering "Case study" button on close — keyboard/screen-reader users can tab out of the dialog while it's open, and lose their place after closing it.
- `SectionHeader`'s subtitle `<span>` is nested *inside* the `<h2>` alongside the title (`SectionHeader.jsx:7-10`) rather than as a sibling `<p>` — folds non-heading text into the heading's accessible name.
- Likely low-contrast small text: `#888`/`#777` gray at 1.2–1.4rem on white (project nav-dot counter, stat labels), and `rgba(255,255,255,0.75)` white-on-`#0062b9` blue for the contact panel's lead paragraph at 1.5rem — worth a contrast-checker pass, both are borderline-to-failing for WCAG AA at that size.
- The reduced-motion gaps noted in the Motion section above.

---

## 7. Content/Data Gaps Bleeding Into UX

- `src/constants/social.js` still has placeholder values — `linkedin: '.../YOUR_USERNAME'`, `twitter: '.../YOUR_USERNAME'`, `email: 'mailto:your@email.com'` — live in the hero socials and contact info panel right now. (Already flagged in `CLAUDE.md`'s known quirks, repeating here because it's directly user-visible.)
- Social links are sourced three inconsistent ways in one small codebase: GitHub/LinkedIn go through `SOCIAL_LINKS` (with bad LinkedIn data), while Facebook and Twitter/X are hardcoded separately and redundantly in both `Foot.jsx` and `Contact.jsx`.
- Every entry in `fallbackProjects.js` has empty `liveUrl`, `githubUrl`, and `outcome` — so the "Live"/"GitHub" links and the modal's outcome/solution content never actually render for any project by default. Not broken (conditionally hidden), but it means the showcase currently demos with dead ends.
- The "Projects Shipped" stat counter is computed from `fallbackProjects.length` (currently 5) regardless of whether live Sanity data is being used — it won't reflect the real project count once a CMS is connected.

---

## 8. Smaller CSS Defects Found During the Scan

- `navS.sass:31` — `display: inline-blockho` is an invalid value (typo for `inline-block`); the rule is silently dropped by the browser.
- `navS.sass:57-59` — `position: absolute` declared twice in the same rule block.
- `navS.sass:74-77` — `top: 1rem` immediately overridden by `top: 2rem` a few lines later — leftover dead declaration.
- `navS.sass:69` — selector `button .navbar-toggler` (descendant combinator) likely doesn't match Bootstrap's actual `<button class="navbar-toggler">` markup (which needs `button.navbar-toggler`, no space) — probably a non-functional rule.
- `index.sass:87-88` — a stray `.c { color: #fff }` with no matching usage anywhere in `src/components/`.
- Every `HashLink` in `NavBarP.jsx` also carries a redundant static `href="#"` alongside its real `to=` prop.
- `overflow-x: hidden` is applied redundantly at three separate levels (`#root`, `html` in `index.sass:11,15`, and `.aboutme` in `aboutmeS.sass:4`) — a pattern that usually means a horizontal-scroll bug was patched repeatedly at different layers instead of being fixed at its source.

---

## 9. Prioritized Recommendations

**Fix first (small, high-impact):**
1. Remove the duplicate `<div id="home">`/`<div id="contact">` wrappers in `App.jsx` (or drop those ids from the legacy selector in `index.sass:61`) — this alone fixes the oversized Contact section and the inherited center-align risk on Home/Contact.
2. Replace the real social links (`social.js`) and reconcile Facebook/Twitter into that same constants file instead of hardcoding them twice.
3. Fix the `navS.sass` typo/dead rules (`inline-blockho`, duplicate `position: absolute`, dead `top` override, the likely-broken `.navbar-toggler` selector).
4. Make `aria-current` on nav links reflect real scroll position; move `SectionHeader`'s subtitle out of the `<h2>`.
5. Add `scroll-padding-top` compensation below 768px so mobile anchor jumps aren't hidden under the fixed navbar.

**Worth investing in (structural, improves cohesion):**
1. Add a real spacing scale (`$space-1..$space-6`) and a small gray/neutral scale to `variables.sass`, then migrate the five near-duplicate background grays and three inconsistent status colors onto it.
2. Give the project modal a focus trap + focus-return, and add an entrance/exit animation to match the rest of the site's motion language.
3. Extend `prefers-reduced-motion` handling to the hero ring spin, scroll pulse, stat count-up, and panel stagger — currently only 2 of ~6 animated features respect it.
4. Pick one container/gutter convention and apply it to Home/Aboutme/Project/Contact/Footer instead of the current four different systems.
5. Either load `Source Sans Pro` for real or remove the dead font declaration.
