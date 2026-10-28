# 🗺️ Everything SEO: Repository Inventory & Taxonomy Coverage Map

> **Maintainer:** DevCenterPoint  
> **Repository:** `D:\Everything-SEO`  
> **Status:** 100% Discovered, Mapped, and Verified  
> **Total Disciplines:** 11  
> **Total Leaf Skill Directories:** 55  
> **Total Operational Skills:** 55

---

## 1. Architectural Overview & Taxonomy Tree

The **Everything SEO** repository organizes all operational search capabilities into a standardized, deterministic directory hierarchy under `SEO/`. Each leaf directory represents an independent, specialized capability manual (`SKILL.md`) conforming to the **Agent Skills Open Specification v1.0**.

```
📂 SEO
┃
┣ 📂 Keyword Research (5 Skills)
┃ ┣ 📂 Keyword Discovery              -> Multi-source query discovery & seed expansion
┃ ┣ 📂 Long-tail Keywords             -> Conversational query extraction & zero-volume search analysis
┃ ┣ 📂 Low-competition Keywords       -> SERP vulnerability analysis & user-generated content weak spots
┃ ┣ 📂 Search Volume                  -> Seasonality modeling & real click potential formulas
┃ ┗ 📂 SERP Analysis                  -> Reverse-engineering live layouts, intent consensus & SERP features
┃
┣ 📂 On-page SEO (7 Skills)
┃ ┣ 📂 Title                          -> HTML title tag engineering & pixel-width compliance (<=580px)
┃ ┣ 📂 Headings Optimization          -> Semantic H1-H6 outline hierarchy & Featured Snippet targeting
┃ ┣ 📂 URL Optimization               -> RFC 3986 clean slug architecture & parameter hygiene
┃ ┣ 📂 Image SEO                      -> WebP/AVIF formatting, responsive srcset & descriptive alt text
┃ ┣ 📂 Internal Linking               -> PageRank modeling & topical hub-and-spoke siloing
┃ ┣ 📂 Schema Markup                  -> JSON-LD structured data architecture & entity disambiguation
┃ ┗ 📂 CTR Optimization               -> Search snippet copywriting & controlled A/B testing
┃
┣ 📂 Content Optimization (5 Skills)
┃ ┣ 📂 Gap Analysis                   -> Competitive semantic intersection & missing subtopic discovery
┃ ┣ 📂 NLP Optimization               -> Entity salience, BM25 co-occurrence & syntactic parsing
┃ ┣ 📂 Entity Coverage                -> Wikidata reconciliation & Knowledge Graph mapping
┃ ┣ 📂 Content Refresh                -> Traffic decay detection, pruning vs. updating triage
┃ ┗ 📂 Readability                    -> Flesch-Kincaid calibration & mobile visual scannability
┃
┣ 📂 Technical SEO (7 Skills)
┃ ┣ 📂 Crawling                       -> Bot discovery mechanics & crawl trap elimination
┃ ┣ 📂 Indexing                       -> Canonical tag resolution & robots meta directives
┃ ┣ 📂 XML Sitemaps                   -> Sitemaps.org protocol, sitemap indexes & hygiene
┃ ┣ 📂 RobotsTXT                      -> RFC 9309 compliance & crawler access governance
┃ ┣ 📂 Redirects                      -> 301/308 semantics, redirect chain compression & loops
┃ ┣ 📂 Page Speed                     -> Core Web Vitals (LCP, INP, CLS) & critical rendering path
┃ ┗ 📂 Log File Analysis              -> Server access log forensics & Googlebot rDNS verification
┃
┣ 📂 Link Building (6 Skills)
┃ ┣ 📂 Digital PR                     -> Data-driven journalism, newsjacking & media pitching
┃ ┣ 📂 Guest Posting                  -> Authoritative editorial contribution & audience overlap analysis
┃ ┣ 📂 Broken Link Building           -> 404 reclamation & resource page substitution
┃ ┣ 📂 Unlinked Brand Mentions        -> Entity monitoring & link conversion outreach
┃ ┣ 📂 Linkable Assets                -> Original benchmark research & interactive utility tools
┃ ┗ 📂 HARO                           -> Source request pitching via Connectively, Featured, and Qwoted
┃
┣ 📂 AI SEO (5 Skills)
┃ ┣ 📂 AI Search Visibility           -> Generative Engine Optimization (GEO) & AI Overviews
┃ ┣ 📂 Entity Optimization            -> Disambiguating brand entities in LLM training corpora
┃ ┣ 📂 AI Citations                   -> Structuring content for RAG retrieval in ChatGPT, Claude, and Perplexity
┃ ┣ 📂 Reddit Mentions                -> Authentic community contribution favored by Google algorithms
┃ ┗ 📂 3rd Party Mentions             -> Curated roundups, directories, and third-party validation
┃
┣ 📂 International SEO (3 Skills)
┃ ┣ 📂 Hreflang                       -> ISO 639-1 & ISO 3166-1 cluster annotation and self-referencing rules
┃ ┣ 📂 Multilingual SEO               -> ccTLD vs Subdirectory architecture & language negotiation
┃ ┗ 📂 Translation SEO                -> Cultural transcreation & localized keyword intent mapping
┃
┣ 📂 Analytics (4 Skills)
┃ ┣ 📂 Search Console                 -> GSC API extraction, cannibalization detection & CTR anomaly discovery
┃ ┣ 📂 Bing Webmaster Tools           -> IndexNow implementation & Bing Copilot presence
┃ ┣ 📂 Google Analytics               -> GA4 exploration funnels, landing page engagement & attribution
┃ ┗ 📂 SEO Reporting                  -> Executive dashboards, revenue attribution & pipeline forecasting
┃
┣ 📂 SEO Tools (4 Skills)
┃ ┣ 📂 Ahrefs                         -> Link intersection, Content Gap, and Site Explorer operations
┃ ┣ 📂 SEMrush                        -> Domain Overview, Keyword Magic Tool & Position Tracking
┃ ┣ 📂 Keywords Everywhere            -> Browser extension & API bulk keyword metrics
┃ ┗ 📂 Screaming Frog                 -> Headless CLI automation, regex extraction & database storage mode
┃
┣ 📂 SEO Wins (4 Skills)
┃ ┣ 📂 150+ SEO Hacks                 -> Curated 40+ evidence-tiered tactical experimentation catalog
┃ ┣ 📂 AI SEO Hacks                   -> RAG chunking triggers & generative search experiments
┃ ┣ 📂 Traffic Growth                 -> Striking distance velocity & cannibalization resolution sprints
┃ ┗ 📂 Backlinks Hacks                -> Reverse image search, vendor testimonials & podcast tours
┃
┗ 📂 Growth (5 Skills)
  ┣ 📂 Organic Traffic                -> Search TAM sizing & organic flywheel acceleration
  ┣ 📂 Lead Generation                -> High-converting gated content, calculators & demo funnels
  ┣ 📂 Conversion Optimization        -> Above-the-fold engagement, value propositions & micro-commitments
  ┣ 📂 Revenue Growth                 -> Customer acquisition cost (CAC), LTV & organic pipeline attribution
  ┗ 📂 SEO Scaling                    -> Programmatic SEO (pSEO), canary deploys & multi-author quality gates
```

