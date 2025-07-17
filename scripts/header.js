import { elements } from "./elements.js";
import { dateStore } from "../store/dateStore.js";

export async function loadHeaderHTML() {
  const headerEl = elements.headerEl();
  const res = await fetch("./components/header.html");
  const html = await res.text();
  headerEl.innerHTML = html;
}

export function initializeHeader() {
  const headerEl = elements.headerEl();

  const prevBtn = headerEl.querySelector(".prev-month");
  const nextBtn = headerEl.querySelector(".next-month");

  prevBtn.addEventListener("click", () => {
    const { year, month } = dateStore.getDate();

    if (month === 1) {
      dateStore.setDate(year - 1, 12);
    } else {
      dateStore.setDate(year, month - 1);
    }
  });

  nextBtn.addEventListener("click", () => {
    const { year, month } = dateStore.getDate();

    if (month === 12) {
      dateStore.setDate(year + 1, 1);
    } else {
      dateStore.setDate(year, month + 1);
    }
  });

  // 초기 렌더링
  const { year, month } = dateStore.getDate();
  updateHeaderDateUI(year, month);
}

export function updateHeaderDateUI(year, month) {
  const headerEl = elements.headerEl();
  const yearEl = headerEl.querySelector(".year");
  const monthEl = headerEl.querySelector(".month");
  const monthEnEl = headerEl.querySelector(".month-en");

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

  yearEl.textContent = year;
  monthEl.textContent = month;
  monthEnEl.textContent = monthNames[month];
}
