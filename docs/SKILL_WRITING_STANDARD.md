# 📐 Everything SEO: Skill Authoring & Engineering Standard

> **Standard Version:** 1.0.0  
> **Maintainer:** DevCenterPoint  
> **Target Audience:** Open-Source Contributors, Technical SEO Leads, AI Agent Developers  
> **Specification Reference:** Agent Skills Open Specification v1.0

---

## 1. Core Purpose & Philosophy

This standard defines the mandatory structural, epistemic, and procedural rules for authoring and updating skills in the **Everything SEO** library.

An SEO skill is **not** a blog post, a high-level overview, a collection of generic tips, or an introductory tutorial. A skill is an **actionable, deterministic capability manual** engineered so that a senior human specialist or an autonomous AI agent (such as Antigravity, Claude Code, or an LLM worker) can execute the workflow end-to-end without having to invent missing methodology.

---

## 2. Structural Requirements

Every skill must be authored in a single Markdown file named `SKILL.md` located inside its corresponding leaf directory.

### 2.1 YAML Frontmatter Schema
Every `SKILL.md` file must begin with valid YAML frontmatter fenced by `---`:

```yaml
---
name: [kebab-case-canonical-skill-name]
description: [Concise, high-density capability summary explaining what the skill executes and produces]
metadata:
  category: [Parent Discipline, e.g. Keyword Research, On-page SEO, Technical SEO]
  discipline: [Functional Discipline, e.g. Search Intelligence, Technical Architecture]
  version: "1.0.0"
---
```

**Frontmatter Rules:**
- `name`: Must use lowercase letters, numbers, and hyphens (e.g., `seo-keyword-discovery`, `seo-xml-sitemaps`).
- `description`: Must be a single concise sentence describing what task the skill executes and what artifact it outputs.
- `metadata`: Must include `category`, `discipline`, and `version` (SemVer string).

---

## 3. Mandatory Standard Sections (A through Q)

Every `SKILL.md` must implement all 17 standardized sections in order. Section headings must follow the format `## [Letter]. [Section Title]`:

```markdown
# [Skill Title]

## A. Purpose
Clear definition of the capability, its operational mission, and the concrete business or technical problem it solves.

## B. Trigger Conditions
Explicit conditions and events that necessitate invoking this skill (e.g., site launch, GSC traffic drop, international expansion).

## C. Scope and Boundaries
Unambiguous demarcation of what is within scope vs. what is out of scope (with links to companion skills that handle out-of-scope tasks).

## D. Required Inputs
The exact datasets, URLs, credentials, CSV exports, or baselines required to initiate the workflow.

## E. Required Tools and Data Sources
Commercial tooling options paired with zero-cost and open-source alternatives (CLI, curl, Google APIs, Chrome DevTools).

## F. Core Concepts and Decision Principles
First-principles theory, mathematical equations, RFC references, and diagnostic mental models governing the skill.

## G. Operational Workflow
A 5-phase sequential workflow with concrete terminal commands, Python/curl scripts, and procedural actions:
- Phase 1: Ingestion & Baseline Establishment
- Phase 2: Diagnostic Extraction & Auditing
- Phase 3: Analytical Synthesis & Scoring
- Phase 4: Remediation Architecture & Implementation
- Phase 5: Verification & Governance

## H. Analysis and Decision Framework
Decision trees, diagnostic matrices, and heuristic tables guiding the interpretation of findings.

## I. Prioritization Framework
An explicit scoring model (e.g., ICE, RICE, or custom domain formula) to prioritize discovered issues or opportunities.

## J. Deliverables & Specifications
Exact schema, markdown tables, or code templates for the final deliverable produced by the skill.

## K. Quality Assurance Checklist
Mandatory pre-flight checklist that must be validated before the work is declared complete.

## L. Failure Modes and Anti-Patterns
Real-world pitfalls, common misconceptions, edge-case failures, and instructions on how to avoid or recover from them.

## M. AI-Agent Operating Instructions
Explicit prompt recipes, system instructions, and deterministic guardrails for LLM agents executing this skill autonomously.

## N. Success Metrics & Verification Windows
Leading and lagging indicators with exact measurement timeframes (e.g., 72 hours, 14 days, 90 days).

## O. Related Skills
Interconnected links to upstream dependencies and downstream consumers within the library using URI-encoded relative links.

## P. Authoritative References
Primary sources: IETF RFCs, W3C standards, Schema.org specifications, and official Google/Bing documentation.

## Q. Maintenance and Review Cycle
Standard review cadence (e.g., monthly, quarterly, semi-annually) to prevent obsolescence against changing search engine behavior.
```

---

## 4. Epistemic Rigor & Evidence Standards

To avoid the propagation of speculative folklore and outdated black-hat tactics, all guidance must strictly adhere to the **4-Tier Epistemic Hierarchy**:

| Tier | Category | Definition & Allowable Sources | Handling Rule |
| :---: | :--- | :--- | :--- |
| **Tier 1** | **Verified Specification** | Official internet standards (IETF RFCs, W3C), Schema.org definitions, and official Google Search Central / Bing Webmaster documentation. | Mandatory baseline for all technical and algorithmic statements. |
| **Tier 2** | **Empirical Inference** | Direct observations from official telemetry tools (GSC, Bing Webmaster Tools, GA4) or peer-reviewed information retrieval studies. | Stated as observed empirical reality. |
| **Tier 3** | **Practitioner Estimate** | Metrics from third-party tools (Ahrefs DR, SEMrush KD, Moz DA). | Must be explicitly labeled as directional proxies, not official ranking factors. |
| **Tier 4** | **Unverified / Disqualified** | Black-hat link schemes, automated content spinning, keyword density formulas, expired domain networks. | Explicitly prohibited and categorized under Section L (Failure Modes). |

---

## 5. Relative Link & Navigation Rules

To guarantee cross-platform compatibility across Windows, macOS, Linux, and web viewers:
1. **URI Encoding**: All relative links with spaces in directory names MUST use `%20` (e.g., `[Title](../SEO/On-page%20SEO/Title/SKILL.md)`).
2. **Normalized Forward Slashes**: Always use forward slashes (`/`), never backslashes (`\`).
3. **No Dead Links**: Every relative markdown link must point to an actual file existing on disk.

---

## 6. Pre-Commit Quality Assurance Checklist

Before committing any skill file, authors must verify:
- [ ] Valid YAML frontmatter parses cleanly with `name`, `description`, and `metadata`.
- [ ] All 17 standardized sections (A through Q) are present and populated.
- [ ] Substantive depth: the skill contains concrete CLI commands, heuristics, or formulas (no generic summaries).
- [ ] Free and open-source alternatives are provided alongside any commercial tool mentions.
- [ ] All relative markdown links resolve to existing files on disk.
- [ ] The automated validator passes: `python scripts/validate_skills.py`.
