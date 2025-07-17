import {
  getTotalIncomeData,
  getTotalExpenseData,
} from "../../utils/transaction.js";
import { CATEGORY_NAME } from "../../constants/category.js";
import { formatMoney } from "../../utils/format.js";
import {
  fillFormWithTransaction,
  cancelEditMode,
} from "./inputBar.viewmodel.js";
import { dateStore, transactionStore } from "../../store/index.js";

// 클릭된 행 상태 관리
let selectedRowId = null;
let isExternalClickHandlerRegistered = false;

export function isTransactionVisible(
  transaction,
  isIncomeChecked,
  isExpenseChecked
) {
  if (isIncomeChecked && isExpenseChecked) {
    return true;
  }
  if (!isIncomeChecked && isExpenseChecked) {
    return transaction.amount < 0;
  }
  if (isIncomeChecked && !isExpenseChecked) {
    return transaction.amount > 0;
  }
  return false;
}

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
    !e.target.closest(".transaction-list-container")
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

export function createTransactionRow(transaction, isDeleteButton = true) {
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
        ${
          isDeleteButton
            ? `<button
              class="delete-btn flex-row semibold-14"
              data-id="${transaction.id}"
            >
              <div class="delete-btn-icon">
                <img
                  src="../icons/closed.svg"
                  alt="delete"
                />
              </div>
              <div>삭제</div>
            </button>`
            : ""
        }
      </td>
    </tr>
  `;
}

export function createTransactionList(isIncomeChecked, isExpenseChecked) {
  // 날짜별로 그룹핑된 거래 객체
  const transactionListByDate = transactionStore.getGroupedTransactionsByDate(
    dateStore.getYear(),
    dateStore.getMonth()
  );

  // 날짜별로 필터링된 거래 객체 생성
  const filteredTransactionsByDate = Object.entries(
    transactionListByDate
  ).reduce((acc, [date, transactionList]) => {
    const filteredList = transactionList.filter((transaction) =>
      isTransactionVisible(transaction, isIncomeChecked, isExpenseChecked)
    );
    if (filteredList.length > 0) {
      acc[date] = filteredList;
    }
    return acc;
  }, {});

  // 날짜별로 섹션 생성
  const sections = Object.entries(filteredTransactionsByDate).reduce(
    (acc, [date, transactionList]) => {
      const { totalIncomeAmount } = getTotalIncomeData(transactionList);
      const { totalExpenseAmount } = getTotalExpenseData(transactionList);

      const header = `
        <div class="flex-between serif-14">
          <div>${date}</div>
          <div> 
          ${
            isIncomeChecked && totalIncomeAmount > 0
              ? `수입 ${formatMoney(totalIncomeAmount)}원`
              : ""
          }
          ${
            isExpenseChecked && totalExpenseAmount < 0
              ? `지출 ${formatMoney(totalExpenseAmount)}원`
              : ""
          }
       </div>
        </div>
      `;

      const rows = transactionList.reduce((rowAcc, transaction) => {
        const row = createTransactionRow(transaction);
        return rowAcc + row;
      }, "");

      return (
        acc +
        `
        ${header}
        <table>
            <tbody class="tbody-border">
                ${rows}
            </tbody>
        </table>
      `
      );
    },
    ""
  );

  return `
      ${sections}
  `;
}

export function renderTransactionList(isIncomeChecked, isExpenseChecked) {
  const transactionListContainer = document.querySelector(
    ".transaction-list-container"
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
        transactionStore.deleteTransaction(
          dateStore.getYear(),
          dateStore.getMonth(),
          id
        );
        // 삭제 후 선택 상태 초기화
        selectedRowId = null;
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
          const transaction = transactionStore.getTransactionById(
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
