#!/usr/bin/env python3
"""
Everything SEO Python CLI Entrypoint
Created & Led by Mushfiqur Rahman Aayan (@beingmushfiq)
Maintained by DevCenterPoint (https://devcenterpoint.com)
"""

import sys
import os
import json
import argparse
import subprocess
from pathlib import Path

# Ensure UTF-8 output
if sys.stdout.encoding is None or sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except AttributeError:
        pass

ROOT_DIR = Path(__file__).resolve().parent.parent

def get_seo_dir() -> Path:
    candidates = [
        Path(__file__).parent / "data" / "SEO",
        ROOT_DIR / "SEO",
        Path.cwd() / "SEO"
    ]
    for c in candidates:
        if c.exists():
            return c
    return Path(__file__).parent / "data" / "SEO"

def get_presets_dir() -> Path:
    candidates = [
        Path(__file__).parent / "data" / "presets",
        Path(__file__).parent / "data" / "templates" / "presets",
        ROOT_DIR / "templates" / "presets",
        Path.cwd() / "templates" / "presets"
    ]
    for c in candidates:
        if c.exists():
            return c
    return Path(__file__).parent / "data" / "presets"

SEO_DIR = get_seo_dir()
PRESETS_DIR = get_presets_dir()

SKILL_ALIASES = {
    "canonical": "Technical SEO/Indexing",
    "indexing": "Technical SEO/Indexing",
    "noindex": "Technical SEO/Indexing",
    "robots": "Technical SEO/RobotsTXT",
    "robotstxt": "Technical SEO/RobotsTXT",
    "schema": "On-page SEO/Schema Markup",
    "jsonld": "On-page SEO/Schema Markup",
    "structured-data": "On-page SEO/Schema Markup",
    "speed": "Technical SEO/Page Speed",
    "pagespeed": "Technical SEO/Page Speed",
    "inp": "Technical SEO/Page Speed",
    "lcp": "Technical SEO/Page Speed",
    "cls": "Technical SEO/Page Speed",
    "core-web-vitals": "Technical SEO/Page Speed",
    "cwv": "Technical SEO/Page Speed",
    "redirect": "Technical SEO/Redirects",
    "redirects": "Technical SEO/Redirects",
    "301": "Technical SEO/Redirects",
    "302": "Technical SEO/Redirects",
    "404": "Technical SEO/Redirects",
    "sitemap": "Technical SEO/XML Sitemaps",
    "sitemaps": "Technical SEO/XML Sitemaps",
    "xml-sitemaps": "Technical SEO/XML Sitemaps",
    "crawl": "Technical SEO/Crawling",
    "crawling": "Technical SEO/Crawling",
    "crawl-budget": "Technical SEO/Crawling",
    "logs": "Technical SEO/Log File Analysis",
    "log-analysis": "Technical SEO/Log File Analysis",
    "hreflang": "International SEO/Hreflang",
    "multilingual": "International SEO/Multilingual SEO",
    "translation": "International SEO/Translation SEO",
    "geo": "AI SEO/AI Search Visibility",
    "ai-search": "AI SEO/AI Search Visibility",
    "perplexity": "AI SEO/AI Search Visibility",
    "chatgpt": "AI SEO/AI Search Visibility",
    "citations": "AI SEO/AI Citations",
    "reddit": "AI SEO/Reddit Mentions",
    "entities": "AI SEO/Entity Optimization",
    "refresh": "Content Optimization/Content Refresh",
    "decay": "Content Optimization/Content Refresh",
    "gap-analysis": "Content Optimization/Gap Analysis",
    "nlp": "Content Optimization/NLP Optimization",
    "readability": "Content Optimization/Readability",
    "internal-links": "On-page SEO/Internal Linking",
    "linking": "On-page SEO/Internal Linking",
    "title": "On-page SEO/Title",
    "meta-title": "On-page SEO/Title",
    "headings": "On-page SEO/Headings Optimization",
    "image-seo": "On-page SEO/Image SEO",
    "url": "On-page SEO/URL Optimization",
    "ctr": "On-page SEO/CTR Optimization",
    "search-console": "Analytics/Search Console",
    "gsc": "Analytics/Search Console",
    "ga4": "Analytics/Google Analytics",
    "bing": "Analytics/Bing Webmaster Tools",
    "reporting": "Analytics/SEO Reporting",
    "ahrefs": "SEO Tools/Ahrefs",
    "semrush": "SEO Tools/SEMrush",
    "screaming-frog": "SEO Tools/Screaming Frog",
    "hacks": "SEO Wins/150+ SEO Hacks",
    "conversion": "Growth/Conversion Optimization",
    "cro": "Growth/Conversion Optimization",
    "leads": "Growth/Lead Generation",
    "traffic": "Growth/Organic Traffic"
}

