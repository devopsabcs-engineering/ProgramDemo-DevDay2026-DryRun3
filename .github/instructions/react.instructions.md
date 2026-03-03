---
description: "React and TypeScript coding standards for frontend development"
applyTo: "frontend/**"
---

# React and TypeScript Coding Standards

This document defines coding standards for the CIVIC frontend built with React 18, TypeScript, and Vite.

## React 18 Standards

### Functional Components

* Use functional components with hooks exclusively
* Never use class components
* Use TypeScript interfaces for props

```tsx
interface ProgramCardProps {
  program: ProgramResponse;
  onSelect: (id: number) => void;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program, onSelect }) => {
  return (
    <article className="ontario-card" onClick={() => onSelect(program.id)}>
      <h3>{program.programName}</h3>
      <p>{program.programDescription}</p>
    </article>
  );
};
```

### React Hooks

| Hook         | Usage                                      |
|--------------|-------------------------------------------|
| useState     | Local component state                      |
| useEffect    | Side effects (API calls, subscriptions)    |
| useContext   | Access context values                      |
| useCallback  | Memoize callbacks for performance          |
| useMemo      | Memoize computed values                    |
| useRef       | DOM references and mutable values          |

### Component File Naming

* Use **PascalCase** for component files: `SubmitProgram.tsx`, `ProgramCard.tsx`
* Use **camelCase** for utility files: `apiClient.ts`, `formatDate.ts`
* Place tests alongside components: `SubmitProgram.test.tsx`

## Vite Configuration

Configure development server with API proxy:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
});
```

## i18next Internationalization

### Translation Setup

* Translation files: `public/locales/{en,fr}/translation.json`
* Default language: English
* Language toggle in header component

```typescript
// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: require('./locales/en/translation.json') },
    fr: { translation: require('./locales/fr/translation.json') }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});
```

### Translation Usage

```tsx
import { useTranslation } from 'react-i18next';

export const SubmitProgram: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <h1>{t('submitProgram.title')}</h1>
  );
};
```

### Translation File Structure

```json
{
  "common": {
    "submit": "Submit",
    "cancel": "Cancel",
    "loading": "Loading..."
  },
  "submitProgram": {
    "title": "Submit a Program",
    "programName": "Program Name",
    "description": "Description"
  }
}
```

## Ontario Design System

### CSS Classes

Use official Ontario Design System CSS classes:

```tsx
<header className="ontario-header">
  <div className="ontario-header__container">
    <a href="/" className="ontario-header__logo">
      <img src="/ontario-logo.svg" alt={t('common.ontarioLogo')} />
    </a>
  </div>
</header>
```

### Layout Components

* `ontario-header` — Government header with logo
* `ontario-footer` — Government footer with links
* `ontario-main-content` — Main content area
* `ontario-form-group` — Form field wrapper
* `ontario-button` — Primary and secondary buttons

### Form Elements

```tsx
<div className="ontario-form-group">
  <label className="ontario-label" htmlFor="programName">
    {t('submitProgram.programName')}
  </label>
  <input
    type="text"
    id="programName"
    className="ontario-input"
    aria-required="true"
    {...register('programName')}
  />
</div>
```

## Accessibility (WCAG 2.2 Level AA)

### Required Attributes

* All interactive elements must have `aria-label` or `aria-labelledby`
* Form inputs must have associated `<label>` elements
* Use semantic HTML elements (`<main>`, `<nav>`, `<section>`, `<article>`)

### Keyboard Navigation

* All functionality accessible via keyboard
* Visible focus indicators on interactive elements
* Logical tab order matching visual layout

### Language Attribute

Set `lang` attribute on root element:

```tsx
// index.html
<html lang="en">

// Dynamic language change
useEffect(() => {
  document.documentElement.lang = i18n.language;
}, [i18n.language]);
```

### Color Contrast

* Minimum 4.5:1 contrast ratio for normal text
* Minimum 3:1 contrast ratio for large text
* Use Ontario Design System colors for compliance

## Routing

Use `react-router-dom` for navigation:

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

## API Integration

Use axios for API calls:

```typescript
// apiClient.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

// Usage in component
const fetchPrograms = async () => {
  const response = await apiClient.get<ProgramResponse[]>('/programs');
  return response.data;
};
```

## Component Hierarchy

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

## Testing

* Use React Testing Library for component tests
* Use Vitest as the test runner
* Test accessibility with `@testing-library/jest-dom`

```tsx
import { render, screen } from '@testing-library/react';
import { SubmitProgram } from './SubmitProgram';

test('renders submit form heading', () => {
  render(<SubmitProgram />);
  expect(screen.getByRole('heading', { name: /submit a program/i })).toBeInTheDocument();
});
```
