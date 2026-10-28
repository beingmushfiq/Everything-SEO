# 🛠️ Technical SEO Forensic Audit Report Template

> **Domain Audited:** `[https://example.com]`  
> **Audit Date:** `[YYYY-MM-DD]`  
> **Lead Auditor:** `[Auditor Name / AI Agent ID]`  
> **Total URLs Crawled:** `[Count, e.g. 45,000]`  
> **Reference Skill:** [Crawling](../SEO/Technical%20SEO/Crawling/SKILL.md) & [Indexing](../SEO/Technical%20SEO/Indexing/SKILL.md)

---

## 1. Executive Summary & Critical Findings
Provide a high-level summary of the domain's technical health, crawl budget efficiency, and indexation integrity.

### Critical Vulnerability Summary
- **P0 Blocker**: `[e.g., Staging environment accidentally indexed due to missing HTTP basic auth]`
- **P0 Blocker**: `[e.g., Faceted navigation parameters exhausting 80% of crawl budget]`
- **P1 Major Defect**: `[e.g., Canonical mismatch between Cloudflare header and HTML DOM]`
- **P1 Major Defect**: `[e.g., 301 redirect chains exceeding 3 hops on core legacy URLs]`

---

## 2. Server Access Log & Crawl Budget Forensics
- **Log Sample Window**: `[e.g., 30 Days / 500,000 log events]`
- **Verified Googlebot Requests**: `[Count / % of total requests]`
- **Googlebot Clean Crawl Ratio**: `[Clean Canonical URLs Crawled / Total Crawled %]`
- **Crawl Trap Analysis**:
  - Identified crawl traps: `[e.g., faceted sorting, session IDs, internal search results]`
  - Estimated wasted crawl bandwidth: `[% of requests]`

---

## 3. Indexation & Canonicalization Matrix
| URL Path | HTTP Status | Meta Robots | Canonical Tag (DOM) | Canonical Header | GSC Indexing Status | Severity | Action Required |
| :--- | :---: | :--- | :--- | :--- | :--- | :---: | :--- |
| `[/path/example-1/]` | `200` | `index, follow` | `[/path/example-1/]` | `None` | `Indexed` | `Clean` | None |
| `[/path/example-2/]` | `200` | `noindex` | `[/path/example-2/]` | `None` | `Excluded` | `P0` | Remove accidental noindex |
| `[/path/example-3/]` | `301` | `None` | `None` | `None` | `Page with redirect` | `P1` | Compress redirect chain |

---

## 4. Robots.txt & Directives Compliance
- **Robots.txt Location**: `[https://example.com/robots.txt]`
- **RFC 9309 Validation**: `[Pass / Fail]`
- **Blocked Resource Audit**: Confirm no essential CSS, JS, or image resources are disallowed.
- **Recommended Robots.txt Patch**:
  ```robots.txt
  # Proposed directives
  User-agent: *
  Disallow: /admin/
  Disallow: /api/
  Disallow: /*?*sort=
  Allow: /assets/
  Sitemap: https://example.com/sitemap.xml
  ```

---

## 5. Core Web Vitals (CWV) Performance Assessment
Field data extracted from Chrome User Experience Report (CrUX) and PageSpeed Insights:

| Vital Metric | Desktop 75th % | Mobile 75th % | Google Threshold | Audit Status | Root Cause & Remediation |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **LCP (Largest Contentful Paint)** | `[1.4s]` | `[3.8s]` | `< 2.5s` | `[Fail (Mobile)]` | Uncompressed hero image; preload `<link rel="preload">` |
| **INP (Interaction to Next Paint)** | `[85ms]` | `[310ms]` | `< 200ms` | `[Fail (Mobile)]` | Heavy main-thread JS execution on menu click; debounce state |
| **CLS (Cumulative Layout Shift)** | `[0.02]` | `[0.18]` | `< 0.10` | `[Fail (Mobile)]` | Ad banner dynamic insertion without fixed CSS container height |

---

## 6. Implementation Action Plan & Prioritization
| Remediation Task | Responsible Team | Engineering Effort | Business Impact | Target Deploy Date |
| :--- | :--- | :---: | :---: | :---: |
| Deploy updated Robots.txt to block faceted filters | DevOps / Infrastructure | Low | High (P0) | `[YYYY-MM-DD]` |
| Resolve canonical header mismatch in CDN edge rules | Back-end Engineering | Medium | High (P0) | `[YYYY-MM-DD]` |
| Preload hero images & defer non-critical analytics | Front-end Engineering | Medium | Medium (P1) | `[YYYY-MM-DD]` |
