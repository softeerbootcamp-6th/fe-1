import { renderMainPage } from "../pages.js";

// 현재 날짜 상태 관리
let currentDate = new Date();

const MonthNames = [
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

// 현재 연도 가져오기
export function getCurrentYear() {
  return currentDate.getFullYear();
}

// 현재 월 가져오기 (숫자)
export function getCurrentMonth() {
  return currentDate.getMonth() + 1;
}

// 현재 월 이름 가져오기
export function getCurrentMonthName() {
  return MonthNames[currentDate.getMonth()];
}

export function getCurrentDay() {
  return currentDate.getDate();
}

// 이전 월로 이동
export function goToPreviousMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
}

// 다음 월로 이동
export function goToNextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
}

// 헤더 표시 업데이트
function renderHeaderDate() {
  const header = document.getElementById("header-container");
  const currentMonthElement = header.querySelector(".currentMonth");
  const currentMonthNameElement = header.querySelector(".currentMonthName");
  const currentYearElement = header.querySelector(".currentYear");

  if (currentMonthElement) {
    currentMonthElement.textContent = getCurrentMonth();
  }

  if (currentMonthNameElement) {
    currentMonthNameElement.textContent = getCurrentMonthName();
  }

  if (currentYearElement) {
    currentYearElement.textContent = getCurrentYear();
  }
}

// 월 이동 이벤트 리스너 설정
export function setDateEventListeners(container) {
  const prevMonthBtn = container.querySelector(".prevMonth");
  const nextMonthBtn = container.querySelector(".nextMonth");

  if (prevMonthBtn) {
    prevMonthBtn.addEventListener("click", () => {
      goToPreviousMonth();
      renderHeaderDate();
      renderMainPage();
    });
  }

  if (nextMonthBtn) {
    nextMonthBtn.addEventListener("click", () => {
      goToNextMonth();
      renderHeaderDate();
      renderMainPage();
    });
  }
}
