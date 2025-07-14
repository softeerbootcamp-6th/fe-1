import { getCurrentYear, getCurrentMonth } from "../utils/currentDate.js";
import {
  getTransactionsByYearMonth,
  monthlyTotalData,
} from "../utils/transaction.js";
import { setFilteringState } from "../pages.js";
import { renderTransactionList } from "./transactionsList.js";

export function createMonthlyInfo(
  monthlyData,
  isIncomeChecked,
  isExpenseChecked
) {
  const { monthlyTotalIncome, monthlyTotalExpense, monthlyTotalCount } =
    monthlyData;

  const monthlyInfoTemplate = `
    <div class="flex-row">
      <div class="totalCount">전체 내역 ${monthlyTotalCount}건</div>
      <div class="flex-row">
        <input
          type="checkbox"
          class="incomeCheckbox"
          ${isIncomeChecked ? "checked" : ""}
        />  
        <div>수입 ${monthlyTotalIncome}</div>
      </div>
      <div class="flex-row">
        <input
          type="checkbox"
          class="expenseCheckbox"
          ${isExpenseChecked ? "checked" : ""}
        />
        <div>지출 ${monthlyTotalExpense}</div>
      </div>
    </div>
    `;

  return monthlyInfoTemplate;
}

export function renderMonthlyInfo(
  container,
  isIncomeChecked,
  isExpenseChecked
) {
  const monthlyData = monthlyTotalData(
    getTransactionsByYearMonth(getCurrentYear(), getCurrentMonth())
  );

  container.innerHTML = createMonthlyInfo(
    monthlyData,
    isIncomeChecked,
    isExpenseChecked
  );
  setupMonthlyInfoEventListeners(container, monthlyData);
}

function setupMonthlyInfoEventListeners(container, monthlyData) {
  const incomeCheckbox = container.querySelector(".incomeCheckbox");
  const expenseCheckbox = container.querySelector(".expenseCheckbox");
  const totalCountElement = container.querySelector(".totalCount");

  if (incomeCheckbox && expenseCheckbox && totalCountElement) {
    const {
      monthlyTotalCount,
      monthlyTotalIncomeCount,
      monthlyTotalExpenseCount,
    } = monthlyData;

    function updateCheckbox() {
      const isIncomeChecked = incomeCheckbox.checked;
      const isExpenseChecked = expenseCheckbox.checked;

      // 전역 상태 업데이트
      setFilteringState(isIncomeChecked, isExpenseChecked);
      renderTransactionList();

      // 체크박스 따라 내역 변경되지 않는 문제 수정 필요
      if (isIncomeChecked && !isExpenseChecked) {
        // 수입만 체크된 경우: 수입 내역
        totalCountElement.textContent = `수입 내역 ${monthlyTotalIncomeCount}건`;
      } else if (!isIncomeChecked && isExpenseChecked) {
        // 지출만 체크된 경우: 지출 내역
        totalCountElement.textContent = `지출 내역 ${monthlyTotalExpenseCount}건`;
      } else if (isIncomeChecked && isExpenseChecked) {
        // 둘 다 체크된 경우: 수입 내역 + 지출 내역
        totalCountElement.textContent = `전체 내역 ${monthlyTotalCount}건`;
      } else {
        // 둘 다 체크 해제된 경우: 전체 내역
        totalCountElement.textContent = `전체 내역 0건`;
      }
    }

    // 수입 체크박스 이벤트
    incomeCheckbox.addEventListener("change", updateCheckbox);

    // 지출 체크박스 이벤트
    expenseCheckbox.addEventListener("change", updateCheckbox);
  }
}
