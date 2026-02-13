import { create } from 'zustand';
import { Task, TaskStatus } from '@/types/kanban';
import { mockApi } from '@/utils/mockApi';
import { toast } from 'sonner';

interface KanbanState {
  tasks: Task[];
  pendingOps: Set<string>;
  addTask: (title: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
  deleteTask: (taskId: string) => void;
}

let idCounter = 0;
const genId = () => `task-${Date.now()}-${++idCounter}`;

// Load tasks from localStorage
const loadTasks = (): Task[] => {
  try {
    const saved = localStorage.getItem('kanban_tasks');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem('kanban_tasks', JSON.stringify(tasks));
};

export const useKanbanStore = create<KanbanState>((set, get) => ({
  tasks: loadTasks(),
  pendingOps: new Set<string>(),

  addTask: (title: string) => {
    const task: Task = { id: genId(), title, status: 'todo' };
    const opId = `add-${task.id}`;

    // Optimistic update
    set((state) => {
      const newTasks = [...state.tasks, task];
      saveTasks(newTasks);
      return { tasks: newTasks, pendingOps: new Set([...state.pendingOps, opId]) };
    });

    // API call
    mockApi.addTask(task).then(() => {
      set((state) => {
        const ops = new Set(state.pendingOps);
        ops.delete(opId);
        return { pendingOps: ops };
      });
    }).catch(() => {
      // Rollback
      set((state) => {
        const newTasks = state.tasks.filter((t) => t.id !== task.id);
        saveTasks(newTasks);
        const ops = new Set(state.pendingOps);
        ops.delete(opId);
        return { tasks: newTasks, pendingOps: ops };
      });
      toast.error('Failed to add task. It has been removed.');
    });
  },

  moveTask: (taskId: string, newStatus: TaskStatus) => {
    const prevTasks = get().tasks;
    const task = prevTasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    const opId = `move-${taskId}-${Date.now()}`;

    // Optimistic update
    set((state) => {
      const newTasks = state.tasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      );
      saveTasks(newTasks);
      return { tasks: newTasks, pendingOps: new Set([...state.pendingOps, opId]) };
    });

    mockApi.moveTask(taskId, newStatus).then(() => {
      set((state) => {
        const ops = new Set(state.pendingOps);
        ops.delete(opId);
        return { pendingOps: ops };
      });
    }).catch(() => {
      // Rollback
      set((state) => {
        saveTasks(prevTasks);
        const ops = new Set(state.pendingOps);
        ops.delete(opId);
        return { tasks: prevTasks, pendingOps: ops };
      });
      toast.error('Failed to move task. Reverting changes.');
    });
  },

  deleteTask: (taskId: string) => {
    const prevTasks = get().tasks;
    const opId = `delete-${taskId}-${Date.now()}`;

    // Optimistic update
    set((state) => {
      const newTasks = state.tasks.filter((t) => t.id !== taskId);
      saveTasks(newTasks);
      return { tasks: newTasks, pendingOps: new Set([...state.pendingOps, opId]) };
    });

    mockApi.deleteTask(taskId).then(() => {
      set((state) => {
        const ops = new Set(state.pendingOps);
        ops.delete(opId);
        return { pendingOps: ops };
      });
    }).catch(() => {
      // Rollback
      set((state) => {
        saveTasks(prevTasks);
        const ops = new Set(state.pendingOps);
        ops.delete(opId);
        return { tasks: prevTasks, pendingOps: ops };
      });
      toast.error('Failed to delete task. It has been restored.');
    });
  },
}));
