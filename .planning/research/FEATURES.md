# FEATURES.md — Personal Website Features for Researcher/Coach/Writer

**Research Date:** 2026-02-27
**Subject:** Linda Petrini — AI/ML researcher, technical writer, AI coach/mentor
**Purpose:** Inform requirements definition for lindapetrini.com rebuild

---

## Context

This research answers: what features do professional personal websites for researcher/consultant/coach hybrids need in 2026? The goal is to distinguish table stakes from differentiators, identify anti-features, and give conversion-focused guidance specific to Linda's three roles: researcher, writer, and coach/mentor.

---

## 1. Table Stakes — Must Have or Visitors Bounce

These are non-negotiable. Without them, the site fails before a visitor reads a word.

### Technical Foundation

- **Mobile-first responsive design** — 68% of coaching website traffic comes from mobile. 88% of visitors will not return after a bad mobile experience. This is not optional.
- **Page load under 2.5 seconds** — every second beyond 3 seconds costs approximately 7% of potential conversions. Static HTML gives Linda a structural advantage here.
- **SSL / HTTPS** — browsers flag non-HTTPS sites as insecure. Instant credibility kill.
- **Readable typography at all sizes** — Inter (sans) and Newsreader (serif) are already established. Ensure minimum 16px body text on mobile.
- **Working navigation** — hamburger menu on mobile, clear labels, max 5–6 nav items. More than 6 items creates confusion and dilutes conversion paths.

### Credibility Signals (Immediate)

- **Professional photo** — human faces are processed faster than any text. The hero section must include a quality photo of Linda. Brains respond to faces; this is hardwired psychology.
- **Clear value proposition above the fold** — visitors decide whether to stay within 5 seconds. The headline must immediately answer: who is this for, what do they get, why Linda. "Unlock Your Potential" fails. "AI research and coaching for teams navigating the frontier" succeeds.
- **Name in the page title and H1** — foundational for personal-name SEO. Every page title should follow the pattern: `[Page Topic] — Linda Petrini`.
- **Contact access** — email link and/or booking link must be findable within 2 clicks from any page. Burying contact information is the single most common failure mode.

### Core Pages

- **Home** — hero, brief role overview, social proof (logos + quotes), primary CTAs
- **About** — not a CV dump; a story of who Linda is and what she cares about now
- **Services/Work** — research publications + research support clients + availability
- **Writing** — Substack articles with blurbs, newsletter signup
- **Coaching/Mentorship** — 1:1 sessions + Digital Sovereignty course waitlist
- **Contact** — email link + CV download

### Social Links Visible Sitewide

Twitter, LinkedIn, and Substack links in the footer (and/or header) of every page. These are trust signals and discovery paths.

---

## 2. Differentiators — What Makes the Site Memorable and Convert

These elements separate a site that generates bookings and subscribers from one that gets polite interest and nothing else.

### Hero Section Execution

- **Headline formula**: Lead with clarity, not cleverness. Name the outcome for the reader, not what Linda does. Example structure: `[Who I help] [achieve what outcome] [in what context]`.
- **Subheadline**: Expands on the headline promise, adds a touch of specificity — this is where voice and personality can appear.
- **Photo in the hero** — not a stock image, not an abstract visual. Linda's actual face, professional but warm.
- **Primary CTA immediately visible** — "Book a Free 20-Min Call" (links to cal.com/lindapetrini/20min). Not below the fold.
- **Micro-trust signal under the CTA** — one line: "Trusted by teams at Anthropic, Palisade, and Foresight Institute" or a line count of publications/clients. This reduces hesitation right at the moment of decision.

### Social Proof Architecture

Social proof placed strategically throughout the page — not dumped in one testimonials section at the bottom — delivers measurably higher conversions.

