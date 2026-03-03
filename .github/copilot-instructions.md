---
description: "Global Copilot instructions for CIVIC program submission system"
---

# CIVIC — Citizens' Ideas for a Vibrant and Inclusive Community

## Project Overview

CIVIC is a government program submission and approval system for Ontario citizens.
Citizens submit program requests through a public portal; Ministry employees review
and approve/reject submissions through an internal portal.

## Technical Stack

| Layer        | Technology                                       |
|--------------|--------------------------------------------------|
| Frontend     | React 18 + TypeScript + Vite (port 3000)         |
| Backend      | Java 21 + Spring Boot 3.x (port 8080)            |
| Database     | Azure SQL (H2 with MODE=MSSQLServer for local)   |
| UI Framework | Ontario Design System                            |
| i18n         | i18next (EN/FR)                                  |

## Coding Standards

### Accessibility (WCAG 2.2 Level AA)

* All interactive elements must have `aria-label` or `aria-labelledby`
* Form inputs must have associated labels
* Color contrast ratio minimum 4.5:1
* Keyboard navigation for all functionality
* `lang` attribute on `<html>` element

### Bilingual Support

* All user-facing text via i18next translation keys
* Translation files: `public/locales/{en,fr}/translation.json`
* Default language: English
* Language toggle in header

### Ontario Design System

* Use official CSS classes from `@ongov/ontario-design-system-global-styles`
* Follow Ontario.ca layout patterns
* Header and footer match Ontario government standards

## Azure DevOps Integration

### Commit Messages

Format: `type(scope): description AB#{workItemId}`

Examples:

* `feat(api): add program submission endpoint AB#1234`
* `fix(ui): correct French translation AB#1235`
* `test(backend): add controller tests AB#1236`

### Branch Naming

Format: `feature/{workItemId}-short-description`

Examples:

* `feature/1234-program-submission-api`
* `feature/1235-french-translations`

### Pull Requests

* Title includes work item: `feat: Add program form AB#1234`
* Body includes `Fixes AB#{id}` for auto-close
* Require at least one approval
