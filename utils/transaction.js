import { transactionsData } from "../store/transactionsStore.js";

// 특정 연도와 월의 거래내역을 가져옴
export function getTransactionsByYearMonth(year, month) {
  if (transactionsData[year] && transactionsData[year][month]) {
    return transactionsData[year][month];
  }
  return [];
}

// 거래내역을 날짜별로 그룹화
export function groupTransactionsByDate(transactions) {
  return transactions.reduce((grouped, transaction) => {
    const date = transaction.date;
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(transaction);
    return grouped;
  }, {});
}

// 새로운 거래내역 추가
export function addNewTransaction(year, month, formData) {
  const newTransaction = {
    id: new Date().getTime() + Math.random(),
    date: formData.date,
    amount: parseInt(formData.amount),
    description: formData.content,
    paymentMethod: formData.paymentMethod,
    category: formData.category,
  };

  // 기존 데이터에 추가
  transactionsData[year][month].push(newTransaction);

  // 날짜순으로 정렬
  transactionsData[year][month].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return newTransaction;
}

//기존 거래 내역 삭제
export function deleteTransaction(year, month, id) {
  alert(`거래내역 ID ${id}을 삭제하시겠습니까?`);
  const index = transactionsData[year][month].findIndex(
    (transaction) => transaction.id === id
  );
  if (index !== -1) {
    transactionsData[year][month].splice(index, 1);
  } else {
    alert(`거래내역 ID ${id} 삭제에 실패했습니다.`);
  }
}

// 거래내역 수정
export function updateTransaction(year, month, id, formData) {
  const index = transactionsData[year][month].findIndex(
    (transaction) => transaction.id === id
  );
  if (index !== -1) {
    transactionsData[year][month][index] = {
      ...transactionsData[year][month][index],
      date: formData.date,
      amount: parseInt(formData.amount),
      description: formData.content,
      paymentMethod: formData.paymentMethod,
      category: formData.category,
    };

    // 날짜순으로 정렬
    transactionsData[year][month].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    return transactionsData[year][month][index];
  } else {
    alert(`거래내역 ID ${id} 수정에 실패했습니다.`);
    return null;
  }
}

// 특정 ID의 거래내역 조회
export function getTransactionById(year, month, id) {
  return transactionsData[year][month].find(
    (transaction) => transaction.id === id
  );
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
