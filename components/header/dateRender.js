import { sharedState } from "../../../store/state.js";
import { loadEntriesFromServer } from "../../../api.js";
import { getDateFromServer } from "../../pages/main/ledger/entries/entry-util.js";
import { store } from "../../../store/store.js";
/*
  여기서 year과 month를 store로 관리하는 것이 좋을 것 같습니다.
  현재는 전역 변수로 관리하고 있지만, store를 사용하면 더 나은 상태
*/
// export let currentMonth = Date.now() ? new Date().getMonth() + 1 : 1; // 현재 월 (1~12)
// export let currentYear = Date.now() ? new Date().getFullYear() : 2023; // 현재 연도

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
  entryList.innerHTML = ""; // 기존 항목들을 모두 제거
  sharedState.entries = []; // sharedState의 entries 배열 초기화
  const currentDate = `${currentYear}-${String(currentMonth).padStart(2, "0")}`;
  // 서버에서 해당 월의 항목들을 불러오는
  const serverData = await loadEntriesFromServer(currentDate);
  console.log("Server data:", serverData);

  serverData.forEach((entry) => {
    getDateFromServer(entry);
    sharedState.entries.push(entry); // sharedState에 항목 추가
  });
}
