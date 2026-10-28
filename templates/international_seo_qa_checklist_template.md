# 🌍 International SEO & Hreflang QA Checklist Template

> **Domain / Network:** `[https://example.com]`  
> **Target Markets & Locales:** `[e.g., US (en-us), UK (en-gb), DE (de-de), Global (x-default)]`  
> **Prepared by:** `[International SEO Specialist / AI Agent ID]`  
> **Review Date:** `[YYYY-MM-DD]`  
> **Reference Skill:** [Hreflang](../SEO/International%20SEO/Hreflang/SKILL.md) & [Multilingual SEO](../SEO/International%20SEO/Multilingual%20SEO/SKILL.md)

---

## 1. Architectural Strategy (Structure Selection)
- **Chosen International Architecture**:
  - `[ ]` Country-Code Top-Level Domains (ccTLDs): `example.de`, `example.fr`
  - `[x]` Subdirectories with gTLD: `example.com/de/`, `example.com/fr/`
  - `[ ]` Subdomains with gTLD: `de.example.com`, `fr.example.com`
- **Rationale**: `[Explain choice based on domain authority consolidation, infrastructure overhead, and cost]`

---

## 2. Hreflang Cluster Annotation Matrix
Every page in a cluster **MUST** bi-directionally reference all sibling pages including itself:

| Target Market | Language-Region Code | Canonical URL | Return Tag Verified? | Self-Referencing Tag Verified? |
| :--- | :---: | :--- | :---: | :---: |
| Global Default | `x-default` | `https://example.com/` | `[Yes/No]` | `[Yes/No]` |
| United States | `en-us` | `https://example.com/en-us/` | `[Yes/No]` | `[Yes/No]` |
| United Kingdom| `en-gb` | `https://example.com/en-gb/` | `[Yes/No]` | `[Yes/No]` |
| Germany | `de-de` | `https://example.com/de/` | `[Yes/No]` | `[Yes/No]` |

---

## 3. Implementation Method (Choose One)
- `[ ]` **HTML `<head>` Link Elements**:
  ```html
  <link rel="alternate" hreflang="x-default" href="https://example.com/" />
  <link rel="alternate" hreflang="en-us" href="https://example.com/en-us/" />
  <link rel="alternate" hreflang="de-de" href="https://example.com/de/" />
  ```
- `[x]` **XML Sitemap Indexing** *(Recommended for sites with >5,000 URLs to avoid HTML bloat)*:
  ```xml
  <url>
    <loc>https://example.com/en-us/</loc>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/" />
    <xhtml:link rel="alternate" hreflang="en-us" href="https://example.com/en-us/" />
    <xhtml:link rel="alternate" hreflang="de-de" href="https://example.com/de/" />
  </url>
  ```
- `[ ]` **HTTP Response Headers** *(For non-HTML PDF assets)*:
  `Link: <https://example.com/de/doc.pdf>; rel="alternate"; hreflang="de"`

---

## 4. Pre-Flight Verification Checklist
- [ ] Language codes conform strictly to ISO 639-1 (lowercase, 2 letters).
- [ ] Regional country codes conform strictly to ISO 3166-1 Alpha-2 (lowercase, 2 letters).
- [ ] Region-only codes are NEVER used (e.g., `hreflang="gb"` is invalid; must be `hreflang="en-gb"`).
- [ ] Complete bi-directional return links exist across 100% of URLs in every cluster.
- [ ] Self-referencing tag is included on every page.
- [ ] An `x-default` fallback is explicitly declared for unmatched browser locales.
- [ ] No automatic IP or user-agent based 302 redirects prevent Googlebot from crawling alternate versions.
- [ ] Canonical tags on each localized page point to itself (never canonicalize localized versions to the English default).
