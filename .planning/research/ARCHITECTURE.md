# Architecture: Multi-Page Static HTML/CSS Website
*Research date: 2026-02-27 | Project: lindapetrini.com*

---

## Summary

This document captures architectural decisions for a 6-page static HTML/CSS personal website. No build tools, no framework, no CMS. The site must be portable (GitHub Pages, Netlify, any static host) and maintainable by a solo developer.

---

## 1. File and Directory Structure

```
/workspace/
├── index.html              # Home page
├── about.html              # About page
├── work.html               # Services/Research/Work page
├── writing.html            # Writing / Substack page
├── coaching.html           # Tech & Soul / Coaching page
├── contact.html            # Contact + CV download
├── css/
│   ├── main.css            # Entry point — imports all partials via @import
│   ├── tokens.css          # Design tokens: colors, spacing, type scale
│   ├── reset.css           # Minimal CSS reset / normalize
│   ├── base.css            # Body, headings, links, paragraph defaults
│   ├── layout.css          # Page wrapper, section spacing, grid helpers
│   ├── nav.css             # Header and navigation styles
│   ├── footer.css          # Footer styles
│   ├── components.css      # Buttons, cards, testimonials, badges, forms
│   └── utilities.css       # Single-purpose helper classes (text-center, etc.)
├── js/
│   └── main.js             # Minimal vanilla JS: mobile nav toggle, nav inject
├── images/
│   ├── linda-hero.webp     # Hero/profile photo
│   ├── linda-hero.jpg      # Fallback for older browsers
│   ├── logo-palisade.svg   # Trusted-by logos (SVG preferred)
│   ├── logo-anthropic.svg
│   ├── logo-foresight.svg
│   └── favicon.ico         # + favicon.png, apple-touch-icon.png
├── fonts/                  # Optional: self-hosted Inter/Newsreader WOFF2
├── cv/
│   └── linda-petrini-cv.pdf
├── partials/               # Shared HTML snippets (fetched by JS or copy-pasted)
│   ├── nav.html
│   └── footer.html
├── sitemap.xml
└── robots.txt
```

### Rationale

- **All HTML pages at root level** — clean, human-readable URLs without subdirectory nesting (`/about.html` vs `/about/index.html`). At this scale (6 pages), subdirectory nesting adds complexity with no SEO benefit.
- **`css/` subdirectory** — separates styles from markup clearly.
- **`images/` flat** — at ~10–15 images total, subdirectory categorization is unnecessary overhead.
- **`partials/`** — stores the canonical nav/footer HTML for the shared-component strategy (see Section 3).

---

## 2. CSS Organization

### Strategy: Single Linked File with `@import` Partials

Load one `<link>` tag in every HTML page:

```html
<link rel="stylesheet" href="css/main.css">
```

`main.css` imports all partials:

```css
@import "tokens.css";
@import "reset.css";
@import "base.css";
@import "layout.css";
@import "nav.css";
@import "footer.css";
@import "components.css";
@import "utilities.css";
```

**Why this approach over alternatives:**

| Approach | Pros | Cons |
|---|---|---|
| Single monolithic file | One request, simple | Hard to navigate at 500+ lines |
| Multiple `<link>` tags | Modular per-page | Multiple HTTP requests, no shared cache benefit |
| `@import` in main.css | Modular + one `<link>` tag | Slight cascade overhead (negligible on CDN) |
| Build tool concatenation | Optimal performance | Requires Node.js, npm — out of scope |

For a 6-page personal site served from Netlify or GitHub Pages (with HTTP/2), `@import` gives the best balance of maintainability and performance without any build step.

### CSS Custom Properties (Design Tokens)

All design decisions live in `tokens.css`. This is the single source of truth for the pink theme.

