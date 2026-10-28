<?php

namespace Database\Seeders;

use App\Models\ContentBrief;
use App\Models\CrawlRun;
use App\Models\CrawledPage;
use App\Models\Keyword;
use App\Models\KeywordCluster;
use App\Models\Project;
use App\Models\SearchPerformanceMetric;
use App\Models\TechnicalIssue;
use App\Models\User;
use App\Models\Website;
use App\Models\Workspace;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Workspace
        $workspace = Workspace::firstOrCreate(
            ['slug' => 'default-agency'],
            ['name' => 'DevCenterPoint Operations', 'plan' => 'agency']
        );

        // 2. Project
        $project = Project::create([
            'workspace_id' => $workspace->id,
            'name' => 'DevCenterPoint Digital Flagship',
            'client_name' => 'DevCenterPoint Global',
            'target_country' => 'US',
            'primary_language' => 'en',
            'objectives' => 'Scale organic search visibility for high-intent technical software engineering and SEO consulting services.',
        ]);

        // 3. Website
        $website = Website::create([
            'project_id' => $project->id,
            'domain' => 'devcenterpoint.com',
            'base_url' => 'https://devcenterpoint.com',
            'respect_robots' => true,
            'max_crawl_pages' => 50,
            'crawl_delay_ms' => 200,
            'last_crawled_at' => now(),
        ]);

        // 4. Crawl Run
        $crawlRun = CrawlRun::create([
            'website_id' => $website->id,
            'trigger_type' => 'manual',
            'status' => 'completed',
            'pages_discovered' => 28,
            'pages_crawled' => 8,
            'critical_issues_count' => 2,
            'warning_issues_count' => 4,
            'info_issues_count' => 3,
            'started_at' => now()->subMinutes(12),
            'completed_at' => now()->subMinutes(10),
        ]);

        // 5. Crawled Pages & Technical Issues
        $pages = [
            [
                'url' => 'https://devcenterpoint.com',
                'status_code' => 200,
                'title' => 'DevCenterPoint | Advanced Technical SEO & Software Engineering',
                'meta_description' => 'DevCenterPoint builds modern digital products, enterprise web architectures, and evidence-based SEO search campaigns.',
                'h1' => ['Engineering Scalable Digital Products & Search Dominance'],
                'alt_missing' => 0,
                'load_time' => 320,
                'issues' => [],
            ],
            [
                'url' => 'https://devcenterpoint.com/services/technical-seo',
                'status_code' => 200,
                'title' => 'Technical SEO Services', // too short
                'meta_description' => '', // missing description
                'h1' => ['Technical SEO Consulting', 'Audit Checklist & Deliverables'], // multi h1
                'alt_missing' => 3,
                'load_time' => 480,
                'issues' => [
                    [
                        'rule_code' => 'ONPAGE_TITLE_TOO_SHORT',
                        'category' => 'on_page',
                        'severity' => 'warning',
                        'evidence' => 'Title length is 22 characters: "Technical SEO Services"',
                        'explanation' => 'Short titles miss opportunities to convey primary topic, secondary modifiers, or brand context.',
                        'remediation' => 'Expand title to 45-65 characters: e.g. "Technical SEO Services & Architecture Audits | DevCenterPoint"',
                    ],
                    [
                        'rule_code' => 'ONPAGE_DESC_MISSING',
                        'category' => 'on_page',
                        'severity' => 'warning',
                        'evidence' => 'No <meta name="description"> tag found on page',
                        'explanation' => 'Without a defined meta description, search engines will auto-generate snippets from page text, often yielding suboptimal CTR.',
                        'remediation' => 'Add an enticing 140-155 character meta description addressing client business outcomes.',
                    ],
                    [
                        'rule_code' => 'ONPAGE_H1_MULTI',
                        'category' => 'on_page',
                        'severity' => 'info',
                        'evidence' => 'Page contains 2 distinct <h1> tags',
                        'explanation' => 'While HTML5 permits multiple <h1> elements, SEO best practice recommends a single primary <h1> to structure document hierarchy.',
                        'remediation' => 'Retain primary title as <h1> and demote secondary section headings to <h2>.',
                    ],
                    [
                        'rule_code' => 'ONPAGE_IMG_NO_ALT',
                        'category' => 'accessibility',
                        'severity' => 'warning',
                        'evidence' => '3 image tags lack an alt attribute',
                        'explanation' => 'Missing alt attributes hinder visual search indexation (Google Images) and degrade accessibility compliance (WCAG).',
                        'remediation' => 'Add descriptive alt text specifying diagram or graphic content.',
                    ],
                ],
            ],
            [
                'url' => 'https://devcenterpoint.com/legacy-api-v1',
                'status_code' => 404,
                'title' => '404 Not Found',
                'meta_description' => '',
                'h1' => ['Page Not Found'],
                'alt_missing' => 0,
                'load_time' => 190,
                'issues' => [
                    [
                        'rule_code' => 'TECH_STATUS_4XX',
                        'category' => 'crawlability',
                        'severity' => 'critical',
                        'evidence' => 'HTTP 404 response received for https://devcenterpoint.com/legacy-api-v1',
                        'explanation' => 'Internal links pointing to dead 404 pages waste crawler budget and degrade user journey.',
                        'remediation' => 'Update referring internal links and implement a 301 permanent redirect to /services/api-development.',
                    ],
                ],
            ],
            [
                'url' => 'https://devcenterpoint.com/case-studies/slow-enterprise-portal',
                'status_code' => 200,
                'title' => 'Enterprise Portal Scaling Case Study | Modern Headless Systems',
                'meta_description' => 'Read how DevCenterPoint redesigned an enterprise portal to achieve sub-second page loads and 140% organic traffic growth.',
                'h1' => ['Enterprise Portal Scaling Case Study'],
                'alt_missing' => 1,
                'load_time' => 1850, // slow ttfb
                'issues' => [
                    [
                        'rule_code' => 'PERF_SLOW_TTFB',
                        'category' => 'performance',
                        'severity' => 'warning',
                        'evidence' => 'Initial HTML response latency was 1850ms',
                        'explanation' => 'High TTFB directly impairs Core Web Vitals and increases bounce rate.',
                        'remediation' => 'Implement server-side page caching with Redis or Cloudflare edge caching.',
                    ],
                ],
            ],
        ];

        foreach ($pages as $p) {
            $cPage = CrawledPage::create([
                'crawl_run_id' => $crawlRun->id,
                'url' => $p['url'],
                'url_hash' => hash('sha256', $p['url']),
                'status_code' => $p['status_code'],
                'content_type' => 'text/html; charset=UTF-8',
                'load_time_ms' => $p['load_time'],
                'content_length' => 45000,
                'title' => $p['title'],
                'title_length' => mb_strlen($p['title']),
                'meta_description' => $p['meta_description'],
                'meta_description_length' => mb_strlen($p['meta_description']),
                'h1_tags' => $p['h1'],
                'canonical_url' => $p['url'],
                'meta_robots' => 'index, follow',
                'is_indexable' => $p['status_code'] === 200,
                'inlinks_count' => 12,
                'outlinks_count' => 24,
                'images_without_alt_count' => $p['alt_missing'],
                'has_schema' => true,
                'schema_types' => ['Organization', 'WebSite'],
            ]);

            foreach ($p['issues'] as $iss) {
                TechnicalIssue::create([
                    'crawl_run_id' => $crawlRun->id,
                    'crawled_page_id' => $cPage->id,
                    'rule_code' => $iss['rule_code'],
                    'category' => $iss['category'],
                    'severity' => $iss['severity'],
                    'evidence' => $iss['evidence'],
                    'explanation' => $iss['explanation'],
                    'remediation' => $iss['remediation'],
                    'status' => 'open',
                ]);
            }
        }

        // 6. Keyword Clusters & Keywords
        $c1 = KeywordCluster::create([
            'project_id' => $project->id,
            'name' => 'Technical SEO Consulting',
            'intent' => 'commercial',
            'primary_keyword' => 'technical seo agency',
            'total_volume' => 8400,
        ]);

        Keyword::create([
            'project_id' => $project->id,
            'cluster_id' => $c1->id,
            'keyword' => 'technical seo agency',
            'target_country' => 'US',
            'search_intent' => 'commercial',
            'search_volume' => 3600,
            'keyword_difficulty' => 48.0,
            'cpc' => 14.50,
            'target_url' => 'https://devcenterpoint.com/services/technical-seo',
        ]);

        Keyword::create([
            'project_id' => $project->id,
            'cluster_id' => $c1->id,
            'keyword' => 'enterprise seo consultant',
            'target_country' => 'US',
            'search_intent' => 'commercial',
            'search_volume' => 2800,
            'keyword_difficulty' => 52.0,
            'cpc' => 18.20,
            'target_url' => 'https://devcenterpoint.com/services/technical-seo',
        ]);

        $c2 = KeywordCluster::create([
            'project_id' => $project->id,
            'name' => 'Full Stack Engineering',
            'intent' => 'transactional',
            'primary_keyword' => 'hire laravel developers',
            'total_volume' => 6200,
        ]);

        Keyword::create([
            'project_id' => $project->id,
            'cluster_id' => $c2->id,
            'keyword' => 'hire laravel developers',
            'target_country' => 'US',
            'search_intent' => 'transactional',
            'search_volume' => 4100,
            'keyword_difficulty' => 39.0,
            'cpc' => 9.80,
            'target_url' => 'https://devcenterpoint.com/services/laravel',
        ]);

        // 7. Content Briefs
        ContentBrief::create([
            'project_id' => $project->id,
            'target_keyword' => 'technical seo agency',
            'title_draft' => 'How to Choose an Enterprise Technical SEO Agency in 2026',
            'search_intent' => 'commercial',
            'target_audience' => 'VP of Engineering, CTOs, and Heads of Organic Growth',
            'editorial_guidelines' => 'Focus heavily on code-level remediation (SSR, hydration, edge caching) rather than generic blog fluff.',
            'suggested_headings' => [
                'Why Most Generalist SEO Audits Fail Enterprise Architecture',
                'Core Competencies: Server-Side Rendering, Core Web Vitals, Edge Redirects',
                'Evaluating Agency Technical Capabilities vs Superficial Tools',
                'DevCenterPoint Technical SEO Audit Framework',
            ],
            'internal_link_recommendations' => [
                'https://devcenterpoint.com/services/technical-seo',
                'https://devcenterpoint.com/case-studies/slow-enterprise-portal'
            ],
            'status' => 'review',
        ]);

        // 8. Search Performance Metrics
        for ($i = 29; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->toDateString();
            SearchPerformanceMetric::create([
                'website_id' => $website->id,
                'date' => $date,
                'query' => 'technical seo agency',
                'page' => 'https://devcenterpoint.com/services/technical-seo',
                'device' => 'ALL',
                'country' => 'US',
                'clicks' => rand(25, 45),
                'impressions' => rand(480, 720),
                'ctr' => 0.058,
                'average_position' => 3.8,
            ]);

            SearchPerformanceMetric::create([
                'website_id' => $website->id,
                'date' => $date,
                'query' => 'enterprise seo consultant',
                'page' => 'https://devcenterpoint.com/services/technical-seo',
                'device' => 'ALL',
                'country' => 'US',
                'clicks' => rand(15, 30),
                'impressions' => rand(600, 850),
                'ctr' => 0.032,
                'average_position' => 5.4,
            ]);

            SearchPerformanceMetric::create([
                'website_id' => $website->id,
                'date' => $date,
                'query' => 'hire laravel developers',
                'page' => 'https://devcenterpoint.com/services/laravel',
                'device' => 'ALL',
                'country' => 'US',
                'clicks' => rand(18, 38),
                'impressions' => rand(350, 520),
                'ctr' => 0.065,
                'average_position' => 4.1,
            ]);
        }
    }
}
