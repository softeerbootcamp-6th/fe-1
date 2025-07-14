export const ListFilter = {
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
