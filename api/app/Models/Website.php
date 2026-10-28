<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Website extends Model
{
    use HasUuids;

    protected $fillable = [
        'project_id',
        'domain',
        'base_url',
        'respect_robots',
        'max_crawl_pages',
        'crawl_delay_ms',
        'last_crawled_at',
    ];

    protected $casts = [
        'respect_robots' => 'boolean',
        'max_crawl_pages' => 'integer',
        'crawl_delay_ms' => 'integer',
        'last_crawled_at' => 'datetime',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function crawlRuns(): HasMany
    {
        return $this->hasMany(CrawlRun::class);
    }

    public function searchPerformanceMetrics(): HasMany
    {
        return $this->hasMany(SearchPerformanceMetric::class);
    }
}
