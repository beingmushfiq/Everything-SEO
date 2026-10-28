# DevCenterPoint SEO Operating System - Agent Guidance

## Purpose
This document provides instructions for AI coding and research agents working within the `d:\Everything-SEO` workspace.

## Repository Layout
- `/api`: Laravel 11 backend API handling crawler operations, rule evaluation, database persistence, and search analytics sync.
- `/frontend`: React 18, Vite, TypeScript, and Tailwind CSS single-page application.
- `/docs`: Architecture specifications, data models, security threat models, and roadmaps.
- `/knowledge-base`: Markdown-driven SEO playbooks, audit checklists, templates, and SOPs organized across the 11 SEO core disciplines.

## Working Principles
1. **Evidence-Based Technical SEO**:
   Never invent arbitrary "AI visibility scores" or fake ranking heuristics. Technical issues must record exact code evidence (e.g. status code, DOM snippet, character length, header line).
2. **Security First**:
   All web crawling functions must be guarded by `SSRFGuardService` which blocks localhost, RFC 1918 private networks, and cloud metadata IPs (`169.254.169.254`).
3. **Data Integrity**:
   Missing metrics in keyword CSV imports must remain `null` or `N/A`, never populated with fabricated search volumes or difficulties.
4. **Deterministic Audits**:
   Ensure rules in `RuleEngine` are pure functions accepting parsed page metadata and returning deterministic issue objects.
