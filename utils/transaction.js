import { transactionsData } from "../store/transactionsStore.js";

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
export function addNewTransaction(formData) {
  const newTransaction = {
    id: transactionsData.length + 1,
    date: formData.date,
    amount: parseInt(formData.amount),
    description: formData.content,
    paymentMethod: formData.paymentMethod,
    category: formData.category,
  };

  // 기존 데이터에 추가
  transactionsData.push(newTransaction);

  // 날짜순으로 정렬
  transactionsData.sort((a, b) => new Date(b.date) - new Date(a.date));

  console.log("새로운 거래내역을 입력받았습니다:", newTransaction);
  console.log("전체 거래내역:", transactionsData);

  return newTransaction;
}

//기존 거래 내역 삭제
export function deleteTransaction(id) {
  const index = transactionsData.findIndex(
    (transaction) => transaction.id === id
  );
  if (index !== -1) {
    transactionsData.splice(index, 1);
    console.log(`거래내역 ID ${id}가 삭제되었습니다.`);
    console.log("전체 거래내역:", transactionsData);
  } else {
    console.log(`거래내역 ID ${id} 삭제에 실패했습니다.`);
  }
}

export function monthlyTotalData(transactions) {
  const monthlyTotalIncome = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const monthlyTotalExpense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const monthlyTotalCount = transactions.length;
  return { monthlyTotalIncome, monthlyTotalExpense, monthlyTotalCount };
}
