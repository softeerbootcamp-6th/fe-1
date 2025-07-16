import { renderRecordHeader, renderRecords } from "./records.js";
import { elements } from "./elements.js";
import { store } from "./store.js";
export async function loadHeaderHTML() {
  const headerEl = elements.headerEl();
  const res = await fetch("./components/header.html");
  const html = await res.text();
  headerEl.innerHTML = html;
}

export function initializeHeader() {
  const headerEl = document.querySelector("header");

  const prevBtn = headerEl.querySelector(".prev-month");
  const nextBtn = headerEl.querySelector(".next-month");
  const yearEl = headerEl.querySelector(".year");
  const monthEl = headerEl.querySelector(".month");
  const monthEnEl = headerEl.querySelector(".month-en");

  let currentYear = yearEl.textContent;
  let currentMonth = monthEl.textContent;
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

  function updateDisplay() {
    yearEl.textContent = currentYear;
    monthEl.textContent = currentMonth;
    monthEnEl.textContent = monthNames[currentMonth];
  }

  prevBtn.addEventListener("click", () => {
    if (currentMonth === 1) {
      currentMonth = 12;
      currentYear--;
    } else {
      currentMonth--;
    }

    updateDisplay();
    renderRecordHeader(currentYear, currentMonth, store.getRecords());
    renderRecords(currentYear, currentMonth, store.getRecords());
  });

  nextBtn.addEventListener("click", () => {
    if (currentMonth === 12) {
      currentMonth = 1;
      currentYear++;
    } else {
      currentMonth++;
    }

    updateDisplay();
    renderRecordHeader(currentYear, currentMonth, store.getRecords());
    renderRecords(currentYear, currentMonth, store.getRecords());
  });
}
