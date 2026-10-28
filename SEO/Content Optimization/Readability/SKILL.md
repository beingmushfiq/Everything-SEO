---
name: seo-readability
description: Cognitive load optimization, Flesch-Kincaid / Gunning Fog calibration, visual scannability engineering, and user dwell-time enhancement.
metadata:
  category: Content Optimization
  discipline: Editorial Quality
  version: "1.0.0"
---

# Readability & Scannability

## A. Purpose
The Readability and Scannability skill governs the structural formatting, cognitive pacing, and linguistic clarity of written web content. High search rankings are futile if users immediately bounce due to impenetrable walls of text, convoluted academic jargon, or poor visual hierarchy. Modern search algorithms evaluate user interaction signals (including dwell time, scroll depth, and bounce-back queries). By optimizing readability and information architecture, this skill minimizes cognitive friction, maximizes reader retention, enhances comprehension, and supports search engine passage extraction.

## B. Trigger Conditions
Invoke this skill when:
1. Reviewing newly drafted articles or landing pages prior to publication.
2. Auditing pages exhibiting high bounce rates, low average time-on-page ($< 45\text{ seconds}$), or poor conversion rates despite ranking in the top 5.
3. Simplifying complex technical, medical, legal, or B2B documentation for a wider decision-maker audience.
4. Structuring content for mobile readers navigating on 360px viewports with high distraction levels.

