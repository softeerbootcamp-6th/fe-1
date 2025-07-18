import { initCalendar } from "../components/calendar/CalendarController.js";

export function createCalendarLayout() {
  const main = document.getElementById("main");

  main.style.visibility = "hidden";
  main.innerHTML = `
  <table id="calendar">
  </table>
`;
  setTimeout(() => {
    initCalendar();
    main.style.visibility = "visible";
  }, 0);
}
