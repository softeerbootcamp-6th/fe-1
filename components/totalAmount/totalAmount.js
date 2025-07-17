export function createTotalAmountContainer() {
  const totalAmountContainer = document.createElement("div");
  totalAmountContainer.className = "total-amount";
  totalAmountContainer.innerHTML = "";
  totalAmountContainer.innerHTML = `
    <div class="total-amount-text" id="total-amount-text">
      전체 내역
    </div>
    <div class="total-amount-value" id="total-amount-value">
      <div id="total-income" class="filter-item active" data-type="income">
        수입
      </div>
      <div id="total-expense" class="filter-item active" data-type="expense">
        지출
      </div>
    </div>
  `;
  return totalAmountContainer;
}
