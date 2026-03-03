---
description: "Azure DevOps workflow conventions for branching, commits, and PRs"
applyTo: "**"
---

# Azure DevOps Workflow Conventions

This document defines the branching strategy, commit message format, and pull request conventions for integrating with Azure DevOps work items.

## Branching Strategy

* Branch from `main` for all feature work
* Keep `main` in a deployable state at all times
* Delete feature branches after merge

### Branch Naming Convention

Format: `feature/{workItemId}-short-description`

* Use the ADO work item ID as prefix
* Keep descriptions lowercase with hyphens
* Limit to 50 characters total

Examples:

* `feature/1234-program-submission-api`
* `feature/1235-french-translations`
* `feature/1236-review-dashboard`

## Commit Message Format

Format: `type(scope): description AB#{workItemId}`

### Types

| Type     | Usage                                         |
|----------|-----------------------------------------------|
| feat     | New feature                                   |
| fix      | Bug fix                                       |
| docs     | Documentation changes                         |
| style    | Code formatting (no logic changes)            |
| refactor | Code restructuring (no feature/bug changes)   |
| test     | Adding or updating tests                      |
| chore    | Build, config, or tooling changes             |

### Scopes

| Scope    | Usage                     |
|----------|---------------------------|
| api      | Backend API changes       |
| ui       | Frontend component changes|
| db       | Database migrations       |
| auth     | Authentication/authorization |
| i18n     | Translation changes       |
| ci       | CI/CD pipeline changes    |

### Examples

* `feat(api): add program submission endpoint AB#1234`
* `fix(ui): correct French translation on submit button AB#1235`
* `test(api): add controller tests for review endpoint AB#1236`
* `docs(readme): update setup instructions AB#1237`

## Pull Request Conventions

### PR Title

Format: `type(scope): description AB#{workItemId}`

* Same format as commit messages
* Include the primary work item ID

### PR Body Template

```markdown
## Summary

Brief description of changes.

## Work Items

Fixes AB#{primary-work-item-id}

## Changes

- Change 1
- Change 2

## Testing

- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Accessibility verified

## Screenshots (if UI changes)

<!-- Add screenshots here -->
```

### Auto-Close Work Items

* Use `Fixes AB#{id}` in PR body to auto-close work items on merge
* Use `Related AB#{id}` to link without closing

## Post-Merge Cleanup

1. Verify work item state changed to "Done" or "Closed"
2. Delete the feature branch
3. Pull latest `main` to local environment
4. Verify deployed changes (if applicable)
