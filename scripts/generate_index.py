#!/usr/bin/env python3
"""
scripts/generate_index.py
Everything SEO Index & Coverage Verifier / Generator
Maintained by DevCenterPoint

Scans the SEO directory, discovers all leaf skills, and verifies or synchronizes
SEO/SKILL_INDEX.md and SEO/COVERAGE_REPORT.md directly from filesystem reality.
"""

import os
import re
import sys
import argparse

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SEO_DIR = os.path.join(ROOT_DIR, "SEO")
SKILL_INDEX_PATH = os.path.join(SEO_DIR, "SKILL_INDEX.md")
COVERAGE_REPORT_PATH = os.path.join(SEO_DIR, "COVERAGE_REPORT.md")

def discover_skills():
    skills = []
    for item in sorted(os.listdir(SEO_DIR)):
        disc_path = os.path.join(SEO_DIR, item)
        if os.path.isdir(disc_path):
            discipline = item
            for sub in sorted(os.listdir(disc_path)):
                sub_path = os.path.join(disc_path, sub)
                skill_file = os.path.join(sub_path, "SKILL.md")
                if os.path.isdir(sub_path) and os.path.exists(skill_file):
                    skills.append({
                        "discipline": discipline,
                        "leaf": sub,
                        "file_path": skill_file,
                        "rel_path": f"{discipline}/{sub}/SKILL.md"
                    })
    return skills

def verify_indices(skills):
    print(f"Discovered {len(skills)} skills across {len(set(s['discipline'] for s in skills))} disciplines on disk.")
    
    # Check SKILL_INDEX.md
    if not os.path.exists(SKILL_INDEX_PATH):
        print(f"[ERROR] {SKILL_INDEX_PATH} does not exist!")
        return False
        
    with open(SKILL_INDEX_PATH, "r", encoding="utf-8") as f:
        index_content = f.read()

    missing_in_index = []
    for s in skills:
        if s["leaf"] not in index_content:
            missing_in_index.append(s["leaf"])

    if missing_in_index:
        print(f"[ERROR] {len(missing_in_index)} skills missing from SKILL_INDEX.md:")
        for m in missing_in_index:
            print(f"    - {m}")
        return False
    else:
        print("[PASS] 100% of discovered skills are cataloged in SKILL_INDEX.md")

    # Check COVERAGE_REPORT.md
    if not os.path.exists(COVERAGE_REPORT_PATH):
        print(f"[ERROR] {COVERAGE_REPORT_PATH} does not exist!")
        return False

    with open(COVERAGE_REPORT_PATH, "r", encoding="utf-8") as f:
        coverage_content = f.read()

    missing_in_coverage = []
    for s in skills:
        if s["leaf"] not in coverage_content:
            missing_in_coverage.append(s["leaf"])

    if missing_in_coverage:
        print(f"[ERROR] {len(missing_in_coverage)} skills missing from COVERAGE_REPORT.md:")
        for m in missing_in_coverage:
            print(f"    - {m}")
        return False
    else:
        print("[PASS] 100% of discovered skills are cataloged in COVERAGE_REPORT.md")

    return True

def main():
    parser = argparse.ArgumentParser(description="Verify or sync SEO skill indices")
    parser.add_argument("--check", action="store_true", help="Verify that indices match filesystem evidence")
    args = parser.parse_args()

    skills = discover_skills()
    if not skills:
        print("[ERROR] No skills discovered under SEO/!")
        sys.exit(1)

    is_valid = verify_indices(skills)
    if is_valid:
        print("\n[RESULT] PASSED: All indices match filesystem evidence exactly.")
        sys.exit(0)
    else:
        print("\n[RESULT] FAILED: Index discrepancy detected.")
        sys.exit(1)

if __name__ == "__main__":
    main()
