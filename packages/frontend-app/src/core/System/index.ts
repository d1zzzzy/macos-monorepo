import type { IApplication } from "./applications/application";
import { ApplicationManager } from "./applications/applicationManager";
import { VirtualFileSystem } from "../VFS/klass/VirtualFileSystem";
import { TaskManager } from "./taskManager";
import { SystemState } from './constants/status';
import { EvtNames } from "./constants/events";
import { Observable, type EventType } from './observer';
import {LifeCircle} from "@/core/System/constants/lifecircle";

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
  private observer: Observable<any> = new Observable();
  private lifecycleHooks: Record<LifeCircle, Function[]> | null = null;
  private currentUser: User | null = null; // 当前登录用户
  private settings: SystemSettings | null = null; // 系统设置
  private _activeWindows: Set<number> | null = null; // 当前活动窗口的ID集合
  private _state: SystemState = SystemState.Off;
  private notActivate = true; // 系统未激活

  constructor() {
    // 初始化代码...
    this._state = SystemState.Off; // 默认关机
    this.initLifeCircleHooks();
  }

  initLifeCircleHooks() {
    this.lifecycleHooks = {
      [LifeCircle.Change]: [],
      [LifeCircle.Start]: [],
      [LifeCircle.Stop]: [],
      [LifeCircle.Pause]: [],
      [LifeCircle.Resume]: [],
      [LifeCircle.Restart]: [],
      [LifeCircle.Shutdown]: [],
    };
  }

  /**
   * getters
   */
  get state() {
    return this._state;
  }


  /**
   * setters
   */
  set state(value: SystemState) {
    if (value !== this._state) {
      this._state = value;
      this.observer.notify(EvtNames.STATE_CHANGE);
    }
  }

  subscribe(eventName: EventType, callback?: any) {
    this.observer.subscribe(eventName, callback);
  }

  unsubscribe(eventName: EventType, callback?: any) {
    this.observer.unsubscribe(eventName, callback);
  }

  // 系统状态控制方法
  start(config?: {
    onBefore?: () => void,
    onSucceed?: () => void,
    onFailed?: () => void,
  }) {
    const { onBefore, onSucceed, onFailed } = config || {};

    if (this.state === SystemState.Off) {
      // 启动前的回调
      onBefore && onBefore();

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
        this._activeWindows = new Set();
        this.state = SystemState.Running;

        // 触发系统启动完成的事件
        onSucceed && onSucceed();
      }, 3000); // 假设启动过程需要1.5秒钟
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

  // 根据当前系统状态执行或拒绝操作
  executeOperation(operation: () => void) {
    if (this.state === SystemState.Running) {
      operation();
    } else {
      console.error("System is not in a _state to execute operations.");
    }
  }

  get isNotLoginIn() {
    return this.isRunning && !this.currentUser;
  }
  // 登录和注销的方法
  login(user: User): void {
    this.currentUser = user;
  }

  logout(): void {
    this.currentUser = null;
    this._activeWindows?.clear();
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
    this._activeWindows?.add(windowId);
  }

  closeWindow(windowId: number): void {
    this._activeWindows?.delete(windowId);
  }

  get_activeWindows(): number[] {
    return this._activeWindows ? Array.from(this._activeWindows) : [];
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
  installApplication(app: IApplication) {
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

 // 从缓存中读取默认的数据并配置
  loadDataFromStorage() {

  }
  // 更多系统级方法...

  private triggerLifecycleHook(hook: EvtNames, ...args: any[]) {
    this.lifecycleHooks![hook]?.forEach(func => func(...args));
  }

  // 注册生命周期钩子函数
  on(hook: EvtNames, func: Function) {
    if (!this.lifecycleHooks![hook]) {
      this.lifecycleHooks![hook] = [];
    }
    this.lifecycleHooks![hook]!.push(func);
  }

  /**
   * 系统状态判断
   */
  get isOff(): boolean {
    return this.state === SystemState.Off;
  }

  get isStarting(): boolean {
    return this.state === SystemState.Starting;
  }

  get isNotActivate(): boolean {
    return this.state === SystemState.NotActivate;
  }

  get isRunning(): boolean {
    return this.state === SystemState.Running;
  }

  get isSuspended(): boolean {
    return this.state === SystemState.Suspended;
  }

  get isShuttingDown(): boolean {
    return this.state === SystemState.ShuttingDown;
  }
}
