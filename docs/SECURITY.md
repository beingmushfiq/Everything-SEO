# Security Architecture & Threat Model: DevCenterPoint SEO Command Center

## 1. Threat Landscape & Boundary Definition
The SEO Command Center operates an automated web crawler and processes external data feeds (user CSV uploads, external sitemaps, third-party URLs, search APIs). This creates distinct attack surfaces that must be defended systematically:
1. **SSRF (Server-Side Request Forgery)** through malicious crawl target submission.
2. **Denial of Service / Resource Exhaustion** through recursive redirect loops, infinite URL traps, and oversized payload streams.
3. **Data Poisoning / Code Injection** via malicious HTML parsing (e.g. malformed JSON-LD, script execution).
4. **Credential Exposure** of OAuth tokens (Google Search Console, PageSpeed API keys).

---

## 2. Server-Side Request Forgery (SSRF) Defense
Web crawlers must never be permitted to query internal infrastructure or cloud metadata services.

### 2.1 Scheme & Protocol Restriction
- **Allowed Schemes**: Only `http://` and `https://`.
- **Blocked Schemes**: `file://`, `gopher://`, `ftp://`, `php://`, `dict://`, `ssh://`.

### 2.2 Pre-Flight DNS Resolution & IP Range Validation
Before dispatching any HTTP socket:
1. The domain host is resolved via system DNS (`dns_get_record` or `gethostbynamel`).
2. The resolved IPv4 and IPv6 addresses are tested against the CIDR blocklists:
   - `0.0.0.0/8` (Broadcast / current network)
   - `10.0.0.0/8` (Private network RFC 1918)
   - `100.64.0.0/10` (Carrier-grade NAT)
   - `127.0.0.0/8` (Loopback addresses)
   - `169.254.0.0/16` (Link-local & AWS/GCP/Azure Instance Metadata `169.254.169.254`)
   - `172.16.0.0/12` (Private network RFC 1918)
   - `192.168.0.0/16` (Private network RFC 1918)
   - `::1/128`, `fc00::/7`, `fe80::/10` (IPv6 Loopback and Unique Local)
3. If any resolved IP falls within a forbidden range, the request is aborted immediately with a `SecurityException`.
4. **Redirect Re-Validation**: Any HTTP 3xx redirect target URL is subjected to the identical DNS/IP validation pipeline before following.

---

## 3. Crawler Reliability & Rate Limiting
- **Timeout Limits**: Connect timeout = 5 seconds; Read timeout = 10 seconds.
- **Payload Size Capping**: HTTP response headers are checked for `Content-Length`. Any response exceeding 5MB (5,242,880 bytes) is truncated or aborted.
- **Crawl Loop Protection**: URL normalization strips tracking fragments (`#`), normalizes query parameters, and maintains a visited hash map (`sha256(canonical_url)`) to avoid infinite crawl loops (e.g., calendar traps).
- **Domain Scope Enforcement**: The crawler will never traverse off the approved website origin host unless explicitly authorized.

---

## 4. API & Data Security
- **OAuth & API Credentials**: Tokens for Google Search Console and API keys for PageSpeed are stored encrypted at rest using Laravel's `Crypt` (AES-256-CBC) and never transmitted in client responses.
- **Workspace Isolation**: Every database query joins on `workspace_id` through Eloquent Global Scopes or Policy Gates to prevent cross-tenant data leakage.
- **CSV Ingestion Sanitization**: Ingested keyword CSV cells are stripped of leading formula triggers (`=`, `+`, `-`, `@`) to prevent CSV injection (formula injection) in Excel or Sheets.
