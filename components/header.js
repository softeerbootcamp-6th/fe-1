export function createHeader() {
  const currentPath = window.location.pathname;

  const headerTemplate = `
    <header>
      <h1 class="logo serif-24"><a href="/">Wise Wallet</a></h1>
      <div class="flex-column">
        <div class="currentYear light-14">2023</div>
        <div class="flex-row">
          <button id="prevMonth" class="light-14"><</button>
          <div id="currentMonth" class="serif-48">8</div>
          <button id="nextMonth" class="light-14">></button>
        </div>
        <div id="currentMonthName" class="light-14">August</div>
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
