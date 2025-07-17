import Observable from "./Observable.js";

function getCurrentYearMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

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
