---
name: seo-hreflang
description: ISO 639-1 / ISO 3166-1 tag implementation, reciprocal return link validation, x-default fallback architecture, and cross-language canonicalization.
metadata:
  category: International SEO
  discipline: Global Architecture
  version: "1.0.0"
---

# Hreflang Implementation & Validation

## A. Purpose
The Hreflang skill governs the technical architecture, deployment, and automated validation of `rel="alternate" hreflang="x"` annotations across international, multi-regional, and multilingual websites. When a business serves users across different languages or geographic regions (e.g. English in the US vs. English in the UK, or German in Germany vs. German in Switzerland), search engines must deliver the correct regional and linguistic URL to the searcher. Improper hreflang implementation leads to severe indexing failures: reciprocal return link errors, duplicate content cannibalization, and wrong-language pages outranking local versions. This skill provides an auditable protocol to maintain 100% hreflang integrity.

## B. Trigger Conditions
Invoke this skill when:
1. Launching localized or translated versions of a website across new geographic countries or languages.
2. Google Search Console reports "Hreflang tags have no return-tags" or "Unknown language/region code" errors.
3. Users in a specific target country (e.g. United Kingdom) consistently land on the wrong regional URL (e.g. the US pricing page in USD instead of GBP).
4. Refactoring international architecture between ccTLDs, subdomains, and subdirectories.

