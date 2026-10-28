# AI Search Visibility, Citations & Generative Engine Optimization (GEO)

> **Category**: AI SEO  
> **Status**: Verified Standard  
> **Evidence Basis**: Empirical evaluation of Perplexity, Google Gemini, and ChatGPT Search citations

---

## 1. Guiding Principle: Evidence Over Vanity Scores
Do not rely on opaque "AI Visibility Scores" or speculative "GEO hacks". Search engines and LLMs cite documents based on:
1. **Information Gain**: Original data, benchmarks, code examples, or empirical case studies not present in general web crawls.
2. **Entity Clarity & Authority**: Well-structured Schema JSON-LD declaring `About`, `Mentions`, and `SameAs` Wikidata entities.
3. **Citation Density in Community Hubs**: Genuine discussions, citations, and problem-solving threads on Reddit, GitHub, StackOverflow, and specialized industry publications.

---

## 2. Citation Optimization Protocol
1. **Direct Answer Paragraphs**: Place concise, authoritative answers (40-60 words) immediately beneath `<h2>` question headings.
2. **Tabular Data & Structured Summaries**: Use standard HTML `<table>` or Markdown tables for comparisons, benchmarks, and metrics. LLM crawlers parse HTML tables with significantly higher fidelity than image infographics.
3. **Entity Schema Markup**:
   ```json
   {
     "@context": "https://schema.org",
     "@type": "TechArticle",
     "headline": "Enterprise Technical SEO Architecture",
     "author": {
       "@type": "Organization",
       "name": "DevCenterPoint",
       "url": "https://devcenterpoint.com"
     }
   }
   ```
4. **Third-Party Reputation Footprint**: Monitor unlinked and linked brand mentions across developer and technical communities.
