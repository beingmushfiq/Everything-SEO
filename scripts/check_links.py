#!/usr/bin/env python3
"""
scripts/check_links.py
Everything SEO Internal Link Verifier
Maintained by DevCenterPoint

Verifies that 100% of internal relative Markdown links across the repository
resolve to actual existing files on disk offline.
"""

import os
import re
import sys
import urllib.parse

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

IGNORE_DIRS = {".git", ".pytest_cache", "__pycache__", "venv", ".venv", "env", "node_modules", "internal", ".agent"}

def extract_internal_links(content):
    # Matches [link text](target_url)
    matches = re.findall(r'\[([^\]]+)\]\(([^)]+)\)', content)
    internal_links = []
    for text, link in matches:
        link_clean = link.strip().split('#')[0] # Remove URL fragment/anchor
        if not link_clean:
            continue
        if link_clean.startswith(('http://', 'https://', 'mailto:', 'ftp://', 'tel:')):
            continue
        internal_links.append((text, link_clean))
    return internal_links

def check_file_links(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    links = extract_internal_links(content)
    broken = []
    file_dir = os.path.dirname(file_path)

    for text, link in links:
        decoded_link = urllib.parse.unquote(link)
        # Handle links starting with / as relative to repository root
        if decoded_link.startswith('/'):
            target_path = os.path.normpath(os.path.join(ROOT_DIR, decoded_link.lstrip('/')))
        else:
            target_path = os.path.normpath(os.path.join(file_dir, decoded_link))

        if not os.path.exists(target_path):
            broken.append((link, target_path))

    return len(links), broken

def main():
    print("=" * 70)
    print("EVERYTHING SEO: OFFLINE INTERNAL LINK VERIFIER")
    print("=" * 70)
    print(f"Scanning root: {ROOT_DIR}\n")

    total_files_scanned = 0
    total_links_checked = 0
    total_broken_links = 0
    files_with_broken_links = {}

    for root, dirs, files in os.walk(ROOT_DIR):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for file in files:
            if file.endswith(".md"):
                file_path = os.path.join(root, file)
                total_files_scanned += 1
                link_count, broken = check_file_links(file_path)
                total_links_checked += link_count

                if broken:
                    total_broken_links += len(broken)
                    rel_file = os.path.relpath(file_path, ROOT_DIR)
                    files_with_broken_links[rel_file] = broken

    print(f"Total Markdown Files Scanned: {total_files_scanned}")
    print(f"Total Internal Links Checked: {total_links_checked}")

    if files_with_broken_links:
        print(f"\n[ERROR] FOUND {total_broken_links} BROKEN LINKS IN {len(files_with_broken_links)} FILES:\n")
        for rel_file, broken_list in files_with_broken_links.items():
            print(f"  [FILE] {rel_file}:")
            for raw_link, resolved_path in broken_list:
                print(f"      - Link '{raw_link}' -> Target '{resolved_path}' NOT FOUND")
        print("\n[RESULT] FAILED: Internal link resolution check failed.")
        sys.exit(1)
    else:
        print(f"\n[PASS] All {total_links_checked} internal links successfully resolved to valid files on disk!")
        print("\n[RESULT] PASSED: 100% link integrity verified.")
        sys.exit(0)

if __name__ == "__main__":
    main()
