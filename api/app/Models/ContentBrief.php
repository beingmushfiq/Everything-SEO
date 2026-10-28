<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContentBrief extends Model
{
    use HasUuids;

    protected $fillable = [
        'project_id',
        'target_keyword',
        'title_draft',
        'search_intent',
        'target_audience',
        'editorial_guidelines',
        'suggested_headings',
        'internal_link_recommendations',
        'competitor_references',
        'status',
    ];

    protected $casts = [
        'suggested_headings' => 'array',
        'internal_link_recommendations' => 'array',
        'competitor_references' => 'array',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
