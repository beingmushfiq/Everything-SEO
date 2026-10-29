# 📦 Everything SEO: Version 1.2.0 Release Notes

> **Release Version:** `v1.2.0`  
> **Release Date:** October 29, 2026  
> **Brand & Maintainer:** [DevCenterPoint](https://devcenterpoint.com)  
> **Repository:** [`beingmushfiq/Everything-SEO`](https://github.com/beingmushfiq/Everything-SEO)  
> **License:** [MIT License](../LICENSE)  
> **Specification:** Agent Skills Open Specification v1.0 & Universal Agent Architecture

We are proud to announce the **v1.2.0** milestone release of **Everything SEO**—transforming the library into a universal, frictionless skill distribution engine for all AI coding assistants (Cursor, Claude Code, Google Antigravity, GitHub Copilot, Windsurf), Model Context Protocol (MCP) clients, and human search practitioners.

---

## 🌟 Major Highlights in v1.2.0

### 1. Universal Agent Adapters & Transpilation Engine ([`scripts/adapters/`](../scripts/adapters/))
Deterministic AST generators transforming canonical skills into native formats across all major agent harnesses:
- **Cursor IDE (`.cursor/rules/*.mdc`)**: Transpiles skills into 55 `.mdc` rules with frontmatter metadata and intelligent glob matching (e.g. `app/**/page.tsx`, `robots.txt`, `sitemap*.xml`).
- **Claude Code CLI (`~/.claude/skills/` & `CLAUDE.md`)**: Deploys skills for native `/skills` discovery and appends verification commands to `CLAUDE.md`.
- **Google Antigravity (`~/.gemini/antigravity/skills/`)**: Deploys skills with interactive sidecar links.
- **GitHub Copilot & Windsurf**: Formats `.github/copilot-instructions.md` and `.windsurfrules`.

### 2. Universal Everything SEO CLI (`@devcenterpoint/everything-seo` & `everything-seo-cli`)
A zero-dependency CLI available on both **npm** (via `npx @devcenterpoint/everything-seo`) and **PyPI** (`pip install everything-seo-cli`):
- `everything-seo install --global`: Auto-detects installed agent environments on host machine and links skills system-wide.
- `everything-seo init [--preset <name>]`: Progressively scaffolds SEO capabilities inside active project workspaces.
- `everything-seo add <skill>`: Progressively vendors individual skills into project `.agent/skills/`.
- `everything-seo scaffold --name <skill>`: Generates a custom 17-section compliant skill template for team-specific playbooks.
- `everything-seo view <skill> [--section <letter>]`: Renders isolated manual sections in the terminal.
- `everything-seo sync`: Synchronizes project skills with upstream improvements with automatic `.bak` backups.
- `everything-seo search <query>`: Instant terminal fuzzy search across all 55 skills.
- `everything-seo audit .`: Offline workspace health check for robots.txt, sitemaps, and metadata.

### 3. Enterprise Model Context Protocol (MCP) Server ([`packages/mcp-server/`](../packages/mcp-server/))
An official MCP 2024-11-05 server (`@devcenterpoint/mcp-server-seo`) supporting both **stdio** and **SSE**:
- **Tools**: `search_seo_skills`, `get_seo_skill_section` (token-saving section extractor), `validate_jsonld_schema`, and `audit_robots_txt`.
- **Resources**: Exposes `seo://skills/` and `seo://templates/`.

### 4. Curated Domain Presets ([`templates/presets/`](../templates/presets/))
- **`nextjs.json`**: Technical Crawling, Indexing, XML Sitemaps, Page Speed, and SSR Schema.
- **`ecommerce.json`**: Product Schema, Faceted URLs, Category Architecture, and Digital PR.
- **`saas.json`**: AI Search Visibility, Entity Coverage, Content Gap Analysis, and Lead Generation.
- **`publisher.json`**: Content Refresh, Entity Optimization, NLP Optimization, and Google News readiness.

### 5. SEO-Eval Benchmark Suite ([`tests/evals/`](../tests/evals/))
An empirical evaluation harness measuring AI agent diagnostic accuracy on 5 real-world search failure modes:
- Circular canonical loops, Schema.org syntax violations, robots.txt asset rendering blocks, Core Web Vitals INP long tasks, and GEO entity information gain.
- Automatic benchmark runner [`scripts/run_evals.py`](../scripts/run_evals.py) generating [`docs/EVAL_BENCHMARK_REPORT.md`](EVAL_BENCHMARK_REPORT.md) (**100.0% accuracy**).

### 6. Community Skills Registry ([`registry/`](../registry/))
- Catalog of verified community packs (`@community/shopify-headless-seo`, `@community/wordpress-headless-seo`, etc.).
- Automated GitHub Actions certification workflow ([`.github/workflows/certify-community-skill.yml`](../.github/workflows/certify-community-skill.yml)).

---

## 🚀 Quick Installation

```bash
# Global installation across detected agent harnesses
npx @devcenterpoint/everything-seo install --global

# Or via Python pip
pip install everything-seo-cli && everything-seo install --global

# In-project adoption for Next.js
everything-seo init --preset nextjs
```

---

*Maintained with pride by **[DevCenterPoint](https://devcenterpoint.com)** under the **[MIT License](../LICENSE)**.*
