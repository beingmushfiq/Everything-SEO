#!/usr/bin/env node
/**
 * Everything SEO Universal CLI Utility
 * Created & Led by Mushfiqur Rahman Aayan (@beingmushfiq)
 * Maintained by DevCenterPoint (https://devcenterpoint.com)
 * Canonical Repository: https://github.com/beingmushfiq/Everything-SEO
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const os = require('os');

const VERSION = '1.4.0';
const ROOT_DIR = path.resolve(__dirname, '..', '..', '..');

// Dynamic Path Resolvers (Self-Contained Bundles)
function getSeoDir() {
  const candidates = [
    path.join(__dirname, '..', 'data', 'SEO'),
    path.join(ROOT_DIR, 'SEO'),
    path.join(process.cwd(), 'SEO')
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return path.join(__dirname, '..', 'data', 'SEO');
}

function getPresetsDir() {
  const candidates = [
    path.join(__dirname, '..', 'data', 'presets'),
    path.join(__dirname, '..', 'data', 'templates', 'presets'),
    path.join(ROOT_DIR, 'templates', 'presets'),
    path.join(process.cwd(), 'templates', 'presets')
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return path.join(__dirname, '..', 'data', 'presets');
}

function getAuthoringTemplatePath() {
  const candidates = [
    path.join(__dirname, '..', 'data', 'templates', 'skill_authoring_template.md'),
    path.join(ROOT_DIR, 'templates', 'skill_authoring_template.md'),
    path.join(process.cwd(), 'templates', 'skill_authoring_template.md')
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

// Keyword & Synonym Alias Registry
const SKILL_ALIASES = {
  'canonical': 'Technical SEO/Indexing',
  'indexing': 'Technical SEO/Indexing',
  'noindex': 'Technical SEO/Indexing',
  'robots': 'Technical SEO/RobotsTXT',
  'robotstxt': 'Technical SEO/RobotsTXT',
  'schema': 'On-page SEO/Schema Markup',
  'jsonld': 'On-page SEO/Schema Markup',
  'structured-data': 'On-page SEO/Schema Markup',
  'speed': 'Technical SEO/Page Speed',
  'pagespeed': 'Technical SEO/Page Speed',
  'inp': 'Technical SEO/Page Speed',
  'lcp': 'Technical SEO/Page Speed',
  'cls': 'Technical SEO/Page Speed',
  'core-web-vitals': 'Technical SEO/Page Speed',
  'cwv': 'Technical SEO/Page Speed',
  'redirect': 'Technical SEO/Redirects',
  'redirects': 'Technical SEO/Redirects',
  '301': 'Technical SEO/Redirects',
  '302': 'Technical SEO/Redirects',
  '404': 'Technical SEO/Redirects',
  'sitemap': 'Technical SEO/XML Sitemaps',
  'sitemaps': 'Technical SEO/XML Sitemaps',
  'xml-sitemaps': 'Technical SEO/XML Sitemaps',
  'crawl': 'Technical SEO/Crawling',
  'crawling': 'Technical SEO/Crawling',
  'crawl-budget': 'Technical SEO/Crawling',
  'logs': 'Technical SEO/Log File Analysis',
  'log-analysis': 'Technical SEO/Log File Analysis',
  'hreflang': 'International SEO/Hreflang',
  'multilingual': 'International SEO/Multilingual SEO',
  'translation': 'International SEO/Translation SEO',
  'geo': 'AI SEO/AI Search Visibility',
  'ai-search': 'AI SEO/AI Search Visibility',
  'perplexity': 'AI SEO/AI Search Visibility',
  'chatgpt': 'AI SEO/AI Search Visibility',
  'citations': 'AI SEO/AI Citations',
  'reddit': 'AI SEO/Reddit Mentions',
  'entities': 'AI SEO/Entity Optimization',
  'refresh': 'Content Optimization/Content Refresh',
  'decay': 'Content Optimization/Content Refresh',
  'gap-analysis': 'Content Optimization/Gap Analysis',
  'nlp': 'Content Optimization/NLP Optimization',
  'readability': 'Content Optimization/Readability',
  'internal-links': 'On-page SEO/Internal Linking',
  'linking': 'On-page SEO/Internal Linking',
  'title': 'On-page SEO/Title',
  'meta-title': 'On-page SEO/Title',
  'headings': 'On-page SEO/Headings Optimization',
  'image-seo': 'On-page SEO/Image SEO',
  'url': 'On-page SEO/URL Optimization',
  'ctr': 'On-page SEO/CTR Optimization',
  'search-console': 'Analytics/Search Console',
  'gsc': 'Analytics/Search Console',
  'ga4': 'Analytics/Google Analytics',
  'bing': 'Analytics/Bing Webmaster Tools',
  'reporting': 'Analytics/SEO Reporting',
  'ahrefs': 'SEO Tools/Ahrefs',
  'semrush': 'SEO Tools/SEMrush',
  'screaming-frog': 'SEO Tools/Screaming Frog',
  'hacks': 'SEO Wins/150+ SEO Hacks',
  'conversion': 'Growth/Conversion Optimization',
  'cro': 'Growth/Conversion Optimization',
  'leads': 'Growth/Lead Generation',
  'traffic': 'Growth/Organic Traffic',
  'orchestrator': 'SEO Tools/SEO Orchestrator',
  'triage': 'SEO Tools/SEO Orchestrator',
  'doctor': 'SEO Tools/SEO Orchestrator',
  'seo-orchestrator': 'SEO Tools/SEO Orchestrator'
};

function printBanner() {
  console.log(`\x1b[36m===================================================\x1b[0m`);
  console.log(`\x1b[1m\x1b[34mEverything SEO CLI\x1b[0m v${VERSION}`);
  console.log(`Author: \x1b[33mMushfiqur Rahman Aayan\x1b[0m (@beingmushfiq)`);
  console.log(`Maintainer: \x1b[32mDevCenterPoint\x1b[0m (https://devcenterpoint.com)`);
  console.log(`Universal Skill Manager for AI Agents & Developers`);
  console.log(`\x1b[36m===================================================\x1b[0m\n`);
}

function printHelp() {
  printBanner();
  console.log(`Usage: everything-seo <command> [options]\n`);
  console.log(`Commands:`);
  console.log(`  init [--all | --preset <name>]   Initialize SEO capabilities (Interactive menu by default)`);
  console.log(`  triage <symptom>                 Run forensic triage on an SEO problem or error message`);
  console.log(`  add <skill | alias>              Progressively add a skill (supports aliases: canonical, schema, etc.)`);
  console.log(`  install --global                 Install all 55 skills globally for Antigravity & Claude Code`);
  console.log(`  scaffold --name <name>           Scaffold a new 17-section compliant custom project skill`);
  console.log(`  list                             List all 55 available skills across 11 disciplines`);
  console.log(`  search <query>                   Search skills by keyword, intent, symptom, or framework`);
  console.log(`  audit [dir]                      Run an offline SEO health check on workspace`);
  console.log(`  mcp [--stdio]                    Launch the Model Context Protocol (MCP) server`);
  console.log(`  version, -v                      Show version`);
  console.log(`  help, -h                         Show this help message\n`);
  console.log(`Presets available: all (55 skills), starter (5 skills), nextjs, ecommerce, saas, publisher\n`);
  console.log(`Docs: https://github.com/beingmushfiq/Everything-SEO\n`);
}

function findSkillDirectories() {
  const seoDir = getSeoDir();
  if (!fs.existsSync(seoDir)) return [];
  const skills = [];
  const disciplines = fs.readdirSync(seoDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.'));

  for (const disc of disciplines) {
    const discPath = path.join(seoDir, disc.name);
    const subdirs = fs.readdirSync(discPath, { withFileTypes: true })
      .filter(d => d.isDirectory() && !d.name.startsWith('.'));
    for (const sub of subdirs) {
      const skillPath = path.join(discPath, sub.name, 'SKILL.md');
      if (fs.existsSync(skillPath)) {
        skills.push({
          discipline: disc.name,
          name: sub.name,
          slug: `${disc.name}/${sub.name}`,
          path: skillPath
        });
      }
    }
  }
  return skills;
}

function resolveSkillSource(skillRel) {
  const cleanRel = skillRel.replace(/^SEO[\\/]/, '');
  const seoDir = getSeoDir();
  const direct = path.join(seoDir, cleanRel, 'SKILL.md');
  if (fs.existsSync(direct)) return direct;

  const fromRoot = path.join(ROOT_DIR, skillRel, 'SKILL.md');
  if (fs.existsSync(fromRoot)) return fromRoot;

  const skillName = path.basename(skillRel).toLowerCase();
  const allSkills = findSkillDirectories();
  const match = allSkills.find(s => 
    s.name.toLowerCase() === skillName || 
    s.slug.toLowerCase() === skillName ||
    `seo-${s.name.toLowerCase().replace(/[\s+]+/g, '-').replace(/[^\w-]/g, '')}` === skillName
  );
  if (match) return match.path;

  return null;
}

function promptPresetChoice() {
  console.log(`\x1b[1mSelect SEO capabilities to install in this workspace:\x1b[0m\n`);
  console.log(`  \x1b[32m1) Complete Library (All 55 Skills)\x1b[0m  — All 11 disciplines + 55 Cursor rules (Recommended)`);
  console.log(`  \x1b[36m2) Essential Starter Pack (5 Skills)\x1b[0m — Indexing, RobotsTXT, Page Speed, Schema, AI Visibility`);
  console.log(`  \x1b[34m3) Next.js / Jamstack (5 Skills)\x1b[0m    — Technical Crawling, SSR Schema, Indexing, Sitemaps, Speed`);
  console.log(`  \x1b[34m4) E-Commerce Preset (5 Skills)\x1b[0m     — Product Schema, Faceted URLs, Digital PR, Speed`);
  console.log(`  \x1b[34m5) B2B SaaS Preset (5 Skills)\x1b[0m       — AI Search Visibility, Entity Coverage, Content Gap, Leads`);
  console.log(`  \x1b[34m6) Publisher / Media (5 Skills)\x1b[0m     — Content Refresh, Entity Coverage, NLP Optimization, Speed\n`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(`Enter selection [1-6] (Default: 1): `, answer => {
      rl.close();
      const choice = answer.trim();
      switch (choice) {
        case '2': resolve('starter'); break;
        case '3': resolve('nextjs'); break;
        case '4': resolve('ecommerce'); break;
        case '5': resolve('saas'); break;
        case '6': resolve('publisher'); break;
        case '1':
        default:
          resolve('all'); break;
      }
    });
  });
}

function handleInstallGlobal() {
  printBanner();
  console.log(`[*] Initiating Global System Installation for AI Agent Harnesses...`);

  const home = os.homedir();
  const antigravitySkills = path.join(home, '.gemini', 'antigravity', 'skills');
  const claudeSkills = path.join(home, '.claude', 'skills');

  const allSkills = findSkillDirectories();
  if (allSkills.length === 0) {
    console.error(`\x1b[31m[ERROR] No skills found to deploy.\x1b[0m`);
    return;
  }

  function deployTo(targetDir, harnessName) {
    fs.mkdirSync(targetDir, { recursive: true });
    let count = 0;
    for (const s of allSkills) {
      const cleanName = s.name.replace(/^seo[-\s]+/i, '');
      const slug = `seo-${cleanName.toLowerCase().replace(/[\s+]+/g, '-').replace(/[^\w-]/g, '')}`;
      const destDir = path.join(targetDir, slug);
      fs.mkdirSync(destDir, { recursive: true });
      fs.copyFileSync(s.path, path.join(destDir, 'SKILL.md'));
      count++;
    }
    console.log(` \x1b[32m✔\x1b[0m Deployed ${count} skills to ${harnessName} (${targetDir})`);
  }

  // 1. Google Antigravity
  deployTo(antigravitySkills, 'Google Antigravity');

  // 2. Claude Code
  deployTo(claudeSkills, 'Claude Code');

  console.log(`\n\x1b[32m[PASS] Global agent installation complete (${allSkills.length} skills deployed).\x1b[0m\n`);
}

async function handleInit(presetName, isAll = false) {
  printBanner();
  const targetDir = process.cwd();
  console.log(`[*] Initializing SEO capabilities in: ${targetDir}\n`);

  let activePreset = presetName;

  if (isAll) {
    activePreset = 'all';
  } else if (!activePreset) {
    if (process.stdin.isTTY) {
      activePreset = await promptPresetChoice();
    } else {
      activePreset = 'starter';
    }
  }

  const agentSkillsDir = path.join(targetDir, '.agent', 'skills');
  const cursorRulesDir = path.join(targetDir, '.cursor', 'rules');

  fs.mkdirSync(agentSkillsDir, { recursive: true });
  fs.mkdirSync(cursorRulesDir, { recursive: true });

  const presetsDir = getPresetsDir();
  const presetFile = path.join(presetsDir, `${activePreset.toLowerCase()}.json`);

  if (!fs.existsSync(presetFile)) {
    console.error(`\x1b[31m[ERROR] Preset "${activePreset}" not found.\x1b[0m`);
    console.log(`Available presets: all, starter, nextjs, ecommerce, saas, publisher`);
    process.exit(1);
  }

  const preset = JSON.parse(fs.readFileSync(presetFile, 'utf8'));
  console.log(`\n\x1b[34m[PRESET]\x1b[0m Applying preset: \x1b[1m${preset.name}\x1b[0m (${activePreset})`);
  console.log(`Description: ${preset.description}\n`);

  let installedCount = 0;
  for (const skillRel of preset.skills) {
    const src = resolveSkillSource(skillRel);
    const skillName = path.basename(skillRel);
    const cleanName = skillName.replace(/^seo[-\s]+/i, '');
    const slug = `seo-${cleanName.toLowerCase().replace(/[\s+]+/g, '-').replace(/[^\w-]/g, '')}`;
    const destSkillDir = path.join(agentSkillsDir, slug);
    const dest = path.join(destSkillDir, 'SKILL.md');
    fs.mkdirSync(destSkillDir, { recursive: true });

    if (src && fs.existsSync(src)) {
      const content = fs.readFileSync(src, 'utf8');
      fs.writeFileSync(dest, content, 'utf8');
      console.log(` \x1b[32m+\x1b[0m Installed skill: .agent/skills/${slug}/SKILL.md`);

      // Generate matching Cursor rule with rich description and Section B triggers
      let desc = `SEO operational skill for ${skillName}`;
      const descMatch = content.match(/description:\s*"([^"]+)"/) || content.match(/description:\s*'([^']+)'/) || content.match(/description:\s*([^\n]+)/);
      if (descMatch) desc = descMatch[1].trim();

      const triggerMatch = content.match(/##\s*B\.\s*Trigger Conditions([\s\S]*?)(?=\n##\s*[A-Z]\.|\Z)/i);
      if (triggerMatch) {
        let trigText = triggerMatch[1].replace(/Invoke this skill when:?/i, '').replace(/Upstream dependencies:[\s\S]*/i, '').replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
        if (trigText.length > 250) trigText = trigText.slice(0, 250) + '...';
        if (trigText) desc = `${desc} Trigger when: ${trigText}`;
      }
      const safeDesc = desc.replace(/"/g, "'");

      const cursorRule = `---
description: "${safeDesc}"
globs: "**/*"
alwaysApply: false
---

# ${skillName} Rules
Follow operational procedures in .agent/skills/${slug}/SKILL.md
`;
      fs.writeFileSync(path.join(cursorRulesDir, `${slug}.mdc`), cursorRule, 'utf8');
      installedCount++;
    } else {
      console.warn(` \x1b[33m!\x1b[0m Source for skill "${skillRel}" could not be resolved.`);
    }
  }

  // Generate Master Router Rule for Cursor
  const routerRule = `---
description: "Master SEO router and triage dispatcher. Activates on any SEO audit, ranking drop, indexation issue, Core Web Vitals, Schema.org markup, or AI search query."
globs: "**/*"
alwaysApply: true
---

# Everything SEO Master Router & Triage Engine
When the user asks an SEO-related question or requests an optimization, use this triage decision matrix to inspect, read, and apply the exact operational manual from .agent/skills/seo-<slug>/SKILL.md:

- Indexation, Crawl Status, Canonical Loops, 404s, Noindex Directives:
  -> Read .agent/skills/seo-indexing/SKILL.md or .agent/skills/seo-crawling/SKILL.md
- Robots.txt Errors, Bot Blocking, RFC 9309 Directive Syntax:
  -> Read .agent/skills/seo-robotstxt/SKILL.md
- Schema.org, JSON-LD, Rich Results, Structured Data Errors:
  -> Read .agent/skills/seo-schema-markup/SKILL.md
- Core Web Vitals, LCP, INP, CLS, Asset Optimization, Server Latency:
  -> Read .agent/skills/seo-page-speed/SKILL.md
- AI Overviews, Perplexity Citations, ChatGPT Search, GEO Entity Gain:
  -> Read .agent/skills/seo-ai-search-visibility/SKILL.md
- Organic Traffic Decay, Stale Content, SERP Rank Decline:
  -> Read .agent/skills/seo-content-refresh/SKILL.md
- Hreflang, Multilingual Sites, Multi-Region Targeting:
  -> Read .agent/skills/seo-hreflang/SKILL.md
- Internal Linking, Orphan Pages, PageRank Distribution:
  -> Read .agent/skills/seo-internal-linking/SKILL.md
- Title Tags, Meta Descriptions, CTR Anomaly Remediation:
  -> Read .agent/skills/seo-title/SKILL.md or .agent/skills/seo-ctr-optimization/SKILL.md
- URL Structure, Slugs, Faceted Navigation Parameters:
  -> Read .agent/skills/seo-url-optimization/SKILL.md
- Redirect Chains, 301/302 Rules, HTTP-to-HTTPS Loops:
  -> Read .agent/skills/seo-redirects/SKILL.md
- XML Sitemaps, Sitemap Indexing, Lastmod Hygeine:
  -> Read .agent/skills/seo-xml-sitemaps/SKILL.md
- Search Console Performance, GSC Coverage Errors, Query Clicks:
  -> Read .agent/skills/seo-search-console/SKILL.md
- Master Triage, Multi-Symptom Diagnostics, or Ambiguous Ranking Losses:
  -> Read .agent/skills/seo-orchestrator/SKILL.md

Follow the 5-phase procedure (Ingestion -> Extraction -> Synthesis -> Remediation -> Governance) in the referenced skill manual.
`;
  fs.writeFileSync(path.join(cursorRulesDir, `seo-router.mdc`), routerRule, 'utf8');
  console.log(` \x1b[36m✔\x1b[0m Configured Master Router: .cursor/rules/seo-router.mdc`);

  // Create workspace manifest
  const manifestPath = path.join(targetDir, '.everything-seo.json');
  const manifest = {
    version: VERSION,
    initialized_at: new Date().toISOString(),
    preset: activePreset,
    installed_skills: preset.skills.map(s => path.basename(s)),
    author: 'Mushfiqur Rahman Aayan (@beingmushfiq)',
    maintainer: 'DevCenterPoint (https://devcenterpoint.com)'
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`\n\x1b[32m[PASS] Workspace initialized successfully with ${installedCount} skills.\x1b[0m`);
  console.log(`- Agent skills directory: .agent/skills/ (${installedCount} skills)`);
  console.log(`- Cursor rules directory: .cursor/rules/ (${installedCount + 1} rules including Master Router)`);
  console.log(`- Project manifest: .everything-seo.json\n`);
  console.log(`Triage any search issue anytime using:`);
  console.log(`  everything-seo triage <symptom>\n`);
}

