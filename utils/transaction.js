export function groupTransactionsByDate(transactionsData) {
  const groups = {};

  transactionsData.forEach((transaction) => {
    if (!groups[transaction.date]) {
      groups[transaction.date] = [];
    }
    groups[transaction.date].push(transaction);
  });

  return groups;
}
