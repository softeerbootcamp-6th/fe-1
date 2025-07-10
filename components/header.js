export function createHeader() {
  const headerTemplate = `
  <h1 class="serif-24">Wise Wallet</h1>
  <div class="flex-column">
    <div class="currentYear light-14">2023</div>
    <div class="flex-row">
      <button
        id="prevMonth"
        class="light-14"
      >
        <
      </button>
      <div
        id="currentMonth"
        class="serif-48"
      >
        8
      </div>
      <button
        id="nextMonth"
        class="light-14"
      >
        >
      </button>
    </div>
    <div
      id="currentMonthName"
      class="light-14"
    >
      August
    </div>
  </div>
  <nav>
    <ul class="flex-row">
      <li>
        <a href="/"
          ><img
            src="../icons/doc.svg"
            alt="main page"
        /></a>
      </li>
      <li>
        <a href="/calendar"
          ><img
            src="../icons/calendar.svg"
            alt="calendar"
        /></a>
      </li>
      <li>
        <a href="/chart"
          ><img
            src="../icons/chart.svg"
            alt="chart"
        /></a>
      </li>
    </ul>
  </nav>
  `;

  return headerTemplate;
}

export function renderHeader(container) {
  container.innerHTML = createHeader();
}
