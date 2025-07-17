import { getCurrentYearMonth } from "../utils/date.js";
import Observable from "./Observable.js";

class FilterState extends Observable {
  constructor() {
    super();
    this.state = {
      withdraw: true,
      deposit: true,
      month: getCurrentYearMonth(),
    };
  }

  getFilter() {
    return { ...this.state };
  }

  setFilter(newFilter) {
    this.state = { ...this.state, ...newFilter };
    this.notify(this.state);
  }

  setMonth(yearMonth) {
    this.state.month = yearMonth;
    this.notify(this.state);
  }

  getMonth() {
    return this.state.month;
  }
}

export default new FilterState();
