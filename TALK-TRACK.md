---
title: CIVIC Demo Talk Track
description: 130-minute live demonstration script for Ontario Public Sector Developer Day 2026
---

## Introduction

A 130-minute live GitHub Copilot demonstration for Ontario Public Sector Developer Day 2026.

## Presenter Key

| Emoji | Presenter      | Role                                                             |
|-------|----------------|------------------------------------------------------------------|
| 🎙️    | **HAMMAD**     | MC — sets context, asks questions, holds audience conversation   |
| 💻    | **EMMANUEL**   | Keyboard — drives all live coding and demos                      |

## Schedule Overview

| Part                          | Duration    | Time                    |
|-------------------------------|-------------|-------------------------|
| Part 1: Building From Zero    | 70 minutes  | 10:30 AM – 11:40 AM     |
| Lunch Break                   | 80 minutes  | 11:40 AM – 1:00 PM      |
| Part 2: Closing the Loop      | 60 minutes  | 1:00 PM – 2:00 PM       |
| **Total Demo Time**           | 130 minutes |                         |

---

## Part 1: Building From Zero

**Duration:** Minutes 0–70 | ⏰ 10:30 AM – 11:40 AM

## Opening (Minutes 0–8 | ⏰ 10:30 – 10:38 AM)

**🎙️ HAMMAD:**

> "Good morning everyone! Welcome to Developer Day 2026. I'm Hammad, and this is Emmanuel. Over the next two hours, we're going to do something that might seem impossible — build a complete, production-ready government application from scratch using GitHub Copilot."

**(min 1 | ⏰ 10:31 AM)** Show empty repository

**🎙️ HAMMAD:**

> "Let me show you what we're starting with. Emmanuel, can you open the repo?"

**💻 EMMANUEL** opens VS Code showing:

* `README.md` — business problem description
* `.github/prompts/bootstrap-demo.prompt.md` — scaffolding prompts
* **Nothing else** — no code, no config, no documentation

**🎙️ HAMMAD:**

> "That's it. Two files. No database, no API, no frontend. By lunch, we'll have a working citizen portal. By end of day, we'll have the complete Ministry approval workflow."

**(min 4 | ⏰ 10:34 AM)** Show Azure portal

**🎙️ HAMMAD:**

> "Our Azure infrastructure is pre-deployed in resource group `rg-dev-125`. We've got App Services ready to host our application, and an Azure SQL Database waiting for our schema."

**(min 6 | ⏰ 10:36 AM)** Show empty ADO board

**🎙️ HAMMAD:**

> "And here's our Azure DevOps board. Notice anything? It's completely empty. No Epic, no Features, no Stories. We're going to create all of our work items live using Copilot's MCP integration."

**Key beat:**

> "We're building a complete application from scratch in 130 minutes. Let's go."

---

## Act 1: The Architect (Minutes 8–20 | ⏰ 10:38 – 10:50 AM)

**🎙️ HAMMAD:**

> "Every project starts with architecture. Emmanuel, let's get our scaffolding in place."

### Step 1: Generate Configuration Files

**(min 8 | ⏰ 10:38 AM)** Run scaffolding prompt

**💻 EMMANUEL:**

* Opens `bootstrap-demo.prompt.md`
* Runs the prompt to generate configuration files
* Shows generated files appearing:
  * `.gitignore`
  * `.vscode/mcp.json`
  * `.github/copilot-instructions.md`
  * `.github/instructions/` (4 files)

**🎙️ HAMMAD:**

> "Look at that — Copilot just set up our entire development environment. We've got language-specific instructions for Java, React, and SQL, plus our MCP configuration for Azure DevOps integration."

### Step 2: Generate Documentation

**(min 12 | ⏰ 10:42 AM)** Generate documentation files

**💻 EMMANUEL:**

* Generates documentation files:
  * `docs/architecture.md` — with Mermaid diagram
  * `docs/data-dictionary.md` — with ER diagram
  * `docs/design-document.md` — with API specs

**🎙️ HAMMAD:**

> "Emmanuel, can you show the architecture diagram? This is a complete system overview — React frontend, Spring Boot API, Azure SQL database, and our future integrations with Durable Functions and AI Foundry."

### Step 3: Create ADO Work Items via MCP

**(min 15 | ⏰ 10:45 AM)** Create Epic via MCP

