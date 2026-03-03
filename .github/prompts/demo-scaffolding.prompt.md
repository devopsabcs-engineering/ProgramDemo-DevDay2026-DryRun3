---
description: "Research all scaffolding files needed for the CIVIC demo from README.md"
agent: Task Researcher
argument-hint: "topic=demo-scaffolding"
---

# Demo Scaffolding Research

Research and document all scaffolding files needed for the **CIVIC** (Citizens' Ideas for a Vibrant and Inclusive Community) demo — a 130-minute live GitHub Copilot demonstration for Ontario Public Sector Developer Day 2026 — DryRun3.

## Inputs

* ${input:topic:demo-scaffolding}: (Optional) Research topic identifier.

## Research Scope

Read `README.md` and `.github/prompts/bootstrap-demo.prompt.md` to produce a comprehensive research document in `.copilot-tracking/research/` covering all scaffolding files. Each section must contain enough detail that `/task-plan` can produce a file-by-file implementation plan without further clarification.

## Critical Context

**Starting state when the demo begins:**

* Only `README.md` and `.github/prompts/bootstrap-demo.prompt.md` exist
* No code, no documentation, no configuration files, no scripts
* **No ADO work items** — no Epic, no Features, no User Stories — all must be created via MCP during Act 1

**Demo details:**

* **Duration**: 130 minutes (10:30 AM – 1:50 PM with lunch break 11:40 AM – 1:00 PM)
* **Presenters**: 🎙️ **Hammad Aslam** (MC, sets stage, engages audience) and 💻 **Emmanuel** (on keyboard, live coding demo)
* **Azure**: Resources pre-deployed in resource group `rg-dev-125`
* **ADO**: Organization `MngEnvMCAP675646`, Project `ProgramDemo-DevDay2026-DryRun3`

## Required Sections in Research Output

### 1. Copilot Instructions Specification

Document all instruction files with `applyTo` patterns and content summaries:

| File | applyTo | Content Summary |
|------|---------|-----------------|
| `.github/copilot-instructions.md` | (global) | Project overview, tech stack, bilingual EN/FR, WCAG 2.2, Ontario DS, commit format `AB#{id}`, branch format `feature/{id}-description` |
| `.github/instructions/ado-workflow.instructions.md` | `**` | Branching, commit, PR conventions for ADO |
| `.github/instructions/java.instructions.md` | `backend/**` | Java 21, Spring Boot 3.x, Spring Data JPA, constructor injection, `@Valid` + Bean Validation, `ResponseEntity`, `ProblemDetail` (RFC 7807), Flyway, H2 local profile with `MODE=MSSQLServer`, package `com.ontario.program` |
| `.github/instructions/react.instructions.md` | `frontend/**` | React 18 + TypeScript + Vite (`server.port: 3000`), functional components with hooks, i18next for EN/FR, Ontario DS CSS classes, WCAG 2.2 Level AA (`aria-*`, semantic HTML, keyboard nav, `lang` attribute), `react-router-dom`, axios |
| `.github/instructions/sql.instructions.md` | `database/**` | Azure SQL target, Flyway versioned migrations `V001__description.sql`, `NVARCHAR` for bilingual text, `IF NOT EXISTS` guards, `INT IDENTITY(1,1)` PKs, `DATETIME2` timestamps, seed data via `INSERT ... WHERE NOT EXISTS` (never MERGE), audit columns |

### 2. MCP Configuration

Full `.vscode/mcp.json` content spec for ADO MCP server:

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

### 3. ADO Work Item Creation Plan

Full hierarchy — no items exist; must be created via MCP in Act 1:

* **Epic**: CIVIC — Citizens' Ideas for a Vibrant and Inclusive Community
  * **Feature**: Infrastructure Setup (pre-deployed in `rg-dev-125`, close immediately)
  * **Feature**: Database Layer — Stories: program_type table, program table, notification table, seed data
  * **Feature**: Backend API — Stories: Spring Boot scaffolding, submit endpoint, list/get endpoints, review endpoint, program-types endpoint
  * **Feature**: Citizen Portal — Stories: React scaffolding, Ontario DS layout, submission form, confirmation page, search page, bilingual EN/FR
  * **Feature**: Ministry Portal — Stories: review dashboard, review detail page, approve/reject actions
  * **Feature**: Quality Assurance — Stories: backend controller tests, frontend component tests, accessibility tests, bilingual verification
  * **Feature**: CI/CD Pipeline — Stories: CI workflow, Dependabot config, secret scanning
  * **Feature**: Live Change Demo — Stories: add program_budget field end-to-end, update tests for new field

### 4. Documentation Specifications

#### Architecture (`docs/architecture.md`)

Mermaid C4/flowchart showing: browsers → React App Service → Java API App Service → Azure SQL; also shows Durable Functions, Logic Apps, AI Foundry.

#### Data Dictionary (`docs/data-dictionary.md`)

Mermaid ER diagram with 3 tables:

**program_type** (simple lookup table):

* `id` (INT PK)
* `type_name` (NVARCHAR(100))
* `type_name_fr` (NVARCHAR(100))

**program**:

* `id` (INT PK)
* `program_name` (NVARCHAR(200))
* `program_description` (NVARCHAR(MAX))
* `program_type_id` (INT FK)
* `status` (NVARCHAR(20) default 'DRAFT')
* `reviewer_comments` (NVARCHAR(MAX))
* `submitted_at` (DATETIME2)
* `reviewed_at` (DATETIME2)
* `created_at` (DATETIME2)
* `updated_at` (DATETIME2)
* `created_by` (NVARCHAR(100))

**notification**:

* `id` (INT PK)
* `program_id` (INT FK)
* `notification_type` (NVARCHAR(50))
* `recipient_email` (NVARCHAR(200))
* `subject` (NVARCHAR(500))
* `body` (NVARCHAR(MAX))
* `sent_at` (DATETIME2)
* `created_at` (DATETIME2)
* `updated_at` (DATETIME2 DEFAULT GETDATE())
* `status` (NVARCHAR(20))

**Seed data** (5 program types EN/FR):

1. Community Services / Services communautaires
2. Health & Wellness / Santé et bien-être
3. Education & Training / Éducation et formation
4. Environment & Conservation / Environnement et conservation
5. Economic Development / Développement économique

Use `INSERT ... WHERE NOT EXISTS` pattern — portable across H2 and Azure SQL (never use MERGE).

#### Design Document (`docs/design-document.md`)

**5 API Endpoints:**

1. `POST /api/programs` — submit a program
2. `GET /api/programs` — list programs
3. `GET /api/programs/{id}` — get single program
4. `PUT /api/programs/{id}/review` — approve/reject
5. `GET /api/program-types` — dropdown values

**Request/Response DTOs with validation, RFC 7807 error handling.**

**Frontend component hierarchy:**

* Layout (Header, Footer, LanguageToggle)
  * Pages: SubmitProgram, SubmitConfirmation, SearchPrograms, ReviewDashboard, ReviewDetail

Vite default port is 5173 — `vite.config.ts` must set `server.port: 3000`.

### 5. Talk Track Specification

Complete 130-minute structure with all acts, cliffhanger, formatting rules.

**Presenters:**

* 🎙️ **HAMMAD** — MC, sets context, asks questions, holds audience conversation
* 💻 **EMMANUEL** — on keyboard, driving all live coding

**Part 1: "Building From Zero" (Minutes 0–70 | ⏰ 10:30 AM – 11:40 AM)**

| Minutes | Time | Act | Role | Content |
|---------|------|-----|------|---------|
| 0–8 | 10:30–10:38 | Opening | 🎙️ HAMMAD | The Problem — show empty repo, Azure portal (`rg-dev-125`), empty ADO board |
| 8–20 | 10:38–10:50 | Act 1: The Architect | 💻 EMMANUEL | Run scaffolding prompts; configure MCP; **create ADO Epic/Features/Stories via MCP** |
| 20–32 | 10:50–11:02 | Act 2: The DBA | 💻 EMMANUEL | 4 Flyway SQL migrations |
| 32–52 | 11:02–11:22 | Act 3: The Backend Developer | 💻 EMMANUEL | Spring Boot scaffolding + 5 API endpoints + live curl tests |
| 52–70 | 11:22–11:40 | Act 4: The Frontend Developer | 💻 EMMANUEL | React + Ontario DS + bilingual CIVIC citizen portal |

**🔥 Cliffhanger (Minute 70 | ⏰ 11:40 AM — LUNCH BREAK)**

Citizen can submit CIVIC programs but Ministry Portal is empty — nobody can approve.

**Part 2: "Closing the Loop" (Minutes 70–130 | ⏰ RESUMING 1:00 PM)**

| Minutes | Time | Act | Role | Content |
|---------|------|-----|------|---------|
| 70–73 | 1:00–1:03 | Recap | 🎙️ HAMMAD | Quick recap, show database with CIVIC submissions |
| 73–87 | 1:03–1:17 | Act 5: Completing the Story | 💻 EMMANUEL | Ministry review dashboard, detail, approve/reject |
| 87–100 | 1:17–1:30 | Act 6: The QA Engineer | 💻 EMMANUEL | Backend controller tests, frontend component tests, accessibility |
| 100–107 | 1:30–1:37 | Act 7: The DevOps Engineer | 💻 EMMANUEL | CI pipeline, Dependabot, secret scanning, GHAS |
| 107–120 | 1:37–1:50 | Act 8: The Full Stack Change | 💻 EMMANUEL | Add `program_budget` field end-to-end |
| 120–130 | 1:50–2:00 | Closing | 🎙️ HAMMAD + 💻 EMMANUEL | Summary stats, ADO board all done, Q&A |

**Talk Track Formatting Requirements:**

* Two-presenter format with emoji indicators
* Scripted presenter dialogue in blockquotes with presenter indicator (e.g., `**🎙️ HAMMAD:** > "..."`)
* `Demo actions:` bullet lists with minute markers AND actual times (e.g., `(min 5 | ⏰ 10:35 AM)`)
* `Key beat (EMMANUEL):` and `Audience engagement point (min X | ⏰ time):` callouts
* Timestamps in section headers: `(Minutes X–Y | ⏰ HH:MM – HH:MM AM/PM)`
* Tagged commit checkpoints (v0.1.0 through v1.0.0) with fast-forward recovery strategy — include both minute and actual time
* Risk mitigation table (Copilot errors, Azure failures, time overruns, connectivity)
* Key numbers summary table at the end

### 6. Local Development Scripts

**`scripts/Start-Local.ps1`:**

* Parameters: `-SkipBuild`, `-BackendOnly`, `-FrontendOnly`, `-UseAzureSql`
* Backend port 8080, frontend port 3000
* `param()` block with help comments

**`scripts/Stop-Local.ps1`:**

* Kill processes on ports 8080 and 3000

### 7. `.gitignore` Specification

Combined Java + Node + IDE + OS ignore rules:

* Java: `target/`, `*.class`, `*.jar`, `*.war`
* Node: `node_modules/`, `dist/`, `.env`
* IDE: `.idea/`, `*.iml`, `.vscode/` (except `mcp.json`)
* OS: `.DS_Store`, `Thumbs.db`

## Out of Scope

* Document upload functionality (README.md marks as optional)
* `.devcontainer/devcontainer.json`
* Azure Durable Functions orchestration code
* Logic Apps connector configuration
* AI Foundry integration code
* CD deployment workflow

## Success Criteria

The research document must be comprehensive enough that `/task-plan` can produce a complete file-by-file implementation plan without requiring further clarification. All technical details, formatting requirements, and constraints must be documented.

---

Proceed with researching and documenting all scaffolding requirements in `.copilot-tracking/research/`.
