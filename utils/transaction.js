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
    id: transactionsData.length + 1,
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
  const index = transactionsData[year][month].findIndex(
    (transaction) => transaction.id === id
  );
  if (index !== -1) {
    transactionsData[year][month].splice(index, 1);
    alert(`거래내역 ID ${id}가 삭제되었습니다.`);
  } else {
    alert(`거래내역 ID ${id} 삭제에 실패했습니다.`);
  }
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
