import os
import unittest

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
EXAMPLES_DIR = os.path.join(ROOT_DIR, "examples")
TEMPLATES_DIR = os.path.join(ROOT_DIR, "templates")

EXPECTED_EXAMPLES = [
    "keyword_research_ecommerce_migration.md",
    "content_gap_b2b_saas.md",
    "technical_seo_audit_ecommerce.md"
]

EXPECTED_TEMPLATES = [
    "keyword_research_brief_template.md",
    "technical_seo_audit_report_template.md",
    "content_optimization_brief_template.md",
    "content_gap_analysis_template.md",
    "internal_linking_plan_template.md",
    "structured_data_validation_report_template.md",
    "international_seo_qa_checklist_template.md",
    "seo_reporting_template.md",
    "research_evidence_log_template.md",
    "skill_authoring_template.md"
]

class TestExamplesAndTemplates(unittest.TestCase):

    def test_examples_exist_and_substantive(self):
        """Verify that all 3 worked examples exist and contain detailed content."""
        for example_file in EXPECTED_EXAMPLES:
            example_path = os.path.join(EXAMPLES_DIR, example_file)
            self.assertTrue(os.path.exists(example_path), f"Missing example: {example_file}")
            with open(example_path, "r", encoding="utf-8") as f:
                content = f.read()
            words = len(content.split())
            self.assertGreaterEqual(words, 400, f"{example_file} must have substantive word count (>400), got {words}")

    def test_templates_exist_and_substantive(self):
        """Verify that all 10 deliverable templates exist and contain proper structure."""
        for template_file in EXPECTED_TEMPLATES:
            template_path = os.path.join(TEMPLATES_DIR, template_file)
            self.assertTrue(os.path.exists(template_path), f"Missing template: {template_file}")
            with open(template_path, "r", encoding="utf-8") as f:
                content = f.read()
            words = len(content.split())
            self.assertGreaterEqual(words, 150, f"{template_file} must have template structure (>150 words), got {words}")

if __name__ == "__main__":
    unittest.main()
