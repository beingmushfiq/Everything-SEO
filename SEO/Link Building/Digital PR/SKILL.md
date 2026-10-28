---
name: seo-digital-pr
description: Data-driven digital public relations, newsworthy study engineering, journalist relationship building, and high-authority editorial link acquisition.
metadata:
  category: Link Building
  discipline: Authority Engineering
  version: "1.0.0"
---

# Digital PR

## A. Purpose
The Digital PR skill governs the conceptualization, execution, and media outreach of data-driven public relations campaigns designed to earn editorial backlinks from Tier-1 news publications, national media outlets, and major industry journals. Rather than relying on transactional, low-quality link building schemes (which violate Google’s Spam Policies), Digital PR produces genuine newsworthy assets—such as proprietary industry studies, interactive data visualizations, FOIA data analyses, and survey reports—that journalists naturally cite as authoritative primary sources. This skill builds brand equity, drives referral traffic, and secures high-authority domain trust.

## B. Trigger Conditions
Invoke this skill when:
1. Building domain authority (DA / DR) for a new or stagnant website competing against entrenched industry giants.
2. Launching original industry research, proprietary customer survey data, or annual benchmark reports.
3. Establishing executive thought leadership and brand entity recognition in the Google Knowledge Graph.
4. Elevating a brand's authority footprint to satisfy Google’s E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) criteria.

