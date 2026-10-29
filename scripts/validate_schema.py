#!/usr/bin/env python3
"""
Offline Schema.org JSON-LD Structured Data Validator
Maintained by DevCenterPoint (https://devcenterpoint.com)
"""

import sys
import os
import json
import argparse
from pathlib import Path

# Ensure UTF-8 output
if sys.stdout.encoding is None or sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except AttributeError:
        pass

SCHEMA_MANDATORY_FIELDS = {
    "Article": ["headline", "author", "datePublished"],
    "NewsArticle": ["headline", "author", "datePublished", "publisher"],
    "Product": ["name", "offers"],
    "Offer": ["price", "priceCurrency"],
    "Organization": ["name", "url"],
    "LocalBusiness": ["name", "address"],
    "FAQPage": ["mainEntity"],
    "Question": ["name", "acceptedAnswer"],
    "Answer": ["text"],
    "BreadcrumbList": ["itemListElement"],
    "ListItem": ["position", "name", "item"]
}

def validate_dict(data: dict) -> dict:
    errors = []
    warnings = []

    ctx = data.get("@context")
    if not ctx or "schema.org" not in str(ctx):
        errors.append("Invalid or missing '@context'. Must be 'https://schema.org'.")

    s_type = data.get("@type")
    if not s_type:
        errors.append("Missing required '@type' property.")
    else:
        req_fields = SCHEMA_MANDATORY_FIELDS.get(s_type, [])
        for field in req_fields:
            if field not in data:
                warnings.append(f"Type '{s_type}' is missing recommended/required property '{field}'.")

    return {
        "valid": len(errors) == 0,
        "type": s_type or "Unknown",
        "errors": errors,
        "warnings": warnings,
        "properties": list(data.keys())
    }

def main():
    parser = argparse.ArgumentParser(description="Offline Schema.org JSON-LD Validator")
    parser.add_argument("file_or_string", help="Path to JSON file or raw JSON string")
    args = parser.parse_args()

    input_arg = args.file_or_string
    path = Path(input_arg)
    if path.exists() and path.is_file():
        content = path.read_text(encoding="utf-8")
    else:
        content = input_arg

    try:
        data = json.loads(content)
    except json.JSONDecodeError as e:
        print(f"[FAIL] Invalid JSON syntax: {e}")
        sys.exit(1)

    items = data if isinstance(data, list) else [data]
    total_valid = 0

    for i, item in enumerate(items):
        if not isinstance(item, dict):
            continue
        res = validate_dict(item)
        print(f"\n--- Entity #{i+1} [@type: {res['type']}] ---")
        if res["valid"]:
            print(f"[PASS] Syntax and core attributes valid.")
            total_valid += 1
        else:
            for err in res["errors"]:
                print(f"[ERROR] {err}")
        for w in res["warnings"]:
            print(f"[WARN]  {w}")

    print(f"\nSummary: {total_valid}/{len(items)} schema entities passed validation.")
    sys.exit(0 if total_valid == len(items) else 1)

if __name__ == "__main__":
    main()
