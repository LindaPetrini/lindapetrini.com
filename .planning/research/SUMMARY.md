# Research Summary: Linda Petrini Website

*Synthesized from STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md, PROJECT.md — 2026-02-27*

---

## Recommended Stack

- **HTML/CSS**: Vanilla HTML5 + CSS Custom Properties. No framework, no build step, no preprocessor.
- **Fonts**: Self-host Inter + Newsreader as WOFF2 variable fonts — do NOT load from Google Fonts CDN (GDPR risk, latency penalty).
- **CSS reset**: Andy Bell's Modern CSS Reset (piccalil.li). Paste inline at top of `reset.css`.
- **Analytics**: Plausible Cloud ($9/mo). No cookie banner needed, GDPR-compliant, 1KB script. Not GA4.
- **Hosting**: Cloudflare Pages (free tier). Unlimited bandwidth, 300+ edge nodes, native DDoS, preview deploys.
- **Booking**: Cal.com inline embed on Coaching page; popup-on-click from hero and nav.
- **Newsletter**: Beehiiv iframe embed (ID: `74a002d7-b5a2-4a6f-9394-382e906e8ab8`). Link out to Substack — do not embed Substack's own widget.
- **Structured data**: `Person` JSON-LD schema on homepage. Include `sameAs` array linking Twitter, LinkedIn, Substack.

---

## Architecture

### File Structure

```
/workspace/
├── index.html
├── about.html
├── work.html
├── writing.html
├── coaching.html
├── contact.html
├── css/
│   ├── main.css          # @import chain entry point
│   ├── tokens.css        # All design tokens (colors, type scale, spacing)
│   ├── reset.css
│   ├── base.css
│   ├── layout.css
│   ├── nav.css
│   ├── footer.css
│   ├── components.css
│   └── utilities.css
├── js/
│   └── main.js           # Hamburger toggle only — minimal vanilla JS
├── images/               # Flat — hero WebP + JPG fallback, SVG logos, favicon
├── fonts/                # Self-hosted Inter + Newsreader WOFF2
├── cv/
│   └── linda-petrini-cv.pdf
├── partials/             # Canonical nav.html + footer.html (reference copies)
├── sitemap.xml
└── robots.txt
```

### CSS Approach

Single `<link rel="stylesheet" href="css/main.css">` on every page. `main.css` uses `@import` to pull in partials. Two-tier token system in `tokens.css`: primitive values (`--color-pink-500`) plus semantic aliases (`--color-accent`) — only semantic aliases used in component CSS. Optional: declare `@layer reset, base, layout, components, utilities` at the top of `main.css` for explicit cascade ordering.

### Navigation Pattern

**Copy-paste** (Option A). Duplicate `<header>` and `<footer>` into all 6 pages. Mark active state with `aria-current="page"`. Rationale: 6 pages is manageable; zero JS dependency for nav; best SEO (nav links in raw HTML); no flash of missing content. Keep `partials/nav.html` and `partials/footer.html` as the canonical reference — edit there first, then sync to pages.

Hamburger toggle requires a small JS snippet with proper `aria-expanded` — do NOT use the CSS-only checkbox hack (fails keyboard navigation and screen readers).

---

## Table Stakes Features

These must exist or visitors bounce immediately:

- Mobile-first responsive design — 68% of coaching site traffic is mobile
- Page load under 2.5 seconds — every second past 3s costs ~7% of conversions
- SSL / HTTPS — automatic on Cloudflare Pages / Netlify
- Professional photo of Linda in the hero — faces are processed before any text
- Outcome-focused headline above the fold — not "Welcome," not vague mission language
- Primary CTA visible without scrolling on both desktop (1280px) and mobile (375px)
- Contact accessible within 2 clicks from any page
- Social links (Twitter, LinkedIn, Substack) in the footer sitewide
- Working mobile hamburger menu (accessible — JS-based with `aria-expanded`)
- Meta description on every page, unique, 150-160 characters, includes name

---

## Differentiators

What separates a converting site from a polite-interest site:

**Social proof architecture** — placed throughout the page, not dumped at the bottom:
1. "Trusted by" logo bar (Palisade, Anthropic, Foresight Institute) immediately below hero — highest-leverage placement
2. One testimonial after the role/service description
3. One testimonial immediately adjacent to the booking CTA — addresses last-moment hesitation
4. Coaching-specific testimonials on the Coaching page

**Testimonials that convert**: Full name + title + organization + specific outcome. Allison Duettmann (Foresight Institute President) carries authority in the AI safety community. Lalita's testimonial belongs on the coaching page.

**Cal.com inline embed** on the Coaching page — visitors never leave the site to book. Popup-on-click for the hero "Book a Call" button. Customize embed to match pink brand (`#e05c7e`).

**About page as narrative**, not CV dump: present-tense lead → origin story → what she cares about → credentials as supporting evidence → CTA. End: "If this resonates, let's talk" → booking link.

**Writing page that drives subscriptions**: Newsletter description first, Beehiiv embed (styled, `width: 100%`), then 3–6 article cards with title + one-line description + "Read on Substack" link. Do not just link to Substack and walk away.

**Micro-trust signal under the CTA button**: "Trusted by teams at Anthropic, Palisade, and Foresight Institute" — one line, directly beneath the booking button.

**Person JSON-LD schema** — positions Linda as a distinct entity in AI-powered search (Google AI Overviews, Perplexity). `sameAs` array linking all profiles is the most critical property.

