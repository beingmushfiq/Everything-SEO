<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Keyword extends Model
{
    use HasUuids;

    protected $fillable = [
        'project_id',
        'cluster_id',
        'keyword',
        'target_country',
        'search_intent',
        'search_volume',
        'keyword_difficulty',
        'cpc',
        'target_url',
        'source_dataset',
        'notes',
    ];

    protected $casts = [
        'search_volume' => 'integer',
        'keyword_difficulty' => 'float',
        'cpc' => 'decimal:2',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function cluster(): BelongsTo
    {
        return $this->belongsTo(KeywordCluster::class, 'cluster_id');
    }
}