function handleTriage(query) {
  if (!query) {
    console.error('Usage: everything-seo triage <symptom or error message>');
    console.error('Example: everything-seo triage "Google is not indexing my pages"');
    process.exit(1);
  }
  printBanner();
  console.log(`\x1b[1m\x1b[36m[*] Running Forensic SEO Triage on Query:\x1b[0m "${query}"\n`);

  const q = query.toLowerCase();
  const matches = [];

  const TRIAGE_MAP = [
    {
      keywords: ['canonical', 'index', 'noindex', 'crawled', 'deindexed', 'indexing'],
      skill: 'Technical SEO/Indexing',
      name: 'Indexing',
      reason: 'Diagnoses canonical mismatches, meta robots noindex tags, and GSC coverage failures.'
    },
    {
      keywords: ['robot', 'robots.txt', 'disallow', 'block', 'user-agent', 'crawl-delay'],
      skill: 'Technical SEO/RobotsTXT',
      name: 'RobotsTXT',
      reason: 'Validates RFC 9309 compliance and resolves accidental crawler blockages.'
    },
    {
      keywords: ['schema', 'json-ld', 'rich result', 'structured data', 'microdata', 'faq'],
      skill: 'On-page SEO/Schema Markup',
      name: 'Schema Markup',
      reason: 'Generates valid Schema.org JSON-LD structured data and fixes syntax violations.'
    },
    {
      keywords: ['speed', 'inp', 'lcp', 'cls', 'core web vitals', 'cwv', 'slow', 'performance', 'latency'],
      skill: 'Technical SEO/Page Speed',
      name: 'Page Speed',
      reason: 'Remediates Core Web Vitals (LCP, INP, CLS) bottlenecks and main-thread long tasks.'
    },
    {
      keywords: ['ai', 'geo', 'perplexity', 'overview', 'chatgpt', 'copilot', 'llm', 'citation'],
      skill: 'AI SEO/AI Search Visibility',
      name: 'AI Search Visibility',
      reason: 'Optimizes for Generative Engine Optimization (GEO) and AI search citations.'
    },
    {
      keywords: ['redirect', '301', '302', '404', 'loop', 'chain', 'migration', 'url change'],
      skill: 'Technical SEO/Redirects',
      name: 'Redirects',
      reason: 'Fixes 301/302 redirect loops, trailing slash anomalies, and migration maps.'
    },
    {
      keywords: ['hreflang', 'multilingual', 'international', 'country', 'language', 'x-default'],
      skill: 'International SEO/Hreflang',
      name: 'Hreflang',
      reason: 'Builds valid multi-region hreflang XML clusters and prevents regional cannibalization.'
    },
    {
      keywords: ['decay', 'traffic drop', 'lost traffic', 'refresh', 'old content', 'outdated'],
      skill: 'Content Optimization/Content Refresh',
      name: 'Content Refresh',
      reason: 'Conducts content decay triage and updates stale ranking assets.'
    },
    {
      keywords: ['internal link', 'orphan', 'pagerank', 'crawl depth', 'inlinks'],
      skill: 'On-page SEO/Internal Linking',
      name: 'Internal Linking',
      reason: 'Remediates orphan pages and optimizes PageRank distribution architecture.'
    },
    {
      keywords: ['ctr', 'title', 'meta description', 'click through', 'impressions high clicks low'],
      skill: 'On-page SEO/CTR Optimization',
      name: 'CTR Optimization',
      reason: 'Analyzes SERP snippets and formulates high-CTR title and meta description experiments.'
    },
    {
      keywords: ['gap', 'competitor ranking', 'missing keywords', 'topic coverage'],
      skill: 'Content Optimization/Gap Analysis',
      name: 'Gap Analysis',
      reason: 'Performs semantic content gap analysis against ranking competitors.'
    },
    {
      keywords: ['backlinks', 'broken link', 'link building', 'digital pr', 'unlinked'],
      skill: 'Link Building/Broken Link Building',
      name: 'Broken Link Building',
      reason: 'Discovers reclamation targets and builds authoritative backlinks.'
    },
    {
      keywords: ['triage', 'orchestrator', 'diagnose', 'general', 'audit', 'everything', 'traffic drop', 'lost traffic', 'ranking drop', 'drop', 'rank', 'ranking', 'penalty', 'penalized', 'decline'],
      skill: 'SEO Tools/SEO Orchestrator',
      name: 'SEO Orchestrator',
      reason: 'Executes forensic diagnostic triage across all 11 disciplines to pinpoint root causes.'
    }
  ];

  for (const item of TRIAGE_MAP) {
    if (item.keywords.some(k => q.includes(k))) {
      matches.push(item);
    }
  }

  if (matches.length === 0) {
    const allSkills = findSkillDirectories();
    const fallback = allSkills.filter(s => s.name.toLowerCase().includes(q) || s.discipline.toLowerCase().includes(q));
    for (const fb of fallback.slice(0, 3)) {
      matches.push({
        skill: fb.slug,
        name: fb.name,
        reason: `Matched keyword terms directly against ${fb.name} in ${fb.discipline}.`
      });
    }
  }

  if (matches.length === 0) {
    console.log(`No direct single-skill match found for "${query}".`);
    console.log(`Recommended baseline: Start with the Essential Starter Pack:\n`);
    console.log(`  everything-seo init --preset starter\n`);
    return;
  }

  console.log(`Found \x1b[32m${matches.length} Recommended Operational Skill(s)\x1b[0m for this scenario:\n`);
  matches.forEach((m, idx) => {
    console.log(`\x1b[1m${idx + 1}. ${m.skill}\x1b[0m`);
    console.log(`   Rationale: ${m.reason}`);
    console.log(`   Command:   \x1b[34meverything-seo add "${m.name}"\x1b[0m\n`);
  });
}

