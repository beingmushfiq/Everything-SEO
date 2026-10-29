#!/usr/bin/env python3
"""
scripts/validate_skills.py
Everything SEO Skill Library Validator
Maintained by DevCenterPoint

Validates:
1. Existence of all 55 expected skill directories and SKILL.md files.
2. Machine-readable YAML frontmatter (name, description, metadata: category, discipline, version).
3. Section conformance across all 17 standardized sections (A through Q).
4. Substantive content depth (minimum word count thresholds, no empty placeholders).
"""

import os
import re
import sys

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

try:
    import yaml
    HAS_YAML = True
except ImportError:
    HAS_YAML = False

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SEO_DIR = os.path.join(ROOT_DIR, "SEO")

EXPECTED_TAXONOMY = {
    "Keyword Research": [
        "Keyword Discovery",
        "Long-tail Keywords",
        "Low-competition Keywords",
        "Search Volume",
        "SERP Analysis"
    ],
    "On-page SEO": [
        "Title",
        "Headings Optimization",
        "URL Optimization",
        "Image SEO",
        "Internal Linking",
        "Schema Markup",
        "CTR Optimization"
    ],
    "Content Optimization": [
        "Gap Analysis",
        "NLP Optimization",
        "Entity Coverage",
        "Content Refresh",
        "Readability"
    ],
    "Technical SEO": [
        "Crawling",
        "Indexing",
        "XML Sitemaps",
        "RobotsTXT",
        "Redirects",
        "Page Speed",
        "Log File Analysis"
    ],
    "Link Building": [
        "Digital PR",
        "Guest Posting",
        "Broken Link Building",
        "Unlinked Brand Mentions",
        "Linkable Assets",
        "HARO"
    ],
    "AI SEO": [
        "AI Search Visibility",
        "Entity Optimization",
        "AI Citations",
        "Reddit Mentions",
        "3rd Party Mentions"
    ],
    "International SEO": [
        "Hreflang",
        "Multilingual SEO",
        "Translation SEO"
    ],
    "Analytics": [
        "Search Console",
        "Bing Webmaster Tools",
        "Google Analytics",
        "SEO Reporting"
    ],
    "SEO Tools": [
        "Ahrefs",
        "SEMrush",
        "Keywords Everywhere",
        "Screaming Frog",
        "SEO Orchestrator"
    ],
    "SEO Wins": [
        "150+ SEO Hacks",
        "AI SEO Hacks",
        "Traffic Growth",
        "Backlinks Hacks"
    ],
    "Growth": [
        "Organic Traffic",
        "Lead Generation",
        "Conversion Optimization",
        "Revenue Growth",
        "SEO Scaling"
    ]
}

REQUIRED_SECTIONS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q"]
MIN_WORD_COUNT = 800

def parse_frontmatter(content):
    if not content.startswith("---"):
        return None, "File does not start with '---'"
    parts = content.split("---", 2)
    if len(parts) < 3:
        return None, "YAML frontmatter not terminated with '---'"
    raw_yaml = parts[1]
    
    if HAS_YAML:
        try:
            data = yaml.safe_load(raw_yaml)
            if not isinstance(data, dict):
                return None, "Frontmatter does not parse as a dictionary"
            return data, "OK"
        except Exception as e:
            return None, f"YAML parse error: {e}"
    else:
        # Fallback simple parser
        data = {}
        for line in raw_yaml.splitlines():
            line = line.strip()
            if ":" in line:
                k, v = line.split(":", 1)
                data[k.strip()] = v.strip()
        return data, "OK (regex fallback)"

def validate_frontmatter(data):
    errors = []
    if not data.get("name"):
        errors.append("Missing 'name' field")
    if not data.get("description"):
        errors.append("Missing 'description' field")
    if not data.get("metadata"):
        errors.append("Missing 'metadata' object")
    elif isinstance(data.get("metadata"), dict):
        meta = data["metadata"]
        if not meta.get("category"):
            errors.append("Missing 'metadata.category'")
        if not meta.get("discipline"):
            errors.append("Missing 'metadata.discipline'")
        if not meta.get("version"):
            errors.append("Missing 'metadata.version'")
    return errors

def validate_skill_file(file_path):
    issues = []
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Frontmatter
    data, msg = parse_frontmatter(content)
    if not data:
        issues.append(f"Frontmatter Error: {msg}")
    else:
        fm_errors = validate_frontmatter(data)
        if fm_errors:
            issues.extend([f"Frontmatter: {e}" for e in fm_errors])

    # 2. Sections A through Q
    missing_sections = []
    for letter in REQUIRED_SECTIONS:
        pattern = rf'##\s+(?:Section\s+)?{letter}[\.\:\s]'
        if not re.search(pattern, content):
            missing_sections.append(letter)
    if missing_sections:
        issues.append(f"Missing mandatory sections: {missing_sections}")

    # 3. Word Count
    words = len(content.split())
    if words < MIN_WORD_COUNT:
        issues.append(f"Word count {words} below threshold {MIN_WORD_COUNT}")

    # 4. Check for unreplaced template placeholders
    placeholders = re.findall(r'\[(?:TODO|REPLACE_ME|INSERT_HERE)\]', content, re.IGNORECASE)
    if placeholders:
        issues.append(f"Contains unreplaced placeholders: {placeholders}")

    return issues, words

def main():
    print("=" * 70)
    print("EVERYTHING SEO: AUTOMATED SKILL VALIDATOR")
    print("=" * 70)

    total_expected = sum(len(skills) for skills in EXPECTED_TAXONOMY.values())
    total_found = 0
    total_valid = 0
    all_word_counts = []

    has_failures = False

    for discipline, skills in EXPECTED_TAXONOMY.items():
        print(f"\n[DISCIPLINE] {discipline} ({len(skills)} skills):")
        for skill in skills:
            skill_dir = os.path.join(SEO_DIR, discipline, skill)
            skill_path = os.path.join(skill_dir, "SKILL.md")

            if not os.path.exists(skill_path):
                print(f"  [MISSING] {skill}: SKILL.md NOT FOUND")
                has_failures = True
                continue

            total_found += 1
            issues, words = validate_skill_file(skill_path)
            all_word_counts.append(words)

            if issues:
                print(f"  [FAIL] {skill} ({words:,} words):")
                for issue in issues:
                    print(f"      - {issue}")
                has_failures = True
            else:
                print(f"  [PASS] {skill} ({words:,} words)")
                total_valid += 1

    print("\n" + "=" * 70)
    print("VALIDATION SUMMARY")
    print("=" * 70)
    print(f"Expected Skills: {total_expected}")
    print(f"Found on Disk:   {total_found}")
    print(f"Passed All Checks: {total_valid} / {total_expected}")

    if all_word_counts:
        avg_words = sum(all_word_counts) / len(all_word_counts)
        print(f"Total Word Count: {sum(all_word_counts):,} words")
        print(f"Average Words/Skill: {avg_words:,.0f} words")

    if has_failures or total_valid < total_expected:
        print("\n[RESULT] FAILED: One or more skills did not satisfy the authoring standard.")
        sys.exit(1)
    else:
        print("\n[RESULT] PASSED: 100% of skills are valid, substantive, and compliant.")
        sys.exit(0)

if __name__ == "__main__":
    main()
