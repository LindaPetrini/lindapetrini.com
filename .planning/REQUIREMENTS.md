# Requirements: Linda Petrini Website

**Defined:** 2026-02-27
**Core Value:** Visitors immediately understand who Linda is and can take action — book a call, read her work, or join her course waitlist — without friction.

---

## v1 Requirements

### Foundation

- [ ] **FOUND-01**: Site renders correctly on mobile (375px) and desktop (1280px) with no horizontal scroll
- [ ] **FOUND-02**: All pages load in under 2.5 seconds on a 4G connection
- [ ] **FOUND-03**: Site is served over HTTPS with a valid SSL certificate
- [ ] **FOUND-04**: CSS design tokens (pink color scheme, Inter + Newsreader fonts, spacing scale) are defined in a single `tokens.css` file
- [ ] **FOUND-05**: Self-hosted Inter and Newsreader WOFF2 font files loaded with `font-display: swap` (no Google Fonts CDN)
- [ ] **FOUND-06**: Accessible hamburger navigation with JS-based `aria-expanded` toggle (not CSS-only checkbox hack)
- [ ] **FOUND-07**: Shared `<nav>` and `<footer>` HTML duplicated across all pages with `aria-current="page"` active state

### Home Page

- [ ] **HOME-01**: Hero section includes Linda's professional photo, an outcome-focused headline, a subheadline, and a primary CTA ("Book a free call") visible above the fold on mobile and desktop
- [ ] **HOME-02**: "Trusted by" logo bar featuring Palisade, Anthropic, and Foresight Institute logos appears immediately below the hero section
- [ ] **HOME-03**: Three role cards (Researcher, Writer, Coach/Mentor) with a brief description and link to each inner page
- [ ] **HOME-04**: Testimonials section with full testimonials from Lalita (coaching) and Allison Duettmann (research/writing) with name, title, and organisation
- [ ] **HOME-05**: `Person` JSON-LD structured data in `<head>` with `sameAs` array linking Twitter, LinkedIn, and Substack profiles
- [ ] **HOME-06**: Social links (Twitter, LinkedIn, Substack) in the sitewide footer

### About Page

- [ ] **ABOUT-01**: Page exists with correct `<head>` metadata, nav, and footer — structured for narrative content (not a CV dump)
- [ ] **ABOUT-02**: Section structure: present-tense lead → origin story → what she cares about now → credentials → CTA to book a call
- [ ] **ABOUT-03**: Placeholder copy clearly marked so Linda knows where to fill in her personal narrative

### Work / Services Page

- [ ] **WORK-01**: Research publications section with links to AI Pathways report, Secure AI tech tree, Bezos report, and ICLR paper — each with a brief description
- [ ] **WORK-02**: Research support section listing Palisade and Anthropic as clients, with their logos
- [ ] **WORK-03**: "Open to new work" section with a contact CTA for new research/writing enquiries

### Writing Page

- [ ] **WRIT-01**: Newsletter description and Beehiiv subscribe embed (ID: `74a002d7-b5a2-4a6f-9394-382e906e8ab8`) at the top of the page, styled with `width: 100%`
- [ ] **WRIT-02**: Article cards section with title, one-line description, and "Read on Substack" link for each article — minimum 3 placeholder cards with instructions to update
- [ ] **WRIT-03**: Link to full Substack archive (lindapetrini.substack.com)

### Coaching / Mentorship Page ("Tech & Soul")

- [ ] **COACH-01**: Page hero: "Tech & Soul" heading, introductory paragraph explaining 1:1 sessions and the course offering
- [ ] **COACH-02**: 1:1 sessions section: what is covered (5 topics from existing HTML), who it is for, Lalita testimonial, and "Book a free intro call" button linking to cal.com/lindapetrini/20min
- [ ] **COACH-03**: Cal.com inline embed on the coaching page so visitors can book without leaving the site (with explicit container `min-height` to prevent CSS conflicts)
- [ ] **COACH-04**: "Digital Sovereignty in the Age of AI" course section: description, 6-module list, and Beehiiv waitlist embed with "Waitlist open" badge
- [ ] **COACH-05**: Micro-trust signal immediately below the primary CTA: "Trusted by teams at Anthropic, Palisade, and Foresight Institute"

