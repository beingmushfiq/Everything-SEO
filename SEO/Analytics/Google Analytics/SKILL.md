---
name: seo-google-analytics
description: Google Analytics 4 (GA4) organic performance tracking, landing page engagement rate modeling, search conversion attribution, and BigQuery data export.
metadata:
  category: Analytics
  discipline: Behavioral Analytics
  version: "1.0.0"
---

# Google Analytics 4 (GA4)

## A. Purpose
The Google Analytics 4 (GA4) skill establishes the measurement, tracking, and attribution architecture required to evaluate organic search traffic behavior once visitors land on a website. While Google Search Console measures pre-click search engine results page (SERP) performance, GA4 measures **post-click business reality**: session quality, user engagement rate, scroll depth, form submissions, e-commerce transactions, and revenue attribution. This skill provides an auditable methodology for configuring custom events, isolating pure non-brand organic search channels, linking GSC data into GA4, and modeling multi-touch customer acquisition pathways.

## B. Trigger Conditions
Invoke this skill when:
1. Setting up or auditing organic search reporting dashboards and conversion funnels.
2. Troubleshooting discrepancies between Google Search Console clicks and Google Analytics organic landing page sessions.
3. Measuring the financial ROI, lead generation rate, or average order value (AOV) produced by organic content marketing.
4. Analyzing user engagement rates, dwell times, and bounce behaviors across mobile vs. desktop devices.

