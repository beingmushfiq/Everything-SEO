---
name: seo-keyword-discovery
description: Systematic query discovery, multi-source intent triangulation, and seed expansion protocol across organic search and audience research channels.
metadata:
  category: Keyword Research
  discipline: Search Intelligence
  version: "1.0.0"
---

# Keyword Discovery

## A. Purpose
The Keyword Discovery skill governs the systematic identification, expansion, and qualification of raw search demand. Its mission is to transform ambiguous business value propositions, audience pain points, and product capabilities into an exhaustive, categorized inventory of real search queries executed by human prospects. Rather than relying on a single commercial database, this skill executes multi-source triangulation to uncover high-intent head terms, mid-tail qualifiers, and emerging search patterns before competitor saturation.

## B. Trigger Conditions
This skill should be invoked when:
1. Launching a new website, digital product, or service line requiring organic market positioning.
2. Building an editorial calendar or topical content map from scratch.
3. Conducting a comprehensive organic search audit to discover unaddressed customer demand.
4. Expanding an established domain into adjacent topical clusters or international markets.
5. Identifying traffic loss caused by shifting consumer terminology or newly emerging query entities.

Upstream dependencies: Business Model Definition, Ideal Customer Profile (ICP) documentation, and core product feature inventories.

## C. Scope and Boundaries
- **In-Scope**:
  - Seed keyword generation and lexical brainstorming.
  - Multi-engine autosuggest scraping and modifier permutation.
  - Competitor keyword profile extraction and semantic intersection.
  - Zero-volume and emerging query extraction from community discourse (Reddit, forums, Q&A).
  - Search query normalization, deduplication, and initial lexical tokenization.
- **Out-of-Scope**:
  - In-depth SERP feature layout evaluation (Handled by [SERP Analysis](../SERP%20Analysis/SKILL.md)).
  - Detailed competitive difficulty scoring and weak-spot qualification (Handled by [Low-competition Keywords](../Low-competition%20Keywords/SKILL.md)).
  - On-page title and content mapping (Handled by [Title](../../On-page%20SEO/Title/SKILL.md) and [Gap Analysis](../../Content%20Optimization/Gap%20Analysis/SKILL.md)).

## D. Required Inputs
To initiate Keyword Discovery, collect the following data:
1. **Primary Seed Entities**: 3 to 10 core noun/verb concepts describing the product, service, or topic (e.g., `headless cms`, `ecommerce migration`, `kubernetes security`).
2. **Target Demographics & Geotargeting**: Country code (e.g., `US`, `UK`, `DE`), language (e.g., `en`, `de`), and industry vertical.
3. **Primary Competitors**: 3 to 5 direct competitors and 2 to 3 indirect informational publishers.
4. **Customer Voice Artifacts (Optional but Recommended)**: Sales call transcripts, support tickets, or user interview notes.

*Fallback Rule*: If competitor URLs or customer voice artifacts are unavailable, initialize discovery using Google Search Suggest wildcards (`* [seed]`, `[seed] vs *`) and Google Search Console performance data if the domain is already indexed.

## E. Required Tools and Data Sources
- **Commercial Tooling**: Ahrefs Keywords Explorer, Semrush Keyword Magic Tool, Keywords Everywhere API.
- **Zero-Budget / Open Source Alternatives**:
  - Google Search Suggest via headless browser / Python API (`requests` with `suggestqueries.google.com/complete/search?client=chrome&q={seed}`).
  - Google Search Console Search Analytics API (historical query data).
  - Google Trends for directional momentum and breakout query detection.
  - Reddit and StackExchange public APIs for colloquial question mining.
  - Command-line tools: `curl`, `jq`, and Python (`pandas`, `urllib`).

## F. Core Concepts and Decision Principles
1. **Demand Triangulation**: A query found in only one third-party SEO database may be an artifact of clickstream sampling or bot anomalies. Queries corroborated across Google Autocomplete, Search Console, and competitive rankings represent verified demand.
2. **The 4-Intent Framework**:
   - *Informational*: User seeks knowledge (`how does headless cms work`).
   - *Navigational*: User seeks a specific website/brand (`strapi documentation`).
   - *Commercial Investigation*: User compares options before purchase (`strapi vs sanity review`).
   - *Transactional*: User is ready to buy or register (`contentful enterprise pricing`).
3. **Lexical vs. Semantic Expansion**:
   - *Lexical*: Appending prefixes, suffixes, and prepositions (`best [seed] for [industry]`).
   - *Semantic*: Identifying co-occurring entities, related concepts, and synonyms without sharing root stems (`decoupled web architecture` for `headless cms`).
