---
name: seo-crawling
description: Search engine bot discovery mechanics, crawl budget preservation, rendering trap diagnosis, and server latency optimization.
metadata:
  category: Technical SEO
  discipline: Crawl Engineering
  version: "1.0.0"
---

# Crawling & Discovery

## A. Purpose
The Crawling skill governs the mechanics of how search engine user-agents (primarily Googlebot and Bingbot) discover, fetch, and process the web pages of a domain. Crawling is the non-negotiable prerequisite to indexing: if a search engine cannot efficiently crawl a URL, the page cannot be evaluated, indexed, or ranked. On large-scale web applications, eCommerce stores, and faceted directories, unmanaged crawling leads to "Crawl Budget Exhaustion"—where search bots waste finite server resources requesting duplicate, infinite, or low-value parameter URLs while completely missing critical revenue-generating pages. This skill establishes the engineering discipline to audit, direct, and optimize crawler interactions.

## B. Trigger Conditions
Invoke this skill when:
1. Launching a new website, domain migration, or major technical replatforming.
2. Auditing an enterprise website containing $> 10,000$ URLs where new content takes weeks to be discovered.
3. Observing high server response times or 5xx server crashes during peak search engine crawl spikes.
4. Detecting crawler traps, infinite calendar loops, or faceted navigation spider explosions.