```css
/* tokens.css */
:root {
  /* ── Color palette (primitives) ── */
  --color-pink-100: #fff0f3;
  --color-pink-200: #ffd6e0;
  --color-pink-300: #ffadbe;
  --color-pink-400: #f77f9e;
  --color-pink-500: #e05c7e;   /* primary brand pink */
  --color-pink-600: #c4486a;   /* darker for hover states */

  --color-neutral-50:  #fafafa;
  --color-neutral-100: #f5f5f5;
  --color-neutral-700: #404040;
  --color-neutral-900: #111111;

  --color-white: #ffffff;

  /* ── Semantic color aliases ── */
  --color-bg:           var(--color-white);
  --color-bg-subtle:    var(--color-pink-100);
  --color-text:         var(--color-neutral-900);
  --color-text-muted:   var(--color-neutral-700);
  --color-accent:       var(--color-pink-500);
  --color-accent-hover: var(--color-pink-600);
  --color-border:       var(--color-pink-200);

  /* ── Typography ── */
  --font-sans:   'Inter', system-ui, -apple-system, sans-serif;
  --font-serif:  'Newsreader', Georgia, serif;

  --text-xs:   0.75rem;    /*  12px */
  --text-sm:   0.875rem;   /*  14px */
  --text-base: 1rem;       /*  16px */
  --text-lg:   1.125rem;   /*  18px */
  --text-xl:   1.25rem;    /*  20px */
  --text-2xl:  1.5rem;     /*  24px */
  --text-3xl:  1.875rem;   /*  30px */
  --text-4xl:  2.25rem;    /*  36px */
  --text-5xl:  3rem;       /*  48px */

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --leading-tight:  1.25;
  --leading-normal: 1.6;
  --leading-loose:  1.8;

  /* ── Spacing scale ── */
  --space-1:  0.25rem;   /*  4px */
  --space-2:  0.5rem;    /*  8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.25rem;   /* 20px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */

  /* ── Layout ── */
  --max-width-content: 72rem;   /* 1152px */
  --max-width-prose:   65ch;

  /* ── Borders and radius ── */
  --radius-sm:   0.25rem;
  --radius-md:   0.5rem;
  --radius-lg:   1rem;
  --radius-full: 9999px;

  --border-width: 1px;

  /* ── Shadows ── */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.1);

  /* ── Transitions ── */
  --transition-fast:   150ms ease;
  --transition-normal: 250ms ease;
}
```

**Two-tier token system:** Primitive values (e.g., `--color-pink-500`) plus semantic aliases (e.g., `--color-accent`). Only semantic aliases should be used in component CSS — never primitives directly. This means rebranding the pink to another color requires changing only `tokens.css`.

### CSS Cascade Layers (Optional Enhancement)

For clarity on specificity ordering, declare layers at the top of `main.css`:

```css
@layer reset, base, layout, components, utilities;
```

This prevents specificity wars as the site grows. Any style in `utilities` beats `components` beats `layout` regardless of selector complexity. Cascade layers have 100% modern browser support (Chrome 99+, Firefox 97+, Safari 15.4+, 2022+).

---

## 3. Navigation Pattern: Shared Elements Without a Build Tool

This is the core challenge of pure static multi-page sites. Three practical options exist:

### Option A: Copy-Paste (Simplest — Recommended for this project)

Duplicate the `<header>` and `<footer>` HTML into all 6 pages. Use the `aria-current="page"` attribute on the active nav link per page.

**Nav HTML per page (only the active link changes):**

```html
<nav class="site-nav">
  <a href="/" class="nav-logo">Linda Petrini</a>
  <ul class="nav-links">
    <li><a href="/">Home</a></li>
    <li><a href="/about.html" aria-current="page">About</a></li>
    <li><a href="/work.html">Work</a></li>
    <li><a href="/writing.html">Writing</a></li>
    <li><a href="/coaching.html">Coaching</a></li>
    <li><a href="/contact.html">Contact</a></li>
  </ul>
  <button class="nav-toggle" aria-label="Open menu" aria-expanded="false">
    <span class="hamburger-bar"></span>
    <span class="hamburger-bar"></span>
    <span class="hamburger-bar"></span>
  </button>
</nav>
```

