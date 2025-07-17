export function initTabInfo(container) {
  renderTabInfo(container);
  updateNavigationActive(container);
}

export function renderTabInfo(container) {
  container.innerHTML = createTabInfo();
}

export function createTabInfo() {
  const currentPath = window.location.pathname;
  return `
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
    `;
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
