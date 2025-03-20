export const displayTaskStatuses = (queue: any, intervalMs: number = 100): void => {
  const interval = setInterval(() => {
    console.clear();
    console.log('📌 Текущие состояния задач:');
    console.table(queue.getAllTasks());

    const allDone = queue
      .getAllTasks()
      .every((t: any) => ['completed', 'canceled', 'timeout', 'failed'].includes(t.status));
    if (allDone) {
      clearInterval(interval);
      console.log('✅ Все задачи завершены!');
    }
  }, intervalMs);
}