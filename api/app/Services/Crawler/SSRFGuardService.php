<?php

namespace App\Services\Crawler;

use InvalidArgumentException;
use RuntimeException;

class SSRFGuardService
{
    /**
     * Private, loopback, link-local, and reserved CIDR ranges.
     */
    protected static array $blockedCidrs = [
        '0.0.0.0/8',          // "This network"
        '10.0.0.0/8',         // Private IPv4 (RFC 1918)
        '100.64.0.0/10',      // Carrier-Grade NAT
        '127.0.0.0/8',        // Loopback
        '169.254.0.0/16',     // Link-local & AWS/GCP/Azure Metadata (169.254.169.254)
        '172.16.0.0/12',      // Private IPv4 (RFC 1918)
        '192.0.0.0/24',       // IETF Protocol Assignments
        '192.0.2.0/24',       // TEST-NET-1
        '192.168.0.0/16',     // Private IPv4 (RFC 1918)
        '198.18.0.0/15',      // Network benchmark tests
        '198.51.100.0/24',    // TEST-NET-2
        '203.0.113.0/24',     // TEST-NET-3
        '224.0.0.0/4',        // Multicast
        '240.0.0.0/4',        // Reserved for Future Use
        '255.255.255.255/32', // Limited Broadcast
    ];

    /**
     * Validate a target URL against SSRF vulnerabilities.
     *
     * @throws InvalidArgumentException|RuntimeException
     */
    public function validateUrl(string $url): string
    {
        $parts = parse_url($url);

        if (!$parts || !isset($parts['scheme'], $parts['host'])) {
            throw new InvalidArgumentException("Invalid or malformed URL: {$url}");
        }

        $scheme = strtolower($parts['scheme']);
        if (!in_array($scheme, ['http', 'https'], true)) {
            throw new InvalidArgumentException("Unsupported URL scheme '{$scheme}'. Only http and https are permitted.");
        }

        $host = strtolower($parts['host']);

        // Reject explicit localhost or metadata references
        if ($host === 'localhost' || str_ends_with($host, '.localhost') || $host === 'metadata.google.internal') {
            throw new RuntimeException("SSRF Guard: Crawl request to host '{$host}' is prohibited.");
        }

        // Resolve DNS records
        $ips = gethostbynamel($host);
        if ($ips === false || empty($ips)) {
            // Check if host itself is a direct IP
            if (filter_var($host, FILTER_VALIDATE_IP)) {
                $ips = [$host];
            } else {
                throw new RuntimeException("DNS resolution failed for host '{$host}'.");
            }
        }

        // Validate each resolved IP address
        foreach ($ips as $ip) {
            if ($this->isIpBlocked($ip)) {
                throw new RuntimeException("SSRF Guard: Host '{$host}' resolves to restricted IP '{$ip}'. Request blocked.");
            }
        }

        return $url;
    }

    /**
     * Check if an IP address falls within any blocked CIDR range.
     */
    public function isIpBlocked(string $ip): bool
    {
        // Check for IPv6 loopbacks
        if ($ip === '::1' || str_starts_with($ip, 'fe80:') || str_starts_with($ip, 'fc00:')) {
            return true;
        }

        $ipLong = ip2long($ip);
        if ($ipLong === false) {
            return true; // Reject unparseable addresses
        }

        foreach (self::$blockedCidrs as $cidr) {
            [$subnet, $mask] = explode('/', $cidr);
            $subnetLong = ip2long($subnet);
            $maskLong = ~((1 << (32 - (int)$mask)) - 1);

            if (($ipLong & $maskLong) === ($subnetLong & $maskLong)) {
                return true;
            }
        }

        return false;
    }
}
