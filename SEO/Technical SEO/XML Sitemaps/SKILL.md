---
name: seo-xml-sitemaps
description: XML Sitemap protocol architecture, automated sitemap index generation, sitemap hygiene auditing, and hreflang/image integration.
metadata:
  category: Technical SEO
  discipline: Technical Architecture
  version: "1.0.0"
---

# XML Sitemaps

## A. Purpose
The XML Sitemaps skill governs the architectural design, automated generation, validation, and maintenance of XML Sitemaps adhering to the Sitemaps.org protocol. An XML sitemap acts as a direct, authoritative discovery roadmap submitted to search engines, communicating which URLs are canonical, when they were last modified, and how they relate across multilingual language alternates. A corrupted or polluted sitemap—containing 404s, 301 redirects, or uncanonicalized URLs—erodes search engine trust in your site’s metadata. This skill ensures your XML sitemap infrastructure operates with 100% technical purity.

## B. Trigger Conditions
Invoke this skill when:
1. Launching a new website or restructuring domain taxonomies.
2. Publishing programmatic content or large catalogs exceeding 10,000 URLs.
3. Troubleshooting slow indexation velocity where new articles take weeks to be discovered by Google.
4. Auditing a site after receiving Google Search Console sitemap processing errors ("Couldn't fetch" or "Sitemap contains URLs which are blocked by robots.txt").

