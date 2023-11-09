import type { Application } from "./applicationManager";
import { VirtualFileSystem } from "../VFS/class/VirtualFileSystem";
import { ApplicationManager } from "./applicationManager";
import { TaskManager } from "./taskManager";
import { SystemState } from './constants/status';

interface User {
  id: string;
  username: string;
  // 可以根据需求添加更多用户属性
}

interface SystemSettings {
  theme?: string; // 如 'light' 或 'dark'
  language?: string; // 如 'en-US', 'zh-CN'
  // 可以添加更多系统设置
}


export class System {
  private vfs: VirtualFileSystem | null = null;
  private taskManager: TaskManager | null = null;
  private appManager: ApplicationManager | null = null;
  private currentUser: User | null = null; // 当前登录用户
  private settings: SystemSettings | null = null; // 系统设置
  private activeWindows: Set<number> | null = null; // 当前活动窗口的ID集合
  private state: SystemState = SystemState.Off;

  constructor() {
    // 初始化代码...
    this.start();
  }

  // 系统状态控制方法
  start() {
    if (this.state === SystemState.Off) {
      this.state = SystemState.Starting;
      // 这里可以添加启动所需的初始化流程
      // 比如初始化VFS、加载系统设置等
      setTimeout(() => {
        this.vfs = new VirtualFileSystem();
        this.taskManager = new TaskManager();
        this.appManager = new ApplicationManager(this.taskManager);
        this.settings = {
          theme: "light",
          language: "en-US",
        };
        this.activeWindows = new Set();
        this.state = SystemState.Running;
        // 触发系统启动完成的事件
      }, 1000); // 假设启动过程需要1秒钟
    }
  }

  suspend() {
    if (this.state === SystemState.Running) {
      this.state = SystemState.Suspended;
      // 执行挂起状态时需要的操作，比如保存状态到localStorage
    }
  }

  resume() {
    if (this.state === SystemState.Suspended) {
      this.state = SystemState.Running;
      // 执行恢复操作，可能需要重新加载一些状态
    }
  }

  shutdown() {
    if (
      this.state === SystemState.Running ||
      this.state === SystemState.Suspended
    ) {
      this.state = SystemState.ShuttingDown;
      // 执行关闭之前的清理工作，比如保存工作状态
      setTimeout(() => {
        this.state = SystemState.Off;
        // 触发系统关闭的事件
      }, 1000); // 假设关闭过程需要1秒钟
    }
  }

  // 获取当前系统状态
  getState(): SystemState {
    return this.state;
  }

  // 根据当前系统状态执行或拒绝操作
  executeOperation(operation: () => void) {
    if (this.state === SystemState.Running) {
      operation();
    } else {
      console.error("System is not in a state to execute operations.");
    }
  }

  // 登录和注销的方法
  login(user: User): void {
    this.currentUser = user;
  }

  logout(): void {
    this.currentUser = null;
    this.activeWindows?.clear();
    // 可以添加更多注销时需要清理的状态
  }

  // 系统设置相关方法
  updateSettings(newSettings: Partial<SystemSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
  }

  getSettings(): SystemSettings {
    return this.settings || {
      theme: 'light',
      language: 'zh-CN',
    };
  }

  // 窗口管理相关方法
  openWindow(windowId: number): void {
    this.activeWindows?.add(windowId);
  }

  closeWindow(windowId: number): void {
    this.activeWindows?.delete(windowId);
  }

  getActiveWindows(): number[] {
    return this.activeWindows ? Array.from(this.activeWindows) : [];
  }

  // 文件系统代理方法
  createFile(path: string, content: string) {
    return this.vfs?.createFile(path, content);
  }

  createDirectory(path: string) {
    return this.vfs?.createDirectory(path);
  }

  // 更多文件系统相关的代理方法...

  // 应用管理代理方法
  installApplication(app: Application) {
    this.appManager?.installApplication(app);
  }

  runApp(appId: string) {
    return this.appManager?.runApp(appId);
  }

  removeApplication(appId: string) {
    this.appManager?.removeApplication(appId);
  }

  // 任务管理代理方法
  killTask(taskId: number) {
    return this.taskManager?.killTask(taskId);
  }

  listTasks() {
    return this.taskManager?.listTasks();
  }

  // 更多系统级方法...
}
