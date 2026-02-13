import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, GripVertical } from 'lucide-react';
import { Task } from '@/types/kanban';
import { useKanbanStore } from '@/store/kanbanStore';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const deleteTask = useKanbanStore((s) => s.deleteTask);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { task } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task-card group flex items-center gap-2 ${
        isDragging ? 'task-card-dragging z-50' : ''
      }`}
    >
      <button
        className="shrink-0 text-muted-foreground/40 hover:text-muted-foreground cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={16} />
      </button>
      <span className="flex-1 text-sm font-medium text-foreground truncate">
        {task.title}
      </span>
      <button
        onClick={() => deleteTask(task.id)}
        className="shrink-0 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
};

export default TaskCard;
