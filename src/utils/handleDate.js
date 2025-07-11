import { MONTH } from "../constants/month.js";

export const handleDate = (date) => {
  const dateDiv = document.querySelector(".date");
  if (!dateDiv) return;

  dateDiv.addEventListener("click", (e) => {
    const target = e.target.closest(".arrow");
    if (!target) return;

    // 전역 변수 업데이트
    if (target.classList.contains("arrow-left")) decreaseMonth(date);
    else if (target.classList.contains("arrow-right")) increaseMonth(date);

    // 화면에 나타나는 전역 변수 업데이트
    renderDate(date);
  });
};

const renderDate = (date) => {
  console.log(date);
  const currentDate = document.querySelector(".date");
  if (!currentDate) return;

  const yearSpan = currentDate.querySelector("span:nth-child(1)");
  const monthNumSpan = currentDate.querySelector("span:nth-child(2)");
  const monthEngSpan = currentDate.querySelector("span:nth-child(3)");
  yearSpan.textContent = date.year;
  monthNumSpan.textContent = date.month;
  monthEngSpan.textContent = MONTH[date.month - 1];
};

const decreaseMonth = (date) => {
  date.month -= 1;
  if (date.month < 1) {
    date.month = 12;
    date.year -= 1;
  }
};

const increaseMonth = (date) => {
  date.month += 1;
  if (date.month > 12) {
    date.month = 1;
    date.year += 1;
  }
};
