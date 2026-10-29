# 📝 Changelog

All notable changes to the **Everything SEO** skill library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.1] - 2026-10-30

### Fixed
- **Empty Folder on Workspace `init`**: Defaulted `everything-seo init` without `--preset` to the **Essential SEO Starter Pack** (`templates/presets/starter.json`), installing 5 foundational skills (`Indexing`, `RobotsTXT`, `Page Speed`, `Schema Markup`, `AI Search Visibility`) into `.agent/skills/`.
- **Distributed Package Asset Resolution**: Replaced static monorepo path assumptions with multi-tier dynamic resolvers (`getSeoDir()`, `getPresetsDir()`, `getAuthoringTemplatePath()`) in CLI and MCP server, fixing asset loading when executed via global npm or `npx`.
- **Cursor Rule Generation**: Added automatic generation of `.cursor/rules/seo-<slug>.mdc` with YAML frontmatter descriptions and file globs on both `init` and `add` commands.

### Added
- **Automated Package Distribution Bundling**: Added `scripts/bundle_packages.js` hooked into npm lifecycle `prepack` scripts, bundling all 55 skills, presets, and templates into `@devcenterpoint/everything-seo` and `@devcenterpoint/mcp-server-seo` (~261 kB gzipped) while keeping Git clean.
- **Native JavaScript Global Installer**: Upgraded `everything-seo install --global` to deploy skills directly to Google Antigravity and Claude Code with zero external Python or subprocess requirements.
- **Python CLI Parity**: Updated `everything-seo-cli` to `1.2.1` with parity on starter preset initialization and Cursor rule generation.

---

## [1.2.0] - 2026-10-29

### Added
- **SEO-Eval Benchmark Suite (`tests/evals/`)**:
  - 5 empirical evaluation test cases testing agent reasoning on canonical loops, Schema syntax violations, robots.txt asset blocks, INP long-task attribution, and GEO entity information gain.
  - Evaluation runner `scripts/run_evals.py` producing an automated benchmark score card in `docs/EVAL_BENCHMARK_REPORT.md` (100% pass rate).
- **Community Skills Registry & Certification (`registry/`)**:
  - `registry/registry.json` cataloging verified community packs (`@community/shopify-headless-seo`, `@community/wordpress-headless-seo`, `@community/amazon-marketplace-seo`, `@community/youtube-video-seo`).
  - `.github/workflows/certify-community-skill.yml`: Automated GitHub Action to certify community PRs against the 17-section ontology.
  - Added `everything-seo registry list` command in CLI.
- **Python PyPI Distribution Package (`everything-seo-cli`)**:
  - `pyproject.toml` and `everything_seo_cli/` providing a standalone zero-dependency Python CLI (`pip install everything-seo-cli`).
- **Telemetry & Validation Tooling**:
  - `scripts/validate_schema.py`: Offline Schema.org JSON-LD validator CLI.
  - `scripts/connectors/gsc_connector.py`: Google Search Console API telemetry parser and deliverable matrix exporter.
- **International SEO Deliverable Template**:
  - `templates/i18n_hreflang_matrix_template.md`: Multi-region, multilingual hreflang cluster XML and header matrix.
- **CLI Workflow Expansions**:
  - Added `everything-seo scaffold --name <skill>` to generate custom team skills.
  - Added `everything-seo view <skill> [--section <letter>]` to inspect isolated manual sections.
  - Added `everything-seo sync` to update in-project skills with upstream improvements while protecting custom modifications with `.bak` backups.

---

## [1.1.0] - 2026-10-29

### Added
- **Universal Agent Interoperability & Transpilation Engine**:
  - Polyglot adapters in `scripts/adapters/`:
    - `generate_cursor_rules.py`: Transpiles canonical skills into Cursor IDE `.cursor/rules/*.mdc` rules with intelligent file globs and frontmatter.
    - `generate_claude_skills.py`: Deploys skills to `~/.claude/skills/` and appends verification commands to `CLAUDE.md`.
    - `generate_antigravity_skills.py`: Deploys skills into Google Antigravity environments with sidecar integration.
    - `generate_copilot_rules.py`: Generates repository-level directives for GitHub Copilot (`.github/copilot-instructions.md`) and Windsurf (`.windsurfrules`).