BANNER = """===================================================
Everything SEO CLI (Python) v1.3.0
Author: Mushfiqur Rahman Aayan (@beingmushfiq)
Maintainer: DevCenterPoint (https://devcenterpoint.com)
Universal Skill Manager for AI Agents & Developers
===================================================
"""

def print_banner():
    print(BANNER)

def find_skills():
    seo_dir = get_seo_dir()
    if not seo_dir.exists():
        return []
    skills = []
    for disc in sorted(seo_dir.iterdir()):
        if disc.is_dir() and not disc.name.startswith("."):
            for skill_dir in sorted(disc.iterdir()):
                if skill_dir.is_dir() and (skill_dir / "SKILL.md").exists():
                    skills.append({
                        "discipline": disc.name,
                        "name": skill_dir.name,
                        "slug": f"{disc.name}/{skill_dir.name}",
                        "path": skill_dir / "SKILL.md"
                    })
    return skills

def cmd_install_global():
    print_banner()
    print("[*] Initiating Global Installation for AI Agent Harnesses...")
    home = Path.home()
    antigravity_skills = home / ".gemini" / "antigravity" / "skills"
    claude_skills = home / ".claude" / "skills"

    skills = find_skills()
    if not skills:
        print("[ERROR] No skills found to deploy.")
        return

    def deploy_to(target_dir: Path, harness_name: str):
        target_dir.mkdir(parents=True, exist_ok=True)
        count = 0
        for s in skills:
            slug = f"seo-{s['name'].lower().replace(' ', '-').replace('+', '')}"
            dest_dir = target_dir / slug
            dest_dir.mkdir(parents=True, exist_ok=True)
            (dest_dir / "SKILL.md").write_text(s["path"].read_text(encoding="utf-8"), encoding="utf-8")
            count += 1
        print(f" ✔ Deployed {count} skills to {harness_name} ({target_dir})")

    deploy_to(antigravity_skills, "Google Antigravity")
    deploy_to(claude_skills, "Claude Code")
    print(f"\n[PASS] Global agent installation complete ({len(skills)} skills deployed).")

def prompt_preset_choice() -> str:
    print("Select SEO capabilities to install in this workspace:\n")
    print("  1) Complete Library (All 55 Skills)  — All 11 disciplines + Cursor rules (Recommended)")
    print("  2) Essential Starter Pack (5 Skills) — Indexing, RobotsTXT, Page Speed, Schema, AI Visibility")
    print("  3) Next.js / Jamstack (5 Skills)    — Technical Crawling, SSR Schema, Indexing, Speed, Sitemaps")
    print("  4) E-Commerce Preset (5 Skills)     — Product Schema, Faceted URLs, Digital PR, Speed")
    print("  5) B2B SaaS Preset (5 Skills)       — AI Visibility, Entity Coverage, Content Gap, Leads")
    print("  6) Publisher / Media (5 Skills)     — Content Refresh, Entity Coverage, NLP Optimization, Speed\n")

    try:
        choice = input("Enter selection [1-6] (Default: 1): ").strip()
    except (EOFError, KeyboardInterrupt):
        return "all"

    mapping = {
        "2": "starter",
        "3": "nextjs",
        "4": "ecommerce",
        "5": "saas",
        "6": "publisher",
        "1": "all"
    }
    return mapping.get(choice, "all")

