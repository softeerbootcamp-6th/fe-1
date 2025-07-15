import { getCurrentYear, getCurrentMonth } from "../utils/currentDate.js";
import {
  getTransactionsByYearMonth,
  monthlyTotalData,
} from "../utils/transaction.js";
import { setFilteringState } from "../pages.js";
import { renderTransactionList } from "./transactionsList.js";
import { formatMoney } from "../utils/format.js";

// totalCount 텍스트를 생성하는 함수
function createTotalCountText(isIncomeChecked, isExpenseChecked, monthlyData) {
  const {
    monthlyTotalCount,
    monthlyTotalIncomeCount,
    monthlyTotalExpenseCount,
  } = monthlyData;

  if (isIncomeChecked && !isExpenseChecked) {
    // 수입만 체크된 경우: 수입 내역
    return `<div class="totalCount">수입 내역 ${monthlyTotalIncomeCount}건</div>`;
  }
  if (!isIncomeChecked && isExpenseChecked) {
    // 지출만 체크된 경우: 지출 내역
    return `<div class="totalCount">지출 내역 ${monthlyTotalExpenseCount}건</div>`;
  }
  if (isIncomeChecked && isExpenseChecked) {
    // 둘 다 체크된 경우: 전체 내역
    return `<div class="totalCount">전체 내역 ${monthlyTotalCount}건</div>`;
  }
  // 둘 다 체크 해제된 경우: 전체 내역 0건
  return `<div class="totalCount">전체 내역 0건</div>`;
}

// totalCount를 렌더링하는 함수
export function renderTotalCount(
  container,
  isIncomeChecked,
  isExpenseChecked,
  monthlyData
) {
  const totalCountElement = container.querySelector(".totalCount");
  if (totalCountElement) {
    totalCountElement.innerHTML = createTotalCountText(
      isIncomeChecked,
      isExpenseChecked,
      monthlyData
    );
  }
}

export function createMonthlyInfo(
  monthlyData,
  isIncomeChecked,
  isExpenseChecked
) {
  const { monthlyTotalIncome, monthlyTotalExpense, monthlyTotalCount } =
    monthlyData;

  const monthlyInfoTemplate = `
    <div class="flex-between light-12">
      <div class="totalCount"></div>
      <div class="flex-row">
      <label class="custom-checkbox income-checkbox-label flex-row">
        <input
          type="checkbox"
          name="income"
          class="incomeCheckbox"
          ${isIncomeChecked ? "checked" : ""}
          style="display:none"
        />
        <span class="checkbox-icon">
          ${
            isIncomeChecked
              ? `<img src="../icons/checkbox.svg" alt="checkbox" />`
              : ""
          }
        </span>
        <div>수입 ${formatMoney(monthlyTotalIncome)}</div>
      </label>
      <label class="custom-checkbox expense-checkbox-label flex-row">
        <input
          type="checkbox"
          name="expense"
          class="expenseCheckbox"
          ${isExpenseChecked ? "checked" : ""}
          style="display:none"
        />
        <span class="checkbox-icon">
          ${
            isExpenseChecked
              ? `<img src="../icons/checkbox.svg" alt="checkbox" />`
              : ""
          }
        </span>
        <div>지출 ${formatMoney(monthlyTotalExpense)}</div>
        </label>
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
  const incomeCheckboxLabel = container.querySelector(".income-checkbox-label");
  const expenseCheckboxLabel = container.querySelector(
    ".expense-checkbox-label"
  );
  const incomeIcon = incomeCheckboxLabel.querySelector(".checkbox-icon");
  const expenseIcon = expenseCheckboxLabel.querySelector(".checkbox-icon");

  const incomeCheckbox = incomeCheckboxLabel.querySelector(
    "input[name='income']"
  );
  const expenseCheckbox = expenseCheckboxLabel.querySelector(
    "input[name='expense']"
  );

  if (incomeCheckbox && expenseCheckbox) {
    function updateCheckbox() {
      const isIncomeChecked = incomeCheckbox.checked;
      const isExpenseChecked = expenseCheckbox.checked;

      // 아이콘 동적 변경
      incomeIcon.innerHTML = isIncomeChecked
        ? `<img src="../icons/checkbox.svg" alt="checkbox" />`
        : "";
      expenseIcon.innerHTML = isExpenseChecked
        ? `<img src="../icons/checkbox.svg" alt="checkbox" />`
        : "";

      // 전역 상태 업데이트
      setFilteringState(isIncomeChecked, isExpenseChecked);
      renderTransactionList(isIncomeChecked, isExpenseChecked);

      // totalCount 업데이트
      renderTotalCount(
        container,
        isIncomeChecked,
        isExpenseChecked,
        monthlyData
      );
    }

    // 수입 체크박스 이벤트
    incomeCheckbox.addEventListener("change", updateCheckbox);

    // 지출 체크박스 이벤트
    expenseCheckbox.addEventListener("change", updateCheckbox);
  }
}
