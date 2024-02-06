import {Application, IApplication} from '@/core/System/applications/application';

import type { Task } from '../taskManager';
import { TaskManager } from '../taskManager';
import Config from './prebuilt-app.json';

export class ApplicationManager {
  private applications: Map<string, IApplication> = new Map();
  private taskManager: TaskManager;

  constructor(taskManager: TaskManager) {
    this.taskManager = taskManager;
  }

  installApplication(app: IApplication): void {
    if (!app.shouldUseComponentName) {
      throw new Error("One application should corresponds to one component.");
    }

    if (this.applications.has(app.id)) {
      throw new Error("The application is already installed.");
    }

    this.applications.set(app.id, app);
  }

  installBuiltInAppFromConfigFile(): void {
    const typedConfig = Config as unknown as Record<string, IApplication[]>;
    Object.keys(typedConfig).forEach((key) => {
      const category = typedConfig[key];

      category.forEach((app: IApplication) => {
        this.installApplication(new Application(app));
      });
    });
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

  getApplicationById(id: string): IApplication | undefined {
    return this.applications.get(id);
  }

  getApplications(ids: string[]): IApplication[] {
    return ids.map(id => this.getApplicationById(id)).filter(app => app !== undefined) as IApplication[];
  }
}
