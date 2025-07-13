function renderStatistic() {
  const statisticHTML = `
    <!-- 통계 컨테이너 -->
    <div class="stats-container">
      <!-- 통계 본문 -->
      <div class="statistics-content">
        <!-- 차트 영역 -->
        <div class="stats-chart">
          <h3>지출 분석</h3>
          <div id="chart-placeholder"></div>
        </div>
        
        <!-- 카테고리별 상세 정보 -->
        <div class="stats-categories">
          <h3>카테고리별 지출</h3>
          <div class="stats-period-title">
            <span>총 지출: </span>
            <span id="total-expense-amount">0원</span>
          </div>
          <div class="category-list" id="category-list">
            <!-- 카테고리 항목들이 JavaScript로 동적 생성됨 -->
          </div>
        </div>
      </div>
    </div>
  `;

  return statisticHTML;
}

// 자동으로 통계 렌더링 및 초기화
document.addEventListener("DOMContentLoaded", function () {
  const bodyContainer = document.getElementById("body-container");
  if (bodyContainer) {
    bodyContainer.innerHTML = renderStatistic();
    if (typeof initStatistic === "function") initStatistic();
  }
});
