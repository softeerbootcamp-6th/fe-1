import { pathStore } from "../../store/index.js";

export function initTabInfo(container) {
  renderTabInfo(container);
  updateNavigationActive(pathStore.getPath());
}

export function renderTabInfo(container) {
  container.innerHTML = createTabInfo();
}

export function createTabInfo() {
  return `
        <ul class="flex-row">
          <li><a href="/" class="active"><img src="../icons/doc.svg" alt="main page" /></a></li>
          <li><a href="/calendar"><img src="../icons/calendar.svg" alt="calendar" /></a></li>
          <li><a href="/chart"><img src="../icons/chart.svg" alt="chart" /></a></li>
        </ul>
    `;
}

export function updateNavigationActive() {
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === pathStore.getPath()) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
