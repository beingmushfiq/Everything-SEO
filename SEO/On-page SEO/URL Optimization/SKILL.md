---
name: seo-url-optimization
description: Clean URI architecture, semantic slug design, parameter sanitization, directory depth control, and permanent migration governance.
metadata:
  category: On-page SEO
  discipline: Structural Optimization
  version: "1.0.0"
---

# URL Optimization

## A. Purpose
The URL Optimization skill establishes the engineering standards for designing, structuring, and maintaining clean, human-readable, and crawl-efficient Uniform Resource Identifiers (URIs). A website’s URL structure defines its information architecture, influences user trust and CTR in search snippets, dictates breadcrumb navigation hierarchies, and impacts crawl efficiency. This skill defines strict conventions for slug tokenization, directory depth, parameter handling, case sensitivity, and high-stakes URL migration protocols that prevent traffic loss.

## B. Trigger Conditions
Invoke this skill when:
1. Planning the taxonomy, folder hierarchy, or URL routing schema for a new website or web application.
2. Publishing a new page, category, or documentation branch.
3. Refactoring messy, auto-generated, or parameter-heavy URLs (e.g., `?p=123&session=abc`).
4. Executing an enterprise site migration, platform re-platforming, or domain brand change.

Upstream dependencies: [Keyword Discovery](../../Keyword%20Research/Keyword%20Discovery/SKILL.md) and [Title](../Title/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - URI syntax, character encoding, slug length, and tokenization conventions.
  - Logical folder hierarchy and subfolder vs. subdomain architecture.
  - Trailing slash consistency (`/` vs non-slash) and canonical URL enforcement.
  - Query parameter management, tracking token stripping, and faceted navigation rules.
  - Safe 301 redirection mapping for changed slugs.
- **Out-of-Scope**:
  - Server redirect engine configuration (Handled by [Redirects](../../Technical%20SEO/Redirects/SKILL.md)).
  - XML sitemap generation (Handled by [XML Sitemaps](../../Technical%20SEO/XML%20Sitemaps/SKILL.md)).
  - International hreflang targeting in URLs (Handled by [Hreflang](../../International%20SEO/Hreflang/SKILL.md)).

## D. Required Inputs
1. **Target Content Title & Primary Focus Entity**: The subject matter of the page.
2. **Taxonomy & Parent Category**: The parent folder or topical silo (e.g., `/blog/`, `/services/cloud/`).
3. **Current URL (if existing page)**: Existing path for backward-compatibility checking.
4. **Historical Backlink Count (if existing page)**: Referring domains pointing to the current URL.

## E. Required Tools and Data Sources
- **Commercial Tooling**: Screaming Frog SEO Spider (URL structure analysis, regex search, parameter discovery), Ahrefs / Semrush (Top Pages / Backlinks by URL).
- **Zero-Cost / Open Source Alternatives**:
  - Standard Unix CLI utilities (`curl -I`, `sed`, `awk`).
  - Python `urllib.parse` library for RFC 3986 validation.
  - Web server configuration files (`.htaccess`, `nginx.conf`, Cloudflare Transform Rules).

## F. Core Concepts and Decision Principles
1. **RFC 3986 Compliance & Slug Syntax**:
   - URLs must be **100% lowercase**. Unix-based web servers treat `/Page` and `/page` as two distinct resources, creating massive duplicate content issues if casing is inconsistent.
   - Use **hyphens (`-`)** to separate words, never underscores (`_`), plus signs (`+`), or spaces (`%20`). Search engines treat hyphens as word delimiters, while underscores join tokens into a single word (e.g., `seo_tools` is parsed as `seotools`).
2. **Subfolder vs. Subdomain Architecture**:
   - Search engines treat subdomains (`blog.domain.com`) as semi-distinct entities that do not automatically share the root domain's accumulated PageRank and topical authority.
   - Placing content in **subfolders (`domain.com/blog/`)** consolidates backlink equity, crawl budget, and domain authority within a single unified entity.
3. **Directory Depth vs. Click Depth**:
   - Directory depth (number of slashes: `/category/subcategory/topic/page/`) is less important than **Click Depth** (how many internal links it takes to reach the page from the homepage).
   - Keep folder hierarchies clean (maximum 2-3 subfolder levels) to maintain readable breadcrumb structures on search engine snippets.
4. **The Principle of URL Immobility**:
   - Once a URL is published, indexed, and accumulates backlinks, **NEVER change it** unless there is a critical business or architectural necessity. Changing a URL resets historical ranking velocity and requires permanent 301 redirect maintenance.

## G. Operational Workflow

```
[Extract Primary Entity] -> [Generate Lowercase Hyphenated Slug]
            |                                   |
            v                                   v
[Strip Stop Words & Numbers] -> [Verify Parent Folder Hierarchy]
            |                                   |
            v                                   v
[Validate Trailing Slash Standard] -> [Lock Slug as Immutable]
```

### Step 1: Slug Generation Formula
1. Extract the core primary keyword from [Keyword Discovery](../../Keyword%20Research/Keyword%20Discovery/SKILL.md).
2. Remove all punctuation, special characters, and non-ASCII glyphs.
3. Strip unnecessary filler words (e.g., `a`, `the`, `of`, `and`, `in`) unless their removal alters the search intent.
4. **Target Slug Length**: 2 to 5 words (under 40 characters).
   - *Original Title*: `The 15 Best Open-Source Database Backup Tools in 2026`
   - *Bad URL*: `example.com/the-15-best-open-source-database-backup-tools-in-2026` (Dates become obsolete next year; numbers break when adding tools).
   - *Optimized URL*: `example.com/database-backup-tools/`

### Step 2: Architecture & Folder Hierarchy Design
Select the appropriate folder pattern based on document type:
- **Core SaaS Solution**: `example.com/solutions/[solution-name]/`
- **Product Integration**: `example.com/integrations/[partner-tool]/`
- **Technical Documentation**: `example.com/docs/[category]/[topic]/`
- **Editorial Knowledge Hub**: `example.com/resources/[topic-slug]/` or `example.com/blog/[topic-slug]/`

### Step 3: Global Trailing Slash Enforcement
1. Establish a single sitewide canonical convention:
   - Option A: **Trailing Slash Standard** (`example.com/topic/`)
   - Option B: **No Trailing Slash Standard** (`example.com/topic`)
2. Enforce a single standard at the edge/server level with an immediate 301 redirect to prevent duplicate content:
   ```nginx
   # Nginx: Enforce trailing slash on all directories
   rewrite ^([^.\?]*[^/])$ $1/ permanent;
   ```

### Step 4: Parameter Handling and Canonicalization
1. Separate functional content URLs from tracking/filtering parameters.
2. For eCommerce or faceted navigation (filters for size, color, sorting):
   - Use clean static URLs for search-demand combinations (e.g., `/shoes/running/men/`).
   - Use query strings for non-search combinations (e.g., `/shoes/running/?sort=price_asc&color=blue`).
   - Apply a self-referencing canonical tag on the clean static URL and point all parameterized variations back to it.

## H. Analysis and Decision Framework
Use this decision framework before renaming any existing URL:

```
              [Proposal to Change Existing URL]
                              |
                Does current URL have > 0 backlinks
                 or > 10 organic clicks / month?
                           /             \
                        [Yes]            [No]
                         /                 \
            DO NOT CHANGE URL          Is the URL fundamentally
            (Cosmetic changes are not   broken or generating errors?
             worth PageRank loss)              /          \
                                            [Yes]         [No]
                                             /              \
                                     (Change slug &    (Leave URL as-is)
                                      implement 301)
```

## I. Prioritization Framework
When auditing legacy URLs across a large website, rank URL fixes using:

$$\text{URL Fix Severity} = \text{Duplicate Status (20)} + \text{Broken Encoding / 404 (30)} + \text{Mixed Case Inconsistency (15)}$$

Ignore cosmetic slug length issues on pages with existing rankings.

## J. Deliverables & Specifications
Deliver a **URL Routing & Slug Specification**:
1. `page_title`: Document title.
2. `canonical_url`: Full RFC-compliant absolute URI.
3. `slug_only`: Hyphenated lowercase token.
4. `folder_depth`: Number of slash delimiters.
5. `redirect_required`: Boolean (True if replacing existing URL).
6. `legacy_301_source`: Old URL to be redirected.

## K. Quality Assurance Checklist
- [ ] 100% lowercase with no capital letters.
- [ ] Hyphens used as word delimiters; no underscores, spaces, or plus signs.
- [ ] No temporary session IDs, timestamps, or CMS database IDs (`?id=4928`).
- [ ] Trailing slash convention matches sitewide standard.
- [ ] Absolute canonical tag matches the exact URL string.
- [ ] No dates (years/months) embedded in slugs for evergreen content.

## L. Failure Modes and Anti-Patterns
- **The Date in Slug Trap**: Publishing `/blog/2026/01/seo-guide/`. When you update the guide in 2027, the URL is visibly outdated or requires a risky 301 redirect.
- **The Unchecked Migration**: Bulk rewriting 500 URLs to make them "prettier" without establishing exact 1-to-1 301 redirects, wiping out years of accumulated domain authority overnight.
- **Mixed Casing Disaster**: Linking to `/About-Us` from the navigation and `/about-us` from the footer, creating split internal PageRank and duplicate indexation.

## M. AI-Agent Operating Instructions
1. An AI agent must validate generated URLs using regex: `^[a-z0-9]+(-[a-z0-9]+)*$` for slug tokens.
2. Never suggest changing an existing URL that has established GSC traffic without explicitly documenting the required 301 redirect mapping in the implementation plan.
3. Automatically strip stop words (`the`, `a`, `an`, `and`) during automated slug generation.

## N. Success Metrics & Verification Windows
- **Crawl Uniformity**: Zero duplicate content warnings in Screaming Frog or GSC for mixed case or trailing slash mismatches.
- **Indexation Speed**: Clean, logical URLs are indexed by Google within 48 to 72 hours of publication.

## O. Related Skills
- **Upstream Input**: [Title](../Title/SKILL.md), [Keyword Discovery](../../Keyword%20Research/Keyword%20Discovery/SKILL.md)
- **Technical Implementation**: [Redirects](../../Technical%20SEO/Redirects/SKILL.md), [Indexing](../../Technical%20SEO/Indexing/SKILL.md)
- **Sitemap Architecture**: [XML Sitemaps](../../Technical%20SEO/XML%20Sitemaps/SKILL.md)

## P. Authoritative References
- [RFC 3986: Uniform Resource Identifier (URI) Generic Syntax](https://datatracker.ietf.org/doc/html/rfc3986) — The formal internet standard for URI syntax and character encoding.
- [Google Search Central: Keep a Simple URL Structure](https://developers.google.com/search/docs/crawling-indexing/url-structure) — Official guidelines on punctuation, casing, parameters, and readability.

## Q. Maintenance and Review Cycle
- **Pre-Migration Audit**: Complete 100% URL mapping prior to any CMS or framework migration, validating all 301 redirect targets in a staging environment.
