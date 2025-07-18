import { renderCalendar } from "../components/calendar/CalendarView.js";
import DateState from "../store/DateState.js";

class CalendarObserver {
  constructor() {
    DateState.subscribe(this);
  }

  update() {
    renderCalendar();
  }
}

export function addCalendarObserver() {
  new CalendarObserver();
}
