import { transactionState, monthState } from "../../stores/subjects/index.js";
import { CalendarObserver } from "../../stores/observers/index.js";
import { CalendarView } from "../../views/index.js";

const init = async () => {
  const { year, month } = monthState.getMonthInfo();
  const calendarView = new CalendarView();
  const calendarObserver = new CalendarObserver(calendarView);
  transactionState.subscribe(calendarObserver);

  await transactionState.loadMonthData(`${year}-${month}`);
};

init();
