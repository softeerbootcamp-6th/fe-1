// 날짜 포맷 함수
export function formatDateText(dateStr) {
  const dateObj = new Date(dateStr);
  return `${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일 ${
    ["일", "월", "화", "수", "목", "금", "토"][dateObj.getDay()]
  }요일`;
}

// 입력 폼 날짜 업데이트 함수
export function updateInputDate(currentYear, currentMonth, dateInput) {
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);

  // 로컬 시간 기준으로 날짜 포맷팅 (타임존 문제 해결)
  const year = firstDayOfMonth.getFullYear();
  const month = String(firstDayOfMonth.getMonth() + 1).padStart(2, "0");
  const day = String(firstDayOfMonth.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  dateInput.value = formattedDate;
}

// 헤더 월/년 업데이트 함수
export function updateHeaderDate(currentYear, currentMonth) {
  const yearEl = document.querySelector("#currentMonth .year");
  const monthNumEl = document.querySelector("#currentMonth .month-num");
  const monthEngEl = document.querySelector("#currentMonth .month-eng");

  if (yearEl && monthNumEl && monthEngEl) {
    const monthNames = [
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
    monthNumEl.textContent = currentMonth + 1;
    monthEngEl.textContent = monthNames[currentMonth];
  }
}
