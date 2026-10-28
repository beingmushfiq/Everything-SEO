# Roadmap & Milestones: DevCenterPoint SEO Command Center

## Milestone Overview & Acceptance Criteria

### Milestone 1: Workspace Scaffolding & Architecture (In Progress)
- [x] Host environment verified (PHP 8.5, Composer, Node 25, npm, Git).
- [x] Git repository initialized.
- [x] Backend API scaffolded with Laravel 11 (`/api`).
- [x] Frontend scaffolded with React + Vite + TypeScript (`/frontend`).
- [x] Architectural documentation completed (`PRODUCT_SPEC.md`, `ARCHITECTURE.md`, `DATA_MODEL.md`, `SECURITY.md`, `ROADMAP.md`).
- [ ] Application shell and responsive layout functioning.

### Milestone 2: Hardened Crawler & Technical Audit Engine
- [ ] Migrations for `workspaces`, `projects`, `websites`, `crawl_runs`, `crawled_pages`, and `technical_issues`.
- [ ] SSRF defense and IP blocklist service.
- [ ] Crawler service respecting `robots.txt`, sitemaps, timeouts, and page caps.
- [ ] Deterministic technical rule engine (Status codes, redirect chains, titles, descriptions, headings, canonicals, alt attributes, orphans).
- [ ] Crawl execution API endpoint (`POST /api/websites/{id}/crawl`) and status polling.

### Milestone 3: Remediation Workflow, Filters & Reports
- [ ] Issue state transitions: `open` -> `in_progress` -> `resolved` / `ignored`.
- [ ] Filtering issues by severity (`critical`, `warning`, `info`), category, and URL.
- [ ] CSV export generation for crawl reports.
- [ ] Printer-friendly HTML executive summary report with audit score breakdown.

### Milestone 4: Keyword Lab & Content Brief Workspace
- [ ] Robust CSV keyword importer handling varied column nomenclature.
- [ ] Keyword clustering algorithm grouping by search intent and root tokens.
- [ ] Content brief generator drafting target headings, audience, intent, and internal linking targets.
- [ ] Searchable, interactive SEO Knowledge Base with 11 core categories populated with Markdown SOPs.

### Milestone 5: Search Analytics Integrations
- [ ] Google Search Console API service schema & mock/real data sync.
- [ ] CTR performance curve and low-hanging fruit opportunity matrix.
- [ ] Google PageSpeed Insights REST API client schema.

### Milestone 6: Quality Assurance & Verification
- [ ] Automated PHPUnit backend tests for crawler boundaries and rule engine.
- [ ] Frontend build verification (`npm run build`).
- [ ] Live end-to-end verification of site crawl, issue management, and report export.