Upstream dependencies: [URL Optimization](../../On-page%20SEO/URL%20Optimization/SKILL.md) and [RobotsTXT](../RobotsTXT/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - Crawl budget allocation, crawl demand, and crawl rate limit analysis.
  - Identification and remediation of crawl traps (infinite loops, faceted query parameters, session ID generators).
  - Client-side JavaScript rendering traps vs. Server-Side Rendering (SSR) discovery.
  - HTTP response code status auditing (200, 301, 404, 500) during bot crawls.
  - Server latency and Time to First Byte (TTFB) impact on crawl rate.
- **Out-of-Scope**:
  - Direct robots.txt directive syntax authoring (Handled by [RobotsTXT](../RobotsTXT/SKILL.md)).
  - Indexation status and canonical directive resolution (Handled by [Indexing](../Indexing/SKILL.md)).
  - Server access log parsing (Handled by [Log File Analysis](../Log%20File%20Analysis/SKILL.md)).

## D. Required Inputs
1. **Target Domain Hostname**: Base URL (`https://example.com`).
2. **Current Google Search Console Crawl Stats Report**: Total crawl requests, total download size, average response time (ms).
3. **Full Site Crawl Data**: Screaming Frog or custom crawler export mapping all discovered internal links, response codes, and depth.
4. **Server Hosting Architecture**: CDN presence (Cloudflare, Fastly), server stack, and origin hosting capacity.

## E. Required Tools and Data Sources
- **Commercial Tooling**: Screaming Frog SEO Spider (Spider mode, JavaScript rendering mode, crawl depth metrics), Sitebulb, DeepCrawl (Lumar).
- **Zero-Cost / Open Source Alternatives**:
  - Google Search Console Crawl Stats (Settings > Crawl stats).
  - Open-source crawlers: `katana`, `gospider`, or custom Python scripts using `Scrapy` / `Playwright`.
  - Curl with custom User-Agent headers (`curl -I -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://example.com/`).

## F. Core Concepts and Decision Principles
1. **The Crawl Budget Equation**:
   $$\text{Crawl Budget} = \text{Crawl Rate Limit} \times \text{Crawl Demand}$$
   - *Crawl Rate Limit*: The maximum simultaneous connection rate Googlebot can make without overloading your origin server. If your server is slow (TTFB $> 1,000\text{ms}$) or returns 503 errors, Googlebot immediately throttles down its crawl rate.
   - *Crawl Demand*: How much Google *wants* to crawl your site based on domain popularity, URL update frequency, and overall PageRank.
2. **Crawl Traps (The Silent Budget Killer)**:
   - A crawl trap is an infinite loop of auto-generated URLs created by bad routing, faceted filters, or dynamic calendars.
   - *Example*: An unconstrained calendar widget that generates `/events/2026/11/`, `/events/2026/12/`, `/events/2027/01/` infinitely into the future. Googlebot can waste millions of requests traversing dates for the next 200 years.
3. **JavaScript Rendering Two-Wave Indexing**:
   - Wave 1: Googlebot fetches raw HTML, executes immediate HTTP parsing, and follows server-rendered `<a href>` links.
   - Wave 2: Render queue. If links are generated dynamically via client-side JavaScript (`onclick` events or React `useEffect`), Googlebot must queue the page for rendering compute resources, which can delay discovery by days or weeks.

## G. Operational Workflow

```
[Inspect GSC Crawl Stats Dashboard] -> [Analyze Server TTFB & Response Latency]
                  |                                         |
                  v                                         v
   [Execute Screaming Frog Full Crawl] -> [Detect Crawl Traps & Infinite Query Chains]
                  |                                         |
                  v                                         v
  [Isolate 3xx/4xx/5xx Wasteful Requests] -> [Deploy Architectural Crawl Controls]
```

### Step 1: Analyze Google Search Console Crawl Stats
Navigate to GSC > Settings > Crawl Stats. Audit the 90-day time-series graphs:
1. **Total Crawl Requests**: Look for sudden, inexplicable spikes (often indicates a newly opened crawl trap) or sudden collapses (server performance degradation).
2. **Average Response Time**:
   - **Target**: $< 300\text{ms}$.
   - **Warning**: $> 800\text{ms}$.
   - **Critical**: $> 1,500\text{ms}$ (Googlebot will actively reduce crawl frequency to avoid taking down your server).
3. **Crawl Requests by Purpose**:
   - *Discovery*: Crawling new URLs.
   - *Refresh*: Re-crawling already known URLs. A healthy site maintains ~70% refresh and ~30% discovery.

### Step 2: Full-Site Crawl Simulation (Screaming Frog)
1. Configure Screaming Frog to crawl your domain with standard Googlebot user-agent.
2. Monitor real-time URL counts:
   - If a website that has 500 published articles is generating 50,000 crawled URLs in Screaming Frog, you have a severe crawl trap.
3. Review the **Crawl Analysis > Inlinks** and **Crawl Depth**:
   - Flag any valid page with a crawl depth $> 4$ (too deep for efficient bot traversal).

### Step 3: Identify & Neutralize Crawl Traps
Inspect the crawled URL inventory for common trap patterns:
1. **Faceted Navigation Combinations**:
   - URLs combining multiple filter parameters: `/shop/shoes?color=blue&size=10&brand=nike&sort=price_desc`.
   - *Remediation*: Disallow parameter combinations in robots.txt or use canonical tags.
2. **Session IDs & Tracking Tokens**:
   - Dynamic parameters embedded in URL paths: `/page?PHPSESSID=9a8b7c6d5e`.
   - *Remediation*: Strip session IDs from URL strings; manage user sessions strictly via HTTP cookies.
3. **Search Page Crawling**:
   - Internal site search results being crawled: `/search?q=query`.
   - *Remediation*: Add `Disallow: /search` in `robots.txt` immediately (violates Google Webmaster Guidelines to allow indexing of internal search results).

### Step 4: Audit JavaScript Link Discovery
1. Inspect your HTML source code (raw `view-source:`, not DevTools DOM):
2. Verify that all internal navigation links use standard, crawlable HTML anchors:
   ```html
   <!-- CRAWLABLE (Googlebot can follow) -->
   <a href="/solutions/cloud-security/">Cloud Security</a>

   <!-- UNCRAWLABLE (Googlebot will NOT follow) -->
   <span onclick="goToUrl('/solutions/cloud-security/')">Cloud Security</span>
   <a href="javascript:void(0)" onclick="loadRoute()">Cloud Security</a>
   ```

### Step 5: Optimize Origin Response Latency
1. Cache static HTML pages at the CDN edge (Cloudflare Cache Rules / Fastly Varnish).
2. Ensure the origin server returns HTTP 304 Not Modified headers when a search engine requests a page whose content has not changed since the last crawl (`If-Modified-Since` request header).

## H. Analysis and Decision Framework
Use this framework to diagnose crawl anomalies:

```
                   [GSC Crawl Stats Spike Detected]
                                  |
                Did Average Response Time spike > 1,000ms?
                             /          \
                          [Yes]         [No]
                           /              \
             Server is choking on      Are crawled URLs valid
             requests; enable CDN edge  or parameterized traps?
             caching & increase origin        /          \
             compute capacity.             [Valid]     [Traps]
                                             /            \
                                    (New product line  (Block trap in
                                     indexed; normal)  robots.txt)
```

## I. Prioritization Framework
Score crawling issues using the **Crawl Waste Score (CWS)**:

$$\text{CWS} = \text{Daily Crawl Requests to Low-Value URLs} \times \text{Server Response Latency (Seconds)}$$

Target any crawl trap consuming $> 5,000$ daily requests immediately.

## J. Deliverables & Specifications
Deliver a **Crawl Budget & Architecture Audit**:
1. `domain`: Audited hostname.
2. `avg_crawl_response_time_ms`: Current baseline vs target.
3. `detected_crawl_traps`: List of regex patterns creating infinite URL bloat.
4. `crawl_depth_distribution`: % of site pages accessible at depth 1, 2, 3, 4+.
5. `remediation_rules`: Exact `robots.txt` disallows or URL sanitization logic required.

## K. Quality Assurance Checklist
- [ ] Internal search result URLs (`/search?q=`) are blocked in robots.txt.
- [ ] No infinite calendar or date loops exist.
- [ ] Internal hyperlinks use semantic `<a href="...">` syntax.
- [ ] Server TTFB is $< 500\text{ms}$ during heavy bot crawl activity.
- [ ] Zero 5xx server errors reported in Google Search Console Crawl Stats.

## L. Failure Modes and Anti-Patterns
- **Nofollowing Internal Links for Crawl Budget**: Adding `rel="nofollow"` to internal links in an attempt to save crawl budget. Google still crawls nofollowed links for discovery, but throws away the PageRank equity.
- **Blocking CSS and JavaScript in Robots.txt**: Disallowing `/assets/` or `/js/` in `robots.txt`. Googlebot must render the page to verify mobile friendliness; blocking resources triggers rendering warnings.
- **Ignoring Server Capacity**: Launching a 500,000-page programmatic SEO directory on a \$5/mo shared hosting server, causing origin crashes on the first Googlebot crawl.

## M. AI-Agent Operating Instructions
1. An AI agent must parse GSC crawl stats tables to identify the exact ratio of 200 OK vs 3xx/4xx/5xx requests.
2. When scanning HTML source code, verify that all links adhere strictly to `<a href>` specifications.
3. Propose explicit, surgical robots.txt disallow rules when infinite parameter traps are detected.

## N. Success Metrics & Verification Windows
- **Crawl Efficiency**: GSC Crawl Stats displays $>90\%$ of crawl requests directed to 200 OK status codes within 30 days.
- **Server Health**: Average response time in GSC Crawl Stats remains stably below $400\text{ms}$.

## O. Related Skills
- **Upstream Input**: [URL Optimization](../../On-page%20SEO/URL%20Optimization/SKILL.md)
- **Direct Controls**: [RobotsTXT](../RobotsTXT/SKILL.md), [XML Sitemaps](../XML%20Sitemaps/SKILL.md)
- **Downstream Indexation**: [Indexing](../Indexing/SKILL.md)
- **Server Forensics**: [Log File Analysis](../Log%20File%20Analysis/SKILL.md)

## P. Authoritative References
- [Google Search Central: What is Crawl Budget and How to Optimize It](https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget) — Official engineering guide for enterprise web properties.
- [Google Search Central: Fix Search-Related 5xx Server Errors](https://developers.google.com/search/docs/monitor-debug/troubleshooting/http-status-codes) — How server response latency and error codes affect crawl rate.

## Q. Maintenance and Review Cycle
- **Monthly Crawl Stats Review**: Inspect GSC Crawl Stats at the start of every month to catch emerging 5xx errors or sudden anomalous spikes in discovery requests.
