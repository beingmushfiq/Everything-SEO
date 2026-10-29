#!/usr/bin/env python3
"""
Reference Telemetry Connector: Google Search Console (GSC) API
Maintained by DevCenterPoint (https://devcenterpoint.com)

Fetches organic search performance data (Clicks, Impressions, CTR, Position)
and exports directly into deliverable matrix format.
"""

import sys
import json
import argparse
from pathlib import Path

# Ensure UTF-8 output
if sys.stdout.encoding is None or sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except AttributeError:
        pass

def format_as_matrix(rows: list) -> str:
    lines = [
        "| Query / Page | Clicks | Impressions | Organic CTR | Avg Position |",
        "| :--- | :---: | :---: | :---: | :---: |"
    ]
    for r in rows:
        keys = " / ".join(r.get("keys", []))
        clicks = r.get("clicks", 0)
        impressions = r.get("impressions", 0)
        ctr = f"{r.get('ctr', 0.0) * 100:.2f}%"
        pos = f"{r.get('position', 0.0):.1f}"
        lines.append(f"| {keys} | {clicks} | {impressions} | {ctr} | {pos} |")
    return "\n".join(lines)

def main():
    parser = argparse.ArgumentParser(description="Google Search Console Telemetry Connector")
    parser.add_argument("--json-dump", help="Path to local GSC API JSON response dump for offline processing")
    args = parser.parse_args()

    if args.json_dump:
        p = Path(args.json_dump)
        if not p.exists():
            print(f"[ERROR] File not found: {p}")
            sys.exit(1)
        data = json.loads(p.read_text(encoding="utf-8"))
        rows = data.get("rows", [])
        matrix = format_as_matrix(rows)
        print("=== Formatted GSC Performance Matrix ===\n")
        print(matrix)
    else:
        print("=== Google Search Console Telemetry Connector ===")
        print("Usage:")
        print("  python scripts/connectors/gsc_connector.py --json-dump path/to/gsc_export.json")
        print("\nTo connect live to Google Search Console API:")
        print("  1. Export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json")
        print("  2. Request scopes: https://www.googleapis.com/auth/webmasters.readonly")

if __name__ == "__main__":
    main()

