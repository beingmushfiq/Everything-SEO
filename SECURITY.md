# 🛡️ Security Policy

> **Maintained by:** DevCenterPoint  
> **Project:** Everything SEO

We take the security, integrity, and safety of the **Everything SEO** library and its users seriously.

---

## 🔒 Supported Versions

We provide security updates and documentation corrections for the following versions:

| Version | Supported |
| :--- | :---: |
| 1.0.x | ✅ Yes |
| < 1.0 | ❌ No |

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability, credential leak, or sensitive data exposure anywhere in this repository:

1. **DO NOT file a public GitHub issue.**
2. Report the vulnerability privately to DevCenterPoint security maintainers via email at:
   `security@devcenterpoint.com` (or via private GitHub Security Advisory).
3. Include:
   - File path and commit hash where the vulnerability or leaked credential is located.
   - Detailed description of the vulnerability and potential impact.
   - Steps to reproduce or remediate the issue.
4. We will acknowledge receipt within 48 hours and coordinate a public fix.

---

## 🛡️ Repository Security & Safeguards

### 1. Zero Credential Policy
- **No hardcoded secrets**: This repository strictly forbids committing API keys, access tokens, server passwords, private client data, or internal enterprise credentials.
- All code snippets, CLI examples, and templates use placeholder tokens (e.g., `YOUR_API_KEY_HERE`, `https://example.com/`).

### 2. Safe & Ethical Scraping Guidelines
- All procedural scripts (e.g., `curl`, Python requests) must respect target website terms of service and `robots.txt` directives.
- We strictly forbid recommending distributed denial-of-service (DDoS) tactics, aggressive scraping bursts without rate-limiting, or circumventing access controls.
- Recommended user-agent identification and politeness delays (minimum 1–2 seconds between requests) are documented across all crawl and extraction skills.

### 3. Local Offline Validation
- All validation scripts in `scripts/` and test suites in `tests/` operate 100% locally and offline.
- They do not send telemetry, ping external analytics services, or transmit repository contents over the network.
