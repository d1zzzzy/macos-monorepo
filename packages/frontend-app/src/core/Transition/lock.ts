import { Transaction } from './transition'

export enum LockType {
  READ = "READ",
  WRITE = "WRITE",
  BOTH = "BOTH",
}

export class Lock {
  private resource: string;
  private lockType: LockType;
  private transactionId: string;

  constructor(resource: string, lockType: LockType, transactionId: string) {
    this.resource = resource;
    this.lockType = lockType;
    this.transactionId = transactionId;
  }

  getResource(): string {
    return this.resource;
  }

  getLockType(): LockType {
    return this.lockType;
  }

  getTransactionId(): string {
    return this.transactionId;
  }
}

export class LockManager {
  private locks: Map<string, Lock[]> = new Map();

  acquireLock(
    transaction: Transaction,
    resource: string,
    lockType: LockType
  ): boolean {
    const currentLocks = this.locks.get(resource) || [];
    if (this.isLockable(currentLocks, lockType, transaction.getId())) {
      currentLocks.push(new Lock(resource, lockType, transaction.getId()));
      this.locks.set(resource, currentLocks);
      return true;
    }
    return false;
  }

  releaseLocks(transaction: Transaction): void {
    for (const [resource, lockList] of this.locks) {
      const remainingLocks = lockList.filter(
        (lock) => lock.getTransactionId() !== transaction.getId()
      );
      if (remainingLocks.length !== lockList.length) {
        this.locks.set(resource, remainingLocks);
      }
    }
  }

  private isLockable(
    currentLocks: Lock[],
    requestedLockType: LockType,
    transactionId: string
  ): boolean {
    for (const lock of currentLocks) {
      if (
        requestedLockType === LockType.WRITE ||
        lock.getLockType() === LockType.WRITE
      ) {
        if (lock.getTransactionId() !== transactionId) {
          return false; // Write locks are exclusive
        }
      }
    }
    return true; // Lock can be granted
  }

  // Additional methods for deadlock detection, lock escalation, etc...
}
