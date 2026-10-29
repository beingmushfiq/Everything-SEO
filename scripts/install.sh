#!/usr/bin/env bash
# ==============================================================================
# Everything SEO: Universal Global Agent Installer (macOS & Linux)
# Maintained by DevCenterPoint (https://devcenterpoint.com)
# ==============================================================================

set -euo pipefail

REPO_URL="https://github.com/beingmushfiq/Everything-SEO.git"
INSTALL_DIR="$HOME/.everything-seo"

echo "=== 🚀 Everything SEO Universal Agent Installer ==="
echo "Stewardship: DevCenterPoint (https://devcenterpoint.com)"
echo "Target Machine: $(uname -s) ($(uname -m))"
echo ""

# 1. Clone or Update Central Library
if [ -d "$INSTALL_DIR" ]; then
    echo "[INFO] Updating existing Everything SEO library in $INSTALL_DIR..."
    git -C "$INSTALL_DIR" pull --quiet origin main || true
else
    echo "[INFO] Cloning Everything SEO library into $INSTALL_DIR..."
    git clone --depth 1 --quiet "$REPO_URL" "$INSTALL_DIR"
fi

# 2. Detect & Link for Google Antigravity
ANTIGRAVITY_DIR="$HOME/.gemini/antigravity/skills"
if [ -d "$HOME/.gemini" ]; then
    echo "[DETECT] Google Antigravity environment detected."
    mkdir -p "$ANTIGRAVITY_DIR"
    python3 "$INSTALL_DIR/scripts/adapters/generate_antigravity_skills.py" --output "$ANTIGRAVITY_DIR" --symlink || \
    python3 "$INSTALL_DIR/scripts/adapters/generate_antigravity_skills.py" --output "$ANTIGRAVITY_DIR"
    echo "[PASS] Linked 55 skills into $ANTIGRAVITY_DIR"
fi

# 3. Detect & Link for Claude Code CLI
CLAUDE_DIR="$HOME/.claude/skills"
if [ -d "$HOME/.claude" ]; then
    echo "[DETECT] Claude Code CLI detected."
    mkdir -p "$CLAUDE_DIR"
    python3 "$INSTALL_DIR/scripts/adapters/generate_claude_skills.py" --output "$CLAUDE_DIR" --symlink || \
    python3 "$INSTALL_DIR/scripts/adapters/generate_claude_skills.py" --output "$CLAUDE_DIR"
    echo "[PASS] Linked 55 skills into $CLAUDE_DIR"
fi

echo ""
echo "=== ✅ Everything SEO Installation Complete ==="
echo "Your AI coding assistants (Antigravity, Claude Code, Cursor) can now discover and use 55 operational SEO skills."
echo "Docs: https://github.com/beingmushfiq/Everything-SEO"

