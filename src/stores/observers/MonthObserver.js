import { Observer } from "../../utils/index.js";
import { transactionState, chartState } from "../subjects/index.js";

class MonthObserver extends Observer {
  update(monthInfo) {
    transactionState.loadMonthData(`${monthInfo.year}-${monthInfo.month}`);
    chartState.setSelectedCategory("");
  }
}

export default MonthObserver;
