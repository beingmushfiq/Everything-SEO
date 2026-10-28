## 📌 Summary of Changes

Provide a concise explanation of what this Pull Request introduces, modifies, or fixes.

- **Discipline / Area**: `[e.g., Technical SEO / Crawling]`
- **Files Modified / Created**: `[e.g., SEO/Technical SEO/Crawling/SKILL.md]`
- **Motivation / Issue Resolved**: `[e.g., Fixes #123 / Adds Nginx gzip directives]`

---

## 📐 Specification & Quality Conformance

Please confirm your changes adhere to our standards:
- [ ] Conforms to the [Skill Writing Standard](../docs/SKILL_WRITING_STANDARD.md).
- [ ] Contains valid YAML frontmatter (`name`, `description`, `metadata`).
- [ ] Contains all 17 standardized sections (A through Q) in order (if authoring/editing a skill).
- [ ] All internal relative links use URI encoding (`%20` for spaces) and valid paths.
- [ ] Includes free/open-source alternatives alongside any commercial tool mentions.
- [ ] Anchored in Tier 1 or Tier 2 official standards (IETF RFCs, W3C, Schema.org, Google/Bing documentation).

---

## 🧪 Local Validation Results

Confirm that you have executed the automated validation tools locally:

- [ ] `python scripts/validate_skills.py` (Exit code: 0)
- [ ] `python scripts/check_links.py` (Exit code: 0)
- [ ] `python scripts/generate_index.py --check` (Exit code: 0)
- [ ] `python -m unittest discover -s tests -p "test_*.py"` (Exit code: 0)
