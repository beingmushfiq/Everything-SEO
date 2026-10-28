---
name: seo-internal-linking
description: Information architecture modeling, PageRank flow engineering, topical cluster siloing, contextual anchor text optimization, and orphan page eradication.
metadata:
  category: On-page SEO
  discipline: Structural Optimization
  version: "1.0.0"
---

# Internal Linking

## A. Purpose
The Internal Linking skill governs the mathematical distribution of PageRank equity, crawl discovery, and topical relevance across a website's internal hyperlink graph. Search engines crawl the web primarily by following links; an isolated document without internal links (an "orphan page") is virtually invisible to search crawlers and receives zero structural authority. This skill provides a deterministic methodology for designing hub-and-spoke topical clusters, optimizing anchor text semantics, eliminating dead-end crawl traps, and routing PageRank from high-authority landing pages to high-value commercial assets.

## B. Trigger Conditions
Invoke this skill when:
1. Publishing any new article or landing page (ensuring it is linked from relevant existing pages).
2. Auditing a website for orphan pages or excessive click depth (>3 clicks from homepage).
3. Attempting to boost a high-value commercial landing page stuck on Page 2 (positions 11-20) without acquiring external backlinks.
4. Restructuring topical silos during a major site architecture reorganization.

Upstream dependencies: [Keyword Discovery](../../Keyword%20Research/Keyword%20Discovery/SKILL.md) and [URL Optimization](../URL%20Optimization/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - Contextual in-body hyperlink architecture and anchor text selection.
  - Hub-and-spoke topical siloing (Pillar pages to cluster supporting posts).
  - Internal PageRank distribution modeling and crawl depth reduction.
  - Identification and remediation of orphan pages and broken internal links (404s).
  - Breadcrumb navigation and contextual footer/sidebar link governance.
- **Out-of-Scope**:
  - External backlink acquisition (Handled by [Digital PR](../../Link%20Building/Digital%20PR/SKILL.md) and [Linkable Assets](../../Link%20Building/Linkable%20Assets/SKILL.md)).
  - XML sitemap generation (Handled by [XML Sitemaps](../../Technical%20SEO/XML%20Sitemaps/SKILL.md)).
  - Server-side redirect configurations (Handled by [Redirects](../../Technical%20SEO/Redirects/SKILL.md)).

## D. Required Inputs
1. **Target Destination URL**: The page requiring an injection of internal PageRank and relevance.
2. **Target Anchor Queries**: 3 to 5 descriptive, natural keyword variations representing the destination topic.
3. **Crawl Graph Data**: Complete crawl of the website mapping all existing internal links (source URL, target URL, anchor text, follow status).
4. **Google Search Console Performance Data**: List of highest-traffic and highest-authority URLs on the domain.

## E. Required Tools and Data Sources
- **Commercial Tooling**: Screaming Frog SEO Spider (Internal Links report, Inlinks tab, Crawl Depth visualization, Orphan Page analysis), Ahrefs / Semrush (Internal Backlinks report).
- **Zero-Cost / Open Source Alternatives**:
  - Google Search Console API (Links > Internal Links export).
  - Python NetworkX library for directed graph analysis, PageRank computation, and centrality metrics.
  - Custom Python crawlers (Scrapy / Playwright) extracting all `<a href>` elements.
  - Google site-search operator (`site:yourdomain.com "topic keyword"`) to find contextual link opportunities.

## F. Core Concepts and Decision Principles
1. **The Reasonable Surfer Model**:
   - Google’s patented Reasonable Surfer mechanism dictates that links located in the main editorial body copy receive substantially higher PageRank weight than links relegated to footers, utility navigation, sidebars, or cookie notices.
   - Links higher up in the editorial body text have a higher probability of being clicked and pass more algorithmic relevance.
2. **Topical Hub-and-Spoke Siloing**:
   ```
                       [Pillar Hub Page]
                     /         |         \
                    /          |          \
           [Cluster A] <---> [Cluster B] <---> [Cluster C]
   ```
   - A central Pillar Page links down to all supporting Cluster subtopics.
   - Supporting Cluster subtopics link back up to the Pillar Page using exact/partial target anchor text.
   - Supporting Cluster subtopics cross-link horizontally to closely related sibling pages, creating a self-contained topical graph.
3. **Anchor Text Semantics**:
   - Internal anchor text is **exempt** from the Google Penguin external backlink penalty. While using 100% exact-match anchor text across thousands of external backlinks triggers spam flags, internal links *should* use descriptive, keyword-rich anchor text.
   - Avoid generic anchor text: Never use `click here`, `read more`, `this article`, or bare URLs. Use descriptive phrases: `review our database backup benchmarks`.
4. **Click Depth Rule ($\le 3$ Clicks)**:
   Any page located more than 3 clicks away from the homepage receives a tiny fraction of the site’s homepage authority and is crawled infrequently by Googlebot.

## G. Operational Workflow

```
[Extract High-Authority Source URLs] -> [Execute Site Search for Keywords]
                 |                                      |
                 v                                      v
  [Select Descriptive Contextual Anchor] -> [Insert In-Body Editorial Link]
                 |                                      |
                 v                                      v
     [Audit Click Depth <= 3] -> [Verify Zero Internal Broken Links (404)]
```

### Step 1: Identify High-Equity Source Pages
1. Export the top 20 pages on your domain with the highest number of external referring domains (from Ahrefs/Semrush or GSC Top Pages).
2. Export the top 20 pages with the highest organic impressions and clicks from GSC.
3. These represent your domain's "Power Hubs" capable of passing significant PageRank to newer or underperforming pages.

### Step 2: Surface Contextual Insertion Opportunities
To find existing pages that discuss the target topic but do not yet link to your target URL:
1. Run a targeted site search on Google:
   ```
   site:example.com "primary keyword" -site:example.com/target-page-slug/
   ```
2. In your CMS or local Markdown repository, search for mentions of the target entity using grep:
   ```bash
   grep -ri "database backup" ./content/posts/
   ```
3. Identify 5 to 10 articles that contain relevant sentences where the target link can be added organically.

### Step 3: Anchor Text Diversity and Placement
For every new target URL, engineer a distribution of 5 to 8 contextual internal links across 3 anchor classes:
1. **Primary Keyword Anchor (40%)**: Exact core query (e.g., `postgresql backup guide`).
2. **Partial-Match / Long-Tail Anchor (40%)**: Conversational modifier (e.g., `automate postgresql backups with wal archiving`).
3. **Topical Entity Anchor (20%)**: High-level category (e.g., `relational database disaster recovery`).

### Step 4: Eradicate Orphan Pages
1. Cross-reference your complete list of published URLs (from XML Sitemap or CMS database) against the list of crawled internal URLs in Screaming Frog.
2. Any URL present in the sitemap but receiving **0 inlinks** is an Orphan Page.
3. Connect each orphan page to its appropriate parent category hub and at least 2 relevant sibling articles immediately.

### Step 5: Internal Link Graph Analysis (Python NetworkX)
Model your site's link equity algorithmically to verify that critical commercial pages receive high centrality:
```python
import networkx as nx

# Build directed graph from crawl CSV export
G = nx.DiGraph()
# Add edges: (source_url, target_url)
G.add_edge("/blog/postgres-wal", "/solutions/database-backup")
G.add_edge("/blog/docker-setup", "/blog/postgres-wal")

# Compute PageRank scores
pagerank_scores = nx.pagerank(G, alpha=0.85)
print("Top Equity Recipient:", max(pagerank_scores, key=pagerank_scores.get))
```

## H. Analysis and Decision Framework
Use this framework to evaluate internal link additions:

```
                  [Potential Internal Link Source]
                                 |
                 Is Source topically related to Target?
                            /            \
                         [Yes]           [No]
                          /                \
          Does Source already link to      (Do not link; irrelevant
          Target on the same anchor?        links dilute topical purity)
                    /          \
                 [Yes]         [No]
                  /              \
        (Avoid duplicate   Can anchor text be woven
         link; Google only  naturally into editorial copy?
         counts first link)       /          \
                               [Yes]         [No]
                                /              \
                    (Add Contextual Link)  (Add 'Related Reading' card)
```

## I. Prioritization Framework
Prioritize internal linking interventions using the **PageRank Deficit Score (PDS)**:

$$\text{PDS} = \frac{\text{Target Page Commercial Value (1-10)}}{\text{Current Inlink Count} + 1} \times \text{Average Google Ranking Position}$$

Pages with high commercial value, high rank (positions 8-20), and low inlink counts ($< 5$) represent your domain's fastest organic growth opportunities.

## J. Deliverables & Specifications
Deliver an **Internal Link Insertion Plan**:
1. `source_url`: The high-authority donor page.
2. `target_url`: The destination page being promoted.
3. `exact_anchor_text`: The clickable hyperlink string.
4. `surrounding_sentence_context`: The full sentence showing natural editorial placement.
5. `placement_location`: In-body paragraph number (e.g., `Paragraph 3, under H2.1`).

## K. Quality Assurance Checklist
- [ ] No internal links point to 404 broken pages, 301 redirects, or uncanonicalized URLs (links must be 200 OK direct canonical URLs).
- [ ] No generic anchor text (`click here`, `learn more`).
- [ ] All critical pages sit at Click Depth $\le 3$ from the homepage.
- [ ] Zero orphan pages remain in the XML sitemap.
- [ ] Links use clean HTML `<a href="...">` tags without JavaScript `onclick` execution.

## L. Failure Modes and Anti-Patterns
- **The "First Link Counts" Ignorance**: Adding a keyword-rich link to a page in the body copy when the site navigation already links to that same URL above it. Google prioritizes the first link encountered in the DOM and often ignores the anchor text of the second link.
- **Sitewide Footer Spam**: Putting 200 keyword-stuffed internal links in the global footer, diluting PageRank and triggering navigational spam heuristics.
- **Internal Nofollow Abuse**: Adding `rel="nofollow"` to internal links (e.g. login pages or privacy policy) in an attempt to "sculpt" PageRank. Google does not recycle nofollowed PageRank; it is permanently discarded.
- **Broken Link Abandonment**: Leaving internal links pointing to old URLs that redirect through 3-hop chains, causing crawl budget degradation.

## M. AI-Agent Operating Instructions
1. An AI agent must parse content files to identify natural grammatical opportunities for anchor insertions without awkwardly breaking prose flow.
2. Always resolve relative URLs to verified absolute paths before writing markdown or HTML links.
3. Never insert a link that creates a self-referencing circular loop (linking a page to itself).

## N. Success Metrics & Verification Windows
- **Leading Indicator (Day 7 - 14)**: Googlebot crawl frequency on the target destination page increases by >50% in server logs.
- **Lagging Indicator (Day 21 - 45)**: Target page average position in GSC improves by 3 to 8 positions without acquiring external backlinks.

## O. Related Skills
- **Upstream Input**: [Keyword Discovery](../../Keyword%20Research/Keyword%20Discovery/SKILL.md), [URL Optimization](../URL%20Optimization/SKILL.md)
- **Technical Auditing**: [Crawling](../../Technical%20SEO/Crawling/SKILL.md), [Log File Analysis](../../Technical%20SEO/Log%20File%20Analysis/SKILL.md)
- **Growth Scaling**: [Traffic Growth](../../SEO%20Wins/Traffic%20Growth/SKILL.md)

## P. Authoritative References
- [Google Search Central: Linking Best Practices](https://developers.google.com/search/docs/crawling-indexing/links-crawling-indexing) — Official guide on crawlable links, anchor text, and link placement.
- [US Patent 7,725,485 (Google LLC): Ranking Based on User Behavior and Click Probability (Reasonable Surfer)](https://patents.google.com/patent/US7725485B1/en) — Google's patent detailing link weighting based on DOM position.

## Q. Maintenance and Review Cycle
- **Monthly Crawl Audit**: Run an automated Screaming Frog crawl every 30 days to identify broken internal links (4xx), redirect loops, and newly orphaned content.