def cmd_init(preset_name=None, is_all=False):
    print_banner()
    cwd = Path.cwd()
    print(f"[*] Initializing SEO capabilities in: {cwd}\n")

    active_preset = preset_name
    if is_all:
        active_preset = "all"
    elif not active_preset:
        if sys.stdin.isatty():
            active_preset = prompt_preset_choice()
        else:
            active_preset = "starter"

    agent_skills = cwd / ".agent" / "skills"
    cursor_rules = cwd / ".cursor" / "rules"
    agent_skills.mkdir(parents=True, exist_ok=True)
    cursor_rules.mkdir(parents=True, exist_ok=True)

    preset_file = get_presets_dir() / f"{active_preset.lower()}.json"
    if not preset_file.exists():
        print(f"[ERROR] Preset '{active_preset}' not found. Available: all, starter, nextjs, ecommerce, saas, publisher")
        sys.exit(1)

    with open(preset_file, "r", encoding="utf-8") as f:
        data = json.load(f)
    print(f"\n[PRESET] Applying {data['name']} ({active_preset})...")
    installed_skills = []

    seo_dir = get_seo_dir()
    for skill_rel in data["skills"]:
        clean_rel = skill_rel.replace("SEO/", "").replace("SEO\\", "")
        src = seo_dir / clean_rel / "SKILL.md"
        if not src.exists():
            src = ROOT_DIR / skill_rel / "SKILL.md"

        skill_name = Path(skill_rel).name
        dest = agent_skills / skill_name / "SKILL.md"
        dest.parent.mkdir(parents=True, exist_ok=True)

        if src.exists():
            content = src.read_text(encoding="utf-8")
            dest.write_text(content, encoding="utf-8")
            print(f" + Installed skill: .agent/skills/{skill_name}/SKILL.md")

            # Generate Cursor rule
            slug = skill_name.lower().replace(" ", "-").replace("+", "")
            cursor_rule_content = f"""---
description: "SEO operational skill for {skill_name}"
globs: "**/*"
alwaysApply: false
---

# {skill_name} Rules
Follow operational procedures in .agent/skills/{skill_name}/SKILL.md
"""
            (cursor_rules / f"seo-{slug}.mdc").write_text(cursor_rule_content, encoding="utf-8")
            installed_skills.append(skill_name)

    # Master Router Rule
    router_rule = """---
description: "Master SEO router and triage dispatcher. Activates on any SEO audit, ranking drop, indexation issue, Core Web Vitals, Schema.org markup, or AI search query."
globs: "**/*"
alwaysApply: true
---

# Everything SEO Master Router & Triage Engine
When the user asks an SEO-related question, use this triage matrix to apply the exact operational manual from .agent/skills/<skill>/SKILL.md:

- Indexation, Crawl Status, Canonical Loops, 404s, Noindex Directives:
  -> Read .agent/skills/Indexing/SKILL.md or Crawling/SKILL.md
- Robots.txt Errors, Bot Blocking, RFC 9309 Directive Syntax:
  -> Read .agent/skills/RobotsTXT/SKILL.md
- Schema.org, JSON-LD, Rich Results, Structured Data Errors:
  -> Read .agent/skills/Schema Markup/SKILL.md
- Core Web Vitals, LCP, INP, CLS, Asset Optimization:
  -> Read .agent/skills/Page Speed/SKILL.md
- AI Overviews, Perplexity Citations, ChatGPT Search, GEO Entity Gain:
  -> Read .agent/skills/AI Search Visibility/SKILL.md
- Organic Traffic Decay, Stale Content, SERP Rank Decline:
  -> Read .agent/skills/Content Refresh/SKILL.md
- Hreflang, Multilingual Sites, Multi-Region Targeting:
  -> Read .agent/skills/Hreflang/SKILL.md
- Internal Linking, Orphan Pages, PageRank Distribution:
  -> Read .agent/skills/Internal Linking/SKILL.md
- Title Tags, Meta Descriptions, CTR Anomaly Remediation:
  -> Read .agent/skills/Title/SKILL.md or CTR Optimization/SKILL.md
- Redirect Chains, 301/302 Rules, HTTP-to-HTTPS Loops:
  -> Read .agent/skills/Redirects/SKILL.md
- XML Sitemaps, Sitemap Indexing, Lastmod Hygeine:
  -> Read .agent/skills/XML Sitemaps/SKILL.md
- Search Console Performance, GSC Coverage Errors, Query Clicks:
  -> Read .agent/skills/Search Console/SKILL.md

Follow the 5-phase procedure in the referenced skill manual.
"""
    (cursor_rules / "seo-router.mdc").write_text(router_rule, encoding="utf-8")
    print(" ✔ Configured Master Router: .cursor/rules/seo-router.mdc")

    manifest = cwd / ".everything-seo.json"
    manifest.write_text(json.dumps({
        "version": "1.3.0",
        "preset": active_preset,
        "installed_skills": installed_skills,
        "author": "Mushfiqur Rahman Aayan (@beingmushfiq)",
        "maintainer": "DevCenterPoint"
    }, indent=2), encoding="utf-8")
    print(f"\n[PASS] Project initialized with {len(installed_skills)} skills and Master Router.")

