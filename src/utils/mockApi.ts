import { Task, TaskStatus } from '@/types/kanban';

const FAILURE_RATE = 0.2;
const MIN_DELAY = 1000;
const MAX_DELAY = 2000;

function randomDelay(): number {
  return MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY);
}

function shouldFail(): boolean {
  return Math.random() < FAILURE_RATE;
}

function simulate<T>(data: T): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail()) {
        reject(new Error('API request failed. Please try again.'));
      } else {
        resolve(data);
      }
    }, randomDelay());
  });
}

export const mockApi = {
  addTask: (task: Task) => simulate(task),
  moveTask: (taskId: string, newStatus: TaskStatus) =>
    simulate({ taskId, newStatus }),
  deleteTask: (taskId: string) => simulate({ taskId }),
};
