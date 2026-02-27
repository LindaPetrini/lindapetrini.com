# Roadmap: Linda Petrini Website

**Milestone:** v1 Launch
**Phases:** 5
**Requirements:** 41 mapped ✓

---

## Phase 1: Foundation

**Goal:** Establish the CSS design system, HTML skeleton, and shared navigation/footer components so every subsequent phase has a consistent, accessible base to build on.
**Requirements:** FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07

### Plans
1. Design tokens and CSS reset — create `css/tokens.css` with all pink theme variables and spacing scale, plus `css/reset.css` (Andy Bell Modern CSS Reset) and `css/main.css` @import chain entry point
2. Layout and base styles — create `css/base.css` (body/heading/link defaults) and `css/layout.css` (page wrapper, section spacing, responsive breakpoints)
3. Shared nav and footer — create accessible hamburger nav (`css/nav.css` + `js/main.js` with JS-based `aria-expanded` toggle), footer styles (`css/footer.css`), and canonical reference copies in `partials/nav.html` + `partials/footer.html`
4. HTML skeleton — create a valid `index.html` with correct `<head>` boilerplate, nav, and footer duplicated into all 6 page files (index, about, work, writing, coaching, contact) with `aria-current="page"` active states

### Success Criteria
1. Opening any of the 6 HTML files in a browser shows correct typography (Inter/Newsreader) and pink theme with no horizontal scroll at 375px and 1280px viewport widths
2. The hamburger menu opens and closes on mobile with keyboard navigation intact (Tab, Enter, Escape) and the button carries `aria-expanded="true/false"` as state changes
3. All 6 pages share identical nav and footer markup; the active page link is visually distinguished via `aria-current="page"`
4. No Google Fonts CDN requests appear in DevTools Network panel — fonts load from `/fonts/` directory with `font-display: swap`

### Notes
Self-hosted fonts are in this phase because they underpin every page's visual render and must be in place before any content phase begins. FOUND-02 (load time) and FOUND-03 (HTTPS) are satisfied by hosting choice (Cloudflare Pages) and font self-hosting, so they are validated at deployment rather than in code. The CSS token system uses two tiers: primitive values (e.g., `--color-pink-500`) plus semantic aliases (e.g., `--color-accent`) — only semantic aliases are used in component CSS.

---

## Phase 2: Home Page

**Goal:** Build the complete home page with hero, social proof, role navigation cards, and testimonials so the site has a working, converting front door.
**Requirements:** HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06

### Plans
1. Hero section — Linda's professional photo (with WebP + JPEG `<picture>` element), outcome-focused headline, subheadline, and "Book a free call" primary CTA above the fold on both 375px and 1280px viewports
2. Trusted-by logo bar and role cards — "Trusted by" strip with Palisade, Anthropic, and Foresight Institute SVG logos immediately below the hero, followed by three role cards (Researcher, Writer, Coach/Mentor) each with a brief description and link to the corresponding inner page
3. Testimonials section and social footer — full testimonials from Lalita (coaching) and Allison Duettmann (research/writing) with name, title, and organisation; social links (Twitter, LinkedIn, Substack) wired into the sitewide footer; `Person` JSON-LD structured data added to `index.html` `<head>` with `sameAs` array

### Success Criteria
1. On a 375px mobile viewport, Linda's photo, headline, subheadline, and "Book a free call" button are all visible without scrolling
2. The "Trusted by" logo bar displays all three organisation logos between the hero and the role cards with no layout shift
3. Both testimonials show the full quote text, full name, title, and organisation — no truncation
4. The footer on every page contains working links to Twitter (@petrini_linda), LinkedIn (petrinilinda), and Substack (lindapetrini.substack.com)
5. DevTools shows valid `Person` JSON-LD in `index.html` with a `sameAs` array containing all three social profile URLs

### Notes
The hero must lead with one primary audience — research clients or coaching clients — to avoid a vague multi-audience headline that converts nobody. The `Person` JSON-LD (HOME-05) is placed here rather than in the SEO phase because it is homepage-specific markup that positions Linda as an entity for AI-powered search; generic SEO boilerplate is handled in Phase 4. Social footer links (HOME-06) are duplicated into the shared footer partial and then synced to all pages during this phase.

---

## Phase 3: Inner Pages

**Goal:** Build all five inner pages (About, Work, Writing, Coaching, Contact) with correct structure and working integrations so every section of the site is reachable and functional.
**Requirements:** ABOUT-01, ABOUT-02, ABOUT-03, WORK-01, WORK-02, WORK-03, WRIT-01, WRIT-02, WRIT-03, COACH-01, COACH-02, COACH-03, COACH-04, COACH-05, CONT-01, CONT-02, CONT-03

### Plans
1. Coaching page — "Tech & Soul" hero heading and intro paragraph, 1:1 sessions section (5 topics, who it is for, Lalita testimonial, "Book a free intro call" button), Cal.com inline embed with explicit `min-height` container, "Digital Sovereignty in the Age of AI" course section with 6-module list and Beehiiv waitlist embed, and micro-trust signal line directly below the primary CTA
2. Work and Writing pages — `work.html` with research publications section (AI Pathways, Secure AI tech tree, Bezos report, ICLR paper each with description and link), research client section (Palisade and Anthropic logos), and "Open to new work" CTA; `writing.html` with Beehiiv subscribe embed at top (styled `width: 100%`), minimum 3 article cards (title, one-line description, "Read on Substack" link), and link to full Substack archive
3. About and Contact pages — `about.html` with five-section structure (present-tense lead, origin story, what she cares about, credentials, CTA) and clearly marked placeholder copy; `contact.html` with JS-assembled email address, CV download button pointing to `cv/linda-petrini-cv.pdf`, and social profile links

