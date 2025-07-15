export const ListFilter = {
  groupTransactionsByMonth: (transactions, month) => {
    return transactions
      .filter((transaction) => transaction.date.getMonth() + 1 === month)
      .sort((a, b) => b.date - a.date);
  },
  groupTransactionsByDate: (transactions) => {
    const groupedListByDate = {};
    transactions.map((transaction) => {
      const date = transaction.date.toISOString().split("T")[0];
      if (!groupedListByDate[date]) {
        groupedListByDate[date] = [];
      }
      groupedListByDate[date].push(transaction);
    });
    const groupedListKeys = Object.keys(groupedListByDate);
    groupedListKeys.map((key) => {
      groupedListByDate[key] = groupedListByDate[key].sort(
        (a, b) => b.date - a.date
      );
    });
    return groupedListByDate;
  },
  groupTransactionsByMoneyType: (transactions, moneyTypeFilter) => {
    return transactions.filter((transaction) => {
      if (transaction.moneyType === "income") {
        return moneyTypeFilter.isIncomeTypeOpen;
      } else {
        return moneyTypeFilter.isExpenseTypeOpen;
      }
    });
  },
};
