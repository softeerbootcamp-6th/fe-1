import { getCurrentYear, getCurrentMonth } from "../utils/currentDate.js";
import {
  getTransactionsByYearMonth,
  monthlyTotalData,
} from "../utils/transaction.js";

export function createMonthlyInfo(monthlyData) {
  const { monthlyTotalIncome, monthlyTotalExpense, monthlyTotalCount } =
    monthlyData;

  const monthlyInfoTemplate = `
    <div class="flex-row">
      <div class="totalCount">전체 내역 ${monthlyTotalCount}건</div>
      <div class="flex-row">
        <label class="flex-row">
          <input
            type="checkbox"
            name="income"
            class="incomeCheckbox"
            checked
          />  
          수입 ${monthlyTotalIncome}
        </label>
        <label class="flex-row">
          <input
            type="checkbox"
            name="expense"
            class="expenseCheckbox"
            checked
          />
          지출 ${monthlyTotalExpense}
        </label>
    </div>
    `;

  return monthlyInfoTemplate;
}

export function renderMonthlyInfo(container) {
  const monthlyData = monthlyTotalData(
    getTransactionsByYearMonth(getCurrentYear(), getCurrentMonth())
  );
  container.innerHTML = createMonthlyInfo(monthlyData);
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

      if (isIncomeChecked && !isExpenseChecked) {
        // 수입만 체크된 경우: 수입 내역
        totalCountElement.textContent = `수입 내역 ${monthlyTotalIncomeCount}건`;
      } else if (!isIncomeChecked && isExpenseChecked) {
        // 지출만 체크된 경우: 지출 내역
        totalCountElement.textContent = `지출 내역 ${monthlyTotalExpenseCount}건`;
      } else {
        // 둘 다 해제된 경우: 전체 내역 (기본값)
        totalCountElement.textContent = `전체 내역 ${monthlyTotalCount}건`;
      }
    }

    // 수입 체크박스 이벤트
    incomeCheckbox.addEventListener("change", updateCheckbox);

    // 지출 체크박스 이벤트
    expenseCheckbox.addEventListener("change", updateCheckbox);
  }
}
