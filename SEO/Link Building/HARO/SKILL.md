---
name: seo-haro
description: Source-request PR platforms, journalist query triage (Connectively, Featured, Qwoted), rapid expert quote drafting, and high-DR backlink acquisition.
metadata:
  category: Link Building
  discipline: Authority Engineering
  version: "1.0.0"
---

# Journalist Source Inquiries (HARO / Connectively & Modern PR Platforms)

## A. Purpose
The Journalist Source Inquiries skill governs the monitoring, filtering, rapid drafting, and submission of expert commentary in response to inbound media requests from journalists, authors, and industry analysts. Historically anchored by Help A Reporter Out (HARO)—which transitioned to Cision’s **Connectively** platform—and complemented by modern platforms like **Featured (formerly Terkel)**, **Qwoted**, and **Help a B2B Writer**, this methodology allows companies to earn Tier-1 and Tier-2 editorial backlinks and brand mentions by directly answering journalists who are actively seeking expert quotes for imminent publication deadlines.

## B. Trigger Conditions
Invoke this skill when:
1. Building high-authority referring domain profiles (DR 60-90+) for a domain with an established founder or technical spokesperson.
2. Generating a consistent stream of 2 to 5 high-authority backlinks per week with low engineering overhead.
3. Establishing executive E-E-A-T credentials and personal branding for key company leadership.
4. Capitalizing on breaking news trends where reporters require immediate operational commentary.