---

## 2. Granular Inventory of 55 Leaf Directories

| # | Discipline | Leaf Path | Skill Name | Primary Operational Mandate |
| :---: | :--- | :--- | :--- | :--- |
| 1 | **Keyword Research** | `SEO/Keyword Research/Keyword Discovery` | Keyword Discovery | Triangulating seed entities, autosuggest APIs, and customer conversations. |
| 2 | Keyword Research | `SEO/Keyword Research/Long-tail Keywords` | Long-tail Keywords | Mining 4+ token conversational queries and zero-volume intent clusters. |
| 3 | Keyword Research | `SEO/Keyword Research/Low-competition Keywords` | Low-competition Keywords | Auditing SERP weaknesses, UGC presence (Quora/Reddit), and KD metrics. |
| 4 | Keyword Research | `SEO/Keyword Research/Search Volume` | Search Volume | Deconstructing Google Trends, seasonality, and zero-click search reality. |
| 5 | Keyword Research | `SEO/Keyword Research/SERP Analysis` | SERP Analysis | Reverse-engineering live layout modules, intent archetypes, and SERP features. |
| 6 | **On-page SEO** | `SEO/On-page SEO/Title` | Title Optimization | Engineering HTML title tags within 580px width to prevent search rewrites. |
| 7 | On-page SEO | `SEO/On-page SEO/Headings Optimization` | Headings Optimization | Structuring H1-H6 semantic trees to capture Featured Snippets and PAA. |
| 8 | On-page SEO | `SEO/On-page SEO/URL Optimization` | URL Optimization | Designing clean RFC 3986 slugs, lowercase hyphenation, and parameter hygiene. |
| 9 | On-page SEO | `SEO/On-page SEO/Image SEO` | Image SEO | Next-gen image compression (WebP/AVIF), responsive `srcset`, and descriptive alt text. |
| 10 | On-page SEO | `SEO/On-page SEO/Internal Linking` | Internal Linking | Modeling PageRank flow, eliminating orphan pages, and topically siloing hubs. |
| 11 | On-page SEO | `SEO/On-page SEO/Schema Markup` | Schema Markup | Generating and validating JSON-LD structured data for rich results and entities. |
| 12 | On-page SEO | `SEO/On-page SEO/CTR Optimization` | CTR Optimization | Extracting CTR anomalies from GSC and running controlled title/meta experiments. |
| 13 | **Content Optimization** | `SEO/Content Optimization/Gap Analysis` | Content Gap Analysis | Identifying semantic subtopic deficiencies against top-ranking competitors. |
| 14 | Content Optimization | `SEO/Content Optimization/NLP Optimization` | NLP Optimization | Optimizing entity salience, BM25 co-occurrence, and syntactic readability. |
| 15 | Content Optimization | `SEO/Content Optimization/Entity Coverage` | Entity Coverage | Reconciling document topics with Wikidata QIDs and Knowledge Graph nodes. |
| 16 | Content Optimization | `SEO/Content Optimization/Content Refresh` | Content Refresh | Diagnosing historical traffic decay and triaging content (prune, merge, refresh). |
| 17 | Content Optimization | `SEO/Content Optimization/Readability` | Readability Optimization | Calibrating Flesch-Kincaid grade levels and mobile visual scannability. |
| 18 | **Technical SEO** | `SEO/Technical SEO/Crawling` | Crawling & Bot Management | Optimizing Googlebot crawl budget, server TTFB, and eliminating crawl traps. |
| 19 | Technical SEO | `SEO/Technical SEO/Indexing` | Indexing & Canonicalization | Enforcing canonical tags, `noindex` directives, and resolving GSC indexing errors. |
| 20 | Technical SEO | `SEO/Technical SEO/XML Sitemaps` | XML Sitemaps Architecture | Building Sitemaps.org compliant sitemap indexes and clean URL feeds. |
| 21 | Technical SEO | `SEO/Technical SEO/RobotsTXT` | Robots.txt Architecture | Governing bot access under RFC 9309 rules and disallow directives. |
| 22 | Technical SEO | `SEO/Technical SEO/Redirects` | Redirects Architecture | Compressing redirect chains, preventing loops, and implementing 301/308 status codes. |
| 23 | Technical SEO | `SEO/Technical SEO/Page Speed` | Core Web Vitals & Speed | Remediating LCP, INP, and CLS performance bottlenecks across the render path. |
| 24 | Technical SEO | `SEO/Technical SEO/Log File Analysis` | Log File Analysis | Parsing web server access logs to verify authentic Googlebot IP rDNS visits. |
| 25 | **Link Building** | `SEO/Link Building/Digital PR` | Digital PR | Executing newsworthy surveys, proprietary data studies, and journalist pitches. |
| 26 | Link Building | `SEO/Link Building/Guest Posting` | Authority Guest Posting | Pitching editorial contributions to contextually relevant, indexable publications. |
| 27 | Link Building | `SEO/Link Building/Broken Link Building` | Broken Link Building | Finding dead 404 links on authoritative resource pages and pitching substitutions. |
| 28 | Link Building | `SEO/Link Building/Unlinked Brand Mentions` | Brand Mention Reclamation | Monitoring unlinked brand citations and converting them into contextual links. |
| 29 | Link Building | `SEO/Link Building/Linkable Assets` | Linkable Asset Development | Creating benchmark data studies, calculators, and tools that naturally attract citations. |
| 30 | Link Building | `SEO/Link Building/HARO` | Source Request PR | Pitching expert journalist queries via Connectively, Featured, and Qwoted. |
| 31 | **AI SEO** | `SEO/AI SEO/AI Search Visibility` | AI Search Visibility & GEO | Optimizing for Google AI Overviews, Perplexity, and conversational answer engines. |
| 32 | AI SEO | `SEO/AI SEO/Entity Optimization` | AI Entity Optimization | Disambiguating brand identity and leadership profiles in LLM training corpora. |
| 33 | AI SEO | `SEO/AI SEO/AI Citations` | AI Citations & RAG | Engineering modular quote-worthy snippets that LLMs ingest during web search. |
| 34 | AI SEO | `SEO/AI SEO/Reddit Mentions` | Reddit Search Visibility | Building authentic community presence in subreddits highly prioritized by Google. |
| 35 | AI SEO | `SEO/AI SEO/3rd Party Mentions` | 3rd Party Mentions & Lists | Winning inclusion in high-ranking comparison listicles and directory portals. |
| 36 | **International SEO** | `SEO/International SEO/Hreflang` | Hreflang Implementation | Implementing bi-directional language and regional alternate annotations. |
| 37 | International SEO | `SEO/International SEO/Multilingual SEO` | Multilingual Architecture | Architecting ccTLD vs subdirectory structures and browser language routing. |
| 38 | International SEO | `SEO/International SEO/Translation SEO` | Translation & Transcreation | Localizing search intent, dialect vocabulary, and regional keyword variations. |
| 39 | **Analytics** | `SEO/Analytics/Search Console` | Google Search Console Ops | Query filtering, cannibalization analysis, and performance telemetry extraction. |
| 40 | Analytics | `SEO/Analytics/Bing Webmaster Tools` | Bing Webmaster Tools | Setting up IndexNow protocol and inspecting Bing/Copilot indexation. |
| 41 | Analytics | `SEO/Analytics/Google Analytics` | GA4 Organic Search Analysis | Building organic landing page engagement funnels and conversion attribution. |
| 42 | Analytics | `SEO/Analytics/SEO Reporting` | SEO Executive Reporting | Constructing blended ROI dashboards, CAC modeling, and organic forecasting. |
| 43 | **SEO Tools** | `SEO/SEO Tools/Ahrefs` | Ahrefs Operations | Backlink index auditing, Content Gap intersections, and Batch Analysis. |
| 44 | SEO Tools | `SEO/SEO Tools/SEMrush` | SEMrush Operations | Keyword Magic Tool clustering, Position Tracking, and SERP volatility analysis. |
| 45 | SEO Tools | `SEO/SEO Tools/Keywords Everywhere` | Keywords Everywhere | Rapid browser-level query volume mining, CPC analysis, and bulk metrics. |
| 46 | SEO Tools | `SEO/SEO Tools/Screaming Frog` | Screaming Frog SEO Spider | Headless CLI crawling, regex custom extraction, and SQL database storage. |
| 47 | **SEO Wins** | `SEO/SEO Wins/150+ SEO Hacks` | Rapid SEO Quick Wins | 40+ evidence-tiered tactical experimentation catalog across all pillars. |
| 48 | SEO Wins | `SEO/SEO Wins/AI SEO Hacks` | AI Search Hacks | Prompt-chaining content expansion, semantic clustering, and RAG optimization. |
| 49 | SEO Wins | `SEO/SEO Wins/Traffic Growth` | Accelerated Traffic Growth | Striking-distance keyword sprints (positions 4-15) and CTR turnaround sprints. |
| 50 | SEO Wins | `SEO/SEO Wins/Backlinks Hacks` | High-Efficiency Backlinks | Reverse image search link recovery, vendor partner testimonials, and podcast tours. |
| 51 | **Growth** | `SEO/Growth/Organic Traffic` | Organic Traffic Strategy | TAM sizing, organic moat defensibility, and flywheel traffic acceleration. |
| 52 | Growth | `SEO/Growth/Lead Generation` | B2B SEO Lead Generation | High-intent BOFU search routing, lead magnets, and friction-free capture. |
| 53 | Growth | `SEO/Growth/Conversion Optimization` | Organic Search CRO | Above-the-fold value proposition clarity, social proof, and form micro-commitments. |
| 54 | Growth | `SEO/Growth/Revenue Growth` | SEO Revenue Attribution | Customer acquisition cost (CAC), LTV calculations, and pipeline velocity. |
| 55 | Growth | `SEO/Growth/SEO Scaling` | Enterprise SEO Scaling | Programmatic SEO (pSEO), editorial QA gates, and canary release deployment. |

