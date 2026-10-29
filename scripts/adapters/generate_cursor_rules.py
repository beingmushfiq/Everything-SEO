#!/usr/bin/env python3
"""
Generate Cursor IDE rules (.cursor/rules/*.mdc) from canonical Everything SEO skills.
Maintained by DevCenterPoint (https://devcenterpoint.com)
"""

import sys
import os
import re
import argparse
from pathlib import Path

# Ensure UTF-8 output encoding across Windows and POSIX
if sys.stdout.encoding is None or sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except AttributeError:
        pass

ROOT_DIR = Path(__file__).resolve().parent.parent.parent
SEO_DIR = ROOT_DIR / "SEO"

DISCIPLINE_GLOBS = {
    "Technical SEO": "app/**/page.tsx, pages/**/*.tsx, public/robots.txt, public/sitemap*.xml, next.config.*",
    "On-page SEO": "app/**/page.tsx, components/**/*.tsx, pages/**/*.tsx, **/*.html, **/*.liquid",
    "Content Optimization": "content/**/*.md, content/**/*.mdx, posts/**/*.md, pages/**/*.tsx",
    "Link Building": "content/**/*.md, content/**/*.mdx, app/**/page.tsx",
    "AI SEO": "content/**/*.mdx, content/**/*.md, app/**/page.tsx, pages/**/*.tsx",
    "International SEO": "app/**/page.tsx, pages/**/*.tsx, public/sitemap*.xml, next.config.*",
    "Analytics": "scripts/**, **/*.py, **/*.ts, **/*.js",
    "SEO Tools": "scripts/**, **/*.py, **/*.sh",
    "Keyword Research": "content/**/*.md, content/**/*.mdx, app/**/page.tsx",
    "SEO Wins": "app/**/page.tsx, pages/**/*.tsx, content/**/*.md",
    "Growth": "app/**/page.tsx, pages/**/*.tsx, components/**/*.tsx"
}

def extract_frontmatter(content: str) -> dict:
    match = re.search(r"^---\s*\n(.*?)\n---", content, re.DOTALL)
    if not match:
        return {}
    raw = match.group(1)
    metadata = {}
    for line in raw.split("\n"):
        if ":" in line:
            key, val = line.split(":", 1)
            metadata[key.strip()] = val.strip().strip('"').strip("'")
    return metadata

def extract_section(content: str, section_letter: str) -> str:
    pattern = rf"(?:###\s*Section\s*{section_letter}:|##\s*{section_letter}\.)[^\n]*\n([\s\S]*?)(?=\n##\s*[A-Z]\.|\n###\s*Section|\Z)"
    match = re.search(pattern, content, re.IGNORECASE)
    if match:
        return match.group(1).strip()
    return ""

def generate_cursor_rule(skill_path: Path, output_dir: Path) -> Path:
    with open(skill_path, "r", encoding="utf-8") as f:
        content = f.read()

    meta = extract_frontmatter(content)
    skill_name = meta.get("name", skill_path.parent.name)
    description = meta.get("description", f"Operational SEO capability for {skill_name}")

    rel_parts = skill_path.relative_to(SEO_DIR).parts
    discipline = rel_parts[0] if len(rel_parts) > 1 else "General"
    clean_name = re.sub(r'^seo[-\s]+', '', skill_path.parent.name.strip(), flags=re.IGNORECASE)
    slug = f"seo-{clean_name.lower().replace(' ', '-').replace('+', '')}"

    globs = DISCIPLINE_GLOBS.get(discipline, "**/*")

    # Extract Key Sections
    section_b = extract_section(content, "B") # Trigger Conditions
    section_d = extract_section(content, "D") # Execution Steps
    section_e = extract_section(content, "E") # Verification Checklist

    if section_b:
        trig_clean = re.sub(r'Invoke this skill when:?', '', section_b, flags=re.IGNORECASE)
        trig_clean = re.sub(r'Upstream dependencies:[\s\S]*', '', trig_clean, flags=re.IGNORECASE)
        trig_clean = " ".join(trig_clean.split())[:250]
        if trig_clean:
            description = f"{description} Trigger when: {trig_clean}"

    safe_description = description.replace('"', "'")

    # Build concise rule body to preserve context budget
    rule_body = f"""---
description: "{safe_description}"
globs: "{globs}"
alwaysApply: false
---

# {skill_name} Directives (Everything SEO by DevCenterPoint)

## Core Operational Execution
{section_d[:1200] if section_d else "Follow verified RFC standards and deterministic search protocols."}

## Pre-Flight Verification Checklist
{section_e[:1000] if section_e else "Verify all deliverables against Tier 1 ground-truth documentation."}

---
*Canonical Reference: `SEO/{'/'.join(rel_parts)}`*
"""
    output_file = output_dir / f"{slug}.mdc"
    output_dir.mkdir(parents=True, exist_ok=True)
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(rule_body.strip() + "\n")
    return output_file

