---
name: seo-redirects
description: HTTP redirection semantics (301 vs 302 vs 308), redirect chain and loop resolution, htaccess/Nginx/Edge rules, and PageRank preservation.
metadata:
  category: Technical SEO
  discipline: Technical Architecture
  version: "1.0.0"
---

# Redirects

## A. Purpose
The Redirects skill establishes the engineering standards for implementing, maintaining, and auditing HTTP redirection across web servers, CDNs, and application routing layers. When URLs are moved, renamed, merged, or deprecated, search engine crawlers and human visitors must be seamlessly routed to the new destination. Improper redirection—such as using temporary 302s instead of permanent 301s, creating multi-hop redirect chains, building circular redirect loops, or redirecting en masse to the homepage—destroys PageRank equity, degrades crawl budget, and introduces severe latency bottlenecks. This skill ensures 100% PageRank transfer and instantaneous edge-level routing.

## B. Trigger Conditions
Invoke this skill when:
1. Executing a domain migration, protocol change (HTTP to HTTPS), or subdomain consolidation.
2. Modifying URL slug structures, directory hierarchies, or taxonomy naming conventions.
3. Merging thin or duplicate articles into a comprehensive master pillar post (see [Content Refresh](../../Content%20Optimization/Content%20Refresh/SKILL.md)).
4. Auditing a website for redirect chains ($> 1\text{ hop}$) or 310 redirect loop browser crashes.

