---
name: seo-tools-screaming-frog
description: Screaming Frog SEO Spider configuration profiles, JavaScript rendering, custom XPath/CSS extraction, and API integration workflows.
metadata:
  category: SEO Tools
  discipline: Technical Auditing
  version: "1.0.0"
---

# Screaming Frog SEO Spider Operations

## A. Purpose
The Screaming Frog SEO Spider skill establishes the definitive operational protocols for configuring, executing, and analyzing desktop and command-line website crawls using the industry-standard Screaming Frog SEO Spider. Screaming Frog operates as a local, highly customizable desktop and headless crawler capable of simulating search engine user-agents, executing client-side JavaScript, scraping custom DOM elements via XPath/CSS, connecting to Google APIs (GSC, GA4, PageSpeed Insights), and validating millions of URLs with zero third-party sampling error. This skill provides an auditable guide for configuring crawl profiles, memory allocation, custom regex extraction, and automated CLI exports.

## B. Trigger Conditions
Invoke this skill when:
1. Conducting a comprehensive technical SEO site audit on a new client or internal web property.
2. Auditing website migrations, staging environments, or major template deployments before and after release.
3. Scraping structured custom data from thousands of pages (e.g. author names, publication dates, schema types, pricing) via XPath/CSS selectors.
4. Auditing international hreflang reciprocal link symmetry or XML sitemap hygiene at scale.
5. Identifying sitewide duplicate title tags, missing H1s, broken links (404), or redirect chains.

