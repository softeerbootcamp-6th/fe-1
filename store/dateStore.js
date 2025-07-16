import { Subject } from "./observer.js";

export class DateStore extends Subject {
  constructor() {
    super();
    this.date = new Date();
  }

  getDate() {
    return this.date;
  }

  setDate(date) {
    this.date = date;
    this.notify(this.date);
  }
}
