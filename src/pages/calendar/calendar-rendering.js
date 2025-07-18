import { renderCalendarGrid } from "./components/cell/cell-rendering.js";
import { renderCalendarSummary } from "./components/summary/summary-rendering.js";
import { initCalendar } from "./calendar.js";

export async function renderCalendar() {
  const calendarHTML = `
    ${renderCalendarGrid()}
    ${renderCalendarSummary()}
  `;

  return calendarHTML;
}

// 자동으로 헤더 렌더링 및 초기화
document.addEventListener("DOMContentLoaded", function () {
  const calendarContainer = document.getElementById("calendar-container");
  if (calendarContainer) {
    calendarContainer.innerHTML = renderCalendar();
    initCalendar();
  }
});
