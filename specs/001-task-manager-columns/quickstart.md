# Quickstart: Three-Column Task Manager

**Feature Branch**: `001-task-manager-columns`
**Date**: 2026-01-17

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Setup

```bash
# Clone and enter the project
cd FocusHelper

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:5173
```

## Integration Scenarios

### Scenario 1: Create Your First Task

1. Open the app in your browser
2. Click the "Add Task" button on the "Tasks" column
3. Enter a title: "Review project requirements"
4. Optionally add a deadline and description
5. Click "Save"
6. The task appears in the Tasks column

**Expected Result**: Task card displays with title visible, deadline shown if provided.

---

### Scenario 2: Edit a Task

1. Click on an existing task card
2. The edit dialog opens with current values
3. Change the title or description
4. Click "Save"
5. The task updates with new values

**Expected Result**: Task card reflects the changes immediately.

---

### Scenario 3: Move a Task Between Columns

**Using Drag-and-Drop (Mouse)**:
1. Click and hold on a task card
2. Drag it over the target column
3. Release to drop

**Using Drag-and-Drop (Keyboard)**:
1. Tab to focus on a task card
2. Press Space or Enter to pick up
3. Use arrow keys to move between columns
4. Press Space or Enter to drop
5. Press Escape to cancel

**Expected Result**: Task disappears from source column and appears in target column.

---

### Scenario 4: Delete a Task

1. Click on a task card to edit
2. Click the "Delete" button
3. Confirm the deletion
4. The task is removed

**Expected Result**: Task no longer appears in any column.

---

### Scenario 5: Verify Persistence

1. Create several tasks in different columns
2. Refresh the browser (F5 or Cmd+R)
3. All tasks reappear in their columns

**Expected Result**: All task data persists across browser refresh.

---

## Component Usage

### TaskBoard

The main container that renders all three columns.

```tsx
import { TaskBoard } from './components/TaskBoard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <TaskBoard />
    </div>
  );
}
```

### useTaskStorage Hook

Manage tasks in your components.

```tsx
import { useTaskStorage } from './hooks/useTaskStorage';

function MyComponent() {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByColumn,
  } = useTaskStorage();

  // Get tasks for a specific column
  const taskItems = getTasksByColumn('tasks');

  // Add a new task
  const handleAdd = () => {
    addTask({
      title: 'New task',
      columnId: 'tasks',
    });
  };

  // Move task to another column
  const handleMove = (taskId: string) => {
    moveTask(taskId, 'meetings');
  };

  return (/* ... */);
}
```

---

## Troubleshooting

### Tasks not persisting

- Check browser's localStorage is enabled
- Inspect localStorage in DevTools: `localStorage.getItem('focushelper-tasks')`
- Clear localStorage and refresh: `localStorage.clear()`

### Drag-and-drop not working

- Ensure JavaScript is enabled
- Check for console errors
- Try keyboard navigation (Tab, Space, Arrow keys)

### Styling issues

- Clear browser cache
- Ensure Tailwind CSS is building: check for `index.css` in DevTools

---

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
