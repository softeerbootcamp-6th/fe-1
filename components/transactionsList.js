import {
  getTransactionsByYearMonth,
  groupTransactionsByDate,
  deleteTransaction,
  getTransactionById,
} from "../utils/transaction.js";
import { getCurrentYear, getCurrentMonth } from "../utils/currentDate.js";
import { CATEGORY_NAME } from "../constants/categoryName.js";
import { formatMoney } from "../utils/format.js";
import { fillFormWithTransaction } from "./inputBar.js";

// 클릭된 행 상태 관리
let selectedRowId = null;

// 선택된 행의 스타일을 업데이트하는 함수
function updateSelectedRowStyle(selectedRowId) {
  const allRows = document.querySelectorAll(".transaction-row");
  allRows.forEach((row) => {
    const rowId = Number(row.dataset.id);
    if (rowId === selectedRowId) {
      row.classList.add("selected");
    } else {
      row.classList.remove("selected");
    }
  });
}

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
        <div class="flex-between serif-14">
          <div>${date}</div>
          <div> 
            ${
              isIncomeChecked && totalIncome > 0
                ? `수입 ${formatMoney(totalIncome)}원`
                : ""
            }
            ${
              isExpenseChecked && totalExpense < 0
                ? `지출 ${formatMoney(totalExpense)}원`
                : ""
            }
          </div>
        </div>
      `;

      const rows = transactionList
        .map(
          (transaction) => `
        <tr class="transaction-row" data-id="${transaction.id}">
          <td class="td-category light-12 category-${
            CATEGORY_NAME[transaction.category]
          }">${transaction.category}</td>
          <td class="td-description light-14">${transaction.description}</td>
          <td class="td-payment-method light-14">${
            transaction.paymentMethod
          }</td>
          <td class="td-amount light-14">${formatMoney(transaction.amount)}원
            <button 
                class="delete-btn flex-row semibold-14" 
                data-id="${transaction.id}"
                >
                <div class="delete-btn-icon">
                  <img src="../icons/closed.svg" alt="delete" />
                </div>
                <div>삭제</div>
            </button>
          </td>
        </tr> 
      `
        )
        .join("");

      return `
        ${header}
        <table>
            <tbody class="tbody-border">
                ${rows}
            </tbody>
        </table>
      `;
    })
    .join("");

  return `
      ${sections}
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
      btn.addEventListener("click", (e) => {
        e.stopPropagation(); // 행 클릭 이벤트 방지
        const id = Number(btn.dataset.id);
        deleteTransaction(getCurrentYear(), getCurrentMonth(), id);
        // 삭제 후 선택 상태 초기화
        selectedRowId = null;
        renderTransactionList(isIncomeChecked, isExpenseChecked);
      });
    });

    // 거래내역 행 클릭 이벤트 리스너 추가
    transactionListContainer
      .querySelectorAll(".transaction-row")
      .forEach((row) => {
        row.addEventListener("click", (e) => {
          // 삭제 버튼 클릭 시에는 행 클릭 이벤트 실행하지 않음
          if (e.target.closest(".delete-btn")) {
            return;
          }

          const id = Number(row.dataset.id);
          const transaction = getTransactionById(
            getCurrentYear(),
            getCurrentMonth(),
            id
          );

          if (transaction) {
            // 선택된 행 업데이트
            selectedRowId = id;
            updateSelectedRowStyle(selectedRowId);
            fillFormWithTransaction(transaction);
          }
        });
      });
  }
}
