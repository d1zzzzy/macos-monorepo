export enum LifeCircle {
  // 任何属性的变化，触发附带的信息包括 <属性名,当前值,上一次值>
  Change,

  // 系统状态改变
  Start,
  Stop,
  Pause,
  Resume,
  Restart,
  Shutdown,
}
