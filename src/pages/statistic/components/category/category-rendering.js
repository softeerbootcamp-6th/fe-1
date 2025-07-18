export function renderCategory() {
  return `
    <!-- 카테고리별 상세 정보 -->
    <div class="stats-categories">
      <div class="stats-period-title">
        <span>이번 달 지출 금액</span>
        <span id="total-expense-amount">0원</span>
      </div>
      <div class="category-list" id="category-list">
        <!-- 카테고리 항목들이 JavaScript로 동적 생성됨 -->
      </div>
    </div>
  `;
}