Upstream dependencies: [Crawling](../../Technical%20SEO/Crawling/SKILL.md) and [Indexing](../../Technical%20SEO/Indexing/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - Spider configuration profiles: Memory allocation (RAM vs. Database storage mode), User-Agent selection, crawl limits.
  - JavaScript Rendering Mode configuration (Chrome headless execution, AJAX crawl depth, window size).
  - Custom Extraction rules using XPath, CSS Path, and Regex.
  - API Integrations: Pulling Google Search Console, Google Analytics 4, and PageSpeed Insights data directly into crawl tables.
  - List Mode vs. Spider Mode operations.
  - Headless Command-Line Interface (CLI) automation on Windows/Linux servers.
- **Out-of-Scope**:
  - Web server log file analysis (Handled by [Log File Analysis](../../Technical%20SEO/Log%20File%20Analysis/SKILL.md)).
  - Third-party backlink graph analysis (Handled by [Ahrefs](../Ahrefs/SKILL.md) and [SEMrush](../SEMrush/SKILL.md)).
  - Writing on-page meta tags (Handled by [Title](../../On-page%20SEO/Title/SKILL.md) and [Headings Optimization](../../On-page%20SEO/Headings%20Optimization/SKILL.md)).

## D. Required Inputs
1. **Target Starting URL or URL List**: Homepage (`https://example.com`) or plain-text list of specific URLs.
2. **Screaming Frog License**: Active paid license key (unlocks unlimited crawl capacity and API integrations).
3. **Machine Hardware Specs**: Allocated RAM (minimum 8GB, recommended 16GB-32GB for enterprise crawls).
4. **API Credentials (Optional)**: Google Search Console, GA4, and Google PageSpeed Insights API keys.

## E. Required Tools and Data Sources
- **Screaming Frog SEO Spider**: Version 20.x+ (Windows, macOS, or Ubuntu Linux CLI).
- **Google Chrome Headless**: Local browser binary for JavaScript rendering.
- **Python / Shell Scripts**: For scheduling automated headless CLI cron jobs.

## F. Core Concepts and Decision Principles
1. **Storage Mode: RAM vs. Database (Storage Engine)**:
   - *RAM Storage Mode*: Holds crawl data in volatile system memory. Fastest performance, but limited to ~100,000 URLs on a 16GB RAM machine. If memory exhausts, the application crashes.
   - *Database Storage Mode*: Stores crawl data in an embedded disk-backed database (SQLite). Allows crawling **millions of URLs** on standard hardware without running out of memory. **Always set Storage Mode to Database Storage** for sites exceeding 50,000 URLs.
2. **Text-Only vs. JavaScript Rendering**:
   - *Text-Only Mode (Default)*: Fetches raw HTML source. Extremely fast (hundreds of URLs/sec), but misses any content, links, or metadata injected dynamically via React, Vue, Angular, or client-side JavaScript.
   - *JavaScript Rendering Mode*: Uses Chrome to execute JS and render the full DOM before parsing. Slower and CPU-intensive, but mandatory for Modern Single Page Applications (SPAs).
3. **List Mode vs. Spider Mode**:
   - *Spider Mode*: Starts at a seed URL and recursively follows all discovered internal links across the entire site.
   - *List Mode*: Crawls strictly the exact list of URLs you upload (from an XML sitemap, GSC export, or migration spreadsheet) without following external links.

## G. Operational Workflow

```
[Configure Memory Allocation & Storage Mode] -> [Set User-Agent to Googlebot Smartphone]
                     |                                                   |
                     v                                                   v
   [Configure Custom Extraction & API Connectors] -> [Execute Crawl (Spider or List Mode)]
                     |                                                   |
                     v                                                   v
    [Export Issues Report (4xx, Canonicals, CWV)] -> [Deliver Prioritized Technical Backlog]
```

### Step 1: Memory & Storage Configuration
1. Open Screaming Frog > **File > Settings > Storage**:
   - Select **Database Storage Mode**.
   - Choose a high-speed NVMe SSD directory for storage cache.
2. Open **File > Settings > Memory Allocation**:
   - Allocate 70% of your system's physical RAM (e.g. allocate **12GB** on a 16GB machine, or **24GB** on a 32GB machine).

### Step 2: Optimal Crawler Configuration Profile
1. **Configuration > Spider > Crawl**:
   - Check: `Crawl Internal Links`, `Check Images`, `Check CSS`, `Check JavaScript`.
   - Check: `Crawl Linked XML Sitemaps` and enter your `sitemap_index.xml` path.
2. **Configuration > User-Agent**:
   - Set to **Googlebot Smartphone** (matches Google's Mobile-First Indexing crawler).
3. **Configuration > Robots.txt**:
   - Set to: `Respect robots.txt` (or `Ignore robots.txt` if auditing a staging site protected by disallow).

### Step 3: Setting Up Custom Extraction (XPath & CSS)
Scrape specific DOM data points to audit editorial or business metrics sitewide:
1. Open **Configuration > Custom > Extraction**.
2. Add custom rules:
   - **Extract Schema Type**: XPath: `//script[@type='application/ld+json']` (Extract Inner HTML).
   - **Extract Author Name**: CSS Selector: `span.author-name` (Extract Text).
   - **Extract Article Date**: Meta tag: `//meta[@property='article:modified_time']/@content`.
   - **Extract Word Count of Body**: XPath: `//article` (Extract Text).

### Step 4: Connecting Google APIs for Unified Intelligence
1. Navigate to **Configuration > API Access**:
   - **Google Search Console**: Select your property. Select 90-day window. Enables cross-referencing: see which crawled URLs get 0 impressions.
   - **Google Analytics 4**: Connect your GA4 property to append organic sessions directly to each URL row.
   - **PageSpeed Insights**: Enter a free Google Cloud API key. Screaming Frog will test mobile Core Web Vitals (LCP, INP, CLS) for every single page during the crawl.

### Step 5: Headless CLI Automation (Windows PowerShell / Linux Cron)
Run automated weekly audits in the background via command line without opening the GUI:
```powershell
# Windows PowerShell automated CLI crawl command
& "C:\Program Files (x86)\Screaming Frog SEO Spider\ScreamingFrogSEOSpiderCli.exe" `
  --crawl "https://example.com" `
  --headless `
  --save-crawl `
  --output-folder "D:\Everything-SEO\audits\" `
  --export-tabs "Internal:All,Overview:Issue Summary" `
  --config "D:\Everything-SEO\screaming_frog_prod_config.seospiderconfig"
```

## H. Analysis and Decision Framework
Use this framework to triage Screaming Frog audit reports:

```
                  [Screaming Frog Crawl Concluded]
                                  |
                Navigate to "Overview > Issues" Tab
                                  |
                What is the issue severity level?
                 /                |                 \
            [Critical (Red)]  [Warnings (Amber)]  [Opportunities]
                 |                |                     |
           - 4xx Client Errors - Missing H2 tags     - Long URLs (>75 chars)
           - 5xx Server Errors - Slow response time  - Images > 100KB
           - Accidental Noindex- Duplicate Meta Desc - Minor title truncation
                 |                |                     |
           (P0: Fix in 24h)  (P1: Sprint backlog) (P2: Routine maintenance)
```

## I. Prioritization Framework
Score technical issues discovered by Screaming Frog using the **Technical Threat Matrix (TTM)**:

$$\text{TTM} = \text{Issue Severity (Critical=10, Warning=4, Notice=1)} \times \text{Affected URL Count} \times \text{Average GSC Impressions of Pages}$$

Fix critical status errors on high-impression commercial pages first.

## J. Deliverables & Specifications
Deliver a **Screaming Frog Full-Site Diagnostic Report**:
1. `crawl_summary`: Total URLs crawled, blocked by robots.txt, non-HTML assets.
2. `response_codes_summary`: Counts of 200, 301, 302, 404, 500 status codes.
3. `critical_issues_export`: Filtered CSV of all 4xx broken links with source inlinks.
4. `canonical_errors_export`: Uncanonicalized URLs and canonical chain mismatches.
5. `custom_extraction_table`: Scraped authors, dates, or schema types across all pages.
6. `orphan_pages_list`: URLs found in sitemaps or GSC that lack internal inlinks.

## K. Quality Assurance Checklist
- [ ] User-Agent explicitly set to Googlebot Smartphone.
- [ ] Database Storage Mode enabled to prevent out-of-memory crashes.
- [ ] JavaScript Rendering enabled if site uses a modern framework (React, Next.js, Vue).
- [ ] XML Sitemap URL verified and cross-referenced.
- [ ] Canonical, robots meta, and hreflang tabs reviewed with zero critical errors.

## L. Failure Modes and Anti-Patterns
- **The Out-of-Memory Crash**: Running a 200,000-page crawl in RAM mode on an 8GB machine, causing the application to crash 4 hours in and losing all data.
- **Accidental DoS Attack**: Setting the crawler speed to 20 threads / 50 URLs per second on a fragile staging server, taking down the entire website during business hours. (Limit speed to **2 to 5 URLs/second** on production).
- **Ignoring JavaScript Rendering on SPAs**: Crawling a Next.js or React site in Text-Only mode and reporting "Site has no text and zero internal links" because the JS was never executed.

## M. AI-Agent Operating Instructions
1. An AI agent must parse Screaming Frog CSV exports (`internal_all.csv`, `response_codes_all.csv`) using Pandas.
2. Automatically extract and isolate rows where `Status Code >= 400` or `Indexability == 'Non-Indexable'`.
3. Generate concise, actionable remediation tables pairing every error URL with its top 3 internal source inlinks.

## N. Success Metrics & Verification Windows
- **Crawl Health Cleanliness**: 100% of internal links return HTTP 200 OK status in post-fix validation crawls.
- **Zero Orphan URLs**: All canonical published URLs sit within Click Depth $\le 3$ with active internal inlinks.

## O. Related Skills
- **Core Strategy**: [Crawling](../../Technical%20SEO/Crawling/SKILL.md), [Indexing](../../Technical%20SEO/Indexing/SKILL.md)
- **Direct Sibling**: [XML Sitemaps](../../Technical%20SEO/XML%20Sitemaps/SKILL.md), [RobotsTXT](../../Technical%20SEO/RobotsTXT/SKILL.md)
- **API Companion**: [Search Console](../../Analytics/Search%20Console/SKILL.md)

## P. Authoritative References
- [Screaming Frog SEO Spider User Guide](https://www.screamingfrog.co.uk/seo-spider/user-guide/) — Complete technical reference for all tabs, regex functions, and configuration parameters.
- [Screaming Frog CLI Guide: Automating & Scheduling Crawls](https://www.screamingfrog.co.uk/seo-spider/user-guide/general/#command-line) — Command-line interface syntax for headless server execution.

## Q. Maintenance and Review Cycle
- **Weekly Automated CLI Crawl**: Run an automated headless crawl every Sunday night at midnight, saving reports to an archive folder for Monday morning review.
