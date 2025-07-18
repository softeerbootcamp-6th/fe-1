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

let calendarObserverInstance = null;

export function addCalendarObserver() {
  if (calendarObserverInstance) {
    DateState.unsubscribe(calendarObserverInstance);
  }
  calendarObserverInstance = new CalendarObserver();
  DateState.subscribe(calendarObserverInstance);
}

export function removeCalendarObserver() {
  if (calendarObserverInstance) {
    DateState.unsubscribe(calendarObserverInstance);
    calendarObserverInstance = null;
  }
}
