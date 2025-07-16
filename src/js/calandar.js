import transactionState from "../stores/subjects/TransactionState.js";
import monthState from "../stores/subjects/MonthState.js";
import { CalandarView } from "../views/Calandar/calandarView.js";
import { CalandarObserver } from "../stores/observers/CalandarObserver.js";

const init = async () => {
  const { year, month } = monthState.getMonthInfo();
  const calandarView = new CalandarView();
  const calandarObserver = new CalandarObserver(calandarView);
  transactionState.subscribe(calandarObserver);

  await transactionState.loadMonthData(`${year}-${month}`);
};

init();