- **Universal Everything SEO CLI (`@devcenterpoint/everything-seo`)**:
  - Zero-dependency Node.js CLI in `packages/cli/bin/everything-seo.js` with commands:
    - `install --global`: Automated detection and installation across host AI agent harnesses.
    - `init [--preset <name>]`: In-project scaffolding following the "Shadcn" progressive adoption pattern.
    - `add <skill>`: Selective skill vendorization into active projects.
    - `search <query>`: Instant fuzzy keyword search across all 55 skills.
    - `list`: Categorized listing of skills and presets.
    - `audit [dir]`: Offline project baseline check for robots.txt, sitemaps, and metadata.
    - `mcp`: Launches the Model Context Protocol stdio server.
- **Model Context Protocol (MCP) Server (`@devcenterpoint/mcp-server-seo`)**:
  - Zero-dependency MCP 2024-11-05 compliant server in `packages/mcp-server/index.js` supporting both stdio and SSE.
  - Implements `search_seo_skills`, `get_seo_skill_section` (token-saving section extractor), `validate_jsonld_schema`, and `audit_robots_txt`.
  - Exposes `seo://skills/` and `seo://templates/` resources.
- **Curated Domain Presets (`templates/presets/`)**:
  - `nextjs.json`: Next.js & Jamstack technical crawling, SSR schema, and Core Web Vitals.
  - `ecommerce.json`: Product schema, faceted URLs, category crawl budget, and image optimization.
  - `saas.json`: B2B SaaS AI search visibility, entity coverage, content gap, and lead generation.
  - `publisher.json`: Content refresh, entity coverage, NLP optimization, and Google News readiness.
- **Universal Documentation & Installers**:
  - `docs/UNIVERSAL_AGENT_INTEGRATION_GUIDE.md`: Comprehensive cross-platform guide for Cursor, Claude Code, Antigravity, Copilot, Windsurf, and MCP.
  - `scripts/install.sh`: Zero-dependency shell installer for macOS/Linux.
  - `scripts/install.ps1`: Zero-dependency PowerShell installer for Windows.
- **Automated Adapter & Preset Tests**:
  - `tests/test_adapters.py`: Unit tests verifying preset integrity, Cursor rule generation, Copilot rule generation, and CLI commands.

---

## [1.0.0] - 2026-10-29

### Added
- **55 Operational Skills**: Authored 55 comprehensive, deterministic `SKILL.md` capability manuals across 11 core search disciplines.
- **Agent Skills Specification Compliance**: Every skill features machine-readable YAML frontmatter (`name`, `description`, `metadata`) and standardized sections A through Q.
- **Repository Governance**: Established `README.md`, `CONTRIBUTING.md`, `LICENSE` (MIT), `SECURITY.md`, `CODE_OF_CONDUCT.md`, `SUPPORT.md`, `FAQ.md`, `ROADMAP.md`, and `CITATION.cff`.
- **Engineering Standards & Taxonomy**: Created `docs/SKILL_WRITING_STANDARD.md` and `SEO/SKILL_INDEX.md`.
- **Offline Validation Tooling**: Built `scripts/validate_skills.py`, `scripts/check_links.py`, and `scripts/generate_index.py`.
- **Automated Test Suites**: Built `tests/test_skill_structure.py` and `tests/test_examples_and_templates.py`.
- **3 End-to-End Worked Examples**: E-commerce Migration Keyword Research, B2B SaaS Semantic Content Gap, and Online Retailer Technical SEO Audit.
- **10 Practical Deliverable Templates**: Reusable templates for audits, briefs, and implementation plans.
- **GitHub Community Automation**: Issue templates, PR template, and GitHub Actions CI workflow (`validate-skills.yml`).
