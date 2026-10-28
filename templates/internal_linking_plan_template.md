# 🔗 Internal Linking Architecture Plan Template

> **Domain:** `[https://example.com]`  
> **Topical Cluster:** `[Cluster Name, e.g. Cloud Security Hub]`  
> **Prepared by:** `[Strategist Name / AI Agent ID]`  
> **Review Date:** `[YYYY-MM-DD]`  
> **Reference Skill:** [Internal Linking](../SEO/On-page%20SEO/Internal%20Linking/SKILL.md)

---

## 1. Hub-and-Spoke Silo Architecture
Define the primary pillar page (hub) and its supporting cluster assets (spokes):

```
       [Topical Hub / Pillar Page]
        /           |           \
       v            v            v
  [Spoke 1] <---> [Spoke 2] <---> [Spoke 3]
```

- **Pillar Hub URL**: `[https://example.com/hub-url/]` (Target Query: `[Head Query]`)
- **Supporting Spoke 1**: `[https://example.com/spoke-1/]` (Target Query: `[Long-tail 1]`)
- **Supporting Spoke 2**: `[https://example.com/spoke-2/]` (Target Query: `[Long-tail 2]`)
- **Supporting Spoke 3**: `[https://example.com/spoke-3/]` (Target Query: `[Long-tail 3]`)

---

## 2. PageRank Flow & Link Budget Allocation Rules
1. **Vertical Linking**: Every supporting spoke page **MUST** link upward to the primary pillar hub within the first 150 words of body copy.
2. **Horizontal Linking**: Supporting spokes cross-link to adjacent sibling spokes where contextually relevant using varied descriptive anchor text.
3. **Downward Linking**: The pillar hub links downward to all spoke articles in an organized resource grid or table of contents.
4. **Anchor Text Diversity**: Anchor text must avoid exact-match over-optimization:
   - 40% Exact/Partial Match: `[e.g., cloud security architecture]`
   - 35% Descriptive Sentence Fragments: `[e.g., our complete guide to securing cloud workloads]`
   - 25% Topical Synonyms: `[e.g., multi-cloud protection framework]`

---

## 3. Link Insertion Work Order Matrix
| Source URL (Where link is added) | Destination URL (Target receiving PageRank) | Target Anchor Text Variation | Exact Paragraph Context / Placement |
| :--- | :--- | :--- | :--- |
| `[/blog/legacy-post-1/]` | `[/hub-url/]` | `[cloud security architecture]` | Section 2, paragraph 1 |
| `[/spoke-1/]` | `[/spoke-2/]` | `[microsegmentation best practices]` | Section 4, under H3 |
| `[/blog/unrelated-post/]` | `[/hub-url/]` | `[enterprise security framework]` | Conclusion section |

---

## 4. Orphan Page Resolution Inventory
List existing orphan pages discovered in the crawl graph with 0 internal inlinks:

| Discovered Orphan URL | Organic Value Assessment | Destination Parent Hub | Resolution Action |
| :--- | :---: | :--- | :--- |
| `[/guides/old-article/]` | High Historical Value | `[/hub-url/]` | Add link from parent hub and 2 related spokes |
| `[/outdated-promo/]` | Zero Organic Value | None | Return HTTP 410 or redirect 301 to parent hub |

---

## 5. Verification Checklist
- [ ] No links use generic anchors like "click here", "read more", or "learn more".
- [ ] No circular internal redirect links (all links point directly to 200 OK canonical destinations).
- [ ] All internal links use relative URIs or clean absolute canonical HTTPS URIs.
- [ ] Crawl depth from homepage to all tier-1 spokes is $\le 3$ clicks.