**💻 EMMANUEL:**

* Uses GitHub Copilot to call ADO MCP
* Creates Epic: "CIVIC — Citizens' Ideas for a Vibrant and Inclusive Community"

**🎙️ HAMMAD:**

> "This is the magic of MCP — Model Context Protocol. Copilot is directly creating work items in Azure DevOps. No switching tabs, no copy-paste."

**(min 18 | ⏰ 10:48 AM)** Create Features and Stories

**💻 EMMANUEL:**

* Creates Features:
  * Feature 1: Infrastructure Setup
  * Feature 2: Database Layer
  * Feature 3: Backend API
  * Feature 4: Citizen Portal
  * Feature 5: Ministry Portal
  * Feature 6: Quality Assurance
  * Feature 7: CI/CD Pipeline
* Creates initial Stories under each Feature

**🎙️ HAMMAD:**

> "Look at our board now — we've gone from empty to a fully planned project in minutes. Let's commit this checkpoint."

**(min 20 | ⏰ 10:50 AM)** **CHECKPOINT: Tag `v0.1.0`**

**💻 EMMANUEL:**

```bash
git add .
git commit -m "docs: add Copilot instructions and MCP configuration"
git tag v0.1.0
```

---

## Act 2: The DBA (Minutes 20–32 | ⏰ 10:50 – 11:02 AM)

**🎙️ HAMMAD:**

> "Now let's put on our DBA hat. We need a database schema that supports bilingual content and audit trails."

### Step 1: Create Program Type Table

**(min 20 | ⏰ 10:50 AM)** Create first migration

**💻 EMMANUEL:**

* Creates `V001__create_program_type.sql`
* Shows Flyway naming convention
* Highlights NVARCHAR for bilingual support

```sql
CREATE TABLE program_type (
    id INT IDENTITY(1,1) PRIMARY KEY,
    type_name NVARCHAR(100) NOT NULL,
    type_name_fr NVARCHAR(100) NOT NULL
);
```

**🎙️ HAMMAD:**

> "Notice we're using NVARCHAR for Unicode support — essential for French characters like é, è, ê. And IDENTITY for auto-increment primary keys."

### Step 2: Create Program Table

**(min 24 | ⏰ 10:54 AM)** Create program table

**💻 EMMANUEL:**

* Creates `V002__create_program.sql`
* Shows audit columns: created_at, updated_at, created_by
* Shows status workflow: DRAFT → SUBMITTED → APPROVED/REJECTED

**🎙️ HAMMAD:**

> "Every transactional table gets audit columns. We track when records are created, modified, and by whom. The status column manages our approval workflow."

### Step 3: Create Notification Table

**(min 27 | ⏰ 10:57 AM)** Create notification table

**💻 EMMANUEL:**

* Creates `V003__create_notification.sql`
* Shows foreign key to program table
* Shows notification status: PENDING, SENT, FAILED

### Step 4: Seed Program Types

**(min 30 | ⏰ 11:00 AM)** Create seed data

**💻 EMMANUEL:**

* Creates `V004__seed_program_types.sql`
* Uses INSERT...WHERE NOT EXISTS pattern

**🎙️ HAMMAD:**

> "Important: we're using INSERT WHERE NOT EXISTS, not MERGE. MERGE isn't portable to H2 database, which we use for local development."

**(min 32 | ⏰ 11:02 AM)** **CHECKPOINT: Tag `v0.2.0`**

**💻 EMMANUEL:**

```bash
git add database/
git commit -m "feat(db): add Flyway migrations for program tables AB#XXX"
git tag v0.2.0
```

---

## Act 3: The Backend Developer (Minutes 32–52 | ⏰ 11:02 – 11:22 AM)

**🎙️ HAMMAD:**

> "Database is ready. Time to build our API. Emmanuel, let's scaffold our Spring Boot application."

### Step 1: Generate Spring Boot Project

**(min 32 | ⏰ 11:02 AM)** Create Spring Boot structure

**💻 EMMANUEL:**

* Generates Spring Boot project structure
* Shows package organization:
  * `com.ontario.program.controller`
  * `com.ontario.program.service`
  * `com.ontario.program.repository`
  * `com.ontario.program.entity`
  * `com.ontario.program.dto`

**🎙️ HAMMAD:**

