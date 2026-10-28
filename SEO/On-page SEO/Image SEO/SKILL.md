---
name: seo-image-seo
description: Visual asset optimization, next-gen WebP/AVIF formatting, responsive srcset engineering, descriptive alt-text accessibility, and ImageObject structured data.
metadata:
  category: On-page SEO
  discipline: Media Optimization
  version: "1.0.0"
---

# Image SEO

## A. Purpose
The Image SEO skill governs the technical optimization, semantic attribution, accessibility compliance, and compression engineering of visual assets across a digital property. Images frequently account for more than 60% of total page payload, acting as the primary bottleneck for Core Web Vitals (specifically Largest Contentful Paint [LCP] and Cumulative Layout Shift [CLS]). Furthermore, properly structured visual media captures substantial organic traffic via Google Images, Google Lens, and AI multimodal answer engines. This skill ensures images load with maximum speed while providing clear semantic relevance to search algorithms.

## B. Trigger Conditions
Invoke this skill when:
1. Publishing any article, guide, or product page containing visual media, diagrams, or screenshots.
2. Auditing a page failing Core Web Vitals due to high LCP or layout shifts caused by un-dimensioned media.
3. Remediating accessibility (WCAG 2.2) compliance errors related to missing or non-descriptive alt text.
4. Targeting visual search visibility for eCommerce catalogs, infographic research, or technical architectural schematics.

