import { renderMonthlyInfo } from "./components/monthlyInfo.js";
import { renderInputBar } from "./components/inputBar.js";
import {
  getTransactionsByYearMonth,
  groupTransactionsByDate,
  deleteTransaction,
} from "./utils/transaction.js";
import { getCurrentYear, getCurrentMonth } from "./utils/currentDate.js";

export function createMainPage() {
  const grouped = getTransactionsByYearMonth(
    getCurrentYear(),
    getCurrentMonth()
  );
  const groupedByDate = groupTransactionsByDate(grouped);

  const sections = Object.entries(groupedByDate)
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
          <td>
            <button 
              class="delete-btn" 
              data-id="${transaction.id}"
            >
              삭제
            </button>
          </td>
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
    <div id="input-bar-container"></div>
    <div id="monthly-info-container"></div>
    ${sections}
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
  const inputBarContainer = mainContainer.querySelector("#input-bar-container");
  if (inputBarContainer) {
    renderInputBar(inputBarContainer);
  }

  // monthlyInfo 렌더링
  const monthlyInfoContainer = mainContainer.querySelector(
    "#monthly-info-container"
  );
  if (monthlyInfoContainer) {
    renderMonthlyInfo(monthlyInfoContainer);
  }

  mainContainer.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      deleteTransaction(getCurrentYear(), getCurrentMonth(), id);
      renderMainPage();
    });
  });
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
