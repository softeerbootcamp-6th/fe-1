import { monthState } from "../../stores/subjects/index.js";
import DailyHistory from "../../components/DailyHistory/DailyHistory.js";

const { year, month } = monthState.getMonthInfo();

const getSortedDailyData = (transactions, filterState) => {
  const filteredTransactions = transactions.filter((transaction) => {
    if (transaction.type === "income" && filterState.filterIncome) {
      return true;
    }
    if (transaction.type === "expense" && filterState.filterExpense) {
      return true;
    }
    return false;
  });

  const groupByDate = filteredTransactions.reduce((acc, curr) => {
    const date = curr.date.split("-")[2];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {});

  const sortedDailyData = Object.keys(groupByDate)
    .sort((a, b) => Number(b) - Number(a))
    .map((date) => ({
      date,
      transactions: groupByDate[date],
    }));

  return sortedDailyData;
};

const sumAmount = (transactions, type) => {
  return transactions.reduce((acc, curr) => {
    if (curr.type === type) {
      return acc + curr.amount;
    }
    return acc;
  }, 0);
};

class TransactionsView {
  constructor() {
    this.$root = document.querySelector(".transactions");
  }

  render(state) {
    const { transactions, filterState } = state;
    const transactionCount = transactions.length;
    const totalIncome = sumAmount(transactions, "income");
    const totalExpense = sumAmount(transactions, "expense");
    const { filterIncome, filterExpense } = filterState;

    const sortedDailyData = getSortedDailyData(transactions, filterState);

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
    sortedDailyData.forEach((dailyData) => {
      const dailyHistory = DailyHistory({
        date: `${year}-${month}-${dailyData.date}`,
        items: dailyData.transactions,
      });
      transactionsListContainer.appendChild(dailyHistory);
    });

    this.$root.innerHTML = transactionsHeaderTemplate;
    this.$root.appendChild(transactionsListContainer);
  }
}

export default TransactionsView;
