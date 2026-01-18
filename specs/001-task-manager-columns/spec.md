# Feature Specification: Three-Column Task Manager

**Feature Branch**: `001-task-manager-columns`
**Created**: 2026-01-17
**Status**: Draft
**Input**: User description: "Build a simple web app running on localhost. It's a task manager app with three columns: tasks, meetings, and backburner. The user can add tasks, edit tasks, remove tasks, move tasks between the columns, and for each task they can add a title, a deadline, and a short description."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create and View Tasks (Priority: P1)

As a user, I want to add new tasks to any of the three columns so that I can capture my work items as they arise.

**Why this priority**: This is the core functionality - without the ability to create tasks, the app provides no value. Users need to see their tasks organized in columns immediately.

**Independent Test**: Can be fully tested by opening the app, adding a task with title/deadline/description to each column, and verifying all tasks display correctly.

**Acceptance Scenarios**:

1. **Given** the app is open with empty columns, **When** the user clicks "Add Task" on the Tasks column and enters a title, deadline, and description, **Then** the task appears in the Tasks column with all entered information visible.
2. **Given** the app is open, **When** the user adds a task to the Meetings column, **Then** the task appears in the Meetings column.
3. **Given** the app is open, **When** the user adds a task to the Backburner column, **Then** the task appears in the Backburner column.
4. **Given** a task is being created, **When** the user leaves the description empty but provides a title, **Then** the task is still created successfully (description is optional).

---

### User Story 2 - Edit Existing Tasks (Priority: P2)

As a user, I want to edit task details after creation so that I can update information as things change.

**Why this priority**: After creating tasks, users will inevitably need to correct or update details. This completes the basic CRUD operations for task content.

**Independent Test**: Can be tested by creating a task, then editing each field (title, deadline, description) and verifying changes persist.

**Acceptance Scenarios**:

1. **Given** a task exists in any column, **When** the user clicks on the task to edit it, **Then** the task's current title, deadline, and description are displayed in editable fields.
2. **Given** the user is editing a task, **When** they change the title and save, **Then** the updated title is displayed on the task.
3. **Given** the user is editing a task, **When** they change the deadline, **Then** the updated deadline is displayed on the task.
4. **Given** the user is editing a task, **When** they clear the description and save, **Then** the task displays without a description.

---

### User Story 3 - Move Tasks Between Columns (Priority: P3)

As a user, I want to move tasks between columns so that I can reorganize my work as priorities and contexts change.

**Why this priority**: Moving tasks is essential for the column-based organization concept. A meeting might become a regular task, or a task might be moved to backburner.

**Independent Test**: Can be tested by creating a task in one column and moving it to each of the other columns, verifying it disappears from the source and appears in the destination.

**Acceptance Scenarios**:

1. **Given** a task exists in the Tasks column, **When** the user moves it to the Meetings column, **Then** the task disappears from Tasks and appears in Meetings with all its data intact.
2. **Given** a task exists in the Meetings column, **When** the user moves it to the Backburner column, **Then** the task disappears from Meetings and appears in Backburner.
3. **Given** a task exists in the Backburner column, **When** the user moves it to the Tasks column, **Then** the task disappears from Backburner and appears in Tasks.

---

### User Story 4 - Delete Tasks (Priority: P4)

As a user, I want to remove tasks I no longer need so that my columns stay clean and relevant.

**Why this priority**: Deletion is important but less frequent than creation, editing, or moving. Users need to complete tasks or remove outdated items.

**Independent Test**: Can be tested by creating a task, deleting it, and verifying it no longer appears in any column.

**Acceptance Scenarios**:

1. **Given** a task exists in any column, **When** the user chooses to delete it, **Then** the task is removed from the column.
2. **Given** the user initiates a delete action, **When** the deletion completes, **Then** the task cannot be recovered (no undo required for MVP).

---

### Edge Cases

- What happens when a user tries to create a task with no title? The system should require a title and show a validation message.
- What happens when the deadline date is in the past? The system should allow it (user may be logging completed work).
- What happens when a user has many tasks in one column? The column should scroll to show all tasks.
- What happens if the user refreshes the page? All tasks should persist and reappear in their columns.
- What happens with very long task titles or descriptions? Text should be truncated in the card view with full text visible when editing.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display three columns labeled "Tasks", "Meetings", and "Backburner" on a single page.
- **FR-002**: System MUST provide a way to add a new task to each column.
- **FR-003**: Each task MUST have a title (required), deadline (optional), and description (optional).
- **FR-004**: System MUST allow users to edit any field of an existing task.
- **FR-005**: System MUST allow users to delete any task from any column.
- **FR-006**: System MUST allow users to move a task from any column to any other column.
- **FR-007**: System MUST persist all task data so that tasks remain after page refresh.
- **FR-008**: System MUST validate that task title is not empty before saving.
- **FR-009**: System MUST display tasks within their respective columns with visible title and deadline.
- **FR-010**: System MUST run entirely on localhost without requiring internet connection.

### Key Entities

- **Task**: Represents a single work item. Contains a title (text, required), deadline (date, optional), description (text, optional), and belongs to exactly one column at a time.
- **Column**: A named container for tasks. Fixed set of three: "Tasks", "Meetings", "Backburner". Each column holds zero or more tasks.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can create a new task in under 30 seconds (open form, fill title, save).
- **SC-002**: Users can move a task between columns in under 5 seconds.
- **SC-003**: Users can find and edit any task in under 10 seconds.
- **SC-004**: All task data persists across browser refresh with 100% reliability.
- **SC-005**: The application loads and displays all columns within 2 seconds on localhost.
- **SC-006**: Users can manage up to 50 tasks per column without performance degradation.

## Assumptions

- Single user application - no authentication or multi-user support required.
- Data persistence will use browser local storage (per constitution: localhost, no external services).
- The three columns are fixed - users cannot add, remove, or rename columns.
- No drag-and-drop required for MVP - a simple "Move to" action is sufficient.
- No task ordering within columns required for MVP - newest tasks can appear at top or bottom.
- No due date notifications or reminders required.
- No search or filter functionality required for MVP.
