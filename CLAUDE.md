# Website Project

## Repo context
At the start of any site or code session, confirm the repo and branch with `git remote -v && git branch --show-current` and state them back to me before editing. My live site is not the old 2019 Hugo repo.

## Project Overview
Linda Petrini's personal website — lindapetrini.com.
Positioning: "Technical writer for AI research labs". Seven years in AI research, including four at Google Brain; works with Anthropic, Foresight Institute, Palisade Research, Nebius Science, and the Bezos Earth Fund.
Pages: Home (index.html — hero, "What I do" + "How it works", story, six selected pieces, two testimonials, #contact with email, CV, and rate) and Work (work.html — #labs, #articles for Nebius Science, #papers, #essays Substack feed + subscribe form). Old /about, /writing, /contact, /coaching URLs 301 via `_redirects`.
Target audience: research lab leads arriving by personal referral.
All page copy is mirrored in `site-copy.md`; keep it in sync with the HTML.

## Tech Stack
- Static HTML/CSS — no build step, no framework, no JavaScript bundler
- CSS: custom design system with tokens, modular CSS files (main.css imports chain)
- JS: js/main.js (hamburger nav, email obfuscation, hash redirects, subscribe form) plus small inline scripts in the pages (nav scroll shadow; Substack feed loader on work.html)
- Analytics: Umami self-hosted (analytics.lindapetrini.com, privacy-friendly, no cookie banner)
- Subscribe form + Substack feed proxy: Cloudflare Worker at subscribe.lindapetrini.workers.dev (source in worker/, emails stored in a KV namespace)
- Fonts: Cormorant Garamond + Jost, loaded from the Google Fonts CDN in each page's `<head>`. The self-hosted WOFF2 files in /fonts/ (Inter, Newsreader) are present but not used by the live pages.
- Hosting: Cloudflare Pages (auto-deploy from GitHub on push to main)
- Dev server: python3 -m http.server 8000 OR npx serve .
- Agent environment: Docker (node:20-bookworm-slim + Claude Code), workspace at /workspace

## Project Structure
See README.md for full file tree. Key files:
- index.html, work.html — the two live pages
- site-copy.md — plain-text mirror of all page copy
- _redirects — Cloudflare Pages 301s for the retired about/writing/contact/coaching URLs
- css/main.css — CSS entry point (@import chain)
- css/tokens.css — design tokens (colours: warm cream/rose scheme, fonts, spacing)
- js/main.js — nav, email assembly, redirects, subscribe form
- images/ — linda-petrini.jpg/webp (hero photo), og.jpg (social preview), favicon.svg, logos/
- fonts/ — inter-variable.woff2, newsreader-variable.woff2, newsreader-italic-variable.woff2 (present, unused)
- cv/ — linda-petrini-cv.pdf (linked from both pages)
- worker/ — Cloudflare Worker for the subscribe form and Substack feed proxy
- partials/ — reference copies of nav/footer HTML
- sitemap.xml, robots.txt
- Not part of the two-page site but in the repo and deployed: dateme/ (redirect stub to date.lindapetrini.com), playwithme/ (Twine game), insights.html, resources/, design-1..5.html, linkedin-banner.html, old_website/

## Development Workflow
```bash
# Serve locally
python3 -m http.server 8000
# or: npx serve .
# Open http://localhost:8000

# In Docker (agent environment)
docker-compose up -d         # start/restart
docker exec -it claude-website bash  # shell in container
# Claude Code runs inside container with workspace mounted at /workspace
```

## SEO & Content Goals
- Clients arrive by referral, so search is secondary; the pages mainly need to read well in link previews and name searches
- Primary keywords: "Linda Petrini", "technical writer for AI research labs", "AI technical writer"
- Secondary: "AI safety technical writing", "research communication", "science communication for AI labs"
- Structured data: Person JSON-LD on index.html (jobTitle "Technical Writer")
- All pages: canonical URLs, OG/Twitter meta, descriptive titles
- Target: Lighthouse ≥90 Performance, ≥95 SEO/Accessibility on mobile
- Sitemap submitted to Google Search Console after launch
- Umami analytics self-hosted (no cookie banner needed)

## Agent Instructions

### General
- Always run in the context of this directory (`/workspace`)
- Prefer editing existing files over creating new ones
- Commit changes with descriptive messages after completing each logical unit of work
- Run linting/build checks before marking any task complete

### Research Tasks
- Use WebFetch and WebSearch freely for SEO research, competitor analysis, and documentation lookups
- Save research findings as markdown files in `research/` before acting on them
- Cite sources in any SEO or content recommendations

### Code Changes
- Do not modify files outside `/workspace`
- Test changes before committing
- Keep changes focused — one concern per commit

### Forbidden
- Never commit `.env` files or credentials
- Never push to remote without explicit user instruction