def generate_master_router(output_dir: Path) -> Path:
    router_file = output_dir / "seo-router.mdc"
    router_content = """---
description: "Master SEO router and triage dispatcher. Activates on any SEO audit, ranking drop, indexation issue, Core Web Vitals, Schema.org markup, or AI search query."
globs: "**/*"
alwaysApply: true
---

# Everything SEO Master Router & Triage Engine
When the user asks an SEO-related question or requests an optimization, use this triage decision matrix to inspect, read, and apply the exact operational manual from .agent/skills/seo-<slug>/SKILL.md:

- Indexation, Crawl Status, Canonical Loops, 404s, Noindex Directives:
  -> Read .agent/skills/seo-indexing/SKILL.md or .agent/skills/seo-crawling/SKILL.md
- Robots.txt Errors, Bot Blocking, RFC 9309 Directive Syntax:
  -> Read .agent/skills/seo-robotstxt/SKILL.md
- Schema.org, JSON-LD, Rich Results, Structured Data Errors:
  -> Read .agent/skills/seo-schema-markup/SKILL.md
- Core Web Vitals, LCP, INP, CLS, Asset Optimization, Server Latency:
  -> Read .agent/skills/seo-page-speed/SKILL.md
- AI Overviews, Perplexity Citations, ChatGPT Search, GEO Entity Gain:
  -> Read .agent/skills/seo-ai-search-visibility/SKILL.md
- Organic Traffic Decay, Stale Content, SERP Rank Decline:
  -> Read .agent/skills/seo-content-refresh/SKILL.md
- Hreflang, Multilingual Sites, Multi-Region Targeting:
  -> Read .agent/skills/seo-hreflang/SKILL.md
- Internal Linking, Orphan Pages, PageRank Distribution:
  -> Read .agent/skills/seo-internal-linking/SKILL.md
- Title Tags, Meta Descriptions, CTR Anomaly Remediation:
  -> Read .agent/skills/seo-title/SKILL.md or .agent/skills/seo-ctr-optimization/SKILL.md
- URL Structure, Slugs, Faceted Navigation Parameters:
  -> Read .agent/skills/seo-url-optimization/SKILL.md
- Redirect Chains, 301/302 Rules, HTTP-to-HTTPS Loops:
  -> Read .agent/skills/seo-redirects/SKILL.md
- XML Sitemaps, Sitemap Indexing, Lastmod Hygeine:
  -> Read .agent/skills/seo-xml-sitemaps/SKILL.md
- Search Console Performance, GSC Coverage Errors, Query Clicks:
  -> Read .agent/skills/seo-search-console/SKILL.md
- Master Triage, Multi-Symptom Diagnostics, or Ambiguous Ranking Losses:
  -> Read .agent/skills/seo-orchestrator/SKILL.md

Follow the 5-phase procedure (Ingestion -> Extraction -> Synthesis -> Remediation -> Governance) in the referenced skill manual.
"""
    output_dir.mkdir(parents=True, exist_ok=True)
    with open(router_file, "w", encoding="utf-8") as f:
        f.write(router_content.strip() + "\n")
    return router_file

def main():
    parser = argparse.ArgumentParser(description="Generate Cursor .mdc rules from Everything SEO skills")
    parser.add_argument("--output", "-o", default=str(ROOT_DIR / ".cursor" / "rules"), help="Output directory")
    args = parser.parse_args()

    output_dir = Path(args.output).resolve()
    print(f"Generating Cursor rules into: {output_dir}")

    count = 0
    for skill_file in sorted(SEO_DIR.glob("*/*/SKILL.md")):
        generate_cursor_rule(skill_file, output_dir)
        count += 1

    generate_master_router(output_dir)
    print(f"[PASS] Successfully generated {count} Cursor .mdc rules + Master Router (seo-router.mdc).")

if __name__ == "__main__":
    main()

