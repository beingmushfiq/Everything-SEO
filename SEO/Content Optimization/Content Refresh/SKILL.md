---
name: seo-content-refresh
description: Historical content decay detection, traffic reclamation, pruning vs updating triage, and systematic editorial republishing workflows.
metadata:
  category: Content Optimization
  discipline: Lifecycle Engineering
  version: "1.0.0"
---

# Content Refresh

## A. Purpose
The Content Refresh skill governs the diagnostic auditing, prioritization, and modernization of decaying web content. Over time, high-ranking articles suffer from "Content Decay": factual obsolescence, competitor leapfrogging, broken external links, stale dates, and shifting search intent. Rather than constantly publishing new URLs—which strains crawl budget and fragments domain equity—refreshing existing URLs with established backlink profiles frequently yields a $3\times$ higher ROI on editorial resources. This skill establishes a data-driven system to detect traffic erosion, triage decaying assets (Prune, Merge, or Refresh), and execute comprehensive editorial updates.

## B. Trigger Conditions
Invoke this skill when:
1. An established article or landing page has experienced a $\ge 20\%$ decline in organic clicks or impressions over a rolling 6-month window in Google Search Console.
2. A critical industry standard, software version, or regulation has changed, rendering published instructions obsolete.
3. Conducting a scheduled quarterly content decay audit across all blog and resource directories.
4. Preparing for a Core Algorithm Update by systematically eliminating thin, low-performing, or stale URLs.