Upstream dependencies: [Search Console](../Search%20Console/SKILL.md) and [Conversion Optimization](../../Growth/Conversion%20Optimization/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - GA4 event-driven measurement model (User ID, Session ID, custom parameters).
  - Isolating the `First user default channel group = 'Organic Search'` and `Session default channel group = 'Organic Search'`.
  - Engagement Rate vs. legacy Bounce Rate mathematical definitions.
  - Linking Google Search Console properties directly into GA4 library reports.
  - Setting up custom key events (conversions): Lead forms, demo requests, trials, purchases.
  - BigQuery raw event export configuration for enterprise data modeling.
- **Out-of-Scope**:
  - Paid Google Ads campaign tracking (Handled by Paid Media teams).
  - Pre-click search engine rankings and query impression tracking (Handled by [Search Console](../Search%20Console/SKILL.md)).
  - Server log analysis (Handled by [Log File Analysis](../../Technical%20SEO/Log%20File%20Analysis/SKILL.md)).

## D. Required Inputs
1. **GA4 Measurement ID**: Web stream identifier (`G-XXXXXXXXXX`).
2. **Key Event Definitions**: Specific business actions qualifying as conversions (e.g., `generate_lead`, `purchase`, `sign_up`).
3. **Primary Content Groupings**: Directory paths separating content types (e.g. `/blog/`, `/solutions/`, `/docs/`).
4. **Google Search Console Property Link**: Authorized access to bind GSC data into GA4.

## E. Required Tools and Data Sources
- **Official Tooling**: Google Analytics 4 Web Interface, Google Analytics Data API (v1beta), Google Tag Manager (GTM).
- **Commercial Tooling**: Looker Studio (formerly Data Studio) for custom cross-channel reporting dashboards.
- **Zero-Cost / Open Source Alternatives**:
  - Python scripts using `google-analytics-data` library for automated daily reporting exports.
  - BigQuery Free Tier (exporting raw GA4 daily event tables).
  - Chrome DevTools Network Tab / Google Analytics Debugger Chrome Extension.

## F. Core Concepts and Decision Principles
1. **The Event-Driven Model (GA4 vs Universal Analytics)**:
   - Universal Analytics (deprecated) was built on pageviews and sessions.
   - GA4 is built entirely on **events and event parameters**. Every interaction—a pageview, a scroll past 90%, an outbound link click, a video play, a form submission—is an autonomous event.
   - For SEO, this allows granular tracking of which specific paragraph, heading, or in-content link drove a conversion.
2. **Engagement Rate vs. Legacy Bounce Rate**:
   - In Universal Analytics, a "bounce" occurred if a user visited one page and left without clicking a second page, even if they spent 20 minutes reading an exhaustive 5,000-word technical guide and copied the code.
   - In GA4, an **Engaged Session** is defined as any session that meets at least ONE of the following criteria:
     1. Lasts longer than **10 seconds** (can be adjusted to 30s).
     2. Results in **2 or more pageviews**.
     3. Triggers at least **1 key conversion event**.
   - **Engagement Rate** = $\frac{\text{Engaged Sessions}}{\text{Total Sessions}} \times 100$. A healthy organic content benchmark is $\ge 65\% - 75\%$.
3. **The GSC Clicks vs. GA4 Sessions Discrepancy**:
   - GSC Clicks and GA4 Sessions will **never match 100%**:
     - *Clicks > Sessions*: A user clicks the search snippet, but closes the browser before the GA4 tracking JavaScript loads, or blocks tracking via ad-blocker.
     - *Sessions > Clicks*: A user clicks once from Google, then returns via bookmark or shares the URL with 3 colleagues on Slack (who browse in the same organic attribution session).
   - A variance of **$10\% - 15\%$** between GSC Clicks and GA4 Organic Sessions is normal and statistically expected.

## G. Operational Workflow

```
[Deploy GTM Container with GA4 Configuration Tag] -> [Link GSC Property in GA4 Admin]
                       |                                              |
                       v                                              v
      [Define Custom Conversion Key Events] -> [Build Exploration Report by Landing Page]
                       |                                              |
                       v                                              v
    [Isolate Organic Channel Engagement Rates] -> [Automate BigQuery Daily Event Export]
```

### Step 1: Link Google Search Console to GA4
1. In GA4 Admin > Product Links > **Search Console Links**.
2. Click **Link** and select your verified Domain GSC property.
3. Select your web data stream.
4. Navigate to **Reports > Library** > Find the un-published "Search Console" collection and click **Publish**.
5. This unlocks the native "Google Organic Search Queries" and "Google Organic Search Traffic" reports directly inside your GA4 left navigation.

### Step 2: Configure Custom SEO Content Grouping
Create a custom parameter to evaluate organic performance by content taxonomy:
1. In Google Tag Manager, configure a Lookup Table or regex variable reading `Page Path`:
   - `/blog/.*` -> `Editorial Blog`
   - `/solutions/.*` -> `Commercial Solutions`
   - `/docs/.*` -> `Technical Documentation`
2. Pass this parameter into GA4 as `content_group`.

### Step 3: Automated GA4 Data API Extraction (Python)
Extract landing page performance, engagement rates, and key events:
```python
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import DateRange, Dimension, Metric, RunReportRequest
import pandas as pd

client = BetaAnalyticsDataClient()
PROPERTY_ID = "YOUR_GA4_PROPERTY_ID"

request = RunReportRequest(
    property=f"properties/{PROPERTY_ID}",
    dimensions=[Dimension(name="landingPagePlusQueryString")],
    metrics=[
        Metric(name="sessions"),
        Metric(name="engagedSessions"),
        Metric(name="engagementRate"),
        Metric(name="conversions"),
        Metric(name="totalRevenue")
    ],
    date_ranges=[DateRange(start_date="30daysAgo", end_date="today")],
    dimension_filter={
        "filter": {
            "fieldName": "sessionDefaultChannelGroup",
            "stringFilter": {"value": "Organic Search"}
        }
    }
)

response = client.run_report(request)

data = [{
    'landing_page': row.dimension_values[0].value,
    'sessions': int(row.metric_values[0].value),
    'engaged_sessions': int(row.metric_values[1].value),
    'engagement_rate': float(row.metric_values[2].value),
    'conversions': int(row.metric_values[3].value),
    'revenue': float(row.metric_values[4].value)
} for row in response.rows]

df_ga4 = pd.DataFrame(data)
print("Top 10 Organic Landing Pages by Conversion:\n", df_ga4.sort_values('conversions', ascending=False).head(10))
```

### Step 4: Build a Custom Exploration for Content ROI
1. In GA4, navigate to **Explore > Free-form exploration**.
2. Set Dimensions: `Landing page + query string`, `Session source / medium`.
3. Set Metrics: `Sessions`, `Engaged sessions`, `Engagement rate`, `Average session duration`, `Conversions`.
4. Apply Filter: `Session default channel group` exactly matches `Organic Search`.
5. Identify pages with **high organic sessions but low engagement rates ($< 45\%$)**; these pages have severe readability, speed, or intent mismatch issues requiring immediate intervention.

### Step 5: Enable BigQuery Raw Data Streaming
1. In GA4 Admin > Product Links > **BigQuery Links**.
2. Connect your Google Cloud Project.
3. Enable **Daily Export** and **Streaming Export** (free within BigQuery sandbox limits).
4. This ensures your business owns 100% of its raw, un-sampled, un-aggregated event-level search data permanently, immune to GA4 data retention limits (which delete free user data after 14 months).

## H. Analysis and Decision Framework
Use this framework to diagnose organic landing page performance:

```
                  [Auditing Organic Landing Page in GA4]
                                     |
                  Is Engagement Rate >= 65% on Mobile?
                             /              \
                          [Yes]             [No]
                           /                  \
             Does page achieve target         (High Friction: Check mobile
             conversion rate (>= 2%)?          LCP speed, intrusive popups,
                    /          \               or misaligned search intent)
                 [Yes]         [No]
                  /              \
         (OPTIMAL: Scaling     (High reader engagement, but low
          candidate; build      conversion: Optimize in-content CTAs,
          internal links)       lead magnets, or pricing clarity)
```

## I. Prioritization Framework
Score pages for on-page CRO intervention using the **Conversion Deficit Score (CDS)**:

$$\text{CDS} = \text{Monthly Organic Sessions} \times (\text{Average Site Conversion Rate (2.5\%)} - \text{Actual Page Conversion Rate})$$

Focus on high-traffic organic articles generating thousands of sessions but zero leads.

## J. Deliverables & Specifications
Deliver a **GA4 Organic Performance Specification & Audit**:
1. `property_id`: Active GA4 property.
2. `search_console_link_status`: Active and published in Library.
3. `organic_traffic_metrics`: 30-day Sessions, Engaged Sessions, Engagement Rate.
4. `organic_conversions_breakdown`: Count and monetary value by key event.
5. `underperforming_landing_pages`: URLs with high traffic and low engagement.
6. `bigquery_export_status`: Active daily export configuration.

## K. Quality Assurance Checklist
- [ ] GSC property linked and published in GA4 Reports Library.
- [ ] Internal employee and office IP addresses excluded via Developer Traffic filters.
- [ ] Session timeout extended from default 10 seconds to 30 seconds for deep technical content.
- [ ] Key conversion events (`generate_lead`, `purchase`) verified with Google Tag Assistant.
- [ ] Data retention setting updated from default 2 months to the maximum **14 months** in Admin > Data Retention.

## L. Failure Modes and Anti-Patterns
- **Leaving Default 2-Month Retention**: Failing to change the default GA4 setting, causing all historical exploration data older than 60 days to be permanently deleted.
- **Counting Pageviews as Conversions**: Setting a standard thank-you pageview or generic button click as a primary key event, inflating reported conversions by 500% with zero revenue.
- **The Consent Banner Data Drop**: Failing to implement Google Consent Mode v2 in the EU, resulting in a sudden 40% apparent drop in organic sessions when tracking is blocked by consent banners.

## M. AI-Agent Operating Instructions
1. An AI agent must parse GA4 Data API responses using dataframes, isolating `Organic Search` default channel groups explicitly.
2. Check that the `data_retention` setting is verified at 14 months before conducting historical comparisons.
3. Calculate Engagement Rate mathematically rather than relying on legacy Universal Analytics bounce rate formulas.

## N. Success Metrics & Verification Windows
- **Engagement Elevation**: Organic landing page engagement rate increases to $\ge 70\%$ within 30 days of readability and speed fixes.
- **Organic Pipeline Attribution**: Tracked organic conversions generate verified pipeline opportunities in CRM reporting within 60 days.

## O. Related Skills
- **Pre-Click Data**: [Search Console](../Search%20Console/SKILL.md)
- **Conversion Optimization**: [Conversion Optimization](../../Growth/Conversion%20Optimization/SKILL.md), [Lead Generation](../../Growth/Lead%20Generation/SKILL.md)
- **Executive Reporting**: [SEO Reporting](../SEO%20Reporting/SKILL.md)

## P. Authoritative References
- [Google Analytics 4 Help Center: Engagement Rate and Engaged Sessions](https://support.google.com/analytics/answer/11109416) — Official definitions of GA4 behavioral metrics.
- [Google Analytics Data API (GA4) Reference](https://developers.google.com/analytics/devguides/reporting/data/v1) — Technical API dimensions, metrics, and filtering syntax.

## Q. Maintenance and Review Cycle
- **Monthly GA4 Data Audit**: Review custom conversion events and channel grouping definitions monthly to ensure tracking hasn't broken during frontend code releases.
