# Fonts

Self-host Inter and Newsreader variable fonts here.

## Why self-host?

A 2022 Munich court ruling found that loading Google Fonts from their CDN
transmits user IP addresses to Google, violating GDPR. Self-hosting eliminates
this risk and also removes a third-party DNS lookup (faster performance).

## Files needed

| Filename | Font | Notes |
|----------|------|-------|
| `inter-variable.woff2` | Inter (variable, all weights) | Used for all body/UI text |
| `newsreader-variable.woff2` | Newsreader (variable, upright) | Used for headings/quotes |
| `newsreader-italic-variable.woff2` | Newsreader (variable, italic) | Used for italic text |

## How to download

### Option 1 — google-webfonts-helper (recommended)
1. Go to https://gwfh.mranftl.com/fonts
2. Search for "Inter" → select all weights → download WOFF2
3. Search for "Newsreader" → select all weights → download WOFF2

### Option 2 — fontsource npm (if you add a build step later)
```
npm install @fontsource-variable/inter @fontsource-variable/newsreader
```

## Until fonts are added

The site falls back to `system-ui, -apple-system, sans-serif` and `Georgia, serif`.
It will look fine. The fonts just make it look better.
