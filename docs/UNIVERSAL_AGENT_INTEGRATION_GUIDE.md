# 🤖 Everything SEO: Universal Agent Integration Guide

> **Maintained by:** [DevCenterPoint](https://devcenterpoint.com)  
> **Repository:** [`beingmushfiq/Everything-SEO`](https://github.com/beingmushfiq/Everything-SEO)  
> **Specification Version:** `v1.1.0` (Universal Agent Architecture)

This document provides definitive, copy-paste instructions for connecting the **Everything SEO** skill library to every major AI coding assistant, IDE harness, and agent orchestrator—including **Cursor IDE**, **Claude Code**, **Google Antigravity**, **GitHub Copilot**, **Windsurf**, and **Model Context Protocol (MCP)** clients.

---

## 📑 Table of Contents

1. [Architectural Overview: The Ingestion Problem Solved](#1-architectural-overview-the-ingestion-problem-solved)
2. [Global System Installation](#2-global-system-installation)
3. [In-Project Progressive Adoption (The Shadcn Model)](#3-in-project-progressive-adoption-the-shadcn-model)
4. [Agent-Specific Integration Guides](#4-agent-specific-integration-guides)
   - [Cursor IDE (`.cursor/rules/*.mdc`)](#41-cursor-ide-cursorrulesmdc)
   - [Claude Code CLI (`~/.claude/skills/` & `CLAUDE.md`)](#42-claude-code-cli-claudeskills--claudemd)
   - [Google Antigravity (`~/.gemini/antigravity/skills/`)](#43-google-antigravity-geminiantigravityskills)
   - [GitHub Copilot (`.github/copilot-instructions.md`)](#44-github-copilot-githubcopilot-instructionsmd)
   - [Windsurf / Cascade (`.windsurfrules`)](#45-windsurf--cascade-windsurfrules)
5. [Model Context Protocol (MCP) Server Setup](#5-model-context-protocol-mcp-server-setup)
6. [Curated Project Presets](#6-curated-project-presets)
7. [Custom Team Skill Scaffolding & Upstream Sync](#7-custom-team-skill-scaffolding--upstream-sync)

---

## 1. Architectural Overview: The Ingestion Problem Solved

When AI coding assistants are asked to audit or optimize web projects, they frequently suffer from **instruction dilution** and **token bloat**. Ingesting all 55 skills (~88,000 words) dumps ~120,000 tokens into prompt memory, creating latency, driving up API costs, and causing agents to hallucinate.

**Everything SEO** solves this through two architectural mechanisms:
1. **Just-In-Time (JIT) Selective Ingestion**: Install only the specific discipline or preset needed for your tech stack.
2. **Polyglot AST Transpilation**: The canonical Section A–Q Markdown manuals are deterministically transformed into the exact format each AI agent natively understands.

---

## 2. Global System Installation

Global installation makes skills available across all workspaces on your development machine. The installer auto-detects installed AI agent harnesses and creates system-level links.

### Option A: Node.js / npx (Zero-Install One-Liner)
```bash
npx @devcenterpoint/everything-seo install --global
```

### Option B: Python / pip
```bash
pip install everything-seo-cli
everything-seo install --global
```

### Option C: Standalone Shell (macOS / Linux)
```bash
curl -fsSL https://raw.githubusercontent.com/beingmushfiq/Everything-SEO/main/scripts/install.sh | bash
```

### Option D: PowerShell (Windows)
```powershell
irm https://raw.githubusercontent.com/beingmushfiq/Everything-SEO/main/scripts/install.ps1 | iex
```

### What the Global Installer Does:
- Scans `~/.gemini/antigravity/skills/` and symlinks or hard-copies the library for Google Antigravity.
- Scans `~/.claude/skills/` and registers skills for Claude Code CLI.
- Scans `~/.cursor/` and installs global developer rule references.
- Gracefully falls back from symlinks to hardcopies on Windows systems where unprivileged symlink creation is restricted.

---

## 3. In-Project Progressive Adoption (The Shadcn Model)

Rather than treating SEO skills as an opaque, rigid third-party package, we recommend copying only the skills your project needs directly into your workspace repository. This allows you to inspect them, customize them to your company's infrastructure, and commit them into git.

```bash
# 1. Initialize SEO capabilities inside your active project directory
everything-seo init

# 2. Select a domain preset tailored to your framework
everything-seo init --preset nextjs

# 3. Add individual skills on demand as your site matures
everything-seo add technical-seo/indexing
everything-seo add on-page-seo/schema-markup
everything-seo add ai-seo/ai-search-visibility
```

---

## 4. Agent-Specific Integration Guides

### 4.1 Cursor IDE (`.cursor/rules/*.mdc`)

Cursor allows you to attach context-specific rules triggered by file matching globs (`.mdc` format).

#### Generating Cursor Rules Automatically
Run the adapter script inside this repository:
```bash
python scripts/adapters/generate_cursor_rules.py --output /path/to/your/project/.cursor/rules/
```

#### Example Generated Cursor Rule (`.cursor/rules/seo-indexing.mdc`):
```markdown
---
description: "Enforces indexation control, canonical tags, and crawl directives on web pages"
globs: "app/**/page.tsx, pages/**/*.tsx, public/robots.txt, public/sitemap*.xml, next.config.*"
alwaysApply: false
---

# Technical SEO: Indexing & Canonical Directives
- Follow RFC 9110 HTTP status codes for all routing (200 OK, 301 Permanent Redirect, 404/410 Gone).
- Every public routable page MUST output a self-referential canonical `<link rel="canonical" href="...">`.
- Never place `noindex` directives in HTTP response headers alongside a 301/302 redirect.
- Avoid canonical loops (e.g. Page A -> canonical Page B -> canonical Page A).
- Reference skill manual: `SEO/Technical SEO/Indexing/SKILL.md`.
```

---

### 4.2 Claude Code CLI (`~/.claude/skills/` & `CLAUDE.md`)

Claude Code discovers reusable capabilities via `~/.claude/skills/` and executes workspace directives from `CLAUDE.md`.

#### Step 1: Symlink or Copy Skills to Claude Skills Directory
```bash
python scripts/adapters/generate_claude_skills.py --output ~/.claude/skills/
```

#### Step 2: Add Verification Commands to your Project `CLAUDE.md`
Add the following block to your repository's root `CLAUDE.md`:
```markdown
## SEO Auditing & Verification Commands
- Check SEO health: `everything-seo audit .`
- Validate structured data: `python scripts/validate_skills.py`
- SEO Skill library: `.claude/skills/seo/`
```

---

### 4.3 Google Antigravity (`~/.gemini/antigravity/skills/`)

Google Antigravity natively loads skills conforming to the Agent Skills Open Specification v1.0.

#### Step 1: Link Skills into Antigravity Config
```bash
python scripts/adapters/generate_antigravity_skills.py
```
This automatically links the 55 skills into `~/.gemini/antigravity/skills/` or `.gemini/config/skills/`.

#### Step 2: In-Chat Invocation
In your Antigravity conversation, simply reference the skill by name:
```markdown
Apply the /seo-indexing skill to audit the canonical tags on my Next.js marketing pages.
```

---

### 4.4 GitHub Copilot (`.github/copilot-instructions.md`)

To equip GitHub Copilot with Everything SEO engineering standards, add the following directive block to `.github/copilot-instructions.md`:

```markdown
# SEO Architecture & Verification Standards (DevCenterPoint)
- Ensure all HTML generation adheres to semantic HTML5 standards.
- Every page template must support customizable `<title>`, `<meta name="description">`, and canonical `<link>`.
- Any JSON-LD structured data must validate against Schema.org specifications using `@context: "https://schema.org"`.
- Images must always include descriptive, non-redundant `alt` attributes and explicit `width`/`height` dimensions.
- Server redirects must use HTTP 301 for permanent relocations and preserve query parameters where applicable.
```

---

### 4.5 Windsurf / Cascade (`.windsurfrules`)

Place the following rules inside your repository's root `.windsurfrules` file:

```markdown
# Technical SEO Guidelines
- Strictly adhere to RFC 9309 robots.txt syntax.
- Never output uppercase URLs; enforce lowercase kebab-case paths.
- Ensure all Core Web Vitals optimizations prioritize Largest Contentful Paint (LCP <= 2.5s) and Interaction to Next Paint (INP <= 200ms).
- When generating schema markup, prefer JSON-LD injected in the `<head>` over microdata.
```

---

## 5. Model Context Protocol (MCP) Server Setup

The official **Everything SEO MCP Server** (`@devcenterpoint/mcp-server-seo`) allows agents to query skills, retrieve isolated manual sections (avoiding token bloat), and validate schemas offline.

### 5.1 Claude Desktop Configuration
Add the following entry to your `claude_desktop_config.json` (`%APPDATA%\Claude\claude_desktop_config.json` on Windows or `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "everything-seo": {
      "command": "npx",
      "args": ["-y", "@devcenterpoint/everything-seo", "mcp", "--stdio"]
    }
  }
}
```

### 5.2 Antigravity MCP Configuration
Add the server definition into your Antigravity MCP settings:

```json
{
  "mcpServers": {
    "seo": {
      "command": "node",
      "args": ["D:/Everything-SEO/packages/mcp-server/dist/server.js", "--stdio"],
      "env": {}
    }
  }
}
```

### 5.3 Available MCP Tools
- `search_seo_skills`: Find skills by keyword, intent, or framework.
- `get_seo_skill_section`: Request *only* specific sections (e.g., Section D: Execution Steps or Section E: Verification Checklist) to prevent context window bloat.
- `validate_jsonld_schema`: Validate JSON-LD offline against Schema.org vocabularies.
- `audit_robots_txt`: Check robots.txt content for syntax errors and crawl blocks.

---

## 6. Curated Project Presets

Instead of installing all 55 skills, choose a preset tailored to your stack:

| Preset Name | CLI Command | Included Core Skills | Best For |
| :--- | :--- | :--- | :--- |
| **Next.js / Jamstack** | `everything-seo init --preset nextjs` | Technical Crawling, Indexing, XML Sitemaps, Schema Markup, Page Speed, CTR Optimization | Next.js, Astro, Remix, Nuxt, SvelteKit |
| **E-Commerce** | `everything-seo init --preset ecommerce` | Schema Markup (Product/Offer), Technical Crawling, Faceted URLs, Digital PR, Image SEO | Shopify, WooCommerce, Magento, Headless E-com |
| **B2B SaaS** | `everything-seo init --preset saas` | AI Search Visibility, Entity Coverage, Content Gap Analysis, Lead Gen, Schema Markup | B2B software companies, enterprise portals |
| **Content Publisher** | `everything-seo init --preset publisher` | Content Refresh, Entity Optimization, Google News Schema, NLP Optimization, Internal Linking | News sites, high-volume blogs, affiliate media |

---

## 7. Custom Team Skill Scaffolding & Upstream Sync

### Scaffolding a Custom Team Skill
As your organization develops proprietary SEO playbooks (e.g. custom Redis edge routing or internal analytics integration), scaffold a new skill conforming to the uniform 17-section ontology:

```bash
everything-seo scaffold --name "redis-edge-redirects" --category "Technical SEO"
```
This generates `.agent/skills/technical-seo/redis-edge-redirects/SKILL.md` with Sections A through Q pre-structured.

### Syncing with Upstream Improvements
When DevCenterPoint updates the canonical `Everything-SEO` library with new search engine guidelines or algorithm response protocols, sync your project without losing custom modifications:

```bash
everything-seo sync
```
The sync engine performs a 3-way AST merge, creates automatic `.bak` backups of modified files, and alerts you to any upstream changes.

---

*Maintained by **[DevCenterPoint](https://devcenterpoint.com)** — Open-source knowledge infrastructure for search excellence.*
