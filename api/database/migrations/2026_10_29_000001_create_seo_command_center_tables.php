<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Workspaces
        Schema::create('workspaces', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 150);
            $table->string('slug', 150)->unique();
            $table->string('plan', 50)->default('agency');
            $table->timestamps();
        });

        // 2. Projects
        Schema::create('projects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('workspace_id')->constrained('workspaces')->cascadeOnDelete();
            $table->string('name', 150);
            $table->string('client_name', 150)->nullable();
            $table->string('target_country', 10)->default('US');
            $table->string('primary_language', 10)->default('en');
            $table->text('objectives')->nullable();
            $table->timestamps();
        });

        // 3. Websites
        Schema::create('websites', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('project_id')->constrained('projects')->cascadeOnDelete();
            $table->string('domain', 255);
            $table->string('base_url', 500);
            $table->boolean('respect_robots')->default(true);
            $table->integer('max_crawl_pages')->default(100);
            $table->integer('crawl_delay_ms')->default(250);
            $table->timestamp('last_crawled_at')->nullable();
            $table->timestamps();

            $table->index(['project_id', 'domain']);
        });

        // 4. Crawl Runs
        Schema::create('crawl_runs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('website_id')->constrained('websites')->cascadeOnDelete();
            $table->string('trigger_type', 50)->default('manual');
            $table->string('status', 50)->default('pending'); // pending, crawling, completed, failed
            $table->integer('pages_discovered')->default(0);
            $table->integer('pages_crawled')->default(0);
            $table->integer('critical_issues_count')->default(0);
            $table->integer('warning_issues_count')->default(0);
            $table->integer('info_issues_count')->default(0);
            $table->text('error_message')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->index(['website_id', 'status', 'created_at']);
        });

        // 5. Crawled Pages
        Schema::create('crawled_pages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('crawl_run_id')->constrained('crawl_runs')->cascadeOnDelete();
            $table->text('url');
            $table->string('url_hash', 64);
            $table->smallInteger('status_code');
            $table->string('content_type', 100)->nullable();
            $table->float('load_time_ms')->default(0);
            $table->integer('content_length')->default(0);
            $table->text('title')->nullable();
            $table->smallInteger('title_length')->default(0);
            $table->text('meta_description')->nullable();
            $table->smallInteger('meta_description_length')->default(0);
            $table->json('h1_tags')->nullable();
            $table->text('canonical_url')->nullable();
            $table->string('meta_robots', 255)->nullable();
            $table->boolean('is_indexable')->default(true);
            $table->integer('inlinks_count')->default(0);
            $table->integer('outlinks_count')->default(0);
            $table->integer('images_without_alt_count')->default(0);
            $table->boolean('has_schema')->default(false);
            $table->json('schema_types')->nullable();
            $table->json('raw_metadata')->nullable();
            $table->timestamps();

            $table->index(['crawl_run_id', 'url_hash']);
            $table->index(['crawl_run_id', 'status_code']);
        });

        // 6. Technical Issues
        Schema::create('technical_issues', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('crawl_run_id')->constrained('crawl_runs')->cascadeOnDelete();
            $table->foreignUuid('crawled_page_id')->nullable()->constrained('crawled_pages')->cascadeOnDelete();
            $table->string('rule_code', 50);
            $table->string('category', 50); // crawlability, indexability, on_page, performance, security, links
            $table->string('severity', 20); // critical, warning, info
            $table->text('evidence');
            $table->text('explanation');
            $table->text('remediation');
            $table->string('status', 30)->default('open'); // open, in_progress, ignored, resolved
            $table->string('assigned_to', 150)->nullable();
            $table->text('resolution_notes')->nullable();
            $table->timestamps();

            $table->index(['crawl_run_id', 'severity']);
            $table->index(['crawl_run_id', 'category']);
            $table->index('status');
        });

        // 7. Keyword Clusters & Keywords
        Schema::create('keyword_clusters', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('project_id')->constrained('projects')->cascadeOnDelete();
            $table->string('name', 150);
            $table->string('intent', 50)->default('informational');
            $table->string('primary_keyword', 255)->nullable();
            $table->integer('total_volume')->default(0);
            $table->timestamps();
        });

        Schema::create('keywords', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('project_id')->constrained('projects')->cascadeOnDelete();
            $table->foreignUuid('cluster_id')->nullable()->constrained('keyword_clusters')->nullOnDelete();
            $table->string('keyword', 255);
            $table->string('target_country', 10)->default('US');
            $table->string('search_intent', 50)->default('informational');
            $table->integer('search_volume')->nullable();
            $table->float('keyword_difficulty')->nullable();
            $table->decimal('cpc', 8, 2)->nullable();
            $table->text('target_url')->nullable();
            $table->string('source_dataset', 100)->default('csv_import');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['project_id', 'keyword']);
        });

        // 8. Content Briefs
        Schema::create('content_briefs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('project_id')->constrained('projects')->cascadeOnDelete();
            $table->string('target_keyword', 255);
            $table->string('title_draft', 500);
            $table->string('search_intent', 50)->default('informational');
            $table->string('target_audience', 255)->nullable();
            $table->text('editorial_guidelines')->nullable();
            $table->json('suggested_headings')->nullable();
            $table->json('internal_link_recommendations')->nullable();
            $table->json('competitor_references')->nullable();
            $table->string('status', 50)->default('draft'); // draft, review, approved, published
            $table->timestamps();
        });

        // 9. Search Performance Metrics (GSC)
        Schema::create('search_performance_metrics', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('website_id')->constrained('websites')->cascadeOnDelete();
            $table->date('date');
            $table->string('query', 500);
            $table->text('page');
            $table->string('device', 50)->default('ALL');
            $table->string('country', 10)->default('ALL');
            $table->integer('clicks')->default(0);
            $table->integer('impressions')->default(0);
            $table->decimal('ctr', 5, 4)->default(0);
            $table->decimal('average_position', 5, 2)->default(0);
            $table->timestamps();

            $table->index(['website_id', 'date']);
            $table->index(['website_id', 'query']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('search_performance_metrics');
        Schema::dropIfExists('content_briefs');
        Schema::dropIfExists('keywords');
        Schema::dropIfExists('keyword_clusters');
        Schema::dropIfExists('technical_issues');
        Schema::dropIfExists('crawled_pages');
        Schema::dropIfExists('crawl_runs');
        Schema::dropIfExists('websites');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('workspaces');
    }
};
