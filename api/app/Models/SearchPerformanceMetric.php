<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SearchPerformanceMetric extends Model
{
    use HasUuids;

    protected $fillable = [
        'website_id',
        'date',
        'query',
        'page',
        'device',
        'country',
        'clicks',
        'impressions',
        'ctr',
        'average_position',
    ];

    protected $casts = [
        'date' => 'date',
        'clicks' => 'integer',
        'impressions' => 'integer',
        'ctr' => 'float',
        'average_position' => 'float',
    ];

    public function website(): BelongsTo
    {
        return $this->belongsTo(Website::class);
    }
}