Upstream dependencies: [URL Optimization](../../On-page%20SEO/URL%20Optimization/SKILL.md) and [Indexing](../Indexing/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - HTTP status code semantics: 301 Moved Permanently, 308 Permanent Redirect, 302 Found, 307 Temporary Redirect.
  - Redirect chain compression (reducing A -> B -> C down to A -> C).
  - Circular redirect loop detection and termination.
  - Web server configuration rules (`.htaccess` Apache, `nginx.conf`, Cloudflare Bulk Redirects / Workers).
  - 1-to-1 URL migration mapping spreadsheets.
- **Out-of-Scope**:
  - Client-side JavaScript redirects (`window.location`) or Meta Refresh tags (strongly discouraged for SEO).
  - Canonical link tags without HTTP redirection (Handled by [Indexing](../Indexing/SKILL.md)).
  - XML sitemap cleanups (Handled by [XML Sitemaps](../XML%20Sitemaps/SKILL.md)).

## D. Required Inputs
1. **Source URLs**: List of legacy URLs to be redirected.
2. **Target Destination URLs**: Exact canonical destinations matching search intent.
3. **Current HTTP Status & Headers**: Verification of current server response.
4. **Historical Backlink Equity (RDs)**: Prioritizing pages with valuable external links.

## E. Required Tools and Data Sources
- **Commercial Tooling**: Screaming Frog SEO Spider (Reports > Redirects > Redirect Chains, Redirect & Canonical mode).
- **Zero-Cost / Open Source Alternatives**:
  - Standard Unix CLI: `curl -ILs https://example.com/legacy-url | grep -E "HTTP/|Location:"`.
  - Python scripts using `requests` with `allow_redirects=True` inspecting `response.history`.
  - Cloudflare Edge Rules / Varnish VCL / Nginx configuration engines.

## F. Core Concepts and Decision Principles
1. **HTTP Status Code Semantics**:
   - **301 Moved Permanently**: The universal gold standard for SEO migrations. Tells search engines that the resource has permanently moved, passing 100% of accumulated PageRank and historical signals to the new URL.
   - **308 Permanent Redirect**: Modern RFC 7538 equivalent to 301 that guarantees the HTTP request method (e.g. POST) does not change to GET. Fully supported by Googlebot.
   - **302 Found / 307 Temporary**: Signals that the move is temporary. Google will continue to index the *old* URL and will NOT transfer PageRank to the new URL over the short term.
2. **The "Single-Hop" Direct Routing Rule**:
   - **NEVER** allow redirect chains:
     - *Bad (Chain)*: `http://example.com/page` -> (301) `https://example.com/page` -> (301) `https://example.com/page/` -> (301) `https://example.com/new-page/` (3 hops, 900ms latency, crawl budget waste).
     - *Good (Direct)*: `http://example.com/page` -> (301) `https://example.com/new-page/` (1 hop, 120ms latency).
   - Googlebot stops following redirect chains after **5 hops**, throwing a redirect error.
3. **The Soft-404 Fallacy (Redirecting Everything to Homepage)**:
   - When deleting 500 obsolete pages, lazy webmasters often redirect all 500 URLs to the homepage (`example.com/`).
   - Google officially classifies bulk homepage redirects as **Soft 404s**. Google recognizes that the homepage does not satisfy the original query intent, strips PageRank transfer, and treats the URLs as 404 errors.
   - Always redirect to the **most relevant thematic subcategory** or return a clean **HTTP 410 Gone**.

## G. Operational Workflow

```
[Extract Legacy URLs & Backlink Profiles] -> [Build 1-to-1 Intent-Matched Map]
                    |                                        |
                    v                                        v
  [Deploy Server/Edge Redirect Rules (301)] -> [Trace HTTP Response Chains with curl]
                    |                                        |
                    v                                        v
   [Compress Multi-Hop Chains to Single Hop] -> [Update Internal Links to Point Direct]
```

### Step 1: Build the 1-to-1 Migration Mapping Matrix
Construct a strict mapping spreadsheet matching each old URL to its most relevant new equivalent:

| Old Legacy URL | New Canonical Destination | Match Type | Priority |
| :--- | :--- | :--- | :--- |
| `/blog/2021/postgres-backup/` | `/resources/database-guides/postgresql-backup/` | 1-to-1 Exact Intent | High (12 RDs) |
| `/features/auto-wal-archive/` | `/solutions/database-backup/` | Parent Category | High (5 RDs) |
| `/discontinued-webinar-2019/` | `[DO NOT REDIRECT -> RETURN 410 GONE]` | Deprecated | Low (0 RDs) |

### Step 2: Implement Server-Level Configuration Rules
Deploy rules at the web server (Nginx/Apache) or CDN edge (Cloudflare) to minimize origin execution overhead:

- **Nginx (`nginx.conf`)**:
  ```nginx
  # Exact 1-to-1 301 Redirect
  location = /blog/2021/postgres-backup/ {
      return 301 https://example.com/resources/database-guides/postgresql-backup/;
  }

  # Global HTTP to HTTPS Enforcement (Edge Direct)
  server {
      listen 80;
      server_name example.com www.example.com;
      return 301 https://example.com$request_uri;
  }
  ```

- **Apache (`.htaccess`)**:
  ```apache
  RewriteEngine On
  # Redirect old path to new path permanently
  Redirect 301 /blog/2021/postgres-backup/ https://example.com/resources/database-guides/postgresql-backup/
  ```

### Step 3: Scripted Redirect Chain Tracer (Python)
Automate the discovery and compression of multi-hop redirect chains:
```python
import requests

def trace_redirects(start_url):
    session = requests.Session()
    resp = session.get(start_url, allow_redirects=True)
    chain = [r.status_code for r in resp.history] + [resp.status_code]
    urls = [r.url for r in resp.history] + [resp.url]
    
    print(f"Traced: {start_url}")
    for code, url in zip(chain, urls):
        print(f" -> [{code}] {url}")
        
    if len(resp.history) > 1:
        print(f"WARNING: Redirect chain detected ({len(resp.history)} hops)! Compress direct to: {resp.url}")
        
trace_redirects("http://example.com/old-slug")
```

### Step 4: Circular Loop Termination
1. Inspect Screaming Frog or server logs for HTTP 310 or "ERR_TOO_MANY_REDIRECTS".
2. Trace the loop: `URL A -> (301) -> URL B -> (301) -> URL A`.
3. Break the loop immediately by pointing URL A and URL B to a clean, 200 OK third destination.

### Step 5: Internal Link Sanitation (Post-Redirect Cleanup)
1. Redirects are designed for external visitors and bots entering from outside the site.
2. **Internal links within your own website must NEVER point to redirecting URLs**.
3. Run a global database search-and-replace to update all internal `<a href>` links to point directly to the final 200 OK canonical destination, eliminating internal redirect latency.

## H. Analysis and Decision Framework
Use this framework to select the appropriate redirection response:

```
                     [URL Being Moved or Deleted]
                                  |
                   Does a relevant replacement page exist?
                             /          \
                          [Yes]         [No]
                           /              \
             Is the move permanent?       Does the page have backlinks?
                    /          \                 /          \
                 [Yes]         [No]           [Yes]         [No]
                  /              \             /              \
            (Return 301     (Return 302   (Redirect to     (Return HTTP 410
             Permanent)      Temporary)    closest parent   Gone immediately)
                                           category)
```

## I. Prioritization Framework
Score redirect cleanups using the **Redirect Friction Score (RFS)**:

$$\text{RFS} = \text{Referring Domains pointing to Source} \times (\text{Hops in Chain} - 1) \times \text{Daily Bot Hits}$$

Eliminate all 2+ hop chains on high-backlink URLs immediately.

## J. Deliverables & Specifications
Deliver a **Redirect Migration & Chain Resolution Ledger**:
1. `source_url`: Initial request URI.
2. `final_destination_url`: Exact 200 OK canonical target.
3. `http_status_code`: 301 (or 410 if pruned).
4. `hop_count`: Must equal 1.
5. `server_config_snippet`: The verified Nginx or Cloudflare rule.
6. `internal_links_updated_count`: Number of internal links pointed directly to the new URL.

## K. Quality Assurance Checklist
- [ ] Returns HTTP 301 Moved Permanently (not 302, 307, or meta refresh).
- [ ] Total hop count is exactly 1 (no multi-hop chains).
- [ ] Destination URL returns HTTP 200 OK.
- [ ] No circular redirect loops created.
- [ ] Preserves all query parameters where functional tracking is required.
- [ ] Internal links updated across the site so crawlers don't encounter the 301.

## L. Failure Modes and Anti-Patterns
- **The "Catch-All 301 to Homepage"**: Redirecting 1,000 deleted products to `/`. Google converts them to Soft 404s, wasting your time and destroying backlink value.
- **The Protocol/Trailing Slash Cascade**: Causing a 4-step chain: `http://example.com/page` -> `https://example.com/page` -> `https://www.example.com/page` -> `https://www.example.com/page/`. Consolidate all canonical transforms into a single edge evaluation.
- **Using 302 for Permanent Moves**: Forgetting to specify 301, resulting in a default 302 temporary redirect that leaves the old URL in Google's index for months.

## M. AI-Agent Operating Instructions
1. An AI agent must trace the entire redirect chain using `curl -ILs` to verify that the final status is 200 OK and total hops equal 1.
2. Never suggest redirecting deleted content to the homepage unless the original content was specifically about the homepage entity.
3. Generate server configuration blocks (Nginx/Apache) using exact string matching (`location =`) to prevent greedy regex collisions.

## N. Success Metrics & Verification Windows
- **PageRank Transfer**: Google transfers rankings and backlink authority to the new destination URL within 14 to 28 days of crawling.
- **Latency Elimination**: Average redirect latency is $< 100\text{ms}$ at the CDN edge.

## O. Related Skills
- **Upstream Input**: [URL Optimization](../../On-page%20SEO/URL%20Optimization/SKILL.md), [Content Refresh](../../Content%20Optimization/Content%20Refresh/SKILL.md)
- **Direct Sibling**: [Indexing](../Indexing/SKILL.md), [Crawling](../Crawling/SKILL.md)
- **Forensic Validation**: [Log File Analysis](../Log%20File%20Analysis/SKILL.md)

## P. Authoritative References
- [RFC 9110: HTTP Semantics - Redirection 3xx](https://www.rfc-editor.org/rfc/rfc9110.html#section-15.4) — The formal IETF specification for 301, 302, 307, and 308 response semantics.
- [Google Search Central: 301 Redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) — Official guide on URL moves, PageRank transfer, and redirect chain limits.

## Q. Maintenance and Review Cycle
- **Quarterly Redirect Chain Audit**: Crawl all historical redirect rules every 90 days to verify that destinations haven't shifted into secondary chains or dead 404s.
