---
name: seo-tools-semrush
description: Operational workflows for Semrush (Domain Overview, Keyword Magic Tool, Keyword Gap, Position Tracking, and On Page SEO Checker).
metadata:
  category: SEO Tools
  discipline: Tool Operations
  version: "1.0.0"
---

# Semrush Tool Operations

## A. Purpose
The Semrush Tool Operations skill governs the professional execution and interpretation of the Semrush SEO suite. Semrush provides one of the industry's most comprehensive competitive research platforms, housing multi-billion keyword databases, daily search engine position tracking, paid search intelligence, and on-page optimization engines. This skill establishes standardized operating procedures (SOPs) for mining long-tail keywords in the Keyword Magic Tool, auditing competitive keyword overlaps in the Keyword Gap tool, setting up daily rank tracking, and extracting actionable on-page recommendations.

## B. Trigger Conditions
Invoke this skill when:
1. Conducting competitive domain intelligence to discover competitor traffic share, top organic keywords, and paid search ad strategies.
2. Generating massive, categorized keyword seed lists across multiple intent stages using the Keyword Magic Tool.
3. Executing a competitive keyword intersection audit (Keyword Gap) between your domain and up to 4 direct competitors.
4. Setting up real-time, daily keyword rank tracking across mobile and desktop devices in specific geographic cities/countries.
5. Auditing on-page content relevance and technical compliance via the On Page SEO Checker.