**CSS active state:**

```css
/* nav.css */
.nav-links a[aria-current="page"] {
  color: var(--color-accent);
  font-weight: var(--font-weight-semibold);
  border-bottom: 2px solid var(--color-accent);
}
```

**Trade-offs:**

- Pro: Zero JavaScript dependency, zero build step, works with `file://` protocol during development
- Pro: Instant — no flash of unstyled content, no race condition
- Con: Nav changes require editing 6 files — manageable for a 6-page site, use editor find-replace
- Con: Only becomes a problem at 20+ pages

### Option B: JavaScript Fetch Injection (Progressive Enhancement)

Store canonical nav/footer in `partials/nav.html` and `partials/footer.html`. Inject them via fetch in `main.js`:

```javascript
// js/main.js
async function loadPartial(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res = await fetch(url);
    const html = await res.text();
    el.innerHTML = html;
    // Set aria-current after injection
    setActiveNavLink();
  } catch (e) {
    console.warn('Partial load failed:', url, e);
  }
}

function setActiveNavLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '/' && href === '/index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

loadPartial('#site-header', '/partials/nav.html');
loadPartial('#site-footer', '/partials/footer.html');
```

Each page has placeholder elements:

```html
<div id="site-header"></div>
<!-- page content -->
<div id="site-footer"></div>
```

**Trade-offs:**

- Pro: Nav/footer edited in one place
- Con: Requires a local dev server (fetch blocked on `file://`) — use VS Code Live Server
- Con: Flash of missing header until JS runs; requires JS enabled
- Con: Active nav state requires JS-based path matching (fragile with `.html` extensions)
- Con: SEO impact: nav links not in raw HTML (crawlers may not execute JS)

### Option C: Native HTML Web Components (Modern, No Framework)

Define a custom element for the nav:

```javascript
// js/main.js
class SiteNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="site-nav">
        <!-- nav markup -->
      </nav>
    `;
    // Set active state based on location
    const path = location.pathname;
    this.querySelectorAll('a').forEach(a => {
      if (a.getAttribute('href') === path) {
        a.setAttribute('aria-current', 'page');
      }
    });
  }
}
customElements.define('site-nav', SiteNav);
```

Use `<site-nav></site-nav>` in each HTML page.

**Trade-offs:**

- Pro: Single source of truth for nav markup in JS
- Pro: Works without a server (no fetch, so no CORS issue on `file://`)
- Pro: Full browser support (all modern browsers)
- Con: Nav HTML lives in JS string — harder to author, harder to read
- Con: Still requires JS; SEO crawler may not render custom elements

### Decision for This Project

**Use Option A (copy-paste) as the primary pattern.** Rationale:

1. 6 pages is within manageable copy-paste range
2. Zero JS dependency for critical navigation
3. Best SEO — nav links in raw HTML
4. Works offline/locally without a dev server
5. No flash of unstyled/missing content

Keep `partials/nav.html` and `partials/footer.html` as the **canonical reference** — edit these when nav changes, then sync to pages. This gives a single source of truth for reference without JS dependency.

If the nav grows beyond 8 items or pages exceed 10, migrate to a simple static site generator (Eleventy) at that point.

---

## 4. Mobile Navigation (Hamburger Menu)

Minimal vanilla JS for the hamburger toggle — this is the only JS interaction required in the nav:

```javascript
// js/main.js
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('is-open');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.site-nav')) {
      toggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
    }
  });
}
```

CSS-only approach for the mobile drawer:

```css
/* nav.css */
@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--color-white);
    padding: var(--space-4);
    box-shadow: var(--shadow-md);
    border-top: 1px solid var(--color-border);
  }
  .nav-links.is-open {
    display: flex;
  }
  .nav-toggle {
    display: flex;
  }
}

@media (min-width: 769px) {
  .nav-toggle { display: none; }
  .nav-links { display: flex; }
}
```

---

## 5. Font Loading Strategy

