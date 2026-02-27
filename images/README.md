# Images

Place these files here before launch:

## Required

| File | Description | Spec |
|------|-------------|------|
| `linda-petrini.jpg` | Hero + About photo | 840×1050px, JPEG, under 300KB |
| `linda-petrini.webp` | WebP version of above | Under 150KB (primary format served) |
| `og.jpg` | Social sharing preview image | 1200×630px, JPEG, under 200KB |

## Logos (Trusted By)

Place in `/images/logos/`:

| File | Organisation |
|------|-------------|
| `anthropic.svg` | Anthropic |
| `palisade.svg` | Palisade Research |
| `foresight.svg` | Foresight Institute |
| `bezos-earth-fund.svg` | Bezos Earth Fund (optional) |

SVG logos should be optimised — run through SVGO before adding.

## Image optimisation checklist

- [ ] Hero WebP is under 150KB
- [ ] Hero `<img>` has `fetchpriority="high"` (never `loading="lazy"`)
- [ ] All `<img>` elements have `alt`, `width`, `height` attributes
- [ ] OG image path is absolute URL in all `<meta property="og:image">` tags
- [ ] SVG logos don't contain Illustrator bloat (check file size < 10KB each)

## Getting Linda's photo

The current Carrd site at https://lindapetrini.com has a photo.
Right-click → Save image, then:
1. Resize to 840×1050px
2. Export as JPEG (quality 85) and WebP (quality 80)
3. Verify sizes meet the spec above