---

## Critical Pitfalls to Avoid

1. **Lazy-loading the hero image** — use `fetchpriority="high"` instead; `loading="lazy"` on the LCP element destroys Core Web Vitals.
2. **Hero photo at original size** — compress to under 150KB WebP; unoptimized camera photos cause LCP > 4 seconds.
3. **`og:image` as a relative path** — must be an absolute URL (`https://lindapetrini.com/images/og.jpg`) or social previews break.
4. **Global CSS breaking Cal.com embed** — scope resets carefully; never `overflow: hidden` on `body`; give the inline embed container an explicit `min-height`.
5. **Beehiiv iframe whitespace** — set `height` manually (start at `200px`), test on iOS Safari and Android Chrome.
6. **CSS-only hamburger** — checkbox hack fails keyboard nav and screen readers; use JS with `aria-expanded` and `hidden` attribute on the nav.
7. **Plaintext `mailto:` in HTML source** — bots harvest it; assemble the address at runtime via JS.
8. **Double analytics script** — audit every `<head>` before launch; search for `plausible.io` in all files to confirm exactly one instance per page.
9. **robots.txt with `Disallow: /`** — a staging leftover that silently blocks all crawlers; verify production robots.txt before launch.
10. **Missing canonical tags** — add `<link rel="canonical" href="https://lindapetrini.com/[page].html">` to every page's `<head>` or risk duplicate content indexing.

---

## Build Order

### Phase 1 — Foundation
1. `css/tokens.css` — establish all pink theme variables and spacing scale
2. `css/reset.css` + `css/base.css` — normalize browsers, body/heading/link defaults
3. `css/layout.css` — page wrapper, section spacing
4. `css/main.css` — wire up `@import` chain
5. `index.html` skeleton — valid HTML5 with correct `<head>` boilerplate

**Checkpoint:** Open `index.html`. Basic typography and pink theme visible.

### Phase 2 — Shared Components
6. `css/nav.css` + `js/main.js` — header styles + hamburger toggle (accessible)
7. `css/footer.css` — footer styles
8. `partials/nav.html` + `partials/footer.html` — canonical reference copies

**Checkpoint:** Nav opens/closes on mobile. Footer renders.

### Phase 3 — Home Page
9. Hero section: photo, headline, subheadline, primary CTA
10. Trusted-by logos strip (immediately below hero)
11. Role cards (Researcher / Writer / Coach), each with a link
12. Testimonials section (Allison Duettmann + Lalita)
13. `css/components.css` — buttons, cards, testimonial blocks

**Checkpoint:** Full home page renders on mobile and desktop. Lighthouse mobile passes.

### Phase 4 — Inner Pages (in order of content readiness)
14. `coaching.html` — headline, Cal.com inline embed, Beehiiv waitlist embed, FAQ
15. `work.html` — publications list with framing, research client logos
16. `writing.html` — Beehiiv signup embed, article cards with Substack links
17. `contact.html` — JS-obfuscated email link, CV download button
18. `about.html` — build structure with placeholder copy (Linda writes the content)

**Checkpoint:** All 6 pages exist, all nav links work, no blank pages.

### Phase 5 — Polish and Launch Prep
19. Self-host fonts: download Inter + Newsreader WOFF2, add `@font-face` to `tokens.css`, add `<link rel="preload">` for Inter Regular
20. SEO boilerplate on all pages: title, meta description, canonical, OG tags, Twitter Card
21. `Person` JSON-LD schema on `index.html`
22. `sitemap.xml` + `robots.txt` (permissive)
23. Image optimization: compress hero to WebP < 150KB, optimize SVG logos with SVGO
24. Plausible script (one instance per page); configure outbound click tracking and conversion goals
25. Verify all external links: Cal.com, Substack, Beehiiv embed ID, Twitter, LinkedIn, all publications
26. Lighthouse audit — target ≥ 90 Performance, ≥ 95 SEO, ≥ 95 Accessibility
27. Submit sitemap to Google Search Console

---

## Key Risks

1. **About page copy bottleneck.** The About page is one of the highest-converting pages for a coach/consultant and requires Linda to write a personal narrative — not a CV. Build the structure and placeholder now, but ship this page only when the copy is right. A bad About page is worse than a placeholder.

2. **Cal.com embed CSS conflicts.** The inline Cal.com embed is the primary conversion mechanism on the Coaching page. Global CSS rules (especially `box-sizing`, `overflow`, or `max-width` on the container) can silently break it. Test the booking flow end-to-end — including completing a booking — on both desktop and iOS Safari before launch.

3. **Three audiences, one homepage.** Linda's homepage must orient three distinct visitors (research clients, coaching clients, newsletter readers) without trying to speak to all three simultaneously in the hero. Choosing the wrong primary audience for the hero — or writing a vague headline that tries to cover all three — is the most likely reason the site fails to convert. The hero should lead with one clear offer; navigation serves the other two.

4. **Post-launch link rot.** The site's conversion rate depends directly on external integrations (Cal.com, Beehiiv, Substack, publication links). These can break silently after launch. Set a monthly calendar reminder to verify all external links. A broken booking link is a silent conversion killer.

5. **Carrd migration indexing gap.** Google currently has only the root URL indexed from Carrd. Submitting `sitemap.xml` to Search Console within 24 hours of launch is critical to avoid an indexing gap. The risk is low (Carrd has minimal SEO equity) but the cost of getting it right is low too — just do it.
