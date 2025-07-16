// stores/MonthState.js
import Subject from "../../utils/observers/Subject.js";

const MONTH_NAMES = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

class MonthState extends Subject {
  constructor() {
    super();
    this.currentDate = new Date();
  }

  getMonthInfo() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    return {
      year,
      month: String(month + 1).padStart(2, "0"),
      monthText: MONTH_NAMES[month],
    };
  }

  /**
   * 특정 월 설정 (yyyy-mm 형식)
   * @param {string} monthStr
   */
  setMonth(monthStr) {
    const [year, month] = monthStr.split("-").map(Number);
    this.currentDate = new Date(year, month - 1);
    this.notify(this.getMonthInfo());
  }

  goToNextMonth() {
    const y = this.currentDate.getFullYear();
    const m = this.currentDate.getMonth();
    this.currentDate = new Date(y, m + 1);
    this.notify(this.getMonthInfo());
  }

  goToPreviousMonth() {
    const y = this.currentDate.getFullYear();
    const m = this.currentDate.getMonth();
    this.currentDate = new Date(y, m - 1);
    this.notify(this.getMonthInfo());
  }
}

const monthState = new MonthState();
export default monthState;
