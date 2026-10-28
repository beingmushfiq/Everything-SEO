---
name: seo-broken-link-building
description: Dead link identification (404/410), competitive link reclamation, replacement content engineering, and webmaster outreach workflows.
metadata:
  category: Link Building
  discipline: Authority Engineering
  version: "1.0.0"
---

# Broken Link Building

## A. Purpose
The Broken Link Building skill governs the discovery, qualification, content recreation, and webmaster outreach required to turn dead hyperlinks across the web into high-authority backlinks for your domain. As websites evolve, domain names expire, companies shut down, and URLs change, leaving millions of high-authority web pages linking to 404 (Not Found) or 410 (Gone) dead resources. This skill provides an auditable, value-first methodology to locate broken outbound links on authoritative industry pages, publish superior replacement content, and pitch webmasters with a turn-key solution to fix their broken user experience.

## B. Trigger Conditions
Invoke this skill when:
1. Identifying high-authority resource pages, university guides, or industry curated lists that haven't been updated recently.
2. An established competitor in your industry shuts down, rebrands, or deletes a popular free tool or research guide.
3. Building white-hat, contextual editorial backlinks without requiring paid placements or complex PR stunts.
4. Supplementing an ongoing link-building campaign with a high-conversion, low-friction outreach angle.

Upstream dependencies: [SERP Analysis](../../Keyword%20Research/SERP%20Analysis/SKILL.md) and [Linkable Assets](../Linkable%20Assets/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - Scanning authoritative resource pages and industry hubs for broken outbound hyperlinks (4xx response codes).
  - Mining expired competitor domains and dead URLs for accumulated backlink profiles.
  - Reconstructing historical content using the Internet Archive (Wayback Machine).
  - Engineering a superior, modern replacement asset on your own domain.
  - Executing personalized, non-spammy outreach to website administrators.
- **Out-of-Scope**:
  - Buying expired domains to build private blog networks (PBNs) (Violates Google Spam Policies).
  - Fixing internal broken links within your own domain (Handled by [Internal Linking](../../On-page%20SEO/Internal%20Linking/SKILL.md) and [Redirects](../../Technical%20SEO/Redirects/SKILL.md)).
  - Outreach for unlinked brand mentions (Handled by [Unlinked Brand Mentions](../Unlinked%20Brand%20Mentions/SKILL.md)).

## D. Required Inputs
1. **Target Topic / Industry Niche**: Specific domain (e.g., PostgreSQL Performance, Kubernetes Security, Enterprise SaaS).
2. **Seed Resource Page URLs or Competitor Root Domains**: High-authority pages known for curating external links.
3. **Replacement Content Asset**: A published, high-quality URL on your site that directly serves the intent of the dead resource.

## E. Required Tools and Data Sources
- **Commercial Tooling**: Ahrefs Site Explorer (Best by Links > filter by 404), Semrush Backlink Analytics, Screaming Frog SEO Spider (Spider mode: crawl target list and inspect external 4xx outlinks).
- **Zero-Cost / Open Source Alternatives**:
  - Check My Links Chrome Extension (in-browser visual broken link auditing).
  - Wayback Machine (Internet Archive API: `https://archive.org/wayback/available?url=...`).
  - Python scripts using `requests` and `BeautifulSoup` to crawl curated resource pages and check external HTTP status codes.
  - Hunter.io / Anymail Finder for webmaster email discovery.

## F. Core Concepts and Decision Principles
1. **The "Help the Webmaster" Psychology**:
   - Webmasters and content editors ignore generic cold link pitches. However, **broken links hurt their website’s user experience and search credibility**.
   - By identifying the exact broken link on their page (URL, anchor text, line location) and offering an immediate, high-quality replacement, you provide genuine operational value before asking for a link.
2. **The 3 Broken Link Discovery Vectors**:
   - *Vector 1: Resource Page Scanning*: Crawling dedicated curation pages (e.g., `example.com/resources/`, `developer.com/tools/`) and flagging outbound dead links.
   - *Vector 2: Dead Competitor Mining*: Finding a direct competitor who went out of business or deleted a major guide, extracting all hundreds of external websites still linking to their dead 404 URL.
   - *Vector 3: Expired Domain Authority*: Auditing expired authority domains in your niche to identify pages with massive backlink equity that now return dead DNS or parking pages.
3. **Intent Parity Requirement**:
   - The replacement asset on your site must match the **exact informational intent** of the original dead resource. If the broken link was a "PostgreSQL Configuration Cheat Sheet", you cannot pitch your homepage or a generic pricing page; you must provide an equivalent or superior Cheat Sheet.

## G. Operational Workflow

```
[Discover Authoritative Resource Pages] -> [Automated Crawl for 4xx External Links]
                   |                                       |
                   v                                       v
   [Inspect Dead Asset via Wayback Machine] -> [Publish Superior Replacement Asset]
                   |                                       |
                   v                                       v
    [Identify Verified Webmaster/Editor] -> [Send 1-to-1 Helpful Remediation Pitch]
```

### Step 1: Discover Resource Pages via Advanced Search
Find high-authority pages that curate external industry tools and links:
```
"useful resources" OR "recommended tools" "database" -site:pinterest.com
"helpful links" OR "curated list" "devops" intitle:resources
inurl:resources "cloud security" filetype:html
```

### Step 2: Automated Dead Link Extraction (Python)
Crawl target resource pages to uncover broken outbound hyperlinks:
```python
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse

def find_broken_outlinks(page_url):
    headers = {'User-Agent': 'Mozilla/5.0'}
    html = requests.get(page_url, headers=headers).text
    soup = BeautifulSoup(html, 'html.parser')
    
    base_domain = urlparse(page_url).netloc
    outlinks = [a['href'] for a in soup.find_all('a', href=True) if a['href'].startswith('http')]
    
    broken = []
    for link in outlinks:
        if base_domain not in link:
            try:
                r = requests.head(link, headers=headers, timeout=5, allow_redirects=True)
                if r.status_code in [404, 410]:
                    broken.append((link, r.status_code))
            except Exception:
                pass
    return broken

print("Discovered Broken Links:", find_broken_outlinks("https://example-resource-hub.com/links"))
```

### Step 3: Reconstruct Original Intent via Wayback Machine
1. Copy the discovered dead URL and paste it into the Internet Archive Wayback Machine (`web.archive.org`).
2. Inspect the historical snapshots:
   - What topic did the original page cover?
   - What made it link-worthy? (Did it feature a specific diagram, code snippet, or dataset?).
   - How many referring domains were pointing to it (check in Ahrefs/Semrush)?

### Step 4: Engineer the Replacement Asset
1. Publish an updated, superior resource on your own domain covering the same topic.
2. Fix what was outdated in the original:
   - Update broken code libraries to current stable releases.
   - Replace low-res images with modern WebP graphics.
   - Add new subheadings answering current industry needs.

### Step 5: Webmaster Outreach Execution
Send a personalized, helpful notification:
```
Subject: Broken link on [Site Name] resources page (and a replacement)

Hi [Editor First Name],

I was reviewing your excellent resources page on database optimization (https://targetsite.com/resources/) and noticed that one of the outbound links in your "Backup Tools" section is currently dead:

• Dead link: http://dead-competitor.com/postgres-script (Returns a 404 error)
• Anchor text: "Automated WAL Backup Script"

It looks like the original author took that domain down last year.

Our engineering team recently open-sourced an updated, thoroughly tested replacement script for modern PostgreSQL clusters (supporting WAL archiving and S3 sync):
https://yourdomain.com/tools/postgresql-backup-script/

If you’re updating the page, it might make a useful replacement for your readers. Either way, thanks for curating such a great list of developer resources!

Best regards,

[Your Name]
[Title, Company]
```

## H. Analysis and Decision Framework
Use this framework to qualify broken link opportunities:

```
                  [Dead Link Discovered on Resource Page]
                                     |
                  Is the hosting website authoritative & active?
                             /              \
                          [Yes]             [No]
                           /                  \
             Do at least 5 other websites      (Discard: Low value)
             also link to this dead URL?
                    /          \
                 [Yes]         [No]
                  /              \
       (HIGH VALUE: Build       (MODERATE VALUE: Pitch only
        dedicated replacement   if you already have an exact
        asset & pitch all 5)    existing asset on site)
```

## I. Prioritization Framework
Score broken link outreach targets using the **Broken Link Value Index (BLVI)**:

$$\text{BLVI} = \text{Target Domain Rating (1-100)} \times \text{Number of Dead Links Found on Page} \times \text{Intent Match (1-5)}$$

Target resource pages on domains with $\text{DR} \ge 50$ where you have a direct 1-to-1 content match.

## J. Deliverables & Specifications
Deliver a **Broken Link Prospecting & Outreach Ledger**:
1. `resource_page_url`: The page containing the broken link.
2. `dead_url`: The exact broken target URL.
3. `http_status`: Confirmed 404 or 410.
4. `anchor_text_location`: The exact surrounding sentence context.
5. `wayback_archive_url`: Historical snapshot reference.
6. `replacement_url`: Your published live asset.
7. `webmaster_contact`: Verified email address.

## K. Quality Assurance Checklist
- [ ] Confirmed that the link is genuinely dead (returns HTTP 404 or 410, not a temporary 503 or transient timeout).
- [ ] Wayback Machine checked to verify that the replacement content satisfies original search intent.
- [ ] Email addresses verified via Hunter / Mailtester before sending.
- [ ] Outreach tone is helpful and polite, never demanding or aggressive.
- [ ] Pitch sent to the actual page editor or site maintainer, not a generic info@ inbox.

## L. Failure Modes and Anti-Patterns
- **The Irrelevant Bait-and-Switch**: Finding a broken link to a specific technical tutorial and pitching your commercial SaaS pricing page as the replacement. The webmaster will mark you as spam.
- **Reporting False Broken Links**: Alerting a webmaster that a link is broken when it was simply geo-blocked or blocking your automated bot, looking incompetent.
- **Automated Mass Templating**: Blasting 500 webmasters with generic "I found broken links on your site" emails without naming the specific link or anchor text.

## M. AI-Agent Operating Instructions
1. An AI agent must verify dead HTTP status codes using live `curl` or Python requests before adding to outreach lists.
2. Extract the exact surrounding sentence context to ensure the replacement asset fits seamlessly into the existing paragraph.
3. Keep pitch copy strictly under 180 words with a conversational, helpful tone.

## N. Success Metrics & Verification Windows
- **Outreach Conversion**: Achieve an outreach-to-link conversion rate of $\ge 8\% - 15\%$ on qualified broken link pitches.
- **Authority Acquisition**: Secure 5 to 15 contextual dofollow backlinks per month from established resource hubs.

## O. Related Skills
- **Upstream Asset**: [Linkable Assets](../Linkable%20Assets/SKILL.md)
- **Direct Sibling**: [Unlinked Brand Mentions](../Unlinked%20Brand%20Mentions/SKILL.md), [Digital PR](../Digital%20PR/SKILL.md)
- **Internal Maintenance**: [Internal Linking](../../On-page%20SEO/Internal%20Linking/SKILL.md)

## P. Authoritative References
- [Internet Archive: Wayback Machine API](https://archive.org/help/wayback_api.php) — The open platform for historical web content forensics.
- [Google Search Central: Link Best Practices](https://developers.google.com/search/docs/crawling-indexing/links-crawling-indexing) — Guidelines on editorial link relevance and user satisfaction.

## Q. Maintenance and Review Cycle
- **Quarterly Competitor 404 Audit**: Run competitive backlink audits every 90 days to detect newly deleted pages across top 5 direct competitors.
