# Implementation Plan: Three-Column Task Manager

**Branch**: `001-task-manager-columns` | **Date**: 2026-01-17 | **Spec**: `specs/001-task-manager-columns/spec.md`
**Input**: Feature specification from `/specs/001-task-manager-columns/spec.md`

## Related Artifacts

- [spec.md](./spec.md) - Feature specification
- [research.md](./research.md) - Technical decisions and rationale
- [data-model.md](./data-model.md) - Entity definitions
- [quickstart.md](./quickstart.md) - Integration scenarios
- [contracts/storage-api.md](./contracts/storage-api.md) - Storage interface contract
- [checklists/requirements.md](./checklists/requirements.md) - Requirements checklist

## Summary

Build a task manager web app with three columns (Tasks, Meetings, Backburner) using Vite + React + Tailwind CSS + shadcn/ui. Tasks support CRUD operations and can be moved between columns via accessible drag-and-drop (mouse, keyboard, touch).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Simplicity First | PASS (justified) | Frameworks explicitly requested by user |
| II. Localhost Development | PASS | localStorage, single command dev server |
| III. Progressive Enhancement | PARTIAL | React requires JS; acceptable for explicitly requested framework |
| IV. Single Responsibility | PASS | Clear component separation planned |
| V. Test Before Ship | PASS | Manual testing checklist included |

## Constitution Conflict Resolution

The constitution specifies "vanilla HTML/CSS/JS preferred" and "no build step required." User explicitly requested Vite, Tailwind, and shadcn/ui. These violations are justified:

| Violation | Why Needed | Simpler Alternative Rejected |
|-----------|------------|------------------------------|
| Vite (build tool) | User requirement; enables modern React tooling | Vanilla JS lacks component reuse patterns needed for cards |
| Tailwind CSS | User requirement; provides consistent styling system | Vanilla CSS requires more code, harder to maintain |
| shadcn/ui (React) | User requirement; provides accessible component primitives | Building accessible components from scratch is error-prone |
| @dnd-kit | Required for accessible drag-and-drop across mouse/keyboard/touch | No simple vanilla JS solution meets accessibility requirements |

**Constitution Amendment (approved)**: Update `.specify/memory/constitution.md` to allow build tools and frameworks when user explicitly requests them.

## Technical Context

- **Language/Version**: TypeScript 5.x, React 18.x
- **Build Tool**: Vite 5.x
- **Primary Dependencies**:
  - React 18 (UI framework)
  - @dnd-kit/core + @dnd-kit/sortable (accessible drag-and-drop)
  - Tailwind CSS 3.x (styling)
  - shadcn/ui (component library)
- **Storage**: Browser localStorage (per constitution)
- **Testing**: Manual browser testing (per constitution)
- **Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
- **Project Type**: Single-page web application
- **Performance Goals**: Load < 2s, drag operations 60fps
- **Constraints**: Offline-capable, single user, localhost only

## Project Structure

```
FocusHelper/
├── specs/001-task-manager-columns/   # Feature documentation
│   ├── spec.md                       # Feature specification
│   ├── plan.md                       # This file
│   ├── research.md                   # Technical decisions
│   ├── data-model.md                 # Entity definitions
│   ├── quickstart.md                 # Integration scenarios
│   ├── contracts/                    # API specifications
│   │   └── storage-api.md            # Storage interface contract
│   └── checklists/                   # Quality validation
├── src/
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── TaskCard.tsx              # Individual task display
│   │   ├── TaskColumn.tsx            # Column container with droppable
│   │   ├── TaskBoard.tsx             # Main board with all 3 columns
│   │   ├── TaskForm.tsx              # Add/Edit task dialog
│   │   └── TaskActions.tsx           # Delete/Move actions
│   ├── hooks/
│   │   └── useTaskStorage.ts         # localStorage persistence
│   ├── types/
│   │   └── task.ts                   # Task and Column types
│   ├── lib/
│   │   └── utils.ts                  # shadcn utilities
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                     # Tailwind imports
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── components.json                   # shadcn/ui config
```

## Data Model

