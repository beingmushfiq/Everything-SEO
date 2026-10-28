# 🤝 Contributing to Everything SEO

Thank you for your interest in contributing to **Everything SEO**! We are committed to building a transparent, evidence-based, and deterministic open-source library of operational SEO skills for both human practitioners and autonomous AI agents.

This project is maintained by **DevCenterPoint** and our open-source community.

---

## 📜 Code of Conduct

All contributors and participants are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). We are dedicated to providing a welcoming, inclusive, and harassment-free environment for everyone.

---

## 🎯 What We Welcome

1. **New Skills**: Authoring new operational skills for emerging search surfaces (e.g., specific generative AI platforms, new search protocols).
2. **Skill Enhancements**: Adding concrete diagnostic heuristics, CLI scripts, or official documentation references to existing skills.
3. **Template & Example Additions**: Contributing real-world, anonymized case studies, worked examples, and practical deliverable templates.
4. **Validation Tooling**: Improving offline validation scripts, link checkers, and automated test coverage.
5. **Documentation & Fixes**: Fixing broken links, typos, ambiguous wording, or outdated search engine policy citations.

---

## 🚫 What We Do Not Accept

- **Superficial Stubs**: PRs that add 2-sentence generic advice or empty template outlines.
- **Speculative Folklore / Black-Hat Tactics**: Unsubstantiated claims (e.g., exact keyword density percentages, automated link networks, mass spun content, PBNs).
- **Hard Dependencies on Paid Tooling**: Every skill must provide free or open-source alternatives.
- **Unverified External Claims**: Citing unverified rumors or personal opinions as official search engine ranking factors.

---

## 📐 Skill Authoring Standards

Before creating or editing any skill, you **must** read and follow the [Skill Writing Standard](docs/SKILL_WRITING_STANDARD.md).

Every skill must:
1. Reside in `SKILL.md` inside its corresponding leaf directory.
2. Contain valid YAML frontmatter (`name`, `description`, `metadata`).
3. Implement all 17 standardized sections (A through Q) in order.
4. Use standard URI encoding (`%20`) for spaces in relative markdown links.
5. Pass all local automated validation checks without warnings.

---

## 🛠️ Local Development & Validation Workflow

### 1. Prerequisites
- Python 3.10+
- Git

### 2. Fork and Clone
```bash
git clone https://github.com/your-username/Everything-SEO.git
cd Everything-SEO
```

### 3. Install Development Dependencies
```bash
pip install -r requirements-dev.txt
```

### 4. Create a Feature Branch
Use descriptive branch names following conventional naming:
```bash
git checkout -b feat/add-video-seo-skill
# or
git checkout -b fix/hreflang-rfc-citation
```

### 5. Run Local Validation Suite
Before committing, run the automated validation tools:
```bash
# Validate frontmatter, sections, and word count across all skills
python scripts/validate_skills.py

# Check internal relative markdown link integrity
python scripts/check_links.py

# Verify that index and coverage tables match the filesystem
python scripts/generate_index.py --check

# Run unit tests
python -m unittest discover -s tests -p "test_*.py"
```

All checks **must pass with exit code 0** before submitting your PR.

---

## 📤 Submitting a Pull Request

1. **Commit Messages**: Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat: add video schema markup examples to Schema Markup skill`
   - `fix: resolve broken relative link in Indexing skill`
   - `docs: clarify GA4 data retention policies in Google Analytics skill`
2. **Open a PR**: Submit your PR targeting the `main` branch.
3. **Fill the Template**: Complete the provided [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md), documenting the changes and confirming local validation results.
4. **CI Verification**: GitHub Actions will automatically run the validation suite on your PR.

---

## 💬 Getting Help

If you have questions or want to discuss a new skill before authoring it:
- Open an issue using our [Skill Request Template](.github/ISSUE_TEMPLATE/skill_request.yml).
- Consult the [FAQ](FAQ.md) and [Support Guide](SUPPORT.md).
