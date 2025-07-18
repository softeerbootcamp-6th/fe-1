export function renderSummary() {
  return `
    <div class="summary-row">
        <div class="summary-filter">
          <div class="summary-row">
            <div class="summary-text">
              <span>전체 내역 <b id="total-count">0</b>건</span>
            </div>
            <div class="summary-row-right">
              <div class="filter-item" data-filter="income">
                <img src="assets/icons/checkbox.svg" alt="체크 아이콘" class="checkbox-icon" />
                <span style="margin-left: 8px; margin-right: 16px">수입 <b id="income-amount">0</b></span>
              </div>
              <div class="filter-item" data-filter="expense">
                <img src="assets/icons/checkbox.svg" alt="체크 아이콘" class="checkbox-icon" />
                  <span style="margin-left: 8px; margin-right: 16px">지출 <b id="expense-amount">0</b></span>
                </div>
              </div>
          </div>
        </div>
    </div>
  `;
}
