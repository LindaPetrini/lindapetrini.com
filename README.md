# Linda Petrini — Personal Website

Positioning: technical writer for AI research.

Static HTML/CSS site. No build step, no framework. The only backend is a small Cloudflare
Worker (`worker/`) that stores subscribe-form emails and proxies the Substack RSS feed.

---

## Pages

| File | URL | Contents |
|------|-----|----------|
| `index.html` | `/` | Hero, "What I do" + "How it works", "The short version" story, six selected pieces, two testimonials, `#contact` (email, CV, rate) |
| `work.html` | `/work` | Work for research labs (`#labs`), Nebius Science articles (`#articles`), papers (`#papers`), Substack essays feed + subscribe form (`#essays`) |

All page copy is mirrored in `site-copy.md`.

Retired pages (`/about`, `/writing`, `/contact`, `/coaching`, with and without `.html`)
301 to the new locations via `_redirects` (Cloudflare Pages format). Old hash links on the
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

**Cloudflare Pages**, connected to the GitHub repo. Pushing to `main` on origin deploys
the live site. No build command; output directory is the repo root.

---

## Launch checklist

- [ ] Open both pages in browser — no broken layouts
- [ ] Open on a real phone (iOS Safari + Android Chrome)
- [ ] Test hamburger nav: opens, closes, keyboard works
- [ ] Test the Substack essays feed and subscribe form on the Work page
- [ ] Test email link assembles correctly in the home `#contact` section
- [ ] Test CV download
- [ ] Check all publication links open correct pages
- [ ] Check social links: Twitter, LinkedIn, Substack, Scholar, GitHub
- [ ] Check `_redirects` works for the retired URLs after deploy
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
├── _redirects           # Cloudflare Pages 301s for retired URLs
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
├── worker/              # Cloudflare Worker: subscribe form + Substack feed proxy
├── partials/
│   ├── nav.html         # Canonical nav (reference copy)
│   └── footer.html      # Canonical footer (reference copy)
├── sitemap.xml
├── robots.txt
└── .planning/           # GSD planning documents (roadmap, requirements, etc.)
```
