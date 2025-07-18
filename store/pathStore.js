import { Subject } from "./observer.js";

export class PathStore extends Subject {
  constructor() {
    super();
    this.path = window.location.pathname;
  }

  getPath() {
    return this.path;
  }

  setPath(path) {
    this.path = path;
    this.notify(this.path);
  }
}
