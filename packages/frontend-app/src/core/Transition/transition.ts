import { LockManager, LockType } from './lock';

export interface ICommand {
  execute(): Promise<void>;
  undo(): Promise<void>;
}

export class Transaction {
  private id: string;
  private commands: ICommand[] = [];
  private executedCommands: number = 0;
  private status: "active" | "committed" | "rolled_back" = "active";
  private lockManager: LockManager;
  private resources: string[]; // 这里假设一个事务可能涉及多个资源

  constructor(id: string, lockManager: LockManager, resources?: string[]) {
    this.id = id;
    this.lockManager = lockManager;
    this.resources = resources ?? []; // 初始化时指定该事务涉及的资源列表
  }

  // 调用这个方法来添加资源到事务
  addResource(resource: string) {
    this.resources.push(resource);
  }

  clearResources() {
    this.resources = [];
  }

  async start() {
    // 尝试为事务涉及的每个资源获取锁
    for (const resource of this.resources) {
      const lockAcquired = this.lockManager.acquireLock(
        this,
        resource,
        LockType.WRITE
      );
      if (!lockAcquired) {
        // 如果无法获取锁，则可能需要回滚已经获取的锁或者等待重试
        throw new Error(
          `Unable to acquire lock on resource ${resource}, transaction cannot proceed.`
        );
      }
    }
    // 其他初始化逻辑...
  }

  async executeCommand(command: ICommand) {
    if (this.status !== "active") {
      throw new Error(`Transaction is not active.`);
    }
    await command.execute();
    this.commands.push(command);
    this.executedCommands++;
    // Persist command execution to log
  }

  async commit() {
    // Additional logic for persistence
    this.status = "committed";
    this.lockManager.releaseLocks(this); // Release locks after commit
  }

  async rollback() {
    while (this.executedCommands > 0) {
      const command = this.commands[--this.executedCommands];
      await command.undo();
      this.lockManager.releaseLocks(this); // Release locks after rollback
      // Persist command rollback to log
    }
    this.status = "rolled_back";
    // Additional logic for persistence
  }

  getId(): string {
    return this.id;
  }

  getStatus(): string {
    return this.status;
  }
}
