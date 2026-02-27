# PITFALLS.md — Common Mistakes When Migrating a Personal Professional Website

**Context:** Linda Petrini migrating from Carrd (single-page) to self-hosted static HTML/CSS (multi-page). This document covers the most critical mistakes to avoid, organized by category. Each pitfall includes warning signs, a prevention strategy, and which phase of the project should address it.

---

## 1. SEO Migration Pitfalls

### 1.1 Losing Carrd's Indexed Page During URL Structure Change

**The problem:** Carrd serves a single-page site at the root URL (`lindapetrini.com/`). The new multi-page site splits content across `/about`, `/writing`, `/coaching`, etc. Google's index currently knows only the root URL. Moving to multi-page without a redirect and re-indexing strategy can cause a temporary — sometimes permanent — drop in organic traffic.

**Warning signs:**
- Google Search Console shows 404 errors or "URL not found" after launch
- The root URL returns no content or a blank page
- No `sitemap.xml` submitted post-launch

**Prevention strategy:**
- Keep `index.html` at the root as the canonical home page — do not redirect it away
- Submit a new `sitemap.xml` to Google Search Console within 24 hours of launch
- Verify in Search Console that all new page URLs are being crawled and indexed (not blocked by `robots.txt`)
- Because the Carrd site likely has minimal indexed pages beyond the root, the migration risk is low but not zero — check Search Console before migrating for any indexed deep URLs

**Phase:** Pre-launch (build phase) + first week post-launch

---

### 1.2 Missing Canonical Tags on Every Page

**The problem:** Without explicit `<link rel="canonical">` tags, search engines may index both `http://` and `https://` versions, or `www` and non-`www` versions, as separate duplicate pages. For a static HTML site with no server-side redirect configuration, this is a common oversight.

**Warning signs:**
- Both `https://lindapetrini.com/about` and `https://www.lindapetrini.com/about` are independently indexed
- Google Search Console shows duplicate content warnings

**Prevention strategy:**
- Add `<link rel="canonical" href="https://lindapetrini.com/[page]">` to the `<head>` of every HTML file, using the non-`www` HTTPS form consistently
- Configure the hosting provider (Netlify, GitHub Pages, etc.) to redirect `www` → non-`www` and `http` → `https` at the server/CDN level

**Phase:** Build phase — template-level, add to every page's `<head>`

---

### 1.3 Omitting Structured Data (Person Schema)

**The problem:** Personal professional sites benefit significantly from `Person` JSON-LD schema. Without it, Google cannot surface rich results (knowledge panel, sitelinks) and has less confidence about who the site represents. This is especially valuable for someone with a distinctive name like Linda Petrini.

**Warning signs:**
- No `<script type="application/ld+json">` blocks in page source
- Google's Rich Results Test returns no structured data detected

**Prevention strategy:**
- Add a `Person` schema block to `index.html` at minimum, covering: `name`, `url`, `jobTitle`, `sameAs` (Twitter, LinkedIn, Substack URLs), `image`, and `description`
- Validate using Google's Rich Results Test at `search.google.com/test/rich-results`
- Avoid common syntax errors: trailing commas before closing braces, mismatched quotes, and incorrect property names (properties must match schema.org spec exactly)

**Phase:** Build phase

---

### 1.4 Open Graph and Twitter Card Tags Missing or Wrong

**The problem:** When Linda shares her pages on LinkedIn or Twitter, the link preview is controlled by Open Graph meta tags. Missing or misconfigured OG tags result in ugly previews, no image, or the wrong title — significantly reducing click-through rates.

**Warning signs:**
- Sharing a page URL on LinkedIn/Twitter shows no image or uses a random image
- `og:image` points to a relative path instead of an absolute URL
- `og:description` is over 200 characters and gets truncated

