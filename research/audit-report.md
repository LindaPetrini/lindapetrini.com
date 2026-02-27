# Pre-Launch Audit Report — lindapetrini.com
**Date:** 2026-02-27
**Auditor:** Claude Code
**Scope:** All six HTML pages, CSS, JS, images, fonts, sitemap, robots.txt

---

## Executive Summary

**What's in good shape:**
- SEO meta stack is complete and correct on all six pages: unique titles, meta descriptions, canonical URLs, full Open Graph and Twitter Card tags, `lang="en"` on every `<html>`, and Plausible analytics on every page.
- Core images exist (`linda-petrini.jpg`, `linda-petrini.webp`, `og.jpg`), the CV PDF exists (`cv/linda-petrini-cv.pdf`), and all three self-hosted font files exist (`inter-variable.woff2`, `newsreader-variable.woff2`, `newsreader-italic-variable.woff2`).
- Cal.com booking is correctly wired throughout: all Cal.com links point to `https://cal.com/lindapetrini/20min`, and the coaching page inline embed uses `calLink: "lindapetrini/20min"`.
- Beehiiv newsletter embed is present on both the writing page and the coaching page (same embed ID on both, which is expected).
- JavaScript is clean, well-structured, and handles hamburger nav, email obfuscation, and old Carrd hash redirects.

**What must be fixed before launch:**
1. **CRITICAL — about.html contains live placeholder content.** Four sections are marked with `✏️ LINDA:` prompts and dashed-border `.placeholder` boxes. These will be visible to every visitor.
2. **CRITICAL — work.html has a broken publication link.** The "AI Pathways Report" card has `href="#"` with a `<!-- TODO: find URL -->` comment. This is a dead link on a live page.
3. **WARNING — Font preload mismatch.** Every page preloads only `inter-variable.woff2`. The tokens.css declares three `@font-face` rules (Inter, Newsreader upright, Newsreader italic). Newsreader is used prominently for blockquotes and italic text. The Newsreader font files exist but are not preloaded anywhere, meaning the first-render serif text will flash.
4. **WARNING — No `<link rel="icon">` (favicon).** All six pages are missing a favicon declaration. Browsers will make a 404 request to `/favicon.ico` on every page load.
5. **WARNING — about.html photo img is missing `loading="lazy"`.** The hero photo on about.html (below the fold at this point in the layout) has no lazy-load hint and no `fetchpriority` attribute. The index.html hero photo correctly uses `fetchpriority="high"` since it is above the fold, but the about.html photo should use `loading="lazy"`.
6. **INFO — TODO comment in all page heads.** Every page contains `<!-- TODO: Replace lindapetrini.com with your domain if different -->` above the Plausible script. This is the correct domain and can be cleaned up before launch.
7. **INFO — Logo images are absent.** The `/images/logos/` directory is empty. All six logo slots (Anthropic, Palisade, Foresight, Bezos Earth Fund) currently fall back to plain text spans inside commented-out `<img>` tags. This is functional but visually unpolished.
8. **INFO — No skip-to-content link.** None of the pages have a "skip to main content" accessible bypass link, which is required for WCAG 2.1 AA compliance.

---

## Per-Page Breakdown

---

### index.html (Home)

#### Links
| Type | Target | Status |
|---|---|---|
| Internal | `/about.html` | OK — file exists |
| Internal | `/work.html` | OK — file exists |
| Internal | `/writing.html` | OK — file exists |
| Internal | `/coaching.html` | OK — file exists |
| Internal | `/contact.html` | OK — file exists |
| Internal | `/index.html` (nav brand + footer) | OK |
| External | `https://cal.com/lindapetrini/20min` | OK — correct URL (x4 instances: nav CTA, mobile nav, hero CTA, testimonial CTA) |
| External | `https://lindapetrini.substack.com` | OK |
| External | `https://twitter.com/petrini_linda` | OK |
| External | `https://linkedin.com/in/petrinilinda` | OK |
| Script | `https://plausible.io/js/script.outbound-links.js` | OK |
| CSS | `/css/main.css` | OK — file exists |
| JS | `/js/main.js` | OK — file exists |
| Font preload | `/fonts/inter-variable.woff2` | OK — file exists |