**Placement strategy:**
1. **Above fold or immediately below hero** — "Trusted by" logo bar: Palisade, Anthropic, Foresight Institute. Recognizable names create instant authority transfer.
2. **After role descriptions** — 1–3 short testimonials from real clients with full names. Lalita's and Allison Duettmann's testimonials are particularly valuable; Allison's name carries weight in the AI safety community.
3. **Near booking CTA** — placing a testimonial immediately before or after the booking button is one of the highest-leverage placements. It addresses last-moment hesitation.
4. **On the Coaching page** — specific testimonials about the coaching/mentorship experience, separate from research credibility.

**Testimonial best practices:**
- Real names, real roles, real companies. No initials, no "— Anonymous."
- Outcome-focused wording: what changed for the client, not how great Linda is.
- 2–4 sentences is the ideal length. Long testimonials get skimmed.
- Photo of the testimonial giver increases credibility but is optional if not available.

### Publication/Research Showcase

For a researcher hybrid, publications are social proof of a different kind — they establish intellectual authority. The Work page should:
- List each publication with title, co-authors (if any), publication venue/org, and a one-sentence description of its contribution
- Link directly to the publication
- Frame them around the problem they address, not just the title
- "Research I've published" reads warmer than an academic CV list

### CTAs for the Three Roles

Each role needs its own primary conversion path. Never make visitors figure out which CTA is meant for them.

**Coach CTA:**
- Primary: "Book a Free 20-Min Intro Call" → cal.com/lindapetrini/20min
- Embed Cal.com inline on the coaching page (keeps visitors on-site, removes friction)
- Secondary: Course waitlist via Beehiiv embed for Digital Sovereignty
- Reassurance line under the booking button: "No commitment. 20 minutes to see if it's a fit."

**Writer/Newsletter CTA:**
- "Read my writing on Substack" + preview of 3 recent articles with titles and one-sentence descriptions
- Substack signup form embedded on the Writing page — not just a link to Substack
- Email signup in the site footer sitewide (low-friction, persistent availability)
- Avoid the Substack iframe's default fixed width — set width to 100% for mobile compatibility

**Researcher CTA:**
- "Open to new research collaborations — [Get in Touch]"
- CV download link — prominently available on both the About page and Contact page

### Writing Page Best Practices for Substack Integration

The Writing page should function as a curated showcase that drives two outcomes: (1) subscribe to the newsletter, (2) read a specific article.

**Structure:**
1. Brief description of what the newsletter covers and who it's for (2–3 sentences)
2. Substack signup embed (styled to match site, width set to 100%)
3. Featured/recent articles: 3–6 articles with title, date, one-line description, and "Read on Substack" link
4. Optional: a "best of" or "start here" recommendation for first-time visitors

**Technical note:** The native Substack iframe embed can look broken on mobile. Set the iframe width to `100%` rather than the default `480px`. For maximum brand consistency, substackapi.com offers a custom-styled embed that removes Substack's branding and watermark.

**What not to do:** Don't just link to Substack and walk away. The Writing page should give visitors enough of a taste that they subscribe before leaving your domain.

### About Page that Converts

The About page is one of the highest-converting pages on professional service sites when done right. Most fail because they list credentials instead of making a human connection.

**What works:**
- Lead with a brief (2–3 sentence) present-tense statement of what Linda does and why it matters now
- Tell the origin story — what brought her from research into coaching? What did she see that others weren't seeing?
- What she cares about: AI safety, human flourishing, the intersection of technical rigor and human development
- Credentials as supporting evidence, not the lead
- End with a CTA: "If this resonates, let's talk" → booking link

**What to avoid:**
- Opening with "I have a PhD in..." or listing degrees in the first paragraph
- Chronological life story with no narrative arc
- Generic mission statement language ("I'm passionate about helping people...")

### Cal.com Booking Integration

Cal.com supports multiple embed formats:
- **Inline calendar** — embedded directly on the Coaching page. Best for conversion because visitors never leave the site.
- **Popup on button click** — triggered by "Book a Call" button anywhere on the site. Good for homepage and nav.
- **Floating button** — persistent across all pages. Useful but can feel aggressive; use sparingly.