**Prevention strategy:**
- Every page needs: `og:title`, `og:description` (under 200 chars), `og:image` (absolute URL, 1200×630px recommended), `og:url`, `og:type`
- The `og:image` must be an absolute URL — `https://lindapetrini.com/assets/og-image.jpg`, not `/assets/og-image.jpg`
- Test each page with LinkedIn's Post Inspector and Twitter's Card Validator before launch
- Create one dedicated OG image (1200×630px) for the site rather than relying on the hero photo (which may be portrait-cropped)

**Phase:** Build phase — add to every page `<head>`, test pre-launch

---

### 1.5 robots.txt Accidentally Blocking Crawlers

**The problem:** A common mistake when setting up a new static site is deploying a `robots.txt` with `Disallow: /` left over from a staging configuration. This blocks all search engine crawlers immediately and silently.

**Warning signs:**
- Google Search Console shows "Crawl anomaly" or zero new URLs indexed after launch
- Visiting `https://lindapetrini.com/robots.txt` shows `Disallow: /`

**Prevention strategy:**
- Use a permissive `robots.txt` for production:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://lindapetrini.com/sitemap.xml
  ```
- Reference the sitemap URL explicitly in `robots.txt`
- Never deploy with `Disallow: /` from a staging environment

**Phase:** Pre-launch checklist

---

## 2. Third-Party Embed Gotchas

### 2.1 Cal.com Embed Breaking from Global CSS

**The problem:** The Cal.com JavaScript embed injects an `<iframe>` into the page. Global CSS rules — particularly `* { box-sizing: border-box }`, `max-width` on containers, or `display: none` applied broadly — can hide or distort the Cal.com embed. Additionally, some sites have reported `cal-embed { display: none }` accidentally hiding the component.

**Warning signs:**
- Cal.com booking calendar appears blank or invisible
- Browser console shows CORS errors from `cal.com` when the site uses strict security headers (COEP)
- The inline embed renders at zero height

**Prevention strategy:**
- Use Cal's official embed snippet generator (`cal.com/embed`) rather than writing the integration manually — it handles host configuration, not full URLs in `calLink`
- Scope global CSS resets carefully; do not apply `overflow: hidden` to `body` or `html` as it can clip the Cal widget
- For inline embeds, always target a specific container `div` with an explicit `min-height` set
- Avoid setting `Cross-Origin-Embedder-Policy: require-corp` headers on static hosting unless you also allow Cal.com's origins
- Test the booking flow on mobile as well as desktop before launch

**Phase:** Build phase — test immediately after first embed attempt

---

### 2.2 Beehiiv Embed Leaving Excessive Whitespace

**The problem:** Beehiiv's iframe embed code includes a default height that frequently leaves large blank areas below the form on desktop and mobile. This is a known issue reported across multiple platforms (Squarespace, Framer). The iframe does not auto-resize to its content.

**Warning signs:**
- Large empty space below the Beehiiv form on desktop or mobile
- The embed renders correctly in Beehiiv's preview but breaks on the live page

**Prevention strategy:**
- After inserting the Beehiiv iframe, adjust the `height` attribute manually — start at `200px` and test across viewport sizes
- Consider using Beehiiv's API-based form approach (posting directly to their API endpoint) instead of the iframe for better style control
- Wrap the iframe in a `<div>` with `overflow: hidden` and a fixed height as a containment fallback
- Test on iOS Safari and Android Chrome specifically, as iframe height bugs are most common there

**Phase:** Build phase — test the coaching/waitlist page on multiple devices

---

### 2.3 Substack Embed Degrading Page Performance

**The problem:** Substack does not offer a native lightweight embed. Third-party solutions (iframely, custom RSS readers) or Substack's own iframe code load significant JavaScript and CSS payloads. This can add 200–500ms to page load time and affect Largest Contentful Paint scores.

**Warning signs:**
- Lighthouse performance score drops noticeably when the writing page loads the Substack embed
- Network tab shows Substack scripts loading synchronously, blocking render

**Prevention strategy:**
- Prefer linking to specific Substack articles rather than embedding a feed — this is simpler, faster, and fully under editorial control
- If a feed display is needed, build a static list of the 3–5 most recent articles with a manually updated date and excerpt — update it quarterly rather than embedding a live feed
- If a subscribe form is needed, use Beehiiv (already chosen for the waitlist) rather than Substack's iframe subscribe form
- Never use `<script>` tags that load Substack's embed asynchronously on the critical rendering path

**Phase:** Build phase — writing page architecture decision

---

## 3. Mobile Responsiveness Failures

### 3.1 CSS-Only Hamburger Menu Accessibility Failures

**The problem:** The "checkbox hack" (a hidden `<input type="checkbox">` toggling the nav via CSS) is commonly used for a no-JavaScript hamburger menu. While it works visually, it fails accessibility requirements: the toggle is not keyboard-focusable, screen readers cannot determine the menu is open or closed, and inner nav links receive focus even when the menu is visually closed.

**Warning signs:**
- Tabbing through the page focuses on nav links even when the hamburger menu is closed on mobile
- Screen readers announce the toggle as "checkbox" or just "menu" with no expanded/collapsed state
- Mobile navigation cannot be operated without a pointing device

**Prevention strategy:**
- Use a small amount of JavaScript for the hamburger toggle to properly set `aria-expanded`, `aria-controls`, and manage focus
- Minimum viable accessible hamburger:
  ```html
  <button aria-expanded="false" aria-controls="nav-menu" id="hamburger">Menu</button>
  <nav id="nav-menu" hidden>...</nav>
  ```
  ```js
  document.getElementById('hamburger').addEventListener('click', function() {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    document.getElementById('nav-menu').hidden = expanded;
  });
  ```
- When the menu is closed (`hidden` or `display: none`), child links cannot receive focus
- Test with keyboard-only navigation (Tab key) and a screen reader (VoiceOver on iOS)

**Phase:** Build phase — navigation component

---

### 3.2 Touch Target Size Too Small

**The problem:** Navigation links, social icons, and CTA buttons that are appropriately sized for desktop become too small on mobile. Google's mobile usability guidelines require touch targets of at least 48×48px.

**Warning signs:**
- Google Search Console shows "Clickable elements too close together" mobile usability errors
- Users on phones report mis-tapping nav links or social icons

**Prevention strategy:**
- Set minimum `padding: 12px` on all interactive elements so the clickable area meets 48px minimum
- Social icon links should be wrapped in `<a>` elements with explicit `display: inline-block; padding: 8px` rather than tight icon-only links
- Use Google's Mobile-Friendly Test at `search.google.com/test/mobile-friendly` before launch

**Phase:** Build phase — mobile breakpoint CSS

---

## 4. Contact / Email Link Spam Protection

### 4.1 Plaintext mailto: Link Harvested by Bots

**The problem:** Publishing a bare `<a href="mailto:linda@example.com">` in HTML exposes the email address to scraper bots that harvest addresses from page source code. This is the primary cause of spam to professional email addresses on personal websites.

**Warning signs:**
- Significant increase in spam after site launch
- Email address appears verbatim in the page's HTML source

**Prevention strategy:**
- Use JavaScript to assemble the email address at runtime rather than putting it in the HTML source:
  ```html
  <a href="#" id="email-link">Contact me</a>
  <script>
    const u = 'linda'; const d = 'lindapetrini.com';
    document.getElementById('email-link').href = 'mailto:' + u + '@' + d;
  </script>
  ```
- Alternatively, use HTML entity encoding for the displayed text (though bots routinely decode entities)
- JavaScript assembly is the most effective technique for static sites — it defeats crawlers that only parse HTML without executing JavaScript
- Do not use `display: none` alone on a real mailto link — bots still read `href`

**Phase:** Build phase — contact page and footer

---

### 4.2 No Contact Form Backend = Relying on Mailto

**The problem:** Static sites have no server-side form processing. If the design requires a contact form (rather than a mailto link), there is no way to handle submissions without a third-party service. Attempting to wire a form to a mailto action via HTML alone does not work reliably across browsers.

**Warning signs:**
- `<form action="mailto:...">` in the HTML — this is unreliable and opens the user's email client unexpectedly
- No third-party form service integrated

**Prevention strategy:**
- The current project scope uses an email link and CV download for contact — this is the right call for a static site; do not add a form without a backend
- If a form is ever added later, use a service like Formspree, Netlify Forms, or Formspark that processes submissions server-side
- Never use `action="mailto:"` on a form element — behavior is inconsistent across browsers and mobile clients

**Phase:** Scope decision (already made correctly — email link only)

---

## 5. Analytics Setup Mistakes

### 5.1 Double-Counting from Multiple Script Installations

**The problem:** If the analytics script (Plausible or Google Analytics) is included both in a shared template include AND added again on individual pages, every page view is counted twice. This results in inflated traffic numbers, artificially low bounce rates (since each "double hit" registers as a two-page session), and unreliable conversion data.

**Warning signs:**
- Bounce rate is suspiciously below 20% from day one
- Real-time analytics shows double the expected page views during manual testing
- Browser DevTools Network tab shows the analytics script loading twice per page

**Prevention strategy:**
- Audit every HTML file's `<head>` before launch — search for the analytics domain (`plausible.io`, `googletagmanager.com`) in every file to confirm it appears exactly once
- Keep the analytics snippet only in a shared header template or layout, not on individual pages
- For Plausible specifically: use `defer` on the script tag and confirm it appears once per page
- Test with browser DevTools on 3 different pages before launch

**Phase:** Pre-launch checklist

---

### 5.2 Not Setting Up Goal/Conversion Tracking

**The problem:** Installing analytics without defining conversion goals means you will have traffic data but no insight into what actually matters: how many people clicked "Book a Call," downloaded the CV, or signed up for the waitlist. This is the most common analytics mistake on personal professional sites.

**Warning signs:**
- Analytics shows page views only, no outbound link click data
- No way to tell which page drives the most bookings

**Prevention strategy:**
- For Plausible: enable "outbound link click" tracking by adding `event-outbound-links` attribute or using Plausible's automatically tracked outbound clicks feature (enabled in dashboard settings)
- Define these as key conversions to track:
  - Click on Cal.com booking link
  - Click on CV download link
  - Beehiiv form submission (as a custom event or via Plausible Goals)
  - Substack "Subscribe" click
- Set up goals in the analytics dashboard before launch so you have baseline data from day one

**Phase:** Build phase — add event attributes to key CTAs; configure goals in analytics dashboard before launch

---

### 5.3 Not Filtering Own Visits During Development

**The problem:** Every time the site builder views the site during development or after launch, those sessions inflate analytics data. Personal site traffic is often low enough that the owner's own visits can represent 20–40% of total "traffic."

**Warning signs:**
- Analytics shows active sessions when no one else should be on the site
- Bounce rate and session time are distorted by developer testing visits

**Prevention strategy:**
- For Plausible: install the browser extension that excludes your own visits, or use the IP-blocking feature in Plausible's settings
- For Google Analytics: create a filter to exclude internal IP addresses
- Alternatively, use a `localStorage` flag: Plausible respects the `plausible_ignore` key when set to `true` in `localStorage`

**Phase:** Pre-launch setup

---

## 6. Font Loading Performance (FOUT / FOIT)

### 6.1 Loading Google Fonts via External `<link>` Tag

**The problem:** The default Google Fonts implementation uses a `<link>` to `fonts.googleapis.com`, which triggers an external DNS lookup, TCP handshake, and TLS negotiation before the font can download. This adds 150–300ms of latency, delays First Contentful Paint, and can cause visible Flash of Unstyled Text (FOUT) or invisible text (FOIT) while the font loads.

**Warning signs:**
- Lighthouse performance audit shows "Eliminate render-blocking resources" pointing to `fonts.googleapis.com`
- Text visibly swaps from system font to Inter/Newsreader after the page loads
- Network tab shows font requests happening after page render begins

**Prevention strategy:**
- Self-host Inter and Newsreader font files using WOFF2 format (the only format needed for modern browsers)
- Download font files via [google-webfonts-helper](https://gwfh.mranftl.com/) — select only the weights used on the site (Regular 400, Medium 500, Bold 700 for Inter; Regular 400, Italic 400 for Newsreader)
- Add `font-display: swap` to all `@font-face` declarations to prevent invisible text
- Preload the most critical font files (the Inter regular weight) in the `<head>`:
  ```html
  <link rel="preload" href="/fonts/inter-v13-latin-regular.woff2" as="font" type="font/woff2" crossorigin>
  ```
- **Critical:** `crossorigin` attribute on `<link rel="preload">` for fonts is mandatory — omitting it causes the browser to download the font twice
- Self-hosting also removes GDPR concerns (no user data sent to Google)

**Phase:** Build phase — establish font loading strategy before writing any other CSS

---

### 6.2 Loading Unused Font Weights

**The problem:** Google Fonts URLs often include multiple weights by default (e.g., `300,400,500,600,700`). Each weight is a separate file download. Loading weights that are never actually used in the CSS wastes bandwidth and slows page load.

**Warning signs:**
- Network tab shows font weight files downloading that are never applied to any element
- Google Fonts URL contains 4+ weight values

**Prevention strategy:**
- Audit the design: identify exactly which weights are used in CSS
- For this project: Inter 400 (body), Inter 600 (headings), Newsreader 400 (body serif), Newsreader 400 italic (pullquotes) — likely 4 files total
- Load only those 4 files; do not include 300, 500, 700 unless explicitly used in CSS
- After launch, verify in DevTools that all loaded font files are actually applied somewhere on the page

**Phase:** Build phase

---

## 7. Image Optimization Mistakes

### 7.1 Hero Photo Served at Original Upload Size

**The problem:** Hero photos from modern cameras or phones are commonly 3–8MB at original resolution. Serving these directly causes LCP (Largest Contentful Paint) scores above 4 seconds, which Google classifies as "Poor" and penalizes in rankings.

**Warning signs:**
- Lighthouse shows LCP > 2.5 seconds with the hero image identified as the LCP element
- Network tab shows a `.jpg` or `.png` image over 500KB loading for the hero section
- PageSpeed Insights flags "Serve images in next-gen formats"

**Prevention strategy:**
- Compress the hero photo to WebP format at a maximum of 150–200KB for above-the-fold use
- Provide multiple sizes using `srcset` for responsive loading:
  ```html
  <img src="/assets/linda-hero-800.webp"
       srcset="/assets/linda-hero-400.webp 400w,
               /assets/linda-hero-800.webp 800w,
               /assets/linda-hero-1200.webp 1200w"
       sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
       alt="Linda Petrini, AI/ML researcher and coach"
       fetchpriority="high"
       width="800" height="800">
  ```
- Use Squoosh (`squoosh.app`) for manual compression or any local WebP converter
- Set explicit `width` and `height` attributes on all images to prevent Cumulative Layout Shift (CLS)

**Phase:** Build phase — image assets preparation

---

### 7.2 Adding `loading="lazy"` to the Hero Image

**The problem:** The hero image is in the viewport on initial page load. Applying `loading="lazy"` to it tells the browser to defer loading until it approaches the viewport — which it already is — adding unnecessary delay. This is one of the most common LCP mistakes.

**Warning signs:**
- Lighthouse shows hero image as LCP element with a high load delay
- The `loading="lazy"` attribute is on the `<img>` tag of the above-the-fold photo

**Prevention strategy:**
- Never apply `loading="lazy"` to any image visible in the initial viewport
- Use `fetchpriority="high"` on the hero image instead — this tells the browser to prioritize this download over other resources
- Apply `loading="lazy"` only to images below the fold (publication covers, testimonial photos, etc.)

**Phase:** Build phase — image attribute review

---

### 7.3 Missing Alt Text on Images

**The problem:** Missing `alt` attributes on images are both an accessibility failure and an SEO signal loss. Search engines use alt text to understand image content, and screen readers rely on it entirely.

**Warning signs:**
- Lighthouse accessibility audit shows "Image elements do not have [alt] attributes"
- Images with `alt=""` on non-decorative images

**Prevention strategy:**
- Every meaningful image must have descriptive alt text: `alt="Linda Petrini speaking at Foresight Institute event"`
- Logos should describe what they are: `alt="Anthropic logo"` not `alt="logo"`
- Purely decorative images (background textures, dividers) should have `alt=""`
- Run axe accessibility checker (browser extension) before launch

**Phase:** Build phase + pre-launch checklist

---

## 8. Broken Links and Redirect Patterns

### 8.1 Carrd URL Structure Not Mapped to New Site

**The problem:** Carrd single-page sites serve all content at the root URL (`lindapetrini.com/`). Any bookmarks or backlinks pointing to the root URL will still work. However, if any section anchor links were shared (e.g., `lindapetrini.com/#coaching`) and the new site puts that content at `/coaching`, those links will 404 silently.

