<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CrawlRun;
use App\Models\TechnicalIssue;
use App\Services\Reports\ReportExportService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CrawlRunController extends Controller
{
    public function __construct(
        protected ReportExportService $reportExportService
    ) {}

    /**
     * Show crawl run summary and crawled pages.
     */
    public function show(string $id): JsonResponse
    {
        $crawlRun = CrawlRun::with([
            'website.project',
            'pages' => fn($q) => $q->latest()->take(100),
            'issues.crawledPage'
        ])->findOrFail($id);

        return response()->json($crawlRun);
    }

    /**
     * Get filterable list of issues for a crawl run.
     */
    public function issues(Request $request, string $id): JsonResponse
    {
        $crawlRun = CrawlRun::findOrFail($id);

        $query = TechnicalIssue::with('crawledPage')
            ->where('crawl_run_id', $crawlRun->id);

        if ($request->filled('severity')) {
            $query->where('severity', $request->query('severity'));
        }

        if ($request->filled('category')) {
            $query->where('category', $request->query('category'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->query('status'));
        }

        if ($request->filled('search')) {
            $search = '%' . $request->query('search') . '%';
            $query->where(function($q) use ($search) {
                $q->where('rule_code', 'like', $search)
                  ->orWhere('evidence', 'like', $search)
                  ->orWhere('explanation', 'like', $search);
            });
        }

        $issues = $query->latest()->paginate(50);

        return response()->json($issues);
    }

    /**
     * Update issue status and resolution notes (Action Center).
     */
    public function updateIssue(Request $request, string $id): JsonResponse
    {
        $issue = TechnicalIssue::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:open,in_progress,ignored,resolved',
            'assigned_to' => 'nullable|string|max:150',
            'resolution_notes' => 'nullable|string',
        ]);

        $issue->update($validated);

        return response()->json([
            'message' => 'Issue status updated successfully.',
            'issue' => $issue->load('crawledPage'),
        ]);
    }

    /**
     * Export technical audit issues as CSV.
     */
    public function exportCsv(string $id): Response
    {
        $crawlRun = CrawlRun::findOrFail($id);
        $csv = $this->reportExportService->generateCsv($crawlRun);

        $filename = "audit-issues-{$crawlRun->website->domain}-{$crawlRun->id}.csv";

        return response($csv, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ]);
    }

    /**
     * Export executive printer-friendly HTML audit report.
     */
    public function exportHtml(string $id): Response
    {
        $crawlRun = CrawlRun::findOrFail($id);
        $html = $this->reportExportService->generateHtmlReport($crawlRun);

        return response($html, 200, [
            'Content-Type' => 'text/html; charset=UTF-8',
        ]);
    }
}
