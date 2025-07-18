import { addCalendarObserver } from "../../observers/calendarObserver.js";
import { renderCalendar } from "./CalendarView.js";

export function initCalendar() {
  renderCalendar();
  addCalendarObserver();
}
