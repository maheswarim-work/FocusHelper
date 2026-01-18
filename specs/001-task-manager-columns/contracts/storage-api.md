# Storage API Contract

**Feature Branch**: `001-task-manager-columns`
**Date**: 2026-01-17

## Overview

This document defines the internal storage interface for the Task Manager. Since this is a client-only application using localStorage, these contracts define the interface between React components and the persistence layer.

## Storage Hook Interface

### useTaskStorage

Custom React hook that manages task persistence.

```typescript
interface UseTaskStorageReturn {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;

  // CRUD Operations
  addTask: (task: CreateTaskInput) => Task;
  updateTask: (id: string, updates: UpdateTaskInput) => Task | null;
  deleteTask: (id: string) => boolean;

  // Column Operations
  moveTask: (id: string, targetColumnId: ColumnId) => Task | null;
  getTasksByColumn: (columnId: ColumnId) => Task[];
}
```

---

## Input Types

### CreateTaskInput

Input for creating a new task.

```typescript
interface CreateTaskInput {
  title: string;        // Required, 1-500 chars
  description?: string; // Optional
  deadline?: string;    // Optional, ISO date
  columnId: ColumnId;   // Required, target column
}
```

**Validation**:
- `title`: Must be non-empty string, max 500 characters
- `columnId`: Must be valid ColumnId ('tasks' | 'meetings' | 'backburner')

### UpdateTaskInput

Input for updating an existing task.

```typescript
interface UpdateTaskInput {
  title?: string;
  description?: string;
  deadline?: string | null;  // null to clear
  columnId?: ColumnId;
}
```

**Validation**:
- `title`: If provided, must be non-empty string, max 500 characters
- `columnId`: If provided, must be valid ColumnId

---

## Operations

### addTask

Creates a new task and persists to localStorage.

**Input**: `CreateTaskInput`
**Output**: `Task` (created task with generated id and timestamps)
**Side Effects**: Updates localStorage

**Behavior**:
1. Validate input (throw if invalid)
2. Generate UUID for id
3. Set createdAt and updatedAt to current timestamp
4. Add to tasks array
5. Persist to localStorage
6. Return created task

---

### updateTask

Updates an existing task.

**Input**: `id: string`, `updates: UpdateTaskInput`
**Output**: `Task | null` (updated task, or null if not found)
**Side Effects**: Updates localStorage

**Behavior**:
1. Find task by id
2. If not found, return null
3. Validate updates (throw if invalid)
4. Merge updates with existing task
5. Update updatedAt timestamp
6. Persist to localStorage
7. Return updated task

---

### deleteTask

Removes a task permanently.

**Input**: `id: string`
**Output**: `boolean` (true if deleted, false if not found)
**Side Effects**: Updates localStorage

**Behavior**:
1. Find task by id
2. If not found, return false
3. Remove from tasks array
4. Persist to localStorage
5. Return true

---

### moveTask

Moves a task to a different column.

**Input**: `id: string`, `targetColumnId: ColumnId`
**Output**: `Task | null` (updated task, or null if not found)
**Side Effects**: Updates localStorage

**Behavior**:
1. Equivalent to `updateTask(id, { columnId: targetColumnId })`

---

### getTasksByColumn

Filters tasks by column (derived, no persistence).

**Input**: `columnId: ColumnId`
**Output**: `Task[]`
**Side Effects**: None

**Behavior**:
1. Filter tasks array where task.columnId === columnId
2. Return filtered array

---

## localStorage Schema

### Key
```
focushelper-tasks
```

### Value Format
```typescript
// JSON.stringify(Task[])
string
```

### Example
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Complete project proposal",
    "description": "Draft and review the Q1 proposal",
    "deadline": "2026-01-20",
    "columnId": "tasks",
    "createdAt": "2026-01-17T10:30:00Z",
    "updatedAt": "2026-01-17T10:30:00Z"
  }
]
```

---

## Error Handling

| Error | When | Response |
|-------|------|----------|
| ValidationError | Invalid input to addTask/updateTask | Throw with message |
| NotFoundError | Task id not found | Return null/false |
| StorageError | localStorage unavailable | Set error state, tasks remain in memory |

---

## Component Integration

```
┌─────────────────────────────────────────────────────────────┐
│                         TaskBoard                            │
│                             │                                │
│                    useTaskStorage()                          │
│                             │                                │
│         ┌───────────────────┼───────────────────┐           │
│         ▼                   ▼                   ▼           │
│   ┌───────────┐      ┌───────────┐      ┌───────────┐      │
│   │TaskColumn │      │TaskColumn │      │TaskColumn │      │
│   │  "tasks"  │      │"meetings" │      │"backburner"│     │
│   │           │      │           │      │           │      │
│   │ TaskCard  │      │ TaskCard  │      │ TaskCard  │      │
│   │ TaskCard  │      │           │      │ TaskCard  │      │
│   └───────────┘      └───────────┘      └───────────┘      │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
                      ┌─────────────┐
                      │ localStorage │
                      └─────────────┘
```
