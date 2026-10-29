#!/usr/bin/env node
/**
 * Official Model Context Protocol (MCP) Server for Everything SEO
 * Maintained by DevCenterPoint (https://devcenterpoint.com)
 * Standard: MCP Specification 2024-11-05
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT_DIR = path.resolve(__dirname, '..', '..');

function getSeoDir() {
  const bundled = path.join(__dirname, 'data', 'SEO');
  if (fs.existsSync(bundled)) return bundled;
  const fromRoot = path.join(ROOT_DIR, 'SEO');
  if (fs.existsSync(fromRoot)) return fromRoot;
  return bundled;
}

const SEO_DIR = getSeoDir();
const PRESETS_DIR = path.join(__dirname, 'data', 'presets');
const TEMPLATES_DIR = path.join(__dirname, 'data', 'templates');

// Helper: load all skill metadata
function getAllSkills() {
  const seoDir = getSeoDir();
  const skills = [];
  if (!fs.existsSync(seoDir)) return skills;

  const disciplines = fs.readdirSync(seoDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.'));

  for (const disc of disciplines) {
    const discPath = path.join(seoDir, disc.name);
    const subdirs = fs.readdirSync(discPath, { withFileTypes: true })
      .filter(d => d.isDirectory() && !d.name.startsWith('.'));
    for (const sub of subdirs) {
      const skillFile = path.join(discPath, sub.name, 'SKILL.md');
      if (fs.existsSync(skillFile)) {
        skills.push({
          discipline: disc.name,
          name: sub.name,
          slug: `${disc.name}/${sub.name}`,
          path: skillFile
        });
      }
    }
  }
  return skills;
}

// Tool definitions
const TOOLS = [
  {
    name: 'search_seo_skills',
    description: 'Search the 55 Everything SEO capability manuals by keyword, topic, or discipline.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search term (e.g. "canonical", "schema", "robots.txt", "crawl budget")' },
        discipline: { type: 'string', description: 'Optional discipline filter (e.g. "Technical SEO", "On-page SEO")' }
      },
      required: ['query']
    }
  },
  {
    name: 'get_seo_skill_section',
    description: 'Retrieve specific sections of an SEO skill manual to save context window tokens (e.g. Section D for Execution Steps, Section E for Verification).',
    inputSchema: {
      type: 'object',
      properties: {
        skill_slug: { type: 'string', description: 'Slug or skill name (e.g. "Technical SEO/Indexing" or "Indexing")' },
        sections: { 
          type: 'array', 
          items: { type: 'string' }, 
          description: 'List of section letters to extract (e.g. ["D", "E"] or ["A", "D", "K"])' 
        }
      },
      required: ['skill_slug', 'sections']
    }
  },
  {
    name: 'validate_jsonld_schema',
    description: 'Offline syntax and structural validation for Schema.org JSON-LD structured data.',
    inputSchema: {
      type: 'object',
      properties: {
        json_content: { type: 'string', description: 'Raw JSON-LD string or object' },
        expected_type: { type: 'string', description: 'Expected Schema.org @type (e.g. "Article", "Product", "Organization")' }
      },
      required: ['json_content']
    }
  },
  {
    name: 'audit_robots_txt',
    description: 'Parses and validates robots.txt directives conforming to RFC 9309.',
    inputSchema: {
      type: 'object',
      properties: {
        content: { type: 'string', description: 'Raw contents of robots.txt file' }
      },
      required: ['content']
    }
  },
  {
    name: 'triage_seo_problem',
    description: 'Automated forensic triage: maps an organic search symptom, error message, or optimization goal to the exact Everything SEO skills to execute.',
    inputSchema: {
      type: 'object',
      properties: {
        symptom: { type: 'string', description: 'Search problem, GSC error, or goal (e.g. "canonical mismatch", "404 redirect loop", "AI Overviews omission", "INP slow")' }
      },
      required: ['symptom']
    }
  }
];

function handleToolCall(name, args) {
  const skills = getAllSkills();

  switch (name) {
    case 'search_seo_skills': {
      const q = (args.query || '').toLowerCase();
      const discFilter = (args.discipline || '').toLowerCase();
      const matches = skills.filter(s => {
        const matchesQuery = s.name.toLowerCase().includes(q) || s.discipline.toLowerCase().includes(q);
        const matchesDisc = !discFilter || s.discipline.toLowerCase().includes(discFilter);
        return matchesQuery && matchesDisc;
      });
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              query: args.query,
              total_matches: matches.length,
              results: matches.map(m => ({ discipline: m.discipline, skill: m.name, slug: m.slug }))
            }, null, 2)
          }
        ]
      };
    }

    case 'get_seo_skill_section': {
      const slugQuery = (args.skill_slug || '').toLowerCase();
      const match = skills.find(s => 
        s.slug.toLowerCase().includes(slugQuery) || 
        s.name.toLowerCase().includes(slugQuery)
      );

      if (!match) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Skill "${args.skill_slug}" not found in Everything SEO library.` }]
        };
      }

      const fileContent = fs.readFileSync(match.path, 'utf8');
      const requestedSections = (args.sections || []).map(s => s.toUpperCase());
      const extracted = {};

      for (const letter of requestedSections) {
        const regex = new RegExp(`(?:###\\s*Section\\s*${letter}:|##\\s*${letter}\\.)[^\\n]*\\n([\\s\\S]*?)(?=\\n##\\s*[A-Z]\\.|\\n###\\s*Section|\\Z)`, 'i');
        const m = fileContent.match(regex);
        if (m) {
          extracted[`Section_${letter}`] = m[1].trim();
        } else {
          extracted[`Section_${letter}`] = `[Section ${letter} not present]`;
        }
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              skill: match.slug,
              extracted_sections: extracted
            }, null, 2)
          }
        ]
      };
    }

    case 'validate_jsonld_schema': {
      let parsed;
      try {
        parsed = typeof args.json_content === 'object' ? args.json_content : JSON.parse(args.json_content);
      } catch (e) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Invalid JSON syntax: ${e.message}` }]
        };
      }

      const errors = [];
      const warnings = [];

      // Check @context
      const ctx = parsed['@context'];
      if (!ctx || (!ctx.includes('schema.org'))) {
        errors.push('Missing or invalid @context. Must point to "https://schema.org".');
      }

      // Check @type
      const type = parsed['@type'];
      if (!type) {
        errors.push('Missing required @type declaration.');
      } else if (args.expected_type && type.toLowerCase() !== args.expected_type.toLowerCase()) {
        warnings.push(`Expected @type "${args.expected_type}", but encountered "${type}".`);
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              valid: errors.length === 0,
              type: type || 'Unknown',
              errors,
              warnings,
              properties_found: Object.keys(parsed)
            }, null, 2)
          }
        ]
      };
    }

    case 'audit_robots_txt': {
      const raw = args.content || '';
      const lines = raw.split('\n').map(l => l.trim());
      const userAgents = [];
      const disallows = [];
      const sitemaps = [];
      const errors = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line || line.startsWith('#')) continue;
        const [directive, ...valParts] = line.split(':');
        const val = valParts.join(':').trim();

        if (!directive || val === undefined) {
          errors.push(`Line ${i + 1}: Malformed directive "${line}"`);
          continue;
        }

        const dLower = directive.trim().toLowerCase();
        if (dLower === 'user-agent') userAgents.push(val);
        else if (dLower === 'disallow') disallows.push(val);
        else if (dLower === 'sitemap') sitemaps.push(val);
      }

      if (userAgents.length === 0) {
        errors.push('RFC 9309 Warning: No User-agent directive declared before rules.');
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              valid: errors.length === 0,
              user_agents: userAgents,
              total_disallows: disallows.length,
              sitemaps_declared: sitemaps,
              errors
            }, null, 2)
          }
        ]
      };
    }

    case 'triage_seo_problem': {
      const sym = (args.symptom || '').toLowerCase();
      const recommendations = [];

      if (sym.includes('canonical') || sym.includes('index') || sym.includes('noindex') || sym.includes('crawled')) {
        recommendations.push({
          skill: 'Technical SEO/Indexing',
          rationale: 'Canonicalization, meta robots directives, header tags, crawl indexing status triage.',
          file: 'SEO/Technical SEO/Indexing/SKILL.md'
        });
      }
      if (sym.includes('robot') || sym.includes('disallow') || sym.includes('block') || sym.includes('user-agent')) {
        recommendations.push({
          skill: 'Technical SEO/RobotsTXT',
          rationale: 'RFC 9309 directive compliance, crawl-budget protection, searchbot routing.',
          file: 'SEO/Technical SEO/RobotsTXT/SKILL.md'
        });
      }
      if (sym.includes('schema') || sym.includes('json-ld') || sym.includes('rich result') || sym.includes('structured data')) {
        recommendations.push({
          skill: 'On-page SEO/Schema Markup',
          rationale: 'Valid JSON-LD structured data generation for Articles, Products, and Organizations.',
          file: 'SEO/On-page SEO/Schema Markup/SKILL.md'
        });
      }
      if (sym.includes('speed') || sym.includes('inp') || sym.includes('lcp') || sym.includes('cls') || sym.includes('core web vitals') || sym.includes('latency')) {
        recommendations.push({
          skill: 'Technical SEO/Page Speed',
          rationale: 'Core Web Vitals optimization, main-thread task breakdown, critical CSS, asset bundling.',
          file: 'SEO/Technical SEO/Page Speed/SKILL.md'
        });
      }
      if (sym.includes('ai') || sym.includes('geo') || sym.includes('perplexity') || sym.includes('overview') || sym.includes('chatgpt') || sym.includes('llm')) {
        recommendations.push({
          skill: 'AI SEO/AI Search Visibility',
          rationale: 'Generative Engine Optimization (GEO), LLM citation attribution, information gain scoring.',
          file: 'SEO/AI SEO/AI Search Visibility/SKILL.md'
        });
      }
      if (sym.includes('redirect') || sym.includes('301') || sym.includes('302') || sym.includes('404') || sym.includes('loop')) {
        recommendations.push({
          skill: 'Technical SEO/Redirects',
          rationale: '301/302 redirects, URL migrations, redirect chain elimination.',
          file: 'SEO/Technical SEO/Redirects/SKILL.md'
        });
      }
      if (sym.includes('hreflang') || sym.includes('multilingual') || sym.includes('international') || sym.includes('region')) {
        recommendations.push({
          skill: 'International SEO/Hreflang',
          rationale: 'Hreflang cluster XML matrix, x-default routing, international target QA.',
          file: 'SEO/International SEO/Hreflang/SKILL.md'
        });
      }
      if (sym.includes('content') || sym.includes('decay') || sym.includes('refresh') || sym.includes('rank drop')) {
        recommendations.push({
          skill: 'Content Optimization/Content Refresh',
          rationale: 'Content decay detection, factual freshness updates, search intent alignment.',
          file: 'SEO/Content Optimization/Content Refresh/SKILL.md'
        });
      }
      if (recommendations.length === 0) {
        const fallback = skills.filter(s => s.name.toLowerCase().includes(sym) || s.discipline.toLowerCase().includes(sym));
        for (const fb of fallback.slice(0, 3)) {
          recommendations.push({
            skill: fb.slug,
            rationale: `Matched query terms against ${fb.name}.`,
            file: `SEO/${fb.slug}/SKILL.md`
          });
        }
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              symptom: args.symptom,
              total_recommended: recommendations.length,
              recommendations: recommendations.length > 0 ? recommendations : [{
                skill: 'Technical SEO/Indexing',
                rationale: 'Baseline technical check recommended when symptoms are non-specific.'
              }]
            }, null, 2)
          }
        ]
      };
    }

    default:
      return {
        isError: true,
        content: [{ type: 'text', text: `Unknown tool: ${name}` }]
      };
  }
}

// Stdio JSON-RPC Server Loop
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function sendResponse(id, result, error = null) {
  const resp = { jsonrpc: '2.0', id };
  if (error) {
    resp.error = error;
  } else {
    resp.result = result;
  }
  process.stdout.write(JSON.stringify(resp) + '\n');
}

rl.on('line', (line) => {
  if (!line.trim()) return;
  let msg;
  try {
    msg = JSON.parse(line);
  } catch (err) {
    return;
  }

  const { id, method, params } = msg;

  if (method === 'initialize') {
    sendResponse(id, {
      protocolVersion: '2024-11-05',
      capabilities: {
        tools: {},
        resources: {}
      },
      serverInfo: {
        name: '@devcenterpoint/mcp-server-seo',
        version: '1.3.0'
      }
    });
  } else if (method === 'notifications/initialized') {
    // No-op for initialized notification
  } else if (method === 'tools/list') {
    sendResponse(id, { tools: TOOLS });
  } else if (method === 'tools/call') {
    const toolName = params ? params.name : null;
    const toolArgs = params ? params.arguments : {};
    const res = handleToolCall(toolName, toolArgs);
    sendResponse(id, res);
  } else if (method === 'resources/list') {
    const skills = getAllSkills();
    const resources = skills.map(s => ({
      uri: `seo://skills/${encodeURIComponent(s.discipline)}/${encodeURIComponent(s.name)}`,
      name: `${s.discipline} - ${s.name}`,
      mimeType: 'text/markdown'
    }));
    sendResponse(id, { resources });
  } else if (method === 'resources/read') {
    const uri = params ? params.uri : '';
    const prefix = 'seo://skills/';
    if (uri && uri.startsWith(prefix)) {
      const rest = decodeURIComponent(uri.slice(prefix.length));
      const [disc, name] = rest.split('/');
      const skillPath = path.join(SEO_DIR, disc, name, 'SKILL.md');
      if (fs.existsSync(skillPath)) {
        const text = fs.readFileSync(skillPath, 'utf8');
        sendResponse(id, {
          contents: [{ uri, mimeType: 'text/markdown', text }]
        });
        return;
      }
    }
    sendResponse(id, null, { code: -32602, message: `Resource not found: ${uri}` });
  } else if (id !== undefined) {
    sendResponse(id, null, { code: -32601, message: `Method not supported: ${method}` });
  }
});

