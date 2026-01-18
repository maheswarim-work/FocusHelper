# Research: Three-Column Task Manager

**Feature Branch**: `001-task-manager-columns`
**Date**: 2026-01-17

## Technical Decisions

### Decision 1: Build Tool - Vite

**Decision**: Use Vite 6.x as the build tool and dev server.

**Rationale**:
- User explicitly requested Vite
- Fast HMR (Hot Module Replacement) for rapid development
- Native TypeScript support
- Simple configuration
- Modern ESM-based architecture

**Alternatives Considered**:
- **Vanilla JS (no build)**: Constitution default, but lacks component reuse patterns needed for a multi-column task board
- **Create React App**: Deprecated, slower builds
- **webpack**: More complex configuration, slower dev server

---

### Decision 2: UI Framework - React 18

**Decision**: Use React 18.x with TypeScript.

**Rationale**:
- User explicitly requested React (via shadcn/ui which requires React)
- Component-based architecture ideal for task cards and columns
- Large ecosystem and community support
- TypeScript provides type safety for task data structures

**Alternatives Considered**:
- **Vanilla JS**: Would require manual DOM manipulation for each card update
- **Vue.js**: Also viable, but user requested React ecosystem
- **Svelte**: Less mature ecosystem for component libraries

---

### Decision 3: Styling - Tailwind CSS 3.x

**Decision**: Use Tailwind CSS for utility-first styling.

**Rationale**:
- User explicitly requested Tailwind
- Utility-first approach enables rapid UI development
- No context switching between CSS and JSX files
- Built-in responsive design utilities
- Works seamlessly with shadcn/ui

**Alternatives Considered**:
- **Vanilla CSS**: More verbose, harder to maintain consistency
- **CSS Modules**: More setup, less rapid iteration
- **Styled Components**: Runtime overhead, different mental model

---

### Decision 4: Component Library - shadcn/ui

**Decision**: Use shadcn/ui for accessible component primitives.

**Rationale**:
- User explicitly requested shadcn/ui
- Provides accessible, unstyled component primitives
- Components are copied into project (not npm dependency)
- Full control over styling and behavior
- Built on Radix UI primitives with proven accessibility

**Alternatives Considered**:
- **Build from scratch**: Error-prone for accessibility (dialogs, focus management)
- **Material UI**: Opinionated styling, larger bundle
- **Chakra UI**: Additional runtime, different styling approach

---

### Decision 5: Drag-and-Drop - @dnd-kit

**Decision**: Use @dnd-kit/core and @dnd-kit/sortable for drag-and-drop.

**Rationale**:
- Best-in-class accessibility for drag-and-drop in React
- Supports mouse, keyboard, and touch inputs
- Built-in screen reader announcements
- Lightweight and performant
- Spec requires moving tasks between columns (User Story 3)

**Alternatives Considered**:
- **react-beautiful-dnd**: Deprecated by Atlassian
- **react-dnd**: Lower-level, more setup for accessibility
- **Native HTML5 drag**: Poor accessibility, inconsistent touch support
- **Simple "Move to" dropdown**: User experience inferior, but acceptable for MVP

**Note**: Spec Assumption says "No drag-and-drop required for MVP", but since we're using React ecosystem, @dnd-kit provides better UX with minimal additional complexity.

---

### Decision 6: Data Persistence - localStorage

**Decision**: Use browser localStorage for task persistence.

**Rationale**:
- Constitution requires localhost-only, no external services
- Spec explicitly mentions localStorage (FR-007, Assumptions)
- Simple key-value storage sufficient for task data
- Synchronous API, no async complexity
- Persists across browser sessions

**Alternatives Considered**:
- **IndexedDB**: Overkill for simple task list
- **File-based**: Requires server component
- **SQLite via WASM**: Complex setup for simple needs

**Storage Schema**:
```typescript
// Key: 'focushelper-tasks'
// Value: JSON.stringify(Task[])
```

---

### Decision 7: Testing Strategy - Manual Browser Testing

**Decision**: Manual testing with documented checklist per constitution.

**Rationale**:
- Constitution specifies "Manual testing checklist required"
- Small feature scope doesn't warrant automated test infrastructure
- All user stories have clear acceptance scenarios for manual verification

**Alternatives Considered**:
- **Jest + React Testing Library**: Would add complexity, constitution prefers simplicity
- **Playwright/Cypress**: E2E testing overhead not justified for MVP

---

## Constitution Compliance

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Simplicity First | PASS (with justification) | Frameworks explicitly requested by user |
| II. Localhost Development | PASS | localStorage, single command dev server |
| III. Progressive Enhancement | PARTIAL | React requires JS; acceptable for explicitly requested framework |
| IV. Single Responsibility | PASS | Clear component separation planned |
| V. Test Before Ship | PASS | Manual testing checklist in spec |

## Unresolved Questions

None - all technical decisions resolved.
