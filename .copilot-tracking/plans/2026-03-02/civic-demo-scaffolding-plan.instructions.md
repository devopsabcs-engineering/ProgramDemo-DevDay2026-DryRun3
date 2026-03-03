---
applyTo: '.copilot-tracking/changes/2026-03-02/civic-demo-scaffolding-changes.md'
---
<!-- markdownlint-disable-file -->
# Implementation Plan: CIVIC Demo Scaffolding

## Overview

Generate 13 scaffolding files across 4 phases to prepare the CIVIC (Citizens' Ideas for a Vibrant and Inclusive Community) demo repository for a 130-minute live GitHub Copilot demonstration at Ontario Public Sector Developer Day 2026.

## Objectives

### User Requirements

* Generate 13 scaffolding files across 4 phases — Source: Research document Task Implementation Requests
* Create configuration layer (7 files): `.gitignore`, MCP config, copilot-instructions, 4 instruction files — Source: Research document Section 2
* Create documentation layer (3 files): architecture, data-dictionary, design-document — Source: Research document Section 3
* Create operational layer (2 scripts): Start-Local.ps1, Stop-Local.ps1 — Source: Research document Section 4
* Create talk track (1 file): TALK-TRACK.md at repository root — Source: Research document Section 5
* All files complete with no TODOs or placeholders — Source: Research document Success Criteria
* Valid YAML frontmatter on all markdown files — Source: Research document Success Criteria
* Valid Mermaid syntax in documentation files — Source: Research document Success Criteria
* Talk track covers all 130 minutes with two-presenter format — Source: Research document Success Criteria

### Derived Objectives

* Ensure Copilot instructions reference correct `applyTo` patterns for targeted guidance — Derived from: File role segregation in project structure
* Include commit checkpoint markers in implementation to enable demo recovery — Derived from: Risk mitigation requirements in talk track
* Structure talk track with timestamped beats for both presenters — Derived from: Two-presenter format requirement

## Context Summary

### Project Files

* `.copilot-tracking/research/2026-03-02/demo-scaffolding-research.md` - Primary research document with full specifications for all 13 files
* `README.md` - Existing business problem and tech stack reference

### References

* Research document Lines 1-50 - Task scope and success criteria
* Research document Lines 75-200 - Configuration file specifications
* Research document Lines 280-500 - Documentation file specifications
* Research document Lines 580-680 - Operational scripts specifications
* Research document Lines 680-870 - Talk track specifications

## Implementation Checklist

### [x] Implementation Phase 1: Configuration Files

<!-- parallelizable: true -->

* [x] Step 1.1: Create `.gitignore` with Java + Node + IDE + OS rules
  * Details: .copilot-tracking/details/2026-03-02/civic-demo-scaffolding-details.md (Lines 20-35)
* [x] Step 1.2: Create `.vscode/mcp.json` for ADO MCP server
  * Details: .copilot-tracking/details/2026-03-02/civic-demo-scaffolding-details.md (Lines 37-52)
* [x] Step 1.3: Create `.github/copilot-instructions.md` global context
  * Details: .copilot-tracking/details/2026-03-02/civic-demo-scaffolding-details.md (Lines 54-110)
* [x] Step 1.4: Create `.github/instructions/ado-workflow.instructions.md`
  * Details: .copilot-tracking/details/2026-03-02/civic-demo-scaffolding-details.md (Lines 112-140)
* [x] Step 1.5: Create `.github/instructions/java.instructions.md`
  * Details: .copilot-tracking/details/2026-03-02/civic-demo-scaffolding-details.md (Lines 142-190)
* [x] Step 1.6: Create `.github/instructions/react.instructions.md`
  * Details: .copilot-tracking/details/2026-03-02/civic-demo-scaffolding-details.md (Lines 192-240)
* [x] Step 1.7: Create `.github/instructions/sql.instructions.md`
  * Details: .copilot-tracking/details/2026-03-02/civic-demo-scaffolding-details.md (Lines 242-285)
* [ ] Step 1.8: Commit configuration files
  * Commit message: `docs: add Copilot instructions and MCP configuration`
* [x] Step 1.9: Validate phase changes
  * Verify YAML frontmatter syntax on all .md files
  * Verify JSON syntax in mcp.json

### [x] Implementation Phase 2: Documentation Files

<!-- parallelizable: true -->

* [x] Step 2.1: Create `docs/architecture.md` with Mermaid C4 diagram
  * Details: .copilot-tracking/details/2026-03-02/civic-demo-scaffolding-details.md (Lines 295-345)
* [x] Step 2.2: Create `docs/data-dictionary.md` with ER diagram and table specs
  * Details: .copilot-tracking/details/2026-03-02/civic-demo-scaffolding-details.md (Lines 347-430)
* [x] Step 2.3: Create `docs/design-document.md` with API and component specs
  * Details: .copilot-tracking/details/2026-03-02/civic-demo-scaffolding-details.md (Lines 432-520)
* [ ] Step 2.4: Commit documentation files
  * Commit message: `docs: add architecture, data dictionary, and design documentation`
* [x] Step 2.5: Validate phase changes
  * Verify Mermaid syntax renders correctly
  * Verify all tables have complete column specifications

### [x] Implementation Phase 3: Operational Scripts

<!-- parallelizable: true -->

* [x] Step 3.1: Create `scripts/Start-Local.ps1` with parameterized startup
  * Details: .copilot-tracking/details/2026-03-02/civic-demo-scaffolding-details.md (Lines 530-590)
* [x] Step 3.2: Create `scripts/Stop-Local.ps1` for process cleanup
  * Details: .copilot-tracking/details/2026-03-02/civic-demo-scaffolding-details.md (Lines 592-620)
* [ ] Step 3.3: Commit operational scripts
  * Commit message: `chore: add local development scripts`
* [x] Step 3.4: Validate phase changes
  * Verify PowerShell syntax with PSScriptAnalyzer (if available)
  * Verify help documentation complete

### [x] Implementation Phase 4: Talk Track

<!-- parallelizable: false -->

* [x] Step 4.1: Create `TALK-TRACK.md` at repository root
  * Details: .copilot-tracking/details/2026-03-02/civic-demo-scaffolding-details.md (Lines 630-780)
* [ ] Step 4.2: Commit talk track
  * Commit message: `docs: add 130-minute talk track for CIVIC demo`
* [x] Step 4.3: Validate phase changes
  * Verify all 130 minutes covered with timestamps
  * Verify two-presenter format throughout
  * Verify checkpoint tags documented

### [x] Implementation Phase 5: Final Validation

<!-- parallelizable: false -->

* [x] Step 5.1: Run full project validation
  * Verify all 13 files exist at correct paths
  * Validate YAML frontmatter on all markdown files
  * Validate JSON syntax in `.vscode/mcp.json`
  * Validate Mermaid diagram syntax
* [x] Step 5.2: Fix minor validation issues
  * Address any syntax errors or missing content
  * Ensure no placeholder text (`{{...}}`) remains
* [x] Step 5.3: Report blocking issues
  * Document any issues requiring additional research
  * Provide user with next steps if critical issues found

## Planning Log

See [civic-demo-scaffolding-log.md](../logs/2026-03-02/civic-demo-scaffolding-log.md) for discrepancy tracking, implementation paths considered, and suggested follow-on work.

## Dependencies

* Git for version control and commits
* VS Code with Copilot extension for implementation
* PowerShell for script validation
* Azure DevOps MCP server (npx azure-devops-mcp) for work item integration

## Success Criteria

* All 13 files created at correct paths — Traces to: Research Task Implementation Requests
* No TODOs or placeholders in any file — Traces to: Research Success Criteria
* Valid YAML frontmatter on all 6 instruction/documentation markdown files — Traces to: Research Success Criteria
* Valid Mermaid syntax in architecture.md, data-dictionary.md, design-document.md — Traces to: Research Success Criteria
* Talk track covers 130 minutes (10:30 AM – 1:50 PM with lunch break) — Traces to: Research Demo Overview
* Two-presenter format (🎙️ HAMMAD + 💻 EMMANUEL) throughout talk track — Traces to: Research Talk Track Specification
* Commit messages follow specified format with checkpoint markers — Traces to: Research Implementation Phases
