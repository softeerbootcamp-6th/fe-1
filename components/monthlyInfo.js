import { monthlyTotalData } from "../utils/transaction.js";
import { transactionsData } from "../store/transactionsStore.js";

export function createMonthlyInfo() {
  const { monthlyTotalIncome, monthlyTotalExpense, monthlyTotalCount } =
    monthlyTotalData(transactionsData);

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