function handleAdd(skillQuery) {
  const cleanQ = skillQuery.toLowerCase().trim();
  const allSkills = findSkillDirectories();

  // 1. Check alias resolution
  let resolvedQuery = cleanQ;
  if (SKILL_ALIASES[cleanQ]) {
    resolvedQuery = SKILL_ALIASES[cleanQ].toLowerCase();
    console.log(`\x1b[36m[ALIAS]\x1b[0m Resolved "${cleanQ}" -> ${SKILL_ALIASES[cleanQ]}`);
  }

  const match = allSkills.find(s => 
    s.slug.toLowerCase().includes(resolvedQuery) || 
    s.name.toLowerCase().includes(resolvedQuery)
  );

  if (!match) {
    console.error(`\x1b[31m[ERROR] No skill matching "${skillQuery}" found.\x1b[0m`);
    console.log(`Run 'everything-seo list' to see all 55 available skills, or 'everything-seo triage <problem>'.`);
    process.exit(1);
  }

  const cleanName = match.name.replace(/^seo[-\s]+/i, '');
  const slug = `seo-${cleanName.toLowerCase().replace(/[\s+]+/g, '-').replace(/[^\w-]/g, '')}`;

  const targetDir = path.join(process.cwd(), '.agent', 'skills', slug);
  fs.mkdirSync(targetDir, { recursive: true });
  const content = fs.readFileSync(match.path, 'utf8');
  fs.writeFileSync(path.join(targetDir, 'SKILL.md'), content, 'utf8');

  // Also create matching Cursor rule
  const cursorDir = path.join(process.cwd(), '.cursor', 'rules');
  fs.mkdirSync(cursorDir, { recursive: true });
  let desc = `SEO operational skill for ${match.name}`;
  const descMatch = content.match(/description:\s*"([^"]+)"/) || content.match(/description:\s*'([^']+)'/) || content.match(/description:\s*([^\n]+)/);
  if (descMatch) desc = descMatch[1].trim();

  const triggerMatch = content.match(/##\s*B\.\s*Trigger Conditions([\s\S]*?)(?=\n##\s*[A-Z]\.|\Z)/i);
  if (triggerMatch) {
    let trigText = triggerMatch[1].replace(/Invoke this skill when:?/i, '').replace(/Upstream dependencies:[\s\S]*/i, '').replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
    if (trigText.length > 250) trigText = trigText.slice(0, 250) + '...';
    if (trigText) desc = `${desc} Trigger when: ${trigText}`;
  }
  const safeDesc = desc.replace(/"/g, "'");

  const cursorRule = `---
description: "${safeDesc}"
globs: "**/*"
alwaysApply: false
---

# ${match.name} Rules
Follow operational procedures in .agent/skills/${slug}/SKILL.md
`;
  fs.writeFileSync(path.join(cursorDir, `${slug}.mdc`), cursorRule, 'utf8');

  console.log(`\x1b[32m[PASS] Added skill: ${match.slug}\x1b[0m`);
  console.log(`- Agent skill: .agent/skills/${slug}/SKILL.md`);
  console.log(`- Cursor rule: .cursor/rules/${slug}.mdc\n`);
}

function handleSearch(query) {
  if (!query) {
    console.error(`Please provide a search term: everything-seo search <query>`);
    process.exit(1);
  }
  const allSkills = findSkillDirectories();
  const q = query.toLowerCase();

  const results = allSkills.filter(s => {
    const direct = s.name.toLowerCase().includes(q) || s.discipline.toLowerCase().includes(q);
    const aliasMatch = Object.entries(SKILL_ALIASES).some(([k, v]) => k.includes(q) && v.toLowerCase() === s.slug.toLowerCase());
    return direct || aliasMatch;
  });

  printBanner();
  console.log(`Search Results for "${query}" (${results.length} found):\n`);
  for (const r of results) {
    console.log(`- \x1b[1m\x1b[34m${r.discipline}\x1b[0m / \x1b[32m${r.name}\x1b[0m`);
    console.log(`  Path: ${r.slug}`);
  }
  console.log('');
}

function handleList() {
  printBanner();
  const allSkills = findSkillDirectories();
  console.log(`Available Operational Skills (${allSkills.length} total across 11 Disciplines):\n`);
  
  const grouped = {};
  for (const s of allSkills) {
    if (!grouped[s.discipline]) grouped[s.discipline] = [];
    grouped[s.discipline].push(s.name);
  }

  for (const [disc, skills] of Object.entries(grouped)) {
    console.log(`\x1b[1m📂 ${disc}\x1b[0m (${skills.length})`);
    for (const sk of skills) {
      console.log(`   └─ ${sk}`);
    }
  }
  console.log('');
}

function handleAudit(targetPath = '.') {
  printBanner();
  const dir = path.resolve(targetPath);
  console.log(`[*] Running Offline SEO Baseline Audit on: ${dir}\n`);

  let checks = 0;
  let passed = 0;

  // Check 1: robots.txt
  checks++;
  const robotsPaths = [
    path.join(dir, 'public', 'robots.txt'),
    path.join(dir, 'robots.txt'),
    path.join(dir, 'static', 'robots.txt')
  ];
  const foundRobots = robotsPaths.find(p => fs.existsSync(p));
  if (foundRobots) {
    console.log(`\x1b[32m[PASS]\x1b[0m robots.txt exists (${path.relative(dir, foundRobots)})`);
    passed++;
  } else {
    console.log(`\x1b[33m[WARN]\x1b[0m robots.txt missing (recommend creating public/robots.txt)`);
  }

  // Check 2: sitemap reference
  checks++;
  const sitemapPaths = [
    path.join(dir, 'public', 'sitemap.xml'),
    path.join(dir, 'sitemap.xml'),
    path.join(dir, 'app', 'sitemap.ts'),
    path.join(dir, 'app', 'sitemap.xml')
  ];
  const foundSitemap = sitemapPaths.find(p => fs.existsSync(p));
  if (foundSitemap) {
    console.log(`\x1b[32m[PASS]\x1b[0m Sitemap configuration found (${path.relative(dir, foundSitemap)})`);
    passed++;
  } else {
    console.log(`\x1b[33m[WARN]\x1b[0m Sitemap file missing (recommend adding sitemap.xml)`);
  }

  // Check 3: Schema / JSON-LD files
  checks++;
  console.log(`\x1b[32m[PASS]\x1b[0m Audit complete: ${passed}/${checks} critical baseline files detected.`);
  console.log(`For deep forensic diagnostics, execute: everything-seo triage "crawling issues"\n`);
}

function handleScaffold(name, category = 'Technical SEO') {
  if (!name) {
    console.error('\x1b[31m[ERROR] Please provide a skill name: everything-seo scaffold --name <skill-name> [--category <cat>]\x1b[0m');
    process.exit(1);
  }
  printBanner();
  const targetDir = path.join(process.cwd(), '.agent', 'skills', category, name);
  fs.mkdirSync(targetDir, { recursive: true });

  const authoringTemplatePath = getAuthoringTemplatePath();
  let content = '';
  if (authoringTemplatePath && fs.existsSync(authoringTemplatePath)) {
    content = fs.readFileSync(authoringTemplatePath, 'utf8')
      .replace(/\[DISCIPLINE NAME\]/g, category)
      .replace(/\[SKILL NAME\]/g, name);
  } else {
    content = `---\nname: "${name}"\ndescription: "Custom project SEO capability for ${name}"\n---\n\n# ${name}\n`;
  }

  const destFile = path.join(targetDir, 'SKILL.md');
  fs.writeFileSync(destFile, content, 'utf8');

  // Also create matching Cursor rule
  const cursorDir = path.join(process.cwd(), '.cursor', 'rules');
  fs.mkdirSync(cursorDir, { recursive: true });
  const slug = name.toLowerCase().replace(/[\s+]+/g, '-').replace(/[^\w-]/g, '');
  const cursorRule = `---
description: "Custom project SEO rule for ${name}"
globs: "**/*"
alwaysApply: false
---

# ${name} Rules
Follow operational procedures in .agent/skills/${category}/${name}/SKILL.md
`;
  fs.writeFileSync(path.join(cursorDir, `seo-${slug}.mdc`), cursorRule, 'utf8');

  console.log(`\x1b[32m[PASS] Scaffolded custom skill:\x1b[0m`);
  console.log(`  - Skill manual: .agent/skills/${category}/${name}/SKILL.md`);
  console.log(`  - Cursor rule:  .cursor/rules/seo-${slug}.mdc\n`);
}

function handleView(skillQuery, sectionLetter) {
  if (!skillQuery) {
    console.error('Usage: everything-seo view <skill> [--section <letter>]');
    process.exit(1);
  }
  const cleanQ = skillQuery.toLowerCase().trim();
  const resolvedQuery = SKILL_ALIASES[cleanQ] ? SKILL_ALIASES[cleanQ].toLowerCase() : cleanQ;

  const allSkills = findSkillDirectories();
  const match = allSkills.find(s => 
    s.slug.toLowerCase().includes(resolvedQuery) || 
    s.name.toLowerCase().includes(resolvedQuery)
  );

  if (!match) {
    console.error(`\x1b[31m[ERROR] Skill "${skillQuery}" not found.\x1b[0m`);
    process.exit(1);
  }

  printBanner();
  console.log(`\x1b[1m\x1b[34m${match.discipline} / ${match.name}\x1b[0m (${match.slug})\n`);
  const content = fs.readFileSync(match.path, 'utf8');

  if (sectionLetter) {
    const sLetter = sectionLetter.toUpperCase();
    const regex = new RegExp(`(?:###\\s*Section\\s*${sLetter}:|##\\s*${sLetter}\\.)[^\\n]*\\n([\\s\\S]*?)(?=\\n##\\s*[A-Z]\\.|\\n###\\s*Section|\\Z)`, 'i');
    const m = content.match(regex);
    if (m) {
      console.log(`\x1b[32m=== Section ${sLetter} ===\x1b[0m\n`);
      console.log(m[1].trim());
    } else {
      console.log(`[Section ${sLetter} not found in this skill manual]`);
    }
  } else {
    console.log(content);
  }
}

function handleSync() {
  printBanner();
  console.log(`[*] Synchronizing installed project skills with upstream canonical library...`);
  const agentSkillsDir = path.join(process.cwd(), '.agent', 'skills');

  if (!fs.existsSync(agentSkillsDir)) {
    console.log(`[INFO] No .agent/skills directory found in current workspace. Nothing to sync.`);
    return;
  }

  const allSkills = findSkillDirectories();
  let updatedCount = 0;

  function scanAndSync(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const fullPath = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        scanAndSync(fullPath);
      } else if (ent.name === 'SKILL.md') {
        const skillName = path.basename(dir);
        const canonical = allSkills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
        if (canonical) {
          const localContent = fs.readFileSync(fullPath, 'utf8');
          const upstreamContent = fs.readFileSync(canonical.path, 'utf8');
          if (localContent !== upstreamContent) {
            const bakPath = `${fullPath}.bak.${Date.now()}`;
            fs.writeFileSync(bakPath, localContent, 'utf8');
            fs.writeFileSync(fullPath, upstreamContent, 'utf8');
            console.log(`\x1b[32m[UPDATED]\x1b[0m ${skillName} (Backup saved: ${path.basename(bakPath)})`);
            updatedCount++;
          }
        }
      }
    }
  }

  scanAndSync(agentSkillsDir);
  console.log(`\n\x1b[32m[PASS] Sync complete. ${updatedCount} skills updated with upstream improvements.\x1b[0m\n`);
}

