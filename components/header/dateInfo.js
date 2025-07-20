import { dateStore } from "../../store/index.js";

export function initDateInfo(container) {
  renderDateInfo(container);
  setupDateEventListeners(container);

  dateStore.subscribe(() => {
    updateDateInfo(container);
  });
}

export function renderDateInfo(container) {
  container.innerHTML = createDateInfo();
}

export function createDateInfo() {
  return `
      <div class="flex-column month-year">
        <div class="currentYear light-14">${dateStore.getYear()}</div>
        <div class="flex-between">
          <button class="prevMonth light-14">
            <img src="../icons/chevron-left.svg" alt="left" />
          </button>
          <div class="currentMonth serif-48">${dateStore.getMonth()}</div>
          <button class="nextMonth light-14">
            <img src="../icons/chevron-right.svg" alt="right" />
          </button>
        </div>
        <div class="currentMonthName light-14">${dateStore.getMonthName()}</div>
      </div>
    `;
}

export function updateDateInfo(container) {
  const year = container.querySelector(".currentYear");
  const month = container.querySelector(".currentMonth");
  const monthName = container.querySelector(".currentMonthName");

  if (year) year.textContent = dateStore.getYear();
  if (month) month.textContent = dateStore.getMonth();
  if (monthName) monthName.textContent = dateStore.getMonthName();
}

export function setupDateEventListeners(container) {
  const prevMonthBtn = container.querySelector(".prevMonth");
  const nextMonthBtn = container.querySelector(".nextMonth");

  if (prevMonthBtn) {
    prevMonthBtn.addEventListener("click", () => {
      dateStore.goToPreviousMonth();
    });
  }

  if (nextMonthBtn) {
    nextMonthBtn.addEventListener("click", () => {
      dateStore.goToNextMonth();
    });
  }
}
