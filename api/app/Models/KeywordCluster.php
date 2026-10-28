<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KeywordCluster extends Model
{
    use HasUuids;

    protected $fillable = [
        'project_id',
        'name',
        'intent',
        'primary_keyword',
        'total_volume',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function keywords(): HasMany
    {
        return $this->hasMany(Keyword::class, 'cluster_id');
    }
}
