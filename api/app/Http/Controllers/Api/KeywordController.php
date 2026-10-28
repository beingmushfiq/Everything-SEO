<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Keyword;
use App\Models\KeywordCluster;
use App\Models\Project;
use App\Services\Keywords\KeywordClusterService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class KeywordController extends Controller
{
    public function __construct(
        protected KeywordClusterService $keywordClusterService
    ) {}

    /**
     * Get keyword clusters and keywords for a project.
     */
    public function index(string $projectId): JsonResponse
    {
        $project = Project::findOrFail($projectId);

        $clusters = KeywordCluster::with(['keywords' => fn($q) => $q->latest()])
            ->where('project_id', $project->id)
            ->withCount('keywords')
            ->get();

        $standaloneKeywords = Keyword::where('project_id', $project->id)
            ->whereNull('cluster_id')
            ->latest()
            ->take(100)
            ->get();

        return response()->json([
            'clusters' => $clusters,
            'standalone_keywords' => $standaloneKeywords,
        ]);
    }

    /**
     * Ingest and cluster keywords from CSV upload or raw CSV string.
     */
    public function uploadCsv(Request $request, string $projectId): JsonResponse
    {
        $project = Project::findOrFail($projectId);

        $csvContent = '';

        if ($request->hasFile('file')) {
            $request->validate(['file' => 'required|file|mimes:csv,txt']);
            $csvContent = file_get_contents($request->file('file')->getRealPath());
        } elseif ($request->filled('csv_data')) {
            $csvContent = $request->input('csv_data');
        } else {
            return response()->json(['error' => 'Please provide a CSV file or csv_data payload.'], 422);
        }

        $result = $this->keywordClusterService->importAndClusterCsv($project, $csvContent);

        return response()->json([
            'message' => 'Keywords successfully imported and clustered.',
            'imported_count' => $result['total_imported'],
            'clusters_created' => $result['clusters_created'],
        ]);
    }

    /**
     * Delete a keyword.
     */
    public function destroy(string $id): JsonResponse
    {
        $keyword = Keyword::findOrFail($id);
        $keyword->delete();

        return response()->json(['message' => 'Keyword deleted.']);
    }
}
