<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TechnicalIssue extends Model
{
    use HasUuids;

    protected $fillable = [
        'crawl_run_id',
        'crawled_page_id',
        'rule_code',
        'category',
        'severity',
        'evidence',
        'explanation',
        'remediation',
        'status',
        'assigned_to',
        'resolution_notes',
    ];

    public function crawlRun(): BelongsTo
    {
        return $this->belongsTo(CrawlRun::class);
    }

    public function crawledPage(): BelongsTo
    {
        return $this->belongsTo(CrawledPage::class);
    }
}
