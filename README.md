# 🌐 Everything SEO: Master Operational Skill Library

> **Architectural Standard:** Agent Skills Specification v1.0  
> **Target Runtimes:** Autonomous AI Coding & Research Agents (Antigravity, Claude Code, OpenAI Swarm), Senior SEO Strategists, Growth Engineers  
> **Status:** Production-Ready (55 Operational Skills across 11 Disciplines)

Welcome to **Everything SEO**—a complete, deterministic, and deeply technical SEO knowledge and execution library. 

This repository is **not** a web application, dashboard, or SaaS tool. It is an **actionable capability library engineered for execution**: every topic is an operational manual (`SKILL.md`) providing concrete diagnostic heuristics, CLI commands, Python/curl scripts, mathematical formulas, and rigorous deliverable templates.

---

## 🏛️ Repository Organization

All operational skills are located within the [`SEO/`](SEO/README.md) directory, structured across **11 Core Disciplines** and **55 Leaf Operational Directories**:

```
📂 Everything-SEO
┃
┣ 📜 README.md                    <- Workspace Root Portal (You are here)
┃
┗ 📂 SEO
  ┣ 📜 README.md                  <- Detailed Architectural & Invocation Guide
  ┣ 📜 SKILL_INDEX.md             <- Searchable Master Index of all 55 Skills
  ┣ 📜 COVERAGE_REPORT.md         <- Verification, Metrics & Authority Audit
  ┃
  ┣ 📂 Keyword Research (5 Skills)
  ┃ ┣ 📂 Keyword Discovery        -> Intent triangulation, autocomplete mining, seed expansion
  ┃ ┣ 📂 Long-tail Keywords       -> High-converting conversational query extraction
  ┃ ┣ 📂 Low-competition Keywords -> SERP vulnerability analysis & weak-spot auditing
  ┃ ┣ 📂 Search Volume            -> Seasonality modeling & real click potential
  ┃ ┗ 📂 SERP Analysis            -> Reverse-engineering live layouts & intent consensus
  ┃
  ┣ 📂 On-page SEO (7 Skills)
  ┃ ┣ 📂 Title                    -> HTML title tag engineering & pixel-width compliance
  ┃ ┣ 📂 Headings Optimization    -> Semantic outline hierarchy & Featured Snippet targeting
  ┃ ┣ 📂 URL Optimization         -> RFC 3986 clean slug architecture & parameter hygiene
  ┃ ┣ 📂 Image SEO                -> WebP/AVIF compression, responsive srcset & descriptive alt
  ┃ ┣ 📂 Internal Linking         -> PageRank modeling & topical hub-and-spoke siloing
  ┃ ┣ 📂 Schema Markup            -> JSON-LD structured data & entity disambiguation
  ┃ ┗ 📂 CTR Optimization         -> Search snippet copywriting & controlled A/B testing
  ┃
  ┣ 📂 Content Optimization (5 Skills)
  ┃ ┣ 📂 Gap Analysis             -> Competitive semantic intersection & missing subtopics
  ┃ ┣ 📂 NLP Optimization         -> Entity salience, BM25 co-occurrence & dependency parsing
  ┃ ┣ 📂 Entity Coverage          -> Wikidata reconciliation & Knowledge Graph mapping
  ┃ ┣ 📂 Content Refresh          -> Historical traffic decay detection & 3-way triage
  ┃ ┗ 📂 Readability              -> Flesch-Kincaid calibration & mobile scannability
  ┃
  ┣ 📂 Technical SEO (7 Skills)
  ┃ ┣ 📂 Crawling                 -> Search bot discovery mechanics & crawl trap elimination
  ┃ ┣ 📂 Indexing                 -> Canonical tag resolution & robots meta directives
  ┃ ┣ 📂 XML Sitemaps             -> Sitemaps.org protocol, sitemap indexes & hygiene
  ┃ ┣ 📂 RobotsTXT                -> RFC 9309 compliance & crawler access governance
  ┃ ┣ 📂 Redirects                -> 301/308 semantics, redirect chain compression & loops
  ┃ ┣ 📂 Page Speed               -> Core Web Vitals (LCP, INP, CLS) & critical rendering path
  ┃ ┗ 📂 Log File Analysis        -> Server access log forensics & Googlebot rDNS verification
  ┃
  ┣ 📂 Link Building (6 Skills)
  ┃ ┣ 📂 Digital PR               -> Data-driven journalism & newsjacking outreach
  ┃ ┣ 📂 Guest Posting            -> Editorial pitching to contextually aligned publications
  ┃ ┣ 📂 Broken Link Building     -> Dead-link reclamation & 404 substitution
  ┃ ┣ 📂 Unlinked Brand Mentions  -> Brand reclamation & link insertion outreach
  ┃ ┣ 📂 Linkable Assets          -> Original benchmark studies & interactive calculators
  ┃ ┗ 📂 HARO                     -> Source request pitching (Connectively, Featured, Qwoted)
  ┃
  ┣ 📂 AI SEO (5 Skills)
  ┃ ┣ 📂 AI Search Visibility     -> Generative Engine Optimization (GEO) & AI Overviews
  ┃ ┣ 📂 Entity Optimization      -> Disambiguating brands within LLM Knowledge Graphs
  ┃ ┣ 📂 AI Citations             -> Maximizing inclusion in Perplexity, Claude, ChatGPT search
  ┃ ┣ 📂 Reddit Mentions          -> Establishing authentic authority on Google-favored forums
  ┃ ┗ 📂 3rd Party Mentions       -> Top-listicles, directories, and third-party validation
  ┃
  ┣ 📂 International SEO (3 Skills)
  ┃ ┣ 📂 Hreflang                 -> Bi-directional language/regional cluster annotation
  ┃ ┣ 📂 Multilingual SEO         -> ccTLD vs. Subdirectory architecture & language negotiation
  ┃ ┗ 📂 Translation SEO          -> Cultural transcreation & localized keyword demand
  ┃
  ┣ 📂 Analytics (4 Skills)
  ┃ ┣ 📂 Search Console           -> Organic search telemetry & crawl/performance diagnostics
  ┃ ┣ 📂 Bing Webmaster Tools     -> IndexNow protocol, Bing indexation & Copilot discovery
  ┃ ┣ 📂 Google Analytics         -> GA4 organic search behavioral and conversion attribution
  ┃ ┗ 📂 SEO Reporting            -> Executive reporting, blended ROI & forecasting
  ┃
  ┣ 📂 SEO Tools (4 Skills)
  ┃ ┣ 📂 Ahrefs                   -> Backlink index auditing & organic traffic estimation
  ┃ ┣ 📂 SEMrush                  -> Competitive gap analysis & SERP feature volatility tracking
  ┃ ┣ 📂 Keywords Everywhere      -> Real-time query volume & related search mining
  ┃ ┗ 📂 Screaming Frog           -> Automated headless crawling, custom extraction & audit rules
  ┃
  ┣ 📂 SEO Wins (4 Skills)
  ┃ ┣ 📂 150+ SEO Hacks           -> Rapid-impact quick-win triage across all search pillars
  ┃ ┣ 📂 AI SEO Hacks             -> Accelerated workflows with LLMs & semantic transformers
  ┃ ┣ 📂 Traffic Growth           -> Concentrated organic traffic scaling sprint methodology
  ┃ ┗ 📂 Backlinks Hacks          -> High-efficiency, non-spam link acquisition tactics
  ┃
  ┗ 📂 Growth (5 Skills)
    ┣ 📂 Organic Traffic          -> Macro growth strategy & channel diversification
    ┣ 📂 Lead Generation          -> High-intent organic conversion funnel optimization
    ┣ 📂 Conversion Optimization  -> Landing page CRO, above-the-fold engagement & friction removal
    ┣ 📂 Revenue Growth           -> Bottom-line revenue attribution & customer lifetime value
    ┗ 📂 SEO Scaling              -> Enterprise programmatic architecture & editorial operations
```