**Warning signs:**
- Backlink checking (Ahrefs, Google Search Console) shows inbound links with hash fragments (`#section`)
- Old social media posts or newsletter mentions of the Carrd URL with anchor fragments

**Prevention strategy:**
- Check Google Search Console and Ahrefs (or similar) for all indexed/linked URLs before migrating
- For a Carrd single-page site, the primary concern is the root URL — which continues to work as `index.html`
- If any anchor fragment URLs were shared (`/#coaching`, `/#about`), add JavaScript on `index.html` to redirect on page load:
  ```js
  if (window.location.hash === '#coaching') window.location.replace('/coaching');
  ```
- Keep the Carrd site live (even in read-only form) until the new site is verified indexed by Google

**Phase:** Pre-launch — URL audit; launch week — redirect implementation

---

### 8.2 External Links Going Stale Post-Launch

**The problem:** The project has several critical external links: Cal.com booking URL, Substack URL, Beehiiv embed ID, LinkedIn, Twitter. If any of these change after launch (e.g., Cal.com handle changes, Substack URL changes), broken links silently degrade user experience and conversion rates.

**Warning signs:**
- "Page not found" on Cal.com booking link
- Beehiiv embed shows blank form or error

**Prevention strategy:**
- Create a link verification checklist of all external URLs in the project and test each manually before launch:
  - `cal.com/lindapetrini/20min`
  - `lindapetrini.substack.com`
  - Beehiiv embed ID `74a002d7-b5a2-4a6f-9394-382e906e8ab8`
  - Twitter: `twitter.com/petrini_linda`
  - LinkedIn: `linkedin.com/in/petrinilinda`
  - All publication links (AI Pathways report, Secure AI tech tree, Bezos report, ICLR paper)
