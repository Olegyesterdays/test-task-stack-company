import { AsyncTaskQueue } from './structure/asyncTaskQueue';
import { displayTaskStatuses } from './utils/displayTaskStatuses';

// === Пример использования ===
const queue = new AsyncTaskQueue(2);

queue.addTask(
  'task1',
  async () => {
    await new Promise(res => setTimeout(res, 10000));
  },
  3
);

queue.addTask(
  'task2',
  async () => {
    await new Promise(res => setTimeout(res, 5000));
  },
  9
);

queue.addTask(
  'task3',
  async () => {
    await new Promise(res => setTimeout(res, 7000));
  },
  5,
  ['task2']
);

queue.addTask(
  'task4',
  async () => {
    await new Promise(res => setTimeout(res, 6000));
  },
  7,
  ['task1', 'task3'],
  800
);

displayTaskStatuses(queue);
queue.runTasks();
