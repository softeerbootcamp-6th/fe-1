export function getTotalAmount(transactions, type) {
  return transactions
    .filter((transaction) =>
      type === "income" ? transaction.amount > 0 : transaction.amount < 0
    )
    .reduce((sum, transaction) => sum + transaction.amount, 0);
}

// 월별 수입 건수, 총합, 지출 건수, 총합, 총 건수 계산
export function monthlyTotalData(transactions) {
  const monthlyTotalIncomeTransactions = transactions.filter(
    (transaction) => transaction.amount > 0
  );
  const monthlyTotalExpenseTransactions = transactions.filter(
    (transaction) => transaction.amount < 0
  );
  const monthlyTotalIncome = monthlyTotalIncomeTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const monthlyTotalExpense = monthlyTotalExpenseTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const monthlyTotalIncomeCount = monthlyTotalIncomeTransactions.length;
  const monthlyTotalExpenseCount = monthlyTotalExpenseTransactions.length;
  const monthlyTotalCount =
    monthlyTotalIncomeTransactions.length +
    monthlyTotalExpenseTransactions.length;
  return {
    monthlyTotalIncome,
    monthlyTotalExpense,
    monthlyTotalCount,
    monthlyTotalIncomeCount,
    monthlyTotalExpenseCount,
  };
}

export function dailyTotalData(transactions) {
  const dailyTotalIncomeTransactions = transactions.filter(
    (transaction) => transaction.amount > 0
  );
  const dailyTotalExpenseTransactions = transactions.filter(
    (transaction) => transaction.amount < 0
  );
  const dailyTotalIncome = dailyTotalIncomeTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const dailyTotalExpense = dailyTotalExpenseTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const dailyTotalCount =
    dailyTotalIncomeTransactions.length + dailyTotalExpenseTransactions.length;

  const dailyTotalIncomeCount = dailyTotalIncomeTransactions.length;

  const dailyTotalExpenseCount = dailyTotalExpenseTransactions.length;

  const dailyTotalAmount = dailyTotalIncome + dailyTotalExpense;
  return {
    dailyTotalIncome,
    dailyTotalExpense,
    dailyTotalCount,
    dailyTotalIncomeCount,
    dailyTotalExpenseCount,
    dailyTotalAmount,
  };
}
