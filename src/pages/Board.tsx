import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useKanbanStore } from '@/store/kanbanStore';
import { COLUMNS, Task, TaskStatus } from '@/types/kanban';
import KanbanColumn from '@/components/KanbanColumn';
import BoardHeader from '@/components/BoardHeader';

const Board = () => {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const { tasks, moveTask } = useKanbanStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  useEffect(() => {
    if (!user) navigate('/', { replace: true });
  }, [user, navigate]);

  if (!user) return null;

  const getColumnTasks = (status: TaskStatus) =>
    tasks.filter((t) => t.status === status);

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    let targetStatus: TaskStatus | null = null;

    // Check if dropped on a column
    if (COLUMNS.some((c) => c.id === over.id)) {
      targetStatus = over.id as TaskStatus;
    } else {
      // Dropped on another task — find that task's column
      const overTask = tasks.find((t) => t.id === over.id);
      if (overTask) targetStatus = overTask.status;
    }

    if (targetStatus) {
      moveTask(taskId, targetStatus);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <BoardHeader />
      <main className="flex-1 p-6 overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 md:gap-6 min-w-max md:min-w-0 md:justify-center">
            {COLUMNS.map((col) => (
              <KanbanColumn
                key={col.id}
                id={col.id}
                title={col.title}
                tasks={getColumnTasks(col.id)}
              />
            ))}
          </div>
          <DragOverlay>
            {activeTask ? (
              <div className="task-card task-card-dragging">
                <span className="text-sm font-medium text-foreground">
                  {activeTask.title}
                </span>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>
    </div>
  );
};

export default Board;