4. **Query Normalization**: Standardizing case, trimming punctuation, stripping stop words for clustering, and deduplicating singular/plural variants where Google serves identical SERPs.

## G. Operational Workflow

```
[Phase 1: Seed Generation] -> [Phase 2: Multi-Source Scraping] -> [Phase 3: Community Mining]
           |                                 |                                 |
           v                                 v                                 v
[Phase 4: Normalization & Dedup] -> [Phase 5: Intent Tagging] -> [Phase 6: Cluster Handoff]
```

### Step 1: Seed Entity Definition & Lexical Matrix
1. Define the core entity matrix comprising:
   - *Core Entity*: The primary product/service (e.g., `database backup`).
   - *Problems / Symptoms*: What triggers the search? (e.g., `slow postgres restore`, `data corruption`).
   - *Target Personas*: Who performs the search? (e.g., `devops`, `dba`, `startup founder`).
   - *Use Cases*: In what environment? (e.g., `aws rds`, `docker`, `bare metal`).
2. Construct a combinatorial permutation matrix across standard search modifiers:
   - Questions: `what`, `why`, `how`, `when`, `can`, `is`.
   - Modifiers: `best`, `top`, `pricing`, `tutorial`, `open source`, `free`, `alternative`, `comparison`.
   - Modifiers for Enterprise: `compliance`, `soc2`, `architecture`, `sla`, `migration`.

### Step 2: Multi-Source Query Extraction
1. **Google Autocomplete Harvesting**:
   - Query Google Autocomplete programmatically using alphabet soup expansion:
     ```bash
     # Example CLI query for autocomplete extraction
     curl -s "https://suggestqueries.google.com/complete/search?client=chrome&hl=en&gl=us&q=headless+cms+a" | jq .[1]
     ```
   - Iterate across all alphanumeric characters (`a-z`, `0-9`) prepended and appended to seed terms.
2. **People Also Ask (PAA) & Related Searches**:
   - Scrape the bottom "Related searches" and interactive "People also ask" questions from live SERPs for the primary 5 seed keywords.
3. **Third-Party Database Query Expansion**:
   - If using Ahrefs/Semrush: Query the Keyword Magic / Keywords Explorer tool using broad match, phrase match, and "Questions" filtering. Export raw results to CSV.

### Step 3: Community & Customer Voice Mining
1. Query relevant subreddits and developer forums:
   - Target queries: `site:reddit.com/r/{subreddit} "how do I" OR "recommend" OR "issue with" [seed]`.
2. Extract recurring phrase structures that traditional SEO tools overlook due to zero-search-volume thresholds.
3. Document exact customer phrasing into a "Colloquial Terms" ledger.

### Step 4: Query Normalization and Deduplication
1. Load all aggregated query lists into a unified data frame.
2. Convert all strings to lowercase, strip trailing whitespace, normalize internal whitespace, and remove non-alphanumeric punctuation (except hyphens and plus signs).
3. Identify stem duplicates (e.g., `best headless cms for react` vs `best react headless cms`) and tag them for canonical cluster grouping.

### Step 5: Intent Classification & Funnel Mapping
1. Apply regex-based heuristic intent tagging:
   - *Transactional*: `\b(buy|pricing|price|cost|discount|coupon|quote|hire|order)\b`
   - *Commercial*: `\b(best|top|review|reviews|vs|versus|comparison|alternative|alternatives|pros and cons)\b`
   - *Informational*: `\b(how|what|why|guide|tutorial|examples|learn|definition|tips|template)\b`
   - *Navigational*: Brand names, login, portal, login page, support.
2. Flag ambiguous queries for manual SERP verification in [SERP Analysis](../SERP%20Analysis/SKILL.md).

## H. Analysis and Decision Framework
Use the following decision tree to qualify queries into the production inventory:

```
                  [Discovered Query]
                          |
             Does it match ICP & Service?
                    /           \
                 [No]          [Yes]
                  /               \
         (Discard/Negative)     Is Search Intent Clear?
                                   /         \
                                [Yes]        [No]
                                 /              \
            Is intent served by existing URL?   (Route to SERP Analysis)
                 /             \
              [Yes]           [No]
               /                 \
(Route to Content Refresh)  (Add to New Opportunity Inventory)
```

## I. Prioritization Framework
Evaluate each discovered query cluster using the **Opportunity Index (OI)**:

$$\text{Opportunity Index} = \frac{\text{Search Volume (Normalized)} \times \text{Commercial Intent Score (1-5)}}{\text{Subjective Difficulty (1-5)}}$$

