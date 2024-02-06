export interface IApplication {
  /*  应用基础信息  */
  id: string; // 应用ID
  name: string; // 应用名字
  icon: string; // 对应的图标
  // 更多的应用相关属性，例如版本、依赖等
  version?: string;
  type?: number;
  description?: string;
  permissions?: number;

  /* 日期时间相关的属性 */
  lastUseTime?: number; // 最近一次使用时间


  /*  应用安装  */
  shouldUseComponentName: string; // 应该使用的组件名字
}

export class Application {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _icon: string;
  private readonly _version?: string;
  private readonly _type?: number;
  private readonly _description?: string;
  private readonly _permissions?: number;
  private _shouldUseComponentName: string;

  constructor(app: IApplication) {
    this._id = app.id;
    this._name = app.name;
    this._icon = app.icon;
    this._version = app.version;
    this._type = app.type;
    this._description = app.version;
    this._permissions = app.permissions;
    this._shouldUseComponentName = app.shouldUseComponentName ?? '';
  }

  /* RelationShip */

  connect(name: string) {
    this._shouldUseComponentName = name;
  }

  /* Getters */
  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get icon(): string {
    return this._icon;
  }

  get version(): string | undefined {
    return this._version;
  }

  get shouldUseComponentName(): string {
    return this._shouldUseComponentName;
  }
}
