#!/usr/bin/env node
/**
 * Bundle SEO manuals, templates, and presets into distribution package directories
 * Maintained by Mushfiqur Rahman Aayan (@beingmushfiq) & DevCenterPoint (https://devcenterpoint.com)
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SEO_SRC = path.join(ROOT_DIR, 'SEO');
const TEMPLATES_SRC = path.join(ROOT_DIR, 'templates');
const PRESETS_SRC = path.join(ROOT_DIR, 'templates', 'presets');

const TARGETS = [
  path.join(ROOT_DIR, 'packages', 'cli', 'data'),
  path.join(ROOT_DIR, 'packages', 'mcp-server', 'data'),
  path.join(ROOT_DIR, 'everything_seo_cli', 'data')
];

function copyFolder(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyFolder(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('[*] Bundling Everything SEO assets for universal distribution...');
for (const target of TARGETS) {
  console.log(` -> Packaging to: ${path.relative(ROOT_DIR, target)}`);
  copyFolder(SEO_SRC, path.join(target, 'SEO'));
  copyFolder(TEMPLATES_SRC, path.join(target, 'templates'));
  copyFolder(PRESETS_SRC, path.join(target, 'presets'));
}
console.log('[PASS] Universal asset bundling complete across npm, MCP, and PyPI targets.');