def cmd_triage(query: str):
    print_banner()
    print(f"[*] Running Forensic SEO Triage on Query: \"{query}\"\n")
    q = query.lower()

    triage_map = [
        (["canonical", "index", "noindex", "crawled", "deindexed", "indexing"], "Technical SEO/Indexing", "Indexing", "Diagnoses canonical mismatches, meta robots noindex tags, and GSC coverage failures."),
        (["robot", "robots.txt", "disallow", "block", "user-agent"], "Technical SEO/RobotsTXT", "RobotsTXT", "Validates RFC 9309 compliance and resolves accidental crawler blockages."),
        (["schema", "json-ld", "rich result", "structured data", "microdata", "faq"], "On-page SEO/Schema Markup", "Schema Markup", "Generates valid Schema.org JSON-LD structured data and fixes syntax violations."),
        (["speed", "inp", "lcp", "cls", "core web vitals", "cwv", "slow", "performance", "latency"], "Technical SEO/Page Speed", "Page Speed", "Remediates Core Web Vitals bottlenecks and main-thread long tasks."),
        (["ai", "geo", "perplexity", "overview", "chatgpt", "copilot", "llm", "citation"], "AI SEO/AI Search Visibility", "AI Search Visibility", "Optimizes for Generative Engine Optimization (GEO) and AI search citations."),
        (["redirect", "301", "302", "404", "loop", "chain", "migration"], "Technical SEO/Redirects", "Redirects", "Fixes 301/302 redirect loops, trailing slash anomalies, and migration maps."),
        (["hreflang", "multilingual", "international", "country", "language", "x-default"], "International SEO/Hreflang", "Hreflang", "Builds valid multi-region hreflang XML clusters and prevents regional cannibalization."),
        (["decay", "traffic drop", "lost traffic", "refresh", "old content"], "Content Optimization/Content Refresh", "Content Refresh", "Conducts content decay triage and updates stale ranking assets.")
    ]

    matches = []
    for keywords, skill, name, reason in triage_map:
        if any(k in q for k in keywords):
            matches.append((skill, name, reason))

    if not matches:
        all_skills = find_skills()
        fallback = [s for s in all_skills if q in s["name"].lower() or q in s["discipline"].lower()]
        for fb in fallback[:3]:
            matches.append((fb["slug"], fb["name"], f"Matched keyword terms directly against {fb['name']}."))

    if not matches:
        print(f"No direct single-skill match found for '{query}'.")
        print("Recommended baseline: everything-seo init --preset starter\n")
        return

    print(f"Found {len(matches)} Recommended Operational Skill(s) for this scenario:\n")
    for idx, (skill, name, reason) in enumerate(matches, 1):
        print(f"{idx}. {skill}")
        print(f"   Rationale: {reason}")
        print(f"   Command:   everything-seo add \"{name}\"\n")

