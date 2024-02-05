import { IApplication } from '@/core/System/applications/application';

import type { Task } from '../taskManager';
import { TaskManager } from '../taskManager';

export class ApplicationManager {
  private applications: Map<string, IApplication> = new Map();
  private taskManager: TaskManager;

  constructor(taskManager: TaskManager) {
    this.taskManager = taskManager;
  }

  installApplication(app: IApplication): void {
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

  listApplications(): IApplication[] {
    return Array.from(this.applications.values());
  }
}
