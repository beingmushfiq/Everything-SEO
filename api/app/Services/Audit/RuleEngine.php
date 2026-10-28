<?php

namespace App\Services\Audit;

class RuleEngine
{
    /**
     * Evaluate a crawled page against deterministic SEO audit rules.
     *
     * @param array $pageData
     * @return array<array{rule_code: string, category: string, severity: string, evidence: string, explanation: string, remediation: string}>
     */
    public function evaluatePage(array $pageData): array
    {
        $issues = [];
        $statusCode = (int)($pageData['status_code'] ?? 200);
        $url = $pageData['url'] ?? '';

        // 1. Status 4xx Checks
        if ($statusCode >= 400 && $statusCode < 500) {
            $issues[] = [
                'rule_code' => 'TECH_STATUS_4XX',
                'category' => 'crawlability',
                'severity' => 'critical',
                'evidence' => "HTTP {$statusCode} response received for {$url}",
                'explanation' => "Search engine crawlers encountered a client error response. Search engines will drop non-functional URLs from search index.",
                'remediation' => "Ensure active internal links do not point to this URL. Restore page content or implement a 301 permanent redirect to a relevant live page.",
            ];
            // If page is 4xx, stop further on-page checks
            return $issues;
        }

        // 2. Status 5xx Checks
        if ($statusCode >= 500) {
            $issues[] = [
                'rule_code' => 'TECH_STATUS_5XX',
                'category' => 'crawlability',
                'severity' => 'critical',
                'evidence' => "HTTP {$statusCode} server error response received for {$url}",
                'explanation' => "The origin server failed to fulfill an apparently valid request. Persistent 5xx errors directly reduce search crawl frequency and rankings.",
                'remediation' => "Inspect web server and backend application error logs. Resolve server exceptions, database connection timeouts, or upstream proxy errors.",
            ];
            return $issues;
        }

        // 3. Title Missing or Length
        $title = trim($pageData['title'] ?? '');
        $titleLen = mb_strlen($title);
        if ($title === '') {
            $issues[] = [
                'rule_code' => 'ONPAGE_TITLE_MISSING',
                'category' => 'on_page',
                'severity' => 'critical',
                'evidence' => "Zero <title> tag found on page {$url}",
                'explanation' => "The <title> element is the single most fundamental on-page ranking and click-through factor in search engine optimization.",
                'remediation' => "Add a descriptive, keyword-aligned <title> tag between 45 and 65 characters.",
            ];
        } elseif ($titleLen < 25) {
            $issues[] = [
                'rule_code' => 'ONPAGE_TITLE_TOO_SHORT',
                'category' => 'on_page',
                'severity' => 'warning',
                'evidence' => "Title is only {$titleLen} characters: \"{$title}\"",
                'explanation' => "Short titles miss opportunities to convey primary topic, secondary modifiers, or brand context.",
                'remediation' => "Expand the title tag to 45-65 characters to fully capture user search intent.",
            ];
        } elseif ($titleLen > 70) {
            $issues[] = [
                'rule_code' => 'ONPAGE_TITLE_TOO_LONG',
                'category' => 'on_page',
                'severity' => 'info',
                'evidence' => "Title is {$titleLen} characters: \"{$title}\"",
                'explanation' => "Search engines truncate page titles exceeding approximately 600 pixels (~60-70 characters) on SERPs.",
                'remediation' => "Front-load primary keywords and tighten title to avoid truncation in search engine snippets.",
            ];
        }

        // 4. Meta Description Missing or Length
        $description = trim($pageData['meta_description'] ?? '');
        $descLen = mb_strlen($description);
        if ($description === '') {
            $issues[] = [
                'rule_code' => 'ONPAGE_DESC_MISSING',
                'category' => 'on_page',
                'severity' => 'warning',
                'evidence' => "No <meta name=\"description\"> tag present on {$url}",
                'explanation' => "Without a defined meta description, search engines will auto-generate snippets from page text, often yielding suboptimal CTR.",
                'remediation' => "Provide an engaging, search-intent matched meta description between 120 and 160 characters.",
            ];
        } elseif ($descLen > 175) {
            $issues[] = [
                'rule_code' => 'ONPAGE_DESC_TOO_LONG',
                'category' => 'on_page',
                'severity' => 'info',
                'evidence' => "Meta description is {$descLen} characters",
                'explanation' => "Descriptions over ~160 characters are truncated on desktop and mobile SERPs.",
                'remediation' => "Condense meta description to under 160 characters while retaining core value proposition.",
            ];
        }

        // 5. H1 Headings
        $h1Tags = $pageData['h1_tags'] ?? [];
        if (empty($h1Tags)) {
            $issues[] = [
                'rule_code' => 'ONPAGE_H1_ABSENT',
                'category' => 'on_page',
                'severity' => 'warning',
                'evidence' => "Page has 0 <h1> headings",
                'explanation' => "The primary <h1> heading communicates the central topic of the page to users and search crawlers.",
                'remediation' => "Include exactly one clear <h1> heading at the top of the main content area.",
            ];
        } elseif (count($h1Tags) > 1) {
            $count = count($h1Tags);
            $issues[] = [
                'rule_code' => 'ONPAGE_H1_MULTI',
                'category' => 'on_page',
                'severity' => 'info',
                'evidence' => "Page contains {$count} distinct <h1> tags",
                'explanation' => "While HTML5 permits multiple <h1> elements, SEO best practice recommends a single primary <h1> to structure document hierarchy.",
                'remediation' => "Retain the main page title as <h1> and demote secondary section headings to <h2> or <h3>.",
            ];
        }

        // 6. Meta Robots Noindex
        $metaRobots = strtolower($pageData['meta_robots'] ?? '');
        if (str_contains($metaRobots, 'noindex')) {
            $issues[] = [
                'rule_code' => 'INDEX_ROBOTS_NOINDEX',
                'category' => 'indexability',
                'severity' => 'warning',
                'evidence' => "robots directive contains: \"{$metaRobots}\"",
                'explanation' => "The 'noindex' directive explicitly instructs search engines not to display this page in search results.",
                'remediation' => "Verify if this page was intentionally excluded from indexation. If meant to rank organically, remove the noindex tag.",
            ];
        }

        // 7. Canonical Tag Consistency
        $canonical = trim($pageData['canonical_url'] ?? '');
        if ($canonical !== '') {
            $normalizedCurrent = rtrim(explode('?', $url)[0], '/');
            $normalizedCanonical = rtrim(explode('?', $canonical)[0], '/');

            if ($normalizedCurrent !== $normalizedCanonical && !empty($normalizedCanonical)) {
                $issues[] = [
                    'rule_code' => 'INDEX_CANONICAL_MISMATCH',
                    'category' => 'indexability',
                    'severity' => 'info',
                    'evidence' => "Page URL is '{$url}' but canonical specifies '{$canonical}'",
                    'explanation' => "This page points its canonical link to another destination, signaling that search engines should credit rank equity to the target.",
                    'remediation' => "Verify that canonical target is intended. If this is original unique content, update canonical to be self-referential.",
                ];
            }
        }

        // 8. Images Missing Alt Attributes
        $imagesWithoutAlt = (int)($pageData['images_without_alt_count'] ?? 0);
        if ($imagesWithoutAlt > 0) {
            $issues[] = [
                'rule_code' => 'ONPAGE_IMG_NO_ALT',
                'category' => 'accessibility',
                'severity' => 'warning',
                'evidence' => "{$imagesWithoutAlt} image(s) missing alt attribute on page",
                'explanation' => "Missing alt attributes hinder visual search indexation (Google Images) and degrade accessibility compliance (WCAG).",
                'remediation' => "Add meaningful, contextual alt descriptions to all non-decorative <img> tags.",
            ];
        }

        // 9. Slow Page Response (> 1.5s)
        $loadTime = (float)($pageData['load_time_ms'] ?? 0);
        if ($loadTime > 1500) {
            $issues[] = [
                'rule_code' => 'PERF_SLOW_TTFB',
                'category' => 'performance',
                'severity' => 'warning',
                'evidence' => "HTML document response time took " . number_format($loadTime, 0) . "ms",
                'explanation' => "High Time-To-First-Byte (TTFB) indicates server latency, inefficient database queries, or lack of page caching.",
                'remediation' => "Implement server-level page caching (e.g., Redis, FastCGI cache, or Cloudflare CDN caching) to lower initial response under 500ms.",
            ];
        }

        return $issues;
    }
}
