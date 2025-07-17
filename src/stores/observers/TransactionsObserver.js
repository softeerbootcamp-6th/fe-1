import { Observer } from "../../utils/index.js";

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
