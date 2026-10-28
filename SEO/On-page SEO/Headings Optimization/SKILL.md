---
name: seo-headings-optimization
description: Semantic HTML heading architecture (H1-H6), logical outline hierarchies, entity injection, and Featured Snippet answer modeling.
metadata:
  category: On-page SEO
  discipline: Structural Optimization
  version: "1.0.0"
---

# Headings Optimization

## A. Purpose
The Headings Optimization skill governs the structural design, semantic hierarchy, and linguistic composition of HTML heading elements (`<h1>` through `<h6>`). Headings serve a dual operational role: they provide assistive technologies and human readers with an intuitive, scannable document outline, while communicating topical hierarchy and entity relationships to search engine crawlers. This skill establishes rigorous standards for heading syntax, secondary keyword integration, question-answering formats for Featured Snippet capture, and logical nesting that eliminates crawl traps and document outline fragmentation.

## B. Trigger Conditions
Invoke this skill when:
1. Drafting or reviewing the outline of a new editorial or commercial content asset.
2. Auditing a page suffering from poor keyword breadth or low rankings on secondary/long-tail queries.
3. Troubleshooting accessibility (a11y) or SEO audit warnings regarding skipped heading levels or missing H1s.
4. Targeting Featured Snippet acquisition (Paragraph, List, or Table) on an existing high-ranking page.

