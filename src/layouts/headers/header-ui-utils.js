import { dateUtils } from "../../store/date-store.js";

// 월 이름 설정(재사용)
export const monthNames = [
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

// 월 업데이트 함수
export function updateMonth() {
  const yearEl = document.querySelector("#currentMonth .year");
  const monthNumEl = document.querySelector("#currentMonth .month-num");
  const monthEngEl = document.querySelector("#currentMonth .month-eng");

  if (yearEl && monthNumEl && monthEngEl) {
    const currentYear = dateUtils.getCurrentYear();
    const currentMonth = dateUtils.getCurrentMonth();

    yearEl.textContent = currentYear;
    monthNumEl.textContent = currentMonth; // 1-12 표시
    monthEngEl.textContent = monthNames[currentMonth - 1]; // 0-11 인덱스로 변환
  }
}

// 월 네비게이션 리스너 설정
export function setupMonthNavigation() {
  const prevBtn = document.getElementById("prevMonthBtn");
  const nextBtn = document.getElementById("nextMonthBtn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      dateUtils.prevMonth();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      dateUtils.nextMonth();
    });
  }
}
