<?php

namespace App\Services\Reports;

use App\Models\CrawlRun;

class ReportExportService
{
    /**
     * Generate CSV export string for a crawl run's technical issues.
     */
    public function generateCsv(CrawlRun $crawlRun): string
    {
        $handle = fopen('php://memory', 'r+');

        // CSV Header
        fputcsv($handle, [
            'Issue ID',
            'Rule Code',
            'Severity',
            'Category',
            'Status',
            'Affected URL',
            'Evidence',
            'Explanation',
            'Recommended Remediation',
            'Detected At',
        ]);

        $crawlRun->load(['issues.crawledPage']);

        foreach ($crawlRun->issues as $issue) {
            fputcsv($handle, [
                $issue->id,
                $issue->rule_code,
                strtoupper($issue->severity),
                $issue->category,
                $issue->status,
                $issue->crawledPage?->url ?? 'Site-wide',
                $issue->evidence,
                $issue->explanation,
                $issue->remediation,
                $issue->created_at?->toIso8601String(),
            ]);
        }

        rewind($handle);
        $csv = stream_get_contents($handle);
        fclose($handle);

        return $csv ?: '';
    }

    /**
     * Generate printer-friendly, executive HTML audit report.
     */
    public function generateHtmlReport(CrawlRun $crawlRun): string
    {
        $crawlRun->load(['website.project.workspace', 'issues.crawledPage']);
        $website = $crawlRun->website;
        $project = $website->project;
        $issues = $crawlRun->issues;

        $critical = $crawlRun->critical_issues_count;
        $warning = $crawlRun->warning_issues_count;
        $info = $crawlRun->info_issues_count;
        $totalCrawled = max(1, $crawlRun->pages_crawled);

        // Technical Health Score Calculation (100 base, deductions for critical/warning)
        $scoreDeduction = ($critical * 12) + ($warning * 3);
        $healthScore = max(10, min(100, 100 - (int)($scoreDeduction / $totalCrawled * 10)));

        $scoreColor = $healthScore >= 80 ? '#10b981' : ($healthScore >= 55 ? '#f59e0b' : '#ef4444');

        ob_start();
        ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SEO Technical Audit Report - <?= htmlspecialchars($website->domain) ?></title>
    <style>
        @media print {
            body { background: #fff !important; color: #111 !important; }
            .no-print { display: none !important; }
            .page-break { page-break-before: always; }
        }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #1e293b; background: #f8fafc; margin: 0; padding: 40px; }
        .container { max-width: 900px; margin: 0 auto; background: #fff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 24px; margin-bottom: 32px; }
        .brand { font-size: 20px; font-weight: 800; color: #2563eb; letter-spacing: -0.5px; }
        .tagline { font-size: 13px; color: #64748b; }
        .score-card { display: flex; align-items: center; gap: 24px; background: #f1f5f9; padding: 24px; border-radius: 8px; margin-bottom: 32px; }
        .score-circle { width: 90px; height: 90px; border-radius: 50%; background: <?= $scoreColor ?>; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 800; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
        .stat-box { background: #fff; border: 1px solid #e2e8f0; padding: 16px; border-radius: 6px; text-align: center; }
        .stat-num { font-size: 24px; font-weight: 700; color: #0f172a; }
        .stat-label { font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: 600; }
        .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
        .badge-critical { background: #fee2e2; color: #991b1b; }
        .badge-warning { background: #fef3c7; color: #92400e; }
        .badge-info { background: #e0f2fe; color: #075985; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
        th, td { text-align: left; padding: 12px; border-bottom: 1px solid #e2e8f0; }
        th { background: #f8fafc; font-weight: 600; color: #475569; }
        .btn-print { background: #2563eb; color: #fff; border: none; padding: 10px 20px; font-weight: 600; border-radius: 6px; cursor: pointer; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div>
                <div class="brand">DevCenterPoint SEO Operations</div>
                <div class="tagline">Deterministic Technical Website Audit Report</div>
            </div>
            <div class="no-print">
                <button class="btn-print" onclick="window.print()">Print / Save PDF</button>
            </div>
        </div>

        <h1>Technical SEO Audit: <?= htmlspecialchars($website->domain) ?></h1>
        <p style="color: #64748b; font-size: 14px;">
            Target URL: <strong><?= htmlspecialchars($website->base_url) ?></strong> | 
            Audit Date: <strong><?= $crawlRun->completed_at ? $crawlRun->completed_at->format('M d, Y H:i:s') : now()->format('M d, Y') ?></strong> |
            Client: <strong><?= htmlspecialchars($project->client_name ?? $project->name) ?></strong>
        </p>

        <div class="score-card">
            <div class="score-circle"><?= $healthScore ?></div>
            <div>
                <h3 style="margin: 0 0 4px 0; font-size: 20px;">Overall Technical Health Score</h3>
                <p style="margin: 0; color: #64748b; font-size: 14px;">
                    Calculated based on <?= $crawlRun->pages_crawled ?> crawled pages, evaluating crawlability, indexability, metadata completeness, and document structure.
                </p>
            </div>
        </div>

        <div class="stats-grid">
            <div class="stat-box">
                <div class="stat-num"><?= $crawlRun->pages_crawled ?></div>
                <div class="stat-label">Pages Crawled</div>
            </div>
            <div class="stat-box">
                <div class="stat-num" style="color: #dc2626;"><?= $critical ?></div>
                <div class="stat-label">Critical Defects</div>
            </div>
            <div class="stat-box">
                <div class="stat-num" style="color: #d97706;"><?= $warning ?></div>
                <div class="stat-label">Warnings</div>
            </div>
            <div class="stat-box">
                <div class="stat-num" style="color: #0284c7;"><?= $info ?></div>
                <div class="stat-label">Notices</div>
            </div>
        </div>

        <h2>Prioritized Technical Findings</h2>
        <table>
            <thead>
                <tr>
                    <th style="width: 100px;">Severity</th>
                    <th style="width: 140px;">Rule</th>
                    <th>Affected URL & Remediation Evidence</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($issues as $issue): ?>
                <tr>
                    <td>
                        <span class="badge badge-<?= htmlspecialchars($issue->severity) ?>">
                            <?= htmlspecialchars($issue->severity) ?>
                        </span>
                    </td>
                    <td>
                        <strong><?= htmlspecialchars($issue->rule_code) ?></strong>
                        <div style="font-size: 11px; color: #64748b;"><?= htmlspecialchars($issue->category) ?></div>
                    </td>
                    <td>
                        <div style="font-weight: 600; color: #1e293b;"><?= htmlspecialchars($issue->crawledPage?->url ?? 'Site-wide') ?></div>
                        <div style="color: #64748b; margin: 4px 0;"><strong>Evidence:</strong> <?= htmlspecialchars($issue->evidence) ?></div>
                        <div style="background: #f8fafc; padding: 6px 10px; border-radius: 4px; font-size: 12px; color: #334155;">
                            <strong>Recommended Fix:</strong> <?= htmlspecialchars($issue->remediation) ?>
                        </div>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
            Generated by DevCenterPoint SEO Operating System | Evidence-based Technical SEO
        </div>
    </div>
</body>
</html>
        <?php
        return ob_get_clean() ?: '';
    }
}
