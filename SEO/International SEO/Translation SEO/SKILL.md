---
name: seo-translation-seo
description: Transcreation vs literal translation, localized search intent research, multilingual keyword mapping, and cultural semantic adaptation.
metadata:
  category: International SEO
  discipline: Linguistic Engineering
  version: "1.0.0"
---

# Translation SEO & Transcreation

## A. Purpose
The Translation SEO skill governs the linguistic transcreation, localized keyword research, and cultural semantic adaptation of digital content for international search markets. Simply running English web pages through automated machine translation tools (such as Google Translate or raw DeepL) without localization produces catastrophic SEO failures: literal word-for-word translations miss the actual colloquial search phrases used by native searchers, fail to capture search volume, produce unnatural syntax that triggers quality algorithms, and alienate local buyers. This skill establishes an auditable methodology for transcreating content, mapping native language search intent, and maintaining high editorial quality.

## B. Trigger Conditions
Invoke this skill when:
1. Translating established, high-performing English articles, guides, or landing pages into target foreign languages.
2. Observing that machine-translated pages on an international domain receive zero impressions despite being fully indexed.
3. Conducting international keyword research in a language where team members are non-native speakers.
4. Localizing commercial SaaS pricing, product descriptions, and technical documentation for foreign enterprise markets.

Upstream dependencies: [Multilingual SEO](../Multilingual%20SEO/SKILL.md) and [Keyword Discovery](../../Keyword%20Research/Keyword%20Discovery/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - Independent native-language keyword research (not translating English keywords, but finding what natives actually search).
  - Transcreation workflows: Adapting idioms, cultural metaphors, and regulatory frameworks.
  - Localized URL slug and metadata engineering in the target language.
  - Post-editing machine translation (PEMT) quality control gates with native linguists.
  - Managing localized entity disambiguation and cultural formatting (currency, units of measurement, date syntax).
- **Out-of-Scope**:
  - Setting up hreflang XML tags (Handled by [Hreflang](../Hreflang/SKILL.md)).
  - Domain architecture selection (Handled by [Multilingual SEO](../Multilingual%20SEO/SKILL.md)).
  - Direct software localization / gettext `.po` file compilation.

## D. Required Inputs
1. **Source Master Document**: High-performing English article or landing page text.
2. **Target Language & Country**: Specific pairing (e.g., German in Germany `de-DE`, French in France `fr-FR`, Spanish in Mexico `es-MX`).
3. **Core Product / Service Value Proposition**: The essential problem solved, independent of linguistic phrasing.

## E. Required Tools and Data Sources
- **Commercial Tooling**: Ahrefs / Semrush (Local country database keyword research: e.g. searching in German within the Germany Google database), DeepL Pro API (high-accuracy machine translation baseline).
- **Zero-Cost / Open Source Alternatives**:
  - Google Search in the target country (`gl=de&hl=de`) for native autocomplete suggestions.
  - Native language Wikipedia pages to identify authoritative technical terminology.
  - Native community forums and local subreddits (e.g. `r/de_EDV` for German IT terminology).

## F. Core Concepts and Decision Principles
1. **Translation vs. Transcreation**:
   - *Literal Translation*: Converting words from Language A to Language B verbatim.
     - *English*: `Cloud migration strategy` -> *Literal Spanish*: `Estrategia de migración a la nube`.
   - *Transcreation (SEO Localization)*: Identifying the actual conceptual search phrase native professionals type into Google. In many technical industries, foreign engineers search using **English loanwords** rather than their native language equivalents.
     - In Germany, IT professionals search for `Cloud Backup Lösung` rather than `Datensicherung in der Datenwolke`. A literal translation misses 100% of the real search volume!
2. **The "Unedited Machine Translation" Penalty**:
   - Google’s Spam Policies explicitly classify uncurated, automated machine-translated content as **Spam**:
     - *"Text translated by an automated tool without human review or curation before publishing is considered spam."*
   - Machine translation without native post-editing produces low dwell time, high bounce rates, and algorithmic suppression under the Helpful Content System.
3. **Local Search Intent Nuances**:
   - The same English keyword can have different intent in different countries.
   - For example, an informational query in the US might be dominated by government software in France or commercial consultants in Germany. Always audit the **local SERP** in the target language before publishing.

## G. Operational Workflow

```
[Extract English Source Content] -> [Execute Native Target Language Keyword Research]
                 |                                                |
                 v                                                v
   [Generate DeepL/LLM Translation] -> [Native Post-Editing (Transcreation & Tone)]
                 |                                                |
                 v                                                v
 [Localize Title, Headings & Slugs] -> [Verify Against Local Google SERP Intent]
```

### Step 1: Native Language Keyword Discovery (Do NOT Translate English Terms)
1. Open Ahrefs Keywords Explorer or Semrush.
2. Select the **target country database** (e.g. Germany or Spain).
3. Do not type an English phrase into Google Translate and search that term. Instead:
   - Identify 2 to 3 leading **local native competitor websites** in that country.
   - Review their top-ranking organic keywords to discover the real phrases native searchers use.
   - Example Discovery: German engineers frequently use English technical verbs paired with German nouns (`PostgreSQL Backup automatisieren`).

### Step 2: High-Fidelity Machine Translation Baseline
1. Process the source English text through DeepL API or advanced LLM (e.g. Claude 3.5 Sonnet / GPT-4o) using explicit system instructions:
   ```
   System Prompt: Translate the following technical article from English to German (de-DE). 
   Do not translate established industry technical loanwords (e.g. retain 'Write-Ahead Logging', 'Docker container', 'Cloud backup', 'Disaster Recovery'). 
   Use professional, technical B2B tone (Sie-form).
   ```

### Step 3: Native Human Post-Editing (PEMT & Cultural Adaptation)
A native-speaking technical editor must review and revise the text:
1. **Idiom Replacement**: Replace American cultural idioms (e.g. "hit a home run", "ballpark estimate") with local cultural equivalents or plain factual statements.
2. **Metric & Formatting Adaptation**:
   - Change imperial measurements (miles, lbs) to metric (kilometers, kg).
   - Change date formatting: US (`MM/DD/YYYY`) to European (`DD.MM.YYYY` or `DD/MM/YYYY`).
   - Change currency symbols and decimal separators ($1,000.50 becomes 1.000,50 € in Germany).
3. **Legal Compliance Integration**: Insert mandatory local legal disclaimers (e.g. GDPR consent clauses in EU markets).

### Step 4: Localized Title, Heading & Slug Engineering
1. **Title Tag**: Write a fresh title in the target language incorporating the primary native keyword in the first 35 characters (see [Title](../../On-page%20SEO/Title/SKILL.md)).
2. **Headings**: Ensure H2 and H3 headings match common native PAA questions extracted from local SERPs.
3. **URL Slug**: Use clean, localized words in the slug:
   - *English*: `/solutions/database-backup/`
   - *German*: `/de/loesungen/datenbank-backup/`
   - *Spanish*: `/es/soluciones/copias-de-seguridad/`

### Step 5: Local SERP Competitor Verification
1. Search your new localized primary keyword on Google using the target country and language parameter:
   ```
   https://www.google.com/search?q={native_keyword}&gl=de&hl=de
   ```
2. Verify that your localized document matches the content archetype and depth of the top 3 ranking native German/French results.

## H. Analysis and Decision Framework
Use this framework to qualify translation workflows:

```
                  [Content Scheduled for Translation]
                                  |
                Does the topic have search volume in target
                     country's native language database?
                             /          \
                          [Yes]         [No]
                           /              \
             Does translation require      (Do not translate; retain
             technical precision (B2B/Dev)? English version for global)
                    /          \
                 [Yes]         [No]
                  /              \
         (Full Transcreation &   (DeepL + Native Proofread
          Native Technical PEMT)  is sufficient)
```

## I. Prioritization Framework
Rank translation opportunities using the **Localized Market Value (LMV)**:

$$\text{LMV} = \text{Local Target Language Monthly Search Volume} \times \text{Commercial Intent (1-5)} \times \text{Source Article Proven Conversion Rate}$$

Prioritize translating existing English "unicorn" articles that already generate high organic conversion rates in the primary market.

## J. Deliverables & Specifications
Deliver a **Translation & Transcreation Specification**:
1. `source_url`: Original English URL.
2. `target_market`: Language and country code (e.g. `de-DE`).
3. `native_primary_keyword`: Verified search phrase in local database.
4. `monthly_search_volume_local`: Verified local demand.
5. `transcreated_title_and_slug`: Localized title tag, H1, and URL slug.
6. `native_pemt_review_status`: Approved by verified native subject matter expert.

## K. Quality Assurance Checklist
- [ ] Primary keyword verified in native search engine database (not an artificial direct translation).
- [ ] Technical loanwords preserved where industry standard dictates.
- [ ] No unedited raw machine translation published to production.
- [ ] Currency, date, and unit formats converted to local standards.
- [ ] Schema.org markup `inLanguage` property matches target ISO code (`"inLanguage": "de-DE"`).
- [ ] Title and meta description written within container pixel width limits in the target language.

## L. Failure Modes and Anti-Patterns
- **The "Google Translate Plugin" Disaster**: Using a dynamic JavaScript widget that translates text on the fly. Search engine crawlers do not execute dynamic translation widgets, meaning zero foreign language pages are indexed.
- **Translating Untranslatable Technical Terms**: Translating `pull request` to `Demande de traction` in French. Native software developers laugh and leave the site immediately.
- **Ignoring Formal/Informal Pronouns**: Using the informal *du* in German or *tu* in French when addressing enterprise B2B corporate buyers who expect the formal *Sie* or *vous*.

## M. AI-Agent Operating Instructions
1. An AI agent must prompt LLMs with explicit domain terminology dictionaries to prevent translating established technical loanwords.
2. Query localized keyword volumes via tool APIs; never assume English volume translates proportionally to foreign markets.
3. Flag any translated copy that has not been confirmed by human native post-editing as "Draft / Unverified Translation".

## N. Success Metrics & Verification Windows
- **Local Indexation**: Transcreated pages are indexed in target country Google search within 14 days of publishing.
- **Engagement Parity**: Localized pages achieve average time-on-page and bounce rates comparable to or better than the English source version within 45 days.

## O. Related Skills
- **Architecture Strategy**: [Multilingual SEO](../Multilingual%20SEO/SKILL.md)
- **Technical Tagging**: [Hreflang](../Hreflang/SKILL.md)
- **On-Page Optimization**: [Title](../../On-page%20SEO/Title/SKILL.md), [Headings Optimization](../../On-page%20SEO/Headings%20Optimization/SKILL.md)

## P. Authoritative References
- [Google Search Central: Spam Policies - Automatically Generated Content](https://developers.google.com/search/docs/essentials/spam-policies#scraped-content) — Strict rules prohibiting uncurated automated machine-translated content.
- [W3C Internationalization: Monolingual vs Multilingual Websites](https://www.w3.org/International/getting-started/language) — Web accessibility and localization standards.

## Q. Maintenance and Review Cycle
- **Annual Transcreation Refresh**: Re-evaluate foreign language keyword volumes and colloquial terminology shifts every 12 months in core international markets.
