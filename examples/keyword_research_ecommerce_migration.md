# 🛍️ End-to-End Worked Example: E-Commerce Migration Keyword Research

> **Case Title:** Category Taxonomy & Search Intent Mapping for E-Commerce Migration  
> **Demonstration Domain:** `SummitGear.example.com` (Outdoor Apparel & Mountaineering Equipment, 5,200 SKUs)  
> **Platform Migration:** Legacy Magento 1.9 $\to$ Modern Headless Shopify Plus  
> **Target Geographic Market:** United States (`en-US`)  
> **Skills Leveraged:**
> - [Keyword Discovery](../SEO/Keyword%20Research/Keyword%20Discovery/SKILL.md)
> - [Long-tail Keywords](../SEO/Keyword%20Research/Long-tail%20Keywords/SKILL.md)
> - [Search Volume](../SEO/Keyword%20Research/Search%20Volume/SKILL.md)
> - [SERP Analysis](../SEO/Keyword%20Research/SERP%20Analysis/SKILL.md)

---

## 1. Executive Context & Objective

`SummitGear.example.com` is migrating 5,200 active SKUs across 42 category silos. The objective of this keyword research workflow is to:
1. Prevent catastrophic traffic loss during re-platforming by identifying all primary, secondary, and long-tail query variations driving historical revenue.
2. Re-architect the category navigation hierarchy to match modern conversational search behavior.
3. Identify seasonal search spikes (Q4 holiday gifting, winter mountaineering peaks) to calibrate content publishing timelines.
4. Triangulate search intent to ensure transactional categories are not cannibalized by informational buying guides.

---

## 2. Ingestion & Seed Entity Expansion (Phase 1)

### 2.1 Seed Entity Ingestion
Core product silos:
- `waterproof hiking jackets`
- `ultralight backpacking tents`
- `sub-zero sleeping bags`
- `mountaineering crampons`
- `trail running shoes`

### 2.2 Google Search Suggest & Autocomplete Mining
Using Python CLI extraction across search suggest modifiers:
```bash
python -c "
import requests, json
seeds = ['waterproof hiking jacket', 'ultralight tent']
modifiers = ['best', 'vs', 'for winter', 'breathable', 'lightweight']
for s in seeds:
    for m in modifiers:
        q = f'{s} {m}'
        res = requests.get(f'https://suggestqueries.google.com/complete/search?client=chrome&q={q}', timeout=5)
        print(q, res.json()[1][:3])
"
```

*Raw Expansion Output Sample:*
- `waterproof hiking jacket breathable` $\to$ `waterproof hiking jacket breathable women`, `waterproof hiking jacket breathable lightweight`, `waterproof hiking jacket breathable gore tex`
- `ultralight tent 2 person` $\to$ `ultralight tent 2 person freestanding`, `ultralight tent 2 person under 3 lbs`, `ultralight tent 2 person budget`

---

## 3. Long-Tail Extraction & Seasonality Modeling (Phase 2 & 3)

### 3.1 Real Click Potential & Volume Decomposition
Applying the Real Click Potential formula from [Search Volume](../SEO/Keyword%20Research/Search%20Volume/SKILL.md):
$$\text{RCP} = \text{Average Monthly Volume} \times (1 - \text{Zero-Click Rate}) \times \text{SERP Organic CTR}$$

| Target Query | Stated Volume | Seasonality Index (Peak Mo.) | Est. Zero-Click % | Top 3 Est. CTR | Real Click Potential (RCP) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `waterproof hiking jackets` | 14,800 | Nov–Jan (1.85x) | 38% | 24.5% | **2,247 clicks/mo** |
| `lightweight waterproof rain jacket women` | 3,600 | Mar–May (1.40x) | 22% | 28.0% | **786 clicks/mo** |
| `best 2 person ultralight backpacking tent` | 5,400 | Apr–Jul (2.10x) | 31% | 22.0% | **820 clicks/mo** |
| `are gore tex jackets worth it` | 2,900 | Steady (1.05x) | 64% | 14.0% | **146 clicks/mo** |
| `how to wash a down sleeping bag` | 8,100 | Oct–Nov (1.60x) | 58% | 18.0% | **612 clicks/mo** |

---

## 4. Intent Triangulation & Content Archetype Mapping (Phase 4)

| Query Cluster | Dominant SERP Intent | Dominant SERP Features | Designated URL Archetype | Recommended Site Architecture Target |
| :--- | :--- | :--- | :--- | :--- |
| `waterproof hiking jackets` | Commercial / Transactional | Product Listing Ads (PLA), Popular Products Grid | PLP (Category Page) | `/collections/mens-waterproof-hiking-jackets/` |
| `best 2 person ultralight tent under 3 lbs` | Commercial Investigation | AI Overview, Featured Snippet, Review Carousel | Buying Guide (Blog/Hub) | `/guides/best-ultralight-backpacking-tents/` |
| `how to wash down sleeping bag` | Informational | Video Carousel, People Also Ask (PAA) | Tutorial / Support Hub | `/care/how-to-wash-down-sleeping-bag/` |
| `patagonia torrentshell vs arc'teryx beta lt` | Comparison / Decision | Comparison Table, Forum Discussions | Direct Comparison Article | `/comparisons/torrentshell-vs-beta-lt/` |

---

## 5. Final Category Re-Architecture Blueprint & Deliverable (Phase 5)

```
📂 Collections (PLPs)
┃
┣ 📂 /collections/hiking-jackets/ (Target: "hiking jackets")
┃ ┣ 📂 /collections/mens-waterproof-hiking-jackets/ (Target: "mens waterproof hiking jackets")
┃ ┗ 📂 /collections/womens-lightweight-rain-jackets/ (Target: "womens lightweight rain jackets")
┃
┣ 📂 /collections/backpacking-tents/ (Target: "backpacking tents")
┃ ┣ 📂 /collections/ultralight-2-person-tents/ (Target: "2 person ultralight tents")
┃ ┗ 📂 /collections/4-season-mountaineering-tents/ (Target: "4 season mountaineering tents")
```

### 301 Redirect Mapping & Priority Score
Using the Business Value Index ($BVI = \text{RCP} \times \text{Commercial Intent Factor}$):
1. **P0 Critical**: `/category/outerwear/jackets-hike-wp.html` $\to$ `/collections/mens-waterproof-hiking-jackets/` ($BVI = 94/100$)
2. **P0 Critical**: `/tents/light-2p/legacy.php` $\to$ `/collections/ultralight-2-person-tents/` ($BVI = 88/100$)

---

## 6. Limitations & Governance

- **Data Limitation**: Search volumes are rounded rolling 12-month averages from Google Keyword Planner; actual seasonal demand during November Black Friday Cyber Monday (BFCM) surges up to 2.4x the baseline.
- **Next Operational Steps**:
  1. Hand off category titles and meta descriptions to [Title](../SEO/On-page%20SEO/Title/SKILL.md) and [CTR Optimization](../SEO/On-page%20SEO/CTR%20Optimization/SKILL.md).
  2. Map legacy URLs into the 301 redirect engine governed by [Redirects](../SEO/Technical%20SEO/Redirects/SKILL.md).
