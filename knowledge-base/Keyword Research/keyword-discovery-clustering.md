# Keyword Discovery & Lexical Clustering SOP

> **Category**: Keyword Research  
> **Status**: Verified Standard  
> **Framework**: Intent-Driven Keyword Clustering

---

## 1. Objective
Transform unorganized, flat keyword export CSVs into high-converting topic clusters grouped by user search intent, search volume, and semantic modifiers.

---

## 2. Intent Classification Framework
Every identified keyword must be mapped to one of four canonical intent buckets:

1. **Transactional (High Commercial Value)**:
   - *Identifiers*: `buy`, `hire`, `pricing`, `cost`, `quote`, `agency`, `developer`, `services`, `contract`.
   - *Action*: Route to high-converting Service Pages, Pricing Calculators, or Consultation Landing Pages.
2. **Commercial Investigation**:
   - *Identifiers*: `best`, `top`, `review`, `vs`, `comparison`, `alternatives`.
   - *Action*: Create objective comparison tables, teardowns, and architecture evaluations.
3. **Informational**:
   - *Identifiers*: `how to`, `what is`, `guide`, `tutorial`, `architecture`, `code example`.
   - *Action*: Build in-depth technical guides with code snippets and diagrams.
4. **Navigational**:
   - *Identifiers*: Brand names, login, dashboard, documentation links.
   - *Action*: Ensure proper homepage and sitelink schema.

---

## 3. Lexical Clustering Procedure
1. **Tokenization**: Normalize keyword strings, remove punctuation, and extract root 2-gram and 3-gram tokens.
2. **Cannibalization Prevention**: Ensure each keyword cluster targets exactly **one** primary URL. Never create multiple pages targeting the same root cluster intent.
3. **Difficulty vs. Authority Matching**: Target low-to-medium KD (Keyword Difficulty < 45) for emerging domains before attacking high-competition head terms.
