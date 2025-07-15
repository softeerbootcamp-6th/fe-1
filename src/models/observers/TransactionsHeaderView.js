import Observer from "../../utils/observers/Observer.js";

export class TransactionsHeaderView extends Observer {
  constructor() {
    super();
    this.$root = document.querySelector(".transactions__header-container");
  }

  render(state) {
    const { transactionCount, totalIncome, totalExpense } = state;

    const template = `
        <div class="transactions__header">
          <div class="transactions__header-title font-light-12">
            <span>전체 내역</span>
            <span class="transactions__header-count">${transactionCount}건</span>
          </div>
          <div class="transactions__header-filter" id="filter-container">
            <label class="checkbox-container">
              <input type="checkbox" id="income-checkbox" style="display: none" />
              <img
                class="checkbox-icon"
                src="/src/assets/icons/checkbox.svg"
                alt="checked"
              />
              <span class="checkbox-label font-light-12 income-checkbox-label">수입 ${totalIncome.toLocaleString()}원</span>
            </label>
            <label class="checkbox-container">
              <input type="checkbox" id="expense-checkbox" style="display: none" />
              <img
                class="checkbox-icon"
                src="/src/assets/icons/checkbox.svg"
                alt="checked"
              />
              <span class="checkbox-label font-light-12 expense-checkbox-label">지출 ${totalExpense.toLocaleString()}원</span>
            </label>
          </div>
        </div>
      `;

    this.$root.innerHTML = template;
  }
}
