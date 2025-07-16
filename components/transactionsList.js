import {
  getTransactionsByYearMonth,
  groupTransactionsByDate,
  deleteTransaction,
  getTransactionById,
  monthlyTotalData,
} from "../utils/transaction.js";
import { CATEGORY_NAME } from "../constants/category.js";
import { formatMoney } from "../utils/format.js";
import { fillFormWithTransaction, cancelEditMode } from "./inputBar.js";
import { renderMonthlyInfo, renderTotalCount } from "./monthlyInfo.js";
import { renderCalendar, renderCalendarInfo } from "./calendar.js";
import { dateStore } from "../store/index.js";

// 클릭된 행 상태 관리
let selectedRowId = null;
let isExternalClickHandlerRegistered = false;

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

// 외부 클릭 이벤트 핸들러
function handleExternalClick(e) {
  // 거래내역 행이나 inputBar 영역을 클릭한 경우는 제외
  if (
    !e.target.closest(".transaction-row") &&
    !e.target.closest(".input-bar") &&
    !e.target.closest("#transaction-list-container")
  ) {
    selectedRowId = null;
    updateSelectedRowStyle(null);
    cancelEditMode();
  }
}

// 외부 클릭 이벤트 리스너 등록
function registerExternalClickHandler() {
  if (!isExternalClickHandlerRegistered) {
    document.addEventListener("click", handleExternalClick);
    isExternalClickHandlerRegistered = true;
  }
}

function createTransactionRow(transaction) {
  return `
    <tr class="transaction-row" data-id="${transaction.id}">
      <td class="td-category light-12 category-${
        CATEGORY_NAME[transaction.category] || CATEGORY_NAME["미분류"]
      }">${transaction.category}</td>
      <td class="td-description light-14">${transaction.description}</td>
      <td class="td-payment-method light-14">${transaction.paymentMethod}</td>
      <td class="td-amount light-14 ${
        transaction.amount > 0 ? "text-income" : "text-expense"
      }">
        ${formatMoney(transaction.amount)}원
        <button 
          class="delete-btn flex-row semibold-14" 
          data-id="${transaction.id}">
          <div class="delete-btn-icon">
            <img src="../icons/closed.svg" alt="delete" />
          </div>
          <div>삭제</div>
        </button>
      </td>
    </tr>
  `;
}

export function createTransactionList(isIncomeChecked, isExpenseChecked) {
  const transactionListByYearMonth = getTransactionsByYearMonth(
    dateStore.getYear(),
    dateStore.getMonth()
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

      const rows = transactionList.reduce((acc, transaction) => {
        const row = createTransactionRow(transaction);
        return acc + row;
      }, "");

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
        deleteTransaction(dateStore.getYear(), dateStore.getMonth(), id);
        // 삭제 후 선택 상태 초기화
        selectedRowId = null;
        const monthlyInfoContainer = document.querySelector(
          "#monthly-info-container"
        );
        renderMonthlyInfo(
          monthlyInfoContainer,
          isIncomeChecked,
          isExpenseChecked
        );
        renderTotalCount(
          monthlyInfoContainer,
          isIncomeChecked,
          isExpenseChecked,
          monthlyTotalData(
            getTransactionsByYearMonth(
              dateStore.getYear(),
              dateStore.getMonth()
            )
          )
        );
        renderTransactionList(isIncomeChecked, isExpenseChecked);

        const calendarContainer = document.querySelector(".calendar-container");
        if (calendarContainer) {
          renderCalendar(calendarContainer);
        }
        const calendarInfoContainer = document.querySelector(
          ".calendar-info-container"
        );
        if (calendarInfoContainer) {
          renderCalendarInfo(calendarInfoContainer);
        }
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
            dateStore.getYear(),
            dateStore.getMonth(),
            id
          );

          if (transaction) {
            // 같은 행을 다시 클릭한 경우 수정 모드 해제
            if (selectedRowId === id) {
              selectedRowId = null;
              updateSelectedRowStyle(null);
              cancelEditMode();
              return;
            }

            // 선택된 행 업데이트
            selectedRowId = id;
            updateSelectedRowStyle(selectedRowId);
            fillFormWithTransaction(transaction);
          }
        });
      });

    // 외부 클릭 시 수정 모드 해제
    registerExternalClickHandler();
  }
}
