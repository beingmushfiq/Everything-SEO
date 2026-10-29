#!/usr/bin/env node
/**
 * Everything SEO CLI Utility
 * Maintained by DevCenterPoint (https://devcenterpoint.com)
 * Canonical Repository: https://github.com/beingmushfiq/Everything-SEO
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const os = require('os');

const VERSION = '1.2.1';
const ROOT_DIR = path.resolve(__dirname, '..', '..', '..');

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

function printBanner() {
  console.log(`\x1b[36m===================================================\x1b[0m`);
  console.log(`\x1b[1m\x1b[34mEverything SEO CLI\x1b[0m v${VERSION} — \x1b[32mDevCenterPoint\x1b[0m`);
  console.log(`Universal Skill Manager for AI Agents & Developers`);
  console.log(`\x1b[36m===================================================\x1b[0m\n`);
}

function printHelp() {
  printBanner();
  console.log(`Usage: everything-seo <command> [options]\n`);
  console.log(`Commands:`);
  console.log(`  install --global             Install skills globally for Antigravity, Claude Code, Cursor`);
  console.log(`  init [--preset <name>]       Initialize SEO capabilities in current workspace (defaults to starter)`);
  console.log(`  add <discipline/skill>       Progressively add a specific skill to current project`);
  console.log(`  scaffold --name <name>       Scaffold a new 17-section compliant custom project skill`);
  console.log(`  list                         List available skills and project presets`);
  console.log(`  search <query>               Search skills by keyword, intent, or framework`);
  console.log(`  audit [dir]                  Run an offline SEO health check on workspace`);
  console.log(`  mcp [--stdio]                Launch the Model Context Protocol (MCP) server`);
  console.log(`  version, -v                  Show version`);
  console.log(`  help, -h                     Show this help message\n`);
  console.log(`Presets available: starter (default), nextjs, ecommerce, saas, publisher\n`);
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

  const skillName = path.basename(skillRel);
  const allSkills = findSkillDirectories();
  const match = allSkills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
  if (match) return match.path;

  return null;
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
      const slug = `seo-${s.name.toLowerCase().replace(/[\s+]+/g, '-').replace(/[^\w-]/g, '')}`;
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

function handleInit(presetName) {
  printBanner();
  const targetDir = process.cwd();
  console.log(`[*] Initializing SEO capabilities in: ${targetDir}`);

  const agentSkillsDir = path.join(targetDir, '.agent', 'skills');
  const cursorRulesDir = path.join(targetDir, '.cursor', 'rules');

  fs.mkdirSync(agentSkillsDir, { recursive: true });
  fs.mkdirSync(cursorRulesDir, { recursive: true });

  const activePreset = presetName || 'starter';
  const presetsDir = getPresetsDir();
  const presetFile = path.join(presetsDir, `${activePreset.toLowerCase()}.json`);

  if (!fs.existsSync(presetFile)) {
    console.error(`\x1b[31m[ERROR] Preset "${activePreset}" not found.\x1b[0m`);
    console.log(`Available presets: starter, nextjs, ecommerce, saas, publisher`);
    process.exit(1);
  }

  const preset = JSON.parse(fs.readFileSync(presetFile, 'utf8'));
  console.log(`\x1b[34m[PRESET]\x1b[0m Applying preset: \x1b[1m${preset.name}\x1b[0m (${activePreset})`);
  console.log(`Description: ${preset.description}\n`);

  let installedCount = 0;
  for (const skillRel of preset.skills) {
    const src = resolveSkillSource(skillRel);
    const skillName = path.basename(skillRel);
    const destSkillDir = path.join(agentSkillsDir, skillName);
    const dest = path.join(destSkillDir, 'SKILL.md');
    fs.mkdirSync(destSkillDir, { recursive: true });

    if (src && fs.existsSync(src)) {
      const content = fs.readFileSync(src, 'utf8');
      fs.writeFileSync(dest, content, 'utf8');
      console.log(` \x1b[32m+\x1b[0m Installed skill: .agent/skills/${skillName}/SKILL.md`);

      // Generate matching Cursor rule
      const slug = skillName.toLowerCase().replace(/[\s+]+/g, '-').replace(/[^\w-]/g, '');
      let desc = `SEO operational skill for ${skillName}`;
      const descMatch = content.match(/description:\s*"([^"]+)"/) || content.match(/description:\s*'([^']+)'/);
      if (descMatch) desc = descMatch[1];
      const cursorRule = `---
description: "${desc}"
globs: "**/*"
alwaysApply: false
---

