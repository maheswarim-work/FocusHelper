import { useState, useCallback } from 'react';
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { Task, ColumnId, COLUMNS, CreateTaskInput } from '@/types/task';
import { useTaskStorage } from '@/hooks/useTaskStorage';
import { TaskColumn } from './TaskColumn';
import { TaskForm } from './TaskForm';
import { TaskCard } from './TaskCard';

export function TaskBoard() {
  const { isLoading, error, addTask, updateTask, deleteTask, moveTask, getTasksByColumn } = useTaskStorage();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<ColumnId>('tasks');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Configure sensors for mouse, keyboard, and touch
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8,
    },
  });

  const keyboardSensor = useSensor(KeyboardSensor);

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(pointerSensor, keyboardSensor, touchSensor);

  const handleAddTask = (columnId: ColumnId) => {
    setSelectedColumnId(columnId);
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleTaskClick = (task: Task) => {
    setEditingTask(task);
    setSelectedColumnId(task.columnId);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: CreateTaskInput) => {
    if (editingTask) {
      updateTask(editingTask.id, {
        title: data.title,
        description: data.description,
        deadline: data.deadline,
      });
    } else {
      addTask(data);
    }
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleDelete = () => {
    if (editingTask) {
      deleteTask(editingTask.id);
      setIsFormOpen(false);
      setEditingTask(null);
    }
  };

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    const task = active.data.current?.task as Task | undefined;
    if (task) {
      setActiveTask(task);
    }
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const targetColumnId = over.id as ColumnId;

    // Only move if dropping on a different column
    const task = active.data.current?.task as Task | undefined;
    if (task && task.columnId !== targetColumnId) {
      moveTask(taskId, targetColumnId);
    }
  }, [moveTask]);

  // Screen reader announcements
  const announcements = {
    onDragStart({ active }: DragStartEvent) {
      const task = active.data.current?.task as Task | undefined;
      return `Picked up task: ${task?.title}`;
    },
    onDragOver({ active, over }: { active: { data: { current?: { task?: Task } } }; over: { data: { current?: { column?: { title: string } } } } | null }) {
      const task = active.data.current?.task;
      const column = over?.data.current?.column;
      if (column) {
        return `Task ${task?.title} is over ${column.title} column`;
      }
      return '';
    },
    onDragEnd({ active, over }: DragEndEvent) {
      const task = active.data.current?.task as Task | undefined;
      const column = over?.data.current?.column as { title: string } | undefined;
      if (column) {
        return `Dropped task ${task?.title} in ${column.title} column`;
      }
      return `Task ${task?.title} was dropped`;
    },
    onDragCancel({ active }: { active: { data: { current?: { task?: Task } } } }) {
      const task = active.data.current?.task;
      return `Dragging cancelled. Task ${task?.title} was dropped.`;
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="border-b bg-background px-6 py-4">
        <h1 className="text-2xl font-bold">FocusHelper</h1>
        <p className="text-sm text-muted-foreground">
          Organize your tasks, meetings, and backburner items. Drag tasks between columns.
        </p>
      </header>

      <main className="flex-1 overflow-x-auto p-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          accessibility={{
            announcements,
            screenReaderInstructions: {
              draggable: 'Press space or enter to pick up. Use arrow keys to move between columns. Press space or enter to drop. Press escape to cancel.',
            },
          }}
        >
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 h-full min-h-0">
            {COLUMNS.map((column) => (
              <TaskColumn
                key={column.id}
                column={column}
                tasks={getTasksByColumn(column.id)}
                onAddTask={() => handleAddTask(column.id)}
                onTaskClick={handleTaskClick}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTask ? (
              <TaskCard task={activeTask} isDragging />
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>

      <TaskForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        onDelete={editingTask ? handleDelete : undefined}
        columnId={selectedColumnId}
        task={editingTask}
      />
    </div>
  );
}
