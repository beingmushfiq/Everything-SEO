<?php

namespace App\Services\Keywords;

use App\Models\Keyword;
use App\Models\KeywordCluster;
use App\Models\Project;
use Illuminate\Support\Facades\DB;

class KeywordClusterService
{
    /**
     * Ingest and cluster keywords from CSV content.
     *
     * @param Project $project
     * @param string $csvContent
     * @return array{total_imported: int, clusters_created: int}
     */
    public function importAndClusterCsv(Project $project, string $csvContent): array
    {
        $lines = str_getcsv($csvContent, "\n");
        if (empty($lines)) {
            return ['total_imported' => 0, 'clusters_created' => 0];
        }

        // Parse header row
        $header = str_getcsv(array_shift($lines));
        $headerMap = $this->mapCsvHeaders($header);

        $keywords = [];

        foreach ($lines as $line) {
            if (empty(trim($line))) continue;
            $row = str_getcsv($line);
            if (empty($row) || !isset($row[$headerMap['keyword']])) continue;

            $kw = trim($row[$headerMap['keyword']]);
            // CSV formula injection protection: strip leading =, +, -, @
            $kw = ltrim($kw, "=+ -@\t\r");
            if (empty($kw)) continue;

            $volume = isset($headerMap['volume']) && isset($row[$headerMap['volume']]) && is_numeric(trim($row[$headerMap['volume']]))
                ? (int)trim($row[$headerMap['volume']])
                : null;

            $difficulty = isset($headerMap['difficulty']) && isset($row[$headerMap['difficulty']]) && is_numeric(trim($row[$headerMap['difficulty']]))
                ? (float)trim($row[$headerMap['difficulty']])
                : null;

            $cpc = isset($headerMap['cpc']) && isset($row[$headerMap['cpc']]) && is_numeric(trim($row[$headerMap['cpc']]))
                ? (float)trim($row[$headerMap['cpc']])
                : null;

            $intent = isset($headerMap['intent']) && !empty($row[$headerMap['intent']])
                ? strtolower(trim($row[$headerMap['intent']]))
                : $this->detectIntent($kw);

            $keywords[] = [
                'keyword' => $kw,
                'volume' => $volume,
                'difficulty' => $difficulty,
                'cpc' => $cpc,
                'intent' => $intent,
            ];
        }

        if (empty($keywords)) {
            return ['total_imported' => 0, 'clusters_created' => 0];
        }

        // Group into semantic clusters by prominent token
        $clusteredBuckets = $this->clusterKeywords($keywords);

        $importedCount = 0;
        $clustersCreated = 0;

        DB::transaction(function () use ($project, $clusteredBuckets, &$importedCount, &$clustersCreated) {
            foreach ($clusteredBuckets as $clusterName => $bucket) {
                $totalVol = 0;
                foreach ($bucket['items'] as $item) {
                    $totalVol += ($item['volume'] ?? 0);
                }

                $cluster = KeywordCluster::create([
                    'project_id' => $project->id,
                    'name' => ucwords($clusterName),
                    'intent' => $bucket['dominant_intent'],
                    'primary_keyword' => $bucket['items'][0]['keyword'],
                    'total_volume' => $totalVol,
                ]);
                $clustersCreated++;

                foreach ($bucket['items'] as $item) {
                    Keyword::create([
                        'project_id' => $project->id,
                        'cluster_id' => $cluster->id,
                        'keyword' => $item['keyword'],
                        'target_country' => $project->target_country ?? 'US',
                        'search_intent' => $item['intent'],
                        'search_volume' => $item['volume'],
                        'keyword_difficulty' => $item['difficulty'],
                        'cpc' => $item['cpc'],
                        'source_dataset' => 'csv_import',
                    ]);
                    $importedCount++;
                }
            }
        });

        return [
            'total_imported' => $importedCount,
            'clusters_created' => $clustersCreated,
        ];
    }

    /**
     * Group keywords into clusters based on shared significant tokens.
     */
    protected function clusterKeywords(array $keywords): array
    {
        $clusters = [];
        $stopWords = ['a', 'an', 'the', 'in', 'on', 'at', 'for', 'to', 'of', 'and', 'or', 'is', 'with', 'by'];

        foreach ($keywords as $item) {
            $tokens = preg_split('/[\s\-_]+/', strtolower($item['keyword']));
            $filteredTokens = array_values(array_filter($tokens, fn($t) => strlen($t) > 2 && !in_array($t, $stopWords)));

            $assignedCluster = 'General Keywords';
            if (!empty($filteredTokens)) {
                // Find most meaningful token
                $assignedCluster = reset($filteredTokens);
                if (count($filteredTokens) >= 2) {
                    $assignedCluster = $filteredTokens[0] . ' ' . $filteredTokens[1];
                }
            }

            if (!isset($clusters[$assignedCluster])) {
                $clusters[$assignedCluster] = [
                    'items' => [],
                    'intents' => [],
                ];
            }

            $clusters[$assignedCluster]['items'][] = $item;
            $clusters[$assignedCluster]['intents'][] = $item['intent'];
        }

        // Determine dominant intent per cluster
        foreach ($clusters as $key => &$cluster) {
            $intentCounts = array_count_values($cluster['intents']);
            arsort($intentCounts);
            $cluster['dominant_intent'] = key($intentCounts) ?: 'informational';
        }

        return $clusters;
    }

    /**
     * Map header column names flexibly.
     */
    protected function mapCsvHeaders(array $headers): array
    {
        $map = ['keyword' => 0];

        foreach ($headers as $index => $col) {
            $colName = strtolower(trim(str_replace(['"', "'", "\r", "\n"], '', $col)));

            if (in_array($colName, ['keyword', 'keywords', 'query', 'search query', 'term'])) {
                $map['keyword'] = $index;
            } elseif (in_array($colName, ['volume', 'search volume', 'monthly searches', 'search_volume'])) {
                $map['volume'] = $index;
            } elseif (in_array($colName, ['kd', 'difficulty', 'keyword difficulty', 'competition'])) {
                $map['difficulty'] = $index;
            } elseif (in_array($colName, ['cpc', 'cost per click'])) {
                $map['cpc'] = $index;
            } elseif (in_array($colName, ['intent', 'search intent'])) {
                $map['intent'] = $index;
            }
        }

        return $map;
    }

    /**
     * Heuristic search intent classifier.
     */
    protected function detectIntent(string $keyword): string
    {
        $kw = strtolower($keyword);

        $transactionalWords = ['buy', 'order', 'purchase', 'pricing', 'price', 'hire', 'service', 'agency', 'company', 'developer', 'cost'];
        foreach ($transactionalWords as $word) {
            if (str_contains($kw, $word)) return 'transactional';
        }

        $commercialWords = ['best', 'top', 'review', 'reviews', 'vs', 'comparison', 'compare', 'alternative', 'alternatives'];
        foreach ($commercialWords as $word) {
            if (str_contains($kw, $word)) return 'commercial';
        }

        $navigationalWords = ['login', 'signin', 'portal', 'dashboard', 'account', 'official'];
        foreach ($navigationalWords as $word) {
            if (str_contains($kw, $word)) return 'navigational';
        }

        return 'informational';
    }
}