> "Copilot follows our java.instructions.md file — Java 21 features, constructor injection, records for DTOs."

### Step 2: Create Entities and Repositories

**(min 36 | ⏰ 11:06 AM)** Generate entities

**💻 EMMANUEL:**

* Creates `Program.java` entity
* Creates `ProgramType.java` entity
* Creates `ProgramRepository.java`
* Creates `ProgramTypeRepository.java`

**🎙️ HAMMAD:**

> "Notice the @PrePersist annotation — automatically sets created_at and updated_at timestamps."

### Step 3: Create POST Endpoint

**(min 40 | ⏰ 11:10 AM)** Create submission endpoint

**💻 EMMANUEL:**

* Creates `ProgramCreateRequest` record with validation
* Creates `ProgramResponse` record
* Creates `ProgramController` with POST /api/programs

**🎙️ HAMMAD:**

> "Records with Bean Validation — @NotBlank, @Size, @Email. Clean, immutable DTOs."

### Step 4: Create GET Endpoints

**(min 44 | ⏰ 11:14 AM)** Create list and detail endpoints

**💻 EMMANUEL:**

* Adds GET /api/programs with pagination
* Adds GET /api/programs/{id}
* Adds GET /api/program-types

### Step 5: Create Review Endpoint

**(min 48 | ⏰ 11:18 AM)** Create review endpoint

**💻 EMMANUEL:**

* Creates `ReviewRequest` record with @Pattern constraint
* Adds PUT /api/programs/{id}/review
* Shows RFC 7807 ProblemDetail for errors

### Step 6: Live API Testing

**(min 50 | ⏰ 11:20 AM)** Demo API with curl

**💻 EMMANUEL:**

* Starts Spring Boot application
* Runs curl commands:

```bash
# Get program types
curl http://localhost:8080/api/program-types

# Submit a program
curl -X POST http://localhost:8080/api/programs \
  -H "Content-Type: application/json" \
  -d '{"programName":"Test","programDescription":"Test desc","programTypeId":1}'

# List programs
curl http://localhost:8080/api/programs
```

**🎙️ HAMMAD:**

> "Look at that — our API is live and working. Let's checkpoint before we move to the frontend."

**(min 52 | ⏰ 11:22 AM)** **CHECKPOINT: Tag `v0.3.0`**

**💻 EMMANUEL:**

```bash
git add backend/
git commit -m "feat(api): implement program submission and review endpoints AB#XXX"
git tag v0.3.0
```

---

## Act 4: The Frontend Developer (Minutes 52–70 | ⏰ 11:22 – 11:40 AM)

**🎙️ HAMMAD:**

> "Backend complete. Now let's build the citizen-facing portal."

### Step 1: Generate React Project

**(min 52 | ⏰ 11:22 AM)** Create React + Vite project

**💻 EMMANUEL:**

* Generates React project with Vite
* Shows vite.config.ts with proxy to port 8080
* Installs dependencies

**🎙️ HAMMAD:**

> "Vite gives us instant hot module replacement. The proxy configuration means we don't need CORS — /api requests go straight to our backend."

### Step 2: Create Layout Components

**(min 56 | ⏰ 11:26 AM)** Build Ontario DS layout

**💻 EMMANUEL:**

* Creates `Layout.tsx` with Ontario header and footer
* Creates `Header.tsx` with Ontario logo and LanguageToggle
* Creates `Footer.tsx` with Ontario footer

**🎙️ HAMMAD:**

> "Ontario Design System CSS classes — ontario-header, ontario-footer. These match the official Ontario.ca website."

### Step 3: Create Program Submission Form

**(min 60 | ⏰ 11:30 AM)** Build submission form

**💻 EMMANUEL:**

* Creates `SubmitProgram.tsx` page
* Creates `ProgramForm.tsx` component
* Adds form validation
* Shows ARIA labels for accessibility

**🎙️ HAMMAD:**

> "Every form input has an associated label and ARIA attributes. WCAG 2.2 Level AA compliance is built in, not bolted on."

### Step 4: Add i18next Translations

**(min 64 | ⏰ 11:34 AM)** Add bilingual support

**💻 EMMANUEL:**

* Creates `public/locales/en/translation.json`
* Creates `public/locales/fr/translation.json`
* Adds `LanguageToggle.tsx` component
* Shows language switching in action

