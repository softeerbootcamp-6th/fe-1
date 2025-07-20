import { monthState } from "../../stores/subjects/index.js";
import DailyHistory from "../../components/DailyHistory/DailyHistory.js";

class TransactionsView {
  constructor() {
    this.$root = document.querySelector(".transactions");
  }

  render(state) {
    const { year, month } = monthState.getMonthInfo();

    const { transactions, filterState, totalIncome, totalExpense } = state;
    const transactionCount = transactions.length;
    const { filterIncome, filterExpense } = filterState;

    const transactionsHeaderTemplate = `
      <div class="transactions__header">
        <div class="transactions__header-title font-light-12">
          <span>전체 내역</span>
          <span class="transactions__header-count">${transactionCount}건</span>
        </div>
        <div class="transactions__header-filter" id="filter-container">
          <label class="checkbox-container" data-type="filterIncome">
            <input type="checkbox" id="income-checkbox" style="display: none" ${
              filterIncome ? "checked" : ""
            }/>
            <img
              class="checkbox-icon"
              src="/src/assets/icons/${
                filterIncome ? "checkbox" : "uncheckbox"
              }.svg"
              alt="${filterIncome ? "checked" : "unchecked"}"
            />
            <span class="checkbox-label font-light-12 income-checkbox-label">수입 ${totalIncome.toLocaleString()}원</span>
          </label>
          <label class="checkbox-container" data-type="filterExpense">
            <input type="checkbox" id="expense-checkbox" style="display: none" ${
              filterExpense ? "checked" : ""
            }/>
            <img
              class="checkbox-icon"
              src="/src/assets/icons/${
                filterExpense ? "checkbox" : "uncheckbox"
              }.svg"
              alt="${filterExpense ? "checked" : "unchecked"}"
            />
            <span class="checkbox-label font-light-12 expense-checkbox-label">지출 ${totalExpense.toLocaleString()}원</span>
          </label>
        </div>
      </div>
    `;

    const transactionsListContainer = document.createElement("div");
    transactionsListContainer.className = "transactions__list";
    transactions.forEach((transaction) => {
      const dailyHistory = DailyHistory({
        date: `${year}-${month}-${transaction.date}`,
        items: transaction.transactions,
      });
      transactionsListContainer.appendChild(dailyHistory);
    });

    this.$root.innerHTML = transactionsHeaderTemplate;
    this.$root.appendChild(transactionsListContainer);
  }
}

export default TransactionsView;