Upstream dependencies: [Keyword Discovery](../../Keyword%20Research/Keyword%20Discovery/SKILL.md) and [Gap Analysis](../../Content%20Optimization/Gap%20Analysis/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - Operating Domain Overview (Authority Score, organic search traffic, paid traffic, competitor positioning map).
  - Keyword Magic Tool operations (Broad match, phrase match, exact match, questions filter, intent grouping).
  - Keyword Gap analysis (identifying Shared, Missing, Weak, and Untapped keywords).
  - Position Tracking project configuration (daily mobile/desktop rank tracking with competitor benchmarking).
  - On Page SEO Checker (technical, semantic, and user experience recommendation extraction).
- **Out-of-Scope**:
  - Direct execution of server-side technical fixes (Handled by [Technical SEO](../../Technical%20SEO/Crawling/SKILL.md)).
  - Managing paid PPC ad spend in Google Ads.
  - Analyzing Google Search Console first-party data (Handled by [Search Console](../../Analytics/Search%20Console/SKILL.md)).

## D. Required Inputs
1. **Target Domain Hostname**: Base URL (`example.com`).
2. **Semrush Account Access**: Active Pro, Guru, or Business subscription tier.
3. **Primary Competitors**: 2 to 4 direct organic competitors in the same vertical.
4. **Target Geographic Location**: Specific country database (e.g., `US`, `UK`, `DE`) and city/state if tracking local pack intent.

## E. Required Tools and Data Sources
- **Semrush Modules**: Domain Overview, Keyword Magic Tool, Keyword Gap, Position Tracking, On Page SEO Checker.
- **Semrush API v3 (Optional)**: REST endpoints for automated reporting integration.
- **Python / CSV Data Processors**: Command-line tools for processing bulk keyword exports.

## F. Core Concepts and Decision Principles
1. **Understanding Semrush Metrics Correctly**:
   - **Authority Score (AS)**: Semrush’s proprietary compound metric (0-100) that evaluates overall domain quality based on backlink quantity, organic search traffic, and spam markers. Like Ahrefs DR, **Authority Score is NOT a Google ranking factor**; it is an estimate of domain prestige.
   - **Keyword Difficulty (KD%)**: Semrush's percentage-based difficulty rating (0-100%). Semrush divides KD% into 6 clear tiers:
     - *0 - 14% (Very Easy)*: New sites can rank quickly.
     - *15 - 29% (Easy)*: Good starting targets with modest content.
     - *30 - 49% (Possible)*: Requires well-structured content and some internal links.
     - *50 - 69% (Difficult)*: Requires established topical authority and quality backlinks.
     - *70 - 84% (Hard)*: Requires high domain authority and heavy link building.
     - *85 - 100% (Very Hard)*: Dominant industry giants only.
2. **Intent Tagging in Semrush**:
   - Semrush automatically assigns intent badges to keywords:
     - `I` = Informational
     - `N` = Navigational
     - `C` = Commercial Investigation
     - `T` = Transactional
   - Filtering for `Intent: C, T` allows rapid extraction of bottom-of-funnel revenue queries.

## G. Operational Workflow

```
[Enter Domain in Domain Overview] -> [Keyword Gap: Compare vs 4 Competitors]
                |                                          |
                v                                          v
 [Keyword Magic: Filter by Intent & KD%] -> [Position Tracking: Configure Daily Serp Tracking]
                |                                          |
                v                                          v
   [On Page SEO Checker: Extract Rules] -> [Synthesize Prioritized Content Roadmap]
```

### Step 1: Competitive Landscape Audit (Domain Overview)
1. Open **Domain Overview** and enter the client domain:
   - Review the **Organic Search Traffic** trend graph over 2 years (check for sudden algorithm drops).
   - Review the **Main Organic Competitors** table to discover unexpected competitors sharing your search real estate.
   - Note the ratio of **Branded vs. Non-Branded Traffic**.

### Step 2: The Keyword Gap Protocol (Finding Missing Revenue)
1. In the left navigation, open **Competitive Research > Keyword Gap**.
2. Enter your domain (You) and up to 4 direct competitors.
3. Select your target country database and click **Compare**.
4. Navigate through the primary gap tabs:
   - **Missing**: Keywords where all competitors rank in the Top 100, but your domain does not rank at all. This is your immediate priority content roadmap.
   - **Weak**: Keywords where your domain ranks lower than all competitors.
   - **Untapped**: Keywords where at least one competitor ranks, but you do not.
5. Apply filters:
   - `Intent: Commercial, Transactional`
   - `KD% <= 49%`
   - `Volume >= 100`
6. Export the filtered list to CSV.

### Step 3: Keyword Magic Tool Systematic Expansion
1. Navigate to **Keyword Research > Keyword Magic Tool**.
2. Enter the primary seed entity (e.g., `postgresql backup`).
3. Use the left-hand **Sub-groups sidebar** to isolate topical sub-themes (e.g., by tool, by cloud provider, by pricing):
   - Click the "Questions" toggle to isolate PAA-style research queries.
   - Apply filter: `KD% < 30` to surface instant quick wins (see [Low-competition Keywords](../../Keyword%20Research/Low-competition%20Keywords/SKILL.md)).
4. Export selected keyword clusters to the **Keyword Strategy Builder** or download as CSV.

### Step 4: Position Tracking Configuration (Daily Monitoring)
Set up automated daily rank tracking:
1. Navigate to **SEO > Position Tracking > Set up a project**.
2. Scope:
   - Device: Select **Mobile** (default for modern indexing) or **Desktop**.
   - Location: Target Country, City, or Postal Code for local relevance.
3. Add Keywords: Paste the 50-100 target keywords selected during discovery.
4. Add Competitors: Add the 3 direct competitors to track weekly share of voice movements.

### Step 5: On Page SEO Checker Execution
1. Navigate to **On Page SEO Checker**.
2. Connect your Google Search Console account.
3. Semrush automatically analyzes your pages against the top 10 competitors and outputs actionable recommendations in 6 categories:
   - *Strategy Ideas*: Keywords that should be re-targeted to different URLs to avoid cannibalization.
   - *Semantic Ideas*: Missing semantic terms and entity co-occurrences.
   - *Content Ideas*: Recommended readability score and target word count benchmarks.
   - *Backlink Ideas*: Specific domains linking to top competitors that could be pitched.

## H. Analysis and Decision Framework
Use this framework to qualify Semrush Keyword Gap data:

```
                   [Keyword Gap Opportunity Discovered]
                                    |
                    Do all 4 competitors rank in Top 10?
                               /          \
                            [Yes]         [No]
                             /              \
               Is the query relevant to    Does at least 1 competitor
               your core service / product? rank in Top 5 with KD% < 40?
                      /          \                 /          \
                   [Yes]         [No]           [Yes]         [No]
                    /              \             /              \
           (HIGH PRIORITY:     (Discard:     (QUICK WIN:    (Archive for
            Create new content  Irrelevant   Add to current  future review)
            pillar immediately) category)     sprint)
```

## I. Prioritization Framework
Score Semrush keyword targets using the **Semrush Opportunity Score (SOS)**:

$$\text{SOS} = \frac{\text{Monthly Search Volume} \times \text{Intent Multiplier (T=3, C=2, I=1)}}{\text{KD\%} + 1}$$

Prioritize keywords with an SOS score $> 50$.

## J. Deliverables & Specifications
Deliver a **Semrush Competitive & Keyword Intelligence Report**:
1. `client_domain_overview`: Authority Score, Organic Traffic, Top Competitors.
2. `keyword_gap_export`: Filtered list of Top 30 "Missing" commercial keywords.
3. `keyword_magic_clusters`: Grouped topical keywords with Volume, KD%, and Intent tags.
4. `position_tracking_setup`: Confirmation of active daily tracking project with mobile/desktop settings.
5. `on_page_seo_checker_tasks`: Top 5 prioritized on-page semantic and content fixes.

## K. Quality Assurance Checklist
- [ ] Correct country database selected for all queries and gap analyses.
- [ ] Commercial and Transactional intents prioritized for revenue-focused sprints.
- [ ] Verified that high-volume keywords have legitimate search intent alignment with client capabilities.
- [ ] Position Tracking configured with the correct geographic city/region if client has localized intent.
- [ ] Acknowledged that Semrush Authority Score is an internal benchmark, not an official Google metric.

## L. Failure Modes and Anti-Patterns
- **The "High Search Volume, Zero Intent" Trap**: Chasing 50,000/mo informational keywords with an Intent tag of `I` when the business needs B2B enterprise leads.
- **Relying Exclusively on Automated On-Page Scores**: Blindly implementing every single semantic recommendation from the On Page SEO Checker without editorial review, creating awkward, unnatural prose.
- **Ignoring Tracking Device Selection**: Tracking only desktop rankings for an eCommerce brand where 85% of real customers search on mobile.

## M. AI-Agent Operating Instructions
1. An AI agent must parse Semrush CSV exports using Pandas, filtering by `Intent` (`C` or `T`) and `KD%` thresholds automatically.
2. Group Keyword Magic Tool exports by sub-groups to deliver modular, cluster-based content briefs.
3. Label all Semrush metrics as "Semrush Third-Party Estimates" in final client deliverables.

## N. Success Metrics & Verification Windows
- **Gap Coverage**: $\ge 80\%$ of approved "Missing" commercial keywords are targeted with new content or refreshed URLs within 60 days.
- **Position Tracking Lift**: Target tracked keywords demonstrate an average position improvement of $\ge 4.5$ positions within 90 days.

## O. Related Skills
- **Direct Alternative**: [Ahrefs](../Ahrefs/SKILL.md)
- **First-Party Truth**: [Search Console](../../Analytics/Search%20Console/SKILL.md)
- **Content Action**: [Gap Analysis](../../Content%20Optimization/Gap%20Analysis/SKILL.md), [Keyword Discovery](../../Keyword%20Research/Keyword%20Discovery/SKILL.md)

## P. Authoritative References
- [Semrush Knowledge Base: How Semrush Calculates Authority Score](https://www.semrush.com/kb/854-authority-score) — Official methodology on backlink analysis, organic traffic, and spam signals.
- [Semrush Keyword Magic Tool Guide](https://www.semrush.com/kb/708-keyword-magic-tool) — Advanced operators, filtering logic, and intent classification rules.

## Q. Maintenance and Review Cycle
- **Weekly Position Tracking Review**: Check the Semrush Position Tracking dashboard every Monday to detect sudden ranking volatility or competitor surge movements.
