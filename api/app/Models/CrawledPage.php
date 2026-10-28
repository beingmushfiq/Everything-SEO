<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CrawledPage extends Model
{
    use HasUuids;

    protected $fillable = [
        'crawl_run_id',
        'url',
        'url_hash',
        'status_code',
        'content_type',
        'load_time_ms',
        'content_length',
        'title',
        'title_length',
        'meta_description',
        'meta_description_length',
        'h1_tags',
        'canonical_url',
        'meta_robots',
        'is_indexable',
        'inlinks_count',
        'outlinks_count',
        'images_without_alt_count',
        'has_schema',
        'schema_types',
        'raw_metadata',
    ];

    protected $casts = [
        'status_code' => 'integer',
        'load_time_ms' => 'float',
        'content_length' => 'integer',
        'title_length' => 'integer',
        'meta_description_length' => 'integer',
        'h1_tags' => 'array',
        'is_indexable' => 'boolean',
        'inlinks_count' => 'integer',
        'outlinks_count' => 'integer',
        'images_without_alt_count' => 'integer',
        'has_schema' => 'boolean',
        'schema_types' => 'array',
        'raw_metadata' => 'array',
    ];

    public function crawlRun(): BelongsTo
    {
        return $this->belongsTo(CrawlRun::class);
    }

    public function issues(): HasMany
    {
        return $this->hasMany(TechnicalIssue::class);
    }
}