---

## 3. Discovered Duplicates, Overlaps, and Boundary Demarcation

Where disciplines touch related subject matter, strict capability boundaries are maintained:

1. **Schema Markup vs. Entity Coverage vs. AI Entity Optimization**:
   - `Schema Markup` (`On-page SEO`): Focuses on generating and validating raw JSON-LD code for Google Rich Results.
   - `Entity Coverage` (`Content Optimization`): Focuses on semantic content depth, topic coverage, and Wikidata QID reconciliation within body copy.
   - `Entity Optimization` (`AI SEO`): Focuses on external brand disambiguation across the broader web to influence LLM knowledge corpora.
2. **Crawling vs. Indexing vs. RobotsTXT**:
   - `Crawling` (`Technical SEO`): Focuses on bot access mechanics, server load, and crawl budget preservation.
   - `RobotsTXT` (`Technical SEO`): Focuses specifically on RFC 9309 directive syntax and user-agent governance.
   - `Indexing` (`Technical SEO`): Focuses on `noindex`, canonical consolidation, and GSC Page Indexing status.
3. **Keyword Discovery vs. Long-tail Keywords vs. Low-competition Keywords**:
   - `Keyword Discovery`: Broad multi-source seed expansion.
   - `Long-tail Keywords`: High-converting conversational and 4+ word query mining.
   - `Low-competition Keywords`: SERP weakness and UGC vulnerability auditing.

**Result**: 0 duplicated skills, 0 missing files, 100% boundary clarity.
