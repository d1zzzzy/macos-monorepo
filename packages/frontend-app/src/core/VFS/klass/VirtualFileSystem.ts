import { Directory, FileSystemEntity, File } from "./file";

export class VirtualFileSystem {
  root: Directory;

  constructor() {
    this.root = new Directory("/", null);
  }

  createFile(path: string, content: string): File {
    const { dir, name } = this.parsePath(path);
    const file = new File(name, dir);
    file.write(content);
    dir.addEntity(file);
    return file;
  }

  createDirectory(path: string): Directory {
    const { dir, name } = this.parsePath(path);
    const directory = new Directory(name, dir);
    dir.addEntity(directory);
    return directory;
  }

  removeEntity(path: string) {
    const { dir, name } = this.parsePath(path);
    dir.removeEntity(name);
  }

  getEntity(path: string): FileSystemEntity | undefined {
    const { dir, name } = this.parsePath(path);
    return dir.findEntity(name);
  }

  parsePath(path: string): { dir: Directory; name: string } {
    const segments = path.split("/").filter((p) => p.length);
    let current: Directory = this.root;
    for (let i = 0; i < segments.length - 1; i++) {
      const child = current.findEntity(segments[i]);
      if (!child || !(child instanceof Directory)) {
        throw new Error("Path does not exist.");
      }
      current = child;
    }
    return { dir: current, name: segments[segments.length - 1] };
  }
}
