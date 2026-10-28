---
name: seo-reporting
description: Executive performance dashboard synthesis, MoM/YoY trend modeling, non-branded search revenue attribution, and stakeholder communication.
metadata:
  category: Analytics
  discipline: Business Intelligence
  version: "1.0.0"
---

# SEO Reporting & Executive Intelligence

## A. Purpose
The SEO Reporting skill establishes the operational framework for synthesizing complex technical, ranking, traffic, and conversion data into actionable, executive-grade business intelligence. Technical SEO metrics (such as crawl errors, canonical tags, or keyword difficulty) are meaningless to C-suite stakeholders unless they are directly translated into **commercial impact**: qualified pipeline, customer acquisition cost (CAC) reduction, and net revenue growth. This skill provides an auditable methodology to automate multi-source data extraction (GSC, GA4, CRM), isolate genuine non-branded search performance, model Year-over-Year (YoY) trajectories, and deliver clear, decision-focused executive reports.

## B. Trigger Conditions
Invoke this skill when:
1. Delivering weekly, monthly, or quarterly SEO performance reports to executives, clients, or board members.
2. Defending or pitching organic marketing budgets, engineering sprint allocations, or headcount expansion.
3. Conducting post-mortem impact assessments following a major site migration, core algorithm update, or redesign.
4. Synthesizing disparate search data into automated, real-time Looker Studio executive dashboards.