Upstream dependencies: [Title](../Title/SKILL.md), [Keyword Discovery](../../Keyword%20Research/Keyword%20Discovery/SKILL.md), and [SERP Analysis](../../Keyword%20Research/SERP%20Analysis/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - H1 through H6 semantic nesting and architectural structure.
  - Question-based heading construction to trigger Featured Snippets and PAA answers.
  - Entity and semantic keyword distribution across subheadings.
  - Remediation of multiple H1 tags, skipped levels (e.g. H2 to H4), and empty heading tags.
- **Out-of-Scope**:
  - HTML `<title>` tag writing (Handled by [Title](../Title/SKILL.md)).
  - CSS visual styling and font sizes (Handled by frontend design/CSS).
  - General copywriting and sentence readability (Handled by [Readability](../../Content%20Optimization/Readability/SKILL.md)).

## D. Required Inputs
1. **Target Document HTML or Markdown**: The full text and markup of the page.
2. **Primary Entity / Focus Keyword**: The primary query representing the page's core topic.
3. **Secondary Subtopics & Questions**: Discovered questions from PAA, Reddit, and related searches from [SERP Analysis](../../Keyword%20Research/SERP%20Analysis/SKILL.md).
4. **Target Featured Snippet Type**: Paragraph, Ordered List, Unordered List, or Comparison Table.

## E. Required Tools and Data Sources
- **Commercial Tooling**: Screaming Frog SEO Spider (Headings tab: H1/H2 missing, duplicate, >70 chars), Ahrefs / Semrush Content Optimizer.
- **Zero-Cost / Open Source Alternatives**:
  - Chrome DevTools (Console: inspect heading outline via `document.querySelectorAll('h1, h2, h3, h4, h5, h6')`).
  - W3C Nu HTML Checker (identifying structural outline errors).
  - WAVE Web Accessibility Evaluation Tool (flagging heading level skipping).
  - Python scripts using `BeautifulSoup` to parse and validate heading hierarchies.

## F. Core Concepts and Decision Principles
1. **Strict Hierarchical Nesting (Tree Structure)**:
   Heading elements must follow a strict branching tree structure. You cannot skip levels for styling purposes.
   ```
   H1: Master Document Topic
     ├── H2: Primary Core Subtopic A
     │     ├── H3: Detailed Component A.1
     │     └── H3: Detailed Component A.2
     └── H2: Primary Core Subtopic B
           └── H3: Detailed Component B.1
                 └── H4: Specific Implementation B.1.a
   ```
   *Violations*: Jumping directly from `<h2>` to `<h4>` breaks accessibility screen reader navigation and confuses semantic passage indexing algorithms.
2. **Single H1 Standard**:
   While modern HTML5 technically permits multiple `<h1>` elements inside separate `<section>` or `<article>` tags, search engines strongly prefer a **single, unambiguous `<h1>`** per document that establishes the overarching topic.
3. **The "Passage Indexing" Anchor**:
   Search engines evaluate individual sections of a page as semi-autonomous passages. An informative, descriptive `<h2>` acts as a semantic boundary marker that enables Google to index that specific subsection for a unique long-tail search query.

## G. Operational Workflow

```
[Extract Primary Entity & Subtopics] -> [Draft Single Descriptive H1]
                  |                                     |
                  v                                     v
   [Organize H2 Topical Subsections] -> [Nest H3/H4 Procedural Steps]
                  |                                     |
                  v                                     v
   [Format for Featured Snippet] -> [Validate Semantic Outline Tree]
```

### Step 1: Craft the Canonical H1
1. Verify that exactly one `<h1>` tag exists on the page.
2. Ensure the H1 contains the primary keyword near the beginning.
3. Keep the H1 between **20 and 70 characters** (3 to 10 words).
4. Synchronize the H1 with the `<title>` tag: ensure they convey identical intent without being forced clones.

### Step 2: Architect the H2 Core Branches
1. Divide the master topic into 4 to 8 logical, exhaustive H2 sections.
2. Use descriptive noun/verb phrases rather than clever or vague metaphors.
   - *Bad H2*: `Looking Under the Hood`
   - *Good H2*: `PostgreSQL WAL Architecture and Replication Mechanics`
3. Convert at least 2 H2 or H3 headings into explicit question formats identified during PAA research (e.g., `What is the Difference Between Synchronous and Asynchronous Replication?`).

### Step 3: Nest H3 and H4 Procedural Steps
1. When an H2 section covers multiple distinct categories, tools, or chronological steps, break it down using nested `<h3>` elements.
2. If an `<h3>` contains sequential code executions, configuration files, or individual options, nest them under `<h4>`.
3. Never use heading tags for non-heading UI elements (e.g., sidebar widgets, footer links, cookie consent notices, social share buttons). Use `<div>` or `<p>` with CSS classes instead.

### Step 4: Engineer for Featured Snippet Extraction
To win Featured Snippets, pair specific heading syntax directly with targeted response formats:
1. **Target: Paragraph Snippet (Definition / "What is")**:
   - Heading syntax: `What is [Topic]?` or `How Does [System] Work?`
   - Immediate next DOM element: A single `<p>` tag containing a crisp, objective 40-55 word direct answer starting with `[Topic] is a...`.
2. **Target: List Snippet (Steps / Top Options)**:
   - Heading syntax: `How to [Achieve Outcome] (X Steps)` or `Best [Tools] for [UseCase]`
   - Immediate next DOM element: An ordered list (`<ol>`) or unordered list (`<ul>`) with 5-8 list items (`<li>`), where each item begins with a bold tag (`<strong>Item Name</strong>: brief description`).
3. **Target: Table Snippet (Comparison / Specifications)**:
   - Heading syntax: `[Option A] vs [Option B]: Feature Comparison`
   - Immediate next DOM element: A semantically valid HTML `<table>` with `<thead>`, `<th>`, and `<tbody>` tags containing structured benchmarks.

## H. Analysis and Decision Framework
Use this validation script logic to audit any page's heading health:

```python
from bs4 import BeautifulSoup

def audit_headings(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
    
    h1_count = len(soup.find_all('h1'))
    errors = []
    
    if h1_count == 0:
        errors.append("CRITICAL: Missing H1 tag.")
    elif h1_count > 1:
        errors.append(f"WARNING: Multiple H1 tags detected ({h1_count}).")
        
    prev_level = 0
    for h in headings:
        level = int(h.name[1])
        if prev_level > 0 and level > prev_level + 1:
            errors.append(f"ACCESSIBILITY ERROR: Skipped heading level from H{prev_level} to H{level} ('{h.get_text().strip()[:30]}...')")
        prev_level = level
        
    return errors
```

## I. Prioritization Framework
When auditing existing domains with hundreds of pages, prioritize heading remediation using:

$$\text{Remediation Priority} = \text{Monthly Organic Page Clicks} \times (\text{Missing H1 Weight: 3} + \text{Multiple H1s: 2} + \text{Skipped Levels: 1})$$

## J. Deliverables & Specifications
Deliver a **Semantic Heading Hierarchy Specification**:
1. `url`: Target document path.
2. `h1`: Exactly 1 string (length & keyword confirmed).
3. `outline_tree`: Structured hierarchical list of all H2-H4 tags.
4. `featured_snippet_targets`: Specific H2/H3 tags paired with target snippet formats (Paragraph/List/Table).
5. `semantic_keywords_mapped`: Specific entities distributed across headings.

## K. Quality Assurance Checklist
- [ ] Exactly one `<h1>` exists on the page.
- [ ] No heading levels are skipped (e.g., H2 followed immediately by H4).
- [ ] Headings are not empty (`<h2></h2>`) or populated only by images.
- [ ] UI elements (navigation menus, sidebars, related posts) do not use H1-H6 tags.
- [ ] Key PAA questions are integrated verbatim as H2 or H3 elements.
- [ ] Target definition paragraphs immediately follow question headings.

## L. Failure Modes and Anti-Patterns
- **The Multiple H1 Theme Trap**: Many WordPress and Shopify themes inadvertently wrap the site logo in an `<h1>` on every page, creating duplicate H1s.
- **Styling with Headings**: Using an `<h4>` tag in body text simply because the designer wanted smaller bold text, breaking the document's logical outline.
- **Cryptic Headings**: Writing headings like `Step 1`, `The Solution`, or `Overview` without specifying the entity or subject.
- **Keyword Stuffing in Headings**: Repeating the exact primary keyword in every single H2 tag, triggering spam filters.

## M. AI-Agent Operating Instructions
1. When generating or editing content, never jump heading levels (e.g., never output `###` without a preceding `##`).
2. Always write the primary entity into the H1 and at least 40% of the H2 subheadings using semantic synonyms.
3. Automatically generate the 40-50 word Featured Snippet answer block immediately after any question-formatted heading.

## N. Success Metrics & Verification Windows
- **Snippet Capture**: Target question heading wins the Featured Snippet in Google within 30 to 60 days.
- **Passage Visibility**: Page begins ranking for secondary long-tail queries corresponding directly to specific H2/H3 headings within 45 days.

## O. Related Skills
- **Upstream Input**: [Title](../Title/SKILL.md), [SERP Analysis](../../Keyword%20Research/SERP%20Analysis/SKILL.md)
- **Direct Sibling**: [Content Refresh](../../Content%20Optimization/Content%20Refresh/SKILL.md), [Entity Coverage](../../Content%20Optimization/Entity%20Coverage/SKILL.md)
- **Quality & UX**: [Readability](../../Content%20Optimization/Readability/SKILL.md)

## P. Authoritative References
- [W3C Web Accessibility Initiative (WAI): Headings Technique](https://www.w3.org/WAI/tutorials/page-structure/headings/) — Standards for accessible, non-broken document outlines.
- [Google Search Central: Heading Tags and Structured Data](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) — Guidance on document structure and passage extraction.

## Q. Maintenance and Review Cycle
- **Quarterly Template Audit**: Run Screaming Frog crawl auditing the Headings tab across all page templates to ensure updates to CMS layouts haven't introduced duplicate or skipped headings.
