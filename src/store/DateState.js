import Observable from "./Observable.js";
import { getDateYMD } from "../utils/date.js";
import FormState from "./FormState.js";

class DateState extends Observable {
  constructor() {
    super();
    this.curDate = getDateYMD(new Date());
  }
  setDate(newDate) {
    this.curDate = newDate;
    FormState.setDate(newDate);
    this.notify();
  }
  getDate() {
    return this.curDate;
  }
}

export default new DateState();