- After launch, re-test all external links monthly — set a calendar reminder

**Phase:** Pre-launch checklist; ongoing maintenance

---

### 8.3 Redirect Chains When Changing URL Structure

**The problem:** If any pages are restructured after initial launch (e.g., `/services` renamed to `/work`), adding a second redirect on top of an existing one creates a chain. Redirect chains slow page load and dilute SEO value — Google recommends no more than 3 hops, and ideally 1.

**Warning signs:**
- Browser redirects through multiple URLs before settling on the final page
- Screaming Frog or similar crawler reports redirect chains

**Prevention strategy:**
- Plan the final URL structure before launch and commit to it — changing URLs after launch requires redirect management
- If a URL must change, update the original redirect to point directly to the final destination rather than chaining
- Keep a redirect map document (even a simple text file) that records all redirects implemented and their current targets

**Phase:** Architecture decision — finalize URL structure before build; maintain redirect map after launch

---

## 9. Credibility and Conversion Mistakes

### 9.1 Testimonials Without Specificity or Attribution

**The problem:** Generic testimonials ("Linda is great to work with!") provide almost no conversion value. The existing testimonials from Lalita and Allison Duettmann need to be specific, attributable, and verifiable to build trust with potential research clients and coaching prospects.

**Warning signs:**
- Testimonials do not mention a specific outcome or context
- No photo, title, or organization attached to the testimonial
- Testimonials appear to be invented (no last name, no context)