The existing template uses Inter (sans) + Newsreader (serif) from Google Fonts. Optimal loading:

```html
<!-- In <head>, before any other resource links -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,wght@0,400;0,600;1,400&display=swap">
```

Key practices:
- **Two preconnect hints** — one for `fonts.googleapis.com` (CSS), one for `fonts.gstatic.com` (font files, needs `crossorigin`)
- **`display=swap`** on the Google Fonts URL — equivalent to `font-display: swap` — text renders immediately in fallback font, then swaps
- **Limit variants** — only load the weights actually used (400, 500, 600, 700 for Inter; 400 regular, 600 semibold, 400 italic for Newsreader)
- **`&display=swap`** already implied by Google Fonts URL parameter

**Self-hosting alternative** (better performance, no third-party dependency):

Download WOFF2 files, store in `fonts/`, add to `tokens.css`:

```css
@font-face {
  font-family: 'Inter';
  src: url('../fonts/inter-400.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
```

Self-hosting is recommended if Core Web Vitals become a priority — eliminates the third-party DNS lookup and gives full cache control.

---

## 6. Image Optimization

### Formats

- **Photos** (hero, headshots): WebP primary, JPEG fallback. Use `<picture>` element.
- **Logos/icons**: SVG — infinitely scalable, tiny file size, no format conversion needed.
- **Favicon**: `.ico` for broad compatibility + `favicon.png` (32×32) + `apple-touch-icon.png` (180×180).

### `<picture>` Pattern for Hero Photo

```html
<picture>
  <source srcset="images/linda-hero.webp" type="image/webp">
  <img src="images/linda-hero.jpg"
       alt="Linda Petrini, AI/ML researcher and coach"
       width="600"
       height="600"
       loading="eager"
       fetchpriority="high">
</picture>
```

- LCP image (hero/above-fold): use `loading="eager"` and `fetchpriority="high"` — **never** `loading="lazy"` for above-fold images
- Below-fold images: `loading="lazy"`
- Always specify `width` and `height` attributes to prevent layout shift (CLS)

### Compression Targets

| Image | Target size | Tool |
|---|---|---|
| Hero photo | < 150 KB (WebP) | Squoosh, TinyPNG |
| Trusted-by logos | SVG — optimize with SVGO | SVGO CLI or svgomg.net |
| Testimonial photos | < 50 KB | Squoosh |

---

## 7. CSS Loading Pattern

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title — Linda Petrini</title>

  <!-- Preconnect for fonts FIRST -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Critical CSS: single stylesheet -->
  <link rel="stylesheet" href="css/main.css">

  <!-- Google Fonts after own CSS so fallback renders first -->
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,wght@0,400;0,600;1,400&display=swap">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="images/favicon.png">
  <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
</head>
```

Do not use `@import` inside CSS to load Google Fonts — this creates a sequential waterfall. Use `<link>` tags.

JS goes at the bottom of `<body>`, before `</body>`:

```html
  <script src="js/main.js" defer></script>
</body>
```

Using `defer` means the script runs after HTML parsing without blocking rendering.

---

## 8. SEO Boilerplate per Page

Each page needs this `<head>` boilerplate customized:

```html
<!-- Primary meta -->
<title>About — Linda Petrini | AI/ML Researcher & Coach</title>
<meta name="description" content="[150-160 char description for this page]">
<meta name="author" content="Linda Petrini">
<link rel="canonical" href="https://lindapetrini.com/about.html">

