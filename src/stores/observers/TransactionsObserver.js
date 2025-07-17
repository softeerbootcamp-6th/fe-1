import { Observer, groupByDate, sortByDate } from "../../utils/index.js";

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

  const groupedByDate = groupByDate(filteredTransactions);
  const sortedDailyData = sortByDate(groupedByDate);

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

class TransactionsObserver extends Observer {
  constructor(view) {
    super();
    this.view = view;
  }

  update(state) {
    const { transactions, filterState } = state;
    const totalIncome = sumAmount(transactions, "income");
    const totalExpense = sumAmount(transactions, "expense");
    const sortedDailyData = getSortedDailyData(transactions, filterState);
    this.view.render({
      transactions: sortedDailyData,
      filterState,
      totalIncome,
      totalExpense,
    });
  }
}

export default TransactionsObserver;
