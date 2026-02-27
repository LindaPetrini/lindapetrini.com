# Archive Report — lindapetrini.com & lindapetrini.github.io

**Archived:** 2026-02-27
**Purpose:** Preserve the current live sites before lindapetrini.com is replaced by the new static site build.

---

## 1. lindapetrini.com (Carrd.co site)

### Overview
- **URL:** https://lindapetrini.com
- **Platform:** Carrd.co (served via Cloudflare CDN)
- **HTTP Status:** 200 OK
- **Last-Modified (server):** Thu, 21 Aug 2025 07:29:07 GMT
- **HTML size:** 93,948 bytes (~92 KB, single-page app with all CSS/JS inline)

### Page Title & Description
- **Title:** "Linda Petrini: AI Writing & Research Expertise"
- **Meta Description:** "Technical AI writer offering content creation, academic support, and AI editing. 7+ years in AI research. Contact for professional services."

### Analytics
- **Google Analytics:** G-Y890B8NZXS (gtag.js)
- **Simple Analytics:** scripts.simpleanalyticscdn.com/latest.js

### Page Sections (visible content)
1. **Hero / Header** — Name, social links (X, LinkedIn, Email)
2. **Trusted by** — (placeholder/no logos visible in text)
3. **Services (summary)** — Content creation for technical audiences, Academic writing support, Research and writing of AI-related content
4. **Work Samples** — Links to: Anthropic Paper (Alignment Faking), Bezos Earth Fund Workshop Report, ICLR paper (arXiv), DataStax GenAI Article
5. **Experience** — 7+ years as technical AI Researcher, 4 years at Google (Research Associate), 2+ years as Technical Writer
6. **Get in touch** — Email link (Cloudflare-obfuscated)
7. **Blog** — Beehiiv blog embed (bh_id: 60kVSqo9HFtYa5NDI2OQ)
8. **Full Services page** — Detailed breakdown: Technical Content Creation, Academic Writing Support, AI Editing & Proofreading, Presentation & Visual Content, Event Reporting & Documentation, Customized AI Communication Projects

### Typography
- Cinzel Decorative, Playfair Display, Cinzel, Inter — loaded from Google Fonts
- Monospace fallbacks: Lucida Console, Courier New

### External Links Found
| Label | URL |
|---|---|
| X / Twitter | https://x.com/petrini_linda |
| LinkedIn | https://www.linkedin.com/in/petrinilinda/ |
| Anthropic Paper | https://assets.anthropic.com/m/983c85a201a962f/original/Alignment-Faking-in-Large-Language-Models-full-paper.pdf |
| Bezos Earth Fund Workshop Report | https://www.bezosearthfund.org/uploads/Bezos-Earth-Fund-AI-for-Climate-and-Nature-Workshop-Report.pdf |
| ICLR paper | https://arxiv.org/abs/1912.12179 |
| GenAI Article | https://www.datastax.com/guides/how-to-prepare-data-for-ai |
| CV | https://drive.google.com/file/d/1Rzmqzrp6SEMMUIoZ5SbqUkImCkD-SMxk/view?usp=sharing |

### Emails (Cloudflare-obfuscated)
Two encoded email addresses found in `/cdn-cgi/l/email-protection#...` paths — decoded email is `lindapetrini@gmail.com`.

### Images
- `image01.jpg` — Profile photo (69,591 bytes)
- `image02.jpg` — (137,960 bytes)
- `image03.jpg` — (107,117 bytes)
- `gallery01/076bc14d.png` — Gallery item (50,277 bytes)
- `gallery01/ddd87caa.png` — Gallery item (23,547 bytes)
- `gallery01/868e3a78.jpg` — Gallery item (3,538 bytes)
- `apple-touch-icon.png` — (13,736 bytes)
- `favicon.png` — (1,588 bytes)

---

## 2. lindapetrini.github.io (GitHub Pages site)