Upstream dependencies: [Search Console](../../Analytics/Search%20Console/SKILL.md), [Gap Analysis](../Gap%20Analysis/SKILL.md), and [SERP Analysis](../../Keyword%20Research/SERP%20Analysis/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - GSC time-series decay analysis (YoY and MoM trend comparisons).
  - Triage decision matrix: Update / Expand vs. Consolidate (301 Redirect) vs. Prune (410/noindex).
  - Fact-checking, screenshot updating, code verification, and broken link repair.
  - Republishing protocol: Updating `dateModified`, revising H1/title tags, and retaining original URL slugs.
- **Out-of-Scope**:
  - Net-new pillar strategy from scratch (Handled by [Keyword Discovery](../../Keyword%20Research/Keyword%20Discovery/SKILL.md)).
  - Server redirect engine troubleshooting (Handled by [Redirects](../../Technical%20SEO/Redirects/SKILL.md)).
  - External link outreach to promote the refreshed post (Handled by [Digital PR](../../Link%20Building/Digital%20PR/SKILL.md)).

## D. Required Inputs
1. **Target URL**: The decaying page path.
2. **Google Search Console Historical Performance Data**: 16 months of query and page performance data.
3. **Current Top 3 Competitor URLs**: The fresh competitor assets currently outranking your URL.
4. **Original Publishing Date vs. Latest Update Date**: Existing metadata timestamps.

## E. Required Tools and Data Sources
- **Commercial Tooling**: Ahrefs / Semrush (Historical organic traffic graph, Declining Pages report), Animalz Revive (Content decay detection tool).
- **Zero-Cost / Open Source Alternatives**:
  - Google Search Console API + Python (`pandas`, `numpy`) for automated decay trend detection.
  - Screaming Frog SEO Spider (Extracting word count, outlinks, and `dateModified` headers).
  - Broken Link Checker CLI / curl to find 404 external links in the article.

## F. Core Concepts and Decision Principles
1. **The 3 Stages of Content Decay**:
   - *Early Decay (Subtle)*: Impressions remain flat, but CTR drops as competitor titles show fresher dates and hooks.
   - *Active Decay (Linear)*: Average position slips from 1-3 down to 6-12; clicks fall by 30-50%.
   - *Terminal Decay (Exponential)*: Page falls to page 2 or 3; impressions collapse by $>80\%$.
2. **The 3-Way Triage Rule (Prune, Merge, Refresh)**:
   - **Refresh**: The page has historical traffic, quality backlinks, and strong commercial intent. Update and expand.
   - **Merge (Consolidate)**: The page has some backlinks but weak content that overlaps heavily with another page on your site. 301 redirect it into a stronger master post.
   - **Prune (Delete/Noindex)**: The page receives 0 clicks, 0 impressions, 0 backlinks, and covers an obsolete topic (e.g., an announcement for a 2019 webinar). Return HTTP 410 Gone or set `noindex`.
3. **The URL Slug Rule**:
   - **NEVER** change the URL slug during a content refresh. Retain the exact canonical URL to preserve all accumulated PageRank, social shares, and external backlink equity.
   - Remove historical dates from the URL slug *only* if you are prepared to maintain a permanent 301 redirect.

## G. Operational Workflow

```
[Extract 16-Month GSC Performance] -> [Calculate Traffic Decay Velocity]
                 |                                      |
                 v                                      v
  [Execute 3-Way Triage (Prune/Merge/Refresh)] -> [Audit Outdated Facts & Broken Links]
                 |                                      |
                 v                                      v
  [Execute Content Expansion & Gap Closure] -> [Update dateModified & Request GSC Recrawl]
```

### Step 1: Detect Decaying URLs via Python
Query Google Search Console data comparing two 3-month windows offset by 6 months:
```python
import pandas as pd

# Load GSC daily page performance
df = pd.read_csv('gsc_pages_16m.csv')

# Compare Clicks: [Last 90 Days] vs [90 Days from 6 Months Ago]
decayed_pages = df[df['clicks_recent'] < df['clicks_previous'] * 0.75]
decayed_pages['pct_loss'] = ((decayed_pages['clicks_recent'] - decayed_pages['clicks_previous']) / decayed_pages['clicks_previous']) * 100

print("Top 10 Priority Decaying Pages:\n", decayed_pages[['page', 'pct_loss', 'clicks_recent']].head(10))
```

### Step 2: Content Triage Decision
Apply the Triage Decision Rules to each decaying page:

| Criteria | Action | Implementation |
| :--- | :--- | :--- |
| High Backlinks ($\ge 5$ RDs) + High ICP Relevance | **REFRESH** | Update content, modernise code/images, retain URL. |
| Moderate Backlinks + Cannibalizing Another URL | **MERGE** | Move best sections to master URL; 301 redirect old URL. |
| Zero Backlinks + Zero Clicks in 12 Mo + Low ICP | **PRUNE** | Remove page; return HTTP 410 Gone; remove from sitemap. |

### Step 3: Conduct Editorial Modernization Audit
For pages approved for **REFRESH**:
1. **Broken Link Audit**: Scan all outbound hyperlinks. Replace broken 404 links with active authoritative citations.
2. **Factual Verification**: Update all statistics, pricing tables, software version numbers, and regulatory references to the current year.
3. **Visual Media Refresh**: Replace outdated UI screenshots from 2021 with modern, high-resolution WebP captures.
4. **Competitor Gap Closure**: Execute [Gap Analysis](../Gap%20Analysis/SKILL.md) against current top 3 ranking competitors to add newly emergent subtopics.
5. **Information Gain Injection**: Add a new proprietary data point, case study snippet, or code repository link.

### Step 4: Metadata and Timestamp Update
1. Update `<meta name="description">` to highlight fresh data and the current year.
2. Revise `<title>` tag if necessary (see [Title](../../On-page%20SEO/Title/SKILL.md)).
3. Update the Schema.org `dateModified` timestamp to the exact current ISO 8601 date, while leaving `datePublished` intact:
   ```json
   "datePublished": "2023-04-12T08:00:00Z",
   "dateModified": "2026-10-29T02:00:00Z"
   ```
4. Display "Last Updated on [Date]" prominently at the top of the article beneath the H1.

### Step 5: Recrawl and Indexation Request
1. Submit the refreshed URL via Google Search Console URL Inspection tool.
2. If internal links to this URL were previously sparse, add 3-5 fresh contextual internal links from your newest high-traffic articles (see [Internal Linking](../../On-page%20SEO/Internal%20Linking/SKILL.md)).

## H. Analysis and Decision Framework
Use this framework to guide the refresh execution:

```
                      [Decaying URL Identified]
                                  |
                   Is the core search intent still valid?
                             /          \
                          [Yes]         [No]
                           /              \
             Does content have good       (301 Redirect to relevant
             backlinks (RDs >= 5)?         category or return 410)
                    /          \
                 [Yes]         [No]
                  /              \
         (Execute Full Editorial  (Can it be merged into
          Refresh & Expansion)     a stronger related page?)
                                        /          \
                                     [Yes]         [No]
                                      /              \
                              (301 Merge)       (Prune / 410)
```

## I. Prioritization Framework
Score refresh candidates using the **Reclamation Value Index (RVI)**:

$$\text{RVI} = \text{Historical Peak Monthly Clicks} \times \text{Current Click Loss \%} \times \text{Commercial Intent (1-5)}$$

Target assets with high historical peak traffic and high commercial intent first.

## J. Deliverables & Specifications
Deliver a **Content Refresh Work Order**:
1. `url`: Target document path.
2. `traffic_loss_pct`: Quantified 6-month erosion (e.g., `-42%`).
3. `triage_decision`: Refresh, Merge, or Prune.
4. `outdated_sections_identified`: Line-by-line list of obsolete claims, code, or images.
5. `new_sections_to_add`: Headings and technical topics required to close competitor gaps.
6. `schema_timestamps`: Original `datePublished` and new `dateModified`.

## K. Quality Assurance Checklist
- [ ] URL slug was NOT changed (or 301 redirect verified if absolutely required).
- [ ] All external outbound links test 200 OK.
- [ ] Schema.org `dateModified` matches visible "Last Updated" date on page.
- [ ] Outdated screenshots and obsolete code blocks replaced.
- [ ] New content provides meaningful Information Gain beyond existing search results.

## L. Failure Modes and Anti-Patterns
- **The Timestamp Lie**: Changing the "Updated" date to today without making any substantive changes to the content. Google detects the lack of DOM modification and ignores the false freshness signal.
- **Accidental De-indexation**: Setting a decaying page to `noindex` without checking if it possesses valuable external backlinks, throwing away accumulated domain authority.
- **Rewriting from Scratch**: Deleting 3,000 words of established text and replacing it with an entirely new angle, unintentionally deleting the exact passages that were still ranking for hundreds of long-tail keywords.

## M. AI-Agent Operating Instructions
1. An AI agent must parse historical GSC tables to calculate actual percentage drops rather than relying on qualitative assumptions.
2. When refreshing content, preserve high-performing sections that already rank on page 1; only edit or expand underperforming sections.
3. Automatically check all outbound HTTP URLs and flag any response code other than 200 OK.

## N. Success Metrics & Verification Windows
- **Traffic Reclamation**: Refreshed page recovers $\ge 70\%$ of its historical peak organic clicks within 45 to 60 days of republishing.
- **Position Recovery**: Average ranking position improves by at least 4 positions in Google Search Console within 30 days.

## O. Related Skills
- **Data Source**: [Search Console](../../Analytics/Search%20Console/SKILL.md)
- **Gap Identification**: [Gap Analysis](../Gap%20Analysis/SKILL.md), [SERP Analysis](../../Keyword%20Research/SERP%20Analysis/SKILL.md)
- **Structural Upgrades**: [Internal Linking](../../On-page%20SEO/Internal%20Linking/SKILL.md), [Schema Markup](../../On-page%20SEO/Schema%20Markup/SKILL.md)

## P. Authoritative References
- [Google Search Central: What is a Helpful Content Update?](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) — How Google evaluates ongoing content maintenance and quality.
- [Google Search Central: Safe Site Migrations and Redirections](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) — Guidelines on 301 redirects during content consolidation.

## Q. Maintenance and Review Cycle
- **Quarterly Content Decay Sweep**: Run the GSC 16-month decay script at the end of every quarter to flag pages entering early-stage traffic erosion.
