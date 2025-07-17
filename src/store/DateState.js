import Observable from "./Observable.js";
import { getDateYMD } from "../utils/date.js";

class DateState extends Observable {
  constructor() {
    super();
    this.curDate = getDateYMD(new Date());
  }
  setDate(newDate) {
    this.curDate = newDate;
    this.notify();
  }
  getDate() {
    return this.curDate;
  }
}

export default new DateState();