Upstream dependencies: [Entity Optimization](../../AI%20SEO/Entity%20Optimization/SKILL.md) and [Digital PR](../Digital%20PR/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - Monitoring multi-platform journalist query feeds: Connectively (HARO successor), Featured.com, Qwoted, Help a B2B Writer, and SourceBottle.
  - Triage criteria: Vetting media outlets for Domain Rating, link policies (dofollow vs nofollow vs unlinked), and topical relevance.
  - Rapid-response quote engineering (answering within 60 minutes with publication-ready copy).
  - Spokesperson credentialing and bio packaging.
  - Following up on published articles to verify and claim editorial backlinks.
- **Out-of-Scope**:
  - Outbound cold pitching of unrequested stories (Handled by [Digital PR](../Digital%20PR/SKILL.md)).
  - Writing full guest blog articles (Handled by [Guest Posting](../Guest%20Posting/SKILL.md)).
  - Paid sponsored contributor programs (e.g. Forbes Councils pay-to-play memberships).

## D. Required Inputs
1. **Designated Spokesperson Credentials**: Name, executive title, high-resolution headshot URL, LinkedIn profile, and verified areas of expertise.
2. **Core Domain Canonical URL**: Preferred destination homepage and author bio page.
3. **Platform Accounts**: Active profiles on Connectively, Featured, Qwoted, and Help a B2B Writer.
4. **Keyword Filter Criteria**: Specific technical or business keywords to match incoming queries (e.g., `cloud`, `database`, `saas`, `cybersecurity`, `seo`).

## E. Required Tools and Data Sources
- **Source Request Platforms**:
  - **Connectively** (formerly HARO): General business, tech, and lifestyle media queries.
  - **Featured.com**: High-volume, structured expert Q&A format.
  - **Qwoted**: Vetted PR network with direct messaging to verified journalists.
  - **Help a B2B Writer**: Specifically targeted toward enterprise B2B SaaS and technology blogs.
- **Commercial Tooling**: Ahrefs Batch Analysis (quickly checking DR of pitching outlets).
- **Zero-Cost / Open Source Alternatives**:
  - Email automation rules / filters (Gmail filters routing query emails to dedicated triage folders).
  - Twitter / X search monitoring: `#journorequest`, `#prrequest`.

## F. Core Concepts and Decision Principles
1. **The Modern Platform Landscape (Post-HARO Era)**:
   - In 2024, Cision officially retired the legacy HARO email listserv model and migrated operations to **Connectively**.
   - Concurrently, **Featured.com** and **Qwoted** emerged as dominant platforms for B2B technology and business thought leadership.
   - Relying solely on old HARO email lists is an obsolete practice; practitioners must operate across the modern multi-platform source ecosystem.
2. **The "Copy-Paste Ready" Rule**:
   - Journalists receive between 50 and 200 pitches for every single query. They do not have time to interview you, schedule a Zoom call, or edit clumsy prose.
   - The winning pitch provides a **tight, articulate, 75-120 word quote** that the journalist can directly copy and paste into their CMS without editing a single word.
3. **Speed to Pitch (The 60-Minute Rule)**:
   - For high-DR publications (e.g., *Fast Company*, *Inc.*, *Business Insider*), reporters often stop reading submissions after receiving their first 15 viable responses.
   - Responding within **60 minutes** of a query being posted increases acceptance rates by $>300\%$ compared to submitting right at the deadline.

## G. Operational Workflow

```
[Ingest Multi-Platform Feeds (Connectively/Featured/Qwoted)] -> [Execute Keyword & DR Filter]
                            |                                                   |
                            v                                                   v
          [Select High-Probability Query Match] -> [Draft Copy-Paste Quote (<150 Words)]
                            |                                                   |
                            v                                                   v
           [Submit within 60 Min with Headshot/Bio] -> [Monitor Publication & Verify Link]
```

### Step 1: Automated Query Filtering
Set up email filters or platform notification webhooks to parse incoming batches for target keywords:
```
# Sample Gmail filter for incoming source request batches
from:(connectively.us OR featured.com OR helpab2bwriter.com)
("kubernetes" OR "database" OR "cloud" OR "cybersecurity" OR "b2b saas")
```

### Step 2: Query Qualification & Outlet Vetting
Before drafting a response, run the query through the **5-Point Vetting Filter**:
1. **Outlet Domain Authority**: Is the media outlet $\text{DR} \ge 50$? (Discard queries from unknown scraper blogs).
2. **Link Policy**: Does the publication provide editorial backlinks to sources, or do they have a strict "no external link" policy?
3. **Relevance**: Does the question align with the spokesperson's genuine expertise? (Answering questions outside your vertical damages domain topical authority).
4. **Deadline Proximity**: Is there still time to submit before the journalist's deadline?

### Step 3: The 3-Part Winning Pitch Anatomy
Format the response cleanly into 3 distinct sections:
```
Subject: Response: [Query Title] - [Spokesperson Name, Title]

Hi [Journalist First Name],

Here is expert commentary on [Query Topic] from [Spokesperson Name], [Spokesperson Title] at [Company Name] (https://example.com):

"[INSERT DIRECT QUOTE: 75 to 120 words. Open with a contrarian or highly specific operational insight. Use active verbs. Provide a concrete example, metric, or framework rather than generic platitudes.]"

Spokesperson Details:
• Name: [Full Name]
• Title: [Exact Executive Title]
• Company: [Company Name]
• Headshot & Bio: [Direct link to high-res image / Bio URL]
• LinkedIn: [LinkedIn Profile URL]

Feel free to use the quote above directly in your article. Happy to answer any follow-up questions if needed!

Best regards,

[Your Name / PR Lead]
```

### Step 4: Rapid Drafting Heuristics (Avoiding Clichés)
When writing the quote:
- **Never start with a definition**: Do not write `Cloud security is vital because...`. The reporter already knows what it is.
- **Start with the operational consequence**: Write `When engineering teams rush multi-cloud deployments, 80% of data breaches occur not at the infrastructure layer, but in misconfigured IAM role permissions...`.
- **Include specific numbers or trade-offs**: Mention timeframes, percentages, or cost trade-offs to give the quote tangible credibility.

### Step 5: Post-Publication Link Verification
1. Set up a Google Alert for: `"[Spokesperson Name]" OR "[Company Name]"`.
2. When the article is published:
   - Check if an active dofollow link was included.
   - If they quoted the spokesperson but omitted the hyperlink, politely follow up with the journalist thanking them for the inclusion and asking if they could add the reference link (see [Unlinked Brand Mentions](../Unlinked%20Brand%20Mentions/SKILL.md)).

## H. Analysis and Decision Framework
Use this framework to qualify incoming source requests:

```
                  [Journalist Query Identified]
                                |
               Does the outlet have DR >= 50 and
                  editorial integrity (no spam)?
                             /          \
                          [Yes]         [No]
                           /              \
             Does spokesperson have       (Discard: Low value)
             direct, credible expertise?
                    /          \
                 [Yes]         [No]
                  /              \
         (Draft & Submit quote   (Discard: Avoid answering
          within 60 minutes)      outside core domain)
```

## I. Prioritization Framework
Score incoming queries using the **Media Response Value (MRV)**:

$$\text{MRV} = \text{Outlet Domain Rating} \times \text{Topical Relevance (1-5)} \times \frac{1}{\text{Hours Since Query Posted} + 0.5}$$

Prioritize queries posted within the last 60 minutes on DR 70+ outlets.

## J. Deliverables & Specifications
Deliver a **Source Request Pitch Log**:
1. `platform`: Connectively, Featured, Qwoted, or Help a B2B Writer.
2. `outlet_name`: Publication (e.g. *TechRadar*, *CIO.com*, *Fast Company*).
3. `outlet_dr`: Ahrefs Domain Rating.
4. `query_summary`: The question asked.
5. `submitted_quote`: The exact text submitted.
6. `spokesperson_used`: Executive profile attributed.
7. `status`: Submitted, Quoted with Link, Quoted without Link, or Rejected.

## K. Quality Assurance Checklist
- [ ] Pitch submitted within 2 hours of query posting (preferably under 60 minutes).
- [ ] Quote is self-contained and under 150 words.
- [ ] Spokesperson credentials and headshot links are included.
- [ ] Target domain homepage or bio URL is provided.
- [ ] Tone is authoritative and educational, with zero promotional sales language.

## L. Failure Modes and Anti-Patterns
- **The Generic AI Dump**: Generating a 500-word essay using an LLM that summarizes common knowledge and emailing it to the reporter. Journalists recognize generic AI text instantly and blacklist the sender.
- **Pitching Dead Platforms**: Attempting to reply to defunct email addresses from legacy HARO distribution lists that were shut down during the Connectively migration.
- **The Sales Pitch Disguise**: Quoting the founder saying `Our product is the best solution for this problem`. Instant rejection.

## M. AI-Agent Operating Instructions
1. An AI agent must parse incoming queries to identify the specific question being asked and match it against approved spokesperson knowledge bases.
2. Enforce strict word count constraints (between 75 and 120 words for the quote body).
3. Always include pre-approved spokesperson headshot URLs and LinkedIn links in the generated pitch draft.

## N. Success Metrics & Verification Windows
- **Pitch Conversion Rate**: Achieve an acceptance rate of $\ge 12\% - 20\%$ on all submitted pitches.
- **High-Authority Links**: Secure 4 to 8 DR 60+ editorial backlinks per month.

## O. Related Skills
- **Upstream Authority**: [Entity Optimization](../../AI%20SEO/Entity%20Optimization/SKILL.md)
- **Direct Sibling**: [Digital PR](../Digital%20PR/SKILL.md), [Unlinked Brand Mentions](../Unlinked%20Brand%20Mentions/SKILL.md)
- **Asset Integration**: [Linkable Assets](../Linkable%20Assets/SKILL.md)

## P. Authoritative References
- [Connectively by Cision](https://www.connectively.us/) — Official platform succeeding legacy HARO.
- [Featured.com Platform Guidelines](https://featured.com/) — Community guidelines for high-scoring expert contributions.
- [Google Search Central: E-E-A-T and Search Quality Rater Guidelines](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) — Principles of experience, authoritativeness, and trust in source citations.

## Q. Maintenance and Review Cycle
- **Weekly Pitch Review**: Audit accepted vs rejected pitches weekly to identify which spokespersons, topics, and quote angles achieve the highest journalist acceptance rates.
