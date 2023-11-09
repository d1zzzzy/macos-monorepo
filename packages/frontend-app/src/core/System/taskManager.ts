export interface Task {
  id: number;
  name: string;
  // 这里可以根据需要定义更多属性，例如任务状态、优先级等
}

export class TaskManager {
  private static lastId = 0;
  private tasks: Map<number, Task> = new Map();

  createTask(name: string): Task {
    const id = TaskManager.lastId++;
    const task: Task = { id, name };
    this.tasks.set(id, task);
    return task;
  }

  killTask(taskId: number): boolean {
    if (!this.tasks.has(taskId)) {
      return false;
    }
    this.tasks.delete(taskId);
    return true;
  }

  listTasks(): Task[] {
    return Array.from(this.tasks.values());
  }
}