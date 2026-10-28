---
name: seo-multilingual-seo
description: Global domain architecture selection (ccTLD vs subdomain vs subfolder), geotargeting signals, currency/locale UX, and international search strategy.
metadata:
  category: International SEO
  discipline: Global Architecture
  version: "1.0.0"
---

# Multilingual SEO & International Domain Architecture

## A. Purpose
The Multilingual SEO skill governs the strategic domain architecture, geographic targeting, and operational infrastructure required to scale organic search visibility across multiple countries and languages. Selecting the wrong technical structure (e.g. fragmenting domain authority across 20 unlinked country-code top-level domains [ccTLDs] with zero budget) can permanently cripple an international expansion. This skill provides an objective evaluation framework to select between ccTLDs, subdomains, and subdirectories, configure regional server routing, manage localized currency/regulatory compliance, and build global topical authority.

## B. Trigger Conditions
Invoke this skill when:
1. Planning an international market expansion into non-English or multi-regional markets (e.g. expanding from US into EMEA, APAC, or LATAM).
2. Deciding on the technical domain structure: whether to purchase localized domains (`brand.de`, `brand.fr`), configure subdomains (`de.brand.com`), or build subfolders (`brand.com/de/`).
3. Diagnosing domain authority fragmentation where international localized sites fail to rank due to low backlink equity.
4. Implementing automated IP or browser-language geotargeting that accidentally blocks search engine crawlers.

