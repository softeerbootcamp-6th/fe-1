export const ListFilter = {
  groupTransactionsByMonth: (transactions, month) => {
    return transactions.filter(
      (transaction) => transaction.date.getMonth() + 1 === month
    );
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
    return groupedListByDate;
  },
};
