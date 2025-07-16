import {
  renderMonthlyInfo,
  renderTotalCount,
} from "../components/monthlyInfo.js";
import { renderInputBar } from "../components/inputBar.js";
import { renderTransactionList } from "../components/transactionsList.js";
import { totalIncomeData, totalExpenseData } from "../utils/transaction.js";
import { transactionStore } from "../store/index.js";
import { dateStore } from "../store/index.js";

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
    <div class="container main-page">
      <div id="monthly-info-container"></div>
      <div class="transaction-list-container"></div>
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

  // monthlyInfo 렌더링
  const monthlyInfoContainer = mainContainer.querySelector(
    "#monthly-info-container"
  );
  if (monthlyInfoContainer) {
    renderMonthlyInfo(monthlyInfoContainer, isIncomeChecked, isExpenseChecked);
    const { totalIncomeCount } = totalIncomeData(
      transactionStore.getTransactionsByYearMonth(
        dateStore.getYear(),
        dateStore.getMonth()
      )
    );
    const { totalExpenseCount } = totalExpenseData(
      transactionStore.getTransactionsByYearMonth(
        dateStore.getYear(),
        dateStore.getMonth()
      )
    );
    renderTotalCount(
      monthlyInfoContainer,
      isIncomeChecked,
      isExpenseChecked,
      totalIncomeCount,
      totalExpenseCount
    );
  }

  renderTransactionList(isIncomeChecked, isExpenseChecked);
}