#### SEO
- **Title:** "Linda Petrini — AI Researcher, Writer & Coach" — 46 chars, unique, descriptive. **PASS**
- **Meta description:** "Linda Petrini is an AI researcher, technical writer, and coach who helps people understand artificial intelligence — technically and practically. Based in Europe." — 163 chars (slightly over 160 target, but acceptable). **PASS**
- **Canonical:** `https://lindapetrini.com/` — **PASS**
- **og:type:** `website` — **PASS**
- **og:title/description/url/image:** All present and correct. **PASS**
- **twitter:card:** `summary_large_image` — **PASS**
- **twitter:site:** `@petrini_linda` — **PASS**
- **twitter:title/description/image:** All present. **PASS**
- **lang:** `en` — **PASS**
- **robots:** No explicit robots meta tag — defaults to `index, follow` which is correct for a home page. **PASS**

#### Structured Data (JSON-LD)
Present and well-formed. Fields:
- `@type: Person` — correct
- `name`, `url`, `image`, `description`, `jobTitle` — all populated
- `sameAs`: three URLs (Twitter, LinkedIn, Substack) — all consistent with footer social links
- `worksFor`: Palisade Research and Anthropic — correct
- `image` references `https://lindapetrini.com/images/linda-petrini.jpg` — file exists locally as `linda-petrini.jpg` (68K) **PASS**

No obvious JSON-LD validation errors. Note: `worksFor` with an array of organizations is valid schema.org syntax.

#### Analytics
Plausible: `defer data-domain="lindapetrini.com"` — **PASS**

#### Images
| File | Alt text | Width/Height | Lazy/Priority |
|---|---|---|---|
| `/images/linda-petrini.webp` (source) | N/A (source element) | — | — |
| `/images/linda-petrini.jpg` (img) | "Linda Petrini — AI researcher, writer, and coach" | 420×525 | `fetchpriority="high"` |

- `linda-petrini.jpg` exists (68K). **PASS**
- `linda-petrini.webp` exists (26K). **PASS**
- Alt text is descriptive. **PASS**
- `fetchpriority="high"` is correct for the above-the-fold LCP element. **PASS**
- No `loading="lazy"` on the above-fold hero image — correct, should NOT be lazy. **PASS**

Logo bar uses commented-out `<img>` tags with fallback `<span>` text. No broken image requests will be made. **PASS (with caveat: logos dir is empty)**