Upstream dependencies: [Headings Optimization](../../On-page%20SEO/Headings%20Optimization/SKILL.md) and [Entity Coverage](../Entity%20Coverage/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - Computational readability scoring (Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog Index).
  - Sentence length distribution, syllable complexity, and active voice enforcement.
  - Visual formatting mechanisms (bulleted lists, bold lead-ins, blockquotes, callout callouts).
  - Paragraph length constraints and mobile scroll pacing.
  - Cognitive scannability (the "Bionic Reading" / skimming heuristic).
- **Out-of-Scope**:
  - Technical grammar debugging (handled by general spelling/grammar tools).
  - HTML heading structure (Handled by [Headings Optimization](../../On-page%20SEO/Headings%20Optimization/SKILL.md)).
  - Schema markup implementation (Handled by [Schema Markup](../../On-page%20SEO/Schema%20Markup/SKILL.md)).

## D. Required Inputs
1. **Target Content Draft**: Full markdown or HTML text of the document.
2. **Target Audience Profile**: Technical Practitioners (Engineers, Architects) vs. Commercial Decision Makers (Execs, Managers) vs. General Consumers.
3. **Core Topic Complexity**: Inherent baseline difficulty of the subject matter.

## E. Required Tools and Data Sources
- **Commercial Tooling**: Hemingway Editor (Desktop/Web), Grammarly Business (Clarity and Engagement metrics).
- **Zero-Cost / Open Source Alternatives**:
  - Python `textstat` library (computes Flesch-Kincaid, Dale-Chall, Coleman-Liau, and Gunning Fog automatically).
  - Standard command-line tools: `wc`, `grep`, and Python text processing scripts.
  - Browser DevTools to simulate mobile viewport rendering.

## F. Core Concepts and Decision Principles
1. **The Flesch Reading Ease Benchmark**:
   - **Score 90-100**: Very Easy (5th grade reading level).
   - **Score 60-70**: Standard / Plain English (8th-9th grade level). **Target for general B2B/B2C content**.
   - **Score 30-50**: Difficult (College level). Acceptable for deep architectural and legal specifications, but subheadings and conclusions should still remain accessible.
   - **Score 0-29**: Very Confusing / Academic. Should be aggressively refactored.
2. **The 3-Sentence Paragraph Rule (Mobile Friction)**:
   - On a desktop monitor, a 6-sentence paragraph appears as a manageable 4-line block.
   - On an iPhone viewport (375px width), that exact same 6-sentence paragraph transforms into an overwhelming 16-line "Wall of Text" that induces immediate visual fatigue and page abandonment.
   - *Rule*: Limit paragraphs to a maximum of **3 to 4 sentences** (under 75 words).
3. **Visual Anchoring (Scannability)**:
   - 80% of web visitors **scan** documents rather than reading linearly word-for-word.
   - Scanners look for:
     1. Descriptive headings and subheadings.
     2. Bold lead-ins at the beginning of list items.
     3. Formatted comparison tables.
     4. Distinct blockquotes and visual warning callouts.

## G. Operational Workflow

```
[Extract Raw Body Text] -> [Run Computational Readability Metrics (textstat)]
             |                                        |
             v                                        v
 [Identify Long Sentences (>25 Words)] -> [Break Walls of Text into Max 3 Sentences]
             |                                        |
             v                                        v
   [Convert Dense Prose to Lists] -> [Enforce Bold Lead-In Anchoring]
```

### Step 1: Calculate Readability Scores via Python
Run a scripted audit using the `textstat` library:
```python
import textstat

with open('article_draft.md', 'r') as f:
    text = f.read()

ease = textstat.flesch_reading_ease(text)
grade = textstat.flesch_kincaid_grade(text)
fog = textstat.gunning_fog(text)

print(f"Flesch Reading Ease: {ease:.1f} (Target: 60-70)")
print(f"Flesch-Kincaid Grade: {grade:.1f} (Target: 7-9 for general, 10-12 for deep tech)")
print(f"Gunning Fog Index: {fog:.1f}")
```

### Step 2: Eliminate Sentence Bloat
1. Isolate every sentence exceeding **25 words**.
2. Split compound and complex sentences joined by multiple coordinating conjunctions (`and`, `but`, `furthermore`, `moreover`) into two distinct, punchy sentences.
3. Replace multisyllabic bureaucratic phrases with plain Anglo-Saxon equivalents:
   - Replace `utilize` with `use`.
   - Replace `in order to` with `to`.
   - Replace `with reference to` with `about`.
   - Replace `demonstrates an efficacy in` with `works well for`.

### Step 3: Passive Voice to Active Voice Conversion
Audit the text for passive voice constructions (`was created by`, `is being executed by`):
- *Passive (Weak, High Cognitive Load)*: `A full database backup is generated by the script every 24 hours, during which WAL logs are archived.`
- *Active (Direct, Scannable)*: `The script generates a full database backup every 24 hours and archives all WAL logs.`
- *Target*: Maintain passive voice below **10%** of total sentences.

### Step 4: Visual Scannability Structuring
Transform dense paragraphs containing enumerations into formatted lists:
- **Before (Dense Paragraph)**:
  `When setting up database replication, administrators need to consider network bandwidth constraints, hardware parity between primary and replica, disk I/O throughput limits, and latency spikes that can cause replication lag.`
- **After (Scannable Anchors)**:
  `When configuring database replication, evaluate these four constraints:
  - **Network Bandwidth**: Ensure dedicated throughput between datacenters.
  - **Hardware Parity**: Match RAM and CPU specs between primary and standby nodes.
  - **Disk I/O Throughput**: Provision NVMe storage to handle continuous WAL writes.
  - **Replication Lag**: Monitor replication lag thresholds to prevent stale reads.`

### Step 5: Embed Visual Breakpoints
Ensure that every 300 words contains at least one visual breakpoint:
- A custom styled callout box (`> [!NOTE]` or `> [!WARNING]`).
- A formatted markdown table.
- A labeled code block with syntax highlighting.
- An informative diagram or chart.

## H. Analysis and Decision Framework
Use this framework to evaluate paragraph readability:

```
                      [Target Body Paragraph]
                                  |
                   Does paragraph exceed 4 sentences
                           or 80 words?
                             /          \
                          [Yes]         [No]
                           /              \
            Can it be split into two      Does it contain a list
            logical, concise thoughts?    of 3 or more items?
                    /          \                 /          \
                 [Yes]         [No]           [Yes]         [No]
                  /              \             /              \
          (Split into two    (Convert to  (Convert to     (Keep as-is)
           distinct paras)    bulleted     bulleted list)
                              list)
```

## I. Prioritization Framework
When auditing an existing content repository, rank pages for readability refactoring using:

$$\text{Readability Deficit} = \text{Monthly Page Pageviews} \times \frac{\text{Bounce Rate \%}}{\text{Flesch Reading Ease Score}}$$

Pages with high traffic, high bounce rates, and low Flesch Reading Ease scores represent immediate conversion and engagement win opportunities.

## J. Deliverables & Specifications
Deliver a **Readability & Scannability Audit Report**:
1. `url`: Target document path.
2. `flesch_reading_ease`: Pre vs. Post score.
3. `flesch_kincaid_grade`: Pre vs. Post grade level.
4. `avg_sentence_length_words`: Target $\le 18$ words.
5. `max_paragraph_length_sentences`: Target $\le 3-4$ sentences.
6. `scannable_elements_added`: Count of bullet lists, tables, and callouts injected.

## K. Quality Assurance Checklist
- [ ] Flesch Reading Ease score is $\ge 60$ for general B2B/B2C, or $\ge 45$ for deep technical documentation.
- [ ] No single paragraph exceeds 4 sentences or 80 words.
- [ ] All lists use bold lead-in anchors (`**Topic**: explanation`).
- [ ] Passive voice constitutes $< 10\%$ of all sentences.
- [ ] Tested layout rendering on a mobile 375px viewport to verify absence of text walls.

## L. Failure Modes and Anti-Patterns
- **The LinkedIn Bro-Poetry Extreme**: Writing an entire article where every single sentence is its own standalone paragraph, creating a disjointed, cartoonish reading experience.
- **Dumbing Down Technical Precision**: Replacing critical technical terms (e.g. changing `ACID compliance` to `good reliability`) in an effort to artificially lower grade levels, destroying credibility with expert audiences.
- **Unformatted Bullet Lists**: Dumping 15 unformatted, unbolded bullet points in a row without visual hierarchy.

## M. AI-Agent Operating Instructions
1. An AI agent must calculate mathematical readability scores using textstat before and after editing.
2. When rewriting prose, enforce active voice and split sentences longer than 25 words automatically.
3. Preserve all technical and domain-specific entities (e.g. Kubernetes, OAuth, Postgres) without replacing them with generic approximations.

## N. Success Metrics & Verification Windows
- **Engagement Lift**: Average time-on-page in Google Analytics 4 increases by $\ge 25\%$ within 30 days of republishing.
- **Scroll Depth**: Percentage of users reaching 75% scroll depth increases by at least 15 percentage points.

## O. Related Skills
- **Upstream Input**: [Headings Optimization](../../On-page%20SEO/Headings%20Optimization/SKILL.md), [Entity Coverage](../Entity%20Coverage/SKILL.md)
- **Lifecycle Optimization**: [Content Refresh](../Content%20Refresh/SKILL.md)
- **Downstream CRO**: [Conversion Optimization](../../Growth/Conversion%20Optimization/SKILL.md)

## P. Authoritative References
- [Flesch, Rudolf: The Art of Readable Writing](https://eric.ed.gov/?id=ED015197) — The foundational linguistic methodology for readability and comprehension testing.
- [Nielsen Norman Group: How Users Read on the Web](https://www.nngroup.com/articles/how-users-read-on-the-web/) — Landmark eye-tracking research establishing scannability, F-shaped reading patterns, and visual anchors.

## Q. Maintenance and Review Cycle
- **Pre-Publishing Quality Gate**: Integrate automated readability score checks into CI/CD publishing pipelines to prevent publishing text with Flesch scores $< 50$.
