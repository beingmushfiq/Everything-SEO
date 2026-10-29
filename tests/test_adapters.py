#!/usr/bin/env python3
"""
Test Suite for Everything SEO Adapters, Presets, Universal CLI, and SEO-Eval.
Maintained by DevCenterPoint (https://devcenterpoint.com)
"""

import unittest
import json
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
SEO_DIR = ROOT_DIR / "SEO"
PRESETS_DIR = ROOT_DIR / "templates" / "presets"
REGISTRY_FILE = ROOT_DIR / "registry" / "registry.json"

class TestAdaptersAndPresets(unittest.TestCase):

    def test_presets_validity_and_skills_exist(self):
        """Verify all preset JSON manifests are syntactically valid and point to real skills."""
        self.assertTrue(PRESETS_DIR.exists(), f"Presets directory {PRESETS_DIR} must exist.")
        preset_files = list(PRESETS_DIR.glob("*.json"))
        self.assertGreaterEqual(len(preset_files), 4, "Must contain at least 4 presets (nextjs, ecommerce, saas, publisher).")

        required_keys = {"name", "slug", "description", "target_frameworks", "skills", "recommended_globs"}

        for p_file in preset_files:
            with self.subTest(preset=p_file.name):
                with open(p_file, "r", encoding="utf-8") as f:
                    data = json.load(f)

                # Check required fields
                for k in required_keys:
                    self.assertIn(k, data, f"Preset {p_file.name} missing key '{k}'")

                # Verify all skills listed in the preset actually exist
                for skill_rel in data["skills"]:
                    skill_path = ROOT_DIR / skill_rel / "SKILL.md"
                    self.assertTrue(
                        skill_path.exists(),
                        f"Preset {p_file.name} references non-existent skill: {skill_rel}"
                    )

    def test_cursor_rules_generator(self):
        """Verify generate_cursor_rules.py runs and produces valid .mdc files."""
        script = ROOT_DIR / "scripts" / "adapters" / "generate_cursor_rules.py"
        self.assertTrue(script.exists())

        with tempfile.TemporaryDirectory() as tmpdir:
            cmd = [sys.executable, str(script), "--output", tmpdir]
            res = subprocess.run(cmd, capture_output=True, text=True)
            self.assertEqual(res.returncode, 0, f"Script failed with output:\n{res.stderr}")

            # Verify files were generated
            generated = list(Path(tmpdir).glob("*.mdc"))
            self.assertEqual(len(generated), 57, f"Expected 57 generated .mdc files (56 skills + master router), found {len(generated)}")

            # Check frontmatter of a sample file
            sample = generated[0]
            with open(sample, "r", encoding="utf-8") as f:
                content = f.read()
            self.assertTrue(content.startswith("---"), f"{sample.name} must start with YAML frontmatter")
            self.assertIn("globs:", content, f"{sample.name} must contain globs in frontmatter")

    def test_copilot_and_windsurf_generator(self):
        """Verify generate_copilot_rules.py runs successfully."""
        script = ROOT_DIR / "scripts" / "adapters" / "generate_copilot_rules.py"
        self.assertTrue(script.exists())

        with tempfile.TemporaryDirectory() as tmpdir:
            copilot_out = Path(tmpdir) / "copilot-instructions.md"
            windsurf_out = Path(tmpdir) / ".windsurfrules"
            cmd = [
                sys.executable, str(script),
                "--copilot-path", str(copilot_out),
                "--windsurf-path", str(windsurf_out)
            ]
            res = subprocess.run(cmd, capture_output=True, text=True)
            self.assertEqual(res.returncode, 0, f"Script failed: {res.stderr}")
            self.assertTrue(copilot_out.exists())
            self.assertTrue(windsurf_out.exists())

    def test_cli_version_execution(self):
        """Verify node CLI runs and reports version."""
        cli_entry = ROOT_DIR / "packages" / "cli" / "bin" / "everything-seo.js"
        self.assertTrue(cli_entry.exists())

        cmd = ["node", str(cli_entry), "--version"]
        res = subprocess.run(cmd, capture_output=True, text=True)
        self.assertEqual(res.returncode, 0, f"CLI version command failed: {res.stderr}")
        self.assertIn("1.4.0", res.stdout)

    def test_cli_search_execution(self):
        """Verify node CLI search command works."""
        cli_entry = ROOT_DIR / "packages" / "cli" / "bin" / "everything-seo.js"
        cmd = ["node", str(cli_entry), "search", "schema"]
        res = subprocess.run(cmd, capture_output=True, text=True)
        self.assertEqual(res.returncode, 0, f"CLI search failed: {res.stderr}")
        self.assertIn("Schema Markup", res.stdout)

    def test_python_cli_execution(self):
        """Verify Python CLI executes cleanly."""
        cmd = [sys.executable, "-m", "everything_seo_cli.cli", "search", "indexing"]
        res = subprocess.run(cmd, capture_output=True, text=True)
        self.assertEqual(res.returncode, 0, f"Python CLI failed: {res.stderr}")
        self.assertIn("Indexing", res.stdout)

    def test_schema_validator_script(self):
        """Verify offline schema validator script."""
        script = ROOT_DIR / "scripts" / "validate_schema.py"
        valid_json = json.dumps({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Testing Schema Validator",
            "author": {"@type": "Person", "name": "Test Author"},
            "datePublished": "2026-10-29"
        })
        cmd = [sys.executable, str(script), valid_json]
        res = subprocess.run(cmd, capture_output=True, text=True)
        self.assertEqual(res.returncode, 0, f"Schema validator rejected valid schema:\n{res.stdout}")

    def test_seo_eval_benchmark_runner(self):
        """Verify SEO-Eval benchmark runner executes and passes all test scenarios."""
        script = ROOT_DIR / "scripts" / "run_evals.py"
        cmd = [sys.executable, str(script)]
        res = subprocess.run(cmd, capture_output=True, text=True)
        self.assertEqual(res.returncode, 0, f"SEO-Eval runner failed:\n{res.stderr}")
        self.assertIn("100.0% accuracy", res.stdout)

    def test_registry_manifest_validity(self):
        """Verify community skill registry manifest exists and contains packages."""
        self.assertTrue(REGISTRY_FILE.exists())
        with open(REGISTRY_FILE, "r", encoding="utf-8") as f:
            reg = json.load(f)
        self.assertIn("packages", reg)
        self.assertGreaterEqual(len(reg["packages"]), 1)

if __name__ == "__main__":
    unittest.main()
