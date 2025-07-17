import { dateStore } from "../store/index.js";
import { render } from "../utils/routes.js";

export function initHeader(container) {
  setupDateEventListeners(container);

  dateStore.subscribe(() => {
    updateDateInfo(container);
  });
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

export function createTabInfo() {
  const currentPath = window.location.pathname;
  return `
    <nav>
      <ul class="flex-row">
        <li><a href="/" class="${
          currentPath === "/" ? "active" : ""
        }"><img src="../icons/doc.svg" alt="main page" /></a></li>
        <li><a href="/calendar" class="${
          currentPath === "/calendar" ? "active" : ""
        }"><img src="../icons/calendar.svg" alt="calendar" /></a></li>
        <li><a href="/chart" class="${
          currentPath === "/chart" ? "active" : ""
        }"><img src="../icons/chart.svg" alt="chart" /></a></li>
      </ul>
    </nav>
  `;
}

export function createHeader() {
  return `  
    <h1 class="logo serif-24"><a href="/">Wise Wallet</a></h1>
    ${createDateInfo()}
    ${createTabInfo()}
  `;
}

export function renderHeader(container) {
  container.innerHTML = createHeader();
}

export function updateDateInfo(container) {
  const year = container.querySelector(".currentYear");
  const month = container.querySelector(".currentMonth");
  const monthName = container.querySelector(".currentMonthName");

  if (year) year.textContent = dateStore.getYear();
  if (month) month.textContent = dateStore.getMonth();
  if (monthName) monthName.textContent = dateStore.getMonthName();
}

export function updateNavigationActive(path) {
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