**🎙️ HAMMAD:**

> "Click the language toggle — everything switches to French instantly. No page reload, no API call."

### Step 5: Live Form Submission

**(min 68 | ⏰ 11:38 AM)** Demo the citizen portal

**💻 EMMANUEL:**

* Opens browser to `http://localhost:3000`
* Fills out form in English
* Submits program
* Shows success confirmation
* Toggles to French
* Fills out form in French
* Submits another program

**Audience engagement point (min 69 | ⏰ 11:39 AM):**

**🎙️ HAMMAD:**

> "What do you think — pretty good for 70 minutes of work? We've got a database, a complete REST API, and a bilingual, accessible frontend. But wait..."

---

## 🔥 Cliffhanger (Minute 70 | ⏰ 11:40 AM)

**(min 70 | ⏰ 11:40 AM)** **CHECKPOINT: Tag `v0.4.0`**

**💻 EMMANUEL:**

```bash
git add frontend/
git commit -m "feat(ui): implement citizen portal with bilingual support AB#XXX"
git tag v0.4.0
```

**🎙️ HAMMAD:**

> "Citizens can submit CIVIC programs... but look at the Ministry Portal."

**💻 EMMANUEL** navigates to /review — shows empty or "Coming Soon" page.

**🎙️ HAMMAD:**

> "It's empty! Nobody can approve anything. We've got unstarted stories on our ADO board. The citizen portal is done, but our ministry staff can't do their jobs."

(Pause for effect)

**🎙️ HAMMAD:**

> "That's our cliffhanger. See you after lunch to close the loop. Enjoy your meal — we've got more building to do!"

---

## Lunch Break

**11:40 AM – 1:00 PM (80 minutes)**

---

## Part 2: Closing the Loop

**Duration:** Minutes 70–130 | ⏰ 1:00 PM – 2:00 PM

### Recap (Minutes 70–73 | ⏰ 1:00 – 1:03 PM)

**🎙️ HAMMAD:**

> "Welcome back! I hope everyone enjoyed lunch. Let's recap what we built this morning."

**💻 EMMANUEL** shows:

1. Database with citizen submissions
2. API endpoints working
3. Citizen portal functional
4. ADO board with remaining stories

**🎙️ HAMMAD:**

> "Citizens can submit programs. But Ministry staff are stuck — they can see submissions in the database, but they have no way to approve or reject them. Let's fix that."

---

## Act 5: Completing the Story (Minutes 73–87 | ⏰ 1:03 – 1:17 PM)

**🎙️ HAMMAD:**

> "Time to build the Ministry portal."

### Step 1: Create Review Dashboard

**(min 73 | ⏰ 1:03 PM)** Build dashboard page

**💻 EMMANUEL:**

* Creates `ReviewDashboard.tsx`
* Shows table of SUBMITTED programs
* Adds status badges
* Shows clickable rows

### Step 2: Create Review Detail Page

**(min 78 | ⏰ 1:08 PM)** Build detail page

**💻 EMMANUEL:**

* Creates `ReviewDetail.tsx`
* Shows full program details
* Adds reviewer comments textarea
* Adds Approve/Reject buttons

### Step 3: Implement Approve/Reject Actions

**(min 83 | ⏰ 1:13 PM)** Wire up actions

**💻 EMMANUEL:**

* Connects to PUT /api/programs/{id}/review
* Shows confirmation modal
* Demonstrates approval flow
* Demonstrates rejection flow

**🎙️ HAMMAD:**

> "Full circle — citizens submit, ministry reviews. Let's checkpoint."

**(min 87 | ⏰ 1:17 PM)** **CHECKPOINT: Tag `v0.5.0`**

**💻 EMMANUEL:**

```bash
git add frontend/
git commit -m "feat(ui): implement ministry review dashboard AB#XXX"
git tag v0.5.0
```

---

## Act 6: The QA Engineer (Minutes 87–100 | ⏰ 1:17 – 1:30 PM)

**🎙️ HAMMAD:**

> "We've got features. Now we need confidence. Emmanuel, let's add tests."

### Step 1: Backend Controller Tests

**(min 87 | ⏰ 1:17 PM)** Add API tests

**💻 EMMANUEL:**

* Creates `ProgramControllerTest.java`
* Uses `@WebMvcTest`
* Tests POST, GET, PUT endpoints
* Shows MockMvc assertions

