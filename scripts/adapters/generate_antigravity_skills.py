#!/usr/bin/env python3
"""
Deploy Everything SEO skills to Google Antigravity environment.
Maintained by DevCenterPoint (https://devcenterpoint.com)
"""

import sys
import os
import re
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

def get_default_antigravity_dir() -> Path:
    home = Path.home()
    standard_path = home / ".gemini" / "antigravity" / "skills"
    if standard_path.parent.exists():
        return standard_path
    return home / ".gemini" / "skills"

def deploy_to_antigravity(target_dir: Path, use_symlinks: bool = False):
    target_dir.mkdir(parents=True, exist_ok=True)
    count = 0

    for skill_file in sorted(SEO_DIR.glob("*/*/SKILL.md")):
        category = skill_file.parent.parent.name
        skill_name = skill_file.parent.name
        clean_name = re.sub(r'^seo[-\s]+', '', skill_name.strip(), flags=re.IGNORECASE)
        slug = f"seo-{clean_name.lower().replace(' ', '-').replace('+', '')}"

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

def main():
    parser = argparse.ArgumentParser(description="Deploy Everything SEO skills into Google Antigravity")
    default_dir = get_default_antigravity_dir()
    parser.add_argument("--output", "-o", default=str(default_dir), help=f"Target directory (default: {default_dir})")
    parser.add_argument("--symlink", action="store_true", help="Attempt symlinks instead of copying")
    args = parser.parse_args()

    target_dir = Path(args.output).resolve()
    print(f"Deploying skills to Google Antigravity: {target_dir}")

    count = deploy_to_antigravity(target_dir, args.symlink)
    print(f"[PASS] Successfully deployed {count} skills to Google Antigravity.")

if __name__ == "__main__":
    main()

