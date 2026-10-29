# 🌐 Hreflang Cluster & International Routing Specification

> **Client / Organization:** [Organization Name]  
> **Target Domains / TLDs:** [e.g., example.com, example.de, example.fr, example.co.uk]  
> **Prepared by:** [Lead International SEO Engineer]  
> **Date:** [YYYY-MM-DD]  
> **Specification Standard:** [RFC 5646 Language Tags / Google Search Central Guidelines]

---

## 1. Executive Summary & Regional Scope

This deliverable establishes the multi-regional and multilingual hreflang clustering configuration across primary markets to prevent localized duplicate content penalties and ensure searchers are served localized landing pages with localized currencies, languages, and shipping policies.

---

## 2. Regional Target Matrix & Language Tags

| Market / Region | Country Code (ISO 3166-1) | Language Code (ISO 639-1) | Combined Hreflang Code (RFC 5646) | Canonical Root URL | Primary Currency |
| :--- | :---: | :---: | :---: | :--- | :---: |
| **Global / Default** | - | - | `x-default` | `https://example.com/` | USD ($) |
| **United States** | `US` | `en` | `en-us` | `https://example.com/en-us/` | USD ($) |
| **United Kingdom** | `GB` | `en` | `en-gb` | `https://example.com/en-gb/` | GBP (£) |
| **Germany** | `DE` | `de` | `de-de` | `https://example.com/de/` | EUR (€) |
| **Austria** | `AT` | `de` | `de-at` | `https://example.com/de-at/` | EUR (€) |
| **France** | `FR` | `fr` | `fr-fr` | `https://example.com/fr/` | EUR (€) |
| **Canada (English)** | `CA` | `en` | `en-ca` | `https://example.com/en-ca/` | CAD ($) |
| **Canada (French)** | `CA` | `fr` | `fr-ca` | `https://example.com/fr-ca/` | CAD ($) |

---

## 3. Implementation Method: XML Sitemap Configuration

Per Google and Bing best practices, XML Sitemap injection is the preferred deployment method for enterprise websites exceeding 1,000 URLs to eliminate HTML `<head>` bloat and caching latency.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://example.com/solutions/enterprise</loc>
    <!-- Self-referencing default fallback -->
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/solutions/enterprise" />
    <xhtml:link rel="alternate" hreflang="en-us" href="https://example.com/en-us/solutions/enterprise" />
    <xhtml:link rel="alternate" hreflang="en-gb" href="https://example.com/en-gb/solutions/enterprise" />
    <xhtml:link rel="alternate" hreflang="de-de" href="https://example.com/de/solutions/enterprise" />
    <xhtml:link rel="alternate" hreflang="fr-fr" href="https://example.com/fr/solutions/enterprise" />
  </url>
  <url>
    <loc>https://example.com/en-us/solutions/enterprise</loc>
    <!-- Full return-link cluster -->
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/solutions/enterprise" />
    <xhtml:link rel="alternate" hreflang="en-us" href="https://example.com/en-us/solutions/enterprise" />
    <xhtml:link rel="alternate" hreflang="en-gb" href="https://example.com/en-gb/solutions/enterprise" />
    <xhtml:link rel="alternate" hreflang="de-de" href="https://example.com/de/solutions/enterprise" />
    <xhtml:link rel="alternate" hreflang="fr-fr" href="https://example.com/fr/solutions/enterprise" />
  </url>
</urlset>
```

---

## 4. Verification & Return Tag Audit Checklist

- [ ] **Bidirectional Return Links**: Every page pointing to a localized alternate has a matching reciprocal return tag.
- [ ] **Self-Referential Tag**: Every URL contains an alternate tag pointing back to itself.
- [ ] **Canonical Alignment**: Hreflang annotations point exclusively to self-canonical URLs returning HTTP 200 OK.
- [ ] **No Redirected Targets**: No hreflang tag points to a 301, 302, 404, or 500 status code.
- [ ] **Valid ISO Codes**: Language is declared before country code (e.g. `en-gb`, NOT `gb-en`).
- [ ] **x-default Declared**: A global fallback URL is assigned for unmapped locales and IP routing.

