---
title: CIVIC Design Document
description: API endpoint specifications, DTO definitions, and frontend component architecture
---

## Overview

This document specifies the API design, data transfer objects, and frontend component architecture for the CIVIC (Citizens' Ideas for a Vibrant and Inclusive Community) program submission system.

## API Endpoints

### Endpoint Summary

| # | Method | Path                       | Description              | Auth Required |
|---|--------|----------------------------|--------------------------|---------------|
| 1 | POST   | /api/programs              | Submit a program         | No            |
| 2 | GET    | /api/programs              | List programs (paginated)| No            |
| 3 | GET    | /api/programs/{id}         | Get single program       | No            |
| 4 | PUT    | /api/programs/{id}/review  | Approve/reject program   | Future        |
| 5 | GET    | /api/program-types         | Get dropdown values      | No            |

### POST /api/programs — Submit a Program

Creates a new program submission.

**Request:**

```http
POST /api/programs
Content-Type: application/json

{
  "programName": "Community Garden Initiative",
  "programDescription": "A program to establish community gardens...",
  "programTypeId": 1,
  "contactEmail": "citizen@example.com"
}
```

**Response:** `201 Created`

```json
{
  "id": 42,
  "programName": "Community Garden Initiative",
  "programDescription": "A program to establish community gardens...",
  "programType": {
    "id": 1,
    "typeName": "Community Services",
    "typeNameFr": "Services communautaires"
  },
  "status": "SUBMITTED",
  "reviewerComments": null,
  "submittedAt": "2026-03-02T10:30:00",
  "reviewedAt": null,
  "createdAt": "2026-03-02T10:30:00"
}
```

**Error Response:** `400 Bad Request`

```json
{
  "type": "about:blank",
  "title": "Bad Request",
  "status": 400,
  "detail": "Validation failed",
  "instance": "/api/programs",
  "errors": [
    { "field": "programName", "message": "must not be blank" }
  ]
}
```

### GET /api/programs — List Programs

Retrieves a paginated list of programs with optional filtering.

**Query Parameters:**

| Parameter     | Type    | Default | Description                |
|---------------|---------|---------|----------------------------|
| status        | String  | null    | Filter by status           |
| programTypeId | Integer | null    | Filter by program type     |
| page          | Integer | 0       | Page number (zero-based)   |
| size          | Integer | 20      | Page size                  |

**Request:**

```http
GET /api/programs?status=SUBMITTED&page=0&size=10
```

**Response:** `200 OK`

```json
{
  "content": [
    {
      "id": 42,
      "programName": "Community Garden Initiative",
      "programDescription": "A program to establish...",
      "programType": {
        "id": 1,
        "typeName": "Community Services",
        "typeNameFr": "Services communautaires"
      },
      "status": "SUBMITTED",
      "submittedAt": "2026-03-02T10:30:00",
      "createdAt": "2026-03-02T10:30:00"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10
  },
  "totalElements": 1,
  "totalPages": 1
}
```

### GET /api/programs/{id} — Get Single Program

Retrieves details of a specific program.

**Request:**

```http
GET /api/programs/42
```

**Response:** `200 OK`

```json
{
  "id": 42,
  "programName": "Community Garden Initiative",
  "programDescription": "A program to establish community gardens...",
  "programType": {
    "id": 1,
    "typeName": "Community Services",
    "typeNameFr": "Services communautaires"
  },
  "status": "SUBMITTED",
  "reviewerComments": null,
  "submittedAt": "2026-03-02T10:30:00",
  "reviewedAt": null,
  "createdAt": "2026-03-02T10:30:00"
}
```

**Error Response:** `404 Not Found`

```json
{
  "type": "about:blank",
  "title": "Not Found",
  "status": 404,
  "detail": "Program with id 999 not found",
  "instance": "/api/programs/999"
}
```

### PUT /api/programs/{id}/review — Approve/Reject

Updates program status with reviewer decision.

**Request:**

```http
PUT /api/programs/42/review
Content-Type: application/json

{
  "status": "APPROVED",
  "reviewerComments": "Excellent initiative. Approved for funding."
}
```

**Response:** `200 OK`

```json
{
  "id": 42,
  "programName": "Community Garden Initiative",
  "programDescription": "A program to establish community gardens...",
  "programType": {
    "id": 1,
    "typeName": "Community Services",
    "typeNameFr": "Services communautaires"
  },
  "status": "APPROVED",
  "reviewerComments": "Excellent initiative. Approved for funding.",
  "submittedAt": "2026-03-02T10:30:00",
  "reviewedAt": "2026-03-02T14:15:00",
  "createdAt": "2026-03-02T10:30:00"
}
```

**Validation Error:** `400 Bad Request`

```json
{
  "type": "about:blank",
  "title": "Bad Request",
  "status": 400,
  "detail": "Validation failed",
  "instance": "/api/programs/42/review",
  "errors": [
    { "field": "status", "message": "must match pattern APPROVED|REJECTED" }
  ]
}
```

### GET /api/program-types — Get Dropdown Values

Retrieves program types for form dropdowns.

**Request:**

```http
GET /api/program-types
```

**Response:** `200 OK`

```json
[
  { "id": 1, "typeName": "Community Services", "typeNameFr": "Services communautaires" },
  { "id": 2, "typeName": "Health & Wellness", "typeNameFr": "Santé et bien-être" },
  { "id": 3, "typeName": "Education & Training", "typeNameFr": "Éducation et formation" },
  { "id": 4, "typeName": "Environment & Conservation", "typeNameFr": "Environnement et conservation" },
  { "id": 5, "typeName": "Economic Development", "typeNameFr": "Développement économique" }
]
```

## Data Transfer Objects

### Request DTOs

#### ProgramCreateRequest

```java
public record ProgramCreateRequest(
    @NotBlank(message = "Program name is required")
    @Size(max = 200, message = "Program name must not exceed 200 characters")
    String programName,

    @NotBlank(message = "Program description is required")
    String programDescription,

    @NotNull(message = "Program type is required")
    Integer programTypeId,

    @Email(message = "Contact email must be valid")
    String contactEmail
) {}
```

#### ReviewRequest

```java
public record ReviewRequest(
    @NotBlank(message = "Status is required")
    @Pattern(regexp = "APPROVED|REJECTED", message = "Status must be APPROVED or REJECTED")
    String status,

    String reviewerComments
) {}
```

### Response DTOs

#### ProgramResponse

```java
public record ProgramResponse(
    Long id,
    String programName,
    String programDescription,
    ProgramTypeResponse programType,
    String status,
    String reviewerComments,
    LocalDateTime submittedAt,
    LocalDateTime reviewedAt,
    LocalDateTime createdAt
) {}
```

#### ProgramTypeResponse

```java
public record ProgramTypeResponse(
    Integer id,
    String typeName,
    String typeNameFr
) {}
```

## Error Handling

All errors follow RFC 7807 ProblemDetail format:

```java
@ExceptionHandler(ResourceNotFoundException.class)
public ProblemDetail handleNotFound(ResourceNotFoundException ex) {
    ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);
    problem.setTitle("Not Found");
    problem.setDetail(ex.getMessage());
    return problem;
}

@ExceptionHandler(MethodArgumentNotValidException.class)
public ProblemDetail handleValidation(MethodArgumentNotValidException ex) {
    ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
    problem.setTitle("Bad Request");
    problem.setDetail("Validation failed");
    
    List<Map<String, String>> errors = ex.getBindingResult()
        .getFieldErrors()
        .stream()
        .map(e -> Map.of("field", e.getField(), "message", e.getDefaultMessage()))
        .toList();
    
    problem.setProperty("errors", errors);
    return problem;
}
```

## Frontend Component Architecture

### Component Hierarchy

```text
App
├── Layout
│   ├── Header (Ontario header + LanguageToggle)
│   ├── Main (react-router outlet)
│   └── Footer (Ontario footer)
├── Pages
│   ├── SubmitProgram (citizen form)
│   ├── SubmitConfirmation (success page)
│   ├── SearchPrograms (list + search)
│   ├── ReviewDashboard (ministry list)
│   └── ReviewDetail (ministry approve/reject)
└── Components
    ├── LanguageToggle
    ├── ProgramForm
    ├── ProgramCard
    └── StatusBadge
```

### Page Components

#### SubmitProgram

Citizen-facing form for submitting program requests.

* Form fields: programName, programDescription, programTypeId, contactEmail
* Validation: client-side + server-side
* i18n: all labels and messages via translation keys
* Accessibility: ARIA labels, form labels, keyboard navigation

#### SubmitConfirmation

Success page displayed after program submission.

* Displays program ID and next steps
* Link to submit another program
* Bilingual content

#### SearchPrograms

Public listing of programs with search and filter.

* Pagination controls
* Status filter dropdown
* Program type filter dropdown
* Responsive card layout

#### ReviewDashboard

Ministry staff dashboard for pending submissions.

* Table view of SUBMITTED programs
* Sort by submitted date
* Quick actions: view details
* Badge indicators for status

#### ReviewDetail

Ministry staff detail view for approve/reject actions.

* Full program details display
* Reviewer comments textarea
* Approve/Reject buttons
* Confirmation modal

### Shared Components

#### LanguageToggle

Language switcher in header.

```tsx
interface LanguageToggleProps {
  currentLanguage: 'en' | 'fr';
  onLanguageChange: (lang: 'en' | 'fr') => void;
}
```

#### ProgramForm

Reusable form component for program submission.

```tsx
interface ProgramFormProps {
  onSubmit: (data: ProgramCreateRequest) => void;
  isLoading: boolean;
  programTypes: ProgramTypeResponse[];
}
```

#### ProgramCard

Card component for displaying program summary.

```tsx
interface ProgramCardProps {
  program: ProgramResponse;
  onSelect: (id: number) => void;
}
```

#### StatusBadge

Visual indicator for program status.

```tsx
interface StatusBadgeProps {
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
}
```

## Vite Configuration

Development server configuration with API proxy:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
```

## Routing Configuration

React Router setup for application navigation:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<SubmitProgram />} />
          <Route path="/confirmation" element={<SubmitConfirmation />} />
          <Route path="/search" element={<SearchPrograms />} />
          <Route path="/review" element={<ReviewDashboard />} />
          <Route path="/review/:id" element={<ReviewDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
```

## API Client Configuration

Axios client setup for API communication:

```typescript
// apiClient.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle ProblemDetail errors
    if (error.response?.data?.type) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);
```
