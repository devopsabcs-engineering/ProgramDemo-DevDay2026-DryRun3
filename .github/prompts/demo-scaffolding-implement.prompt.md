---
description: "Execute the CIVIC demo scaffolding implementation plan with phase-stop checkpoints"
agent: Task Implementor
argument-hint: "[phaseStop={true|false}]"
---

# Demo Scaffolding Implementation

Execute the implementation plan for all **CIVIC** demo scaffolding files with phase-stop for user review and commit at each checkpoint.

## Inputs

* ${input:phaseStop:true}: (Optional) Pause after each phase for user review and commit.

## Implementation Scope

Locate the implementation plan in `.copilot-tracking/plans/` and execute all 4 phases to create the 13 scaffolding files for the CIVIC (Citizens' Ideas for a Vibrant and Inclusive Community) demo.

## Demo Context

* **Application**: CIVIC — Citizens' Ideas for a Vibrant and Inclusive Community
* **Presenters**: 🎙️ **Hammad Aslam** (MC) and 💻 **Emmanuel** (live coding)
* **Duration**: 130 minutes (10:30 AM – 1:50 PM with lunch break 11:40 AM – 1:00 PM)
* **Azure**: Resources pre-deployed in `rg-dev-125`
* **ADO**: Organization `MngEnvMCAP675646`, Project `ProgramDemo-DevDay2026-DryRun3`

## Quality Gates

Validate each file against these requirements before marking phase complete:

### All Markdown Files

* [ ] Valid YAML frontmatter with `---` delimiters
* [ ] No TODOs, placeholders, or incomplete sections
* [ ] Proper markdown formatting

### Instruction Files (`.github/instructions/*.instructions.md`)

* [ ] `description` field in frontmatter
* [ ] `applyTo` field with correct glob pattern
* [ ] All content is actionable guidance, not placeholders

### Documentation Files (`docs/*.md`)

* [ ] Valid Mermaid syntax in all diagrams
* [ ] All technical details match the research document
* [ ] Complete content — no missing sections or "TODO" markers

### Talk Track (`TALK-TRACK.md`)

* [ ] Located at repository root (not in `docs/`)
* [ ] Covers all 130 minutes with no gaps
* [ ] Two-presenter format: 🎙️ **HAMMAD** and 💻 **EMMANUEL**
* [ ] All section headers include timestamps: `(Minutes X–Y | ⏰ HH:MM – HH:MM AM/PM)`
* [ ] Demo actions include both minute markers AND actual times
* [ ] Act 1 includes ADO work item creation via MCP (no items exist beforehand)
* [ ] Tagged commit checkpoints table includes both minute and actual time
* [ ] Risk mitigation table present
* [ ] Key numbers summary table at the end

### PowerShell Scripts

* [ ] `param()` blocks with parameter definitions
* [ ] Help comments (`.SYNOPSIS`, `.DESCRIPTION`, `.PARAMETER`)
* [ ] `Start-Local.ps1` supports: `-SkipBuild`, `-BackendOnly`, `-FrontendOnly`, `-UseAzureSql`
* [ ] Backend port 8080, frontend port 3000
* [ ] `Stop-Local.ps1` kills processes on both ports

### .gitignore

* [ ] Java artifacts: `target/`, `*.class`, `*.jar`, `*.war`
* [ ] Node artifacts: `node_modules/`, `dist/`, `.env`
* [ ] IDE artifacts: `.idea/`, `*.iml`
* [ ] OS artifacts: `.DS_Store`, `Thumbs.db`
* [ ] Preserves `.vscode/mcp.json`

## Phase Execution

### Phase 1: Configuration Files (7 files)

Create in order:

1. `.gitignore`
2. `.vscode/mcp.json`
3. `.github/copilot-instructions.md`
4. `.github/instructions/ado-workflow.instructions.md`
5. `.github/instructions/java.instructions.md`
6. `.github/instructions/react.instructions.md`
7. `.github/instructions/sql.instructions.md`

**Commit message**: `docs: add Copilot instructions and MCP configuration`

**⏸️ PHASE STOP**: Pause for user review if `phaseStop=true`

### Phase 2: Documentation Files (3 files)

Create in order:

1. `docs/architecture.md` — Mermaid C4/flowchart
2. `docs/data-dictionary.md` — Mermaid ER diagram, table specs, seed data
3. `docs/design-document.md` — API endpoints, DTOs, component hierarchy

**Commit message**: `docs: add architecture, data dictionary, and design documentation`

**⏸️ PHASE STOP**: Pause for user review if `phaseStop=true`

### Phase 3: Operational Files (2 scripts)

Create in order:

1. `scripts/Start-Local.ps1`
2. `scripts/Stop-Local.ps1`

**Commit message**: `chore: add local development scripts`

**⏸️ PHASE STOP**: Pause for user review if `phaseStop=true`

### Phase 4: Talk Track (1 file)

Create:

1. `TALK-TRACK.md` at repository root

**Commit message**: `docs: add 130-minute talk track for CIVIC demo`

**⏸️ PHASE STOP**: Pause for user review if `phaseStop=true`

## Technical Requirements

### MCP Configuration (`.vscode/mcp.json`)

```json
{
  "inputs": [],
  "servers": {
    "azure-devops": {
      "command": "npx",
      "args": ["-y", "azure-devops-mcp", "--organization", "MngEnvMCAP675646", "--project", "ProgramDemo-DevDay2026-DryRun3"]
    }
  }
}
```

### Database Details for Data Dictionary

**program_type** (lookup table):

* `id` INT IDENTITY(1,1) PRIMARY KEY
* `type_name` NVARCHAR(100)
* `type_name_fr` NVARCHAR(100)

**program**:

* `id` INT IDENTITY(1,1) PRIMARY KEY
* `program_name` NVARCHAR(200)
* `program_description` NVARCHAR(MAX)
* `program_type_id` INT FOREIGN KEY
* `status` NVARCHAR(20) DEFAULT 'DRAFT'
* `reviewer_comments` NVARCHAR(MAX)
* `submitted_at` DATETIME2
* `reviewed_at` DATETIME2
* `created_at` DATETIME2
* `updated_at` DATETIME2
* `created_by` NVARCHAR(100)

**notification**:

* `id` INT IDENTITY(1,1) PRIMARY KEY
* `program_id` INT FOREIGN KEY
* `notification_type` NVARCHAR(50)
* `recipient_email` NVARCHAR(200)
* `subject` NVARCHAR(500)
* `body` NVARCHAR(MAX)
* `sent_at` DATETIME2
* `created_at` DATETIME2
* `updated_at` DATETIME2 DEFAULT GETDATE()
* `status` NVARCHAR(20)

**Seed data** (5 program types):

1. Community Services / Services communautaires
2. Health & Wellness / Santé et bien-être
3. Education & Training / Éducation et formation
4. Environment & Conservation / Environnement et conservation
5. Economic Development / Développement économique

Use `INSERT ... WHERE NOT EXISTS` pattern (never MERGE).

### API Endpoints for Design Document

1. `POST /api/programs` — submit a program
2. `GET /api/programs` — list programs
3. `GET /api/programs/{id}` — get single program
4. `PUT /api/programs/{id}/review` — approve/reject
5. `GET /api/program-types` — dropdown values

### ADO Work Items for Talk Track Act 1

**Epic**: CIVIC — Citizens' Ideas for a Vibrant and Inclusive Community

**Features** (with Stories):

* Infrastructure Setup — close immediately (pre-deployed in `rg-dev-125`)
* Database Layer — program_type, program, notification, seed data
* Backend API — scaffolding, submit, list/get, review, program-types
* Citizen Portal — scaffolding, layout, form, confirmation, search, bilingual
* Ministry Portal — dashboard, detail, approve/reject
* Quality Assurance — backend tests, frontend tests, accessibility, bilingual verification
* CI/CD Pipeline — workflow, Dependabot, secret scanning
* Live Change Demo — add program_budget, update tests

## Out of Scope

Do not implement:

* Document upload functionality
* `.devcontainer/devcontainer.json`
* Azure Durable Functions orchestration code
* Logic Apps connector configuration
* AI Foundry integration code
* CD deployment workflow

## Success Criteria

All 13 files created and validated against quality gates:

* 7 configuration files (Phase 1)
* 3 documentation files (Phase 2)
* 2 operational scripts (Phase 3)
* 1 talk track file (Phase 4)

---

Proceed with implementing each phase, pausing for user review at each checkpoint if `phaseStop=true`.
