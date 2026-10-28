# DevCenterPoint SEO Command Center & Operating System

> An evidence-based, production-grade SEO operations platform and website auditor engineered for digital agencies, technical SEO specialists, and growth consultants.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![PHP](https://img.shields.io/badge/PHP-8.3%2B-777BB4.svg)
![Laravel](https://img.shields.io/badge/Laravel-11%2B-FF2D20.svg)
![React](https://img.shields.io/badge/React-18-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg)

---

## 🚀 Key Capabilities

### 1. Hardened Website Crawler & Technical SEO Auditor
- **Deterministic Rule Engine**: Inspects HTTP status codes (4xx, 5xx), redirect chains, missing/duplicate `<title>` tags, meta descriptions, multi-`<h1>` anomalies, canonical tag conflicts, missing image alt attributes, and orphan pages.
- **SSRF Defense Architecture**: Restricts crawls to public addresses, actively blocking RFC 1918 private subnets, cloud metadata endpoints (`169.254.169.254`), and non-HTTP protocols.
- **Sitemap & Robots.txt Integration**: Parses robots.txt directives and compares XML sitemaps against crawl discoveries to detect orphan pages.

### 2. Multi-Tenant SEO Command Center
- **Workspace & Project Hierarchy**: Segment websites by client, market, target country, and primary language.
- **Remediation Action Board**: Convert technical audit findings into actionable tasks with statuses (`open`, `in_progress`, `ignored`, `resolved`), team assignments, and resolution notes.
- **Client-Ready Reports**: Instant generation of structured CSV datasets and printer-friendly HTML executive summaries for lead generation and client reviews.

### 3. Keyword Lab & Content Brief Generator
- **CSV Ingestion**: Ingests keyword research exports from Semrush, Ahrefs, or Google Keyword Planner with zero metric fabrication.
- **Intent & Token Clustering**: Automatically categorizes keywords into semantic clusters and intent buckets (Informational, Commercial, Transactional, Navigational).
- **Structured Content Briefs**: Generate editorial briefs specifying target keywords, audience, heading hierarchy (`H2`/`H3`), and internal link recommendations.

### 4. Real Search Analytics (GSC & Core Web Vitals)
- **Search Console Connector**: Idempotent synchronization of queries, clicks, impressions, CTR, and positions.
- **CTR Opportunity Curve**: Automatically highlights pages with strong impression footprints but sub-par CTR.
- **PageSpeed Insights**: Pulls Core Web Vitals (LCP, INP, CLS) directly from official Google APIs.

### 5. Interactive SEO Knowledge Base
- Complete repository of standard operating procedures, audit checklists, and ethical experiment templates covering all 11 disciplines of modern SEO.

---

## 🛠️ Tech Stack
- **Backend API**: Laravel 11 / PHP 8.3+ (Service-Repository Architecture)
- **Frontend SPA**: React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, Recharts
- **Database**: SQLite (Zero-config local development & tests) / MySQL 8.0 (Production)
- **Crawler**: Custom PHP cURL asynchronous pipeline with SSRF pre-flight validation

---

## 🏁 Quickstart Guide

### 1. Backend Setup
```bash
cd api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve --port=8000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to access the Command Center.

---

## 📚 Documentation
- [Product Specification](docs/PRODUCT_SPEC.md)
- [System Architecture](docs/ARCHITECTURE.md)
- [Data Model & Schema](docs/DATA_MODEL.md)
- [Security Threat Model](docs/SECURITY.md)
- [Engineering Roadmap](docs/ROADMAP.md)
