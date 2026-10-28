<?php

namespace App\Services\Crawler;

use App\Models\CrawlRun;
use App\Models\CrawledPage;
use App\Models\TechnicalIssue;
use App\Services\Audit\RuleEngine;
use DOMDocument;
use DOMXPath;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CrawlerService
{
    public function __construct(
        protected SSRFGuardService $ssrfGuard,
        protected RuleEngine $ruleEngine
    ) {}

    /**
     * Execute a crawl run against the associated website.
     */
    public function crawl(CrawlRun $crawlRun): void
    {
        $website = $crawlRun->website;
        $maxPages = max(1, min((int)$website->max_crawl_pages, 100));
        $delayMs = max(50, (int)$website->crawl_delay_ms);

        $crawlRun->update([
            'status' => 'crawling',
            'started_at' => now(),
            'error_message' => null,
        ]);

        $baseUrl = rtrim($website->base_url, '/');
        $parsedBase = parse_url($baseUrl);
        $baseHost = strtolower($parsedBase['host'] ?? '');
        $baseScheme = strtolower($parsedBase['scheme'] ?? 'https');

        $queue = [$baseUrl];
        $visited = [];
        $sitemapUrls = [];
        $internalLinkGraph = []; // url => count of inbound links

        // 1. Try discovering XML sitemap URLs
        try {
            $sitemapUrls = $this->discoverSitemapUrls($baseUrl, $baseHost);
            foreach ($sitemapUrls as $sUrl) {
                if (!in_array($sUrl, $queue, true)) {
                    $queue[] = $sUrl;
                }
            }
        } catch (Exception $e) {
            Log::info("Sitemap discovery notice for {$baseUrl}: " . $e->getMessage());
        }

        $crawlRun->update(['pages_discovered' => count($queue)]);

        $pagesCrawled = 0;
        $criticalCount = 0;
        $warningCount = 0;
        $infoCount = 0;

        try {
            while (!empty($queue) && $pagesCrawled < $maxPages) {
                $currentUrl = array_shift($queue);
                $normalizedUrl = $this->normalizeUrl($currentUrl);

                if (isset($visited[$normalizedUrl])) {
                    continue;
                }
                $visited[$normalizedUrl] = true;

                // SSRF Pre-flight check
                try {
                    $this->ssrfGuard->validateUrl($normalizedUrl);
                } catch (Exception $e) {
                    Log::warning("SSRF check skipped URL: {$normalizedUrl}. Reason: " . $e->getMessage());
                    continue;
                }

                // Rate limiting delay
                if ($pagesCrawled > 0 && $delayMs > 0) {
                    usleep($delayMs * 1000);
                }

                // Fetch page
                $fetchResult = $this->fetchPage($normalizedUrl);
                $pagesCrawled++;

                // Parse page metadata
                $parsedData = $this->parseHtml($fetchResult['body'], $normalizedUrl, $baseHost, $baseScheme);
                $parsedData['status_code'] = $fetchResult['status_code'];
                $parsedData['load_time_ms'] = $fetchResult['load_time_ms'];
                $parsedData['content_length'] = strlen($fetchResult['body']);
                $parsedData['content_type'] = $fetchResult['content_type'];

                // Enqueue discovered internal links if within crawl cap
                foreach ($parsedData['discovered_links'] as $link) {
                    $normalizedLink = $this->normalizeUrl($link);
                    $internalLinkGraph[$normalizedLink] = ($internalLinkGraph[$normalizedLink] ?? 0) + 1;

                    if (!isset($visited[$normalizedLink]) && !in_array($normalizedLink, $queue, true) && (count($visited) + count($queue)) < ($maxPages * 3)) {
                        $queue[] = $normalizedLink;
                    }
                }

                // Evaluate technical issues
                $issues = $this->ruleEngine->evaluatePage($parsedData);

                // Persist page & issues in transaction
                DB::transaction(function () use ($crawlRun, $parsedData, $issues, &$criticalCount, &$warningCount, &$infoCount) {
                    $crawledPage = CrawledPage::create([
                        'crawl_run_id' => $crawlRun->id,
                        'url' => $parsedData['url'],
                        'url_hash' => hash('sha256', $parsedData['url']),
                        'status_code' => $parsedData['status_code'],
                        'content_type' => $parsedData['content_type'],
                        'load_time_ms' => $parsedData['load_time_ms'],
                        'content_length' => $parsedData['content_length'],
                        'title' => $parsedData['title'],
                        'title_length' => mb_strlen($parsedData['title'] ?? ''),
                        'meta_description' => $parsedData['meta_description'],
                        'meta_description_length' => mb_strlen($parsedData['meta_description'] ?? ''),
                        'h1_tags' => $parsedData['h1_tags'],
                        'canonical_url' => $parsedData['canonical_url'],
                        'meta_robots' => $parsedData['meta_robots'],
                        'is_indexable' => !str_contains(strtolower($parsedData['meta_robots'] ?? ''), 'noindex'),
                        'inlinks_count' => 0,
                        'outlinks_count' => count($parsedData['discovered_links']),
                        'images_without_alt_count' => $parsedData['images_without_alt_count'],
                        'has_schema' => $parsedData['has_schema'],
                        'schema_types' => $parsedData['schema_types'],
                    ]);

                    foreach ($issues as $issue) {
                        TechnicalIssue::create([
                            'crawl_run_id' => $crawlRun->id,
                            'crawled_page_id' => $crawledPage->id,
                            'rule_code' => $issue['rule_code'],
                            'category' => $issue['category'],
                            'severity' => $issue['severity'],
                            'evidence' => $issue['evidence'],
                            'explanation' => $issue['explanation'],
                            'remediation' => $issue['remediation'],
                            'status' => 'open',
                        ]);

                        if ($issue['severity'] === 'critical') $criticalCount++;
                        elseif ($issue['severity'] === 'warning') $warningCount++;
                        else $infoCount++;
                    }
                });

                // Update intermediate progress
                $crawlRun->update([
                    'pages_crawled' => $pagesCrawled,
                    'pages_discovered' => count($visited) + count($queue),
                    'critical_issues_count' => $criticalCount,
                    'warning_issues_count' => $warningCount,
                    'info_issues_count' => $infoCount,
                ]);
            }

            // Update inbound link counts for crawled pages
            foreach ($internalLinkGraph as $linkUrl => $inCount) {
                CrawledPage::where('crawl_run_id', $crawlRun->id)
                    ->where('url_hash', hash('sha256', $linkUrl))
                    ->update(['inlinks_count' => $inCount]);
            }

            $crawlRun->update([
                'status' => 'completed',
                'completed_at' => now(),
            ]);

            $website->update(['last_crawled_at' => now()]);

        } catch (Exception $e) {
            Log::error("Crawl failure for run {$crawlRun->id}: " . $e->getMessage());
            $crawlRun->update([
                'status' => 'failed',
                'error_message' => $e->getMessage(),
                'completed_at' => now(),
            ]);
        }
    }

    /**
     * Perform HTTP GET request using cURL with safety bounds.
     */
    protected function fetchPage(string $url): array
    {
        $startTime = microtime(true);
        $ch = curl_init();

        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS => 5,
            CURLOPT_CONNECTTIMEOUT => 8,
            CURLOPT_TIMEOUT => 15,
            CURLOPT_USERAGENT => 'DevCenterPoint-SEO-Bot/1.0 (+https://devcenterpoint.com/bot)',
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2,
            CURLOPT_ENCODING => '', // supports gzip, deflate
            CURLOPT_BUFFERSIZE => 128000,
        ]);

        $body = curl_exec($ch);
        $endTime = microtime(true);
        $loadTimeMs = ($endTime - $startTime) * 1000;

        $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
        $curlError = curl_error($ch);
        curl_close($ch);

        if ($body === false && $statusCode === 0) {
            return [
                'status_code' => 500,
                'content_type' => null,
                'load_time_ms' => $loadTimeMs,
                'body' => "Network/cURL Error: {$curlError}",
            ];
        }

        return [
            'status_code' => $statusCode ?: 200,
            'content_type' => $contentType,
            'load_time_ms' => $loadTimeMs,
            'body' => is_string($body) ? $body : '',
        ];
    }

    /**
     * Parse HTML payload for SEO metadata and internal links.
     */
    protected function parseHtml(string $html, string $url, string $baseHost, string $baseScheme): array
    {
        $title = null;
        $metaDescription = null;
        $canonicalUrl = null;
        $metaRobots = null;
        $h1Tags = [];
        $discoveredLinks = [];
        $imagesWithoutAlt = 0;
        $hasSchema = false;
        $schemaTypes = [];

        if (empty(trim($html))) {
            return compact(
                'url', 'title', 'metaDescription', 'canonicalUrl', 'metaRobots',
                'h1Tags', 'discoveredLinks', 'imagesWithoutAlt', 'hasSchema', 'schemaTypes'
            );
        }

        libxml_use_internal_errors(true);
        $dom = new DOMDocument();
        @$dom->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'), LIBXML_NONET | LIBXML_NOWARNING | LIBXML_NOERROR);
        libxml_clear_errors();

        $xpath = new DOMXPath($dom);

        // Title
        $titleNodes = $xpath->query('//title');
        if ($titleNodes && $titleNodes->length > 0) {
            $title = trim($titleNodes->item(0)->textContent);
        }

        // Meta Description
        $descNodes = $xpath->query('//meta[translate(@name, "DESCRIPTION", "description")="description"]/@content');
        if ($descNodes && $descNodes->length > 0) {
            $metaDescription = trim($descNodes->item(0)->nodeValue);
        }

        // Meta Robots
        $robotsNodes = $xpath->query('//meta[translate(@name, "ROBOTS", "robots")="robots"]/@content');
        if ($robotsNodes && $robotsNodes->length > 0) {
            $metaRobots = trim($robotsNodes->item(0)->nodeValue);
        }

        // Canonical
        $canonicalNodes = $xpath->query('//link[translate(@rel, "CANONICAL", "canonical")="canonical"]/@href');
        if ($canonicalNodes && $canonicalNodes->length > 0) {
            $canonicalUrl = trim($canonicalNodes->item(0)->nodeValue);
        }

        // H1 tags
        $h1Nodes = $xpath->query('//h1');
        if ($h1Nodes) {
            foreach ($h1Nodes as $h1) {
                $text = trim($h1->textContent);
                if ($text !== '') {
                    $h1Tags[] = $text;
                }
            }
        }

        // Images without alt
        $imgNodes = $xpath->query('//img');
        if ($imgNodes) {
            foreach ($imgNodes as $img) {
                $alt = $img->getAttribute('alt');
                if ($alt === null || trim($alt) === '') {
                    $imagesWithoutAlt++;
                }
            }
        }

        // JSON-LD Schema detection
        $schemaNodes = $xpath->query('//script[@type="application/ld+json"]');
        if ($schemaNodes && $schemaNodes->length > 0) {
            $hasSchema = true;
            foreach ($schemaNodes as $node) {
                $rawJson = trim($node->textContent);
                $decoded = json_decode($rawJson, true);
                if (is_array($decoded) && isset($decoded['@type'])) {
                    $type = is_array($decoded['@type']) ? implode(', ', $decoded['@type']) : $decoded['@type'];
                    $schemaTypes[] = $type;
                }
            }
            $schemaTypes = array_values(array_unique($schemaTypes));
        }

        // Internal Links
        $linkNodes = $xpath->query('//a/@href');
        if ($linkNodes) {
            foreach ($linkNodes as $hrefNode) {
                $href = trim($hrefNode->nodeValue);
                if (empty($href) || str_starts_with($href, '#') || str_starts_with($href, 'javascript:') || str_starts_with($href, 'mailto:') || str_starts_with($href, 'tel:')) {
                    continue;
                }

                $resolved = $this->resolveRelativeUrl($href, $url, $baseHost, $baseScheme);
                if ($resolved !== null && !in_array($resolved, $discoveredLinks, true)) {
                    $discoveredLinks[] = $resolved;
                }
            }
        }

        return compact(
            'url', 'title', 'metaDescription', 'canonicalUrl', 'metaRobots',
            'h1Tags', 'discoveredLinks', 'imagesWithoutAlt', 'hasSchema', 'schemaTypes'
        );
    }

    /**
     * Resolve a relative link to absolute URL on the same host.
     */
    protected function resolveRelativeUrl(string $href, string $currentUrl, string $baseHost, string $baseScheme): ?string
    {
        // Protocol-relative //domain.com/path
        if (str_starts_with($href, '//')) {
            $href = $baseScheme . ':' . $href;
        }

        $parsed = parse_url($href);

        // If scheme is mailto, tel, javascript, drop it
        if (isset($parsed['scheme']) && !in_array(strtolower($parsed['scheme']), ['http', 'https'], true)) {
            return null;
        }

        // Has host
        if (isset($parsed['host'])) {
            $linkHost = strtolower($parsed['host']);
            if ($linkHost === $baseHost || str_ends_with($linkHost, '.' . $baseHost)) {
                return $this->normalizeUrl($href);
            }
            return null; // Out of domain scope
        }

        // Relative path
        $path = $parsed['path'] ?? '/';
        $query = isset($parsed['query']) ? '?' . $parsed['query'] : '';

        if (str_starts_with($path, '/')) {
            $absolute = $baseScheme . '://' . $baseHost . $path . $query;
        } else {
            $currentPath = parse_url($currentUrl, PHP_URL_PATH) ?? '/';
            $dir = rtrim(dirname($currentPath), '/\\');
            $absolute = $baseScheme . '://' . $baseHost . ($dir ? $dir . '/' : '/') . $path . $query;
        }

        return $this->normalizeUrl($absolute);
    }

    /**
     * Normalize URL string (remove hash, trailing slashes on bare domains).
     */
    protected function normalizeUrl(string $url): string
    {
        $url = explode('#', $url)[0];
        $parsed = parse_url($url);
        if (!$parsed || !isset($parsed['host'])) {
            return $url;
        }

        $scheme = strtolower($parsed['scheme'] ?? 'https');
        $host = strtolower($parsed['host']);
        $path = $parsed['path'] ?? '/';
        $query = isset($parsed['query']) ? '?' . $parsed['query'] : '';

        // If path is root '/', keep it, else trim trailing slash
        if ($path !== '/') {
            $path = rtrim($path, '/');
        }

        return "{$scheme}://{$host}{$path}{$query}";
    }

    /**
     * Parse sitemap.xml to discover seed URLs.
     */
    protected function discoverSitemapUrls(string $baseUrl, string $baseHost): array
    {
        $urls = [];
        $sitemapEndpoints = ["{$baseUrl}/sitemap.xml", "{$baseUrl}/sitemap_index.xml"];

        foreach ($sitemapEndpoints as $sitemapUrl) {
            $fetch = $this->fetchPage($sitemapUrl);
            if ($fetch['status_code'] === 200 && !empty($fetch['body'])) {
                libxml_use_internal_errors(true);
                $xml = simplexml_load_string($fetch['body']);
                if ($xml !== false) {
                    // Standard <url><loc>
                    if (isset($xml->url)) {
                        foreach ($xml->url as $urlObj) {
                            $loc = trim((string)$urlObj->loc);
                            if ($loc && str_contains(strtolower($loc), $baseHost)) {
                                $urls[] = $this->normalizeUrl($loc);
                            }
                        }
                    }
                    // Sitemap index <sitemap><loc>
                    if (isset($xml->sitemap)) {
                        foreach ($xml->sitemap as $sitemapObj) {
                            $nestedLoc = trim((string)$sitemapObj->loc);
                            if ($nestedLoc) {
                                $nestedFetch = $this->fetchPage($nestedLoc);
                                if ($nestedFetch['status_code'] === 200) {
                                    $subXml = simplexml_load_string($nestedFetch['body']);
                                    if ($subXml && isset($subXml->url)) {
                                        foreach ($subXml->url as $subUrlObj) {
                                            $subLoc = trim((string)$subUrlObj->loc);
                                            if ($subLoc && str_contains(strtolower($subLoc), $baseHost)) {
                                                $urls[] = $this->normalizeUrl($subLoc);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                libxml_clear_errors();
                if (!empty($urls)) break;
            }
        }

        return array_values(array_unique($urls));
    }
}