Upstream dependencies: [Search Console](../Search%20Console/SKILL.md), [Google Analytics](../Google%20Analytics/SKILL.md), and [Revenue Growth](../../Growth/Revenue%20Growth/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - Blending pre-click search demand (GSC) with post-click behavioral conversion metrics (GA4) and pipeline revenue (CRM/Stripe).
  - Normalizing time-series comparisons: Month-over-Month (MoM), Year-over-Year (YoY), and rolling 90-day baselines.
  - Non-branded vs. Branded search isolation (eliminating brand equity distortion).
  - Executive narrative structure: Key Wins, Commercial Impact, Strategic Bottlenecks, and Next 30-Day Priorities.
  - Designing automated, client-facing Looker Studio / BigQuery reporting dashboards.
- **Out-of-Scope**:
  - Debugging raw JavaScript analytics tracking tags (Handled by [Google Analytics](../Google%20Analytics/SKILL.md)).
  - Executing individual on-page edits (Handled by [Title](../../On-page%20SEO/Title/SKILL.md) and [Headings Optimization](../../On-page%20SEO/Headings%20Optimization/SKILL.md)).
  - General financial accounting and tax reporting.

## D. Required Inputs
1. **Google Search Console Performance Export**: Clicks, impressions, CTR, position (filtered for non-branded queries).
2. **Google Analytics 4 Organic Channel Data**: Sessions, engaged sessions, key conversion events, and attributed revenue.
3. **CRM / Pipeline Data (Salesforce, HubSpot, Stripe)**: Marketing Qualified Leads (MQLs), Sales Qualified Leads (SQLs), Closed-Won revenue originating from organic search.
4. **Historical Calendar of SEO Deployments**: Exact dates of published content, technical migrations, and link-building campaigns.

## E. Required Tools and Data Sources
- **Visualization Platforms**: Google Looker Studio (formerly Data Studio), Tableau, Power BI.
- **Data Warehousing & Scripting**: BigQuery, Python (`pandas`, `matplotlib`, `seaborn`) for statistical visualization.
- **Data Connectors**: Supermetrics, Funnel.io, or native Google Search Console / GA4 BigQuery connectors.

## F. Core Concepts and Decision Principles
1. **The Executive Value Hierarchy**:
   Executives do not make budget decisions based on average ranking position or crawl budget. Reports must follow the **3-Tier Commercial Hierarchy**:
   - **Tier 1 (Executive C-Suite)**: Revenue generated, pipeline created, CAC reduction, Organic Share of Voice (SOV).
   - **Tier 2 (Marketing Leadership)**: Non-branded organic clicks, conversion rates, striking distance opportunities, top converting landing pages.
   - **Tier 3 (SEO Engineering / Practitioners)**: Crawl stats, indexed URLs, Core Web Vitals, backlink counts, technical errors.
   *Rule*: Never present Tier 3 data to Tier 1 executives without directly connecting it to Tier 1 business outcomes.
2. **YoY vs. MoM Comparison Standards**:
   - Month-over-Month (MoM) comparisons are heavily distorted by seasonal fluctuations (e.g. comparing February's 28 days to March's 31 days, or comparing December holiday retail to January).
   - **Year-over-Year (YoY)** is the industry standard for evaluating genuine structural search growth, as it naturally controls for seasonality.
3. **Isolating the "Brand Halo" Effect**:
   - A report showing "50% Organic Growth" is deceptive if 45% of that growth came from people searching for your company name after an expensive Super Bowl ad or viral PR stunt.
   - Genuine SEO performance **must isolate Non-Branded Organic Traffic**: queries where the user was looking for a solution, not your specific company name.

## G. Operational Workflow

```
[Extract Non-Branded GSC & GA4 Organic Data] -> [Join with CRM Conversion Pipeline & Revenue]
                       |                                              |
                       v                                              v
      [Calculate YoY Trajectories & Net Lift] -> [Structure 4-Part Executive Summary]
                       |                                              |
                       v                                              v
      [Draft 30-Day Forward-Looking Priorities] -> [Publish Automated Looker Studio Dashboard]
```

### Step 1: Data Harmonization & Channel Isolation (Python)
Blend GSC non-branded search demand with GA4 organic landing page conversions:
```python
import pandas as pd

# Load normalized monthly exports
df_gsc = pd.read_csv('gsc_monthly_nonbrand.csv')
df_ga4 = pd.read_csv('ga4_monthly_organic.csv')
df_crm = pd.read_csv('crm_monthly_organic_leads.csv')

# Merge on Date (Month)
df_report = df_gsc.merge(df_ga4, on='month').merge(df_crm, on='month')

# Compute Commercial KPIs
df_report['lead_conversion_rate'] = (df_report['mql_leads'] / df_report['sessions']) * 100
df_report['pipeline_per_session'] = df_report['pipeline_revenue'] / df_report['sessions']

# Calculate Year-over-Year Growth Rate
df_report['yoy_click_growth'] = df_report['nonbrand_clicks'].pct_change(periods=12) * 100
df_report['yoy_pipeline_growth'] = df_report['pipeline_revenue'].pct_change(periods=12) * 100

print(df_report[['month', 'nonbrand_clicks', 'yoy_click_growth', 'pipeline_revenue', 'yoy_pipeline_growth']].tail(3))
```

### Step 2: The 4-Part Executive Report Structure
Format executive summaries into four crisp, structured blocks:

1. **Executive Scorecard (The High-Level Numbers)**:
   - Total Non-Branded Organic Clicks: `45,200 (+28% YoY)`
   - Organic Pipeline Generated: `$342,000 (+41% YoY)`
   - Closed-Won Organic Revenue: `$118,500 (+35% YoY)`
   - Blended CAC from Organic: `$142 (vs $480 Paid Search CAC)`

2. **Key Strategic Wins (What Moved the Needle)**:
   - *Example*: "Published the 2026 PostgreSQL Benchmark Report, which captured 14 Tier-1 backlinks and advanced the core product page from Position 8 to Position 2, unlocking 4,200 incremental high-intent monthly clicks."

3. **Critical Bottlenecks & Risk Analysis**:
   - *Example*: "Google's rollout of AI Overviews on comparison queries reduced desktop CTR on 3 high-volume guides by 2.1%. Remediation plan: Deploying direct-answer tabular comparison schema to capture the primary AI citation."

4. **Next 30-Day Engineering & Editorial Priorities**:
   - Exactly 3 priority initiatives with assigned ownership, expected deployment dates, and target business impact.

### Step 3: Looker Studio Dashboard Architecture
Design an interactive executive dashboard containing 3 clean pages:
- **Page 1: Executive C-Suite Dashboard**: Big number scorecards (Revenue, Leads, Non-Brand Clicks), YoY trend line, Top 5 Revenue-Generating Landing Pages.
- **Page 2: Content Marketing Performance**: Clicks by Content Group (`/blog/` vs `/solutions/`), Top 20 Striking Distance Keywords (Pos 4-15), Engagement Rate by Topic.
- **Page 3: Technical Health & Indexation**: Core Web Vitals pass rates (mobile/desktop), Indexing status distribution, 404 crawl error count over time.

### Step 4: Visualizing the Correlation Between SEO Sprints and Pipeline
Always annotate performance graphs with markers indicating major SEO deployments:
- `[Jan 15]`: Launched 20 new integration guides.
- `[Feb 10]`: Completed site speed overhaul (LCP improved from 4.2s to 1.8s).
- `[Mar 01]`: Published benchmark study (earned 25 backlinks).
*This visually demonstrates the causal relationship between SEO engineering investments and subsequent traffic/revenue inflections.*

## H. Analysis and Decision Framework
Use this framework to communicate performance shifts:

```
                  [Monthly Organic Revenue Dropped]
                                  |
                 Did non-branded search clicks drop?
                             /          \
                          [Yes]         [No]
                           /              \
             Did rankings fall or did     (Traffic is stable; problem is
             market search demand drop?    on-site conversion rate: Check
                    /          \           pricing page changes, broken forms,
        [Rankings Fell]     [Demand Dropped] or lower lead qualification)
              /                    \
       (Technical / Content   (Seasonal industry contraction;
        remediation sprint)    demonstrate YoY stability)
```

## I. Prioritization Framework
When deciding which data points to feature in an executive deck, score metrics using the **Stakeholder Relevancy Index (SRI)**:

$$\text{SRI} = \text{Financial Proximity (1-10)} \times \text{Actionability (1-5)}$$

- *Revenue Generated*: Financial Proximity 10, Actionability 5 -> **Feature prominently on Slide 1**.
- *Total Crawled URLs*: Financial Proximity 1, Actionability 2 -> **Relegate to technical appendix**.

## J. Deliverables & Specifications
Deliver an **Executive SEO Monthly Intelligence Pack**:
1. `reporting_period`: Exact calendar month and YoY comparative period.
2. `executive_scorecard_table`: Non-brand clicks, sessions, leads, pipeline, closed revenue.
3. `yoy_growth_percentages`: Quantified percentage lifts across core metrics.
4. `top_10_revenue_pages`: Landing pages ranked by pipeline creation.
5. `annotated_timeline_graph`: Performance chart with sprint deployment markers.
6. `forward_roadmap`: 3 prioritized strategic initiatives for the next month.

## K. Quality Assurance Checklist
- [ ] Branded search queries 100% separated from non-branded demand in all charts.
- [ ] Year-over-Year (YoY) comparisons used to control for seasonality.
- [ ] Revenue numbers reconciled against official CRM / Stripe financial data.
- [ ] Report focuses on business outcomes (Leads, Pipeline, Revenue), not vanity rankings.
- [ ] Next 30-day priorities have clear deliverables, owners, and expected impact.

## L. Failure Modes and Anti-Patterns
- **The "100-Page PDF Dump"**: Exporting raw, uncurated tables from an SEO tool and emailing a 120-page PDF to the CEO. Nobody will read it, and it signals a complete lack of business acumen.
- **Reporting Total Impressions as Success**: Celebrating "We generated 2 million impressions this month!" when organic clicks and revenue both declined. Impressions do not pay salaries.
- **Hiding Negative Trends**: Glossing over a 20% traffic drop caused by an algorithm update. Executives respect honest, diagnostic assessments paired with a clear, aggressive remediation plan.

## M. AI-Agent Operating Instructions
1. An AI agent must calculate mathematical percentage changes using consistent formulas (`(New - Old) / Old * 100`).
2. Filter out branded query variants automatically before generating SEO growth summaries.
3. Structure summaries using the 4-part executive format: Scorecard, Wins, Bottlenecks, and 30-Day Priorities.

## N. Success Metrics & Verification Windows
- **Stakeholder Alignment**: Executive approval of proposed SEO engineering roadmaps and resource allocations within 14 days of report delivery.
- **Revenue Attribution**: Organic search maintains a clear, auditable contribution to total corporate ARR / pipeline in monthly executive reporting.

## O. Related Skills
- **Data Foundations**: [Search Console](../Search%20Console/SKILL.md), [Google Analytics](../Google%20Analytics/SKILL.md)
- **Commercial Growth**: [Revenue Growth](../../Growth/Revenue%20Growth/SKILL.md), [SEO Scaling](../../Growth/SEO%20Scaling/SKILL.md)
- **Tactic Testing**: [150+ SEO Hacks](../../SEO%20Wins/150%2B%20SEO%20Hacks/SKILL.md)

## P. Authoritative References
- [Google Search Central: SEO Fundamentals - Measuring Success](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) — Principles of organic search tracking and performance measurement.
- [Avinash Kaushik: Digital Marketing and Measurement Model](https://www.kaushik.net/avinash/digital-marketing-analytics/) — Foundational framework for connecting marketing metrics to commercial business objectives.

## Q. Maintenance and Review Cycle
- **Monthly Cadence**: Deliver the executive report on the 5th business day of each month, allowing for full GSC and GA4 data processing maturity.
