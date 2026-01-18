# Data Model: Three-Column Task Manager

**Feature Branch**: `001-task-manager-columns`
**Date**: 2026-01-17

## Entities

### Task

Represents a single work item that can be organized into columns.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string (UUID) | Yes | Unique identifier, auto-generated |
| `title` | string | Yes | Task title, 1-500 characters |
| `description` | string | No | Optional detailed description |
| `deadline` | string (ISO 8601) | No | Optional deadline date (YYYY-MM-DD) |
| `columnId` | ColumnId | Yes | Which column the task belongs to |
| `createdAt` | string (ISO 8601) | Yes | Timestamp when task was created |
| `updatedAt` | string (ISO 8601) | Yes | Timestamp when task was last modified |

**TypeScript Definition**:
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  columnId: ColumnId;
  createdAt: string;
  updatedAt: string;
}
```

---

### Column

A named container for organizing tasks. Fixed set of three columns.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | ColumnId | Yes | Unique identifier from fixed set |
| `title` | string | Yes | Display name for the column |

**TypeScript Definition**:
```typescript
type ColumnId = 'tasks' | 'meetings' | 'backburner';

interface Column {
  id: ColumnId;
  title: string;
}

const COLUMNS: Column[] = [
  { id: 'tasks', title: 'Tasks' },
  { id: 'meetings', title: 'Meetings' },
  { id: 'backburner', title: 'Backburner' },
];
```

---

## Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                        TaskBoard                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Column    │  │   Column    │  │   Column    │         │
│  │   "Tasks"   │  │  "Meetings" │  │ "Backburner"│         │
│  │             │  │             │  │             │         │
│  │  ┌───────┐  │  │  ┌───────┐  │  │  ┌───────┐  │         │
│  │  │ Task  │  │  │  │ Task  │  │  │  │ Task  │  │         │
│  │  └───────┘  │  │  └───────┘  │  │  └───────┘  │         │
│  │  ┌───────┐  │  │             │  │  ┌───────┐  │         │
│  │  │ Task  │  │  │             │  │  │ Task  │  │         │
│  │  └───────┘  │  │             │  │  └───────┘  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

- **Task → Column**: Many-to-one. Each task belongs to exactly one column.
- **Column → Task**: One-to-many. Each column contains zero or more tasks.

---

## Validation Rules

### Task Validation

| Field | Rule | Error Message |
|-------|------|---------------|
| `title` | Required, non-empty | "Title is required" |
| `title` | Max 500 characters | "Title must be 500 characters or less" |
| `deadline` | Valid ISO date if provided | "Invalid date format" |
| `columnId` | Must be valid ColumnId | "Invalid column" |

### Business Rules

1. **Title required**: A task cannot be saved without a title (FR-008)
2. **Past deadlines allowed**: Users may log completed work (Edge Case)
3. **Column assignment**: Task must always belong to one column
4. **No ordering**: Tasks within a column have no explicit order (Assumption)

---

## State Transitions

### Task Lifecycle

```
[Create] → [Active in Column] → [Move to Another Column] → [Delete]
                    ↑                      │
                    └──────────────────────┘
```

### Column Movement

```
┌─────────┐     ┌───────────┐     ┌────────────┐
│  Tasks  │ ←→  │  Meetings │ ←→  │ Backburner │
└─────────┘     └───────────┘     └────────────┘
      ↑                                   ↑
      └───────────────────────────────────┘
```

Tasks can move freely between any columns (US-3).

---

## Storage Schema

### localStorage Key
```
focushelper-tasks
```

### Storage Format
```typescript
// Stored as JSON string
type StoredData = Task[];

// Example
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Complete project proposal",
    "description": "Draft and review the Q1 proposal",
    "deadline": "2026-01-20",
    "columnId": "tasks",
    "createdAt": "2026-01-17T10:30:00Z",
    "updatedAt": "2026-01-17T10:30:00Z"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "title": "Team standup",
    "columnId": "meetings",
    "createdAt": "2026-01-17T09:00:00Z",
    "updatedAt": "2026-01-17T09:00:00Z"
  }
]
```

---

## Migration Strategy

Not applicable - this is a new feature with no existing data.