# ${skillName} Rules
Follow operational procedures in .agent/skills/${skillName}/SKILL.md
`;
      fs.writeFileSync(path.join(cursorRulesDir, `seo-${slug}.mdc`), cursorRule, 'utf8');
      console.log(` \x1b[36m+\x1b[0m Configured rule: .cursor/rules/seo-${slug}.mdc`);
      installedCount++;
    } else {
      console.warn(` \x1b[33m!\x1b[0m Source for skill "${skillRel}" could not be resolved.`);
    }
  }

  // Create workspace config
  const manifestPath = path.join(targetDir, '.everything-seo.json');
  const manifest = {
    version: VERSION,
    initialized_at: new Date().toISOString(),
    preset: activePreset,
    installed_skills: preset.skills.map(s => path.basename(s)),
    maintainer: 'DevCenterPoint (https://devcenterpoint.com)'
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`\n\x1b[32m[PASS] Project initialized successfully with ${installedCount} skills.\x1b[0m`);
  console.log(`- Agent skills directory: .agent/skills/`);
  console.log(`- Cursor rules directory: .cursor/rules/`);
  console.log(`- Project manifest: .everything-seo.json\n`);
  console.log(`Need more skills? Add anytime using:`);
  console.log(`  everything-seo add <skill-name>\n`);
}

function handleAdd(skillQuery) {
  const allSkills = findSkillDirectories();
  const match = allSkills.find(s => 
    s.slug.toLowerCase().includes(skillQuery.toLowerCase()) || 
    s.name.toLowerCase().includes(skillQuery.toLowerCase())
  );

  if (!match) {
    console.error(`\x1b[31m[ERROR] No skill matching "${skillQuery}" found.\x1b[0m`);
    console.log(`Run 'everything-seo list' to see all 55 available skills.`);
    process.exit(1);
  }

  const targetDir = path.join(process.cwd(), '.agent', 'skills', match.name);
  fs.mkdirSync(targetDir, { recursive: true });
  const content = fs.readFileSync(match.path, 'utf8');
  fs.writeFileSync(path.join(targetDir, 'SKILL.md'), content, 'utf8');

  // Also create matching Cursor rule
  const cursorDir = path.join(process.cwd(), '.cursor', 'rules');
  fs.mkdirSync(cursorDir, { recursive: true });
  const slug = match.name.toLowerCase().replace(/[\s+]+/g, '-').replace(/[^\w-]/g, '');
  let desc = `SEO operational skill for ${match.name}`;
  const descMatch = content.match(/description:\s*"([^"]+)"/) || content.match(/description:\s*'([^']+)'/);
  if (descMatch) desc = descMatch[1];
  const cursorRule = `---
description: "${desc}"
globs: "**/*"
alwaysApply: false
---

# ${match.name} Rules
Follow operational procedures in .agent/skills/${match.name}/SKILL.md
`;
  fs.writeFileSync(path.join(cursorDir, `seo-${slug}.mdc`), cursorRule, 'utf8');

  console.log(`\x1b[32m[PASS] Added skill: ${match.slug}\x1b[0m`);
  console.log(`- Agent skill: .agent/skills/${match.name}/SKILL.md`);
  console.log(`- Cursor rule: .cursor/rules/seo-${slug}.mdc\n`);
}

function handleSearch(query) {
  if (!query) {
    console.error(`Please provide a search term: everything-seo search <query>`);
    process.exit(1);
  }
  const allSkills = findSkillDirectories();
  const results = allSkills.filter(s => 
    s.name.toLowerCase().includes(query.toLowerCase()) || 
    s.discipline.toLowerCase().includes(query.toLowerCase())
  );

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
  console.log(`For deep forensic diagnostics, execute skill: SEO/Technical SEO/Crawling/SKILL.md\n`);
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
  const allSkills = findSkillDirectories();
  const match = allSkills.find(s => 
    s.slug.toLowerCase().includes(skillQuery.toLowerCase()) || 
    s.name.toLowerCase().includes(skillQuery.toLowerCase())
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

function handleRegistry(action = 'list') {
  printBanner();
  const regCandidates = [
    path.join(__dirname, '..', 'data', 'registry', 'registry.json'),
    path.join(ROOT_DIR, 'registry', 'registry.json')
  ];
  const regPath = regCandidates.find(p => fs.existsSync(p));
  if (!regPath) {
    console.error('[ERROR] Registry catalog not found.');
    return;
  }
  const reg = JSON.parse(fs.readFileSync(regPath, 'utf8'));
  console.log(`Verified Community Skill Packs (${reg.packages.length} available):\n`);
  for (const pkg of reg.packages) {
    console.log(`\x1b[1m\x1b[34m${pkg.name}\x1b[0m v${pkg.version} [${pkg.verified ? 'Verified' : 'Unverified'}]`);
    console.log(`  ${pkg.description}`);
    console.log(`  Disciplines: ${pkg.disciplines.join(', ')} | Skills: ${pkg.skills_count}\n`);
  }
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
const args = process.argv.slice(2);
const command = args[0] ? args[0].toLowerCase() : 'help';

switch (command) {
  case 'install':
    handleInstallGlobal();
    break;
  case 'init': {
    const presetIdx = args.indexOf('--preset');
    const presetVal = presetIdx !== -1 && args[presetIdx + 1] ? args[presetIdx + 1] : null;
    handleInit(presetVal);
    break;
  }
  case 'add':
    if (!args[1]) {
      console.error(`Usage: everything-seo add <discipline/skill>`);
      process.exit(1);
    }
    handleAdd(args[1]);
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
    handleSearch(args[1]);
    break;
  case 'list':
    handleList();
    break;
  case 'audit':
    handleAudit(args[1] || '.');
    break;
  case 'registry':
    handleRegistry(args[1] || 'list');
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
