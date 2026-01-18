# Tasks: Three-Column Task Manager

**Input**: Design documents from `/specs/001-task-manager-columns/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/storage-api.md

**Tests**: Manual browser testing only (per constitution - no automated tests requested)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

Based on plan.md, this is a single-page web application:
- Source: `src/`
- Components: `src/components/`
- UI components (shadcn): `src/components/ui/`
- Hooks: `src/hooks/`
- Types: `src/types/`
- Utilities: `src/lib/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization with Vite + React + TypeScript + Tailwind + shadcn/ui

- [x] T001 Initialize Vite project with React + TypeScript template in project root
- [x] T002 Install and configure Tailwind CSS with PostCSS in tailwind.config.js
- [x] T003 Initialize shadcn/ui and create components.json configuration
- [x] T004 [P] Create src/lib/utils.ts with shadcn utility functions (cn helper)
- [x] T005 [P] Configure path aliases in tsconfig.json for @/* imports
- [x] T006 [P] Update src/index.css with Tailwind directives and CSS variables

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types, storage hook, and base components that ALL user stories depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Create Task and Column types in src/types/task.ts per data-model.md
- [x] T008 Implement useTaskStorage hook in src/hooks/useTaskStorage.ts per storage-api.md contract
- [x] T009 Install shadcn/ui Button component in src/components/ui/button.tsx
- [x] T010 [P] Install shadcn/ui Card component in src/components/ui/card.tsx
- [x] T011 [P] Install shadcn/ui Input component in src/components/ui/input.tsx
- [x] T012 [P] Install shadcn/ui Label component in src/components/ui/label.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Create and View Tasks (Priority: P1) MVP

**Goal**: Users can add new tasks to any of the three columns and see them displayed

**Independent Test**: Open app, add task with title/deadline/description to each column, verify all tasks display correctly

### Implementation for User Story 1

- [x] T013 [US1] Create TaskCard component in src/components/TaskCard.tsx displaying title and deadline
- [x] T014 [US1] Create TaskColumn component in src/components/TaskColumn.tsx with column header and task list
- [x] T015 [US1] Create TaskBoard component in src/components/TaskBoard.tsx with three-column layout
- [x] T016 [US1] Install shadcn/ui Dialog component in src/components/ui/dialog.tsx for add task modal
- [x] T017 [US1] Create TaskForm component in src/components/TaskForm.tsx with title, deadline, description fields
- [x] T018 [US1] Implement Add Task button in TaskColumn that opens TaskForm dialog
- [x] T019 [US1] Wire up addTask from useTaskStorage to TaskForm submission
- [x] T020 [US1] Implement title validation (required, non-empty) with error message in TaskForm
- [x] T021 [US1] Update App.tsx to render TaskBoard as main content

**Checkpoint**: User Story 1 complete - users can create and view tasks in all three columns

---

## Phase 4: User Story 2 - Edit Existing Tasks (Priority: P2)

**Goal**: Users can edit task details (title, deadline, description) after creation

**Independent Test**: Create a task, click to edit, change each field, verify changes persist

### Implementation for User Story 2

- [x] T022 [US2] Add onClick handler to TaskCard to open edit mode
- [x] T023 [US2] Modify TaskForm to accept optional existing task for edit mode
- [x] T024 [US2] Implement edit dialog that pre-fills TaskForm with current task values
- [x] T025 [US2] Wire up updateTask from useTaskStorage to TaskForm edit submission
- [x] T026 [US2] Handle clearing optional fields (description, deadline) in edit mode

**Checkpoint**: User Story 2 complete - users can edit any task field

---

## Phase 5: User Story 3 - Move Tasks Between Columns (Priority: P3)

**Goal**: Users can move tasks between columns via drag-and-drop (mouse, keyboard, touch)

**Independent Test**: Create task in one column, drag/move to another column, verify it appears in destination

### Implementation for User Story 3

- [x] T027 [US3] Install @dnd-kit/core and @dnd-kit/sortable dependencies
- [x] T028 [US3] Set up DndContext with accessibility announcements in TaskBoard
- [x] T029 [US3] Make TaskCard draggable using useDraggable hook
- [x] T030 [US3] Make TaskColumn a droppable zone using useDroppable hook
- [x] T031 [US3] Implement DragOverlay component for visual feedback during drag
- [x] T032 [US3] Handle onDragEnd to call moveTask from useTaskStorage
- [x] T033 [US3] Add keyboard sensor for Space/Enter pickup and arrow key navigation
- [x] T034 [US3] Add touch sensor with activation delay for mobile drag
- [x] T035 [US3] Configure screen reader announcements for drag operations

**Checkpoint**: User Story 3 complete - users can move tasks between columns via drag-and-drop

---

## Phase 6: User Story 4 - Delete Tasks (Priority: P4)

**Goal**: Users can remove tasks they no longer need

**Independent Test**: Create a task, delete it, verify it no longer appears in any column

### Implementation for User Story 4

- [x] T036 [US4] Install shadcn/ui AlertDialog component in src/components/ui/alert-dialog.tsx
- [x] T037 [US4] Add delete button to TaskCard or TaskForm edit view
- [x] T038 [US4] Implement delete confirmation dialog using AlertDialog
- [x] T039 [US4] Wire up deleteTask from useTaskStorage to confirmation action

**Checkpoint**: User Story 4 complete - users can delete tasks with confirmation

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and edge case handling

- [x] T040 [P] Add responsive design for mobile/tablet layouts in TaskBoard and TaskColumn
- [x] T041 [P] Implement empty state message when a column has no tasks
- [x] T042 [P] Add loading state to useTaskStorage for initial localStorage read
- [x] T043 [P] Implement text truncation for long titles/descriptions in TaskCard
- [x] T044 [P] Add error boundary and error state handling for storage failures
- [x] T045 Run manual testing checklist from plan.md Verification Plan
- [x] T046 Validate against quickstart.md integration scenarios

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phases 3-6)**: All depend on Foundational phase completion
  - Can proceed in priority order (P1 → P2 → P3 → P4)
  - Or in parallel if team capacity allows
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational - Extends TaskForm from US1 but independently testable
- **User Story 3 (P3)**: Can start after Foundational - Uses TaskCard/TaskColumn from US1 but independently testable
- **User Story 4 (P4)**: Can start after Foundational - Adds to TaskCard from US1 but independently testable

### Within Each User Story

- UI components before wiring to hooks
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

**Phase 1 (Setup)**:
- T004, T005, T006 can run in parallel after T003

**Phase 2 (Foundational)**:
- T010, T011, T012 can run in parallel after T009

**Phase 7 (Polish)**:
- T040, T041, T042, T043, T044 can all run in parallel

---

## Parallel Example: Phase 2 Foundational

```bash
# After T009 completes, launch in parallel:
Task: "Install shadcn/ui Card component in src/components/ui/card.tsx"
Task: "Install shadcn/ui Input component in src/components/ui/input.tsx"
Task: "Install shadcn/ui Label component in src/components/ui/label.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T006)
2. Complete Phase 2: Foundational (T007-T012)
3. Complete Phase 3: User Story 1 (T013-T021)
4. **STOP and VALIDATE**: Test US1 independently - users can create and view tasks
5. Deploy/demo if ready - this is a working MVP!

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add User Story 1 → Test → **MVP shipped** (create/view tasks)
3. Add User Story 2 → Test → Deploy (+ edit tasks)
4. Add User Story 3 → Test → Deploy (+ drag-and-drop)
5. Add User Story 4 → Test → Deploy (+ delete tasks)
6. Polish → Test → Final release

### Single Developer Strategy

Work through phases sequentially in priority order:
1. Phase 1 → Phase 2 → Phase 3 (US1/MVP) → Validate
2. Phase 4 (US2) → Phase 5 (US3) → Phase 6 (US4)
3. Phase 7 (Polish) → Final validation

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| Phase 1: Setup | T001-T006 (6 tasks) | Vite + React + Tailwind + shadcn |
| Phase 2: Foundational | T007-T012 (6 tasks) | Types, storage hook, UI primitives |
| Phase 3: US1 (P1) | T013-T021 (9 tasks) | Create and view tasks - **MVP** |
| Phase 4: US2 (P2) | T022-T026 (5 tasks) | Edit existing tasks |
| Phase 5: US3 (P3) | T027-T035 (9 tasks) | Drag-and-drop movement |
| Phase 6: US4 (P4) | T036-T039 (4 tasks) | Delete tasks |
| Phase 7: Polish | T040-T046 (7 tasks) | Responsive, edge cases, validation |

**Total**: 46 tasks
- User Story 1: 9 tasks (MVP)
- User Story 2: 5 tasks
- User Story 3: 9 tasks
- User Story 4: 4 tasks
- Setup/Foundational: 12 tasks
- Polish: 7 tasks

---

## Notes

- [P] tasks = different files, no dependencies
- [USn] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Manual testing only per constitution (no automated test tasks)
