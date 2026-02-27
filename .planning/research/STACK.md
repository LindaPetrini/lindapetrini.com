# Stack Research: Static Personal Website (2026)

**Research date:** 2026-02-27
**For:** Linda Petrini personal website (lindapetrini.com)
**Scope:** Static HTML/CSS, no framework, no build tools, SEO, analytics, third-party embeds (Cal.com, Beehiiv, Substack)

---

## Recommended Stack

### HTML/CSS Structure

**Decision: Vanilla HTML5 + CSS Custom Properties. No framework, no build step.**

This is the right call for this project. The constraints (deployable anywhere, no maintenance overhead, existing template) all point away from a static site generator. The overhead of learning Eleventy or configuring Astro is not justified for a ~6-page site with a single author and no dynamic content pipeline.

**Confidence: High**

#### HTML Baseline

- Use semantic HTML5 elements throughout: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<aside>`
- `lang="en"` on every `<html>` element
- `<meta charset="UTF-8">` and `<meta name="viewport" content="width=device-width, initial-scale=1.0">` on every page
- Keep `<head>` order consistent: charset > viewport > title > description > canonical > OG/Twitter > structured data > fonts > stylesheet

#### CSS Architecture

**Use CSS Custom Properties (variables) for the design system.** The existing pink color scheme is already implemented this way. This is the correct pattern — no Sass, no PostCSS, no preprocessor needed for a site this size.

Suggested variable namespace (already partially established):

```css
:root {
  /* Colors */
  --color-primary: #e8a0b4;       /* pink */
  --color-primary-dark: #c47a94;  /* hover state */
  --color-text: #1a1a2e;
  --color-text-muted: #6b7280;
  --color-bg: #ffffff;
  --color-bg-soft: #fdf2f5;       /* light pink tint */

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-serif: 'Newsreader', Georgia, serif;

  /* Spacing scale */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2.5rem;
  --space-xl: 4rem;

  /* Layout */
  --container-max: 1100px;
  --container-padding: 1.25rem;
}
```

**Confidence: High**

---

### CSS Reset

**Use Andy Bell's "A More Modern CSS Reset" (2024 version from piccalil.li)**

Do NOT use the old normalize.css (last meaningfully updated 2018, targets IE). Do NOT use a heavy-handed reset like Eric Meyer's — browser defaults are much better in 2026 and you'll waste time restyling basics.

Bell's reset is the current community standard for projects that want a clean slate without fighting the browser:

```css
/* Paste inline at top of your main stylesheet */
*, *::before, *::after { box-sizing: border-box; }
html {
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}
body, h1, h2, h3, h4, p, figure, blockquote, dl, dd { margin-block-end: 0; }
ul[role='list'], ol[role='list'] { list-style: none; }
body { min-height: 100vh; line-height: 1.5; }
h1, h2, h3, h4, button, input, label { line-height: 1.1; }
h1, h2, h3, h4 { text-wrap: balance; }
a:not([class]) { text-decoration-skip-ink: auto; color: currentColor; }
img, picture { max-width: 100%; display: block; }
input, button, textarea, select { font-family: inherit; font-size: inherit; }
textarea:not([rows]) { min-height: 10em; }
:target { scroll-margin-block: 5ex; }
```

Why each rule matters:
- `box-sizing: border-box` — padding doesn't blow out widths; critical for responsive layout
- `text-size-adjust: none` — prevents Safari/Chrome mobile from inflating font sizes in landscape
- Margin removal — stops `<p>` and heading tags from creating unwanted gaps at edges of containers
- `ul[role='list']` — Safari strips list semantics when `list-style: none` is set; the role attribute restores it
- `text-wrap: balance` — makes multi-line headings wrap symmetrically without manual `<br>` tags
- `img { display: block }` — prevents the 4px phantom gap under images inside containers

**Confidence: High**

Source: [A (more) Modern CSS Reset — Piccalilli](https://piccalil.li/blog/a-more-modern-css-reset/)

---

### Fonts

**Self-host Inter and Newsreader as variable fonts via Google Fonts download.**

Do NOT serve them from `fonts.googleapis.com`. Two reasons:

1. **GDPR risk.** A Munich court ruled in 2022 that loading Google Fonts from Google's CDN transfers user IP addresses to Google without consent, violating GDPR. This ruling applies broadly to EU visitors. Linda's audience (AI/ML researcher, likely international tech audience) will include EU visitors.
2. **Performance.** Self-hosting eliminates a third-party DNS lookup + connection. Variable font files cover all weights in one request.

**How to self-host:**
1. Go to [google-webfonts-helper.herokuapp.com](https://gwfh.madebyeight.de/) or download directly from [fonts.google.com](https://fonts.google.com)
2. Download the variable font files (`Inter[wght].woff2`, `Newsreader[wght,ital].woff2`)
3. Place in `/fonts/` directory
4. Declare with `@font-face` in CSS using `font-display: swap`

```css
@font-face {
  font-family: 'Inter';
  src: url('../fonts/Inter-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Newsreader';
  src: url('../fonts/Newsreader-Variable.woff2') format('woff2');
  font-weight: 200 800;
  font-style: normal;
  font-display: swap;
}
```

`font-display: swap` shows system fallback immediately, then swaps to Inter/Newsreader once loaded — better Core Web Vitals than `block` or `auto`.

**Confidence: High**

Sources:
- [Google Fonts GDPR Compliance — Usercentrics](https://usercentrics.com/knowledge-hub/google-fonts-gdpr-compliant/)
- [Inter Font Update: Don't rely on Google Fonts — Pimp my Type](https://pimpmytype.com/google-fonts-hosting/)

---

### SEO Meta Tags

Every page needs the following in `<head>`. This is not optional — it's the baseline for appearing correctly in search results and social shares.

#### Required per-page meta

```html
<!-- Core -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Page Title — Linda Petrini</title>
<meta name="description" content="150-160 character description of this specific page.">
<link rel="canonical" href="https://lindapetrini.com/page-name/">

<!-- Open Graph (Facebook, LinkedIn, iMessage, Slack previews) -->
<meta property="og:type" content="website">
<meta property="og:title" content="Page Title — Linda Petrini">
<meta property="og:description" content="Same or adapted description.">
<meta property="og:url" content="https://lindapetrini.com/page-name/">
<meta property="og:image" content="https://lindapetrini.com/images/og-card.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="Linda Petrini">

<!-- Twitter/X Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@petrini_linda">
<meta name="twitter:creator" content="@petrini_linda">
<meta name="twitter:title" content="Page Title — Linda Petrini">
<meta name="twitter:description" content="Same or adapted description.">
<meta name="twitter:image" content="https://lindapetrini.com/images/og-card.jpg">
```

OG image spec: 1200x630px, under 5MB, JPEG preferred. Create one default card and per-page variants for key pages (home, coaching, writing).

The Twitter card processor falls back to OG tags when Twitter-specific tags are absent, so you only need to duplicate what differs (title/description if you want shorter Twitter copy).

**Confidence: High**

Sources:
- [Open Graph and Twitter Card Meta Tags — DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-add-twitter-card-and-open-graph-social-metadata-to-your-webpage-with-html)
- [Ultimate Guide to Social Meta Tags — EverywhereMarketer](https://www.everywheremarketer.com/blog/ultimate-guide-to-social-meta-tags-open-graph-and-twitter-cards)

---

### Structured Data (JSON-LD)

Add a `Person` schema to the homepage and About page. This is the primary structured data type for a personal website. It helps Google build a knowledge panel and understand Linda's identity, expertise, and social profiles.

Place in a `<script type="application/ld+json">` block in `<head>`.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Linda Petrini",
  "url": "https://lindapetrini.com",
  "image": "https://lindapetrini.com/images/linda-petrini.jpg",
  "jobTitle": "AI/ML Researcher & Coach",
  "description": "AI/ML researcher, writer, and coach. Research clients include Anthropic and Palisade. Author of the Tech & Soul coaching program.",
  "sameAs": [
    "https://twitter.com/petrini_linda",
    "https://www.linkedin.com/in/petrinilinda",
    "https://lindapetrini.substack.com"
  ],
  "knowsAbout": ["Artificial Intelligence", "Machine Learning", "AI Safety", "Tech Coaching"]
}
</script>
```

Use `ProfilePage` schema on the homepage wrapping the `Person` if you want to be thorough. Validate with [Google's Rich Results Test](https://search.google.com/test/rich-results) before launching.

**Confidence: High**

Sources:
- [Person Schema — Schema.org](https://schema.org/Person)
- [How to Add Structured Data to Personal Websites — Resumly](https://www.resumly.ai/blog/how-to-add-structured-data-to-personal-websites)
- [Structured Data SEO 2026 — DigitalApplied](https://www.digitalapplied.com/blog/structured-data-seo-2026-rich-results-guide)

---

### Sitemap and robots.txt

**sitemap.xml** — Hand-write it. For a 6-page static site, automation is unnecessary overhead.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://lindapetrini.com/</loc><priority>1.0</priority></url>
  <url><loc>https://lindapetrini.com/about/</loc></url>
  <url><loc>https://lindapetrini.com/work/</loc></url>
  <url><loc>https://lindapetrini.com/writing/</loc></url>
  <url><loc>https://lindapetrini.com/coaching/</loc></url>
  <url><loc>https://lindapetrini.com/contact/</loc></url>
</urlset>
```

**robots.txt** — Minimal, permissive:

```
User-agent: *
Allow: /
Sitemap: https://lindapetrini.com/sitemap.xml
```

Submit sitemap.xml in Google Search Console after launch.

**Confidence: High**

---

### Third-Party Embeds

#### Cal.com
- Use the **inline embed** or **popup on click** option from Cal.com's Embed Snippet Generator
- Cal.com generates plain HTML + a `<script>` tag — paste directly into HTML
- No framework dependency; works with static HTML
- Customize brand color in Cal.com's embed UI (match the pink: `#e8a0b4`)
- The embed requires JavaScript and iframe support — this is standard in all modern browsers

#### Beehiiv
- Beehiiv's subscribe form embed is an `<iframe>` + `<script>` snippet
- The existing implementation (ID: `74a002d7-b5a2-4a6f-9394-382e906e8ab8`) is already known
- Paste the generated snippet where you want the form to appear; it's mobile-friendly and fast-loading
- Customize colors in the Beehiiv dashboard before exporting the snippet

#### Substack
- Link out to `lindapetrini.substack.com` — do not embed
- Substack's embeddable widget is low-quality (limited styling control, tracking concerns)
- Better UX: display article cards with title/blurb/link manually in HTML, pulling from Substack RSS or updating manually

**Confidence: High**

---

## Analytics Options

### Recommendation: Plausible Analytics (Cloud)

**For a privacy-conscious researcher, Plausible is the right default choice.**

| | Plausible | Fathom | GA4 |
|---|---|---|---|
| **Price** | $9/mo (10k PV) or $19/mo (100k PV) | $15/mo (100k PV) | Free |
| **Cookie consent banner needed** | No | No | Yes (GDPR) |
| **Open source** | Yes (AGPL) | No | No |
| **Self-host option** | Yes (Community Edition, free) | No | No |
| **EU data hosting** | Yes | Yes (EU nodes) | Configurable |
| **Data sent to Google** | None | None | Yes |
| **Script size** | ~1KB | ~1KB | ~45KB |
| **GDPR compliance** | Full, no consent needed | Full + SOC 2 / ISO 27001 | Requires CMP |
| **Confidence level** | High | High | Not recommended |

**Why Plausible over Fathom:** Plausible's open-source nature means the privacy model can be independently verified. It's $6/mo cheaper at 100k pageviews. The self-hosting option (Community Edition) eliminates SaaS dependency entirely if desired. Plausible also includes scroll depth and AI referral identification out of the box in 2026.

**Why not GA4:** GA4 requires a cookie consent management platform (CMP) for GDPR compliance, which adds visual and technical complexity. A significant percentage of EU users decline analytics cookies, making GA4 data structurally incomplete. GA4's data is also used by Google for advertising. None of these tradeoffs are acceptable for a researcher who positions herself as privacy-conscious.

**Why not Fathom:** Fathom is excellent (best compliance certifications in this category: SOC 2 + ISO 27001) and is the right choice if compliance documentation is a priority. However, at $15/mo flat (vs Plausible's $9/mo entry), it costs more for low-traffic periods. Fathom is not open source, so the privacy model cannot be independently verified. For a personal site, Plausible's value is better.

**Implementation:** One `<script>` tag in `<head>`, no configuration required:

```html
<script defer data-domain="lindapetrini.com"
  src="https://plausible.io/js/script.js"></script>
```

**Confidence: High**

Sources:
- [Privacy-First Analytics Alternatives 2026 — LegalForge](https://www.legal-forge.com/en/blog/privacy-first-analytics-alternatives-2026/)
- [Plausible Analytics](https://plausible.io/self-hosted-web-analytics)
- [Fathom Analytics](https://usefathom.com/)
- [Best Google Analytics Alternatives 2026 — Analytify](https://analytify.io/best-google-analytics-alternatives/)

---

## Hosting Options

### Recommendation: Cloudflare Pages (primary) or Netlify (if easier UX preferred)

| | Cloudflare Pages | Netlify | GitHub Pages |
|---|---|---|---|
| **Free tier bandwidth** | Unlimited | 100 GB/mo | 100 GB/mo (soft) |
| **Free tier builds** | 500/mo | 300 min/mo | Unlimited |
| **Custom domain** | Yes, free | Yes, free | Yes, free |
| **SSL/HTTPS** | Automatic | Automatic | Automatic |
| **CDN edge locations** | 300+ | Multi-cloud | GitHub CDN |
| **Deploy from Git** | Yes (GitHub/GitLab) | Yes (GitHub/GitLab/Bitbucket) | Yes (GitHub only) |
| **Preview deploys** | Yes (per branch) | Yes (per PR) | No |
| **Form handling** | No (Workers required) | Yes (built-in) | No |
| **DDoS protection** | Yes (native Cloudflare) | Limited | Limited |
| **Complexity** | Low-medium | Low | Lowest |
| **Confidence level** | High | High | Medium |

**Cloudflare Pages** is the strongest technical choice: unlimited bandwidth on the free tier eliminates surprise bills if a piece of research goes viral; 300+ global edge locations mean fast load times for Linda's international audience; native DDoS protection requires no configuration. The deployment experience is straightforward for a Git-connected workflow.

**Netlify** is the better choice if simplicity of UI is the priority over raw performance. The Netlify dashboard is more polished than Cloudflare's for non-developers. Built-in form handling is useful only if you add a contact form (Cal.com handles bookings, so this is likely not needed).

**GitHub Pages** is acceptable but has meaningful limitations: no branch preview deploys, GitHub-only, no serverless function escape hatch if one is ever needed. The free tier is fine for a personal site, but the lack of preview deploys is a real workflow cost.

**Verdict:** Use Cloudflare Pages. Connect the GitHub repo, set the build command to nothing (plain static files, no build step), and set the output directory to `/` or wherever `index.html` lives.

**Confidence: High**

Sources:
- [Cloudflare Pages 2026 Guide — HostMeloud](https://hostmeloud.com/cloudflare-pages-2026-guide/)
- [GitHub Pages vs Netlify vs Cloudflare Pages — FictionBecomesFact](https://fictionbecomesfact.com/notes/static-website-hosting/)
- [10 Best Static Website Hosting Providers 2026 — Crystallize](https://crystallize.com/blog/static-hosting)
- [Bejamas Comparison](https://bejamas.com/compare/cloudflare-pages-vs-github-pages-vs-netlify)

---

## What to Avoid

### Static Site Generators (for this project)
**Eleventy, Hugo, Astro, Jekyll** — All are excellent tools, but they add a build step, a dependency tree, and a learning curve. For a ~6-page site maintained by a non-developer, the overhead is not worth it. The "no build tools" constraint in the project spec is correct.

**Why not Astro specifically:** Astro is the 2026 recommendation for content sites that need a generator. But even Astro requires Node.js, npm, and understanding of its file-based routing. The existing HTML template approach is simpler and already proven.

**Confidence: High**

### React / Next.js / Frameworks
Out of scope per project spec. These are the right tools for apps, not for a brochure site. Server components, hydration, and bundle optimization are irrelevant concerns here.

**Confidence: High**

### Google Analytics (GA4)
- Requires cookie consent banner for GDPR compliance
- Sends user data to Google for advertising
- ~45KB script weight vs ~1KB for Plausible
- GA4 data increasingly incomplete as EU users decline consent
- The "free" cost is paid in user privacy and legal complexity

**Confidence: High**

### Google Fonts CDN (remote loading)
- GDPR violation risk (Munich court precedent, 2022, still relevant in 2026)
- Third-party DNS lookup adds latency
- Self-host the same fonts instead (Inter + Newsreader variable fonts, both freely licensed)

**Confidence: High**

### Substack embed widget
- Limited styling control; will clash with the pink design system
- Introduces third-party tracking on your own domain
- Better approach: display article cards manually with links to Substack

**Confidence: Medium**

### Sass / PostCSS / CSS preprocessors
- CSS custom properties solve the variable/theming problem natively
- Adding a preprocessor adds a build step (violates "no build tools" constraint)
- Modern CSS — cascade layers, `:has()`, container queries — makes preprocessors less necessary with each year

**Confidence: High**

### Vercel
- Primarily optimized for Next.js/React
- Free tier limits are more restrictive for non-Next.js use cases
- No advantage over Cloudflare Pages for a pure static site

**Confidence: Medium**

---

## Summary Decision Table

| Concern | Choice | Confidence |
|---|---|---|
| HTML structure | Semantic HTML5, hand-written | High |
| CSS architecture | CSS Custom Properties, no preprocessor | High |
| CSS reset | Andy Bell's Modern CSS Reset (piccalil.li) | High |
| Fonts | Self-hosted Inter + Newsreader variable fonts | High |
| Analytics | Plausible Cloud ($9/mo) | High |
| Hosting | Cloudflare Pages (free tier) | High |
| SEO meta | OG + Twitter Card + canonical per page | High |
| Structured data | Person JSON-LD schema | High |
| Sitemap | Hand-written sitemap.xml | High |
| Cal.com | HTML embed snippet from Cal dashboard | High |
| Beehiiv | Iframe embed snippet from Beehiiv dashboard | High |
| Substack | Link out only, manual article cards | Medium |

---

*Sources compiled 2026-02-27. All pricing and feature details reflect current public documentation at time of research.*
