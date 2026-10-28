<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContentBrief;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContentBriefController extends Controller
{
    /**
     * List content briefs for a project.
     */
    public function index(string $projectId): JsonResponse
    {
        $briefs = ContentBrief::where('project_id', $projectId)
            ->latest()
            ->get();

        return response()->json($briefs);
    }

    /**
     * Store a new content brief.
     */
    public function store(Request $request, string $projectId): JsonResponse
    {
        $project = Project::findOrFail($projectId);

        $validated = $request->validate([
            'target_keyword' => 'required|string|max:255',
            'title_draft' => 'required|string|max:500',
            'search_intent' => 'required|string|max:50',
            'target_audience' => 'nullable|string|max:255',
            'editorial_guidelines' => 'nullable|string',
            'suggested_headings' => 'nullable|array',
            'internal_link_recommendations' => 'nullable|array',
            'competitor_references' => 'nullable|array',
        ]);

        $brief = ContentBrief::create([
            'project_id' => $project->id,
            'target_keyword' => $validated['target_keyword'],
            'title_draft' => $validated['title_draft'],
            'search_intent' => $validated['search_intent'],
            'target_audience' => $validated['target_audience'] ?? null,
            'editorial_guidelines' => $validated['editorial_guidelines'] ?? null,
            'suggested_headings' => $validated['suggested_headings'] ?? [
                'Introduction & Search Context',
                'Core Architecture & Requirements',
                'Step-by-Step Implementation Guide',
                'Common Pitfalls & Best Practices',
                'Summary & Next Actions'
            ],
            'internal_link_recommendations' => $validated['internal_link_recommendations'] ?? [],
            'competitor_references' => $validated['competitor_references'] ?? [],
            'status' => 'draft',
        ]);

        return response()->json($brief, 201);
    }

    /**
     * Update brief status or editorial guidelines.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $brief = ContentBrief::findOrFail($id);

        $validated = $request->validate([
            'status' => 'nullable|in:draft,review,approved,published',
            'title_draft' => 'nullable|string|max:500',
            'editorial_guidelines' => 'nullable|string',
            'suggested_headings' => 'nullable|array',
        ]);

        $brief->update($validated);

        return response()->json($brief);
    }
}
