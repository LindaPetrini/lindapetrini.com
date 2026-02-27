# Linda Petrini — Personal Website

Static HTML/CSS site. No build step, no framework, no backend.

---

## Pages

| File | URL | Status |
|------|-----|--------|
| `index.html` | `/` | ✓ Built |
| `about.html` | `/about` | ✓ Built — **needs Linda's copy** |
| `work.html` | `/work` | ✓ Built — **needs publication URLs** |
| `writing.html` | `/writing` | ✓ Built — **needs article cards** |
| `coaching.html` | `/coaching` | ✓ Built |
| `contact.html` | `/contact` | ✓ Built — **needs email + CV** |

---

## Before Launch — Linda's TODO List

### 1. About page copy (`about.html`)
Four sections marked with `✏️ LINDA:` — fill in:
- Present-tense intro (who you are right now)
- Origin story (how you got here)
- What you care about now
- Your background (short version — CV covers the rest)

### 2. Writing page articles (`writing.html`)
Six article card placeholders — replace each with:
- Article title
- One-line description
- Direct link to the Substack post

### 3. Work page publication links (`work.html`)
Four `href="#"` placeholders — replace with actual URLs:
- AI Pathways Report
- Secure AI Tech Tree
- Bezos Earth Fund AI & Climate Report
- ICLR paper (add correct title and DOI/link)

### 4. Contact page email (`contact.html`)
Update the `data-email-user`, `data-email-domain`, `data-email-tld` attributes
to your actual email address parts. The JS assembles them at runtime.

### 5. CV file
Place `linda-petrini-cv.pdf` in the `/cv/` directory.
Update the "Last updated [date]" note in `contact.html`.

### 6. Photos & logos (see `/images/README.md`)
- `images/linda-petrini.jpg` + `.webp` — hero and about page photo
- `images/og.jpg` — social sharing preview (1200×630px)
- `images/logos/anthropic.svg`, `palisade.svg`, `foresight.svg`

### 7. Fonts (see `/fonts/README.md`)
Download Inter + Newsreader WOFF2 variable fonts and place in `/fonts/`.
Until then the site uses system fonts (still looks good).

### 8. Analytics
Sign up for Plausible (plausible.io, ~$9/mo).
The script tag is already on every page — just verify the domain matches.
After launch: submit `sitemap.xml` to Google Search Console.

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

- [ ] All TODO items above completed
- [ ] Open each page in browser — no broken layouts
- [ ] Open on a real phone (iOS Safari + Android Chrome)
- [ ] Test hamburger nav: opens, closes, keyboard works
- [ ] Test Cal.com booking — complete a test booking end-to-end
- [ ] Test Beehiiv embed on coaching page and writing page
- [ ] Test email link assembles correctly on contact page
- [ ] Test CV download
- [ ] Check all publication links open correct pages
- [ ] Check social links: Twitter, LinkedIn, Substack
- [ ] Verify no `loading="lazy"` on hero image
- [ ] Verify Plausible script appears exactly once per page
- [ ] Check `robots.txt` does NOT have `Disallow: /`
- [ ] Check all `og:image` values are absolute URLs
- [ ] Run Lighthouse mobile audit — target ≥ 90 Performance, ≥ 95 SEO/Accessibility
- [ ] Submit `sitemap.xml` to Google Search Console after go-live

---

## File structure

```
/
├── index.html           # Home
├── about.html           # About
├── work.html            # Work & Research
├── writing.html         # Writing & Newsletter
├── coaching.html        # Tech & Soul — Coaching
├── contact.html         # Contact
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
