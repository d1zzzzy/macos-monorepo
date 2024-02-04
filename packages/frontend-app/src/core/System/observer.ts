export type ObserverCallback<T> = (data?: T) => void;

export type EventType = string | number | symbol;

export class Observable<T> {
  private observers: { [key: EventType]: ObserverCallback<T>[] } = {};

  // 订阅事件
  subscribe(eventName: EventType, callback: ObserverCallback<T>): void {
    if (!this.observers[eventName]) {
      this.observers[eventName] = [];
    }
    this.observers[eventName].push(callback);
  }

  // 取消订阅事件
  unsubscribe(eventName: EventType, callback: ObserverCallback<T>): void {
    if (this.observers[eventName]) {
      const index = this.observers[eventName].indexOf(callback);
      if (index !== -1) {
        this.observers[eventName].splice(index, 1);
      }
    }
  }

  // 触发事件
  notify(eventName: EventType, data?: T): void {
    if (this.observers[eventName]) {
      for (const observer of this.observers[eventName]) {
        observer(data);
      }
    }
  }
}
