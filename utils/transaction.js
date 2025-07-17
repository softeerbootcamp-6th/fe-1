export function totalIncomeData(transactions) {
  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.amount > 0
  );
  const totalIncomeAmount = totalIncomeTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
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
  const totalExpenseAmount = totalExpenseTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const totalExpenseCount = totalExpenseTransactions.length;
  return {
    totalExpenseTransactions,
    totalExpenseAmount,
    totalExpenseCount,
  };
}
