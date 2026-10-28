# 🔬 SEO Research Evidence & Citation Log Template

> **Research Topic:** `[Topic / Hypothesis Investigated]`  
> **Lead Researcher:** `[Name / AI Agent ID]`  
> **Date Initiated:** `[YYYY-MM-DD]`  
> **Last Verified:** `[YYYY-MM-DD]`  
> **Standard:** 4-Tier Epistemic Hierarchy (Agent Skills Specification v1.0)

---

## 1. Research Question & Primary Hypothesis
- **Core Question**: `[State the exact technical or algorithmic question being evaluated]`
- **Operational Hypothesis**: `[e.g., Moving non-critical JavaScript execution off the main thread will reduce INP below 200ms and improve mobile ranking velocity]`
- **Business Rationale**: `[Why this hypothesis matters to organic visibility or user conversion]`

---

## 2. Evidence Classification Ledger

Classify all cited sources into the mandatory **4-Tier Epistemic Hierarchy**:

| Source Title & Organization | Direct Reference URL | Epistemic Tier | Date Accessed | Key Finding or Documented Principle |
| :--- | :--- | :---: | :---: | :--- |
| `[e.g., Google Search Central: Core Web Vitals]` | `[https://developers.google.com/search/docs/appearance/core-web-vitals]` | **Tier 1** *(Verified Spec)* | `[YYYY-MM-DD]` | Confirms INP officially replaced FID as ranking signal in March 2024. |
| `[e.g., IETF RFC 9309: Robots Exclusion Protocol]` | `[https://datatracker.ietf.org/doc/html/rfc9309]` | **Tier 1** *(Verified Spec)* | `[YYYY-MM-DD]` | Establishes formal syntax rules for user-agent matching and longest-path match precedence. |
| `[e.g., Internal GSC 90-Day Telemetry Study]` | `[file:///path/to/telemetry.csv]` | **Tier 2** *(Empirical)* | `[YYYY-MM-DD]` | Observed 34% higher CTR on pages featuring rich result star ratings. |
| `[e.g., Ahrefs Organic Search Study]` | `[https://ahrefs.com/blog/...]` | **Tier 3** *(Estimate)* | `[YYYY-MM-DD]` | Directional correlation between internal inlinks and ranking velocity. |

---

## 3. Disqualified Claims & Anti-Patterns Identified
List folklore, outdated myths, or risky practices evaluated and explicitly rejected:

- **Disqualified Claim 1**: `[e.g., Keyword Density Formula (repeating keyword 3-5% in body copy)]`
  - *Reason for Rejection*: Modern IR models use BM25, entity salience, and neural embeddings; keyword stuffing degrades readability and triggers Google spam classifiers.
- **Disqualified Claim 2**: `[e.g., Disavowing all scraper domain backlinks]`
  - *Reason for Rejection*: Google officially stated Penguin algorithm algorithmically ignores low-quality scraper links automatically without requiring disavow file submissions.

---

## 4. Experimental Observations & Findings
Document observed test outcomes (if running a controlled split test or technical experiment):

- **Control Group (50 URLs)**: `[Baseline metrics over 30 days]`
- **Variant Group (50 URLs)**: `[Observed metrics over 30 days]`
- **Measured Delta**: `[Statistical significance / observed traffic lift]`
- **Confidence Level**: `[High / Moderate / Low (requires replication)]`

---

## 5. Peer Review & Maintenance Sign-Off
- [ ] Every technical claim is supported by a Tier 1 or Tier 2 citation.
- [ ] No commercial tool metric is cited as an official search engine ranking factor.
- [ ] No proprietary client data or private credentials are included in the log.
- [ ] Review cadence scheduled for `[YYYY-MM-DD]` to re-verify against search engine updates.