### Step 2: Frontend Component Tests

**(min 92 | ⏰ 1:22 PM)** Add React tests

**💻 EMMANUEL:**

* Creates `ProgramForm.test.tsx`
* Uses React Testing Library
* Tests form validation
* Tests submission flow

### Step 3: Accessibility Tests

**(min 96 | ⏰ 1:26 PM)** Add a11y tests

**💻 EMMANUEL:**

* Adds axe-core accessibility tests
* Shows passing WCAG 2.2 checks
* Demonstrates keyboard navigation

**🎙️ HAMMAD:**

> "Accessibility isn't optional for government applications. These tests ensure every citizen can use our system."

**(min 100 | ⏰ 1:30 PM)** **CHECKPOINT: Tag `v0.6.0`**

**💻 EMMANUEL:**

```bash
git add .
git commit -m "test: add backend and frontend test suites AB#XXX"
git tag v0.6.0
```

---

## Act 7: The DevOps Engineer (Minutes 100–107 | ⏰ 1:30 – 1:37 PM)

**🎙️ HAMMAD:**

> "Code is tested. Let's automate everything with CI/CD."

### Step 1: Create GitHub Actions Workflow

**(min 100 | ⏰ 1:30 PM)** Create CI pipeline

**💻 EMMANUEL:**

* Creates `.github/workflows/ci.yml`
* Shows build steps for backend and frontend
* Shows test execution
* Shows artifact publishing

### Step 2: Configure Dependabot

**(min 103 | ⏰ 1:33 PM)** Set up dependency updates

**💻 EMMANUEL:**

* Creates `.github/dependabot.yml`
* Configures Maven and npm ecosystems
* Shows weekly update schedule

### Step 3: Enable Secret Scanning

**(min 105 | ⏰ 1:35 PM)** Configure GHAS
**💻 EMMANUEL:**

* Shows GitHub Advanced Security settings
* Enables secret scanning
* Enables code scanning

**🎙️ HAMMAD:**

> "Automated builds, automatic dependency updates, and security scanning. Our pipeline is production-ready."

**(min 107 | ⏰ 1:37 PM)** **CHECKPOINT: Tag `v0.7.0`**

**💻 EMMANUEL:**

```bash
git add .github/
git commit -m "ci: add GitHub Actions workflow and Dependabot AB#XXX"
git tag v0.7.0
```

---

## Act 8: The Full Stack Change (Minutes 107–120 | ⏰ 1:37 – 1:50 PM)

**🎙️ HAMMAD:**

> "Final act. Let's prove our architecture works by adding a new field end-to-end."

**Key beat (EMMANUEL):**

> "We're going to add a `program_budget` field — from database to UI — and show how Copilot accelerates iterative development."

### Step 1: Database Migration

**(min 107 | ⏰ 1:37 PM)** Add column migration

**💻 EMMANUEL:**

* Creates `V005__add_program_budget.sql`
* Adds DECIMAL(18,2) column for budget

### Step 2: Update Entity

**(min 109 | ⏰ 1:39 PM)** Modify entity

**💻 EMMANUEL:**

* Adds `programBudget` field to `Program.java`
* Uses BigDecimal type

### Step 3: Update DTOs

**(min 111 | ⏰ 1:41 PM)** Modify request/response

**💻 EMMANUEL:**

* Adds field to `ProgramCreateRequest`
* Adds field to `ProgramResponse`
* Adds @Min validation

### Step 4: Update Frontend Form

**(min 114 | ⏰ 1:44 PM)** Add form field

**💻 EMMANUEL:**

* Adds budget input to `ProgramForm.tsx`
* Adds validation
* Adds translations (EN/FR)

### Step 5: Update Tests

**(min 117 | ⏰ 1:47 PM)** Fix tests

**💻 EMMANUEL:**

* Updates backend tests
* Updates frontend tests
* Shows all tests passing

**🎙️ HAMMAD:**

> "Full stack change in 13 minutes. Migration, entity, DTO, API, form, tests — all updated and working."

**(min 120 | ⏰ 1:50 PM)** **CHECKPOINT: Tag `v1.0.0`**

**💻 EMMANUEL:**

```bash
git add .
git commit -m "feat: add program_budget field end-to-end AB#XXX"
git tag v1.0.0
```

