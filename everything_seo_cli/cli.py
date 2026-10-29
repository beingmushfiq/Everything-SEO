#!/usr/bin/env python3
"""
Everything SEO Python CLI Entrypoint
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
SEO_DIR = ROOT_DIR / "SEO"
PRESETS_DIR = ROOT_DIR / "templates" / "presets"

BANNER = """===================================================
Everything SEO CLI (Python) v1.1.0 — DevCenterPoint
Universal Skill Manager for AI Agents & Developers
===================================================
"""

def print_banner():
    print(BANNER)

def find_skills():
    if not SEO_DIR.exists():
        return []
    skills = []
    for disc in sorted(SEO_DIR.iterdir()):
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
    antigravity_script = ROOT_DIR / "scripts" / "adapters" / "generate_antigravity_skills.py"
    claude_script = ROOT_DIR / "scripts" / "adapters" / "generate_claude_skills.py"

    if antigravity_script.exists():
        subprocess.run([sys.executable, str(antigravity_script)], check=False)
    if claude_script.exists():
        subprocess.run([sys.executable, str(claude_script)], check=False)
    print("\n[PASS] Global agent installation complete.")

def cmd_init(preset_name=None):
    print_banner()
    cwd = Path.cwd()
    print(f"[*] Initializing SEO capabilities in: {cwd}")

    agent_skills = cwd / ".agent" / "skills"
    cursor_rules = cwd / ".cursor" / "rules"
    agent_skills.mkdir(parents=True, exist_ok=True)
    cursor_rules.mkdir(parents=True, exist_ok=True)

    if preset_name:
        preset_file = PRESETS_DIR / f"{preset_name.lower()}.json"
        if not preset_file.exists():
            print(f"[ERROR] Preset '{preset_name}' not found.")
            sys.exit(1)
        with open(preset_file, "r", encoding="utf-8") as f:
            data = json.load(f)
        print(f"[PRESET] Applying {data['name']}...")
        for skill_rel in data["skills"]:
            src = ROOT_DIR / skill_rel / "SKILL.md"
            skill_name = Path(skill_rel).name
            dest = agent_skills / skill_name / "SKILL.md"
            dest.parent.mkdir(parents=True, exist_ok=True)
            if src.exists():
                dest.write_text(src.read_text(encoding="utf-8"), encoding="utf-8")
                print(f" + Installed: .agent/skills/{skill_name}/SKILL.md")

    manifest = cwd / ".everything-seo.json"
    manifest.write_text(json.dumps({
        "version": "1.1.0",
        "preset": preset_name or "custom",
        "maintainer": "DevCenterPoint"
    }, indent=2), encoding="utf-8")
    print("\n[PASS] Project initialized.")

def cmd_search(query):
    print_banner()
    skills = find_skills()
    q = query.lower()
    matches = [s for s in skills if q in s["name"].lower() or q in s["discipline"].lower()]
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

    # search
    search_parser = subparsers.add_parser("search")
    search_parser.add_argument("query", type=str)

    # list
    subparsers.add_parser("list")

    args = parser.parse_args()

    if args.command == "install":
        cmd_install_global()
    elif args.command == "init":
        cmd_init(args.preset)
    elif args.command == "search":
        cmd_search(args.query)
    elif args.command == "list":
        cmd_list()
    else:
        print_banner()
        parser.print_help()

if __name__ == "__main__":
    main()