def cmd_add(skill_query: str):
    clean_q = skill_query.lower().strip()
    all_skills = find_skills()

    resolved_q = SKILL_ALIASES.get(clean_q, clean_q).lower()
    if clean_q in SKILL_ALIASES:
        print(f"[ALIAS] Resolved '{clean_q}' -> {SKILL_ALIASES[clean_q]}")

    match = next((s for s in all_skills if resolved_q in s["slug"].lower() or resolved_q in s["name"].lower()), None)
    if not match:
        print(f"[ERROR] No skill matching '{skill_query}' found.")
        print("Run 'everything-seo list' to see all 55 available skills, or 'everything-seo triage <symptom>'.")
        sys.exit(1)

    cwd = Path.cwd()
    target_dir = cwd / ".agent" / "skills" / match["name"]
    target_dir.mkdir(parents=True, exist_ok=True)
    (target_dir / "SKILL.md").write_text(match["path"].read_text(encoding="utf-8"), encoding="utf-8")

    cursor_dir = cwd / ".cursor" / "rules"
    cursor_dir.mkdir(parents=True, exist_ok=True)
    slug = match["name"].lower().replace(" ", "-").replace("+", "")
    cursor_rule = f"""---
description: "SEO operational skill for {match['name']}"
globs: "**/*"
alwaysApply: false
---

# {match['name']} Rules
Follow operational procedures in .agent/skills/{match['name']}/SKILL.md
"""
    (cursor_dir / f"seo-{slug}.mdc").write_text(cursor_rule, encoding="utf-8")
    print(f"[PASS] Added skill: {match['slug']}")
    print(f"- Agent skill: .agent/skills/{match['name']}/SKILL.md")
    print(f"- Cursor rule: .cursor/rules/seo-{slug}.mdc\n")

def cmd_search(query):
    print_banner()
    skills = find_skills()
    q = query.lower()
    matches = [s for s in skills if q in s["name"].lower() or q in s["discipline"].lower() or any(q in k and v == s["slug"] for k, v in SKILL_ALIASES.items())]
    print(f"Search Results for '{query}' ({len(matches)} found):\n")
    for m in matches:
        print(f"- {m['discipline']} / {m['name']} ({m['slug']})")

def cmd_list():
    print_banner()
    skills = find_skills()
    print(f"Available Operational Skills ({len(skills)} total across 11 disciplines):\n")
    grouped = {}
    for s in skills:
        grouped.setdefault(s["discipline"], []).append(s["name"])
    for disc, sk_list in grouped.items():
        print(f"📂 {disc} ({len(sk_list)})")
        for sk in sk_list:
            print(f"   └─ {sk}")

def main():
    parser = argparse.ArgumentParser(description="Everything SEO CLI (Python)")
    subparsers = parser.add_subparsers(dest="command")

    # install
    install_parser = subparsers.add_parser("install")
    install_parser.add_argument("--global", action="store_true", dest="is_global")

    # init
    init_parser = subparsers.add_parser("init")
    init_parser.add_argument("--preset", type=str, default=None)
    init_parser.add_argument("--all", action="store_true", dest="is_all")

    # triage
    triage_parser = subparsers.add_parser("triage")
    triage_parser.add_argument("query", type=str, nargs="+")

    # add
    add_parser = subparsers.add_parser("add")
    add_parser.add_argument("skill", type=str, nargs="+")

    # search
    search_parser = subparsers.add_parser("search")
    search_parser.add_argument("query", type=str)

    # list
    subparsers.add_parser("list")

    args = parser.parse_args()

    if args.command == "install":
        cmd_install_global()
    elif args.command == "init":
        cmd_init(args.preset, is_all=args.is_all)
    elif args.command == "triage":
        cmd_triage(" ".join(args.query))
    elif args.command == "add":
        cmd_add(" ".join(args.skill))
    elif args.command == "search":
        cmd_search(args.query)
    elif args.command == "list":
        cmd_list()
    else:
        print_banner()
        parser.print_help()

if __name__ == "__main__":
    main()
