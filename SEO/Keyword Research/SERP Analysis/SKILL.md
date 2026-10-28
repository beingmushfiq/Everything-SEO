---
name: seo-serp-analysis
description: Reverse-engineering live search engine results pages, rich feature layouts, search intent architecture, and ranking content archetypes.
metadata:
  category: Keyword Research
  discipline: Search Intelligence
  version: "1.0.0"
---

# SERP Analysis

## A. Purpose
The SERP Analysis skill reverse-engineers the live Search Engine Results Page (SERP) to decipher Google's exact criteria for ranking satisfaction. Rather than guessing what content format, length, or semantic structure is needed, SERP Analysis extracts the ground truth directly from the top 10 search results. This skill evaluates SERP layout architecture (AI Overviews, Featured Snippets, Knowledge Panels, Local Packs, People Also Ask), identifies the dominant search intent archetype, and establishes the exact content specification required to rank.

## B. Trigger Conditions
Invoke this skill when:
1. Drafting a content brief or editorial specification for a high-priority target keyword.
2. Troubleshooting a ranking plateau or sudden drop for an existing URL.
3. Deciding whether to create a blog article, product landing page, free interactive tool, or video asset.
4. Evaluating how much real estate is occupied by Google's native features and paid advertisements before investing resources.

Upstream dependencies: [Keyword Discovery](../Keyword%20Discovery/SKILL.md) and [Low-competition Keywords](../Low-competition%20Keywords/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - Live SERP feature cataloging (AI Overviews, Snippets, Video, Images, Discussions).
  - Search intent consensus evaluation (Informational, Navigational, Commercial, Transactional).
  - Content archetype classification (Listicle, Deep Guide, Comparison Table, Calculator, eCommerce Product/Category).
  - Information Gain auditing across top-ranking competitors.
  - Page-level backlink and domain authority benchmarking.
- **Out-of-Scope**:
  - On-page title tag writing (Handled by [Title](../../On-page%20SEO/Title/SKILL.md)).
  - Internal link architecture (Handled by [Internal Linking](../../On-page%20SEO/Internal%20Linking/SKILL.md)).
  - Schema markup implementation (Handled by [Schema Markup](../../On-page%20SEO/Schema%20Markup/SKILL.md)).

## D. Required Inputs
1. **Primary Target Query**: The exact keyword phrase to analyze.
2. **Target Geolocation & Locale**: Country (`gl`), Language (`hl`), and City/Postal Code if local intent exists.
3. **Device Type**: Desktop vs. Mobile (essential as mobile SERP layouts frequently feature different interactive modules).

## E. Required Tools and Data Sources
- **Commercial Tooling**: Ahrefs SERP Overview, Semrush SERP Analysis, Thruuu SERP Analyzer.
- **Zero-Cost / Open Source Alternatives**:
  - Direct browser inspection using Google Chrome in Incognito mode with geolocation overridden via DevTools Sensors.
  - Python scripts using Playwright or Puppeteer with custom user-agents to capture HTML DOM and full-page screenshots.
  - Free SERP APIs (e.g., SerpApi, ValueSerp free tiers) or direct HTML parsing with BeautifulSoup.

## F. Core Concepts and Decision Principles
1. **SERP Intent Consensus**: Google’s machine learning ranking models (RankBrain, MUM, Gemini integration) cluster search results based on historical user satisfaction. If 9 out of 10 results are SaaS product comparison tables, Google has established that users have *Commercial Investigation* intent. Publishing a 5,000-word historical guide for that keyword will fail regardless of backlink authority.
2. **The "Above the Fold" Pixel Real Estate Tax**:
   On mobile devices, a single query might display:
   1. Sponsored Ads (top 4).
   2. Google AI Overview accordion.
   3. "People Also Ask" 4-question module.
   4. Local 3-Pack or Product Carousel.
   The #1 organic web result may not appear until 1,800 pixels down the page. Knowing this prevents unrealistic organic traffic expectations.
3. **Information Gain**: In accordance with Google’s Information Gain patents, search systems actively down-rank pages that merely summarize or paraphrase existing search results. High-ranking pages provide *unique data*, *first-party benchmarks*, *proprietary workflows*, or *contrarian expert viewpoints*.

## G. Operational Workflow

```
[Query Live SERP in Target Locale] -> [Audit Layout Features & Pixel Real Estate]
                  |                                      |
                  v                                      v
     [Classify Intent Archetype] -> [Extract Top 5 Structural Attributes]
                  |                                      |
                  v                                      v
     [Analyze Information Gain Gaps] -> [Produce Content Architecture Spec]
```

### Step 1: Clean SERP Extraction
1. Execute search query with personalization and browsing history disabled:
   ```
   https://www.google.com/search?q={query}&gl=us&hl=en&pws=0&uule={canonical_location}
   ```
2. Verify whether the SERP triggers localized intent (Google Maps / Local Pack). If a Local Pack is triggered, local citations and GBP optimization take priority over standard content.

### Step 2: SERP Layout & Feature Inventory
Record the presence and position of every non-standard organic feature:
- [ ] Google AI Overview (Expanded or Collapsed)
- [ ] Featured Snippet (Paragraph, List, or Table)
- [ ] People Also Ask (PAA) box
- [ ] Video / YouTube carousel
- [ ] Image pack / visual gallery
- [ ] Discussions & Forums module (Reddit / Quora)
- [ ] Top Stories / News carousel
- [ ] Google Shopping / Merchant product grid
- [ ] Knowledge Graph Panel (Right sidebar / Header)

### Step 3: Intent Archetype Breakdown (Top 10 Results)
Evaluate each of the top 10 organic web results and classify its content archetype:

| Archetype | Common Indicators in Title & URL | Target User Need |
| :--- | :--- | :--- |
| **Comprehensive Guide** | "Ultimate Guide", "How to", "Step-by-Step" | Needs deep didactic instruction. |
| **Listicle / Roundup** | "15 Best...", "Top 10...", "Tools for..." | Wants to evaluate multiple options quickly. |
| **Direct Comparison** | "[Brand A] vs [Brand B]", "Alternatives" | Ready to make an informed software choice. |
| **Interactive Tool** | "Calculator", "Generator", "Checker", "Template" | Needs immediate operational utility. |
| **Commercial Landing** | Product homepage, pricing page, feature page | Ready to buy or start a free trial. |

*Decision Rule*: Identify the dominant archetype ($\ge 60\%$ of results). If no archetype has $\ge 60\%$, the SERP is "Fractured Intent" (Google is testing multiple formats simultaneously).

### Step 4: Competitor Structural Dissection (Top 3 Results)
For the top 3 ranking URLs, scrape and document:
1. Exact `<title>` tag and primary H1.
2. Complete H2 and H3 heading hierarchy.
3. Estimated word count of core body text (excluding navigation and comments).
4. Media usage: Number of unique images, diagrams, video embeds, and data tables.
5. Content Age: Original publication date vs. latest "Updated on" date.

### Step 5: Information Gain Opportunity Identification
Read the top 3 results critically and identify what they are all missing:
- Are they repeating the same generic definition?
- Are their code examples broken or outdated?
- Do they lack real cost figures, benchmark numbers, or proprietary testing?
- Are they using stock photos instead of real product walkthroughs?

## H. Analysis and Decision Framework
Use this decision model to establish the content creation mandate:

```
                     [Analyze Top 10 SERP]
                                |
               Does an AI Overview or Snippet Exist?
                          /            \
                       [Yes]           [No]
                        /                \
        Design concise 45-word         Does a single archetype
        direct answer in intro          dominate (>= 60%)?
                                           /          \
                                        [Yes]         [No]
                                         /              \
                     (Adopt dominant archetype)     (Target highest-converting
                                                     archetype or build hybrid)
```

## I. Prioritization Framework
Score SERP attractiveness using the **Organic Opportunity Score (OOS)**:

$$\text{OOS} = 100 - (\text{Ad Count} \times 10) - (\text{AI Overview Penalty: 30}) - (\text{Local Pack Penalty: 25}) + (\text{UGC Bonus: 20})$$

- $\ge 70$: **Prime Organic Real Estate**. Top 3 ranking will capture high CTR.
- $40 - 69$: **Moderate Real Estate**. Must target Featured Snippet to capture visibility.
- $< 40$: **Suppressed Real Estate**. Zero-click or ad-heavy environment; prioritize only if commercial value is exceptionally high.

## J. Deliverables & Specifications
Deliver a **SERP Architecture Blueprint**:
1. `target_query`: Searched phrase.
2. `serp_features_detected`: List of detected modules.
3. `organic_real_estate_score`: Calculated OOS (0-100).
4. `dominant_intent_archetype`: Listicle, Deep Guide, Comparison, or Tool.
5. `target_word_count_benchmark`: Median of top 3 ranking results $\pm 20\%$.
6. `mandatory_subtopics`: High-frequency H2/H3 entities extracted across competitors.
7. `information_gain_differentiator`: The unique data, benchmark, or visual asset that no competitor currently provides.

## K. Quality Assurance Checklist
- [ ] Searched in a clean session without personalized cookie history.
- [ ] Tested both mobile and desktop SERP layouts.
- [ ] Confirmed that top 3 results are not ranking purely due to branded navigational queries.
- [ ] Identified the presence of Google AI Overviews and extracted the cited sources.

## L. Failure Modes and Anti-Patterns
- **The Format Mismatch Blunder**: Attempting to rank a long blog post when the entire SERP consists of interactive SaaS category pages.
- **Competitor Paraphrasing**: Copying the headings of the top 3 ranking articles and spinning them with an LLM. This guarantees down-ranking under Google's Information Gain framework.
- **Ignoring the PAA Graph**: Failing to extract and answer the exact questions Google surfaces in the "People Also Ask" accordion.

## M. AI-Agent Operating Instructions
1. An AI agent should use headless browser automation (Playwright/Puppeteer) with `--disable-blink-features=AutomationControlled` to avoid Cloudflare/Google captcha triggers.
2. Parse the DOM tree for specific selector patterns:
   - Featured Snippet: `div.c2xzTb`, `div.xpdopen`
   - PAA Accordion: `div.related-question-pair`
   - AI Overview: Custom Google generative containers.
3. Automatically extract and summarize the heading structures (H1, H2, H3) of the top 3 URLs to compile an initial subtopic coverage matrix.

## N. Success Metrics & Verification Windows
- **Content-to-SERP Fit**: New content ranks within top 30 within 14 days of publication, demonstrating initial intent alignment.
- **Snippet Acquisition**: Target URL captures the Featured Snippet or is cited within the Google AI Overview within 60 days.

## O. Related Skills
- **Upstream Input**: [Keyword Discovery](../Keyword%20Discovery/SKILL.md), [Search Volume](../Search%20Volume/SKILL.md)
- **Downstream Execution**: [Title](../../On-page%20SEO/Title/SKILL.md), [Headings Optimization](../../On-page%20SEO/Headings%20Optimization/SKILL.md), [Gap Analysis](../../Content%20Optimization/Gap%20Analysis/SKILL.md)
- **AI Integration**: [AI Citations](../../AI%20SEO/AI%20Citations/SKILL.md), [AI Search Visibility](../../AI%20SEO/AI%20Search%20Visibility/SKILL.md)

## P. Authoritative References
- [Google Search Central: Feature Snippets and Your Website](https://developers.google.com/search/docs/appearance/featured-snippets) — Official guidelines on featured snippet mechanics.
- [US Patent 10,754,923 (Google LLC): Contextual Information Gain](https://patents.google.com/patent/US10754923B2/en) — Google's patent on scoring and rewarding content that provides new information relative to previously viewed documents.

## Q. Maintenance and Review Cycle
- **Quarterly Audit**: SERP layouts evolve rapidly. Re-analyze target SERPs every 90 days to verify if new features (e.g. AI Overviews, shopping grids) have shifted organic CTR dynamics.
