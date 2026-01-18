import { forwardRef } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Task } from '@/types/task';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  isDragging?: boolean;
}

export const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(
  function TaskCard({ task, onClick, isDragging }, ref) {
    return (
      <Card
        ref={ref}
        className={cn(
          "cursor-pointer hover:shadow-md transition-shadow",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isDragging && "opacity-50 shadow-lg"
        )}
        onClick={onClick}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        role="button"
        aria-label={`Task: ${task.title}`}
        aria-roledescription="draggable task"
      >
        <CardContent className="p-4">
          <h3 className="font-medium text-sm line-clamp-2">{task.title}</h3>
          {task.deadline && (
            <p className="text-xs text-muted-foreground mt-2">
              Due: {new Date(task.deadline).toLocaleDateString()}
            </p>
          )}
          {task.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
        </CardContent>
      </Card>
    );
  }
);

interface DraggableTaskCardProps {
  task: Task;
  onClick?: () => void;
}

export function DraggableTaskCard({ task, onClick }: DraggableTaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { task },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <TaskCard task={task} onClick={onClick} isDragging={isDragging} />
    </div>
  );
}
