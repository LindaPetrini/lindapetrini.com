# Linda Petrini — Personal Website

Static HTML/CSS site. No build step, no framework, no backend.

---

## Pages

| File | URL | Contents |
|------|-----|----------|
| `index.html` | `/` | Hero, "The short version" story, six selected pieces, testimonial, `#contact` (email + CV) |
| `work.html` | `/work` | Nebius Science articles (`#articles`), research communication for labs (`#labs`), papers (`#papers`), Substack essays feed + subscribe form (`#essays`) |

Retired pages (`/about`, `/writing`, `/contact`, `/coaching`, with and without `.html`)
301 to the new locations via `_redirects` (Cloudflare Pages format). Old hash links on the
home page (`/#about`, `/#writing`, `/#work`, `/#coaching`) are handled in `js/main.js`.

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

### Analytics
Umami, self-hosted at `analytics.lindapetrini.com`. The script tag is in the `<head>` of both pages.
After a content change: submit `sitemap.xml` to Google Search Console.

---

## Development

Open any HTML file directly in your browser — no server needed.

Or serve locally with Python:
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

Recommended: **Cloudflare Pages** (free tier, unlimited bandwidth)

1. Push this repo to GitHub
2. Connect GitHub repo to Cloudflare Pages (dashboard.cloudflare.com → Pages → Create)
3. Build command: *(leave blank — no build step)*
4. Output directory: `/` (root)
5. Add custom domain: `lindapetrini.com`
6. SSL is automatic

Alternative: **Netlify** — drag and drop the folder at netlify.com/drop

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
├── work.html            # Work: articles, research communication, papers, essays
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
│   └── main.js          # Hamburger nav, email obfuscation, hash redirects
├── images/
│   ├── README.md        # Image spec + download instructions
│   └── logos/           # Organisation SVG logos
├── fonts/
│   └── README.md        # Font download instructions
├── cv/
│   └── README.md        # CV upload instructions
├── partials/
│   ├── nav.html         # Canonical nav (reference copy)
│   └── footer.html      # Canonical footer (reference copy)
├── sitemap.xml
├── robots.txt
└── .planning/           # GSD planning documents (roadmap, requirements, etc.)
```
