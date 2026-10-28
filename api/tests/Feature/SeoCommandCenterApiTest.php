<?php

namespace Tests\Feature;

use App\Models\CrawlRun;
use App\Models\Project;
use App\Models\TechnicalIssue;
use App\Models\Website;
use App\Models\Workspace;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SeoCommandCenterApiTest extends TestCase
{
    use RefreshDatabase;

    protected Workspace $workspace;
    protected Project $project;
    protected Website $website;
    protected CrawlRun $crawlRun;

    protected function setUp(): void
    {
        parent::setUp();

        $this->workspace = Workspace::create([
            'name' => 'Agency Test Workspace',
            'slug' => 'test-agency',
            'plan' => 'agency',
        ]);

        $this->project = Project::create([
            'workspace_id' => $this->workspace->id,
            'name' => 'Test Project',
            'client_name' => 'Acme Corp',
        ]);

        $this->website = Website::create([
            'project_id' => $this->project->id,
            'domain' => 'example.com',
            'base_url' => 'https://example.com',
        ]);

        $this->crawlRun = CrawlRun::create([
            'website_id' => $this->website->id,
            'status' => 'completed',
            'pages_crawled' => 5,
        ]);
    }

    public function test_dashboard_returns_operational_summary(): void
    {
        $response = $this->getJson('/api/dashboard');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'overview' => [
                    'projects_count',
                    'websites_count',
                    'total_crawls',
                    'open_issues',
                ],
                'recent_crawls',
            ]);
    }

    public function test_can_list_and_create_projects(): void
    {
        $response = $this->getJson('/api/projects');
        $response->assertStatus(200);

        $createResponse = $this->postJson('/api/projects', [
            'name' => 'New Client Engagement',
            'client_name' => 'Beta Corp',
        ]);

        $createResponse->assertStatus(201)
            ->assertJsonPath('name', 'New Client Engagement');
    }

    public function test_can_update_issue_status(): void
    {
        $issue = TechnicalIssue::create([
            'crawl_run_id' => $this->crawlRun->id,
            'rule_code' => 'ONPAGE_TITLE_MISSING',
            'category' => 'on_page',
            'severity' => 'critical',
            'evidence' => 'Missing title on https://example.com',
            'explanation' => 'Title is required',
            'remediation' => 'Add title tag',
            'status' => 'open',
        ]);

        $patchResponse = $this->patchJson("/api/issues/{$issue->id}", [
            'status' => 'in_progress',
            'resolution_notes' => 'Assigned to content team for remediation',
        ]);

        $patchResponse->assertStatus(200)
            ->assertJsonPath('issue.status', 'in_progress');

        $this->assertDatabaseHas('technical_issues', [
            'id' => $issue->id,
            'status' => 'in_progress',
        ]);
    }

    public function test_exports_csv_and_html_reports(): void
    {
        $csvResponse = $this->get("/api/crawl-runs/{$this->crawlRun->id}/export/csv");
        $csvResponse->assertStatus(200)
            ->assertHeader('Content-Type', 'text/csv; charset=UTF-8');

        $htmlResponse = $this->get("/api/crawl-runs/{$this->crawlRun->id}/export/html");
        $htmlResponse->assertStatus(200)
            ->assertHeader('Content-Type', 'text/html; charset=UTF-8');
    }

    public function test_ingests_and_clusters_keyword_csv(): void
    {
        $csvData = "keyword,volume,difficulty,intent\ntechnical seo consulting,3200,45,commercial\nhire php developer,1900,35,transactional\nwhat is canonical tag,4500,22,informational";

        $response = $this->postJson("/api/projects/{$this->project->id}/keywords/upload", [
            'csv_data' => $csvData,
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('imported_count', 3);

        $this->assertDatabaseHas('keywords', [
            'project_id' => $this->project->id,
            'keyword' => 'technical seo consulting',
        ]);
    }
}
