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
