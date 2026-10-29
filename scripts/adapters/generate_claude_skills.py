#!/usr/bin/env python3
"""
Generate Claude Code skills and CLAUDE.md integration from canonical Everything SEO skills.
Maintained by DevCenterPoint (https://devcenterpoint.com)
"""

import sys
import os
import shutil
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

def copy_or_link_skills(target_dir: Path, use_symlinks: bool = False):
    target_dir.mkdir(parents=True, exist_ok=True)
    count = 0

    for skill_file in sorted(SEO_DIR.glob("*/*/SKILL.md")):
        category = skill_file.parent.parent.name
        skill_name = skill_file.parent.name
        slug = f"seo-{skill_name.lower().replace(' ', '-').replace('+', '')}"
        
        dest_folder = target_dir / slug
        dest_folder.mkdir(parents=True, exist_ok=True)
        dest_file = dest_folder / "SKILL.md"

        if use_symlinks:
            try:
                if dest_file.exists() or dest_file.is_symlink():
                    dest_file.unlink()
                dest_file.symlink_to(skill_file.resolve())
            except (OSError, NotImplementedError):
                shutil.copy2(skill_file, dest_file)
        else:
            shutil.copy2(skill_file, dest_file)
        
        count += 1

    return count

def generate_claude_md_snippet() -> str:
    return """
<!-- EVERYTHING SEO INTEGRATION BLOCK (DevCenterPoint) -->
## 🔍 SEO Auditing & Optimization Commands
- Validate SEO skills: `python scripts/validate_skills.py`
- Check links: `python scripts/check_links.py`
- SEO Skill Manuals: Located in `.claude/skills/seo-*/SKILL.md`
- Core Disciplines: Technical SEO, Schema Markup, AI Search Visibility, Page Speed, Entity Coverage
<!-- END EVERYTHING SEO INTEGRATION BLOCK -->
"""

def main():
    parser = argparse.ArgumentParser(description="Generate Claude Code skills from Everything SEO library")
    parser.add_argument("--output", "-o", default=str(ROOT_DIR / ".claude" / "skills"), help="Output directory")
    parser.add_argument("--symlink", action="store_true", help="Use symlinks instead of copying")
    parser.add_argument("--append-claude-md", type=str, default="", help="Path to CLAUDE.md to append commands to")
    args = parser.parse_args()

    output_dir = Path(args.output).resolve()
    print(f"Deploying Claude Code skills into: {output_dir}")

    count = copy_or_link_skills(output_dir, args.symlink)
    print(f"[PASS] Successfully deployed {count} Claude Code skills.")

    if args.append_claude_md:
        target_claude_md = Path(args.append_claude_md).resolve()
        snippet = generate_claude_md_snippet()
        with open(target_claude_md, "a", encoding="utf-8") as f:
            f.write(snippet)
        print(f"[PASS] Appended SEO commands to {target_claude_md}")

if __name__ == "__main__":
    main()

