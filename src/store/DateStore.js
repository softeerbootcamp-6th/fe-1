import { DAY, MONTH } from "../constants/date.js";
import { Store } from "./store.js";

class DateStore extends Store {
  constructor(initData) {
    super(initData);
  }

  static parseMonthToEng(month) {
    return MONTH[month - 1];
  }

  static parseDateToDay(date) {
    const dayIdx = new Date(date).getDay();
    const day = DAY[dayIdx];
    return day;
  }

  static parseDateToYYYYMMDD(date) {}

  #increaseMonth() {
    const { year, month } = this.data;
    let newMonth = month + 1;
    let newYear = year;
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    this.data = { year: newYear, month: newMonth };
  }

  #decreaseMonth() {
    const { year, month } = this.data;
    let newMonth = month - 1;
    let newYear = year;
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
    this.data = { year: newYear, month: newMonth };
  }

  dispatch(type) {
    switch (type) {
      case "increaseMonth": {
        this.#increaseMonth();
        break;
      }
      case "decreaseMonth": {
        this.#decreaseMonth();
        break;
      }
    }

    this.notify();
  }
}

const now = new Date();
const initialDate = {
  year: now.getFullYear(),
  month: now.getMonth() + 1,
};

export const dateStore = new DateStore(initialDate);
export { DateStore };
