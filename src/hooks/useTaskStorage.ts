import { useState, useEffect, useCallback } from 'react';
import { Task, ColumnId, CreateTaskInput, UpdateTaskInput } from '@/types/task';

const STORAGE_KEY = 'focushelper-tasks';

function generateId(): string {
  return crypto.randomUUID();
}

function loadTasksFromStorage(): Task[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
  }
  return [];
}

function saveTasksToStorage(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
}

export interface UseTaskStorageReturn {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  addTask: (input: CreateTaskInput) => Task;
  updateTask: (id: string, updates: UpdateTaskInput) => Task | null;
  deleteTask: (id: string) => boolean;
  moveTask: (id: string, targetColumnId: ColumnId) => Task | null;
  getTasksByColumn: (columnId: ColumnId) => Task[];
}

export function useTaskStorage(): UseTaskStorageReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const loadedTasks = loadTasksFromStorage();
      setTasks(loadedTasks);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveTasksToStorage(tasks);
    }
  }, [tasks, isLoading]);

  const addTask = useCallback((input: CreateTaskInput): Task => {
    if (!input.title || input.title.trim() === '') {
      throw new Error('Title is required');
    }
    if (input.title.length > 500) {
      throw new Error('Title must be 500 characters or less');
    }

    const now = new Date().toISOString();
    const newTask: Task = {
      id: generateId(),
      title: input.title.trim(),
      description: input.description?.trim(),
      deadline: input.deadline,
      columnId: input.columnId,
      createdAt: now,
      updatedAt: now,
    };

    setTasks((prev) => [...prev, newTask]);
    return newTask;
  }, []);

  const updateTask = useCallback((id: string, updates: UpdateTaskInput): Task | null => {
    let updatedTask: Task | null = null;

    if (updates.title !== undefined && updates.title.trim() === '') {
      throw new Error('Title is required');
    }
    if (updates.title && updates.title.length > 500) {
      throw new Error('Title must be 500 characters or less');
    }

    setTasks((prev) => {
      const index = prev.findIndex((t) => t.id === id);
      if (index === -1) {
        return prev;
      }

      const task = prev[index];
      updatedTask = {
        ...task,
        ...(updates.title !== undefined && { title: updates.title.trim() }),
        ...(updates.description !== undefined && {
          description: updates.description === null ? undefined : updates.description?.trim(),
        }),
        ...(updates.deadline !== undefined && {
          deadline: updates.deadline === null ? undefined : updates.deadline,
        }),
        ...(updates.columnId !== undefined && { columnId: updates.columnId }),
        updatedAt: new Date().toISOString(),
      };

      const newTasks = [...prev];
      newTasks[index] = updatedTask;
      return newTasks;
    });

    return updatedTask;
  }, []);

  const deleteTask = useCallback((id: string): boolean => {
    let found = false;
    setTasks((prev) => {
      const index = prev.findIndex((t) => t.id === id);
      if (index === -1) {
        return prev;
      }
      found = true;
      return prev.filter((t) => t.id !== id);
    });
    return found;
  }, []);

  const moveTask = useCallback((id: string, targetColumnId: ColumnId): Task | null => {
    return updateTask(id, { columnId: targetColumnId });
  }, [updateTask]);

  const getTasksByColumn = useCallback((columnId: ColumnId): Task[] => {
    return tasks.filter((t) => t.columnId === columnId);
  }, [tasks]);

  return {
    tasks,
    isLoading,
    error,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByColumn,
  };
}