Upstream dependencies: [URL Optimization](../../On-page%20SEO/URL%20Optimization/SKILL.md) and [Hreflang](../Hreflang/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - Evaluation matrix: ccTLDs (`example.fr`) vs. Subdomains (`fr.example.com`) vs. Subdirectories (`example.com/fr/`).
  - Geotargeting signals (Google Search Console international targeting, CDN edge routing, local server locations).
  - Geolocation redirection rules (why automatic IP redirects destroy Googlebot crawling).
  - Currency, date formatting, and local regulatory compliance (GDPR, imprint laws like German *Impressum*).
  - Cross-market backlink and domain authority consolidation.
- **Out-of-Scope**:
  - Exact syntax implementation of hreflang tags (Handled by [Hreflang](../Hreflang/SKILL.md)).
  - Editorial transcreation and linguistic translation (Handled by [Translation SEO](../Translation%20SEO/SKILL.md)).
  - International tax and merchant processing integration.

## D. Required Inputs
1. **Target Market List**: Countries and languages (e.g., Germany, France, Japan, Brazil).
2. **Current Domain Equity (DA / DR)**: Authority of the primary root domain.
3. **Marketing & Link Building Budget**: Capacity to fund independent local PR and link-building campaigns in each target country.
4. **Technical Infrastructure Constraints**: CMS multi-site capabilities (WordPress Multisite, Shopify Markets, Headless Next.js routing).

## E. Required Tools and Data Sources
- **Commercial Tooling**: Ahrefs / Semrush (Country-level traffic filtering, international competitor market share), BuiltWith (inspecting competitor global infrastructure).
- **Zero-Cost / Open Source Alternatives**:
  - Google Search Console (Country performance reports).
  - Public DNS query tools (`dig`, `whois`) to inspect ccTLD registration rules.
  - Browser DevTools with network sensor overrides to simulate foreign IP browsing.

## F. Core Concepts and Decision Principles
1. **The Architectural Triad (ccTLD vs. Subdomain vs. Subdirectory)**:

| Architecture | Structure | Advantages | Disadvantages | Best For |
| :--- | :--- | :--- | :--- | :--- |
| **Subdirectories** | `example.com/de/` | **Consolidates 100% of domain authority & backlinks** into one domain. Lowest operational cost. Easiest setup. | Weakest local consumer brand trust in certain traditional markets (e.g. Germany). | **90% of Companies / Startups / B2B SaaS** |
| **Subdomains** | `de.example.com` | Allows separate server hosting and distinct CMS setups per country. | Search engines treat subdomains as semi-independent entities; dilutes domain authority. | Enterprise companies with completely separate regional tech stacks |
| **ccTLDs** | `example.de` | **Strongest possible local trust signal** and search engine geotargeting. | **Complete domain authority fragmentation**. Must build backlinks from scratch for every single country. Extreme cost. | Multi-billion dollar conglomerates (Amazon, Apple) with massive regional budgets |

2. **The "Automatic IP Redirection" Penalty Trap**:
   - Many developers implement logic that reads a user's IP address and automatically redirects them to the regional folder (e.g., if IP is in France, execute an HTTP 302 redirect to `/fr/`).
   - **This is catastrophic for SEO**: Most Googlebot crawlers request pages from US-based IP addresses. If your server automatically redirects all US IPs away from foreign language folders, **Googlebot will never be able to crawl or index your French, German, or Japanese content**.
   - *Rule*: **NEVER use forced automatic IP redirects**. Use a non-intrusive banner at the top of the page: *"It looks like you are in France. Would you like to switch to our French site? [Switch / Stay]"*.
3. **Local Trust Signals**:
   - Search engines evaluate local signals beyond language: local business address in footer, localized phone numbers (+49 for Germany), local currency display (€ vs $), and local legal pages (e.g. *Impressum* in DACH regions).

## G. Operational Workflow

```
[Evaluate Budget & Domain Equity] -> [Select Architecture (Default: Subdirectory)]
                 |                                         |
                 v                                         v
 [Configure Clean URL Taxonomy (/de/, /fr/)] -> [Deploy Non-Intrusive Geolocation Banner]
                 |                                         |
                 v                                         v
   [Implement Local Trust Signals & Schema] -> [Synchronize Cross-Market Hreflang Graph]
```

### Step 1: Execute the Architectural Decision Model
Evaluate the business case against the 3 architectural models:
- *Condition A*: The company has $< \$100,000/\text{year}$ dedicated link building budget per country -> **Select Subdirectories (`example.com/de/`)**.
- *Condition B*: The primary root domain has high authority (DR 70+) -> **Select Subdirectories** to immediately inherit existing PageRank.
- *Condition C*: The local market has strict legal requirements requiring local corporate presence and ccTLD ownership -> **Select ccTLD**.

### Step 2: Establish Subdirectory Taxonomy
Standardize language and regional routing:
- **Language Only**: `example.com/de/` (for all German speakers globally).
- **Language + Region**: `example.com/de-de/` (Germany), `example.com/de-ch/` (Switzerland), `example.com/de-at/` (Austria).
- Ensure consistent URL slug structures across localized subfolders:
  - English: `example.com/solutions/cloud-backup/`
  - German: `example.com/de/loesungen/cloud-backup/`

### Step 3: Implement Non-Intrusive Geolocation UX
Instead of forced redirects, deploy an edge-computed banner (Cloudflare Worker or client-side JS):
```javascript
// Check user country cookie vs IP header
function checkGeoBanner() {
    const userCountry = getCountryFromGeoIP(); // Edge header (e.g. 'DE')
    const currentPath = window.location.pathname;
    
    // If user is in Germany and not currently in /de/ folder, show soft banner
    if (userCountry === 'DE' && !currentPath.startsWith('/de/')) {
        showBanner({
            message: "Besuchen Sie unsere Website auf Deutsch?",
            switchUrl: "/de" + currentPath,
            dismissText: "Auf Englisch bleiben"
        });
    }
}
```

### Step 4: Inject Localized Schema & Business Signals
On country-specific pages, localize the Schema.org `Organization` or `LocalBusiness` data:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DevCenterPoint Germany",
  "url": "https://example.com/de/",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+49-30-123456",
    "contactType": "customer service",
    "availableLanguage": ["German", "English"]
  }
}
</script>
```

### Step 5: Establish Local Backlink Acquisition
Even in a subdirectory architecture, localized folders rank faster when they receive backlinks from websites hosted within that specific country:
- Acquire links for `/de/` from `.de` domains, German trade publications, and German business directories (see [Digital PR](../../Link%20Building/Digital%20PR/SKILL.md)).

## H. Analysis and Decision Framework
Use this framework to guide domain selection:

```
                  [International Expansion Project]
                                  |
              Does the company have dedicated marketing teams
                 and link-building budgets for each country?
                             /          \
                          [Yes]         [No]
                           /              \
             Does consumer trust in the   (DEPLOY SUBDIRECTORIES:
             target market demand ccTLD?   example.com/de/
                    /          \           Maximum authority transfer)
                 [Yes]         [No]
                  /              \
            (DEPLOY ccTLD:   (DEPLOY SUBDIRECTORIES:
             example.de)      example.com/de/)