Where Commercial Intent Score is defined as:
- 5: Direct Transactional / High-ticket RFP intent.
- 4: Commercial comparison of software/service.
- 3: High-intent problem-solving guide with direct tool application.
- 2: Broad informational concept.
- 1: Academic or non-commercial definition.

## J. Deliverables & Specifications
The output of Keyword Discovery must be a structured CSV or Markdown table containing the following fields:
1. `raw_query`: The exact search term.
2. `normalized_query`: Lowercase, standardized term.
3. `seed_parent`: The originating core entity.
4. `source_channel`: Autocomplete, GSC, Reddit, Competitor, or Database.
5. `classified_intent`: Informational, Navigational, Commercial, or Transactional.
6. `funnel_stage`: TOFU (Top of Funnel), MOFU (Middle), BOFU (Bottom).
7. `candidate_status`: Approved, Review Needed, or Rejected.

## K. Quality Assurance Checklist
- [ ] No duplicate queries exist in the normalized list.
- [ ] No navigational brand terms belonging to direct competitors are misclassified as generic transactional terms.
- [ ] Geotargeting parameters (`gl`, `hl`) were explicitly set during all scraping and API calls.
- [ ] Queries contain both head terms (1-2 words) and descriptive long-tail terms (4+ words).
- [ ] High-volume vanity queries that do not serve business outcomes have been marked as low priority.

## L. Failure Modes and Anti-Patterns
- **The Volume Trap**: Prioritizing massive 50,000/mo broad queries that convert at 0.01% while ignoring 150/mo high-intent queries that convert at 12%.
- **Single-Source Dependency**: Relying solely on one third-party keyword tool whose database has not refreshed clickstream data for that niche in 6 months.
- **Ignoring Brand Disambiguation**: Targeting acronyms that have completely different meanings in other industries (e.g., `ATM` as Asynchronous Transfer Mode vs Automated Teller Machine).
- **Overlooking Negative Keywords**: Including terms like `salary`, `jobs`, `free download`, or `cracked` when selling enterprise SaaS.

## M. AI-Agent Operating Instructions
When an AI agent executes Keyword Discovery:
1. Never fabricate search queries. Only output queries discovered through API calls, live search commands, or verified user inputs.
2. Use Python scripting to query Google Suggest endpoints responsibly with rate-limiting pauses (0.5s between requests) to prevent HTTP 429 blocks.
3. Automatically group queries sharing identical 3-word n-grams to accelerate semantic clustering.
4. Request human approval on the final list of seed entities before running multi-source expansion.

## N. Success Metrics & Verification Windows
- **Leading Indicators (Day 1 - 14)**:
  - Discovery Yield: At least 300 to 1,000 qualified queries generated across all 4 intent stages.
  - Coverage Ratio: 100% of core product features represented by at least 15 distinct long-tail and commercial queries.
- **Lagging Indicators (Month 3 - 6)**:
  - Progression into Google Search Console: Discovered queries appear in GSC impressions within 90 days of content publication.

## O. Related Skills
- **Downstream Consumers**:
  - [Long-tail Keywords](../Long-tail%20Keywords/SKILL.md) — Isolating high-converting descriptive variations.
  - [Low-competition Keywords](../Low-competition%20Keywords/SKILL.md) — Auditing ranking feasibility.
  - [SERP Analysis](../SERP%20Analysis/SKILL.md) — Dissecting live Google layout and user intent.
- **Sibling Tools**:
  - [Ahrefs](../../SEO%20Tools/Ahrefs/SKILL.md) — Executing Keywords Explorer batch audits.
  - [SEMrush](../../SEO%20Tools/SEMrush/SKILL.md) — Using Keyword Magic Tool filters.

## P. Authoritative References
- [Google Search Central: Creating Helpful, Reliable, People-First Content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) — Guidelines on search intent and user satisfaction.
- [Google Search Central: How Google Search Works](https://developers.google.com/search/docs/fundamentals/how-search-works) — Official documentation on crawling, indexing, and query serving.
- [RFC 3986: Uniform Resource Identifier (URI) Generic Syntax](https://datatracker.ietf.org/doc/html/rfc3986) — Standards for query string encoding and parameter handling.

## Q. Maintenance and Review Cycle
- **Review Trigger**: Quarterly review or whenever product positioning, major competitors, or core industry terminology changes.
- **Staleness Indicator**: Queries with zero impressions in GSC over a 12-month period should be re-evaluated for terminology shifts.
