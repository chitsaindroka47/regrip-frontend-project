import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task, TaskStatus } from '@/types/kanban';
import TaskCard from './TaskCard';
import AddTaskInput from './AddTaskInput';

interface KanbanColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}

const accentColors: Record<TaskStatus, string> = {
  'todo': 'bg-primary',
  'in-progress': 'bg-amber-500',
  'done': 'bg-emerald-500',
};

const KanbanColumn = ({ id, title, tasks }: KanbanColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="flex flex-col gap-3 min-w-[280px] w-full md:w-80">
      <div className="flex items-center gap-2 px-1">
        <div className={`w-2 h-2 rounded-full ${accentColors[id]}`} />
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        <span className="text-xs text-muted-foreground ml-auto">{tasks.length}</span>
      </div>

      <div
        ref={setNodeRef}
        className={`kanban-column flex flex-col gap-2 flex-1 transition-colors duration-200 ${
          isOver ? 'drop-indicator' : ''
        }`}
      >
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>

        {tasks.length === 0 && !isOver && (
          <p className="text-xs text-muted-foreground text-center py-8">
            No tasks yet
          </p>
        )}

        {id === 'todo' && <AddTaskInput />}
      </div>
    </div>
  );
};

export default KanbanColumn;
