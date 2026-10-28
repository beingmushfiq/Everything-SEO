<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CrawlRun extends Model
{
    use HasUuids;

    protected $fillable = [
        'website_id',
        'trigger_type',
        'status',
        'pages_discovered',
        'pages_crawled',
        'critical_issues_count',
        'warning_issues_count',
        'info_issues_count',
        'error_message',
        'started_at',
        'completed_at',
    ];

    protected $casts = [
        'pages_discovered' => 'integer',
        'pages_crawled' => 'integer',
        'critical_issues_count' => 'integer',
        'warning_issues_count' => 'integer',
        'info_issues_count' => 'integer',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function website(): BelongsTo
    {
        return $this->belongsTo(Website::class);
    }

    public function pages(): HasMany
    {
        return $this->hasMany(CrawledPage::class);
    }

    public function issues(): HasMany
    {
        return $this->hasMany(TechnicalIssue::class);
    }
}
