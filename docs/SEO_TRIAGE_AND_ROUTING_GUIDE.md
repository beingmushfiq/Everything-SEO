# 🧭 Everything SEO: Master Triage & Skill Dispatch Guide

> **Maintained by:** [Mushfiqur Rahman Aayan (@beingmushfiq)](https://github.com/beingmushfiq) & [DevCenterPoint](https://devcenterpoint.com)  
> **Repository:** [`beingmushfiq/Everything-SEO`](https://github.com/beingmushfiq/Everything-SEO)  
> **Standard:** Agent Skills Open Specification v1.0

When an autonomous AI agent (Cursor, Claude Code, Antigravity) or technical lead encounters an organic search problem, use this triage decision matrix to instantly identify which of the 55 operational skills to execute.

---

## 🎯 Forensic Symptom-to-Skill Dispatch Matrix

| Symptom / Error Reported | Root Cause Vector | Recommended Skill | CLI Command |
| :--- | :--- | :--- | :--- |
| **"Crawled - currently not indexed"** in GSC | Canonical mismatch, quality threshold, render failure | `Technical SEO / Indexing` | `everything-seo add Indexing` |
| **"Disallowed by robots.txt"** or bot blocked | RFC 9309 directive clash, wildcards, misplaced slash | `Technical SEO / RobotsTXT` | `everything-seo add RobotsTXT` |
| **Invalid Schema / Rich Result failure** | JSON-LD syntax, missing required Schema.org fields | `On-page SEO / Schema Markup` | `everything-seo add "Schema Markup"` |
| **Core Web Vitals failing (INP / LCP / CLS)** | Long main-thread tasks, unoptimized images, layout shift | `Technical SEO / Page Speed` | `everything-seo add "Page Speed"` |
| **AI Overviews / Perplexity omission** | Low information gain, missing entity disambiguation | `AI SEO / AI Search Visibility` | `everything-seo add "AI Search Visibility"` |
| **Organic clicks declining on ranking URLs** | SERP feature encroachment, obsolete title tag, poor CTR | `On-page SEO / CTR Optimization` | `everything-seo add "CTR Optimization"` |
| **Legacy content losing search traffic** | Decay curve, stale factual claims, competitor gap | `Content Optimization / Content Refresh` | `everything-seo add "Content Refresh"` |
| **Redirect loops, 301 vs 302 confusion** | Internal chaining, protocol mismatches, trailing slashes | `Technical SEO / Redirects` | `everything-seo add Redirects` |
| **Sitemap XML errors in GSC** | Stale lastmod, uncanonicalized URLs in sitemap index | `Technical SEO / XML Sitemaps` | `everything-seo add "XML Sitemaps"` |
| **International pages outranking in wrong region** | Missing or asymmetric hreflang clusters, x-default | `International SEO / Hreflang` | `everything-seo add Hreflang` |
| **Orphaned pages, deep crawl depth (>3 clicks)** | Weak internal architecture, silo breakdown | `On-page SEO / Internal Linking` | `everything-seo add "Internal Linking"` |
| **High impressions, near-zero conversions** | Mismatched search intent, missing transactional CTA | `Growth / Conversion Optimization` | `everything-seo add "Conversion Optimization"` |
| **Thin keyword profile, zero rank for head terms** | Missing semantic entities, low topical authority | `Content Optimization / Entity Coverage` | `everything-seo add "Entity Coverage"` |
| **Competitor outranking on high-intent topics** | Semantic content gap, omitted subtopics | `Content Optimization / Gap Analysis` | `everything-seo add "Gap Analysis"` |
| **Unlinked press or news mentions** | Brand mention without hyperlinked attribution | `Link Building / Unlinked Brand Mentions` | `everything-seo add "Unlinked Brand Mentions"` |
| **Server 500 errors during searchbot crawls** | Crawl budget overload, unindexed database queries | `Technical SEO / Log File Analysis` | `everything-seo add "Log File Analysis"` |

---

## 🏗️ Architecture-to-Preset Dispatch Matrix

If configuring a new repository workspace, use one of the curated domain presets:

| Web Architecture / Stack | Recommended Preset | Included Skills | Initialization Command |
| :--- | :--- | :--- | :--- |
| **Full 55-Skill Operational Fleet** | `all` | All 55 skills across all 11 disciplines | `everything-seo init --all` |
| **Baseline Starter (Framework-Agnostic)** | `starter` | Indexing, RobotsTXT, Page Speed, Schema, AI Visibility | `everything-seo init --preset starter` |
| **Next.js / Jamstack / SSR** | `nextjs` | Crawling, Indexing, XML Sitemaps, Page Speed, Schema | `everything-seo init --preset nextjs` |
| **Shopify / E-Commerce Platforms** | `ecommerce` | Schema, Faceted URLs, Page Speed, Digital PR, Internal Linking | `everything-seo init --preset ecommerce` |
| **B2B SaaS / Product-Led Growth** | `saas` | AI Visibility, Entity Coverage, Content Gap, Lead Gen, Keywords | `everything-seo init --preset saas` |
| **Digital Publisher / Media** | `publisher` | Content Refresh, Entity Coverage, NLP Optimization, Page Speed | `everything-seo init --preset publisher` |

---

## 🤖 AI Agent Prompting Patterns

### In Cursor IDE
Cursor reads `.cursor/rules/seo-router.mdc` automatically on any conversation. To force focus on a specific operational skill:
```text
@seo-indexing Check why Google Search Console marked /blog/my-post as "Crawled - currently not indexed".
Follow the 5-phase procedure in .agent/skills/Indexing/SKILL.md.
```

### In Claude Code CLI
Claude Code registers skills in `~/.claude/skills/`. Prompt Claude Code directly:
```text
Use skill seo-schema-markup to inspect app/products/[slug]/page.tsx.
Generate a valid Schema.org Product JSON-LD block with offers, aggregateRating, and brand.
```

### In Google Antigravity
Antigravity automatically discovers skills in `~/.gemini/antigravity/skills/`.
```text
Execute SEO skill seo-page-speed on the landing page component.
Diagnose main-thread INP bottlenecks and propose a remediation plan.
```

---

*Maintained by **[Mushfiqur Rahman Aayan](https://github.com/beingmushfiq)** & **[DevCenterPoint](https://devcenterpoint.com)** under the **[MIT License](../LICENSE)**.*

