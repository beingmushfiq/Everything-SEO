# Data Model Specification: DevCenterPoint SEO Command Center

## 1. Relational Entity Structure

All database tables follow strict naming conventions, use UUID primary keys or auto-incrementing big integers where appropriate, enforce foreign key integrity with cascading deletes where safe, and maintain `created_at` and `updated_at` timestamps.

---

## 2. Table Definitions

### 2.1 `workspaces`
Tenant boundary for multi-client agency operations.
- `id` (CHAR(36) UUID, PK)
- `name` (VARCHAR(150), NOT NULL)
- `slug` (VARCHAR(150), UNIQUE, NOT NULL)
- `created_at`, `updated_at`

### 2.2 `projects`
Client engagement or internal brand domain container.
- `id` (CHAR(36) UUID, PK)
- `workspace_id` (CHAR(36), FK -> `workspaces.id`, CASCADE)
- `name` (VARCHAR(150), NOT NULL)
- `client_name` (VARCHAR(150), NULLABLE)
- `target_country` (VARCHAR(10), DEFAULT 'US')
- `primary_language` (VARCHAR(10), DEFAULT 'en')
- `objectives` (TEXT, NULLABLE)
- `created_at`, `updated_at`

### 2.3 `websites`
Monitored target website properties.
- `id` (CHAR(36) UUID, PK)
- `project_id` (CHAR(36), FK -> `projects.id`, CASCADE)
- `domain` (VARCHAR(255), NOT NULL)
- `base_url` (VARCHAR(500), NOT NULL)
- `respect_robots` (BOOLEAN, DEFAULT true)
- `max_crawl_pages` (INTEGER, DEFAULT 100)
- `crawl_delay_ms` (INTEGER, DEFAULT 300)
- `last_crawled_at` (TIMESTAMP, NULLABLE)
- `created_at`, `updated_at`
- *Index*: `(project_id, domain)`

### 2.4 `crawl_runs`
An execution instance of a site audit.
- `id` (CHAR(36) UUID, PK)
- `website_id` (CHAR(36), FK -> `websites.id`, CASCADE)
- `trigger_type` (ENUM: 'manual', 'scheduled', 'api', DEFAULT 'manual')
- `status` (ENUM: 'pending', 'crawling', 'completed', 'failed', DEFAULT 'pending')
- `pages_discovered` (INTEGER, DEFAULT 0)
- `pages_crawled` (INTEGER, DEFAULT 0)
- `critical_issues_count` (INTEGER, DEFAULT 0)
- `warning_issues_count` (INTEGER, DEFAULT 0)
- `info_issues_count` (INTEGER, DEFAULT 0)
- `error_message` (TEXT, NULLABLE)
- `started_at` (TIMESTAMP, NULLABLE)
- `completed_at` (TIMESTAMP, NULLABLE)
- `created_at`, `updated_at`
- *Index*: `(website_id, status, created_at)`

### 2.5 `crawled_pages`
Detailed snapshot of individual crawled URLs.
- `id` (CHAR(36) UUID, PK)
- `crawl_run_id` (CHAR(36), FK -> `crawl_runs.id`, CASCADE)
- `url` (VARCHAR(1000), NOT NULL)
- `url_hash` (CHAR(64), NOT NULL) - SHA-256 for fast indexing
- `status_code` (SMALLINT, NOT NULL)
- `content_type` (VARCHAR(100), NULLABLE)
- `load_time_ms` (FLOAT, DEFAULT 0)
- `content_length` (INTEGER, DEFAULT 0)
- `title` (VARCHAR(500), NULLABLE)
- `title_length` (SMALLINT, DEFAULT 0)
- `meta_description` (TEXT, NULLABLE)
- `meta_description_length` (SMALLINT, DEFAULT 0)
- `h1_tags` (JSON, NULLABLE)
- `canonical_url` (VARCHAR(1000), NULLABLE)
- `meta_robots` (VARCHAR(255), NULLABLE)
- `is_indexable` (BOOLEAN, DEFAULT true)
- `inlinks_count` (INTEGER, DEFAULT 0)
- `outlinks_count` (INTEGER, DEFAULT 0)
- `images_without_alt_count` (INTEGER, DEFAULT 0)
- `has_schema` (BOOLEAN, DEFAULT false)
- `schema_types` (JSON, NULLABLE)
- `created_at`, `updated_at`
- *Index*: `(crawl_run_id, url_hash)`, `(crawl_run_id, status_code)`

### 2.6 `technical_issues`
Specific detected defects and warnings linked to pages.
- `id` (CHAR(36) UUID, PK)
- `crawl_run_id` (CHAR(36), FK -> `crawl_runs.id`, CASCADE)
- `crawled_page_id` (CHAR(36), FK -> `crawled_pages.id`, CASCADE)
- `rule_code` (VARCHAR(50), NOT NULL)
- `category` (ENUM: 'crawlability', 'indexability', 'on_page', 'performance', 'security', 'links', NOT NULL)
- `severity` (ENUM: 'critical', 'warning', 'info', NOT NULL)
- `evidence` (TEXT, NOT NULL)
- `explanation` (TEXT, NOT NULL)
- `remediation` (TEXT, NOT NULL)
- `status` (ENUM: 'open', 'in_progress', 'ignored', 'resolved', DEFAULT 'open')
- `assigned_to` (VARCHAR(150), NULLABLE)
- `resolution_notes` (TEXT, NULLABLE)
- `created_at`, `updated_at`
- *Index*: `(crawl_run_id, severity)`, `(crawl_run_id, category)`, `(status)`

### 2.7 `keyword_clusters` & `keywords`
- `keyword_clusters`: `id`, `project_id`, `name`, `intent`, `primary_keyword`
- `keywords`: `id`, `cluster_id`, `keyword`, `search_volume`, `keyword_difficulty`, `cpc`, `search_intent`, `target_url`

### 2.8 `content_briefs`
- `id`, `project_id`, `target_keyword`, `title_draft`, `target_audience`, `search_intent`, `suggested_headings` (JSON), `internal_link_recommendations` (JSON), `status`