**Recommendation for Linda's site:**
- Inline embed on the Coaching page (primary conversion point)
- Popup-on-click for the "Book a Call" CTA in the hero and nav
- Customize Cal.com embed colors to match the pink brand scheme

---

## 3. Anti-Features — What Hurts Professional Credibility or Conversion

### Design Anti-Patterns

- **Autoplay video or audio** — universally disliked, drives immediate exits
- **Popup overload** — newsletter popups on page load before a visitor has read anything destroy trust. Use exit-intent or time-delayed popups if at all.
- **Generic stock photography** — undermines the personal brand. If it's not Linda's actual photo, it signals inauthenticity.
- **Dark patterns in navigation** — hidden nav items, hover-only menus that break on mobile, dropdowns with more than 5 items
- **Walls of text** — no white space, no headers, no scannable structure. Readers scan before they read.

### Messaging Anti-Patterns

- **Vague hero headline** — "Welcome to my website," "Unlocking human potential," "Bridging technology and humanity." These say nothing. Visitors leave.
- **Trying to appeal to everyone** — Linda has three distinct audiences (research clients, coaching clients, newsletter readers). Each needs to quickly recognize they're in the right place. But the hero can't speak to all three simultaneously — pick the primary audience for the homepage hero, then let the navigation serve the others.
- **CV-first About page** — listing credentials before establishing why the visitor should care loses readers. Story first, credentials as support.
- **Multiple competing CTAs at the same decision point** — "Book a call AND sign up for the newsletter AND download the CV AND follow me on Twitter" on the same screen creates paralysis. Prioritize: one primary, one secondary per section.

### Technical Anti-Patterns

- **No canonical URLs or sitemap** — critical for SEO. Without them, search engines may index duplicate content and suppress rankings.
- **Missing meta descriptions** — every page needs a unique meta description of 150–160 characters. This is what appears in search results.
- **Broken external links** — dead links to old publications or social profiles destroy credibility on first encounter. All links must be verified before launch.
- **No alt text on images** — accessibility failure and SEO loss on every image.
- **Slow-loading images** — use WebP format, compress hero images, lazy-load below-fold images.

### Credibility Killers

- **Outdated "last updated" dates** — any visible date on the site that's more than a year old signals neglect
- **Missing testimonials** — for a coach/consultant, the absence of social proof raises the question "why isn't anyone vouching for this person?"
- **Coaching page without any booking mechanism** — if a visitor is convinced and ready to book but has to email first, most will not follow through
- **Inconsistent branding across pages** — different color schemes, font sizes, or nav structures between pages signal a site that wasn't built with care

---

## 4. SEO — Personal Brand SEO Specifics

### Name-First SEO

Personal brand SEO centers on owning the search results for "Linda Petrini" and secondary terms like "Linda Petrini AI" and "Linda Petrini AI coach."

**Foundational requirements:**
- Full name in `<title>` of every page: `About — Linda Petrini` not just `About`
- Name in the `<h1>` of the homepage
- Consistent name spelling across all pages and social profiles (no "Lin Petrini" or "L. Petrini" anywhere)
- `<meta name="description">` on every page, unique per page, including name naturally

### Structured Data (JSON-LD)

Person schema markup helps search engines confidently identify Linda as a distinct entity — critical when AI-powered search models (Google Gemini, Perplexity) build knowledge graphs.

