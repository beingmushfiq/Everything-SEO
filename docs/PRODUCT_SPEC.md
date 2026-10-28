# Product Specification: DevCenterPoint SEO Command Center & Auditor

## 1. Vision & Overview
The **DevCenterPoint SEO Command Center** is an evidence-based SEO operating system designed for modern digital agencies, technical SEO consultants, and growth teams. Instead of relying on opaque "AI visibility scores" or unverified estimates, the platform is grounded in empirical crawl data, server responses, Google Search Console query metrics, and standardized optimization workflows.

The system delivers three core experiences in a unified architecture:
1. **Instant Website SEO Auditor**: A fast, deterministic technical scanner that crawls up to 100 pages, identifies critical crawlability, indexability, on-page, and internal linking defects, and generates lead-converting audit reports.
2. **SEO Command Center**: A multi-client operational dashboard to track long-term technical health, prioritize fixes, manage content briefs, cluster keywords, and track remediation task boards.
3. **SEO Knowledge Base & Playbooks**: A structured markdown-driven playbook engine transforming the 11 subject areas of modern SEO into executable standard operating procedures (SOPs).

---

## 2. Target Users & Personas
- **Agency Technical SEO Lead**: Needs deterministic site audits, sitemap comparison, redirect chain detection, and direct client export deliverables.
- **Content Strategist / SEO Specialist**: Needs keyword clustering from CSV imports, intent tagging, and actionable content briefs with heading and internal link recommendations.
- **Client Stakeholder / Business Owner**: Needs clear, jargon-free health summaries, prioritized fix roadmaps, and verifiable search progress (GSC impressions, clicks, CTR).

---

## 3. Core Feature Specifications

### 3.1 Website Crawler & Technical Audit Engine
- **Target Discovery**: Crawls URLs via internal links (`<a href>`) and XML sitemaps (`/sitemap.xml`, `/sitemap_index.xml`).
- **Security Boundaries**: SSRF defense blocks local loopbacks (`127.0.0.1`), private networks (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), cloud metadata endpoints (`169.254.169.254`), and non-HTTP/HTTPS schemes.
- **Resource Discipline**: Enforces request timeouts (10s), concurrency limits (1-5 concurrent requests), max response size (5MB), and maximum page caps per crawl (default: 100).
- **Robots.txt Adherence**: Parses `robots.txt` directives per User-Agent and respects `Disallow` rules by default.

### 3.2 Technical Audit Rules
1. `TECH_STATUS_4XX`: Broken links or missing resources (404, 410).
2. `TECH_STATUS_5XX`: Web application or server internal errors (500, 502, 503).
3. `TECH_REDIR_CHAIN`: Multiple hops or redirect loops (301 -> 302 -> 200).
4. `ONPAGE_TITLE_MISSING`: Absence of `<title>` tag.
5. `ONPAGE_TITLE_DUPE`: Multiple pages sharing identical title strings.
6. `ONPAGE_DESC_MISSING`: Absence of `<meta name="description">`.
7. `ONPAGE_H1_ABSENT`: Pages lacking a primary `<h1>` element.
8. `ONPAGE_H1_MULTI`: Pages with 2 or more conflicting `<h1>` elements.
9. `INDEX_ROBOTS_NOINDEX`: Presence of `<meta name="robots" content="noindex">` on intended content.
10. `INDEX_CANONICAL_MISMATCH`: Canonical pointing to a non-matching URL.
11. `ONPAGE_IMG_NO_ALT`: Image elements lacking an `alt` attribute.
12. `TECH_ORPHAN_PAGE`: URLs present in XML sitemaps that have 0 inbound internal links.

### 3.3 Action Center & Remediation Board
- Issues transition between statuses: `open` -> `in_progress` -> `resolved` or `ignored` (with required reason).
- Task assignment: Assign issues to team members with priority levels (`critical`, `warning`, `info`) and target completion dates.
- Audit History & Comparison: Track issue counts between subsequent crawl runs to show verified technical debt reduction.

### 3.4 Keyword & Content Workspace
- **CSV Importer**: Ingests keyword data from Semrush, Ahrefs, Google Keyword Planner, or custom CSVs. Fields: `keyword`, `search_volume`, `difficulty`, `intent`, `cpc`, `target_url`.
- **Lexical Clustering Engine**: Groups keywords into topic clusters based on shared root tokens, prefixes, and semantic modifiers.
- **Content Brief Generator**: Produces structured editorial briefs containing recommended titles, target intent, primary and secondary keywords, heading suggestions (`H2`/`H3`), and internal linking targets.

### 3.5 Real Search Analytics (Google Search Console & PageSpeed)
- **GSC Synchronization**: Secure OAuth2 connection pulling daily query and page performance metrics (`impressions`, `clicks`, `ctr`, `average_position`).
- **Low-Hanging Fruit Matrix**: Identifies pages/queries with high impressions (>1,000) but below-average CTR (<2%) to prioritize metadata CTR optimization.
- **PageSpeed Insights**: Pulls Core Web Vitals (LCP, INP, CLS) and diagnostic scores via official Google API.

---

## 4. Non-Functional Requirements
- **Performance**: Sub-50ms API response times for indexed issue queries; client UI renders 1,000+ crawl records with smooth virtualized tables.
- **Reliability**: Crawl tasks execute asynchronously via background queue workers with automatic error logging and retry limits.
- **Security**: No hardcoded API secrets; parameterized queries for all database transactions; strict sanitization of discovered URL strings.
- **Responsive UX**: Fully accessible across desktop, tablet, and mobile with dark/light themes and export-ready print stylesheets.