Upstream dependencies: [Linkable Assets](../Linkable%20Assets/SKILL.md) and [Entity Optimization](../../AI%20SEO/Entity%20Optimization/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - Newsjacking and seasonal pitch ideation based on media agendas.
  - Proprietary dataset curation, survey methodology, and data analysis.
  - Media list building, journalist vetting, and beat qualification (Muck Rack, Cision, Twitter/X).
  - Writing personalized, high-converting journalist email pitches.
  - Managing press release embargoes and media exclusives.
- **Out-of-Scope**:
  - Buying paid sponsored links (Handled by paid media; dangerous for SEO).
  - Traditional offline broadcast PR (television/radio without web hyperlinks).
  - Automated cold-email spam blasting (strictly prohibited by Digital PR standards).

## D. Required Inputs
1. **Core Campaign Theme**: An angle that intersects your industry expertise with broader cultural, economic, or technological news trends.
2. **Proprietary Data Source**: An original dataset (internal platform usage data, public government datasets, or a statistically valid survey of $\ge 1,000$ respondents).
3. **Target Media Verticals**: Specific categories of journalists (e.g., Tech Reporters, B2B SaaS Columnists, Personal Finance Editors).
4. **Dedicated Landing Page Asset**: A clean, published URL on your domain housing the full methodology, raw data tables, and high-resolution charts.

## E. Required Tools and Data Sources
- **Commercial Tooling**: Muck Rack, Cision, BuzzSumo (identifying journalists who cover specific beats), Hunter.io / Voila Norbert (email verification).
- **Zero-Cost / Open Source Alternatives**:
  - Google News advanced search (`site:techcrunch.com "database"`) to find active reporters.
  - Twitter / X advanced search (`#journorequest`, `looking to speak with`).
  - Google Public Data Explorer / data.gov / Kaggle (sourcing open-access datasets).
  - Python scripts (`pandas`, `matplotlib`, `seaborn`) to clean data and generate statistical charts.

## F. Core Concepts and Decision Principles
1. **The Journalist Value Proposition**:
   - Journalists do not care about your company, your product, or your software features. They care about:
     1. An interesting, unexpected, or controversial **story hook**.
     2. Hard, credible **statistical evidence** that proves the hook.
     3. An articulate expert quote they can paste directly into their article before deadline.
   - If your pitch sounds like a sales brochure, it will be deleted within 3 seconds.
2. **The "Exclusive" Strategy vs. Embargo**:
   - *The Exclusive*: Offering the story to a single top-tier publication (e.g., *Forbes*, *TechCrunch*, or *Bloomberg*) 72 hours before anyone else. This dramatically increases the probability of Tier-1 coverage.
   - *The Wide Pitch*: Once the exclusive goes live, immediately pitch the remaining 150 vertical and regional publications with a personalized angle referencing the breaking story.
3. **Earning Links vs. Unlinked Mentions**:
   - The primary goal of Digital PR is to secure an **editorial dofollow hyperlink** back to your research landing page as the attribution source for the data.
   - If a journalist quotes the study but omits the link, execute [Unlinked Brand Mentions](../Unlinked%20Brand%20Mentions/SKILL.md) to politely request attribution.

## G. Operational Workflow

```
[Ideate Hook via News Agenda & Trends] -> [Analyze & Clean Proprietary Dataset]
                   |                                       |
                   v                                       v
    [Build Research Landing Page Asset] -> [Curate Vetted 100-Person Media List]
                   |                                       |
                   v                                       v
   [Pitch Tier-1 Exclusive (72h Gate)] -> [Execute Wide Personalized Outreach]
```

### Step 1: Campaign Hook Ideation
Brainstorm angles using the **3 Newsworthy Frameworks**:
1. **The Counter-Intuitive Truth**: Data that disproves a common industry myth (e.g., `Data Study: 74% of Enterprise AI Implementations Cost More Than Traditional Cloud Infrastructure`).
2. **The Geographic / Demographic Index**: Ranking cities, states, or countries on a timely metric (e.g., `The 2026 Remote Work Index: Which States Have the Most Exhausted Engineers?`).
3. **The Microeconomic Reality**: Quantifying hidden costs or consumer habits (e.g., `Average SaaS Tool Bloat: Companies Spend $4,200/Year Per Employee on Unopened Software`).

### Step 2: Data Curation & Statistical Validation
1. If running a consumer survey: Ensure a sample size of at least **$N = 1,000$** respondents, balanced for age and geography, with a documented margin of error ($< \pm 3.1\%$).
2. If analyzing public/platform data: Clean the raw CSV using Python, calculate standard deviations and medians, and remove anomalous outliers.
3. Generate 3 to 5 clean, publication-ready data charts in SVG/WebP format with clear attribution watermarks.

### Step 3: Build the On-Site Research Hub Page
Publish the full report at a clean URL (e.g., `/research/saas-waste-report-2026/`):
- Include an executive summary bullet list at the top.
- Embed all interactive charts, raw data tables, and methodology notes.
- Provide a downloadable press pack (high-res images, charts, and executive headshots).

### Step 4: Journalist Media List Curation
1. Search Muck Rack or Google News for journalists who have written articles about this exact topic in the last **90 days**.
2. **Never buy bulk generic PR media lists**. Curate a targeted list of **50 to 150 individual human journalists**:
   - Journalist Name.
   - Outlet Name.
   - Verified Direct Email.
   - Title of their most recent relevant article.
   - The specific angle of their past reporting.

### Step 5: The Short-Form Journalist Pitch
Draft a concise, high-converting pitch (under **200 words**):
```
Subject: Data: 74% of enterprise AI projects cost more than cloud servers [New Study]

Hi [First Name],

I enjoyed your recent TechCrunch piece on infrastructure cost overruns at [Company Name].

Our engineering team just finalized a benchmark study analyzing 450 enterprise AI workloads across AWS and Azure, and the findings surprised us:

• 74% of AI production workloads now cost 3.2x more than equivalent traditional cloud microservices.
• 58% of CIOs surveyed cite unexpected token inference bandwidth as their primary budget leak.
• Full interactive data and methodology: https://example.com/research/ai-infrastructure-costs-2026/

Would you be interested in an exclusive on this data, or a quick quote from our Principal Cloud Architect on why inference costs are spiking?

Best regards,

[Your Name]
[Title, Company]
```

## H. Analysis and Decision Framework
Use this framework to evaluate campaign viability:

```
                  [Digital PR Campaign Concept]
                                |
                 Does the story contain hard, original data
                       never published anywhere else?
                             /          \
                          [Yes]         [No]
                           /              \
             Does it connect to an        (REJECT: Fluff pitch;
             active news cycle / trend?    journalists will ignore)
                    /          \
                 [Yes]         [No]
                  /              \
         (Greenlight Campaign;   (Archive until a relevant
          draft methodology)      news trigger occurs)
```

## I. Prioritization Framework
Score media outreach targets using the **Journalist Receptivity Score (JRS)**:

$$\text{JRS} = \text{Domain Authority of Outlet (1-100)} \times \text{Beat Specificity (1-5)} \times \text{Past Citation Recency (1-3)}$$

Pitch the top 10 journalists exclusively before initiating broader distribution.

## J. Deliverables & Specifications
Deliver a **Digital PR Campaign Pack**:
1. `campaign_hook`: 1-sentence newsworthy headline.
2. `landing_page_url`: Published research hub.
3. `media_list`: Vetted CSV of 75-150 journalists with emails and beats.
4. `pitch_template`: Customized 180-word email pitch.
5. `exclusive_pitch_date`: Scheduled date for Tier-1 exclusive outreach.
6. `wide_pitch_date`: Scheduled date for general vertical outreach.

## K. Quality Assurance Checklist
- [ ] Survey or data methodology is fully documented on the landing page (sample size, dates, margins of error).
- [ ] Pitch is $< 200$ words and contains zero marketing buzzwords (`revolutionary`, `game-changing`).
- [ ] Every email address verified as deliverable (zero bounce risk).
- [ ] Landing page contains high-resolution embeddable charts with clear attribution back to your domain.
- [ ] Follow-ups are limited to a maximum of **1 polite follow-up** 3 to 4 days later (never harass journalists).

## L. Failure Modes and Anti-Patterns
- **The "Corporate Product Pitch" Disaster**: Sending a press release announcing "Company X Launches Feature Y" to 500 journalists. This is not news; it is corporate spam that burns your domain reputation.
- **The Bogus Survey**: Surveying 40 company employees and marketing it as "National Study Finds 100% of Workers Want Our Tool". Reputable journalists will verify the methodology and blacklist your brand.
- **The Broken Landing Page**: Pitching a study before the landing page is live, or publishing a page that takes 8 seconds to load on mobile.

## M. AI-Agent Operating Instructions
1. An AI agent must parse journalist articles to identify their specific past coverage before drafting personalized pitch hooks.
2. Never send automated emails without human PR director review and authorization.
3. Strictly enforce word count limits ($\le 200$ words) on all generated pitch copy.

## N. Success Metrics & Verification Windows
- **Tier-1 Link Acquisition**: Campaign earns 10 to 35 high-authority editorial backlinks (DR $\ge 60$) within 45 days.
- **Brand Footprint Expansion**: Unlinked brand mentions increase by $\ge 50$ across trade publications.

## O. Related Skills
- **Upstream Asset**: [Linkable Assets](../Linkable%20Assets/SKILL.md)
- **Reclamation**: [Unlinked Brand Mentions](../Unlinked%20Brand%20Mentions/SKILL.md)
- **Authority Signals**: [Entity Optimization](../../AI%20SEO/Entity%20Optimization/SKILL.md)

## P. Authoritative References
- [Google Search Central: Link Schemes and Spam Policies](https://developers.google.com/search/docs/essentials/spam-policies#link-schemes) — Clear boundaries on paid links vs. earned editorial citations.
- [Pew Research Center: Best Practices for Survey Research](https://www.pewresearch.org/our-methods/) — Statistical standards for credible, publishable public survey data.

## Q. Maintenance and Review Cycle
- **Post-Campaign Retrospective**: Conduct an outreach audit 30 days after campaign close to analyze open rates, response rates, and acquired referring domains to refine future pitch angles.
