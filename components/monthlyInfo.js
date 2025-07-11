import { getCurrentYear, getCurrentMonth } from "../utils/currentDate.js";
import {
  getTransactionsByYearMonth,
  monthlyTotalData,
} from "../utils/transaction.js";

export function createMonthlyInfo() {
  const { monthlyTotalIncome, monthlyTotalExpense, monthlyTotalCount } =
    monthlyTotalData(
      getTransactionsByYearMonth(getCurrentYear(), getCurrentMonth())
    );

  const monthlyInfoTemplate = `
    <div class="flex-row">
      <div>전체 내역 ${monthlyTotalCount}건</div>
      <div class="flex-row">
        <input
          type="checkbox"
          checked
        />  
        <div>수입 ${monthlyTotalIncome}</div>
      </div>
      <div class="flex-row">
        <input
          type="checkbox"
          checked
        />
        <div>지출 ${monthlyTotalExpense}</div>
      </div>
    </div>
    `;

  return monthlyInfoTemplate;
}

export function renderMonthlyInfo(container) {
  container.innerHTML = createMonthlyInfo();
}
