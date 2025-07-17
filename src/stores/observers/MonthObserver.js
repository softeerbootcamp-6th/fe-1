import { Observer } from "../../utils/index.js";
import transactionState from "../subjects/TransactionState.js";

class MonthObserver extends Observer {
  update(monthInfo) {
    transactionState.loadMonthData(`${monthInfo.year}-${monthInfo.month}`);
  }
}

export default MonthObserver;
