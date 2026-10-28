---
name: seo-tools-keywords-everywhere
description: Practical operating procedures for Keywords Everywhere (bulk volume import, SERP metrics overlay, multi-platform search trends, and API automation).
metadata:
  category: SEO Tools
  discipline: Tool Operations
  version: "1.0.0"
---

# Keywords Everywhere Tool Operations

## A. Purpose
The Keywords Everywhere Tool Operations skill governs the tactical execution and workflow integration of the Keywords Everywhere browser extension and REST API. Keywords Everywhere provides a lightweight, cost-effective data layer that overlays monthly search volume, Cost Per Click (CPC), 12-month historical trend graphs, and competition metrics directly inside live search interfaces (Google Search, YouTube, Amazon, Pinterest, Bing, and AnswerThePublic). This skill establishes standardized procedures for running rapid in-browser SERP validation, bulk keyword volume imports, trend anomaly detection, and automated programmatic volume lookups.

## B. Trigger Conditions
Invoke this skill when:
1. Conducting rapid, real-time keyword validation while browsing live Google, YouTube, or Amazon search results.
2. Sizing search demand for large batches of un-indexed or long-tail queries via the Bulk Keywords tool without paying for expensive enterprise subscriptions.
3. Evaluating historical search volume seasonality directly beneath the Google search box.
4. Extracting "People Also Search For" (PASF) and "Related Keywords" widgets during initial niche exploration.

