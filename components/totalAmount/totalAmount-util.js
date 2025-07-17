import { sharedState } from "../../store/state.js";

export function updateTotalAmounts() {
  const incomeTotal = document.querySelectorAll(
    ".income-amount:not(.hidden-income)"
  );
  const expenseTotal = document.querySelectorAll(
    ".expense-amount:not(.hidden-expense)"
  );

  let totalSize = 0;
  let totalIncome = 0;
  let totalExpense = 0;

  incomeTotal.forEach((item) => {
    if (item.closest(".entry-row")) {
      const amount = parseInt(item.textContent.replace(/[^\d]/g, ""));
      totalIncome += amount;
    }
  });

  expenseTotal.forEach((item) => {
    if (item.closest(".entry-row")) {
      const amount = parseInt(item.textContent.replace(/[^\d]/g, ""));
      totalExpense += amount;
    }
  });
  const sizeDisplay = document.getElementById("total-amount-text");
  const incomeDisplay = document.getElementById("total-income");
  const expenseDisplay = document.getElementById("total-expense");

  totalSize = incomeTotal.length + expenseTotal.length;
  sizeDisplay.innerHTML = `
    <div class="total-size">
        전체 내역: ${totalSize}건
    </div>
    `;

  const incomeCheckboxImage = sharedState.showIncome
    ? "checkbox.svg"
    : "uncheckbox.svg";
  incomeDisplay.innerHTML = `
    <div class="total-income">
        <img src="../../assets/icons/${incomeCheckboxImage}" class="checkbox-image"></img>
        <div class="total-size">수입: ${totalIncome.toLocaleString()}원</div>
    </div>
    `;

  const expenseCheckboxImage = sharedState.showExpense
    ? "checkbox.svg"
    : "uncheckbox.svg";
  expenseDisplay.innerHTML = `
    <div class="total-income">
        <img src="../../assets/icons/${expenseCheckboxImage}" class="checkbox-image"></img>
        <div class="total-size">지출: ${totalExpense.toLocaleString()}원</div>
    </div>
    `;

  sharedState.totalIncome = totalIncome;
  sharedState.totalExpense = totalExpense;
}