### Overview
- **URL:** https://lindapetrini.github.io
- **Platform:** GitHub Pages
- **HTTP Status:** 200 OK
- **Last-Modified (server):** Sun, 19 Nov 2023 20:21:40 GMT
- **HTML size:** 487,164 bytes (~476 KB, entirely self-contained single-file Twine game)

### Content: "Heart vs AI, V1"
An interactive fiction game built with **Twine** (Harlowe format), published November 2023. The player takes the role of a Lead Research Scientist at a fictional AI company "DeepOpen" developing AGI, making moral decisions about trusting intuition vs. logic as AI systems advance.

### Game Structure
- **19 passages** total
- **Decision tracking:** `$logicCount` and `$intuitionCount` variables
- **Three possible endings:**
  1. **Logic ending** — "AI took over" (bleak)
  2. **Balance ending** — "Unstoppable but slowed" (mixed)
  3. **Intuition ending** — "Prevented AI takeover" (optimistic)

### Passage Names
Story Setting, The End, Choice 1, Choice 2, Choice 3, Choice 4, Choice 5, Choice 6, Final Decision, Logic, Intuition, Balance, Neutral, Contact, No, Choice 1b, Choice 2b, Choice 3b, Choice 5b

### Assets
No external assets — the entire game (HTML + CSS + JS + story data) is embedded in a single 476 KB HTML file. The game uses custom CSS with: black background, `#50C878` green button color, animated transitions (dissolve, shudder, pulse, zoom, blur).

---

## 3. Files Saved

### /root/projects/website_agents/old_website/ (lindapetrini.com archive)

| File | Size |
|---|---|
| `index.html` | 93,948 bytes |
| `assets/images/apple-touch-icon.png` | 13,736 bytes |
| `assets/images/favicon.png` | 1,588 bytes |
| `assets/images/image01.jpg` | 69,591 bytes |
| `assets/images/image02.jpg` | 137,960 bytes |
| `assets/images/image03.jpg` | 107,117 bytes |
| `assets/images/gallery01/076bc14d.png` | 50,277 bytes |
| `assets/images/gallery01/ddd87caa.png` | 23,547 bytes |
| `assets/images/gallery01/868e3a78.jpg` | 3,538 bytes |
| `cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js` | 1,239 bytes |
| `assets/fonts/google-fonts.css` | 2,816 bytes |
| `assets/noscript.gif` | 43 bytes |

**Total: 12 files, ~482 KB**

### /root/projects/website_agents/playwithme/ (lindapetrini.github.io archive)

| File | Size |
|---|---|
| `index.html` | 487,164 bytes |

**Total: 1 file, ~476 KB**

---

## 4. Issues & Notes

- **Carrd CSS/JS inline:** The Carrd platform injects all styles and scripts directly into the HTML — there are no separate `.css` or `.js` files to download. The 93 KB HTML is self-contained aside from images and Cloudflare's email decode script.
- **Google Fonts:** The site loads fonts from `fonts.googleapis.com` at runtime. An offline snapshot of the font CSS was saved (`assets/fonts/google-fonts.css`) but the actual WOFF2 font binaries were not downloaded (they require browser UA headers to get WOFF2 and the URLs are dynamic).
- **Cloudflare email obfuscation:** Two emails encoded in `/cdn-cgi/l/email-protection` paths. The Cloudflare decode script was saved. The decoded email is `lindapetrini@gmail.com`.
- **Google Analytics ID:** `G-Y890B8NZXS` — noted for reference (different from any analytics on the new site).
- **Simple Analytics:** Also present on the old site alongside GA.
- **Beehiiv blog embed:** Uses `bh_id: "60kVSqo9HFtYa5NDI2OQ"` — the blog content is loaded dynamically from Beehiiv's servers and cannot be statically archived this way.
- **GitHub Pages game date:** Last modified November 2023, suggesting this was created ~2 years before the current date. No updates since.
- **No other GitHub Pages URLs found** (e.g. `lindapetrini.github.io/something` subpaths were not checked, but the root returns a complete standalone page).