Upstream dependencies: [URL Optimization](../URL%20Optimization/SKILL.md) and [Page Speed](../../Technical%20SEO/Page%20Speed/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - Image file formats (WebP, AVIF, SVG, progressive JPEG).
  - Responsive delivery via HTML5 `<picture>` and `srcset` attributes.
  - Descriptive alt text syntax adhering to accessibility and topical relevance guidelines.
  - Semantic file naming and image directory taxonomy.
  - Explicit dimensional attributes (`width` and `height`) to prevent CLS layout shifts.
  - Schema.org `ImageObject` JSON-LD metadata.
- **Out-of-Scope**:
  - Graphic design and aesthetic editing of visual assets.
  - Server-side CDN caching headers (Handled by [Page Speed](../../Technical%20SEO/Page%20Speed/SKILL.md)).
  - Video asset hosting and VideoObject schema.

## D. Required Inputs
1. **Raw Visual Assets**: High-resolution source files (PNG, JPEG, SVG).
2. **Target Page Context**: The surrounding heading, paragraph text, and primary keyword.
3. **Target Responsive Viewports**: Breakpoints (e.g., 360px mobile, 768px tablet, 1200px desktop).
4. **Primary Focus Keyword**: The primary entity associated with the target page.

## E. Required Tools and Data Sources
- **Commercial Tooling**: Screaming Frog SEO Spider (Images tab: missing alt text, >100KB payload, broken image links), TinyPNG / Squoosh API.
- **Zero-Cost / Open Source Alternatives**:
  - Command-line image processing tools: `cwebp`, `avifenc`, `imagemagick`, `libvips`.
  - Google Chrome DevTools (Lighthouse audit, Network tab image filtering).
  - WebPageTest for visual filmstrip and LCP breakdown.
  - Python scripts using the `Pillow` library for batch resizing and format conversion.

## F. Core Concepts and Decision Principles
1. **The Modern Format Hierarchy**:
   - **AVIF**: Next-generation codec offering up to 50% smaller file size than JPEG at identical visual quality. Supported across all modern browsers.
   - **WebP**: Industry standard modern format offering universal browser support and ~30% compression savings over JPEG/PNG.
   - **SVG**: Scalable Vector Graphics for icons, simple logos, and line diagrams; resolution-independent and minimal byte footprint.
   - **Legacy Fallback (JPEG/PNG)**: Preserved only for legacy clients using `<picture>`.
2. **Cumulative Layout Shift (CLS) Mitigation**:
   Browsers cannot reserve vertical layout space for an image until the file header is downloaded unless explicit `width` and `height` aspect ratio attributes are written into the HTML `<img>` tag:
   ```html
   <!-- ALWAYS include width and height attributes -->
   <img src="chart.webp" width="800" height="450" alt="..." />
   ```
3. **Accessibility vs. Keyword Stuffing in Alt Text**:
   - The primary purpose of `alt` text is to describe the image accurately to a visually impaired user navigating via screen reader.
   - Stuffing keywords into alt tags (`alt="best crm crm software cheap crm tool"`) violates accessibility standards and triggers spam penalties.
   - Alt text should describe the specific content of the visual: what data does the chart show? What does the diagram illustrate?

## G. Operational Workflow

```
[Inspect Raw Asset & Dimensions] -> [Batch Convert to WebP/AVIF]
                 |                                  |
                 v                                  v
    [Compress to <= 100KB Payload] -> [Draft Descriptive Alt Text]
                 |                                  |
                 v                                  v
[Add Explicit Width/Height Tags] -> [Implement Lazy-Loading Attributes]
```

### Step 1: File Naming & Directory Taxonomy
1. Rename the raw asset from generic camera/screenshot strings (`Screenshot_2026-10-29.png` or `IMG_0049.jpg`) to descriptive, hyphenated semantic slugs:
   - *Bad File Name*: `diagram-final-v2.png`
   - *Good File Name*: `postgresql-master-slave-replication-diagram.webp`
2. Maintain images in dedicated logical directories (e.g., `/assets/images/database-guides/`).

### Step 2: Automated Conversion & Compression
1. Resize images so the maximum display width does not exceed the layout container (typically max **1600px** for desktop hero images, **800px** for standard editorial body images).
2. Convert and compress using `cwebp` or Python:
   ```bash
   # CLI conversion to WebP with 80% quality target
   cwebp -q 80 diagram.png -o diagram.webp
   ```
3. **Payload Target**: Keep editorial body images **$\le 100\text{KB}$**. Hero images should not exceed **$150\text{KB}$**.

### Step 3: Responsive Picture Implementation with Explicit Dimensions
Implement responsive loading using modern HTML markup:
```html
<picture>
  <source srcset="/images/diagram-800.avif 800w, /images/diagram-1200.avif 1200w" type="image/avif">
  <source srcset="/images/diagram-800.webp 800w, /images/diagram-1200.webp 1200w" type="image/webp">
  <img 
    src="/images/diagram-800.webp" 
    width="800" 
    height="450" 
    alt="Architectural diagram illustrating PostgreSQL write-ahead log replication between primary and standby nodes" 
    loading="lazy" 
    decoding="async"
  />
</picture>
```

### Step 4: Loading Strategy (Critical LCP Rule)
- **Above the Fold (Hero Image / Primary Banner)**:
  - **NEVER** use `loading="lazy"` on the hero image or primary visual element above the fold. Lazy-loading an LCP image delays its download and degrades Core Web Vitals.
  - Add `fetchpriority="high"` to the primary above-the-fold image:
    ```html
    <img src="hero.webp" width="1200" height="600" fetchpriority="high" alt="..." />
    ```
- **Below the Fold (All other body images)**:
  - Add `loading="lazy"` and `decoding="async"` to all images below the initial viewport.

### Step 5: Alt-Text Engineering Formula
Write alt text using the **Contextual Description Formula**:
`[Subject / Entity Action] + [Key Data Point / Specific Detail] + [Context]`

*Examples*:
- *Screenshot*: `alt="Google Search Console Performance dashboard displaying a 24 percent click increase after title optimization"`
- *Technical Diagram*: `alt="Flowchart illustrating the five stages of Kafka distributed event streaming from producer to consumer group"`
- *Decorative Icons*: `alt=""` (Empty string signals screen readers to skip decorative background elements).

## H. Analysis and Decision Framework
Use this decision tree for image loading attributes:

```
                     [New Image Element]
                              |
                Is image positioned above the fold?
                          /             \
                       [Yes]            [No]
                        /                 \
       - loading="eager" (default)      - loading="lazy"
       - fetchpriority="high"           - decoding="async"
       - Preload link in <head>         - Native dimension tags
```

## I. Prioritization Framework
When auditing legacy websites, prioritize image optimization using:

$$\text{Image Priority} = \text{File Size (KB)} \times (\text{LCP Candidate: 3} + \text{Missing Alt Text: 2} + \text{Missing Dimensions: 2})$$

Target all images $> 250\text{KB}$ immediately.

## J. Deliverables & Specifications
Deliver an **Image Optimization Manifest**:
1. `source_file`: Original asset path.
2. `optimized_file`: New WebP/AVIF asset path.
3. `original_size_kb` vs. `optimized_size_kb`: Quantified reduction percentage.
4. `dimensions`: Width x Height integer pixels.
5. `alt_text`: Written descriptive string.
6. `loading_attribute`: `lazy` vs `eager` with `fetchpriority="high"`.

## K. Quality Assurance Checklist
- [ ] Every image contains an `alt` attribute (descriptive string for content images, empty `alt=""` for purely decorative graphics).
- [ ] Explicit `width` and `height` integer attributes are defined in the HTML markup.
- [ ] Images above the fold do NOT have `loading="lazy"`.
- [ ] File size is $\le 100\text{KB}$ for standard content images.
- [ ] Image format is WebP or AVIF with fallback.
- [ ] File name is descriptive and hyphen-separated.

## L. Failure Modes and Anti-Patterns
- **The Lazy-Loaded Hero Disaster**: Applying `loading="lazy"` sitewide via a WordPress plugin, causing Google to delay downloading the LCP image until after JavaScript execution, destroying LCP scores.
- **The Alt-Text Keyword Dump**: Writing `alt="seo services agency digital marketing new york cheap"` on an infographic, triggering spam penalties and failing accessibility audits.
- **Missing Aspect Ratios**: Omitting width and height attributes, causing massive layout jumps (CLS score $> 0.25$) when images pop into the viewport during page scrolling.
- **Raw Camera Uploads**: Uploading 12MB 6000x4000 camera PNG files directly to a CMS.

## M. AI-Agent Operating Instructions
1. An AI agent must visually or semantically analyze the image file context to write literal descriptions rather than stuffing the page's target keyword.
2. When generating image tags in HTML or Markdown, enforce explicit dimensions and WebP extensions.
3. Automatically flag any image referenced in the page that exceeds 200KB.

## N. Success Metrics & Verification Windows
- **Core Web Vitals**: Page passes LCP ($\le 2.5\text{s}$) and CLS ($\le 0.1$) on both mobile and desktop within 28 days of CrUX data aggregation.
- **Visual Search**: Visual assets begin receiving impressions in the Google Search Console "Image" search type filter within 60 days.

## O. Related Skills
- **Upstream Input**: [URL Optimization](../URL%20Optimization/SKILL.md)
- **Technical Performance**: [Page Speed](../../Technical%20SEO/Page%20Speed/SKILL.md)
- **Accessibility & UX**: [Readability](../../Content%20Optimization/Readability/SKILL.md)

## P. Authoritative References
- [Google Search Central: Google Images Best Practices](https://developers.google.com/search/docs/appearance/google-images) — Guidelines on image indexing, metadata, and structured data.
- [web.dev: Optimize Largest Contentful Paint](https://web.dev/articles/optimize-lcp) — Official engineering recommendations for hero images and fetch priority.
- [W3C WCAG 2.2: Guideline 1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/quickref/#non-text-content) — Standards for accessible image alternative text.

## Q. Maintenance and Review Cycle
- **Quarterly Payload Audit**: Run an automated Screaming Frog crawl to identify images over 100KB or missing alt tags introduced during routine CMS publishing.
