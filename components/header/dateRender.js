import { sharedState } from "../../../store/state.js";
import { loadEntriesFromServer } from "../../../api.js";
import { getDateFromServer } from "../../pages/main/ledger/entries/entry-util.js";
import { store } from "../../../store/store.js";
import { updateTotalAmounts } from "../totalAmount/totalAmount-util.js";
import { renderCalendar } from "../../pages/main/calendar/calendarView.js";

export function initDate() {
  let { currentMonth, currentYear } = store.getState();
  document.getElementById("prev-month").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 1) {
      currentMonth = 12;
      currentYear--;
    }
    updateCalendar(currentMonth, currentYear);
    store.setState({ currentMonth, currentYear });
    clearWebPage(currentMonth, currentYear);
  });

  document.getElementById("next-month").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
    updateCalendar(currentMonth, currentYear);
    store.setState({ currentMonth, currentYear });
    clearWebPage(currentMonth, currentYear);
  });

  updateCalendar(currentMonth, currentYear); // 초기 렌더링
}

function updateCalendar(currentMonth, currentYear) {
  const yearEl = document.getElementById("year");
  const monthEl = document.getElementById("month");
  const monthLabelEl = document.getElementById("month-label");

  const monthNames = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  yearEl.textContent = currentYear;
  monthEl.textContent = currentMonth;
  monthLabelEl.textContent = monthNames[currentMonth];
}

export async function clearWebPage(currentMonth, currentYear) {
  const entryList = document.getElementById("entry-list");
  entryList.innerHTML = "";
  sharedState.entries = [];
  const currentDate = `${currentYear}-${String(currentMonth).padStart(2, "0")}`;
  const serverData = await loadEntriesFromServer(currentDate);

  serverData.forEach((entry) => {
    getDateFromServer(entry);
    sharedState.entries.push(entry);
  });
  updateTotalAmounts();
  if (sharedState.activeView === "calendar") {
    renderCalendar(currentYear, currentMonth);
    return;
  }
}