**Prevention strategy:**
- Display testimonials with: full name, title/role, organization, and a specific result or context mentioned
- Allison Duettmann (President of Foresight Institute) and Lalita — ensure their full professional context is listed
- If possible, link the testimonial to a verifiable source (LinkedIn recommendation, published endorsement)
- Place the most relevant testimonial near the CTA it supports — Allison's on the research/work page, coaching-relevant testimonials on the coaching page

**Phase:** Content phase — testimonial layout and copy

---

### 9.2 CTA Buried Below the Fold

**The problem:** The entire purpose of a professional personal site is to drive specific actions: book a call, read the newsletter, commission research. If the primary CTA ("Book a free call") appears only at the bottom of the page after extensive scrolling, most visitors will leave without taking action.

**Warning signs:**
- The primary CTA link is not visible without scrolling on a 1080p desktop screen
- The hero section is text-heavy with no action link

**Prevention strategy:**
- The hero section must contain at least one primary CTA button/link visible immediately on page load on both desktop and mobile
- For this site: "Book a free call" should link to `cal.com/lindapetrini/20min` from the hero, not just from the coaching page
- Secondary CTAs (newsletter, publications) can appear further down the page
- Test the above-the-fold rendering at 375px (iPhone SE), 768px (iPad), and 1280px (desktop)