Upstream dependencies: [URL Optimization](../../On-page%20SEO/URL%20Optimization/SKILL.md) and [Indexing](../Indexing/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - XML Sitemap protocol compliance (`<urlset>`, `<sitemapindex>`, `<loc>`, `<lastmod>`).
  - Sitemap Index splitting for large scale domains ($> 50,000$ URLs or $> 50\text{MB}$ uncompressed).
  - Sitemap hygiene auditing: Enforcing that 100% of URLs are HTTP 200 OK, indexable, and canonical.
  - Integration of Google News, Image, and Hreflang extensions.
  - Automated dynamic generation via CI/CD pipelines or CMS engines.
- **Out-of-Scope**:
  - HTML visual sitemaps for human visitors (Handled by frontend UX).
  - Robots.txt directive configuration (Handled by [RobotsTXT](../RobotsTXT/SKILL.md)).
  - Server redirect handling (Handled by [Redirects](../Redirects/SKILL.md)).

## D. Required Inputs
1. **Target Domain Hostname**: Base URL (`https://example.com`).
2. **Complete Inventory of Published Canonical URLs**: Extracted from CMS database or build artifacts.
3. **Current Sitemap URL**: Location of master sitemap (typically `https://example.com/sitemap_index.xml` or `https://example.com/sitemap.xml`).
4. **Google Search Console Sitemap Submission Status**: Status, type, submitted count, and indexed count.

## E. Required Tools and Data Sources
- **Commercial Tooling**: Screaming Frog SEO Spider (Sitemaps audit mode: cross-referencing crawl with sitemap URLs).
- **Zero-Cost / Open Source Alternatives**:
  - Google Search Console Sitemaps API / web interface.
  - XML validation CLI tools: `xmllint` (`xmllint --schema sitemap.xsd sitemap.xml`).
  - Python scripts using `xml.etree.ElementTree` or `lxml` to parse, validate, and compare sitemaps.
  - Curl to verify gzip compression and HTTP response headers.

## F. Core Concepts and Decision Principles
1. **The 100% Indexable Purity Rule**:
   - An XML sitemap is a **declaration of indexable canonical URLs**, not an exhaustive log of every URL your server generates.
   - **NEVER** include the following in an XML sitemap:
     - URLs returning HTTP 3xx (Redirects).
     - URLs returning HTTP 4xx (Client errors) or 5xx (Server errors).
     - URLs marked with `<meta name="robots" content="noindex">`.
     - URLs that point their `rel="canonical"` tag to a different page.
     - Parameterized duplicate URLs.
2. **Protocol Limits & Sitemap Indexes**:
   - The Sitemaps.org specification limits a single XML sitemap file to **50,000 URLs** and **50MB** (uncompressed).
   - If a website exceeds 10,000 URLs, best practice is to split content into multiple category-specific sitemaps (e.g., `sitemap-products.xml`, `sitemap-blog.xml`, `sitemap-pages.xml`) linked together under a master **Sitemap Index** (`sitemap_index.xml`).
3. **The `lastmod` Timestamp Authenticity**:
   - Google officially relies on `<lastmod>` to prioritize re-crawling updated content.
   - However, `<lastmod>` **must be accurate**. Updating `<lastmod>` across 10,000 pages when only 2 pages changed causes Googlebot to distrust your sitemap timestamps and ignore the signal entirely.
   - Always format dates in W3C Datetime / ISO 8601 standard: `YYYY-MM-DD` or `YYYY-MM-DDTHH:mm:ss+00:00`.

## G. Operational Workflow

```
[Fetch Current Master XML Sitemap] -> [Parse All Child Sitemaps & Extract URLs]
                 |                                      |
                 v                                      v
 [Audit HTTP Status Codes (Must be 200)] -> [Verify Self-Referencing Canonicals]
                 |                                      |
                 v                                      v
  [Cross-Reference Orphan Pages (Site vs Map)] -> [Submit Validated Index to GSC]
```

### Step 1: Master Sitemap Index Architecture
For any site with multiple content sections, deploy a structured master sitemap index:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-pages.xml</loc>
    <lastmod>2026-10-29T02:00:00+00:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-solutions.xml</loc>
    <lastmod>2026-10-28T14:30:00+00:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-blog.xml</loc>
    <lastmod>2026-10-29T01:15:00+00:00</lastmod>
  </sitemap>
</sitemapindex>
```

### Step 2: Individual URLset Implementation
Each child sitemap must follow the strict `<urlset>` protocol:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://example.com/resources/database-guides/postgresql-backup/</loc>
    <lastmod>2026-10-29T02:00:00+00:00</lastmod>
    <!-- Optional: Inline Hreflang alternates if multilingual -->
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/resources/database-guides/postgresql-backup/" />
    <xhtml:link rel="alternate" hreflang="de" href="https://example.com/de/resources/database-guides/postgresql-backup/" />
  </url>
</urlset>
```
*(Note: Omit `<changefreq>` and `<priority>`. Google has officially stated that Googlebot completely ignores these two tags; maintaining them is pointless overhead).*

### Step 3: Automated Sitemap Hygiene Audit (Python)
Audit every URL listed in your sitemaps to verify 100% compliance:
```python
import xml.etree.ElementTree as ET
import requests

def audit_sitemap(sitemap_url):
    resp = requests.get(sitemap_url)
    root = ET.fromstring(resp.content)
    # Namespace handling
    ns = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    urls = [elem.text for elem in root.findall('.//ns:loc', ns)]
    
    print(f"Auditing {len(urls)} URLs in sitemap...")
    errors = []
    for u in urls:
        r = requests.head(u, allow_redirects=False)
        if r.status_code != 200:
            errors.append(f"DIRTY SITEMAP ERROR: {u} returned HTTP {r.status_code}")
            
    return errors
```

### Step 4: Cross-Reference Orphan Discovery
1. Run Screaming Frog with "Crawl Linked XML Sitemaps" enabled.
2. In the **Sitemaps** report tab, evaluate:
   - **URLs in Sitemap but Not Crawled**: Orphan pages that lack internal links from the website structure.
   - **URLs Crawled but Not in Sitemap**: Newly published or forgotten pages that need to be added to the sitemap generation pipeline.

### Step 5: Submit and Reference in Robots.txt
1. Add the absolute URL of your sitemap index to the bottom of `robots.txt`:
   ```
   Sitemap: https://example.com/sitemap_index.xml
   ```
2. Submit the sitemap index to Google Search Console (Indexing > Sitemaps) and Bing Webmaster Tools.

## H. Analysis and Decision Framework
Use this framework to triage sitemap anomalies:

```
                  [URL Discovered in XML Sitemap]
                                 |
                     Does it return HTTP 200 OK?
                            /            \
                         [Yes]           [No]
                          /                \
             Is it self-canonicalized?     (REMOVE IMMEDIATELY:
                    /          \            Never include 3xx/4xx/5xx)
                 [Yes]         [No]
                  /              \
        Is it indexable?       (REMOVE: Never include
          (no noindex)          uncanonicalized URLs)
            /       \
         [Yes]      [No]
          /           \
       (KEEP)     (REMOVE: Never include noindex URLs)
```

## I. Prioritization Framework
When remediating sitemap errors, score issues using:

$$\text{Sitemap Issue Severity} = \text{Count of 4xx Errors (10)} + \text{Count of 3xx Redirects (5)} + \text{Count of Noindex URLs (8)}$$

Clean any sitemap containing $> 1\%$ non-200 URLs immediately.

## J. Deliverables & Specifications
Deliver an **XML Sitemap Architecture & Health Report**:
1. `sitemap_index_url`: Master index location.
2. `child_sitemaps_count`: Number of segmented category sitemaps.
3. `total_urls_submitted`: Sum of `<loc>` tags across all sitemaps.
4. `hygiene_score`: Percentage of URLs returning clean 200 OK canonical status (Target: 100%).
5. `orphan_urls_discovered`: URLs present in sitemap but missing from crawl graph.
6. `gsc_submission_status`: Verified "Success" status in Search Console.

## K. Quality Assurance Checklist
- [ ] 100% of URLs return HTTP 200 OK status.
- [ ] Zero URLs feature `<meta name="robots" content="noindex">` or `X-Robots-Tag: noindex`.
- [ ] Zero URLs redirect (301, 302, 308).
- [ ] Every URL matches the canonical URL exactly (including https, www/non-www, trailing slash).
- [ ] All timestamps use ISO 8601 format (`YYYY-MM-DD`).
- [ ] Sitemap is declared in `robots.txt`.
- [ ] File size does not exceed 50MB and contains $\le 50,000$ URLs per file.

## L. Failure Modes and Anti-Patterns
- **The Stale Sitemap Generator**: Using an un-maintained CMS plugin that writes new URLs to the sitemap but never removes deleted 404 posts, polluting the sitemap with thousands of dead links.
- **The Global Fake Lastmod**: Running a cron job every night that updates `<lastmod>` on all 20,000 URLs to today's date, destroying Google's ability to identify real content updates.
- **Submitting Blocked URLs**: Listing URLs in the sitemap that are explicitly blocked in `robots.txt`, generating confusing errors in Search Console.

## M. AI-Agent Operating Instructions
1. An AI agent must parse XML trees using standard XML parsing libraries, verifying namespaces correctly.
2. When creating automated build scripts for Next.js, Astro, or static site generators, ensure uncanonicalized and draft pages are excluded from sitemap output.
3. Validate XML schema against official W3C / Sitemaps.org definitions before writing to disk.

## N. Success Metrics & Verification Windows
- **GSC Ingestion**: Google Search Console processes the sitemap index with status "Success" within 24 hours of submission.
- **Indexation Coverage**: Ratio of `Indexed URLs` / `Submitted in Sitemap` exceeds $85\%$ within 60 days for high-quality content.

## O. Related Skills
- **Upstream Input**: [URL Optimization](../../On-page%20SEO/URL%20Optimization/SKILL.md), [Indexing](../Indexing/SKILL.md)
- **Direct Sibling**: [RobotsTXT](../RobotsTXT/SKILL.md), [Crawling](../Crawling/SKILL.md)
- **Monitoring**: [Search Console](../../Analytics/Search%20Console/SKILL.md)

## P. Authoritative References
- [Sitemaps XML Protocol (Sitemaps.org)](https://www.sitemaps.org/protocol.html) — The official technical standard agreed upon by Google, Microsoft, and Yahoo.
- [Google Search Central: Sitemaps Overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) — Google's specific implementation rules, extension specifications, and submission limits.

## Q. Maintenance and Review Cycle
- **Automated CI/CD Verification**: Run automated sitemap hygiene scripts on every production build or deployment to prevent dirty URLs from entering the sitemap.
