# Linda Petrini — Personal Website

## What This Is

A personal website for Linda Petrini (lindapetrini.com), an AI/ML researcher and coach. The site migrates from Carrd to a self-hosted static HTML/CSS site with multiple proper pages, SEO optimization, analytics, and working integrations. It maintains the existing pink color scheme and positions Linda across her three main roles: researcher, writer, and coach/mentor.

## Core Value

Visitors immediately understand who Linda is and what she offers — and can take action (book a call, read her work, sign up for her course waitlist) without friction.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Multi-page static site replacing current Carrd single-page
- [ ] Home page with hero, photo, trusted-by logos, and key calls-to-action
- [ ] About page: past story + what she cares about now
- [ ] Services/Work page: research publications + research support clients + open to new work
- [ ] Writing page: Substack articles with blurbs + newsletter signup
- [ ] Coaching/Mentorship page ("Tech & Soul"): 1:1 sessions + Digital Sovereignty course waitlist
- [ ] Contact: email link + CV download
- [ ] Pink color scheme preserved from current site
- [ ] Testimonials from Lalita and Allison Duettmann featured prominently
- [ ] "Trusted by" logos: Palisade, Anthropic, Foresight
- [ ] SEO: proper meta tags, structured data, sitemap, canonical URLs
- [ ] Analytics setup (e.g., Plausible or Google Analytics)
- [ ] All external links verified: Cal.com booking, Substack, Beehiiv waitlist, social profiles
- [ ] CV accessible for download
- [ ] Mobile-responsive navigation with hamburger menu
- [ ] Social links: Twitter (@petrini_linda), LinkedIn (petrinilinda), Substack (lindapetrini.substack.com)

### Out of Scope

- CMS or database — static HTML only, no backend
- Blog/CMS integration beyond Substack embed links
- Payment processing — Cal.com handles booking
- Dark mode — pink scheme is intentional brand choice
- React/Next.js — pure HTML/CSS for simplicity and hosting flexibility

## Context

- Current site: https://lindapetrini.com/ on Carrd — single page, not SEO-optimized
- Existing HTML template exists (from a prior refactor attempt) covering the coaching/mentorship page structure with Inter + Newsreader fonts, nav, footer
- Tech stack already established: static HTML/CSS, Google Fonts (Inter + Newsreader), pink CSS variables
- Booking: cal.com/lindapetrini/20min (free 20-min intro call)
- Course waitlist: Beehiiv embed (ID: 74a002d7-b5a2-4a6f-9394-382e906e8ab8)
- Substack: lindapetrini.substack.com
- Research publications to link: AI Pathways report, Secure AI tech tree, Bezos report, ICLR paper
- Research clients: Palisade, Anthropic

## Constraints

- **Tech Stack**: Static HTML/CSS only — no build tools, no framework, plain files that can be hosted anywhere
- **Design**: Pink color scheme is non-negotiable brand choice
- **Fonts**: Inter (sans) + Newsreader (serif) — already established
- **Hosting**: Must be deployable to any static host (Netlify, GitHub Pages, etc.)
- **Content**: About page copy to be written by Linda — site structure should be ready for her to fill in

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static HTML/CSS over CMS | Simplest hosting, no maintenance overhead, matches existing template | — Pending |
| Keep Inter + Newsreader fonts | Already in existing template, good pairing for professional/warm feel | — Pending |
| Separate pages (not single-page scroll) | User explicitly requested actual separate pages vs Carrd single-page | — Pending |
| Beehiiv for course waitlist | Already implemented in existing template | — Pending |
| Cal.com for booking | Already in use, no need to change | — Pending |

---
*Last updated: 2026-02-27 after initialization*
