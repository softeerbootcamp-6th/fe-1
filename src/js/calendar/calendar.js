import { transactionState, monthState } from "../../stores/subjects/index.js";
import { subscribeCalendarObserver } from "../../utils/index.js";

const init = async () => {
  const { year, month } = monthState.getMonthInfo();
  subscribeCalendarObserver();
  await transactionState.loadMonthData(`${year}-${month}`);
};

init();