<!-- Open Graph (social sharing) -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://lindapetrini.com/about.html">
<meta property="og:title" content="About — Linda Petrini">
<meta property="og:description" content="[same as meta description]">
<meta property="og:image" content="https://lindapetrini.com/images/linda-og.jpg">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@petrini_linda">
<meta name="twitter:title" content="About — Linda Petrini">
<meta name="twitter:description" content="[same as meta description]">
<meta name="twitter:image" content="https://lindapetrini.com/images/linda-og.jpg">
```

OG image: create one 1200×630px JPEG (`images/linda-og.jpg`) for all pages.

---

## 9. Build Order (Fastest Path to Working Site)

Build in this sequence to always have a deployable, testable artifact at each step:

### Phase 1 — Foundation (Build First)
1. `css/tokens.css` — establish all pink theme variables
2. `css/reset.css` + `css/base.css` — normalize browsers, style body/headings/links
3. `css/layout.css` — page wrapper, section spacing
4. `css/main.css` — wire up `@import` chain
5. `index.html` skeleton — valid HTML5 with correct `<head>` boilerplate, linked to CSS

**Checkpoint:** Open `index.html` in browser. Basic typography and pink theme visible.

### Phase 2 — Shared Components
6. `css/nav.css` — header + nav styles including mobile
7. `js/main.js` — hamburger toggle
8. `css/footer.css` — footer styles
9. Build nav and footer HTML in `partials/nav.html` + `partials/footer.html`

**Checkpoint:** Nav opens/closes on mobile. All links present. Footer renders.

### Phase 3 — Home Page (index.html)
10. Hero section (photo, headline, CTA buttons)
11. Trusted-by logos strip
12. Role cards / brief bio
13. Testimonials section
14. `css/components.css` as needed for buttons, cards

**Checkpoint:** Full home page renders on mobile and desktop. Passes Lighthouse mobile.

### Phase 4 — Remaining Pages (in order of content readiness)
15. `coaching.html` — existing template to adapt (most content ready)
16. `work.html` — research publications + client logos
17. `writing.html` — Substack links + newsletter embed
18. `contact.html` — simplest page
19. `about.html` — awaiting copy from Linda (build structure, use placeholder copy)

**Checkpoint:** All 6 pages exist, nav links all work, no broken pages.

### Phase 5 — Polish and Launch Prep
20. `sitemap.xml` + `robots.txt`
21. SEO meta tags on all pages
22. Image optimization (compress all photos to WebP)
23. Analytics script (Plausible or GA4)
24. Test all external links (Cal.com, Substack, Beehiiv embed, social profiles)
25. Lighthouse audit — target ≥ 90 on Performance, Accessibility, SEO
26. CV PDF in `cv/` directory with download link tested

---

## 10. Performance Checklist

| Item | Target | Approach |
|---|---|---|
| Lighthouse Performance | ≥ 90 (mobile) | Optimized images, minimal JS, `defer` scripts |
| Lighthouse SEO | ≥ 95 | Meta tags, canonical, sitemap |
| Lighthouse Accessibility | ≥ 95 | ARIA labels, semantic HTML, sufficient contrast |
| LCP (Largest Contentful Paint) | < 2.5s | Hero image preload candidate, no render-blocking CSS |
| CLS (Cumulative Layout Shift) | < 0.1 | `width`/`height` on all images, `font-display: swap` |
| Total page weight (home) | < 500 KB | Compressed images, no framework JS |

---

## Key References

- [MDN: Organizing your CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing)
- [MDN: Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)
- [web.dev: Optimize web fonts](https://web.dev/learn/performance/optimize-web-fonts)
- [web.dev: Font best practices](https://web.dev/articles/font-best-practices)
- [CSS-Tricks: CSS Cascade Layers Guide](https://css-tricks.com/css-cascade-layers/)
- [Image Optimization 2025 Guide](https://www.frontendtools.tech/blog/modern-image-optimization-techniques-2025)
- [GitHub Community: Best Practices for Multi-Page Websites](https://github.com/orgs/community/discussions/147721)
- [Go Make Things: Modular CSS approaches](https://gomakethings.com/modular-css-and-different-ways-to-structure-your-stylesheets/)
- [Impressive Webs: Current Page Link Styles](https://www.impressivewebs.com/current-page-link-styles/)
- [How I create static websites for tiny archives (alexwlchan)](https://alexwlchan.net/2025/mildly-dynamic-websites/)
