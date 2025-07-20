import {
  renderMonthlyInfo,
  renderTotalCount,
} from "../components/main/monthlyInfo.js";
import {
  initInputBar,
  renderInputBar,
} from "../components/main/inputBar.viewmodel.js";
import { renderTransactionList } from "../components/main/transactionsList.js";
import {
  getTotalIncomeData,
  getTotalExpenseData,
} from "../utils/transaction.js";
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
    initInputBar(inputBarContainer);
  }

  // monthlyInfo 렌더링
  const monthlyInfoContainer = mainContainer.querySelector(
    "#monthly-info-container"
  );
  if (monthlyInfoContainer) {
    renderMonthlyInfo(monthlyInfoContainer, isIncomeChecked, isExpenseChecked);
    const { totalIncomeCount } = getTotalIncomeData(
      transactionStore.getTransactionsByYearMonth(
        dateStore.getYear(),
        dateStore.getMonth()
      )
    );
    const { totalExpenseCount } = getTotalExpenseData(
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
