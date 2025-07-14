import { DAY, MONTH } from "../constants/date.js";

export const DateManager = {
  init: (date) => {
    const dateElement = document.querySelector(".date");
    if (!dateElement) return;

    dateElement.addEventListener("click", (e) => {
      const target = e.target.closest(".arrow");
      if (!target) return;

      if (target.classList.contains("arrow-left")) {
        DateManager.decreaseMonth(date);
      } else if (target.classList.contains("arrow-right")) {
        DateManager.increaseMonth(date);
      }
      DateManager.renderDate(date);
    });

    // 초기 날짜 렌더링
    DateManager.renderDate(date);
  },
  renderDate: (date) => {
    const currentDateElement = document.querySelector(".date");
    if (!currentDateElement) return;

    const yearSpan = currentDateElement.querySelector("span:nth-child(1)");
    const monthNumSpan = currentDateElement.querySelector("span:nth-child(2)");
    const monthEngSpan = currentDateElement.querySelector("span:nth-child(3)");

    if (yearSpan) yearSpan.textContent = date.year;
    if (monthNumSpan) monthNumSpan.textContent = date.month;
    if (monthEngSpan) monthEngSpan.textContent = MONTH[date.month - 1];
  },
  renderDay: (date) => {
    const dayIdx = new Date(date).getDay();
    const day = DAY[dayIdx];
    return day;
  },
  decreaseMonth: (date) => {
    date.month -= 1;
    if (date.month < 1) {
      date.month = 12;
      date.year -= 1;
    }
  },
  increaseMonth: (date) => {
    date.month += 1;
    if (date.month > 12) {
      date.month = 1;
      date.year += 1;
    }
  },
};
