import { sharedState } from "../state/state.js";
import { currentMonth, currentYear } from "./calendarRender.js";

export function updateCalendarTotalAmount() {
  // 현재 월에 해당하는 항목만 필터링
  const currentMonthEntries = sharedState.entries.filter((entry) => {
    const entryDate = new Date(entry.date);
    const entryMonth = entryDate.getMonth() + 1; // JavaScript month is 0-indexed
    const entryYear = entryDate.getFullYear();

    return entryMonth === currentMonth && entryYear === currentYear;
  });

  // 수입과 지출 합계 계산
  let totalIncome = 0;
  let totalExpense = 0;

  currentMonthEntries.forEach((entry) => {
    if (entry.isIncome) {
      totalIncome += entry.amount;
    } else {
      totalExpense += entry.amount;
    }
  });

  // 총합 계산
  const totalAmount = totalIncome - totalExpense;

  // 요소 가져오기
  const incomeElement = document.getElementById("calendar-total-income");
  const expenseElement = document.getElementById("calendar-total-expense");
  const totalElement = document.getElementById("calendar-total-amount-text");

  // 화면에 표시
  incomeElement.textContent = `수입: ${totalIncome.toLocaleString()}원`;
  expenseElement.textContent = `지출: ${totalExpense.toLocaleString()}원`;
  totalElement.textContent = `총합: ${totalAmount.toLocaleString()}원`;

  // 항상 active 클래스 유지 (필터링 기능 비활성화)
  incomeElement.classList.add("active");
  expenseElement.classList.add("active");
}
