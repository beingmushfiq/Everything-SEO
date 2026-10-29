#!/usr/bin/env python3
"""
Generate GitHub Copilot and Windsurf SEO instruction blocks.
Maintained by DevCenterPoint (https://devcenterpoint.com)
"""

import sys
import argparse
from pathlib import Path

# Ensure UTF-8 output encoding across Windows and POSIX
if sys.stdout.encoding is None or sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except AttributeError:
        pass

ROOT_DIR = Path(__file__).resolve().parent.parent.parent

COPILOT_INSTRUCTIONS = """# SEO Engineering Standards (Everything SEO by DevCenterPoint)

Follow these deterministic rules whenever writing or refactoring web pages, components, templates, or server routes:

1. **RFC 9110 HTTP Status Standards**:
   - Use HTTP 200 OK for canonical indexable pages.
   - Use HTTP 301 Permanent Redirect for permanent relocations; always preserve query strings where applicable.
   - Use HTTP 404/410 for decommissioned resources; never serve soft-404s (200 OK with error body).

2. **Semantic HTML & Metadata**:
   - Every page template must expose unique, descriptive `<title>` and `<meta name="description">` tags.
   - Render a self-referential `<link rel="canonical" href="...">` on all indexable URLs.
   - Never combine `noindex` with a 301/302 redirect header.

3. **Structured Data (Schema.org JSON-LD)**:
   - Always inject Schema.org structured data via `<script type="application/ld+json">` in `<head>`.
   - Validate that required fields are present (e.g. `headline`, `author`, `datePublished` for `Article`; `name`, `offers` for `Product`).

4. **Core Web Vitals & Assets**:
   - Ensure all `<img>` tags declare `width`, `height`, and descriptive `alt` attributes.
   - Mark hero / LCP images with `fetchpriority="high"` and avoid lazy loading above the fold.
   - Defer non-critical JavaScript to prevent Interaction to Next Paint (INP) degradation.

*Reference manual: https://github.com/beingmushfiq/Everything-SEO*
"""

WINDSURF_RULES = """# Everything SEO Rules for Windsurf / Cascade
- Adhere strictly to RFC 9309 for robots.txt syntax.
- Enforce lowercase kebab-case paths for all generated URLs.
- Always validate that structured data is rendered as valid JSON-LD.
- When generating headings, maintain strict semantic hierarchy (H1 -> H2 -> H3) with zero skips.
"""

def main():
    parser = argparse.ArgumentParser(description="Generate Copilot and Windsurf instruction files")
    parser.add_argument("--copilot-path", default=str(ROOT_DIR / ".github" / "copilot-instructions.md"))
    parser.add_argument("--windsurf-path", default=str(ROOT_DIR / ".windsurfrules"))
    args = parser.parse_args()

    copilot_file = Path(args.copilot_path).resolve()
    copilot_file.parent.mkdir(parents=True, exist_ok=True)
    with open(copilot_file, "w", encoding="utf-8") as f:
        f.write(COPILOT_INSTRUCTIONS.strip() + "\n")
    print(f"[PASS] Generated Copilot instructions: {copilot_file}")

    windsurf_file = Path(args.windsurf_path).resolve()
    with open(windsurf_file, "w", encoding="utf-8") as f:
        f.write(WINDSURF_RULES.strip() + "\n")
    print(f"[PASS] Generated Windsurf rules: {windsurf_file}")

if __name__ == "__main__":
    main()