---

## Closing (Minutes 120–130 | ⏰ 1:50 – 2:00 PM)

### Summary Statistics

**(min 120 | ⏰ 1:50 PM)** Show final state

**🎙️ HAMMAD:**

> "Let's look at what we've accomplished."

**💻 EMMANUEL** shows ADO board — all stories Done.

### Key Numbers

| Metric               | Value         |
|----------------------|---------------|
| Total demo time      | 130 minutes   |
| Database tables      | 3             |
| API endpoints        | 5             |
| React components     | ~10           |
| Flyway migrations    | 5             |
| ADO work items       | ~35           |
| Commit checkpoints   | 8             |
| Languages supported  | 2 (EN/FR)     |

### What We Built

**🎙️ HAMMAD:**

> "From an empty repository to a complete, production-ready application:
>
> * Bilingual citizen portal for program submissions
> * Ministry review dashboard for approvals
> * Full test coverage with accessibility compliance
> * Automated CI/CD pipeline with security scanning
> * Complete ADO work item tracking"

### Thank You

**(min 125 | ⏰ 1:55 PM)**

**🎙️ HAMMAD:**

> "Thank you for joining us today. GitHub Copilot isn't just a code completion tool — it's a force multiplier for the entire development lifecycle."

**💻 EMMANUEL:**

> "From architecture to deployment, from work items to testing — Copilot accelerates every step."

### Q&A

**(min 126–130 | ⏰ 1:56 – 2:00 PM)**

**🎙️ HAMMAD:**

> "We have a few minutes for questions. What would you like to know?"

---

## Tagged Commit Checkpoints

Recovery points for the demo:

| Tag     | Minute | Time       | Milestone                   | Recovery                        |
|---------|--------|------------|-----------------------------|---------------------------------|
| v0.1.0  | 20     | 10:50 AM   | Scaffolding complete        | Reset to here if MCP fails      |
| v0.2.0  | 32     | 11:02 AM   | Database migrations         | Skip to v0.3.0 if behind        |
| v0.3.0  | 52     | 11:22 AM   | Backend API complete        | Core demo achievable from here  |
| v0.4.0  | 70     | 11:40 AM   | Citizen portal (CLIFFHANGER)| Pre-lunch checkpoint            |
| v0.5.0  | 87     | 1:17 PM    | Ministry portal             | Full workflow demo              |
| v0.6.0  | 100    | 1:30 PM    | Tests passing               | Quality gate                    |
| v0.7.0  | 107    | 1:37 PM    | CI/CD configured            | Pipeline ready                  |
| v1.0.0  | 120    | 1:50 PM    | Live change complete        | Final demo state                |

## Recovery Commands

```bash
# Reset to any checkpoint
git checkout tags/v0.X.0 -b recovery-branch

# Compare with current state
git diff v0.3.0..HEAD

# Fast-forward from checkpoint
git merge v0.X.0
```

---

## Risk Mitigation

| Risk                  | Mitigation                                  | Recovery Time |
|-----------------------|---------------------------------------------|---------------|
| Copilot errors        | Manual code fallback + pre-written snippets | 2–3 min       |
| Azure SQL connection  | Fall back to H2 local profile               | 1 min         |
| Time overrun          | Skip to next checkpoint tag                 | Instant       |
| Network/connectivity  | Offline mode with cached dependencies       | 2 min         |
| MCP failure           | Manual ADO web UI for work items            | 5 min         |
| Build failure         | Pre-built artifacts in backup branch        | 1 min         |

---

## Key Numbers Summary

| Metric                | Value                                   |
|-----------------------|-----------------------------------------|
| Total demo duration   | 130 minutes                             |
| Part 1 duration       | 70 minutes (10:30 AM – 11:40 AM)        |
| Lunch break           | 80 minutes (11:40 AM – 1:00 PM)         |
| Part 2 duration       | 60 minutes (1:00 PM – 2:00 PM)          |
| Database tables       | 3 (program_type, program, notification) |
| API endpoints         | 5                                       |
| React components      | ~10                                     |
| Flyway migrations     | 5                                       |
| ADO work items        | ~35                                     |
| Commit checkpoints    | 8 (v0.1.0 → v1.0.0)                     |
| Languages             | 2 (English, French)                     |
