# Organisation Logos — Research Report

**Date:** 2026-02-27
**Task:** Download official logos for all organisations Linda Petrini is associated with.

---

## Organisations Identified

Sources scanned: `work.html`, `about.html`

| Organisation | Mentioned In | Context |
|---|---|---|
| Anthropic | work.html, about.html | Research support client |
| Palisade Research | work.html, about.html | Research support client |
| Bezos Earth Fund | work.html, about.html | AI & Climate Report co-author |
| Foresight Institute | work.html (testimonial) | Secure AI Tech Tree report client |
| ICLR (International Conference on Learning Representations) | work.html | Peer-reviewed paper at ICLR 2020 |

---

## Logos Downloaded

### 1. Anthropic — `anthropic.svg`
- **File:** `/images/logos/anthropic.svg`
- **Format:** SVG (wordmark)
- **Dimensions:** 578.9 × 65 px viewBox
- **Size:** 3.7 KB
- **Source:** Brandfetch CDN (`cdn.brandfetch.io/idmJWF3N06/theme/dark/logo.svg`), dark theme wordmark
- **Notes:** Full "ANTHROPIC" text wordmark in dark (#181818). This is the standard brand wordmark used on dark backgrounds.

### 2. Bezos Earth Fund — `bezos-earth-fund.svg`
- **File:** `/images/logos/bezos-earth-fund.svg`
- **Format:** SVG (full logo with icon mark + text)
- **Dimensions:** 176 × 75 px viewBox
- **Size:** 38.7 KB
- **Source:** Brandfetch CDN (`cdn.brandfetch.io/iddThyNs6p/theme/dark/logo.svg`)
- **Notes:** Full logo with the Bezos Earth Fund "B" icon mark and wordmark. Uses deep navy blue (#002041) and a radial gradient.

### 3. Foresight Institute — `foresight-institute.svg`
- **File:** `/images/logos/foresight-institute.svg`
- **Format:** SVG (full logo with icon + text)
- **Dimensions:** 603 × 255 px viewBox
- **Size:** 66.9 KB
- **Source:** Brandfetch CDN (`cdn.brandfetch.io/id5PqM2clA/theme/dark/logo.svg`), matches the Wikimedia Commons "Vector-Foresight-Logo-dark-blue.svg"
- **Notes:** Dark blue (#01509E) Foresight Institute logo. Preferred over the PNG downloaded from `foresight.org/wp-content/uploads/2025/05/logo.png` (which was 513×192 px PNG, 28 KB). SVG is vector and scales to any size.

### 4. ICLR — `iclr.svg`
- **File:** `/images/logos/iclr.svg`
- **Format:** SVG (wordmark)
- **Dimensions:** 281.93 × 84.35 px viewBox
- **Size:** 8.7 KB
- **Source:** Official ICLR website (`iclr.cc/static/core/img/ICLR-logo.svg`) — the footer logo, noted on their site as available for use in presentations
- **Notes:** Official ICLR wordmark SVG, Inkscape-generated. Multicolour logo (the four letters in gradient colours).

### 5. Palisade Research — `palisade.svg`
- **File:** `/images/logos/palisade.svg`
- **Format:** SVG (icon/symbol mark)
- **Dimensions:** 1920 × 1920 px viewBox (square icon)
- **Size:** 3.1 KB
- **Source:** Palisade Research official website (`palisaderesearch.org/assets/images/logos/palisade.svg`)
- **Notes:** This is the Palisade Research icon/symbol mark (their candle/torch symbol), not a text wordmark. No full horizontal wordmark SVG was found — the Brandfetch "wordmark" for this domain returned an incorrect X (Twitter) logo SVG. Their site uses this icon alongside plain text for the brand name. For logo bar use, this icon mark should be paired with the text "Palisade Research" in the markup.

---

## Not Downloaded / Not Needed

- **OpenReview** (linked as publication host for ICLR paper) — not an organisation Linda worked with, just a platform
- Social platforms (Twitter/Substack/LinkedIn) — standard social icons, not employer logos

---

## Usage Notes for the Logo Bar

The logos vary significantly in style:

- **Anthropic, ICLR**: Dark monochrome wordmarks — will display well on light backgrounds with CSS `filter: grayscale(1)` or at natural colour
- **Bezos Earth Fund**: Navy blue with gradient — works on white/light backgrounds
- **Foresight Institute**: Dark blue — works on white/light backgrounds
- **Palisade Research**: Icon only — pair with text label in HTML; or apply `filter: grayscale(1)` for consistency

Recommended CSS for logo bar (consistent greyscale treatment):
```css
.logo-bar__logo img {
  filter: grayscale(1) opacity(0.6);
  transition: filter 0.2s;
}
.logo-bar__logo img:hover {
  filter: grayscale(0) opacity(1);
}
```

---

## Sources

- Anthropic logo: [Brandfetch — anthropic.com](https://brandfetch.com/anthropic.com)
- Bezos Earth Fund logo: [Brandfetch — bezosearthfund.org](https://brandfetch.com/bezosearthfund.org)
- Foresight Institute logo: [Brandfetch — foresight.org](https://brandfetch.com/foresight.org) / [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Vector-Foresight-Logo-dark-blue.svg)
- ICLR logo: [iclr.cc official site](https://iclr.cc/static/core/img/ICLR-logo.svg)
- Palisade Research logo: [palisaderesearch.org official site](https://palisaderesearch.org/assets/images/logos/palisade.svg)
