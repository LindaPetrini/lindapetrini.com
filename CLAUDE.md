# Website Project

## Project Overview
Linda Petrini's personal website — lindapetrini.com.
Linda is an AI researcher, technical writer, and coach with 7+ years in ML/AI safety.
Pages: Home, About, Work (publications), Writing (Substack archive), Coaching, Contact.
Target audience: researchers, organisations, individuals interested in AI safety/policy; coaching clients.

## Tech Stack
- Static HTML/CSS — no build step, no framework, no JavaScript bundler
- CSS: custom design system with tokens, modular CSS files (main.css imports chain)
- JS: one file (main.js) — hamburger nav, email obfuscation, hash redirects
- Analytics: Umami self-hosted (analytics.lindapetrini.com, privacy-friendly, no cookie banner)
- Booking: Cal.com (https://cal.com/lindapetrini/20min)
- Newsletter/waitlist: Beehiiv embed
- Fonts: Inter (variable) + Newsreader (variable) — WOFF2, self-hosted in /fonts/
- Hosting target: Cloudflare Pages (free tier, auto-deploy from GitHub)
- Dev server: python3 -m http.server 8000 OR npx serve .
- Agent environment: Docker (node:20-bookworm-slim + Claude Code), workspace at /workspace

## Project Structure
See README.md for full file tree. Key files:
- index.html, about.html, work.html, writing.html, coaching.html, contact.html — all pages
- css/main.css — CSS entry point (@import chain)
- css/tokens.css — design tokens (colours: pink scheme, fonts, spacing)
- js/main.js — nav, email assembly, redirects
- images/ — linda-petrini.jpg/webp (hero photo), og.jpg (social preview), logos/
- fonts/ — inter-variable.woff2, newsreader-variable.woff2 (not yet present)
- cv/ — linda-petrini-cv.pdf (not yet present)
- partials/ — reference copies of nav/footer HTML
- sitemap.xml, robots.txt

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
- Primary keywords: "AI researcher", "AI safety researcher", "Linda Petrini", "AI coach"
- Secondary: "digital sovereignty", "AI technical writing", "AI policy research"
- Structured data: Person JSON-LD on index.html
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