---

## ⚡ Quick Navigation

| Document | Description | Direct Link |
| :--- | :--- | :--- |
| **Master Architectural Guide** | Core taxonomy, agent invocation conventions, and prompt recipes | [SEO/README.md](SEO/README.md) |
| **Searchable Skill Index** | Complete 55-skill table with inputs, outputs, and relative file links | [SEO/SKILL_INDEX.md](SEO/SKILL_INDEX.md) |
| **Coverage & Audit Report** | Formal validation metrics, RFC/W3C standards index, and gap assessment | [SEO/COVERAGE_REPORT.md](SEO/COVERAGE_REPORT.md) |

---

## 🤖 Using with AI Agents (Antigravity, Claude Code, Cursor)

When executing an SEO task using an AI agent:

1. **Locate the Target Skill**: Check [SEO/SKILL_INDEX.md](SEO/SKILL_INDEX.md) to identify the skill matching your exact objective.
2. **Read the `SKILL.md` File**: Instruct your agent to read the corresponding file (e.g., `SEO/Technical SEO/Crawling/SKILL.md`).
3. **Follow the Five-Stage Protocol (Section F)**: The agent executes the standardized operational sequence:
   - Phase 1: Environment & Baseline Ingestion
   - Phase 2: Diagnostic Extraction & Auditing
   - Phase 3: Analytical Synthesis & Modeling
   - Phase 4: Remediation Architecture & Implementation
   - Phase 5: Verification & Governance
4. **Produce the Standardized Deliverable (Section I)**: Generate work products conforming strictly to the provided templates, matrices, and JSON schemas.

---

## 📐 Structural Standard (Sections A through Q)

Every `SKILL.md` file in this repository strictly implements all 17 standard sections:

```
├── YAML Frontmatter (name, description, metadata)
├── Section A: Operational Identity & Metadata
├── Section B: Executive Overview & Strategic Value
├── Section C: Applicability & Trigger Conditions
├── Section D: Disqualification & Anti-Patterns
├── Section E: Input Requirements & Prerequisites
├── Section F: Step-by-Step Execution Protocol
├── Section G: Finding Interpretation & Diagnostic Heuristics
├── Section H: Prioritization & Impact Matrix
├── Section I: Deliverable Specification
├── Section J: Quality Assurance & Verification Checklist
├── Section K: Common Failure Modes & Remediation
├── Section L: Interconnected Skill Graph
├── Section M: Agentic Automation & LLM Orchestration
├── Section N: Epistemic Rigor & Evidence Classification
├── Section O: Success Metrics & KPI Framework
├── Section P: Authoritative Standards & Primary References
└── Section Q: Change History & Governance
```

---

## 📜 License & Governance

This library is maintained under the **Agent Skills Open Specification**. All rights reserved. Built for deterministic, repeatable, and verifiable organic search operations.
