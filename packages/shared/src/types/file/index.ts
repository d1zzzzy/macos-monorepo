interface Desktop {
  wallpaper: string;
  icons: Icon[];
  windows: Window[];
  // Other desktop related properties...
}

interface Icon {
  id: string;
  name: string;
  type: "file" | "folder";
  path: string;
  iconImage: string;
  // Other metadata like creation date, modification date etc...
}

interface Window {
  id: string;
  content: Folder | File;
  position: Position;
  size: Size;
  state: "open" | "minimized" | "maximized";
  // Other window related properties...
}

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface File {
  id: string;
  path: string;
  name: string;
  fileType: string;
  size: number;
}

interface Folder {
  id: string;
  name: string;
  path: string;
  children: Array<File | Folder>;
  // Folder-specific properties...
}