**Phase:** Build phase — home page hero section design

---

### 9.3 Hiding or Underplaying Institutional Affiliations

**The problem:** "Trusted by Palisade, Anthropic, Foresight" is a significant credibility signal for Linda's target audience (AI/ML researchers, potential coaching clients). Burying these logos or mentioning them only in paragraph text significantly reduces their conversion impact.

**Warning signs:**
- Institution logos appear below the fold on the home page
- Logos are too small to be recognizable
- Affiliations mentioned only in body text without visual emphasis

**Prevention strategy:**
- Place the "Trusted by" logo row immediately below the hero section on the home page — this is the most effective placement for social proof
- Logos should be large enough to be recognized at a glance (minimum 80px height for recognizable wordmarks)
- Use actual logos (with permission / fair use) rather than text-only mentions

**Phase:** Build phase — home page layout

---

## Summary Table

| Pitfall | Severity | Phase |
|---------|----------|-------|
| Missing canonical tags | High | Build |
| No Person JSON-LD schema | Medium | Build |
| Missing/wrong Open Graph tags | High | Build |
| robots.txt blocking crawlers | Critical | Pre-launch |
| Cal.com embed broken by global CSS | High | Build |
| Beehiiv iframe excessive whitespace | Medium | Build |
| Substack embed degrading performance | Medium | Architecture |
| Inaccessible hamburger menu | High | Build |
| Touch targets too small on mobile | Medium | Build |
| Plaintext mailto harvested by bots | High | Build |
| Double analytics script installation | High | Pre-launch |
| No conversion goal tracking | Medium | Pre-launch |
| Google Fonts external link (FOUT/FOIT) | High | Build |
| Loading unused font weights | Low | Build |
| Hero photo served at original size | High | Build |
| `loading="lazy"` on hero image | High | Build |
| Missing alt text | Medium | Build |
| Carrd anchor fragment links 404ing | Low (likely) | Pre-launch |
| External links going stale | Medium | Pre-launch |
| Vague testimonials | Medium | Content |
| CTA buried below fold | High | Build |
| Affiliations underplayed | Medium | Build |

