<!-- markdownlint-disable-file -->
# Planning Log: CIVIC Demo Scaffolding

## Discrepancy Log

Gaps and differences identified between research findings and the implementation plan.

### Unaddressed Research Items

* DR-01: DevContainer configuration mentioned as out of scope
  * Source: Research document Section 7 (Lines 940-950)
  * Reason: Explicitly excluded per research scope definition
  * Impact: Low — not required for demo

* DR-02: Azure Durable Functions orchestration code excluded
  * Source: Research document Section 7 (Lines 940-950)
  * Reason: Marked as future integration in architecture diagram
  * Impact: Low — shown as dashed lines in architecture, not implemented

* DR-03: Logic Apps connector configuration excluded
  * Source: Research document Section 7 (Lines 940-950)
  * Reason: Out of scope per research definition
  * Impact: Low — notification system deferred

* DR-04: AI Foundry integration code excluded
  * Source: Research document Section 7 (Lines 940-950)
  * Reason: Out of scope per research definition
  * Impact: Low — mini model integration deferred

* DR-05: CD deployment workflow excluded (CI only)
  * Source: Research document Section 7 (Lines 940-950)
  * Reason: Scope limited to CI configuration
  * Impact: Medium — deployment automation deferred to post-demo

### Plan Deviations from Research

* DD-01: No deviations identified
  * Research recommends: N/A
  * Plan implements: All 13 files as specified in research
  * Rationale: Research document is complete and detailed

## Implementation Paths Considered

### Selected: Direct File Creation

* Approach: Create all 13 scaffolding files directly with full content specification
* Rationale: Research provides complete file specifications; no ambiguity to resolve
* Evidence: Research document Lines 95-870 contain full content for all files

### IP-01: Templated Generation with Prompts

* Approach: Use bootstrap-demo.prompt.md to generate files via Copilot prompts during demo
* Trade-offs: More realistic demo flow but less predictable for planning; requires prompt testing
* Rejection rationale: Planning focuses on final file content; prompt-based generation is demo execution concern

### IP-02: Phased Scaffolding with Validation Gates

* Approach: Create files phase-by-phase with full validation between phases
* Trade-offs: More rigorous validation but longer implementation time
* Rejection rationale: Phases already designed for parallel execution; sequential gates add unnecessary overhead

## Suggested Follow-On Work

Items identified during planning that fall outside current scope.

* WI-01: Application Code Implementation — Implement actual backend/frontend code per design-document.md (High)
  * Source: Research document marks application code as out of scope
  * Dependency: Scaffolding complete (this plan)

* WI-02: ADO Work Item Creation — Create Epic, Features, and Stories via MCP during Act 1 (High)
  * Source: Research document Section 6 (Lines 880-940) defines work item hierarchy
  * Dependency: `.vscode/mcp.json` configured (Phase 1 Step 1.2)

* WI-03: CD Pipeline Configuration — GitHub Actions deployment workflow (Medium)
  * Source: Research document Section 7 excludes CD
  * Dependency: CI pipeline complete (Act 7 in demo)

* WI-04: Azure Integration Implementation — Durable Functions, Logic Apps, AI Foundry (Low)
  * Source: Research document Section 7 marks as out of scope
  * Dependency: Core application complete

* WI-05: MyOntario Authentication — Stretch goal per README.md (Low)
  * Source: Research document Section 7 marks as stretch goal
  * Dependency: Full application working

* WI-06: Confirmation Letter Generation — Stretch goal per README.md (Low)
  * Source: Research document Section 7 marks as stretch goal
  * Dependency: Notification system complete