### Success Criteria
1. All 6 nav links resolve to real HTML pages with no 404s; every page displays the shared nav and footer
2. The Cal.com booking embed on the coaching page renders without overflow or layout collapse on both desktop and iOS Safari; the booking flow completes end-to-end
3. The Beehiiv waitlist embed on the coaching page and the Beehiiv subscribe embed on the writing page both display without blank whitespace on iOS Safari and Android Chrome
4. On the contact page, the email address is not present as plaintext in the HTML source; it assembles and displays correctly with JavaScript enabled
5. All five inner pages have clearly marked placeholder sections where Linda needs to supply personal content (About narrative) and file assets (CV PDF)

### Notes
The coaching page is built first because it is the highest-conversion page and exercises the most integration risk (Cal.com embed + Beehiiv embed in the same page). The About page is deliberately scaffolded with placeholder copy — shipping a well-structured placeholder is better than delaying for copy that may not arrive. Global CSS reset rules can silently break the Cal.com inline embed; scope `overflow`, `box-sizing`, and `max-width` resets carefully and test booking flow completion on iOS Safari.

---

## Phase 4: SEO & Analytics

**Goal:** Add all SEO metadata, structured data, sitemap, robots.txt, and analytics to every page so the site is fully indexable and measurable from day one.
**Requirements:** SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06

### Plans
1. Per-page head metadata — add unique `<title>` tags (including "Linda Petrini"), unique `<meta name="description">` of 150–160 characters, and `<link rel="canonical">` with full absolute URL to all 6 pages
2. Open Graph and Twitter Card tags — add `og:title`, `og:description`, `og:url`, `og:image` (absolute URL), and Twitter Card tags to all 6 pages
3. Sitemap, robots.txt, and Plausible — create `sitemap.xml` listing all 6 pages with `<lastmod>` dates, `robots.txt` permitting all crawlers, and add the Plausible Analytics script (one instance per page) with outbound link click tracking enabled; audit every `<head>` to confirm exactly one Plausible script per page

### Success Criteria
1. Every page has a `<title>` tag containing "Linda Petrini" and a `<meta name="description">` between 150 and 160 characters (validated with a character count tool)
2. Every page has `<link rel="canonical">` with a fully qualified absolute URL and all six Open Graph + Twitter Card tags with absolute URLs for `og:image`
3. `sitemap.xml` is valid XML listing all 6 page URLs with `<lastmod>` dates; `robots.txt` contains `User-agent: * / Allow: /` with no Disallow rules
4. Plausible Analytics script appears exactly once in each page's `<head>`; outbound link tracking is enabled and fires on Cal.com and Beehiiv link clicks in DevTools

### Notes
`og:image` must be an absolute URL (`https://lindapetrini.com/images/og.jpg`) — a relative path silently breaks all social sharing previews. The `robots.txt` must be verified against a staging-leftover `Disallow: /` that would silently block all crawlers. Do not add GA4 — Plausible is the chosen analytics tool (no cookie consent banner required, GDPR-compliant). After launch, submit `sitemap.xml` to Google Search Console within 24 hours to avoid an indexing gap during the Carrd-to-static migration.

---

## Phase 5: Performance & Polish

**Goal:** Optimise images and assets, achieve Lighthouse scores of 90+ Performance / 95+ SEO / 95+ Accessibility on mobile, and verify all external integrations are working before launch.
**Requirements:** PERF-01, PERF-02, PERF-03, PERF-04, PERF-05

### Plans
1. Image optimisation — compress hero image to WebP under 150KB with JPEG fallback via `<picture>`, add `fetchpriority="high"` (never `loading="lazy"`) to the LCP element, add descriptive `alt` attributes and explicit `width`/`height` to all images to prevent layout shift, optimise all SVG logos with SVGO
2. Lighthouse audit and fixes — run Lighthouse on mobile for all 6 pages, triage and fix any issues below the target thresholds (≥ 90 Performance, ≥ 95 SEO, ≥ 95 Accessibility), prioritising Core Web Vitals (LCP, CLS, INP)
3. External link verification — test every external link end-to-end: Cal.com booking (complete a test booking), Beehiiv embed (submit a test email), Substack archive link, Twitter/LinkedIn/Substack social links, all four research publication links, and CV download

### Success Criteria
1. Lighthouse mobile audit scores ≥ 90 Performance, ≥ 95 SEO, ≥ 95 Accessibility on all 6 pages
2. Hero image file size is under 150KB in WebP format; DevTools Network panel shows it served with `fetchpriority="high"` and no `loading="lazy"` attribute
3. Every image on the site has a non-empty `alt` attribute and explicit `width` and `height` attributes; all SVG logos pass SVGO optimisation with no bloated Illustrator metadata
4. Every external link (Cal.com booking, Beehiiv embeds, Substack, Twitter, LinkedIn, all publication links) opens the correct destination with no 404 or redirect errors
5. The site loads in under 2.5 seconds on a simulated 4G connection in Lighthouse/WebPageTest

### Notes
Never set `loading="lazy"` on the hero image — it is the LCP element and lazy-loading it destroys Core Web Vitals. Unoptimised camera photos routinely cause LCP > 4 seconds. The Cal.com booking flow must be tested to completion (not just render) — a broken booking link is a silent conversion killer. Post-launch: set a monthly calendar reminder to re-verify external links, as Cal.com, Beehiiv, and Substack can change without notice.

---

*Roadmap created: 2026-02-27*