---

## Sources

- [SEO Migration 2025: The Complete Guide — VELOX](https://www.veloxmedia.com/blog/seo-migration-2026-the-complete-guide)
- [Site Migration SEO Guide: Preserve Rankings & Traffic — Search Engine Land](https://searchengineland.com/guide/ultimate-site-migration-seo-checklist)
- [Website Migration SEO Best Practices — Search Engine Journal](https://www.searchenginejournal.com/essential-steps-website-migration/491862/)
- [Cal.com Embed Instructions](https://cal.com/help/embedding/embed-instructions)
- [Cal.com CORS Issue — GitHub #14547](https://github.com/calcom/cal.com/issues/14547)
- [Cal.com CSS Breaking Embed — GitHub #22777](https://github.com/calcom/cal.com/issues/22777)
- [Beehiiv Creating an Embedded Subscribe Form](https://www.beehiiv.com/support/article/12977090590487-creating-and-embedding-beehiiv-subscribe-forms)
- [Beehiiv Iframe White Space — Squarespace Forum](https://forum.squarespace.com/topic/339099-beehiiv-embed-code-leaves-a-lot-of-white-space-below-it-on-desktop-and-mobile/)
- [Best Practices for Third-Party Embeds — web.dev](https://web.dev/articles/embed-best-practices)
- [Self-Host Google Fonts for Better Core Web Vitals — corewebvitals.io](https://www.corewebvitals.io/pagespeed/self-host-google-fonts)
- [Making Google Fonts Faster — sia.codes](https://sia.codes/posts/making-google-fonts-faster/)
- [Fix Your Website's LCP by Optimizing Image Loading — MDN Blog](https://developer.mozilla.org/en-US/blog/fix-image-lcp/)
- [Optimize the LCP Image — corewebvitals.io](https://www.corewebvitals.io/core-web-vitals/largest-contentful-paint/optimize-lcp-image)
- [Mobile Navigation Accessibility — a11ymatters.com](https://a11ymatters.com/pattern/mobile-nav/)
- [Making an Accessible Hamburger Menu — DEV Community](https://dev.to/savvasstephnds/your-hamburger-menu-button-is-inaccessible-here-s-how-to-fix-it-7n)
- [Email Obfuscation: What Works in 2026 — Spencer Mortensen](https://spencermortensen.com/articles/email-obfuscation/)
- [Stop Spam Harvesting with Email Obfuscation — SitePoint](https://www.sitepoint.com/stop-spam-harvesting-email-obfuscation/)
- [Google Analytics Tracking Mistakes — Databox](https://databox.com/google-analytics-tracking-mistakes)
- [Plausible: Is Analytics Working Correctly?](https://plausible.io/blog/is-analytics-working-correctly)
- [Canonical URL Guide — Semrush](https://www.semrush.com/blog/canonical-url-guide/)
- [JSON-LD Person Schema Example — jsonld.com](https://jsonld.com/person/)
- [Open Graph Meta Tags Complete Guide — Ahrefs](https://ahrefs.com/blog/open-graph-meta-tags/)
- [Carrd SEO Limitations — autoposting.ai review](https://autoposting.ai/carrd-review/)
- [Common Robots.txt Issues — Search Engine Journal](https://www.searchenginejournal.com/common-robots-txt-issues/437484/)
- [Social Proof Impact on Conversions — genesysgrowth.com](https://genesysgrowth.com/blog/social-proof-conversion-stats-for-marketing-leaders)

---

*Research conducted: 2026-02-27. All external links verified at time of writing.*