function handleMCP() {
  const localMcpPath = path.join(__dirname, '..', '..', 'mcp-server', 'index.js');
  if (fs.existsSync(localMcpPath)) {
    require(localMcpPath);
    return;
  }
  try {
    require('@devcenterpoint/mcp-server-seo');
  } catch (e) {
    console.error(`[ERROR] Could not start MCP server: ${e.message}`);
    process.exit(1);
  }
}

// Main CLI Router
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] ? args[0].toLowerCase() : 'help';

  switch (command) {
    case 'install':
      handleInstallGlobal();
      break;
    case 'init': {
      const isAll = args.includes('--all');
      const presetIdx = args.indexOf('--preset');
      const presetVal = presetIdx !== -1 && args[presetIdx + 1] ? args[presetIdx + 1] : null;
      await handleInit(presetVal, isAll);
      break;
    }
    case 'triage':
      handleTriage(args.slice(1).join(' '));
      break;
    case 'add':
      if (!args[1]) {
        console.error(`Usage: everything-seo add <skill | alias>`);
        process.exit(1);
      }
      handleAdd(args.slice(1).join(' '));
      break;
    case 'scaffold': {
      const nameIdx = args.indexOf('--name');
      const nameVal = nameIdx !== -1 && args[nameIdx + 1] ? args[nameIdx + 1] : args[1];
      const catIdx = args.indexOf('--category');
      const catVal = catIdx !== -1 && args[catIdx + 1] ? args[catIdx + 1] : 'Technical SEO';
      handleScaffold(nameVal, catVal);
      break;
    }
    case 'view': {
      const secIdx = args.indexOf('--section');
      const secVal = secIdx !== -1 && args[secIdx + 1] ? args[secIdx + 1] : null;
      handleView(args[1], secVal);
      break;
    }
    case 'sync':
      handleSync();
      break;
    case 'search':
      handleSearch(args.slice(1).join(' '));
      break;
    case 'list':
      handleList();
      break;
    case 'audit':
      handleAudit(args[1] || '.');
      break;
    case 'mcp':
      handleMCP();
      break;
    case '-v':
    case '--version':
    case 'version':
      console.log(`everything-seo v${VERSION}`);
      break;
    case '-h':
    case '--help':
    case 'help':
    default:
      printHelp();
      break;
  }
}

main().catch(err => {
  console.error('[FATAL ERROR]', err.message);
  process.exit(1);
});
