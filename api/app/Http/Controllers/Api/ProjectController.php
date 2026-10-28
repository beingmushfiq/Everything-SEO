<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Workspace;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * List all projects with nested websites.
     */
    public function index(): JsonResponse
    {
        $projects = Project::with(['websites', 'workspace'])
            ->withCount(['websites', 'keywords', 'contentBriefs'])
            ->latest()
            ->get();

        return response()->json($projects);
    }

    /**
     * Store a new project.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'client_name' => 'nullable|string|max:150',
            'target_country' => 'nullable|string|max:10',
            'primary_language' => 'nullable|string|max:10',
            'objectives' => 'nullable|string',
        ]);

        // Default or find first workspace
        $workspace = Workspace::firstOrCreate(
            ['slug' => 'default-agency'],
            ['name' => 'DevCenterPoint Operations', 'plan' => 'agency']
        );

        $project = Project::create([
            'workspace_id' => $workspace->id,
            'name' => $validated['name'],
            'client_name' => $validated['client_name'] ?? null,
            'target_country' => $validated['target_country'] ?? 'US',
            'primary_language' => $validated['primary_language'] ?? 'en',
            'objectives' => $validated['objectives'] ?? null,
        ]);

        return response()->json($project, 201);
    }

    /**
     * Show a project with associated websites and clusters.
     */
    public function show(string $id): JsonResponse
    {
        $project = Project::with(['websites.crawlRuns' => fn($q) => $q->latest()->take(3), 'keywordClusters', 'contentBriefs'])
            ->findOrFail($id);

        return response()->json($project);
    }
}
