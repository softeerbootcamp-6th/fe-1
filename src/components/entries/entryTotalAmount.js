import { sharedState } from "../../store/state.js";
/* 
 특정 날짜의 수입/지출 합계 계산 및 업데이트 함수
*/
export function updateDateSectionTotals(date) {
  const dateSection = document.querySelector(
    `.entry-date-section[data-date="${date}"]`
  );
  if (!dateSection) return;

  // 해당 날짜 섹션에서 수입/지출 항목 찾기
  const incomeItems = dateSection.querySelectorAll(".income-amount");
  const expenseItems = dateSection.querySelectorAll(".expense-amount");

  let incomeTotalAmount = 0;
  let expenseTotalAmount = 0;

  // 수입 항목이 있는지 확인 (필터링 상태도 고려)
  const hasIncomeEntries =
    incomeItems.length > 0 &&
    sharedState.showIncome &&
    Array.from(incomeItems).some(
      (item) => !item.closest(".entry-row").classList.contains("hidden-income")
    );

  // 지출 항목이 있는지 확인 (필터링 상태도 고려)
  const hasExpenseEntries =
    expenseItems.length > 0 &&
    sharedState.showExpense &&
    Array.from(expenseItems).some(
      (item) => !item.closest(".entry-row").classList.contains("hidden-expense")
    );

  // 수입 합계 계산
  incomeItems.forEach((item) => {
    if (!item.closest(".entry-row").classList.contains("hidden-income")) {
      const amount = parseInt(item.textContent.replace(/[^\d]/g, ""));
      incomeTotalAmount += amount;
    }
  });

  // 지출 합계 계산
  expenseItems.forEach((item) => {
    if (!item.closest(".entry-row").classList.contains("hidden-expense")) {
      const amount = parseInt(item.textContent.replace(/[^\d]/g, ""));
      expenseTotalAmount += amount;
    }
  });

  // 화면에 업데이트
  const dateIncomeAmount = dateSection.querySelector(".date-income-amount");
  const dateExpenseAmount = dateSection.querySelector(".date-expense-amount");
  const dateIncomeLabel = dateSection.querySelector(".date-income-label");
  const dateExpenseLabel = dateSection.querySelector(".date-expense-label");

  // 수입 부분 업데이트 및 표시/숨김 처리
  if (dateIncomeAmount && dateIncomeLabel) {
    dateIncomeAmount.textContent = `${incomeTotalAmount.toLocaleString()}원`;

    // 수입 항목이 없으면 숨김
    dateIncomeAmount.classList.toggle("hidden", !hasIncomeEntries);
    dateIncomeLabel.classList.toggle("hidden", !hasIncomeEntries);
  }

  // 지출 부분 업데이트 및 표시/숨김 처리
  if (dateExpenseAmount && dateExpenseLabel) {
    dateExpenseAmount.textContent = `${expenseTotalAmount.toLocaleString()}원`;

    // 지출 항목이 없으면 숨김
    dateExpenseAmount.classList.toggle("hidden", !hasExpenseEntries);
    dateExpenseLabel.classList.toggle("hidden", !hasExpenseEntries);
  }
}
