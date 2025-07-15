import {
  getCurrentYear,
  getCurrentMonth,
  getCurrentMonthName,
  setupDateEventListeners,
} from "../utils/currentDate.js";

export function createHeader() {
  const currentPath = window.location.pathname;

  const headerTemplate = `  
    <header>
      <h1 class="logo serif-24"><a href="/">Wise Wallet</a></h1>
      <div class="flex-column month-year">
        <div class="currentYear light-14">${getCurrentYear()}</div>
        <div class="flex-between">
          <button class="prevMonth light-14">
            <img src="../icons/chevron-left.svg" alt="left" />
          </button>
          <div class="currentMonth serif-48">${getCurrentMonth()}</div>
          <button class="nextMonth light-14">
            <img src="../icons/chevron-right.svg" alt="right" />
          </button>
        </div>
        <div class="currentMonthName light-14">${getCurrentMonthName()}</div>
      </div>
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
    </header>
  `;

  return headerTemplate;
}

export function renderHeader(container) {
  container.innerHTML = createHeader();
  setupDateEventListeners(container);
}

export function updateNavigationActive() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
