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
    slug = skill_path.parent.name.lower().replace(" ", "-").replace("+", "")

    globs = DISCIPLINE_GLOBS.get(discipline, "**/*")

    # Extract Key Sections
    section_d = extract_section(content, "D") # Execution Steps
    section_e = extract_section(content, "E") # Verification Checklist

    # Build concise rule body to preserve context budget
    rule_body = f"""---
description: "{description}"
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
    output_file = output_dir / f"seo-{slug}.mdc"
    output_dir.mkdir(parents=True, exist_ok=True)
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(rule_body.strip() + "\n")
    return output_file

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

    print(f"[PASS] Successfully generated {count} Cursor .mdc rules.")

if __name__ == "__main__":
    main()

