export function getTotalAmount(transactions) {
  return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
}

export function totalIncomeData(transactions) {
  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.amount > 0
  );
  const totalIncomeAmount = getTotalAmount(totalIncomeTransactions);
  const totalIncomeCount = totalIncomeTransactions.length;

  return {
    totalIncomeTransactions,
    totalIncomeAmount,
    totalIncomeCount,
  };
}

export function totalExpenseData(transactions) {
  const totalExpenseTransactions = transactions.filter(
    (transaction) => transaction.amount < 0
  );
  const totalExpenseAmount = getTotalAmount(totalExpenseTransactions);
  const totalExpenseCount = totalExpenseTransactions.length;
  return {
    totalExpenseTransactions,
    totalExpenseAmount,
    totalExpenseCount,
  };
}