### Contact Page

- [ ] **CONT-01**: Email link where the address is assembled at runtime via JavaScript to prevent spam bot harvesting
- [ ] **CONT-02**: CV download button linking to `cv/linda-petrini-cv.pdf` (placeholder PDF path documented for Linda to upload)
- [ ] **CONT-03**: Social profile links (Twitter, LinkedIn, Substack) as a secondary contact method

### SEO & Analytics

- [ ] **SEO-01**: Every page has a unique `<title>` including "Linda Petrini" and a unique `<meta name="description">` of 150–160 characters
- [ ] **SEO-02**: Every page has `<link rel="canonical">` with the full absolute URL
- [ ] **SEO-03**: Every page has Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image` as absolute URL) and Twitter Card tags
- [ ] **SEO-04**: `sitemap.xml` listing all 6 pages with `<lastmod>` dates
- [ ] **SEO-05**: `robots.txt` permitting all crawlers (`User-agent: * / Allow: /`)
- [ ] **SEO-06**: Plausible Analytics script (one instance per page, no GA4) with outbound link click tracking enabled

### Performance & Quality

- [ ] **PERF-01**: Hero image compressed to WebP under 150KB with JPEG fallback, served with `fetchpriority="high"` (never `loading="lazy"` on LCP element)
- [ ] **PERF-02**: All images have descriptive `alt` attributes, explicit `width` and `height` attributes to prevent layout shift
- [ ] **PERF-03**: All SVG logos optimised (no bloated Illustrator output)
- [ ] **PERF-04**: Lighthouse scores ≥ 90 Performance, ≥ 95 SEO, ≥ 95 Accessibility on mobile
- [ ] **PERF-05**: All external links verified working: Cal.com booking, Beehiiv embed, Substack, Twitter, LinkedIn, all publication links

---

## v2 Requirements

### Enhancements

- **ENH-01**: Dark mode toggle (pink-scheme brand decision makes this low priority)
- **ENH-02**: Contact form with server-side handling (currently out of scope — email link sufficient)
- **ENH-03**: Real-time Substack article feed via RSS (currently manual article cards)
- **ENH-04**: Cal.com popup trigger from multiple CTAs site-wide (currently linking to Cal.com page)
- **ENH-05**: Case study pages for individual research projects with full writeups
- **ENH-06**: Testimonials carousel / rotating display (more testimonials added over time)

### Future Sections

- **FUTR-01**: Blog / long-form writing section separate from Substack (if Linda wants owned content)
- **FUTR-02**: Course platform integration when "Digital Sovereignty" course launches
- **FUTR-03**: Speaker page with talk descriptions and booking enquiry form

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| CMS or database | Static HTML only — no backend needed for this scale |
| React / Next.js / any JS framework | Unnecessary build overhead; pure HTML/CSS is simpler to host and maintain |
| Google Fonts CDN | GDPR risk (Munich court ruling) + latency; self-hosting WOFF2 instead |
| Google Analytics (GA4) | Requires cookie consent banner; GDPR-complex; Plausible is sufficient and privacy-respecting |
| Substack embed widget on Writing page | Poor styling control, adds tracking on own domain; linking out is cleaner |
| Payment processing | Cal.com handles booking; course payments out of scope until course launches |
| Server-side contact form | Static site; mailto link with JS obfuscation is sufficient for v1 |
| Mobile app | Web-first; no app needed |

---

## Traceability

*Populated by roadmapper — pending*

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 through FOUND-07 | Phase 1 | Pending |
| HOME-01 through HOME-06 | Phase 3 | Pending |
| ABOUT-01 through ABOUT-03 | Phase 4 | Pending |
| WORK-01 through WORK-03 | Phase 4 | Pending |
| WRIT-01 through WRIT-03 | Phase 4 | Pending |
| COACH-01 through COACH-05 | Phase 4 | Pending |
| CONT-01 through CONT-03 | Phase 4 | Pending |
| SEO-01 through SEO-06 | Phase 5 | Pending |
| PERF-01 through PERF-05 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 37 total
- Mapped to phases: 37
- Unmapped: 0 ✓

---
*Requirements defined: 2026-02-27*
*Last updated: 2026-02-27 after initial definition*
