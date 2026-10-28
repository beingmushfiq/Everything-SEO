---
name: seo-search-console
description: Google Search Console API engineering, Search Analytics extraction, regex query filtering, data anomaly auditing, and URL inspection automation.
metadata:
  category: Analytics
  discipline: Search Intelligence
  version: "1.0.0"
---

# Google Search Console

## A. Purpose
The Google Search Console (GSC) skill establishes the engineering and data-forensic standards for extracting, analyzing, and acting upon first-party search performance and technical diagnostic data provided directly by Google. Unlike third-party SEO tools—which rely on sampled clickstream estimates—Google Search Console represents the **definitive empirical ground truth**: actual impressions, clicks, Click-Through Rates (CTR), and average positions recorded whenever a Google user searches for a query and encounters your website. This skill provides a deterministic methodology to automate GSC API exports, run complex regular expression queries, uncover hidden ranking decay, and triage technical indexation anomalies.

## B. Trigger Conditions
Invoke this skill when:
1. Conducting weekly or monthly organic search performance audits.
2. Troubleshooting a sudden or gradual drop in organic clicks or impressions.
3. Identifying high-impression, low-CTR queries for [CTR Optimization](../../On-page%20SEO/CTR%20Optimization/SKILL.md) and [Title](../../On-page%20SEO/Title/SKILL.md) revisions.
4. Detecting keyword cannibalization (multiple URLs competing for the exact same search term).
5. Automating bulk URL Inspection for indexation status and canonical verification.

