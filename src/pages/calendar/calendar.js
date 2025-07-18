import { renderCalendarUI } from "./components/cell/cell-handlers.js";
import { updateCalendarSummary } from "./components/summary/summary-handlers.js";

export function initCalendar() {
  // 초기 렌더링
  renderCalendarUI();
  updateCalendarSummary();
}
