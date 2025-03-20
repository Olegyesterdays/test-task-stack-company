export type TaskStatus = 'pending' | 'running' | 'canceled' | 'timeout' | 'completed' | 'failed' | 'cancelled';

export type TaskWithDependencies = {
  id: string;
  task: () => Promise<any>;
  priority: number;
  dependencies: string[];
  status: TaskStatus;
  timeoutMs?: number;
};
