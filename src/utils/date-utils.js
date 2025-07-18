import { monthNames } from "../layouts/headers/header-ui-utils.js";
import { updateFormValidation } from "../pages/main/utils/main-ui-utils.js";
import { dateStore } from "../store/date-store.js";

// 날짜 포맷 함수
export function formatDateText(dateStr) {
  const dateStrToDateObj = new Date(dateStr);
  return `${
    dateStrToDateObj.getMonth() + 1
  }월 ${dateStrToDateObj.getDate()}일 ${
    ["일", "월", "화", "수", "목", "금", "토"][dateStrToDateObj.getDay()]
  }요일`;
}

// 날짜를 YYYY-MM-DD 형식으로 포맷팅
export function formatDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 오늘 날짜인지 확인
export function isDateToday(date) {
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  return isToday;
}

// 입력 폼 날짜 업데이트 함수
export function updateInputDate() {
  const dateInputEl = document.querySelector(".date-input");

  const firstDayOfMonth = new Date(
    dateStore.getState().currentYear,
    dateStore.getState().currentMonth - 1, // 1-12를 0-11로 변환
    1
  );
  // 로컬 시간 기준으로 날짜 포맷팅 (타임존 문제 해결)
  const year = firstDayOfMonth.getFullYear();
  const month = String(firstDayOfMonth.getMonth() + 1).padStart(2, "0");
  const day = String(firstDayOfMonth.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  dateInputEl.value = formattedDate;
  const milliSecond = 10;
  // 폼 유효성 검사 업데이트 (약간의 지연을 두어 DOM 업데이트 후 실행)
  setTimeout(() => {
    updateFormValidation();
  }, milliSecond);
}

// 헤더 월/년 업데이트 함수
export function updateHeaderDate() {
  const yearEl = document.querySelector("#currentMonth .year");
  const monthNumEl = document.querySelector("#currentMonth .month-num");
  const monthEngEl = document.querySelector("#currentMonth .month-eng");

  if (yearEl && monthNumEl && monthEngEl) {
    yearEl.textContent = dateStore.getState().currentYear;
    monthNumEl.textContent = dateStore.getState().currentMonth; // 1-12 표시
    monthEngEl.textContent = monthNames[dateStore.getState().currentMonth - 1]; // 0-11 인덱스로 변환
  }
}
