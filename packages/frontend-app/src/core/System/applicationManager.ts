import type { Task } from './taskManager';
import { TaskManager } from './taskManager';

export interface Application {
  id: string;
  name: string;
  // 更多的应用相关属性，例如版本、依赖等
}

export class ApplicationManager {
  private applications: Map<string, Application> = new Map();
  private taskManager: TaskManager;

  constructor(taskManager: TaskManager) {
    this.taskManager = taskManager;
  }

  installApplication(app: Application): void {
    if (this.applications.has(app.id)) {
      throw new Error("Application is already installed.");
    }
    this.applications.set(app.id, app);
  }

  runApp(appId: string): Task {
    const app = this.applications.get(appId);
    if (!app) {
      throw new Error("Application not found.");
    }
    return this.taskManager.createTask(app.name);
  }

  removeApplication(appId: string): void {
    if (!this.applications.has(appId)) {
      throw new Error("Application not found.");
    }
    this.applications.delete(appId);
  }

  listApplications(): Application[] {
    return Array.from(this.applications.values());
  }
}
