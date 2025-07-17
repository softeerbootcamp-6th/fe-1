import transactionState from "../stores/subjects/TransactionState.js";
import monthState from "../stores/subjects/MonthState.js";
import { CalendarView } from "../views/Calendar/CalanderView.js";
import { CalendarObserver } from "../stores/observers/CalendarObserver.js";

const init = async () => {
  const { year, month } = monthState.getMonthInfo();
  const calendarView = new CalendarView();
  const calendarObserver = new CalendarObserver(calendarView);
  transactionState.subscribe(calendarObserver);

  await transactionState.loadMonthData(`${year}-${month}`);
};

init();
