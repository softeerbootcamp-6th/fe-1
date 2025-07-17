import { formatAmount } from "../../../../utils/format-utils.js";
import { getFilteredData } from "../../../../utils/data-utils.js";
import { getTransactions } from "../../../../api/transaction.js";

// 월별 요약 정보 업데이트 (utils의 getFilteredData 활용)
export async function updateCalendarSummary() {
  const totalExpenseEl = document.getElementById("total-expense");
  const totalIncomeEl = document.getElementById("total-income");
  const totalBalanceEl = document.getElementById("total-balance");

  const transactions = await getTransactions();

  // getFilteredData 함수 활용
  const monthlyData = getFilteredData(transactions);

  const totalIncome = monthlyData
    .filter((item) => item.amount > 0)
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = monthlyData
    .filter((item) => item.amount < 0)
    .reduce((sum, item) => sum + Math.abs(item.amount), 0);

  const balance = totalIncome - totalExpense;

  // formatAmount 함수 활용
  totalIncomeEl.textContent = `${formatAmount(totalIncome)}원`;
  totalExpenseEl.textContent = `${formatAmount(totalExpense)}원`;
  totalBalanceEl.textContent = `${formatAmount(Math.abs(balance))}원`;

  // 잔액 색상 설정
  totalBalanceEl.className = "summary-value";
  if (balance > 0) {
    totalBalanceEl.classList.add("income");
  } else if (balance < 0) {
    totalBalanceEl.classList.add("expense");
  }
}
