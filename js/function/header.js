import { sharedState } from "../state/state.js";
import { loadEntriesFromServer } from "../api/api.js";
import { getDateFromServer } from "./entry.js";

export let currentMonth = Date.now() ? new Date().getMonth() + 1 : 1; // 현재 월 (1~12)
export let currentYear = Date.now() ? new Date().getFullYear() : 2023; // 현재 연도

export function initCalendar({ onUpdate }) {
  const yearEl = document.getElementById("year");
  const monthEl = document.getElementById("month");
  const monthLabelEl = document.getElementById("month-label");

  const monthNames = ["", "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];

  function updateCalendar() {
    yearEl.textContent = currentYear;
    monthEl.textContent = currentMonth;
    monthLabelEl.textContent = monthNames[currentMonth];
    // onUpdate(currentYear, currentMonth);
  }

 

  document.getElementById("prev-month").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 1) {
      currentMonth = 12;
      currentYear--;
    }
    updateCalendar();
    clearWebPage(currentMonth, currentYear);
  });

  document.getElementById("next-month").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
    updateCalendar();
    clearWebPage(currentMonth, currentYear);
  });

  updateCalendar(); // 초기 렌더링
}

export async function clearWebPage(currentMonth, currentYear) {
    const entryList = document.getElementById("entry-list");
    entryList.innerHTML = ""; // 기존 항목들을 모두 제거
    sharedState.entries = []; // sharedState의 entries 배열 초기화
    const currentDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
    // 서버에서 해당 월의 항목들을 불러오는
    const serverData = await loadEntriesFromServer(currentDate);
    console.log("Server data:", serverData);
    
    serverData.forEach(entry => {
      getDateFromServer(entry);
      sharedState.entries.push(entry); // sharedState에 항목 추가
    }
    );
  }