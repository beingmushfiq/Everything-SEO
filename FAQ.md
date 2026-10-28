# ❓ Frequently Asked Questions (FAQ)

> **Maintained by:** DevCenterPoint  
> **Project:** Everything SEO

---

### General Questions

#### 1. Is Everything SEO a software tool, dashboard, or SaaS application?
**No.** Everything SEO is an **open-source capability library of operational skills** conforming to the Agent Skills Open Specification v1.0. It is designed as an executable knowledge manual for senior human SEO leads, growth engineers, and autonomous AI agents. We intentionally do not build an in-house crawler, SaaS dashboard, or web UI, avoiding software bloat, fragile dependencies, and breaking API changes.

#### 2. Who is this repository for?
- **Technical SEOs & Strategists**: Who need deterministic, auditable workflows, checklists, and templates for clients or enterprise audits.
- **Developers & Growth Engineers**: Who need concrete code snippets, server configurations (Nginx, Apache), RFC standards, and Core Web Vitals remediation steps.
- **Autonomous AI Agents (Antigravity, Claude Code, Cursor, LLM runtimes)**: Who can load individual `SKILL.md` files into their prompt context to perform specialized, deterministic search intelligence and audit tasks.

#### 3. Do I need expensive paid subscriptions (Ahrefs, SEMrush) to use this library?
**No.** While commercial tools are referenced for convenience, **every single skill provides zero-cost and open-source alternatives**, including:
- Google Search Console (GSC) API and URL Inspection Tool
- Bing Webmaster Tools API and IndexNow
- Google Trends and Search Suggest APIs
- Unix command-line utilities (`curl`, `awk`, `grep`)
- Chrome DevTools Network and Performance tabs
- Free Python scripts for XML parsing, link extraction, and status code auditing

---

### Working with AI Agents

#### 4. How do I invoke an SEO skill with an AI agent?
1. Direct your agent to read [`SEO/SKILL_INDEX.md`](SEO/SKILL_INDEX.md) to locate the skill matching your exact objective.
2. Instruct the agent to read the target `SKILL.md` (e.g., `SEO/Technical SEO/Indexing/SKILL.md`).
3. Instruct the agent to execute **Section G (Operational Workflow)** and produce the deliverable specified in **Section J (Deliverables & Specifications)**.
4. Require the agent to validate its findings against **Section K (Quality Assurance Checklist)** before completing the task.

#### 5. Why are the skills structured with Sections A through Q?
The uniform 17-section ontology creates a predictable, deterministic mental model for both human operators and LLMs. An agent immediately knows where to look for input prerequisites (Section D), CLI commands (Section G), diagnostic decision trees (Section H), and output schemas (Section J).

---

### Methodology & Technical Rigor

#### 6. How does this repository avoid obsolete or risky SEO folklore?
We enforce a strict **4-Tier Epistemic Hierarchy**:
- **Tier 1 (Verified Specification)**: Official IETF RFCs (e.g., RFC 3986 for URLs, RFC 9309 for robots.txt, RFC 9110 for HTTP semantics), W3C standards, Schema.org definitions, and official Google/Bing documentation.
- **Tier 2 (Empirical Inference)**: Verified search engine telemetry (GSC, CrUX data).
- **Tier 3 (Practitioner Estimate)**: Third-party metrics (Ahrefs DR, SEMrush KD) explicitly qualified as non-official proxies.
- **Tier 4 (Unverified / Disqualified)**: Black-hat link schemes, automated spun content, keyword density formulas, and doorway pages are explicitly categorized as dangerous anti-patterns.

#### 7. What is the difference between Schema Markup, Entity Coverage, and Entity Optimization?
- **Schema Markup** (`SEO/On-page SEO/Schema Markup`): Focuses on generating and validating raw JSON-LD code for Google Rich Results.
- **Entity Coverage** (`SEO/Content Optimization/Entity Coverage`): Focuses on topical depth, subtopic coverage, and Wikidata QID reconciliation within body copy.
- **Entity Optimization** (`SEO/AI SEO/Entity Optimization`): Focuses on external brand disambiguation across the broader web to influence LLM knowledge corpora and AI search overviews.

---

### Contributing & Licensing

#### 8. How can I contribute a new skill or report an error?
Please consult our [Contributing Guide](CONTRIBUTING.md). You can submit a bug report via our [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.yml) or propose a new skill via our [Skill Request Template](.github/ISSUE_TEMPLATE/skill_request.yml).

#### 9. What license does this project use?
Everything SEO is published under the permissive **MIT License**, permitting unrestricted personal, commercial, and enterprise use.
