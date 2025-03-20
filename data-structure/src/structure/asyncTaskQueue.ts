import { TaskStatus, TaskWithDependencies } from "../types/type";

export class AsyncTaskQueue {
  private tasks: TaskWithDependencies[] = [];
  private taskMap: Map<string, TaskWithDependencies> = new Map();
  private maxConcurrentTasks: number;
  private activeTasks: number = 0;

  constructor(maxConcurrentTasks: number = 1) {
    if (maxConcurrentTasks < 1) throw new Error('Максимальное количество задач должно быть >= 1');
    this.maxConcurrentTasks = maxConcurrentTasks;
  }

  addTask(
    id: string,
    task: () => Promise<any>,
    priority: number = 5,
    dependencies: string[] = [],
    timeoutMs?: number
  ): void {
    if (priority < 1 || priority > 9) throw new Error('Приоритет должен быть от 1 до 9');
    if (this.taskMap.has(id)) throw new Error(`Задача с ID "${id}" уже существует`);

    const newTask: TaskWithDependencies = { id, task, priority, dependencies, status: 'pending', timeoutMs };
    this.tasks.push(newTask);
    this.taskMap.set(id, newTask);
  }

  getAllTasks(): { id: string; priority: number; dependencies: string; status: TaskStatus }[] {
    return this.tasks.map(({ id, priority, dependencies, status }) => ({
      id,
      priority,
      dependencies: dependencies.length > 0 ? dependencies.join(', ') : '-',
      status
    }));
  }

  async runTasks(): Promise<void> {
    while (this.tasks.some(t => t.status === 'pending')) {
      while (this.activeTasks < this.maxConcurrentTasks) {
        const availableTasks = this.tasks.filter(
          t =>
            t.status === 'pending' &&
            t.dependencies.every(dep => this.taskMap.get(dep)?.status === 'completed')
        );

        if (availableTasks.length === 0) {
          if (this.activeTasks === 0) console.error('Циклическая зависимость или невыполнимые задачи!');
          break;
        }

        availableTasks.sort((a, b) => b.priority - a.priority);
        const taskToRun = availableTasks.shift()!;
        this.activeTasks++;

        taskToRun.status = 'running';

        const taskPromise = taskToRun
          .task()
          .then(() => {
            taskToRun.status = 'completed';
          })
          .catch(() => {
            taskToRun.status = 'failed';
          })
          .finally(() => {
            this.activeTasks--;
            this.runTasks();
          });

        if (taskToRun.timeoutMs) {
          const timeoutPromise = new Promise<void>(resolve => {
            setTimeout(() => {
              if (taskToRun.status === 'running') taskToRun.status = 'timeout';
              resolve();
            }, taskToRun.timeoutMs);
          });

          Promise.race([taskPromise, timeoutPromise]).finally(() => {
            this.activeTasks--;
            this.runTasks();
          });
        }
      }
      await new Promise(res => setTimeout(res, 100));
    }
  }
}