Upstream dependencies: [Keyword Discovery](../../Keyword%20Research/Keyword%20Discovery/SKILL.md) and [Search Volume](../../Keyword%20Research/Search%20Volume/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - In-browser overlay operations across Google, YouTube, Amazon, and Bing.
  - Bulk Keyword Data tool workflows (importing up to 10,000 keywords for instant metric lookup).
  - Interpreting Historical Search Volume charts and monthly trend breakdowns.
  - Extracting Trending Keywords and PASF widgets on live SERPs.
  - Programmatic API integration using the Keywords Everywhere API endpoint.
- **Out-of-Scope**:
  - Full-site technical crawl audits (Handled by [Screaming Frog](../Screaming%20Frog/SKILL.md)).
  - Competitive backlink analysis (Handled by [Ahrefs](../Ahrefs/SKILL.md) and [SEMrush](../SEMrush/SKILL.md)).
  - Tracking live keyword ranking positions over time (Handled by [Search Console](../../Analytics/Search%20Console/SKILL.md)).

## D. Required Inputs
1. **Target Keyword List**: Plain-text list of search terms (up to 10,000 queries).
2. **Keywords Everywhere Account & API Key**: Active credit balance.
3. **Target Country Code**: Specific country database (e.g., `us`, `uk`, `ca`, `au`, `global`).
4. **Currency Code**: Display currency (e.g., `USD`, `EUR`, `GBP`).

## E. Required Tools and Data Sources
- **Extension & Web App**: Keywords Everywhere Chrome / Firefox extension, Keywords Everywhere web portal.
- **Keywords Everywhere REST API**: `https://api.keywordseverywhere.com/v1/get_keyword_data`.
- **Python / CLI**: Scripting environment for batch API requests.

## F. Core Concepts and Decision Principles
1. **How Keywords Everywhere Sources Data**:
   - Keywords Everywhere pulls its core search volume, CPC, and competition data directly from **Google Keyword Planner**, supplemented by clickstream data panels and historical trend indexes.
   - Because it sources directly from Google AdWords data, its volume figures represent **exact 12-month average monthly searches** rather than broad logarithmic buckets, offering high accuracy for commercial queries.
2. **The Competition Metric (0.0 to 1.0)**:
   - In Keywords Everywhere, the "Competition" number is **Google Ads advertiser competition**, NOT organic SEO ranking difficulty.
   - A competition score of `0.95` means 95% of advertisers bid on this term in Google Ads (indicating massive commercial buying intent).
   - A competition score of `0.05` means advertisers rarely bid on this term.
   - *Rule*: Use the Competition score as an indicator of **Commercial Intent and Monetization Value**, not organic ranking barrier.
3. **Credit Management Discipline**:
   - Each keyword lookup consumes 1 API credit.
   - Turn off the browser extension toggle when browsing casually to prevent wasting credits on random personal searches.
   - Enable the toggle only during active, structured SEO research sessions.

## G. Operational Workflow

```
[Activate Browser Extension for Session] -> [Inspect Live SERP Overlay Widgets]
                  |                                           |
                  v                                           v
    [Export Related & PASF Keywords] -> [Run Bulk Keyword Data Tool (Up to 10k)]
                  |                                           |
                  v                                           v
   [Analyze 12-Month Trend Sparklines] -> [Deactivate Extension to Conserve Credits]
```

### Step 1: In-Browser Live SERP Triage
1. Activate the Keywords Everywhere extension.
2. Search your primary seed term on Google (e.g., `postgresql backup`).
3. Examine the three native overlay widgets injected on the right sidebar:
   - **Trend Chart**: Review the 5-year and 12-month search interest trajectory.
   - **Related Keywords**: Extract 15-20 semantically related queries with individual volumes and CPCs.
   - **People Also Search For (PASF)**: Identify lateral entities and competitor software names.
4. Click **"Export to CSV"** at the bottom of the widget to save the enriched query list.

### Step 2: Bulk Keyword Volume Lookup (Web Portal)
To enrich a raw list of 1,000 queries generated during [Keyword Discovery](../../Keyword%20Research/Keyword%20Discovery/SKILL.md):
1. Navigate to the Keywords Everywhere web portal > **Bulk Keyword Data**.
2. Select your target country (e.g., `United States`) and currency (`USD`).
3. Paste up to 10,000 keywords into the input box.
4. Click **Get Search Volume and CPC**.
5. The output displays:
   - Volume: Monthly average.
   - CPC: Average advertiser cost per click in USD.
   - Competition: Commercial intent index (0.0 - 1.0).
   - Trend: Mini sparkline showing the last 12 months of demand.
6. Export the enriched table as a CSV.

### Step 3: Programmatic API Automation via Python
For automated data pipelines, query the Keywords Everywhere API directly:
```python
import requests
import json
import pandas as pd

API_KEY = "YOUR_KEYWORDSEVERYWHERE_API_KEY"

def get_bulk_keyword_data(keywords, country="us", currency="USD"):
    url = "https://api.keywordseverywhere.com/v1/get_keyword_data"
    headers = {
        "Accept": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    data = {
        "country": country,
        "currency": currency,
        "data": keywords
    }
    
    response = requests.post(url, headers=headers, data=data)
    if response.status_code == 200:
        result = response.json()
        return pd.DataFrame(result['data'])
    else:
        print(f"API Error {response.status_code}: {response.text}")
        return None

# Test with a batch of 5 queries
test_kws = ["postgres wal archiving", "database backup automation", "postgresql restore command"]
df_kws = get_bulk_keyword_data(test_kws)
print(df_kws[['keyword', 'vol', 'cpc', 'competition', 'trend']].head())
```

### Step 4: Trend Deconstruction & Seasonality Auditing
1. In the exported CSV, inspect the `trend` column (array of monthly volumes for the past 12 months).
2. Calculate the peak month vs. trough month ratio.
3. Identify seasonal patterns and plan publishing calendars accordingly (see [Search Volume](../../Keyword%20Research/Search%20Volume/SKILL.md)).

### Step 5: Multi-Platform Cross-Referencing
Leverage Keywords Everywhere on non-Google platforms to triangulate demand:
- **YouTube**: Search the seed term on YouTube to check video search volume and tags for tutorial ideation.
- **Amazon**: Check eCommerce buyer intent and search volumes for physical or digital products.

## H. Analysis and Decision Framework
Use this framework to evaluate Keywords Everywhere data:

```
                    [Enriched Keyword Metric Row]
                                  |
                   Is Monthly Volume >= 100?
                             /          \
                          [Yes]         [No]
                           /              \
             Is Competition score >= 0.50? (Is it a high-intent B2B query
                    /          \            with zero nominal volume?
                 [Yes]         [No]         If yes, keep; else discard)
                  /              \
         (HIGH COMMERCIAL      (Informational /
          VALUE: High CPC &     Top of funnel;
          advertiser demand;    good for general
          prioritize BOFU)      educational guides)
```

## I. Prioritization Framework
Score keywords using the **Commercial Value Index (CVI)**:

$$\text{CVI} = \text{Monthly Search Volume} \times \text{CPC (\$) } \times \text{Competition Score (0.0-1.0)}$$

Keywords with high CPC and high competition represent commercial goldmines where organic rankings substitute for expensive paid advertising clicks.

## J. Deliverables & Specifications
Deliver a **Keywords Everywhere Enriched Dataset**:
1. `keyword`: Query string.
2. `monthly_volume`: Numerical average.
3. `cpc_usd`: Cost per click.
4. `competition_index`: 0.0 to 1.0 commercial indicator.
5. `12_month_trend_array`: Monthly historical values.
6. `target_funnel_stage`: TOFU, MOFU, or BOFU based on CPC.

## K. Quality Assurance Checklist
- [ ] Correct country selected in extension settings (e.g., `United States` vs `Global`).
- [ ] Recognized that "Competition" measures paid AdWords competition, not organic SEO difficulty.
- [ ] Confirmed extension is toggled OFF when not in active research mode to conserve credits.
- [ ] Filtered out zero-volume noise that lacks commercial relevance.
- [ ] Verified that seasonal trends are evaluated over a full 12-month cycle.

## L. Failure Modes and Anti-Patterns
- **The "Low Competition" Misinterpretation**: Believing that a keyword with `Competition: 0.05` is easy to rank for in Google organic search. It simply means advertisers don't buy Google Ads on it; the organic SERP may still be locked by Wikipedia and government sites.
- **Credit Hemorrhage**: Leaving the extension active while doing personal shopping or web surfing, draining 50,000 paid credits in a week on useless lookups.
- **Ignoring CPC Context**: Treating a \$50 CPC keyword as impossible to rank for, failing to realize that high CPC proves high conversion revenue potential for organic search.

## M. AI-Agent Operating Instructions
1. An AI agent must structure Keywords Everywhere API payloads with valid `country` and `currency` parameters.
2. Ensure automated bulk lookups are batched into chunks of 1,000 keywords per API call to stay within optimal network buffer sizes.
3. Document that CPC figures are derived from Google Ads auction estimates.

## N. Success Metrics & Verification Windows
- **Cost Efficiency**: Enrich 10,000 keywords for $< \$10$ in API credits compared to hundreds of dollars on enterprise suites.
- **Commercial Intent Validation**: $\ge 80\%$ of prioritized keywords feature active advertiser CPC demand.

## O. Related Skills
- **Upstream Input**: [Keyword Discovery](../../Keyword%20Research/Keyword%20Discovery/SKILL.md)
- **Deep Volumetric Analysis**: [Search Volume](../../Keyword%20Research/Search%20Volume/SKILL.md)
- **Enterprise Tooling**: [Ahrefs](../Ahrefs/SKILL.md), [SEMrush](../SEMrush/SKILL.md)

## P. Authoritative References
- [Keywords Everywhere API Documentation](https://api.keywordseverywhere.com/) — Official REST API endpoints, credit costs, and request schemas.
- [Google Ads Keyword Planner Help Center](https://support.google.com/google-ads/answer/2999714) — Methodological background on how Google calculates monthly search volume, competition, and suggested CPC bids.

## Q. Maintenance and Review Cycle
- **Monthly Credit Audit**: Verify remaining API credit balances and export volume logs on the 1st of each month.
