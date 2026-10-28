<?php

namespace Tests\Unit;

use App\Services\Audit\RuleEngine;
use PHPUnit\Framework\TestCase;

class RuleEngineTest extends TestCase
{
    protected RuleEngine $engine;

    protected function setUp(): void
    {
        parent::setUp();
        $this->engine = new RuleEngine();
    }

    public function test_flags_http_4xx_critical_issue(): void
    {
        $issues = $this->engine->evaluatePage([
            'url' => 'https://example.com/broken-page',
            'status_code' => 404,
        ]);

        $this->assertCount(1, $issues);
        $this->assertEquals('TECH_STATUS_4XX', $issues[0]['rule_code']);
        $this->assertEquals('critical', $issues[0]['severity']);
    }

    public function test_flags_missing_title_tag(): void
    {
        $issues = $this->engine->evaluatePage([
            'url' => 'https://example.com/page-without-title',
            'status_code' => 200,
            'title' => '',
            'meta_description' => 'A valid meta description that is adequately long for search engines.',
            'h1_tags' => ['Valid Main Heading'],
        ]);

        $ruleCodes = array_column($issues, 'rule_code');
        $this->assertContains('ONPAGE_TITLE_MISSING', $ruleCodes);
    }

    public function test_flags_multiple_h1_headings(): void
    {
        $issues = $this->engine->evaluatePage([
            'url' => 'https://example.com/multi-h1',
            'status_code' => 200,
            'title' => 'Valid Title Tag for Test Page Verification | Example',
            'meta_description' => 'A valid meta description that is adequately long for search engines.',
            'h1_tags' => ['First Primary Heading', 'Conflicting Second Heading'],
        ]);

        $ruleCodes = array_column($issues, 'rule_code');
        $this->assertContains('ONPAGE_H1_MULTI', $ruleCodes);
    }

    public function test_flags_images_without_alt_attribute(): void
    {
        $issues = $this->engine->evaluatePage([
            'url' => 'https://example.com/images-page',
            'status_code' => 200,
            'title' => 'Valid Title Tag for Test Page Verification | Example',
            'meta_description' => 'A valid meta description that is adequately long for search engines.',
            'h1_tags' => ['Valid Primary Heading'],
            'images_without_alt_count' => 4,
        ]);

        $ruleCodes = array_column($issues, 'rule_code');
        $this->assertContains('ONPAGE_IMG_NO_ALT', $ruleCodes);
    }
}
