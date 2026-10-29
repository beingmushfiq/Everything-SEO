import os
import re
import unittest

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SEO_DIR = os.path.join(ROOT_DIR, "SEO")

EXPECTED_TAXONOMY = {
    "Keyword Research": [
        "Keyword Discovery",
        "Long-tail Keywords",
        "Low-competition Keywords",
        "Search Volume",
        "SERP Analysis"
    ],
    "On-page SEO": [
        "Title",
        "Headings Optimization",
        "URL Optimization",
        "Image SEO",
        "Internal Linking",
        "Schema Markup",
        "CTR Optimization"
    ],
    "Content Optimization": [
        "Gap Analysis",
        "NLP Optimization",
        "Entity Coverage",
        "Content Refresh",
        "Readability"
    ],
    "Technical SEO": [
        "Crawling",
        "Indexing",
        "XML Sitemaps",
        "RobotsTXT",
        "Redirects",
        "Page Speed",
        "Log File Analysis"
    ],
    "Link Building": [
        "Digital PR",
        "Guest Posting",
        "Broken Link Building",
        "Unlinked Brand Mentions",
        "Linkable Assets",
        "HARO"
    ],
    "AI SEO": [
        "AI Search Visibility",
        "Entity Optimization",
        "AI Citations",
        "Reddit Mentions",
        "3rd Party Mentions"
    ],
    "International SEO": [
        "Hreflang",
        "Multilingual SEO",
        "Translation SEO"
    ],
    "Analytics": [
        "Search Console",
        "Bing Webmaster Tools",
        "Google Analytics",
        "SEO Reporting"
    ],
    "SEO Tools": [
        "Ahrefs",
        "SEMrush",
        "Keywords Everywhere",
        "Screaming Frog",
        "SEO Orchestrator"
    ],
    "SEO Wins": [
        "150+ SEO Hacks",
        "AI SEO Hacks",
        "Traffic Growth",
        "Backlinks Hacks"
    ],
    "Growth": [
        "Organic Traffic",
        "Lead Generation",
        "Conversion Optimization",
        "Revenue Growth",
        "SEO Scaling"
    ]
}

REQUIRED_SECTIONS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q"]

class TestSkillStructure(unittest.TestCase):

    def test_total_skill_count(self):
        """Assert exactly 56 skills exist across 11 disciplines."""
        total_skills = sum(len(skills) for skills in EXPECTED_TAXONOMY.values())
        self.assertEqual(total_skills, 56, "Taxonomy must define exactly 56 skills")
        
        found_skills = 0
        for disc, skills in EXPECTED_TAXONOMY.items():
            for skill in skills:
                skill_path = os.path.join(SEO_DIR, disc, skill, "SKILL.md")
                self.assertTrue(os.path.exists(skill_path), f"Missing file: {skill_path}")
                found_skills += 1
        self.assertEqual(found_skills, 56, "All 56 skill files must exist on disk")

    def test_skill_frontmatter(self):
        """Assert all 56 skills start with valid YAML frontmatter containing required fields."""
        for disc, skills in EXPECTED_TAXONOMY.items():
            for skill in skills:
                skill_path = os.path.join(SEO_DIR, disc, skill, "SKILL.md")
                with open(skill_path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                self.assertTrue(content.startswith("---"), f"{skill}: Must start with '---'")
                parts = content.split("---", 2)
                self.assertGreaterEqual(len(parts), 3, f"{skill}: Frontmatter must be closed by '---'")
                
                fm = parts[1]
                self.assertIn("name:", fm, f"{skill}: Missing 'name' in frontmatter")
                self.assertIn("description:", fm, f"{skill}: Missing 'description' in frontmatter")
                self.assertIn("metadata:", fm, f"{skill}: Missing 'metadata' in frontmatter")
                self.assertIn("category:", fm, f"{skill}: Missing 'metadata.category'")
                self.assertIn("discipline:", fm, f"{skill}: Missing 'metadata.discipline'")
                self.assertIn("version:", fm, f"{skill}: Missing 'metadata.version'")

    def test_mandatory_sections_present(self):
        """Assert all 17 standardized sections (A through Q) are present in each skill."""
        for disc, skills in EXPECTED_TAXONOMY.items():
            for skill in skills:
                skill_path = os.path.join(SEO_DIR, disc, skill, "SKILL.md")
                with open(skill_path, "r", encoding="utf-8") as f:
                    content = f.read()

                missing = []
                for letter in REQUIRED_SECTIONS:
                    pattern = rf'##\s+(?:Section\s+)?{letter}[\.\:\s]'
                    if not re.search(pattern, content):
                        missing.append(letter)
                self.assertEqual(missing, [], f"{skill} is missing sections: {missing}")

    def test_substantive_word_count(self):
        """Assert all skills contain substantive content (> 800 words)."""
        for disc, skills in EXPECTED_TAXONOMY.items():
            for skill in skills:
                skill_path = os.path.join(SEO_DIR, disc, skill, "SKILL.md")
                with open(skill_path, "r", encoding="utf-8") as f:
                    words = len(f.read().split())
                self.assertGreaterEqual(words, 800, f"{skill} word count ({words}) is below 800 words")

if __name__ == "__main__":
    unittest.main()