**Recommended Person schema properties:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Linda Petrini",
  "url": "https://lindapetrini.com",
  "image": "https://lindapetrini.com/images/linda-petrini.jpg",
  "jobTitle": "AI Researcher and Coach",
  "description": "AI/ML researcher, technical writer, and AI coach/mentor",
  "sameAs": [
    "https://twitter.com/petrini_linda",
    "https://www.linkedin.com/in/petrinilinda",
    "https://lindapetrini.substack.com"
  ],
  "worksFor": [
    {"@type": "Organization", "name": "Palisade"},
    {"@type": "Organization", "name": "Anthropic"}
  ]
}
```

Include this on the homepage `<head>`. The `sameAs` array linking to Twitter, LinkedIn, and Substack is the most important element for entity disambiguation — especially important given that "Linda Petrini" may not be a uniquely common name but schema reinforces the connection across platforms.

### Technical SEO Checklist

- **Sitemap.xml** — list all pages, submit to Google Search Console
- **Robots.txt** — allow all pages to be crawled
- **Canonical URLs** — `<link rel="canonical" href="https://lindapetrini.com/about/">` on each page
- **Open Graph tags** — for social sharing: `og:title`, `og:description`, `og:image`, `og:url` on every page
- **Twitter Card tags** — `twitter:card`, `twitter:site`, `twitter:title`, `twitter:description`, `twitter:image`
- **Descriptive page titles** — 50–60 characters, include primary keyword and name

### Niche SEO: AI Safety + AI Coaching

Secondary keyword opportunities to work into page copy naturally (not stuffed):

- "AI safety researcher" — About page, homepage meta description
- "AI coach" / "AI mentor" — Coaching page title and H1
- "AI literacy coaching" / "AI coaching for leaders" — Coaching page body copy
- "AI research writer" — Writing page description
- "Digital Sovereignty course" — Coaching page for the course waitlist

**Content SEO note:** The publication titles (AI Pathways report, Secure AI tech tree, Bezos report, ICLR paper) should be linked with descriptive anchor text. Search engines (and AI search models) index these associations — they connect Linda's identity to specific subject matter expertise.

### Answer Engine Optimization (AEO)

In 2026, a meaningful portion of discovery happens through AI-generated answers (Perplexity, Google AI Overviews, ChatGPT). To appear in these:
- Write clearly structured content with factual claims, not just vague expertise language
- Use FAQ-style content where natural (especially on the Coaching page)
- Schema markup (above) is foundational
- External mentions from authoritative sources (Foresight Institute, Anthropic, conference papers) are more powerful than any on-site optimization

---

## 5. Conversion Patterns by Page

### Homepage

**Goal:** Orient all three audiences, establish credibility, drive to the right sub-page.

Priority order of sections:
1. Hero: photo + headline + subheadline + primary CTA ("Book a Call") + secondary CTA ("Read My Writing")
2. Trusted-by logos: Palisade, Anthropic, Foresight Institute — immediately below hero
3. Role cards: three brief sections (Researcher / Writer / Coach) each with a one-sentence description and a link
4. Featured testimonial: 1–2 quotes from Lalita and Allison Duettmann
5. Newsletter signup teaser: 1 sentence + Substack link or inline signup
6. Footer: social links, CV download, contact email

### Coaching Page ("Tech & Soul")

**Goal:** Book a 20-min intro call or join the course waitlist.

Priority order:
1. Clear headline naming who this is for
2. What coaching with Linda looks like (not what she does, what the client experiences)
3. Testimonial from a coaching client
4. Inline Cal.com embed (book the 20-min call)
5. Digital Sovereignty course section: description + Beehiiv waitlist embed
6. FAQ: 3–5 common questions addressing hesitations

### Writing Page

**Goal:** Get visitors to subscribe to the Substack newsletter.

Priority order:
1. Headline: what the newsletter is about and who it's for
2. Substack signup embed (styled, mobile-responsive)
3. Featured articles: 3–6 recent/best pieces with titles + one-line descriptions + "Read on Substack" links
4. Social proof: subscriber count if notable, or a quote about the newsletter

### About Page

**Goal:** Build trust, create connection, drive to coaching booking or newsletter.

Priority order:
1. Present-tense lead: what Linda does and why it matters now
2. Origin story: the path from research into coaching, what she sees
3. What she cares about: AI safety, human development at the technical frontier
4. Credentials as supporting evidence (not the lead)
5. Testimonial or recognition
6. Closing CTA: "If this resonates, let's talk" → booking link + newsletter link

---

## 6. Summary Matrix

| Feature | Category | Priority | Conversion Impact |
|---|---|---|---|
| Professional headshot in hero | Table Stakes | P0 | Very High |
| Clear headline (outcome-focused) | Table Stakes | P0 | Very High |
| Mobile-responsive design | Table Stakes | P0 | High |
| Primary CTA above fold | Table Stakes | P0 | Very High |
| Page speed < 2.5s | Table Stakes | P0 | High |
| SSL / HTTPS | Table Stakes | P0 | Medium (trust) |
| Working navigation (≤6 items) | Table Stakes | P0 | Medium |
| Social links in footer | Table Stakes | P1 | Medium |
| Meta descriptions on all pages | Table Stakes | P1 | Medium (SEO) |
| Trusted-by logo bar | Differentiator | P0 | Very High |
| Testimonials near CTA | Differentiator | P0 | Very High |
| Inline Cal.com embed | Differentiator | P0 | Very High |
| Substack embed (not just link) | Differentiator | P1 | High |
| Person schema markup (JSON-LD) | Differentiator | P1 | High (SEO/AEO) |
| Origin story on About page | Differentiator | P1 | High |
| Publication list with framing | Differentiator | P1 | High |
| FAQ on Coaching page | Differentiator | P2 | Medium |
| Sitemap.xml | Differentiator | P1 | Medium (SEO) |
| Open Graph / Twitter Card tags | Differentiator | P1 | Medium |
| Autoplay video/audio | Anti-Feature | — | Kills conversion |
| Popup on page load | Anti-Feature | — | Damages trust |
| CV-first About page | Anti-Feature | — | Loses readers |
| Generic stock photos | Anti-Feature | — | Undermines brand |
| Multiple competing CTAs | Anti-Feature | — | Creates paralysis |
| Broken external links | Anti-Feature | — | Destroys credibility |

---

## Sources

- [The 10 Steps to Building a Client-Generating Consulting Website (2025) — Consulting Success](https://www.consultingsuccess.com/consulting-website)
- [Creating a Consulting Landing Page That Turns Visitors Into Clients — Melisa Liberman](https://www.melisaliberman.com/blog/consulting-landing-page)
- [The Psychology Behind High-Converting Coaching Websites — ContactOut Blog](https://blog.contactout.com/2025/09/the-psychology-behind-high-converting-coaching-websites/)
- [Landing Page Tips for Coaches & Consultants — Chris Olson Designs](https://www.chrisolsondesigns.com/blog/how-coaches-and-consultants-can-build-a-high-converting-landing-page)
- [Top Features for a Winning Consultant Website — Knapsack Creative](https://knapsackcreative.com/blog-industry/consultant-website-essential-features)
- [Small Business Website Must-Haves: 2026 Conversion Checklist — Good Fellas Digital Marketing Agency](https://www.goodfellastech.com/blog/small-business-website-must-haves-2026-conversion-checklist)
- [Social Proof Impact on Conversions — Genesys Growth](https://genesysgrowth.com/blog/social-proof-conversion-stats-for-marketing-leaders)
- [How to Use Schema.org "Person" Markup for Identity Branding and SEO Visibility in 2025 — OptimizeUp](https://optimizeup.com/schema-org-person-markup-identity-branding-2025/)
- [Using @id in Schema.org Markup for SEO, LLMs & Knowledge Graphs — Momentic Marketing](https://momenticmarketing.com/blog/id-schema-for-seo-llms-knowledge-graphs)
- [How to Embed a Substack Form in Your Website — Brilliant Author](https://brilliantauthor.com/articles/embed-substack-in-website)
- [Integrating Substack Newsletter into Your Portfolio — Lance Valle](https://lancevalle.substack.com/p/integrating-substack-newsletter-into)
- [Cal.com Embed Documentation](https://cal.com/embed)
- [Hero Section Design: Best Practices & Examples for 2026 — Perfect Afternoon](https://www.perfectafternoon.com/2025/hero-section-design/)
- [Structured Data & Schema Markup for SEO in 2026 — Does Infotech](https://doesinfotech.com/the-role-of-structured-data-schema-markup-in-seo/)
