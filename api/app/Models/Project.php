<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasUuids;

    protected $fillable = [
        'workspace_id',
        'name',
        'client_name',
        'target_country',
        'primary_language',
        'objectives',
    ];

    public function workspace(): BelongsTo
    {
        return $this->belongsTo(Workspace::class);
    }

    public function websites(): HasMany
    {
        return $this->hasMany(Website::class);
    }

    public function keywordClusters(): HasMany
    {
        return $this->hasMany(KeywordCluster::class);
    }

    public function keywords(): HasMany
    {
        return $this->hasMany(Keyword::class);
    }

    public function contentBriefs(): HasMany
    {
        return $this->hasMany(ContentBrief::class);
    }
}
