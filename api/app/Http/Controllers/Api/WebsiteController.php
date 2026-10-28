<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CrawlRun;
use App\Models\Website;
use App\Services\Crawler\CrawlerService;
use App\Services\Crawler\SSRFGuardService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebsiteController extends Controller
{
    public function __construct(
        protected SSRFGuardService $ssrfGuard,
        protected CrawlerService $crawlerService
    ) {}

    /**
     * List all monitored websites.
     */
    public function index(): JsonResponse
    {
        $websites = Website::with(['project:id,name,client_name', 'crawlRuns' => fn($q) => $q->latest()->take(1)])
            ->latest()
            ->get();

        return response()->json($websites);
    }

    /**
     * Register a new target website under a project.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'project_id' => 'required|uuid|exists:projects,id',
            'base_url' => 'required|url',
            'respect_robots' => 'nullable|boolean',
            'max_crawl_pages' => 'nullable|integer|min:1|max:100',
            'crawl_delay_ms' => 'nullable|integer|min:50|max:2000',
        ]);

        $baseUrl = rtrim($validated['base_url'], '/');
        
        // SSRF Pre-flight check
        $this->ssrfGuard->validateUrl($baseUrl);

        $parsed = parse_url($baseUrl);
        $domain = strtolower($parsed['host'] ?? '');

        $website = Website::create([
            'project_id' => $validated['project_id'],
            'domain' => $domain,
            'base_url' => $baseUrl,
            'respect_robots' => $validated['respect_robots'] ?? true,
            'max_crawl_pages' => $validated['max_crawl_pages'] ?? 50,
            'crawl_delay_ms' => $validated['crawl_delay_ms'] ?? 250,
        ]);

        return response()->json($website, 201);
    }

    /**
     * Show a website and its crawl run history.
     */
    public function show(string $id): JsonResponse
    {
        $website = Website::with(['project', 'crawlRuns' => fn($q) => $q->latest()->take(10)])
            ->findOrFail($id);

        return response()->json($website);
    }

    /**
     * Trigger a new crawl audit for this website.
     */
    public function startCrawl(Request $request, string $id): JsonResponse
    {
        $website = Website::findOrFail($id);

        $crawlRun = CrawlRun::create([
            'website_id' => $website->id,
            'trigger_type' => 'manual',
            'status' => 'pending',
            'pages_discovered' => 0,
            'pages_crawled' => 0,
        ]);

        // Run crawl
        // For deterministic local testing and instant feedback, run immediately
        $this->crawlerService->crawl($crawlRun);

        $crawlRun->refresh();

        return response()->json([
            'message' => 'Crawl completed successfully.',
            'crawl_run' => $crawlRun->load(['issues.crawledPage']),
        ]);
    }
}