#### Performance Hints
- Font preload: `inter-variable.woff2` — **PASS**
- Plausible script: `defer` — **PASS**
- main.js: `defer` — **PASS**
- No inline critical CSS (acceptable for a static site of this size)
- Newsreader not preloaded — **WARNING** (see issue #3 in executive summary)

#### Accessibility
- H1: "Understanding AI — from the inside out." — present, one per page. **PASS**
- H2: "Research. Write. Coach." / "Trusted by researchers, clients & students" / "Essays on AI, technology & what it means to be human" — logical hierarchy. **PASS**
- H3: "Research", "Writing", "Coaching" (role cards) — correct as children of H2. **PASS**
- Hamburger button: `aria-label="Toggle navigation menu"`, `aria-expanded="false"`, `aria-controls="mobile-nav"` — **PASS**
- Nav: `aria-label="Main navigation"` — **PASS**
- Mobile nav: `aria-label="Mobile navigation"` — **PASS**
- Logo bar: `aria-label="Trusted by"` — **PASS**
- Testimonials section: `aria-labelledby="testimonials-heading"` — **PASS**
- Role card icons: `aria-hidden="true"` — **PASS**
- `aria-current="page"` on active nav link — **PASS** (index.html marks `/index.html` with `aria-current="page"`)
- No skip link — **WARNING**
- `nav` nested inside `header` inside `nav`: The mobile nav `<nav id="mobile-nav">` is nested inside the outer `<nav class="nav">`. Nested `<nav>` elements are technically valid but semantically redundant. The mobile nav has its own `aria-label` which disambiguates it. Low priority issue.

#### Cal.com
All four Cal.com links correctly point to `https://cal.com/lindapetrini/20min`. **PASS**

#### Beehiiv
Not present on home page — correct, not expected here. **PASS**

---

### about.html

#### Links
All internal navigation and footer links are identical to index.html — all internal targets exist. All external links (Cal.com, Substack, Twitter, LinkedIn) are correct. **PASS**

#### SEO
- **Title:** "About — Linda Petrini" — 21 chars. Short but acceptable for an about page (convention). **PASS**
- **Meta description:** "About Linda Petrini — AI researcher, technical writer, and coach with 7+ years in machine learning. Her background, what she cares about, and how to work with her." — 165 chars (slightly over, acceptable). **PASS**
- **Canonical:** `https://lindapetrini.com/about.html` — **PASS**
- **OG/Twitter meta:** All present. Image references `og.jpg` (file exists at 82K). **PASS**
- **lang:** `en` — **PASS**

#### Structured Data
None — not expected on an inner page. **PASS**

#### Analytics
Plausible present with `defer data-domain="lindapetrini.com"`. **PASS**

#### Images
| File | Alt text | Lazy | Width/Height |
|---|---|---|---|
| `/images/linda-petrini.webp` (source) | — | — | — |
| `/images/linda-petrini.jpg` (img) | "Linda Petrini" | MISSING | 480×600 |

- Files exist. **PASS**
- Alt text is minimal ("Linda Petrini") — functional but less descriptive than the index.html version. **INFO**
- No `loading="lazy"` and no `fetchpriority` attribute. Since this is a secondary page hero (not the LCP for most users), `loading="lazy"` should be added. **WARNING**

#### Placeholder Content (CRITICAL)
Four sections of the main content area contain visible placeholder boxes:

1. **Present-tense introduction** (lines 106-113): dashed pink box with "✏️ Your present-tense introduction"
2. **"How I got here"** (lines 119-127): h2 present, dashed pink box body
3. **"What I care about now"** (lines 131-141): h2 present, dashed pink box body
4. **"Background"** (lines 144-158): h2 present, dashed pink box with brief credentials paragraph below

These placeholder boxes will render as visible dashed-border pink boxes with italic prompt text on the live site. **CRITICAL — must be filled before launch.**

#### Accessibility
- H1: "Linda Petrini" — **PASS**
- H2: "How I got here", "What I care about now", "Background" — correct hierarchy. **PASS**
- No skip link — **WARNING**

#### Cal.com
Nav CTA and mobile nav CTA both point to `https://cal.com/lindapetrini/20min`. The body CTA ("Book a free intro call" button) also links correctly. **PASS**

---

### work.html

#### Links
| Type | Target | Status |
|---|---|---|
| Internal nav/footer | All 6 pages | OK — all files exist |
| External | `https://cal.com/lindapetrini/20min` | PASS |
| External — pub 1 | `#` ("AI Pathways Report") | **BROKEN** — placeholder anchor, TODO comment in source |
| External — pub 2 | `https://foresight.org/focus-areas/secure-ai/` | Appears valid |
| External — pub 3 | `https://www.bezosearthfund.org/uploads/Bezos-Earth-Fund-AI-for-Climate-and-Nature-Workshop-Report.pdf` | Appears valid |
| External — pub 4 | `https://openreview.net/forum?id=Hye_V0NKwr` | Appears valid (ICLR 2020 paper) |

The first publication card ("AI Pathways Report") has `href="#"` and a `<!-- TODO: find URL -->` comment. This is a dead link. **CRITICAL**

#### SEO
- **Title:** "Work & Research — Linda Petrini" — 31 chars. **PASS**
- **Meta description:** 164 chars — slightly over, acceptable. **PASS**
- **Canonical, OG, Twitter:** All present and correct. **PASS**

#### Analytics
Plausible present. **PASS**

#### Images
No content images. Logo placeholders use text spans with commented-out `<img>` tags — no broken requests. **PASS**

#### Accessibility
- H1: "Research at the frontier of AI" — **PASS**
- H2: "Selected research", "Organisations I've worked with", "Open to new research collaborations" — correct hierarchy. **PASS**
- H3: Publication card titles — correct as h3 within h2-level section. **PASS**
- `aria-labelledby="clients-heading"` on clients section — **PASS**
- No skip link — **WARNING**

#### Cal.com
Nav and mobile nav CTAs correct. **PASS**

#### Beehiiv
Not expected on work page — **PASS**

---

### writing.html

#### Links
| Type | Target | Status |
|---|---|---|
| Internal nav/footer | All 6 pages | OK |
| External | `https://cal.com/lindapetrini/20min` | PASS (nav CTAs) |
| External | `https://lindapetrini.substack.com` | PASS (x3: header archive link, footer, body buttons) |
| Article 1 | `https://lindapetrini.substack.com/p/grief-before-the-loss` | Plausible Substack slug |
| Article 2 | `https://lindapetrini.substack.com/p/building-my-own-ai-context-system` | Plausible Substack slug |
| Article 3 | `https://lindapetrini.substack.com/p/on-befriending-claude` | Plausible Substack slug |
| Article 4 | `https://lindapetrini.substack.com/p/feeling-with-and-about-ai-emotional` | Plausible Substack slug |
| Article 5 | `https://lindapetrini.substack.com/p/toxic-overload-how-im-cleaning-up` | Plausible Substack slug |
| Article 6 | `https://lindapetrini.substack.com/p/lindas-october-2025-newsletter` | Plausible Substack slug |

All Substack article links follow the correct URL pattern. They were not live-tested (no network access in this audit), but the slugs match the article titles and were confirmed as real in the commit message "feat: fill writing page with real Substack articles". **PASS — verify live before launch.**

#### SEO
- **Title:** "Writing — Linda Petrini" — 23 chars. **PASS**
- **Meta description:** 155 chars. **PASS**
- **Canonical, OG, Twitter:** All present and correct. **PASS**

#### Analytics
Plausible present. **PASS**

#### Images
No content images on writing page. **PASS**

#### Accessibility
- H1: "Essays on AI & being human" — **PASS**
- H2: "Stay in the loop", "Selected pieces" — correct. **PASS**
- H3: Article card titles — correct as h3 within h2 section. **PASS**
- No skip link — **WARNING**

#### Cal.com
Nav and mobile nav CTAs correct. **PASS**

#### Beehiiv
Beehiiv embed present:
```html
<script async src="https://subscribe-forms.beehiiv.com/embed.js"></script>
<iframe src="https://subscribe-forms.beehiiv.com/74a002d7-b5a2-4a6f-9394-382e906e8ab8" ...>
```
Embed ID `74a002d7-b5a2-4a6f-9394-382e906e8ab8` is consistent across writing and coaching pages. **PASS**

Note: The Beehiiv `<script>` tag uses `async`, not `defer`. This is intentional for the embed script (it's a third-party loader that needs to execute as soon as possible to render the iframe). **PASS**

---

### coaching.html

#### Links
| Type | Target | Status |
|---|---|---|
| Internal nav/footer | All 6 pages | OK |
| External | `https://cal.com/lindapetrini/20min` | PASS (x3: nav CTA, mobile nav, body button) |
| External | `https://twitter.com/petrini_linda` | PASS |
| External | `https://linkedin.com/in/petrinilinda` | PASS |
| External | `https://lindapetrini.substack.com` | PASS |
| Cal.com embed | `calLink: "lindapetrini/20min"` | PASS |
| Cal.com embed | `origin: "https://cal.com"` | PASS |

#### SEO
- **Title:** "Tech & Soul — AI Coaching with Linda Petrini" — 44 chars. **PASS**
- **Meta description:** 148 chars — within range. **PASS**
- **Canonical, OG, Twitter:** All present and correct. **PASS**

#### Analytics
Plausible present. **PASS**

#### Images
No content images. **PASS**

#### Cal.com Inline Embed
The coaching page includes an inline Cal.com booking widget:
```javascript
Cal("inline", {
  elementOrSelector: "#cal-embed",
  calLink: "lindapetrini/20min",
  layout: "month_view"
});
Cal("ui", {
  theme: "light",
  styles: { branding: { brandColor: "#e0507e" } },
  ...
});
```
- `calLink` matches `lindapetrini/20min` — **PASS**
- Brand colour `#e0507e` matches `--color-pink-500` from tokens.css — **PASS**
- The embed container `#cal-embed` has `min-height: 600px` via `.embed-wrap--cal` — **PASS**
- The Cal.com script loads from `https://app.cal.com/embed/embed.js` — correct. **PASS**
- Note: The inline embed script is not `defer`ed (it's synchronous). This is expected/required for Cal.com's embed loader pattern.

#### Beehiiv
Beehiiv embed present in the course waitlist section (same embed ID as writing page):
```html
<script async src="https://subscribe-forms.beehiiv.com/embed.js"></script>
<iframe src="https://subscribe-forms.beehiiv.com/74a002d7-b5a2-4a6f-9394-382e906e8ab8" ...>
```
**PASS**

#### Accessibility
- H1: "Tech & Soul" — **PASS**
- H2: "1:1 Sessions", "Digital Sovereignty in the Age of AI" — correct. **PASS**
- H3: "What we cover", "Who this is for", "What you'll learn", "Join the waitlist" — correct as children of H2. **PASS**
- No skip link — **WARNING**

---

### contact.html

#### Links
| Type | Target | Status |
|---|---|---|
| Internal nav/footer | All 6 pages | OK |
| External | `https://cal.com/lindapetrini/20min` | PASS (nav CTA, mobile nav, body button) |
| CV download | `/cv/linda-petrini-cv.pdf` | **PASS** — file exists (52K PDF) |
| Email button | `href="#"` + `data-email` attributes | OK — assembled by JS at runtime |
| External | `https://twitter.com/petrini_linda` | PASS |
| External | `https://linkedin.com/in/petrinilinda` | PASS |
| External | `https://lindapetrini.substack.com` | PASS |

The email link uses `data-email-user="lindapetrini"`, `data-email-domain="gmail"`, `data-email-tld="com"`. main.js assembles this into `lindapetrini@gmail.com` at runtime. The mechanism works correctly and prevents bot harvesting. **PASS**

The CV link uses the `download` attribute: `download="Linda-Petrini-CV.pdf"`. The file `/cv/linda-petrini-cv.pdf` exists. **PASS**

#### SEO
- **Title:** "Contact — Linda Petrini" — 23 chars. **PASS**
- **Meta description:** "Get in touch with Linda Petrini — AI researcher, writer, and coach. Book a call, send an email, or download her CV." — 115 chars (below 150 target). **INFO — could be expanded.**
- **Canonical, OG, Twitter:** All present and correct. **PASS**

#### Analytics
Plausible present. **PASS**

#### Images
No content images. **PASS**

#### Accessibility
- H1: "Get in touch" — **PASS**
- H2: "Book a free intro call", "Send an email", "Download my CV", "Find me online" — used as section headings. Technically these should be H2s as children of main, but there is no H2 wrapper for these contact method sections. The heading hierarchy is flat (H1 → H2 × 4), which is valid. **PASS**
- No skip link — **WARNING**
- Email button initially shows "Loading email…" before JS hydration. If JS fails, the button remains non-functional and shows a dead `href="#"` link. There is no `<noscript>` fallback. **INFO**

#### Cal.com
All Cal.com links correct. **PASS**

#### Beehiiv
Not expected on contact page — **PASS**

---

## File System Check

### Images (`/root/projects/website_agents/images/`)
| File | Exists | Size | Notes |
|---|---|---|---|
| `linda-petrini.jpg` | YES | 68K | Hero photo |
| `linda-petrini.webp` | YES | 26K | WebP variant |
| `og.jpg` | YES | 82K | OG social preview (1200×630) |
| `logos/` directory | YES | 0 files | **EMPTY** — all logo images commented out |

### Fonts (`/root/projects/website_agents/fonts/`)
| File | Exists | Size | Notes |
|---|---|---|---|
| `inter-variable.woff2` | YES | 48K | Preloaded on all pages |
| `newsreader-variable.woff2` | YES | 129K | Used for body serif; NOT preloaded |
| `newsreader-italic-variable.woff2` | YES | 144K | Used for italic serif; NOT preloaded |

### CV (`/root/projects/website_agents/cv/`)
| File | Exists | Size |
|---|---|---|
| `linda-petrini-cv.pdf` | YES | 52K |

### CSS (`/root/projects/website_agents/css/`)
All 8 files exist and are imported correctly in main.css: tokens.css, reset.css, base.css, layout.css, nav.css, footer.css, components.css, utilities.css. **PASS**

### JS (`/root/projects/website_agents/js/`)
| File | Exists |
|---|---|
| `main.js` | YES |

### Sitemap / Robots
| File | Status |
|---|---|
| `sitemap.xml` | Exists, lists all 6 pages with correct canonical URLs |
| `robots.txt` | Exists, `Allow: /`, sitemap URL correct |

### Missing Files
| File | Impact |
|---|---|
| `/favicon.ico` or `<link rel="icon">` | Browser will 404 on every page load; no favicon shown in tabs/bookmarks |
| Logo SVGs in `/images/logos/` | Visual polish only; text fallbacks in place |

---

## Prioritised Issues List

### CRITICAL — Must fix before launch

| # | Page | Issue | Detail |
|---|---|---|---|
| C1 | about.html | **Placeholder content visible in production** | 4 sections show dashed-border `.placeholder` boxes with `✏️ LINDA:` prompts. No real biographical text. Visitors will see the scaffolding. |
| C2 | work.html | **Dead link on AI Pathways Report** | `href="#"` with `<!-- TODO: find URL -->` comment on line 103. This is an anchor that goes nowhere. The publication should either have a real URL or be temporarily removed. |

### WARNING — Should fix before launch

| # | Page | Issue | Detail |
|---|---|---|---|
| W1 | All pages | **No favicon** | No `<link rel="icon">` in any page head. Every page load triggers a 404 for `/favicon.ico`. Add even a simple SVG or PNG favicon. |
| W2 | All pages | **Newsreader font not preloaded** | `tokens.css` declares 3 `@font-face` rules including two Newsreader files (272K combined). Only Inter is preloaded. Newsreader is used for blockquotes, italic text, and the serif heading style on coaching.html. Recommend adding `<link rel="preload">` for at minimum `newsreader-italic-variable.woff2` (most-used italic variant). |
| W3 | All pages | **No skip-to-content link** | WCAG 2.1 SC 2.4.1 requires a mechanism to bypass repeated navigation blocks. None of the pages have a skip link. Add `<a href="#main-content" class="skip-link">Skip to main content</a>` at the top of `<body>` and an `id="main-content"` on `<main>`. |
| W4 | about.html | **Hero image missing `loading="lazy"`** | The about.html photo (`width="480" height="600"`) has no lazy loading attribute. This is a secondary page image that should be `loading="lazy"`. |
| W5 | contact.html | **Meta description short** | At 115 chars, the contact page meta description is below the recommended 150-160 char range, missing an opportunity to describe the Cal.com booking link and CV availability to search engines. |

### INFO — Nice to fix, low urgency

| # | Page | Issue | Detail |
|---|---|---|---|
| I1 | All pages | **TODO comment in Plausible script** | `<!-- TODO: Replace lindapetrini.com with your domain if different -->` appears in all 6 page heads. The domain is already correct; clean up the comment before launch. |
| I2 | All pages | **Nested `<nav>` elements** | The mobile `<nav id="mobile-nav">` is nested inside the outer `<nav class="nav">` in all pages. HTML5 allows this, and both navs have distinct `aria-label` attributes, so it's valid. Consider wrapping mobile nav in a `<div>` for stricter semantic cleanliness. |
| I3 | about.html | **Photo alt text less descriptive** | about.html uses `alt="Linda Petrini"` vs index.html's `alt="Linda Petrini — AI researcher, writer, and coach"`. More descriptive alt text is better for screen readers and image SEO. |
| I4 | contact.html | **No noscript email fallback** | The email button reads "Loading email…" and points to `href="#"` until JavaScript runs. If JS fails, the user cannot contact Linda by email. Consider a `<noscript>` block or a non-JS alternative. |
| I5 | index.html | **Meta description slightly over 160 chars** | At 163 chars, it may be truncated in some SERP displays. Consider trimming by ~5 chars. |
| I6 | about.html | **Meta description slightly over 160 chars** | At 165 chars — same minor issue. |
| I7 | work.html | **External publication URLs not live-tested** | The Foresight, Bezos Earth Fund, and OpenReview links look correct but were not tested against live servers in this audit. Manually verify before launch. |
| I8 | writing.html | **Substack article URLs not live-tested** | Six Substack article slug links look correct based on commit history ("real Substack articles") but were not tested live. Manually verify all six before launch. |
| I9 | images/logos/ | **Logo directory empty** | All four brand logos (Anthropic, Palisade, Foresight, Bezos Earth Fund) are commented out and fall back to `<span>` text. This is functional but looks unpolished at launch. |
| I10 | coaching.html | **Cal.com embed script is synchronous** | The Cal.com inline embed script is not deferred. This is required by the Cal.com embed pattern and cannot easily be changed, but it means the script blocks rendering briefly. Document this as an intentional trade-off. |

---

## Summary Checklist for Linda (Content Required)

The following require Linda's input and cannot be resolved technically:

- [ ] **about.html**: Write the four biographical sections (present-tense intro, origin story, what I care about, background/credentials)
- [ ] **work.html**: Find and add the real URL for the "AI Pathways Report" publication, or remove the card
- [ ] **Logo files**: Source SVG files for Anthropic, Palisade Research, Foresight Institute, Bezos Earth Fund logos (check brand guidelines for permission to display)
- [ ] **Favicon**: Provide a favicon image (PNG 32×32 and/or SVG) or decide on a text-based favicon approach
- [ ] **Live URL verification**: Manually click through all external links (Substack articles, Foresight, Bezos Earth Fund PDF, OpenReview) to confirm they resolve correctly before launch
