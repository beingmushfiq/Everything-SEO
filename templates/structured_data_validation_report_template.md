# 🏷️ Structured Data & Schema Validation Report Template

> **Target URL:** `[https://example.com/target-page/]`  
> **Target Schema Archetype:** `[Article / Product / FAQPage / Organization / BreadcrumbList]`  
> **Validation Tools:** Google Rich Results Test, Schema.org Validator  
> **Prepared by:** `[Engineer Name / AI Agent ID]`  
> **Audit Date:** `[YYYY-MM-DD]`  
> **Reference Skill:** [Schema Markup](../SEO/On-page%20SEO/Schema%20Markup/SKILL.md)

---

## 1. Schema Ingestion & Rich Result Eligibility
- **Page Archetype**: `[e.g., Technical Guide / Product Page / Corporate About]`
- **Intended Google Rich Result**: `[e.g., Article, Review Snippet, Product Markup, Sitelinks Searchbox]`
- **Implementation Format**: JSON-LD inside HTML `<head>` container (W3C Standard).

---

## 2. Validation Findings & Syntax Audit

| Schema Type | Syntax Errors | Missing Required Fields | Missing Recommended Fields | Rich Result Status |
| :--- | :---: | :--- | :--- | :---: |
| `[e.g., Article]` | `0` | None | `image`, `dateModified` | `Eligible with Warnings` |
| `[e.g., BreadcrumbList]`| `0` | None | None | `Valid (Eligible)` |
| `[e.g., FAQPage]` | `1` | `acceptedAnswer.text` | None | `Invalid (Ineligible)` |

---

## 3. Discovered Errors & Remediation Work Order

### Issue 1: `[Error Name, e.g. Missing required field 'image' in Article schema]`
- **Root Cause**: The CMS template output an empty string `""` for the `image` attribute on posts without a featured image.
- **Google Rich Result Impact**: Disqualifies page from Google Discover and rich snippet carousels.
- **Remediation Code**:
  ```json
  "image": [
    "https://example.com/images/16x9/guide.jpg",
    "https://example.com/images/4x3/guide.jpg",
    "https://example.com/images/1x1/guide.jpg"
  ]
  ```

---

## 4. Production-Ready JSON-LD Script
Provide the fully formatted, validated JSON-LD payload ready for injection:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://example.com/#organization",
      "name": "[Organization Name]",
      "url": "https://example.com/",
      "logo": "https://example.com/logo.png",
      "sameAs": [
        "https://twitter.com/example",
        "https://www.linkedin.com/company/example"
      ]
    },
    {
      "@type": "TechArticle",
      "@id": "https://example.com/target-page/#article",
      "isPartOf": {
        "@type": "WebPage",
        "@id": "https://example.com/target-page/"
      },
      "headline": "[Optimized Headline]",
      "description": "[Meta Description Summary]",
      "datePublished": "2026-01-15T08:00:00+00:00",
      "dateModified": "2026-10-29T10:30:00+00:00",
      "author": {
        "@type": "Person",
        "name": "[Author Name]",
        "jobTitle": "[Senior Technical Architect]"
      },
      "publisher": {
        "@id": "https://example.com/#organization"
      }
    }
  ]
}
</script>
```

---

## 5. Verification Checklist
- [ ] Validated via Google Rich Results Test API with 0 critical errors.
- [ ] JSON-LD injected inside `<head>` or before `</body>` via server-side rendering (SSR), not delayed client-side JS.
- [ ] Schema content matches user-visible text on page (no deceptive or hidden schema).
- [ ] All dates use ISO 8601 formatting with timezone offset (`YYYY-MM-DDTHH:MM:SSZ`).
