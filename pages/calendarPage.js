import {
  renderCalendar,
  renderCalendarInfo,
} from "../components/calendar/calendar.js";

export function createCalendarPage() {
  return `
    <div class="container calendar-page">
      <div class="calendar-container"></div>
      <div class="calendar-info-container"></div>
    </div>
  `;
}

export function renderCalendarPage() {
  const mainContainer = document.getElementById("main-container");
  if (mainContainer) {
    mainContainer.innerHTML = createCalendarPage();
  }

  const calendarContainer = mainContainer.querySelector(".calendar-container");
  if (calendarContainer) {
    renderCalendar(calendarContainer);
  }
  const calendarInfoContainer = mainContainer.querySelector(
    ".calendar-info-container"
  );
  if (calendarInfoContainer) {
    renderCalendarInfo(calendarInfoContainer);
  }
}
