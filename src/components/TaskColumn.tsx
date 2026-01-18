import { useDroppable } from '@dnd-kit/core';
import { Task, Column } from '@/types/task';
import { DraggableTaskCard } from './TaskCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskColumnProps {
  column: Column;
  tasks: Task[];
  onAddTask: () => void;
  onTaskClick: (task: Task) => void;
}

export function TaskColumn({ column, tasks, onAddTask, onTaskClick }: TaskColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
    data: { column },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col bg-muted/50 rounded-lg p-4 min-w-0 md:min-w-[300px] md:flex-1 transition-colors",
        isOver && "bg-muted ring-2 ring-primary ring-offset-2"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">{column.title}</h2>
        <span className="text-sm text-muted-foreground">{tasks.length}</span>
      </div>

      <Button
        variant="outline"
        className="w-full mb-4"
        onClick={onAddTask}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Task
      </Button>

      <div className="flex-1 overflow-y-auto space-y-3">
        {tasks.map((task) => (
          <DraggableTaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task)}
          />
        ))}

        {tasks.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            No tasks yet
          </p>
        )}
      </div>
    </div>
  );
}
