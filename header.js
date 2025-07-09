export function createHeader() {
  const headerTemplate = `
    <header>
      <h1>Wise Wallet</h1>
      <div class="flex-column">
        <div class="currentYear">2023</div>
        <div class="flex-row">
          <button id="prevMonth"><</button>
          <div id="currentMonth">8</div>
          <button id="nextMonth">></button>
        </div>
        <div id="currentMonthName">August</div>
      </div>
      <nav>
        <ul class="flex-row">
          <li><a href="#" data-page="home">Home</a></li>
          <li><a href="#" data-page="calendar">Calendar</a></li>
          <li><a href="#" data-page="graph">Graph</a></li>
        </ul>
      </nav>
    </header>
  `;

  return headerTemplate;
}

export function renderHeader(container) {
  container.innerHTML = createHeader();
}
