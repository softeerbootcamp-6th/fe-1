import Observer from "../../utils/observers/Observer.js";
import transactionState from "../subjects/TransactionState.js";

export class MonthObserver extends Observer {
  update(monthInfo) {
    transactionState.loadMonthData(`${monthInfo.year}-${monthInfo.month}`);
  }
}