Upstream dependencies: [URL Optimization](../../On-page%20SEO/URL%20Optimization/SKILL.md) and [Indexing](../../Technical%20SEO/Indexing/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - ISO 639-1 (Language) and ISO 3166-1 Alpha-2 (Region) format validation.
  - The 3 supported implementation methods: HTML `<head>` link tags, HTTP response headers, and XML Sitemaps.
  - Reciprocal return link enforcement (Page A -> Page B requires Page B -> Page A).
  - The `x-default` global selector for international landing pages and IP redirect fallbacks.
  - Interaction rules between `rel="canonical"` and `rel="alternate" hreflang`.
- **Out-of-Scope**:
  - Translating or transcreating copy into target languages (Handled by [Translation SEO](../Translation%20SEO/SKILL.md)).
  - Choosing between ccTLDs vs subdomains vs subfolders (Handled by [Multilingual SEO](../Multilingual%20SEO/SKILL.md)).
  - Currency conversion logic and payment gateway routing.

## D. Required Inputs
1. **Target Language & Country Matrix**: Specific pairings (e.g., `en-US`, `en-GB`, `en-AU`, `de-DE`, `de-AT`, `fr-FR`, `es-ES`).
2. **Cluster URL Mapping Spreadsheet**: Complete 1-to-1 table mapping every localized URL to its exact alternate counterparts.
3. **Chosen Delivery Method**: HTML `<head>`, XML Sitemap, or HTTP Headers (for PDFs).

## E. Required Tools and Data Sources
- **Commercial Tooling**: Screaming Frog SEO Spider (Hreflang tab: missing return links, invalid language codes, canonical mismatches), Ahrefs Site Audit.
- **Zero-Cost / Open Source Alternatives**:
  - Merkle Hreflang Tags Testing Tool.
  - Google Search Console International Targeting (legacy reports & URL Inspection).
  - W3C Internationalization Checker.
  - Python scripts validating bidirectional symmetry across URL clusters using `requests` and `BeautifulSoup`.

## F. Core Concepts and Decision Principles
1. **The Strict Syntax Rules (ISO Standards)**:
   - Language code: **Must be ISO 639-1 (two-letter lowercase)** (e.g., `en`, `de`, `fr`, `es`).
   - Region / Country code (Optional): **Must be ISO 3166-1 Alpha-2 (two-letter uppercase or lowercase, typically uppercase in documentation)** (e.g., `US`, `GB`, `DE`, `CA`).
   - *Valid Syntax*: `hreflang="en-GB"`, `hreflang="de-CH"`, `hreflang="es"`.
   - *Invalid / Broken Syntax*:
     - `hreflang="en-UK"` (Invalid: UK is not an ISO 3166-1 code; the correct code for United Kingdom is `GB`).
     - `hreflang="eng"` (Invalid: 3-letter codes are not permitted in ISO 639-1).
     - `hreflang="US"` (Invalid: Region cannot stand alone without a preceding language code).
2. **The Reciprocal Link Law (Bidirectional Symmetry)**:
   - Hreflang annotations are **bi-directional contracts**.
   - If `https://example.com/en/` points to `https://example.com/de/` as the German alternate, then `https://example.com/de/` **MUST point back to `https://example.com/en/`**.
   - If the return link is missing, Google completely ignores the hreflang annotation for both pages to prevent third-party domains from claiming arbitrary associations.
3. **The Self-Referencing Requirement**:
   - Every localized page must include an hreflang tag that points to **itself** in addition to all its alternate counterparts.
4. **Canonical vs. Hreflang Interaction**:
   - Every localized page must have a **self-referencing canonical tag** pointing to its own exact URL.
   - **NEVER** point canonical tags from localized versions (`/de/` or `/fr/`) back to the English (`/en/`) version. Doing so tells Google that the foreign language page is a duplicate, which invalidates the hreflang alternate relationship!

## G. Operational Workflow

```
[Define Country/Language Matrix] -> [Build 1-to-1 URL Translation Cluster]
                |                                         |
                v                                         v
 [Select Method (HTML vs Sitemap)] -> [Inject x-default & Self-Referencing Tags]
                |                                         |
                v                                         v
   [Validate Reciprocal Symmetry] -> [Test with Scripted Hreflang Validator]
```

### Step 1: Design the Multi-Regional Cluster
Map a single concept across all international target versions:
- Global English / Unassigned: `https://example.com/solutions/backup/` (`x-default`)
- US English: `https://example.com/en-us/solutions/backup/` (`en-US`)
- UK English: `https://example.com/en-gb/solutions/backup/` (`en-GB`)
- Germany (German): `https://example.com/de-de/solutions/backup/` (`de-DE`)
- Switzerland (German): `https://example.com/de-ch/solutions/backup/` (`de-CH`)
- France (French): `https://example.com/fr-fr/solutions/backup/` (`fr-FR`)

### Step 2: Implementation via HTML `<head>` (Small to Mid-Scale Sites)
If your site has $< 1,000$ pages, inject the complete cluster block into the `<head>` of **every single page in the cluster**:
```html
<!-- In the <head> of EVERY URL in the cluster: -->
<link rel="canonical" href="https://example.com/en-us/solutions/backup/" />

<link rel="alternate" hreflang="x-default" href="https://example.com/solutions/backup/" />
<link rel="alternate" hreflang="en-US" href="https://example.com/en-us/solutions/backup/" />
<link rel="alternate" hreflang="en-GB" href="https://example.com/en-gb/solutions/backup/" />
<link rel="alternate" hreflang="de-DE" href="https://example.com/de-de/solutions/backup/" />
<link rel="alternate" hreflang="de-CH" href="https://example.com/de-ch/solutions/backup/" />
<link rel="alternate" hreflang="fr-FR" href="https://example.com/fr-fr/solutions/backup/" />
```

### Step 3: Implementation via XML Sitemaps (Enterprise Scale)
If your website has tens of thousands of pages, avoid HTML bloat by deploying hreflang annotations directly within your [XML Sitemaps](../../Technical%20SEO/XML%20Sitemaps/SKILL.md):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://example.com/en-us/solutions/backup/</loc>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/solutions/backup/" />
    <xhtml:link rel="alternate" hreflang="en-US" href="https://example.com/en-us/solutions/backup/" />
    <xhtml:link rel="alternate" hreflang="de-DE" href="https://example.com/de-de/solutions/backup/" />
  </url>
  <url>
    <loc>https://example.com/de-de/solutions/backup/</loc>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/solutions/backup/" />
    <xhtml:link rel="alternate" hreflang="en-US" href="https://example.com/en-us/solutions/backup/" />
    <xhtml:link rel="alternate" hreflang="de-DE" href="https://example.com/de-de/solutions/backup/" />
  </url>
</urlset>
```

### Step 4: The `x-default` Fallback Standard
1. The `x-default` value is reserved for **unmatched users**: visitors whose language/region is not explicitly covered by your available alternates.
2. It should point to:
   - Your global landing page or language selector gateway.
   - Or your default international English version.
3. Every hreflang cluster should feature exactly one `x-default` tag.

### Step 5: Automated Reciprocal Link Validation (Python)
Audit a cluster of URLs to verify bidirectional integrity:
```python
import requests
from bs4 import BeautifulSoup

def validate_hreflang_cluster(urls):
    cluster_links = {}
    for u in urls:
        html = requests.get(u).text
        soup = BeautifulSoup(html, 'html.parser')
        alts = {link.get('hreflang'): link.get('href') for link in soup.find_all('link', rel='alternate') if link.get('hreflang')}
        cluster_links[u] = alts
        
    errors = []
    for source_url, declared_alts in cluster_links.items():
        for lang, target_url in declared_alts.items():
            if lang == 'x-default': continue
            # Check reciprocal return link
            target_alts = cluster_links.get(target_url, {})
            if source_url not in target_alts.values():
                errors.append(f"RECIPROCAL ERROR: {source_url} links to {target_url} ({lang}), but {target_url} does NOT link back!")
                
    return errors

test_cluster = [
    "https://example.com/en-us/solutions/backup/",
    "https://example.com/de-de/solutions/backup/"
]
print("Validation Results:", validate_hreflang_cluster(test_cluster))
```

## H. Analysis and Decision Framework
Use this framework to troubleshoot international ranking errors:

```
                  [Wrong Language/Country URL Ranking]
                                   |
                  Is hreflang implemented for that URL?
                             /          \
                          [Yes]         [No]
                           /              \
             Does Screaming Frog report    (Deploy 1-to-1 hreflang
             missing return link errors?    cluster tags immediately)
                    /          \
                 [Yes]         [No]
                  /              \
         (Fix bidirectional    Does the page have a self-canonical,
          symmetry on target)   or does it point to English?
                                      /              \
                               [Points to English]  [Self-Canonical OK]
                                      /                      \
                              (CRITICAL BUG: Change   (Check IP redirection
                               to self-referencing     and local backlinks)
                               canonical tag)
```

## I. Prioritization Framework
Score international hreflang issues using the **International Traffic Risk (ITR)**:

$$\text{ITR} = \text{Monthly Traffic of Affected Market} \times (\text{Missing Return Link: 5} + \text{Canonical Conflict: 10} + \text{Invalid ISO Code: 3})$$

Canonical conflicts on localized commercial landing pages must be remediated as a P0 emergency.

## J. Deliverables & Specifications
Deliver an **International Hreflang Mapping & Validation Manifest**:
1. `cluster_id`: Unique thematic identifier.
2. `x_default_url`: Global default fallback.
3. `localized_variants_table`: Mapping Language/Region codes to absolute URLs.
4. `implementation_method`: HTML Head, XML Sitemap, or HTTP Header.
5. `reciprocal_validation_status`: Pass (0 missing returns).
6. `canonical_alignment_status`: Pass (all URLs self-canonicalized).

## K. Quality Assurance Checklist
- [ ] ISO 639-1 language codes verified (e.g. `en`, `es`, `ja`).
- [ ] ISO 3166-1 region codes verified (e.g. `GB`, not `UK`).
- [ ] 100% reciprocal return link symmetry confirmed across all cluster URLs.
- [ ] Self-referencing hreflang tag included on every page.
- [ ] Every localized page features a self-referencing canonical tag.
- [ ] Exactly one `x-default` tag defined per cluster.
- [ ] All URLs in the cluster return HTTP 200 OK (no redirects, no 404s).

## L. Failure Modes and Anti-Patterns
- **The "en-UK" Bug**: Using `hreflang="en-UK"`. `UK` is not recognized by ISO 3166-1 for the United Kingdom (`GB` is mandatory). Googlebot throws a syntax error and discards the tag.
- **The Canonical Override**: Pointing the canonical tag of `/de/page/` to `/en/page/`. Google will de-index the German page as a duplicate, completely breaking German search visibility.
- **The One-Way Street**: Adding hreflang tags to the English page pointing to the French page, but forgetting to update the French template to link back to English. Google discards both.

## M. AI-Agent Operating Instructions
1. An AI agent must validate language and country codes against official ISO 639-1 and ISO 3166-1 tables before outputting tags.
2. Never output an hreflang cluster without including the self-referencing tag and the `x-default` tag.
3. Check that the `<link rel="canonical">` matches the exact URL of the localized document.

## N. Success Metrics & Verification Windows
- **GSC Validation**: Zero "no return tags" errors reported in Google Search Console international reports within 21 days.
- **SERP Localization**: Users in target countries (e.g. Germany) see the localized URL (`/de-de/`) in Google Top 5 rather than the generic English version within 45 days.

## O. Related Skills
- **Architecture Strategy**: [Multilingual SEO](../Multilingual%20SEO/SKILL.md)
- **Content Quality**: [Translation SEO](../Translation%20SEO/SKILL.md)
- **Technical Infrastructure**: [XML Sitemaps](../../Technical%20SEO/XML%20Sitemaps/SKILL.md), [Indexing](../../Technical%20SEO/Indexing/SKILL.md)

## P. Authoritative References
- [Google Search Central: Managing Multi-Regional and Multilingual Sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) — Official guidelines on hreflang syntax, sitemap integration, and geo-targeting.
- [ISO 639-1 Language Codes](https://www.iso.org/iso-639-language-codes.html) — Official standard for 2-letter language identifiers.
- [ISO 3166-1 Alpha-2 Country Codes](https://www.iso.org/iso-3166-country-codes.html) — Official standard for 2-letter country identifiers.

## Q. Maintenance and Review Cycle
- **Quarterly International Crawl**: Execute a Screaming Frog crawl targeting international subfolders every 90 days to catch broken return tags created when editors delete or move single-language pages.