### Task
```typescript
interface Task {
  id: string;           // UUID
  title: string;        // Required, non-empty
  description?: string; // Optional
  deadline?: string;    // ISO date string, optional
  columnId: ColumnId;   // Which column it belongs to
  createdAt: string;    // ISO timestamp
  updatedAt: string;    // ISO timestamp
}

type ColumnId = 'tasks' | 'meetings' | 'backburner';

interface Column {
  id: ColumnId;
  title: string;        // Display name
  tasks: Task[];        // Tasks in this column (derived from storage)
}
```

### localStorage Schema
```typescript
// Key: 'focushelper-tasks'
// Value: Task[]
```

## Accessibility Implementation

Using **@dnd-kit** for drag-and-drop with full accessibility:

### Mouse Support
- Click and drag task cards between columns
- Visual feedback during drag (shadow, placeholder)

### Keyboard Support
- Tab to focus task cards
- Space/Enter to pick up task
- Arrow keys to move between drop zones
- Space/Enter to drop
- Escape to cancel

### Touch Support
- Long-press to initiate drag
- Touch-friendly drop zones (larger targets)

### Screen Reader Support
- Live region announcements: "Task grabbed", "Over Meetings column", "Task dropped"
- Customized `aria-roledescription="task"`
- Clear keyboard instructions via `aria-describedby`

## Implementation Phases

### Phase 0: Constitution Amendment
1. Update `.specify/memory/constitution.md` to add: "Build tools and frameworks are allowed when explicitly requested by user"
2. Update CLAUDE.md to reflect technology choices

### Phase 1: Project Setup
1. Initialize Vite + React + TypeScript
2. Install and configure Tailwind CSS
3. Initialize shadcn/ui
4. Install @dnd-kit dependencies
5. Create project structure

### Phase 2: Core Components (User Story 1 - P1)
1. Create Task type definitions
2. Implement useTaskStorage hook (localStorage)
3. Build TaskCard component
4. Build TaskColumn component
5. Build TaskBoard layout
6. Implement Add Task functionality

### Phase 3: Edit & Delete (User Stories 2 & 4 - P2/P4)
1. Build TaskForm dialog (shadcn Dialog)
2. Implement edit task flow
3. Implement delete task with confirmation
4. Form validation (title required)

### Phase 4: Drag-and-Drop (User Story 3 - P3)
1. Set up DndContext with accessibility
2. Make TaskCard draggable with useDraggable
3. Make TaskColumn droppable with useDroppable
4. Implement drag overlay
5. Handle drop to move task between columns
6. Add keyboard shortcuts
7. Add screen reader announcements

### Phase 5: Polish
1. Responsive design (mobile/desktop)
2. Empty state for columns
3. Loading state
4. Error handling
5. Truncation for long text

## Verification Plan

### Manual Testing Checklist

**Mouse Testing:**
- [ ] Can drag task from Tasks to Meetings
- [ ] Can drag task from Meetings to Backburner
- [ ] Can drag task from Backburner to Tasks
- [ ] Drag preview shows correctly
- [ ] Task appears in destination after drop

**Keyboard Testing:**
- [ ] Can Tab to each task card
- [ ] Space/Enter picks up focused task
- [ ] Arrow keys move between columns
- [ ] Space/Enter drops task
- [ ] Escape cancels drag
- [ ] Focus returns to task after drop

**Touch Testing:**
- [ ] Long-press initiates drag on mobile
- [ ] Can drag between columns on touch
- [ ] Drop zones are large enough

**Screen Reader Testing (VoiceOver/NVDA):**
- [ ] Task card announces title and column
- [ ] Pickup announces "Task grabbed"
- [ ] Moving announces "Over [Column] column"
- [ ] Drop announces "Task dropped in [Column]"

**Persistence Testing:**
- [ ] Tasks persist after page refresh
- [ ] Column assignment persists
- [ ] All task fields persist

**Edge Cases:**
- [ ] Empty title shows validation error
- [ ] Very long title truncates in card
- [ ] Past deadline dates allowed
- [ ] 50+ tasks per column performs well

### How to Run
```bash
cd FocusHelper
npm install
npm run dev
# Open http://localhost:5173
```
