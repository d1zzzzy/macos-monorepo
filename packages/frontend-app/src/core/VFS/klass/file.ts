export abstract class FileSystemEntity {
  name: string;
  parent: Directory | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(name: string, parent: Directory | null) {
    this.name = name;
    this.parent = parent;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  abstract getPath(): string;
  abstract getSize(): number;
}

export class File extends FileSystemEntity {
  content: string;

  constructor(name: string, parent: Directory | null, content: string = "") {
    super(name, parent);
    this.content = content;
  }

  getPath(): string {
    return this.parent ? `${this.parent.getPath()}/${this.name}` : this.name;
  }

  getSize(): number {
    return this.content.length;
  }

  write(content: string) {
    this.content = content;
    this.updatedAt = new Date();
  }

  read(): string {
    return this.content;
  }
}

export class Directory extends FileSystemEntity {
  children: FileSystemEntity[] = [];

  constructor(name: string, parent: Directory | null) {
    super(name, parent);
  }

  getPath(): string {
    return this.parent ? `${this.parent.getPath()}/${this.name}` : this.name;
  }

  getSize(): number {
    return this.children.reduce((size, child) => size + child.getSize(), 0);
  }

  addEntity(entity: FileSystemEntity) {
    const index = this.children.findIndex(
      (child) => child.name === entity.name
    );
    if (index !== -1) {
      throw new Error("An entity with the same name already exists.");
    }
    this.children.push(entity);
    entity.parent = this;
  }

  removeEntity(entityName: string) {
    const index = this.children.findIndex((child) => child.name === entityName);
    if (index === -1) {
      throw new Error("Entity not found.");
    }
    this.children.splice(index, 1);
  }

  findEntity(name: string): FileSystemEntity | undefined {
    return this.children.find((child) => child.name === name);
  }
}

