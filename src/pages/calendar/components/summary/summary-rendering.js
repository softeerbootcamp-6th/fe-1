export function renderCalendarSummary() {
  return `
    <!-- 월별 요약 정보 -->
    <div class="calendar-summary">
    <div class="summary-row">
      <div class="summary-item">
        <span class="summary-label">총 수입</span>
        <span class="summary-value income" id="total-income">0원</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">/ 총 지출</span>
        <span class="summary-value expense" id="total-expense">0원</span>
      </div>
    </div>
    <div class="summary-row">
      <div class="summary-item">
        <span class="summary-label">총합</span>
        <span class="summary-value" id="total-balance">0원</span>
      </div>
    </div>
    </div>
  `;
}
