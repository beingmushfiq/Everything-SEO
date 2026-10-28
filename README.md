# 🌐 Everything SEO: Master Operational Skill Library

> **Maintained by:** [DevCenterPoint](https://github.com/DevCenterPoint)  
> **Architectural Standard:** Agent Skills Open Specification v1.0  
> **License:** [MIT License](LICENSE)  
> **Target Audiences:** Technical SEO Strategists, Growth Engineers, Autonomous AI Agents (Antigravity, Claude Code, Cursor, LLM runtimes)  
> **Status:** Production-Ready (55 Operational Skills across 11 Disciplines)

---

## 📌 Mission & Overview

**Everything SEO** is an open-source, deterministic, and evidence-based operational capability library engineered for search professionals and autonomous coding agents.

This repository is **not** an SEO SaaS application, marketing dashboard, or fragile crawler. It is an **actionable, modular knowledge manual**:
- Every directory contains a self-contained, machine-actionable `SKILL.md`.
- Every skill implements a standardized **17-section ontology (Sections A through Q)** with valid YAML frontmatter.
- Every procedure is anchored in a strict **4-tier epistemic hierarchy** (official IETF RFCs, W3C standards, Schema.org schemas, and Google Search Central / Bing Webmaster documentation).
- Every workflow produces an auditable, schema-validated deliverable with concrete mathematical formulas, CLI commands, and diagnostic decision trees.

---

## 👥 Who This Repository Serves

1. **Senior SEO Strategists & Technical Leads**: Who require auditable, repeatable diagnostic protocols, triage decision trees, and enterprise-grade deliverables for client audits and in-house growth.
2. **Software Developers & DevOps Engineers**: Who need concrete RFC compliance rules (RFC 3986, RFC 9309, RFC 9110), Nginx/Apache configuration blocks, JSON-LD structured data schemas, and Core Web Vitals remediation steps.
3. **Autonomous AI Agents (Antigravity, Claude Code, Cursor, LLM runtimes)**: Compatible agents can read any `SKILL.md` directly into prompt context, execute the 5-phase procedural workflow, and produce structured deliverables adhering to pre-flight quality checklists.

---

## ⚡ What Makes It Different

| Traditional SEO Content | Everything SEO Library |
| :--- | :--- |
| **Superficial Advice**: "Write great content and optimize your meta tags." | **Deterministic Protocol**: Exact character and pixel limits (<=580px), title rewrite prevention rules, and GSC CTR anomaly formulas. |
| **Unsubstantiated Folklore**: Keyword density formulas, artificial LSI claims, doorway pages. | **Epistemic Classification**: Mandatory separation of Tier 1 verified standards from Tier 3 practitioner estimates. |
| **Fragile SaaS Tools**: Brittle dashboards that break on API changes. | **Permanent Knowledge Infrastructure**: Zero software bloat; runs 100% locally and offline. |
| **Tool Lock-in**: Demands $500/mo subscriptions to commercial tools. | **Free & Open-Source First**: Every skill provides free CLI/curl, GSC, and Python alternatives alongside commercial tool workflows. |

---

## 🗺️ Library Taxonomy (11 Disciplines, 55 Skills)

All operational skills reside within the [`SEO/`](SEO/README.md) directory:

```
📂 Everything-SEO
┃
┣ 📂 SEO
┃ ┣ 📂 Keyword Research (5 Skills)
┃ ┃ ┣ 📂 Keyword Discovery              -> Multi-source query discovery & seed expansion
┃ ┃ ┣ 📂 Long-tail Keywords             -> Conversational query extraction & zero-volume search analysis
┃ ┃ ┣ 📂 Low-competition Keywords       -> SERP vulnerability analysis & weak-spot auditing
┃ ┃ ┣ 📂 Search Volume                  -> Seasonality modeling & real click potential formulas
┃ ┃ ┗ 📂 SERP Analysis                  -> Reverse-engineering live layouts, intent consensus & SERP features
┃ ┃
┃ ┣ 📂 On-page SEO (7 Skills)
┃ ┃ ┣ 📂 Title                          -> HTML title tag engineering & pixel-width compliance (<=580px)
┃ ┃ ┣ 📂 Headings Optimization          -> Semantic H1-H6 outline hierarchy & Featured Snippet targeting
┃ ┃ ┣ 📂 URL Optimization               -> RFC 3986 clean slug architecture & parameter hygiene
┃ ┃ ┣ 📂 Image SEO                      -> WebP/AVIF formatting, responsive srcset & descriptive alt text
┃ ┃ ┣ 📂 Internal Linking               -> PageRank modeling & topical hub-and-spoke siloing
┃ ┃ ┣ 📂 Schema Markup                  -> JSON-LD structured data architecture & entity disambiguation
┃ ┃ ┗ 📂 CTR Optimization               -> Search snippet copywriting & controlled A/B testing
┃ ┃
┃ ┣ 📂 Content Optimization (5 Skills)
┃ ┃ ┣ 📂 Gap Analysis                   -> Competitive semantic intersection & missing subtopic discovery
┃ ┃ ┣ 📂 NLP Optimization               -> Entity salience, BM25 co-occurrence & syntactic parsing
┃ ┃ ┣ 📂 Entity Coverage                -> Wikidata reconciliation & Knowledge Graph mapping
┃ ┃ ┣ 📂 Content Refresh                -> Traffic decay detection, pruning vs. updating triage
┃ ┃ ┗ 📂 Readability                    -> Flesch-Kincaid calibration & mobile visual scannability
┃ ┃
┃ ┣ 📂 Technical SEO (7 Skills)
┃ ┃ ┣ 📂 Crawling                       -> Bot discovery mechanics & crawl trap elimination
┃ ┃ ┣ 📂 Indexing                       -> Canonical tag resolution & robots meta directives
┃ ┃ ┣ 📂 XML Sitemaps                   -> Sitemaps.org protocol, sitemap indexes & hygiene
┃ ┃ ┣ 📂 RobotsTXT                      -> RFC 9309 compliance & crawler access governance
┃ ┃ ┣ 📂 Redirects                      -> 301/308 semantics, redirect chain compression & loops
┃ ┃ ┣ 📂 Page Speed                     -> Core Web Vitals (LCP, INP, CLS) & critical rendering path
┃ ┃ ┗ 📂 Log File Analysis              -> Server access log forensics & Googlebot rDNS verification
┃ ┃
┃ ┣ 📂 Link Building (6 Skills)
┃ ┃ ┣ 📂 Digital PR                     -> Data-driven journalism, newsjacking & media pitching
┃ ┃ ┣ 📂 Guest Posting                  -> Authoritative editorial contribution & audience overlap analysis
┃ ┃ ┣ 📂 Broken Link Building           -> 404 reclamation & resource page substitution
┃ ┃ ┣ 📂 Unlinked Brand Mentions        -> Entity monitoring & link conversion outreach
┃ ┃ ┣ 📂 Linkable Assets                -> Original benchmark research & interactive utility tools
┃ ┃ ┗ 📂 HARO                           -> Source request pitching via Connectively, Featured, and Qwoted
┃ ┃
┃ ┣ 📂 AI SEO (5 Skills)
┃ ┃ ┣ 📂 AI Search Visibility           -> Generative Engine Optimization (GEO) & AI Overviews
┃ ┃ ┣ 📂 Entity Optimization            -> Disambiguating brand entities in LLM training corpora
┃ ┃ ┣ 📂 AI Citations                   -> Structuring content for RAG retrieval in ChatGPT, Claude, and Perplexity
┃ ┃ ┣ 📂 Reddit Mentions                -> Authentic community contribution favored by Google algorithms
┃ ┃ ┗ 📂 3rd Party Mentions             -> Curated roundups, directories, and third-party validation
┃ ┃
┃ ┣ 📂 International SEO (3 Skills)
┃ ┃ ┣ 📂 Hreflang                       -> ISO 639-1 & ISO 3166-1 cluster annotation and self-referencing rules
┃ ┃ ┣ 📂 Multilingual SEO               -> ccTLD vs Subdirectory architecture & language negotiation
┃ ┃ ┗ 📂 Translation SEO                -> Cultural transcreation & localized keyword intent mapping
┃ ┃
┃ ┣ 📂 Analytics (4 Skills)
┃ ┃ ┣ 📂 Search Console                 -> GSC API extraction, cannibalization detection & CTR anomaly discovery
┃ ┃ ┣ 📂 Bing Webmaster Tools           -> IndexNow implementation & Bing Copilot presence
┃ ┃ ┣ 📂 Google Analytics               -> GA4 exploration funnels, landing page engagement & attribution
┃ ┃ ┗ 📂 SEO Reporting                  -> Executive dashboards, revenue attribution & pipeline forecasting
┃ ┃
┃ ┣ 📂 SEO Tools (4 Skills)
┃ ┃ ┣ 📂 Ahrefs                         -> Link intersection, Content Gap, and Site Explorer operations
┃ ┃ ┣ 📂 SEMrush                        -> Domain Overview, Keyword Magic Tool & Position Tracking
┃ ┃ ┣ 📂 Keywords Everywhere            -> Browser extension & API bulk keyword metrics
┃ ┃ ┗ 📂 Screaming Frog                 -> Headless CLI automation, regex extraction & database storage mode
┃ ┃
┃ ┣ 📂 SEO Wins (4 Skills)
┃ ┃ ┣ 📂 150+ SEO Hacks                 -> Curated 40+ evidence-tiered tactical experimentation catalog
┃ ┃ ┣ 📂 AI SEO Hacks                   -> RAG chunking triggers & generative search experiments
┃ ┃ ┣ 📂 Traffic Growth                 -> Striking distance velocity & cannibalization resolution sprints
┃ ┃ ┗ 📂 Backlinks Hacks                -> Reverse image search, vendor testimonials & podcast tours
┃ ┃
┃ ┗ 📂 Growth (5 Skills)
┃   ┣ 📂 Organic Traffic                -> Search TAM sizing & organic flywheel acceleration
┃   ┣ 📂 Lead Generation                -> High-converting gated content, calculators & demo funnels
┃   ┣ 📂 Conversion Optimization        -> Above-the-fold engagement, value propositions & micro-commitments
┃   ┣ 📂 Revenue Growth                 -> Customer acquisition cost (CAC), LTV & organic pipeline attribution
┃   ┗ 📂 SEO Scaling                    -> Programmatic SEO (pSEO), canary deploys & multi-author quality gates
┃
┣ 📂 docs/                               <- Architecture, Progress Ledger, Standards, and Briefs
┣ 📂 examples/                           <- 3 Complete End-to-End Worked Case Studies
┣ 📂 templates/                          <- 10 Reusable Deliverable Templates
┣ 📂 scripts/                            <- Offline Skill Validators & Link Checkers
┗ 📂 tests/                              <- Automated Test Suites (unittest & pytest)
```

---

## 🚀 Quick-Start Guide

### Finding the Right Skill for Your Task
Consult the **[Master Skill Index](SEO/SKILL_INDEX.md)** to find the exact capability matching your current operational challenge:

| Scenario / Objective | Target Skill | Primary Deliverable |
| :--- | :--- | :--- |
| Google Search Console reports *"Crawled - currently not indexed"* | [Indexing](SEO/Technical%20SEO/Indexing/SKILL.md) | Indexation & Canonicalization Matrix |
| Organic CTR is low despite ranking in positions 1–3 | [CTR Optimization](SEO/On-page%20SEO/CTR%20Optimization/SKILL.md) | Snippet Optimization Experiment Card |
| Content traffic has decayed over the past 6 months | [Content Refresh](SEO/Content%20Optimization/Content%20Refresh/SKILL.md) | Content Triage & Work Order |
| Need to optimize for Google AI Overviews & Perplexity | [AI Search Visibility](SEO/AI%20SEO/AI%20Search%20Visibility/SKILL.md) | GEO Information Gain Specification |
| Building international multi-region landing pages | [Hreflang](SEO/International%20SEO/Hreflang/SKILL.md) | Hreflang Cluster XML Matrix |

---

## 📖 Real-World Worked Example: Indexation Triage

Here is how an operator or AI agent uses [`SEO/Technical SEO/Indexing/SKILL.md`](SEO/Technical%20SEO/Indexing/SKILL.md) to diagnose canonical mismatches:

1. **Ingest Inputs (Section D)**:
   - Target URL: `https://example.com/solutions/enterprise-cloud/`
   - GSC Status: *Duplicate, Google chose different canonical*.
2. **Execute Diagnostic CLI (Section G)**:
   ```bash
   curl -I -s https://example.com/solutions/enterprise-cloud/ | grep -i -E "x-robots-tag|link"
   ```
3. **Apply Interpretation Tree (Section H)**:
   - *Finding*: The HTML `<head>` declares canonical to self, but HTTP response header delivers `Link: <https://example.com/cloud/>; rel="canonical"`.
   - *Diagnosis*: Direct HTTP header vs. HTML DOM conflict. Googlebot prefers HTTP header or overrides due to conflicting signals.
4. **Deploy Deliverable (Section J)**:
   - Synchronize server configuration (Nginx) to remove duplicate header.
   - Run GSC URL Inspection Live Test.
5. **Verify Pre-Flight Checklist (Section K)**:
   - Canonical tag is absolute URI with matching protocol and trailing slash.
   - Zero conflicting `noindex` directives on target canonical.

*(For full worked end-to-end examples, explore [`examples/technical_seo_audit_ecommerce.md`](examples/technical_seo_audit_ecommerce.md)).*

---

## 🤖 Using with Autonomous AI Agents

When prompting Antigravity, Claude Code, Cursor, or an LLM worker:

```markdown
You are acting as an expert technical SEO engineer.
Read and follow the operational methodology in:
SEO/Technical SEO/Page Speed/SKILL.md

Target URL: https://example.com/products/widget
Audit the Core Web Vitals bottlenecks (LCP, INP, CLS).
Execute the 5-phase procedure in Section G and produce the standard deliverable table in Section J.
Verify all items against Section K before completing the turn.
```

---

## 🧪 Local Testing & Automated Validation

This repository includes a 100% offline automated validation suite. It requires no API keys or internet connection:

```bash
# 1. Install dev dependencies (optional, pytest is optional - unittest works natively)
pip install -r requirements-dev.txt

# 2. Validate all 55 skill files for frontmatter, mandatory sections, and word count
python scripts/validate_skills.py

# 3. Verify all internal relative markdown links resolve on disk
python scripts/check_links.py

# 4. Verify that SKILL_INDEX.md and COVERAGE_REPORT.md match real filesystem
python scripts/generate_index.py --check

# 5. Run the full unit test suite
python -m unittest discover -s tests -p "test_*.py"
```

---

## 📚 Community, Governance & Links

- **Repository Guidelines & Standards**:
  - [Contributing Guidelines](CONTRIBUTING.md)
  - [Skill Writing Standard](docs/SKILL_WRITING_STANDARD.md)
  - [Code of Conduct](CODE_OF_CONDUCT.md)
  - [Security Policy](SECURITY.md)
  - [Support & FAQ](FAQ.md)
- **Project Governance**:
  - [MIT License](LICENSE)
  - [Changelog](CHANGELOG.md)
  - [Strategic Roadmap](ROADMAP.md)
  - [Citation File Format (CITATION.cff)](CITATION.cff)
  - [Phase 1 Progress Ledger](docs/PROGRESS.md)
- **Reusable Assets**:
  - [3 Complete Worked Examples](examples/)
  - [10 Deliverable Templates](templates/)

---

## ⚖️ License

Maintained with pride by **[DevCenterPoint](https://github.com/DevCenterPoint)** under the **MIT License**.  
Built for deterministic, repeatable, and verifiable organic search excellence.
