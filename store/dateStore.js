import { Subject } from "./observer.js";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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

  getYear() {
    return this.date.getFullYear();
  }

  getMonth() {
    return this.date.getMonth() + 1;
  }

  getDay() {
    return this.date.getDate();
  }

  getMonthName() {
    return MONTH_NAMES[this.date.getMonth()];
  }

  goToNextMonth() {
    const newDate = new Date(this.date);
    newDate.setMonth(newDate.getMonth() + 1);
    this.setDate(newDate);
  }

  goToPreviousMonth() {
    const newDate = new Date(this.date);
    newDate.setMonth(newDate.getMonth() - 1);
    this.setDate(newDate);
  }
}
