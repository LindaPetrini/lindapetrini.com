# Linda Petrini — Personal Website

Positioning: technical writer for AI research.

Static HTML/CSS site. No build step, no framework. The only backend is a small Cloudflare
Worker (`worker/`) that stores subscribe-form emails (its Substack feed proxy is no longer used; the essays list is static HTML).

---

## Pages

| File | URL | Contents |
|------|-----|----------|
| `index.html` | `/` | Hero, "What I do", selected work ("I wrote these" / "I edited these"), "The short version" story, two testimonials, `#contact` (email, CV, rate) |
| `work.html` | `/work` | Grouped by role: things I wrote (`#written`: `#reports`, `#threads`, `#articles`), hand-curated Substack essays list + subscribe form (`#essays`), things I edited or contributed to (`#edited`), papers (`#papers`) |

All page copy is mirrored in `site-copy.md`.

Retired pages (`/about`, `/writing`, `/contact`, `/coaching`, with and without `.html`)
redirect to the new locations via stub HTML files (`about.html`, `writing.html`,
`contact.html`, `coaching.html`: meta refresh + `location.replace`). `_redirects` (Cloudflare Pages
format) is kept but not honoured by GitHub Pages. Old hash links on the
home page (`/#about`, `/#writing`, `/#work`, `/#coaching`, `/#mentorship`) are handled in `js/main.js`.

Also in the repo and deployed, but not part of the two-page site: `dateme/` (redirect to
date.lindapetrini.com), `playwithme/` (Twine game), `insights.html`, `resources/`,
`design-1..5.html`, `linkedin-banner.html`, `old_website/`.

---

## Maintenance notes

### Contact email
The email address is assembled at runtime from the `data-email-user`, `data-email-domain`,
`data-email-tld` attributes on the button in the `#contact` section of `index.html`.

### CV file
`cv/linda-petrini-cv.pdf` — linked from the home `#contact` section and the Work page hero.

### Photos & logos (see `/images/README.md`)
- `images/linda-petrini.jpg` + `.webp` — hero photo
- `images/og.jpg` — social sharing preview (1200×630px)
- `images/logos/` — logo bar SVGs

### Fonts
Cormorant Garamond and Jost load from the Google Fonts CDN (`<link>` in each page's `<head>`).
The WOFF2 files in `fonts/` (Inter, Newsreader) are present but not used by the live pages.

### Analytics
Umami, self-hosted at `analytics.lindapetrini.com`. The script tag is in the `<head>` of both pages.
After a content change: submit `sitemap.xml` to Google Search Console.

---

## Development

Asset paths are root-relative (`/css/main.css`), so serve the folder rather than opening
the HTML files directly. With Python:
```bash
python3 -m http.server 8000
# Open http://localhost:8000
```

Or with Node:
```bash
npx serve .
# Open http://localhost:3000
```

---

## Hosting

**GitHub Pages** (legacy build from `main`, repo root, CNAME lindapetrini.com). Pushing to
`main` on origin deploys the live site. No build step. `_redirects` is not honoured by GitHub
Pages; the retired URLs are served by redirect stub HTML files.

---

## Launch checklist

- [ ] Open both pages in browser — no broken layouts
- [ ] Open on a real phone (iOS Safari + Android Chrome)
- [ ] Test hamburger nav: opens, closes, keyboard works
- [ ] Test the Substack essay links and subscribe form on the Work page
- [ ] Test email link assembles correctly in the home `#contact` section
- [ ] Test CV download
- [ ] Check all publication links open correct pages
- [ ] Check social links: Twitter, LinkedIn, Substack, Scholar, GitHub
- [ ] Check the redirect stubs work for the retired URLs after deploy
- [ ] Verify no `loading="lazy"` on hero image
- [ ] Verify Umami script appears exactly once per page
- [ ] Check `robots.txt` does NOT have `Disallow: /`
- [ ] Check all `og:image` values are absolute URLs
- [ ] Run Lighthouse mobile audit — target ≥ 90 Performance, ≥ 95 SEO/Accessibility
- [ ] Submit `sitemap.xml` to Google Search Console after go-live

---

## File structure

```
/
├── index.html           # Home: story, selected work, contact
├── work.html            # Work: labs, articles, papers, essays
├── site-copy.md         # Plain-text mirror of all page copy
├── _redirects           # Cloudflare-format 301s (not honoured by GitHub Pages)
├── about.html, writing.html, contact.html, coaching.html  # redirect stubs for retired URLs
├── css/
│   ├── main.css         # @import chain entry point
│   ├── tokens.css       # Design tokens (colours, fonts, spacing)
│   ├── reset.css        # Modern CSS reset
│   ├── base.css         # Body, headings, links
│   ├── layout.css       # Containers, sections, grid
│   ├── nav.css          # Navigation
│   ├── footer.css       # Footer
│   ├── components.css   # Buttons, cards, testimonials, embeds
│   └── utilities.css    # Helper classes
├── js/
│   └── main.js          # Hamburger nav, email obfuscation, hash redirects, subscribe form
├── images/
│   ├── linda-petrini.jpg / .webp, og.jpg, favicon.svg
│   ├── README.md        # Image spec (written pre-launch)
│   └── logos/           # Organisation SVG logos
├── fonts/               # Inter + Newsreader WOFF2 (present, unused by live pages)
├── cv/
│   └── linda-petrini-cv.pdf
├── worker/              # Cloudflare Worker: subscribe form (feed proxy unused)
├── partials/
│   ├── nav.html         # Canonical nav (reference copy)
│   └── footer.html      # Canonical footer (reference copy)
├── sitemap.xml
├── robots.txt
└── .planning/           # GSD planning documents (roadmap, requirements, etc.)
```
