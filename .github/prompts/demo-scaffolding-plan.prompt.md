---
description: "Create a 4-phase implementation plan for CIVIC demo scaffolding files"
agent: Task Planner
argument-hint: "[chat={true|false}]"
---

# Demo Scaffolding Implementation Plan

Create a 4-phase implementation plan for all **CIVIC** demo scaffolding files based on the research document.

## Inputs

* ${input:chat:true}: (Optional) Enable interactive clarification mode.

## Planning Scope

Locate the research document in `.copilot-tracking/research/` and create a phased implementation plan for all 13 scaffolding files required for the CIVIC (Citizens' Ideas for a Vibrant and Inclusive Community) demo.

## Demo Context

* **Presenters**: 🎙️ **Hammad Aslam** (MC) and 💻 **Emmanuel** (live coding)
* **Duration**: 130 minutes (10:30 AM – 1:50 PM with lunch break)
* **Azure**: Resources pre-deployed in `rg-dev-125`
* **ADO**: Organization `MngEnvMCAP675646`, Project `ProgramDemo-DevDay2026-DryRun3`

## Implementation Phases

### Phase 1: Configuration Files (7 files, commit checkpoint)

Create all configuration and instruction files.

| # | File | Purpose |
|---|------|---------|
| 1 | `.gitignore` | Java + Node + IDE + OS ignore rules |
| 2 | `.vscode/mcp.json` | ADO MCP server configuration |
| 3 | `.github/copilot-instructions.md` | Global Copilot context |
| 4 | `.github/instructions/ado-workflow.instructions.md` | ADO branching/commit conventions |
| 5 | `.github/instructions/java.instructions.md` | Java/Spring Boot standards |
| 6 | `.github/instructions/react.instructions.md` | React/TypeScript standards |
| 7 | `.github/instructions/sql.instructions.md` | SQL/Flyway standards |

**Commit checkpoint**: `docs: add Copilot instructions and MCP configuration`

### Phase 2: Documentation Files (3 files, commit checkpoint)

Create technical documentation with Mermaid diagrams.

| # | File | Purpose |
|---|------|---------|
| 1 | `docs/architecture.md` | Mermaid C4/flowchart diagram |
| 2 | `docs/data-dictionary.md` | Mermaid ER diagram, table specs, seed data |
| 3 | `docs/design-document.md` | API endpoints, DTOs, component hierarchy |

**Commit checkpoint**: `docs: add architecture, data dictionary, and design documentation`

### Phase 3: Operational Files (2 scripts, commit checkpoint)

Create PowerShell helper scripts.

| # | File | Purpose |
|---|------|---------|
| 1 | `scripts/Start-Local.ps1` | Start local dev with `-SkipBuild`, `-BackendOnly`, `-FrontendOnly`, `-UseAzureSql` |
| 2 | `scripts/Stop-Local.ps1` | Kill processes on ports 8080 and 3000 |

**Commit checkpoint**: `chore: add local development scripts`

### Phase 4: Talk Track (1 file, commit checkpoint)

Create the full 130-minute demo script.

| # | File | Purpose |
|---|------|---------|
| 1 | `TALK-TRACK.md` | Complete minute-by-minute demo script at repository root |

**Commit checkpoint**: `docs: add 130-minute talk track for CIVIC demo`

## Constraints

Encode these constraints in the implementation plan:

### File Quality

* No TODOs or placeholders — all content must be complete
* Valid YAML frontmatter on all markdown files
* `description` and `applyTo` fields required on all instruction files

### Technical Accuracy

* ADO work item creation happens in Act 1 via MCP — no items exist beforehand
* Reference Azure resource group `rg-dev-125`
* Reference ADO org `MngEnvMCAP675646` and project `ProgramDemo-DevDay2026-DryRun3`
* H2 local profile must use `MODE=MSSQLServer` for Azure SQL compatibility
* Vite config must set `server.port: 3000`

### Talk Track Requirements

* Two-presenter format: 🎙️ **HAMMAD** (MC) and 💻 **EMMANUEL** (keyboard)
* All section headers include timestamps: `(Minutes X–Y | ⏰ HH:MM – HH:MM AM/PM)`
* Demo actions include both minute markers AND actual times
* Tagged commit checkpoints include both minute and actual time in table
* Must cover all 130 minutes with no gaps
* Include risk mitigation table and key numbers summary

### Mermaid Diagrams

* Architecture: C4/flowchart showing browsers → React → Java API → Azure SQL
* Data Dictionary: ER diagram with all 3 tables and relationships
* All diagrams must use valid Mermaid syntax

### PowerShell Scripts

* Use `param()` blocks with help comments
* Backend port 8080, frontend port 3000
* `Start-Local.ps1` parameters: `-SkipBuild`, `-BackendOnly`, `-FrontendOnly`, `-UseAzureSql`

### .gitignore Coverage

* Java: `target/`, `*.class`, `*.jar`, `*.war`
* Node: `node_modules/`, `dist/`, `.env`
* IDE: `.idea/`, `*.iml`, `.vscode/` (except specific files like `mcp.json`)
* OS: `.DS_Store`, `Thumbs.db`

## Out of Scope

Do not include in the plan:

* Document upload functionality
* `.devcontainer/devcontainer.json`
* Azure Durable Functions orchestration code
* Logic Apps connector configuration
* AI Foundry integration code
* CD deployment workflow

## Success Criteria

The implementation plan must:

1. Cover all 13 scaffolding files across 4 phases
2. Include commit checkpoints for each phase
3. Encode all constraints for the implementor
4. Be executable without further clarification

---

Proceed with creating the implementation plan in `.copilot-tracking/plans/`.
