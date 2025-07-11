import { renderMonthlyInfo } from "./components/monthlyInfo.js";
import { renderInputBar } from "./components/inputBar.js";
import { groupTransactionsByDate } from "./utils/transaction.js";
import { transactionsData } from "./store/transactionsStore.js";

export function createMainPage() {
  const grouped = groupTransactionsByDate(transactionsData);

  const sections = Object.entries(grouped)
    .map(([date, transactionList]) => {
      const totalIncome = transactionList
        .filter((transaction) => transaction.amount > 0)
        .reduce((sum, transaction) => sum + transaction.amount, 0);
      const totalExpense = transactionList
        .filter((transaction) => transaction.amount < 0)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      const header = `
        <div class="flex-row">
          <div>${date}</div>
          <div>
            ${totalIncome > 0 ? `수입 ${totalIncome} ` : ""}
            ${totalExpense < 0 ? `지출 ${totalExpense}` : ""}
          </div>
        </div>
      `;

      const rows = transactionList
        .map(
          (transaction) => `
        <tr>
          <td>${transaction.category}</td>
          <td>${transaction.description}</td>
          <td>${transaction.paymentMethod}</td>
          <td>${transaction.amount}</td>
        </tr> 
      `
        )
        .join("");

      return `
        ${header}
        <div>
          <table>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      `;
    })
    .join("");

  return `
    <div class="main-page">
      <div id="input-bar-container"></div>
      <div id="monthly-info-container"></div>
      ${sections}
    </div>
  `;
}

export function createCalendarPage() {
  return `
    <div class="calendar-page">
      <h2>캘린더</h2>
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
  const mainContainer = document.getElementById("main-container");
  if (mainContainer) {
    mainContainer.innerHTML = createMainPage();
  }
  // inputBar 렌더링
  const inputBarContainer = document.getElementById("input-bar-container");
  if (inputBarContainer) {
    renderInputBar(inputBarContainer);
  }

  // monthlyInfo 렌더링
  const monthlyInfoContainer = document.getElementById(
    "monthly-info-container"
  );
  if (monthlyInfoContainer) {
    renderMonthlyInfo(monthlyInfoContainer);
  }
}

export function renderCalendarPage() {
  const mainContainer = document.getElementById("main-container");
  if (mainContainer) {
    mainContainer.innerHTML = createCalendarPage();
  }
}

export function renderChartPage() {
  const mainContainer = document.getElementById("main-container");
  if (mainContainer) {
    mainContainer.innerHTML = createChartPage();
  }
}
