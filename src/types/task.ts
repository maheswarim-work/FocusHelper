export type ColumnId = 'tasks' | 'meetings' | 'backburner';

export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  columnId: ColumnId;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: ColumnId;
  title: string;
}

export const COLUMNS: Column[] = [
  { id: 'tasks', title: 'Tasks' },
  { id: 'meetings', title: 'Meetings' },
  { id: 'backburner', title: 'Backburner' },
];

export interface CreateTaskInput {
  title: string;
  description?: string;
  deadline?: string;
  columnId: ColumnId;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  deadline?: string | null;
  columnId?: ColumnId;
}