Upstream dependencies: [Indexing](../../Technical%20SEO/Indexing/SKILL.md) and [Crawling](../../Technical%20SEO/Crawling/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - GSC Search Analytics API data extraction beyond the 1,000-row web interface limit (exporting up to 25,000 rows per request).
  - Advanced regex query filtering (intent segmentation, question mining, branded vs. non-branded isolation).
  - Diagnosing data anomalies: algorithm updates, seasonality, tracking drops, and weekend traffic dips.
  - URL Inspection API automation for bulk indexability checking.
  - Page Indexing, Sitemaps, and Core Web Vitals report forensics.
- **Out-of-Scope**:
  - On-site post-click conversion tracking and revenue attribution (Handled by [Google Analytics](../Google%20Analytics/SKILL.md)).
  - Third-party competitor domain rank tracking (Handled by [Ahrefs](../../SEO%20Tools/Ahrefs/SKILL.md) and [SEMrush](../../SEO%20Tools/SEMrush/SKILL.md)).
  - Bing search engine analytics (Handled by [Bing Webmaster Tools](../Bing%20Webmaster%20Tools/SKILL.md)).

## D. Required Inputs
1. **Google Search Console Property URL**: Domain Property (`sc-domain:example.com`) or URL-prefix Property (`https://example.com/`).
2. **Access Permissions**: Owner, Full User, or GCP Service Account credentials with Search Console API access.
3. **Analysis Date Window**: 28-day, 90-day, or 16-month historical comparisons.
4. **Primary Brand Entity Variants**: Exact strings for brand query filtering (e.g., `devcenterpoint`, `devcenter`, `dbaengine`).

## E. Required Tools and Data Sources
- **Official Tooling**: Google Search Console Web Portal, Google Search Console Search Analytics API, Google Cloud Console Service Accounts.
- **Commercial Tooling**: Screaming Frog SEO Spider (GSC API integration: appending clicks, impressions, and CTR directly to crawl tables).
- **Zero-Cost / Open Source Alternatives**:
  - Python scripts using the `google-api-python-client` and `oauth2client` libraries.
  - Google Looker Studio (formerly Data Studio) GSC connector.
  - BigQuery GSC Bulk Data Export (unlimited raw daily event-level data storage).

## F. Core Concepts and Decision Principles
1. **The 4 Fundamental Metrics Defined**:
   - **Impressions**: Generated whenever a user views a search results page containing your URL. The URL does *not* need to be scrolled into view to count as an impression unless it is in an un-expanded accordion or carousel.
   - **Clicks**: Counted only when a user clicks the search snippet link and is navigated to your website.
   - **Click-Through Rate (CTR)**: $\frac{\text{Clicks}}{\text{Impressions}} \times 100$.
   - **Average Position**: The highest ranking position of your site’s URL for a query, averaged across all user searches in the time window.
2. **Web UI Truncation vs. API Completeness**:
   - The standard GSC web interface limits data tables to a maximum of **1,000 rows**. For large sites, this hides 95% of your long-tail search demand.
   - The **Search Console API** permits downloading up to **25,000 rows per request**, and BigQuery Bulk Data Exports store 100% of all impression data with zero truncation.
3. **The Average Position Distortion**:
   - If a page ranks #1 in the US (generating 100 impressions) and #95 in India (generating 1,000 impressions), the reported GSC "Average Position" will be ~86, completely masking the fact that the page dominates in its primary revenue market.
   - **Always filter by Country and Device** to avoid cross-regional position averaging distortion.

## G. Operational Workflow

```
[Connect Service Account to GSC API] -> [Extract 90-Day Query & Page Dimensions]
                 |                                      |
                 v                                      v
 [Segment Branded vs Non-Branded Queries] -> [Filter Position 4-15 Striking Distance]
                 |                                      |
                 v                                      v
  [Detect Keyword Cannibalization] -> [Export Prioritized Remediation Action List]
```

### Step 1: Automated GSC API Extraction (Python)
Authenticate and extract up to 25,000 rows of granular search data:
```python
from googleapiclient.discovery import build
from google.oauth2 import service_account
import pandas as pd

SERVICE_ACCOUNT_FILE = 'gsc_credentials.json'
SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']

creds = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build('searchconsole', 'v1', credentials=creds)

request = {
    'startDate': '2026-07-01',
    'endDate': '2026-09-30',
    'dimensions': ['query', 'page', 'country', 'device'],
    'rowLimit': 25000,
    'dataState': 'all'
}

response = service.searchanalytics().query(siteUrl='sc-domain:example.com', body=request).execute()
rows = response.get('rows', [])

data = [{
    'query': r['keys'][0],
    'page': r['keys'][1],
    'country': r['keys'][2],
    'device': r['keys'][3],
    'clicks': r['clicks'],
    'impressions': r['impressions'],
    'ctr': r['ctr'],
    'position': r['position']
} for r in rows]

df_gsc = pd.DataFrame(data)
df_gsc.to_csv('gsc_clean_export.csv', index=False)
print(f"Successfully extracted {len(df_gsc)} rows of GSC data.")
```

### Step 2: Branded vs. Non-Branded Query Segmentation
Isolate true organic search performance from navigational brand queries:
```python
brand_regex = r'(devcenterpoint|devcenter|dbaengine)'

df_gsc['is_branded'] = df_gsc['query'].str.contains(brand_regex, case=False, regex=True)

non_branded_df = df_gsc[~df_gsc['is_branded']]
branded_df = df_gsc[df_gsc['is_branded']]

print(f"Non-Branded Clicks: {non_branded_df['clicks'].sum()} ({non_branded_df['clicks'].sum()/df_gsc['clicks'].sum():.1%})")
print(f"Branded Clicks: {branded_df['clicks'].sum()}")
```

### Step 3: Identify "Striking Distance" Low-Hanging Fruit
Filter for high-opportunity queries ranking between positions **4.0 and 15.0**:
```python
striking_distance = non_branded_df[
    (non_branded_df['position'] >= 4.0) & 
    (non_branded_df['position'] <= 15.0) & 
    (non_branded_df['impressions'] >= 500)
].sort_values('impressions', ascending=False)

print("Top 10 Striking Distance Opportunities:\n", striking_distance[['query', 'page', 'position', 'impressions', 'ctr']].head(10))
```
*Action*: Route these URLs to [Title](../../On-page%20SEO/Title/SKILL.md) and [Internal Linking](../../On-page%20SEO/Internal%20Linking/SKILL.md) to push them into the Top 3.

### Step 4: Detect Keyword Cannibalization
Find search queries where Google splits impressions across 2 or more distinct URLs on your site:
```python
query_page_counts = df_gsc.groupby('query')['page'].nunique()
cannibalized_queries = query_page_counts[query_page_counts > 1].index

df_cannibalism = df_gsc[df_gsc['query'].isin(cannibalized_queries)].groupby(['query', 'page'])[['clicks', 'impressions', 'position']].sum().reset_index()
print("Top Cannibalized Query Instances:\n", df_cannibalism.head(10))
```
*Action*: Consolidate competing pages via 301 redirect or adjust on-page targeting to differentiate intent (see [Content Refresh](../../Content%20Optimization/Content%20Refresh/SKILL.md)).

### Step 5: Advanced Regex Filter Patterns (Web Portal)
For daily operational analysis in the GSC web interface, use these regex strings:
- **Questions Mining**: `^(who|what|where|when|why|how|can|is|are) `
- **Commercial Intent**: `(vs|versus|best|top|review|pricing|alternative)`
- **Long-tail Isolation (4+ Words)**: `^([^ ]+ ){3,}[^ ]+$`

## H. Analysis and Decision Framework
Use this framework to diagnose sudden GSC traffic drops:

```
                  [Sudden Organic Traffic Drop in GSC]
                                   |
                  Did Impressions drop as severely as Clicks?
                             /          \
                          [Yes]         [No]
                           /              \
             Did Average Position drop?   (Position is stable, but Clicks
                    /          \           dropped -> CTR anomaly: Google
                 [Yes]         [No]        introduced AI Overview or Ads
                  /              \         above your snippet. Test new title)
         (True Ranking Loss:   (Tracking / Technical Drop:
          Algorithmic penalty,  Check robots.txt, canonicals,
          lost backlinks, or    or site tracking code)
          new competitor)
```

## I. Prioritization Framework
Score GSC optimization actions using the **Organic Recovery Value (ORV)**:

$$\text{ORV} = \text{Monthly Query Impressions} \times (\text{Target Rank CTR (25\%)} - \text{Current CTR}) \times \text{Commercial Intent (1-5)}$$

Focus on queries where a 2-position jump yields $> 500$ incremental monthly clicks.

## J. Deliverables & Specifications
Deliver a **Search Console Performance Audit Report**:
1. `audit_period`: Date range and country filter.
2. `non_branded_clicks_and_impressions`: Isolated performance metrics.
3. `striking_distance_keywords`: Top 20 queries ranked 4-15 with high impressions.
4. `cannibalization_conflicts`: Table of queries split across multiple URLs.
5. `indexing_error_summary`: Count of Soft 404s, Crawled-not-indexed, and No-return hreflang tags.
6. `action_items`: Assigned technical fixes and content updates.

## K. Quality Assurance Checklist
- [ ] Branded queries excluded when reporting on pure organic search growth.
- [ ] Data filtered by primary target country to prevent international averaging skew.
- [ ] Verified that Search Analytics dates account for Google's standard 48-hour data processing lag.
- [ ] Confirmed that API queries specify `dataState: 'all'` to include both web, image, and video search.
- [ ] GSC property verified at the **Domain level** (`sc-domain:`) rather than a single URL-prefix (`https://`) to capture all subdomains and protocol variants.

## L. Failure Modes and Anti-Patterns
- **The Brand Traffic Delusion**: Celebrating a 40% organic traffic increase without realizing that 90% of the growth came from branded searches driven by an offline TV or billboard ad campaign.
- **The "Average Position" Trap**: Panicking because site-wide average position dropped from 12 to 25, failing to see that the site just indexed 5,000 new long-tail pages that rank on page 3, which mathematically lowers the average while increasing total clicks.
- **Ignoring Date Lags**: Calling an emergency meeting on Monday morning because GSC shows a drop on Sunday, failing to recognize that GSC data is not final for 48 to 72 hours.

## M. AI-Agent Operating Instructions
1. An AI agent must parse GSC API responses using dataframes, strictly separating branded from non-branded query tokens.
2. When evaluating traffic trends, compare identical calendar periods (e.g., 28 days vs previous 28 days, or YoY matching days of the week).
3. Automatically flag any query where multiple URLs split impressions $\ge 30\%$ each as an active keyword cannibalization event.

## N. Success Metrics & Verification Windows
- **Striking Distance Promotion**: $\ge 30\%$ of targeted striking distance keywords advance into the Top 3 within 45 days.
- **Cannibalization Resolution**: Resolved queries consolidate 100% of impressions onto the designated canonical URL within 30 days.

## O. Related Skills
- **On-Page Execution**: [Title](../../On-page%20SEO/Title/SKILL.md), [CTR Optimization](../../On-page%20SEO/CTR%20Optimization/SKILL.md)
- **Technical Health**: [Indexing](../../Technical%20SEO/Indexing/SKILL.md), [Crawling](../../Technical%20SEO/Crawling/SKILL.md)
- **Holistic Reporting**: [SEO Reporting](../SEO%20Reporting/SKILL.md), [Google Analytics](../Google%20Analytics/SKILL.md)

## P. Authoritative References
- [Google Search Central: Search Console Overview](https://developers.google.com/search/docs/monitor-debug/search-console-start) — Official guide on metrics, dimensions, and reports.
- [Google Search Console Search Analytics API Documentation](https://developers.google.com/webmaster-tools/v1/searchanalytics/query) — Technical parameter references and rate limit specifications.

## Q. Maintenance and Review Cycle
- **Weekly GSC Health Check**: Review the Performance and Page Indexing reports every Monday to identify newly emerged technical errors or striking distance opportunities.
