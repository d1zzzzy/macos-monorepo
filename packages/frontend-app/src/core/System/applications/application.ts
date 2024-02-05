export interface IApplication {
  id: string; // 应用ID
  name: string; // 应用名字
  icon: string; // 对应的图标
  // 更多的应用相关属性，例如版本、依赖等
  version?: string;
}