```

## I. Prioritization Framework
Score international market rollout priorities using the **International Opportunity Score (IOS)**:

$$\text{IOS} = \text{Target Country TAM (\$)} \times \text{Organic Search Demand Volume} \times \frac{1}{\text{Local Incumbent Competition (1-5)}}$$

Prioritize markets with high commercial search demand and weak local native competition.

## J. Deliverables & Specifications
Deliver a **Global Domain & Localization Architecture Plan**:
1. `chosen_architecture`: Subdirectory, Subdomain, or ccTLD.
2. `target_market_matrix`: Countries, languages, and target directory paths.
3. `geolocation_routing_policy`: Specification of non-intrusive banners (zero forced 302 redirects).
4. `localized_trust_signals`: Currency symbols, phone numbers, and legal imprint specifications.
5. `hreflang_integration_plan`: Cross-reference to [Hreflang](../Hreflang/SKILL.md).

## K. Quality Assurance Checklist
- [ ] No automatic forced IP-based 302/301 redirects (verified Googlebot can crawl all language paths).
- [ ] Subdirectory names strictly follow ISO 639-1 language codes.
- [ ] Localized legal pages present (e.g. *Impressum* for Germany/Austria).
- [ ] Currency and date formatting match local cultural norms.
- [ ] Country-specific folders have self-referencing canonical tags.

## L. Failure Modes and Anti-Patterns
- **The Automatic IP Redirect Blunder**: Forcing all visitors with French IP to `/fr/`. Googlebot US crawlers are redirected to `/en/` and never index `/fr/`, destroying French SEO.
- **The Empty ccTLD Graveyard**: Buying 15 ccTLDs (`brand.es`, `brand.it`, `brand.nl`) with a \$1,000/mo budget. All 15 domains remain at DR 0 with zero backlinks, wasting registration fees and generating zero traffic.
- **Machine-Translating Navigational Slugs Clumsily**: Translating `/terms-of-service/` using automated tools that produce gibberish in complex languages like Japanese or Arabic.

## M. AI-Agent Operating Instructions
1. An AI agent must recommend the Subdirectory architecture (`example.com/de/`) by default unless the client provides verified evidence of multi-million dollar regional marketing budgets.
2. Verify that proposed routing logic does not contain forced HTTP redirect loops based on `CF-IPCountry` or `X-Forwarded-For` headers.
3. Validate that local phone, address, and currency specifications align with target ISO country standards.

## N. Success Metrics & Verification Windows
- **Indexation Footprint**: Localized subdirectories achieve $\ge 90\%$ indexation coverage in Google Search Console within 45 days.
- **Market Penetration**: Localized folders account for $\ge 25\%$ of total domain organic sessions within 6 months.

## O. Related Skills
- **Technical Tagging**: [Hreflang](../Hreflang/SKILL.md)
- **Content Quality**: [Translation SEO](../Translation%20SEO/SKILL.md)
- **URL Structure**: [URL Optimization](../../On-page%20SEO/URL%20Optimization/SKILL.md)

## P. Authoritative References
- [Google Search Central: Managing Multi-Regional and Multilingual Sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) — Pros and cons of ccTLDs vs subdomains vs subdirectories.
- [W3C Internationalization Best Practices: Specifying the Language of Content](https://www.w3.org/International/questions/qa-html-language-declarations) — Web standards for HTML language declarations.

## Q. Maintenance and Review Cycle
- **Semi-Annual Market Audit**: Review country-level GSC traffic trends every 6 months to decide whether new regional subdirectories (e.g. `/es-mx/` vs `/es-es/`) should be created.
