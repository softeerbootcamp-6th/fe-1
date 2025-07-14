import {
  getTransactionsByYearMonth,
  groupTransactionsByDate,
  deleteTransaction,
} from "../utils/transaction.js";
import { getCurrentYear, getCurrentMonth } from "../utils/currentDate.js";
import { getFilteringState } from "../pages.js";

export function createTransactionList(isIncomeChecked, isExpenseChecked) {
  const transactionListByYearMonth = getTransactionsByYearMonth(
    getCurrentYear(),
    getCurrentMonth()
  );

  // 체크박스 상태에 따라 거래내역 필터링
  const filteredTransactions = transactionListByYearMonth.filter(
    (transaction) => {
      if (isIncomeChecked && isExpenseChecked) {
        // 둘 다 체크된 경우: 모든 거래 표시
        return true;
      } else if (!isIncomeChecked && isExpenseChecked) {
        // 수입 해제, 지출 체크: 지출만 표시
        return transaction.amount < 0;
      } else if (isIncomeChecked && !isExpenseChecked) {
        // 수입 체크, 지출 해제: 수입만 표시
        return transaction.amount > 0;
      } else {
        // 둘 다 해제된 경우: 모든 거래 미표시
        return false;
      }
    }
  );

  const transactionListByDate = groupTransactionsByDate(filteredTransactions);

  const sections = Object.entries(transactionListByDate)
    .map(([date, transactionList]) => {
      const totalIncome = transactionList
        .filter((transaction) => transaction.amount > 0)
        .reduce((sum, transaction) => sum + transaction.amount, 0);
      const totalExpense = transactionList
        .filter((transaction) => transaction.amount < 0)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      const header = `
        <div class="flex-row">
          <div>${date}</div>
          <div>
            ${isIncomeChecked && totalIncome > 0 ? `수입 ${totalIncome} ` : ""}
            ${
              isExpenseChecked && totalExpense < 0 ? `지출 ${totalExpense}` : ""
            }
          </div>
        </div>
      `;

      const rows = transactionList
        .map(
          (transaction) => `
        <tr>
          <td>${transaction.category}</td>
          <td>${transaction.description}</td>
          <td>${transaction.paymentMethod}</td>
          <td>${transaction.amount}</td>
          <td>
            <button 
              class="delete-btn" 
              data-id="${transaction.id}"
            >
              삭제
            </button>
          </td>
        </tr> 
      `
        )
        .join("");

      return `
        ${header}
        <div>
          <table>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      `;
    })
    .join("");

  return `
    <div id="transaction-list-container">
      ${sections}
    </div>
  `;
}

export function renderTransactionList(isIncomeChecked, isExpenseChecked) {
  const transactionListContainer = document.getElementById(
    "transaction-list-container"
  );
  if (transactionListContainer) {
    transactionListContainer.innerHTML = createTransactionList(
      isIncomeChecked,
      isExpenseChecked
    );

    // 삭제 버튼 이벤트 리스너 추가
    transactionListContainer.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        deleteTransaction(getCurrentYear(), getCurrentMonth(), id);
        renderTransactionList(isIncomeChecked, isExpenseChecked);
      });
    });
  }
}
