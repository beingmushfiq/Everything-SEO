<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CrawlRun;
use App\Models\Project;
use App\Models\SearchPerformanceMetric;
use App\Models\TechnicalIssue;
use App\Models\Website;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    /**
     * Get system-wide operational summary for the Command Center.
     */
    public function index(): JsonResponse
    {
        $projectsCount = Project::count();
        $websitesCount = Website::count();
        $crawlsCount = CrawlRun::count();

        // Recent Crawl Runs
        $recentCrawls = CrawlRun::with('website:id,domain,base_url')
            ->latest()
            ->take(5)
            ->get();

        // Open Issues by Severity
        $openIssuesCounts = [
            'critical' => TechnicalIssue::where('status', 'open')->where('severity', 'critical')->count(),
            'warning' => TechnicalIssue::where('status', 'open')->where('severity', 'warning')->count(),
            'info' => TechnicalIssue::where('status', 'open')->where('severity', 'info')->count(),
        ];

        // Issues by Category
        $issuesByCategory = TechnicalIssue::selectRaw('category, count(*) as count')
            ->where('status', 'open')
            ->groupBy('category')
            ->get();

        // GSC Search Performance aggregates (last 30 days)
        $totalClicks = (int)SearchPerformanceMetric::sum('clicks');
        $totalImpressions = (int)SearchPerformanceMetric::sum('impressions');
        $avgCtr = $totalImpressions > 0 ? round(($totalClicks / $totalImpressions) * 100, 2) : 0;

        return response()->json([
            'overview' => [
                'projects_count' => $projectsCount,
                'websites_count' => $websitesCount,
                'total_crawls' => $crawlsCount,
                'open_issues' => $openIssuesCounts,
                'search_performance' => [
                    'clicks' => $totalClicks,
                    'impressions' => $totalImpressions,
                    'avg_ctr_percent' => $avgCtr,
                ],
            ],
            'recent_crawls' => $recentCrawls,
            'issues_by_category' => $issuesByCategory,
        ]);
    }
}
