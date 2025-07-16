import {
  renderMonthlyInfo,
  renderTotalCount,
} from "./components/monthlyInfo.js";
import { renderInputBar } from "./components/inputBar.js";
import { renderTransactionList } from "./components/transactionsList.js";
import {
  getTransactionsByYearMonth,
  monthlyTotalData,
} from "./utils/transaction.js";
import { getCurrentYear, getCurrentMonth } from "./utils/currentDate.js";
import { renderCalendar, renderCalendarInfo } from "./components/calendar.js";

let isIncomeChecked = true;
let isExpenseChecked = true;

export function getFilteringState() {
  return { isIncomeChecked, isExpenseChecked };
}

export function setFilteringState(income, expense) {
  isIncomeChecked = income;
  isExpenseChecked = expense;
}

export function createMainPage() {
  return `
    <div id="input-bar-container"></div>
    <div class="container">
      <div id="monthly-info-container"></div>
      <div id="transaction-list-container"></div>
    </div>
  `;
}

export function createCalendarPage() {
  return `
    <div class="container">
      <div class="calendar-container"></div>
      <div class="calendar-info-container"></div>
    </div>
  `;
}

export function createChartPage() {
  return `
    <div class="chart-page">
      <h2>차트</h2>
    </div>
  `;
}

export function renderMainPage() {
  const { isIncomeChecked, isExpenseChecked } = getFilteringState();

  const mainContainer = document.getElementById("main-container");
  if (mainContainer) {
    mainContainer.innerHTML = createMainPage();
  }

  // inputBar 렌더링
  const inputBarContainer = mainContainer.querySelector("#input-bar-container");
  if (inputBarContainer) {
    renderInputBar(inputBarContainer);
  }

  const container = mainContainer.querySelector(".container");

  // monthlyInfo 렌더링
  const monthlyInfoContainer = container.querySelector(
    "#monthly-info-container"
  );
  if (monthlyInfoContainer) {
    renderMonthlyInfo(monthlyInfoContainer, isIncomeChecked, isExpenseChecked);
    renderTotalCount(
      monthlyInfoContainer,
      isIncomeChecked,
      isExpenseChecked,
      monthlyTotalData(
        getTransactionsByYearMonth(getCurrentYear(), getCurrentMonth())
      )
    );
  }

  renderTransactionList(isIncomeChecked, isExpenseChecked);
}

export function renderCalendarPage() {
  const mainContainer = document.getElementById("main-container");
  if (mainContainer) {
    mainContainer.innerHTML = createCalendarPage();
  }

  const calendarContainer = mainContainer.querySelector(".calendar-container");
  if (calendarContainer) {
    renderCalendar(calendarContainer);
  }
  const calendarInfoContainer = mainContainer.querySelector(
    ".calendar-info-container"
  );
  if (calendarInfoContainer) {
    renderCalendarInfo(calendarInfoContainer);
  }
}

export function renderChartPage() {
  const mainContainer = document.getElementById("main-container");
  if (mainContainer) {
    mainContainer.innerHTML = createChartPage();
  }
}
