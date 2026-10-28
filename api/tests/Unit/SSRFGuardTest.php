<?php

namespace Tests\Unit;

use App\Services\Crawler\SSRFGuardService;
use PHPUnit\Framework\TestCase;
use RuntimeException;
use InvalidArgumentException;

class SSRFGuardTest extends TestCase
{
    protected SSRFGuardService $guard;

    protected function setUp(): void
    {
        parent::setUp();
        $this->guard = new SSRFGuardService();
    }

    public function test_blocks_localhost_and_private_ips(): void
    {
        $this->assertTrue($this->guard->isIpBlocked('127.0.0.1'));
        $this->assertTrue($this->guard->isIpBlocked('10.0.0.1'));
        $this->assertTrue($this->guard->isIpBlocked('192.168.1.100'));
        $this->assertTrue($this->guard->isIpBlocked('172.16.0.5'));
        $this->assertTrue($this->guard->isIpBlocked('169.254.169.254')); // AWS/GCP metadata
    }

    public function test_allows_valid_public_ips(): void
    {
        $this->assertFalse($this->guard->isIpBlocked('8.8.8.8'));
        $this->assertFalse($this->guard->isIpBlocked('1.1.1.1'));
        $this->assertFalse($this->guard->isIpBlocked('151.101.1.69'));
    }

    public function test_rejects_non_http_schemes(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->guard->validateUrl('ftp://example.com/file.txt');
    }

    public function test_rejects_explicit_localhost_host(): void
    {
        $this->expectException(RuntimeException::class);
        $this->guard->validateUrl('http://localhost:8000');
    }
}
