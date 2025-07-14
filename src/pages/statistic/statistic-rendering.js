function renderStatistic() {
  const statisticHTML = `
    <!-- 통계 컨테이너 -->
    <div class="stats-container">
      <!-- 통계 본문 -->
      <div class="statistics-content">
        <!-- 차트 영역 -->
        <div class="stats-chart">
          <div id="chart-placeholder"></div>
        </div>
        
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
      </div>
    </div>
    <!-- 카테고리별 월별 지출 추이 차트 랜더링 예정-->
    <div class="trend-chart" id="trend-chart"></div>
  `;

  return statisticHTML;
}

// 자동으로 통계 렌더링 및 초기화
document.addEventListener("DOMContentLoaded", function () {
  const bodyContainer = document.getElementById("body-container");
  if (bodyContainer) {
    bodyContainer.innerHTML = renderStatistic();
    if (typeof initStatistic === "function") {
      /**
       * 차트 초기화를 비동기로 처리하여 렌더링 완료 후 실행하게끔 유도해야함... 너무 오래 걸렸다
       * */
      setTimeout(() => {
        initStatistic();
      }, 100);
    } else {
      console.error("initStatistic 함수를 찾을 수 없습니다");
    }
  }
});
